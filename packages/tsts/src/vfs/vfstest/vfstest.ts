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
import type { FS } from "../vfs.js";

export interface MapFile {
  readonly data: string;
  /** When set, the entry is a symlink whose target is the value of `data`. */
  readonly isSymlink?: boolean;
  readonly modTime?: Date;
}

/**
 * Constructs a `MapFile` representing a symlink to `target`. Mirrors
 * TS-Go `Symlink`.
 */
export function symlink(target: string): MapFile {
  return { data: target, isSymlink: true };
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
): FS {
  const fs = new MemoryFS({ caseSensitive: useCaseSensitiveFileNames });
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
      // Symlink semantics: when read, the path resolves to `file.data`.
      // MemoryFS doesn't have native symlink support; for the simple
      // case we store the target's contents under both paths.
      const targetContent = entries[file.data];
      if (targetContent === undefined) {
        // Broken symlink — store the link literal as content for now.
        fs.writeFile(p, file.data);
        continue;
      }
      if (typeof targetContent === "string") {
        fs.writeFile(p, targetContent);
      } else if (!targetContent.isSymlink) {
        fs.writeFile(p, targetContent.data);
      } else {
        // Symlink to symlink — follow once. For deeper chains the
        // upstream `getFollowingSymlinks` recursion is needed.
        fs.writeFile(p, targetContent.data);
      }
    } else {
      fs.writeFile(p, file.data);
    }
  }

  return fs;
}

function isRootedDiskPath(p: string): boolean {
  if (p.startsWith("/")) return true;
  // Windows-style: drive letter + ":/"
  return p.length >= 3 && p[1] === ":" && (p[2] === "/" || p[2] === "\\");
}

function comparePathsByParts(a: string, b: string): number {
  while (true) {
    const aIdx = a.indexOf("/");
    const bIdx = b.indexOf("/");
    if (aIdx === -1 || bIdx === -1) {
      return a < b ? -1 : a > b ? 1 : 0;
    }
    const aStart = a.slice(0, aIdx);
    const bStart = b.slice(0, bIdx);
    if (aStart !== bStart) return aStart < bStart ? -1 : 1;
    a = a.slice(aIdx + 1);
    b = b.slice(bIdx + 1);
  }
}
