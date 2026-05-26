/**
 * Compiler Program.
 *
 * Substantive port of TS-Go `internal/compiler/program.go` (~2129 LoC,
 * ~60 methods). The Program is the long-lived compilation unit: holds
 * the file list, parsed source files, project-reference graph,
 * checker pool, module resolution caches, and exposes the public
 * diagnostic-collection + emit-orchestration surface.
 *
 * Port scope: ~50 method signatures mapped, state struct, lazyValue<T>
 * helper. Method bodies are stubbed; baseline tests against the
 * upstream end-to-end corpus drive incremental fill-in.
 *
 * Cross-module deps forward-declared at file end.
 */

import type {
  Node as AstNode,
  SourceFile,
  Diagnostic,
  FileReference,
} from "../ast/index.js";

// ---------------------------------------------------------------------------
// ProgramOptions
// ---------------------------------------------------------------------------

export interface ProgramOptions {
  config: ParsedCommandLine;
  host: CompilerHost;
  tracing?: Tracing;
  singleThreaded?: boolean;
  jsdocParsingMode?: number;
  canUseProjectReferenceSource?: boolean;
}

export function canUseProjectReferenceSource(opts: ProgramOptions): boolean {
  return opts.canUseProjectReferenceSource ?? false;
}

// ---------------------------------------------------------------------------
// LazyValue helper
// ---------------------------------------------------------------------------

export class LazyValue<T> {
  private value: T | undefined;
  private computed = false;

  getValue(compute: () => T): T {
    if (!this.computed) {
      this.value = compute();
      this.computed = true;
    }
    return this.value!;
  }

  tryReuse(from: LazyValue<T>): void {
    if (from.computed) {
      this.value = from.value;
      this.computed = true;
    }
  }
}

// ---------------------------------------------------------------------------
// PackageNamesInfo
// ---------------------------------------------------------------------------

export interface PackageNamesInfo {
  unresolvedImports: Set<string>;
  packagesMap: Map<string, boolean>;
}

// ---------------------------------------------------------------------------
// DuplicateSourceFile
// ---------------------------------------------------------------------------

export interface DuplicateSourceFile {
  file: SourceFile;
  reason: string;
}

// ---------------------------------------------------------------------------
// Program class
// ---------------------------------------------------------------------------

export class Program {
  readonly opts: ProgramOptions;
  files: SourceFile[] = [];
  duplicateSourceFiles: DuplicateSourceFile[] = [];
  resolvedProjectReferences: ParsedCommandLine[] = [];
  resolvedModulesCache: Map<string, Map<string, ResolvedModule>> = new Map();
  configFileParsingDiagnostics: Diagnostic[] = [];
  packageNamesInfo: PackageNamesInfo | undefined;
  checkerPool: CheckerPool | undefined;
  unresolvedImports: LazyValue<Set<string>> = new LazyValue();

  constructor(opts: ProgramOptions) {
    this.opts = opts;
  }

  // -------------------------------------------------------------------------
  // File system + project references
  // -------------------------------------------------------------------------

  fileExists(path: string): boolean { return this.opts.host.fileExists(path); }
  getCurrentDirectory(): string { return this.opts.host.getCurrentDirectory(); }
  getGlobalTypingsCacheLocation(): string { return ""; }
  getNearestAncestorDirectoryWithPackageJson(dirname: string): string { void dirname; return ""; }
  getPackageJsonInfo(pkgJsonPath: string): unknown { void pkgJsonPath; return undefined; }
  getRedirectTargets(path: string): readonly string[] { void path; return []; }
  getSourceOfProjectReferenceIfOutputIncluded(file: SourceFile): string { void file; return ""; }
  getProjectReferenceFromSource(path: string): unknown { void path; return undefined; }
  isSourceFromProjectReference(path: string): boolean { void path; return false; }
  getProjectReferenceFromOutputDts(path: string): unknown { void path; return undefined; }
  getResolvedProjectReferenceFor(path: string): { config: ParsedCommandLine | undefined; ok: boolean } {
    void path; return { config: undefined, ok: false };
  }
  getRedirectForResolution(file: SourceFile): ParsedCommandLine | undefined { void file; return undefined; }
  getParseFileRedirect(fileName: string): string { void fileName; return ""; }
  getResolvedProjectReferences(): readonly ParsedCommandLine[] {
    return this.resolvedProjectReferences;
  }
  rangeResolvedProjectReference(
    f: (path: string, config: ParsedCommandLine, parent: ParsedCommandLine | undefined, index: number) => boolean,
  ): boolean {
    void f; return false;
  }
  rangeResolvedProjectReferenceInChildConfig(): boolean { return false; }
  useCaseSensitiveFileNames(): boolean {
    return this.opts.host.useCaseSensitiveFileNames();
  }
  usesUriStyleNodeCoreModules(): number { return 0; }
  getSourceFileFromReference(origin: SourceFile, ref: FileReference): SourceFile | undefined {
    void origin; void ref; return undefined;
  }

