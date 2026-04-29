import { existsSync, readFileSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative } from "node:path";
import * as ts from "typescript";
import { createProgram, decodeSourceText, getProgramDiagnostics, type CompilerHost, type CompilerOptions, type ModuleKindName, type ModuleResolutionKindName, type ProgramDiagnostic, type RemovedCompilerOptionName } from "../src/program/index.js";

interface CaseFile {
  readonly fileName: string;
  readonly text: string;
}

interface CaseLink {
  readonly from: string;
  readonly to: string;
}

interface CompilerCase {
  readonly name: string;
  readonly path: string;
  readonly files: readonly CaseFile[];
  readonly rootNames: readonly string[];
  readonly links: readonly CaseLink[];
  readonly compilerOptions: CaseCompilerOptions;
  readonly noTypesAndSymbols: boolean;
  readonly baselineFile: string | undefined;
}

interface CaseCompilerOptions extends CompilerOptions {
  readonly baseUrl?: string;
  readonly noEmit?: boolean;
  readonly emitDeclarationOnly?: boolean;
  readonly ignoreDeprecations?: string;
  readonly lib?: readonly string[];
  readonly module?: ModuleKindName;
  readonly moduleResolution?: ModuleResolutionKindName;
  readonly strict?: boolean;
  readonly noImplicitAny?: boolean;
  readonly noImplicitReturns?: boolean;
  readonly noUnusedLocals?: boolean;
  readonly noUnusedParameters?: boolean;
  readonly strictNullChecks?: boolean;
  readonly strictPropertyInitialization?: boolean;
  readonly exactOptionalPropertyTypes?: boolean;
  readonly noLib?: boolean;
  readonly allowJs?: boolean;
  readonly checkJs?: boolean;
  readonly experimentalDecorators?: boolean;
  readonly emitDecoratorMetadata?: boolean;
  readonly allowSyntheticDefaultImports?: boolean;
  readonly alwaysStrict?: boolean;
  readonly allowUnreachableCode?: boolean;
  readonly esModuleInterop?: boolean;
  readonly noUncheckedSideEffectImports?: boolean;
  readonly declaration?: boolean;
  readonly outFile?: string;
  readonly jsx?: ts.JsxEmit;
  readonly jsxFactory?: string;
  readonly jsxFragmentFactory?: string;
  readonly jsxImportSource?: string;
  readonly reactNamespace?: string;
  readonly removedOptions?: readonly RemovedCompilerOptionName[];
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
  return join("test", "upstream", suite, "compiler");
}

function isSupportedCaseFile(fileName: string): boolean {
  return [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs", ".cjs"].includes(extname(fileName).toLowerCase());
}

async function discoverCases(options: Options): Promise<readonly CompilerCase[]> {
  const directory = suiteDirectory(options.suite);
  if (!existsSync(directory)) {
    throw new Error(`Upstream ${options.suite} compiler test directory does not exist: ${directory}`);
  }
  const baselineFiles = await discoverBaselineFiles(options.suite);

  const names = (await readdir(directory))
    .filter(name => isSupportedCaseFile(name))
    .filter(name => options.filter === undefined || name.includes(options.filter))
    .sort();
  const selected = options.limit === undefined ? names : names.slice(0, options.limit);
  const cases = await Promise.all(selected.map(async name => {
    const path = join(directory, name);
    return expandBaselineVariants(parseCompilerCase(name, path, decodeSourceText(await readFile(path))), baselineFiles);
  }));
  return cases.flat();
}

function parseCompilerCase(name: string, path: string, text: string): CompilerCase {
  const fileSections: CaseFile[] = [];
  const links: CaseLink[] = [];
  const compilerOptions = parseCompilerOptions(text);
  let currentFileName: string | undefined;
  let currentText: string[] = [];

  for (const line of text.split(/\r?\n/)) {
    const link = line.match(/^\s*\/\/\s*@link:\s*(.+?)\s*->\s*(.+?)\s*$/i);
    if (link !== null) {
      links.push({ from: normalizeFileName(link[1]!), to: normalizeFileName(link[2]!) });
    }
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
      noTypesAndSymbols: parseNoTypesAndSymbols(text),
      files: fileSections,
      rootNames: caseRootNames(fileSections, compilerOptions),
      links,
      baselineFile: undefined,
    };
  }

  return {
    name,
    path,
    compilerOptions,
    noTypesAndSymbols: parseNoTypesAndSymbols(text),
    files: [{ fileName: name, text }],
    rootNames: [name],
    links,
    baselineFile: undefined,
  };
}

