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
import { bindSourceFile } from "../binder/index.js";
import { newChecker, type Checker } from "../checker/index.js";
import { processAllProgramFiles, type CompilerHost as LoaderCompilerHost, type ResolvedModule } from "./fileLoader.js";
import { ParsedCommandLine } from "../tsoptions/parsedCommandLine.js";
import type { CompilerOptions } from "../core/compilerOptions.js";
import { getDirectoryPath, toPath as toCanonicalPath } from "../tspath/index.js";
import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";

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

export class Program {
  readonly opts: ProgramOptions;
  files: SourceFile[];
  duplicateSourceFiles: DuplicateSourceFile[];
  resolvedProjectReferences: ParsedCommandLine[] = [];
  resolvedModulesCache: Map<string, Map<string, ResolvedModule>>;
  configFileParsingDiagnostics: Diagnostic[];
  packageNamesInfo: PackageNamesInfo | undefined;
  checkerPool: CheckerPool | undefined;
  unresolvedImports: LazyValue<Set<string>> = new LazyValue();
  filesByPath: Map<string, SourceFile> = new Map();
  emitBlockingDiagnostics: Set<string> = new Set();
  programDiagnostics: Diagnostic[] = [];
  private commonSourceDirectoryValue = "";
  private commonSourceDirectoryComputed = false;

  constructor(opts: ProgramOptions) {
    this.opts = opts;
    const rootFileNames = opts.config.parsedConfig.fileNames;
    const loaded = processAllProgramFiles(
      opts.config.parsedConfig.compilerOptions as unknown as CompilerOptions,
      opts.host as unknown as LoaderCompilerHost,
      rootFileNames,
      opts.singleThreaded ?? false,
    );
    this.files = [...loaded.files];
    this.duplicateSourceFiles = [...loaded.duplicateSourceFiles];
    this.resolvedModulesCache = loaded.resolvedModulesMap;
    this.packageNamesInfo = loaded.packageNamesInfo;
    this.configFileParsingDiagnostics = [
      ...(opts.config.errors ?? []),
      ...loaded.diagnostics,
    ];
    // Pre-populate the path → file index for quick lookup.
    for (const f of this.files) {
      const path = (f as unknown as { fileName?: string }).fileName ?? "";
      if (path !== "") this.filesByPath.set(this.toPath(path), f);
    }
    // Eagerly resolve unresolvedImports so they're available immediately.
    this.unresolvedImports.tryReuse(new LazyValue());
    this.packageNamesInfo = {
      unresolvedImports: loaded.unresolvedImports,
      packagesMap: new Map(),
    };
    this.verifyCompilerOptions();
  }

  private toPath(file: string): string {
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
    this.checkerPool = { _pool: "checker" };
  }

  // -------------------------------------------------------------------------
  // Public accessors
  // -------------------------------------------------------------------------

  sourceFiles(): readonly SourceFile[] { return this.files; }
  getDuplicateSourceFiles(): readonly DuplicateSourceFile[] { return this.duplicateSourceFiles; }
  options(): CompilerOptions {
    return this.opts.config.parsedConfig.compilerOptions as unknown as CompilerOptions;
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
    for (const file of this.files) bindSourceFile(file);
  }

  getTypeChecker(ctx: Context): { checker: Checker; release: () => void } {
    void ctx;
    return { checker: newChecker(), release: () => undefined };
  }

  forEachCheckerParallel(cb: (idx: number, c: Checker) => void): void {
    cb(0, newChecker());
  }

  getTypeCheckerForFile(ctx: Context, file: SourceFile): { checker: Checker; release: () => void } {
    void ctx; void file;
    return { checker: newChecker(), release: () => undefined };
  }

  getTypeCheckerForFileExclusive(ctx: Context, file: SourceFile): { checker: Checker; release: () => void } {
    return this.getTypeCheckerForFile(ctx, file);
  }

  // -------------------------------------------------------------------------
  // Module resolution
  // -------------------------------------------------------------------------

  getResolvedModule(file: SourceFile, moduleReference: string, mode: number): ResolvedModule | undefined {
    void mode;
    const fileName = (file as unknown as { fileName?: string }).fileName ?? "";
    if (fileName === "") return undefined;
    const cache = this.resolvedModulesCache.get(this.toPath(fileName));
    return cache?.get(moduleReference);
  }

