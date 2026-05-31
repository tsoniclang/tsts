import { createProgram, type CompilerHost, type CompilerOptions } from "../program/index.js";
import {
  hasExcessiveNonCreateWatchEvents,
  newFileChangeSummary,
  type FileChangeSummary,
} from "./fileChange.js";
import { newLogTree, type LogTree } from "./logging/logtree.js";
import { inferredProjectName, Kind, PendingReload, ProgramUpdateKind, Project } from "./project.js";
import { ProjectCollection } from "./projectCollection.js";
import { ProjectTreeRequest, type APISnapshotRequest, type Snapshot } from "./snapshot.js";

export interface ProjectConfig {
  readonly configFileName: string;
  readonly rootFileNames: readonly string[];
  readonly compilerOptions?: CompilerOptions;
}

export interface ProjectCollectionBuilderOptions {
  readonly currentDirectory: string;
  readonly host: CompilerHost;
  readonly logger?: LogTree;
}

export class ProjectCollectionBuilder {
  readonly currentDirectory: string;
  readonly host: CompilerHost;
  readonly logger: LogTree;
  private readonly collection: ProjectCollection;
  private readonly configs: ProjectConfig[] = [];
  private readonly fileDefaultProjects = new Map<string, string>();
  private readonly apiOpenedProjects = new Set<string>();
  private programStructureChanged = false;
  private defaultProjectsInvalidated = false;
  private openFilesChanged = false;

  constructor(options: ProjectCollectionBuilderOptions) {
    this.currentDirectory = options.currentDirectory;
    this.host = options.host;
    this.logger = options.logger ?? newLogTree("project-builder");
    this.collection = new ProjectCollection(fileName => this.toPath(fileName));
  }

  addConfig(config: ProjectConfig): Project {
    this.configs.push(config);
    const project = new Project({
      configFileName: config.configFileName,
      kind: Kind.Configured,
      currentDirectory: this.currentDirectory,
      rootFileNames: config.rootFileNames,
      compilerOptions: config.compilerOptions,
      logger: this.logger,
    });
    this.collection.addProject(project);
    return project;
  }

  addInferredProject(rootFileNames: readonly string[], compilerOptions?: CompilerOptions): Project {
    const project = new Project({
      configFileName: "/dev/null/inferred",
      kind: Kind.Inferred,
      currentDirectory: this.currentDirectory,
      rootFileNames,
      compilerOptions,
      logger: this.logger,
    });
    this.collection.addProject(project);
    return project;
  }

  updatePrograms(snapshot?: Snapshot): ProjectCollection {
    for (const project of this.collection.projects()) {
      this.updateProgram(project, snapshot);
    }
    return this.collection;
  }

  build(): ProjectCollection {
    return this.collection.clone();
  }

  finalize(snapshot?: Snapshot): ProjectCollection {
    this.updatePrograms(snapshot);
    return this.build();
  }

  handleAPIRequest(apiRequest: APISnapshotRequest, snapshot?: Snapshot, logger: LogTree = this.logger): ProjectCollection {
    for (const projectName of apiRequest.closeProjects ?? []) {
      const path = this.toPath(projectName);
      this.apiOpenedProjects.delete(path);
      const project = this.collection.get(path);
      if (project !== undefined && !this.fileDefaultProjectsHasProject(path)) {
        this.collection.removeProject(project.id());
        logger.log(`Closed API project ${projectName}`);
      }
    }
    for (const projectName of apiRequest.openProjects ?? []) {
      const project = this.findOrCreateProject(projectName, this.toPath(projectName), logger);
      this.apiOpenedProjects.add(project.id());
      this.updateProgram(project, snapshot);
      logger.log(`Opened API project ${projectName}`);
    }
    for (const projectId of this.apiOpenedProjects) {
      const project = this.collection.get(projectId);
      if (project !== undefined) this.updateProgram(project, snapshot);
    }
    return this.build();
  }

  didChangeFiles(summary: FileChangeSummary, snapshot?: Snapshot, logger: LogTree = this.logger): void {
    this.openFilesChanged = this.openFilesChanged
      || summary.opened !== undefined
      || summary.reopened !== undefined
      || summary.closed.size > 0;
    const changedPaths = [...summary.changed].map(fileName => this.toPath(fileName));
    const deletedPaths = [...summary.deleted].map(fileName => this.toPath(fileName));
    const createdPaths = [...summary.created].map(fileName => this.toPath(fileName));
    for (const project of this.collection.projects()) {
      if (summary.invalidateAll || hasExcessiveNonCreateWatchEvents(summary)) {
        project.markDirty(undefined, PendingReload.Full);
        logger.log(`Marking project dirty due to broad file changes: ${project.id()}`);
        continue;
      }
      this.markFilesChanged(project, changedPaths, PendingReload.FileNames, logger);
      this.markFilesChanged(project, deletedPaths, PendingReload.Full, logger);
      this.markFilesChanged(project, createdPaths, PendingReload.FileNames, logger);
    }
    const openedFile = summary.opened ?? summary.reopened;
    if (openedFile !== undefined) {
      const openedPath = this.toPath(openedFile);
      const project = this.ensureDefaultProjectForFile(openedFile, openedPath, snapshot, logger);
      this.collection.openFile(openedFile, project);
      this.fileDefaultProjects.set(openedPath, project.id());
    }
    for (const fileName of summary.closed) {
      this.collection.closeFile(fileName);
      this.fileDefaultProjects.delete(this.toPath(fileName));
    }
    if (this.openFilesChanged) this.cleanupInferredProject(snapshot, logger);
  }

