/**
 * PseudoBigInt — JS-style bigint backed by a string.
 *
 * Port of TS-Go `internal/jsnum/pseudobigint.go` (66 LoC).
 * Stores absolute value as base-10 string (no leading zeros) plus a
 * negative-sign flag. The zero value is `{ negative: false, base10Value: "" }`.
 */

export interface PseudoBigInt {
  readonly negative: boolean;
  readonly base10Value: string;
}

export const ZERO_PSEUDO_BIG_INT: PseudoBigInt = { negative: false, base10Value: "" };

export function newPseudoBigInt(value: string, negative: boolean): PseudoBigInt {
  const trimmed = trimLeadingZeros(value);
  return { negative: negative && trimmed.length !== 0, base10Value: trimmed };
}

export function pseudoBigIntToString(value: PseudoBigInt): string {
  if (value.base10Value.length === 0) return "0";
  if (value.negative) return "-" + value.base10Value;
  return value.base10Value;
}

export function pseudoBigIntSign(value: PseudoBigInt): number {
  if (value.base10Value.length === 0) return 0;
  return value.negative ? -1 : 1;
}

export function parseValidBigInt(text: string): PseudoBigInt {
  let negative = false;
  let t = text;
  if (t.startsWith("-")) {
    negative = true;
    t = t.slice(1);
  }
  return newPseudoBigInt(parsePseudoBigInt(t), negative);
}

export function parsePseudoBigInt(stringValue: string): string {
  let s = stringValue;
  if (s.endsWith("n")) s = s.slice(0, -1);
  const b1 = s.length > 1 ? s[1] : "";
  if (b1 === "b" || b1 === "B" || b1 === "o" || b1 === "O" || b1 === "x" || b1 === "X") {
    // hex / binary / octal — use BigInt parser
    try {
      const bi = BigInt(s);
      return bi.toString(10);
    } catch {
      throw new Error(`Failed to parse big int: ${JSON.stringify(s)}`);
    }
  }
  const trimmed = trimLeadingZeros(s);
  return trimmed === "" ? "0" : trimmed;
}

function trimLeadingZeros(s: string): string {
  let i = 0;
  while (i < s.length && s[i] === "0") i++;
  if (i === 0) return s;
  if (i === s.length) return "0";
  return s.slice(i);
}
