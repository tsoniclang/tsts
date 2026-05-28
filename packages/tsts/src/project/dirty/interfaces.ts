/**
 * Cloneable and Value interfaces for the dirty / copy-on-write package.
 *
 * Port of TS-Go `internal/project/dirty/interfaces.go` (~15 LoC). These are
 * the foundational type declarations for the dirty-tracking package used by
 * the project builders: `Cloneable` marks types that can produce a deep copy
 * of themselves, and `Value` is the copy-on-write handle wrapping a tracked
 * value (current vs. original, dirty flag, scoped mutation helpers).
 */

export interface Cloneable<T> {
  clone(): T;
}

export interface Value<T> {
  value(): T;
  original(): T;
  dirty(): boolean;
  change(apply: (value: T) => void): void;
  changeIf(cond: (value: T) => boolean, apply: (value: T) => void): boolean;
  delete(): void;
  locked(fn: (value: Value<T>) => void): void;
}
