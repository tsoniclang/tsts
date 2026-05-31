import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline, diffText } from "../baseline/baseline.js";
import type { NamedSource } from "../harnessutil/harnessutil.js";
import { changeTsExtension, fileHeader, harnessNewLine, noContent, removeTestPathPrefixes } from "./util.js";
import { getErrorBaseline, type BaselineDiagnostic } from "./errorBaseline.js";

export interface EmitBaselineFile {
  readonly name: string;
  readonly content: string;
}

export interface EmitBaselineResult {
  readonly js: readonly EmitBaselineFile[];
  readonly dts?: readonly EmitBaselineFile[];
  readonly maps?: readonly EmitBaselineFile[];
  readonly diagnostics?: readonly BaselineDiagnostic[];
  readonly noCheck?: EmitBaselineResult;
}

export interface HarnessOptions {
  readonly fullEmitPaths?: boolean;
  readonly currentDirectory?: string;
}

export interface JSEmitBaselineInput {
  readonly baselinePath: string;
  readonly header: string;
  readonly result: EmitBaselineResult;
  readonly compilerOptions?: JSEmitBaselineCompilerOptions;
  readonly tsConfigFiles?: readonly NamedSource[];
  readonly toBeCompiled: readonly NamedSource[];
  readonly otherFiles?: readonly NamedSource[];
  readonly harnessSettings?: HarnessOptions;
  readonly options: BaselineOptions;
}

export interface JSEmitBaselineCompilerOptions {
  readonly noEmit?: boolean | number;
  readonly emitDeclarationOnly?: boolean | number;
  readonly noCheck?: boolean | number;
  readonly declaration?: boolean | number;
  readonly composite?: boolean | number;
  readonly noEmitOnError?: boolean | number;
}

export function doJSEmitBaseline(input: JSEmitBaselineInput): BaselineResult {
  assertExpectedEmitShape(input);
  const diagnostics = input.result.diagnostics ?? [];
  const emitted = [...input.result.js, ...(input.result.dts ?? [])];
  const actual = emitted.length === 0 && diagnostics.length === 0
    ? noContent
    : buildJSEmitBaseline(input, diagnostics);
  const baselinePath = changeTsExtension(input.baselinePath, ".js");
  return compareToBaseline(baselinePath, actual, input.options);
}

export function buildJSEmitBaseline(input: JSEmitBaselineInput, diagnostics: readonly BaselineDiagnostic[] = input.result.diagnostics ?? []): string {
  const tsSources = [...(input.otherFiles ?? []), ...input.toBeCompiled];
  const sections: string[] = [];
  sections.push(`//// [${input.header}] ////`);
  sections.push(tsSources.map(file => `${fileHeader(file.name)}${harnessNewLine}${file.content}`).join(`${harnessNewLine}${harnessNewLine}`));
  const emitted: string[] = [];
  for (const file of input.result.js) emitted.push(fileOutput(file, input.harnessSettings));
  for (const file of input.result.dts ?? []) emitted.push(fileOutput(file, input.harnessSettings));
  if (diagnostics.length > 0) {
    emitted.push("//// [Diagnostics]");
    emitted.push(getErrorBaseline([...(input.tsConfigFiles ?? []), ...tsSources], diagnostics, false));
  }
  if (input.result.noCheck !== undefined && !optionIsTrue(input.compilerOptions?.noCheck) && !optionIsTrue(input.compilerOptions?.noEmit)) {
    const noCheckComparison = compareNoCheckEmit(input.result, input.result.noCheck, input.harnessSettings);
    if (noCheckComparison.length > 0) emitted.push(noCheckComparison);
  }
  if (emitted.length > 0) sections.push(emitted.join(`${harnessNewLine}${harnessNewLine}`));
  return sections.filter(section => section.length > 0).join(`${harnessNewLine}${harnessNewLine}`);
}

export function fileOutput(file: EmitBaselineFile, settings: HarnessOptions = {}): string {
  const fileName = settings.fullEmitPaths === true
    ? removeTestPathPrefixes(file.name, false)
    : baseFileName(file.name);
  return `//// [${fileName}]${harnessNewLine}${file.content}`;
}

