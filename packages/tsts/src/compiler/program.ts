/**
 * Compiler Program.
 *
 * Substantive port of TS-Go `internal/compiler/program.go` (~2129 LoC).
 * The Program is the long-lived compilation unit: holds the file list,
 * parsed source files, project-reference graph, checker pool, module
 * resolution caches, and exposes the public diagnostic-collection +
 * emit-orchestration surface.
 *
 * The implementation owns loaded source files, project-reference lookup,
 * checker access, diagnostic collection, and emit-result aggregation.
 */

import type {
  Node as AstNode,
  SourceFile,
  Diagnostic,
  FileReference,
} from "../ast/index.js";
import { nodeText } from "../ast/index.js";
import { bindSourceFile } from "../binder/index.js";
import type { Checker } from "../checker/index.js";
import {
  processAllProgramFiles,
  type FileIncludeReason,
  type JsxRuntimeImportSpecifier,
  type LibFile,
  type ResolvedModule,
  type ResolvedTypeReferenceDirective,
} from "./fileLoader.js";
import { toDiagnostic as includeReasonToDiagnostic } from "./fileInclude.js";
import { newCheckerPool, type CheckerPool } from "./checkerPool.js";
import { getDeclarationDiagnostics as getDeclarationDiagnosticsForEmit } from "./emitter.js";
import { newProgramEmitHost } from "./emitHost.js";
import { emitProgramJs } from "./jsEmit.js";
import { ParsedCommandLine, type CompilerOptionsHandle } from "../tsoptions/parsedCommandLine.js";
import type { CompilerOptions } from "../core/compilerOptions.js";
import { Tristate } from "../core/tristate.js";
import { getDirectoryPath, toPath as toCanonicalPath } from "../tspath/index.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { ScriptKind } from "../enums/scriptKind.enum.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import {
  createExtensionHost,
  type CompilerExtension,
  type ExtensionFacts,
  type ExtensionHost,
  type ExtensionProgram,
} from "../extensions/index.js";

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
  /**
   * Optional compiler extensions. When omitted or empty the program builds a
   * no-op extension host so behavior is byte-identical to the un-extended
   * compiler (HARD INVARIANT).
   */
  extensions?: readonly CompilerExtension[];
  /**
   * Per-extension configuration: extensionId -> (optionName -> value). Consumed
   * by the `configure` hook. Defaults to an empty map.
   */
  extensionOptions?: ReadonlyMap<string, ReadonlyMap<string, unknown>>;
}

export function canUseProjectReferenceSource(opts: ProgramOptions): boolean {
  return opts.canUseProjectReferenceSource ?? false;
}

/** Shared empty per-extension options map (no allocation per program). */
const EMPTY_EXTENSION_OPTIONS: ReadonlyMap<string, ReadonlyMap<string, unknown>> = new Map();

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
// CompilerHost
// ---------------------------------------------------------------------------

export interface CompilerHost {
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  writeFile?(path: string, data: string, writeByteOrderMark: boolean): void;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  directoryExists?(path: string): boolean;
  getAccessibleEntries?(path: string): { files: readonly string[]; directories: readonly string[] };
  realpath?(path: string): string;
  readonly _host?: unknown;
}

// ---------------------------------------------------------------------------
// Program class
// ---------------------------------------------------------------------------

export class Program implements ProgramLike {
  readonly opts: ProgramOptions;
  files: SourceFile[];
  duplicateSourceFiles: DuplicateSourceFile[];
  resolvedProjectReferences: ParsedCommandLine[] = [];
  resolvedModulesCache: Map<string, Map<string, ResolvedModule>>;
  typeResolutionsInFile: Map<string, Map<string, ResolvedTypeReferenceDirective>>;
  jsxRuntimeImportSpecifiers: Map<string, JsxRuntimeImportSpecifier>;
  importHelpersImportSpecifiers: Map<string, AstNode>;
  libFiles: Map<string, LibFile>;
  fileReasons: Map<string, FileIncludeReason[]>;
  missingPaths: Set<string> = new Set();
  configFileParsingDiagnostics: Diagnostic[];
  packageNamesInfo: PackageNamesInfo | undefined;
  checkerPool: CheckerPool | undefined;
  unresolvedImports: LazyValue<Set<string>> = new LazyValue();
  filesByPath: Map<string, SourceFile> = new Map();
  emitBlockingDiagnostics: Set<string> = new Set();
  programDiagnostics: Diagnostic[] = [];
  /**
   * The per-Program extension fact store. Always present; empty and inert when
   * no extensions are registered. Consumers read facts via this surface.
   */
  readonly extensionFacts: ExtensionFacts;
  private readonly extensionHost: ExtensionHost;
  private wholeProgramExtensionPhasesRan = false;
  private commonSourceDirectoryValue = "";
  private commonSourceDirectoryComputed = false;
  private sourceFilesToEmitValue: SourceFile[] | undefined;
  private hasTSFileValue: boolean | undefined;
  private packagesMapValue: Map<string, boolean> | undefined;

  constructor(opts: ProgramOptions) {
    this.opts = opts;
    // Build the extension host up front: it owns the single per-Program fact
    // store. With zero extensions the host is inert (no facts, no diagnostics),
    // preserving the HARD INVARIANT of byte-identical behavior.
    this.extensionHost = createExtensionHost(opts.extensions ?? []);
    this.extensionFacts = this.extensionHost.facts;
    const rootFileNames = opts.config.parsedConfig.fileNames;
    const loaded = processAllProgramFiles(
      compilerOptionsFromHandle(opts.config.parsedConfig.compilerOptions),
      opts.host,
      rootFileNames,
      opts.singleThreaded ?? false,
    );
    this.files = [...loaded.files];
    this.duplicateSourceFiles = [...loaded.duplicateSourceFiles];
    this.resolvedModulesCache = loaded.resolvedModulesMap;
    this.typeResolutionsInFile = loaded.typeResolutionsInFile;
    this.jsxRuntimeImportSpecifiers = loaded.jsxRuntimeImportSpecifiers;
    this.importHelpersImportSpecifiers = loaded.importHelpersImportSpecifiers;
    this.libFiles = loaded.libFiles;
    this.fileReasons = loaded.fileReasons;
    this.packageNamesInfo = loaded.packageNamesInfo;
    this.configFileParsingDiagnostics = [
      ...(opts.config.errors ?? []),
      ...loaded.diagnostics,
    ];
    // Pre-populate the path → file index for quick lookup.
    for (const f of this.files) {
      const path = f.fileName;
      if (path !== "") this.filesByPath.set(this.toPath(path), f);
    }
    // Eagerly resolve unresolvedImports so they're available immediately.
    this.unresolvedImports.tryReuse(new LazyValue());
    this.packageNamesInfo = {
      unresolvedImports: loaded.unresolvedImports,
      packagesMap: new Map(),
    };
    this.verifyCompilerOptions();
    // Run the parse-phase extension lifecycle: configure (program-level) then
    // afterParseSourceFile over every parsed file. No-op when no extensions are
    // registered. Idempotency is enforced inside the host.
    this.extensionHost.runConfigure(this.asExtensionProgram(), opts.extensionOptions ?? EMPTY_EXTENSION_OPTIONS);
    this.extensionHost.runAfterParse(this.files, this.asExtensionProgram());
  }

  /**
   * View this Program through the minimal `ExtensionProgram` surface handed to
   * extension hooks. Exposes only the fact store; the host never touches
   * compiler internals.
   */
  private asExtensionProgram(): ExtensionProgram {
    return this;
  }

  toPath(file: string): string {
    return toCanonicalPath(file, this.opts.host.getCurrentDirectory(), this.opts.host.useCaseSensitiveFileNames());
  }

  // -------------------------------------------------------------------------
  // File system + project references
  // -------------------------------------------------------------------------

