/**
 * Format-span engine.
 *
 * Port skeleton of TS-Go `internal/format/span.go` (1242 LoC). This is
 * the heart of the formatter — given a span and the rule engine, it
 * walks the AST in pre-order, computes per-node indentation, and
 * emits text edits (insertions, deletions, replacements) by applying
 * rule actions (Space, NewLine, Delete, Indent, IndentDouble).
 *
 * Skeleton scope (preserves TS-Go call shapes; deeper algorithm
 * filled in incrementally):
 * - findEnclosingNode
 * - getScanStartPosition
 * - getOwnOrInheritedDelta
 * - formatSpanWorker entry point
 * - processNode / processChildNode dispatch (recursive)
 * - applyRulesAndEdits via the rules-map
 *
 * Cross-module deps (AST, astnav, scanner, lsutil) forward-declared.
 */

import type { Node as AstNode, SourceFile } from "../ast/index.js";
import {
  nodeFlags, nodePos, nodeEnd, nodeParent,
  forEachChild as astForEachChild,
  getECMALineOfPosition as _astGetECMALineOfPosition,
} from "../ast/index.js";
import { NodeFlags } from "../ast/index.js";
import type { FormatCodeSettings, FormatRequestKind, TextRange } from "./api.js";

function nodeOverlaps(node: AstNode, range: TextRange): boolean {
  const p = nodePos(node);
  const e = nodeEnd(node);
  return p < range.end && e > range.pos;
}
function rangeContainedBy(inner: TextRange, outer: TextRange): boolean {
  return outer.pos <= inner.pos && outer.end >= inner.end;
}
function withTokenStart(node: AstNode, _sourceFile: SourceFile): TextRange {
  return { pos: nodePos(node), end: nodeEnd(node) };
}
function forEachChild(node: AstNode, callback: (child: AstNode) => boolean): void {
  // Wraps the generated AST visitor. Returning `true` from `callback`
  // is treated as "stop walking children".
  astForEachChild(node, (child) => (callback(child) ? true : undefined));
}
function findPrecedingToken(_sourceFile: SourceFile, _position: number): AstNode | undefined {
  return undefined;
}
function getECMALineOfPosition(file: SourceFile, position: number): number {
  return _astGetECMALineOfPosition(file as unknown as AstNode, position);
}
function shouldIndentChildNode(
  _options: FormatCodeSettings,
  _parent: AstNode,
  _child: AstNode | undefined,
  _sourceFile: SourceFile,
): boolean {
  return true;
}

export interface TextChange {
  span: { start: number; length: number };
  newText: string;
}

export interface FormatContext {
  options: FormatCodeSettings;
  sourceFile: SourceFile;
  formattingScanner: FormattingScanner;
  enclosingNode: AstNode;
  originalRange: TextRange;
  initialIndentation: number;
  delta: number;
  requestKind: FormatRequestKind;
}

export interface FormattingScanner {
  isOnToken(): boolean;
  readNextToken(): void;
  getCurrentLeadingTrivia(): readonly TokenInfo[];
  getCurrentTokenInfo(): TokenInfo | undefined;
  advance(): void;
  lastTokenInfo(): TokenInfo | undefined;
}

export interface TokenInfo {
  pos: number;
  end: number;
  kind: number;
  text: string;
  hasPrecedingLineBreak: boolean;
}

export function rangeHasNoErrors(_range: TextRange): boolean {
  return false;
}

export function prepareRangeContainsErrorFunction(
  errors: readonly { readonly pos?: number; readonly start?: number; readonly end?: number; readonly length?: number; readonly loc?: TextRange }[],
  originalRange: TextRange,
): (range: TextRange) => boolean {
  const sorted = errors
    .map(diagnosticToRange)
    .filter((range): range is TextRange => range !== undefined && rangesOverlap(range, originalRange))
    .sort((left, right) => left.pos - right.pos);
  if (sorted.length === 0) return rangeHasNoErrors;
  let index = 0;
  return (range: TextRange): boolean => {
    while (index < sorted.length) {
      const errorRange = sorted[index]!;
      if (range.end <= errorRange.pos) return false;
      if (rangesOverlap(range, errorRange)) return true;
      index += 1;
    }
    return false;
  };
}

