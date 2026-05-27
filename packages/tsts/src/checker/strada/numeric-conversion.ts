/**
 * Numeric-literal parsing / formatting.
 *
 * Ported from Strada `utilities.go` (within `checker`) — parseNumericLiteral,
 * isNumericLiteralLikeString, formatNumericValue. Used during constant-
 * folding and enum-member evaluation.
 */

/**
 * Returns true when the string is a syntactically valid numeric
 * literal (excluding bigint).
 */
export function isNumericLiteralString(s: string): boolean {
  if (s.length === 0) return false;
  return /^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s);
}

/**
 * Returns true when the string is a valid bigint literal — digits
 * followed by `n`.
 */
export function isBigIntLiteralString(s: string): boolean {
  if (!s.endsWith("n")) return false;
  return /^[+-]?\d+n$/.test(s);
}

/**
 * Parses a numeric literal string. Returns NaN when invalid.
 */
export function parseNumericLiteral(s: string): number {
  if (!isNumericLiteralString(s)) return NaN;
  return Number(s);
}

/**
 * Formats a number as a canonical TS-style literal.
 */
export function formatNumericLiteral(value: number): string {
  if (Number.isInteger(value)) return value.toString();
  return value.toString();
}

/**
 * Returns true when the numeric value is safe to use as an array
 * index — non-negative integer within Number.MAX_SAFE_INTEGER.
 */
export function isValidArrayIndex(value: number): boolean {
  if (!Number.isInteger(value)) return false;
  if (value < 0) return false;
  return value < Number.MAX_SAFE_INTEGER;
}

/**
 * Returns true when the string is a valid base-2/8/16 integer prefix
 * literal (`0b`, `0o`, `0x`).
 */
export function isHexBinaryOctalLiteral(s: string): boolean {
  if (s.length < 3) return false;
  if (s[0] !== "0") return false;
  const c = s[1]!;
  return (
    c === "x" || c === "X" ||
    c === "o" || c === "O" ||
    c === "b" || c === "B"
  );
}

/**
 * Parses a hex/binary/octal literal.
 */
export function parseHexBinaryOctalLiteral(s: string): number {
  if (!isHexBinaryOctalLiteral(s)) return NaN;
  const prefix = s[1]!;
  const rest = s.slice(2);
  if (prefix === "x" || prefix === "X") return parseInt(rest, 16);
  if (prefix === "o" || prefix === "O") return parseInt(rest, 8);
  return parseInt(rest, 2);
}

/**
 * Returns true when the value is positive zero (and not negative
 * zero — which JS treats distinctly under `Object.is`).
 */
export function isPositiveZero(value: number): boolean {
  return value === 0 && 1 / value === Infinity;
}

/**
 * Returns true when the value is negative zero.
 */
export function isNegativeZero(value: number): boolean {
  return value === 0 && 1 / value === -Infinity;
}
