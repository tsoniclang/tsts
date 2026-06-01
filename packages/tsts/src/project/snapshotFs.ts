import { MemoryFS } from "../vfs/memory.js";
import type { Entries, FS } from "../vfs/vfs.js";
import type { FileChangeSummary } from "./fileChange.js";

export interface FileContent {
  content(): string;
  hash(): string;
}

export interface FileHandle extends FileContent {
  readonly fileName: string;
  readonly version: number;
  lineMap(): readonly number[];
  matchesDiskText(): boolean;
  isOverlay(): boolean;
  kind(): string;
}

class TextFileHandle implements FileHandle {
  readonly fileName: string;
  readonly version: number;
  private readonly text: string;
  private readonly overlay: boolean;
  private readonly diskMatch: boolean;
  private cachedLineMap: readonly number[] | undefined;
  private cachedHash: string | undefined;

  constructor(fileName: string, text: string, version: number, overlay: boolean, diskMatch: boolean) {
    this.fileName = fileName;
    this.text = text;
    this.version = version;
    this.overlay = overlay;
    this.diskMatch = diskMatch;
  }

  content(): string {
    return this.text;
  }

  hash(): string {
    this.cachedHash ??= hashString(this.text);
    return this.cachedHash;
  }

  lineMap(): readonly number[] {
    if (this.cachedLineMap !== undefined) return this.cachedLineMap;
    const starts = [0];
    for (let index = 0; index < this.text.length; index += 1) {
      const ch = this.text.charCodeAt(index);
      if (ch === 13) {
        if (this.text.charCodeAt(index + 1) === 10) index += 1;
        starts.push(index + 1);
      } else if (ch === 10) {
        starts.push(index + 1);
      }
    }
    this.cachedLineMap = starts;
    return starts;
  }

  matchesDiskText(): boolean {
    return this.diskMatch;
  }

  isOverlay(): boolean {
    return this.overlay;
  }

  kind(): string {
    const extension = extensionOf(this.fileName);
    switch (extension) {
      case ".js":
      case ".jsx":
      case ".mjs":
      case ".cjs":
      case ".json":
      case ".ts":
      case ".tsx":
      case ".mts":
      case ".cts":
        return extension.slice(1);
      default:
        return "unknown";
    }
  }

  clone(): TextFileHandle {
    return new TextFileHandle(this.fileName, this.text, this.version, this.overlay, this.diskMatch);
  }
}

class DiskFile extends TextFileHandle {
  realpathPath = "";
  private needsReloadValue = false;

  constructor(fileName: string, text: string, realpathPath = "") {
    super(fileName, text, 0, false, true);
    this.realpathPath = realpathPath;
  }

  markNeedsReload(): void {
    this.needsReloadValue = true;
  }

  clearNeedsReload(): void {
    this.needsReloadValue = false;
  }

  needsReload(): boolean {
    return this.needsReloadValue;
  }

  override matchesDiskText(): boolean {
    return !this.needsReloadValue;
  }

  override clone(): DiskFile {
    const file = new DiskFile(this.fileName, this.content(), this.realpathPath);
    if (this.needsReloadValue) file.markNeedsReload();
    return file;
  }
}

class OverlayFile extends TextFileHandle {
  constructor(fileName: string, text: string, version: number, matchesDiskText: boolean) {
    super(fileName, text, version, true, matchesDiskText);
  }

  override clone(): OverlayFile {
    return new OverlayFile(this.fileName, this.content(), this.version, this.matchesDiskText());
  }
}

export class RealpathAliasSet {
  private readonly aliases = new Set<string>();

  add(path: string): void {
    this.aliases.add(normalize(path));
  }

  delete(path: string): void {
    this.aliases.delete(normalize(path));
  }

  paths(): readonly string[] {
    return [...this.aliases].sort();
  }

  size(): number {
    return this.aliases.size;
  }

  clone(): RealpathAliasSet {
    const clone = new RealpathAliasSet();
    for (const alias of this.aliases) clone.add(alias);
    return clone;
  }
}

