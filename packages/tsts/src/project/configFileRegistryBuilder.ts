import {
  combinePaths,
  containsIgnoredPath,
  containsPath,
  forEachAncestorDirectory,
  getBaseFileName,
  getDirectoryPath,
  normalizePath,
} from "../tspath/index.js";
import { ConfigFileRegistry } from "./configFileRegistry.js";
import { hasExcessiveWatchEvents, type FileChangeSummary } from "./fileChange.js";
import type { LogTree } from "./logging/logtree.js";
import { Kind, PendingReload, type Project } from "./project.js";
import type { ProjectCollection } from "./projectCollection.js";

export interface ConfigFileRegistryBuilderHost {
  fileExists(fileName: string): boolean;
  readFile?(fileName: string): string | undefined;
  directoryExists?(fileName: string): boolean;
  readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[]): readonly string[];
}

export interface ConfigFileNames {
  nearestConfigFileName: string;
  readonly ancestors: Map<string, string>;
}

export interface ConfigFileChangeResult {
  readonly affectedProjects: ReadonlySet<string>;
  readonly affectedFiles: ReadonlySet<string>;
}

export type ProjectLoadKind = 0 | 1;
export const ProjectLoadKind = {
  Find: 0 as ProjectLoadKind,
  Create: 1 as ProjectLoadKind,
} as const;

export class ConfigFileRegistryBuilder {
  private readonly base: ConfigFileRegistry;
  private readonly registry: ConfigFileRegistry;
  private readonly host: ConfigFileRegistryBuilderHost | undefined;
  private readonly customConfigFileName: string;
  private readonly oldCustomConfigFileName: string;
  private readonly configFileNames = new Map<string, ConfigFileNames>();
  private readonly retainingOpenFiles = new Map<string, Set<string>>();
  private readonly pendingReloads = new Map<string, PendingReload>();
  private customConfigFileNameChanged = false;

  constructor(
    base: ConfigFileRegistry = new ConfigFileRegistry(),
    host?: ConfigFileRegistryBuilderHost,
    customConfigFileName = "",
    oldCustomConfigFileName = "",
  ) {
    this.base = base;
    this.registry = base.clone();
    this.host = host;
    this.customConfigFileName = customConfigFileName;
    this.oldCustomConfigFileName = oldCustomConfigFileName;
    this.customConfigFileNameChanged = customConfigFileName !== oldCustomConfigFileName;
  }

  addProject(project: Project): void {
    if (project.kind !== Kind.Configured) return;
    this.acquireConfigForProject(project.configFileName(), project.configFilePath(), project);
  }

  removeProject(project: Project): void {
    if (project.kind !== Kind.Configured) return;
    this.releaseConfigForProject(project.configFilePath(), project.id());
  }

  syncFromCollection(collection: ProjectCollection): void {
    for (const project of collection.configuredProjects()) this.addProject(project);
  }

  acquireConfigForProject(configFileName: string, configFilePath: string, project: Project): void {
    this.registry.addProject(configFilePath, configFileName, project.id());
    this.reloadIfNeeded(configFilePath);
  }

  acquireConfigForFile(configFileName: string, configFilePath: string, filePath: string): void {
    const path = normalizePath(filePath);
    if (path !== "" && !isDynamicFileName(path)) {
      const retained = this.retainingOpenFiles.get(configFilePath) ?? new Set<string>();
      retained.add(path);
      this.retainingOpenFiles.set(configFilePath, retained);
    }
    if (this.registry.get(configFilePath) === undefined) this.registry.set(configFilePath, configFileName, []);
    this.reloadIfNeeded(configFilePath);
  }

  releaseConfigForProject(configFilePath: string, projectPath: string): void {
    this.registry.removeProject(configFilePath, projectPath);
  }

  isConfigBaseName(baseName: string): boolean {
    return baseName === "tsconfig.json"
      || baseName === "jsconfig.json"
      || (this.customConfigFileName !== "" && baseName === this.customConfigFileName);
  }

  didChangeCustomConfigFileName(logger?: LogTree): boolean {
    if (!this.customConfigFileNameChanged) return false;
    logger?.log("Clearing config file name cache after custom config file name change");
    this.configFileNames.clear();
    this.customConfigFileNameChanged = false;
    return true;
  }

