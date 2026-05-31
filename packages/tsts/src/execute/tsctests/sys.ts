export type FileMap = Record<string, unknown>;

export const tscLibPath = "/home/src/tslibs/TS/Lib";

export const tscDefaultLibContent = `/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: unknown; }
interface Object {}
interface RegExp {}
interface String { charAt: unknown; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: unknown): void; };
`;

export function getTestLibPathFor(libName: string): string {
  const fileName = libName.startsWith("lib.") ? libName : `lib.${libName}.d.ts`;
  return `${tscLibPath}/${fileName}`;
}

export class TestClock {
  readonly start: Date;
  private current: Date | undefined;

  constructor(start: Date = new Date()) {
    this.start = start;
  }

  now(): Date {
    this.current = new Date((this.current ?? this.start).getTime() + 1000);
    return this.current;
  }

  sinceStart(): number {
    return this.now().getTime() - this.start.getTime();
  }
}

export interface TestFileRecord {
  readonly text: string;
  readonly mtime: Date;
}

export class TestFileSystem {
  readonly useCaseSensitiveFileNames: boolean;
  readonly defaultLibs = new Set<string>();
  readonly writtenFiles = new Set<string>();
  private readonly files = new Map<string, TestFileRecord>();
  private readonly clock: TestClock;

  constructor(files: FileMap, useCaseSensitiveFileNames: boolean, clock: TestClock) {
    this.useCaseSensitiveFileNames = useCaseSensitiveFileNames;
    this.clock = clock;
    for (const [path, value] of Object.entries(files)) {
      if (typeof value === "string") this.files.set(this.normalize(path), { text: value, mtime: clock.now() });
    }
  }

  normalize(path: string): string {
    return this.useCaseSensitiveFileNames ? path : path.toLowerCase();
  }

  readFile(path: string): string | undefined {
    this.defaultLibs.delete(this.normalize(path));
    return this.files.get(this.normalize(path))?.text;
  }

  writeFile(path: string, text: string): void {
    const normalized = this.normalize(path);
    this.defaultLibs.delete(normalized);
    this.writtenFiles.add(path);
    this.files.set(normalized, { text, mtime: this.clock.now() });
  }

  remove(path: string): void {
    const normalized = this.normalize(path);
    this.defaultLibs.delete(normalized);
    this.files.delete(normalized);
  }

  fileExists(path: string): boolean {
    return this.files.has(this.normalize(path));
  }

  getMTime(path: string): Date | undefined {
    return this.files.get(this.normalize(path))?.mtime;
  }

  setMTime(path: string, mtime: Date): void {
    const normalized = this.normalize(path);
    const existing = this.files.get(normalized);
    if (existing !== undefined) this.files.set(normalized, { text: existing.text, mtime });
  }

  getFiles(): readonly string[] {
    return [...this.files.keys()].sort();
  }

  snapshot(): FileMap {
    const out: FileMap = {};
    for (const [path, file] of this.files.entries()) out[path] = file.text;
    return out;
  }
}

export interface TscInput {
  readonly files: FileMap;
  readonly cwd?: string;
  readonly env?: Readonly<Record<string, string>>;
  readonly ignoreCase?: boolean;
  readonly windowsStyleRoot?: string;
}

export interface TestEmitResult {
  readonly emittedFiles: readonly string[];
}

export interface TestProgramBaselineFile {
  readonly fileName: string;
  readonly path?: string | undefined;
  readonly semanticDiagnosticsCached?: boolean | undefined;
  readonly semanticDiagnosticsRefreshed?: boolean | undefined;
  readonly signatureUpdateKind?: "computed-dts" | "stored-at-emit" | "used-version" | undefined;
  readonly hasIncludeReason?: boolean | undefined;
  readonly inProgramWithIncludeReason?: boolean | undefined;
}

export interface TestProgramBaseline {
  readonly configFilePath?: string | undefined;
  readonly files: readonly TestProgramBaselineFile[];
}

export class TestSys {
  readonly fs: TestFileSystem;
  readonly cwd: string;
  readonly clock: TestClock;
  readonly env: Readonly<Record<string, string>>;
  defaultLibraryPath: string;
  forIncrementalCorrectness = false;
  private output = "";
  private readonly traces: string[] = [];
  private readonly programBaselines: string[] = [];
  private readonly programIncludeBaselines: string[] = [];