export interface FileSource {
  hostFs(): FS;
  getFile(fileName: string): FileHandle | undefined;
  getFileByPath(fileName: string, path: string): FileHandle | undefined;
  fileExistsByPath(fileName: string, path: string): boolean;
  getAccessibleEntries(path: string): Entries;
}

export class SnapshotFS implements FileSource {
  private readonly baseFs: FS;
  private readonly files = new Map<string, TextFileHandle>();
  private readonly closedFiles = new Set<string>();
  private readonly overlayDirectories = new Map<string, Map<string, string>>();
  private readonly diskFiles = new Map<string, DiskFile>();
  private readonly diskDirectories = new Map<string, Map<string, string>>();
  private readonly readFiles = new Map<string, FileHandle | undefined>();
  private readonly nodeModulesRealpathAliases = new Map<string, RealpathAliasSet>();

  constructor(files?: Iterable<readonly [string, string]>, baseFs: FS = new MemoryFS()) {
    this.baseFs = baseFs;
    if (files !== undefined) {
      for (const [fileName, content] of files) this.addDiskFile(fileName, content);
    }
  }

  hostFs(): FS {
    return this.baseFs;
  }

  openFile(fileName: string, content: string, version = 0): void {
    const path = normalize(fileName);
    const matchesDiskText = this.baseFs.readFile(fileName) === content;
    this.files.set(path, new OverlayFile(fileName, content, version, matchesDiskText));
    this.closedFiles.delete(path);
    addFileToDirectories(this.overlayDirectories, path, fileName);
  }

  closeFile(fileName: string): void {
    const path = normalize(fileName);
    this.closedFiles.add(path);
    this.files.delete(path);
    removeFileFromDirectories(this.overlayDirectories, path);
  }

  addDiskFile(fileName: string, content: string): void {
    const path = normalize(fileName);
    const file = new DiskFile(fileName, content, realpath(this.baseFs, fileName));
    this.diskFiles.set(path, file);
    this.readFiles.set(path, file);
    addFileToDirectories(this.diskDirectories, path, fileName);
  }

  openFiles(): readonly string[] {
    const out: string[] = [];
    for (const [path, handle] of this.files) {
      if (!this.closedFiles.has(path)) out.push(handle.fileName);
    }
    return out.sort();
  }

  getFile(fileName: string): FileHandle | undefined {
    return this.getFileByPath(fileName, normalize(fileName));
  }

  getFileByPath(fileName: string, path: string): FileHandle | undefined {
    const normalized = normalize(path);
    const overlay = this.files.get(normalized);
    if (overlay !== undefined) return overlay;
    const disk = this.diskFiles.get(normalized);
    if (disk !== undefined) return this.reloadDiskFileIfNeeded(normalized, disk);
    if (this.readFiles.has(normalized)) return this.readFiles.get(normalized);
    const content = this.baseFs.readFile(fileName);
    if (content === undefined) {
      this.readFiles.set(normalized, undefined);
      return undefined;
    }
    const loaded = new DiskFile(fileName, content, realpath(this.baseFs, fileName));
    this.diskFiles.set(normalized, loaded);
    this.readFiles.set(normalized, loaded);
    addFileToDirectories(this.diskDirectories, normalized, fileName);
    this.recordRealpathAlias(loaded, fileName, normalized);
    return loaded;
  }

  readFile(fileName: string): string | undefined {
    return this.getFile(fileName)?.content();
  }

  fileExists(fileName: string): boolean {
    return this.fileExistsByPath(fileName, normalize(fileName));
  }

  fileExistsByPath(fileName: string, path: string): boolean {
    const normalized = normalize(path);
    if (this.files.has(normalized) || this.diskFiles.has(normalized)) return true;
    return this.baseFs.fileExists(fileName);
  }

  directoryExists(path: string): boolean {
    const normalized = normalize(path);
    return this.overlayDirectories.has(normalized)
      || this.diskDirectories.has(normalized)
      || this.baseFs.directoryExists(path);
  }