export interface DeclarationCompilationContext {
  readonly inputFiles: readonly NamedSource[];
  readonly otherFiles: readonly NamedSource[];
  readonly emittedDeclarations: readonly EmitBaselineFile[];
  readonly currentDirectory: string;
}

export function prepareDeclarationCompilationContext(input: JSEmitBaselineInput): DeclarationCompilationContext | undefined {
  const dts = input.result.dts ?? [];
  if (dts.length === 0) return undefined;
  if (input.compilerOptions !== undefined && optionIsTrue(input.compilerOptions.declaration) && (input.result.diagnostics?.length ?? 0) === 0) {
    if (optionIsTrue(input.compilerOptions.emitDeclarationOnly)) {
      if (input.result.js.length > 0 || (dts.length === 0 && !optionIsTrue(input.compilerOptions.noEmit))) {
        throw new Error("Only declaration files should be generated when emitDeclarationOnly is true.");
      }
    } else if (dts.length !== input.result.js.filter(file => !file.name.endsWith(".json")).length) {
      throw new Error("Declaration output count must match emitted JavaScript file count when declaration emit succeeds.");
    }
  }
  return {
    inputFiles: input.toBeCompiled,
    otherFiles: input.otherFiles ?? [],
    emittedDeclarations: dts,
    currentDirectory: input.harnessSettings?.currentDirectory ?? "",
  };
}

export function declarationFileInputs(context: DeclarationCompilationContext): readonly NamedSource[] {
  const byName = new Map<string, NamedSource>();
  for (const file of context.inputFiles) byName.set(file.name, file);
  for (const file of context.otherFiles) byName.set(file.name, file);
  for (const file of context.emittedDeclarations) byName.set(file.name, { name: file.name, content: file.content });
  return [...byName.values()].sort((left, right) => left.name.localeCompare(right.name));
}

export function compareNoCheckEmit(
  original: EmitBaselineResult,
  noCheck: EmitBaselineResult,
  settings: HarnessOptions = {},
): string {
  const sections: string[] = [];
  compareResultFileSets(sections, noCheck.dts ?? [], original.dts ?? [], settings);
  compareResultFileSets(sections, noCheck.js, original.js, settings);
  return sections.join(`${harnessNewLine}${harnessNewLine}`);
}

function compareResultFileSets(
  output: string[],
  noCheckFiles: readonly EmitBaselineFile[],
  originalFiles: readonly EmitBaselineFile[],
  settings: HarnessOptions,
): void {
  const originalByName = new Map(originalFiles.map(file => [file.name, file]));
  for (const file of noCheckFiles) {
    const original = originalByName.get(file.name);
    const displayName = settings.fullEmitPaths === true ? removeTestPathPrefixes(file.name, false) : baseFileName(file.name);
    if (original === undefined) {
      output.push(`!!!! File ${removeTestPathPrefixes(file.name, false)} missing from original emit, but present in noCheck emit${harnessNewLine}${fileOutput(file, settings)}`);
    } else if (original.content !== file.content) {
      output.push([
        `!!!! File ${removeTestPathPrefixes(file.name, false)} differs from original emit in noCheck emit`,
        `//// [${displayName}]`,
        diffText("Expected\tThe full check baseline", "Actual\twith noCheck set", original.content, file.content),
      ].join(harnessNewLine));
    }
  }
}

function assertExpectedEmitShape(input: JSEmitBaselineInput): void {
  const options = input.compilerOptions;
  if (options === undefined) return;
  if (!optionIsTrue(options.noEmit) && !optionIsTrue(options.emitDeclarationOnly)
    && input.result.js.length === 0 && (input.result.diagnostics?.length ?? 0) === 0) {
    throw new Error("Expected at least one js file to be emitted or at least one error to be created.");
  }
}

function baseFileName(fileName: string): string {
  const normalized = fileName.replaceAll("\\", "/");
  const index = normalized.lastIndexOf("/");
  return index === -1 ? normalized : normalized.slice(index + 1);
}

function optionIsTrue(value: boolean | number | undefined): boolean {
  return value === true || value === 2;
}
