/**
 * In-memory filesystem implementation for testing.
 *
 * Path-keyed Map of files and directories. Designed for test isolation;
 * not for production use.
 */

import {
  type DirEntry,
  type Entries,
  errExist,
  errNotExist,
  type FS,
  type FileInfo,
  type WalkDirFunc,
} from "./vfs.js";

type Entry =
  | { readonly kind: "file"; readonly path: string; content: string; mtime: Date }
  | { readonly kind: "dir"; readonly path: string };

export class MemoryFS implements FS {
  private readonly entries = new Map<string, Entry>();
  private readonly caseSensitive: boolean;

  constructor(opts: { caseSensitive?: boolean } = {}) {
    this.caseSensitive = opts.caseSensitive ?? true;
    // Root always exists
    this.entries.set("/", { kind: "dir", path: "/" });
  }

  useCaseSensitiveFileNames(): boolean {
    return this.caseSensitive;
  }

  private normalizeKey(path: string): string {
    let p = path.replace(/\\/g, "/");
    if (!p.startsWith("/")) p = "/" + p;
    // Strip trailing slash except for root
    if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
    return this.caseSensitive ? p : p.toLowerCase();
  }

  fileExists(path: string): boolean {
    const e = this.entries.get(this.normalizeKey(path));
    return e !== undefined && e.kind === "file";
  }

  directoryExists(path: string): boolean {
    const e = this.entries.get(this.normalizeKey(path));
    return e !== undefined && e.kind === "dir";
  }

  readFile(path: string): string | undefined {
    const e = this.entries.get(this.normalizeKey(path));
    if (e === undefined || e.kind !== "file") return undefined;
    return e.content;
  }

  writeFile(path: string, data: string): void {
    const key = this.normalizeKey(path);
    this.ensureParentDirs(key);
    this.entries.set(key, { kind: "file", path: key, content: data, mtime: new Date() });
  }

  appendFile(path: string, data: string): void {
    const key = this.normalizeKey(path);
    const e = this.entries.get(key);
    if (e !== undefined && e.kind !== "file") throw errExist;
    if (e === undefined) {
      this.writeFile(path, data);
      return;
    }
    e.content += data;
    e.mtime = new Date();
  }

  private ensureParentDirs(filePath: string): void {
    const parts = filePath.split("/").filter((p) => p.length > 0);
    let current = "";
    for (let i = 0; i < parts.length - 1; i += 1) {
      current += "/" + parts[i];
      if (!this.entries.has(current)) {
        this.entries.set(current, { kind: "dir", path: current });
      }
    }
  }

  remove(path: string): void {
    const key = this.normalizeKey(path);
    if (!this.entries.has(key)) throw errNotExist;
    const prefix = key + "/";
    for (const k of [...this.entries.keys()]) {
      if (k === key || k.startsWith(prefix)) {
        this.entries.delete(k);
      }
    }
  }

  chtimes(path: string, _aTime: Date, mTime: Date): void {
    const e = this.entries.get(this.normalizeKey(path));
    if (e === undefined) throw errNotExist;
    if (e.kind === "file") e.mtime = mTime;
  }

  getAccessibleEntries(path: string): Entries {
    const key = this.normalizeKey(path);
    const e = this.entries.get(key);
    if (e === undefined || e.kind !== "dir") {
      return { files: [], directories: [] };
    }
    const files: string[] = [];
    const dirs: string[] = [];
    const prefix = key === "/" ? "/" : key + "/";
    for (const [k, entry] of this.entries) {
      if (!k.startsWith(prefix) || k === key) continue;
      const rest = k.slice(prefix.length);
      if (rest.includes("/")) continue;  // not a direct child
      if (entry.kind === "file") files.push(rest);
      else dirs.push(rest);
    }
    return { files, directories: dirs };
  }

  stat(path: string): FileInfo | undefined {
    const e = this.entries.get(this.normalizeKey(path));
    if (e === undefined) return undefined;
    const name = e.path.split("/").pop() ?? "";
    if (e.kind === "file") {
      return {
        name,
        size: e.content.length,
        mode: 0o644,
        mtime: e.mtime,
        isDirectory: false,
        isRegularFile: true,
      };
    }
    return {
      name,
      size: 0,
      mode: 0o644,
      mtime: new Date(),
      isDirectory: true,
      isRegularFile: false,
    };
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    const rootKey = this.normalizeKey(root);
    if (!this.entries.has(rootKey)) return;
    const stack: string[] = [rootKey];
    while (stack.length > 0) {
      const curr = stack.shift()!;
      const entry = this.entries.get(curr)!;
      const dirEntry: DirEntry = {
        name: entry.path.split("/").pop() ?? "",
        isDirectory: entry.kind === "dir",
        isFile: entry.kind === "file",
        isSymlink: false,
      };
      const action = walkFn(entry.path, dirEntry);
      if (action === "skip-all") return;
      if (action === "skip-dir" || entry.kind === "file") continue;

      const prefix = curr === "/" ? "/" : curr + "/";
      const children: string[] = [];
      for (const k of this.entries.keys()) {
        if (!k.startsWith(prefix) || k === curr) continue;
        const rest = k.slice(prefix.length);
        if (rest.includes("/")) continue;
        children.push(k);
      }
      children.sort();
      stack.unshift(...children);
    }
  }

  realpath(path: string): string {
    return this.normalizeKey(path);
  }
}
