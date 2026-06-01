/**
 * Fourslash baseline helpers.
 *
 * Porting surface for TS-Go `internal/fourslash/baselineutil.go`.
 */

import type { DocumentUri, Location, Position, Range } from "../lsp/lsproto/index.js";
import { comparePositions } from "../lsp/lsproto/index.js";
import { lowerFirstChar } from "../stringutil/index.js";
import { testDataStateBaseliningEnabled, type Marker, type RangeMarker } from "./testParser.js";
import { baselineCommandKey, type FourslashTest } from "./fourslash.js";

export type FourslashBaselineCommand = string;

export const autoImportsCmd: FourslashBaselineCommand = "Auto Imports";
export const callHierarchyCmd: FourslashBaselineCommand = "Call Hierarchy";
export const closingTagCmd: FourslashBaselineCommand = "Closing Tag";
export const documentHighlightsCmd: FourslashBaselineCommand = "documentHighlights";
export const findAllReferencesCmd: FourslashBaselineCommand = "findAllReferences";
export const goToDefinitionCmd: FourslashBaselineCommand = "goToDefinition";
export const goToImplementationCmd: FourslashBaselineCommand = "goToImplementation";
export const goToSourceDefinitionCmd: FourslashBaselineCommand = "goToSourceDefinition";
export const goToTypeDefinitionCmd: FourslashBaselineCommand = "goToType";
export const inlayHintsCmd: FourslashBaselineCommand = "Inlay Hints";
export const nonSuggestionDiagnosticsCmd: FourslashBaselineCommand = "Syntax and Semantic Diagnostics";
export const quickInfoCmd: FourslashBaselineCommand = "QuickInfo";
export const linkedEditingCmd: FourslashBaselineCommand = "linkedEditing";
export const renameCmd: FourslashBaselineCommand = "findRenameLocations";
export const signatureHelpCmd: FourslashBaselineCommand = "SignatureHelp";
export const smartSelectionCmd: FourslashBaselineCommand = "Smart Selection";
export const codeLensesCmd: FourslashBaselineCommand = "Code Lenses";
export const documentSymbolsCmd: FourslashBaselineCommand = "Document Symbols";

export interface BaselineWriter {
  writeLine(text?: string): void;
  text(): string;
}

export class StringBaselineWriter implements BaselineWriter {
  private readonly lines: string[] = [];

  writeLine(text = ""): void {
    this.lines.push(text);
  }

  text(): string {
    return this.lines.join("\n");
  }
}

export interface BaselineOptions {
  readonly subfolder: string;
  readonly isSubmodule?: boolean;
  readonly diffFixupOld?: (text: string) => string;
  readonly diffFixupNew?: (text: string) => string;
}

function commandKey(command: FourslashBaselineCommand): string {
  return baselineCommandKey({ name: command, arguments: [] });
}

export function addResultToBaseline(
  test: Pick<FourslashTest, "baselines" | "testData">,
  command: FourslashBaselineCommand,
  actual: string,
): void {
  const key = commandKey(command);
  const lines = test.baselines.get(key) ?? [];
  if (lines.length !== 0) lines.push("\n\n\n");
  lines.push(`// === ${command} ===\n${actual}`);
  test.baselines.set(key, lines);
  if (testDataStateBaseliningEnabled(test.testData)) {
    return;
  }
}

export function writeToBaseline(
  test: Pick<FourslashTest, "baselines">,
  command: FourslashBaselineCommand,
  content: string,
): void {
  const key = commandKey(command);
  const lines = test.baselines.get(key) ?? [];
  lines.push(content);
  test.baselines.set(key, lines);
}

export function getBaselineFileName(baseFileName: string, command: FourslashBaselineCommand): string {
  return `${baseFileName}.${getBaselineExtension(command)}`;
}

export function getBaselineExtension(command: FourslashBaselineCommand): string {
  switch (command) {
    case quickInfoCmd:
    case signatureHelpCmd:
    case smartSelectionCmd:
    case inlayHintsCmd:
    case nonSuggestionDiagnosticsCmd:
    case documentSymbolsCmd:
    case closingTagCmd:
      return "baseline";
    case callHierarchyCmd:
      return "callHierarchy.txt";
    case autoImportsCmd:
      return "baseline.md";
    case linkedEditingCmd:
      return "linkedEditing.txt";
    default:
      return "baseline.jsonc";
  }
}

export function getBaselineOptions(command: FourslashBaselineCommand, testPath: string): BaselineOptions {
  const subfolder = "fourslash/" + normalizeCommandName(command);
  if (!isSubmoduleTest(testPath)) return { subfolder };

  switch (command) {
    case smartSelectionCmd:
      return { subfolder, isSubmodule: true };
    case callHierarchyCmd:
      return {
        subfolder,
        isSubmodule: true,
        diffFixupOld: fixupCallHierarchyBaseline,
      };
    case renameCmd:
      return {
        subfolder,
        isSubmodule: true,
        diffFixupOld: (text) => fixupSingleCommandBaseline(text, command, {
          skipLine: (line) => line.startsWith("// @findInStrings: ") || line.startsWith("// @findInComments: "),
          replace: (line) => replaceAllMany(line, [
            ["/tests/cases/fourslash", ""],
            ["/server", ""],
            ["<|", ""],
            ["|>", ""],
            ["providePrefixAndSuffixTextForRename", "useAliasesForRename"],
          ]),
        }),
      };
    case inlayHintsCmd:
      return {
        subfolder,
        isSubmodule: true,
        diffFixupOld: fixupOldInlayHintsBaseline,
        diffFixupNew: fixupNewInlayHintsBaseline,
      };
    case goToDefinitionCmd:
    case goToTypeDefinitionCmd:
    case goToImplementationCmd:
    case goToSourceDefinitionCmd:
      return {
        subfolder,
        isSubmodule: true,
        diffFixupOld: (text) => fixupGoToBaseline(text, command),
        diffFixupNew: (text) => text.replaceAll("bundled:///libs/", ""),
      };
    case findAllReferencesCmd:
      return {
        subfolder,
        isSubmodule: true,
        diffFixupOld: fixupFindAllReferencesBaseline,
      };
    case linkedEditingCmd:
      return {
        subfolder,
        isSubmodule: true,
        diffFixupOld: deleteLinkedEditingInfo,
        diffFixupNew: deleteLinkedEditingInfo,
      };
    default:
      return { subfolder };
  }
}

interface SingleCommandFixupOptions {
  readonly skipLine?: (line: string) => boolean;
  readonly replace?: (line: string) => string;
}

const commandHeaderPattern = /^\/\/ === ([a-z\sA-Z]*) ===/u;

function fixupSingleCommandBaseline(
  text: string,
  command: FourslashBaselineCommand,
  options: SingleCommandFixupOptions = {},
): string {
  const commandLines: string[] = [];
  let isInCommand = false;
  for (const line of text.split("\n")) {
    if (options.skipLine?.(line) === true) continue;
    const matches = commandHeaderPattern.exec(line);
    if (matches !== null) {
      isInCommand = matches[1] === command;
    }
    if (isInCommand) {
      commandLines.push(options.replace?.(line) ?? line);
    }
  }
  return dropTrailingEmptyLines(commandLines).join("\n");
}

function replaceAllMany(text: string, replacements: readonly (readonly [string, string])[]): string {
  let result = text;
  for (const [search, replacement] of replacements) {
    result = result.replaceAll(search, replacement);
  }
  return result;
}

function fixupCallHierarchyBaseline(text: string): string {
  return replaceAllMany(text, [
    ["/tests/cases/fourslash/server/", "/"],
    ["/tests/cases/fourslash/", "/"],
    ["kind: getter", "kind: property"],
    ["kind: script", "kind: file"],
  ]);
}

function fixupOldInlayHintsBaseline(text: string): string {
  const commandLines: string[] = [];
  const lines = text.split("\n");
  let isInCommand = false;
  let hintStart = -1;
  for (let index = 0; index < lines.length; index += 1) {
    let line = lines[index]!;
    const matches = commandHeaderPattern.exec(line);
    if (matches !== null) {
      isInCommand = matches[1] === inlayHintsCmd;
    }
    if (!isInCommand) continue;

    if (line === "{") hintStart = commandLines.length;
    if (line === "}" && commandLines[commandLines.length - 1]?.endsWith(",") === true) {
      commandLines[commandLines.length - 1] = commandLines[commandLines.length - 1]!.replace(/,$/u, "");
    }

    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('"position": ')) continue;
    if (trimmedLine.startsWith('"text": ')) {
      if (trimmedLine === '"text": "",') continue;
      line = line.replace('"text":', '"label":');
    }
    if (trimmedLine.startsWith('"kind": ')) {
      if (trimmedLine === '"kind": "Parameter",') {
        line = line.replace('"kind": "Parameter",', '"kind": 2,');
      } else if (trimmedLine === '"kind": "Type",') {
        line = line.replace('"kind": "Type",', '"kind": 1,');
      } else {
        continue;
      }
    }
    if (trimmedLine.startsWith('"displayParts": ')) {
      const displayPartLines: string[] = [line.replace("displayParts", "label")];
      let displayPartEnd = index + 1;
      for (; displayPartEnd < lines.length; displayPartEnd += 1) {
        let displayLine = lines[displayPartEnd]!;
        const displayTrimmed = displayLine.trim();
        if (displayTrimmed.startsWith('"text": ')) {
          displayLine = displayLine.replace('"text":', '"value":');
        } else if (displayTrimmed.startsWith('"span": ')) {
          displayPartLines.push(displayLine.replace("span", "location") + "},");
          displayPartEnd += 3;
          continue;
        } else if (displayTrimmed.startsWith('"file": ')) {
          continue;
        }
        if (displayTrimmed === "]" || displayTrimmed === "],") {
          displayPartLines.push(displayTrimmed === "]" ? displayLine + "," : displayLine);
          break;
        }
        displayPartLines.push(displayLine);
      }
      commandLines.splice(Math.max(0, hintStart + 1), 0, ...displayPartLines);
      index = displayPartEnd;
      continue;
    }
    commandLines.push(replaceAllMany(line, [
      ['"whitespaceAfter"', '"paddingRight"'],
      ['"whitespaceBefore"', '"paddingLeft"'],
    ]));
  }
  return dropTrailingEmptyLines(commandLines).join("\n");
}

function fixupNewInlayHintsBaseline(text: string): string {
  const fixedLines: string[] = [];
  const lines = text.split("\n");
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]!;
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('"position": ')) {
      index += 3;
      continue;
    }
    if (trimmedLine.startsWith('"location": ')) {
      fixedLines.push(line + "},");
      index += 12;
      continue;
    }
    fixedLines.push(line);
  }
  return fixedLines.join("\n");
}

function fixupGoToBaseline(text: string, command: FourslashBaselineCommand): string {
  const commandLines: string[] = [];
  const objectRangePattern = /\{\| [^|]* \|\}/gu;
  const detailsHeader = "// === Details ===";
  let isInCommand = false;
  let isInDetails = false;
  for (const line of text.split("\n")) {
    const matches = commandHeaderPattern.exec(line);
    if (matches !== null) {
      isInDetails = false;
      isInCommand = matches[1] === command || command === goToDefinitionCmd && matches[1] === "getDefinitionAtPosition";
    }
    if (!isInCommand) continue;
    if (line.includes(detailsHeader)) {
      if (commandLines[commandLines.length - 1] === "") commandLines.pop();
      isInDetails = true;
    }
    if (!isInDetails) {
      commandLines.push(replaceAllMany(line, [
        ["/tests/cases/fourslash", ""],
        ["/server", ""],
        ["getDefinitionAtPosition", goToDefinitionCmd],
        ["/*GOTO DEF POS*/", "/*GOTO DEF*/"],
      ]).replace(objectRangePattern, ""));
    } else if (line === "  ]") {
      isInDetails = false;
    }
  }
  return dropTrailingEmptyLines(commandLines).join("\n");
}

function fixupFindAllReferencesBaseline(text: string): string {
  const commandLines: string[] = [];
  const fileHeaderPattern = /^\/\/ === ([^ ]*) ===/u;
  const objectRangePattern = /\{\| [^|]* \|\}/gu;
  const sections: { fileName: string; lines: string[] }[] = [];
  let currentFileName = "";
  let currentFileLines: string[] = [];
  let isInCommand = false;
  let isInDetails = false;
  let isInDefinitions = false;

  const flush = (): void => {
    if (currentFileName !== "") {
      sections.push({ fileName: currentFileName, lines: currentFileLines });
      currentFileName = "";
      currentFileLines = [];
    }
  };
  const emitSections = (): void => {
    sections.sort((left, right) => left.fileName.localeCompare(right.fileName));
    for (const section of sections.splice(0)) {
      commandLines.push(...dropTrailingEmptyLines(section.lines), "");
    }
  };

  for (const line of text.split("\n")) {
    const commandMatches = commandHeaderPattern.exec(line);
    if (commandMatches !== null) {
      isInDetails = false;
      isInDefinitions = false;
      if (commandMatches[1] === findAllReferencesCmd) {
        isInCommand = true;
        flush();
        emitSections();
        if (commandLines.length > 0) commandLines.push("", "");
        commandLines.push(replaceAllMany(line, [["/tests/cases/fourslash", ""], ["/server", ""]]));
        continue;
      }
      isInCommand = false;
    }
    if (!isInCommand) continue;
    if (line.includes("// === Definitions ===") || line.includes("// === Details ===")) {
      isInDefinitions = line.includes("// === Definitions ===");
      isInDetails = line.includes("// === Details ===");
      if (currentFileLines[currentFileLines.length - 1] === "") currentFileLines.pop();
    }
    if (isInDefinitions || isInDetails) {
      if (isInDetails && line === "  ]") isInDetails = false;
      continue;
    }

    const fixedLine = replaceAllMany(line, [["/tests/cases/fourslash", ""], ["/server", ""], ["<|", ""], ["|>", ""]])
      .replace(objectRangePattern, "");
    const fileMatches = fileHeaderPattern.exec(fixedLine);
    if (fileMatches !== null) {
      flush();
      currentFileName = fileMatches[1]!;
      currentFileLines = [fixedLine];
    } else {
      currentFileLines.push(fixedLine);
    }
  }

  flush();
  emitSections();
  return dropTrailingEmptyLines(commandLines).join("\n");
}

