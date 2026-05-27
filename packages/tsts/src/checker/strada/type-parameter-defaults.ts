/**
 * Type-parameter default handling.
 *
 * Ported from Strada `checker.go` — getDefaultFromTypeParameter,
 * fillMissingTypeArgumentsFromDefaults, validateDefaultConstraint.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;
const UNKNOWN: Type = { flags: TypeFlags.Unknown } as unknown as Type;

/**
 * Returns true when the TypeParameter declaration has a default
 * value (`T = ...`).
 */
export function hasDefault(decl: AstNode): boolean {
  if (decl.kind !== Kind.TypeParameter) return false;
  return (decl as unknown as { default?: AstNode }).default !== undefined;
}

/**
 * Returns the default type-node of a TypeParameter.
 */
export function getDefaultNode(decl: AstNode): AstNode | undefined {
  if (decl.kind !== Kind.TypeParameter) return undefined;
  return (decl as unknown as { default?: AstNode }).default;
}

/**
 * Returns the resolved default type, falling back to UNKNOWN.
 */
export function getResolvedDefault(decl: AstNode): Type {
  const def = getDefaultNode(decl);
  if (def === undefined) return UNKNOWN;
  const resolved = (def as unknown as { resolvedType?: Type }).resolvedType;
  return resolved ?? UNKNOWN;
}

/**
 * Returns the count of type parameters with defaults.
 */
export function countDefaults(typeParameters: readonly AstNode[]): number {
  return typeParameters.filter(hasDefault).length;
}

/**
 * Returns the minimum number of type arguments required —
 * (totalParams - defaultsCount).
 */
export function getMinTypeArgumentCount(typeParameters: readonly AstNode[]): number {
  return typeParameters.length - countDefaults(typeParameters);
}

/**
 * Fills missing type arguments from declared defaults.
 */
export function fillMissingFromDefaults(
  provided: readonly Type[],
  typeParameters: readonly AstNode[],
): readonly Type[] {
  if (provided.length >= typeParameters.length) {
    return provided.slice(0, typeParameters.length);
  }
  const out: Type[] = [...provided];
  for (let i = provided.length; i < typeParameters.length; i++) {
    out.push(getResolvedDefault(typeParameters[i]!));
  }
  return out;
}

/**
 * Returns true when the default is "trivial" — Any or Unknown.
 */
export function isTrivialDefault(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & (TypeFlags.Any | TypeFlags.Unknown)) !== 0;
}

/**
 * Returns the resolved default type list, falling back to ANY for
 * defaults that don't resolve.
 */
export function getDefaultsTypeList(
  typeParameters: readonly AstNode[],
): readonly Type[] {
  return typeParameters.map((tp) => hasDefault(tp) ? getResolvedDefault(tp) : ANY);
}
