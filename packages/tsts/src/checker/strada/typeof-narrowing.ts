/**
 * `typeof` narrowing helpers — type-of comparisons in `if (typeof x === ...)`.
 *
 * Ported from Strada `checker.go` — narrowTypeByTypeofString,
 * isTypeofExpression, getTypeofString.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns true when the node is `typeof x`.
 */
export function isTypeofExpression(node: AstNode): boolean {
  return node.kind === Kind.TypeOfExpression;
}

/**
 * Returns the typeof-string corresponding to a type's flag.
 * `string` → "string", `number` → "number", etc.
 */
export function getTypeofStringForType(t: Type): string | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.String) !== 0) return "string";
  if ((flags & TypeFlags.Number) !== 0) return "number";
  if ((flags & TypeFlags.Boolean) !== 0) return "boolean";
  if ((flags & TypeFlags.BigInt) !== 0) return "bigint";
  if ((flags & TypeFlags.ESSymbol) !== 0) return "symbol";
  if ((flags & TypeFlags.Undefined) !== 0) return "undefined";
  if ((flags & TypeFlags.Null) !== 0) return "object";
  return undefined;
}

/**
 * Narrows a type by `typeof === "string-literal"`.
 */
export function narrowByTypeofEquality(t: Type, typeofString: string): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return matchesTypeofString(t, typeofString) ? t : NEVER;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => matchesTypeofString(c, typeofString));
  if (matching.length === 0) return NEVER;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Narrows a type by `typeof !== "string-literal"`.
 */
export function narrowByTypeofInequality(t: Type, typeofString: string): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return matchesTypeofString(t, typeofString) ? NEVER : t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => !matchesTypeofString(c, typeofString));
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Returns true when the type's runtime typeof equals the given string.
 */
function matchesTypeofString(t: Type, typeofString: string): boolean {
  const expected = getTypeofStringForType(t);
  if (expected === undefined) {
    // Object / function / etc.
    const flags = (t as { flags?: number }).flags ?? 0;
    if ((flags & TypeFlags.Object) !== 0) {
      return typeofString === "object" || typeofString === "function";
    }
    return false;
  }
  return expected === typeofString;
}

/**
 * Returns true when the typeof string is one of the canonical values.
 */
export function isValidTypeofString(s: string): boolean {
  switch (s) {
    case "string":
    case "number":
    case "boolean":
    case "bigint":
    case "symbol":
    case "object":
    case "function":
    case "undefined":
      return true;
    default:
      return false;
  }
}