  getDirectories(path: string): readonly string[] {
    const names = new Set<string>();
    for (const directory of [this.diskDirectories.get(normalize(path)), this.overlayDirectories.get(normalize(path))]) {
      if (directory === undefined) continue;
      for (const child of directory.values()) names.add(child);
    }
    for (const directory of this.baseFs.getAccessibleEntries(path).directories) names.add(directory);
    return [...names].sort();
  }

  getAccessibleEntries(path: string): Entries {
    const entries = this.baseFs.getAccessibleEntries(path);
    const files = new Set(entries.files);
    const directories = new Set(entries.directories);
    readDirectoryIntoEntries(this.diskDirectories.get(normalize(path)), files, directories, path => this.isFile(path));
    readDirectoryIntoEntries(this.overlayDirectories.get(normalize(path)), files, directories, path => this.isFile(path));
    return entries.symlinks === undefined
      ? { files: [...files].sort(), directories: [...directories].sort() }
      : { files: [...files].sort(), directories: [...directories].sort(), symlinks: entries.symlinks };
  }

  readDirectory(currentDir: string, path: string, extensions: readonly string[], excludes: readonly string[], includes: readonly string[], depth = Number.POSITIVE_INFINITY): readonly string[] {
    const root = resolve(currentDir, path);
    const prefix = ensureTrailingSlash(root);
    const excludeMatchers = excludes.map(globToRegExp);
    const includeMatchers = includes.map(globToRegExp);
    const out: string[] = [];
    for (const fileName of this.allKnownFilePaths()) {
      if (!fileName.startsWith(prefix)) continue;
      const relative = fileName.slice(prefix.length);
      if (relative.split("/").length - 1 > depth) continue;
      if (extensions.length > 0 && !extensions.some(ext => fileName.endsWith(ext))) continue;
      if (excludeMatchers.some(rx => rx.test(relative))) continue;
      if (includeMatchers.length > 0 && !includeMatchers.some(rx => rx.test(relative))) continue;
      out.push(fileName);
    }
    return out.sort();
  }

  isOpenFile(fileName: string): boolean {
    return this.files.has(normalize(fileName));
  }

  isFile(path: string): boolean {
    const normalized = normalize(path);
    return this.files.has(normalized) || this.diskFiles.has(normalized) || this.baseFs.fileExists(normalized);
  }

  createBuilder(overlays?: Iterable<readonly [string, string, number]>): SnapshotFSBuilder {
    return new SnapshotFSBuilder(this, overlays);
  }

  expandRealpathAliases(change: FileChangeSummary): FileChangeSummary {
    if (this.nodeModulesRealpathAliases.size === 0) return change;
    addAliases(change.changed, this.nodeModulesRealpathAliases);
    addAliases(change.deleted, this.nodeModulesRealpathAliases);
    return change;
  }

  clone(): SnapshotFS {
    const clone = new SnapshotFS(undefined, this.baseFs);
    for (const [fileName, handle] of this.files) clone.files.set(fileName, handle.clone());
    for (const [fileName, handle] of this.diskFiles) clone.diskFiles.set(fileName, handle.clone());
    for (const [fileName, handle] of this.readFiles) clone.readFiles.set(fileName, handle?.isOverlay() === true ? handle : handle);
    for (const fileName of this.closedFiles) clone.closedFiles.add(fileName);
    cloneDirectoryMap(this.overlayDirectories, clone.overlayDirectories);
    cloneDirectoryMap(this.diskDirectories, clone.diskDirectories);
    for (const [path, aliases] of this.nodeModulesRealpathAliases) clone.nodeModulesRealpathAliases.set(path, aliases.clone());
    return clone;
  }

  private reloadDiskFileIfNeeded(path: string, file: DiskFile): FileHandle | undefined {
    if (!file.needsReload()) return file;
    const content = this.baseFs.readFile(file.fileName);
    if (content === undefined) {
      this.diskFiles.delete(path);
      this.readFiles.set(path, undefined);
      removeFileFromDirectories(this.diskDirectories, path);
      return undefined;
    }
    const loaded = new DiskFile(file.fileName, content, file.realpathPath);
    this.diskFiles.set(path, loaded);
    this.readFiles.set(path, loaded);
    return loaded;
  }