function caseRootNames(files: readonly CaseFile[], compilerOptions: CaseCompilerOptions): readonly string[] {
  const supportedFiles = files.filter(file => isSupportedCaseFile(file.fileName));
  const nonDependencyFiles = supportedFiles.filter(file => !isNodeModulesPath(file.fileName));
  const rootableFiles = nonDependencyFiles.some(file => isTypeScriptCaseFile(file.fileName))
    ? nonDependencyFiles.filter(file => isTypeScriptCaseFile(file.fileName) || shouldRootJavaScriptCaseFile(file.fileName, compilerOptions))
    : nonDependencyFiles;
  return rootableFiles.map(file => file.fileName);
}

function shouldRootJavaScriptCaseFile(fileName: string, compilerOptions: CaseCompilerOptions): boolean {
  return isJavaScriptCaseFile(fileName) && (compilerOptions.allowJs !== undefined || compilerOptions.checkJs === true);
}

function isTypeScriptCaseFile(fileName: string): boolean {
  return [".ts", ".tsx", ".mts", ".cts"].includes(extname(fileName).toLowerCase());
}

function isJavaScriptCaseFile(fileName: string): boolean {
  return [".js", ".jsx", ".mjs", ".cjs"].includes(extname(fileName).toLowerCase());
}

function isNodeModulesPath(fileName: string): boolean {
  return normalizeFileName(fileName).split("/").includes("node_modules");
}

async function discoverBaselineFiles(suite: Options["suite"]): Promise<readonly string[]> {
  const directory = baselineDirectory(suite);
  if (!existsSync(directory)) {
    return [];
  }
  return (await readdir(directory)).filter(name => name.endsWith(".errors.txt")).sort();
}

function baselineDirectory(suite: Options["suite"]): string {
  return join("test", "upstream", suite, "baselines", "reference", "compiler");
}

function expandBaselineVariants(testCase: CompilerCase, baselineFiles: readonly string[]): readonly CompilerCase[] {
  const baseName = caseBaseName(testCase.name);
  const matchingBaselines = baselineFiles.filter(fileName => {
    if (!fileName.startsWith(baseName)) {
      return false;
    }
    if (fileName === `${baseName}.errors.txt`) {
      return true;
    }
    const suffix = fileName.slice(baseName.length);
    return suffix.startsWith("(") || suffix.startsWith(".");
  });
  if (matchingBaselines.length === 0) {
    return [testCase];
  }
  return matchingBaselines.map(baselineFileName => ({
    ...testCase,
    name: `${baselineFileName.slice(0, -".errors.txt".length)}${extname(testCase.name)}`,
    compilerOptions: { ...testCase.compilerOptions, ...parseBaselineCompilerOptions(baselineFileName) },
    baselineFile: baselineFileName,
  }));
}

