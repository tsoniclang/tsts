/**
 * Arena allocator.
 *
 * Port of TS-Go `internal/core/arena.go` (66 LoC).
 * In Go, the arena is a single contiguous slice that gets grown in
 * doubling-with-cap-256 steps. JS has no equivalent backing storage,
 * but the same API is preserved so callers translate mechanically.
 * Each `new()` returns a fresh object; `newSlice(n)` returns a fresh
 * array. There is no actual sharing of backing storage, but
 * observable behavior (each pointer/element unique) matches.
 */

export class Arena<T> {
  private readonly factory: () => T;

  constructor(factory: () => T) {
    this.factory = factory;
  }

  newOne(): T {
    return this.factory();
  }

  newSlice(size: number): T[] {
    if (size === 0) return [];
    const out: T[] = new Array(size);
    for (let i = 0; i < size; i++) out[i] = this.factory();
    return out;
  }

  newSlice1(t: T): T[] {
    return [t];
  }

  clone(t: readonly T[]): T[] {
    return t.slice();
  }
}

export function nextArenaSize(size: number): number {
  return Math.min(Math.max(size, 1) * 2, 256);
}
