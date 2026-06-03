/**
 * Source ↔ generated position mapping.
 *
 * Port of TS-Go `internal/sourcemap/source_mapper.go` (313 LoC).
 * Builds a DocumentPositionMapper from a parsed RawSourceMap and the
 * generating file's ECMALineInfo, enabling bidirectional position
 * translation via binary search.
 */

import {
  decodeMappings,
  isSourceMapping,
  type Mapping,
  type SourceIndex,
  type NameIndex,
  MissingSource,
} from "./decoder.js";
import type { RawSourceMap } from "./generator.js";
import type { ECMALineInfo } from "./lineInfo.js";
import { tryGetSourceMappingURL } from "./util.js";
import { unmarshal, isJsonObject, isJsonArray, type JsonValue } from "../json/json.js";
import { getDirectoryPath, getNormalizedAbsolutePath } from "../tspath/path.js";
import { computePositionOfLineAndUTF16Character as scannerComputePositionOfLineAndUTF16Character } from "../scanner/index.js";

function computePositionOfLineAndUTF16Character(
  lineInfo: ECMALineInfo | undefined,
  line: number,
  character: number,
): number {
  // Mirrors source_mapper.go: position is -1 unless the file has line info,
  // in which case it is computed via the faithful scanner helper with
  // allowEdits=true.
  if (lineInfo === undefined) return -1;
  return scannerComputePositionOfLineAndUTF16Character(
    lineInfo.lineStarts,
    line,
    character,
    lineInfo.text,
    true /*allowEdits*/,
  );
}

// TS-Go: `const ( missingPosition = -1 )`.
const missingPosition = -1;

export interface Host {
  useCaseSensitiveFileNames(): boolean;
  getECMALineInfo(fileName: string): ECMALineInfo | undefined;
  readFile(fileName: string): { contents: string; ok: boolean };
}

export interface MappedPosition {
  generatedPosition: number;
  sourcePosition: number;
  sourceIndex: SourceIndex;
  nameIndex: NameIndex;
}

export type SourceMappedPosition = MappedPosition;

function isSourceMappedPosition(m: MappedPosition): boolean {
  return m.sourceIndex !== MissingSource && m.sourcePosition !== missingPosition;
}

export interface DocumentPosition {
  fileName: string;
  pos: number;
}

export class DocumentPositionMapper {
  readonly useCaseSensitiveFileNames: boolean;
  readonly sourceFileAbsolutePaths: readonly string[];
  readonly sourceToSourceIndexMap: ReadonlyMap<string, SourceIndex>;
  readonly generatedAbsoluteFilePath: string;
  readonly generatedMappings: readonly MappedPosition[];
  readonly sourceMappings: ReadonlyMap<SourceIndex, readonly SourceMappedPosition[]>;

  constructor(
    useCaseSensitiveFileNames: boolean,
    sourceFileAbsolutePaths: readonly string[],
    sourceToSourceIndexMap: ReadonlyMap<string, SourceIndex>,
    generatedAbsoluteFilePath: string,
    generatedMappings: readonly MappedPosition[],
    sourceMappings: ReadonlyMap<SourceIndex, readonly SourceMappedPosition[]>,
  ) {
    this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
    this.sourceFileAbsolutePaths = sourceFileAbsolutePaths;
    this.sourceToSourceIndexMap = sourceToSourceIndexMap;
    this.generatedAbsoluteFilePath = generatedAbsoluteFilePath;
    this.generatedMappings = generatedMappings;
    this.sourceMappings = sourceMappings;
  }

  getSourcePosition(loc: DocumentPosition): DocumentPosition | undefined {
    if (this.generatedMappings.length === 0) return undefined;
    const idx = binarySearchByGenerated(this.generatedMappings, loc.pos);
    if (idx < 0 || idx >= this.generatedMappings.length) return undefined;
    const mapping = this.generatedMappings[idx]!;
    if (!isSourceMappedPosition(mapping)) return undefined;
    return {
      fileName: this.sourceFileAbsolutePaths[mapping.sourceIndex]!,
      pos: mapping.sourcePosition,
    };
  }

