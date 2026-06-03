/**
 * Fixture-driven coverage for the standalone `compileProject` API.
 *
 * These tests exercise the real canonical pipeline end-to-end against small
 * on-disk fixture projects (positive + negative), asserting the stable
 * contract: deterministic diagnostics, the 0/1 exit code, and the emit
 * file-set bookkeeping (including `noEmit` and `noEmitOnError`).
 *
 * Emit tests redirect output into a throwaway directory under the OS temp
 * area (analogous to `.temp/`, gitignored) via an `outDir` override and
 * remove it afterwards, so the repo and the fixtures are never polluted
 * with generated files.
 *
 * Emitted JS *content* is asserted: `compileProject` produces real
 * JavaScript via the `emit-js` printer (see the EMIT NOTE in
 * compileProject.ts), so the positive fixture's `export function add` must
 * appear in the output with its type annotations erased.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import { packageRootPath } from "../repo/paths.js";
import { compileProject } from "./compileProject.js";

// The standalone fixtures live under the package's `testdata/standalone/`
// tree, which is outside the tsconfig `include`, so the negative fixture's
// deliberate type error never participates in the TSTS build.
const standalone = join(packageRootPath(), "testdata", "standalone");
const basicTsconfig = join(standalone, "basic-project", "tsconfig.json");
const errorTsconfig = join(standalone, "error-project", "tsconfig.json");

/** A fresh throwaway emit directory. Uses the OS temp area so concurrent
 * test runs never collide and nothing lands under version control. */
function freshOutDir(): string {
  return mkdtempSync(join(tmpdir(), "tsts-compileproject-"));
}

function cleanup(dir: string): void {
  rmSync(dir, { recursive: true, force: true });
}

test("compileProject compiles a positive fixture with no diagnostics and reports emitted files", () => {
  const outDir = freshOutDir();
  try {
    const result = compileProject({ project: basicTsconfig, outDir });
    assert.deepEqual([...result.diagnostics], []);
    assert.equal(result.exitCode, 0);
    assert.equal(result.emittedFiles.length, 1);
    assert.match(result.emittedFiles[0]!, /index\.js$/);
    assert.ok(existsSync(result.emittedFiles[0]!), "reported emitted file should exist on disk");
    // Real JS is emitted with type annotations erased.
    const emitted = readFileSync(result.emittedFiles[0]!, "utf8");
    assert.match(emitted, /export function add\(left, right\) \{/);
    assert.match(emitted, /return left \+ right;/);
    assert.doesNotMatch(emitted, /:\s*number/, "type annotations should be erased");
  } finally {
    cleanup(outDir);
  }
});

test("compileProject honors noEmit: typechecks clean but writes nothing", () => {
  const outDir = freshOutDir();
  try {
    const result = compileProject({ project: basicTsconfig, outDir, noEmit: true });
    assert.deepEqual([...result.diagnostics], []);
    assert.equal(result.exitCode, 0);
    assert.deepEqual([...result.emittedFiles], []);
  } finally {
    cleanup(outDir);
  }
});

test("compileProject warns (does not silently drop) when declaration/sourceMap emit is requested", () => {
  const outDir = freshOutDir();
  try {
    const result = compileProject({ project: basicTsconfig, outDir, declaration: true, sourceMap: true });
    // JS still compiles cleanly (warnings do not fail the build).
    assert.equal(result.exitCode, 0);
    assert.equal(result.emittedFiles.length, 1, "only JS is emitted (no .d.ts / .map)");
    // The unsupported features are surfaced honestly as warnings, not dropped.
    const warnings = result.diagnostics.filter((d) => d.category === DiagnosticCategory.Warning);
    assert.ok(warnings.some((d) => /Declaration .* is not yet supported/.test(d.text)), "expected a declaration-unsupported warning");
    assert.ok(warnings.some((d) => /Source map .* is not yet supported/.test(d.text)), "expected a source-map-unsupported warning");
  } finally {
    cleanup(outDir);
  }
});

test("compileProject does not warn about unsupported emit features under noEmit", () => {
  const outDir = freshOutDir();
  try {
    const result = compileProject({ project: basicTsconfig, outDir, declaration: true, sourceMap: true, noEmit: true });
    assert.deepEqual([...result.diagnostics], [], "noEmit suppresses the unsupported-emit warnings");
    assert.deepEqual([...result.emittedFiles], []);
  } finally {
    cleanup(outDir);
  }
});

test("compileProject reports diagnostics for a negative fixture and exits non-zero", () => {
  const outDir = freshOutDir();
  try {
    const result = compileProject({ project: errorTsconfig, outDir });
    assert.equal(result.exitCode, 1);
    assert.ok(result.diagnostics.length >= 1, "expected at least one diagnostic");
    const errors = result.diagnostics.filter((d) => d.category === DiagnosticCategory.Error);
    assert.ok(errors.length >= 1, "expected at least one error-level diagnostic");
    assert.ok(
      errors.some((d) => /not assignable to type/.test(d.text)),
      `expected an assignability error, got: ${errors.map((d) => d.text).join(" | ")}`,
    );
    // noEmitOnError is set in the fixture, so blocking errors suppress emit.
    assert.deepEqual([...result.emittedFiles], []);
  } finally {
    cleanup(outDir);
  }
});

test("compileProject reports a config error for a missing project file without throwing", () => {
  const result = compileProject({ project: join(standalone, "__no_such_dir__", "tsconfig.json") });
  assert.equal(result.exitCode, 1);
  assert.ok(
    result.diagnostics.some((d) => /Cannot read file/.test(d.text)),
    "expected a 'Cannot read file' config diagnostic",
  );
});

test("compileProject returns deterministically sorted diagnostics", () => {
  const first = compileProject({ project: errorTsconfig });
  const second = compileProject({ project: errorTsconfig });
  const key = (texts: readonly { code: number; text: string }[]) =>
    texts.map((d) => `${d.code}:${d.text}`).join("\n");
  assert.equal(key(first.diagnostics), key(second.diagnostics));
});
