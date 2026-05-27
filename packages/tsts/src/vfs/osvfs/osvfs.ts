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

import { existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, statSync, utimesSync, writeFileSync, rmSync, appendFileSync, type Dirent, type Stats } from "node:fs";
import { dirname, isAbsolute, normalize, resolve as resolvePath } from "node:path";
import { platform } from "node:process";

import type { Entries, FileInfo, FS, WalkDirFunc, DirEntry } from "../vfs.js";

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

  writeFile(path: string, data: string): void {
    try {
      writeFileSync(path, data);
    } catch {
      mkdirSync(dirname(normalize(path)), { recursive: true });
      writeFileSync(path, data);
    }
  }

  appendFile(path: string, data: string): void {
    try {
      appendFileSync(path, data);
    } catch {
      mkdirSync(dirname(normalize(path)), { recursive: true });
      appendFileSync(path, data);
    }
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
    try {
      return realpathSync(path);
    } catch {
      return path;
    }
  }
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
