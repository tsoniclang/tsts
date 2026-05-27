/**
 * Import-declaration analysis.
 *
 * Ported from Strada `checker.go` — getImportSpecifierFromSymbol,
 * isTypeOnlyImport, getImportClauseKind, getModuleSpecifierFromImport.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export const ImportKind = {
  Default: 0,
  Namespace: 1,
  Named: 2,
  SideEffect: 3,
  TypeOnly: 4,
} as const;

export type ImportKind =
  | typeof ImportKind.Default
  | typeof ImportKind.Namespace
  | typeof ImportKind.Named
  | typeof ImportKind.SideEffect
  | typeof ImportKind.TypeOnly;

/**
 * Returns the module specifier string from an ImportDeclaration.
 */
export function getModuleSpecifierFromImport(decl: AstNode): string | undefined {
  if (decl.kind !== Kind.ImportDeclaration) return undefined;
  const ms = (decl as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier;
  if (ms === undefined) return undefined;
  if (ms.kind === Kind.StringLiteral) {
    return (ms as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns true when the import is type-only — `import type { ... } from "x"`.
 */
export function isTypeOnlyImport(decl: AstNode): boolean {
  if (decl.kind !== Kind.ImportDeclaration) return false;
  const clause = (decl as unknown as { importClause?: AstNode }).importClause;
  if (clause === undefined) return false;
  return (clause as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
}

/**
 * Returns true when the import has no clause — `import "x"` for side
 * effects only.
 */
export function isSideEffectImport(decl: AstNode): boolean {
  if (decl.kind !== Kind.ImportDeclaration) return false;
  const clause = (decl as unknown as { importClause?: AstNode }).importClause;
  return clause === undefined;
}

/**
 * Returns true when the import has a default-binding — `import x from "y"`.
 */
export function hasDefaultImport(decl: AstNode): boolean {
  if (decl.kind !== Kind.ImportDeclaration) return false;
  const clause = (decl as unknown as { importClause?: AstNode }).importClause;
  if (clause === undefined) return false;
  return (clause as unknown as { name?: AstNode }).name !== undefined;
}

/**
 * Returns true when the import is a namespace binding — `import * as ns from "x"`.
 */
export function hasNamespaceImport(decl: AstNode): boolean {
  if (decl.kind !== Kind.ImportDeclaration) return false;
  const clause = (decl as unknown as { importClause?: AstNode }).importClause;
  const bindings = (clause as unknown as { namedBindings?: AstNode }).namedBindings;
  if (bindings === undefined) return false;
  return bindings.kind === Kind.NamespaceImport;
}

/**
 * Returns true when the import has named bindings — `import { a, b } from "x"`.
 */
export function hasNamedImports(decl: AstNode): boolean {
  if (decl.kind !== Kind.ImportDeclaration) return false;
  const clause = (decl as unknown as { importClause?: AstNode }).importClause;
  const bindings = (clause as unknown as { namedBindings?: AstNode }).namedBindings;
  if (bindings === undefined) return false;
  return bindings.kind === Kind.NamedImports;
}

/**
 * Returns the list of imported specifiers for a named-import clause.
 */
export function getNamedImportSpecifiers(decl: AstNode): readonly AstNode[] {
  if (decl.kind !== Kind.ImportDeclaration) return [];
  const clause = (decl as unknown as { importClause?: AstNode }).importClause;
  const bindings = (clause as unknown as { namedBindings?: AstNode }).namedBindings;
  if (bindings === undefined || bindings.kind !== Kind.NamedImports) return [];
  return (bindings as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes ?? [];
}

/**
 * Returns the imported name of a specifier — `foo as bar` → "foo".
 */
export function getImportedName(specifier: AstNode): string | undefined {
  const propertyName = (specifier as unknown as { propertyName?: AstNode }).propertyName;
  const name = (specifier as unknown as { name?: AstNode }).name;
  const target = propertyName ?? name;
  if (target === undefined) return undefined;
  if (target.kind === Kind.Identifier) {
    return (target as unknown as { escapedText?: string }).escapedText;
  }
  return undefined;
}

/**
 * Returns the local-binding name of a specifier — `foo as bar` → "bar".
 */
export function getLocalImportName(specifier: AstNode): string | undefined {
  const name = (specifier as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns true when the import declaration is a re-export combined
 * with import — `import { foo } from "x"; export { foo };` shape.
 */
export function isReexportImport(decl: AstNode): boolean {
  if (decl.kind !== Kind.ExportDeclaration) return false;
  const ms = (decl as unknown as { moduleSpecifier?: AstNode }).moduleSpecifier;
  return ms !== undefined;
}
