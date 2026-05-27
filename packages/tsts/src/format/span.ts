/**
 * Format-span engine.
 *
 * Port skeleton of TS-Go `internal/format/span.go` (1242 LoC). This is
 * the heart of the formatter — given a span and the rule engine, it
 * walks the AST in pre-order, computes per-node indentation, and
 * emits text edits (insertions, deletions, replacements) by applying
 * rule actions (Space, NewLine, Delete, Indent, IndentDouble).
 *
 * Skeleton scope (preserves Strada call shapes; deeper algorithm
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