  didCloseFile(fileName: string): void {
    const path = normalizePath(fileName);
    if (isDynamicFileName(path)) return;
    this.configFileNames.delete(path);
    for (const [configFilePath, files] of this.retainingOpenFiles) {
      files.delete(path);
      if (files.size === 0) this.retainingOpenFiles.delete(configFilePath);
    }
  }

  didChangeFiles(summary: FileChangeSummary, logger?: LogTree): ConfigFileChangeResult {
    if (hasExcessiveWatchEvents(summary) && summary.includesWatchChangeOutsideNodeModules) {
      return this.invalidateCache(logger);
    }

    const affectedProjects = new Set<string>();
    const affectedFiles = new Set<string>();
    const createdFiles = new Map<string, string>();
    const deletedFiles = new Map<string, string>();
    const createdOrDeletedConfigFiles = new Set<string>();
    const createdOrChangedOrDeletedFiles = new Set<string>();

    logger?.log("Summarizing file changes");
    this.collectChangedFiles(summary.changed, createdOrChangedOrDeletedFiles, createdOrDeletedConfigFiles);
    this.collectCreatedOrDeletedFiles(summary.deleted, deletedFiles, createdOrChangedOrDeletedFiles, createdOrDeletedConfigFiles);
    this.collectCreatedOrDeletedFiles(summary.created, createdFiles, createdOrChangedOrDeletedFiles, createdOrDeletedConfigFiles);

    for (const fileName of summary.closed) this.didCloseFile(fileName);

    logger?.log("Checking if any changed files are config files");
    for (const path of createdOrChangedOrDeletedFiles) {
      const affected = this.handleConfigChange(path, logger);
      for (const projectId of affected) affectedProjects.add(projectId);
      if (affected.size > 0) createdFiles.delete(path);
    }

    for (const path of createdOrDeletedConfigFiles) {
      this.invalidateCachedNamesContainedBy(getDirectoryPath(path), affectedFiles);
    }

    for (const path of deletedFiles.keys()) {
      this.handleDeletedRootFile(path, affectedProjects, logger);
    }

    for (const [path, fileName] of createdFiles) {
      this.handleCreatedRootCandidate(path, fileName, affectedProjects, logger);
    }

    return { affectedProjects, affectedFiles };
  }

  computeConfigFileName(fileName: string, skipSearchInDirectoryOfFile = false, logger?: LogTree): string {
    const normalized = normalizePath(fileName);
    const searchPath = getDirectoryPath(normalized);

    if (this.customConfigFileName !== "") {
      let skip = skipSearchInDirectoryOfFile;
      const custom = forEachAncestorDirectory(searchPath, (directory) => {
        if (!skip) {
          const candidate = combinePaths(directory, this.customConfigFileName);
          if (this.fileExists(candidate)) return { result: candidate, stop: true };
        }
        if (directory.endsWith("/node_modules")) return { result: undefined, stop: true };
        skip = false;
        return { result: undefined, stop: false };
      }).result;
      if (custom !== undefined && custom !== "") {
        logger?.logf("computeConfigFileName:: File: %s:: Result: %s", fileName, custom);
        return custom;
      }
    }

    let skipTsconfig = skipSearchInDirectoryOfFile;
    let skipJsconfig = skipSearchInDirectoryOfFile && !normalized.endsWith("/tsconfig.json");
    const standard = forEachAncestorDirectory(searchPath, (directory) => {
      if (!skipTsconfig) {
        const tsconfig = combinePaths(directory, "tsconfig.json");
        if (this.fileExists(tsconfig)) return { result: tsconfig, stop: true };
      }
      if (!skipJsconfig) {
        const jsconfig = combinePaths(directory, "jsconfig.json");
        if (this.fileExists(jsconfig)) return { result: jsconfig, stop: true };
      }
      if (directory.endsWith("/node_modules")) return { result: undefined, stop: true };
      skipTsconfig = false;
      skipJsconfig = false;
      return { result: undefined, stop: false };
    }).result ?? "";
    logger?.logf("computeConfigFileName:: File: %s:: Result: %s", fileName, standard);
    return standard;
  }

