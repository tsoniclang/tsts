/**
 * Array-literal type construction.
 *
 * Ported from Strada `checker.go` — getTypeFromArrayLiteralExpression,
 * createArrayType, getElementTypeOfArrayLiteral.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Builds an `Array<T>` reference. The symbol name "Array" is used by
 * downstream consumers for type-renderer recognition.
 */
export function createArrayType(elementType: Type): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "Array" },
    typeArguments: [elementType],
    elementType,
  } as unknown as Type;
}

/**
 * Returns true when the type is an `Array<T>` reference.
 */
export function isArrayType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym?.name === "Array";
}

/**
 * Returns the element type of an Array reference, or undefined.
 */
export function getElementTypeOfArray(t: Type): Type | undefined {
  if (!isArrayType(t)) return undefined;
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args !== undefined && args.length > 0) return args[0];
  return (t as unknown as { elementType?: Type }).elementType;
}

/**
 * Returns true when the type is `ReadonlyArray<T>`.
 */
export function isReadonlyArrayType(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym?.name === "ReadonlyArray";
}

/**
 * Returns the elements of an ArrayLiteralExpression.
 */
export function getArrayLiteralElements(node: AstNode): readonly AstNode[] {
  if (node.kind !== Kind.ArrayLiteralExpression) return [];
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements;
  return elements?.nodes ?? [];
}

/**
 * Returns true when the array literal contains spread elements.
 */
export function hasArrayLiteralSpread(node: AstNode): boolean {
  return getArrayLiteralElements(node).some((e) => e.kind === Kind.SpreadElement);
}

/**
 * Builds the canonical "common element type" union from a list of
 * element types — used for `[1, 'a', true]` → `number | string | boolean`.
 */
export function getCommonElementType(types: readonly Type[]): Type {
  if (types.length === 0) return NEVER;
  if (types.length === 1) return types[0]!;
  return { flags: TypeFlags.Union, types } as unknown as Type;
}

/**
 * Returns the inferred element type for an ArrayLiteralExpression by
 * unioning per-element types.
 */
export function inferArrayElementType(types: readonly Type[]): Type {
  return getCommonElementType(types);
}
