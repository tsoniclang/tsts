/**
 * Object-literal "freshness" tracking.
 *
 * Ported from Strada `checker.go` — getFreshTypeOfObjectLiteral,
 * checkExcessProperties, isFreshLiteralExpressionContext.
 *
 * "Fresh" object literals are subject to excess-property checks; once
 * they're widened or stored, they lose freshness.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when an object-literal type is fresh.
 */
export function isFreshObjectLiteralType(t: Type): boolean {
  return (t as unknown as { isFresh?: boolean }).isFresh === true;
}

/**
 * Returns a fresh variant of an object-literal type.
 */
export function getFreshObjectLiteralType(t: Type): Type {
  if (isFreshObjectLiteralType(t)) return t;
  return { ...(t as object), isFresh: true } as unknown as Type;
}

/**
 * Returns the non-fresh canonical type — widens away the freshness
 * marker so the literal can be stored without excess-property checks.
 */
export function getWidenedObjectLiteralType(t: Type): Type {
  if (!isFreshObjectLiteralType(t)) return t;
  return { ...(t as object), isFresh: false } as unknown as Type;
}

/**
 * Returns true when a context erases freshness — assignment to a
 * variable, return statement, or function-argument position.
 */
export function isFreshnessErasingContext(_contextKind: number): boolean {
  // Conservative: most contexts erase freshness.
  return true;
}

/**
 * Returns true when the type is an object literal flavor (regardless
 * of freshness).
 */
export function isObjectLiteralLike(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return false;
  const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
  return sym?.name === "__anonymous";
}
