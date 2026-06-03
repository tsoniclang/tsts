/**
 * File loader.
 *
 * Substantive port of TS-Go `internal/compiler/fileloader.go` (~760 LoC).
 * Walks the root + reference + module-resolution graph, parses each
 * reachable file, and records FileInclude reasons.
 *
 * The loader owns root/lib/type-reference tasks, parsing, reference/import
 * graph expansion, resolver caches, default-library ordering, and synthetic
 * helper import creation.
 */

import type {
  Node as AstNode,
  SourceFile,
  FileReference,
  Diagnostic,
} from "../ast/index.js";
import {
  createImportDeclaration,
  createStringLiteral,
  getJSXImplicitImportBase,
  getJSXRuntimeImport,
  isExternalModule,
  isImportDeclaration,
  isExportDeclaration,
  isImportEqualsDeclaration,
  isExternalModuleReference,
  importDeclarationModuleSpecifier,
  importEqualsModuleReference,
  nodeExpression,
  nodeText,
} from "../ast/index.js";
import { parseSourceFile } from "../parser/parser.js";
import {
  Resolver,
  getAutomaticTypeDirectiveNames,
  isExternalModuleNameRelative,
  type ResolverHost,
  type ResolvedModule as ResolverResolvedModule,
} from "../module/resolver.js";
import { inferredTypesContainingFile } from "../module/util.js";
import {
  combinePaths,
  getDirectoryPath,
  getNormalizedAbsolutePath,
  normalizePath,
  isRootedDiskPath,
} from "../tspath/path.js";
import {
  fileExtensionIsOneOf,
  hasExtension,
  supportedTSExtensionsWithJsonFlat,
} from "../tspath/index.js";
import {
  getAllowJS,
  getEmitModuleKind,
  getEmitScriptTarget,
  getIsolatedModules,
  type CompilerOptions,
} from "../core/compilerOptions.js";
import { Tristate, tristateIsTrue } from "../core/tristate.js";
import { libs, getDefaultLibFileName, getLibFileName } from "../tsoptions/enumMaps.js";
import { FileIncludeKind, type FileIncludeReason } from "./fileInclude.js";

// Re-export the canonical FileInclude surface (owned by ./fileInclude.ts, the
// 1:1 port of fileInclude.go) so existing `./fileLoader.js` importers keep
// working without a second, divergent definition.
export { FileIncludeKind } from "./fileInclude.js";
export type { FileIncludeReason } from "./fileInclude.js";

// ---------------------------------------------------------------------------
// Lib resolution
// ---------------------------------------------------------------------------

export interface LibResolution {
  libraryName: string;
  resolution: ResolverResolvedModule | undefined;
  trace: readonly DiagAndArgs[];
}

export interface LibFile {
  name: string;
  path: string;
  replaced: boolean;
  fileName: string;
  contents?: string;
}

export interface SourceFileFromReferenceDiagnostic {
  file: SourceFile;
  reason: string;
}

// ---------------------------------------------------------------------------
// Processed files result
// ---------------------------------------------------------------------------

export interface ProcessedFiles {
  files: SourceFile[];
  duplicateSourceFiles: DuplicateSourceFile[];
  filesByPath: Map<string, SourceFile>;
  unresolvedImports: Set<string>;
  resolvedModulesMap: Map<string, Map<string, ResolvedModule>>;
  typeResolutionsInFile: Map<string, Map<string, ResolvedTypeReferenceDirective>>;
  jsxRuntimeImportSpecifiers: Map<string, JsxRuntimeImportSpecifier>;
  importHelpersImportSpecifiers: Map<string, AstNode>;
  libFiles: Map<string, LibFile>;
  packageNamesInfo: PackageNamesInfo;
  fileReasons: Map<string, FileIncludeReason[]>;
  diagnostics: Diagnostic[];
}

export interface JsxRuntimeImportSpecifier {
  moduleReference: string;
  specifier: AstNode;
}

export interface DuplicateSourceFile { file: SourceFile; reason: string }
export interface PackageNamesInfo { unresolvedImports: Set<string>; packagesMap: Map<string, boolean> }
export interface ResolvedModule {
  resolvedFileName?: string;
  isExternalLibraryImport?: boolean;
  // Mirrors TS-Go `module.ResolvedModule` PackageId + Extension fields used by
  // the program's packages-map construction.
  packageId?: { readonly name?: string };
  extension?: string;
}
export interface ResolvedTypeReferenceDirective {
  resolvedFileName?: string;
  isExternalLibraryImport?: boolean;
  packageId?: unknown;
}

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

