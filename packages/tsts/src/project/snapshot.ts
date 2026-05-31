import type { CompilerOptions } from "../program/index.js";
import { ProjectCollection } from "./projectCollection.js";
import { ConfigFileRegistry } from "./configFileRegistry.js";
import type { FileChangeSummary } from "./fileChange.js";
import { SnapshotFS, type FileHandle } from "./snapshotFs.js";
import type { ATAStateChange } from "./ata/ata.js";
import type { LogTree } from "./logging/logtree.js";
import type { UpdateReason } from "./session.js";
import type { WatchedFiles } from "./project.js";

export interface SnapshotOptions {
  readonly id: number;
  readonly parentId: number;
  readonly fs: SnapshotFS;
  readonly currentDirectory: string;
  readonly useCaseSensitiveFileNames: boolean;
  readonly fileChanges: FileChangeSummary;
  readonly compilerOptionsForInferredProjects?: CompilerOptions;
  readonly userPreferences?: ReadonlyMap<string, unknown>;
  readonly projectCollection?: ProjectCollection;
  readonly configFileRegistry?: ConfigFileRegistry;
  readonly autoImports?: unknown;
  readonly autoImportsWatch?: WatchedFiles<ReadonlyMap<string, string>> | undefined;
  readonly builderLogs?: LogTree | undefined;
  readonly apiError?: Error | undefined;
}

export interface APISnapshotRequest {
  readonly openProjects?: ReadonlySet<string>;
  readonly closeProjects?: ReadonlySet<string>;
}

export class ProjectTreeRequest {
  private readonly referencedProjects: ReadonlySet<string> | undefined;

  constructor(referencedProjects?: ReadonlySet<string>) {
    this.referencedProjects = referencedProjects;
  }

  isAllProjects(): boolean {
    return this.referencedProjects === undefined;
  }

  isProjectReferenced(projectID: string): boolean {
    return this.referencedProjects?.has(projectID) ?? false;
  }

  projects(): readonly string[] {
    return this.referencedProjects === undefined ? [] : [...this.referencedProjects];
  }
}

export interface ResourceRequest {
  readonly documents?: readonly string[];
  readonly configuredProjectDocuments?: readonly string[];
  readonly projects?: readonly string[];
  readonly projectTree?: ProjectTreeRequest;
  readonly autoImports?: string;
}

export interface SnapshotChange extends ResourceRequest {
  readonly reason: UpdateReason;
  readonly fileChanges: FileChangeSummary;
  readonly compilerOptionsForInferredProjects?: CompilerOptions;
  readonly userPreferences?: ReadonlyMap<string, unknown>;
  readonly ataChanges?: ReadonlyMap<string, ATAStateChange>;
  readonly apiRequest?: APISnapshotRequest;
  readonly cleanDiskCache?: boolean;
}

export class Snapshot {
  private readonly snapshotId: number;
  private readonly snapshotParentId: number;
  private refs = 1;
  readonly fs: SnapshotFS;
  readonly currentDirectory: string;
  readonly useCaseSensitiveFileNamesValue: boolean;
  readonly projectCollection: ProjectCollection;
  readonly configFileRegistry: ConfigFileRegistry;
  readonly compilerOptionsForInferredProjects: CompilerOptions | undefined;
  readonly userPreferences: ReadonlyMap<string, unknown>;
  readonly fileChanges: FileChangeSummary;
  readonly autoImports: unknown;
  readonly autoImportsWatch: WatchedFiles<ReadonlyMap<string, string>> | undefined;
  readonly converters: SnapshotConverters;
  readonly builderLogs: LogTree | undefined;
  readonly apiError: Error | undefined;

  constructor(options: SnapshotOptions) {
    this.snapshotId = options.id;
    this.snapshotParentId = options.parentId;
    this.fs = options.fs;
    this.currentDirectory = options.currentDirectory;
    this.useCaseSensitiveFileNamesValue = options.useCaseSensitiveFileNames;
    this.fileChanges = options.fileChanges;
    this.compilerOptionsForInferredProjects = options.compilerOptionsForInferredProjects;
    this.userPreferences = options.userPreferences ?? new Map();
    this.projectCollection = options.projectCollection ?? new ProjectCollection(fileName => this.toPath(fileName));
    this.configFileRegistry = options.configFileRegistry ?? new ConfigFileRegistry();
    this.autoImports = options.autoImports;
    this.autoImportsWatch = options.autoImportsWatch;
    this.converters = new SnapshotConverters(this.lspLineMap.bind(this));
    this.builderLogs = options.builderLogs;
    this.apiError = options.apiError;
  }

  id(): number {
    return this.snapshotId;
  }

  parentId(): number {
    return this.snapshotParentId;
  }

  ref(): void {
    if (this.refs <= 0) throw new Error(`snapshot ${this.snapshotId}: ref on disposed snapshot`);
    this.refs += 1;
  }

  tryRef(): boolean {
    if (this.refs <= 0) return false;
    this.refs += 1;
    return true;
  }

  deref(): boolean {
    this.refs -= 1;
    if (this.refs < 0) throw new Error("snapshot refcount went below zero");
    return this.refs === 0;
  }

  refCount(): number {
    return this.refs;
  }

  getFile(fileName: string): FileHandle | undefined {
    return this.fs.getFile(fileName);
  }

  lspLineMap(fileName: string): readonly number[] | undefined {
    return this.fs.getFile(fileName)?.lineMap();
  }

