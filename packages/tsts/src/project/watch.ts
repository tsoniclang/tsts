export type WatchKind = number;
export const WatchKind = {
  Create: 1,
  Change: 2,
  Delete: 4,
} as const;

export const minWatchLocationDepth = 2;

export type WatcherID = string;

export interface RelativePattern {
  readonly baseUri: string;
  readonly pattern: string;
}

export interface FileSystemWatcher {
  readonly pattern?: string;
  readonly relativePattern?: RelativePattern;
  readonly kind: WatchKind;
}

interface FileSystemWatcherKey {
  readonly pattern: string;
  readonly kind: WatchKind;
}

interface FileSystemWatcherValue {
  count: number;
  readonly id: WatcherID;
}

export class WatchRegistry {
  private readonly entries = new Map<string, FileSystemWatcherValue>();
  private readonly pending = new Set<WatcherID>();

  acquire(watcher: FileSystemWatcher, id: WatcherID): boolean {
    const key = stringifyWatcherKey(toFileSystemWatcherKey(watcher));
    let value = this.entries.get(key);
    if (value === undefined) {
      value = { count: 0, id };
      this.entries.set(key, value);
    }
    value.count += 1;
    return value.count === 1;
  }

  release(watcher: FileSystemWatcher): readonly [WatcherID, boolean] {
    const key = stringifyWatcherKey(toFileSystemWatcherKey(watcher));
    const value = this.entries.get(key);
    if (value === undefined) return ["", false];
    if (value.count <= 1) {
      this.entries.delete(key);
      return [value.id, true];
    }
    value.count -= 1;
    return ["", false];
  }

  markPending(id: WatcherID): void {
    this.pending.add(id);
  }

  clearPending(id: WatcherID): void {
    this.pending.delete(id);
  }

  isPending(id: WatcherID): boolean {
    return this.pending.has(id);
  }

  size(): number {
    return this.entries.size;
  }
}

export interface PatternsAndIgnored {
  readonly directoriesOutsideWorkspace?: readonly string[];
  readonly patternsInsideWorkspace?: readonly string[];
  readonly ignored?: ReadonlySet<string> | ReadonlyMap<string, unknown> | readonly string[];
}

export interface Watchers {
  readonly watcherID: WatcherID;
  readonly workspaceWatchers: readonly FileSystemWatcher[];
  readonly outsideWorkspaceWatchers: readonly FileSystemWatcher[];
  readonly ignoredPaths: ReadonlySet<string>;
}

export class WatchedFiles<TInput> {
  private input: TInput | undefined;
  private workspaceWatchersValue: readonly FileSystemWatcher[] | undefined;
  private outsideWorkspaceWatchersValue: readonly FileSystemWatcher[] | undefined;
  private ignoredValue: ReadonlySet<string> = new Set();
  private id: number;

  constructor(
    private readonly nameValue: string,
    private readonly watchKindValue: WatchKind,
    private readonly hasRelativePatternCapability: boolean,
    private readonly computeGlobPatterns: (input: TInput | undefined) => PatternsAndIgnored,
  ) {
    this.id = nextWatcherID();
  }

  watchers(): Watchers {
    if (this.workspaceWatchersValue === undefined || this.outsideWorkspaceWatchersValue === undefined) {
      this.computeWatchers();
    }
    return {
      watcherID: `${this.nameValue} watcher ${this.id}`,
      workspaceWatchers: this.workspaceWatchersValue ?? [],
      outsideWorkspaceWatchers: this.outsideWorkspaceWatchersValue ?? [],
      ignoredPaths: new Set(this.ignoredValue),
    };
  }

  idString(): WatcherID {
    return this.watchers().watcherID;
  }

  name(): string {
    return this.nameValue;
  }

  watchKind(): WatchKind {
    return this.watchKindValue;
  }

  clone(input: TInput): WatchedFiles<TInput> {
    const clone = new WatchedFiles(this.nameValue, this.watchKindValue, this.hasRelativePatternCapability, this.computeGlobPatterns);
    clone.input = input;
    clone.workspaceWatchersValue = this.workspaceWatchersValue;
    clone.outsideWorkspaceWatchersValue = this.outsideWorkspaceWatchersValue;
    clone.ignoredValue = new Set(this.ignoredValue);
    clone.id = this.id;
    return clone;
  }

