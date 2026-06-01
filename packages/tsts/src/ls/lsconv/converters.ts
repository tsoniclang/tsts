/**
 * Language-service position converters.
 */

import type { Position, Range } from "../../lsp/lsproto/index.js";

export interface LineMapCarrier {
  readonly lineStarts: readonly number[];
}

export class Converters {
  positionToLineAndCharacter(file: LineMapCarrier, position: number): Position {
    const starts = file.lineStarts;
    let line = 0;
    for (let index = 0; index < starts.length; index += 1) {
      if ((starts[index] ?? 0) > position) break;
      line = index;
    }
    return { line, character: position - (starts[line] ?? 0) };
  }

  lineAndCharacterToPosition(file: LineMapCarrier, position: Position): number {
    return (file.lineStarts[position.line] ?? 0) + position.character;
  }

  toLSPRange(file: LineMapCarrier, range: { readonly pos: number; readonly end: number }): Range {
    return {
      start: this.positionToLineAndCharacter(file, range.pos),
      end: this.positionToLineAndCharacter(file, range.end),
    };
  }
}
