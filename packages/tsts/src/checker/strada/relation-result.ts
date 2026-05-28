/**
 * Type-relation result records.
 *
 * Ported from Strada `relater.go` — RelationResult, RelationKind,
 * combineRelationResults.
 */

import type { Type } from "../types.js";

export const RelationKind = {
  Assignable: 0,
  Subtype: 1,
  StrictSubtype: 2,
  Identical: 3,
  Comparable: 4,
} as const;

export type RelationKind =
  | typeof RelationKind.Assignable
  | typeof RelationKind.Subtype
  | typeof RelationKind.StrictSubtype
  | typeof RelationKind.Identical
  | typeof RelationKind.Comparable;

export interface RelationResult {
  readonly related: boolean;
  readonly reasonCode?: number | undefined;
  readonly source: Type;
  readonly target: Type;
}

/**
 * Returns a successful relation result.
 */
export function relationOk(source: Type, target: Type): RelationResult {
  return { related: true, source, target };
}

/**
 * Returns a failed relation result with a reason code.
 */
export function relationFail(
  source: Type,
  target: Type,
  reasonCode: number,
): RelationResult {
  return { related: false, reasonCode, source, target };
}

/**
 * Returns true when every result is successful.
 */
export function allRelated(results: readonly RelationResult[]): boolean {
  return results.every((r) => r.related);
}

/**
 * Returns true when at least one result is successful.
 */
export function anyRelated(results: readonly RelationResult[]): boolean {
  return results.some((r) => r.related);
}

/**
 * Returns the canonical name of a relation kind.
 */
export function relationKindName(kind: RelationKind): string {
  switch (kind) {
    case RelationKind.Assignable: return "assignable";
    case RelationKind.Subtype: return "subtype";
    case RelationKind.StrictSubtype: return "strict-subtype";
    case RelationKind.Identical: return "identical";
    case RelationKind.Comparable: return "comparable";
    default: return "unknown";
  }
}

/**
 * Returns true when one relation kind implies another (e.g.
 * Identical implies Subtype and Assignable).
 */
export function relationImplies(a: RelationKind, b: RelationKind): boolean {
  if (a === b) return true;
  if (a === RelationKind.Identical) return true;
  if (a === RelationKind.StrictSubtype && b === RelationKind.Subtype) return true;
  if (a === RelationKind.Subtype && b === RelationKind.Assignable) return true;
  return false;
}
