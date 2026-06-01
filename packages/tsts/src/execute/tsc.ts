import type { ParsedBuildCommandLine } from "../tsoptions/index.js";
import {
  createDiagnosticReporter,
  createReportErrorSummary,
  ExitStatus,
  type CommandLineResult,
  type CommandLineTesting,
  type CompileAndEmitResult,
  type CompileTimes,
  type DiagnosticLike,
  type DiagnosticReporter,
  type DiagnosticsReporter,
  type System,
  type TextWriter,
} from "./tsc/index.js";
import { printHelp, printVersion } from "./tsc/help.js";
import { createDefaultInitConfig, serializeInitConfig } from "./tsc/init.js";

export interface ExecuteCommandLine {
  readonly args: readonly string[];
  readonly showHelp: boolean;
  readonly showVersion: boolean;
  readonly showConfig: boolean;
  readonly init: boolean;
  readonly build: boolean;
  readonly watch: boolean;
  readonly listFilesOnly: boolean;
  readonly ignoreConfig: boolean;
  readonly project: string | undefined;
  readonly fileNames: readonly string[];
  readonly raw: ReadonlyMap<string, unknown>;
}

export interface ExecuteParsedCommandLine<Diagnostic extends DiagnosticLike = DiagnosticLike> {
  readonly compilerOptions: ExecuteCommandLine;
  readonly errors: readonly Diagnostic[];
  readonly fileNames: readonly string[];
  readonly configFileName?: string;
}

export interface ExecuteTrace {
  stop(): void | Error;
}

export interface ExecuteTscOptions<Diagnostic extends DiagnosticLike = DiagnosticLike, Program = unknown> {
  readonly sys: System;
  readonly version: string;
  readonly options: readonly unknown[];
  readonly testing?: CommandLineTesting;
  readonly parseBuildCommandLine?: (args: readonly string[]) => ParsedBuildCommandLine;
  readonly parseCommandLine?: (args: readonly string[]) => ExecuteParsedCommandLine<Diagnostic>;
  readonly parseConfigFile?: (fileName: string, commandLine: ExecuteParsedCommandLine<Diagnostic>) => ExecuteParsedCommandLine<Diagnostic>;
  readonly build?: (command: ParsedBuildCommandLine) => CommandLineResult;
  readonly compile?: (command: ExecuteParsedCommandLine<Diagnostic>, input: ExecuteCompileInput<Diagnostic>) => CommandLineResult;
  readonly compileCommandLine?: (command: ExecuteCommandLine) => CommandLineResult;
  readonly createProgram?: (command: ExecuteParsedCommandLine<Diagnostic>, input: ExecuteCompileInput<Diagnostic>) => Program;
  readonly emitAndReport?: (program: Program, input: ExecuteCompileInput<Diagnostic>) => CompileAndEmitResult<Diagnostic>;
  readonly createWatcher?: (command: ExecuteParsedCommandLine<Diagnostic>, input: ExecuteCompileInput<Diagnostic>) => CommandLineResult;
  readonly writeFile?: (fileName: string, text: string) => void;
  readonly startTracing?: (sys: System, config: ExecuteParsedCommandLine<Diagnostic>, testing: CommandLineTesting | undefined) => ExecuteTrace | undefined;
}

export interface ExecuteCompileInput<Diagnostic extends DiagnosticLike = DiagnosticLike> {
  readonly sys: System;
  readonly reportDiagnostic: DiagnosticReporter<Diagnostic>;
  readonly reportErrorSummary: DiagnosticsReporter<Diagnostic>;
  readonly compileTimes: CompileTimes;
  readonly testing: CommandLineTesting | undefined;
  readonly trace: ExecuteTrace | undefined;
}

export function parseExecuteCommandLine(args: readonly string[]): ExecuteCommandLine {
  let showHelp = false;
  let showVersion = false;
  let showConfig = false;
  let init = false;
  let build = false;
  let watch = false;
  let listFilesOnly = false;
  let ignoreConfig = false;
  let project: string | undefined;
  const fileNames: string[] = [];
  const raw = new Map<string, unknown>();

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]!;
    const lower = arg.toLowerCase();
    if (lower === "--help" || lower === "-h" || lower === "-?") showHelp = true;
    else if (lower === "--version" || lower === "-v") showVersion = true;
    else if (lower === "--showconfig") showConfig = true;
    else if (lower === "--init") init = true;
    else if (lower === "--build" || lower === "--b" || lower === "-build" || lower === "-b") build = true;
    else if (lower === "--watch" || lower === "-w") watch = true;
    else if (lower === "--listfilesonly") listFilesOnly = true;
    else if (lower === "--ignoreconfig") ignoreConfig = true;
    else if ((lower === "--project" || lower === "-p") && args[index + 1] !== undefined) {
      project = args[index + 1];
      raw.set("project", project);
      index += 1;
    } else if (arg.startsWith("-")) {
      const next = args[index + 1];
      if (next !== undefined && !next.startsWith("-")) {
        raw.set(arg.replace(/^-+/, ""), next);
        index += 1;
      } else {
        raw.set(arg.replace(/^-+/, ""), true);
      }
    } else {
      fileNames.push(arg);
    }
  }
  return { args, showHelp, showVersion, showConfig, init, build, watch, listFilesOnly, ignoreConfig, project, fileNames, raw };
}