  constructor(files: FileMap, useCaseSensitiveFileNames: boolean, cwd: string, env: Readonly<Record<string, string>> = {}) {
    this.cwd = cwd;
    this.clock = new TestClock();
    this.fs = new TestFileSystem(files, useCaseSensitiveFileNames, this.clock);
    this.env = env;
    this.defaultLibraryPath = tscLibPath;
    this.ensureLibPathExists("lib.d.ts");
  }

  now(): Date {
    return this.clock.now();
  }

  sinceStart(): number {
    return this.clock.sinceStart();
  }

  getCurrentDirectory(): string {
    return this.cwd;
  }

  getEnvironmentVariable(name: string): string {
    return this.env[name] ?? "";
  }

  write(text: string): void {
    this.output += text;
  }

  writeLine(text: string): void {
    this.write(`${text}\n`);
  }

  readFile(path: string): string | undefined {
    return this.fs.readFile(path);
  }

  writeFile(path: string, text: string): void {
    this.fs.writeFile(path, text);
  }

  removeFile(path: string): void {
    this.fs.remove(path);
  }

  renameFile(oldPath: string, newPath: string): void {
    this.writeFile(newPath, this.readFileNoError(oldPath));
    this.removeFile(oldPath);
  }

  ensureLibPathExists(path: string): void {
    const fullPath = `${this.defaultLibraryPath}/${path}`;
    if (!this.fs.fileExists(fullPath)) {
      this.fs.defaultLibs.add(this.fs.normalize(fullPath));
      this.fs.writeFile(fullPath, tscDefaultLibContent);
    }
  }

  onListFilesStart(): void { this.writeLine(listFileStart); }
  onListFilesEnd(): void { this.writeLine(listFileEnd); }
  onStatisticsStart(): void { this.writeLine(statisticsStart); }
  onStatisticsEnd(): void { this.writeLine(statisticsEnd); }
  onBuildStatusReportStart(): void { this.writeLine(buildStatusReportStart); }
  onBuildStatusReportEnd(): void { this.writeLine(buildStatusReportEnd); }
  onWatchStatusReportStart(): void { this.writeLine(watchStatusReportStart); }
  onWatchStatusReportEnd(): void { this.writeLine(watchStatusReportEnd); }

  getTrace(): (message: string, ...args: readonly unknown[]) => void {
    return (message, ...args) => {
      this.writeLine(traceStart);
      const localized = formatTrace(message, args);
      this.traces.push(localized);
      this.writeLine(localized);
      this.writeLine(traceEnd);
    };
  }

  onEmittedFiles(result: TestEmitResult | undefined, mtimesCache?: Map<string, Date> | undefined): void {
    if (result === undefined) return;
    for (const fileName of result.emittedFiles) {
      const modTime = this.fs.getMTime(fileName);
      const now = this.now();
      this.fs.setMTime(fileName, now);
      if (mtimesCache?.has(fileName) === true) {
        mtimesCache.set(fileName, now);
      } else if (modTime !== undefined && mtimesCache?.has(this.fs.normalize(fileName)) === true) {
        mtimesCache.set(this.fs.normalize(fileName), now);
      }
    }
  }

  addProgramBaseline(text: string): void {
    this.programBaselines.push(text);
  }

  addProgramIncludeBaseline(text: string): void {
    this.programIncludeBaselines.push(text);
  }

  onProgram(program: TestProgramBaseline): void {
    this.writeHeaderToBaseline(this.programBaselines, program.configFilePath);
    this.programBaselines.push("SemanticDiagnostics::\n");
    for (const file of program.files) {
      const prefix = file.semanticDiagnosticsCached === false
        ? "*not cached* "
        : file.semanticDiagnosticsRefreshed === true
          ? "*refresh*    "
          : "*cached*     ";
      this.programBaselines.push(`${prefix}${file.fileName}\n`);
    }

    this.programBaselines.push("Signatures::\n");
    for (const file of program.files) {
      if (file.signatureUpdateKind === undefined) continue;
      const prefix = signatureUpdateKindText(file.signatureUpdateKind);
      this.programBaselines.push(`${prefix} ${file.fileName}\n`);
    }

    const filesWithoutIncludeReason = program.files
      .filter((file) => file.hasIncludeReason === false)
      .map((file) => file.path ?? file.fileName);
    const fileNotInProgramWithIncludeReason = program.files
      .filter((file) => file.inProgramWithIncludeReason === false)
      .map((file) => file.path ?? file.fileName);
    if (filesWithoutIncludeReason.length !== 0 || fileNotInProgramWithIncludeReason.length !== 0) {
      this.writeHeaderToBaseline(this.programIncludeBaselines, program.configFilePath);
      this.programIncludeBaselines.push("!!! Expected all files to have include reasons\nfilesWithoutIncludeReason::\n");
      for (const file of filesWithoutIncludeReason) this.programIncludeBaselines.push(`  ${file}\n`);
      this.programIncludeBaselines.push("filesNotInProgramWithIncludeReason::\n");
      for (const file of fileNotInProgramWithIncludeReason) this.programIncludeBaselines.push(`  ${file}\n`);
    }
  }