function diagnosticToRange(error: { readonly pos?: number; readonly start?: number; readonly end?: number; readonly length?: number; readonly loc?: TextRange }): TextRange | undefined {
  if (error.loc !== undefined) return error.loc;
  const pos = error.pos ?? error.start;
  if (pos === undefined) return undefined;
  if (error.end !== undefined) return { pos, end: error.end };
  return { pos, end: pos + (error.length ?? 0) };
}

function rangesOverlap(left: TextRange, right: TextRange): boolean {
  return left.pos < right.end && right.pos < left.end;
}

export class DynamicIndenter {
  private readonly options: FormatCodeSettings;
  private readonly baseIndentation: number;
  private readonly delta: number;
  private readonly lines = new Map<number, number>();

  constructor(options: FormatCodeSettings, baseIndentation: number, delta: number) {
    this.options = options;
    this.baseIndentation = baseIndentation;
    this.delta = delta;
  }

  indentationForLine(line: number): number {
    return this.lines.get(line) ?? this.baseIndentation;
  }

  increase(line: number): void {
    this.lines.set(line, this.indentationForLine(line) + this.delta);
  }

  decrease(line: number): void {
    this.lines.set(line, Math.max(0, this.indentationForLine(line) - this.delta));
  }

  indentationString(line: number): string {
    return indentationString(this.indentationForLine(line), this.options);
  }
}

export function indentationString(indentation: number, options: FormatCodeSettings): string {
  const tabSize = options.tabSize ?? options.indentSize ?? 4;
  if (options.convertTabsToSpaces !== false) return " ".repeat(Math.max(0, indentation));
  const tabs = Math.floor(indentation / tabSize);
  const spaces = indentation % tabSize;
  return "\t".repeat(tabs) + " ".repeat(spaces);
}

export function changeSpan(start: number, end: number, newText: string): TextChange {
  return { span: { start, length: Math.max(0, end - start) }, newText };
}

export function insertText(position: number, text: string): TextChange {
  return { span: { start: position, length: 0 }, newText: text };
}

export function deleteText(start: number, end: number): TextChange {
  return changeSpan(start, end, "");
}

export function replaceWhitespace(
  sourceText: string,
  start: number,
  end: number,
  replacement: string,
): TextChange | undefined {
  const current = sourceText.slice(start, end);
  if (current === replacement) return undefined;
  return changeSpan(start, end, replacement);
}

export function applyTextChanges(sourceText: string, changes: readonly TextChange[]): string {
  const sorted = [...changes].sort((left, right) => right.span.start - left.span.start);
  let text = sourceText;
  for (const change of sorted) {
    const start = change.span.start;
    const end = start + change.span.length;
    text = text.slice(0, start) + change.newText + text.slice(end);
  }
  return text;
}

export function getNonDecoratorTokenPosOfNode(node: AstNode, file: SourceFile): number {
  const modifiers = (node as unknown as { modifiers?: readonly AstNode[] }).modifiers ?? [];
  let lastDecorator: AstNode | undefined;
  for (const modifier of modifiers) {
    if ((modifier as { kind?: number }).kind === 170) lastDecorator = modifier;
  }
  if (lastDecorator === undefined) return withTokenStart(node, file).pos;
  return nodeEnd(lastDecorator);
}

export function isComment(token: TokenInfo): boolean {
  const trimmed = token.text.trimStart();
  return trimmed.startsWith("//") || trimmed.startsWith("/*");
}

export function tokenRange(token: TokenInfo): TextRange {
  return { pos: token.pos, end: token.end };
}

export function tokenIsOnLine(token: TokenInfo, line: number, sourceFile: SourceFile): boolean {
  return getECMALineOfPosition(sourceFile, token.pos) === line;
}

