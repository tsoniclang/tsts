/**
 * Source-map range parity helpers.
 */

export interface SourceMapRange {
  readonly pos: number;
  readonly end: number;
  readonly source?: string;
}

export interface SourceMapRangeCarrier {
  sourceMapRange?: SourceMapRange;
  tokenSourceMapRanges?: ReadonlyMap<string, SourceMapRange>;
}

export function setSourceMapRange(node: SourceMapRangeCarrier, range: SourceMapRange): void {
  node.sourceMapRange = normalizeRange(range);
}

export function getSourceMapRange(node: SourceMapRangeCarrier): SourceMapRange | undefined {
  return node.sourceMapRange;
}

export function setTokenSourceMapRange(node: SourceMapRangeCarrier, token: string, range: SourceMapRange): void {
  const current = new Map(node.tokenSourceMapRanges ?? []);
  current.set(token, normalizeRange(range));
  node.tokenSourceMapRanges = current;
}

export function getTokenSourceMapRange(node: SourceMapRangeCarrier, token: string): SourceMapRange | undefined {
  return node.tokenSourceMapRanges?.get(token);
}

export function copySourceMapRanges(source: SourceMapRangeCarrier, target: SourceMapRangeCarrier): void {
  if (source.sourceMapRange !== undefined) target.sourceMapRange = source.sourceMapRange;
  if (source.tokenSourceMapRanges !== undefined) target.tokenSourceMapRanges = new Map(source.tokenSourceMapRanges);
}

export function mergeSourceMapRanges(left: SourceMapRange | undefined, right: SourceMapRange | undefined): SourceMapRange | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  return {
    pos: Math.min(left.pos, right.pos),
    end: Math.max(left.end, right.end),
    ...((left.source ?? right.source) === undefined ? {} : { source: (left.source ?? right.source)! }),
  };
}

export function sourceMapRangeContains(range: SourceMapRange, position: number): boolean {
  return range.pos <= position && position < range.end;
}

export function sourceMapRangeLength(range: SourceMapRange): number {
  return Math.max(0, range.end - range.pos);
}

export function compareSourceMapRanges(left: SourceMapRange, right: SourceMapRange): number {
  return left.pos - right.pos || left.end - right.end || (left.source ?? "").localeCompare(right.source ?? "");
}

export function sortSourceMapRanges(ranges: readonly SourceMapRange[]): readonly SourceMapRange[] {
  return [...ranges].map(normalizeRange).sort(compareSourceMapRanges);
}

export function sourceMapRangeIntersects(left: SourceMapRange, right: SourceMapRange): boolean {
  return left.pos < right.end && right.pos < left.end;
}

export function clipSourceMapRange(range: SourceMapRange, container: SourceMapRange): SourceMapRange | undefined {
  if (!sourceMapRangeIntersects(range, container)) return undefined;
  return {
    pos: Math.max(range.pos, container.pos),
    end: Math.min(range.end, container.end),
    ...((range.source ?? container.source) === undefined ? {} : { source: (range.source ?? container.source)! }),
  };
}

export function mapSourceMapRangeSource(range: SourceMapRange, mapper: (source: string | undefined) => string | undefined): SourceMapRange {
  const source = mapper(range.source);
  return {
    pos: range.pos,
    end: range.end,
    ...(source === undefined ? {} : { source }),
  };
}

export function mergeSourceMapRangeList(ranges: readonly SourceMapRange[]): readonly SourceMapRange[] {
  const sorted = sortSourceMapRanges(ranges);
  const result: SourceMapRange[] = [];
  for (const range of sorted) {
    const previous = result.at(-1);
    if (previous !== undefined && previous.end >= range.pos && previous.source === range.source) {
      result[result.length - 1] = {
        ...previous,
        end: Math.max(previous.end, range.end),
      };
    } else {
      result.push(range);
    }
  }
  return result;
}

export function splitSourceMapRangeAt(range: SourceMapRange, position: number): readonly SourceMapRange[] {
  if (position <= range.pos || position >= range.end) return [range];
  return [
    {
      pos: range.pos,
      end: position,
      ...(range.source === undefined ? {} : { source: range.source }),
    },
    {
      pos: position,
      end: range.end,
      ...(range.source === undefined ? {} : { source: range.source }),
    },
  ];
}

