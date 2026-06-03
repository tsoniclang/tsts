/**
 * Test-only filesystem builder backed by an in-memory map.
 *
 * Port of TS-Go `internal/vfs/vfstest/vfstest.go`. The Go version
 * adapts `testing/fstest.MapFS` to `vfs.FS`; in TS we already have
 * `MemoryFS` from `../memory.ts`, so this module provides a thin
 * helper that preloads a `MemoryFS` from a map literal and adds the
 * symlink-aware semantics TS-Go's vfstest provides.
 */

import { MemoryFS } from "../memory.js";
import type { DirEntry, Entries, FileInfo, FS, WalkDirFunc } from "../vfs.js";
import {
  getCanonicalFileName,
  isRootedDiskPath,
  normalizePath,
  removeTrailingDirectorySeparator,
} from "../../tspath/path.js";

export interface MapFile {
  readonly data: string;
  /** When set, the entry is a symlink whose target is the value of `data`. */
  readonly isSymlink?: boolean;
  readonly modTime?: Date;
}

export interface Clock {
  now(): Date;
  sinceStart(): number;
}

class RealClock implements Clock {
  private readonly start = Date.now();

  now(): Date {
    return new Date();
  }

  sinceStart(): number {
    return Date.now() - this.start;
  }
}

/**
 * Constructs a `MapFile` representing a symlink to `target`. Mirrors
 * TS-Go `Symlink`.
 */
export function symlink(target: string): MapFile {
  return { data: target, isSymlink: true };
}

export interface MapFSEntry {
  readonly path: string;
  readonly data: string;
  readonly isSymlink: boolean;
  readonly modTime: Date;
}

export class MapFS implements FS {
  private readonly inner: MemoryFS;
  private readonly symlinks = new Map<string, string>();
  private readonly realpaths = new Map<string, string>();
  private readonly modTimes = new Map<string, Date>();
  private readonly clock: Clock;
  private readonly caseSensitive: boolean;

  constructor(useCaseSensitiveFileNames: boolean, clock: Clock) {
    this.caseSensitive = useCaseSensitiveFileNames;
    this.clock = clock;
    this.inner = new MemoryFS({ caseSensitive: useCaseSensitiveFileNames });
  }

  useCaseSensitiveFileNames(): boolean {
    return this.caseSensitive;
  }

  fileExists(path: string): boolean {
    const resolved = this.resolvePath(path);
    return this.inner.fileExists(resolved);
  }

  readFile(path: string): string | undefined {
    const resolved = this.resolvePath(path);
    return this.inner.readFile(resolved);
  }

  writeFile(path: string, data: string): void {
    const resolved = this.resolveWritablePath(path);
    this.ensureParentDirectory(resolved);
    this.inner.writeFile(resolved, data);
    this.realpaths.set(this.key(resolved), resolved);
    this.modTimes.set(this.key(resolved), this.clock.now());
  }

  appendFile(path: string, data: string): void {
    const current = this.readFile(path) ?? "";
    this.writeFile(path, current + data);
  }

  remove(path: string): void {
    const key = this.key(path);
    const resolved = this.resolvePath(path);
    this.inner.remove(resolved);
    for (const candidate of [...this.realpaths.keys()]) {
      if (candidate === key || candidate.startsWith(`${key}/`)) {
        this.realpaths.delete(candidate);
        this.modTimes.delete(candidate);
        this.symlinks.delete(candidate);
      }
    }
  }

  chtimes(path: string, _accessTime: Date, modifyTime: Date): void {
    const resolved = this.resolvePath(path);
    this.inner.chtimes(resolved, _accessTime, modifyTime);
    this.modTimes.set(this.key(resolved), modifyTime);
  }

  directoryExists(path: string): boolean {
    return this.inner.directoryExists(this.resolvePath(path));
  }

  getAccessibleEntries(path: string): Entries {
    const resolved = this.resolvePath(path);
    const entries = this.inner.getAccessibleEntries(resolved);
    const symlinks = new Set<string>();
    for (const name of [...entries.files, ...entries.directories]) {
      const childPath = `${removeTrailingDirectorySeparator(path)}/${name}`;
      if (this.symlinks.has(this.key(childPath))) symlinks.add(name);
    }
    return symlinks.size === 0
      ? entries
      : { files: entries.files, directories: entries.directories, symlinks };
  }

