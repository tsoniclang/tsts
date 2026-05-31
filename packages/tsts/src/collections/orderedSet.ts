/**
 * Insertion-ordered set.
 *
 * Port of TS-Go `internal/collections/ordered_set.go` (54 LoC).
 * JS `Set` is already insertion-ordered, but we wrap it for API
 * parity with TS-Go's OrderedSet.
 */

export class OrderedSet<T> {
  private readonly set = new Set<T>();

  static withSizeHint<T>(_hint: number): OrderedSet<T> {
    return new OrderedSet<T>();
  }

  add(value: T): boolean {
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

  *values(): IterableIterator<T> {
    yield* this.set.values();
  }

  *keys(): IterableIterator<T> {
    yield* this.set.values();
  }

  [Symbol.iterator](): IterableIterator<T> {
    return this.set.values();
  }

  get size(): number {
    return this.set.size;
  }

  clear(): void {
    this.set.clear();
  }

  clone(): OrderedSet<T> {
    const s = new OrderedSet<T>();
    for (const v of this.set) s.add(v);
    return s;
  }
}

export function newOrderedSetWithSizeHint<T>(hint: number): OrderedSet<T> {
  return OrderedSet.withSizeHint<T>(hint);
}
