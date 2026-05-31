import type { Program } from "../program/index.js";
import type { FileChangeSummary } from "./fileChange.js";
import type { LogTree } from "./logging/logtree.js";

export type Kind = 0 | 1;
export const Kind = {
  Inferred: 0 as Kind,
  Configured: 1 as Kind,
} as const;

export type ProgramUpdateKind = 0 | 1 | 2 | 3;
export const ProgramUpdateKind = {
  None: 0 as ProgramUpdateKind,
  Cloned: 1 as ProgramUpdateKind,
  SameFileNames: 2 as ProgramUpdateKind,
  NewFiles: 3 as ProgramUpdateKind,
} as const;

export type PendingReload = 0 | 1 | 2;
export const PendingReload = {
  None: 0 as PendingReload,
  FileNames: 1 as PendingReload,
  Full: 2 as PendingReload,
} as const;

export const inferredProjectName = "/dev/null/inferred";

export interface ProjectOptions {
  readonly configFileName: string;
  readonly kind: Kind;
  readonly currentDirectory: string;
  readonly configFilePath?: string | undefined;
  readonly rootFileNames?: readonly string[];
  readonly compilerOptions?: object | undefined;
  readonly logger?: LogTree | undefined;
  readonly defaultLibraryPath?: string | undefined;
  readonly typingsLocation?: string | undefined;
}

export interface ProjectDiagnostic {
  readonly fileName?: string;
  readonly message: string;
}

export interface TypingsInfo {
  readonly compilerOptions: ReadonlyMap<string, unknown>;
  readonly unresolvedImports: readonly string[];
  readonly projectRootPath: string;
  readonly safeListPath: string;
  readonly typeAcquisition?: unknown;
}

export interface TypingsState {
  readonly info: TypingsInfo;
  readonly files: readonly string[];
  readonly filesToWatch: readonly string[];
}

export interface WatchPatternSet {
  readonly patternsInsideWorkspace: readonly string[];
  readonly patternsOutsideWorkspace: readonly string[];
  readonly ignored: readonly string[];
}

export class WatchedFiles<T = WatchPatternSet> {
  readonly description: string;
  readonly watchKind: number;
  readonly value: T;

  constructor(description: string, watchKind: number, value: T) {
    this.description = description;
    this.watchKind = watchKind;
    this.value = value;
  }

  clone(value: T): WatchedFiles<T> {
    return new WatchedFiles(this.description, this.watchKind, value);
  }
}

export class Project {
  readonly kind: Kind;
  readonly currentDirectory: string;
  readonly configFileNameValue: string;
  readonly configFilePathValue: string;
  readonly rootFileNames: readonly string[];
  readonly compilerOptions: object | undefined;
  readonly defaultLibraryPath: string | undefined;
  readonly typingsLocation: string | undefined;
  program: Program | undefined;
  programUpdateKind: ProgramUpdateKind = ProgramUpdateKind.None;
  programLastUpdate = 0;
  dirty = true;
  dirtyFilePath: string | undefined;
  pendingReload: PendingReload = PendingReload.None;
  programFilesWatch: WatchedFiles<WatchPatternSet>;
  typingsWatch: WatchedFiles<WatchPatternSet> | undefined;
  installedTypingsInfo: TypingsInfo | undefined;
  typingsFiles: readonly string[] = [];
  checkerPool: unknown;
  private readonly files = new Set<string>();
  private readonly referencedProjects = new Set<string>();
  private readonly potentialProjectReferences = new Set<string>();

  constructor(options: ProjectOptions) {
    this.kind = options.kind;
    this.currentDirectory = options.currentDirectory;
    this.configFileNameValue = options.configFileName;
    this.configFilePathValue = options.configFilePath ?? toPath(options.configFileName, options.currentDirectory);
    this.rootFileNames = options.rootFileNames ?? [];
    this.compilerOptions = options.compilerOptions;
    this.defaultLibraryPath = options.defaultLibraryPath;
    this.typingsLocation = options.typingsLocation;
    this.programFilesWatch = new WatchedFiles(
      `program files for ${options.configFileName}`,
      WatchKind.Create | WatchKind.Change | WatchKind.Delete,
      createResolutionLookupPatterns(options.currentDirectory, options.defaultLibraryPath, this.currentDirectory),
    );
    if (options.typingsLocation !== undefined && options.typingsLocation !== "") {
      this.typingsWatch = new WatchedFiles(
        "typings installer files",
        WatchKind.Create | WatchKind.Change | WatchKind.Delete,
        { patternsInsideWorkspace: [], patternsOutsideWorkspace: [], ignored: [] },
      );
    }
    options.logger?.log(`Creating ${projectKindToString(this.kind)}Project: ${options.configFileName}, currentDirectory: ${options.currentDirectory}`);
  }

  name(): string {
    return this.configFileNameValue;
  }

  displayName(cwd: string): string {
    if (this.kind === Kind.Inferred) return baseFileName(this.currentDirectory);
    return relativePath(cwd, this.configFileNameValue);
  }

  id(): string {
    return this.configFilePathValue;
  }

