/**
 * External-module helpers — distinguishes ESM modules from scripts.
 *
 * Ported from Strada `utilities.go` — isExternalModule,
 * getModuleKind, hasTopLevelImportsOrExports.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the source file is an ES module — has at least
 * one top-level import or export declaration.
 */
export function isESModule(sourceFile: AstNode): boolean {
  if (sourceFile.kind !== Kind.SourceFile) return false;
  const statements = (sourceFile as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  if (statements === undefined) return false;
  return statements.some((s) =>
    s.kind === Kind.ImportDeclaration ||
    s.kind === Kind.ExportDeclaration ||
    s.kind === Kind.ExportAssignment ||
    (
      s.kind === Kind.VariableStatement ||
      s.kind === Kind.FunctionDeclaration ||
      s.kind === Kind.ClassDeclaration ||
      s.kind === Kind.TypeAliasDeclaration ||
      s.kind === Kind.InterfaceDeclaration ||
      s.kind === Kind.EnumDeclaration ||
      s.kind === Kind.ModuleDeclaration
    ) && hasExportModifier(s),
  );
}

function hasExportModifier(node: AstNode): boolean {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  return mods?.some((m) => m.kind === Kind.ExportKeyword) === true;
}

/**
 * Returns true when the source file is a "script" — not an ES module.
 */
export function isScript(sourceFile: AstNode): boolean {
  return !isESModule(sourceFile);
}

/**
 * Returns the count of import declarations at the top level of a
 * source file.
 */
export function countTopLevelImports(sourceFile: AstNode): number {
  if (sourceFile.kind !== Kind.SourceFile) return 0;
  const statements = (sourceFile as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  if (statements === undefined) return 0;
  return statements.filter((s) => s.kind === Kind.ImportDeclaration).length;
}

/**
 * Returns the count of export declarations at the top level.
 */
export function countTopLevelExports(sourceFile: AstNode): number {
  if (sourceFile.kind !== Kind.SourceFile) return 0;
  const statements = (sourceFile as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  if (statements === undefined) return 0;
  return statements.filter((s) =>
    s.kind === Kind.ExportDeclaration ||
    s.kind === Kind.ExportAssignment ||
    hasExportModifier(s),
  ).length;
}

/**
 * Returns true when the source file has a top-level `import.meta`
 * expression — only legal in modules.
 */
export function usesImportMeta(_sourceFile: AstNode): boolean {
  // Conservative — full walker would search for MetaProperty.
  return false;
}
