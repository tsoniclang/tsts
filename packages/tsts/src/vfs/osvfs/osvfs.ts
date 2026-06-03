/**
 * Real-disk filesystem implementation.
 *
 * Port of TS-Go `internal/vfs/osvfs/os.go`. Implements the `FS`
 * interface against Node's `fs` module. TSTS targets NativeAOT, so
 * the eventual production path is .NET's `System.IO`; for the
 * development/test surface, Node fs is sufficient.
 *
 * Differences from TS-Go:
 *   - Go's `core.LimitedSemaphore` rate-limiting on read/write/blocking
 *     syscalls is omitted since Node's event loop already serializes
 *     these on the single thread. If TSTS adds worker threads, this
 *     can be reintroduced.
 *   - Case-sensitivity detection mirrors TS-Go's "swap-case the
 *     executable and stat it" trick, using `process.argv[1]`.
 */

import { existsSync, mkdirSync, openSync, readdirSync, readFileSync, realpathSync, statSync, utimesSync, writeSync, closeSync, rmSync, type Dirent, type Stats } from "node:fs";
import { constants as fsConstants } from "node:fs";
import { resolve as resolvePath } from "node:path";
import { platform } from "node:process";

import type { Entries, FileInfo, FS, WalkDirFunc, DirEntry } from "../vfs.js";
import { rootLength } from "../internal/internal.js";
import { getDirectoryPath, normalizePath, normalizeSlashes } from "../../tspath/path.js";

const isFileSystemCaseSensitive: boolean = (() => {
  if (platform === "win32") return false;
  // Probe: swap case on the executable path and stat it. If the
  // swapped path exists, the filesystem is case-insensitive. (Same
  // heuristic as TS-Go.)
  const exe = process.argv[1];
  if (exe === undefined || exe === "") return true;
  const swapped = swapCase(exe);
  if (swapped === exe) return true;
  try {
    statSync(swapped);
    return false; // swapped exists → case-insensitive
  } catch {
    return true;
  }
})();

function swapCase(s: string): string {
  let out = "";
  for (let i = 0; i < s.length; i += 1) {
    const ch = s[i]!;
    const upper = ch.toUpperCase();
    if (upper === ch) out += ch.toLowerCase();
    else out += upper;
  }
  return out;
}

class OsFS implements FS {
  useCaseSensitiveFileNames(): boolean {
    return isFileSystemCaseSensitive;
  }

  fileExists(path: string): boolean {
    try {
      const s = statSync(path);
      return s.isFile();
    } catch {
      return false;
    }
  }

  directoryExists(path: string): boolean {
    try {
      const s = statSync(path);
      return s.isDirectory();
    } catch {
      return false;
    }
  }

  readFile(path: string): string | undefined {
    try {
      return readFileSync(path, "utf8");
    } catch {
      return undefined;
    }
  }

  // Mirrors os.go `(vfs *osFS) writeFileWithFlag`. `flag` is a Node fs open
  // flag mask (e.g. O_WRONLY|O_CREAT|O_TRUNC). Returns the caught error, or
  // undefined on success, mirroring Go's `error` return.
  private writeFileWithFlag(path: string, content: string, flag: number): unknown {
    const opened = openFd(path, flag);
    if (opened.err !== undefined) {
      return opened.err;
    }
    const fd = opened.fd;
    try {
      writeSync(fd, content);
    } catch (error) {
      closeSync(fd);
      return error;
    }
    closeSync(fd);
    return undefined;
  }

  // Mirrors os.go `(vfs *osFS) ensureDirectoryExists` (os.MkdirAll).
  private ensureDirectoryExists(directoryPath: string): unknown {
    try {
      mkdirSync(directoryPath, { recursive: true });
      return undefined;
    } catch (error) {
      return error;
    }
  }

  // Mirrors os.go `(vfs *osFS) writeFileEnsuringDir`.
  private writeFileEnsuringDir(path: string, content: string, flag: number): unknown {
    rootLength(path); // Assert path is rooted
    if (this.writeFileWithFlag(path, content, flag) === undefined) {
      return undefined;
    }
    const mkdirErr = this.ensureDirectoryExists(getDirectoryPath(normalizePath(path)));
    if (mkdirErr !== undefined) {
      return mkdirErr;
    }
    return this.writeFileWithFlag(path, content, flag);
  }

