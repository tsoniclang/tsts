/**
 * Inference context — tracks candidate types for each TypeParameter
 * during a single inference pass.
 *
 * Ported from Strada `inference.go` — InferenceContext, addCandidate,
 * inferCandidatesForReference, mergeInferenceContexts.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export interface InferenceCandidate {
  readonly typeParameter: AstSymbol;
  readonly candidates: readonly Type[];
}

export interface InferenceContext {
  readonly entries: ReadonlyMap<AstSymbol, readonly Type[]>;
}

/**
 * Returns an empty inference context.
 */
export function emptyInferenceContext(): InferenceContext {
  return { entries: new Map() };
}

/**
 * Returns a new context with `candidate` added to the type-parameter's
 * candidate list.
 */
export function addCandidate(
  ctx: InferenceContext,
  typeParameter: AstSymbol,
  candidate: Type,
): InferenceContext {
  const next = new Map(ctx.entries);
  const existing = next.get(typeParameter) ?? [];
  next.set(typeParameter, [...existing, candidate]);
  return { entries: next };
}

/**
 * Returns the candidate list for a type parameter.
 */
export function getCandidates(
  ctx: InferenceContext,
  typeParameter: AstSymbol,
): readonly Type[] {
  return ctx.entries.get(typeParameter) ?? [];
}

/**
 * Returns the type-parameters with at least one candidate.
 */
export function getInferredTypeParameters(
  ctx: InferenceContext,
): readonly AstSymbol[] {
  return [...ctx.entries.keys()];
}

/**
 * Returns the inferred type for a type parameter — the union of its
 * candidates, or `unknown` when no candidates are present.
 */
export function getInferredType(
  ctx: InferenceContext,
  typeParameter: AstSymbol,
): Type {
  const candidates = getCandidates(ctx, typeParameter);
  if (candidates.length === 0) {
    return { flags: TypeFlags.Unknown } as unknown as Type;
  }
  if (candidates.length === 1) return candidates[0]!;
  return { flags: TypeFlags.Union, types: candidates } as unknown as Type;
}

/**
 * Merges two inference contexts — for nested inference passes.
 */
export function mergeInferenceContexts(
  a: InferenceContext,
  b: InferenceContext,
): InferenceContext {
  const next = new Map(a.entries);
  for (const [tp, candidates] of b.entries) {
    const existing = next.get(tp) ?? [];
    next.set(tp, [...existing, ...candidates]);
  }
  return { entries: next };
}

/**
 * Returns the count of distinct type-parameters in the context.
 */
export function contextSize(ctx: InferenceContext): number {
  return ctx.entries.size;
}

/**
 * Returns true when the context has at least one inference target.
 */
export function hasInferences(ctx: InferenceContext): boolean {
  return ctx.entries.size > 0;
}
