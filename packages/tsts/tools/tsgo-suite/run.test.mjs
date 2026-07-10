import test from "node:test";
import assert from "node:assert/strict";
import { fingerprint } from "../test-provenance.mjs";
import { baselineHasErrors, buildTestUniverseInventory, caseDirectoryFragment, caseExpectedErrors, compilerCommandLineArgsForMaterializedCase, compilerCommandLineArgsForTranspileInvocation, compilerOptionsForExistingProjectConfig, compilerOptionsForMaterializedCase, compilerOptionsForProjectDescriptor, compilerOptionsForTranspileInvocation, compilerOptionsFromSettings, compilerOptionsRequireTsGoRemovedOptionDiagnostic, decodeSourceText, diagnosticHeadlineText, discoverCases, errorDiffNewSideHasErrors, getFileBasedTestConfigurations, getSkipReason, harnessApiDeclarationFileNames, hasRootPackageJson, isEmittedJavaScriptSibling, isLanguageServiceHarnessCase, normalizeHarnessOptionPath, normalizeHarnessPath, parseArgs, parseBaselineSections, parseFileBasedTest, rewriteHarnessFileContent, selectInputFiles, sortDiagnosticsForBaseline, transpileExpectedOutputFiles, transpileInvocationsForMaterializedCase } from "./run.mjs";
import { caseIdentifier as reportCaseIdentifier, hashCaseIds, inventoryFingerprint, runManifestFingerprint, trimResult } from "./run.mjs";

const testInputLabels = [
  "accepted-overlay-active", "accepted-overlay-binding", "accepted-overlay-capture", "accepted-overlay-legacy-manifest", "accepted-overlay-plan",
  "bundled-source-assets", "resolved-typescript-package", "source-pin", "suite-baseline-code", "suite-provenance-helper", "suite-report-verifier",
  "suite-runner", "suite-sealed-evidence-helper", "suite-source-pin-verifier", "tsts-dist", "tsts-package", "vendored-typescript-lib-fallback",
  "workspace-lock", "workspace-package",
].sort();

function protocolTestInventory() {
  const bucket = () => ({ total: 0, inScope: 0, outOfScope: 0, unclassified: 0, entries: {} });
  return { currentHarness: bucket(), typeScriptCases: { ...bucket(), languageServiceHarnessCases: 0 }, baselines: bucket(), goTests: bucket() };
}

function protocolTestManifest(caseNames = ["a"], execution = {}) {
  const inventory = protocolTestInventory();
  const cases = caseNames.map((name, index) => {
    const identity = { corpus: "current", suite: "compiler", relativePath: `compiler/${name}.ts`, configurationName: "" };
    return { index, ...identity, id: reportCaseIdentifier(identity), sourceSha256: String(index + 1).padStart(64, "0"), projectFixture: null };
  });
  const roots = testInputLabels.map((label) => ({ label, kind: "file", mode: 0o644, symlinkPolicy: "reject", fileCount: 1, symlinkCount: 0, bytes: 1, digest: "a".repeat(64) }));
  const unsigned = {
    schemaVersion: 2,
    selection: { corpus: "current", suite: "compiler", filter: "", limit: 0 },
    execution: {
      exactBaselineContract: 1, verifyOnDisk: false, jobs: 1, failFast: false, caseTimeoutMs: 1000, poolCaseTimeoutMs: 2000,
      maxOldSpaceSizeMb: 8192, resultRecordMaxBytes: 1024 * 1024, resultSegmentMaxBytes: 8 * 1024 * 1024, resultSegmentMaxRecords: 256,
      ...execution,
    },
    runtime: {
      execPath: { bytes: 1, sha256: "b".repeat(64) }, nodeVersion: "v1.0.0", v8Version: "1", execArgv: [], platform: "linux", arch: "x64",
      locale: { locale: "en", calendar: "gregory", numberingSystem: "latn", timeZone: "UTC" }, hostname: "test-host",
      childEnvironment: [
        { name: "LANG", value: "C.UTF-8" }, { name: "LC_ALL", value: "C.UTF-8" }, { name: "NODE_OPTIONS", value: "" }, { name: "NODE_PATH", value: "" },
        { name: "TSGO_CASE_TIMEOUT_MS", value: "1000" }, { name: "TSGO_POOL_TIMEOUT_MS", value: "2000" }, { name: "TZ", value: "UTC" },
      ],
    },
    upstream: {
      sourcePin: {
        path: "packages/tsts/schema/tsgo/source-pin.json", sha256: "c".repeat(64), tsgoRevision: "d".repeat(40), tsgoObjectFormat: "sha1",
        typescriptPath: "_submodules/TypeScript", typescriptRevision: "f".repeat(40), typescriptObjectFormat: "sha1",
      },
      tsgo: { revision: "d".repeat(40), tree: "e".repeat(40), objectFormat: "sha1", dirty: false },
      typescript: { name: "TypeScript", path: "_submodules/TypeScript", revision: "f".repeat(40), tree: "1".repeat(40), objectFormat: "sha1", dirty: false },
    },
    inputs: { schemaVersion: 1, roots, digest: fingerprint(roots, "tsts-input-roots-v1") },
    cases,
    caseIdsHash: hashCaseIds(cases),
    total: cases.length,
    inventory,
    inventoryHash: inventoryFingerprint(inventory),
  };
  return { ...unsigned, runFingerprint: runManifestFingerprint(unsigned) };
}

function protocolTestResult(caseEntry, overrides = {}) {
  return trimResult({
    corpus: caseEntry.corpus,
    suite: caseEntry.suite,
    relativePath: caseEntry.relativePath,
    configurationName: caseEntry.configurationName,
    expectedErrors: false,
    actualErrors: false,
    exitCode: 0,
    signal: null,
    caseDir: `/tmp/case-${caseEntry.index}`,
    skipReason: "",
    exactBaseline: undefined,
    infrastructureFailure: false,
    stdout: "",
    stderr: "",
    ...overrides,
  });
}

test("parseFileBasedTest materializes single-file tests", () => {
  const parsed = parseFileBasedTest("const value: number = 1;", "single.ts");
  assert.deepEqual(parsed.units, [{ fileName: "single.ts", content: "const value: number = 1;" }]);
  assert.equal(parsed.currentDirectory, "/src");
});

test("parseFileBasedTest removes the global directive separator from source content", () => {
  const parsed = parseFileBasedTest(`// @declaration: true
// @target: esnext

export function fn() {
  return 1;
}`, "single.ts");
  assert.deepEqual(parsed.units, [{ fileName: "single.ts", content: "export function fn() {\n  return 1;\n}" }]);
});

test("parseFileBasedTest materializes TS-Go @filename sections", () => {
  const parsed = parseFileBasedTest(`// @filename: /src/a.ts
export const a = 1;

// @filename: /src/b.ts
import { a } from "./a";
a;`, "fallback.ts");
  assert.deepEqual(parsed.units, [
    { fileName: "/src/a.ts", content: "export const a = 1;\n" },
    { fileName: "/src/b.ts", content: "import { a } from \"./a\";\na;" },
  ]);
});

test("parseFileBasedTest discards harness prose before the first filename section", () => {
  const parsed = parseFileBasedTest(`// @module: commonjs
// Harness prose belongs to the test file, not the embedded package.json.

// @filename: /node_modules/foo/package.json
{ "types": "types.d.ts" }

// @filename: /a.ts
import "foo";`, "fallback.ts");
  assert.deepEqual(parsed.units, [
    { fileName: "/node_modules/foo/package.json", content: "{ \"types\": \"types.d.ts\" }\n" },
    { fileName: "/a.ts", content: "import \"foo\";" },
  ]);
});

test("rewriteHarnessFileContent rewrites virtual JSON paths relative to the materialized file", () => {
  assert.equal(
    rewriteHarnessFileContent(`{ "name": "typescript", "types": "/.ts/typescript.d.ts" }`, "node_modules/typescript/package.json", { useCaseSensitiveFileNames: true }),
    `{\n    "name": "typescript",\n    "types": "../../.ts/typescript.d.ts"\n}\n`,
  );
});

test("rewriteHarnessFileContent rewrites virtual absolute module specifiers into the case root", () => {
  assert.equal(
    rewriteHarnessFileContent(`import thing from "/pkg";
export { thing } from "/pkg/sub";
const lazy = import("/some-mod");
const cjs = require("/nested/cjs");`, "src/index.ts", { useCaseSensitiveFileNames: true }),
    `import thing from "../pkg";
export { thing } from "../pkg/sub";
const lazy = import("../some-mod");
const cjs = require("../nested/cjs");`,
  );
});

test("harnessApiDeclarationFileNames discovers TypeScript API virtual declarations", () => {
  const parsed = parseFileBasedTest(`// @filename: node_modules/typescript/package.json
{ "types": "/.ts/typescript.d.ts" }

// @filename: node_modules/tsserverlibrary-internal/package.json
{ "types": "/.ts/tsserverlibrary.internal.d.ts" }

// @filename: index.ts
import ts = require("typescript");`, "api.ts");
  assert.deepEqual(harnessApiDeclarationFileNames(parsed), ["tsserverlibrary.internal.d.ts", "typescript.d.ts"]);
});