  writeFile(path: string, data: string): void {
    const err = this.writeFileEnsuringDir(path, data, fsConstants.O_WRONLY | fsConstants.O_CREAT | fsConstants.O_TRUNC);
    if (err !== undefined) throw err;
  }

  appendFile(path: string, data: string): void {
    const err = this.writeFileEnsuringDir(path, data, fsConstants.O_WRONLY | fsConstants.O_CREAT | fsConstants.O_APPEND);
    if (err !== undefined) throw err;
  }

  remove(path: string): void {
    rmSync(path, { recursive: true, force: true });
  }

  chtimes(path: string, aTime: Date, mTime: Date): void {
    utimesSync(path, aTime, mTime);
  }

  stat(path: string): FileInfo | undefined {
    let s: Stats;
    try {
      s = statSync(path);
    } catch {
      return undefined;
    }
    return statsToFileInfo(path, s);
  }

  getAccessibleEntries(path: string): Entries {
    let entries: Dirent[];
    try {
      entries = readdirSync(path, { withFileTypes: true });
    } catch {
      return { files: [], directories: [] };
    }
    const files: string[] = [];
    const dirs: string[] = [];
    for (const e of entries) {
      if (e.isSymbolicLink()) {
        // Follow symlinks to determine whether the target is a file
        // or directory. Mirrors TS-Go `addToResult` symlink branch.
        try {
          const s = statSync(resolvePath(path, e.name));
          if (s.isDirectory()) dirs.push(e.name);
          else if (s.isFile()) files.push(e.name);
        } catch {
          // unresolvable symlink — skip
        }
        continue;
      }
      if (e.isDirectory()) dirs.push(e.name);
      else if (e.isFile()) files.push(e.name);
    }
    return { files, directories: dirs };
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    // Mirrors os.go `(vfs *osFS) WalkDir`: borrow a limited walker from the
    // pool, run the underlying common walk through it, and return it.
    const walker = getLimitedWalkDirFunc(walkFn);
    try {
      this.walkDirWorker(root, walker.walk);
    } finally {
      putLimitedWalkDirFunc(walker);
    }
  }

  private walkDirWorker(root: string, walkFn: WalkDirFunc): void {
    const visit = (currentPath: string): "continue" | "skip-dir" | "skip-all" | void => {
      let st: Stats;
      try {
        st = statSync(currentPath);
      } catch {
        return walkFn(currentPath, { name: baseName(currentPath), isDirectory: false, isFile: false, isSymlink: false });
      }
      const entry: DirEntry = {
        name: baseName(currentPath),
        isDirectory: st.isDirectory(),
        isFile: st.isFile(),
        isSymlink: st.isSymbolicLink(),
      };
      const action = walkFn(currentPath, entry);
      if (action === "skip-all") return "skip-all";
      if (action === "skip-dir" || !entry.isDirectory) return action;
      let children: Dirent[];
      try {
        children = readdirSync(currentPath, { withFileTypes: true });
      } catch {
        return undefined;
      }
      for (const child of children) {
        const result = visit(resolvePath(currentPath, child.name));
        if (result === "skip-all") return "skip-all";
      }
      return undefined;
    };
    visit(root);
  }

  realpath(path: string): string {
    return osFSRealpath(path);
  }
}

// Mirrors os.go `osFSRealpath`: assert the path is rooted, resolve symlinks
// to the canonical target, make it absolute, then normalize slashes. Node's
// `realpathSync.native` is the build-tag-selected kernel realpath (the TS
// counterpart of the platform `realpath` helpers in realPath.*.ts).
export function osFSRealpath(path: string): string {
  rootLength(path); // Assert path is rooted
  const orig = path;
  const resolved = tryRealpath(path);
  if (resolved === undefined) {
    return orig;
  }
  const absolute = tryAbs(resolved);
  if (absolute === undefined) {
    return orig;
  }
  return normalizeSlashes(absolute);
}

