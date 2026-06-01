/**
 * Fourslash test-data parser.
 *
 * Port of TS-Go `internal/fourslash/test_parser.go`. The parser removes
 * marker metacharacters from virtual test files while preserving both raw
 * character offsets and LSP line/character locations for markers and ranges.
 */

import { TextRange, newTextRange } from "../core/index.js";
import { Converters } from "../ls/lsconv/index.js";
import type { Location, Position, Range } from "../lsp/lsproto/index.js";
import { parseTestFilesAndSymlinksWithOptions } from "../runner/testCaseParser.js";
import { getNormalizedAbsolutePath } from "../tspath/index.js";

export interface MarkerOrRange {
  fileName(): string;
  lsPos(): Position;
  getName(): string | undefined;
}

export class RangeMarker implements MarkerOrRange {
  readonly sourceFileName: string;
  readonly range: TextRange;
  readonly lsRange: Range;
  readonly marker: Marker | undefined;

  constructor(sourceFileName: string, range: TextRange, lsRange: Range, marker?: Marker) {
    this.sourceFileName = sourceFileName;
    this.range = range;
    this.lsRange = lsRange;
    this.marker = marker;
  }

  lsPos(): Position {
    return this.lsRange.start;
  }

  fileName(): string {
    return this.sourceFileName;
  }

  getName(): string | undefined {
    return this.marker?.name;
  }

  lsLocation(): Location {
    return { uri: fileNameToDocumentURI(this.sourceFileName), range: this.lsRange };
  }
}

export class Marker implements MarkerOrRange {
  readonly sourceFileName: string;
  readonly position: number;
  readonly lsPosition: Position;
  readonly name: string | undefined;
  readonly data: ReadonlyMap<string, unknown> | undefined;

  constructor(
    sourceFileName: string,
    position: number,
    lsPosition: Position,
    name?: string,
    data?: ReadonlyMap<string, unknown>,
  ) {
    this.sourceFileName = sourceFileName;
    this.position = position;
    this.lsPosition = lsPosition;
    this.name = name;
    this.data = data;
  }

  lsPos(): Position {
    return this.lsPosition;
  }

  fileName(): string {
    return this.sourceFileName;
  }

  getName(): string | undefined {
    return this.name;
  }

  markerWithSymlink(fileName: string): Marker {
    return new Marker(fileName, this.position, this.lsPosition, this.name, this.data);
  }
}

export interface TestData {
  readonly files: readonly TestFileInfo[];
  readonly markerPositions: ReadonlyMap<string, Marker>;
  readonly markers: readonly Marker[];
  readonly symlinks: ReadonlyMap<string, string>;
  readonly globalOptions: ReadonlyMap<string, string>;
  readonly ranges: readonly RangeMarker[];
}

export function isStateBaseliningEnabled(options: ReadonlyMap<string, string>): boolean {
  return options.get("statebaseline") === "true";
}

export function testDataStateBaseliningEnabled(testData: TestData): boolean {
  return isStateBaseliningEnabled(testData.globalOptions);
}

interface TestFileWithMarkers {
  readonly file: TestFileInfo;
  readonly markers: readonly Marker[];
  readonly ranges: readonly RangeMarker[];
}

export function parseTestData(contents: string, fileName: string): TestData {
  const files: TestFileInfo[] = [];
  const markerPositions = new Map<string, Marker>();
  const markers: Marker[] = [];
  const ranges: RangeMarker[] = [];

  const parsed = parseTestFilesAndSymlinksWithOptions(
    contents,
    fileName,
    parseFileContent,
    { allowImplicitFirstFile: true },
  );

  let hasTSConfig = false;
  for (const fileWithMarkers of parsed.units) {
    files.push(fileWithMarkers.file);
    hasTSConfig = hasTSConfig || isConfigFile(fileWithMarkers.file.fileName);
    markers.push(...fileWithMarkers.markers);
    ranges.push(...fileWithMarkers.ranges);

    for (const marker of fileWithMarkers.markers) {
      if (marker.name === undefined) {
        if (marker.data !== undefined) continue;
        throw new FourslashParseError(`Marker at position ${marker.position} is unnamed`);
      }
      const existing = markerPositions.get(marker.name);
      if (existing !== undefined) {
        throw new FourslashParseError(`Duplicate marker name: "${marker.name}" at ${marker.position} and ${existing.position}`);
      }
      markerPositions.set(marker.name, marker);
    }
  }

  if (
    hasTSConfig
    && hasUnsupportedGlobalOptionsWithConfig(parsed.globalOptions)
    && !isStateBaseliningEnabled(parsed.globalOptions)
  ) {
    throw new FourslashParseError("It is not allowed to use global options along with config files.");
  }

  return {
    files,
    markerPositions,
    markers,
    symlinks: parsed.symlinks,
    globalOptions: parsed.globalOptions,
    ranges,
  };
}

