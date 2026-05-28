/**
 * Circular-type detection.
 *
 * Ported from Strada `checker.go` — isCircularReference,
 * detectAliasCycle, isSelfReferencing.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when a type references itself directly or indirectly.
 */
export function hasCircularReference(t: Type): boolean {
  const visited = new Set<Type>();
  return checkCycle(t, visited);
}

function checkCycle(t: Type, visited: Set<Type>): boolean {
  if (visited.has(t)) return true;
  visited.add(t);
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & (TypeFlags.Union | TypeFlags.Intersection)) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    for (const c of types) {
      if (checkCycle(c, visited)) return true;
    }
  }
  if ((flags & TypeFlags.Object) !== 0) {
    const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
    if (args !== undefined) {
      for (const a of args) {
        if (checkCycle(a, visited)) return true;
      }
    }
  }
  visited.delete(t);
  return false;
}

/**
 * Returns true when an alias symbol resolves back to itself.
 */
export function isAliasCycle(sym: AstSymbol): boolean {
  const visited = new Set<AstSymbol>();
  const walker = (current: AstSymbol): boolean => {
    if (visited.has(current)) return true;
    visited.add(current);
    const target = (current as unknown as { target?: AstSymbol }).target;
    if (target === undefined) return false;
    return walker(target);
  };
  return walker(sym);
}

/**
 * Returns true when a type alias references itself in its body.
 */
export function isSelfReferencingAlias(sym: AstSymbol): boolean {
  return (sym as unknown as { isSelfReferencing?: boolean }).isSelfReferencing === true;
}

/**
 * Returns the cycle path — the symbols in the alias-chain cycle.
 * Returns empty when no cycle.
 */
export function getAliasCyclePath(sym: AstSymbol): readonly AstSymbol[] {
  const path: AstSymbol[] = [];
  const visited = new Set<AstSymbol>();
  const walker = (current: AstSymbol): boolean => {
    if (visited.has(current)) {
      path.push(current);
      return true;
    }
    visited.add(current);
    path.push(current);
    const target = (current as unknown as { target?: AstSymbol }).target;
    if (target === undefined) return false;
    return walker(target);
  };
  if (walker(sym)) return path;
  return [];
}

/**
 * Returns true when the type's expansion would be infinite (deeply
 * recursive without a base case).
 */
export function isInfinitelyExpanding(t: Type): boolean {
  return hasCircularReference(t);
}
