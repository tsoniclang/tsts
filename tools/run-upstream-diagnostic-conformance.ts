import { existsSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { basename, dirname, join, relative } from "node:path";
import * as ts from "typescript";
import { createProgram, getProgramDiagnostics, type CompilerHost, type ProgramDiagnostic } from "../src/program/index.js";

interface CaseFile {
  readonly fileName: string;
  readonly text: string;
}

interface CompilerCase {
  readonly name: string;
  readonly path: string;
  readonly files: readonly CaseFile[];
  readonly compilerOptions: ts.CompilerOptions;
}

interface ComparableDiagnostic {
  readonly code: number | undefined;
  readonly message: string;
  readonly fileName: string | undefined;
}

interface CaseResult {
  readonly name: string;
  readonly path: string;
  readonly status: "passed" | "failed";
  readonly rootCause: string;
  readonly upstream: readonly ComparableDiagnostic[];
  readonly actual: readonly ComparableDiagnostic[];
  readonly error: string | undefined;
}

interface Options {
  readonly suite: "typescript" | "tsgo";
  readonly filter: string | undefined;
  readonly limit: number | undefined;
  readonly allowFailures: boolean;
  readonly outFile: string;
}

const defaultCompilerOptions: ts.CompilerOptions = {
  module: ts.ModuleKind.ESNext,
  noEmit: true,
  ignoreDeprecations: "6.0",
  strict: false,
  target: ts.ScriptTarget.ES2024,
};

function parseArgs(args: readonly string[]): Options {
  let suite: Options["suite"] = "typescript";
  let filter: string | undefined;
  let limit: number | undefined;
  let allowFailures = false;
  let outFile = ".temp/conformance/diagnostics.json";

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]!;
    if (arg === "--suite") {
      suite = parseSuite(args[++index]);
      continue;
    }
    if (arg === "--filter") {
      filter = args[++index];
      continue;
    }
    if (arg === "--limit") {
      const parsed = Number(args[++index]);
      if (!Number.isInteger(parsed) || parsed <= 0) throw new Error("--limit must be a positive integer");
      limit = parsed;
      continue;
    }
    if (arg === "--allow-failures") {
      allowFailures = true;
      continue;
    }
    if (arg === "--out") {
      outFile = args[++index] ?? outFile;
      continue;
    }
    throw new Error(`Unknown argument ${arg}`);
  }

  return { suite, filter, limit, allowFailures, outFile };
}

function parseSuite(value: string | undefined): Options["suite"] {
  if (value === "typescript" || value === "tsgo") {
    return value;
  }
  throw new Error("--suite must be 'typescript' or 'tsgo'");
}

function suiteDirectory(suite: Options["suite"]): string {
  if (suite === "typescript") {
    const repo = process.env.TYPESCRIPT_REPO ?? "/home/jester/repos/microsoft/TypeScript";
    return join(repo, "tests/cases/compiler");
  }
  const repo = process.env.TSGO_REPO ?? "/home/jester/repos/microsoft/typescript-go";
  return join(repo, "testdata/tests/cases/compiler");
}

async function discoverCases(options: Options): Promise<readonly CompilerCase[]> {
  const directory = suiteDirectory(options.suite);
  if (!existsSync(directory)) {
    throw new Error(`Upstream ${options.suite} compiler test directory does not exist: ${directory}`);
  }

  const names = (await readdir(directory))
    .filter(name => name.endsWith(".ts") || name.endsWith(".tsx"))
    .filter(name => options.filter === undefined || name.includes(options.filter))
    .sort();
  const selected = options.limit === undefined ? names : names.slice(0, options.limit);
  return Promise.all(selected.map(async name => {
    const path = join(directory, name);
    return parseCompilerCase(name, path, await readFile(path, "utf8"));
  }));
}

function parseCompilerCase(name: string, path: string, text: string): CompilerCase {
  const fileSections: CaseFile[] = [];
  const compilerOptions = parseCompilerOptions(text);
  let currentFileName: string | undefined;
  let currentText: string[] = [];

  for (const line of text.split(/\r?\n/)) {
    const filename = line.match(/^\s*\/\/\s*@filename:\s*(.+?)\s*$/i)?.[1];
    if (filename !== undefined) {
      if (currentFileName !== undefined) {
        fileSections.push({ fileName: currentFileName, text: currentText.join("\n") });
      }
      currentFileName = filename;
      currentText = [];
      continue;
    }
    if (currentFileName !== undefined) {
      currentText.push(line);
    }
  }

  if (currentFileName !== undefined) {
    fileSections.push({ fileName: currentFileName, text: currentText.join("\n") });
  }

  if (fileSections.length > 0) {
    return {
      name,
      path,
      compilerOptions,
      files: fileSections.filter(file => file.fileName.endsWith(".ts") || file.fileName.endsWith(".tsx")),
    };
  }

  return {
    name,
    path,
    compilerOptions,
    files: [{ fileName: name, text }],
  };
}

