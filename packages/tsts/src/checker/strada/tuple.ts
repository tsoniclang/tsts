/**
 * Tuple-type helpers.
 *
 * Ported from Strada `checker.go` — getTupleElementType,
 * getTupleArity, isTupleType, isReadonlyTupleType.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export interface TupleType extends Type {
  readonly elementTypes: readonly Type[];
  readonly elementFlags?: readonly number[];
  readonly minLength?: number;
  readonly fixedLength?: number;
  readonly hasRestElement?: boolean;
  readonly readonly?: boolean;
  readonly target?: TupleType;
}

export const ElementFlags = {
  Required: 1 << 0,
  Optional: 1 << 1,
  Rest: 1 << 2,
  Variadic: 1 << 3,
} as const;

export type ElementFlag = number;

/**
 * Returns true when the type is a tuple — Object type with a defined
 * fixed length and an element-types vector.
 */
export function isTupleType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  return Array.isArray((t as unknown as { elementTypes?: readonly Type[] }).elementTypes);
}

/**
 * Returns the element types of a tuple. Returns an empty array when
 * `t` is not a tuple.
 */
export function getTupleElementTypes(t: Type): readonly Type[] {
  if (!isTupleType(t)) return [];
  return (t as unknown as { elementTypes?: readonly Type[] }).elementTypes ?? [];
}

/**
 * Returns the element at the given index, or undefined when out of
 * bounds. For variadic tuples, indices past the fixed prefix return
 * the rest element type.
 */
export function getTupleElementType(t: Type, index: number): Type | undefined {
  const elements = getTupleElementTypes(t);
  if (index < elements.length) return elements[index];
  if ((t as unknown as { hasRestElement?: boolean }).hasRestElement === true) {
    return elements[elements.length - 1];
  }
  return undefined;
}

/**
 * Returns the arity of a tuple (its element count).
 */
export function getTupleArity(t: Type): number {
  return getTupleElementTypes(t).length;
}

/**
 * Returns true when the tuple is marked readonly.
 */
export function isReadonlyTupleType(t: Type): boolean {
  return (t as unknown as { readonly?: boolean }).readonly === true;
}

/**
 * Returns true when the tuple has a rest element (e.g. `[number, ...string[]]`).
 */
export function hasRestElement(t: Type): boolean {
  return (t as unknown as { hasRestElement?: boolean }).hasRestElement === true;
}

/**
 * Returns the per-element flag bitmask for a tuple, telling apart
 * required / optional / rest / variadic elements.
 */
export function getTupleElementFlags(t: Type): readonly number[] {
  return (t as unknown as { elementFlags?: readonly number[] }).elementFlags ?? [];
}

/**
 * Returns true when the i-th element of a tuple is optional.
 */
export function isTupleElementOptional(t: Type, index: number): boolean {
  const flags = getTupleElementFlags(t);
  const f = flags[index];
  return f !== undefined && (f & ElementFlags.Optional) !== 0;
}

/**
 * Returns true when the i-th element of a tuple is rest/variadic.
 */
export function isTupleElementRest(t: Type, index: number): boolean {
  const flags = getTupleElementFlags(t);
  const f = flags[index];
  return f !== undefined && (f & (ElementFlags.Rest | ElementFlags.Variadic)) !== 0;
}

/**
 * Returns the minimum length of a tuple — the count of required
 * elements before the first optional/rest.
 */
export function getMinLength(t: Type): number {
  const flags = getTupleElementFlags(t);
  let min = 0;
  for (const f of flags) {
    if ((f & ElementFlags.Required) !== 0) min++;
    else break;
  }
  return min;
}
