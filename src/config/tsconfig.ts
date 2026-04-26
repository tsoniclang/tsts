import { dirname, join } from "node:path";
import type { CompilerHost, CompilerOptions } from "../program/index.js";

export interface TsConfig {
  readonly fileName: string;
  readonly rootNames: readonly string[];
  readonly options: CompilerOptions;
}

export interface TsConfigDiagnostic {
  readonly fileName: string;
  readonly message: string;
}

export interface TsConfigParseResult {
  readonly config?: TsConfig;
  readonly diagnostics: readonly TsConfigDiagnostic[];
}

interface RawTsConfig {
  readonly compilerOptions?: unknown;
  readonly files?: unknown;
  readonly include?: unknown;
  readonly exclude?: unknown;
}

export function loadTsConfig(fileName: string, host: Pick<CompilerHost, "readFile">): TsConfigParseResult {
  const text = host.readFile(fileName);
  if (text === undefined) {
    return {
      diagnostics: [{ fileName, message: `File not found: ${fileName}` }],
    };
  }
  return parseTsConfigText(fileName, text);
}

export function parseTsConfigText(fileName: string, text: string): TsConfigParseResult {
  const diagnostics: TsConfigDiagnostic[] = [];
  let raw: unknown;
  try {
    raw = JSON.parse(stripJsonCommentsAndTrailingCommas(text));
  } catch (error) {
    diagnostics.push({
      fileName,
      message: `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`,
    });
    return { diagnostics };
  }
  if (!isRecord(raw)) {
    return {
      diagnostics: [{ fileName, message: "tsconfig root must be an object" }],
    };
  }

  const baseDirectory = dirname(fileName);
  const options = parseCompilerOptions(fileName, raw.compilerOptions, diagnostics);
  const rootNames = parseRootNames(fileName, baseDirectory, raw, diagnostics);
  if (diagnostics.length > 0) {
    return { diagnostics };
  }
  return {
    config: {
      fileName,
      rootNames,
      options,
    },
    diagnostics,
  };
}

function parseCompilerOptions(fileName: string, value: unknown, diagnostics: TsConfigDiagnostic[]): CompilerOptions {
  if (value === undefined) {
    return {};
  }
  if (!isRecord(value)) {
    diagnostics.push({ fileName, message: "compilerOptions must be an object" });
    return {};
  }
  const outDir = value.outDir;
  if (outDir !== undefined && typeof outDir !== "string") {
    diagnostics.push({ fileName, message: "compilerOptions.outDir must be a string" });
    return {};
  }
  return outDir === undefined ? {} : { outDir };
}

function parseRootNames(fileName: string, baseDirectory: string, raw: RawTsConfig, diagnostics: TsConfigDiagnostic[]): readonly string[] {
  if (raw.files !== undefined) {
    if (!Array.isArray(raw.files) || raw.files.some(file => typeof file !== "string")) {
      diagnostics.push({ fileName, message: "files must be an array of strings" });
      return [];
    }
    return raw.files.map(file => join(baseDirectory, file));
  }
  if (raw.include !== undefined || raw.exclude !== undefined) {
    diagnostics.push({ fileName, message: "include/exclude expansion is not implemented; use files for now" });
    return [];
  }
  diagnostics.push({ fileName, message: "tsconfig must specify files until include expansion is implemented" });
  return [];
}

function stripJsonCommentsAndTrailingCommas(text: string): string {
  let output = "";
  let index = 0;
  let inString = false;
  let stringQuote = "";
  while (index < text.length) {
    const char = text[index]!;
    const next = text[index + 1];
    if (inString) {
      output += char;
      if (char === "\\") {
        output += next ?? "";
        index += 2;
        continue;
      }
      if (char === stringQuote) {
        inString = false;
        stringQuote = "";
      }
      index += 1;
      continue;
    }
    if (char === "\"" || char === "'") {
      inString = true;
      stringQuote = char;
      output += char;
      index += 1;
      continue;
    }
    if (char === "/" && next === "/") {
      index += 2;
      while (index < text.length && text[index] !== "\n" && text[index] !== "\r") {
        index += 1;
      }
      continue;
    }
    if (char === "/" && next === "*") {
      index += 2;
      while (index < text.length && !(text[index] === "*" && text[index + 1] === "/")) {
        index += 1;
      }
      index = Math.min(index + 2, text.length);
      continue;
    }
    output += char;
    index += 1;
  }
  return removeTrailingCommas(output);
}

function removeTrailingCommas(text: string): string {
  let output = "";
  let index = 0;
  let inString = false;
  while (index < text.length) {
    const char = text[index]!;
    if (inString) {
      output += char;
      if (char === "\\") {
        output += text[index + 1] ?? "";
        index += 2;
        continue;
      }
      if (char === "\"") {
        inString = false;
      }
      index += 1;
      continue;
    }
    if (char === "\"") {
      inString = true;
      output += char;
      index += 1;
      continue;
    }
    if (char === ",") {
      let lookahead = index + 1;
      while (/\s/.test(text[lookahead] ?? "")) {
        lookahead += 1;
      }
      if (text[lookahead] === "}" || text[lookahead] === "]") {
        index += 1;
        continue;
      }
    }
    output += char;
    index += 1;
  }
  return output;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
