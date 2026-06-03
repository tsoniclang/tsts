/**
 * Coverage for the standalone `tsts` CLI.
 *
 * `runCli` is driven with an injected I/O surface (no global `process`
 * mutation) so we can assert exit codes and captured output directly.
 * Emit goes into a throwaway `.temp/`-style OS temp directory via `--outDir`
 * and is removed afterwards; fixtures and the repo stay clean.
 *
 * The CLI emits real JavaScript (via `compileProject` -> the `emit-js`
 * printer), so the positive-fixture run asserts both the observable CLI
 * contract — deterministic, sorted/deduplicated diagnostics, the 0/1 exit
 * code, output-to-`outDir`, and `--noEmit` suppression — and that the
 * emitted `index.js` contains real compiled JavaScript.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { join } from "node:path";
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

import { DiagnosticCategory } from "../enums/diagnosticCategory.enum.js";
import type { Diagnostic } from "../diagnostics/types.js";
import { packageRootPath } from "../repo/paths.js";
import { formatDiagnostic, main, parseCliArguments, runCli, type CliIo } from "./main.js";

// The standalone fixtures live under the package's `testdata/standalone/`
// tree (outside the tsconfig `include`), so the negative fixture's deliberate
// type error never participates in the TSTS build.
const standalone = join(packageRootPath(), "testdata", "standalone");
const basicTsconfig = join(standalone, "basic-project", "tsconfig.json");
const errorTsconfig = join(standalone, "error-project", "tsconfig.json");

/** A capturing {@link CliIo} plus the buffers it writes to. */
function captureIo(): { io: CliIo; out: string[]; err: string[] } {
  const out: string[] = [];
  const err: string[] = [];
  return {
    io: { out: (t) => out.push(t), err: (t) => err.push(t) },
    out,
    err,
  };
}

function freshOutDir(): string {
  return mkdtempSync(join(tmpdir(), "tsts-cli-"));
}

function cleanup(dir: string): void {
  rmSync(dir, { recursive: true, force: true });
}

// ─── argument parsing ────────────────────────────────────────────────────

test("parseCliArguments parses --project and the emit overrides", () => {
  const parsed = parseCliArguments(["--project", "tsconfig.json", "--outDir", "out", "--declaration", "--sourceMap", "--noEmit"]);
  assert.equal(parsed.kind, "options");
  if (parsed.kind !== "options") return;
  assert.deepEqual(parsed.options, {
    project: "tsconfig.json",
    outDir: "out",
    declaration: true,
    sourceMap: true,
    noEmit: true,
  });
});

test("parseCliArguments accepts -p as an alias for --project", () => {
  const parsed = parseCliArguments(["-p", "tsconfig.json"]);
  assert.equal(parsed.kind, "options");
  if (parsed.kind !== "options") return;
  assert.equal(parsed.options.project, "tsconfig.json");
});

test("parseCliArguments treats bare arguments as root files", () => {
  const parsed = parseCliArguments(["a.ts", "b.ts"]);
  assert.equal(parsed.kind, "options");
  if (parsed.kind !== "options") return;
  assert.deepEqual(parsed.options.rootNames, ["a.ts", "b.ts"]);
});

test("parseCliArguments rejects unknown options", () => {
  const parsed = parseCliArguments(["--bogus"]);
  assert.equal(parsed.kind, "error");
});

test("parseCliArguments rejects a flag with a missing value", () => {
  const parsed = parseCliArguments(["--project"]);
  assert.equal(parsed.kind, "error");
});

test("parseCliArguments rejects mixing --project with files", () => {
  const parsed = parseCliArguments(["--project", "tsconfig.json", "extra.ts"]);
  assert.equal(parsed.kind, "error");
});

test("parseCliArguments requires inputs", () => {
  const parsed = parseCliArguments([]);
  assert.equal(parsed.kind, "error");
});

test("parseCliArguments recognizes --help", () => {
  assert.equal(parseCliArguments(["--help"]).kind, "help");
  assert.equal(parseCliArguments(["-h"]).kind, "help");
});

// ─── diagnostic formatting ───────────────────────────────────────────────

