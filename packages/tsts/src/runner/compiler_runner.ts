import { existsSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { basename, join } from "node:path";

import { filter, map, some } from "../core/index.js";
import { fileExtensionIs, getAnyExtensionFromPath, getBaseFileName, getNormalizedAbsolutePath, isRootedDiskPath } from "../tspath/index.js";

import { extractCompilerSettings, makeUnitsFromTest, type RawCompilerSettings, type TestCaseContent, type TestUnit } from "./test_case_parser.js";
import type { Runner } from "./runner.js";

const compilerBaselineRegex = /\.tsx?$/;
const requireStr = "require(";
const referencesRegex = /reference\spath/;

export const srcFolder = "/.src";

export type CompilerTestType =
  | typeof CompilerTestType.Conformance
  | typeof CompilerTestType.Regression;

export const CompilerTestType = {
  Conformance: 0,
  Regression: 1,
} as const;

export function compilerTestTypeString(testType: CompilerTestType): string {
  return testType === CompilerTestType.Regression ? "compiler" : "conformance";
}

export interface NamedTestConfiguration {
  readonly name: string;
  readonly config: TestConfiguration;
}

export type TestConfiguration = Record<string, string>;

export interface HarnessOptions {
  readonly noTypesAndSymbols?: boolean;
}

export interface TestFile {
  readonly unitName: string;
  readonly content: string;
}

export interface CompilationResult {
  readonly options: Record<string, unknown>;
  readonly harnessOptions: HarnessOptions;
  readonly diagnostics: readonly unknown[];
  readonly trace: readonly string[];
  readonly program?: unknown;
}

export interface CompilerRunnerHost {
  enumerateFiles(root: string, regex: RegExp, recursive: boolean): readonly string[];
  readFile(path: string): string | undefined;
  testDataPath(): string;
  compileFiles(
    toBeCompiled: readonly TestFile[],
    otherFiles: readonly TestFile[],
    harnessConfig: TestConfiguration,
    currentDirectory: string,
    symlinks: ReadonlyMap<string, string>,
    tsConfig?: unknown,
  ): CompilationResult;
  getFileBasedTestConfigurations(settings: RawCompilerSettings, varyBy: ReadonlySet<string>): readonly NamedTestConfiguration[];
  skipUnsupportedCompilerOptions(options: Record<string, unknown>): void;
  baseline(baseline: CompilerBaseline): void;
}

export interface CompilerBaseline {
  readonly kind:
    | "error"
    | "output"
    | "sourcemap"
    | "sourcemap-record"
    | "types-and-symbols"
    | "module-resolution"
    | "union-ordering"
    | "parent-pointers";
  readonly testName: string;
  readonly suiteName: string;
  readonly isSubmodule: boolean;
  readonly files: readonly TestFile[];
  readonly result: CompilationResult;
}

const defaultHost: CompilerRunnerHost = {
  enumerateFiles(root, regex, recursive) {
    return enumerateFiles(root, regex, recursive);
  },
  readFile(path) {
    if (!existsSync(path)) return undefined;
    return readFileSync(path, "utf8");
  },
  testDataPath() {
    return "tests";
  },
  compileFiles() {
    throw new Error("compiler runner host must provide compileFiles");
  },
  getFileBasedTestConfigurations() {
    return [];
  },
  skipUnsupportedCompilerOptions() {
  },
  baseline() {
    throw new Error("compiler runner host must provide baseline");
  },
};

export class CompilerBaselineRunner implements Runner {
  readonly #isSubmodule: boolean;
  readonly #basePath: string;
  readonly #testSuiteName: string;
  readonly #host: CompilerRunnerHost;
  #testFiles: readonly string[] | undefined;

  constructor(testType: CompilerTestType, isSubmodule: boolean, host: CompilerRunnerHost = defaultHost) {
    const testSuiteName = compilerTestTypeString(testType);
    this.#basePath = isSubmodule
      ? "../_submodules/TypeScript/tests/cases/" + testSuiteName
      : "tests/cases/" + testSuiteName;
    this.#testSuiteName = testSuiteName;
    this.#isSubmodule = isSubmodule;
    this.#host = host;
  }

  enumerateTestFiles(): readonly string[] {
    if (this.#testFiles !== undefined && this.#testFiles.length > 0) return this.#testFiles;
    this.#testFiles = this.#host.enumerateFiles(this.#basePath, compilerBaselineRegex, true);
    return this.#testFiles;
  }

  runTests(): void {
    this.cleanUpLocal();
    for (const fileName of this.enumerateTestFiles()) {
      if (skippedTests.has(getBaseFileName(fileName))) continue;
      this.runTest(fileName);
    }
  }

  private cleanUpLocal(): void {
    const localPath = join(this.#host.testDataPath(), "baselines", "local", this.#isSubmodule ? "diff" : "", this.#testSuiteName);
    rmSync(localPath, { force: true, recursive: true });
  }

  private runTest(fileName: string): void {
    const test = getCompilerFileBasedTest(this.#host, fileName);
    const base = getBaseFileName(fileName);
    if (test.configurations.length > 0) {
      for (const config of test.configurations) {
        const testName = config.name === "" ? base : base + " " + config.name;
        this.runSingleConfigTest(testName, test, config);
      }
      return;
    }
    this.runSingleConfigTest(base, test, undefined);
  }

  private runSingleConfigTest(testName: string, test: CompilerFileBasedTest, config: NamedTestConfiguration | undefined): void {
    const payload = makeUnitsFromTest(test.content, test.fileName);
    const compilerTest = newCompilerTest(this.#host, testName, test.fileName, payload, config);

    this.#host.skipUnsupportedCompilerOptions(compilerTest.result.options);
    compilerTest.verifyDiagnostics(this.#host, this.#testSuiteName, this.#isSubmodule);
    compilerTest.verifyJavaScriptOutput(this.#host, this.#testSuiteName, this.#isSubmodule);
    compilerTest.verifySourceMapOutput(this.#host, this.#testSuiteName, this.#isSubmodule);
    compilerTest.verifySourceMapRecord(this.#host, this.#testSuiteName, this.#isSubmodule);
    compilerTest.verifyTypesAndSymbols(this.#host, this.#testSuiteName, this.#isSubmodule);
    compilerTest.verifyModuleResolution(this.#host, this.#testSuiteName, this.#isSubmodule);
    compilerTest.verifyUnionOrdering(this.#host, this.#testSuiteName, this.#isSubmodule);
    compilerTest.verifyParentPointers(this.#host, this.#testSuiteName, this.#isSubmodule);
  }
}

export function newCompilerBaselineRunner(
  testType: CompilerTestType,
  isSubmodule: boolean,
  host: CompilerRunnerHost = defaultHost,
): CompilerBaselineRunner {
  return new CompilerBaselineRunner(testType, isSubmodule, host);
}

const skippedTests = new Set<string>([
  "APILibCheck.ts",
  "APISample_Watch.ts",
  "APISample_WatchWithDefaults.ts",
  "APISample_WatchWithOwnWatchHost.ts",
  "APISample_compile.ts",
  "APISample_jsdoc.ts",
  "APISample_linter.ts",
  "APISample_parseConfig.ts",
  "APISample_transform.ts",
  "APISample_watcher.ts",
  "preserveUnusedImports.ts",
  "noCrashWithVerbatimModuleSyntaxAndImportsNotUsedAsValues.ts",
  "verbatimModuleSyntaxCompat.ts",
  "verbatimModuleSyntaxCompat2.ts",
  "verbatimModuleSyntaxCompat3.ts",
  "verbatimModuleSyntaxCompat4.ts",
  "preserveValueImports.ts",
  "preserveValueImports_importsNotUsedAsValues.ts",
  "preserveValueImports_errors.ts",
  "preserveValueImports_mixedImports.ts",
  "preserveValueImports_module.ts",
  "importsNotUsedAsValues_error.ts",
  "alwaysStrictNoImplicitUseStrict.ts",
  "nonPrimitiveIndexingWithForInSupressError.ts",
  "parameterInitializerBeforeDestructuringEmit.ts",
  "mappedTypeUnionConstraintInferences.ts",
  "lateBoundConstraintTypeChecksCorrectly.ts",
  "keyofDoesntContainSymbols.ts",
  "isolatedModulesOut.ts",
  "noStrictGenericChecks.ts",
  "noImplicitUseStrict_umd.ts",
  "noImplicitUseStrict_system.ts",
  "noImplicitUseStrict_es6.ts",
  "noImplicitUseStrict_commonjs.ts",
  "noImplicitUseStrict_amd.ts",
  "noImplicitAnyIndexingSuppressed.ts",
  "excessPropertyErrorsSuppressed.ts",
  "moduleNoneDynamicImport.ts",
  "moduleNoneErrors.ts",
  "moduleNoneOutFile.ts",
  "noErrorUsingImportExportModuleAugmentationInDeclarationFile1.ts",
  "noErrorUsingImportExportModuleAugmentationInDeclarationFile2.ts",
  "noErrorUsingImportExportModuleAugmentationInDeclarationFile3.ts",
  "requireOfJsonFileWithModuleEmitNone.ts",
  "requireOfJsonFileWithModuleNodeResolutionEmitNone.ts",
]);

const skippedEmitTests = new Map<string, string>([
  ["filesEmittingIntoSameOutput.ts", "Output order nondeterministic due to collision on filename during parallel emit."],
  ["jsFileCompilationWithJsEmitPathSameAsInput.ts", "Output order nondeterministic due to collision on filename during parallel emit."],
  ["grammarErrors.ts", "Output order nondeterministic due to collision on filename during parallel emit."],
  ["jsFileCompilationEmitBlockedCorrectly.ts", "Output order nondeterministic due to collision on filename during parallel emit."],
  ["jsDeclarationsReexportAliasesEsModuleInterop.ts", "cls.d.ts is missing statements when run concurrently."],
  ["jsFileCompilationWithoutJsExtensions.ts", "No files are emitted."],
  ["typeOnlyMerge2.ts", "Nondeterministic contents when run concurrently."],
  ["typeOnlyMerge3.ts", "Nondeterministic contents when run concurrently."],
]);

export function isSkippedCompilerTest(fileName: string): boolean {
  return skippedTests.has(getBaseFileName(fileName));
}

export function skippedEmitTestReason(fileName: string): string | undefined {
  return skippedEmitTests.get(getBaseFileName(fileName));
}

export function compilerBaselineSuitePath(testType: CompilerTestType, isSubmodule: boolean): string {
  const suiteName = compilerTestTypeString(testType);
  return isSubmodule ? "../_submodules/TypeScript/tests/cases/" + suiteName : "tests/cases/" + suiteName;
}

const compilerVaryBy = getCompilerVaryByMap();

function getCompilerVaryByMap(): ReadonlySet<string> {
  return new Set(["noemit", "isolatedmodules", "declaration", "strict", "target", "module", "jsx", "skiplibcheck"]);
}

interface CompilerFileBasedTest {
  readonly fileName: string;
  readonly content: string;
  readonly configurations: readonly NamedTestConfiguration[];
}

function getCompilerFileBasedTest(host: CompilerRunnerHost, fileName: string): CompilerFileBasedTest {
  const content = host.readFile(fileName);
  if (content === undefined) throw new Error("Could not read test file: " + fileName);
  const settings = extractCompilerSettings(content);
  const configurations = host.getFileBasedTestConfigurations(settings, compilerVaryBy);
  return { fileName, content, configurations };
}

class CompilerTest {
  readonly testName: string;
  readonly fileName: string;
  readonly baseName: string;
  readonly configuredName: string;
  readonly result: CompilationResult;
  readonly tsConfigFiles: readonly TestFile[];
  readonly toBeCompiled: readonly TestFile[];
  readonly otherFiles: readonly TestFile[];
  readonly hasNonDtsFiles: boolean;

  constructor(
    testName: string,
    fileName: string,
    configuredName: string,
    result: CompilationResult,
    tsConfigFiles: readonly TestFile[],
    toBeCompiled: readonly TestFile[],
    otherFiles: readonly TestFile[],
    hasNonDtsFiles: boolean,
  ) {
    this.testName = testName;
    this.fileName = fileName;
    this.baseName = getBaseFileName(fileName);
    this.configuredName = configuredName;
    this.result = result;
    this.tsConfigFiles = tsConfigFiles;
    this.toBeCompiled = toBeCompiled;
    this.otherFiles = otherFiles;
    this.hasNonDtsFiles = hasNonDtsFiles;
  }

  verifyDiagnostics(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    host.baseline(this.baseline("error", suiteName, isSubmodule, [...this.tsConfigFiles, ...this.toBeCompiled, ...this.otherFiles]));
  }

  verifyJavaScriptOutput(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    if (!this.hasNonDtsFiles || skippedEmitTests.has(this.baseName)) return;
    host.baseline(this.baseline("output", suiteName, isSubmodule, this.toBeCompiled));
  }

  verifySourceMapOutput(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    host.baseline(this.baseline("sourcemap", suiteName, isSubmodule, this.toBeCompiled));
  }

  verifySourceMapRecord(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    host.baseline(this.baseline("sourcemap-record", suiteName, isSubmodule, this.toBeCompiled));
  }

  verifyTypesAndSymbols(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    if (this.result.harnessOptions.noTypesAndSymbols === true) return;
    host.baseline(this.baseline("types-and-symbols", suiteName, isSubmodule, [...this.toBeCompiled, ...this.otherFiles]));
  }

  verifyModuleResolution(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    if (this.result.trace.length === 0) return;
    host.baseline(this.baseline("module-resolution", suiteName, isSubmodule, this.toBeCompiled));
  }

  verifyUnionOrdering(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    host.baseline(this.baseline("union-ordering", suiteName, isSubmodule, this.toBeCompiled));
  }

  verifyParentPointers(host: CompilerRunnerHost, suiteName: string, isSubmodule: boolean): void {
    host.baseline(this.baseline("parent-pointers", suiteName, isSubmodule, [...this.toBeCompiled, ...this.otherFiles]));
  }

  private baseline(kind: CompilerBaseline["kind"], suiteName: string, isSubmodule: boolean, files: readonly TestFile[]): CompilerBaseline {
    return { kind, testName: this.configuredName, suiteName, isSubmodule, files, result: this.result };
  }
}

function newCompilerTest(
  host: CompilerRunnerHost,
  testName: string,
  fileName: string,
  testContent: TestCaseContent,
  namedConfiguration: NamedTestConfiguration | undefined,
): CompilerTest {
  const base = getBaseFileName(fileName);
  const extension = getAnyExtensionFromPath(base, undefined, false);
  const configuredName = namedConfiguration?.name === undefined || namedConfiguration.name === ""
    ? base
    : base.slice(0, base.length - extension.length) + "(" + namedConfiguration.name + ")" + extension;
  const configuration = { ...(namedConfiguration?.config ?? {}) };
  const currentDirectory = getNormalizedAbsolutePath(configuration["currentdirectory"] ?? "", srcFolder);

  const units = testContent.testUnitData;
  const hasNonDtsFiles = some(units, (unit) => !fileExtensionIs(unit.name, ".d.ts"));
  const tsConfigFiles = testContent.tsConfigFileUnitData === undefined
    ? []
    : [createHarnessTestFile(testContent.tsConfigFileUnitData, currentDirectory)];
  let toBeCompiled: readonly TestFile[];
  let otherFiles: readonly TestFile[] = [];

  if (testContent.tsConfig !== undefined) {
    const parsedFileNames = new Set(testContent.tsConfig.fileNames);
    toBeCompiled = filter(units, (unit) => parsedFileNames.has(getNormalizedAbsolutePath(unit.name, currentDirectory)))
      .map((unit) => createHarnessTestFile(unit, currentDirectory));
    otherFiles = filter(units, (unit) => !parsedFileNames.has(getNormalizedAbsolutePath(unit.name, currentDirectory)))
      .map((unit) => createHarnessTestFile(unit, currentDirectory));
  } else {
    if (configuration["baseurl"] !== undefined && !isRootedDiskPath(configuration["baseurl"])) {
      configuration["baseurl"] = getNormalizedAbsolutePath(configuration["baseurl"], currentDirectory);
    }
    const lastUnit = units[units.length - 1];
    if (lastUnit !== undefined && (configuration["noimplicitreferences"] !== undefined || lastUnit.content.includes(requireStr) || referencesRegex.test(lastUnit.content))) {
      toBeCompiled = [createHarnessTestFile(lastUnit, currentDirectory)];
      otherFiles = units.slice(0, -1).map((unit) => createHarnessTestFile(unit, currentDirectory));
    } else {
      toBeCompiled = map(units, (unit) => createHarnessTestFile(unit, currentDirectory));
    }
  }

  const result = host.compileFiles(toBeCompiled, otherFiles, configuration, currentDirectory, testContent.symlinks, testContent.tsConfig);
  return new CompilerTest(testName, fileName, configuredName, result, tsConfigFiles, toBeCompiled, otherFiles, hasNonDtsFiles);
}

function createHarnessTestFile(unit: TestUnit, currentDirectory: string): TestFile {
  return {
    unitName: getNormalizedAbsolutePath(unit.name, currentDirectory),
    content: unit.content,
  };
}

function enumerateFiles(root: string, regex: RegExp, recursive: boolean): readonly string[] {
  if (!existsSync(root)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    const full = join(root, entry.name);
    if (entry.isDirectory()) {
      if (recursive) out.push(...enumerateFiles(full, regex, recursive));
      continue;
    }
    if (regex.test(basename(full))) out.push(full);
  }
  return out.sort();
}
