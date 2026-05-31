import { normalizeNewlines } from "../stringtestutil/stringTestUtil.js";
import type { Diagnostic, SourceFile } from "../../ast/index.js";
import { NewLineKind, type CompilerOptions } from "../../core/index.js";
import { newProgram, type CompilerHost, type EmitResult, type Program } from "../../compiler/program.js";
import { optionDeclarations, type CommandLineOption } from "../../tsoptions/index.js";
import { parseListTypeOption } from "../../tsoptions/commandLineParser.js";
import { ParsedCommandLine } from "../../tsoptions/parsedCommandLine.js";
import { ensureTrailingDirectorySeparator, getDirectoryPath, hasJSFileExtension, hasJSONFileExtension, isDeclarationFileName, normalizePath } from "../../tspath/index.js";
import { getDeclarationEmitOutputFilePath, getOutputJSFileNameWorker, type OutputPathsHost } from "../../outputpaths/index.js";
import { parseSourceFile } from "../../parser/index.js";

export interface NamedSource {
  readonly name: string;
  readonly content: string;
}

export function splitSources(text: string): readonly NamedSource[] {
  const normalized = normalizeNewlines(text);
  const parts = normalized.split(/^\/\/\/\/\s*(.+)$/m);
  if (parts.length === 1) return [{ name: "input.ts", content: normalized }];
  const out: NamedSource[] = [];
  for (let index = 1; index < parts.length; index += 2) {
    const name = parts[index]!.trim();
    const content = parts[index + 1] ?? "";
    out.push({ name, content: content.replace(/^\n/, "") });
  }
  return out;
}

export function joinSources(sources: readonly NamedSource[]): string {
  return sources.map((source) => `//// ${source.name}\n${source.content}`).join("\n");
}

export function normalizeBaselinePath(path: string): string {
  return path.replace(/\\/g, "/").replace(/^[A-Za-z]:/, "");
}

export const testLibFolder = "/.lib";
export const fakeTSVersion = "FakeTSVersion";

export interface TestFile {
  readonly unitName: string;
  readonly content: string;
}

export type TestConfiguration = ReadonlyMap<string, string>;

export interface NamedTestConfiguration {
  readonly name: string;
  readonly config: TestConfiguration;
}

export interface HarnessOptions {
  useCaseSensitiveFileNames: boolean;
  baselineFile: string;
  includeBuiltFile: string;
  fileName: string;
  libFiles: readonly string[];
  noImplicitReferences: boolean;
  currentDirectory: string;
  symlink: string;
  link: string;
  noTypesAndSymbols: boolean;
  fullEmitPaths: boolean;
  reportDiagnostics: boolean;
  captureSuggestions: boolean;
  typescriptVersion: string;
}

export interface HarnessCommandLineOption {
  readonly name: string;
  readonly type: "string" | "number" | "boolean" | "list";
}

export const harnessCommandLineOptions: readonly HarnessCommandLineOption[] = [
  { name: "useCaseSensitiveFileNames", type: "boolean" },
  { name: "baselineFile", type: "string" },
  { name: "includeBuiltFile", type: "string" },
  { name: "fileName", type: "string" },
  { name: "libFiles", type: "list" },
  { name: "noImplicitReferences", type: "boolean" },
  { name: "currentDirectory", type: "string" },
  { name: "symlink", type: "string" },
  { name: "link", type: "string" },
  { name: "noTypesAndSymbols", type: "boolean" },
  { name: "fullEmitPaths", type: "boolean" },
  { name: "reportDiagnostics", type: "boolean" },
  { name: "captureSuggestions", type: "boolean" },
];

export function defaultHarnessOptions(currentDirectory: string): HarnessOptions {
  return {
    useCaseSensitiveFileNames: true,
    baselineFile: "",
    includeBuiltFile: "",
    fileName: "",
    libFiles: [],
    noImplicitReferences: false,
    currentDirectory,
    symlink: "",
    link: "",
    noTypesAndSymbols: false,
    fullEmitPaths: false,
    reportDiagnostics: false,
    captureSuggestions: false,
    typescriptVersion: "",
  };
}

export interface CompilationResult {
  readonly program: Program;
  readonly inputFiles: readonly TestFile[];
  readonly otherFiles: readonly TestFile[];
  readonly harnessOptions: HarnessOptions;
  readonly compilerOptions: CompilerOptions;
  readonly result: EmitResult;
  readonly currentDirectory: string;
  readonly files: ReadonlyMap<string, string>;
  readonly js: ReadonlyMap<string, TestFile>;
  readonly dts: ReadonlyMap<string, TestFile>;
  readonly maps: ReadonlyMap<string, TestFile>;
  readonly outputFiles: readonly TestFile[];
  readonly inputsAndOutputs: ReadonlyMap<string, CompilationOutput>;
  readonly diagnostics: readonly Diagnostic[];
  readonly symlinks: ReadonlyMap<string, string>;
  readonly trace: string;
  readonly getNumberOfJSFiles: (includeJson: boolean) => number;
  readonly inputs: () => readonly TestFile[];
  readonly outputs: () => readonly TestFile[];
  readonly getInputsAndOutputsForFile: (path: string) => CompilationOutput | undefined;
  readonly getInputsForFile: (path: string) => readonly TestFile[] | undefined;
  readonly getOutput: (path: string, kind: "js" | "dts" | "map") => TestFile | undefined;
  readonly repeat: (testConfig: TestConfiguration) => CompilationResult;
}

