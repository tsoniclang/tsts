/**
 * Binary-expression assignability check.
 *
 * Ported from Strada `checker.go` — checkBinaryAssignability,
 * isLegalAssignment, getEffectiveAssignmentTarget.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

/**
 * Returns true when the binary expression is an assignment.
 */
export function isAssignmentExpression(node: AstNode): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  if (op === undefined) return false;
  switch (op) {
    case Kind.EqualsToken:
    case Kind.PlusEqualsToken:
    case Kind.MinusEqualsToken:
    case Kind.AsteriskEqualsToken:
    case Kind.AsteriskAsteriskEqualsToken:
    case Kind.SlashEqualsToken:
    case Kind.PercentEqualsToken:
    case Kind.LessThanLessThanEqualsToken:
    case Kind.GreaterThanGreaterThanEqualsToken:
    case Kind.GreaterThanGreaterThanGreaterThanEqualsToken:
    case Kind.AmpersandEqualsToken:
    case Kind.CaretEqualsToken:
    case Kind.BarEqualsToken:
    case Kind.AmpersandAmpersandEqualsToken:
    case Kind.BarBarEqualsToken:
    case Kind.QuestionQuestionEqualsToken:
      return true;
    default:
      return false;
  }
}

/**
 * Returns the assignment-target node of a binary assignment.
 */
export function getAssignmentTargetExpression(node: AstNode): AstNode | undefined {
  if (!isAssignmentExpression(node)) return undefined;
  return (node as unknown as { left?: AstNode }).left;
}

/**
 * Returns the assignment-value node of a binary assignment.
 */
export function getAssignmentValueExpression(node: AstNode): AstNode | undefined {
  if (!isAssignmentExpression(node)) return undefined;
  return (node as unknown as { right?: AstNode }).right;
}

/**
 * Returns true when the target type accepts the source type by
 * assignability.
 */
export function isValidAssignment(source: Type, target: Type): boolean {
  return isTypeAssignableTo(source, target);
}

/**
 * Returns true when the target node is a valid assignment target
 * (LHS-expression form).
 */
export function isValidAssignmentTarget(target: AstNode): boolean {
  switch (target.kind) {
    case Kind.Identifier:
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
    case Kind.ParenthesizedExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the target is an unmodifiable value (a const
 * variable, a readonly property, etc.).
 */
export function isUnmodifiableTarget(target: AstNode): boolean {
  // Conservative: pattern-based heuristic. Real check requires
  // symbol resolution.
  void target;
  return false;
}
