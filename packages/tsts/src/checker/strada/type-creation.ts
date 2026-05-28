/**
 * Type-creation helpers — construct typed Type records.
 *
 * Ported from Strada `checker.go` — createType (variants for each
 * flag), createGenericType.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Creates a generic Type record with the given flags.
 */
export function createTypeWithFlags(flags: number): Type {
  return { flags } as unknown as Type;
}

/**
 * Creates a Type tagged with both flags and a symbol.
 */
export function createTypeWithSymbol(flags: number, symbol: AstSymbol): Type {
  return { flags, symbol } as unknown as Type;
}

/**
 * Creates a union type from a list of constituents.
 */
export function createUnionType(types: readonly Type[]): Type {
  if (types.length === 0) return { flags: TypeFlags.Never } as unknown as Type;
  if (types.length === 1) return types[0]!;
  return { flags: TypeFlags.Union, types } as unknown as Type;
}

/**
 * Creates an intersection type.
 */
export function createIntersectionType(types: readonly Type[]): Type {
  if (types.length === 0) return { flags: TypeFlags.Unknown } as unknown as Type;
  if (types.length === 1) return types[0]!;
  return { flags: TypeFlags.Intersection, types } as unknown as Type;
}

/**
 * Creates an indexed-access type `T[K]`.
 */
export function createIndexedAccessType(objectType: Type, indexType: Type): Type {
  return {
    flags: TypeFlags.IndexedAccess,
    objectType,
    indexType,
  } as unknown as Type;
}

/**
 * Creates an index type `keyof T`.
 */
export function createIndexType(type: Type): Type {
  return { flags: TypeFlags.Index, type } as unknown as Type;
}

/**
 * Creates a conditional type `C extends E ? T : F`.
 */
export function createConditionalType(
  checkType: Type,
  extendsType: Type,
  trueType: Type,
  falseType: Type,
): Type {
  return {
    flags: TypeFlags.Conditional,
    checkType,
    extendsType,
    trueType,
    falseType,
  } as unknown as Type;
}

/**
 * Creates a TypeParameter type for a given symbol.
 */
export function createTypeParameter(symbol: AstSymbol): Type {
  return {
    flags: TypeFlags.TypeParameter,
    symbol,
  } as unknown as Type;
}

/**
 * Creates a literal type with a string value.
 */
export function createStringLiteralType(value: string): Type {
  return { flags: TypeFlags.StringLiteral, value } as unknown as Type;
}

/**
 * Creates a literal type with a number value.
 */
export function createNumberLiteralType(value: number): Type {
  return { flags: TypeFlags.NumberLiteral, value } as unknown as Type;
}

/**
 * Creates a literal type with a boolean value.
 */
export function createBooleanLiteralType(value: boolean): Type {
  return { flags: TypeFlags.BooleanLiteral, value } as unknown as Type;
}

/**
 * Creates a literal type with a bigint value (stored as string).
 */
export function createBigIntLiteralType(value: string): Type {
  return { flags: TypeFlags.BigIntLiteral, value } as unknown as Type;
}