export interface CompilationOutput {
  readonly inputs: readonly TestFile[];
  readonly js?: TestFile;
  readonly dts?: TestFile;
  readonly map?: TestFile;
}

export interface CompileFilesOptions {
  readonly inputFiles: readonly TestFile[];
  readonly otherFiles?: readonly TestFile[];
  readonly testConfig?: TestConfiguration;
  readonly tsconfig?: ParsedCommandLine;
  readonly currentDirectory?: string;
  readonly symlinks?: ReadonlyMap<string, string> | Record<string, string>;
  readonly compilerOptions?: CompilerOptions;
  readonly harnessOptions?: Partial<HarnessOptions>;
}

export function compileFiles(options: CompileFilesOptions): CompilationResult {
  const currentDirectory = options.currentDirectory ?? "/";
  const compilerOptions = cloneCompilerOptions(options.compilerOptions);
  setDefaultCompilerOptionsForTests(compilerOptions);
  const harnessOptions = {
    ...defaultHarnessOptions(currentDirectory),
    ...(options.harnessOptions ?? {}),
  };
  if (options.testConfig !== undefined) {
    setOptionsFromTestConfig(options.testConfig, compilerOptions as Record<string, unknown>, harnessOptions, currentDirectory, false);
  }
  const exOptions: {
    inputFiles: readonly TestFile[];
    otherFiles: readonly TestFile[];
    harnessOptions: HarnessOptions;
    compilerOptions: CompilerOptions;
    currentDirectory: string;
    symlinks: ReadonlyMap<string, string>;
    tsconfig?: ParsedCommandLine;
  } = {
    inputFiles: options.inputFiles,
    otherFiles: options.otherFiles ?? [],
    harnessOptions,
    compilerOptions,
    currentDirectory,
    symlinks: toReadonlyMap(options.symlinks ?? new Map()),
  };
  if (options.tsconfig !== undefined) exOptions.tsconfig = options.tsconfig;
  return compileFilesEx(exOptions);
}

export function compileFilesEx(options: {
  readonly inputFiles: readonly TestFile[];
  readonly otherFiles: readonly TestFile[];
  readonly harnessOptions: HarnessOptions;
  readonly compilerOptions: CompilerOptions;
  readonly currentDirectory: string;
  readonly symlinks: ReadonlyMap<string, string>;
  readonly tsconfig?: ParsedCommandLine;
}): CompilationResult {
  normalizeCompilerOptionPaths(options.compilerOptions, options.currentDirectory);
  const programFileNames: string[] = [];
  for (const file of options.inputFiles) {
    const fileName = normalizedAbsolutePath(file.unitName, options.currentDirectory);
    if (!fileName.endsWith(".json") && !fileName.endsWith(".tsbuildinfo")) {
      programFileNames.push(fileName);
    }
  }

  const files = new Map<string, string>();
  addTestFiles(files, options.inputFiles, options.currentDirectory);
  addTestFiles(files, options.otherFiles, options.currentDirectory);
  if (shouldIncludeLibDir(options.inputFiles, options.harnessOptions.libFiles)) {
    for (const libFile of options.harnessOptions.libFiles) {
      if (libFile === "lib.d.ts" && !compilerOptionIsTrue(options.compilerOptions.noLib)) continue;
      const fileName = normalizePath(`${testLibFolder}/${libFile}`);
      if (!programFileNames.includes(fileName)) programFileNames.push(fileName);
      if (!files.has(fileName)) files.set(fileName, "");
    }
  }

  const host = new HarnessCompilerHost(files, options.symlinks, options.currentDirectory, options.harnessOptions.useCaseSensitiveFileNames);
  const parsed = options.tsconfig ?? new ParsedCommandLine(
    options.compilerOptions,
    programFileNames,
    {
      currentDirectory: options.currentDirectory,
      useCaseSensitiveFileNames: options.harnessOptions.useCaseSensitiveFileNames,
    },
  );
  const program = newProgram({ config: parsed, host });
  const compilerContext = {} as Parameters<Program["emit"]>[0];
  const diagnostics = [
    ...program.getConfigFileParsingDiagnostics(),
    ...program.getSyntacticDiagnostics(compilerContext, undefined),
    ...program.getSemanticDiagnostics(compilerContext, undefined),
    ...program.getGlobalDiagnostics(compilerContext),
  ];
  if (compilerOptionsEmitDeclarations(program.options())) {
    diagnostics.push(...program.getDeclarationDiagnostics(compilerContext, undefined));
  }
  if (options.harnessOptions.captureSuggestions) {
    diagnostics.push(...program.getSuggestionDiagnostics(compilerContext, undefined));
  }
  const emitResult = program.emit(compilerContext, {
    writeFile: (fileName, text) => host.writeFile(fileName, text),
  });
  diagnostics.push(...emitResult.diagnostics);
  const fileSnapshot = host.snapshotFiles();
  const outputRecord = collectCompilationOutputs(fileSnapshot, program, options.currentDirectory);
  return {
    program,
    inputFiles: options.inputFiles,
    otherFiles: options.otherFiles,
    harnessOptions: options.harnessOptions,
    compilerOptions: options.compilerOptions,
    result: emitResult,
    currentDirectory: options.currentDirectory,
    files: fileSnapshot,
    js: outputRecord.js,
    dts: outputRecord.dts,
    maps: outputRecord.maps,
    outputFiles: outputRecord.outputs,
    inputsAndOutputs: outputRecord.inputsAndOutputs,
    diagnostics,
    symlinks: options.symlinks,
    trace: host.trace.join("\n"),
    getNumberOfJSFiles: (includeJson) => getNumberOfJSFiles(outputRecord.js, includeJson),
    inputs: () => outputRecord.inputs,
    outputs: () => outputRecord.outputs,
    getInputsAndOutputsForFile: (path) => outputRecord.inputsAndOutputs.get(normalizedAbsolutePath(path, options.currentDirectory)),
    getInputsForFile: (path) => outputRecord.inputsAndOutputs.get(normalizedAbsolutePath(path, options.currentDirectory))?.inputs,
    getOutput: (path, kind) => outputRecord.inputsAndOutputs.get(normalizedAbsolutePath(path, options.currentDirectory))?.[kind],
    repeat: (testConfig) => {
      const repeatBase = {
        inputFiles: options.inputFiles,
        otherFiles: options.otherFiles,
        testConfig,
        currentDirectory: options.currentDirectory,
        symlinks: options.symlinks,
        compilerOptions: options.compilerOptions,
        harnessOptions: options.harnessOptions,
      };
      const repeatOptions: CompileFilesOptions = options.tsconfig === undefined
        ? repeatBase
        : { ...repeatBase, tsconfig: options.tsconfig };
      return compileFiles(repeatOptions);
    },
  };
}