  getGeneratedPosition(loc: DocumentPosition): DocumentPosition | undefined {
    const canonical = this.useCaseSensitiveFileNames ? loc.fileName : loc.fileName.toLowerCase();
    const sourceIndex = this.sourceToSourceIndexMap.get(canonical);
    if (sourceIndex === undefined || sourceIndex < 0) return undefined;
    const sourceMappings = this.sourceMappings.get(sourceIndex);
    if (sourceMappings === undefined) return undefined;
    const idx = binarySearchBySource(sourceMappings, loc.pos);
    if (idx < 0 || idx >= sourceMappings.length) return undefined;
    const mapping = sourceMappings[idx]!;
    if (mapping.sourceIndex !== sourceIndex) return undefined;
    return { fileName: this.generatedAbsoluteFilePath, pos: mapping.generatedPosition };
  }
}

function binarySearchByGenerated(arr: readonly MappedPosition[], pos: number): number {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid]!.generatedPosition < pos) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

function binarySearchBySource(arr: readonly SourceMappedPosition[], pos: number): number {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    if (arr[mid]!.sourcePosition < pos) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export function createDocumentPositionMapper(
  host: Host,
  sourceMap: RawSourceMap,
  mapPath: string,
): DocumentPositionMapper {
  const mapDirectory = getDirectoryPath(mapPath);
  const sourceRoot = sourceMap.sourceRoot !== undefined && sourceMap.sourceRoot !== ""
    ? getNormalizedAbsolutePath(sourceMap.sourceRoot, mapDirectory)
    : mapDirectory;
  const generatedAbsoluteFilePath = getNormalizedAbsolutePath(sourceMap.file, mapDirectory);
  const sourceFileAbsolutePaths = sourceMap.sources.map((s) => getNormalizedAbsolutePath(s, sourceRoot));
  const useCaseSensitiveFileNames = host.useCaseSensitiveFileNames();
  const sourceToSourceIndexMap = new Map<string, SourceIndex>();
  for (let i = 0; i < sourceFileAbsolutePaths.length; i++) {
    const path = sourceFileAbsolutePaths[i]!;
    sourceToSourceIndexMap.set(useCaseSensitiveFileNames ? path : path.toLowerCase(), i);
  }

  const decodedMappings: MappedPosition[] = [];
  const decoder = decodeMappings(sourceMap.mappings);
  for (const mapping of decoder.values()) {
    const genLineInfo = host.getECMALineInfo(generatedAbsoluteFilePath);
    const generatedPosition = computePositionOfLineAndUTF16Character(genLineInfo, mapping.generatedLine, mapping.generatedCharacter);
    let sourcePosition = missingPosition;
    if (isSourceMapping(mapping)) {
      const srcLineInfo = host.getECMALineInfo(sourceFileAbsolutePaths[mapping.sourceIndex]!);
      sourcePosition = computePositionOfLineAndUTF16Character(srcLineInfo, mapping.sourceLine, mapping.sourceCharacter);
    }
    decodedMappings.push({
      generatedPosition,
      sourceIndex: mapping.sourceIndex,
      sourcePosition,
      nameIndex: mapping.nameIndex,
    });
  }
  if (decoder.getError() !== undefined) {
    return new DocumentPositionMapper(
      useCaseSensitiveFileNames,
      sourceFileAbsolutePaths,
      sourceToSourceIndexMap,
      generatedAbsoluteFilePath,
      [],
      new Map(),
    );
  }

  const sourceMappings = new Map<SourceIndex, SourceMappedPosition[]>();
  for (const m of decodedMappings) {
    if (!isSourceMappedPosition(m)) continue;
    const list = sourceMappings.get(m.sourceIndex) ?? [];
    list.push({ ...m });
    sourceMappings.set(m.sourceIndex, list);
  }
  for (const [k, list] of sourceMappings.entries()) {
    list.sort((a, b) => a.sourcePosition - b.sourcePosition);
    sourceMappings.set(k, dedupeSorted(list, (a, b) =>
      a.generatedPosition === b.generatedPosition &&
      a.sourceIndex === b.sourceIndex &&
      a.sourcePosition === b.sourcePosition,
    ));
  }

  const generatedMappings = decodedMappings.slice().sort((a, b) => a.generatedPosition - b.generatedPosition);
  const deduped = dedupeSorted(generatedMappings, (a, b) =>
    a.generatedPosition === b.generatedPosition &&
    a.sourceIndex === b.sourceIndex &&
    a.sourcePosition === b.sourcePosition,
  );

  return new DocumentPositionMapper(
    useCaseSensitiveFileNames,
    sourceFileAbsolutePaths,
    sourceToSourceIndexMap,
    generatedAbsoluteFilePath,
    deduped,
    sourceMappings,
  );
}

function dedupeSorted<T>(arr: T[], eq: (a: T, b: T) => boolean): T[] {
  if (arr.length === 0) return arr;
  const out: T[] = [arr[0]!];
  for (let i = 1; i < arr.length; i++) {
    if (!eq(out[out.length - 1]!, arr[i]!)) out.push(arr[i]!);
  }
  return out;
}

export function getDocumentPositionMapper(host: Host, generatedFileName: string): DocumentPositionMapper | undefined {
  let mapFileName = tryGetSourceMappingURLFromHost(host, generatedFileName);
  if (mapFileName !== "") {
    const { base64Object, matched } = tryParseBase64Url(mapFileName);
    if (matched) {
      if (base64Object !== "") {
        try {
          const decoded = atob(base64Object);
          return convertDocumentToSourceMapper(host, decoded, generatedFileName);
        } catch {
          // fall through
        }
      }
      mapFileName = "";
    }
  }

  const possibleMapLocations: string[] = [];
  if (mapFileName !== "") possibleMapLocations.push(mapFileName);
  possibleMapLocations.push(generatedFileName + ".map");

  for (const location of possibleMapLocations) {
    const normalized = getNormalizedAbsolutePath(location, getDirectoryPath(generatedFileName));
    const result = host.readFile(normalized);
    if (result.ok) return convertDocumentToSourceMapper(host, result.contents, normalized);
  }
  return undefined;
}

function convertDocumentToSourceMapper(host: Host, contents: string, mapFileName: string): DocumentPositionMapper | undefined {
  const sourceMap = tryParseRawSourceMap(contents);
  if (sourceMap === undefined) return undefined;
  if (sourceMap.sources.length === 0 || sourceMap.file === "" || sourceMap.mappings === "") return undefined;
  if (sourceMap.sourcesContent !== undefined && sourceMap.sourcesContent.some((s) => s !== null)) return undefined;
  return createDocumentPositionMapper(host, sourceMap, mapFileName);
}

function tryParseRawSourceMap(contents: string): RawSourceMap | undefined {
  // Mirrors source_mapper.go: json.Unmarshal into a RawSourceMap struct.
  // A decode error (invalid JSON syntax, non-object top level, or a present
  // field whose JSON type is incompatible with the struct field) yields nil;
  // missing fields take Go's zero values. Then Version != 3 yields nil.
  let parsed: JsonValue;
  try {
    parsed = unmarshal(contents);
  } catch {
    return undefined;
  }
  if (!isJsonObject(parsed)) return undefined;

  const version = decodeNumberField(parsed, "version");
  if (version === undefined) return undefined;
  const file = decodeStringField(parsed, "file");
  if (file === undefined) return undefined;
  const sourceRoot = decodeStringField(parsed, "sourceRoot");
  if (sourceRoot === undefined) return undefined;
  const sources = decodeStringArrayField(parsed, "sources");
  if (sources === undefined) return undefined;
  const names = decodeStringArrayField(parsed, "names");
  if (names === undefined) return undefined;
  const mappings = decodeStringField(parsed, "mappings");
  if (mappings === undefined) return undefined;
  const sourcesContent = decodeNullableStringArrayField(parsed, "sourcesContent");
  if (sourcesContent === undefined) return undefined;

  if (version !== 3) return undefined;
  const base: RawSourceMap = { version: 3, file, sourceRoot, sources, names, mappings };
  if (sourcesContent.length === 0) return base;
  return { ...base, sourcesContent };
}

// json.Unmarshal field decoders: an absent field takes Go's zero value; a
// present field of an incompatible JSON type is a decode error (undefined).
function decodeStringField(obj: { readonly [key: string]: JsonValue }, key: string): string | undefined {
  const v = obj[key];
  if (v === undefined || v === null) return "";
  if (typeof v !== "string") return undefined;
  return v;
}

function decodeNumberField(obj: { readonly [key: string]: JsonValue }, key: string): number | undefined {
  const v = obj[key];
  if (v === undefined || v === null) return 0;
  if (typeof v !== "number") return undefined;
  return v;
}

function decodeStringArrayField(obj: { readonly [key: string]: JsonValue }, key: string): readonly string[] | undefined {
  const v = obj[key];
  if (v === undefined || v === null) return [];
  if (!isJsonArray(v)) return undefined;
  const out: string[] = [];
  for (const item of v) {
    if (typeof item !== "string") return undefined;
    out.push(item);
  }
  return out;
}

function decodeNullableStringArrayField(
  obj: { readonly [key: string]: JsonValue },
  key: string,
): readonly (string | null)[] | undefined {
  const v = obj[key];
  if (v === undefined || v === null) return [];
  if (!isJsonArray(v)) return undefined;
  const out: (string | null)[] = [];
  for (const item of v) {
    if (item === null) {
      out.push(null);
      continue;
    }
    if (typeof item !== "string") return undefined;
    out.push(item);
  }
  return out;
}

function tryGetSourceMappingURLFromHost(host: Host, fileName: string): string {
  const lineInfo = host.getECMALineInfo(fileName);
  return tryGetSourceMappingURL(lineInfo);
}

// TS-Go returns `(parseableUrl string, isBase64Url bool)`; modeled as a named
// pair so the signature carries no inline brace.
interface ParseBase64UrlResult {
  readonly base64Object: string;
  readonly matched: boolean;
}

// Equivalent to /^data:(?:application\/json;(?:charset=[uU][tT][fF]-8;)?base64,([A-Za-z0-9+/=]+)$)?/
function tryParseBase64Url(url: string): ParseBase64UrlResult {
  if (!url.startsWith("data:")) return { base64Object: "", matched: false };
  let rest = url.slice(5);
  if (!rest.startsWith("application/json;")) return { base64Object: "", matched: true };
  rest = rest.slice("application/json;".length);
  if (rest.startsWith("charset=")) {
    const lower = rest.slice("charset=".length).toLowerCase();
    if (!lower.startsWith("utf-8;")) return { base64Object: "", matched: true };
    rest = rest.slice("charset=".length + "utf-8;".length);
  }
  if (!rest.startsWith("base64,")) return { base64Object: "", matched: true };
  rest = rest.slice("base64,".length);
  for (const ch of rest) {
    const code = ch.charCodeAt(0);
    const isLetter = (code >= 0x41 && code <= 0x5a) || (code >= 0x61 && code <= 0x7a);
    const isDigit = code >= 0x30 && code <= 0x39;
    if (!isLetter && !isDigit && ch !== "+" && ch !== "/" && ch !== "=") {
      return { base64Object: "", matched: true };
    }
  }
  return { base64Object: rest, matched: true };
}
