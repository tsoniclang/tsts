/**
 * Method-overload resolution.
 *
 * Ported from Strada `checker.go` — resolveOverload,
 * getEffectiveCallSignatures, pickBestOverload.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Signature, Type } from "../types.js";

/**
 * Returns the list of overload signatures of a function-like symbol's
 * declarations.
 */
export function getOverloadSignatures(decls: readonly AstNode[]): readonly Signature[] {
  const sigs: Signature[] = [];
  for (const d of decls) {
    if (
      d.kind !== Kind.FunctionDeclaration &&
      d.kind !== Kind.MethodDeclaration &&
      d.kind !== Kind.MethodSignature &&
      d.kind !== Kind.CallSignature
    ) {
      continue;
    }
    const sig = (d as unknown as { signature?: Signature }).signature;
    if (sig !== undefined) sigs.push(sig);
  }
  return sigs;
}

/**
 * Returns true when the function-like has overloads (multiple
 * signatures declared with the same name).
 */
export function hasOverloads(decls: readonly AstNode[]): boolean {
  return getOverloadSignatures(decls).length > 1;
}

/**
 * Returns the implementation signature of an overload set — the last
 * declaration without a body is the signature; the one with a body
 * is the implementation.
 */
export function getImplementationSignature(decls: readonly AstNode[]): Signature | undefined {
  for (const d of decls) {
    const body = (d as unknown as { body?: AstNode }).body;
    if (body !== undefined) {
      const sig = (d as unknown as { signature?: Signature }).signature;
      if (sig !== undefined) return sig;
    }
  }
  return undefined;
}

/**
 * Returns the count of overloads (signatures without bodies).
 */
export function getOverloadCount(decls: readonly AstNode[]): number {
  let count = 0;
  for (const d of decls) {
    const body = (d as unknown as { body?: AstNode }).body;
    if (body === undefined) count++;
  }
  return count;
}

/**
 * Returns the score of an overload candidate for a given argument
 * type list. Lower scores are preferred — perfect match is 0.
 */
export function scoreOverload(
  sig: Signature,
  _argTypes: readonly Type[],
): number {
  // Conservative: arity-based score.
  const params = sig.parameters ?? [];
  return Math.abs(params.length - _argTypes.length);
}

/**
 * Picks the lowest-scoring overload — the best match.
 */
export function pickBestOverload(
  candidates: readonly Signature[],
  argTypes: readonly Type[],
): Signature | undefined {
  if (candidates.length === 0) return undefined;
  if (candidates.length === 1) return candidates[0];
  const ref: { best: Signature | undefined; bestScore: number } = {
    best: candidates[0],
    bestScore: scoreOverload(candidates[0]!, argTypes),
  };
  for (let i = 1; i < candidates.length; i++) {
    const score = scoreOverload(candidates[i]!, argTypes);
    if (score < ref.bestScore) {
      ref.best = candidates[i];
      ref.bestScore = score;
    }
  }
  return ref.best;
}
