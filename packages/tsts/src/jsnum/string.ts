/**
 * JS-spec string <-> number conversion.
 *
 * Port of TS-Go internal/jsnum/string.go.
 *
 * Faithful 1:1 translation of TS-Go's hand-rolled parser. Rather than
 * delegating to JavaScript's native `Number(s)` / `Number.parseInt`, this
 * reproduces TS-Go's strategy of breaking the number apart and fixing it up
 * such that a single trusted float parse can handle it. This matters for
 * parity: TS-Go rejects malformed base digits (e.g. `0b1012` -> NaN) via
 * explicit per-base validation, whereas `Number.parseInt` would stop at the
 * bad digit and yield a partial value.
 */

import { isDigit, isHexDigit, isOctalDigit } from "../stringutil/util.js";

/**
 * TC39 Number.prototype.toString equivalent.
 * https://tc39.es/ecma262/2024/multipage/ecmascript-data-types-and-values.html#sec-numeric-types-number-tostring
 */
export function numberToString(n: number): string {
  if (Number.isNaN(n)) return "NaN";
  if (!Number.isFinite(n)) return n < 0 ? "-Infinity" : "Infinity";

  // Fast path: for safe integers, directly convert to string.
  if (minSafeInteger <= n && n <= maxSafeInteger) {
    const i = Math.trunc(n);
    if (i === n) return i.toString();
  }

  // Otherwise, JavaScript's `Number.prototype.toString` produces the shortest
  // round-trippable representation, matching Go's json.Marshal of a float64.
  return n.toString();
}

const maxSafeInteger = Number.MAX_SAFE_INTEGER;
const minSafeInteger = -Number.MAX_SAFE_INTEGER;

/**
 * TC39 StringToNumber abstract operation.
 * https://tc39.es/ecma262/2024/multipage/abstract-operations.html#sec-stringtonumber
 */
export function fromString(s: string): number {
  const trimmed = trimFunc(s, isStrWhiteSpace);

  switch (trimmed) {
    case "":
      return 0;
    case "Infinity":
    case "+Infinity":
      return Infinity;
    case "-Infinity":
      return -Infinity;
  }

  for (let i = 0; i < trimmed.length; i += 1) {
    if (!isNumberRune(trimmed.charCodeAt(i))) {
      return NaN;
    }
  }

  const parsedInt = tryParseInt(trimmed);
  if (parsedInt !== undefined) {
    return parsedInt;
  }

  // Cut the sign off first so we can ensure -0 is returned as -0.
  const cutMinus = cutPrefix(trimmed, "-");
  const negative = cutMinus.found;
  const afterSign = negative ? cutMinus.after : cutPrefix(trimmed, "+").after;

  const first = afterSign.length > 0 ? afterSign.charCodeAt(0) : -1;
  if (!isDigit(first) && first !== 0x2e /* . */) {
    return NaN;
  }

  const f = parseFloatString(afterSign);
  if (Number.isNaN(f)) {
    return NaN;
  }

  const sign = negative ? -1.0 : 1.0;
  return copysign(f, sign);
}

/**
 * Whitespace per TS-Go's `isStrWhiteSpace`. This is intentionally different
 * from stringutil.isWhiteSpaceLike: it matches TC39 StringToNumber's
 * LineTerminator + WhiteSpace productions.
 */
function isStrWhiteSpace(r: number): boolean {
  // https://tc39.es/ecma262/2024/multipage/ecmascript-language-lexical-grammar.html#prod-LineTerminator
  // https://tc39.es/ecma262/2024/multipage/ecmascript-language-lexical-grammar.html#prod-WhiteSpace
  switch (r) {
    // LineTerminator
    case 0x0a: // \n
    case 0x0d: // \r
    case 0x2028:
    case 0x2029:
      return true;
    // WhiteSpace
    case 0x09: // \t
    case 0x0b: // \v
    case 0x0c: // \f
    case 0xfeff:
      return true;
  }

  // WhiteSpace: the Unicode Zs (Space_Separator) category.
  return isZs(r);
}

