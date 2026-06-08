import test from "node:test";
import assert from "node:assert/strict";
import { buildTestUniverseInventory, caseDirectoryFragment, compilerOptionsFromSettings, getFileBasedTestConfigurations, hasRootPackageJson, isEmittedJavaScriptSibling, parseArgs, parseFileBasedTest } from "./run.mjs";

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

test("compilerOptionsFromSettings maps supported TS-Go directives", () => {
  const settings = new Map([
    ["strict", "true"],
    ["target", "es2020"],
    ["module", "commonjs"],
    ["lib", "es2020,dom"],
    ["declaration", "true;"],
    ["nopropertyaccessfromindexsignature", "true"],
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
    noPropertyAccessFromIndexSignature: true,
  });
});

test("getFileBasedTestConfigurations expands TS-Go variations", () => {
  const configurations = getFileBasedTestConfigurations(new Map([
    ["strict", "*"],
    ["strictbuiltiniteratorreturn", "*, !true"],
    ["target", "es2020"],
  ]));
  assert.deepEqual(configurations.map((configuration) => ({
    name: configuration.name,
    strict: configuration.settings.get("strict"),
    strictBuiltinIteratorReturn: configuration.settings.get("strictbuiltiniteratorreturn"),
    target: configuration.settings.get("target"),
  })), [
    {
      name: "strict=true",
      strict: "true",
      strictBuiltinIteratorReturn: "false",
      target: "es2020",
    },
    {
      name: "strict=false",
      strict: "false",
      strictBuiltinIteratorReturn: "false",
      target: "es2020",
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
