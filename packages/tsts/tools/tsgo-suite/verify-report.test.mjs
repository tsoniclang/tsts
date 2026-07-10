import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import test from "node:test";

import { fingerprint } from "../test-provenance.mjs";
import { sealEvidenceDirectory } from "../sealed-evidence.mjs";
import {
  buildReportSummary,
  caseIdentifier,
  createResultSegmentWriter,
  createRunConfig,
  hashCaseIds,
  inventoryFingerprint,
  loadResultLedger,
  renderMarkdown,
  reportSealMetadata,
  runManifestFingerprint,
  sealedResultSegments,
} from "./run.mjs";
import { verifyTsgoSuiteReport } from "./verify-report.mjs";

const inputLabels = [
  "accepted-overlay-active", "accepted-overlay-binding", "accepted-overlay-capture", "accepted-overlay-legacy-manifest", "accepted-overlay-plan",
  "bundled-source-assets", "resolved-typescript-package", "source-pin", "suite-baseline-code", "suite-provenance-helper", "suite-report-verifier",
  "suite-runner", "suite-sealed-evidence-helper", "suite-source-pin-verifier", "tsts-dist", "tsts-package", "vendored-typescript-lib-fallback",
  "workspace-lock", "workspace-package",
].sort();

function inventoryFixture() {
  const bucket = () => ({ total: 0, inScope: 0, outOfScope: 0, unclassified: 0, entries: {} });
  return { currentHarness: bucket(), typeScriptCases: { ...bucket(), languageServiceHarnessCases: 0 }, baselines: bucket(), goTests: bucket() };
}

function manifestFixture() {
  const inventory = inventoryFixture();
  const identity = { corpus: "current", suite: "compiler", relativePath: "compiler/a.ts", configurationName: "" };
  const cases = [{ index: 0, ...identity, id: caseIdentifier(identity), sourceSha256: "a".repeat(64), projectFixture: null }];
  const roots = inputLabels.map((label) => ({ label, kind: "file", mode: 0o644, symlinkPolicy: "reject", fileCount: 1, symlinkCount: 0, bytes: 1, digest: "b".repeat(64) }));
  const unsigned = {
    schemaVersion: 2,
    selection: { corpus: "current", suite: "compiler", filter: "", limit: 0 },
    execution: {
      exactBaselineContract: 1, verifyOnDisk: false, jobs: 1, failFast: false, caseTimeoutMs: 1000, poolCaseTimeoutMs: 2000,
      maxOldSpaceSizeMb: 8192, resultRecordMaxBytes: 1024 * 1024, resultSegmentMaxBytes: 8 * 1024 * 1024, resultSegmentMaxRecords: 256,
    },
    runtime: {
      execPath: { bytes: 1, sha256: "c".repeat(64) }, nodeVersion: "v1", v8Version: "1", execArgv: [], platform: "linux", arch: "x64",
      locale: { locale: "en", calendar: "gregory", numberingSystem: "latn", timeZone: "UTC" }, hostname: "test-host",
      childEnvironment: [
        { name: "LANG", value: "C.UTF-8" }, { name: "LC_ALL", value: "C.UTF-8" }, { name: "NODE_OPTIONS", value: "" }, { name: "NODE_PATH", value: "" },
        { name: "TSGO_CASE_TIMEOUT_MS", value: "1000" }, { name: "TSGO_POOL_TIMEOUT_MS", value: "2000" }, { name: "TZ", value: "UTC" },
      ],
    },
    upstream: {
      sourcePin: {
        path: "packages/tsts/schema/tsgo/source-pin.json", sha256: "d".repeat(64), tsgoRevision: "e".repeat(40), tsgoObjectFormat: "sha1",
        typescriptPath: "_submodules/TypeScript", typescriptRevision: "1".repeat(40), typescriptObjectFormat: "sha1",
      },
      tsgo: { revision: "e".repeat(40), tree: "f".repeat(40), objectFormat: "sha1", dirty: false },
      typescript: { name: "TypeScript", path: "_submodules/TypeScript", revision: "1".repeat(40), tree: "2".repeat(40), objectFormat: "sha1", dirty: false },
    },
    inputs: { schemaVersion: 1, roots, digest: fingerprint(roots, "tsts-input-roots-v1") },
    cases,
    caseIdsHash: hashCaseIds(cases),
    total: 1,
    inventory,
    inventoryHash: inventoryFingerprint(inventory),
  };
  return { ...unsigned, runFingerprint: runManifestFingerprint(unsigned) };
}

