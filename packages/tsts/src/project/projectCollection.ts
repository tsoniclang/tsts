import { ConfigFileRegistry } from "./configFileRegistry.js";
import { inferredProjectName, Kind, Project } from "./project.js";

export class ProjectCollection {
  private readonly projectsById = new Map<string, Project>();
  private readonly fileDefaultProjects = new Map<string, string>();
  private readonly openFiles = new Set<string>();
  private readonly apiOpenedProjects = new Set<string>();
  private readonly toPath: (fileName: string) => string;
  private readonly registry: ConfigFileRegistry;
  private cachedOpenConfiguredProjects: ReadonlySet<string> | undefined;

  constructor(toPath: (fileName: string) => string, registry: ConfigFileRegistry = new ConfigFileRegistry()) {
    this.toPath = toPath;
    this.registry = registry;
  }

  configFileRegistry(): ConfigFileRegistry {
    return this.registry;
  }

  addProject(project: Project): void {
    this.projectsById.set(project.id(), project);
    if (project.kind === Kind.Configured) {
      this.registry.addProject(project.id(), project.configFileNameValue, project.id());
    }
    this.cachedOpenConfiguredProjects = undefined;
  }

  removeProject(projectId: string): boolean {
    const project = this.projectsById.get(projectId);
    if (project === undefined) return false;
    this.projectsById.delete(projectId);
    if (project.kind === Kind.Configured) this.registry.removeProject(project.id(), project.id());
    for (const [filePath, defaultProject] of [...this.fileDefaultProjects]) {
      if (defaultProject === projectId) this.fileDefaultProjects.delete(filePath);
    }
    this.apiOpenedProjects.delete(projectId);
    this.cachedOpenConfiguredProjects = undefined;
    return true;
  }

  get(projectId: string): Project | undefined {
    return this.projectsById.get(projectId);
  }

  configuredProject(projectPath: string): Project | undefined {
    const project = this.projectsById.get(projectPath);
    return project?.kind === Kind.Configured ? project : undefined;
  }

  getProjectByPath(projectPath: string): Project | undefined {
    return projectPath === inferredProjectName ? this.inferredProjects()[0] : this.projectsById.get(projectPath);
  }

  projects(): readonly Project[] {
    const configured = this.configuredProjects();
    const inferred = this.inferredProjects()[0];
    return inferred === undefined ? configured : [...configured, inferred];
  }

  projectsByPath(): ReadonlyMap<string, Project> {
    const projects = new Map<string, Project>();
    for (const project of this.configuredProjects()) projects.set(project.id(), project);
    const inferred = this.inferredProjects()[0];
    if (inferred !== undefined) projects.set(inferredProjectName, inferred);
    return projects;
  }

  configuredProjects(): readonly Project[] {
    const projects: Project[] = [];
    this.fillConfiguredProjects(projects);
    return projects;
  }

  fillConfiguredProjects(output: Project[]): void {
    for (const project of this.projectsById.values()) {
      if (project.kind === Kind.Configured) output.push(project);
    }
    output.sort((left, right) => left.name().localeCompare(right.name()));
  }

  inferredProjects(): readonly Project[] {
    return [...this.projectsById.values()].filter(project => project.kind === Kind.Inferred);
  }

  inferredProject(): Project | undefined {
    return this.inferredProjects()[0];
  }

  openFile(fileName: string, project: Project): void {
    const path = this.toPath(fileName);
    this.openFiles.add(path);
    this.fileDefaultProjects.set(path, project.kind === Kind.Inferred ? inferredProjectName : project.id());
    this.cachedOpenConfiguredProjects = undefined;
  }

  closeFile(fileName: string): void {
    const path = this.toPath(fileName);
    this.openFiles.delete(path);
    this.fileDefaultProjects.delete(path);
    this.cachedOpenConfiguredProjects = undefined;
  }

  openFilePaths(): readonly string[] {
    return [...this.openFiles].sort();
  }

  hasOpenFile(fileNameOrPath: string): boolean {
    return this.openFiles.has(this.toPath(fileNameOrPath));
  }

  fileDefaultProjectPath(fileNameOrPath: string): string | undefined {
    return this.fileDefaultProjects.get(this.toPath(fileNameOrPath));
  }