/** Mirrors Go's `unicode.Is(unicode.Zs, r)`: the Space_Separator category. */
function isZs(r: number): boolean {
  switch (r) {
    case 0x0020:
    case 0x00a0:
    case 0x1680:
    case 0x2000:
    case 0x2001:
    case 0x2002:
    case 0x2003:
    case 0x2004:
    case 0x2005:
    case 0x2006:
    case 0x2007:
    case 0x2008:
    case 0x2009:
    case 0x200a:
    case 0x202f:
    case 0x205f:
    case 0x3000:
      return true;
    default:
      return false;
  }
}

function tryParseInt(s: string): number | undefined {
  if (s.length > 2) {
    const prefix = s.slice(0, 2);
    const rest = s.slice(2);
    switch (prefix) {
      case "0b":
      case "0B":
        if (!isAllBinaryDigits(rest)) {
          return NaN;
        }
        return parseIntInBase(rest, 2);
      case "0o":
      case "0O":
        if (!isAllOctalDigits(rest)) {
          return NaN;
        }
        return parseIntInBase(rest, 8);
      case "0x":
      case "0X":
        if (!isAllHexDigits(rest)) {
          return NaN;
        }
        return parseIntInBase(rest, 16);
    }
  }

  // StringToNumber does not parse leading zeros as octal.
  const decimal = trimLeadingZeros(s);
  if (!isAllDigits(decimal)) {
    return undefined;
  }
  return parseIntInBase(decimal, 10);
}

/**
 * Parses an integer string in the given base, falling back to BigInt for
 * large integers (mirrors Go's strconv.ParseInt + big.Int.Float64 fallback).
 */
function parseIntInBase(s: string, base: 2 | 8 | 10 | 16): number {
  // Go uses `int64` (signed 64-bit). Values that fit yield an exact result.
  // Beyond that, Go falls back to big.Int -> Float64. JavaScript's BigInt
  // gives us arbitrary precision, and `Number(bigint)` performs the same
  // round-to-nearest float64 conversion. The string is already validated to
  // contain only valid digits for `base`, so BigInt parsing cannot fail.
  const prefix = base === 2 ? "0b" : base === 8 ? "0o" : base === 16 ? "0x" : "";
  const big = BigInt(prefix + s);
  return Number(big);
}

function parseFloatString(s: string): number {
  // <a>
  // <a>.<b>
  // <a>.<b>e<c>
  // <a>e<c>
  const dotCut = cut(s, ".");
  const hasDot = dotCut.found;

  const expSource = hasDot ? dotCut.after : s;
  const expCut = cutAny(expSource, "eE");
  const hasExp = expCut.found;

  const a = hasDot ? dotCut.before : expCut.before;
  const b = hasDot ? expCut.before : "";
  const c = hasExp ? expCut.after : "";

  let sb = "";

  if (a === "") {
    if (hasDot && b === "") {
      return NaN;
    }
    if (hasExp && c === "") {
      return NaN;
    }
    sb += "0";
  } else {
    const trimmedA = trimLeadingZeros(a);
    if (!isAllDigits(trimmedA)) {
      return NaN;
    }
    sb += trimmedA;
  }

  if (hasDot) {
    sb += ".";
    if (b === "") {
      sb += "0";
    } else {
      const trimmedB = trimTrailingZeros(b);
      if (!isAllDigits(trimmedB)) {
        return NaN;
      }
      sb += trimmedB;
    }
  }

  if (hasExp) {
    sb += "e";

    const cMinus = cutPrefix(c, "-");
    const expNegative = cMinus.found;
    const cBody = expNegative ? cMinus.after : cutPrefix(c, "+").after;
    if (expNegative) {
      sb += "-";
    }
    const trimmedC = trimLeadingZeros(cBody);
    if (!isAllDigits(trimmedC)) {
      return NaN;
    }
    sb += trimmedC;
  }

  return stringToFloat64(sb);
}

interface CutResult {
  readonly before: string;
  readonly after: string;
  readonly found: boolean;
}