  getConfigFileNameForFile(fileName: string, path = normalizePath(fileName), logger?: LogTree): string {
    const normalizedPath = normalizePath(path);
    if (isDynamicFileName(fileName)) return "";
    const cached = this.configFileNames.get(normalizedPath);
    if (cached !== undefined) return cached.nearestConfigFileName;
    const configName = this.computeConfigFileName(fileName, false, logger);
    this.configFileNames.set(normalizedPath, {
      nearestConfigFileName: configName,
      ancestors: new Map<string, string>(),
    });
    return configName;
  }

  forEachConfigFileNameFor(path: string, callback: (configFileName: string) => void): void {
    const normalizedPath = normalizePath(path);
    if (isDynamicFileName(normalizedPath)) return;
    const cached = this.configFileNames.get(normalizedPath);
    if (cached === undefined) return;
    let configFileName = cached.nearestConfigFileName;
    while (configFileName !== "") {
      callback(configFileName);
      const ancestor = cached.ancestors.get(configFileName);
      if (ancestor === undefined) return;
      configFileName = ancestor;
    }
  }

  getAncestorConfigFileName(fileName: string, path: string, configFileName: string, logger?: LogTree): string {
    const normalizedPath = normalizePath(path);
    if (isDynamicFileName(fileName)) return "";
    const cached = this.configFileNames.get(normalizedPath);
    if (cached === undefined) return "";
    const existing = cached.ancestors.get(configFileName);
    if (existing !== undefined) return existing;
    const result = this.computeConfigFileName(configFileName, true, logger);
    cached.ancestors.set(configFileName, result);
    return result;
  }

  cleanup(): void {
    for (const key of this.registry.keys()) {
      const entry = this.registry.get(key);
      if (entry === undefined) continue;
      if (entry.projectIds.size === 0 && (this.retainingOpenFiles.get(key)?.size ?? 0) === 0) {
        this.registry.delete(key);
        this.pendingReloads.delete(key);
      }
    }
  }

  build(): readonly [ConfigFileRegistry, boolean] {
    const before = this.base.keys().join("\n");
    const after = this.registry.keys().join("\n");
    return [this.registry, before !== after || this.customConfigFileName !== this.oldCustomConfigFileName];
  }

  finalize(): ConfigFileRegistry {
    const [registry] = this.build();
    return registry;
  }

  findOrAcquireConfigForFile(
    configFileName: string,
    configFilePath: string,
    filePath: string,
    loadKind: ProjectLoadKind,
    logger?: LogTree,
  ): unknown {
    switch (loadKind) {
      case ProjectLoadKind.Find:
        return this.registry.getConfig(configFilePath);
      case ProjectLoadKind.Create:
        return this.acquireConfigForFile(configFileName, configFilePath, filePath), this.registry.getConfig(configFilePath);
      default:
        throw new Error(`unknown project load kind: ${loadKind}`);
    }
  }

  updateExtendingConfigs(extendingConfigPath: string, newCommandLine: ParsedConfigLike | undefined, oldCommandLine: ParsedConfigLike | undefined): void {
    const nextExtended = new Set<string>();
    for (const extendedConfig of newCommandLine?.extendedSourceFiles?.() ?? []) {
      const path = normalizePath(extendedConfig);
      nextExtended.add(path);
      this.registry.addExtendingConfig(path, extendedConfig, extendingConfigPath);
    }
    for (const extendedConfig of oldCommandLine?.extendedSourceFiles?.() ?? []) {
      const path = normalizePath(extendedConfig);
      if (nextExtended.has(path)) continue;
      const current = this.registry.get(path);
      if (current === undefined) continue;
      const retainingConfigs = new Set(current.retainingConfigs);
      retainingConfigs.delete(extendingConfigPath);
      this.registry.delete(path);
      if (current.projectIds.size > 0 || current.retainingOpenFiles.size > 0 || retainingConfigs.size > 0) {
        this.registry.set(path, current.configFileName, current.projectIds, current.commandLine, current.pendingReload);
        for (const retained of retainingConfigs) this.registry.addExtendingConfig(path, current.configFileName, retained);
      }
    }
  }