function parseBaselineCompilerOptions(baselineFileName: string): CaseCompilerOptions {
  const match = baselineFileName.match(/\((.*?)\)\.errors\.txt$/);
  if (match === null) {
    return {};
  }
  let options: CaseCompilerOptions = {};
  for (const part of match[1]!.split(",")) {
    const [rawKey, rawValue] = part.split("=");
    const key = rawKey?.trim().toLowerCase();
    const value = rawValue?.trim();
    const removedOption = key === undefined ? undefined : removedCompilerOptionName(key);
    if (removedOption !== undefined) {
      options = withRemovedOption(options, removedOption);
      continue;
    }
    if (key === "target" && value !== undefined) {
      options = { ...options, target: parseScriptTarget(value) };
    } else if (key === "module" && value !== undefined) {
      options = { ...options, module: parseModuleKind(value) };
    } else if (key === "moduleresolution" && value !== undefined) {
      options = { ...options, moduleResolution: parseModuleResolutionKind(value) };
    } else if (key === "strict" && value !== undefined) {
      options = { ...options, strict: parseBoolean(value) };
    } else if (key === "noimplicitany" && value !== undefined) {
      options = { ...options, noImplicitAny: parseBoolean(value) };
    } else if (key === "noimplicitreturns" && value !== undefined) {
      options = { ...options, noImplicitReturns: parseBoolean(value) };
    } else if (key === "nounusedlocals" && value !== undefined) {
      options = { ...options, noUnusedLocals: parseBoolean(value) };
    } else if (key === "nounusedparameters" && value !== undefined) {
      options = { ...options, noUnusedParameters: parseBoolean(value) };
    } else if (key === "strictnullchecks" && value !== undefined) {
      options = { ...options, strictNullChecks: parseBoolean(value) };
    } else if (key === "strictpropertyinitialization" && value !== undefined) {
      options = { ...options, strictPropertyInitialization: parseBoolean(value) };
    } else if (key === "exactoptionalpropertytypes" && value !== undefined) {
      options = { ...options, exactOptionalPropertyTypes: parseBoolean(value) };
    } else if (key === "jsx" && value !== undefined) {
      options = { ...options, jsx: parseJsxEmit(value) };
    } else if (key === "jsxfactory" && value !== undefined) {
      options = { ...options, jsxFactory: value };
    } else if (key === "jsxfragmentfactory" && value !== undefined) {
      options = { ...options, jsxFragmentFactory: value };
    } else if (key === "jsximportsource" && value !== undefined) {
      options = { ...options, jsxImportSource: value };
    } else if (key === "reactnamespace" && value !== undefined) {
      options = { ...options, reactNamespace: value };
    } else if (key === "allowsyntheticdefaultimports" && value !== undefined) {
      options = { ...options, allowSyntheticDefaultImports: parseBoolean(value) };
    } else if (key === "alwaysstrict" && value !== undefined) {
      options = { ...options, alwaysStrict: parseBoolean(value) };
    } else if (key === "allowjs" && value !== undefined) {
      options = { ...options, allowJs: parseBoolean(value) };
    } else if (key === "checkjs" && value !== undefined) {
      options = { ...options, checkJs: parseBoolean(value) };
    } else if (key === "allowunreachablecode" && value !== undefined) {
      options = { ...options, allowUnreachableCode: parseBoolean(value) };
    } else if (key === "preserveconstenums" && value !== undefined) {
      options = { ...options, preserveConstEnums: parseBoolean(value) };
    } else if (key === "noemit" && value !== undefined) {
      options = { ...options, noEmit: parseBoolean(value) };
    } else if (key === "nolib" && value !== undefined) {
      options = { ...options, noLib: parseBoolean(value) };
    } else if (key === "lib" && value !== undefined) {
      options = { ...options, lib: parseList(value) };
    } else if (key === "downleveliteration" && value !== undefined) {
      options = { ...options, downlevelIteration: parseBoolean(value) };
    } else if (key === "experimentaldecorators" && value !== undefined) {
      options = { ...options, experimentalDecorators: parseBoolean(value) };
    } else if (key === "esmoduleinterop" && value !== undefined) {
      options = { ...options, esModuleInterop: parseBoolean(value) };
    } else if (key === "outfile" && value !== undefined) {
      options = { ...options, outFile: value };
    } else if (key === "nouncheckedsideeffectimports" && value !== undefined) {
      options = { ...options, noUncheckedSideEffectImports: parseBoolean(value) };
    } else if (key === "emitdeclarationonly" && value !== undefined) {
      options = { ...options, emitDeclarationOnly: parseBoolean(value) };
    }
  }
  return options;
}

async function typescriptBaselineDiagnostics(testCase: CompilerCase): Promise<readonly ComparableDiagnostic[]> {
  return baselineDiagnostics(baselinePath("typescript", testCase));
}

async function tsgoBaselineDiagnostics(testCase: CompilerCase): Promise<readonly ComparableDiagnostic[]> {
  return baselineDiagnostics(baselinePath("tsgo", testCase));
}

function baselinePath(suite: Options["suite"], testCase: CompilerCase): string {
  return join(baselineDirectory(suite), testCase.baselineFile ?? `${caseBaseName(testCase.name)}.errors.txt`);
}

