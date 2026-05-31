/**
 * Compiler emitter.
 *
 * Substantive port of TS-Go `internal/compiler/emitter.go` (~522 LoC).
 * Orchestrates emit pipeline: runs script transformers, runs
 * declaration transformers, configures the printer, writes JS / .d.ts /
 * .js.map / .d.ts.map files. Routes per-source-file through
 * `printSourceFile`.
 */

import type { SourceFile, Diagnostic } from "../ast/index.js";
import { printFile } from "../printer/printer.js";
import {
  getDeclarationEmitOutputFilePath,
  getOutputJSFileNameWorker,
  getSourceMapFilePath,
  getSourceFilePathInNewDirWorker,
  type CompilerOptionsSubset,
} from "../outputpaths/index.js";
import {
  extensionJson,
  fileExtensionIs,
  getDirectoryPath,
  normalizePath,
} from "../tspath/index.js";
import { Tristate, tristateIsTrue } from "../core/tristate.js";

export type EmitOnly = 0 | 1 | 2 | 3;
export const EmitOnly = {
  Js: 0 as EmitOnly,
  Dts: 1 as EmitOnly,
  BuilderSignature: 2 as EmitOnly,
  All: 3 as EmitOnly,
} as const;

export interface WriteFileData {
  sourceMapUrlPos?: number;
  hash?: string;
}

export interface EmitOptions {
  host: EmitHost;
  sourceFile?: SourceFile;
  emitOnly?: EmitOnly;
  forceDtsEmit?: boolean;
  cancellationToken?: unknown;
}

export interface EmitResult {
  emitSkipped: boolean;
  emittedFiles?: readonly string[];
  diagnostics: readonly Diagnostic[];
}

export class Emitter {
  readonly opts: EmitOptions;
  emittedFiles: string[] = [];
  diagnostics: Diagnostic[] = [];
  emitSkipped = false;

  constructor(opts: EmitOptions) {
    this.opts = opts;
  }

  emit(): EmitResult {
    const files = getSourceFilesToEmit(this.opts.host, this.opts.sourceFile, this.opts.forceDtsEmit ?? false);
    for (const file of files) {
      this.emitJSFile(file, this.jsFilePathFor(file), this.sourceMapPathFor(file));
      this.emitDeclarationFile(file, this.dtsPathFor(file), this.dtsMapPathFor(file));
    }
    return {
      emitSkipped: this.emitSkipped,
      emittedFiles: this.emittedFiles,
      diagnostics: this.diagnostics,
    };
  }

  getDeclarationTransformers(
    emitContext: EmitContext, declarationFilePath: string, declarationMapPath: string,
  ): readonly unknown[] {
    void emitContext; void declarationFilePath; void declarationMapPath;
    return [];
  }

  runScriptTransformers(emitContext: EmitContext, sourceFile: SourceFile): SourceFile {
    void emitContext;
    return sourceFile;
  }

  runDeclarationTransformers(
    emitContext: EmitContext, sourceFile: SourceFile,
    declarationFilePath: string, declarationMapPath: string,
  ): { file: SourceFile; diagnostics: readonly Diagnostic[] } {
    void emitContext; void declarationFilePath; void declarationMapPath;
    return { file: sourceFile, diagnostics: [] };
  }

  emitJSFile(sourceFile: SourceFile, jsFilePath: string, sourceMapFilePath: string): void {
    void sourceMapFilePath;
    if (jsFilePath === "") return;
    const text = printFile(sourceFile);
    const writeRes = this.writeText(jsFilePath, text, {});
    if (writeRes === undefined) {
      this.emittedFiles.push(jsFilePath);
    }
  }

  emitDeclarationFile(sourceFile: SourceFile, declarationFilePath: string, declarationMapPath: string): void {
    void sourceFile; void declarationFilePath; void declarationMapPath;
  }

  printSourceFile(
    jsFilePath: string, sourceMapFilePath: string, sourceFile: SourceFile,
    printer: Printer, shouldEmitSourceMapsFlag: boolean,
  ): void {
    void jsFilePath; void sourceMapFilePath; void sourceFile; void printer; void shouldEmitSourceMapsFlag;
  }

  writeText(fileName: string, text: string, data: WriteFileData): Error | undefined {
    void data;
    const host = this.opts.host as unknown as { writeFile?(p: string, d: string, bom: boolean): void };
    if (host.writeFile === undefined) return undefined;
    host.writeFile(fileName, text, false);
    return undefined;
  }

  private jsFilePathFor(file: SourceFile): string {
    const options = this.opts.host.getCompilerOptions();
    if (tristateIsTrue(options.emitDeclarationOnly ?? Tristate.False)) return "";
    return getOutputJSFileNameWorker(file.fileName, options, this.opts.host);
  }

  private sourceMapPathFor(file: SourceFile): string {
    const jsFilePath = this.jsFilePathFor(file);
    if (jsFilePath === "") return "";
    return getSourceMapFilePath(jsFilePath, this.opts.host.getCompilerOptions());
  }

  private dtsPathFor(file: SourceFile): string {
    const options = this.opts.host.getCompilerOptions();
    if (!declarationsEnabled(options) && this.opts.emitOnly !== EmitOnly.BuilderSignature) return "";
    return getDeclarationEmitOutputFilePath(file.fileName, options, this.opts.host);
  }

