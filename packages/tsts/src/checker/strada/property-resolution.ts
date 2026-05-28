/**
 * Property-resolution algorithm.
 *
 * Ported from Strada `checker.go` — getPropertyOfTypeWithoutCache,
 * resolvePropertyAccess, lookupPropertyInHierarchy.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the property symbol for a given name on a type.
 */
export function lookupProperty(t: Type, name: string): AstSymbol | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return undefined;
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  return members?.get(name);
}

/**
 * Walks up a type's hierarchy looking for a property.
 */
export function lookupPropertyInHierarchy(t: Type, name: string): AstSymbol | undefined {
  const direct = lookupProperty(t, name);
  if (direct !== undefined) return direct;
  const bases = (t as unknown as { baseTypes?: readonly Type[] }).baseTypes;
  if (bases === undefined) return undefined;
  for (const base of bases) {
    const found = lookupPropertyInHierarchy(base, name);
    if (found !== undefined) return found;
  }
  return undefined;
}

/**
 * Looks up a property in a union type — returns the property on
 * every constituent that has one, or undefined if any constituent
 * lacks it.
 */
export function lookupPropertyInUnion(t: Type, name: string): readonly AstSymbol[] | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    const sym = lookupProperty(t, name);
    return sym === undefined ? undefined : [sym];
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const out: AstSymbol[] = [];
  for (const c of types) {
    const sym = lookupPropertyInHierarchy(c, name);
    if (sym === undefined) return undefined;
    out.push(sym);
  }
  return out;
}

/**
 * Looks up a property in an intersection type — returns the first
 * matching constituent's property.
 */
export function lookupPropertyInIntersection(t: Type, name: string): AstSymbol | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Intersection) === 0) return lookupProperty(t, name);
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  for (const c of types) {
    const sym = lookupPropertyInHierarchy(c, name);
    if (sym !== undefined) return sym;
  }
  return undefined;
}

/**
 * Top-level property lookup — dispatches to union/intersection/
 * hierarchy variants.
 */
export function resolveProperty(t: Type, name: string): AstSymbol | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) !== 0) {
    const syms = lookupPropertyInUnion(t, name);
    return syms?.[0];
  }
  if ((flags & TypeFlags.Intersection) !== 0) {
    return lookupPropertyInIntersection(t, name);
  }
  return lookupPropertyInHierarchy(t, name);
}
