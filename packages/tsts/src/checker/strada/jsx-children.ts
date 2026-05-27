/**
 * JSX-children handling.
 *
 * Ported from Strada `checker.go` — checkJsxChildren, getJsxChildrenType,
 * isWhitespaceOnlyJsxText.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the children of a JsxElement / JsxFragment.
 */
export function getJsxChildren(node: AstNode): readonly AstNode[] {
  if (node.kind === Kind.JsxElement) {
    const children = (node as unknown as { children?: { nodes?: readonly AstNode[] } }).children;
    return children?.nodes ?? [];
  }
  if (node.kind === Kind.JsxFragment) {
    const children = (node as unknown as { children?: { nodes?: readonly AstNode[] } }).children;
    return children?.nodes ?? [];
  }
  return [];
}

/**
 * Returns true when the JSX child is whitespace-only text (which is
 * elided during emit).
 */
export function isWhitespaceOnlyJsxText(child: AstNode): boolean {
  if (child.kind !== Kind.JsxText) return false;
  const text = (child as unknown as { text?: string }).text ?? "";
  return /^\s*$/.test(text);
}

/**
 * Filters out elided (whitespace-only) JSX children.
 */
export function getMeaningfulJsxChildren(node: AstNode): readonly AstNode[] {
  return getJsxChildren(node).filter((c) => !isWhitespaceOnlyJsxText(c));
}

/**
 * Returns true when the child node is a JsxExpression `{expr}`.
 */
export function isJsxExpressionChild(child: AstNode): boolean {
  return child.kind === Kind.JsxExpression;
}

/**
 * Returns the inner expression of a JsxExpression child.
 */
export function getJsxExpressionInner(child: AstNode): AstNode | undefined {
  if (!isJsxExpressionChild(child)) return undefined;
  return (child as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the count of meaningful (non-whitespace) children.
 */
export function getMeaningfulChildCount(node: AstNode): number {
  return getMeaningfulJsxChildren(node).length;
}

/**
 * Returns the canonical children-prop type for JSX elements with
 * multiple children — an array of element types.
 */
export function getChildrenArrayType(childTypes: readonly Type[]): Type {
  if (childTypes.length === 0) {
    return { flags: TypeFlags.Never } as unknown as Type;
  }
  if (childTypes.length === 1) return childTypes[0]!;
  return {
    flags: TypeFlags.Object,
    symbol: { name: "Array" },
    typeArguments: [{ flags: TypeFlags.Union, types: childTypes } as unknown as Type],
  } as unknown as Type;
}
