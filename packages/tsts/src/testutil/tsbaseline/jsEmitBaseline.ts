import type { BaselineOptions, BaselineResult } from "../baseline/baseline.js";
import { compareToBaseline, diffText } from "../baseline/baseline.js";
import type { NamedSource } from "../harnessutil/harnessutil.js";
import { changeTsExtension, harnessNewLine, noContent, removeTestPathPrefixes } from "./util.js";
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
  // Faithful port of TS-Go `DoJSEmitBaseline` (internal/testutil/tsbaseline/
  // js_emit_baseline.go). The `.js` output baseline has two regions:
  //
  //   1. The TypeScript source region (`tsCode`). It opens with the portable
  //      corpus path header `//// [<header>] ////`, a blank line, then one
  //      per-file section. Each per-file section is `//// [<basename>]` (the
  //      base file name only — NO virtual `/.src/` mount prefix and NO trailing
  //      ` ////`) followed by the verbatim source. Source sections are joined by
  //      a single newline (not a blank line).
  //   2. The emitted region (`jsCode`): the `.js` files then the `.d.ts` files,
  //      each via `fileOutput`. JS files are separated by exactly one newline
  //      (mirroring TS-Go's "append `\r\n` only when the buffer does not already
  //      end in a newline"); the `.d.ts` block is preceded by a blank line.
  //
  // `tsCode` and `jsCode` are joined by a blank line. This structure is the
  // source of truth; it is never reformatted by diff normalization.
  const tsSources = [...(input.otherFiles ?? []), ...input.toBeCompiled];
  const tsCode = `//// [${input.header}] ////${harnessNewLine}${harnessNewLine}`
    + tsSources
      .map(file => `//// [${baseFileName(file.name)}]${harnessNewLine}${file.content}`)
      .join(harnessNewLine);

  let jsCode = "";
  for (const file of input.result.js) {
    if (jsCode.length > 0 && !jsCode.endsWith("\n")) jsCode += harnessNewLine;
    jsCode += fileOutput(file, input.harnessSettings);
  }
  const dts = input.result.dts ?? [];
  if (dts.length > 0) {
    jsCode += `${harnessNewLine}${harnessNewLine}`;
    for (const file of dts) jsCode += fileOutput(file, input.harnessSettings);
  }
  if (diagnostics.length > 0) {
    if (jsCode.length > 0 && !jsCode.endsWith("\n")) jsCode += harnessNewLine;
    jsCode += `//// [Diagnostics]${harnessNewLine}`;
    jsCode += getErrorBaseline([...(input.tsConfigFiles ?? []), ...tsSources], diagnostics, false);
  }
  if (input.result.noCheck !== undefined && !optionIsTrue(input.compilerOptions?.noCheck) && !optionIsTrue(input.compilerOptions?.noEmit)) {
    const noCheckComparison = compareNoCheckEmit(input.result, input.result.noCheck, input.harnessSettings);
    if (noCheckComparison.length > 0) {
      if (jsCode.length > 0 && !jsCode.endsWith("\n")) jsCode += harnessNewLine;
      jsCode += noCheckComparison;
    }
  }

  return jsCode.length > 0 ? `${tsCode}${harnessNewLine}${harnessNewLine}${jsCode}` : tsCode;
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
  readonly compilerOptions?: JSEmitBaselineCompilerOptions;
  readonly configFile?: unknown;
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
  const context: DeclarationCompilationContext = {
    inputFiles: input.toBeCompiled,
    otherFiles: input.otherFiles ?? [],
    emittedDeclarations: dts,
    currentDirectory: input.harnessSettings?.currentDirectory ?? "",
  };
  return input.compilerOptions === undefined ? context : { ...context, compilerOptions: input.compilerOptions };
}

export function declarationFileInputs(context: DeclarationCompilationContext): readonly NamedSource[] {
  const byName = new Map<string, NamedSource>();
  for (const file of context.inputFiles) byName.set(file.name, file);
  for (const file of context.otherFiles) byName.set(file.name, file);
  for (const file of context.emittedDeclarations) byName.set(file.name, { name: file.name, content: file.content });
  return [...byName.values()].sort((left, right) => left.name.localeCompare(right.name));
}

export interface DeclarationCompilationResult<TCompilationResult = unknown> {
  readonly declInputFiles: readonly NamedSource[];
  readonly declOtherFiles: readonly NamedSource[];
  readonly declResult: TCompilationResult;
}

export interface DeclarationCompiler<TCompilationResult = unknown> {
  compileDeclarationFiles(
    inputFiles: readonly NamedSource[],
    otherFiles: readonly NamedSource[],
    context: DeclarationCompilationContext,
    symlinks: ReadonlyMap<string, string>,
  ): TCompilationResult;
}

export function compileDeclarationFiles<TCompilationResult>(
  context: DeclarationCompilationContext | undefined,
  symlinks: ReadonlyMap<string, string>,
  compiler: DeclarationCompiler<TCompilationResult>,
): DeclarationCompilationResult<TCompilationResult> | undefined {
  if (context === undefined) return undefined;
  const declInputFiles = declarationInputFiles(context);
  const declOtherFiles = declarationOtherFiles(context, declInputFiles);
  const declResult = compiler.compileDeclarationFiles(declInputFiles, declOtherFiles, context, symlinks);
  return { declInputFiles, declOtherFiles, declResult };
}

export function declarationInputFiles(context: DeclarationCompilationContext): readonly NamedSource[] {
  const inputNames = new Set(context.inputFiles.map(file => normalizedName(file.name)));
  return context.emittedDeclarations
    .filter(file => inputNames.has(sourceNameForDeclaration(file.name)))
    .map(file => ({ name: file.name, content: stripBom(file.content) }))
    .sort(compareSources);
}

export function declarationOtherFiles(
  context: DeclarationCompilationContext,
  declarationInputs: readonly NamedSource[] = declarationInputFiles(context),
): readonly NamedSource[] {
  const inputNames = new Set(declarationInputs.map(file => normalizedName(file.name)));
  const sourceNames = new Set(context.inputFiles.map(file => normalizedName(file.name)));
  return context.emittedDeclarations
    .filter(file => !inputNames.has(normalizedName(file.name)) && !sourceNames.has(sourceNameForDeclaration(file.name)))
    .map(file => ({ name: file.name, content: stripBom(file.content) }))
    .sort(compareSources);
}

export function sourceNameForDeclaration(fileName: string): string {
  const normalized = normalizedName(fileName);
  if (normalized.endsWith(".d.mts")) return `${normalized.slice(0, -".d.mts".length)}.mts`;
  if (normalized.endsWith(".d.cts")) return `${normalized.slice(0, -".d.cts".length)}.cts`;
  if (normalized.endsWith(".d.ts")) return `${normalized.slice(0, -".d.ts".length)}.ts`;
  return normalized;
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

function normalizedName(fileName: string): string {
  return fileName.replaceAll("\\", "/");
}

function stripBom(text: string): string {
  return text.startsWith("\uFEFF") ? text.slice(1) : text;
}

function compareSources(left: NamedSource, right: NamedSource): number {
  return normalizedName(left.name).localeCompare(normalizedName(right.name));
}
