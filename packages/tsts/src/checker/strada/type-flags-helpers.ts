/**
 * TypeFlags bitmask helpers.
 *
 * Ported from Strada `utilities.go` — getTypeFlagName, hasTypeFlag,
 * typeFlagsContaining.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the flags of a type.
 */
export function getTypeFlags(t: Type): number {
  return (t as { flags?: number }).flags ?? 0;
}

/**
 * Returns true when the type has any flag in the mask.
 */
export function hasAnyTypeFlag(t: Type, mask: number): boolean {
  return (getTypeFlags(t) & mask) !== 0;
}

/**
 * Returns true when the type has every flag in the mask.
 */
export function hasAllTypeFlags(t: Type, mask: number): boolean {
  return (getTypeFlags(t) & mask) === mask;
}

/**
 * Returns true when the type has none of the flags in the mask.
 */
export function hasNoTypeFlag(t: Type, mask: number): boolean {
  return (getTypeFlags(t) & mask) === 0;
}

/**
 * Returns the type-flags that two types share.
 */
export function getSharedFlags(a: Type, b: Type): number {
  return getTypeFlags(a) & getTypeFlags(b);
}

/**
 * Returns the type-flags from `a` not present in `b`.
 */
export function getExclusiveFlags(a: Type, b: Type): number {
  return getTypeFlags(a) & ~getTypeFlags(b);
}

/**
 * Returns true when the type is one of the "scalar" primitives
 * (no composite shape).
 */
export function isScalarType(t: Type): boolean {
  const flags = getTypeFlags(t);
  return (flags & (
    TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean |
    TypeFlags.BigInt | TypeFlags.ESSymbol | TypeFlags.Null |
    TypeFlags.Undefined | TypeFlags.Void | TypeFlags.Never |
    TypeFlags.StringLiteral | TypeFlags.NumberLiteral |
    TypeFlags.BooleanLiteral | TypeFlags.BigIntLiteral |
    TypeFlags.UniqueESSymbol
  )) !== 0;
}

/**
 * Returns true when the type is a "composite" (union or intersection).
 */
export function isCompositeType(t: Type): boolean {
  return hasAnyTypeFlag(t, TypeFlags.Union | TypeFlags.Intersection);
}

/**
 * Returns true when the type is a "structured" type (object-like).
 */
export function isStructuredType(t: Type): boolean {
  return hasAnyTypeFlag(t, TypeFlags.Object | TypeFlags.Union | TypeFlags.Intersection);
}

/**
 * Returns true when the type is one of the "instantiable" type
 * variants (parameter, indexed-access, conditional, substitution).
 */
export function isInstantiableType(t: Type): boolean {
  return hasAnyTypeFlag(
    t,
    TypeFlags.TypeParameter |
      TypeFlags.IndexedAccess |
      TypeFlags.Conditional |
      TypeFlags.Index,
  );
}