  didRequestFile(fileNameOrUri: string, configuredProjectsOnly = false, snapshot?: Snapshot, logger: LogTree = this.logger): Project | undefined {
    const fileName = this.uriFileName(fileNameOrUri);
    const path = this.toPath(fileName);
    if (this.defaultProjectsInvalidated) {
      this.ensureDefaultProjectForFile(fileName, path, snapshot, logger);
      this.defaultProjectsInvalidated = false;
    }
    const defaultProject = this.findDefaultProject(path);
    if (defaultProject !== undefined) {
      this.updateProgram(defaultProject, snapshot);
      if (this.programStructureChanged) this.cleanupInferredProject(snapshot, logger);
      return defaultProject;
    }
    if (configuredProjectsOnly) return undefined;
    const inferred = this.ensureInferredProjectIncludesFile(fileName, snapshot, logger);
    return inferred;
  }

  didRequestProject(projectId: string, snapshot?: Snapshot, logger: LogTree = this.logger): Project | undefined {
    const normalized = this.toPath(projectId);
    const project = normalized === inferredProjectName || projectId === inferredProjectName
      ? this.collection.inferredProjects()[0]
      : this.collection.get(normalized) ?? this.collection.get(projectId);
    if (project !== undefined) {
      this.updateProgram(project, snapshot);
      logger.log(`Completed project update request for ${project.id()}`);
    }
    return project;
  }

  didRequestProjectTrees(request: ProjectTreeRequest, snapshot?: Snapshot, logger: LogTree = this.logger): readonly Project[] {
    const projects: Project[] = [];
    for (const project of this.collection.configuredProjects()) {
      if (request.isAllProjects() || request.isProjectReferenced(project.id())) {
        this.updateProgram(project, snapshot);
        projects.push(project);
      }
    }
    logger.log(`Completed project tree request for ${request.projects().join(",")}`);
    return projects;
  }

  didChangeCustomConfigFileName(logger: LogTree = this.logger): void {
    this.fileDefaultProjects.clear();
    this.defaultProjectsInvalidated = true;
    this.programStructureChanged = true;
    logger.log("Invalidated default projects after custom config file-name change");
  }

  didUpdateCompilerOptionsForInferredProjects(compilerOptions: CompilerOptions, snapshot?: Snapshot, logger: LogTree = this.logger): Project | undefined {
    const inferred = this.collection.inferredProjects()[0];
    if (inferred === undefined) return undefined;
    const replacement = new Project({
      configFileName: inferredProjectName,
      kind: Kind.Inferred,
      currentDirectory: this.currentDirectory,
      rootFileNames: inferred.rootFileNames,
      compilerOptions,
      logger,
    });
    this.collection.removeProject(inferred.id());
    this.collection.addProject(replacement);
    this.updateProgram(replacement, snapshot);
    return replacement;
  }

  cleanupInferredProject(snapshot?: Snapshot, logger: LogTree = this.logger): Project | undefined {
    const summary = newFileChangeSummary();
    const inferredRoots = new Set<string>();
    for (const project of this.collection.projects()) {
      for (const fileName of project.rootFileNames) {
        const path = this.toPath(fileName);
        if (this.fileDefaultProjects.get(path) === undefined && this.collection.getDefaultProject(path) === undefined) {
          inferredRoots.add(fileName);
        }
      }
    }
    if (summary.opened !== undefined) inferredRoots.add(summary.opened);
    return this.updateInferredProjectRoots([...inferredRoots], snapshot, logger);
  }

  ensureInferredProjectIncludesClosedFile(fileName: string, snapshot?: Snapshot, logger: LogTree = this.logger): Project {
    return this.ensureInferredProjectIncludesFile(fileName, snapshot, logger);
  }

