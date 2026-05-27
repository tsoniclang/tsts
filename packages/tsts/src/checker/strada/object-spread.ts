/**
 * Object-spread semantics (`{ ...a, ...b }`).
 *
 * Ported from Strada `checker.go` — getObjectSpreadType,
 * applySpreadInLiteral, isSpreadable.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when a type can be spread into an object literal —
 * Any/Unknown/Object/Intersection types can; primitives cannot.
 */
export function isObjectSpreadable(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Any) !== 0) return true;
  if ((flags & TypeFlags.Unknown) !== 0) return true;
  if ((flags & TypeFlags.Object) !== 0) return true;
  if ((flags & TypeFlags.Intersection) !== 0) return true;
  return false;
}

/**
 * Merges two property tables — `b`'s properties override `a`'s.
 */
export function mergeObjectMembers(
  a: Map<string, AstSymbol>,
  b: Map<string, AstSymbol>,
): Map<string, AstSymbol> {
  const out = new Map(a);
  for (const [name, sym] of b) out.set(name, sym);
  return out;
}

/**
 * Returns the spread-result type for two object types — last write
 * wins for matching property names.
 */
export function spreadObjectTypes(a: Type, b: Type): Type {
  if (!isObjectSpreadable(a)) return b;
  if (!isObjectSpreadable(b)) return a;
  const aMembers = (a as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  const bMembers = (b as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  const merged = mergeObjectMembers(aMembers ?? new Map(), bMembers ?? new Map());
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__anonymous", members: merged },
  } as unknown as Type;
}

/**
 * Returns the spread-result type for a list of spread sources —
 * applies them in order with last-write-wins semantics.
 */
export function spreadObjects(sources: readonly Type[]): Type {
  if (sources.length === 0) {
    return { flags: TypeFlags.Object, symbol: { name: "__empty" } } as unknown as Type;
  }
  return sources.reduce(spreadObjectTypes);
}

/**
 * Returns true when an object literal's spread sources can be
 * statically merged (all spreadable).
 */
export function canStaticallyMerge(sources: readonly Type[]): boolean {
  return sources.every(isObjectSpreadable);
}

/**
 * Returns the merged-property names from a spread chain.
 */
export function getMergedPropertyNames(sources: readonly Type[]): readonly string[] {
  const out = new Set<string>();
  for (const s of sources) {
    const members = (s as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    if (members === undefined) continue;
    for (const name of members.keys()) out.add(name);
  }
  return [...out];
}