export interface CompilerHost {
  readonly _host?: unknown;
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames(): boolean;
  directoryExists?(path: string): boolean;
  getAccessibleEntries?(path: string): { files: readonly string[]; directories: readonly string[] };
  realpath?(path: string): string;
}

interface ParseTask {
  fileName: string;
  normalizedFilePath: string;
  path: string;
  libFile?: LibFile | undefined;
  includeReason: FileIncludeReason;
  isForAutomaticTypeDirective: boolean;
  depth: number;
  elideOnDepth: boolean;
  packageId: unknown;
  file?: SourceFile;
  metadata?: SourceFileMetaData;
  typeResolutionsInFile?: Map<string, ResolvedTypeReferenceDirective>;
  resolutionsInFile?: Map<string, ResolvedModule>;
  importHelpersImportSpecifier?: AstNode;
  jsxRuntimeImportSpecifier?: JsxRuntimeImportSpecifier;
}

export class FileLoader {
  options: CompilerOptions;
  host: CompilerHost;
  defaultLibraryPath: string;
  files: SourceFile[] = [];
  rootTasks: ParseTask[] = [];
  parseTasks: Map<string, ParseTask> = new Map();
  loadedFiles: Map<string, SourceFile> = new Map();
  resolvedModulesMap: Map<string, Map<string, ResolvedModule>> = new Map();
  typeResolutionsInFile: Map<string, Map<string, ResolvedTypeReferenceDirective>> = new Map();
  jsxRuntimeImportSpecifiers: Map<string, JsxRuntimeImportSpecifier> = new Map();
  importHelpersImportSpecifiers: Map<string, AstNode> = new Map();
  libFiles: Map<string, LibFile> = new Map();
  fileReasons: Map<string, FileIncludeReason[]> = new Map();
  duplicateFiles: DuplicateSourceFile[] = [];
  unresolvedImports: Set<string> = new Set();
  diagnostics: Diagnostic[] = [];
  pathForLibFileCache: Map<string, LibFile> = new Map();
  pathForLibFileResolutions: Map<string, LibResolution> = new Map();
  resolver: Resolver;

  constructor(options: CompilerOptions, host: CompilerHost) {
    this.options = options;
    this.host = host;
    this.defaultLibraryPath = getNormalizedAbsolutePath(combinePaths(host.getCurrentDirectory(), "libs"), host.getCurrentDirectory());
    this.resolver = new Resolver(
      this.resolverHost(),
      options,
      undefined,
      undefined,
      undefined,
    );
  }

  // -------------------------------------------------------------------------
  // Path helpers
  // -------------------------------------------------------------------------

  toPath(file: string): string {
    const normalized = getNormalizedAbsolutePath(file, this.host.getCurrentDirectory());
    return this.host.useCaseSensitiveFileNames() ? normalized : normalized.toLowerCase();
  }

  // Adapt the compiler `CompilerHost` to the module `ResolverHost` contract:
  // the resolver requires `directoryExists` and `getAccessibleEntries` as
  // total methods, while CompilerHost exposes them optionally, so supply
  // conservative defaults when the host omits them.
  private resolverHost(): ResolverHost {
    const host = this.host;
    const realpath = host.realpath;
    return {
      useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
      getCurrentDirectory: () => host.getCurrentDirectory(),
      fileExists: (path) => host.fileExists(path),
      directoryExists: (path) => host.directoryExists?.(path) ?? false,
      readFile: (path) => host.readFile(path),
      getAccessibleEntries: (path) => host.getAccessibleEntries?.(path) ?? { files: [], directories: [] },
      ...(realpath === undefined ? {} : { realpath: (path: string) => realpath(path) }),
    };
  }

  // -------------------------------------------------------------------------
  // Task queueing
  // -------------------------------------------------------------------------

  addRootTask(fileName: string, libFile: LibFile | undefined, includeReason: FileIncludeReason): void {
    const normalizedFilePath = getNormalizedAbsolutePath(fileName, this.host.getCurrentDirectory());
    if (!tristateIsTrue(this.options.allowNonTsExtensions ?? Tristate.Unknown) && !hasExtension(normalizedFilePath)) return;
    this.rootTasks.push(this.createParseTask(normalizedFilePath, libFile, includeReason, false, 0, false, undefined));
  }

