/**
 * AST range / position helpers.
 *
 * Ported from Strada `utilities.go` — getTextRangeOfNode,
 * getLineAndColumn, getSourceFileOfNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export interface TextRange {
  readonly pos: number;
  readonly end: number;
}

/**
 * Returns the [pos, end) text-range of a node.
 */
export function getNodeTextRange(node: AstNode): TextRange {
  return {
    pos: (node as unknown as { pos?: number }).pos ?? 0,
    end: (node as unknown as { end?: number }).end ?? 0,
  };
}

/**
 * Returns the source file node enclosing `node`.
 */
export function getSourceFileOfNode(node: AstNode): AstNode | undefined {
  const walker = (current: AstNode | undefined): AstNode | undefined => {
    if (current === undefined) return undefined;
    if (current.kind === Kind.SourceFile) return current;
    return walker((current as unknown as { parent?: AstNode }).parent);
  };
  return walker(node);
}

/**
 * Returns the file name where `node` is declared.
 */
export function getFileNameOfNode(node: AstNode): string | undefined {
  const sf = getSourceFileOfNode(node);
  if (sf === undefined) return undefined;
  return (sf as unknown as { fileName?: string }).fileName;
}

/**
 * Returns the 1-based line and column of a position in source text.
 */
export function getLineAndColumn(
  text: string,
  pos: number,
): { line: number; column: number } {
  const ref: { line: number; column: number; index: number } = { line: 1, column: 1, index: 0 };
  while (ref.index < pos && ref.index < text.length) {
    if (text[ref.index] === "\n") {
      ref.line++;
      ref.column = 1;
    } else {
      ref.column++;
    }
    ref.index++;
  }
  return { line: ref.line, column: ref.column };
}

/**
 * Returns the substring of source text for a given range.
 */
export function getRangeText(text: string, range: TextRange): string {
  return text.slice(range.pos, range.end);
}

/**
 * Returns true when `a` fully contains `b`.
 */
export function rangeContains(a: TextRange, b: TextRange): boolean {
  return a.pos <= b.pos && a.end >= b.end;
}

/**
 * Returns true when two ranges overlap (non-empty intersection).
 */
export function rangesOverlap(a: TextRange, b: TextRange): boolean {
  return a.pos < b.end && b.pos < a.end;
}

/**
 * Returns the union of two ranges.
 */
export function unionRanges(a: TextRange, b: TextRange): TextRange {
  return { pos: Math.min(a.pos, b.pos), end: Math.max(a.end, b.end) };
}
