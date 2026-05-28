/**
 * Per-symbol link cache.
 *
 * Ported from Strada `checker.go` — getSymbolLinks, getSymbolLinkValue.
 * Strada stores derived per-symbol information (type, target, etc.)
 * in a side-cache. This module mirrors that pattern with a pure-API
 * Map.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";

export interface SymbolLinks {
  readonly type?: Type | undefined;
  readonly target?: AstSymbol | undefined;
  readonly resolvedJSDocType?: Type | undefined;
  readonly mapper?: unknown | undefined;
  readonly isExportStarMember?: boolean | undefined;
  readonly bindingElement?: AstSymbol | undefined;
  readonly nameType?: Type | undefined;
  readonly uniqueESSymbolType?: Type | undefined;
}

export interface SymbolLinkCache {
  readonly links: ReadonlyMap<AstSymbol, SymbolLinks>;
}

/**
 * Returns an empty cache.
 */
export function emptySymbolLinkCache(): SymbolLinkCache {
  return { links: new Map() };
}

/**
 * Returns the links record for a symbol, or undefined.
 */
export function getSymbolLinks(
  cache: SymbolLinkCache,
  sym: AstSymbol,
): SymbolLinks | undefined {
  return cache.links.get(sym);
}

/**
 * Returns the links record for a symbol, creating an empty record
 * if absent.
 */
export function getOrCreateSymbolLinks(
  cache: SymbolLinkCache,
  sym: AstSymbol,
): { cache: SymbolLinkCache; links: SymbolLinks } {
  const existing = cache.links.get(sym);
  if (existing !== undefined) return { cache, links: existing };
  const created: SymbolLinks = {};
  const next = new Map(cache.links);
  next.set(sym, created);
  return { cache: { links: next }, links: created };
}

/**
 * Updates the links record for a symbol — returns a new cache.
 */
export function setSymbolLinks(
  cache: SymbolLinkCache,
  sym: AstSymbol,
  links: SymbolLinks,
): SymbolLinkCache {
  const next = new Map(cache.links);
  next.set(sym, links);
  return { links: next };
}

/**
 * Returns the cached type of a symbol, or undefined.
 */
export function getCachedSymbolType(
  cache: SymbolLinkCache,
  sym: AstSymbol,
): Type | undefined {
  return cache.links.get(sym)?.type;
}

/**
 * Returns the cache size.
 */
export function symbolLinkCacheSize(cache: SymbolLinkCache): number {
  return cache.links.size;
}

/**
 * Returns true when a symbol has cached links.
 */
export function hasSymbolLinks(
  cache: SymbolLinkCache,
  sym: AstSymbol,
): boolean {
  return cache.links.has(sym);
}