  updateRootFilesWatch(configFileName: string, commandLine: ParsedConfigLike | undefined): PatternsAndIgnored {
    const tsconfigDir = getDirectoryPath(configFileName);
    const wildcardDirectories = commandLine?.wildcardDirectories?.() ?? new Map<string, unknown>();
    const literalFileNames = commandLine?.literalFileNames?.() ?? [];
    const extendedSourceFiles = commandLine?.extendedSourceFiles?.() ?? [];
    const patternsInsideWorkspace: string[] = [];
    const ignored: Record<string, true> = {};
    let includeWorkspace = false;
    let includeTsconfigDir = false;
    const externalDirectories: string[] = [];

    for (const directory of wildcardDirectories.keys()) {
      if (containsPath(this.sessionCurrentDirectory(), directory, pathCompareOptions())) includeWorkspace = true;
      else if (containsPath(tsconfigDir, directory, pathCompareOptions())) includeTsconfigDir = true;
      else externalDirectories.push(directory);
    }
    for (const fileName of literalFileNames) {
      if (containsPath(this.sessionCurrentDirectory(), fileName, pathCompareOptions())) includeWorkspace = true;
      else if (containsPath(tsconfigDir, fileName, pathCompareOptions())) includeTsconfigDir = true;
      else externalDirectories.push(getDirectoryPath(fileName));
    }
    if (includeWorkspace) patternsInsideWorkspace.push(getRecursiveGlobPattern(this.sessionCurrentDirectory()));
    if (includeTsconfigDir) patternsInsideWorkspace.push(getRecursiveGlobPattern(tsconfigDir));
    for (const fileName of extendedSourceFiles) {
      if (includeWorkspace && containsPath(this.sessionCurrentDirectory(), fileName, pathCompareOptions())) continue;
      patternsInsideWorkspace.push(fileName);
    }
    for (const directory of externalDirectories) ignored[directory] = true;
    patternsInsideWorkspace.sort();
    return { patternsInsideWorkspace, ignored };
  }

  getAccessibleEntries(path: string): { readonly files: readonly string[]; readonly directories: readonly string[] } {
    const entries = this.host?.readDirectory?.(path, [], [], ["*"]) ?? [];
    const files: string[] = [];
    const directories: string[] = [];
    for (const entry of entries) {
      const base = getBaseFileName(entry);
      if (this.directoryExists(entry)) directories.push(base);
      else files.push(base);
    }
    return { files: files.sort(), directories: directories.sort() };
  }

  readFile(fileName: string): string | undefined {
    return this.host?.readFile?.(fileName);
  }

  private collectChangedFiles(
    files: ReadonlySet<string>,
    createdOrChangedOrDeletedFiles: Set<string>,
    createdOrDeletedConfigFiles: Set<string>,
  ): void {
    for (const fileName of files) {
      const path = normalizePath(fileName);
      if (containsIgnoredPath(path)) continue;
      if (this.isConfigBaseName(getBaseFileName(path))) createdOrDeletedConfigFiles.add(path);
      createdOrChangedOrDeletedFiles.add(path);
    }
  }

  private collectCreatedOrDeletedFiles(
    files: ReadonlySet<string>,
    output: Map<string, string>,
    createdOrChangedOrDeletedFiles: Set<string>,
    createdOrDeletedConfigFiles: Set<string>,
  ): void {
    for (const fileName of files) {
      const path = normalizePath(fileName);
      if (containsIgnoredPath(path)) continue;
      output.set(path, fileName);
      if (this.isConfigBaseName(getBaseFileName(path))) createdOrDeletedConfigFiles.add(path);
      createdOrChangedOrDeletedFiles.add(path);
    }
  }

  private invalidateCache(logger?: LogTree): ConfigFileChangeResult {
    const affectedProjects = new Set<string>();
    const affectedFiles = new Set<string>();
    logger?.log("Too many files changed; marking all configs for reload");
    for (const fileName of this.configFileNames.keys()) affectedFiles.add(fileName);
    this.configFileNames.clear();
    for (const key of this.registry.keys()) {
      const entry = this.registry.get(key);
      if (entry === undefined) continue;
      this.pendingReloads.set(key, PendingReload.Full);
      for (const projectId of entry.projectIds) affectedProjects.add(projectId);
    }
    return { affectedProjects, affectedFiles };
  }