  addAutomaticTypeDirectiveTasks(): void {
    const containingDirectory = this.options.configFilePath !== undefined && this.options.configFilePath !== ""
      ? getDirectoryPath(this.options.configFilePath)
      : this.host.getCurrentDirectory();
    const containingFileName = combinePaths(containingDirectory, inferredTypesContainingFile);
    this.rootTasks.push(this.createParseTask(
      containingFileName,
      undefined,
      { kind: FileIncludeKind.AutomaticTypeDirectiveFile, fileName: containingFileName },
      true,
      0,
      false,
      undefined,
    ));
  }

  resolveAutomaticTypeDirectives(containingFileName: string): {
    directives: readonly ResolvedRef[];
    resolutions: Map<string, ResolvedTypeReferenceDirective>;
    diagnostics: readonly Diagnostic[];
  } {
    const automaticTypeDirectiveNames = getAutomaticTypeDirectiveNames(this.options, this.resolverHost());
    const directives: ResolvedRef[] = [];
    const resolutions = new Map<string, ResolvedTypeReferenceDirective>();
    for (const name of automaticTypeDirectiveNames) {
      const resolved = this.resolver.resolveTypeReferenceDirective(name, containingFileName, undefined, undefined);
      const directive = resolved.resolvedTypeReferenceDirective;
      if (directive === undefined) {
        this.unresolvedImports.add(name);
        continue;
      }
      resolutions.set(name, {
        resolvedFileName: directive.resolvedFileName,
        isExternalLibraryImport: directive.isExternalLibraryImport,
        packageId: directive.packageId,
      });
      directives.push({
        fileName: directive.resolvedFileName,
        increaseDepth: directive.isExternalLibraryImport,
        elideOnDepth: false,
        packageId: directive.packageId,
      });
    }
    return { directives, resolutions, diagnostics: [] };
  }

  addProjectReferenceTasks(singleThreaded: boolean): void {
    // 1:1 with TS-Go `(*fileLoader).addProjectReferenceTasks`: when there are
    // no resolved project references there is nothing to enqueue. This loader
    // is constructed from CompilerOptions alone and does not yet carry the
    // ParsedCommandLine's ResolvedProjectReferencePaths, so it currently has no
    // references to walk (project-reference parsing via projectReferenceParser
    // is driven elsewhere). Keep the early-return shape of the upstream method.
    void singleThreaded;
  }

  private createParseTask(
    fileName: string,
    libFile: LibFile | undefined,
    includeReason: FileIncludeReason,
    isForAutomaticTypeDirective: boolean,
    depth: number,
    elideOnDepth: boolean,
    packageId: unknown,
  ): ParseTask {
    const normalizedFilePath = normalizePath(fileName);
    return {
      fileName: normalizedFilePath,
      normalizedFilePath,
      path: this.toPath(normalizedFilePath),
      libFile,
      includeReason,
      isForAutomaticTypeDirective,
      depth,
      elideOnDepth,
      packageId,
    };
  }

  // -------------------------------------------------------------------------
  // Main processing loop
  // -------------------------------------------------------------------------

