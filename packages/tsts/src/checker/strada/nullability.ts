/**
 * Nullability helpers.
 *
 * Ported from Strada `checker.go` — nullability filtering, strictNull
 * Checks awareness, NonNullableType construction.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const UNDEFINED: Type = { flags: TypeFlags.Undefined } as unknown as Type;
const NULL: Type = { flags: TypeFlags.Null } as unknown as Type;

/**
 * Returns true when the type contains `undefined` or `null` as a
 * constituent.
 */
export function isNullableType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Nullable) !== 0) return true;
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) return false;
  return types.some((u) => {
    const f = (u as { flags?: number }).flags ?? 0;
    return (f & TypeFlags.Nullable) !== 0;
  });
}

/**
 * Returns true when the type contains `undefined`.
 */
export function containsUndefined(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Undefined) !== 0) return true;
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) return false;
  return types.some((u) => ((u as { flags?: number }).flags ?? 0 & TypeFlags.Undefined) !== 0);
}

/**
 * Returns true when the type contains `null`.
 */
export function containsNull(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Null) !== 0) return true;
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) return false;
  return types.some((u) => ((u as { flags?: number }).flags ?? 0 & TypeFlags.Null) !== 0);
}

/**
 * Returns a new type with `null` and `undefined` removed (and Never
 * when nothing remains).
 */
export function getNonNullableType(t: Type): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) {
    const flags = (t as { flags?: number }).flags ?? 0;
    if ((flags & TypeFlags.Nullable) !== 0) return { flags: TypeFlags.Never } as unknown as Type;
    return t;
  }
  const filtered = types.filter((u) => {
    const f = (u as { flags?: number }).flags ?? 0;
    return (f & TypeFlags.Nullable) === 0;
  });
  if (filtered.length === types.length) return t;
  if (filtered.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (filtered.length === 1) return filtered[0]!;
  return { ...(t as object), types: filtered } as unknown as Type;
}

/**
 * Returns a new type with `undefined` removed (preserves `null`).
 */
export function getTypeWithFacts_removeUndefined(t: Type): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) {
    const flags = (t as { flags?: number }).flags ?? 0;
    if ((flags & TypeFlags.Undefined) !== 0) return { flags: TypeFlags.Never } as unknown as Type;
    return t;
  }
  const filtered = types.filter((u) => ((u as { flags?: number }).flags ?? 0 & TypeFlags.Undefined) === 0);
  if (filtered.length === types.length) return t;
  if (filtered.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (filtered.length === 1) return filtered[0]!;
  return { ...(t as object), types: filtered } as unknown as Type;
}

/**
 * Returns a new type that adds `undefined` to the type.
 */
export function getOptionalType(t: Type): Type {
  if (containsUndefined(t)) return t;
  return { flags: TypeFlags.Union, types: [t, UNDEFINED] } as unknown as Type;
}

/**
 * Returns a new type that adds `null` and `undefined` to the type.
 */
export function getNullableType(t: Type): Type {
  const hasU = containsUndefined(t);
  const hasN = containsNull(t);
  if (hasU && hasN) return t;
  const types: Type[] = [t];
  if (!hasU) types.push(UNDEFINED);
  if (!hasN) types.push(NULL);
  return { flags: TypeFlags.Union, types } as unknown as Type;
}
