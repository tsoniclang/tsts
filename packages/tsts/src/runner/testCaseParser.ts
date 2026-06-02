import { existsSync, readFileSync } from "node:fs";

export interface TestCaseDirectives {
  target?: string;
  strict?: boolean;
  noEmit?: boolean;
  lib?: readonly string[];
  unknown?: Map<string, string>;
}

export interface TestCaseFile {
  readonly fileName: string;
  readonly content: string;
  readonly fileOptions?: ReadonlyMap<string, string>;
}

export type RawCompilerSettings = ReadonlyMap<string, string>;

export interface TestUnit {
  readonly content: string;
  readonly name: string;
}

export interface ParsedCommandLine {
  readonly fileNames: readonly string[];
}

export interface TestCaseContent {
  readonly testUnitData: readonly TestUnit[];
  readonly tsConfig: ParsedCommandLine | undefined;
  readonly tsConfigFileUnitData: TestUnit | undefined;
  readonly symlinks: ReadonlyMap<string, string>;
}

export interface TestCase {
  readonly directives: TestCaseDirectives;
  readonly files: readonly TestCaseFile[];
  readonly symlinks: ReadonlyMap<string, string>;
  readonly currentDirectory: string | undefined;
  readonly globalOptions: ReadonlyMap<string, string>;
}

export interface ParseTestFilesOptions {
  readonly allowImplicitFirstFile?: boolean;
}

export interface ParsedTestFiles<T> {
  readonly units: readonly T[];
  readonly symlinks: ReadonlyMap<string, string>;
  readonly currentDirectory: string | undefined;
  readonly globalOptions: ReadonlyMap<string, string>;
}

const lineDelimiter = /\r?\n/;
const optionRegex = /^\/\/\s*@(\w+)\s*:\s*([^\r\n]*)/;
const linkRegex = /^\/\/\s*@link\s*:\s*([^\r\n]*)\s*->\s*([^\r\n]*)/;
const fourslashDirectives: readonly string[] = ["emitthisfile"];

export function makeUnitsFromTest(code: string, fileName: string): TestCaseContent {
  const parsed = parseTestFilesAndSymlinks(
    code,
    fileName,
    (name, content) => ({ content, name }),
  );
  const units = [...parsed.units];
  let tsConfig: ParsedCommandLine | undefined;
  let tsConfigFileUnitData: TestUnit | undefined;
  for (let index = 0; index < units.length; index += 1) {
    const unit = units[index]!;
    if (getConfigNameFromFileName(unit.name) === "") continue;
    const parsedNames = parseJsonConfigFileNames(unit.content);
    tsConfig = { fileNames: parsedNames };
    tsConfigFileUnitData = unit;
    units.splice(index, 1);
    break;
  }
  return {
    testUnitData: units,
    tsConfig,
    tsConfigFileUnitData,
    symlinks: parsed.symlinks,
  };
}

export function parseTestCase(path: string, name: string, contents: string): TestCase {
  const parsed = parseTestFilesAndSymlinks(
    contents,
    defaultFileName(path, name),
    (fileName, content, fileOptions) => ({
      fileName,
      content,
      fileOptions,
    }),
  );
  return {
    directives: normalizeDirectives(parsed.globalOptions),
    files: parsed.units,
    symlinks: parsed.symlinks,
    currentDirectory: parsed.currentDirectory,
    globalOptions: parsed.globalOptions,
  };
}

export function parseTestFilesAndSymlinks<T>(
  code: string,
  fileName: string,
  parseFile: (filename: string, content: string, fileOptions: ReadonlyMap<string, string>) => T,
): ParsedTestFiles<T> {
  return parseTestFilesAndSymlinksWithOptions(code, fileName, parseFile, {});
}

export function parseTestFilesAndSymlinksWithOptions<T>(
  code: string,
  fileName: string,
  parseFile: (filename: string, content: string, fileOptions: ReadonlyMap<string, string>) => T,
  options: ParseTestFilesOptions,
): ParsedTestFiles<T> {
  const units: T[] = [];
  const lines = code.split(lineDelimiter);
  const symlinks = new Map<string, string>();
  const globalOptions = new Map<string, string>();

  let currentFileContent = "";
  let currentFileName = options.allowImplicitFirstFile === true ? fileName : "";
  let currentDirectory: string | undefined;
  let seenContentLine = false;
  let hasSeenFile = false;
  let currentFileOptions = new Map<string, string>();

  const appendContentLine = (line: string): void => {
    if (options.allowImplicitFirstFile === true) {
      if (seenContentLine) currentFileContent += "\n";
      seenContentLine = true;
    } else if (currentFileContent.length !== 0) {
      currentFileContent += "\n";
    }
    currentFileContent += line;
  };

  const flushCurrentFile = (): void => {
    const shouldSave = options.allowImplicitFirstFile !== true || currentFileContent.length !== 0 || hasSeenFile;
    if (!shouldSave) return;
    hasSeenFile = true;
    units.push(parseFile(currentFileName, currentFileContent, currentFileOptions));
  };

  const resetCurrentFile = (nextFileName: string): void => {
    currentFileContent = "";
    currentFileName = nextFileName;
    currentFileOptions = new Map<string, string>();
    seenContentLine = false;
  };

  for (const line of lines) {
    if (parseSymlinkFromTest(line, symlinks)) {
      continue;
    }

    const metadata = optionRegex.exec(line);
    if (metadata === null) {
      appendContentLine(line);
      continue;
    }

    const metadataRawName = metadata[1]!;
    const metadataName = metadataRawName.toLowerCase();
    const metadataValue = metadata[2]!.trim();
    if (metadataName === "currentdirectory") {
      currentDirectory = metadataValue;
    }

    if (metadataName !== "filename") {
      if (metadataName === "symlink" && currentFileName !== "") {
        for (const link of metadataValue.split(",")) {
          const trimmed = link.trim();
          if (trimmed !== "") symlinks.set(trimmed, currentFileName);
        }
      } else if (fourslashDirectives.includes(metadataName)) {
        currentFileOptions.set(metadataName, metadataValue);
      } else if (!hasGlobalOption(globalOptions, metadataRawName)) {
        // First occurrence wins: a repeated directive does not overwrite the
        // earlier value. The directive name keeps its original casing.
        globalOptions.set(metadataRawName, trimTrailingSemicolon(metadataValue));
      }
      continue;
    }

    if (currentFileName !== "") {
      flushCurrentFile();
      resetCurrentFile(metadataValue);
      continue;
    }

    const hasContentBeforeFirstFilename = hasNonCommentContent(currentFileContent);
    if (hasContentBeforeFirstFilename && options.allowImplicitFirstFile !== true) {
      throw new Error("Non-comment test content appears before the first '// @Filename' directive");
    }

    if (hasContentBeforeFirstFilename && options.allowImplicitFirstFile === true) {
      flushCurrentFile();
    }
    resetCurrentFile(metadataValue);
  }

  if (units.length === 0 && currentFileName === "") {
    currentFileName = baseFileName(fileName);
  }
  units.push(parseFile(currentFileName, currentFileContent, currentFileOptions));

  return {
    units,
    symlinks,
    currentDirectory,
    globalOptions,
  };
}