  private recordRealpathAlias(file: DiskFile, fileName: string, path: string): void {
    if (!normalize(path).includes("/node_modules/")) return;
    const realpathPath = normalize(realpath(this.baseFs, fileName));
    if (realpathPath === normalize(path)) return;
    file.realpathPath = realpathPath;
    let aliases = this.nodeModulesRealpathAliases.get(realpathPath);
    if (aliases === undefined) {
      aliases = new RealpathAliasSet();
      this.nodeModulesRealpathAliases.set(realpathPath, aliases);
    }
    aliases.add(path);
  }

  private allKnownFilePaths(): readonly string[] {
    const files = new Set<string>();
    for (const fileName of this.diskFiles.keys()) files.add(fileName);
    for (const fileName of this.files.keys()) files.add(fileName);
    this.baseFs.walkDir("/", (fileName, entry) => {
      if (entry.isFile) files.add(normalize(fileName));
    });
    return [...files];
  }
}

export class SnapshotFSBuilder implements FileSource {
  private readonly base: SnapshotFS;
  private readonly overlays = new Map<string, OverlayFile>();
  private readonly deletedPaths = new Set<string>();

  constructor(base: SnapshotFS, overlays?: Iterable<readonly [string, string, number]>) {
    this.base = base.clone();
    if (overlays !== undefined) {
      for (const [fileName, content, version] of overlays) this.openFile(fileName, content, version);
    }
  }

  hostFs(): FS {
    return this.base.hostFs();
  }

  openFile(fileName: string, content: string, version = 0): void {
    const path = normalize(fileName);
    const matchesDiskText = this.hostFs().readFile(fileName) === content;
    this.overlays.set(path, new OverlayFile(fileName, content, version, matchesDiskText));
    this.deletedPaths.delete(path);
  }

  closeFile(fileName: string): void {
    const path = normalize(fileName);
    this.overlays.delete(path);
    this.deletedPaths.add(path);
  }

  getFile(fileName: string): FileHandle | undefined {
    return this.getFileByPath(fileName, normalize(fileName));
  }

  getFileByPath(fileName: string, path: string): FileHandle | undefined {
    const normalized = normalize(path);
    if (this.deletedPaths.has(normalized)) return undefined;
    const overlay = this.overlays.get(normalized);
    return overlay ?? this.base.getFileByPath(fileName, normalized);
  }

  fileExistsByPath(fileName: string, path: string): boolean {
    const normalized = normalize(path);
    if (this.deletedPaths.has(normalized)) return false;
    return this.overlays.has(normalized) || this.base.fileExistsByPath(fileName, normalized);
  }

  getAccessibleEntries(path: string): Entries {
    const snapshot = this.finalize()[0];
    return snapshot.getAccessibleEntries(path);
  }

  watchChangesOverlapCache(change: FileChangeSummary): boolean {
    for (const fileName of change.changed) {
      if (this.base.getFile(fileName) !== undefined) return true;
    }
    for (const fileName of change.deleted) {
      if (this.base.getFile(fileName) !== undefined) return true;
    }
    return false;
  }

  invalidateCache(): void {
    for (const path of this.base.openFiles()) {
      this.base.getFile(path);
    }
  }

  markDirtyFiles(change: FileChangeSummary): void {
    for (const fileName of change.changed) {
      const file = this.base.getFile(fileName);
      if (file instanceof DiskFile) file.markNeedsReload();
    }
    for (const fileName of change.deleted) this.closeFile(fileName);
  }

  expandAndFilterWatchEvents(change: FileChangeSummary): FileChangeSummary {
    filterRelevantFileSet(change.changed, fileName => this.isRelevantFileName(fileName));
    filterRelevantFileSet(change.deleted, fileName => this.isRelevantFileName(fileName));
    return change;
  }

