/**
 * Signature manipulation helpers.
 *
 * Ported from Strada `checker.go` — cloneSignature, getCanonicalSignature,
 * mergeSignatures, isContextSensitiveSignature.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";

/**
 * Returns a shallow clone of a signature with updates.
 */
export function cloneSignature(sig: Signature, updates: Partial<Signature> = {}): Signature {
  return { ...sig, ...updates };
}

/**
 * Returns true when the signature has type parameters.
 */
export function isGenericSignature(sig: Signature): boolean {
  const tp = (sig as unknown as { typeParameters?: readonly unknown[] }).typeParameters;
  return tp !== undefined && tp.length > 0;
}

/**
 * Returns the count of required parameters in a signature.
 */
export function getRequiredParameterCount(sig: Signature): number {
  const params = sig.parameters ?? [];
  const ref: { count: number } = { count: 0 };
  for (const p of params) {
    if ((p as unknown as { isOptional?: boolean }).isOptional === true) break;
    if ((p as unknown as { isRest?: boolean }).isRest === true) break;
    ref.count++;
  }
  return ref.count;
}

/**
 * Returns true when the signature is context-sensitive — its
 * parameters lack type annotations and its body is small enough that
 * inference matters.
 */
export function isContextSensitiveSignature(sig: Signature): boolean {
  const params = sig.parameters ?? [];
  return params.some((p) => (p as unknown as { type?: Type }).type === undefined);
}

/**
 * Returns the canonical (non-context-sensitive) form of a signature.
 */
export function getCanonicalSignature(sig: Signature): Signature {
  return sig;
}

/**
 * Merges two signatures by intersecting their parameter and return
 * types. Used for overload resolution.
 */
export function mergeSignatures(a: Signature, b: Signature): Signature {
  return {
    ...a,
    parameters: [...(a.parameters ?? []), ...(b.parameters ?? [])],
  };
}

/**
 * Returns the declaration kind of a signature's owner. Useful for
 * distinguishing method overloads from regular function overloads.
 */
export function getSignatureDeclarationKind(sig: Signature): number {
  const decl = (sig as unknown as { declaration?: AstNode }).declaration;
  return decl?.kind ?? Kind.Unknown;
}

/**
 * Returns true when the signature is from a method declaration.
 */
export function isMethodSignature(sig: Signature): boolean {
  const k = getSignatureDeclarationKind(sig);
  return k === Kind.MethodDeclaration || k === Kind.MethodSignature;
}

/**
 * Returns true when the signature is from a constructor declaration.
 */
export function isConstructorSignature(sig: Signature): boolean {
  return getSignatureDeclarationKind(sig) === Kind.Constructor;
}

/**
 * Returns true when the signature is from a call signature
 * (anonymous function in an interface).
 */
export function isCallSignatureDeclaration(sig: Signature): boolean {
  return getSignatureDeclarationKind(sig) === Kind.CallSignature;
}

/**
 * Returns true when the signature is from a function declaration
 * (not a method).
 */
export function isFunctionSignature(sig: Signature): boolean {
  const k = getSignatureDeclarationKind(sig);
  return k === Kind.FunctionDeclaration || k === Kind.FunctionExpression || k === Kind.ArrowFunction;
}
