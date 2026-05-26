/**
 * Format engine — public API.
 *
 * Port of TS-Go `internal/format/api.go`. Provides the formatter entry
 * points (FormatDocument, FormatSelection, FormatOnEnter, etc.) used
 * by the language service.
 *
 * Depends heavily on `lsutil.FormatCodeSettings`, scanner offset
 * helpers, and the internal formatting pipeline (newFormattingScanner,
 * newFormatSpanWorker, findEnclosingNode, etc.). Each is forward-
 * declared at file end until the corresponding TSTS module lands.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";

/**
 * Format request flavor — mirrors TS-Go `FormatRequestKind`.
 */
export type FormatRequestKind = 0 | 1 | 2 | 3 | 4 | 5;
export const FormatRequestKind: {
  readonly FormatDocument: FormatRequestKind;
  readonly FormatSelection: FormatRequestKind;
  readonly FormatOnEnter: FormatRequestKind;
  readonly FormatOnSemicolon: FormatRequestKind;
  readonly FormatOnOpeningCurlyBrace: FormatRequestKind;
  readonly FormatOnClosingCurlyBrace: FormatRequestKind;
} = {
  FormatDocument: 0,
  FormatSelection: 1,
  FormatOnEnter: 2,
  FormatOnSemicolon: 3,
  FormatOnOpeningCurlyBrace: 4,
  FormatOnClosingCurlyBrace: 5,
};

/**
 * Format options surface mirroring `lsutil.FormatCodeSettings`. Real
 * implementation arrives with the language service port; this captures
 * the subset that `api.go` consumes directly.
 */
export interface FormatCodeSettings {
  readonly newLineCharacter?: string;
  readonly indentSize?: number;
  readonly tabSize?: number;
  readonly convertTabsToSpaces?: boolean;
  readonly insertSpaceAfterCommaDelimiter?: boolean;
  readonly insertSpaceAfterSemicolonInForStatements?: boolean;
  readonly insertSpaceBeforeAndAfterBinaryOperators?: boolean;
  readonly insertSpaceAfterConstructor?: boolean;
  readonly insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
  readonly insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
  readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
  readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
  readonly insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
  readonly insertSpaceAfterOpeningAndBeforeClosingEmptyBraces?: boolean;
  readonly insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
  readonly insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
  readonly insertSpaceAfterTypeAssertion?: boolean;
  readonly insertSpaceBeforeFunctionParenthesis?: boolean;
  readonly placeOpenBraceOnNewLineForFunctions?: boolean;
  readonly placeOpenBraceOnNewLineForControlBlocks?: boolean;
  readonly insertSpaceBeforeTypeAnnotation?: boolean;
  readonly indentMultiLineObjectLiteralBeginningOnBlankLine?: boolean;
  readonly indentSwitchCase?: boolean;
  readonly baseIndentSize?: number;
  readonly semicolons?: "ignore" | "insert" | "remove";
  readonly indentStyle?: "none" | "block" | "smart" | number;
  readonly trimTrailingWhitespace?: boolean;
}

/**
 * Text range used in change requests. Mirrors `core.TextRange`.
 */
export interface TextRange {
  pos(): number;
  end(): number;
}

/**
 * A single edit produced by the formatter. Mirrors `core.TextChange`.
 */
export interface TextChange {
  readonly span: TextRange;
  readonly newText: string;
}

/**
 * Format settings context. Mirrors TS-Go's `context.Context` storage
 * but as an explicit value type to keep TS-side ergonomics natural.
 */
export interface FormatContext {
  readonly settings: FormatCodeSettings;
  readonly newLine: string;
}

/**
 * Returns the canonical newline string from a format context, falling
 * back to "\n" if neither the settings nor the host provide one.
 *
 * Mirrors TS-Go `GetNewLineOrDefaultFromContext`.
 */
export function getNewLineOrDefault(ctx: FormatContext): string {
  if (ctx.settings.newLineCharacter !== undefined && ctx.settings.newLineCharacter.length > 0) {
    return ctx.settings.newLineCharacter;
  }
  if (ctx.newLine.length > 0) return ctx.newLine;
  return "\n";
}

// ---------------------------------------------------------------------------
// Public entry points
// ---------------------------------------------------------------------------

/**
 * Formats a range within a source file. Mirrors TS-Go `FormatSpan`.
 */