async function baselineDiagnostics(errorsFile: string): Promise<readonly ComparableDiagnostic[]> {
  if (!existsSync(errorsFile)) {
    return [];
  }
  const text = await readFile(errorsFile, "utf8");
  const diagnostics: ComparableDiagnostic[] = [];
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^(.*)\(\d+,\d+\): error TS(\d+): (.*)$/);
    if (match === null) {
      const globalMatch = line.match(/^error TS(\d+): (.*)$/);
      if (globalMatch !== null) {
        diagnostics.push({
          fileName: undefined,
          code: Number(globalMatch[1]),
          message: globalMatch[2]!,
        });
        continue;
      }
      if (line.startsWith("==== ")) {
        break;
      }
      continue;
    }
    diagnostics.push({
      fileName: normalizeFileName(match[1]!),
      code: Number(match[2]),
      message: match[3]!,
    });
  }
  return diagnostics.sort(compareDiagnostics);
}

function caseBaseName(name: string): string {
  const extension = extname(name);
  return extension === "" ? name : name.slice(0, -extension.length);
}

function parseCompilerOptions(text: string): CaseCompilerOptions {
  let options: CaseCompilerOptions = {};
  for (const line of text.split(/\r?\n/)) {
    const match = line.match(/^\s*\/\/\s*@([A-Za-z0-9_]+)(?::\s*(.*?))?\s*$/);
    if (match === null) {
      continue;
    }
    const name = match[1]!.toLowerCase();
    const value = match[2]?.trim() ?? "true";
    const removedOption = removedCompilerOptionName(name);
    if (removedOption !== undefined) {
      options = withRemovedOption(options, removedOption);
      continue;
    }
    switch (name) {
      case "target":
        options = { ...options, target: parseScriptTarget(value) };
        break;
      case "module":
        options = { ...options, module: parseModuleKind(value) };
        break;
      case "moduleresolution":
        options = { ...options, moduleResolution: parseModuleResolutionKind(value) };
        break;
      case "baseurl":
        options = { ...options, baseUrl: value };
        break;
      case "lib":
        options = { ...options, lib: parseList(value) };
        break;
      case "ignoredeprecations":
        options = { ...options, ignoreDeprecations: value };
        break;
      case "strict":
        options = { ...options, strict: parseBoolean(value) };
        break;
      case "noimplicitany":
        options = { ...options, noImplicitAny: parseBoolean(value) };
        break;
      case "noimplicitreturns":
        options = { ...options, noImplicitReturns: parseBoolean(value) };
        break;
      case "nounusedlocals":
        options = { ...options, noUnusedLocals: parseBoolean(value) };
        break;
      case "nounusedparameters":
        options = { ...options, noUnusedParameters: parseBoolean(value) };
        break;
      case "strictnullchecks":
        options = { ...options, strictNullChecks: parseBoolean(value) };
        break;
      case "strictpropertyinitialization":
        options = { ...options, strictPropertyInitialization: parseBoolean(value) };
        break;
      case "exactoptionalpropertytypes":
        options = { ...options, exactOptionalPropertyTypes: parseBoolean(value) };
        break;
      case "nolib":
        options = { ...options, noLib: parseBoolean(value) };
        break;
      case "allowjs":
        options = { ...options, allowJs: parseBoolean(value) };
        break;
      case "checkjs":
        options = { ...options, checkJs: parseBoolean(value) };
        break;
      case "downleveliteration":
        options = { ...options, downlevelIteration: parseBoolean(value) };
        break;
      case "experimentaldecorators":
        options = { ...options, experimentalDecorators: parseBoolean(value) };
        break;
      case "emitdecoratormetadata":
        options = { ...options, emitDecoratorMetadata: parseBoolean(value) };
        break;
      case "allowsyntheticdefaultimports":
        options = { ...options, allowSyntheticDefaultImports: parseBoolean(value) };
        break;
      case "allowunreachablecode":
        options = { ...options, allowUnreachableCode: parseBoolean(value) };
        break;
      case "preserveconstenums":
        options = { ...options, preserveConstEnums: parseBoolean(value) };
        break;
      case "alwaysstrict":
        options = { ...options, alwaysStrict: parseBoolean(value) };
        break;
      case "noemit":
        options = { ...options, noEmit: parseBoolean(value) };
        break;
      case "esmoduleinterop":
        options = { ...options, esModuleInterop: parseBoolean(value) };
        break;
      case "nouncheckedsideeffectimports":
        options = { ...options, noUncheckedSideEffectImports: parseBoolean(value) };
        break;
      case "declaration":
        options = { ...options, declaration: parseBoolean(value) };
        break;
      case "emitdeclarationonly":
        options = { ...options, emitDeclarationOnly: parseBoolean(value) };
        break;
      case "outfile":
        options = { ...options, outFile: value };
        break;
      case "jsx":
        options = { ...options, jsx: parseJsxEmit(value) };
        break;
      case "jsxfactory":
        options = { ...options, jsxFactory: value };
        break;
      case "jsxfragmentfactory":
        options = { ...options, jsxFragmentFactory: value };
        break;
      case "jsximportsource":
        options = { ...options, jsxImportSource: value };
        break;
      case "reactnamespace":
        options = { ...options, reactNamespace: value };
        break;
      default:
        break;
    }
  }
  return options;
}