test("compilerOptionsFromSettings maps supported TS-Go directives", () => {
  const settings = new Map([
    ["strict", "true"],
    ["target", "es2020"],
    ["module", "commonjs"],
    ["allowimportingtsextensions", "true"],
    ["allowumdglobalaccess", "true"],
    ["importsnotusedasvalues", "preserve"],
    ["lib", "es2020,dom"],
    ["declaration", "true;"],
    ["importhelpers", "true"],
    ["keyofstringsonly", "true"],
    ["isolatedmodules", "true"],
    ["maxnodemodulejsdepth", "1"],
    ["noresolve", "true"],
    ["nolib", "true"],
    ["downleveliteration", "true"],
    ["nopropertyaccessfromindexsignature", "true"],
    ["noimplicitoverride", "true"],
    ["preservevalueimports", "true"],
    ["allowarbitraryextensions", "true"],
    ["allowunusedlabels", "false"],
    ["composite", "true"],
    ["inlinesourcemap", "true"],
    ["libreplacement", "true"],
    ["nocheck", "true"],
    ["nofallthroughcasesinswitch", "true"],
    ["noimplicitreturns", "true"],
    ["noimplicitthis", "true"],
    ["noimplicitusestrict", "true"],
    ["nouncheckedindexedaccess", "true"],
    ["pretty", "true"],
    ["rewriterelativeimportextensions", "true"],
    ["sourcemap", "true"],
    ["sourceroot", "local"],
    ["strictpropertyinitialization", "false"],
    ["useunknownincatchvariables", "false"],
  ]);
  assert.deepEqual(compilerOptionsFromSettings(settings), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "es2020",
    module: "commonjs",
    allowImportingTsExtensions: true,
    allowUmdGlobalAccess: true,
    importsNotUsedAsValues: "preserve",
    strict: true,
    lib: ["es2020", "dom"],
    declaration: true,
    importHelpers: true,
    keyofStringsOnly: true,
    isolatedModules: true,
    maxNodeModuleJsDepth: 1,
    noResolve: true,
    noLib: true,
    downlevelIteration: true,
    noPropertyAccessFromIndexSignature: true,
    noImplicitOverride: true,
    preserveValueImports: true,
    allowArbitraryExtensions: true,
    allowUnusedLabels: false,
    composite: true,
    inlineSourceMap: true,
    libReplacement: true,
    noCheck: true,
    noFallthroughCasesInSwitch: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    noImplicitUseStrict: true,
    noUncheckedIndexedAccess: true,
    pretty: true,
    rewriteRelativeImportExtensions: true,
    sourceMap: true,
    sourceRoot: "local",
    strictPropertyInitialization: false,
    useUnknownInCatchVariables: false,
  });
});

test("compilerOptionsFromSettings maps JSX factory directives", () => {
  const settings = new Map([
    ["jsx", "react-jsx"],
    ["jsxfactory", "createElement"],
    ["jsxfragmentfactory", "Fragment"],
    ["jsximportsource", "/jsx"],
    ["reactnamespace", "Element"],
  ]);
  assert.deepEqual(compilerOptionsFromSettings(settings), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    jsx: "react-jsx",
    jsxFactory: "createElement",
    jsxFragmentFactory: "Fragment",
    jsxImportSource: "./jsx",
    reactNamespace: "Element",
  });
});

test("selectInputFiles includes modern TypeScript module extensions", () => {
  const parsed = parseFileBasedTest(`// @Filename: notmodule.cts
export async function foo() {
  await 0;
}

// @Filename: module.mts
export const value = 1;`, "fallback.ts");
  const writtenFiles = ["notmodule.cts", "module.mts", "package.json"];
  assert.deepEqual(selectInputFiles(parsed, writtenFiles, new Map()), ["notmodule.cts", "module.mts"]);
});

test("selectInputFiles includes authored unsupported root files", () => {
  const parsed = parseFileBasedTest(`// @allowJs: true
// @filename: a.ts
class c {
}

// @filename: b.js.map
function foo() {
}

// @filename: b.js
function bar() {
}`, "fallback.ts");
  const writtenFiles = ["a.ts", "b.js.map", "b.js", "package.json", "tsconfig.json"];
  assert.deepEqual(selectInputFiles(parsed, writtenFiles, new Map()), ["a.ts", "b.js", "b.js.map"]);
});

test("selectInputFiles does not promote tsbuildinfo fixtures to command-line roots", () => {
  const parsed = parseFileBasedTest(`// @tsBuildInfoFile: /a.tsbuildinfo
// @filename: /a.tsbuildinfo
{}
// @filename: /a.ts
export const value = 1;`, "fallback.ts");
  const writtenFiles = ["a.tsbuildinfo", "a.ts", "package.json"];
  assert.deepEqual(selectInputFiles(parsed, writtenFiles, parsed.globalOptions), ["a.ts"]);
});

test("selectInputFiles does not promote materialized JSON imports to command-line roots", () => {
  const parsed = parseFileBasedTest(`// @allowArbitraryExtensions: true
// @resolveJsonModule: false
// @filename: main.ts
import data from "./data.json";
// @filename: data.json
{}
// @filename: data.d.json.ts
declare var val: string;`, "json.ts");
  const writtenFiles = ["main.ts", "data.json", "data.d.json.ts", "package.json"];
  assert.deepEqual(selectInputFiles(parsed, writtenFiles, parsed.globalOptions), ["main.ts", "data.d.json.ts"]);
});

test("selectInputFiles does not treat a declaration named require as a require call", () => {
  const parsed = parseFileBasedTest(`// @filename: subfolder/index.ts
function require() {}
export const value = 1;
// @filename: index.ts
function require() {}
export const value = 2;`, "generatedNameCollisions.ts");
  const writtenFiles = ["subfolder/index.ts", "index.ts", "package.json"];
  assert.deepEqual(selectInputFiles(parsed, writtenFiles, parsed.globalOptions), ["subfolder/index.ts", "index.ts"]);
});

test("selectInputFiles treats real CommonJS require calls as explicit-reference roots", () => {
  const parsed = parseFileBasedTest(`// @filename: dependency.ts
export const value = 1;
// @filename: index.ts
const dependency = require("./dependency");`, "requireCall.ts");
  const writtenFiles = ["dependency.ts", "index.ts", "package.json"];
  assert.deepEqual(selectInputFiles(parsed, writtenFiles, parsed.globalOptions), ["index.ts"]);
});

test("selectInputFiles does not promote authored project metadata to root files", () => {
  const parsed = parseFileBasedTest(`// @filename: package.json
{"name":"pkg"}

// @filename: tsconfig.json
{"compilerOptions":{}}

// @filename: index.ts
export const value = 1;`, "fallback.ts");
  const writtenFiles = ["package.json", "tsconfig.json", "index.ts"];
  assert.deepEqual(selectInputFiles(parsed, writtenFiles, new Map()), ["index.ts"]);
});

test("compilerOptionsFromSettings maps virtual path options into the materialized case", () => {
  const settings = new Map([
    ["outdir", "A:/"],
    ["out", "/legacy.js"],
    ["rootdir", "A:/src"],
    ["declarationdir", "/decls"],
    ["tsbuildinfofile", "/a.tsbuildinfo"],
  ]);
  assert.deepEqual(compilerOptionsFromSettings(settings), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    outDir: "A:/",
    out: "legacy.js",
    rootDir: "A:/src",
    declarationDir: "decls",
    tsBuildInfoFile: "a.tsbuildinfo",
  });
  assert.equal(normalizeHarnessPath("A:/foo/bar.ts"), "A:/foo/bar.ts");
  assert.equal(normalizeHarnessPath("A:/foo/bar.ts", { useCaseSensitiveFileNames: false }), "a:/foo/bar.ts");
  assert.equal(normalizeHarnessOptionPath("A:/"), "A:/");
  assert.equal(normalizeHarnessOptionPath("A:/", { useCaseSensitiveFileNames: false }), "a:/");
  assert.equal(normalizeHarnessOptionPath("/out"), "out");
  assert.equal(normalizeHarnessOptionPath("../"), ".virtual-root");
  assert.equal(normalizeHarnessOptionPath("../out"), ".virtual-root/out");
});

test("compilerOptionsFromSettings maps virtual typeRoots into the materialized case", () => {
  const settings = new Map([
    ["typeroots", "/types,C:/workspace/vendor-types"],
  ]);
  assert.deepEqual(compilerOptionsFromSettings(settings), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    typeRoots: ["types", "C:/workspace/vendor-types"],
  });
});

test("compilerOptionsForMaterializedCase preserves virtual common source roots for drive-root outDir", () => {
  const parsed = parseFileBasedTest(`// @target: es2015
// @outDir: A:/
// @Filename: A:/foo/bar.ts
var x: number;

// @Filename: A:/foo/baz.ts
var y: number;`, "commonSourceDir1.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["A:/foo/bar.ts", "A:/foo/baz.ts"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "es2015",
    outDir: "A:/",
    rootDir: "A:/foo",
  });
});

test("compilerOptionsForMaterializedCase canonicalizes drive roots for case-insensitive virtual hosts", () => {
  const parsed = parseFileBasedTest(`// @target: es2015
// @useCaseSensitiveFileNames: false
// @outDir: A:/
// @Filename: A:/foo/bar.ts
var x: number;

// @Filename: a:/foo/baz.ts
var y: number;`, "commonSourceDir3.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["a:/foo/bar.ts", "a:/foo/baz.ts"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "es2015",
    outDir: "a:/",
    rootDir: "a:/foo",
  });
});

test("compilerOptionsForMaterializedCase preserves command-line common source roots for synthetic configs", () => {
  const parsed = parseFileBasedTest(`// @target: esnext
// @allowJs: true
// @declaration: true
// @outDir: ./dist
// @filename: /src/node_modules/@types/node/index.d.ts
declare module "events" {}

// @filename: /src/b.js
export class Foo {}`, "importDeclFromTypeNodeInJsSource.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, [
    "src/node_modules/@types/node/index.d.ts",
    "src/b.js",
  ]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "esnext",
    allowJs: true,
    declaration: true,
    outDir: "./dist",
    rootDir: "src",
  });
});

test("compilerOptionsForMaterializedCase discovers virtual @types roots for explicit types", () => {
  const parsed = parseFileBasedTest(`// @module: commonjs
// @types: *
// @filename: /.src/node_modules/@types/node/index.d.ts
declare module "url" {
  export function parse(): unknown;
}

// @filename: usage.ts
import { parse } from "url";
export const value = parse();`, "referenceTypesPreferedToPathIfPossible.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["usage.ts"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    module: "commonjs",
    types: ["*"],
    typeRoots: [".src/node_modules/@types"],
  });
});

test("compilerOptionsForMaterializedCase isolates unresolved explicit types from repository node_modules", () => {
  const parsed = parseFileBasedTest(`// @types: node
// @filename: /a.ts
export {};`, "unresolvedTypeDirectiveError.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["a.ts"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    types: ["node"],
    typeRoots: [".empty-types"],
  });
});

