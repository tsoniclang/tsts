/**
 * Heritage-clause resolution for classes and interfaces.
 *
 * Ported from Strada `checker.go` — getBaseTypes, getBaseConstructorType,
 * resolveBaseTypesForClass / resolveBaseTypesForInterface,
 * getBaseTypeNodeOfClassLikeDeclaration.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";

/**
 * Returns the `extends` heritage clause of a class declaration, or
 * undefined when none.
 */
export function getExtendsClause(decl: AstNode): AstNode | undefined {
  const clauses = (decl as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
  if (clauses === undefined) return undefined;
  for (const c of clauses) {
    if ((c as unknown as { token?: number }).token === Kind.ExtendsKeyword) return c;
  }
  return undefined;
}

/**
 * Returns the `implements` heritage clause of a class declaration, or
 * undefined when none.
 */
export function getImplementsClause(decl: AstNode): AstNode | undefined {
  const clauses = (decl as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
  if (clauses === undefined) return undefined;
  for (const c of clauses) {
    if ((c as unknown as { token?: number }).token === Kind.ImplementsKeyword) return c;
  }
  return undefined;
}

/**
 * Returns the first type-expression inside an extends clause —
 * for the canonical single-inheritance case.
 */
export function getFirstExtendsExpression(decl: AstNode): AstNode | undefined {
  const ext = getExtendsClause(decl);
  if (ext === undefined) return undefined;
  const types = (ext as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
  return types?.[0];
}

/**
 * Returns all types listed in an implements clause.
 */
export function getImplementsExpressions(decl: AstNode): readonly AstNode[] {
  const impl = getImplementsClause(decl);
  if (impl === undefined) return [];
  return (impl as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes ?? [];
}

/**
 * Returns the `extends` heritage targets of an interface (multiple
 * allowed; vs. a single one for classes).
 */
export function getInterfaceExtendsExpressions(decl: AstNode): readonly AstNode[] {
  const ext = getExtendsClause(decl);
  if (ext === undefined) return [];
  return (ext as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes ?? [];
}

/**
 * Returns the base types of a class. Conservative shell: returns an
 * empty list when the heritage is not yet resolved.
 */
export function getBaseTypes(sym: AstSymbol): readonly Type[] {
  return (sym as unknown as { baseTypes?: readonly Type[] }).baseTypes ?? [];
}

/**
 * Returns the base constructor type for a class, or undefined when
 * the class has no extends clause.
 */
export function getBaseConstructorType(sym: AstSymbol): Type | undefined {
  return (sym as unknown as { baseConstructorType?: Type }).baseConstructorType;
}

/**
 * Returns true when the class extends itself in some way through
 * the heritage chain. Strada uses a cycle-detection algorithm; this
 * is a conservative placeholder returning false.
 */
export function isCyclicClassExtension(_sym: AstSymbol): boolean {
  return false;
}
