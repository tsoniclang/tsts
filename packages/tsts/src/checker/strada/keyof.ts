/**
 * `keyof` + Index types.
 *
 * Ported from Strada `checker.go` — getIndexType (keyof T),
 * getLiteralTypeFromPropertyName, IndexType construction.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const STRING: Type = { flags: TypeFlags.String } as unknown as Type;
const NUMBER: Type = { flags: TypeFlags.Number } as unknown as Type;
const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns the index type (keyof T) for a given type. For object
 * types this is a union of the literal types of each property name.
 */
export function getIndexType(t: Type): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Any) !== 0) return { flags: TypeFlags.Union, types: [STRING, NUMBER] } as unknown as Type;
  if ((flags & TypeFlags.Never) !== 0) return NEVER;
  if ((flags & TypeFlags.TypeParameter) !== 0) {
    return { flags: TypeFlags.Index, type: t } as unknown as Type;
  }
  if ((flags & TypeFlags.Object) !== 0) {
    const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    if (members === undefined) return NEVER;
    const names: Type[] = [];
    for (const [name] of members) {
      names.push({ flags: TypeFlags.StringLiteral, value: name } as unknown as Type);
    }
    if (names.length === 0) return NEVER;
    if (names.length === 1) return names[0]!;
    return { flags: TypeFlags.Union, types: names } as unknown as Type;
  }
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const indexes = types.map(getIndexType);
    return { flags: TypeFlags.Intersection, types: indexes } as unknown as Type;
  }
  if ((flags & TypeFlags.Intersection) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    const indexes = types.map(getIndexType);
    return { flags: TypeFlags.Union, types: indexes } as unknown as Type;
  }
  return NEVER;
}

/**
 * Converts a property name to its corresponding literal type.
 * `"foo"` → `"foo"` literal; `42` → `42` literal.
 */
export function getLiteralTypeFromPropertyName(name: string): Type {
  return { flags: TypeFlags.StringLiteral, value: name } as unknown as Type;
}

/**
 * Returns true when `t` is an Index type (`keyof X`).
 */
export function isIndexType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Index) !== 0;
}

/**
 * Walks an Index type to its operand. Returns undefined if `t` isn't
 * an Index type.
 */
export function getIndexTypeOperand(t: Type): Type | undefined {
  if (!isIndexType(t)) return undefined;
  return (t as unknown as { type?: Type }).type;
}

/**
 * Returns the canonical string-literal-union for a fixed-name set,
 * useful for the type renderer.
 */
export function createStringLiteralUnion(names: readonly string[]): Type {
  if (names.length === 0) return NEVER;
  const types: Type[] = names.map((n) => ({
    flags: TypeFlags.StringLiteral, value: n,
  } as unknown as Type));
  if (types.length === 1) return types[0]!;
  return { flags: TypeFlags.Union, types } as unknown as Type;
}
