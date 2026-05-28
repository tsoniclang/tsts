/**
 * Error-context chain construction.
 *
 * Ported from Strada `checker.go` — buildErrorContextChain,
 * appendChain, simplifyChain.
 *
 * Different from `error-context.ts` (low-level chain primitives).
 * This module builds chains for specific type-error scenarios.
 */

import type { Type } from "../types.js";

export interface ErrorContextEntry {
  readonly source: Type | undefined;
  readonly target: Type | undefined;
  readonly memberName: string | undefined;
  readonly errorCode: number;
  readonly messageTemplate: string;
}

export interface ErrorContextChain {
  readonly entries: readonly ErrorContextEntry[];
}

/**
 * Returns an empty error context chain.
 */
export function emptyChain(): ErrorContextChain {
  return { entries: [] };
}

/**
 * Appends an entry to the chain.
 */
export function appendEntry(
  chain: ErrorContextChain,
  entry: ErrorContextEntry,
): ErrorContextChain {
  return { entries: [...chain.entries, entry] };
}

/**
 * Returns the deepest entry — the most specific error context.
 */
export function getInnermostEntry(chain: ErrorContextChain): ErrorContextEntry | undefined {
  return chain.entries[chain.entries.length - 1];
}

/**
 * Returns the count of entries in the chain.
 */
export function chainLength(chain: ErrorContextChain): number {
  return chain.entries.length;
}

/**
 * Returns true when the chain is empty.
 */
export function isEmptyChain(chain: ErrorContextChain): boolean {
  return chain.entries.length === 0;
}

/**
 * Returns the chain reversed — for top-down rendering.
 */
export function reverseChain(chain: ErrorContextChain): ErrorContextChain {
  return { entries: [...chain.entries].reverse() };
}

/**
 * Simplifies the chain by removing duplicate consecutive entries.
 */
export function simplifyChain(chain: ErrorContextChain): ErrorContextChain {
  if (chain.entries.length === 0) return chain;
  const out: ErrorContextEntry[] = [chain.entries[0]!];
  for (let i = 1; i < chain.entries.length; i++) {
    const prev = out[out.length - 1]!;
    const curr = chain.entries[i]!;
    if (
      prev.source === curr.source &&
      prev.target === curr.target &&
      prev.memberName === curr.memberName &&
      prev.errorCode === curr.errorCode
    ) {
      continue;
    }
    out.push(curr);
  }
  return { entries: out };
}