  private computeWatchers(): void {
    const result = this.computeGlobPatterns(this.input);
    const globs = compactSorted(result.patternsInsideWorkspace ?? []);
    const workspaceWatchers = globs.map((glob): FileSystemWatcher => ({
      pattern: glob,
      kind: this.watchKindValue,
    }));

    const outsideDirectories = compactSorted(result.directoriesOutsideWorkspace ?? []);
    const outsideWatchers = outsideDirectories.map((directory) => newRecursiveDirectoryWatcher(directory, this.watchKindValue, this.hasRelativePatternCapability));
    const changed = !watcherArraysEqual(this.workspaceWatchersValue ?? [], workspaceWatchers) ||
      !watcherArraysEqual(this.outsideWorkspaceWatchersValue ?? [], outsideWatchers);
    this.workspaceWatchersValue = workspaceWatchers;
    this.outsideWorkspaceWatchersValue = outsideWatchers;
    this.ignoredValue = normalizeIgnored(result.ignored);
    if (changed) this.id = nextWatcherID();
  }
}

let watcherIDCounter = 0;

export function newWatchedFiles<TInput>(
  name: string,
  watchKind: WatchKind,
  hasRelativePatternCapability: boolean,
  computeGlobPatterns: (input: TInput | undefined) => PatternsAndIgnored,
): WatchedFiles<TInput> {
  return new WatchedFiles(name, watchKind, hasRelativePatternCapability, computeGlobPatterns);
}

export function toFileSystemWatcherKey(watcher: FileSystemWatcher): FileSystemWatcherKey {
  return {
    pattern: fileSystemWatcherGlobString(watcher),
    kind: watcher.kind ?? (WatchKind.Create | WatchKind.Change | WatchKind.Delete),
  };
}

export function fileSystemWatcherGlobString(watcher: FileSystemWatcher): string {
  if (watcher.pattern !== undefined) return watcher.pattern;
  if (watcher.relativePattern !== undefined) return `${watcher.relativePattern.baseUri}/${watcher.relativePattern.pattern}`;
  return "";
}

export function createResolutionLookupGlobMapper(
  workspaceDirectory: string,
  libDirectory: string,
  currentDirectory: string,
  useCaseSensitiveFileNames: boolean,
): (data: ReadonlySet<string> | undefined) => PatternsAndIgnored {
  const workspaceDirectoryPath = toPath(workspaceDirectory, currentDirectory, useCaseSensitiveFileNames);
  const currentDirectoryPath = toPath(currentDirectory, currentDirectory, useCaseSensitiveFileNames);
  const libDirectoryPath = toPath(libDirectory, currentDirectory, useCaseSensitiveFileNames);

  return (data) => {
    const seenDirs = new Set<string>();
    let includeWorkspace = false;
    let includeRoot = false;
    let includeLib = false;
    const nodeModulesDirectories = new Set<string>();
    const externalDirectories = new Set<string>();

    for (const path of data ?? []) {
      if (isDynamicFileName(path)) continue;
      const directory = getDirectoryPath(path);
      if (seenDirs.has(directory)) continue;
      seenDirs.add(directory);

      if (containsPath(workspaceDirectoryPath, path, useCaseSensitiveFileNames)) includeWorkspace = true;
      else if (containsPath(currentDirectoryPath, path, useCaseSensitiveFileNames)) includeRoot = true;
      else if (containsPath(libDirectoryPath, path, useCaseSensitiveFileNames)) includeLib = true;
      else {
        const nodeModulesIndex = path.indexOf("/node_modules/");
        if (nodeModulesIndex !== -1) nodeModulesDirectories.add(path.slice(0, nodeModulesIndex + "/node_modules".length));
        else externalDirectories.add(directory);
      }
    }

    const globs: string[] = [];
    if (includeWorkspace) globs.push(getRecursiveGlobPattern(workspaceDirectoryPath));
    if (includeRoot) globs.push(getRecursiveGlobPattern(currentDirectoryPath));
    if (includeLib) globs.push(getRecursiveGlobPattern(libDirectoryPath));
    for (const directory of [...nodeModulesDirectories].sort()) globs.push(getRecursiveGlobPattern(directory));

    let outsideDirectories: readonly string[] = [];
    let ignored: ReadonlySet<string> | undefined;
    if (externalDirectories.size > 0) {
      const parents = getCommonParents([...externalDirectories], minWatchLocationDepth, getPathComponentsForWatching, { currentDirectory, useCaseSensitiveFileNames: true });
      outsideDirectories = parents.parents;
      ignored = parents.ignored;
    }

    return {
      directoriesOutsideWorkspace: outsideDirectories,
      patternsInsideWorkspace: globs,
      ...(ignored === undefined ? {} : { ignored }),
    };
  };
}

