/**
 * Composition utility: wrap an `FS` with selective method overrides.
 *
 * Port of TS-Go `internal/vfs/wrapvfs/wrapvfs.go`. Used by trackingvfs
 * and tests to swap out specific operations while delegating the rest
 * to a base FS.
 */

import type { DirEntry, Entries, FileInfo, FS, WalkDirFunc } from "../vfs.js";

/**
 * Optional overrides for each `FS` method. Any field that is undefined
 * delegates to the wrapped FS.
 *
 * Mirrors TS-Go `Replacements`.
 */
export interface Replacements {
  readonly useCaseSensitiveFileNames?: () => boolean;
  readonly fileExists?: (path: string) => boolean;
  readonly readFile?: (path: string) => string | undefined;
  readonly writeFile?: (path: string, data: string) => void;
  readonly appendFile?: (path: string, data: string) => void;
  readonly remove?: (path: string) => void;
  readonly chtimes?: (path: string, aTime: Date, mTime: Date) => void;
  readonly directoryExists?: (path: string) => boolean;
  readonly getAccessibleEntries?: (path: string) => Entries;
  readonly stat?: (path: string) => FileInfo | undefined;
  readonly walkDir?: (root: string, walkFn: WalkDirFunc) => void;
  readonly realpath?: (path: string) => string;
}

/**
 * Returns an FS that delegates to `fs` except for the methods listed
 * in `replacements`. Mirrors TS-Go `Wrap`.
 */
export function wrap(fs: FS, replacements: Replacements): FS {
  return new WrappedFS(fs, replacements);
}

class WrappedFS implements FS {
  private readonly fs: FS;
  private readonly replacements: Replacements;

  constructor(fs: FS, replacements: Replacements) {
    this.fs = fs;
    this.replacements = replacements;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.replacements.useCaseSensitiveFileNames !== undefined
      ? this.replacements.useCaseSensitiveFileNames()
      : this.fs.useCaseSensitiveFileNames();
  }

  fileExists(path: string): boolean {
    return this.replacements.fileExists !== undefined
      ? this.replacements.fileExists(path)
      : this.fs.fileExists(path);
  }

  readFile(path: string): string | undefined {
    return this.replacements.readFile !== undefined
      ? this.replacements.readFile(path)
      : this.fs.readFile(path);
  }

  writeFile(path: string, data: string): void {
    if (this.replacements.writeFile !== undefined) {
      this.replacements.writeFile(path, data);
      return;
    }
    this.fs.writeFile(path, data);
  }

  appendFile(path: string, data: string): void {
    if (this.replacements.appendFile !== undefined) {
      this.replacements.appendFile(path, data);
      return;
    }
    this.fs.appendFile(path, data);
  }

  remove(path: string): void {
    if (this.replacements.remove !== undefined) {
      this.replacements.remove(path);
      return;
    }
    this.fs.remove(path);
  }

  chtimes(path: string, aTime: Date, mTime: Date): void {
    if (this.replacements.chtimes !== undefined) {
      this.replacements.chtimes(path, aTime, mTime);
      return;
    }
    this.fs.chtimes(path, aTime, mTime);
  }

  directoryExists(path: string): boolean {
    return this.replacements.directoryExists !== undefined
      ? this.replacements.directoryExists(path)
      : this.fs.directoryExists(path);
  }

  getAccessibleEntries(path: string): Entries {
    return this.replacements.getAccessibleEntries !== undefined
      ? this.replacements.getAccessibleEntries(path)
      : this.fs.getAccessibleEntries(path);
  }

  stat(path: string): FileInfo | undefined {
    return this.replacements.stat !== undefined
      ? this.replacements.stat(path)
      : this.fs.stat(path);
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    if (this.replacements.walkDir !== undefined) {
      this.replacements.walkDir(root, walkFn);
      return;
    }
    this.fs.walkDir(root, walkFn);
  }

  realpath(path: string): string {
    return this.replacements.realpath !== undefined
      ? this.replacements.realpath(path)
      : this.fs.realpath(path);
  }
}

// Force `DirEntry` re-export so consumers of wrapvfs don't need to
// reach back into the parent module just to type a walk callback.
export type { DirEntry };