export function executeTsc<Diagnostic extends DiagnosticLike, Program>(
  opts: ExecuteTscOptions<Diagnostic, Program>,
  args: readonly string[],
  success: ExitStatus,
): CommandLineResult {
  if (args.length > 0 && isBuildArgument(args[0]!)) {
    const buildCommand = opts.parseBuildCommandLine?.(args);
    if (buildCommand !== undefined && opts.build !== undefined) return opts.build(buildCommand);
  }
  const parsed = opts.parseCommandLine?.(args) ?? {
    compilerOptions: parseExecuteCommandLine(args),
    errors: [],
    fileNames: parseExecuteCommandLine(args).fileNames,
  };
  return tscCompilation(opts, parsed, success);
}

export function tscCompilation<Diagnostic extends DiagnosticLike, Program>(
  opts: ExecuteTscOptions<Diagnostic, Program>,
  commandLine: ExecuteParsedCommandLine<Diagnostic>,
  success: ExitStatus,
): CommandLineResult {
  const writer = opts.sys.writer();
  const command = commandLine.compilerOptions;
  const reportDiagnostic = createDiagnosticReporter(opts.sys, writer, { pretty: false }) as DiagnosticReporter<Diagnostic>;
  if (commandLine.errors.length > 0) {
    reportDiagnostics(commandLine.errors, reportDiagnostic);
    return { status: ExitStatus.DiagnosticsPresentOutputsSkipped };
  }
  if (command.init) {
    opts.writeFile?.("tsconfig.json", serializeInitConfig(createDefaultInitConfig()));
    return { status: success };
  }
  if (command.showVersion) {
    printVersion(writer, opts.version, "\n");
    return { status: success };
  }
  if (command.showHelp) {
    printHelp(writer, opts.options as never, { all: command.showConfig, terminalWidth: opts.sys.getWidthOfTerminal(), newLine: "\n" });
    return { status: success };
  }
  if (command.watch && command.listFilesOnly) {
    reportDiagnostic({ message: "Options 'watch' and 'listFilesOnly' cannot be combined." } as Diagnostic);
    return { status: ExitStatus.DiagnosticsPresentOutputsSkipped };
  }

  const configFileName = resolveConfigFileName(opts.sys, command);
  if (configFileName.status !== undefined) {
    if (configFileName.message !== undefined) reportDiagnostic({ message: configFileName.message } as Diagnostic);
    return { status: configFileName.status };
  }

  const configForCompilation = configFileName.fileName === undefined
    ? commandLine
    : opts.parseConfigFile?.(configFileName.fileName, commandLine) ?? commandLine;
  if (configForCompilation.errors.length > 0) {
    reportDiagnostics(configForCompilation.errors, reportDiagnostic);
    return { status: ExitStatus.DiagnosticsPresentOutputsGenerated };
  }
  if (command.showConfig) {
    writeJson(writer, {
      compilerOptions: Object.fromEntries(configForCompilation.compilerOptions.raw),
      files: configForCompilation.fileNames,
    });
    return { status: success };
  }
  const reportErrorSummary = createReportErrorSummary(opts.sys, writer, { pretty: false }) as DiagnosticsReporter<Diagnostic>;
  const compileTimes: CompileTimes = { parseTime: 0, totalTime: 0 };
  const trace = opts.startTracing?.(opts.sys, configForCompilation, opts.testing);
  const input: ExecuteCompileInput<Diagnostic> = {
    sys: opts.sys,
    reportDiagnostic,
    reportErrorSummary,
    compileTimes,
    testing: opts.testing,
    trace,
  };
  try {
    if (configForCompilation.compilerOptions.watch) {
      return opts.createWatcher?.(configForCompilation, input) ?? { status: success };
    }
    return opts.compile?.(configForCompilation, input)
      ?? performCompilation(opts, configForCompilation, input, success);
  } finally {
    stopTracing(opts.sys.writer(), trace);
  }
}