export function hasUnsupportedGlobalOptionsWithConfig(globalOptions: ReadonlyMap<string, string>): boolean {
  for (const option of globalOptions.keys()) {
    switch (option.toLowerCase()) {
      case "symlink":
      case "link":
      case "usecasesensitivefilenames":
        continue;
      default:
        return true;
    }
  }
  return false;
}

export function isConfigFile(fileName: string): boolean {
  const lower = fileName.toLowerCase();
  return lower.endsWith("tsconfig.json") || lower.endsWith("jsconfig.json");
}

interface LocationInformation {
  readonly position: number;
  readonly sourcePosition: number;
  readonly sourceLine: number;
  readonly sourceColumn: number;
}

interface RangeLocationInformation extends LocationInformation {
  marker?: Marker;
}

export class TestFileInfo {
  readonly fileName: string;
  readonly content: string;
  readonly emit: boolean;
  readonly lineStarts: readonly number[];

  constructor(fileName: string, content: string, emit: boolean) {
    this.fileName = fileName;
    this.content = content;
    this.emit = emit;
    this.lineStarts = computeLineStarts(content);
  }

  text(): string {
    return this.content;
  }
}

export const emitThisFileOption = "emitthisfile";

const enum ParserState {
  None,
  InSlashStarMarker,
  InObjectMarker,
}

export function parseFileContent(
  rawFileName: string,
  rawContent: string,
  fileOptions: ReadonlyMap<string, string>,
): TestFileWithMarkers {
  const fileName = getNormalizedAbsolutePath(rawFileName, "/");
  const content = chompLeadingSpace(rawContent);
  const output: string[] = [];
  const markers: Marker[] = [];
  const openRanges: RangeLocationInformation[] = [];
  const closedRanges: readonly { readonly fileName: string; readonly range: TextRange; readonly marker?: Marker }[] = [];
  const rangeRecords: { fileName: string; range: TextRange; marker?: Marker }[] = [...closedRanges];

  let difference = 0;
  let line = 1;
  let column = 1;
  let openMarker: LocationInformation | undefined;
  let lastNormalCharPosition = 0;
  let state = ParserState.None;
  let previousCharacter = content.length === 0 ? "" : content[0]!;

  const flush = (lastSafeCharIndex: number): void => {
    if (lastSafeCharIndex !== -1) {
      output.push(content.slice(lastNormalCharPosition, lastSafeCharIndex));
    } else {
      output.push(content.slice(lastNormalCharPosition));
    }
  };

  for (let index = content.length === 0 ? 0 : 1; index < content.length; index += 1) {
    const currentCharacter = content[index]!;
    switch (state) {
      case ParserState.None:
        if (previousCharacter === "[" && currentCharacter === "|") {
          openRanges.push({
            position: (index - 1) - difference,
            sourcePosition: index - 1,
            sourceLine: line,
            sourceColumn: column,
          });
          flush(index - 1);
          lastNormalCharPosition = index + 1;
          difference += 2;
        } else if (previousCharacter === "|" && currentCharacter === "]") {
          if (openRanges.length === 0) {
            throw reportError(fileName, line, column, "Found range end with no matching start.");
          }
          const rangeStart = openRanges.pop()!;
          const record = {
            fileName,
            range: newTextRange(rangeStart.position, (index - 1) - difference),
          };
          rangeRecords.push(rangeStart.marker === undefined ? record : { ...record, marker: rangeStart.marker });
          flush(index - 1);
          lastNormalCharPosition = index + 1;
          difference += 2;
        } else if (previousCharacter === "/" && currentCharacter === "*") {
          state = ParserState.InSlashStarMarker;
          openMarker = {
            position: (index - 1) - difference,
            sourcePosition: index - 1,
            sourceLine: line,
            sourceColumn: column - 1,
          };
        } else if (previousCharacter === "{" && currentCharacter === "|") {
          state = ParserState.InObjectMarker;
          openMarker = {
            position: (index - 1) - difference,
            sourcePosition: index - 1,
            sourceLine: line,
            sourceColumn: column,
          };
          flush(index - 1);
        }
        break;
      case ParserState.InObjectMarker:
        if (previousCharacter === "|" && currentCharacter === "}") {
          const location = requireOpenMarker(openMarker);
          const objectMarkerData = content.slice(location.sourcePosition + 2, index - 1).trim();
          const marker = getObjectMarker(fileName, location, objectMarkerData);
          if (openRanges.length > 0) openRanges[openRanges.length - 1]!.marker = marker;
          markers.push(marker);
          lastNormalCharPosition = index + 1;
          difference += index + 1 - location.sourcePosition;
          openMarker = undefined;
          state = ParserState.None;
        }
        break;
      case ParserState.InSlashStarMarker:
        if (previousCharacter === "*" && currentCharacter === "/") {
          const location = requireOpenMarker(openMarker);
          const markerNameText = content.slice(location.sourcePosition + 2, index - 1).trim();
          const marker = new Marker(fileName, location.position, { line: 0, character: 0 }, markerNameText);
          if (openRanges.length > 0) openRanges[openRanges.length - 1]!.marker = marker;
          markers.push(marker);
          flush(location.sourcePosition);
          lastNormalCharPosition = index + 1;
          difference += index + 1 - location.sourcePosition;
          openMarker = undefined;
          state = ParserState.None;
        } else if (!isMarkerCharacter(currentCharacter)) {
          const closingSoon = currentCharacter === "*" && index < content.length - 1 && content[index + 1] === "/";
          if (!closingSoon) {
            flush(index);
            lastNormalCharPosition = index;
            openMarker = undefined;
            state = ParserState.None;
          }
        }
        break;
    }

    if (currentCharacter === "\n" && previousCharacter === "\r") {
      continue;
    } else if (currentCharacter === "\n" || currentCharacter === "\r") {
      line += 1;
      column = 1;
      continue;
    }

    column += 1;
    if (index >= lastNormalCharPosition) {
      previousCharacter = currentCharacter;
    } else {
      previousCharacter = "";
    }
  }

  flush(-1);

  if (openRanges.length > 0) {
    const openRange = openRanges[0]!;
    throw reportError(fileName, openRange.sourceLine, openRange.sourceColumn, "Unterminated range.");
  }
  if (openMarker !== undefined) {
    throw reportError(fileName, openMarker.sourceLine, openMarker.sourceColumn, "Unterminated marker.");
  }

  const outputString = output.join("");
  const testFileInfo = new TestFileInfo(fileName, outputString, fileOptions.get(emitThisFileOption) === "true");
  const converters = new Converters();

  const completedMarkers = markers.map((marker) => new Marker(
    marker.sourceFileName,
    marker.position,
    converters.positionToLineAndCharacter(testFileInfo, marker.position),
    marker.name,
    marker.data,
  ));

  const markerByIdentity = new Map<Marker, Marker>();
  for (let index = 0; index < markers.length; index += 1) {
    markerByIdentity.set(markers[index]!, completedMarkers[index]!);
  }

  const rangeMarkers = rangeRecords
    .sort((left, right) => left.range.pos !== right.range.pos ? left.range.pos - right.range.pos : right.range.end - left.range.end)
    .map((record) => new RangeMarker(
      record.fileName,
      record.range,
      converters.toLSPRange(testFileInfo, record.range),
      record.marker === undefined ? undefined : markerByIdentity.get(record.marker),
    ));

  return {
    file: testFileInfo,
    markers: completedMarkers,
    ranges: rangeMarkers,
  };
}

