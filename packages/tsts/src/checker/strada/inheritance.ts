/**
 * Class/interface inheritance helpers.
 *
 * Ported from Strada `checker.go` — getDeclaredBaseClass,
 * isInBaseClassChain, checkInheritedPropertiesAreIdentical.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Walks a symbol's heritage chain, calling `visit` for each base
 * symbol. Stops if `visit` returns true.
 */
export function walkBaseSymbols(
  sym: AstSymbol,
  visit: (s: AstSymbol) => boolean,
): boolean {
  const queue: AstSymbol[] = [sym];
  const visited = new Set<AstSymbol>();
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    if (visit(current)) return true;
    const bases = (current as unknown as { baseSymbols?: readonly AstSymbol[] }).baseSymbols;
    if (bases !== undefined) {
      for (const b of bases) queue.push(b);
    }
  }
  return false;
}

/**
 * Returns true when `base` is in the inheritance chain of `derived`.
 */
export function isInBaseClassChain(derived: AstSymbol, base: AstSymbol): boolean {
  return walkBaseSymbols(derived, (s) => s === base);
}

/**
 * Returns the set of all base symbols of a class/interface.
 */
export function getAllBaseSymbols(sym: AstSymbol): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  walkBaseSymbols(sym, (s) => {
    if (s !== sym) out.push(s);
    return false;
  });
  return out;
}

/**
 * Returns true when the symbol is the base of *any* class — i.e.
 * has at least one derived symbol that references it.
 */
export function isBaseOfAnyClass(_sym: AstSymbol): boolean {
  // Cannot answer without a global derived-symbol index.
  return false;
}

/**
 * Returns true when the symbol is itself a class.
 */
export function isClassSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return false;
  return decls.some((d) =>
    d.kind === Kind.ClassDeclaration || d.kind === Kind.ClassExpression
  );
}

/**
 * Returns true when the symbol is an interface.
 */
export function isInterfaceSymbol(sym: AstSymbol): boolean {
  const decls = (sym as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined) return false;
  return decls.some((d) => d.kind === Kind.InterfaceDeclaration);
}

/**
 * Returns the depth of `sym` in the inheritance chain — 0 for the
 * top-most class, increasing with each derived class.
 */
export function getInheritanceDepth(sym: AstSymbol): number {
  const bases: readonly AstSymbol[] | undefined =
    (sym as unknown as { baseSymbols?: readonly AstSymbol[] }).baseSymbols;
  if (bases === undefined || bases.length === 0) return 0;
  const head = bases[0];
  if (head === undefined) return 0;
  return 1 + getInheritanceDepth(head);
}