test("compilerOptionsForMaterializedCase preserves package fallback for materialized explicit types", () => {
  const parsed = parseFileBasedTest(`// @types: pkg
// @filename: /node_modules/pkg/package.json
{ "name": "pkg", "types": "index.d.ts" }
// @filename: /node_modules/pkg/index.d.ts
export interface Pkg {}
// @filename: /a.ts
import type { Pkg } from "pkg";
const value: Pkg = {};`, "automaticTypeDirectiveResolutionBundler.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["a.ts"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    types: ["pkg"],
  });
});

test("compilerOptionsForMaterializedCase discovers case-root node_modules type roots", () => {
  const parsed = parseFileBasedTest(`// @types: node
// @filename: /node_modules/@types/node/index.d.ts
declare const require: unknown;
// @filename: /a.ts
require;`, "declarationEmitExpressionInExtends6.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, [
    "node_modules/@types/node/index.d.ts",
    "a.ts",
  ]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    types: ["node"],
    typeRoots: ["node_modules/@types"],
  });
});

test("compilerOptionsForMaterializedCase discovers wildcard case-root node_modules type roots", () => {
  const parsed = parseFileBasedTest(`// @types: *
// @filename: /node_modules/@types/.a/index.d.ts
declare const a: number;
// @filename: /node_modules/@types/a/index.d.ts
declare const a: string;
// @filename: /a.ts
a;`, "moduleResolution_automaticTypeDirectiveNames.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, [
    "node_modules/@types/.a/index.d.ts",
    "node_modules/@types/a/index.d.ts",
    "a.ts",
  ]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    types: ["*"],
    typeRoots: ["node_modules/@types"],
  });
});

test("compilerCommandLineArgsForMaterializedCase emits file-mode compiler invocations", () => {
  assert.deepEqual(compilerCommandLineArgsForMaterializedCase({
    target: "es2015",
    module: "nodenext",
    declaration: true,
    outDir: "./dist",
    typeRoots: [".src/node_modules/@types", "vendor-types"],
    skipDefaultLibCheck: true,
  }, ["index.ts", "src/extra.ts"]), [
    "--ignoreConfig",
    "--declaration",
    "--module",
    "nodenext",
    "--outDir",
    "./dist",
    "--skipDefaultLibCheck",
    "--target",
    "es2015",
    "--typeRoots",
    ".src/node_modules/@types,vendor-types",
    "--pretty",
    "false",
    "index.ts",
    "src/extra.ts",
  ]);
});

test("compilerCommandLineArgsForTranspileInvocation runs module transpile without declaration emit", () => {
  assert.deepEqual(compilerOptionsForTranspileInvocation({
    target: "es2015",
    module: "commonjs",
    declaration: true,
    declarationMap: true,
    emitDeclarationOnly: true,
    noEmit: true,
  }, "module"), {
    target: "es2015",
    module: "commonjs",
    noCheck: true,
  });
  assert.deepEqual(compilerCommandLineArgsForTranspileInvocation({
    target: "es2015",
    module: "commonjs",
    declaration: true,
    declarationMap: true,
    emitDeclarationOnly: true,
    noEmit: true,
  }, "index.ts", "module"), [
    "--ignoreConfig",
    "--module",
    "commonjs",
    "--noCheck",
    "--target",
    "es2015",
    "--pretty",
    "false",
    "index.ts",
  ]);
});

test("compilerCommandLineArgsForTranspileInvocation runs declaration transpile as isolated declaration emit", () => {
  assert.deepEqual(compilerOptionsForTranspileInvocation({
    target: "es2015",
    module: "commonjs",
    declarationMap: true,
    noEmit: true,
  }, "declaration"), {
    target: "es2015",
    module: "commonjs",
    declarationMap: true,
    noCheck: true,
    declaration: true,
    emitDeclarationOnly: true,
    isolatedDeclarations: true,
  });
  assert.deepEqual(compilerCommandLineArgsForTranspileInvocation({
    target: "es2015",
    module: "commonjs",
    declarationMap: true,
    noEmit: true,
  }, "index.ts", "declaration"), [
    "--ignoreConfig",
    "--declaration",
    "--declarationMap",
    "--emitDeclarationOnly",
    "--isolatedDeclarations",
    "--module",
    "commonjs",
    "--noCheck",
    "--target",
    "es2015",
    "--pretty",
    "false",
    "index.ts",
  ]);
});

test("transpileInvocationsForMaterializedCase mirrors upstream per-unit module and declaration runs", () => {
  const parsed = parseFileBasedTest(`// @filename: a.ts
export const a = 1;
// @filename: b.ts
export const b = 2;`, "fallback.ts");
  assert.deepEqual(transpileInvocationsForMaterializedCase({
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    target: "es2015",
  }, parsed), [
    {
      label: "module:a.ts",
      kind: "module",
      inputFile: "a.ts",
      reportDiagnostics: false,
      compilerOptions: compilerOptionsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "module"),
      args: compilerCommandLineArgsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "a.ts", "module"),
      expectedOutputFiles: ["a.js", "a.js.map"],
    },
    {
      label: "module:b.ts",
      kind: "module",
      inputFile: "b.ts",
      reportDiagnostics: false,
      compilerOptions: compilerOptionsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "module"),
      args: compilerCommandLineArgsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "b.ts", "module"),
      expectedOutputFiles: ["b.js", "b.js.map"],
    },
    {
      label: "declaration:a.ts",
      kind: "declaration",
      inputFile: "a.ts",
      reportDiagnostics: false,
      compilerOptions: compilerOptionsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "declaration"),
      args: compilerCommandLineArgsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "a.ts", "declaration"),
      expectedOutputFiles: ["a.d.ts", "a.d.ts.map"],
    },
    {
      label: "declaration:b.ts",
      kind: "declaration",
      inputFile: "b.ts",
      reportDiagnostics: false,
      compilerOptions: compilerOptionsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "declaration"),
      args: compilerCommandLineArgsForTranspileInvocation({ declaration: true, declarationMap: true, sourceMap: true, target: "es2015" }, "b.ts", "declaration"),
      expectedOutputFiles: ["b.d.ts", "b.d.ts.map"],
    },
  ]);
});

test("transpileInvocationsForMaterializedCase preserves upstream reportDiagnostics directive", () => {
  const parsed = parseFileBasedTest(`// @filename: index.ts
export const value = 1;`, "fallback.ts");
  const invocations = transpileInvocationsForMaterializedCase(
    { declaration: true },
    parsed,
    undefined,
    new Map([["reportdiagnostics", "true"]]),
  );
  assert.deepEqual(invocations.map((invocation) => ({
    label: invocation.label,
    reportDiagnostics: invocation.reportDiagnostics,
  })), [
    { label: "module:index.ts", reportDiagnostics: true },
    { label: "declaration:index.ts", reportDiagnostics: true },
  ]);
});

test("getFileBasedTestConfigurations varies source map transpile directives", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["sourcemap", "true,false"],
    ["inlinesourcemap", "true,false"],
    ["target", "es6"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    sourceMap: configuration.settings.get("sourcemap"),
    inlineSourceMap: configuration.settings.get("inlinesourcemap"),
  })), [
    {
      name: "inlinesourcemap=true,sourcemap=true",
      sourceMap: "true",
      inlineSourceMap: "true",
    },
    {
      name: "inlinesourcemap=false,sourcemap=true",
      sourceMap: "true",
      inlineSourceMap: "false",
    },
    {
      name: "inlinesourcemap=true,sourcemap=false",
      sourceMap: "false",
      inlineSourceMap: "true",
    },
    {
      name: "inlinesourcemap=false,sourcemap=false",
      sourceMap: "false",
      inlineSourceMap: "false",
    },
  ]);
});

test("transpileExpectedOutputFiles follows TypeScript extension rules", () => {
  assert.deepEqual(transpileExpectedOutputFiles("index.tsx", { jsx: "preserve", sourceMap: true }, "module"), ["index.jsx", "index.jsx.map"]);
  assert.deepEqual(transpileExpectedOutputFiles("index.mts", {}, "declaration"), ["index.d.mts"]);
});

test("compilerOptionsForExistingProjectConfig gives file-based directives command-line precedence", () => {
  const settings = new Map([
    ["module", "commonjs"],
    ["target", "es2015"],
    ["types", "*"],
  ]);
  assert.deepEqual(compilerOptionsForExistingProjectConfig({
    compilerOptions: {
      module: "esnext",
      strict: true,
    },
    files: ["a.ts"],
  }, settings), {
    compilerOptions: {
      newLine: "crlf",
      noErrorTruncation: true,
      skipDefaultLibCheck: true,
      target: "es2015",
      module: "commonjs",
      strict: true,
      types: ["*"],
    },
    files: ["a.ts"],
  });
});

test("compilerOptionsForExistingProjectConfig normalizes file-based harness string lists", () => {
  assert.deepEqual(compilerOptionsForExistingProjectConfig({
    files: "a.ts",
    include: "src/**/*.ts",
    exclude: "dist",
    compilerOptions: {
      moduleResolution: "node16",
    },
  }, new Map()), {
    files: ["a.ts"],
    include: ["src/**/*.ts"],
    exclude: ["dist"],
    compilerOptions: {
      newLine: "crlf",
      noErrorTruncation: true,
      skipDefaultLibCheck: true,
      target: "ES2024",
      moduleResolution: "node16",
    },
  });
});

test("compilerOptionsForMaterializedCase respects virtual volume mismatches", () => {
  const parsed = parseFileBasedTest(`// @target: es2015
// @useCaseSensitiveFileNames: true
// @outDir: A:/
// @Filename: A:/foo/bar.ts
var x: number;

// @Filename: a:/foo/baz.ts
var y: number;`, "commonSourceDir4.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["A:/foo/bar.ts", "a:/foo/baz.ts"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "es2015",
    outDir: "A:/",
  });
});

