/**
 * Helpers for "declared" symbols — symbols introduced by source
 * declarations (vs. inferred / synthesized).
 *
 * Ported from Strada `checker.go` — getDeclaredSymbols,
 * isDeclaredInSource, getDeclarationOfKind.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the symbol is declared in source (has at least
 * one declaration node).
 */
export function isDeclaredSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  return decls !== undefined && decls.length > 0;
}

/**
 * Returns true when the symbol is synthesized (has no declarations).
 */
export function isSynthesizedSymbol(sym: AstSymbol): boolean {
  return !isDeclaredSymbol(sym);
}

/**
 * Returns the declarations of a symbol filtered by Kind.
 */
export function getDeclarationsOfKind(
  sym: AstSymbol,
  kind: number,
): readonly AstNode[] {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return [];
  return decls.filter((d) => d.kind === kind);
}

/**
 * Returns the first declaration of a given Kind.
 */
export function getFirstDeclarationOfKind(
  sym: AstSymbol,
  kind: number,
): AstNode | undefined {
  return getDeclarationsOfKind(sym, kind)[0];
}

/**
 * Returns the count of declarations of a given Kind.
 */
export function countDeclarationsOfKind(
  sym: AstSymbol,
  kind: number,
): number {
  return getDeclarationsOfKind(sym, kind).length;
}

/**
 * Returns true when the symbol's only declaration is the given kind.
 */
export function isSoleDeclaredKind(sym: AstSymbol, kind: number): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return false;
  return decls.every((d) => d.kind === kind);
}

/**
 * Returns true when the symbol has only an ambient declaration
 * (`declare ...`).
 */
export function isAmbientOnlySymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return false;
  return decls.every((d) => {
    const flags = (d as unknown as { flags?: number }).flags ?? 0;
    return (flags & (1 << 25)) !== 0; // NodeFlags.Ambient
  });
}

/**
 * Returns true when the symbol's declaration list has at least one
 * MethodDeclaration.
 */
export function hasMethodDeclaration(sym: AstSymbol): boolean {
  return countDeclarationsOfKind(sym, Kind.MethodDeclaration) > 0;
}

/**
 * Returns true when the symbol has at least one class declaration.
 */
export function hasClassDeclaration(sym: AstSymbol): boolean {
  return countDeclarationsOfKind(sym, Kind.ClassDeclaration) > 0 ||
    countDeclarationsOfKind(sym, Kind.ClassExpression) > 0;
}
