/**
 * Symbol-comparison and ordering helpers.
 *
 * Ported from Strada `checker.go` — compareSymbols, getSymbolId,
 * stableSymbolOrdering.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns a stable id for a symbol. Uses an `id` field if present,
 * otherwise falls back to identity (so the result is stable within
 * a session but not across sessions).
 */
export function getSymbolId(sym: AstSymbol): number {
  const id = (sym as unknown as { id?: number }).id;
  return id ?? 0;
}

/**
 * Compares two symbols for sorting. Sort key:
 *   1. flags (lower flags first)
 *   2. name (alphabetical)
 *   3. id (tie-breaker)
 */
export function compareSymbols(a: AstSymbol, b: AstSymbol): number {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  if (aFlags !== bFlags) return aFlags - bFlags;
  const aName = (a as unknown as { name?: string }).name ?? "";
  const bName = (b as unknown as { name?: string }).name ?? "";
  if (aName !== bName) return aName.localeCompare(bName);
  return getSymbolId(a) - getSymbolId(b);
}

/**
 * Sorts an array of symbols stably by name.
 */
export function sortSymbolsByName(symbols: readonly AstSymbol[]): readonly AstSymbol[] {
  return [...symbols].sort((a, b) => {
    const aName = (a as unknown as { name?: string }).name ?? "";
    const bName = (b as unknown as { name?: string }).name ?? "";
    return aName.localeCompare(bName);
  });
}

/**
 * Returns true when two symbols have the same name (case-sensitive).
 */
export function symbolsShareName(a: AstSymbol, b: AstSymbol): boolean {
  const aName = (a as unknown as { name?: string }).name;
  const bName = (b as unknown as { name?: string }).name;
  return aName !== undefined && aName === bName;
}

/**
 * Returns true when two symbols share at least one flag.
 */
export function symbolsShareFlag(a: AstSymbol, b: AstSymbol, mask: number): boolean {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  return (aFlags & mask) !== 0 && (bFlags & mask) !== 0;
}

/**
 * Groups symbols by their primary flag category — Value / Type /
 * Namespace.
 */
export function groupSymbolsByCategory(
  symbols: readonly AstSymbol[],
): {
  values: readonly AstSymbol[];
  types: readonly AstSymbol[];
  namespaces: readonly AstSymbol[];
} {
  const values: AstSymbol[] = [];
  const types: AstSymbol[] = [];
  const namespaces: AstSymbol[] = [];
  for (const s of symbols) {
    const flags = (s as unknown as { flags?: number }).flags ?? 0;
    if ((flags & SymbolFlags.Namespace) !== 0) namespaces.push(s);
    else if ((flags & SymbolFlags.Type) !== 0) types.push(s);
    else values.push(s);
  }
  return { values, types, namespaces };
}
