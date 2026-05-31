import type { ParsedCommandLine } from "../parsedCommandLine.js";

export function parsedCommandLineFileNames(commandLine: ParsedCommandLine): readonly string[] {
  return commandLine.parsedConfig.fileNames;
}