export function performCompilation<Diagnostic extends DiagnosticLike, Program>(
  opts: ExecuteTscOptions<Diagnostic, Program>,
  config: ExecuteParsedCommandLine<Diagnostic>,
  input: ExecuteCompileInput<Diagnostic>,
  success: ExitStatus,
): CommandLineResult {
  const program = opts.createProgram?.(config, input);
  if (program === undefined) return opts.compileCommandLine?.(config.compilerOptions) ?? { status: success };
  const result = opts.emitAndReport?.(program, input);
  opts.testing?.onProgram(program);
  return { status: result?.status ?? success };
}

export function resolveConfigFileName(sys: System, command: ExecuteCommandLine): { readonly fileName?: string; readonly status?: ExitStatus; readonly message?: string } {
  if (command.project !== undefined && command.project !== "") {
    if (command.fileNames.length !== 0) {
      return { status: ExitStatus.DiagnosticsPresentOutputsSkipped, message: "Option 'project' cannot be mixed with source files on a command line." };
    }
    const project = normalizePath(command.project);
    const fs = sys.fs();
    if (fs.directoryExists(project)) {
      const configFileName = combinePaths(project, "tsconfig.json");
      if (!fs.fileExists(configFileName)) {
        return { status: ExitStatus.DiagnosticsPresentOutputsSkipped, message: `Cannot find a tsconfig.json file at '${configFileName}'.` };
      }
      return { fileName: configFileName };
    }
    if (!fs.fileExists(project)) {
      return { status: ExitStatus.DiagnosticsPresentOutputsSkipped, message: `The specified path does not exist: '${project}'.` };
    }
    return { fileName: project };
  }
  if (!command.ignoreConfig || command.fileNames.length === 0) {
    const configFileName = findConfigFile(normalizePath(sys.getCurrentDirectory()), (fileName) => sys.fs().fileExists(fileName), "tsconfig.json");
    if (command.fileNames.length !== 0 && configFileName !== "") {
      return { status: ExitStatus.DiagnosticsPresentOutputsSkipped, message: "tsconfig.json is present but will not be loaded if files are specified on command line. Use --ignoreConfig to skip this error." };
    }
    if (command.fileNames.length === 0 && configFileName === "") {
      return { status: ExitStatus.DiagnosticsPresentOutputsSkipped, message: `Cannot find a tsconfig.json file at '${normalizePath(sys.getCurrentDirectory())}'.` };
    }
    if (configFileName !== "") return { fileName: configFileName };
  }
  return {};
}

export function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName: string): string {
  let current = normalizePath(searchPath);
  while (current !== "") {
    const fullConfigName = combinePaths(current, configName);
    if (fileExists(fullConfigName)) return fullConfigName;
    const parent = directoryName(current);
    if (parent === current) break;
    current = parent;
  }
  return "";
}

export function startTracingIfNeeded<Diagnostic extends DiagnosticLike>(
  opts: ExecuteTscOptions<Diagnostic>,
  config: ExecuteParsedCommandLine<Diagnostic>,
): ExecuteTrace | undefined {
  return opts.startTracing?.(opts.sys, config, opts.testing);
}

export function stopTracing(writer: TextWriter, trace: ExecuteTrace | undefined): void {
  if (trace === undefined) return;
  const result = trace.stop();
  if (result instanceof Error) writer.write(`Warning: Failed to stop tracing: ${result.message}\n`);
}

function reportDiagnostics<Diagnostic extends DiagnosticLike>(diagnostics: readonly Diagnostic[], report: DiagnosticReporter<Diagnostic>): void {
  for (const diagnostic of diagnostics) report(diagnostic);
}

function writeJson(writer: TextWriter, value: unknown): void {
  writer.write(JSON.stringify(value, undefined, 4));
  writer.write("\n");
}

function isBuildArgument(arg: string): boolean {
  const lower = arg.toLowerCase();
  return lower === "-b" || lower === "--b" || lower === "-build" || lower === "--build";
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/").replace(/\/+/g, "/").replace(/\/$/, "");
}

function combinePaths(left: string, right: string): string {
  if (left === "") return normalizePath(right);
  if (right === "") return normalizePath(left);
  return normalizePath(left + "/" + right);
}

function directoryName(path: string): string {
  const normalized = normalizePath(path);
  const index = normalized.lastIndexOf("/");
  if (index <= 0) return index === 0 ? "/" : "";
  return normalized.slice(0, index);
}
