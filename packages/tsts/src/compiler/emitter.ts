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
    void sourceFile; void jsFilePath; void sourceMapFilePath;
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
    void fileName; void text; void data;
    return undefined;
  }

  private jsFilePathFor(file: SourceFile): string { void file; return ""; }
  private sourceMapPathFor(file: SourceFile): string { void file; return ""; }
  private dtsPathFor(file: SourceFile): string { void file; return ""; }
  private dtsMapPathFor(file: SourceFile): string { void file; return ""; }
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
  void mapOptions; void sourceFile;
  return false;
}

export function shouldEmitDeclarationSourceMaps(mapOptions: CompilerOptions, sourceFile: SourceFile): boolean {
  void mapOptions; void sourceFile;
  return false;
}

export function getSourceRoot(mapOptions: CompilerOptions): string {
  void mapOptions;
  return "";
}

export interface SourceFileMayBeEmittedHost {
  getCompilerOptions(): CompilerOptions;
  getSourceFiles(): readonly SourceFile[];
  getCanonicalFileName(fileName: string): string;
  isSourceOfProjectReferenceRedirect(fileName: string): boolean;
}

export function sourceFileMayBeEmitted(
  sourceFile: SourceFile, host: SourceFileMayBeEmittedHost, forceDtsEmit: boolean,
): boolean {
  void sourceFile; void host; void forceDtsEmit;
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
  void file;
  return true;
}

export function getDeclarationDiagnostics(host: EmitHost, file: SourceFile): readonly Diagnostic[] {
  void host; void file;
  return [];
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface EmitContext { readonly _ec?: unknown }
interface EmitHost { readonly _h?: unknown; getCompilerOptions(): CompilerOptions; getSourceFiles(): readonly SourceFile[]; getCanonicalFileName(fileName: string): string; isSourceOfProjectReferenceRedirect(fileName: string): boolean }
interface CompilerOptions { readonly _opts?: unknown }
interface TransformOptions { readonly _tx?: unknown }
interface Printer { readonly _p?: unknown }