  private writeHeaderToBaseline(target: string[], configFilePath: string | undefined): void {
    if (target.length !== 0) target.push("\n");
    if (configFilePath !== undefined && configFilePath !== "") {
      target.push(`${relativePathFromDirectory(this.cwd, configFilePath)}::\n`);
    }
  }

  baselinePrograms(header: string): string {
    const include = this.programIncludeBaselines.splice(0).join("");
    const programs = this.programBaselines.splice(0).join("");
    return include === "" ? programs : `${programs}\n\n${header}\n!!! Include reasons expectations don't match pls review!!!\n${include}`;
  }

  serializeState(): string {
    return `\nOutput::\n${this.getOutput(false)}\nFiles::\n${JSON.stringify(this.fs.snapshot(), undefined, 2)}`;
  }

  getOutput(forComparing: boolean): string {
    return sanitizeOutput(this.output, forComparing);
  }

  clearOutput(): void {
    this.output = "";
    this.traces.length = 0;
  }

  writeFileNoError(path: string, content: string): void {
    this.writeFile(path, content);
  }

  removeNoError(path: string): void {
    this.removeFile(path);
  }

  readFileNoError(path: string): string {
    const content = this.readFile(path);
    if (content === undefined) throw new Error(`File not found: ${path}`);
    return content;
  }

  renameFileNoError(oldPath: string, newPath: string): void {
    this.renameFile(oldPath, newPath);
  }

  replaceFileText(path: string, oldText: string, newText: string): void {
    const content = this.readFileNoError(path);
    this.writeFileNoError(path, content.replace(oldText, newText));
  }

  replaceFileTextAll(path: string, oldText: string, newText: string): void {
    const content = this.readFileNoError(path);
    this.writeFileNoError(path, content.split(oldText).join(newText));
  }

  appendFile(path: string, text: string): void {
    this.writeFileNoError(path, `${this.readFileNoError(path)}${text}`);
  }

  prependFile(path: string, text: string): void {
    this.writeFileNoError(path, `${text}${this.readFileNoError(path)}`);
  }
}

export function newTscSystem(files: FileMap, useCaseSensitiveFileNames: boolean, cwd: string): TestSys {
  return new TestSys(files, useCaseSensitiveFileNames, cwd);
}

export function newTestSys(input: TscInput, forIncrementalCorrectness = false): TestSys {
  const cwd = input.cwd ?? "/home/src/workspaces/project";
  const sys = new TestSys({ ...input.files }, input.ignoreCase !== true, cwd, input.env ?? {});
  sys.forIncrementalCorrectness = forIncrementalCorrectness;
  sys.defaultLibraryPath = input.windowsStyleRoot === undefined ? tscLibPath : `${input.windowsStyleRoot}${tscLibPath.slice(1)}`;
  sys.ensureLibPathExists("lib.d.ts");
  return sys;
}

export function getFileMapWithBuild(files: FileMap, commandLineArgs: readonly string[]): FileMap {
  void commandLineArgs;
  return { ...files };
}

const fakeTimeStamp = "HH:MM:SS AM";
const fakeDuration = "d.ddds";
const buildStartingAt = "build starting at ";
const buildFinishedIn = "build finished in ";
const listFileStart = "!!! List files start";
const listFileEnd = "!!! List files end";
const statisticsStart = "!!! Statistics start";
const statisticsEnd = "!!! Statistics end";
const buildStatusReportStart = "!!! Build Status Report Start";
const buildStatusReportEnd = "!!! Build Status Report End";
const watchStatusReportStart = "!!! Watch Status Report Start";
const watchStatusReportEnd = "!!! Watch Status Report End";
const traceStart = "!!! Trace start";
const traceEnd = "!!! Trace end";

