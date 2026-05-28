/**
 * Type-identity equality checks.
 *
 * Ported from Strada `relater.go` — areTypesIdentical, deepTypeEquality,
 * isReferenceIdentical.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when two types are reference-identical.
 */
export function isReferenceIdentical(a: Type, b: Type): boolean {
  return a === b;
}

/**
 * Returns true when two literal types have the same value.
 */
export function areLiteralValuesEqual(a: Type, b: Type): boolean {
  const af = (a as { flags?: number }).flags ?? 0;
  const bf = (b as { flags?: number }).flags ?? 0;
  if ((af & TypeFlags.Literal) === 0 || (bf & TypeFlags.Literal) === 0) return false;
  const av = (a as unknown as { value?: unknown }).value;
  const bv = (b as unknown as { value?: unknown }).value;
  return av !== undefined && av === bv;
}

/**
 * Returns true when two primitive types share the same flag bit set
 * (e.g. both `string`, both `number`).
 */
export function arePrimitivesEqual(a: Type, b: Type): boolean {
  const af = (a as { flags?: number }).flags ?? 0;
  const bf = (b as { flags?: number }).flags ?? 0;
  const primMask = TypeFlags.String | TypeFlags.Number | TypeFlags.Boolean |
    TypeFlags.BigInt | TypeFlags.Null | TypeFlags.Undefined |
    TypeFlags.Void | TypeFlags.ESSymbol | TypeFlags.Any | TypeFlags.Unknown |
    TypeFlags.Never;
  return (af & primMask) === (bf & primMask) && (af & primMask) !== 0;
}

/**
 * Returns true when two types are structurally identical.
 * Conservative: only handles primitives + literals + reference identity.
 */
export function isStructurallyIdentical(a: Type, b: Type): boolean {
  if (isReferenceIdentical(a, b)) return true;
  if (areLiteralValuesEqual(a, b)) return true;
  if (arePrimitivesEqual(a, b)) return true;
  return false;
}

/**
 * Returns true when two unions have the same constituent set
 * (ignoring order).
 */
export function areUnionsEqual(a: Type, b: Type): boolean {
  const af = (a as { flags?: number }).flags ?? 0;
  const bf = (b as { flags?: number }).flags ?? 0;
  if ((af & TypeFlags.Union) === 0 || (bf & TypeFlags.Union) === 0) return false;
  const at = (a as unknown as { types?: readonly Type[] }).types ?? [];
  const bt = (b as unknown as { types?: readonly Type[] }).types ?? [];
  if (at.length !== bt.length) return false;
  const bSet = new Set(bt);
  return at.every((t) => bSet.has(t));
}

/**
 * Returns true when two intersections have the same constituent set.
 */
export function areIntersectionsEqual(a: Type, b: Type): boolean {
  const af = (a as { flags?: number }).flags ?? 0;
  const bf = (b as { flags?: number }).flags ?? 0;
  if ((af & TypeFlags.Intersection) === 0 || (bf & TypeFlags.Intersection) === 0) return false;
  const at = (a as unknown as { types?: readonly Type[] }).types ?? [];
  const bt = (b as unknown as { types?: readonly Type[] }).types ?? [];
  if (at.length !== bt.length) return false;
  const bSet = new Set(bt);
  return at.every((t) => bSet.has(t));
}

/**
 * Hash key for a type, used in the type-cache and identity tables.
 */
export function getTypeHashKey(t: Type): string {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Literal) !== 0) {
    const value = (t as unknown as { value?: unknown }).value;
    return `lit:${flags}:${String(value)}`;
  }
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return `t:${flags}:${sym?.name ?? ""}`;
}
