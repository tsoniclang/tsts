/**
 * String utilities for parsing and emitting JavaScript.
 *
 * Port of TS-Go internal/stringutil/util.go.
 */

import type { int } from "@tsonic/core/types.js";

/** Unicode whitespace (single-line + line-break). */
export function isWhiteSpaceLike(ch: number): boolean {
  return isWhiteSpaceSingleLine(ch) || isLineBreak(ch);
}

/**
 * Unicode whitespace excluding line breaks. Matches TS-Go and TypeScript's
 * scanner; nextLine (U+0085) is whitespace but not a line break.
 */
export function isWhiteSpaceSingleLine(ch: number): boolean {
  switch (ch) {
    case 0x0020: // space
    case 0x0009: // tab
    case 0x000B: // verticalTab
    case 0x000C: // formFeed
    case 0x0085: // nextLine
    case 0x00A0: // nonBreakingSpace
    case 0x1680: // ogham
    case 0x2000: // enQuad
    case 0x2001: // emQuad
    case 0x2002: // enSpace
    case 0x2003: // emSpace
    case 0x2004: // threePerEmSpace
    case 0x2005: // fourPerEmSpace
    case 0x2006: // sixPerEmSpace
    case 0x2007: // figureSpace
    case 0x2008: // punctuationEmSpace
    case 0x2009: // thinSpace
    case 0x200A: // hairSpace
    case 0x200B: // zeroWidthSpace
    case 0x202F: // narrowNoBreakSpace
    case 0x205F: // mathematicalSpace
    case 0x3000: // ideographicSpace
    case 0xFEFF: // byteOrderMark
      return true;
    default:
      return false;
  }
}

/**
 * ES5 7.3 line terminators only:
 *
 line feed
 * carriage return
 *     line separator
 *     paragraph separator
 */
export function isLineBreak(ch: number): boolean {
  return ch === 0x000A || ch === 0x000D || ch === 0x2028 || ch === 0x2029;
}

export function isDigit(ch: number): boolean {
  return ch >= 0x30 && ch <= 0x39;
}

export function isOctalDigit(ch: number): boolean {
  return ch >= 0x30 && ch <= 0x37;
}

export function isHexDigit(ch: number): boolean {
  return (
    (ch >= 0x30 && ch <= 0x39) ||
    (ch >= 0x41 && ch <= 0x46) ||
    (ch >= 0x61 && ch <= 0x66)
  );
}

export function isASCIILetter(ch: number): boolean {
  return (ch >= 0x41 && ch <= 0x5A) || (ch >= 0x61 && ch <= 0x7A);
}

/**
 * Splits text on `\n`, `\r`, or `\r\n` line breaks. Returns the segments
 * without the separators. A trailing line break produces an empty final
 * segment only if there is text after it.
 */
export function splitLines(text: string): readonly string[] {
  const lines: string[] = [];
  let start = 0;
  let pos = 0;
  while (pos < text.length) {
    const ch = text.charCodeAt(pos);
    if (ch === 0x0D) {
      if (pos + 1 < text.length && text.charCodeAt(pos + 1) === 0x0A) {
        lines.push(text.slice(start, pos));
        pos += 2;
        start = pos;
        continue;
      }
      lines.push(text.slice(start, pos));
      pos += 1;
      start = pos;
      continue;
    }
    if (ch === 0x0A) {
      lines.push(text.slice(start, pos));
      pos += 1;
      start = pos;
      continue;
    }
    pos += 1;
  }
  if (start < text.length) {
    lines.push(text.slice(start));
  }
  return lines;
}

const MAX_SAFE_INT32 = 0x3FFF_FFFF;

/**
 * Guesses common leading-whitespace indentation across a list of lines.
 * Skips empty lines; returns the smallest indent that any non-empty line has.
 */
export function guessIndentation(lines: readonly string[]): number {
  let indentation = MAX_SAFE_INT32;
  for (const line of lines) {
    if (line.length === 0) continue;
    let i = 0;
    while (i < line.length && i < indentation) {
      if (!isWhiteSpaceLike(line.charCodeAt(i))) break;
      i += 1;
    }
    if (i < indentation) {
      indentation = i;
    }
    if (indentation === 0) return 0;
  }
  if (indentation === MAX_SAFE_INT32) return 0;
  return indentation;
}

// ────────────────────────────────────────────────────────────────────────────
// URI encoding
// ────────────────────────────────────────────────────────────────────────────

const UPPER_HEX = "0123456789ABCDEF";

