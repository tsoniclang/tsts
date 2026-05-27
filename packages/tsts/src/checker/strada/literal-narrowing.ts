/**
 * Literal-type narrowing — for switch/case + equality narrowing.
 *
 * Ported from Strada `checker.go` — narrowTypeByEquality,
 * narrowTypeByLiteralValue, narrowTypeBySwitchOnDiscriminant.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { getNumberLiteralValue, getStringLiteralValue } from "./literal-types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Narrows a union type by removing the constituent that exactly
 * matches the literal value.
 */
export function narrowTypeByExcludingLiteral(
  t: Type,
  literalValue: string | number | boolean,
): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => {
    const cf = (c as { flags?: number }).flags ?? 0;
    if ((cf & TypeFlags.StringLiteral) !== 0) {
      return getStringLiteralValue(c) !== literalValue;
    }
    if ((cf & TypeFlags.NumberLiteral) !== 0) {
      return getNumberLiteralValue(c) !== literalValue;
    }
    if ((cf & TypeFlags.BooleanLiteral) !== 0) {
      return (c as unknown as { value?: boolean }).value !== literalValue;
    }
    return true;
  });
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Narrows a union type to only the constituent matching a literal
 * value. Returns NEVER when no constituent matches.
 */
export function narrowTypeByIncludingLiteral(
  t: Type,
  literalValue: string | number | boolean,
): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => {
    const cf = (c as { flags?: number }).flags ?? 0;
    if ((cf & TypeFlags.StringLiteral) !== 0) {
      return getStringLiteralValue(c) === literalValue;
    }
    if ((cf & TypeFlags.NumberLiteral) !== 0) {
      return getNumberLiteralValue(c) === literalValue;
    }
    if ((cf & TypeFlags.BooleanLiteral) !== 0) {
      return (c as unknown as { value?: boolean }).value === literalValue;
    }
    return false;
  });
  if (matching.length === 0) return NEVER;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Returns the set of literal values present in a union type.
 */
export function getLiteralValuesInUnion(t: Type): readonly (string | number | boolean)[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    const single = (t as unknown as { value?: string | number | boolean }).value;
    return single !== undefined ? [single] : [];
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const out: (string | number | boolean)[] = [];
  for (const c of types) {
    const v = (c as unknown as { value?: string | number | boolean }).value;
    if (v !== undefined) out.push(v);
  }
  return out;
}

/**
 * Returns the count of literal constituents in a union — used to
 * detect exhaustive switch coverage.
 */
export function getLiteralConstituentCount(t: Type): number {
  return getLiteralValuesInUnion(t).length;
}