  setFileDefaultProjectPath(fileNameOrPath: string, projectPath: string | undefined): void {
    const path = this.toPath(fileNameOrPath);
    if (projectPath === undefined) this.fileDefaultProjects.delete(path);
    else this.fileDefaultProjects.set(path, projectPath);
    this.cachedOpenConfiguredProjects = undefined;
  }

  fileDefaultProjectEntries(): readonly (readonly [string, string])[] {
    return [...this.fileDefaultProjects.entries()].sort((left, right) => left[0].localeCompare(right[0]));
  }

  openFileCount(): number {
    return this.openFiles.size;
  }

  configuredProjectCount(): number {
    return this.configuredProjects().length;
  }

  projectCount(): number {
    return this.projectsById.size;
  }

  containsProject(projectId: string): boolean {
    return this.projectsById.has(projectId);
  }

  openAPIProject(projectId: string): void {
    this.apiOpenedProjects.add(projectId);
  }

  closeAPIProject(projectId: string): void {
    this.apiOpenedProjects.delete(projectId);
  }

  apiOpenedProjectPaths(): readonly string[] {
    return [...this.apiOpenedProjects].sort();
  }

  isAPIOpenedProject(projectId: string): boolean {
    return this.apiOpenedProjects.has(projectId);
  }

  replaceAPIOpenedProjects(projectIds: Iterable<string>): void {
    this.apiOpenedProjects.clear();
    for (const projectId of projectIds) this.apiOpenedProjects.add(projectId);
  }

  setFileDefaultProject(fileNameOrPath: string, project: Project | undefined): void {
    const path = this.toPath(fileNameOrPath);
    if (project === undefined) this.fileDefaultProjects.delete(path);
    else this.fileDefaultProjects.set(path, project.kind === Kind.Inferred ? inferredProjectName : project.id());
    this.cachedOpenConfiguredProjects = undefined;
  }

  getOpenConfiguredProjects(): ReadonlySet<string> {
    if (this.cachedOpenConfiguredProjects !== undefined) return this.cachedOpenConfiguredProjects;
    const openProjects = new Set<string>();
    for (const path of this.openFiles) {
      const defaultProject = this.fileDefaultProjects.get(path);
      if (defaultProject !== undefined && defaultProject !== inferredProjectName && this.projectsById.has(defaultProject)) {
        openProjects.add(defaultProject);
        continue;
      }
      for (const project of this.configuredProjects()) {
        if (project.containsFile(path)) openProjects.add(project.id());
      }
    }
    this.cachedOpenConfiguredProjects = openProjects;
    return openProjects;
  }

  getDefaultProject(fileName: string): Project | undefined {
    const path = this.toPath(fileName);
    const cached = this.fileDefaultProjects.get(path);
    if (cached === inferredProjectName) return this.inferredProject();
    if (cached !== undefined) return this.projectsById.get(cached);
    const configured = this.findDefaultConfiguredProject(path);
    if (configured !== undefined) {
      this.fileDefaultProjects.set(path, configured.id());
      return configured;
    }
    const inferred = this.inferredProject();
    if (inferred?.containsFile(path) === true) {
      this.fileDefaultProjects.set(path, inferredProjectName);
      return inferred;
    }
    return undefined;
  }

  getProjectsContainingFile(fileNameOrPath: string): readonly Project[] {
    const path = this.toPath(fileNameOrPath);
    return this.projects().filter(project => project.containsFile(path));
  }

  clone(): ProjectCollection {
    const collection = new ProjectCollection(this.toPath, this.registry.clone());
    for (const project of this.projectsById.values()) collection.addProject(project.clone());
    for (const fileName of this.openFiles) collection.openFiles.add(fileName);
    for (const [fileName, projectId] of this.fileDefaultProjects) collection.fileDefaultProjects.set(fileName, projectId);
    for (const projectId of this.apiOpenedProjects) collection.apiOpenedProjects.add(projectId);
    return collection;
  }

  cloneWithProject(project: Project): ProjectCollection {
    const collection = this.clone();
    collection.removeProject(project.id());
    collection.addProject(project);
    return collection;
  }

