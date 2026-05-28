/**
 * Literal-type helpers — predicates and value extraction across
 * all literal kinds.
 *
 * Ported from Strada `checker.go` — isLiteralOfPrimitiveType,
 * isStringLiteralType, isNumberLiteralType, isBooleanLiteralType.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the type is a string-literal type.
 */
export function isStringLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.StringLiteral) !== 0;
}

/**
 * Returns true when the type is a number-literal type.
 */
export function isNumberLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.NumberLiteral) !== 0;
}

/**
 * Returns true when the type is a boolean-literal type.
 */
export function isBooleanLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.BooleanLiteral) !== 0;
}

/**
 * Returns true when the type is a bigint-literal type.
 */
export function isBigIntLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.BigIntLiteral) !== 0;
}

/**
 * Returns true when the type is any literal flavor.
 */
export function isAnyLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Literal) !== 0;
}

/**
 * Returns the literal value as a string, regardless of underlying
 * primitive type.
 */
export function getLiteralValueAsString(t: Type): string | undefined {
  if (!isAnyLiteralType(t)) return undefined;
  const value = (t as unknown as { value?: string | number | boolean }).value;
  if (value === undefined) return undefined;
  return String(value);
}

/**
 * Returns the raw literal value (typed by literal flavor).
 */
export function getLiteralValue(t: Type): string | number | boolean | undefined {
  if (!isAnyLiteralType(t)) return undefined;
  return (t as unknown as { value?: string | number | boolean }).value;
}

/**
 * Returns true when two literal types have the same value.
 */
export function areLiteralsEqual(a: Type, b: Type): boolean {
  if (!isAnyLiteralType(a) || !isAnyLiteralType(b)) return false;
  const af = (a as { flags?: number }).flags ?? 0;
  const bf = (b as { flags?: number }).flags ?? 0;
  if ((af & TypeFlags.Literal) !== (bf & TypeFlags.Literal)) return false;
  return getLiteralValue(a) === getLiteralValue(b);
}

/**
 * Returns the canonical "zero" value for a literal flag.
 */
export function getLiteralZeroValue(flags: number): string | number | boolean | undefined {
  if ((flags & TypeFlags.StringLiteral) !== 0) return "";
  if ((flags & TypeFlags.NumberLiteral) !== 0) return 0;
  if ((flags & TypeFlags.BooleanLiteral) !== 0) return false;
  return undefined;
}

/**
 * Returns true when the literal value is falsy.
 */
export function isFalsyLiteral(t: Type): boolean {
  const value = getLiteralValue(t);
  if (value === undefined) return false;
  return !value;
}
