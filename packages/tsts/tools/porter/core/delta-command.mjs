import { buildDeltaCompletion, buildPorterDelta, canonicalSnapshot, DELTA_EVIDENCE_ARTIFACTS, portableSnapshot, renderDeltaMarkdown, snapshotDigest, verifyDeltaCompletion } from "../delta.mjs";
import { buildGeneratedSourcePolicyStatus } from "../generated-source.mjs";
import { buildSnapshotSourceIntegrityStatus, gitTreeEntries, inspectGitCheckout } from "../source-pin.mjs";
import { inactiveSourcePolicyFor, isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { assertDirectory, fail, hashText, repoRoot, resolveRepo, writeText } from "./runtime.mjs";
import { runScan } from "./scan-runner.mjs";
import { validatePorterSnapshot } from "./snapshot.mjs";
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

export function runDelta(config, options) {
  if (typeof options.from !== "string" || options.from.trim() === "") {
    fail("porter delta requires --from <TS-Go checkout>");
  }
  if (typeof options.out !== "string" || options.out.trim() === "") {
    fail("porter delta requires --out <new evidence directory>");
  }
  if (options.force === true) fail("porter delta never overwrites evidence; choose a new --out directory");
  const fromRoot = path.resolve(repoRoot, options.from);
  const toRoot = path.resolve(repoRoot, typeof options.to === "string" ? options.to : config.sourceRoot);
  const outRoot = path.resolve(repoRoot, options.out);
  assertDirectory(fromRoot, "delta --from source root");
  assertDirectory(toRoot, "delta --to source root");
  const fromCheckout = inspectGitCheckout(fromRoot);
  const toCheckout = inspectGitCheckout(toRoot);
  const checkoutIssues = [
    ...fromCheckout.issues.map((reason) => `from: ${reason}`),
    ...toCheckout.issues.map((reason) => `to: ${reason}`),
  ];
  if (checkoutIssues.length > 0) {
    fail(`porter delta requires clean Git source checkouts (${checkoutIssues.join("; ")})`);
  }

  const fromConfig = { ...config, sourceRoot: fromRoot };
  const toConfig = { ...config, sourceRoot: toRoot };
  const fromSnapshot = runScan(fromConfig);
  const fromRepeat = runScan(fromConfig);
  const toSnapshot = runScan(toConfig);
  const toRepeat = runScan(toConfig);
  const fromAfter = inspectGitCheckout(fromRoot);
  const toAfter = inspectGitCheckout(toRoot);
  const fromDeterministic = canonicalSnapshot(fromSnapshot) === canonicalSnapshot(fromRepeat);
  const toDeterministic = canonicalSnapshot(toSnapshot) === canonicalSnapshot(toRepeat);
  if (!fromDeterministic || !toDeterministic) {
    fail(`porter delta extractor is nondeterministic (from=${fromDeterministic}, to=${toDeterministic})`);
  }
  const postScanIssues = [
    ...fromAfter.issues.map((reason) => `from after scan: ${reason}`),
    ...toAfter.issues.map((reason) => `to after scan: ${reason}`),
    ...(fromAfter.revision === fromCheckout.revision ? [] : [`from revision changed during scan (${fromCheckout.revision} -> ${fromAfter.revision})`]),
    ...(toAfter.revision === toCheckout.revision ? [] : [`to revision changed during scan (${toCheckout.revision} -> ${toAfter.revision})`]),
    ...buildSnapshotSourceIntegrityStatus(fromRoot, fromSnapshot).issues.map((issue) => `from ${issue.path}: ${issue.reason}`),
    ...buildSnapshotSourceIntegrityStatus(toRoot, toSnapshot).issues.map((issue) => `to ${issue.path}: ${issue.reason}`),
  ];
  if (postScanIssues.length > 0) fail(`porter delta source changed or diverged during extraction (${postScanIssues.join("; ")})`);

  const report = buildPorterDelta(fromSnapshot, toSnapshot, {
    primaryUnitKinds: config.primaryUnitKinds,
    policyForUnit: (unit, file) => policyForUnit(config, unit, file),
    isActivePortPolicy,
    fromTreeEntries: gitTreeEntries(fromRoot, fromSnapshot.gitRevision),
    toTreeEntries: gitTreeEntries(toRoot, toSnapshot.gitRevision),
  });
  report.provenance = {
    from: { revision: fromCheckout.revision, dirty: fromCheckout.dirty, deterministic: fromDeterministic },
    to: { revision: toCheckout.revision, dirty: toCheckout.dirty, deterministic: toDeterministic },
  };
  report.generatedSourcePolicies = {
    from: buildGeneratedSourcePolicyStatus(fromSnapshot, {
      isInactive: (sourcePath) => inactiveSourcePolicyFor(config, sourcePath) !== undefined,
      requireAllMechanisms: false,
    }),
    to: buildGeneratedSourcePolicyStatus(toSnapshot, {
      isInactive: (sourcePath) => inactiveSourcePolicyFor(config, sourcePath) !== undefined,
      requireAllMechanisms: false,
    }),
  };

  const gateIssues = [
    ...(report.environmentMatches ? [] : ["extractor environments differ"]),
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
  const evidence = new Map([
    ["from-snapshot.json", `${JSON.stringify(portableSnapshot(fromSnapshot, "from"), null, 2)}\n`],
    ["to-snapshot.json", `${JSON.stringify(portableSnapshot(toSnapshot, "to"), null, 2)}\n`],
    ["delta.json", `${JSON.stringify(report, null, 2)}\n`],
    ["summary.md", renderDeltaMarkdown(report)],
  ]);
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

export function runDeltaVerify(config, options) {
  if (typeof options.dir !== "string" || options.dir.trim() === "") fail("porter delta-verify requires --dir <evidence directory>");
  const evidenceRoot = path.resolve(repoRoot, options.dir);
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
  let completion;
  let fromSnapshot;
  let toSnapshot;
  let report;
  try { completion = JSON.parse(readFileSync(path.join(evidenceRoot, "COMPLETE.json"), "utf8")); } catch (error) { issues.push(`COMPLETE.json is invalid: ${error.message}`); }
  try { fromSnapshot = JSON.parse(artifacts.get("from-snapshot.json")); } catch (error) { issues.push(`from-snapshot.json is invalid: ${error.message}`); }
  try { toSnapshot = JSON.parse(artifacts.get("to-snapshot.json")); } catch (error) { issues.push(`to-snapshot.json is invalid: ${error.message}`); }
  try { report = JSON.parse(artifacts.get("delta.json")); } catch (error) { issues.push(`delta.json is invalid: ${error.message}`); }
  if (completion !== undefined) issues.push(...verifyDeltaCompletion(artifacts, completion));
  for (const [label, snapshot] of [["from", fromSnapshot], ["to", toSnapshot]]) {
    if (snapshot === undefined) continue;
    const normalized = { ...snapshot, sourceRoot: resolveRepo(config.sourceRoot) };
    issues.push(...validatePorterSnapshot(normalized, config).map((issue) => `${label} snapshot: ${issue}`));
  }
  if (report !== undefined) {
    if (report.schemaVersion !== 2) issues.push("delta.json schemaVersion must be 2");
    if (report.environmentMatches !== true) issues.push("delta.json must prove equal extractor environments");
    if (fromSnapshot !== undefined && report.from?.digest !== snapshotDigest(fromSnapshot)) issues.push("delta.json from digest does not match from-snapshot.json");
    if (toSnapshot !== undefined && report.to?.digest !== snapshotDigest(toSnapshot)) issues.push("delta.json to digest does not match to-snapshot.json");
    if (fromSnapshot !== undefined && report.from?.gitRevision !== fromSnapshot.gitRevision) issues.push("delta.json from revision does not match from-snapshot.json");
    if (toSnapshot !== undefined && report.to?.gitRevision !== toSnapshot.gitRevision) issues.push("delta.json to revision does not match to-snapshot.json");
    if (artifacts.get("summary.md") !== renderDeltaMarkdown(report)) issues.push("summary.md is not the exact rendering of delta.json");
    for (const side of ["from", "to"]) {
      if (report.provenance?.[side]?.dirty !== false || report.provenance?.[side]?.deterministic !== true) issues.push(`delta.json provenance.${side} must prove clean deterministic extraction`);
      if ((report.generatedSourcePolicies?.[side]?.issues?.length ?? 0) !== 0) issues.push(`delta.json generated-source policy for ${side} contains issues`);
    }
  }
  if (completion !== undefined && report !== undefined) {
    if (completion.fromRevision !== report.from?.gitRevision || completion.toRevision !== report.to?.gitRevision) issues.push("COMPLETE.json revisions do not match delta.json");
  }
  if (issues.length > 0) fail(`porter delta evidence verification failed: ${issues.slice(0, 12).join("; ")}`);
  console.log(`porter delta evidence verified: ${path.relative(repoRoot, evidenceRoot)}`);
}