  fileExists(path: string): boolean { return this.opts.host.fileExists(path); }
  getCurrentDirectory(): string { return this.opts.host.getCurrentDirectory(); }
  getGlobalTypingsCacheLocation(): string { return ""; }
  getNearestAncestorDirectoryWithPackageJson(dirname: string): string {
    // Walk up from `dirname` looking for a directory that contains a
    // package.json file.
    let cur = dirname;
    while (cur !== "" && cur !== "/" && cur !== ".") {
      const pkgJsonPath = (cur.endsWith("/") ? cur : cur + "/") + "package.json";
      if (this.opts.host.fileExists(pkgJsonPath)) return cur;
      const idx = cur.lastIndexOf("/");
      if (idx <= 0) return "";
      cur = cur.slice(0, idx);
    }
    return "";
  }
  getPackageJsonInfo(pkgJsonPath: string): unknown {
    // Reads and parses the package.json at the given path, returning
    // the parsed object (or undefined if read/parse fails).
    const content = this.opts.host.readFile(pkgJsonPath);
    if (content === undefined) return undefined;
    try {
      return JSON.parse(content);
    } catch {
      return undefined;
    }
  }
  getRedirectTargets(path: string): readonly string[] {
    const ref = this.getProjectReferenceFromSource(path) as { outputDts?: string } | undefined;
    if (ref?.outputDts !== undefined && ref.outputDts !== "") return [ref.outputDts];
    return [];
  }
  getSourceOfProjectReferenceIfOutputIncluded(file: SourceFile): string {
    const entry = this.opts.config.outputDtsToProjectReference()?.get(this.toPath(file.fileName));
    return entry?.source ?? "";
  }
  getProjectReferenceFromSource(path: string): unknown {
    // Look up resolvedProjectReferences for one whose .fileNames
    // contain `path`.
    return this.opts.config.sourceToProjectReference()?.get(this.toPath(path)) ?? undefined;
  }
  isSourceFromProjectReference(path: string): boolean {
    return this.getProjectReferenceFromSource(path) !== undefined;
  }
  getProjectReferenceFromOutputDts(path: string): unknown {
    return this.opts.config.outputDtsToProjectReference()?.get(this.toPath(path)) ?? undefined;
  }
  getResolvedProjectReferenceFor(path: string): { config: ParsedCommandLine | undefined; ok: boolean } {
    const canonical = this.toPath(path);
    for (const ref of this.resolvedProjectReferences) {
      if (this.toPath(ref.configName()) === canonical) return { config: ref, ok: true };
    }
    return { config: undefined, ok: false };
  }
  getRedirectForResolution(file: SourceFile): ParsedCommandLine | undefined {
    const source = this.getProjectReferenceFromOutputDts(file.fileName) as { resolved?: ParsedCommandLine } | undefined;
    return source?.resolved;
  }
  getParseFileRedirect(fileName: string): string {
    const redirected = this.getProjectReferenceFromOutputDts(fileName) as { source?: string } | undefined;
    return redirected?.source ?? "";
  }
  getResolvedProjectReferences(): readonly ParsedCommandLine[] {
    return this.resolvedProjectReferences;
  }
  rangeResolvedProjectReference(
    f: (path: string, config: ParsedCommandLine, parent: ParsedCommandLine | undefined, index: number) => boolean,
  ): boolean {
    let i = 0;
    for (const ref of this.resolvedProjectReferences) {
      if (f((ref.configFile?.fileName) ?? "", ref, undefined, i)) return true;
      i++;
    }
    return false;
  }
  rangeResolvedProjectReferenceInChildConfig(): boolean {
    for (const ref of this.resolvedProjectReferences) {
      if ((ref.resolvedProjectReferencePaths() ?? []).length > 0) return true;
    }
    return false;
  }
  useCaseSensitiveFileNames(): boolean {
    return this.opts.host.useCaseSensitiveFileNames();
  }
  usesUriStyleNodeCoreModules(): number { return 0; }
  getSourceFileFromReference(origin: SourceFile, ref: FileReference): SourceFile | undefined {
    // Delegates to a fresh resolution; the loader-cached path uses
    // toPath to canonicalize.
    void origin;
    const candidate = ref.fileName;
    if (candidate === undefined) return undefined;
    return this.filesByPath.get(this.toPath(candidate));
  }

  /**
   * Look up an already-loaded source file by its file name.
   * Mirrors TS-Go `(*Program).GetSourceFile`.
   */
  getSourceFile(fileName: string): SourceFile | undefined {
    return this.filesByPath.get(this.toPath(fileName));
  }

  // -------------------------------------------------------------------------
  // Update
  // -------------------------------------------------------------------------

  updateProgram(
    changedFilePath: string, newHost: CompilerHost,
    createCheckerPool: (program: Program) => CheckerPool,
  ): { program: Program; ok: boolean } {
    const oldFile = this.filesByPath.get(changedFilePath);
    if (oldFile !== undefined) {
      const newText = newHost.readFile(oldFile.fileName);
      if (newText === oldFile.text) {
        const reused = new Program({ ...this.opts, host: newHost });
        reused.files = this.files;
        reused.filesByPath = new Map(this.filesByPath);
        reused.resolvedModulesCache = new Map(this.resolvedModulesCache);
        reused.typeResolutionsInFile = new Map(this.typeResolutionsInFile);
        reused.jsxRuntimeImportSpecifiers = new Map(this.jsxRuntimeImportSpecifiers);
        reused.importHelpersImportSpecifiers = new Map(this.importHelpersImportSpecifiers);
        reused.libFiles = new Map(this.libFiles);
        reused.fileReasons = new Map(this.fileReasons);
        reused.missingPaths = new Set(this.missingPaths);
        reused.duplicateSourceFiles = this.duplicateSourceFiles;
        reused.configFileParsingDiagnostics = this.configFileParsingDiagnostics;
        reused.packageNamesInfo = this.packageNamesInfo;
        reused.checkerPool = createCheckerPool(reused);
        return { program: reused, ok: true };
      }
    }
    const fresh = new Program({ ...this.opts, host: newHost });
    fresh.checkerPool = createCheckerPool(fresh);
    return { program: fresh, ok: false };
  }

  initCheckerPool(): void {
    this.checkerPool = newCheckerPool(this);
  }

  // -------------------------------------------------------------------------
  // Public accessors
  // -------------------------------------------------------------------------

  sourceFiles(): readonly SourceFile[] { return this.files; }
  getDuplicateSourceFiles(): readonly DuplicateSourceFile[] { return this.duplicateSourceFiles; }
  options(): CompilerOptions {
    return compilerOptionsFromHandle(this.opts.config.parsedConfig.compilerOptions);
  }
  commandLine(): ParsedCommandLine { return this.opts.config; }
  host(): CompilerHost { return this.opts.host; }
  tracing(): Tracing | undefined { return this.opts.tracing; }

  getConfigFileParsingDiagnostics(): readonly Diagnostic[] {
    return this.configFileParsingDiagnostics;
  }

  getUnresolvedImports(): Set<string> {
    return this.unresolvedImports.getValue(() => new Set(this.packageNamesInfo?.unresolvedImports ?? []));
  }

  extractUnresolvedImports(): Set<string> {
    return new Set(this.packageNamesInfo?.unresolvedImports ?? []);
  }

  extractUnresolvedImportsFromSourceFile(file: SourceFile): readonly string[] {
    const cache = this.resolvedModulesCache.get(this.toPath(file.fileName));
    if (cache === undefined) return [];
    const unresolved: string[] = [];
    for (const [moduleName, resolved] of cache) {
      if (moduleIsResolved(resolved)) continue;
      if (!isExternalModuleNameRelative(moduleName)) unresolved.push(moduleName);
    }
    return unresolved;
  }

  singleThreaded(): boolean { return this.opts.singleThreaded ?? false; }

  // -------------------------------------------------------------------------
  // Binding + type checking
  // -------------------------------------------------------------------------

  bindSourceFiles(): void {
    for (const file of this.files) {
      bindSourceFile(file);
      // afterBindSourceFile is idempotent per (file, extension) inside the
      // host, so re-binding never appends duplicate facts.
      this.extensionHost.runAfterBind(file, this.asExtensionProgram());
    }
  }

  getTypeChecker(ctx: Context): { checker: Checker; release: () => void } {
    this.checkerPool ??= newCheckerPool(this);
    return this.checkerPool.getChecker(ctx, undefined);
  }

  forEachCheckerParallel(cb: (idx: number, c: Checker) => void): void {
    this.checkerPool ??= newCheckerPool(this);
    this.checkerPool.forEachParallel(cb);
  }

  getTypeCheckerForFile(ctx: Context, file: SourceFile): { checker: Checker; release: () => void } {
    this.checkerPool ??= newCheckerPool(this);
    return this.checkerPool.getCheckerForFileExclusive(ctx, file);
  }

  getTypeCheckerForFileExclusive(ctx: Context, file: SourceFile): { checker: Checker; release: () => void } {
    return this.getTypeCheckerForFile(ctx, file);
  }

  // -------------------------------------------------------------------------
  // Module resolution
  // -------------------------------------------------------------------------

  getResolvedModule(file: SourceFile, moduleReference: string, mode: number): ResolvedModule | undefined {
    void mode;
    const fileName = file.fileName;
    if (fileName === "") return undefined;
    const cache = this.resolvedModulesCache.get(this.toPath(fileName));
    return cache?.get(moduleReference);
  }

  getResolvedModuleFromModuleSpecifier(file: SourceFile, moduleSpecifier: AstNode): ResolvedModule | undefined {
    const text = nodeText(moduleSpecifier);
    if (text === "") return undefined;
    return this.getResolvedModule(file, text, 0);
  }

  getResolvedModules(): Map<string, Map<string, ResolvedModule>> {
    return this.resolvedModulesCache;
  }

  getPackagesMap(): Map<string, boolean> {
    if (this.packagesMapValue !== undefined) return this.packagesMapValue;
    const packages = new Map<string, boolean>(this.packageNamesInfo?.packagesMap ?? []);
    for (const resolvedModulesInFile of this.resolvedModulesCache.values()) {
      for (const resolved of resolvedModulesInFile.values()) {
        const packageName = resolved.packageId?.name;
        if (packageName === undefined || packageName === "") continue;
        packages.set(packageName, packages.get(packageName) === true || resolved.extension === ".d.ts");
      }
    }
    this.packagesMapValue = packages;
    return packages;
  }

  // -------------------------------------------------------------------------
  // Diagnostics
  // -------------------------------------------------------------------------

  collectDiagnostics(
    ctx: Context, sourceFile: SourceFile | undefined, concurrent: boolean,
    collect: (ctx: Context, file: SourceFile) => readonly Diagnostic[],
  ): readonly Diagnostic[] {
    void concurrent;
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
    ctx: Context, sourceFile: SourceFile | undefined,
    collect: (ctx: Context, c: Checker, file: SourceFile) => readonly Diagnostic[],
  ): readonly Diagnostic[] {
    if (sourceFile === undefined) {
      return sortAndDeduplicateDiagnostics(this.collectCheckerDiagnosticsFromFiles(ctx, this.files, collect).flat());
    }
    if (this.skipTypeChecking(sourceFile, false)) return [];
    const { checker, release } = this.getTypeCheckerForFile(ctx, sourceFile);
    try {
      return sortAndDeduplicateDiagnostics(collect(ctx, checker, sourceFile));
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
    return this.collectDiagnostics(ctx, sourceFile, false, (_c, file) => {
      return file.parseDiagnostics;
    });
  }

  getGlobalDiagnostics(ctx: Context): readonly Diagnostic[] {
    void ctx;
    this.checkerPool ??= newCheckerPool(this);
    return this.checkerPool.getGlobalDiagnostics();
  }

  getBindDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    void ctx;
    if (sourceFile !== undefined) {
      return bindSourceFile(sourceFile).map(diagnostic => diagnosticFromText(diagnostic.message, sourceFile));
    }
    this.bindSourceFiles();
    return [];
  }

  getDeclarationDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectDiagnostics(ctx, sourceFile, true, (_ctx, file) => this.getDeclarationDiagnosticsForFile(_ctx, file));
  }

  getSemanticDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    const base = this.collectCheckerDiagnostics(ctx, sourceFile, (diagnosticContext, checker, file) => {
      return this.getSemanticDiagnosticsWithChecker(diagnosticContext, checker, file);
    });
    // A whole-program semantic pass (no target file) has now checked every
    // file. Run the whole-program extension phases exactly once, then surface
    // extension diagnostics through the normal semantic-diagnostic output.
    if (sourceFile === undefined) this.runWholeProgramExtensionPhases(ctx);
    return this.withExtensionDiagnostics(base);
  }

  /**
   * Run `afterCheckProgram` then `validateProgram` over a whole-program checker,
   * exactly once per Program. No-op when no extensions are registered. The
   * checker is wrapped in the read-only facade inside the host.
   */
  private runWholeProgramExtensionPhases(ctx: Context): void {
    if (this.wholeProgramExtensionPhasesRan) return;
    if (this.extensionHost.extensions.length === 0) {
      // Nothing to dispatch; mark done so we never acquire a checker needlessly.
      this.wholeProgramExtensionPhasesRan = true;
      return;
    }
    this.wholeProgramExtensionPhasesRan = true;
    const { checker, release } = this.getTypeChecker(ctx);
    try {
      this.extensionHost.runAfterCheckProgram(this.asExtensionProgram(), checker);
      this.extensionHost.runValidateProgram(this.asExtensionProgram(), checker);
    } finally {
      release();
    }
  }

  /**
   * Append extension diagnostics (registration fatals + hook/validate output)
   * to `base`. Returns `base` unchanged when there are none, preserving
   * byte-identical behavior with zero extensions.
   */
  private withExtensionDiagnostics(base: readonly Diagnostic[]): readonly Diagnostic[] {
    const extensionDiagnostics = this.extensionFacts.diagnostics();
    if (extensionDiagnostics.length === 0) return base;
    return [...base, ...extensionDiagnostics];
  }

  getSemanticDiagnosticsWithChecker(ctx: Context, checker: Checker, file: SourceFile): readonly Diagnostic[] {
    void ctx;
    const diagnostics = this.getBindAndCheckDiagnosticsWithChecker(ctx, checker, file);
    return [
      ...filterNoEmitSemanticDiagnostics(diagnostics, this.options()),
      ...this.getIncludeProcessorDiagnostics(file),
    ];
  }

  getBindAndCheckDiagnosticsWithChecker(ctx: Context, checker: Checker, file: SourceFile): readonly Diagnostic[] {
    void ctx;
    if (this.skipTypeChecking(file, false)) return [];
    const bindDiagnostics = bindSourceFile(file).map(diagnostic => diagnosticFromText(diagnostic.message, file));
    // Bind phase complete for this file: run afterBindSourceFile (idempotent).
    this.extensionHost.runAfterBind(file, this.asExtensionProgram());
    const result = checker.checkSourceFile(file);
    // Check phase complete: run afterCheckSourceFile with the checker wrapped in
    // the read-only extension facade (idempotent per file+extension).
    this.extensionHost.runAfterCheck(file, checker, this.asExtensionProgram());
    const checkDiagnostics = result.diagnostics.map(diagnostic => diagnosticFromText(diagnostic.message, file));
    const diagnostics = [...bindDiagnostics, ...checkDiagnostics];
    if (isPlainJSFile(file, this.options())) {
      return diagnostics.filter(diagnostic => plainJSErrors.has(diagnostic.code));
    }
    if (isCheckJSEnabledForFile(file, this.options())) {
      const jsDocDiagnostics = (file as SourceFileWithDiagnosticSlots).jsDocDiagnostics ?? [];
      diagnostics.push(...jsDocDiagnostics);
    }
    const filtered = this.getDiagnosticsWithPrecedingDirectives(file, diagnostics);
    return filtered.diagnostics;
  }

  getDiagnosticsWithPrecedingDirectives(
    sourceFile: SourceFile,
    diagnostics: readonly Diagnostic[],
  ): { diagnostics: readonly Diagnostic[]; directivesByLine: ReadonlyMap<number, CommentDirectiveLike> } {
    const commentDirectives = (sourceFile as SourceFileWithDiagnosticSlots).commentDirectives ?? [];
    if (commentDirectives.length === 0) return { diagnostics, directivesByLine: new Map() };
    const directivesByLine = new Map<number, CommentDirectiveLike>();
    const lineStarts = getLineStarts(sourceFile.text);
    for (const directive of commentDirectives) {
      directivesByLine.set(computeLineOfPosition(lineStarts, directive.pos), directive);
    }
    const filtered: Diagnostic[] = [];
    for (const diagnostic of diagnostics) {
      let ignoreDiagnostic = false;
      const diagnosticLine = computeLineOfPosition(lineStarts, diagnostic.start ?? 0);
      for (let line = diagnosticLine - 1; line >= 0; line -= 1) {
        const directive = directivesByLine.get(line);
        if (directive !== undefined) {
          ignoreDiagnostic = true;
          directivesByLine.set(line, { ...directive, kind: "ignore" });
          break;
        }
        if (!isCommentOrBlankLine(sourceFile.text, lineStarts[line] ?? 0)) break;
      }
      if (!ignoreDiagnostic) filtered.push(diagnostic);
    }
    for (const directive of directivesByLine.values()) {
      if (directive.kind === "expect-error") filtered.push(diagnosticFromMessage(Diagnostics.Unused_ts_expect_error_directive, sourceFile));
    }
    return { diagnostics: filtered, directivesByLine };
  }

  getDeclarationDiagnosticsForFile(ctx: Context, sourceFile: SourceFile): readonly Diagnostic[] {
    void ctx;
    if (isDeclarationFile(sourceFile)) return [];
    const host = newProgramEmitHost(this);
    return getDeclarationDiagnosticsForEmit(host, sourceFile);
  }

  getSuggestionDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectCheckerDiagnostics(ctx, sourceFile, (diagnosticContext, checker, file) => {
      return this.getSuggestionDiagnosticsWithChecker(diagnosticContext, checker, file);
    });
  }

  getSuggestionDiagnosticsWithChecker(ctx: Context, fileChecker: Checker, sourceFile: SourceFile): readonly Diagnostic[] {
    void ctx;
    if (this.skipTypeChecking(sourceFile, false)) return [];
    const bindSuggestionDiagnostics = (sourceFile as SourceFileWithDiagnosticSlots).bindSuggestionDiagnostics ?? [];
    const checkerDiagnostics = (fileChecker as CheckerWithSuggestions).getSuggestionDiagnostics?.(ctx, sourceFile) ?? [];
    return [...bindSuggestionDiagnostics, ...checkerDiagnostics];
  }

  getLegacySemanticDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectCheckerDiagnostics(ctx, sourceFile, (_c, checker, file) => {
      const result = checker.checkSourceFile(file);
      return result.diagnostics.map(diagnostic => diagnosticFromText(diagnostic.message, file));
    });
  }

  getOptionsDiagnostics(ctx: Context): readonly Diagnostic[] { void ctx; return []; }
  getProgramDiagnostics(): readonly Diagnostic[] {
    return sortAndDeduplicateDiagnostics([...this.programDiagnostics, ...this.configFileParsingDiagnostics]);
  }

  getSourceFileForResolvedModule(fileName: string): SourceFile | undefined {
    return this.getSourceFile(fileName) ?? this.getSourceFile(this.getParseFileRedirect(fileName));
  }

  getSourceFileByPath(path: string): SourceFile | undefined {
    return this.filesByPath.get(path);
  }

  hasSameFileNames(other: Program): boolean {
    if (this.filesByPath.size !== other.filesByPath.size) return false;
    for (const [path, file] of this.filesByPath) {
      if (other.filesByPath.get(path)?.fileName !== file.fileName) return false;
    }
    return true;
  }

  getSemanticDiagnosticsWithoutNoEmitFiltering(ctx: Context, sourceFiles: readonly SourceFile[]): ReadonlyMap<SourceFile, readonly Diagnostic[]> {
    const diagnostics = this.collectCheckerDiagnosticsFromFiles(ctx, sourceFiles, (_c, checker, file) => {
      const result = checker.checkSourceFile(file);
      return result.diagnostics.map(diagnostic => diagnosticFromText(diagnostic.message, file));
    });
    const result = new Map<SourceFile, readonly Diagnostic[]>();
    for (let index = 0; index < sourceFiles.length; index += 1) {
      result.set(sourceFiles[index]!, sortAndDeduplicateDiagnostics(diagnostics[index] ?? []));
    }
    return result;
  }

  getIncludeProcessorDiagnostics(sourceFile: SourceFile): readonly Diagnostic[] {
    if (this.skipTypeChecking(sourceFile, false)) return [];
    const record = sourceFile as SourceFileWithDiagnosticSlots;
    return sortAndDeduplicateDiagnostics(record.includeDiagnostics ?? []);
  }

  getSourceFiles(): readonly SourceFile[] {
    return this.files;
  }

  filesByPathMap(): ReadonlyMap<string, SourceFile> {
    return this.filesByPath;
  }

  skipTypeChecking(sourceFile: SourceFile, ignoreNoCheck: boolean): boolean {
    if (!ignoreNoCheck && booleanCompilerOption(this.options(), "noCheck")) return true;
    if (isDeclarationFile(sourceFile) && booleanCompilerOption(this.options(), "skipLibCheck")) return true;
    if (this.isSourceFileDefaultLibrary(this.toPath(sourceFile.fileName)) && booleanCompilerOption(this.options(), "skipDefaultLibCheck")) return true;
    if (this.isSourceFromProjectReference(this.toPath(sourceFile.fileName))) return true;
    return !this.canIncludeBindAndCheckDiagnostics(sourceFile);
  }

  // 1:1 port of TS-Go `(*Program).canIncludeBindAndCheckDiagnostics`.
  canIncludeBindAndCheckDiagnostics(sourceFile: SourceFile): boolean {
    const checkJsDirective = (sourceFile as SourceFileWithDiagnosticSlots).checkJsDirective;
    if (checkJsDirective !== undefined && checkJsDirective.enabled === false) {
      return false;
    }

    if (sourceFile.scriptKind === ScriptKind.TS || sourceFile.scriptKind === ScriptKind.TSX || sourceFile.scriptKind === ScriptKind.External) {
      return true;
    }

    const isJS = sourceFile.scriptKind === ScriptKind.JS || sourceFile.scriptKind === ScriptKind.JSX;
    const isCheckJS = isJS && isCheckJSEnabledForFile(sourceFile, this.options());
    const isPlainJS = isPlainJSFile(sourceFile, this.options());

    // By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and
    // External (plugins). Plain JS = .js with no // ts-check and checkJs
    // undefined; check JS = .js with // ts-check or checkJs:true.
    return isPlainJS || isCheckJS || sourceFile.scriptKind === ScriptKind.Deferred;
  }

  blockEmittingOfFile(emitFileName: string, diagnostic: Diagnostic): void {
    this.emitBlockingDiagnostics.add(this.toPath(emitFileName));
    this.programDiagnostics.push(diagnostic);
  }

  isEmitBlocked(emitFileName: string): boolean {
    return this.emitBlockingDiagnostics.has(this.toPath(emitFileName));
  }

  verifyCompilerOptions(): void {
    const options = this.options();
    const addOptionDiagnostic = (message: string) => this.programDiagnostics.push(diagnosticFromText(message));
    const removed = (name: string, value?: string, useInstead?: string) => {
      const valueText = value === undefined ? "" : ` '${value}'`;
      const replacementText = useInstead === undefined ? "" : ` Use ${useInstead} instead.`;
      addOptionDiagnostic(`Option '${name}'${valueText} has been removed. Please remove it from your configuration.${replacementText}`);
    };
    if (stringOption(options, "baseUrl") !== "") removed("baseUrl", undefined, `"paths": {"*": ["./" + "*"]}`);
    if (stringOption(options, "outFile") !== "") removed("outFile");
    if (stringOption(options, "target").toLowerCase() === "es5" || numberOption(options, "target") === 1) removed("target", "ES5");
    const moduleValue = stringOption(options, "module").toLowerCase();
    if (moduleValue === "amd" || moduleValue === "system" || moduleValue === "umd") removed("module", moduleValue.toUpperCase());
    const moduleResolutionValue = stringOption(options, "moduleResolution").toLowerCase();
    if (moduleResolutionValue === "classic") removed("moduleResolution", "Classic");
    if (moduleResolutionValue === "node10") removed("moduleResolution", "node10");
    if (booleanOption(options, "alwaysStrict") === false) removed("alwaysStrict", "false");
    if (booleanOption(options, "esModuleInterop") === false) removed("esModuleInterop", "false");
    if (booleanOption(options, "allowSyntheticDefaultImports") === false) removed("allowSyntheticDefaultImports", "false");
    if (hasOwnOption(options, "downlevelIteration")) removed("downlevelIteration");
    if (booleanOption(options, "strictPropertyInitialization") === true && booleanOption(options, "strictNullChecks") !== true) {
      addOptionDiagnostic("Option 'strictPropertyInitialization' cannot be specified without option 'strictNullChecks'.");
    }
    if (booleanOption(options, "exactOptionalPropertyTypes") === true && booleanOption(options, "strictNullChecks") !== true) {
      addOptionDiagnostic("Option 'exactOptionalPropertyTypes' cannot be specified without option 'strictNullChecks'.");
    }
    if (booleanOption(options, "isolatedDeclarations") === true) {
      if (booleanOption(options, "allowJs") === true) addOptionDiagnostic("Option 'isolatedDeclarations' cannot be specified with option 'allowJs'.");
      if (!this.getEmitDeclarations()) addOptionDiagnostic("Option 'isolatedDeclarations' cannot be specified without option 'declaration' or 'composite'.");
    }
    if (booleanOption(options, "inlineSourceMap") === true) {
      if (booleanOption(options, "sourceMap") === true) addOptionDiagnostic("Option 'sourceMap' cannot be specified with option 'inlineSourceMap'.");
      if (stringOption(options, "mapRoot") !== "") addOptionDiagnostic("Option 'mapRoot' cannot be specified with option 'inlineSourceMap'.");
    }
    if (booleanOption(options, "composite") === true) {
      if (booleanOption(options, "declaration") === false) addOptionDiagnostic("Composite projects may not disable declaration emit.");
      if (booleanOption(options, "incremental") === false) addOptionDiagnostic("Composite projects may not disable incremental compilation.");
    }
    if (booleanOption(options, "incremental") === true && stringOption(options, "tsBuildInfoFile") === "" && this.configFilePath() === "") {
      addOptionDiagnostic("Option 'incremental' is only valid with a known configuration file or an explicit 'tsBuildInfoFile'.");
    }
    this.verifyPathsOptions(options, addOptionDiagnostic);
    if (booleanOption(options, "inlineSources") === true && booleanOption(options, "sourceMap") !== true && booleanOption(options, "inlineSourceMap") !== true) {
      addOptionDiagnostic("Option 'inlineSources' can only be used when 'sourceMap' or 'inlineSourceMap' is provided.");
    }
    if (stringOption(options, "sourceRoot") !== "" && booleanOption(options, "sourceMap") !== true && booleanOption(options, "inlineSourceMap") !== true) {
      addOptionDiagnostic("Option 'sourceRoot' can only be used when 'sourceMap' or 'inlineSourceMap' is provided.");
    }
    if (stringOption(options, "mapRoot") !== "" && booleanOption(options, "sourceMap") !== true && booleanOption(options, "declarationMap") !== true) {
      addOptionDiagnostic("Option 'mapRoot' cannot be specified without 'sourceMap' or 'declarationMap'.");
    }
    if (stringOption(options, "declarationDir") !== "" && !this.getEmitDeclarations()) {
      addOptionDiagnostic("Option 'declarationDir' cannot be specified without option 'declaration' or 'composite'.");
    }
    if (booleanOption(options, "declarationMap") === true && !this.getEmitDeclarations()) {
      addOptionDiagnostic("Option 'declarationMap' cannot be specified without option 'declaration' or 'composite'.");
    }
    if (Array.isArray((options as Record<string, unknown>).lib) && booleanOption(options, "noLib") === true) {
      addOptionDiagnostic("Option 'lib' cannot be specified with option 'noLib'.");
    }
    if ((booleanOption(options, "isolatedModules") === true || booleanOption(options, "verbatimModuleSyntax") === true) && booleanOption(options, "preserveConstEnums") === false) {
      addOptionDiagnostic("Option 'preserveConstEnums' cannot be disabled when 'isolatedModules' or 'verbatimModuleSyntax' is enabled.");
    }
    if (booleanOption(options, "checkJs") === true && booleanOption(options, "allowJs") !== true) {
      addOptionDiagnostic("Option 'checkJs' cannot be specified without option 'allowJs'.");
    }
    if (booleanOption(options, "emitDeclarationOnly") === true && !this.getEmitDeclarations()) {
      addOptionDiagnostic("Option 'emitDeclarationOnly' cannot be specified without option 'declaration' or 'composite'.");
    }
    if (booleanOption(options, "emitDecoratorMetadata") === true && booleanOption(options, "experimentalDecorators") !== true) {
      addOptionDiagnostic("Option 'emitDecoratorMetadata' cannot be specified without option 'experimentalDecorators'.");
    }
    this.verifyJsxOptions(options, addOptionDiagnostic);
    this.verifyModuleResolutionOptions(options, addOptionDiagnostic);
    this.verifyEmitFilePaths(addOptionDiagnostic);
    this.verifyProjectReferences();
  }

  verifyProjectReferences(): void {
    const buildInfoFileName = stringOption(this.options(), "suppressOutputPathCheck") === "true" ? "" : this.buildInfoFileName();
    this.rangeResolvedProjectReference((path, config, parent, index) => {
      const parentName = parent?.configName() ?? this.opts.config.configName();
      if (config === undefined) {
        this.programDiagnostics.push(diagnosticFromText(`Referenced project '${path}' from '${parentName}' was not found.`));
        return true;
      }
      const refOptions = config.parsedConfig.compilerOptions as CompilerOptions;
      if (booleanOption(refOptions, "composite") !== true) {
        this.programDiagnostics.push(diagnosticFromText(`Referenced project '${config.configName()}' must have setting composite: true.`));
      }
      if (booleanOption(refOptions, "noEmit") === true) {
        this.programDiagnostics.push(diagnosticFromText(`Referenced project '${config.configName()}' may not disable emit.`));
      }
      if (buildInfoFileName !== "" && buildInfoFileName === this.getBuildInfoFileName(config)) {
        this.blockEmittingOfFile(buildInfoFileName, diagnosticFromText(`Cannot write file '${buildInfoFileName}' because it would overwrite tsbuildinfo from referenced project at index ${index}.`));
      }
      return true;
    });
  }

  commonSourceDirectory(): string {
    if (this.commonSourceDirectoryComputed) return this.commonSourceDirectoryValue;
    const emitted = this.files.filter(file => sourceFileMayBeEmitted(file, this, false)).map(file => file.fileName);
    this.commonSourceDirectoryValue = commonSourceDirectory(emitted, this.getCurrentDirectory());
    this.commonSourceDirectoryComputed = true;
    return this.commonSourceDirectoryValue;
  }

  getSourceFilesToEmit(targetSourceFile: SourceFile | undefined, forceDtsEmit: boolean): readonly SourceFile[] {
    if (targetSourceFile === undefined && !forceDtsEmit) {
      this.sourceFilesToEmitValue ??= getSourceFilesToEmit(this, undefined, false);
      return this.sourceFilesToEmitValue;
    }
    return getSourceFilesToEmit(this, targetSourceFile, forceDtsEmit);
  }

  sourceFileMayBeEmitted(sourceFile: SourceFile, forceDtsEmit: boolean): boolean {
    return sourceFileMayBeEmitted(sourceFile, this, forceDtsEmit);
  }

  isSourceFileDefaultLibrary(path: string): boolean {
    const defaultLibraryPath = this.defaultLibraryPath();
    return defaultLibraryPath !== "" && this.toPath(path).startsWith(this.toPath(defaultLibraryPath));
  }

  defaultLibraryPath(): string {
    const host = this.opts.host as CompilerHost & { defaultLibraryPath?: string; getDefaultLibraryPath?: () => string };
    return host.getDefaultLibraryPath?.() ?? host.defaultLibraryPath ?? "";
  }

  getCanonicalFileName(fileName: string): string {
    return this.useCaseSensitiveFileNames() ? fileName : fileName.toLowerCase();
  }

  hasTSFile(): boolean {
    if (this.hasTSFileValue !== undefined) return this.hasTSFileValue;
    this.hasTSFileValue = this.files.some(file => {
      const extension = lowerExtension(file.fileName);
      return extension === ".ts" || extension === ".tsx" || extension === ".mts" || extension === ".cts";
    });
    return this.hasTSFileValue;
  }

  getModeForUsageLocation(file: SourceFile, moduleSpecifier: AstNode | undefined): number {
    void moduleSpecifier;
    return (file as SourceFileWithDiagnosticSlots).impliedNodeFormat ?? 0;
  }

  getSourceFileMetaData(path: string): SourceFileMetaData {
    const record = this.filesByPath.get(path) as SourceFileWithDiagnosticSlots | undefined;
    return {
      impliedNodeFormat: record?.impliedNodeFormat ?? 0,
      packageJsonType: record?.packageJsonType ?? "",
      packageJsonDirectory: record?.packageJsonDirectory ?? "",
    };
  }

  getEmitModuleFormatOfFile(sourceFile: SourceFile): number {
    return this.getImpliedNodeFormatForEmit(sourceFile);
  }

  getEmitSyntaxForUsageLocation(sourceFile: SourceFile, location: AstNode | undefined): number {
    return this.getModeForUsageLocation(sourceFile, location);
  }

  getImpliedNodeFormatForEmit(sourceFile: SourceFile): number {
    const metadata = this.getSourceFileMetaData(this.toPath(sourceFile.fileName));
    return metadata.impliedNodeFormat ?? this.getDefaultResolutionModeForFile(sourceFile);
  }

  getDefaultResolutionModeForFile(sourceFile: SourceFile): number {
    const metadata = this.getSourceFileMetaData(this.toPath(sourceFile.fileName));
    return metadata.impliedNodeFormat ?? 0;
  }

  isGlobalTypingsFile(fileName: string): boolean {
    const path = this.toPath(fileName);
    return path.includes("/@types/") || path.endsWith("/node_modules/@types/index.d.ts");
  }

  getDefaultLibFile(path: string): LibFile | undefined {
    return this.libFiles.get(this.toPath(path));
  }

  /**
   * Produce real JavaScript output. This is the single product JS emit path:
   * it delegates to the shared {@link emitProgramJs} helper, which composes the
   * canonical source-file selection + output pathing with the working `emit-js`
   * printer and writes through the program emit host. `noEmit` is enforced by
   * the caller (`getSourceFilesToEmit` returns nothing meaningful otherwise);
   * `noEmitOnError`, per-file `isEmitBlocked`, and source-file selection are
   * honored inside the helper.
   *
   * HONEST SCOPE: only `.js` is emitted. Declaration (`.d.ts`) and source-map
   * (`.js.map`) emit are deferred and are NOT produced here.
   */
  emit(ctx: Context, options: EmitOptions = {}): EmitResult {
    if (emitFlagIsOn(this.options(), "noEmit")) {
      return { emitSkipped: true, diagnostics: [], emittedFiles: [], sourceMaps: [] };
    }
    return emitProgramJs(this, ctx, options);
  }

  lineCount(): number {
    let total = 0;
    for (const file of this.files) total += lineCount(file.text);
    return total;
  }

  identifierCount(): number {
    let total = 0;
    for (const file of this.files) total += countIdentifiers(file.text);
    return total;
  }

  symbolCount(): number {
    return this.identifierCount();
  }

  typeCount(): number {
    return 0;
  }

  instantiationCount(): number {
    return 0;
  }

  program(): Program {
    return this;
  }

  checkSourceFilesBelongToPath(sourceFiles: readonly string[], rootDirectory: string): boolean {
    const root = this.toPath(rootDirectory.endsWith("/") ? rootDirectory : `${rootDirectory}/`);
    for (const file of sourceFiles) {
      if (!this.toPath(file).startsWith(root)) return false;
    }
    return true;
  }

  getIncludeReasons(): ReadonlyMap<string, readonly FileIncludeReason[]> {
    return this.fileReasons;
  }

  isMissingPath(path: string): boolean {
    return this.missingPaths.has(this.toPath(path));
  }

  explainFiles(write: (text: string) => void): void {
    // 1:1 with TS-Go `(*Program).ExplainFiles`: each include reason is rendered
    // through the canonical `FileIncludeReason.toDiagnostic` so the explanation
    // text matches the diagnostic surface exactly.
    const reasons = this.getIncludeReasons();
    for (const file of this.files) {
      write(file.fileName);
      const fileReasons = reasons.get(this.toPath(file.fileName)) ?? [];
      for (const reason of fileReasons) {
        write(`\n  ${includeReasonToDiagnostic(reason, this, true).text}`);
      }
      write("\n");
    }
  }

  getLibFileFromReference(ref: FileReference): SourceFile | undefined {
    const libName = ref.fileName;
    for (const [path, libFile] of this.libFiles) {
      if (libFile.name === libName || libFile.fileName === libName || path.endsWith(`/${libName}`)) {
        return this.filesByPath.get(path);
      }
    }
    return undefined;
  }

  getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(
    typeRef: FileReference,
    sourceFile: SourceFile,
  ): ResolvedTypeReferenceDirective | undefined {
    return this.typeResolutionsInFile.get(this.toPath(sourceFile.fileName))?.get(typeRef.fileName);
  }

  getResolvedTypeReferenceDirectives(): ReadonlyMap<string, ReadonlyMap<string, ResolvedTypeReferenceDirective>> {
    return this.typeResolutionsInFile;
  }

  getModeForTypeReferenceDirectiveInFile(ref: FileReference, sourceFile: SourceFile): number {
    return ref.resolutionMode !== 0 ? ref.resolutionMode : this.getDefaultResolutionModeForFile(sourceFile);
  }

  isSourceFileFromExternalLibrary(file: SourceFile): boolean {
    const path = this.toPath(file.fileName);
    return path.includes("/node_modules/") && !this.isSourceFileDefaultLibrary(path);
  }

  getJSXRuntimeImportSpecifier(path: string): { moduleReference: string; specifier: AstNode } | undefined {
    return this.jsxRuntimeImportSpecifiers.get(this.toPath(path));
  }

  getImportHelpersImportSpecifier(path: string): AstNode | undefined {
    return this.importHelpersImportSpecifiers.get(this.toPath(path));
  }

  resolvedPackageNames(): Set<string> {
    return this.collectPackageNames().resolved;
  }

  unresolvedPackageNames(): Set<string> {
    return this.collectPackageNames().unresolved;
  }

  deepImportPackageNames(): Set<string> {
    return this.collectPackageNames().deepImports;
  }

  collectPackageNames(): PackageNameSets {
    const resolved = new Set<string>();
    const unresolved = new Set(this.getUnresolvedImports());
    const deepImports = new Set<string>();
    for (const modules of this.resolvedModulesCache.values()) {
      for (const [moduleName, resolvedModule] of modules) {
        const packageName = getPackageNameFromModuleName(moduleName);
        if (packageName === "") continue;
        if (moduleIsResolved(resolvedModule)) resolved.add(packageName);
        else unresolved.add(packageName);
        if (moduleName !== packageName) deepImports.add(packageName);
      }
    }
    return { resolved, unresolved, deepImports };
  }

  isLibFile(sourceFile: SourceFile): boolean {
    return this.libFiles.has(this.toPath(sourceFile.fileName));
  }

  getSymlinkCache(): undefined {
    return undefined;
  }

  resolveModuleName(moduleName: string, containingFile: string, resolutionMode: number): ResolvedModule | undefined {
    const sourceFile = this.getSourceFile(containingFile);
    if (sourceFile === undefined) return undefined;
    return this.getResolvedModule(sourceFile, moduleName, resolutionMode);
  }

  forEachResolvedModule(
    callback: (resolution: ResolvedModule, moduleName: string, mode: number, filePath: string) => void,
    file: SourceFile | undefined,
  ): void {
    const visit = (filePath: string, modules: ReadonlyMap<string, ResolvedModule>) => {
      for (const [moduleName, resolution] of modules) callback(resolution, moduleName, 0, filePath);
    };
    if (file !== undefined) {
      const filePath = this.toPath(file.fileName);
      const modules = this.resolvedModulesCache.get(filePath);
      if (modules !== undefined) visit(filePath, modules);
      return;
    }
    for (const [filePath, modules] of this.resolvedModulesCache) visit(filePath, modules);
  }

  forEachResolvedTypeReferenceDirective(
    callback: (resolution: ResolvedTypeReferenceDirective, moduleName: string, mode: number, filePath: string) => void,
    file: SourceFile | undefined,
  ): void {
    const visit = (filePath: string, resolutions: ReadonlyMap<string, ResolvedTypeReferenceDirective>) => {
      for (const [moduleName, resolution] of resolutions) callback(resolution, moduleName, 0, filePath);
    };
    if (file !== undefined) {
      const filePath = this.toPath(file.fileName);
      const resolutions = this.typeResolutionsInFile.get(filePath);
      if (resolutions !== undefined) visit(filePath, resolutions);
      return;
    }
    for (const [filePath, resolutions] of this.typeResolutionsInFile) visit(filePath, resolutions);
  }

  private verifyPathsOptions(options: CompilerOptions, addDiagnostic: (message: string) => void): void {
    const paths = (options as Record<string, unknown>).paths;
    if (paths === undefined || paths === null || typeof paths !== "object" || Array.isArray(paths)) return;
    for (const [key, value] of Object.entries(paths as Record<string, unknown>)) {
      if (!hasZeroOrOneAsteriskCharacter(key)) addDiagnostic(`Pattern '${key}' can have at most one '*' character.`);
      if (!Array.isArray(value)) {
        addDiagnostic(`Substitutions for pattern '${key}' should be an array.`);
        continue;
      }
      if (value.length === 0) addDiagnostic(`Substitutions for pattern '${key}' should not be an empty array.`);
      for (const substitution of value) {
        if (typeof substitution !== "string") continue;
        if (!hasZeroOrOneAsteriskCharacter(substitution)) addDiagnostic(`Substitution '${substitution}' in pattern '${key}' can have at most one '*' character.`);
        if (!pathIsRelative(substitution) && !substitution.startsWith("/")) addDiagnostic("Non-relative paths are not allowed in 'paths' substitutions.");
      }
    }
  }

  private verifyJsxOptions(options: CompilerOptions, addDiagnostic: (message: string) => void): void {
    const jsxFactory = stringOption(options, "jsxFactory");
    const jsxFragmentFactory = stringOption(options, "jsxFragmentFactory");
    const reactNamespace = stringOption(options, "reactNamespace");
    const jsx = stringOption(options, "jsx").toLowerCase();
    if (jsxFactory !== "") {
      if (reactNamespace !== "") addDiagnostic("Option 'reactNamespace' cannot be specified with option 'jsxFactory'.");
      if (jsx === "react-jsx" || jsx === "react-jsxdev") addDiagnostic(`Option 'jsxFactory' cannot be specified when option 'jsx' is '${jsx}'.`);
      if (!isDottedIdentifier(jsxFactory)) addDiagnostic(`Invalid value for 'jsxFactory': '${jsxFactory}' is not a valid identifier or qualified name.`);
    } else if (reactNamespace !== "" && !isIdentifierText(reactNamespace)) {
      addDiagnostic(`Invalid value for 'reactNamespace': '${reactNamespace}' is not a valid identifier.`);
    }
    if (jsxFragmentFactory !== "") {
      if (jsxFactory === "") addDiagnostic("Option 'jsxFragmentFactory' cannot be specified without option 'jsxFactory'.");
      if (jsx === "react-jsx" || jsx === "react-jsxdev") addDiagnostic(`Option 'jsxFragmentFactory' cannot be specified when option 'jsx' is '${jsx}'.`);
      if (!isDottedIdentifier(jsxFragmentFactory)) addDiagnostic(`Invalid value for 'jsxFragmentFactory': '${jsxFragmentFactory}' is not a valid identifier or qualified name.`);
    }
    if (reactNamespace !== "" && (jsx === "react-jsx" || jsx === "react-jsxdev")) {
      addDiagnostic(`Option 'reactNamespace' cannot be specified when option 'jsx' is '${jsx}'.`);
    }
    if (stringOption(options, "jsxImportSource") !== "" && jsx === "react") {
      addDiagnostic("Option 'jsxImportSource' cannot be specified when option 'jsx' is 'react'.");
    }
  }

  private verifyModuleResolutionOptions(options: CompilerOptions, addDiagnostic: (message: string) => void): void {
    const moduleKind = stringOption(options, "module").toLowerCase();
    const moduleResolution = stringOption(options, "moduleResolution").toLowerCase();
    if (booleanOption(options, "allowImportingTsExtensions") === true
      && booleanOption(options, "noEmit") !== true
      && booleanOption(options, "emitDeclarationOnly") !== true
      && booleanOption(options, "rewriteRelativeImportExtensions") !== true) {
      addDiagnostic("Option 'allowImportingTsExtensions' can only be used when 'noEmit', 'emitDeclarationOnly', or 'rewriteRelativeImportExtensions' is set.");
    }
    if (booleanOption(options, "resolvePackageJsonExports") === true && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
      addDiagnostic("Option 'resolvePackageJsonExports' can only be used with moduleResolution 'node16', 'nodenext', or 'bundler'.");
    }
    if (booleanOption(options, "resolvePackageJsonImports") === true && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
      addDiagnostic("Option 'resolvePackageJsonImports' can only be used with moduleResolution 'node16', 'nodenext', or 'bundler'.");
    }
    if (Array.isArray((options as Record<string, unknown>).customConditions) && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
      addDiagnostic("Option 'customConditions' can only be used with moduleResolution 'node16', 'nodenext', or 'bundler'.");
    }
    if (moduleResolution === "bundler" && !emitModuleKindIsNonNodeEsm(moduleKind) && moduleKind !== "preserve" && moduleKind !== "commonjs") {
      addDiagnostic("Option 'moduleResolution' value 'bundler' can only be used when 'module' is 'preserve', 'commonjs', or 'es2015' or later.");
    }
    if ((moduleKind === "node16" || moduleKind === "nodenext") && moduleResolution !== "" && moduleResolution !== moduleKind) {
      addDiagnostic(`Option 'moduleResolution' must be set to '${moduleKind}' or left unspecified when option 'module' is '${moduleKind}'.`);
    }
    if ((moduleResolution === "node16" || moduleResolution === "nodenext") && moduleKind !== moduleResolution) {
      addDiagnostic(`Option 'module' must be set to '${moduleResolution}' when option 'moduleResolution' is '${moduleResolution}'.`);
    }
  }

  private verifyEmitFilePaths(addDiagnostic: (message: string) => void): void {
    if (booleanOption(this.options(), "noEmit") === true || booleanOption(this.options(), "suppressOutputPathCheck") === true) return;
    const seen = new Set<string>();
    for (const file of this.files) {
      if (!sourceFileMayBeEmitted(file, this, false)) continue;
      for (const emitFileName of this.emitFileNames(file)) {
        if (emitFileName === "") continue;
        const emitPath = this.toPath(emitFileName);
        if (this.filesByPath.has(emitPath)) {
          const diagnostic = diagnosticFromText(`Cannot write file '${emitFileName}' because it would overwrite input file.`);
          this.blockEmittingOfFile(emitFileName, diagnostic);
          continue;
        }
        const key = this.useCaseSensitiveFileNames() ? emitPath : emitPath.toLowerCase();
        if (seen.has(key)) {
          const diagnostic = diagnosticFromText(`Cannot write file '${emitFileName}' because it would be overwritten by multiple input files.`);
          this.blockEmittingOfFile(emitFileName, diagnostic);
        } else {
          seen.add(key);
        }
      }
    }
    if (this.emitBlockingDiagnostics.size > 0) addDiagnostic("One or more output files conflict with input or emitted files.");
  }

  private emitFileNames(file: SourceFile): readonly string[] {
    const input = file.fileName;
    const outDir = stringOption(this.options(), "outDir");
    const base = outDir === "" ? replaceExtension(input, "") : `${outDir}/${baseFileName(replaceExtension(input, ""))}`;
    const out: string[] = [];
    if (!isDeclarationFile(file) && !isJsonSourceFile(file)) out.push(`${base}.js`);
    if (booleanOption(this.options(), "sourceMap") === true) out.push(`${base}.js.map`);
    if (this.getEmitDeclarations()) out.push(`${base}.d.ts`);
    if (booleanOption(this.options(), "declarationMap") === true) out.push(`${base}.d.ts.map`);
    return out;
  }

  private getEmitDeclarations(): boolean {
    const options = this.options();
    return booleanOption(options, "declaration") === true || booleanOption(options, "composite") === true;
  }

  private configFilePath(): string {
    return stringOption(this.options(), "configFilePath") || this.opts.config.configName();
  }

  private buildInfoFileName(): string {
    return stringOption(this.options(), "tsBuildInfoFile") || `${this.configFilePath() || "tsconfig"}.tsbuildinfo`;
  }

  private getBuildInfoFileName(config: ParsedCommandLine): string {
    const options = config.parsedConfig.compilerOptions as CompilerOptions;
    return stringOption(options, "tsBuildInfoFile") || `${config.configName()}.tsbuildinfo`;
  }
}