  private updateProgram(project: Project, snapshot?: Snapshot): boolean {
    if (!project.dirty && project.program !== undefined) return false;
    const oldProgram = project.program;
    const program = createProgram(project.rootFileNames, project.compilerOptions ?? {}, this.host);
    const updateKind = oldProgram === undefined
      ? ProgramUpdateKind.NewFiles
      : sameRootFiles(project.rootFileNames, program.sourceFiles.map(file => file.fileName))
        ? ProgramUpdateKind.SameFileNames
        : ProgramUpdateKind.Cloned;
    project.setProgram(program, snapshot?.id() ?? 0, updateKind);
    this.programStructureChanged = this.programStructureChanged || updateKind !== ProgramUpdateKind.SameFileNames;
    return true;
  }

  private markFilesChanged(project: Project, paths: readonly string[], reload: PendingReload, logger: LogTree): void {
    for (const path of paths) {
      if (project.containsFile(path) || project.isSourceFromProjectReference(path)) {
        project.markDirty(path, reload);
        logger.log(`Marking project dirty due to file change: ${project.id()} ${path}`);
        return;
      }
    }
  }

  private ensureDefaultProjectForFile(fileName: string, path: string, snapshot: Snapshot | undefined, logger: LogTree): Project {
    const existing = this.findDefaultProject(path);
    if (existing !== undefined) {
      this.updateProgram(existing, snapshot);
      return existing;
    }
    const configured = this.configs.find(config => config.rootFileNames.some(root => this.toPath(root) === path));
    if (configured !== undefined) {
      const project = this.findOrCreateProject(configured.configFileName, this.toPath(configured.configFileName), logger, configured);
      this.updateProgram(project, snapshot);
      return project;
    }
    return this.ensureInferredProjectIncludesFile(fileName, snapshot, logger);
  }

  private findDefaultProject(path: string): Project | undefined {
    const explicit = this.fileDefaultProjects.get(path);
    if (explicit !== undefined) {
      const project = this.collection.get(explicit);
      if (project !== undefined) return project;
    }
    return this.collection.getDefaultProject(path);
  }

  private findOrCreateProject(configFileName: string, configPath: string, logger: LogTree, config?: ProjectConfig): Project {
    const existing = this.collection.get(configPath);
    if (existing !== undefined) return existing;
    const selected = config ?? this.configs.find(candidate => this.toPath(candidate.configFileName) === configPath);
    const project = new Project({
      configFileName,
      configFilePath: configPath,
      kind: Kind.Configured,
      currentDirectory: this.currentDirectory,
      rootFileNames: selected?.rootFileNames ?? [],
      compilerOptions: selected?.compilerOptions,
      logger,
    });
    this.collection.addProject(project);
    return project;
  }

  private updateInferredProjectRoots(rootFileNames: readonly string[], snapshot: Snapshot | undefined, logger: LogTree): Project | undefined {
    const uniqueRoots = [...new Set(rootFileNames.map(fileName => normalize(fileName)))].sort();
    const existing = this.collection.inferredProjects()[0];
    if (uniqueRoots.length === 0) {
      if (existing !== undefined) this.collection.removeProject(existing.id());
      return undefined;
    }
    if (existing !== undefined && sameRootFiles(existing.rootFileNames, uniqueRoots)) {
      this.updateProgram(existing, snapshot);
      return existing;
    }
    if (existing !== undefined) this.collection.removeProject(existing.id());
    const project = new Project({
      configFileName: inferredProjectName,
      kind: Kind.Inferred,
      currentDirectory: this.currentDirectory,
      rootFileNames: uniqueRoots,
      logger,
    });
    this.collection.addProject(project);
    this.updateProgram(project, snapshot);
    return project;
  }

  private ensureInferredProjectIncludesFile(fileName: string, snapshot: Snapshot | undefined, logger: LogTree): Project {
    const existing = this.collection.inferredProjects()[0];
    const roots = new Set(existing?.rootFileNames ?? []);
    roots.add(fileName);
    return this.updateInferredProjectRoots([...roots], snapshot, logger)!;
  }

  private fileDefaultProjectsHasProject(projectId: string): boolean {
    for (const value of this.fileDefaultProjects.values()) if (value === projectId) return true;
    return false;
  }

  private uriFileName(uri: string): string {
    if (uri.startsWith("file://")) return decodeURIComponent(uri.slice("file://".length));
    return uri;
  }

  private toPath(fileName: string): string {
    const normalized = fileName.replaceAll("\\", "/");
    if (normalized.startsWith("/")) return normalize(normalized);
    return normalize(`${this.currentDirectory}/${normalized}`);
  }
}

function normalize(path: string): string {
  const parts: string[] = [];
  for (const part of path.split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return path.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}

function sameRootFiles(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const a = [...left].map(normalize).sort();
  const b = [...right].map(normalize).sort();
  for (let index = 0; index < a.length; index++) {
    if (a[index] !== b[index]) return false;
  }
  return true;
}