test("parseFileBasedTest recognizes BOM-prefixed directives", () => {
  const parsed = parseFileBasedTest("\uFEFF// @strict: false\n// @target: es2015\ndeclare namespace Foo.Bar { export var foo; };\n", "ambientModules.ts");
  assert.equal(parsed.globalOptions.get("strict"), "false");
  assert.equal(parsed.globalOptions.get("target"), "es2015");
  assert.deepEqual(parsed.units, [{ fileName: "ambientModules.ts", content: "declare namespace Foo.Bar { export var foo; };\n" }]);
});

test("decodeSourceText handles UTF-16 compiler corpus files", () => {
  assert.equal(decodeSourceText(Uint8Array.from([0xFE, 0xFF, 0x00, 0x76, 0x00, 0x61, 0x00, 0x72])), "var");
  assert.equal(decodeSourceText(Uint8Array.from([0xFF, 0xFE, 0x76, 0x00, 0x61, 0x00, 0x72, 0x00])), "var");
});

test("getFileBasedTestConfigurations expands TS-Go variations", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["noimplicitany", "true, false"],
    ["strict", "*"],
    ["strictbuiltiniteratorreturn", "*, !true"],
    ["target", "es2020"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    noImplicitAny: configuration.settings.get("noimplicitany"),
    strict: configuration.settings.get("strict"),
    strictBuiltinIteratorReturn: configuration.settings.get("strictbuiltiniteratorreturn"),
    target: configuration.settings.get("target"),
  })), [
    {
      name: "noimplicitany=true,strict=true",
      noImplicitAny: "true",
      strict: "true",
      strictBuiltinIteratorReturn: "false",
      target: "es2020",
    },
    {
      name: "noimplicitany=true,strict=false",
      noImplicitAny: "true",
      strict: "false",
      strictBuiltinIteratorReturn: "false",
      target: "es2020",
    },
    {
      name: "noimplicitany=false,strict=true",
      noImplicitAny: "false",
      strict: "true",
      strictBuiltinIteratorReturn: "false",
      target: "es2020",
    },
    {
      name: "noimplicitany=false,strict=false",
      noImplicitAny: "false",
      strict: "false",
      strictBuiltinIteratorReturn: "false",
      target: "es2020",
    },
  ]);
});

test("getFileBasedTestConfigurations expands wildcard targets and modules", () => {
  const targetConfigurations = getFileBasedTestConfigurations(new Map([
    ["target", "*,-es3"],
  ]));
  assert.equal(targetConfigurations.length, 13);
  assert.deepEqual(targetConfigurations.slice(0, 3).map((configuration) => configuration.settings.get("target")), ["es5", "es6", "es2016"]);
  assert.equal(targetConfigurations.at(-1).settings.get("target"), "esnext");

  const moduleConfigurations = getFileBasedTestConfigurations(new Map([
    ["module", "*"],
  ]));
  assert.equal(moduleConfigurations.length, 13);
  assert.deepEqual(moduleConfigurations.slice(0, 4).map((configuration) => configuration.settings.get("module")), ["commonjs", "amd", "umd", "system"]);
});

test("getFileBasedTestConfigurations de-duplicates enum aliases by compiler value", () => {
  assert.deepEqual(getFileBasedTestConfigurations(new Map([
    ["target", "es6,es2015"],
    ["module", "es6,es2015"],
  ])).map((configuration) => ({
    name: configuration.name,
    module: configuration.settings.get("module"),
    target: configuration.settings.get("target"),
  })), [{
    name: "",
    module: "es6",
    target: "es6",
  }]);
});

test("compilerOptionsForMaterializedCase preserves missing module for node module-resolution diagnostics", () => {
  const parsed = parseFileBasedTest(`// @moduleResolution: node16
// @filename: a.ts
import "./b";`, "a.ts");
  assert.equal(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["a.ts"]).module, undefined);
});

test("compilerOptionsForMaterializedCase preserves TS-Go harness emit directives for on-disk verification", () => {
  const parsed = parseFileBasedTest(`// @declaration: true
// @declarationMap: true
// @sourceMap: true
// @sourceRoot: local
// @emitBOM: true
// @inlineSources: true
// @stripInternal: true
// @outDir: dist

/** @internal */
export const hidden = 1;
export const visible = 2;`, "emitDirectives.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["emitDirectives.ts"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    declaration: true,
    declarationMap: true,
    emitBOM: true,
    inlineSources: true,
    outDir: "dist",
    sourceMap: true,
    sourceRoot: "local",
    stripInternal: true,
  });
});

test("compilerOptionsForMaterializedCase prevents JavaScript emit overwrite when harness suppresses output-path checks", () => {
  const parsed = parseFileBasedTest(`// @allowJS: true
// @suppressOutputPathCheck: true
// @filename: 0.js
/** @param {number=} n */
function foo(n) {}`, "jsdoc.ts");
  assert.deepEqual(compilerOptionsForMaterializedCase(parsed.globalOptions, parsed, ["0.js"]), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "ES2024",
    allowJs: true,
    outDir: ".out",
  });
});

test("getFileBasedTestConfigurations lets variation values override base options", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["target", "es5, es2015"],
    ["lib", "es2015"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    target: configuration.settings.get("target"),
    lib: configuration.settings.get("lib"),
  })), [
    {
      name: "target=es5",
      target: "es5",
      lib: "es2015",
    },
    {
      name: "target=es2015",
      target: "es2015",
      lib: "es2015",
    },
  ]);
});

test("getFileBasedTestConfigurations expands noLib with target variations", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["lib", "es5"],
    ["nolib", "true,false"],
    ["target", "es5,es2015"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    noLib: configuration.settings.get("nolib"),
    target: configuration.settings.get("target"),
  })), [
    {
      name: "nolib=true,target=es5",
      noLib: "true",
      target: "es5",
    },
    {
      name: "nolib=true,target=es2015",
      noLib: "true",
      target: "es2015",
    },
    {
      name: "nolib=false,target=es5",
      noLib: "false",
      target: "es5",
    },
    {
      name: "nolib=false,target=es2015",
      noLib: "false",
      target: "es2015",
    },
  ]);
});

test("getFileBasedTestConfigurations expands override, property-access, and module variations", () => {
  // The vary-by set is derived from the ported OptionsDeclarations exactly like
  // compiler_runner.go getCompilerVaryByMap; preserveValueImports no longer exists in
  // TS-Go's option declarations, so it does NOT vary (its tests are name-skipped).
  const configurations = getFileBasedTestConfigurations(new Map([
    ["noimplicitoverride", "true,false"],
    ["nopropertyaccessfromindexsignature", "true,false"],
    ["isolatedmodules", "true,false"],
    ["nouncheckedindexedaccess", "true,false"],
  ]));
  assert.equal(configurations.length, 16);
  assert.deepEqual(configurations[0].settings.get("noimplicitoverride"), "true");
  assert.deepEqual(configurations[0].settings.get("nopropertyaccessfromindexsignature"), "true");
  assert.deepEqual(configurations[0].settings.get("isolatedmodules"), "true");
  assert.deepEqual(configurations[0].settings.get("nouncheckedindexedaccess"), "true");
  assert.deepEqual(configurations.at(-1).settings.get("noimplicitoverride"), "false");
  assert.deepEqual(configurations.at(-1).settings.get("nopropertyaccessfromindexsignature"), "false");
  assert.deepEqual(configurations.at(-1).settings.get("isolatedmodules"), "false");
  assert.deepEqual(configurations.at(-1).settings.get("nouncheckedindexedaccess"), "false");
  const nonVarying = getFileBasedTestConfigurations(new Map([["preservevalueimports", "true,false"]]));
  assert.equal(nonVarying.length, 1);
});

test("getFileBasedTestConfigurations expands alwaysStrict with target variations", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["alwaysstrict", "true,false"],
    ["strict", "false"],
    ["target", "es5,es2015"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    alwaysStrict: configuration.settings.get("alwaysstrict"),
    target: configuration.settings.get("target"),
  })), [
    {
      name: "alwaysstrict=true,target=es5",
      alwaysStrict: "true",
      target: "es5",
    },
    {
      name: "alwaysstrict=true,target=es2015",
      alwaysStrict: "true",
      target: "es2015",
    },
    {
      name: "alwaysstrict=false,target=es5",
      alwaysStrict: "false",
      target: "es5",
    },
    {
      name: "alwaysstrict=false,target=es2015",
      alwaysStrict: "false",
      target: "es2015",
    },
  ]);
});

test("getFileBasedTestConfigurations expands catch-variable strictness variations", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["strict", "true, false"],
    ["target", "es2015"],
    ["useunknownincatchvariables", "true, false"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    strict: configuration.settings.get("strict"),
    useUnknownInCatchVariables: configuration.settings.get("useunknownincatchvariables"),
  })), [
    {
      name: "strict=true,useunknownincatchvariables=true",
      strict: "true",
      useUnknownInCatchVariables: "true",
    },
    {
      name: "strict=true,useunknownincatchvariables=false",
      strict: "true",
      useUnknownInCatchVariables: "false",
    },
    {
      name: "strict=false,useunknownincatchvariables=true",
      strict: "false",
      useUnknownInCatchVariables: "true",
    },
    {
      name: "strict=false,useunknownincatchvariables=false",
      strict: "false",
      useUnknownInCatchVariables: "false",
    },
  ]);
});

test("getFileBasedTestConfigurations expands JSX and moduleDetection variations", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["jsx", "react,preserve"],
    ["module", "commonjs"],
    ["moduledetection", "legacy,force"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    jsx: configuration.settings.get("jsx"),
    moduleDetection: configuration.settings.get("moduledetection"),
  })), [
    {
      name: "jsx=react,moduledetection=legacy",
      jsx: "react",
      moduleDetection: "legacy",
    },
    {
      name: "jsx=react,moduledetection=force",
      jsx: "react",
      moduleDetection: "force",
    },
    {
      name: "jsx=preserve,moduledetection=legacy",
      jsx: "preserve",
      moduleDetection: "legacy",
    },
    {
      name: "jsx=preserve,moduledetection=force",
      jsx: "preserve",
      moduleDetection: "force",
    },
  ]);
});

