/**
 * Loop-context helpers — `break`, `continue` legality.
 *
 * Ported from Strada `checker.go` — checkBreakOrContinue,
 * isInLoopOrSwitch, getEnclosingLoop.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a loop statement.
 */
export function isLoopStatement(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.WhileStatement:
    case Kind.DoStatement:
      return true;
    default:
      return false;
  }
}

/**
 * Returns the enclosing loop statement, or undefined.
 */
export function getEnclosingLoop(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    if (isLoopStatement(current)) return current;
    if (
      current.kind === Kind.FunctionDeclaration ||
      current.kind === Kind.FunctionExpression ||
      current.kind === Kind.ArrowFunction ||
      current.kind === Kind.MethodDeclaration
    ) {
      return undefined;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns the enclosing loop or switch statement.
 */
export function getEnclosingLoopOrSwitch(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    if (isLoopStatement(current) || current.kind === Kind.SwitchStatement) {
      return current;
    }
    if (
      current.kind === Kind.FunctionDeclaration ||
      current.kind === Kind.FunctionExpression ||
      current.kind === Kind.ArrowFunction ||
      current.kind === Kind.MethodDeclaration
    ) {
      return undefined;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns true when `break` is legal at the given location.
 */
export function isBreakLegal(node: AstNode): boolean {
  return getEnclosingLoopOrSwitch(node) !== undefined;
}

/**
 * Returns true when `continue` is legal at the given location.
 */
export function isContinueLegal(node: AstNode): boolean {
  return getEnclosingLoop(node) !== undefined;
}

/**
 * Returns the labeled-statement matching a `break label;` or
 * `continue label;` reference.
 */
export function resolveLabel(node: AstNode, label: string): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    if (current.kind === Kind.LabeledStatement) {
      const labelNode = (current as unknown as { label?: AstNode }).label;
      if (labelNode !== undefined && labelNode.kind === Kind.Identifier) {
        const text = (labelNode as unknown as { escapedText?: string }).escapedText;
        if (text === label) return current;
      }
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}
