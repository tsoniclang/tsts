/**
 * Type-name → Symbol cache for fast lookup.
 *
 * Ported from Strada `checker.go` — getGlobalTypeSymbol,
 * resolveGlobalTypeName.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";

export interface TypeNameCache {
  readonly byName: ReadonlyMap<string, AstSymbol>;
}

/**
 * Returns an empty cache.
 */
export function emptyTypeNameCache(): TypeNameCache {
  return { byName: new Map() };
}

/**
 * Returns the symbol cached for a name, or undefined.
 */
export function getCachedTypeSymbol(
  cache: TypeNameCache,
  name: string,
): AstSymbol | undefined {
  return cache.byName.get(name);
}

/**
 * Stores a symbol under a name — returns a new cache.
 */
export function cacheTypeSymbol(
  cache: TypeNameCache,
  name: string,
  sym: AstSymbol,
): TypeNameCache {
  const next = new Map(cache.byName);
  next.set(name, sym);
  return { byName: next };
}

/**
 * Returns true when a name is cached.
 */
export function hasCachedTypeName(cache: TypeNameCache, name: string): boolean {
  return cache.byName.has(name);
}

/**
 * Returns the cache size.
 */
export function typeNameCacheSize(cache: TypeNameCache): number {
  return cache.byName.size;
}

/**
 * Returns all cached names.
 */
export function getAllCachedTypeNames(cache: TypeNameCache): readonly string[] {
  return [...cache.byName.keys()];
}

/**
 * Returns a new cache with the named entry removed.
 */
export function invalidateTypeName(
  cache: TypeNameCache,
  name: string,
): TypeNameCache {
  if (!cache.byName.has(name)) return cache;
  const next = new Map(cache.byName);
  next.delete(name);
  return { byName: next };
}
