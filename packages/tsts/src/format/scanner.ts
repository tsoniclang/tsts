/**
 * Formatting scanner.
 *
 * Port skeleton of TS-Go `internal/format/scanner.go` (~356 LoC).
 * Provides a streaming token scanner that yields kind + position +
 * trivia for use by the formatting rule engine. Tracks token wrap and
 * line-break information needed to decide indent/space rules.
 */

import type { Kind, Node as AstNode, SourceFile } from "../ast/index.js";

export interface FormatScanner {
  advance(): boolean;
  readonly token: Kind;
  readonly tokenFullStart: number;
  readonly tokenStart: number;
  readonly tokenEnd: number;
  readonly tokenText: string;
  readonly hasPrecedingLineBreak: boolean;
  isOnToken(): boolean;
  lastTokenInfo(): TokenInfo | undefined;
}

export interface TokenInfo {
  leadingTrivia: TextRangeWithKind[] | undefined;
  token: TextRangeWithKind;
  trailingTrivia: TextRangeWithKind[] | undefined;
}

export interface TextRangeWithKind {
  kind: Kind;
  pos: number;
  end: number;
}

export function createFormatScanner(text: string, languageVariant: number, startPos: number, endPos: number, sourceFile: SourceFile): FormatScanner {
  return newFormatScanner(text, languageVariant, startPos, endPos, sourceFile);
}

// No-op scanner — full implementation comes with Phase 4a (format
// engine body completion). Until then the format engine sees no tokens
// from the scanner path and short-circuits to a no-edit result.
function newFormatScanner(
  _text: string, _variant: number, start: number, _end: number, _sourceFile: SourceFile,
): FormatScanner {
  return {
    advance(): boolean { return false; },
    token: 0 as Kind,
    tokenFullStart: start,
    tokenStart: start,
    tokenEnd: start,
    tokenText: "",
    hasPrecedingLineBreak: false,
    isOnToken(): boolean { return false; },
    lastTokenInfo(): TokenInfo | undefined { return undefined; },
  };
}
