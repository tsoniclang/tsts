/**
 * Generic stack.
 *
 * Port of TS-Go internal/core/stack.go. TypeScript's Array can serve as a
 * stack (push/pop), but exposing this class makes ported Go code translate
 * mechanically.
 */

export class Stack<T> {
  private readonly data: T[] = [];

  push(item: T): void {
    this.data.push(item);
  }

  pop(): T {
    if (this.data.length === 0) throw new Error("stack is empty");
    return this.data.pop()!;
  }

  peek(): T {
    if (this.data.length === 0) throw new Error("stack is empty");
    return this.data[this.data.length - 1]!;
  }

  get size(): number {
    return this.data.length;
  }

  /** Iterate from bottom to top. */
  *[Symbol.iterator](): IterableIterator<T> {
    for (const item of this.data) {
      yield item;
    }
  }
}
