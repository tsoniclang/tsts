/**
 * Virtual filesystem abstraction.
 *
 * Port of TS-Go internal/vfs/vfs.go.
 *
 * The FS interface abstracts over the real Node fs and over an in-memory
 * implementation for tests. All TSTS code that touches the filesystem
 * goes through this interface; concrete implementations live in
 * src/vfs/{node,memory,mock}.ts (forthcoming).
 */

/** A directory entry returned by listing operations. */
export interface DirEntry {
  readonly name: string;
  readonly isDirectory: boolean;
  readonly isFile: boolean;
  readonly isSymlink: boolean;
}

/** File metadata returned by Stat. */
export interface FileInfo {
  readonly name: string;
  readonly size: number;
  readonly mode: number;
  readonly mtime: Date;
  readonly isDirectory: boolean;
  readonly isRegularFile: boolean;
}

/** Listing of a directory's contents, separating files and dirs. */
export interface Entries {
  readonly files: readonly string[];
  readonly directories: readonly string[];
  /**
   * Names (from `files` or `directories`) that were symlinks on disk.
   * undefined means symlink info isn't available; the caller may need
   * to re-check.
   */
  readonly symlinks?: ReadonlySet<string>;
}

/**
 * Result of a WalkDir callback. Returning SkipDir skips the current
 * directory's contents; returning SkipAll halts the walk; returning
 * undefined continues normally; returning an Error aborts and propagates.
 */
export type WalkDirAction = "continue" | "skip-dir" | "skip-all";

export type WalkDirFunc = (
  path: string,
  entry: DirEntry
) => WalkDirAction | void;

/** Filesystem abstraction. */
export interface FS {
  /** Whether the filesystem distinguishes "Foo.ts" from "foo.ts". */
  useCaseSensitiveFileNames(): boolean;

  fileExists(path: string): boolean;

  /** Returns the file content, or undefined if it cannot be read. */
  readFile(path: string): string | undefined;

  writeFile(path: string, data: string): void;

  /** Appends; creates the file if it doesn't exist. */
  appendFile(path: string, data: string): void;

  /** Removes the path and all its contents. */
  remove(path: string): void;

  /** Updates access and modification times. */
  chtimes(path: string, accessTime: Date, modifyTime: Date): void;

  directoryExists(path: string): boolean;

  /** List a directory's contents, separating files and directories. */
  getAccessibleEntries(path: string): Entries;

  stat(path: string): FileInfo | undefined;

  /** Walk a tree, calling walkFn for each entry. */
  walkDir(root: string, walkFn: WalkDirFunc): void;

  /** Resolve symlinks and case-correct the path. */
  realpath(path: string): string;
}

// ────────────────────────────────────────────────────────────────────────────
// Error types
// ────────────────────────────────────────────────────────────────────────────

export class VfsError extends Error {
  constructor(public readonly kind: "invalid" | "permission" | "exist" | "not-exist" | "closed", message: string) {
    super(message);
    this.name = "VfsError";
  }
}

export const errInvalid = new VfsError("invalid", "invalid argument");
export const errPermission = new VfsError("permission", "permission denied");
export const errExist = new VfsError("exist", "file already exists");
export const errNotExist = new VfsError("not-exist", "file does not exist");
export const errClosed = new VfsError("closed", "file already closed");
