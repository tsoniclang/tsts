import test from "node:test";
import assert from "node:assert/strict";
import { baselineHasErrors, buildTestUniverseInventory, caseDirectoryFragment, compilerCommandLineArgsForMaterializedCase, compilerOptionsForExistingProjectConfig, compilerOptionsForMaterializedCase, compilerOptionsFromSettings, decodeSourceText, errorDiffNewSideHasErrors, getFileBasedTestConfigurations, getSkipReason, hasRootPackageJson, isEmittedJavaScriptSibling, normalizeHarnessOptionPath, normalizeHarnessPath, parseArgs, parseFileBasedTest, selectInputFiles } from "./run.mjs";

test("parseFileBasedTest materializes single-file tests", () => {
  const parsed = parseFileBasedTest("const value: number = 1;", "single.ts");
  assert.deepEqual(parsed.units, [{ fileName: "single.ts", content: "const value: number = 1;" }]);
  assert.equal(parsed.currentDirectory, "/src");
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

test("compilerOptionsFromSettings maps supported TS-Go directives", () => {
  const settings = new Map([
    ["strict", "true"],
    ["target", "es2020"],
    ["module", "commonjs"],
    ["lib", "es2020,dom"],
    ["declaration", "true;"],
    ["importhelpers", "true"],
    ["isolatedmodules", "true"],
    ["maxnodemodulejsdepth", "1"],
    ["noresolve", "true"],
    ["nolib", "true"],
    ["downleveliteration", "true"],
    ["nopropertyaccessfromindexsignature", "true"],
    ["allowarbitraryextensions", "true"],
    ["allowunusedlabels", "false"],
    ["composite", "true"],
    ["inlinesourcemap", "true"],
    ["libreplacement", "true"],
    ["nocheck", "true"],
    ["nofallthroughcasesinswitch", "true"],
    ["noimplicitreturns", "true"],
    ["noimplicitthis", "true"],
    ["nouncheckedindexedaccess", "true"],
    ["pretty", "true"],
    ["rewriterelativeimportextensions", "true"],
    ["sourcemap", "true"],
    ["strictpropertyinitialization", "false"],
    ["useunknownincatchvariables", "false"],
  ]);
  assert.deepEqual(compilerOptionsFromSettings(settings), {
    newLine: "crlf",
    noErrorTruncation: true,
    skipDefaultLibCheck: true,
    target: "es2020",
    module: "commonjs",
    strict: true,
    lib: ["es2020", "dom"],
    declaration: true,
    importHelpers: true,
    isolatedModules: true,
    maxNodeModuleJsDepth: 1,
    noResolve: true,
    noLib: true,
    downlevelIteration: true,
    noPropertyAccessFromIndexSignature: true,
    allowArbitraryExtensions: true,
    allowUnusedLabels: false,
    composite: true,
    inlineSourceMap: true,
    libReplacement: true,
    noCheck: true,
    noFallthroughCasesInSwitch: true,
    noImplicitReturns: true,
    noImplicitThis: true,
    noUncheckedIndexedAccess: true,
    pretty: true,
    rewriteRelativeImportExtensions: true,
    sourceMap: true,
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
    rootDir: "A:/src",
    declarationDir: "decls",
    tsBuildInfoFile: "a.tsbuildinfo",
  });
  assert.equal(normalizeHarnessPath("A:/foo/bar.ts"), "A:/foo/bar.ts");
  assert.equal(normalizeHarnessPath("A:/foo/bar.ts", { useCaseSensitiveFileNames: false }), "a:/foo/bar.ts");
  assert.equal(normalizeHarnessOptionPath("A:/"), "A:/");
  assert.equal(normalizeHarnessOptionPath("A:/", { useCaseSensitiveFileNames: false }), "a:/");
  assert.equal(normalizeHarnessOptionPath("/out"), "out");
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
  assert.equal(parseArgs(["--inventory"]).inventory, true);
  assert.throws(() => parseArgs(["--suite", "fourslash"]), /Unsupported suite/);
  assert.throws(() => parseArgs(["--corpus", "typescript", "--suite", "transpile"]), /Unsupported suite/);
  assert.throws(() => parseArgs(["--corpus", "unknown"]), /Unsupported corpus/);
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

test("isEmittedJavaScriptSibling excludes generated JS beside TS sources", () => {
  const source = new URL("../../_vendor/typescript-go/testdata/tests/cases/compiler/jsxNestedIndentation.tsx", import.meta.url);
  const emitted = new URL("../../_vendor/typescript-go/testdata/tests/cases/compiler/jsxNestedIndentation.js", import.meta.url);
  assert.equal(isEmittedJavaScriptSibling(source.pathname), false);
  assert.equal(isEmittedJavaScriptSibling(emitted.pathname), true);
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
  const diff = new URL("../../_vendor/typescript-go/testdata/baselines/reference/submoduleAccepted/compiler/classFieldSuperAccessibleJs1.errors.txt.diff", import.meta.url);
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

test("baselineHasErrors falls back to TypeScript submodule baselines for submodule corpus", () => {
  assert.equal(baselineHasErrors({
    corpus: "typescript",
    suite: "compiler",
    relativePath: "compiler/SystemModuleForStatementNoInitializer.ts",
    caseName: "SystemModuleForStatementNoInitializer",
    configurationName: "",
  }), true);
});

test("getSkipReason mirrors TS-Go unsupported compiler-option skips", () => {
  const base = { sourceBaseName: "case.ts", configuration: new Map() };
  assert.match(getSkipReason({ ...base, configuration: new Map([["target", "ES5"]]) }), /unsupported target/);
  assert.match(getSkipReason({ ...base, configuration: new Map([["alwaysstrict", "false"]]) }), /alwaysStrict=false/);
});

test("compilerOptionsFromSettings preserves unsupported target values for skip policy", () => {
  const options = compilerOptionsFromSettings(new Map([["target", "ES5"]]));
  assert.equal(options.target, "ES5");
});

test("buildTestUniverseInventory tracks full compiler scope and excludes language service scope", async () => {
  const inventory = await buildTestUniverseInventory();
  assert.equal(inventory.currentHarness.inScope, 166);
  assert.ok(inventory.typeScriptCases.entries.compiler > inventory.currentHarness.entries.compiler);
  assert.ok(inventory.typeScriptCases.entries.conformance > inventory.currentHarness.entries.conformance);
  assert.equal(inventory.typeScriptCases.outOfScope, inventory.typeScriptCases.entries.fourslash + inventory.typeScriptCases.entries.unittests);
  assert.ok(inventory.baselines.entries.fourslash > 0);
  assert.ok(inventory.baselines.entries.lsp > 0);
  assert.ok(inventory.baselines.outOfScope > inventory.baselines.entries.fourslash);
  assert.ok(inventory.goTests.entries["internal/fourslash"] > 0);
  assert.ok(inventory.goTests.outOfScope >= inventory.goTests.entries["internal/fourslash"]);
});