function upstreamDiagnostics(testCase: CompilerCase): readonly ComparableDiagnostic[] {
  const fileMap = new Map(testCase.files.map(file => [normalizeFileName(file.fileName), file.text]));
  const rootNames = [...fileMap.keys()];
  const compilerOptions = { ...defaultCompilerOptions, ...testCase.compilerOptions };
  const host = ts.createCompilerHost(compilerOptions);
  const defaultFileExists = host.fileExists.bind(host);
  const defaultReadFile = host.readFile.bind(host);
  const defaultGetSourceFile = host.getSourceFile.bind(host);
  host.fileExists = name => fileMap.has(normalizeFileName(name)) || defaultFileExists(name);
  host.readFile = name => fileMap.get(normalizeFileName(name)) ?? defaultReadFile(name);
  host.getSourceFile = (name, languageVersion) => {
    const text = fileMap.get(normalizeFileName(name));
    return text === undefined ? defaultGetSourceFile(name, languageVersion) : ts.createSourceFile(name, text, languageVersion, true);
  };

  const program = ts.createProgram(rootNames, compilerOptions, host);
  return ts.getPreEmitDiagnostics(program)
    .filter(diagnostic => diagnostic.file === undefined || fileMap.has(normalizeFileName(diagnostic.file.fileName)))
    .map(diagnostic => ({
      code: diagnostic.code,
      fileName: diagnostic.file === undefined ? undefined : normalizeFileName(diagnostic.file.fileName),
      message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
    }))
    .sort(compareDiagnostics);
}

function parseCompilerOptions(text: string): ts.CompilerOptions {
  const options: ts.CompilerOptions = {};
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*\/\/\s*@([A-Za-z0-9_]+)(?::\s*(.*?))?\s*$/);
    if (match === null) {
      continue;
    }
    const name = match[1]!.toLowerCase();
    const value = match[2]?.trim() ?? "true";
    switch (name) {
      case "target":
        options.target = parseScriptTarget(value);
        break;
      case "module":
        options.module = parseModuleKind(value);
        break;
      case "strict":
        options.strict = parseBoolean(value);
        break;
      case "noimplicitany":
        options.noImplicitAny = parseBoolean(value);
        break;
      case "strictnullchecks":
        options.strictNullChecks = parseBoolean(value);
        break;
      case "exactoptionalpropertytypes":
        options.exactOptionalPropertyTypes = parseBoolean(value);
        break;
      case "nolib":
        options.noLib = parseBoolean(value);
        break;
      case "allowjs":
        options.allowJs = parseBoolean(value);
        break;
      case "checkjs":
        options.checkJs = parseBoolean(value);
        break;
      case "jsx":
        options.jsx = parseJsxEmit(value);
        break;
      default:
        break;
    }
  }
  return options;
}

function parseBoolean(value: string): boolean {
  return value.toLowerCase() !== "false";
}

function parseScriptTarget(value: string): ts.ScriptTarget {
  const normalized = value.toLowerCase();
  const targets: Record<string, ts.ScriptTarget> = {
    es3: ts.ScriptTarget.ES3,
    es5: ts.ScriptTarget.ES5,
    es6: ts.ScriptTarget.ES2015,
    es2015: ts.ScriptTarget.ES2015,
    es2016: ts.ScriptTarget.ES2016,
    es2017: ts.ScriptTarget.ES2017,
    es2018: ts.ScriptTarget.ES2018,
    es2019: ts.ScriptTarget.ES2019,
    es2020: ts.ScriptTarget.ES2020,
    es2021: ts.ScriptTarget.ES2021,
    es2022: ts.ScriptTarget.ES2022,
    es2023: ts.ScriptTarget.ES2023,
    es2024: ts.ScriptTarget.ES2024,
    esnext: ts.ScriptTarget.ESNext,
  };
  return targets[normalized] ?? defaultCompilerOptions.target!;
}

function parseModuleKind(value: string): ts.ModuleKind {
  const normalized = value.toLowerCase();
  const modules: Record<string, ts.ModuleKind> = {
    none: ts.ModuleKind.None,
    commonjs: ts.ModuleKind.CommonJS,
    amd: ts.ModuleKind.AMD,
    system: ts.ModuleKind.System,
    umd: ts.ModuleKind.UMD,
    es6: ts.ModuleKind.ES2015,
    es2015: ts.ModuleKind.ES2015,
    es2020: ts.ModuleKind.ES2020,
    es2022: ts.ModuleKind.ES2022,
    esnext: ts.ModuleKind.ESNext,
    node16: ts.ModuleKind.Node16,
    node18: ts.ModuleKind.Node18,
    nodenext: ts.ModuleKind.NodeNext,
    preserve: ts.ModuleKind.Preserve,
  };
  return modules[normalized] ?? defaultCompilerOptions.module!;
}

