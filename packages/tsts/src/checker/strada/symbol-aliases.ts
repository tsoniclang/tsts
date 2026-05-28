/**
 * Symbol alias resolution.
 *
 * Ported from Strada `checker.go` — resolveAliasSymbol,
 * isAliasSymbol, followAliasChain.
 */

import { SymbolFlags } from "../../ast/index.js";
import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when a symbol is an alias.
 */
export function isAliasSymbol(sym: AstSymbol): boolean {
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;
  return (flags & SymbolFlags.Alias) !== 0;
}

/**
 * Returns the immediate target of an alias symbol, or undefined.
 */
export function getAliasTarget(sym: AstSymbol): AstSymbol | undefined {
  return (sym as unknown as { target?: AstSymbol }).target;
}

/**
 * Follows an alias chain to its eventual non-alias target.
 */
export function followAliasChain(sym: AstSymbol): AstSymbol {
  const visited = new Set<AstSymbol>();
  const walker = (current: AstSymbol): AstSymbol => {
    if (visited.has(current)) return current;
    visited.add(current);
    if (!isAliasSymbol(current)) return current;
    const target = getAliasTarget(current);
    if (target === undefined) return current;
    return walker(target);
  };
  return walker(sym);
}

/**
 * Returns the entire alias chain as an array.
 */
export function getAliasChain(sym: AstSymbol): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  const visited = new Set<AstSymbol>();
  const walker = (current: AstSymbol): void => {
    if (visited.has(current)) return;
    visited.add(current);
    out.push(current);
    if (!isAliasSymbol(current)) return;
    const target = getAliasTarget(current);
    if (target !== undefined) walker(target);
  };
  walker(sym);
  return out;
}

/**
 * Returns the length of an alias chain.
 */
export function getAliasChainLength(sym: AstSymbol): number {
  return getAliasChain(sym).length;
}

/**
 * Returns true when an alias chain is "saturated" — follows back to
 * a non-alias symbol.
 */
export function isAliasResolvable(sym: AstSymbol): boolean {
  const final = followAliasChain(sym);
  return !isAliasSymbol(final);
}

/**
 * Returns true when the alias chain has a cycle.
 */
export function hasAliasCycle(sym: AstSymbol): boolean {
  const final = followAliasChain(sym);
  return isAliasSymbol(final);
}
