/**
 * Intrinsic singleton types.
 *
 * Ported from Strada `checker.go` — the intrinsic-type registry that
 * the checker uses for primitives. Returning singletons means
 * identity comparisons (`source === target`) work for common cases.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export const anyType: Type = { flags: TypeFlags.Any, intrinsicName: "any" } as unknown as Type;
export const unknownType: Type = { flags: TypeFlags.Unknown, intrinsicName: "unknown" } as unknown as Type;
export const errorType: Type = { flags: TypeFlags.Any, intrinsicName: "error" } as unknown as Type;
export const undefinedType: Type = { flags: TypeFlags.Undefined, intrinsicName: "undefined" } as unknown as Type;
export const nullType: Type = { flags: TypeFlags.Null, intrinsicName: "null" } as unknown as Type;
export const stringType: Type = { flags: TypeFlags.String, intrinsicName: "string" } as unknown as Type;
export const numberType: Type = { flags: TypeFlags.Number, intrinsicName: "number" } as unknown as Type;
export const booleanType: Type = { flags: TypeFlags.Boolean, intrinsicName: "boolean" } as unknown as Type;
export const bigintType: Type = { flags: TypeFlags.BigInt, intrinsicName: "bigint" } as unknown as Type;
export const esSymbolType: Type = { flags: TypeFlags.ESSymbol, intrinsicName: "symbol" } as unknown as Type;
export const voidType: Type = { flags: TypeFlags.Void, intrinsicName: "void" } as unknown as Type;
export const neverType: Type = { flags: TypeFlags.Never, intrinsicName: "never" } as unknown as Type;
export const nonPrimitiveType: Type = { flags: TypeFlags.NonPrimitive, intrinsicName: "object" } as unknown as Type;

export const trueType: Type = { flags: TypeFlags.BooleanLiteral, intrinsicName: "true" } as unknown as Type;
export const falseType: Type = { flags: TypeFlags.BooleanLiteral, intrinsicName: "false" } as unknown as Type;

export const emptyArrayLiteralType: Type = { flags: TypeFlags.Object } as unknown as Type;
export const emptyObjectType: Type = { flags: TypeFlags.Object } as unknown as Type;

/**
 * Look up the canonical intrinsic singleton for a given primitive
 * TypeFlags bit. Returns undefined for non-primitive flags.
 */
export function getIntrinsicForFlags(flags: number): Type | undefined {
  if ((flags & TypeFlags.Any) !== 0) return anyType;
  if ((flags & TypeFlags.Unknown) !== 0) return unknownType;
  if ((flags & TypeFlags.String) !== 0) return stringType;
  if ((flags & TypeFlags.Number) !== 0) return numberType;
  if ((flags & TypeFlags.Boolean) !== 0) return booleanType;
  if ((flags & TypeFlags.BigInt) !== 0) return bigintType;
  if ((flags & TypeFlags.ESSymbol) !== 0) return esSymbolType;
  if ((flags & TypeFlags.Void) !== 0) return voidType;
  if ((flags & TypeFlags.Undefined) !== 0) return undefinedType;
  if ((flags & TypeFlags.Null) !== 0) return nullType;
  if ((flags & TypeFlags.Never) !== 0) return neverType;
  if ((flags & TypeFlags.NonPrimitive) !== 0) return nonPrimitiveType;
  return undefined;
}
