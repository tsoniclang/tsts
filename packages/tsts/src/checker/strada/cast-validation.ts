/**
 * Cast/assertion expression validation.
 *
 * Ported from Strada `checker.go` — checkAsExpression,
 * checkTypeAssertion, checkSatisfiesExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

/**
 * Returns true when a cast `source as target` is legal — at least
 * one direction of assignability must hold.
 */
export function isLegalAssertion(source: Type, target: Type): boolean {
  return isTypeAssignableTo(source, target) || isTypeAssignableTo(target, source);
}

/**
 * Returns true when the cast is a "double assertion" — `value as
 * unknown as T`. These are universally legal but flagged stylistically.
 */
export function isDoubleAssertion(node: AstNode): boolean {
  if (node.kind !== Kind.AsExpression && node.kind !== Kind.TypeAssertionExpression) {
    return false;
  }
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr === undefined) return false;
  return expr.kind === Kind.AsExpression || expr.kind === Kind.TypeAssertionExpression;
}

/**
 * Returns true when the cast target is `any` — these are no-op for
 * type checking.
 */
export function isCastToAny(target: Type): boolean {
  const flags = (target as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Any) !== 0;
}

/**
 * Returns true when the cast target is `unknown` — legal but widening.
 */
export function isCastToUnknown(target: Type): boolean {
  const flags = (target as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Unknown) !== 0;
}

/**
 * Returns true when the satisfies-expression's source actually
 * satisfies the target — used by `satisfies` operator.
 */
export function satisfiesTarget(source: Type, target: Type): boolean {
  return isTypeAssignableTo(source, target);
}

/**
 * Returns the expression operand of an assertion node.
 */
export function getAssertionOperand(node: AstNode): AstNode | undefined {
  if (
    node.kind !== Kind.AsExpression &&
    node.kind !== Kind.TypeAssertionExpression &&
    node.kind !== Kind.SatisfiesExpression
  ) {
    return undefined;
  }
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the target type-node of an assertion.
 */
export function getAssertionTarget(node: AstNode): AstNode | undefined {
  if (
    node.kind !== Kind.AsExpression &&
    node.kind !== Kind.TypeAssertionExpression &&
    node.kind !== Kind.SatisfiesExpression
  ) {
    return undefined;
  }
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the kind of cast — distinguishes `as`, legacy `<T>x`, and
 * `satisfies`.
 */
export const CastKind = {
  As: 0,
  Legacy: 1,
  Satisfies: 2,
} as const;

export type CastKind =
  | typeof CastKind.As
  | typeof CastKind.Legacy
  | typeof CastKind.Satisfies;

export function getCastKind(node: AstNode): CastKind | undefined {
  switch (node.kind) {
    case Kind.AsExpression: return CastKind.As;
    case Kind.TypeAssertionExpression: return CastKind.Legacy;
    case Kind.SatisfiesExpression: return CastKind.Satisfies;
    default: return undefined;
  }
}
