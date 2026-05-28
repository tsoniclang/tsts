/**
 * Trivia scanning and position helpers.
 *
 * Faithful port of the standalone (parser-decoupled) helpers from
 * TS-Go `internal/scanner/scanner.go`:
 *   - couldStartTrivia / SkipTrivia / SkipTriviaEx
 *   - isConflictMarkerTrivia / scanConflictMarkerTrivia
 *   - isShebangTrivia / scanShebangTrivia / GetShebang
 *   - ComputeLineOfPosition / ComputePositionOfLineAndUTF16Character
 *   - GetECMALineStarts / GetECMALineOfPosition /
 *     GetECMALineAndUTF16CharacterOfPosition /
 *     GetECMALineAndByteOffsetOfPosition (over ast.SourceFileLike)
 *
 * These are pure free functions over (string, number[, options]) — zero
 * coupling to the Scanner state machine. JS strings are natively UTF-16, so
 * the byte-oriented `utf8.DecodeRuneInString` iteration in the Go original is
 * mirrored here as UTF-16 code-unit / code-point iteration.
 */

import * as debug from "../debug/index.js";
import type { DiagnosticMessage } from "../diagnostics/types.js";
import { Diagnostics } from "../diagnostics/diagnostics_generated.js";
import { isLineBreak, isWhiteSpaceLike } from "../stringutil/util.js";
import type { TextPos, UTF16Offset } from "../core/index.js";

// ---------------------------------------------------------------------------
// SourceFileLike — the minimal surface the ECMA* helpers read.
//
// Faithful to ast.SourceFileLike (ast/ast.go:2921): only the public Text() and
// ECMALineMap() accessors. Implemented as an interface here so callers can pass
// any value exposing those accessors without depending on the concrete AST.
// ---------------------------------------------------------------------------

export interface SourceFileLike {
  text(): string;
  ecmaLineMap(): readonly TextPos[];
}

// ---------------------------------------------------------------------------
// PositionIsSynthesized
// ---------------------------------------------------------------------------

function positionIsSynthesized(pos: number): boolean {
  // See ast.PositionIsSynthesized: a synthesized position is negative.
  return !(pos >= 0);
}

// ---------------------------------------------------------------------------
// couldStartTrivia / SkipTrivia / SkipTriviaEx (scanner.go:2243-2355)
// ---------------------------------------------------------------------------

// All conflict markers consist of the same character repeated seven times.  If
// it is a <<<<<<< or >>>>>>> marker then it is also followed by a space.
const mergeConflictMarkerLength = "<<<<<<<".length;
const maxAsciiCharacter = 127;

export function couldStartTrivia(text: string, pos: number): boolean {
  // Keep in sync with skipTrivia
  const ch = text.charCodeAt(pos);
  switch (ch) {
    // Characters that could start normal trivia
    case 0x0d /* \r */:
    case 0x0a /* \n */:
    case 0x09 /* \t */:
    case 0x0b /* \v */:
    case 0x0c /* \f */:
    case 0x20 /* space */:
    case 0x2f /* / */:
    // Characters that could start conflict marker trivia
    case 0x3c /* < */:
    case 0x7c /* | */:
    case 0x3d /* = */:
    case 0x3e /* > */:
      return true;
    case 0x23 /* # */:
      // Only if its the beginning can we have #! trivia
      return pos === 0;
    default:
      return ch > maxAsciiCharacter;
  }
}

export interface SkipTriviaOptions {
  readonly stopAfterLineBreak?: boolean;
  readonly stopAtComments?: boolean;
  readonly inJSDoc?: boolean;
}

export function skipTrivia(text: string, pos: number): number {
  return skipTriviaEx(text, pos, undefined);
}

