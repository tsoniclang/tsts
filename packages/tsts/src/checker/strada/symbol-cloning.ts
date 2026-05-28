/**
 * Symbol-cloning helpers — produce derivative symbols for type
 * instantiation, alias resolution, and late-binding.
 *
 * Ported from Strada `checker.go` — cloneSymbol, cloneSymbolWithFlags,
 * cloneSymbolWithDeclarations.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns a shallow clone of a symbol.
 */
export function shallowCloneSymbol(sym: AstSymbol): AstSymbol {
  return { ...(sym as object) } as unknown as AstSymbol;
}

/**
 * Returns a clone with the given flag bitmask.
 */
export function cloneSymbolWithFlags(sym: AstSymbol, flags: number): AstSymbol {
  return { ...(sym as object), flags } as unknown as AstSymbol;
}

/**
 * Returns a clone with the given declarations list.
 */
export function cloneSymbolWithDeclarations(
  sym: AstSymbol,
  declarations: readonly AstNode[],
): AstSymbol {
  return { ...(sym as object), declarations } as unknown as AstSymbol;
}

/**
 * Returns a clone with the given member table.
 */
export function cloneSymbolWithMembers(
  sym: AstSymbol,
  members: Map<string, AstSymbol>,
): AstSymbol {
  return { ...(sym as object), members } as unknown as AstSymbol;
}

/**
 * Returns a clone with the given exports table.
 */
export function cloneSymbolWithExports(
  sym: AstSymbol,
  exports: Map<string, AstSymbol>,
): AstSymbol {
  return { ...(sym as object), exports } as unknown as AstSymbol;
}

/**
 * Returns a new alias symbol pointing at `target`.
 */
export function createAliasSymbol(target: AstSymbol, name: string): AstSymbol {
  return {
    ...(target as object),
    name,
    target,
  } as unknown as AstSymbol;
}

/**
 * Returns a renamed clone of a symbol — used during merging.
 */
export function renameSymbol(sym: AstSymbol, newName: string): AstSymbol {
  return { ...(sym as object), name: newName } as unknown as AstSymbol;
}
