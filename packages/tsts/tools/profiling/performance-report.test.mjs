import assert from "node:assert/strict";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import { aggregateSamples, assertBaselineCompatibility, buildInterleavedSchedule, exactWorkReceipt } from "./benchmark-core.mjs";
import { WORKLOAD_SELECTION_CONTRACT } from "./benchmark-selection.mjs";
import { sealEvidenceDirectory } from "../sealed-evidence.mjs";
import { fingerprint } from "../test-provenance.mjs";
import { createPerformanceReport, performanceReportSealMetadata, readVerifiedPerformanceReport, validatePerformanceReport } from "./performance-report.mjs";

const requiredMetrics = ["Files", "Lines", "Parse", "Bind", "Check", "Total", "MemReportedKB", "wallSecs", "userSecs", "systemSecs", "cpuSecs", "cpuPercent", "maxRssKB"];
const sampling = { systemCacheWarmupRounds: 1, measuredRounds: 5, timeoutMs: 1000 };
const measurementContract = { policyId: "fixture", gatedMetrics: ["wallSecs"], workloadSelection: WORKLOAD_SELECTION_CONTRACT };
const measurementContractDigest = fingerprint(measurementContract, "tsts-performance-measurement-contract-v1");
const contract = { sampling, requiredMetrics, workloadEquivalence: ["Files", "Lines"], measurementContract, measurementContractDigest };

test("sealed performance reports recompute samples, aggregates, work, and report identity", async (context) => {
  const directory = mkdtempSync(join(tmpdir(), "tsts-performance-report-"));
  context.after(() => rmSync(directory, { recursive: true, force: true }));
  const report = fixtureReport();
  assert.doesNotThrow(() => validatePerformanceReport(report, contract));
  writeFileSync(join(directory, "report.json"), `${JSON.stringify(report, null, 2)}\n`);
  writeFileSync(join(directory, "summary.md"), "fixture\n");
  const seal = await sealEvidenceDirectory(directory, performanceReportSealMetadata(report));
  const verified = readVerifiedPerformanceReport(directory, contract);
  assert.equal(verified.report.reportId, report.reportId);
  assert.equal(verified.seal.evidenceDigest, seal.evidenceDigest);
  writeFileSync(join(directory, "summary.md"), "changed\n");
  assert.throws(() => readVerifiedPerformanceReport(directory, contract), /inventory mismatch/);
});

test("baseline compatibility permits a new prepared TSTS build but binds references and host", () => {
  const baseline = fixtureReport();
  const current = structuredClone(baseline);
  current.compilers.tsts = { preparedBuild: "new" };
  assert.doesNotThrow(() => assertBaselineCompatibility(current, baseline));
  current.compilers.tsgo = { producer: "different" };
  assert.throws(() => assertBaselineCompatibility(current, baseline), /tsgo reference producer/);
});

test("performance reports bind selected-file count to compiler work metrics", () => {
  const original = fixtureReport();
  const { reportId: _reportId, ...body } = structuredClone(original);
  const mismatched = selectionEvidence(["index.ts", "other.ts"]);
  for (const compiler of Object.values(body.results[0].byCompiler)) compiler.selection = structuredClone(mismatched);
  body.results[0].work.selection = structuredClone(mismatched);
  const report = createPerformanceReport(body);
  assert.throws(() => validatePerformanceReport(report, contract), /selected-file count does not match/);
});

function fixtureReport() {
  const byCompiler = Object.fromEntries(["tsts", "tsgo", "tsc"].map((compiler, compilerIndex) => {
    const warmup = [sample(1 + compilerIndex)];
    const measured = [1, 2, 3, 4, 5].map((value) => sample(value + compilerIndex));
    return [compiler, { selection: selectionEvidence(), systemCacheWarmupSamples: warmup, measuredSamples: measured, aggregate: aggregateSamples(measured, requiredMetrics) }];
  }));
  const results = [{ name: "fixture", byCompiler, work: { metrics: exactWorkReceipt(byCompiler, ["Files", "Lines"]), selection: selectionEvidence() } }];
  return createPerformanceReport({
    role: "baseline-candidate",
    outcome: "measurement-complete",
    createdAt: "2026-07-10T00:00:00.000Z",
    policy: {
      policyId: "fixture",
      file: { bytes: 1, sha256: "b".repeat(64) },
      measurementContract,
      measurementContractDigest: contract.measurementContractDigest,
      limits: { wallSecs: { maxRegressionRatio: null, maxCoefficientOfVariation: null } },
    },
    sampling,
    corpus: corpusEvidence(),
    harness: harnessEvidence(),
    host: hostEvidence(),
    compilers: compilerEvidence(),
    schedule: buildInterleavedSchedule({ projectNames: ["fixture"], compilerIds: ["tsts", "tsgo", "tsc"], ...sampling }),
    results,
    profiles: [],
    gate: { requested: false, baselineEvidenceDigest: null, baselineReportId: null, failures: [] },
  });
}

