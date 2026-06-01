/**
 * Auto-import registry state.
 *
 * Porting surface for TS-Go `internal/ls/autoimport/registry.go`.
 */

import { SetCollection, SyncMap, newSetFromItems } from "../../collections/index.js";
import { getDirectoryPath } from "../../tspath/index.js";
import type { DocumentUri } from "../../lsp/lsproto/index.js";
import type { UserPreferences } from "../lsutil/index.js";
import type { ExportIndex } from "./view.js";

export const knownRecursiveSearchPackages: SetCollection<string> = newSetFromItems(
  "@material-ui/core",
  "@material-ui/icons",
  "@sap/cds",
  "@testing-library/react-native",
  "ajv",
  "asap",
  "async",
  "aws-sdk",
  "braintree-web",
  "core-js",
  "core-js-pure",
  "crypto-js",
  "cypress-mochawesome-reporter",
  "dd-trace",
  "dumi",
  "dva",
  "egg-mock",
  "electron-log",
  "es-abstract",
  "es6-promise",
  "eslint-config-taro",
  "expo",
  "expo-router",
  "flow-remove-types",
  "gatsby",
  "glamor",
  "gluegun",
  "graphology-indices",
  "graphology-traversal",
  "graphology-utils",
  "jest-expo",
  "lodash",
  "lodash-es",
  "moment",
  "mz",
  "next",
  "pdfjs-dist",
  "protobufjs",
  "react-app-polyfill",
  "react-dev-utils",
  "react-devtools-inline",
  "recast",
  "semver",
  "stylelint-config-html",
  "umi",
  "web3-provider-engine",
  "webpack",
);

export type NewProgramStructure = 0 | 1 | 2;
export const NewProgramStructureFalse: NewProgramStructure = 0;
export const NewProgramStructureSameFileNames: NewProgramStructure = 1;
export const NewProgramStructureDifferentFileNames: NewProgramStructure = 2;

export type Path = string;
export type TristatePreference = boolean | "auto" | "on" | "off" | undefined;

export interface AutoImportExport {
  readonly name: string;
  readonly moduleSpecifier: string;
  readonly isTypeOnly?: boolean;
}

export interface BucketBuildPreferences {
  readonly fileExcludePatterns: readonly string[];
  readonly autoImportEntrypointDirectorySearch: TristatePreference;
}

export function bucketBuildPreferencesFromUserPreferences(preferences: UserPreferences): BucketBuildPreferences {
  const extended = preferences as UserPreferences & {
    readonly autoImportFileExcludePatterns?: readonly string[];
    readonly autoImportEntrypointDirectorySearch?: TristatePreference;
  };
  return {
    fileExcludePatterns: extended.autoImportFileExcludePatterns ?? [],
    autoImportEntrypointDirectorySearch: extended.autoImportEntrypointDirectorySearch,
  };
}

export function bucketBuildPreferencesEqual(left: BucketBuildPreferences, right: BucketBuildPreferences): boolean {
  return unorderedEqual(left.fileExcludePatterns, right.fileExcludePatterns)
    && left.autoImportEntrypointDirectorySearch === right.autoImportEntrypointDirectorySearch;
}

export function cloneBucketBuildPreferences(preferences: BucketBuildPreferences): BucketBuildPreferences {
  return {
    fileExcludePatterns: [...preferences.fileExcludePatterns],
    autoImportEntrypointDirectorySearch: preferences.autoImportEntrypointDirectorySearch,
  };
}

export interface BucketStateOptions {
  readonly dirtyFile?: Path;
  readonly multipleFilesDirty?: boolean;
  readonly newProgramStructure?: NewProgramStructure;
  readonly buildPreferences?: BucketBuildPreferences;
  readonly dirtyPackages?: SetCollection<string>;
  readonly recursiveSearchPackages?: SetCollection<string>;
}

export class BucketState {
  dirtyFile: Path = "";
  multipleFilesDirty = false;
  newProgramStructure: NewProgramStructure = NewProgramStructureFalse;
  buildPreferences: BucketBuildPreferences = {
    fileExcludePatterns: [],
    autoImportEntrypointDirectorySearch: undefined,
  };
  dirtyPackages: SetCollection<string> | undefined;
  recursiveSearchPackages: SetCollection<string> | undefined;

  constructor(options: BucketStateOptions = {}) {
    if (options.dirtyFile !== undefined) this.dirtyFile = options.dirtyFile;
    if (options.multipleFilesDirty !== undefined) this.multipleFilesDirty = options.multipleFilesDirty;
    if (options.newProgramStructure !== undefined) this.newProgramStructure = options.newProgramStructure;
    if (options.buildPreferences !== undefined) this.buildPreferences = options.buildPreferences;
    if (options.dirtyPackages !== undefined) this.dirtyPackages = options.dirtyPackages;
    if (options.recursiveSearchPackages !== undefined) this.recursiveSearchPackages = options.recursiveSearchPackages;
  }

