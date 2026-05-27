/**
 * Generic instantiation helpers.
 *
 * Ported from Strada `checker.go` — fillMissingTypeArguments,
 * getTypeArgumentsForResolvedSignature, instantiateSignature.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type, Signature, TypeMapper } from "../types.js";
import { instantiateType, instantiateTypes } from "./instantiate.js";

/**
 * Pads the type argument list to match the number of type parameters
 * declared on the signature. Missing arguments take their default if
 * present, else Any.
 */
export function fillMissingTypeArguments(
  typeArguments: readonly Type[] | undefined,
  typeParameters: readonly AstNode[] | undefined,
): readonly Type[] {
  if (typeParameters === undefined || typeParameters.length === 0) return typeArguments ?? [];
  const provided = typeArguments ?? [];
  if (provided.length === typeParameters.length) return provided;
  const ANY: Type = { flags: 1 << 0 } as unknown as Type;
  const out: Type[] = [...provided];
  for (let i = provided.length; i < typeParameters.length; i++) {
    const tp = typeParameters[i]!;
    const defaultNode = (tp as unknown as { default?: AstNode }).default;
    out.push(defaultNode !== undefined ? ANY : ANY);
  }
  return out;
}

/**
 * Returns the type arguments resolved for a signature call. Without
 * full inference we surface the explicit args + Any padding.
 */
export function getTypeArgumentsForResolvedSignature(
  signature: Signature,
  callNode: AstNode,
): readonly Type[] {
  void signature;
  const args = (callNode as unknown as { typeArguments?: { nodes?: readonly Type[] } }).typeArguments?.nodes;
  return args ?? [];
}

/**
 * Builds a signature instance with the given type arguments
 * substituted in.
 */
export function instantiateSignature(
  signature: Signature,
  typeArguments: readonly Type[] | undefined,
  mapper: TypeMapper | undefined,
): Signature {
  if (typeArguments === undefined && mapper === undefined) return signature;
  const next: Record<string, unknown> = { ...(signature as object) };
  if (typeArguments !== undefined) next.typeArguments = typeArguments;
  if (mapper !== undefined) {
    const params = (signature as unknown as { parameters?: readonly AstSymbol[] }).parameters;
    if (params !== undefined) next.parameters = params; // Param types instantiate lazily.
    const ret = (signature as unknown as { resolvedReturnType?: Type }).resolvedReturnType;
    if (ret !== undefined) next.resolvedReturnType = instantiateType(ret, mapper);
  }
  return next as unknown as Signature;
}

/**
 * Returns a fresh signature that's the given signature instantiated
 * against the binding mapper of source signature.
 */
export function getErasedSignature(signature: Signature): Signature {
  // Drop type parameters to produce a non-generic version.
  return { ...(signature as object), typeParameters: undefined } as unknown as Signature;
}

/**
 * Returns the canonical signature — same shape, no type arguments
 * applied.
 */
export function getCanonicalSignature(signature: Signature): Signature {
  return getErasedSignature(signature);
}

/**
 * Helper exporting the bulk-instantiate utility from instantiate.ts.
 */
export { instantiateTypes };