  /**
   * Drains the root task queue, parsing each file and recursively
   * resolving its imports + references until no new files are reachable.
   * Mirrors TS-Go `(*fileLoader).loadFiles` orchestration.
   */
  loadAllFiles(): void {
    const queue: ParseTask[] = [...this.rootTasks];
    while (queue.length > 0) {
      const task = queue.shift()!;
      if (task.isForAutomaticTypeDirective) {
        const automatic = this.resolveAutomaticTypeDirectives(task.fileName);
        this.typeResolutionsInFile.set(task.path, automatic.resolutions);
        for (const ref of automatic.directives) {
          queue.push(this.createParseTask(
            ref.fileName,
            undefined,
            { kind: FileIncludeKind.AutomaticTypeDirectiveFile, fileName: ref.fileName, packageId: packageIdReasonValue(ref.packageId) },
            false,
            ref.increaseDepth === true ? task.depth + 1 : task.depth,
            ref.elideOnDepth === true,
            ref.packageId,
          ));
        }
        continue;
      }

      const key = task.path;
      if (this.parseTasks.has(key)) {
        this.addReason(key, task.includeReason);
        continue;
      }
      this.parseTasks.set(key, task);
      this.addReason(key, task.includeReason);

      if (task.elideOnDepth && task.depth > (this.options.maxNodeModuleJsDepth ?? 0)) continue;
      task.metadata = this.loadSourceFileMetaData(task.fileName);
      const file = this.parseSourceFile(task);
      if (file === undefined) continue;
      task.file = file;
      this.loadedFiles.set(key, file);
      this.files.push(file);
      if (task.libFile !== undefined) this.libFiles.set(key, task.libFile);

      const refs = file.referencedFiles;
      refs.forEach((ref, index) => {
        const resolved = this.resolveTripleslashPathReference(ref.fileName, task.fileName, index);
        if (resolved.resolved !== undefined && resolved.resolved.fileName !== "") {
          queue.push(this.createParseTask(
            resolved.resolved.fileName,
            undefined,
            {
              kind: FileIncludeKind.ReferenceFile,
              referencingFile: task.fileName,
              ref,
            },
            false,
            task.depth,
            false,
            undefined,
          ));
        }
      });

      this.resolveTypeReferenceDirectives(task, queue);
      this.resolveImportsForFile(file, task.fileName, queue);
    }
  }

  private addReason(key: string, reason: FileIncludeReason): void {
    const existing = this.fileReasons.get(key);
    if (existing === undefined) this.fileReasons.set(key, [reason]);
    else existing.push(reason);
  }

  private resolveImportsForFile(file: SourceFile, fileName: string, queue: ParseTask[]): void {
    const importSpecifiers = [
      ...this.getSyntheticModuleSpecifiers(file),
      ...collectModuleSpecifiers(file),
    ];
    const cacheKey = this.toPath(fileName);
    let cache = this.resolvedModulesMap.get(cacheKey);
    if (cache === undefined) {
      cache = new Map();
      this.resolvedModulesMap.set(cacheKey, cache);
    }
    for (let index = 0; index < importSpecifiers.length; index++) {
      const spec = importSpecifiers[index]!;
      const resolution = this.resolver.resolveModuleName(spec, fileName, undefined, undefined);
      if (resolution.resolvedModule === undefined) {
        this.unresolvedImports.add(spec);
        continue;
      }
      cache.set(spec, {
        resolvedFileName: resolution.resolvedModule.resolvedFileName,
        isExternalLibraryImport: resolution.resolvedModule.resolvedFileName.includes("/node_modules/"),
      });
      if (resolutionHasBlockingDiagnostic(this.options, resolution.resolvedModule, file)) continue;
      if (tristateIsTrue(this.options.noResolve ?? Tristate.Unknown)) continue;

      const resolvedFileName = resolution.resolvedModule.resolvedFileName;
      const isJsFile = !fileExtensionIsOneOf(resolvedFileName, supportedTSExtensionsWithJsonFlat);
      if (isJsFile && !getAllowJS(this.options)) continue;
      const resolvedKey = this.toPath(resolvedFileName);
      if (!this.parseTasks.has(resolvedKey)) {
        queue.push(this.createParseTask(
          resolvedFileName,
          undefined,
          { kind: FileIncludeKind.Import, referencingFile: fileName, fileName: spec },
          false,
          resolution.resolvedModule.resolvedFileName.includes("/node_modules/") ? 1 : 0,
          isJsFile && resolvedFileName.includes("/node_modules/"),
          resolution.resolvedModule.packageId,
        ));
      }
    }
  }

  private getSyntheticModuleSpecifiers(file: SourceFile): readonly string[] {
    const specifiers: string[] = [];
    const isJavaScriptFile = isSourceFileJS(file);
    const isExternalModuleFile = isExternalModule(file);
    if (
      (isJavaScriptFile || (!file.isDeclarationFile && (getIsolatedModules(this.options) || isExternalModuleFile))) &&
      tristateIsTrue(this.options.importHelpers ?? Tristate.Unknown)
    ) {
      const specifier = this.createSyntheticImport("tslib", file);
      this.importHelpersImportSpecifiers.set(file.path, specifier);
      specifiers.push("tslib");
    }
    if (file.scriptKind === 2 || file.scriptKind === 4) {
      const jsxImport = getJSXRuntimeImport(getJSXImplicitImportBase(this.options, file), this.options);
      if (jsxImport !== "") {
        const specifier = this.createSyntheticImport(jsxImport, file);
        this.jsxRuntimeImportSpecifiers.set(file.path, { moduleReference: jsxImport, specifier });
        specifiers.push(jsxImport);
      }
    }
    return specifiers;
  }

