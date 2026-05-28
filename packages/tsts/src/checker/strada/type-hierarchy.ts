/**
 * Type-hierarchy walker (class extends + interface implements chain).
 *
 * Ported from Strada `checker.go` — getBaseTypes, getInheritedTypes,
 * walkTypeHierarchy.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";

/**
 * Returns the direct base-type list of a class type.
 */
export function getDirectBaseTypes(t: Type): readonly Type[] {
  return (t as unknown as { baseTypes?: readonly Type[] }).baseTypes ?? [];
}

/**
 * Walks the entire base-type chain, calling `visit` for each base
 * encountered.
 */
export function walkBaseTypes(
  t: Type,
  visit: (base: Type, depth: number) => void,
): void {
  const visited = new Set<Type>();
  const walker = (current: Type, depth: number): void => {
    if (visited.has(current)) return;
    visited.add(current);
    for (const base of getDirectBaseTypes(current)) {
      visit(base, depth + 1);
      walker(base, depth + 1);
    }
  };
  walker(t, 0);
}

/**
 * Returns all transitive base types of a type.
 */
export function getAllBaseTypes(t: Type): readonly Type[] {
  const out: Type[] = [];
  walkBaseTypes(t, (base) => out.push(base));
  return out;
}

/**
 * Returns true when `base` is in the inheritance chain of `derived`.
 */
export function isInBaseChain(derived: Type, base: Type): boolean {
  let found = false;
  walkBaseTypes(derived, (candidate) => {
    if (candidate === base) found = true;
  });
  return found;
}

/**
 * Returns the depth of the inheritance chain (longest path to a
 * base with no further bases).
 */
export function getInheritanceChainDepth(t: Type): number {
  const ref: { maxDepth: number } = { maxDepth: 0 };
  walkBaseTypes(t, (_, depth) => {
    if (depth > ref.maxDepth) ref.maxDepth = depth;
  });
  return ref.maxDepth;
}

/**
 * Returns the symbols of all base types — useful for member-lookup
 * across the chain.
 */
export function getBaseSymbols(t: Type): readonly AstSymbol[] {
  const bases = getAllBaseTypes(t);
  const out: AstSymbol[] = [];
  for (const b of bases) {
    const sym = (b as unknown as { symbol?: AstSymbol }).symbol;
    if (sym !== undefined) out.push(sym);
  }
  return out;
}

/**
 * Returns true when a type has at least one base — extends something.
 */
export function hasAnyBaseType(t: Type): boolean {
  return getDirectBaseTypes(t).length > 0;
}