// Mirrors the `realpath(path)` call inside os.go `osFSRealpath`: returns the
// resolved canonical path, or undefined on error (Go's `err != nil`).
function tryRealpath(path: string): string | undefined {
  try {
    return realpathSync.native(path);
  } catch {
    return undefined;
  }
}

// Mirrors the `filepath.Abs(path)` call inside os.go `osFSRealpath`.
function tryAbs(path: string): string | undefined {
  try {
    return resolvePath(path);
  } catch {
    return undefined;
  }
}

// Opens `path` with the given flag, returning either the fd or the caught
// error. Mirrors the `os.OpenFile` call inside os.go `writeFileWithFlag`.
function openFd(path: string, flag: number): { readonly fd: number; readonly err: undefined } | { readonly fd: -1; readonly err: unknown } {
  try {
    return { fd: openSync(path, flag, 0o666), err: undefined };
  } catch (error) {
    return { fd: -1, err: error };
  }
}

// limitedWalkDirFunc mirrors os.go's pooled wrapper that rate-limits each
// WalkDir callback through the blocking-op semaphore. TSTS is single-threaded
// so there is no semaphore to acquire, but the helper decomposition
// (getLimitedWalkDirFunc / putLimitedWalkDirFunc / walker) is preserved 1:1.
interface limitedWalkDirFunc {
  inner: WalkDirFunc | undefined;
  walk: WalkDirFunc;
}

const limitedWalkDirFuncPool: limitedWalkDirFunc[] = [];

function newLimitedWalkDirFunc(): limitedWalkDirFunc {
  const w: limitedWalkDirFunc = {
    inner: undefined,
    // Replaced below once `walk` is bound to `walker`.
    walk: (): void => undefined,
  };
  w.walk = (path, d): ReturnType<WalkDirFunc> => walker(w, path, d);
  return w;
}

// Mirrors os.go `(w *limitedWalkDirFunc) walker`.
function walker(w: limitedWalkDirFunc, path: string, d: DirEntry): ReturnType<WalkDirFunc> {
  const inner = w.inner;
  if (inner === undefined) return undefined;
  return inner(path, d);
}

// Mirrors os.go `getLimitedWalkDirFunc`.
function getLimitedWalkDirFunc(walkFn: WalkDirFunc): limitedWalkDirFunc {
  const w = limitedWalkDirFuncPool.pop() ?? newLimitedWalkDirFunc();
  w.inner = walkFn;
  return w;
}

// Mirrors os.go `putLimitedWalkDirFunc`.
function putLimitedWalkDirFunc(w: limitedWalkDirFunc): void {
  w.inner = undefined;
  limitedWalkDirFuncPool.push(w);
}

function statsToFileInfo(path: string, s: Stats): FileInfo {
  return {
    name: baseName(path),
    size: Number(s.size),
    mode: s.mode,
    mtime: s.mtime,
    isDirectory: s.isDirectory(),
    isRegularFile: s.isFile(),
  };
}

function baseName(p: string): string {
  const slash = p.lastIndexOf("/");
  const back = p.lastIndexOf("\\");
  const cut = Math.max(slash, back);
  return cut === -1 ? p : p.slice(cut + 1);
}

const osVFS: FS = new OsFS();

/** Returns the singleton real-disk FS. Mirrors TS-Go `FS()`. */
export function fs(): FS {
  return osVFS;
}

/**
 * Returns the global typings cache location. Mirrors TS-Go
 * `GetGlobalTypingsCacheLocation`.
 */
export function getGlobalTypingsCacheLocation(versionMajorMinor: string): string {
  const cacheDir = process.env.XDG_CACHE_HOME ?? defaultCacheDir();
  const subdir = platform === "win32" ? "Microsoft/TypeScript" : "typescript";
  return resolvePath(cacheDir, subdir, versionMajorMinor);
}

function defaultCacheDir(): string {
  if (platform === "win32") return process.env.LOCALAPPDATA ?? process.env.TEMP ?? ".";
  if (platform === "darwin") return resolvePath(process.env.HOME ?? "", "Library/Caches");
  return resolvePath(process.env.HOME ?? "", ".cache");
}

// Re-exports for typed walk callbacks.
export type { DirEntry, FileInfo };