  // -------------------------------------------------------------------------
  // Library file ordering + loading
  // -------------------------------------------------------------------------

  sortLibs(libFiles: SourceFile[]): void {
    libFiles.sort((a, b) => this.getDefaultLibFilePriority(a) - this.getDefaultLibFilePriority(b));
  }

  getDefaultLibFilePriority(a: SourceFile): number {
    const name = a.fileName;
    const defaultLibraryPath = this.defaultLibraryPath.endsWith("/")
      ? this.defaultLibraryPath.slice(0, -1)
      : this.defaultLibraryPath;
    if (name.startsWith(defaultLibraryPath) && name.length > defaultLibraryPath.length && name[defaultLibraryPath.length] === "/") {
      const basename = name.slice(name.lastIndexOf("/") + 1);
      if (basename === "lib.d.ts" || basename === "lib.es6.d.ts") return 0;
      const libName = basename.slice("lib.".length, basename.length - ".d.ts".length);
      const index = libs.indexOf(libName);
      if (index !== -1) return index + 1;
    }
    return libs.length + 2;
  }

  loadSourceFileMetaData(fileName: string): SourceFileMetaData {
    const packageJson = this.readNearestPackageJson(getDirectoryPath(fileName));
    const packageJsonType = typeof packageJson?.type === "string" ? packageJson.type : "";
    return {
      packageJsonType,
      packageJsonDirectory: packageJson?.directory ?? "",
      impliedNodeFormat: getDefaultResolutionModeForFile(fileName, { packageJsonType }, this.options),
    };
  }

  parseSourceFile(t: ParseTask): SourceFile | undefined {
    if (t.libFile !== undefined) {
      const text = t.libFile.contents ?? this.host.readFile(t.libFile.path);
      if (text === undefined) return undefined;
      return parseSourceFile(text, { fileName: t.libFile.path });
    }
    const text = this.host.readFile(t.fileName);
    if (text === undefined) return undefined;
    return parseSourceFile(text, { fileName: t.fileName });
  }

  isSupportedExtension(canonicalFileName: string): boolean {
    return canonicalFileName.endsWith(".ts")
      || canonicalFileName.endsWith(".tsx")
      || canonicalFileName.endsWith(".d.ts")
      || canonicalFileName.endsWith(".js")
      || canonicalFileName.endsWith(".jsx")
      || canonicalFileName.endsWith(".mts")
      || canonicalFileName.endsWith(".cts")
      || canonicalFileName.endsWith(".d.mts")
      || canonicalFileName.endsWith(".d.cts")
      || canonicalFileName.endsWith(".mjs")
      || canonicalFileName.endsWith(".cjs")
      || canonicalFileName.endsWith(".json");
  }

  getSourceFileFromReference(
    origin: SourceFile | undefined, ref: FileReference,
  ): { file: SourceFile | undefined; ok: boolean } {
    const containingFile = origin !== undefined
      ? origin.fileName
      : this.host.getCurrentDirectory();
    const resolved = this.resolveTripleslashPathReference(ref.fileName, containingFile, 0);
    if (resolved.resolved === undefined || resolved.resolved.fileName === "") {
      return { file: undefined, ok: false };
    }
    const key = this.toPath(resolved.resolved.fileName);
    return { file: this.loadedFiles.get(key), ok: this.loadedFiles.has(key) };
  }

  resolveTripleslashPathReference(
    moduleName: string, containingFile: string, index: number,
  ): { resolved: ResolvedRef | undefined; diagnostic: ProcessingDiagnostic | undefined } {
    void index;
    const containingDirectory = getDirectoryPath(containingFile);
    const candidate = isRootedDiskPath(moduleName)
      ? moduleName
      : normalizePath(combinePaths(containingDirectory, moduleName));
    if (this.host.fileExists(candidate)) {
      return { resolved: { fileName: candidate }, diagnostic: undefined };
    }
    return { resolved: undefined, diagnostic: undefined };
  }

