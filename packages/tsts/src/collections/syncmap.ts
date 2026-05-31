/**
 * SyncMap wrapper.
 *
 * Port of TS-Go `internal/collections/syncmap.go`. JavaScript execution is
 * single-threaded here, so the synchronization boundary maps to a normal Map
 * while preserving the TS-Go method contract.
 */

export class SyncMap<K, V> {
  private readonly map = new Map<K, V>();

  load(key: K): { value: V | undefined; ok: boolean } {
    if (!this.map.has(key)) {
      return { value: undefined, ok: false };
    }
    return { value: this.map.get(key), ok: true };
  }

  store(key: K, value: V): void {
    this.map.set(key, value);
  }

  loadOrStore(key: K, value: V): { actual: V; loaded: boolean } {
    if (this.map.has(key)) {
      return { actual: this.map.get(key) as V, loaded: true };
    }
    this.map.set(key, value);
    return { actual: value, loaded: false };
  }

  delete(key: K): void {
    this.map.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  range(callback: (key: K, value: V) => boolean): void {
    for (const [key, value] of this.map) {
      if (!callback(key, value)) return;
    }
  }

  size(): number {
    return this.map.size;
  }

  toMap(): ReadonlyMap<K, V> {
    return new Map(this.map);
  }

  *keys(): IterableIterator<K> {
    yield* this.map.keys();
  }

  clone(): SyncMap<K, V> {
    const clone = new SyncMap<K, V>();
    for (const [key, value] of this.map) {
      clone.store(key, value);
    }
    return clone;
  }
}