  stat(path: string): FileInfo | undefined {
    const resolved = this.resolvePath(path);
    const info = this.inner.stat(resolved);
    if (info === undefined) return undefined;
    return {
      ...info,
      name: baseName(this.realpath(path)),
      mtime: this.modTimes.get(this.key(resolved)) ?? info.mtime,
    };
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    const resolvedRoot = this.resolvePath(root);
    this.inner.walkDir(resolvedRoot, (path, entry) => {
      const displayPath = this.displayPath(path);
      const mappedEntry: DirEntry = {
        ...entry,
        isSymlink: this.symlinks.has(this.key(displayPath)),
      };
      return walkFn(displayPath, mappedEntry);
    });
  }

  realpath(path: string): string {
    const resolved = this.resolvePath(path);
    return this.realpaths.get(this.key(resolved)) ?? resolved;
  }

  mkdirAll(path: string): void {
    const normalized = removeTrailingDirectorySeparator(normalizePath(path));
    const parts = normalized.split("/").filter(part => part.length > 0);
    let current = normalized.startsWith("/") ? "" : "";
    for (const part of parts) {
      current += `/${part}`;
      if (!this.inner.directoryExists(current)) {
        this.inner.writeFile(`${current}/.dir`, "");
        this.inner.remove(`${current}/.dir`);
      }
      this.realpaths.set(this.key(current), current);
    }
  }

  addSymlink(path: string, target: string): void {
    validateMapPaths([path, target]);
    const link = removeTrailingDirectorySeparator(normalizePath(path));
    const normalizedTarget = removeTrailingDirectorySeparator(normalizePath(target));
    this.symlinks.set(this.key(link), normalizedTarget);
    this.realpaths.set(this.key(link), link);
    this.inner.writeFile(link, target);
  }

  getTargetOfSymlink(path: string): readonly [string, boolean] {
    const target = this.symlinks.get(this.key(path));
    return target === undefined ? ["", false] : [target, true];
  }

  getModTime(path: string): Date | undefined {
    return this.modTimes.get(this.key(this.resolvePath(path)));
  }

  entries(): readonly MapFSEntry[] {
    const entries: MapFSEntry[] = [];
    this.inner.walkDir("/", (path, entry) => {
      if (entry.isDirectory) return undefined;
      const target = this.symlinks.get(this.key(path));
      entries.push({
        path: this.realpaths.get(this.key(path)) ?? path,
        data: this.inner.readFile(path) ?? "",
        isSymlink: target !== undefined,
        modTime: this.modTimes.get(this.key(path)) ?? new Date(0),
      });
      return undefined;
    });
    return entries.sort((left, right) => comparePathsByParts(left.path, right.path));
  }

  getFileInfo(path: string): MapFSEntry | undefined {
    const resolved = this.resolvePath(path);
    if (!this.inner.fileExists(resolved)) return undefined;
    const target = this.symlinks.get(this.key(path));
    return {
      path: resolved,
      data: this.inner.readFile(resolved) ?? "",
      isSymlink: target !== undefined,
      modTime: this.modTimes.get(this.key(resolved)) ?? new Date(0),
    };
  }

  private resolvePath(path: string, seen: ReadonlySet<string> = new Set()): string {
    const normalized = removeTrailingDirectorySeparator(normalizePath(path));
    const key = this.key(normalized);
    if (seen.has(key)) throw new Error(`symlink cycle at ${path}`);
    const direct = this.symlinks.get(key);
    if (direct !== undefined) return this.resolvePath(direct, new Set([...seen, key]));
    for (const [link, target] of this.symlinks) {
      if (key.startsWith(`${link}/`)) {
        const suffix = normalized.slice(link.length);
        return this.resolvePath(`${target}${suffix}`, new Set([...seen, key]));
      }
    }
    return normalized;
  }

  private resolveWritablePath(path: string): string {
    const normalized = removeTrailingDirectorySeparator(normalizePath(path));
    const dir = dirName(normalized);
    if (dir.length === 0) return normalized;
    const resolvedDir = this.resolvePath(dir);
    return `${resolvedDir}/${baseName(normalized)}`;
  }

  private ensureParentDirectory(path: string): void {
    const parent = dirName(path);
    if (parent.length > 0) this.mkdirAll(parent);
  }

  private key(path: string): string {
    const normalized = removeTrailingDirectorySeparator(normalizePath(path));
    return this.caseSensitive ? normalized : normalized.toLowerCase();
  }

  private displayPath(path: string): string {
    return this.realpaths.get(this.key(path)) ?? path;
  }
}

