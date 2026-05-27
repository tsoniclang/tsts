/**
 * Symbol-iteration helpers.
 *
 * Ported from Strada `checker.go` — forEachSymbolInTable,
 * collectSymbolsMatching, mapSymbolTable.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Iterates a symbol table, calling `visit` for each (name, symbol) pair.
 * Stops if `visit` returns true.
 */
export function forEachSymbol(
  table: Map<string, AstSymbol>,
  visit: (sym: AstSymbol, name: string) => boolean,
): boolean {
  for (const [name, sym] of table) {
    if (visit(sym, name)) return true;
  }
  return false;
}

/**
 * Returns the symbols that match `predicate`.
 */
export function filterSymbols(
  table: Map<string, AstSymbol>,
  predicate: (sym: AstSymbol, name: string) => boolean,
): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  for (const [name, sym] of table) {
    if (predicate(sym, name)) out.push(sym);
  }
  return out;
}

/**
 * Returns a new table by applying `transform` to each symbol.
 */
export function mapSymbolTable(
  table: Map<string, AstSymbol>,
  transform: (sym: AstSymbol, name: string) => AstSymbol,
): Map<string, AstSymbol> {
  const out = new Map<string, AstSymbol>();
  for (const [name, sym] of table) {
    out.set(name, transform(sym, name));
  }
  return out;
}

/**
 * Returns the symbols flattened from a list of tables.
 */
export function flattenSymbolTables(
  tables: readonly Map<string, AstSymbol>[],
): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  for (const table of tables) {
    for (const sym of table.values()) out.push(sym);
  }
  return out;
}

/**
 * Returns the count of symbols across multiple tables.
 */
export function countSymbols(
  tables: readonly Map<string, AstSymbol>[],
): number {
  return tables.reduce((acc, t) => acc + t.size, 0);
}

/**
 * Returns true when any symbol in the table matches `predicate`.
 */
export function anySymbol(
  table: Map<string, AstSymbol>,
  predicate: (sym: AstSymbol, name: string) => boolean,
): boolean {
  return forEachSymbol(table, predicate);
}

/**
 * Returns true when every symbol in the table matches `predicate`.
 */
export function allSymbols(
  table: Map<string, AstSymbol>,
  predicate: (sym: AstSymbol, name: string) => boolean,
): boolean {
  for (const [name, sym] of table) {
    if (!predicate(sym, name)) return false;
  }
  return true;
}
