/**
 * Indentation calculator (SmartIndenter).
 *
 * Port skeleton of TS-Go `internal/format/indent.go` (821 LoC).
 * Computes the effective indentation level for a given position in a
 * source file, accounting for the surrounding lexical context
 * (enclosing blocks, type-argument lists, JSX, comments).
 *
 * Skeleton scope:
 * - getIndentation (public entry — full dispatch)
 * - getIndentationForNode (compute indent at a node's token start)
 * - getCommentIndent (multi-line comment middle-of-comment case)
 * - getBlockIndent (block-style indentation)
 * - getSmartIndent (default smart-mode indent)
 * - Per-list helpers (getListByPosition,
 *   getActualIndentationForListItem*, etc.)
 *
 * Cross-module deps forward-declared.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";
import type { FormatCodeSettings } from "./api.js";

export const Unknown = -1;

export type IndentStyle = number;
export const IndentStyle = {
  None: 0,
  Block: 1,
  Smart: 2,
} as const;

/**
 * Compute the expected indentation for `position` in `sourceFile`.
 * Mirrors TS-Go `GetIndentation` (smart indent dispatcher).
 */
export function getIndentation(
  position: number,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
  assumeNewLineBeforeCloseBrace: boolean,
): number {
  if (position > sourceFileText(sourceFile).length) return options.baseIndentSize ?? 0;
  if (options.indentStyle === IndentStyle.None) return 0;

  const precedingToken = findPrecedingTokenEx(sourceFile, position, undefined, true);
  const enclosingCommentRange = getRangeOfEnclosingComment(sourceFile, position, precedingToken);
  if (enclosingCommentRange !== undefined && enclosingCommentRange.kind === Kind.MultiLineCommentTrivia) {
    return getCommentIndent(sourceFile, position, options, enclosingCommentRange);
  }
  if (precedingToken === undefined) return options.baseIndentSize ?? 0;

  if (isStringOrRegularExpressionOrTemplateLiteral(nodeKind(precedingToken))) {
    const tokenStart = getTokenPosOfNode(precedingToken, sourceFile, false);
    if (tokenStart <= position && position < nodeEnd(precedingToken)) return 0;
  }

  const lineAtPosition = getECMALineOfPosition(sourceFile, position);
  const currentToken = getTokenAtPosition(sourceFile, position);
  const isObjectLiteral =
    nodeKind(currentToken) === Kind.OpenBraceToken &&
    nodeParent(currentToken) !== undefined &&
    nodeKind(nodeParent(currentToken)!) === Kind.ObjectLiteralExpression;

  if (options.indentStyle === IndentStyle.Block || isObjectLiteral) {
    return getBlockIndent(sourceFile, position, options);
  }

  if (
    nodeKind(precedingToken) === Kind.CommaToken &&
    nodeParent(precedingToken) !== undefined &&
    nodeKind(nodeParent(precedingToken)!) !== Kind.BinaryExpression
  ) {
    const actual = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options);
    if (actual !== -1) return actual;
  }

  const containerList = getListByPosition(position, nodeParent(precedingToken), sourceFile);
  if (containerList !== undefined && !rangeContainedBy(nodeLoc(precedingToken), containerList)) {
    const useTheSameBaseIndentation =
      nodeParent(currentToken) !== undefined &&
      (nodeKind(nodeParent(currentToken)!) === Kind.FunctionExpression ||
        nodeKind(nodeParent(currentToken)!) === Kind.ArrowFunction);
    const indentSize = useTheSameBaseIndentation ? 0 : (options.indentSize ?? 4);
    const res = getActualIndentationForListStartLine(containerList, sourceFile, options);
    if (res === -1) return indentSize;
    return res + indentSize;
  }

  return getSmartIndent(sourceFile, position, precedingToken, lineAtPosition, assumeNewLineBeforeCloseBrace, options);
}

/**
 * Indentation for a specific node. Mirrors TS-Go
 * `GetIndentationForNode`.
 */
export function getIndentationForNode(
  n: AstNode,
  ignoreActualIndentationRange: { pos: number; end: number } | undefined,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): number {
  const tokenStart = getTokenPosOfNode(n, sourceFile, false);
  const { line: startLine, column: startCol } = getECMALineAndByteOffsetOfPosition(sourceFile, tokenStart);
  return getIndentationForNodeWorker(n, startLine, startCol, ignoreActualIndentationRange, 0, sourceFile, false, options);
}

function getIndentationForNodeWorker(
  n: AstNode,
  startLine: number,
  startCol: number,
  ignoreActualIndentationRange: { pos: number; end: number } | undefined,
  indentationDelta: number,
  sourceFile: SourceFile,
  isNextChild: boolean,
  options: FormatCodeSettings,
): number {
  // Skeleton: returns the column + delta. Full version walks ancestors
  // accumulating delta when shouldIndentChildNode is true.
  void n; void ignoreActualIndentationRange; void isNextChild;
  return startCol + indentationDelta;
}