function deleteLinkedEditingInfo(text: string): string {
  const lines = text.split("\n");
  const linkedEditingInfoHeader = /^=== [0-9]+ ===/u;
  const fileNameHeader = /^=== [\w,\s-]+\.[A-Za-z]+ ===/u;
  let inLinkedEditingInfo = false;
  const keptLines: string[] = [];
  for (const line of lines) {
    if (linkedEditingInfoHeader.test(line)) {
      inLinkedEditingInfo = true;
      continue;
    }
    if (fileNameHeader.test(line)) {
      inLinkedEditingInfo = false;
      continue;
    }
    if (!inLinkedEditingInfo) keptLines.push(line);
  }
  return dropTrailingEmptyLines(keptLines).join("\n");
}

export function dropTrailingEmptyLines(lines: readonly string[]): readonly string[] {
  let lastNonEmpty = -1;
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    if (lines[index] !== "") {
      lastNonEmpty = index;
      break;
    }
  }
  return lines.slice(0, lastNonEmpty + 1);
}

export function isSubmoduleTest(testPath: string): boolean {
  return testPath.includes("fourslash/tests/gen") || testPath.includes("fourslash/tests/manual");
}

export function normalizeCommandName(command: string): string {
  return lowerFirstChar(command.trim().split(/\s+/).filter((word) => word.length !== 0).join(""));
}

export interface DocumentSpan {
  readonly uri: DocumentUri;
  readonly textSpan: Range;
  readonly contextSpan?: Range;
}

export interface BaselineFourslashLocationsOptions {
  readonly marker?: Marker | RangeMarker;
  readonly markerName?: string;
  readonly endMarker?: string;
  readonly startMarkerPrefix?: (span: DocumentSpan) => string | undefined;
  readonly endMarkerSuffix?: (span: DocumentSpan) => string | undefined;
  readonly getLocationData?: (span: DocumentSpan) => string;
  readonly additionalSpan?: DocumentSpan;
  readonly preserveResultOrder?: boolean;
  readonly orderedFiles?: readonly DocumentUri[];
}

export function locationToSpan(location: Location): DocumentSpan {
  return {
    uri: location.uri,
    textSpan: location.range,
  };
}

export function uniqueFilesInSpanOrder(spans: readonly DocumentSpan[]): readonly DocumentUri[] {
  if (spans.length === 0) return [];
  const seen = new Set<DocumentUri>();
  const result: DocumentUri[] = [];
  for (const span of spans) {
    if (seen.has(span.uri)) continue;
    seen.add(span.uri);
    result.push(span.uri);
  }
  return result;
}

export enum DetailKind {
  Marker = 0,
  ContextStart = 1,
  TextStart = 2,
  TextEnd = 3,
  ContextEnd = 4,
}

export function detailKindIsEnd(kind: DetailKind): boolean {
  return kind === DetailKind.ContextEnd || kind === DetailKind.TextEnd;
}

export function detailKindIsStart(kind: DetailKind): boolean {
  return kind === DetailKind.ContextStart || kind === DetailKind.TextStart;
}

export interface BaselineDetail {
  readonly pos: Position;
  readonly positionMarker: string;
  readonly span?: DocumentSpan;
  readonly kind: DetailKind;
}

export function getRange(detail: BaselineDetail): Range {
  switch (detail.kind) {
    case DetailKind.ContextStart:
    case DetailKind.ContextEnd:
      if (detail.span?.contextSpan === undefined) throw new Error("baseline detail requires a context span");
      return detail.span.contextSpan;
    case DetailKind.TextStart:
    case DetailKind.TextEnd:
      if (detail.span === undefined) throw new Error("baseline detail requires a text span");
      return detail.span.textSpan;
    case DetailKind.Marker:
      return { start: detail.pos, end: detail.pos };
    default:
      throw new Error(`unknown detail kind: ${detail.kind}`);
  }
}

export function compareBaselineDetails(left: BaselineDetail, right: BaselineDetail): number {
  const positionComparison = comparePositions(left.pos, right.pos);
  if (positionComparison !== 0 || (left.kind === DetailKind.Marker && right.kind === DetailKind.Marker)) {
    return positionComparison;
  }

  if (left.kind === DetailKind.Marker && detailKindIsStart(right.kind)) return -1;
  if (right.kind === DetailKind.Marker && detailKindIsStart(left.kind)) return 1;
  if (left.kind === DetailKind.Marker && detailKindIsEnd(right.kind)) return 1;
  if (right.kind === DetailKind.Marker && detailKindIsEnd(left.kind)) return -1;
  if (left.span !== undefined && left.span === right.span) return left.kind - right.kind;
  if (detailKindIsStart(left.kind) && detailKindIsEnd(right.kind)) return 1;
  if (detailKindIsEnd(left.kind) && detailKindIsStart(right.kind)) return -1;

  if (detailKindIsEnd(left.kind) && detailKindIsEnd(right.kind)) {
    const rangeComparison = comparePositions(getRange(right).start, getRange(left).start);
    return rangeComparison || left.kind - right.kind;
  }

  if (detailKindIsStart(left.kind) && detailKindIsStart(right.kind)) {
    const rangeComparison = comparePositions(getRange(right).end, getRange(left).end);
    return rangeComparison || left.kind - right.kind;
  }

  return 0;
}

export interface MarkerSummary {
  readonly name: string | undefined;
  readonly fileName: string;
  readonly line: number;
  readonly character: number;
  readonly position: number;
}

export interface RangeSummary {
  readonly fileName: string;
  readonly startLine: number;
  readonly startCharacter: number;
  readonly endLine: number;
  readonly endCharacter: number;
  readonly markerName: string | undefined;
}

export function markerSummary(marker: Marker): MarkerSummary {
  return {
    name: marker.name,
    fileName: marker.fileName(),
    line: marker.lsPosition.line,
    character: marker.lsPosition.character,
    position: marker.position,
  };
}

export function rangeSummary(range: RangeMarker): RangeSummary {
  return {
    fileName: range.fileName(),
    startLine: range.lsRange.start.line,
    startCharacter: range.lsRange.start.character,
    endLine: range.lsRange.end.line,
    endCharacter: range.lsRange.end.character,
    markerName: range.getName(),
  };
}

export function baselineMarkers(markers: readonly Marker[]): string {
  const writer = new StringBaselineWriter();
  for (const marker of [...markers].sort(compareMarkers)) {
    const summary = markerSummary(marker);
    writer.writeLine(`${summary.fileName}:${summary.line + 1}:${summary.character + 1} ${summary.name ?? "<anonymous>"}`);
  }
  return writer.text();
}

export function baselineRanges(ranges: readonly RangeMarker[]): string {
  const writer = new StringBaselineWriter();
  for (const range of [...ranges].sort(compareRanges)) {
    const summary = rangeSummary(range);
    writer.writeLine(
      `${summary.fileName}:${summary.startLine + 1}:${summary.startCharacter + 1}-${summary.endLine + 1}:${summary.endCharacter + 1}`
        + (summary.markerName === undefined ? "" : ` ${summary.markerName}`),
    );
  }
  return writer.text();
}

export function baselineMap<K, V>(
  map: ReadonlyMap<K, V>,
  keyText: (key: K) => string,
  valueText: (value: V) => string,
): string {
  const writer = new StringBaselineWriter();
  const entries = [...map.entries()].sort((left, right) => keyText(left[0]).localeCompare(keyText(right[0])));
  for (const [key, value] of entries) {
    writer.writeLine(`${keyText(key)}: ${valueText(value)}`);
  }
  return writer.text();
}

export function baselineArray<T>(values: readonly T[], text: (value: T) => string): string {
  const writer = new StringBaselineWriter();
  for (const value of values) writer.writeLine(text(value));
  return writer.text();
}

export function baselineJson(value: unknown): string {
  return JSON.stringify(sortJsonValue(value), undefined, 2);
}

export function sortJsonValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortJsonValue);
  if (value === null || typeof value !== "object") return value;
  const source = value as Record<string, unknown>;
  const sorted: Record<string, unknown> = {};
  for (const key of Object.keys(source).sort()) {
    sorted[key] = sortJsonValue(source[key]);
  }
  return sorted;
}

export function compareMarkers(left: Marker, right: Marker): number {
  return left.fileName().localeCompare(right.fileName())
    || left.position - right.position
    || (left.name ?? "").localeCompare(right.name ?? "");
}

export function compareRanges(left: RangeMarker, right: RangeMarker): number {
  return left.fileName().localeCompare(right.fileName())
    || left.range.pos - right.range.pos
    || right.range.end - left.range.end
    || (left.getName() ?? "").localeCompare(right.getName() ?? "");
}

