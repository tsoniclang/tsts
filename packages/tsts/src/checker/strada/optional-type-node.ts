/**
 * Optional / nullable type-modeling helpers across type nodes.
 *
 * Ported from Strada `checker.go` — addOptionalTypeMarker,
 * stripOptionalTypeMarker, getNonOptionalType.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const UNDEFINED: Type = { flags: TypeFlags.Undefined } as unknown as Type;

/**
 * Returns the optional version of a type — `T | undefined`.
 */
export function getOptionalType(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Undefined) !== 0) return t;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    if (types.some((c) => ((c as { flags?: number }).flags ?? 0 & TypeFlags.Undefined) !== 0)) {
      return t;
    }
    return { flags: TypeFlags.Union, types: [...types, UNDEFINED] } as unknown as Type;
  }
  return { flags: TypeFlags.Union, types: [t, UNDEFINED] } as unknown as Type;
}

/**
 * Returns the non-optional version of a type — removes `undefined`.
 */
export function getNonOptionalType(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    if ((flags & TypeFlags.Undefined) !== 0) {
      return { flags: TypeFlags.Never } as unknown as Type;
    }
    return t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => {
    const cf = (c as { flags?: number }).flags ?? 0;
    return (cf & TypeFlags.Undefined) === 0;
  });
  if (remaining.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Returns true when a type includes `undefined` as a constituent.
 */
export function isOptionalType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Undefined) !== 0) return true;
  if ((flags & TypeFlags.Union) === 0) return false;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return types.some((c) => ((c as { flags?: number }).flags ?? 0 & TypeFlags.Undefined) !== 0);
}

/**
 * Returns the nullable version of a type — `T | null | undefined`.
 */
export function getNullableType(t: Type): Type {
  const nullType: Type = { flags: TypeFlags.Null } as unknown as Type;
  const withUndefined = getOptionalType(t);
  const flags = (withUndefined as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (withUndefined as unknown as { types?: readonly Type[] }).types ?? [];
    if (types.some((c) => ((c as { flags?: number }).flags ?? 0 & TypeFlags.Null) !== 0)) {
      return withUndefined;
    }
    return { flags: TypeFlags.Union, types: [...types, nullType] } as unknown as Type;
  }
  return { flags: TypeFlags.Union, types: [withUndefined, nullType] } as unknown as Type;
}