export function getOptionValue(testConfig: TestConfiguration, name: string): string | undefined {
  for (const [key, value] of testConfig) {
    if (key.toLowerCase() === name.toLowerCase()) return value;
  }
  return undefined;
}

export function getSourceFile(result: CompilationResult, fileName: string): SourceFile | undefined {
  return result.program.getSourceFile(normalizedAbsolutePath(fileName, result.currentDirectory));
}

export function newTracerForBaselining(currentDirectory: string, useCaseSensitiveFileNames: boolean): TracerForBaselining {
  return new TracerForBaselining(currentDirectory, useCaseSensitiveFileNames);
}

export function traceWithWriter(currentDirectory: string, useCaseSensitiveFileNames: boolean, write: (line: string) => void): TracerForBaselining {
  const tracer = new TracerForBaselining(currentDirectory, useCaseSensitiveFileNames);
  const originalTrace = tracer.trace.bind(tracer);
  tracer.trace = (message: string) => {
    originalTrace(message);
    write(tracer.toString().split("\n").at(-1) ?? message);
  };
  return tracer;
}

export function createCompilerHost(
  files: ReadonlyMap<string, string>,
  symlinks: ReadonlyMap<string, string>,
  currentDirectory: string,
  useCaseSensitiveFileNames: boolean,
): HarnessCompilerHost {
  return new HarnessCompilerHost(files, symlinks, currentDirectory, useCaseSensitiveFileNames);
}

export function compileFilesWithHost(
  inputFiles: readonly TestFile[],
  host: HarnessCompilerHost,
  compilerOptions: CompilerOptions,
  currentDirectory: string,
): CompilationResult {
  const parsed = new ParsedCommandLine(
    compilerOptions,
    inputFiles.map(file => normalizedAbsolutePath(file.unitName, currentDirectory)),
    { currentDirectory, useCaseSensitiveFileNames: host.useCaseSensitiveFileNames() },
  );
  return compileFilesEx({
    inputFiles,
    otherFiles: [],
    harnessOptions: defaultHarnessOptions(currentDirectory),
    compilerOptions,
    currentDirectory,
    symlinks: new Map(),
    tsconfig: parsed,
  });
}

export function newCompilationResult(options: CompileFilesOptions): CompilationResult {
  return compileFiles(options);
}

export function getOutputPath(fileName: string, kind: "js" | "dts" | "map", compilerOptions: CompilerOptions, currentDirectory: string): string {
  const normalized = normalizedAbsolutePath(fileName, currentDirectory);
  const outputHost: OutputPathsHost = {
    commonSourceDirectory: () => ensureTrailingDirectorySeparator(getDirectoryPath(normalized)),
    getCurrentDirectory: () => currentDirectory,
    useCaseSensitiveFileNames: () => true,
  };
  switch (kind) {
    case "dts":
      return getDeclarationEmitOutputFilePath(normalized, compilerOptions, outputHost);
    case "map":
      return `${getOutputJSFileNameWorker(normalized, compilerOptions, outputHost)}.map`;
    default:
      return getOutputJSFileNameWorker(normalized, compilerOptions, outputHost);
  }
}

