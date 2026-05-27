/**
 * Symbol-walker — visits every symbol reachable from a root symbol,
 * including those reached via type parameters and signatures.
 *
 * Ported from Strada `services.go` (within `checker`) — used by
 * declaration emit and the "find-all-references" pass.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Walks the symbol graph starting at `root`, calling `visit` for
 * every reachable symbol. Visited symbols are tracked to avoid
 * cycles.
 */
export function walkSymbolGraph(
  root: AstSymbol,
  visit: (s: AstSymbol) => void,
): void {
  const visited = new Set<AstSymbol>();
  const queue: AstSymbol[] = [root];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    visit(current);
    // Walk members.
    const members = (current as unknown as { members?: Map<string, AstSymbol> }).members;
    if (members !== undefined) {
      for (const m of members.values()) queue.push(m);
    }
    // Walk exports.
    const exports = (current as unknown as { exports?: Map<string, AstSymbol> }).exports;
    if (exports !== undefined) {
      for (const e of exports.values()) queue.push(e);
    }
  }
}

/**
 * Walks a type's symbol graph by deconstructing the type into its
 * symbol references.
 */
export function walkTypeSymbols(
  t: Type,
  visit: (s: AstSymbol) => void,
): void {
  const flags = (t as { flags?: number }).flags ?? 0;
  const sym = (t as unknown as { symbol?: AstSymbol }).symbol;
  if (sym !== undefined) {
    walkSymbolGraph(sym, visit);
  }
  // Walk type arguments.
  const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  if (args !== undefined) {
    for (const a of args) walkTypeSymbols(a, visit);
  }
  // Walk constituents for union/intersection.
  if ((flags & (TypeFlags.Union | TypeFlags.Intersection)) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    for (const c of types) walkTypeSymbols(c, visit);
  }
}

/**
 * Collects all symbols reachable from a root.
 */
export function collectReachableSymbols(root: AstSymbol): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  walkSymbolGraph(root, (s) => out.push(s));
  return out;
}

/**
 * Returns true when `target` is reachable from `root` via the symbol
 * graph.
 */
export function isReachableSymbol(root: AstSymbol, target: AstSymbol): boolean {
  const ref: { found: boolean } = { found: false };
  walkSymbolGraph(root, (s) => {
    if (s === target) ref.found = true;
  });
  return ref.found;
}
