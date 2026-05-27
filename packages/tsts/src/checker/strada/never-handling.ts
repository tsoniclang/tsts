/**
 * `never` type handling — propagation, exhaustiveness.
 *
 * Ported from Strada `checker.go` — isNeverType, getNeverTypeForBranch,
 * removeNeverFromUnion.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns true when the type is `never`.
 */
export function isNeverType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Never) !== 0;
}

/**
 * Returns the canonical `never` type instance.
 */
export function neverType(): Type {
  return NEVER;
}

/**
 * Returns a new union with all `never` constituents removed.
 */
export function removeNeverFromUnion(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => !isNeverType(c));
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}

/**
 * Returns true when the union is "effectively never" — all
 * constituents are never.
 */
export function isUnionEffectivelyNever(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Never) !== 0) return true;
  if ((flags & TypeFlags.Union) === 0) return false;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return types.every(isNeverType);
}

/**
 * Returns true when the type's emission would be redundant in a
 * union (i.e. it's never).
 */
export function isRedundantInUnion(t: Type): boolean {
  return isNeverType(t);
}

/**
 * Returns the "unreachable-return type" for a branch — never.
 */
export function getUnreachableBranchType(): Type {
  return NEVER;
}
