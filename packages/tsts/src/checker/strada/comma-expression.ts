/**
 * Comma-expression handling (`a, b, c`).
 *
 * Ported from Strada `checker.go` — checkCommaExpression,
 * getRightmostOfComma.
 *
 * A comma-expression evaluates each operand and returns the rightmost
 * value's type.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";

/**
 * Returns true when the node is a comma-binary expression.
 */
export function isCommaExpression(node: AstNode): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  return op === Kind.CommaToken;
}

/**
 * Returns all operands of a comma-expression, flattened.
 */
export function flattenCommaExpression(node: AstNode): readonly AstNode[] {
  if (!isCommaExpression(node)) return [node];
  const out: AstNode[] = [];
  const walker = (n: AstNode): void => {
    if (!isCommaExpression(n)) {
      out.push(n);
      return;
    }
    const left = (n as unknown as { left?: AstNode }).left;
    const right = (n as unknown as { right?: AstNode }).right;
    if (left !== undefined) walker(left);
    if (right !== undefined) walker(right);
  };
  walker(node);
  return out;
}

/**
 * Returns the rightmost operand of a comma-expression — its result.
 */
export function getCommaResult(node: AstNode): AstNode | undefined {
  if (!isCommaExpression(node)) return node;
  const operands = flattenCommaExpression(node);
  return operands[operands.length - 1];
}

/**
 * Returns the result type of a comma-expression — the rightmost
 * operand's type.
 */
export function getCommaExpressionType(rightmostType: Type): Type {
  return rightmostType;
}