test("parseArgs validates supported suites", () => {
  assert.equal(parseArgs(["--suite", "compiler"]).suite, "compiler");
  assert.equal(parseArgs(["--corpus", "typescript", "--suite", "conformance"]).corpus, "typescript");
  assert.equal(parseArgs(["--corpus", "typescript", "--suite", "project"]).suite, "project");
  assert.equal(parseArgs(["--corpus", "typescript", "--suite", "transpile"]).suite, "transpile");
  assert.equal(parseArgs(["--exact-baselines"]).exactBaselines, true);
  // Weak mode removed: exact-baseline comparison is the default (and only) mode.
  assert.equal(parseArgs([]).exactBaselines, true);
  // Default concurrency is all cores; --jobs 1 selects serial.
  assert.ok(parseArgs([]).jobs >= 1);
  assert.equal(parseArgs(["--jobs", "1"]).jobs, 1);
  // On-disk verification is opt-in (default off = fast harness-only path).
  assert.equal(parseArgs([]).verifyOnDisk, false);
  assert.equal(parseArgs(["--verify-on-disk"]).verifyOnDisk, true);
  // Resume is off by default; --resume takes the prior reportRoot.
  assert.equal(parseArgs([]).resume, "");
  assert.equal(parseArgs(["--resume", ".temp/tsgo-suite/x"]).resume, ".temp/tsgo-suite/x");
  assert.equal(parseArgs(["--inventory"]).inventory, true);
  assert.throws(() => parseArgs(["--jobs", "0"]), /--jobs must be a positive safe integer/);
  assert.throws(() => parseArgs(["--jobs", "1.5"]), /--jobs must be a positive safe integer/);
  assert.throws(() => parseArgs(["--limit", "-1"]), /--limit must be a non-negative safe integer/);
  assert.throws(() => parseArgs(["--limit", "NaN"]), /--limit must be a non-negative safe integer/);
  assert.throws(() => parseArgs(["--suite", "fourslash"]), /Unsupported suite/);
  assert.throws(() => parseArgs(["--corpus", "typescript", "--suite", "projects"]), /Unsupported suite/);
  assert.throws(() => parseArgs(["--corpus", "current", "--suite", "transpile"]), /Unsupported suite/);
  assert.throws(() => parseArgs(["--corpus", "unknown"]), /Unsupported corpus/);
});

test("parseBaselineSections preserves repeated section names for input/output baselines", () => {
  const sections = parseBaselineSections(`//// [index.js] ////\r\nconst input = 1;\r\n//// [index.js]\r\nconst output = 1;\r\n//// [index.d.ts] ////\r\nexport {};\r\n`);
  assert.deepEqual(sections, [
    { name: "index.js", content: "const input = 1;" },
    { name: "index.js", content: "const output = 1;" },
    { name: "index.d.ts", content: "export {};\n" },
  ]);
});

test("parseBaselineSections preserves embedded diagnostics sections", () => {
  const sections = parseBaselineSections(`//// [index.d.ts] ////\r\nexport {};\r\n//// [Diagnostics reported]\r\nindex.ts(1,1): error TS9007: Needs annotation.\r\n`);
  assert.deepEqual(sections, [
    { name: "index.d.ts", content: "export {};" },
    { name: "Diagnostics reported", content: "index.ts(1,1): error TS9007: Needs annotation.\n" },
  ]);
});

test("parseBaselineSections trims diagnostic separators from emitted output sections", () => {
  const sections = parseBaselineSections(`//// [index.d.ts] ////\r\nexport declare function fn(): void;\r\n\r\n\r\n//// [Diagnostics reported]\r\nindex.ts(1,1): error TS9007: Needs annotation.\r\n`);
  assert.deepEqual(sections, [
    { name: "index.d.ts", content: "export declare function fn(): void;" },
    { name: "Diagnostics reported", content: "index.ts(1,1): error TS9007: Needs annotation.\n" },
  ]);
});

test("diagnosticHeadlineText compares the command-line diagnostic contract", () => {
  assert.equal(
    diagnosticHeadlineText(`file.ts(1,1): error TS1000: First.\r\nfile.ts(2,1): error TS1001: Second.\r\n\r\n==== file.ts (2 errors) ====\r\n    source\r\n`),
    "file.ts(1,1): error TS1000: First.\nfile.ts(2,1): error TS1001: Second.",
  );
});

test("diagnosticHeadlineText accepts TS-Go message headlines", () => {
  assert.equal(
    diagnosticHeadlineText(`file.ts(1,1): message TS1450: First.\r\nfile.ts(2,1): message TS1451: Second.\r\n\r\n==== file.ts (2 errors) ====\r\n    source\r\n`),
    "file.ts(1,1): message TS1450: First.\nfile.ts(2,1): message TS1451: Second.",
  );
});

test("sortDiagnosticsForBaseline orders diagnostics by source position", () => {
  const diagnostics = [
    { file: { fileName: "/b.ts" }, loc: { pos: 2, end: 3 }, code: 2000 },
    { file: { fileName: "/a.ts" }, loc: { pos: 15, end: 20 }, code: 1005 },
    { file: { fileName: "/a.ts" }, loc: { pos: 13, end: 14 }, code: 9010 },
  ];
  assert.deepEqual(sortDiagnosticsForBaseline(diagnostics).map((diagnostic) => diagnostic.code), [9010, 1005, 2000]);
});

test("hasRootPackageJson detects only root package boundaries", () => {
  assert.equal(hasRootPackageJson(["src/package.json", "src/a.ts"]), false);
  assert.equal(hasRootPackageJson(["package.json", "src/a.ts"]), true);
  assert.equal(hasRootPackageJson(["Package.JSON", "src/a.ts"]), true);
});

test("caseDirectoryFragment isolates TS-Go configuration variants", () => {
  const base = {
    suite: "compiler",
    relativePath: "compiler/superCallInJSWithWrongBaseTypeArgumentCount1.ts",
    caseName: "superCallInJSWithWrongBaseTypeArgumentCount1",
  };
  assert.notEqual(
    caseDirectoryFragment({ ...base, configurationName: "strict=true" }),
    caseDirectoryFragment({ ...base, configurationName: "strict=false" }),
  );
});

test("normalizeHarnessPath canonicalizes contained paths and rejects traversal", async () => {
  const { normalizeHarnessPath } = await import("./run.mjs");
  assert.equal(normalizeHarnessPath("./src/../index.ts"), "index.ts");
  assert.throws(() => normalizeHarnessPath("../outside.ts"), /not contained in the case root/);
  assert.throws(() => normalizeHarnessPath("src/../../outside.ts"), /not contained in the case root/);
});

test("isEmittedJavaScriptSibling excludes generated JS beside TS sources", () => {
  const source = new URL("../../_vendor/typescript-go/testdata/tests/cases/compiler/jsxNestedIndentation.tsx", import.meta.url);
  const emitted = new URL("../../_vendor/typescript-go/testdata/tests/cases/compiler/jsxNestedIndentation.js", import.meta.url);
  assert.equal(isEmittedJavaScriptSibling(source.pathname), false);
  assert.equal(isEmittedJavaScriptSibling(emitted.pathname), true);
});

test("isLanguageServiceHarnessCase identifies LS harness real-world cases only", () => {
  assert.equal(isLanguageServiceHarnessCase(`///<reference path='..\\services\\typescriptServices.ts' />
declare var assert: Harness.Assert;
declare var describe;
declare var it;
declare var run;
declare var IO: IIO;`), true);
  assert.equal(isLanguageServiceHarnessCase(`///<reference path='formatting.ts' />
export class Indenter implements ILineIndenationResolver {
  constructor(public snapshot: ITextSnapshot, public editorOptions: Services.EditorOptions) {}
}`), true);
  assert.equal(isLanguageServiceHarnessCase(`declare var it: Iterator<number>;
for (const value of it) {
  value;
}`), false);
});

test("discoverCases excludes TypeScript LS harness cases before scheduling", async () => {
  const parserHarnessCases = await discoverCases({
    corpus: "typescript",
    suite: "conformance",
    filter: "parserharness",
    limit: 0,
  });
  const parserIndenterCases = await discoverCases({
    corpus: "typescript",
    suite: "conformance",
    filter: "parserindenter",
    limit: 0,
  });
  assert.deepEqual(parserHarnessCases, []);
  assert.deepEqual(parserIndenterCases, []);
});

test("discoverCases schedules project descriptors instead of fixture source files", async () => {
  const cases = await discoverCases({
    corpus: "typescript",
    suite: "project",
    filter: "project/baseline.json",
    limit: 0,
  });
  assert.deepEqual(cases.map((testCase) => ({
    suite: testCase.suite,
    kind: testCase.kind,
    relativePath: testCase.relativePath,
    caseName: testCase.caseName,
    configurationName: testCase.configurationName,
    projectRoot: testCase.descriptor.projectRoot,
    inputFiles: testCase.descriptor.inputFiles,
  })), [
    {
      suite: "project",
      kind: "project",
      relativePath: "project/baseline.json",
      caseName: "baseline",
      configurationName: "module=amd",
      projectRoot: "tests/cases/projects/baseline",
      inputFiles: ["emit.ts"],
    },
    {
      suite: "project",
      kind: "project",
      relativePath: "project/baseline.json",
      caseName: "baseline",
      configurationName: "module=commonjs",
      projectRoot: "tests/cases/projects/baseline",
      inputFiles: ["emit.ts"],
    },
  ]);
});

test("compilerOptionsForProjectDescriptor mirrors upstream project defaults and descriptor overrides", () => {
  assert.deepEqual(compilerOptionsForProjectDescriptor({
    scenario: "map roots",
    projectRoot: "tests/cases/projects/outputdir_simple",
    inputFiles: ["test.ts"],
    declaration: true,
    sourceMap: true,
    outDir: "outdir/simple",
    mapRoot: "tests/cases/projects/outputdir_simple/mapFiles",
    resolveMapRoot: true,
    sourceRoot: "../src",
  }, "amd", "/tmp/case"), {
    noErrorTruncation: false,
    skipDefaultLibCheck: false,
    moduleResolution: "classic",
    module: "amd",
    newLine: "crlf",
    declaration: true,
    sourceMap: true,
    outDir: "outdir/simple",
    mapRoot: "/tmp/case/tests/cases/projects/outputdir_simple/mapFiles",
    sourceRoot: "../src",
  });
});

