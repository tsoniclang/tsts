/**
 * Declaration-visibility helpers.
 *
 * Ported from Strada `symbolaccessibility.go` — isDeclarationVisible,
 * collectVisibleDeclarations, getDeclarationModifierFlagsFromSymbol.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the declaration is publicly visible (export
 * modifier or in a module's exports).
 */
export function isDeclarationVisible(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return false;
  return mods.some((m) =>
    m.kind === Kind.ExportKeyword ||
    m.kind === Kind.PublicKeyword,
  );
}

/**
 * Returns true when the declaration has internal-only visibility.
 */
export function isInternallyVisible(decl: AstNode): boolean {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return false;
  return mods.some((m) =>
    m.kind === Kind.PrivateKeyword ||
    m.kind === Kind.ProtectedKeyword,
  );
}

/**
 * Collects every visible declaration in a symbol's declaration list.
 */
export function getVisibleDeclarations(sym: AstSymbol): readonly AstNode[] {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return [];
  return decls.filter(isDeclarationVisible);
}

/**
 * Returns the modifier-flag bitmask of a symbol's first declaration.
 */
export function getSymbolModifierFlags(sym: AstSymbol): number {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return 0;
  const first = decls[0]!;
  return computeModifierFlags(first);
}

function computeModifierFlags(decl: AstNode): number {
  const mods = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return 0;
  const ref: { flags: number } = { flags: 0 };
  for (const m of mods) {
    switch (m.kind) {
      case Kind.ExportKeyword: ref.flags |= 1; break;
      case Kind.DefaultKeyword: ref.flags |= 2; break;
      case Kind.PublicKeyword: ref.flags |= 4; break;
      case Kind.PrivateKeyword: ref.flags |= 8; break;
      case Kind.ProtectedKeyword: ref.flags |= 16; break;
      case Kind.StaticKeyword: ref.flags |= 32; break;
      case Kind.ReadonlyKeyword: ref.flags |= 64; break;
      case Kind.AbstractKeyword: ref.flags |= 128; break;
      case Kind.AsyncKeyword: ref.flags |= 256; break;
      case Kind.OverrideKeyword: ref.flags |= 512; break;
      case Kind.DeclareKeyword: ref.flags |= 1024; break;
      case Kind.ConstKeyword: ref.flags |= 2048; break;
    }
  }
  return ref.flags;
}

/**
 * Returns true when the symbol is visible (its first declaration is
 * publicly visible).
 */
export function isSymbolVisible(sym: AstSymbol): boolean {
  return getVisibleDeclarations(sym).length > 0;
}
