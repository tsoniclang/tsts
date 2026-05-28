/**
 * Type-relation cache.
 *
 * Ported from Strada `relater.go` — getRelationCache, isRelationCached,
 * storeRelation. Caches the result of an assignability / subtype
 * relation check between two types.
 */

import type { Type } from "../types.js";
import type { RelationKind } from "./relation-result.js";

export interface RelationCacheKey {
  readonly sourceId: number;
  readonly targetId: number;
  readonly kind: RelationKind;
}

export interface RelationCache {
  readonly entries: ReadonlyMap<string, boolean>;
}

/**
 * Returns an empty cache.
 */
export function emptyRelationCache(): RelationCache {
  return { entries: new Map() };
}

/**
 * Returns the cache-key string for a (source, target, kind) triplet.
 */
export function getRelationKey(
  source: Type,
  target: Type,
  kind: RelationKind,
): string {
  const sId = (source as unknown as { id?: number }).id ?? 0;
  const tId = (target as unknown as { id?: number }).id ?? 0;
  return `${sId}:${tId}:${kind}`;
}

/**
 * Returns the cached result for a relation, or undefined.
 */
export function getCachedRelation(
  cache: RelationCache,
  source: Type,
  target: Type,
  kind: RelationKind,
): boolean | undefined {
  const key = getRelationKey(source, target, kind);
  return cache.entries.get(key);
}

/**
 * Stores a relation result in the cache.
 */
export function cacheRelation(
  cache: RelationCache,
  source: Type,
  target: Type,
  kind: RelationKind,
  result: boolean,
): RelationCache {
  const key = getRelationKey(source, target, kind);
  const next = new Map(cache.entries);
  next.set(key, result);
  return { entries: next };
}

/**
 * Returns true when the cache has an entry for the relation.
 */
export function hasCachedRelation(
  cache: RelationCache,
  source: Type,
  target: Type,
  kind: RelationKind,
): boolean {
  return cache.entries.has(getRelationKey(source, target, kind));
}

/**
 * Returns the cache size.
 */
export function relationCacheSize(cache: RelationCache): number {
  return cache.entries.size;
}

/**
 * Returns a new cache with all entries for a given source removed
 * — used to invalidate when the source's structure changes.
 */
export function invalidateSourceRelations(
  cache: RelationCache,
  source: Type,
): RelationCache {
  const sId = (source as unknown as { id?: number }).id ?? 0;
  const sourcePrefix = `${sId}:`;
  const next = new Map<string, boolean>();
  for (const [key, value] of cache.entries) {
    if (!key.startsWith(sourcePrefix)) next.set(key, value);
  }
  return { entries: next };
}