// ---------------------------------------------------------------------------
// Module-level entries
// ---------------------------------------------------------------------------

export function newProgram(opts: ProgramOptions): Program {
  return new Program(opts);
}

export function canReplaceFileInProgram(file1: SourceFile, file2: SourceFile): boolean {
  // Both files must agree on referenced imports + module augmentations
  // + JSDoc directives. Conservative: only allow replacement when text
  // is identical (same fileName + same parseDiagnostics length).
  const a = file1;
  const b = file2;
  return a.fileName === b.fileName
    && a.parseDiagnostics.length === b.parseDiagnostics.length
    && a.text === b.text;
}

export function equalModuleSpecifiers(n1: AstNode | undefined, n2: AstNode | undefined): boolean {
  if (n1 === undefined && n2 === undefined) return true;
  if (n1 === undefined || n2 === undefined) return false;
  return nodeText(n1) === nodeText(n2);
}

export function equalModuleAugmentationNames(n1: AstNode | undefined, n2: AstNode | undefined): boolean {
  return equalModuleSpecifiers(n1, n2);
}

export function equalFileReferences(f1: FileReference | undefined, f2: FileReference | undefined): boolean {
  if (f1 === undefined && f2 === undefined) return true;
  if (f1 === undefined || f2 === undefined) return false;
  return f1.fileName === f2.fileName;
}

