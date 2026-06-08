#!/usr/bin/env node
import { spawn } from "node:child_process";
import { cpus, tmpdir } from "node:os";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { cp, mkdir, readFile, readdir, stat, symlink, writeFile } from "node:fs/promises";
import { existsSync, readdirSync } from "node:fs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = join(dirname(scriptPath), "../../../..");
const packageRoot = join(repoRoot, "packages/tsts");
const vendorRoot = join(packageRoot, "_vendor/typescript-go");
const caseRoot = join(vendorRoot, "testdata/tests/cases");
const baselineRoot = join(vendorRoot, "testdata/baselines/reference");
const typeScriptSubmoduleCaseRoot = join(vendorRoot, "_submodules/TypeScript/tests/cases");
const testLibRoot = join(vendorRoot, "_submodules/TypeScript/tests/lib");
const cliPath = join(packageRoot, "dist/src/cli/index.js");

const supportedSuitesByCorpus = new Map([
  ["current", new Set(["compiler", "conformance"])],
  ["typescript", new Set(["compiler", "conformance"])],
]);
const caseRootByCorpus = new Map([
  ["current", caseRoot],
  ["typescript", typeScriptSubmoduleCaseRoot],
]);
const inScopeTypeScriptSuites = new Set(["compiler", "conformance", "project", "projects", "transpile"]);
const outOfScopeTypeScriptSuites = new Set(["fourslash", "unittests"]);
const inScopeBaselineCategories = new Set(["api", "compiler", "config", "conformance", "submodule", "submoduleAccepted", "submoduleTriaged", "tsbuild", "tsc", "tsoptions"]);
const outOfScopeBaselineCategories = new Set(["astnav", "fourslash", "lsp", "tsbuildWatch", "tscWatch"]);
const skippedTests = new Set([
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
const compilerVaryByOptions = new Set([
  "allowjs",
  "allowsyntheticdefaultimports",
  "checkjs",
  "declaration",
  "declarationmap",
  "deduplicatepackages",
  "emitdeclarationonly",
  "emitdecoratormetadata",
  "erasablesyntaxonly",
  "esmoduleinterop",
  "exactoptionalpropertytypes",
  "experimentaldecorators",
  "incremental",
  "isolateddeclarations",
  "module",
  "moduleresolution",
  "noemit",
  "nouncheckedsideeffectimports",
  "nounusedlocals",
  "nounusedparameters",
  "preserveconstenums",
  "removecomments",
  "resolvejsonmodule",
  "resolvepackagejsonexports",
  "strict",
  "strictbuiltiniteratorreturn",
  "strictnullchecks",
  "target",
  "usedefineforclassfields",
  "verbatimmodulesyntax",
]);
const booleanOptions = new Set([
  "allowjs",
  "allowunreachablecode",
  "allowsyntheticdefaultimports",
  "checkjs",
  "declaration",
  "declarationmap",
  "deduplicatepackages",
  "emitdeclarationonly",
  "emitdecoratormetadata",
  "erasablesyntaxonly",
  "esmoduleinterop",
  "exactoptionalpropertytypes",
  "experimentaldecorators",
  "incremental",
  "isolateddeclarations",
  "noemit",
  "noemithelpers",
  "noerrortruncation",
  "noimplicitany",
  "nopropertyaccessfromindexsignature",
  "nouncheckedsideeffectimports",
  "nounusedlocals",
  "nounusedparameters",
  "preserveconstenums",
  "removecomments",
  "resolvejsonmodule",
  "resolvepackagejsonexports",
  "skipdefaultlibcheck",
  "skiplibcheck",
  "strict",
  "strictbuiltiniteratorreturn",
  "strictnullchecks",
  "traceresolution",
  "usedefineforclassfields",
  "verbatimmodulesyntax",
]);
const stringOptions = new Map([
  ["baseurl", "baseUrl"],
  ["jsx", "jsx"],
  ["jsximportsource", "jsxImportSource"],
  ["module", "module"],
  ["moduleresolution", "moduleResolution"],
  ["outdir", "outDir"],
  ["outfile", "outFile"],
  ["rootdir", "rootDir"],
  ["target", "target"],
  ["tsbuildinfofile", "tsBuildInfoFile"],
]);
const listOptions = new Map([
  ["lib", "lib"],
  ["types", "types"],
]);
const booleanOptionNames = new Map([
  ["allowjs", "allowJs"],
  ["allowunreachablecode", "allowUnreachableCode"],
  ["allowsyntheticdefaultimports", "allowSyntheticDefaultImports"],
  ["checkjs", "checkJs"],
  ["declaration", "declaration"],
  ["declarationmap", "declarationMap"],
  ["deduplicatepackages", "deduplicatePackages"],
  ["emitdeclarationonly", "emitDeclarationOnly"],
  ["emitdecoratormetadata", "emitDecoratorMetadata"],
  ["erasablesyntaxonly", "erasableSyntaxOnly"],
  ["esmoduleinterop", "esModuleInterop"],
  ["exactoptionalpropertytypes", "exactOptionalPropertyTypes"],
  ["experimentaldecorators", "experimentalDecorators"],
  ["incremental", "incremental"],
  ["isolateddeclarations", "isolatedDeclarations"],
  ["noemit", "noEmit"],
  ["noemithelpers", "noEmitHelpers"],
  ["noerrortruncation", "noErrorTruncation"],
  ["noimplicitany", "noImplicitAny"],
  ["nopropertyaccessfromindexsignature", "noPropertyAccessFromIndexSignature"],
  ["nouncheckedsideeffectimports", "noUncheckedSideEffectImports"],
  ["nounusedlocals", "noUnusedLocals"],
  ["nounusedparameters", "noUnusedParameters"],
  ["preserveconstenums", "preserveConstEnums"],
  ["removecomments", "removeComments"],
  ["resolvejsonmodule", "resolveJsonModule"],
  ["resolvepackagejsonexports", "resolvePackageJsonExports"],
  ["skipdefaultlibcheck", "skipDefaultLibCheck"],
  ["skiplibcheck", "skipLibCheck"],
  ["strict", "strict"],
  ["strictbuiltiniteratorreturn", "strictBuiltinIteratorReturn"],
  ["strictnullchecks", "strictNullChecks"],
  ["traceresolution", "traceResolution"],
  ["usedefineforclassfields", "useDefineForClassFields"],
  ["verbatimmodulesyntax", "verbatimModuleSyntax"],
]);

export function parseArgs(argv) {
  const parsed = {
    corpus: "current",
    suite: "all",
    filter: "",
    limit: 0,
    jobs: Math.max(1, Math.min(cpus().length, 8)),
    failFast: false,
    keepGoing: true,
    inventory: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--corpus") {
      parsed.corpus = argv[++index] ?? parsed.corpus;
    } else if (arg === "--suite") {
      parsed.suite = argv[++index] ?? parsed.suite;
    } else if (arg === "--filter") {
      parsed.filter = argv[++index] ?? "";
    } else if (arg === "--limit") {
      parsed.limit = Number(argv[++index] ?? "0");
    } else if (arg === "--jobs") {
      parsed.jobs = Math.max(1, Number(argv[++index] ?? "1"));
    } else if (arg === "--fail-fast") {
      parsed.failFast = true;
      parsed.keepGoing = false;
    } else if (arg === "--inventory") {
      parsed.inventory = true;
    } else if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  const supportedSuites = supportedSuitesByCorpus.get(parsed.corpus);
  if (supportedSuites === undefined) {
    throw new Error(`Unsupported corpus '${parsed.corpus}'. Expected one of: ${[...supportedSuitesByCorpus.keys()].join(", ")}`);
  }
  if (parsed.suite !== "all" && !supportedSuites.has(parsed.suite)) {
    throw new Error(`Unsupported suite '${parsed.suite}' for corpus '${parsed.corpus}'. Expected one of: all, ${[...supportedSuites].join(", ")}`);
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node packages/tsts/tools/tsgo-suite/run.mjs [options]

Runs upstream TS-Go/TypeScript file-based tests through the TSTS CLI.

Options:
  --corpus <current|typescript>        current=testdata/tests/cases; typescript=_submodules/TypeScript/tests/cases. Default: current.
  --suite <all|compiler|conformance>  Suite to run. Default: all. Transpile/project suites are tracked but require specialized harnesses.
  --filter <substring>                Run cases whose relative path contains the substring.
  --limit <n>                         Run at most n cases after filtering.
  --jobs <n>                          Parallel TSTS processes. Default: min(cpu count, 8).
  --fail-fast                         Stop after the first failure.
  --inventory                         Print the tracked upstream test universe and exit.
`);
}

export async function buildTestUniverseInventory() {
  const currentHarness = await countFilesByChild(caseRoot, (file) => /\.(tsx?|jsx?)$/.test(file));
  const typeScriptCases = await countFilesByChild(typeScriptSubmoduleCaseRoot, (file) => /\.(tsx?|jsx?)$/.test(file));
  const baselines = await countFilesByChild(baselineRoot, () => true);
  const goTests = await countGoTestFilesByPackage(vendorRoot);
  return {
    currentHarness: summarizeNamedCounts(currentHarness, supportedSuitesByCorpus.get("current")),
    typeScriptCases: summarizeNamedCounts(typeScriptCases, inScopeTypeScriptSuites, outOfScopeTypeScriptSuites),
    baselines: summarizeNamedCounts(baselines, inScopeBaselineCategories, outOfScopeBaselineCategories),
    goTests,
  };
}

function summarizeNamedCounts(counts, inScopeNames, outOfScopeNames = new Set()) {
  const entries = Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right)));
  let inScope = 0;
  let outOfScope = 0;
  let unclassified = 0;
  for (const [name, count] of Object.entries(entries)) {
    if (inScopeNames.has(name)) {
      inScope += count;
    } else if (outOfScopeNames.has(name)) {
      outOfScope += count;
    } else {
      unclassified += count;
    }
  }
  return {
    total: Object.values(entries).reduce((sum, count) => sum + count, 0),
    inScope,
    outOfScope,
    unclassified,
    entries,
  };
}

async function countFilesByChild(root, includeFile) {
  if (!existsSync(root)) {
    return {};
  }
  const counts = {};
  const entries = await readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory()) {
      counts[entry.name] = (await walkFiles(fullPath)).filter(includeFile).length;
    } else if (entry.isFile() && includeFile(fullPath)) {
      counts["."] = (counts["."] ?? 0) + 1;
    }
  }
  return counts;
}

async function countGoTestFilesByPackage(root) {
  const counts = {};
  for (const file of await walkFiles(root, (entryPath) => entryPath.endsWith(`${sep}node_modules`))) {
    if (!file.endsWith("_test.go")) {
      continue;
    }
    const relativePath = relative(root, file).split(sep);
    const packageName = relativePath.length >= 2 ? `${relativePath[0]}/${relativePath[1]}` : relativePath[0];
    counts[packageName] = (counts[packageName] ?? 0) + 1;
  }
  const outOfScope = Object.entries(counts)
    .filter(([packageName]) => packageName === "internal/fourslash" || packageName === "internal/lsp" || packageName === "internal/ls")
    .reduce((sum, [, count]) => sum + count, 0);
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
  return {
    total,
    inScope: total - outOfScope,
    outOfScope,
    unclassified: 0,
    entries: Object.fromEntries(Object.entries(counts).sort(([left], [right]) => left.localeCompare(right))),
  };
}

export async function discoverCases(options) {
  const supportedSuites = supportedSuitesByCorpus.get(options.corpus);
  if (supportedSuites === undefined) {
    throw new Error(`Unsupported corpus '${options.corpus}'.`);
  }
  const selectedCaseRoot = caseRootByCorpus.get(options.corpus);
  if (selectedCaseRoot === undefined) {
    throw new Error(`No case root registered for corpus '${options.corpus}'.`);
  }
  const suites = options.suite === "all" ? [...supportedSuites] : [options.suite];
  const caseFiles = [];
  for (const suite of suites) {
    const suiteRoot = join(selectedCaseRoot, suite);
    for (const file of await walkFiles(suiteRoot)) {
      if (!/\.(tsx?|jsx?)$/.test(file)) {
        continue;
      }
      if (isEmittedJavaScriptSibling(file)) {
        continue;
      }
      const sourceText = await readFile(file, "utf8");
      const parsed = parseFileBasedTest(sourceText, file.split(sep).at(-1));
      const configurations = getFileBasedTestConfigurations(parsed.globalOptions);
      const relativePath = relative(selectedCaseRoot, file).split(sep).join("/");
      if (options.filter !== "" && !relativePath.includes(options.filter)) {
        continue;
      }
      for (const configuration of configurations) {
        caseFiles.push({
          corpus: options.corpus,
          suite,
          sourcePath: file,
          relativePath,
          caseName: relativePath.replace(/\.(tsx?|jsx?)$/, "").split("/").at(-1),
          sourceBaseName: relativePath.split("/").at(-1),
          configurationName: configuration.name,
          configuration: configuration.settings,
        });
      }
    }
  }
  caseFiles.sort((left, right) => `${left.relativePath}:${left.configurationName}`.localeCompare(`${right.relativePath}:${right.configurationName}`));
  return options.limit > 0 ? caseFiles.slice(0, options.limit) : caseFiles;
}

export function isEmittedJavaScriptSibling(file) {
  if (!/\.jsx?$/.test(file)) {
    return false;
  }
  const withoutExtension = file.replace(/\.jsx?$/, "");
  return existsSync(`${withoutExtension}.ts`) || existsSync(`${withoutExtension}.tsx`);
}

async function walkFiles(root, excludeDirectory = () => false) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(root, entry.name);
    if (entry.isDirectory() && !excludeDirectory(fullPath)) {
      files.push(...await walkFiles(fullPath, excludeDirectory));
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

export function parseFileBasedTest(sourceText, fallbackFileName) {
  const units = [];
  const globalOptions = new Map();
  const symlinks = new Map();
  const lines = sourceText.split(/\r?\n/);
  let currentFileName = "";
  let currentFileLines = [];
  let sawFileDirective = false;

  const flush = () => {
    if (currentFileName === "") {
      return;
    }
    units.push({
      fileName: currentFileName,
      content: currentFileLines.join("\n"),
    });
    currentFileLines = [];
  };

  for (const line of lines) {
    const linkMatch = /^\/\/\s*@link\s*:\s*([^\r\n]*)\s*->\s*([^\r\n]*)/.exec(line);
    if (linkMatch !== null) {
      symlinks.set(linkMatch[2].trim(), linkMatch[1].trim());
      continue;
    }
    const optionMatch = /^\/\/\s*@(\w+)\s*:\s*([^\r\n]*)/.exec(line);
    if (optionMatch !== null) {
      const optionName = optionMatch[1].toLowerCase();
      const optionValue = optionMatch[2].trim().replace(/;$/, "");
      if (optionName === "filename") {
        flush();
        sawFileDirective = true;
        currentFileName = optionValue;
      } else if (optionName === "symlink" && currentFileName !== "") {
        for (const link of optionValue.split(",")) {
          const trimmed = link.trim();
          if (trimmed !== "") {
            symlinks.set(trimmed, currentFileName);
          }
        }
      } else {
        globalOptions.set(optionName, optionValue);
      }
      continue;
    }
    if (currentFileName === "" && sawFileDirective) {
      currentFileName = fallbackFileName;
    }
    currentFileLines.push(line);
  }

  if (currentFileName === "") {
    currentFileName = fallbackFileName;
  }
  flush();

  return {
    units,
    globalOptions,
    symlinks,
    currentDirectory: globalOptions.get("currentdirectory") ?? "/src",
  };
}

export function compilerOptionsFromSettings(settings) {
  const compilerOptions = {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
  };

  for (const [rawName, rawValue] of settings) {
    if (rawName === "filename" || rawName === "currentdirectory" || rawName === "symlink") {
      continue;
    }
    const listName = listOptions.get(rawName);
    if (listName !== undefined) {
      compilerOptions[listName] = rawValue.replace(/;$/, "").split(",").map((entry) => entry.trim()).filter(Boolean);
      continue;
    }
    const value = firstConcreteOptionValue(rawValue);
    if (value === undefined) {
      continue;
    }
    if (booleanOptions.has(rawName)) {
      compilerOptions[booleanOptionNames.get(rawName)] = parseBoolean(value);
      continue;
    }
    const stringName = stringOptions.get(rawName);
    if (stringName !== undefined) {
      compilerOptions[stringName] = rawName === "target" && value.toLowerCase() === "es5" ? "ES2016" : value;
      continue;
    }
  }

  return compilerOptions;
}

export function getFileBasedTestConfigurations(settings) {
  const nonVaryingOptions = new Map();
  const varyingEntries = [];
  let variationCount = 1;

  for (const [option, value] of settings) {
    if (compilerVaryByOptions.has(option)) {
      const entries = splitOptionValues(value, option);
      if (entries.length > 1) {
        variationCount *= entries.length;
        if (variationCount > 25) {
          throw new Error(`Provided test options exceeded the maximum number of variations`);
        }
        varyingEntries.push([option, entries]);
        continue;
      }
      if (entries.length === 1) {
        nonVaryingOptions.set(option, entries[0]);
        continue;
      }
    }
    nonVaryingOptions.set(option, value);
  }

  if (varyingEntries.length === 0) {
    return [{ name: "", settings: nonVaryingOptions }];
  }

  const configurations = [];
  const visit = (index, current) => {
    if (index === varyingEntries.length) {
      const varyingSettings = new Map(current);
      const name = [...varyingSettings]
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([option, value]) => `${option}=${value.toLowerCase()}`)
        .join(",");
      const merged = new Map(varyingSettings);
      for (const [option, value] of nonVaryingOptions) {
        merged.set(option, value);
      }
      configurations.push({ name, settings: merged });
      return;
    }
    const [option, values] = varyingEntries[index];
    for (const value of values) {
      current.set(option, value);
      visit(index + 1, current);
    }
    current.delete(option);
  };
  visit(0, new Map());
  return configurations;
}

function splitOptionValues(rawValue, option) {
  const values = rawValue.replace(/;$/, "").split(",").map((value) => value.trim()).filter(Boolean);
  let includeAll = false;
  const includes = [];
  const excludes = new Set();
  for (const value of values) {
    if (value === "*") {
      includeAll = true;
    } else if (value.startsWith("-") || value.startsWith("!")) {
      excludes.add(normalizeOptionValue(option, value.slice(1)));
    } else {
      includes.push(normalizeOptionValue(option, value));
    }
  }

  const candidates = [];
  if (includeAll) {
    candidates.push(...allOptionValues(option));
  }
  candidates.push(...includes);
  const deduped = [];
  const seen = new Set();
  for (const value of candidates) {
    if (!excludes.has(value) && !seen.has(value)) {
      seen.add(value);
      deduped.push(value);
    }
  }
  return deduped;
}

function normalizeOptionValue(_option, value) {
  return value.trim().replace(/;$/, "");
}

function allOptionValues(option) {
  if (booleanOptions.has(option)) {
    return ["true", "false"];
  }
  return [];
}

function firstConcreteOptionValue(rawValue) {
  const values = rawValue.replace(/;$/, "").split(",").map((value) => value.trim()).filter(Boolean);
  for (const value of values) {
    if (value === "*" || value === "!true" || value === "!false") {
      continue;
    }
    return value;
  }
  return undefined;
}

function parseBoolean(value) {
  return value === "true" || value === "1";
}

function baselineHasErrors(testCase) {
  for (const baselineDir of baselineDirectories(testCase)) {
    const directPath = join(baselineDir, `${configuredCaseName(testCase)}.errors.txt`);
    if (existsSync(directPath)) {
      return true;
    }
    if (!existsSync(baselineDir)) {
      continue;
    }
    const prefix = `${testCase.caseName}(`;
    if (readdirSync(baselineDir).some((name) => name.startsWith(prefix) && name.endsWith(".errors.txt"))) {
      return true;
    }
  }
  return false;
}

function baselineDirectories(testCase) {
  if (testCase.corpus === "typescript") {
    return [
      join(baselineRoot, "submodule", testCase.suite),
      join(baselineRoot, "submoduleAccepted", testCase.suite),
      join(baselineRoot, "submoduleTriaged", testCase.suite),
    ];
  }
  return [join(baselineRoot, testCase.suite)];
}

function configuredCaseName(testCase) {
  return testCase.configurationName === "" ? testCase.caseName : `${testCase.caseName}(${testCase.configurationName})`;
}

async function materializeCase(testCase, runRoot) {
  const sourceText = await readFile(testCase.sourcePath, "utf8");
  const parsed = parseFileBasedTest(sourceText, testCase.relativePath.split("/").at(-1));
  const caseDir = join(runRoot, caseDirectoryFragment(testCase));
  await mkdir(caseDir, { recursive: true });
  const skipReason = getSkipReason(testCase);
  const needsLibFolder = parsed.units.some((unit) => unit.content.includes("/.lib/")) || parsed.globalOptions.has("libfiles");
  if (needsLibFolder) {
    await cp(testLibRoot, join(caseDir, ".lib"), { recursive: true, force: true });
  }

  const writtenFiles = [];
  for (const unit of parsed.units) {
    const filePath = normalizeHarnessPath(unit.fileName);
    const fullPath = join(caseDir, filePath);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, rewriteHarnessAbsolutePaths(unit.content, filePath));
    writtenFiles.push(filePath);
  }
  if (!hasRootPackageJson(writtenFiles)) {
    await writeFile(join(caseDir, "package.json"), "{}\n");
    writtenFiles.push("package.json");
  }
  await materializeSymlinks(caseDir, parsed.symlinks);

  const existingConfig = writtenFiles.find((file) => /(^|\/)tsconfig\.json$/i.test(file));
  if (existingConfig !== undefined) {
    return {
      caseDir,
      projectArg: join(caseDir, existingConfig),
      writtenFiles,
      expectedErrors: baselineHasErrors(testCase),
      skipReason,
    };
  }

  const inputFiles = selectInputFiles(parsed, writtenFiles, testCase.configuration);
  const tsconfig = {
    compilerOptions: compilerOptionsFromSettings(testCase.configuration),
    files: inputFiles,
  };
  if (inputFiles.some((file) => /\.(jsx?|mjs|cjs)$/.test(file)) && tsconfig.compilerOptions.allowJs === undefined) {
    tsconfig.compilerOptions.allowJs = true;
  }
  const configPath = join(caseDir, "tsconfig.json");
  await writeFile(configPath, `${JSON.stringify(tsconfig, null, 2)}\n`);
  return {
    caseDir,
    projectArg: configPath,
    writtenFiles,
    expectedErrors: baselineHasErrors(testCase),
    skipReason,
  };
}

export function hasRootPackageJson(writtenFiles) {
  return writtenFiles.some((file) => /^package\.json$/i.test(file));
}

function selectInputFiles(parsed, writtenFiles, configuration) {
  const sourceFiles = writtenFiles.filter((file) => /\.(tsx?|jsx?)$/.test(file));
  const lastSourceFile = [...sourceFiles].at(-1);
  const lastUnit = parsed.units.filter((unit) => /\.(tsx?|jsx?)$/.test(unit.fileName)).at(-1);
  const noImplicitReferences = configuration.get("noimplicitreferences") !== undefined;
  const hasRequireOrReference = lastUnit !== undefined && (lastUnit.content.includes("require(") || /reference\spath/.test(lastUnit.content));
  if (lastSourceFile !== undefined && (noImplicitReferences || hasRequireOrReference)) {
    return [lastSourceFile];
  }
  return sourceFiles;
}

function rewriteHarnessAbsolutePaths(content, filePath) {
  if (!content.includes("/.lib/")) {
    return content;
  }
  let libPath = relative(dirname(filePath), ".lib").split(sep).join("/");
  if (libPath === "") {
    libPath = ".";
  }
  if (!libPath.startsWith(".")) {
    libPath = `./${libPath}`;
  }
  return content.replaceAll("/.lib/", `${libPath}/`);
}

async function materializeSymlinks(caseDir, symlinks) {
  for (const [link, target] of symlinks) {
    const linkPath = join(caseDir, normalizeHarnessPath(link));
    const targetPath = join(caseDir, normalizeHarnessPath(target));
    await mkdir(dirname(linkPath), { recursive: true });
    try {
      await symlink(targetPath, linkPath, "dir");
    } catch (error) {
      if (!(error instanceof Error) || !("code" in error) || error.code !== "EEXIST") {
        throw error;
      }
    }
  }
}

function getSkipReason(testCase) {
  if (skippedTests.has(testCase.sourceBaseName)) {
    return `TS-Go runner skip list: ${testCase.sourceBaseName}`;
  }
  const moduleValue = testCase.configuration.get("module")?.toLowerCase();
  if (moduleValue === "amd" || moduleValue === "umd" || moduleValue === "system") {
    return `TS-Go runner skips unsupported module kind: ${moduleValue}`;
  }
  const moduleResolutionValue = testCase.configuration.get("moduleresolution")?.toLowerCase();
  if (moduleResolutionValue === "classic" || moduleResolutionValue === "node10") {
    return `TS-Go runner skips unsupported module resolution: ${moduleResolutionValue}`;
  }
  if (testCase.configuration.get("esmoduleinterop")?.toLowerCase() === "false") {
    return `TS-Go runner skips esModuleInterop=false`;
  }
  if (testCase.configuration.get("allowsyntheticdefaultimports")?.toLowerCase() === "false") {
    return `TS-Go runner skips allowSyntheticDefaultImports=false`;
  }
  if (testCase.configuration.has("baseurl")) {
    return `TS-Go runner skips baseUrl`;
  }
  if (testCase.configuration.has("outfile")) {
    return `TS-Go runner skips outFile`;
  }
  return "";
}

function normalizeHarnessPath(fileName) {
  let normalized = fileName.replaceAll("\\", "/").trim();
  normalized = normalized.replace(/^[a-zA-Z]:\//, "");
  normalized = normalized.replace(/^\/+/, "");
  if (normalized === "") {
    normalized = "input.ts";
  }
  return normalized;
}

function safePathFragment(path) {
  return path.replace(/[^a-zA-Z0-9._/-]/g, "_").replaceAll("/", "__");
}

export function caseDirectoryFragment(testCase) {
  return safePathFragment(`${testCase.corpus ?? "current"}/${testCase.suite}/${configuredCaseName(testCase)}`);
}

async function runTsts(projectArg) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [
      "--max-old-space-size=8192",
      cliPath,
      "-p",
      projectArg,
      "--pretty",
      "false",
    ], {
      cwd: repoRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("close", (exitCode, signal) => {
      resolve({ exitCode: exitCode ?? 1, signal, stdout, stderr });
    });
  });
}

async function runCase(testCase, runRoot) {
  const materialized = await materializeCase(testCase, runRoot);
  if (materialized.skipReason !== "") {
    return {
      ...testCase,
      caseDir: materialized.caseDir,
      expectedErrors: materialized.expectedErrors,
      actualErrors: false,
      exitCode: 0,
      signal: null,
      status: "skip",
      skipReason: materialized.skipReason,
      stdout: "",
      stderr: "",
    };
  }
  const result = await runTsts(materialized.projectArg);
  const actualErrors = result.exitCode !== 0;
  const statusMatches = actualErrors === materialized.expectedErrors;
  return {
    ...testCase,
    caseDir: materialized.caseDir,
    expectedErrors: materialized.expectedErrors,
    actualErrors,
    exitCode: result.exitCode,
    signal: result.signal,
    status: statusMatches ? "pass" : "fail",
    skipReason: "",
    stdout: result.stdout,
    stderr: result.stderr,
  };
}

async function runQueue(testCases, runRoot, jobs, failFast) {
  const results = [];
  let cursor = 0;
  let stopped = false;
  const workers = Array.from({ length: jobs }, async () => {
    while (!stopped) {
      const currentIndex = cursor;
      cursor += 1;
      if (currentIndex >= testCases.length) {
        return;
      }
      const testCase = testCases[currentIndex];
      const result = await runCase(testCase, runRoot);
      results[currentIndex] = result;
      if (result.status === "fail" && failFast) {
        stopped = true;
      }
      printProgress(results.filter(Boolean).length, testCases.length, result);
    }
  });
  await Promise.all(workers);
  return results.filter(Boolean);
}

function printProgress(done, total, result) {
  const prefix = result.status === "pass" ? "PASS" : result.status === "skip" ? "SKIP" : "FAIL";
  const configuration = result.configurationName === "" ? "" : ` configuration=${result.configurationName}`;
  const skip = result.skipReason === "" ? "" : ` reason=${result.skipReason}`;
  console.log(`${prefix} ${done}/${total} ${result.relativePath}${configuration} expectedErrors=${result.expectedErrors} actualErrors=${result.actualErrors}${skip}`);
}

async function writeReports(reportRoot, results, inventory, caseRoot) {
  const summary = summarize(results);
  await writeFile(join(reportRoot, "results.json"), `${JSON.stringify({ summary, inventory, caseRoot, results: results.map(trimResult) }, null, 2)}\n`);
  await writeFile(join(reportRoot, "summary.md"), renderMarkdown(summary, results, inventory, caseRoot));
}

function summarize(results) {
  const passed = results.filter((result) => result.status === "pass").length;
  const skipped = results.filter((result) => result.status === "skip").length;
  const failed = results.length - passed - skipped;
  return {
    total: results.length,
    passed,
    failed,
    skipped,
    expectedErrorCases: results.filter((result) => result.expectedErrors).length,
    expectedCleanCases: results.filter((result) => !result.expectedErrors).length,
  };
}

function trimResult(result) {
  const output = `${result.stdout}${result.stderr}`;
  return {
    corpus: result.corpus,
    suite: result.suite,
    relativePath: result.relativePath,
    status: result.status,
    expectedErrors: result.expectedErrors,
    actualErrors: result.actualErrors,
    exitCode: result.exitCode,
    signal: result.signal,
    caseDir: result.caseDir,
    skipReason: result.skipReason,
    firstOutputLines: output.split(/\r?\n/).filter(Boolean).slice(0, 20),
  };
}

function renderMarkdown(summary, results, inventory, caseRoot) {
  const failed = results.filter((result) => result.status === "fail");
  const lines = [
    "# TSTS TS-Go Suite Run",
    "",
    `- Case root: ${caseRoot}`,
    `- Total: ${summary.total}`,
    `- Passed: ${summary.passed}`,
    `- Failed: ${summary.failed}`,
    `- Skipped: ${summary.skipped}`,
    `- Expected-error cases: ${summary.expectedErrorCases}`,
    `- Expected-clean cases: ${summary.expectedCleanCases}`,
    "",
    "## Upstream Test Universe",
    "",
    ...renderInventoryTable(inventory),
    "",
    "## Failures",
    "",
  ];
  if (failed.length === 0) {
    lines.push("None.");
  } else {
    lines.push("| Case | Expected Errors | Actual Errors | Exit | First Output |");
    lines.push("|---|---:|---:|---:|---|");
    for (const result of failed.slice(0, 200)) {
      const output = `${result.stdout}${result.stderr}`.split(/\r?\n/).find(Boolean) ?? "";
      lines.push(`| ${result.relativePath} | ${result.expectedErrors} | ${result.actualErrors} | ${result.exitCode} | ${escapeTable(output)} |`);
    }
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function renderInventoryTable(inventory) {
  return [
    "| Bucket | Total | In Scope | Excluded | Unclassified | Notes |",
    "|---|---:|---:|---:|---:|---|",
    `| Current TSTS harness | ${inventory.currentHarness.total} | ${inventory.currentHarness.inScope} | ${inventory.currentHarness.outOfScope} | ${inventory.currentHarness.unclassified} | Executed by this runner today |`,
    `| TypeScript submodule cases | ${inventory.typeScriptCases.total} | ${inventory.typeScriptCases.inScope} | ${inventory.typeScriptCases.outOfScope} | ${inventory.typeScriptCases.unclassified} | Compiler/conformance/project/transpile in scope; language-service fourslash and TS harness unit tests excluded |`,
    `| TS-Go reference baselines | ${inventory.baselines.total} | ${inventory.baselines.inScope} | ${inventory.baselines.outOfScope} | ${inventory.baselines.unclassified} | Exact baseline comparison is the next acceptance-strength gate |`,
    `| TS-Go Go unit tests | ${inventory.goTests.total} | ${inventory.goTests.inScope} | ${inventory.goTests.outOfScope} | ${inventory.goTests.unclassified} | Go unit coverage to port or mirror, excluding LS packages |`,
  ];
}

function renderInventoryMarkdown(inventory) {
  const lines = [
    "# TSTS TS-Go Test Universe",
    "",
    ...renderInventoryTable(inventory),
    "",
    "## Current TSTS Harness",
    "",
    ...renderNamedCounts(inventory.currentHarness.entries),
    "",
    "## TypeScript Submodule Cases",
    "",
    ...renderNamedCounts(inventory.typeScriptCases.entries),
    "",
    "## TS-Go Reference Baselines",
    "",
    ...renderNamedCounts(inventory.baselines.entries),
    "",
    "## TS-Go Go Unit Tests",
    "",
    ...renderNamedCounts(inventory.goTests.entries),
    "",
  ];
  return `${lines.join("\n")}\n`;
}

function renderNamedCounts(entries) {
  const lines = [
    "| Name | Files |",
    "|---|---:|",
  ];
  for (const [name, count] of Object.entries(entries)) {
    lines.push(`| ${name} | ${count} |`);
  }
  return lines;
}

function escapeTable(text) {
  return text.replaceAll("|", "\\|").slice(0, 240);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const inventory = await buildTestUniverseInventory();
  if (options.inventory) {
    console.log(renderInventoryMarkdown(inventory));
    return;
  }
  const testCases = await discoverCases(options);
  const timestamp = new Date().toISOString().replaceAll(":", "").replace(".", "-").replace("Z", `-${process.pid}`);
  const caseRootForRun = join(tmpdir(), "tsts-tsgo-suite", timestamp);
  const reportRoot = join(repoRoot, ".temp/tsgo-suite", timestamp);
  await mkdir(caseRootForRun, { recursive: true });
  await mkdir(reportRoot, { recursive: true });

  if (!existsSync(cliPath)) {
    throw new Error(`TSTS CLI not found at ${cliPath}. Run TSTS emit first.`);
  }
  console.log(`TSTS TS-Go suite run`);
  console.log(`cases=${testCases.length} corpus=${options.corpus} suite=${options.suite} jobs=${options.jobs}`);
  console.log(`upstreamInScope=${inventory.typeScriptCases.inScope + inventory.baselines.inScope + inventory.goTests.inScope} upstreamExcluded=${inventory.typeScriptCases.outOfScope + inventory.baselines.outOfScope + inventory.goTests.outOfScope}`);
  console.log(`caseRoot=${caseRootForRun}`);
  console.log(`reportRoot=${reportRoot}`);

  const results = await runQueue(testCases, caseRootForRun, options.jobs, options.failFast);
  await writeReports(reportRoot, results, inventory, caseRootForRun);
  const summary = summarize(results);
  console.log(`SUMMARY total=${summary.total} passed=${summary.passed} failed=${summary.failed}`);
  console.log(`REPORT ${join(reportRoot, "summary.md")}`);
  if (summary.failed > 0) {
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.stack : String(error));
    process.exitCode = 1;
  });
}