// Source parity map: internal/fourslash/baselineutil.go
/**
 * Source parity map for TS-Go `fourslash/baselineutil.go`.
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

const fourslashBaselineutilUpstreamPath = "fourslash/baselineutil.go";

const fourslashBaselineutilDeclarations: readonly UpstreamDeclaration[] = [
  {"line":44,"kind":"type","name":"baselineCommand"},
  {"line":46,"kind":"func","name":"addResultToBaseline","receiver":"f *FourslashTest"},
  {"line":66,"kind":"func","name":"writeToBaseline","receiver":"f *FourslashTest"},
  {"line":75,"kind":"func","name":"getBaselineFileName"},
  {"line":79,"kind":"func","name":"getBaselineExtension"},
  {"line":94,"kind":"func","name":"getBaselineOptions","receiver":"f *FourslashTest"},
  {"line":488,"kind":"func","name":"dropTrailingEmptyLines"},
  {"line":492,"kind":"func","name":"isSubmoduleTest"},
  {"line":496,"kind":"func","name":"normalizeCommandName"},
  {"line":502,"kind":"type","name":"documentSpan"},
  {"line":508,"kind":"type","name":"baselineFourslashLocationsOptions"},
  {"line":524,"kind":"func","name":"locationToSpan"},
  {"line":531,"kind":"func","name":"getBaselineForLocationsWithFileContents","receiver":"f *FourslashTest"},
  {"line":538,"kind":"func","name":"getBaselineForSpansWithFileContents","receiver":"f *FourslashTest"},
  {"line":549,"kind":"func","name":"getBaselineForGroupedSpansWithFileContents","receiver":"f *FourslashTest"},
  {"line":637,"kind":"func","name":"uniqueFilesInSpanOrder"},
  {"line":653,"kind":"func","name":"textOfFile","receiver":"f *FourslashTest"},
  {"line":660,"kind":"type","name":"detailKind"},
  {"line":670,"kind":"func","name":"isEnd","receiver":"k detailKind"},
  {"line":674,"kind":"func","name":"isStart","receiver":"k detailKind"},
  {"line":678,"kind":"type","name":"baselineDetail"},
  {"line":685,"kind":"func","name":"getRange","receiver":"d *baselineDetail"},
  {"line":705,"kind":"func","name":"getBaselineContentForFile","receiver":"f *FourslashTest"},
  {"line":912,"kind":"var","name":"lineSplitter"},
  {"line":914,"kind":"type","name":"textWithContext"},
  {"line":933,"kind":"func","name":"FileName","receiver":"t *textWithContext"},
  {"line":938,"kind":"func","name":"Text","receiver":"t *textWithContext"},
  {"line":942,"kind":"func","name":"newTextWithContext"},
  {"line":965,"kind":"func","name":"add","receiver":"t *textWithContext"},
  {"line":1032,"kind":"func","name":"readableJsoncBaseline","receiver":"t *textWithContext"},
  {"line":1042,"kind":"type","name":"markerAndItem"},
  {"line":1140,"kind":"func","name":"sliceOfContent","receiver":"t *textWithContext"},
  {"line":1156,"kind":"func","name":"getIndex","receiver":"t *textWithContext"},
  {"line":1174,"kind":"func","name":"codeFence"},
  {"line":1178,"kind":"func","name":"symbolInformationToData"},
];

const fourslashBaselineutilSourceLines: readonly UpstreamSourceLine[] = [
  {"line":1,"text":"package fourslash"},
  {"line":3,"text":"import ("},
  {"line":4,"text":"\t\"cmp\""},
  {"line":5,"text":"\t\"errors\""},
  {"line":6,"text":"\t\"fmt\""},
  {"line":7,"text":"\t\"io/fs\""},
  {"line":8,"text":"\t\"regexp\""},
  {"line":9,"text":"\t\"slices\""},
  {"line":10,"text":"\t\"strings\""},
  {"line":11,"text":"\t\"testing\""},
  {"line":13,"text":"\t\"github.com/microsoft/typescript-go/internal/collections\""},
  {"line":14,"text":"\t\"github.com/microsoft/typescript-go/internal/core\""},
  {"line":15,"text":"\t\"github.com/microsoft/typescript-go/internal/debug\""},
  {"line":16,"text":"\t\"github.com/microsoft/typescript-go/internal/ls/lsconv\""},
  {"line":17,"text":"\t\"github.com/microsoft/typescript-go/internal/lsp/lsproto\""},
  {"line":18,"text":"\t\"github.com/microsoft/typescript-go/internal/stringutil\""},
  {"line":19,"text":"\t\"github.com/microsoft/typescript-go/internal/testutil/baseline\""},
  {"line":20,"text":"\t\"github.com/microsoft/typescript-go/internal/vfs\""},
  {"line":21,"text":")"},
  {"line":23,"text":"const ("},
  {"line":24,"text":"\tautoImportsCmd              baselineCommand = \"Auto Imports\""},
  {"line":25,"text":"\tcallHierarchyCmd            baselineCommand = \"Call Hierarchy\""},
  {"line":26,"text":"\tclosingTagCmd               baselineCommand = \"Closing Tag\""},
  {"line":27,"text":"\tdocumentHighlightsCmd       baselineCommand = \"documentHighlights\""},
  {"line":28,"text":"\tfindAllReferencesCmd        baselineCommand = \"findAllReferences\""},
  {"line":29,"text":"\tgoToDefinitionCmd           baselineCommand = \"goToDefinition\""},
  {"line":30,"text":"\tgoToImplementationCmd       baselineCommand = \"goToImplementation\""},
  {"line":31,"text":"\tgoToSourceDefinitionCmd     baselineCommand = \"goToSourceDefinition\""},
  {"line":32,"text":"\tgoToTypeDefinitionCmd       baselineCommand = \"goToType\""},
  {"line":33,"text":"\tinlayHintsCmd               baselineCommand = \"Inlay Hints\""},
  {"line":34,"text":"\tnonSuggestionDiagnosticsCmd baselineCommand = \"Syntax and Semantic Diagnostics\""},
  {"line":35,"text":"\tquickInfoCmd                baselineCommand = \"QuickInfo\""},
  {"line":36,"text":"\tlinkedEditingCmd            baselineCommand = \"linkedEditing\""},
  {"line":37,"text":"\trenameCmd                   baselineCommand = \"findRenameLocations\""},
  {"line":38,"text":"\tsignatureHelpCmd            baselineCommand = \"SignatureHelp\""},
  {"line":39,"text":"\tsmartSelectionCmd           baselineCommand = \"Smart Selection\""},
  {"line":40,"text":"\tcodeLensesCmd               baselineCommand = \"Code Lenses\""},
  {"line":41,"text":"\tdocumentSymbolsCmd          baselineCommand = \"Document Symbols\""},
  {"line":42,"text":")"},
  {"line":44,"text":"type baselineCommand string"},
  {"line":46,"text":"func (f *FourslashTest) addResultToBaseline(t *testing.T, command baselineCommand, actual string) {"},
  {"line":47,"text":"\tvar b *strings.Builder"},
  {"line":48,"text":"\tif f.testData.isStateBaseliningEnabled() {"},
  {"line":50,"text":"\t\tb = &f.stateBaseline.baseline"},
  {"line":51,"text":"\t} else if builder, ok := f.baselines[command]; ok {"},
  {"line":52,"text":"\t\tb = builder"},
  {"line":53,"text":"\t} else {"},
  {"line":54,"text":"\t\tf.baselines[command] = &strings.Builder{}"},
  {"line":55,"text":"\t\tb = f.baselines[command]"},
  {"line":56,"text":"\t}"},
  {"line":57,"text":"\tif b.Len() != 0 {"},
  {"line":58,"text":"\t\tb.WriteString(\"\\n\\n\\n\\n\")"},
  {"line":59,"text":"\t}"},
  {"line":60,"text":"\tb.WriteString(\"// === \")"},
  {"line":61,"text":"\tb.WriteString(string(command))"},
  {"line":62,"text":"\tb.WriteString(\" ===\\n\")"},
  {"line":63,"text":"\tb.WriteString(actual)"},
  {"line":64,"text":"}"},
  {"line":66,"text":"func (f *FourslashTest) writeToBaseline(command baselineCommand, content string) {"},
  {"line":67,"text":"\tb, ok := f.baselines[command]"},
  {"line":68,"text":"\tif !ok {"},
  {"line":69,"text":"\t\tf.baselines[command] = &strings.Builder{}"},
  {"line":70,"text":"\t\tb = f.baselines[command]"},
  {"line":71,"text":"\t}"},
  {"line":72,"text":"\tb.WriteString(content)"},
  {"line":73,"text":"}"},
  {"line":75,"text":"func getBaselineFileName(t *testing.T, command baselineCommand) string {"},
  {"line":76,"text":"\treturn getBaseFileNameFromTest(t) + \".\" + getBaselineExtension(command)"},
  {"line":77,"text":"}"},
  {"line":79,"text":"func getBaselineExtension(command baselineCommand) string {"},
  {"line":80,"text":"\tswitch command {"},
  {"line":81,"text":"\tcase quickInfoCmd, signatureHelpCmd, smartSelectionCmd, inlayHintsCmd, nonSuggestionDiagnosticsCmd, documentSymbolsCmd, closingTagCmd:"},
  {"line":82,"text":"\t\treturn \"baseline\""},
  {"line":83,"text":"\tcase callHierarchyCmd:"},
  {"line":84,"text":"\t\treturn \"callHierarchy.txt\""},
  {"line":85,"text":"\tcase autoImportsCmd:"},
  {"line":86,"text":"\t\treturn \"baseline.md\""},
  {"line":87,"text":"\tcase linkedEditingCmd:"},
  {"line":88,"text":"\t\treturn \"linkedEditing.txt\""},
  {"line":89,"text":"\tdefault:"},
  {"line":90,"text":"\t\treturn \"baseline.jsonc\""},
  {"line":91,"text":"\t}"},
  {"line":92,"text":"}"},
  {"line":94,"text":"func (f *FourslashTest) getBaselineOptions(command baselineCommand, testPath string) baseline.Options {"},
  {"line":95,"text":"\tsubfolder := \"fourslash/\" + normalizeCommandName(string(command))"},
  {"line":96,"text":"\tif !isSubmoduleTest(testPath) {"},
  {"line":97,"text":"\t\treturn baseline.Options{"},
  {"line":98,"text":"\t\t\tSubfolder: subfolder,"},
  {"line":99,"text":"\t\t}"},
  {"line":100,"text":"\t}"},
  {"line":101,"text":"\tswitch command {"},
  {"line":102,"text":"\tcase smartSelectionCmd:"},
  {"line":103,"text":"\t\treturn baseline.Options{"},
  {"line":104,"text":"\t\t\tSubfolder:   subfolder,"},
  {"line":105,"text":"\t\t\tIsSubmodule: true,"},
  {"line":106,"text":"\t\t}"},
  {"line":107,"text":"\tcase callHierarchyCmd:"},
  {"line":108,"text":"\t\treturn baseline.Options{"},
  {"line":109,"text":"\t\t\tSubfolder:   subfolder,"},
  {"line":110,"text":"\t\t\tIsSubmodule: true,"},
  {"line":111,"text":"\t\t\tDiffFixupOld: func(s string) string {"},
  {"line":114,"text":"\t\t\t\ts = strings.ReplaceAll(s, \"/tests/cases/fourslash/server/\", \"/\")"},
  {"line":115,"text":"\t\t\t\ts = strings.ReplaceAll(s, \"/tests/cases/fourslash/\", \"/\")"},
  {"line":117,"text":"\t\t\t\ts = strings.ReplaceAll(s, \"kind: getter\", \"kind: property\")"},
  {"line":118,"text":"\t\t\t\ts = strings.ReplaceAll(s, \"kind: script\", \"kind: file\")"},
  {"line":119,"text":"\t\t\t\treturn s"},
  {"line":120,"text":"\t\t\t},"},
  {"line":121,"text":"\t\t}"},
  {"line":122,"text":"\tcase renameCmd:"},
  {"line":123,"text":"\t\treturn baseline.Options{"},
  {"line":124,"text":"\t\t\tSubfolder:   subfolder,"},
  {"line":125,"text":"\t\t\tIsSubmodule: true,"},
  {"line":126,"text":"\t\t\tDiffFixupOld: func(s string) string {"},
  {"line":127,"text":"\t\t\t\tvar commandLines []string"},
  {"line":128,"text":"\t\t\t\tcommandPrefix := regexp.MustCompile(`^// === ([a-z\\sA-Z]*) ===`)"},
  {"line":129,"text":"\t\t\t\ttestFilePrefix := \"/tests/cases/fourslash\""},
  {"line":130,"text":"\t\t\t\tserverTestFilePrefix := \"/server\""},
  {"line":131,"text":"\t\t\t\tcontextSpanOpening := \"<|\""},
  {"line":132,"text":"\t\t\t\tcontextSpanClosing := \"|>\""},
  {"line":133,"text":"\t\t\t\toldPreference := \"providePrefixAndSuffixTextForRename\""},
  {"line":134,"text":"\t\t\t\tnewPreference := \"useAliasesForRename\""},
  {"line":135,"text":"\t\t\t\treplacer := strings.NewReplacer("},
  {"line":136,"text":"\t\t\t\t\tcontextSpanOpening, \"\","},
  {"line":137,"text":"\t\t\t\t\tcontextSpanClosing, \"\","},
  {"line":138,"text":"\t\t\t\t\ttestFilePrefix, \"\","},
  {"line":139,"text":"\t\t\t\t\tserverTestFilePrefix, \"\","},
  {"line":140,"text":"\t\t\t\t\toldPreference, newPreference,"},
  {"line":141,"text":"\t\t\t\t)"},
  {"line":142,"text":"\t\t\t\tlines := strings.Split(s, \"\\n\")"},
  {"line":143,"text":"\t\t\t\tvar isInCommand bool"},
  {"line":144,"text":"\t\t\t\tfor _, line := range lines {"},
  {"line":145,"text":"\t\t\t\t\tif strings.HasPrefix(line, \"// @findInStrings: \") || strings.HasPrefix(line, \"// @findInComments: \") {"},
  {"line":146,"text":"\t\t\t\t\t\tcontinue"},
  {"line":147,"text":"\t\t\t\t\t}"},
  {"line":148,"text":"\t\t\t\t\tmatches := commandPrefix.FindStringSubmatch(line)"},
  {"line":149,"text":"\t\t\t\t\tif len(matches) > 0 {"},
  {"line":150,"text":"\t\t\t\t\t\tcommandName := matches[1]"},
  {"line":151,"text":"\t\t\t\t\t\tif commandName == string(command) {"},
  {"line":152,"text":"\t\t\t\t\t\t\tisInCommand = true"},
  {"line":153,"text":"\t\t\t\t\t\t} else {"},
  {"line":154,"text":"\t\t\t\t\t\t\tisInCommand = false"},
  {"line":155,"text":"\t\t\t\t\t\t}"},
  {"line":156,"text":"\t\t\t\t\t}"},
  {"line":157,"text":"\t\t\t\t\tif isInCommand {"},
  {"line":158,"text":"\t\t\t\t\t\tfixedLine := replacer.Replace(line)"},
  {"line":159,"text":"\t\t\t\t\t\tcommandLines = append(commandLines, fixedLine)"},
  {"line":160,"text":"\t\t\t\t\t}"},
  {"line":161,"text":"\t\t\t\t}"},
  {"line":162,"text":"\t\t\t\treturn strings.Join(dropTrailingEmptyLines(commandLines), \"\\n\")"},
  {"line":163,"text":"\t\t\t},"},
  {"line":164,"text":"\t\t}"},
  {"line":165,"text":"\tcase inlayHintsCmd:"},
  {"line":166,"text":"\t\treturn baseline.Options{"},
  {"line":167,"text":"\t\t\tSubfolder:   subfolder,"},
  {"line":168,"text":"\t\t\tIsSubmodule: true,"},
  {"line":169,"text":"\t\t\tDiffFixupOld: func(s string) string {"},
  {"line":170,"text":"\t\t\t\tvar commandLines []string"},
  {"line":171,"text":"\t\t\t\tcommandPrefix := regexp.MustCompile(`^// === ([a-z\\sA-Z]*) ===`)"},
  {"line":172,"text":"\t\t\t\tlines := strings.Split(s, \"\\n\")"},
  {"line":173,"text":"\t\t\t\tvar isInCommand bool"},
  {"line":174,"text":"\t\t\t\treplacer := strings.NewReplacer("},
  {"line":175,"text":"\t\t\t\t\t`\"whitespaceAfter\"`, `\"paddingRight\"`,"},
  {"line":176,"text":"\t\t\t\t\t`\"whitespaceBefore\"`, `\"paddingLeft\"`,"},
  {"line":177,"text":"\t\t\t\t)"},
  {"line":178,"text":"\t\t\t\thintStart := -1"},
  {"line":179,"text":"\t\t\t\tfor i := 0; i < len(lines); i++ {"},
  {"line":180,"text":"\t\t\t\t\tline := lines[i]"},
  {"line":181,"text":"\t\t\t\t\tmatches := commandPrefix.FindStringSubmatch(line)"},
  {"line":182,"text":"\t\t\t\t\tif len(matches) > 0 {"},
  {"line":183,"text":"\t\t\t\t\t\tcommandName := matches[1]"},
  {"line":184,"text":"\t\t\t\t\t\tif commandName == string(command) {"},
  {"line":185,"text":"\t\t\t\t\t\t\tisInCommand = true"},
  {"line":186,"text":"\t\t\t\t\t\t} else {"},
  {"line":187,"text":"\t\t\t\t\t\t\tisInCommand = false"},
  {"line":188,"text":"\t\t\t\t\t\t}"},
  {"line":189,"text":"\t\t\t\t\t}"},
  {"line":190,"text":"\t\t\t\t\tif isInCommand {"},
  {"line":191,"text":"\t\t\t\t\t\tif line == \"{\" {"},
  {"line":192,"text":"\t\t\t\t\t\t\thintStart = len(commandLines)"},
  {"line":193,"text":"\t\t\t\t\t\t}"},
  {"line":194,"text":"\t\t\t\t\t\tif line == \"}\" && strings.HasSuffix(commandLines[len(commandLines)-1], \",\") {"},
  {"line":195,"text":"\t\t\t\t\t\t\tcommandLines[len(commandLines)-1] = strings.TrimSuffix(commandLines[len(commandLines)-1], \",\")"},
  {"line":196,"text":"\t\t\t\t\t\t}"},
  {"line":197,"text":"\t\t\t\t\t\ttrimmedLine := strings.TrimSpace(line)"},
  {"line":199,"text":"\t\t\t\t\t\tif strings.HasPrefix(trimmedLine, `\"position\": `) {"},
  {"line":200,"text":"\t\t\t\t\t\t\tcontinue"},
  {"line":201,"text":"\t\t\t\t\t\t}"},
  {"line":202,"text":"\t\t\t\t\t\tif strings.HasPrefix(trimmedLine, `\"text\": `) {"},
  {"line":203,"text":"\t\t\t\t\t\t\tif trimmedLine == `\"text\": \"\",` {"},
  {"line":204,"text":"\t\t\t\t\t\t\t\tcontinue"},
  {"line":205,"text":"\t\t\t\t\t\t\t}"},
  {"line":206,"text":"\t\t\t\t\t\t\tline = strings.Replace(line, `\"text\":`, `\"label\":`, 1)"},
  {"line":207,"text":"\t\t\t\t\t\t}"},
  {"line":208,"text":"\t\t\t\t\t\tif strings.HasPrefix(trimmedLine, `\"kind\": `) {"},
  {"line":209,"text":"\t\t\t\t\t\t\tswitch trimmedLine {"},
  {"line":210,"text":"\t\t\t\t\t\t\tcase `\"kind\": \"Parameter\",`:"},
  {"line":211,"text":"\t\t\t\t\t\t\t\tline = strings.Replace(line, `\"kind\": \"Parameter\",`, `\"kind\": 2,`, 1)"},
  {"line":212,"text":"\t\t\t\t\t\t\tcase `\"kind\": \"Type\",`:"},
  {"line":213,"text":"\t\t\t\t\t\t\t\tline = strings.Replace(line, `\"kind\": \"Type\",`, `\"kind\": 1,`, 1)"},
  {"line":214,"text":"\t\t\t\t\t\t\tdefault:"},
  {"line":215,"text":"\t\t\t\t\t\t\t\tcontinue"},
  {"line":216,"text":"\t\t\t\t\t\t\t}"},
  {"line":217,"text":"\t\t\t\t\t\t}"},
  {"line":220,"text":"\t\t\t\t\t\tif strings.HasPrefix(trimmedLine, `\"displayParts\": `) {"},
  {"line":221,"text":"\t\t\t\t\t\t\tvar displayPartLines []string"},
  {"line":222,"text":"\t\t\t\t\t\t\tdisplayPartLines = append(displayPartLines, strings.Replace(line, \"displayParts\", \"label\", 1))"},
  {"line":223,"text":"\t\t\t\t\t\t\tvar j int"},
  {"line":224,"text":"\t\t\t\t\t\t\tfor j = i + 1; j < len(lines); j++ {"},
  {"line":225,"text":"\t\t\t\t\t\t\t\tline := lines[j]"},
  {"line":226,"text":"\t\t\t\t\t\t\t\ttrimmedLine := strings.TrimSpace(line)"},
  {"line":227,"text":"\t\t\t\t\t\t\t\tif strings.HasPrefix(trimmedLine, `\"text\": `) {"},
  {"line":228,"text":"\t\t\t\t\t\t\t\t\tline = strings.Replace(line, `\"text\":`, `\"value\":`, 1)"},
  {"line":229,"text":"\t\t\t\t\t\t\t\t} else if strings.HasPrefix(trimmedLine, `\"span\": `) {"},
  {"line":230,"text":"\t\t\t\t\t\t\t\t\tdisplayPartLines = append(displayPartLines, strings.Replace(line, \"span\", \"location\", 1)+\"},\")"},
  {"line":231,"text":"\t\t\t\t\t\t\t\t\tj = j + 3"},
  {"line":232,"text":"\t\t\t\t\t\t\t\t\tcontinue"},
  {"line":233,"text":"\t\t\t\t\t\t\t\t} else if strings.HasPrefix(trimmedLine, `\"file\": `) {"},
  {"line":234,"text":"\t\t\t\t\t\t\t\t\tcontinue"},
  {"line":235,"text":"\t\t\t\t\t\t\t\t}"},
  {"line":236,"text":"\t\t\t\t\t\t\t\tif trimmedLine == \"]\" || trimmedLine == \"],\" {"},
  {"line":237,"text":"\t\t\t\t\t\t\t\t\tfixedLine := line"},
  {"line":238,"text":"\t\t\t\t\t\t\t\t\tif trimmedLine == \"]\" {"},
  {"line":239,"text":"\t\t\t\t\t\t\t\t\t\tfixedLine += \",\""},
  {"line":240,"text":"\t\t\t\t\t\t\t\t\t}"},
  {"line":241,"text":"\t\t\t\t\t\t\t\t\tdisplayPartLines = append(displayPartLines, fixedLine)"},
  {"line":242,"text":"\t\t\t\t\t\t\t\t\tbreak"},
  {"line":243,"text":"\t\t\t\t\t\t\t\t}"},
  {"line":244,"text":"\t\t\t\t\t\t\t\tdisplayPartLines = append(displayPartLines, line)"},
  {"line":245,"text":"\t\t\t\t\t\t\t}"},
  {"line":247,"text":"\t\t\t\t\t\t\tcommandLines = slices.Insert(commandLines, hintStart+1, displayPartLines...)"},
  {"line":248,"text":"\t\t\t\t\t\t\ti = j"},
  {"line":249,"text":"\t\t\t\t\t\t\tcontinue"},
  {"line":250,"text":"\t\t\t\t\t\t}"},
  {"line":252,"text":"\t\t\t\t\t\tfixedLine := replacer.Replace(line)"},
  {"line":253,"text":"\t\t\t\t\t\tcommandLines = append(commandLines, fixedLine)"},
  {"line":254,"text":"\t\t\t\t\t}"},
  {"line":255,"text":"\t\t\t\t}"},
  {"line":256,"text":"\t\t\t\treturn strings.Join(dropTrailingEmptyLines(commandLines), \"\\n\")"},
  {"line":257,"text":"\t\t\t},"},
  {"line":258,"text":"\t\t\tDiffFixupNew: func(s string) string {"},
  {"line":259,"text":"\t\t\t\tlines := strings.Split(s, \"\\n\")"},
  {"line":260,"text":"\t\t\t\tvar fixedLines []string"},
  {"line":261,"text":"\t\t\t\tfor i := 0; i < len(lines); i++ {"},
  {"line":262,"text":"\t\t\t\t\tline := lines[i]"},
  {"line":263,"text":"\t\t\t\t\ttrimmedLine := strings.TrimSpace(line)"},
  {"line":264,"text":"\t\t\t\t\tif strings.HasPrefix(trimmedLine, `\"position\": `) {"},
  {"line":265,"text":"\t\t\t\t\t\ti = i + 3"},
  {"line":266,"text":"\t\t\t\t\t\tcontinue"},
  {"line":267,"text":"\t\t\t\t\t}"},
  {"line":268,"text":"\t\t\t\t\tif strings.HasPrefix(trimmedLine, `\"location\": `) {"},
  {"line":269,"text":"\t\t\t\t\t\tfixedLines = append(fixedLines, line+\"},\")"},
  {"line":270,"text":"\t\t\t\t\t\ti = i + 12"},
  {"line":271,"text":"\t\t\t\t\t\tcontinue"},
  {"line":272,"text":"\t\t\t\t\t}"},
  {"line":273,"text":"\t\t\t\t\tfixedLines = append(fixedLines, line)"},
  {"line":274,"text":"\t\t\t\t}"},
  {"line":275,"text":"\t\t\t\treturn strings.Join(fixedLines, \"\\n\")"},
  {"line":276,"text":"\t\t\t},"},
  {"line":277,"text":"\t\t}"},
  {"line":278,"text":"\tcase goToDefinitionCmd, goToTypeDefinitionCmd, goToImplementationCmd, goToSourceDefinitionCmd:"},
  {"line":279,"text":"\t\treturn baseline.Options{"},
  {"line":280,"text":"\t\t\tSubfolder:   subfolder,"},
  {"line":281,"text":"\t\t\tIsSubmodule: true,"},
  {"line":282,"text":"\t\t\tDiffFixupOld: func(s string) string {"},
  {"line":283,"text":"\t\t\t\tvar commandLines []string"},
  {"line":284,"text":"\t\t\t\tcommandPrefix := regexp.MustCompile(`^// === ([a-z\\sA-Z]*) ===`)"},
  {"line":285,"text":"\t\t\t\ttestFilePrefix := \"/tests/cases/fourslash\""},
  {"line":286,"text":"\t\t\t\tserverTestFilePrefix := \"/server\""},
  {"line":287,"text":"\t\t\t\toldGoToDefCommand := \"getDefinitionAtPosition\""},
  {"line":288,"text":"\t\t\t\toldGoToDefComment := \"/*GOTO DEF POS*/\""},
  {"line":289,"text":"\t\t\t\treplacer := strings.NewReplacer("},
  {"line":290,"text":"\t\t\t\t\ttestFilePrefix, \"\","},
  {"line":291,"text":"\t\t\t\t\tserverTestFilePrefix, \"\","},
  {"line":292,"text":"\t\t\t\t\toldGoToDefCommand, string(goToDefinitionCmd),"},
  {"line":293,"text":"\t\t\t\t\toldGoToDefComment, \"/*GOTO DEF*/\","},
  {"line":294,"text":"\t\t\t\t)"},
  {"line":295,"text":"\t\t\t\tobjectRangeRegex := regexp.MustCompile(`{\\| [^|]* \\|}`)"},
  {"line":296,"text":"\t\t\t\tdetailsStr := \"// === Details ===\""},
  {"line":297,"text":"\t\t\t\tlines := strings.Split(s, \"\\n\")"},
  {"line":298,"text":"\t\t\t\tvar isInCommand bool"},
  {"line":299,"text":"\t\t\t\tvar isInDetails bool"},
  {"line":300,"text":"\t\t\t\tfor _, line := range lines {"},
  {"line":301,"text":"\t\t\t\t\tmatches := commandPrefix.FindStringSubmatch(line)"},
  {"line":302,"text":"\t\t\t\t\tif len(matches) > 0 {"},
  {"line":303,"text":"\t\t\t\t\t\tisInDetails = false"},
  {"line":304,"text":"\t\t\t\t\t\tcommandName := matches[1]"},
  {"line":305,"text":"\t\t\t\t\t\tif commandName == string(command) ||"},
  {"line":306,"text":"\t\t\t\t\t\t\tcommand == goToDefinitionCmd && commandName == oldGoToDefCommand {"},
  {"line":307,"text":"\t\t\t\t\t\t\tisInCommand = true"},
  {"line":308,"text":"\t\t\t\t\t\t} else {"},
  {"line":309,"text":"\t\t\t\t\t\t\tisInCommand = false"},
  {"line":310,"text":"\t\t\t\t\t\t}"},
  {"line":311,"text":"\t\t\t\t\t}"},
  {"line":312,"text":"\t\t\t\t\tif isInCommand {"},
  {"line":313,"text":"\t\t\t\t\t\tif strings.Contains(line, detailsStr) {"},
  {"line":315,"text":"\t\t\t\t\t\t\tcommandLines = commandLines[:len(commandLines)-1]"},
  {"line":316,"text":"\t\t\t\t\t\t\tisInDetails = true"},
  {"line":317,"text":"\t\t\t\t\t\t}"},
  {"line":319,"text":"\t\t\t\t\t\tif !isInDetails {"},
  {"line":320,"text":"\t\t\t\t\t\t\tfixedLine := replacer.Replace(line)"},
  {"line":321,"text":"\t\t\t\t\t\t\tfixedLine = objectRangeRegex.ReplaceAllString(fixedLine, \"\")"},
  {"line":322,"text":"\t\t\t\t\t\t\tcommandLines = append(commandLines, fixedLine)"},
  {"line":323,"text":"\t\t\t\t\t\t} else if line == \"  ]\" {"},
  {"line":324,"text":"\t\t\t\t\t\t\tisInDetails = false"},
  {"line":325,"text":"\t\t\t\t\t\t}"},
  {"line":326,"text":"\t\t\t\t\t}"},
  {"line":327,"text":"\t\t\t\t}"},
  {"line":328,"text":"\t\t\t\treturn strings.Join(dropTrailingEmptyLines(commandLines), \"\\n\")"},
  {"line":329,"text":"\t\t\t},"},
  {"line":330,"text":"\t\t\tDiffFixupNew: func(s string) string {"},
  {"line":331,"text":"\t\t\t\treturn strings.ReplaceAll(s, \"bundled:///libs/\", \"\")"},
  {"line":332,"text":"\t\t\t},"},
  {"line":333,"text":"\t\t}"},
  {"line":334,"text":"\tcase findAllReferencesCmd:"},
  {"line":335,"text":"\t\treturn baseline.Options{"},
  {"line":336,"text":"\t\t\tSubfolder:   subfolder,"},
  {"line":337,"text":"\t\t\tIsSubmodule: true,"},
  {"line":338,"text":"\t\t\tDiffFixupOld: func(s string) string {"},
  {"line":339,"text":"\t\t\t\tvar commandLines []string"},
  {"line":340,"text":"\t\t\t\tcommandPrefix := regexp.MustCompile(`^// === ([a-z\\sA-Z]*) ===`)"},
  {"line":341,"text":"\t\t\t\tfilePrefix := regexp.MustCompile(`^// === ([^ ]*) ===`)"},
  {"line":342,"text":"\t\t\t\ttestFilePrefix := \"/tests/cases/fourslash\""},
  {"line":343,"text":"\t\t\t\tserverTestFilePrefix := \"/server\""},
  {"line":344,"text":"\t\t\t\tcontextSpanOpening := \"<|\""},
  {"line":345,"text":"\t\t\t\tcontextSpanClosing := \"|>\""},
  {"line":346,"text":"\t\t\t\treplacer := strings.NewReplacer("},
  {"line":347,"text":"\t\t\t\t\ttestFilePrefix, \"\","},
  {"line":348,"text":"\t\t\t\t\tserverTestFilePrefix, \"\","},
  {"line":349,"text":"\t\t\t\t\tcontextSpanOpening, \"\","},
  {"line":350,"text":"\t\t\t\t\tcontextSpanClosing, \"\","},
  {"line":351,"text":"\t\t\t\t)"},
  {"line":353,"text":"\t\t\t\tobjectRangeRegex := regexp.MustCompile(`{\\| [^|]* \\|}`)"},
  {"line":354,"text":"\t\t\t\tdefinitionsStr := \"// === Definitions ===\""},
  {"line":355,"text":"\t\t\t\tdetailsStr := \"// === Details ===\""},
  {"line":356,"text":"\t\t\t\tlines := strings.Split(s, \"\\n\")"},
  {"line":357,"text":"\t\t\t\tvar isInCommand bool"},
  {"line":358,"text":"\t\t\t\tvar isInDetails bool"},
  {"line":359,"text":"\t\t\t\tvar isInDefinitions bool"},
  {"line":362,"text":"\t\t\t\ttype fileSection struct {"},
  {"line":363,"text":"\t\t\t\t\tfileName string"},
  {"line":364,"text":"\t\t\t\t\tlines    []string"},
  {"line":365,"text":"\t\t\t\t}"},
  {"line":366,"text":"\t\t\t\tvar fileSections []fileSection"},
  {"line":367,"text":"\t\t\t\tvar currentFileName string"},
  {"line":368,"text":"\t\t\t\tvar currentFileLines []string"},
  {"line":370,"text":"\t\t\t\tfor _, line := range lines {"},
  {"line":371,"text":"\t\t\t\t\tmatches := commandPrefix.FindStringSubmatch(line)"},
  {"line":372,"text":"\t\t\t\t\tif len(matches) > 0 {"},
  {"line":373,"text":"\t\t\t\t\t\tisInDetails = false"},
  {"line":374,"text":"\t\t\t\t\t\tisInDefinitions = false"},
  {"line":375,"text":"\t\t\t\t\t\tcommandName := matches[1]"},
  {"line":376,"text":"\t\t\t\t\t\tif commandName == string(findAllReferencesCmd) {"},
  {"line":377,"text":"\t\t\t\t\t\t\tisInCommand = true"},
  {"line":379,"text":"\t\t\t\t\t\t\tif currentFileName != \"\" {"},
  {"line":380,"text":"\t\t\t\t\t\t\t\tfileSections = append(fileSections, fileSection{fileName: currentFileName, lines: currentFileLines})"},
  {"line":381,"text":"\t\t\t\t\t\t\t}"},
  {"line":382,"text":"\t\t\t\t\t\t\tcurrentFileName = \"\""},
  {"line":383,"text":"\t\t\t\t\t\t\tcurrentFileLines = nil"},
  {"line":384,"text":"\t\t\t\t\t\t\tslices.SortFunc(fileSections, func(a, b fileSection) int {"},
  {"line":385,"text":"\t\t\t\t\t\t\t\treturn strings.Compare(a.fileName, b.fileName)"},
  {"line":386,"text":"\t\t\t\t\t\t\t})"},
  {"line":387,"text":"\t\t\t\t\t\t\tfor _, section := range fileSections {"},
  {"line":388,"text":"\t\t\t\t\t\t\t\tsection.lines = dropTrailingEmptyLines(section.lines)"},
  {"line":389,"text":"\t\t\t\t\t\t\t\tcommandLines = append(commandLines, section.lines...)"},
  {"line":390,"text":"\t\t\t\t\t\t\t\tcommandLines = append(commandLines, \"\")"},
  {"line":391,"text":"\t\t\t\t\t\t\t}"},
  {"line":392,"text":"\t\t\t\t\t\t\tfileSections = nil"},
  {"line":393,"text":"\t\t\t\t\t\t\tif len(commandLines) > 0 {"},
  {"line":394,"text":"\t\t\t\t\t\t\t\tcommandLines = append(commandLines, \"\", \"\")"},
  {"line":395,"text":"\t\t\t\t\t\t\t}"},
  {"line":396,"text":"\t\t\t\t\t\t\tcommandLines = append(commandLines, replacer.Replace(line))"},
  {"line":397,"text":"\t\t\t\t\t\t\tcontinue"},
  {"line":398,"text":"\t\t\t\t\t\t} else {"},
  {"line":399,"text":"\t\t\t\t\t\t\tisInCommand = false"},
  {"line":400,"text":"\t\t\t\t\t\t}"},
  {"line":401,"text":"\t\t\t\t\t}"},
  {"line":402,"text":"\t\t\t\t\tif isInCommand {"},
  {"line":403,"text":"\t\t\t\t\t\tif strings.Contains(line, definitionsStr) || strings.Contains(line, detailsStr) {"},
  {"line":404,"text":"\t\t\t\t\t\t\tisInDefinitions = strings.Contains(line, definitionsStr)"},
  {"line":405,"text":"\t\t\t\t\t\t\tisInDetails = strings.Contains(line, detailsStr)"},
  {"line":407,"text":"\t\t\t\t\t\t\tif len(currentFileLines) > 0 && currentFileLines[len(currentFileLines)-1] == \"\" {"},
  {"line":408,"text":"\t\t\t\t\t\t\t\tcurrentFileLines = currentFileLines[:len(currentFileLines)-1]"},
  {"line":409,"text":"\t\t\t\t\t\t\t}"},
  {"line":410,"text":"\t\t\t\t\t\t}"},
  {"line":412,"text":"\t\t\t\t\t\tif !(isInDefinitions || isInDetails) {"},
  {"line":413,"text":"\t\t\t\t\t\t\tfixedLine := replacer.Replace(line)"},
  {"line":414,"text":"\t\t\t\t\t\t\tfixedLine = objectRangeRegex.ReplaceAllString(fixedLine, \"\")"},
  {"line":416,"text":"\t\t\t\t\t\t\tfileMatches := filePrefix.FindStringSubmatch(fixedLine)"},
  {"line":417,"text":"\t\t\t\t\t\t\tif len(fileMatches) > 0 {"},
  {"line":418,"text":"\t\t\t\t\t\t\t\tif currentFileName != \"\" {"},
  {"line":419,"text":"\t\t\t\t\t\t\t\t\tfileSections = append(fileSections, fileSection{fileName: currentFileName, lines: currentFileLines})"},
  {"line":420,"text":"\t\t\t\t\t\t\t\t}"},
  {"line":421,"text":"\t\t\t\t\t\t\t\tcurrentFileName = fileMatches[1]"},
  {"line":422,"text":"\t\t\t\t\t\t\t\tcurrentFileLines = []string{fixedLine}"},
  {"line":423,"text":"\t\t\t\t\t\t\t} else {"},
  {"line":424,"text":"\t\t\t\t\t\t\t\tcurrentFileLines = append(currentFileLines, fixedLine)"},
  {"line":425,"text":"\t\t\t\t\t\t\t}"},
  {"line":426,"text":"\t\t\t\t\t\t} else if isInDetails && line == \"  ]\" {"},
  {"line":427,"text":"\t\t\t\t\t\t\tisInDetails = false"},
  {"line":428,"text":"\t\t\t\t\t\t}"},
  {"line":429,"text":"\t\t\t\t\t}"},
  {"line":430,"text":"\t\t\t\t}"},
  {"line":433,"text":"\t\t\t\tif currentFileName != \"\" {"},
  {"line":434,"text":"\t\t\t\t\tfileSections = append(fileSections, fileSection{fileName: currentFileName, lines: currentFileLines})"},
  {"line":435,"text":"\t\t\t\t}"},
  {"line":438,"text":"\t\t\t\tif len(fileSections) > 0 {"},
  {"line":439,"text":"\t\t\t\t\tslices.SortFunc(fileSections, func(a, b fileSection) int {"},
  {"line":440,"text":"\t\t\t\t\t\treturn strings.Compare(a.fileName, b.fileName)"},
  {"line":441,"text":"\t\t\t\t\t})"},
  {"line":442,"text":"\t\t\t\t\tfor _, section := range fileSections {"},
  {"line":443,"text":"\t\t\t\t\t\tsection.lines = dropTrailingEmptyLines(section.lines)"},
  {"line":444,"text":"\t\t\t\t\t\tcommandLines = append(commandLines, section.lines...)"},
  {"line":445,"text":"\t\t\t\t\t\tcommandLines = append(commandLines, \"\")"},
  {"line":446,"text":"\t\t\t\t\t}"},
  {"line":447,"text":"\t\t\t\t}"},
  {"line":449,"text":"\t\t\t\treturn strings.Join(dropTrailingEmptyLines(commandLines), \"\\n\")"},
  {"line":450,"text":"\t\t\t},"},
  {"line":451,"text":"\t\t}"},
  {"line":452,"text":"\tcase linkedEditingCmd:"},
  {"line":453,"text":"\t\tdeleteInfo := func(s string) string {"},
  {"line":454,"text":"\t\t\tcommandLines := []string{}"},
  {"line":455,"text":"\t\t\tlines := strings.Split(s, \"\\n\")"},
  {"line":456,"text":"\t\t\tlinkedEditingInfoHeader := regexp.MustCompile(`=== [0-9]+ ===`)"},
  {"line":457,"text":"\t\t\tfileNameHeader := regexp.MustCompile(`=== [\\w,\\s-]+\\.[A-Za-z]+ ===`)"},
  {"line":458,"text":"\t\t\tinLinkedEditingInfo := false"},
  {"line":459,"text":"\t\t\tfor i, line := range lines {"},
  {"line":460,"text":"\t\t\t\tif linkedEditingInfoHeader.MatchString(line) {"},
  {"line":461,"text":"\t\t\t\t\tinLinkedEditingInfo = true"},
  {"line":462,"text":"\t\t\t\t\tcontinue"},
  {"line":463,"text":"\t\t\t\t}"},
  {"line":464,"text":"\t\t\t\tif fileNameHeader.MatchString(line) {"},
  {"line":465,"text":"\t\t\t\t\tinLinkedEditingInfo = false"},
  {"line":466,"text":"\t\t\t\t\tcontinue"},
  {"line":467,"text":"\t\t\t\t}"},
  {"line":469,"text":"\t\t\t\tif !inLinkedEditingInfo {"},
  {"line":470,"text":"\t\t\t\t\tlines[i] = \"\""},
  {"line":471,"text":"\t\t\t\t}"},
  {"line":472,"text":"\t\t\t}"},
  {"line":473,"text":"\t\t\treturn strings.Join(dropTrailingEmptyLines(commandLines), \"\\n\")"},
  {"line":474,"text":"\t\t}"},
  {"line":475,"text":"\t\treturn baseline.Options{"},
  {"line":476,"text":"\t\t\tSubfolder:    subfolder,"},
  {"line":477,"text":"\t\t\tIsSubmodule:  true,"},
  {"line":478,"text":"\t\t\tDiffFixupOld: deleteInfo,"},
  {"line":479,"text":"\t\t\tDiffFixupNew: deleteInfo,"},
  {"line":480,"text":"\t\t}"},
  {"line":481,"text":"\tdefault:"},
  {"line":482,"text":"\t\treturn baseline.Options{"},
  {"line":483,"text":"\t\t\tSubfolder: subfolder,"},
  {"line":484,"text":"\t\t}"},
  {"line":485,"text":"\t}"},
  {"line":486,"text":"}"},
  {"line":488,"text":"func dropTrailingEmptyLines(ss []string) []string {"},
  {"line":489,"text":"\treturn ss[:core.FindLastIndex(ss, func(s string) bool { return s != \"\" })+1]"},
  {"line":490,"text":"}"},
  {"line":492,"text":"func isSubmoduleTest(testPath string) bool {"},
  {"line":493,"text":"\treturn strings.Contains(testPath, \"fourslash/tests/gen\") || strings.Contains(testPath, \"fourslash/tests/manual\")"},
  {"line":494,"text":"}"},
  {"line":496,"text":"func normalizeCommandName(command string) string {"},
  {"line":497,"text":"\twords := strings.Fields(command)"},
  {"line":498,"text":"\tcommand = strings.Join(words, \"\")"},
  {"line":499,"text":"\treturn stringutil.LowerFirstChar(command)"},
  {"line":500,"text":"}"},
  {"line":502,"text":"type documentSpan struct {"},
  {"line":503,"text":"\turi         lsproto.DocumentUri"},
  {"line":504,"text":"\ttextSpan    lsproto.Range"},
  {"line":505,"text":"\tcontextSpan *lsproto.Range"},
  {"line":506,"text":"}"},
  {"line":508,"text":"type baselineFourslashLocationsOptions struct {"},
  {"line":510,"text":"\tmarker     MarkerOrRange // location"},
  {"line":511,"text":"\tmarkerName string        // name of the marker to be printed in baseline"},
  {"line":513,"text":"\tendMarker string"},
  {"line":515,"text":"\tstartMarkerPrefix func(span documentSpan) *string"},
  {"line":516,"text":"\tendMarkerSuffix   func(span documentSpan) *string"},
  {"line":517,"text":"\tgetLocationData   func(span documentSpan) string"},
  {"line":519,"text":"\tadditionalSpan      *documentSpan"},
  {"line":520,"text":"\tpreserveResultOrder bool"},
  {"line":521,"text":"\torderedFiles        []lsproto.DocumentUri"},
  {"line":522,"text":"}"},
  {"line":524,"text":"func locationToSpan(loc lsproto.Location) documentSpan {"},
  {"line":525,"text":"\treturn documentSpan{"},
  {"line":526,"text":"\t\turi:      loc.Uri,"},
  {"line":527,"text":"\t\ttextSpan: loc.Range,"},
  {"line":528,"text":"\t}"},
  {"line":529,"text":"}"},
  {"line":531,"text":"func (f *FourslashTest) getBaselineForLocationsWithFileContents(locations []lsproto.Location, options baselineFourslashLocationsOptions) string {"},
  {"line":532,"text":"\treturn f.getBaselineForSpansWithFileContents("},
  {"line":533,"text":"\t\tcore.Map(locations, locationToSpan),"},
  {"line":534,"text":"\t\toptions,"},
  {"line":535,"text":"\t)"},
  {"line":536,"text":"}"},
  {"line":538,"text":"func (f *FourslashTest) getBaselineForSpansWithFileContents(spans []documentSpan, options baselineFourslashLocationsOptions) string {"},
  {"line":539,"text":"\tspansByFile := collections.GroupBy(spans, func(span documentSpan) lsproto.DocumentUri { return span.uri })"},
  {"line":540,"text":"\tif options.preserveResultOrder {"},
  {"line":541,"text":"\t\toptions.orderedFiles = uniqueFilesInSpanOrder(spans)"},
  {"line":542,"text":"\t}"},
  {"line":543,"text":"\treturn f.getBaselineForGroupedSpansWithFileContents("},
  {"line":544,"text":"\t\tspansByFile,"},
  {"line":545,"text":"\t\toptions,"},
  {"line":546,"text":"\t)"},
  {"line":547,"text":"}"},
  {"line":549,"text":"func (f *FourslashTest) getBaselineForGroupedSpansWithFileContents(groupedRanges *collections.MultiMap[lsproto.DocumentUri, documentSpan], options baselineFourslashLocationsOptions) string {"},
  {"line":553,"text":"\tfoundMarker := false"},
  {"line":554,"text":"\tfoundAdditionalLocation := false"},
  {"line":555,"text":"\tspanToContextId := map[documentSpan]int{}"},
  {"line":557,"text":"\tbaselineEntries := []string{}"},
  {"line":558,"text":"\taddFileEntry := func(path string) {"},
  {"line":559,"text":"\t\tfileName := lsconv.FileNameToDocumentURI(path)"},
  {"line":560,"text":"\t\tranges := groupedRanges.Get(fileName)"},
  {"line":561,"text":"\t\tif len(ranges) == 0 {"},
  {"line":562,"text":"\t\t\treturn"},
  {"line":563,"text":"\t\t}"},
  {"line":565,"text":"\t\tcontent, ok := f.textOfFile(path)"},
  {"line":566,"text":"\t\tif !ok {"},
  {"line":567,"text":"\t\t\treturn"},
  {"line":568,"text":"\t\t}"},
  {"line":570,"text":"\t\tif options.marker != nil && options.marker.FileName() == path {"},
  {"line":571,"text":"\t\t\tfoundMarker = true"},
  {"line":572,"text":"\t\t}"},
  {"line":574,"text":"\t\tif options.additionalSpan != nil && options.additionalSpan.uri == fileName {"},
  {"line":575,"text":"\t\t\tfoundAdditionalLocation = true"},
  {"line":576,"text":"\t\t}"},
  {"line":578,"text":"\t\tbaselineEntries = append(baselineEntries, f.getBaselineContentForFile(path, content, ranges, spanToContextId, options))"},
  {"line":579,"text":"\t}"},
  {"line":580,"text":"\twalkDirFn := func(path string, d vfs.DirEntry, e error) error {"},
  {"line":581,"text":"\t\tif e != nil {"},
  {"line":582,"text":"\t\t\treturn e"},
  {"line":583,"text":"\t\t}"},
  {"line":585,"text":"\t\tif !d.Type().IsRegular() {"},
  {"line":586,"text":"\t\t\treturn nil"},
  {"line":587,"text":"\t\t}"},
  {"line":589,"text":"\t\taddFileEntry(path)"},
  {"line":590,"text":"\t\treturn nil"},
  {"line":591,"text":"\t}"},
  {"line":593,"text":"\tif options.preserveResultOrder {"},
  {"line":594,"text":"\t\tfor _, uri := range options.orderedFiles {"},
  {"line":595,"text":"\t\t\taddFileEntry(uri.FileName())"},
  {"line":596,"text":"\t\t}"},
  {"line":597,"text":"\t} else {"},
  {"line":598,"text":"\t\terr := f.vfs.WalkDir(\"/\", walkDirFn)"},
  {"line":599,"text":"\t\tif err != nil && !errors.Is(err, fs.ErrNotExist) {"},
  {"line":600,"text":"\t\t\tpanic(\"walkdir error during fourslash baseline: \" + err.Error())"},
  {"line":601,"text":"\t\t}"},
  {"line":603,"text":"\t\terr = f.vfs.WalkDir(\"bundled:///\", walkDirFn)"},
  {"line":604,"text":"\t\tif err != nil && !errors.Is(err, fs.ErrNotExist) {"},
  {"line":605,"text":"\t\t\tpanic(\"walkdir error during fourslash baseline: \" + err.Error())"},
  {"line":606,"text":"\t\t}"},
  {"line":607,"text":"\t}"},
  {"line":611,"text":"\tif options.additionalSpan != nil && !foundAdditionalLocation {"},
  {"line":612,"text":"\t\tfileName := options.additionalSpan.uri.FileName()"},
  {"line":613,"text":"\t\tif content, ok := f.textOfFile(fileName); ok {"},
  {"line":614,"text":"\t\t\tbaselineEntries = append("},
  {"line":615,"text":"\t\t\t\tbaselineEntries,"},
  {"line":616,"text":"\t\t\t\tf.getBaselineContentForFile(fileName, content, []documentSpan{*options.additionalSpan}, spanToContextId, options),"},
  {"line":617,"text":"\t\t\t)"},
  {"line":618,"text":"\t\t\tif options.marker != nil && options.marker.FileName() == fileName {"},
  {"line":619,"text":"\t\t\t\tfoundMarker = true"},
  {"line":620,"text":"\t\t\t}"},
  {"line":621,"text":"\t\t}"},
  {"line":622,"text":"\t}"},
  {"line":624,"text":"\tif !foundMarker && options.marker != nil {"},
  {"line":626,"text":"\t\tmarkerFileName := options.marker.FileName()"},
  {"line":627,"text":"\t\tif content, ok := f.textOfFile(markerFileName); ok {"},
  {"line":628,"text":"\t\t\tbaselineEntries = append(baselineEntries, f.getBaselineContentForFile(markerFileName, content, nil, spanToContextId, options))"},
  {"line":629,"text":"\t\t}"},
  {"line":630,"text":"\t}"},
  {"line":634,"text":"\treturn strings.Join(baselineEntries, \"\\n\\n\")"},
  {"line":635,"text":"}"},
  {"line":637,"text":"func uniqueFilesInSpanOrder(spans []documentSpan) []lsproto.DocumentUri {"},
  {"line":638,"text":"\tif len(spans) == 0 {"},
  {"line":639,"text":"\t\treturn nil"},
  {"line":640,"text":"\t}"},
  {"line":641,"text":"\tseen := map[lsproto.DocumentUri]struct{}{}"},
  {"line":642,"text":"\tresult := make([]lsproto.DocumentUri, 0, len(spans))"},
  {"line":643,"text":"\tfor _, span := range spans {"},
  {"line":644,"text":"\t\tif _, ok := seen[span.uri]; ok {"},
  {"line":645,"text":"\t\t\tcontinue"},
  {"line":646,"text":"\t\t}"},
  {"line":647,"text":"\t\tseen[span.uri] = struct{}{}"},
  {"line":648,"text":"\t\tresult = append(result, span.uri)"},
  {"line":649,"text":"\t}"},
  {"line":650,"text":"\treturn result"},
  {"line":651,"text":"}"},
  {"line":653,"text":"func (f *FourslashTest) textOfFile(fileName string) (string, bool) {"},
  {"line":654,"text":"\tif _, ok := f.openFiles[fileName]; ok {"},
  {"line":655,"text":"\t\treturn f.getScriptInfo(fileName).content, true"},
  {"line":656,"text":"\t}"},
  {"line":657,"text":"\treturn f.vfs.ReadFile(fileName)"},
  {"line":658,"text":"}"},
  {"line":660,"text":"type detailKind int"},
  {"line":662,"text":"const ("},
  {"line":663,"text":"\tdetailKindMarker       detailKind = iota // /*MARKER*/"},
  {"line":664,"text":"\tdetailKindContextStart                   // <|"},
  {"line":665,"text":"\tdetailKindTextStart                      // [|"},
  {"line":666,"text":"\tdetailKindTextEnd                        // |]"},
  {"line":667,"text":"\tdetailKindContextEnd                     // |>"},
  {"line":668,"text":")"},
  {"line":670,"text":"func (k detailKind) isEnd() bool {"},
  {"line":671,"text":"\treturn k == detailKindContextEnd || k == detailKindTextEnd"},
  {"line":672,"text":"}"},
  {"line":674,"text":"func (k detailKind) isStart() bool {"},
  {"line":675,"text":"\treturn k == detailKindContextStart || k == detailKindTextStart"},
  {"line":676,"text":"}"},
  {"line":678,"text":"type baselineDetail struct {"},
  {"line":679,"text":"\tpos            lsproto.Position"},
  {"line":680,"text":"\tpositionMarker string"},
  {"line":681,"text":"\tspan           *documentSpan"},
  {"line":682,"text":"\tkind           detailKind"},
  {"line":683,"text":"}"},
  {"line":685,"text":"func (d *baselineDetail) getRange() lsproto.Range {"},
  {"line":686,"text":"\tswitch d.kind {"},
  {"line":687,"text":"\tcase detailKindContextStart:"},
  {"line":688,"text":"\t\treturn *d.span.contextSpan"},
  {"line":689,"text":"\tcase detailKindContextEnd:"},
  {"line":690,"text":"\t\treturn *d.span.contextSpan"},
  {"line":691,"text":"\tcase detailKindTextStart:"},
  {"line":692,"text":"\t\treturn d.span.textSpan"},
  {"line":693,"text":"\tcase detailKindTextEnd:"},
  {"line":694,"text":"\t\treturn d.span.textSpan"},
  {"line":695,"text":"\tcase detailKindMarker:"},
  {"line":696,"text":"\t\treturn lsproto.Range{"},
  {"line":697,"text":"\t\t\tStart: d.pos,"},
  {"line":698,"text":"\t\t\tEnd:   d.pos,"},
  {"line":699,"text":"\t\t}"},
  {"line":700,"text":"\tdefault:"},
  {"line":701,"text":"\t\tpanic(\"unknown detail kind\")"},
  {"line":702,"text":"\t}"},
  {"line":703,"text":"}"},
  {"line":705,"text":"func (f *FourslashTest) getBaselineContentForFile("},
  {"line":706,"text":"\tfileName string,"},
  {"line":707,"text":"\tcontent string,"},
  {"line":708,"text":"\tspansInFile []documentSpan,"},
  {"line":709,"text":"\tspanToContextId map[documentSpan]int,"},
  {"line":710,"text":"\toptions baselineFourslashLocationsOptions,"},
  {"line":711,"text":") string {"},
  {"line":712,"text":"\tdetails := []*baselineDetail{}"},
  {"line":713,"text":"\tdetailPrefixes := map[*baselineDetail]string{}"},
  {"line":714,"text":"\tdetailSuffixes := map[*baselineDetail]string{}"},
  {"line":715,"text":"\tcanDetermineContextIdInline := true"},
  {"line":717,"text":"\tif options.marker != nil && options.marker.FileName() == fileName {"},
  {"line":718,"text":"\t\tdetails = append(details, &baselineDetail{pos: options.marker.LSPos(), positionMarker: options.markerName})"},
  {"line":719,"text":"\t}"},
  {"line":721,"text":"\tfor _, span := range spansInFile {"},
  {"line":722,"text":"\t\tcontextSpanIndex := len(details)"},
  {"line":725,"text":"\t\tif span.contextSpan != nil {"},
  {"line":726,"text":"\t\t\tdetails = append(details, &baselineDetail{"},
  {"line":727,"text":"\t\t\t\tpos:            span.contextSpan.Start,"},
  {"line":728,"text":"\t\t\t\tpositionMarker: \"<|\","},
  {"line":729,"text":"\t\t\t\tspan:           &span,"},
  {"line":730,"text":"\t\t\t\tkind:           detailKindContextStart,"},
  {"line":731,"text":"\t\t\t})"},
  {"line":734,"text":"\t\t\tif lsproto.ComparePositions(span.contextSpan.Start, span.textSpan.Start) > 0 {"},
  {"line":735,"text":"\t\t\t\tcanDetermineContextIdInline = false"},
  {"line":736,"text":"\t\t\t}"},
  {"line":737,"text":"\t\t}"},
  {"line":739,"text":"\t\ttextSpanIndex := len(details)"},
  {"line":740,"text":"\t\tstartMarker := \"[|\""},
  {"line":741,"text":"\t\tif options.getLocationData != nil {"},
  {"line":742,"text":"\t\t\tstartMarker += options.getLocationData(span)"},
  {"line":743,"text":"\t\t}"},
  {"line":744,"text":"\t\tdetails = append(details,"},
  {"line":745,"text":"\t\t\t&baselineDetail{pos: span.textSpan.Start, positionMarker: startMarker, span: &span, kind: detailKindTextStart},"},
  {"line":746,"text":"\t\t\t&baselineDetail{pos: span.textSpan.End, positionMarker: core.OrElse(options.endMarker, \"|]\"), span: &span, kind: detailKindTextEnd},"},
  {"line":747,"text":"\t\t)"},
  {"line":749,"text":"\t\tif span.contextSpan != nil {"},
  {"line":750,"text":"\t\t\tdetails = append(details, &baselineDetail{"},
  {"line":751,"text":"\t\t\t\tpos:            span.contextSpan.End,"},
  {"line":752,"text":"\t\t\t\tpositionMarker: \"|>\","},
  {"line":753,"text":"\t\t\t\tspan:           &span,"},
  {"line":754,"text":"\t\t\t\tkind:           detailKindContextEnd,"},
  {"line":755,"text":"\t\t\t})"},
  {"line":756,"text":"\t\t}"},
  {"line":758,"text":"\t\tif options.startMarkerPrefix != nil {"},
  {"line":759,"text":"\t\t\tstartPrefix := options.startMarkerPrefix(span)"},
  {"line":760,"text":"\t\t\tif startPrefix != nil {"},
  {"line":765,"text":"\t\t\t\tif options.marker != nil && fileName == options.marker.FileName() && span.textSpan.Start == options.marker.LSPos() {"},
  {"line":766,"text":"\t\t\t\t\t_, ok := detailPrefixes[details[0]]"},
  {"line":767,"text":"\t\t\t\t\tdebug.Assert(!ok, \"Expected only single prefix at marker location\")"},
  {"line":768,"text":"\t\t\t\t\tdetailPrefixes[details[0]] = *startPrefix"},
  {"line":769,"text":"\t\t\t\t} else if span.contextSpan != nil && span.contextSpan.Start == span.textSpan.Start {"},
  {"line":770,"text":"\t\t\t\t\tdetailPrefixes[details[contextSpanIndex]] = *startPrefix"},
  {"line":771,"text":"\t\t\t\t} else {"},
  {"line":772,"text":"\t\t\t\t\tdetailPrefixes[details[textSpanIndex]] = *startPrefix"},
  {"line":773,"text":"\t\t\t\t}"},
  {"line":774,"text":"\t\t\t}"},
  {"line":775,"text":"\t\t}"},
  {"line":777,"text":"\t\tif options.endMarkerSuffix != nil {"},
  {"line":778,"text":"\t\t\tendSuffix := options.endMarkerSuffix(span)"},
  {"line":779,"text":"\t\t\tif endSuffix != nil {"},
  {"line":781,"text":"\t\t\t\tif options.marker != nil && fileName == options.marker.FileName() && span.textSpan.End == options.marker.LSPos() {"},
  {"line":782,"text":"\t\t\t\t\tdetailSuffixes[details[0]] = *endSuffix"},
  {"line":783,"text":"\t\t\t\t} else if span.contextSpan != nil && span.contextSpan.End == span.textSpan.End {"},
  {"line":784,"text":"\t\t\t\t\tdetailSuffixes[details[textSpanIndex+2]] = *endSuffix"},
  {"line":785,"text":"\t\t\t\t} else {"},
  {"line":786,"text":"\t\t\t\t\tdetailSuffixes[details[textSpanIndex+1]] = *endSuffix"},
  {"line":787,"text":"\t\t\t\t}"},
  {"line":788,"text":"\t\t\t}"},
  {"line":789,"text":"\t\t}"},
  {"line":790,"text":"\t}"},
  {"line":796,"text":"\tslices.SortStableFunc(details, func(d1, d2 *baselineDetail) int {"},
  {"line":797,"text":"\t\tc := lsproto.ComparePositions(d1.pos, d2.pos)"},
  {"line":798,"text":"\t\tif c != 0 || d1.kind == detailKindMarker && d2.kind == detailKindMarker {"},
  {"line":799,"text":"\t\t\treturn c"},
  {"line":800,"text":"\t\t}"},
  {"line":803,"text":"\t\tif d1.kind == detailKindMarker && d2.kind.isStart() {"},
  {"line":804,"text":"\t\t\treturn -1"},
  {"line":805,"text":"\t\t}"},
  {"line":806,"text":"\t\tif d2.kind == detailKindMarker && d1.kind.isStart() {"},
  {"line":807,"text":"\t\t\treturn 1"},
  {"line":808,"text":"\t\t}"},
  {"line":811,"text":"\t\tif d1.kind == detailKindMarker && d2.kind.isEnd() {"},
  {"line":812,"text":"\t\t\treturn 1"},
  {"line":813,"text":"\t\t}"},
  {"line":814,"text":"\t\tif d2.kind == detailKindMarker && d1.kind.isEnd() {"},
  {"line":815,"text":"\t\t\treturn -1"},
  {"line":816,"text":"\t\t}"},
  {"line":819,"text":"\t\tif d1.span == d2.span {"},
  {"line":820,"text":"\t\t\treturn int(d1.kind - d2.kind)"},
  {"line":821,"text":"\t\t}"},
  {"line":824,"text":"\t\tif d1.kind.isStart() && d2.kind.isEnd() {"},
  {"line":825,"text":"\t\t\treturn 1"},
  {"line":826,"text":"\t\t}"},
  {"line":827,"text":"\t\tif d1.kind.isEnd() && d2.kind.isStart() {"},
  {"line":828,"text":"\t\t\treturn -1"},
  {"line":829,"text":"\t\t}"},
  {"line":832,"text":"\t\tif d1.kind.isEnd() && d2.kind.isEnd() {"},
  {"line":833,"text":"\t\t\tc := lsproto.ComparePositions(d2.getRange().Start, d1.getRange().Start)"},
  {"line":834,"text":"\t\t\tif c != 0 {"},
  {"line":835,"text":"\t\t\t\treturn c"},
  {"line":836,"text":"\t\t\t}"},
  {"line":837,"text":"\t\t\treturn int(d1.kind - d2.kind)"},
  {"line":838,"text":"\t\t}"},
  {"line":841,"text":"\t\tif d1.kind.isStart() && d2.kind.isStart() {"},
  {"line":842,"text":"\t\t\tc := lsproto.ComparePositions(d2.getRange().End, d2.getRange().End)"},
  {"line":843,"text":"\t\t\tif c != 0 {"},
  {"line":844,"text":"\t\t\t\treturn c"},
  {"line":845,"text":"\t\t\t}"},
  {"line":846,"text":"\t\t\treturn int(d1.kind - d2.kind)"},
  {"line":847,"text":"\t\t}"},
  {"line":849,"text":"\t\treturn 0"},
  {"line":850,"text":"\t})"},
  {"line":853,"text":"\ttextWithContext := newTextWithContext(fileName, content)"},
  {"line":854,"text":"\tfor index, detail := range details {"},
  {"line":855,"text":"\t\ttextWithContext.add(detail)"},
  {"line":856,"text":"\t\ttextWithContext.pos = detail.pos"},
  {"line":858,"text":"\t\tprefix := detailPrefixes[detail]"},
  {"line":859,"text":"\t\tif prefix != \"\" {"},
  {"line":860,"text":"\t\t\ttextWithContext.newContent.WriteString(prefix)"},
  {"line":861,"text":"\t\t}"},
  {"line":862,"text":"\t\ttextWithContext.newContent.WriteString(detail.positionMarker)"},
  {"line":863,"text":"\t\tif detail.span != nil {"},
  {"line":864,"text":"\t\t\tswitch detail.kind {"},
  {"line":865,"text":"\t\t\tcase detailKindTextStart:"},
  {"line":866,"text":"\t\t\t\tvar text string"},
  {"line":867,"text":"\t\t\t\tif contextId, ok := spanToContextId[*detail.span]; ok {"},
  {"line":868,"text":"\t\t\t\t\tisAfterContextStart := false"},
  {"line":869,"text":"\t\t\t\t\tfor textStartIndex := index - 1; textStartIndex >= 0; textStartIndex-- {"},
  {"line":870,"text":"\t\t\t\t\t\ttextStartDetail := details[textStartIndex]"},
  {"line":871,"text":"\t\t\t\t\t\tif textStartDetail.kind == detailKindContextStart && textStartDetail.span == detail.span {"},
  {"line":872,"text":"\t\t\t\t\t\t\tisAfterContextStart = true"},
  {"line":873,"text":"\t\t\t\t\t\t\tbreak"},
  {"line":874,"text":"\t\t\t\t\t\t}"},
  {"line":876,"text":"\t\t\t\t\t\tif textStartDetail.span != nil {"},
  {"line":877,"text":"\t\t\t\t\t\t\tbreak"},
  {"line":878,"text":"\t\t\t\t\t\t}"},
  {"line":879,"text":"\t\t\t\t\t}"},
  {"line":881,"text":"\t\t\t\t\tif !isAfterContextStart {"},
  {"line":882,"text":"\t\t\t\t\t\tif text == \"\" {"},
  {"line":883,"text":"\t\t\t\t\t\t\ttext = fmt.Sprintf(`contextId: %v`, contextId)"},
  {"line":884,"text":"\t\t\t\t\t\t} else {"},
  {"line":885,"text":"\t\t\t\t\t\t\ttext = fmt.Sprintf(`contextId: %v`, contextId) + `, ` + text"},
  {"line":886,"text":"\t\t\t\t\t\t}"},
  {"line":887,"text":"\t\t\t\t\t}"},
  {"line":888,"text":"\t\t\t\t}"},
  {"line":889,"text":"\t\t\t\tif text != \"\" {"},
  {"line":890,"text":"\t\t\t\t\ttextWithContext.newContent.WriteString(\"{ \")"},
  {"line":891,"text":"\t\t\t\t\ttextWithContext.newContent.WriteString(text)"},
  {"line":892,"text":"\t\t\t\t\ttextWithContext.newContent.WriteString(\" |}\")"},
  {"line":893,"text":"\t\t\t\t}"},
  {"line":894,"text":"\t\t\tcase detailKindContextStart:"},
  {"line":895,"text":"\t\t\t\tif canDetermineContextIdInline {"},
  {"line":896,"text":"\t\t\t\t\tspanToContextId[*detail.span] = len(spanToContextId)"},
  {"line":897,"text":"\t\t\t\t}"},
  {"line":898,"text":"\t\t\t}"},
  {"line":899,"text":"\t\t}"},
  {"line":900,"text":"\t\tif suffix, ok := detailSuffixes[detail]; ok {"},
  {"line":901,"text":"\t\t\ttextWithContext.newContent.WriteString(suffix)"},
  {"line":902,"text":"\t\t}"},
  {"line":903,"text":"\t}"},
  {"line":904,"text":"\ttextWithContext.add(nil)"},
  {"line":905,"text":"\tif textWithContext.newContent.Len() != 0 {"},
  {"line":906,"text":"\t\ttextWithContext.readableContents.WriteString(\"\\n\")"},
  {"line":907,"text":"\t\ttextWithContext.readableJsoncBaseline(textWithContext.newContent.String())"},
  {"line":908,"text":"\t}"},
  {"line":909,"text":"\treturn textWithContext.readableContents.String()"},
  {"line":910,"text":"}"},
  {"line":912,"text":"var lineSplitter = regexp.MustCompile(`\\r?\\n`)"},
  {"line":914,"text":"type textWithContext struct {"},
  {"line":915,"text":"\tnLinesContext int // number of context lines to write to baseline"},
  {"line":917,"text":"\treadableContents *strings.Builder // builds what will be returned to be written to baseline"},
  {"line":919,"text":"\tnewContent *strings.Builder // helper; the part of the original file content to write between details"},
  {"line":920,"text":"\tpos        lsproto.Position"},
  {"line":921,"text":"\tisLibFile  bool"},
  {"line":922,"text":"\tfileName   string"},
  {"line":923,"text":"\tcontent    string // content of the original file"},
  {"line":924,"text":"\tlineStarts *lsconv.LSPLineMap"},
  {"line":925,"text":"\tconverters *lsconv.Converters"},
  {"line":928,"text":"\tposInfo  *lsproto.Position"},
  {"line":929,"text":"\tlineInfo int"},
  {"line":930,"text":"}"},
  {"line":933,"text":"func (t *textWithContext) FileName() string {"},
  {"line":934,"text":"\treturn t.fileName"},
  {"line":935,"text":"}"},
  {"line":938,"text":"func (t *textWithContext) Text() string {"},
  {"line":939,"text":"\treturn t.content"},
  {"line":940,"text":"}"},
  {"line":942,"text":"func newTextWithContext(fileName string, content string) *textWithContext {"},
  {"line":943,"text":"\tt := &textWithContext{"},
  {"line":944,"text":"\t\tnLinesContext: 4,"},
  {"line":946,"text":"\t\treadableContents: &strings.Builder{},"},
  {"line":948,"text":"\t\tisLibFile:  isLibFile(fileName),"},
  {"line":949,"text":"\t\tnewContent: &strings.Builder{},"},
  {"line":950,"text":"\t\tpos:        lsproto.Position{Line: 0, Character: 0},"},
  {"line":951,"text":"\t\tfileName:   fileName,"},
  {"line":952,"text":"\t\tcontent:    content,"},
  {"line":953,"text":"\t\tlineStarts: lsconv.ComputeLSPLineStarts(content),"},
  {"line":954,"text":"\t}"},
  {"line":956,"text":"\tt.converters = lsconv.NewConverters(lsproto.PositionEncodingKindUTF8, func(_ string) *lsconv.LSPLineMap {"},
  {"line":957,"text":"\t\treturn t.lineStarts"},
  {"line":958,"text":"\t})"},
  {"line":959,"text":"\tt.readableContents.WriteString(\"// === \")"},
  {"line":960,"text":"\tt.readableContents.WriteString(fileName)"},
  {"line":961,"text":"\tt.readableContents.WriteString(\" ===\")"},
  {"line":962,"text":"\treturn t"},
  {"line":963,"text":"}"},
  {"line":965,"text":"func (t *textWithContext) add(detail *baselineDetail) {"},
  {"line":966,"text":"\tif t.newContent.Len() == 0 && detail == nil {"},
  {"line":967,"text":"\t\tpanic(\"Unsupported\")"},
  {"line":968,"text":"\t}"},
  {"line":969,"text":"\tif detail == nil || (detail.kind != detailKindTextEnd && detail.kind != detailKindContextEnd) {"},
  {"line":971,"text":"\t\tposLineIndex := t.lineInfo"},
  {"line":972,"text":"\t\tif t.posInfo == nil || *t.posInfo != t.pos {"},
  {"line":973,"text":"\t\t\tposLineIndex = t.lineStarts.ComputeIndexOfLineStart(t.converters.LineAndCharacterToPosition(t, t.pos))"},
  {"line":974,"text":"\t\t}"},
  {"line":976,"text":"\t\tlocationLineIndex := len(t.lineStarts.LineStarts) - 1"},
  {"line":977,"text":"\t\tif detail != nil {"},
  {"line":978,"text":"\t\t\tlocationLineIndex = t.lineStarts.ComputeIndexOfLineStart(t.converters.LineAndCharacterToPosition(t, detail.pos))"},
  {"line":979,"text":"\t\t\tt.posInfo = &detail.pos"},
  {"line":980,"text":"\t\t\tt.lineInfo = locationLineIndex"},
  {"line":981,"text":"\t\t}"},
  {"line":983,"text":"\t\tnLines := 0"},
  {"line":984,"text":"\t\tif t.newContent.Len() != 0 {"},
  {"line":985,"text":"\t\t\tnLines += t.nLinesContext + 1"},
  {"line":986,"text":"\t\t}"},
  {"line":987,"text":"\t\tif detail != nil {"},
  {"line":988,"text":"\t\t\tnLines += t.nLinesContext + 1"},
  {"line":989,"text":"\t\t}"},
  {"line":991,"text":"\t\tif locationLineIndex-posLineIndex > nLines {"},
  {"line":992,"text":"\t\t\tif t.newContent.Len() != 0 {"},
  {"line":993,"text":"\t\t\t\tvar skippedString string"},
  {"line":994,"text":"\t\t\t\tif t.isLibFile {"},
  {"line":995,"text":"\t\t\t\t\tskippedString = \"--- (line: --) skipped ---\\n\""},
  {"line":996,"text":"\t\t\t\t} else {"},
  {"line":997,"text":"\t\t\t\t\tskippedString = fmt.Sprintf(`--- (line: %v) skipped ---`, posLineIndex+t.nLinesContext+1)"},
  {"line":998,"text":"\t\t\t\t}"},
  {"line":1000,"text":"\t\t\t\tt.readableContents.WriteString(\"\\n\")"},
  {"line":1001,"text":"\t\t\t\tt.readableJsoncBaseline(t.newContent.String() + t.sliceOfContent("},
  {"line":1002,"text":"\t\t\t\t\tt.getIndex(t.pos),"},
  {"line":1003,"text":"\t\t\t\t\tt.getIndex(t.lineStarts.LineStarts[posLineIndex+t.nLinesContext]),"},
  {"line":1004,"text":"\t\t\t\t) + skippedString)"},
  {"line":1006,"text":"\t\t\t\tif detail != nil {"},
  {"line":1007,"text":"\t\t\t\t\tt.readableContents.WriteString(\"\\n\")"},
  {"line":1008,"text":"\t\t\t\t}"},
  {"line":1009,"text":"\t\t\t\tt.newContent.Reset()"},
  {"line":1010,"text":"\t\t\t}"},
  {"line":1011,"text":"\t\t\tif detail != nil {"},
  {"line":1012,"text":"\t\t\t\tif t.isLibFile {"},
  {"line":1013,"text":"\t\t\t\t\tt.newContent.WriteString(\"--- (line: --) skipped ---\\n\")"},
  {"line":1014,"text":"\t\t\t\t} else {"},
  {"line":1015,"text":"\t\t\t\t\tt.newContent.WriteString(fmt.Sprintf(\"--- (line: %v) skipped ---\\n\", locationLineIndex-t.nLinesContext+1))"},
  {"line":1016,"text":"\t\t\t\t}"},
  {"line":1017,"text":"\t\t\t\tt.newContent.WriteString(t.sliceOfContent("},
  {"line":1018,"text":"\t\t\t\t\tt.getIndex(t.lineStarts.LineStarts[locationLineIndex-t.nLinesContext+1]),"},
  {"line":1019,"text":"\t\t\t\t\tt.getIndex(detail.pos),"},
  {"line":1020,"text":"\t\t\t\t))"},
  {"line":1021,"text":"\t\t\t}"},
  {"line":1022,"text":"\t\t\treturn"},
  {"line":1023,"text":"\t\t}"},
  {"line":1024,"text":"\t}"},
  {"line":1025,"text":"\tif detail == nil {"},
  {"line":1026,"text":"\t\tt.newContent.WriteString(t.sliceOfContent(t.getIndex(t.pos), nil))"},
  {"line":1027,"text":"\t} else {"},
  {"line":1028,"text":"\t\tt.newContent.WriteString(t.sliceOfContent(t.getIndex(t.pos), t.getIndex(detail.pos)))"},
  {"line":1029,"text":"\t}"},
  {"line":1030,"text":"}"},
  {"line":1032,"text":"func (t *textWithContext) readableJsoncBaseline(text string) {"},
  {"line":1033,"text":"\tfor i, line := range lineSplitter.Split(text, -1) {"},
  {"line":1034,"text":"\t\tif i > 0 {"},
  {"line":1035,"text":"\t\t\tt.readableContents.WriteString(\"\\n\")"},
  {"line":1036,"text":"\t\t}"},
  {"line":1037,"text":"\t\tt.readableContents.WriteString(\"// \")"},
  {"line":1038,"text":"\t\tt.readableContents.WriteString(line)"},
  {"line":1039,"text":"\t}"},
  {"line":1040,"text":"}"},
  {"line":1042,"text":"type markerAndItem[T any] struct {"},
  {"line":1043,"text":"\tMarker *Marker `json:\"marker\"`"},
  {"line":1044,"text":"\tItem   T       `json:\"item\"`"},
  {"line":1045,"text":"}"},
  {"line":1047,"text":"func annotateContentWithTooltips[T comparable]("},
  {"line":1048,"text":"\tt *testing.T,"},
  {"line":1049,"text":"\tf *FourslashTest,"},
  {"line":1050,"text":"\tmarkersAndItems []markerAndItem[T],"},
  {"line":1051,"text":"\topName string,"},
  {"line":1052,"text":"\tgetRange func(item T) *lsproto.Range,"},
  {"line":1053,"text":"\tgetTooltipLines func(item T, prev T) []string,"},
  {"line":1054,"text":") string {"},
  {"line":1055,"text":"\tbarWithGutter := \"| \" + strings.Repeat(\"-\", 70)"},
  {"line":1059,"text":"\tsorted := slices.Clone(markersAndItems)"},
  {"line":1060,"text":"\tslices.SortStableFunc(sorted, func(a, b markerAndItem[T]) int {"},
  {"line":1061,"text":"\t\tif c := cmp.Compare(a.Marker.FileName(), b.Marker.FileName()); c != 0 {"},
  {"line":1062,"text":"\t\t\treturn c"},
  {"line":1063,"text":"\t\t}"},
  {"line":1064,"text":"\t\treturn -cmp.Compare(a.Marker.Position, b.Marker.Position)"},
  {"line":1065,"text":"\t})"},
  {"line":1067,"text":"\tfilesToLines := collections.NewOrderedMapWithSizeHint[string, []string](1)"},
  {"line":1068,"text":"\tvar previous T"},
  {"line":1069,"text":"\tfor _, itemAndMarker := range sorted {"},
  {"line":1070,"text":"\t\tmarker := itemAndMarker.Marker"},
  {"line":1071,"text":"\t\titem := itemAndMarker.Item"},
  {"line":1073,"text":"\t\ttextRange := getRange(item)"},
  {"line":1074,"text":"\t\tif textRange == nil {"},
  {"line":1075,"text":"\t\t\tstart := marker.LSPosition"},
  {"line":1076,"text":"\t\t\tend := start"},
  {"line":1077,"text":"\t\t\tend.Character = end.Character + 1"},
  {"line":1078,"text":"\t\t\ttextRange = &lsproto.Range{Start: start, End: end}"},
  {"line":1079,"text":"\t\t}"},
  {"line":1081,"text":"\t\tif textRange.Start.Line != textRange.End.Line {"},
  {"line":1082,"text":"\t\t\tt.Fatalf(\"Expected text range to be on a single line, got %v\", textRange)"},
  {"line":1083,"text":"\t\t}"},
  {"line":1084,"text":"\t\tunderline := strings.Repeat(\" \", int(textRange.Start.Character)) +"},
  {"line":1085,"text":"\t\t\tstrings.Repeat(\"^\", int(textRange.End.Character-textRange.Start.Character))"},
  {"line":1087,"text":"\t\tfileName := marker.FileName()"},
  {"line":1088,"text":"\t\tlines, ok := filesToLines.Get(fileName)"},
  {"line":1089,"text":"\t\tif !ok {"},
  {"line":1090,"text":"\t\t\tlines = lineSplitter.Split(f.getScriptInfo(fileName).content, -1)"},
  {"line":1091,"text":"\t\t}"},
  {"line":1093,"text":"\t\tvar tooltipLines []string"},
  {"line":1094,"text":"\t\tif item != *new(T) {"},
  {"line":1095,"text":"\t\t\ttooltipLines = getTooltipLines(item, previous)"},
  {"line":1096,"text":"\t\t}"},
  {"line":1097,"text":"\t\tif len(tooltipLines) == 0 {"},
  {"line":1098,"text":"\t\t\ttooltipLines = []string{fmt.Sprintf(\"No %s at /*%s*/.\", opName, *marker.Name)}"},
  {"line":1099,"text":"\t\t}"},
  {"line":1100,"text":"\t\ttooltipLines = core.Map(tooltipLines, func(line string) string {"},
  {"line":1101,"text":"\t\t\treturn \"| \" + line"},
  {"line":1102,"text":"\t\t})"},
  {"line":1104,"text":"\t\tlinesToInsert := make([]string, len(tooltipLines)+3)"},
  {"line":1105,"text":"\t\tlinesToInsert[0] = underline"},
  {"line":1106,"text":"\t\tlinesToInsert[1] = barWithGutter"},
  {"line":1107,"text":"\t\tcopy(linesToInsert[2:], tooltipLines)"},
  {"line":1108,"text":"\t\tlinesToInsert[len(linesToInsert)-1] = barWithGutter"},
  {"line":1110,"text":"\t\tlines = slices.Insert("},
  {"line":1111,"text":"\t\t\tlines,"},
  {"line":1112,"text":"\t\t\tint(textRange.Start.Line+1),"},
  {"line":1113,"text":"\t\t\tlinesToInsert...,"},
  {"line":1114,"text":"\t\t)"},
  {"line":1115,"text":"\t\tfilesToLines.Set(fileName, lines)"},
  {"line":1117,"text":"\t\tprevious = item"},
  {"line":1118,"text":"\t}"},
  {"line":1120,"text":"\tbuilder := strings.Builder{}"},
  {"line":1121,"text":"\tseenFirst := false"},
  {"line":1122,"text":"\tfor fileName, lines := range filesToLines.Entries() {"},
  {"line":1123,"text":"\t\tbuilder.WriteString(fmt.Sprintf(\"=== %s ===\\n\", fileName))"},
  {"line":1124,"text":"\t\tfor _, line := range lines {"},
  {"line":1125,"text":"\t\t\tbuilder.WriteString(\"// \")"},
  {"line":1126,"text":"\t\t\tbuilder.WriteString(line)"},
  {"line":1127,"text":"\t\t\tbuilder.WriteByte('\\n')"},
  {"line":1128,"text":"\t\t}"},
  {"line":1130,"text":"\t\tif seenFirst {"},
  {"line":1131,"text":"\t\t\tbuilder.WriteString(\"\\n\\n\")"},
  {"line":1132,"text":"\t\t} else {"},
  {"line":1133,"text":"\t\t\tseenFirst = true"},
  {"line":1134,"text":"\t\t}"},
  {"line":1135,"text":"\t}"},
  {"line":1137,"text":"\treturn builder.String()"},
  {"line":1138,"text":"}"},
  {"line":1140,"text":"func (t *textWithContext) sliceOfContent(start *int, end *int) string {"},
  {"line":1141,"text":"\tif start == nil || *start < 0 {"},
  {"line":1142,"text":"\t\tstart = new(0)"},
  {"line":1143,"text":"\t}"},
  {"line":1145,"text":"\tif end == nil || *end > len(t.content) {"},
  {"line":1146,"text":"\t\tend = new(len(t.content))"},
  {"line":1147,"text":"\t}"},
  {"line":1149,"text":"\tif *start > *end {"},
  {"line":1150,"text":"\t\treturn \"\""},
  {"line":1151,"text":"\t}"},
  {"line":1153,"text":"\treturn t.content[*start:*end]"},
  {"line":1154,"text":"}"},
  {"line":1156,"text":"func (t *textWithContext) getIndex(i any) *int {"},
  {"line":1157,"text":"\tswitch i := i.(type) {"},
  {"line":1158,"text":"\tcase *int:"},
  {"line":1159,"text":"\t\treturn i"},
  {"line":1160,"text":"\tcase int:"},
  {"line":1161,"text":"\t\treturn new(i)"},
  {"line":1162,"text":"\tcase core.TextPos:"},
  {"line":1163,"text":"\t\treturn new(int(i))"},
  {"line":1164,"text":"\tcase *core.TextPos:"},
  {"line":1165,"text":"\t\treturn new(int(*i))"},
  {"line":1166,"text":"\tcase lsproto.Position:"},
  {"line":1167,"text":"\t\treturn t.getIndex(t.converters.LineAndCharacterToPosition(t, i))"},
  {"line":1168,"text":"\tcase *lsproto.Position:"},
  {"line":1169,"text":"\t\treturn t.getIndex(t.converters.LineAndCharacterToPosition(t, *i))"},
  {"line":1170,"text":"\t}"},
  {"line":1171,"text":"\tpanic(fmt.Sprintf(\"getIndex: unsupported type %T\", i))"},
  {"line":1172,"text":"}"},
  {"line":1174,"text":"func codeFence(lang string, code string) string {"},
  {"line":1175,"text":"\treturn \"```\" + lang + \"\\n\" + code + \"\\n```\""},
  {"line":1176,"text":"}"},
  {"line":1178,"text":"func symbolInformationToData(symbol *lsproto.SymbolInformation) string {"},
  {"line":1179,"text":"\treturn fmt.Sprintf(\"{| name: %s, kind: %s |}\", symbol.Name, symbol.Kind.String())"},
  {"line":1180,"text":"}"},
];

function findFourslashBaselineutilDeclaration(name: string): UpstreamDeclaration | undefined {
  return fourslashBaselineutilDeclarations.find((declaration) => declaration.name === name);
}

function requireFourslashBaselineutilDeclaration(name: string): UpstreamDeclaration {
  const declaration = findFourslashBaselineutilDeclaration(name);
  if (declaration === undefined) throw new Error(`Missing upstream declaration: ${name}`);
  return declaration;
}

function fourslashBaselineutilLineText(line: number): string | undefined {
  return fourslashBaselineutilSourceLines.find((entry) => entry.line === line)?.text;
}
