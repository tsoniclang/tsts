/**
 * Node.js fs-backed VFS implementation.
 *
 * Port of TS-Go `internal/vfs/iovfs/iofs.go` (~222 LoC). Wraps a Node
 * `fs`-like namespace into a TSTS `FS` adapter. Useful for stubbed
 * file systems or jail-rooted tests.
 */

import type { FS } from "../vfs.js";

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

  readFile(path: string): { contents: string; ok: boolean } {
    try {
      const contents = this.fs.readFileSync(path, "utf8");
      return { contents, ok: true };
    } catch {
      return { contents: "", ok: false };
    }
  }

  writeFile(path: string, data: string): boolean {
    try {
      this.fs.writeFileSync(path, data);
      return true;
    } catch {
      // Try to create parent dir then retry
      if (this.fs.mkdirSync !== undefined) {
        try {
          const dir = path.slice(0, path.lastIndexOf("/"));
          this.fs.mkdirSync(dir, { recursive: true });
          this.fs.writeFileSync(path, data);
          return true;
        } catch {
          return false;
        }
      }
      return false;
    }
  }

  appendFile(path: string, data: string): boolean {
    if (this.fs.appendFileSync === undefined) return false;
    try {
      this.fs.appendFileSync(path, data);
      return true;
    } catch {
      return false;
    }
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

  remove(path: string): boolean {
    try {
      this.fs.rmSync(path, { recursive: true, force: true });
      return true;
    } catch {
      return false;
    }
  }

  walkDir(root: string, walkFn: (file: string, isDir: boolean) => boolean | undefined): void {
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
        if (entry.isDirectory()) {
          if (walkFn(full, true) === false) continue;
          walk(full);
        } else {
          walkFn(full, false);
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

  stat(path: string): { isFile: boolean; isDirectory: boolean; mtime: number; size: number } | undefined {
    try {
      const s = this.fs.statSync(path);
      return {
        isFile: s.isFile(),
        isDirectory: s.isDirectory(),
        mtime: s.mtimeMs,
        size: s.size,
      };
    } catch {
      return undefined;
    }
  }

  chtimes(path: string, atime: number, mtime: number): boolean {
    if (this.fs.utimesSync === undefined) return false;
    try {
      this.fs.utimesSync(path, atime, mtime);
      return true;
    } catch {
      return false;
    }
  }
}

export function newIOFS(fs: NodeFSLike, caseSensitive: boolean): FS {
  return new IOFS(fs, caseSensitive);
}

/** Alias mirroring TS-Go's `From`. */
export function fromFS(fsLike: NodeFSLike, useCaseSensitiveFileNames: boolean): FS {
  return new IOFS(fsLike, useCaseSensitiveFileNames);
}
