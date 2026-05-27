/**
 * Brand-type helpers (nominal-typing pattern).
 *
 * Ported from Strada `checker.go` — isBrandedType, getBrandSymbols,
 * computeBrandedIntersection. A "brand" is an empty interface used
 * to give structural types nominal identity.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the type is a brand — has no actual properties
 * but carries a unique symbol name.
 */
export function isBrandType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  return members === undefined || members.size === 0;
}

/**
 * Returns the brand symbols of an intersection type — the parts of
 * the intersection that are themselves brand types.
 */
export function getBrandSymbolsFromIntersection(t: Type): readonly AstSymbol[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Intersection) === 0) return [];
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const out: AstSymbol[] = [];
  for (const c of types) {
    if (isBrandType(c)) {
      const sym = (c as unknown as { symbol?: AstSymbol }).symbol;
      if (sym !== undefined) out.push(sym);
    }
  }
  return out;
}

/**
 * Returns true when two types share at least one brand — used for
 * nominal compatibility checks.
 */
export function sharesBrand(a: Type, b: Type): boolean {
  const ab = new Set(getBrandSymbolsFromIntersection(a));
  const bb = getBrandSymbolsFromIntersection(b);
  return bb.some((s) => ab.has(s));
}

/**
 * Returns the "core" type of a branded intersection — the non-brand
 * portion that carries actual data.
 */
export function getBrandedCoreType(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Intersection) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const core = types.filter((c) => !isBrandType(c));
  if (core.length === 0) return t;
  if (core.length === 1) return core[0]!;
  return { flags: TypeFlags.Intersection, types: core } as unknown as Type;
}
