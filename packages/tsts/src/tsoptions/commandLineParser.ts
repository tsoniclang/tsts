/**
 * Command-line option parser.
 *
 * Port skeleton of TS-Go `internal/tsoptions/commandlineparser.go`
 * (~399 LoC). Drives `--option value` token parsing, normalizes
 * boolean / list / enum / number options, and surfaces diagnostics
 * + did-you-mean suggestions for unknown options.
 *
 * Skeleton exposes the public surface: parseCommandLine,
 * parseBuildCommandLine, parseCommandLineWorker. Detailed token
 * handling stubbed for incremental fill-in.
 */

import type { CommandLineOption } from "./commandLineOption.js";
import { ParsedCommandLine } from "./parsedCommandLine.js";
import type { ParsedBuildCommandLine } from "./parsedBuildCommandLine.js";
import type { ParseConfigHost } from "./tsconfigParsing.js";
import type { Diagnostic } from "../ast/index.js";
import { OrderedMap } from "../collections/orderedMap.js";
import { Diagnostics } from "../diagnostics/diagnostics.generated.js";
import { createCompilerDiagnostic } from "./errors.js";
import { optionDeclarations } from "./declsCompiler.js";
import { buildOpts } from "./declsBuild.js";
import { watchOptions } from "./declsWatch.js";
import { getNameMapFromList, type NameMap } from "./nameMap.js";

export interface ParseCommandLineWorkerDiagnostics {
  didYouMean: {
    alternateMode: AlternateModeDiagnostics | undefined;
    optionDeclarations: readonly CommandLineOption[];
    unknownOptionDiagnostic: DiagnosticMessage;
    unknownDidYouMeanDiagnostic: DiagnosticMessage;
  };
}

export interface AlternateModeDiagnostics {
  diagnostic: DiagnosticMessage;
  getOptionsNameMap: () => NameMap;
}

export interface DiagnosticMessage {
  readonly key: string;
}

interface CommandLineParserState {
  workerDiagnostics: ParseCommandLineWorkerDiagnostics;
  optionsMap: ReadonlyMap<string, CommandLineOption>;
  watchOptionsMap: ReadonlyMap<string, CommandLineOption>;
  options: OrderedMap<string, unknown>;
  fileNames: string[];
  errors: Diagnostic[];
  host: ParseConfigHost;
}

export function parseCommandLine(
  commandLine: readonly string[] | undefined,
  host: ParseConfigHost,
): ParsedCommandLine {
  const tokens = commandLine ?? [];
  const parser = parseCommandLineWorker(compilerOptionsDidYouMeanDiagnostics, tokens, host);
  const compilerOptions: Record<string, unknown> = {};
  for (const [k, v] of parser.options.entries()) compilerOptions[k] = v;
  const result = new ParsedCommandLine(compilerOptions, parser.fileNames, {
    useCaseSensitiveFileNames: host.useCaseSensitiveFileNames,
    currentDirectory: host.currentDirectory ?? "",
  });
  result.errors = parser.errors;
  result.raw = parser.options;
  return result;
}

export function parseBuildCommandLine(
  commandLine: readonly string[] | undefined,
  host: ParseConfigHost,
): ParsedBuildCommandLine {
  const tokens = commandLine ?? [];
  const parser = parseCommandLineWorker(buildOptionsDidYouMeanDiagnostics, tokens, host);
  const buildOptions: Record<string, unknown> = {};
  for (const [k, v] of parser.options.entries()) buildOptions[k] = v;
  const projects = parser.fileNames.length === 0 ? ["."] : parser.fileNames;
  addBuildModeCombinationDiagnostics(buildOptions, parser.errors);
  return {
    buildOptions,
    compilerOptions: {},
    watchOptions: undefined,
    fileNames: parser.fileNames,
    errors: parser.errors,
    projects,
    raw: parser.options,
  } as unknown as ParsedBuildCommandLine;
}

export function parseCommandLineWorker(
  diagnostics: ParseCommandLineWorkerDiagnostics,
  commandLine: readonly string[],
  host: ParseConfigHost,
): CommandLineParserState {
  const optionsMap = new Map<string, CommandLineOption>();
  for (const opt of diagnostics.didYouMean.optionDeclarations) {
    optionsMap.set(opt.name.toLowerCase(), opt);
    if (opt.shortName !== undefined) optionsMap.set(opt.shortName.toLowerCase(), opt);
  }
  const watchOptionsMap = new Map<string, CommandLineOption>();
  for (const opt of watchOptions) {
    watchOptionsMap.set(opt.name.toLowerCase(), opt);
    if (opt.shortName !== undefined) watchOptionsMap.set(opt.shortName.toLowerCase(), opt);
  }

  const state: CommandLineParserState = {
    workerDiagnostics: diagnostics,
    optionsMap,
    watchOptionsMap,
    options: new OrderedMap<string, unknown>(),
    fileNames: [],
    errors: [],
    host,
  };

  parseStrings(state, commandLine);
  return state;
}

