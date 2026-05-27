/**
 * Export-declaration analysis.
 *
 * Ported from Strada `checker.go` — collectExportsOfModule,
 * getExportedSymbolNames, isExportedFromModule.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the declaration has an export modifier.
 */
export function isExportedDeclaration(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.ExportKeyword) === true;
}

/**
 * Returns true when the declaration has a default modifier.
 */
export function isDefaultExportDeclaration(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.DefaultKeyword) === true;
}

/**
 * Returns true when the node is an ExportDeclaration.
 */
export function isExportDeclaration(node: AstNode): boolean {
  return node.kind === Kind.ExportDeclaration;
}

/**
 * Returns true when the export declaration re-exports from another
 * module (`export { x } from "y"`).
 */
export function isReexportDeclaration(node: AstNode): boolean {
  if (!isExportDeclaration(node)) return false;
  return (node as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier !== undefined;
}

/**
 * Returns the list of export specifiers in an ExportDeclaration.
 */
export function getExportSpecifiers(node: AstNode): readonly AstNode[] {
  if (!isExportDeclaration(node)) return [];
  const clause = (node as unknown as { exportClause?: AstNode }).exportClause;
  if (clause === undefined) return [];
  if (clause.kind !== Kind.NamedExports) return [];
  const elements = (clause as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements;
  return elements?.nodes ?? [];
}

/**
 * Returns the exported name of a specifier — `foo as bar` → "bar".
 */
export function getExportedName(specifier: AstNode): string | undefined {
  if (specifier.kind !== Kind.ExportSpecifier) return undefined;
  const name = (specifier as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the local name being exported — `foo as bar` → "foo".
 */
export function getLocalExportName(specifier: AstNode): string | undefined {
  if (specifier.kind !== Kind.ExportSpecifier) return undefined;
  const propertyName = (specifier as unknown as { propertyName?: AstNode }).propertyName;
  const target = propertyName ?? (specifier as unknown as { name?: AstNode }).name;
  if (target === undefined || target.kind !== Kind.Identifier) return undefined;
  return (target as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the exported symbols of a module.
 */
export function getExportedSymbols(moduleSymbol: AstSymbol): readonly AstSymbol[] {
  const exports = (moduleSymbol as unknown as { exports?: Map<string, AstSymbol> }).exports;
  if (exports === undefined) return [];
  return [...exports.values()];
}

/**
 * Returns true when the export is a namespace re-export
 * (`export * from "x"`).
 */
export function isNamespaceReexport(node: AstNode): boolean {
  if (!isExportDeclaration(node)) return false;
  const clause = (node as unknown as { exportClause?: AstNode }).exportClause;
  return clause === undefined;
}

/**
 * Returns true when the export is type-only (`export type { ... }`).
 */
export function isTypeOnlyExport(node: AstNode): boolean {
  if (!isExportDeclaration(node)) return false;
  return (node as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
}
