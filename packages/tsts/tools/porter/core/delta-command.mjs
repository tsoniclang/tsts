import { buildDeltaCompletion, buildDeltaCompletionFromRecords, buildPorterDelta, DELTA_EVIDENCE_ARTIFACTS, portableSnapshot, renderDeltaMarkdown, snapshotDigest, verifyDeltaCompletion, verifyDeltaCompletionFromRecords } from "../delta.mjs";
import { buildSnapshotSourceIntegrityStatus, buildSnapshotTreeIntegrityStatus, gitTreeEntries, inspectGitCheckout, readGitCommitObjectBody } from "../source-pin.mjs";
import { isActivePortPolicy } from "./policies.mjs";
import { buildEffectivePolicyResolver } from "./effective-policies.mjs";
import { buildDeltaSupplementalEvidence } from "./delta-report-evidence.mjs";
import { requireSafeDeltaOutputRoot } from "./delta-paths.mjs";
import { buildGitCommitTreeEvidence, requireGitCommitTreeEvidence } from "./git-commit-tree-evidence.mjs";
import { assertCanonicalUtf8Bytes, decodeCanonicalUtf8, publishStableFlatDirectory, readStableFlatDirectory } from "./provenance-filesystem.mjs";
import { assertDirectory, fail, hashText, repoRoot } from "./runtime.mjs";
import { runScan } from "./scan-runner.mjs";
import { assertPorterSnapshot } from "./snapshot.mjs";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

export function runDelta(config, options) {
  requireDeltaCommandOptions(options, "delta", ["from", "out", "to"]);
  const fromRoot = path.resolve(repoRoot, options.from);
  const toRoot = path.resolve(repoRoot, options.to);
  const outRoot = path.resolve(repoRoot, options.out);
  requireSafeDeltaOutputRoot(outRoot, [fromRoot, toRoot]);
  const prepared = prepareDeltaComparison(config, { fromRoot, toRoot });
  const { from, porter, to, report } = prepared;

  const gateIssues = [
    ...(report.extractionEnvironment.matches ? [] : ["extractor environments differ"]),
    ...report.generatedSourcePolicies.from.issues.map((issue) => `from generated source policy: ${issue.path}: ${issue.reason}`),
    ...report.generatedSourcePolicies.to.issues.map((issue) => `to generated source policy: ${issue.path}: ${issue.reason}`),
  ];
  if (gateIssues.length > 0) {
    fail(`porter delta failed its integrity gate before writing evidence: ${gateIssues.join("; ")}`);
  }

  if (existsSync(outRoot)) fail(`porter delta evidence directory already exists: ${path.relative(repoRoot, outRoot)}`);
  const stagingRoot = `${outRoot}.partial-${process.pid}-${hashText(`${report.from.digest}:${report.to.digest}`).slice(0, 12)}`;
  if (existsSync(stagingRoot)) fail(`porter delta staging directory already exists: ${path.relative(repoRoot, stagingRoot)}`);
  const artifacts = new Map(DELTA_EVIDENCE_ARTIFACTS.map((name) => [name, () => (
    renderDeltaArtifact(name, from.snapshot, to.snapshot, from.gitEvidence, porter.gitEvidence, to.gitEvidence, report)
  )]));
  artifacts.set("COMPLETE.json", ({ files }) => `${JSON.stringify(buildDeltaCompletionFromRecords(files, report), null, 2)}\n`);
  publishStableFlatDirectory(outRoot, stagingRoot, artifacts, "Porter delta evidence");
  for (const name of artifacts.keys()) console.log(`written: ${path.relative(repoRoot, path.join(outRoot, name))}`);

  console.log(`TS-Go delta ${report.from.gitRevision.slice(0, 12)} -> ${report.to.gitRevision.slice(0, 12)}`);
  console.log(`Raw units added/removed/changed: ${report.rawUnits.addedCount}/${report.rawUnits.removedCount}/${report.rawUnits.changedCount}`);
  console.log(`Active units added/removed/changed: ${report.activeUnits.addedCount}/${report.activeUnits.removedCount}/${report.activeUnits.changedCount}`);
  console.log(`Tracked files added/removed/changed: ${report.trackedFiles.addedCount}/${report.trackedFiles.removedCount}/${report.trackedFiles.changedCount}`);
  console.log(`Go files added/removed/changed: ${report.goFiles.addedCount}/${report.goFiles.removedCount}/${report.goFiles.changedCount}`);
}

