import type { DirEntry, Entries, FileInfo, FS, WalkDirFunc } from "../vfs/index.js";

import { LibNames } from "./libs.generated.js";
import { embeddedContents } from "./embed.generated.js";

export const embedded = true;
export const scheme = "bundled:///";

export function splitPath(path: string): { readonly rest: string; readonly ok: boolean } {
  if (!path.startsWith(scheme)) return { rest: "", ok: false };
  return { rest: path.slice(scheme.length), ok: true };
}

export function libPath(): string {
  return scheme + "libs";
}

export function isBundled(path: string): boolean {
  return splitPath(path).ok;
}

export function wrapFS(fs: FS): FS {
  return new WrappedFS(fs);
}

function directoryInfo(name: string): FileInfo {
  return { name, size: 0, mode: 0, mtime: new Date(0), isDirectory: true, isRegularFile: false };
}

function fileInfo(name: string, size: number): FileInfo {
  return { name, size, mode: 0, mtime: new Date(0), isDirectory: false, isRegularFile: true };
}

function directoryEntry(name: string): DirEntry {
  return { name, isDirectory: true, isFile: false, isSymlink: false };
}

function fileEntry(name: string): DirEntry {
  return { name, isDirectory: false, isFile: true, isSymlink: false };
}

class WrappedFS implements FS {
  readonly #fs: FS;

  constructor(fs: FS) {
    this.#fs = fs;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.#fs.useCaseSensitiveFileNames();
  }

  fileExists(path: string): boolean {
    const { rest, ok } = splitPath(path);
    if (ok) return embeddedContents.has(rest);
    return this.#fs.fileExists(path);
  }

  readFile(path: string): string | undefined {
    const { rest, ok } = splitPath(path);
    if (ok) return embeddedContents.get(rest);
    return this.#fs.readFile(path);
  }

  writeFile(path: string, data: string): void {
    if (splitPath(path).ok) throw new Error("cannot write to embedded file system");
    this.#fs.writeFile(path, data);
  }

  appendFile(path: string, data: string): void {
    if (splitPath(path).ok) throw new Error("cannot append to embedded file system");
    this.#fs.appendFile(path, data);
  }

  remove(path: string): void {
    if (splitPath(path).ok) throw new Error("cannot remove from embedded file system");
    this.#fs.remove(path);
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    if (splitPath(path).ok) throw new Error("cannot chtimes embedded file system");
    this.#fs.chtimes(path, accessTime, modifyTime);
  }

  directoryExists(path: string): boolean {
    const { rest, ok } = splitPath(path);
    if (ok) return rest === "" || rest === "libs";
    return this.#fs.directoryExists(path);
  }

  getAccessibleEntries(path: string): Entries {
    const { rest, ok } = splitPath(path);
    if (ok) {
      if (rest === "") return { files: [], directories: ["libs"] };
      if (rest === "libs") return { files: LibNames, directories: [] };
      return { files: [], directories: [] };
    }
    return this.#fs.getAccessibleEntries(path);
  }

  stat(path: string): FileInfo | undefined {
    const { rest, ok } = splitPath(path);
    if (ok) {
      if (rest === "" || rest === "libs") return directoryInfo(rest);
      const lib = embeddedContents.get(rest);
      if (lib === undefined) return undefined;
      return fileInfo(rest.slice("libs/".length), lib.length);
    }
    return this.#fs.stat(path);
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    const { rest, ok } = splitPath(root);
    if (!ok) {
      this.#fs.walkDir(root, walkFn);
      return;
    }
    this.walkEmbedded(rest, walkFn);
  }

  realpath(path: string): string {
    if (splitPath(path).ok) return path;
    return this.#fs.realpath(path);
  }

  private walkEmbedded(rest: string, walkFn: WalkDirFunc): void {
    if (rest === "") {
      if (walkFn(scheme + "libs", directoryEntry("libs")) === "skip-all") return;
      this.walkEmbedded("libs", walkFn);
      return;
    }
    if (rest === "libs") {
      for (const name of LibNames) {
        if (walkFn(scheme + "libs/" + name, fileEntry(name)) === "skip-all") return;
      }
    }
  }
}

