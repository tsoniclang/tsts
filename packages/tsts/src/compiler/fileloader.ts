/**
 * File loader.
 *
 * Substantive port of TS-Go `internal/compiler/fileloader.go` (~760 LoC,
 * ~30 methods). Responsible for loading all source files reachable
 * from the root + lib + reference + module-resolution graph, parsing
 * each into a SourceFile, and recording the FileInclude reasons.
 *
 * Port scope: full state declarations, method-API parity. Bodies stubbed.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  SourceFile,
  FileReference,
  Diagnostic,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// Lib resolution
// ---------------------------------------------------------------------------

export interface LibResolution {
  name: string;
  fileName: string;
  isLib: boolean;
}

export interface LibFile {
  fileName: string;
  contents: string;
}

export interface SourceFileFromReferenceDiagnostic {
  file: SourceFile;
  reason: string;
}

// ---------------------------------------------------------------------------
// FileInclude reason
// ---------------------------------------------------------------------------

export interface FileIncludeReason {
  kind: number;
  fileName?: string;
  referencingFile?: string;
  ref?: FileReference;
  packageId?: string;
}

// ---------------------------------------------------------------------------
// Processed files result
// ---------------------------------------------------------------------------

export interface ProcessedFiles {
  files: SourceFile[];
  duplicateSourceFiles: DuplicateSourceFile[];
  unresolvedImports: Set<string>;
  resolvedModulesMap: Map<string, Map<string, ResolvedModule>>;
  packageNamesInfo: PackageNamesInfo;
  fileReasons: Map<string, FileIncludeReason[]>;
  diagnostics: Diagnostic[];
}

export interface JsxRuntimeImportSpecifier {
  specifier: string;
  mode: number;
}

export interface DuplicateSourceFile { file: SourceFile; reason: string }
export interface PackageNamesInfo { unresolvedImports: Set<string>; packagesMap: Map<string, boolean> }
export interface ResolvedModule { resolvedFileName?: string; isExternalLibraryImport?: boolean }

// ---------------------------------------------------------------------------
// RedirectsFile wrapper
// ---------------------------------------------------------------------------

export class RedirectsFile {
  fileName_: string;
  path_: string;

  constructor(fileName: string, path: string) {
    this.fileName_ = fileName;
    this.path_ = path;
  }

  fileName(): string { return this.fileName_; }
  path(): string { return this.path_; }
}

// ---------------------------------------------------------------------------
// FileLoader
// ---------------------------------------------------------------------------

export class FileLoader {
  options: CompilerOptions;
  host: CompilerHost;
  files: SourceFile[] = [];
  rootTasks: ParseTask[] = [];
  parseTasks: Map<string, ParseTask> = new Map();
  resolvedModulesMap: Map<string, Map<string, ResolvedModule>> = new Map();
  fileReasons: Map<string, FileIncludeReason[]> = new Map();
  diagnostics: Diagnostic[] = [];

  constructor(options: CompilerOptions, host: CompilerHost) {
    this.options = options;
    this.host = host;
  }

  // -------------------------------------------------------------------------
  // Path helpers
  // -------------------------------------------------------------------------

  toPath(file: string): string {
    return file;
  }

  // -------------------------------------------------------------------------
  // Task queueing
  // -------------------------------------------------------------------------

  addRootTask(fileName: string, libFile: LibFile | undefined, includeReason: FileIncludeReason): void {
    this.rootTasks.push({ fileName, libFile, includeReason });
  }

  addAutomaticTypeDirectiveTasks(): void { /* deferred */ }

  resolveAutomaticTypeDirectives(containingFileName: string): {
    directives: readonly string[]; diagnostics: readonly Diagnostic[];
  } {
    void containingFileName;
    return { directives: [], diagnostics: [] };
  }

  addProjectReferenceTasks(singleThreaded: boolean): void { void singleThreaded; }

  // -------------------------------------------------------------------------
  // Library file ordering + loading
  // -------------------------------------------------------------------------

  sortLibs(libFiles: SourceFile[]): void {
    libFiles.sort((a, b) => this.getDefaultLibFilePriority(a) - this.getDefaultLibFilePriority(b));
  }

  getDefaultLibFilePriority(a: SourceFile): number {
    void a;
    return 0;
  }

  loadSourceFileMetaData(fileName: string): SourceFileMetaData {
    void fileName;
    return {};
  }

  parseSourceFile(t: ParseTask): SourceFile | undefined {
    void t;
    return undefined;
  }

  isSupportedExtension(canonicalFileName: string): boolean {
    return canonicalFileName.endsWith(".ts")
      || canonicalFileName.endsWith(".tsx")
      || canonicalFileName.endsWith(".d.ts")
      || canonicalFileName.endsWith(".js")
      || canonicalFileName.endsWith(".jsx")
      || canonicalFileName.endsWith(".json");
  }

  getSourceFileFromReference(
    origin: SourceFile | undefined, ref: FileReference,
  ): { file: SourceFile | undefined; ok: boolean } {
    void origin; void ref;
    return { file: undefined, ok: false };
  }

  resolveTripleslashPathReference(
    moduleName: string, containingFile: string, index: number,
  ): { resolved: ResolvedRef | undefined; diagnostic: ProcessingDiagnostic | undefined } {
    void moduleName; void containingFile; void index;
    return { resolved: undefined, diagnostic: undefined };
  }

  resolveTypeReferenceDirectives(t: ParseTask): void { void t; }
  resolveImportsAndModuleAugmentations(t: ParseTask): void { void t; }

  createSyntheticImport(text: string, file: SourceFile): AstNode {
    void text; void file;
    return {} as AstNode;
  }

  pathForLibFile(name: string): LibFile | undefined {
    void name;
    return undefined;
  }

  resolveLibrary(libraryName: string, resolveFrom: string): {
    module: ResolvedModule | undefined; diagnostics: readonly DiagAndArgs[];
  } {
    void libraryName; void resolveFrom;
    return { module: undefined, diagnostics: [] };
  }
}

