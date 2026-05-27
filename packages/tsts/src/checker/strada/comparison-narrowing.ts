/**
 * Equality / comparison narrowing.
 *
 * Ported from Strada `checker.go` — narrowByEquality, narrowByDeepEquality,
 * isEqualityOperator.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns true when the operator is an equality operator.
 */
export function isEqualityOperator(operator: number): boolean {
  return (
    operator === Kind.EqualsEqualsToken ||
    operator === Kind.ExclamationEqualsToken ||
    operator === Kind.EqualsEqualsEqualsToken ||
    operator === Kind.ExclamationEqualsEqualsToken
  );
}

/**
 * Returns true when the operator is a strict equality (`===` or `!==`).
 */
export function isStrictEqualityOperator(operator: number): boolean {
  return (
    operator === Kind.EqualsEqualsEqualsToken ||
    operator === Kind.ExclamationEqualsEqualsToken
  );
}

/**
 * Returns true when the operator is a negation (`!=` or `!==`).
 */
export function isNegativeEqualityOperator(operator: number): boolean {
  return (
    operator === Kind.ExclamationEqualsToken ||
    operator === Kind.ExclamationEqualsEqualsToken
  );
}

/**
 * Returns true when the expression is an equality binary expression.
 */
export function isEqualityExpression(node: AstNode): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  return op !== undefined && isEqualityOperator(op);
}

/**
 * Returns the left operand of a binary expression.
 */
export function getLeftOperand(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.BinaryExpression) return undefined;
  return (node as unknown as { left?: AstNode }).left;
}

/**
 * Returns the right operand of a binary expression.
 */
export function getRightOperand(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.BinaryExpression) return undefined;
  return (node as unknown as { right?: AstNode }).right;
}

/**
 * Narrows a type by removing constituents that match `other` under
 * strict equality.
 */
export function narrowByStrictInequality(t: Type, other: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return t === other ? NEVER : t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => c !== other);
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Narrows a type to constituents that strictly equal `other`.
 */
export function narrowByStrictEquality(t: Type, other: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return t === other ? t : NEVER;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  if (types.includes(other)) return other;
  return NEVER;
}
