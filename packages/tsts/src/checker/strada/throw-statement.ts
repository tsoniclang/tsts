/**
 * `throw` statement handling.
 *
 * Ported from Strada `checker.go` — checkThrowStatement,
 * getThrownExpressionType, isThrowingExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns true when the node is a ThrowStatement.
 */
export function isThrowStatement(node: AstNode): boolean {
  return node.kind === Kind.ThrowStatement;
}

/**
 * Returns the thrown expression.
 */
export function getThrownExpression(node: AstNode): AstNode | undefined {
  if (!isThrowStatement(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns true when a throw expression is "useful" — has an
 * argument (vs. a bare `throw;` syntax error).
 */
export function isWellFormedThrow(node: AstNode): boolean {
  return getThrownExpression(node) !== undefined;
}

/**
 * Returns the canonical return type for a function ending in
 * `throw` — never.
 */
export function getThrowingFunctionReturnType(): Type {
  return NEVER;
}

/**
 * Returns true when the expression is a "throw" expression in the
 * upcoming JS proposal sense (allowed only as a top-level expression
 * inside a function).
 */
export function isThrowExpression(_node: AstNode): boolean {
  // TS does not have throw-expressions yet.
  return false;
}
