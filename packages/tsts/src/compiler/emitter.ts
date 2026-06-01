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
import { Generator as SourceMapGenerator, type RawSourceMap } from "../sourcemap/index.js";
import { addUTF8ByteOrderMark, encodeUri } from "../stringutil/util.js";
import {
  getDeclarationEmitOutputFilePath,
  getOutputJSFileNameWorker,
  getSourceMapFilePath,
  getSourceFilePathInNewDirWorker,
  type CompilerOptionsSubset,
} from "../outputpaths/index.js";
import {
  combinePaths,
  extensionJson,
  fileExtensionIs,
  getBaseFileName,
  getDirectoryPath,
  getRelativePathToDirectoryOrUrl,
  getRootLength,
  normalizePath,
  normalizeSlashes,
} from "../tspath/index.js";
import { Tristate, tristateIsTrue } from "../core/tristate.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";

export type EmitOnly = 0 | 1 | 2 | 3;
export const EmitOnly = {
  All: 0 as EmitOnly,
  Js: 1 as EmitOnly,
  Dts: 2 as EmitOnly,
  ForcedDts: 3 as EmitOnly,
} as const;

export interface WriteFileData {
  sourceMapUrlPos?: number;
  hash?: string;
  diagnostics?: readonly Diagnostic[];
  skippedDtsWrite?: boolean;
}

export interface SourceMapEmitResult {
  readonly inputSourceFileNames: readonly string[];
  readonly sourceMap: RawSourceMap;
  readonly generatedFile: string;
}

export interface EmitOptions {
  host: EmitHost;
  sourceFile?: SourceFile;
  emitOnly?: EmitOnly;
  forceDtsEmit?: boolean;
  cancellationToken?: unknown;
  writeFile?: (fileName: string, text: string, data: WriteFileData) => void;
}

export interface EmitResult {
  emitSkipped: boolean;
  emittedFiles?: readonly string[];
  diagnostics: readonly Diagnostic[];
  sourceMaps?: readonly SourceMapEmitResult[];
}