  clone(): BucketState {
    const options: {
      dirtyFile: Path;
      multipleFilesDirty: boolean;
      newProgramStructure: NewProgramStructure;
      buildPreferences: BucketBuildPreferences;
      dirtyPackages?: SetCollection<string>;
      recursiveSearchPackages?: SetCollection<string>;
    } = {
      dirtyFile: this.dirtyFile,
      multipleFilesDirty: this.multipleFilesDirty,
      newProgramStructure: this.newProgramStructure,
      buildPreferences: cloneBucketBuildPreferences(this.buildPreferences),
    };
    if (this.dirtyPackages !== undefined) options.dirtyPackages = this.dirtyPackages.clone();
    if (this.recursiveSearchPackages !== undefined) options.recursiveSearchPackages = this.recursiveSearchPackages.clone();
    return new BucketState(options);
  }

  dirty(): boolean {
    return this.multipleFilesDirty
      || this.dirtyFile !== ""
      || this.newProgramStructure > 0
      || (this.dirtyPackages?.len() ?? 0) > 0;
  }

  dirtyFileForSingleFileUpdate(): Path {
    return this.multipleFilesDirty ? "" : this.dirtyFile;
  }

  dirtyPackagesForGranularUpdate(): SetCollection<string> | undefined {
    return this.multipleFilesDirty ? undefined : this.dirtyPackages;
  }

  recursiveSearchPackageSet(): SetCollection<string> | undefined {
    return this.recursiveSearchPackages;
  }

  possiblyNeedsRebuildForFile(file: Path, preferences: UserPreferences): boolean {
    return this.newProgramStructure > 0
      || this.hasDirtyFileBesides(file)
      || !bucketBuildPreferencesEqual(this.buildPreferences, bucketBuildPreferencesFromUserPreferences(preferences))
      || (this.dirtyPackages?.len() ?? 0) > 0;
  }

  hasDirtyFileBesides(file: Path): boolean {
    return this.multipleFilesDirty || (this.dirtyFile !== "" && this.dirtyFile !== file);
  }
}

export function recursiveSearchSubset(
  target: SetCollection<string> | undefined,
  current: SetCollection<string> | undefined,
): boolean {
  if (target === undefined) return current === undefined;
  if (current === undefined) return true;
  return target.isSubsetOf(current);
}

export interface PackageJsonCacheEntry {
  readonly fileName?: string;
  readonly packageName?: string;
}

export interface Directory {
  readonly name: string;
  readonly packageJson?: PackageJsonCacheEntry;
  readonly hasNodeModules: boolean;
}

export function cloneDirectory(directory: Directory): Directory {
  const result: {
    name: string;
    packageJson?: PackageJsonCacheEntry;
    hasNodeModules: boolean;
  } = {
    name: directory.name,
    hasNodeModules: directory.hasNodeModules,
  };
  if (directory.packageJson !== undefined) result.packageJson = directory.packageJson;
  return result;
}

export interface AutoImportRegistryBucketOptions {
  readonly state?: BucketState;
  readonly paths?: ReadonlyMap<Path, string>;
  readonly packageFiles?: ReadonlyMap<string, ReadonlyMap<Path, string> | undefined>;
  readonly resolvedPackageNames?: SetCollection<string>;
  readonly dependencyNames?: SetCollection<string>;
  readonly ambientModuleNames?: ReadonlyMap<string, readonly string[]>;
  readonly index?: ExportIndex;
}

export class AutoImportRegistryBucket {
  state: BucketState;
  paths: ReadonlyMap<Path, string> = new Map();
  packageFiles: ReadonlyMap<string, ReadonlyMap<Path, string> | undefined> = new Map();
  resolvedPackageNames: SetCollection<string> | undefined;
  dependencyNames: SetCollection<string> | undefined;
  ambientModuleNames: ReadonlyMap<string, readonly string[]> = new Map();
  index: ExportIndex | undefined;

  constructor(options: AutoImportRegistryBucketOptions = {}) {
    this.state = options.state ?? new BucketState({
      multipleFilesDirty: true,
      newProgramStructure: NewProgramStructureDifferentFileNames,
    });
    if (options.paths !== undefined) this.paths = options.paths;
    if (options.packageFiles !== undefined) this.packageFiles = options.packageFiles;
    if (options.resolvedPackageNames !== undefined) this.resolvedPackageNames = options.resolvedPackageNames;
    if (options.dependencyNames !== undefined) this.dependencyNames = options.dependencyNames;
    if (options.ambientModuleNames !== undefined) this.ambientModuleNames = options.ambientModuleNames;
    if (options.index !== undefined) this.index = options.index;
  }