function shouldEscapeForEncodeURI(ch: number): boolean {
  // Unreserved + reserved characters per RFC 3986 + TC39 encodeURI spec
  if (ch >= 0x41 && ch <= 0x5A) return false; // A-Z
  if (ch >= 0x61 && ch <= 0x7A) return false; // a-z
  if (ch >= 0x30 && ch <= 0x39) return false; // 0-9
  switch (ch) {
    case 0x3B: // ;
    case 0x2F: // /
    case 0x3F: // ?
    case 0x3A: // :
    case 0x40: // @
    case 0x26: // &
    case 0x3D: // =
    case 0x2B: // +
    case 0x24: // $
    case 0x2C: // ,
    case 0x23: // #
    case 0x2D: // -
    case 0x5F: // _
    case 0x2E: // .
    case 0x21: // !
    case 0x7E: // ~
    case 0x2A: // *
    case 0x27: // '
    case 0x28: // (
    case 0x29: // )
      return false;
    default:
      return true;
  }
}

export function isUriUnescapedByte(byte: int): boolean {
  return !shouldEscapeForEncodeURI(byte);
}

/** TC39 encodeURI semantics: percent-encode bytes that aren't unreserved/reserved. */
export function encodeURIBytes(s: string): string {
  // Operate on UTF-8 byte sequence — match Go behavior, which iterates bytes.
  // In JS, getting the byte sequence requires TextEncoder.
  const bytes = new TextEncoder().encode(s);
  let out = "";
  for (const b of bytes) {
    if (!shouldEscapeForEncodeURI(b)) {
      out += String.fromCharCode(b);
      continue;
    }
    out += percentEncodeByte(b);
  }
  return out;
}

export function encodeUri(text: string): string {
  return encodeURIBytes(text);
}

export function percentEncodeByte(byte: int): string {
  return "%" + UPPER_HEX[(byte >> 4) & 0xF] + UPPER_HEX[byte & 0xF];
}

// ────────────────────────────────────────────────────────────────────────────
// Byte Order Marks
// ────────────────────────────────────────────────────────────────────────────

function getByteOrderMarkLength(text: string): number {
  if (text.length < 1) return 0;
  const ch0 = text.charCodeAt(0);
  if (ch0 === 0xFE) {
    if (text.length >= 2 && text.charCodeAt(1) === 0xFF) return 2; // UTF-16BE
    return 0;
  }
  if (ch0 === 0xFF) {
    if (text.length >= 2 && text.charCodeAt(1) === 0xFE) return 2; // UTF-16LE
    return 0;
  }
  if (ch0 === 0xEF) {
    if (text.length >= 3 && text.charCodeAt(1) === 0xBB && text.charCodeAt(2) === 0xBF) {
      return 3; // UTF-8
    }
    return 0;
  }
  return 0;
}

export function removeByteOrderMark(text: string): string {
  const length = getByteOrderMarkLength(text);
  return length > 0 ? text.slice(length) : text;
}

export function hasByteOrderMark(text: string): boolean {
  return getByteOrderMarkLength(text) > 0;
}

export function addUTF8ByteOrderMark(text: string): string {
  return getByteOrderMarkLength(text) === 0 ? "﻿" + text : text;
}

export function addUtf8ByteOrderMark(text: string): string {
  return addUTF8ByteOrderMark(text);
}

// ────────────────────────────────────────────────────────────────────────────
// Quotes
// ────────────────────────────────────────────────────────────────────────────

export function stripQuotes(name: string): string {
  if (name.length < 2) return name;
  const firstChar = name[0]!;
  const lastChar = name[name.length - 1]!;
  if (firstChar === lastChar && (firstChar === "'" || firstChar === '"' || firstChar === "`")) {
    return name.slice(1, -1);
  }
  return name;
}

/**
 * Reproduces TS-Go's intentional Strada-compatibility quirk:
 * strip the outer quotes and replace any `\\X` with `X`.
 */
export function unquoteString(str: string): string {
  const inner = stripQuotes(str);
  return inner.replace(/\\(.)/g, (_match, p1: string) => p1);
}

export function lowerFirstChar(str: string): string {
  if (str.length === 0) return str;
  return str[0]!.toLowerCase() + str.slice(1);
}

/**
 * Truncate a string to a maximum length in Unicode code points (not UTF-16 units).
 */
export function truncateByRunes(str: string, maxLength: number): string {
  if (str.length < maxLength) return str;
  if (maxLength <= 0) return "";
  let codePoints = 0;
  let i = 0;
  while (i < str.length) {
    codePoints += 1;
    if (codePoints > maxLength) {
      return str.slice(0, i);
    }
    const cp = str.codePointAt(i)!;
    i += cp > 0xFFFF ? 2 : 1;
  }
  return str;
}
