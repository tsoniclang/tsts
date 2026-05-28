/**
 * ImportClause handling (the bindings of an import declaration).
 *
 * Ported from Strada `checker.go` — checkImportClause,
 * getImportClauseBindings.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is an ImportClause.
 */
export function isImportClause(node: AstNode): boolean {
  return node.kind === Kind.ImportClause;
}

/**
 * Returns the default-import binding name node of an ImportClause.
 */
export function getDefaultImportName(node: AstNode): AstNode | undefined {
  if (!isImportClause(node)) return undefined;
  return (node as unknown as { name?: AstNode }).name;
}

/**
 * Returns the named-bindings node of an ImportClause (NamedImports
 * or NamespaceImport).
 */
export function getNamedBindings(node: AstNode): AstNode | undefined {
  if (!isImportClause(node)) return undefined;
  return (node as unknown as { namedBindings?: AstNode }).namedBindings;
}

/**
 * Returns true when the import-clause is type-only
 * (`import type { ... }`).
 */
export function isTypeOnlyImportClause(node: AstNode): boolean {
  if (!isImportClause(node)) return false;
  return (node as unknown as { isTypeOnly?: boolean }).isTypeOnly === true;
}

/**
 * Returns true when the clause has a default import.
 */
export function hasDefaultImport(node: AstNode): boolean {
  return getDefaultImportName(node) !== undefined;
}

/**
 * Returns true when the clause has a namespace import
 * (`* as ns`).
 */
export function hasNamespaceImport(node: AstNode): boolean {
  const bindings = getNamedBindings(node);
  return bindings !== undefined && bindings.kind === Kind.NamespaceImport;
}

/**
 * Returns true when the clause has named imports (`{ a, b }`).
 */
export function hasNamedImports(node: AstNode): boolean {
  const bindings = getNamedBindings(node);
  return bindings !== undefined && bindings.kind === Kind.NamedImports;
}

/**
 * Returns the named-import specifier nodes.
 */
export function getNamedImportSpecifiers(node: AstNode): readonly AstNode[] {
  const bindings = getNamedBindings(node);
  if (bindings === undefined || bindings.kind !== Kind.NamedImports) return [];
  const elements = (bindings as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements;
  return elements?.nodes ?? [];
}

/**
 * Returns the namespace-import binding name (`* as ns` → "ns").
 */
export function getNamespaceImportName(node: AstNode): string | undefined {
  const bindings = getNamedBindings(node);
  if (bindings === undefined || bindings.kind !== Kind.NamespaceImport) return undefined;
  const name = (bindings as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}
