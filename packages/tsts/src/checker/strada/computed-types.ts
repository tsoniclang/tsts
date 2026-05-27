/**
 * Computed-type helpers (built-in utility types: Partial, Pick,
 * Omit, Required, Readonly).
 *
 * Ported from Strada `checker.go` — getPartialType, getPickType,
 * getOmitType, etc. These wrap mapped-type construction over a
 * source object type.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns `Partial<T>` — all properties become optional.
 */
export function partialOf(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return ANY;
  const sym = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol;
  if (sym?.members === undefined) return ANY;
  // Conservative: clone members with isOptional=true.
  const newMembers = new Map<string, AstSymbol>();
  for (const [name, member] of sym.members) {
    newMembers.set(name, { ...(member as object), isOptional: true } as unknown as AstSymbol);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__partial", members: newMembers },
  } as unknown as Type;
}

/**
 * Returns `Required<T>` — all properties become required.
 */
export function requiredOf(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return ANY;
  const sym = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol;
  if (sym?.members === undefined) return ANY;
  const newMembers = new Map<string, AstSymbol>();
  for (const [name, member] of sym.members) {
    newMembers.set(name, { ...(member as object), isOptional: false } as unknown as AstSymbol);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__required", members: newMembers },
  } as unknown as Type;
}

/**
 * Returns `Readonly<T>` — all properties become readonly.
 */
export function readonlyOf(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return ANY;
  const sym = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol;
  if (sym?.members === undefined) return ANY;
  const newMembers = new Map<string, AstSymbol>();
  for (const [name, member] of sym.members) {
    newMembers.set(name, { ...(member as object), isReadonly: true } as unknown as AstSymbol);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__readonly", members: newMembers },
  } as unknown as Type;
}

/**
 * Returns `Pick<T, K>` — keeps only the properties listed in K.
 */
export function pickOf(t: Type, keys: readonly string[]): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return ANY;
  const sym = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol;
  if (sym?.members === undefined) return ANY;
  const newMembers = new Map<string, AstSymbol>();
  for (const key of keys) {
    const member = sym.members.get(key);
    if (member !== undefined) newMembers.set(key, member);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__pick", members: newMembers },
  } as unknown as Type;
}

/**
 * Returns `Omit<T, K>` — removes the properties listed in K.
 */
export function omitOf(t: Type, keys: readonly string[]): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return ANY;
  const sym = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol;
  if (sym?.members === undefined) return ANY;
  const exclude = new Set(keys);
  const newMembers = new Map<string, AstSymbol>();
  for (const [name, member] of sym.members) {
    if (!exclude.has(name)) newMembers.set(name, member);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__omit", members: newMembers },
  } as unknown as Type;
}

/**
 * Returns `NonNullable<T>` — strips null and undefined from T.
 */
export function nonNullableOf(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    if ((flags & (TypeFlags.Null | TypeFlags.Undefined)) !== 0) {
      return { flags: TypeFlags.Never } as unknown as Type;
    }
    return t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => {
    const cf = (c as { flags?: number }).flags ?? 0;
    return (cf & (TypeFlags.Null | TypeFlags.Undefined)) === 0;
  });
  if (remaining.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}
