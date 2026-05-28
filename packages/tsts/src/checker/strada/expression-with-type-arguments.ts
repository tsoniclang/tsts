/**
 * ExpressionWithTypeArguments node handling
 * (heritage-clause entries: `extends Foo<T>`).
 *
 * Ported from Strada `checker.go` — getTypeFromExpressionWithTypeArguments.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an ExpressionWithTypeArguments.
 */
export function isExpressionWithTypeArguments(node: AstNode): boolean {
  return node.kind === Kind.ExpressionWithTypeArguments;
}

/**
 * Returns the expression part (the referenced class/interface).
 */
export function getHeritageExpression(node: AstNode): AstNode | undefined {
  if (!isExpressionWithTypeArguments(node)) return undefined;
  return (node as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the type-arguments of an ExpressionWithTypeArguments.
 */
export function getHeritageTypeArguments(node: AstNode): readonly AstNode[] {
  if (!isExpressionWithTypeArguments(node)) return [];
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}

/**
 * Returns the referenced name when the expression is a simple
 * identifier.
 */
export function getHeritageReferenceName(node: AstNode): string | undefined {
  const expr = getHeritageExpression(node);
  if (expr === undefined) return undefined;
  if (expr.kind === Kind.Identifier) {
    return (expr as unknown as { escapedText?: string }).escapedText;
  }
  return undefined;
}

/**
 * Returns true when the heritage reference is generic (has type
 * arguments).
 */
export function isGenericHeritageReference(node: AstNode): boolean {
  return getHeritageTypeArguments(node).length > 0;
}

/**
 * Returns the dotted path of a property-access heritage expression
 * (`extends ns.Base` → ["ns", "Base"]).
 */
export function getHeritageExpressionPath(node: AstNode): readonly string[] {
  const out: string[] = [];
  const walker = (n: AstNode | undefined): void => {
    if (n === undefined) return;
    if (n.kind === Kind.PropertyAccessExpression) {
      walker((n as unknown as { expression?: AstNode }).expression);
      const name = (n as unknown as { name?: AstNode }).name;
      if (name !== undefined && name.kind === Kind.Identifier) {
        const text = (name as unknown as { escapedText?: string }).escapedText;
        if (text !== undefined) out.push(text);
      }
      return;
    }
    if (n.kind === Kind.Identifier) {
      const text = (n as unknown as { escapedText?: string }).escapedText;
      if (text !== undefined) out.push(text);
    }
  };
  walker(getHeritageExpression(node));
  return out;
}