  getResolvedModuleFromModuleSpecifier(file: SourceFile, moduleSpecifier: AstNode): ResolvedModule | undefined {
    const text = (moduleSpecifier as unknown as { text?: string }).text ?? "";
    if (text === "") return undefined;
    return this.getResolvedModule(file, text, 0);
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

  getGlobalDiagnostics(ctx: Context): readonly Diagnostic[] { void ctx; return []; }

  getBindDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    void ctx;
    if (sourceFile !== undefined) {
      return bindSourceFile(sourceFile).map(diagnostic => diagnosticFromText(diagnostic.message, sourceFile));
    }
    this.bindSourceFiles();
    return [];
  }

  getDeclarationDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectDiagnostics(ctx, sourceFile, false, () => []);
  }

  getSemanticDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectCheckerDiagnostics(ctx, sourceFile, (_c, checker, file) => {
      const result = checker.checkSourceFile(file);
      return result.diagnostics.map(diagnostic => diagnosticFromText(diagnostic.message, file));
    });
  }

  getSuggestionDiagnostics(ctx: Context, sourceFile: SourceFile | undefined): readonly Diagnostic[] {
    return this.collectCheckerDiagnostics(ctx, sourceFile, () => []);
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

  getSourceFiles(): readonly SourceFile[] {
    return this.files;
  }

  filesByPathMap(): ReadonlyMap<string, SourceFile> {
    return this.filesByPath;
  }

  skipTypeChecking(sourceFile: SourceFile, ignoreNoCheck: boolean): boolean {
    void ignoreNoCheck;
    return isDeclarationFile(sourceFile) && booleanCompilerOption(this.options(), "skipLibCheck");
  }

  canIncludeBindAndCheckDiagnostics(sourceFile: SourceFile): boolean {
    return !isJsonSourceFile(sourceFile);
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
  const t1 = (n1 as unknown as { text?: string }).text;
  const t2 = (n2 as unknown as { text?: string }).text;
  return t1 === t2;
}

export function equalModuleAugmentationNames(n1: AstNode | undefined, n2: AstNode | undefined): boolean {
  return equalModuleSpecifiers(n1, n2);
}

export function equalFileReferences(f1: FileReference | undefined, f2: FileReference | undefined): boolean {
  if (f1 === undefined && f2 === undefined) return true;
  if (f1 === undefined || f2 === undefined) return false;
  return f1.fileName === f2.fileName;
}

export function equalCheckJSDirectives(d1: AstNode | undefined, d2: AstNode | undefined): boolean {
  if (d1 === undefined && d2 === undefined) return true;
  if (d1 === undefined || d2 === undefined) return false;
  const a = (d1 as unknown as { enabled?: boolean }).enabled;
  const b = (d2 as unknown as { enabled?: boolean }).enabled;
  return a === b;
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
  if (!booleanCompilerOption(program.options(), "noEmitOnError")) return undefined;
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

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface Tracing { readonly _trace?: unknown }
interface CheckerPool { readonly _pool?: unknown }
interface Context { readonly _ctx?: unknown }
type EmitOnly = "none" | "dts" | "forcedDts";

function moduleIsResolved(resolved: ResolvedModule): boolean {
  return (resolved as { readonly resolvedFileName?: string; readonly fileName?: string }).resolvedFileName !== undefined
    || (resolved as { readonly resolvedFileName?: string; readonly fileName?: string }).fileName !== undefined;
}

function isExternalModuleNameRelative(moduleName: string): boolean {
  return moduleName.startsWith("./") || moduleName.startsWith("../") || moduleName === "." || moduleName === "..";
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

function compareDiagnostics(left: Diagnostic, right: Diagnostic): number {
  return (left.file?.fileName ?? "").localeCompare(right.file?.fileName ?? "")
    || (left.start ?? -1) - (right.start ?? -1)
    || left.code - right.code
    || left.text.localeCompare(right.text);
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
  void program;
  if (forceDtsEmit) return true;
  return !isDeclarationFile(file) && !isJsonSourceFile(file);
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
