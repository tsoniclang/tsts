/**
 * IndexInfo — index-signature record on an object type.
 *
 * Ported from Strada `checker.go` — IndexInfo struct, getIndexInfoOfType,
 * mergeIndexInfos.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export interface IndexInfo {
  readonly keyType: Type;
  readonly valueType: Type;
  readonly isReadonly: boolean;
}

const STRING: Type = { flags: TypeFlags.String } as unknown as Type;
const NUMBER: Type = { flags: TypeFlags.Number } as unknown as Type;
const ESSYMBOL: Type = { flags: TypeFlags.ESSymbol } as unknown as Type;

/**
 * Creates an IndexInfo with the given key and value types.
 */
export function createIndexInfo(
  keyType: Type,
  valueType: Type,
  isReadonly = false,
): IndexInfo {
  return { keyType, valueType, isReadonly };
}

/**
 * Creates the canonical `[s: string]: V` info.
 */
export function createStringIndexInfo(valueType: Type, isReadonly = false): IndexInfo {
  return createIndexInfo(STRING, valueType, isReadonly);
}

/**
 * Creates the canonical `[n: number]: V` info.
 */
export function createNumberIndexInfo(valueType: Type, isReadonly = false): IndexInfo {
  return createIndexInfo(NUMBER, valueType, isReadonly);
}

/**
 * Creates the canonical `[s: symbol]: V` info.
 */
export function createSymbolIndexInfo(valueType: Type, isReadonly = false): IndexInfo {
  return createIndexInfo(ESSYMBOL, valueType, isReadonly);
}

/**
 * Returns true when the IndexInfo's key is `string`.
 */
export function isStringIndexInfo(info: IndexInfo): boolean {
  const flags = (info.keyType as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.String) !== 0;
}

/**
 * Returns true when the IndexInfo's key is `number`.
 */
export function isNumberIndexInfo(info: IndexInfo): boolean {
  const flags = (info.keyType as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.Number) !== 0;
}

/**
 * Returns true when the IndexInfo's key is `symbol`.
 */
export function isSymbolIndexInfo(info: IndexInfo): boolean {
  const flags = (info.keyType as { flags?: number }).flags ?? 0;
  return (flags & TypeFlags.ESSymbol) !== 0;
}

/**
 * Merges two IndexInfos — their value-types intersect, readonly is OR.
 */
export function mergeIndexInfos(a: IndexInfo, b: IndexInfo): IndexInfo {
  return {
    keyType: a.keyType,
    valueType: { flags: TypeFlags.Intersection, types: [a.valueType, b.valueType] } as unknown as Type,
    isReadonly: a.isReadonly || b.isReadonly,
  };
}

/**
 * Returns the value-type of the matching index info from a list.
 */
export function findValueTypeForKey(
  infos: readonly IndexInfo[],
  keyType: Type,
): Type | undefined {
  const kf = (keyType as { flags?: number }).flags ?? 0;
  for (const info of infos) {
    const ikf = (info.keyType as { flags?: number }).flags ?? 0;
    if ((ikf & kf) !== 0) return info.valueType;
  }
  return undefined;
}
