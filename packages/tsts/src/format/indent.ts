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
  let current: AstNode = n;
  let currentStartLine = startLine;
  let currentStartCharacter = startCol;
  let parent = nodeParent(current);
  while (parent !== undefined) {
    const useActualIndentation = ignoreActualIndentationRange === undefined
      || getTokenPosOfNode(current, sourceFile, false) < ignoreActualIndentationRange.pos
      || getTokenPosOfNode(current, sourceFile, false) > ignoreActualIndentationRange.end;
    const [containerLine, containerCharacter] = getContainingListOrParentStart(parent, current, sourceFile);
    const shareLine = containerLine === currentStartLine || childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStartLine, sourceFile);
    if (useActualIndentation) {
      const listIndent = getActualIndentationForListItem(current, sourceFile, options, true);
      if (listIndent !== -1) return listIndent + indentationDelta;
      const actual = getActualIndentationForNode(current, parent, currentStartLine, currentStartCharacter, shareLine, sourceFile, options);
      if (actual !== -1) return actual + indentationDelta;
    }
    if (shouldIndentChildNode(nodeKind(parent)) && !shareLine) {
      indentationDelta += options.indentSize ?? 4;
    }
    current = parent;
    parent = nodeParent(current);
    currentStartLine = containerLine;
    currentStartCharacter = containerCharacter;
    void isNextChild;
  }
  return indentationDelta + (options.baseIndentSize ?? 0);
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
  precedingToken: AstNode,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): number {
  const containingList = getContainingList(precedingToken, sourceFile);
  if (containingList === undefined) return -1;
  const index = containingList.nodes.indexOf(precedingToken);
  if (index > 0) return deriveActualIndentationFromList(containingList, index - 1, sourceFile, options);
  return -1;
}

function getActualIndentationForListStartLine(
  list: NodeListLike | undefined,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): number {
  if (list === undefined) return -1;
  const { line, column } = getECMALineAndByteOffsetOfPosition(sourceFile, list.pos);
  return findColumnForFirstNonWhitespaceCharacterInLine(line, column, sourceFile, options);
}

function getListByPosition(
  position: number,
  parent: AstNode | undefined,
  sourceFile: SourceFile,
): NodeListLike | undefined {
  if (parent === undefined) return undefined;
  return getListByRange(position, position, parent, sourceFile);
}

interface NodeListLike {
  readonly pos: number;
  readonly end: number;
  readonly nodes: readonly AstNode[];
}

