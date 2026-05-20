/**
 * Core utilities used across the compiler.
 *
 * Port of TS-Go internal/core/core.go. Most array functions translate to
 * native Array methods; a few utilities that don't exist in JS are
 * implemented explicitly.
 *
 * Where TS-Go uses generic Go utilities, we expose the same names so
 * ported Go code translates mechanically. Where the JS native is
 * sufficient (filter, map, every, some), we wrap it.
 */

/** Returns a filtered copy. Equivalent to TS-Go's `Filter`. */
export function filter<T>(slice: readonly T[], f: (item: T) => boolean): readonly T[] {
  return slice.filter(f);
}

export function filterIndex<T>(
  slice: readonly T[],
  f: (item: T, index: number, slice: readonly T[]) => boolean
): readonly T[] {
  return slice.filter(f);
}

export function map<T, U>(slice: readonly T[], f: (item: T) => U): readonly U[] {
  return slice.map(f);
}

export function mapIndex<T, U>(slice: readonly T[], f: (item: T, index: number) => U): readonly U[] {
  return slice.map(f);
}

/** Map non-null/undefined values, dropping the rest. */
export function mapNonNil<T, U>(slice: readonly T[], f: (item: T) => U | undefined | null): readonly U[] {
  const out: U[] = [];
  for (const item of slice) {
    const mapped = f(item);
    if (mapped !== undefined && mapped !== null) out.push(mapped);
  }
  return out;
}

export function mapFiltered<T, U>(slice: readonly T[], f: (item: T) => readonly [U, boolean]): readonly U[] {
  const out: U[] = [];
  for (const item of slice) {
    const [value, include] = f(item);
    if (include) out.push(value);
  }
  return out;
}

export function flatMap<T, U>(slice: readonly T[], f: (item: T) => readonly U[]): readonly U[] {
  return slice.flatMap((x) => [...f(x)]);
}

/**
 * Like `map`, but returns the original array if no element changed.
 * Useful for AST rewrites where most calls produce no change.
 */
export function sameMap<T>(slice: readonly T[], f: (item: T) => T): readonly T[] {
  let changed = false;
  const out = slice.map((item) => {
    const mapped = f(item);
    if (mapped !== item) changed = true;
    return mapped;
  });
  return changed ? out : slice;
}

export function sameMapIndex<T>(slice: readonly T[], f: (item: T, index: number) => T): readonly T[] {
  let changed = false;
  const out = slice.map((item, i) => {
    const mapped = f(item, i);
    if (mapped !== item) changed = true;
    return mapped;
  });
  return changed ? out : slice;
}

/** Reference equality of arrays element-by-element. */
export function same<T>(a: readonly T[], b: readonly T[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export function some<T>(slice: readonly T[], f: (item: T) => boolean): boolean {
  return slice.some(f);
}

export function every<T>(slice: readonly T[], f: (item: T) => boolean): boolean {
  return slice.every(f);
}

export function or<T>(...preds: readonly ((item: T) => boolean)[]): (item: T) => boolean {
  return (item: T) => preds.some((p) => p(item));
}

export function find<T>(slice: readonly T[], f: (item: T) => boolean): T | undefined {
  return slice.find(f);
}

export function findLast<T>(slice: readonly T[], f: (item: T) => boolean): T | undefined {
  for (let i = slice.length - 1; i >= 0; i -= 1) {
    if (f(slice[i]!)) return slice[i];
  }
  return undefined;
}

export function findIndex<T>(slice: readonly T[], f: (item: T) => boolean): number {
  return slice.findIndex(f);
}

export function findLastIndex<T>(slice: readonly T[], f: (item: T) => boolean): number {
  for (let i = slice.length - 1; i >= 0; i -= 1) {
    if (f(slice[i]!)) return i;
  }
  return -1;
}

/** Ternary helper. Returns `a` if cond is true, else `b`. */
export function ifElse<T>(cond: boolean, a: T, b: T): T {
  return cond ? a : b;
}

/** Returns the first non-undefined argument. */
export function coalesce<T>(...values: readonly (T | undefined)[]): T | undefined {
  for (const v of values) {
    if (v !== undefined) return v;
  }
  return undefined;
}

/** Returns the first truthy argument. */
export function firstTruthy<T>(...values: readonly T[]): T | undefined {
  for (const v of values) {
    if (v) return v;
  }
  return undefined;
}

export function singleOrUndefined<T>(slice: readonly T[]): T | undefined {
  return slice.length === 1 ? slice[0] : undefined;
}

export function firstOrUndefined<T>(slice: readonly T[]): T | undefined {
  return slice[0];
}

export function lastOrUndefined<T>(slice: readonly T[]): T | undefined {
  return slice[slice.length - 1];
}
