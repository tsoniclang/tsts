/**
 * Parameter-type computation and validation.
 *
 * Ported from Strada `checker.go` — getTypeOfParameter,
 * isParameterDeclaration, getRestParameterType, getMinArgumentCount.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is a Parameter declaration.
 */
export function isParameterDeclaration(node: AstNode): boolean {
  return node.kind === Kind.Parameter;
}

/**
 * Returns true when the parameter is marked optional (`?:`).
 */
export function isOptionalParameter(node: AstNode): boolean {
  if (!isParameterDeclaration(node)) return false;
  return (node as unknown as { questionToken?: AstNode }).questionToken !== undefined;
}

/**
 * Returns true when the parameter has a rest indicator (`...`).
 */
export function isRestParameter(node: AstNode): boolean {
  if (!isParameterDeclaration(node)) return false;
  return (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
}

/**
 * Returns the type annotation of a parameter, or undefined.
 */
export function getParameterAnnotation(node: AstNode): AstNode | undefined {
  if (!isParameterDeclaration(node)) return undefined;
  return (node as unknown as { type?: AstNode }).type;
}

/**
 * Returns the initializer (default value) of a parameter.
 */
export function getParameterInitializer(node: AstNode): AstNode | undefined {
  if (!isParameterDeclaration(node)) return undefined;
  return (node as unknown as { initializer?: AstNode }).initializer;
}

/**
 * Returns the resolved type for a parameter symbol. Conservative
 * placeholder — falls back to Any when annotation absent.
 */
export function getResolvedParameterType(_node: AstNode): Type {
  return ANY;
}

/**
 * Returns the rest parameter's type (the array/tuple element type
 * its `...args` collects into).
 */
export function getRestParameterType(sig: Signature): Type | undefined {
  const params = sig.parameters ?? [];
  if (params.length === 0) return undefined;
  const last = params[params.length - 1]!;
  if ((last as unknown as { isRest?: boolean }).isRest !== true) return undefined;
  return (last as unknown as { type?: Type }).type;
}

/**
 * Returns the minimum argument count for a signature (count of
 * required parameters before optional/rest).
 */
export function getMinArgumentCount(sig: Signature): number {
  const params = sig.parameters ?? [];
  const ref: { count: number } = { count: 0 };
  for (const p of params) {
    if ((p as unknown as { isOptional?: boolean }).isOptional === true) break;
    if ((p as unknown as { isRest?: boolean }).isRest === true) break;
    ref.count += 1;
  }
  return ref.count;
}

/**
 * Returns the maximum argument count for a signature (count of
 * parameters, or Infinity when there's a rest parameter).
 */
export function getMaxArgumentCount(sig: Signature): number {
  const params = sig.parameters ?? [];
  if (params.some((p) => (p as unknown as { isRest?: boolean }).isRest === true)) {
    return Infinity;
  }
  return params.length;
}

/**
 * Returns true when the parameter declaration has an initializer
 * — i.e. its absence in a call is allowed.
 */
export function hasParameterInitializer(node: AstNode): boolean {
  return getParameterInitializer(node) !== undefined;
}