function requireOpenMarker(openMarker: LocationInformation | undefined): LocationInformation {
  if (openMarker === undefined) throw new FourslashParseError("internal parser error: marker state has no open marker");
  return openMarker;
}

function getObjectMarker(fileName: string, location: LocationInformation, text: string): Marker {
  let value: unknown;
  try {
    value = JSON.parse(`{ ${text} }`) as unknown;
  } catch {
    throw reportError(fileName, location.sourceLine, location.sourceColumn, `Unable to parse marker text ${text}`);
  }

  if (!isObject(value) || Object.keys(value).length === 0) {
    throw reportError(fileName, location.sourceLine, location.sourceColumn, "Object markers can not be empty");
  }

  const data = new Map<string, unknown>(Object.entries(value));
  const rawName = data.get("name");
  const name = typeof rawName === "string" && rawName !== "" ? rawName : undefined;
  return new Marker(fileName, location.position, { line: 0, character: 0 }, name, data);
}

function reportError(fileName: string, line: number, column: number, message: string): FourslashParseError {
  return new FourslashParseError(`${fileName} (${line},${column}): ${message}`);
}

export function chompLeadingSpace(content: string): string {
  const lines = content.split("\n");
  for (const line of lines) {
    if (line.length > 0 && line[0] !== " ") return content;
  }
  return lines.map((line) => line.length > 0 ? line.slice(1) : line).join("\n");
}

export class FourslashParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FourslashParseError";
  }
}

export function computeLineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text[index]!;
    if (ch === "\r") {
      if (text[index + 1] === "\n") index += 1;
      starts.push(index + 1);
    } else if (ch === "\n") {
      starts.push(index + 1);
    }
  }
  return starts;
}

function isMarkerCharacter(ch: string): boolean {
  return isDigit(ch) || isAsciiLetter(ch) || ch === "$" || ch === "_";
}

function isDigit(ch: string): boolean {
  return ch >= "0" && ch <= "9";
}

function isAsciiLetter(ch: string): boolean {
  return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z");
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function fileNameToDocumentURI(fileName: string): string {
  if (fileName.startsWith("^/")) return fileName;
  const normalized = fileName.startsWith("/") ? fileName : `/${fileName}`;
  return `file://${encodeURI(normalized)}`;
}
