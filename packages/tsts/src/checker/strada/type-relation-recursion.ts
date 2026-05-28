/**
 * Type-relation recursion guard.
 *
 * Ported from Strada `relater.go` — entering / leaving recursive
 * relations, detecting cycles when relating complex types.
 */

import type { Type } from "../types.js";

export interface RelationRecursionState {
  readonly active: ReadonlyMap<string, number>;
  readonly maxDepth: number;
  readonly depth: number;
}

const MaxRelationDepth = 100;

/**
 * Returns a fresh recursion state.
 */
export function newRelationRecursionState(): RelationRecursionState {
  return { active: new Map(), maxDepth: MaxRelationDepth, depth: 0 };
}

/**
 * Returns the relation key for a source/target pair.
 */
export function getRelationPairKey(source: Type, target: Type): string {
  const sId = (source as unknown as { id?: number }).id ?? 0;
  const tId = (target as unknown as { id?: number }).id ?? 0;
  return `${sId}<->${tId}`;
}

/**
 * Returns true when the pair is already being related (i.e. we're
 * in a cycle).
 */
export function isInRelation(
  state: RelationRecursionState,
  source: Type,
  target: Type,
): boolean {
  return state.active.has(getRelationPairKey(source, target));
}

/**
 * Enters a relation, marking the pair as active.
 */
export function enterRelation(
  state: RelationRecursionState,
  source: Type,
  target: Type,
): RelationRecursionState {
  const key = getRelationPairKey(source, target);
  const next = new Map(state.active);
  next.set(key, state.depth + 1);
  return { active: next, maxDepth: state.maxDepth, depth: state.depth + 1 };
}

/**
 * Leaves a relation.
 */
export function leaveRelation(
  state: RelationRecursionState,
  source: Type,
  target: Type,
): RelationRecursionState {
  const key = getRelationPairKey(source, target);
  const next = new Map(state.active);
  next.delete(key);
  return {
    active: next,
    maxDepth: state.maxDepth,
    depth: Math.max(0, state.depth - 1),
  };
}

/**
 * Returns true when the recursion has exceeded the max depth.
 */
export function hasExceededMaxDepth(state: RelationRecursionState): boolean {
  return state.depth > state.maxDepth;
}

/**
 * Returns the current depth.
 */
export function getDepth(state: RelationRecursionState): number {
  return state.depth;
}

/**
 * Returns the count of active relations.
 */
export function getActiveRelationCount(state: RelationRecursionState): number {
  return state.active.size;
}
