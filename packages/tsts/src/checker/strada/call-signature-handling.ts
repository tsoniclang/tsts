/**
 * CallSignature handling (TypeLiteral call signatures, function types).
 *
 * Ported from Strada `checker.go` — checkCallSignatureDeclaration,
 * getSignatureFromCallSignature.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a CallSignature.
 */
export function isCallSignature(node: AstNode): boolean {
  return node.kind === Kind.CallSignature;
}

/**
 * Returns true when the node is a ConstructSignature.
 */
export function isConstructSignature(node: AstNode): boolean {
  return node.kind === Kind.ConstructSignature;
}

/**
 * Returns the parameters of a call/construct signature.
 */
export function getSignatureParameters(node: AstNode): readonly AstNode[] {
  if (!isCallSignature(node) && !isConstructSignature(node)) return [];
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters;
  return params?.nodes ?? [];
}

/**
 * Returns the return-type annotation of a call/construct signature.
 */
export function getSignatureReturnType(node: AstNode): AstNode | undefined {
  if (!isCallSignature(node) && !isConstructSignature(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the type-parameters of a call/construct signature.
 */
export function getSignatureTypeParameters(node: AstNode): readonly AstNode[] {
  if (!isCallSignature(node) && !isConstructSignature(node)) return [];
  const tp = (node as unknown as { typeParameters?: { nodes?: readonly AstNode[] } }).typeParameters;
  return tp?.nodes ?? [];
}

/**
 * Returns true when the signature is generic.
 */
export function isGenericSignatureDeclaration(node: AstNode): boolean {
  return getSignatureTypeParameters(node).length > 0;
}

/**
 * Returns the count of parameters.
 */
export function getSignatureParameterCount(node: AstNode): number {
  return getSignatureParameters(node).length;
}

/**
 * Returns true when the signature has a rest parameter.
 */
export function hasRestParameter(node: AstNode): boolean {
  return getSignatureParameters(node).some(
    (p) => (p as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined,
  );
}

/**
 * Returns the count of required (non-optional, non-rest) parameters.
 */
export function getRequiredParameterCount(node: AstNode): number {
  const ref: { count: number } = { count: 0 };
  for (const p of getSignatureParameters(node)) {
    if ((p as unknown as { questionToken?: AstNode }).questionToken !== undefined) break;
    if ((p as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined) break;
    if ((p as unknown as { initializer?: AstNode }).initializer !== undefined) break;
    ref.count++;
  }
  return ref.count;
}
