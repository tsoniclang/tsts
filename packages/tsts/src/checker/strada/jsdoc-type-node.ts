/**
 * JSDoc type-node handling.
 *
 * Ported from Strada `checker.go` — getTypeFromJSDocTypeNode,
 * unwrapJSDocType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is any JSDoc type-node.
 */
export function isJSDocTypeNode(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.JSDocAllType:
    case Kind.JSDocNullableType:
    case Kind.JSDocNonNullableType:
    case Kind.JSDocOptionalType:
    case Kind.JSDocVariadicType:
    case Kind.JSDocTypeLiteral:
    case Kind.JSDocTypeExpression:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the node is `JSDocAllType` (`*`).
 */
export function isJSDocAllType(node: AstNode): boolean {
  return node.kind === Kind.JSDocAllType;
}

/**
 * Returns true when the node is a nullable JSDoc type (`?T`).
 */
export function isJSDocNullableType(node: AstNode): boolean {
  return node.kind === Kind.JSDocNullableType;
}

/**
 * Returns true when the node is a non-nullable JSDoc type (`!T`).
 */
export function isJSDocNonNullableType(node: AstNode): boolean {
  return node.kind === Kind.JSDocNonNullableType;
}

/**
 * Returns true when the node is an optional JSDoc type (`T=`).
 */
export function isJSDocOptionalType(node: AstNode): boolean {
  return node.kind === Kind.JSDocOptionalType;
}

/**
 * Returns true when the node is a variadic JSDoc type (`...T`).
 */
export function isJSDocVariadicType(node: AstNode): boolean {
  return node.kind === Kind.JSDocVariadicType;
}

/**
 * Returns the inner type of a JSDoc wrapper type.
 */
export function getJSDocWrappedType(node: AstNode): AstNode | undefined {
  switch (node.kind) {
    case Kind.JSDocNullableType:
    case Kind.JSDocNonNullableType:
    case Kind.JSDocOptionalType:
    case Kind.JSDocVariadicType:
    case Kind.JSDocTypeExpression:
      return (node as unknown as { type?: AstNode }).type;
    default:
      return undefined;
  }
}

/**
 * Unwraps nested JSDoc type wrappers to the inner-most type-node.
 */
export function unwrapJSDocType(node: AstNode): AstNode {
  let current = node;
  const ref: { changed: boolean } = { changed: true };
  while (ref.changed) {
    ref.changed = false;
    const inner = getJSDocWrappedType(current);
    if (inner !== undefined) {
      current = inner;
      ref.changed = true;
    }
  }
  return current;
}

/**
 * Returns true when a JSDoc type implies optionality (nullable or
 * explicitly optional).
 */
export function jsDocTypeIsOptional(node: AstNode): boolean {
  return isJSDocNullableType(node) || isJSDocOptionalType(node);
}
