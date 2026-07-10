#!/usr/bin/env node
import { spawn, fork } from "node:child_process";
import { createHash, randomUUID } from "node:crypto";
import { cpus, hostname } from "node:os";
import { basename, dirname, isAbsolute, join, posix as posixPath, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { cp, lstat, mkdir, open, readFile, readdir, readlink, rename, stat, symlink, writeFile } from "node:fs/promises";
import { existsSync, lstatSync, readFileSync, readdirSync } from "node:fs";
import ts from "typescript";
import { canonicalJson, compareUtf8, executableProvenance, fingerprint, hashInputRoots } from "../test-provenance.mjs";
import { tstsBuildRequest, verifyTstsBuild } from "../tsts-build.mjs";
import { loadAndVerifyTsgoSourcePin } from "../tsgo-source-pin.mjs";
import { publishSealedDirectory, sealEvidenceDirectory, writeDurableFileExclusive } from "../sealed-evidence.mjs";
import {
  ACCEPTED_OVERLAY_ABSENT_MARKER,
  acceptedOverlaySections,
  loadActiveAcceptedOverlayBinding,
} from "./accepted-overlay-contract.mjs";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = join(dirname(scriptPath), "../../../..");
const packageRoot = join(repoRoot, "packages/tsts");
const vendorRoot = join(packageRoot, "_vendor/typescript-go");
const typeScriptSubmoduleRoot = join(vendorRoot, "_submodules/TypeScript");
const caseRoot = join(vendorRoot, "testdata/tests/cases");
const baselineRoot = join(vendorRoot, "testdata/baselines/reference");
const typeScriptSubmoduleCaseRoot = join(typeScriptSubmoduleRoot, "tests/cases");
const typeScriptSubmoduleBaselineRoot = join(typeScriptSubmoduleRoot, "tests/baselines/reference");
const typeScriptUnitTestRoot = join(typeScriptSubmoduleRoot, "src/testRunner/unittests");
const typeScriptUnitTestEntrypoint = join(typeScriptSubmoduleRoot, "src/testRunner/tests.ts");
const testLibRoot = join(vendorRoot, "_submodules/TypeScript/tests/lib");
const typeScriptApiDeclarationRoot = join(typeScriptSubmoduleBaselineRoot, "api");
const vendoredTypeScriptLibRoot = join(vendorRoot, "node_modules/typescript/lib");
const suiteBuildId = process.env.TSTS_SUITE_BUILD_ID ?? "";
if (suiteBuildId !== "" && !/^[0-9a-f]{64}$/.test(suiteBuildId)) throw new Error("TSTS_SUITE_BUILD_ID must be a SHA-256 digest");
const preparedBuildRoot = suiteBuildId === "" ? join(packageRoot, "dist") : join(repoRoot, ".temp/tsts-builds/cache", suiteBuildId);
const distRoot = suiteBuildId === "" ? preparedBuildRoot : join(preparedBuildRoot, "dist");
const cliPath = join(distRoot, "src/cli/index.js");
const apiPath = join(distRoot, "src/index.js");
const tsgoAcceptedRoot = join(dirname(scriptPath), "tsgo-accepted");
const tsbaselineRoot = join(dirname(scriptPath), "tsbaseline");
const sourcePinPath = join(packageRoot, "schema/tsgo/source-pin.json");
const bundledSourceRoot = join(packageRoot, "src/internal/bundled/libs");
const resolvedTypeScriptEntry = fileURLToPath(import.meta.resolve("typescript"));
const resolvedTypeScriptPackageRoot = dirname(dirname(resolvedTypeScriptEntry));
const provenanceHelperPath = fileURLToPath(new URL("../test-provenance.mjs", import.meta.url));
const sourcePinVerifierPath = fileURLToPath(new URL("../tsgo-source-pin.mjs", import.meta.url));
const sealedEvidenceHelperPath = fileURLToPath(new URL("../sealed-evidence.mjs", import.meta.url));
const reportVerifierPath = fileURLToPath(new URL("./verify-report.mjs", import.meta.url));
const CASE_TIMEOUT_MS = positiveIntegerEnvironment("TSGO_CASE_TIMEOUT_MS", 120000);
const POOL_CASE_TIMEOUT_MS = positiveIntegerEnvironment("TSGO_POOL_TIMEOUT_MS", 300000);
const RESULT_RECORD_MAX_BYTES = positiveIntegerEnvironment("TSGO_RESULT_RECORD_MAX_BYTES", 1024 * 1024);
const RESULT_SEGMENT_MAX_BYTES = positiveIntegerEnvironment("TSGO_RESULT_SEGMENT_MAX_BYTES", 8 * 1024 * 1024);
const RESULT_SEGMENT_MAX_RECORDS = positiveIntegerEnvironment("TSGO_RESULT_SEGMENT_MAX_RECORDS", 256);
const RESULT_SCHEMA_VERSION = 2;
const RESULT_VERDICT_SCHEMA_VERSION = 1;
const EXACT_BASELINE_SCHEMA_VERSION = 1;
const RESULT_SEGMENT_SEAL_SCHEMA_VERSION = 2;
const RUN_CONFIG_SCHEMA_VERSION = 1;
const RUN_MANIFEST_SCHEMA_VERSION = 3;
const REPORT_SCHEMA_VERSION = 3;
const REPORT_SEAL_METADATA_SCHEMA_VERSION = 1;
const INVENTORY_SCHEMA_VERSION = 2;
const UUID_V4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const DIGEST_PATTERN = /^[0-9a-f]{64}$/;
const RESULT_SEGMENT_NAME_PATTERN = /^results-(\d{4})\.ndjson$/;
const MAX_BASELINE_SAMPLES = 100;
const MAX_BASELINE_SAMPLE_LENGTH = 2000;
const utf8Decoder = new TextDecoder("utf-8");
const strictUtf8Decoder = new TextDecoder("utf-8", { fatal: true });
const utf16LittleEndianDecoder = new TextDecoder("utf-16le");
const utf16BigEndianDecoder = new TextDecoder("utf-16be");
const harnessSourceFilePattern = /\.(?:[cm]?tsx?|[cm]?jsx?)$/i;
const harnessJavaScriptFilePattern = /\.(?:[cm]?jsx?)$/i;
const pinnedTsgoCompilerTestPattern = /\.tsx?$/;
let tstsApi;
let activeAcceptedOverlayBinding;

function positiveIntegerEnvironment(name, fallback) {
  const value = Number(process.env[name] ?? fallback);
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${name} must be a positive safe integer`);
  return value;
}

const supportedSuitesByCorpus = new Map([
  ["current", new Set(["compiler", "conformance"])],
  ["typescript", new Set(["compiler", "conformance", "project", "transpile"])],
]);
const caseRootByCorpus = new Map([
  ["current", caseRoot],
  ["typescript", typeScriptSubmoduleCaseRoot],
]);
const inScopeTypeScriptSuites = new Set(["compiler", "conformance", "project", "transpile"]);
const outOfScopeTypeScriptSuites = new Set(["fourslash"]);
const requiredFixtureTypeScriptSuites = new Set(["projects", "unittests"]);
const inScopeBaselineCategories = new Set(["api", "astnav", "compiler", "config", "conformance", "submodule", "submoduleAccepted", "submoduleTriaged", "tsbuild", "tsbuildWatch", "tsc", "tscWatch", "tsoptions"]);
const outOfScopeBaselineCategories = new Set(["fourslash", "lsp"]);
// compiler_runner.go getCompilerVaryByMap: every non-command-line-only boolean/enum
// option with an Affects* flag varies, plus noEmit and isolatedModules.
const { OptionsDeclarations: tstsOptionsDeclarations } = await import(pathToFileURL(join(distRoot, "src/internal/tsoptions/declscompiler.js")).href);
const { barebonesLibContent: suiteBarebonesLibContent } = await import(pathToFileURL(apiPath).href);
const compilerVaryByOptions = new Set([
  ...tstsOptionsDeclarations
    .filter((option) =>
      !option.IsCommandLineOnly &&
      (option.Kind === "boolean" || option.Kind === "enum") &&
      (option.AffectsProgramStructure ||
        option.AffectsEmit ||
        option.AffectsModuleResolution ||
        option.AffectsBindDiagnostics ||
        option.AffectsSemanticDiagnostics ||
        option.AffectsSourceFile ||
        option.AffectsDeclarationPath ||
        option.AffectsBuildInfo))
    .map((option) => option.Name.toLowerCase()),
  "noemit",
  "isolatedmodules",
]);
const booleanOptions = new Set([
  "allowjs",
  "allowimportingtsextensions",
  "allowarbitraryextensions",
  "allowumdglobalaccess",
  "allowunusedlabels",
  "allowunreachablecode",
  "allowsyntheticdefaultimports",
  "alwaysstrict",
  "checkjs",
  "composite",
  "declaration",
  "declarationmap",
  "deduplicatepackages",
  "downleveliteration",
  "emitbom",
  "emitdeclarationonly",
  "emitdecoratormetadata",
  "erasablesyntaxonly",
  "esmoduleinterop",
  "exactoptionalpropertytypes",
  "experimentaldecorators",
  "incremental",
  "inlinesourcemap",
  "inlinesources",
  "importhelpers",
  "keyofstringsonly",
  "isolatedmodules",
  "isolateddeclarations",
  "noemit",
  "noemithelpers",
  "noerrortruncation",
  "noimplicitany",
  "noimplicitreturns",
  "noimplicitthis",
  "noimplicitoverride",
  "noimplicitusestrict",
  "noresolve",
  "nolib",
  "nopropertyaccessfromindexsignature",
  "nofallthroughcasesinswitch",
  "nocheck",
  "nouncheckedindexedaccess",
  "nouncheckedsideeffectimports",
  "nounusedlocals",
  "nounusedparameters",
  "libreplacement",
  "preserveconstenums",
  "preservevalueimports",
  "pretty",
  "removecomments",
  "resolvejsonmodule",
  "resolvepackagejsonexports",
  "rewriterelativeimportextensions",
  "skipdefaultlibcheck",
  "skiplibcheck",
  "strict",
  "strictbuiltiniteratorreturn",
  "strictnullchecks",
  "strictpropertyinitialization",
  "stripinternal",
  "sourcemap",
  "traceresolution",
  "usedefineforclassfields",
  "useunknownincatchvariables",
  "verbatimmodulesyntax",
]);
const stringOptions = new Map([
  ["baseurl", "baseUrl"],
  ["declarationdir", "declarationDir"],
  ["jsx", "jsx"],
  ["jsxfactory", "jsxFactory"],
  ["jsxfragmentfactory", "jsxFragmentFactory"],
  ["jsximportsource", "jsxImportSource"],
  ["maproot", "mapRoot"],
  ["module", "module"],
  ["moduledetection", "moduleDetection"],
  ["moduleresolution", "moduleResolution"],
  ["importsnotusedasvalues", "importsNotUsedAsValues"],
  ["out", "out"],
  ["outdir", "outDir"],
  ["outfile", "outFile"],
  ["reactnamespace", "reactNamespace"],
  ["rootdir", "rootDir"],
  ["sourceroot", "sourceRoot"],
  ["target", "target"],
  ["tsbuildinfofile", "tsBuildInfoFile"],
]);
const pathStringOptions = new Set([
  "baseurl",
  "declarationdir",
  "out",
  "outdir",
  "outfile",
  "rootdir",
  "tsbuildinfofile",
]);
const listOptions = new Map([
  ["lib", "lib"],
  ["typeroots", "typeRoots"],
  ["types", "types"],
]);
const pathListOptions = new Set([
  "typeroots",
]);
const numberOptions = new Map([
  ["maxnodemodulejsdepth", "maxNodeModuleJsDepth"],
]);
const booleanOptionNames = new Map([
  ["allowjs", "allowJs"],
  ["allowimportingtsextensions", "allowImportingTsExtensions"],
  ["allowarbitraryextensions", "allowArbitraryExtensions"],
  ["allowumdglobalaccess", "allowUmdGlobalAccess"],
  ["allowunusedlabels", "allowUnusedLabels"],
  ["allowunreachablecode", "allowUnreachableCode"],
  ["allowsyntheticdefaultimports", "allowSyntheticDefaultImports"],
  ["alwaysstrict", "alwaysStrict"],
  ["checkjs", "checkJs"],
  ["composite", "composite"],
  ["declaration", "declaration"],
  ["declarationmap", "declarationMap"],
  ["deduplicatepackages", "deduplicatePackages"],
  ["downleveliteration", "downlevelIteration"],
  ["emitbom", "emitBOM"],
  ["emitdeclarationonly", "emitDeclarationOnly"],
  ["emitdecoratormetadata", "emitDecoratorMetadata"],
  ["erasablesyntaxonly", "erasableSyntaxOnly"],
  ["esmoduleinterop", "esModuleInterop"],
  ["exactoptionalpropertytypes", "exactOptionalPropertyTypes"],
  ["experimentaldecorators", "experimentalDecorators"],
  ["incremental", "incremental"],
  ["inlinesourcemap", "inlineSourceMap"],
  ["inlinesources", "inlineSources"],
  ["importhelpers", "importHelpers"],
  ["keyofstringsonly", "keyofStringsOnly"],
  ["isolatedmodules", "isolatedModules"],
  ["isolateddeclarations", "isolatedDeclarations"],
  ["noemit", "noEmit"],
  ["noemithelpers", "noEmitHelpers"],
  ["noerrortruncation", "noErrorTruncation"],
  ["noimplicitany", "noImplicitAny"],
  ["noimplicitreturns", "noImplicitReturns"],
  ["noimplicitthis", "noImplicitThis"],
  ["noimplicitoverride", "noImplicitOverride"],
  ["noimplicitusestrict", "noImplicitUseStrict"],
  ["noresolve", "noResolve"],
  ["nolib", "noLib"],
  ["nopropertyaccessfromindexsignature", "noPropertyAccessFromIndexSignature"],
  ["nofallthroughcasesinswitch", "noFallthroughCasesInSwitch"],
  ["nocheck", "noCheck"],
  ["nouncheckedindexedaccess", "noUncheckedIndexedAccess"],
  ["nouncheckedsideeffectimports", "noUncheckedSideEffectImports"],
  ["nounusedlocals", "noUnusedLocals"],
  ["nounusedparameters", "noUnusedParameters"],
  ["libreplacement", "libReplacement"],
  ["preserveconstenums", "preserveConstEnums"],
  ["preservevalueimports", "preserveValueImports"],
  ["pretty", "pretty"],
  ["removecomments", "removeComments"],
  ["resolvejsonmodule", "resolveJsonModule"],
  ["resolvepackagejsonexports", "resolvePackageJsonExports"],
  ["rewriterelativeimportextensions", "rewriteRelativeImportExtensions"],
  ["skipdefaultlibcheck", "skipDefaultLibCheck"],
  ["skiplibcheck", "skipLibCheck"],
  ["strict", "strict"],
  ["strictbuiltiniteratorreturn", "strictBuiltinIteratorReturn"],
  ["strictnullchecks", "strictNullChecks"],
  ["strictpropertyinitialization", "strictPropertyInitialization"],
  ["stripinternal", "stripInternal"],
  ["sourcemap", "sourceMap"],
  ["traceresolution", "traceResolution"],
  ["usedefineforclassfields", "useDefineForClassFields"],
  ["useunknownincatchvariables", "useUnknownInCatchVariables"],
  ["verbatimmodulesyntax", "verbatimModuleSyntax"],
]);

export function parseArgs(argv) {
  const parsed = {
    corpus: "current",
    suite: "all",
    filter: "",
    limit: 0,
    jobs: Math.max(1, cpus().length),
    failFast: false,
    keepGoing: true,
    inventory: false,
    // Exact-baseline comparison is the only mode. Weak mode (error-count-only)
    // was deleted: it green-lit emitted-output bugs (wrong .d.ts/.types/.js that
    // still produced the right number of errors). Concurrency is controlled by
    // --jobs: default = all cores (parallel), --jobs 1 = serial.
    exactBaselines: true,
    // When set, every case ALSO runs the real on-disk CLI compile and asserts it
    // agrees with the fast in-memory harness (error verdict AND emitted .js/.d.ts).
    // This is the provable on-disk-coverage gate; default off (harness-only fast
    // path) since 0 divergences over the corpus proves the two paths equivalent.
    verifyOnDisk: false,
    // Resume a suspended run: path to a prior reportRoot. The runner validates
    // the immutable run manifest and prior result segments, then writes a new
    // append-only segment for the remaining cases. Empty = fresh run.
    resume: "",
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
      parsed.jobs = Number(argv[++index] ?? "1");
    } else if (arg === "--fail-fast") {
      parsed.failFast = true;
      parsed.keepGoing = false;
    } else if (arg === "--inventory") {
      parsed.inventory = true;
    } else if (arg === "--exact-baselines") {
      parsed.exactBaselines = true;
    } else if (arg === "--verify-on-disk") {
      parsed.verifyOnDisk = true;
    } else if (arg === "--resume") {
      parsed.resume = argv[++index] ?? "";
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
  if (!Number.isSafeInteger(parsed.limit) || parsed.limit < 0) {
    throw new Error("--limit must be a non-negative safe integer");
  }
  if (!Number.isSafeInteger(parsed.jobs) || parsed.jobs < 1) {
    throw new Error("--jobs must be a positive safe integer");
  }
  return parsed;
}

function printHelp() {
  console.log(`Usage: node packages/tsts/tools/tsgo-suite/run.mjs [options]

Runs upstream TS-Go/TypeScript file-based tests through the TSTS CLI.

Options:
  --corpus <current|typescript>        current=testdata/tests/cases; typescript=_submodules/TypeScript/tests/cases. Default: current.
  --suite <all|compiler|conformance|project|transpile>
                                      Suite to run. Default: all.
  --filter <substring>                Run cases whose relative path contains the substring.
  --limit <n>                         Run at most n cases after filtering.
  --jobs <n>                          Worker processes (concurrency). Default: all CPU cores. --jobs 1 = serial.
  --fail-fast                         Stop after the first failure.
  --exact-baselines                   Deprecated no-op: exact-baseline comparison is always on (weak mode removed).
  --verify-on-disk                    For compiler/conformance cases, run the real on-disk CLI and compare its verdict plus every emitted artifact (including declarations) to the in-memory harness. Transpile cases exercise the public API directly and are reported as not applicable.
  --resume <reportRoot>               Resume a suspended run from its validated run-config and append-only result segments. Every source, baseline, build, runtime, option, and case-selection fingerprint must still match. To suspend, stop the process.
  --inventory                         Print the tracked upstream test universe and exit.
`);
}

export async function buildTestUniverseInventory() {
  const currentHarness = await countFilesByChild(caseRoot, (file) => harnessSourceFilePattern.test(file));
  const typeScriptCases = await countTypeScriptCaseFilesByChild(typeScriptSubmoduleCaseRoot);
  const typeScriptUnitTests = await buildTypeScriptUnitTestInventory();
  const baselines = await countFilesByChild(baselineRoot, () => true);
  const goTests = await countGoTestFilesByPackage(vendorRoot);
  return validateInventory({
    schemaVersion: INVENTORY_SCHEMA_VERSION,
    currentHarness: summarizeNamedCounts(currentHarness, supportedSuitesByCorpus.get("current")),
    typeScriptCases: summarizeTypeScriptCaseCounts(typeScriptCases),
    typeScriptUnitTests,
    baselines: summarizeNamedCounts(baselines, inScopeBaselineCategories, outOfScopeBaselineCategories),
    goTests,
  });
}

function summarizeTypeScriptCaseCounts(typeScriptCases) {
  const summary = summarizeNamedCounts(typeScriptCases.entries, inScopeTypeScriptSuites, outOfScopeTypeScriptSuites);
  return {
    ...summary,
    requiredFixtureFiles: typeScriptCases.requiredFixtureFiles,
  };
}

function summarizeNamedCounts(counts, inScopeNames, outOfScopeNames = new Set()) {
  const entries = Object.fromEntries(Object.entries(counts).sort(([left], [right]) => compareUtf8(left, right)));
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

async function countTypeScriptCaseFilesByChild(root) {
  if (!existsSync(root)) {
    throw new Error(`TypeScript case root is missing: ${root}`);
  }
  const entries = {};
  const requiredFixtureFiles = {};
  const classifiedSuites = new Set([...inScopeTypeScriptSuites, ...outOfScopeTypeScriptSuites, ...requiredFixtureTypeScriptSuites]);
  const children = (await readdir(root, { withFileTypes: true })).sort((left, right) => compareUtf8(left.name, right.name));
  for (const child of children) {
    const fullPath = join(root, child.name);
    if (!child.isDirectory() || !classifiedSuites.has(child.name)) {
      throw new Error(`Unclassified TypeScript case-root entry '${child.name}'`);
    }
    const files = await walkFiles(fullPath);
    if (requiredFixtureTypeScriptSuites.has(child.name)) {
      requiredFixtureFiles[child.name] = files.length;
      continue;
    }
    if (child.name === "project") {
      const invalid = files.filter((file) => !/\.json$/i.test(file));
      if (invalid.length !== 0) throw new Error(`Unclassified TypeScript project descriptor entry '${relative(root, invalid[0])}'`);
      entries[child.name] = files.length;
      continue;
    }
    const pattern = child.name === "compiler" || child.name === "conformance" ? pinnedTsgoCompilerTestPattern : harnessSourceFilePattern;
    entries[child.name] = files.filter((file) => pattern.test(file)).length;
  }
  for (const suite of classifiedSuites) {
    const collection = requiredFixtureTypeScriptSuites.has(suite) ? requiredFixtureFiles : entries;
    if (!Object.hasOwn(collection, suite)) throw new Error(`Required TypeScript case-root entry '${suite}' is missing`);
  }
  return { entries, requiredFixtureFiles };
}

export async function buildTypeScriptUnitTestInventory(options = {}) {
  const root = resolve(options.root ?? typeScriptUnitTestRoot);
  const entrypoint = resolve(options.entrypoint ?? typeScriptUnitTestEntrypoint);
  if (!existsSync(root) || !existsSync(entrypoint)) throw new Error("TypeScript unit-test mirror sources are missing");
  const allFiles = (await walkFiles(root)).sort(compareUtf8);
  const sourceFiles = allFiles.filter((file) => file.endsWith(".ts"));
  if (sourceFiles.length !== allFiles.length) {
    throw new Error(`Unclassified TypeScript unit-test source entry '${relative(root, allFiles.find((file) => !file.endsWith(".ts")))}'`);
  }
  const sourceFileSet = new Set(sourceFiles.map((file) => resolve(file)));
  const entrypointText = await readSourceText(entrypoint);
  const entrypointSource = ts.createSourceFile(entrypoint, entrypointText, ts.ScriptTarget.Latest, false, ts.ScriptKind.TS);
  if (entrypointSource.parseDiagnostics.length !== 0) throw new Error("TypeScript unit-test entrypoint has parse diagnostics");
  const exportedRoots = [];
  for (const statement of entrypointSource.statements) {
    if (
      !ts.isExportDeclaration(statement)
      || statement.exportClause !== undefined
      || statement.moduleSpecifier === undefined
      || !ts.isStringLiteral(statement.moduleSpecifier)
      || !statement.moduleSpecifier.text.startsWith("./unittests/")
      || !statement.moduleSpecifier.text.endsWith(".js")
    ) {
      throw new Error("TypeScript unit-test entrypoint contains an unclassified statement");
    }
    const exported = resolve(dirname(entrypoint), statement.moduleSpecifier.text.replace(/\.js$/, ".ts"));
    if (!sourceFileSet.has(exported)) throw new Error(`TypeScript unit-test export has no source '${statement.moduleSpecifier.text}'`);
    if (exportedRoots.includes(exported)) throw new Error(`Duplicate TypeScript unit-test export '${statement.moduleSpecifier.text}'`);
    exportedRoots.push(exported);
  }

  const reachable = new Set();
  const pending = [...exportedRoots];
  while (pending.length !== 0) {
    const file = pending.pop();
    if (reachable.has(file)) continue;
    reachable.add(file);
    const preprocessed = ts.preProcessFile(await readSourceText(file), true, true);
    for (const dependency of [...preprocessed.importedFiles, ...preprocessed.referencedFiles]) {
      const resolvedDependency = resolveTypeScriptUnitTestDependency(root, file, dependency.fileName, sourceFileSet);
      if (resolvedDependency !== undefined && !reachable.has(resolvedDependency)) pending.push(resolvedDependency);
    }
  }
  const unclassified = sourceFiles.filter((file) => !reachable.has(resolve(file)));
  if (unclassified.length !== 0) throw new Error(`Unclassified TypeScript unit-test mirror source '${relative(root, unclassified[0])}'`);
  return {
    total: sourceFiles.length,
    inScope: sourceFiles.length,
    outOfScope: 0,
    unclassified: 0,
    entries: {
      exportedModules: exportedRoots.length,
      supportModules: sourceFiles.length - exportedRoots.length,
    },
  };
}

function resolveTypeScriptUnitTestDependency(root, containingFile, specifier, sourceFileSet) {
  if (!specifier.startsWith(".")) return undefined;
  const unresolved = resolve(dirname(containingFile), specifier);
  const relativePath = relative(root, unresolved);
  if (relativePath === ".." || relativePath.startsWith(`..${sep}`) || isAbsolute(relativePath)) return undefined;
  const candidates = [
    unresolved,
    unresolved.replace(/\.js$/, ".ts"),
    `${unresolved}.ts`,
    join(unresolved, "index.ts"),
  ];
  const source = candidates.find((candidate) => sourceFileSet.has(candidate));
  if (source === undefined) throw new Error(`TypeScript unit-test dependency has no classified source '${specifier}' from '${relative(root, containingFile)}'`);
  return source;
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
    entries: Object.fromEntries(Object.entries(counts).sort(([left], [right]) => compareUtf8(left, right))),
  };
}

export async function discoverCases(options) {
  const supportedSuites = supportedSuitesByCorpus.get(options.corpus);
  if (supportedSuites === undefined) {
    throw new Error(`Unsupported corpus '${options.corpus}'.`);
  }
  if (options.suite !== "all" && !supportedSuites.has(options.suite)) {
    throw new Error(`Unsupported suite '${options.suite}' for corpus '${options.corpus}'.`);
  }
  const selectedCaseRoot = caseRootByCorpus.get(options.corpus);
  if (selectedCaseRoot === undefined) {
    throw new Error(`No case root registered for corpus '${options.corpus}'.`);
  }
  const suites = options.suite === "all" ? [...supportedSuites] : [options.suite];
  const caseFiles = [];
  for (const suite of suites) {
    if (options.corpus === "typescript" && suite === "project") {
      caseFiles.push(...await discoverProjectCases(selectedCaseRoot, options));
      continue;
    }
    const suiteRoot = join(selectedCaseRoot, suite);
    for (const file of await walkFiles(suiteRoot)) {
      const followsPinnedCompilerRunner = options.corpus === "typescript" && (suite === "compiler" || suite === "conformance");
      const sourcePattern = followsPinnedCompilerRunner ? pinnedTsgoCompilerTestPattern : harnessSourceFilePattern;
      if (!sourcePattern.test(file)) {
        continue;
      }
      if (!followsPinnedCompilerRunner && isEmittedJavaScriptSibling(file)) {
        continue;
      }
      const { text: sourceText, sha256: sourceSha256 } = await readSourceTextWithHash(file);
      const parsed = parseFileBasedTest(sourceText, file.split(sep).at(-1));
      const configurations = getFileBasedTestConfigurations(parsed.globalOptions);
      const relativePath = relative(selectedCaseRoot, file).split(sep).join("/");
      if (options.filter !== "" && !relativePath.includes(options.filter)) {
        continue;
      }
      for (const configuration of configurations) {
        const testCase = {
          corpus: options.corpus,
          suite,
          sourcePath: file,
          sourceSha256,
          relativePath,
          caseName: relativePath.replace(harnessSourceFilePattern, "").split("/").at(-1),
          sourceBaseName: relativePath.split("/").at(-1),
          configurationName: configuration.name,
          configuration: configuration.settings,
        };
        testCase.expectedSkipReason = plannedSkipReasonForParsedCase(testCase, parsed);
        caseFiles.push(testCase);
      }
    }
  }
  caseFiles.sort((left, right) => compareUtf8(`${left.relativePath}:${left.configurationName}`, `${right.relativePath}:${right.configurationName}`));
  return options.limit > 0 ? caseFiles.slice(0, options.limit) : caseFiles;
}

async function discoverProjectCases(selectedCaseRoot, options) {
  const suiteRoot = join(selectedCaseRoot, "project");
  const cases = [];
  for (const file of await walkFiles(suiteRoot)) {
    if (!/\.json$/i.test(file)) {
      continue;
    }
    const relativePath = relative(selectedCaseRoot, file).split(sep).join("/");
    if (options.filter !== "" && !relativePath.includes(options.filter)) {
      continue;
    }
    const { descriptor, sourceSha256 } = await readProjectTestDescriptorWithHash(file);
    const caseName = relativePath.split("/").at(-1).replace(/\.json$/i, "");
    const sourceProjectRoot = join(typeScriptSubmoduleCaseRoot, projectRootRelativeToCaseRoot(descriptor.projectRoot));
    const projectFixture = projectFixtureProvenance(sourceProjectRoot);
    for (const moduleKind of ["commonjs", "amd"]) {
      const testCase = {
        corpus: options.corpus,
        suite: "project",
        kind: "project",
        sourcePath: file,
        sourceSha256,
        relativePath,
        caseName,
        sourceBaseName: relativePath.split("/").at(-1),
        configurationName: `module=${moduleKind}`,
        configuration: new Map([["module", moduleKind]]),
        descriptor,
        projectFixture,
        moduleKind,
      };
      testCase.expectedSkipReason = plannedSkipReasonForParsedCase(testCase);
      cases.push(testCase);
    }
  }
  return cases;
}

async function readProjectTestDescriptor(file, expectedSha256) {
  return (await readProjectTestDescriptorWithHash(file, expectedSha256)).descriptor;
}

async function readProjectTestDescriptorWithHash(file, expectedSha256) {
  const { text: sourceText, sha256 } = await readSourceTextWithHash(file, expectedSha256);
  try {
    const descriptor = JSON.parse(sourceText);
    assertProjectTestDescriptor(file, descriptor);
    return { descriptor, sourceSha256: sha256 };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Invalid project test descriptor '${file}': ${error.message}`);
    }
    throw error;
  }
}

