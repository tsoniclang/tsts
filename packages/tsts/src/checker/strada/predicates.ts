/**
 * Type predicates.
 *
 * Ported from Strada `checker.go` — small predicates over the Type
 * shape (isAnyType, isStringLikeType, etc.). Centralizing them here
 * keeps individual call sites tidy and lets us cache common values.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export function isAnyType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Any) !== 0;
}

export function isUnknownType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Unknown) !== 0;
}

export function isNeverType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Never) !== 0;
}

export function isVoidType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Void) !== 0;
}

export function isNullType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Null) !== 0;
}

export function isUndefinedType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Undefined) !== 0;
}

export function isStringLikeType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & (TypeFlags.String | TypeFlags.StringLiteral | TypeFlags.TemplateLiteral)) !== 0;
}

export function isNumberLikeType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & (TypeFlags.Number | TypeFlags.NumberLiteral)) !== 0;
}

export function isBooleanLikeType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & (TypeFlags.Boolean | TypeFlags.BooleanLiteral)) !== 0;
}

export function isBigIntLikeType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & (TypeFlags.BigInt | TypeFlags.BigIntLiteral)) !== 0;
}

export function isESSymbolLikeType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & (TypeFlags.ESSymbol | TypeFlags.UniqueESSymbol)) !== 0;
}

export function isObjectType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Object) !== 0;
}

export function isUnionType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Union) !== 0;
}

export function isIntersectionType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Intersection) !== 0;
}

export function isUnionOrIntersectionType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & (TypeFlags.Union | TypeFlags.Intersection)) !== 0;
}

export function isLiteralType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & TypeFlags.Literal) !== 0;
}

export function isPrimitiveType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & TypeFlags.Primitive) !== 0;
}

export function isNullableType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  return (f & TypeFlags.Nullable) !== 0;
}

export function isFalsyType(t: Type): boolean {
  const f = (t as { flags?: number }).flags ?? 0;
  if ((f & (TypeFlags.Void | TypeFlags.Undefined | TypeFlags.Null | TypeFlags.Never)) !== 0) return true;
  if ((f & TypeFlags.BooleanLiteral) !== 0) {
    return (t as unknown as { intrinsicName?: string }).intrinsicName === "false";
  }
  return false;
}

export function isTypeParameter(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.TypeParameter) !== 0;
}

export function isTypeVariable(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.TypeVariable) !== 0;
}

export function isInstantiable(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.Instantiable) !== 0;
}

export function isStructuredType(t: Type): boolean {
  return ((t as { flags?: number }).flags ?? 0 & TypeFlags.StructuredType) !== 0;
}
