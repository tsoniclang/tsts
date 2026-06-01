/**
 * Auto-import view over project and node_modules export indexes.
 *
 * Port of TS-Go `internal/ls/autoimport/view.go`.
 */

import { SetCollection } from "../../collections/index.js";
import { unprefixedNodeCoreModules } from "../../core/index.js";
import type { AutoImportFix, Position } from "../../lsp/lsproto/index.js";
import type {
  ModuleSpecifierEnding,
  SourceFileForSpecifierGeneration,
  TspathHelpers,
  UserPreferences,
} from "../../modulespecifiers/index.js";
import type { PackageJSON } from "../../packagejson/index.js";
import type { Path } from "../../tspath/index.js";
import {
  exportAmbientModuleName,
  exportIsRenameable,
  exportName,
  type ExportEntry,
  type ExportID,
} from "./export.js";
import { addPackageJsonDependencies } from "./util.js";
import type {
  AutoImportProgram,
  AutoImportRegistry,
  AutoImportView as AutoImportSpecifierView,
  ConditionSet,
} from "./specifiers.js";

export interface ExportIndex {
  readonly entries: readonly ExportEntry[];
  searchWordPrefix(query: string): readonly ExportEntry[];
  find(query: string, exact: boolean): readonly ExportEntry[];
}

export type PackageNameSet = SetCollection<string> | ReadonlySet<string> | readonly string[];

export interface RegistryBucket {
  readonly index: ExportIndex;
  readonly resolvedPackageNames?: PackageNameSet;
  readonly packageFiles?: PackageNameSet | ReadonlyMap<string, unknown>;
}

export interface ViewPackageJsonContents {
  readonly parseable: boolean;
  readonly value: PackageJSON;
}

export interface ViewPackageJsonFile {
  exists(): boolean;
  readonly contents: ViewPackageJsonContents;
}

export interface ViewDirectoryInfo {
  readonly packageJson?: ViewPackageJsonFile;
}

export interface ViewRegistry extends AutoImportRegistry {
  readonly projects: ReadonlyMap<Path, RegistryBucket>;
  readonly nodeModules: ReadonlyMap<Path, RegistryBucket>;
  readonly directories: ReadonlyMap<Path, ViewDirectoryInfo>;
}

export interface AutoImportFixProvider {
  getFixes(
    view: View,
    exportEntry: ExportEntry,
    forJsx: boolean,
    isTypeOnlyLocation: boolean,
    usagePosition: Position,
  ): readonly AutoImportFix[];
  compareFixesForRanking(view: View, left: AutoImportFix, right: AutoImportFix): number;
  compareFixesForSorting(view: View, left: AutoImportFix, right: AutoImportFix): number;
}

export interface ViewOptions {
  readonly registry: ViewRegistry;
  readonly importingFile: SourceFileForSpecifierGeneration;
  readonly importingFilePath: Path;
  readonly projectKey: Path;
  readonly program: AutoImportProgram;
  readonly preferences: UserPreferences;
  readonly conditions: ConditionSet;
  readonly tspath: TspathHelpers;
  readonly allowedEndings?: readonly ModuleSpecifierEnding[];
  readonly fixProvider?: AutoImportFixProvider;
}

export enum QueryKind {
  WordPrefix = 0,
  ExactMatch = 1,
  CaseInsensitiveMatch = 2,
}

export interface FixAndExport {
  readonly fix: AutoImportFix;
  readonly exportEntry: ExportEntry;
}

interface ExportGroupKey {
  readonly target: ExportID;
  readonly name: string;
  readonly ambientModuleOrPackageName: string;
}

export class View implements AutoImportSpecifierView {
  readonly registry: ViewRegistry;
  readonly importingFile: SourceFileForSpecifierGeneration;
  readonly importingFilePath: Path;
  readonly program: AutoImportProgram;
  readonly preferences: UserPreferences;
  readonly projectKey: Path;
  readonly conditions: ConditionSet;
  readonly tspath: TspathHelpers;
  readonly fixProvider: AutoImportFixProvider | undefined;
  #allowedEndings: readonly ModuleSpecifierEnding[] | undefined;

  constructor(options: ViewOptions) {
    this.registry = options.registry;
    this.importingFile = options.importingFile;
    this.importingFilePath = options.importingFilePath;
    this.program = options.program;
    this.preferences = options.preferences;
    this.projectKey = options.projectKey;
    this.conditions = options.conditions;
    this.tspath = options.tspath;
    this.#allowedEndings = options.allowedEndings;
    this.fixProvider = options.fixProvider;
  }

