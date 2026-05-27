/**
 * Indexed-access resolution `T[K]`.
 *
 * Ported from Strada `checker.go` — getIndexedAccessType,
 * resolveIndexedAccessType, getPropertyTypeForIndexType.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { getStringLiteralValue } from "./literal-types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;
const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Resolves `T[K]` where K is a literal type. Returns the property
 * type of T at the literal key.
 */
export function resolveIndexedAccess(objectType: Type, indexType: Type): Type {
  const indexFlags = (indexType as { flags?: number }).flags ?? 0;

  // Index is a union — distribute.
  if ((indexFlags & TypeFlags.Union) !== 0) {
    const types = (indexType as unknown as { types?: readonly Type[] }).types ?? [];
    const results = types.map((t) => resolveIndexedAccess(objectType, t));
    if (results.length === 0) return NEVER;
    if (results.length === 1) return results[0]!;
    return { flags: TypeFlags.Union, types: results } as unknown as Type;
  }

  // Index is a string literal — look up the property directly.
  if ((indexFlags & TypeFlags.StringLiteral) !== 0) {
    const key = getStringLiteralValue(indexType);
    if (key === undefined) return ANY;
    const members = (objectType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    if (members === undefined) return ANY;
    const propSym = members.get(key);
    if (propSym === undefined) return NEVER;
    return (propSym as unknown as { type?: Type }).type ?? ANY;
  }

  // Index is `string` / `number` — return the canonical index signature.
  if ((indexFlags & (TypeFlags.String | TypeFlags.Number)) !== 0) {
    return ANY;
  }

  // Index is a TypeParameter or anything else — return deferred.
  return {
    flags: TypeFlags.IndexedAccess,
    objectType,
    indexType,
  } as unknown as Type;
}

/**
 * Returns true when the indexed access is deferred — its index is
 * a type parameter.
 */
export function isDeferredIndexedAccess(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.IndexedAccess) !== 0;
}

/**
 * Returns the object type of a deferred IndexedAccess.
 */
export function getIndexedAccessObjectType(t: Type): Type | undefined {
  if (!isDeferredIndexedAccess(t)) return undefined;
  return (t as unknown as { objectType?: Type }).objectType;
}

/**
 * Returns the index type of a deferred IndexedAccess.
 */
export function getIndexedAccessIndexType(t: Type): Type | undefined {
  if (!isDeferredIndexedAccess(t)) return undefined;
  return (t as unknown as { indexType?: Type }).indexType;
}
