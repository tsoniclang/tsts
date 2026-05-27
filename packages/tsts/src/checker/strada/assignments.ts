/**
 * Assignment-target classification.
 *
 * Ported from Strada `checker.go` — checkAssignmentOperator,
 * isAssignmentTarget, getAssignmentTargetKind, and the
 * destructuring-assignment helpers.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import type { CheckerOps } from "./index.js";

/**
 * AssignmentKind — what kind of assignment context surrounds a node.
 * Matches Strada's AssignmentKind constants.
 */
export const AssignmentKind = {
  None: 0,
  Definite: 1,
  Compound: 2,
} as const;

/**
 * Walks up `node` parents looking for an enclosing assignment context.
 * Returns the kind. Stops at function-like boundaries.
 */
export function getAssignmentTargetKind(node: AstNode): number {
  let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (n !== undefined) {
    const k = (n as { kind?: number }).kind;
    if (k === Kind.BinaryExpression) {
      const op = (n as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
      if (op === 63 /* EqualsToken */) return AssignmentKind.Definite;
      if (op !== undefined && op >= 64 && op <= 78) return AssignmentKind.Compound;
      return AssignmentKind.None;
    }
    if (k === Kind.PrefixUnaryExpression || k === Kind.PostfixUnaryExpression) {
      const op = (n as unknown as { operator?: number }).operator;
      if (op === 47 /* PlusPlusToken */ || op === 48 /* MinusMinusToken */) return AssignmentKind.Compound;
      return AssignmentKind.None;
    }
    if (k === Kind.ParenthesizedExpression) {
      n = (n as unknown as { parent?: AstNode }).parent;
      continue;
    }
    if (k === Kind.PropertyAccessExpression || k === Kind.ElementAccessExpression) {
      // Property/element-access can be either an LHS target or the
      // RHS of a property access. Continue walking.
      n = (n as unknown as { parent?: AstNode }).parent;
      continue;
    }
    return AssignmentKind.None;
  }
  return AssignmentKind.None;
}

export function isAssignmentTarget(node: AstNode): boolean {
  return getAssignmentTargetKind(node) !== AssignmentKind.None;
}

/**
 * Returns true when the binary operator at this position is the
 * assignment operator (`=`). Used to detect simple LHS = RHS.
 */
export function isAssignmentOperator(operator: number): boolean {
  return operator === 63 /* EqualsToken */ ||
    (operator >= 64 && operator <= 78); // compound assignments
}

/**
 * checkObjectLiteralAssignment / checkArrayLiteralAssignment walk
 * destructuring patterns. We expose them as standalone functions so
 * the Checker dispatch class can call them.
 */
export function checkDestructuringAssignment(
  c: CheckerOps,
  expr: AstNode,
  sourceType: Type,
): Type {
  const k = (expr as { kind?: number }).kind;
  if (k === Kind.ObjectLiteralExpression) return checkObjectLiteralAssignment(c, expr, sourceType);
  if (k === Kind.ArrayLiteralExpression) return checkArrayLiteralAssignment(c, expr, sourceType);
  return sourceType;
}

export function checkObjectLiteralAssignment(c: CheckerOps, node: AstNode, sourceType: Type): Type {
  const props = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
  if (props !== undefined) for (const p of props) {
    const init = (p as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) c.checkExpression(init);
  }
  return sourceType;
}

export function checkArrayLiteralAssignment(c: CheckerOps, node: AstNode, sourceType: Type): Type {
  const elems = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
  if (elems !== undefined) for (const e of elems) {
    const init = (e as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) c.checkExpression(init);
  }
  return sourceType;
}