  clone(): AutoImportRegistryBucket {
    const options: {
      state: BucketState;
      paths: ReadonlyMap<Path, string>;
      packageFiles: ReadonlyMap<string, ReadonlyMap<Path, string> | undefined>;
      ambientModuleNames: ReadonlyMap<string, readonly string[]>;
      resolvedPackageNames?: SetCollection<string>;
      dependencyNames?: SetCollection<string>;
      index?: ExportIndex;
    } = {
      state: this.state.clone(),
      paths: this.paths,
      packageFiles: this.packageFiles,
      ambientModuleNames: this.ambientModuleNames,
    };
    if (this.resolvedPackageNames !== undefined) options.resolvedPackageNames = this.resolvedPackageNames;
    if (this.dependencyNames !== undefined) options.dependencyNames = this.dependencyNames;
    if (this.index !== undefined) options.index = this.index;
    return new AutoImportRegistryBucket(options);
  }

  markProjectFileDirty(file: Path): void {
    if (this.state.hasDirtyFileBesides(file)) {
      this.state.multipleFilesDirty = true;
    } else {
      this.state.dirtyFile = file;
    }
  }

  markNodeModulesDirty(packageName: string): void {
    if (this.state.multipleFilesDirty) return;
    if (packageName === "") {
      this.state.multipleFilesDirty = true;
      return;
    }
    this.state.dirtyPackages ??= new SetCollection<string>();
    this.state.dirtyPackages.add(packageName);
  }
}

export function newRegistryBucket(): AutoImportRegistryBucket {
  return new AutoImportRegistryBucket();
}

export interface RegistryChange {
  readonly requestedFile?: Path;
  readonly openFiles?: ReadonlyMap<Path, string> | Readonly<Record<string, string>>;
  readonly changed?: SetCollection<DocumentUri> | readonly DocumentUri[];
  readonly created?: SetCollection<DocumentUri> | readonly DocumentUri[];
  readonly deleted?: SetCollection<DocumentUri> | readonly DocumentUri[];
  readonly rebuiltPrograms?: ReadonlyMap<Path, boolean> | Readonly<Record<string, boolean>>;
  readonly userPreferences?: UserPreferences;
}

export interface AutoImportRegistryCloneHost {
  getDefaultProject(path: Path): Path;
  getProgramFiles?(projectPath: Path): readonly { readonly path: Path; readonly fileName: string; readonly exports?: readonly AutoImportExport[] }[];
  getPackageName?(fileName: string): string;
  hasNodeModules?(directoryName: string): boolean;
  getPackageJson?(fileName: string): PackageJsonCacheEntry | undefined;
  resolveEntrypoints?(fileName: string): readonly unknown[];
}

export interface AutoImportProgramFile {
  readonly path: Path;
  readonly fileName: string;
}

export interface AutoImportRegistryProgram {
  sourceFiles(): readonly AutoImportProgramFile[];
  isSourceFileDefaultLibrary(path: Path): boolean;
  isGlobalTypingsFile(fileName: string): boolean;
}

export interface KnownSymlinkMap {
  readonly entries: ReadonlyMap<Path, readonly Path[]>;
}

export interface KnownSymlinks {
  filesByRealpath?(): KnownSymlinkMap | undefined;
  directoriesByRealpath?(): KnownSymlinkMap | undefined;
}

export interface FailedAmbientModuleLookupSource {
  readonly fileName: string;
  readonly packageName: string;
}

export interface BucketBuildResult {
  readonly bucket?: AutoImportRegistryBucket;
  readonly error?: Error;
  readonly entrypoints?: ReadonlyMap<Path, readonly unknown[]>;
  readonly removedEntrypointPaths?: readonly Path[];
  readonly possibleFailedAmbientModuleLookupSources?: SyncMap<Path, FailedAmbientModuleLookupSource>;
  readonly possibleFailedAmbientModuleLookupTargets?: SetCollection<string>;
}

export interface DiscoveredPackage {
  readonly packageName: string;
  readonly packageJson?: PackageJsonCacheEntry;
  readonly realpath: string;
  readonly typesPackageJson?: PackageJsonCacheEntry;
  readonly typesRealpath: string;
  readonly dirPath: Path;
  readonly isLocal: boolean;
}

export interface PerPackageExtractionResult {
  readonly packageFiles: ReadonlyMap<Path, string>;
  readonly entrypoints: readonly unknown[];
  readonly exports: ReadonlyMap<Path, readonly AutoImportExport[]>;
  readonly ambientModules: ReadonlyMap<string, readonly string[]>;
  readonly statsExports: number;
  readonly statsUsedChecker: number;
  readonly skippedEntrypoints: number;
  readonly isSymlinked: boolean;
  readonly failedAmbientModuleLookupSources: ReadonlyMap<Path, FailedAmbientModuleLookupSource>;
  readonly failedAmbientModuleLookupTargets: SetCollection<string>;
}