export function formatSpan(
  ctx: FormatContext,
  span: TextRange,
  file: SourceFile,
  kind: FormatRequestKind,
): readonly TextChange[] {
  const enclosingNode = findEnclosingNode(span, file);
  return runFormattingScanner(
    sourceFileText(file),
    sourceFileLanguageVariant(file),
    getScanStartPosition(enclosingNode, span, file),
    span.end(),
    formatSpanWorker(
      ctx,
      span,
      enclosingNode,
      getIndentationForNode(enclosingNode, span, file, ctx.settings),
      getOwnOrInheritedDelta(enclosingNode, ctx.settings, file),
      kind,
      prepareRangeContainsErrorFunction(sourceFileDiagnostics(file), span),
      file,
    ),
  );
}

/**
 * Formats a node assuming a known initial indentation. Mirrors TS-Go
 * `FormatNodeGivenIndentation`.
 */
export function formatNodeGivenIndentation(
  ctx: FormatContext,
  node: AstNode,
  file: SourceFile,
  languageVariant: number,
  initialIndentation: number,
  delta: number,
): readonly TextChange[] {
  const textRange = newTextRange(nodePos(node), nodeEnd(node));
  return runFormattingScanner(
    sourceFileText(file),
    languageVariant,
    textRange.pos(),
    textRange.end(),
    formatSpanWorker(
      ctx,
      textRange,
      node,
      initialIndentation,
      delta,
      FormatRequestKind.FormatSelection,
      () => false,
      file,
    ),
  );
}

/**
 * Formats an entire source file. Mirrors TS-Go `FormatDocument`.
 */
export function formatDocument(ctx: FormatContext, sourceFile: SourceFile): readonly TextChange[] {
  return formatSpan(ctx, newTextRange(0, sourceFileEnd(sourceFile)), sourceFile, FormatRequestKind.FormatDocument);
}

/**
 * Formats a user-selected range. Mirrors TS-Go `FormatSelection`.
 */
export function formatSelection(ctx: FormatContext, sourceFile: SourceFile, start: number, end: number): readonly TextChange[] {
  return formatSpan(ctx, newTextRange(getLineStartPositionForPosition(start, sourceFile), end), sourceFile, FormatRequestKind.FormatSelection);
}

/**
 * Formats when an opening `{` is typed. Mirrors TS-Go `FormatOnOpeningCurly`.
 */
export function formatOnOpeningCurly(ctx: FormatContext, sourceFile: SourceFile, position: number): readonly TextChange[] {
  const openingCurly = findImmediatelyPrecedingTokenOfKind(position, KindOpenBraceToken, sourceFile);
  if (openingCurly === undefined) return [];
  const curlyBraceRange = nodeParent(openingCurly);
  const outermostNode = findOutermostNodeWithinListLevel(curlyBraceRange);
  const textRange = newTextRange(
    getLineStartPositionForPosition(getTokenPosOfNode(outermostNode, sourceFile, false), sourceFile),
    position,
  );
  return formatSpan(ctx, textRange, sourceFile, FormatRequestKind.FormatOnOpeningCurlyBrace);
}

/**
 * Formats when a closing `}` is typed. Mirrors TS-Go `FormatOnClosingCurly`.
 */
export function formatOnClosingCurly(ctx: FormatContext, sourceFile: SourceFile, position: number): readonly TextChange[] {
  const precedingToken = findImmediatelyPrecedingTokenOfKind(position, KindCloseBraceToken, sourceFile);
  if (precedingToken === undefined) return [];
  return formatNodeLines(ctx, sourceFile, findOutermostNodeWithinListLevel(precedingToken), FormatRequestKind.FormatOnClosingCurlyBrace);
}

/**
 * Formats when a `;` is typed. Mirrors TS-Go `FormatOnSemicolon`.
 */
export function formatOnSemicolon(ctx: FormatContext, sourceFile: SourceFile, position: number): readonly TextChange[] {
  const semicolon = findImmediatelyPrecedingTokenOfKind(position, KindSemicolonToken, sourceFile);
  if (semicolon === undefined) return [];
  return formatNodeLines(ctx, sourceFile, findOutermostNodeWithinListLevel(semicolon), FormatRequestKind.FormatOnSemicolon);
}

