/**
 * Discriminated-union narrowing.
 *
 * Ported from Strada `checker.go` — getDiscriminatingPropertyOfUnion,
 * narrowTypeForDiscriminantProperty, getDiscriminantType.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns true when the property type is a "discriminant" — a single
 * literal value (or union of literal values).
 */
export function isDiscriminantPropertyType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Literal) !== 0) return true;
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return types.every((c) => {
      const cf = (c as { flags?: number }).flags ?? 0;
      return (cf & TypeFlags.Literal) !== 0;
    });
  }
  return false;
}

/**
 * Walks a union to find a property name that's a literal type in
 * every constituent. That property is the discriminant.
 */
export function getDiscriminatingPropertyName(t: Type): string | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return undefined;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  if (types.length < 2) return undefined;

  // Find names common to every constituent's symbol.members.
  const first = (types[0] as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (first === undefined) return undefined;

  for (const [name] of first) {
    let isDiscriminant = true;
    for (const c of types) {
      const members = (c as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
      const propSym = members?.get(name);
      if (propSym === undefined) {
        isDiscriminant = false; break;
      }
      const propType = (propSym as unknown as { type?: Type }).type;
      if (propType === undefined || !isDiscriminantPropertyType(propType)) {
        isDiscriminant = false; break;
      }
    }
    if (isDiscriminant) return name;
  }
  return undefined;
}

/**
 * Narrows a union by the literal value of a property. Returns NEVER
 * when no constituent matches.
 */
export function narrowByDiscriminant(
  t: Type,
  propertyName: string,
  propertyValue: string | number | boolean,
): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return t;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const filtered = types.filter((c) => {
    const members = (c as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    const propSym = members?.get(propertyName);
    if (propSym === undefined) return false;
    const propType = (propSym as unknown as { type?: Type }).type;
    if (propType === undefined) return false;
    const value = (propType as unknown as { value?: unknown }).value;
    return value === propertyValue;
  });
  if (filtered.length === 0) return NEVER;
  if (filtered.length === 1) return filtered[0]!;
  return { flags: TypeFlags.Union, types: filtered } as unknown as Type;
}

/**
 * Returns the discriminant type of a union for a given property —
 * the union of literal values that property takes.
 */
export function getDiscriminantType(
  t: Type,
  propertyName: string,
): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) return NEVER;
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const props: Type[] = [];
  for (const c of types) {
    const members = (c as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    const propSym = members?.get(propertyName);
    if (propSym === undefined) continue;
    const propType = (propSym as unknown as { type?: Type }).type;
    if (propType !== undefined) props.push(propType);
  }
  if (props.length === 0) return NEVER;
  if (props.length === 1) return props[0]!;
  return { flags: TypeFlags.Union, types: props } as unknown as Type;
}