export function readBuildInfo(result: CompilationResult, fileName = ".tsbuildinfo"): string | undefined {
  return result.files.get(normalizedAbsolutePath(fileName, result.currentDirectory));
}

export function getTestBuildInfoReader(result: CompilationResult): (fileName: string) => string | undefined {
  return (fileName) => readBuildInfo(result, fileName);
}

export function createProgram(options: CompileFilesOptions): Program {
  return compileFiles(options).program;
}

export function enumerateFiles(files: ReadonlyMap<string, string>, root = "/"): readonly string[] {
  const normalizedRoot = normalizePath(root).replace(/\/+$/, "");
  return [...files.keys()]
    .filter(fileName => fileName === normalizedRoot || fileName.startsWith(normalizedRoot + "/"))
    .sort();
}

export function listFiles(files: ReadonlyMap<string, string>, root = "/"): readonly string[] {
  return enumerateFiles(files, root);
}

export function listFilesWorker(files: ReadonlyMap<string, string>, root: string, results: string[]): void {
  results.push(...enumerateFiles(files, root));
}

export function skipUnsupportedCompilerOptions(testConfig: TestConfiguration): TestConfiguration {
  const supported = new Map<string, string>();
  for (const [key, value] of testConfig) {
    if (getHarnessOption(key) !== undefined || getCommandLineOption(key) !== undefined) supported.set(key, value);
  }
  return supported;
}

export function setOptionsFromTestConfig(
  testConfig: TestConfiguration,
  compilerOptions: Record<string, unknown>,
  harnessOptions: HarnessOptions,
  currentDirectory: string,
  allowUnknownOptions: boolean,
): void {
  for (const [key, value] of testConfig) {
    const harnessOption = getHarnessOption(key);
    if (harnessOption !== undefined || key === "typescriptVersion") {
      parseHarnessOption(key, value, harnessOptions);
      continue;
    }
    const compilerOption = getCommandLineOption(key);
    if (compilerOption === undefined) {
      if (allowUnknownOptions) continue;
      throw new Error(`Unknown compiler option '${key}'.`);
    }
    compilerOptions[compilerOption.name] = parseCompilerOptionValue(compilerOption, value, currentDirectory);
  }
}

function parseCompilerOptionValue(option: CommandLineOption, value: string, currentDirectory: string): unknown {
  if (option.type === "boolean") return value.toLowerCase() === "true";
  if (option.type === "number") return Number(value);
  if (option.type === "list") {
    const list = requireStringListOption(option.name, value);
    const element = option.element ?? option.elements?.();
    return element?.isFilePath === true ? list.map(item => normalizedAbsolutePath(item, currentDirectory)) : list;
  }
  if (option.type instanceof Map) return getValueOfOptionString(option.name, value);
  if (option.isFilePath === true) return normalizedAbsolutePath(value, currentDirectory);
  return value;
}

function addTestFiles(files: Map<string, string>, testFiles: readonly TestFile[], currentDirectory: string): void {
  for (const file of testFiles) {
    files.set(normalizedAbsolutePath(file.unitName, currentDirectory), file.content);
  }
}

function normalizedAbsolutePath(fileName: string, currentDirectory: string): string {
  if (fileName.startsWith("/")) return normalizePath(fileName);
  return normalizePath(currentDirectory.replace(/\/+$/, "") + "/" + fileName);
}

function cloneCompilerOptions(options: CompilerOptions | undefined): CompilerOptions {
  if (options === undefined) return {} as CompilerOptions;
  return { ...(options as Record<string, unknown>) } as CompilerOptions;
}

function setDefaultCompilerOptionsForTests(options: CompilerOptions): void {
  const mutable = options as Record<string, unknown>;
  if (mutable.newLine === undefined || mutable.newLine === NewLineKind.None) mutable.newLine = NewLineKind.CRLF;
  if (mutable.skipDefaultLibCheck === undefined) mutable.skipDefaultLibCheck = true;
  mutable.noErrorTruncation = true;
}

function normalizeCompilerOptionPaths(options: CompilerOptions, currentDirectory: string): void {
  normalizeStringOptionPath(options, currentDirectory, "outDir");
  normalizeStringOptionPath(options, currentDirectory, "project");
  normalizeStringOptionPath(options, currentDirectory, "rootDir");
  normalizeStringOptionPath(options, currentDirectory, "tsBuildInfoFile");
  normalizeStringOptionPath(options, currentDirectory, "baseUrl");
  normalizeStringOptionPath(options, currentDirectory, "declarationDir");
  normalizeStringArrayOptionPath(options, currentDirectory, "rootDirs");
  normalizeStringArrayOptionPath(options, currentDirectory, "typeRoots");
}

function normalizeStringOptionPath(options: CompilerOptions, currentDirectory: string, key: keyof CompilerOptions): void {
  const mutable = options as Record<string, unknown>;
  const value = mutable[key];
  if (typeof value === "string" && value.length > 0) mutable[key] = normalizedAbsolutePath(value, currentDirectory);
}

function normalizeStringArrayOptionPath(options: CompilerOptions, currentDirectory: string, key: keyof CompilerOptions): void {
  const mutable = options as Record<string, unknown>;
  const value = mutable[key];
  if (Array.isArray(value)) mutable[key] = value.map(item => typeof item === "string" ? normalizedAbsolutePath(item, currentDirectory) : String(item));
}

