/**
 * Property-name set operations.
 *
 * Ported from Strada `checker.go` — getPropertyNamesOfType,
 * intersectPropertyNames, propertyNamesUnion.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the set of property names on a type.
 */
export function getPropertyNameSet(t: Type): ReadonlySet<string> {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return new Set();
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return new Set();
  return new Set(members.keys());
}

/**
 * Returns property names common to every constituent of a union.
 */
export function getCommonPropertyNames(t: Type): ReadonlySet<string> {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return getPropertyNameSet(t);
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  if (types.length === 0) return new Set();
  const result = new Set(getPropertyNameSet(types[0]!));
  for (let i = 1; i < types.length; i++) {
    const next = getPropertyNameSet(types[i]!);
    for (const name of result) {
      if (!next.has(name)) result.delete(name);
    }
  }
  return result;
}

/**
 * Returns the union of property names across all constituents.
 */
export function getAllPropertyNames(t: Type): ReadonlySet<string> {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0 && (flags & TypeFlags.Intersection) === 0) {
    return getPropertyNameSet(t);
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const out = new Set<string>();
  for (const c of types) {
    for (const n of getPropertyNameSet(c)) out.add(n);
  }
  return out;
}

/**
 * Returns the property names in `a` that aren't in `b`.
 */
export function getPropertyNameDifference(
  a: ReadonlySet<string>,
  b: ReadonlySet<string>,
): readonly string[] {
  const out: string[] = [];
  for (const name of a) {
    if (!b.has(name)) out.push(name);
  }
  return out;
}

/**
 * Returns the property names in both `a` and `b`.
 */
export function getPropertyNameIntersection(
  a: ReadonlySet<string>,
  b: ReadonlySet<string>,
): readonly string[] {
  const out: string[] = [];
  for (const name of a) {
    if (b.has(name)) out.push(name);
  }
  return out;
}

/**
 * Returns true when set `a` is a subset of set `b`.
 */
export function isPropertyNameSubset(
  a: ReadonlySet<string>,
  b: ReadonlySet<string>,
): boolean {
  for (const name of a) {
    if (!b.has(name)) return false;
  }
  return true;
}