function hasGlobalOption(options: ReadonlyMap<string, string>, name: string): boolean {
  const lowered = name.toLowerCase();
  for (const key of options.keys()) {
    if (key.toLowerCase() === lowered) return true;
  }
  return false;
}

function normalizeDirectives(options: ReadonlyMap<string, string>): TestCaseDirectives {
  const unknown = new Map<string, string>();
  const result: TestCaseDirectives = {};
  for (const [key, value] of options) {
    // Known directive names are matched case-insensitively; unknown directives
    // are surfaced under their original casing.
    const knownKey = key.toLowerCase();
    if (knownKey === "target") {
      result.target = value;
    } else if (knownKey === "strict") {
      result.strict = parseBoolean(value);
    } else if (knownKey === "noemit") {
      result.noEmit = parseBoolean(value);
    } else if (knownKey === "lib") {
      result.lib = value.split(",").map((item) => item.trim()).filter((item) => item !== "");
    } else {
      unknown.set(key, value);
    }
  }
  if (unknown.size > 0) result.unknown = unknown;
  return result;
}

function parseBoolean(raw: string): boolean {
  const value = raw.toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

function defaultFileName(path: string, name: string): string {
  if (name !== "") return baseFileName(name) + ".ts";
  return baseFileName(path);
}

function baseFileName(path: string): string {
  const normalized = path.replace(/\\/g, "/");
  const slash = normalized.lastIndexOf("/");
  return slash === -1 ? normalized : normalized.slice(slash + 1);
}

function trimTrailingSemicolon(value: string): string {
  return value.endsWith(";") ? value.slice(0, -1).trimEnd() : value;
}

function hasNonCommentContent(text: string): boolean {
  for (const line of text.split(lineDelimiter)) {
    const trimmed = line.trim();
    if (trimmed !== "" && !trimmed.startsWith("//")) return true;
  }
  return false;
}

function parseSymlinkFromTest(line: string, symlinks: Map<string, string>): boolean {
  const metadata = linkRegex.exec(line);
  if (metadata === null) return false;
  symlinks.set(metadata[2]!.trim(), metadata[1]!.trim());
  return true;
}

export function extractCompilerSettings(content: string): RawCompilerSettings {
  const opts = new Map<string, string>();
  for (const line of content.split(lineDelimiter)) {
    const metadata = optionRegex.exec(line);
    if (metadata === null) continue;
    opts.set(metadata[1]!.toLowerCase(), trimTrailingSemicolon(metadata[2]!.trim()));
  }
  return opts;
}

function getConfigNameFromFileName(fileName: string): string {
  const normalized = fileName.replace(/\\/g, "/").toLowerCase();
  return normalized.endsWith("/tsconfig.json") || normalized === "tsconfig.json" ? "tsconfig.json" : "";
}

function parseJsonConfigFileNames(content: string): readonly string[] {
  try {
    const parsed = JSON.parse(content) as { files?: unknown };
    if (!Array.isArray(parsed.files)) return [];
    return parsed.files.filter((value): value is string => typeof value === "string");
  } catch {
    return [];
  }
}

export interface DiffCategorizerOptions {
  readonly acceptedListPath: string;
  readonly triagedListPath: string;
}

export class DiffCategorizer {
  private readonly accepted: ReadonlySet<string>;
  private readonly triaged: ReadonlySet<string>;

  constructor(options: DiffCategorizerOptions) {
    this.accepted = loadDiffList(options.acceptedListPath);
    this.triaged = loadDiffList(options.triagedListPath);
  }

  acceptedCount(): number {
    return this.accepted.size;
  }

  triagedCount(): number {
    return this.triaged.size;
  }

  categorize(diffName: string, _kind?: string): "accepted" | "triaged" | "new" {
    const normalized = normalizePath(diffName);
    if (this.accepted.has(normalized)) return "accepted";
    if (this.triaged.has(normalized)) return "triaged";
    return "new";
  }
}

function loadDiffList(path: string): ReadonlySet<string> {
  if (!existsSync(path)) return new Set();
  const text = readFileSync(path, "utf8");
  const result = new Set<string>();
  for (const line of text.split(lineDelimiter)) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;
    result.add(normalizePath(trimmed));
  }
  return result;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}
