import { buildDeltaCompletion, buildPorterDelta, canonicalSnapshot, DELTA_EVIDENCE_ARTIFACTS, portableSnapshot, renderDeltaMarkdown, snapshotDigest, verifyDeltaCompletion } from "../delta.mjs";
import { buildGeneratedSourceCoverage, buildGeneratedSourcePolicyStatus, generatedSourceMechanisms } from "../generated-source.mjs";
import { buildSnapshotSourceIntegrityStatus, gitTreeEntries, inspectGitCheckout, readGitCommitObjectBody } from "../source-pin.mjs";
import { inactiveSourcePolicyFor, isActivePortPolicy } from "./policies.mjs";
import { buildEffectivePolicyResolver } from "./effective-policies.mjs";
import { compareText } from "./deterministic-order.mjs";
import { buildGitCommitTreeEvidence, requireGitCommitTreeEvidence } from "./git-commit-tree-evidence.mjs";
import { assertDirectory, fail, hashText, repoRoot, writeText } from "./runtime.mjs";
import { isSemanticPrimaryUnitKind } from "./unit-kinds.mjs";
import { runScan } from "./scan-runner.mjs";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

export function runDelta(config, options) {
  requireDeltaCommandOptions(options, "delta", ["from", "out", "to"]);
  const fromRoot = path.resolve(repoRoot, options.from);
  const toRoot = path.resolve(repoRoot, options.to);
  const outRoot = path.resolve(repoRoot, options.out);
  const prepared = prepareDeltaComparison(config, { fromRoot, toRoot });
  const { from, to, report } = prepared;

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
  mkdirSync(stagingRoot, { recursive: true });
  const evidence = buildDeltaArtifacts(from.snapshot, to.snapshot, from.gitEvidence, to.gitEvidence, report);
  const completion = buildDeltaCompletion(evidence, report);
  const artifacts = [...evidence, ["COMPLETE.json", `${JSON.stringify(completion, null, 2)}\n`]];
  for (const [name, contents] of artifacts) writeText(path.join(stagingRoot, name), contents);
  renameSync(stagingRoot, outRoot);
  for (const [name] of artifacts) console.log(`written: ${path.relative(repoRoot, path.join(outRoot, name))}`);

  console.log(`TS-Go delta ${report.from.gitRevision.slice(0, 12)} -> ${report.to.gitRevision.slice(0, 12)}`);
  console.log(`Raw units added/removed/changed: ${report.rawUnits.addedCount}/${report.rawUnits.removedCount}/${report.rawUnits.changedCount}`);
  console.log(`Active units added/removed/changed: ${report.activeUnits.addedCount}/${report.activeUnits.removedCount}/${report.activeUnits.changedCount}`);
  console.log(`Tracked files added/removed/changed: ${report.trackedFiles.addedCount}/${report.trackedFiles.removedCount}/${report.trackedFiles.changedCount}`);
  console.log(`Go files added/removed/changed: ${report.goFiles.addedCount}/${report.goFiles.removedCount}/${report.goFiles.changedCount}`);
}