function buildDeltaReport(config, fromSnapshot, toSnapshot, input) {
  requireExactObject(input, ["fromGitEvidence", "fromProvenance", "porterGitEvidence", "toGitEvidence", "toProvenance"], "delta report inputs");
  const fromGitEvidence = requireGitCommitTreeEvidence(input.fromGitEvidence, "from Git evidence");
  const porterGitEvidence = requireGitCommitTreeEvidence(input.porterGitEvidence, "Porter implementation Git evidence");
  const toGitEvidence = requireGitCommitTreeEvidence(input.toGitEvidence, "to Git evidence");
  const fromProvenance = requireDeltaProvenance(input.fromProvenance, "from provenance");
  const toProvenance = requireDeltaProvenance(input.toProvenance, "to provenance");
  assertPorterSnapshot(fromSnapshot, { ...config, sourceRoot: fromSnapshot.sourceRoot });
  assertPorterSnapshot(toSnapshot, { ...config, sourceRoot: toSnapshot.sourceRoot });
  if (fromGitEvidence.revision !== fromSnapshot.gitRevision || fromProvenance.revision !== fromSnapshot.gitRevision) {
    throw new Error("from Git/provenance evidence does not match the from snapshot revision");
  }
  if (toGitEvidence.revision !== toSnapshot.gitRevision || toProvenance.revision !== toSnapshot.gitRevision) {
    throw new Error("to Git/provenance evidence does not match the to snapshot revision");
  }
  if (fromProvenance.snapshotDigest !== snapshotDigest(fromSnapshot) || toProvenance.snapshotDigest !== snapshotDigest(toSnapshot)) {
    throw new Error("delta provenance snapshot digests do not match the supplied snapshots");
  }
  const treeIssues = [
    ...buildSnapshotTreeIntegrityStatus(fromSnapshot, fromGitEvidence.entries).issues.map((issue) => `from ${issue.path}: ${issue.reason}`),
    ...buildSnapshotTreeIntegrityStatus(toSnapshot, toGitEvidence.entries).issues.map((issue) => `to ${issue.path}: ${issue.reason}`),
  ];
  if (treeIssues.length > 0) throw new Error(`delta snapshots do not close over their Git trees: ${treeIssues.join("; ")}`);
  const fromPolicies = buildEffectivePolicyResolver(config, fromSnapshot);
  const toPolicies = buildEffectivePolicyResolver(config, toSnapshot);
  const report = buildPorterDelta(fromSnapshot, toSnapshot, {
    policyForUnit: (snapshot, unit, file) => (snapshot === fromSnapshot ? fromPolicies : toPolicies).unit(unit, file),
    isActivePortPolicy,
    fromTreeEntries: fromGitEvidence.entries,
    toTreeEntries: toGitEvidence.entries,
  });
  return {
    ...report,
    porterImplementation: gitEvidenceIdentity(porterGitEvidence),
    provenance: {
      from: fromProvenance,
      to: toProvenance,
    },
    ...buildDeltaSupplementalEvidence(config, fromSnapshot, toSnapshot),
  };
}