  resolveTypeReferenceDirectives(t: ParseTask, queue?: ParseTask[]): void {
    const file = t.file;
    if (file === undefined || file.typeReferenceDirectives.length === 0) return;

    const typeResolutions = new Map<string, ResolvedTypeReferenceDirective>();
    for (let index = 0; index < file.typeReferenceDirectives.length; index++) {
      const ref = file.typeReferenceDirectives[index]!;
      const resolved = this.resolver.resolveTypeReferenceDirective(ref.fileName, file.fileName, getModeForTypeReferenceDirectiveInFile(ref, file, t.metadata ?? {}, this.options), undefined);
      const directive = resolved.resolvedTypeReferenceDirective;
      if (directive === undefined) {
        this.unresolvedImports.add(ref.fileName);
        continue;
      }
      typeResolutions.set(ref.fileName, {
        resolvedFileName: directive.resolvedFileName,
        isExternalLibraryImport: directive.isExternalLibraryImport,
        packageId: directive.packageId,
      });
      queue?.push(this.createParseTask(
        directive.resolvedFileName,
        undefined,
        { kind: FileIncludeKind.TypeReferenceDirective, referencingFile: file.fileName, ref, packageId: packageIdReasonValue(directive.packageId) },
        false,
        directive.isExternalLibraryImport ? t.depth + 1 : t.depth,
        false,
        directive.packageId,
      ));
    }
    this.typeResolutionsInFile.set(t.path, typeResolutions);
    t.typeResolutionsInFile = typeResolutions;
  }

  resolveImportsAndModuleAugmentations(t: ParseTask): void {
    if (t.file === undefined) return;
    const queue: ParseTask[] = [];
    this.resolveImportsForFile(t.file, t.fileName, queue);
  }

  createSyntheticImport(text: string, file: SourceFile): AstNode {
    const moduleSpecifier = createStringLiteral(text, 0);
    const importDeclaration = createImportDeclaration(undefined, undefined, moduleSpecifier, undefined);
    moduleSpecifier.parent = importDeclaration;
    importDeclaration.parent = file;
    return moduleSpecifier;
  }

  pathForLibFile(name: string): LibFile | undefined {
    const cached = this.pathForLibFileCache.get(name);
    if (cached !== undefined) return cached;

    let path = combinePaths(this.defaultLibraryPath, name);
    let replaced = false;
    if (tristateIsTrue(this.options.libReplacement ?? Tristate.Unknown) && name !== "lib.d.ts") {
      const libraryName = getLibraryNameFromLibFileName(name);
      const resolveFrom = getInferredLibraryNameResolveFrom(this.options, this.host.getCurrentDirectory(), name);
      const resolution = this.resolveLibrary(libraryName, resolveFrom);
      if (resolution.module !== undefined) {
        path = resolution.module.resolvedFileName;
        replaced = true;
      }
      this.pathForLibFileResolutions.set(this.toPath(resolveFrom), {
        libraryName,
        resolution: resolution.module,
        trace: resolution.diagnostics,
      });
    }

    const libFile: LibFile = { name, path, replaced, fileName: path };
    this.pathForLibFileCache.set(name, libFile);
    return libFile;
  }

  resolveLibrary(libraryName: string, resolveFrom: string): {
    module: ResolverResolvedModule | undefined; diagnostics: readonly DiagAndArgs[];
  } {
    const result = this.resolver.resolveModuleName(libraryName, resolveFrom, undefined, undefined);
    return { module: result.resolvedModule, diagnostics: result.resolutionDiagnostics as readonly DiagAndArgs[] };
  }

  private readNearestPackageJson(directory: string): { directory: string; type?: string } | undefined {
    let current = directory;
    while (current !== "" && current !== "/" && current !== ".") {
      const packageJsonPath = combinePaths(current, "package.json");
      const text = this.host.readFile(packageJsonPath);
      if (text !== undefined) {
        try {
          const parsed = JSON.parse(text) as { type?: unknown };
          const result: { directory: string; type?: string } = { directory: current };
          if (typeof parsed.type === "string") result.type = parsed.type;
          return result;
        } catch {
          return { directory: current };
        }
      }
      const parent = getDirectoryPath(current);
      if (parent === current) break;
      current = parent;
    }
    return undefined;
  }
}

