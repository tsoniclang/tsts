/**
 * Helper for the class-fields transformer: detects synthetic
 * `static { _classThis = this; }` blocks.
 *
 * Port of TS-Go `internal/transformers/estransforms/classthis.go`.
 */

import type { Node as AstNode } from "../../ast/index.js";

import type { EmitContext } from "../transformer.js";

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

// Forward declarations matching TS-Go ast/emit helpers.
declare function isClassStaticBlockDeclaration(node: AstNode): boolean;
declare function isExpressionStatement(node: AstNode): boolean;
declare function isAssignmentExpression(node: AstNode, excludeCompound: boolean): boolean;
declare function isIdentifier(node: AstNode): boolean;
declare function staticBlockBody(node: AstNode): AstNode;
declare function statementCount(block: AstNode): number;
declare function firstStatement(block: AstNode): AstNode;
declare function expressionOfExpressionStatement(node: AstNode): AstNode;
declare function binaryLeft(node: AstNode): AstNode;
declare function binaryRight(node: AstNode): AstNode;
declare function nodeKind(node: AstNode): number;
declare function classThisOf(emitContext: EmitContext, node: AstNode): AstNode | undefined;

declare const KindThisKeyword: number;