  getAllowedEndings(): readonly ModuleSpecifierEnding[] {
    if (this.#allowedEndings === undefined) {
      throw new Error("auto-import view requires allowed module-specifier endings");
    }
    return this.#allowedEndings;
  }

  search(query: string, kind: QueryKind): readonly ExportEntry[] {
    const searchBucket = (bucket: RegistryBucket): readonly ExportEntry[] => {
      switch (kind) {
        case QueryKind.WordPrefix:
          return bucket.index.searchWordPrefix(query);
        case QueryKind.ExactMatch:
          return bucket.index.find(query, true);
        case QueryKind.CaseInsensitiveMatch:
          return bucket.index.find(query, false);
      }
    };
    return this.searchBuckets(searchBucket);
  }

  searchByExportID(id: ExportID): readonly ExportEntry[] {
    return this.searchBuckets(bucket => bucket.index.entries.filter(entry => sameExportID(entry, id)));
  }

  getCompletions(
    prefix: string,
    position: Position,
    forJsx: boolean,
    isTypeOnlyLocation: boolean,
  ): readonly FixAndExport[] {
    const provider = this.fixProvider;
    if (provider === undefined) {
      throw new Error("auto-import view requires an AutoImportFixProvider before completions can be ranked");
    }

    const grouped = new Map<string, ExportEntry[]>();
    for (const entry of this.search(prefix, QueryKind.WordPrefix)) {
      const name = exportName(entry);
      if (forJsx && (name.length === 0 || (!isUppercaseStart(name) && !exportIsRenameable(entry)))) {
        continue;
      }
      const key = this.groupKey(entry, name);
      const existing = grouped.get(key);
      if (existing === undefined) {
        grouped.set(key, [entry]);
        continue;
      }
      const duplicateIndex = existing.findIndex(candidate => sameExportID(candidate, entry));
      if (duplicateIndex < 0) {
        existing.push(entry);
      } else {
        existing[duplicateIndex] = mergeExportEntries(existing[duplicateIndex]!, entry);
      }
    }

    const fixes: FixAndExport[] = [];
    for (const entries of grouped.values()) {
      const fixesForGroup: FixAndExport[] = [];
      for (const entry of entries) {
        for (const fix of provider.getFixes(this, entry, forJsx, isTypeOnlyLocation, position)) {
          fixesForGroup.push({ fix, exportEntry: entry });
        }
      }
      fixes.push(...minAllBy(fixesForGroup, (left, right) =>
        provider.compareFixesForRanking(this, left.fix, right.fix)));
    }

    fixes.sort((left, right) => provider.compareFixesForSorting(this, left.fix, right.fix));
    return fixes;
  }

  private searchBuckets(searchBucket: (bucket: RegistryBucket) => readonly ExportEntry[]): readonly ExportEntry[] {
    const results: ExportEntry[] = [];
    const projectBucket = this.registry.projects.get(this.projectKey);
    if (projectBucket !== undefined) {
      for (const entry of searchBucket(projectBucket)) {
        if (entry.moduleID !== this.importingFilePath) results.push(entry);
      }
    }

    let allowedPackages: SetCollection<string> | undefined;
    for (const directoryPath of ancestorDirectoryPaths(getDirectoryPath(this.importingFilePath))) {
      const packageJson = this.registry.directories.get(directoryPath)?.packageJson;
      if (packageJson?.exists() === true && packageJson.contents.parseable) {
        allowedPackages ??= new SetCollection<string>();
        addPackageJsonDependencies(packageJson.contents.value, allowedPackages);
      }
    }
    if (allowedPackages !== undefined && projectBucket?.resolvedPackageNames !== undefined) {
      for (const packageName of packageNames(projectBucket.resolvedPackageNames)) {
        allowedPackages.add(packageName);
      }
    }

    const excludePackages = new SetCollection<string>();
    for (const directoryPath of ancestorDirectoryPaths(getDirectoryPath(this.importingFilePath))) {
      const nodeModulesBucket = this.registry.nodeModules.get(directoryPath);
      if (nodeModulesBucket === undefined) continue;
      for (const entry of searchBucket(nodeModulesBucket)) {
        if (excludePackages.has(entry.packageName)) continue;
        if (allowedPackages !== undefined && !allowedPackages.has(entry.packageName)) continue;
        results.push(entry);
      }
      for (const packageName of packageNames(nodeModulesBucket.packageFiles)) {
        excludePackages.add(packageName);
      }
    }

    return results;
  }

