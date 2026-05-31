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

  Load(key: K): { value: V | undefined; ok: boolean } {
    return this.load(key);
  }

  store(key: K, value: V): void {
    this.map.set(key, value);
  }

  Store(key: K, value: V): void {
    this.store(key, value);
  }

  loadOrStore(key: K, value: V): { actual: V; loaded: boolean } {
    if (this.map.has(key)) {
      return { actual: this.map.get(key) as V, loaded: true };
    }
    this.map.set(key, value);
    return { actual: value, loaded: false };
  }

  LoadOrStore(key: K, value: V): { actual: V; loaded: boolean } {
    return this.loadOrStore(key, value);
  }

  delete(key: K): void {
    this.map.delete(key);
  }

  Delete(key: K): void {
    this.delete(key);
  }

  clear(): void {
    this.map.clear();
  }

  Clear(): void {
    this.clear();
  }

  range(callback: (key: K, value: V) => boolean): void {
    for (const [key, value] of this.map) {
      if (!callback(key, value)) return;
    }
  }

  Range(callback: (key: K, value: V) => boolean): void {
    this.range(callback);
  }

  size(): number {
    return this.map.size;
  }

  Size(): number {
    return this.size();
  }

  toMap(): ReadonlyMap<K, V> {
    return new Map(this.map);
  }

  ToMap(): ReadonlyMap<K, V> {
    return this.toMap();
  }

  *keys(): IterableIterator<K> {
    yield* this.map.keys();
  }

  Keys(): IterableIterator<K> {
    return this.keys();
  }

  clone(): SyncMap<K, V> {
    const clone = new SyncMap<K, V>();
    for (const [key, value] of this.map) {
      clone.store(key, value);
    }
    return clone;
  }

  Clone(): SyncMap<K, V> {
    return this.clone();
  }
}
