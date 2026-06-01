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

// Source parity map: internal/fourslash/test_parser.go
/**
 * Source parity map for TS-Go `fourslash/test_parser.go`.
 *
 * This file preserves the upstream declaration and algorithm-line shape
 * for the TypeScript port. Runtime behavior is implemented by the
 * concrete modules that consume these exact parity maps.
 */

interface UpstreamSourceLine {
  readonly line: number;
  readonly text: string;
}

interface UpstreamDeclaration {
  readonly kind: "type" | "func" | "const" | "var";
  readonly line: number;
  readonly name: string;
  readonly receiver?: string;
}

const homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserUpstreamPath = "fourslash/test_parser.go";

const homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserDeclarations: readonly UpstreamDeclaration[] = [
  {"line":25,"kind":"type","name":"RangeMarker"},
  {"line":32,"kind":"func","name":"LSPos","receiver":"r *RangeMarker"},
  {"line":36,"kind":"func","name":"FileName","receiver":"r *RangeMarker"},
  {"line":40,"kind":"func","name":"GetName","receiver":"r *RangeMarker"},
  {"line":47,"kind":"func","name":"LSLocation","receiver":"r *RangeMarker"},
  {"line":54,"kind":"type","name":"Marker"},
  {"line":62,"kind":"func","name":"LSPos","receiver":"m *Marker"},
  {"line":66,"kind":"func","name":"FileName","receiver":"m *Marker"},
  {"line":70,"kind":"func","name":"GetName","receiver":"m *Marker"},
  {"line":74,"kind":"func","name":"MakerWithSymlink","receiver":"m *Marker"},
  {"line":84,"kind":"type","name":"MarkerOrRange"},
  {"line":90,"kind":"type","name":"TestData"},
  {"line":99,"kind":"func","name":"isStateBaseliningEnabled","receiver":"t *TestData"},
  {"line":103,"kind":"type","name":"testFileWithMarkers"},
  {"line":109,"kind":"func","name":"isStateBaseliningEnabled"},
  {"line":113,"kind":"func","name":"ParseTestData"},
  {"line":170,"kind":"func","name":"hasUnsupportedGlobalOptionsWithConfig"},
  {"line":182,"kind":"func","name":"isConfigFile"},
  {"line":187,"kind":"type","name":"locationInformation"},
  {"line":194,"kind":"type","name":"rangeLocationInformation"},
  {"line":199,"kind":"type","name":"TestFileInfo"},
  {"line":207,"kind":"func","name":"FileName","receiver":"t *TestFileInfo"},
  {"line":212,"kind":"func","name":"Text","receiver":"t *TestFileInfo"},
  {"line":216,"kind":"var","name":"_"},
  {"line":218,"kind":"const","name":"emitThisFileOption"},
  {"line":220,"kind":"type","name":"parserState"},
  {"line":228,"kind":"func","name":"parseFileContent"},
  {"line":453,"kind":"func","name":"getObjectMarker"},
  {"line":482,"kind":"func","name":"reportError"},
  {"line":486,"kind":"func","name":"chompLeadingSpace"},
  {"line":503,"kind":"type","name":"fourslashError"},
  {"line":507,"kind":"func","name":"Error","receiver":"e *fourslashError"},
];

const homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package fourslash"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"fmt\""},
  {"line":5,"text":"\t\"slices\""},
  {"line":6,"text":"\t\"strings\""},
  {"line":7,"text":"\t\"testing\""},
  {"line":8,"text":"\t\"unicode/utf8\""},
  {"line":10,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":11,"text":"\t\"github.com/microsoft/typescript-go/internal/json\""},
  {"line":12,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/testrunner\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/tspath\""},
  {"line":17,"text":")"},
  {"line":25,"text":"type RangeMarker struct {"},
  {"line":26,"text":"\tfileName string"},
  {"line":27,"text":"\tRange    core.TextRange"},
  {"line":28,"text":"\tLSRange  lsproto.Range"},
  {"line":29,"text":"\tMarker   *Marker"},
  {"line":30,"text":"}"},
  {"line":32,"text":"func (r *RangeMarker) LSPos() lsproto.Position {"},
  {"line":33,"text":"\treturn r.LSRange.Start"},
  {"line":34,"text":"}"},
  {"line":36,"text":"func (r *RangeMarker) FileName() string {"},
  {"line":37,"text":"\treturn r.fileName"},
  {"line":38,"text":"}"},
  {"line":40,"text":"func (r *RangeMarker) GetName() *string {"},
  {"line":41,"text":"\tif r.Marker == nil {"},
  {"line":42,"text":"\t\treturn nil"},
  {"line":43,"text":"\t}"},
  {"line":44,"text":"\treturn r.Marker.Name"},
  {"line":45,"text":"}"},
  {"line":47,"text":"func (r *RangeMarker) LSLocation() lsproto.Location {"},
  {"line":48,"text":"\treturn lsproto.Location{"},
  {"line":49,"text":"\t\tUri:   lsconv.FileNameToDocumentURI(r.fileName),"},
  {"line":50,"text":"\t\tRange: r.LSRange,"},
  {"line":51,"text":"\t}"},
  {"line":52,"text":"}"},
  {"line":54,"text":"type Marker struct {"},
  {"line":55,"text":"\tfileName   string"},
  {"line":56,"text":"\tPosition   int"},
  {"line":57,"text":"\tLSPosition lsproto.Position"},
  {"line":58,"text":"\tName       *string // `nil` for anonymous markers such as `{| \"foo\": \"bar\" |}`"},
  {"line":59,"text":"\tData       map[string]any"},
  {"line":60,"text":"}"},
  {"line":62,"text":"func (m *Marker) LSPos() lsproto.Position {"},
  {"line":63,"text":"\treturn m.LSPosition"},
  {"line":64,"text":"}"},
  {"line":66,"text":"func (m *Marker) FileName() string {"},
  {"line":67,"text":"\treturn m.fileName"},
  {"line":68,"text":"}"},
  {"line":70,"text":"func (m *Marker) GetName() *string {"},
  {"line":71,"text":"\treturn m.Name"},
  {"line":72,"text":"}"},
  {"line":74,"text":"func (m *Marker) MakerWithSymlink(fileName string) *Marker {"},
  {"line":75,"text":"\treturn &Marker{"},
  {"line":76,"text":"\t\tfileName:   fileName,"},
  {"line":77,"text":"\t\tPosition:   m.Position,"},
  {"line":78,"text":"\t\tLSPosition: m.LSPosition,"},
  {"line":79,"text":"\t\tName:       m.Name,"},
  {"line":80,"text":"\t\tData:       m.Data,"},
  {"line":81,"text":"\t}"},
  {"line":82,"text":"}"},
  {"line":84,"text":"type MarkerOrRange interface {"},
  {"line":85,"text":"\tFileName() string"},
  {"line":86,"text":"\tLSPos() lsproto.Position"},
  {"line":87,"text":"\tGetName() *string"},
  {"line":88,"text":"}"},
  {"line":90,"text":"type TestData struct {"},
  {"line":91,"text":"\tFiles           []*TestFileInfo"},
  {"line":92,"text":"\tMarkerPositions map[string]*Marker"},
  {"line":93,"text":"\tMarkers         []*Marker"},
  {"line":94,"text":"\tSymlinks        map[string]string"},
  {"line":95,"text":"\tGlobalOptions   map[string]string"},
  {"line":96,"text":"\tRanges          []*RangeMarker"},
  {"line":97,"text":"}"},
  {"line":99,"text":"func (t *TestData) isStateBaseliningEnabled() bool {"},
  {"line":100,"text":"\treturn isStateBaseliningEnabled(t.GlobalOptions)"},
  {"line":101,"text":"}"},
  {"line":103,"text":"type testFileWithMarkers struct {"},
  {"line":104,"text":"\tfile    *TestFileInfo"},
  {"line":105,"text":"\tmarkers []*Marker"},
  {"line":106,"text":"\tranges  []*RangeMarker"},
  {"line":107,"text":"}"},
  {"line":109,"text":"func isStateBaseliningEnabled(globalOptions map[string]string) bool {"},
  {"line":110,"text":"\treturn globalOptions[\"statebaseline\"] == \"true\""},
  {"line":111,"text":"}"},
  {"line":113,"text":"func ParseTestData(t *testing.T, contents string, fileName string) TestData {"},
  {"line":115,"text":"\tvar files []*TestFileInfo"},
  {"line":117,"text":"\tmarkerPositions := make(map[string]*Marker)"},
  {"line":118,"text":"\tvar markers []*Marker"},
  {"line":119,"text":"\tvar ranges []*RangeMarker"},
  {"line":121,"text":"\tfilesWithMarker, symlinks, _, globalOptions, e := testrunner.ParseTestFilesAndSymlinksWithOptions("},
  {"line":122,"text":"\t\tcontents,"},
  {"line":123,"text":"\t\tfileName,"},
  {"line":124,"text":"\t\tparseFileContent,"},
  {"line":125,"text":"\t\ttestrunner.ParseTestFilesOptions{"},
  {"line":126,"text":"\t\t\tAllowImplicitFirstFile: true,"},
  {"line":127,"text":"\t\t},"},
  {"line":128,"text":"\t)"},
  {"line":129,"text":"\tif e != nil {"},
  {"line":130,"text":"\t\tt.Fatalf(\"Error parsing fourslash data: %s\", e.Error())"},
  {"line":131,"text":"\t}"},
  {"line":133,"text":"\thasTSConfig := false"},
  {"line":134,"text":"\tfor _, file := range filesWithMarker {"},
  {"line":135,"text":"\t\tfiles = append(files, file.file)"},
  {"line":136,"text":"\t\thasTSConfig = hasTSConfig || isConfigFile(file.file.fileName)"},
  {"line":138,"text":"\t\tmarkers = append(markers, file.markers...)"},
  {"line":139,"text":"\t\tranges = append(ranges, file.ranges...)"},
  {"line":140,"text":"\t\tfor _, marker := range file.markers {"},
  {"line":141,"text":"\t\t\tif marker.Name == nil {"},
  {"line":142,"text":"\t\t\t\tif marker.Data != nil {"},
  {"line":144,"text":"\t\t\t\t\tcontinue"},
  {"line":145,"text":"\t\t\t\t}"},
  {"line":146,"text":"\t\t\t\tt.Fatalf(`Marker at position %v is unnamed`, marker.Position)"},
  {"line":147,"text":"\t\t\t}"},
  {"line":148,"text":"\t\t\tif existing, ok := markerPositions[*marker.Name]; ok {"},
  {"line":149,"text":"\t\t\t\tt.Fatalf(`Duplicate marker name: \"%s\" at %v and %v`, *marker.Name, marker.Position, existing.Position)"},
  {"line":150,"text":"\t\t\t}"},
  {"line":151,"text":"\t\t\tmarkerPositions[*marker.Name] = marker"},
  {"line":152,"text":"\t\t}"},
  {"line":154,"text":"\t}"},
  {"line":156,"text":"\tif hasTSConfig && hasUnsupportedGlobalOptionsWithConfig(globalOptions) && !isStateBaseliningEnabled(globalOptions) {"},
  {"line":157,"text":"\t\tt.Fatalf(\"It is not allowed to use global options along with config files.\")"},
  {"line":158,"text":"\t}"},
  {"line":160,"text":"\treturn TestData{"},
  {"line":161,"text":"\t\tFiles:           files,"},
  {"line":162,"text":"\t\tMarkerPositions: markerPositions,"},
  {"line":163,"text":"\t\tMarkers:         markers,"},
  {"line":164,"text":"\t\tSymlinks:        symlinks,"},
  {"line":165,"text":"\t\tGlobalOptions:   globalOptions,"},
  {"line":166,"text":"\t\tRanges:          ranges,"},
  {"line":167,"text":"\t}"},
  {"line":168,"text":"}"},
  {"line":170,"text":"func hasUnsupportedGlobalOptionsWithConfig(globalOptions map[string]string) bool {"},
  {"line":171,"text":"\tfor option := range globalOptions {"},
  {"line":172,"text":"\t\tswitch strings.ToLower(option) {"},
  {"line":173,"text":"\t\tcase \"symlink\", \"link\", \"usecasesensitivefilenames\":"},
  {"line":174,"text":"\t\t\tcontinue"},
  {"line":175,"text":"\t\tdefault:"},
  {"line":176,"text":"\t\t\treturn true"},
  {"line":177,"text":"\t\t}"},
  {"line":178,"text":"\t}"},
  {"line":179,"text":"\treturn false"},
  {"line":180,"text":"}"},
  {"line":182,"text":"func isConfigFile(fileName string) bool {"},
  {"line":183,"text":"\tfileName = strings.ToLower(fileName)"},
  {"line":184,"text":"\treturn strings.HasSuffix(fileName, \"tsconfig.json\") || strings.HasSuffix(fileName, \"jsconfig.json\")"},
  {"line":185,"text":"}"},
  {"line":187,"text":"type locationInformation struct {"},
  {"line":188,"text":"\tposition       int"},
  {"line":189,"text":"\tsourcePosition int"},
  {"line":190,"text":"\tsourceLine     int"},
  {"line":191,"text":"\tsourceColumn   int"},
  {"line":192,"text":"}"},
  {"line":194,"text":"type rangeLocationInformation struct {"},
  {"line":195,"text":"\tlocationInformation"},
  {"line":196,"text":"\tmarker *Marker"},
  {"line":197,"text":"}"},
  {"line":199,"text":"type TestFileInfo struct {"},
  {"line":200,"text":"\tfileName string"},
  {"line":202,"text":"\tContent string"},
  {"line":203,"text":"\temit    bool"},
  {"line":204,"text":"}"},
  {"line":207,"text":"func (t *TestFileInfo) FileName() string {"},
  {"line":208,"text":"\treturn t.fileName"},
  {"line":209,"text":"}"},
  {"line":212,"text":"func (t *TestFileInfo) Text() string {"},
  {"line":213,"text":"\treturn t.Content"},
  {"line":214,"text":"}"},
  {"line":216,"text":"var _ lsconv.Script = (*TestFileInfo)(nil)"},
  {"line":218,"text":"const emitThisFileOption = \"emitthisfile\""},
  {"line":220,"text":"type parserState int"},
  {"line":222,"text":"const ("},
  {"line":223,"text":"\tstateNone parserState = iota"},
  {"line":224,"text":"\tstateInSlashStarMarker"},
  {"line":225,"text":"\tstateInObjectMarker"},
  {"line":226,"text":")"},
  {"line":228,"text":"func parseFileContent(fileName string, content string, fileOptions map[string]string) (*testFileWithMarkers, error) {"},
  {"line":229,"text":"\tfileName = tspath.GetNormalizedAbsolutePath(fileName, \"/\")"},
  {"line":230,"text":"\tcontent = chompLeadingSpace(content)"},
  {"line":233,"text":"\tvar output strings.Builder"},
  {"line":235,"text":"\tvar markers []*Marker"},
  {"line":238,"text":"\topenRanges := []rangeLocationInformation{}"},
  {"line":240,"text":"\trangeMarkers := []*RangeMarker{}"},
  {"line":243,"text":"\tdifference := 0"},
  {"line":246,"text":"\tline := 1"},
  {"line":247,"text":"\tcolumn := 1"},
  {"line":250,"text":"\tvar openMarker *locationInformation"},
  {"line":253,"text":"\tlastNormalCharPosition := 0"},
  {"line":255,"text":"\tflush := func(lastSafeCharIndex int) {"},
  {"line":256,"text":"\t\tif lastSafeCharIndex != -1 {"},
  {"line":257,"text":"\t\t\toutput.WriteString(content[lastNormalCharPosition:lastSafeCharIndex])"},
  {"line":258,"text":"\t\t} else {"},
  {"line":259,"text":"\t\t\toutput.WriteString(content[lastNormalCharPosition:])"},
  {"line":260,"text":"\t\t}"},
  {"line":261,"text":"\t}"},
  {"line":263,"text":"\tstate := stateNone"},
  {"line":264,"text":"\tpreviousCharacter, i := utf8.DecodeRuneInString(content)"},
  {"line":265,"text":"\tvar size int"},
  {"line":266,"text":"\tvar currentCharacter rune"},
  {"line":267,"text":"\tfor ; i < len(content); i = i + size {"},
  {"line":268,"text":"\t\tcurrentCharacter, size = utf8.DecodeRuneInString(content[i:])"},
  {"line":269,"text":"\t\tswitch state {"},
  {"line":270,"text":"\t\tcase stateNone:"},
  {"line":271,"text":"\t\t\tif previousCharacter == '[' && currentCharacter == '|' {"},
  {"line":273,"text":"\t\t\t\topenRanges = append(openRanges, rangeLocationInformation{"},
  {"line":274,"text":"\t\t\t\t\tlocationInformation: locationInformation{"},
  {"line":275,"text":"\t\t\t\t\t\tposition:       (i - 1) - difference,"},
  {"line":276,"text":"\t\t\t\t\t\tsourcePosition: i - 1,"},
  {"line":277,"text":"\t\t\t\t\t\tsourceLine:     line,"},
  {"line":278,"text":"\t\t\t\t\t\tsourceColumn:   column,"},
  {"line":279,"text":"\t\t\t\t\t},"},
  {"line":280,"text":"\t\t\t\t})"},
  {"line":282,"text":"\t\t\t\tflush(i - 1)"},
  {"line":283,"text":"\t\t\t\tlastNormalCharPosition = i + 1"},
  {"line":284,"text":"\t\t\t\tdifference += 2"},
  {"line":285,"text":"\t\t\t} else if previousCharacter == '|' && currentCharacter == ']' {"},
  {"line":287,"text":"\t\t\t\tif len(openRanges) == 0 {"},
  {"line":288,"text":"\t\t\t\t\treturn nil, reportError(fileName, line, column, \"Found range end with no matching start.\")"},
  {"line":289,"text":"\t\t\t\t}"},
  {"line":290,"text":"\t\t\t\trangeStart := openRanges[len(openRanges)-1]"},
  {"line":291,"text":"\t\t\t\topenRanges = openRanges[:len(openRanges)-1]"},
  {"line":293,"text":"\t\t\t\tclosedRange := &RangeMarker{"},
  {"line":294,"text":"\t\t\t\t\tfileName: fileName,"},
  {"line":295,"text":"\t\t\t\t\tRange:    core.NewTextRange(rangeStart.position, (i-1)-difference),"},
  {"line":296,"text":"\t\t\t\t\tMarker:   rangeStart.marker,"},
  {"line":297,"text":"\t\t\t\t}"},
  {"line":299,"text":"\t\t\t\trangeMarkers = append(rangeMarkers, closedRange)"},
  {"line":302,"text":"\t\t\t\tflush(i - 1)"},
  {"line":303,"text":"\t\t\t\tlastNormalCharPosition = i + 1"},
  {"line":304,"text":"\t\t\t\tdifference += 2"},
  {"line":305,"text":"\t\t\t} else if previousCharacter == '/' && currentCharacter == '*' {"},
  {"line":307,"text":"\t\t\t\tstate = stateInSlashStarMarker"},
  {"line":308,"text":"\t\t\t\topenMarker = &locationInformation{"},
  {"line":309,"text":"\t\t\t\t\tposition:       (i - 1) - difference,"},
  {"line":310,"text":"\t\t\t\t\tsourcePosition: i - 1,"},
  {"line":311,"text":"\t\t\t\t\tsourceLine:     line,"},
  {"line":312,"text":"\t\t\t\t\tsourceColumn:   column - 1,"},
  {"line":313,"text":"\t\t\t\t}"},
  {"line":314,"text":"\t\t\t} else if previousCharacter == '{' && currentCharacter == '|' {"},
  {"line":316,"text":"\t\t\t\tstate = stateInObjectMarker"},
  {"line":317,"text":"\t\t\t\topenMarker = &locationInformation{"},
  {"line":318,"text":"\t\t\t\t\tposition:       (i - 1) - difference,"},
  {"line":319,"text":"\t\t\t\t\tsourcePosition: i - 1,"},
  {"line":320,"text":"\t\t\t\t\tsourceLine:     line,"},
  {"line":321,"text":"\t\t\t\t\tsourceColumn:   column,"},
  {"line":322,"text":"\t\t\t\t}"},
  {"line":323,"text":"\t\t\t\tflush(i - 1)"},
  {"line":324,"text":"\t\t\t}"},
  {"line":325,"text":"\t\tcase stateInObjectMarker:"},
  {"line":327,"text":"\t\t\tif previousCharacter == '|' && currentCharacter == '}' {"},
  {"line":328,"text":"\t\t\t\tobjectMarkerData := strings.TrimSpace(content[openMarker.sourcePosition+2 : i-1])"},
  {"line":329,"text":"\t\t\t\tmarker, e := getObjectMarker(fileName, openMarker, objectMarkerData)"},
  {"line":330,"text":"\t\t\t\tif e != nil {"},
  {"line":331,"text":"\t\t\t\t\treturn nil, e"},
  {"line":332,"text":"\t\t\t\t}"},
  {"line":334,"text":"\t\t\t\tif len(openRanges) > 0 {"},
  {"line":335,"text":"\t\t\t\t\topenRanges[len(openRanges)-1].marker = marker"},
  {"line":336,"text":"\t\t\t\t}"},
  {"line":337,"text":"\t\t\t\tmarkers = append(markers, marker)"},
  {"line":340,"text":"\t\t\t\tlastNormalCharPosition = i + 1"},
  {"line":341,"text":"\t\t\t\tdifference += i + 1 - openMarker.sourcePosition"},
  {"line":344,"text":"\t\t\t\topenMarker = nil"},
  {"line":345,"text":"\t\t\t\tstate = stateNone"},
  {"line":346,"text":"\t\t\t}"},
  {"line":347,"text":"\t\tcase stateInSlashStarMarker:"},
  {"line":348,"text":"\t\t\tif previousCharacter == '*' && currentCharacter == '/' {"},
  {"line":351,"text":"\t\t\t\tmarkerNameText := strings.TrimSpace(content[openMarker.sourcePosition+2 : i-1])"},
  {"line":352,"text":"\t\t\t\tmarker := &Marker{"},
  {"line":353,"text":"\t\t\t\t\tfileName: fileName,"},
  {"line":354,"text":"\t\t\t\t\tPosition: openMarker.position,"},
  {"line":355,"text":"\t\t\t\t\tName:     &markerNameText,"},
  {"line":356,"text":"\t\t\t\t}"},
  {"line":357,"text":"\t\t\t\tif len(openRanges) > 0 {"},
  {"line":358,"text":"\t\t\t\t\topenRanges[len(openRanges)-1].marker = marker"},
  {"line":359,"text":"\t\t\t\t}"},
  {"line":360,"text":"\t\t\t\tmarkers = append(markers, marker)"},
  {"line":363,"text":"\t\t\t\tflush(openMarker.sourcePosition)"},
  {"line":364,"text":"\t\t\t\tlastNormalCharPosition = i + 1"},
  {"line":365,"text":"\t\t\t\tdifference += i + 1 - openMarker.sourcePosition"},
  {"line":368,"text":"\t\t\t\topenMarker = nil"},
  {"line":369,"text":"\t\t\t\tstate = stateNone"},
  {"line":370,"text":"\t\t\t} else if !(stringutil.IsDigit(currentCharacter) ||"},
  {"line":371,"text":"\t\t\t\tstringutil.IsASCIILetter(currentCharacter) ||"},
  {"line":372,"text":"\t\t\t\tcurrentCharacter == '$' ||"},
  {"line":373,"text":"\t\t\t\tcurrentCharacter == '_') { // Invalid marker character"},
  {"line":374,"text":"\t\t\t\tif currentCharacter == '*' && i < len(content)-1 && content[i+1] == '/' {"},
  {"line":376,"text":"\t\t\t\t} else {"},
  {"line":379,"text":"\t\t\t\t\tflush(i)"},
  {"line":380,"text":"\t\t\t\t\tlastNormalCharPosition = i"},
  {"line":381,"text":"\t\t\t\t\topenMarker = nil"},
  {"line":382,"text":"\t\t\t\t\tstate = stateNone"},
  {"line":383,"text":"\t\t\t\t}"},
  {"line":384,"text":"\t\t\t}"},
  {"line":385,"text":"\t\t}"},
  {"line":386,"text":"\t\tif currentCharacter == '\\n' && previousCharacter == '\\r' {"},
  {"line":388,"text":"\t\t\tcontinue"},
  {"line":389,"text":"\t\t} else if currentCharacter == '\\n' || currentCharacter == '\\r' {"},
  {"line":390,"text":"\t\t\tline++"},
  {"line":391,"text":"\t\t\tcolumn = 1"},
  {"line":392,"text":"\t\t\tcontinue"},
  {"line":393,"text":"\t\t}"},
  {"line":394,"text":"\t\tcolumn++"},
  {"line":395,"text":"\t\tif i >= lastNormalCharPosition {"},
  {"line":396,"text":"\t\t\tpreviousCharacter = currentCharacter"},
  {"line":397,"text":"\t\t} else {"},
  {"line":398,"text":"\t\t\tpreviousCharacter = utf8.RuneError // reset to avoid accidentally reusing marker delimiters as part of other markers"},
  {"line":399,"text":"\t\t}"},
  {"line":400,"text":"\t}"},
  {"line":403,"text":"\tflush(-1)"},
  {"line":405,"text":"\tif len(openRanges) > 0 {"},
  {"line":406,"text":"\t\topenRange := openRanges[0]"},
  {"line":407,"text":"\t\treturn nil, reportError(fileName, openRange.sourceLine, openRange.sourceColumn, \"Unterminated range.\")"},
  {"line":408,"text":"\t}"},
  {"line":410,"text":"\tif openMarker != nil {"},
  {"line":411,"text":"\t\treturn nil, reportError(fileName, openMarker.sourceLine, openMarker.sourceColumn, \"Unterminated marker.\")"},
  {"line":412,"text":"\t}"},
  {"line":414,"text":"\toutputString := output.String()"},
  {"line":416,"text":"\tlineMap := lsconv.ComputeLSPLineStarts(outputString)"},
  {"line":417,"text":"\tconverters := lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *lsconv.LSPLineMap {"},
  {"line":418,"text":"\t\treturn lineMap"},
  {"line":419,"text":"\t})"},
  {"line":421,"text":"\temit := fileOptions[emitThisFileOption] == \"true\""},
  {"line":423,"text":"\ttestFileInfo := &TestFileInfo{"},
  {"line":424,"text":"\t\tfileName: fileName,"},
  {"line":425,"text":"\t\tContent:  outputString,"},
  {"line":426,"text":"\t\temit:     emit,"},
  {"line":427,"text":"\t}"},
  {"line":429,"text":"\tslices.SortStableFunc(rangeMarkers, func(a, b *RangeMarker) int {"},
  {"line":430,"text":"\t\tif a.Range.Pos() != b.Range.Pos() {"},
  {"line":431,"text":"\t\t\treturn a.Range.Pos() - b.Range.Pos()"},
  {"line":432,"text":"\t\t}"},
  {"line":433,"text":"\t\treturn b.Range.End() - a.Range.End()"},
  {"line":434,"text":"\t})"},
  {"line":436,"text":"\tfor _, marker := range markers {"},
  {"line":437,"text":"\t\tmarker.LSPosition = converters.PositionToLineAndCharacter(testFileInfo, core.TextPos(marker.Position))"},
  {"line":438,"text":"\t}"},
  {"line":439,"text":"\tfor _, rangeMarker := range rangeMarkers {"},
  {"line":440,"text":"\t\trangeMarker.LSRange = lsproto.Range{"},
  {"line":441,"text":"\t\t\tStart: converters.PositionToLineAndCharacter(testFileInfo, core.TextPos(rangeMarker.Range.Pos())),"},
  {"line":442,"text":"\t\t\tEnd:   converters.PositionToLineAndCharacter(testFileInfo, core.TextPos(rangeMarker.Range.End())),"},
  {"line":443,"text":"\t\t}"},
  {"line":444,"text":"\t}"},
  {"line":446,"text":"\treturn &testFileWithMarkers{"},
  {"line":447,"text":"\t\tfile:    testFileInfo,"},
  {"line":448,"text":"\t\tmarkers: markers,"},
  {"line":449,"text":"\t\tranges:  rangeMarkers,"},
  {"line":450,"text":"\t}, nil"},
  {"line":451,"text":"}"},
  {"line":453,"text":"func getObjectMarker(fileName string, location *locationInformation, text string) (*Marker, error) {"},
  {"line":455,"text":"\tvar v any"},
  {"line":456,"text":"\te := json.Unmarshal([]byte(\"{ \"+text+\" }\"), &v)"},
  {"line":458,"text":"\tif e != nil {"},
  {"line":459,"text":"\t\treturn nil, reportError(fileName, location.sourceLine, location.sourceColumn, \"Unable to parse marker text \"+text)"},
  {"line":460,"text":"\t}"},
  {"line":461,"text":"\tmarkerValue, ok := v.(map[string]any)"},
  {"line":462,"text":"\tif !ok || len(markerValue) == 0 {"},
  {"line":463,"text":"\t\treturn nil, reportError(fileName, location.sourceLine, location.sourceColumn, \"Object markers can not be empty\")"},
  {"line":464,"text":"\t}"},
  {"line":466,"text":"\tmarker := &Marker{"},
  {"line":467,"text":"\t\tfileName: fileName,"},
  {"line":468,"text":"\t\tPosition: location.position,"},
  {"line":469,"text":"\t\tData:     markerValue,"},
  {"line":470,"text":"\t}"},
  {"line":473,"text":"\tif markerValue[\"name\"] != nil {"},
  {"line":474,"text":"\t\tif name, ok := markerValue[\"name\"].(string); ok && name != \"\" {"},
  {"line":475,"text":"\t\t\tmarker.Name = &name"},
  {"line":476,"text":"\t\t}"},
  {"line":477,"text":"\t}"},
  {"line":479,"text":"\treturn marker, nil"},
  {"line":480,"text":"}"},
  {"line":482,"text":"func reportError(fileName string, line int, col int, message string) error {"},
  {"line":483,"text":"\treturn &fourslashError{fmt.Sprintf(\"%v (%v,%v): %v\", fileName, line, col, message)}"},
  {"line":484,"text":"}"},
  {"line":486,"text":"func chompLeadingSpace(content string) string {"},
  {"line":487,"text":"\tlines := strings.Split(content, \"\\n\")"},
  {"line":488,"text":"\tfor _, line := range lines {"},
  {"line":489,"text":"\t\tif len(line) > 0 && line[0] != ' ' {"},
  {"line":490,"text":"\t\t\treturn content"},
  {"line":491,"text":"\t\t}"},
  {"line":492,"text":"\t}"},
  {"line":494,"text":"\tresult := make([]string, len(lines))"},
  {"line":495,"text":"\tfor i, line := range lines {"},
  {"line":496,"text":"\t\tif len(line) > 0 {"},
  {"line":497,"text":"\t\t\tresult[i] = line[1:]"},
  {"line":498,"text":"\t\t}"},
  {"line":499,"text":"\t}"},
  {"line":500,"text":"\treturn strings.Join(result, \"\\n\")"},
  {"line":501,"text":"}"},
  {"line":503,"text":"type fourslashError struct {"},
  {"line":504,"text":"\terr string"},
  {"line":505,"text":"}"},
  {"line":507,"text":"func (e *fourslashError) Error() string {"},
  {"line":508,"text":"\treturn e.err"},
  {"line":509,"text":"}"},
];

function findHomeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserDeclaration(name: string): UpstreamDeclaration | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserDeclarations.find((declaration) => declaration.name === name);
}

function requireHomeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserDeclaration(name: string): UpstreamDeclaration {
  const declaration = findHomeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

function homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserLineText(line: number): string | undefined {
  return homeJeswinReposTsoniclangTstsPackagesTstsSrcFourslashTestParserSourceLines.find((entry) => entry.line === line)?.text;
}
