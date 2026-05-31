import type { FS } from "../vfs.js";
import { fromFS, type NodeFSLike } from "./ioVfs.js";

export interface RealpathFS extends NodeFSLike {
  realpathSync(path: string): string;
}

export interface WritableFS extends NodeFSLike {
  writeFileSync(path: string, data: string): void;
  appendFileSync(path: string, data: string): void;
  mkdirSync(path: string, options: { recursive: boolean }): void;
  rmSync(path: string, options: { recursive?: boolean; force?: boolean }): void;
  utimesSync(path: string, atime: number, mtime: number): void;
}

export interface FsWithSys extends FS {
  fsys(): NodeFSLike;
}

class IOFSWithSys implements FsWithSys {
  private readonly inner: FS;
  private readonly source: NodeFSLike;

  constructor(source: NodeFSLike, useCaseSensitiveFileNames: boolean) {
    this.source = source;
    this.inner = fromFS(source, useCaseSensitiveFileNames);
  }

  fsys(): NodeFSLike {
    return this.source;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.inner.useCaseSensitiveFileNames();
  }

  fileExists(path: string): boolean {
    return this.inner.fileExists(path);
  }

  readFile(path: string): string | undefined {
    return this.inner.readFile(path);
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

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    this.inner.chtimes(path, accessTime, modifyTime);
  }

  directoryExists(path: string): boolean {
    return this.inner.directoryExists(path);
  }

  getAccessibleEntries(path: string) {
    return this.inner.getAccessibleEntries(path);
  }

  stat(path: string) {
    return this.inner.stat(path);
  }

  walkDir(root: string, walkFn: Parameters<FS["walkDir"]>[1]): void {
    this.inner.walkDir(root, walkFn);
  }

  realpath(path: string): string {
    return this.inner.realpath(path);
  }
}

export function from(source: NodeFSLike, useCaseSensitiveFileNames: boolean): FsWithSys {
  return new IOFSWithSys(source, useCaseSensitiveFileNames);
}

export { from as From };
