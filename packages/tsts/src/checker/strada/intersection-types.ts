/**
 * Intersection-type construction and simplification.
 *
 * Ported from Strada `checker.go` — getIntersectionType,
 * simplifyIntersection, normalizeIntersection, isEmptyIntersection.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;
const UNKNOWN: Type = { flags: TypeFlags.Unknown } as unknown as Type;

/**
 * Builds an intersection type from a list of constituents. Returns
 * the input directly when only one constituent exists, or NEVER when
 * the intersection is provably empty.
 */
export function buildIntersectionType(types: readonly Type[]): Type {
  if (types.length === 0) return UNKNOWN;
  if (types.length === 1) return types[0]!;
  // De-duplicate by reference identity (conservative).
  const seen = new Set<Type>();
  const unique: Type[] = [];
  for (const t of types) {
    if (seen.has(t)) continue;
    seen.add(t);
    unique.push(t);
  }
  if (unique.length === 1) return unique[0]!;
  // If any constituent is Never, the intersection is Never.
  if (unique.some((t) => ((t as { flags?: number }).flags ?? 0 & TypeFlags.Never) !== 0)) {
    return NEVER;
  }
  return { flags: TypeFlags.Intersection, types: unique } as unknown as Type;
}

/**
 * Returns the constituent types of an intersection. Returns the
 * empty list when the input isn't an intersection.
 */
export function getIntersectionConstituents(t: Type): readonly Type[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Intersection) === 0) return [];
  return (t as unknown as { types?: readonly Type[] }).types ?? [];
}

/**
 * Returns true when the type is `Never` or known to be empty.
 */
export function isEmptyIntersection(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Never) !== 0) return true;
  if ((flags & TypeFlags.Intersection) === 0) return false;
  const constituents = getIntersectionConstituents(t);
  return constituents.length === 0;
}

/**
 * Returns true when all constituents are primitive types (string,
 * number, boolean, …). An intersection of two distinct primitives is
 * NEVER.
 */
export function isAllPrimitiveIntersection(t: Type): boolean {
  const constituents = getIntersectionConstituents(t);
  if (constituents.length === 0) return false;
  return constituents.every((c) => {
    const flags = (c as { flags?: number }).flags ?? 0;
    return (flags & (TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean |
      TypeFlags.BigInt | TypeFlags.ESSymbol | TypeFlags.Undefined | TypeFlags.Null)) !== 0;
  });
}

/**
 * Returns true when the intersection is provably empty — has at
 * least two distinct primitive constituents.
 */
export function isContradictoryPrimitiveIntersection(t: Type): boolean {
  const constituents = getIntersectionConstituents(t);
  const primitives = new Set<number>();
  for (const c of constituents) {
    const flags = (c as { flags?: number }).flags ?? 0;
    const primFlag = flags & (
      TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean |
      TypeFlags.BigInt | TypeFlags.ESSymbol
    );
    if (primFlag !== 0) primitives.add(primFlag);
  }
  return primitives.size > 1;
}

/**
 * Simplifies an intersection by removing redundant constituents.
 * Conservative shell: just dedupes by reference.
 */
export function simplifyIntersection(t: Type): Type {
  const constituents = getIntersectionConstituents(t);
  if (constituents.length === 0) return t;
  return buildIntersectionType(constituents);
}