export function runDeltaVerify(config, options) {
  requireDeltaCommandOptions(options, "delta-verify", ["dir", "from", "to"]);
  const evidenceRoot = path.resolve(repoRoot, options.dir);
  const fromRoot = path.resolve(repoRoot, options.from);
  const toRoot = path.resolve(repoRoot, options.to);
  requireSafeDeltaOutputRoot(evidenceRoot, [fromRoot, toRoot]);
  const expectedNames = [...DELTA_EVIDENCE_ARTIFACTS, "COMPLETE.json"].sort();
  const evidenceFiles = readStableFlatDirectory(evidenceRoot, "delta evidence directory");
  const actualNames = [...evidenceFiles.keys()].sort();
  const issues = [];
  if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames)) {
    issues.push(`evidence directory entries must be exactly ${expectedNames.join(", ")}`);
  }

  const actualRecords = {};
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    const bytes = evidenceFiles.get(name);
    if (bytes === undefined) continue;
    assertCanonicalUtf8Bytes(bytes, `delta evidence ${name}`);
    actualRecords[name] = evidenceFileRecord(bytes);
  }
  const completionBytes = evidenceFiles.get("COMPLETE.json");
  const completionText = completionBytes === undefined ? undefined : decodeCanonicalUtf8(completionBytes, "delta evidence COMPLETE.json");
  let completion;
  try {
    completion = JSON.parse(completionText);
  } catch (error) {
    issues.push(`COMPLETE.json is invalid: ${error.message}`);
  }
  if (completion !== undefined && completionText !== `${JSON.stringify(completion, null, 2)}\n`) {
    issues.push("COMPLETE.json is not canonical JSON");
  }
  if (completion !== undefined) issues.push(...verifyDeltaCompletionFromRecords(actualRecords, completion));

  const prepared = prepareDeltaComparison(config, { fromRoot, toRoot });
  const expectedRecords = {};
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    const expected = renderDeltaArtifact(name, prepared.from.snapshot, prepared.to.snapshot, prepared.from.gitEvidence, prepared.porter.gitEvidence, prepared.to.gitEvidence, prepared.report);
    const expectedRecord = evidenceFileRecord(expected);
    expectedRecords[name] = expectedRecord;
    const actualRecord = actualRecords[name];
    if (actualRecord?.bytes !== expectedRecord.bytes || actualRecord?.sha256 !== expectedRecord.sha256) {
      issues.push(`${name} is not exact evidence recomputed from the clean source checkouts`);
    }
    evidenceFiles.delete(name);
  }
  if (completion !== undefined) {
    const expectedCompletion = buildDeltaCompletionFromRecords(expectedRecords, prepared.report);
    if (JSON.stringify(completion) !== JSON.stringify(expectedCompletion)) {
      issues.push("COMPLETE.json is not the exact completion envelope for the recomputed evidence");
    }
  }
  if (issues.length > 0) fail(`porter delta evidence verification failed: ${issues.slice(0, 12).join("; ")}`);
  console.log(`porter delta evidence verified: ${path.relative(repoRoot, evidenceRoot)}`);
}

