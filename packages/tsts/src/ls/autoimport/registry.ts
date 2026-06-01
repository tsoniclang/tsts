/**
 * Auto-import registry state.
 *
 * Porting surface for TS-Go `internal/ls/autoimport/registry.go`.
 */

import { SetCollection, newSetFromItems } from "../../collections/index.js";
import { getDirectoryPath } from "../../tspath/index.js";
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
  readonly specifierCache = new Map<Path, unknown>();
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

function unorderedEqual(left: readonly string[], right: readonly string[]): boolean {
  if (left.length !== right.length) return false;
  const leftSet = new Set(left);
  for (const value of right) {
    if (!leftSet.has(value)) return false;
  }
  return true;
}
