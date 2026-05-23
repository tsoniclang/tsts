/**
 * Map-of-lists data structure.
 *
 * Port of TS-Go internal/collections/multimap.go.
 *
 * In TypeScript, `Map<K, V[]>` would work directly, but we expose the same
 * API as TS-Go's MultiMap so callers ported from Go translate mechanically.
 */

export class MultiMap<K, V> {
  private readonly m: Map<K, V[]>;

  constructor(sizeHint?: number) {
    void sizeHint; // size hints aren't meaningful for JS Map
    this.m = new Map<K, V[]>();
  }

  static groupBy<K, V>(items: Iterable<V>, groupId: (item: V) => K): MultiMap<K, V> {
    const out = new MultiMap<K, V>();
    for (const item of items) {
      out.add(groupId(item), item);
    }
    return out;
  }

  has(key: K): boolean {
    return this.m.has(key);
  }

  get(key: K): readonly V[] {
    return this.m.get(key) ?? [];
  }

  add(key: K, value: V): void {
    const existing = this.m.get(key);
    if (existing === undefined) {
      this.m.set(key, [value]);
    } else {
      existing.push(value);
    }
  }

  remove(key: K, value: V): void {
    const values = this.m.get(key);
    if (values === undefined) return;
    const idx = values.indexOf(value);
    if (idx < 0) return;
    if (values.length === 1) {
      this.m.delete(key);
    } else {
      values.splice(idx, 1);
    }
  }

  removeAll(key: K): void {
    this.m.delete(key);
  }

  get size(): number {
    return this.m.size;
  }

  /** Iterate over all keys. */
  keys(): IterableIterator<K> {
    return this.m.keys();
  }

  /** Iterate over all value-arrays. */
  values(): IterableIterator<readonly V[]> {
    return this.m.values();
  }

  /** Iterate over `[key, values[]]` entries. */
  entries(): IterableIterator<readonly [K, readonly V[]]> {
    return this.m.entries() as IterableIterator<readonly [K, readonly V[]]>;
  }

  clear(): void {
    this.m.clear();
  }
}
