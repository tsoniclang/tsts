/**
 * Node.js fs-backed VFS implementation.
 *
 * Port of TS-Go `internal/vfs/iovfs/iofs.go` (~222 LoC). Wraps a Node
 * `fs`-like namespace into a TSTS `FS` adapter. Useful for stubbed
 * file systems or jail-rooted tests.
 */

import type { FS, FileInfo, WalkDirFunc, DirEntry } from "../vfs.js";
import { VfsError } from "../vfs.js";

export interface NodeFSLike {
  readFileSync(path: string, encoding: "utf-8" | "utf8"): string;
  writeFileSync(path: string, data: string): void;
  appendFileSync?(path: string, data: string): void;
  mkdirSync?(path: string, options: { recursive: boolean }): void;
  existsSync(path: string): boolean;
  statSync(path: string): { isFile(): boolean; isDirectory(): boolean; mtimeMs: number; size: number };
  readdirSync(path: string, options?: { withFileTypes?: boolean }): readonly string[] | readonly { name: string; isFile(): boolean; isDirectory(): boolean }[];
  rmSync(path: string, options: { recursive?: boolean; force?: boolean }): void;
  utimesSync?(path: string, atime: number, mtime: number): void;
  realpathSync?(path: string): string;
}

export class IOFS implements FS {
  private readonly fs: NodeFSLike;
  private readonly caseSensitive: boolean;

  constructor(fs: NodeFSLike, caseSensitive: boolean) {
    this.fs = fs;
    this.caseSensitive = caseSensitive;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.caseSensitive;
  }

  fileExists(path: string): boolean {
    try {
      return this.fs.existsSync(path) && this.fs.statSync(path).isFile();
    } catch {
      return false;
    }
  }

  directoryExists(path: string): boolean {
    try {
      return this.fs.existsSync(path) && this.fs.statSync(path).isDirectory();
    } catch {
      return false;
    }
  }

  readFile(path: string): string | undefined {
    try {
      return this.fs.readFileSync(path, "utf8");
    } catch {
      return undefined;
    }
  }

  // Mirrors iofs.go `(vfs *ioFS) writeFileEnsuringDir`: try the write; on
  // failure, ensure the parent directory exists and retry. `write` returns the
  // caught error, or undefined on success (Go's `error` return).
  private writeFileEnsuringDir(path: string, content: string, write: (path: string, content: string) => unknown): unknown {
    if (write(path, content) === undefined) {
      return undefined;
    }
    if (this.fs.mkdirSync === undefined) {
      return new VfsError("invalid", "mkdirAll not supported");
    }
    const dir = path.slice(0, path.lastIndexOf("/"));
    try {
      this.fs.mkdirSync(dir, { recursive: true });
    } catch (error) {
      return error;
    }
    return write(path, content);
  }

  private writeFileImpl(path: string, content: string): unknown {
    try {
      this.fs.writeFileSync(path, content);
      return undefined;
    } catch (error) {
      return error;
    }
  }

  private appendFileImpl(path: string, content: string): unknown {
    if (this.fs.appendFileSync === undefined) {
      return new VfsError("invalid", "appendFile unsupported");
    }
    try {
      this.fs.appendFileSync(path, content);
      return undefined;
    } catch (error) {
      return error;
    }
  }

  writeFile(path: string, data: string): void {
    const err = this.writeFileEnsuringDir(path, data, (p, c) => this.writeFileImpl(p, c));
    if (err !== undefined) throw err;
  }

  appendFile(path: string, data: string): void {
    const err = this.writeFileEnsuringDir(path, data, (p, c) => this.appendFileImpl(p, c));
    if (err !== undefined) throw err;
  }

  realpath(path: string): string {
    if (this.fs.realpathSync !== undefined) {
      try {
        return this.fs.realpathSync(path);
      } catch {
        return path;
      }
    }
    return path;
  }

  remove(path: string): void {
    this.fs.rmSync(path, { recursive: true, force: true });
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    const walk = (dir: string): void => {
      let entries: readonly { name: string; isFile(): boolean; isDirectory(): boolean }[];
      try {
        const raw = this.fs.readdirSync(dir, { withFileTypes: true });
        entries = raw as readonly { name: string; isFile(): boolean; isDirectory(): boolean }[];
      } catch {
        return;
      }
      for (const entry of entries) {
        const full = dir + "/" + entry.name;
        const dirEntry: DirEntry = {
          name: entry.name,
          isDirectory: entry.isDirectory(),
          isFile: entry.isFile(),
          isSymlink: false,
        };
        if (entry.isDirectory()) {
          if (walkFn(full, dirEntry) === "skip-dir") continue;
          walk(full);
        } else {
          walkFn(full, dirEntry);
        }
      }
    };
    walk(root);
  }

  getAccessibleEntries(path: string): { files: readonly string[]; directories: readonly string[] } {
    try {
      const raw = this.fs.readdirSync(path, { withFileTypes: true });
      const entries = raw as readonly { name: string; isFile(): boolean; isDirectory(): boolean }[];
      const files: string[] = [];
      const directories: string[] = [];
      for (const e of entries) {
        if (e.isDirectory()) directories.push(e.name);
        else if (e.isFile()) files.push(e.name);
      }
      return { files, directories };
    } catch {
      return { files: [], directories: [] };
    }
  }

  stat(path: string): FileInfo | undefined {
    try {
      const s = this.fs.statSync(path);
      return {
        name: path.slice(path.lastIndexOf("/") + 1),
        size: s.size,
        mode: 0,
        mtime: new Date(s.mtimeMs),
        isDirectory: s.isDirectory(),
        isRegularFile: s.isFile(),
      };
    } catch {
      return undefined;
    }
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    if (this.fs.utimesSync === undefined) {
      throw new VfsError("invalid", "chtimes unsupported");
    }
    this.fs.utimesSync(path, accessTime.getTime() / 1000, modifyTime.getTime() / 1000);
  }
}

export function newIOFS(fs: NodeFSLike, caseSensitive: boolean): FS {
  return new IOFS(fs, caseSensitive);
}

/** Alias mirroring TS-Go's `From`. */
export function fromFS(fsLike: NodeFSLike, useCaseSensitiveFileNames: boolean): FS {
  return new IOFS(fsLike, useCaseSensitiveFileNames);
}
