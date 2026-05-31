import type { Entries, FileInfo, FS, WalkDirFunc } from "../vfs.js";

export interface AppendFileCall {
  readonly path: string;
  readonly data: string;
}

export interface ChtimesCall {
  readonly path: string;
  readonly accessTime: Date;
  readonly modifyTime: Date;
}

export interface PathCall {
  readonly path: string;
}

export interface WalkDirCall {
  readonly root: string;
  readonly walkFn: WalkDirFunc;
}

export class FSMock implements FS {
  appendFileFunc?: (path: string, data: string) => void;
  chtimesFunc?: (path: string, accessTime: Date, modifyTime: Date) => void;
  directoryExistsFunc?: (path: string) => boolean;
  fileExistsFunc?: (path: string) => boolean;
  getAccessibleEntriesFunc?: (path: string) => Entries;
  readFileFunc?: (path: string) => string | undefined;
  realpathFunc?: (path: string) => string;
  removeFunc?: (path: string) => void;
  statFunc?: (path: string) => FileInfo | undefined;
  useCaseSensitiveFileNamesFunc?: () => boolean;
  walkDirFunc?: (root: string, walkFn: WalkDirFunc) => void;
  writeFileFunc?: (path: string, data: string) => void;

  private appendFileCallList: AppendFileCall[] = [];
  private chtimesCallList: ChtimesCall[] = [];
  private directoryExistsCallList: PathCall[] = [];
  private fileExistsCallList: PathCall[] = [];
  private getAccessibleEntriesCallList: PathCall[] = [];
  private readFileCallList: PathCall[] = [];
  private realpathCallList: PathCall[] = [];
  private removeCallList: PathCall[] = [];
  private statCallList: PathCall[] = [];
  private useCaseSensitiveFileNamesCallCount = 0;
  private walkDirCallList: WalkDirCall[] = [];
  private writeFileCallList: AppendFileCall[] = [];

  appendFile(path: string, data: string): void {
    if (this.appendFileFunc === undefined) throw new Error("FSMock.appendFileFunc is not configured");
    this.appendFileCallList.push({ path, data });
    this.appendFileFunc(path, data);
  }

  appendFileCalls(): readonly AppendFileCall[] {
    return [...this.appendFileCallList];
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    if (this.chtimesFunc === undefined) throw new Error("FSMock.chtimesFunc is not configured");
    this.chtimesCallList.push({ path, accessTime, modifyTime });
    this.chtimesFunc(path, accessTime, modifyTime);
  }

  chtimesCalls(): readonly ChtimesCall[] {
    return [...this.chtimesCallList];
  }

  directoryExists(path: string): boolean {
    if (this.directoryExistsFunc === undefined) throw new Error("FSMock.directoryExistsFunc is not configured");
    this.directoryExistsCallList.push({ path });
    return this.directoryExistsFunc(path);
  }

  directoryExistsCalls(): readonly PathCall[] {
    return [...this.directoryExistsCallList];
  }

  fileExists(path: string): boolean {
    if (this.fileExistsFunc === undefined) throw new Error("FSMock.fileExistsFunc is not configured");
    this.fileExistsCallList.push({ path });
    return this.fileExistsFunc(path);
  }

  fileExistsCalls(): readonly PathCall[] {
    return [...this.fileExistsCallList];
  }

  getAccessibleEntries(path: string): Entries {
    if (this.getAccessibleEntriesFunc === undefined) throw new Error("FSMock.getAccessibleEntriesFunc is not configured");
    this.getAccessibleEntriesCallList.push({ path });
    return this.getAccessibleEntriesFunc(path);
  }

  getAccessibleEntriesCalls(): readonly PathCall[] {
    return [...this.getAccessibleEntriesCallList];
  }

  readFile(path: string): string | undefined {
    if (this.readFileFunc === undefined) throw new Error("FSMock.readFileFunc is not configured");
    this.readFileCallList.push({ path });
    return this.readFileFunc(path);
  }

  readFileCalls(): readonly PathCall[] {
    return [...this.readFileCallList];
  }

  realpath(path: string): string {
    if (this.realpathFunc === undefined) throw new Error("FSMock.realpathFunc is not configured");
    this.realpathCallList.push({ path });
    return this.realpathFunc(path);
  }

  realpathCalls(): readonly PathCall[] {
    return [...this.realpathCallList];
  }

  remove(path: string): void {
    if (this.removeFunc === undefined) throw new Error("FSMock.removeFunc is not configured");
    this.removeCallList.push({ path });
    this.removeFunc(path);
  }

  removeCalls(): readonly PathCall[] {
    return [...this.removeCallList];
  }

  stat(path: string): FileInfo | undefined {
    if (this.statFunc === undefined) throw new Error("FSMock.statFunc is not configured");
    this.statCallList.push({ path });
    return this.statFunc(path);
  }

  statCalls(): readonly PathCall[] {
    return [...this.statCallList];
  }

  useCaseSensitiveFileNames(): boolean {
    if (this.useCaseSensitiveFileNamesFunc === undefined) throw new Error("FSMock.useCaseSensitiveFileNamesFunc is not configured");
    this.useCaseSensitiveFileNamesCallCount += 1;
    return this.useCaseSensitiveFileNamesFunc();
  }

  useCaseSensitiveFileNamesCalls(): number {
    return this.useCaseSensitiveFileNamesCallCount;
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    if (this.walkDirFunc === undefined) throw new Error("FSMock.walkDirFunc is not configured");
    this.walkDirCallList.push({ root, walkFn });
    this.walkDirFunc(root, walkFn);
  }

  walkDirCalls(): readonly WalkDirCall[] {
    return [...this.walkDirCallList];
  }

  writeFile(path: string, data: string): void {
    if (this.writeFileFunc === undefined) throw new Error("FSMock.writeFileFunc is not configured");
    this.writeFileCallList.push({ path, data });
    this.writeFileFunc(path, data);
  }

  writeFileCalls(): readonly AppendFileCall[] {
    return [...this.writeFileCallList];
  }
}