function parseStrings(state: CommandLineParserState, args: readonly string[]): void {
  let i = 0;
  while (i < args.length) {
    const token = args[i]!;
    i++;
    if (token === "") continue;
    if (token.startsWith("@")) {
      parseResponseFile(state, token.slice(1));
      continue;
    }
    if (token.startsWith("-")) {
      const inputOptionName = getInputOptionName(token);
      const opt = state.optionsMap.get(inputOptionName.toLowerCase()) ?? state.watchOptionsMap.get(inputOptionName.toLowerCase());
      if (opt !== undefined) {
        i = parseOptionValueIntoState(state, args, i, opt);
      } else {
        state.errors.push(createUnknownOptionError(
          state.workerDiagnostics.didYouMean.unknownOptionDiagnostic,
          inputOptionName,
        ));
      }
      continue;
    }
    state.fileNames.push(token);
  }
}

function getInputOptionName(input: string): string {
  return input.replace(/^-{1,2}/, "");
}

function parseResponseFile(state: CommandLineParserState, fileName: string): void {
  const text = state.host.readFile(fileName);
  if (text === undefined || text === "") {
    state.errors.push(createCompilerDiagnostic(Diagnostics.Cannot_read_file_0 as never, fileName));
    return;
  }
  parseStrings(state, scanResponseFileArguments(text, fileName, state.errors));
}

function scanResponseFileArguments(text: string, fileName: string, errors: Diagnostic[]): string[] {
  const args: string[] = [];
  let pos = 0;
  while (pos < text.length) {
    while (pos < text.length && text.charCodeAt(pos) <= 0x20) pos += 1;
    if (pos >= text.length) break;
    if (text[pos] === "\"") {
      pos += 1;
      const start = pos;
      while (pos < text.length && text[pos] !== "\"") pos += 1;
      if (pos < text.length) {
        args.push(text.slice(start, pos));
        pos += 1;
      } else {
        errors.push(createCompilerDiagnostic({ message: `Unterminated quoted string in response file '${fileName}'.` } as never));
      }
    } else {
      const start = pos;
      while (pos < text.length && text.charCodeAt(pos) > 0x20) pos += 1;
      args.push(text.slice(start, pos));
    }
  }
  return args;
}

function parseOptionValueIntoState(
  state: CommandLineParserState,
  args: readonly string[],
  index: number,
  opt: CommandLineOption,
): number {
  const { value, advance, errors } = parseOptionValue(opt, args, index);
  if (errors.length > 0) state.errors.push(...errors);
  if (value !== missingOptionValue) state.options.set(opt.name, value);
  return index + advance;
}

const missingOptionValue = Symbol("missing option value");

function parseOptionValue(
  opt: CommandLineOption,
  tokens: readonly string[],
  from: number,
): { value: unknown; advance: number; errors: readonly Diagnostic[] } {
  if (opt.isTSConfigOnly === true) {
    const raw = tokens[from] ?? "";
    if (raw === "null") return { value: undefined, advance: 1, errors: [] };
    if (opt.type === "boolean") {
      const advance = raw === "true" || raw === "false" ? 1 : 0;
      return {
        value: raw === "false" ? false : missingOptionValue,
        advance,
        errors: [createCompilerDiagnostic(
          Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_false_or_null_on_command_line as never,
          opt.name,
        )],
      };
    }
    return {
      value: missingOptionValue,
      advance: raw !== "" && !raw.startsWith("-") ? 1 : 0,
      errors: [createCompilerDiagnostic(
        Diagnostics.Option_0_can_only_be_specified_in_tsconfig_json_file_or_set_to_null_on_command_line as never,
        opt.name,
      )],
    };
  }

  switch (opt.type) {
    case "boolean":
      if (from < tokens.length && (tokens[from] === "true" || tokens[from] === "false")) {
        return { value: tokens[from] === "true", advance: 1, errors: [] };
      }
      return { value: true, advance: 0, errors: [] };
    case "number": {
      const raw = tokens[from];
      if (raw === undefined) return missingValue(opt, "number");
      const n = Number.parseInt(raw, 10);
      if (Number.isFinite(n)) return { value: n, advance: 1, errors: [] };
      return { value: missingOptionValue, advance: 1, errors: [optionTypeMismatch(opt, "number")] };
    }
    case "string":
      if (tokens[from] === undefined) return missingValue(opt, "string");
      return { value: tokens[from], advance: 1, errors: [] };
    case "list":
    case "listOrElement":
      return parseListTypeOption(opt, tokens[from]);
    case "object":
      return { value: missingOptionValue, advance: 0, errors: [optionTypeMismatch(opt, "object")] };
  }
  if (opt.type instanceof Map) {
    const m = opt.type as ReadonlyMap<string, number>;
    const raw = tokens[from];
    if (raw === undefined) return missingValue(opt, "string");
    const value = m.get(raw.toLowerCase());
    if (value !== undefined) return { value, advance: 1, errors: [] };
    return { value: missingOptionValue, advance: 1, errors: [createDiagnosticForInvalidEnumType(opt)] };
  }
  return { value: missingOptionValue, advance: 0, errors: [] };
}

