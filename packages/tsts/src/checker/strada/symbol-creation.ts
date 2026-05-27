/**
 * Symbol-creation helpers for synthetic symbols.
 *
 * Ported from Strada `checker.go` — createSymbol, cloneSymbol,
 * createSymbolWithDeclaration, transferSymbolDeclarations.
 *
 * Used to fabricate symbols for late-bound members and computed
 * lookups that don't exist in the source AST.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Creates a new symbol with the given flags and name.
 */
export function createSymbol(
  flags: number,
  name: string,
  declarations: readonly AstNode[] = [],
): AstSymbol {
  return {
    flags,
    name,
    declarations,
    members: new Map(),
    exports: new Map(),
  } as unknown as AstSymbol;
}

/**
 * Returns a shallow clone of a symbol with optional flag changes.
 */
export function cloneSymbol(sym: AstSymbol, flagsOverride?: number): AstSymbol {
  const flags = flagsOverride !== undefined
    ? flagsOverride
    : ((sym as unknown as { flags?: number }).flags ?? 0);
  return { ...(sym as object), flags } as unknown as AstSymbol;
}

/**
 * Returns a "merged" symbol — combines flags and declarations of two
 * symbols. Used when a value-side and type-side declaration share a
 * name.
 */
export function mergeSymbol(a: AstSymbol, b: AstSymbol): AstSymbol {
  const aFlags = (a as unknown as { flags?: number }).flags ?? 0;
  const bFlags = (b as unknown as { flags?: number }).flags ?? 0;
  const aDecls = (a as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
  const bDecls = (b as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
  return {
    ...(a as object),
    flags: aFlags | bFlags,
    declarations: [...aDecls, ...bDecls],
  } as unknown as AstSymbol;
}

/**
 * Creates a synthetic property symbol (used for late-binding).
 */
export function createPropertySymbol(name: string, decls: readonly AstNode[] = []): AstSymbol {
  return createSymbol(SymbolFlags.Property, name, decls);
}

/**
 * Creates a synthetic method symbol.
 */
export function createMethodSymbol(name: string, decls: readonly AstNode[] = []): AstSymbol {
  return createSymbol(SymbolFlags.Method, name, decls);
}

/**
 * Creates a synthetic value-only symbol.
 */
export function createValueSymbol(name: string): AstSymbol {
  return createSymbol(SymbolFlags.Value, name);
}

/**
 * Creates a synthetic type-only symbol.
 */
export function createTypeSymbol(name: string): AstSymbol {
  return createSymbol(SymbolFlags.Type, name);
}

/**
 * Returns true when the symbol has at least one declaration.
 */
export function hasDeclarations(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  return decls !== undefined && decls.length > 0;
}