function parseNoTypesAndSymbols(text: string): boolean {
  return text.split(/\r?\n/).some(line => /^\s*\/\/\s*@noTypesAndSymbols(?::\s*(.*?)\s*)?$/i.test(line));
}

function parseBoolean(value: string): boolean {
  return value.toLowerCase() !== "false";
}

function parseList(value: string): readonly string[] {
  return value.split(",").map(part => part.trim()).filter(part => part.length > 0);
}

function parseScriptTarget(value: string): NonNullable<CompilerOptions["target"]> {
  const normalized = value.toLowerCase().split(",")[0]!.trim();
  const targets = new Set<NonNullable<CompilerOptions["target"]>>([
    "es3",
    "es5",
    "es2015",
    "es2016",
    "es2017",
    "es2018",
    "es2019",
    "es2020",
    "es2021",
    "es2022",
    "es2023",
    "es2024",
    "esnext",
  ]);
  if (normalized === "es6") {
    return "es2015";
  }
  return targets.has(normalized as NonNullable<CompilerOptions["target"]>) ? normalized as NonNullable<CompilerOptions["target"]> : "es2024";
}

function parseModuleKind(value: string): ModuleKindName {
  const normalized = value.toLowerCase().split(",")[0]!.trim();
  const modules: Record<string, ModuleKindName> = {
    none: "none",
    commonjs: "commonjs",
    amd: "amd",
    system: "system",
    umd: "umd",
    es6: "es2015",
    es2015: "es2015",
    es2020: "es2020",
    es2022: "es2022",
    esnext: "esnext",
    node16: "node16",
    node18: "node18",
    node20: "node20",
    nodenext: "nodenext",
    preserve: "preserve",
  };
  return modules[normalized] ?? "esnext";
}

function parseModuleResolutionKind(value: string): ModuleResolutionKindName {
  const normalized = value.toLowerCase().split(",")[0]!.trim();
  const resolutions: Record<string, ModuleResolutionKindName> = {
    classic: "classic",
    node: "node10",
    node10: "node10",
    node16: "node16",
    nodenext: "nodenext",
    bundler: "bundler",
  };
  return resolutions[normalized] ?? "node10";
}

function removedCompilerOptionName(name: string): RemovedCompilerOptionName | undefined {
  const removedOptions: Record<string, RemovedCompilerOptionName> = {
    charset: "charset",
    importsnotusedasvalues: "importsNotUsedAsValues",
    keyofstringsonly: "keyofStringsOnly",
    noimplicitusestrict: "noImplicitUseStrict",
    nostrictgenericchecks: "noStrictGenericChecks",
    out: "out",
    preservevalueimports: "preserveValueImports",
    suppressexcesspropertyerrors: "suppressExcessPropertyErrors",
    suppressimplicitanyindexerrors: "suppressImplicitAnyIndexErrors",
  };
  return removedOptions[name];
}

function withRemovedOption(options: CaseCompilerOptions, optionName: RemovedCompilerOptionName): CaseCompilerOptions {
  return { ...options, removedOptions: [...options.removedOptions ?? [], optionName] };
}

