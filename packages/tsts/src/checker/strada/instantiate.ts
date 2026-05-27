/**
 * Type instantiation.
 *
 * Ported from Strada `checker.go` — instantiates generic types by
 * substituting type-parameter bindings. Works in concert with the
 * TypeMapper module (../mapper.ts).
 */

import type { Type, TypeMapper } from "../types.js";
import { TypeFlags } from "../types.js";
import { getMappedType } from "../mapper.js";

export function instantiateType(t: Type, mapper: TypeMapper | undefined): Type {
  if (mapper === undefined) return t;
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.TypeParameter) !== 0) {
    return getMappedType(t, mapper);
  }
  if ((flags & TypeFlags.Union) !== 0) return instantiateUnionType(t, mapper);
  if ((flags & TypeFlags.Intersection) !== 0) return instantiateIntersectionType(t, mapper);
  if ((flags & TypeFlags.Object) !== 0) return instantiateObjectType(t, mapper);
  if ((flags & TypeFlags.Conditional) !== 0) return instantiateConditionalType(t, mapper);
  if ((flags & TypeFlags.IndexedAccess) !== 0) return instantiateIndexedAccessType(t, mapper);
  // Primitives are not affected by instantiation.
  return t;
}

function instantiateUnionType(t: Type, mapper: TypeMapper): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const mapped = types.map((u) => instantiateType(u, mapper));
  return { ...(t as object), types: mapped } as unknown as Type;
}

function instantiateIntersectionType(t: Type, mapper: TypeMapper): Type {
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const mapped = types.map((u) => instantiateType(u, mapper));
  return { ...(t as object), types: mapped } as unknown as Type;
}

function instantiateObjectType(t: Type, mapper: TypeMapper): Type {
  const typeArguments = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  const elementType = (t as unknown as { elementType?: Type }).elementType;
  const next: Record<string, unknown> = { ...(t as object) };
  if (typeArguments !== undefined) {
    next.typeArguments = typeArguments.map((a) => instantiateType(a, mapper));
  }
  if (elementType !== undefined) {
    next.elementType = instantiateType(elementType, mapper);
  }
  return next as unknown as Type;
}

function instantiateConditionalType(t: Type, mapper: TypeMapper): Type {
  const next: Record<string, unknown> = { ...(t as object) };
  for (const field of ["checkType", "extendsType", "trueType", "falseType"] as const) {
    const subtype = (t as unknown as Record<string, Type | undefined>)[field];
    if (subtype !== undefined) next[field] = instantiateType(subtype, mapper);
  }
  return next as unknown as Type;
}

function instantiateIndexedAccessType(t: Type, mapper: TypeMapper): Type {
  const next: Record<string, unknown> = { ...(t as object) };
  for (const field of ["objectType", "indexType"] as const) {
    const subtype = (t as unknown as Record<string, Type | undefined>)[field];
    if (subtype !== undefined) next[field] = instantiateType(subtype, mapper);
  }
  return next as unknown as Type;
}

/**
 * Bulk-instantiate an array of types.
 */
export function instantiateTypes(types: readonly Type[], mapper: TypeMapper | undefined): readonly Type[] {
  if (mapper === undefined) return types;
  return types.map((t) => instantiateType(t, mapper));
}

/**
 * Returns true when `t` contains any reference to one of `typeParameters`
 * (and would therefore be affected by an instantiation that maps them).
 * Conservative: returns true for any compound type — full impl walks
 * the type tree.
 */
export function couldContainTypeVariables(t: Type, _typeParameters: readonly Type[]): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (flags & (TypeFlags.TypeParameter | TypeFlags.Union | TypeFlags.Intersection |
    TypeFlags.Object | TypeFlags.Conditional | TypeFlags.IndexedAccess)) !== 0;
}
