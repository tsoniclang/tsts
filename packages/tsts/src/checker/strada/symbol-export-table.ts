/**
 * Symbol export-table operations.
 *
 * Ported from Strada `checker.go` — getExportsOfSymbol,
 * collectExportsOfModule, mergeExportTables.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns the exports table of a symbol.
 */
export function getExportTable(sym: AstSymbol): Map<string, AstSymbol> | undefined {
  return (sym as unknown as { exports?: Map<string, AstSymbol> }).exports;
}

/**
 * Returns the export symbol for a name, or undefined.
 */
export function lookupExport(sym: AstSymbol, name: string): AstSymbol | undefined {
  const table = getExportTable(sym);
  return table?.get(name);
}

/**
 * Returns all exported symbol names.
 */
export function getExportNames(sym: AstSymbol): readonly string[] {
  const table = getExportTable(sym);
  return table === undefined ? [] : [...table.keys()];
}

/**
 * Returns the count of exports.
 */
export function getExportCount(sym: AstSymbol): number {
  const table = getExportTable(sym);
  return table === undefined ? 0 : table.size;
}

/**
 * Returns true when the symbol has any exports.
 */
export function hasExports(sym: AstSymbol): boolean {
  return getExportCount(sym) > 0;
}

/**
 * Returns the default-export symbol, if any.
 */
export function getDefaultExportSymbol(sym: AstSymbol): AstSymbol | undefined {
  return lookupExport(sym, "default");
}

/**
 * Returns the named exports (excluding default).
 */
export function getNamedExports(sym: AstSymbol): readonly AstSymbol[] {
  const table = getExportTable(sym);
  if (table === undefined) return [];
  const out: AstSymbol[] = [];
  for (const [name, s] of table) {
    if (name !== "default") out.push(s);
  }
  return out;
}

/**
 * Returns true when the symbol is itself an exported declaration.
 */
export function isExportedSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.ExportValue) !== 0 ||
    (flags & SymbolFlags.Alias) !== 0;
}
