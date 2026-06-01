/**
 * LSP protocol utility helpers.
 */

import type { Location, Position, Range } from "./lsp.js";
import type { IntegerOrString } from "./lspGenerated.js";

export function intToken(value: number): IntegerOrString {
  return { integer: value };
}

export function stringToken(value: string): IntegerOrString {
  return { string: value };
}

export function comparePositions(left: Position, right: Position): number {
  return left.line - right.line || left.character - right.character;
}

export function rangeContainsPosition(range: Range, position: Position): boolean {
  return comparePositions(range.start, position) <= 0 && comparePositions(position, range.end) <= 0;
}

export function compareLocations(left: Location, right: Location): number {
  return left.uri.localeCompare(right.uri)
    || comparePositions(left.range.start, right.range.start)
    || comparePositions(left.range.end, right.range.end);
}

export function sortLocations(locations: readonly Location[]): readonly Location[] {
  return [...locations].sort(compareLocations);
}
