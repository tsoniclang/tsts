export interface ConfigFileRegistryEntry {
  readonly configFileName: string;
  readonly configFilePath: string;
  readonly pendingReload: PendingReload;
  readonly commandLine?: unknown;
  readonly projectIds: ReadonlySet<string>;
  readonly retainingOpenFiles: ReadonlySet<string>;
  readonly retainingConfigs: ReadonlySet<string>;
  readonly rootFilesWatch?: unknown;
}

export type PendingReload = 0 | 1 | 2;
export const PendingReload = {
  None: 0 as PendingReload,
  Partial: 1 as PendingReload,
  Full: 2 as PendingReload,
} as const;

export interface ConfigFileNamesEntry {
  readonly nearestConfigFileName: string;
  readonly ancestors: ReadonlyMap<string, string>;
}

export interface TestConfigEntry {
  readonly fileName: string;
  readonly retainingProjects: readonly string[];
  readonly retainingOpenFiles: readonly string[];
  readonly retainingConfigs: readonly string[];
}

export interface TestConfigFileNamesEntry {
  readonly nearestConfigFileName: string;
  readonly ancestors: ReadonlyMap<string, string>;
}

export class ConfigFileRegistry {
  private readonly entries = new Map<string, ConfigFileRegistryEntry>();
  private readonly configFileNames = new Map<string, ConfigFileNamesEntry>();
  customConfigFileName = "";

  get(configFilePath: string): ConfigFileRegistryEntry | undefined {
    return this.entries.get(configFilePath);
  }

  getConfig(configFilePath: string): unknown {
    return this.entries.get(configFilePath)?.commandLine;
  }

  getConfigFileName(path: string): string {
    return this.configFileNames.get(path)?.nearestConfigFileName ?? "";
  }

  getAncestorConfigFileName(path: string, higherThanConfig: string): string {
    return this.configFileNames.get(path)?.ancestors.get(higherThanConfig) ?? "";
  }

  set(
    configFilePath: string,
    configFileName: string,
    projectIds: Iterable<string>,
    commandLine?: unknown,
    pendingReload: PendingReload = PendingReload.Full,
  ): void {
    this.entries.set(configFilePath, {
      configFileName,
      configFilePath,
      pendingReload,
      ...(commandLine === undefined ? {} : { commandLine }),
      projectIds: new Set(projectIds),
      retainingOpenFiles: new Set(),
      retainingConfigs: new Set(),
    });
  }

  delete(configFilePath: string): boolean {
    return this.entries.delete(configFilePath);
  }

  addProject(configFilePath: string, configFileName: string, projectId: string): void {
    const current = this.entries.get(configFilePath);
    const projectIds = new Set(current?.projectIds ?? []);
    projectIds.add(projectId);
    this.set(configFilePath, configFileName, projectIds, current?.commandLine, current?.pendingReload ?? PendingReload.Full);
  }

  removeProject(configFilePath: string, projectId: string): void {
    const current = this.entries.get(configFilePath);
    if (current === undefined) return;
    const projectIds = new Set(current.projectIds);
    projectIds.delete(projectId);
    if (projectIds.size === 0) this.entries.delete(configFilePath);
    else this.set(configFilePath, current.configFileName, projectIds, current.commandLine, current.pendingReload);
  }

  addOpenFile(configFilePath: string, configFileName: string, openFilePath: string): void {
    const current = this.ensureEntry(configFilePath, configFileName);
    const retainingOpenFiles = new Set(current.retainingOpenFiles);
    retainingOpenFiles.add(openFilePath);
    this.entries.set(configFilePath, { ...current, retainingOpenFiles });
  }

  addExtendingConfig(configFilePath: string, configFileName: string, extendingConfigPath: string): void {
    const current = this.ensureEntry(configFilePath, configFileName);
    const retainingConfigs = new Set(current.retainingConfigs);
    retainingConfigs.add(extendingConfigPath);
    this.entries.set(configFilePath, { ...current, retainingConfigs });
  }

