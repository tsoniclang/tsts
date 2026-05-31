import type { Entries, FileInfo, FS, WalkDirFunc } from "../../vfs/vfs.js";

export interface RecordedOperation {
  readonly method: string;
  readonly path?: string;
  readonly data?: string;
}

export class RecorderFS implements FS {
  readonly operations: RecordedOperation[] = [];
  private readonly inner: FS;

  constructor(inner: FS) {
    this.inner = inner;
  }

  useCaseSensitiveFileNames(): boolean {
    this.operations.push({ method: "useCaseSensitiveFileNames" });
    return this.inner.useCaseSensitiveFileNames();
  }

  fileExists(path: string): boolean {
    this.operations.push({ method: "fileExists", path });
    return this.inner.fileExists(path);
  }

  readFile(path: string): string | undefined {
    this.operations.push({ method: "readFile", path });
    return this.inner.readFile(path);
  }

  writeFile(path: string, data: string): void {
    this.operations.push({ method: "writeFile", path, data });
    this.inner.writeFile(path, data);
  }

  appendFile(path: string, data: string): void {
    this.operations.push({ method: "appendFile", path, data });
    this.inner.appendFile(path, data);
  }

  remove(path: string): void {
    this.operations.push({ method: "remove", path });
    this.inner.remove(path);
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    this.operations.push({ method: "chtimes", path });
    this.inner.chtimes(path, accessTime, modifyTime);
  }

  directoryExists(path: string): boolean {
    this.operations.push({ method: "directoryExists", path });
    return this.inner.directoryExists(path);
  }

  getAccessibleEntries(path: string): Entries {
    this.operations.push({ method: "getAccessibleEntries", path });
    return this.inner.getAccessibleEntries(path);
  }

  stat(path: string): FileInfo | undefined {
    this.operations.push({ method: "stat", path });
    return this.inner.stat(path);
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    this.operations.push({ method: "walkDir", path: root });
    this.inner.walkDir(root, walkFn);
  }

  realpath(path: string): string {
    this.operations.push({ method: "realpath", path });
    return this.inner.realpath(path);
  }
}
