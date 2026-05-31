import { ConfigFileRegistry } from "./configFileRegistry.js";
import { Kind, type Project } from "./project.js";
import type { ProjectCollection } from "./projectCollection.js";

export class ConfigFileRegistryBuilder {
  private readonly base: ConfigFileRegistry;
  private readonly registry: ConfigFileRegistry;

  constructor(base: ConfigFileRegistry = new ConfigFileRegistry()) {
    this.base = base;
    this.registry = base.clone();
  }

  addProject(project: Project): void {
    if (project.kind !== Kind.Configured) return;
    this.registry.addProject(project.configFilePath(), project.configFileName(), project.id());
  }

  removeProject(project: Project): void {
    if (project.kind !== Kind.Configured) return;
    this.registry.removeProject(project.configFilePath(), project.id());
  }

  syncFromCollection(collection: ProjectCollection): void {
    for (const project of collection.configuredProjects()) this.addProject(project);
  }

  build(): readonly [ConfigFileRegistry, boolean] {
    const before = this.base.keys().join("\n");
    const after = this.registry.keys().join("\n");
    return [this.registry, before !== after];
  }
}
