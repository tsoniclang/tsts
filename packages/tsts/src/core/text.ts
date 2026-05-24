/**
 * TextPos and TextRange: source-position primitives.
 *
 * Port of TS-Go internal/core/text.go.
 */

import type { int } from "@tsonic/core/types.js";

/** A position in a source file as a 0-based char offset. */
export type TextPos = int;

/** A half-open range [pos, end) in a source file. */
export class TextRange {
  readonly pos: TextPos;
  readonly end: TextPos;

  constructor(pos: TextPos, end: TextPos) {
    this.pos = pos;
    this.end = end;
  }

  static undefined(): TextRange {
    return new TextRange(-1, -1);
  }

  len(): number {
    return this.end - this.pos;
  }

  isValid(): boolean {
    return this.pos >= 0 || this.end >= 0;
  }

  contains(pos: TextPos): boolean {
    return pos >= this.pos && pos < this.end;
  }

  containsInclusive(pos: TextPos): boolean {
    return pos >= this.pos && pos <= this.end;
  }

  containsExclusive(pos: TextPos): boolean {
    return this.pos < pos && pos < this.end;
  }

  withPos(pos: TextPos): TextRange {
    return new TextRange(pos, this.end);
  }

  withEnd(end: TextPos): TextRange {
    return new TextRange(this.pos, end);
  }

  containedBy(other: TextRange): boolean {
    return other.pos <= this.pos && other.end >= this.end;
  }

  /** Touching ranges (sharing an endpoint) do NOT overlap. */
  overlaps(other: TextRange): boolean {
    const start = Math.max(this.pos, other.pos);
    const end = Math.min(this.end, other.end);
    return start < end;
  }

  /** Touching ranges (sharing an endpoint) DO intersect. */
  intersects(other: TextRange): boolean {
    const start = Math.max(this.pos, other.pos);
    const end = Math.min(this.end, other.end);
    return start <= end;
  }
}

export function newTextRange(pos: TextPos, end: TextPos): TextRange {
  return new TextRange(pos, end);
}

export function undefinedTextRange(): TextRange {
  return new TextRange(-1, -1);
}

export function compareTextRanges(a: TextRange, b: TextRange): number {
  const c = a.pos - b.pos;
  if (c !== 0) return c;
  return a.end - b.end;
}