function sanitizeOutput(output: string, forComparing: boolean): string {
  const lines = output.split("\n");
  const out: string[] = [];
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index]!;
    if (line.startsWith(buildStartingAt)) {
      if (!forComparing) out.push(`${buildStartingAt}${fakeTimeStamp}`);
      continue;
    }
    if (line.startsWith(buildFinishedIn)) {
      if (!forComparing) out.push(`${buildFinishedIn}${fakeDuration}`);
      continue;
    }
    if (skipDelimited(lines, index, listFileStart, listFileEnd)) {
      if (!forComparing) out.push(...sanitizeDelimitedLines(lines, index, listFileEnd, false));
      index = findDelimitedEnd(lines, index, listFileEnd);
      continue;
    }
    if (skipDelimited(lines, index, statisticsStart, statisticsEnd)) {
      index = findDelimitedEnd(lines, index, statisticsEnd);
      continue;
    }
    if (skipDelimited(lines, index, traceStart, traceEnd)) {
      if (!forComparing) out.push(...sanitizeDelimitedLines(lines, index, traceEnd, false));
      index = findDelimitedEnd(lines, index, traceEnd);
      continue;
    }
    if (skipDelimited(lines, index, buildStatusReportStart, buildStatusReportEnd)) {
      if (!forComparing) out.push(...sanitizeDelimitedLines(lines, index, buildStatusReportEnd, true));
      index = findDelimitedEnd(lines, index, buildStatusReportEnd);
      continue;
    }
    if (skipDelimited(lines, index, watchStatusReportStart, watchStatusReportEnd)) {
      if (!forComparing) out.push(...sanitizeDelimitedLines(lines, index, watchStatusReportEnd, true));
      index = findDelimitedEnd(lines, index, watchStatusReportEnd);
      continue;
    }
    out.push(line);
  }
  return out.join("\n");
}

function skipDelimited(lines: readonly string[], index: number, start: string, _end: string): boolean {
  return lines[index] === start;
}

function findDelimitedEnd(lines: readonly string[], index: number, end: string): number {
  for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
    if (lines[cursor] === end) return cursor;
  }
  throw new Error(`Expected lineEnd ${end} not found after ${lines[index] ?? ""}`);
}

function sanitizeDelimitedLines(lines: readonly string[], startIndex: number, end: string, sanitizeFirstLine: boolean): readonly string[] {
  const out: string[] = [];
  let isFirstLine = true;
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index]!;
    if (line === end) break;
    if (sanitizeFirstLine && isFirstLine) {
      out.push(sanitizeBuildStatusTimeStamp(line));
    } else {
      out.push(sanitizeVersionText(line));
    }
    isFirstLine = false;
  }
  return out;
}

function sanitizeBuildStatusTimeStamp(statusLine: string): string {
  const separator = statusLine.indexOf(":");
  if (separator < 2) throw new Error("Expected timestamp");
  return `${statusLine.slice(0, Math.max(0, separator - 2))}${fakeTimeStamp}${statusLine.slice(separator + fakeTimeStamp.length - 2)}`;
}

function sanitizeVersionText(text: string): string {
  return text.replace(/'\d+\.\d+\.\d+(?:-[^']*)?'/g, "'0.0.0'").replace(/\bVersion \d+\.\d+\.\d+(?:-[^\s]+)?/g, "Version 0.0.0");
}

function formatTrace(message: string, args: readonly unknown[]): string {
  if (args.length === 0) return sanitizeVersionText(message);
  let index = 0;
  return sanitizeVersionText(message.replace(/%[sdv]/g, () => String(args[index++] ?? "")));
}

function signatureUpdateKindText(kind: "computed-dts" | "stored-at-emit" | "used-version"): string {
  switch (kind) {
    case "computed-dts": return "(computed .d.ts)";
    case "stored-at-emit": return "(stored at emit)";
    case "used-version": return "(used version)  ";
  }
}

function relativePathFromDirectory(base: string, target: string): string {
  const baseParts = base.split("/").filter(Boolean);
  const targetParts = target.split("/").filter(Boolean);
  let common = 0;
  while (common < baseParts.length && common < targetParts.length && baseParts[common] === targetParts[common]) common += 1;
  const up = new Array<string>(baseParts.length - common).fill("..");
  const down = targetParts.slice(common);
  const result = [...up, ...down].join("/");
  return result === "" ? "." : result;
}
