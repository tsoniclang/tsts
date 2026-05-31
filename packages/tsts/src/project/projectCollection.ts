import { Kind, Project } from "./project.js";

export class ProjectCollection {
  private readonly projectsById = new Map<string, Project>();
  private readonly openFiles = new Map<string, Project>();
  private readonly toPath: (fileName: string) => string;

  constructor(toPath: (fileName: string) => string) {
    this.toPath = toPath;
  }

  addProject(project: Project): void {
    this.projectsById.set(project.id(), project);
  }

  removeProject(projectId: string): boolean {
    return this.projectsById.delete(projectId);
  }

  get(projectId: string): Project | undefined {
    return this.projectsById.get(projectId);
  }

  projects(): readonly Project[] {
    return [...this.projectsById.values()];
  }

  configuredProjects(): readonly Project[] {
    return this.projects().filter(project => project.kind === Kind.Configured);
  }

  inferredProjects(): readonly Project[] {
    return this.projects().filter(project => project.kind === Kind.Inferred);
  }

  openFile(fileName: string, project: Project): void {
    this.openFiles.set(this.toPath(fileName), project);
  }

  closeFile(fileName: string): void {
    this.openFiles.delete(this.toPath(fileName));
  }

  getDefaultProject(fileName: string): Project | undefined {
    const path = this.toPath(fileName);
    return this.openFiles.get(path) ?? this.projects().find(project => project.containsFile(path));
  }

  getProjectsContainingFile(fileNameOrPath: string): readonly Project[] {
    const path = this.toPath(fileNameOrPath);
    return this.projects().filter(project => project.containsFile(path));
  }

  clone(): ProjectCollection {
    const collection = new ProjectCollection(this.toPath);
    for (const project of this.projectsById.values()) collection.addProject(project.clone());
    for (const [fileName, project] of this.openFiles) {
      const clone = collection.get(project.id());
      if (clone !== undefined) collection.openFiles.set(fileName, clone);
    }
    return collection;
  }
}