export function parseListTypeOption(
  opt: CommandLineOption,
  value: string | undefined,
): { value: unknown; advance: number; errors: readonly Diagnostic[] } {
  if (value === undefined) return missingValue(opt, "string");
  const trimmed = value.trim();
  if (trimmed.startsWith("-")) return { value: [], advance: 0, errors: [] };
  if (trimmed === "") return { value: [], advance: 1, errors: [] };
  const element = opt.element ?? opt.elements?.();
  if (element === undefined) return { value: trimmed.split(","), advance: 1, errors: [] };
  if (opt.type === "listOrElement" && !trimmed.includes(",")) {
    const parsed = parseOptionValue(element, [trimmed], 0);
    return { value: parsed.value === missingOptionValue ? [] : [parsed.value], advance: 1, errors: parsed.errors };
  }
  const errors: Diagnostic[] = [];
  const values: unknown[] = [];
  for (const raw of trimmed.split(",")) {
    const parsed = parseOptionValue(element, [raw.trim()], 0);
    if (parsed.errors.length > 0) errors.push(...parsed.errors);
    if (parsed.value !== missingOptionValue && parsed.value !== undefined && parsed.value !== "") values.push(parsed.value);
  }
  return { value: values, advance: 1, errors };
}

function missingValue(opt: CommandLineOption, expected: string): { value: unknown; advance: number; errors: readonly Diagnostic[] } {
  return { value: opt.type === "list" ? [] : missingOptionValue, advance: 0, errors: [optionTypeMismatch(opt, expected)] };
}

function optionTypeMismatch(opt: CommandLineOption, expected: string): Diagnostic {
  return createCompilerDiagnostic({ message: `Option '${opt.name}' requires a value of type ${expected}.` } as never);
}

function createDiagnosticForInvalidEnumType(opt: CommandLineOption): Diagnostic {
  return createCompilerDiagnostic({ message: `Option '${opt.name}' has an invalid value.` } as never);
}

function createUnknownOptionError(message: DiagnosticMessage, optionName: string): Diagnostic {
  return createCompilerDiagnostic(message as never, optionName);
}

function addBuildModeCombinationDiagnostics(buildOptions: Record<string, unknown>, errors: Diagnostic[]): void {
  if (buildOptions.clean === true && buildOptions.force === true) errors.push(combinationError("clean", "force"));
  if (buildOptions.clean === true && buildOptions.verbose === true) errors.push(combinationError("clean", "verbose"));
  if (buildOptions.clean === true && buildOptions.watch === true) errors.push(combinationError("clean", "watch"));
  if (buildOptions.watch === true && buildOptions.dry === true) errors.push(combinationError("watch", "dry"));
}

function combinationError(left: string, right: string): Diagnostic {
  return createCompilerDiagnostic({ message: `Options '${left}' and '${right}' cannot be combined.` } as never);
}

// ---------------------------------------------------------------------------
// Placeholder diagnostics — production versions live in declscompiler/etc.
// ---------------------------------------------------------------------------

const compilerOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
  didYouMean: {
    alternateMode: undefined,
    optionDeclarations,
    unknownOptionDiagnostic: Diagnostics.Unknown_compiler_option_0,
    unknownDidYouMeanDiagnostic: Diagnostics.Unknown_compiler_option_0_Did_you_mean_1,
  },
};

const buildOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
  didYouMean: {
    alternateMode: undefined,
    optionDeclarations: buildOpts,
    unknownOptionDiagnostic: Diagnostics.Unknown_build_option_0,
    unknownDidYouMeanDiagnostic: Diagnostics.Unknown_build_option_0_Did_you_mean_1,
  },
};
