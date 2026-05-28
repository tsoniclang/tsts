/**
 * Symbol-export helper functions.
 *
 * Ported from Strada `checker.go` — getExportSymbolOfValueSymbolIfExported,
 * getMergedSymbol, resolveExternalModuleSymbol.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the symbol has the ExportValue flag.
 */
export function isExportValueSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.ExportValue) !== 0;
}

/**
 * Returns the export-symbol counterpart of a value symbol when it
 * has been exported (e.g. via `export { x }`).
 */
export function getExportSymbol(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { exportSymbol?: AstSymbol }).exportSymbol;
}

/**
 * Returns the symbol that an export-specifier points at.
 */
export function getTargetOfExportSpecifier(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { exportSpecifierTarget?: AstSymbol }).exportSpecifierTarget;
}

/**
 * Returns true when the symbol is a default export.
 */
export function isDefaultExport(sym: AstSymbol): boolean {
  const name = (sym as unknown as { name?: string }).name;
  return name === "default";
}

/**
 * Returns the source-module symbol of an export.
 */
export function getSourceModuleOfExport(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { sourceModule?: AstSymbol }).sourceModule;
}

/**
 * Returns true when the symbol is "re-exported" (came from an
 * `export ... from "x"` declaration).
 */
export function isReexportedSymbol(sym: AstSymbol): boolean {
  return getSourceModuleOfExport(sym) !== undefined;
}

/**
 * Returns the merged symbol when the symbol is part of a multi-
 * declaration merge.
 */
export function getMergedSymbol(sym: AstSymbol): AstSymbol {
  return (sym as unknown as { mergedSymbol?: AstSymbol }).mergedSymbol ?? sym;
}

/**
 * Returns true when the symbol has been merged with another.
 */
export function isMergedSymbol(sym: AstSymbol): boolean {
  return (sym as unknown as { mergedSymbol?: AstSymbol }).mergedSymbol !== undefined;
}
