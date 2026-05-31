interface OwnerCacheEntry<V> {
  value: V;
  readonly owners: Set<number>;
}

export class OwnerCache<K, V, LoadArgs> {
  private readonly entries = new Map<K, OwnerCacheEntry<V>>();
  private readonly parse: (identity: K, args: LoadArgs) => V;
  private readonly isExpired: ((identity: K, value: V, args: LoadArgs) => boolean) | undefined;

  constructor(parse: (identity: K, args: LoadArgs) => V, isExpired?: (identity: K, value: V, args: LoadArgs) => boolean) {
    this.parse = parse;
    this.isExpired = isExpired;
  }

  loadAndAcquire(identity: K, owner: number, loadArgs: LoadArgs): V {
    let entry = this.entries.get(identity);
    if (entry === undefined) {
      entry = { value: this.parse(identity, loadArgs), owners: new Set() };
      this.entries.set(identity, entry);
    } else if (this.isExpired?.(identity, entry.value, loadArgs) === true) {
      entry.value = this.parse(identity, loadArgs);
    }
    entry.owners.add(owner);
    return entry.value;
  }

  acquire(identity: K, owner: number, value: V): void {
    let entry = this.entries.get(identity);
    if (entry === undefined) {
      entry = { value, owners: new Set() };
      this.entries.set(identity, entry);
    }
    entry.owners.add(owner);
  }

  addOwner(identity: K, owner: number): void {
    const entry = this.entries.get(identity);
    if (entry === undefined) throw new Error("OwnerCache.addOwner: entry not found");
    if (entry.owners.size === 0) throw new Error("OwnerCache.addOwner: entry has no owners");
    entry.owners.add(owner);
  }

  has(identity: K): boolean {
    return this.entries.has(identity);
  }

  release(identity: K, owner: number): void {
    const entry = this.entries.get(identity);
    if (entry === undefined) return;
    entry.owners.delete(owner);
    if (entry.owners.size === 0) this.entries.delete(identity);
  }
}

export function newOwnerCache<K, V, LoadArgs>(
  parse: (identity: K, args: LoadArgs) => V,
  isExpired?: (identity: K, value: V, args: LoadArgs) => boolean,
): OwnerCache<K, V, LoadArgs> {
  return new OwnerCache(parse, isExpired);
}
