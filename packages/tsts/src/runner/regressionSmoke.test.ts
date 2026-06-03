/**
 * Smoke regression suite (runs WITHOUT the external TS-Go corpus).
 *
 * This is the green-gate companion to the corpus-driven conformance run. It
 * compiles a small, self-contained set of TS-Go-style case sources vendored
 * under `testdata/tests/cases/compiler` and asserts the generated `error` and
 * `output` baselines against TSTS-OWNED baselines committed under
 * `testdata/baselines/reference/compiler`.
 *
 * These baselines are REGRESSION baselines only: they protect against
 * unintended changes in TSTS's own accepted behavior. They are NOT TS-Go
 * conformance baselines and must never be described as such. The corpus-driven
 * `tsgoConformance.test.ts` is the only thing that compares against the TS-Go
 * reference tree.
 *
 * The compile path is the real harness (`harnessutil.compileFiles`) and the
 * baseline text is produced by the real `tsbaseline` generators via
 * `produceBaselineText`. Nothing here reimplements compilation or formatting.
 *
 * Baselines are compared, never silently regenerated. Set
 * `TSTS_ACCEPT_BASELINES=1` to (re)write them deliberately; a normal run
 * fails on any mismatch.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import { getBaseFileName } from "../tspath/index.js";
import { testDataPath } from "../repo/paths.js";
import { BaselineStore } from "../testutil/baseline/baseline.js";
import { compileFiles as harnessCompileFiles, type TestFile } from "../testutil/harnessutil/index.js";

import { produceBaselineText } from "./baselineTextProducer.js";
import type { CompilationResult, CompilerBaseline } from "./compilerRunner.js";
import { extractCompilerSettings, makeUnitsFromTest } from "./testCaseParser.js";

const smokeSuite = "compiler";
const smokeCurrentDirectory = "/.src";
const acceptBaselines = process.env.TSTS_ACCEPT_BASELINES === "1";

const casesDir = join(testDataPath(), "tests", "cases", smokeSuite);
const referenceRoot = join(testDataPath(), "baselines", "reference");

/** Compile one vendored case and produce its `error` + `output` baselines. */
function compileSmokeCase(fileName: string, source: string): readonly { readonly relativePath: string; readonly text: string }[] {
  const content = makeUnitsFromTest(source, fileName);
  const settings = extractCompilerSettings(source);
  const files: readonly TestFile[] = content.testUnitData.map((unit) => ({
    unitName: join(smokeCurrentDirectory, unit.name),
    content: unit.content,
  }));
  const result = harnessCompileFiles({
    inputFiles: files,
    testConfig: settings,
    currentDirectory: smokeCurrentDirectory,
    symlinks: content.symlinks,
  });

  // Carry the full harness result through the runner result's opaque `program`
  // slot exactly as the node host does, so the producer reads real outputs.
  const runnerResult: CompilationResult = {
    options: result.compilerOptions as Record<string, unknown>,
    harnessOptions: { noTypesAndSymbols: result.harnessOptions.noTypesAndSymbols },
    diagnostics: result.diagnostics,
    trace: result.trace.length === 0 ? [] : result.trace.split("\n"),
    program: result,
  };

  const baseName = getBaseFileName(fileName);
  return ["error", "output"].flatMap((kind) => {
    const baseline: CompilerBaseline = {
      kind: kind as CompilerBaseline["kind"],
      testName: baseName,
      suiteName: smokeSuite,
      isSubmodule: false,
      files,
      result: runnerResult,
    };
    return produceBaselineText(baseline).map((generated) => ({
      relativePath: join(smokeSuite, baseName.replace(/\.tsx?$/, generated.extension)),
      text: generated.text,
    }));
  });
}

function listSmokeCases(): readonly string[] {
  return readdirSync(casesDir)
    .filter((name) => /\.tsx?$/.test(name))
    .sort();
}

const store = new BaselineStore({ baselineRoot: referenceRoot, update: acceptBaselines });

for (const fileName of listSmokeCases()) {
  test(`smoke regression: ${fileName}`, () => {
    const source = readFileSync(join(casesDir, fileName), "utf8");
    const artifacts = compileSmokeCase(fileName, source);
    assert.ok(artifacts.length > 0, `expected at least one baseline artifact for ${fileName}`);
    for (const artifact of artifacts) {
      // BaselineStore.assert throws on a real mismatch; in accept mode it writes
      // the baseline instead. We never swallow a mismatch.
      store.assert(artifact.relativePath, artifact.text);
    }
  });
}