function parseJsxEmit(value: string): ts.JsxEmit {
  const normalized = value.toLowerCase();
  const jsx: Record<string, ts.JsxEmit> = {
    none: ts.JsxEmit.None,
    preserve: ts.JsxEmit.Preserve,
    react: ts.JsxEmit.React,
    reactnative: ts.JsxEmit.ReactNative,
    reactjsx: ts.JsxEmit.ReactJSX,
    reactjsxdev: ts.JsxEmit.ReactJSXDev,
  };
  return jsx[normalized] ?? ts.JsxEmit.None;
}

function tstsDiagnostics(testCase: CompilerCase): readonly ComparableDiagnostic[] {
  const fileMap = new Map(testCase.files.map(file => [normalizeFileName(file.fileName), file.text]));
  const host: CompilerHost = {
    readFile: fileName => fileMap.get(normalizeFileName(fileName)),
    useCaseSensitiveFileNames: () => true,
  };
  const program = createProgram([...fileMap.keys()], {}, host);
  return getProgramDiagnostics(program)
    .map(normalizeProgramDiagnostic)
    .sort(compareDiagnostics);
}

function normalizeProgramDiagnostic(diagnostic: ProgramDiagnostic): ComparableDiagnostic {
  return {
    code: diagnostic.code,
    fileName: normalizeFileName(diagnostic.fileName),
    message: diagnostic.message,
  };
}

function normalizeFileName(fileName: string): string {
  return fileName.replace(/\\/g, "/").replace(/^\.\//, "");
}

function compareDiagnostics(left: ComparableDiagnostic, right: ComparableDiagnostic): number {
  return (left.fileName ?? "").localeCompare(right.fileName ?? "")
    || (left.code ?? -1) - (right.code ?? -1)
    || left.message.localeCompare(right.message);
}

function classifyFailure(upstream: readonly ComparableDiagnostic[], actual: readonly ComparableDiagnostic[], error: unknown): string {
  if (error !== undefined) {
    return error instanceof Error && /Unexpected .* token|Expected token|Unsupported/.test(error.message)
      ? "tsts-parse-or-syntax-gap"
      : "tsts-internal-error";
  }
  if (upstream.length !== actual.length) {
    return actual.length < upstream.length ? "missing-diagnostics" : "extra-diagnostics";
  }
  for (let index = 0; index < upstream.length; index += 1) {
    if (upstream[index]!.code !== actual[index]!.code) {
      return "diagnostic-code-mismatch";
    }
    if (upstream[index]!.message !== actual[index]!.message) {
      return "diagnostic-message-mismatch";
    }
  }
  return "artifact-mismatch";
}

function equalDiagnostics(upstream: readonly ComparableDiagnostic[], actual: readonly ComparableDiagnostic[]): boolean {
  return JSON.stringify(upstream) === JSON.stringify(actual);
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const cases = await discoverCases(options);
  const results: CaseResult[] = [];

  for (const testCase of cases) {
    let upstream: readonly ComparableDiagnostic[] = [];
    let actual: readonly ComparableDiagnostic[] = [];
    let error: unknown;
    try {
      upstream = upstreamDiagnostics(testCase);
      actual = tstsDiagnostics(testCase);
    } catch (caught) {
      error = caught;
    }
    const passed = error === undefined && equalDiagnostics(upstream, actual);
    const rootCause = passed ? "passed" : classifyFailure(upstream, actual, error);
    results.push({
      name: testCase.name,
      path: relative(process.cwd(), testCase.path),
      status: passed ? "passed" : "failed",
      rootCause,
      upstream,
      actual,
      error: error instanceof Error ? error.message : error === undefined ? undefined : String(error),
    });
  }

  const summary = {
    suite: options.suite,
    filter: options.filter,
    total: results.length,
    passed: results.filter(result => result.status === "passed").length,
    failed: results.filter(result => result.status === "failed").length,
    byRootCause: Object.fromEntries([...new Set(results.map(result => result.rootCause))].sort().map(rootCause => [
      rootCause,
      results.filter(result => result.rootCause === rootCause).length,
    ])),
    results,
  };

  await mkdir(dirname(options.outFile), { recursive: true });
  await writeFile(options.outFile, `${JSON.stringify(summary, null, 2)}\n`);
  process.stdout.write(`${JSON.stringify({
    suite: summary.suite,
    total: summary.total,
    passed: summary.passed,
    failed: summary.failed,
    byRootCause: summary.byRootCause,
    outFile: options.outFile,
  }, null, 2)}\n`);

  if (summary.failed > 0 && !options.allowFailures) {
    process.exitCode = 1;
  }
}

await main();
