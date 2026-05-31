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
  Kind, nodeFlags, nodePos, nodeEnd, nodeParent,
  forEachChild as astForEachChild,
  getECMALineOfPosition as _astGetECMALineOfPosition,
} from "../ast/index.js";
import { NodeFlags } from "../ast/index.js";
import type { FormatCodeSettings, FormatRequestKind, TextRange } from "./api.js";
import { FormattingContext, type TextRangeWithKind } from "./context.js";
import { RuleAction, type RuleSpec } from "./rule.js";
import { getRules } from "./rulesmap.js";

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

export class FormatSpanRunner {
  private readonly ctx: FormatContext;
  private readonly edits: TextChange[] = [];
  private readonly formatContext: FormattingContext;
  private previousToken: TokenInfo | undefined;
  private previousParent: AstNode | undefined;
  private previousTriviaEnd = -1;
  private lastIndentedLine = -1;
  private indentationOnLastIndentedLine = -1;
  private readonly dynamicIndenter: DynamicIndenter;

  constructor(ctx: FormatContext) {
    this.ctx = ctx;
    this.formatContext = new FormattingContext(ctx.sourceFile, ctx.requestKind, ctx.options);
    this.dynamicIndenter = new DynamicIndenter(ctx.options, ctx.initialIndentation, ctx.delta);
  }

  run(): readonly TextChange[] {
    this.ctx.formattingScanner.readNextToken();
    if (this.ctx.formattingScanner.isOnToken()) {
      this.processNode(this.ctx.enclosingNode, this.ctx.initialIndentation);
    }
    this.finishTrailingTrivia();
    return this.edits;
  }

  processNode(node: AstNode, indentation: number): void {
    if (!nodeOverlaps(node, this.ctx.originalRange)) return;
    this.consumeTokensUpTo(nodePos(node), node, indentation);
    forEachChild(node, (child) => {
      const childIndent = shouldIndentChildNode(this.ctx.options, node, child, this.ctx.sourceFile)
        ? indentation + (this.ctx.options.indentSize ?? 4)
        : indentation;
      this.processNode(child, childIndent);
      return false;
    });
    this.consumeTokensUpTo(nodeEnd(node), node, indentation);
  }

  private consumeTokensUpTo(position: number, parent: AstNode, indentation: number): void {
    while (this.ctx.formattingScanner.isOnToken()) {
      const token = this.ctx.formattingScanner.getCurrentTokenInfo();
      if (token === undefined || token.pos > position) return;
      this.processToken(token, parent, indentation);
      this.ctx.formattingScanner.readNextToken();
    }
  }

  private processToken(token: TokenInfo, parent: AstNode, indentation: number): void {
    if (this.rangeContainsError(tokenRange(token))) {
      this.previousToken = token;
      this.previousParent = parent;
      this.previousTriviaEnd = token.end;
      return;
    }
    this.processLeadingTrivia(token, indentation);
    if (this.previousToken !== undefined && this.previousParent !== undefined) {
      this.applyRules(this.previousToken, token, this.previousParent, parent);
    }
    this.previousToken = token;
    this.previousParent = parent;
    this.previousTriviaEnd = token.end;
  }

  private processLeadingTrivia(token: TokenInfo, indentation: number): void {
    const trivia = this.ctx.formattingScanner.getCurrentLeadingTrivia();
    if (trivia.length === 0) return;
    const first = trivia[0]!;
    const last = trivia[trivia.length - 1]!;
    const triviaRange = { pos: first.pos, end: last.end };
    if (!rangesOverlap(triviaRange, this.ctx.originalRange)) return;
    const newLine = this.newLine();
    const text = trivia.map(part => part.text).join("");
    if (!text.includes("\n") && !text.includes("\r")) return;
    const line = lineOfToken(token, this.ctx.sourceFile);
    const indentationText = indentationString(indentation, this.ctx.options);
    this.lastIndentedLine = line;
    this.indentationOnLastIndentedLine = indentation;
    const replacement = normalizeTriviaIndentation(text, newLine, indentationText);
    const change = replaceWhitespace(sourceTextOf(this.ctx.sourceFile), triviaRange.pos, triviaRange.end, replacement);
    if (change !== undefined) this.edits.push(change);
  }

  private applyRules(left: TokenInfo, right: TokenInfo, leftParent: AstNode, rightParent: AstNode): void {
    if (!rangesOverlap({ pos: left.end, end: right.pos }, this.ctx.originalRange)) return;
    const commonParent = nearestCommonAncestor(leftParent, rightParent) ?? rightParent;
    this.formatContext.updateContext(
      toTextRangeWithKind(left),
      leftParent,
      toTextRangeWithKind(right),
      rightParent,
      commonParent,
    );
    const rules = getRules(this.formatContext, []);
    const action = combineRuleActions(rules);
    if (action === RuleAction.None) return;
    this.applyRuleAction(action, left, right);
  }

