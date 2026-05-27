/**
 * Inference entry points.
 *
 * Strada-shape wrapper around `../inference.ts`. Re-exports the
 * common inference primitives so checker-strada/* files don't reach
 * into the sibling module directly.
 */

import type { Type, Signature, VarianceFlags } from "../types.js";
import {
  Inferer,
  InferencePriority,
  InferenceFlags,
  type InferenceContext,
  type InferenceInfo,
  type InferenceState,
} from "../inference.js";

const sharedInferer = new Inferer();

export function inferTypes(
  inferences: InferenceInfo[],
  source: Type | undefined,
  target: Type | undefined,
  priority: InferencePriority = InferencePriority.None,
  contravariant: boolean = false,
): void {
  sharedInferer.inferTypes(inferences, source, target, priority, contravariant);
}

export function inferFromTypes(
  state: InferenceState,
  source: Type,
  target: Type,
): void {
  sharedInferer.inferFromTypes(state, source, target);
}

export function inferFromTypeArguments(
  state: InferenceState,
  sourceTypes: readonly Type[],
  targetTypes: readonly Type[],
  variances: readonly VarianceFlags[] = [],
): void {
  sharedInferer.inferFromTypeArguments(state, sourceTypes, targetTypes, variances);
}

export function inferFromSignature(
  state: InferenceState,
  source: Signature,
  target: Signature,
): void {
  sharedInferer.inferFromSignature(state, source, target);
}

export function newInferenceContext(
  typeParameters: readonly Type[],
  signature: Signature | undefined = undefined,
  flags: InferenceFlags = InferenceFlags.None,
  compareTypes: (s: Type, t: Type, reportErrors: boolean) => boolean = () => true,
): InferenceContext {
  return sharedInferer.newInferenceContext(typeParameters, signature, flags, compareTypes);
}

export function getInferredType(
  context: InferenceContext,
  index: number,
): Type | undefined {
  return sharedInferer.getInferredType(context, index);
}

export function getInferredTypes(context: InferenceContext): readonly Type[] {
  return sharedInferer.getInferredTypes(context);
}

export { InferencePriority, InferenceFlags };
export type { InferenceContext, InferenceInfo, InferenceState };
