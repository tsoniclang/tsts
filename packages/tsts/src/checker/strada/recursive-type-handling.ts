/**
 * Recursive-type cycle detection.
 *
 * Ported from Strada `checker.go` — isCircularType, resolveStructuredType
 * with cycle detection, breakRecursion / restoreRecursionDepth.
 *
 * Used to avoid infinite recursion when resolving self-referential
 * generics like `type T<A> = { x: A; rest: T<A> }`.
 */

import type { Type } from "../types.js";

/**
 * Tracks per-resolution recursion depth. The depth limit prevents
 * runaway resolution of pathological self-referential types.
 */
export interface RecursionTracker {
  readonly visiting: ReadonlySet<unknown>;
  readonly depth: number;
}

export function newRecursionTracker(): RecursionTracker {
  return { visiting: new Set(), depth: 0 };
}

/**
 * Returns a new tracker with `key` marked as visiting and depth +1.
 */
export function enter(tracker: RecursionTracker, key: unknown): RecursionTracker {
  const next = new Set(tracker.visiting);
  next.add(key);
  return { visiting: next, depth: tracker.depth + 1 };
}

/**
 * Returns a new tracker with `key` removed from the visiting set
 * and depth -1.
 */
export function leave(tracker: RecursionTracker, key: unknown): RecursionTracker {
  const next = new Set(tracker.visiting);
  next.delete(key);
  return { visiting: next, depth: Math.max(0, tracker.depth - 1) };
}

/**
 * Returns true when the key is currently being resolved.
 */
export function isVisiting(tracker: RecursionTracker, key: unknown): boolean {
  return tracker.visiting.has(key);
}

/**
 * The maximum allowed recursion depth before resolution bails.
 * Mirrors the upstream limit.
 */
export const MaxRecursionDepth = 64;

/**
 * Returns true when the tracker has exceeded the recursion limit.
 */
export function hasExceededLimit(tracker: RecursionTracker): boolean {
  return tracker.depth > MaxRecursionDepth;
}

/**
 * Returns true when the type has a self-referential cycle in its
 * direct constituent chain. Conservative shell: returns false until
 * the resolver tracks parent-child relationships.
 */
export function isStructurallyRecursive(_t: Type): boolean {
  return false;
}
