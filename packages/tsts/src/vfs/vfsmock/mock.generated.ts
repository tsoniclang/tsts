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

  withAppendFileFunc(func: (path: string, data: string) => void): this {
    this.appendFileFunc = func;
    return this;
  }

  withChtimesFunc(func: (path: string, accessTime: Date, modifyTime: Date) => void): this {
    this.chtimesFunc = func;
    return this;
  }

  withDirectoryExistsFunc(func: (path: string) => boolean): this {
    this.directoryExistsFunc = func;
    return this;
  }

  withFileExistsFunc(func: (path: string) => boolean): this {
    this.fileExistsFunc = func;
    return this;
  }

  withGetAccessibleEntriesFunc(func: (path: string) => Entries): this {
    this.getAccessibleEntriesFunc = func;
    return this;
  }

  withReadFileFunc(func: (path: string) => string | undefined): this {
    this.readFileFunc = func;
    return this;
  }

  withRealpathFunc(func: (path: string) => string): this {
    this.realpathFunc = func;
    return this;
  }

  withRemoveFunc(func: (path: string) => void): this {
    this.removeFunc = func;
    return this;
  }

  withStatFunc(func: (path: string) => FileInfo | undefined): this {
    this.statFunc = func;
    return this;
  }

  withUseCaseSensitiveFileNamesFunc(func: () => boolean): this {
    this.useCaseSensitiveFileNamesFunc = func;
    return this;
  }

  withWalkDirFunc(func: (root: string, walkFn: WalkDirFunc) => void): this {
    this.walkDirFunc = func;
    return this;
  }

  withWriteFileFunc(func: (path: string, data: string) => void): this {
    this.writeFileFunc = func;
    return this;
  }

  configureDefaults(): this {
    this.appendFileFunc ??= () => undefined;
    this.chtimesFunc ??= () => undefined;
    this.directoryExistsFunc ??= () => false;
    this.fileExistsFunc ??= () => false;
    this.getAccessibleEntriesFunc ??= () => ({ files: [], directories: [] });
    this.readFileFunc ??= () => undefined;
    this.realpathFunc ??= path => path;
    this.removeFunc ??= () => undefined;
    this.statFunc ??= () => undefined;
    this.useCaseSensitiveFileNamesFunc ??= () => true;
    this.walkDirFunc ??= () => undefined;
    this.writeFileFunc ??= () => undefined;
    return this;
  }

  resetCalls(): void {
    this.appendFileCallList = [];
    this.chtimesCallList = [];
    this.directoryExistsCallList = [];
    this.fileExistsCallList = [];
    this.getAccessibleEntriesCallList = [];
    this.readFileCallList = [];
    this.realpathCallList = [];
    this.removeCallList = [];
    this.statCallList = [];
    this.useCaseSensitiveFileNamesCallCount = 0;
    this.walkDirCallList = [];
    this.writeFileCallList = [];
  }

  configureFrom(fs: FS): void {
    this.appendFileFunc = (path, data) => fs.appendFile(path, data);
    this.chtimesFunc = (path, accessTime, modifyTime) => fs.chtimes(path, accessTime, modifyTime);
    this.directoryExistsFunc = (path) => fs.directoryExists(path);
    this.fileExistsFunc = (path) => fs.fileExists(path);
    this.getAccessibleEntriesFunc = (path) => fs.getAccessibleEntries(path);
    this.readFileFunc = (path) => fs.readFile(path);
    this.realpathFunc = (path) => fs.realpath(path);
    this.removeFunc = (path) => fs.remove(path);
    this.statFunc = (path) => fs.stat(path);
    this.useCaseSensitiveFileNamesFunc = () => fs.useCaseSensitiveFileNames();
    this.walkDirFunc = (root, walkFn) => fs.walkDir(root, walkFn);
    this.writeFileFunc = (path, data) => fs.writeFile(path, data);
  }

  callCount(methodName: string): number {
    switch (methodName) {
      case "appendFile": return this.appendFileCallList.length;
      case "chtimes": return this.chtimesCallList.length;
      case "directoryExists": return this.directoryExistsCallList.length;
      case "fileExists": return this.fileExistsCallList.length;
      case "getAccessibleEntries": return this.getAccessibleEntriesCallList.length;
      case "readFile": return this.readFileCallList.length;
      case "realpath": return this.realpathCallList.length;
      case "remove": return this.removeCallList.length;
      case "stat": return this.statCallList.length;
      case "useCaseSensitiveFileNames": return this.useCaseSensitiveFileNamesCallCount;
      case "walkDir": return this.walkDirCallList.length;
      case "writeFile": return this.writeFileCallList.length;
      default: return 0;
    }
  }

  callSummary(): ReadonlyMap<string, number> {
    return new Map([
      ["appendFile", this.appendFileCallList.length],
      ["chtimes", this.chtimesCallList.length],
      ["directoryExists", this.directoryExistsCallList.length],
      ["fileExists", this.fileExistsCallList.length],
      ["getAccessibleEntries", this.getAccessibleEntriesCallList.length],
      ["readFile", this.readFileCallList.length],
      ["realpath", this.realpathCallList.length],
      ["remove", this.removeCallList.length],
      ["stat", this.statCallList.length],
      ["useCaseSensitiveFileNames", this.useCaseSensitiveFileNamesCallCount],
      ["walkDir", this.walkDirCallList.length],
      ["writeFile", this.writeFileCallList.length],
    ]);
  }

  requireCallCount(methodName: string, expected: number): void {
    const actual = this.callCount(methodName);
    if (actual !== expected) {
      throw new Error(`FSMock.${methodName} call count mismatch: expected ${expected}, got ${actual}`);
    }
  }

  requireNoCalls(methodName: string): void {
    this.requireCallCount(methodName, 0);
  }

  requireOnlyCalls(methodNames: readonly string[]): void {
    const allowed = new Set(methodNames);
    for (const [methodName, count] of this.callSummary()) {
      if (count !== 0 && !allowed.has(methodName)) {
        throw new Error(`FSMock.${methodName} was called ${count} time(s), but only ${methodNames.join(", ")} were expected`);
      }
    }
  }

  allCalls(): readonly { readonly method: string; readonly args: readonly unknown[] }[] {
    return [
      ...this.appendFileCallList.map((call) => ({ method: "appendFile", args: [call.path, call.data] })),
      ...this.chtimesCallList.map((call) => ({ method: "chtimes", args: [call.path, call.accessTime, call.modifyTime] })),
      ...this.directoryExistsCallList.map((call) => ({ method: "directoryExists", args: [call.path] })),
      ...this.fileExistsCallList.map((call) => ({ method: "fileExists", args: [call.path] })),
      ...this.getAccessibleEntriesCallList.map((call) => ({ method: "getAccessibleEntries", args: [call.path] })),
      ...this.readFileCallList.map((call) => ({ method: "readFile", args: [call.path] })),
      ...this.realpathCallList.map((call) => ({ method: "realpath", args: [call.path] })),
      ...this.removeCallList.map((call) => ({ method: "remove", args: [call.path] })),
      ...this.statCallList.map((call) => ({ method: "stat", args: [call.path] })),
      ...Array.from({ length: this.useCaseSensitiveFileNamesCallCount }, () => ({ method: "useCaseSensitiveFileNames", args: [] })),
      ...this.walkDirCallList.map((call) => ({ method: "walkDir", args: [call.root, call.walkFn] })),
      ...this.writeFileCallList.map((call) => ({ method: "writeFile", args: [call.path, call.data] })),
    ];
  }

  appendFile(path: string, data: string): void {
    if (this.appendFileFunc === undefined) throw new Error("FSMock.appendFileFunc is not configured");
    this.appendFileCallList.push({ path, data });
    this.appendFileFunc(path, data);
  }

  appendFileCalls(): readonly AppendFileCall[] {
    return [...this.appendFileCallList];
  }

  lastAppendFileCall(): AppendFileCall | undefined {
    return this.appendFileCallList[this.appendFileCallList.length - 1];
  }

  clearAppendFileCalls(): void {
    this.appendFileCallList = [];
  }

  chtimes(path: string, accessTime: Date, modifyTime: Date): void {
    if (this.chtimesFunc === undefined) throw new Error("FSMock.chtimesFunc is not configured");
    this.chtimesCallList.push({ path, accessTime, modifyTime });
    this.chtimesFunc(path, accessTime, modifyTime);
  }

  chtimesCalls(): readonly ChtimesCall[] {
    return [...this.chtimesCallList];
  }

  lastChtimesCall(): ChtimesCall | undefined {
    return this.chtimesCallList[this.chtimesCallList.length - 1];
  }

  clearChtimesCalls(): void {
    this.chtimesCallList = [];
  }

  directoryExists(path: string): boolean {
    if (this.directoryExistsFunc === undefined) throw new Error("FSMock.directoryExistsFunc is not configured");
    this.directoryExistsCallList.push({ path });
    return this.directoryExistsFunc(path);
  }

  directoryExistsCalls(): readonly PathCall[] {
    return [...this.directoryExistsCallList];
  }

  lastDirectoryExistsCall(): PathCall | undefined {
    return this.directoryExistsCallList[this.directoryExistsCallList.length - 1];
  }

  clearDirectoryExistsCalls(): void {
    this.directoryExistsCallList = [];
  }

  fileExists(path: string): boolean {
    if (this.fileExistsFunc === undefined) throw new Error("FSMock.fileExistsFunc is not configured");
    this.fileExistsCallList.push({ path });
    return this.fileExistsFunc(path);
  }

  fileExistsCalls(): readonly PathCall[] {
    return [...this.fileExistsCallList];
  }

  lastFileExistsCall(): PathCall | undefined {
    return this.fileExistsCallList[this.fileExistsCallList.length - 1];
  }

  clearFileExistsCalls(): void {
    this.fileExistsCallList = [];
  }

  getAccessibleEntries(path: string): Entries {
    if (this.getAccessibleEntriesFunc === undefined) throw new Error("FSMock.getAccessibleEntriesFunc is not configured");
    this.getAccessibleEntriesCallList.push({ path });
    return this.getAccessibleEntriesFunc(path);
  }

  getAccessibleEntriesCalls(): readonly PathCall[] {
    return [...this.getAccessibleEntriesCallList];
  }

  lastGetAccessibleEntriesCall(): PathCall | undefined {
    return this.getAccessibleEntriesCallList[this.getAccessibleEntriesCallList.length - 1];
  }

  clearGetAccessibleEntriesCalls(): void {
    this.getAccessibleEntriesCallList = [];
  }

  readFile(path: string): string | undefined {
    if (this.readFileFunc === undefined) throw new Error("FSMock.readFileFunc is not configured");
    this.readFileCallList.push({ path });
    return this.readFileFunc(path);
  }

  readFileCalls(): readonly PathCall[] {
    return [...this.readFileCallList];
  }

  lastReadFileCall(): PathCall | undefined {
    return this.readFileCallList[this.readFileCallList.length - 1];
  }

  clearReadFileCalls(): void {
    this.readFileCallList = [];
  }

  realpath(path: string): string {
    if (this.realpathFunc === undefined) throw new Error("FSMock.realpathFunc is not configured");
    this.realpathCallList.push({ path });
    return this.realpathFunc(path);
  }

  realpathCalls(): readonly PathCall[] {
    return [...this.realpathCallList];
  }

  lastRealpathCall(): PathCall | undefined {
    return this.realpathCallList[this.realpathCallList.length - 1];
  }

  clearRealpathCalls(): void {
    this.realpathCallList = [];
  }

  remove(path: string): void {
    if (this.removeFunc === undefined) throw new Error("FSMock.removeFunc is not configured");
    this.removeCallList.push({ path });
    this.removeFunc(path);
  }

  removeCalls(): readonly PathCall[] {
    return [...this.removeCallList];
  }

  lastRemoveCall(): PathCall | undefined {
    return this.removeCallList[this.removeCallList.length - 1];
  }

  clearRemoveCalls(): void {
    this.removeCallList = [];
  }

  stat(path: string): FileInfo | undefined {
    if (this.statFunc === undefined) throw new Error("FSMock.statFunc is not configured");
    this.statCallList.push({ path });
    return this.statFunc(path);
  }

  statCalls(): readonly PathCall[] {
    return [...this.statCallList];
  }

  lastStatCall(): PathCall | undefined {
    return this.statCallList[this.statCallList.length - 1];
  }

  clearStatCalls(): void {
    this.statCallList = [];
  }

  useCaseSensitiveFileNames(): boolean {
    if (this.useCaseSensitiveFileNamesFunc === undefined) throw new Error("FSMock.useCaseSensitiveFileNamesFunc is not configured");
    this.useCaseSensitiveFileNamesCallCount += 1;
    return this.useCaseSensitiveFileNamesFunc();
  }

  useCaseSensitiveFileNamesCalls(): number {
    return this.useCaseSensitiveFileNamesCallCount;
  }

  clearUseCaseSensitiveFileNamesCalls(): void {
    this.useCaseSensitiveFileNamesCallCount = 0;
  }

  walkDir(root: string, walkFn: WalkDirFunc): void {
    if (this.walkDirFunc === undefined) throw new Error("FSMock.walkDirFunc is not configured");
    this.walkDirCallList.push({ root, walkFn });
    this.walkDirFunc(root, walkFn);
  }

  walkDirCalls(): readonly WalkDirCall[] {
    return [...this.walkDirCallList];
  }

  lastWalkDirCall(): WalkDirCall | undefined {
    return this.walkDirCallList[this.walkDirCallList.length - 1];
  }

  clearWalkDirCalls(): void {
    this.walkDirCallList = [];
  }

  writeFile(path: string, data: string): void {
    if (this.writeFileFunc === undefined) throw new Error("FSMock.writeFileFunc is not configured");
    this.writeFileCallList.push({ path, data });
    this.writeFileFunc(path, data);
  }

  writeFileCalls(): readonly AppendFileCall[] {
    return [...this.writeFileCallList];
  }

  lastWriteFileCall(): AppendFileCall | undefined {
    return this.writeFileCallList[this.writeFileCallList.length - 1];
  }

  clearWriteFileCalls(): void {
    this.writeFileCallList = [];
  }

  snapshotCalls(): FSMockCallSnapshot {
    return {
      appendFile: this.appendFileCalls(),
      chtimes: this.chtimesCalls(),
      directoryExists: this.directoryExistsCalls(),
      fileExists: this.fileExistsCalls(),
      getAccessibleEntries: this.getAccessibleEntriesCalls(),
      readFile: this.readFileCalls(),
      realpath: this.realpathCalls(),
      remove: this.removeCalls(),
      stat: this.statCalls(),
      useCaseSensitiveFileNames: this.useCaseSensitiveFileNamesCalls(),
      walkDir: this.walkDirCalls(),
      writeFile: this.writeFileCalls(),
    };
  }

  restoreCalls(snapshot: FSMockCallSnapshot): void {
    this.appendFileCallList = [...snapshot.appendFile];
    this.chtimesCallList = [...snapshot.chtimes];
    this.directoryExistsCallList = [...snapshot.directoryExists];
    this.fileExistsCallList = [...snapshot.fileExists];
    this.getAccessibleEntriesCallList = [...snapshot.getAccessibleEntries];
    this.readFileCallList = [...snapshot.readFile];
    this.realpathCallList = [...snapshot.realpath];
    this.removeCallList = [...snapshot.remove];
    this.statCallList = [...snapshot.stat];
    this.useCaseSensitiveFileNamesCallCount = snapshot.useCaseSensitiveFileNames;
    this.walkDirCallList = [...snapshot.walkDir];
    this.writeFileCallList = [...snapshot.writeFile];
  }
}

export interface FSMockCallSnapshot {
  readonly appendFile: readonly AppendFileCall[];
  readonly chtimes: readonly ChtimesCall[];
  readonly directoryExists: readonly PathCall[];
  readonly fileExists: readonly PathCall[];
  readonly getAccessibleEntries: readonly PathCall[];
  readonly readFile: readonly PathCall[];
  readonly realpath: readonly PathCall[];
  readonly remove: readonly PathCall[];
  readonly stat: readonly PathCall[];
  readonly useCaseSensitiveFileNames: number;
  readonly walkDir: readonly WalkDirCall[];
  readonly writeFile: readonly AppendFileCall[];
}
