/**
 * LSP line-map utilities.
 *
 * Port of TS-Go `internal/ls/lsconv/linemap.go`. This differs from ECMAScript
 * scanner line starts intentionally: LSP line maps only treat `\n`, `\r`, and
 * `\r\n` as line breaks and also record whether the text is ASCII-only.
 */

import type { TextPos } from "../../core/index.js";

export type LSPLineStarts = readonly TextPos[];

export class LSPLineMap {
  readonly lineStarts: LSPLineStarts;
  readonly asciiOnly: boolean;

  constructor(lineStarts: LSPLineStarts, asciiOnly: boolean) {
    this.lineStarts = lineStarts;
    this.asciiOnly = asciiOnly;
  }

  computeIndexOfLineStart(targetPos: TextPos): number {
    let low = 0;
    let high = this.lineStarts.length;
    while (low < high) {
      const middle = (low + high) >> 1;
      const value = this.lineStarts[middle]!;
      if (value < targetPos) low = middle + 1;
      else high = middle;
    }
    const exact = low < this.lineStarts.length && this.lineStarts[low] === targetPos;
    return !exact && low > 0 ? low - 1 : low;
  }
}

export function computeLSPLineStarts(text: string): LSPLineMap {
  const lineStarts: TextPos[] = [];
  let asciiOnly = true;
  let position = 0;
  let lineStart = 0;

  while (position < text.length) {
    const code = text.charCodeAt(position);
    if (code < 0x80) {
      position += 1;
      if (code === 13) {
        if (position < text.length && text.charCodeAt(position) === 10) {
          position += 1;
        }
        lineStarts.push(lineStart as TextPos);
        lineStart = position;
      } else if (code === 10) {
        lineStarts.push(lineStart as TextPos);
        lineStart = position;
      }
    } else {
      const codePoint = text.codePointAt(position);
      position += codePoint !== undefined && codePoint > 0xffff ? 2 : 1;
      asciiOnly = false;
    }
  }

  lineStarts.push(lineStart as TextPos);
  return new LSPLineMap(lineStarts, asciiOnly);
}

export const ComputeLSPLineStarts = computeLSPLineStarts;
