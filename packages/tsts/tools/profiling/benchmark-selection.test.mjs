import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { collectWorkloadSelection, exactWorkloadSelection, validateWorkloadSelection } from "./benchmark-selection.mjs";

const here = fileURLToPath(new URL(".", import.meta.url));

test("workload selection records exact staged file identity and compares compilers", () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-workload-selection-"));
  const project = join(root, "project");
  mkdirSync(project);
  writeFileSync(join(project, "a.ts"), "export const a = 1;\n");
  writeFileSync(join(project, "b.ts"), "export const b = 2;\n");
  writeFileSync(join(project, " spaced .ts"), "export const spaced = 3;\n");
  const compiler = join(root, "compiler.mjs");
  writeFileSync(compiler, `import { resolve } from "node:path";\nconsole.log(resolve("b.ts"));\nconsole.log(resolve(" spaced .ts"));\nconsole.log(resolve("a.ts"));\n`);
  const selection = collectWorkloadSelection({
    id: "fixture/compiler",
    argv: [process.execPath, compiler],
    args: ["-p", "tsconfig.json", "--noEmit", "--incremental", "false"],
    projectRoot: project,
    cwd: project,
    environment: {},
    timeoutMs: 10_000,
  });
  assert.deepEqual(selection.files.map((file) => file.path), [" spaced .ts", "a.ts", "b.ts"]);
  assert.doesNotThrow(() => validateWorkloadSelection(selection));
  const byCompiler = Object.fromEntries(["tsts", "tsgo", "tsc"].map((name) => [name, { selection: structuredClone(selection) }]));
  assert.deepEqual(exactWorkloadSelection(byCompiler), selection);
  byCompiler.tsc.selection.files[0].bytes += 1;
  assert.throws(() => exactWorkloadSelection(byCompiler), /digest mismatch/);
});

test("workload selection rejects files outside the sealed staged project", () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-workload-selection-escape-"));
  const project = join(root, "project");
  mkdirSync(project);
  const outside = join(root, "outside.ts");
  writeFileSync(outside, "export {};\n");
  const compiler = join(root, "compiler.mjs");
  writeFileSync(compiler, `console.log(${JSON.stringify(outside)});\n`);
  assert.throws(() => collectWorkloadSelection({
    id: "fixture/compiler",
    argv: [process.execPath, compiler],
    args: ["-p", "tsconfig.json", "--noEmit", "--incremental", "false"],
    projectRoot: project,
    cwd: project,
    environment: {},
    timeoutMs: 10_000,
  }), /must be a child of the staged project root/);
});

test("real tsc selection rejects compiler-owned standard libraries outside staging", () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-workload-selection-standard-lib-"));
  const project = join(root, "project");
  mkdirSync(project);
  writeFileSync(join(project, "tsconfig.json"), `${JSON.stringify({ compilerOptions: { noEmit: true, incremental: false }, files: ["index.ts"] })}\n`);
  writeFileSync(join(project, "index.ts"), "export const value = 1;\n");
  assert.throws(() => collectWorkloadSelection({
    id: "fixture/real-tsc",
    argv: [process.execPath, join(here, "../../../../node_modules/typescript/bin/tsc")],
    args: ["-p", "tsconfig.json", "--noEmit", "--incremental", "false"],
    projectRoot: project,
    cwd: project,
    environment: {},
    timeoutMs: 30_000,
  }), /must be a child of the staged project root/);
});
