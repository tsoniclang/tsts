/**
 * Getter/setter pairing analysis.
 *
 * Ported from Strada `checker.go` — pairGetSetAccessors,
 * getMissingSetAccessors, mismatchedAccessorTypes.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { isTypeIdenticalTo } from "./relations.js";

/**
 * Returns the get-accessor declaration of a symbol.
 */
export function findGetAccessor(sym: AstSymbol): AstNode | undefined {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  return decls.find((d) => d.kind === Kind.GetAccessor);
}

/**
 * Returns the set-accessor declaration of a symbol.
 */
export function findSetAccessor(sym: AstSymbol): AstNode | undefined {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  return decls.find((d) => d.kind === Kind.SetAccessor);
}

/**
 * Returns true when a symbol has only a get-accessor (read-only).
 */
export function isGetterOnlySymbol(sym: AstSymbol): boolean {
  return findGetAccessor(sym) !== undefined && findSetAccessor(sym) === undefined;
}

/**
 * Returns true when a symbol has only a set-accessor (write-only).
 */
export function isSetterOnlySymbol(sym: AstSymbol): boolean {
  return findSetAccessor(sym) !== undefined && findGetAccessor(sym) === undefined;
}

/**
 * Returns true when both get and set accessors are present.
 */
export function hasMatchingPair(sym: AstSymbol): boolean {
  return findGetAccessor(sym) !== undefined && findSetAccessor(sym) !== undefined;
}

/**
 * Returns true when get/set accessor types disagree.
 */
export function hasMismatchedAccessorTypes(
  sym: AstSymbol,
  getterType: Type,
  setterType: Type,
): boolean {
  if (!hasMatchingPair(sym)) return false;
  return !isTypeIdenticalTo(getterType, setterType);
}

/**
 * Returns true when the get-accessor has different visibility from
 * the set-accessor (e.g. public getter / private setter).
 */
export function hasMismatchedVisibility(sym: AstSymbol): boolean {
  const getter = findGetAccessor(sym);
  const setter = findSetAccessor(sym);
  if (getter === undefined || setter === undefined) return false;
  return getAccessibilityKind(getter) !== getAccessibilityKind(setter);
}

function getAccessibilityKind(node: AstNode): number {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return Kind.PublicKeyword;
  for (const m of mods) {
    if (m.kind === Kind.PrivateKeyword) return Kind.PrivateKeyword;
    if (m.kind === Kind.ProtectedKeyword) return Kind.ProtectedKeyword;
  }
  return Kind.PublicKeyword;
}
