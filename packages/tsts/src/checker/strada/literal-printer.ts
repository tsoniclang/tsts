/**
 * Literal-value rendering for diagnostics.
 *
 * Ported from Strada `printer.go` (within `checker`) —
 * literalValueToString, escapeLiteralForDisplay.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
import { getLiteralValue } from "./literal-type-helpers.js";

/**
 * Returns the display string for a literal type's value.
 */
export function renderLiteralValue(t: Type): string {
  const flags = (t as { flags?: number }).flags ?? 0;
  const value = getLiteralValue(t);
  if (value === undefined) return "<unknown literal>";

  if ((flags & TypeFlags.StringLiteral) !== 0) {
    return JSON.stringify(value);
  }
  if ((flags & TypeFlags.NumberLiteral) !== 0) {
    return String(value);
  }
  if ((flags & TypeFlags.BooleanLiteral) !== 0) {
    return value ? "true" : "false";
  }
  if ((flags & TypeFlags.BigIntLiteral) !== 0) {
    return String(value) + "n";
  }
  return String(value);
}

/**
 * Escapes a string literal value for safe display in diagnostics
 * (escaping quotes, backslashes, control characters).
 */
export function escapeForDiagnosticDisplay(text: string): string {
  return JSON.stringify(text);
}

/**
 * Returns the display string of a literal type using single-quote
 * convention for strings.
 */
export function renderLiteralValueWithSingleQuote(t: Type): string {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) === 0) {
    return renderLiteralValue(t);
  }
  const value = (t as unknown as { value?: string }).value ?? "";
  const escaped = value
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t");
  return "'" + escaped + "'";
}

/**
 * Renders a literal value with truncation past N characters.
 */
export function renderTruncatedLiteralValue(t: Type, maxLength = 60): string {
  const full = renderLiteralValue(t);
  if (full.length <= maxLength) return full;
  return full.slice(0, maxLength - 3) + "...";
}
