/**
 * Property-getter lookup helpers.
 *
 * Ported from Strada `checker.go` — getResolvedTypeOfPropertyOfType,
 * resolvePropertyAccessChain.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the property symbol on a type — falls back to the parent's
 * symbol members.
 */
export function lookupProperty(t: Type, name: string): AstSymbol | undefined {
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  return members?.get(name);
}

/**
 * Returns the type of a property on a type — resolves through unions,
 * intersections, and inheritance.
 */
export function getPropertyType(t: Type, name: string): Type {
  const flags = (t as { flags?: number }).flags ?? 0;

  if ((flags & TypeFlags.Any) !== 0) return ANY;
  if ((flags & TypeFlags.Never) !== 0) return ANY;

  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const propTypes = types.map((c) => getPropertyType(c, name));
    return { flags: TypeFlags.Union, types: propTypes } as unknown as Type;
  }

  if ((flags & TypeFlags.Intersection) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const found = types
      .map((c) => getPropertyType(c, name))
      .filter((pt) => {
        const pf = (pt as { flags?: number }).flags ?? 0;
        return (pf & TypeFlags.Any) === 0;
      });
    if (found.length === 0) return ANY;
    if (found.length === 1) return found[0]!;
    return { flags: TypeFlags.Intersection, types: found } as unknown as Type;
  }

  const sym = lookupProperty(t, name);
  if (sym === undefined) return ANY;
  return (sym as unknown as { type?: Type }).type ?? ANY;
}

/**
 * Returns the symbol resolved by chained property access — `a.b.c.d`.
 */
export function resolvePropertyChain(
  rootType: Type,
  names: readonly string[],
): AstSymbol | undefined {
  const walk = (t: Type, i: number): AstSymbol | undefined => {
    if (i >= names.length) return undefined;
    const sym = lookupProperty(t, names[i]!);
    if (sym === undefined) return undefined;
    if (i === names.length - 1) return sym;
    const symType = (sym as unknown as { type?: Type }).type;
    if (symType === undefined) return undefined;
    return walk(symType, i + 1);
  };
  return walk(rootType, 0);
}

/**
 * Returns true when the type has the property `name`.
 */
export function hasProperty(t: Type, name: string): boolean {
  return lookupProperty(t, name) !== undefined;
}

/**
 * Returns all property names accessible on a type.
 */
export function getAccessiblePropertyNames(t: Type): readonly string[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return [];
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return [];
  return [...members.keys()];
}