export function verifyDeltaEvidence(input) {
  requireExactObject(input, ["artifacts", "completion", "expectedArtifacts", "expectedReport"], "delta verification input");
  if (!(input.artifacts instanceof Map) || !(input.expectedArtifacts instanceof Map)) {
    throw new Error("delta verification artifacts and expectedArtifacts must be Maps");
  }
  const issues = [];
  const artifactNames = [...input.artifacts.keys()].sort();
  const expectedNames = [...DELTA_EVIDENCE_ARTIFACTS].sort();
  if (JSON.stringify(artifactNames) !== JSON.stringify(expectedNames)) {
    issues.push(`delta evidence artifact keys must be exactly ${expectedNames.join(", ")}`);
  }
  if (input.completion === undefined) {
    issues.push("COMPLETE.json is missing or invalid");
  } else {
    issues.push(...verifyDeltaCompletion(input.artifacts, input.completion));
  }
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    if (input.artifacts.get(name) !== input.expectedArtifacts.get(name)) {
      issues.push(`${name} is not exact evidence recomputed from the clean source checkouts`);
    }
  }
  if (input.completion !== undefined) {
    const expectedCompletion = buildDeltaCompletion(input.expectedArtifacts, input.expectedReport);
    if (JSON.stringify(input.completion) !== JSON.stringify(expectedCompletion)) {
      issues.push("COMPLETE.json is not the exact completion envelope for the recomputed evidence");
    }
  }
  return issues;
}
function renderDeltaArtifact(name, fromSnapshot, toSnapshot, fromGitEvidence, porterGitEvidence, toGitEvidence, report) {
  if (name === "from-snapshot.json") return `${JSON.stringify(portableSnapshot(fromSnapshot, "from"), null, 2)}\n`;
  if (name === "from-tree.json") return `${JSON.stringify(fromGitEvidence, null, 2)}\n`;
  if (name === "porter-tree.json") return `${JSON.stringify(porterGitEvidence, null, 2)}\n`;
  if (name === "to-snapshot.json") return `${JSON.stringify(portableSnapshot(toSnapshot, "to"), null, 2)}\n`;
  if (name === "to-tree.json") return `${JSON.stringify(toGitEvidence, null, 2)}\n`;
  if (name === "delta.json") return `${JSON.stringify(report, null, 2)}\n`;
  if (name === "summary.md") return renderDeltaMarkdown(report);
  throw new Error(`unknown delta evidence artifact '${name}'`);
}

function evidenceFileRecord(value) {
  return { bytes: Buffer.byteLength(value), sha256: hashText(value) };
}

function prepareDeltaComparison(config, input) {
  requireExactObject(input, ["fromRoot", "toRoot"], "delta source roots");
  const porterBefore = prepareExactGitState(repoRoot, "Porter implementation before extraction");
  const from = prepareDeltaSide(config, input.fromRoot, "from");
  const to = prepareDeltaSide(config, input.toRoot, "to");
  const porter = prepareExactGitState(repoRoot, "Porter implementation after extraction");
  if (JSON.stringify(porterBefore.gitEvidence) !== JSON.stringify(porter.gitEvidence)) {
    throw new Error("Porter implementation changed while delta evidence was extracted");
  }
  const report = buildDeltaReport(config, from.snapshot, to.snapshot, {
    fromGitEvidence: from.gitEvidence,
    fromProvenance: from.provenance,
    porterGitEvidence: porter.gitEvidence,
    toGitEvidence: to.gitEvidence,
    toProvenance: to.provenance,
  });
  return { from, porter, to, report };
}

function prepareDeltaSide(config, root, label) {
  assertDirectory(root, `delta --${label} source root`);
  const before = prepareExactGitState(root, `${label} delta source before extraction`);
  const sideConfig = { ...config, sourceRoot: root };
  const snapshot = runScan(sideConfig);
  const repeatSnapshot = runScan(sideConfig);
  const after = prepareExactGitState(root, `${label} delta source after extraction`);
  const firstSnapshotDigest = snapshotDigest(snapshot);
  const repeatSnapshotDigest = snapshotDigest(repeatSnapshot);
  const deterministic = firstSnapshotDigest === repeatSnapshotDigest;
  const integrityIssues = buildSnapshotSourceIntegrityStatus(root, snapshot).issues;
  const issues = [
    ...(JSON.stringify(before.gitEvidence) === JSON.stringify(after.gitEvidence) ? [] : ["Git commit/tree evidence changed during extraction"]),
    ...(snapshot.gitRevision === before.checkout.revision ? [] : [`snapshot revision ${snapshot.gitRevision} does not match checkout ${before.checkout.revision}`]),
    ...(repeatSnapshot.gitRevision === before.checkout.revision ? [] : [`repeat snapshot revision ${repeatSnapshot.gitRevision} does not match checkout ${before.checkout.revision}`]),
    ...(deterministic ? [] : ["extractor snapshots differ across repeated runs"]),
    ...integrityIssues.map((issue) => `${issue.path}: ${issue.reason}`),
  ];
  if (issues.length > 0) throw new Error(`${label} delta source failed exact extraction provenance: ${issues.join("; ")}`);
  return {
    snapshot,
    gitEvidence: after.gitEvidence,
    provenance: requireDeltaProvenance({
      schemaVersion: 1,
      revision: snapshot.gitRevision,
      objectFormat: before.checkout.objectFormat,
      dirtyBefore: before.checkout.dirty,
      dirtyAfter: after.checkout.dirty,
      deterministic,
      snapshotDigest: firstSnapshotDigest,
      repeatSnapshotDigest,
    }, `${label} provenance`),
  };
}