async function reportFixture(options = {}) {
  const temporaryRoot = await mkdtemp(join(tmpdir(), "tsts-tsgo-report-"));
  const reportRoot = join(temporaryRoot, "run");
  const caseRoot = join(reportRoot, "cases");
  const reportDirectory = join(reportRoot, "reports", "report-0001");
  await mkdir(caseRoot, { recursive: true });
  await mkdir(reportDirectory, { recursive: true });
  const runManifest = manifestFixture();
  const runConfigPath = join(reportRoot, "run-config.json");
  await writeFile(runConfigPath, `${JSON.stringify(createRunConfig(runManifest), null, 2)}\n`);
  const resultWriter = await createResultSegmentWriter(reportRoot, runManifest, { attemptId: "00000000-0000-4000-8000-000000000001" });
  await resultWriter.append(0, {
    corpus: "current", suite: "compiler", relativePath: "compiler/a.ts", configurationName: "",
    expectedErrors: false, actualErrors: options.infrastructureFailure === true, exitCode: options.infrastructureFailure === true ? 1 : 0,
    signal: null, caseDir: options.infrastructureFailure === true ? "" : join(caseRoot, "case-0"), skipReason: "", exactBaseline: undefined,
    infrastructureFailure: options.infrastructureFailure === true, stdout: "", stderr: "",
  });
  await resultWriter.close();
  const ledger = loadResultLedger(sealedResultSegments(reportRoot, runManifest), runManifest);
  const results = [...ledger.recordsByIndex.entries()].sort(([left], [right]) => left - right).map(([, record]) => record.result);
  const summary = buildReportSummary(runManifest, results);
  const runConfigBytes = await readFile(runConfigPath);
  const resultSegments = ledger.segmentEvidence.map((segment) => ({
    sequence: segment.sequence,
    path: basename(segment.path),
    bytes: segment.bytes,
    sha256: segment.sha256,
    records: segment.records,
    seal: { path: `segment-seals/${basename(segment.seal.path)}`, bytes: segment.seal.bytes, sha256: segment.seal.sha256, value: segment.seal.value },
  }));
  const report = {
    schemaVersion: 3,
    runFingerprint: runManifest.runFingerprint,
    runManifest,
    summary,
    inventory: runManifest.inventory,
    inventoryHash: runManifest.inventoryHash,
    caseRoot,
    runConfig: { path: "run-config.json", bytes: runConfigBytes.length, sha256: sha256(runConfigBytes) },
    resultSegments,
    results,
  };
  options.mutateReport?.(report);
  await writeFile(join(reportDirectory, "results.json"), `${JSON.stringify(report, null, 2)}\n`);
  await writeFile(join(reportDirectory, "summary.md"), renderMarkdown(report.summary, report.results, report.inventory, report.caseRoot, report.runManifest));
  await sealEvidenceDirectory(reportDirectory, reportSealMetadata(report), "REPORT.json");
  return { temporaryRoot, reportRoot, reportDirectory, report };
}

test("TS-Go suite report verifier closes nested report and external provenance", async () => {
  const fixture = await reportFixture();
  try {
    const verified = verifyTsgoSuiteReport(fixture.reportDirectory);
    assert.equal(verified.seal.metadata.outcome, "passed");
    assert.equal(verified.report.summary.complete, true);
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true });
  }
});

test("TS-Go suite report verifier rejects a sealed forged pass", async () => {
  const fixture = await reportFixture({
    mutateReport(report) {
      const result = report.results[0];
      report.results[0] = {
        ...result,
        actualErrors: true,
        exitCode: 1,
        status: "pass",
        verdict: { ...result.verdict, diagnosticsMatch: true, exitCodeAccepted: true },
      };
    },
  });
  try {
    assert.throws(() => verifyTsgoSuiteReport(fixture.reportDirectory), /verdict does not match its evidence/);
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true });
  }
});

test("TS-Go suite report verifier rejects malformed provenance paths and digests", async () => {
  const schema = await reportFixture({ mutateReport(report) { report.forged = true; } });
  try {
    assert.throws(() => verifyTsgoSuiteReport(schema.reportDirectory), /report keys are invalid/);
  } finally {
    await rm(schema.temporaryRoot, { recursive: true, force: true });
  }
  const traversal = await reportFixture({ mutateReport(report) { report.resultSegments[0].seal.path = "../owner.json"; } });
  try {
    assert.throws(() => verifyTsgoSuiteReport(traversal.reportDirectory), /seal path is invalid/);
  } finally {
    await rm(traversal.temporaryRoot, { recursive: true, force: true });
  }
  const digest = await reportFixture({ mutateReport(report) { report.runConfig.sha256 = "0".repeat(64); } });
  try {
    assert.throws(() => verifyTsgoSuiteReport(digest.reportDirectory), /run config bytes do not match report provenance/);
  } finally {
    await rm(digest.temporaryRoot, { recursive: true, force: true });
  }
});

test("TS-Go suite report verifier preserves infrastructure failures as partial", async () => {
  const fixture = await reportFixture({ infrastructureFailure: true });
  try {
    const verified = verifyTsgoSuiteReport(fixture.reportDirectory);
    assert.equal(verified.report.summary.complete, false);
    assert.deepEqual(verified.report.summary.missingCaseIndices, [0]);
    assert.equal(verified.seal.metadata.outcome, "partial");
  } finally {
    await rm(fixture.temporaryRoot, { recursive: true, force: true });
  }
});

test("TS-Go suite report verifier detects sealed report and external evidence tampering", async () => {
  const reportTamper = await reportFixture();
  try {
    await writeFile(join(reportTamper.reportDirectory, "summary.md"), "tampered\n");
    assert.throws(() => verifyTsgoSuiteReport(reportTamper.reportDirectory), /inventory mismatch/);
  } finally {
    await rm(reportTamper.temporaryRoot, { recursive: true, force: true });
  }
  const segmentTamper = await reportFixture();
  try {
    await writeFile(join(segmentTamper.reportRoot, segmentTamper.report.resultSegments[0].path), "tampered\n");
    assert.throws(() => verifyTsgoSuiteReport(segmentTamper.reportDirectory), /bytes do not match report provenance/);
  } finally {
    await rm(segmentTamper.temporaryRoot, { recursive: true, force: true });
  }
  const sealTamper = await reportFixture();
  try {
    await writeFile(join(sealTamper.reportRoot, sealTamper.report.resultSegments[0].seal.path), "{}\n");
    assert.throws(() => verifyTsgoSuiteReport(sealTamper.reportDirectory), /bytes do not match report provenance/);
  } finally {
    await rm(sealTamper.temporaryRoot, { recursive: true, force: true });
  }
});

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}
