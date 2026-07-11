import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { chmodSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { parseBenchmarkArguments } from "./bench.mjs";
import { assertUninjectedNodeProcess, canonicalBenchmarkEnvironment } from "./benchmark-evidence.mjs";
import { runTimedCompiler } from "./benchmark-core.mjs";
import { collectWorkloadSelection } from "./benchmark-selection.mjs";
import { assertStagedWorkloadsUnchanged, loadBenchmarkCorpus, removeBenchmarkStaging, stageBenchmarkCorpus } from "./benchmark-workload.mjs";
import { loadPerformancePolicy, requireCalibratedPolicy } from "./performance-policy.mjs";

const here = dirname(fileURLToPath(import.meta.url));

test("default policy is versioned and gate calibration fails closed", () => {
  const context = loadPerformancePolicy(join(here, "performance-policy.json"));
  assert.equal(context.policy.policyId, "tsts-performance-v1");
  assert.equal(context.policy.sampling.measuredRounds, 7);
  assert.throws(() => requireCalibratedPolicy(context), /fail-closed.*calibration is required/);
});

test("calibrated policy requires a complete accepted seal binding and measured limits", (context) => {
  const root = mkdtempSync(join(tmpdir(), "tsts-performance-policy-test-"));
  context.after(() => rmSync(root, { recursive: true, force: true }));
  const policy = JSON.parse(readFileSync(join(here, "performance-policy.json"), "utf8"));
  policy.baseline = { status: "calibrated", path: "baselines/accepted", evidenceDigest: "a".repeat(64), acceptedReportId: "b".repeat(64) };
  for (const limit of Object.values(policy.limits)) {
    limit.maxRegressionRatio = 1.1;
    limit.maxCoefficientOfVariation = 0.1;
  }
  const policyPath = join(root, "policy.json");
  writeFileSync(policyPath, JSON.stringify(policy));
  const policyContext = loadPerformancePolicy(policyPath);
  assert.equal(requireCalibratedPolicy(policyContext), join(root, "baselines/accepted"));
  policy.limits.wallSecs.maxRegressionRatio = null;
  writeFileSync(policyPath, JSON.stringify(policy));
  assert.throws(() => loadPerformancePolicy(policyPath), /maxRegressionRatio for 'wallSecs'/);
});

test("CLI separates measurement, baseline capture, gate, and verification modes", () => {
  assert.deepEqual(parseBenchmarkArguments(["--profile", "--no-build", "--output", "out"]).profile, true);
  assert.equal(parseBenchmarkArguments(["--record-baseline", "baseline"]).baselineOutput, "baseline");
  assert.throws(() => parseBenchmarkArguments(["--gate", "--record-baseline", "baseline"]), /mutually exclusive/);
  assert.throws(() => parseBenchmarkArguments(["--verify-report", "report", "--profile"]), /cannot be combined/);
  assert.throws(() => parseBenchmarkArguments(["--runs", "3"]), /unknown performance benchmark argument/);
});

test("benchmark environment is closed and compiler overrides are rejected", () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-performance-environment-"));
  const environment = canonicalBenchmarkEnvironment(root);
  assert.equal(environment.actual.NODE_OPTIONS, "");
  assert.equal(environment.actual.NODE_PATH, "");
  assert.equal(environment.recorded.HOME, "<benchmark-runtime>/home");
  assert.equal(Object.hasOwn(environment.actual, "PATH"), false);
  try {
    assert.throws(() => assertUninjectedNodeProcess({ execArgv: [], environment: { TSGO_BIN: "/unbound/tsgo" } }), /refuses ambient TSGO_BIN/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("closed corpus staging replicates exact inputs, becomes read-only, and detects mutation", () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-performance-corpus-test-"));
  try {
    const source = join(root, "source");
    mkdirSync(source);
    writeFileSync(join(source, "tsconfig.json"), "{}\n");
    writeFileSync(join(source, "index.ts"), "export const value = 1;\n");
    const corpusPath = join(root, "corpus.json");
    writeFileSync(corpusPath, JSON.stringify({
      schemaVersion: 2,
      projects: [{
        name: "fixture",
        cwd: "project",
        args: ["-p", "tsconfig.json", "--noEmit", "--incremental", "false"],
        inputs: [{ label: "source", source: "source", destination: "project", replicas: 1 }],
      }],
    }));
    const corpus = loadBenchmarkCorpus(corpusPath);
    const staged = stageBenchmarkCorpus(corpus, join(root, "staged"));
    assert.equal(readFileSync(join(staged[0].cwd, "index.ts"), "utf8"), "export const value = 1;\n");
    assert.throws(() => writeFileSync(join(staged[0].cwd, "index.ts"), "changed\n"), /EACCES|EPERM/);
    chmodSync(join(staged[0].cwd, "index.ts"), 0o644);
    writeFileSync(join(staged[0].cwd, "index.ts"), "changed\n");
    assert.throws(() => assertStagedWorkloadsUnchanged(staged), /changed during execution/);
  } finally {
    makeWritable(root);
    rmSync(root, { recursive: true, force: true });
  }
});

test("corpus rejects unsafe profile names and mutable compiler modes", () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-performance-invalid-corpus-"));
  try {
    mkdirSync(join(root, "source"));
    writeFileSync(join(root, "source/index.ts"), "export {};\n");
    const corpusPath = join(root, "corpus.json");
    const project = {
      name: "../escape",
      cwd: "project",
      args: ["-p", "tsconfig.json", "--noEmit", "--incremental", "false"],
      inputs: [{ label: "source", source: "source", destination: "project", replicas: 1 }],
    };
    writeFileSync(corpusPath, JSON.stringify({ schemaVersion: 2, projects: [project] }));
    assert.throws(() => loadBenchmarkCorpus(corpusPath), /unsafe or duplicate name/);
    project.name = "safe";
    project.args.push("--watch");
    writeFileSync(corpusPath, JSON.stringify({ schemaVersion: 2, projects: [project] }));
    assert.throws(() => loadBenchmarkCorpus(corpusPath), /unsupported compiler argument '--watch'/);
    project.args = ["-p", "../outside.json", "--noEmit", "--incremental", "false"];
    writeFileSync(corpusPath, JSON.stringify({ schemaVersion: 2, projects: [project] }));
    assert.throws(() => loadBenchmarkCorpus(corpusPath), /project option must be a safe relative POSIX path/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("default closed workload produces complete repository-tsc metrics", async () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-performance-default-workload-"));
  try {
    const policy = loadPerformancePolicy(join(here, "performance-policy.json"));
    const [project] = stageBenchmarkCorpus(loadBenchmarkCorpus(policy.corpusPath), join(root, "projects"));
    const environment = canonicalBenchmarkEnvironment(join(root, "runtime"));
    const tsc = [process.execPath, join(here, "../../../../node_modules/typescript/bin/tsc")];
    const selection = collectWorkloadSelection({
      id: "default-workload/tsc-selection",
      argv: tsc,
      args: project.args,
      projectRoot: project.root,
      cwd: project.cwd,
      environment: environment.actual,
      timeoutMs: 30_000,
    });
    const sample = runTimedCompiler({
      id: "default-workload/tsc",
      argv: tsc,
      args: project.args,
      cwd: project.cwd,
      environment: environment.actual,
      requiredMetrics: policy.policy.requiredMetrics,
      timeExecutable: "/usr/bin/time",
      timeoutMs: 30_000,
    });
    assert.equal(sample.Files, 161);
    assert.equal(sample.Lines, 12_648);
    assert.equal(selection.files.length, sample.Files);
    assertStagedWorkloadsUnchanged([project]);
  } finally {
    await removeBenchmarkStaging(root);
  }
});

test("documented example corpus stages every real tsc input", () => {
  const root = mkdtempSync(join(tmpdir(), "tsts-performance-example-workload-"));
  const [project] = stageBenchmarkCorpus(loadBenchmarkCorpus(join(here, "corpus.example.json")), join(root, "projects"));
  const environment = canonicalBenchmarkEnvironment(join(root, "runtime"));
  const tsc = [process.execPath, join(here, "../../../../node_modules/typescript/bin/tsc")];
  const selection = collectWorkloadSelection({
    id: "example-workload/tsc-selection",
    argv: tsc,
    args: project.args,
    projectRoot: project.root,
    cwd: project.cwd,
    environment: environment.actual,
    timeoutMs: 30_000,
  });
  const compilation = spawnSync(tsc[0], [...tsc.slice(1), ...project.args, "--pretty", "false"], {
    cwd: project.cwd,
    env: environment.actual,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
    timeout: 30_000,
  });
  assert.equal(compilation.status, 0, `${compilation.stdout ?? ""}\n${compilation.stderr ?? ""}`);
  assert.deepEqual(selection.files.map((file) => file.path), ["project/lib.d.ts", "project/src/index.ts"]);
});

function makeWritable(path) {
  const stat = lstatSync(path);
  if (stat.isDirectory()) {
    chmodSync(path, 0o700);
    for (const name of readdirSync(path)) makeWritable(join(path, name));
  } else chmodSync(path, 0o600);
}
