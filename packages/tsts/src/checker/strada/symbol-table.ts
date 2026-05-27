/**
 * Symbol-table operations.
 *
 * Ported from Strada `checker.go` — mergeSymbolTables, mergeSymbol,
 * combineValueAndTypeSymbols, copySymbolTable.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when two symbols are mergeable — same name, and
 * their flag intersection is allowed by TS's merge rules.
 */
export function areMergeable(a: AstSymbol, b: AstSymbol): boolean {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  // Function + Function: merge (overloads).
  if ((aFlags & SymbolFlags.Function) !== 0 && (bFlags & SymbolFlags.Function) !== 0) {
    return true;
  }
  // Interface + Interface: merge.
  if ((aFlags & SymbolFlags.Interface) !== 0 && (bFlags & SymbolFlags.Interface) !== 0) {
    return true;
  }
  // Namespace + Namespace: merge.
  if ((aFlags & SymbolFlags.Namespace) !== 0 && (bFlags & SymbolFlags.Namespace) !== 0) {
    return true;
  }
  // Class + Namespace: merge.
  if ((aFlags & SymbolFlags.Class) !== 0 && (bFlags & SymbolFlags.Namespace) !== 0) {
    return true;
  }
  // Value + Type: merge (function + interface, etc.).
  if (((aFlags & SymbolFlags.Value) !== 0) !== ((bFlags & SymbolFlags.Value) !== 0)) {
    return true;
  }
  return false;
}

/**
 * Merges two symbols, returning a new symbol with combined flags and
 * declaration lists. Pure: the inputs are not modified.
 */
export function mergeSymbols(a: AstSymbol, b: AstSymbol): AstSymbol {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  const aDecls = (a as unknown as { declarations?: readonly unknown[] }).declarations ?? [];
  const bDecls = (b as unknown as { declarations?: readonly unknown[] }).declarations ?? [];
  return {
    ...(a as object),
    flags: aFlags | bFlags,
    declarations: [...aDecls, ...bDecls],
  } as unknown as AstSymbol;
}

/**
 * Merges two symbol tables. Symbols with the same name and mergeable
 * flags are combined; others coexist.
 */
export function mergeSymbolTables(
  a: Map<string, AstSymbol>,
  b: Map<string, AstSymbol>,
): Map<string, AstSymbol> {
  const out = new Map(a);
  for (const [name, sym] of b) {
    const existing = out.get(name);
    if (existing !== undefined && areMergeable(existing, sym)) {
      out.set(name, mergeSymbols(existing, sym));
    } else {
      out.set(name, sym);
    }
  }
  return out;
}

/**
 * Returns a copy of a symbol table.
 */
export function copySymbolTable(table: Map<string, AstSymbol>): Map<string, AstSymbol> {
  return new Map(table);
}

/**
 * Adds a symbol to a table, returning the new (immutable-style) map.
 */
export function addToSymbolTable(
  table: Map<string, AstSymbol>,
  name: string,
  sym: AstSymbol,
): Map<string, AstSymbol> {
  const out = new Map(table);
  const existing = out.get(name);
  if (existing !== undefined && areMergeable(existing, sym)) {
    out.set(name, mergeSymbols(existing, sym));
  } else {
    out.set(name, sym);
  }
  return out;
}

/**
 * Returns the names in the table sorted alphabetically — used for
 * deterministic emit / diagnostics ordering.
 */
export function sortedSymbolNames(table: Map<string, AstSymbol>): readonly string[] {
  return [...table.keys()].sort();
}