// ---------------------------------------------------------------------------
// Module-level entries
// ---------------------------------------------------------------------------

export function processAllProgramFiles(
  options: CompilerOptions, host: CompilerHost, singleThreaded: boolean,
): ProcessedFiles {
  const loader = new FileLoader(options, host);
  void singleThreaded;
  return {
    files: loader.files,
    duplicateSourceFiles: [],
    unresolvedImports: new Set(),
    resolvedModulesMap: loader.resolvedModulesMap,
    packageNamesInfo: { unresolvedImports: new Set(), packagesMap: new Map() },
    fileReasons: loader.fileReasons,
    diagnostics: loader.diagnostics,
  };
}

export function getLibraryNameFromLibFileName(libFileName: string): string {
  return libFileName.replace(/^lib\./, "").replace(/\.d\.ts$/, "");
}

export function getInferredLibraryNameResolveFrom(
  options: CompilerOptions, currentDirectory: string, libFileName: string,
): string {
  void options; void libFileName;
  return currentDirectory;
}

export function getModeForTypeReferenceDirectiveInFile(
  ref: FileReference, file: SourceFile, meta: SourceFileMetaData, options: CompilerOptions,
): number {
  void ref; void file; void meta; void options;
  return 0;
}

export function getDefaultResolutionModeForFile(
  fileName: string, meta: SourceFileMetaData, options: CompilerOptions,
): number {
  void fileName; void meta; void options;
  return 0;
}

export function getModeForUsageLocation(
  fileName: string, meta: SourceFileMetaData, usage: AstNode, options: CompilerOptions,
): number {
  void fileName; void meta; void usage; void options;
  return 0;
}

export function importSyntaxAffectsModuleResolution(options: CompilerOptions): boolean {
  void options;
  return false;
}

export function getEmitSyntaxForUsageLocationWorker(
  fileName: string, meta: SourceFileMetaData, usage: AstNode, options: CompilerOptions,
): number {
  void fileName; void meta; void usage; void options;
  return 0;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface CompilerOptions { readonly _opts?: unknown }
interface CompilerHost { readonly _host?: unknown }
interface ParseTask {
  fileName: string;
  libFile?: LibFile | undefined;
  includeReason: FileIncludeReason;
}
interface ResolvedRef { readonly _ref?: unknown }
interface ProcessingDiagnostic { readonly _diag?: unknown }
interface DiagAndArgs { readonly _da?: unknown }
interface SourceFileMetaData { readonly _meta?: unknown }
