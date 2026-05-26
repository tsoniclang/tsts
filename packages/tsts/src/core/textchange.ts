/**
 * Text edit / change operations.
 *
 * Port of TS-Go `internal/core/textchange.go` (30 LoC).
 */

import type { TextRange } from "./text.js";

export interface TextChange extends TextRange {
  newText: string;
}

export function applyTextChange(text: string, change: TextChange): string {
  return text.slice(0, change.pos()) + change.newText + text.slice(change.end());
}

export function applyBulkEdits(text: string, edits: readonly TextChange[]): string {
  const parts: string[] = [];
  let lastEnd = 0;
  for (const e of edits) {
    const start = e.pos();
    if (start !== lastEnd) parts.push(text.slice(lastEnd, start));
    parts.push(e.newText);
    lastEnd = e.end();
  }
  parts.push(text.slice(lastEnd));
  return parts.join("");
}
