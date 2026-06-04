import type { bool, int } from "@tsonic/core/types.js";
import type { GoSlice, GoSeq, GoOrdered } from "./compat.js";
import { Compare as cmpCompare } from "./cmp.js";

// Go: package slices (standard library).
//
// Slices are modeled as JS arrays (GoSlice<T> = T[]). Functions that mutate in
// place (Sort, SortFunc, SortStableFunc, Reverse) mutate the given array and
// also return it where Go returns the slice header. Functions that reslice
// (Delete, Insert, Replace, Compact, ...) return the resulting slice; in Go
// these reuse the backing array, which for our value-array model means we
// mutate and return a (possibly shorter) view. We return new/spliced arrays to
// preserve the observable result while keeping the original header semantics as
// faithful as possible for single-threaded TS.

// ---------------------------------------------------------------------------
// Search / membership
// ---------------------------------------------------------------------------

// Index returns the index of the first occurrence of v in s, or -1 if not present.
export function Index<T>(s: GoSlice<T>, v: T): int {
  for (let i = 0; i < s.length; i++) {
    if (s[i]! === v) {
      return i;
    }
  }
  return -1;
}

// IndexFunc returns the first index i satisfying f(s[i]), or -1 if none do.
export function IndexFunc<T>(s: GoSlice<T>, f: (e: T) => bool): int {
  for (let i = 0; i < s.length; i++) {
    if (f(s[i]!)) {
      return i;
    }
  }
  return -1;
}

// Contains reports whether v is present in s.
export function Contains<T>(s: GoSlice<T>, v: T): bool {
  return Index(s, v) >= 0;
}

// ContainsFunc reports whether at least one element e of s satisfies f(e).
export function ContainsFunc<T>(s: GoSlice<T>, f: (e: T) => bool): bool {
  return IndexFunc(s, f) >= 0;
}

// ---------------------------------------------------------------------------
// Equality
// ---------------------------------------------------------------------------

// Equal reports whether two slices are equal: the same length and all elements
// equal (using ==). Empty and nil slices are considered equal.
export function Equal<T>(s1: GoSlice<T>, s2: GoSlice<T>): bool {
  if (s1.length !== s2.length) {
    return false;
  }
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      return false;
    }
  }
  return true;
}

// EqualFunc reports whether two slices are equal using a comparison function on
// each pair of elements. If the lengths are different, it returns false.
export function EqualFunc<T1, T2>(
  s1: GoSlice<T1>,
  s2: GoSlice<T2>,
  eq: (a: T1, b: T2) => bool,
): bool {
  if (s1.length !== s2.length) {
    return false;
  }
  for (let i = 0; i < s1.length; i++) {
    if (!eq(s1[i]!, s2[i]!)) {
      return false;
    }
  }
  return true;
}

// ---------------------------------------------------------------------------
// Compare
// ---------------------------------------------------------------------------

// Compare compares the elements of s1 and s2, using cmp.Compare on each pair.
// It returns the first non-zero result of comparing corresponding elements; if
// both slices are equal until one ends, the shorter one is considered less.
// The result is 0 if and only if Equal(s1, s2) is true.
export function Compare<T extends GoOrdered>(s1: GoSlice<T>, s2: GoSlice<T>): int {
  const n = s1.length < s2.length ? s1.length : s2.length;
  for (let i = 0; i < n; i++) {
    const c = cmpCompare(s1[i]!, s2[i]!);
    if (c !== 0) {
      return c;
    }
  }
  if (s1.length < s2.length) {
    return -1;
  }
  if (s1.length > s2.length) {
    return 1;
  }
  return 0;
}