  ecmaLineInfo(fileName: string): readonly number[] | undefined {
    return this.lspLineMap(fileName);
  }

  getPreferences(_activeFile?: string): ReadonlyMap<string, unknown> {
    return this.userPreferences;
  }

  userPreferencesSnapshot(): ReadonlyMap<string, unknown> {
    return this.userPreferences;
  }

  getConverters(): SnapshotConverters {
    return this.converters;
  }

  autoImportRegistry(): unknown {
    return this.autoImports;
  }

  clone(change: SnapshotChange, init?: Partial<SnapshotOptions>): Snapshot {
    const parentId = this.snapshotId;
    const nextOptions: SnapshotOptions = {
      id: init?.id ?? parentId + 1,
      parentId,
      fs: init?.fs ?? this.fs.clone(),
      currentDirectory: init?.currentDirectory ?? this.currentDirectory,
      useCaseSensitiveFileNames: init?.useCaseSensitiveFileNames ?? this.useCaseSensitiveFileNamesValue,
      fileChanges: change.fileChanges,
      projectCollection: init?.projectCollection ?? this.projectCollection.clone(),
      configFileRegistry: init?.configFileRegistry ?? this.configFileRegistry.clone(),
      userPreferences: change.userPreferences ?? this.userPreferences,
      autoImports: init?.autoImports ?? this.autoImports,
      autoImportsWatch: init?.autoImportsWatch ?? this.autoImportsWatch,
      builderLogs: init?.builderLogs ?? this.builderLogs,
      apiError: init?.apiError ?? this.apiError,
      ...(change.compilerOptionsForInferredProjects !== undefined
        ? { compilerOptionsForInferredProjects: change.compilerOptionsForInferredProjects }
        : this.compilerOptionsForInferredProjects !== undefined
          ? { compilerOptionsForInferredProjects: this.compilerOptionsForInferredProjects }
          : {}),
    };
    const snapshot = new Snapshot(nextOptions);
    snapshot.applyResourceRequest(change);
    return snapshot;
  }

  readFile(fileName: string): string | undefined {
    return this.fs.readFile(fileName);
  }

  fileExists(fileName: string): boolean {
    return this.fs.fileExists(fileName);
  }

  directoryExists(path: string): boolean {
    return this.fs.directoryExists(path);
  }

  getDirectories(path: string): readonly string[] {
    return this.fs.getDirectories(path);
  }

  readDirectory(currentDir: string, path: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[], depth = Number.POSITIVE_INFINITY): readonly string[] {
    return this.fs.readDirectory(currentDir, path, extensions, excludes, includes, depth);
  }

  getDefaultProject(uri: string) {
    return this.projectCollection.getDefaultProject(this.toPath(uri));
  }

  getProjectsContainingFile(uri: string) {
    return this.projectCollection.getProjectsContainingFile(this.toPath(uri));
  }

  useCaseSensitiveFileNames(): boolean {
    return this.useCaseSensitiveFileNamesValue;
  }

  toPath(fileName: string): string {
    const normalized = fileName.replaceAll("\\", "/");
    if (normalized.startsWith("/")) return normalizePath(normalized, this.useCaseSensitiveFileNamesValue);
    return normalizePath(`${this.currentDirectory}/${normalized}`, this.useCaseSensitiveFileNamesValue);
  }

  private applyResourceRequest(change: SnapshotChange): void {
    for (const projectId of change.apiRequest?.closeProjects ?? []) this.projectCollection.closeAPIProject(projectId);
    for (const projectId of change.apiRequest?.openProjects ?? []) this.projectCollection.openAPIProject(projectId);
    for (const fileName of change.fileChanges.closed) this.projectCollection.closeFile(fileName);
    const opened = change.fileChanges.opened ?? change.fileChanges.reopened;
    if (opened !== undefined) {
      const project = this.projectCollection.getDefaultProject(opened) ?? this.projectCollection.inferredProject();
      if (project !== undefined) this.projectCollection.openFile(opened, project);
    }
    for (const document of change.documents ?? []) this.projectCollection.getDefaultProject(document);
    for (const document of change.configuredProjectDocuments ?? []) this.projectCollection.getProjectsContainingFile(document);
    for (const projectId of change.projects ?? []) this.projectCollection.getProjectByPath(projectId);
    change.projectTree?.projects();
    change.autoImports;
    change.ataChanges;
    change.cleanDiskCache;
  }
}

export class SnapshotConverters {
  private readonly lineMap: (fileName: string) => readonly number[] | undefined;

  constructor(lineMap: (fileName: string) => readonly number[] | undefined) {
    this.lineMap = lineMap;
  }

  lineAndCharacter(fileName: string, position: number): { readonly line: number; readonly character: number } {
    const starts = this.lineMap(fileName) ?? [0];
    let line = 0;
    for (let index = 0; index < starts.length; index += 1) {
      const start = starts[index]!;
      if (start > position) break;
      line = index;
    }
    return { line, character: Math.max(0, position - (starts[line] ?? 0)) };
  }

  position(fileName: string, line: number, character: number): number {
    const starts = this.lineMap(fileName) ?? [0];
    return (starts[line] ?? starts[starts.length - 1] ?? 0) + character;
  }
}

function normalizePath(path: string, caseSensitive: boolean): string {
  const parts: string[] = [];
  for (const part of path.replaceAll("\\", "/").split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  const normalized = path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
  return caseSensitive ? normalized : normalized.toLowerCase();
}
