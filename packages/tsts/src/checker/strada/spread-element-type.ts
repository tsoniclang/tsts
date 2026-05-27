/**
 * Spread-element type computation (array/object spread).
 *
 * Ported from Strada `checker.go` — getSpreadArgumentTypeOfElement,
 * getSpreadTypeOfObjectLiteralProperty.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isArrayType, getElementTypeOfArray } from "./array-literal.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the element type for an array spread.
 */
export function getArraySpreadElementType(t: Type): Type {
  if (isArrayType(t)) {
    const elem = getElementTypeOfArray(t);
    if (elem !== undefined) return elem;
  }
  // Tuple type — return union of elements.
  const elements = (t as unknown as { elementTypes?: readonly Type[] }).elementTypes;
  if (elements !== undefined && elements.length > 0) {
    if (elements.length === 1) return elements[0]!;
    return { flags: TypeFlags.Union, types: elements } as unknown as Type;
  }
  return ANY;
}

/**
 * Returns true when the spread source is a tuple.
 */
export function isTupleSpreadSource(t: Type): boolean {
  return Array.isArray((t as unknown as { elementTypes?: readonly Type[] }).elementTypes);
}

/**
 * Returns the rest-element type of a tuple, if present.
 */
export function getTupleRestType(t: Type): Type | undefined {
  if (!isTupleSpreadSource(t)) return undefined;
  if ((t as unknown as { hasRestElement?: boolean }).hasRestElement !== true) return undefined;
  const elements = (t as unknown as { elementTypes?: readonly Type[] }).elementTypes ?? [];
  return elements[elements.length - 1];
}

/**
 * Returns the fixed (non-rest) tuple elements.
 */
export function getFixedTupleElements(t: Type): readonly Type[] {
  if (!isTupleSpreadSource(t)) return [];
  const elements = (t as unknown as { elementTypes?: readonly Type[] }).elementTypes ?? [];
  if ((t as unknown as { hasRestElement?: boolean }).hasRestElement === true) {
    return elements.slice(0, -1);
  }
  return elements;
}