export function skipTriviaEx(text: string, pos: number, options: SkipTriviaOptions | undefined): number {
  if (positionIsSynthesized(pos)) {
    return pos;
  }
  const opts = options ?? {};

  const textLen = text.length;
  let canConsumeStar = false;
  // Keep in sync with couldStartTrivia
  for (;;) {
    const ch = text.codePointAt(pos);
    if (ch === undefined) {
      return pos;
    }
    const size = ch > 0xffff ? 2 : 1;
    switch (ch) {
      case 0x0d /* \r */:
        if (pos + 1 < textLen && text.charCodeAt(pos + 1) === 0x0a /* \n */) {
          pos++;
        }
      // fallthrough
      // eslint-disable-next-line no-fallthrough
      case 0x0a /* \n */: {
        pos++;
        if (opts.stopAfterLineBreak) {
          return pos;
        }
        canConsumeStar = opts.inJSDoc ?? false;
        continue;
      }
      case 0x09 /* \t */:
      case 0x0b /* \v */:
      case 0x0c /* \f */:
      case 0x20 /* space */:
        pos++;
        continue;
      case 0x2f /* / */:
        if (opts.stopAtComments) {
          break;
        }
        if (pos + 1 < textLen) {
          if (text.charCodeAt(pos + 1) === 0x2f /* / */) {
            pos += 2;
            while (pos < textLen) {
              const c = text.codePointAt(pos)!;
              if (isLineBreak(c)) {
                break;
              }
              pos += c > 0xffff ? 2 : 1;
            }
            canConsumeStar = false;
            continue;
          }
          if (text.charCodeAt(pos + 1) === 0x2a /* * */) {
            pos += 2;
            while (pos < textLen) {
              if (text.charCodeAt(pos) === 0x2a /* * */ && pos + 1 < textLen && text.charCodeAt(pos + 1) === 0x2f /* / */) {
                pos += 2;
                break;
              }
              const c = text.codePointAt(pos)!;
              pos += c > 0xffff ? 2 : 1;
            }
            canConsumeStar = false;
            continue;
          }
        }
        break;
      case 0x3c /* < */:
      case 0x7c /* | */:
      case 0x3d /* = */:
      case 0x3e /* > */:
        if (isConflictMarkerTrivia(text, pos)) {
          pos = scanConflictMarkerTrivia(text, pos, undefined);
          canConsumeStar = false;
          continue;
        }
        break;
      case 0x23 /* # */:
        if (pos === 0 && isShebangTrivia(text, pos)) {
          pos = scanShebangTrivia(text, pos);
          canConsumeStar = false;
          continue;
        }
        break;
      case 0x2a /* * */:
        if (canConsumeStar) {
          pos++;
          canConsumeStar = false;
          continue;
        }
        break;
      default:
        if (ch > maxAsciiCharacter && isWhiteSpaceLike(ch)) {
          pos += size;
          continue;
        }
        break;
    }
    return pos;
  }
}

// ---------------------------------------------------------------------------
// Conflict markers (scanner.go:2364-2420)
// ---------------------------------------------------------------------------

export function isConflictMarkerTrivia(text: string, pos: number): boolean {
  debug.assert(pos >= 0, "pos < 0");

  // Conflict markers must be at the start of a line.
  let prev = -1;
  if (pos >= 2) {
    prev = text.codePointAt(pos - 2 - 1) ?? -1;
  }
  if (pos === 0 || (prev >= 0 && isLineBreak(prev)) || (pos >= 1 && isLineBreak(text.charCodeAt(pos - 1)))) {
    const ch = text.charCodeAt(pos);

    if (pos + mergeConflictMarkerLength < text.length) {
      for (let i = 0; i < mergeConflictMarkerLength; i++) {
        if (text.charCodeAt(pos + i) !== ch) {
          return false;
        }
      }

      return ch === 0x3d /* = */ || text.charCodeAt(pos + mergeConflictMarkerLength) === 0x20 /* space */;
    }
  }

  return false;
}

export function scanConflictMarkerTrivia(
  text: string,
  pos: number,
  reportError: ((diag: DiagnosticMessage, pos: number, length: number) => void) | undefined,
): number {
  if (reportError !== undefined) {
    reportError(Diagnostics.Merge_conflict_marker_encountered, pos, mergeConflictMarkerLength);
  }
  let ch = text.codePointAt(pos);
  const length = text.length;

  if (ch === 0x3c /* < */ || ch === 0x3e /* > */) {
    while (pos < length && ch !== undefined && !isLineBreak(ch)) {
      pos += ch > 0xffff ? 2 : 1;
      ch = text.codePointAt(pos);
    }
  } else {
    debug.assert(ch === 0x7c /* | */ || ch === 0x3d /* = */, "Assertion failed: ch must be either '|' or '='");
    // Consume everything from the start of a ||||||| or ======= marker to the start
    // of the next ======= or >>>>>>> marker.
    while (pos < length) {
      const currentChar = text.charCodeAt(pos);
      if ((currentChar === 0x3d /* = */ || currentChar === 0x3e /* > */) && currentChar !== ch && isConflictMarkerTrivia(text, pos)) {
        break;
      }

      pos++;
    }
  }

  return pos;
}

// ---------------------------------------------------------------------------
// Shebang (scanner.go:2422-2451)
// ---------------------------------------------------------------------------

export function isShebangTrivia(text: string, pos: number): boolean {
  if (text.length < 2) {
    return false;
  }
  debug.assert(pos === 0, "Shebangs check must only be done at the start of the file");
  return text.charCodeAt(0) === 0x23 /* # */ && text.charCodeAt(1) === 0x21 /* ! */;
}