  configFileName(): string {
    if (this.kind !== Kind.Configured) throw new Error("ConfigFileName called on non-configured project");
    return this.configFileNameValue;
  }

  configFilePath(): string {
    if (this.kind !== Kind.Configured) throw new Error("ConfigFilePath called on non-configured project");
    return this.configFilePathValue;
  }

  getProgram(): Program | undefined {
    return this.program;
  }

  setProgram(program: Program | undefined, snapshotId: number, updateKind: ProgramUpdateKind): void {
    this.program = program;
    this.programLastUpdate = snapshotId;
    this.programUpdateKind = updateKind;
    this.dirty = false;
    this.pendingReload = PendingReload.None;
    this.files.clear();
    for (const sourceFile of program?.sourceFiles ?? []) this.files.add(toPath(sourceFile.fileName, this.currentDirectory));
  }

  markDirty(path?: string, reload: PendingReload = PendingReload.FileNames): void {
    this.dirty = true;
    this.dirtyFilePath = path;
    this.pendingReload = Math.max(this.pendingReload, reload) as PendingReload;
  }

  hasFile(fileName: string): boolean {
    return this.containsFile(toPath(fileName, this.currentDirectory));
  }

  containsFile(path: string): boolean {
    if (this.files.size > 0) return this.files.has(path);
    return this.program?.sourceFiles.some(file => toPath(file.fileName, this.currentDirectory) === path) === true;
  }

  isSourceFromProjectReference(path: string): boolean {
    return this.referencedProjects.has(path);
  }

  addPotentialProjectReference(path: string): void {
    this.potentialProjectReferences.add(path);
  }

  hasPotentialProjectReference(request: { readonly isAllProjects?: () => boolean; readonly isProjectReferenced?: (path: string) => boolean }): boolean {
    if (request.isAllProjects?.() === true) return true;
    for (const reference of this.potentialProjectReferences) {
      if (request.isProjectReferenced?.(reference) === true) return true;
    }
    return false;
  }

  setResolvedProjectReference(path: string): void {
    this.referencedProjects.add(path);
  }

  clearPotentialProjectReferences(): void {
    this.potentialProjectReferences.clear();
  }

  updateTypingsState(state: TypingsState): boolean {
    if (this.installedTypingsInfo !== undefined && typingsInfoEquals(this.installedTypingsInfo, state.info)
      && sameRootFiles(this.typingsFiles, state.files)) {
      return false;
    }
    this.installedTypingsInfo = state.info;
    this.typingsFiles = [...state.files].sort();
    this.typingsWatch = (this.typingsWatch ?? new WatchedFiles(
      "typings installer files",
      WatchKind.Create | WatchKind.Change | WatchKind.Delete,
      { patternsInsideWorkspace: [], patternsOutsideWorkspace: [], ignored: [] },
    )).clone(getTypingsLocationGlobs(state.filesToWatch, this.typingsLocation, this.currentDirectory));
    this.markDirty(undefined, PendingReload.Full);
    return true;
  }

  commandLineRootFileNames(): readonly string[] {
    return [...this.rootFileNames, ...this.typingsFiles].sort();
  }

  computeTypingsInfo(unresolvedImports: readonly string[] = []): TypingsInfo {
    return {
      compilerOptions: compilerOptionsMap(this.compilerOptions),
      unresolvedImports: [...new Set(unresolvedImports)].sort(),
      projectRootPath: this.currentDirectory,
      safeListPath: this.typingsLocation ?? "",
    };
  }

  getProjectDiagnostics(): readonly ProjectDiagnostic[] {
    return this.program?.diagnostics.map(diagnostic => ({
      fileName: diagnostic.fileName,
      message: diagnostic.message,
    })) ?? [];
  }

  applyFileChanges(summary: FileChangeSummary): void {
    if (summary.invalidateAll || summary.changed.size > 0 || summary.created.size > 0 || summary.deleted.size > 0) {
      this.markDirty(undefined, summary.invalidateAll ? PendingReload.Full : PendingReload.FileNames);
    }
  }

  clone(): Project {
    const project = new Project({
      configFileName: this.configFileNameValue,
      kind: this.kind,
      currentDirectory: this.currentDirectory,
      configFilePath: this.configFilePathValue,
      rootFileNames: this.rootFileNames,
      compilerOptions: this.compilerOptions,
    });
    project.program = this.program;
    project.programUpdateKind = this.programUpdateKind;
    project.programLastUpdate = this.programLastUpdate;
    project.dirty = this.dirty;
    project.dirtyFilePath = this.dirtyFilePath;
    project.pendingReload = this.pendingReload;
    project.programFilesWatch = this.programFilesWatch.clone(this.programFilesWatch.value);
    project.typingsWatch = this.typingsWatch?.clone(this.typingsWatch.value);
    project.installedTypingsInfo = this.installedTypingsInfo;
    project.typingsFiles = [...this.typingsFiles];
    project.checkerPool = this.checkerPool;
    for (const file of this.files) project.files.add(file);
    for (const reference of this.referencedProjects) project.referencedProjects.add(reference);
    for (const reference of this.potentialProjectReferences) project.potentialProjectReferences.add(reference);
    return project;
  }
}