export interface PackageExtractionResult {
  readonly exports: ReadonlyMap<Path, readonly AutoImportExport[]>;
  readonly packageFiles: ReadonlyMap<string, ReadonlyMap<Path, string>>;
  readonly ambientModuleNames: ReadonlyMap<string, readonly string[]>;
  readonly entrypoints: readonly (readonly unknown[])[];
  readonly workspacePackages: SetCollection<string>;
  readonly possibleFailedAmbientModuleLookupSources: SyncMap<Path, FailedAmbientModuleLookupSource>;
  readonly possibleFailedAmbientModuleLookupTargets: SetCollection<string>;
  readonly statsExports: number;
  readonly statsUsedChecker: number;
  readonly skippedEntrypointsCount: number;
}

export interface RegistryCloneLogger {
  log(message: string): void;
}

class RegistryBuilder {
  private readonly base: Registry;
  private readonly host: AutoImportRegistryCloneHost;
  private readonly logger: RegistryCloneLogger | undefined;
  userPreferences: UserPreferences;
  directories: Map<Path, Directory>;
  nodeModules: Map<Path, AutoImportRegistryBucket>;
  projects: Map<Path, AutoImportRegistryBucket>;
  entrypoints: Map<Path, readonly unknown[]>;
  specifierCache: Map<Path, SyncMap<Path, string>>;
  uniquePackageCount: number;

  constructor(base: Registry, host: AutoImportRegistryCloneHost, logger?: RegistryCloneLogger) {
    this.base = base;
    this.host = host;
    this.logger = logger;
    this.userPreferences = base.userPreferences;
    this.directories = cloneDirectoryMap(base.directories);
    this.nodeModules = cloneBucketMap(base.nodeModules);
    this.projects = cloneBucketMap(base.projects);
    this.entrypoints = new Map(base.entrypoints);
    this.specifierCache = cloneSpecifierCache(base.specifierCache);
    this.uniquePackageCount = base.uniquePackageCount;
  }

  apply(change: RegistryChange): void {
    if (change.userPreferences !== undefined) {
      const previous = this.userPreferences;
      this.userPreferences = change.userPreferences;
      if (!unorderedEqual(
        preferenceArray(previous, "autoImportSpecifierExcludeRegexes"),
        preferenceArray(change.userPreferences, "autoImportSpecifierExcludeRegexes"),
      )) {
        this.specifierCache.clear();
      }
    }
    this.updateBucketAndDirectoryExistence(change);
    this.markBucketsDirty(change);
    if (change.requestedFile !== undefined && change.requestedFile !== "") {
      this.updateIndexes(change.requestedFile);
    }
  }

  build(): Registry {
    const registry = new Registry(this.base.toPath, this.userPreferences);
    registry.uniquePackageCount = this.uniquePackageCount;
    for (const [path, directory] of this.directories) registry.directories.set(path, cloneDirectory(directory));
    for (const [path, bucket] of this.projects) registry.projects.set(path, bucket.clone());
    for (const [path, bucket] of this.nodeModules) registry.nodeModules.set(path, bucket.clone());
    for (const [path, entrypoints] of this.entrypoints) registry.entrypoints.set(path, entrypoints);
    for (const [path, cache] of this.specifierCache) registry.specifierCache.set(path, cache);
    for (const [name, exports] of this.base.exportsByNameEntries()) {
      for (const value of exports) registry.add(value);
    }
    for (const bucket of registry.projects.values()) addBucketExports(registry, bucket);
    for (const bucket of registry.nodeModules.values()) addBucketExports(registry, bucket);
    return registry;
  }

  private updateBucketAndDirectoryExistence(change: RegistryChange): void {
    const openFiles = mapEntries(change.openFiles);
    const neededProjects = new Set<Path>();
    for (const [path, fileName] of openFiles) {
      const projectPath = this.host.getDefaultProject(path);
      neededProjects.add(projectPath);
      this.ensureSpecifierCache(path);
      this.ensureDirectoryChain(path, fileName);
    }
    if (change.requestedFile !== undefined && change.requestedFile !== "") {
      neededProjects.add(this.host.getDefaultProject(change.requestedFile));
      this.ensureSpecifierCache(change.requestedFile);
    }

    for (const projectPath of neededProjects) {
      if (!this.projects.has(projectPath)) {
        this.projects.set(projectPath, newRegistryBucket());
        this.logger?.log(`Added project: ${projectPath}`);
      }
    }
    for (const projectPath of [...this.projects.keys()]) {
      if (!neededProjects.has(projectPath)) {
        this.projects.delete(projectPath);
        this.logger?.log(`Removed project: ${projectPath}`);
      }
    }
    for (const path of [...this.specifierCache.keys()]) {
      if (!openFiles.has(path) && path !== change.requestedFile) this.specifierCache.delete(path);
    }
  }

