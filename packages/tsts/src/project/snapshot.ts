import type { CompilerOptions } from "../program/index.js";
import { ProjectCollection } from "./projectcollection.js";
import { ConfigFileRegistry } from "./configfileregistry.js";
import type { FileChangeSummary } from "./filechange.js";
import { SnapshotFS, type FileHandle } from "./snapshotfs.js";

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
  }

  id(): number {
    return this.snapshotId;
  }

  parentId(): number {
    return this.snapshotParentId;
  }

  ref(): void {
    this.refs += 1;
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
