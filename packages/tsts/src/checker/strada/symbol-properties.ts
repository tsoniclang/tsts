/**
 * Symbol-property accessors.
 *
 * Ported from Strada `checker.go` — getNameOfSymbol, getParentOfSymbol,
 * getDeclarationsOfSymbol, getTypeOfSymbol.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";

/**
 * Returns the canonical name of a symbol.
 */
export function getNameOfSymbol(sym: AstSymbol): string {
  return (sym as unknown as { name?: string }).name ?? "(anonymous)";
}

/**
 * Returns the parent symbol of a symbol — the symbol of its
 * enclosing scope.
 */
export function getParentOfSymbol(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { parent?: AstSymbol }).parent;
}

/**
 * Returns the declarations of a symbol.
 */
export function getDeclarationsOfSymbol(sym: AstSymbol): readonly AstNode[] {
  return (sym as unknown as { declarations?: readonly AstNode[] }).declarations ?? [];
}

/**
 * Returns the value declaration of a symbol — the first declaration
 * that introduces a value (vs. a type).
 */
export function getValueDeclaration(sym: AstSymbol): AstNode | undefined {
  return (sym as unknown as { valueDeclaration?: AstNode }).valueDeclaration;
}

/**
 * Returns the type of a symbol.
 */
export function getTypeOfSymbol(sym: AstSymbol): Type | undefined {
  return (sym as unknown as { type?: Type }).type;
}

/**
 * Returns the members table of a symbol.
 */
export function getMembersOfSymbol(
  sym: AstSymbol,
): Map<string, AstSymbol> | undefined {
  return (sym as unknown as { members?: Map<string, AstSymbol> }).members;
}

/**
 * Returns the exports table of a symbol.
 */
export function getExportsOfSymbol(
  sym: AstSymbol,
): Map<string, AstSymbol> | undefined {
  return (sym as unknown as { exports?: Map<string, AstSymbol> }).exports;
}

/**
 * Returns the flags bitmask of a symbol.
 */
export function getFlagsOfSymbol(sym: AstSymbol): number {
  return (sym as unknown as { flags?: number }).flags ?? 0;
}

/**
 * Returns true when the symbol's flags include any flag in the mask.
 */
export function symbolHasAnyFlag(sym: AstSymbol, mask: number): boolean {
  return (getFlagsOfSymbol(sym) & mask) !== 0;
}

/**
 * Returns true when the symbol's flags include every flag in the mask.
 */
export function symbolHasAllFlags(sym: AstSymbol, mask: number): boolean {
  return (getFlagsOfSymbol(sym) & mask) === mask;
}

/**
 * Returns the number of declarations of a symbol.
 */
export function getDeclarationCount(sym: AstSymbol): number {
  return getDeclarationsOfSymbol(sym).length;
}
