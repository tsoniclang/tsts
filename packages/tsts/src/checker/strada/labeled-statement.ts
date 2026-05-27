/**
 * Labeled-statement helpers.
 *
 * Ported from Strada `checker.go` — checkLabeledStatement,
 * resolveLabeledStatement, hasLabel.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a LabeledStatement.
 */
export function isLabeledStatement(node: AstNode): boolean {
  return node.kind === Kind.LabeledStatement;
}

/**
 * Returns the label name of a LabeledStatement.
 */
export function getLabelName(node: AstNode): string | undefined {
  if (!isLabeledStatement(node)) return undefined;
  const label = (node as unknown as { label?: AstNode }).label;
  if (label === undefined || label.kind !== Kind.Identifier) return undefined;
  return (label as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the labeled statement body.
 */
export function getLabeledBody(node: AstNode): AstNode | undefined {
  if (!isLabeledStatement(node)) return undefined;
  return (node as unknown as { statement?: AstNode }).statement;
}

/**
 * Returns true when a label is in scope (walks ancestors to find a
 * matching LabeledStatement).
 */
export function isLabelInScope(node: AstNode, label: string): boolean {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    if (isLabeledStatement(current) && getLabelName(current) === label) return true;
    if (
      current.kind === Kind.FunctionDeclaration ||
      current.kind === Kind.FunctionExpression ||
      current.kind === Kind.ArrowFunction ||
      current.kind === Kind.MethodDeclaration
    ) {
      return false;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return false;
}

/**
 * Returns the label name of a Break or Continue statement, if any.
 */
export function getBreakOrContinueLabel(node: AstNode): string | undefined {
  if (
    node.kind !== Kind.BreakStatement &&
    node.kind !== Kind.ContinueStatement
  ) {
    return undefined;
  }
  const label = (node as unknown as { label?: AstNode }).label;
  if (label === undefined || label.kind !== Kind.Identifier) return undefined;
  return (label as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns true when the LabeledStatement labels a loop (vs. a block).
 */
export function isLabeledLoop(node: AstNode): boolean {
  const body = getLabeledBody(node);
  if (body === undefined) return false;
  return (
    body.kind === Kind.ForStatement ||
    body.kind === Kind.ForInStatement ||
    body.kind === Kind.ForOfStatement ||
    body.kind === Kind.WhileStatement ||
    body.kind === Kind.DoStatement
  );
}
