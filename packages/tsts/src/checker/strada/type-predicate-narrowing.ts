/**
 * Type-predicate-based narrowing.
 *
 * Ported from Strada `checker.go` — narrowTypeByTypePredicate,
 * applyTypeGuard, refineWithPredicate.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Narrows a type by a predicate's positive branch — keeps
 * constituents assignable to the predicate type.
 */
export function narrowByPositivePredicate(t: Type, predicate: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return isTypeAssignableTo(t, predicate) ? t : predicate;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => isTypeAssignableTo(c, predicate));
  if (matching.length === 0) return predicate;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Narrows a type by a predicate's negative branch — removes
 * constituents assignable to the predicate type.
 */
export function narrowByNegativePredicate(t: Type, predicate: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return isTypeAssignableTo(t, predicate) ? NEVER : t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => !isTypeAssignableTo(c, predicate));
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Returns the canonical narrowed type for an `asserts` predicate
 * — its assertion always holds after the call.
 */
export function applyAssertsPredicate(t: Type, predicate: Type): Type {
  return narrowByPositivePredicate(t, predicate);
}

/**
 * Returns the canonical narrowed type for `x is T` — same as
 * positive predicate.
 */
export function applyIsTypeGuard(t: Type, predicate: Type): Type {
  return narrowByPositivePredicate(t, predicate);
}
