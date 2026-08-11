import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { performance } from "node:perf_hooks";

import { compareCodeUnits } from "./canonical-order.mjs";

const [repositoryRoot, nativeArgument] = process.argv.slice(2);
if (repositoryRoot === undefined || nativeArgument === undefined) {
  throw new Error("repository root and exact native compiler are required");
}

const nativeCompiler = nativeArgument;
const generatedCompiler = join(
  repositoryRoot,
  ".temp",
  "target",
  "out",
  "runner.js",
);

function execute(command, arguments_) {
  const started = performance.now();
  const result = spawnSync(command, arguments_, {
    cwd: repositoryRoot,
    encoding: "utf8",
    env: { ...process.env, NO_COLOR: "1" },
    maxBuffer: 64 * 1024 * 1024,
    timeout: 5 * 60 * 1000,
  });
  if (result.error !== undefined) {
    throw result.error;
  }
  return {
    status: result.status,
    signal: result.signal,
    stdout: result.stdout,
    stderr: result.stderr,
    elapsedMilliseconds: Math.round(performance.now() - started),
  };
}

function relativeFiles(root, directory = "") {
  const result = [];
  for (const entry of readdirSync(join(root, directory), {
    withFileTypes: true,
  })) {
    const relative = join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...relativeFiles(root, relative));
    } else {
      result.push(relative);
    }
  }
  return result.sort(compareCodeUnits);
}

function verifyEmit(source) {
  const scratchRoot = join(repositoryRoot, ".temp", "differential");
  mkdirSync(scratchRoot, { recursive: true });
  const nativeOutput = mkdtempSync(join(scratchRoot, "native-"));
  const generatedOutput = mkdtempSync(join(scratchRoot, "generated-"));
  const commonArguments = ["--pretty", "false", source];
  const native = execute(nativeCompiler, [
    ...commonArguments,
    "--outDir",
    nativeOutput,
  ]);
  const generated = execute(process.execPath, [
    generatedCompiler,
    ...commonArguments,
    "--outDir",
    generatedOutput,
  ]);
  assert.equal(native.signal, null, "emit: native compiler was terminated");
  assert.equal(generated.signal, null, "emit: generated compiler was terminated");
  assert.equal(generated.status, native.status, "emit: exit status differs");
  assert.equal(generated.stdout, native.stdout, "emit: stdout differs");
  assert.equal(generated.stderr, native.stderr, "emit: stderr differs");
  assert.equal(native.status, 0, "emit: valid fixture did not compile");

  const nativeFiles = relativeFiles(nativeOutput);
  const generatedFiles = relativeFiles(generatedOutput);
  assert.deepEqual(generatedFiles, nativeFiles, "emit: output file set differs");
  assert.notEqual(nativeFiles.length, 0, "emit: no output files were produced");
  for (const relative of nativeFiles) {
    assert.deepEqual(
      readFileSync(join(generatedOutput, relative)),
      readFileSync(join(nativeOutput, relative)),
      `emit: ${relative} differs`,
    );
  }
  console.log(
    `emit: ${nativeFiles.length} byte-identical file(s) native=${native.elapsedMilliseconds}ms generated=${generated.elapsedMilliseconds}ms`,
  );
}

for (const fixture of ["valid", "syntax", "semantic"]) {
  const source = join(repositoryRoot, "test", "fixtures", fixture, "main.ts");
  const compilerArguments = ["--noEmit", "--pretty", "false", source];
  const native = execute(nativeCompiler, compilerArguments);
  const generated = execute(process.execPath, [generatedCompiler, ...compilerArguments]);

  assert.equal(native.signal, null, `${fixture}: native compiler was terminated`);
  assert.equal(generated.signal, null, `${fixture}: generated compiler was terminated`);
  assert.equal(generated.status, native.status, `${fixture}: exit status differs`);
  assert.equal(generated.stdout, native.stdout, `${fixture}: stdout differs`);
  assert.equal(generated.stderr, native.stderr, `${fixture}: stderr differs`);
  if (fixture === "valid") {
    assert.equal(native.status, 0, "valid fixture did not compile");
    verifyEmit(source);
  } else {
    assert.notEqual(native.status, 0, `${fixture}: diagnostic fixture unexpectedly compiled`);
    assert.notEqual(native.stdout + native.stderr, "", `${fixture}: no diagnostic was produced`);
  }

  console.log(
    `${fixture}: status=${native.status} native=${native.elapsedMilliseconds}ms generated=${generated.elapsedMilliseconds}ms`,
  );
}
