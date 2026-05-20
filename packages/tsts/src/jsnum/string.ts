/**
 * JS-spec string ↔ number conversion.
 *
 * Port of TS-Go internal/jsnum/string.go. JavaScript's native `Number(x)`
 * and `n.toString()` already implement the TC39 spec; we delegate where
 * possible and special-case the edge values.
 */

import { isWhiteSpaceLike } from "../stringutil/util.js";

/**
 * TC39 Number.prototype.toString equivalent.
 * https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-tostring
 *
 * JavaScript's `n.toString()` already implements this; we delegate to it.
 */
export function numberToString(n: number): string {
  if (Number.isNaN(n)) return "NaN";
  if (n === Infinity) return "Infinity";
  if (n === -Infinity) return "-Infinity";
  return n.toString();
}

/**
 * TC39 StringToNumber abstract operation.
 * https://tc39.es/ecma262/2024/multipage/abstract-operations.html#sec-stringtonumber
 *
 * Differs from JavaScript's `Number(s)` only in handling of literal
 * non-decimal forms (BigInt literal suffix `n`, etc.), which TSTS doesn't
 * need to support directly here.
 */
export function fromString(s: string): number {
  s = trimWhitespace(s);

  if (s === "") return 0;
  if (s === "Infinity" || s === "+Infinity") return Infinity;
  if (s === "-Infinity") return -Infinity;

  // Validate that all characters are valid in a JS number literal.
  for (let i = 0; i < s.length; i += 1) {
    if (!isNumberCharCode(s.charCodeAt(i))) return NaN;
  }

  // Try integer-only fast paths first (for hex/octal/binary).
  const integer = tryParseInt(s);
  if (integer !== undefined) return integer;

  // Strip sign for fractional/exponent parsing.
  let negative = false;
  if (s.startsWith("-")) {
    s = s.slice(1);
    negative = true;
  } else if (s.startsWith("+")) {
    s = s.slice(1);
  }

  // Must start with a digit or '.' after sign-stripping.
  if (s.length === 0) return NaN;
  const first = s.charCodeAt(0);
  if (!(first >= 0x30 && first <= 0x39) && first !== 0x2E) return NaN;

  const value = Number(s);
  if (Number.isNaN(value)) return NaN;

  // Preserve sign-of-zero behavior (`Number("-0")` should be -0).
  return negative ? -value : value;
}

function trimWhitespace(s: string): string {
  let start = 0;
  let end = s.length;
  while (start < end && isStrWhiteSpace(s.charCodeAt(start))) start += 1;
  while (end > start && isStrWhiteSpace(s.charCodeAt(end - 1))) end -= 1;
  return s.slice(start, end);
}

/**
 * Whitespace characters per TC39 StringToNumber. Differs slightly from
 * stringutil.isWhiteSpaceLike in line-terminator handling.
 */
function isStrWhiteSpace(ch: number): boolean {
  // TC39 includes LF, CR, LS, PS plus the Zs category and tab/VT/FF/NBSP/BOM.
  if (ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029) return true;
  return isWhiteSpaceLike(ch);
}

function isNumberCharCode(ch: number): boolean {
  // Digits 0-9
  if (ch >= 0x30 && ch <= 0x39) return true;
  // Hex digits (case-insensitive)
  if (ch >= 0x41 && ch <= 0x46) return true;
  if (ch >= 0x61 && ch <= 0x66) return true;
  // Sign, decimal point, exponent letters, base-indicator letters
  switch (ch) {
    case 0x2B: // +
    case 0x2D: // -
    case 0x2E: // .
    case 0x45: // E
    case 0x65: // e
    case 0x58: // X (for hex prefix)
    case 0x78: // x
    case 0x4F: // O (for octal prefix)
    case 0x6F: // o
    case 0x42: // B (for binary prefix)
    case 0x62: // b
      return true;
    default:
      return false;
  }
}

function tryParseInt(s: string): number | undefined {
  // Hex
  if (s.startsWith("0x") || s.startsWith("0X")) {
    const v = Number.parseInt(s.slice(2), 16);
    return Number.isFinite(v) ? v : NaN;
  }
  // Octal (modern: 0o or 0O)
  if (s.startsWith("0o") || s.startsWith("0O")) {
    const v = Number.parseInt(s.slice(2), 8);
    return Number.isFinite(v) ? v : NaN;
  }
  // Binary
  if (s.startsWith("0b") || s.startsWith("0B")) {
    const v = Number.parseInt(s.slice(2), 2);
    return Number.isFinite(v) ? v : NaN;
  }
  return undefined;
}