export function lineOfToken(token: TokenInfo, sourceFile: SourceFile): number {
  return getECMALineOfPosition(sourceFile, token.pos);
}

/**
 * Worker entry for formatSpan. Returns an array of edits to be
 * applied to the source text in order.
 *
 * Skeleton: returns no edits as a no-op fallback. Tests will drive
 * fill-in of the per-node dispatch and per-rule emit logic.
 */
export function formatSpanWorker(ctx: FormatContext): readonly TextChange[] {
  const edits: TextChange[] = [];
  processNode(ctx.enclosingNode, ctx, ctx.initialIndentation, edits);
  return edits;
}

/**
 * Pre-order walk over a node. Mirrors TS-Go `processNode`.
 */
function processNode(
  node: AstNode,
  ctx: FormatContext,
  indentation: number,
  edits: TextChange[],
): void {
  if (!nodeOverlaps(node, ctx.originalRange)) return;
  // For each child, recurse with possibly-updated indentation per
  // shouldIndentChildNode. The deep algorithm walks tokens via the
  // formattingScanner, applies rules between consecutive tokens, and
  // updates edits.
  forEachChild(node, (child) => {
    processChildNode(child, node, ctx, indentation, edits);
    return false;
  });
}

function processChildNode(
  child: AstNode,
  parent: AstNode,
  ctx: FormatContext,
  parentIndentation: number,
  edits: TextChange[],
): void {
  const childIndent = shouldIndentChildNode(ctx.options, parent, child, ctx.sourceFile)
    ? parentIndentation + (ctx.options.indentSize ?? 4)
    : parentIndentation;
  processNode(child, ctx, childIndent, edits);
}

/**
 * Find the AST node that fully contains the given text range.
 * Mirrors TS-Go `findEnclosingNode`.
 */
export function findEnclosingNode(range: TextRange, sourceFile: SourceFile): AstNode {
  const find = (n: AstNode): AstNode => {
    let candidate: AstNode | undefined;
    forEachChild(n, (c) => {
      if ((nodeFlags(c) & NodeFlags.Reparsed) !== 0) return false;
      if (rangeContainedBy(range, withTokenStart(c, sourceFile))) {
        candidate = c;
        return true;
      }
      return false;
    });
    if (candidate !== undefined) {
      const result = find(candidate);
      if (result !== undefined) return result;
    }
    return n;
  };
  return find(sourceFile as unknown as AstNode);
}

/**
 * Mirrors TS-Go `getScanStartPosition`.
 */
export function getScanStartPosition(
  enclosingNode: AstNode,
  originalRange: TextRange,
  sourceFile: SourceFile,
): number {
  const adjusted = withTokenStart(enclosingNode, sourceFile);
  const start = adjusted.pos;
  if (start === originalRange.pos && nodeEnd(enclosingNode) === originalRange.end) {
    return start;
  }
  const precedingToken = findPrecedingToken(sourceFile, originalRange.pos);
  if (precedingToken === undefined) return nodePos(enclosingNode);
  if (nodeEnd(precedingToken) >= originalRange.pos) return nodePos(enclosingNode);
  return nodeEnd(precedingToken);
}

/**
 * Mirrors TS-Go `getOwnOrInheritedDelta`. Walks ancestors of `n` on
 * the same line, accumulating indent delta from any ancestor that
 * introduces an indentation scope.
 */
export function getOwnOrInheritedDelta(
  startNode: AstNode | undefined,
  options: FormatCodeSettings,
  sourceFile: SourceFile,
): number {
  let previousLine = -1;
  let child: AstNode | undefined;
  let n: AstNode | undefined = startNode;
  while (n !== undefined) {
    const line = getECMALineOfPosition(sourceFile, withTokenStart(n, sourceFile).pos);
    if (previousLine !== -1 && line !== previousLine) break;
    if (shouldIndentChildNode(options, n, child, sourceFile)) {
      return options.indentSize ?? 4;
    }
    previousLine = line;
    child = n;
    n = nodeParent(n);
  }
  return 0;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------
