/**
 * Array-mutability (`readonly T[]` vs `T[]`) helpers.
 *
 * Ported from Strada `checker.go` — getReadonlyArrayType,
 * createReadonlyArrayType, isReadonlyArrayDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the type-node is `readonly T[]` or `ReadonlyArray<T>`.
 */
export function isReadonlyArrayNode(node: AstNode): boolean {
  if (node.kind === Kind.TypeOperator) {
    const op = (node as unknown as { operator?: number }).operator;
    return op === Kind.ReadonlyKeyword;
  }
  if (node.kind === Kind.TypeReference) {
    const name = (node as unknown as { typeName?: AstNode }).typeName;
    if (name === undefined || name.kind !== Kind.Identifier) return false;
    return (name as unknown as { escapedText?: string }).escapedText === "ReadonlyArray";
  }
  return false;
}

/**
 * Returns true when the type is `ReadonlyArray<T>`.
 */
export function isReadonlyArrayType(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym?.name === "ReadonlyArray";
}

/**
 * Returns the element type of a ReadonlyArray.
 */
export function getReadonlyElementType(t: Type): Type | undefined {
  if (!isReadonlyArrayType(t)) return undefined;
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  return args?.[0];
}

/**
 * Builds a `ReadonlyArray<T>` reference.
 */
export function createReadonlyArrayType(elementType: Type): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "ReadonlyArray" },
    typeArguments: [elementType],
    elementType,
    readonly: true,
  } as unknown as Type;
}

/**
 * Returns true when the array can be mutated through this view.
 * `T[]` → mutable; `readonly T[]` → immutable.
 */
export function isMutableArray(t: Type): boolean {
  if (isReadonlyArrayType(t)) return false;
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym?.name === "Array";
}

/**
 * Returns the mutable counterpart of `ReadonlyArray<T>` (`Array<T>`).
 */
export function toMutableArrayType(t: Type): Type {
  if (!isReadonlyArrayType(t)) return t;
  const elementType = getReadonlyElementType(t);
  if (elementType === undefined) return t;
  return {
    flags: TypeFlags.Object,
    symbol: { name: "Array" },
    typeArguments: [elementType],
    elementType,
  } as unknown as Type;
}