type NodeListCarrier = {
  readonly typeArguments?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  readonly properties?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  readonly elements?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  readonly members?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  readonly parameters?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  readonly typeParameters?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  readonly arguments?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  readonly declarations?: readonly AstNode[] | { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
};

export type NextTokenKind = 0 | 1 | 2;
export const NextTokenKind = {
  Unknown: 0 as NextTokenKind,
  OpenBrace: 1 as NextTokenKind,
  CloseBrace: 2 as NextTokenKind,
} as const;

export function nextTokenIsCurlyBraceOnSameLineAsCursor(
  precedingToken: AstNode,
  current: AstNode,
  lineAtPosition: number,
  sourceFile: SourceFile,
): NextTokenKind {
  const next = findNextTokenApprox(precedingToken, current);
  if (next === undefined) return NextTokenKind.Unknown;
  if (nodeKind(next) === Kind.OpenBraceToken) return NextTokenKind.OpenBrace;
  if (nodeKind(next) === Kind.CloseBraceToken && getStartLineForNode(next, sourceFile) === lineAtPosition) {
    return NextTokenKind.CloseBrace;
  }
  return NextTokenKind.Unknown;
}

export function getActualIndentationForNode(
  current: AstNode,
  parent: AstNode,
  currentLine: number,
  currentCharacter: number,
  parentAndChildShareLine: boolean,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): number {
  const useActualIndentation = isDeclarationOrStatement(current) && (nodeKind(parent) === Kind.SourceFile || !parentAndChildShareLine);
  if (!useActualIndentation) return -1;
  return findColumnForFirstNonWhitespaceCharacterInLine(currentLine, currentCharacter, sourceFile, options);
}

export function getActualIndentationForListItem(
  node: AstNode,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
  listIndentsChild: boolean,
): number {
  if (nodeParent(node) !== undefined && nodeKind(nodeParent(node)!) === Kind.VariableDeclarationList) return -1;
  const containingList = getContainingList(node, sourceFile);
  if (containingList === undefined) return -1;
  const index = containingList.nodes.indexOf(node);
  if (index !== -1) {
    const derived = deriveActualIndentationFromList(containingList, index, sourceFile, options);
    if (derived !== -1) return derived;
  }
  const delta = listIndentsChild ? options.indentSize ?? 4 : 0;
  const start = getActualIndentationForListStartLine(containingList, sourceFile, options);
  return start === -1 ? delta : start + delta;
}

export function deriveActualIndentationFromList(
  list: NodeListLike,
  index: number,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): number {
  if (index < 0 || index >= list.nodes.length) return -1;
  let node = list.nodes[index]!;
  let { line, column } = getStartLineAndCharacterForNode(node, sourceFile);
  for (let currentIndex = index; currentIndex >= 0; currentIndex -= 1) {
    node = list.nodes[currentIndex]!;
    if (nodeKind(node) === Kind.CommaToken) continue;
    const previousEndLine = getECMALineOfPosition(sourceFile, nodeEnd(node));
    if (previousEndLine !== line) return findColumnForFirstNonWhitespaceCharacterInLine(line, column, sourceFile, options);
    const start = getStartLineAndCharacterForNode(node, sourceFile);
    line = start.line;
    column = start.column;
  }
  return -1;
}

export function findColumnForFirstNonWhitespaceCharacterInLine(
  line: number,
  character: number,
  sourceFile: SourceFile,
  options: FormatCodeSettings,
): number {
  const lineStart = getPositionOfLineAndByteOffset(sourceFile, line, 0);
  return findFirstNonWhitespaceColumn(lineStart, lineStart + character, sourceFile, options);
}

export function childStartsOnTheSameLineWithElseInIfStatement(
  parent: AstNode,
  child: AstNode,
  childStartLine: number,
  sourceFile: SourceFile,
): boolean {
  if (nodeKind(parent) !== Kind.IfStatement) return false;
  const elseStatement = (parent as unknown as { readonly elseStatement?: AstNode }).elseStatement;
  if (elseStatement !== child) return false;
  const elseToken = findPrecedingTokenEx(sourceFile, nodeLoc(child).pos, parent, true);
  return elseToken !== undefined && getStartLineForNode(elseToken, sourceFile) === childStartLine;
}

export function getStartLineAndCharacterForNode(node: AstNode, sourceFile: SourceFile): { readonly line: number; readonly column: number } {
  return getECMALineAndByteOffsetOfPosition(sourceFile, getTokenPosOfNode(node, sourceFile, false));
}

export function getStartLineForNode(node: AstNode, sourceFile: SourceFile): number {
  return getECMALineOfPosition(sourceFile, getTokenPosOfNode(node, sourceFile, false));
}

export function getContainingList(node: AstNode, sourceFile: SourceFile): NodeListLike | undefined {
  const parent = nodeParent(node);
  if (parent === undefined) return undefined;
  return getListByRange(getTokenPosOfNode(node, sourceFile, false), nodeEnd(node), parent, sourceFile);
}

export function getListByRange(start: number, end: number, node: AstNode, sourceFile: SourceFile): NodeListLike | undefined {
  const range = { pos: start, end };
  switch (nodeKind(node)) {
    case Kind.TypeReference:
      return getList(readNodeList((node as unknown as NodeListCarrier).typeArguments), range, node, sourceFile);
    case Kind.ObjectLiteralExpression:
      return getList(readNodeList((node as unknown as NodeListCarrier).properties), range, node, sourceFile);
    case Kind.ArrayLiteralExpression:
      return getList(readNodeList((node as unknown as NodeListCarrier).elements), range, node, sourceFile);
    case Kind.TypeLiteral:
    case Kind.ClassDeclaration:
    case Kind.ClassExpression:
    case Kind.InterfaceDeclaration:
      return getList(readNodeList((node as unknown as NodeListCarrier).members), range, node, sourceFile)
        ?? getList(readNodeList((node as unknown as NodeListCarrier).typeParameters), range, node, sourceFile);
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.MethodSignature:
    case Kind.CallSignature:
    case Kind.Constructor:
    case Kind.ConstructorType:
    case Kind.ConstructSignature:
      return getList(readNodeList((node as unknown as NodeListCarrier).typeParameters), range, node, sourceFile)
        ?? getList(readNodeList((node as unknown as NodeListCarrier).parameters), range, node, sourceFile);
    case Kind.CallExpression:
    case Kind.NewExpression:
      return getList(readNodeList((node as unknown as NodeListCarrier).typeArguments), range, node, sourceFile)
        ?? getList(readNodeList((node as unknown as NodeListCarrier).arguments), range, node, sourceFile);
    case Kind.VariableDeclarationList:
      return getList(readNodeList((node as unknown as NodeListCarrier).declarations), range, node, sourceFile);
    default:
      return undefined;
  }
}

export function getVisualListRange(node: AstNode, list: NodeListLike, _sourceFile: SourceFile): { readonly pos: number; readonly end: number } {
  const parentStart = nodeLoc(node).pos;
  const parentEnd = nodeEnd(node);
  return {
    pos: Math.max(parentStart, list.pos),
    end: Math.min(parentEnd, list.end),
  };
}

export function getContainingListOrParentStart(
  parent: AstNode,
  child: AstNode,
  sourceFile: SourceFile,
): readonly [number, number] {
  const containingList = getContainingList(child, sourceFile);
  const startPos = containingList?.pos ?? getTokenPosOfNode(parent, sourceFile, false);
  const pos = getECMALineAndByteOffsetOfPosition(sourceFile, startPos);
  return [pos.line, pos.column];
}

export function getLineStartPositionForPosition(position: number, sourceFile: SourceFile): number {
  const line = getECMALineOfPosition(sourceFile, position);
  return getPositionOfLineAndByteOffset(sourceFile, line, 0);
}

function getList(list: NodeListLike | undefined, range: { readonly pos: number; readonly end: number }, node: AstNode, sourceFile: SourceFile): NodeListLike | undefined {
  if (list === undefined) return undefined;
  const visualRange = getVisualListRange(node, list, sourceFile);
  return rangeContainedBy(range, visualRange) ? list : undefined;
}

function readNodeList(value: NodeListCarrier[keyof NodeListCarrier] | undefined): NodeListLike | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) {
    let pos = Number.POSITIVE_INFINITY;
    let end = 0;
    for (const node of value) {
      pos = Math.min(pos, nodeLoc(node).pos);
      end = Math.max(end, nodeEnd(node));
    }
    if (!Number.isFinite(pos)) pos = 0;
    return { pos, end, nodes: value };
  }
  const list = value as { readonly nodes?: readonly AstNode[]; readonly pos?: number; readonly end?: number };
  const nodes = list.nodes;
  if (nodes === undefined) return undefined;
  let pos = list.pos ?? Number.POSITIVE_INFINITY;
  let end = list.end ?? 0;
  for (const node of nodes) {
    pos = Math.min(pos, nodeLoc(node).pos);
    end = Math.max(end, nodeEnd(node));
  }
  if (!Number.isFinite(pos)) pos = 0;
  return { pos, end, nodes };
}

function getPositionOfLineAndByteOffset(sourceFile: SourceFile, line: number, offset: number): number {
  const lineStarts = getECMALineStarts(sourceFile);
  return (lineStarts[line] ?? 0) + offset;
}

function findNextTokenApprox(precedingToken: AstNode, current: AstNode): AstNode | undefined {
  const children = readChildren(current);
  const index = children.indexOf(precedingToken);
  if (index !== -1 && index + 1 < children.length) return children[index + 1];
  return undefined;
}

function readChildren(node: AstNode): readonly AstNode[] {
  const carrier = node as unknown as { readonly children?: readonly AstNode[]; readonly nodes?: readonly AstNode[] };
  return carrier.children ?? carrier.nodes ?? [];
}

function isDeclarationOrStatement(node: AstNode): boolean {
  const kind = nodeKind(node);
  return (kind >= Kind.FirstStatement && kind <= Kind.LastStatement)
    || kind === Kind.ClassDeclaration
    || kind === Kind.InterfaceDeclaration
    || kind === Kind.TypeAliasDeclaration
    || kind === Kind.EnumDeclaration
    || kind === Kind.FunctionDeclaration
    || kind === Kind.ModuleDeclaration;
}