function prepareExactGitState(root, label) {
  const before = inspectGitCheckout(root);
  if (before.issues.length > 0) throw new Error(`${label} must be one clean Git checkout: ${before.issues.join("; ")}`);
  if (before.objectFormat !== "sha1") throw new Error(`${label} Git object format must be sha1, got ${JSON.stringify(before.objectFormat)}`);
  const gitEvidence = buildGitCommitTreeEvidence({
    objectFormat: before.objectFormat,
    revision: before.revision,
    commitBody: readGitCommitObjectBody(root, before.revision),
    entries: gitTreeEntries(root, before.revision),
  });
  const after = inspectGitCheckout(root);
  if (after.issues.length > 0) throw new Error(`${label} changed while Git evidence was read: ${after.issues.join("; ")}`);
  if (after.revision !== before.revision || after.objectFormat !== before.objectFormat) {
    throw new Error(`${label} identity changed while Git evidence was read`);
  }
  return { checkout: after, gitEvidence };
}

function gitEvidenceIdentity(evidence) {
  return {
    schemaVersion: 1,
    revision: evidence.revision,
    objectFormat: evidence.objectFormat,
    entryCount: evidence.entries.length,
    evidenceDigest: hashText(JSON.stringify(evidence)),
  };
}

function requireDeltaProvenance(value, label) {
  requireExactObject(value, [
    "deterministic", "dirtyAfter", "dirtyBefore", "objectFormat", "repeatSnapshotDigest", "revision", "schemaVersion", "snapshotDigest",
  ], label);
  if (value.schemaVersion !== 1) throw new Error(`${label}.schemaVersion must be 1`);
  if (value.objectFormat !== "sha1") throw new Error(`${label}.objectFormat must be 'sha1'`);
  if (!/^[0-9a-f]{40}$/.test(value.revision)) throw new Error(`${label}.revision must be a lowercase SHA-1 object id`);
  for (const key of ["snapshotDigest", "repeatSnapshotDigest"]) {
    if (!/^[0-9a-f]{64}$/.test(value[key])) throw new Error(`${label}.${key} must be lowercase SHA-256`);
  }
  for (const key of ["dirtyBefore", "dirtyAfter", "deterministic"]) {
    if (typeof value[key] !== "boolean") throw new Error(`${label}.${key} must be boolean`);
  }
  if (value.dirtyBefore || value.dirtyAfter || !value.deterministic || value.snapshotDigest !== value.repeatSnapshotDigest) {
    throw new Error(`${label} must prove a clean deterministic repeated extraction`);
  }
  return value;
}

function requireDeltaCommandOptions(options, command, keys) {
  requireExactObject(options, keys, `porter ${command} options`);
  for (const key of keys) {
    if (typeof options[key] !== "string" || options[key].trim() === "") {
      throw new Error(`porter ${command} requires --${key} <path>`);
    }
  }
}

function requireExactObject(value, expectedKeys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) {
    throw new Error(`${label} must be one plain object`);
  }
  const actualKeys = [];
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor)) {
      throw new Error(`${label} must contain only enumerable own data properties`);
    }
    actualKeys.push(key);
  }
  actualKeys.sort();
  const expected = [...expectedKeys].sort();
  if (actualKeys.length !== expected.length || actualKeys.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actualKeys.join(", ")}`);
  }
}
