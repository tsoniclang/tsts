/**
 * Type-relation entry points.
 *
 * Strada-shape wrapper around the existing `../relater.ts` module.
 * Keeps the per-family directory consistent: anything that wants to
 * test type relations imports from here rather than reaching into
 * relater.ts directly.
 */

import type { Type } from "../types.js";
import { Relater, RelationKind, type Relation, Ternary } from "../relater.js";

const sharedRelater = new Relater();

export function isTypeAssignableTo(source: Type, target: Type): boolean {
  return sharedRelater.isTypeAssignableTo(source, target);
}

export function isTypeSubtypeOf(source: Type, target: Type): boolean {
  return sharedRelater.isTypeSubtypeOf(source, target);
}

export function isTypeStrictSubtypeOf(source: Type, target: Type): boolean {
  return sharedRelater.isTypeStrictSubtypeOf(source, target);
}

export function isTypeIdenticalTo(source: Type, target: Type): boolean {
  return sharedRelater.isTypeIdenticalTo(source, target);
}

export function isTypeComparableTo(source: Type, target: Type): boolean {
  return sharedRelater.isTypeComparableTo(source, target);
}

export function isTypeRelatedTo(source: Type, target: Type, relation: Relation): boolean {
  return sharedRelater.isTypeRelatedTo(source, target, relation);
}

/**
 * Remove subtype-redundant types from a union.
 */
export function removeSubtypes(types: readonly Type[]): readonly Type[] {
  return sharedRelater.removeSubtypes(types, false);
}

export function getCommonSubtype(types: readonly Type[]): Type | undefined {
  return sharedRelater.getCommonSubtype(types);
}

export function getCommonSupertype(types: readonly Type[]): Type | undefined {
  return sharedRelater.getCommonSupertype(types);
}

export function isWeakType(t: Type): boolean {
  return sharedRelater.isWeakType(t);
}

export function isTypeDerivedFrom(source: Type, target: Type): boolean {
  return sharedRelater.isTypeDerivedFrom(source, target);
}

export { RelationKind, Ternary };
export type { Relation };
