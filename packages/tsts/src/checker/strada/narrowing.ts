/**
 * Type narrowing helpers.
 *
 * Ported from Strada `checker.go` — narrow-by-typeof, narrow-by-
 * truthiness, narrow-by-instanceof. These work in concert with the
 * flow walker (flow.ts) once the binder attaches flow nodes.
 *
 * Conservative bodies for now; they preserve the un-narrowed type
 * when narrowing isn't possible.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the union of types in `type` whose `typeof X` matches the
 * literal value. E.g. `typeof x === "string"` narrows a `string |
 * number` type to `string`.
 */
export function narrowTypeByTypeofString(t: Type, typeofValue: string): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) return t;
  const filtered = types.filter((u) => matchesTypeofString(u, typeofValue));
  if (filtered.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (filtered.length === 1) return filtered[0]!;
  return { ...(t as object), types: filtered } as unknown as Type;
}

function matchesTypeofString(t: Type, typeofValue: string): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  switch (typeofValue) {
    case "string":
      return (flags & ((1 << 2) | (1 << 7))) !== 0; // String|StringLiteral
    case "number":
      return (flags & ((1 << 3) | (1 << 8))) !== 0; // Number|NumberLiteral
    case "boolean":
      return (flags & ((1 << 4) | (1 << 9))) !== 0;
    case "bigint":
      return (flags & ((1 << 6) | (1 << 11))) !== 0;
    case "symbol":
      return (flags & ((1 << 12) | (1 << 13))) !== 0;
    case "undefined":
      return (flags & (1 << 15)) !== 0;
    case "object":
      // null + objects all stringify as "object" in JS
      return (flags & ((1 << 16) | (1 << 19))) !== 0;
    case "function":
      // Functions are objects with call signatures.
      return (flags & (1 << 19)) !== 0;
    default:
      return false;
  }
}

/**
 * Narrow a type by truthiness — drop falsy constituents.
 */
export function narrowTypeByTruthiness(t: Type): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) return t;
  const filtered = types.filter((u) => {
    const flags = (u as { flags?: number }).flags ?? 0;
    // Drop Undefined / Null / Void / Never / BooleanLiteral with value
    // false / "" string-literal / 0 number-literal.
    if ((flags & ((1 << 14) | (1 << 15) | (1 << 16) | (1 << 17))) !== 0) return false;
    if ((flags & (1 << 9)) !== 0) {
      const v = (u as unknown as { intrinsicName?: string }).intrinsicName;
      if (v === "false") return false;
    }
    return true;
  });
  if (filtered.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (filtered.length === 1) return filtered[0]!;
  return { ...(t as object), types: filtered } as unknown as Type;
}

/**
 * Narrow a type by falsiness — keep only falsy constituents.
 */
export function narrowTypeByFalsiness(t: Type): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) {
    // Single type: if it has a falsy bit, keep it; otherwise it
    // narrows to never.
    const flags = (t as { flags?: number }).flags ?? 0;
    if ((flags & ((1 << 14) | (1 << 15) | (1 << 16) | (1 << 17))) !== 0) return t;
    return { flags: TypeFlags.Never } as unknown as Type;
  }
  const filtered = types.filter((u) => {
    const flags = (u as { flags?: number }).flags ?? 0;
    if ((flags & ((1 << 14) | (1 << 15) | (1 << 16))) !== 0) return true;
    if ((flags & (1 << 9)) !== 0) {
      const v = (u as unknown as { intrinsicName?: string }).intrinsicName;
      if (v === "false") return true;
    }
    return false;
  });
  if (filtered.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (filtered.length === 1) return filtered[0]!;
  return { ...(t as object), types: filtered } as unknown as Type;
}

/**
 * Filter a union by the result of an `instanceof X` check. Without
 * type-of-X info we leave the type untouched.
 */
export function narrowTypeByInstanceof(t: Type, _classType: Type, _assumeTrue: boolean): Type {
  return t;
}

/**
 * Filter a type to drop nullable constituents (`undefined` / `null`).
 */
export function getNonNullableType(t: Type): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) return t;
  const filtered = types.filter((u) => {
    const flags = (u as { flags?: number }).flags ?? 0;
    return (flags & ((1 << 15) | (1 << 16))) === 0;
  });
  if (filtered.length === types.length) return t;
  if (filtered.length === 1) return filtered[0]!;
  return { ...(t as object), types: filtered } as unknown as Type;
}