export function equalCheckJSDirectives(d1: CheckJsDirective | undefined, d2: CheckJsDirective | undefined): boolean {
  if (d1 === undefined && d2 === undefined) return true;
  if (d1 === undefined || d2 === undefined) return false;
  return d1.enabled === d2.enabled;
}

export function getAdditionalJSSyntacticDiagnostics(
  file: SourceFile, options: CompilerOptions,
): readonly Diagnostic[] {
  void file; void options; return [];
}

export function sortAndDeduplicateDiagnostics(diagnostics: readonly Diagnostic[]): readonly Diagnostic[] {
  const seen = new Set<string>();
  const result: Diagnostic[] = [];
  for (const diagnostic of [...diagnostics].sort(compareDiagnostics)) {
    const key = `${diagnostic.file?.fileName ?? ""}:${diagnostic.start ?? -1}:${diagnostic.length ?? -1}:${diagnostic.code}:${diagnostic.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(diagnostic);
  }
  return result;
}

export function combineEmitResults(results: readonly EmitResult[]): EmitResult {
  const combined: EmitResult = { emitSkipped: false, diagnostics: [], emittedFiles: [], sourceMaps: [] };
  for (const result of results) {
    combined.emitSkipped = combined.emitSkipped || result.emitSkipped;
    combined.diagnostics.push(...result.diagnostics);
    combined.emittedFiles.push(...result.emittedFiles);
    combined.sourceMaps.push(...result.sourceMaps);
  }
  return combined;
}

export function handleNoEmitOnError(
  ctx: Context,
  program: Program,
  file: SourceFile | undefined,
): EmitResult | undefined {
  if (!emitFlagIsOn(program.options(), "noEmitOnError")) return undefined;
  const diagnostics = getDiagnosticsOfAnyProgram(ctx, program, file, true);
  return diagnostics.length === 0
    ? undefined
    : { emitSkipped: true, diagnostics: [...diagnostics], emittedFiles: [], sourceMaps: [] };
}

export function getDiagnosticsOfAnyProgram(
  ctx: Context,
  program: Program,
  file: SourceFile | undefined,
  skipNoEmitCheckForDtsDiagnostics: boolean,
): readonly Diagnostic[] {
  const diagnostics: Diagnostic[] = [...program.getConfigFileParsingDiagnostics()];
  const configDiagnosticsLength = diagnostics.length;
  diagnostics.push(...program.getSyntacticDiagnostics(ctx, file));
  diagnostics.push(...program.getProgramDiagnostics());
  if (diagnostics.length === configDiagnosticsLength) {
    diagnostics.push(...program.getBindDiagnostics(ctx, file));
    diagnostics.push(...program.getGlobalDiagnostics(ctx));
    if (diagnostics.length === configDiagnosticsLength) {
      diagnostics.push(...program.getSemanticDiagnostics(ctx, file));
      diagnostics.push(...program.getGlobalDiagnostics(ctx));
    }
    if ((skipNoEmitCheckForDtsDiagnostics || booleanCompilerOption(program.options(), "noEmit")) && diagnostics.length === configDiagnosticsLength) {
      diagnostics.push(...program.getDeclarationDiagnostics(ctx, file));
    }
  }
  return sortAndDeduplicateDiagnostics(diagnostics);
}

export interface WriteFileData {
  sourceMapUrlPos?: number;
  buildInfo?: unknown;
  diagnostics: Diagnostic[];
  skippedDtsWrite?: boolean;
}

export type WriteFile = (fileName: string, text: string, data: WriteFileData) => void;

export interface EmitOptions {
  readonly targetSourceFile?: SourceFile;
  readonly emitOnly?: EmitOnly;
  readonly writeFile?: WriteFile;
}

export interface EmitResult {
  emitSkipped: boolean;
  diagnostics: Diagnostic[];
  emittedFiles: string[];
  sourceMaps: SourceMapEmitResult[];
}

export interface SourceMapEmitResult {
  readonly inputSourceFileNames: readonly string[];
  readonly sourceMap: unknown;
  readonly generatedFile: string;
}

// 1:1 port of TS-Go `internal/compiler/program.go` `type ProgramLike interface`.
// The diagnostic/emit surface shared by the full Program and any program-like
// wrapper (e.g. the build host). `Program` implements this structurally. The Go
// `context.Context` argument maps to the local `Context` token; `tspath.Path`
// is the local canonical `string` path.
export interface ProgramLike {
  options(): CompilerOptions;
  getSourceFile(path: string): SourceFile | undefined;
  getSourceFiles(): readonly SourceFile[];
  getConfigFileParsingDiagnostics(): readonly Diagnostic[];
  getSyntacticDiagnostics(ctx: Context, file: SourceFile | undefined): readonly Diagnostic[];
  getBindDiagnostics(ctx: Context, file: SourceFile | undefined): readonly Diagnostic[];
  getProgramDiagnostics(): readonly Diagnostic[];
  getGlobalDiagnostics(ctx: Context): readonly Diagnostic[];
  getSemanticDiagnostics(ctx: Context, file: SourceFile | undefined): readonly Diagnostic[];
  getDeclarationDiagnostics(ctx: Context, file: SourceFile | undefined): readonly Diagnostic[];
  getSuggestionDiagnostics(ctx: Context, file: SourceFile | undefined): readonly Diagnostic[];
  emit(ctx: Context, options: EmitOptions): EmitResult;
  commonSourceDirectory(): string;
  isSourceFileDefaultLibrary(path: string): boolean;
  program(): Program;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface Tracing { readonly _trace?: unknown }
interface Context { readonly _ctx?: unknown }
type EmitOnly = "none" | "dts" | "forcedDts";

interface SourceFileMetaData {
  readonly packageJsonType: string;
  readonly packageJsonDirectory: string;
  readonly impliedNodeFormat: number;
}

interface PackageNameSets {
  readonly resolved: Set<string>;
  readonly unresolved: Set<string>;
  readonly deepImports: Set<string>;
}

interface CommentDirectiveLike {
  readonly pos: number;
  readonly kind: "ignore" | "expect-error";
}

// Mirrors TS-Go `ast.CheckJsDirective` (the `// @ts-check` / `// @ts-nocheck`
// pragma resolved on a source file).
interface CheckJsDirective {
  readonly enabled?: boolean;
}

// Optional SourceFile slots that the binder / file-loader attach but that are
// not yet declared on the base AST SourceFile interface (upstream
// `ast.SourceFile` carries them as fields). Reading them through this
// augmentation keeps the access typed without a double-assertion escape hatch;
// absent slots simply read as `undefined`.
type SourceFileWithDiagnosticSlots = SourceFile & {
  readonly jsDocDiagnostics?: readonly Diagnostic[];
  readonly commentDirectives?: readonly CommentDirectiveLike[];
  readonly bindSuggestionDiagnostics?: readonly Diagnostic[];
  readonly includeDiagnostics?: readonly Diagnostic[];
  readonly impliedNodeFormat?: number;
  readonly packageJsonType?: string;
  readonly packageJsonDirectory?: string;
  readonly checkJsDirective?: { readonly enabled?: boolean };
};

// Optional checker method surface (the checker exposes suggestion diagnostics
// only when suggestion analysis is enabled). Typed augmentation, not a cast.
type CheckerWithSuggestions = Checker & {
  getSuggestionDiagnostics?(ctx: Context, file: SourceFile): readonly Diagnostic[];
};

const plainJSErrors = new Set<number>([
  80002,
  80004,
  80006,
  80007,
]);

// The parsed command line exposes compiler options through the lightweight
// `CompilerOptionsHandle` placeholder (a structural subset whose fields are a
// subset of the full core `CompilerOptions`). Until the two are unified by the
// core port, bridge the handle to `CompilerOptions` in one place. This is a
// single typed assertion across compatible shapes, not an `unknown` escape.
function compilerOptionsFromHandle(handle: CompilerOptionsHandle): CompilerOptions {
  return handle as CompilerOptions;
}

function moduleIsResolved(resolved: ResolvedModule): boolean {
  return (resolved as { readonly resolvedFileName?: string; readonly fileName?: string }).resolvedFileName !== undefined
    || (resolved as { readonly resolvedFileName?: string; readonly fileName?: string }).fileName !== undefined;
}

function isExternalModuleNameRelative(moduleName: string): boolean {
  return moduleName.startsWith("./") || moduleName.startsWith("../") || moduleName === "." || moduleName === "..";
}

function getPackageNameFromModuleName(moduleName: string): string {
  if (moduleName === "" || isExternalModuleNameRelative(moduleName) || moduleName.startsWith("/")) return "";
  const parts = moduleName.split("/");
  if (moduleName.startsWith("@")) {
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : moduleName;
  }
  return parts[0] ?? "";
}

function diagnosticFromText(text: string, file?: SourceFile): Diagnostic {
  return {
    message: {
      key: "TSTS_Compiler_Diagnostic",
      code: 0,
      category: DiagnosticCategory.Error,
      message: text,
    },
    ...(file === undefined ? {} : { file }),
    category: DiagnosticCategory.Error,
    code: 0,
    text,
  };
}

// Build a diagnostic from a generated catalog Message (code/key/category
// preserved), mirroring TS-Go `ast.NewDiagnostic(file, loc, message)`.
function diagnosticFromMessage(
  message: { code: number; key: string; category: DiagnosticCategory; message: string },
  file?: SourceFile,
): Diagnostic {
  return {
    message,
    ...(file === undefined ? {} : { file }),
    category: message.category,
    code: message.code,
    text: message.message,
  };
}

function compareDiagnostics(left: Diagnostic, right: Diagnostic): number {
  return (left.file?.fileName ?? "").localeCompare(right.file?.fileName ?? "")
    || (left.start ?? -1) - (right.start ?? -1)
    || left.code - right.code
    || left.text.localeCompare(right.text);
}

function filterNoEmitSemanticDiagnostics(diagnostics: readonly Diagnostic[], options: CompilerOptions): readonly Diagnostic[] {
  if (!booleanCompilerOption(options, "noEmit")) return diagnostics;
  return diagnostics.filter((diagnostic) => (diagnostic as { readonly skippedOnNoEmit?: boolean }).skippedOnNoEmit !== true);
}

function isPlainJSFile(file: SourceFile, options: CompilerOptions): boolean {
  return isSourceFileJS(file) && (file as { readonly checkJsDirective?: { readonly enabled?: boolean } }).checkJsDirective?.enabled !== true
    && booleanOption(options, "checkJs") !== true;
}

function isCheckJSEnabledForFile(file: SourceFile, options: CompilerOptions): boolean {
  return isSourceFileJS(file)
    && ((file as { readonly checkJsDirective?: { readonly enabled?: boolean } }).checkJsDirective?.enabled === true || booleanOption(options, "checkJs") === true);
}

function getLineStarts(text: string): readonly number[] {
  const starts = [0];
  for (let index = 0; index < text.length; index += 1) {
    const ch = text.charCodeAt(index);
    if (ch === 13 || ch === 10) {
      if (ch === 13 && text.charCodeAt(index + 1) === 10) index += 1;
      starts.push(index + 1);
    }
  }
  return starts;
}

function computeLineOfPosition(lineStarts: readonly number[], position: number): number {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const start = lineStarts[middle]!;
    const next = middle + 1 < lineStarts.length ? lineStarts[middle + 1]! : Number.MAX_SAFE_INTEGER;
    if (position < start) high = middle - 1;
    else if (position >= next) low = middle + 1;
    else return middle;
  }
  return Math.max(0, Math.min(lineStarts.length - 1, low));
}

function isCommentOrBlankLine(text: string, pos: number): boolean {
  let index = pos;
  while (index < text.length && (text.charCodeAt(index) === 32 || text.charCodeAt(index) === 9)) index += 1;
  if (index >= text.length) return true;
  const ch = text.charCodeAt(index);
  return ch === 13 || ch === 10 || (ch === 47 && text.charCodeAt(index + 1) === 47);
}

function isDeclarationFile(file: SourceFile): boolean {
  return file.fileName.endsWith(".d.ts") || (file as { readonly isDeclarationFile?: boolean }).isDeclarationFile === true;
}

function isJsonSourceFile(file: SourceFile): boolean {
  return file.fileName.endsWith(".json");
}

function booleanCompilerOption(options: CompilerOptions, name: string): boolean {
  return (options as Record<string, unknown>)[name] === true;
}

/**
 * Read an emit-gating flag that is canonically stored as a `Tristate`
 * (`CompilerOptions.noEmit` / `noEmitOnError` are typed `Tristate`). A raw
 * boolean `true` is also honored so hosts that populate the slim record with a
 * plain boolean still gate correctly. `Tristate.True` is the canonical "on".
 */
function emitFlagIsOn(options: CompilerOptions, name: string): boolean {
  const value = (options as Record<string, unknown>)[name];
  return value === true || value === Tristate.True;
}

function booleanOption(options: CompilerOptions, name: string): boolean | undefined {
  const value = (options as Record<string, unknown>)[name];
  return typeof value === "boolean" ? value : undefined;
}

function stringOption(options: CompilerOptions, name: string): string {
  const value = (options as Record<string, unknown>)[name];
  return typeof value === "string" ? value : "";
}

function numberOption(options: CompilerOptions, name: string): number | undefined {
  const value = (options as Record<string, unknown>)[name];
  return typeof value === "number" ? value : undefined;
}

function hasOwnOption(options: CompilerOptions, name: string): boolean {
  return Object.hasOwn(options as Record<string, unknown>, name);
}

function sourceFileMayBeEmitted(file: SourceFile, program: Program, forceDtsEmit: boolean): boolean {
  if (forceDtsEmit) return true;
  if (booleanCompilerOption(program.options(), "noEmitForJsFiles") && isSourceFileJS(file)) return false;
  if (isDeclarationFile(file)) return false;
  if (program.isSourceFileDefaultLibrary(program.toPath(file.fileName))) return false;
  if (program.getProjectReferenceFromSource?.(program.toPath(file.fileName)) !== undefined) return false;
  return isSourceFileNotJson(file);
}

function getSourceFilesToEmit(program: Program, targetSourceFile: SourceFile | undefined, forceDtsEmit: boolean): SourceFile[] {
  if (targetSourceFile !== undefined) {
    return sourceFileMayBeEmitted(targetSourceFile, program, forceDtsEmit) ? [targetSourceFile] : [];
  }
  return program.getSourceFiles().filter(file => sourceFileMayBeEmitted(file, program, forceDtsEmit));
}

function isSourceFileJS(file: SourceFile): boolean {
  const extension = lowerExtension(file.fileName);
  return extension === ".js" || extension === ".jsx" || extension === ".mjs" || extension === ".cjs";
}

function isSourceFileNotJson(file: SourceFile): boolean {
  return !isJsonSourceFile(file);
}

function lowerExtension(fileName: string): string {
  const slash = Math.max(fileName.lastIndexOf("/"), fileName.lastIndexOf("\\"));
  const dot = fileName.lastIndexOf(".");
  return dot > slash ? fileName.slice(dot).toLowerCase() : "";
}

function hasZeroOrOneAsteriskCharacter(text: string): boolean {
  let seen = false;
  for (const char of text) {
    if (char !== "*") continue;
    if (seen) return false;
    seen = true;
  }
  return true;
}

function moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution: string): boolean {
  return moduleResolution === "node16" || moduleResolution === "nodenext" || moduleResolution === "bundler";
}

