/**
 * `typeof x` type-query node handling.
 *
 * Ported from Strada `checker.go` — getTypeFromTypeQueryNode,
 * resolveTypeOfReference.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a TypeQuery.
 */
export function isTypeQuery(node: AstNode): boolean {
  return node.kind === Kind.TypeQuery;
}

/**
 * Returns the expression of a TypeQuery (`typeof x` → `x`).
 */
export function getTypeQueryExpression(node: AstNode): AstNode | undefined {
  if (!isTypeQuery(node)) return undefined;
  return (node as unknown as { exprName?: AstNode }).exprName;
}

/**
 * Returns the type-arguments of a TypeQuery (TS 4.7+).
 */
export function getTypeQueryTypeArguments(node: AstNode): readonly AstNode[] {
  if (!isTypeQuery(node)) return [];
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns the leftmost identifier of the TypeQuery expression chain.
 */
export function getTypeQueryRootName(node: AstNode): AstNode | undefined {
  const expr = getTypeQueryExpression(node);
  if (expr === undefined) return undefined;
  if (expr.kind === Kind.Identifier) return expr;
  if (expr.kind === Kind.QualifiedName) {
    return (expr as unknown as { left?: AstNode }).left;
  }
  return undefined;
}

/**
 * Returns the full dotted path of a TypeQuery's expression
 * (`typeof A.B.C` → ["A", "B", "C"]).
 */
export function getTypeQueryPath(node: AstNode): readonly string[] {
  const out: string[] = [];
  const walker = (n: AstNode | undefined): void => {
    if (n === undefined) return;
    if (n.kind === Kind.QualifiedName) {
      walker((n as unknown as { left?: AstNode }).left);
      const right = (n as unknown as { right?: AstNode }).right;
      if (right !== undefined && right.kind === Kind.Identifier) {
        const text = (right as unknown as { escapedText?: string }).escapedText;
        if (text !== undefined) out.push(text);
      }
      return;
    }
    if (n.kind === Kind.Identifier) {
      const text = (n as unknown as { escapedText?: string }).escapedText;
      if (text !== undefined) out.push(text);
    }
  };
  walker(getTypeQueryExpression(node));
  return out;
}
