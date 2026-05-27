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
import {
  nodePos, nodeEnd, nodeParent, newTextRange,
  sourceFileText, isWhiteSpaceSingleLine, isLineBreak,
  getECMALineOfPosition as _astGetECMALineOfPosition,
} from "../ast/index.js";
import { Kind } from "../ast/index.js";

// Source-file accessors backed by direct field reads.
function sourceFileEnd(file: SourceFile): number {
  return (file as unknown as { end?: number }).end ?? 0;
}
function sourceFileLanguageVariant(file: SourceFile): number {
  return (file as unknown as { languageVariant?: number }).languageVariant ?? 0;
}
function sourceFileDiagnostics(file: SourceFile): readonly unknown[] {
  return (file as unknown as { parseDiagnostics?: readonly unknown[] }).parseDiagnostics ?? [];
}
// ECMA line tables — derived lazily from sourceFileText.
function getECMALineStarts(file: SourceFile): readonly number[] {
  const cached = (file as unknown as { lineStarts?: readonly number[] }).lineStarts;
  if (cached !== undefined) return cached;
  const text = sourceFileText(file);
  const starts: number[] = [0];
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) === 0x0a) starts.push(i + 1);
  }
  return starts;
}
function getECMALineOfPosition(file: SourceFile, pos: number): number {
  return _astGetECMALineOfPosition(file as unknown as AstNode, pos);
}
function getECMAEndLinePosition(file: SourceFile, line: number): number {
  const starts = getECMALineStarts(file);
  if (line < 0 || line >= starts.length) return -1;
  if (line === starts.length - 1) return sourceFileEnd(file);
  return (starts[line + 1] ?? 0) - 1;
}
function getLineStartPositionForPosition(pos: number, file: SourceFile): number {
  const starts = getECMALineStarts(file);
  let lo = 0, hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if ((starts[mid] ?? 0) <= pos) lo = mid;
    else hi = mid - 1;
  }
  return starts[lo] ?? 0;
}
function getTokenPosOfNode(node: AstNode | undefined, _file: SourceFile, _includeJSDoc: boolean): number {
  return node === undefined ? -1 : nodePos(node);
}
// Format-engine entry points — bodies pending Phase 4a.
function findEnclosingNode(_range: TextRange, file: SourceFile): AstNode {
  return file as unknown as AstNode;
}
function getScanStartPosition(_enclosingNode: AstNode, span: TextRange, _file: SourceFile): number {
  return span.pos;
}
function getIndentationForNode(_node: AstNode, _range: TextRange, _file: SourceFile, _opts: FormatCodeSettings): number {
  return 0;
}
function getOwnOrInheritedDelta(_node: AstNode, _opts: FormatCodeSettings, _file: SourceFile): number {
  return 0;
}
function prepareRangeContainsErrorFunction(_diags: readonly unknown[], _span: TextRange): (r: TextRange) => boolean {
  return () => false;
}
function findImmediatelyPrecedingTokenOfKind(_position: number, _kind: number, _sourceFile: SourceFile): AstNode | undefined {
  return undefined;
}
function findOutermostNodeWithinListLevel(_node: AstNode | undefined): AstNode | undefined {
  return undefined;
}
function runFormattingScanner(..._args: unknown[]): readonly TextChange[] {
  return [];
}
function formatSpanWorker(..._args: unknown[]): readonly TextChange[] {
  return [];
}

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
  readonly pos: number;
  readonly end: number;
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
    span.end,
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
    textRange.pos,
    textRange.end,
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

// Format-engine-internal helpers — full ports come with Phase 4a.
interface FormatSpanWorker {
  run(): readonly TextChange[];
}
const KindOpenBraceToken = Kind.OpenBraceToken;
const KindCloseBraceToken = Kind.CloseBraceToken;
const KindSemicolonToken = Kind.SemicolonToken;
