/**
 * Variable-statement and -declaration handling.
 *
 * Ported from Strada `checker.go` — checkVariableStatement,
 * checkVariableDeclaration, getDeclarationList.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a VariableStatement.
 */
export function isVariableStatement(node: AstNode): boolean {
  return node.kind === Kind.VariableStatement;
}

/**
 * Returns the declaration list of a VariableStatement.
 */
export function getVariableDeclarationList(node: AstNode): AstNode | undefined {
  if (!isVariableStatement(node)) return undefined;
  return (node as unknown as { declarationList?: AstNode }).declarationList;
}

/**
 * Returns the variable declarations within a VariableStatement.
 */
export function getVariableDeclarations(node: AstNode): readonly AstNode[] {
  const list = getVariableDeclarationList(node);
  if (list === undefined) return [];
  const declarations = (list as unknown as { declarations?: { nodes?: readonly AstNode[] } }).declarations;
  return declarations?.nodes ?? [];
}

/**
 * Returns true when the variable statement declares with `const`.
 */
export function isConstStatement(node: AstNode): boolean {
  const list = getVariableDeclarationList(node);
  if (list === undefined) return false;
  const flags = (list as unknown as { flags?: number }).flags ?? 0;
  return (flags & 0x2) !== 0; // NodeFlags.Const
}

/**
 * Returns true when the variable statement declares with `let`.
 */
export function isLetStatement(node: AstNode): boolean {
  const list = getVariableDeclarationList(node);
  if (list === undefined) return false;
  const flags = (list as unknown as { flags?: number }).flags ?? 0;
  return (flags & 0x1) !== 0; // NodeFlags.Let
}

/**
 * Returns true when the variable statement declares with `var`.
 */
export function isVarStatement(node: AstNode): boolean {
  return isVariableStatement(node) && !isConstStatement(node) && !isLetStatement(node);
}

/**
 * Returns the names declared in a variable statement.
 */
export function getDeclaredVariableNames(node: AstNode): readonly string[] {
  const out: string[] = [];
  const walker = (n: AstNode): void => {
    if (n.kind === Kind.Identifier) {
      const text = (n as unknown as { escapedText?: string }).escapedText;
      if (text !== undefined) out.push(text);
      return;
    }
    if (n.kind === Kind.VariableDeclaration || n.kind === Kind.BindingElement) {
      const name = (n as unknown as { name?: AstNode }).name;
      if (name !== undefined) walker(name);
      return;
    }
    if (
      n.kind === Kind.ObjectBindingPattern ||
      n.kind === Kind.ArrayBindingPattern
    ) {
      const elements = (n as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
      if (elements !== undefined) {
        for (const e of elements) walker(e);
      }
    }
  };
  for (const decl of getVariableDeclarations(node)) walker(decl);
  return out;
}

/**
 * Returns the variable count (top-level declarations).
 */
export function getVariableCount(node: AstNode): number {
  return getVariableDeclarations(node).length;
}
