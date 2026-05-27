/**
 * Type-substitution helpers.
 *
 * Ported from Strada `mapper.go` (within `checker`) — substituteTypeArguments,
 * applySubstitutionMap, composeSubstitutions.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export interface SubstitutionMap {
  readonly map: ReadonlyMap<AstSymbol, Type>;
}

/**
 * Returns an empty substitution map.
 */
export function emptySubstitution(): SubstitutionMap {
  return { map: new Map() };
}

/**
 * Returns a substitution map with a single entry.
 */
export function singletonSubstitution(
  typeParameter: AstSymbol,
  replacement: Type,
): SubstitutionMap {
  return { map: new Map([[typeParameter, replacement]]) };
}

/**
 * Returns the substitution result for a given type parameter symbol.
 */
export function lookupSubstitution(
  sub: SubstitutionMap,
  typeParameter: AstSymbol,
): Type | undefined {
  return sub.map.get(typeParameter);
}

/**
 * Composes two substitutions — applies `outer` after `inner`.
 */
export function composeSubstitutions(
  inner: SubstitutionMap,
  outer: SubstitutionMap,
): SubstitutionMap {
  const composed = new Map<AstSymbol, Type>();
  for (const [tp, t] of inner.map) {
    composed.set(tp, applySubstitution(outer, t));
  }
  // Add outer-only mappings.
  for (const [tp, t] of outer.map) {
    if (!composed.has(tp)) composed.set(tp, t);
  }
  return { map: composed };
}

/**
 * Applies a substitution to a type, recursively walking unions/
 * intersections.
 */
export function applySubstitution(sub: SubstitutionMap, t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.TypeParameter) !== 0) {
    const tpSym = (t as unknown as { symbol?: AstSymbol }).symbol;
    if (tpSym !== undefined) {
      const replacement = lookupSubstitution(sub, tpSym);
      if (replacement !== undefined) return replacement;
    }
    return t;
  }
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const substituted = types.map((c) => applySubstitution(sub, c));
    return { flags: TypeFlags.Union, types: substituted } as unknown as Type;
  }
  if ((flags & TypeFlags.Intersection) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const substituted = types.map((c) => applySubstitution(sub, c));
    return { flags: TypeFlags.Intersection, types: substituted } as unknown as Type;
  }
  return t;
}

/**
 * Returns the size of a substitution map.
 */
export function substitutionSize(sub: SubstitutionMap): number {
  return sub.map.size;
}

/**
 * Returns true when the substitution is empty.
 */
export function isEmptySubstitution(sub: SubstitutionMap): boolean {
  return sub.map.size === 0;
}