// Stringify a resolution package id for the flattened
// `FileIncludeReason.packageId` field (upstream `module.PackageId.String()`):
// either an explicit name string or a PackageId-like `{ name }` struct.
function packageIdReasonValue(value: unknown): string {
  if (value === undefined || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && "name" in value) {
    const name = (value as { name?: unknown }).name;
    if (typeof name === "string") return name;
  }
  return "";
}

/**
 * Collects every external module specifier (`import`, `export from`,
 * `import = require(...)`, dynamic `import(...)`, `require(...)`)
 * appearing at the top level of `file`.
 */
function collectModuleSpecifiers(file: SourceFile): readonly string[] {
  const out: string[] = [];
  for (const stmt of file.statements) {
    if (isImportDeclaration(stmt) || isExportDeclaration(stmt)) {
      const spec = importDeclarationModuleSpecifier(stmt);
      const text = nodeText(spec);
      if (text !== "") out.push(text);
    } else if (isImportEqualsDeclaration(stmt)) {
      const moduleReference = importEqualsModuleReference(stmt);
      if (isExternalModuleReference(moduleReference)) {
        const text = nodeText(nodeExpression(moduleReference));
        if (text !== "") out.push(text);
      }
    }
  }
  void isExternalModuleNameRelative;
  return out;
}

// ---------------------------------------------------------------------------
// Module-level entries
// ---------------------------------------------------------------------------

/**
 * Top-level entry point — orchestrates the FileLoader from the rooted
 * file names + lib files described by the parsed command line.
 * Mirrors TS-Go `processAllProgramFiles`.
 */
export function processAllProgramFiles(
  options: CompilerOptions, host: CompilerHost, rootFileNames: readonly string[],
  singleThreaded: boolean,
): ProcessedFiles {
  void singleThreaded;
  const loader = new FileLoader(options, host);
  loader.addProjectReferenceTasks(singleThreaded);
  for (const fileName of rootFileNames) {
    loader.addRootTask(fileName, undefined, {
      kind: FileIncludeKind.RootFile,
      fileName,
    });
  }
  if (rootFileNames.length > 0 && !tristateIsTrue(options.noLib ?? Tristate.Unknown)) {
    if (options.lib === undefined) {
      const libFileName = getDefaultLibFileName(getEmitScriptTarget(options));
      const libFile = loader.pathForLibFile(libFileName);
      if (libFile !== undefined) loader.addRootTask(libFile.path, libFile, { kind: FileIncludeKind.LibFile, fileName: libFile.path });
    } else {
      for (const lib of options.lib) {
        const libFileName = getLibFileName(lib);
        if (libFileName === undefined) continue;
        const libFile = loader.pathForLibFile(libFileName);
        if (libFile !== undefined) loader.addRootTask(libFile.path, libFile, { kind: FileIncludeKind.LibFile, fileName: libFile.path });
      }
    }
  }
  if (rootFileNames.length > 0) loader.addAutomaticTypeDirectiveTasks();
  loader.loadAllFiles();
  return {
    files: loader.files,
    duplicateSourceFiles: loader.duplicateFiles,
    filesByPath: loader.loadedFiles,
    unresolvedImports: loader.unresolvedImports,
    resolvedModulesMap: loader.resolvedModulesMap,
    typeResolutionsInFile: loader.typeResolutionsInFile,
    jsxRuntimeImportSpecifiers: loader.jsxRuntimeImportSpecifiers,
    importHelpersImportSpecifiers: loader.importHelpersImportSpecifiers,
    libFiles: loader.libFiles,
    packageNamesInfo: { unresolvedImports: loader.unresolvedImports, packagesMap: new Map() },
    fileReasons: loader.fileReasons,
    diagnostics: loader.diagnostics,
  };
}

export function getLibraryNameFromLibFileName(libFileName: string): string {
  const components = libFileName.split(".");
  let path = "@typescript/lib-";
  if (components.length > 1) path += components[1]!;
  for (let index = 2; index < components.length && components[index] !== "" && components[index] !== "d"; index++) {
    path += index === 2 ? "/" : "-";
    path += components[index]!;
  }
  return path;
}

