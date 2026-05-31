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
}

export interface TestCase {
  readonly directives: TestCaseDirectives;
  readonly files: readonly TestCaseFile[];
}

const DIRECTIVE_LINE = /^\s*\/\/\s*@(\w+)\s*:\s*(.*?)\s*$/;
const DEFAULT_FILENAME = "default";

export function parseTestCase(path: string, name: string, contents: string): TestCase {
  const lines = contents.split(/\r?\n/);
  const directives = new Map<string, string>();
  const unknownDirectives = new Map<string, string>();
  const files: TestCaseFile[] = [];

  let currentFileName: string | undefined;
  let currentLines: string[] = [];
  const defaultFileName = `${fileBaseName(name)}.ts`;

  for (const line of lines) {
    const match = DIRECTIVE_LINE.exec(line);
    if (match === null) {
      if (currentLines.length > 0) {
        currentLines.push(line);
      } else if (line !== "") {
        currentLines.push(line);
      } else {
        currentLines.push(line);
      }
      continue;
    }

    const directive = match[1]!;
    const value = match[2]!;
    if (isFilenameDirective(directive)) {
      if (currentLines.length > 0 || currentFileName !== undefined) {
        files.push({
          fileName: currentFileName ?? defaultFileName,
          content: normalizeFileText(currentLines.join("\n")),
        });
      }
      currentFileName = value.trim();
      currentLines = [];
      continue;
    }

    const key = directive.toLowerCase();
    if (isKnownDirective(key)) {
      if (!directives.has(key)) {
        directives.set(key, value.trim());
      }
      continue;
    }
    if (!unknownDirectives.has(directive)) {
      unknownDirectives.set(directive, value.trim());
    }
  }

  if (currentLines.length > 0 || currentFileName !== undefined) {
    files.push({
      fileName: currentFileName ?? defaultFileName,
      content: normalizeFileText(currentLines.join("\n")),
    });
  }

  if (files.length === 0) {
    files.push({
      fileName: defaultFileName,
      content: "",
    });
  }

  const normalized = normalizeDirectives(directives, unknownDirectives);
  void path;
  return {
    directives: normalized,
    files,
  };
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

  categorize(diffPath: string): "accepted" | "triaged" | "new" {
    const normalized = normalizePath(diffPath);
    if (this.accepted.has(normalized)) return "accepted";
    if (this.triaged.has(normalized)) return "triaged";
    return "new";
  }
}

function isKnownDirective(key: string): boolean {
  return key === "target" || key === "strict" || key === "noemit" || key === "lib";
}

function fileBaseName(testName: string): string {
  const slashIndex = testName.lastIndexOf("/");
  const base = slashIndex === -1 ? testName : testName.slice(slashIndex + 1);
  return base.length === 0 ? DEFAULT_FILENAME : base;
}

function normalizeFileText(text: string): string {
  if (text.length === 0) return "";
  return text.trimEnd();
}

function isFilenameDirective(directive: string): boolean {
  const lower = directive.toLowerCase();
  return lower === "filename";
}

function normalizeDirectives(
  values: ReadonlyMap<string, string>,
  unknown: Map<string, string>,
): TestCaseDirectives {
  const out: { target?: string; strict?: boolean; noEmit?: boolean; lib?: readonly string[]; unknown?: Map<string, string> } = {};

  for (const [key, value] of values) {
    if (key === "target") {
      out.target = value;
      continue;
    }
    if (key === "strict") {
      out.strict = parseBoolean(value);
      continue;
    }
    if (key === "noemit") {
      out.noEmit = parseBoolean(value);
      continue;
    }
    if (key === "lib") {
      out.lib = value.split(",").map((item) => item.trim()).filter((item) => item !== "");
      continue;
    }
    unknown.set(key, value);
  }

  if (unknown.size > 0) out.unknown = unknown;
  return out;
}

function parseBoolean(raw: string): boolean {
  const value = raw.toLowerCase();
  return value === "true" || value === "1" || value === "yes";
}

function loadDiffList(path: string): ReadonlySet<string> {
  if (!existsSync(path)) return new Set();
  const text = readFileSync(path, "utf8");
  const parsed = new Set<string>();
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    if (trimmed.startsWith("#")) continue;
    if (trimmed.startsWith("##")) continue;
    parsed.add(normalizePath(trimmed));
  }
  return parsed;
}

function normalizePath(path: string): string {
  return path.replace(/\\/g, "/");
}
