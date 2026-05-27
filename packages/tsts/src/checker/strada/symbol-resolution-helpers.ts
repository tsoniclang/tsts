/**
 * Symbol-resolution helper functions.
 *
 * Ported from Strada `nameresolver.go` (within `binder`) — helpers
 * that supplement the main `resolveNameInScope` walker.
 */

import { Kind, SymbolFlags } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns the symbol attached directly to an AST node.
 */
export function getDirectSymbol(node: AstNode): AstSymbol | undefined {
  return (node as unknown as { symbol?: AstSymbol }).symbol;
}

/**
 * Returns the local table of a scope-introducing node.
 */
export function getLocalSymbols(node: AstNode): Map<string, AstSymbol> | undefined {
  return (node as unknown as { locals?: Map<string, AstSymbol> }).locals;
}

/**
 * Returns the symbol exports table of a node (for ModuleBlock and
 * NamespaceImport).
 */
export function getNodeExports(node: AstNode): Map<string, AstSymbol> | undefined {
  return (node as unknown as { symbol?: { exports?: Map<string, AstSymbol> } }).symbol?.exports;
}

/**
 * Returns true when the symbol resolves to a member of a class/object.
 */
export function isPropertySymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Property) !== 0;
}

/**
 * Returns true when the symbol resolves to a member function.
 */
export function isMethodFlagSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Method) !== 0;
}

/**
 * Returns true when the symbol resolves to a function — top-level or
 * methods both fall under Function.
 */
export function isAnyFunctionSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & (SymbolFlags.Function | SymbolFlags.Method)) !== 0;
}

/**
 * Returns the symbol's first declaration of a particular kind, if any.
 */
export function findFirstDeclaration(
  sym: AstSymbol,
  kind: number,
): AstNode | undefined {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return undefined;
  return decls.find((d) => d.kind === kind);
}

/**
 * Returns the first ClassDeclaration declaration of a class symbol.
 */
export function findClassDeclaration(sym: AstSymbol): AstNode | undefined {
  return findFirstDeclaration(sym, Kind.ClassDeclaration)
    ?? findFirstDeclaration(sym, Kind.ClassExpression);
}

/**
 * Returns the first FunctionDeclaration of a function symbol.
 */
export function findFunctionDeclaration(sym: AstSymbol): AstNode | undefined {
  return findFirstDeclaration(sym, Kind.FunctionDeclaration)
    ?? findFirstDeclaration(sym, Kind.FunctionExpression)
    ?? findFirstDeclaration(sym, Kind.ArrowFunction);
}

/**
 * Returns all declarations of a kind on a symbol.
 */
export function findAllDeclarationsOfKind(
  sym: AstSymbol,
  kind: number,
): readonly AstNode[] {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return [];
  return decls.filter((d) => d.kind === kind);
}

/**
 * Returns true when the symbol has been seen during a resolution
 * cycle — used to break recursive alias chains.
 */
export function isResolutionCycleMarker(sym: AstSymbol): boolean {
  return (sym as unknown as { isCycleMarker?: boolean }).isCycleMarker === true;
}
