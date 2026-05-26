/**
 * Read-through cache layered over an `FS`.
 *
 * Port of TS-Go `internal/vfs/cachedvfs/cachedvfs.go`. Caches results
 * of `directoryExists`, `fileExists`, `getAccessibleEntries`,
 * `realpath`, and `stat`. Mutating operations bypass the cache.
 *
 * The cache can be disabled/cleared at any time; subsequent reads
 * miss until re-enabled. Mirrors TS-Go semantics including the atomic
 * `enabled` flag (here a plain boolean, since TS single-threaded
 * semantics don't require atomics).
 */

import type { DirEntry, Entries, FileInfo, FS as IFS, WalkDirFunc } from "../vfs.js";

export class CachedFS implements IFS {
  private readonly fs: IFS;
  private enabled = true;

  private readonly directoryExistsCache = new Map<string, boolean>();
  private readonly fileExistsCache = new Map<string, boolean>();
  private readonly getAccessibleEntriesCache = new Map<string, Entries>();
  private readonly realpathCache = new Map<string, string>();
  private readonly statCache = new Map<string, FileInfo>();

  constructor(fs: IFS) {
    this.fs = fs;
  }

  disableAndClearCache(): void {
    if (this.enabled) {
      this.enabled = false;
      this.clearCache();
    }
  }

  enable(): void {
    this.enabled = true;
  }

  clearCache(): void {
    this.directoryExistsCache.clear();
    this.fileExistsCache.clear();
    this.getAccessibleEntriesCache.clear();
    this.realpathCache.clear();
    this.statCache.clear();
  }

  directoryExists(path: string): boolean {
    if (this.enabled) {
      const cached = this.directoryExistsCache.get(path);
      if (cached !== undefined) return cached;
    }
    const ret = this.fs.directoryExists(path);
    if (this.enabled) this.directoryExistsCache.set(path, ret);
    return ret;
  }

  fileExists(path: string): boolean {
    if (this.enabled) {
      const cached = this.fileExistsCache.get(path);
      if (cached !== undefined) return cached;
    }
    const ret = this.fs.fileExists(path);
    if (this.enabled) this.fileExistsCache.set(path, ret);
    return ret;
  }

  getAccessibleEntries(path: string): Entries {
    if (this.enabled) {
      const cached = this.getAccessibleEntriesCache.get(path);
      if (cached !== undefined) return cached;
    }
    const ret = this.fs.getAccessibleEntries(path);
    if (this.enabled) this.getAccessibleEntriesCache.set(path, ret);
    return ret;
  }

  readFile(path: string): string | undefined {
    return this.fs.readFile(path);
  }

  realpath(path: string): string {
    if (this.enabled) {
      const cached = this.realpathCache.get(path);
      if (cached !== undefined) return cached;
    }
    const ret = this.fs.realpath(path);
    if (this.enabled) this.realpathCache.set(path, ret);
    return ret;
  }

  remove(path: string): void {
    this.fs.remove(path);
  }

  chtimes(path: string, aTime: Date, mTime: Date): void {
    this.fs.chtimes(path, aTime, mTime);
  }

  stat(path: string): FileInfo | undefined {
    if (this.enabled) {
      const cached = this.statCache.get(path);
      if (cached !== undefined) return cached;
    }
    const ret = this.fs.stat(path);
    if (this.enabled && ret !== undefined) this.statCache.set(path, ret);
    return ret;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.fs.useCaseSensitiveFileNames();
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    this.fs.walkDir(root, walkFn);
  }

  writeFile(path: string, data: string): void {
    this.fs.writeFile(path, data);
  }

  appendFile(path: string, data: string): void {
    this.fs.appendFile(path, data);
  }
}

/**
 * Constructs a `CachedFS` wrapping `fs`. Mirrors TS-Go `From`.
 */
export function from(fs: IFS): CachedFS {
  return new CachedFS(fs);
}

export type { DirEntry };