  private markBucketsDirty(change: RegistryChange): void {
    const rebuiltPrograms = mapEntries(change.rebuiltPrograms);
    for (const [projectPath, differentFileNames] of rebuiltPrograms) {
      const bucket = this.projects.get(projectPath);
      if (bucket === undefined) continue;
      bucket.state.newProgramStructure = differentFileNames ? NewProgramStructureDifferentFileNames : NewProgramStructureSameFileNames;
    }
    for (const uri of setValues(change.changed)) this.markFileDirty(uri);
    for (const uri of setValues(change.created)) this.markFileDirty(uri);
    for (const uri of setValues(change.deleted)) this.markFileDirty(uri, true);
    if (change.userPreferences !== undefined) {
      for (const bucket of this.projects.values()) bucket.state.buildPreferences = bucketBuildPreferencesFromUserPreferences(change.userPreferences);
      for (const bucket of this.nodeModules.values()) bucket.state.buildPreferences = bucketBuildPreferencesFromUserPreferences(change.userPreferences);
    }
  }

  private markFileDirty(uri: DocumentUri, deleted = false): void {
    const path = this.base.toPath(uri);
    const projectPath = this.host.getDefaultProject(path);
    const project = this.projects.get(projectPath);
    if (project !== undefined) project.markProjectFileDirty(path);

    const packageName = this.host.getPackageName?.(uri) ?? "";
    for (const [nodeModulesPath, bucket] of this.nodeModules) {
      if (deleted || packageName === "" || isPathUnderDirectory(path, nodeModulesPath)) {
        bucket.markNodeModulesDirty(packageName);
      }
    }
  }

  private updateIndexes(requestedFile: Path): void {
    const projectPath = this.host.getDefaultProject(requestedFile);
    const bucket = this.projects.get(projectPath);
    if (bucket !== undefined) {
      this.updateProjectBucket(projectPath, bucket);
    }
    this.updateNodeModulesBuckets(requestedFile);
  }

  private updateProjectBucket(projectPath: Path, bucket: AutoImportRegistryBucket): void {
    const files = this.host.getProgramFiles?.(projectPath) ?? [];
    const paths = new Map<Path, string>();
    const indexEntries: AutoImportExport[] = [];
    const resolvedPackages = new SetCollection<string>();
    for (const file of files) {
      paths.set(file.path, file.fileName);
      for (const value of file.exports ?? []) {
        indexEntries.push(value);
        const packageName = this.host.getPackageName?.(file.fileName);
        if (packageName !== undefined && packageName !== "") resolvedPackages.add(packageName);
      }
      const entrypoints = this.host.resolveEntrypoints?.(file.fileName);
      if (entrypoints !== undefined) this.entrypoints.set(file.path, entrypoints);
    }
    bucket.paths = paths;
    bucket.resolvedPackageNames = resolvedPackages.len() === 0 ? undefined : resolvedPackages;
    bucket.index = exportIndexFromExports(indexEntries);
    bucket.state = new BucketState({
      buildPreferences: bucketBuildPreferencesFromUserPreferences(this.userPreferences),
    });
  }

  private updateNodeModulesBuckets(requestedFile: Path): void {
    let directoryPath = getDirectoryPath(requestedFile);
    while (directoryPath !== getDirectoryPath(directoryPath)) {
      const nodeModulesPath = `${directoryPath}/node_modules`;
      if (this.host.hasNodeModules?.(directoryPath) === true && !this.nodeModules.has(nodeModulesPath)) {
        this.nodeModules.set(nodeModulesPath, newRegistryBucket());
      }
      directoryPath = getDirectoryPath(directoryPath);
    }
    this.uniquePackageCount = countUniquePackages(this.nodeModules);
  }

  computeDependenciesForNodeModulesDirectory(
    change: RegistryChange,
    allResolvedPackageNames: ReadonlyMap<Path, SetCollection<string>>,
    dirName: string,
    dirPath: Path,
  ): SetCollection<string> | undefined {
    const openFiles = mapEntries(change.openFiles);
    for (const path of openFiles.keys()) {
      if (isPathUnderDirectory(path, dirPath) && this.getNearestAncestorDirectoryWithPackageJson(path) === undefined) {
        return undefined;
      }
    }

    const dependencies = new SetCollection<string>();
    for (const [directoryPath, directory] of this.directories) {
      if (directory.packageJson !== undefined && isPathUnderDirectory(directoryPath, dirPath)) {
        addPackageJsonDependencies(directory.packageJson, dependencies);
      }
    }

    for (const resolvedPackageNames of allResolvedPackageNames.values()) {
      for (const name of resolvedPackageNames.keys()) dependencies.add(name);
    }

    void dirName;
    return dependencies;
  }

