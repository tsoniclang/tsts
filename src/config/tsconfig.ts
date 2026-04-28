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

const supportedRootExtensions = [".ts", ".tsx", ".d.ts"] as const;
const defaultExcludePatterns = ["node_modules", "bower_components", "jspm_packages"] as const;

export function loadTsConfig(fileName: string, host: Pick<CompilerHost, "readFile" | "readDirectory">): TsConfigParseResult {
  const text = host.readFile(fileName);
  if (text === undefined) {
    return {
      diagnostics: [{ fileName, message: `File not found: ${fileName}` }],
    };
  }
  return parseTsConfigText(fileName, text, host);
}

export function parseTsConfigText(fileName: string, text: string, host?: Pick<CompilerHost, "readDirectory">): TsConfigParseResult {
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
  const rootNames = parseRootNames(fileName, baseDirectory, raw, options, diagnostics, host);
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
  const allowSyntheticDefaultImports = parseBooleanCompilerOption(fileName, "allowSyntheticDefaultImports", value.allowSyntheticDefaultImports, diagnostics);
  const allowUnreachableCode = parseBooleanCompilerOption(fileName, "allowUnreachableCode", value.allowUnreachableCode, diagnostics);
  const alwaysStrict = parseBooleanCompilerOption(fileName, "alwaysStrict", value.alwaysStrict, diagnostics);
  const preserveConstEnums = parseBooleanCompilerOption(fileName, "preserveConstEnums", value.preserveConstEnums, diagnostics);
  const esModuleInterop = parseBooleanCompilerOption(fileName, "esModuleInterop", value.esModuleInterop, diagnostics);
  const noUncheckedSideEffectImports = parseBooleanCompilerOption(fileName, "noUncheckedSideEffectImports", value.noUncheckedSideEffectImports, diagnostics);
  const strict = parseBooleanCompilerOption(fileName, "strict", value.strict, diagnostics);
  const noImplicitAny = parseBooleanCompilerOption(fileName, "noImplicitAny", value.noImplicitAny, diagnostics);
  const noUnusedLocals = parseBooleanCompilerOption(fileName, "noUnusedLocals", value.noUnusedLocals, diagnostics);
  const noUnusedParameters = parseBooleanCompilerOption(fileName, "noUnusedParameters", value.noUnusedParameters, diagnostics);
  const strictNullChecks = parseBooleanCompilerOption(fileName, "strictNullChecks", value.strictNullChecks, diagnostics);
  const strictPropertyInitialization = parseBooleanCompilerOption(fileName, "strictPropertyInitialization", value.strictPropertyInitialization, diagnostics);
  const exactOptionalPropertyTypes = parseBooleanCompilerOption(fileName, "exactOptionalPropertyTypes", value.exactOptionalPropertyTypes, diagnostics);
  const experimentalDecorators = parseBooleanCompilerOption(fileName, "experimentalDecorators", value.experimentalDecorators, diagnostics);
  const emitDecoratorMetadata = parseBooleanCompilerOption(fileName, "emitDecoratorMetadata", value.emitDecoratorMetadata, diagnostics);
  return {
    ...(outDir === undefined ? {} : { outDir }),
    ...(allowSyntheticDefaultImports === undefined ? {} : { allowSyntheticDefaultImports }),
    ...(allowUnreachableCode === undefined ? {} : { allowUnreachableCode }),
    ...(alwaysStrict === undefined ? {} : { alwaysStrict }),
    ...(preserveConstEnums === undefined ? {} : { preserveConstEnums }),
    ...(esModuleInterop === undefined ? {} : { esModuleInterop }),
    ...(noUncheckedSideEffectImports === undefined ? {} : { noUncheckedSideEffectImports }),
    ...(strict === undefined ? {} : { strict }),
    ...(noImplicitAny === undefined ? {} : { noImplicitAny }),
    ...(noUnusedLocals === undefined ? {} : { noUnusedLocals }),
    ...(noUnusedParameters === undefined ? {} : { noUnusedParameters }),
    ...(strictNullChecks === undefined ? {} : { strictNullChecks }),
    ...(strictPropertyInitialization === undefined ? {} : { strictPropertyInitialization }),
    ...(exactOptionalPropertyTypes === undefined ? {} : { exactOptionalPropertyTypes }),
    ...(experimentalDecorators === undefined ? {} : { experimentalDecorators }),
    ...(emitDecoratorMetadata === undefined ? {} : { emitDecoratorMetadata }),
  };
}

function parseBooleanCompilerOption(fileName: string, optionName: string, value: unknown, diagnostics: TsConfigDiagnostic[]): boolean | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (typeof value !== "boolean") {
    diagnostics.push({ fileName, message: `compilerOptions.${optionName} must be a boolean` });
    return undefined;
  }
  return value;
}

function parseRootNames(
  fileName: string,
  baseDirectory: string,
  raw: RawTsConfig,
  options: CompilerOptions,
  diagnostics: TsConfigDiagnostic[],
  host: Pick<CompilerHost, "readDirectory"> | undefined,
): readonly string[] {
  if (raw.files !== undefined) {
    if (!Array.isArray(raw.files) || raw.files.some(file => typeof file !== "string")) {
      diagnostics.push({ fileName, message: "files must be an array of strings" });
      return [];
    }
    return raw.files.map(file => join(baseDirectory, file));
  }
  const include = parseStringArrayOption(fileName, "include", raw.include, diagnostics);
  const exclude = parseStringArrayOption(fileName, "exclude", raw.exclude, diagnostics);
  if (diagnostics.length > 0) {
    return [];
  }
  if (host?.readDirectory === undefined) {
    diagnostics.push({ fileName, message: "include/exclude expansion requires CompilerHost.readDirectory" });
    return [];
  }
  const includePatterns = include ?? ["**/*"];
  const excludePatterns = [...defaultExcludePatterns, ...(options.outDir === undefined ? [] : [options.outDir]), ...(exclude ?? [])];
  return host.readDirectory(baseDirectory, supportedRootExtensions, excludePatterns, includePatterns);
}

function parseStringArrayOption(
  fileName: string,
  optionName: "include" | "exclude",
  value: unknown,
  diagnostics: TsConfigDiagnostic[],
): readonly string[] | undefined {
  if (value === undefined) {
    return undefined;
  }
  if (!Array.isArray(value) || value.some(element => typeof element !== "string")) {
    diagnostics.push({ fileName, message: `${optionName} must be an array of strings` });
    return undefined;
  }
  return value;
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
