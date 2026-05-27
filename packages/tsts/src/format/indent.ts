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
import {
  Kind, nodeKind, nodeParent, nodeEnd,
  sourceFileText,
  getECMALineOfPosition as _astGetECMALineOfPosition,
} from "../ast/index.js";
import type { FormatCodeSettings } from "./api.js";

function nodeLoc(n: AstNode): { pos: number; end: number } {
  return { pos: (n as unknown as { pos?: number }).pos ?? 0, end: (n as unknown as { end?: number }).end ?? 0 };
}
function rangeContainedBy(inner: { pos: number; end: number }, outer: { pos: number; end: number }): boolean {
  return outer.pos <= inner.pos && outer.end >= inner.end;
}
function findPrecedingTokenEx(
  _sf: SourceFile,
  _pos: number,
  _startNode: AstNode | undefined,
  _excludeJSDoc: boolean,
): AstNode | undefined {
  return undefined;
}
function getRangeOfEnclosingComment(
  _sf: SourceFile,
  _pos: number,
  _precedingToken: AstNode | undefined,
): { pos: number; end: number; kind: number } | undefined {
  return undefined;
}
function getTokenPosOfNode(n: AstNode, _sf: SourceFile, _includeJSDoc: boolean): number {
  return (n as unknown as { pos?: number }).pos ?? -1;
}
function getTokenAtPosition(sf: SourceFile, _pos: number): AstNode {
  return sf as unknown as AstNode;
}
function getECMALineOfPosition(sf: SourceFile, pos: number): number {
  return _astGetECMALineOfPosition(sf as unknown as AstNode, pos);
}
function getECMALineStarts(sf: SourceFile): readonly number[] {
  const cached = (sf as unknown as { lineStarts?: readonly number[] }).lineStarts;
  if (cached !== undefined) return cached;
  const text = sourceFileText(sf as unknown as AstNode);
  const starts: number[] = [0];
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) === 0x0a) starts.push(i + 1);
  }
  return starts;
}
function getECMALineAndByteOffsetOfPosition(sf: SourceFile, pos: number): { line: number; column: number } {
  const starts = getECMALineStarts(sf);
  let lo = 0, hi = starts.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if ((starts[mid] ?? 0) <= pos) lo = mid;
    else hi = mid - 1;
  }
  return { line: lo, column: pos - (starts[lo] ?? 0) };
}

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
  // Walk lines backwards from `position` looking for the first
  // non-blank line; that line's leading indent is the block indent.
  const lineStarts = getECMALineStarts(sourceFile);
  const text = sourceFileText(sourceFile);
  let line = getECMALineOfPosition(sourceFile, position) - 1;
  while (line >= 0) {
    const start = lineStarts[line]!;
    const end = line + 1 < lineStarts.length ? lineStarts[line + 1]! : text.length;
    // Skip blank lines.
    let i = start;
    while (i < end && isWhitespace(text.charCodeAt(i))) i += 1;
    if (i < end && text.charCodeAt(i) !== 0x0a && text.charCodeAt(i) !== 0x0d) {
      return findFirstNonWhitespaceColumn(start, end, sourceFile, options);
    }
    line -= 1;
  }
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
  // Walk the ancestor chain of `precedingToken`. For each ancestor that
  // (a) starts on its own line *before* lineAtPosition and (b) is a
  // node kind that contributes indent (block, object literal, array
  // literal, parenthesized list, control-flow body, type/interface
  // member list), add one indent level.
  void assumeNewLineBeforeCloseBrace;
  const indentSize = options.indentSize ?? 4;
  let indent = 0;
  let n: AstNode | undefined = precedingToken;
  let prevLine = lineAtPosition;
  while (n !== undefined) {
    const startPos = (n as unknown as { pos?: number }).pos ?? -1;
    if (startPos >= 0) {
      const startLine = getECMALineOfPosition(sourceFile, startPos);
      if (startLine !== prevLine && shouldIndentChildNode(nodeKind(n))) {
        indent += indentSize;
        prevLine = startLine;
      }
    }
    n = nodeParent(n);
  }
  void position;
  return indent;
}

function shouldIndentChildNode(k: number): boolean {
  switch (k) {
    case Kind.Block:
    case Kind.ObjectLiteralExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.ParenthesizedExpression:
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.InterfaceDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.ModuleBlock:
    case Kind.EnumDeclaration:
    case Kind.IfStatement:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.WhileStatement:
    case Kind.DoStatement:
    case Kind.SwitchStatement:
    case Kind.CaseBlock:
    case Kind.CaseClause:
    case Kind.DefaultClause:
    case Kind.TryStatement:
    case Kind.CatchClause:
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.MethodDeclaration:
    case Kind.ArrowFunction:
    case Kind.ConstructorType:
    case Kind.FunctionType:
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.ConditionalExpression:
    case Kind.JsxElement:
    case Kind.JsxFragment:
    case Kind.JsxAttribute:
    case Kind.JsxExpression:
    case Kind.JsxOpeningElement:
    case Kind.JsxClosingElement:
    case Kind.TypeLiteral:
    case Kind.MappedType:
    case Kind.TupleType:
    case Kind.UnionType:
    case Kind.IntersectionType:
      return true;
    default:
      return false;
  }
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