  discoverBucketPackages(
    packageNames: SetCollection<string>,
    dirName: string,
    dirPath: Path,
  ): readonly DiscoveredPackage[] {
    const result: DiscoveredPackage[] = [];
    for (const packageName of packageNames.keys()) {
      const typesPackageName = getTypesPackageName(packageName);
      const packageJson = this.host.getPackageJson?.(`${dirName}/node_modules/${packageName}/package.json`);
      const typesPackageJson = packageName === typesPackageName
        ? undefined
        : this.host.getPackageJson?.(`${dirName}/node_modules/${typesPackageName}/package.json`);
      const realpath = packageJson?.fileName === undefined ? "" : getDirectoryPath(packageJson.fileName);
      const typesRealpath = typesPackageJson?.fileName === undefined ? "" : getDirectoryPath(typesPackageJson.fileName);
      result.push({
        packageName,
        ...(packageJson === undefined ? {} : { packageJson }),
        realpath,
        ...(typesPackageJson === undefined ? {} : { typesPackageJson }),
        typesRealpath,
        dirPath,
        isLocal: realpath !== "" && !realpath.includes("/node_modules/"),
      });
    }
    return result;
  }

  private ensureDirectoryChain(path: Path, fileName: string): void {
    let directoryPath = getDirectoryPath(path);
    let directoryName = getDirectoryPath(fileName);
    while (directoryPath !== getDirectoryPath(directoryPath)) {
      const hasNodeModules = this.host.hasNodeModules?.(directoryName) ?? false;
      const packageJson = this.host.getPackageJson?.(`${directoryName}/package.json`);
      this.directories.set(directoryPath, packageJson === undefined
        ? { name: directoryName, hasNodeModules }
        : { name: directoryName, packageJson, hasNodeModules });
      directoryPath = getDirectoryPath(directoryPath);
      directoryName = getDirectoryPath(directoryName);
    }
  }

  private ensureSpecifierCache(path: Path): void {
    if (!this.specifierCache.has(path)) this.specifierCache.set(path, new SyncMap<Path, string>());
  }

  private getNearestAncestorDirectoryWithPackageJson(filePath: Path): Directory | undefined {
    for (let directoryPath = getDirectoryPath(filePath); directoryPath !== getDirectoryPath(directoryPath); directoryPath = getDirectoryPath(directoryPath)) {
      const directory = this.directories.get(directoryPath);
      if (directory?.packageJson !== undefined) return directory;
    }
    return undefined;
  }
}

export interface BucketStats {
  readonly path: Path;
  readonly exportCount: number;
  readonly fileCount: number;
  readonly state: BucketState;
  readonly dependencyNames?: SetCollection<string>;
  readonly packageNames?: SetCollection<string>;
}

export interface CacheStats {
  readonly projectBuckets: readonly BucketStats[];
  readonly nodeModulesBuckets: readonly BucketStats[];
  readonly uniquePackageCount: number;
}

export class Registry {
  private readonly exportsByName = new Map<string, AutoImportExport[]>();
  readonly directories = new Map<Path, Directory>();
  readonly nodeModules = new Map<Path, AutoImportRegistryBucket>();
  readonly projects = new Map<Path, AutoImportRegistryBucket>();
  readonly entrypoints = new Map<Path, readonly unknown[]>();
  readonly specifierCache = new Map<Path, SyncMap<Path, string>>();
  uniquePackageCount = 0;

  constructor(
    readonly toPath: (fileName: string) => Path = (fileName) => fileName,
    readonly userPreferences: UserPreferences = {},
  ) {}

  add(value: AutoImportExport): void {
    const list = this.exportsByName.get(value.name) ?? [];
    this.exportsByName.set(value.name, [...list, value]);
  }

  get(name: string): readonly AutoImportExport[] {
    return this.exportsByName.get(name) ?? [];
  }

  exportsByNameEntries(): IterableIterator<readonly [string, readonly AutoImportExport[]]> {
    return this.exportsByName.entries();
  }

  cloneWithChange(change: RegistryChange, host: AutoImportRegistryCloneHost, logger?: RegistryCloneLogger): Registry {
    const builder = new RegistryBuilder(this, host, logger);
    builder.apply(change);
    return builder.build();
  }

  isPreparedForImportingFile(fileName: string, projectPath: Path, preferences: UserPreferences): boolean {
    const projectBucket = this.projects.get(projectPath);
    if (projectBucket === undefined) return false;
    const path = this.toPath(fileName);
    if (projectBucket.state.possiblyNeedsRebuildForFile(path, preferences)) return false;

    let directoryPath = getDirectoryPath(path);
    while (true) {
      const directoryBucket = this.nodeModules.get(directoryPath);
      if (directoryBucket !== undefined && directoryBucket.state.possiblyNeedsRebuildForFile(path, preferences)) {
        return false;
      }
      const parent = getDirectoryPath(directoryPath);
      if (parent === directoryPath) break;
      directoryPath = parent;
    }
    return true;
  }

