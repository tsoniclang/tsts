/**
 * String-literal type coalescing.
 *
 * Ported from Strada `checker.go` — coalesceStringLiterals,
 * mergeStringLiteralUnion, getSortedStringLiterals.
 *
 * Coalesces a union of string-literal types into a deduplicated,
 * stably-sorted union.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the type is a string-literal type.
 */
export function isStringLiteral(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.StringLiteral) !== 0;
}

/**
 * Returns the string-literal value, or undefined.
 */
export function getStringLiteralValue(t: Type): string | undefined {
  if (!isStringLiteral(t)) return undefined;
  return (t as unknown as { value?: string }).value;
}

/**
 * Returns a list of string-literal values from a union of literals.
 */
export function extractStringLiteralValues(t: Type): readonly string[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if (isStringLiteral(t)) {
    const v = getStringLiteralValue(t);
    return v !== undefined ? [v] : [];
  }
  if ((flags & TypeFlags.Union) === 0) return [];
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const out: string[] = [];
  for (const c of types) {
    const v = getStringLiteralValue(c);
    if (v !== undefined) out.push(v);
  }
  return out;
}

/**
 * Returns a sorted unique array of string-literal values.
 */
export function getSortedUniqueValues(t: Type): readonly string[] {
  const values = extractStringLiteralValues(t);
  return [...new Set(values)].sort();
}

/**
 * Builds a string-literal union from a list of values.
 */
export function buildStringLiteralUnion(values: readonly string[]): Type {
  if (values.length === 0) {
    return { flags: TypeFlags.Never } as unknown as Type;
  }
  const types: Type[] = values.map((v) => ({
    flags: TypeFlags.StringLiteral, value: v,
  } as unknown as Type));
  if (types.length === 1) return types[0]!;
  return { flags: TypeFlags.Union, types } as unknown as Type;
}

/**
 * Coalesces a union of string-literals into the deduplicated form.
 */
export function coalesceStringLiterals(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  if (!types.every(isStringLiteral)) return t;
  const sorted = getSortedUniqueValues(t);
  return buildStringLiteralUnion(sorted);
}

/**
 * Returns true when two string-literal unions have identical
 * value sets.
 */
export function areStringLiteralUnionsEqual(a: Type, b: Type): boolean {
  const av = getSortedUniqueValues(a);
  const bv = getSortedUniqueValues(b);
  if (av.length !== bv.length) return false;
  for (let i = 0; i < av.length; i++) {
    if (av[i] !== bv[i]) return false;
  }
  return true;
}
