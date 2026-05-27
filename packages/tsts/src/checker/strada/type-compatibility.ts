/**
 * Type-compatibility predicates.
 *
 * Ported from Strada `relater.go` (within `checker`) — top-level
 * predicates that wrap the relater for quick lookups.
 */

import type { Signature, Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo, isTypeIdenticalTo, isTypeSubtypeOf } from "./relations.js";

/**
 * Returns true when two types share at least one constituent — used
 * for `instanceof`/`typeof`/discriminant narrowing.
 */
export function typesOverlap(a: Type, b: Type): boolean {
  const af = (a as { flags?: number }).flags ?? 0;
  const bf = (b as { flags?: number }).flags ?? 0;
  if ((af & TypeFlags.Any) !== 0 || (bf & TypeFlags.Any) !== 0) return true;
  if ((af & TypeFlags.Never) !== 0 || (bf & TypeFlags.Never) !== 0) return false;
  if (isTypeAssignableTo(a, b)) return true;
  if (isTypeAssignableTo(b, a)) return true;
  return false;
}

/**
 * Returns true when the two types are mutually assignable — neither
 * is more general than the other.
 */
export function typesAreInterconvertible(a: Type, b: Type): boolean {
  return isTypeAssignableTo(a, b) && isTypeAssignableTo(b, a);
}

/**
 * Returns true when the source type is a proper subtype of the
 * target (strict — not just assignable).
 */
export function isProperSubtype(source: Type, target: Type): boolean {
  return isTypeSubtypeOf(source, target) && !isTypeIdenticalTo(source, target);
}

/**
 * Returns the common assignable type of two types, if one exists.
 * Returns the wider type when either is assignable to the other;
 * undefined otherwise.
 */
export function commonAssignableType(a: Type, b: Type): Type | undefined {
  if (isTypeAssignableTo(a, b)) return b;
  if (isTypeAssignableTo(b, a)) return a;
  return undefined;
}

/**
 * Returns true when a signature is compatible with a target (every
 * call to the source could be made via the target signature).
 */
export function isSignatureCompatible(source: Signature, target: Signature): boolean {
  // Conservative: arity-based check.
  const srcParams = source.parameters ?? [];
  const tgtParams = target.parameters ?? [];
  if (srcParams.length > tgtParams.length) {
    const lastTgt = tgtParams[tgtParams.length - 1];
    const hasRest = lastTgt !== undefined &&
      (lastTgt as unknown as { isRest?: boolean }).isRest === true;
    if (!hasRest) return false;
  }
  return true;
}

/**
 * Returns true when two signatures have the same arity and matching
 * parameter types (modulo rest parameters).
 */
export function isSignatureIdentical(a: Signature, b: Signature): boolean {
  const ap = a.parameters ?? [];
  const bp = b.parameters ?? [];
  if (ap.length !== bp.length) return false;
  for (let i = 0; i < ap.length; i++) {
    const at = (ap[i] as unknown as { type?: Type }).type;
    const bt = (bp[i] as unknown as { type?: Type }).type;
    if (at === undefined || bt === undefined) continue;
    if (!isTypeIdenticalTo(at, bt)) return false;
  }
  return true;
}

/**
 * Returns true when the source type is bivariantly assignable to
 * target. Bivariance is used for method types in non-strict mode.
 */
export function isBivariantlyAssignable(source: Type, target: Type): boolean {
  return isTypeAssignableTo(source, target) || isTypeAssignableTo(target, source);
}
