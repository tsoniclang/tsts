/**
 * Delete helpers for change tracker.
 *
 * Porting anchor for TS-Go `internal/ls/change/delete.go`.
 */

import type { Position, Range } from "../../lsp/lsproto/index.js";
import { comparePositions } from "../../lsp/lsproto/index.js";
import type { Tracker } from "./tracker.js";
import { LeadingTriviaOption, TrailingTriviaOption } from "./tracker.js";

export interface DeleteOptions {
  readonly leadingTrivia: LeadingTriviaOption;
  readonly trailingTrivia: TrailingTriviaOption;
}

export const defaultDeleteOptions: DeleteOptions = {
  leadingTrivia: LeadingTriviaOption.IncludeAll,
  trailingTrivia: TrailingTriviaOption.Include,
};

export function deleteRange(tracker: Tracker, fileName: string, range: Range): void {
  tracker.removeRange(fileName, range);
}

export function deletePositionRange(tracker: Tracker, fileName: string, start: Position, end: Position): void {
  tracker.removeRange(fileName, normalizeRange({ start, end }));
}

export function normalizeRange(range: Range): Range {
  return comparePositions(range.start, range.end) <= 0 ? range : { start: range.end, end: range.start };
}

export function rangeWithTrivia(range: Range, leadingStart: Position | undefined, trailingEnd: Position | undefined, options: DeleteOptions = defaultDeleteOptions): Range {
  return {
    start: options.leadingTrivia === LeadingTriviaOption.IncludeAll && leadingStart !== undefined ? leadingStart : range.start,
    end: options.trailingTrivia === TrailingTriviaOption.Include && trailingEnd !== undefined ? trailingEnd : range.end,
  };
}
