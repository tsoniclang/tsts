/**
 * Read-tracking VFS wrapper.
 *
 * Port of TS-Go `internal/vfs/trackingvfs/trackingvfs.go`. Records
 * every path accessed via read-like operations so watch mode knows
 * which files and directories the compiler depended on (including
 * non-existent paths from failed module resolution). Write operations
 * pass through untracked.
 */

import type { DirEntry, Entries, FileInfo, FS as IFS, WalkDirFunc } from "../vfs.js";

export class TrackingFS implements IFS {
  public readonly inner: IFS;
  public readonly seenFiles = new Set<string>();

  constructor(inner: IFS) {
    this.inner = inner;
  }

  readFile(path: string): string | undefined {
    this.seenFiles.add(path);
    return this.inner.readFile(path);
  }

  fileExists(path: string): boolean {
    this.seenFiles.add(path);
    return this.inner.fileExists(path);
  }

  useCaseSensitiveFileNames(): boolean {
    return this.inner.useCaseSensitiveFileNames();
  }

  writeFile(path: string, data: string): void {
    this.inner.writeFile(path, data);
  }

  appendFile(path: string, data: string): void {
    this.inner.appendFile(path, data);
  }

  remove(path: string): void {
    this.inner.remove(path);
  }

  chtimes(path: string, aTime: Date, mTime: Date): void {
    this.inner.chtimes(path, aTime, mTime);
  }

  directoryExists(path: string): boolean {
    this.seenFiles.add(path);
    return this.inner.directoryExists(path);
  }

  getAccessibleEntries(path: string): Entries {
    this.seenFiles.add(path);
    return this.inner.getAccessibleEntries(path);
  }

  stat(path: string): FileInfo | undefined {
    this.seenFiles.add(path);
    return this.inner.stat(path);
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    this.seenFiles.add(root);
    this.inner.walkDir(root, (path: string, d: DirEntry, err: Error | undefined) => {
      this.seenFiles.add(path);
      return walkFn(path, d, err);
    });
  }

  realpath(path: string): string {
    return this.inner.realpath(path);
  }
}
