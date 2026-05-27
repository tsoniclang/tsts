/**
 * Spread argument / element resolution.
 *
 * Ported from Strada `checker.go` — getSpreadType, getSpreadArgumentType.
 * Spread elements unpack array-like types into a parent list.
 */

import type { Type } from "../types.js";

/**
 * Returns the element type for an array/tuple spread, or the type
 * itself when it's not array-shaped. Conservative: returns the
 * .elementType field when present.
 */
export function getSpreadElementType(t: Type): Type {
  const elementType = (t as unknown as { elementType?: Type }).elementType;
  return elementType ?? t;
}

/**
 * Returns the merged type for an object spread (T1 & T2 & …). Used
 * for `{ ...a, ...b, c }` literal type computation.
 */
export function getSpreadType(left: Type, right: Type): Type {
  // Conservative merge: produce an intersection of the two types.
  const leftFlags = (left as { flags?: number }).flags ?? 0;
  const rightFlags = (right as { flags?: number }).flags ?? 0;
  // If either side is Any/Unknown, the spread is also Any/Unknown.
  if ((leftFlags & ((1 << 0) | (1 << 1))) !== 0) return left;
  if ((rightFlags & ((1 << 0) | (1 << 1))) !== 0) return right;
  return {
    flags: 1 << 21, // Intersection
    types: [left, right],
  } as unknown as Type;
}

/**
 * Walks a list of types performing successive spread merges.
 */
export function spreadAll(types: readonly Type[]): Type {
  if (types.length === 0) return { flags: 1 << 19 } as unknown as Type;
  let result = types[0]!;
  for (let i = 1; i < types.length; i++) {
    result = getSpreadType(result, types[i]!);
  }
  return result;
}

/**
 * Returns true when the type can be spread into another object or
 * array literal — i.e. when it has a known shape or iterable form.
 */
export function isSpreadable(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  // Any/Unknown/Object/Intersection/Union are all spreadable.
  return (flags & ((1 << 0) | (1 << 1) | (1 << 19) | (1 << 20) | (1 << 21))) !== 0;
}