function shouldIncludeLibDir(inputFiles: readonly TestFile[], libFiles: readonly string[]): boolean {
  if (libFiles.length > 0) return true;
  return inputFiles.some(file => file.content.includes(`${testLibFolder}/`));
}

function compilerOptionIsTrue(value: unknown): boolean {
  return value === true || value === 2;
}

function compilerOptionsEmitDeclarations(options: CompilerOptions): boolean {
  return compilerOptionIsTrue(options.declaration) || compilerOptionIsTrue(options.composite);
}

function toReadonlyMap(value: ReadonlyMap<string, string> | Record<string, string>): ReadonlyMap<string, string> {
  if (value instanceof Map) return value;
  return new Map(Object.entries(value));
}

interface CompilationOutputRecord {
  readonly inputs: readonly TestFile[];
  readonly outputs: readonly TestFile[];
  readonly js: ReadonlyMap<string, TestFile>;
  readonly dts: ReadonlyMap<string, TestFile>;
  readonly maps: ReadonlyMap<string, TestFile>;
  readonly inputsAndOutputs: ReadonlyMap<string, CompilationOutput>;
}

function collectCompilationOutputs(files: ReadonlyMap<string, string>, program: Program, currentDirectory: string): CompilationOutputRecord {
  const inputs = program.getSourceFiles().map(file => ({
    unitName: normalizePath(file.fileName),
    content: file.text,
  }));
  const inputNames = new Set(inputs.map(file => file.unitName));
  const js = new Map<string, TestFile>();
  const dts = new Map<string, TestFile>();
  const maps = new Map<string, TestFile>();
  for (const [unitName, content] of files) {
    if (inputNames.has(unitName)) continue;
    const testFile = { unitName, content };
    if (isDeclarationFileName(unitName)) dts.set(unitName, testFile);
    else if (unitName.endsWith(".map")) maps.set(unitName, testFile);
    else if (hasJSFileExtension(unitName) || hasJSONFileExtension(unitName)) js.set(unitName, testFile);
  }

  const inputsAndOutputs = new Map<string, CompilationOutput>();
  const outputFiles: TestFile[] = [];
  const outputHost = {
    commonSourceDirectory: () => program.commonSourceDirectory(),
    getCurrentDirectory: () => currentDirectory,
    useCaseSensitiveFileNames: () => program.useCaseSensitiveFileNames(),
  };
  const compilerOptions = program.options();
  for (const input of inputs) {
    const output = outputForInput(input, js, dts, maps, compilerOptions, outputHost);
    inputsAndOutputs.set(input.unitName, output);
    if (output.js !== undefined) {
      inputsAndOutputs.set(output.js.unitName, output);
      outputFiles.push(output.js);
    }
    if (output.dts !== undefined) {
      inputsAndOutputs.set(output.dts.unitName, output);
      outputFiles.push(output.dts);
    }
    if (output.map !== undefined) {
      inputsAndOutputs.set(output.map.unitName, output);
      outputFiles.push(output.map);
    }
  }
  return { inputs, outputs: outputFiles.sort(compareTestFiles), js, dts, maps, inputsAndOutputs };
}

function outputForInput(
  input: TestFile,
  js: ReadonlyMap<string, TestFile>,
  dts: ReadonlyMap<string, TestFile>,
  maps: ReadonlyMap<string, TestFile>,
  compilerOptions: CompilerOptions,
  outputHost: {
    commonSourceDirectory(): string;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames(): boolean;
  },
): CompilationOutput {
  const output: {
    inputs: readonly TestFile[];
    js?: TestFile;
    dts?: TestFile;
    map?: TestFile;
  } = { inputs: [input] };
  const jsOutput = js.get(getOutputJSFileNameWorker(input.unitName, compilerOptions, outputHost));
  if (jsOutput !== undefined) output.js = jsOutput;
  const dtsOutput = dts.get(getDeclarationEmitOutputFilePath(input.unitName, compilerOptions, outputHost));
  if (dtsOutput !== undefined) output.dts = dtsOutput;
  const mapOutput = maps.get(getOutputJSFileNameWorker(input.unitName, compilerOptions, outputHost) + ".map");
  if (mapOutput !== undefined) output.map = mapOutput;
  return output;
}

function getNumberOfJSFiles(js: ReadonlyMap<string, TestFile>, includeJson: boolean): number {
  if (includeJson) return js.size;
  let count = 0;
  for (const file of js.values()) if (!file.unitName.endsWith(".json")) count += 1;
  return count;
}

function compareTestFiles(left: TestFile, right: TestFile): number {
  return left.unitName.localeCompare(right.unitName);
}

export interface SourceFileCacheKey {
  readonly fileName: string;
  readonly text: string;
  readonly scriptKind: string;
}

export function getSourceFileCacheKey(fileName: string, text: string, scriptKind: string): SourceFileCacheKey {
  return { fileName: normalizePath(fileName), text, scriptKind };
}

export const sourceFileCache: Map<string, SourceFile> = new Map();