  setConfigFileName(path: string, nearestConfigFileName: string, ancestors: ReadonlyMap<string, string> = new Map()): void {
    this.configFileNames.set(path, {
      nearestConfigFileName,
      ancestors: new Map(ancestors),
    });
  }

  keys(): readonly string[] {
    return [...this.entries.keys()].sort();
  }

  clone(): ConfigFileRegistry {
    const registry = new ConfigFileRegistry();
    registry.customConfigFileName = this.customConfigFileName;
    for (const entry of this.entries.values()) {
      registry.entries.set(entry.configFilePath, cloneEntry(entry));
    }
    for (const [path, entry] of this.configFileNames) {
      registry.configFileNames.set(path, {
        nearestConfigFileName: entry.nearestConfigFileName,
        ancestors: new Map(entry.ancestors),
      });
    }
    return registry;
  }

  forEachTestConfigEntry(cb: (path: string, entry: TestConfigEntry) => void): void {
    for (const [path, entry] of this.entries) cb(path, {
      fileName: entry.configFileName,
      retainingProjects: [...entry.projectIds],
      retainingOpenFiles: [...entry.retainingOpenFiles],
      retainingConfigs: [...entry.retainingConfigs],
    });
  }

  getTestConfigEntry(path: string): TestConfigEntry | undefined {
    const entry = this.entries.get(path);
    if (entry === undefined) return undefined;
    return {
      fileName: entry.configFileName,
      retainingProjects: [...entry.projectIds],
      retainingOpenFiles: [...entry.retainingOpenFiles],
      retainingConfigs: [...entry.retainingConfigs],
    };
  }

  forEachTestConfigFileNamesEntry(cb: (path: string, entry: TestConfigFileNamesEntry) => void): void {
    for (const [path, entry] of this.configFileNames) cb(path, {
      nearestConfigFileName: entry.nearestConfigFileName,
      ancestors: new Map(entry.ancestors),
    });
  }

  getTestConfigFileNamesEntry(path: string): TestConfigFileNamesEntry | undefined {
    const entry = this.configFileNames.get(path);
    if (entry === undefined) return undefined;
    return {
      nearestConfigFileName: entry.nearestConfigFileName,
      ancestors: new Map(entry.ancestors),
    };
  }

  private ensureEntry(configFilePath: string, configFileName: string): ConfigFileRegistryEntry {
    const current = this.entries.get(configFilePath);
    if (current !== undefined) return current;
    const created = newConfigFileEntry(configFilePath, configFileName);
    this.entries.set(configFilePath, created);
    return created;
  }
}

export function newConfigFileEntry(configFilePath: string, configFileName: string): ConfigFileRegistryEntry {
  return {
    configFileName,
    configFilePath,
    pendingReload: PendingReload.Full,
    projectIds: new Set(),
    retainingOpenFiles: new Set(),
    retainingConfigs: new Set(),
  };
}

export function newExtendedConfigFileEntry(configFilePath: string, configFileName: string, extendingConfigPath: string): ConfigFileRegistryEntry {
  return {
    configFileName,
    configFilePath,
    pendingReload: PendingReload.Full,
    projectIds: new Set(),
    retainingOpenFiles: new Set(),
    retainingConfigs: new Set([extendingConfigPath]),
  };
}

function cloneEntry(entry: ConfigFileRegistryEntry): ConfigFileRegistryEntry {
  return {
    configFileName: entry.configFileName,
    configFilePath: entry.configFilePath,
    pendingReload: entry.pendingReload,
    ...(entry.commandLine === undefined ? {} : { commandLine: entry.commandLine }),
    projectIds: new Set(entry.projectIds),
    retainingOpenFiles: new Set(entry.retainingOpenFiles),
    retainingConfigs: new Set(entry.retainingConfigs),
    ...(entry.rootFilesWatch === undefined ? {} : { rootFilesWatch: entry.rootFilesWatch }),
  };
}
