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

import type { CommandLineOption } from "./commandlineoption.js";
import type { ParsedCommandLine } from "./parsedcommandline.js";
import type { ParsedBuildCommandLine } from "./parsedbuildcommandline.js";
import type { ParseConfigHost } from "./tsconfigparsing.js";
import type { Diagnostic } from "../ast/index.js";
import { OrderedMap } from "../collections/ordered_map.js";

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
  getOptionsNameMap: () => ReadonlyMap<string, CommandLineOption>;
}

export interface DiagnosticMessage {
  readonly key: string;
}

interface CommandLineParserState {
  workerDiagnostics: ParseCommandLineWorkerDiagnostics;
  optionsMap: ReadonlyMap<string, CommandLineOption>;
  options: OrderedMap<string, unknown>;
  fileNames: string[];
  errors: Diagnostic[];
}

export function parseCommandLine(
  commandLine: readonly string[] | undefined,
  host: ParseConfigHost,
): ParsedCommandLine {
  const tokens = commandLine ?? [];
  const parser = parseCommandLineWorker(compilerOptionsDidYouMeanDiagnostics, tokens, host);
  const compilerOptions: Record<string, unknown> = {};
  for (const [k, v] of parser.options.entries()) compilerOptions[k] = v;
  return {
    options: compilerOptions,
    fileNames: parser.fileNames,
    errors: parser.errors,
    raw: undefined,
    projectReferences: undefined,
    typeAcquisition: undefined,
    watchOptions: undefined,
  } as unknown as ParsedCommandLine;
}

export function parseBuildCommandLine(
  commandLine: readonly string[] | undefined,
  host: ParseConfigHost,
): ParsedBuildCommandLine {
  const tokens = commandLine ?? [];
  const parser = parseCommandLineWorker(buildOptionsDidYouMeanDiagnostics, tokens, host);
  const buildOptions: Record<string, unknown> = {};
  for (const [k, v] of parser.options.entries()) buildOptions[k] = v;
  return {
    buildOptions,
    compilerOptions: {},
    watchOptions: undefined,
    fileNames: parser.fileNames,
    errors: parser.errors,
    projects: parser.fileNames,
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

  const state: CommandLineParserState = {
    workerDiagnostics: diagnostics,
    optionsMap,
    options: new OrderedMap<string, unknown>(),
    fileNames: [],
    errors: [],
  };

  let i = 0;
  while (i < commandLine.length) {
    const token = commandLine[i]!;
    if (token === "") {
      i++;
      continue;
    }
    if (token.startsWith("--") || token.startsWith("-") || token.startsWith("/")) {
      const optName = token.replace(/^(--|-|\/)/, "").toLowerCase();
      const opt = optionsMap.get(optName);
      if (opt === undefined) {
        // Unknown — skip
        i++;
        continue;
      }
      const { value, advance } = parseOptionValue(opt, commandLine, i + 1);
      state.options.set(opt.name, value);
      i += 1 + advance;
    } else {
      state.fileNames.push(token);
      i++;
    }
  }

  void host; // host used in full version to validate paths against fs
  return state;
}

function parseOptionValue(
  opt: CommandLineOption,
  tokens: readonly string[],
  from: number,
): { value: unknown; advance: number } {
  switch (opt.type) {
    case "boolean":
      if (from < tokens.length && (tokens[from] === "true" || tokens[from] === "false")) {
        return { value: tokens[from] === "true", advance: 1 };
      }
      return { value: true, advance: 0 };
    case "number": {
      const raw = tokens[from];
      if (raw === undefined) return { value: undefined, advance: 0 };
      const n = Number(raw);
      return { value: Number.isFinite(n) ? n : undefined, advance: 1 };
    }
    case "string":
      return { value: tokens[from] ?? "", advance: 1 };
    case "list":
    case "listOrElement":
      return { value: (tokens[from] ?? "").split(","), advance: 1 };
    case "object":
      return { value: undefined, advance: 0 };
  }
  if (opt.type instanceof Map) {
    const m = opt.type as ReadonlyMap<string, number>;
    const raw = tokens[from];
    if (raw === undefined) return { value: undefined, advance: 0 };
    return { value: m.get(raw.toLowerCase()), advance: 1 };
  }
  return { value: undefined, advance: 0 };
}

// ---------------------------------------------------------------------------
// Placeholder diagnostics — production versions live in declscompiler/etc.
// ---------------------------------------------------------------------------

const compilerOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
  didYouMean: {
    alternateMode: undefined,
    optionDeclarations: [],
    unknownOptionDiagnostic: { key: "Unknown_compiler_option_0" },
    unknownDidYouMeanDiagnostic: { key: "Unknown_compiler_option_0_Did_you_mean_1" },
  },
};

const buildOptionsDidYouMeanDiagnostics: ParseCommandLineWorkerDiagnostics = {
  didYouMean: {
    alternateMode: undefined,
    optionDeclarations: [],
    unknownOptionDiagnostic: { key: "Unknown_build_option_0" },
    unknownDidYouMeanDiagnostic: { key: "Unknown_build_option_0_Did_you_mean_1" },
  },
};
