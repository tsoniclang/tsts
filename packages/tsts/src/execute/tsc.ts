import type { ParsedBuildCommandLine } from "../tsoptions/index.js";
import type { CommandLineResult, ExitStatus, System } from "./tsc/index.js";
import { printHelp, printVersion } from "./tsc/help.js";
import { createDefaultInitConfig, serializeInitConfig } from "./tsc/init.js";

export interface ExecuteCommandLine {
  readonly args: readonly string[];
  readonly showHelp: boolean;
  readonly showVersion: boolean;
  readonly init: boolean;
  readonly build: boolean;
  readonly project: string | undefined;
}

export interface ExecuteTscOptions {
  readonly sys: System;
  readonly version: string;
  readonly options: readonly unknown[];
  readonly parseBuildCommandLine?: (args: readonly string[]) => ParsedBuildCommandLine;
  readonly build?: (command: ParsedBuildCommandLine) => CommandLineResult;
  readonly compile?: (command: ExecuteCommandLine) => CommandLineResult;
  readonly writeFile?: (fileName: string, text: string) => void;
}

export function parseExecuteCommandLine(args: readonly string[]): ExecuteCommandLine {
  let showHelp = false;
  let showVersion = false;
  let init = false;
  let build = false;
  let project: string | undefined;
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--help" || arg === "-h" || arg === "-?") showHelp = true;
    else if (arg === "--version" || arg === "-v") showVersion = true;
    else if (arg === "--init") init = true;
    else if (arg === "--build" || arg === "-b") build = true;
    else if ((arg === "--project" || arg === "-p") && args[index + 1] !== undefined) {
      project = args[index + 1];
      index += 1;
    }
  }
  return { args, showHelp, showVersion, init, build, project };
}

export function executeTsc(opts: ExecuteTscOptions, args: readonly string[], success: ExitStatus): CommandLineResult {
  const command = parseExecuteCommandLine(args);
  const writer = opts.sys.writer();
  if (command.showVersion) {
    printVersion(writer, opts.version, "\n");
    return { status: success };
  }
  if (command.showHelp) {
    printHelp(writer, opts.options as never, { all: false, terminalWidth: opts.sys.getWidthOfTerminal(), newLine: "\n" });
    return { status: success };
  }
  if (command.init) {
    opts.writeFile?.("tsconfig.json", serializeInitConfig(createDefaultInitConfig()));
    return { status: success };
  }
  if (command.build) {
    const parsed = opts.parseBuildCommandLine?.(args);
    if (parsed !== undefined && opts.build !== undefined) return opts.build(parsed);
  }
  return opts.compile?.(command) ?? { status: success };
}
