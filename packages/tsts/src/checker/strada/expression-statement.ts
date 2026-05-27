/**
 * Expression-statement helpers.
 *
 * Ported from Strada `checker.go` — checkExpressionStatement,
 * isExpressionStatementUseful, isDirectivePrologue.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an ExpressionStatement.
 */
export function isExpressionStatement(node: AstNode): boolean {
  return node.kind === Kind.ExpressionStatement;
}

/**
 * Returns the inner expression of an ExpressionStatement.
 */
export function getExpressionStatementInner(node: AstNode): AstNode | undefined {
  if (!isExpressionStatement(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns true when the expression statement has a meaningful side
 * effect — calls, assignments, deletes, awaits, yields.
 */
export function hasObservableSideEffect(node: AstNode): boolean {
  const inner = getExpressionStatementInner(node);
  if (inner === undefined) return false;
  switch (inner.kind) {
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.AwaitExpression:
    case Kind.YieldExpression:
    case Kind.DeleteExpression:
      return true;
    case Kind.BinaryExpression: {
      const op = (inner as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
      if (op === undefined) return false;
      return (
        op === Kind.EqualsToken ||
        op === Kind.PlusEqualsToken ||
        op === Kind.MinusEqualsToken ||
        op === Kind.AsteriskEqualsToken ||
        op === Kind.SlashEqualsToken ||
        op === Kind.PercentEqualsToken
      );
    }
    case Kind.PostfixUnaryExpression:
    case Kind.PrefixUnaryExpression: {
      const op = (inner as unknown as { operator?: number }).operator;
      return op === Kind.PlusPlusToken || op === Kind.MinusMinusToken;
    }
    default:
      return false;
  }
}

/**
 * Returns true when the expression statement is "useless" — has no
 * observable side effect (e.g. `1 + 2;`).
 */
export function isUselessExpressionStatement(node: AstNode): boolean {
  return isExpressionStatement(node) && !hasObservableSideEffect(node);
}

/**
 * Returns true when the expression statement is a directive prologue
 * — a string-literal-only statement at the start of a block.
 */
export function isDirectivePrologue(node: AstNode): boolean {
  const inner = getExpressionStatementInner(node);
  if (inner === undefined) return false;
  return inner.kind === Kind.StringLiteral;
}