  nodeModulesDirectories(): ReadonlyMap<Path, string> {
    const directories = new Map<Path, string>();
    for (const [directoryPath, directory] of this.directories) {
      if (directory.hasNodeModules) directories.set(`${directoryPath}/node_modules`, `${directory.name}/node_modules`);
    }
    return directories;
  }

  clone(): Registry {
    const registry = new Registry(this.toPath, this.userPreferences);
    registry.uniquePackageCount = this.uniquePackageCount;
    for (const [name, exports] of this.exportsByName) registry.exportsByName.set(name, [...exports]);
    for (const [path, directory] of this.directories) registry.directories.set(path, cloneDirectory(directory));
    for (const [path, bucket] of this.projects) registry.projects.set(path, bucket.clone());
    for (const [path, bucket] of this.nodeModules) registry.nodeModules.set(path, bucket.clone());
    for (const [path, entrypoints] of this.entrypoints) registry.entrypoints.set(path, entrypoints);
    for (const [path, cache] of this.specifierCache) registry.specifierCache.set(path, cache);
    return registry;
  }

  getCacheStats(): CacheStats {
    const projectBuckets = [...this.projects].map(([path, bucket]): BucketStats => {
      const stats: {
        path: Path;
        exportCount: number;
        fileCount: number;
        state: BucketState;
        dependencyNames?: SetCollection<string>;
      } = {
        path,
        exportCount: bucket.index?.entries.length ?? 0,
        fileCount: bucket.paths.size,
        state: bucket.state,
      };
      if (bucket.dependencyNames !== undefined) stats.dependencyNames = bucket.dependencyNames;
      return stats;
    });

    const nodeModulesBuckets = [...this.nodeModules].map(([path, bucket]): BucketStats => {
      const packageNames = new SetCollection<string>();
      let fileCount = 0;
      for (const [packageName, files] of bucket.packageFiles) {
        packageNames.add(packageName);
        fileCount += files?.size ?? 0;
      }
      const stats: {
        path: Path;
        exportCount: number;
        fileCount: number;
        state: BucketState;
        dependencyNames?: SetCollection<string>;
        packageNames: SetCollection<string>;
      } = {
        path,
        exportCount: bucket.index?.entries.length ?? 0,
        fileCount,
        state: bucket.state,
        packageNames,
      };
      if (bucket.dependencyNames !== undefined) stats.dependencyNames = bucket.dependencyNames;
      return stats;
    });

    projectBuckets.sort((left, right) => left.path.localeCompare(right.path));
    nodeModulesBuckets.sort((left, right) => left.path.localeCompare(right.path));
    return {
      projectBuckets,
      nodeModulesBuckets,
      uniquePackageCount: this.uniquePackageCount,
    };
  }
}

export function hasNewNonNodeModulesFiles(program: AutoImportRegistryProgram, bucket: AutoImportRegistryBucket): boolean {
  if (bucket.state.newProgramStructure !== NewProgramStructureDifferentFileNames) return false;
  for (const file of program.sourceFiles()) {
    if (file.fileName.includes("/node_modules/") || isIgnoredFile(program, file)) continue;
    if (!bucket.paths.has(file.path)) return true;
  }
  return false;
}

export function isIgnoredFile(program: AutoImportRegistryProgram, file: AutoImportProgramFile): boolean {
  return program.isSourceFileDefaultLibrary(file.path) || program.isGlobalTypingsFile(file.fileName);
}

export function hasSymlinkToNodeModules(filePath: Path, symlinkCache: KnownSymlinks | undefined): boolean {
  if (symlinkCache === undefined) return false;
  const fileSymlinks = symlinkCache.filesByRealpath?.()?.entries.get(filePath);
  if (fileSymlinks !== undefined && fileSymlinks.some(path => path.includes("/node_modules/"))) return true;

  const directorySymlinks = symlinkCache.directoriesByRealpath?.()?.entries;
  if (directorySymlinks === undefined) return false;
  for (let directoryPath = filePath; directoryPath !== getDirectoryPath(directoryPath); directoryPath = getDirectoryPath(directoryPath)) {
    const symlinkPaths = directorySymlinks.get(ensureTrailingDirectorySeparator(directoryPath));
    if (symlinkPaths !== undefined && symlinkPaths.some(path => path.includes("/node_modules/"))) return true;
  }
  return false;
}

function cloneDirectoryMap(source: ReadonlyMap<Path, Directory>): Map<Path, Directory> {
  const result = new Map<Path, Directory>();
  for (const [path, directory] of source) result.set(path, cloneDirectory(directory));
  return result;
}

