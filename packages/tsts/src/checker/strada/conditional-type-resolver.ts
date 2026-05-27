/**
 * Conditional-type resolution helpers (auxiliary to `conditional-types.ts`).
 *
 * Ported from Strada `checker.go` — getInferredConditionalType,
 * distributeConditionalType, resolveDeferredConditional.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the conditional type has been resolved (its
 * trueType or falseType has been picked).
 */
export function isResolvedConditional(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Conditional) === 0) return true;
  // Deferred conditional has no resolvedType yet.
  return (t as unknown as { resolvedType?: Type }).resolvedType !== undefined;
}

/**
 * Returns the resolved type of a conditional, if available.
 */
export function getResolvedConditional(t: Type): Type | undefined {
  return (t as unknown as { resolvedType?: Type }).resolvedType;
}

/**
 * Returns the inferred type-parameter list of a conditional type
 * (from `infer X` clauses).
 */
export function getInferredTypeParameters(t: Type): readonly Type[] {
  return (t as unknown as { inferredTypeParameters?: readonly Type[] }).inferredTypeParameters ?? [];
}

/**
 * Returns true when the conditional has at least one `infer` clause.
 */
export function hasInferClause(t: Type): boolean {
  return getInferredTypeParameters(t).length > 0;
}

/**
 * Returns true when a conditional type is "distributive" — its
 * check-type is a naked type parameter.
 */
export function isDistributiveConditionalType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Conditional) === 0) return false;
  const check = (t as unknown as { checkType?: Type }).checkType;
  if (check === undefined) return false;
  const cf = (check as { flags?: number }).flags ?? 0;
  return (cf & TypeFlags.TypeParameter) !== 0;
}

/**
 * Returns the depth of nested conditional types — used to detect
 * recursive conditional expansion.
 */
export function getConditionalDepth(t: Type): number {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Conditional) === 0) return 0;
  const tr = (t as unknown as { trueType?: Type }).trueType;
  const fa = (t as unknown as { falseType?: Type }).falseType;
  const trDepth = tr !== undefined ? getConditionalDepth(tr) : 0;
  const faDepth = fa !== undefined ? getConditionalDepth(fa) : 0;
  return 1 + Math.max(trDepth, faDepth);
}

/**
 * The maximum allowed conditional recursion depth.
 */
export const MaxConditionalRecursionDepth = 32;

/**
 * Returns true when the conditional depth exceeds the recursion limit.
 */
export function exceedsConditionalDepth(t: Type): boolean {
  return getConditionalDepth(t) > MaxConditionalRecursionDepth;
}