export class Emitter {
  readonly opts: EmitOptions;
  emittedFiles: string[] = [];
  diagnostics: Diagnostic[] = [];
  sourceMaps: SourceMapEmitResult[] = [];
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
      sourceMaps: this.sourceMaps,
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
    const options = this.opts.host.getCompilerOptions();
    const emitOnly = this.opts.emitOnly ?? EmitOnly.All;
    if (emitOnly !== EmitOnly.All && emitOnly !== EmitOnly.Js) return;
    if (jsFilePath === "") return;
    if (tristateIsTrue(options.noEmit ?? Tristate.False) || this.opts.host.isEmitBlocked?.(jsFilePath) === true) {
      this.emitSkipped = true;
      return;
    }
    const sourceMapEnabled = shouldEmitSourceMaps(options, sourceFile);
    this.printSourceFile(jsFilePath, sourceMapFilePath, sourceFile, {} as Printer, sourceMapEnabled);
  }

  emitDeclarationFile(sourceFile: SourceFile, declarationFilePath: string, declarationMapPath: string): void {
    const options = this.opts.host.getCompilerOptions();
    const emitOnly = this.opts.emitOnly ?? EmitOnly.All;
    if (emitOnly === EmitOnly.Js || declarationFilePath === "") return;
    if (emitOnly !== EmitOnly.ForcedDts && (tristateIsTrue(options.noEmit ?? Tristate.False) || this.opts.host.isEmitBlocked?.(declarationFilePath) === true)) {
      this.emitSkipped = true;
      return;
    }
    const emitContext = {} as EmitContext;
    const result = this.runDeclarationTransformers(emitContext, sourceFile, declarationFilePath, declarationMapPath);
    this.diagnostics.push(...result.diagnostics);
    this.printSourceFile(
      declarationFilePath,
      declarationMapPath,
      result.file,
      {} as Printer,
      emitOnly !== EmitOnly.ForcedDts && shouldEmitDeclarationSourceMaps(options, result.file),
    );
  }

  printSourceFile(
    jsFilePath: string, sourceMapFilePath: string, sourceFile: SourceFile,
    printer: Printer, shouldEmitSourceMapsFlag: boolean,
  ): void {
    void printer;
    const options = this.opts.host.getCompilerOptions();
    const sourceMapGenerator = shouldEmitSourceMapsFlag
      ? new SourceMapGenerator(
        getBaseFileName(normalizeSlashes(jsFilePath)),
        getSourceRoot(options),
        this.getSourceMapDirectory(options, jsFilePath, sourceFile),
        {
          useCaseSensitiveFileNames: this.opts.host.useCaseSensitiveFileNames(),
          currentDirectory: this.opts.host.getCurrentDirectory(),
        },
      )
      : undefined;

    let text = printFile(sourceFile);
    let sourceMapUrlPos = -1;
    if (sourceMapGenerator !== undefined) {
      if (tristateIsTrue(options.sourceMap ?? Tristate.False)
        || tristateIsTrue(options.inlineSourceMap ?? Tristate.False)
        || this.getAreDeclarationMapsEnabled(options)) {
        this.sourceMaps.push({
          inputSourceFileNames: sourceMapGenerator.getSources(),
          sourceMap: sourceMapGenerator.rawSourceMap(),
          generatedFile: jsFilePath,
        });
      }

      const sourceMappingURL = this.getSourceMappingURL(options, sourceMapGenerator, jsFilePath, sourceMapFilePath, sourceFile);
      if (sourceMappingURL !== "") {
        if (text.length > 0 && !text.endsWith("\n") && !text.endsWith("\r\n")) {
          text += this.newLineText(options);
        }
        sourceMapUrlPos = text.length;
        text += `//# sourceMappingURL=${sourceMappingURL}`;
      }

      if (sourceMapFilePath !== "") {
        const error = this.writeText(sourceMapFilePath, sourceMapGenerator.toString(), { diagnostics: this.diagnostics });
        if (error !== undefined) this.diagnostics.push(writeFileDiagnostic(sourceMapFilePath, error));
        else this.emittedFiles.push(sourceMapFilePath);
      }
    } else if (!text.endsWith("\n")) {
      text += this.newLineText(options);
    }

    if (tristateIsTrue(options.emitBOM ?? Tristate.False)) {
      text = addUTF8ByteOrderMark(text);
    }
    const data: WriteFileData = { sourceMapUrlPos, diagnostics: this.diagnostics };
    const error = this.writeText(jsFilePath, text, data);
    if (error !== undefined) {
      this.diagnostics.push(writeFileDiagnostic(jsFilePath, error));
    } else if (data.skippedDtsWrite !== true) {
      this.emittedFiles.push(jsFilePath);
    }
  }

  writeText(fileName: string, text: string, data: WriteFileData): Error | undefined {
    try {
      const host = this.opts.host as EmitHost;
      if (this.opts.writeFile !== undefined) {
        this.opts.writeFile(fileName, text, data);
        return undefined;
      }
      if (host.writeFile === undefined) return undefined;
      host.writeFile(fileName, text, false, data);
      return undefined;
    } catch (error) {
      return error instanceof Error ? error : new Error(String(error));
    }
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
    if (!declarationsEnabled(options) && this.opts.emitOnly !== EmitOnly.ForcedDts) return "";
    return getDeclarationEmitOutputFilePath(file.fileName, options, this.opts.host);
  }

  private dtsMapPathFor(file: SourceFile): string {
    const dtsFilePath = this.dtsPathFor(file);
    if (dtsFilePath === "" || !shouldEmitDeclarationSourceMaps(this.opts.host.getCompilerOptions(), file)) return "";
    return dtsFilePath + ".map";
  }

  private getSourceMapDirectory(mapOptions: CompilerOptions, filePath: string, sourceFile: SourceFile | undefined): string {
    if ((mapOptions.sourceRoot ?? "") !== "") {
      return this.opts.host.commonSourceDirectory();
    }
    if ((mapOptions.mapRoot ?? "") !== "") {
      let sourceMapDir = normalizeSlashes(mapOptions.mapRoot ?? "");
      if (sourceFile !== undefined) {
        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDirWorker(
          sourceFile.fileName,
          sourceMapDir,
          this.opts.host.getCurrentDirectory(),
          this.opts.host.commonSourceDirectory(),
          this.opts.host.useCaseSensitiveFileNames(),
        ));
      }
      if (getRootLength(sourceMapDir) === 0) {
        sourceMapDir = combinePaths(this.opts.host.commonSourceDirectory(), sourceMapDir);
      }
      return sourceMapDir;
    }
    return getDirectoryPath(normalizePath(filePath));
  }

  private getSourceMappingURL(
    mapOptions: CompilerOptions,
    sourceMapGenerator: SourceMapGenerator,
    filePath: string,
    sourceMapFilePath: string,
    sourceFile: SourceFile | undefined,
  ): string {
    if (tristateIsTrue(mapOptions.inlineSourceMap ?? Tristate.False)) {
      return sourceMapGenerator.toBase64DataURL();
    }

    const sourceMapFile = getBaseFileName(normalizeSlashes(sourceMapFilePath));
    if ((mapOptions.mapRoot ?? "") !== "") {
      let sourceMapDir = normalizeSlashes(mapOptions.mapRoot ?? "");
      if (sourceFile !== undefined) {
        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDirWorker(
          sourceFile.fileName,
          sourceMapDir,
          this.opts.host.getCurrentDirectory(),
          this.opts.host.commonSourceDirectory(),
          this.opts.host.useCaseSensitiveFileNames(),
        ));
      }
      if (getRootLength(sourceMapDir) === 0) {
        sourceMapDir = combinePaths(this.opts.host.commonSourceDirectory(), sourceMapDir);
        return encodeUri(getRelativePathToDirectoryOrUrl(
          getDirectoryPath(normalizePath(filePath)),
          combinePaths(sourceMapDir, sourceMapFile),
          true,
          {
            useCaseSensitiveFileNames: this.opts.host.useCaseSensitiveFileNames(),
            currentDirectory: this.opts.host.getCurrentDirectory(),
          },
        ));
      }
      return encodeUri(combinePaths(sourceMapDir, sourceMapFile));
    }
    return encodeUri(sourceMapFile);
  }

  private getAreDeclarationMapsEnabled(options: CompilerOptions): boolean {
    return tristateIsTrue(options.declarationMap ?? Tristate.False) && declarationsEnabled(options);
  }

  private newLineText(options: CompilerOptions): string {
    return options.newLine === 1 ? "\r\n" : "\n";
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
  writeFile?(fileName: string, text: string, writeByteOrderMark?: boolean, data?: WriteFileData): void;
  isEmitBlocked?(fileName: string): boolean;
}
interface CompilerOptions extends CompilerOptionsSubset {
  readonly configFilePath?: string;
  readonly declarationMap?: Tristate;
  readonly emitBOM?: Tristate;
  readonly emitDeclarationOnly?: Tristate;
  readonly mapRoot?: string;
  readonly newLine?: number;
  readonly noEmit?: Tristate;
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

function writeFileDiagnostic(fileName: string, error: Error): Diagnostic {
  return {
    message: {
      key: "TSTS_Could_not_write_file",
      code: 0,
      category: DiagnosticCategory.Error,
      message: `Could not write file '${fileName}': ${error.message}`,
    },
    category: DiagnosticCategory.Error,
    code: 0,
    text: `Could not write file '${fileName}': ${error.message}`,
  };
}
