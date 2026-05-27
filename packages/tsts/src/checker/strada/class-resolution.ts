/**
 * Class declaration / expression resolution.
 *
 * Ported from Strada `checker.go` — getClassType, getClassConstructor,
 * getClassInstanceMembers, getClassStaticMembers.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the class declaration's body members.
 */
export function getClassMembers(decl: AstNode): readonly AstNode[] {
  if (decl.kind !== Kind.ClassDeclaration && decl.kind !== Kind.ClassExpression) {
    return [];
  }
  const members = (decl as unknown as { members?: { nodes?: readonly AstNode[] } }).members;
  return members?.nodes ?? [];
}

/**
 * Returns the constructor declaration of a class, or undefined.
 */
export function getClassConstructor(decl: AstNode): AstNode | undefined {
  return getClassMembers(decl).find((m) => m.kind === Kind.Constructor);
}

/**
 * Returns true when a class has a no-argument constructor (or no
 * explicit constructor).
 */
export function hasZeroArgConstructor(decl: AstNode): boolean {
  const ctor = getClassConstructor(decl);
  if (ctor === undefined) return true;
  const params = (ctor as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  return params === undefined || params.length === 0;
}

/**
 * Returns the class type (constructor-side type).
 */
export function getClassConstructorType(sym: AstSymbol): Type {
  return {
    flags: TypeFlags.Object,
    symbol: sym,
  } as unknown as Type;
}

/**
 * Returns the class instance type.
 */
export function getClassInstanceType(sym: AstSymbol): Type {
  return {
    flags: TypeFlags.Object,
    symbol: sym,
  } as unknown as Type;
}

/**
 * Returns the property symbols on the static side.
 */
export function getStaticPropertySymbols(sym: AstSymbol): readonly AstSymbol[] {
  const exports = (sym as unknown as { exports?: Map<string, AstSymbol> }).exports;
  if (exports === undefined) return [];
  return [...exports.values()];
}

/**
 * Returns the property symbols on the instance side.
 */
export function getInstancePropertySymbols(sym: AstSymbol): readonly AstSymbol[] {
  const members = (sym as unknown as { members?: Map<string, AstSymbol> }).members;
  if (members === undefined) return [];
  return [...members.values()];
}

/**
 * Returns true when a class declaration has at least one
 * private/protected member.
 */
export function hasRestrictedMembers(decl: AstNode): boolean {
  return getClassMembers(decl).some((m) => {
    const mods = (m as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
    return mods?.some((k) =>
      k.kind === Kind.PrivateKeyword || k.kind === Kind.ProtectedKeyword,
    ) === true;
  });
}
