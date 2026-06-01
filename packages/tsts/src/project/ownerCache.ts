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
    const [entry, loaded] = this.loadOrStoreEntry(identity);
    if (!loaded || this.isExpired?.(identity, entry.value, loadArgs) === true) {
      entry.value = this.parse(identity, loadArgs);
    }
    entry.owners.add(owner);
    return entry.value;
  }

  acquire(identity: K, owner: number, value: V): void {
    const [entry, loaded] = this.loadOrStoreEntry(identity);
    if (!loaded) entry.value = value;
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

  owners(identity: K): readonly number[] {
    return [...this.entries.get(identity)?.owners ?? []].sort((left, right) => left - right);
  }

  size(): number {
    return this.entries.size;
  }

  entriesSnapshot(): readonly (readonly [K, V, readonly number[]])[] {
    const snapshot: (readonly [K, V, readonly number[]])[] = [];
    for (const [key, entry] of this.entries) snapshot.push([key, entry.value, [...entry.owners].sort((left, right) => left - right)]);
    return snapshot;
  }

  private loadOrStoreEntry(identity: K): readonly [OwnerCacheEntry<V>, boolean] {
    const existing = this.entries.get(identity);
    if (existing !== undefined && existing.owners.size > 0) return [existing, true];
    const entry = { value: undefined as V, owners: new Set<number>() };
    this.entries.set(identity, entry);
    return [entry, false];
  }
}

export function newOwnerCache<K, V, LoadArgs>(
  parse: (identity: K, args: LoadArgs) => V,
  isExpired?: (identity: K, value: V, args: LoadArgs) => boolean,
): OwnerCache<K, V, LoadArgs> {
  return new OwnerCache(parse, isExpired);
}
