/**
 * tsconfig.json parsing.
 *
 * Port skeleton of TS-Go `internal/tsoptions/tsconfigparsing.go`
 * (~1792 LoC). Loads a `tsconfig.json`, resolves `extends`, normalizes
 * file globs, applies project references, and produces a
 * `ParsedCommandLine`.
 *
 * Skeleton exposes the public surface (parseJsonConfigFileContent,
 * readConfigFile, getParsedCommandLineOfConfigFile,
 * parseJsonSourceFileConfigFileContent). Internal logic stubs return
 * minimal values — tests will drive fill-in.
 */

import type { ParsedCommandLine } from "./parsedcommandline.js";
import type { ParseCommandLineHost } from "./commandlineparser.js";
import type { Diagnostic } from "../ast/index.js";

export interface ReadConfigFileResult {
  config: unknown;
  error: Diagnostic | undefined;
}

export function readConfigFile(fileName: string, readFile: (path: string) => string | undefined): ReadConfigFileResult {
  const text = readFile(fileName);
  if (text === undefined) {
    return { config: undefined, error: createReadFileError(fileName) };
  }
  try {
    return { config: parseJson(text), error: undefined };
  } catch {
    return { config: undefined, error: createParseError(fileName) };
  }
}

export function parseJsonConfigFileContent(
  json: unknown,
  host: ParseCommandLineHost,
  basePath: string,
  existingOptions: Record<string, unknown> | undefined,
  configFileName: string | undefined,
  resolutionStack: readonly unknown[] | undefined,
  extraFileExtensions: readonly unknown[] | undefined,
  extendedConfigCache: Map<string, unknown> | undefined,
): ParsedCommandLine {
  // Skeleton — full version walks extends chain, applies references,
  // resolves files via host.readDirectory.
  void json; void host; void basePath; void existingOptions; void configFileName;
  void resolutionStack; void extraFileExtensions; void extendedConfigCache;
  return {
    options: existingOptions ?? {},
    fileNames: [],
    errors: [],
    raw: json,
    projectReferences: undefined,
    typeAcquisition: undefined,
    watchOptions: undefined,
  } as unknown as ParsedCommandLine;
}

export function parseJsonSourceFileConfigFileContent(
  sourceFile: unknown,
  host: ParseCommandLineHost,
  basePath: string,
  existingOptions: Record<string, unknown> | undefined,
  configFileName: string | undefined,
  resolutionStack: readonly unknown[] | undefined,
  extraFileExtensions: readonly unknown[] | undefined,
  extendedConfigCache: Map<string, unknown> | undefined,
): ParsedCommandLine {
  return parseJsonConfigFileContent(undefined, host, basePath, existingOptions, configFileName, resolutionStack, extraFileExtensions, extendedConfigCache);
}

export function getParsedCommandLineOfConfigFile(
  configFileName: string,
  optionsToExtend: Record<string, unknown> | undefined,
  host: ParseCommandLineHost,
  extendedConfigCache: Map<string, unknown> | undefined,
): ParsedCommandLine | undefined {
  const cfg = readConfigFile(configFileName, host.readFile);
  if (cfg.error !== undefined || cfg.config === undefined) return undefined;
  return parseJsonConfigFileContent(cfg.config, host, getDirectoryPath(configFileName), optionsToExtend, configFileName, undefined, undefined, extendedConfigCache);
}

declare function parseJson(text: string): unknown;
declare function createReadFileError(path: string): Diagnostic;
declare function createParseError(path: string): Diagnostic;
declare function getDirectoryPath(path: string): string;
