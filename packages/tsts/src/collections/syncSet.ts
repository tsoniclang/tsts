/**
 * Thread-safe set (no-op locking in JS — single-thread).
 *
 * Port of TS-Go `internal/collections/syncset.go` (77 LoC). JS runs on
 * a single thread so concurrency primitives collapse to plain Set
 * operations.
 */

export class SyncSet<T> {
  private readonly set = new Set<T>();

  add(value: T): void {
    this.set.add(value);
  }

  /**
   * Adds `value` if not already present. Returns true if added,
   * false if it was already in the set.
   */
  addIfAbsent(value: T): boolean {
    if (this.set.has(value)) return false;
    this.set.add(value);
    return true;
  }

  has(value: T): boolean {
    return this.set.has(value);
  }

  delete(value: T): boolean {
    return this.set.delete(value);
  }

  clear(): void {
    this.set.clear();
  }

  range(callback: (value: T) => boolean): void {
    for (const v of this.set) {
      if (!callback(v)) return;
    }
  }

  isEmpty(): boolean {
    return this.set.size === 0;
  }

  toSlice(): readonly T[] {
    return [...this.set];
  }

  keys(): IterableIterator<T> {
    return this.values();
  }

  *values(): IterableIterator<T> {
    yield* this.set.values();
  }

  get size(): number {
    return this.set.size;
  }
}