  convertOpenAndCloseToChanges(change: FileChangeSummary): FileChangeSummary {
    if (change.opened !== undefined && !isDynamicFileName(change.opened)) {
      const opened = this.getFile(change.opened);
      if (opened === undefined) change.created.add(change.opened);
      else if (opened.isOverlay() && !opened.matchesDiskText()) change.changed.add(change.opened);
    }
    for (const fileName of change.closed) {
      if (isDynamicFileName(fileName)) continue;
      const file = this.base.getFile(fileName);
      if (file === undefined) change.deleted.add(fileName);
      else if (!file.matchesDiskText()) change.changed.add(fileName);
    }
    return change;
  }

  finalize(): readonly [SnapshotFS, boolean] {
    const snapshot = this.base.clone();
    let changed = false;
    for (const path of this.deletedPaths) {
      snapshot.closeFile(path);
      changed = true;
    }
    for (const overlay of this.overlays.values()) {
      snapshot.openFile(overlay.fileName, overlay.content(), overlay.version);
      changed = true;
    }
    return [snapshot, changed];
  }

  private isRelevantFileName(fileName: string): boolean {
    if (isDynamicFileName(fileName)) return true;
    if (this.overlays.has(normalize(fileName))) return true;
    switch (extensionOf(fileName)) {
      case ".js":
      case ".jsx":
      case ".mjs":
      case ".cjs":
      case ".ts":
      case ".tsx":
      case ".mts":
      case ".cts":
      case ".json":
        return true;
      default:
        return false;
    }
  }
}

export class SourceFS implements FS {
  private trackingValue: boolean;
  private readonly seenFiles = new Set<string>();
  private readonly missingDirectories = new Set<string>();
  private readonly source: FileSource;

  constructor(tracking: boolean, source: FileSource) {
    this.trackingValue = tracking;
    this.source = source;
  }

  disableTracking(): void {
    this.trackingValue = false;
  }

  track(fileName: string): void {
    if (this.trackingValue) this.seenFiles.add(normalize(fileName));
  }

  seenFile(path: string): boolean {
    return this.seenFiles.has(normalize(path));
  }

  seenFileOrMissingParentDirectory(path: string): boolean {
    let current = normalize(path);
    if (this.seenFiles.has(current)) return true;
    while (true) {
      if (this.missingDirectories.has(current)) return true;
      const parent = dirname(current);
      if (parent === current) return false;
      current = parent;
    }
  }

  useCaseSensitiveFileNames(): boolean {
    return this.source.hostFs().useCaseSensitiveFileNames();
  }

  fileExists(path: string): boolean {
    this.track(path);
    return this.source.fileExistsByPath(path, normalize(path));
  }

  readFile(path: string): string | undefined {
    return this.source.getFile(path)?.content();
  }

  writeFile(path: string, data: string): void {
    this.source.hostFs().writeFile(path, data);
  }

  appendFile(path: string, data: string): void {
    this.source.hostFs().appendFile(path, data);
  }

  remove(path: string): void {
    this.source.hostFs().remove(path);
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    this.source.hostFs().chtimes(path, accessTime, modifyTime);
  }

  directoryExists(path: string): boolean {
    const exists = this.source.hostFs().directoryExists(path);
    if (!exists && this.trackingValue) this.missingDirectories.add(normalize(path));
    return exists;
  }

  getAccessibleEntries(path: string): Entries {
    return this.source.getAccessibleEntries(path);
  }

  stat(path: string) {
    return this.source.hostFs().stat(path);
  }

  walkDir(root: string, walkFn: Parameters<FS["walkDir"]>[1]): void {
    this.source.hostFs().walkDir(root, walkFn);
  }

  realpath(path: string): string {
    return this.source.hostFs().realpath(path);
  }
}

export function newSourceFS(tracking: boolean, source: FileSource): SourceFS {
  return new SourceFS(tracking, source);
}