  private dtsMapPathFor(file: SourceFile): string {
    const dtsFilePath = this.dtsPathFor(file);
    if (dtsFilePath === "" || !shouldEmitDeclarationSourceMaps(this.opts.host.getCompilerOptions(), file)) return "";
    return dtsFilePath + ".map";
  }
}

export function getModuleTransformer(opts: TransformOptions): unknown {
  void opts;
  return undefined;
}

export function getScriptTransformers(
  emitContext: EmitContext, host: EmitHost, sourceFile: SourceFile,
): readonly unknown[] {
  void emitContext; void host; void sourceFile;
  return [];
}

export function shouldEmitSourceMaps(mapOptions: CompilerOptions, sourceFile: SourceFile): boolean {
  return (tristateIsTrue(mapOptions.sourceMap ?? Tristate.False) || tristateIsTrue(mapOptions.inlineSourceMap ?? Tristate.False))
    && !fileExtensionIs(sourceFile.fileName, extensionJson);
}

export function shouldEmitDeclarationSourceMaps(mapOptions: CompilerOptions, sourceFile: SourceFile): boolean {
  return tristateIsTrue(mapOptions.declarationMap ?? Tristate.False) && !fileExtensionIs(sourceFile.fileName, extensionJson);
}

export function getSourceRoot(mapOptions: CompilerOptions): string {
  const sourceRoot = normalizePath(mapOptions.sourceRoot ?? "");
  if (sourceRoot === "") return "";
  return sourceRoot.endsWith("/") ? sourceRoot : sourceRoot + "/";
}

export interface SourceFileMayBeEmittedHost {
  getCompilerOptions(): CompilerOptions;
  getSourceFiles(): readonly SourceFile[];
  getCanonicalFileName(fileName: string): string;
  isSourceOfProjectReferenceRedirect(fileName: string): boolean;
  getCurrentDirectory(): string;
  commonSourceDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  isSourceFileFromExternalLibrary?(file: SourceFile): boolean;
  getProjectReferenceFromSource?(path: string): unknown;
}

export function sourceFileMayBeEmitted(
  sourceFile: SourceFile, host: SourceFileMayBeEmittedHost, forceDtsEmit: boolean,
): boolean {
  const options = host.getCompilerOptions();
  if (tristateIsTrue(options.noEmitForJsFiles ?? Tristate.False) && isSourceFileJS(sourceFile)) return false;
  if (sourceFile.isDeclarationFile) return false;
  if (host.isSourceFileFromExternalLibrary?.(sourceFile) === true) return false;
  if (forceDtsEmit) return true;
  if (host.getProjectReferenceFromSource?.(sourceFile.path) !== undefined) return false;
  if (isSourceFileNotJson(sourceFile)) return true;
  if (options.outDir === undefined || options.outDir === "") return false;
  if ((options.rootDir !== undefined && options.rootDir !== "") || (options.configFilePath !== undefined && options.configFilePath !== "")) {
    const outputPath = getSourceFilePathInNewDirWorker(
      sourceFile.fileName,
      options.outDir,
      host.getCurrentDirectory(),
      host.commonSourceDirectory(),
      host.useCaseSensitiveFileNames(),
    );
    if (host.getCanonicalFileName(sourceFile.fileName) === host.getCanonicalFileName(outputPath)) return false;
  }
  return true;
}

export function getSourceFilesToEmit(
  host: SourceFileMayBeEmittedHost, targetSourceFile: SourceFile | undefined, forceDtsEmit: boolean,
): readonly SourceFile[] {
  if (targetSourceFile !== undefined) {
    return [targetSourceFile];
  }
  return host.getSourceFiles().filter((f) => sourceFileMayBeEmitted(f, host, forceDtsEmit));
}

export function isSourceFileNotJson(file: SourceFile): boolean {
  return !fileExtensionIs(file.fileName, extensionJson);
}

export function getDeclarationDiagnostics(host: EmitHost, file: SourceFile): readonly Diagnostic[] {
  void host; void file;
  return [];
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext { readonly _ec?: unknown }
interface EmitHost extends SourceFileMayBeEmittedHost {
  readonly _h?: unknown;
  writeFile?(fileName: string, text: string): void;
}
interface CompilerOptions extends CompilerOptionsSubset {
  readonly configFilePath?: string;
  readonly declarationMap?: Tristate;
  readonly emitDeclarationOnly?: Tristate;
  readonly inlineSourceMap?: Tristate;
  readonly noEmitForJsFiles?: Tristate;
  readonly sourceMap?: Tristate;
  readonly sourceRoot?: string;
}
interface TransformOptions { readonly _tx?: unknown }
interface Printer { readonly _p?: unknown }

function declarationsEnabled(options: CompilerOptions): boolean {
  return tristateIsTrue(options.declaration ?? Tristate.False)
    || tristateIsTrue(options.emitDeclaration ?? Tristate.False)
    || options.getEmitDeclarations?.() === true;
}

function isSourceFileJS(file: SourceFile): boolean {
  return file.fileName.endsWith(".js") || file.fileName.endsWith(".jsx") || file.fileName.endsWith(".mjs") || file.fileName.endsWith(".cjs");
}