export class TracerForBaselining {
  private readonly packageJsonCache = new Map<string, boolean>();
  private readonly lines: string[] = [];

  constructor(
    private readonly currentDirectory: string,
    private readonly useCaseSensitiveFileNames: boolean,
    private readonly typescriptVersion: string = "",
  ) {}

  trace(message: string): void {
    this.lines.push(this.sanitizeTrace(message, true));
  }

  traceWithPackageJsonCache(message: string, usePackageJsonCache: boolean): string {
    const sanitized = this.sanitizeTrace(message, usePackageJsonCache);
    this.lines.push(sanitized);
    return sanitized;
  }

  reset(): void {
    this.packageJsonCache.clear();
    this.lines.length = 0;
  }

  toString(): string {
    return this.lines.join("\n");
  }

  private sanitizeTrace(message: string, usePackageJsonCache: boolean): string {
    const version = this.typescriptVersion.length > 0 ? this.typescriptVersion : fakeTSVersion;
    const versionQuoted = `'${version}'`;
    if (message.includes(versionQuoted)) return message.replace(versionQuoted, `'${fakeTSVersion}'`);

    const cachedMissing = cutSuffix(message, "' does not exist according to earlier cached lookups.");
    if (cachedMissing !== undefined) {
      const fileName = cachedMissing.replace(/^File '/, "");
      if (usePackageJsonCache && this.notePackageJsonCache(fileName, false)) return message;
      return `File '${fileName}' does not exist.`;
    }

    const cachedFound = cutSuffix(message, "' exists according to earlier cached lookups.");
    if (cachedFound !== undefined) {
      const fileName = cachedFound.replace(/^File '/, "");
      if (usePackageJsonCache && this.notePackageJsonCache(fileName, true)) return message;
      return `Found 'package.json' at '${fileName}'.`;
    }

    if (usePackageJsonCache) {
      const missing = cutSuffix(message, "' does not exist.");
      if (missing !== undefined) {
        const fileName = missing.replace(/^File '/, "");
        if (!this.notePackageJsonCache(fileName, false)) return message;
        return `File '${fileName}' does not exist according to earlier cached lookups.`;
      }

      const found = cutPrefix(message, "Found 'package.json' at '");
      if (found !== undefined) {
        const fileName = found.replace(/'\.$/, "");
        if (!this.notePackageJsonCache(fileName, true)) return message;
        return `File '${fileName}' exists according to earlier cached lookups.`;
      }
    }

    return message;
  }

  private notePackageJsonCache(fileName: string, exists: boolean): boolean {
    const key = this.toTracePath(fileName);
    const hadEntry = this.packageJsonCache.has(key);
    this.packageJsonCache.set(key, exists);
    return hadEntry;
  }

  private toTracePath(fileName: string): string {
    const absolute = normalizedAbsolutePath(fileName, this.currentDirectory);
    return this.useCaseSensitiveFileNames ? absolute : absolute.toLowerCase();
  }
}

export class HarnessCompilerHost implements CompilerHost {
  readonly trace: string[] = [];
  private readonly tracer: TracerForBaselining;
  private readonly files: Map<string, string>;
  private readonly symlinks: Map<string, string>;
  private readonly currentDirectory: string;
  private readonly caseSensitive: boolean;

  constructor(files: ReadonlyMap<string, string>, symlinks: ReadonlyMap<string, string>, currentDirectory: string, caseSensitive: boolean) {
    this.files = new Map(files);
    this.symlinks = new Map();
    for (const [source, target] of symlinks) {
      this.symlinks.set(normalizedAbsolutePath(source, currentDirectory), normalizedAbsolutePath(target, currentDirectory));
    }
    this.currentDirectory = currentDirectory;
    this.caseSensitive = caseSensitive;
    this.tracer = new TracerForBaselining(currentDirectory, caseSensitive);
  }

  fileExists(path: string): boolean {
    const normalized = this.resolvePath(path);
    const exists = this.files.has(normalized);
    this.pushTrace(`fileExists ${normalized} ${exists ? "true" : "false"}`);
    return exists;
  }

  readFile(path: string): string | undefined {
    const normalized = this.resolvePath(path);
    this.pushTrace(`readFile ${normalized}`);
    return this.files.get(normalized);
  }

  getSourceFile(path: string): SourceFile | undefined {
    const text = this.readFile(path);
    if (text === undefined) return undefined;
    return parseSourceFile(text, { fileName: this.resolvePath(path) });
  }

  writeFile(path: string, data: string): void {
    const normalized = normalizePath(path);
    this.pushTrace(`writeFile ${normalized}`);
    this.files.set(normalized, data);
  }

  getCurrentDirectory(): string {
    return this.currentDirectory;
  }

  useCaseSensitiveFileNames(): boolean {
    return this.caseSensitive;
  }

  fs(): ReadonlyMap<string, string> {
    return new Map(this.files);
  }

  enumerateFiles(root = this.currentDirectory): readonly string[] {
    return this.listFiles(root);
  }

  listFiles(root = this.currentDirectory): readonly string[] {
    const normalizedRoot = normalizePath(root).replace(/\/+$/, "");
    return [...this.files.keys()]
      .filter(fileName => fileName === normalizedRoot || fileName.startsWith(normalizedRoot + "/"))
      .sort();
  }

  listFilesWorker(root: string, results: string[]): void {
    results.push(...this.listFiles(root));
  }

  directoryExists(path: string): boolean {
    const normalized = normalizePath(path).replace(/\/+$/, "");
    for (const fileName of this.files.keys()) {
      if (getDirectoryPath(fileName) === normalized || fileName.startsWith(normalized + "/")) return true;
    }
    for (const symlink of this.symlinks.keys()) {
      if (getDirectoryPath(symlink) === normalized || symlink.startsWith(normalized + "/")) return true;
    }
    return false;
  }

  snapshotFiles(): ReadonlyMap<string, string> {
    return new Map(this.files);
  }

  private pushTrace(message: string): void {
    this.tracer.trace(message);
    this.trace.push(this.tracer.toString().split("\n").at(-1) ?? message);
  }

  private resolvePath(path: string): string {
    const normalized = normalizePath(path);
    return this.symlinks.get(normalized) ?? normalized;
  }
}

export function getHarnessOption(name: string): HarnessCommandLineOption | undefined {
  return harnessCommandLineOptions.find(option => option.name.toLowerCase() === name.toLowerCase());
}

export function parseHarnessOption(key: string, value: unknown, harnessOptions: HarnessOptions): void {
  switch (key) {
    case "useCaseSensitiveFileNames":
      harnessOptions.useCaseSensitiveFileNames = requireBooleanOption(key, value);
      return;
    case "baselineFile":
      harnessOptions.baselineFile = requireStringOption(key, value);
      return;
    case "includeBuiltFile":
      harnessOptions.includeBuiltFile = requireStringOption(key, value);
      return;
    case "fileName":
      harnessOptions.fileName = requireStringOption(key, value);
      return;
    case "libFiles":
      harnessOptions.libFiles = requireStringListOption(key, value);
      return;
    case "noImplicitReferences":
      harnessOptions.noImplicitReferences = requireBooleanOption(key, value);
      return;
    case "currentDirectory":
      harnessOptions.currentDirectory = requireStringOption(key, value);
      return;
    case "symlink":
      harnessOptions.symlink = requireStringOption(key, value);
      return;
    case "link":
      harnessOptions.link = requireStringOption(key, value);
      return;
    case "noTypesAndSymbols":
      harnessOptions.noTypesAndSymbols = requireBooleanOption(key, value);
      return;
    case "fullEmitPaths":
      harnessOptions.fullEmitPaths = requireBooleanOption(key, value);
      return;
    case "reportDiagnostics":
      harnessOptions.reportDiagnostics = requireBooleanOption(key, value);
      return;
    case "captureSuggestions":
      harnessOptions.captureSuggestions = requireBooleanOption(key, value);
      return;
    case "typescriptVersion":
      harnessOptions.typescriptVersion = requireStringOption(key, value);
      return;
    default:
      throw new Error(`Unknown harness option '${key}'.`);
  }
}

export function getFileBasedTestConfigurations(
  settings: ReadonlyMap<string, string> | Record<string, string>,
  varyByOptions: ReadonlySet<string>,
): readonly NamedTestConfiguration[] {
  const entries = settings instanceof Map ? [...settings.entries()] : Object.entries(settings);
  const optionEntries: string[][] = [];
  let variationCount = 1;
  const nonVaryingOptions = new Map<string, string>();

  for (const [option, value] of entries) {
    if (varyByOptions.has(option)) {
      const optionValues = splitOptionValues(value, option);
      if (optionValues.length > 1) {
        variationCount *= optionValues.length;
        if (variationCount > 25) throw new Error("Provided test options exceeded the maximum number of variations");
        optionEntries.push([option, ...optionValues]);
      } else if (optionValues.length === 1) {
        nonVaryingOptions.set(option, optionValues[0]!);
      }
    } else {
      nonVaryingOptions.set(option, value);
    }
  }

  const configurations: NamedTestConfiguration[] = [];
  if (optionEntries.length > 0) {
    for (const varyingConfig of computeFileBasedTestConfigurationVariations(variationCount, optionEntries)) {
      const description = getFileBasedTestConfigurationDescription(varyingConfig);
      const merged = new Map(varyingConfig);
      for (const [key, value] of nonVaryingOptions) merged.set(key, value);
      configurations.push({ name: description, config: merged });
    }
  } else if (nonVaryingOptions.size > 0) {
    configurations.push({ name: "", config: nonVaryingOptions });
  }
  return configurations;
}

export function splitOptionValues(value: string, option: string): readonly string[] {
  if (value.length === 0) return [];

  let star = false;
  const includes: string[] = [];
  const excludes: string[] = [];
  for (const raw of value.split(",")) {
    const entry = raw.trim();
    if (entry.length === 0) continue;
    if (entry === "*") star = true;
    else if (entry.startsWith("-") || entry.startsWith("!")) excludes.push(entry.slice(1));
    else includes.push(entry);
  }

  if (includes.length === 0 && !star && excludes.length === 0) return [];

  const variations = new Map<unknown, string>();
  for (const include of includes) {
    const normalized = getValueOfOptionString(option, include);
    if (!variations.has(normalized)) variations.set(normalized, include);
  }

  const allValues = getAllValuesForOption(option);
  if (star && allValues.length > 0) {
    for (const include of allValues) {
      const normalized = getValueOfOptionString(option, include);
      if (!variations.has(normalized)) variations.set(normalized, include);
    }
  }

  for (const exclude of excludes) {
    const normalized = tryGetValueOfOptionString(option, exclude);
    if (normalized.ok) variations.delete(normalized.value);
  }

  if (variations.size === 0) throw new Error(`Variations in test option '@${option}' resulted in an empty set.`);
  return [...variations.values()];
}

export function getConfigNameFromFileName(filename: string): string {
  const basenameLower = getBaseFileName(filename).toLowerCase();
  return basenameLower === "tsconfig.json" || basenameLower === "jsconfig.json" ? basenameLower : "";
}

export function computeFileBasedTestConfigurationVariations(
  variationCount: number,
  optionEntries: readonly (readonly string[])[],
): readonly TestConfiguration[] {
  const configurations: TestConfiguration[] = [];
  computeFileBasedTestConfigurationVariationsWorker(configurations, variationCount, optionEntries, 0, new Map());
  return configurations;
}

function computeFileBasedTestConfigurationVariationsWorker(
  configurations: TestConfiguration[],
  variationCount: number,
  optionEntries: readonly (readonly string[])[],
  index: number,
  variationState: Map<string, string>,
): void {
  void variationCount;
  if (index >= optionEntries.length) {
    configurations.push(new Map(variationState));
    return;
  }

  const optionKey = optionEntries[index]![0]!;
  for (const entry of optionEntries[index]!.slice(1)) {
    variationState.set(optionKey, entry);
    computeFileBasedTestConfigurationVariationsWorker(configurations, variationCount, optionEntries, index + 1, variationState);
  }
}

function getFileBasedTestConfigurationDescription(config: TestConfiguration): string {
  return [...config.keys()]
    .sort()
    .map((key) => `${key}=${config.get(key)!.toLowerCase()}`)
    .join(",");
}

function getValueOfOptionString(option: string, value: string): unknown {
  const result = tryGetValueOfOptionString(option, value);
  if (!result.ok) throw new Error(`Unknown value '${value}' for option '${option}'`);
  return result.value;
}

function tryGetValueOfOptionString(option: string, value: string): { readonly ok: true; readonly value: unknown } | { readonly ok: false } {
  const optionDeclaration = getCommandLineOption(option);
  if (optionDeclaration === undefined) return { ok: false };
  if (optionDeclaration.type instanceof Map) {
    const enumValue = optionDeclaration.type.get(value.toLowerCase());
    return enumValue === undefined ? { ok: false } : { ok: true, value: enumValue };
  }
  if (optionDeclaration.type === "boolean") {
    switch (value.toLowerCase()) {
      case "true":
        return { ok: true, value: true };
      case "false":
        return { ok: true, value: false };
      default:
        return { ok: false };
    }
  }
  return { ok: true, value };
}

function getCommandLineOption(option: string): CommandLineOption | undefined {
  return optionDeclarations.find(optionDeclaration => optionDeclaration.name.toLowerCase() === option.toLowerCase());
}

function getAllValuesForOption(option: string): readonly string[] {
  const optionDeclaration = getCommandLineOption(option);
  if (optionDeclaration === undefined) return [];
  if (optionDeclaration.type instanceof Map) return [...optionDeclaration.type.keys()];
  if (optionDeclaration.type === "boolean") return ["true", "false"];
  return [];
}

function requireStringOption(key: string, value: unknown): string {
  if (typeof value !== "string") throw new Error(`Value for option '${key}' must be a string.`);
  return value;
}

function requireBooleanOption(key: string, value: unknown): boolean {
  if (typeof value !== "boolean") throw new Error(`Value for option '${key}' must be a boolean.`);
  return value;
}

function requireStringListOption(key: string, value: unknown): readonly string[] {
  if (Array.isArray(value) && value.every(item => typeof item === "string")) return value;
  if (typeof value === "string") {
    const option = getHarnessOption(key);
    if (option?.type === "list") return value.split(",").map(item => item.trim()).filter(item => item.length > 0);
  }
  if (value !== undefined) {
    const compilerOption = getCommandLineOption(key);
    if (compilerOption !== undefined) {
      const parsed = parseListTypeOption(compilerOption, String(value));
      if (parsed.errors.length === 0 && Array.isArray(parsed.value)) return parsed.value.map((item: unknown) => String(item));
    }
  }
  throw new Error(`Value for option '${key}' must be a string list.`);
}

function getBaseFileName(path: string): string {
  const normalized = path.replaceAll("\\", "/");
  const slash = normalized.lastIndexOf("/");
  return slash < 0 ? normalized : normalized.slice(slash + 1);
}

function cutSuffix(value: string, suffix: string): string | undefined {
  return value.endsWith(suffix) ? value.slice(0, -suffix.length) : undefined;
}

function cutPrefix(value: string, prefix: string): string | undefined {
  return value.startsWith(prefix) ? value.slice(prefix.length) : undefined;
}
