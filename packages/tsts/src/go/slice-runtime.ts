import type { int } from "./scalars.js";
import type { GoSlice } from "./compat.js";

export function GoSlicePrefix<T>(slice: GoSlice<T>, end: int): GoSlice<T> {
  if (end < 0 || end > slice.length) {
    throw new globalThis.Error("slice bounds out of range");
  }
  if (end === slice.length) {
    return slice;
  }
  return slice.slice(0, end);
}

export function GoSliceRange<T>(slice: GoSlice<T>, start: int, end: int = slice.length): GoSlice<T> {
  if (start < 0 || end < start || end > slice.length) {
    throw new globalThis.Error("slice bounds out of range");
  }
  if (start === 0) {
    return GoSlicePrefix(slice, end);
  }
  return slice.slice(start, end);
}
