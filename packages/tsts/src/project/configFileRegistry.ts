export interface ConfigFileRegistryEntry {
  readonly configFileName: string;
  readonly configFilePath: string;
  readonly projectIds: ReadonlySet<string>;
}

export class ConfigFileRegistry {
  private readonly entries = new Map<string, ConfigFileRegistryEntry>();

  get(configFilePath: string): ConfigFileRegistryEntry | undefined {
    return this.entries.get(configFilePath);
  }

  set(configFilePath: string, configFileName: string, projectIds: Iterable<string>): void {
    this.entries.set(configFilePath, {
      configFileName,
      configFilePath,
      projectIds: new Set(projectIds),
    });
  }

  delete(configFilePath: string): boolean {
    return this.entries.delete(configFilePath);
  }

  addProject(configFilePath: string, configFileName: string, projectId: string): void {
    const current = this.entries.get(configFilePath);
    const projectIds = new Set(current?.projectIds ?? []);
    projectIds.add(projectId);
    this.set(configFilePath, configFileName, projectIds);
  }

  removeProject(configFilePath: string, projectId: string): void {
    const current = this.entries.get(configFilePath);
    if (current === undefined) return;
    const projectIds = new Set(current.projectIds);
    projectIds.delete(projectId);
    if (projectIds.size === 0) this.entries.delete(configFilePath);
    else this.set(configFilePath, current.configFileName, projectIds);
  }

  keys(): readonly string[] {
    return [...this.entries.keys()].sort();
  }

  clone(): ConfigFileRegistry {
    const registry = new ConfigFileRegistry();
    for (const entry of this.entries.values()) registry.set(entry.configFilePath, entry.configFileName, entry.projectIds);
    return registry;
  }
}