  private findDefaultConfiguredProject(path: string): Project | undefined {
    const cached = this.fileDefaultProjects.get(path);
    if (cached !== undefined && cached !== inferredProjectName) {
      const project = this.projectsById.get(cached);
      if (project !== undefined) return project;
    }

    const configuredProjects = this.configuredProjects();
    const [project, multipleCandidates] = findDefaultConfiguredProjectFromProgramInclusion(
      path,
      configuredProjects.map(candidate => candidate.id()),
      projectPath => this.projectsById.get(projectPath),
    );
    if (!multipleCandidates) return project;

    const configFileName = this.registry.getConfigFileName(path);
    if (configFileName === "") return project;
    return this.findDefaultConfiguredProjectWorker(path, configFileName, new Set(), undefined) ?? project;
  }

  private findDefaultConfiguredProjectWorker(
    path: string,
    configFileName: string,
    visited: Set<string>,
    fallback: Project | undefined,
  ): Project | undefined {
    const configFilePath = this.toPath(configFileName);
    const project = this.configuredProject(configFilePath);
    if (project === undefined) return fallback;

    const queue: Project[] = [project];
    let directResult: Project | undefined;
    let referenceFallback = fallback;
    while (queue.length > 0) {
      const current = queue.shift()!;
      if (visited.has(current.id())) continue;
      visited.add(current.id());
      if (current.containsFile(path)) {
        if (!current.isSourceFromProjectReference(path)) {
          directResult = current;
          break;
        }
        referenceFallback ??= current;
      }
      for (const referencePath of current.resolvedProjectReferencePaths()) {
        const reference = this.configuredProject(referencePath);
        if (reference !== undefined && !visited.has(reference.id())) queue.push(reference);
      }
      for (const referencePath of current.potentialProjectReferencePaths()) {
        const reference = this.configuredProject(referencePath);
        if (reference !== undefined && !visited.has(reference.id())) queue.push(reference);
      }
    }
    if (directResult !== undefined) return directResult;

    const ancestorConfigName = this.registry.getAncestorConfigFileName(path, configFileName);
    if (ancestorConfigName !== "") {
      return this.findDefaultConfiguredProjectWorker(path, ancestorConfigName, visited, referenceFallback);
    }
    return referenceFallback;
  }

  private findDefaultConfiguredProjectFromProgramInclusion(path: string): Project | undefined {
    let firstConfiguredProject: Project | undefined;
    let firstDirectProject: Project | undefined;
    let multipleDirectInclusions = false;
    let containingCount = 0;
    for (const project of this.configuredProjects()) {
      if (!project.containsFile(path)) continue;
      containingCount += 1;
      firstConfiguredProject ??= project;
      if (!project.isSourceFromProjectReference(path)) {
        if (firstDirectProject === undefined) firstDirectProject = project;
        else multipleDirectInclusions = true;
      }
    }
    if (containingCount === 0) return undefined;
    if (containingCount === 1) return firstConfiguredProject;
    if (!multipleDirectInclusions) return firstDirectProject ?? firstConfiguredProject;
    return this.findDefaultConfiguredProject(path) ?? firstConfiguredProject;
  }
}

function findDefaultConfiguredProjectFromProgramInclusion(
  path: string,
  projectPaths: readonly string[],
  getProject: (projectPath: string) => Project | undefined,
): readonly [Project | undefined, boolean] {
  let firstConfiguredProject: Project | undefined;
  let firstDirectProject: Project | undefined;
  let multipleDirectInclusions = false;
  let containingCount = 0;

  for (const projectPath of projectPaths) {
    const project = getProject(projectPath);
    if (project === undefined || !project.containsFile(path)) continue;
    containingCount += 1;
    firstConfiguredProject ??= project;
    if (!multipleDirectInclusions && !project.isSourceFromProjectReference(path)) {
      if (firstDirectProject === undefined) firstDirectProject = project;
      else multipleDirectInclusions = true;
    }
  }

  if (containingCount === 1) return [firstConfiguredProject, false];
  if (!multipleDirectInclusions) return [firstDirectProject ?? firstConfiguredProject, false];
  return [firstConfiguredProject, true];
}
