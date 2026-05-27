/**
 * Import-specifier symbol resolution.
 *
 * Ported from Strada `checker.go` — resolveExternalModuleSymbol,
 * getSymbolFromImportSpecifier, getExternalModuleMember.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns the module symbol for a given module specifier string.
 * Conservative shell: returns undefined.
 */
export function resolveModuleSymbolByPath(_modulePath: string): AstSymbol | undefined {
  return undefined;
}

/**
 * Returns the exported symbol from a module by name.
 */
export function getExportFromModule(
  moduleSymbol: AstSymbol,
  exportName: string,
): AstSymbol | undefined {
  const exports = (moduleSymbol as unknown as { exports?: Map<string, AstSymbol> }).exports;
  return exports?.get(exportName);
}

/**
 * Returns the default export of a module, if any.
 */
export function getDefaultExport(moduleSymbol: AstSymbol): AstSymbol | undefined {
  return getExportFromModule(moduleSymbol, "default");
}

/**
 * Returns the import-specifier's target symbol.
 */
export function getImportTargetSymbol(specifier: AstNode): AstSymbol | undefined {
  return (specifier as unknown as { symbol?: AstSymbol }).symbol;
}

/**
 * Returns true when the import is a "side-effect" import — has no
 * binding list (`import "x"`).
 */
export function isImportForSideEffectsOnly(decl: AstNode): boolean {
  if (decl.kind !== Kind.ImportDeclaration) return false;
  const clause = (decl as unknown as { importClause?: AstNode }).importClause;
  return clause === undefined;
}

/**
 * Returns the module specifier's text from an ImportDeclaration.
 */
export function getImportModuleText(decl: AstNode): string | undefined {
  if (decl.kind !== Kind.ImportDeclaration) return undefined;
  const ms = (decl as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier;
  if (ms === undefined) return undefined;
  if (ms.kind !== Kind.StringLiteral) return undefined;
  return (ms as unknown as { text?: string }).text;
}

/**
 * Returns true when the import path is relative (starts with `./`
 * or `../`).
 */
export function isRelativeImportPath(modulePath: string): boolean {
  return modulePath.startsWith("./") || modulePath.startsWith("../");
}

/**
 * Returns true when the import path is absolute (starts with `/`).
 */
export function isAbsoluteImportPath(modulePath: string): boolean {
  return modulePath.startsWith("/");
}

/**
 * Returns true when the import path is a bare specifier (package
 * name, e.g. `"react"`).
 */
export function isBareImportPath(modulePath: string): boolean {
  if (isRelativeImportPath(modulePath)) return false;
  if (isAbsoluteImportPath(modulePath)) return false;
  return true;
}