// CompareFunc is like Compare but uses a custom comparison function on each
// pair of elements. The result is the first non-zero result of cmp; if cmp
// always returns 0 the result is 0 if len(s1) == len(s2), -1 if len(s1) <
// len(s2), and +1 otherwise.
export function CompareFunc<T1, T2>(
  s1: GoSlice<T1>,
  s2: GoSlice<T2>,
  cmp: (a: T1, b: T2) => int,
): int {
  const n = s1.length < s2.length ? s1.length : s2.length;
  for (let i = 0; i < n; i++) {
    const c = cmp(s1[i]!, s2[i]!);
    if (c !== 0) {
      return c;
    }
  }
  if (s1.length < s2.length) {
    return -1;
  }
  if (s1.length > s2.length) {
    return 1;
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Construction / copying
// ---------------------------------------------------------------------------

// Clone returns a copy of the slice. The elements are copied using assignment,
// so this is a shallow clone. Clone(nil) returns nil in Go; we mirror that.
export function Clone<T>(s: GoSlice<T> | undefined): GoSlice<T> | undefined {
  if (s === undefined) {
    return undefined;
  }
  return s.slice();
}

// Concat returns a new slice concatenating the passed in slices.
export function Concat<T>(...slices: Array<GoSlice<T>>): GoSlice<T> {
  const result: T[] = [];
  for (const s of slices) {
    for (const e of s) {
      result.push(e);
    }
  }
  return result;
}

// Repeat returns a new slice that repeats the provided slice the given number
// of times. Repeat panics if count is negative.
export function Repeat<T>(x: GoSlice<T>, count: int): GoSlice<T> {
  if (count < 0) {
    throw new globalThis.Error("slices: negative Repeat count");
  }
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    for (const e of x) {
      result.push(e);
    }
  }
  return result;
}

// Grow increases the slice's capacity, if necessary, to guarantee space for
// another n elements. In a JS array there is no observable capacity, so Grow is
// a faithful no-op that returns the slice unchanged. Grow panics if n is
// negative.
export function Grow<T>(s: GoSlice<T>, n: int): GoSlice<T> {
  if (n < 0) {
    throw new globalThis.Error("cannot be negative");
  }
  return s;
}

// Clip removes unused capacity from the slice. JS arrays expose no spare
// capacity, so Clip returns the slice unchanged.
export function Clip<T>(s: GoSlice<T>): GoSlice<T> {
  return s;
}

// ---------------------------------------------------------------------------
// Mutation (delete / insert / replace / reverse / compact)
// ---------------------------------------------------------------------------

// Delete removes the elements s[i:j] from s, returning the modified slice.
// Delete panics if j > len(s) or s[i:j] is not a valid slice of s.
export function Delete<T>(s: GoSlice<T>, i: int, j: int): GoSlice<T> {
  if (i < 0 || j > s.length || i > j) {
    throw new globalThis.Error("slices.Delete: invalid range");
  }
  s.splice(i, j - i);
  return s;
}

// DeleteFunc removes any elements from s for which del returns true, returning
// the modified slice.
export function DeleteFunc<T>(s: GoSlice<T>, del: (e: T) => bool): GoSlice<T> {
  const i = IndexFunc(s, del);
  if (i === -1) {
    return s;
  }
  // Compact remaining elements onto the front, matching Go's in-place algorithm.
  let w = i;
  for (let k = i + 1; k < s.length; k++) {
    const e = s[k]!;
    if (!del(e)) {
      s[w] = e;
      w++;
    }
  }
  s.length = w;
  return s;
}

// Insert inserts the values v... into s at index i, returning the modified
// slice. Insert panics if i is out of range.
export function Insert<T>(s: GoSlice<T>, i: int, ...v: T[]): GoSlice<T> {
  if (i < 0 || i > s.length) {
    throw new globalThis.Error("slices.Insert: index out of range");
  }
  s.splice(i, 0, ...v);
  return s;
}

// Replace replaces the elements s[i:j] by the given v, and returns the modified
// slice. Replace panics if j > len(s) or s[i:j] is not a valid slice of s.
export function Replace<T>(s: GoSlice<T>, i: int, j: int, ...v: T[]): GoSlice<T> {
  if (i < 0 || j > s.length || i > j) {
    throw new globalThis.Error("slices.Replace: invalid range");
  }
  s.splice(i, j - i, ...v);
  return s;
}

// Reverse reverses the elements of the slice in place.
export function Reverse<T>(s: GoSlice<T>): void {
  s.reverse();
}

// Compact replaces consecutive runs of equal elements with a single copy. This
// is like the uniq command found on Unix. Compact modifies the contents of the
// slice s and returns the modified slice, which may have a smaller length.
export function Compact<T>(s: GoSlice<T>): GoSlice<T> {
  if (s.length < 2) {
    return s;
  }
  let w = 1;
  for (let k = 1; k < s.length; k++) {
    const e = s[k]!;
    if (e !== s[k - 1]!) {
      s[w] = e;
      w++;
    }
  }
  s.length = w;
  return s;
}

// CompactFunc is like Compact but uses an equality function to compare
// elements. For runs of elements that compare equal, CompactFunc keeps the
// first one.
export function CompactFunc<T>(s: GoSlice<T>, eq: (a: T, b: T) => bool): GoSlice<T> {
  if (s.length < 2) {
    return s;
  }
  let w = 1;
  for (let k = 1; k < s.length; k++) {
    const e = s[k]!;
    if (!eq(e, s[w - 1]!)) {
      s[w] = e;
      w++;
    }
  }
  s.length = w;
  return s;
}

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

// Sort sorts a slice of any ordered type in ascending order, in place. When
// sorting floating-point numbers, NaNs are ordered before other values.
export function Sort<T extends GoOrdered>(x: GoSlice<T>): void {
  x.sort((a, b) => cmpCompare(a, b));
}

// SortFunc sorts the slice x in ascending order as determined by the cmp
// function. This sort is not guaranteed to be stable. cmp(a, b) should return a
// negative number when a < b, a positive number when a > b and zero when a == b
// or a and b are incomparable.
export function SortFunc<T>(x: GoSlice<T>, cmp: (a: T, b: T) => int): void {
  // Array.prototype.sort interprets the sign of the comparator result, which is
  // exactly Go's tri-state convention.
  x.sort((a, b) => cmp(a, b));
}

// SortStableFunc sorts the slice x while keeping the original order of equal
// elements, using cmp to compare elements in the same way as SortFunc.
// JS Array.prototype.sort is guaranteed stable (ES2019+), so this matches.
export function SortStableFunc<T>(x: GoSlice<T>, cmp: (a: T, b: T) => int): void {
  x.sort((a, b) => cmp(a, b));
}

// Sorted collects values from an iterator into a new slice, sorts the slice in
// ascending order, and returns it.
export function Sorted<T extends GoOrdered>(seq: GoSeq<T>): GoSlice<T> {
  const result = Collect(seq);
  Sort(result);
  return result;
}

// SortedFunc collects values from an iterator into a new slice, sorts the slice
// using the comparison function, and returns it.
export function SortedFunc<T>(seq: GoSeq<T>, cmp: (a: T, b: T) => int): GoSlice<T> {
  const result = Collect(seq);
  SortFunc(result, cmp);
  return result;
}

// IsSorted reports whether x is sorted in ascending order.
export function IsSorted<T extends GoOrdered>(x: GoSlice<T>): bool {
  for (let i = x.length - 1; i > 0; i--) {
    if (cmpCompare(x[i]!, x[i - 1]!) < 0) {
      return false;
    }
  }
  return true;
}

// ---------------------------------------------------------------------------
// Binary search
// ---------------------------------------------------------------------------

// BinarySearch searches for target in a sorted slice and returns the position
// where target is found, or the position where target would appear in the sort
// order; it also returns a bool saying whether target is really found in the
// slice. The slice must be sorted in increasing order.
export function BinarySearch<T extends GoOrdered>(x: GoSlice<T>, target: T): [int, bool] {
  return BinarySearchFunc(x, target, (a, b) => cmpCompare(a, b));
}

// BinarySearchFunc works like BinarySearch, but uses a custom comparison
// function. The slice must be sorted in increasing order, where "increasing" is
// defined by cmp. cmp should return 0 if the slice element matches the target,
// a negative number if the slice element precedes the target, or a positive
// number if the slice element follows the target. cmp must implement the same
// ordering as the slice, such that if cmp(a, t) < 0 and cmp(b, t) >= 0, then a
// must precede b in the slice.
export function BinarySearchFunc<T, S>(
  x: GoSlice<T>,
  target: S,
  cmp: (e: T, t: S) => int,
): [int, bool] {
  // Inlined sort.Search: smallest index i in [0, n) such that cmp(x[i], target) >= 0.
  let i = 0;
  let j = x.length;
  while (i < j) {
    const h = (i + ((j - i) >> 1)) | 0;
    if (cmp(x[h]!, target) < 0) {
      i = h + 1;
    } else {
      j = h;
    }
  }
  // i is the smallest index where cmp(x[i], target) >= 0, or len(x).
  const found = i < x.length && cmp(x[i]!, target) === 0;
  return [i, found];
}

// ---------------------------------------------------------------------------
// Iterators (Go 1.23 range-over-func)
// ---------------------------------------------------------------------------

// Values returns an iterator that yields the slice elements in order.
export function Values<T>(s: GoSlice<T>): GoSeq<T> {
  return (yieldValue: (value: T) => bool): void => {
    for (let i = 0; i < s.length; i++) {
      if (!yieldValue(s[i]!)) {
        return;
      }
    }
  };
}

// Collect collects values from seq into a new slice and returns it.
export function Collect<T>(seq: GoSeq<T>): GoSlice<T> {
  return AppendSeq([], seq);
}

// AppendSeq appends the values from seq to the slice and returns the extended
// slice.
export function AppendSeq<T>(s: GoSlice<T>, seq: GoSeq<T>): GoSlice<T> {
  seq((value: T): bool => {
    s.push(value);
    return true;
  });
  return s;
}