export function buildExactDeltaReport(config, fromSnapshot, toSnapshot, input) {
  requireExactObject(input, ["fromGitEvidence", "fromProvenance", "toGitEvidence", "toProvenance"], "delta report inputs");
  const fromGitEvidence = requireGitCommitTreeEvidence(input.fromGitEvidence, "from Git evidence");
  const toGitEvidence = requireGitCommitTreeEvidence(input.toGitEvidence, "to Git evidence");
  const fromProvenance = requireDeltaProvenance(input.fromProvenance, "from provenance");
  const toProvenance = requireDeltaProvenance(input.toProvenance, "to provenance");
  if (fromGitEvidence.revision !== fromSnapshot.gitRevision || fromProvenance.revision !== fromSnapshot.gitRevision) {
    throw new Error("from Git/provenance evidence does not match the from snapshot revision");
  }
  if (toGitEvidence.revision !== toSnapshot.gitRevision || toProvenance.revision !== toSnapshot.gitRevision) {
    throw new Error("to Git/provenance evidence does not match the to snapshot revision");
  }
  if (fromProvenance.snapshotDigest !== snapshotDigest(fromSnapshot) || toProvenance.snapshotDigest !== snapshotDigest(toSnapshot)) {
    throw new Error("delta provenance snapshot digests do not match the supplied snapshots");
  }
  const fromPolicies = buildEffectivePolicyResolver(config, fromSnapshot);
  const toPolicies = buildEffectivePolicyResolver(config, toSnapshot);
  const report = buildPorterDelta(fromSnapshot, toSnapshot, {
    policyForUnit: (snapshot, unit, file) => (snapshot === fromSnapshot ? fromPolicies : toPolicies).unit(unit, file),
    isActivePortPolicy,
    fromTreeEntries: fromGitEvidence.entries,
    toTreeEntries: toGitEvidence.entries,
  });
  const generatedMechanisms = generatedSourceMechanisms.map((mechanism) => ({
    id: mechanism.id,
    mode: mechanism.mode,
    category: mechanism.category,
    active: mechanism.active,
    ...(mechanism.statusKey === undefined ? {} : { statusKey: mechanism.statusKey }),
    patterns: [...mechanism.patterns],
    reason: mechanism.reason,
  }));
  return {
    ...report,
    provenance: {
      from: fromProvenance,
      to: toProvenance,
    },
    effectivePolicies: {
      contract: effectivePolicyContract(config, generatedMechanisms),
      from: effectivePolicyEvidence(fromSnapshot, fromPolicies),
      to: effectivePolicyEvidence(toSnapshot, toPolicies),
    },
    generatedSourcePolicies: {
      mechanisms: generatedMechanisms,
      from: buildGeneratedSourcePolicyStatus(fromSnapshot, {
        isInactive: (sourcePath) => inactiveSourcePolicyFor(config, sourcePath) !== undefined,
        requireAllMechanisms: false,
      }),
      to: buildGeneratedSourcePolicyStatus(toSnapshot, {
        isInactive: (sourcePath) => inactiveSourcePolicyFor(config, sourcePath) !== undefined,
        requireAllMechanisms: false,
      }),
      fromCoverage: buildGeneratedSourceCoverage(fromSnapshot),
      toCoverage: buildGeneratedSourceCoverage(toSnapshot),
    },
  };
}