  private handleConfigChange(configFilePath: string, logger?: LogTree): ReadonlySet<string> {
    const entry = this.registry.get(configFilePath);
    if (entry === undefined) return emptySet;
    if ((this.pendingReloads.get(configFilePath) ?? PendingReload.None) !== PendingReload.Full) {
      logger?.logf("Config file %s changed", configFilePath);
      this.pendingReloads.set(configFilePath, PendingReload.Full);
    }
    return entry.projectIds;
  }

  private handleDeletedRootFile(filePath: string, affectedProjects: Set<string>, logger?: LogTree): void {
    for (const configFilePath of this.registry.keys()) {
      if ((this.pendingReloads.get(configFilePath) ?? PendingReload.None) === PendingReload.Full) continue;
      if (!sameDirectoryOrDescendant(getDirectoryPath(configFilePath), filePath)) continue;
      this.pendingReloads.set(configFilePath, PendingReload.FileNames);
      logger?.logf("Root files for config %s changed", configFilePath);
      const entry = this.registry.get(configFilePath);
      if (entry !== undefined) for (const projectId of entry.projectIds) affectedProjects.add(projectId);
    }
  }

  private handleCreatedRootCandidate(filePath: string, fileName: string, affectedProjects: Set<string>, logger?: LogTree): void {
    for (const configFilePath of this.registry.keys()) {
      if ((this.pendingReloads.get(configFilePath) ?? PendingReload.None) !== PendingReload.None) continue;
      if (!sameDirectoryOrDescendant(getDirectoryPath(configFilePath), filePath)) continue;
      if (!this.fileExists(fileName) && !this.directoryExists(fileName)) continue;
      this.pendingReloads.set(configFilePath, PendingReload.FileNames);
      logger?.logf("Root files for config %s changed", configFilePath);
      const entry = this.registry.get(configFilePath);
      if (entry !== undefined) for (const projectId of entry.projectIds) affectedProjects.add(projectId);
    }
  }

  private invalidateCachedNamesContainedBy(directory: string, affectedFiles: Set<string>): void {
    for (const [filePath] of this.configFileNames) {
      if (sameDirectoryOrDescendant(directory, filePath)) {
        affectedFiles.add(filePath);
        this.configFileNames.delete(filePath);
      }
    }
  }

  private reloadIfNeeded(configFilePath: string): void {
    if ((this.pendingReloads.get(configFilePath) ?? PendingReload.None) !== PendingReload.None) {
      this.pendingReloads.delete(configFilePath);
    }
  }

  private fileExists(fileName: string): boolean {
    return this.host?.fileExists(fileName) ?? false;
  }

  private directoryExists(fileName: string): boolean {
    return this.host?.directoryExists?.(fileName) ?? false;
  }

  private sessionCurrentDirectory(): string {
    return "";
  }
}

const emptySet: ReadonlySet<string> = new Set<string>();

interface ParsedConfigLike {
  extendedSourceFiles?(): readonly string[];
  wildcardDirectories?(): ReadonlyMap<string, unknown>;
  literalFileNames?(): readonly string[];
}

interface PatternsAndIgnored {
  readonly patternsInsideWorkspace: readonly string[];
  readonly ignored?: Readonly<Record<string, true>>;
}

function isDynamicFileName(path: string): boolean {
  return path.startsWith("^") || path.includes("/^");
}

function sameDirectoryOrDescendant(directory: string, filePath: string): boolean {
  if (directory === "") return true;
  return containsPath(directory, filePath, {
    currentDirectory: "",
    useCaseSensitiveFileNames: true,
  });
}

function getRecursiveGlobPattern(directory: string): string {
  return `${directory.replace(/\/+$/, "")}/**/*`;
}

function pathCompareOptions(): { currentDirectory: string; useCaseSensitiveFileNames: boolean } {
  return { currentDirectory: "", useCaseSensitiveFileNames: true };
}