  // -------------------------------------------------------------------------
  // Update
  // -------------------------------------------------------------------------

  updateProgram(
    changedFilePath: string, newHost: CompilerHost,
    createCheckerPool: (program: Program) => CheckerPool,
  ): { program: Program; ok: boolean } {
    void changedFilePath; void newHost; void createCheckerPool;
    return { program: this, ok: false };
  }

  initCheckerPool(): void { /* deferred */ }

  // -------------------------------------------------------------------------
  // Public accessors
  // -------------------------------------------------------------------------

  sourceFiles(): readonly SourceFile[] { return this.files; }
  getDuplicateSourceFiles(): readonly DuplicateSourceFile[] { return this.duplicateSourceFiles; }
  options(): CompilerOptions { return this.opts.config.compilerOptions(); }
  commandLine(): ParsedCommandLine { return this.opts.config; }
  host(): CompilerHost { return this.opts.host; }
  tracing(): Tracing | undefined { return this.opts.tracing; }

  getConfigFileParsingDiagnostics(): readonly Diagnostic[] {
    return this.configFileParsingDiagnostics;
  }

  getUnresolvedImports(): Set<string> {
    return this.unresolvedImports.getValue(() => this.extractUnresolvedImports());
  }

  extractUnresolvedImports(): Set<string> {
    const result = new Set<string>();
    for (const file of this.files) {
      for (const imp of this.extractUnresolvedImportsFromSourceFile(file)) {
        result.add(imp);
      }
    }
    return result;
  }

  extractUnresolvedImportsFromSourceFile(file: SourceFile): readonly string[] {
    void file; return [];
  }

  singleThreaded(): boolean { return this.opts.singleThreaded ?? false; }

  // -------------------------------------------------------------------------
  // Binding + type checking
  // -------------------------------------------------------------------------

  bindSourceFiles(): void { /* deferred */ }

  getTypeChecker(ctx: Context): { checker: Checker; release: () => void } {
    void ctx;
    return { checker: {} as Checker, release: () => undefined };
  }

  forEachCheckerParallel(cb: (idx: number, c: Checker) => void): void {
    void cb;
  }

  getTypeCheckerForFile(ctx: Context, file: SourceFile): { checker: Checker; release: () => void } {
    void ctx; void file;
    return { checker: {} as Checker, release: () => undefined };
  }

  getTypeCheckerForFileExclusive(ctx: Context, file: SourceFile): { checker: Checker; release: () => void } {
    return this.getTypeCheckerForFile(ctx, file);
  }

  // -------------------------------------------------------------------------
  // Module resolution
  // -------------------------------------------------------------------------

  getResolvedModule(file: SourceFile, moduleReference: string, mode: number): ResolvedModule | undefined {
    void file; void moduleReference; void mode; return undefined;
  }

  getResolvedModuleFromModuleSpecifier(file: SourceFile, moduleSpecifier: AstNode): ResolvedModule | undefined {
    void file; void moduleSpecifier; return undefined;
  }

  getResolvedModules(): Map<string, Map<string, ResolvedModule>> {
    return this.resolvedModulesCache;
  }

  getPackagesMap(): Map<string, boolean> {
    return this.packageNamesInfo?.packagesMap ?? new Map();
  }

