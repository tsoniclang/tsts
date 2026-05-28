/**
 * Declared-type cache for symbols.
 *
 * Ported from Strada `checker.go` — getDeclaredTypeOfSymbol caches.
 * Stores the "declared" type (the type a symbol introduces — class,
 * interface, type-alias, enum) keyed by symbol.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";

export interface DeclaredTypeCache {
  readonly bySymbol: ReadonlyMap<AstSymbol, Type>;
}

/**
 * Returns an empty cache.
 */
export function emptyDeclaredTypeCache(): DeclaredTypeCache {
  return { bySymbol: new Map() };
}

/**
 * Returns the declared type for a symbol, or undefined.
 */
export function getDeclaredType(
  cache: DeclaredTypeCache,
  sym: AstSymbol,
): Type | undefined {
  return cache.bySymbol.get(sym);
}

/**
 * Caches the declared type for a symbol.
 */
export function setDeclaredType(
  cache: DeclaredTypeCache,
  sym: AstSymbol,
  type: Type,
): DeclaredTypeCache {
  const next = new Map(cache.bySymbol);
  next.set(sym, type);
  return { bySymbol: next };
}

/**
 * Returns the cache size.
 */
export function declaredTypeCacheSize(cache: DeclaredTypeCache): number {
  return cache.bySymbol.size;
}

/**
 * Returns true when a symbol has a cached declared type.
 */
export function hasDeclaredType(
  cache: DeclaredTypeCache,
  sym: AstSymbol,
): boolean {
  return cache.bySymbol.has(sym);
}

/**
 * Invalidates the cached declared type for a symbol.
 */
export function invalidateDeclaredType(
  cache: DeclaredTypeCache,
  sym: AstSymbol,
): DeclaredTypeCache {
  if (!cache.bySymbol.has(sym)) return cache;
  const next = new Map(cache.bySymbol);
  next.delete(sym);
  return { bySymbol: next };
}
