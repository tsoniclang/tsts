/**
 * Copy-on-write Map and Set with nested-scope support.
 *
 * Port of TS-Go internal/collections/cow.go. Used by the binder/checker
 * for scoped maps where reads inherit the parent's entries but the first
 * write triggers a clone so the parent's view stays unchanged.
 */

export class CopyOnWriteMap<K, V> {
  private m: Map<K, V> | undefined;
  private owned = false;

  get(k: K): V | undefined {
    return this.m?.get(k);
  }

  has(k: K): boolean {
    return this.m?.has(k) ?? false;
  }

  set(k: K, v: V): void {
    this.ensureOwned();
    this.m!.set(k, v);
  }

  delete(k: K): boolean {
    this.ensureOwned();
    return this.m!.delete(k);
  }

  private ensureOwned(): void {
    if (this.owned) return;
    if (this.m === undefined) {
      this.m = new Map<K, V>();
    } else {
      this.m = new Map<K, V>(this.m);
    }
    this.owned = true;
  }

  /**
   * Returns a function that restores this map to its current state.
   * While the scope is active, the map shares its current backing
   * storage with the parent scope; the first mutation transparently
   * clones the storage so the parent's view is not modified.
   */
  enterScope(): () => void {
    const savedMap = this.m;
    const savedOwned = this.owned;
    this.owned = false;
    return () => {
      this.m = savedMap;
      this.owned = savedOwned;
    };
  }

  entries(): IterableIterator<readonly [K, V]> {
    return (this.m ?? new Map<K, V>()).entries() as IterableIterator<readonly [K, V]>;
  }

  keys(): IterableIterator<K> {
    return (this.m ?? new Map<K, V>()).keys();
  }

  values(): IterableIterator<V> {
    return (this.m ?? new Map<K, V>()).values();
  }
}

export class CopyOnWriteSet<K> {
  private readonly m: CopyOnWriteMap<K, true>;

  constructor() {
    this.m = new CopyOnWriteMap<K, true>();
  }

  has(k: K): boolean {
    return this.m.has(k);
  }

  add(k: K): void {
    this.m.set(k, true);
  }

  enterScope(): () => void {
    return this.m.enterScope();
  }

  values(): IterableIterator<K> {
    return this.m.keys();
  }
}