/**
 * Formats the previous line when Enter is pressed. Mirrors TS-Go
 * `FormatOnEnter`.
 */
export function formatOnEnter(ctx: FormatContext, sourceFile: SourceFile, position: number): readonly TextChange[] {
  const line = getECMALineOfPosition(sourceFile, position);
  if (line === 0) return [];
  const startPos = getECMALineStarts(sourceFile)[line - 1]!;
  let endOfFormatSpan = getECMAEndLinePosition(sourceFile, line);
  const text = sourceFileText(sourceFile);
  while (endOfFormatSpan > startPos) {
    const ch = text.codePointAt(endOfFormatSpan);
    if (ch === undefined || isWhiteSpaceSingleLine(ch)) {
      endOfFormatSpan -= 1;
      continue;
    }
    break;
  }
  const lastCh = text.codePointAt(endOfFormatSpan);
  if (lastCh !== undefined && isLineBreak(lastCh)) {
    endOfFormatSpan -= 1;
  }
  return formatSpan(ctx, newTextRange(startPos, endOfFormatSpan + 1), sourceFile, FormatRequestKind.FormatOnEnter);
}

function formatNodeLines(
  ctx: FormatContext,
  sourceFile: SourceFile,
  node: AstNode | undefined,
  requestKind: FormatRequestKind,
): readonly TextChange[] {
  if (node === undefined) return [];
  const tokenStart = getTokenPosOfNode(node, sourceFile, false);
  const lineStart = getLineStartPositionForPosition(tokenStart, sourceFile);
  const span = newTextRange(lineStart, nodeEnd(node));
  return formatSpan(ctx, span, sourceFile, requestKind);
}

// ---------------------------------------------------------------------------
// Forward declarations — replaced as TSTS subsystems land.
// ---------------------------------------------------------------------------

declare function newTextRange(pos: number, end: number): TextRange;
declare function nodePos(node: AstNode): number;
declare function nodeEnd(node: AstNode): number;
declare function nodeParent(node: AstNode): AstNode;
declare function sourceFileText(file: SourceFile): string;
declare function sourceFileEnd(file: SourceFile): number;
declare function sourceFileLanguageVariant(file: SourceFile): number;
declare function sourceFileDiagnostics(file: SourceFile): readonly unknown[];

declare function findEnclosingNode(range: TextRange, file: SourceFile): AstNode;
declare function getScanStartPosition(enclosingNode: AstNode, span: TextRange, file: SourceFile): number;
declare function getIndentationForNode(node: AstNode, range: TextRange, file: SourceFile, opts: FormatCodeSettings): number;
declare function getOwnOrInheritedDelta(node: AstNode, opts: FormatCodeSettings, file: SourceFile): number;
declare function prepareRangeContainsErrorFunction(diags: readonly unknown[], span: TextRange): (r: TextRange) => boolean;
declare function findImmediatelyPrecedingTokenOfKind(position: number, kind: number, sourceFile: SourceFile): AstNode | undefined;
declare function findOutermostNodeWithinListLevel(node: AstNode | undefined): AstNode | undefined;

declare function runFormattingScanner(
  text: string,
  languageVariant: number,
  start: number,
  end: number,
  worker: FormatSpanWorker,
): readonly TextChange[];

interface FormatSpanWorker {
  run(): readonly TextChange[];
}

declare function formatSpanWorker(
  ctx: FormatContext,
  span: TextRange,
  enclosingNode: AstNode,
  initialIndentation: number,
  delta: number,
  kind: FormatRequestKind,
  rangeContainsError: (r: TextRange) => boolean,
  file: SourceFile,
): FormatSpanWorker;

declare function getLineStartPositionForPosition(position: number, sourceFile: SourceFile): number;
declare function getTokenPosOfNode(node: AstNode | undefined, sourceFile: SourceFile, includeJSDoc: boolean): number;
declare function getECMALineOfPosition(sourceFile: SourceFile, position: number): number;
declare function getECMALineStarts(sourceFile: SourceFile): readonly number[];
declare function getECMAEndLinePosition(sourceFile: SourceFile, line: number): number;
declare function isWhiteSpaceSingleLine(ch: number): boolean;
declare function isLineBreak(ch: number): boolean;

declare const KindOpenBraceToken: number;
declare const KindCloseBraceToken: number;
declare const KindSemicolonToken: number;
