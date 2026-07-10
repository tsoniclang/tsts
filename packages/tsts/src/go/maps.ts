import type { bool } from "./scalars.js";
import type { GoMap, GoPtr, GoSeq } from "./compat.js";
import { GoMapGetExisting } from "./compat.js";

// Go: package maps (standard library, Go 1.21+/1.23 iterators).
//
// In a single-threaded TypeScript runtime a Go map is modeled as a JS Map.
// Stdlib map iteration order is unspecified in Go; we iterate in JS Map
// insertion order, which is a valid concrete ordering.

// Clone returns a copy of m. This is a shallow clone: the new keys and values
// are set using ordinary assignment.
export function Clone<K, V>(m: GoPtr<GoMap<K, V>>): GoPtr<GoMap<K, V>> {
  // Go: Clone(nil) returns nil.
  if (m === undefined) {
    return undefined;
  }
  return new globalThis.Map<K, V>(m);
}

// Copy copies all key/value pairs in src adding them to dst. When a key in src
// is already present in dst, the value in dst will be overwritten by the value
// associated with the key in src.
export function Copy<K, V>(dst: GoPtr<GoMap<K, V>>, src: GoPtr<GoMap<K, V>>): void {
  if (src === undefined) {
    return;
  }
  for (const [k, v] of src) {
    if (dst === undefined) {
      throw new TypeError("assignment to entry in nil map");
    }
    dst.set(k, v);
  }
}

// Equal reports whether two maps contain the same key/value pairs.
// Values are compared using ==.
export function Equal<K, V>(m1: GoPtr<GoMap<K, V>>, m2: GoPtr<GoMap<K, V>>): bool {
  if ((m1?.size ?? 0) !== (m2?.size ?? 0)) {
    return false;
  }
  if (m1 === undefined) {
    return true;
  }
  for (const [k, v1] of m1) {
    if (m2 === undefined || !m2.has(k)) {
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
  m1: GoPtr<GoMap<K, V1>>,
  m2: GoPtr<GoMap<K, V2>>,
  eq: (v1: V1, v2: V2) => bool,
): bool {
  if ((m1?.size ?? 0) !== (m2?.size ?? 0)) {
    return false;
  }
  if (m1 === undefined) {
    return true;
  }
  for (const [k, v1] of m1) {
    if (m2 === undefined || !m2.has(k)) {
      return false;
    }
    const v2 = GoMapGetExisting(m2, k);
    if (!eq(v1, v2)) {
      return false;
    }
  }
  return true;
}

// Keys returns an iterator over keys in m. The iteration order is not
// specified and is not guaranteed to be the same from one call to the next.
export function Keys<K, V>(m: GoPtr<GoMap<K, V>>): GoSeq<K> {
  return (yieldValue: (value: K) => bool): void => {
    if (m === undefined) {
      return;
    }
    for (const k of m.keys()) {
      if (!yieldValue(k)) {
        return;
      }
    }
  };
}

// Values returns an iterator over values in m. The iteration order is not
// specified and is not guaranteed to be the same from one call to the next.
export function Values<K, V>(m: GoPtr<GoMap<K, V>>): GoSeq<V> {
  return (yieldValue: (value: V) => bool): void => {
    if (m === undefined) {
      return;
    }
    for (const v of m.values()) {
      if (!yieldValue(v)) {
        return;
      }
    }
  };
}

// DeleteFunc deletes any key/value pairs from m for which del returns true.
export function DeleteFunc<K, V>(m: GoPtr<GoMap<K, V>>, del: (key: K, value: V) => bool): void {
  if (m === undefined) {
    return;
  }
  for (const [key, value] of [...m]) {
    if (del(key, value)) {
      m.delete(key);
    }
  }
}
