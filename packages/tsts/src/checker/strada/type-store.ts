/**
 * Type-store — a single id-stable repository of every Type record
 * produced by the checker.
 *
 * Ported from Strada `checker.go` — addType, getTypeById,
 * registerType.
 */

import type { Type } from "../types.js";

export interface TypeStore {
  readonly byId: ReadonlyMap<number, Type>;
  readonly nextId: number;
}

/**
 * Returns an empty store.
 */
export function emptyTypeStore(): TypeStore {
  return { byId: new Map(), nextId: 1 };
}

/**
 * Returns the type with the given id, or undefined.
 */
export function getTypeById(store: TypeStore, id: number): Type | undefined {
  return store.byId.get(id);
}

/**
 * Adds a type to the store, assigning it a new id. Returns the new
 * store and the assigned id.
 */
export function addType(
  store: TypeStore,
  t: Type,
): { store: TypeStore; id: number } {
  const id = store.nextId;
  const next = new Map(store.byId);
  next.set(id, t);
  return { store: { byId: next, nextId: store.nextId + 1 }, id };
}

/**
 * Returns the id of a type in the store. Linear scan — used only
 * for diagnostics.
 */
export function getIdOfType(store: TypeStore, t: Type): number | undefined {
  for (const [id, candidate] of store.byId) {
    if (candidate === t) return id;
  }
  return undefined;
}

/**
 * Returns the count of types in the store.
 */
export function typeStoreSize(store: TypeStore): number {
  return store.byId.size;
}

/**
 * Returns all stored types.
 */
export function getAllTypes(store: TypeStore): readonly Type[] {
  return [...store.byId.values()];
}

/**
 * Returns true when a type id is present in the store.
 */
export function hasTypeId(store: TypeStore, id: number): boolean {
  return store.byId.has(id);
}