test("errorDiffNewSideHasErrors reads effective TS-Go expectations from baseline diffs", () => {
  const diff = new URL("../../_vendor/typescript-go/testdata/baselines/reference/submoduleTriaged/compiler/augmentExportEquals2.errors.txt.diff", import.meta.url);
  assert.equal(errorDiffNewSideHasErrors(diff.pathname), false);
});

test("errorDiffNewSideHasErrors detects newly added diagnostics in baseline diffs", () => {
  const diff = new URL("../../_vendor/typescript-go/testdata/baselines/reference/submoduleAccepted/compiler/controlFlowInstanceof.errors.txt.diff", import.meta.url);
  assert.equal(errorDiffNewSideHasErrors(diff.pathname), true);
});

test("errorDiffNewSideHasErrors treats accepted removed diagnostics as clean", () => {
  const diff = new URL("../../_vendor/typescript-go/testdata/baselines/reference/submoduleAccepted/compiler/importDeclWithExportModifierAndExportAssignmentInAmbientContext.errors.txt.diff", import.meta.url);
  assert.equal(errorDiffNewSideHasErrors(diff.pathname), false);
});

test("errorDiffNewSideHasErrors preserves compact hidden diagnostics", () => {
  const diff = new URL("../../_vendor/typescript-go/testdata/baselines/reference/submoduleAccepted/compiler/jsDeclarationEmitExportedClassWithExtends.errors.txt.diff", import.meta.url);
  assert.equal(errorDiffNewSideHasErrors(diff.pathname), true);
});

test("baselineHasErrors requires exact matches for configured TS-Go variations", () => {
  const base = {
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/classMemberInitializerScoping2.ts",
    caseName: "classMemberInitializerScoping2",
  };
  assert.equal(baselineHasErrors({ ...base, configurationName: "target=es2017,usedefineforclassfields=true" }), true);
  assert.equal(baselineHasErrors({ ...base, configurationName: "target=esnext,usedefineforclassfields=true" }), false);
});

test("baselineHasErrors does not borrow unrelated configured baselines for unconfigured runs", () => {
  assert.equal(baselineHasErrors({
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/emitHelpersWithLocalCollisions.ts",
    caseName: "emitHelpersWithLocalCollisions",
    configurationName: "",
  }), false);
});

test("baselineHasErrors detects ANSI-colored pretty baselines", () => {
  assert.equal(baselineHasErrors({
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/prettyContextNotDebugAssertion.ts",
    caseName: "prettyContextNotDebugAssertion",
    configurationName: "",
  }), true);
});

test("baselineHasErrors reads pinned TS-Go submodule baselines for submodule corpus", () => {
  // The typescript corpus gates against reference/submodule/<suite> (pinned TS-Go's own
  // full outputs); Strada baselines are no longer consulted for compiler/conformance.
  assert.equal(baselineHasErrors({
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/ArrowFunctionExpression1.ts",
    caseName: "ArrowFunctionExpression1",
    configurationName: "",
  }), true);
  // Upstream skips @module: system cases (SkipUnsupportedCompilerOptions), so no
  // submodule baseline exists for them.
  assert.equal(baselineHasErrors({
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/SystemModuleForStatementNoInitializer.ts",
    caseName: "SystemModuleForStatementNoInitializer",
    configurationName: "",
  }), false);
});

test("baselineHasErrors reads TypeScript project baselines by module variant", () => {
  assert.equal(baselineHasErrors({
    corpus: "typescript",
    suite: "project",
    relativePath: "project/baseline.json",
    caseName: "baseline",
    configurationName: "module=commonjs",
    moduleKind: "commonjs",
  }), true);
  assert.equal(baselineHasErrors({
    corpus: "typescript",
    suite: "project",
    relativePath: "project/baseline.json",
    caseName: "baseline",
    configurationName: "module=amd",
    moduleKind: "amd",
  }), true);
});

test("getSkipReason mirrors TS-Go runner skips", () => {
  // compiler_runner.go skippedTests + harnessutil.go SkipUnsupportedCompilerOptions:
  // the pinned TS-Go runner skips these outright, so no reference baselines exist and
  // there is nothing to gate against. The suite mirrors the skip, counted and reasoned.
  const base = { sourceBaseName: "case.ts", configuration: new Map() };
  assert.match(getSkipReason({ ...base, configuration: new Map([["target", "ES5"]]) }), /unsupported target es5/);
  assert.match(getSkipReason({ ...base, configuration: new Map([["alwaysstrict", "false"]]) }), /alwaysStrict=false/);
  assert.match(getSkipReason({ ...base, configuration: new Map([["moduleresolution", "classic"]]) }), /unsupported module resolution kind classic/);
  assert.match(getSkipReason({ ...base, configuration: new Map([["module", "amd"]]) }), /unsupported module kind amd/);
  assert.match(getSkipReason({ ...base, configuration: new Map([["baseurl", "./"]]) }), /unsupported baseUrl/);
  assert.match(getSkipReason({ ...base, sourceBaseName: "moduleNoneDynamicImport.ts" }), /TS-Go runner skip list/);
  assert.equal(getSkipReason({ ...base, configuration: new Map([["module", "esnext"]]) }), "");
  assert.equal(getSkipReason(base), "");
});

test("compilerOptionsFromSettings preserves removed option values for TS-Go diagnostics", () => {
  const options = compilerOptionsFromSettings(new Map([["target", "ES5"]]));
  assert.equal(options.target, "ES5");
});

test("caseExpectedErrors treats TS-Go removed option diagnostics as expected errors", () => {
  const cleanCase = {
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/emitHelpersWithLocalCollisions.ts",
    caseName: "emitHelpersWithLocalCollisions",
    configurationName: "",
  };
  assert.equal(baselineHasErrors(cleanCase), false);
  assert.equal(caseExpectedErrors(cleanCase, { target: "ES5" }), true);
  assert.equal(caseExpectedErrors(cleanCase, { module: "amd" }), true);
  assert.equal(caseExpectedErrors(cleanCase, { moduleResolution: "classic" }), true);
  assert.equal(caseExpectedErrors(cleanCase, { alwaysStrict: false }), true);
  assert.equal(caseExpectedErrors(cleanCase, { esModuleInterop: false }), true);
  assert.equal(caseExpectedErrors(cleanCase, { allowSyntheticDefaultImports: false }), true);
  assert.equal(caseExpectedErrors(cleanCase, { baseUrl: "." }), true);
  assert.equal(caseExpectedErrors(cleanCase, { out: "all.js" }), true);
  assert.equal(caseExpectedErrors(cleanCase, { outFile: "bundle.js" }), true);
  assert.equal(caseExpectedErrors(cleanCase, { keyofStringsOnly: true }), true);
  assert.equal(caseExpectedErrors(cleanCase, { noImplicitUseStrict: true }), true);
  assert.equal(caseExpectedErrors(cleanCase, { importsNotUsedAsValues: "preserve" }), true);
  assert.equal(caseExpectedErrors(cleanCase, { downlevelIteration: true }), true);
  assert.equal(compilerOptionsRequireTsGoRemovedOptionDiagnostic({ target: "ES2024" }), false);
});

test("buildTestUniverseInventory tracks full compiler scope and excludes language service scope", async () => {
  const inventory = await buildTestUniverseInventory();
  assert.equal(inventory.currentHarness.inScope, 318);
  assert.ok(inventory.typeScriptCases.entries.compiler > inventory.currentHarness.entries.compiler);
  assert.ok(inventory.typeScriptCases.entries.conformance > inventory.currentHarness.entries.conformance);
  assert.equal(inventory.typeScriptCases.entries.project, 316);
  assert.equal(inventory.typeScriptCases.entries.projects, 0);
  assert.equal(inventory.typeScriptCases.entries.unittests, 1);
  assert.equal(inventory.typeScriptCases.languageServiceHarnessCases, 2);
  assert.equal(inventory.typeScriptCases.outOfScope, inventory.typeScriptCases.entries.fourslash + inventory.typeScriptCases.languageServiceHarnessCases);
  assert.ok(inventory.typeScriptCases.inScope >= inventory.typeScriptCases.entries.unittests);
  assert.ok(inventory.baselines.entries.astnav > 0);
  assert.ok(inventory.baselines.entries.tsbuildWatch > 0);
  assert.ok(inventory.baselines.entries.tscWatch > 0);
  assert.ok(inventory.baselines.entries.fourslash > 0);
  assert.ok(inventory.baselines.entries.lsp > 0);
  assert.equal(inventory.baselines.outOfScope, inventory.baselines.entries.fourslash + inventory.baselines.entries.lsp);
  assert.ok(inventory.goTests.entries["internal/fourslash"] > 0);
  assert.ok(inventory.goTests.outOfScope >= inventory.goTests.entries["internal/fourslash"]);
});

test("applyTsgoAcceptedOverlay replaces emitted output sections and reports use", async () => {
  const { applyTsgoAcceptedOverlay } = await import("./run.mjs");
  const expectedOutputs = new Map([["v1.d.ts", "strada content"], ["v2.d.ts", "untouched"]]);
  const headlines = [];
  const sources = [];
  const { used, problems } = applyTsgoAcceptedOverlay(
    "case.d.ts",
    [{ name: "v1.d.ts", content: "tsgo content" }],
    expectedOutputs,
    headlines,
    sources,
  );
  assert.deepEqual(used, ["case.d.ts#v1.d.ts"]);
  assert.deepEqual(problems, []);
  assert.equal(expectedOutputs.get("v1.d.ts"), "tsgo content");
  assert.equal(expectedOutputs.get("v2.d.ts"), "untouched");
});

