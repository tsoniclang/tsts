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

type ProjectLoadKind = 0 | 1;
const ProjectLoadKind = {
  Find: 0 as ProjectLoadKind,
  Create: 1 as ProjectLoadKind,
} as const;

interface SearchNode {
  readonly configFileName: string;
  readonly loadKind: ProjectLoadKind;
  readonly depth: number;
}

interface SearchResult {
  readonly project?: Project;
  readonly retain: ReadonlySet<string>;
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
      if (project === undefined) continue;
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
      const project = this.ensureConfiguredProjectAndAncestorsForFile(openedFile, openedPath, snapshot, logger).project
        ?? this.ensureInferredProjectIncludesFile(openedFile, snapshot, logger);
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
      this.ensureConfiguredProjectAndAncestorsForFile(fileName, path, snapshot, logger);
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
      if (request.isAllProjects() || project.hasPotentialProjectReference(request) || request.isProjectReferenced(project.id())) {
        this.ensureProjectTree(project, request, new Set(), projects, snapshot, logger);
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

  didUpdateAtaState(changes: ReadonlyMap<string, { readonly typingsFiles: readonly string[] }>, snapshot?: Snapshot, logger: LogTree = this.logger): void {
    for (const [projectId, change] of changes) {
      const project = projectId === inferredProjectName
        ? this.collection.inferredProjects()[0]
        : this.collection.get(projectId);
      if (project === undefined) continue;
      const roots = [...new Set([...project.rootFileNames, ...change.typingsFiles])].sort();
      const replacement = new Project({
        configFileName: project.name(),
        configFilePath: project.id(),
        kind: project.kind,
        currentDirectory: project.currentDirectory,
        rootFileNames: roots,
        compilerOptions: project.compilerOptions,
        logger,
      });
      this.collection.removeProject(project.id());
      this.collection.addProject(replacement);
      this.updateProgram(replacement, snapshot);
      logger.log(`Updated ATA state for project ${project.id()}`);
    }
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

  private forEachProject(callback: (project: Project) => boolean | void): void {
    for (const project of this.collection.projects()) {
      if (callback(project) === false) return;
    }
  }

  private ensureProjectTree(
    project: Project,
    request: ProjectTreeRequest,
    seenProjects: Set<string>,
    output: Project[],
    snapshot: Snapshot | undefined,
    logger: LogTree,
  ): void {
    if (seenProjects.has(project.id())) return;
    seenProjects.add(project.id());
    this.updateProgram(project, snapshot);
    output.push(project);
    if (!request.isAllProjects() && !request.isProjectReferenced(project.id()) && !project.hasPotentialProjectReference(request)) return;

    const childReferences = new Set<string>([
      ...project.potentialProjectReferencePaths(),
      ...project.resolvedProjectReferencePaths(),
      ...this.projectReferenceConfigNames(project.compilerOptions === undefined
        ? {
          configFileName: project.name(),
          rootFileNames: project.rootFileNames,
        }
        : {
          configFileName: project.name(),
          rootFileNames: project.rootFileNames,
          compilerOptions: project.compilerOptions as CompilerOptions,
        }),
    ].map(reference => this.toPath(reference)));
    for (const reference of childReferences) {
      if (!request.isAllProjects() && !request.isProjectReferenced(reference)) continue;
      const child = this.findOrCreateProject(reference, reference, logger, undefined, ProjectLoadKind.Create);
      if (child !== undefined) this.ensureProjectTree(child, request, seenProjects, output, snapshot, logger);
    }
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

  private findDefaultProject(path: string): Project | undefined {
    return this.findDefaultConfiguredProject(path) ?? this.findDefaultInferredProject(path);
  }

  private findDefaultConfiguredProject(path: string): Project | undefined {
    const explicit = this.fileDefaultProjects.get(path);
    if (explicit !== undefined && explicit !== inferredProjectName) {
      const project = this.collection.get(explicit);
      if (project !== undefined) return project;
    }
    const configuredProjects = [...this.collection.configuredProjects()].sort((left, right) => left.id().localeCompare(right.id()));
    const [project, multipleCandidates] = findDefaultConfiguredProjectFromProgramInclusion(path, configuredProjects);
    if (multipleCandidates) {
      const direct = this.configs.find(config => config.rootFileNames.some(root => this.toPath(root) === path));
      if (direct !== undefined) return this.collection.get(this.toPath(direct.configFileName)) ?? project;
    }
    return project;
  }

  private findDefaultInferredProject(path: string): Project | undefined {
    const explicit = this.fileDefaultProjects.get(path);
    if (explicit === inferredProjectName) return this.collection.inferredProjects()[0];
    const inferred = this.collection.inferredProjects()[0];
    if (inferred !== undefined && inferred.containsFile(path)) {
      this.fileDefaultProjects.set(path, inferredProjectName);
      return inferred;
    }
    return undefined;
  }

  private ensureConfiguredProjectAndAncestorsForFile(fileName: string, path: string, snapshot: Snapshot | undefined, logger: LogTree): SearchResult {
    const result = this.findOrCreateDefaultConfiguredProjectForFile(fileName, path, ProjectLoadKind.Create, snapshot, logger);
    if (result.project !== undefined) this.createAncestorTree(fileName, path, result, snapshot, logger);
    return result;
  }

  private createAncestorTree(fileName: string, path: string, openResult: SearchResult, snapshot: Snapshot | undefined, logger: LogTree): void {
    let current = openResult.project;
    const retain = new Set(openResult.retain);
    while (current !== undefined) {
      const ancestorConfigName = this.getAncestorConfigFileName(fileName, path, current.configFileNameValue);
      if (ancestorConfigName === undefined) return;
      const ancestorPath = this.toPath(ancestorConfigName);
      const ancestor = this.findOrCreateProject(ancestorConfigName, ancestorPath, logger);
      if (ancestor === undefined) return;
      retain.add(ancestorPath);
      ancestor.addPotentialProjectReference(current.id());
      this.updateProgram(ancestor, snapshot);
      current = ancestor;
    }
  }

  private findOrCreateDefaultConfiguredProjectForFile(fileName: string, path: string, loadKind: ProjectLoadKind, snapshot: Snapshot | undefined, logger: LogTree): SearchResult {
    const explicit = this.fileDefaultProjects.get(path);
    if (explicit !== undefined) {
      if (explicit === inferredProjectName) return { retain: new Set() };
      const project = this.collection.get(explicit);
      return project === undefined ? { retain: new Set([explicit]) } : { project, retain: new Set([explicit]) };
    }
    const directConfig = this.getConfigFileNameForFile(fileName, path);
    if (directConfig === undefined) return { retain: new Set() };
    const result = this.findOrCreateDefaultConfiguredProjectWorker(fileName, path, directConfig, loadKind, snapshot, logger);
    if (result.project !== undefined) this.fileDefaultProjects.set(path, result.project.id());
    logger.log(result.project === undefined
      ? `No default configured project found for ${fileName}`
      : `Found default configured project for ${fileName}: ${result.project.name()}`);
    return result;
  }

  private findOrCreateDefaultConfiguredProjectWorker(fileName: string, path: string, configFileName: string, loadKind: ProjectLoadKind, snapshot: Snapshot | undefined, logger: LogTree): SearchResult {
    const visited = new Set<string>();
    const queue: SearchNode[] = [{ configFileName, loadKind, depth: 0 }];
    const retain = new Set<string>();
    let fallback: Project | undefined;
    while (queue.length > 0) {
      const node = queue.shift()!;
      const key = `${node.loadKind}:${this.toPath(node.configFileName)}`;
      if (visited.has(key)) continue;
      visited.add(key);
      const configPath = this.toPath(node.configFileName);
      const config = this.configs.find(candidate => this.toPath(candidate.configFileName) === configPath);
      if (config === undefined) continue;
      retain.add(configPath);
      const project = this.findOrCreateProject(node.configFileName, configPath, logger, config, node.loadKind);
      if (project === undefined) continue;
      if (node.loadKind === ProjectLoadKind.Create) this.updateProgram(project, snapshot);
      const contains = project.containsFile(path) || config.rootFileNames.some(root => this.toPath(root) === path);
      if (contains && !project.isSourceFromProjectReference(path)) return { project, retain };
      if (contains) fallback ??= project;
      for (const reference of this.projectReferenceConfigNames(config)) {
        queue.push({ configFileName: reference, loadKind: node.loadKind, depth: node.depth + 1 });
      }
    }
    if (fallback !== undefined) return { project: fallback, retain };
    const ancestor = this.getAncestorConfigFileName(fileName, path, configFileName);
    if (ancestor !== undefined) return this.findOrCreateDefaultConfiguredProjectWorker(fileName, path, ancestor, loadKind, snapshot, logger);
    return { retain };
  }

  private findOrCreateProject(configFileName: string, configPath: string, logger: LogTree, config?: ProjectConfig, loadKind: ProjectLoadKind = ProjectLoadKind.Create): Project | undefined {
    const existing = this.collection.get(configPath);
    if (existing !== undefined) return existing;
    if (loadKind === ProjectLoadKind.Find) return undefined;
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

  private getConfigFileNameForFile(fileName: string, path: string): string | undefined {
    const direct = this.configs.find(config => config.rootFileNames.some(root => this.toPath(root) === path));
    if (direct !== undefined) return direct.configFileName;
    let current = dirname(fileName);
    while (current !== "") {
      const candidate = normalize(`${current}/tsconfig.json`);
      if (this.configs.some(config => this.toPath(config.configFileName) === this.toPath(candidate))) return candidate;
      const parent = dirname(current);
      if (parent === current) break;
      current = parent;
    }
    return undefined;
  }

  private getAncestorConfigFileName(fileName: string, path: string, currentConfigFileName: string): string | undefined {
    let current = dirname(dirname(currentConfigFileName));
    while (current !== "") {
      const candidate = normalize(`${current}/tsconfig.json`);
      if (this.toPath(candidate) !== this.toPath(currentConfigFileName)
        && this.configs.some(config => this.toPath(config.configFileName) === this.toPath(candidate))
        && this.configCouldReferenceFile(candidate, fileName, path)) {
        return candidate;
      }
      const parent = dirname(current);
      if (parent === current) break;
      current = parent;
    }
    return undefined;
  }

  private configCouldReferenceFile(configFileName: string, fileName: string, path: string): boolean {
    const config = this.configs.find(candidate => this.toPath(candidate.configFileName) === this.toPath(configFileName));
    if (config === undefined) return false;
    if (config.rootFileNames.some(root => this.toPath(root) === path)) return true;
    return this.projectReferenceConfigNames(config).some(reference => this.toPath(reference) === this.toPath(fileName));
  }

  private projectReferenceConfigNames(config: ProjectConfig): readonly string[] {
    const references = (config.compilerOptions as { readonly projectReferences?: readonly string[] } | undefined)?.projectReferences;
    return references ?? [];
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

function findDefaultConfiguredProjectFromProgramInclusion(path: string, projects: readonly Project[]): readonly [Project | undefined, boolean] {
  let first: Project | undefined;
  let multiple = false;
  for (const project of projects) {
    if (!project.containsFile(path)) continue;
    if (first === undefined) {
      first = project;
    } else {
      multiple = true;
      if (!project.isSourceFromProjectReference(path)) return [project, true];
    }
  }
  return [first, multiple];
}

function dirname(path: string): string {
  const normalized = normalize(path);
  const index = normalized.lastIndexOf("/");
  if (index <= 0) return normalized.startsWith("/") ? "/" : "";
  return normalized.slice(0, index);
}