function cloneBucketMap(source: ReadonlyMap<Path, AutoImportRegistryBucket>): Map<Path, AutoImportRegistryBucket> {
  const result = new Map<Path, AutoImportRegistryBucket>();
  for (const [path, bucket] of source) result.set(path, bucket.clone());
  return result;
}

function cloneSpecifierCache(source: ReadonlyMap<Path, SyncMap<Path, string>>): Map<Path, SyncMap<Path, string>> {
  const result = new Map<Path, SyncMap<Path, string>>();
  for (const [path, cache] of source) result.set(path, cache.clone());
  return result;
}

function mapEntries<T>(value: ReadonlyMap<Path, T> | Readonly<Record<string, T>> | undefined): Map<Path, T> {
  if (value === undefined) return new Map();
  if (value instanceof Map) return new Map(value);
  return new Map(Object.entries(value));
}

function setValues(value: SetCollection<DocumentUri> | readonly DocumentUri[] | undefined): readonly DocumentUri[] {
  if (value === undefined) return [];
  if (value instanceof SetCollection) return [...value.keys()];
  return value;
}

function preferenceArray(preferences: UserPreferences, key: string): readonly string[] {
  const record = preferences as Readonly<Record<string, unknown>>;
  const value = record[key];
  return Array.isArray(value) && value.every(item => typeof item === "string") ? value : [];
}

function isPathUnderDirectory(path: Path, directory: Path): boolean {
  return path === directory || path.startsWith(`${directory}/`);
}

function ensureTrailingDirectorySeparator(path: Path): Path {
  return path.endsWith("/") ? path : `${path}/`;
}

function addPackageJsonDependencies(packageJson: PackageJsonCacheEntry, dependencies: SetCollection<string>): void {
  const record = packageJson as unknown as Readonly<Record<string, unknown>>;
  const contents = typeof record["contents"] === "object" && record["contents"] !== null
    ? record["contents"] as Readonly<Record<string, unknown>>
    : record;
  for (const field of ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"]) {
    const dependencyMap = contents[field];
    if (dependencyMap === undefined || dependencyMap === null || typeof dependencyMap !== "object") continue;
    for (const name of Object.keys(dependencyMap)) dependencies.add(name);
  }
  if (packageJson.packageName !== undefined && packageJson.packageName !== "") dependencies.add(packageJson.packageName);
}

function getTypesPackageName(packageName: string): string {
  if (packageName.startsWith("@")) {
    const [scope, name] = packageName.split("/");
    if (scope !== undefined && name !== undefined) return `@types/${scope.slice(1)}__${name}`;
  }
  return `@types/${packageName}`;
}

function exportIndexFromExports(exports: readonly AutoImportExport[]): ExportIndex {
  const entries = exports as unknown as readonly ExportIndex["entries"][number][];
  return {
    entries,
    searchWordPrefix: (query) => entries.filter(entry => exportEntryName(entry).startsWith(query)),
    find: (query, exact) => entries.filter(entry => {
      const name = exportEntryName(entry);
      return exact ? name === query : name.toLocaleLowerCase() === query.toLocaleLowerCase();
    }),
  };
}

function exportEntryName(entry: ExportIndex["entries"][number]): string {
  const record = entry as unknown as Readonly<Record<string, unknown>>;
  const value = record["name"];
  if (typeof value === "string") return value;
  const getName = record["name"] ?? record["Name"];
  if (typeof getName === "function") {
    const result = getName.call(entry);
    return typeof result === "string" ? result : "";
  }
  return "";
}

function addBucketExports(registry: Registry, bucket: AutoImportRegistryBucket): void {
  for (const entry of bucket.index?.entries ?? []) {
    const record = entry as unknown as Readonly<Record<string, unknown>>;
    const name = exportEntryName(entry);
    if (name === "") continue;
    const moduleSpecifier = typeof record["moduleSpecifier"] === "string"
      ? record["moduleSpecifier"]
      : typeof record["moduleName"] === "string"
        ? record["moduleName"]
        : "";
    registry.add({ name, moduleSpecifier, isTypeOnly: record["isTypeOnly"] === true });
  }
}

function countUniquePackages(nodeModules: ReadonlyMap<Path, AutoImportRegistryBucket>): number {
  const packages = new Set<string>();
  for (const bucket of nodeModules.values()) {
    for (const packageName of bucket.packageFiles.keys()) packages.add(packageName);
    for (const packageName of bucket.dependencyNames?.keys() ?? []) packages.add(packageName);
  }
  return packages.size;
}

function unorderedEqual(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const leftSet = new Set(left);
  for (const value of right) {
    if (!leftSet.has(value)) return false;
  }
  return true;
}
