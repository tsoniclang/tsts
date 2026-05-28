/**
 * HeritageClause node handling.
 *
 * Ported from Strada `checker.go` — getHeritageClauses,
 * getExtendsClause, getImplementsClause.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a HeritageClause.
 */
export function isHeritageClause(node: AstNode): boolean {
  return node.kind === Kind.HeritageClause;
}

/**
 * Returns the heritage clauses of a class/interface declaration.
 */
export function getHeritageClauses(decl: AstNode): readonly AstNode[] {
  const clauses = (decl as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses;
  return clauses?.nodes ?? [];
}

/**
 * Returns the token-kind of a heritage clause (ExtendsKeyword /
 * ImplementsKeyword).
 */
export function getHeritageClauseToken(node: AstNode): number | undefined {
  if (!isHeritageClause(node)) return undefined;
  return (node as unknown as { token?: number }).token;
}

/**
 * Returns true when the clause is an extends clause.
 */
export function isExtendsClause(node: AstNode): boolean {
  return getHeritageClauseToken(node) === Kind.ExtendsKeyword;
}

/**
 * Returns true when the clause is an implements clause.
 */
export function isImplementsClause(node: AstNode): boolean {
  return getHeritageClauseToken(node) === Kind.ImplementsKeyword;
}

/**
 * Returns the type-entries of a heritage clause.
 */
export function getHeritageClauseTypes(node: AstNode): readonly AstNode[] {
  if (!isHeritageClause(node)) return [];
  const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types;
  return types?.nodes ?? [];
}

/**
 * Returns the extends-clause of a declaration, if present.
 */
export function findExtendsClause(decl: AstNode): AstNode | undefined {
  return getHeritageClauses(decl).find(isExtendsClause);
}

/**
 * Returns the implements-clause of a declaration, if present.
 */
export function findImplementsClause(decl: AstNode): AstNode | undefined {
  return getHeritageClauses(decl).find(isImplementsClause);
}

/**
 * Returns the extends type-entries of a declaration.
 */
export function getExtendsTypes(decl: AstNode): readonly AstNode[] {
  const clause = findExtendsClause(decl);
  return clause === undefined ? [] : getHeritageClauseTypes(clause);
}

/**
 * Returns the implements type-entries of a declaration.
 */
export function getImplementsTypes(decl: AstNode): readonly AstNode[] {
  const clause = findImplementsClause(decl);
  return clause === undefined ? [] : getHeritageClauseTypes(clause);
}

/**
 * Returns true when a class has more than one extends target —
 * which is a grammar error for classes (legal for interfaces).
 */
export function hasMultipleExtends(decl: AstNode): boolean {
  return getExtendsTypes(decl).length > 1;
}