function parseJsxEmit(value: string): ts.JsxEmit {
  const normalized = value.toLowerCase().replace(/[-_]/g, "");
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
    readFile: fileName => {
      const normalized = normalizeFileName(fileName);
      const linked = resolveLinkedFileName(normalized, testCase.links);
      const linkedText = linked === undefined ? undefined : fileMap.get(linked) ?? readDiskFileIfPresent(linked);
      const diskText = readPackageJsonFromDiskIfPresent(normalized);
      return linkedText ?? diskText ?? fileMap.get(normalized) ?? readDiskFileIfPresent(normalized);
    },
    realpath: fileName => resolveLinkedFileName(normalizeFileName(fileName), testCase.links) ?? normalizeFileName(fileName),
    useCaseSensitiveFileNames: () => true,
  };
  const program = createProgram(testCase.rootNames.map(normalizeFileName), testCase.compilerOptions, host);
  const diagnostics = getProgramDiagnostics(program);
  return diagnostics
    .map(normalizeProgramDiagnostic)
    .filter(diagnostic => diagnostic.fileName === undefined || fileMap.has(diagnostic.fileName))
    .sort(compareDiagnostics);
}

function resolveLinkedFileName(fileName: string, links: readonly CaseLink[], seen: ReadonlySet<string> = new Set()): string | undefined {
  if (seen.has(fileName)) {
    return undefined;
  }
  for (const link of links) {
    if (fileName === link.to || fileName.startsWith(`${link.to}/`)) {
      const resolved = `${link.from}${fileName.slice(link.to.length)}`;
      return resolveLinkedFileName(resolved, links, new Set([...seen, fileName])) ?? resolved;
    }
  }
  return undefined;
}

function readPackageJsonFromDiskIfPresent(fileName: string): string | undefined {
  if (!fileName.endsWith("/package.json")) {
    return undefined;
  }
  return readDiskFileIfPresent(fileName);
}

function readDiskFileIfPresent(fileName: string): string | undefined {
  if (!existsSync(fileName)) {
    return undefined;
  }
  return decodeSourceText(readFileSync(fileName));
}

function normalizeProgramDiagnostic(diagnostic: ProgramDiagnostic): ComparableDiagnostic {
  return {
    code: diagnostic.code,
    fileName: diagnostic.fileName === undefined ? undefined : normalizeFileName(diagnostic.fileName),
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
  if (upstream.length !== actual.length) {
    return false;
  }
  for (let index = 0; index < upstream.length; index += 1) {
    const expected = upstream[index]!;
    const observed = actual[index]!;
    if (expected.code !== observed.code || expected.fileName !== observed.fileName || expected.message !== observed.message) {
      return false;
    }
  }
  return true;
}

async function main(): Promise<void> {
  const options = parseArgs(process.argv.slice(2));
  const cases = await discoverCases(options);
  const results: CaseResult[] = [];

  for (let caseIndex = 0; caseIndex < cases.length; caseIndex += 1) {
    const testCase = cases[caseIndex]!;
    let upstream: readonly ComparableDiagnostic[] = [];
    let actual: readonly ComparableDiagnostic[] = [];
    let error: unknown;
    try {
      upstream = options.suite === "tsgo" ? await tsgoBaselineDiagnostics(testCase) : await typescriptBaselineDiagnostics(testCase);
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
    process.stdout.write(`${JSON.stringify({
      index: caseIndex + 1,
      total: cases.length,
      name: testCase.name,
      status: passed ? "passed" : "failed",
      rootCause,
      upstreamDiagnostics: upstream.length,
      actualDiagnostics: actual.length,
    })}\n`);
    if ((caseIndex + 1) % 25 === 0) {
      await writeSummary(options, results, cases.length);
    }
  }

  const summary = await writeSummary(options, results, cases.length);
  process.stdout.write(`${JSON.stringify({
    suite: summary.suite,
    total: summary.total,
    completed: summary.completed,
    passed: summary.passed,
    failed: summary.failed,
    byRootCause: summary.byRootCause,
    outFile: options.outFile,
  }, null, 2)}\n`);

  if (summary.failed > 0 && !options.allowFailures) {
    process.exitCode = 1;
  }
}

async function writeSummary(options: Options, results: readonly CaseResult[], totalCases: number): Promise<{
  readonly suite: Options["suite"];
  readonly filter: string | undefined;
  readonly total: number;
  readonly completed: number;
  readonly passed: number;
  readonly failed: number;
  readonly byRootCause: Record<string, number>;
  readonly results: readonly CaseResult[];
}> {
  const summary = {
    suite: options.suite,
    filter: options.filter,
    total: totalCases,
    completed: results.length,
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
  return summary;
}

await main();
