/**
 * Change-tracker implementation helpers.
 *
 * Porting anchor for TS-Go `internal/ls/change/trackerimpl.go`.
 */

import type { Range, TextEdit } from "../../lsp/lsproto/index.js";
import { comparePositions } from "../../lsp/lsproto/index.js";
import type { TrackerEdit } from "./tracker.js";
import { TrackerEditKind, computeNewText, sortTrackerEdits } from "./tracker.js";

export function getTextChangesFromChanges(changes: ReadonlyMap<string, readonly TrackerEdit[]>): ReadonlyMap<string, readonly TextEdit[]> {
  const result = new Map<string, readonly TextEdit[]>();
  for (const [fileName, edits] of changes) {
    const textEdits = sortTrackerEdits(edits).map(edit => ({
      range: edit.range,
      newText: computeNewText(edit),
    }));
    if (textEdits.length > 0) result.set(fileName, textEdits);
  }
  return result;
}

export function filterRedundantChanges(sourceText: string, edits: readonly TextEdit[], offsetOfPosition: (position: TextEdit["range"]["start"]) => number): readonly TextEdit[] {
  return edits.filter(edit => {
    const start = offsetOfPosition(edit.range.start);
    const end = offsetOfPosition(edit.range.end);
    return sourceText.slice(start, end) !== edit.newText;
  });
}

export function applyTextEdits(sourceText: string, edits: readonly TextEdit[], offsetOfPosition: (position: TextEdit["range"]["start"]) => number): string {
  let result = sourceText;
  const sorted = [...edits].sort((left, right) => comparePositions(right.range.start, left.range.start));
  for (const edit of sorted) {
    const start = offsetOfPosition(edit.range.start);
    const end = offsetOfPosition(edit.range.end);
    result = `${result.slice(0, start)}${edit.newText}${result.slice(end)}`;
  }
  return result;
}

export function rangeIsEmpty(range: Range): boolean {
  return comparePositions(range.start, range.end) === 0;
}

export function editKindFromText(text: string): TrackerEditKind {
  return text === "" ? TrackerEditKind.Remove : TrackerEditKind.Text;
}