function assertProjectTestDescriptor(file, descriptor) {
  if (descriptor === null || typeof descriptor !== "object" || Array.isArray(descriptor)) {
    throw new Error("descriptor must be an object");
  }
  if (typeof descriptor.scenario !== "string" || descriptor.scenario === "") {
    throw new Error("descriptor.scenario must be a non-empty string");
  }
  if (typeof descriptor.projectRoot !== "string" || descriptor.projectRoot === "") {
    throw new Error("descriptor.projectRoot must be a non-empty string");
  }
  if (descriptor.inputFiles !== undefined && (!Array.isArray(descriptor.inputFiles) || !descriptor.inputFiles.every((entry) => typeof entry === "string"))) {
    throw new Error("descriptor.inputFiles must be an array of strings when present");
  }
  const projectRoot = projectRootRelativeToCaseRoot(descriptor.projectRoot);
  if (!projectRoot.startsWith("projects/")) {
    throw new Error(`descriptor.projectRoot must point under tests/cases/projects in '${file}'`);
  }
  if (descriptor.project !== undefined && typeof descriptor.project !== "string") {
    throw new Error("descriptor.project must be a string when present");
  }
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

  const flush = (trimTrailingBlankLines = false) => {
    if (currentFileName === "") {
      return;
    }
    if (trimTrailingBlankLines) {
      while (currentFileLines.length !== 0 && currentFileLines.at(-1) === "") {
        currentFileLines.pop();
      }
    }
    units.push({
      fileName: currentFileName,
      content: currentFileLines.join("\n"),
    });
    currentFileLines = [];
  };

  for (const line of lines) {
    const directiveLine = line.replace(/^\uFEFF/, "");
    const linkMatch = /^\/\/\s*@link\s*:\s*([^\r\n]*)\s*->\s*([^\r\n]*)/.exec(directiveLine);
    if (linkMatch !== null) {
      symlinks.set(linkMatch[2].trim(), linkMatch[1].trim());
      continue;
    }
    const optionMatch = /^\/\/\s*@(\w+)\s*:\s*([^\r\n]*)/.exec(directiveLine);
    if (optionMatch !== null) {
      const optionName = optionMatch[1].toLowerCase();
      const optionValue = optionMatch[2].trim().replace(/;$/, "");
      if (optionName === "filename") {
        if (!sawFileDirective && currentFileName === "") {
          currentFileLines = [];
        }
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
    if (line === "" && currentFileLines.length === 0) {
      // test_case_parser.go only writes a separating newline once content exists, which
      // drops every leading blank line of a unit (matching the TS harness behavior).
      continue;
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

export function decodeSourceText(bytes) {
  if (bytes.length >= 2 && bytes[0] === 0xFF && bytes[1] === 0xFE) {
    return utf16LittleEndianDecoder.decode(bytes);
  }
  if (bytes.length >= 2 && bytes[0] === 0xFE && bytes[1] === 0xFF) {
    return utf16BigEndianDecoder.decode(bytes);
  }
  return utf8Decoder.decode(bytes);
}

async function readSourceText(file) {
  return (await readSourceTextWithHash(file)).text;
}

async function readSourceTextWithHash(file, expectedSha256) {
  const bytes = await readFile(file);
  const sha256 = createHash("sha256").update(bytes).digest("hex");
  if (expectedSha256 !== undefined && sha256 !== expectedSha256) {
    throw new Error(`Suite source changed after discovery: ${file}`);
  }
  return { text: decodeSourceText(bytes), sha256 };
}

export function compilerOptionsFromSettings(settings) {
  const compilerOptions = defaultCompilerOptions();
  Object.assign(compilerOptions, explicitCompilerOptionsFromSettings(settings));
  return compilerOptions;
}

function defaultCompilerOptions() {
  return {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
  };
}

function explicitCompilerOptionsFromSettings(settings) {
  const compilerOptions = {};
  const pathOptions = harnessPathOptionsFromSettings(settings);
  for (const [rawName, rawValue] of settings) {
    if (rawName === "filename" || rawName === "currentdirectory" || rawName === "symlink") {
      continue;
    }
    const listName = listOptions.get(rawName);
    if (listName !== undefined) {
      compilerOptions[listName] = rawValue.replace(/;$/, "").split(",").map((entry) => entry.trim()).filter(Boolean).map((entry) =>
        pathListOptions.has(rawName) ? normalizeHarnessOptionPath(entry, pathOptions) : entry
      );
      continue;
    }
    const value = firstConcreteOptionValue(rawValue);
    if (value === undefined) {
      continue;
    }
    const numberName = numberOptions.get(rawName);
    if (numberName !== undefined) {
      const parsed = Number(value);
      if (!Number.isNaN(parsed)) {
        compilerOptions[numberName] = parsed;
      }
      continue;
    }
    if (booleanOptions.has(rawName)) {
      compilerOptions[booleanOptionNames.get(rawName)] = parseBoolean(value);
      continue;
    }
    const stringName = stringOptions.get(rawName);
    if (stringName !== undefined) {
      compilerOptions[stringName] = rawName === "jsximportsource"
        ? normalizeHarnessModuleSpecifier(value, pathOptions)
        : pathStringOptions.has(rawName)
        ? normalizeHarnessOptionPath(value, pathOptions)
        : value;
      continue;
    }
  }

  return compilerOptions;
}

export function compilerOptionsForExistingProjectConfig(config, settings) {
  const normalizedConfig = normalizeEmbeddedProjectConfig(config);
  const compilerOptions = {
    ...defaultCompilerOptions(),
    ...(normalizedConfig.compilerOptions ?? {}),
    ...explicitCompilerOptionsFromSettings(settings),
  };
  return {
    ...normalizedConfig,
    compilerOptions,
  };
}

function normalizeEmbeddedProjectConfig(config) {
  const normalized = { ...config };
  for (const listKey of ["files", "include", "exclude"]) {
    const value = normalized[listKey];
    if (typeof value === "string") {
      normalized[listKey] = [value];
    }
  }
  return normalized;
}

export function compilerOptionsForMaterializedCase(settings, parsed, inputFiles) {
  const compilerOptions = compilerOptionsFromSettings(settings);
  applySafeJavaScriptEmitOutputDirectory(compilerOptions, settings, inputFiles);
  applyVirtualTypeRoots(compilerOptions, settings, parsed);
  applyVirtualRootCommonSourceDirectory(compilerOptions, settings, parsed, inputFiles);
  return compilerOptions;
}

export function compilerCommandLineArgsForMaterializedCase(compilerOptions, inputFiles) {
  const args = ["--ignoreConfig"];
  for (const key of Object.keys(compilerOptions).sort()) {
    const value = compilerOptions[key];
    if (value === undefined) {
      continue;
    }
    args.push(`--${key}`);
    if (value === true) {
      continue;
    }
    if (Array.isArray(value)) {
      args.push(value.join(","));
      continue;
    }
    args.push(String(value));
  }
  args.push("--pretty", "false");
  args.push(...inputFiles);
  return args;
}

export function compilerCommandLineArgsForTranspileInvocation(compilerOptions, inputFile, kind) {
  return compilerCommandLineArgsForMaterializedCase(compilerOptionsForTranspileInvocation(compilerOptions, kind), [inputFile]);
}

export function compilerOptionsForTranspileInvocation(compilerOptions, kind) {
  const transpileOptions = {
    ...compilerOptions,
    noCheck: true,
  };
  delete transpileOptions.noEmit;
  if (kind === "module") {
    delete transpileOptions.declaration;
    delete transpileOptions.declarationMap;
    delete transpileOptions.emitDeclarationOnly;
  } else if (kind === "declaration") {
    transpileOptions.declaration = true;
    transpileOptions.emitDeclarationOnly = true;
    transpileOptions.isolatedDeclarations = true;
  } else {
    throw new Error(`Unsupported transpile invocation kind '${kind}'`);
  }
  return transpileOptions;
}

function applyVirtualTypeRoots(compilerOptions, settings, parsed) {
  if (compilerOptions.typeRoots !== undefined || !settings.has("types")) {
    return;
  }
  const pathOptions = harnessPathOptionsFromSettings(settings);
  const roots = [];
  const seen = new Set();
  const files = parsed.units.map((unit) => normalizeHarnessPath(unit.fileName, pathOptions));
  for (const unit of parsed.units) {
    const filePath = normalizeHarnessPath(unit.fileName, pathOptions);
    const marker = "node_modules/@types/";
    const index = filePath.toLowerCase().indexOf(marker);
    if (index < 0) {
      continue;
    }
    const root = filePath.slice(0, index + marker.length - 1);
    if (!seen.has(root)) {
      seen.add(root);
      roots.push(root);
    }
  }
  if (roots.length !== 0) {
    compilerOptions.typeRoots = roots;
  } else if (!hasMaterializedExplicitTypePackage(compilerOptions.types, files)) {
    compilerOptions.typeRoots = [".empty-types"];
  }
}

function hasMaterializedExplicitTypePackage(typeNames, files) {
  if (!Array.isArray(typeNames)) {
    return false;
  }
  const normalizedFiles = new Set(files.map((file) => file.toLowerCase()));
  for (const typeName of typeNames) {
    const packagePath = `node_modules/${typeName.toLowerCase()}/`;
    if (
      normalizedFiles.has(`${packagePath}package.json`) ||
      normalizedFiles.has(`${packagePath}index.d.ts`) ||
      files.some((file) => file.toLowerCase().startsWith(packagePath))
    ) {
      return true;
    }
  }
  return false;
}

function applySafeJavaScriptEmitOutputDirectory(compilerOptions, settings, inputFiles) {
  if (settings.get("suppressoutputpathcheck")?.toLowerCase() !== "true") {
    return;
  }
  if (compilerOptions.noEmit === true || compilerOptions.emitDeclarationOnly === true) {
    return;
  }
  if (compilerOptions.outDir !== undefined || compilerOptions.outFile !== undefined) {
    return;
  }
  if (inputFiles.some((file) => harnessJavaScriptFilePattern.test(file))) {
    compilerOptions.outDir = ".out";
  }
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
        .sort(([left], [right]) => compareUtf8(left, right))
        .map(([option, value]) => `${option}=${value.toLowerCase()}`)
        .join(",");
      const merged = new Map(nonVaryingOptions);
      for (const [option, value] of varyingSettings) {
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
      excludes.add(optionValueIdentity(option, value.slice(1)));
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
    const identity = optionValueIdentity(option, value);
    if (!excludes.has(identity) && !seen.has(identity)) {
      seen.add(identity);
      deduped.push(value);
    }
  }
  return deduped;
}

function normalizeOptionValue(option, value) {
  return value.trim().replace(/;$/, "");
}

function optionValueIdentity(option, value) {
  const normalizedOption = option.toLowerCase();
  const normalizedValue = normalizeOptionValue(option, value).toLowerCase();
  if ((normalizedOption === "target" || normalizedOption === "module") && (normalizedValue === "es6" || normalizedValue === "es2015")) {
    return `${normalizedOption}:es2015`;
  }
  if (normalizedOption === "moduleresolution" && (normalizedValue === "node" || normalizedValue === "node10")) {
    return `${normalizedOption}:node10`;
  }
  return `${normalizedOption}:${normalizedValue}`;
}

function allOptionValues(option) {
  if (booleanOptions.has(option)) {
    return ["true", "false"];
  }
  if (option === "target") {
    return [
      "es5",
      "es6",
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
      "es2025",
      "esnext",
    ];
  }
  if (option === "module") {
    return [
      "commonjs",
      "amd",
      "umd",
      "system",
      "es6",
      "es2015",
      "es2020",
      "es2022",
      "esnext",
      "node16",
      "node18",
      "node20",
      "nodenext",
      "preserve",
    ];
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

export function baselineHasErrors(testCase) {
  if (testCase.corpus === "typescript" && testCase.suite === "project") {
    return projectBaselineHasErrors(testCase);
  }
  for (const baselineDir of baselineDirectories(testCase)) {
    const expected = baselineDirectoryHasErrors(baselineDir, testCase);
    if (expected !== undefined) {
      return expected;
    }
  }
  return false;
}

const diagnosticHeadlinePattern = /\b(?:error|message) TS-?\d+:/;

function projectBaselineHasErrors(testCase) {
  const moduleFolder = testCase.moduleKind === "amd" ? "amd" : "node";
  const errorsPath = join(typeScriptSubmoduleBaselineRoot, "project", testCase.caseName, moduleFolder, `${testCase.caseName}.errors.txt`);
  if (!existsSync(errorsPath)) {
    return false;
  }
  return diagnosticHeadlinePattern.test(stripAnsiEscapes(readFileSync(errorsPath, "utf8")));
}

function baselineDirectoryHasErrors(baselineDir, testCase) {
  for (const caseName of configuredBaselineCaseNames(testCase)) {
    const directPath = join(baselineDir, `${caseName}.errors.txt`);
    if (existsSync(directPath)) {
      return true;
    }
    const diffPath = `${directPath}.diff`;
    if (existsSync(diffPath)) {
      return errorDiffNewSideHasErrors(diffPath);
    }
  }
  if (!existsSync(baselineDir)) {
    return undefined;
  }
  return undefined;
}

export function errorDiffNewSideHasErrors(diffPath) {
  const text = stripAnsiEscapes(readFileSync(diffPath, "utf8"));
  for (const line of text.split(/\r?\n/)) {
    if (line.startsWith("---") || line.startsWith("+++") || line.startsWith("@@")) {
      const compactHunk = /^@@= skipped -\d+, \+(\d+) lines =@@/.exec(line);
      if (compactHunk !== null && Number(compactHunk[1]) > 0) {
        return true;
      }
      continue;
    }
    if (line === "+<no content>") {
      return false;
    }
    if ((line.startsWith("+") || line.startsWith(" ")) && diagnosticHeadlinePattern.test(line)) {
      return true;
    }
  }
  return false;
}

function stripAnsiEscapes(text) {
  return text.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, "");
}

// True when the reference baselines for this case are pinned TS-Go's own outputs
// (testdata/baselines/reference), gated with the whole-file writers and the
// harness-mirror compile. baseline.Run writes the FULL submodule output to
// reference/submodule/<suite>/<name> for every submodule test; the .diff files beside
// them (and in submoduleAccepted/, submoduleTriaged/) only record the divergence from
// Strada and are not the gate.
function usesTsgoAuthorityBaselines(testCase) {
  if ((testCase.corpus ?? "current") === "current") {
    return true;
  }
  return testCase.corpus === "typescript" && (testCase.suite === "compiler" || testCase.suite === "conformance");
}

function baselineDirectories(testCase) {
  if (testCase.corpus === "typescript") {
    if (usesTsgoAuthorityBaselines(testCase)) {
      return [join(baselineRoot, "submodule", testCase.suite)];
    }
    return [
      join(baselineRoot, "submoduleTriaged", testCase.suite),
      join(baselineRoot, "submoduleAccepted", testCase.suite),
      join(baselineRoot, "submodule", testCase.suite),
      join(typeScriptSubmoduleBaselineRoot, testCase.suite),
      typeScriptSubmoduleBaselineRoot,
    ];
  }
  return [join(baselineRoot, testCase.suite)];
}

const comparableBaselineFilePattern = /\.(?:[cm]?jsx?|d\.[cm]?ts|map)$/i;
const diagnosticBaselineFilePattern = /\.errors\.txt$/i;
const typeSymbolBaselineFilePattern = /\.(?:symbols|types)$/i;
const unsupportedExactBaselineFilePattern = /$^/;
const emittedOutputFilePattern = /\.(?:[cm]?jsx?|d\.[cm]?ts|map|json)$/i;

function exactBaselineArtifacts(testCase) {
  if (testCase.corpus === "typescript" && testCase.suite === "project") {
    return exactProjectBaselineArtifacts(testCase);
  }
  const selected = new Map();
  const baseNames = configuredBaselineCaseNames(testCase);
  const skipDiffArtifacts = usesTsgoAuthorityBaselines(testCase);
  for (const baselineDir of baselineDirectories(testCase)) {
    if (!existsSync(baselineDir)) {
      continue;
    }
    for (const entry of readdirSync(baselineDir, { withFileTypes: true })) {
      if (!entry.isFile()) {
        continue;
      }
      if (skipDiffArtifacts && entry.name.endsWith(".diff")) {
        // Strada-divergence bookkeeping next to the full TS-Go baselines; not a gate.
        continue;
      }
      const artifactName = entry.name.endsWith(".diff") ? entry.name.slice(0, -".diff".length) : entry.name;
      // For TS-Go-authority baselines the writers produce exactly these artifact kinds;
      // a bare prefix match would let a case swallow a sibling case's baselines
      // (asyncFunctionReturnType.ts vs asyncFunctionReturnType.2.ts).
      const matchesCase = skipDiffArtifacts
        ? baseNames.some((baseName) =>
          artifactName.startsWith(`${baseName}.`) &&
          ["js", "js.map", "symbols", "types", "errors.txt"].includes(artifactName.slice(baseName.length + 1)))
        : baseNames.some((baseName) => artifactName.startsWith(`${baseName}.`));
      if (!matchesCase || selected.has(artifactName)) {
        continue;
      }
      selected.set(artifactName, {
        name: artifactName,
        path: join(baselineDir, entry.name),
        diff: entry.name.endsWith(".diff"),
      });
    }
  }
  return [...selected.values()].sort((left, right) => compareUtf8(left.name, right.name));
}

function exactProjectBaselineArtifacts(testCase) {
  const moduleFolder = testCase.moduleKind === "amd" ? "amd" : "node";
  const baselineDir = join(typeScriptSubmoduleBaselineRoot, "project", testCase.caseName, moduleFolder);
  if (!existsSync(baselineDir)) {
    return [];
  }
  return readdirSync(baselineDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.startsWith(`${testCase.caseName}.`))
    .map((entry) => ({
      name: entry.name.endsWith(".diff") ? entry.name.slice(0, -".diff".length) : entry.name,
      path: join(baselineDir, entry.name),
      diff: entry.name.endsWith(".diff"),
    }))
    .sort((left, right) => compareUtf8(left.name, right.name));
}

export function parseBaselineSections(text) {
  const lines = normalizeComparableText(text).split("\n");
  const sections = [];
  let currentName = "";
  let currentLines = [];
  const flush = (trimTrailingBlankLines = false) => {
    if (currentName === "") {
      return;
    }
    if (trimTrailingBlankLines) {
      while (currentLines.length !== 0 && currentLines.at(-1) === "") {
        currentLines.pop();
      }
    }
    sections.push({
      name: currentName,
      content: currentLines.join("\n"),
    });
    currentLines = [];
  };
  for (const line of lines) {
    const marker = /^\/\/\/\/ \[(.*)](?: \/\/\/\/)?$/.exec(line);
    if (marker !== null) {
      const nextName = marker[1];
      flush(nextName === "Diagnostics reported");
      currentName = nextName;
      continue;
    }
    if (currentName !== "") {
      currentLines.push(line);
    }
  }
  flush();
  return sections;
}

// Sentinel a tsgo-accepted overlay uses to declare that pinned TS-Go intentionally emits NO
// output for a section the Strada reference baseline still contains — e.g. a .d.ts/.d.ts.map the
// new pin blocks under --isolatedDeclarations. capture-tsgo-accepted.mjs writes it (after proving
// the section exists in Strada but is absent from real pinned output); applyTsgoAcceptedOverlay
// drops the section from the expected outputs so the gate does not treat the intentional
// non-emission as a missing baseline output.
export const TSGO_ACCEPTED_ABSENT_MARKER = ACCEPTED_OVERLAY_ABSENT_MARKER;

// TS-Go-accepted overlays: where the pinned TS-Go compiler demonstrably diverges from the
// Strada-generated reference baselines, the committed files under tools/tsgo-suite/tsgo-accepted/
// capture pinned TS-Go's actual output for the divergent sections. TSTS mirrors TS-Go, so the
// gate compares against the overlay for exactly those sections and against the Strada baseline
// for everything else. Overlays are generated from real pinned-TS-Go runs by
// capture-tsgo-accepted.mjs — never hand-edited, never derived from TSTS output.
export function loadTsgoAcceptedOverlay(corpus, suite, artifactName) {
  return acceptedOverlaySections(getActiveAcceptedOverlayBinding(), corpus, suite, artifactName);
}

function getActiveAcceptedOverlayBinding() {
  activeAcceptedOverlayBinding ??= loadActiveAcceptedOverlayBinding({
    root: tsgoAcceptedRoot,
    sourcePin: loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot }),
    caseRoot: typeScriptSubmoduleCaseRoot,
    baselineRoot: typeScriptSubmoduleBaselineRoot,
    barebonesLibContent: suiteBarebonesLibContent,
  });
  return activeAcceptedOverlayBinding;
}

export function applyTsgoAcceptedOverlay(artifactName, overlaySections, expectedOutputs, expectedDiagnosticHeadlines, expectedDiagnosticSources) {
  const used = [];
  const problems = [];
  for (const section of overlaySections) {
    if (section.name === "Diagnostics reported") {
      // The overlay carries the COMPLETE diagnostic expectation for the artifact, so it
      // supersedes every 'Diagnostics reported' section the reference baseline declares.
      const indices = [];
      for (let index = 0; index < expectedDiagnosticSources.length; index++) {
        if (expectedDiagnosticSources[index] === `${artifactName}#Diagnostics reported`) {
          indices.push(index);
        }
      }
      if (indices.length === 0) {
        problems.push(`tsgo-accepted overlay '${artifactName}' overrides 'Diagnostics reported' but the reference baseline has no such section.`);
        continue;
      }
      const headline = diagnosticHeadlineText(section.content);
      const baselineHeadline = indices.map((index) => expectedDiagnosticHeadlines[index]).filter((text) => text !== "").join("\n");
      if (baselineHeadline === headline) {
        problems.push(`tsgo-accepted overlay '${artifactName}#Diagnostics reported' matches the reference baseline; remove the stale overlay.`);
        continue;
      }
      expectedDiagnosticHeadlines[indices[0]] = headline;
      expectedDiagnosticSources[indices[0]] = `${artifactName}#Diagnostics reported (tsgo-accepted)`;
      for (const index of indices.slice(1)) {
        expectedDiagnosticHeadlines[index] = "";
        expectedDiagnosticSources[index] = `${artifactName}#Diagnostics reported (tsgo-accepted)`;
      }
      used.push(`${artifactName}#Diagnostics reported`);
      continue;
    }
    const key = normalizedBaselineSectionPath(section.name);
    if (section.content.trim() === TSGO_ACCEPTED_ABSENT_MARKER) {
      // Pinned TS-Go intentionally emits nothing here while Strada still has the section.
      // Drop it from the expected outputs so the intentional non-emission is not flagged as a
      // missing baseline output, and count it as a tsgo-accepted divergence.
      if (!expectedOutputs.has(key)) {
        problems.push(`tsgo-accepted overlay '${artifactName}' marks '${section.name}' absent but the reference baseline has no such emitted output.`);
        continue;
      }
      expectedOutputs.delete(key);
      used.push(`${artifactName}#${section.name} (absent)`);
      continue;
    }
    if (!expectedOutputs.has(key)) {
      problems.push(`tsgo-accepted overlay '${artifactName}' overrides '${section.name}' but the reference baseline has no such emitted output.`);
      continue;
    }
    if (expectedOutputs.get(key) === section.content) {
      problems.push(`tsgo-accepted overlay '${artifactName}#${section.name}' matches the reference baseline; remove the stale overlay.`);
      continue;
    }
    expectedOutputs.set(key, section.content);
    used.push(`${artifactName}#${section.name}`);
  }
  return { used, problems };
}


const emittedSourceExtensionPattern = /\.(?:d\.[cm]?ts|[cm]?[jt]sx?)$/i;

// Strips test-path prefixes the same way tsbaseline/util.go removeTestPathPrefixes does
// (retainTrailingDirectorySeparator=false branch).
export function removeTestPathPrefixes(text) {
  return text
    .replaceAll("/.ts/", "")
    .replaceAll("/.lib/", "")
    .replaceAll("/.src/", "")
    .replaceAll("bundled:///libs/", "")
    .replaceAll("file:///./ts/", "file:///")
    .replaceAll("file:///./lib/", "file:///")
    .replaceAll("file:///./src/", "file:///");
}

// Maps a materialized emitted-output path (relative to the case dir) back to the name the
// upstream baseline writer uses for it. js_emit_baseline.go fileOutput keys each emitted
// file by the emitted file's unit name: basename-only unless @fullEmitPaths.
export function upstreamOutputName(materialized, outputFile) {
  if (materialized.units === undefined) {
    return outputFile;
  }
  if (materialized.fullEmitPaths === true) {
    return normalizedBaselineSectionPath(removeTestPathPrefixes(outputFile));
  }
  return outputFile.split("/").at(-1);
}

// Rewrites materialized file paths in diagnostic output back to the upstream unit-name
// coordinates so headline comparison happens in the upstream coordinate system. Upstream
// compiles with the unit names verbatim (a vfs), so message-embedded paths print exactly
// as authored; on the real filesystem the CLI prints absolute case paths instead.
export function translateDiagnosticPathsToUnitNames(materialized, text) {
  const units = materialized.units;
  if (units === undefined) {
    return text;
  }
  const caseDirPrefix = `${materialized.caseDir.split(sep).join("/")}/`;
  const sourceExtension = /\.(?:d\.[cm]?ts|[cm]?[jt]sx?)$/i;
  const replacements = [];
  for (const unit of units) {
    if (unit.unitName === unit.filePath) {
      continue;
    }
    replacements.push([`${caseDirPrefix}${unit.filePath}`, removeTestPathPrefixes(unit.unitName)]);
    const stem = unit.filePath.replace(sourceExtension, "");
    if (stem !== unit.filePath) {
      replacements.push([`${caseDirPrefix}${stem}`, removeTestPathPrefixes(unit.unitName.replace(sourceExtension, ""))]);
    }
  }
  replacements.sort(([left], [right]) => right.length - left.length);
  let translated = text;
  for (const [from, to] of replacements) {
    translated = translated.replaceAll(from, to);
  }
  translated = translated.replaceAll(caseDirPrefix, "");
  return translated.split("\n").map((line) => {
    for (const unit of units) {
      if (unit.unitName !== unit.filePath && line.startsWith(`${unit.filePath}(`)) {
        return removeTestPathPrefixes(unit.unitName) + line.slice(unit.filePath.length);
      }
    }
    return line;
  }).join("\n");
}

async function evaluateExactBaselines(testCase, materialized, commandOutput) {
  const artifacts = exactBaselineArtifacts(testCase);
  const unsupported = artifacts
    .filter((artifact) => artifact.diff || unsupportedExactBaselineFilePattern.test(artifact.name))
    .map((artifact) => artifact.diff ? `${artifact.name}.diff` : artifact.name);
  const comparable = artifacts.filter((artifact) => !artifact.diff && comparableBaselineFilePattern.test(artifact.name));
  const diagnostics = artifacts.filter((artifact) => !artifact.diff && diagnosticBaselineFilePattern.test(artifact.name));
  const typeSymbol = artifacts.filter((artifact) => !artifact.diff && typeSymbolBaselineFilePattern.test(artifact.name));
  // TS-Go-authority baselines (current corpus testdata and the reference/submodule
  // trees) are whole-file: a single `<case>.js` assembled by js_emit_baseline.go
  // (inputs + emitted JS + emitted DTS) instead of the per-section layout of the
  // Strada-era baselines used by the transpile/project suites.
  const isCurrentCorpus = usesTsgoAuthorityBaselines(testCase);
  const mismatches = [];
  // TS-Go-authority cases compile in an in-memory harness vfs (harnessCompile.mjs):
  // upstream unit coordinates end to end, all-stage diagnostics collected before emit
  // (mirroring compiler_runner.go's verify order), no real-filesystem translation. The
  // CLI invocation on the materialized directory remains the product-behavior signal.
  const usesVfsHarness = isCurrentCorpus && materialized.units !== undefined && materialized.invocation !== undefined;
  let sharedVfsCase;
  const ensureVfsCase = async () => {
    if (sharedVfsCase === undefined) {
      const { compileHarnessCase } = await import("./tsbaseline/harnessCompile.mjs");
      try {
        sharedVfsCase = compileHarnessCase({
          units: (materialized.units ?? []).map((unit) => ({ fileName: unit.unitName, content: unit.content })),
          symlinks: materialized.symlinks ?? new Map(),
          configuration: testCase.configuration ?? new Map(),
        });
      } catch (error) {
        // A failed harness compile must fail THIS case loudly, not kill the runner.
        sharedVfsCase = {
          error,
          harnessOptions: {},
          toBeCompiled: [],
          otherFiles: [],
          diagnostics: [],
          emittedOutputs: new Map(),
        };
        mismatches.push(`Harness compile failed: ${error?.stack?.split("\n").slice(0, 2).join(" | ") ?? error}.`);
      }
    }
    return sharedVfsCase;
  };
  const wholeFileJs = [];
  let sectionComparable = comparable;
  const wholeFileSourceMaps = [];
  if (isCurrentCorpus) {
    sectionComparable = [];
    for (const artifact of comparable) {
      if (/\.js$/i.test(artifact.name)) {
        wholeFileJs.push(artifact);
      } else if (/\.js\.map$/i.test(artifact.name)) {
        wholeFileSourceMaps.push(artifact);
      } else {
        mismatches.push(`Exact baseline artifact '${artifact.name}' is not supported for the current corpus yet.`);
      }
    }
  }
  const expectedDiagnosticHeadlines = [];
  const expectedDiagnosticSources = [];
  if (artifacts.length === 0) {
    // Upstream legitimately writes zero reference baselines when every writer yields no
    // content: baseline.Run treats NoContent as "this baseline file must not exist".
    // That requires zero diagnostics (gated separately below), @noTypesAndSymbols
    // disabling the type/symbol writers (compiler_runner.go verifyTypesAndSymbols), and
    // a compilation that emits nothing (the js/sourcemap writers then produce
    // NoContent). Anything else with zero reference artifacts is a real mismatch.
    const vfsCase = usesVfsHarness ? await ensureVfsCase() : undefined;
    const emitted = vfsCase !== undefined ? vfsCase.emittedOutputs : await emittedOutputsForCase(materialized);
    const noTypesAndSymbols = vfsCase !== undefined
      ? vfsCase.harnessOptions.notypesandsymbols === true
      : materialized.noTypesAndSymbols === true;
    if (!noTypesAndSymbols) {
      mismatches.push("No reference baseline artifacts were found for this case, and type/symbol baselines are enabled (no @noTypesAndSymbols).");
    } else if (emitted.size !== 0) {
      mismatches.push(`No reference baseline artifacts were found for this case, but the compilation emitted ${[...emitted.keys()].sort().join(", ")}.`);
    }
  }
  const expectedOutputs = new Map();
  for (const artifact of sectionComparable) {
    const sections = parseBaselineSections(readFileSync(artifact.path, "utf8"));
    const sectionNameCounts = new Map();
    for (const section of sections) {
      const key = normalizedBaselineSectionPath(section.name);
      sectionNameCounts.set(key, (sectionNameCounts.get(key) ?? 0) + 1);
    }
    const seen = new Map();
    for (const section of sections) {
      if (section.name === "Diagnostics reported") {
        expectedDiagnosticHeadlines.push(diagnosticHeadlineText(section.content));
        expectedDiagnosticSources.push(`${artifact.name}#Diagnostics reported`);
        continue;
      }
      const key = normalizedBaselineSectionPath(section.name);
      const occurrence = (seen.get(key) ?? 0) + 1;
      seen.set(key, occurrence);
      if (!emittedOutputFilePattern.test(key)) {
        continue;
      }
      if (materialized.writtenFileSet.has(key) && (sectionNameCounts.get(key) ?? 0) > 1 && occurrence === sectionNameCounts.get(key)) {
        expectedOutputs.set(key, section.content);
      } else if (!materialized.writtenFileSet.has(key)) {
        expectedOutputs.set(key, section.content);
      }
    }
  }
  for (const artifact of diagnostics) {
    expectedDiagnosticHeadlines.push(diagnosticHeadlineText(readFileSync(artifact.path, "utf8")));
    expectedDiagnosticSources.push(artifact.name);
  }
  const tsgoAccepted = [];
  for (const artifact of [...sectionComparable, ...diagnostics]) {
    const overlaySections = loadTsgoAcceptedOverlay(testCase.corpus, testCase.suite, artifact.name);
    if (overlaySections === undefined) {
      continue;
    }
    const { used, problems } = applyTsgoAcceptedOverlay(artifact.name, overlaySections, expectedOutputs, expectedDiagnosticHeadlines, expectedDiagnosticSources);
    tsgoAccepted.push(...used);
    mismatches.push(...problems);
  }
  const baselineHeader = `tests/cases/${testCase.relativePath}`;
  // The reference baselines are HARNESS output: harnessutil.go collects every
  // diagnostics stage unconditionally (program, syntactic, SEMANTIC, global,
  // declaration) and then emits, while the CLI's staged pipeline skips the semantic
  // check when an earlier stage reported — and declaration-emit node reuse depends on
  // the links that check populates. Diagnostics for the errors.txt comparison come from
  // the vfs harness compile, already rendered in upstream coordinates.
  let actualDiagnostics = translateDiagnosticPathsToUnitNames(materialized, diagnosticHeadlineText(commandOutput));
  let harnessDiagnostics;
  if (usesVfsHarness) {
    const vfsCase = await ensureVfsCase();
    harnessDiagnostics = vfsCase.diagnostics;
    const { formatHarnessDiagnostics } = await import("./tsbaseline/typeSymbolWalker.mjs");
    const tristateTruePretty = 2;
    actualDiagnostics = diagnosticHeadlineText(formatHarnessDiagnostics("", harnessDiagnostics, vfsCase.compilerOptions?.Pretty === tristateTruePretty));
  }
  const expectedDiagnostics = expectedDiagnosticHeadlines.filter((text) => text !== "").join("\n");
  const expectedPrePostEmitDiagnostic = expectedDiagnosticHeadlines.some((text) => (
    /(?:^|\n)error TS-1: Pre-emit \(\d+\) and post-emit \(\d+\) diagnostic counts do not match!/.test(text)
  ));
  if (expectedDiagnosticSources.length !== 0 && expectedDiagnostics !== actualDiagnostics) {
    mismatches.push(`Diagnostic headline baseline '${expectedDiagnosticSources.join(", ")}' does not match actual compiler diagnostics.`);
    const diagnosticArtifactName = diagnostics[0]?.name ?? "diagnostics.errors.txt";
    await writeFile(join(materialized.caseDir, `${diagnosticArtifactName}.actual`), actualDiagnostics);
  } else if (expectedDiagnosticSources.length === 0 && actualDiagnostics !== "") {
    mismatches.push("Unexpected compiler diagnostics with no reference diagnostic baseline.");
    await writeFile(join(materialized.caseDir, "diagnostics.errors.txt.actual"), actualDiagnostics);
  }

  // compiler_runner.go passes hasErrorBaseline = len(result.Diagnostics) > 0, where
  // result.Diagnostics is the harness compile's all-stage diagnostics.
  const hasDiagnostics = harnessDiagnostics !== undefined ? harnessDiagnostics.length > 0 : diagnosticHeadlineText(commandOutput) !== "";
  if (typeSymbol.length !== 0 && materialized.noTypesAndSymbols === true) {
    // compiler_runner.go verifyTypesAndSymbols returns early under @noTypesAndSymbols,
    // so a committed type/symbol reference baseline is unreachable upstream: stale.
    mismatches.push(`Type/symbol baselines exist but @noTypesAndSymbols disables them upstream: ${typeSymbol.map((artifact) => artifact.name).join(", ")}.`);
  } else if (typeSymbol.length !== 0) {
    if (!usesVfsHarness) {
      mismatches.push(`Type/symbol baselines are not supported for this case kind: ${typeSymbol.map((artifact) => artifact.name).join(", ")}.`);
    } else {
      try {
        const { generateTypeAndSymbolBaselines } = await import("./tsbaseline/typeSymbolWalker.mjs");
        const vfsCase = await ensureVfsCase();
        const allFiles = [...vfsCase.toBeCompiled, ...vfsCase.otherFiles].map((file) => ({
          unitName: file.unitName,
          programPath: file.unitName,
          content: file.content,
        }));
        const generated = generateTypeAndSymbolBaselines({
          allFiles,
          header: baselineHeader,
          hasErrorBaseline: hasDiagnostics,
          program: vfsCase.program,
        });
        for (const artifact of typeSymbol) {
          const expected = normalizeEmittedOutputText(readFileSync(artifact.path, "utf8"));
          const actual = normalizeEmittedOutputText(artifact.name.endsWith(".symbols") ? generated.symbols : generated.types);
          if (actual !== expected) {
            mismatches.push(`Type/symbol baseline '${artifact.name}' does not match the generated baseline.`);
            // Mirror upstream baseline.Run, which writes the actual ("local") baseline on
            // every difference so it can be diffed against the reference.
            await writeFile(join(materialized.caseDir, `${artifact.name}.actual`), actual);
          }
        }
      } catch (error) {
        throw baselineInfrastructureFailure("Type/symbol", error);
      }
    }
  }

  if (wholeFileJs.length !== 0) {
    if (!usesVfsHarness) {
      mismatches.push(`JS emit baselines are not supported for this case kind: ${wholeFileJs.map((artifact) => artifact.name).join(", ")}.`);
    } else {
      try {
        const { generateJsEmitBaseline } = await import("./tsbaseline/jsEmitBaseline.mjs");
        const { compileDeclarationFiles, repeatWithNoCheck } = await import("./tsbaseline/harnessCompile.mjs");
        const vfsCase = await ensureVfsCase();
        const declarationCompilation = vfsCase.error === undefined ? await compileDeclarationFiles(vfsCase) : undefined;
        // js_emit_baseline.go: rerun with noCheck unless the case sets noCheck/noEmit.
        const tristateTrue = 2;
        const noCheckRepeat = vfsCase.error === undefined &&
          vfsCase.compilerOptions.NoCheck !== tristateTrue &&
          vfsCase.compilerOptions.NoEmit !== tristateTrue
          ? repeatWithNoCheck(vfsCase)
          : undefined;
        const assembled = generateJsEmitBaseline({
          program: vfsCase.program,
          toBeCompiled: vfsCase.toBeCompiled,
          otherFiles: vfsCase.otherFiles,
          tsConfigFiles: vfsCase.tsConfigFiles,
          header: baselineHeader,
          hasDiagnostics,
          fullEmitPaths: vfsCase.harnessOptions.fullemitpaths === true,
          emittedOutputs: vfsCase.emittedOutputs,
          declarationCompilation,
          noCheckRepeat,
        });
        const actual = normalizeEmittedOutputText(assembled);
        for (const artifact of wholeFileJs) {
          const expected = normalizeEmittedOutputText(readFileSync(artifact.path, "utf8"));
          if (actual !== expected) {
            mismatches.push(`JS emit baseline '${artifact.name}' does not match the assembled baseline.`);
            await writeFile(join(materialized.caseDir, `${artifact.name}.actual`), actual);
          }
        }
      } catch (error) {
        throw baselineInfrastructureFailure("JS emit", error);
      }
    }
  }

  if (wholeFileSourceMaps.length !== 0) {
    if (!usesVfsHarness) {
      mismatches.push(`Source map baselines are not supported for this case kind: ${wholeFileSourceMaps.map((artifact) => artifact.name).join(", ")}.`);
    } else {
      try {
        const { generateSourceMapBaseline } = await import("./tsbaseline/sourceMapBaseline.mjs");
        const vfsCase = await ensureVfsCase();
        const assembled = generateSourceMapBaseline({
          program: vfsCase.program,
          compilerOptions: vfsCase.compilerOptions,
          hasDiagnostics,
          fullEmitPaths: vfsCase.harnessOptions.fullemitpaths === true,
          emittedOutputs: vfsCase.emittedOutputs,
        });
        for (const artifact of wholeFileSourceMaps) {
          if (assembled === undefined) {
            mismatches.push(`Source map baseline '${artifact.name}' exists but the compilation produces no source map baseline.`);
            continue;
          }
          const expected = normalizeEmittedOutputText(readFileSync(artifact.path, "utf8"));
          const actual = normalizeEmittedOutputText(assembled);
          if (actual !== expected) {
            mismatches.push(`Source map baseline '${artifact.name}' does not match the assembled baseline.`);
            await writeFile(join(materialized.caseDir, `${artifact.name}.actual`), actual);
          }
        }
      } catch (error) {
        throw baselineInfrastructureFailure("Source map", error);
      }
    }
  }


  if (!isCurrentCorpus) {
    const actualOutputsRaw = await emittedOutputsForCase(materialized);
    const actualOutputs = new Map();
    for (const [outputFile, content] of actualOutputsRaw) {
      actualOutputs.set(upstreamOutputName(materialized, outputFile), content);
    }
    for (const [outputFile, actualContent] of actualOutputs) {
      const expected = expectedOutputs.get(outputFile);
      if (expected === undefined) {
        mismatches.push(`Unexpected emitted output '${outputFile}'.`);
        continue;
      }
      if (normalizeEmittedOutputText(actualContent) !== normalizeEmittedOutputText(expected)) {
        mismatches.push(`Emitted output '${outputFile}' does not match its reference baseline section.`);
      }
    }
    for (const outputFile of expectedOutputs.keys()) {
      if (!actualOutputs.has(outputFile)) {
        mismatches.push(`Expected baseline output '${outputFile}' was not emitted.`);
      }
    }
  }
  if (unsupported.length !== 0) {
    mismatches.push(`Unsupported exact baseline artifact(s): ${unsupported.join(", ")}.`);
  }
  return {
    checked: artifacts.length,
    comparable: comparable.length + diagnostics.length + typeSymbol.length,
    unsupported,
    tsgoAccepted,
    mismatches,
    status: mismatches.length === 0 ? "pass" : "fail",
    // Whether the post-overlay reference baseline expects any diagnostics. In exact mode this is
    // the authoritative "expectedErrors" for transpile cases, whose diagnostics live in the
    // baseline's 'Diagnostics reported' section (with tsgo-accepted overlays applied), not a
    // separate .errors.txt.
    expectedDiagnosticsPresent: expectedDiagnosticHeadlines.some((headline) => headline.trim() !== ""),
    // For the harness-only fast path: actualErrors derived from the harness compile's all-stage
    // diagnostics (compiler_runner.go uses len(result.Diagnostics) > 0). usedHarness tells the
    // caller this case was fully evaluated in-process (no on-disk CLI compile needed for the
    // verdict). harnessEmitted is the in-memory emit, used by --verify-on-disk to prove the
    // on-disk CLI emit matches.
    actualErrors: usesVfsHarness ? hasDiagnostics : undefined,
    usedHarness: usesVfsHarness,
    harnessEmitted: sharedVfsCase?.emittedOutputs,
    // TS-Go's harness deliberately emits TS-1 when pre-emit and post-emit diagnostic
    // counts differ. The staged CLI has no equivalent diagnostic channel, so retain
    // this exact upstream distinction for --verify-on-disk instead of classifying it
    // as an unexplained product/harness divergence.
    expectedPrePostEmitDiagnostic,
  };
}

function baselineInfrastructureFailure(kind, error) {
  const detail = error instanceof Error ? error.stack ?? error.message : String(error);
  return new Error(`${kind} baseline generation failed:\n${detail}`);
}

export function diagnosticHeadlineText(text) {
  const lines = stripAnsiEscapes(normalizeComparableText(text)).split("\n");
  const headlines = [];
  for (const line of lines) {
    if (line.trim() === "") {
      if (headlines.length !== 0) {
        break;
      }
      continue;
    }
    if (diagnosticHeadlinePattern.test(line)) {
      headlines.push(line);
    }
  }
  return headlines.join("\n");
}

// Classifies a case-dir-relative path as a compiler-emitted output (vs a materialized
// input). Returns the normalized relative path, or undefined for inputs. Shared by the
// output collector and the in-process Program's FS filter so both agree exactly on what
// "emitted" means.
function emittedOutputRelativePath(materialized, relativeFile) {
  const normalized = normalizedBaselineSectionPath(relativeFile);
  if (!emittedOutputFilePattern.test(normalized)) {
    return undefined;
  }
  if (materialized.writtenFileSet.has(normalized)) {
    return undefined;
  }
  if (normalized.startsWith(".lib/") || normalized.startsWith(".ts/") || normalized.startsWith(".empty-types/")) {
    return undefined;
  }
  return normalized;
}

async function emittedOutputsForCase(materialized) {
  const outputs = new Map();
  for (const file of await walkFiles(materialized.caseDir)) {
    const relativeFile = relative(materialized.caseDir, file).split(sep).join("/");
    const normalized = emittedOutputRelativePath(materialized, relativeFile);
    if (normalized === undefined) {
      continue;
    }
    // Keep raw bytes: every textual comparison normalizes newlines itself, and the
    // source-map preview links base64 the EXACT emitted file contents (CRLF included).
    outputs.set(normalized, translateEmittedContentToUnitCoordinates(materialized, await readFile(file, "utf8"), normalized));
  }
  return outputs;
}

// Inverse of the materializer's source-content rewrites: the compiler copies rewritten
// fragments (triple-slash reference paths, module specifiers, /.lib/ references)
// verbatim into emitted outputs, while upstream compiles the unrewritten units in a vfs
// and emits the original fragments. Replay the recorded pairs in reverse so emitted
// outputs compare in upstream unit coordinates.
function translateEmittedContentToUnitCoordinates(materialized, content, outputFile = "") {
  let translated = content;
  if (materialized.units !== undefined) {
    const caseDirPrefix = `${materialized.caseDir.split(sep).join("/")}/`;
    const sourceExtension = /\.(?:d\.[cm]?ts|[cm]?[jt]sx?|json)$/i;
    const replacements = [];
    for (const unit of materialized.units) {
      const unitName = removeTestPathPrefixes(unit.unitName).replaceAll("\\", "/").replace(/^(?:\.\/)+/, "");
      const filePath = normalizedBaselineSectionPath(unit.filePath);
      replacements.push([`${caseDirPrefix}${filePath}`, unitName]);
      const fileStem = filePath.replace(sourceExtension, "");
      const unitStem = unitName.replace(sourceExtension, "");
      if (fileStem !== filePath) {
        replacements.push([`${caseDirPrefix}${fileStem}`, unitStem]);
      }
    }
    replacements.sort(([left], [right]) => right.length - left.length);
    for (const [from, to] of replacements) {
      translated = translated.replaceAll(from, to);
    }
    translated = translated.replaceAll(caseDirPrefix, "");
  }
  for (const [from, to] of materialized.contentRewrites ?? []) {
    translated = translated.replaceAll(from, to);
  }
  translated = translateSourceMapContentToUnitCoordinates(materialized, outputFile, translated);
  return translated;
}

function translateSourceMapContentToUnitCoordinates(materialized, outputFile, content) {
  if (!/\.map$/i.test(outputFile) || materialized.pathOptions?.useCaseSensitiveFileNames !== false || materialized.units === undefined) {
    return content;
  }
  try {
    const map = JSON.parse(content);
    if (!Array.isArray(map.sources)) {
      return content;
    }
    const outputDirectory = posixPath.dirname(outputFile);
    const units = materialized.units.map((unit) => ({
      filePath: normalizedBaselineSectionPath(unit.filePath),
      unitName: removeTestPathPrefixes(unit.unitName).replaceAll("\\", "/"),
    }));
    const sources = map.sources.map((source) => {
      if (typeof source !== "string" || source === "" || /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(source)) {
        return source;
      }
      const resolved = normalizedBaselineSectionPath(posixPath.normalize(posixPath.join(outputDirectory, source)));
      const unit = units.find((candidate) => candidate.filePath.toLowerCase() === resolved.toLowerCase());
      return unit === undefined ? source : posixPath.basename(unit.unitName);
    });
    return `${JSON.stringify({ ...map, sources })}`;
  } catch {
    return content;
  }
}

function recordOptionContentRewrites(settings, pathOptions, contentRewrites) {
  const jsxImportSource = settings.get("jsximportsource");
  if (jsxImportSource !== undefined && isHarnessAbsolutePath(jsxImportSource)) {
    const rewritten = normalizeHarnessModuleSpecifier(jsxImportSource, pathOptions);
    const original = jsxImportSource.replace(/\/+$/, "");
    if (rewritten !== original) {
      contentRewrites.push([`${rewritten}/`, `${original}/`]);
    }
  }
}

function dedupedContentRewrites(contentRewrites) {
  const seen = new Set();
  const deduped = [];
  for (const pair of contentRewrites) {
    const key = JSON.stringify(pair);
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(pair);
    }
  }
  // Longest rewritten fragment first so a shorter pair can never clip a longer one.
  return deduped.sort(([left], [right]) => right.length - left.length);
}

function normalizedBaselineSectionPath(fileName) {
  return fileName.replaceAll("\\", "/").replace(/^\/+/, "").replace(/^(?:\.\/)+/, "");
}

function normalizeComparableText(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function normalizeEmittedOutputText(text) {
  return normalizeComparableText(text).replace(/\n$/, "");
}

function configuredCaseName(testCase) {
  return testCase.configurationName === "" ? testCase.caseName : `${testCase.caseName}(${testCase.configurationName})`;
}

function configuredBaselineCaseNames(testCase) {
  if (testCase.configurationName === "") {
    return [testCase.caseName];
  }
  const names = [configuredCaseName(testCase)];
  const canonical = testCase.configurationName
    .split(",")
    .map((entry) => {
      const [option, ...valueParts] = entry.split("=");
      const value = valueParts.join("=");
      const displayName = compilerOptionDisplayName(option);
      return displayName === undefined ? entry : `${displayName}=${value}`;
    })
    .join(",");
  const canonicalName = `${testCase.caseName}(${canonical})`;
  if (!names.includes(canonicalName)) {
    names.push(canonicalName);
  }
  return names;
}

function compilerOptionDisplayName(option) {
  return booleanOptionNames.get(option) ?? stringOptions.get(option) ?? listOptions.get(option) ?? numberOptions.get(option);
}

async function materializeCase(testCase, runRoot) {
  if (testCase.kind === "project") {
    return materializeProjectCase(testCase, runRoot);
  }

  const sourceText = (await readSourceTextWithHash(testCase.sourcePath, testCase.sourceSha256)).text;
  const parsed = parseFileBasedTest(sourceText, testCase.relativePath.split("/").at(-1));
  const pathOptions = harnessPathOptionsFromSettings(testCase.configuration);
  const caseDir = join(runRoot, caseDirectoryFragment(testCase));
  await mkdir(caseDir, { recursive: true });
  if (isTranspileCase(testCase)) {
    return materializeTranspileCaseInputs({ caseDir, parsed, configuration: testCase.configuration, pathOptions });
  }

  const needsLibFolder = parsed.units.some((unit) => unit.content.includes("/.lib/")) || parsed.globalOptions.has("libfiles");
  if (needsLibFolder) await cp(testLibRoot, join(caseDir, ".lib"), { recursive: true, force: true });

  const unitRecords = parsed.units.map((unit) => ({
    unit,
    filePath: normalizeHarnessPath(unit.fileName, pathOptions),
  }));
  const writtenFiles = unitRecords.map((record) => record.filePath);
  const contentRewrites = [];
  recordOptionContentRewrites(testCase.configuration, pathOptions, contentRewrites);
  if (!hasRootPackageJson(writtenFiles)) {
    writtenFiles.push("package.json");
  }

  const units = parsed.units.map((unit) => ({
    unitName: unit.fileName,
    filePath: normalizeHarnessPath(unit.fileName, pathOptions),
    // Upstream TestFile.Content is the unit text as authored; the baseline writers
    // interleave it verbatim. (The materialized on-disk copy may have rewritten
    // harness-virtual paths for the real filesystem.)
    content: unit.content,
  }));
  const fullEmitPaths = (parsed.globalOptions?.get("fullemitpaths") ?? testCase.configuration?.get?.("fullemitpaths")) === "true";
  // Harness-only option: compiler_runner.go verifyTypesAndSymbols returns early under
  // @noTypesAndSymbols, so upstream writes no type/symbol baselines for such cases.
  const noTypesAndSymbols = (parsed.globalOptions?.get("notypesandsymbols") ?? testCase.configuration?.get?.("notypesandsymbols")) === "true";
  // compiler_runner.go: `configuration["noimplicitreferences"] != ""` switches the
  // baseline partition to last-unit-only.
  const noImplicitReferencesValue = parsed.globalOptions?.get("noimplicitreferences") ?? testCase.configuration?.get?.("noimplicitreferences");
  const noImplicitReferences = noImplicitReferencesValue !== undefined && noImplicitReferencesValue !== "";
  const existingConfig = writtenFiles.find((file) => /(^|\/)tsconfig\.json$/i.test(file));
  if (existingConfig !== undefined) {
    await writeUnitRecords(caseDir, unitRecords, pathOptions, contentRewrites);
    await materializeHarnessApiDeclarations(caseDir, parsed, pathOptions);
    if (!hasRootPackageJson(unitRecords.map((record) => record.filePath))) {
      await writeFile(join(caseDir, "package.json"), "{}\n");
    }
    await materializeSymlinks(caseDir, parsed.symlinks, pathOptions);
    const merged = await mergeFileBasedOptionsIntoProjectConfig(join(caseDir, existingConfig), testCase.configuration);
    const compilerOptions = merged.config?.compilerOptions ?? {};
    // SkipUnsupportedCompilerOptions runs on the EFFECTIVE options, so follow the
    // config's `extends` chain (parents merged under the child) for the skip decision.
    const inheritedOptions = merged.config === undefined ? {} : await inheritedConfigCompilerOptions(join(caseDir, existingConfig), merged.config);
    const skipReason = getSkipReasonFromCompilerOptions(testCase.sourceBaseName, { ...inheritedOptions, ...compilerOptions });
    return {
      caseDir,
      invocation: {
        cwd: caseDir,
        args: ["-p", join(caseDir, existingConfig), "--pretty", "false"],
      },
      units,
      symlinks: parsed.symlinks,
      pathOptions,
      fullEmitPaths,
      noTypesAndSymbols,
      noImplicitReferences,
      hasTsconfigUnit: true,
      contentRewrites: dedupedContentRewrites(contentRewrites),
      writtenFiles,
      writtenFileSet: normalizedWrittenFileSet(writtenFiles),
      expectedErrors: merged.parsedByTypescript ? caseExpectedErrors(testCase, compilerOptions) : false,
      skipReason,
    };
  }

  const inputFiles = selectInputFiles(parsed, writtenFiles, testCase.configuration);
  const compilerOptions = compilerOptionsForMaterializedCase(testCase.configuration, parsed, inputFiles);
  if (needsLibFolder) {
    compilerOptions.skipLibCheck = true;
  }
  await writeUnitRecords(caseDir, materializedUnitWriteOrder(unitRecords, inputFiles), pathOptions, contentRewrites);
  await materializeHarnessApiDeclarations(caseDir, parsed, pathOptions);
  if (!hasRootPackageJson(unitRecords.map((record) => record.filePath))) {
    await writeFile(join(caseDir, "package.json"), "{}\n");
  }
  await materializeSymlinks(caseDir, parsed.symlinks, pathOptions);
  await materializeSyntheticCompilerOptionRoots(caseDir, compilerOptions);
  const skipReason = getSkipReasonFromCompilerOptions(testCase.sourceBaseName, compilerOptions);
  return {
    caseDir,
    invocation: {
      cwd: caseDir,
      args: compilerCommandLineArgsForMaterializedCase(compilerOptions, inputFiles),
    },
    // Parsed unit order; the baseline writers partition into toBeCompiled/otherFiles
    // (membership in the parsed command line's root files, unit order preserved) the
    // same way compiler_runner.go does.
    units,
    symlinks: parsed.symlinks,
    pathOptions,
    fullEmitPaths,
    noTypesAndSymbols,
    noImplicitReferences,
    hasTsconfigUnit: false,
    contentRewrites: dedupedContentRewrites(contentRewrites),
    writtenFiles,
    writtenFileSet: normalizedWrittenFileSet(writtenFiles),
    expectedErrors: caseExpectedErrors(testCase, compilerOptions),
    skipReason,
  };
}

export async function materializeTranspileCaseInputs({ caseDir, parsed, configuration, pathOptions = harnessPathOptionsFromSettings(configuration) }) {
  await mkdir(caseDir, { recursive: true });
  const needsLibFolder = parsed.units.some((unit) => unit.content.includes("/.lib/")) || parsed.globalOptions.has("libfiles");
  if (needsLibFolder) await cp(testLibRoot, join(caseDir, ".lib"), { recursive: true, force: true });
  const unitRecords = parsed.units.map((unit) => ({ unit, filePath: normalizeHarnessPath(unit.fileName, pathOptions) }));
  const writtenFiles = unitRecords.map((record) => record.filePath);
  const contentRewrites = [];
  recordOptionContentRewrites(configuration, pathOptions, contentRewrites);
  if (!hasRootPackageJson(writtenFiles)) writtenFiles.push("package.json");
  await writeUnitRecords(caseDir, materializedUnitWriteOrder(unitRecords, []), pathOptions, contentRewrites);
  await materializeHarnessApiDeclarations(caseDir, parsed, pathOptions);
  if (!hasRootPackageJson(unitRecords.map((record) => record.filePath))) await writeFile(join(caseDir, "package.json"), "{}\n");
  await materializeSymlinks(caseDir, parsed.symlinks, pathOptions);
  const compilerOptions = compilerOptionsForMaterializedCase(configuration, parsed, writtenFiles);
  return {
    caseDir,
    invocations: transpileInvocationsForMaterializedCase(compilerOptions, parsed, pathOptions, configuration),
    pathOptions,
    writtenFiles,
    writtenFileSet: normalizedWrittenFileSet(writtenFiles),
    expectedErrors: false,
    skipReason: "",
    transpile: true,
  };
}

async function writeUnitRecords(caseDir, unitRecords, pathOptions, contentRewrites) {
  for (const { unit, filePath } of unitRecords) {
    const fullPath = join(caseDir, filePath);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, rewriteHarnessFileContent(unit.content, filePath, pathOptions, contentRewrites));
  }
}

function materializedUnitWriteOrder(unitRecords, inputFiles) {
  const sourceRecords = unitRecords.filter((record) => harnessSourceFilePattern.test(record.filePath));
  const lastSourceRecord = sourceRecords.at(-1);
  if (lastSourceRecord !== undefined && inputFiles.length === 1 && inputFiles[0] === lastSourceRecord.filePath) {
    return [lastSourceRecord, ...unitRecords.filter((record) => record !== lastSourceRecord)];
  }
  return unitRecords;
}

async function materializeProjectCase(testCase, runRoot) {
  const descriptor = testCase.descriptor ?? await readProjectTestDescriptor(testCase.sourcePath, testCase.sourceSha256);
  const projectRoot = projectRootRelativeToCaseRoot(descriptor.projectRoot);
  const sourceProjectRoot = join(typeScriptSubmoduleCaseRoot, projectRoot);

  const caseDir = join(runRoot, caseDirectoryFragment(testCase));
  const materializedCaseRoot = join(caseDir, "tests/cases");
  const materializedProjectRoot = join(materializedCaseRoot, projectRoot);
  await mkdir(materializedProjectRoot, { recursive: true });
  const sourceProvenance = projectFixtureProvenance(sourceProjectRoot);
  if (canonicalJson(sourceProvenance) !== canonicalJson(testCase.projectFixture)) {
    throw new Error(`Project fixture changed after discovery: ${sourceProjectRoot}`);
  }
  if (existsSync(sourceProjectRoot)) {
    await cp(sourceProjectRoot, materializedProjectRoot, { recursive: true, force: true });
    const copiedProvenance = projectFixtureProvenance(materializedProjectRoot);
    if (canonicalJson(copiedProvenance) !== canonicalJson(testCase.projectFixture)) {
      throw new Error(`Project fixture changed while it was copied: ${sourceProjectRoot}`);
    }
  }
  await writeFile(join(caseDir, "package.json"), "{}\n");

  const compilerOptions = compilerOptionsForProjectDescriptor(descriptor, testCase.moduleKind, caseDir);
  const invocation = projectInvocationForDescriptor(descriptor, compilerOptions, materializedProjectRoot);
  const writtenFiles = (await walkFiles(materializedProjectRoot)).map((file) => relative(materializedProjectRoot, file).split(sep).join("/"));
  return {
    caseDir,
    invocation,
    writtenFiles,
    writtenFileSet: normalizedWrittenFileSet(writtenFiles),
    expectedErrors: caseExpectedErrors(testCase, compilerOptions),
    skipReason: getSkipReasonFromCompilerOptions(testCase.sourceBaseName, compilerOptions),
  };
}

function projectFixtureProvenance(root) {
  if (!existsSync(root)) return { kind: "absent" };
  return hashInputRoots([{ label: "project-fixture", path: root }]).roots[0];
}

function normalizedWrittenFileSet(writtenFiles) {
  return new Set(writtenFiles.map((file) => normalizedBaselineSectionPath(file)));
}

function projectRootRelativeToCaseRoot(projectRoot) {
  return normalizeProjectDescriptorPath(projectRoot).replace(/^tests\/cases\//, "");
}

function normalizeProjectDescriptorPath(path) {
  const normalized = posixPath.normalize(path.replaceAll("\\", "/").replace(/^\/+/, "").replace(/\/+$/, ""));
  if (normalized === "" || normalized === "." || normalized === ".." || normalized.startsWith("../")) {
    throw new Error(`Project descriptor path is not contained in the case root: '${path}'`);
  }
  return normalized;
}

export function compilerOptionsForProjectDescriptor(descriptor, moduleKind, caseDir = "") {
  const compilerOptions = {
    noErrorTruncation: false,
    skipDefaultLibCheck: false,
    moduleResolution: "classic",
    module: moduleKind,
    newLine: "crlf",
  };
  const projectMetaKeys = new Set([
    "scenario",
    "projectRoot",
    "inputFiles",
    "resolveMapRoot",
    "resolveSourceRoot",
    "baselineCheck",
    "runTest",
    "bug",
    "project",
    "emittedFiles",
  ]);
  for (const [rawName, rawValue] of Object.entries(descriptor)) {
    const name = rawName.toLowerCase();
    if (projectMetaKeys.has(rawName)) {
      continue;
    }
    if (rawName === "mapRoot") {
      compilerOptions.mapRoot = descriptor.resolveMapRoot === true && typeof rawValue === "string"
        ? join(caseDir, normalizeProjectDescriptorPath(rawValue))
        : rawValue;
      continue;
    }
    if (rawName === "sourceRoot") {
      compilerOptions.sourceRoot = descriptor.resolveSourceRoot === true && typeof rawValue === "string"
        ? join(caseDir, normalizeProjectDescriptorPath(rawValue))
        : rawValue;
      continue;
    }
    const optionName = compilerOptionNameFromJsonKey(name);
    if (optionName === undefined) {
      continue;
    }
    compilerOptions[optionName] = rawValue;
  }
  return compilerOptions;
}

function compilerOptionNameFromJsonKey(name) {
  if (booleanOptions.has(name)) {
    return booleanOptionNames.get(name);
  }
  return stringOptions.get(name) ?? numberOptions.get(name) ?? listOptions.get(name);
}

function projectInvocationForDescriptor(descriptor, compilerOptions, materializedProjectRoot) {
  if (typeof descriptor.project === "string" && descriptor.project !== "") {
    return {
      cwd: materializedProjectRoot,
      args: [
        "-p",
        join(materializedProjectRoot, descriptor.project, "tsconfig.json"),
        ...compilerCommandLineArgsForProjectOptions(compilerOptions),
        "--pretty",
        "false",
      ],
    };
  }

  if (Array.isArray(descriptor.inputFiles) && descriptor.inputFiles.length !== 0) {
    return {
      cwd: materializedProjectRoot,
      args: [
        "--ignoreConfig",
        ...compilerCommandLineArgsForProjectOptions(compilerOptions),
        "--pretty",
        "false",
        ...descriptor.inputFiles,
      ],
    };
  }

  return {
    cwd: materializedProjectRoot,
    args: [
      "-p",
      join(materializedProjectRoot, "tsconfig.json"),
      ...compilerCommandLineArgsForProjectOptions(compilerOptions),
      "--pretty",
      "false",
    ],
  };
}

function compilerCommandLineArgsForProjectOptions(compilerOptions) {
  const args = [];
  for (const key of Object.keys(compilerOptions).sort()) {
    const value = compilerOptions[key];
    if (value === undefined) {
      continue;
    }
    args.push(`--${key}`);
    if (value === true) {
      continue;
    }
    if (Array.isArray(value)) {
      args.push(value.join(","));
      continue;
    }
    args.push(String(value));
  }
  return args;
}

async function materializeSyntheticCompilerOptionRoots(caseDir, compilerOptions) {
  if (Array.isArray(compilerOptions.typeRoots) && compilerOptions.typeRoots.includes(".empty-types")) {
    await mkdir(join(caseDir, ".empty-types"), { recursive: true });
  }
}

function isTranspileCase(testCase) {
  return testCase.corpus === "typescript" && testCase.suite === "transpile";
}

export function transpileInvocationsForMaterializedCase(compilerOptions, parsed, pathOptions = defaultHarnessPathOptions(), settings = new Map()) {
  const sourceFiles = parsed.units
    .map((unit) => normalizeHarnessPath(unit.fileName, pathOptions))
    .filter((file) => harnessSourceFilePattern.test(file));
  const invocations = [];
  const reportDiagnostics = settings.get("reportdiagnostics")?.toLowerCase() === "true";
  if (compilerOptions.emitDeclarationOnly !== true) {
    for (const inputFile of sourceFiles) {
      invocations.push({
        label: `module:${inputFile}`,
        kind: "module",
        inputFile,
        reportDiagnostics,
        compilerOptions: compilerOptionsForTranspileInvocation(compilerOptions, "module"),
        args: compilerCommandLineArgsForTranspileInvocation(compilerOptions, inputFile, "module"),
        expectedOutputFiles: transpileExpectedOutputFiles(inputFile, compilerOptions, "module"),
      });
    }
  }
  if (compilerOptions.declaration === true) {
    for (const inputFile of sourceFiles) {
      invocations.push({
        label: `declaration:${inputFile}`,
        kind: "declaration",
        inputFile,
        reportDiagnostics,
        compilerOptions: compilerOptionsForTranspileInvocation(compilerOptions, "declaration"),
        args: compilerCommandLineArgsForTranspileInvocation(compilerOptions, inputFile, "declaration"),
        expectedOutputFiles: transpileExpectedOutputFiles(inputFile, compilerOptions, "declaration"),
      });
    }
  }
  return invocations;
}

export function transpileExpectedOutputFiles(inputFile, compilerOptions, kind) {
  if (kind === "module") {
    const jsFile = changeHarnessExtension(inputFile, getJsOutputExtension(inputFile, compilerOptions));
    const outputs = [jsFile];
    if (compilerOptions.sourceMap === true && compilerOptions.inlineSourceMap !== true) {
      outputs.push(`${jsFile}.map`);
    }
    return outputs;
  }
  if (kind === "declaration") {
    const declarationFile = changeHarnessExtension(inputFile, ts.getDeclarationEmitExtensionForPath(inputFile));
    const outputs = [declarationFile];
    if (compilerOptions.declarationMap === true) {
      outputs.push(`${declarationFile}.map`);
    }
    return outputs;
  }
  throw new Error(`Unsupported transpile output kind '${kind}'`);
}

function getJsOutputExtension(inputFile, compilerOptions) {
  return ts.getOutputExtension(inputFile, {
    jsx: compilerOptions.jsx === "preserve" ? ts.JsxEmit.Preserve : undefined,
  });
}

function changeHarnessExtension(inputFile, extension) {
  return inputFile.replace(/\.[cm]?[tj]sx?$/i, extension);
}

// Follows a tsconfig's `extends` chain (string or array, relative paths) and returns
// the union of ancestor compilerOptions, nearest ancestor winning. Only used to mirror
// SkipUnsupportedCompilerOptions on the effective options.
async function inheritedConfigCompilerOptions(configPath, rootConfig) {
  let options = {};
  const visit = async (path, config, depth) => {
    if (depth > 8 || config === undefined) {
      return;
    }
    const extendsList = config.extends === undefined ? [] : Array.isArray(config.extends) ? config.extends : [config.extends];
    for (const ext of extendsList) {
      if (typeof ext !== "string" || (!ext.startsWith(".") && !ext.startsWith("/"))) {
        continue;
      }
      let parentPath = join(dirname(path), ext);
      if (!existsSync(parentPath) && existsSync(`${parentPath}.json`)) {
        parentPath = `${parentPath}.json`;
      }
      let parentConfig;
      try {
        parentConfig = ts.parseConfigFileTextToJson(parentPath, await readSourceText(parentPath)).config;
      } catch {
        continue;
      }
      if (parentConfig !== undefined) {
        await visit(parentPath, parentConfig, depth + 1);
        options = { ...options, ...(parentConfig.compilerOptions ?? {}) };
      }
    }
  };
  await visit(configPath, rootConfig, 0);
  return options;
}

async function mergeFileBasedOptionsIntoProjectConfig(configPath, settings) {
  const configText = await readSourceText(configPath);
  const parsed = ts.parseConfigFileTextToJson(configPath, configText);
  if (parsed.error !== undefined) {
    return { config: undefined, parsedByTypescript: false };
  }
  const merged = compilerOptionsForExistingProjectConfig(parsed.config ?? {}, settings);
  await writeFile(configPath, `${JSON.stringify(merged, null, 2)}\n`);
  return { config: merged, parsedByTypescript: true };
}

export function hasRootPackageJson(writtenFiles) {
  return writtenFiles.some((file) => /^package\.json$/i.test(file));
}

export function selectInputFiles(parsed, writtenFiles, configuration) {
  const sourceFiles = writtenFiles.filter((file) => harnessSourceFilePattern.test(file));
  const explicitRootFiles = writtenFiles.filter((file) => isExplicitRootFile(file));
  const lastSourceFile = [...sourceFiles].at(-1);
  const lastUnit = parsed.units.filter((unit) => harnessSourceFilePattern.test(unit.fileName)).at(-1);
  const noImplicitReferences = configuration.get("noimplicitreferences") !== undefined;
  const hasRequireOrReference = lastUnit !== undefined && (hasCommonJsRequireCall(lastUnit.content) || /reference\spath/.test(lastUnit.content));
  if (lastSourceFile !== undefined && (noImplicitReferences || hasRequireOrReference)) {
    return [lastSourceFile];
  }
  return [...new Set([...sourceFiles, ...explicitRootFiles])];
}

function hasCommonJsRequireCall(sourceText) {
  return /(?:^|[^\w$])require\s*\(\s*["']/.test(sourceText);
}

function isExplicitRootFile(file) {
  if (harnessSourceFilePattern.test(file)) {
    return false;
  }
  if (/(^|\/)(?:package|tsconfig)\.json$/i.test(file)) {
    return false;
  }
  if (/(^|\/)\.lib\//i.test(file)) {
    return false;
  }
  if (/\.tsbuildinfo$/i.test(file)) {
    return false;
  }
  if (/\.json$/i.test(file)) {
    return false;
  }
  return true;
}

// `rewrites`, when provided, collects [rewrittenFragment, originalFragment] pairs for
// every source-content rule application. The compiler copies these fragments verbatim
// into emitted outputs (triple-slash reference paths, module specifiers, /.lib/
// references), while upstream compiles the unrewritten units in a vfs and emits the
// originals; the recorded pairs drive the inverse translation of emitted outputs back
// to upstream unit coordinates.
export function rewriteHarnessFileContent(content, filePath, pathOptions, rewrites) {
  let rewritten = content;
  if (rewritten.includes("/.lib/")) {
    let libPath = relative(dirname(filePath), ".lib").split(sep).join("/");
    if (libPath === "") {
      libPath = ".";
    }
    if (!libPath.startsWith(".")) {
      libPath = `./${libPath}`;
    }
    rewritten = rewritten.replaceAll("/.lib/", `${libPath}/`);
    rewrites?.push([`${libPath}/`, "/.lib/"]);
  }
  if (/\.json$/i.test(filePath)) {
    const next = rewriteHarnessJsonContent(rewritten, filePath, pathOptions);
    if (next !== rewritten) {
      rewrites?.push([next, rewritten]);
      rewrites?.push([next.replace(/\n/g, "\r\n"), rewritten]);
    }
    rewritten = next;
  }
  if (harnessSourceFilePattern.test(filePath)) {
    rewritten = rewriteHarnessModuleSpecifiers(rewritten, filePath, pathOptions, rewrites);
  }
  return rewritten.replace(
    /(\/\/\/\s*<reference\s+path=["'])([^"']+)(["'])/gi,
    (match, prefix, referencePath, suffix) => {
      const next = `${prefix}${rewriteHarnessReferencePath(referencePath, filePath, pathOptions)}${suffix}`;
      if (next !== match) {
        rewrites?.push([next, match]);
      }
      return next;
    },
  );
}

function rewriteHarnessModuleSpecifiers(content, filePath, pathOptions, rewrites) {
  const rewriteSpecifier = (specifier) => isHarnessAbsolutePath(specifier) ? rewriteHarnessModuleSpecifier(specifier, filePath, pathOptions) : specifier;
  const rewriteMatch = (match, prefix, specifier, suffix) => {
    const next = `${prefix}${rewriteSpecifier(specifier)}${suffix}`;
    if (next !== match) {
      rewrites?.push([next, match]);
    }
    return next;
  };
  return content
    .replace(/(\b(?:import|export)\s+(?:(?!\bfrom\b)[^"'`])*?\bfrom\s*["'])(\/[^"']+)(["'])/g, rewriteMatch)
    .replace(/(\bimport\s*\(\s*["'])(\/[^"']+)(["']\s*\))/g, rewriteMatch)
    .replace(/(\brequire\s*\(\s*["'])(\/[^"']+)(["']\s*\))/g, rewriteMatch);
}

function rewriteHarnessModuleSpecifier(specifier, filePath, pathOptions) {
  const targetPath = normalizeHarnessPath(specifier, pathOptions);
  let rewritten = posixPath.relative(posixPath.dirname(filePath), targetPath);
  if (rewritten === "") {
    rewritten = posixPath.basename(targetPath);
  }
  if (!rewritten.startsWith(".")) {
    rewritten = `./${rewritten}`;
  }
  return rewritten;
}

function rewriteHarnessJsonContent(content, filePath, pathOptions) {
  try {
    const parsed = JSON.parse(content);
    const rewritten = rewriteHarnessJsonValue(parsed, filePath, pathOptions);
    if (JSON.stringify(rewritten) === JSON.stringify(parsed)) {
      return content;
    }
    return `${JSON.stringify(rewritten, null, 4)}\n`;
  } catch {
    return content;
  }
}

function rewriteHarnessJsonValue(value, filePath, pathOptions) {
  if (typeof value === "string") {
    return rewriteHarnessJsonString(value, filePath, pathOptions);
  }
  if (Array.isArray(value)) {
    return value.map((element) => rewriteHarnessJsonValue(element, filePath, pathOptions));
  }
  if (value !== null && typeof value === "object") {
    const rewritten = {};
    for (const [key, nestedValue] of Object.entries(value)) {
      rewritten[key] = rewriteHarnessJsonValue(nestedValue, filePath, pathOptions);
    }
    return rewritten;
  }
  return value;
}

function rewriteHarnessJsonString(value, filePath, pathOptions) {
  if (!isHarnessAbsolutePath(value)) {
    return value;
  }
  const targetPath = normalizeHarnessPath(value, pathOptions);
  let rewritten = posixPath.relative(posixPath.dirname(filePath), targetPath);
  if (rewritten === "") {
    rewritten = posixPath.basename(targetPath);
  }
  if (!rewritten.startsWith(".")) {
    rewritten = `./${rewritten}`;
  }
  return rewritten;
}

function rewriteHarnessReferencePath(referencePath, containingFilePath, pathOptions) {
  if (!isHarnessAbsolutePath(referencePath)) {
    return referencePath;
  }
  const targetPath = normalizeHarnessPath(referencePath, pathOptions);
  let rewritten = posixPath.relative(posixPath.dirname(containingFilePath), targetPath);
  if (rewritten === "") {
    rewritten = posixPath.basename(targetPath);
  }
  return rewritten;
}

function isHarnessAbsolutePath(fileName) {
  const normalized = fileName.replaceAll("\\", "/").trim();
  return /^[a-zA-Z]:\//.test(normalized) || normalized.startsWith("/");
}

export async function materializeSymlinks(caseDir, symlinks, pathOptions) {
  for (const [link, target] of symlinks) {
    const linkPath = join(caseDir, normalizeHarnessPath(link, pathOptions));
    const targetPath = join(caseDir, normalizeHarnessPath(target, pathOptions));
    await mkdir(dirname(linkPath), { recursive: true });
    try {
      await symlink(targetPath, linkPath, "dir");
    } catch (error) {
      if (!(error instanceof Error) || !("code" in error) || error.code !== "EEXIST") {
        throw error;
      }
      const existing = await lstat(linkPath);
      if (!existing.isSymbolicLink() || await readlink(linkPath) !== targetPath) {
        throw new Error(`Conflicting harness symlink '${link}'`);
      }
    }
  }
}

async function materializeHarnessApiDeclarations(caseDir, parsed, pathOptions) {
  const declarationFileNames = harnessApiDeclarationFileNames(parsed, pathOptions);
  for (const fileName of declarationFileNames) {
    const text = harnessApiDeclarationText(fileName);
    if (text === undefined) {
      throw new Error(`No TypeScript API declaration source available for '${fileName}'`);
    }
    const fullPath = join(caseDir, ".ts", fileName);
    await mkdir(dirname(fullPath), { recursive: true });
    await writeFile(fullPath, text);
  }
}

export function harnessApiDeclarationFileNames(parsed, pathOptions = defaultHarnessPathOptions()) {
  const names = new Set();
  const apiPathPattern = /["']\/\.ts\/([^"']+\.d\.ts)["']/g;
  for (const unit of parsed.units) {
    for (const match of unit.content.matchAll(apiPathPattern)) {
      const fileName = normalizeHarnessPath(`/.ts/${match[1]}`, pathOptions).replace(/^\.ts\//, "");
      if (!/^[a-zA-Z0-9._-]+\.d\.ts$/.test(fileName)) {
        throw new Error(`Unsupported TypeScript API declaration path '/.ts/${match[1]}'`);
      }
      names.add(fileName);
    }
  }
  return [...names].sort();
}

function harnessApiDeclarationText(fileName) {
  const directCandidates = [
    join(typeScriptApiDeclarationRoot, fileName),
    join(vendoredTypeScriptLibRoot, fileName),
  ];
  for (const candidate of directCandidates) {
    if (existsSync(candidate)) {
      return readFileSync(candidate, "utf8");
    }
  }
  const aliasTarget = harnessApiDeclarationAliasTarget(fileName);
  if (aliasTarget !== "") {
    const importTarget = `./${aliasTarget.replace(/\.d\.ts$/i, "")}`;
    return `import ts = require("${importTarget}");\nexport = ts;\n`;
  }
  return undefined;
}

function harnessApiDeclarationAliasTarget(fileName) {
  switch (fileName) {
    case "typescript.internal.d.ts":
      return "typescript.d.ts";
    case "tsserverlibrary.internal.d.ts":
      return "tsserverlibrary.d.ts";
    default:
      return "";
  }
}

export function getSkipReason(testCase) {
  return getSkipReasonFromConfiguration(testCase.sourceBaseName, testCase.configuration);
}

export function plannedSkipReasonForParsedCase(testCase, parsed) {
  if (testCase.kind === "project") {
    const compilerOptions = compilerOptionsForProjectDescriptor(testCase.descriptor, testCase.moduleKind, ".");
    return getSkipReasonFromCompilerOptions(testCase.sourceBaseName, compilerOptions);
  }
  if (parsed === undefined) {
    throw new Error(`Parsed harness inputs are required to plan skip disposition for ${testCase.relativePath}`);
  }
  if (isTranspileCase(testCase)) {
    return "";
  }

  const pathOptions = harnessPathOptionsFromSettings(testCase.configuration);
  const unitRecords = parsed.units.map((unit) => ({
    filePath: normalizeHarnessPath(unit.fileName, pathOptions),
    content: rewriteHarnessFileContent(unit.content, normalizeHarnessPath(unit.fileName, pathOptions), pathOptions),
  }));
  const writtenFiles = unitRecords.map((record) => record.filePath);
  const existingConfig = writtenFiles.find((file) => /(^|\/)tsconfig\.json$/i.test(file));
  if (existingConfig !== undefined) {
    const unitContents = new Map(unitRecords.map((record) => [record.filePath, record.content]));
    const configText = unitContents.get(existingConfig);
    if (configText === undefined) {
      throw new Error(`Planned tsconfig unit '${existingConfig}' has no content`);
    }
    const parsedConfig = ts.parseConfigFileTextToJson(existingConfig, configText);
    if (parsedConfig.error !== undefined) {
      return getSkipReasonFromCompilerOptions(testCase.sourceBaseName, {});
    }
    const mergedConfig = compilerOptionsForExistingProjectConfig(parsedConfig.config ?? {}, testCase.configuration);
    const inheritedOptions = inheritedConfigCompilerOptionsFromUnits(existingConfig, mergedConfig, unitContents);
    return getSkipReasonFromCompilerOptions(testCase.sourceBaseName, { ...inheritedOptions, ...mergedConfig.compilerOptions });
  }

  if (!hasRootPackageJson(writtenFiles)) {
    writtenFiles.push("package.json");
  }
  const inputFiles = selectInputFiles(parsed, writtenFiles, testCase.configuration);
  const compilerOptions = compilerOptionsForMaterializedCase(testCase.configuration, parsed, inputFiles);
  return getSkipReasonFromCompilerOptions(testCase.sourceBaseName, compilerOptions);
}

function inheritedConfigCompilerOptionsFromUnits(configPath, rootConfig, unitContents) {
  let options = {};
  const visit = (path, config, depth) => {
    if (depth > 8 || config === undefined) {
      return;
    }
    const extendsList = config.extends === undefined ? [] : Array.isArray(config.extends) ? config.extends : [config.extends];
    for (const ext of extendsList) {
      if (typeof ext !== "string" || (!ext.startsWith(".") && !ext.startsWith("/"))) {
        continue;
      }
      let parentPath = posixPath.join(posixPath.dirname(path), ext);
      if (!unitContents.has(parentPath) && unitContents.has(`${parentPath}.json`)) {
        parentPath = `${parentPath}.json`;
      }
      const parentText = unitContents.get(parentPath);
      if (parentText === undefined) {
        continue;
      }
      let parentConfig;
      try {
        parentConfig = ts.parseConfigFileTextToJson(parentPath, parentText).config;
      } catch {
        continue;
      }
      if (parentConfig !== undefined) {
        visit(parentPath, parentConfig, depth + 1);
        options = { ...options, ...(parentConfig.compilerOptions ?? {}) };
      }
    }
  };
  visit(configPath, rootConfig, 0);
  return options;
}

function getSkipReasonFromConfiguration(sourceBaseName, configuration) {
  return getSkipReasonFromCompilerOptions(sourceBaseName, compilerOptionsFromSettings(configuration ?? new Map()));
}

// compiler_runner.go skippedTests: test files the pinned TS-Go runner skips by name
// (typescript.d.ts dependents and tests whose options were removed from the option
// parser entirely, so the harness config fails to parse).
const tsgoRunnerSkippedTestNames = new Set([
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

// Mirrors compiler_runner.go skippedTests plus harnessutil.go
// SkipUnsupportedCompilerOptions: the pinned TS-Go runner skips these tests and
// configurations outright, so no reference baselines exist for them. Skipping (counted
// and reasoned) is the faithful mirror; running them would gate against nothing.
// Condition order matches SkipUnsupportedCompilerOptions exactly.
function getSkipReasonFromCompilerOptions(sourceBaseName, compilerOptions) {
  if (tsgoRunnerSkippedTestNames.has(sourceBaseName)) {
    return `TS-Go runner skip list: ${sourceBaseName}`;
  }
  const moduleValue = stringCompilerOption(compilerOptions.module);
  if (moduleValue === "amd" || moduleValue === "umd" || moduleValue === "system") {
    return `TS-Go runner skips unsupported module kind ${moduleValue}`;
  }
  const moduleResolutionValue = stringCompilerOption(compilerOptions.moduleResolution);
  // "node" is the tsconfig alias for Node10 (core.ModuleResolutionKindNode10).
  if (moduleResolutionValue === "node10" || moduleResolutionValue === "node" || moduleResolutionValue === "classic") {
    return `TS-Go runner skips unsupported module resolution kind ${moduleResolutionValue}`;
  }
  if (compilerOptions.esModuleInterop === false) {
    return "TS-Go runner skips esModuleInterop=false";
  }
  if (compilerOptions.allowSyntheticDefaultImports === false) {
    return "TS-Go runner skips allowSyntheticDefaultImports=false";
  }
  if (optionIsPresent(compilerOptions.baseUrl)) {
    return `TS-Go runner skips unsupported baseUrl ${compilerOptions.baseUrl}`;
  }
  if (optionIsPresent(compilerOptions.outFile)) {
    return `TS-Go runner skips unsupported outFile ${compilerOptions.outFile}`;
  }
  if (stringCompilerOption(compilerOptions.target) === "es5") {
    return "TS-Go runner skips unsupported target es5";
  }
  if (compilerOptions.alwaysStrict === false) {
    return "TS-Go runner skips alwaysStrict=false";
  }
  return "";
}

export function caseExpectedErrors(testCase, compilerOptions) {
  return baselineHasErrors(testCase) || compilerOptionsRequireTsGoRemovedOptionDiagnostic(compilerOptions);
}

export function compilerOptionsRequireTsGoRemovedOptionDiagnostic(compilerOptions) {
  const moduleValue = stringCompilerOption(compilerOptions.module);
  const moduleResolutionValue = stringCompilerOption(compilerOptions.moduleResolution);
  return (
    optionIsPresent(compilerOptions.baseUrl) ||
    optionIsPresent(compilerOptions.outFile) ||
    optionIsPresent(compilerOptions.out) ||
    stringCompilerOption(compilerOptions.target) === "es5" ||
    moduleValue === "amd" ||
    moduleValue === "umd" ||
    moduleValue === "system" ||
    moduleResolutionValue === "classic" ||
    moduleResolutionValue === "node10" ||
    compilerOptions.alwaysStrict === false ||
    compilerOptions.esModuleInterop === false ||
    compilerOptions.allowSyntheticDefaultImports === false ||
    compilerOptions.keyofStringsOnly !== undefined ||
    compilerOptions.noImplicitUseStrict !== undefined ||
    compilerOptions.importsNotUsedAsValues !== undefined ||
    compilerOptions.downlevelIteration !== undefined
  );
}

function optionIsPresent(value) {
  return value !== undefined && value !== "";
}

function stringCompilerOption(value) {
  return typeof value === "string" ? value.toLowerCase() : "";
}

export function normalizeHarnessPath(fileName, options = defaultHarnessPathOptions()) {
  let normalized = fileName.replaceAll("\\", "/").trim();
  normalized = normalizeVirtualDrivePrefix(normalized, options);
  normalized = normalized.replace(/^\/+/, "");
  if (normalized === "") {
    normalized = "input.ts";
  }
  const virtualRoot = "/.tsts-case";
  const resolved = posixPath.normalize(posixPath.join(virtualRoot, normalized));
  if (resolved !== virtualRoot && !resolved.startsWith(`${virtualRoot}/`)) {
    throw new Error(`Harness file path is not contained in the case root: '${fileName}'`);
  }
  const contained = posixPath.relative(virtualRoot, resolved);
  return contained === "" ? "input.ts" : contained;
}

export function normalizeHarnessOptionPath(fileName, options = defaultHarnessPathOptions()) {
  let normalized = fileName.replaceAll("\\", "/").trim();
  normalized = normalizeVirtualDrivePrefix(normalized, options);
  if (normalized === ".." || normalized.startsWith("../")) {
    const resolved = posixPath.normalize(posixPath.join("/.src", normalized));
    if (resolved === "/" || !resolved.startsWith("/.src/")) {
      const rootRelative = resolved.replace(/^\/+/, "");
      return rootRelative === "" ? ".virtual-root" : `.virtual-root/${rootRelative}`;
    }
  }
  normalized = normalized.replace(/^\/+/, "");
  return normalized === "" ? "." : normalized;
}

function normalizeHarnessModuleSpecifier(specifier, options = defaultHarnessPathOptions()) {
  if (!isHarnessAbsolutePath(specifier)) {
    return specifier;
  }
  const normalized = normalizeHarnessOptionPath(specifier, options);
  return normalized === "." ? "." : `./${normalized}`;
}

function applyVirtualRootCommonSourceDirectory(compilerOptions, settings, parsed, inputFiles) {
  if (compilerOptions.rootDir !== undefined) {
    return;
  }
  if (!hasSyntheticConfigEmitLayoutOption(compilerOptions)) {
    return;
  }
  const pathOptions = harnessPathOptionsFromSettings(settings);
  const inputFileSet = new Set(inputFiles);
  const sourceUnits = parsed.units.filter((unit) =>
    harnessSourceFilePattern.test(unit.fileName) &&
    !harnessDeclarationFilePattern.test(unit.fileName) &&
    inputFileSet.has(normalizeHarnessPath(unit.fileName, pathOptions))
  );
  if (sourceUnits.length < 1) {
    return;
  }
  const useCaseSensitiveFileNames = settings.get("usecasesensitivefilenames")?.toLowerCase() !== "false";
  const firstVolume = harnessVolumeKey(sourceUnits[0].fileName, useCaseSensitiveFileNames);
  if (!sourceUnits.every((unit) => harnessVolumeKey(unit.fileName, useCaseSensitiveFileNames) === firstVolume)) {
    return;
  }
  const emittedInputFiles = sourceUnits.map((unit) => normalizeHarnessPath(unit.fileName, pathOptions));
  const commonDirectory = commonDirectoryOfRelativeFiles(emittedInputFiles);
  if (commonDirectory !== ".") {
    compilerOptions.rootDir = commonDirectory;
  }
}

const harnessDeclarationFilePattern = /\.d\.[cm]?ts$/i;

function hasSyntheticConfigEmitLayoutOption(compilerOptions) {
  return compilerOptions.outDir !== undefined ||
    compilerOptions.declarationDir !== undefined ||
    compilerOptions.outFile !== undefined;
}

function harnessVolumeKey(fileName, useCaseSensitiveFileNames) {
  const normalized = fileName.replaceAll("\\", "/").trim();
  const drive = /^([a-zA-Z]):\//.exec(normalized);
  if (drive !== null) {
    return useCaseSensitiveFileNames ? `${drive[1]}:` : `${drive[1].toLowerCase()}:`;
  }
  return normalized.startsWith("/") ? "/" : "";
}

function defaultHarnessPathOptions() {
  return { useCaseSensitiveFileNames: true };
}

export function harnessPathOptionsFromSettings(settings) {
  return {
    useCaseSensitiveFileNames: settings.get("usecasesensitivefilenames")?.toLowerCase() !== "false",
  };
}

function normalizeVirtualDrivePrefix(path, options) {
  const match = /^([a-zA-Z]):(?=\/|$)/.exec(path);
  if (match === null) {
    return path;
  }
  const drive = options.useCaseSensitiveFileNames ? match[1] : match[1].toLowerCase();
  return `${drive}:${path.slice(match[0].length)}`;
}

function commonDirectoryOfRelativeFiles(files) {
  if (files.length === 0) {
    return ".";
  }
  const directories = files.map((file) => file.split("/").slice(0, -1));
  const first = directories[0] ?? [];
  const common = [];
  for (let index = 0; index < first.length; index += 1) {
    const segment = first[index];
    if (directories.every((directory) => directory[index] === segment)) {
      common.push(segment);
    } else {
      break;
    }
  }
  return common.length === 0 ? "." : common.join("/");
}

function safePathFragment(path) {
  return path.replace(/[^a-zA-Z0-9._/-]/g, "_").replaceAll("/", "__");
}

export function caseDirectoryFragment(testCase) {
  return safePathFragment(`${testCase.corpus ?? "current"}/${testCase.suite}/${configuredCaseName(testCase)}`);
}

async function runTsts(invocation) {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [
      "--max-old-space-size=8192",
      cliPath,
      ...invocation.args,
    ], {
      cwd: invocation.cwd,
      stdio: ["ignore", "pipe", "pipe"],
      env: suiteChildEnvironment(),
    });
    let stdout = "";
    let stderr = "";
    let timedOut = false;
    // A single infinite loop in TSTS would otherwise wedge a worker forever and stall the whole
    // run. Kill a case that exceeds the (generous) budget and surface it as a visible failure.
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, CASE_TIMEOUT_MS);
    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("close", (exitCode, signal) => {
      clearTimeout(timer);
      if (timedOut) {
        resolve({ exitCode: 1, signal: "SIGKILL", stdout, stderr: `${stderr}\nTSTS case timed out after ${CASE_TIMEOUT_MS}ms (likely an infinite loop).` });
        return;
      }
      resolve({ exitCode: exitCode ?? 1, signal, stdout, stderr });
    });
  });
}

async function runCase(testCase, runRoot, options) {
  const materialized = await materializeCase(testCase, runRoot);
  if (typeof testCase.expectedSkipReason !== "string") {
    throw new Error(`Case ${testCase.relativePath} has no sealed skip disposition`);
  }
  if (materialized.skipReason !== testCase.expectedSkipReason) {
    throw new Error(`Materialized skip disposition changed for ${testCase.relativePath}: planned=${JSON.stringify(testCase.expectedSkipReason)} actual=${JSON.stringify(materialized.skipReason)}`);
  }
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
  if (materialized.transpile === true) {
    const result = await runTranspileInvocations(materialized);
    const exactBaseline = await evaluateExactBaselines(testCase, materialized, `${result.stdout}${result.stderr}`);
    // In exact mode, transpile diagnostics live in the baseline's (post-overlay) 'Diagnostics
    // reported' section, not a .errors.txt; derive expectedErrors from there so the new pin's
    // --isolatedDeclarations diagnostics are accounted for rather than always failing on
    // actualErrors=true.
    const expectedErrors = exactBaseline !== undefined ? exactBaseline.expectedDiagnosticsPresent : materialized.expectedErrors;
    const statusMatches = result.actualErrors === expectedErrors && (exactBaseline === undefined || exactBaseline.status === "pass");
    return {
      ...testCase,
      caseDir: materialized.caseDir,
      expectedErrors,
      actualErrors: result.actualErrors,
      exitCode: result.exitCode,
      signal: result.signal,
      status: statusMatches ? "pass" : "fail",
      skipReason: "",
      stdout: result.stdout,
      stderr: result.stderr,
      exactBaseline,
    };
  }
  // For vfs-harness cases the in-memory harness compile (run inside evaluateExactBaselines)
  // is the authority for the reference artifacts: diagnostics, emit, source maps, and
  // type/symbol baselines. TS-Go's baseline runner treats the artifact comparison as
  // authoritative; raw diagnostic count is not a separate failure gate because harness
  // diagnostics can include internal ad-hoc pre/post-emit markers while the committed
  // reference artifacts remain accepted upstream.
  //
  // So the on-disk CLI compile is redundant for the fast-path verdict and is skipped.
  // --verify-on-disk re-runs the on-disk CLI and proves it agrees with the harness
  // (error verdict AND emitted .js/.d.ts), keeping the on-disk path fully + provably covered.
  const isHarnessCase = usesTsgoAuthorityBaselines(testCase)
    && materialized.units !== undefined && materialized.invocation !== undefined;

  if (isHarnessCase && options.verifyOnDisk !== true) {
    const exactBaseline = await evaluateExactBaselines(testCase, materialized, "");
    const actualErrors = exactBaseline.actualErrors === true;
    const expectedErrors = exactBaseline.expectedDiagnosticsPresent;
    const statusMatches = exactBaseline.status === "pass";
    return {
      ...testCase,
      caseDir: materialized.caseDir,
      expectedErrors,
      actualErrors,
      exitCode: actualErrors ? 1 : 0,
      signal: null,
      status: statusMatches ? "pass" : "fail",
      skipReason: "",
      stdout: "",
      stderr: "",
      exactBaseline,
    };
  }

  const result = await runTsts(materialized.invocation);
  const actualErrors = result.exitCode !== 0;
  const exactBaseline = await evaluateExactBaselines(testCase, materialized, `${result.stdout}${result.stderr}`);
  const expectedErrors = exactBaseline !== undefined ? exactBaseline.expectedDiagnosticsPresent : materialized.expectedErrors;
  const onDiskVerdictExempt = isHarnessCase && options.verifyOnDisk === true && (
    isHarnessOnlyVersionedConfigCase(testCase, materialized)
    || exactBaseline?.expectedPrePostEmitDiagnostic === true
  );
  const statusActualErrors = onDiskVerdictExempt ? exactBaseline?.actualErrors === true : actualErrors;
  const onDiskDivergences = isHarnessCase && options.verifyOnDisk === true
    ? await verifyOnDiskMatchesHarness(testCase, materialized, result, exactBaseline)
    : [];
  const statusMatches = statusActualErrors === expectedErrors
    && (exactBaseline === undefined || exactBaseline.status === "pass")
    && onDiskDivergences.length === 0;
  return {
    ...testCase,
    caseDir: materialized.caseDir,
    expectedErrors,
    actualErrors: statusActualErrors,
    exitCode: result.exitCode,
    signal: result.signal,
    status: statusMatches ? "pass" : "fail",
    skipReason: "",
    stdout: onDiskDivergences.length === 0 ? result.stdout : `${result.stdout}\nON-DISK/HARNESS DIVERGENCE:\n${onDiskDivergences.join("\n")}`,
    stderr: result.stderr,
    exactBaseline,
    executionMismatches: onDiskDivergences,
  };
}

// --verify-on-disk proof: confirm the real on-disk CLI compile agrees with the
// in-memory harness for a case — same error verdict and every emitted artifact, including
// declaration output. A declaration mismatch is product evidence, not a reason to narrow
// the verifier's contract.
// Returns human-readable divergences (empty = the on-disk path is equivalent here).
// Emit is compared in TS-Go baseline coordinates. Those coordinates intentionally collapse
// output directories unless @fullEmitPaths is set, so duplicate section names are grouped and
// compared as content multisets instead of clobbering each other in a Map.
async function verifyOnDiskMatchesHarness(testCase, materialized, cliResult, exactBaseline) {
  const divergences = [];
  const cliActualErrors = cliResult.exitCode !== 0;
  if (
    exactBaseline.usedHarness === true
    && exactBaseline.actualErrors !== cliActualErrors
    && !isHarnessOnlyVersionedConfigCase(testCase, materialized)
    && exactBaseline.expectedPrePostEmitDiagnostic !== true
  ) {
    divergences.push(`verdict: on-disk CLI actualErrors=${cliActualErrors} but harness actualErrors=${exactBaseline.actualErrors}`);
  }
  const harnessEmitted = exactBaseline.harnessEmitted;
  if (harnessEmitted !== undefined) {
    const norm = (value) => normalizeEmittedOutputText(String(value ?? ""));
    const onDisk = groupEmittedOutputs(await emittedOutputsForCase(materialized), (key) => upstreamOutputName(materialized, key), norm);
    const harness = groupEmittedOutputs(
      harnessEmitted,
      (key) => upstreamHarnessOutputName(materialized, key),
      (value) => norm(translateHarnessEmittedContentToBaselineCoordinates(value)),
    );
    divergences.push(...compareGroupedEmittedOutputs(onDisk, harness));
  }
  return divergences;
}

export function compareGroupedEmittedOutputs(onDisk, harness) {
  const divergences = [];
  for (const key of new Set([...onDisk.keys(), ...harness.keys()])) {
    const onDiskValues = onDisk.get(key) ?? [];
    const harnessValues = harness.get(key) ?? [];
    if (onDiskValues.length !== harnessValues.length) {
      divergences.push(`emit: '${key}' count differs between on-disk (${onDiskValues.length}) and harness (${harnessValues.length})`);
    } else if (!sameStringMultiset(onDiskValues, harnessValues)) {
      divergences.push(`emit: '${key}' content differs between on-disk and harness`);
    }
  }
  return divergences;
}

function isHarnessOnlyVersionedConfigCase(testCase, materialized) {
  return testCase.corpus === "typescript" &&
    materialized.hasTsconfigUnit === true &&
    testCase.configuration?.has?.("typescriptversion") === true;
}

function groupEmittedOutputs(outputs, keyOf, normalize) {
  const grouped = new Map();
  for (const [rawKey, rawValue] of outputs) {
    const key = keyOf(String(rawKey));
    const values = grouped.get(key) ?? [];
    values.push(normalize(rawValue));
    grouped.set(key, values);
  }
  for (const values of grouped.values()) {
    values.sort();
  }
  return grouped;
}

function upstreamHarnessOutputName(materialized, outputFile) {
  const normalized = normalizedBaselineSectionPath(removeTestPathPrefixes(outputFile));
  if (materialized.fullEmitPaths === true) {
    return normalized;
  }
  return normalizedBaselineSectionPath(outputFile).split("/").at(-1);
}

function translateHarnessEmittedContentToBaselineCoordinates(content) {
  return String(content ?? "").replaceAll("/.src/", "");
}

function sameStringMultiset(left, right) {
  if (left.length !== right.length) {
    return false;
  }
  for (let index = 0; index < left.length; index += 1) {
    if (left[index] !== right[index]) {
      return false;
    }
  }
  return true;
}

async function runTranspileInvocations(materialized) {
  const outputs = [];
  const diagnostics = [];
  let actualErrors = false;
  let exitCode = 0;
  let signal = null;
  for (const invocation of materialized.invocations) {
    const result = await runTstsTranspileApi(materialized.caseDir, invocation);
    diagnostics.push(...result.diagnostics);
    // Diagnostics are the primary truth for actualErrors; missing output is an additional symptom
    // (e.g. --isolatedDeclarations blocks .d.ts emit). A case that reports diagnostics while still
    // emitting all expected outputs must still count as having errors.
    const missingOutputs = invocation.expectedOutputFiles.filter((file) => !existsSync(join(materialized.caseDir, file)));
    if (result.diagnostics.length !== 0 || missingOutputs.length !== 0) {
      actualErrors = true;
    }
    if (result.exitCode !== 0 && exitCode === 0) {
      exitCode = result.exitCode;
    }
    if (result.signal !== null && signal === null) {
      signal = result.signal;
    }
    outputs.push(renderTranspileInvocationOutput(invocation, result, missingOutputs));
  }
  const api = await loadTstsApi();
  const diagnosticText = api.formatDiagnostics(sortDiagnosticsForBaseline(diagnostics), "/");
  return {
    actualErrors,
    exitCode,
    signal,
    stdout: `${outputs.map((output) => output.stdout).join("")}${diagnosticText}`,
    stderr: outputs.map((output) => output.stderr).join(""),
  };
}

async function runTstsTranspileApi(caseDir, invocation) {
  const api = await loadTstsApi();
  const inputText = await readFile(join(caseDir, invocation.inputFile), "utf8");
  const transpileOptions = {
    compilerOptions: invocation.compilerOptions,
    fileName: invocation.inputFile,
    reportDiagnostics: invocation.reportDiagnostics,
  };
  const output = invocation.kind === "declaration"
    ? api.transpileDeclaration(inputText, transpileOptions)
    : api.transpileModule(inputText, transpileOptions);
  const primaryOutput = invocation.expectedOutputFiles.find((file) => !file.endsWith(".map"));
  // A declaration transpile that yields empty output emitted no file (e.g. blocked by
  // --isolatedDeclarations); the pinned binary writes nothing and the tsgo-accepted overlay marks
  // the section absent, so skip writing it to keep the absent-section comparison correct.
  const emittedNoOutputFile = invocation.kind === "declaration" && output.outputText === "";
  if (primaryOutput !== undefined && !emittedNoOutputFile) {
    await writeFile(join(caseDir, primaryOutput), output.outputText);
  }
  const sourceMapOutput = invocation.expectedOutputFiles.find((file) => file.endsWith(".map"));
  if (sourceMapOutput !== undefined && output.sourceMapText !== undefined) {
    await writeFile(join(caseDir, sourceMapOutput), output.sourceMapText);
  }
  return {
    exitCode: 0,
    signal: null,
    diagnostics: output.diagnostics,
    stdout: "",
    stderr: "",
  };
}

export function sortDiagnosticsForBaseline(diagnostics) {
  return [...diagnostics].sort(compareDiagnosticsForBaseline);
}

function compareDiagnosticsForBaseline(left, right) {
  return compareStrings(diagnosticFileName(left), diagnosticFileName(right)) ||
    diagnosticStart(left) - diagnosticStart(right) ||
    diagnosticEnd(left) - diagnosticEnd(right) ||
    diagnosticCode(left) - diagnosticCode(right);
}

function diagnosticFileName(diagnostic) {
  return diagnostic?.file?.fileName ?? diagnostic?.file?.FileName?.() ?? "";
}

function diagnosticStart(diagnostic) {
  return diagnostic?.loc?.pos ?? -1;
}

function diagnosticEnd(diagnostic) {
  return diagnostic?.loc?.end ?? diagnosticStart(diagnostic);
}

function diagnosticCode(diagnostic) {
  return diagnostic?.code ?? 0;
}

function compareStrings(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}

async function loadTstsApi() {
  tstsApi ??= import(apiPath);
  return tstsApi;
}

function renderTranspileInvocationOutput(invocation, result, missingOutputs) {
  const header = `## ${invocation.label}\n`;
  const missing = missingOutputs.length === 0 ? "" : `Missing outputs: ${missingOutputs.join(", ")}\n`;
  return {
    stdout: `${header}${missing}${result.stdout}`,
    stderr: result.stderr,
  };
}

// Run all cases, streaming each trimmed result record to an append-only NDJSON
// report root as it completes. The runner holds NO per-case records in memory:
// memory stays O(in-flight cases) regardless of corpus size, and a killed run
// leaves a complete machine-readable record of everything it finished. Each
// NDJSON line is the results.json record plus a `caseIndex` field recording the
// case's position in discovery order (workers finish out of order).
// Stable identifier for a discovered case (independent of position in the list):
// used to verify a --resume target points at the SAME case set the suspended run
// was built from, so recorded caseIndex values still line up.
export function caseIdentifier(testCase) {
  return fingerprint({
    corpus: testCase.corpus,
    suite: testCase.suite,
    relativePath: testCase.relativePath,
    configurationName: testCase.configurationName ?? "",
  }, "tsts-tsgo-suite-case-id-v1");
}

export function hashCaseIds(cases) {
  return fingerprint(cases.map((entry) => typeof entry === "string" ? entry : entry.id ?? caseIdentifier(entry)), "tsts-tsgo-suite-case-inventory-v1");
}

export function inventoryFingerprint(inventory) {
  return fingerprint(inventory, "tsts-tsgo-suite-inventory-v2");
}

export function runManifestFingerprint(manifest) {
  return fingerprint(manifest, "tsts-tsgo-suite-run-v3");
}

export function buildRunManifest(testCases, options, inventory) {
  const cases = testCases.map((testCase, index) => {
    if (typeof testCase.expectedSkipReason !== "string") {
      throw new Error(`Case ${index} is missing its planned skip disposition`);
    }
    return {
      index,
      corpus: testCase.corpus,
      suite: testCase.suite,
      relativePath: testCase.relativePath,
      configurationName: testCase.configurationName ?? "",
      id: caseIdentifier(testCase),
      sourceSha256: testCase.sourceSha256,
      projectFixture: testCase.projectFixture ?? null,
      expectedSkipReason: testCase.expectedSkipReason,
    };
  });
  const childEnvironment = suiteChildEnvironment();
  const sourcePin = loadAndVerifyTsgoSourcePin({ repoRoot, packageRoot, vendorRoot });
  const typeScriptSource = sourcePin.nestedSources.find((entry) => entry.name === "TypeScript");
  if (typeScriptSource === undefined) throw new Error("TS-Go source pin is missing the TypeScript nested source");
  const inputs = hashInputRoots(runInputRoots());
  if (suiteBuildId !== "") {
    const request = tstsBuildRequest({ repoRoot, packageRoot });
    const preparedBuild = verifyTstsBuild(preparedBuildRoot, request, suiteBuildId);
    if (preparedBuild === undefined) throw new Error(`Prepared TSTS build ${suiteBuildId} is missing`);
    validatePreparedBuildRunBinding(inputs, preparedBuild);
  }
  const manifest = {
    schemaVersion: RUN_MANIFEST_SCHEMA_VERSION,
    selection: {
      corpus: options.corpus,
      suite: options.suite,
      filter: options.filter,
      limit: options.limit,
    },
    execution: {
      exactBaselineContract: 1,
      verifyOnDisk: options.verifyOnDisk === true,
      jobs: options.jobs,
      failFast: options.failFast === true,
      caseTimeoutMs: CASE_TIMEOUT_MS,
      poolCaseTimeoutMs: POOL_CASE_TIMEOUT_MS,
      maxOldSpaceSizeMb: 8192,
      resultRecordMaxBytes: RESULT_RECORD_MAX_BYTES,
      resultSegmentMaxBytes: RESULT_SEGMENT_MAX_BYTES,
      resultSegmentMaxRecords: RESULT_SEGMENT_MAX_RECORDS,
    },
    runtime: {
      execPath: executableProvenance(process.execPath),
      nodeVersion: process.version,
      v8Version: process.versions.v8,
      execArgv: [...process.execArgv],
      platform: process.platform,
      arch: process.arch,
      locale: runtimeLocaleEvidence(),
      hostname: hostname(),
      childEnvironment: Object.entries(childEnvironment).sort(([left], [right]) => compareUtf8(left, right)).map(([name, value]) => ({ name, value })),
    },
    upstream: {
      sourcePin: {
        path: sourcePin.path,
        sha256: sourcePin.sha256,
        tsgoRevision: sourcePin.pin.revision,
        tsgoObjectFormat: sourcePin.pin.gitObjectFormat,
        typescriptPath: typeScriptSource.path,
        typescriptRevision: typeScriptSource.revision,
        typescriptObjectFormat: typeScriptSource.gitObjectFormat,
      },
      tsgo: checkoutEvidence(sourcePin.primary),
      typescript: { name: typeScriptSource.name, path: typeScriptSource.path, ...checkoutEvidence(typeScriptSource.checkout) },
    },
    inputs,
    cases,
    caseIdsHash: hashCaseIds(cases),
    total: testCases.length,
    inventory,
    inventoryHash: inventoryFingerprint(inventory),
  };
  return { ...manifest, runFingerprint: runManifestFingerprint(manifest) };
}

export function validatePreparedBuildRunBinding(runInputs, preparedBuild) {
  if (preparedBuild === undefined || preparedBuild === null || typeof preparedBuild !== "object") throw new Error("prepared TSTS build evidence is invalid");
  const requestInputs = preparedBuild.provenance?.request?.inputs;
  const output = preparedBuild.provenance?.output;
  if (!Array.isArray(runInputs?.roots) || !Array.isArray(requestInputs?.roots) || output === undefined) throw new Error("prepared TSTS build input evidence is invalid");
  const runByLabel = new Map(runInputs.roots.map((root) => [root.label, root]));
  let compared = 0;
  for (const requestRoot of requestInputs.roots) {
    const runRoot = runByLabel.get(requestRoot.label);
    if (runRoot === undefined) continue;
    compared += 1;
    if (canonicalJson(runRoot) !== canonicalJson(requestRoot)) throw new Error(`Prepared TSTS build input '${requestRoot.label}' does not match the suite run input`);
  }
  if (compared === 0) throw new Error("prepared TSTS build has no inputs in common with the suite run");
  const runDist = runByLabel.get("tsts-dist");
  if (runDist === undefined || canonicalJson(runDist) !== canonicalJson(output)) throw new Error("Prepared TSTS build output does not match the suite run dist input");
}

export function validateRunManifest(manifest, expectedManifest) {
  assertExactKeys(manifest, ["caseIdsHash", "cases", "execution", "inputs", "inventory", "inventoryHash", "runFingerprint", "runtime", "schemaVersion", "selection", "total", "upstream"], "run manifest");
  if (manifest.schemaVersion !== RUN_MANIFEST_SCHEMA_VERSION) throw new Error(`unsupported run manifest schemaVersion '${manifest.schemaVersion}'`);
  assertExactKeys(manifest.selection, ["corpus", "filter", "limit", "suite"], "run manifest selection");
  validateCorpusSuite(manifest.selection.corpus, manifest.selection.suite, "run manifest selection");
  assertBoundedString(manifest.selection.filter, "run manifest selection.filter", 10000);
  assertNonNegativeInteger(manifest.selection.limit, "run manifest selection.limit");
  assertExactKeys(manifest.execution, ["caseTimeoutMs", "exactBaselineContract", "failFast", "jobs", "maxOldSpaceSizeMb", "poolCaseTimeoutMs", "resultRecordMaxBytes", "resultSegmentMaxBytes", "resultSegmentMaxRecords", "verifyOnDisk"], "run manifest execution");
  if (manifest.execution.exactBaselineContract !== 1) throw new Error("run manifest exact-baseline contract is unsupported");
  for (const key of ["verifyOnDisk", "failFast"]) assertBoolean(manifest.execution[key], `run manifest execution.${key}`);
  for (const key of ["jobs", "caseTimeoutMs", "poolCaseTimeoutMs", "maxOldSpaceSizeMb", "resultRecordMaxBytes", "resultSegmentMaxBytes", "resultSegmentMaxRecords"]) {
    assertPositiveInteger(manifest.execution[key], `run manifest execution.${key}`);
  }
  if (manifest.execution.resultRecordMaxBytes > manifest.execution.resultSegmentMaxBytes) throw new Error("run manifest result record limit exceeds its segment limit");
  validateRuntimeEvidence(manifest.runtime, manifest.execution);
  validateUpstreamEvidence(manifest.upstream);
  validateInputInventory(manifest.inputs);
  validateInventory(manifest.inventory);
  if (manifest.inventoryHash !== inventoryFingerprint(manifest.inventory)) throw new Error("run manifest inventory hash does not match its inventory");
  if (!Number.isSafeInteger(manifest.total) || manifest.total < 0 || !Array.isArray(manifest.cases) || manifest.cases.length !== manifest.total) {
    throw new Error("run manifest case inventory is invalid");
  }
  const caseIds = new Set();
  let previousCaseSortKey;
  for (let index = 0; index < manifest.cases.length; index += 1) {
    const entry = manifest.cases[index];
    assertExactKeys(entry, ["configurationName", "corpus", "expectedSkipReason", "id", "index", "projectFixture", "relativePath", "sourceSha256", "suite"], `run manifest case ${index}`);
    if (entry.index !== index) throw new Error(`run manifest case ${index} has an invalid index`);
    validateCorpusSuite(entry.corpus, entry.suite, `run manifest case ${index}`);
    if (entry.corpus !== manifest.selection.corpus || (manifest.selection.suite !== "all" && entry.suite !== manifest.selection.suite)) throw new Error(`run manifest case ${index} is outside the selected corpus/suite`);
    assertSafeRelativePath(entry.relativePath, `run manifest case ${index}.relativePath`);
    if (manifest.selection.filter !== "" && !entry.relativePath.includes(manifest.selection.filter)) throw new Error(`run manifest case ${index} does not match the selected filter`);
    assertBoundedString(entry.configurationName, `run manifest case ${index}.configurationName`, 10000);
    assertBoundedString(entry.expectedSkipReason, `run manifest case ${index}.expectedSkipReason`, 10000);
    if (!DIGEST_PATTERN.test(entry.sourceSha256)) throw new Error(`run manifest case ${index} has an invalid source digest`);
    validateProjectFixture(entry.projectFixture, entry.suite, `run manifest case ${index}.projectFixture`);
    const expectedId = caseIdentifier(entry);
    if (entry.id !== expectedId) throw new Error(`run manifest case ${index} id does not match its identity`);
    if (caseIds.has(entry.id)) throw new Error(`run manifest case ${index} duplicates case id '${entry.id}'`);
    caseIds.add(entry.id);
    const caseSortKey = `${entry.relativePath}:${entry.configurationName}`;
    if (previousCaseSortKey !== undefined && compareUtf8(previousCaseSortKey, caseSortKey) > 0) throw new Error(`run manifest case ${index} is out of discovery order`);
    previousCaseSortKey = caseSortKey;
  }
  if (manifest.selection.limit > 0 && manifest.total > manifest.selection.limit) throw new Error("run manifest total exceeds its selected limit");
  if (manifest.caseIdsHash !== hashCaseIds(manifest.cases)) throw new Error("run manifest case ID hash does not match its cases");
  if (!DIGEST_PATTERN.test(manifest.runFingerprint)) throw new Error("run manifest fingerprint is invalid");
  const { runFingerprint, ...unsigned } = manifest;
  if (runFingerprint !== runManifestFingerprint(unsigned)) throw new Error("run manifest fingerprint does not match its contents");
  if (expectedManifest !== undefined && manifest.runFingerprint !== expectedManifest.runFingerprint) {
    throw new Error("run manifest does not match current source, baselines, compiler, runtime, environment, execution mode, or case selection");
  }
  return manifest;
}

export function createRunConfig(runManifest) {
  validateRunManifest(runManifest);
  return { schemaVersion: RUN_CONFIG_SCHEMA_VERSION, runFingerprint: runManifest.runFingerprint, runManifest };
}

export function validateRunConfig(config, expectedManifest) {
  assertExactKeys(config, ["runFingerprint", "runManifest", "schemaVersion"], "run config");
  if (config.schemaVersion !== RUN_CONFIG_SCHEMA_VERSION) throw new Error(`unsupported run config schemaVersion '${config.schemaVersion}'`);
  validateRunManifest(config.runManifest);
  if (config.runFingerprint !== config.runManifest.runFingerprint) throw new Error("run config fingerprint does not match its manifest");
  if (expectedManifest !== undefined && config.runFingerprint !== expectedManifest.runFingerprint) {
    throw new Error("run config does not match the current run manifest");
  }
  return config;
}

function runtimeLocaleEvidence() {
  const locale = Intl.DateTimeFormat().resolvedOptions();
  return { locale: locale.locale, calendar: locale.calendar, numberingSystem: locale.numberingSystem, timeZone: locale.timeZone };
}

function checkoutEvidence(checkout) {
  return { revision: checkout.revision, tree: checkout.tree, objectFormat: checkout.objectFormat, dirty: checkout.dirty };
}

function runInputRoots() {
  const accepted = getActiveAcceptedOverlayBinding();
  return [
    { label: "suite-runner", path: scriptPath },
    { label: "suite-provenance-helper", path: provenanceHelperPath },
    { label: "suite-source-pin-verifier", path: sourcePinVerifierPath },
    { label: "suite-sealed-evidence-helper", path: sealedEvidenceHelperPath },
    { label: "suite-report-verifier", path: reportVerifierPath },
    { label: "suite-baseline-code", path: tsbaselineRoot },
    { label: "accepted-overlay-active", path: join(tsgoAcceptedRoot, "active.json") },
    { label: "accepted-overlay-plan", path: join(tsgoAcceptedRoot, accepted.plan.path) },
    { label: "accepted-overlay-legacy-manifest", path: join(tsgoAcceptedRoot, "manifest.json") },
    { label: "accepted-overlay-capture", path: accepted.capture.directory },
    { label: "accepted-overlay-binding", path: accepted.binding.directory },
    { label: "tsts-dist", path: distRoot },
    { label: "tsts-prepared-build", path: preparedBuildRoot },
    { label: "tsts-source", path: join(packageRoot, "src") },
    { label: "bundled-source-assets", path: bundledSourceRoot },
    { label: "source-pin", path: sourcePinPath },
    { label: "workspace-package", path: join(repoRoot, "package.json") },
    { label: "workspace-lock", path: join(repoRoot, "package-lock.json") },
    { label: "tsts-package", path: join(packageRoot, "package.json") },
    { label: "resolved-typescript-package", path: resolvedTypeScriptPackageRoot },
    { label: "vendored-typescript-lib-fallback", path: vendoredTypeScriptLibRoot },
  ];
}

function suiteChildEnvironment() {
  const inheritedKeys = process.platform === "win32"
    ? ["PATH", "HOME", "USERPROFILE", "TEMP", "TMP", "SystemRoot", "ComSpec", "PATHEXT"]
    : ["PATH", "HOME", "TMPDIR", "LD_LIBRARY_PATH", "DYLD_LIBRARY_PATH"];
  const environment = {};
  for (const key of inheritedKeys) {
    if (process.env[key] !== undefined) environment[key] = process.env[key];
  }
  environment.TZ = "UTC";
  environment.LANG = "C.UTF-8";
  environment.LC_ALL = "C.UTF-8";
  environment.NODE_OPTIONS = "";
  environment.NODE_PATH = "";
  environment.TSGO_CASE_TIMEOUT_MS = String(CASE_TIMEOUT_MS);
  environment.TSGO_POOL_TIMEOUT_MS = String(POOL_CASE_TIMEOUT_MS);
  if (suiteBuildId !== "") environment.TSTS_SUITE_BUILD_ID = suiteBuildId;
  return environment;
}

const expectedRunInputLabels = [
  "accepted-overlay-active",
  "accepted-overlay-binding",
  "accepted-overlay-capture",
  "accepted-overlay-legacy-manifest",
  "accepted-overlay-plan",
  "bundled-source-assets",
  "resolved-typescript-package",
  "source-pin",
  "suite-baseline-code",
  "suite-provenance-helper",
  "suite-report-verifier",
  "suite-runner",
  "suite-sealed-evidence-helper",
  "suite-source-pin-verifier",
  "tsts-dist",
  "tsts-prepared-build",
  "tsts-source",
  "tsts-package",
  "vendored-typescript-lib-fallback",
  "workspace-lock",
  "workspace-package",
].sort(compareUtf8);

function validateRuntimeEvidence(runtime, execution) {
  assertExactKeys(runtime, ["arch", "childEnvironment", "execArgv", "execPath", "hostname", "locale", "nodeVersion", "platform", "v8Version"], "run manifest runtime");
  validateFileProvenance(runtime.execPath, "run manifest runtime.execPath");
  for (const key of ["nodeVersion", "v8Version", "platform", "arch", "hostname"]) assertBoundedString(runtime[key], `run manifest runtime.${key}`, 1000, true);
  if (!Array.isArray(runtime.execArgv) || runtime.execArgv.length > 100 || !runtime.execArgv.every((entry) => typeof entry === "string" && entry.length <= 10000)) {
    throw new Error("run manifest runtime.execArgv is invalid");
  }
  assertExactKeys(runtime.locale, ["calendar", "locale", "numberingSystem", "timeZone"], "run manifest runtime.locale");
  for (const key of ["calendar", "locale", "numberingSystem", "timeZone"]) assertBoundedString(runtime.locale[key], `run manifest runtime.locale.${key}`, 1000, true);
  if (!Array.isArray(runtime.childEnvironment) || runtime.childEnvironment.length > 32) throw new Error("run manifest runtime.childEnvironment is invalid");
  const allowedNames = new Set(["ComSpec", "DYLD_LIBRARY_PATH", "HOME", "LANG", "LC_ALL", "LD_LIBRARY_PATH", "NODE_OPTIONS", "NODE_PATH", "PATH", "PATHEXT", "SystemRoot", "TEMP", "TMP", "TMPDIR", "TSGO_CASE_TIMEOUT_MS", "TSGO_POOL_TIMEOUT_MS", "TSTS_SUITE_BUILD_ID", "TZ", "USERPROFILE"]);
  let previousName = "";
  const environmentByName = new Map();
  for (const [index, entry] of runtime.childEnvironment.entries()) {
    assertExactKeys(entry, ["name", "value"], `run manifest runtime.childEnvironment[${index}]`);
    if (!allowedNames.has(entry.name) || (index > 0 && compareUtf8(previousName, entry.name) >= 0)) throw new Error("run manifest runtime.childEnvironment names are invalid");
    assertBoundedString(entry.value, `run manifest runtime.childEnvironment[${index}].value`, 1024 * 1024);
    environmentByName.set(entry.name, entry.value);
    previousName = entry.name;
  }
  const requiredValues = new Map([
    ["LANG", "C.UTF-8"], ["LC_ALL", "C.UTF-8"], ["NODE_OPTIONS", ""], ["NODE_PATH", ""], ["TZ", "UTC"],
    ["TSGO_CASE_TIMEOUT_MS", String(execution.caseTimeoutMs)], ["TSGO_POOL_TIMEOUT_MS", String(execution.poolCaseTimeoutMs)],
  ]);
  for (const [name, value] of requiredValues) {
    if (environmentByName.get(name) !== value) throw new Error(`run manifest runtime.childEnvironment.${name} is invalid`);
  }
  if (suiteBuildId !== "" && environmentByName.get("TSTS_SUITE_BUILD_ID") !== suiteBuildId) throw new Error("run manifest runtime.childEnvironment.TSTS_SUITE_BUILD_ID is invalid");
}

function validateUpstreamEvidence(upstream) {
  assertExactKeys(upstream, ["sourcePin", "tsgo", "typescript"], "run manifest upstream");
  assertExactKeys(upstream.sourcePin, ["path", "sha256", "tsgoObjectFormat", "tsgoRevision", "typescriptObjectFormat", "typescriptPath", "typescriptRevision"], "run manifest upstream.sourcePin");
  assertSafeRelativePath(upstream.sourcePin.path, "run manifest upstream.sourcePin.path");
  assertDigest(upstream.sourcePin.sha256, "run manifest upstream.sourcePin.sha256");
  validateCheckoutEvidence(upstream.tsgo, "run manifest upstream.tsgo");
  assertExactKeys(upstream.typescript, ["dirty", "name", "objectFormat", "path", "revision", "tree"], "run manifest upstream.typescript");
  if (upstream.typescript.name !== "TypeScript") throw new Error("run manifest TypeScript source name is invalid");
  assertSafeRelativePath(upstream.typescript.path, "run manifest upstream.typescript.path");
  validateCheckoutEvidence(upstream.typescript, "run manifest upstream.typescript", ["name", "path"]);
  if (upstream.sourcePin.tsgoRevision !== upstream.tsgo.revision || upstream.sourcePin.tsgoObjectFormat !== upstream.tsgo.objectFormat) throw new Error("run manifest TS-Go checkout does not match its source pin");
  if (upstream.sourcePin.typescriptPath !== upstream.typescript.path || upstream.sourcePin.typescriptRevision !== upstream.typescript.revision || upstream.sourcePin.typescriptObjectFormat !== upstream.typescript.objectFormat) throw new Error("run manifest TypeScript checkout does not match its source pin");
}

function validateCheckoutEvidence(checkout, label, additionalKeys = []) {
  assertExactKeys(checkout, ["dirty", "objectFormat", "revision", "tree", ...additionalKeys], label);
  if (!new Set(["sha1", "sha256"]).has(checkout.objectFormat) || checkout.dirty !== false) throw new Error(`${label} identity is invalid`);
  const objectIdPattern = checkout.objectFormat === "sha1" ? /^[0-9a-f]{40}$/ : DIGEST_PATTERN;
  if (!objectIdPattern.test(checkout.revision) || !objectIdPattern.test(checkout.tree)) throw new Error(`${label} object IDs are invalid`);
}

function validateInputInventory(inputs) {
  assertExactKeys(inputs, ["digest", "roots", "schemaVersion"], "run manifest inputs");
  if (inputs.schemaVersion !== 1 || !Array.isArray(inputs.roots)) throw new Error("run manifest inputs are invalid");
  const labels = [];
  for (const [index, root] of inputs.roots.entries()) {
    assertExactKeys(root, ["bytes", "digest", "fileCount", "kind", "label", "mode", "symlinkCount", "symlinkPolicy"], `run manifest input root ${index}`);
    assertBoundedString(root.label, `run manifest input root ${index}.label`, 1000, true);
    if (!new Set(["directory", "file", "symlink"]).has(root.kind) || !new Set(["reject", "resolved-contained"]).has(root.symlinkPolicy)) throw new Error(`run manifest input root ${index} kind is invalid`);
    assertMode(root.mode, `run manifest input root ${index}.mode`);
    for (const key of ["fileCount", "symlinkCount", "bytes"]) assertNonNegativeInteger(root[key], `run manifest input root ${index}.${key}`);
    assertDigest(root.digest, `run manifest input root ${index}.digest`);
    labels.push(root.label);
  }
  if (canonicalJson(labels) !== canonicalJson(expectedRunInputLabels)) throw new Error("run manifest input root labels are invalid");
  if (inputs.digest !== fingerprint(inputs.roots, "tsts-input-roots-v1")) throw new Error("run manifest input inventory digest does not match its roots");
}

export function validateInventory(inventory) {
  assertExactKeys(inventory, ["baselines", "currentHarness", "goTests", "schemaVersion", "typeScriptCases", "typeScriptUnitTests"], "test universe inventory");
  if (inventory.schemaVersion !== INVENTORY_SCHEMA_VERSION) throw new Error(`unsupported test universe inventory schemaVersion '${inventory.schemaVersion}'`);
  validateInventoryBucket(inventory.currentHarness, "test universe inventory.currentHarness");
  validateInventoryBucket(inventory.baselines, "test universe inventory.baselines");
  validateInventoryBucket(inventory.goTests, "test universe inventory.goTests");
  validateInventoryBucket(inventory.typeScriptCases, "test universe inventory.typeScriptCases", ["requiredFixtureFiles"]);
  assertExactKeys(inventory.typeScriptCases.entries, ["compiler", "conformance", "fourslash", "project", "transpile"], "test universe inventory.typeScriptCases.entries");
  assertExactKeys(inventory.typeScriptCases.requiredFixtureFiles, ["projects", "unittests"], "test universe inventory.typeScriptCases.requiredFixtureFiles");
  for (const [name, count] of Object.entries(inventory.typeScriptCases.requiredFixtureFiles)) assertNonNegativeInteger(count, `test universe inventory.typeScriptCases.requiredFixtureFiles.${name}`);
  const expectedFileBasedInScope = [...inScopeTypeScriptSuites].reduce((sum, suite) => sum + inventory.typeScriptCases.entries[suite], 0);
  const expectedFileBasedOutOfScope = [...outOfScopeTypeScriptSuites].reduce((sum, suite) => sum + inventory.typeScriptCases.entries[suite], 0);
  if (inventory.typeScriptCases.inScope !== expectedFileBasedInScope || inventory.typeScriptCases.outOfScope !== expectedFileBasedOutOfScope) throw new Error("test universe inventory TypeScript case scope classification is invalid");
  validateInventoryBucket(inventory.typeScriptUnitTests, "test universe inventory.typeScriptUnitTests");
  assertExactKeys(inventory.typeScriptUnitTests.entries, ["exportedModules", "supportModules"], "test universe inventory.typeScriptUnitTests.entries");
  if (inventory.typeScriptUnitTests.inScope !== inventory.typeScriptUnitTests.total || inventory.typeScriptUnitTests.outOfScope !== 0) throw new Error("test universe inventory TypeScript unit-test mirror scope is invalid");
  return inventory;
}

function validateInventoryBucket(bucket, label, extraKeys = []) {
  const keys = ["entries", "inScope", "outOfScope", "total", "unclassified"];
  keys.push(...extraKeys);
  assertExactKeys(bucket, keys, label);
  for (const key of ["inScope", "outOfScope", "total", "unclassified"]) assertNonNegativeInteger(bucket[key], `${label}.${key}`);
  if (bucket.inScope + bucket.outOfScope + bucket.unclassified !== bucket.total) throw new Error(`${label} classification totals do not match`);
  if (bucket.unclassified !== 0) throw new Error(`${label} contains unclassified entries`);
  assertPlainObject(bucket.entries, `${label}.entries`);
  let entriesTotal = 0;
  for (const [name, count] of Object.entries(bucket.entries)) {
    assertBoundedString(name, `${label}.entries key`, 1000, true);
    assertNonNegativeInteger(count, `${label}.entries.${name}`);
    entriesTotal += count;
    if (!Number.isSafeInteger(entriesTotal)) throw new Error(`${label}.entries total is unsafe`);
  }
  if (entriesTotal !== bucket.total) throw new Error(`${label}.entries do not match total`);
}

function validateProjectFixture(projectFixture, suite, label) {
  if (suite !== "project") {
    if (projectFixture !== null) throw new Error(`${label} must be null for a non-project case`);
    return;
  }
  assertPlainObject(projectFixture, label);
  if (projectFixture.kind === "absent") {
    assertExactKeys(projectFixture, ["kind"], label);
    return;
  }
  assertExactKeys(projectFixture, ["bytes", "digest", "fileCount", "kind", "label", "mode", "symlinkCount", "symlinkPolicy"], label);
  if (projectFixture.label !== "project-fixture" || projectFixture.kind !== "directory" || projectFixture.symlinkPolicy !== "reject") throw new Error(`${label} identity is invalid`);
  assertMode(projectFixture.mode, `${label}.mode`);
  for (const key of ["fileCount", "symlinkCount", "bytes"]) assertNonNegativeInteger(projectFixture[key], `${label}.${key}`);
  assertDigest(projectFixture.digest, `${label}.digest`);
}

function validateCorpusSuite(corpus, suite, label) {
  const supported = supportedSuitesByCorpus.get(corpus);
  if (supported === undefined || (suite !== "all" && !supported.has(suite))) throw new Error(`${label} corpus/suite is invalid`);
}

function validateFileProvenance(value, label, expectedPath) {
  const keys = expectedPath === undefined ? ["bytes", "sha256"] : ["bytes", "path", "sha256"];
  assertExactKeys(value, keys, label);
  assertNonNegativeInteger(value.bytes, `${label}.bytes`);
  assertDigest(value.sha256, `${label}.sha256`);
  if (expectedPath !== undefined && value.path !== expectedPath) throw new Error(`${label}.path is invalid`);
}

function assertPlainObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) {
    throw new Error(`${label} must be a plain object`);
  }
}

function assertExactKeys(value, expectedKeys, label) {
  assertPlainObject(value, label);
  if (canonicalJson(Object.keys(value).sort(compareUtf8)) !== canonicalJson([...expectedKeys].sort(compareUtf8))) throw new Error(`${label} keys are invalid`);
}

function assertBoundedString(value, label, maximumLength, nonempty = false) {
  if (typeof value !== "string" || value.length > maximumLength || (nonempty && value.length === 0) || value.includes("\0")) throw new Error(`${label} is invalid`);
}

function assertSafeRelativePath(value, label) {
  assertBoundedString(value, label, 10000, true);
  const parts = value.split("/");
  if (value.includes("\\") || value.startsWith("/") || parts.some((part) => part === "" || part === "." || part === "..") || posixPath.normalize(value) !== value) throw new Error(`${label} is not a safe relative path`);
}

function assertBoolean(value, label) {
  if (typeof value !== "boolean") throw new Error(`${label} must be a boolean`);
}

function assertPositiveInteger(value, label) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${label} must be a positive safe integer`);
}

function assertNonNegativeInteger(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`);
}

function assertMode(value, label) {
  if (!Number.isSafeInteger(value) || value < 0 || value > 0o777) throw new Error(`${label} is invalid`);
}

function assertDigest(value, label) {
  if (typeof value !== "string" || !DIGEST_PATTERN.test(value)) throw new Error(`${label} is invalid`);
}

export function caseFingerprint(runManifest, caseIndex) {
  const expected = runManifest.cases[caseIndex];
  if (expected === undefined) throw new Error(`case index ${caseIndex} is outside run manifest`);
  return fingerprint({ runFingerprint: runManifest.runFingerprint, case: expected }, "tsts-tsgo-suite-case-v3");
}

export function loadResultLedger(segmentPaths, runManifest) {
  validateRunManifest(runManifest);
  if (!Array.isArray(segmentPaths)) throw new Error("result segment paths must be an array");
  const recordsByIndex = new Map();
  const allRecords = [];
  const segmentEvidence = [];
  const expectedKeys = ["caseFingerprint", "caseId", "caseIndex", "result", "resultFingerprint", "runFingerprint", "schemaVersion"];
  const normalizedSegments = segmentPaths.map(normalizeResultSegmentInput).sort((left, right) => left.sequence - right.sequence);
  const seenSequences = new Set();
  for (const segment of normalizedSegments) {
    if (seenSequences.has(segment.sequence)) throw new Error(`duplicate result segment sequence ${segment.sequence}`);
    seenSequences.add(segment.sequence);
    const segmentPath = segment.path;
    const bytes = segment.content ?? readFileSync(segmentPath);
    const digest = createHash("sha256").update(bytes).digest("hex");
    const seal = segment.seal?.value;
    if (seal !== undefined) validateResultSegmentSeal(seal, runManifest, { segment: basename(segmentPath), sequence: segment.sequence });
    if (seal !== undefined && (seal.bytes !== bytes.length || seal.sha256 !== digest)) {
      throw new Error(`sealed result segment digest mismatch: ${segmentPath}`);
    }
    if (seal !== undefined && (bytes.length === 0 || bytes.at(-1) !== 0x0a)) throw new Error(`sealed result segment is not newline-complete: ${segmentPath}`);
    let text;
    try {
      text = strictUtf8Decoder.decode(bytes);
    } catch (error) {
      throw new Error(`result segment is not valid UTF-8: ${segmentPath}: ${error instanceof Error ? error.message : String(error)}`);
    }
    const finalNewline = text.lastIndexOf("\n");
    const lines = finalNewline < 0 ? [] : text.slice(0, finalNewline).split("\n");
    let segmentRecords = 0;
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex];
      if (line === "" || line.endsWith("\r")) throw new Error(`invalid blank or CRLF result ledger line in ${segmentPath}:${lineIndex + 1}`);
      if (Buffer.byteLength(line, "utf8") + 1 > runManifest.execution.resultRecordMaxBytes) throw new Error(`result ledger record exceeds its byte limit in ${segmentPath}:${lineIndex + 1}`);
      let record;
      try {
        record = JSON.parse(line);
      } catch (error) {
        throw new Error(`invalid result ledger JSON in ${segmentPath}:${lineIndex + 1}: ${error.message}`);
      }
      const keys = record !== null && typeof record === "object" && !Array.isArray(record) ? Object.keys(record).sort() : [];
      if (JSON.stringify(keys) !== JSON.stringify(expectedKeys)) throw new Error(`invalid result envelope keys in ${segmentPath}:${lineIndex + 1}`);
      if (record.schemaVersion !== RESULT_SCHEMA_VERSION) throw new Error(`invalid result schemaVersion in ${segmentPath}:${lineIndex + 1}`);
      if (record.runFingerprint !== runManifest.runFingerprint) throw new Error(`result run fingerprint mismatch in ${segmentPath}:${lineIndex + 1}`);
      if (!Number.isInteger(record.caseIndex) || record.caseIndex < 0 || record.caseIndex >= runManifest.total) throw new Error(`invalid result caseIndex in ${segmentPath}:${lineIndex + 1}`);
      const expectedCase = runManifest.cases[record.caseIndex];
      if (record.caseId !== expectedCase.id) throw new Error(`result case identity mismatch in ${segmentPath}:${lineIndex + 1}`);
      if (record.caseFingerprint !== caseFingerprint(runManifest, record.caseIndex)) throw new Error(`result case fingerprint mismatch in ${segmentPath}:${lineIndex + 1}`);
      if (record.result === null || typeof record.result !== "object" || Array.isArray(record.result)) throw new Error(`result payload must be an object in ${segmentPath}:${lineIndex + 1}`);
      validateResultPayload(record.result, `${segmentPath}:${lineIndex + 1}`);
      if (record.result.skipReason !== expectedCase.expectedSkipReason) throw new Error(`result skip disposition does not match run manifest in ${segmentPath}:${lineIndex + 1}`);
      if (record.resultFingerprint !== resultFingerprint(record.runFingerprint, record.caseFingerprint, record.result)) throw new Error(`result payload fingerprint mismatch in ${segmentPath}:${lineIndex + 1}`);
      if (caseIdentifier(record.result) !== record.caseId) throw new Error(`result payload identity mismatch in ${segmentPath}:${lineIndex + 1}`);
      const previous = recordsByIndex.get(record.caseIndex);
      if (previous !== undefined && resultCompletesCase(previous.result)) throw new Error(`duplicate completed result for case ${record.caseIndex}`);
      recordsByIndex.set(record.caseIndex, record);
      allRecords.push(record);
      segmentRecords += 1;
    }
    if (seal !== undefined && seal.records !== segmentRecords) throw new Error(`sealed result segment record count mismatch: ${segmentPath}`);
    segmentEvidence.push({ sequence: segment.sequence, path: segmentPath, bytes: bytes.length, sha256: digest, records: segmentRecords, seal: segment.seal ?? null });
  }
  const doneIndices = new Set([...recordsByIndex].filter(([, record]) => resultCompletesCase(record.result)).map(([index]) => index));
  return { recordsByIndex, allRecords, doneIndices, segmentEvidence };
}

export function validateResultPayload(result, location) {
  const expectedKeys = ["actualErrors", "caseDir", "configurationName", "corpus", "exactBaseline", "executionMismatchCount", "executionMismatches", "exitCode", "expectedErrors", "firstOutputLines", "infrastructureFailure", "relativePath", "signal", "skipReason", "status", "suite", "verdict"];
  assertExactKeys(result, expectedKeys, `result payload in ${location}`);
  validateCorpusSuite(result.corpus, result.suite, `result payload in ${location}`);
  assertSafeRelativePath(result.relativePath, `result payload relativePath in ${location}`);
  assertBoundedString(result.configurationName, `result payload configurationName in ${location}`, 10000);
  assertBoundedString(result.caseDir, `result payload caseDir in ${location}`, 20000);
  assertBoundedString(result.skipReason, `result payload skipReason in ${location}`, 10000);
  if (result.caseDir !== "" && (!isAbsolute(result.caseDir) || resolve(result.caseDir) !== result.caseDir)) throw new Error(`result payload caseDir is not a canonical absolute path in ${location}`);
  if (!new Set(["pass", "fail", "skip"]).has(result.status)) throw new Error(`result payload status is invalid in ${location}`);
  if (typeof result.expectedErrors !== "boolean" || typeof result.actualErrors !== "boolean" || typeof result.infrastructureFailure !== "boolean") {
    throw new Error(`result payload booleans are invalid in ${location}`);
  }
  if (!Number.isSafeInteger(result.exitCode) || result.exitCode < 0) throw new Error(`result payload exitCode is invalid in ${location}`);
  if (result.signal !== null && (typeof result.signal !== "string" || !/^SIG[A-Z0-9]+$/.test(result.signal))) throw new Error(`result payload signal is invalid in ${location}`);
  if (!Array.isArray(result.firstOutputLines) || result.firstOutputLines.length > 20 || !result.firstOutputLines.every((line) => typeof line === "string" && line.length <= 1000)) {
    throw new Error(`result payload firstOutputLines is invalid in ${location}`);
  }
  assertNonNegativeInteger(result.executionMismatchCount, `result payload executionMismatchCount in ${location}`);
  validateBaselineSamples(result.executionMismatches, result.executionMismatchCount, `result payload executionMismatches in ${location}`);
  if (result.exactBaseline !== null) validateExactBaseline(result.exactBaseline, location);
  if (result.skipReason !== "" && (result.infrastructureFailure || result.exitCode !== 0 || result.signal !== null || result.actualErrors || result.exactBaseline !== null || result.executionMismatchCount !== 0 || result.caseDir === "")) throw new Error(`skipped result evidence is contradictory in ${location}`);
  if (result.skipReason === "" && result.status === "skip") throw new Error(`result cannot skip without a reason in ${location}`);
  if (!result.infrastructureFailure && result.caseDir === "") throw new Error(`completed result must retain its case directory in ${location}`);
  if (result.exactBaseline !== null && result.exactBaseline.expectedDiagnosticsPresent !== result.expectedErrors) throw new Error(`exact baseline expected diagnostics do not match result evidence in ${location}`);
  if (result.exactBaseline?.usedHarness === true && result.exactBaseline.actualErrors !== result.actualErrors && result.executionMismatchCount === 0) throw new Error(`harness diagnostics do not match result evidence in ${location}`);
  const expectedVerdict = deriveResultVerdict(result);
  if (canonicalJson(result.verdict) !== canonicalJson(expectedVerdict)) throw new Error(`result verdict does not match its evidence in ${location}`);
  if (result.status !== deriveResultStatus(expectedVerdict)) throw new Error(`result status does not match its verdict in ${location}`);
  return result;
}

export function deriveResultVerdict(result) {
  const skipped = result.skipReason !== "";
  return {
    schemaVersion: RESULT_VERDICT_SCHEMA_VERSION,
    kind: skipped ? "skipped" : result.infrastructureFailure ? "infrastructure-failure" : "executed",
    diagnosticsMatch: skipped ? null : result.expectedErrors === result.actualErrors,
    exitCodeAccepted: skipped ? null : result.exitCode === 0 || (result.expectedErrors && result.actualErrors),
    signalAbsent: skipped ? null : result.signal === null,
    exactBaselineMatch: skipped ? null : result.exactBaseline === null || (result.exactBaseline.status === "pass" && result.exactBaseline.mismatchCount === 0),
    executionMatch: skipped ? null : result.executionMismatchCount === 0,
  };
}

export function deriveResultStatus(verdict) {
  assertExactKeys(verdict, ["diagnosticsMatch", "exactBaselineMatch", "executionMatch", "exitCodeAccepted", "kind", "schemaVersion", "signalAbsent"], "result verdict");
  if (verdict.schemaVersion !== RESULT_VERDICT_SCHEMA_VERSION || !new Set(["executed", "infrastructure-failure", "skipped"]).has(verdict.kind)) throw new Error("result verdict identity is invalid");
  if (verdict.kind === "skipped") {
    if ([verdict.diagnosticsMatch, verdict.exitCodeAccepted, verdict.signalAbsent, verdict.exactBaselineMatch, verdict.executionMatch].some((value) => value !== null)) throw new Error("skipped result verdict fields must be null");
    return "skip";
  }
  if (![verdict.diagnosticsMatch, verdict.exitCodeAccepted, verdict.signalAbsent, verdict.exactBaselineMatch, verdict.executionMatch].every((value) => typeof value === "boolean")) throw new Error("executed result verdict fields must be booleans");
  return verdict.kind === "executed" && verdict.diagnosticsMatch && verdict.exitCodeAccepted && verdict.signalAbsent && verdict.exactBaselineMatch && verdict.executionMatch ? "pass" : "fail";
}

export function resultCompletesCase(result) {
  return result.infrastructureFailure === false;
}

function validateExactBaseline(baseline, location) {
  assertExactKeys(baseline, ["actualErrors", "checked", "comparable", "expectedDiagnosticsPresent", "mismatchCount", "mismatches", "schemaVersion", "status", "tsgoAccepted", "tsgoAcceptedCount", "unsupported", "unsupportedCount", "usedHarness"], `result exactBaseline in ${location}`);
  if (baseline.schemaVersion !== EXACT_BASELINE_SCHEMA_VERSION || !new Set(["pass", "fail"]).has(baseline.status)) throw new Error(`result exactBaseline identity is invalid in ${location}`);
  for (const key of ["checked", "comparable", "mismatchCount", "tsgoAcceptedCount", "unsupportedCount"]) assertNonNegativeInteger(baseline[key], `result exactBaseline.${key} in ${location}`);
  for (const key of ["expectedDiagnosticsPresent", "usedHarness"]) assertBoolean(baseline[key], `result exactBaseline.${key} in ${location}`);
  if (baseline.actualErrors !== null && typeof baseline.actualErrors !== "boolean") throw new Error(`result exactBaseline.actualErrors is invalid in ${location}`);
  if ((baseline.usedHarness && typeof baseline.actualErrors !== "boolean") || (!baseline.usedHarness && baseline.actualErrors !== null)) throw new Error(`result exactBaseline harness evidence is invalid in ${location}`);
  validateBaselineSamples(baseline.mismatches, baseline.mismatchCount, `result exactBaseline.mismatches in ${location}`);
  validateBaselineSamples(baseline.tsgoAccepted, baseline.tsgoAcceptedCount, `result exactBaseline.tsgoAccepted in ${location}`);
  validateBaselineSamples(baseline.unsupported, baseline.unsupportedCount, `result exactBaseline.unsupported in ${location}`);
  const expectedStatus = baseline.mismatchCount === 0 ? "pass" : "fail";
  if (baseline.status !== expectedStatus) throw new Error(`result exactBaseline status does not match mismatches in ${location}`);
}

function validateBaselineSamples(samples, count, label) {
  if (!Array.isArray(samples) || samples.length !== Math.min(count, MAX_BASELINE_SAMPLES) || !samples.every((entry) => typeof entry === "string" && entry.length <= MAX_BASELINE_SAMPLE_LENGTH)) throw new Error(`${label} is invalid`);
}

export function resultFingerprint(runFingerprint, caseFingerprintValue, result) {
  return fingerprint({ runFingerprint, caseFingerprint: caseFingerprintValue, result }, "tsts-tsgo-suite-result-v2");
}

export function resultSegmentPaths(reportRoot) {
  if (!existsSync(reportRoot)) return [];
  const rootStat = lstatSync(reportRoot);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) throw new Error(`result report root must be a regular directory: ${reportRoot}`);
  const candidates = readdirSync(reportRoot, { withFileTypes: true }).filter((entry) => entry.name.startsWith("results-"));
  const invalid = candidates.filter((entry) => !entry.isFile() || !RESULT_SEGMENT_NAME_PATTERN.test(entry.name));
  if (invalid.length !== 0) throw new Error(`invalid result segment entries: ${invalid.map((entry) => entry.name).join(", ")}`);
  const paths = candidates.map((entry) => join(reportRoot, entry.name)).sort(compareUtf8);
  for (let index = 0; index < paths.length; index += 1) {
    const expectedName = `results-${String(index + 1).padStart(4, "0")}.ndjson`;
    if (paths[index] !== join(reportRoot, expectedName)) throw new Error(`result segment sequence has a gap before ${expectedName}`);
  }
  return paths;
}

export function sealedResultSegments(reportRoot, runManifest) {
  validateRunManifest(runManifest);
  const segments = resultSegmentPaths(reportRoot);
  const sealsRoot = join(reportRoot, "segment-seals");
  if (!existsSync(sealsRoot)) return [];
  const sealsStat = lstatSync(sealsRoot);
  if (!sealsStat.isDirectory() || sealsStat.isSymbolicLink()) throw new Error(`result segment seals root must be a regular directory: ${sealsRoot}`);
  const sealEntries = readdirSync(sealsRoot, { withFileTypes: true });
  const expectedSealNames = new Set(segments.map((segment) => `${segment.split(sep).at(-1)}.json`));
  for (const entry of sealEntries) {
    if (!entry.isFile() || !expectedSealNames.has(entry.name)) throw new Error(`invalid or orphan result segment seal '${entry.name}'`);
  }
  const sealed = [];
  for (const segment of segments) {
    const segmentName = basename(segment);
    const sequence = resultSegmentSequence(segmentName);
    const sealPath = join(sealsRoot, `${segmentName}.json`);
    if (!existsSync(sealPath)) continue;
    const sealBytes = readFileSync(sealPath);
    const seal = parseJsonBytes(sealBytes, `result segment seal '${sealPath}'`);
    validateResultSegmentSeal(seal, runManifest, { segment: segmentName, sequence });
    sealed.push({
      sequence,
      path: segment,
      seal: { path: sealPath, bytes: sealBytes.length, sha256: sha256(sealBytes), value: seal },
    });
  }
  return sealed;
}

export async function sealResultSegment(reportRoot, segmentPath, runManifest, options = {}) {
  validateRunManifest(runManifest);
  const root = resolve(reportRoot);
  const resolvedSegment = resolve(segmentPath);
  const segmentName = basename(resolvedSegment);
  if (dirname(resolvedSegment) !== root || !RESULT_SEGMENT_NAME_PATTERN.test(segmentName)) throw new Error(`result segment path is outside the report root: ${segmentPath}`);
  const segmentStat = lstatSync(resolvedSegment);
  if (!segmentStat.isFile() || segmentStat.isSymbolicLink()) throw new Error(`result segment must be a regular file: ${segmentPath}`);
  await syncFile(resolvedSegment);
  const bytes = readFileSync(resolvedSegment);
  if (bytes.length === 0 || bytes.at(-1) !== 0x0a) throw new Error(`refusing to seal a result segment without a complete newline: ${segmentPath}`);
  const records = loadResultLedger([resolvedSegment], runManifest).allRecords.length;
  if (records === 0) throw new Error(`refusing to seal an empty result segment: ${segmentPath}`);
  const sequence = resultSegmentSequence(segmentName);
  const unsigned = {
    schemaVersion: RESULT_SEGMENT_SEAL_SCHEMA_VERSION,
    attemptId: options.attemptId ?? randomUUID(),
    runFingerprint: runManifest.runFingerprint,
    segment: segmentName,
    sequence,
    bytes: bytes.length,
    sha256: sha256(bytes),
    records,
  };
  const seal = { ...unsigned, sealFingerprint: fingerprint(unsigned, "tsts-tsgo-suite-result-segment-seal-v2") };
  validateResultSegmentSeal(seal, runManifest, { segment: segmentName, sequence });
  const sealsRoot = join(root, "segment-seals");
  await mkdir(sealsRoot, { recursive: true });
  const destination = join(sealsRoot, `${seal.segment}.json`);
  if (existsSync(destination)) throw new Error(`refusing to replace result segment seal '${destination}'`);
  const stagingRoot = join(root, "segment-seal-staging");
  await mkdir(stagingRoot, { recursive: true });
  const staging = join(stagingRoot, `${seal.segment}.partial-${randomUUID()}`);
  await writeDurableFileExclusive(staging, `${JSON.stringify(seal, null, 2)}\n`);
  await rename(staging, destination);
  await syncDirectory(sealsRoot);
  await syncDirectory(root);
  const sealBytes = readFileSync(destination);
  return { sequence, path: resolvedSegment, seal: { path: destination, bytes: sealBytes.length, sha256: sha256(sealBytes), value: seal } };
}

export function validateResultSegmentSeal(seal, runManifest, expected = {}) {
  assertExactKeys(seal, ["attemptId", "bytes", "records", "runFingerprint", "schemaVersion", "sealFingerprint", "segment", "sequence", "sha256"], "result segment seal");
  if (seal.schemaVersion !== RESULT_SEGMENT_SEAL_SCHEMA_VERSION || !UUID_V4_PATTERN.test(seal.attemptId)) throw new Error("result segment seal identity is invalid");
  if (seal.runFingerprint !== runManifest.runFingerprint || !RESULT_SEGMENT_NAME_PATTERN.test(seal.segment) || resultSegmentSequence(seal.segment) !== seal.sequence) throw new Error("result segment seal provenance is invalid");
  if (expected.segment !== undefined && seal.segment !== expected.segment) throw new Error("result segment seal filename does not match");
  if (expected.sequence !== undefined && seal.sequence !== expected.sequence) throw new Error("result segment seal sequence does not match");
  assertPositiveInteger(seal.bytes, "result segment seal.bytes");
  assertPositiveInteger(seal.records, "result segment seal.records");
  assertDigest(seal.sha256, "result segment seal.sha256");
  if (seal.bytes > runManifest.execution.resultSegmentMaxBytes || seal.records > runManifest.execution.resultSegmentMaxRecords) throw new Error("result segment seal exceeds configured bounds");
  const { sealFingerprint, ...unsigned } = seal;
  if (sealFingerprint !== fingerprint(unsigned, "tsts-tsgo-suite-result-segment-seal-v2")) throw new Error("result segment seal fingerprint does not match its contents");
  return seal;
}

function nextResultSegmentPath(reportRoot) {
  const existing = resultSegmentPaths(reportRoot);
  if (existing.length >= 9999) throw new Error("result segment sequence is exhausted");
  return join(reportRoot, `results-${String(existing.length + 1).padStart(4, "0")}.ndjson`);
}

function normalizeResultSegmentInput(entry) {
  const normalized = typeof entry === "string" ? { path: entry } : entry;
  assertPlainObject(normalized, "result segment input");
  if (typeof normalized.path !== "string") throw new Error("result segment input path must be a string");
  const sequence = normalized.sequence ?? resultSegmentSequence(basename(normalized.path));
  if (sequence !== resultSegmentSequence(basename(normalized.path))) throw new Error(`result segment input sequence does not match '${normalized.path}'`);
  if (normalized.content !== undefined && !Buffer.isBuffer(normalized.content)) throw new Error(`result segment input content must be a Buffer: ${normalized.path}`);
  if (normalized.seal !== undefined) {
    assertExactKeys(normalized.seal, ["bytes", "path", "sha256", "value"], `result segment seal evidence for ${normalized.path}`);
    if (typeof normalized.seal.path !== "string") throw new Error(`result segment seal evidence path is invalid for ${normalized.path}`);
    validateFileProvenance({ bytes: normalized.seal.bytes, sha256: normalized.seal.sha256 }, `result segment seal evidence for ${normalized.path}`);
  }
  return { path: normalized.path, sequence, content: normalized.content, seal: normalized.seal };
}

function resultSegmentSequence(segmentName) {
  const match = RESULT_SEGMENT_NAME_PATTERN.exec(segmentName);
  if (match === null) throw new Error(`invalid result segment name '${segmentName}'`);
  const sequence = Number(match[1]);
  if (sequence < 1) throw new Error(`invalid result segment sequence '${segmentName}'`);
  return sequence;
}

function parseJsonBytes(bytes, label) {
  let text;
  try {
    text = strictUtf8Decoder.decode(bytes);
  } catch (error) {
    throw new Error(`${label} is not valid UTF-8: ${error instanceof Error ? error.message : String(error)}`);
  }
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`${label} is not valid JSON: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

export function createResultRecord(runManifest, caseIndex, result) {
  const trimmed = trimResult(result);
  const expectedCase = runManifest.cases[caseIndex];
  if (expectedCase === undefined) throw new Error(`case index ${caseIndex} is outside run manifest`);
  if (caseIdentifier(trimmed) !== expectedCase.id) throw new Error(`result identity does not match run manifest case ${caseIndex}`);
  if (trimmed.skipReason !== expectedCase.expectedSkipReason) throw new Error(`result skip disposition does not match run manifest case ${caseIndex}`);
  const caseFingerprintValue = caseFingerprint(runManifest, caseIndex);
  return {
    schemaVersion: RESULT_SCHEMA_VERSION,
    runFingerprint: runManifest.runFingerprint,
    caseIndex,
    caseId: expectedCase.id,
    caseFingerprint: caseFingerprintValue,
    result: trimmed,
    resultFingerprint: resultFingerprint(runManifest.runFingerprint, caseFingerprintValue, trimmed),
  };
}

export async function createResultSegmentWriter(reportRoot, runManifest, options = {}) {
  validateRunManifest(runManifest);
  const root = resolve(reportRoot);
  const rootStat = lstatSync(root);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) throw new Error(`result report root must be a regular directory: ${root}`);
  const attemptId = options.attemptId ?? randomUUID();
  if (!UUID_V4_PATTERN.test(attemptId)) throw new Error(`invalid result segment attempt ID '${attemptId}'`);
  let handle;
  let segmentPath;
  let segmentBytes = 0;
  let segmentRecords = 0;
  let closed = false;
  const sealedSegments = [];

  const openSegment = async () => {
    segmentPath = nextResultSegmentPath(root);
    handle = await open(segmentPath, "wx", 0o644);
    segmentBytes = 0;
    segmentRecords = 0;
    await syncDirectory(root);
  };

  const closeSegment = async () => {
    if (handle === undefined) return;
    await handle.datasync();
    await handle.close();
    handle = undefined;
    if (segmentRecords === 0) throw new Error(`result segment was opened without a record: ${segmentPath}`);
    sealedSegments.push(await sealResultSegment(root, segmentPath, runManifest, { attemptId }));
    segmentPath = undefined;
    segmentBytes = 0;
    segmentRecords = 0;
  };

  return {
    get sealedSegments() {
      return [...sealedSegments];
    },
    async append(caseIndex, result) {
      if (closed) throw new Error("result segment writer is closed");
      const record = createResultRecord(runManifest, caseIndex, result);
      const line = Buffer.from(`${JSON.stringify(record)}\n`, "utf8");
      if (line.length > runManifest.execution.resultRecordMaxBytes) throw new Error(`result record for case ${caseIndex} exceeds ${runManifest.execution.resultRecordMaxBytes} bytes`);
      if (handle !== undefined && (segmentRecords >= runManifest.execution.resultSegmentMaxRecords || segmentBytes + line.length > runManifest.execution.resultSegmentMaxBytes)) await closeSegment();
      if (handle === undefined) await openSegment();
      let offset = 0;
      while (offset < line.length) {
        const { bytesWritten } = await handle.write(line, offset, line.length - offset, segmentBytes + offset);
        if (bytesWritten <= 0) throw new Error(`short write while persisting result case ${caseIndex}`);
        offset += bytesWritten;
      }
      segmentBytes += line.length;
      segmentRecords += 1;
      if (segmentRecords >= runManifest.execution.resultSegmentMaxRecords || segmentBytes >= runManifest.execution.resultSegmentMaxBytes) await closeSegment();
      return record;
    },
    async close() {
      if (closed) return;
      closed = true;
      await closeSegment();
    },
  };
}

// Process-pool runner. Each "job" is a long-lived worker process (this same
// script re-forked with TSGO_SUITE_WORKER=1) that loads the compiler + harness
// once and then evaluates whole cases (emit + exact-baseline assembly +
// comparison) off a shared queue. The heavy per-case work (in-process compile +
// .types/.symbols walk) is CPU-bound and would otherwise serialize on one event
// loop; running it across N worker processes is what actually keeps all cores
// busy. --jobs sets the pool size (default = all cores; --jobs 1 = serial).
// Results stream to a numbered segment tagged with caseIndex, so discovery order is
// restored on read regardless of completion order.
export function bindWorkerResultMessage(activeAssignment, message) {
  if (activeAssignment === null || activeAssignment === undefined) {
    throw new Error("worker returned a result without an active assignment");
  }
  if (message === null || typeof message !== "object" || Array.isArray(message)) {
    throw new Error("worker result message must be an object");
  }
  const keys = Object.keys(message).sort();
  if (JSON.stringify(keys) !== JSON.stringify(["assignmentId", "caseIndex", "result", "type"])) {
    throw new Error("worker result message has invalid fields");
  }
  if (message.type !== "result") {
    throw new Error(`worker result message has invalid type '${message.type}'`);
  }
  if (!Number.isSafeInteger(message.caseIndex) || message.caseIndex < 0) {
    throw new Error("worker result message has an invalid case index");
  }
  if (!UUID_V4_PATTERN.test(message.assignmentId)) {
    throw new Error("worker result message has an invalid assignment ID");
  }
  if (message.caseIndex !== activeAssignment.caseIndex || message.assignmentId !== activeAssignment.assignmentId) {
    throw new Error(`worker result does not match active assignment case ${activeAssignment.caseIndex}`);
  }
  return { assignment: activeAssignment, result: message.result };
}

export async function runQueue(testCases, runRoot, reportRoot, jobs, failFast, options, runManifest, doneIndices = new Set(), workerRuntime = {}) {
  const forkWorkerProcess = workerRuntime.forkWorkerProcess ?? (() => fork(scriptPath, [], {
    env: { ...suiteChildEnvironment(), TSGO_SUITE_WORKER: "1" },
    stdio: ["ignore", "ignore", "inherit", "ipc"],
    // Advanced (V8 structured-clone) IPC preserves Map/Set/etc. in the case
    // descriptor (e.g. testCase.settings is a Map); the default JSON IPC
    // would silently flatten Maps to {} and break materializeCase.
    serialization: "advanced",
  }));
  if (typeof forkWorkerProcess !== "function") throw new Error("worker runtime forkWorkerProcess must be a function");
  const segmentWriter = await createResultSegmentWriter(reportRoot, runManifest);
  const total = testCases.length;
  // Backstop for an in-process hang inside a worker (e.g. an infinite loop in
  // the baseline assembly that the CLI's own timeout can't catch): kill+replace
  // the worker. Longer than the CLI's per-spawn timeout so real CLI timeouts
  // surface as themselves first.
  let appendChain = Promise.resolve();
  let completed = doneIndices.size;
  let cursor = 0;
  let stopped = false;
  let interruptedSignal = null;
  const children = new Set();

  const persist = async (caseIndex, result) => {
    const append = appendChain.then(() => segmentWriter.append(caseIndex, result));
    appendChain = append;
    const record = await append;
    completed += 1;
    if (record.result.status === "fail" && failFast) {
      stopped = true;
    }
    printProgress(completed, total, record.result);
  };

  const failResult = (testCase, stderr, signal) => ({
    ...testCase,
    caseDir: "",
    expectedErrors: false,
    actualErrors: true,
    exitCode: 1,
    signal: signal ?? null,
    status: "fail",
    skipReason: "",
    stdout: "",
    stderr,
    infrastructureFailure: true,
  });

  if (total === 0 || completed >= total) {
    await segmentWriter.close();
    return { resultSegments: segmentWriter.sealedSegments, completed, interruptedSignal };
  }

  const interrupt = (signal) => {
    if (interruptedSignal !== null) return;
    interruptedSignal = signal;
    stopped = true;
    for (const child of children) {
      try { child.kill("SIGTERM"); } catch {}
    }
  };
  const onSigint = () => interrupt("SIGINT");
  const onSigterm = () => interrupt("SIGTERM");
  process.once("SIGINT", onSigint);
  process.once("SIGTERM", onSigterm);

  try {
    await new Promise((resolve, reject) => {
    const poolSize = Math.max(1, Math.min(jobs, total));
    let liveWorkers = 0;
    let spawnedTotal = 0;
    const maxSpawns = total + poolSize * 8; // respawn cap so a startup crash loop can't hang the run
    let done = false;
    const pendingSettlements = new Set();

    const abort = (error) => {
      if (done) return;
      done = true;
      stopped = true;
      for (const child of children) {
        try { child.kill("SIGTERM"); } catch {}
      }
      reject(error);
    };

    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };

    const finishWhenSettled = () => {
      Promise.all([...pendingSettlements]).then(() => appendChain).then(finish, abort);
    };

    const spawnWorker = () => {
      if (stopped) {
        if (liveWorkers === 0) finishWhenSettled();
        return;
      }
      if (spawnedTotal >= maxSpawns) {
        if (liveWorkers === 0) finishWhenSettled();
        return;
      }
      spawnedTotal += 1;
      const child = forkWorkerProcess();
      children.add(child);
      liveWorkers += 1;
      const state = { assignment: null, settled: true, timer: null, ready: false, retiring: false, retiredAssignment: null };

      const settle = async (assignment, result) => {
        if (state.settled) return; // exactly one resolution per assigned case
        if (
          state.assignment === null
          || state.assignment.caseIndex !== assignment.caseIndex
          || state.assignment.assignmentId !== assignment.assignmentId
        ) {
          throw new Error(`worker settlement does not match active assignment case ${assignment.caseIndex}`);
        }
        state.settled = true;
        if (state.timer) { clearTimeout(state.timer); state.timer = null; }
        state.assignment = null;
        await persist(assignment.caseIndex, result);
        if (completed >= total) finish();
      };

      const trackedSettle = (assignment, result) => {
        const pending = settle(assignment, result);
        pendingSettlements.add(pending);
        pending.then(
          () => pendingSettlements.delete(pending),
          () => pendingSettlements.delete(pending),
        );
        return pending;
      };

      const assignNext = () => {
        // Skip cases already recorded by a suspended run (--resume).
        while (cursor < total && doneIndices.has(cursor)) {
          cursor += 1;
        }
        if (stopped || cursor >= total) {
          try { child.send({ type: "shutdown" }); } catch { try { child.kill(); } catch {} }
          return;
        }
        const idx = cursor++;
        const assignment = { caseIndex: idx, assignmentId: randomUUID() };
        state.assignment = assignment;
        state.settled = false;
        state.timer = setTimeout(() => {
          // In-process hang: kill the worker; settle() records the timeout fail,
          // and the exit handler replaces the worker if work remains.
          state.retiring = true;
          state.retiredAssignment = assignment;
          try { child.kill("SIGKILL"); } catch {}
          trackedSettle(assignment, failResult(testCases[idx], `TSTS case exceeded ${POOL_CASE_TIMEOUT_MS}ms in worker (killed).`, "SIGKILL")).catch(abort);
        }, POOL_CASE_TIMEOUT_MS);
        const attemptRoot = join(runRoot, `${String(idx).padStart(6, "0")}-${caseFingerprint(runManifest, idx).slice(0, 16)}-${randomUUID()}`);
        try {
          child.send({ type: "case", caseIndex: idx, assignmentId: assignment.assignmentId, testCase: testCases[idx], runRoot: attemptRoot, options });
        } catch {
          // Send failed (worker already dead); the exit handler settles + respawns.
        }
      };

      child.on("message", (msg) => {
        if (msg && msg.type === "ready") {
          if (state.ready || state.assignment !== null || state.retiring) {
            abort(new Error("worker sent an unexpected ready message"));
            return;
          }
          state.ready = true;
          assignNext();
          return;
        }
        if (msg && msg.type === "result") {
          try {
            if (state.retiring) {
              bindWorkerResultMessage(state.retiredAssignment, msg);
              return;
            }
            const bound = bindWorkerResultMessage(state.assignment, msg);
            trackedSettle(bound.assignment, bound.result).then(() => {
              if (!stopped && cursor < total) assignNext();
              else { try { child.send({ type: "shutdown" }); } catch { try { child.kill(); } catch {} } }
            }, abort);
          } catch (error) {
            abort(error);
          }
          return;
        }
        abort(new Error("worker sent an invalid protocol message"));
      });

      child.on("exit", () => {
        children.delete(child);
        liveWorkers -= 1;
        // Crash with an unsettled in-flight case → record a fail for it.
        if (!state.settled && state.assignment !== null) {
          const assignment = state.assignment;
          trackedSettle(assignment, failResult(testCases[assignment.caseIndex], "TSTS worker crashed before returning a result.", null)).catch(abort);
        }
        if (!stopped && cursor < total) {
          spawnWorker();
        } else if (liveWorkers === 0) {
          finishWhenSettled();
        }
      });
    };

    for (let i = 0; i < poolSize; i++) spawnWorker();
    });
    await appendChain;
  } catch (error) {
    stopped = true;
    for (const child of children) {
      try { child.kill("SIGTERM"); } catch {}
    }
    throw error;
  } finally {
    process.removeListener("SIGINT", onSigint);
    process.removeListener("SIGTERM", onSigterm);
    await appendChain.catch(() => {});
    await segmentWriter.close();
  }
  return { resultSegments: segmentWriter.sealedSegments, completed, interruptedSignal };
}

// Worker mode: this same script, re-forked with TSGO_SUITE_WORKER=1. It loads
// the compiler + harness lazily on its first case and then evaluates whole
// cases handed over IPC, returning the trimmed result. Staying warm means the
// ~12s bundled-lib load is paid once per worker, not once per case.
function runWorkerLoop() {
  process.on("message", async (msg) => {
    if (!msg) return;
    if (msg.type === "case") {
      let result;
      try {
        result = await runCase(msg.testCase, msg.runRoot, msg.options);
      } catch (error) {
        result = {
          ...msg.testCase,
          caseDir: "",
          expectedErrors: false,
          actualErrors: true,
          exitCode: 1,
          signal: null,
          status: "fail",
          skipReason: "",
          stdout: "",
          stderr: `TSTS worker error: ${error instanceof Error ? error.stack : String(error)}`,
          infrastructureFailure: true,
        };
      }
      try { process.send({ type: "result", caseIndex: msg.caseIndex, assignmentId: msg.assignmentId, result }); } catch {}
    } else if (msg.type === "shutdown") {
      process.exit(0);
    }
  });
  try { process.send({ type: "ready" }); } catch {}
}

// Read the streamed records back, restore discovery order, and strip the
// caseIndex envelope so the returned records match the results.json shape.
// Every record was trimmed (capped, flattened) at write time, so the
// materialized array is bounded regardless of per-case output sizes.
export async function readResults(segmentPaths, runManifest) {
  const ledger = loadResultLedger(Array.isArray(segmentPaths) ? segmentPaths : [segmentPaths], runManifest);
  return [...ledger.recordsByIndex.entries()]
    .sort(([left], [right]) => left - right)
    .map(([, record]) => record.result);
}

function printProgress(done, total, result) {
  const prefix = result.status === "pass" ? "PASS" : result.status === "skip" ? "SKIP" : "FAIL";
  const configuration = result.configurationName === "" ? "" : ` configuration=${result.configurationName}`;
  const skip = result.skipReason === "" ? "" : ` reason=${result.skipReason}`;
  const tsgoAccepted = (result.exactBaseline?.tsgoAcceptedCount ?? 0) === 0 ? "" : ` tsgoAccepted=${result.exactBaseline.tsgoAcceptedCount}`;
  const baseline = result.exactBaseline === null || result.exactBaseline === undefined ? "" : ` exactBaselines=${result.exactBaseline.status} mismatches=${result.exactBaseline.mismatchCount}${tsgoAccepted}`;
  console.log(`${prefix} ${done}/${total} ${result.relativePath}${configuration} expectedErrors=${result.expectedErrors} actualErrors=${result.actualErrors}${baseline}${skip}`);
  if (done % 100 === 0 || total <= 20 || process.env.TSGO_MEM_EVERY === "1") {
    const m = process.memoryUsage();
    const mb = (n) => Math.round(n / 1024 / 1024);
    console.log(`MEM ${done}/${total} rss=${mb(m.rss)}MB heapUsed=${mb(m.heapUsed)}MB heapTotal=${mb(m.heapTotal)}MB external=${mb(m.external)}MB arrayBuffers=${mb(m.arrayBuffers)}MB`);
  }
}

async function writeReports(reportRoot, segmentPaths, inventory, caseRoot, runManifest) {
  const ledger = loadResultLedger(segmentPaths, runManifest);
  const results = [...ledger.recordsByIndex.entries()].sort(([left], [right]) => left - right).map(([, record]) => record.result);
  const summary = buildReportSummary(runManifest, results);
  const reportsRoot = join(reportRoot, "reports");
  await mkdir(reportsRoot, { recursive: true });
  await syncDirectory(reportRoot);
  const reportNumbers = readdirSync(reportsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^report-\d{4}$/.test(entry.name))
    .map((entry) => Number(entry.name.slice("report-".length)));
  const reportNumber = (reportNumbers.length === 0 ? 0 : Math.max(...reportNumbers)) + 1;
  const reportName = `report-${String(reportNumber).padStart(4, "0")}`;
  const staging = join(reportsRoot, `${reportName}.partial-${randomUUID()}`);
  const destination = join(reportsRoot, reportName);
  await mkdir(staging);
  await syncDirectory(reportsRoot);
  const resultSegments = ledger.segmentEvidence.map((entry) => reportSegmentEvidence(entry, reportRoot));
  const runConfigPath = join(reportRoot, "run-config.json");
  const runConfigBytes = readFileSync(runConfigPath);
  validateRunConfig(parseJsonBytes(runConfigBytes, "run config"), runManifest);
  const runConfig = fileBytesProvenance(runConfigPath, reportRoot, runConfigBytes);
  const report = {
    schemaVersion: REPORT_SCHEMA_VERSION,
    runFingerprint: runManifest.runFingerprint,
    runManifest,
    summary,
    inventory,
    inventoryHash: inventoryFingerprint(inventory),
    caseRoot,
    runConfig,
    resultSegments,
    results,
  };
  validateReportPayload(report, { ledger, reportRoot });
  const resultsText = `${JSON.stringify(report, null, 2)}\n`;
  const markdown = renderMarkdown(summary, results, inventory, caseRoot, runManifest);
  await writeDurableFileExclusive(join(staging, "results.json"), resultsText);
  await writeDurableFileExclusive(join(staging, "summary.md"), markdown);
  await sealEvidenceDirectory(staging, reportSealMetadata(report), "REPORT.json");
  await publishSealedDirectory(staging, destination, "REPORT.json");
  return { summary, reportDirectory: destination };
}

export function validateReportPayload(report, options = {}) {
  assertExactKeys(report, ["caseRoot", "inventory", "inventoryHash", "resultSegments", "results", "runConfig", "runFingerprint", "runManifest", "schemaVersion", "summary"], "TS-Go suite report");
  if (report.schemaVersion !== REPORT_SCHEMA_VERSION) throw new Error(`unsupported TS-Go suite report schemaVersion '${report.schemaVersion}'`);
  validateRunManifest(report.runManifest);
  if (report.runFingerprint !== report.runManifest.runFingerprint) throw new Error("TS-Go suite report run fingerprint mismatch");
  validateInventory(report.inventory);
  if (report.inventoryHash !== inventoryFingerprint(report.inventory) || report.inventoryHash !== report.runManifest.inventoryHash || canonicalJson(report.inventory) !== canonicalJson(report.runManifest.inventory)) throw new Error("TS-Go suite report inventory provenance mismatch");
  assertBoundedString(report.caseRoot, "TS-Go suite report caseRoot", 20000, true);
  if (!isAbsolute(report.caseRoot)) throw new Error("TS-Go suite report caseRoot must be absolute");
  validateFileProvenance(report.runConfig, "TS-Go suite report runConfig", "run-config.json");
  if (!Array.isArray(report.resultSegments)) throw new Error("TS-Go suite report resultSegments must be an array");
  let previousSequence = 0;
  for (const [index, segment] of report.resultSegments.entries()) {
    validateReportSegmentEvidence(segment, report.runManifest, `TS-Go suite report resultSegments[${index}]`);
    if (segment.sequence <= previousSequence) throw new Error("TS-Go suite report result segments are not strictly ordered");
    previousSequence = segment.sequence;
  }
  if (!Array.isArray(report.results)) throw new Error("TS-Go suite report results must be an array");
  const caseIndexById = new Map(report.runManifest.cases.map((entry) => [entry.id, entry.index]));
  const observed = new Set();
  let previousCaseIndex = -1;
  for (const [resultIndex, result] of report.results.entries()) {
    validateResultPayload(result, `TS-Go suite report result ${resultIndex}`);
    const caseIndex = caseIndexById.get(caseIdentifier(result));
    if (caseIndex === undefined || observed.has(caseIndex)) throw new Error(`invalid or duplicate TS-Go suite report case '${caseIdentifier(result)}'`);
    if (caseIndex <= previousCaseIndex) throw new Error("TS-Go suite report results are not in manifest order");
    const expectedCase = report.runManifest.cases[caseIndex];
    if (result.corpus !== expectedCase.corpus || result.suite !== expectedCase.suite || result.relativePath !== expectedCase.relativePath || result.configurationName !== expectedCase.configurationName) throw new Error(`TS-Go suite report result ${resultIndex} identity does not match its case`);
    observed.add(caseIndex);
    previousCaseIndex = caseIndex;
  }
  const expectedSummary = buildReportSummary(report.runManifest, report.results);
  if (canonicalJson(report.summary) !== canonicalJson(expectedSummary)) throw new Error("TS-Go suite report summary does not match results");
  if (options.reportRoot !== undefined) {
    const expectedCaseRoot = join(resolve(options.reportRoot), "cases");
    if (resolve(report.caseRoot) !== report.caseRoot || report.caseRoot !== expectedCaseRoot) throw new Error("TS-Go suite report caseRoot does not match its report root");
    for (const result of report.results) {
      if (result.caseDir !== "" && result.caseDir !== expectedCaseRoot && !result.caseDir.startsWith(`${expectedCaseRoot}${sep}`)) throw new Error("TS-Go suite report result case directory escapes its case root");
    }
  }
  if (options.ledger !== undefined) {
    const expectedSegments = options.ledger.segmentEvidence.map((entry) => reportSegmentEvidence(entry, options.reportRoot));
    const expectedResults = [...options.ledger.recordsByIndex.entries()].sort(([left], [right]) => left - right).map(([, record]) => record.result);
    if (canonicalJson(report.resultSegments) !== canonicalJson(expectedSegments)) throw new Error("TS-Go suite report result segment provenance does not match ledger bytes");
    if (canonicalJson(report.results) !== canonicalJson(expectedResults)) throw new Error("TS-Go suite report results do not match result segments");
  }
  return report;
}

export function buildReportSummary(runManifest, results) {
  const completedIds = new Set(results.filter(resultCompletesCase).map(caseIdentifier));
  const missingCaseIndices = runManifest.cases.filter((entry) => !completedIds.has(entry.id)).map((entry) => entry.index);
  const onDiskEligibleCases = results.filter((result) => result.suite !== "transpile" && result.skipReason === "" && !result.infrastructureFailure).length;
  const onDiskNotApplicableCases = results.filter((result) => result.suite === "transpile" || result.skipReason !== "").length;
  return {
    ...summarize(results),
    expectedTotal: runManifest.total,
    complete: missingCaseIndices.length === 0,
    missingCaseIndices,
    onDiskVerificationRequested: runManifest.execution.verifyOnDisk,
    onDiskEligibleCases,
    onDiskVerifiedCases: runManifest.execution.verifyOnDisk ? onDiskEligibleCases : 0,
    onDiskNotApplicableCases,
  };
}

export function reportOutcome(summary) {
  return !summary.complete ? "partial" : summary.failed === 0 ? "passed" : "failed";
}

export function reportSealMetadata(report) {
  return {
    schemaVersion: REPORT_SEAL_METADATA_SCHEMA_VERSION,
    runFingerprint: report.runFingerprint,
    inventoryHash: report.inventoryHash,
    coverageComplete: report.summary.complete,
    outcome: reportOutcome(report.summary),
    counts: {
      expected: report.summary.expectedTotal,
      total: report.summary.total,
      passed: report.summary.passed,
      failed: report.summary.failed,
      skipped: report.summary.skipped,
      infrastructureFailures: report.summary.infrastructureFailures,
      executionMismatches: report.summary.executionMismatches,
    },
  };
}

export function validateReportSealMetadata(metadata, report) {
  assertExactKeys(metadata, ["counts", "coverageComplete", "inventoryHash", "outcome", "runFingerprint", "schemaVersion"], "TS-Go suite report seal metadata");
  assertExactKeys(metadata.counts, ["executionMismatches", "expected", "failed", "infrastructureFailures", "passed", "skipped", "total"], "TS-Go suite report seal counts");
  if (canonicalJson(metadata) !== canonicalJson(reportSealMetadata(report))) throw new Error("TS-Go suite report seal metadata does not match report data");
  return metadata;
}

function validateReportSegmentEvidence(segment, runManifest, label) {
  assertExactKeys(segment, ["bytes", "path", "records", "seal", "sequence", "sha256"], label);
  const expectedName = `results-${String(segment.sequence).padStart(4, "0")}.ndjson`;
  if (!Number.isSafeInteger(segment.sequence) || segment.sequence < 1 || segment.sequence > 9999 || segment.path !== expectedName) throw new Error(`${label} identity is invalid`);
  assertPositiveInteger(segment.bytes, `${label}.bytes`);
  assertPositiveInteger(segment.records, `${label}.records`);
  assertDigest(segment.sha256, `${label}.sha256`);
  assertExactKeys(segment.seal, ["bytes", "path", "sha256", "value"], `${label}.seal`);
  validateFileProvenance({ bytes: segment.seal.bytes, sha256: segment.seal.sha256 }, `${label}.seal`);
  if (segment.seal.path !== `segment-seals/${expectedName}.json`) throw new Error(`${label}.seal path is invalid`);
  validateResultSegmentSeal(segment.seal.value, runManifest, { segment: expectedName, sequence: segment.sequence });
  if (segment.bytes !== segment.seal.value.bytes || segment.records !== segment.seal.value.records || segment.sha256 !== segment.seal.value.sha256) throw new Error(`${label} does not match its seal`);
}

function reportSegmentEvidence(entry, reportRoot) {
  if (entry.seal === null) throw new Error(`cannot report an unsealed result segment: ${entry.path}`);
  return {
    sequence: entry.sequence,
    path: reportRelativePath(reportRoot, entry.path),
    bytes: entry.bytes,
    sha256: entry.sha256,
    records: entry.records,
    seal: {
      path: reportRelativePath(reportRoot, entry.seal.path),
      bytes: entry.seal.bytes,
      sha256: entry.seal.sha256,
      value: entry.seal.value,
    },
  };
}

function reportRelativePath(reportRoot, file) {
  const value = relative(resolve(reportRoot), resolve(file)).split(sep).join("/");
  assertSafeRelativePath(value, "report provenance path");
  return value;
}

function fileBytesProvenance(file, root, contents = readFileSync(file)) {
  const bytes = contents;
  return { path: reportRelativePath(root, file), bytes: bytes.length, sha256: sha256(bytes) };
}

async function syncFile(file) {
  const handle = await open(file, "r+");
  try {
    await handle.datasync();
  } finally {
    await handle.close();
  }
}

async function syncDirectory(directory) {
  let handle;
  try {
    handle = await open(directory, "r");
    await handle.sync();
  } catch (error) {
    if (!new Set(["EINVAL", "ENOTSUP", "EISDIR", "EPERM"]).has(error?.code)) throw error;
  } finally {
    await handle?.close();
  }
}

async function writeDurableJson(destination, value) {
  const staging = join(dirname(destination), `.${basename(destination)}.partial-${randomUUID()}`);
  await writeDurableFileExclusive(staging, `${JSON.stringify(value, null, 2)}\n`);
  await rename(staging, destination);
  await syncDirectory(dirname(destination));
}

export function summarize(results) {
  const passed = results.filter((result) => result.status === "pass").length;
  const skipped = results.filter((result) => result.status === "skip").length;
  const failed = results.length - passed - skipped;
  const exactBaselineResults = results.map((result) => result.exactBaseline).filter((baseline) => baseline !== undefined && baseline !== null);
  return {
    total: results.length,
    passed,
    failed,
    skipped,
    infrastructureFailures: results.filter((result) => result.infrastructureFailure).length,
    executionMismatches: results.reduce((sum, result) => sum + result.executionMismatchCount, 0),
    expectedErrorCases: results.filter((result) => result.expectedErrors).length,
    expectedCleanCases: results.filter((result) => !result.expectedErrors).length,
    exactBaselineCases: exactBaselineResults.length,
    exactBaselineFailedCases: exactBaselineResults.filter((baseline) => baseline.status === "fail").length,
    exactBaselineComparableArtifacts: exactBaselineResults.reduce((sum, baseline) => sum + baseline.comparable, 0),
    exactBaselineUnsupportedArtifacts: exactBaselineResults.reduce((sum, baseline) => sum + baseline.unsupportedCount, 0),
    exactBaselineTsgoAcceptedSections: exactBaselineResults.reduce((sum, baseline) => sum + baseline.tsgoAcceptedCount, 0),
    exactBaselineMismatches: exactBaselineResults.reduce((sum, baseline) => sum + baseline.mismatchCount, 0),
  };
}

// V8 represents substrings from split()/slice() as SlicedStrings that retain
// the parent string. Without flattening, every trimmed record keeps its case's
// FULL stdout+stderr alive and a 7k-case sweep exhausts the default heap.
function flattenString(value) {
  return Buffer.from(value, "utf8").toString("utf8");
}

export function trimResult(result) {
  if (result.firstOutputLines !== undefined) {
    validateResultPayload(result, "already-trimmed result");
    return result;
  }
  const output = `${result.stdout}${result.stderr}`;
  const evidence = {
    corpus: result.corpus,
    suite: result.suite,
    relativePath: result.relativePath,
    configurationName: result.configurationName,
    expectedErrors: result.expectedErrors,
    actualErrors: result.actualErrors,
    exitCode: result.exitCode,
    signal: result.signal,
    caseDir: result.caseDir,
    skipReason: result.skipReason,
    exactBaseline: normalizeExactBaseline(result.exactBaseline),
    executionMismatchCount: (result.executionMismatches ?? []).length,
    executionMismatches: baselineSamples(result.executionMismatches ?? []),
    infrastructureFailure: result.infrastructureFailure === true,
    firstOutputLines: output.split(/\r?\n/).filter(Boolean).slice(0, 20).map((line) => flattenString(line.slice(0, 1000))),
  };
  const verdict = deriveResultVerdict(evidence);
  const trimmed = { ...evidence, verdict, status: deriveResultStatus(verdict) };
  validateResultPayload(trimmed, "trimmed result");
  return trimmed;
}

function normalizeExactBaseline(baseline) {
  if (baseline === undefined || baseline === null) return null;
  const mismatchCount = baseline.mismatches.length;
  const unsupportedCount = baseline.unsupported.length;
  const tsgoAcceptedCount = baseline.tsgoAccepted.length;
  return {
    schemaVersion: EXACT_BASELINE_SCHEMA_VERSION,
    status: mismatchCount === 0 ? "pass" : "fail",
    checked: baseline.checked,
    comparable: baseline.comparable,
    unsupportedCount,
    unsupported: baselineSamples(baseline.unsupported),
    tsgoAcceptedCount,
    tsgoAccepted: baselineSamples(baseline.tsgoAccepted),
    mismatchCount,
    mismatches: baselineSamples(baseline.mismatches),
    expectedDiagnosticsPresent: baseline.expectedDiagnosticsPresent,
    actualErrors: baseline.usedHarness === true ? baseline.actualErrors : null,
    usedHarness: baseline.usedHarness === true,
  };
}

function baselineSamples(values) {
  if (!Array.isArray(values) || !values.every((value) => typeof value === "string")) throw new Error("result mismatch samples must be strings");
  return values.slice(0, MAX_BASELINE_SAMPLES).map((value) => flattenString(value.slice(0, MAX_BASELINE_SAMPLE_LENGTH)));
}

export function renderMarkdown(summary, results, inventory, caseRoot, runManifest) {
  const failed = results.filter((result) => result.status === "fail");
  const lines = [
    "# TSTS TS-Go Suite Run",
    "",
    `- Run fingerprint: ${runManifest.runFingerprint}`,
    `- Complete: ${summary.complete}`,
    `- Expected total: ${summary.expectedTotal}`,
    `- Case root: ${caseRoot}`,
    `- Total: ${summary.total}`,
    `- Passed: ${summary.passed}`,
    `- Failed: ${summary.failed}`,
    `- Skipped: ${summary.skipped}`,
    `- Infrastructure failures: ${summary.infrastructureFailures}`,
    `- Execution mismatches: ${summary.executionMismatches}`,
    `- Missing case indices: ${summary.missingCaseIndices.length}`,
    `- Expected-error cases: ${summary.expectedErrorCases}`,
    `- Expected-clean cases: ${summary.expectedCleanCases}`,
    `- Exact-baseline cases: ${summary.exactBaselineCases}`,
    `- Exact-baseline failed cases: ${summary.exactBaselineFailedCases}`,
    `- Exact-baseline comparable artifacts: ${summary.exactBaselineComparableArtifacts}`,
    `- Exact-baseline unsupported artifacts: ${summary.exactBaselineUnsupportedArtifacts}`,
    `- Exact-baseline tsgo-accepted sections: ${summary.exactBaselineTsgoAcceptedSections}`,
    `- Exact-baseline mismatches: ${summary.exactBaselineMismatches}`,
    `- On-disk verification requested: ${summary.onDiskVerificationRequested}`,
    `- On-disk eligible cases: ${summary.onDiskEligibleCases}`,
    `- On-disk verified cases: ${summary.onDiskVerifiedCases}`,
    `- On-disk not-applicable cases: ${summary.onDiskNotApplicableCases}`,
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
    lines.push("| Case | Expected Errors | Actual Errors | Exact Baselines | Exit | First Output |");
    lines.push("|---|---:|---:|---|---:|---|");
    for (const result of failed.slice(0, 200)) {
      const output = result.firstOutputLines?.[0] ?? "";
      const exact = result.exactBaseline === undefined || result.exactBaseline === null
        ? ""
        : `${result.exactBaseline.status}: ${result.exactBaseline.mismatches.slice(0, 3).join("; ")}`;
      lines.push(`| ${result.relativePath} | ${result.expectedErrors} | ${result.actualErrors} | ${escapeTable(exact)} | ${result.exitCode} | ${escapeTable(output)} |`);
    }
  }
  lines.push("");
  return `${lines.join("\n")}\n`;
}

function renderInventoryTable(inventory) {
  const fixtureSummary = Object.entries(inventory.typeScriptCases.requiredFixtureFiles).map(([name, count]) => `${name}=${count}`).join(", ");
  return [
    "| Bucket | Total | In Scope | Excluded | Unclassified | Notes |",
    "|---|---:|---:|---:|---:|---|",
    `| Current TSTS harness | ${inventory.currentHarness.total} | ${inventory.currentHarness.inScope} | ${inventory.currentHarness.outOfScope} | ${inventory.currentHarness.unclassified} | Executed by this runner today |`,
    `| TypeScript file-based cases | ${inventory.typeScriptCases.total} | ${inventory.typeScriptCases.inScope} | ${inventory.typeScriptCases.outOfScope} | ${inventory.typeScriptCases.unclassified} | Compiler/conformance/project/transpile are executable; pinned compiler-runner files are selected without name exclusions; required fixture files: ${fixtureSummary} |`,
    `| TypeScript unit-test mirror sources | ${inventory.typeScriptUnitTests.total} | ${inventory.typeScriptUnitTests.inScope} | ${inventory.typeScriptUnitTests.outOfScope} | ${inventory.typeScriptUnitTests.unclassified} | Source-derived required mirror graph (${inventory.typeScriptUnitTests.entries.exportedModules} entrypoint exports, ${inventory.typeScriptUnitTests.entries.supportModules} support modules); not file-based cases |`,
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
    "## TypeScript File-Based Cases",
    "",
    ...renderNamedCounts(inventory.typeScriptCases.entries),
    "",
    "## Required TypeScript Fixture Files",
    "",
    ...renderNamedCounts(inventory.typeScriptCases.requiredFixtureFiles),
    "",
    "## TypeScript Unit-Test Mirror Sources",
    "",
    ...renderNamedCounts(inventory.typeScriptUnitTests.entries),
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
  if (suiteBuildId === "") throw new Error("Run the TS-Go suite through prepare-run.mjs (or npm run tsgo-suite) so compiler artifacts are bound to their exact source inputs.");
  const inventory = await buildTestUniverseInventory();
  if (options.inventory) {
    console.log(renderInventoryMarkdown(inventory));
    return;
  }
  const testCases = await discoverCases(options);
  const currentManifest = buildRunManifest(testCases, options, inventory);
  validateRunManifest(currentManifest);
  let reportRoot;
  let doneIndices = new Set();
  if (options.resume !== "") {
    reportRoot = isAbsolute(options.resume) ? options.resume : join(repoRoot, options.resume);
    const configPath = join(reportRoot, "run-config.json");
    if (!existsSync(configPath)) {
      throw new Error(`Cannot resume: no run-config.json in ${reportRoot}.`);
    }
    const config = parseJsonBytes(readFileSync(configPath), "run config");
    try {
      validateRunConfig(config, currentManifest);
    } catch (error) {
      throw new Error(`Cannot resume: ${error instanceof Error ? error.message : String(error)}`);
    }
  } else {
    const timestamp = new Date().toISOString().replaceAll(":", "").replace(".", "-").replace("Z", `-${process.pid}-${randomUUID()}`);
    reportRoot = join(repoRoot, ".temp/tsgo-suite", timestamp);
  }
  const caseRootForRun = join(reportRoot, "cases");
  await mkdir(reportRoot, { recursive: true });
  await syncDirectory(dirname(reportRoot));
  await mkdir(caseRootForRun, { recursive: true });
  await syncDirectory(reportRoot);
  if (options.resume === "") {
    await writeDurableJson(join(reportRoot, "run-config.json"), createRunConfig(currentManifest));
  }

  if (!existsSync(cliPath)) {
    throw new Error(`TSTS CLI not found at ${cliPath}. Run TSTS emit first.`);
  }
  const lock = await acquireRunLock(reportRoot);
  try {
    if (options.resume !== "") {
      doneIndices = loadResultLedger(sealedResultSegments(reportRoot, currentManifest), currentManifest).doneIndices;
    }
    console.log(`TSTS TS-Go suite run${options.resume !== "" ? " (RESUME)" : ""}`);
    console.log(`fingerprint=${currentManifest.runFingerprint}`);
    console.log(`cases=${testCases.length} corpus=${options.corpus} suite=${options.suite} jobs=${options.jobs}${doneIndices.size > 0 ? ` resumeSkip=${doneIndices.size}` : ""}`);
    console.log(`upstreamInScope=${inventory.typeScriptCases.inScope + inventory.typeScriptUnitTests.inScope + inventory.baselines.inScope + inventory.goTests.inScope} upstreamExcluded=${inventory.typeScriptCases.outOfScope + inventory.typeScriptUnitTests.outOfScope + inventory.baselines.outOfScope + inventory.goTests.outOfScope}`);
    console.log(`caseRoot=${caseRootForRun}`);
    console.log(`reportRoot=${reportRoot}`);

    const attempt = await runQueue(testCases, caseRootForRun, reportRoot, options.jobs, options.failFast, options, currentManifest, doneIndices);
    const finalManifest = buildRunManifest(testCases, options, inventory);
    validateRunManifest(finalManifest);
    if (finalManifest.runFingerprint !== currentManifest.runFingerprint) {
      await writeDurableJson(join(reportRoot, `input-drift-${Date.now()}-${randomUUID()}.json`), { expected: currentManifest, actual: finalManifest });
      throw new Error("Suite inputs changed while the run was active; refusing to seal a mixed-evidence report.");
    }
    const report = await writeReports(reportRoot, sealedResultSegments(reportRoot, currentManifest), inventory, caseRootForRun, currentManifest);
    const summary = report.summary;
    console.log(`SUMMARY total=${summary.total}/${summary.expectedTotal} complete=${summary.complete} passed=${summary.passed} failed=${summary.failed}`);
    if (attempt.interruptedSignal !== null) {
      console.log(`INTERRUPTED ${attempt.interruptedSignal}; completed result segments are sealed for --resume.`);
      console.log(`REPORT ${join(report.reportDirectory, "summary.md")}`);
      process.exitCode = attempt.interruptedSignal === "SIGINT" ? 130 : 143;
      await lock.release("interrupted");
      return;
    }
    if (process.env.TSGO_HOLD_SECONDS !== undefined) {
      console.log(`HOLDING for ${process.env.TSGO_HOLD_SECONDS}s (TSGO_HOLD_SECONDS)`);
      await new Promise((resolve) => setTimeout(resolve, Number(process.env.TSGO_HOLD_SECONDS) * 1000));
    }
    console.log(`REPORT ${join(report.reportDirectory, "summary.md")}`);
    if (!summary.complete || summary.failed > 0) process.exitCode = 1;
    await lock.release(summary.complete ? "complete" : "partial");
  } catch (error) {
    await lock.release("failed");
    throw error;
  }
}

export async function acquireRunLock(reportRoot) {
  const root = resolve(reportRoot);
  const rootStat = await lstat(root);
  if (!rootStat.isDirectory() || rootStat.isSymbolicLink()) throw new Error(`run lock root must be a regular directory: ${root}`);
  const activePath = join(root, "ACTIVE.lock");
  const token = randomUUID();
  const preparedPath = join(root, `PENDING.lock-${token}`);
  const ownerRecord = { schemaVersion: 1, token, pid: process.pid, hostname: hostname(), startedAt: new Date().toISOString() };
  await mkdir(preparedPath);
  await writeDurableFileExclusive(join(preparedPath, "owner.json"), `${JSON.stringify(ownerRecord, null, 2)}\n`);
  await syncDirectory(preparedPath);
  await syncDirectory(root);
  const blockPrepared = async () => {
    await rename(preparedPath, join(root, `BLOCKED.lock-${token}`));
    await syncDirectory(root);
  };
  try {
    await rename(preparedPath, activePath);
    await syncDirectory(root);
  } catch (error) {
    if (!(error instanceof Error) || !("code" in error) || !new Set(["EEXIST", "ENOTEMPTY"]).has(error.code)) throw error;
    let owner;
    try {
      owner = await readRunLockOwner(activePath);
    } catch (ownerError) {
      await blockPrepared();
      throw new Error(`Cannot acquire run lock with unreadable owner evidence: ${ownerError instanceof Error ? ownerError.message : String(ownerError)}`);
    }
    if (owner.hostname !== hostname()) {
      await blockPrepared();
      throw new Error(`Cannot acquire run lock owned on another host: ${owner.hostname}`);
    }
    if (processIsAlive(owner.pid)) {
      await blockPrepared();
      throw new Error(`Cannot acquire run lock held by live process ${owner.pid}`);
    }
    const stalePath = join(root, `STALE.lock-${owner.token}`);
    if (existsSync(stalePath)) {
      await blockPrepared();
      throw new Error(`Cannot acquire run lock because stale owner evidence already exists: ${stalePath}`);
    }
    await rename(activePath, stalePath);
    await rename(preparedPath, activePath);
    await syncDirectory(root);
  }
  let released = false;
  return {
    async release(status) {
      if (released) return;
      if (!new Set(["complete", "failed", "interrupted", "partial"]).has(status)) throw new Error(`invalid run-lock release status '${status}'`);
      const owner = await readRunLockOwner(activePath);
      if (canonicalJson(owner) !== canonicalJson(ownerRecord)) throw new Error("run lock ownership changed before release");
      await rename(activePath, join(root, `${status.toUpperCase()}.lock-${token}`));
      await syncDirectory(root);
      released = true;
    },
  };
}

export function validateRunLockOwner(owner) {
  assertExactKeys(owner, ["hostname", "pid", "schemaVersion", "startedAt", "token"], "run lock owner");
  if (owner.schemaVersion !== 1 || !UUID_V4_PATTERN.test(owner.token)) throw new Error("run lock owner token is invalid");
  assertPositiveInteger(owner.pid, "run lock owner.pid");
  assertBoundedString(owner.hostname, "run lock owner.hostname", 255, true);
  assertBoundedString(owner.startedAt, "run lock owner.startedAt", 100, true);
  let normalizedStartedAt;
  try {
    normalizedStartedAt = new Date(owner.startedAt).toISOString();
  } catch {
    throw new Error("run lock owner.startedAt is invalid");
  }
  if (normalizedStartedAt !== owner.startedAt) throw new Error("run lock owner.startedAt is not canonical");
  return owner;
}

async function readRunLockOwner(lockPath) {
  const lockStat = await lstat(lockPath);
  if (!lockStat.isDirectory() || lockStat.isSymbolicLink()) throw new Error(`run lock must be a regular directory: ${lockPath}`);
  const entries = await readdir(lockPath, { withFileTypes: true });
  if (entries.length !== 1 || entries[0].name !== "owner.json" || !entries[0].isFile()) throw new Error(`run lock directory contents are invalid: ${lockPath}`);
  const ownerPath = join(lockPath, "owner.json");
  const ownerStat = await lstat(ownerPath);
  if (!ownerStat.isFile() || ownerStat.isSymbolicLink()) throw new Error(`run lock owner must be a regular file: ${ownerPath}`);
  return validateRunLockOwner(parseJsonBytes(await readFile(ownerPath), `run lock owner '${ownerPath}'`));
}

function processIsAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code === "EPERM";
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.env.TSGO_SUITE_WORKER === "1") {
    runWorkerLoop();
  } else {
    main().catch((error) => {
      console.error(error instanceof Error ? error.stack : String(error));
      process.exitCode = 1;
    });
  }
}
