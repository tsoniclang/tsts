/**
 * Symbol id assignment (stable per-session identity).
 *
 * Ported from Strada `checker.go` — getSymbolId, getNextSymbolId,
 * symbolToString-from-id.
 */

import type { Symbol as AstSymbol } from "../../ast/index.js";

/**
 * The id-counter state — pure: callers thread it through.
 */
export interface SymbolIdCounter {
  readonly nextId: number;
}

export function newSymbolIdCounter(): SymbolIdCounter {
  return { nextId: 1 };
}

/**
 * Returns the symbol's id, or undefined when not yet assigned.
 */
export function getSymbolIdValue(sym: AstSymbol): number | undefined {
  return (sym as unknown as { id?: number }).id;
}

/**
 * Returns a new counter with the id-counter incremented.
 */
export function incrementCounter(counter: SymbolIdCounter): SymbolIdCounter {
  return { nextId: counter.nextId + 1 };
}

/**
 * Assigns a fresh id to a symbol (mutation surface for the binder).
 *
 * Caveat: this is the one place in the strada/ split that mutates a
 * symbol's id field — mirroring Strada's approach. The pure shell
 * lives in the counter type; the assignment is intentionally scoped
 * here.
 */
export function assignNewId(
  counter: SymbolIdCounter,
  sym: AstSymbol,
): { counter: SymbolIdCounter; id: number } {
  const id = counter.nextId;
  // Mirror Strada's mutation of `Symbol.id`. The binder is the only
  // caller; symbols become read-only after binding.
  (sym as unknown as { id?: number }).id = id;
  return { counter: incrementCounter(counter), id };
}

/**
 * Returns true when the symbol has been assigned an id.
 */
export function hasSymbolId(sym: AstSymbol): boolean {
  return getSymbolIdValue(sym) !== undefined;
}

/**
 * Returns the current next id (for snapshotting).
 */
export function peekNextId(counter: SymbolIdCounter): number {
  return counter.nextId;
}
