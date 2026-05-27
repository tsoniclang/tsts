/**
 * `implements` clause validation.
 *
 * Ported from Strada `checker.go` — checkClassImplements,
 * checkImplementsCompatibility, getImplementsTypes.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { isTypeAssignableTo } from "./relations.js";

/**
 * Returns the implements-clause types of a class.
 */
export function getImplementsTypes(decl: AstNode): readonly AstNode[] {
  const clauses = (decl as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
  if (clauses === undefined) return [];
  for (const c of clauses) {
    if ((c as unknown as { token?: number }).token === Kind.ImplementsKeyword) {
      const types = (c as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
      return types ?? [];
    }
  }
  return [];
}

/**
 * Returns true when the class implements at least one interface.
 */
export function hasImplementsClause(decl: AstNode): boolean {
  return getImplementsTypes(decl).length > 0;
}

/**
 * Returns true when the class type structurally satisfies an
 * implemented interface.
 */
export function classSatisfiesImplements(
  classType: Type,
  interfaceType: Type,
): boolean {
  return isTypeAssignableTo(classType, interfaceType);
}

/**
 * Returns true when the implemented type is itself a class (which is
 * legal but unusual).
 */
export function isClassImplementsClass(implementedType: Type): boolean {
  const flags = (implementedType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const sym = (implementedType as unknown as { symbol?: { flags?: number } }).symbol;
  if (sym === undefined) return false;
  // SymbolFlags.Class = 32
  return (sym.flags ?? 0 & 32) !== 0;
}

/**
 * Returns true when an interface has at least one method that the
 * implementing class must provide.
 */
export function hasInterfaceMembers(interfaceType: Type): boolean {
  const sym = (interfaceType as unknown as { symbol?: { members?: Map<string, unknown> } }).symbol;
  return sym?.members !== undefined && sym.members.size > 0;
}

/**
 * Returns the implemented-type expression nodes.
 */
export function getImplementedExpressions(decl: AstNode): readonly AstNode[] {
  return getImplementsTypes(decl)
    .map((t) => (t as unknown as { expression?: AstNode }).expression)
    .filter((e): e is AstNode => e !== undefined);
}