export function scanShebangTrivia(text: string, pos: number): number {
  pos += 2;
  while (pos < text.length) {
    const ch = text.codePointAt(pos)!;
    if (isLineBreak(ch)) {
      break;
    }
    pos += ch > 0xffff ? 2 : 1;
  }
  return pos;
}

export function getShebang(text: string): string {
  if (!isShebangTrivia(text, 0)) {
    return "";
  }

  const end = scanShebangTrivia(text, 0);
  return text.slice(0, end);
}

// ---------------------------------------------------------------------------
// Position <-> line/character (scanner.go:2568-2708)
// ---------------------------------------------------------------------------

export function computeLineOfPosition(lineStarts: readonly TextPos[], pos: number): number {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const middle = low + ((high - low) >> 1);
    const value = lineStarts[middle] as number;
    if (value < pos) {
      low = middle + 1;
    } else if (value > pos) {
      high = middle - 1;
    } else {
      return middle;
    }
  }
  return low - 1;
}

export function getECMALineStarts(sourceFile: SourceFileLike): readonly TextPos[] {
  return sourceFile.ecmaLineMap();
}

export function getECMALineOfPosition(sourceFile: SourceFileLike, pos: number): number {
  const lineMap = getECMALineStarts(sourceFile);
  return computeLineOfPosition(lineMap, pos);
}

/**
 * GetECMALineAndUTF16CharacterOfPosition returns the 0-based line number and the
 * UTF-16 code unit offset from the start of that line for the given position.
 * Uses ECMAScript line separators (LF, CR, CRLF, LS, PS).
 */
export function getECMALineAndUTF16CharacterOfPosition(
  sourceFile: SourceFileLike,
  pos: number,
): { line: number; character: UTF16Offset } {
  const lineMap = getECMALineStarts(sourceFile);
  const line = computeLineOfPosition(lineMap, pos);
  const character = (sourceFile.text().slice(lineMap[line] as number, pos)).length;
  return { line, character };
}

/**
 * GetECMALineAndByteOffsetOfPosition returns the 0-based line number and the
 * raw offset from the start of that line for the given position.
 * Uses ECMAScript line separators (LF, CR, CRLF, LS, PS).
 */
export function getECMALineAndByteOffsetOfPosition(
  sourceFile: SourceFileLike,
  pos: number,
): { line: number; byteOffset: number } {
  const lineMap = getECMALineStarts(sourceFile);
  const line = computeLineOfPosition(lineMap, pos);
  const byteOffset = pos - (lineMap[line] as number);
  return { line, byteOffset };
}

/**
 * ComputePositionOfLineAndUTF16Character converts a line and UTF-16 character
 * offset back to a position. The character parameter is measured in UTF-16 code
 * units. It scans from the line start to correctly handle code points outside
 * the BMP. When allowEdits is true, out-of-range values are clamped instead of
 * raising.
 */
export function computePositionOfLineAndUTF16Character(
  lineStarts: readonly TextPos[],
  line: number,
  character: UTF16Offset,
  text: string,
  allowEdits: boolean,
): number {
  if (line < 0 || line >= lineStarts.length) {
    if (allowEdits) {
      // Clamp line to nearest allowable value
      if (line < 0) {
        line = 0;
      } else if (line >= lineStarts.length) {
        line = lineStarts.length - 1;
      }
    } else {
      debug.fail(`Bad line number. Line: ${line}, lineStarts.length: ${lineStarts.length}.`);
    }
  }

  const lineStart = lineStarts[line] as number;

  if (character > 0) {
    // UTF-16 character offset: scan from line start counting UTF-16 code units.
    let lineEnd = text.length;
    if (line + 1 < lineStarts.length) {
      lineEnd = lineStarts[line + 1] as number;
    }
    let utf16Count = 0;
    let pos = lineStart;
    while (pos < lineEnd) {
      if (utf16Count >= character) {
        break;
      }
      const r = text.codePointAt(pos)!;
      const size = r > 0xffff ? 2 : 1;
      utf16Count += size;
      pos += size;
    }
    if (!allowEdits) {
      if (pos === lineEnd && utf16Count < character) {
        debug.fail(`Bad UTF-16 character offset. Line: ${line}, character: ${character}.`);
      }
      debug.assert(pos <= text.length);
      return pos;
    }
    if (pos > text.length) {
      return text.length;
    }
    return pos;
  }

  // Character is 0: line start position.
  const res = lineStart;

  if (allowEdits) {
    if (res > text.length) {
      return text.length;
    }
    return res;
  }
  debug.assert(res <= text.length); // Allow single character overflow for trailing newline
  return res;
}
