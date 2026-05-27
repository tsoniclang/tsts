/**
 * Parameter symbol/type resolution.
 *
 * Ported from Strada `checker.go` — getResolvedParameterType,
 * getParameterSymbolReferences, isParameterReferenced.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the parameter type by walking the declaration's annotation
 * → initializer → contextual chain.
 */
export function resolveParameterType(parameter: AstNode): Type {
  // 1. Explicit annotation
  const annot = (parameter as unknown as { type?: { resolvedType?: Type } }).type;
  if (annot?.resolvedType !== undefined) return annot.resolvedType;
  // 2. Initializer's inferred type
  const init = (parameter as unknown as { initializer?: { resolvedType?: Type } }).initializer;
  if (init?.resolvedType !== undefined) return init.resolvedType;
  return ANY;
}

/**
 * Returns the parameter's binding name.
 */
export function getParameterBindingName(parameter: AstNode): AstNode | undefined {
  if (parameter.kind !== Kind.Parameter) return undefined;
  return (parameter as unknown as { name?: AstNode }).name;
}

/**
 * Returns true when the parameter is a destructuring pattern.
 */
export function isDestructuringParameter(parameter: AstNode): boolean {
  const name = getParameterBindingName(parameter);
  if (name === undefined) return false;
  return (
    name.kind === Kind.ObjectBindingPattern ||
    name.kind === Kind.ArrayBindingPattern
  );
}

/**
 * Returns the parameter index of a parameter declaration within its
 * function-like.
 */
export function getParameterIndex(parameter: AstNode): number {
  const parent = (parameter as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return -1;
  const params = (parent as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params === undefined) return -1;
  return params.indexOf(parameter);
}

/**
 * Returns true when the parameter is referenced inside the function
 * body.
 */
export function isParameterReferenced(symbol: AstSymbol): boolean {
  const refCount = (symbol as unknown as { referenceCount?: number }).referenceCount;
  return refCount !== undefined && refCount > 0;
}

/**
 * Returns the count of references to a parameter symbol.
 */
export function getParameterReferenceCount(symbol: AstSymbol): number {
  return (symbol as unknown as { referenceCount?: number }).referenceCount ?? 0;
}
