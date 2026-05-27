/**
 * JSDoc → Type conversion helpers.
 *
 * Ported from Strada `jsdoc.go` (within `checker`) — getTypeFromJSDocTypeReference,
 * getTypeFromJSDocVariadicType, getTypeFromJSDocOptionalType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is one of the JSDoc type-node kinds.
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
 * Returns the wrapped type-node for JSDoc-nullable/non-nullable/
 * optional/variadic forms. Returns undefined when the node isn't a
 * wrapper.
 */
export function getJSDocWrappedType(node: AstNode): AstNode | undefined {
  switch (node.kind) {
    case Kind.JSDocNullableType:
    case Kind.JSDocNonNullableType:
    case Kind.JSDocOptionalType:
    case Kind.JSDocVariadicType:
      return (node as unknown as { type?: AstNode }).type;
    case Kind.JSDocTypeExpression:
      return (node as unknown as { type?: AstNode }).type;
    default:
      return undefined;
  }
}

/**
 * Returns true when the JSDoc tag node is one of the type-bearing
 * tags (`@param`, `@returns`, `@type`, `@typedef`, `@callback`).
 */
export function isTypeBearingJSDocTag(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.JSDocParameterTag:
    case Kind.JSDocReturnTag:
    case Kind.JSDocTypeTag:
    case Kind.JSDocTypedefTag:
    case Kind.JSDocCallbackTag:
    case Kind.JSDocTemplateTag:
      return true;
    default:
      return false;
  }
}

/**
 * Returns the JSDoc tag's name (e.g. "param", "returns").
 */
export function getJSDocTagName(node: AstNode): string | undefined {
  const tagName = (node as unknown as { tagName?: AstNode }).tagName;
  if (tagName === undefined) return undefined;
  if (tagName.kind === Kind.Identifier) {
    return (tagName as unknown as { escapedText?: string }).escapedText;
  }
  return undefined;
}

/**
 * Returns the parameter-name identifier for a @param tag.
 */
export function getJSDocParamName(node: AstNode): string | undefined {
  if (node.kind !== Kind.JSDocParameterTag) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns true when the JSDoc node is part of a JavaScript-mode
 * file. Used to gate JSDoc-driven inference and emit modes.
 */
export function isInJSDocContext(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    const k = current.kind;
    if (
      k === Kind.JSDoc ||
      k === Kind.JSDocText
    ) {
      return true;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return false;
}
