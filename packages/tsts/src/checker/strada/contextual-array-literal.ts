/**
 * Contextual typing for array literals.
 *
 * Ported from Strada `checker.go` — getContextualTypeForArrayLiteral,
 * getContextualElementType, isContextSensitiveArrayLiteral.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the contextual element type for an array-literal index.
 * If the contextual type is a tuple, returns the type at the index;
 * if it's an array, returns the element type.
 */
export function getContextualElementType(
  contextType: Type,
  index: number,
): Type | undefined {
  const elementTypes = (contextType as unknown as { elementTypes?: readonly Type[] }).elementTypes;
  if (elementTypes !== undefined) {
    if (index < elementTypes.length) return elementTypes[index];
    if ((contextType as unknown as { hasRestElement?: boolean }).hasRestElement === true) {
      return elementTypes[elementTypes.length - 1];
    }
    return undefined;
  }
  return (contextType as unknown as { elementType?: Type }).elementType;
}

/**
 * Returns true when the context-type contributes a useful element
 * type for array-literal inference.
 */
export function hasContextualElementType(contextType: Type): boolean {
  const flags = (contextType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const elementTypes = (contextType as unknown as { elementTypes?: readonly Type[] }).elementTypes;
  const elementType = (contextType as unknown as { elementType?: Type }).elementType;
  return elementTypes !== undefined || elementType !== undefined;
}

/**
 * Returns the contextual tuple-type, if the context is a tuple.
 */
export function getContextualTupleType(contextType: Type): readonly Type[] | undefined {
  return (contextType as unknown as { elementTypes?: readonly Type[] }).elementTypes;
}

/**
 * Returns true when the contextual type is a fixed-length tuple.
 */
export function isFixedLengthTupleContext(contextType: Type): boolean {
  const elementTypes = (contextType as unknown as { elementTypes?: readonly Type[] }).elementTypes;
  if (elementTypes === undefined) return false;
  return (contextType as unknown as { hasRestElement?: boolean }).hasRestElement !== true;
}

/**
 * Returns the fixed-length count of a tuple context, or undefined.
 */
export function getFixedTupleLength(contextType: Type): number | undefined {
  if (!isFixedLengthTupleContext(contextType)) return undefined;
  return (contextType as unknown as { elementTypes?: readonly Type[] }).elementTypes?.length;
}
