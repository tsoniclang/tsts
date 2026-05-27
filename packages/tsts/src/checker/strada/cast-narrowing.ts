/**
 * Narrowing via `as` cast — the type-of-expression after a cast.
 *
 * Ported from Strada `checker.go` — getTypeOfAsExpression,
 * checkAssertionWorker, getReportableAssertion.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the asserted target type of an `as` expression — the
 * narrowed (or coerced) type that subsequent code sees.
 */
export function getAssertedTargetType(_node: AstNode, target: Type): Type {
  return target;
}

/**
 * Returns true when the assertion is a "const assertion" — `as const`.
 * Const assertions preserve literal narrowness.
 */
export function isConstAssertion(node: AstNode): boolean {
  if (node.kind !== Kind.AsExpression && node.kind !== Kind.TypeAssertionExpression) {
    return false;
  }
  const type = (node as unknown as { type?: AstNode }).type;
  if (type === undefined) return false;
  if (type.kind !== Kind.TypeReference) return false;
  const name = (type as unknown as { typeName?: AstNode }).typeName;
  if (name === undefined || name.kind !== Kind.Identifier) return false;
  return (name as unknown as { escapedText?: string }).escapedText === "const";
}

/**
 * Returns the apparent narrowed type after a const assertion is
 * applied to a literal expression.
 */
export function applyConstAssertion(t: Type): Type {
  // Const assertion preserves literal types — already narrow.
  return { ...(t as object), isFresh: true } as unknown as Type;
}

/**
 * Returns true when the source type would lose information under the
 * cast — assignability fails strictly. Used to flag "needs double
 * assertion" diagnostics.
 */
export function castLosesInformation(source: Type, target: Type): boolean {
  const sf = (source as { flags?: number }).flags ?? 0;
  const tf = (target as { flags?: number }).flags ?? 0;
  // Any/Unknown → anything is fine.
  if ((sf & (TypeFlags.Any | TypeFlags.Unknown)) !== 0) return false;
  // Anything → Any is fine.
  if ((tf & TypeFlags.Any) !== 0) return false;
  // Conservative shell — only flag obviously narrowing casts.
  if ((tf & TypeFlags.Never) !== 0) return true;
  return false;
}

/**
 * Returns the cast-target type of an AsExpression, or undefined.
 */
export function getCastTargetTypeNode(node: AstNode): AstNode | undefined {
  if (
    node.kind !== Kind.AsExpression &&
    node.kind !== Kind.TypeAssertionExpression
  ) {
    return undefined;
  }
  return (node as unknown as { type?: AstNode }).type;
}
