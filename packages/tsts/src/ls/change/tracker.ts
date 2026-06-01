/**
 * Text-change tracker.
 *
 * Port of TS-Go `internal/ls/change/tracker.go`, focusing on the core range
 * edit accumulator and deterministic edit ordering.
 */

import type { Position, Range, TextEdit } from "../../lsp/lsproto/index.js";
import { comparePositions } from "../../lsp/lsproto/index.js";

export interface NodeOptions {
  readonly prefix?: string;
  readonly suffix?: string;
  readonly indentation?: number;
  readonly delta?: number;
  readonly leadingTriviaOption?: LeadingTriviaOption;
  readonly trailingTriviaOption?: TrailingTriviaOption;
  readonly joiner?: string;
}

export const enum LeadingTriviaOption {
  None = 0,
  Exclude = 1,
  IncludeAll = 2,
  JSDoc = 3,
  StartLine = 4,
}

export const enum TrailingTriviaOption {
  None = 0,
  Exclude = 1,
  ExcludeWhitespace = 2,
  Include = 3,
}

export const enum TrackerEditKind {
  Text = 1,
  Remove = 2,
  ReplaceWithSingleNode = 3,
  ReplaceWithMultipleNodes = 4,
}

export interface TrackerEdit {
  readonly kind: TrackerEditKind;
  readonly range: Range;
  readonly newText: string;
  readonly options: NodeOptions;
}

export class Tracker {
  private readonly changes = new Map<string, TrackerEdit[]>();
  readonly newLine: string;

  constructor(newLine = "\n") {
    this.newLine = newLine;
  }

  getChanges(): ReadonlyMap<string, readonly TextEdit[]> {
    const result = new Map<string, readonly TextEdit[]>();
    for (const [fileName, changes] of this.changes) {
      const sorted = sortTrackerEdits(changes);
      assertNoOverlappingChanges(sorted);
      const textEdits = sorted.map(change => ({
        range: change.range,
        newText: computeNewText(change),
      }));
      if (textEdits.length > 0) result.set(fileName, textEdits);
    }
    return result;
  }

  replaceRangeWithText(fileName: string, range: Range, text: string): void {
    this.add(fileName, { kind: TrackerEditKind.Text, range, newText: text, options: {} });
  }

  removeRange(fileName: string, range: Range): void {
    this.add(fileName, { kind: TrackerEditKind.Remove, range, newText: "", options: {} });
  }

  insertText(fileName: string, position: Position, text: string): void {
    this.replaceRangeWithText(fileName, { start: position, end: position }, text);
  }

  replaceText(fileName: string, start: Position, end: Position, text: string): void {
    this.replaceRangeWithText(fileName, { start, end }, text);
  }

  private add(fileName: string, edit: TrackerEdit): void {
    const list = this.changes.get(fileName) ?? [];
    this.changes.set(fileName, [...list, edit]);
  }
}

export function newTracker(newLine = "\n"): Tracker {
  return new Tracker(newLine);
}

export function sortTrackerEdits(edits: readonly TrackerEdit[]): readonly TrackerEdit[] {
  return [...edits].sort((left, right) => compareRanges(left.range, right.range));
}

export function compareRanges(left: Range, right: Range): number {
  return comparePositions(left.start, right.start)
    || comparePositions(left.end, right.end);
}

export function rangesOverlap(left: Range, right: Range): boolean {
  return comparePositions(left.end, right.start) > 0 && comparePositions(right.end, left.start) > 0;
}

export function assertNoOverlappingChanges(edits: readonly TrackerEdit[]): void {
  for (let index = 0; index < edits.length - 1; index += 1) {
    const left = edits[index]!;
    const right = edits[index + 1]!;
    if (rangesOverlap(left.range, right.range)) {
      throw new Error(`changes overlap: ${formatRange(left.range)} and ${formatRange(right.range)}`);
    }
  }
}

export function computeNewText(change: TrackerEdit): string {
  if (change.kind === TrackerEditKind.Remove) return "";
  const prefix = change.options.prefix ?? "";
  const suffix = change.options.suffix ?? "";
  const text = change.newText;
  return `${prefix}${text}${text.endsWith(suffix) ? "" : suffix}`;
}

export function formatRange(range: Range): string {
  return `${range.start.line}:${range.start.character}-${range.end.line}:${range.end.character}`;
}
