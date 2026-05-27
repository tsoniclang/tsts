/**
 * Helper for the class-fields transformer: detects synthetic
 * `static { _classThis = this; }` blocks.
 *
 * Port of TS-Go `internal/transformers/estransforms/classthis.go`.
 */

import type { Node as AstNode } from "../../ast/index.js";
import {
  Kind, nodeKind,
  binaryLeft, binaryRight,
  expressionOfStatement as expressionOfExpressionStatement,
  blockStatements,
  nodeBody,
} from "../../ast/index.js";
import {
  isClassStaticBlockDeclaration, isExpressionStatement, isIdentifier,
} from "../../ast/index.js";

import type { EmitContext } from "../transformer.js";

const KindThisKeyword = Kind.ThisKeyword;
function staticBlockBody(node: AstNode): AstNode {
  return nodeBody(node)!;
}
function statementCount(block: AstNode): number {
  return blockStatements(block).length;
}
function firstStatement(block: AstNode): AstNode {
  return blockStatements(block)[0]!;
}
function isAssignmentExpression(node: AstNode | undefined, excludeCompound: boolean): boolean {
  if (node === undefined) return false;
  if ((node as { kind?: number }).kind !== Kind.BinaryExpression) return false;
  const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  if (op === undefined) return false;
  if (excludeCompound) return op === Kind.EqualsToken;
  return op >= Kind.EqualsToken && op <= Kind.CaretEqualsToken;
}
function classThisOf(emitContext: EmitContext, node: AstNode): AstNode | undefined {
  // EmitContext tracks class-this via a per-emit-node map; expose via cast.
  const ec = emitContext as unknown as { classThisOf?: (n: AstNode) => AstNode | undefined };
  return ec.classThisOf?.(node);
}

/**
 * Returns true if `node` is a `static {}` block containing only a
 * single assignment of `this` to the `_classThis` variable. The
 * variable identity is taken from the `EmitContext`'s class-this
 * tracking.
 *
 * Mirrors TS-Go `isClassThisAssignmentBlock`.
 */
export function isClassThisAssignmentBlock(emitContext: EmitContext, node: AstNode): boolean {
  if (!isClassStaticBlockDeclaration(node)) return false;
  const body = staticBlockBody(node);
  if (statementCount(body) !== 1) return false;
  const statement = firstStatement(body);
  if (!isExpressionStatement(statement)) return false;
  const expression = expressionOfExpressionStatement(statement);
  if (!isAssignmentExpression(expression, true)) return false;
  const left = binaryLeft(expression);
  const right = binaryRight(expression);
  return isIdentifier(left) && classThisOf(emitContext, node) === left && nodeKind(right) === KindThisKeyword;
}