export function subtractSourceMapRange(range: SourceMapRange, removed: SourceMapRange): readonly SourceMapRange[] {
  const clipped = clipSourceMapRange(removed, range);
  if (clipped === undefined) return [range];
  const result: SourceMapRange[] = [];
  if (range.pos < clipped.pos) {
    result.push({
      pos: range.pos,
      end: clipped.pos,
      ...(range.source === undefined ? {} : { source: range.source }),
    });
  }
  if (clipped.end < range.end) {
    result.push({
      pos: clipped.end,
      end: range.end,
      ...(range.source === undefined ? {} : { source: range.source }),
    });
  }
  return result;
}

export function translateSourceMapRange(range: SourceMapRange, offset: number): SourceMapRange {
  return {
    pos: range.pos + offset,
    end: range.end + offset,
    ...(range.source === undefined ? {} : { source: range.source }),
  };
}

export function translateSourceMapRanges(ranges: readonly SourceMapRange[], offset: number): readonly SourceMapRange[] {
  return ranges.map(range => translateSourceMapRange(range, offset));
}

export function sourceMapRangeEnvelope(ranges: readonly SourceMapRange[]): SourceMapRange | undefined {
  if (ranges.length === 0) return undefined;
  const sorted = sortSourceMapRanges(ranges);
  const first = sorted[0]!;
  const last = sorted[sorted.length - 1]!;
  return {
    pos: first.pos,
    end: last.end,
    ...((first.source ?? last.source) === undefined ? {} : { source: (first.source ?? last.source)! }),
  };
}

export function sourceMapRangesCover(ranges: readonly SourceMapRange[], container: SourceMapRange): boolean {
  const merged = mergeSourceMapRangeList(ranges.map(range => clipSourceMapRange(range, container)).filter((range): range is SourceMapRange => range !== undefined));
  if (merged.length === 0) return false;
  let cursor = container.pos;
  for (const range of merged) {
    if (range.pos > cursor) return false;
    cursor = Math.max(cursor, range.end);
  }
  return cursor >= container.end;
}

export function compactSourceMapRangeCarriers(carriers: readonly SourceMapRangeCarrier[]): readonly SourceMapRange[] {
  return mergeSourceMapRangeList(carriers.map(carrier => carrier.sourceMapRange).filter((range): range is SourceMapRange => range !== undefined));
}

export function collectTokenSourceMapRanges(carriers: readonly SourceMapRangeCarrier[], token: string): readonly SourceMapRange[] {
  return sortSourceMapRanges(carriers.map(carrier => carrier.tokenSourceMapRanges?.get(token)).filter((range): range is SourceMapRange => range !== undefined));
}

export function sourceMapRangeStartsBefore(left: SourceMapRange, right: SourceMapRange): boolean {
  return compareSourceMapRanges(left, right) < 0;
}

export function sourceMapRangeEndsAfter(left: SourceMapRange, right: SourceMapRange): boolean {
  return left.end > right.end || (left.end === right.end && left.pos > right.pos);
}

export function assertValidSourceMapRange(range: SourceMapRange): void {
  if (range.pos < 0 || range.end < 0 || range.end < range.pos) {
    throw new Error(`Invalid source-map range ${range.pos}..${range.end}`);
  }
}

export function assertValidSourceMapRanges(ranges: readonly SourceMapRange[]): void {
  for (const range of ranges) assertValidSourceMapRange(range);
}

export function normalizeCarrierSourceMapRanges(carrier: SourceMapRangeCarrier): SourceMapRangeCarrier {
  const tokenRanges = carrier.tokenSourceMapRanges === undefined
    ? undefined
    : new Map([...carrier.tokenSourceMapRanges].map(([token, range]) => [token, normalizeRange(range)]));
  return {
    ...(carrier.sourceMapRange === undefined ? {} : { sourceMapRange: normalizeRange(carrier.sourceMapRange) }),
    ...(tokenRanges === undefined ? {} : { tokenSourceMapRanges: tokenRanges }),
  };
}

export function sourceMapRangeTouches(left: SourceMapRange, right: SourceMapRange): boolean {
  return left.end === right.pos || right.end === left.pos;
}

export function sourceMapRangeCanMerge(left: SourceMapRange, right: SourceMapRange): boolean {
  return left.source === right.source && (sourceMapRangeIntersects(left, right) || sourceMapRangeTouches(left, right));
}

function normalizeRange(range: SourceMapRange): SourceMapRange {
  return range.pos <= range.end ? range : { ...range, pos: range.end, end: range.pos };
}