function readDirectoryIntoEntries(directory: Map<string, string> | undefined, files: Set<string>, directories: Set<string>, isFile: (path: string) => boolean): void {
  if (directory === undefined) return;
  for (const [childPath, baseName] of directory) {
    if (isFile(childPath)) files.add(baseName);
    else directories.add(baseName);
  }
}

function addAliases(files: Set<string>, aliasesByRealpath: ReadonlyMap<string, RealpathAliasSet>): void {
  const additional: string[] = [];
  for (const fileName of files) {
    const aliases = aliasesByRealpath.get(normalize(fileName));
    if (aliases !== undefined) additional.push(...aliases.paths());
  }
  for (const fileName of additional) files.add(fileName);
}

function filterRelevantFileSet(files: Set<string>, isRelevant: (fileName: string) => boolean): void {
  for (const fileName of [...files]) {
    if (!isRelevant(fileName)) files.delete(fileName);
  }
}

function addFileToDirectories(directories: Map<string, Map<string, string>>, path: string, fileName: string): void {
  let childPath = normalize(path);
  let child = normalize(fileName);
  while (true) {
    const parentPath = dirname(childPath);
    const parent = dirname(child);
    if (childPath === parentPath) break;
    let directory = directories.get(parentPath);
    if (directory === undefined) {
      directory = new Map();
      directories.set(parentPath, directory);
    }
    directory.set(childPath, basename(child));
    childPath = parentPath;
    child = parent;
  }
}

function removeFileFromDirectories(directories: Map<string, Map<string, string>>, path: string): void {
  let childPath = normalize(path);
  while (true) {
    const parentPath = dirname(childPath);
    if (childPath === parentPath) break;
    const directory = directories.get(parentPath);
    if (directory === undefined) break;
    directory.delete(childPath);
    if (directory.size !== 0) break;
    directories.delete(parentPath);
    childPath = parentPath;
  }
}

function cloneDirectoryMap(source: ReadonlyMap<string, ReadonlyMap<string, string>>, target: Map<string, Map<string, string>>): void {
  for (const [path, entries] of source) target.set(path, new Map(entries));
}

function normalize(path: string): string {
  const parts: string[] = [];
  const replaced = path.replaceAll("\\", "/");
  for (const part of replaced.split("/")) {
    if (part.length === 0 || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }
  return replaced.startsWith("/") ? `/${parts.join("/")}` : parts.join("/");
}

function resolve(currentDir: string, path: string): string {
  return normalize(path.startsWith("/") ? path : `${currentDir}/${path}`);
}

function ensureTrailingSlash(path: string): string {
  return path.endsWith("/") ? path : `${path}/`;
}

function dirname(path: string): string {
  const normalized = normalize(path);
  const index = normalized.lastIndexOf("/");
  if (index <= 0) return normalized.startsWith("/") ? "/" : "";
  return normalized.slice(0, index);
}

function basename(path: string): string {
  const normalized = normalize(path);
  const index = normalized.lastIndexOf("/");
  return index === -1 ? normalized : normalized.slice(index + 1);
}

function extensionOf(path: string): string {
  const base = basename(path);
  const index = base.lastIndexOf(".");
  return index === -1 ? "" : base.slice(index);
}

function realpath(fs: FS, fileName: string): string {
  try {
    return fs.realpath(fileName);
  } catch {
    return fileName;
  }
}

function isDynamicFileName(fileName: string): boolean {
  return fileName.startsWith("untitled:") || fileName.startsWith("^/");
}

function globToRegExp(pattern: string): RegExp {
  const escaped = pattern.replace(/[\\^$+?.()|[\]{}]/g, "\\$&")
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*");
  return new RegExp(`^${escaped}$`);
}

function hashString(text: string): string {
  let hash = 0xcbf29ce484222325n;
  const prime = 0x100000001b3n;
  const mask = 0xffffffffffffffffn;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= BigInt(text.charCodeAt(index));
    hash = (hash * prime) & mask;
  }
  return hash.toString(16).padStart(16, "0");
}
