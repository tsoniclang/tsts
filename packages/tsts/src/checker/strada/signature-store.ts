/**
 * Signature-store — id-keyed canonical Signature repository.
 *
 * Ported from Strada `checker.go` — addSignature, getSignatureById,
 * cloneSignatureInStore.
 */

import type { Signature } from "../types.js";

export interface SignatureStore {
  readonly byId: ReadonlyMap<number, Signature>;
  readonly nextId: number;
}

/**
 * Returns an empty store.
 */
export function emptySignatureStore(): SignatureStore {
  return { byId: new Map(), nextId: 1 };
}

/**
 * Adds a signature to the store, assigning it an id.
 */
export function addSignature(
  store: SignatureStore,
  sig: Signature,
): { store: SignatureStore; id: number } {
  const id = store.nextId;
  const next = new Map(store.byId);
  next.set(id, sig);
  return { store: { byId: next, nextId: store.nextId + 1 }, id };
}

/**
 * Returns the signature with the given id.
 */
export function getSignatureById(
  store: SignatureStore,
  id: number,
): Signature | undefined {
  return store.byId.get(id);
}

/**
 * Returns the count of signatures in the store.
 */
export function signatureStoreSize(store: SignatureStore): number {
  return store.byId.size;
}

/**
 * Returns all signatures.
 */
export function getAllSignatures(store: SignatureStore): readonly Signature[] {
  return [...store.byId.values()];
}

/**
 * Returns true when an id is present.
 */
export function hasSignatureId(store: SignatureStore, id: number): boolean {
  return store.byId.has(id);
}