test("formatDiagnostic renders file(line,col) form when a position is present", () => {
  // Line 1 = "const a = 1;" (positions 0..11) + newline at 12.
  // Line 2 starts at position 13; the `b` is at position 19 (column 7).
  const text = "const a = 1;\nconst b: string = 2;\n";
  const diagnostic: Diagnostic = {
    message: { key: "k", code: 2322, category: DiagnosticCategory.Error, message: "m" },
    file: { fileName: "src/index.ts", text },
    start: 19,
    length: 1,
    category: DiagnosticCategory.Error,
    code: 2322,
    text: "Type 'number' is not assignable to type 'string'.",
  };
  assert.equal(text[19], "b");
  assert.equal(
    formatDiagnostic(diagnostic),
    "src/index.ts(2,7): error TS2322: Type 'number' is not assignable to type 'string'.",
  );
});

test("formatDiagnostic renders the file-less form when there is no position", () => {
  const diagnostic: Diagnostic = {
    message: { key: "k", code: 5083, category: DiagnosticCategory.Error, message: "m" },
    category: DiagnosticCategory.Error,
    code: 5083,
    text: "Cannot read file 'tsconfig.json'.",
  };
  assert.equal(formatDiagnostic(diagnostic), "error TS5083: Cannot read file 'tsconfig.json'.");
});

// ─── end-to-end CLI ──────────────────────────────────────────────────────

test("runCli compiles a positive fixture, exits 0, and writes to outDir", () => {
  const outDir = freshOutDir();
  try {
    const { io } = captureIo();
    const code = runCli(["--project", basicTsconfig, "--outDir", outDir], io);
    assert.equal(code, 0);
    const written = readdirSync(outDir);
    assert.ok(written.length >= 1, `expected output files under ${outDir}, found none`);
    // The emitted index.js contains real compiled JavaScript.
    const emitted = readFileSync(join(outDir, "index.js"), "utf8");
    assert.match(emitted, /export function add\(left, right\)/);
  } finally {
    cleanup(outDir);
  }
});

test("main compiles the positive fixture and reports exit 0 via process.exitCode", () => {
  const outDir = freshOutDir();
  // `main` reports its result through `process.exitCode`; snapshot and restore
  // it so this test never leaks a non-zero global exit code into the runner.
  const previousExitCode = process.exitCode;
  try {
    main(["--project", basicTsconfig, "--outDir", outDir]);
    assert.equal(process.exitCode, 0, "the CLI must exit 0 for a clean fixture");
    assert.ok(readdirSync(outDir).length >= 1, `expected the CLI to write output under ${outDir}`);
  } finally {
    process.exitCode = previousExitCode;
    cleanup(outDir);
  }
});

test("runCli with --noEmit type-checks clean and writes nothing", () => {
  const outDir = freshOutDir();
  try {
    const { io } = captureIo();
    const code = runCli(["--project", basicTsconfig, "--outDir", outDir, "--noEmit"], io);
    assert.equal(code, 0);
    assert.deepEqual(readdirSync(outDir), []);
  } finally {
    cleanup(outDir);
  }
});

test("runCli reports diagnostics for a negative fixture and exits 1", () => {
  const outDir = freshOutDir();
  try {
    const { io, err } = captureIo();
    const code = runCli(["--project", errorTsconfig, "--outDir", outDir], io);
    assert.equal(code, 1);
    const stderr = err.join("");
    assert.match(stderr, /error TS/);
    assert.match(stderr, /not assignable to type/);
  } finally {
    cleanup(outDir);
  }
});

test("runCli prints usage and exits 0 for --help", () => {
  const { io, out } = captureIo();
  const code = runCli(["--help"], io);
  assert.equal(code, 0);
  assert.match(out.join(""), /Usage: tsts/);
});

test("runCli prints an error and exits 1 for an unknown option", () => {
  const { io, err } = captureIo();
  const code = runCli(["--bogus"], io);
  assert.equal(code, 1);
  assert.match(err.join(""), /Unknown option/);
});

test("runCli emits diagnostics deterministically across runs", () => {
  const first = captureIo();
  const second = captureIo();
  runCli(["--project", errorTsconfig, "--noEmit"], first.io);
  runCli(["--project", errorTsconfig, "--noEmit"], second.io);
  assert.equal(first.err.join(""), second.err.join(""));
});
