/**
 * Numeric-literal classification helpers.
 *
 * Ported from Strada `scanner/utilities.go` — classifies numeric
 * literals by their syntactic shape (decimal, hex, octal, binary,
 * bigint, exponent-bearing).
 */

export const NumericLiteralKind = {
  Decimal: 0,
  Hex: 1,
  Octal: 2,
  Binary: 3,
  BigInt: 4,
  ExponentDecimal: 5,
} as const;

export type NumericLiteralKind =
  | typeof NumericLiteralKind.Decimal
  | typeof NumericLiteralKind.Hex
  | typeof NumericLiteralKind.Octal
  | typeof NumericLiteralKind.Binary
  | typeof NumericLiteralKind.BigInt
  | typeof NumericLiteralKind.ExponentDecimal;

/**
 * Returns the kind of a numeric literal.
 */
export function classifyNumericLiteral(text: string): NumericLiteralKind | undefined {
  if (text.length === 0) return undefined;
  if (text.endsWith("n")) return NumericLiteralKind.BigInt;
  if (text.length >= 2 && text[0] === "0") {
    const prefix = text[1]!;
    if (prefix === "x" || prefix === "X") return NumericLiteralKind.Hex;
    if (prefix === "o" || prefix === "O") return NumericLiteralKind.Octal;
    if (prefix === "b" || prefix === "B") return NumericLiteralKind.Binary;
  }
  if (text.includes("e") || text.includes("E")) {
    return NumericLiteralKind.ExponentDecimal;
  }
  return NumericLiteralKind.Decimal;
}

/**
 * Returns true when the literal has digit separators (`_`).
 */
export function hasDigitSeparators(text: string): boolean {
  return text.includes("_");
}

/**
 * Returns the literal with digit separators stripped.
 */
export function stripDigitSeparators(text: string): string {
  return text.replace(/_/g, "");
}

/**
 * Returns the numeric value of a literal text.
 */
export function parseNumericLiteralText(text: string): number {
  const cleaned = stripDigitSeparators(text);
  if (cleaned.endsWith("n")) {
    return Number(cleaned.slice(0, -1));
  }
  return Number(cleaned);
}

/**
 * Returns true when the literal represents a safe-integer value
 * (within Number.MAX_SAFE_INTEGER).
 */
export function isSafeIntegerLiteral(text: string): boolean {
  const v = parseNumericLiteralText(text);
  return Number.isSafeInteger(v);
}

/**
 * Returns the canonical normalized representation of a literal.
 */
export function getNormalizedNumericLiteral(text: string): string {
  return stripDigitSeparators(text);
}
