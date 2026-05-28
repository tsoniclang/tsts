/**
 * FunctionType / ConstructorType node handling.
 *
 * Ported from Strada `checker.go` — getTypeFromFunctionTypeNode,
 * getSignatureFromFunctionTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a FunctionType.
 */
export function isFunctionTypeNode(node: AstNode): boolean {
  return node.kind === Kind.FunctionType;
}

/**
 * Returns true when the node is a ConstructorType.
 */
export function isConstructorTypeNode(node: AstNode): boolean {
  return node.kind === Kind.ConstructorType;
}

/**
 * Returns the parameters of a FunctionType / ConstructorType.
 */
export function getFunctionTypeParameters(node: AstNode): readonly AstNode[] {
  if (!isFunctionTypeNode(node) && !isConstructorTypeNode(node)) return [];
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters;
  return params?.nodes ?? [];
}

/**
 * Returns the return-type node of a FunctionType / ConstructorType.
 */
export function getFunctionTypeReturnType(node: AstNode): AstNode | undefined {
  if (!isFunctionTypeNode(node) && !isConstructorTypeNode(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the type-parameters of a FunctionType / ConstructorType.
 */
export function getFunctionTypeTypeParameters(node: AstNode): readonly AstNode[] {
  if (!isFunctionTypeNode(node) && !isConstructorTypeNode(node)) return [];
  const tp = (node as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters;
  return tp?.nodes ?? [];
}

/**
 * Returns true when the FunctionType is generic.
 */
export function isGenericFunctionType(node: AstNode): boolean {
  return getFunctionTypeTypeParameters(node).length > 0;
}

/**
 * Returns true when the ConstructorType is abstract
 * (`abstract new () => T`).
 */
export function isAbstractConstructorType(node: AstNode): boolean {
  if (!isConstructorTypeNode(node)) return false;
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.AbstractKeyword) === true;
}

/**
 * Returns the parameter count of a FunctionType.
 */
export function getFunctionTypeParameterCount(node: AstNode): number {
  return getFunctionTypeParameters(node).length;
}

/**
 * Returns true when the FunctionType has a rest parameter.
 */
export function hasFunctionTypeRestParameter(node: AstNode): boolean {
  return getFunctionTypeParameters(node).some(
    (p) => (p as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined,
  );
}