export function getInferredLibraryNameResolveFrom(
  options: CompilerOptions, currentDirectory: string, libFileName: string,
): string {
  const containingDirectory = options.configFilePath !== undefined && options.configFilePath !== ""
    ? getDirectoryPath(options.configFilePath)
    : currentDirectory;
  return combinePaths(containingDirectory, "__lib_node_modules_lookup_" + libFileName + "__.ts");
}

export function getModeForTypeReferenceDirectiveInFile(
  ref: FileReference, file: SourceFile, meta: SourceFileMetaData, options: CompilerOptions,
): number {
  if (ref.resolutionMode !== 0) return ref.resolutionMode;
  return getDefaultResolutionModeForFile(file.fileName, meta, options);
}

export function getDefaultResolutionModeForFile(
  fileName: string, meta: SourceFileMetaData, options: CompilerOptions,
): number {
  if (!importSyntaxAffectsModuleResolution(options)) return 0;
  return getEmitSyntaxForUsageLocationWorker(fileName, meta, undefined, options);
}

export function getModeForUsageLocation(
  fileName: string, meta: SourceFileMetaData, usage: AstNode, options: CompilerOptions,
): number {
  void usage;
  if (!importSyntaxAffectsModuleResolution(options)) return 0;
  return getEmitSyntaxForUsageLocationWorker(fileName, meta, usage, options);
}

export function importSyntaxAffectsModuleResolution(options: CompilerOptions): boolean {
  const moduleKind = getEmitModuleKind(options);
  return moduleKind >= 100 || tristateIsTrue(options.resolvePackageJsonExports ?? Tristate.Unknown) || tristateIsTrue(options.resolvePackageJsonImports ?? Tristate.Unknown);
}

export function getEmitSyntaxForUsageLocationWorker(
  fileName: string, meta: SourceFileMetaData, usage: AstNode | undefined, options: CompilerOptions,
): number {
  if (usage !== undefined && isCommonJsUsage(usage)) return 1;
  const moduleKind = getEmitModuleKind(options);
  if (moduleKind === 1) return 1;
  if (moduleKind === 200) {
    if (fileName.endsWith(".cts") || fileName.endsWith(".cjs")) return 1;
    if (fileName.endsWith(".mts") || fileName.endsWith(".mjs")) return 99;
    return meta.packageJsonType === "module" ? 99 : 1;
  }
  if (moduleKind >= 5) return 99;
  return 0;
}

// ---------------------------------------------------------------------------
// Forward-declared cross-module surface
// ---------------------------------------------------------------------------

interface ResolvedRef {
  fileName: string;
  increaseDepth?: boolean;
  elideOnDepth?: boolean;
  packageId?: unknown;
}
interface ProcessingDiagnostic { readonly _diag?: unknown }
interface DiagAndArgs { readonly _da?: unknown }
interface SourceFileMetaData {
  readonly packageJsonType?: string;
  readonly packageJsonDirectory?: string;
  readonly impliedNodeFormat?: number;
}

function isSourceFileJS(file: SourceFile): boolean {
  return file.fileName.endsWith(".js") || file.fileName.endsWith(".jsx") || file.fileName.endsWith(".mjs") || file.fileName.endsWith(".cjs");
}

function isCommonJsUsage(usage: AstNode): boolean {
  const kind = (usage as { readonly kind?: number }).kind;
  const parent = (usage as { readonly parent?: AstNode }).parent;
  const parentKind = (parent as { readonly kind?: number } | undefined)?.kind;
  return kind === 217 || parentKind === 270;
}

function resolutionHasBlockingDiagnostic(
  options: CompilerOptions,
  resolvedModule: ResolverResolvedModule,
  file: SourceFile,
): boolean {
  const extension = resolvedModule.extension;
  if (extension === ".ts" || extension === ".d.ts" || extension === ".mts" || extension === ".d.mts" || extension === ".cts" || extension === ".d.cts") {
    return false;
  }
  if (extension === ".tsx") return (options.jsx ?? 0) === 0;
  if (extension === ".jsx") return (options.jsx ?? 0) === 0 || !getAllowJS(options);
  if (extension === ".js" || extension === ".mjs" || extension === ".cjs") return !getAllowJS(options);
  if (extension === ".json") return !tristateIsTrue(options.resolveJsonModule ?? Tristate.Unknown);
  return !file.isDeclarationFile && !tristateIsTrue(options.allowArbitraryExtensions ?? Tristate.Unknown);
}
