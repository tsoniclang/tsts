import { normalizeNewlines } from "../stringtestutil/stringTestUtil.js";
import { optionDeclarations, type CommandLineOption } from "../../tsoptions/index.js";
import { parseListTypeOption } from "../../tsoptions/commandLineParser.js";

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