function getCommentIndent(
  sourceFile: SourceFile,
  position: number,
  options: FormatCodeSettings,
  enclosingCommentRange: { pos: number; end: number; kind: number },
): number {
  const previousLine = getECMALineOfPosition(sourceFile, position) - 1;
  const commentStartLine = getECMALineOfPosition(sourceFile, enclosingCommentRange.pos);
  if (previousLine <= commentStartLine) {
    const lineStarts = getECMALineStarts(sourceFile);
    return findFirstNonWhitespaceColumn(lineStarts[commentStartLine]!, position, sourceFile, options);
  }
  const lineStarts = getECMALineStarts(sourceFile);
  const startPositionOfLine = lineStarts[previousLine]!;
  const { character, column } = findFirstNonWhitespaceCharacterAndColumn(startPositionOfLine, position, sourceFile, options);
  if (column === 0) return 0;
  const firstNonWhitespaceCharCode = sourceFileText(sourceFile).charCodeAt(startPositionOfLine + character);
  if (firstNonWhitespaceCharCode === 0x2A /* * */) return column - 1;
  return column;
}

function getBlockIndent(sourceFile: SourceFile, position: number, options: FormatCodeSettings): number {
  // Skeleton: defer to smart indent. Full version walks lines backwards
  // looking for first non-blank line.
  void position; void options;
  return options.baseIndentSize ?? 0;
}

function getSmartIndent(
  sourceFile: SourceFile,
  position: number,
  precedingToken: AstNode,
  lineAtPosition: number,
  assumeNewLineBeforeCloseBrace: boolean,
  options: FormatCodeSettings,
): number {
  // Skeleton: returns base indentation for the line of the preceding
  // token. Full version walks the AST checking each ancestor for
  // indentation contribution.
  void position; void precedingToken; void lineAtPosition; void assumeNewLineBeforeCloseBrace;
  return options.baseIndentSize ?? 0;
}

export function findFirstNonWhitespaceColumn(
  startPos: number,
  endPos: number,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): number {
  const { column } = findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options);
  return column;
}

function findFirstNonWhitespaceCharacterAndColumn(
  startPos: number,
  endPos: number,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): { character: number; column: number } {
  const text = sourceFileText(sourceFile);
  const tabSize = options.tabSize ?? options.indentSize ?? 4;
  let character = 0;
  let column = 0;
  while (startPos + character < endPos) {
    const ch = text.charCodeAt(startPos + character);
    if (!isWhitespace(ch)) break;
    if (ch === 0x09 /* tab */) {
      column = column + (tabSize - (column % tabSize));
    } else {
      column += 1;
    }
    character += 1;
  }
  return { character, column };
}

function isWhitespace(ch: number): boolean {
  return ch === 0x20 || ch === 0x09;
}

function isStringOrRegularExpressionOrTemplateLiteral(kind: number): boolean {
  return (
    kind === Kind.StringLiteral ||
    kind === Kind.RegularExpressionLiteral ||
    kind === Kind.NoSubstitutionTemplateLiteral ||
    kind === Kind.TemplateHead ||
    kind === Kind.TemplateMiddle ||
    kind === Kind.TemplateTail
  );
}

function getActualIndentationForListItemBeforeComma(
  _precedingToken: AstNode,
  _sourceFile: SourceFile,
  _options: FormatCodeSettings,
): number {
  // Skeleton — full version computes the indentation of the list item
  // immediately before the comma so chained items line up.
  return -1;
}

function getActualIndentationForListStartLine(
  _list: { pos: number; end: number },
  _sourceFile: SourceFile,
  _options: FormatCodeSettings,
): number {
  return -1;
}

function getListByPosition(
  _position: number,
  _parent: AstNode | undefined,
  _sourceFile: SourceFile,
): { pos: number; end: number } | undefined {
  return undefined;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

declare const Kind: {
  MultiLineCommentTrivia: number; OpenBraceToken: number; ObjectLiteralExpression: number;
  CommaToken: number; BinaryExpression: number; FunctionExpression: number; ArrowFunction: number;
  StringLiteral: number; RegularExpressionLiteral: number; NoSubstitutionTemplateLiteral: number;
  TemplateHead: number; TemplateMiddle: number; TemplateTail: number;
};

declare function sourceFileText(sf: SourceFile): string;
declare function nodeKind(n: AstNode): number;
declare function nodeParent(n: AstNode): AstNode | undefined;
declare function nodeEnd(n: AstNode): number;
declare function nodeLoc(n: AstNode): { pos: number; end: number };
declare function rangeContainedBy(inner: { pos: number; end: number }, outer: { pos: number; end: number }): boolean;
declare function findPrecedingTokenEx(
  sf: SourceFile,
  pos: number,
  startNode: AstNode | undefined,
  excludeJSDoc: boolean,
): AstNode | undefined;
declare function getRangeOfEnclosingComment(
  sf: SourceFile,
  pos: number,
  precedingToken: AstNode | undefined,
): { pos: number; end: number; kind: number } | undefined;
declare function getTokenPosOfNode(n: AstNode, sf: SourceFile, includeJSDoc: boolean): number;
declare function getTokenAtPosition(sf: SourceFile, pos: number): AstNode;
declare function getECMALineOfPosition(sf: SourceFile, pos: number): number;
declare function getECMALineStarts(sf: SourceFile): readonly number[];
declare function getECMALineAndByteOffsetOfPosition(sf: SourceFile, pos: number): { line: number; column: number };
