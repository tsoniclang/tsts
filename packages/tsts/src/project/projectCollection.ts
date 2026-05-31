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
    return [...this.projectsById.values()]
      .filter(project => project.kind === Kind.Configured)
      .sort((left, right) => left.name().localeCompare(right.name()));
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

  openAPIProject(projectId: string): void {
    this.apiOpenedProjects.add(projectId);
  }

  closeAPIProject(projectId: string): void {
    this.apiOpenedProjects.delete(projectId);
  }

  apiOpenedProjectPaths(): readonly string[] {
    return [...this.apiOpenedProjects].sort();
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
    const configured = this.findDefaultConfiguredProjectFromProgramInclusion(path);
    if (configured !== undefined) return configured;
    const inferred = this.inferredProject();
    return inferred?.containsFile(path) === true ? inferred : undefined;
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
    return this.findDefaultConfiguredProjectByRegistry(path) ?? firstConfiguredProject;
  }

  private findDefaultConfiguredProjectByRegistry(path: string): Project | undefined {
    for (const configPath of this.registry.keys()) {
      const entry = this.registry.get(configPath);
      if (entry === undefined) continue;
      for (const projectId of entry.projectIds) {
        const project = this.projectsById.get(projectId);
        if (project !== undefined && project.containsFile(path)) return project;
      }
    }
    return undefined;
  }
}
