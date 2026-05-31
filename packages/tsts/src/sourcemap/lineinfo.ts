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

  lineText(line: int): string {
    const pos = this.lineStarts[line]!;
    const nextLine: int = (line + 1) | 0;
    const end = nextLine < this.lineStarts.length ? this.lineStarts[nextLine]! : this.text.length;
    return this.text.slice(pos as unknown as number, end as unknown as number);
  }
}

export function createECMALineInfo(text: string, lineStarts: readonly TextPos[]): ECMALineInfo {
  return new ECMALineInfo(text, lineStarts);
}
