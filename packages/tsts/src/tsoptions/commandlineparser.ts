/**
 * Command-line option parser.
 *
 * Port skeleton of TS-Go `internal/tsoptions/commandlineparser.go`
 * (~480 LoC). Drives `--option value` token parsing, normalizes
 * boolean / list / enum / number options, and surfaces diagnostics.
 *
 * Skeleton exposes the public surface (parseCommandLine,
 * parseCommandLineWorker, ParsedCommandLine result construction).
 * Detailed token handling is deferred — tests will drive fill-in.
 */

import type { CommandLineOption } from "./commandlineoption.js";
import type { ParsedCommandLine } from "./parsedcommandline.js";
import type { Diagnostic } from "../ast/index.js";

export interface ParseCommandLineHost {
  readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): readonly string[];
  fileExists(path: string): boolean;
  readFile(path: string): string | undefined;
  getCurrentDirectory(): string;
  useCaseSensitiveFileNames: boolean;
}

export function parseCommandLine(
  commandLine: readonly string[],
  host: ParseCommandLineHost,
): ParsedCommandLine {
  return parseCommandLineWorker(commandLine, optionDeclarations, host);
}

export function parseCommandLineWorker(
  commandLine: readonly string[],
  options: readonly CommandLineOption[],
  host: ParseCommandLineHost,
): ParsedCommandLine {
  // Skeleton: walk tokens, accumulate `options` map and `fileNames`.
  // Detailed switch handling (boolean/list/path/enum/number) is
  // forward-declared via parseOptionValue.
  const collected: Record<string, unknown> = {};
  const fileNames: string[] = [];
  const errors: Diagnostic[] = [];
  let i = 0;
  while (i < commandLine.length) {
    const token = commandLine[i]!;
    if (token.startsWith("--")) {
      const name = token.slice(2);
      const opt = options.find((o) => o.name === name);
      if (opt === undefined) {
        i++;
        continue;
      }
      const { value, advance } = parseOptionValue(opt, commandLine, i + 1);
      collected[opt.name] = value;
      i += 1 + advance;
    } else {
      fileNames.push(token);
      i++;
    }
  }
  return {
    options: collected,
    fileNames,
    errors,
    raw: undefined,
    projectReferences: undefined,
    typeAcquisition: undefined,
    watchOptions: undefined,
  } as unknown as ParsedCommandLine;
}

declare const optionDeclarations: readonly CommandLineOption[];
declare function parseOptionValue(opt: CommandLineOption, tokens: readonly string[], from: number): { value: unknown; advance: number };
