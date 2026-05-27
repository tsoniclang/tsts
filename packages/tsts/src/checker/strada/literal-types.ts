/**
 * Literal type construction and inspection.
 *
 * Ported from Strada `checker.go` — getLiteralType, getFreshTypeOfLiteralType,
 * getRegularTypeOfLiteralType, isStringLiteralType, etc.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Builds a `"abc"` string-literal type.
 */
export function getStringLiteralType(value: string): Type {
  return { flags: TypeFlags.StringLiteral, value } as unknown as Type;
}

/**
 * Builds a `42` number-literal type.
 */
export function getNumberLiteralType(value: number): Type {
  return { flags: TypeFlags.NumberLiteral, value } as unknown as Type;
}

/**
 * Builds a `true` / `false` boolean-literal type.
 */
export function getBooleanLiteralType(value: boolean): Type {
  return { flags: TypeFlags.BooleanLiteral, value } as unknown as Type;
}

/**
 * Builds a `1n` bigint-literal type.
 */
export function getBigIntLiteralType(value: string): Type {
  return { flags: TypeFlags.BigIntLiteral, value } as unknown as Type;
}

/**
 * Returns true when the type is any literal flavor.
 */
export function isLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Literal) !== 0;
}

/**
 * Returns true when the literal type is "fresh" — comes directly
 * from a literal expression and not yet widened to its primitive.
 */
export function isFreshLiteralType(t: Type): boolean {
  return (t as unknown as { isFresh?: boolean }).isFresh === true;
}

/**
 * Returns the canonical (non-fresh) literal type. Identical to `t`
 * when already regular.
 */
export function getRegularLiteralType(t: Type): Type {
  if (!isFreshLiteralType(t)) return t;
  return { ...(t as object), isFresh: false } as unknown as Type;
}

/**
 * Returns a fresh variant of a literal type, used for contextual
 * type checks.
 */
export function getFreshLiteralType(t: Type): Type {
  if (isFreshLiteralType(t)) return t;
  return { ...(t as object), isFresh: true } as unknown as Type;
}

/**
 * Returns the string value of a string-literal type, or undefined.
 */
export function getStringLiteralValue(t: Type): string | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) === 0) return undefined;
  return (t as unknown as { value?: string }).value;
}

/**
 * Returns the numeric value of a number-literal type, or undefined.
 */
export function getNumberLiteralValue(t: Type): number | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.NumberLiteral) === 0) return undefined;
  return (t as unknown as { value?: number }).value;
}

/**
 * Returns true when the type is a boolean literal (true OR false
 * specifically — not the wider `boolean`).
 */
export function isBooleanLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.BooleanLiteral) !== 0;
}

/**
 * Returns the widened primitive of a literal type.
 */
export function getBaseTypeOfLiteralType(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) !== 0) {
    return { flags: TypeFlags.String } as unknown as Type;
  }
  if ((flags & TypeFlags.NumberLiteral) !== 0) {
    return { flags: TypeFlags.Number } as unknown as Type;
  }
  if ((flags & TypeFlags.BooleanLiteral) !== 0) {
    return { flags: TypeFlags.Boolean } as unknown as Type;
  }
  if ((flags & TypeFlags.BigIntLiteral) !== 0) {
    return { flags: TypeFlags.BigInt } as unknown as Type;
  }
  return t;
}
