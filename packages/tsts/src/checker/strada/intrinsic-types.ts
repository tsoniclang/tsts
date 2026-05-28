/**
 * Singleton intrinsic Type instances.
 *
 * Ported from Strada `checker.go` — anyType, unknownType, neverType,
 * voidType, nullType, undefinedType, booleanType, etc.
 *
 * Distinct from `intrinsics.ts` (which has the per-flag dispatch);
 * this provides the canonical singleton instances used everywhere.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export const anyTypeInstance: Type = { flags: TypeFlags.Any } as unknown as Type;
export const unknownTypeInstance: Type = { flags: TypeFlags.Unknown } as unknown as Type;
export const neverTypeInstance: Type = { flags: TypeFlags.Never } as unknown as Type;
export const voidTypeInstance: Type = { flags: TypeFlags.Void } as unknown as Type;
export const nullTypeInstance: Type = { flags: TypeFlags.Null } as unknown as Type;
export const undefinedTypeInstance: Type = { flags: TypeFlags.Undefined } as unknown as Type;
export const stringTypeInstance: Type = { flags: TypeFlags.String } as unknown as Type;
export const numberTypeInstance: Type = { flags: TypeFlags.Number } as unknown as Type;
export const booleanTypeInstance: Type = { flags: TypeFlags.Boolean } as unknown as Type;
export const bigintTypeInstance: Type = { flags: TypeFlags.BigInt } as unknown as Type;
export const esSymbolTypeInstance: Type = { flags: TypeFlags.ESSymbol } as unknown as Type;
export const uniqueESSymbolTypeInstance: Type = { flags: TypeFlags.UniqueESSymbol } as unknown as Type;

export const trueTypeInstance: Type = {
  flags: TypeFlags.BooleanLiteral, value: true,
} as unknown as Type;

export const falseTypeInstance: Type = {
  flags: TypeFlags.BooleanLiteral, value: false,
} as unknown as Type;

export const emptyStringTypeInstance: Type = {
  flags: TypeFlags.StringLiteral, value: "",
} as unknown as Type;

export const zeroTypeInstance: Type = {
  flags: TypeFlags.NumberLiteral, value: 0,
} as unknown as Type;

/**
 * Returns the canonical singleton for the given flag bit.
 */
export function getIntrinsicForFlag(flag: number): Type | undefined {
  switch (flag) {
    case TypeFlags.Any: return anyTypeInstance;
    case TypeFlags.Unknown: return unknownTypeInstance;
    case TypeFlags.Never: return neverTypeInstance;
    case TypeFlags.Void: return voidTypeInstance;
    case TypeFlags.Null: return nullTypeInstance;
    case TypeFlags.Undefined: return undefinedTypeInstance;
    case TypeFlags.String: return stringTypeInstance;
    case TypeFlags.Number: return numberTypeInstance;
    case TypeFlags.Boolean: return booleanTypeInstance;
    case TypeFlags.BigInt: return bigintTypeInstance;
    case TypeFlags.ESSymbol: return esSymbolTypeInstance;
    case TypeFlags.UniqueESSymbol: return uniqueESSymbolTypeInstance;
    default: return undefined;
  }
}

/**
 * Returns the boolean-true singleton.
 */
export function getTrueType(): Type {
  return trueTypeInstance;
}

/**
 * Returns the boolean-false singleton.
 */
export function getFalseType(): Type {
  return falseTypeInstance;
}

/**
 * Returns the boolean-literal type for a given value.
 */
export function getBooleanLiteralTypeFor(value: boolean): Type {
  return value ? trueTypeInstance : falseTypeInstance;
}