/** Mirrors Go's strings.Cut. */
function cut(s: string, sep: string): CutResult {
  const i = s.indexOf(sep);
  if (i >= 0) {
    return { before: s.slice(0, i), after: s.slice(i + sep.length), found: true };
  }
  return { before: s, after: "", found: false };
}

/** Mirrors Go's helper `cutAny`: cut at the first rune in `cutset`. */
function cutAny(s: string, cutset: string): CutResult {
  for (let i = 0; i < s.length; i += 1) {
    if (cutset.indexOf(s[i]!) >= 0) {
      return { before: s.slice(0, i), after: s.slice(i + 1), found: true };
    }
  }
  return { before: s, after: "", found: false };
}

/** Mirrors Go's strings.CutPrefix. */
function cutPrefix(s: string, prefix: string): { readonly after: string; readonly found: boolean } {
  if (s.startsWith(prefix)) {
    return { after: s.slice(prefix.length), found: true };
  }
  return { after: s, found: false };
}

function trimLeadingZeros(s: string): string {
  if (s.startsWith("0")) {
    let i = 0;
    while (i < s.length && s.charCodeAt(i) === 0x30) i += 1;
    const trimmed = s.slice(i);
    if (trimmed === "") {
      return "0";
    }
    return trimmed;
  }
  return s;
}

function trimTrailingZeros(s: string): string {
  if (s.endsWith("0")) {
    let end = s.length;
    while (end > 0 && s.charCodeAt(end - 1) === 0x30) end -= 1;
    const trimmed = s.slice(0, end);
    if (trimmed === "") {
      return "0";
    }
    return trimmed;
  }
  return s;
}

/**
 * Mirrors Go's stringToFloat64. The input has already been normalized into a
 * canonical decimal form (`<a>`, `<a>.<b>`, `<a>.<b>e<c>`), so JavaScript's
 * `Number` parses it exactly as Go's strconv.ParseFloat would. Out-of-range
 * magnitudes overflow to +/-Infinity, matching Go's ErrRange behavior.
 */
function stringToFloat64(s: string): number {
  const f = Number(s);
  if (!Number.isNaN(f)) {
    return f;
  }
  return NaN;
}

/** Mirrors Go's strings.TrimFunc. */
function trimFunc(s: string, predicate: (r: number) => boolean): string {
  let start = 0;
  let end = s.length;
  while (start < end && predicate(s.charCodeAt(start))) start += 1;
  while (end > start && predicate(s.charCodeAt(end - 1))) end -= 1;
  return s.slice(start, end);
}

function isAllDigits(s: string): boolean {
  for (let i = 0; i < s.length; i += 1) {
    if (!isDigit(s.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}

function isAllBinaryDigits(s: string): boolean {
  for (let i = 0; i < s.length; i += 1) {
    const r = s.charCodeAt(i);
    if (r !== 0x30 /* 0 */ && r !== 0x31 /* 1 */) {
      return false;
    }
  }
  return true;
}

function isAllOctalDigits(s: string): boolean {
  for (let i = 0; i < s.length; i += 1) {
    if (!isOctalDigit(s.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}

function isAllHexDigits(s: string): boolean {
  for (let i = 0; i < s.length; i += 1) {
    if (!isHexDigit(s.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}

function isNumberRune(r: number): boolean {
  if (isDigit(r)) {
    return true;
  }

  if (0x61 /* a */ <= r && r <= 0x66 /* f */) {
    return true;
  }

  if (0x41 /* A */ <= r && r <= 0x46 /* F */) {
    return true;
  }

  switch (r) {
    case 0x2e: // .
    case 0x2d: // -
    case 0x2b: // +
    case 0x78: // x
    case 0x58: // X
    case 0x6f: // o
    case 0x4f: // O
      return true;
  }

  return false;
}

/** Mirrors Go's math.Copysign. */
function copysign(f: number, sign: number): number {
  const magnitude = Math.abs(f);
  // Use Math.sign of the sign argument; preserve -0 via Object.is on the result.
  return sign < 0 || Object.is(sign, -0) ? -magnitude : magnitude;
}
