/**
 * String coercion semantics.
 *
 * Ported from Strada `checker.go` — string-concatenation operand
 * coercion, template-literal interpolation, JSX attribute coercion.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the type is freely coercible to string at runtime
 * (string concatenation context).
 */
export function isStringCoercible(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (
    (flags & (
      TypeFlags.String |
      TypeFlags.Number |
      TypeFlags.Boolean |
      TypeFlags.BigInt |
      TypeFlags.StringLiteral |
      TypeFlags.NumberLiteral |
      TypeFlags.BooleanLiteral |
      TypeFlags.BigIntLiteral |
      TypeFlags.Any |
      TypeFlags.Unknown
    )) !== 0
  );
}

/**
 * Returns the canonical string-coercion result type for a binary `+`
 * with at least one string operand. Always string.
 */
export function getStringConcatResultType(): Type {
  return { flags: TypeFlags.String } as unknown as Type;
}

/**
 * Returns true when the type cannot be safely concatenated to a
 * string (e.g. void, never, symbol without explicit toString).
 */
export function isProblematicForStringConcat(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  return (
    (flags & (TypeFlags.Void | TypeFlags.Never | TypeFlags.ESSymbol)) !== 0
  );
}

/**
 * Returns the literal value rendered as a string, for type-level
 * concatenation of string-literal types.
 */
export function renderLiteralValueAsString(t: Type): string | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) !== 0) {
    return (t as unknown as { value?: string }).value;
  }
  if ((flags & TypeFlags.NumberLiteral) !== 0) {
    const v = (t as unknown as { value?: number }).value;
    return v !== undefined ? String(v) : undefined;
  }
  if ((flags & TypeFlags.BooleanLiteral) !== 0) {
    const v = (t as unknown as { value?: boolean }).value;
    return v !== undefined ? String(v) : undefined;
  }
  return undefined;
}

/**
 * Returns true when both operands are literal types whose concat can
 * be computed statically.
 */
export function canComputeStaticConcat(a: Type, b: Type): boolean {
  return (
    renderLiteralValueAsString(a) !== undefined &&
    renderLiteralValueAsString(b) !== undefined
  );
}

/**
 * Returns the string-literal type for the static-concat result.
 */
export function staticConcat(a: Type, b: Type): Type | undefined {
  const av = renderLiteralValueAsString(a);
  const bv = renderLiteralValueAsString(b);
  if (av === undefined || bv === undefined) return undefined;
  return { flags: TypeFlags.StringLiteral, value: av + bv } as unknown as Type;
}
