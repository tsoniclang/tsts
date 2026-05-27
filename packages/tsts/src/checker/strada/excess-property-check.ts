/**
 * Excess-property checking for object literals.
 *
 * Ported from Strada `checker.go` — checkExcessProperties,
 * getPropertyDeclarationsOfType, hasExcessProperty.
 *
 * Detects properties present in a fresh literal that the target
 * type doesn't declare — a common source of type errors.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns the property names declared on a type.
 */
export function getDeclaredPropertyNames(t: Type): readonly string[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return [];
  const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return [];
  return [...members.keys()];
}

/**
 * Returns true when the target type has an index signature that
 * absorbs unknown properties.
 */
export function hasIndexSignature(t: Type): boolean {
  const sym = (t as unknown as { symbol?: { hasIndexSignature?: boolean } }).symbol;
  return sym?.hasIndexSignature === true;
}

/**
 * Returns the list of source property names that are not present in
 * the target's declared properties.
 */
export function findExcessProperties(
  sourceProps: readonly string[],
  target: Type,
): readonly string[] {
  if (hasIndexSignature(target)) return [];
  const declared = new Set(getDeclaredPropertyNames(target));
  return sourceProps.filter((n) => !declared.has(n));
}

/**
 * Returns true when there are any excess properties.
 */
export function hasExcessProperty(
  sourceProps: readonly string[],
  target: Type,
): boolean {
  return findExcessProperties(sourceProps, target).length > 0;
}

/**
 * Returns a "did you mean" suggestion — the closest declared
 * property by Levenshtein distance, capped at 3 edits.
 */
export function suggestPropertyName(
  source: string,
  target: Type,
): string | undefined {
  const declared = getDeclaredPropertyNames(target);
  let best: string | undefined;
  let bestDist = Infinity;
  for (const name of declared) {
    const d = levenshtein(source, name);
    if (d < bestDist) {
      bestDist = d;
      best = name;
    }
  }
  if (bestDist > 3) return undefined;
  return best;
}

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const rows: number[][] = Array.from(
    { length: a.length + 1 },
    () => Array<number>(b.length + 1).fill(0),
  );
  for (let i = 0; i <= a.length; i++) rows[i]![0] = i;
  for (let j = 0; j <= b.length; j++) rows[0]![j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      rows[i]![j] = Math.min(
        rows[i - 1]![j]! + 1,
        rows[i]![j - 1]! + 1,
        rows[i - 1]![j - 1]! + cost,
      );
    }
  }
  return rows[a.length]![b.length]!;
}
