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
    const existing = this.entries.get(identity);
    if (existing !== undefined) {
      existing.refCount += 1;
      return existing.value;
    }
    const value = this.parse(identity, acquireArgs);
    this.entries.set(identity, { value, refCount: 1 });
    return value;
  }

  has(identity: K): boolean {
    return this.entries.has(identity);
  }

  ref(identity: K): void {
    const entry = this.entries.get(identity);
    if (entry === undefined) throw new Error("cache entry not found");
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
}

export function newRefCountCache<K, V, AcquireArgs>(
  options: RefCountCacheOptions,
  parse: (identity: K, args: AcquireArgs) => V,
): RefCountCache<K, V, AcquireArgs> {
  return new RefCountCache(options, parse);
}
