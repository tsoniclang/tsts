/**
 * MethodSignature handling (interface method members).
 *
 * Ported from Strada `checker.go` — checkMethodSignature,
 * getSignatureFromMethodSignature.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a MethodSignature.
 */
export function isMethodSignature(node: AstNode): boolean {
  return node.kind === Kind.MethodSignature;
}

/**
 * Returns the parameters of a MethodSignature.
 */
export function getMethodSignatureParameters(node: AstNode): readonly AstNode[] {
  if (!isMethodSignature(node)) return [];
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters;
  return params?.nodes ?? [];
}

/**
 * Returns the return-type annotation of a MethodSignature.
 */
export function getMethodSignatureReturnType(node: AstNode): AstNode | undefined {
  if (!isMethodSignature(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the type-parameters of a MethodSignature.
 */
export function getMethodSignatureTypeParameters(node: AstNode): readonly AstNode[] {
  if (!isMethodSignature(node)) return [];
  const tp = (node as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters;
  return tp?.nodes ?? [];
}

/**
 * Returns true when the method signature is optional.
 */
export function isOptionalMethodSignature(node: AstNode): boolean {
  if (!isMethodSignature(node)) return false;
  return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined;
}

/**
 * Returns the method-signature name.
 */
export function getMethodSignatureName(node: AstNode): string | undefined {
  if (!isMethodSignature(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined) return undefined;
  if (name.kind === Kind.Identifier) {
    return (name as unknown as { escapedText?: string }).escapedText;
  }
  if (name.kind === Kind.StringLiteral) {
    return (name as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns the count of parameters.
 */
export function getMethodSignatureParameterCount(node: AstNode): number {
  return getMethodSignatureParameters(node).length;
}

/**
 * Returns true when the method signature has type parameters
 * (is generic).
 */
export function isGenericMethodSignature(node: AstNode): boolean {
  return getMethodSignatureTypeParameters(node).length > 0;
}
