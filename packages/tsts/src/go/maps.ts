import type { bool } from "@tsonic/core/types.js";
import type { GoMap, GoSeq } from "./compat.js";

// Go: package maps (standard library, Go 1.21+/1.23 iterators).
//
// In a single-threaded TypeScript runtime a Go map is modeled as a JS Map.
// Stdlib map iteration order is unspecified in Go; we iterate in JS Map
// insertion order, which is a valid concrete ordering.

// Clone returns a copy of m. This is a shallow clone: the new keys and values
// are set using ordinary assignment.
export function Clone<K, V>(m: GoMap<K, V> | undefined): GoMap<K, V> | undefined {
  // Go: Clone(nil) returns nil.
  if (m === undefined) {
    return undefined;
  }
  return new globalThis.Map<K, V>(m);
}

// Copy copies all key/value pairs in src adding them to dst. When a key in src
// is already present in dst, the value in dst will be overwritten by the value
// associated with the key in src.
export function Copy<K, V>(dst: GoMap<K, V>, src: GoMap<K, V>): void {
  for (const [k, v] of src) {
    dst.set(k, v);
  }
}

// Equal reports whether two maps contain the same key/value pairs.
// Values are compared using ==.
export function Equal<K, V>(m1: GoMap<K, V>, m2: GoMap<K, V>): bool {
  if (m1.size !== m2.size) {
    return false;
  }
  for (const [k, v1] of m1) {
    if (!m2.has(k)) {
      return false;
    }
    const v2 = m2.get(k);
    // Go uses == on comparable values; mirror with strict equality.
    if (v1 !== v2) {
      return false;
    }
  }
  return true;
}

// EqualFunc is like Equal, but compares values using eq. Keys are still
// compared with ==.
export function EqualFunc<K, V1, V2>(
  m1: GoMap<K, V1>,
  m2: GoMap<K, V2>,
  eq: (v1: V1, v2: V2) => bool,
): bool {
  if (m1.size !== m2.size) {
    return false;
  }
  for (const [k, v1] of m1) {
    if (!m2.has(k)) {
      return false;
    }
    const v2 = m2.get(k) as V2;
    if (!eq(v1, v2)) {
      return false;
    }
  }
  return true;
}

// Keys returns an iterator over keys in m. The iteration order is not
// specified and is not guaranteed to be the same from one call to the next.
export function Keys<K, V>(m: GoMap<K, V> | undefined): GoSeq<K> {
  return (yieldValue: (value: K) => bool): void => {
    for (const k of (m ?? new globalThis.Map<K, V>()).keys()) {
      if (!yieldValue(k)) {
        return;
      }
    }
  };
}

// Values returns an iterator over values in m. The iteration order is not
// specified and is not guaranteed to be the same from one call to the next.
export function Values<K, V>(m: GoMap<K, V> | undefined): GoSeq<V> {
  return (yieldValue: (value: V) => bool): void => {
    for (const v of (m ?? new globalThis.Map<K, V>()).values()) {
      if (!yieldValue(v)) {
        return;
      }
    }
  };
}

// ---------------------------------------------------------------------------
// Porter false positives.
//
// The following symbols were attributed to the stdlib `maps` package by the
// porter, but at every call site in typescript-go they are method calls on a
// local variable named `maps` that is a *collections.OrderedMap (see
// internal/testutil/harnessutil/harnessutil.go: `maps.Set(...)`,
// `maps.GetOrZero(...)`, `maps.Delete(single-arg)`). The Go standard `maps`
// package has no Set/GetOrZero functions and no single-argument Delete. These
// belong to collections.OrderedMap and must not be implemented here, or callers
// would silently get wrong behavior. They are intentionally explicit throws.
// ---------------------------------------------------------------------------

// Set is NOT a stdlib maps function (it is collections.OrderedMap.Set).
export function Set(..._args: unknown[]): never {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/maps.Set: not a Go stdlib `maps` function; porter mis-attributed a collections.OrderedMap.Set method call (harnessutil.go) to the stdlib maps package",
  );
}

// GetOrZero is NOT a stdlib maps function (it is collections.OrderedMap.GetOrZero).
export function GetOrZero(..._args: unknown[]): never {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/maps.GetOrZero: not a Go stdlib `maps` function; porter mis-attributed a collections.OrderedMap.GetOrZero method call (harnessutil.go) to the stdlib maps package",
  );
}

// Delete here is NOT the stdlib maps function. The only call site
// (`maps.Delete(outputs.JS.UnitName)`) is a single-argument
// collections.OrderedMap.Delete(key) method call, whereas Go stdlib `maps` has
// no plain Delete (only DeleteFunc). Implementing a one-arg Delete on a free
// map would be meaningless. Left as an explicit throw.
export function Delete(..._args: unknown[]): never {
  throw new globalThis.Error(
    "UNIMPLEMENTED go/maps.Delete: not a Go stdlib `maps` function; the single-arg call site is collections.OrderedMap.Delete(key) (harnessutil.go), not stdlib maps",
  );
}