export function runDeltaVerify(config, options) {
  requireDeltaCommandOptions(options, "delta-verify", ["dir", "from", "to"]);
  const evidenceRoot = path.resolve(repoRoot, options.dir);
  const fromRoot = path.resolve(repoRoot, options.from);
  const toRoot = path.resolve(repoRoot, options.to);
  assertDirectory(evidenceRoot, "delta evidence directory");
  const expectedNames = [...DELTA_EVIDENCE_ARTIFACTS, "COMPLETE.json"].sort();
  const entries = readdirSync(evidenceRoot, { withFileTypes: true });
  const actualNames = entries.map((entry) => entry.name).sort();
  const issues = [];
  if (JSON.stringify(actualNames) !== JSON.stringify(expectedNames) || entries.some((entry) => !entry.isFile())) {
    issues.push(`evidence directory entries must be exactly ${expectedNames.join(", ")}`);
  }

  const artifacts = new Map();
  for (const name of DELTA_EVIDENCE_ARTIFACTS) {
    const file = path.join(evidenceRoot, name);
    if (existsSync(file) && statSync(file).isFile()) artifacts.set(name, readFileSync(file, "utf8"));
  }
  const completionPath = path.join(evidenceRoot, "COMPLETE.json");
  const completionText = existsSync(completionPath) && statSync(completionPath).isFile()
    ? readFileSync(completionPath, "utf8")
    : undefined;
  let completion;
  try {
    completion = JSON.parse(completionText);
  } catch (error) {
    issues.push(`COMPLETE.json is invalid: ${error.message}`);
  }
  if (completion !== undefined && completionText !== `${JSON.stringify(completion, null, 2)}\n`) {
    issues.push("COMPLETE.json is not canonical JSON");
  }

  const prepared = prepareDeltaComparison(config, { fromRoot, toRoot });
  const expectedArtifacts = buildDeltaArtifacts(
    prepared.from.snapshot,
    prepared.to.snapshot,
    prepared.from.gitEvidence,
    prepared.to.gitEvidence,
    prepared.report,
  );
  issues.push(...verifyDeltaEvidence({
    artifacts,
    completion,
    expectedArtifacts,
    expectedReport: prepared.report,
  }));
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
function buildDeltaArtifacts(fromSnapshot, toSnapshot, fromGitEvidence, toGitEvidence, report) {
  return new Map([
    ["from-snapshot.json", `${JSON.stringify(portableSnapshot(fromSnapshot, "from"), null, 2)}\n`],
    ["from-tree.json", `${JSON.stringify(fromGitEvidence, null, 2)}\n`],
    ["to-snapshot.json", `${JSON.stringify(portableSnapshot(toSnapshot, "to"), null, 2)}\n`],
    ["to-tree.json", `${JSON.stringify(toGitEvidence, null, 2)}\n`],
    ["delta.json", `${JSON.stringify(report, null, 2)}\n`],
    ["summary.md", renderDeltaMarkdown(report)],
  ]);
}

function prepareDeltaComparison(config, input) {
  requireExactObject(input, ["fromRoot", "toRoot"], "delta source roots");
  const from = prepareDeltaSide(config, input.fromRoot, "from");
  const to = prepareDeltaSide(config, input.toRoot, "to");
  const report = buildExactDeltaReport(config, from.snapshot, to.snapshot, {
    fromGitEvidence: from.gitEvidence,
    fromProvenance: from.provenance,
    toGitEvidence: to.gitEvidence,
    toProvenance: to.provenance,
  });
  return { from, to, report };
}

function prepareDeltaSide(config, root, label) {
  assertDirectory(root, `delta --${label} source root`);
  const before = inspectGitCheckout(root);
  if (before.issues.length > 0) {
    throw new Error(`${label} delta source must be one clean Git checkout: ${before.issues.join("; ")}`);
  }
  if (before.objectFormat !== "sha1") {
    throw new Error(`${label} delta source Git object format must be sha1, got ${JSON.stringify(before.objectFormat)}`);
  }
  const sideConfig = { ...config, sourceRoot: root };
  const snapshot = runScan(sideConfig);
  const repeatSnapshot = runScan(sideConfig);
  const after = inspectGitCheckout(root);
  const deterministic = canonicalSnapshot(snapshot) === canonicalSnapshot(repeatSnapshot);
  const integrityIssues = buildSnapshotSourceIntegrityStatus(root, snapshot).issues;
  const issues = [
    ...after.issues,
    ...(before.revision === after.revision ? [] : [`revision changed during extraction (${before.revision} -> ${after.revision})`]),
    ...(before.objectFormat === after.objectFormat ? [] : [`object format changed during extraction (${before.objectFormat} -> ${after.objectFormat})`]),
    ...(snapshot.gitRevision === before.revision ? [] : [`snapshot revision ${snapshot.gitRevision} does not match checkout ${before.revision}`]),
    ...(repeatSnapshot.gitRevision === before.revision ? [] : [`repeat snapshot revision ${repeatSnapshot.gitRevision} does not match checkout ${before.revision}`]),
    ...(deterministic ? [] : ["extractor snapshots differ across repeated runs"]),
    ...integrityIssues.map((issue) => `${issue.path}: ${issue.reason}`),
  ];
  if (issues.length > 0) throw new Error(`${label} delta source failed exact extraction provenance: ${issues.join("; ")}`);
  const treeEntries = gitTreeEntries(root, snapshot.gitRevision);
  const gitEvidence = buildGitCommitTreeEvidence({
    objectFormat: before.objectFormat,
    revision: snapshot.gitRevision,
    commitBody: readGitCommitObjectBody(root, snapshot.gitRevision),
    entries: treeEntries,
  });
  return {
    snapshot,
    gitEvidence,
    provenance: requireDeltaProvenance({
      schemaVersion: 1,
      revision: snapshot.gitRevision,
      objectFormat: before.objectFormat,
      dirtyBefore: before.dirty,
      dirtyAfter: after.dirty,
      deterministic,
      snapshotDigest: snapshotDigest(snapshot),
      repeatSnapshotDigest: snapshotDigest(repeatSnapshot),
    }, `${label} provenance`),
  };
}

function effectivePolicyContract(config, generatedMechanisms) {
  const contract = {
    schemaVersion: 1,
    goModulePath: config.goModulePath,
    policies: structuredClone(config.policies ?? []),
    unitPolicies: structuredClone(config.unitPolicies ?? []),
    generatedSourceMechanisms: generatedMechanisms,
  };
  return { ...contract, digest: hashText(JSON.stringify(contract)) };
}

function effectivePolicyEvidence(snapshot, resolver) {
  const files = snapshot.files.map((file) => ({
    path: file.path,
    included: resolver.includes(file),
    policy: resolver.file(file),
  }));
  const units = [];
  for (const file of snapshot.files) {
    for (const unit of file.units) {
      if (!isSemanticPrimaryUnitKind(unit.kind)) continue;
      units.push({ id: unit.id, path: file.path, policy: resolver.unit(unit, file) });
    }
  }
  units.sort((left, right) => compareText(left.id, right.id));
  const evidence = { files, units };
  return { ...evidence, digest: hashText(JSON.stringify(evidence)) };
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
