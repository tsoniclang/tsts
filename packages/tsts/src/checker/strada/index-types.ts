/**
 * Index info + index types.
 *
 * Ported from Strada `checker.go` — getIndexInfoOfType, IndexInfo
 * records, string/number index resolution. Used by [string] / [number]
 * indexing checks and the index-signature emit path.
 */

import type { Type } from "../types.js";

export interface IndexInfo {
  keyType: Type;
  type: Type;
  isReadonly: boolean;
  declaration?: unknown;
}

/**
 * Returns the type produced by indexing `t` with a key of the given
 * key-type. Walks the type's indexInfos array looking for an info
 * whose keyType is assignable from the requested key.
 */
export function getIndexInfoOfType(t: Type, keyType: Type): IndexInfo | undefined {
  const infos = (t as unknown as { indexInfos?: readonly IndexInfo[] }).indexInfos;
  if (infos === undefined) return undefined;
  const keyFlags = (keyType as { flags?: number }).flags ?? 0;
  for (const info of infos) {
    const infoKeyFlags = (info.keyType as { flags?: number }).flags ?? 0;
    if ((infoKeyFlags & keyFlags) !== 0) return info;
  }
  return undefined;
}

/**
 * Returns the type for [string] indexing if present.
 */
export function getStringIndexInfo(t: Type): IndexInfo | undefined {
  const infos = (t as unknown as { indexInfos?: readonly IndexInfo[] }).indexInfos;
  if (infos === undefined) return undefined;
  for (const info of infos) {
    if (((info.keyType as { flags?: number }).flags ?? 0 & (1 << 2)) !== 0) return info;
  }
  return undefined;
}

/**
 * Returns the type for [number] indexing if present.
 */
export function getNumberIndexInfo(t: Type): IndexInfo | undefined {
  const infos = (t as unknown as { indexInfos?: readonly IndexInfo[] }).indexInfos;
  if (infos === undefined) return undefined;
  for (const info of infos) {
    if (((info.keyType as { flags?: number }).flags ?? 0 & (1 << 3)) !== 0) return info;
  }
  return undefined;
}

/**
 * Returns the type for [symbol] indexing if present.
 */
export function getSymbolIndexInfo(t: Type): IndexInfo | undefined {
  const infos = (t as unknown as { indexInfos?: readonly IndexInfo[] }).indexInfos;
  if (infos === undefined) return undefined;
  for (const info of infos) {
    if (((info.keyType as { flags?: number }).flags ?? 0 & (1 << 12)) !== 0) return info;
  }
  return undefined;
}

/**
 * Returns the result type of indexing — the index info's value type
 * or undefined.
 */
export function getIndexTypeOfType(t: Type, keyType: Type): Type | undefined {
  return getIndexInfoOfType(t, keyType)?.type;
}

/**
 * Returns true when `t` has at least one index signature.
 */
export function hasIndexSignature(t: Type): boolean {
  const infos = (t as unknown as { indexInfos?: readonly IndexInfo[] }).indexInfos;
  return infos !== undefined && infos.length > 0;
}

/**
 * Computes the union of all index-value types for a type.
 */
export function getAllIndexTypes(t: Type): readonly Type[] {
  const infos = (t as unknown as { indexInfos?: readonly IndexInfo[] }).indexInfos;
  if (infos === undefined) return [];
  return infos.map((i) => i.type);
}