/**
 * Creates a `MemoryFS` preloaded from a map of paths to file contents.
 *
 * Paths must be normalized absolute paths; mixing POSIX and Windows
 * styles in the same map is not allowed. Mirrors TS-Go `FromMap`.
 */
export function fromMap(
  entries: Readonly<Record<string, string | MapFile>>,
  useCaseSensitiveFileNames: boolean,
): MapFS {
  return fromMapWithClock(entries, useCaseSensitiveFileNames, new RealClock());
}

export function fromMapWithClock(
  entries: Readonly<Record<string, string | MapFile>>,
  useCaseSensitiveFileNames: boolean,
  clock: Clock,
): MapFS {
  const fs = new MapFS(useCaseSensitiveFileNames, clock);
  const keys = Object.keys(entries).sort(comparePathsByParts);

  let posix = false;
  let windows = false;
  for (const p of keys) {
    if (!isRootedDiskPath(p)) {
      throw new Error(`vfstest: non-rooted path ${JSON.stringify(p)}`);
    }
    if (p.startsWith("/")) posix = true;
    else windows = true;
  }
  if (posix && windows) {
    throw new Error("vfstest: mixed posix and windows paths");
  }

  for (const p of keys) {
    const raw = entries[p];
    const file = typeof raw === "string" ? { data: raw } : raw;
    if (file === undefined) continue;
    if (file.isSymlink) {
      fs.addSymlink(p, file.data);
    } else {
      writeMapFile(fs, p, file.data, clock);
    }
  }

  return fs;
}

function writeMapFile(fs: FS, path: string, content: string, clock: Clock): void {
  fs.writeFile(path, content);
  const now = clock.now();
  fs.chtimes(path, now, now);
}

export function validateMapPaths(paths: readonly string[]): void {
  let posix = false;
  let windows = false;
  for (const path of paths) {
    if (!isRootedDiskPath(path)) throw new Error(`vfstest: non-rooted path ${JSON.stringify(path)}`);
    const normalized = removeTrailingDirectorySeparator(normalizePath(path));
    if (normalized !== path) throw new Error(`vfstest: non-normalized path ${JSON.stringify(path)}`);
    if (path.startsWith("/")) posix = true;
    else windows = true;
  }
  if (posix && windows) throw new Error("vfstest: mixed posix and windows paths");
}

// Mirrors TS-Go `(m *MapFS) getCanonicalPath`: delegates to
// tspath.GetCanonicalFileName.
export function canonicalPath(path: string, useCaseSensitiveFileNames: boolean): string {
  return getCanonicalFileName(path, useCaseSensitiveFileNames);
}

// Mirrors TS-Go `dirName`: `strings.TrimSuffix(path.Split(p).dir, "/")`.
// Go's path.Split returns everything up to and including the final slash as
// dir; we trim the trailing slash.
export function dirName(p: string): string {
  const [dir] = pathSplit(p);
  return trimSuffix(dir, "/");
}

// Mirrors TS-Go `baseName`: `path.Split(p).file`.
export function baseName(p: string): string {
  const [, file] = pathSplit(p);
  return file;
}

// Mirrors Go stdlib `path.Split`: splits path immediately after the final
// slash, separating it into a directory (with trailing slash) and file name.
function pathSplit(p: string): readonly [dir: string, file: string] {
  const i = p.lastIndexOf("/");
  return [p.slice(0, i + 1), p.slice(i + 1)];
}

// strings.TrimSuffix.
function trimSuffix(s: string, suffix: string): string {
  return s.endsWith(suffix) ? s.slice(0, s.length - suffix.length) : s;
}

// Mirrors TS-Go `comparePathsByParts`: compares paths segment-by-segment
// (`strings.Cut` on "/", `strings.Compare` on each segment).
function comparePathsByParts(a: string, b: string): number {
  for (;;) {
    const [aStart, aEnd, aOk] = stringsCut(a, "/");
    const [bStart, bEnd, bOk] = stringsCut(b, "/");

    if (!aOk || !bOk) {
      return stringsCompare(a, b);
    }

    const r = stringsCompare(aStart, bStart);
    if (r !== 0) {
      return r;
    }

    a = aEnd;
    b = bEnd;
  }
}

// strings.Cut: splits s around the first occurrence of sep.
function stringsCut(s: string, sep: string): readonly [before: string, after: string, found: boolean] {
  const i = s.indexOf(sep);
  if (i < 0) {
    return [s, "", false];
  }
  return [s.slice(0, i), s.slice(i + sep.length), true];
}

// strings.Compare.
function stringsCompare(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