export function getTypingsLocationsGlobs(
  typingsFiles: readonly string[],
  typingsLocation: string,
  workspaceDirectory: string,
  currentDirectory: string,
  useCaseSensitiveFileNames: boolean,
): PatternsAndIgnored {
  let includeTypingsLocation = false;
  let includeWorkspace = false;
  const externalDirectories = new Set<string>();
  const globs = new Map<string, string>();

  for (const file of typingsFiles) {
    if (containsPath(typingsLocation, file, useCaseSensitiveFileNames)) includeTypingsLocation = true;
    else if (!containsPath(workspaceDirectory, file, useCaseSensitiveFileNames)) externalDirectories.add(getDirectoryPath(file));
    else includeWorkspace = true;
  }
  const parents = getCommonParents([...externalDirectories], minWatchLocationDepth, getPathComponentsForWatching, { currentDirectory, useCaseSensitiveFileNames });
  if (includeWorkspace) globs.set(toPath(workspaceDirectory, currentDirectory, useCaseSensitiveFileNames), getRecursiveGlobPattern(workspaceDirectory));
  if (includeTypingsLocation) globs.set(toPath(typingsLocation, currentDirectory, useCaseSensitiveFileNames), getRecursiveGlobPattern(typingsLocation));

  return {
    directoriesOutsideWorkspace: parents.parents,
    patternsInsideWorkspace: [...globs.values()],
    ignored: parents.ignored,
  };
}

export function getPathComponentsForWatching(path: string, currentDirectory = "/"): readonly string[] {
  const components = getPathComponents(path, currentDirectory);
  const rootLength = perceivedOsRootLengthForWatching(components);
  if (rootLength <= 1) return components;
  const newRoot = combinePaths(components[0]!, ...components.slice(1, rootLength));
  return [newRoot, ...components.slice(rootLength)];
}

export function perceivedOsRootLengthForWatching(pathComponents: readonly string[]): number {
  const length = pathComponents.length;
  if (length <= 1) return length;
  if (pathComponents[0]!.startsWith("//")) return 2;
  if (pathComponents[0]!.length === 3 && isVolumeCharacter(pathComponents[0]!.charCodeAt(0)) && pathComponents[0]![1] === ":" && pathComponents[0]![2] === "/") {
    if (pathComponents[1]?.toLowerCase() === "users") return Math.min(3, length);
    return 1;
  }
  if (pathComponents[1] === "home") return Math.min(3, length);
  return 1;
}

export function getRecursiveGlobPattern(directory: string): string {
  return `${removeTrailingDirectorySeparator(directory)}/**/*`;
}

export function recursiveDirectoryGlobPattern(directory: string, useRelativePattern: boolean): string {
  return useRelativePattern ? `${fileNameToDocumentURI(directory)}/**/*` : getRecursiveGlobPattern(directory);
}

export function newRecursiveDirectoryWatcher(directory: string, kind: WatchKind, useRelativePattern: boolean): FileSystemWatcher {
  if (useRelativePattern) {
    return {
      relativePattern: {
        baseUri: fileNameToDocumentURI(directory),
        pattern: "**/*",
      },
      kind,
    };
  }
  return {
    pattern: getRecursiveGlobPattern(directory),
    kind,
  };
}

function nextWatcherID(): number {
  watcherIDCounter += 1;
  return watcherIDCounter;
}

function stringifyWatcherKey(key: FileSystemWatcherKey): string {
  return `${key.kind}\u0000${key.pattern}`;
}

function watcherArraysEqual(left: readonly FileSystemWatcher[], right: readonly FileSystemWatcher[]): boolean {
  if (left.length !== right.length) return false;
  for (let index = 0; index < left.length; index++) {
    if (fileSystemWatcherGlobString(left[index]!) !== fileSystemWatcherGlobString(right[index]!)) return false;
    if (left[index]!.kind !== right[index]!.kind) return false;
  }
  return true;
}

