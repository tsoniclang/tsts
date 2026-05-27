/**
 * Literal-type coercion to wider primitives.
 *
 * Ported from Strada `checker.go` — getCoercedLiteralType,
 * isAssignableToLiteralContext.
 *
 * Distinct from `widening.ts` — focuses on coercion in specific
 * contexts (e.g. union with `string` widens a `"foo"` literal).
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when a literal type would coerce to its base in the
 * given context (annotation type).
 */
export function shouldCoerceInContext(
  literal: Type,
  contextType: Type,
): boolean {
  const lf = (literal as { flags?: number }).flags ?? 0;
  if ((lf & TypeFlags.Literal) === 0) return false;
  const cf = (contextType as { flags?: number }).flags ?? 0;
  // If the context is the wider primitive, coerce.
  if ((lf & TypeFlags.StringLiteral) !== 0) return (cf & TypeFlags.String) !== 0;
  if ((lf & TypeFlags.NumberLiteral) !== 0) return (cf & TypeFlags.Number) !== 0;
  if ((lf & TypeFlags.BooleanLiteral) !== 0) return (cf & TypeFlags.Boolean) !== 0;
  if ((lf & TypeFlags.BigIntLiteral) !== 0) return (cf & TypeFlags.BigInt) !== 0;
  return false;
}

/**
 * Returns the coerced type — the widened base if coercion applies,
 * else the literal unchanged.
 */
export function coerceLiteralIfNeeded(
  literal: Type,
  contextType: Type,
): Type {
  if (!shouldCoerceInContext(literal, contextType)) return literal;
  const lf = (literal as { flags?: number }).flags ?? 0;
  if ((lf & TypeFlags.StringLiteral) !== 0) {
    return { flags: TypeFlags.String } as unknown as Type;
  }
  if ((lf & TypeFlags.NumberLiteral) !== 0) {
    return { flags: TypeFlags.Number } as unknown as Type;
  }
  if ((lf & TypeFlags.BooleanLiteral) !== 0) {
    return { flags: TypeFlags.Boolean } as unknown as Type;
  }
  if ((lf & TypeFlags.BigIntLiteral) !== 0) {
    return { flags: TypeFlags.BigInt } as unknown as Type;
  }
  return literal;
}

/**
 * Returns true when the literal value is the canonical "zero" of its
 * type (`""`, `0`, `false`, `0n`, `null`, `undefined`).
 */
export function isZeroLiteral(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) !== 0) {
    return (t as unknown as { value?: string }).value === "";
  }
  if ((flags & TypeFlags.NumberLiteral) !== 0) {
    return (t as unknown as { value?: number }).value === 0;
  }
  if ((flags & TypeFlags.BooleanLiteral) !== 0) {
    return (t as unknown as { value?: boolean }).value === false;
  }
  if ((flags & TypeFlags.BigIntLiteral) !== 0) {
    return (t as unknown as { value?: string }).value === "0";
  }
  return false;
}
