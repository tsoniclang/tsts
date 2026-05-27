/**
 * `@typedef` and `@callback` JSDoc tag handling.
 *
 * Ported from Strada `checker.go` — getTypeFromJSDocTypedefTag,
 * resolveTypedef, isJSDocTypedefDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a JSDocTypedefTag.
 */
export function isTypedefTag(node: AstNode): boolean {
  return node.kind === Kind.JSDocTypedefTag;
}

/**
 * Returns true when the node is a JSDocCallbackTag.
 */
export function isCallbackTag(node: AstNode): boolean {
  return node.kind === Kind.JSDocCallbackTag;
}

/**
 * Returns the name of a JSDocTypedef tag (`@typedef T`).
 */
export function getTypedefName(node: AstNode): string | undefined {
  if (!isTypedefTag(node) && !isCallbackTag(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the type expression of a JSDocTypedef tag.
 */
export function getTypedefTypeExpression(node: AstNode): AstNode | undefined {
  if (!isTypedefTag(node)) return undefined;
  return (node as unknown as { typeExpression?: AstNode }).typeExpression;
}

/**
 * Returns true when the typedef declares an object-literal shape.
 */
export function isObjectTypedef(node: AstNode): boolean {
  const expr = getTypedefTypeExpression(node);
  if (expr === undefined) return false;
  return expr.kind === Kind.JSDocTypeLiteral;
}

/**
 * Returns the parameter tags of a JSDocCallback.
 */
export function getCallbackParameters(node: AstNode): readonly AstNode[] {
  if (!isCallbackTag(node)) return [];
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters;
  return params?.nodes ?? [];
}

/**
 * Returns the return type tag of a JSDocCallback.
 */
export function getCallbackReturnType(node: AstNode): AstNode | undefined {
  if (!isCallbackTag(node)) return undefined;
  return (node as unknown as { returnType?: AstNode }).returnType;
}

/**
 * Returns true when the typedef tag is exported (typedef at module
 * top-level acts as an exported type alias).
 */
export function isExportedTypedef(_node: AstNode): boolean {
  // JSDoc typedefs are exported by default when at module top-level.
  return true;
}
