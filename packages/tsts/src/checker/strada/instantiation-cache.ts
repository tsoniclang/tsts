/**
 * Generic-instantiation cache.
 *
 * Ported from Strada `checker.go` — getOrCreateTypeFromTypeReference,
 * the type-instantiation cache used to deduplicate canonical
 * instances of `Array<number>` etc.
 */

import type { Type } from "../types.js";

/**
 * Returns a stable cache key for a type-reference instantiation.
 * Uses the symbol's id and a comma-joined list of type-argument ids.
 */
export function getInstantiationCacheKey(
  symbolId: number,
  typeArgumentIds: readonly number[],
): string {
  if (typeArgumentIds.length === 0) return `${symbolId}`;
  return `${symbolId}:${typeArgumentIds.join(",")}`;
}

/**
 * In-memory cache of canonical instantiations. Keys are cache-key
 * strings; values are the canonical Type.
 */
export interface InstantiationCache {
  readonly entries: ReadonlyMap<string, Type>;
}

export function emptyInstantiationCache(): InstantiationCache {
  return { entries: new Map() };
}

/**
 * Returns the cached instantiation for a key, or undefined.
 */
export function getCachedInstantiation(
  cache: InstantiationCache,
  key: string,
): Type | undefined {
  return cache.entries.get(key);
}

/**
 * Returns a new cache with the entry set. Pure: the input cache is
 * not mutated.
 */
export function setCachedInstantiation(
  cache: InstantiationCache,
  key: string,
  type: Type,
): InstantiationCache {
  const next = new Map(cache.entries);
  next.set(key, type);
  return { entries: next };
}

/**
 * Returns the cache size (number of cached instantiations).
 */
export function cacheSize(cache: InstantiationCache): number {
  return cache.entries.size;
}

/**
 * Returns true when the cache contains an entry for the key.
 */
export function isCached(cache: InstantiationCache, key: string): boolean {
  return cache.entries.has(key);
}

/**
 * Returns a new cache with the entry removed, if it existed.
 */
export function deleteFromCache(
  cache: InstantiationCache,
  key: string,
): InstantiationCache {
  if (!cache.entries.has(key)) return cache;
  const next = new Map(cache.entries);
  next.delete(key);
  return { entries: next };
}
