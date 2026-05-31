import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline } from "../baseline/baseline.js";
import type { NamedSource } from "../harnessutil/harnessutil.js";
import { changeTsExtension, fileHeader, harnessNewLine, noContent, removeTestPathPrefixes } from "./util.js";
import { getErrorBaseline, type BaselineDiagnostic } from "./error_baseline.js";

export interface EmitBaselineFile {
  readonly name: string;
  readonly content: string;
}

export interface EmitBaselineResult {
  readonly js: readonly EmitBaselineFile[];
  readonly dts?: readonly EmitBaselineFile[];
  readonly diagnostics?: readonly BaselineDiagnostic[];
}

export interface HarnessOptions {
  readonly fullEmitPaths?: boolean;
  readonly currentDirectory?: string;
}

export interface JSEmitBaselineInput {
  readonly baselinePath: string;
  readonly header: string;
  readonly result: EmitBaselineResult;
  readonly tsConfigFiles?: readonly NamedSource[];
  readonly toBeCompiled: readonly NamedSource[];
  readonly otherFiles?: readonly NamedSource[];
  readonly harnessSettings?: HarnessOptions;
  readonly options: BaselineOptions;
}

export function doJSEmitBaseline(input: JSEmitBaselineInput): BaselineResult {
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

function baseFileName(fileName: string): string {
  const normalized = fileName.replaceAll("\\", "/");
  const index = normalized.lastIndexOf("/");
  return index === -1 ? normalized : normalized.slice(index + 1);
}
