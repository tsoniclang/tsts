export interface RefCountCacheOptions {
  readonly disableDeletion?: boolean;
}

interface RefCountCacheEntry<V> {
  value: V;
  refCount: number;
}

export class RefCountCache<K, V, AcquireArgs> {
  readonly options: RefCountCacheOptions;
  private readonly entries = new Map<K, RefCountCacheEntry<V>>();
  private readonly parse: (identity: K, args: AcquireArgs) => V;

  constructor(options: RefCountCacheOptions, parse: (identity: K, args: AcquireArgs) => V) {
    this.options = options;
    this.parse = parse;
  }

  acquire(identity: K, acquireArgs: AcquireArgs): V {
    const existing = this.loadOrStoreNewEntry(identity);
    if (existing.refCount > 1) return existing.value;
    const value = this.parse(identity, acquireArgs);
    existing.value = value;
    return value;
  }

  has(identity: K): boolean {
    return this.entries.has(identity);
  }

  ref(identity: K): void {
    const entry = this.entries.get(identity);
    if (entry === undefined) throw new Error("cache entry not found");
    if (entry.refCount <= 0 && this.options.disableDeletion !== true) {
      const revived = this.loadOrStoreNewEntry(identity);
      revived.value = entry.value;
      return;
    }
    entry.refCount += 1;
  }

  deref(identity: K): void {
    const entry = this.entries.get(identity);
    if (entry === undefined) return;
    entry.refCount -= 1;
    if (entry.refCount <= 0 && this.options.disableDeletion !== true) {
      this.entries.delete(identity);
    }
  }

  size(): number {
    return this.entries.size;
  }

  refCount(identity: K): number {
    return this.entries.get(identity)?.refCount ?? 0;
  }

  entriesSnapshot(): readonly (readonly [K, V, number])[] {
    const snapshot: (readonly [K, V, number])[] = [];
    for (const [key, entry] of this.entries) snapshot.push([key, entry.value, entry.refCount]);
    return snapshot;
  }

  private loadOrStoreNewEntry(identity: K): RefCountCacheEntry<V> {
    const existing = this.entries.get(identity);
    if (existing !== undefined && (existing.refCount > 0 || this.options.disableDeletion === true)) {
      existing.refCount += 1;
      return existing;
    }
    const entry = { value: undefined as V, refCount: 1 };
    this.entries.set(identity, entry);
    return entry;
  }
}

export function newRefCountCache<K, V, AcquireArgs>(
  options: RefCountCacheOptions,
  parse: (identity: K, args: AcquireArgs) => V,
): RefCountCache<K, V, AcquireArgs> {
  return new RefCountCache(options, parse);
}