  private applyRuleAction(action: RuleAction, left: TokenInfo, right: TokenInfo): void {
    const start = left.end;
    const end = right.pos;
    const current = sourceTextOf(this.ctx.sourceFile).slice(start, end);
    if ((action & RuleAction.DeleteToken) !== 0) {
      this.edits.push(deleteText(right.pos, right.end));
      return;
    }
    if ((action & RuleAction.InsertTrailingSemicolon) !== 0 && left.kind !== Kind.SemicolonToken) {
      this.edits.push(insertText(left.end, ";"));
    }
    if ((action & RuleAction.InsertNewLine) !== 0) {
      const line = lineOfToken(right, this.ctx.sourceFile);
      const indentation = this.dynamicIndenter.indentationString(line);
      this.replaceInterTokenTrivia(start, end, `${this.newLine()}${indentation}`);
      return;
    }
    if ((action & RuleAction.InsertSpace) !== 0) {
      this.replaceInterTokenTrivia(start, end, " ");
      return;
    }
    if ((action & RuleAction.DeleteSpace) !== 0 && current.length > 0) {
      this.replaceInterTokenTrivia(start, end, "");
    }
  }

  private replaceInterTokenTrivia(start: number, end: number, replacement: string): void {
    const change = replaceWhitespace(sourceTextOf(this.ctx.sourceFile), start, end, replacement);
    if (change !== undefined) this.edits.push(change);
  }

  private finishTrailingTrivia(): void {
    if (this.previousTriviaEnd < 0) return;
    if (this.ctx.originalRange.end <= this.previousTriviaEnd) return;
    const text = sourceTextOf(this.ctx.sourceFile);
    const trailing = text.slice(this.previousTriviaEnd, this.ctx.originalRange.end);
    if (this.ctx.options.trimTrailingWhitespace === true && trailing.trim().length === 0 && trailing.length > 0) {
      const newText = trailing.includes("\n") || trailing.includes("\r") ? this.newLine() : "";
      const change = replaceWhitespace(text, this.previousTriviaEnd, this.ctx.originalRange.end, newText);
      if (change !== undefined) this.edits.push(change);
    }
  }

  private rangeContainsError(range: TextRange): boolean {
    return (this.ctx as unknown as { rangeContainsError?: (range: TextRange) => boolean }).rangeContainsError?.(range) ?? false;
  }

  private newLine(): string {
    return this.ctx.options.newLineCharacter ?? "\n";
  }
}

function sourceTextOf(sourceFile: SourceFile): string {
  return (sourceFile as unknown as { text?: string }).text ?? "";
}

function normalizeTriviaIndentation(text: string, newLine: string, indentation: string): string {
  const normalized = text.replace(/\r\n?/g, "\n");
  const lines = normalized.split("\n");
  if (lines.length <= 1) return text;
  return lines.map((line, index) => {
    if (index === 0) return line;
    if (line.trim().length === 0) return "";
    return indentation + line.trimStart();
  }).join(newLine);
}

function toTextRangeWithKind(token: TokenInfo): TextRangeWithKind {
  return { loc: { pos: token.pos, end: token.end }, kind: token.kind };
}

function combineRuleActions(rules: readonly RuleSpec[]): RuleAction {
  let action = RuleAction.None;
  for (const ruleSpec of rules) {
    action |= ruleSpec.rule.action;
    if ((ruleSpec.rule.action & RuleAction.StopProcessingSpaceActions) !== 0) break;
  }
  return action;
}

function nearestCommonAncestor(left: AstNode, right: AstNode): AstNode | undefined {
  const ancestors = new Set<AstNode>();
  let current: AstNode | undefined = left;
  while (current !== undefined) {
    ancestors.add(current);
    current = nodeParent(current);
  }
  current = right;
  while (current !== undefined) {
    if (ancestors.has(current)) return current;
    current = nodeParent(current);
  }
  return undefined;
}

export function sortTextChanges(changes: readonly TextChange[]): readonly TextChange[] {
  return [...changes].sort((left, right) => left.span.start - right.span.start || left.span.length - right.span.length);
}

export function validateTextChanges(changes: readonly TextChange[]): void {
  const sorted = sortTextChanges(changes);
  let previousEnd = -1;
  for (const change of sorted) {
    if (change.span.start < previousEnd) {
      throw new Error("Overlapping format text changes are not allowed");
    }
    previousEnd = change.span.start + change.span.length;
  }
}

export function coalesceTextChanges(changes: readonly TextChange[]): readonly TextChange[] {
  const sorted = sortTextChanges(changes);
  const out: TextChange[] = [];
  for (const change of sorted) {
    const previous = out[out.length - 1];
    if (previous !== undefined && previous.span.start + previous.span.length === change.span.start) {
      out[out.length - 1] = {
        span: {
          start: previous.span.start,
          length: previous.span.length + change.span.length,
        },
        newText: previous.newText + change.newText,
      };
      continue;
    }
    out.push(change);
  }
  return out;
}

export function applyValidatedTextChanges(sourceText: string, changes: readonly TextChange[]): string {
  validateTextChanges(changes);
  return applyTextChanges(sourceText, changes);
}

export function textChangesEqual(left: TextChange, right: TextChange): boolean {
  return left.span.start === right.span.start
    && left.span.length === right.span.length
    && left.newText === right.newText;
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