function emitModuleKindIsNonNodeEsm(moduleKind: string): boolean {
  return moduleKind === "es2015"
    || moduleKind === "es2016"
    || moduleKind === "es2017"
    || moduleKind === "es2018"
    || moduleKind === "es2019"
    || moduleKind === "es2020"
    || moduleKind === "es2021"
    || moduleKind === "es2022"
    || moduleKind === "esnext";
}

function pathIsRelative(path: string): boolean {
  return path.startsWith("./") || path.startsWith("../") || path === "." || path === "..";
}

function isIdentifierText(text: string): boolean {
  return /^[$_\p{ID_Start}][$_\u200c\u200d\p{ID_Continue}]*$/u.test(text);
}

function isDottedIdentifier(text: string): boolean {
  return text.split(".").every(part => part.length > 0 && isIdentifierText(part));
}

function replaceExtension(fileName: string, extension: string): string {
  const slash = fileName.lastIndexOf("/");
  const dot = fileName.lastIndexOf(".");
  return dot > slash ? `${fileName.slice(0, dot)}${extension}` : `${fileName}${extension}`;
}

function baseFileName(fileName: string): string {
  const normalized = fileName.replaceAll("\\", "/");
  const index = normalized.lastIndexOf("/");
  return index === -1 ? normalized : normalized.slice(index + 1);
}

function commonSourceDirectory(files: readonly string[], currentDirectory: string): string {
  if (files.length === 0) return currentDirectory;
  const directories = files.map(file => getDirectoryPath(file));
  let prefix = directories[0] ?? currentDirectory;
  for (const directory of directories.slice(1)) {
    while (prefix !== "" && !(directory === prefix || directory.startsWith(`${prefix}/`))) {
      const next = getDirectoryPath(prefix);
      if (next === prefix) break;
      prefix = next;
    }
  }
  return prefix === "" ? currentDirectory : prefix;
}

function lineCount(text: string): number {
  if (text.length === 0) return 0;
  let count = 1;
  for (let index = 0; index < text.length; index += 1) {
    if (text.charCodeAt(index) === 10) count += 1;
  }
  return count;
}

function countIdentifiers(text: string): number {
  let count = 0;
  const matcher = /[$A-Z_a-z][$\w]*/g;
  while (matcher.exec(text) !== null) count += 1;
  return count;
}
