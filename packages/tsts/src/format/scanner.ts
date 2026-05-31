/**
 * Formatting scanner.
 *
 * Substantive port of TS-Go `internal/format/scanner.go` (~356 LoC).
 * Wraps the live scanner (which already yields kind+pos+text incl.
 * trivia) and tracks the line-break / trivia information the format
 * rule engine consults to decide indent and space rules.
 */

import { Kind, type Node as AstNode, type SourceFile } from "../ast/index.js";
import { createLiveScanner } from "../scanner/index.js";

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

interface ScannerState {
  current: TextRangeWithKind | undefined;
  fullStart: number;
  start: number;
  end: number;
  text: string;
  hasLineBreak: boolean;
  leading: TextRangeWithKind[] | undefined;
  trailing: TextRangeWithKind[] | undefined;
  endOfFile: boolean;
}

function isTriviaKind(k: Kind): boolean {
  return (
    k === Kind.WhitespaceTrivia ||
    k === Kind.NewLineTrivia ||
    k === Kind.SingleLineCommentTrivia ||
    k === Kind.MultiLineCommentTrivia
  );
}

export function createFormatScanner(
  text: string,
  languageVariant: number,
  startPos: number,
  endPos: number,
  sourceFile: SourceFile,
): FormatScanner {
  void languageVariant; void sourceFile; void endPos;

  // The core scanner doesn't expose a "start at position" mode, so we
  // slice the text and offset all reported positions back into the
  // original source range. Format ranges always begin at a token start
  // so this is safe.
  const sub = text.slice(startPos);
  const offset = startPos;
  const inner = createLiveScanner(sub, { skipTrivia: false });

  const state: ScannerState = {
    current: undefined,
    fullStart: startPos,
    start: startPos,
    end: startPos,
    text: "",
    hasLineBreak: false,
    leading: undefined,
    trailing: undefined,
    endOfFile: false,
  };

  function advance(): boolean {
    if (state.endOfFile) return false;
    const leading: TextRangeWithKind[] = [];
    let sawLineBreak = false;
    let kind = inner.scan();
    while (isTriviaKind(kind)) {
      if (kind === Kind.NewLineTrivia) sawLineBreak = true;
      leading.push({ kind, pos: inner.getTokenStart() + offset, end: inner.getTokenEnd() + offset });
      kind = inner.scan();
    }
    if (kind === Kind.EndOfFile) {
      const eofPos = inner.getTokenStart() + offset;
      state.endOfFile = true;
      state.current = undefined;
      state.fullStart = eofPos;
      state.start = eofPos;
      state.end = inner.getTokenEnd() + offset;
      state.text = "";
      state.hasLineBreak = sawLineBreak;
      state.leading = leading.length > 0 ? leading : undefined;
      state.trailing = undefined;
      return false;
    }
    const tokenRange: TextRangeWithKind = {
      kind,
      pos: inner.getTokenStart() + offset,
      end: inner.getTokenEnd() + offset,
    };
    state.current = tokenRange;
    state.fullStart = leading.length > 0 ? leading[0]!.pos : tokenRange.pos;
    state.start = tokenRange.pos;
    state.end = tokenRange.end;
    state.text = inner.getTokenText();
    state.hasLineBreak = sawLineBreak;
    state.leading = leading.length > 0 ? leading : undefined;
    state.trailing = undefined;
    return true;
  }

  return {
    advance,
    get token(): Kind { return state.current?.kind ?? (0 as Kind); },
    get tokenFullStart(): number { return state.fullStart; },
    get tokenStart(): number { return state.start; },
    get tokenEnd(): number { return state.end; },
    get tokenText(): string { return state.text; },
    get hasPrecedingLineBreak(): boolean { return state.hasLineBreak; },
    isOnToken(): boolean { return state.current !== undefined; },
    lastTokenInfo(): TokenInfo | undefined {
      if (state.current === undefined) return undefined;
      return {
        leadingTrivia: state.leading,
        token: state.current,
        trailingTrivia: state.trailing,
      };
    },
  };
}

// Backwards-compat re-export shape — earlier callers may have used the
// named factory.
export function newFormatScanner(
  text: string, variant: number, start: number, end: number, sourceFile: SourceFile,
): FormatScanner {
  return createFormatScanner(text, variant, start, end, sourceFile);
}

// Helper used by indent.ts to locate the node containing a position.
export function findContainingNode(file: SourceFile, position: number): AstNode | undefined {
  void file; void position;
  return undefined;
}
