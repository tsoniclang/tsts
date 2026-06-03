/**
 * ECMALineInfo — text + computed line-start positions.
 *
 * Port of TS-Go `internal/sourcemap/lineinfo.go` (30 LoC).
 */

import type { int } from "@tsonic/core/types.js";
import type { TextPos } from "../core/text.js";

export class ECMALineInfo {
  readonly text: string;
  readonly lineStarts: readonly TextPos[];

  constructor(text: string, lineStarts: readonly TextPos[]) {
    this.text = text;
    this.lineStarts = lineStarts;
  }

  lineCount(): number {
    return this.lineStarts.length;
  }

  // TS-Go: `func (li *ECMALineInfo) LineText(line int) string`.
  lineText(line: int): string {
    const pos = this.lineStarts[line]!;
    let end: TextPos;
    if (line + 1 < this.lineStarts.length) {
      end = this.lineStarts[line + 1]!;
    } else {
      end = this.text.length;
    }
    return this.text.slice(pos, end);
  }
}

export function createECMALineInfo(text: string, lineStarts: readonly TextPos[]): ECMALineInfo {
  return new ECMALineInfo(text, lineStarts);
}
