/**
 * Union-type construction and simplification.
 *
 * Ported from Strada `checker.go` — getUnionType, removeSubtypes,
 * normalizeUnion, isProbablyDistributive.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Builds a union type from a list of constituents. Returns the input
 * directly when only one constituent exists.
 */
export function buildUnionType(types: readonly Type[]): Type {
  if (types.length === 0) return NEVER;
  if (types.length === 1) return types[0]!;
  // De-duplicate by reference identity.
  const seen = new Set<Type>();
  const unique: Type[] = [];
  for (const t of types) {
    if (seen.has(t)) continue;
    seen.add(t);
    unique.push(t);
  }
  if (unique.length === 1) return unique[0]!;
  return { flags: TypeFlags.Union, types: unique } as unknown as Type;
}

/**
 * Returns the constituent types of a union. Returns the empty list
 * when the input isn't a union.
 */
export function getUnionConstituents(t: Type): readonly Type[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return [];
  return (t as unknown as { types?: readonly Type[] }).types ?? [];
}

/**
 * Removes constituents that are subtypes of another constituent.
 */
export function removeSubtypesFromUnion(t: Type): Type {
  const constituents = getUnionConstituents(t);
  if (constituents.length === 0) return t;
  const remaining: Type[] = [];
  for (let i = 0; i < constituents.length; i++) {
    const ci = constituents[i]!;
    const dominated = constituents.some((cj, j) => {
      if (i === j) return false;
      return isTypeAssignableTo(ci, cj) && !isTypeAssignableTo(cj, ci);
    });
    if (!dominated) remaining.push(ci);
  }
  return buildUnionType(remaining);
}

/**
 * Returns true when the union has at least one nullable constituent.
 */
export function unionContainsNullable(t: Type): boolean {
  return getUnionConstituents(t).some((c) => {
    const flags = (c as { flags?: number }).flags ?? 0;
    return (flags & (TypeFlags.Null | TypeFlags.Undefined)) !== 0;
  });
}

/**
 * Returns true when every constituent of a union shares the same
 * symbol — a common pattern for tagged unions.
 */
export function isSymbolUnion(t: Type): boolean {
  const constituents = getUnionConstituents(t);
  if (constituents.length < 2) return false;
  const firstSym = (constituents[0] as unknown as { symbol?: unknown }).symbol;
  return constituents.every((c) =>
    (c as unknown as { symbol?: unknown }).symbol === firstSym,
  );
}

/**
 * Returns true when all constituents are literal types.
 */
export function isAllLiteralUnion(t: Type): boolean {
  const constituents = getUnionConstituents(t);
  if (constituents.length === 0) return false;
  return constituents.every((c) => {
    const flags = (c as { flags?: number }).flags ?? 0;
    return (flags & TypeFlags.Literal) !== 0;
  });
}

/**
 * Returns the number of constituents in a union.
 */
export function getUnionArity(t: Type): number {
  return getUnionConstituents(t).length;
}

/**
 * Returns true when two unions are "structurally equivalent" — same
 * constituents (ignoring order, by reference identity).
 */
export function unionsEqual(a: Type, b: Type): boolean {
  const ac = getUnionConstituents(a);
  const bc = getUnionConstituents(b);
  if (ac.length !== bc.length) return false;
  const aSet = new Set(ac);
  return bc.every((t) => aSet.has(t));
}