export function newConfiguredProject(configFileName: string, currentDirectory: string, logger?: LogTree): Project {
  return new Project({ configFileName, kind: Kind.Configured, currentDirectory, logger });
}

export function newInferredProject(currentDirectory: string, rootFileNames: readonly string[] = [], compilerOptions?: object, logger?: LogTree): Project {
  return new Project({
    configFileName: inferredProjectName,
    kind: Kind.Inferred,
    currentDirectory,
    rootFileNames,
    compilerOptions,
    logger,
  });
}

export function projectKindToString(kind: Kind): string {
  return kind === Kind.Inferred ? "Inferred" : "Configured";
}

function toPath(fileName: string, currentDirectory: string): string {
  const normalized = fileName.replaceAll("\\", "/");
  if (normalized.startsWith("/")) return normalizeSlashes(normalized);
  return normalizeSlashes(`${currentDirectory}/${normalized}`);
}

function normalizeSlashes(path: string): string {
  const parts: string[] = [];
  for (const part of path.replaceAll("\\", "/").split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}

function baseFileName(path: string): string {
  const normalized = normalizeSlashes(path);
  const index = normalized.lastIndexOf("/");
  return index === -1 ? normalized : normalized.slice(index + 1);
}

function relativePath(from: string, to: string): string {
  const fromParts = normalizeSlashes(from).split("/").filter(Boolean);
  const toParts = normalizeSlashes(to).split("/").filter(Boolean);
  let common = 0;
  while (common < fromParts.length && common < toParts.length && fromParts[common] === toParts[common]) common += 1;
  return [...fromParts.slice(common).map(() => ".."), ...toParts.slice(common)].join("/") || ".";
}

const WatchKind = {
  Create: 1,
  Change: 2,
  Delete: 4,
} as const;

function createResolutionLookupPatterns(workspaceDirectory: string, defaultLibraryPath: string | undefined, projectDirectory: string): WatchPatternSet {
  const roots = new Set<string>();
  roots.add(projectDirectory);
  if (defaultLibraryPath !== undefined && defaultLibraryPath !== "") roots.add(defaultLibraryPath);
  roots.add(`${workspaceDirectory}/node_modules`);
  const patternsInsideWorkspace: string[] = [];
  const patternsOutsideWorkspace: string[] = [];
  for (const root of roots) {
    const pattern = getRecursiveGlobPattern(root);
    if (isInsidePath(workspaceDirectory, root)) patternsInsideWorkspace.push(pattern);
    else patternsOutsideWorkspace.push(pattern);
  }
  return {
    patternsInsideWorkspace: patternsInsideWorkspace.sort(),
    patternsOutsideWorkspace: patternsOutsideWorkspace.sort(),
    ignored: [`${normalizeSlashes(projectDirectory)}/**/node_modules/**`],
  };
}

function getTypingsLocationGlobs(filesToWatch: readonly string[], typingsLocation: string | undefined, currentDirectory: string): WatchPatternSet {
  const patternsInsideWorkspace: string[] = [];
  const patternsOutsideWorkspace: string[] = [];
  for (const file of filesToWatch) {
    const normalized = normalizeSlashes(file);
    if (typingsLocation !== undefined && isInsidePath(typingsLocation, normalized)) {
      patternsOutsideWorkspace.push(normalized);
    } else if (isInsidePath(currentDirectory, normalized)) {
      patternsInsideWorkspace.push(normalized);
    } else {
      patternsOutsideWorkspace.push(normalized);
    }
  }
  return {
    patternsInsideWorkspace: patternsInsideWorkspace.sort(),
    patternsOutsideWorkspace: patternsOutsideWorkspace.sort(),
    ignored: [],
  };
}

function getRecursiveGlobPattern(directory: string): string {
  return `${normalizeSlashes(directory).replace(/\/$/, "")}/**/*`;
}

function isInsidePath(parent: string, child: string): boolean {
  const parentPath = normalizeSlashes(parent).replace(/\/$/, "");
  const childPath = normalizeSlashes(child);
  return childPath === parentPath || childPath.startsWith(`${parentPath}/`);
}

function typingsInfoEquals(left: TypingsInfo, right: TypingsInfo): boolean {
  if (left.projectRootPath !== right.projectRootPath || left.safeListPath !== right.safeListPath) return false;
  if (!sameRootFiles(left.unresolvedImports, right.unresolvedImports)) return false;
  if (left.compilerOptions.size !== right.compilerOptions.size) return false;
  for (const [key, value] of left.compilerOptions) {
    if (right.compilerOptions.get(key) !== value) return false;
  }
  return true;
}

function compilerOptionsMap(options: object | undefined): ReadonlyMap<string, unknown> {
  if (options instanceof Map) return new Map(options.entries());
  return new Map(Object.entries(options ?? {}));
}

function sameRootFiles(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const a = [...left].map(normalizeSlashes).sort();
  const b = [...right].map(normalizeSlashes).sort();
  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) return false;
  }
  return true;
}