test("applyTsgoAcceptedOverlay rejects stale and unknown overlay sections", async () => {
  const { applyTsgoAcceptedOverlay } = await import("./run.mjs");
  const expectedOutputs = new Map([["v1.d.ts", "same content"]]);
  const { used, problems } = applyTsgoAcceptedOverlay(
    "case.d.ts",
    [
      { name: "v1.d.ts", content: "same content" },
      { name: "missing.d.ts", content: "anything" },
    ],
    expectedOutputs,
    [],
    [],
  );
  assert.deepEqual(used, []);
  assert.equal(problems.length, 2);
  assert.match(problems[0], /matches the reference baseline/);
  assert.match(problems[1], /no such emitted output/);
});

test("applyTsgoAcceptedOverlay supersedes every Diagnostics reported section of the artifact", async () => {
  const { applyTsgoAcceptedOverlay } = await import("./run.mjs");
  const headlines = ["a.ts(1,1): error TS1: old.", "b.ts(1,1): error TS2: old."];
  const sources = ["case.d.ts#Diagnostics reported", "case.d.ts#Diagnostics reported"];
  const { used, problems } = applyTsgoAcceptedOverlay(
    "case.d.ts",
    [{ name: "Diagnostics reported", content: "a.ts(2,2): error TS9: new." }],
    new Map(),
    headlines,
    sources,
  );
  assert.deepEqual(used, ["case.d.ts#Diagnostics reported"]);
  assert.deepEqual(problems, []);
  assert.equal(headlines[0], "a.ts(2,2): error TS9: new.");
  assert.equal(headlines[1], "");
});

test("loadTsgoAcceptedOverlay returns sections for committed overlays and undefined otherwise", async () => {
  const { loadTsgoAcceptedOverlay, TSGO_ACCEPTED_ABSENT_MARKER } = await import("./run.mjs");
  assert.equal(loadTsgoAcceptedOverlay("typescript", "transpile", "no-such-overlay.d.ts"), undefined);
  const sections = loadTsgoAcceptedOverlay("typescript", "transpile", "declarationRestParameters.d.ts");
  assert.ok(Array.isArray(sections));
  assert.equal(sections.some((section) => section.name === "v1.d.ts"), false);
  assert.equal(sections.some((section) => section.name === "Diagnostics reported"), false);
  assert.equal(sections.find((section) => section.name === "v2.d.ts")?.content.trim(), TSGO_ACCEPTED_ABSENT_MARKER);
});

test("trimResult flattens retained lines, caps them, and passes through already-trimmed records", async () => {
  const { trimResult } = await import("./run.mjs");
  const big = `first line\n${"x".repeat(5000)}\n${Array.from({ length: 30 }, (_, i) => `line ${i}`).join("\n")}`;
  const trimmed = trimResult({
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/a.ts",
    configurationName: "",
    status: "pass",
    expectedErrors: false,
    actualErrors: false,
    exitCode: 0,
    signal: null,
    caseDir: "/tmp/case",
    skipReason: "",
    exactBaseline: { status: "pass", checked: 1, comparable: 1, unsupported: [], tsgoAccepted: [], mismatches: [], expectedDiagnosticsPresent: false, actualErrors: undefined, usedHarness: false },
    stdout: big,
    stderr: "",
  });
  assert.equal(trimmed.firstOutputLines.length, 20);
  assert.equal(trimmed.firstOutputLines[0], "first line");
  // Long lines are capped so no record can retain unbounded output.
  assert.equal(trimmed.firstOutputLines[1].length, 1000);
  assert.equal(trimmed.stdout, undefined);
  assert.equal(trimmed.stderr, undefined);
  // Already-trimmed records pass through unchanged.
  assert.equal(trimResult(trimmed), trimmed);
});