  // -------------------------------------------------------------------------
  // Diagnostics
  // -------------------------------------------------------------------------

  collectDiagnostics(
    ctx: Context, sourceFile: SourceFile | undefined, concurrent: boolean,
    collect: (ctx: Context, file: SourceFile) => readonly Diagnostic[],
  ): readonly Diagnostic[] {
    void ctx; void concurrent;
    if (sourceFile === undefined) {
      const all: Diagnostic[] = [];
      for (const f of this.files) all.push(...collect(ctx, f));
      return all;
    }
    return collect(ctx, sourceFile);
  }

  collectDiagnosticsFromFiles(
    ctx: Context, sourceFiles: readonly SourceFile[], concurrent: boolean,
    collect: (ctx: Context, file: SourceFile) => readonly Diagnostic[],
  ): readonly (readonly Diagnostic[])[] {
    void concurrent;
    return sourceFiles.map((f) => collect(ctx, f));
  }

  collectCheckerDiagnostics(
    ctx: Context, sourceFile: SourceFile,
    collect: (ctx: Context, c: Checker, file: SourceFile) => readonly Diagnostic[],
  ): readonly Diagnostic[] {
    const { checker, release } = this.getTypeCheckerForFile(ctx, sourceFile);
    try {
      return collect(ctx, checker, sourceFile);
    } finally {
      release();
    }
  }

  collectCheckerDiagnosticsFromFiles(
    ctx: Context, sourceFiles: readonly SourceFile[],
    collect: (ctx: Context, c: Checker, file: SourceFile) => readonly Diagnostic[],
  ): readonly (readonly Diagnostic[])[] {
    return sourceFiles.map((f) => this.collectCheckerDiagnostics(ctx, f, collect));
  }

  getSyntacticDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectDiagnostics(ctx, sourceFile, false, () => []);
  }

  getGlobalDiagnostics(ctx: Context): readonly Diagnostic[] { void ctx; return []; }

  getDeclarationDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectDiagnostics(ctx, sourceFile, false, () => []);
  }

  getSemanticDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectDiagnostics(ctx, sourceFile, false, () => []);
  }

  getOptionsDiagnostics(ctx: Context): readonly Diagnostic[] { void ctx; return []; }
  getProgramDiagnostics(): readonly Diagnostic[] { return []; }
}

// ---------------------------------------------------------------------------
// Module-level entries
// ---------------------------------------------------------------------------

export function newProgram(opts: ProgramOptions): Program {
  return new Program(opts);
}

export function canReplaceFileInProgram(file1: SourceFile, file2: SourceFile): boolean {
  void file1; void file2; return false;
}

export function equalModuleSpecifiers(n1: AstNode | undefined, n2: AstNode | undefined): boolean {
  void n1; void n2; return false;
}

export function equalModuleAugmentationNames(n1: AstNode | undefined, n2: AstNode | undefined): boolean {
  void n1; void n2; return false;
}

export function equalFileReferences(f1: FileReference | undefined, f2: FileReference | undefined): boolean {
  if (f1 === undefined && f2 === undefined) return true;
  if (f1 === undefined || f2 === undefined) return false;
  return f1.fileName === f2.fileName;
}

export function equalCheckJSDirectives(d1: AstNode | undefined, d2: AstNode | undefined): boolean {
  void d1; void d2; return false;
}

export function getAdditionalJSSyntacticDiagnostics(
  file: SourceFile, options: CompilerOptions,
): readonly Diagnostic[] {
  void file; void options; return [];
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface ParsedCommandLine {
  compilerOptions(): CompilerOptions;
  readonly _p?: unknown;
}
interface CompilerOptions { readonly _opts?: unknown }
interface CompilerHost {
  fileExists(path: string): boolean;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  readonly _host?: unknown;
}
interface Tracing { readonly _trace?: unknown }
interface CheckerPool { readonly _pool?: unknown }
interface Checker { readonly _checker?: unknown }
interface Context { readonly _ctx?: unknown }
interface ResolvedModule { readonly _mod?: unknown }
