import type { Program } from "../program/index.js";
import type { FileChangeSummary } from "./filechange.js";
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
}

export interface ProjectDiagnostic {
  readonly fileName?: string;
  readonly message: string;
}

export class Project {
  readonly kind: Kind;
  readonly currentDirectory: string;
  readonly configFileNameValue: string;
  readonly configFilePathValue: string;
  readonly rootFileNames: readonly string[];
  readonly compilerOptions: object | undefined;
  program: Program | undefined;
  programUpdateKind: ProgramUpdateKind = ProgramUpdateKind.None;
  programLastUpdate = 0;
  dirty = true;
  dirtyFilePath: string | undefined;
  pendingReload: PendingReload = PendingReload.None;
  private readonly files = new Set<string>();
  private readonly referencedProjects = new Set<string>();

  constructor(options: ProjectOptions) {
    this.kind = options.kind;
    this.currentDirectory = options.currentDirectory;
    this.configFileNameValue = options.configFileName;
    this.configFilePathValue = options.configFilePath ?? toPath(options.configFileName, options.currentDirectory);
    this.rootFileNames = options.rootFileNames ?? [];
    this.compilerOptions = options.compilerOptions;
    options.logger?.log(`Creating ${projectKindToString(this.kind)}Project: ${options.configFileName}`);
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
    this.referencedProjects.add(path);
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
    for (const file of this.files) project.files.add(file);
    for (const reference of this.referencedProjects) project.referencedProjects.add(reference);
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