test("result ledger validates provenance, restores order, and tolerates only a truncated segment tail", async () => {
  const { createResultRecord, loadResultLedger, readResults } = await import("./run.mjs");
  const { mkdtemp, writeFile: writeFileAsync, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join: joinPath } = await import("node:path");
  const dir = await mkdtemp(joinPath(tmpdir(), "tsgo-suite-ndjson-"));
  try {
    const path = joinPath(dir, "results-0001.ndjson");
    const manifest = protocolTestManifest(["a", "b", "c"]);
    const record = (caseIndex, status) => createResultRecord(manifest, caseIndex, protocolTestResult(manifest.cases[caseIndex], status === "skip"
      ? { skipReason: "test" }
      : status === "fail" ? { actualErrors: true, exitCode: 1 } : {}));
    const lines = [record(2, "pass"), record(0, "skip"), record(1, "fail")];
    await writeFileAsync(path, lines.map((line) => JSON.stringify(line)).join("\n") + "\n{truncated");
    const records = await readResults(path, manifest);
    assert.deepEqual(records.map((record) => record.relativePath), ["compiler/a.ts", "compiler/b.ts", "compiler/c.ts"]);
    assert.equal(loadResultLedger([path], manifest).doneIndices.size, 3);

    const wrong = joinPath(dir, "results-0002.ndjson");
    await writeFileAsync(wrong, `${JSON.stringify({ ...record(0, "pass"), caseId: "wrong" })}\n`);
    assert.throws(() => loadResultLedger([wrong], manifest), /case identity mismatch/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("run manifest validation detects tampering and malformed case provenance", async () => {
  const { validateRunManifest } = await import("./run.mjs");
  const manifest = protocolTestManifest();
  assert.equal(validateRunManifest(manifest), manifest);
  assert.throws(() => validateRunManifest({ ...manifest, total: 2 }), /case inventory is invalid/);
  const { runFingerprint: ignored, ...unsigned } = manifest;
  const malformedUnsigned = { ...unsigned, cases: [{ ...unsigned.cases[0], id: "bad" }] };
  assert.throws(
    () => validateRunManifest({ ...malformedUnsigned, runFingerprint: runManifestFingerprint(malformedUnsigned) }),
    /id does not match/,
  );
  const malformedInventory = { ...unsigned, inventoryHash: "0".repeat(64) };
  assert.throws(() => validateRunManifest({ ...malformedInventory, runFingerprint: runManifestFingerprint(malformedInventory) }), /inventory hash/);
});

test("nested run-config and result schemas reject re-fingerprinted extra fields", async () => {
  const { createRunConfig, validateResultPayload, validateRunConfig, validateRunManifest } = await import("./run.mjs");
  const manifest = protocolTestManifest();
  const { runFingerprint: ignored, ...unsigned } = manifest;
  const malformedUnsigned = { ...unsigned, execution: { ...unsigned.execution, forged: true } };
  assert.throws(() => validateRunManifest({ ...malformedUnsigned, runFingerprint: runManifestFingerprint(malformedUnsigned) }), /execution keys are invalid/);
  assert.throws(() => validateRunConfig({ ...createRunConfig(manifest), forged: true }), /run config keys are invalid/);
  const result = protocolTestResult(manifest.cases[0]);
  assert.throws(() => validateResultPayload({ ...result, verdict: { ...result.verdict, forged: true } }, "forged verdict"), /verdict does not match its evidence/);
});

test("result verdict rejects forged passes from contradictory execution evidence", async () => {
  const { validateResultPayload } = await import("./run.mjs");
  const manifest = protocolTestManifest();
  const caseEntry = manifest.cases[0];
  const baselineMismatch = {
    status: "fail", checked: 1, comparable: 1, unsupported: [], tsgoAccepted: [], mismatches: ["different"],
    expectedDiagnosticsPresent: false, actualErrors: undefined, usedHarness: false,
  };
  const failures = [
    protocolTestResult(caseEntry, { actualErrors: true, exitCode: 1 }),
    protocolTestResult(caseEntry, { exitCode: 2 }),
    protocolTestResult(caseEntry, { exactBaseline: baselineMismatch }),
    protocolTestResult(caseEntry, { executionMismatches: ["on-disk divergence"] }),
  ];
  for (const [index, failure] of failures.entries()) {
    const forged = {
      ...failure,
      status: "pass",
      verdict: { ...failure.verdict, kind: "executed", diagnosticsMatch: true, exitCodeAccepted: true, signalAbsent: true, exactBaselineMatch: true, executionMatch: true },
    };
    assert.throws(() => validateResultPayload(forged, `forged pass ${index}`), /verdict does not match its evidence|status does not match its verdict/);
  }
});

test("infrastructure failures remain partial under the shared completion predicate", async () => {
  const { buildReportSummary, reportOutcome, resultCompletesCase } = await import("./run.mjs");
  const manifest = protocolTestManifest();
  const infrastructureFailure = protocolTestResult(manifest.cases[0], { actualErrors: true, exitCode: 1, caseDir: "", infrastructureFailure: true });
  assert.equal(infrastructureFailure.status, "fail");
  assert.equal(resultCompletesCase(infrastructureFailure), false);
  const partial = buildReportSummary(manifest, [infrastructureFailure]);
  assert.equal(partial.complete, false);
  assert.deepEqual(partial.missingCaseIndices, [0]);
  assert.equal(partial.infrastructureFailures, 1);
  assert.equal(reportOutcome(partial), "partial");
  const productFailure = protocolTestResult(manifest.cases[0], { actualErrors: true, exitCode: 1 });
  const completed = buildReportSummary(manifest, [productFailure]);
  assert.equal(completed.complete, true);
  assert.equal(reportOutcome(completed), "failed");
});

test("result ledger rejects malformed payloads, duplicate completions, gaps, and malformed middle lines", async () => {
  const { caseFingerprint, createResultRecord, loadResultLedger, resultFingerprint, resultSegmentPaths } = await import("./run.mjs");
  const { mkdtemp, mkdir, writeFile: writeFileAsync, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join: joinPath } = await import("node:path");
  const dir = await mkdtemp(joinPath(tmpdir(), "tsgo-suite-ledger-invalid-"));
  const manifest = protocolTestManifest();
  const result = protocolTestResult(manifest.cases[0]);
  const caseFingerprintValue = caseFingerprint(manifest, 0);
  const record = createResultRecord(manifest, 0, result);
  try {
    const duplicate = joinPath(dir, "results-0001.ndjson");
    await writeFileAsync(duplicate, `${JSON.stringify(record)}\n${JSON.stringify(record)}\n`);
    assert.throws(() => loadResultLedger([duplicate], manifest), /duplicate completed result/);
    const malformedPayload = joinPath(dir, "results-0002.ndjson");
    const badResult = { ...result, status: "unknown" };
    await writeFileAsync(malformedPayload, `${JSON.stringify({ ...record, result: badResult, resultFingerprint: resultFingerprint(manifest.runFingerprint, caseFingerprintValue, badResult) })}\n`);
    assert.throws(() => loadResultLedger([malformedPayload], manifest), /payload status is invalid/);
    const tampered = joinPath(dir, "results-0004.ndjson");
    await writeFileAsync(tampered, `${JSON.stringify({ ...record, result: { ...result, caseDir: "/tmp/tampered" } })}\n`);
    assert.throws(() => loadResultLedger([tampered], manifest), /payload fingerprint mismatch/);
    const failedResult = protocolTestResult(manifest.cases[0], { actualErrors: true, exitCode: 1 });
    const contradictoryResult = { ...failedResult, status: "pass", verdict: { ...failedResult.verdict, kind: "executed", diagnosticsMatch: true, exitCodeAccepted: true, signalAbsent: true, exactBaselineMatch: true } };
    const contradictory = joinPath(dir, "results-0005.ndjson");
    await writeFileAsync(contradictory, `${JSON.stringify({
      ...record,
      result: contradictoryResult,
      resultFingerprint: resultFingerprint(manifest.runFingerprint, caseFingerprintValue, contradictoryResult),
    })}\n`);
    assert.throws(() => loadResultLedger([contradictory], manifest), /verdict does not match its evidence/);
    const malformedMiddle = joinPath(dir, "results-0003.ndjson");
    await writeFileAsync(malformedMiddle, `${JSON.stringify(record)}\n{broken}\n${JSON.stringify(record)}\n`);
    assert.throws(() => loadResultLedger([malformedMiddle], manifest), /invalid result ledger JSON/);
    const gapDir = joinPath(dir, "gap");
    await mkdir(gapDir);
    await writeFileAsync(joinPath(gapDir, "results-0002.ndjson"), "");
    assert.throws(() => resultSegmentPaths(gapDir), /sequence has a gap/);
    const invalidDir = joinPath(dir, "invalid");
    await mkdir(invalidDir);
    await writeFileAsync(joinPath(invalidDir, "results-forged.ndjson"), "");
    assert.throws(() => resultSegmentPaths(invalidDir), /invalid result segment entries/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("materializeSymlinks accepts an exact existing link and rejects a conflicting target", async () => {
  const { materializeSymlinks } = await import("./run.mjs");
  const { mkdtemp, mkdir, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join: joinPath } = await import("node:path");
  const dir = await mkdtemp(joinPath(tmpdir(), "tsgo-suite-symlink-"));
  try {
    await mkdir(joinPath(dir, "a"));
    await mkdir(joinPath(dir, "b"));
    await materializeSymlinks(dir, new Map([["link", "a"]]), { useCaseSensitiveFileNames: true });
    await materializeSymlinks(dir, new Map([["link", "a"]]), { useCaseSensitiveFileNames: true });
    await assert.rejects(() => materializeSymlinks(dir, new Map([["link", "b"]]), { useCaseSensitiveFileNames: true }), /Conflicting harness symlink/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("only sealed result attempts are reusable and sealed bytes cannot drift", async () => {
  const { createResultRecord, loadResultLedger, sealResultSegment, sealedResultSegments } = await import("./run.mjs");
  const { mkdtemp, writeFile: writeFileAsync, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join: joinPath } = await import("node:path");
  const dir = await mkdtemp(joinPath(tmpdir(), "tsgo-suite-sealed-attempt-"));
  const manifest = protocolTestManifest();
  try {
    const segment = joinPath(dir, "results-0001.ndjson");
    const record = createResultRecord(manifest, 0, protocolTestResult(manifest.cases[0]));
    await writeFileAsync(segment, `${JSON.stringify(record)}\n`);
    assert.deepEqual(sealedResultSegments(dir, manifest), []);
    await sealResultSegment(dir, segment, manifest);
    const sealed = sealedResultSegments(dir, manifest);
    assert.equal(sealed.length, 1);
    assert.equal(loadResultLedger(sealed, manifest).doneIndices.size, 1);
    await writeFileAsync(segment, "tampered\n");
    assert.throws(() => loadResultLedger(sealedResultSegments(dir, manifest), manifest), /sealed result segment digest mismatch/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("sealed result segments reject a truncated final record even with a matching forged digest", async () => {
  const { createResultRecord, loadResultLedger, sealedResultSegments } = await import("./run.mjs");
  const { createHash } = await import("node:crypto");
  const { mkdtemp, mkdir, writeFile: writeFileAsync, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join: joinPath } = await import("node:path");
  const dir = await mkdtemp(joinPath(tmpdir(), "tsgo-suite-truncated-seal-"));
  const manifest = protocolTestManifest();
  try {
    const segmentName = "results-0001.ndjson";
    const segment = joinPath(dir, segmentName);
    const bytes = Buffer.from(JSON.stringify(createResultRecord(manifest, 0, protocolTestResult(manifest.cases[0]))));
    await writeFileAsync(segment, bytes);
    await mkdir(joinPath(dir, "segment-seals"));
    const unsignedSeal = {
      schemaVersion: 2,
      attemptId: "00000000-0000-4000-8000-000000000000",
      runFingerprint: manifest.runFingerprint,
      segment: segmentName,
      sequence: 1,
      bytes: bytes.length,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      records: 1,
    };
    const seal = { ...unsignedSeal, sealFingerprint: fingerprint(unsignedSeal, "tsts-tsgo-suite-result-segment-seal-v2") };
    await writeFileAsync(joinPath(dir, "segment-seals", `${segmentName}.json`), `${JSON.stringify(seal)}\n`);
    assert.throws(() => loadResultLedger(sealedResultSegments(dir, manifest), manifest), /not newline-complete/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("bounded segment rotation preserves completed work across infrastructure resume attempts", async () => {
  const { createResultSegmentWriter, loadResultLedger, sealedResultSegments } = await import("./run.mjs");
  const { mkdtemp, rm } = await import("node:fs/promises");
  const { tmpdir } = await import("node:os");
  const { join: joinPath } = await import("node:path");
  const dir = await mkdtemp(joinPath(tmpdir(), "tsgo-suite-segment-resume-"));
  const manifest = protocolTestManifest(["a", "b", "c"], { resultSegmentMaxRecords: 2 });
  try {
    const firstAttempt = await createResultSegmentWriter(dir, manifest, { attemptId: "00000000-0000-4000-8000-000000000001" });
    await firstAttempt.append(0, protocolTestResult(manifest.cases[0]));
    await firstAttempt.append(1, protocolTestResult(manifest.cases[1], { actualErrors: true, exitCode: 1, caseDir: "", infrastructureFailure: true }));
    await firstAttempt.close();
    const partial = loadResultLedger(sealedResultSegments(dir, manifest), manifest);
    assert.deepEqual([...partial.doneIndices], [0]);

    const resumedAttempt = await createResultSegmentWriter(dir, manifest, { attemptId: "00000000-0000-4000-8000-000000000002" });
    await resumedAttempt.append(1, protocolTestResult(manifest.cases[1]));
    await resumedAttempt.append(2, protocolTestResult(manifest.cases[2]));
    await resumedAttempt.close();
    const sealed = sealedResultSegments(dir, manifest);
    assert.deepEqual(sealed.map((entry) => entry.sequence), [1, 2]);
    const resumed = loadResultLedger(sealed, manifest);
    assert.equal(resumed.doneIndices.size, 3);
    assert.equal(resumed.recordsByIndex.get(1).result.status, "pass");
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("run locks reject traversal-bearing owner tokens without moving the active lock", async () => {
  const { acquireRunLock } = await import("./run.mjs");
  const { mkdtemp, mkdir, writeFile: writeFileAsync, rm } = await import("node:fs/promises");
  const { hostname } = await import("node:os");
  const { tmpdir } = await import("node:os");
  const { join: joinPath } = await import("node:path");
  const dir = await mkdtemp(joinPath(tmpdir(), "tsgo-suite-lock-token-"));
  try {
    const active = joinPath(dir, "ACTIVE.lock");
    await mkdir(active);
    await writeFileAsync(joinPath(active, "owner.json"), `${JSON.stringify({
      schemaVersion: 1,
      token: "../../escape",
      pid: 2147483647,
      hostname: hostname(),
      startedAt: "2026-01-01T00:00:00.000Z",
    })}\n`);
    await assert.rejects(() => acquireRunLock(dir), /owner token is invalid/);
    const { lstat } = await import("node:fs/promises");
    assert.equal((await lstat(active)).isDirectory(), true);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test("summarize counts statuses and exact-baseline rollups from streamed records", async () => {
  const { summarize } = await import("./run.mjs");
  const summary = summarize([
    { status: "pass", expectedErrors: true, infrastructureFailure: false, executionMismatchCount: 0, exactBaseline: { status: "pass", comparable: 3, unsupportedCount: 0, tsgoAcceptedCount: 0, mismatchCount: 0 } },
    { status: "skip", expectedErrors: false, infrastructureFailure: false, executionMismatchCount: 0, exactBaseline: undefined },
    { status: "fail", expectedErrors: true, infrastructureFailure: false, executionMismatchCount: 0, exactBaseline: { status: "fail", comparable: 2, unsupportedCount: 1, tsgoAcceptedCount: 1, mismatchCount: 2 } },
  ]);
  assert.equal(summary.total, 3);
  assert.equal(summary.passed, 1);
  assert.equal(summary.skipped, 1);
  assert.equal(summary.failed, 1);
  assert.equal(summary.expectedErrorCases, 2);
  assert.equal(summary.expectedCleanCases, 1);
  assert.equal(summary.exactBaselineCases, 2);
  assert.equal(summary.exactBaselineFailedCases, 1);
  assert.equal(summary.exactBaselineComparableArtifacts, 5);
  assert.equal(summary.exactBaselineUnsupportedArtifacts, 1);
  assert.equal(summary.exactBaselineTsgoAcceptedSections, 1);
  assert.equal(summary.exactBaselineMismatches, 2);
});