function corpusEvidence() {
  const definition = { schemaVersion: 2, file: { bytes: 1, sha256: "c".repeat(64) }, projects: [{ name: "fixture" }] };
  const definitionDigest = fingerprint(definition, "tsts-performance-corpus-definition-v2");
  const sourceEvidence = inputEvidence("source");
  return {
    schemaVersion: 2,
    definition,
    definitionDigest,
    sourceEvidence,
    workloadDigest: fingerprint({ definitionDigest, sourceEvidence }, "tsts-performance-workload-v1"),
    stagedProjects: [{ name: "fixture", args: ["--noEmit"], copies: [], stagedEvidence: inputEvidence("staged") }],
  };
}

function compilerEvidence() {
  const buildRequest = { schemaVersion: 3 };
  const producerRequest = { schemaVersion: 2 };
  return {
    tsts: {
      id: "tsts",
      argv: ["<node>", "--expose-gc", "<prepared-tsts>/src/cli/index.js"],
      cli: { bytes: 1, sha256: "1".repeat(64) },
      preparedBuild: {
        schemaVersion: 3,
        buildId: fingerprint(buildRequest, "tsts-prepared-build-v1"),
        evidenceDigest: "2".repeat(64),
        request: buildRequest,
        output: inputRoot("tsts-dist"),
      },
    },
    tsgo: {
      id: "tsgo",
      argv: ["<pinned-tsgo>"],
      sourcePin: {
        schemaVersion: 1,
        path: "schema/tsgo/source-pin.json",
        sha256: "3".repeat(64),
        primary: { revision: "4".repeat(40), tree: "5".repeat(40), objectFormat: "sha1", dirty: false },
        nestedSources: [],
      },
      producer: {
        schemaVersion: 2,
        producerId: fingerprint(producerRequest, "tsts-pinned-go-producer-v2"),
        request: producerRequest,
        binary: { name: "tsgo", bytes: 1, sha256: "6".repeat(64) },
        buildMetadata: {},
      },
    },
    tsc: {
      id: "tsc",
      argv: ["<node>", "node_modules/typescript/bin/tsc"],
      entry: { bytes: 1, sha256: "7".repeat(64) },
      package: inputEvidence("typescript-package"),
    },
  };
}

function harnessEvidence() {
  const inputs = inputEvidence("harness");
  return { schemaVersion: 1, inputs, digest: fingerprint(inputs, "tsts-performance-harness-v1") };
}

function hostEvidence() {
  const compatibility = { host: "fixture" };
  const observation = { capturedAt: "2026-07-10T00:00:00.000Z", freeMemoryBytes: 1, loadAverage: [0, 0, 0], uptimeSeconds: 1, cpuSpeedsMHz: [1] };
  return { compatibility, compatibilityDigest: fingerprint(compatibility, "tsts-performance-host-v1"), observedBefore: observation, observedAfter: observation };
}

function inputEvidence(label) {
  const roots = [inputRoot(label)];
  return { schemaVersion: 1, roots, digest: fingerprint(roots, "tsts-input-roots-v1") };
}

function inputRoot(label) {
  return { label, kind: "file", mode: 420, symlinkPolicy: "reject", fileCount: 1, symlinkCount: 0, bytes: 1, digest: "d".repeat(64) };
}

function selectionEvidence(paths = ["index.ts"]) {
  const body = { schemaVersion: 1, files: paths.map((path, index) => ({ path, bytes: index + 1, sha256: String(index + 1).repeat(64) })) };
  return { ...body, digest: fingerprint(body, "tsts-performance-workload-selection-v1") };
}

function sample(value) {
  return {
    Files: 1,
    Lines: 100,
    Parse: value,
    Bind: value,
    Check: value,
    Total: value,
    MemReportedKB: 100 + value,
    wallSecs: value,
    userSecs: value,
    systemSecs: value,
    cpuSecs: value * 2,
    cpuPercent: 100,
    maxRssKB: 1000 + value,
  };
}
