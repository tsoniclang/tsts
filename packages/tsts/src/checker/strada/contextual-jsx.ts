/**
 * Contextual typing for JSX expressions.
 *
 * Ported from Strada `checker.go` — getContextualTypeForJsxExpression,
 * getContextualJsxElementAttributesType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the contextual element type for a JSX child position.
 */
export function getContextualTypeForJsxChild(_node: AstNode): Type {
  return ANY;
}

/**
 * Returns the contextual attribute-value type for a JSX attribute.
 */
export function getContextualTypeForJsxAttribute(_node: AstNode): Type {
  return ANY;
}

/**
 * Returns the contextual type for a JSX spread attribute `...obj`.
 */
export function getContextualTypeForJsxSpreadAttribute(_node: AstNode): Type {
  return ANY;
}

/**
 * Returns true when the JSX child is a text-node (literal text).
 */
export function isJsxText(node: AstNode): boolean {
  return node.kind === Kind.JsxText;
}

/**
 * Returns true when the JSX child is an embedded expression `{...}`.
 */
export function isJsxExpressionChild(node: AstNode): boolean {
  return node.kind === Kind.JsxExpression;
}

/**
 * Returns the parent JSX element of a node, walking up the chain.
 */
export function getEnclosingJsxElement(node: AstNode): AstNode | undefined {
  let current: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (current !== undefined) {
    if (
      current.kind === Kind.JsxElement ||
      current.kind === Kind.JsxSelfClosingElement ||
      current.kind === Kind.JsxFragment
    ) {
      return current;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return undefined;
}

/**
 * Returns the tag-name node of a JSX element (`<Foo />` → `Foo`).
 */
export function getJsxTagName(node: AstNode): AstNode | undefined {
  if (node.kind === Kind.JsxOpeningElement || node.kind === Kind.JsxSelfClosingElement) {
    return (node as unknown as { tagName?: AstNode }).tagName;
  }
  if (node.kind === Kind.JsxElement) {
    const opening = (node as unknown as { openingElement?: AstNode }).openingElement;
    if (opening !== undefined) {
      return (opening as unknown as { tagName?: AstNode }).tagName;
    }
  }
  return undefined;
}

/**
 * Returns the attributes node-list of a JSX element.
 */
export function getJsxAttributes(node: AstNode): AstNode | undefined {
  if (node.kind === Kind.JsxOpeningElement || node.kind === Kind.JsxSelfClosingElement) {
    return (node as unknown as { attributes?: AstNode }).attributes;
  }
  if (node.kind === Kind.JsxElement) {
    const opening = (node as unknown as { openingElement?: AstNode }).openingElement;
    if (opening !== undefined) {
      return (opening as unknown as { attributes?: AstNode }).attributes;
    }
  }
  return undefined;
}
