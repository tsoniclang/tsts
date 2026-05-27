/**
 * Walker over binder output structures.
 *
 * Ported from Strada `binder.go` (within `binder`) — utility for
 * scanning the symbol-table forest produced by the binder.
 */

import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Walks all symbols in a binder-produced symbol table tree starting
 * at a root symbol.
 */
export function walkSymbolTree(
  root: AstSymbol,
  visit: (sym: AstSymbol, depth: number) => void,
): void {
  const recurse = (sym: AstSymbol, depth: number): void => {
    visit(sym, depth);
    const members = (sym as unknown as { members?: Map<string, AstSymbol> }).members;
    if (members !== undefined) {
      for (const m of members.values()) recurse(m, depth + 1);
    }
    const exports = (sym as unknown as { exports?: Map<string, AstSymbol> }).exports;
    if (exports !== undefined) {
      for (const e of exports.values()) recurse(e, depth + 1);
    }
  };
  recurse(root, 0);
}

/**
 * Collects symbols matching a predicate via DFS.
 */
export function collectMatchingSymbols(
  root: AstSymbol,
  predicate: (sym: AstSymbol) => boolean,
): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  walkSymbolTree(root, (sym) => {
    if (predicate(sym)) out.push(sym);
  });
  return out;
}

/**
 * Returns the count of symbols reachable from a root.
 */
export function getReachableSymbolCount(root: AstSymbol): number {
  const ref: { count: number } = { count: 0 };
  walkSymbolTree(root, () => { ref.count++; });
  return ref.count;
}

/**
 * Returns the max depth of the symbol tree.
 */
export function getMaxSymbolDepth(root: AstSymbol): number {
  const ref: { maxDepth: number } = { maxDepth: 0 };
  walkSymbolTree(root, (_, depth) => {
    if (depth > ref.maxDepth) ref.maxDepth = depth;
  });
  return ref.maxDepth;
}

/**
 * Returns all symbols whose declaration kind matches `kind`.
 */
export function findSymbolsByDeclarationKind(
  root: AstSymbol,
  kind: number,
): readonly AstSymbol[] {
  return collectMatchingSymbols(root, (sym) => {
    const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
    return decls?.some((d) => d.kind === kind) === true;
  });
}

/**
 * Returns all symbols whose name matches a predicate.
 */
export function findSymbolsByNamePredicate(
  root: AstSymbol,
  predicate: (name: string) => boolean,
): readonly AstSymbol[] {
  return collectMatchingSymbols(root, (sym) => {
    const name = (sym as unknown as { name?: string }).name;
    return name !== undefined && predicate(name);
  });
}