  private groupKey(entry: ExportEntry, name: string): string {
    const target = isEmptyExportID(entry.target) ? entry : entry.target;
    let ambientModuleOrPackageName = exportAmbientModuleName(entry) || entry.packageName;
    if (
      (entry.packageName === "@types/node" || entry.path.includes("/node_modules/@types/node/"))
      && unprefixedNodeCoreModules.has(ambientModuleOrPackageName)
    ) {
      ambientModuleOrPackageName = "node:" + ambientModuleOrPackageName;
    }
    return serializeGroupKey({ target, name, ambientModuleOrPackageName });
  }
}

export function newView(options: ViewOptions): View {
  return new View(options);
}

function serializeGroupKey(key: ExportGroupKey): string {
  return `${key.target.moduleID}\u0000${key.target.exportName}\u0000${key.name}\u0000${key.ambientModuleOrPackageName}`;
}

function sameExportID(left: ExportID, right: ExportID): boolean {
  return left.moduleID === right.moduleID && left.exportName === right.exportName;
}

function isEmptyExportID(id: ExportID): boolean {
  return id.moduleID === "" && id.exportName === "";
}

function mergeExportEntries(left: ExportEntry, right: ExportEntry): ExportEntry {
  const localName = right.localName ?? left.localName;
  const through = right.through ?? left.through;
  const scriptElementKind = minOptionalNumber(left.scriptElementKind, right.scriptElementKind);
  const scriptElementKindModifiers = (left.scriptElementKindModifiers ?? 0) | (right.scriptElementKindModifiers ?? 0);
  return {
    moduleID: right.moduleID,
    exportName: right.exportName,
    moduleFileName: right.moduleFileName,
    isTypeOnly: left.isTypeOnly || right.isTypeOnly,
    syntax: left.syntax < right.syntax ? left.syntax : right.syntax,
    flags: left.flags | right.flags,
    target: right.target,
    path: right.path,
    packageName: right.packageName,
    ...(localName === undefined ? {} : { localName }),
    ...(through === undefined ? {} : { through }),
    ...(scriptElementKind === undefined ? {} : { scriptElementKind }),
    scriptElementKindModifiers,
  };
}

function minOptionalNumber(left: number | undefined, right: number | undefined): number | undefined {
  if (left === undefined) return right;
  if (right === undefined) return left;
  return left < right ? left : right;
}

function minAllBy<T>(values: readonly T[], compare: (left: T, right: T) => number): readonly T[] {
  if (values.length <= 1) return values;
  const selected: T[] = [values[0]!];
  for (let index = 1; index < values.length; index += 1) {
    const value = values[index]!;
    const comparison = compare(value, selected[0]!);
    if (comparison < 0) {
      selected.length = 0;
      selected.push(value);
    } else if (comparison === 0) {
      selected.push(value);
    }
  }
  return selected;
}

function packageNames(source: PackageNameSet | ReadonlyMap<string, unknown> | undefined): readonly string[] {
  if (source === undefined) return [];
  if (source instanceof SetCollection) return Array.from(source.keys());
  if (source instanceof Set) return Array.from(source);
  if (source instanceof Map) return Array.from(source.keys());
  if (hasMapKeys(source)) return Array.from(source.keys());
  return [...source];
}

function hasMapKeys(source: unknown): source is ReadonlyMap<string, unknown> {
  return typeof (source as { keys?: unknown }).keys === "function";
}

function ancestorDirectoryPaths(start: Path): readonly Path[] {
  const paths: Path[] = [];
  let current = trimTrailingDirectorySeparator(start);
  while (current !== "") {
    paths.push(current);
    const parent = getDirectoryPath(current);
    if (parent === current) break;
    current = parent;
  }
  return paths;
}

function getDirectoryPath(path: Path): Path {
  const normalized = trimTrailingDirectorySeparator(path);
  const slash = normalized.lastIndexOf("/");
  if (slash < 0) return "";
  if (slash === 0) return "/";
  return normalized.slice(0, slash);
}

function trimTrailingDirectorySeparator(path: Path): Path {
  let end = path.length;
  while (end > 1 && path[end - 1] === "/") end -= 1;
  return path.slice(0, end);
}

function isUppercaseStart(value: string): boolean {
  const first = value.codePointAt(0);
  if (first === undefined) return false;
  return String.fromCodePoint(first).toUpperCase() === String.fromCodePoint(first)
    && String.fromCodePoint(first).toLowerCase() !== String.fromCodePoint(first);
}
