import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import { changeTsExtension, harnessNewLine, noContent, removeTestPathPrefixes } from "./util.js";
import type { SourceMapRecord } from "./sourceMapRecordBaseline.js";

export interface SourceMapBaselineCompilerOptions {
  readonly sourceMap?: boolean | number;
  readonly inlineSourceMap?: boolean | number;
  readonly declarationMap?: boolean | number;
  readonly noEmitOnError?: boolean | number;
}

export interface SourceMapBaselineFile {
  readonly name: string;
  readonly content: string;
}

export interface SourceMapBaselineResult {
  readonly maps: readonly SourceMapBaselineFile[];
  readonly outputs: readonly SourceMapBaselineFile[];
  readonly inputs: readonly SourceMapBaselineFile[];
  readonly diagnostics?: readonly unknown[];
}

export interface SourceMapHarnessSettings {
  readonly fullEmitPaths?: boolean;
}

export interface SourceMapBaselineInput {
  readonly baselinePath: string;
  readonly header: string;
  readonly compilerOptions: SourceMapBaselineCompilerOptions;
  readonly result: SourceMapBaselineResult;
  readonly harnessSettings?: SourceMapHarnessSettings;
  readonly options: BaselineOptions;
}

export function doSourceMapBaseline(
  baselinePath: string,
  records: readonly SourceMapRecord[],
  options: BaselineOptions,
): BaselineResult {
  const actual = records.length === 0
    ? noContent
    : records.map(record => `//// [${record.generated}.map]${harnessNewLine}${record.sourceMap}`).join(`${harnessNewLine}${harnessNewLine}`);
  return compareToBaseline(changeTsExtension(baselinePath, ".sourcemap.txt"), actual, options);
}

export function doSourceMapBaselineFromResult(input: SourceMapBaselineInput): BaselineResult | undefined {
  const options = input.compilerOptions;
  const declarationMaps = optionIsTrue(options.declarationMap);
  if (optionIsTrue(options.inlineSourceMap)) {
    if (input.result.maps.length > 0 && !declarationMaps) {
      throw new Error("No sourcemap files should be generated if inlineSourceMap was set.");
    }
    return undefined;
  }
  if (!optionIsTrue(options.sourceMap) && !declarationMaps) return undefined;

  const expectedMapCount = getExpectedSourceMapCount(input.result, options);
  if (input.result.maps.length !== expectedMapCount) {
    throw new Error("Number of sourcemap files should be same as js files.");
  }

  const sourceMapCode = optionIsTrue(options.noEmitOnError) && (input.result.diagnostics?.length ?? 0) !== 0 || input.result.maps.length === 0
    ? noContent
    : sourceMapOutput(input.result, input.harnessSettings);
  const baselinePath = sourceMapBaselinePath(input.baselinePath);
  return compareToBaseline(baselinePath, sourceMapCode, input.options);
}

export function sourceMapOutput(result: SourceMapBaselineResult, settings: SourceMapHarnessSettings = {}): string {
  const output: string[] = [];
  for (const sourceMap of result.maps) {
    output.push(sourceMapFileOutput(sourceMap, settings) + createSourceMapPreviewLink(sourceMap, result));
  }
  return output.join(harnessNewLine);
}

export function normalizeSourceMapText(text: string): string {
  return text.replace(/"sources":\s*\[[^\]]*\]/g, '"sources":[]')
    .replace(/"file":\s*"[^"]*"/g, '"file":""');
}

export function createSourceMapPreviewLink(sourceMap: SourceMapBaselineFile, result: SourceMapBaselineResult): string {
  const raw = parseRawSourceMap(sourceMap.content);
  if (raw === undefined) return "";
  const outputFile = result.outputs.find(output => output.name.endsWith(raw.file));
  if (outputFile === undefined) return "";
  const sourceFiles = raw.sources.map(source => result.inputs.find(input => input.name.endsWith(source)));
  if (sourceFiles.some(source => source === undefined)) return "";
  const chunks = [
    outputFile.content,
    sourceMap.content,
    ...sourceFiles.map(source => source!.content),
  ].map(base64EncodeChunk);
  return `${harnessNewLine}//// https://sokra.github.io/source-map-visualization#base64,${chunks.join(",")}${harnessNewLine}`;
}

function getExpectedSourceMapCount(result: SourceMapBaselineResult, options: SourceMapBaselineCompilerOptions): number {
  let expected = 0;
  if (optionIsTrue(options.sourceMap)) expected += result.outputs.filter(output => !output.name.endsWith(".json")).length;
  if (optionIsTrue(options.declarationMap)) expected += result.outputs.length;
  return expected;
}

function sourceMapFileOutput(file: SourceMapBaselineFile, settings: SourceMapHarnessSettings): string {
  const fileName = settings.fullEmitPaths === true ? removeTestPathPrefixes(file.name, false) : baseFileName(file.name);
  return `//// [${fileName}]${harnessNewLine}${file.content}`;
}

function sourceMapBaselinePath(baselinePath: string): string {
  if (baselinePath.endsWith(".tsx")) return baselinePath.slice(0, -4) + ".js.map";
  if (baselinePath.endsWith(".ts")) return baselinePath.slice(0, -3) + ".js.map";
  return changeTsExtension(baselinePath, ".sourcemap.txt");
}

interface RawSourceMapForPreview {
  readonly file: string;
  readonly sources: readonly string[];
}

function parseRawSourceMap(content: string): RawSourceMapForPreview | undefined {
  const parsed = JSON.parse(content) as unknown;
  if (parsed === null || typeof parsed !== "object") return undefined;
  const record = parsed as Record<string, unknown>;
  if (typeof record.file !== "string" || !Array.isArray(record.sources)) return undefined;
  if (!record.sources.every(source => typeof source === "string")) return undefined;
  return { file: record.file, sources: record.sources as readonly string[] };
}

function base64EncodeChunk(text: string): string {
  return Buffer.from(decodeURIComponent(encodeURIComponent(text)), "utf8").toString("base64");
}

function optionIsTrue(value: boolean | number | undefined): boolean {
  return value === true || value === 2;
}

function baseFileName(fileName: string): string {
  const normalized = fileName.replaceAll("\\", "/");
  const slash = normalized.lastIndexOf("/");
  return slash === -1 ? normalized : normalized.slice(slash + 1);
}
