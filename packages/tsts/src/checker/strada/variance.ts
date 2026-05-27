/**
 * Variance computation for type parameters.
 *
 * Ported from Strada `checker.go` — getVarianceFlags, computeTypeVariance.
 * Used by the relater when comparing generic type-references.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { VarianceFlags } from "../types.js";

export const Variance = {
  Invariant: 0,
  Covariant: 1,
  Contravariant: 2,
  Bivariant: 3,
  Independent: 4,
} as const;

/**
 * Returns the explicit variance modifier flags from a TypeParameter
 * declaration node. `in T` → Contravariant; `out T` → Covariant;
 * `in out T` → Invariant.
 */
export function getVarianceFromModifiers(node: AstNode): VarianceFlags {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return Variance.Independent as VarianceFlags;
  let hasIn = false;
  let hasOut = false;
  for (const m of mods) {
    const k = (m as { kind?: number }).kind;
    if (k === Kind.InKeyword) hasIn = true;
    else if (k === Kind.OutKeyword) hasOut = true;
  }
  if (hasIn && hasOut) return Variance.Invariant as VarianceFlags;
  if (hasIn) return Variance.Contravariant as VarianceFlags;
  if (hasOut) return Variance.Covariant as VarianceFlags;
  return Variance.Independent as VarianceFlags;
}

/**
 * Returns true when two variances are compatible — used in subtype
 * checks for generic type references.
 */
export function isVarianceCompatible(a: VarianceFlags, b: VarianceFlags): boolean {
  if (a === b) return true;
  // Invariant is compatible with everything when source. Bivariant
  // is compatible with everything.
  if (a === (Variance.Bivariant as VarianceFlags)) return true;
  if (b === (Variance.Bivariant as VarianceFlags)) return true;
  return false;
}

/**
 * Combines two variances: when nesting a generic inside another,
 * variances multiply.
 */
export function combineVariance(outer: VarianceFlags, inner: VarianceFlags): VarianceFlags {
  if (outer === (Variance.Invariant as VarianceFlags) || inner === (Variance.Invariant as VarianceFlags)) {
    return Variance.Invariant as VarianceFlags;
  }
  if (outer === (Variance.Bivariant as VarianceFlags)) return inner;
  if (inner === (Variance.Bivariant as VarianceFlags)) return outer;
  if (outer === (Variance.Covariant as VarianceFlags)) return inner;
  if (outer === (Variance.Contravariant as VarianceFlags)) {
    if (inner === (Variance.Contravariant as VarianceFlags)) return Variance.Covariant as VarianceFlags;
    if (inner === (Variance.Covariant as VarianceFlags)) return Variance.Contravariant as VarianceFlags;
  }
  return outer;
}

/**
 * Returns the variance label as a string (for debug + diagnostics).
 */
export function varianceName(v: VarianceFlags): string {
  switch (v) {
    case Variance.Invariant as VarianceFlags: return "invariant";
    case Variance.Covariant as VarianceFlags: return "covariant";
    case Variance.Contravariant as VarianceFlags: return "contravariant";
    case Variance.Bivariant as VarianceFlags: return "bivariant";
    case Variance.Independent as VarianceFlags: return "independent";
    default: return "unknown";
  }
}