function normalizeIgnored(ignored: PatternsAndIgnored["ignored"]): ReadonlySet<string> {
  if (ignored === undefined) return new Set();
  if (Array.isArray(ignored)) return new Set(ignored);
  if (ignored instanceof Set) return new Set(ignored);
  return new Set([...((ignored as ReadonlyMap<string, unknown>).keys())]);
}

function compactSorted(values: readonly string[]): readonly string[] {
  const sorted = [...new Set(values)].sort();
  return sorted;
}

interface ComparePathsOptions {
  readonly currentDirectory?: string;
  readonly useCaseSensitiveFileNames: boolean;
}

function getCommonParents(
  directories: readonly string[],
  minDepth: number,
  getComponents: (path: string, currentDirectory?: string) => readonly string[],
  options: ComparePathsOptions,
): { readonly parents: readonly string[]; readonly ignored: ReadonlySet<string> } {
  const sorted = compactSorted(directories.map((directory) => normalizePath(directory, options.useCaseSensitiveFileNames)));
  const parents: string[] = [];
  const ignored = new Set<string>();

  for (const directory of sorted) {
    if (parents.some((parent) => containsPath(parent, directory, options.useCaseSensitiveFileNames))) {
      ignored.add(directory);
      continue;
    }
    const components = getComponents(directory, options.currentDirectory ?? "/");
    if (components.length <= minDepth) {
      parents.push(directory);
      continue;
    }
    parents.push(combinePaths(...components.slice(0, Math.max(minDepth, components.length - 1))));
  }
  return { parents: compactSorted(parents), ignored };
}

function toPath(fileName: string, currentDirectory: string, useCaseSensitiveFileNames: boolean): string {
  const absolute = fileName.startsWith("/") || /^[A-Za-z]:[\\/]/.test(fileName)
    ? fileName
    : combinePaths(currentDirectory, fileName);
  return normalizePath(absolute, useCaseSensitiveFileNames);
}

function containsPath(parent: string, child: string, useCaseSensitiveFileNames: boolean): boolean {
  const normalizedParent = ensureTrailingDirectorySeparator(normalizePath(parent, useCaseSensitiveFileNames));
  const normalizedChild = ensureTrailingDirectorySeparator(normalizePath(child, useCaseSensitiveFileNames));
  return normalizedChild === normalizedParent || normalizedChild.startsWith(normalizedParent);
}

function getPathComponents(path: string, currentDirectory: string): readonly string[] {
  const normalized = toPath(path, currentDirectory, true);
  if (normalized.startsWith("//")) {
    const parts = normalized.split("/").filter(part => part !== "");
    return [`//${parts[0]}/${parts[1]}/`, ...parts.slice(2)];
  }
  const volume = /^[A-Za-z]:\//.exec(normalized)?.[0];
  if (volume !== undefined) return [volume, ...normalized.slice(volume.length).split("/").filter(part => part !== "")];
  return ["/", ...normalized.split("/").filter(part => part !== "")];
}

function combinePaths(...parts: readonly string[]): string {
  return normalizePath(parts.join("/"), true);
}

function normalizePath(path: string, useCaseSensitiveFileNames = true): string {
  const startsWithSlash = path.startsWith("/");
  const volumeMatch = /^[A-Za-z]:[\\/]/.exec(path);
  const prefix = volumeMatch?.[0].replace("\\", "/") ?? (startsWithSlash ? "/" : "");
  const rest = path.slice(prefix.length).replaceAll("\\", "/");
  const parts: string[] = [];
  for (const part of rest.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  const normalized = `${prefix}${parts.join("/")}`;
  return useCaseSensitiveFileNames ? normalized : normalized.toLowerCase();
}

function getDirectoryPath(path: string): string {
  const normalized = normalizePath(path);
  const index = normalized.lastIndexOf("/");
  return index <= 0 ? "/" : normalized.slice(0, index);
}

function removeTrailingDirectorySeparator(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

function ensureTrailingDirectorySeparator(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function isVolumeCharacter(ch: number): boolean {
  return (ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122);
}

function isDynamicFileName(fileName: string): boolean {
  return fileName.startsWith("^/") || fileName.startsWith("untitled:");
}

function fileNameToDocumentURI(fileName: string): string {
  return `file://${encodeURI(fileName)}`;
}
