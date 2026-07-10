#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import ts from "typescript";
import { computeSignatureReport } from "./sig-check.mjs";

import {
  buildAstGeneratedArtifactStatus,
  collectAstArtifactFailures,
  emptyAstGeneratedArtifactStatus,
  writeAstGenerated,
} from "./ast-generator.mjs";
import {
  buildDiagnosticsGeneratedArtifactStatus,
  collectDiagnosticsArtifactFailures,
  emptyDiagnosticsGeneratedArtifactStatus,
  writeDiagnosticsGenerated,
} from "./diagnostics-generator.mjs";
import {
  buildBundledGeneratedArtifactStatus,
  collectBundledArtifactFailures,
  emptyBundledGeneratedArtifactStatus,
} from "../bundled/generate-bundled.mjs";
import {
  buildUnicodeGeneratedArtifactStatus,
  collectUnicodeArtifactFailures,
  emptyUnicodeGeneratedArtifactStatus,
} from "../unicode/generate-unicode-data.mjs";

export const repoRoot = findRepoRoot(process.cwd());
export const configPath = path.join(repoRoot, "packages/tsts/porter.config.json");
export const activePortCategories = new Set(["literal-port", "manual-required", "host-native"]);

export async function main() {
  const [command = "status", ...args] = process.argv.slice(2);
  const options = parseArgs(args);
  const config = loadConfig();

  if (command === "sig-check") {
    await runSigCheck(config, options);
    return;
  }

  if (command === "scan") {
    const snapshot = runScan(config);
    writeJson(resolveRepo(config.snapshotOut), snapshot);
    printScanSummary(config, snapshot);
    return;
  }

  if (command === "source-docs") {
    const snapshot = runScan(config);
    const result = buildEmbeddedGoSourceUpdates(snapshot, resolveRepo(config.tsRoot));
    console.log(`embedded Go source docs needing updates: ${result.unitCount} unit(s) in ${result.updates.length} file(s)`);
    if (options.write === true) {
      for (const update of result.updates) {
        const outcome = writeTextSafely(update.path, update.text, {
          force: options.force === true,
          label: "ported TypeScript source file",
        });
        console.log(`${outcome}: ${path.relative(repoRoot, update.path)}`);
      }
      return;
    }
    if (options.check === true && result.unitCount > 0) {
      fail(`${result.unitCount} embedded Go source block(s) differ from pinned TS-Go`);
    }
    if (result.unitCount > 0) {
      console.log("Dry run only. Re-run with --write --force to synchronize source documentation.");
    }
    return;
  }

  if (command === "facades") {
    const snapshot = runScan(config);
    writeJson(resolveRepo(config.snapshotOut), snapshot);
    if (options.check === true) {
      const generatedArtifacts = buildGeneratedArtifactStatus(config, snapshot);
      const failures = collectGeneratedArtifactFailures(generatedArtifacts);
      if (failures.length > 0) {
        fail(`generated facade check failed: ${failures.join(", ")}`);
      }
      console.log("generated facade check passed");
      return;
    }
    writeExternalFacades(config, snapshot, options);
    return;
  }

  if (command === "large-files") {
    const snapshot = runScan(config);
    const splitStatus = buildLargeFileSplitStatus(config, snapshot);
    writeJson(resolveRepo(config.snapshotOut), snapshot);
    writeJson(resolveRepo(config.largeFileSplitStatusOut ?? ".temp/porter/large-file-splits.json"), splitStatus);
    if (options["write-draft"] === true) {
      const draft = buildDraftLargeFileSplitPlan(config, snapshot);
      writeJsonSafely(resolveRepo(splitPlanLabel(config)), draft, {
        force: options.force === true,
        label: "large-file split plan",
      });
      console.log(`wrote draft semantic split plan: ${splitPlanLabel(config)}`);
      return;
    }
    printLargeFileSplitStatus(config, splitStatus);
    if (options.check === true) {
      verifyLargeFileSplitStatus(splitStatus);
      return;
    }
    return;
  }

  if (command === "ast") {
    const snapshot = runScan(config);
    const sourceRevision = snapshot.gitRevision;
    const schemaSourceSyncFailures = collectSchemaSourceSyncFailures(buildSchemaSourceSyncStatus(config));
    if (schemaSourceSyncFailures.length > 0) {
      fail(`AST schema/source sync check failed: ${schemaSourceSyncFailures.join(", ")}`);
    }
    if (options.write === true) {
      const results = writeAstGenerated(config, sourceRevision, { force: options.force === true });
      for (const result of results) {
        console.log(`${result.outcome}: ${result.path}`);
      }
      return;
    }
    // Default: check mode (no write flag provided).
    const astStatus = buildAstGeneratedArtifactStatus(config, sourceRevision);
    const failures = collectAstArtifactFailures(astStatus);
    if (failures.length > 0) {
      fail(`AST generated artifact check failed: ${failures.join(", ")}`);
    }
    console.log("AST generated artifact check passed");
    return;
  }

  if (command === "diagnostics") {
    const snapshot = runScan(config);
    const sourceRevision = snapshot.gitRevision;
    if (options.write === true) {
      const results = writeDiagnosticsGenerated(config, sourceRevision, { force: options.force === true });
      for (const result of results) {
        console.log(`${result.outcome}: ${result.path}`);
      }
      return;
    }
    // Default: check mode (no write flag provided).
    const diagnosticsStatus = buildDiagnosticsGeneratedArtifactStatus(config, sourceRevision);
    const failures = collectDiagnosticsArtifactFailures(diagnosticsStatus);
    if (failures.length > 0) {
      fail(`diagnostics generated artifact check failed: ${failures.join(", ")}`);
    }
    console.log("diagnostics generated artifact check passed");
    return;
  }

  if (command === "status" || command === "verify" || command === "scaffold" || command === "skeleton-check") {
    const snapshot = runScan(config);
    const tsUnits = scanTsUnits(resolveRepo(config.tsRoot));
    const generatedArtifacts = buildGeneratedArtifactStatus(config, snapshot);
    const astGeneratedArtifacts = buildAstGeneratedArtifactStatus(config, snapshot.gitRevision);
    const diagnosticsGeneratedArtifacts = buildDiagnosticsGeneratedArtifactStatus(config, snapshot.gitRevision);
    const bundledGeneratedArtifacts = buildBundledGeneratedArtifactStatus(config, snapshot.gitRevision);
    const unicodeGeneratedArtifacts = buildUnicodeGeneratedArtifactStatus(config);
    const schemaSourceSync = buildSchemaSourceSyncStatus(config);
    const localOverrides = buildLocalOverrideStatus(config, tsUnits);
    const status = buildStatus(config, snapshot, tsUnits, generatedArtifacts, astGeneratedArtifacts, diagnosticsGeneratedArtifacts, bundledGeneratedArtifacts, unicodeGeneratedArtifacts, schemaSourceSync, localOverrides);
    if (command === "verify") {
      const signatureReport = await computeSignatureReport(
        {
          config,
          snapshot,
          repoRoot,
          tsFiles: tsUnits.files.filter((file) => file.metadataCount > 0),
          tsById: new Map(tsUnits.units.map((unit) => [unit.id, unit])),
        },
      );
      status.signatureCheck = summarizeSignatureReport(signatureReport);
    }
    writeJson(resolveRepo(config.snapshotOut), snapshot);
    writeJson(resolveRepo(config.statusOut), status);
    writeText(resolveRepo(config.reportOut), renderStatusMarkdown(status));
    printStatus(config, status);

    if (command === "verify") {
      verifyStatus(status, options);
      return;
    }
    if (command === "scaffold") {
      scaffoldMissing(config, status, snapshot, options);
      return;
    }
    if (command === "skeleton-check") {
      checkSkeletons(config, status, snapshot, options);
      return;
    }
    return;
  }

  fail(`unknown command '${command}'. Expected scan, status, verify, sig-check, source-docs, scaffold, facades, large-files, ast, diagnostics, or skeleton-check.`);
}

// Signature/type-equivalence check. Compares each ported @tsgo-unit's actual TS
// signature against the signature derived from Go. `porter verify` always runs
// this as a hard gate; the standalone command supports `--id <glob>`, `--json`,
// and `--no-gate` for local exploration.
async function runSigCheck(config, options) {
  const snapshot = runScan(config);
  const tsUnits = scanTsUnits(resolveRepo(config.tsRoot));
  const tsById = new Map(tsUnits.units.map((u) => [u.id, u]));
  const tsFiles = tsUnits.files.filter((file) => file.metadataCount > 0);
  const report = await computeSignatureReport(
    { config, snapshot, repoRoot, tsFiles, tsById },
    { idFilter: typeof options.id === "string" ? options.id : undefined },
  );
  if (options.json === true) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printSigReport(report);
  }
  if ((report.mismatches.length > 0 || (report.overrideIssues?.length ?? 0) > 0) && options["no-gate"] !== true) {
    process.exit(1);
  }
}

function summarizeSignatureReport(report) {
  const byKind = {};
  for (const mismatch of report.mismatches) byKind[mismatch.kind] = (byKind[mismatch.kind] ?? 0) + 1;
  return {
    checked: report.checked,
    overriddenUnits: report.overriddenUnits,
    mismatches: report.mismatches.length,
    overrideIssues: report.overrideIssues?.length ?? 0,
    byKind,
  };
}

function printSigReport(report) {
  const byKind = new Map();
  for (const m of report.mismatches) byKind.set(m.kind, (byKind.get(m.kind) ?? 0) + 1);
  console.log(`porter sig-check: ${report.checked} units checked, ${report.overriddenUnits} overridden, ${report.mismatches.length} mismatches, ${report.overrideIssues?.length ?? 0} override metadata issues`);
  for (const issue of report.overrideIssues ?? []) {
    console.log(`\n[override-metadata] ${issue.id || "<config>"}\n  ${issue.reason}`);
  }
  for (const [kind, n] of [...byKind.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(5)}  ${kind}`);
  }
  for (const m of report.mismatches.slice(0, 50)) {
    const unit = m.id.split("::").slice(2).join("::");
    console.log(`\n[${m.kind}] ${unit}\n  ${m.file}\n  ${m.detail}`);
    if (m.expected !== undefined || m.actual !== undefined) {
      console.log(`  expected: ${m.expected}\n  actual:   ${m.actual}`);
    }
  }
  if (report.mismatches.length > 50) console.log(`\n… and ${report.mismatches.length - 50} more (use --json for the full list).`);
}

export function runScan(config) {
  const sourceRoot = resolveRepo(config.sourceRoot);
  const helperDir = resolveRepo("packages/tsts/tools/porter/go-extractor");
  assertDirectory(sourceRoot, "TS-Go source root");
  assertDirectory(helperDir, "Go extractor");

  const result = spawnSync(
    "go",
    ["run", ".", "-root", sourceRoot, "-module", config.goModulePath],
    { cwd: helperDir, encoding: "utf8", maxBuffer: 1024 * 1024 * 512 },
  );
  if (result.error) {
    fail(`failed to execute go extractor: ${result.error.message}`);
  }
  if (result.status !== 0) {
    fail(`go extractor failed with exit ${result.status}\n${result.stderr}`);
  }
  try {
    return JSON.parse(result.stdout);
  } catch (error) {
    fail(`go extractor produced invalid JSON: ${error.message}`);
  }
}

export function emptySchemaSourceSyncStatus() {
  return { mismatches: [], policyIssues: [], classifiedFileCount: 0 };
}

// Every file in the vendored schema directory must have exactly one explicit
// policy. Upstream copies are checked byte-for-byte (after CRLF normalization)
// against the pinned TS-Go source tree; local metadata is classified but never
// mistaken for an upstream input. An unclassified, duplicate, missing, or
// out-of-directory policy is a hard failure. This keeps the schema pin and the
// source pin on one mechanically audited track.
export function buildSchemaSourceSyncStatus(config) {
  const schemaDirRelative = config.astSchemaDir ?? "packages/tsts/schema/tsgo";
  const schemaDir = resolveRepo(schemaDirRelative);
  const policies = config.schemaFilePolicies ?? [];
  const sourceRoot = resolveRepo(config.sourceRoot);
  const mismatches = [];
  const policyIssues = [];
  const policyByPath = new Map();
  const normalize = (text) => text.replace(/\r\n/g, "\n");

  for (const policy of policies) {
    if (policy === null || typeof policy !== "object" || Array.isArray(policy)) {
      policyIssues.push({ path: "<invalid>", reason: "schema file policy must be an object" });
      continue;
    }
    if (typeof policy.path !== "string" || policy.path.trim() === "") {
      policyIssues.push({ path: "<invalid>", reason: "schema file policy requires a non-empty path" });
      continue;
    }
    const schemaPath = resolveRepo(policy.path);
    const relativeToSchemaDir = path.relative(schemaDir, schemaPath);
    if (relativeToSchemaDir.startsWith("..") || path.isAbsolute(relativeToSchemaDir)) {
      policyIssues.push({ path: policy.path, reason: `schema file policy is outside ${schemaDirRelative}` });
      continue;
    }
    if (policyByPath.has(policy.path)) {
      policyIssues.push({ path: policy.path, reason: "schema file has duplicate policies" });
      continue;
    }
    if (policy.kind !== "upstream-copy" && policy.kind !== "local-metadata") {
      policyIssues.push({ path: policy.path, reason: "schema file policy kind must be 'upstream-copy' or 'local-metadata'" });
      continue;
    }
    if (policy.kind === "upstream-copy" && (typeof policy.source !== "string" || policy.source.trim() === "")) {
      policyIssues.push({ path: policy.path, reason: "upstream-copy schema policy requires a non-empty source" });
      continue;
    }
    if (policy.kind === "local-metadata" && policy.source !== undefined) {
      policyIssues.push({ path: policy.path, reason: "local-metadata schema policy must not declare an upstream source" });
      continue;
    }
    policyByPath.set(policy.path, policy);
  }

  const actualSchemaFiles = existsSync(schemaDir)
    ? walk(schemaDir)
      .filter((file) => statSync(file).isFile())
      .map((file) => path.relative(repoRoot, file).split(path.sep).join("/"))
      .sort()
    : [];
  const actualSchemaPaths = new Set(actualSchemaFiles);
  for (const schemaPath of actualSchemaFiles) {
    if (!policyByPath.has(schemaPath)) {
      policyIssues.push({ path: schemaPath, reason: "schema directory file has no explicit policy" });
    }
  }
  for (const policyPath of policyByPath.keys()) {
    if (!actualSchemaPaths.has(policyPath)) {
      policyIssues.push({ path: policyPath, reason: "classified schema directory file is missing" });
    }
  }

  for (const policy of policyByPath.values()) {
    if (policy.kind !== "upstream-copy") continue;
    const schemaPath = resolveRepo(policy.path);
    const sourcePath = path.join(sourceRoot, policy.source);
    if (!existsSync(schemaPath)) {
      continue;
    }
    if (!statSync(schemaPath).isFile()) {
      policyIssues.push({ path: policy.path, reason: "classified schema path is not a regular file" });
      continue;
    }
    if (!existsSync(sourcePath)) {
      mismatches.push({ schema: policy.path, source: policy.source, reason: "live source file is missing (upstream moved/removed it; refresh the schema pin)" });
      continue;
    }
    if (normalize(readFileSync(schemaPath, "utf8")) !== normalize(readFileSync(sourcePath, "utf8"))) {
      mismatches.push({ schema: policy.path, source: policy.source, reason: "schema-dir copy differs from live source; refresh the AST schema pin and regenerate" });
    }
  }
  return { mismatches, policyIssues, classifiedFileCount: policyByPath.size };
}

export function collectSchemaSourceSyncFailures(status) {
  const failures = [];
  const policyIssues = status.policyIssues ?? [];
  if (policyIssues.length > 0) {
    failures.push(`${policyIssues.length} schema file policy issues (${policyIssues.map((issue) => issue.path.split("/").pop()).join(", ")})`);
  }
  if (status.mismatches.length > 0) {
    failures.push(`${status.mismatches.length} schema/source sync mismatches (${status.mismatches.map((m) => m.schema.split("/").pop()).join(", ")})`);
  }
  return failures;
}

export function buildStatus(
  config,
  snapshot,
  tsUnits,
  generatedArtifacts = emptyGeneratedArtifactStatus(),
  astGeneratedArtifacts = emptyAstGeneratedArtifactStatus(),
  diagnosticsGeneratedArtifacts = emptyDiagnosticsGeneratedArtifactStatus(),
  bundledGeneratedArtifacts = emptyBundledGeneratedArtifactStatus(),
  unicodeGeneratedArtifacts = emptyUnicodeGeneratedArtifactStatus(),
  schemaSourceSync = emptySchemaSourceSyncStatus(),
  localOverrides = emptyLocalOverrideStatus(),
) {
  const primaryKinds = new Set(config.primaryUnitKinds);
  const largeFileSplits = buildLargeFileSplitStatus(config, snapshot);
  const goUnits = [];
  const goByID = new Map();
  const duplicateGoIDs = [];

  for (const file of snapshot.files) {
    const filePolicy = policyFor(config, file.path, file.generated);
    for (const unit of file.units ?? []) {
      const policy = policyForUnit(config, unit, file);
      const record = {
        ...unit,
        file: {
          path: file.path,
          importPath: file.importPath,
          packageName: file.packageName,
          lineCount: file.lineCount,
          generated: file.generated,
          policy: filePolicy,
        },
        portable: primaryKinds.has(unit.kind),
        policy,
        expectedTsPath: expectedTsPath(config, unit, largeFileSplits),
      };
      if (goByID.has(record.id)) duplicateGoIDs.push(record.id);
      goByID.set(record.id, record);
      goUnits.push(record);
    }
  }

  const tsByID = new Map();
  const duplicateTsIDs = [];
  for (const unit of tsUnits.units) {
    if (tsByID.has(unit.id)) duplicateTsIDs.push(unit.id);
    tsByID.set(unit.id, unit);
  }

  const rows = [];
  const categoryCounts = new Map();
  const moduleCounts = new Map();
  const missing = [];
  const stale = [];
  const implemented = [];
  const stubbed = [];
  const excluded = [];
  const mechanicalRisks = [];
  const implementationOwnerIssues = [];
  const embeddedSourceMismatches = [];

  for (const unit of goUnits) {
    if (!unit.portable) continue;

    const tsUnit = tsByID.get(unit.id);
    const category = unit.policy.category;
    const moduleName = moduleNameFor(unit.file.path);
    increment(categoryCounts, category);
    increment(moduleCounts, moduleName);

    const row = {
      id: unit.id,
      kind: unit.kind,
      goPath: unit.file.path,
      name: unit.qualifiedName,
      category,
      expectedTsPath: unit.expectedTsPath,
      status: "missing",
      reason: unit.policy.reason,
      sigHash: unit.sigHash,
      bodyHash: unit.bodyHash,
      tsPath: "",
      tsStatus: "",
    };

    if (tsUnit !== undefined) {
      const expectedSource = normalizeEmbeddedGoSource(renderGoSourceComment(unit.snippet));
      if (normalizeEmbeddedGoSource(tsUnit.embeddedGoSource) !== expectedSource) {
        embeddedSourceMismatches.push({
          id: row.id,
          path: tsUnit.path,
          name: row.name,
          reason: tsUnit.embeddedGoSource === undefined
            ? "missing Go source block"
            : "Go source block differs from pinned TS-Go",
        });
      }
    }

    if (!isActivePortPolicy(unit.policy)) {
      row.status = "excluded";
      excluded.push(row);
      rows.push(row);
      continue;
    }

    if (!tsUnit) {
      missing.push(row);
      rows.push(row);
      continue;
    }

    row.tsPath = tsUnit.path;
    row.tsStatus = tsUnit.status;
    row.hasUnimplThrow = tsUnit.hasUnimplThrow ?? false;
    row.kind = tsUnit.kind;
    if (tsUnit.implementationOwnerIssue !== undefined) {
      implementationOwnerIssues.push({ id: row.id, path: row.tsPath, name: row.name, reason: tsUnit.implementationOwnerIssue });
    }
    const unitMechanicalRisks = collectMechanicalPortRisks(unit, tsUnit);
    if (unitMechanicalRisks.length > 0) {
      row.mechanicalRisks = unitMechanicalRisks;
      for (const risk of unitMechanicalRisks) {
        mechanicalRisks.push({ id: row.id, path: row.tsPath, name: row.name, ...risk });
      }
    }
    const sigMatches = !tsUnit.sigHash || tsUnit.sigHash === unit.sigHash;
    const bodyMatches = !tsUnit.bodyHash || tsUnit.bodyHash === unit.bodyHash;
    if (!sigMatches || !bodyMatches) {
      row.status = "stale";
      row.reason = `metadata hash drift: sig=${sigMatches ? "ok" : "changed"} body=${bodyMatches ? "ok" : "changed"}`;
      stale.push(row);
    } else if (tsUnit.status === "implemented") {
      row.status = "implemented";
      implemented.push(row);
    } else if (tsUnit.status === "stub") {
      row.status = "stub";
      stubbed.push(row);
    } else {
      row.status = tsUnit.status || "present";
    }
    rows.push(row);
  }

  const orphanTsUnits = tsUnits.units
    .filter((unit) => !goByID.has(unit.id))
    .map((unit) => ({ id: unit.id, path: unit.path, status: unit.status }));
  const untrackedTsFiles = tsUnits.files
    .filter((file) => file.metadataCount === 0 && tsFilePolicyFor(config, file.path).category === "requires-tsgo-unit")
    .map((file) => ({
      path: file.path,
      reason: tsFilePolicyFor(config, file.path).reason,
    }));
  const forbiddenTsFiles = tsUnits.files
    .filter((file) => tsFilePolicyFor(config, file.path).category === "forbidden-source")
    .map((file) => ({
      path: file.path,
      reason: tsFilePolicyFor(config, file.path).reason,
    }));
  const parseErrors = snapshot.files
    .filter((file) => file.parseError)
    .map((file) => ({ path: file.path, error: file.parseError }));
  const unitlessGoFiles = snapshot.files
    .filter((file) => !file.parseError && (file.units ?? []).length === 0)
    .map((file) => ({
      path: file.path,
      lineCount: file.lineCount,
      reason: "No top-level declarations; package docs/comment-only files are valid but reported.",
    }));

  const featureCounts = {};
  for (const file of snapshot.files) {
    for (const [name, count] of Object.entries(file.featureCounts ?? {})) {
      featureCounts[name] = (featureCounts[name] ?? 0) + count;
    }
  }

  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    source: {
      root: snapshot.sourceRoot,
      gitRevision: snapshot.gitRevision,
      fileCount: snapshot.summary.goFileCount,
      lineCount: snapshot.summary.lineCount,
      unitCount: snapshot.summary.unitCount,
    },
    ts: {
      root: resolveRepo(config.tsRoot),
      metadataUnitCount: tsUnits.units.length,
      scannedFileCount: tsUnits.fileCount,
    },
    counts: {
      portable: rows.length - excluded.length,
      excluded: excluded.length,
      implemented: implemented.length,
      stubbed: stubbed.length,
      missing: missing.length,
      stale: stale.length,
      orphan: orphanTsUnits.length,
      duplicateGoIDs: duplicateGoIDs.length,
      duplicateTsIDs: duplicateTsIDs.length,
      parseErrors: parseErrors.length,
      unitlessGoFiles: unitlessGoFiles.length,
      untrackedTsFiles: untrackedTsFiles.length,
      forbiddenTsFiles: forbiddenTsFiles.length,
      missingGeneratedArtifacts: generatedArtifacts.missing.length,
      staleGeneratedArtifacts: generatedArtifacts.stale.length,
      orphanGeneratedArtifacts: generatedArtifacts.orphan.length,
      untrackedGeneratedArtifacts: generatedArtifacts.untracked.length,
      invalidGeneratedArtifacts: generatedArtifacts.invalid.length,
      missingAstArtifacts: astGeneratedArtifacts.missing.length,
      staleAstArtifacts: astGeneratedArtifacts.stale.length,
      orphanAstArtifacts: astGeneratedArtifacts.orphan.length,
      untrackedAstArtifacts: astGeneratedArtifacts.untracked.length,
      invalidAstArtifacts: astGeneratedArtifacts.invalid.length,
      missingDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.missing.length,
      staleDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.stale.length,
      orphanDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.orphan.length,
      untrackedDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.untracked.length,
      invalidDiagnosticsArtifacts: diagnosticsGeneratedArtifacts.invalid.length,
      missingBundledArtifacts: bundledGeneratedArtifacts.missing.length,
      staleBundledArtifacts: bundledGeneratedArtifacts.stale.length,
      orphanBundledArtifacts: bundledGeneratedArtifacts.orphan.length,
      untrackedBundledArtifacts: bundledGeneratedArtifacts.untracked.length,
      invalidBundledArtifacts: bundledGeneratedArtifacts.invalid.length,
      missingUnicodeArtifacts: unicodeGeneratedArtifacts.missing.length,
      staleUnicodeArtifacts: unicodeGeneratedArtifacts.stale.length,
      orphanUnicodeArtifacts: unicodeGeneratedArtifacts.orphan.length,
      untrackedUnicodeArtifacts: unicodeGeneratedArtifacts.untracked.length,
      invalidUnicodeArtifacts: unicodeGeneratedArtifacts.invalid.length,
      largeFileSplitFailures: largeFileSplits.failureCount,
      schemaSourceMismatches: schemaSourceSync.mismatches.length,
      schemaFilePolicyIssues: (schemaSourceSync.policyIssues ?? []).length,
      localOverrideIssues: localOverrides.failureCount,
      mechanicalPortRisks: mechanicalRisks.length,
      implementationOwnerIssues: implementationOwnerIssues.length,
      embeddedSourceMismatches: embeddedSourceMismatches.length,
    },
    categories: Object.fromEntries([...categoryCounts.entries()].sort()),
    modules: Object.fromEntries([...moduleCounts.entries()].sort()),
    missingModules: countsByModule(missing),
    featureCounts,
    duplicateGoIDs,
    duplicateTsIDs,
    orphanTsUnits,
    parseErrors,
    unitlessGoFiles,
    untrackedTsFiles,
    forbiddenTsFiles,
    generatedArtifacts,
    astGeneratedArtifacts,
    diagnosticsGeneratedArtifacts,
    bundledGeneratedArtifacts,
    unicodeGeneratedArtifacts,
    schemaSourceSync,
    localOverrides,
    mechanicalRisks,
    implementationOwnerIssues,
    embeddedSourceMismatches,
    largeFileSplits,
    missing: missing.slice(0, 500),
    stale: stale.slice(0, 500),
    excluded: excluded.slice(0, 500),
    rows,
  };
}

export function scanTsUnits(root) {
  if (!existsSync(root)) return { fileCount: 0, files: [], units: [] };

  const files = walk(root).filter((file) => file.endsWith(".ts"));
  const fileReports = [];
  const units = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const textLines = text.split(/\r?\n/);
    const malformedGoSourceLine = textLines.findIndex((line) => /^\s*\*\s+Go source:\s*\S/.test(line));
    if (malformedGoSourceLine >= 0) {
      throw new Error(`inline Go source annotations are forbidden in ${path.relative(repoRoot, file)}:${malformedGoSourceLine + 1}; use 'Port note:' for prose and reserve 'Go source:' for the exact embedded upstream source block`);
    }
    const sourceFile = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const importBindings = collectTypeScriptImportBindings(sourceFile);
    const regex = /@tsgo-unit\s+({[^\n\r]+})/g;
    let match;
    let metadataCount = 0;
    while ((match = regex.exec(text)) !== null) {
      metadataCount++;
      try {
        const metadata = JSON.parse(match[1]);
        const overrideDocStart = text.lastIndexOf("/**", match.index);
        const overrideDocEnd = text.indexOf("*/", regex.lastIndex);
        const doc = overrideDocStart >= 0 && overrideDocEnd >= regex.lastIndex
          ? text.slice(overrideDocStart, overrideDocEnd)
          : "";
        units.push({
          id: metadata.id,
          kind: metadata.kind,
          status: metadata.status,
          sigHash: metadata.sigHash,
          bodyHash: metadata.bodyHash,
          path: path.relative(repoRoot, file).split(path.sep).join("/"),
          metadata,
          embeddedGoSource: extractEmbeddedGoSource(doc),
        });
        if (overrideDocStart >= 0 && overrideDocEnd >= regex.lastIndex) {
          const overrideJson = extractTsgoOverrideJson(doc);
          if (overrideJson !== undefined) {
            try {
              units[units.length - 1].override = JSON.parse(overrideJson);
            } catch (error) {
              fail(`invalid @tsgo-override JSON in ${path.relative(repoRoot, file)}: ${error.message}`);
            }
          }
        }
        const expectedName = expectedTsImplementationName(metadata);
        const matchingDeclarations = expectedName === undefined
          ? []
          : sourceFile.statements.filter((statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === expectedName);
        const declaration = matchingDeclarations.length === 1 ? matchingDeclarations[0] : undefined;
        const implementationBody = declaration?.body?.getText(sourceFile) ?? "";
        if (expectedName !== undefined && matchingDeclarations.length !== 1) {
          units[units.length - 1].implementationOwnerIssue = matchingDeclarations.length === 0
            ? `missing function declaration '${expectedName}'`
            : `ambiguous function declaration '${expectedName}' (${matchingDeclarations.length} matches)`;
        }
        const hasUnimplThrow = implementationBody.includes("TSGO_UNIMPLEMENTED");
        units[units.length - 1].hasUnimplThrow = hasUnimplThrow;
        units[units.length - 1].implementationBody = implementationBody;
        units[units.length - 1].implementationAnalysis = analyzeTypeScriptImplementation(implementationBody, importBindings);
      } catch (error) {
        fail(`invalid @tsgo-unit JSON in ${path.relative(repoRoot, file)}: ${error.message}`);
      }
    }
    fileReports.push({
      path: path.relative(repoRoot, file).split(path.sep).join("/"),
      metadataCount,
    });
  }
  return { fileCount: files.length, files: fileReports, units };
}

function collectTypeScriptImportBindings(sourceFile) {
  const bindings = new Map();
  for (const statement of sourceFile.statements) {
    if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) continue;
    const moduleSpecifier = statement.moduleSpecifier.text;
    const clause = statement.importClause;
    if (clause?.name !== undefined) bindings.set(clause.name.text, { moduleSpecifier, importedName: "default" });
    const named = clause?.namedBindings;
    if (named === undefined) continue;
    if (ts.isNamespaceImport(named)) {
      bindings.set(named.name.text, { moduleSpecifier, importedName: "*" });
      continue;
    }
    for (const element of named.elements) {
      bindings.set(element.name.text, { moduleSpecifier, importedName: element.propertyName?.text ?? element.name.text });
    }
  }
  return bindings;
}

function analyzeTypeScriptImplementation(body, importBindings = new Map()) {
  if (body === "") return { calls: [] };
  const sourceFile = ts.createSourceFile("/__tsgo_unit.ts", `function __tsgoUnit() ${body}`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const calls = [];
  const visit = (node) => {
    if (ts.isCallExpression(node)) {
      const callee = typeScriptCallee(node.expression, importBindings);
      if (callee !== undefined) {
        const argumentCalls = new Set();
        for (const argument of node.arguments) {
          collectTypeScriptCallTerminals(argument, argumentCalls);
        }
        calls.push({ ...callee, argumentCalls: [...argumentCalls] });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return { calls };
}

function typeScriptCallee(expression, importBindings) {
  const segments = [];
  let current = expression;
  while (ts.isPropertyAccessExpression(current)) {
    segments.unshift(current.name.text);
    current = current.expression;
  }
  if (!ts.isIdentifier(current)) {
    if (segments.length === 0) return undefined;
    return { text: segments.join("."), terminal: segments.at(-1), moduleSpecifier: undefined, importedName: undefined };
  }
  segments.unshift(current.text);
  const binding = importBindings.get(current.text);
  return {
    text: segments.join("."),
    terminal: segments.at(-1),
    moduleSpecifier: binding?.moduleSpecifier,
    importedName: binding?.importedName === "*" ? segments[1] : binding?.importedName,
  };
}

function collectTypeScriptCallTerminals(node, out) {
  if (ts.isCallExpression(node)) {
    let expression = node.expression;
    while (ts.isPropertyAccessExpression(expression)) expression = expression.name;
    if (ts.isIdentifier(expression)) out.add(expression.text);
  }
  ts.forEachChild(node, (child) => collectTypeScriptCallTerminals(child, out));
}

function expectedTsImplementationName(metadata) {
  if (metadata.kind !== "func" && metadata.kind !== "method") return undefined;
  const qualifiedName = String(metadata.id ?? "").split("::").at(-1) ?? "";
  return metadata.kind === "method" ? qualifiedName.replaceAll(".", "_") : qualifiedName;
}

function renderGoSourceComment(snippet) {
  return String(snippet ?? "")
    .split("\n")
    .map((line) => line === "" ? " *" : ` * ${line.replaceAll("*/", "* /")}`)
    .join("\n");
}

function extractEmbeddedGoSource(doc) {
  const lines = doc.split(/\r?\n/);
  const markerIndex = lines.findIndex((line) => /^\s*\*\s+Go source:\s*$/.test(line));
  if (markerIndex < 0) return undefined;
  const sourceLines = [];
  for (let index = markerIndex + 1; index < lines.length; index++) {
    const line = lines[index];
    if (/^\s*\*\s+@tsgo-/.test(line)) break;
    sourceLines.push(line);
  }
  while (sourceLines.length > 0 && /^\s*(?:\*)?\s*$/.test(sourceLines[sourceLines.length - 1])) {
    sourceLines.pop();
  }
  return sourceLines.join("\n");
}

function normalizeEmbeddedGoSource(source) {
  if (source === undefined) return undefined;
  return source.split("\n").map((line) => line.trimEnd()).join("\n");
}

export function buildEmbeddedGoSourceUpdates(snapshot, root) {
  const goById = new Map(snapshot.files.flatMap((file) => (file.units ?? []).map((unit) => [unit.id, unit])));
  const tsUnits = scanTsUnits(root);
  const replacementsByPath = new Map();
  for (const tsUnit of tsUnits.units) {
    const goUnit = goById.get(tsUnit.id);
    if (goUnit === undefined) continue;
    const expected = renderGoSourceComment(goUnit.snippet);
    if (normalizeEmbeddedGoSource(tsUnit.embeddedGoSource) === normalizeEmbeddedGoSource(expected)) continue;
    const replacements = replacementsByPath.get(tsUnit.path) ?? new Map();
    replacements.set(tsUnit.id, expected);
    replacementsByPath.set(tsUnit.path, replacements);
  }

  const updates = [];
  let unitCount = 0;
  for (const [relativePath, replacements] of replacementsByPath) {
    const filePath = resolveRepo(relativePath);
    const current = readFileSync(filePath, "utf8");
    const locations = [];
    const metadataRegex = /@tsgo-unit\s+({[^\n\r]+})/g;
    let match;
    while ((match = metadataRegex.exec(current)) !== null) {
      const metadata = JSON.parse(match[1]);
      const expected = replacements.get(metadata.id);
      if (expected === undefined) continue;
      const docStart = current.lastIndexOf("/**", match.index);
      const docEnd = current.indexOf("*/", metadataRegex.lastIndex);
      if (docStart < 0 || docEnd < 0) {
        fail(`missing JSDoc block for ${metadata.id} in ${relativePath}`);
      }
      locations.push({ docStart, docEnd, expected });
    }
    if (locations.length !== replacements.size) {
      fail(`could not locate every stale Go source block in ${relativePath}`);
    }
    let next = current;
    for (const location of locations.sort((left, right) => right.docStart - left.docStart)) {
      const doc = next.slice(location.docStart, location.docEnd);
      const updatedDoc = synchronizeEmbeddedGoSourceDoc(doc, location.expected);
      next = next.slice(0, location.docStart) + updatedDoc + next.slice(location.docEnd);
    }
    updates.push({ path: filePath, text: next, unitCount: locations.length });
    unitCount += locations.length;
  }
  return { updates, unitCount };
}

function synchronizeEmbeddedGoSourceDoc(doc, expected) {
  const marker = /^\s*\*\s+Go source:\s*$/m.exec(doc);
  if (marker === null) {
    return `${doc.trimEnd()}\n *\n * Go source:\n${expected}\n `;
  }
  const markerLineStart = doc.lastIndexOf("\n", marker.index) + 1;
  const afterMarker = marker.index + marker[0].length;
  const nextTag = /\n\s*\*\s+@tsgo-/.exec(doc.slice(afterMarker));
  const sourceEnd = nextTag === null ? doc.trimEnd().length : afterMarker + nextTag.index + 1;
  const sourceBlock = nextTag === null
    ? ` * Go source:\n${expected}`
    : ` * Go source:\n${expected}\n *\n`;
  return doc.slice(0, markerLineStart) + sourceBlock + doc.slice(sourceEnd);
}

const nontrivialGoStatementKinds = [
  "AssignStmt",
  "BranchStmt",
  "CallExpr",
  "DeferStmt",
  "ForStmt",
  "GoStmt",
  "IfStmt",
  "IncDecStmt",
  "RangeStmt",
  "ReturnStmt",
  "SelectStmt",
  "SendStmt",
  "SwitchStmt",
  "TypeSwitchStmt",
];

export function collectMechanicalPortRisks(goUnit, tsUnit) {
  if (tsUnit.status !== "implemented") return [];
  const body = tsUnit.implementationBody ?? "";
  const analysis = tsUnit.implementationAnalysis ?? analyzeTypeScriptImplementation(body);
  const bodyOverride = tsUnit.override?.allow?.includes("body") === true;
  const risks = [];
  const goHasBehavior = nontrivialGoStatementKinds.some((kind) => (goUnit.nodeKindCounts?.[kind] ?? 0) > 0);
  if ((goUnit.kind === "func" || goUnit.kind === "method") && goHasBehavior && !bodyOverride && isVoidOnlyImplementation(body)) {
    risks.push({
      kind: "implemented-no-op",
      message: "Go function has executable statements but the implemented TypeScript body is empty or only discards parameters.",
    });
  }
  if (goCalls(goUnit, "encoding/json", "Marshal") && hasTsCall(analysis, "JSON.stringify") && !hasTsFacadeCall(analysis, "Marshal")) {
    risks.push({
      kind: "json-marshal-substitution",
      message: "Go json.Marshal was replaced with raw JSON.stringify, bypassing Go field tags and custom marshalers.",
    });
  }
  if (goCalls(goUnit, "reflect", "DeepEqual") && hasTsCall(analysis, "JSON.stringify") && !hasTsFacadeCall(analysis, "DeepEqual")) {
    risks.push({
      kind: "deep-equal-stringify-substitution",
      message: "Go reflect.DeepEqual was replaced with JSON string comparison, which loses maps and non-JSON state.",
    });
  }
  const missingTristateField = tristateFields(goUnit.snippet ?? "", "IsTrue").find((field) => {
    const escapedField = escapeRegExp(field);
    const exactHelper = new RegExp(`Tristate_IsTrue\\([^)]*\\b${escapedField}\\b`);
    const numericComparison = new RegExp(`\\b${escapedField}\\b\\s*(?:!==|===)\\s*0\\b|\\b0\\s*(?:!==|===)\\s*[^;\\n]{0,40}\\b${escapedField}\\b`);
    return !exactHelper.test(body) && numericComparison.test(body);
  });
  if (missingTristateField !== undefined) {
    risks.push({
      kind: "tristate-numeric-truthiness",
      message: `Go Tristate.${missingTristateField}.IsTrue was replaced with a numeric zero comparison, which treats TSFalse as true.`,
    });
  }
  const goHasBranching = ["IfStmt", "ForStmt", "RangeStmt", "SwitchStmt", "TypeSwitchStmt", "SelectStmt"].some(
    (kind) => (goUnit.nodeKindCounts?.[kind] ?? 0) > 0,
  );
  const tsControlFlow = typeScriptControlFlowStats(body);
  if (
    !goHasBranching
    && (goUnit.nodeKindCounts?.ReturnStmt ?? 0) === 1
    && !bodyOverride
    && tsControlFlow.hasControlFlow
    && tsControlFlow.returnCount > 1
  ) {
    risks.push({
      kind: "unexpected-control-flow",
      message: "TypeScript adds control flow to a Go unit with no branch or loop; port the direct Go behavior or document a local body override.",
    });
  }
  for (const match of (goUnit.snippet ?? "").matchAll(/\.Update([A-Za-z_][A-Za-z0-9_]*)\s*\(/g)) {
    const nodeKind = match[1];
    const manualUpdate = analysis.calls.some((call) => call.terminal === "updateNode" && call.argumentCalls.includes(`New${nodeKind}`));
    if (manualUpdate && !hasTsFacadeCall(analysis, `NodeFactory_Update${nodeKind}`)) {
      risks.push({
        kind: "manual-node-update",
        message: `Go calls NodeFactory.Update${nodeKind}, but TypeScript manually reconstructs the node instead of using the generated update factory.`,
      });
    }
  }
  if (goCalls(goUnit, "path", "Split") && hasTsCallTerminal(analysis, "lastIndexOf") && !hasTsFacadeCall(analysis, "Split")) {
    risks.push({
      kind: "path-split-reimplementation",
      message: "Go path.Split was reimplemented with string indexing instead of the authored Go path facade.",
    });
  }
  if (goCalls(goUnit, "slices", "Reverse") && (hasTsCallTerminal(analysis, "reverse") || hasTsCallTerminal(analysis, "toReversed")) && !hasTsFacadeCall(analysis, "Reverse")) {
    risks.push({
      kind: "slice-reverse-reimplementation",
      message: "Go slices.Reverse was replaced with direct JavaScript reverse/copy logic instead of the authored Go slices facade.",
    });
  }
  return risks;
}

function goCalls(goUnit, importPathSuffix, name) {
  if ((goUnit.externalRefs ?? []).some((reference) =>
    reference.role === "call" && reference.name === name &&
    (reference.importPath === importPathSuffix || reference.importPath.endsWith(`/${importPathSuffix}`)))) {
    return true;
  }
  const packageName = importPathSuffix.slice(importPathSuffix.lastIndexOf("/") + 1);
  return new RegExp(`\\b${escapeRegExp(packageName)}\\.${escapeRegExp(name)}\\s*\\(`).test(goUnit.snippet ?? "");
}

function hasTsCall(analysis, text) {
  return analysis.calls.some((call) => call.text === text);
}

function hasTsCallTerminal(analysis, terminal) {
  return analysis.calls.some((call) => call.terminal === terminal);
}

function hasTsFacadeCall(analysis, exportedName) {
  return analysis.calls.some((call) =>
    call.importedName === exportedName || call.terminal === exportedName || call.terminal?.endsWith(`_${exportedName}`));
}

function typeScriptControlFlowStats(body) {
  if (body === "") return { hasControlFlow: false, returnCount: 0 };
  const sourceFile = ts.createSourceFile("porter-risk.ts", `function __ported() ${body}`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = sourceFile.statements[0];
  if (!declaration || !ts.isFunctionDeclaration(declaration) || declaration.body === undefined) {
    return { hasControlFlow: false, returnCount: 0 };
  }
  let hasControlFlow = false;
  let returnCount = 0;
  const visit = (node) => {
    if (node !== declaration && ts.isFunctionLike(node)) return;
    if (ts.isReturnStatement(node)) returnCount++;
    if (
      ts.isIfStatement(node)
      || ts.isForStatement(node)
      || ts.isForInStatement(node)
      || ts.isForOfStatement(node)
      || ts.isWhileStatement(node)
      || ts.isDoStatement(node)
      || ts.isSwitchStatement(node)
      || ts.isTryStatement(node)
    ) {
      hasControlFlow = true;
    }
    ts.forEachChild(node, visit);
  };
  visit(declaration.body);
  return { hasControlFlow, returnCount };
}

function tristateFields(snippet, method) {
  const fields = new Set();
  const pattern = new RegExp(`\\b([A-Za-z_][A-Za-z0-9_]*)\\.${method}\\(\\)`, "g");
  for (const match of snippet.matchAll(pattern)) {
    fields.add(match[1]);
  }
  return [...fields];
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isVoidOnlyImplementation(body) {
  if (body === "") return false;
  const inner = body
    .replace(/^\s*\{/, "")
    .replace(/\}\s*$/, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/[^\n\r]*/g, "")
    .replace(/\bvoid\s+[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*\s*;/g, "")
    .replace(/[;\s]/g, "");
  return inner === "";
}

function extractTsgoOverrideJson(doc) {
  const marker = "@tsgo-override";
  const markerIndex = doc.indexOf(marker);
  if (markerIndex < 0) return undefined;

  const raw = doc.slice(markerIndex + marker.length);
  const cleaned = raw
    .split(/\r?\n/)
    .map((line, index) => (index === 0 ? line : line.replace(/^\s*\*\s?/, "")))
    .join("\n")
    .trimStart();
  const start = cleaned.indexOf("{");
  if (start < 0) return undefined;

  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let index = start; index < cleaned.length; index++) {
    const ch = cleaned[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === "\\") {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }
    if (ch === '"') {
      inString = true;
      continue;
    }
    if (ch === "{") {
      depth++;
      continue;
    }
    if (ch === "}") {
      depth--;
      if (depth === 0) {
        return cleaned.slice(start, index + 1);
      }
    }
  }
  return cleaned.slice(start);
}

export function emptyLocalOverrideStatus() {
  return {
    inline: 0,
    failureCount: 0,
    invalidInline: [],
    byCategory: {},
    byAllow: {},
    signatureUnits: [],
  };
}

export function buildLocalOverrideStatus(config, tsUnits) {
  if ((config.implementationOverrides ?? []).length > 0) {
    return {
      ...emptyLocalOverrideStatus(),
      failureCount: config.implementationOverrides.length,
      invalidInline: config.implementationOverrides.map((entry, index) => ({
        id: entry.id ?? "",
        path: "",
        reason: `central implementationOverrides[${index}] is banned; move the full metadata to local @tsgo-override`,
      })),
    };
  }
  const units = tsUnits.units ?? [];
  const invalidInline = [];
  const byCategory = new Map();
  const byAllow = new Map();
  const signatureUnits = [];
  const inlineUnits = units.filter((unit) => unit.override !== undefined);
  for (const unit of inlineUnits) {
    const issues = validateOverrideShape(unit.override);
    if (issues.length > 0) {
      invalidInline.push({
        id: unit.id,
        path: unit.path,
        reason: issues.join("; "),
      });
      continue;
    }
    increment(byCategory, unit.override.category);
    for (const allow of unit.override.allow) increment(byAllow, allow);
    if (unit.override.allow.includes("signature")) {
      signatureUnits.push({ id: unit.id, path: unit.path, category: unit.override.category, reason: unit.override.reason });
    }
  }
  return {
    inline: inlineUnits.length,
    failureCount: invalidInline.length,
    invalidInline,
    byCategory: Object.fromEntries([...byCategory.entries()].sort()),
    byAllow: Object.fromEntries([...byAllow.entries()].sort()),
    signatureUnits,
  };
}

function validateOverrideShape(value) {
  const issues = [];
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return ["override must be an object"];
  }
  if (typeof value.category !== "string" || value.category.trim() === "") {
    issues.push("category is required");
  }
  if (typeof value.reason !== "string" || value.reason.trim() === "") {
    issues.push("reason is required");
  }
  const allowed = new Set(["body", "signature", "initializer", "value-order"]);
  if (!Array.isArray(value.allow) || value.allow.length === 0 || value.allow.some((item) => !allowed.has(item))) {
    issues.push("allow must be a non-empty array containing only 'body', 'signature', 'initializer', or 'value-order'");
  }
  if (Array.isArray(value.allow) && value.allow.includes("signature")) {
    if (typeof value.goSignature !== "string" || value.goSignature.trim() === "") {
      issues.push("signature overrides require goSignature");
    }
    if (typeof value.tsSignature !== "string" || value.tsSignature.trim() === "") {
      issues.push("signature overrides require tsSignature");
    }
  }
  if (Array.isArray(value.allow) && value.allow.includes("initializer")) {
    if (typeof value.goInitializer !== "string" || value.goInitializer.trim() === "") {
      issues.push("initializer overrides require goInitializer");
    }
    if (typeof value.tsInitializer !== "string" || value.tsInitializer.trim() === "") {
      issues.push("initializer overrides require tsInitializer");
    }
  }
  if (Array.isArray(value.allow) && value.allow.includes("value-order")) {
    if (typeof value.goValueOrder !== "string" || value.goValueOrder.trim() === "") {
      issues.push("value-order overrides require goValueOrder");
    }
    if (typeof value.tsValueOrder !== "string" || value.tsValueOrder.trim() === "") {
      issues.push("value-order overrides require tsValueOrder");
    }
  }
  return issues;
}

export function authoredFacadePathSet(config) {
  const sourceRootPrefix = config.tsRoot.replace(/\/$/, "");
  const set = new Set();
  for (const entry of config.authoredFacadeModules ?? []) {
    set.add(`${sourceRootPrefix}/${entry.replace(/^\/+/, "")}`);
  }
  return set;
}

export function buildGeneratedArtifactStatus(config, snapshot) {
  const authored = authoredFacadePathSet(config);
  const expected = renderExpectedGeneratedArtifacts(config, snapshot);
  const expectedPaths = new Set(expected.keys());
  const actualRoot = resolveRepo(`${config.tsRoot.replace(/\/$/, "")}/go`);
  const actualFiles = walk(actualRoot)
    // Test files (*.test.ts) co-located with facades are authored test infra, not
    // facade artifacts; they are covered by the go-compat-layer tsFilePolicy.
    .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"))
    .map((file) => path.relative(repoRoot, file).split(path.sep).join("/"));
  const actualPaths = new Set(actualFiles);
  const missing = [];
  const stale = [];
  const orphan = [];
  const untracked = [];
  const invalid = [];

  for (const relativePath of [...expectedPaths].sort()) {
    if (!actualPaths.has(relativePath)) {
      missing.push({
        path: relativePath,
        reason: "Expected generated Go compatibility/facade artifact is missing.",
      });
    }
  }

  for (const relativePath of actualFiles) {
    const absolutePath = resolveRepo(relativePath);
    const text = readFileSync(absolutePath, "utf8");
    // Authored facade modules are hand-written compatibility layers classified by
    // explicit `authoredFacadeModules` policy. They are exempt from generated-artifact
    // checks, but must NOT carry @tsgo-generated metadata (one module is either
    // generated or authored, never both).
    if (authored.has(relativePath)) {
      if (parseGeneratedArtifactMetadata(text).metadata) {
        invalid.push({
          path: relativePath,
          reason: "Authored facade module must not carry @tsgo-generated metadata; it is classified as authored by porter.config.json authoredFacadeModules.",
        });
      }
      continue;
    }
    const metadataResult = parseGeneratedArtifactMetadata(text);
    if (metadataResult.error) {
      invalid.push({ path: relativePath, reason: metadataResult.error });
      continue;
    }
    if (!metadataResult.metadata) {
      untracked.push({
        path: relativePath,
        reason: "Generated artifact area files must carry @tsgo-generated metadata.",
      });
      continue;
    }
    if (!expectedPaths.has(relativePath)) {
      orphan.push({
        path: relativePath,
        metadata: metadataResult.metadata,
        reason: "Generated artifact metadata exists, but this artifact is no longer generated from the current TS-Go snapshot.",
      });
      continue;
    }
    const expectedText = expected.get(relativePath);
    if (text !== expectedText) {
      stale.push({
        path: relativePath,
        metadata: metadataResult.metadata,
        expectedHash: hashText(stripGeneratedArtifactHeader(expectedText)),
        actualHash: hashText(stripGeneratedArtifactHeader(text)),
        reason: "Generated artifact contents differ from the current deterministic porter output.",
      });
    }
  }

  return { missing, stale, orphan, untracked, invalid };
}

export function emptyGeneratedArtifactStatus() {
  return { missing: [], stale: [], orphan: [], untracked: [], invalid: [] };
}

export function buildLargeFileSplitStatus(config, snapshot) {
  const threshold = Number(config.largeFileLineThreshold ?? 5000);
  if (!Number.isInteger(threshold) || threshold < 1) {
    fail("largeFileLineThreshold must be a positive integer");
  }

  const plan = loadLargeFileSplitPlan(config);
  const assignments = new Map();
  const files = [];
  const issues = [];
  const snapshotFiles = new Map((snapshot.files ?? []).map((file) => [file.path, file]));
  const requiredPaths = new Set();

  for (const file of snapshot.files ?? []) {
    const portableUnits = largeLiteralUnitsForFile(config, file, threshold);
    if (portableUnits.length === 0) continue;
    requiredPaths.add(file.path);
    const filePlan = plan.files?.[file.path];
    if (!filePlan) {
      issues.push(splitIssue(file.path, "missing-plan", `Large file has ${file.lineCount} LOC and ${portableUnits.length} portable units, but no semantic split plan.`));
      files.push({
        path: file.path,
        lineCount: file.lineCount,
        portableUnits: portableUnits.length,
        planned: false,
        assigned: 0,
        unassigned: portableUnits.length,
        duplicateAssignments: 0,
        staleDeclarations: 0,
        targetCount: 0,
      });
      continue;
    }
    files.push(validateLargeFilePlan(config, file, portableUnits, filePlan, assignments, issues));
  }

  for (const plannedPath of Object.keys(plan.files ?? {})) {
    const file = snapshotFiles.get(plannedPath);
    if (!file) {
      issues.push(splitIssue(plannedPath, "stale-file", "Split plan references a Go file that does not exist in the current TS-Go snapshot."));
      continue;
    }
    if (!requiredPaths.has(plannedPath)) {
      issues.push(splitIssue(plannedPath, "stale-plan", `Split plan exists for a file that is no longer an active literal-port file over ${threshold} LOC.`));
    }
  }

  return {
    schemaVersion: 1,
    threshold,
    planPath: splitPlanLabel(config),
    requiredFileCount: requiredPaths.size,
    plannedFileCount: Object.keys(plan.files ?? {}).length,
    assignedUnitCount: assignments.size,
    failureCount: issues.length,
    assignments: Object.fromEntries([...assignments.entries()].sort(([left], [right]) => left.localeCompare(right))),
    files: files.sort((left, right) => left.path.localeCompare(right.path)),
    issues: issues.sort((left, right) => `${left.file}:${left.kind}:${left.declaration ?? ""}`.localeCompare(`${right.file}:${right.kind}:${right.declaration ?? ""}`)),
  };
}

export function buildDraftLargeFileSplitPlan(config, snapshot) {
  const threshold = Number(config.largeFileLineThreshold ?? 5000);
  const files = {};
  for (const file of snapshot.files ?? []) {
    const units = largeLiteralUnitsForFile(config, file, threshold);
    if (units.length === 0) continue;
    const targetRoot = defaultLargeFileTargetRoot(config, file.path);
    const groups = new Map();
    for (const unit of units) {
      const target = draftSemanticTargetForUnit(file.path, unit);
      const group = groups.get(target.file) ?? {
        file: target.file,
        description: target.description,
        declarations: [],
      };
      group.declarations.push(splitDeclarationKey(unit));
      groups.set(target.file, group);
    }
    files[file.path] = {
      targetRoot,
      reason: `Semantic split plan for ${file.lineCount} LOC TS-Go file. Generated by porter large-files --write-draft; review group boundaries before large-scale implementation.`,
      targets: [...groups.values()]
        .map((target) => ({
          ...target,
          declarations: target.declarations.sort((left, right) => left.localeCompare(right)),
        }))
        .sort((left, right) => left.file.localeCompare(right.file)),
    };
  }
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    sourceRevision: snapshot.gitRevision,
    threshold,
    files,
  };
}

function largeLiteralUnitsForFile(config, file, threshold) {
  if (file.lineCount < threshold) return [];
  const primaryKinds = new Set(config.primaryUnitKinds);
  return (file.units ?? []).filter((unit) => {
    if (!primaryKinds.has(unit.kind)) return false;
    const policy = policyForUnit(config, unit, file);
    return policy.category === "literal-port" && isActivePortPolicy(policy);
  });
}

function defaultLargeFileTargetRoot(config, goPath) {
  return `${config.tsRoot.replace(/\/$/, "")}/${goPath.replace(/\.go$/, "")}`;
}

function draftSemanticTargetForUnit(goPath, unit) {
  if (goPath === "internal/checker/checker.go") return draftCheckerTarget(unit);
  if (goPath === "internal/parser/parser.go") return draftParserTarget(unit);
  if (goPath === "internal/printer/printer.go") return draftPrinterTarget(unit);
  return { file: "support.ts", description: "General declarations that do not yet have a more specific semantic split." };
}

function draftCheckerTarget(unit) {
  if (unit.kind !== "method") {
    return { file: "state.ts", description: "Checker state, enums, cache keys, constructors, package constants, and top-level helpers." };
  }
  const name = unit.name ?? "";
  const qualified = unit.qualifiedName ?? "";
  if (/(Diagnostic|Diagnostics|Error|Errors|Grammar|Report|Message|Span|RelatedInfo|Unreachable|Deprecated)/.test(qualified)) {
    return { file: "diagnostics.ts", description: "Checker diagnostics, grammar checks, error construction, and diagnostic attachment." };
  }
  if (/(Flow|Narrow|Narrowing|Truthiness|Falsy|Truthy|Discriminant|ControlFlow|Reachable|Definitely|Predicate)/.test(qualified)) {
    return { file: "flow-narrowing.ts", description: "Control-flow analysis, narrowing, predicates, and definite-state queries." };
  }
  if (/(Signature|Call|Construct|Overload|Candidate|Applicable|Invocation|Argument|Parameter|Arity|ReturnType|RestType|ThisType|JsxSignature)/.test(qualified)) {
    return { file: "signatures.ts", description: "Call, construct, overload, signature, argument, and return-type checking." };
  }
  if (/(Infer|Inference|Instantiation|Instantiate|Mapper|Mapping|Substitution|TypeParameter|Constraint|Variance)/.test(qualified)) {
    return { file: "inference.ts", description: "Generic inference, type parameter constraints, type mappers, instantiation, and variance." };
  }
  if (/(Assignable|Assignment|Related|Relation|Comparable|Compare|Subtype|Supertype|Identity|Identical|Excess|Satisfies)/.test(qualified)) {
    return { file: "relations.ts", description: "Assignability, comparability, relation checks, identity checks, and excess-property logic." };
  }
  if (/(Symbol|Declaration|Name|Member|Property|PropertyAccess|ElementAccess|Index|Lookup|ResolveName|Alias|Export|Import|Scope|Local|Global|Identifier)/.test(qualified)) {
    return { file: "symbols.ts", description: "Symbol lookup, declarations, names, imports/exports, property/member resolution, and identifier checks." };
  }
  if (/(Object|Type|Union|Intersection|Tuple|Array|Literal|Enum|Widen|Apparent|Base|Indexed|Mapped|Conditional|Template|Primitive|StringLike|NumberLike|BooleanLike|BigInt|ESSymbol|Unknown|Never|Any|Void|Null|Undefined)/.test(qualified)) {
    return { file: "types.ts", description: "Type construction, classification, object/union/intersection/tuple types, and apparent/base type operations." };
  }
  if (/(Class|Constructor|Heritage|Interface|Implements|BaseClass|Derived|Abstract|Private|Protected|Public|Static|Override)/.test(qualified)) {
    return { file: "classes.ts", description: "Class, interface, constructor, heritage, visibility, and override semantics." };
  }
  if (/(Module|Namespace|Ambient|External|Augmentation|Import|Export|Package|Global)/.test(qualified)) {
    return { file: "modules.ts", description: "Module, namespace, ambient, package, import/export, and global augmentation checks." };
  }
  if (/(Jsx|JSX|JSDoc|Decorator|TaggedTemplate|TemplateTag)/.test(qualified)) {
    return { file: "jsx-jsdoc-decorators.ts", description: "JSX, JSDoc, decorators, and tagged-template checking." };
  }
  if (/(Expression|Node|SourceFile|Statement|Block|Variable|Function|Arrow|Return|Throw|Switch|For|While|Do|Break|Continue|With|Try|Catch|Binary|Unary|Conditional|Delete|Await|Yield|Access|Literal|Template|ObjectLiteral|ArrayLiteral)/.test(qualified)) {
    return { file: "syntax-checking.ts", description: "Syntax-node checking for expressions, statements, literals, functions, and source files." };
  }
  if (/^(get|set|create|make|add|remove|append|clear|cache|mark|is|has|contains|maybe|try|forEach|visit|walk)/.test(name)) {
    return { file: "support-queries.ts", description: "Shared checker queries, caches, predicates, walkers, and small support operations." };
  }
  return { file: "support.ts", description: "General checker support declarations that remain exact-id tracked and must be reviewed before implementation." };
}

function draftParserTarget(unit) {
  if (unit.kind !== "method" && unit.kind !== "func") {
    return { file: "state.ts", description: "Parser state, parsing contexts, pools, package constants, and top-level data." };
  }
  const qualified = unit.qualifiedName ?? "";
  if (/(JSDoc|Jsx|JSX)/.test(qualified)) return { file: "jsx-jsdoc.ts", description: "JSX and JSDoc parsing." };
  if (/(Type|Tuple|Union|Intersection|Mapped|Infer|ImportType|TypeParameter|TypeArgument|Heritage|Constraint)/.test(qualified)) return { file: "types.ts", description: "Type syntax parsing and type-list parsing." };
  if (/(Expression|Primary|Member|Call|New|Literal|Template|Binary|Unary|Update|Yield|Await|Arrow|Object|Array|Spread|ElementAccess|PropertyAccess)/.test(qualified)) return { file: "expressions.ts", description: "Expression, literal, template, and binding-element parsing." };
  if (/(Statement|Declaration|SourceFile|Block|Variable|Function|Class|Interface|Enum|Module|Namespace|Import|Export|Switch|For|While|Do|If|Try|Catch|Return|Throw|Break|Continue|With)/.test(qualified)) return { file: "statements-declarations.ts", description: "Statement, declaration, source-file, and module-item parsing." };
  if (/(List|Delimited|Separated|Array|Members|Elements|Clauses|Specifiers|Parameters|Arguments)/.test(qualified)) return { file: "lists.ts", description: "List parsing, delimited lists, parameters, arguments, members, and recovery around list terminators." };
  if (/(Token|Scanner|Scan|Expected|ReScan|LookAhead|Speculation|Context|Trivia|Keyword|Identifier)/.test(qualified)) return { file: "tokens-speculation.ts", description: "Token consumption, scanner coordination, lookahead, speculation, and context flags." };
  if (/(Error|Missing|Diagnostic|Recover|ParseError|Abort)/.test(qualified)) return { file: "errors-recovery.ts", description: "Parser diagnostics, missing nodes, recovery, and parse-error spans." };
  return { file: "support.ts", description: "General parser support declarations that remain exact-id tracked and must be reviewed before implementation." };
}

function draftPrinterTarget(unit) {
  if (unit.kind !== "method" && unit.kind !== "func") {
    return { file: "state.ts", description: "Printer options, state records, write-kind constants, and construction helpers." };
  }
  const qualified = unit.qualifiedName ?? "";
  if (/(Comment|Trivia|Detached|Directive|Pragma)/.test(qualified)) return { file: "comments.ts", description: "Comment, trivia, detached-comment, directive, and pragma emission." };
  if (/(SourceMap|Source|Line|Position|Span|Range)/.test(qualified)) return { file: "source-maps.ts", description: "Source-map state and source-position emission." };
  if (/(Type|Tuple|Union|Intersection|Mapped|Infer|ImportType|TypeParameter|TypeArgument|Heritage)/.test(qualified)) return { file: "types.ts", description: "Type-node and type-list printing." };
  if (/(Expression|Literal|Template|Binary|Unary|Call|New|Member|PropertyAccess|ElementAccess|Object|Array|Spread|Await|Yield|Arrow)/.test(qualified)) return { file: "expressions.ts", description: "Expression, literal, template, call, member, and operator printing." };
  if (/(Statement|Block|Variable|Function|Class|Interface|Enum|Module|Namespace|Import|Export|Switch|For|While|Do|If|Try|Catch|Return|Throw|Break|Continue|With)/.test(qualified)) return { file: "statements-declarations.ts", description: "Statement, declaration, source-file, and module-item printing." };
  if (/(Write|writer|Emit|Print|Node|List|Children|Separator|Indent|Line|Text|Token|Keyword|Punctuation|Operator)/.test(qualified)) return { file: "emit-core.ts", description: "Core writer, token/list emission, indentation, separators, and node dispatch." };
  return { file: "support.ts", description: "General printer support declarations that remain exact-id tracked and must be reviewed before implementation." };
}

function validateLargeFilePlan(config, file, units, filePlan, assignments, issues) {
  const targetRoot = normalizeSplitTargetRoot(config, file.path, filePlan.targetRoot);
  const targetDeclarations = new Map();
  const declarationToUnit = new Map(units.map((unit) => [splitDeclarationKey(unit), unit]));
  const assignedInFile = new Map();
  let staleDeclarations = 0;
  let invalidTargets = 0;

  if (!targetRoot) {
    issues.push(splitIssue(file.path, "invalid-target-root", "Split plan must specify a repo-relative targetRoot under the TypeScript source root."));
  }

  for (const [targetIndex, target] of (filePlan.targets ?? []).entries()) {
    const targetPath = splitTargetPath(targetRoot, target);
    if (!targetPath) {
      invalidTargets++;
      issues.push(splitIssue(file.path, "invalid-target", `Target #${targetIndex + 1} must specify file or path.`));
      continue;
    }
    if (isRandomLookingSplitPath(targetPath)) {
      invalidTargets++;
      issues.push(splitIssue(file.path, "random-split-target", `Target '${targetPath}' looks line/chunk based; large files must be split semantically.`));
      continue;
    }
    if (!target.description || String(target.description).trim() === "") {
      invalidTargets++;
      issues.push(splitIssue(file.path, "missing-target-description", `Target '${targetPath}' must document its semantic responsibility.`));
    }

    const targetKey = targetPath;
    const claimed = new Set();
    for (const declaration of target.declarations ?? []) {
      const unit = declarationToUnit.get(declaration);
      if (!unit) {
        staleDeclarations++;
        issues.push(splitIssue(file.path, "stale-declaration", `Split plan references declaration '${declaration}' that does not exist in this Go file.`, declaration, targetPath));
        continue;
      }
      claimed.add(splitDeclarationKey(unit));
    }
    for (const matcher of target.matchers ?? []) {
      for (const unit of units) {
        if (matchesSplitMatcher(unit, matcher)) claimed.add(splitDeclarationKey(unit));
      }
    }
    if (claimed.size === 0) {
      issues.push(splitIssue(file.path, "empty-target", `Target '${targetPath}' claims no declarations.`, undefined, targetPath));
    }
    targetDeclarations.set(targetKey, claimed.size);
    for (const declaration of claimed) {
      const unit = declarationToUnit.get(declaration);
      if (!unit) continue;
      const previous = assignedInFile.get(declaration);
      if (previous && previous !== targetPath) {
        issues.push(splitIssue(file.path, "duplicate-assignment", `Declaration '${declaration}' is claimed by both '${previous}' and '${targetPath}'.`, declaration, targetPath));
        continue;
      }
      assignedInFile.set(declaration, targetPath);
      assignments.set(unit.id, targetPath);
    }
  }

  const unassigned = [];
  for (const unit of units) {
    const key = splitDeclarationKey(unit);
    if (!assignedInFile.has(key)) {
      unassigned.push(key);
      issues.push(splitIssue(file.path, "unassigned-declaration", `Declaration '${key}' is not assigned to any semantic split target.`, key));
    }
  }

  return {
    path: file.path,
    lineCount: file.lineCount,
    portableUnits: units.length,
    planned: true,
    assigned: assignedInFile.size,
    unassigned: unassigned.length,
    duplicateAssignments: issues.filter((issue) => issue.file === file.path && issue.kind === "duplicate-assignment").length,
    staleDeclarations,
    invalidTargets,
    targetCount: (filePlan.targets ?? []).length,
    targetDeclarationCounts: Object.fromEntries([...targetDeclarations.entries()].sort()),
    unassignedDeclarations: unassigned.slice(0, 100),
  };
}

function loadLargeFileSplitPlan(config) {
  if (config.largeFileSplitPlan) return normalizeLargeFileSplitPlan(config.largeFileSplitPlan);
  const planPath = config.largeFileSplitPlanPath ?? "packages/tsts/porter.large-splits.json";
  const absolutePath = resolveRepo(planPath);
  if (!existsSync(absolutePath)) return { schemaVersion: 1, files: {} };
  try {
    return normalizeLargeFileSplitPlan(JSON.parse(readFileSync(absolutePath, "utf8")));
  } catch (error) {
    fail(`invalid large-file split plan ${planPath}: ${error.message}`);
  }
}

function normalizeLargeFileSplitPlan(plan) {
  if (!plan || typeof plan !== "object") fail("large-file split plan must be an object");
  if (plan.schemaVersion !== 1) fail("large-file split plan schemaVersion must be 1");
  if (!plan.files || typeof plan.files !== "object" || Array.isArray(plan.files)) {
    fail("large-file split plan must contain a files object keyed by Go source path");
  }
  return plan;
}

function normalizeSplitTargetRoot(config, sourcePath, targetRoot) {
  if (!targetRoot || typeof targetRoot !== "string") return "";
  const normalized = targetRoot.split(path.sep).join("/").replace(/\/+$/, "");
  if (normalized.startsWith("/") || normalized.includes("..")) return "";
  const tsRoot = config.tsRoot.replace(/\/$/, "");
  if (!normalized.startsWith(`${tsRoot}/`)) return "";
  if (normalized.endsWith(".ts")) return "";
  if (normalized.includes(sourcePath.replace(/\.go$/, ".ts"))) return "";
  return normalized;
}

function splitTargetPath(targetRoot, target) {
  const raw = target.path ?? (target.file ? `${targetRoot}/${target.file}` : "");
  if (!raw || typeof raw !== "string") return "";
  const normalized = raw.split(path.sep).join("/");
  if (normalized.startsWith("/") || normalized.includes("..") || !normalized.endsWith(".ts")) return "";
  return normalized;
}

function isRandomLookingSplitPath(targetPath) {
  const basename = path.posix.basename(targetPath, ".ts").toLowerCase();
  return /(?:^|[-_])(part|chunk|slice|lines?)[-_]?\d+$/.test(basename) || /^p\d+$/.test(basename);
}

function matchesSplitMatcher(unit, matcher) {
  if (!matcher || typeof matcher !== "object") return false;
  if (matcher.kind && unit.kind !== matcher.kind) return false;
  if (matcher.receiver && unit.receiver !== matcher.receiver) return false;
  if (matcher.name && unit.name !== matcher.name) return false;
  if (matcher.qualifiedName && unit.qualifiedName !== matcher.qualifiedName) return false;
  if (matcher.receiverRegex && !new RegExp(matcher.receiverRegex).test(unit.receiver ?? "")) return false;
  if (matcher.nameRegex && !new RegExp(matcher.nameRegex).test(unit.name ?? "")) return false;
  if (matcher.qualifiedNameRegex && !new RegExp(matcher.qualifiedNameRegex).test(unit.qualifiedName ?? "")) return false;
  if (matcher.idRegex && !new RegExp(matcher.idRegex).test(unit.id ?? "")) return false;
  return true;
}

function splitDeclarationKey(unit) {
  const ordinal = /::#(\d+)$/.exec(unit.id ?? "");
  return `${unit.kind}::${unit.qualifiedName}${ordinal ? `::#${ordinal[1]}` : ""}`;
}

function splitIssue(file, kind, message, declaration = undefined, target = undefined) {
  return { file, kind, message, declaration, target };
}

function splitPlanLabel(config) {
  return config.largeFileSplitPlanPath ?? "packages/tsts/porter.large-splits.json";
}

function verifyLargeFileSplitStatus(splitStatus) {
  if (splitStatus.failureCount > 0) {
    fail(`large-file split plan check failed: ${splitStatus.failureCount} issue(s)`);
  }
  console.log("large-file split plan check passed");
}

function printLargeFileSplitStatus(config, splitStatus) {
  console.log(`Large-file threshold: ${splitStatus.threshold} LOC`);
  console.log(`Split plan: ${splitStatus.planPath}`);
  console.log(`Required large files: ${splitStatus.requiredFileCount}`);
  console.log(`Planned files: ${splitStatus.plannedFileCount}`);
  console.log(`Assigned units: ${splitStatus.assignedUnitCount}`);
  console.log(`Failures: ${splitStatus.failureCount}`);
  for (const file of splitStatus.files) {
    console.log(`${file.path}: ${file.assigned}/${file.portableUnits} assigned across ${file.targetCount} target(s)`);
  }
  if (splitStatus.issues.length > 0) {
    console.log("First issues:");
    for (const issue of splitStatus.issues.slice(0, 20)) {
      console.log(`- ${issue.file}: ${issue.kind}: ${issue.message}`);
    }
  }
}

function parseGeneratedArtifactMetadata(text) {
  const match = /^\/\/ @tsgo-generated\s+({[^\n\r]+})/m.exec(text);
  if (!match) return { metadata: undefined, error: undefined };
  try {
    const metadata = JSON.parse(match[1]);
    if (metadata.schemaVersion !== 1) return { metadata, error: "Unsupported @tsgo-generated schemaVersion." };
    if (!metadata.kind) return { metadata, error: "Missing @tsgo-generated kind." };
    if (!metadata.generator) return { metadata, error: "Missing @tsgo-generated generator." };
    if (!metadata.path) return { metadata, error: "Missing @tsgo-generated path." };
    if (!metadata.sourceRevision) return { metadata, error: "Missing @tsgo-generated sourceRevision." };
    if (!metadata.contentHash) return { metadata, error: "Missing @tsgo-generated contentHash." };
    return { metadata, error: undefined };
  } catch (error) {
    return { metadata: undefined, error: `Invalid @tsgo-generated JSON: ${error.message}` };
  }
}

export function scaffoldMissing(config, status, snapshot, options) {
  assertLargeFileSplitPlanClean(status);
  const write = options.write === true;
  const scaffoldAll = options.all === true;
  const limit = scaffoldAll ? undefined : options.limit === undefined ? 25 : Number(options.limit);
  if (limit !== undefined && (!Number.isInteger(limit) || limit < 0)) {
    fail("--limit must be a non-negative integer");
  }

  let candidates = status.rows.filter((row) => row.status === "missing");
  if (options["go-path"]) {
    candidates = candidates.filter((row) => matchGlob(options["go-path"], row.goPath));
  }
  if (options.kind) {
    candidates = candidates.filter((row) => row.kind === options.kind);
  }
  if (!scaffoldAll) {
    candidates = candidates.slice(0, limit);
  }
  if (candidates.length === 0) {
    console.log("No missing units matched scaffold filters.");
    return;
  }

  const unitsByID = new Map();
  for (const file of snapshot.files) {
    for (const unit of file.units ?? []) {
      unitsByID.set(unit.id, unit);
    }
  }

  const groups = new Map();
  for (const row of candidates) {
    const group = groups.get(row.expectedTsPath) ?? [];
    group.push(row);
    groups.set(row.expectedTsPath, group);
  }

  for (const [relativeTargetPath, rows] of groups) {
    const targetPath = resolveRepo(relativeTargetPath);
    const units = rows.map((row) => {
      const unit = unitsByID.get(row.id);
      if (!unit) fail(`internal error: missing snapshot unit for ${row.id}`);
      return unit;
    });
    const text = renderUnitGroup(config, snapshot, relativeTargetPath, units, { largeFileSplits: status.largeFileSplits });
    const targetLabel = path.relative(repoRoot, targetPath);

    if (!write) {
      const action = existsSync(targetPath) ? "append to" : "create";
      console.log(`[dry-run] would ${action} ${targetLabel} with ${rows.length} unit(s)`);
      continue;
    }
    if (existsSync(targetPath) && options.append !== true) {
      fail(`refusing to append existing file without --append: ${targetLabel}`);
    }
    mkdirSync(path.dirname(targetPath), { recursive: true });
    if (existsSync(targetPath)) {
      const current = readFileSync(targetPath, "utf8").replace(/\s*$/, "\n\n");
      writeFileSync(targetPath, current + text);
      console.log(`appended ${rows.length} unit(s) to ${targetLabel}`);
    } else {
      writeFileSync(targetPath, text);
      console.log(`created ${targetLabel} with ${rows.length} unit(s)`);
    }
  }

  if (!write) {
    console.log("Dry run only. Re-run with --write to create scaffold files.");
    if (!scaffoldAll) {
      console.log("Use --all to include every matching active missing unit.");
    }
    return;
  }

  if (scaffoldAll) {
    const afterStatus = buildStatus(
      config,
      snapshot,
      scanTsUnits(resolveRepo(config.tsRoot)),
      buildGeneratedArtifactStatus(config, snapshot),
      buildAstGeneratedArtifactStatus(config, snapshot.gitRevision),
      buildDiagnosticsGeneratedArtifactStatus(config, snapshot.gitRevision),
    );
    writeJson(resolveRepo(config.statusOut), afterStatus);
    writeText(resolveRepo(config.reportOut), renderStatusMarkdown(afterStatus));
    if (afterStatus.counts.missing > 0) {
      fail(`scaffold --all left ${afterStatus.counts.missing} active missing Go unit(s); inspect ${config.reportOut}`);
    }
    console.log("scaffold --all complete: active missing Go units = 0");
  }
}

export function renderStub(unit) {
  const stubConfig = { goModulePath: "github.com/microsoft/typescript-go", tsRoot: "packages/tsts/src", primaryUnitKinds: ["constGroup", "func", "method", "type", "varGroup"] };
  return renderUnitGroup(
    stubConfig,
    { files: [fileFromUnit(unit)] },
    expectedTsPath(stubConfig, unit),
    [unit],
  );
}

export function checkSkeletons(config, status, snapshot, options) {
  assertLargeFileSplitPlanClean(status);
  const emitTemp = options["emit-temp"] !== false;
  const compile = options.compile !== false && options.compile !== "false";
  const outRoot = resolveRepo(options.out ?? ".temp/porter/skeleton");
  const targetRoot = path.join(outRoot, "src");
  const tsRootPrefix = `${config.tsRoot.replace(/\/$/, "")}/`;
  const rows = status.rows.filter((row) => row.status === "missing" || row.status === "stub" || row.status === "implemented");
  const unitsByID = unitsByIDMap(snapshot);
  const groups = new Map();
  const renderFailures = [];

  for (const row of rows) {
    const unit = unitsByID.get(row.id);
    if (!unit || !["constGroup", "func", "method", "type", "varGroup"].includes(unit.kind)) continue;
    const group = groups.get(row.expectedTsPath) ?? [];
    group.push(unit);
    groups.set(row.expectedTsPath, group);
  }

  if (emitTemp) {
    rmSync(outRoot, { recursive: true, force: true });
    mkdirSync(targetRoot, { recursive: true });
    for (const [repoRelativePath, text] of renderExpectedGeneratedArtifacts(config, snapshot)) {
      const relativeUnderSource = repoRelativePath.startsWith(tsRootPrefix)
        ? repoRelativePath.slice(tsRootPrefix.length)
        : repoRelativePath;
      writeText(path.join(targetRoot, relativeUnderSource), text);
    }
    for (const repoRelativePath of authoredFacadePathSet(config)) {
      const sourcePath = resolveRepo(repoRelativePath);
      if (!existsSync(sourcePath)) continue;
      const relativeUnderSource = repoRelativePath.startsWith(tsRootPrefix)
        ? repoRelativePath.slice(tsRootPrefix.length)
        : repoRelativePath;
      writeText(path.join(targetRoot, relativeUnderSource), readFileSync(sourcePath, "utf8"));
    }
  }

  let renderedFiles = 0;
  let renderedUnits = 0;
  const diagnostics = [];
  for (const [relativeTargetPath, units] of groups) {
    try {
      const text = renderUnitGroup(config, snapshot, relativeTargetPath, units, { diagnostics, largeFileSplits: status.largeFileSplits });
      renderedFiles++;
      renderedUnits += units.length;
      if (emitTemp) {
        const relativeUnderSource = relativeTargetPath.startsWith(tsRootPrefix)
          ? relativeTargetPath.slice(tsRootPrefix.length)
          : relativeTargetPath;
        const targetPath = path.join(targetRoot, relativeUnderSource);
        mkdirSync(path.dirname(targetPath), { recursive: true });
        writeFileSync(targetPath, text);
      }
    } catch (error) {
      renderFailures.push(`${relativeTargetPath}: ${error.message}`);
    }
  }

  const hardDiagnostics = diagnostics.filter((diagnostic) => diagnostic.severity === "error");
  console.log(`Skeleton files rendered: ${renderedFiles}`);
  console.log(`Skeleton units rendered: ${renderedUnits}`);
  console.log(`Skeleton render failures: ${renderFailures.length}`);
  console.log(`Skeleton diagnostics: ${diagnostics.length}`);
  console.log(`Skeleton hard diagnostics: ${hardDiagnostics.length}`);

  if (renderFailures.length > 0 || hardDiagnostics.length > 0) {
    const details = [
      ...renderFailures.slice(0, 20),
      ...hardDiagnostics.slice(0, 20).map((diagnostic) => `${diagnostic.unitID}: ${diagnostic.message}`),
    ];
    fail(`skeleton-check failed:\n${details.join("\n")}`);
  }

  if (emitTemp) {
    const tsconfigPath = path.join(outRoot, "tsconfig.json");
    writeJson(tsconfigPath, skeletonTsConfig());
    console.log(`Skeleton output: ${path.relative(repoRoot, outRoot)}`);
    if (compile) {
      const result = spawnSync(
        path.join(repoRoot, "node_modules/.bin/tsc"),
        ["--noEmit", "-p", tsconfigPath],
        { cwd: repoRoot, encoding: "utf8", maxBuffer: 1024 * 1024 * 256 },
      );
      if (result.error) fail(`failed to execute TypeScript compiler: ${result.error.message}`);
      if (result.status !== 0) {
        fail(`skeleton TypeScript compile failed with exit ${result.status}\n${result.stdout}\n${result.stderr}`);
      }
      console.log("skeleton TypeScript compile passed");
    }
  }
}

export function renderUnitGroup(config, snapshot, relativeTargetPath, units, options = {}) {
  for (const unit of units) {
    if (!["constGroup", "func", "method", "type", "varGroup"].includes(unit.kind)) {
      throw new Error(`cannot render scaffold for non-portable Go unit kind '${unit.kind}': ${unit.id}`);
    }
  }
  const context = rendererContext(config, snapshot, relativeTargetPath, units, options);
  const body = units.map((unit) => renderUnit(unit, context)).join("\n");
  const imports = renderImports(context);
  return `${imports}${body}`.replace(/\s*$/, "\n");
}

function rendererContext(config, snapshot, relativeTargetPath, units, options) {
  const filesByPath = options.filesByPath ?? new Map(snapshot.files.map((file) => [file.path, file]));
  const largeFileSplits = options.largeFileSplits ?? buildLargeFileSplitStatus(config, snapshot);
  // The symbol/value/facade indexes are expensive global builds over the whole
  // snapshot; callers that render many units in a loop may inject pre-built ones.
  const symbolIndex = options.symbolIndex ?? buildSymbolIndex(config, snapshot, largeFileSplits);
  const firstUnit = units[0];
  const goPath = firstUnit?.metadata?.goPath ?? "";
  const file = filesByPath.get(goPath) ?? fileFromUnit(firstUnit);
  const localTypeNames = new Set(
    units
      .filter((unit) => unit.kind === "type")
      .map((unit) => unit.name),
  );
  const localTopLevelNames = new Set(units.flatMap((unit) => topLevelNamesForUnit(unit)));
  return {
    config,
    snapshot,
    symbolIndex,
    valueTypeIndex: options.valueTypeIndex ?? buildValueTypeIndex(config, snapshot, largeFileSplits),
    file,
    relativeTargetPath,
    imports: new Map(),
    coreImports: new Set(),
    compatImports: new Set(),
    diagnostics: options.diagnostics ?? [],
    localTypeNames,
    localTopLevelNames,
    importAliases: importAliasMap(file.imports ?? []),
    externalFacades: options.externalFacades ?? buildExternalFacadeMap(config, snapshot),
  };
}

// Builds the expensive whole-snapshot indexes once, for callers that render many
// units in a loop (e.g. the signature checker). Pass the result as renderUnitGroup
// `options` so rendererContext reuses them instead of rebuilding per call.
export function buildRenderIndexes(config, snapshot) {
  const filesByPath = new Map(snapshot.files.map((file) => [file.path, file]));
  const largeFileSplits = buildLargeFileSplitStatus(config, snapshot);
  return {
    filesByPath,
    largeFileSplits,
    symbolIndex: buildSymbolIndex(config, snapshot, largeFileSplits),
    valueTypeIndex: buildValueTypeIndex(config, snapshot, largeFileSplits),
    externalFacades: buildExternalFacadeMap(config, snapshot),
  };
}

function renderUnit(unit, context) {
  const metadata = {
    id: unit.id,
    kind: unit.kind,
    status: "stub",
    sigHash: unit.sigHash,
    bodyHash: unit.bodyHash,
  };
  const goComment = renderGoSourceComment(unit.snippet);
  const header = `/**\n * @tsgo-unit ${JSON.stringify(metadata)}\n *\n * Go source:\n${goComment}\n */\n`;
  if (unit.kind === "type") return `${header}${renderTypeUnit(unit, context)}\n`;
  if (unit.kind === "func" || unit.kind === "method") return `${header}${renderFunctionUnit(unit, context)}\n`;
  if (unit.kind === "constGroup") return `${header}${renderValueGroup(unit, context, "const")}\n`;
  if (unit.kind === "varGroup") return `${header}${renderValueGroup(unit, context, "let")}\n`;
  throw new Error(`unsupported unit kind ${unit.kind}`);
}

function renderTypeUnit(unit, context) {
  const typeParameters = renderTypeParameterList(unit.typeParameterDetails ?? [], context, unit, { defaultUnknown: true });
  if (unit.typeKind === "struct") {
    const { heritage, members } = renderObjectMembers(unit.members ?? [], context, unit, "struct");
    const extendsClause = heritage.length > 0 ? ` extends ${heritage.join(", ")}` : "";
    return `export interface ${safeIdentifier(unit.name)}${typeParameters}${extendsClause} {\n${members.length > 0 ? members.join("\n") : "  readonly __tsgoEmpty?: never;"}\n}`;
  }
  if (unit.typeKind === "interface") {
    const { heritage, members } = renderObjectMembers(unit.members ?? [], context, unit, "interface");
    const extendsClause = heritage.length > 0 ? ` extends ${heritage.join(", ")}` : "";
    return `export interface ${safeIdentifier(unit.name)}${typeParameters}${extendsClause} {\n${members.length > 0 ? members.join("\n") : "  readonly __tsgoEmpty?: never;"}\n}`;
  }
  const expression = tsType(unit.typeExpression, context, scopeForUnit(unit), unit);
  return `export type ${safeIdentifier(unit.name)}${typeParameters} = ${expression};`;
}

function renderFunctionUnit(unit, context) {
  const scope = scopeForUnit(unit);
  const receiverTypeParameters = receiverTypeParameterDetails(unit.receiverType);
  const typeParameters = renderTypeParameterList([...(receiverTypeParameters ?? []), ...(unit.typeParameterDetails ?? [])], context, unit);
  const params = [];
  const usedParamNames = new Set();
  if (unit.kind === "method") {
    const receiverName = uniqueName("receiver", usedParamNames);
    params.push(`${receiverName}: ${tsType(unit.receiverType, context, scope, unit)}`);
  }
  params.push(...renderParameters(unit.parameters ?? [], context, scope, unit, usedParamNames));
  const returnType = tsReturnType(unit.results ?? [], context, scope, unit);
  return `export function ${localTsName(unit)}${typeParameters}(${params.join(", ")}): ${returnType} {\n  throw new globalThis.Error(${JSON.stringify(`TSGO_UNIMPLEMENTED ${unit.id}`)});\n}`;
}

function renderValueGroup(unit, context, declarationKind) {
  const lines = [];
  let fallbackIndex = 0;
  let blankIndex = 0;
  const used = new Set();
  for (const spec of unit.valueSpecs ?? []) {
    const names = (spec.names ?? []).length > 0 ? spec.names : [`__tsgoValue${fallbackIndex++}`];
    for (const [index, name] of names.entries()) {
      const baseName = name === "_" ? `${localTsName(unit)}_${unitHash(unit)}_${blankIndex++}` : safeIdentifier(name);
      const localName = uniqueName(baseName, used);
      const inferredType = spec.inferredValueTypes?.[index] ?? spec.inferredValueTypes?.[0];
      const indexedType = context.valueTypeIndex.get(`${context.file.importPath}::${name}`);
      const valueType = spec.type
        ? tsType(spec.type, context, scopeForUnit(unit), unit)
        : inferredType
          ? tsType(inferredType, context, scopeForUnit(unit), unit)
          : indexedType
            ? tsType(indexedType, context, scopeForUnit(unit), unit)
            : inferValueType(spec.values?.[index] ?? spec.values?.[0], context, unit);
      lines.push(`export ${declarationKind} ${localName}: ${valueType} = undefined as never;`);
    }
  }
  if (lines.length === 0) {
    lines.push(`export ${declarationKind} ${localTsName(unit)}: never = undefined as never;`);
  }
  return lines.join("\n");
}

function renderObjectMembers(members, context, unit, ownerKind) {
  const scope = scopeForUnit(unit);
  const heritage = [];
  const lines = [];
  let embeddedIndex = 0;
  let blankIndex = 0;
  for (const member of members) {
    if (member.kind === "embeddedField" || member.kind === "embeddedInterface") {
      const embeddedType = tsType(member.typeExpr, context, scope, unit);
      lines.push(`  readonly __tsgoEmbedded${embeddedIndex++}?: ${embeddedType};`);
      continue;
    }
    if (member.kind === "method" && member.typeExpr?.kind === "func") {
      const params = renderParameters(member.typeExpr.parameters ?? [], context, scope, unit);
      const result = tsReturnType(member.typeExpr.results ?? [], context, scope, unit);
      lines.push(`  ${safePropertyName(member.name)}(${params.join(", ")}): ${result};`);
      continue;
    }
    const propertyName = member.name === "_" ? `__tsgoBlank${blankIndex++}` : member.name;
    const readonly = ownerKind === "struct" ? "" : "readonly ";
    lines.push(`  ${readonly}${safePropertyName(propertyName)}: ${tsType(member.typeExpr, context, scope, unit)};`);
  }
  return { heritage, members: lines };
}

function renderParameters(params, context, scope, unit, used = new Set()) {
  const output = [];
  let syntheticIndex = 0;
  for (const param of params) {
    const names = (param.names ?? []).length > 0 ? param.names : [`arg${syntheticIndex++}`];
    for (const name of names) {
      const paramName = uniqueName(safeParamName(name), used);
      const paramType = tsType(param.type, context, scope, unit);
      if (param.variadic) {
        output.push(`...${paramName}: ${restType(paramType)}`);
      } else {
        output.push(`${paramName}: ${paramType}`);
      }
    }
  }
  return output;
}

function tsReturnType(results, context, scope, unit) {
  const flattened = [];
  for (const result of results) {
    const names = (result.names ?? []).length > 0 ? result.names : [""];
    for (const _name of names) {
      flattened.push(tsType(result.type, context, scope, unit));
    }
  }
  if (flattened.length === 0) return "void";
  if (flattened.length === 1) return flattened[0];
  return `[${flattened.join(", ")}]`;
}

function restType(paramType) {
  const sliceMatch = /^GoSlice<(.+)>$/.exec(paramType);
  if (sliceMatch) return `${sliceMatch[1]}[]`;
  return `Array<${paramType}>`;
}

function renderTypeParameterList(typeParameters, context, unit, options = {}) {
  const seen = new Set();
  const rendered = [];
  for (const param of typeParameters) {
    if (!param?.name || seen.has(param.name)) continue;
    seen.add(param.name);
    const constraint = renderTypeParameterConstraint(param.constraint, context, unit);
    const defaultType = options.defaultUnknown ? " = unknown" : "";
    rendered.push(`${safeIdentifier(param.name)}${constraint}${defaultType}`);
  }
  return rendered.length > 0 ? `<${rendered.join(", ")}>` : "";
}

function renderTypeParameterConstraint(constraint, context, unit) {
  if (!constraint || constraint.text === "any") return "";
  if (constraint.text === "comparable") return ` extends ${useCompat(context, "GoComparable")}`;
  useCompat(context, "GoConstraint");
  return "";
}

function tsType(expr, context, scope, unit) {
  if (!expr) return "unknown";
  switch (expr.kind) {
    case "ident":
      return tsIdentType(expr.name, context, scope, unit);
    case "selector":
      return tsSelectorType(expr, context, scope, unit);
    case "pointer":
      return `${useCompat(context, "GoPtr")}<${tsType(expr.element, context, scope, unit)}>`;
    case "slice":
      return `${useCompat(context, "GoSlice")}<${tsType(expr.element, context, scope, unit)}>`;
    case "array":
      return `${useCompat(context, "GoArray")}<${tsType(expr.element, context, scope, unit)}, ${JSON.stringify(expr.length ?? "")}>`;
    case "map":
      return `${useCompat(context, "GoMap")}<${tsType(expr.key, context, scope, unit)}, ${tsType(expr.value, context, scope, unit)}>`;
    case "func":
      return tsFunctionType(expr, context, scope, unit);
    case "interface":
      return tsInlineInterface(expr.members ?? [], context, scope, unit);
    case "struct":
      return tsInlineStruct(expr.members ?? [], context, scope, unit);
    case "ellipsis":
      return `${useCompat(context, "GoSlice")}<${tsType(expr.element, context, scope, unit)}>`;
    case "instantiation":
      return tsInstantiationType(expr, context, scope, unit);
    case "paren":
      return tsType(expr.element, context, scope, unit);
    case "channel":
      return `${useCompat(context, "GoChan")}<${tsType(expr.element, context, scope, unit)}, ${JSON.stringify(expr.direction ?? "bidirectional")}>`;
    case "unary":
    case "binary":
      return `${useCompat(context, "GoConstraint")}<${JSON.stringify(expr.text)}>`;
    default:
      context.diagnostics.push({
        severity: "error",
        unitID: unit?.id ?? "",
        message: `unsupported Go type expression '${expr.kind}' (${expr.text})`,
      });
      return `${useCompat(context, "GoUnsupported")}<${JSON.stringify(expr.text ?? expr.kind)}>`;
  }
}

function tsIdentType(name, context, scope, unit) {
  if (!name) return "unknown";
  if (scope.typeParameters.has(name)) return safeIdentifier(name);
  const primitive = primitiveTypes.get(name);
  if (primitive) {
    if (primitive.source === "core") return useCore(context, primitive.name);
    if (primitive.source === "compat") return useCompat(context, primitive.name);
    return primitive.name;
  }
  if (context.localTypeNames.has(name)) return safeIdentifier(name);
  const resolved = resolvePackageSymbol(context, context.file.importPath, name, unit);
  if (resolved) return resolved;
  context.diagnostics.push({
    severity: "error",
    unitID: unit?.id ?? "",
    message: `unresolved package-local type '${name}' in ${context.file.path}`,
  });
  return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(`${context.file.importPath}.${name}`)}>`;
}

function tsSelectorType(expr, context, _scope, unit, typeArgs = []) {
  const importPath = context.importAliases.get(expr.package);
  if (!importPath) {
    const externalName = `${expr.package}.${expr.name}`;
    return tsExternalType(context, externalName, typeArgs, unit);
  }
  const standard = standardSelectorTypes.get(`${importPath}.${expr.name}`);
  if (standard) return useCompat(context, standard);
  if (importPath.startsWith(context.config.goModulePath)) {
    const resolved = resolvePackageSymbol(context, importPath, expr.name, unit);
    if (resolved) return resolved;
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `unresolved imported TS-Go type '${expr.name}' from ${importPath}`,
    });
    return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(`${importPath}.${expr.name}`)}>`;
  }
  return tsExternalType(context, `${importPath}.${expr.name}`, typeArgs, unit);
}

function tsInstantiationType(expr, context, scope, unit) {
  const args = (expr.typeArgs ?? []).map((arg) => tsType(arg, context, scope, unit));
  if (expr.element?.kind === "selector") {
    const selector = expr.element;
    const importPath = context.importAliases.get(selector.package);
    const standard = importPath ? standardSelectorTypes.get(`${importPath}.${selector.name}`) : undefined;
    if (!standard) return tsSelectorType(selector, context, scope, unit, args);
  }
  const base = tsType(expr.element, context, scope, unit);
  return `${base}<${args.join(", ")}>`;
}

function tsExternalType(context, goName, typeArgs, unit) {
  const facade = context.externalFacades.get(goName);
  if (!facade) {
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `external Go type '${goName}' was not assigned a generated facade`,
    });
    return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(goName)}>`;
  }
  if (facade.arity !== typeArgs.length) {
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `external Go type '${goName}' expected ${facade.arity} type argument(s), got ${typeArgs.length}`,
    });
  }
  const name = importExternalFacadeName(context, facade, unit);
  return typeArgs.length > 0 ? `${name}<${typeArgs.join(", ")}>` : name;
}

function tsFunctionType(expr, context, scope, unit) {
  const params = renderParameters(expr.parameters ?? [], context, scope, unit);
  const result = tsReturnType(expr.results ?? [], context, scope, unit);
  return `(${params.join(", ")}) => ${result}`;
}

function tsInlineInterface(members, context, scope, unit) {
  if (members.length === 0) return "unknown";
  const lines = [];
  for (const member of members) {
    if (member.kind === "embeddedInterface") {
      lines.push(`readonly __tsgoEmbedded?: ${tsType(member.typeExpr, context, scope, unit)}`);
      continue;
    }
    if (member.kind === "method" && member.typeExpr?.kind === "func") {
      const params = renderParameters(member.typeExpr.parameters ?? [], context, scope, unit);
      const result = tsReturnType(member.typeExpr.results ?? [], context, scope, unit);
      lines.push(`${safePropertyName(member.name)}: (${params.join(", ")}) => ${result}`);
      continue;
    }
    lines.push(`${safePropertyName(member.name)}: ${tsType(member.typeExpr, context, scope, unit)}`);
  }
  return `{ ${lines.join("; ")} }`;
}

function tsInlineStruct(members, context, scope, unit) {
  if (members.length === 0) return "{ readonly __tsgoEmpty?: never }";
  return `{ ${members.map((member, index) => {
    const name = member.kind === "embeddedField" ? `__tsgoEmbedded${index}` : member.name;
    return `${safePropertyName(name)}: ${tsType(member.typeExpr, context, scope, unit)}`;
  }).join("; ")} }`;
}

function inferValueType(value, context, unit) {
  if (value === undefined || value === "") return "unknown";
  if (/^".*"$|^`[\s\S]*`$/.test(value)) return "string";
  if (/^(true|false)$/.test(value)) return useCore(context, "bool");
  if (/^[+-]?(?:\d|\.\d)/.test(value) || value === "iota") return useCore(context, "int");
  const identifierMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)$/.exec(value);
  if (identifierMatch) {
    const inferred = context.valueTypeIndex.get(`${context.file.importPath}::${identifierMatch[1]}`);
    if (inferred) return tsType(inferred, context, scopeForUnit(unit), unit);
  }
  const conversionMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/.exec(value);
  if (conversionMatch && context.symbolIndex.has(`${context.file.importPath}::${conversionMatch[1]}`)) {
    return tsType({ kind: "ident", name: conversionMatch[1], text: conversionMatch[1] }, context, scopeForUnit(unit), unit);
  }
  return "unknown";
}

function topLevelNamesForUnit(unit) {
  if (unit.kind === "type" || unit.kind === "func" || unit.kind === "method") return [localTsName(unit), safeIdentifier(unit.name)];
  if (unit.kind === "constGroup" || unit.kind === "varGroup") {
    const names = [];
    for (const spec of unit.valueSpecs ?? []) {
      for (const name of spec.names ?? []) {
        if (name !== "_") names.push(safeIdentifier(name));
      }
    }
    return names.length > 0 ? names : [localTsName(unit)];
  }
  return [localTsName(unit)];
}

function uniqueName(name, used) {
  const base = name === "" ? "arg" : name;
  let candidate = base;
  let index = 0;
  while (used.has(candidate)) {
    candidate = `${base}${++index}`;
  }
  used.add(candidate);
  return candidate;
}

function uniqueImportAlias(exportName, unit, targetPath = "") {
  const hash = createHash("sha256").update(`${unit?.id ?? ""}:${targetPath}:${exportName}`).digest("hex").slice(0, 8);
  return `${exportName}_${hash}`;
}

function isImportAliasUsed(context, alias) {
  for (const names of context.imports.values()) {
    for (const existing of names.values()) {
      if (existing === alias) return true;
    }
  }
  return false;
}

function unitHash(unit) {
  return createHash("sha256").update(unit?.id ?? "").digest("hex").slice(0, 8);
}

function scopeForUnit(unit) {
  return {
    typeParameters: new Set([
      ...(unit.typeParameters ?? []),
      ...(unit.typeParameterDetails ?? []).map((param) => param.name),
      ...receiverTypeParameterDetails(unit.receiverType).map((param) => param.name),
    ]),
  };
}

function receiverTypeParameterDetails(receiverType) {
  const details = [];
  const seen = new Set();
  for (const name of collectReceiverTypeParameterNames(receiverType)) {
    if (primitiveTypes.has(name) || seen.has(name)) continue;
    seen.add(name);
    details.push({ name });
  }
  return details;
}

function collectReceiverTypeParameterNames(expr) {
  if (!expr) return [];
  if (expr.kind === "pointer") return collectReceiverTypeParameterNames(expr.element);
  if (expr.kind === "instantiation") return (expr.typeArgs ?? []).flatMap((arg) => collectTypeIdentifiers(arg));
  return [];
}

function collectTypeIdentifiers(expr) {
  if (!expr) return [];
  if (expr.kind === "ident") return [expr.name];
  return [
    ...collectTypeIdentifiers(expr.element),
    ...collectTypeIdentifiers(expr.key),
    ...collectTypeIdentifiers(expr.value),
    ...collectTypeIdentifiers(expr.left),
    ...collectTypeIdentifiers(expr.right),
    ...(expr.typeArgs ?? []).flatMap((arg) => collectTypeIdentifiers(arg)),
  ];
}

function resolvePackageSymbol(context, importPath, name, unit) {
  const symbol = context.symbolIndex.get(`${importPath}::${name}`);
  if (!symbol) return undefined;
  if (!symbol.active) return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(symbol.goName)}>`;
  if (symbol.targetPath === context.relativeTargetPath) return safeIdentifier(symbol.exportName);
  const alias = importTypeName(context, symbol.targetPath, symbol.exportName, unit);
  return alias;
}

function importTypeName(context, targetPath, exportName, unit) {
  const source = relativeImportPath(context.relativeTargetPath, targetPath);
  const names = context.imports.get(source) ?? new Map();
  context.imports.set(source, names);
  const safeExport = safeIdentifier(exportName);
  const existing = names.get(safeExport);
  if (existing) return existing;
  const alias = context.localTopLevelNames.has(safeExport) || isImportAliasUsed(context, safeExport)
    ? uniqueImportAlias(safeExport, unit, targetPath)
    : safeExport;
  names.set(safeExport, alias);
  return alias;
}

function renderImports(context) {
  const lines = [];
  if (context.coreImports.size > 0) {
    lines.push(`import type { ${[...context.coreImports].sort().join(", ")} } from "${relativeImportPath(context.relativeTargetPath, `${context.config.tsRoot}/go/scalars.ts`)}";`);
  }
  if (context.compatImports.size > 0) {
    lines.push(`import type { ${[...context.compatImports].sort().join(", ")} } from "${relativeImportPath(context.relativeTargetPath, `${context.config.tsRoot}/go/compat.ts`)}";`);
  }
  for (const [source, names] of [...context.imports.entries()].sort()) {
    const specifiers = [...names.entries()]
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([exportName, alias]) => exportName === alias ? exportName : `${exportName} as ${alias}`)
      .join(", ");
    lines.push(`import type { ${specifiers} } from "${source}";`);
  }
  return lines.length > 0 ? `${lines.join("\n")}\n\n` : "";
}

function useCore(context, name) {
  context.coreImports.add(name);
  return name;
}

function useCompat(context, name) {
  context.compatImports.add(name);
  return name;
}

function importExternalFacadeName(context, policy, unit) {
  if (!policy.tsModule || !policy.tsName) {
    context.diagnostics.push({
      severity: "error",
      unitID: unit?.id ?? "",
      message: `external type policy for '${policy.goName}' must specify tsModule and tsName`,
    });
    return `${useCompat(context, "GoUnresolved")}<${JSON.stringify(policy.goName)}>`;
  }
  if (`${context.config.tsRoot}/${policy.tsModule}` === context.relativeTargetPath) return safeIdentifier(policy.tsName);
  return importTypeName(context, `${context.config.tsRoot}/${policy.tsModule}`, policy.tsName, unit);
}

function buildSymbolIndex(config, snapshot, largeFileSplits = undefined) {
  const index = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "type") continue;
      const policy = policyForUnit(config, unit, file);
      index.set(`${file.importPath}::${unit.name}`, {
        exportName: safeIdentifier(unit.name),
        targetPath: expectedTsPath(config, unit, largeFileSplits),
        active: isActivePortPolicy(policy),
        goName: `${file.importPath}.${unit.name}`,
      });
    }
  }
  return index;
}

function buildValueTypeIndex(config, snapshot, largeFileSplits = undefined) {
  const symbolIndex = buildSymbolIndex(config, snapshot, largeFileSplits);
  const index = new Map();
  const pending = [];
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (unit.kind !== "constGroup" && unit.kind !== "varGroup") continue;
      for (const spec of unit.valueSpecs ?? []) {
        const names = spec.names ?? [];
        for (const [position, name] of names.entries()) {
          if (!name || name === "_") continue;
          const key = `${file.importPath}::${name}`;
          const directType = spec.type ?? spec.inferredValueTypes?.[position] ?? spec.inferredValueTypes?.[0];
          if (directType) {
            index.set(key, directType);
            continue;
          }
          pending.push({
            key,
            importPath: file.importPath,
            value: spec.values?.[position] ?? spec.values?.[0] ?? "",
          });
        }
      }
    }
  }

  let changed = true;
  for (let pass = 0; changed && pass < 8; pass++) {
    changed = false;
    for (const item of pending) {
      if (index.has(item.key)) continue;
      const resolved = resolveValueTypeFromText(item.value, item.importPath, index, symbolIndex);
      if (!resolved) continue;
      index.set(item.key, resolved);
      changed = true;
    }
  }
  return index;
}

function resolveValueTypeFromText(value, importPath, valueTypeIndex, symbolIndex) {
  const text = String(value ?? "").trim();
  const identifierMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)$/.exec(text);
  if (identifierMatch) {
    return valueTypeIndex.get(`${importPath}::${identifierMatch[1]}`);
  }
  const conversionMatch = /^([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/.exec(text);
  if (conversionMatch && symbolIndex.has(`${importPath}::${conversionMatch[1]}`)) {
    return { kind: "ident", name: conversionMatch[1], text: conversionMatch[1] };
  }
  return undefined;
}

function importAliasMap(imports) {
  const aliases = new Map();
  for (const item of imports) {
    if (item.name === "_" || item.name === ".") continue;
    const alias = item.name || path.basename(item.path);
    aliases.set(alias, item.path);
  }
  return aliases;
}

function relativeImportPath(fromTsPath, toTsPath) {
  let relative = path.posix.relative(path.posix.dirname(fromTsPath), toTsPath.replace(/\.ts$/, ".js"));
  if (!relative.startsWith(".")) relative = `./${relative}`;
  return relative;
}

function fileFromUnit(unit) {
  const goPath = unit?.metadata?.goPath ?? "unknown/unknown.go";
  return {
    path: goPath,
    importPath: `github.com/microsoft/typescript-go/${path.posix.dirname(goPath)}`,
    packageName: "",
    imports: [],
    units: unit ? [unit] : [],
  };
}

function unitsByIDMap(snapshot) {
  const map = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) map.set(unit.id, unit);
  }
  return map;
}

function skeletonTsConfig() {
  return {
    compilerOptions: {
      target: "ES2024",
      module: "NodeNext",
      moduleResolution: "NodeNext",
      strict: true,
      noUncheckedIndexedAccess: true,
      exactOptionalPropertyTypes: true,
      verbatimModuleSyntax: true,
      skipLibCheck: true,
      preserveSymlinks: true,
      types: ["node"],
    },
    include: ["src/**/*.ts"],
  };
}

function writeExternalFacades(config, snapshot, options) {
  const outRoot = resolveRepo(options.out ?? config.tsRoot);
  const artifacts = renderExpectedGeneratedArtifacts(config, snapshot);
  const sourceRootPrefix = `${config.tsRoot.replace(/\/$/, "")}/`;
  let count = 0;
  for (const [repoRelativePath, text] of artifacts) {
    const relativeUnderSource = repoRelativePath.startsWith(sourceRootPrefix)
      ? repoRelativePath.slice(sourceRootPrefix.length)
      : repoRelativePath;
    writeTextSafely(path.join(outRoot, relativeUnderSource), text, {
      force: options.force === true,
      label: "generated Go facade",
    });
    count++;
  }
  console.log(`generated ${count} Go compatibility/facade file(s) under ${path.relative(repoRoot, outRoot)}`);
}

export function renderExpectedGeneratedArtifacts(config, snapshot) {
  const artifacts = new Map();
  const sourceRootPrefix = config.tsRoot.replace(/\/$/, "");
  const scalarsBody = renderGoScalarsModule();
  artifacts.set(
    `${sourceRootPrefix}/go/scalars.ts`,
    renderGeneratedArtifact(snapshot, "go/scalars.ts", "go-scalars", scalarsBody),
  );
  const compatBody = renderGoCompatModule();
  artifacts.set(
    `${sourceRootPrefix}/go/compat.ts`,
    renderGeneratedArtifact(snapshot, "go/compat.ts", "go-compat", compatBody),
  );
  for (const [relativePath, body] of renderExternalFacadeModules(config, snapshot)) {
    artifacts.set(
      `${sourceRootPrefix}/${relativePath}`,
      renderGeneratedArtifact(snapshot, relativePath, "go-facade", body),
    );
  }
  // Authored facade modules are excluded from the generated set: porter:facades must
  // not regenerate or overwrite them, and they are not checked against deterministic
  // generated output. Their faithful Go-semantics bodies are hand-authored.
  for (const authoredPath of authoredFacadePathSet(config)) {
    artifacts.delete(authoredPath);
  }
  return new Map([...artifacts.entries()].sort(([left], [right]) => left.localeCompare(right)));
}

function renderGeneratedArtifact(snapshot, relativePath, kind, body) {
  const normalizedBody = body.replace(/\s*$/, "\n");
  const metadata = {
    schemaVersion: 1,
    kind,
    generator: "porter:facades",
    sourceRevision: snapshot.gitRevision,
    path: relativePath,
    contentHash: hashText(normalizedBody),
  };
  return [
    "// Code generated by TSTS porter. DO NOT EDIT.",
    `// @tsgo-generated ${JSON.stringify(metadata)}`,
    "",
    normalizedBody,
  ].join("\n");
}

function stripGeneratedArtifactHeader(text) {
  return text.replace(/^\/\/ Code generated by TSTS porter\. DO NOT EDIT\.\r?\n\/\/ @tsgo-generated {[^}\r\n]+}\r?\n\r?\n/, "");
}

export function renderExternalFacadeModules(config, snapshot) {
  const facades = buildExternalFacadeMap(config, snapshot);
  const groups = new Map();
  for (const facade of facades.values()) {
    if (!facade.tsModule || !facade.tsName) fail(`external facade for ${facade.goName} must include tsModule and tsName`);
    const group = groups.get(facade.tsModule) ?? [];
    group.push(facade);
    groups.set(facade.tsModule, group);
  }

  const output = new Map();
  for (const [tsModule, policies] of [...groups.entries()].sort(([left], [right]) => left.localeCompare(right))) {
    const relativeTargetPath = `${config.tsRoot}/${tsModule}`;
    const context = facadeRendererContext(config, relativeTargetPath, policies, facades);
    const body = policies
      .slice()
      .sort((left, right) => left.tsName.localeCompare(right.tsName))
      .map((policy) => renderExternalFacadePolicy(policy, context))
      .join("\n\n");
    output.set(tsModule, `${renderImports(context)}${body}\n`);
  }
  return output;
}

function facadeRendererContext(config, relativeTargetPath, policies, facades) {
  return {
    config,
    snapshot: { files: [] },
    symbolIndex: new Map(),
    valueTypeIndex: new Map(),
    file: { path: relativeTargetPath, importPath: "", imports: [] },
    relativeTargetPath,
    imports: new Map(),
    coreImports: new Set(),
    compatImports: new Set(),
    diagnostics: [],
    localTypeNames: new Set(policies.map((policy) => policy.tsName)),
    localTopLevelNames: new Set(policies.map((policy) => policy.tsName)),
    importAliases: new Map(),
    externalFacades: facades,
  };
}

function renderExternalFacadePolicy(policy, context) {
  const typeParameters = renderExternalTypeParameters(facadeTypeParameters(policy));
  if (policy.kind === "class") {
    const members = renderExternalMembers(policy, context);
    return `export class ${safeIdentifier(policy.tsName)}${typeParameters} {\n${members.length > 0 ? members.join("\n") : "  readonly __tsgoEmpty?: never;"}\n}`;
  }
  if (policy.kind === "interface" || policy.kind === "opaque") {
    const heritage = (policy.extends ?? []).map((goName) => {
      const parent = context.externalFacades.get(goName);
      if (!parent) fail(`external type policy ${policy.goName} extends unknown facade ${goName}`);
      return importExternalFacadeName(context, parent, { id: `external-facade:${policy.goName}` });
    });
    const extendsClause = heritage.length > 0 ? ` extends ${heritage.join(", ")}` : "";
    const members = renderExternalMembers(policy, context);
    const fallback = policy.kind === "opaque"
      ? `  readonly __goFacadeName: ${JSON.stringify(policy.goName)};`
      : "  readonly __tsgoEmpty?: never;";
    return `export interface ${safeIdentifier(policy.tsName)}${typeParameters}${extendsClause} {\n${members.length > 0 ? members.join("\n") : fallback}\n}`;
  }
  if (policy.kind === "function") {
    const params = renderParameters(policy.parameters ?? [], context, facadeScope(policy), { id: `external-facade:${policy.goName}` });
    const result = tsReturnType(policy.results ?? [], context, facadeScope(policy), { id: `external-facade:${policy.goName}` });
    return `export type ${safeIdentifier(policy.tsName)}${typeParameters} = (${params.join(", ")}) => ${result};`;
  }
  if (policy.kind === "functionValue") {
    return `export function ${safeIdentifier(policy.tsName)}(...args: Array<unknown>): unknown {\n  throw new globalThis.Error(${JSON.stringify(`TSGO_EXTERNAL_FACADE_UNIMPLEMENTED ${policy.goName}`)});\n}`;
  }
  if (policy.kind === "value") {
    if (policy.tsInitializer !== undefined && (typeof policy.tsInitializer !== "string" || policy.tsInitializer.trim() === "")) {
      throw new Error(`external value facade ${policy.goName} has an invalid tsInitializer`);
    }
    const initializer = policy.tsInitializer ?? "undefined as never";
    const annotation = policy.tsInitializer === undefined ? ": unknown" : "";
    return `export const ${safeIdentifier(policy.tsName)}${annotation} = ${initializer};`;
  }
  if (policy.kind === "type") {
    const expression = policy.typeExpression
      ? tsType(policy.typeExpression, context, facadeScope(policy), { id: `external-facade:${policy.goName}` })
      : `${useCompat(context, "GoUnresolved")}<${JSON.stringify(policy.goName)}>`;
    return `export type ${safeIdentifier(policy.tsName)}${typeParameters} = ${expression};`;
  }
  fail(`unsupported external facade kind '${policy.kind}' for ${policy.goName}`);
}

function renderExternalMembers(policy, context) {
  const scope = facadeScope(policy);
  return (policy.members ?? []).map((member) => {
    if (member.kind !== "method") fail(`unsupported external facade member kind '${member.kind}' for ${policy.goName}`);
    const params = renderParameters(member.parameters ?? [], context, scope, { id: `external-facade:${policy.goName}` });
    const result = tsReturnType(member.results ?? [], context, scope, { id: `external-facade:${policy.goName}` });
    if (policy.kind === "class") {
      return `  ${safePropertyName(member.name)}(${params.join(", ")}): ${result} {\n    throw new globalThis.Error(${JSON.stringify(`TSGO_EXTERNAL_FACADE_UNIMPLEMENTED ${policy.goName}.${member.name}`)});\n  }`;
    }
    return `  ${safePropertyName(member.name)}(${params.join(", ")}): ${result};`;
  });
}

function renderExternalTypeParameters(typeParameters) {
  return typeParameters.length > 0 ? `<${typeParameters.map((param) => safeIdentifier(param)).join(", ")}>` : "";
}

function facadeScope(policy) {
  return { typeParameters: new Set(facadeTypeParameters(policy)) };
}

function facadeTypeParameters(policy) {
  if (policy.typeParameters?.length) return policy.typeParameters;
  return Array.from({ length: policy.arity ?? 0 }, (_value, index) => `T${index}`);
}

export function buildExternalFacadeMap(config, snapshot) {
  const facades = new Map();
  for (const policy of knownExternalFacadePolicies()) {
    addExternalFacade(facades, policy);
  }
  for (const policy of config.externalFacadePolicies ?? []) {
    addExternalFacade(facades, normalizeExternalFacadePolicy(policy));
  }
  for (const usage of collectExternalTypeUsages(config, snapshot)) {
    const existing = facades.get(usage.goName);
    if (existing) {
      if (existing.arity !== usage.arity) {
        fail(`external facade arity mismatch for ${usage.goName}: configured ${existing.arity}, observed ${usage.arity}`);
      }
      continue;
    }
    addExternalFacade(facades, autoExternalFacadePolicy(usage));
  }
  for (const usage of collectExternalRefUsages(config, snapshot)) {
    addOrMergeExternalFacade(facades, autoExternalRefFacadePolicy(usage));
  }
  return facades;
}

function addExternalFacade(facades, policy) {
  if (!policy.goName) fail("external facade policy must include goName");
  if (facades.has(policy.goName)) fail(`duplicate external facade policy for ${policy.goName}`);
  facades.set(policy.goName, policy);
}

function addOrMergeExternalFacade(facades, policy) {
  if (!policy.goName) fail("external facade policy must include goName");
  const existing = facades.get(policy.goName);
  if (!existing) {
    facades.set(policy.goName, policy);
    return;
  }
  if (existing.generated && existing.kind === "value" && policy.kind === "functionValue") {
    facades.set(policy.goName, policy);
  }
}

function collectExternalTypeUsages(config, snapshot) {
  const usages = new Map();
  const symbolIndex = buildSymbolIndex(config, snapshot);
  for (const file of snapshot.files ?? []) {
    const aliases = importAliasMap(file.imports ?? []);
    for (const unit of file.units ?? []) {
      collectExternalTypesFromUnit(config, symbolIndex, aliases, file.importPath, unit, usages);
    }
  }
  return [...usages.values()].sort((left, right) => left.goName.localeCompare(right.goName));
}

function collectExternalTypesFromUnit(config, symbolIndex, aliases, currentImportPath, unit, usages) {
  visitTypeExpr(unit.receiverType);
  visitTypeExpr(unit.typeExpression);
  for (const param of unit.typeParameterDetails ?? []) visitTypeExpr(param.constraint);
  for (const param of unit.parameters ?? []) visitTypeExpr(param.type);
  for (const result of unit.results ?? []) visitTypeExpr(result.type);
  for (const spec of unit.valueSpecs ?? []) visitTypeExpr(spec.type);
  for (const member of unit.members ?? []) visitTypeExpr(member.typeExpr);

  function visitTypeExpr(expr) {
    if (!expr) return;
    if (expr.kind === "selector") {
      const goName = externalGoNameForSelector(config, symbolIndex, aliases, currentImportPath, expr);
      if (goName) recordExternalUsage(usages, goName, 0);
    }
    if (expr.kind === "instantiation") {
      if (expr.element?.kind === "selector") {
        const goName = externalGoNameForSelector(config, symbolIndex, aliases, currentImportPath, expr.element);
        if (goName) recordExternalUsage(usages, goName, expr.typeArgs?.length ?? 0);
      }
    }
    visitTypeExpr(expr.element);
    visitTypeExpr(expr.key);
    visitTypeExpr(expr.value);
    visitTypeExpr(expr.left);
    visitTypeExpr(expr.right);
    for (const arg of expr.typeArgs ?? []) visitTypeExpr(arg);
    for (const param of expr.parameters ?? []) visitTypeExpr(param.type);
    for (const result of expr.results ?? []) visitTypeExpr(result.type);
    for (const member of expr.members ?? []) visitTypeExpr(member.typeExpr);
  }
}

function externalGoNameForSelector(config, symbolIndex, aliases, currentImportPath, expr) {
  const importPath = aliases.get(expr.package);
  if (!importPath) return `${expr.package}.${expr.name}`;
  if (standardSelectorTypes.has(`${importPath}.${expr.name}`)) return undefined;
  if (importPath.startsWith(config.goModulePath)) {
    return symbolIndex.has(`${importPath}::${expr.name}`) ? undefined : `${importPath}.${expr.name}`;
  }
  return `${importPath}.${expr.name}`;
}

function recordExternalUsage(usages, goName, arity) {
  const existing = usages.get(goName);
  if (existing) {
    if (existing.arity !== arity) {
      fail(`external type '${goName}' used with both ${existing.arity} and ${arity} type argument(s)`);
    }
    existing.count++;
    return;
  }
  usages.set(goName, { goName, arity, count: 1 });
}

function collectExternalRefUsages(config, snapshot) {
  const usages = new Map();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      for (const ref of unit.externalRefs ?? []) {
        if (!ref.importPath || ref.importPath.startsWith(config.goModulePath)) continue;
        const goName = `${ref.importPath}.${ref.name}`;
        const role = ref.role === "call" ? "call" : "value";
        const existing = usages.get(goName);
        if (existing) {
          existing.count += ref.count ?? 1;
          if (role === "call") existing.role = "call";
          continue;
        }
        usages.set(goName, { goName, role, count: ref.count ?? 1 });
      }
    }
  }
  return [...usages.values()].sort((left, right) => left.goName.localeCompare(right.goName));
}

function autoExternalFacadePolicy(usage) {
  const { importPath, name } = splitExternalGoName(usage.goName);
  return {
    goName: usage.goName,
    tsModule: externalFacadeModulePath(importPath),
    tsName: safeIdentifier(name),
    kind: "opaque",
    arity: usage.arity,
    generated: true,
  };
}

function autoExternalRefFacadePolicy(usage) {
  const { importPath, name } = splitExternalGoName(usage.goName);
  return {
    goName: usage.goName,
    tsModule: externalFacadeModulePath(importPath),
    tsName: safeIdentifier(name),
    kind: usage.role === "call" ? "functionValue" : "value",
    arity: 0,
    generated: true,
  };
}

function normalizeExternalFacadePolicy(policy) {
  const { importPath, name } = splitExternalGoName(policy.goName);
  const normalized = {
    tsModule: externalFacadeModulePath(importPath),
    tsName: safeIdentifier(name),
    kind: "opaque",
    arity: 0,
    ...policy,
  };
  if (normalized.tsInitializer !== undefined && normalized.kind !== "value") {
    throw new Error(`external facade ${normalized.goName} may declare tsInitializer only when kind is 'value'`);
  }
  return normalized;
}

function splitExternalGoName(goName) {
  const index = goName.lastIndexOf(".");
  if (index <= 0 || index === goName.length - 1) fail(`invalid external Go type name '${goName}'`);
  return { importPath: goName.slice(0, index), name: goName.slice(index + 1) };
}

function externalFacadeModulePath(importPath) {
  return `go/${importPath.split("/").map((segment) => safePathSegment(segment)).join("/")}.ts`;
}

function safePathSegment(segment) {
  return String(segment)
    .replace(/[^A-Za-z0-9._-]/g, "_")
    .replace(/^([.])/, "_$1") || "_";
}

function knownExternalFacadePolicies() {
  const byteSlice = { kind: "slice", text: "[]byte", element: { kind: "ident", name: "byte", text: "byte" } };
  const intType = { kind: "ident", name: "int", text: "int" };
  const int64Type = { kind: "ident", name: "int64", text: "int64" };
  const errorType = { kind: "ident", name: "error", text: "error" };
  const boolType = { kind: "ident", name: "bool", text: "bool" };
  const stringType = { kind: "ident", name: "string", text: "string" };

  return [
    {
      goName: "io.Writer",
      tsModule: "go/io.ts",
      tsName: "Writer",
      kind: "interface",
      arity: 0,
      members: [{ kind: "method", name: "Write", parameters: [{ names: ["p"], type: byteSlice }], results: [{ type: intType }, { type: errorType }] }],
    },
    {
      goName: "io.Reader",
      tsModule: "go/io.ts",
      tsName: "Reader",
      kind: "interface",
      arity: 0,
      members: [{ kind: "method", name: "Read", parameters: [{ names: ["p"], type: byteSlice }], results: [{ type: intType }, { type: errorType }] }],
    },
    { goName: "io.Closer", tsModule: "go/io.ts", tsName: "Closer", kind: "interface", arity: 0, members: [{ kind: "method", name: "Close", results: [{ type: errorType }] }] },
    { goName: "io.ReadCloser", tsModule: "go/io.ts", tsName: "ReadCloser", kind: "interface", arity: 0, extends: ["io.Reader", "io.Closer"] },
    { goName: "io.WriteCloser", tsModule: "go/io.ts", tsName: "WriteCloser", kind: "interface", arity: 0, extends: ["io.Writer", "io.Closer"] },
    { goName: "io.ReadWriter", tsModule: "go/io.ts", tsName: "ReadWriter", kind: "interface", arity: 0, extends: ["io.Reader", "io.Writer"] },
    { goName: "io.ReadWriteCloser", tsModule: "go/io.ts", tsName: "ReadWriteCloser", kind: "interface", arity: 0, extends: ["io.Reader", "io.Writer", "io.Closer"] },
    {
      goName: "context.Context",
      tsModule: "go/context.ts",
      tsName: "Context",
      kind: "interface",
      arity: 0,
      members: [
        { kind: "method", name: "Err", results: [{ type: errorType }] },
        { kind: "method", name: "Value", parameters: [{ names: ["key"], type: { kind: "ident", name: "any", text: "any" } }], results: [{ type: { kind: "ident", name: "any", text: "any" } }] },
      ],
    },
    { goName: "context.CancelFunc", tsModule: "go/context.ts", tsName: "CancelFunc", kind: "function", arity: 0 },
    { goName: "time.Time", tsModule: "go/time.ts", tsName: "Time", kind: "class", arity: 0 },
    { goName: "time.Duration", tsModule: "go/time.ts", tsName: "Duration", kind: "type", arity: 0, typeExpression: int64Type },
    { goName: "sync.Mutex", tsModule: "go/sync.ts", tsName: "Mutex", kind: "class", arity: 0, members: [{ kind: "method", name: "Lock" }, { kind: "method", name: "Unlock" }] },
    { goName: "sync.RWMutex", tsModule: "go/sync.ts", tsName: "RWMutex", kind: "class", arity: 0, members: [{ kind: "method", name: "Lock" }, { kind: "method", name: "Unlock" }, { kind: "method", name: "RLock" }, { kind: "method", name: "RUnlock" }] },
    { goName: "sync.Once", tsModule: "go/sync.ts", tsName: "Once", kind: "class", arity: 0, members: [{ kind: "method", name: "Do", parameters: [{ names: ["f"], type: { kind: "func", text: "func()", parameters: [], results: [] } }] }] },
    { goName: "sync.WaitGroup", tsModule: "go/sync.ts", tsName: "WaitGroup", kind: "class", arity: 0, members: [{ kind: "method", name: "Add", parameters: [{ names: ["delta"], type: intType }] }, { kind: "method", name: "Done" }, { kind: "method", name: "Wait" }] },
    { goName: "sync.Map", tsModule: "go/sync.ts", tsName: "Map", kind: "class", arity: 0 },
    ...["Bool", "Int32", "Int64", "Uint32", "Uint64"].map((name) => ({ goName: `sync/atomic.${name}`, tsModule: "go/sync/atomic.ts", tsName: name, kind: "class", arity: 0 })),
    { goName: "regexp.Regexp", tsModule: "go/regexp.ts", tsName: "Regexp", kind: "class", arity: 0, members: [{ kind: "method", name: "MatchString", parameters: [{ names: ["s"], type: stringType }], results: [{ type: boolType }] }] },
    { goName: "strings.Builder", tsModule: "go/strings.ts", tsName: "Builder", kind: "class", arity: 0, members: [{ kind: "method", name: "String", results: [{ type: stringType }] }] },
    { goName: "testing.T", tsModule: "go/testing.ts", tsName: "T", kind: "class", arity: 0 },
    { goName: "testing.B", tsModule: "go/testing.ts", tsName: "B", kind: "class", arity: 0 },
    { goName: "testing.M", tsModule: "go/testing.ts", tsName: "M", kind: "class", arity: 0 },
    { goName: "testing.TB", tsModule: "go/testing.ts", tsName: "TB", kind: "interface", arity: 0 },
  ];
}

function renderGoScalarsModule() {
  return `export type bool = boolean;
export type byte = number;
export type double = number;
export type float = number;
export type int = number;
export type long = number;
export type nint = number;
export type nuint = number;
export type sbyte = number;
export type short = number;
export type uint = number;
export type ulong = bigint;
export type ushort = number;
`;
}

function renderGoCompatModule() {
  return `import type { bool, int } from "./scalars.js";

declare const __goBrand: unique symbol;

export type GoPtr<T> = T | undefined;
export type GoRef<T> = { v: T };
export type GoSlice<T> = T[];
export type GoArray<T, Length extends string> = T[] & { readonly [__goBrand]?: { readonly length: Length } };
export type GoMap<K, V> = Map<K, V>;
export type GoChan<T, Direction extends string = "bidirectional"> = {
  readonly [__goBrand]?: { readonly element: T; readonly direction: Direction };
  readonly [goChannelState]?: GoChannelState<T>;
};
export type GoSeq<T> = (yieldValue: (value: T) => bool) => void;
export type GoSeq2<K, V> = (yieldValue: (key: K, value: V) => bool) => void;
export type GoError = Error | undefined;
export type GoComparable = unknown;
export type GoOrdered = string | number | bigint | bool;
export type GoConstraint<Text extends string> = unknown;
export type GoUnresolved<Name extends string> = { readonly [__goBrand]: { readonly unresolved: Name } };
export type GoUnsupported<Text extends string> = { readonly [__goBrand]: { readonly unsupported: Text } };
export type GoComplex64 = { readonly real: number; readonly imag: number };
export type GoComplex128 = { readonly real: number; readonly imag: number };
export type GoUnsafePointer = GoPtr<unknown>;
export type GoRune = int;

type GoChannelReceiver<T> = (value: T, ok: bool) => void;

interface GoChannelWaiter<T> {
  active: bool;
  deliver(value: T, ok: bool): bool;
}

interface GoChannelState<T> {
  capacity: number;
  queue: T[];
  waiters: GoChannelWaiter<T>[];
  closed: bool;
  zeroValue(): T;
}

export interface GoChanSelectCase {
  readonly channel: GoChan<unknown, string>;
  readonly receiver: GoChannelReceiver<unknown>;
}

const goChannelState: unique symbol = Symbol("GoChannel.state");

export function MakeGoChan<T>(capacity = 0, zeroValue: () => T = (): T => undefined as T): GoChan<T> {
  if (!Number.isSafeInteger(capacity) || capacity < 0) {
    throw new RangeError("makechan: size out of range");
  }
  return {
    [goChannelState]: {
      capacity,
      queue: [],
      waiters: [],
      closed: false,
      zeroValue,
    },
  };
}

export function GoChanAsReceive<T>(channel: GoChan<T>): GoChan<T, "receive"> {
  return channel as unknown as GoChan<T, "receive">;
}

export function GoChanAsSend<T>(channel: GoChan<T>): GoChan<T, "send"> {
  return channel as unknown as GoChan<T, "send">;
}

export function GoChanTrySend<T>(channel: GoChan<T, string>, value: T): bool {
  const state = requireGoChannelState(channel);
  if (state.closed) {
    throw new Error("send on closed channel");
  }
  const waiter = takeGoChannelWaiter(state);
  if (waiter !== undefined) {
    return waiter.deliver(value, true as bool);
  }
  if (state.queue.length < state.capacity) {
    state.queue.push(value);
    return true as bool;
  }
  return false as bool;
}

export function GoChanReceive<T>(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>): () => void {
  const state = requireGoChannelState(channel);
  if (goChannelReceiveReady(state)) {
    const [value, ok] = takeGoChannelReadyValue(state);
    queueMicrotask(() => receiver(value, ok));
    return () => {};
  }
  const waiter: GoChannelWaiter<T> = {
    active: true,
    deliver(value, ok) {
      queueMicrotask(() => receiver(value, ok));
      return true as bool;
    },
  };
  state.waiters.push(waiter);
  return () => {
    waiter.active = false;
  };
}

export function GoChanSelectReceive<T>(channel: GoChan<T, string>, receiver: GoChannelReceiver<T>): GoChanSelectCase {
  return {
    channel: channel as GoChan<unknown, string>,
    receiver: receiver as GoChannelReceiver<unknown>,
  };
}

export function GoChanSelect(cases: readonly GoChanSelectCase[]): () => void {
  const ready = [] as number[];
  for (let index = 0; index < cases.length; index++) {
    if (goChannelReceiveReady(requireGoChannelState(cases[index]!.channel))) ready.push(index);
  }
  if (ready.length > 0) {
    const selectedIndex = ready.length === 1 ? ready[0]! : ready[Math.floor(Math.random() * ready.length)]!;
    const selected = cases[selectedIndex]!;
    const [value, ok] = takeGoChannelReadyValue(requireGoChannelState(selected.channel));
    queueMicrotask(() => selected.receiver(value, ok));
    return () => {};
  }

  let active = true;
  const waiters: Array<GoChannelWaiter<unknown>> = [];
  const cancel = (): void => {
    if (!active) return;
    active = false;
    for (const waiter of waiters) waiter.active = false;
  };
  for (const selectCase of cases) {
    const waiter: GoChannelWaiter<unknown> = {
      active: true,
      deliver(value, ok) {
        if (!active) return false as bool;
        active = false;
        for (const other of waiters) other.active = false;
        queueMicrotask(() => selectCase.receiver(value, ok));
        return true as bool;
      },
    };
    waiters.push(waiter);
    requireGoChannelState(selectCase.channel).waiters.push(waiter);
  }
  return cancel;
}

export function GoChanClose<T>(channel: GoChan<T, string>): void {
  const state = requireGoChannelState(channel);
  if (state.closed) {
    throw new Error("close of closed channel");
  }
  state.closed = true;
  while (state.queue.length > 0) {
    const waiter = takeGoChannelWaiter(state);
    if (waiter === undefined) {
      break;
    }
    const value = state.queue.shift()!;
    waiter.deliver(value, true as bool);
  }
  let waiter: GoChannelWaiter<T> | undefined;
  while ((waiter = takeGoChannelWaiter(state)) !== undefined) {
    waiter.deliver(state.zeroValue(), false as bool);
  }
}

function requireGoChannelState<T>(channel: GoChan<T, string>): GoChannelState<T> {
  const state = channel[goChannelState];
  if (state === undefined) {
    throw new Error("channel has no runtime state");
  }
  return state;
}

function takeGoChannelWaiter<T>(state: GoChannelState<T>): GoChannelWaiter<T> | undefined {
  while (state.waiters.length > 0) {
    const waiter = state.waiters.shift()!;
    if (waiter.active) {
      waiter.active = false;
      return waiter;
    }
  }
  return undefined;
}

function goChannelReceiveReady<T>(state: GoChannelState<T>): bool {
  return (state.queue.length > 0 || state.closed) as bool;
}

function takeGoChannelReadyValue<T>(state: GoChannelState<T>): [T, bool] {
  if (state.queue.length > 0) return [state.queue.shift()!, true as bool];
  if (state.closed) return [state.zeroValue(), false as bool];
  throw new Error("receive from channel that is not ready");
}

const goObjectIds = new WeakMap<object, number>();
let nextGoObjectId = 1;

export class GoStructMap<K, V> implements Map<K, V> {
  readonly [Symbol.toStringTag] = "Map";
  private readonly entriesByKey = new globalThis.Map<string, { key: K; value: V }>();

  get size(): number {
    return this.entriesByKey.size;
  }

  clear(): void {
    this.entriesByKey.clear();
  }

  delete(key: K): boolean {
    return this.entriesByKey.delete(goStructMapKey(key));
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: unknown): void {
    for (const entry of this.entriesByKey.values()) {
      callbackfn.call(thisArg, entry.value, entry.key, this as unknown as Map<K, V>);
    }
  }

  get(key: K): V | undefined {
    return this.entriesByKey.get(goStructMapKey(key))?.value;
  }

  getOrInsert(key: K, value: V): V {
    const keyText = goStructMapKey(key);
    const existing = this.entriesByKey.get(keyText);
    if (existing !== undefined) {
      return existing.value;
    }
    this.entriesByKey.set(keyText, { key, value });
    return value;
  }

  getOrInsertComputed(key: K, callbackfn: (key: K) => V): V {
    const keyText = goStructMapKey(key);
    const existing = this.entriesByKey.get(keyText);
    if (existing !== undefined) {
      return existing.value;
    }
    const value = callbackfn(key);
    this.entriesByKey.set(keyText, { key, value });
    return value;
  }

  has(key: K): boolean {
    return this.entriesByKey.has(goStructMapKey(key));
  }

  set(key: K, value: V): this {
    this.entriesByKey.set(goStructMapKey(key), { key, value });
    return this;
  }

  load(key: K): [V | undefined, boolean] {
    const entry = this.entriesByKey.get(goStructMapKey(key));
    if (entry === undefined) {
      return [undefined, false];
    }
    return [entry.value, true];
  }

  loadOrStore(key: K, value: V): [V, boolean] {
    const keyText = goStructMapKey(key);
    const existing = this.entriesByKey.get(keyText);
    if (existing !== undefined) {
      return [existing.value, true];
    }
    this.entriesByKey.set(keyText, { key, value });
    return [value, false];
  }

  loadAndDelete(key: K): [V | undefined, boolean] {
    const keyText = goStructMapKey(key);
    const existing = this.entriesByKey.get(keyText);
    if (existing === undefined) {
      return [undefined, false];
    }
    this.entriesByKey.delete(keyText);
    return [existing.value, true];
  }

  *entries(): MapIterator<[K, V]> {
    for (const entry of this.entriesByKey.values()) {
      yield [entry.key, entry.value];
    }
  }

  *keys(): MapIterator<K> {
    for (const entry of this.entriesByKey.values()) {
      yield entry.key;
    }
  }

  *values(): MapIterator<V> {
    for (const entry of this.entriesByKey.values()) {
      yield entry.value;
    }
  }

  [Symbol.iterator](): MapIterator<[K, V]> {
    return this.entries();
  }
}

export function NewGoStructMap<K, V>(): GoStructMap<K, V> {
  return new GoStructMap<K, V>();
}

export function GoAppend<T>(slice: GoPtr<GoSlice<T>>, ...items: GoSlice<T>): GoSlice<T> {
  return [...(slice ?? []), ...items];
}

function goStructMapKey(value: unknown): string {
  return goValueKey(value, true);
}

function goValueKey(value: unknown, topLevelStruct: boolean): string {
  if (value === undefined || value === null) {
    return "nil";
  }
  const valueType = typeof value;
  switch (valueType) {
    case "boolean":
    case "number":
    case "bigint":
    case "string":
      return \`\${valueType}:\${String(value)}\`;
    case "symbol":
      return \`symbol:\${String(value)}\`;
    case "function":
      return \`ref:\${goObjectId(value)}\`;
    case "object":
      break;
    default:
      return \`\${valueType}:\${String(value)}\`;
  }

  const objectValue = value as Record<PropertyKey, unknown>;
  if (isUint128Like(objectValue)) {
    return \`u128:\${objectValue.Hi!.toString()}:\${objectValue.Lo!.toString()}\`;
  }
  if (!topLevelStruct) {
    if (isValueStruct(objectValue)) {
      return goStructFieldsKey(objectValue);
    }
    return \`ref:\${goObjectId(objectValue)}\`;
  }
  return goStructFieldsKey(objectValue);
}

function goStructFieldsKey(value: Record<PropertyKey, unknown>): string {
  if (globalThis.Array.isArray(value)) {
    let result = "array:[";
    for (let index = 0; index < value.length; index++) {
      if (index > 0) {
        result += ",";
      }
      result += goValueKey(value[index], false);
    }
    return result + "]";
  }
  const keys = globalThis.Object.keys(value).sort();
  let result = "struct:{";
  for (let index = 0; index < keys.length; index++) {
    if (index > 0) {
      result += ",";
    }
    const key = keys[index]!;
    result += \`\${key}=\${goValueKey(value[key], false)}\`;
  }
  return result + "}";
}

function isUint128Like(value: Record<PropertyKey, unknown>): boolean {
  return typeof value.Hi === "bigint" && typeof value.Lo === "bigint";
}

function isValueStruct(value: Record<PropertyKey, unknown>): boolean {
  if (isUint128Like(value)) {
    return true;
  }
  if (typeof value.Negative === "boolean" && typeof value.Base10Value === "string") {
    return true;
  }
  if (typeof value.pos === "number" && typeof value.end === "number") {
    return true;
  }
  return false;
}

function goObjectId(value: object): number {
  let id = goObjectIds.get(value);
  if (id === undefined) {
    id = nextGoObjectId++;
    goObjectIds.set(value, id);
  }
  return id;
}
`;
}

const primitiveTypes = new Map([
  ["any", { source: "inline", name: "unknown" }],
  ["bool", { source: "core", name: "bool" }],
  ["byte", { source: "core", name: "byte" }],
  ["complex64", { source: "compat", name: "GoComplex64" }],
  ["complex128", { source: "compat", name: "GoComplex128" }],
  ["error", { source: "compat", name: "GoError" }],
  ["float32", { source: "core", name: "float" }],
  ["float64", { source: "core", name: "double" }],
  ["int", { source: "core", name: "int" }],
  ["int8", { source: "core", name: "sbyte" }],
  ["int16", { source: "core", name: "short" }],
  ["int32", { source: "core", name: "int" }],
  ["int64", { source: "core", name: "long" }],
  ["rune", { source: "compat", name: "GoRune" }],
  ["string", { source: "inline", name: "string" }],
  ["uint", { source: "core", name: "uint" }],
  ["uint8", { source: "core", name: "byte" }],
  ["uint16", { source: "core", name: "ushort" }],
  ["uint32", { source: "core", name: "uint" }],
  ["uint64", { source: "core", name: "ulong" }],
  ["uintptr", { source: "core", name: "nuint" }],
  ["unsafe.Pointer", { source: "compat", name: "GoUnsafePointer" }],
]);

const standardSelectorTypes = new Map([
  ["cmp.Ordered", "GoOrdered"],
  ["constraints.Ordered", "GoOrdered"],
  ["iter.Seq", "GoSeq"],
  ["iter.Seq2", "GoSeq2"],
  ["unsafe.Pointer", "GoUnsafePointer"],
]);

export function localTsName(unit) {
  const name = safeIdentifier(unit.receiver ? `${unit.receiver}_${unit.name}` : unit.name);
  return name || "tsgoUnimplemented";
}

function safeIdentifier(value) {
  const name = String(value ?? "")
    .replace(/[^A-Za-z0-9_$]/g, "_")
    .replace(/^([0-9])/, "_$1");
  if (name === "" || name === "_") return name;
  if (reservedWords.has(name)) return `${name}_`;
  return name;
}

function safeParamName(value) {
  const name = safeIdentifier(value);
  if (name === "" || name === "_") return "arg";
  return name;
}

function safePropertyName(value) {
  const name = String(value ?? "");
  const safe = safeIdentifier(name);
  if (safe === name && safe !== "" && safe !== "_") return safe;
  return JSON.stringify(name);
}

const reservedWords = new Set([
  "break", "case", "catch", "class", "const", "continue", "debugger", "default", "delete", "do", "else",
  "enum", "export", "extends", "false", "finally", "for", "function", "if", "import", "in", "instanceof",
  "new", "null", "return", "super", "switch", "this", "throw", "true", "try", "typeof", "var", "void",
  "while", "with", "as", "implements", "interface", "let", "package", "private", "protected", "public",
  "static", "yield", "any", "arguments", "boolean", "constructor", "declare", "get", "module", "require", "number",
  "set", "string", "symbol", "type", "from", "of",
]);

export function expectedTsPath(config, unit, largeFileSplits = undefined) {
  const splitTarget = largeFileSplits?.assignments?.[unit.id];
  if (splitTarget) return splitTarget;
  const goPath = unit.metadata.goPath;
  return `${config.tsRoot}/${goPath.replace(/\.go$/, ".ts")}`;
}

export function policyFor(config, rel, generated) {
  const inactivePolicy = (config.policies ?? []).find((candidate) => candidate.active === false && matchGlob(candidate.match, rel));
  if (inactivePolicy) {
    return { category: inactivePolicy.category, active: inactivePolicy.active, reason: inactivePolicy.reason };
  }
  if (generated) {
    return { category: "generated", reason: "Go file is marked generated." };
  }
  const override = (config.overrides ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (override) {
    return { category: override.category, reason: override.reason };
  }
  const policy = (config.policies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return { category: policy.category, reason: policy.reason };
  }
  return { category: "literal-port", reason: "Default production compiler unit: mechanically port from TS-Go." };
}

export function policyForUnit(config, unit, file = undefined) {
  const unitPolicy = (config.unitPolicies ?? []).find((candidate) => {
    if (candidate.id && candidate.id === unit.id) return true;
    if (candidate.match && matchGlob(candidate.match, unit.id)) return true;
    return false;
  });
  if (unitPolicy) {
    return {
      category: unitPolicy.category,
      active: unitPolicy.active,
      reason: unitPolicy.reason,
    };
  }
  return policyFor(config, unit.metadata.goPath, unit.generated || file?.generated);
}

export function isActivePortPolicy(policy) {
  return policy.active !== false && activePortCategories.has(policy.category);
}

export function tsFilePolicyFor(config, rel) {
  const policy = (config.tsFilePolicies ?? []).find((candidate) => matchGlob(candidate.match, rel));
  if (policy) {
    return { category: policy.category, reason: policy.reason };
  }
  return { category: "unclassified-ts-source", reason: "No TypeScript source policy matched this file." };
}

export function verifyStatus(status, options) {
  const failures = collectVerifyFailures(status, options);
  if (failures.length > 0) {
    fail(`porter verify failed: ${failures.join(", ")}`);
  }
  console.log("porter verify passed");
}

export function collectVerifyFailures(status, options) {
  const strictPort = options["strict-port"] === true;
  const failures = [];
  if (status.counts.parseErrors > 0) failures.push(`${status.counts.parseErrors} Go parse errors`);
  if (status.counts.duplicateGoIDs > 0) failures.push(`${status.counts.duplicateGoIDs} duplicate Go IDs`);
  if (status.counts.duplicateTsIDs > 0) failures.push(`${status.counts.duplicateTsIDs} duplicate TS IDs`);
  if ((status.counts.largeFileSplitFailures ?? 0) > 0) failures.push(`${status.counts.largeFileSplitFailures} large-file split plan failures`);
  if (status.counts.orphan > 0) failures.push(`${status.counts.orphan} orphan TS units`);
  if (status.counts.forbiddenTsFiles > 0) failures.push(`${status.counts.forbiddenTsFiles} forbidden TS files`);
  if (status.counts.untrackedTsFiles > 0) failures.push(`${status.counts.untrackedTsFiles} TS files without @tsgo-unit metadata`);
  if (status.counts.stale > 0) failures.push(`${status.counts.stale} stale TS units`);
  failures.push(...collectSchemaSourceSyncFailures(status.schemaSourceSync ?? emptySchemaSourceSyncStatus()));
  failures.push(...collectGeneratedArtifactFailures(status.generatedArtifacts ?? emptyGeneratedArtifactStatus()));
  failures.push(...collectAstArtifactFailures(status.astGeneratedArtifacts ?? emptyAstGeneratedArtifactStatus()));
  failures.push(...collectDiagnosticsArtifactFailures(status.diagnosticsGeneratedArtifacts ?? emptyDiagnosticsGeneratedArtifactStatus()));
  failures.push(...collectBundledArtifactFailures(status.bundledGeneratedArtifacts ?? emptyBundledGeneratedArtifactStatus()));
  failures.push(...collectUnicodeArtifactFailures(status.unicodeGeneratedArtifacts ?? emptyUnicodeGeneratedArtifactStatus()));
  failures.push(...collectLocalOverrideFailures(status.localOverrides ?? emptyLocalOverrideStatus()));
  if ((status.signatureCheck?.overrideIssues ?? 0) > 0) {
    failures.push(`${status.signatureCheck.overrideIssues} signature override metadata issues`);
  }
  if ((status.signatureCheck?.mismatches ?? 0) > 0) {
    const byKind = Object.entries(status.signatureCheck.byKind ?? {})
      .sort((a, b) => b[1] - a[1])
      .map(([kind, count]) => `${kind}=${count}`)
      .join(", ");
    failures.push(`${status.signatureCheck.mismatches} signature/type mismatches${byKind ? ` (${byKind})` : ""}`);
  }
  if ((status.counts.mechanicalPortRisks ?? 0) > 0) {
    const examples = (status.mechanicalRisks ?? []).slice(0, 3).map((risk) => `${risk.name}:${risk.kind}`).join(", ");
    failures.push(`${status.counts.mechanicalPortRisks} mechanical port risks${examples ? ` (${examples})` : ""}`);
  }
  if ((status.counts.implementationOwnerIssues ?? 0) > 0) {
    failures.push(`${status.counts.implementationOwnerIssues} missing or ambiguous TypeScript implementation owners`);
  }
  if ((status.counts.embeddedSourceMismatches ?? 0) > 0) {
    const examples = (status.embeddedSourceMismatches ?? []).slice(0, 3).map((issue) => issue.name).join(", ");
    failures.push(`${status.counts.embeddedSourceMismatches} stale or missing embedded Go source blocks${examples ? ` (${examples})` : ""}`);
  }
  if (strictPort && status.counts.missing > 0) failures.push(`${status.counts.missing} missing Go units`);
  if (strictPort) {
    const rows = status.rows ?? [];
    // Check implemented units don't throw TSGO_UNIMPLEMENTED
    const implWithThrow = rows.filter(r => r.tsStatus === 'implemented' && r.hasUnimplThrow);
    if (implWithThrow.length > 0) {
      failures.push(`${implWithThrow.length} implemented units still throw TSGO_UNIMPLEMENTED: ${implWithThrow.slice(0,3).map(r=>r.id.split('::').pop()).join(', ')}`);
    }
    // Check func/method stubs throw TSGO_UNIMPLEMENTED
    const stubsWithoutThrow = rows.filter(r => r.tsStatus === 'stub' && (r.kind === 'func' || r.kind === 'method') && r.hasUnimplThrow === false);
    if (stubsWithoutThrow.length > 0) {
      failures.push(`${stubsWithoutThrow.length} stub func/method units missing TSGO_UNIMPLEMENTED throw: ${stubsWithoutThrow.slice(0,3).map(r=>r.id.split('::').pop()).join(', ')}`);
    }
  }
  return failures;
}

export function collectLocalOverrideFailures(status) {
  const failures = [];
  if (status.invalidInline.length > 0) failures.push(`${status.invalidInline.length} invalid local @tsgo-override entries`);
  return failures;
}

function assertLargeFileSplitPlanClean(status) {
  const failures = status.counts.largeFileSplitFailures ?? 0;
  if (failures > 0) {
    fail(`large-file split plan must be clean before scaffolding or skeleton rendering: ${failures} issue(s)`);
  }
}

export function collectGeneratedArtifactFailures(generatedArtifacts) {
  const failures = [];
  if (generatedArtifacts.missing.length > 0) failures.push(`${generatedArtifacts.missing.length} missing generated artifacts`);
  if (generatedArtifacts.stale.length > 0) failures.push(`${generatedArtifacts.stale.length} stale generated artifacts`);
  if (generatedArtifacts.orphan.length > 0) failures.push(`${generatedArtifacts.orphan.length} orphan generated artifacts`);
  if (generatedArtifacts.untracked.length > 0) failures.push(`${generatedArtifacts.untracked.length} untracked generated artifacts`);
  if (generatedArtifacts.invalid.length > 0) failures.push(`${generatedArtifacts.invalid.length} invalid generated artifacts`);
  return failures;
}

export function printScanSummary(config, snapshot) {
  console.log(`TS-Go ${snapshot.gitRevision.slice(0, 12)}`);
  console.log(`Go files: ${snapshot.summary.goFileCount}`);
  console.log(`Lines: ${snapshot.summary.lineCount}`);
  console.log(`Units: ${snapshot.summary.unitCount}`);
  console.log(`Snapshot: ${path.relative(repoRoot, resolveRepo(config.snapshotOut))}`);
}

export function printStatus(config, status) {
  console.log(`TS-Go ${status.source.gitRevision.slice(0, 12)}`);
  console.log(`Go files: ${status.source.fileCount}`);
  console.log(`Go lines: ${status.source.lineCount}`);
  console.log(`Portable units: ${status.counts.portable}`);
  console.log(`Excluded units: ${status.counts.excluded}`);
  console.log(`Implemented: ${status.counts.implemented}`);
  console.log(`Stubbed: ${status.counts.stubbed}`);
  console.log(`Missing: ${status.counts.missing}`);
  console.log(`Stale: ${status.counts.stale}`);
  console.log(`Orphan TS units: ${status.counts.orphan}`);
  console.log(`Forbidden TS files: ${status.counts.forbiddenTsFiles}`);
  console.log(`Untracked TS files: ${status.counts.untrackedTsFiles}`);
  console.log(`Generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingGeneratedArtifacts}/${status.counts.staleGeneratedArtifacts}/${status.counts.orphanGeneratedArtifacts}/${status.counts.untrackedGeneratedArtifacts}/${status.counts.invalidGeneratedArtifacts}`);
  console.log(`AST generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingAstArtifacts}/${status.counts.staleAstArtifacts}/${status.counts.orphanAstArtifacts}/${status.counts.untrackedAstArtifacts}/${status.counts.invalidAstArtifacts}`);
  console.log(`Diagnostics generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingDiagnosticsArtifacts}/${status.counts.staleDiagnosticsArtifacts}/${status.counts.orphanDiagnosticsArtifacts}/${status.counts.untrackedDiagnosticsArtifacts}/${status.counts.invalidDiagnosticsArtifacts}`);
  console.log(`Bundled generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingBundledArtifacts}/${status.counts.staleBundledArtifacts}/${status.counts.orphanBundledArtifacts}/${status.counts.untrackedBundledArtifacts}/${status.counts.invalidBundledArtifacts}`);
  console.log(`Unicode generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingUnicodeArtifacts}/${status.counts.staleUnicodeArtifacts}/${status.counts.orphanUnicodeArtifacts}/${status.counts.untrackedUnicodeArtifacts}/${status.counts.invalidUnicodeArtifacts}`);
  console.log(`Large-file split plan failures: ${status.counts.largeFileSplitFailures}`);
  const localOverrides = status.localOverrides ?? emptyLocalOverrideStatus();
  console.log(`Local overrides inline/body/signature/issues: ${localOverrides.inline}/${localOverrides.byAllow.body ?? 0}/${localOverrides.byAllow.signature ?? 0}/${localOverrides.failureCount}`);
  console.log(`Mechanical port risks: ${status.counts.mechanicalPortRisks ?? 0}`);
  console.log(`Implementation owner issues: ${status.counts.implementationOwnerIssues ?? 0}`);
  console.log(`Embedded Go source mismatches: ${status.counts.embeddedSourceMismatches ?? 0}`);
  console.log(`Schema file policy issues: ${status.counts.schemaFilePolicyIssues ?? 0}`);
  console.log(`Schema/source sync mismatches: ${status.counts.schemaSourceMismatches ?? 0}`);
  console.log(`Go parse errors: ${status.counts.parseErrors}`);
  console.log(`Unitless Go files: ${status.counts.unitlessGoFiles}`);
  console.log(`Report: ${path.relative(repoRoot, resolveRepo(config.reportOut))}`);
}

export function renderStatusMarkdown(status) {
  const lines = [];
  lines.push("# TSTS Porter Status");
  lines.push("");
  lines.push(`Generated: ${status.generatedAt}`);
  lines.push(`TS-Go revision: \`${status.source.gitRevision}\``);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Go files: ${status.source.fileCount}`);
  lines.push(`- Go lines: ${status.source.lineCount}`);
  lines.push(`- Portable units: ${status.counts.portable}`);
  lines.push(`- Excluded units: ${status.counts.excluded}`);
  lines.push(`- Implemented: ${status.counts.implemented}`);
  lines.push(`- Stubbed: ${status.counts.stubbed}`);
  lines.push(`- Missing: ${status.counts.missing}`);
  lines.push(`- Stale: ${status.counts.stale}`);
  lines.push(`- Orphan TS units: ${status.counts.orphan}`);
  lines.push(`- Forbidden TS files: ${status.counts.forbiddenTsFiles}`);
  lines.push(`- Untracked TS files: ${status.counts.untrackedTsFiles}`);
  lines.push(`- Generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingGeneratedArtifacts}/${status.counts.staleGeneratedArtifacts}/${status.counts.orphanGeneratedArtifacts}/${status.counts.untrackedGeneratedArtifacts}/${status.counts.invalidGeneratedArtifacts}`);
  lines.push(`- AST generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingAstArtifacts}/${status.counts.staleAstArtifacts}/${status.counts.orphanAstArtifacts}/${status.counts.untrackedAstArtifacts}/${status.counts.invalidAstArtifacts}`);
  lines.push(`- Diagnostics generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingDiagnosticsArtifacts}/${status.counts.staleDiagnosticsArtifacts}/${status.counts.orphanDiagnosticsArtifacts}/${status.counts.untrackedDiagnosticsArtifacts}/${status.counts.invalidDiagnosticsArtifacts}`);
  lines.push(`- Bundled generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingBundledArtifacts}/${status.counts.staleBundledArtifacts}/${status.counts.orphanBundledArtifacts}/${status.counts.untrackedBundledArtifacts}/${status.counts.invalidBundledArtifacts}`);
  lines.push(`- Unicode generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingUnicodeArtifacts}/${status.counts.staleUnicodeArtifacts}/${status.counts.orphanUnicodeArtifacts}/${status.counts.untrackedUnicodeArtifacts}/${status.counts.invalidUnicodeArtifacts}`);
  lines.push(`- Large-file split plan failures: ${status.counts.largeFileSplitFailures}`);
  const localOverrides = status.localOverrides ?? emptyLocalOverrideStatus();
  lines.push(`- Local overrides inline/body/signature/issues: ${localOverrides.inline}/${localOverrides.byAllow.body ?? 0}/${localOverrides.byAllow.signature ?? 0}/${localOverrides.failureCount}`);
  lines.push(`- Mechanical port risks: ${status.counts.mechanicalPortRisks ?? 0}`);
  lines.push(`- Implementation owner issues: ${status.counts.implementationOwnerIssues ?? 0}`);
  lines.push(`- Embedded Go source mismatches: ${status.counts.embeddedSourceMismatches ?? 0}`);
  lines.push(`- Schema file policy issues: ${status.counts.schemaFilePolicyIssues ?? 0}`);
  lines.push(`- Schema/source sync mismatches: ${status.counts.schemaSourceMismatches ?? 0}`);
  lines.push(`- Go parse errors: ${status.counts.parseErrors}`);
  lines.push(`- Unitless Go files: ${status.counts.unitlessGoFiles}`);
  lines.push("");
  lines.push("## Categories");
  lines.push("");
  lines.push("| Category | Units |");
  lines.push("|---|---:|");
  for (const [name, count] of Object.entries(status.categories)) {
    lines.push(`| ${name} | ${count} |`);
  }
  lines.push("");
  lines.push("## Go Feature Counts");
  lines.push("");
  lines.push("| Feature | Count |");
  lines.push("|---|---:|");
  for (const [name, count] of Object.entries(status.featureCounts).sort()) {
    lines.push(`| ${name} | ${count} |`);
  }
  lines.push("");
  lines.push("## Largest Missing Modules");
  lines.push("");
  lines.push("| Module | Units |");
  lines.push("|---|---:|");
  for (const [name, count] of Object.entries(status.missingModules ?? countsByModule(status.rows.filter((row) => row.status === "missing"))).sort((a, b) => b[1] - a[1]).slice(0, 30)) {
    lines.push(`| ${name} | ${count} |`);
  }
  lines.push("");
  lines.push("## Coverage Diagnostics");
  lines.push("");
  lines.push(`- Go parse errors: ${status.counts.parseErrors}`);
  lines.push(`- Go files with no top-level units: ${status.counts.unitlessGoFiles}`);
  lines.push(`- Forbidden TypeScript files: ${status.counts.forbiddenTsFiles}`);
  lines.push(`- TypeScript files without unit metadata: ${status.counts.untrackedTsFiles}`);
  lines.push(`- Generated artifact defects: ${status.counts.missingGeneratedArtifacts + status.counts.staleGeneratedArtifacts + status.counts.orphanGeneratedArtifacts + status.counts.untrackedGeneratedArtifacts + status.counts.invalidGeneratedArtifacts}`);
  lines.push(`- Bundled generated artifact defects: ${status.counts.missingBundledArtifacts + status.counts.staleBundledArtifacts + status.counts.orphanBundledArtifacts + status.counts.untrackedBundledArtifacts + status.counts.invalidBundledArtifacts}`);
  lines.push(`- Large-file split plan failures: ${status.counts.largeFileSplitFailures}`);
  if ((status.mechanicalRisks?.length ?? 0) > 0) {
    lines.push("");
    lines.push("## Mechanical Port Risks");
    lines.push("");
    lines.push("| Unit | Risk | TypeScript path | Message |");
    lines.push("|---|---|---|---|");
    for (const risk of status.mechanicalRisks.slice(0, 100)) {
      lines.push(`| ${escapeMd(risk.name)} | ${risk.kind} | ${risk.path} | ${escapeMd(risk.message)} |`);
    }
  }
  if ((status.implementationOwnerIssues?.length ?? 0) > 0) {
    lines.push("");
    lines.push("## TypeScript Implementation Owner Issues");
    lines.push("");
    lines.push("| Unit | TypeScript path | Reason |");
    lines.push("|---|---|---|");
    for (const issue of status.implementationOwnerIssues.slice(0, 100)) {
      lines.push(`| ${escapeMd(issue.name)} | ${issue.path} | ${escapeMd(issue.reason)} |`);
    }
  }
  if ((status.embeddedSourceMismatches?.length ?? 0) > 0) {
    lines.push("");
    lines.push("## Embedded Go Source Mismatches");
    lines.push("");
    lines.push("| TS path | Unit | Reason |");
    lines.push("|---|---|---|");
    for (const issue of status.embeddedSourceMismatches.slice(0, 100)) {
      lines.push(`| ${issue.path} | ${escapeMd(issue.name)} | ${issue.reason} |`);
    }
  }
  if (status.largeFileSplits?.files?.length > 0) {
    lines.push("");
    lines.push("### Large-File Semantic Split Plans");
    lines.push("");
    lines.push(`Threshold: ${status.largeFileSplits.threshold} LOC`);
    lines.push("");
    lines.push("| Go path | LOC | Units | Assigned | Targets | Failures |");
    lines.push("|---|---:|---:|---:|---:|---:|");
    for (const file of status.largeFileSplits.files) {
      const failures = file.unassigned + file.duplicateAssignments + file.staleDeclarations + (file.invalidTargets ?? 0);
      lines.push(`| ${file.path} | ${file.lineCount} | ${file.portableUnits} | ${file.assigned} | ${file.targetCount} | ${failures} |`);
    }
  }
  if (status.largeFileSplits?.issues?.length > 0) {
    lines.push("");
    lines.push("### Large-File Split Plan Issues");
    lines.push("");
    lines.push("| Go path | Issue | Declaration | Target | Message |");
    lines.push("|---|---|---|---|---|");
    for (const issue of status.largeFileSplits.issues.slice(0, 100)) {
      lines.push(`| ${issue.file} | ${issue.kind} | ${escapeMd(issue.declaration ?? "")} | ${escapeMd(issue.target ?? "")} | ${escapeMd(issue.message)} |`);
    }
  }
  if (status.localOverrides?.failureCount > 0) {
    lines.push("");
    lines.push("## Local Override Issues");
    lines.push("");
    for (const issue of status.localOverrides.invalidInline.slice(0, 100)) {
      lines.push(`- ${issue.id || issue.match || `config[${issue.index}]`} ${issue.path ? `(${issue.path}) ` : ""}- ${issue.reason}`);
    }
  }
  if (status.unitlessGoFiles.length > 0) {
    lines.push("");
    lines.push("### Unitless Go Files");
    lines.push("");
    lines.push("| Go path | Lines | Reason |");
    lines.push("|---|---:|---|");
    for (const file of status.unitlessGoFiles.slice(0, 100)) {
      lines.push(`| ${file.path} | ${file.lineCount} | ${file.reason} |`);
    }
  }
  if (status.untrackedTsFiles.length > 0) {
    lines.push("");
    lines.push("### Untracked TypeScript Files");
    lines.push("");
    lines.push("| TS path | Reason |");
    lines.push("|---|---|");
    for (const file of status.untrackedTsFiles.slice(0, 100)) {
      lines.push(`| ${file.path} | ${file.reason} |`);
    }
  }
  if (status.forbiddenTsFiles.length > 0) {
    lines.push("");
    lines.push("### Forbidden TypeScript Files");
    lines.push("");
    lines.push("| TS path | Reason |");
    lines.push("|---|---|");
    for (const file of status.forbiddenTsFiles.slice(0, 100)) {
      lines.push(`| ${file.path} | ${file.reason} |`);
    }
  }
  if (collectGeneratedArtifactFailures(status.generatedArtifacts).length > 0) {
    lines.push("");
    lines.push("### Generated Artifact Defects");
    lines.push("");
    lines.push("| Status | Path | Reason |");
    lines.push("|---|---|---|");
    for (const artifact of status.generatedArtifacts.missing.slice(0, 100)) {
      lines.push(`| missing | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of status.generatedArtifacts.stale.slice(0, 100)) {
      lines.push(`| stale | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of status.generatedArtifacts.orphan.slice(0, 100)) {
      lines.push(`| orphan | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of status.generatedArtifacts.untracked.slice(0, 100)) {
      lines.push(`| untracked | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of status.generatedArtifacts.invalid.slice(0, 100)) {
      lines.push(`| invalid | ${artifact.path} | ${artifact.reason} |`);
    }
  }
  const bundledArtifacts = status.bundledGeneratedArtifacts ?? emptyBundledGeneratedArtifactStatus();
  if (collectBundledArtifactFailures(bundledArtifacts).length > 0) {
    lines.push("");
    lines.push("### Bundled Generated Artifact Defects");
    lines.push("");
    lines.push("| Status | Path | Reason |");
    lines.push("|---|---|---|");
    for (const artifact of bundledArtifacts.missing.slice(0, 100)) {
      lines.push(`| missing | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of bundledArtifacts.stale.slice(0, 100)) {
      lines.push(`| stale | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of bundledArtifacts.orphan.slice(0, 100)) {
      lines.push(`| orphan | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of bundledArtifacts.untracked.slice(0, 100)) {
      lines.push(`| untracked | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of bundledArtifacts.invalid.slice(0, 100)) {
      lines.push(`| invalid | ${artifact.path} | ${artifact.reason} |`);
    }
  }
  const diagnosticsArtifacts = status.diagnosticsGeneratedArtifacts ?? emptyDiagnosticsGeneratedArtifactStatus();
  if (collectDiagnosticsArtifactFailures(diagnosticsArtifacts).length > 0) {
    lines.push("");
    lines.push("### Diagnostics Generated Artifact Defects");
    lines.push("");
    lines.push("| Status | Path | Reason |");
    lines.push("|---|---|---|");
    for (const artifact of diagnosticsArtifacts.missing.slice(0, 100)) {
      lines.push(`| missing | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of diagnosticsArtifacts.stale.slice(0, 100)) {
      lines.push(`| stale | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of diagnosticsArtifacts.orphan.slice(0, 100)) {
      lines.push(`| orphan | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of diagnosticsArtifacts.untracked.slice(0, 100)) {
      lines.push(`| untracked | ${artifact.path} | ${artifact.reason} |`);
    }
    for (const artifact of diagnosticsArtifacts.invalid.slice(0, 100)) {
      lines.push(`| invalid | ${artifact.path} | ${artifact.reason} |`);
    }
  }
  if (status.excluded.length > 0) {
    lines.push("");
    lines.push("## Excluded Units");
    lines.push("");
    lines.push("| Go path | Kind | Name | Category | Reason |");
    lines.push("|---|---|---|---|---|");
    for (const row of status.excluded.slice(0, 100)) {
      lines.push(`| ${row.goPath} | ${row.kind} | ${escapeMd(row.name)} | ${row.category} | ${escapeMd(row.reason)} |`);
    }
  }
  lines.push("");
  lines.push("## First Missing Units");
  lines.push("");
  lines.push("| Go path | Kind | Name | Category | Expected TS path |");
  lines.push("|---|---|---|---|---|");
  for (const row of status.missing.slice(0, 100)) {
    lines.push(`| ${row.goPath} | ${row.kind} | ${escapeMd(row.name)} | ${row.category} | ${row.expectedTsPath} |`);
  }
  lines.push("");
  return lines.join("\n");
}

export function loadConfig() {
  if (!existsSync(configPath)) {
    fail(`missing config: ${path.relative(repoRoot, configPath)}`);
  }
  return JSON.parse(readFileSync(configPath, "utf8"));
}

export function parseArgs(args) {
  const options = {};
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    if (!arg.startsWith("--")) {
      fail(`unexpected positional argument: ${arg}`);
    }
    const key = arg.slice(2);
    const next = args[index + 1];
    if (next === undefined || next.startsWith("--")) {
      options[key] = true;
    } else {
      options[key] = next;
      index++;
    }
  }
  return options;
}

export function walk(root) {
  if (!existsSync(root)) return [];
  const out = [];
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    const entries = readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === ".git" || entry.name === "node_modules" || entry.name === "dist") continue;
        stack.push(full);
      } else if (entry.isFile()) {
        out.push(full);
      }
    }
  }
  out.sort();
  return out;
}

export function matchGlob(pattern, value) {
  const normalizedPattern = pattern.split(path.sep).join("/");
  const normalizedValue = value.split(path.sep).join("/");
  const regex = new RegExp(`^${normalizedPattern
    .replace(/[.+^${}()|[\]\\]/g, "\\$&")
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*")}$`);
  return regex.test(normalizedValue);
}

export function increment(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}

export function countsByModule(rows) {
  const counts = new Map();
  for (const row of rows) {
    increment(counts, moduleNameFor(row.goPath));
  }
  return Object.fromEntries([...counts.entries()].sort());
}

export function hashText(text) {
  return createHash("sha256").update(text).digest("hex");
}

export function moduleNameFor(goPath) {
  const parts = goPath.split("/");
  if (parts[0] === "internal" && parts.length > 1) return `internal/${parts[1]}`;
  if (parts[0] === "cmd" && parts.length > 1) return `cmd/${parts[1]}`;
  return parts[0] || ".";
}

export function writeJson(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

export function writeText(file, value) {
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, value);
}

export function writeJsonSafely(file, value, options = {}) {
  return writeTextSafely(file, `${JSON.stringify(value, null, 2)}\n`, options);
}

export function writeTextSafely(file, value, options = {}) {
  if (existsSync(file)) {
    const current = readFileSync(file, "utf8");
    if (current === value) return "unchanged";
    if (options.force !== true) {
      const relative = path.relative(repoRoot, file);
      const label = options.label ?? "file";
      throw new Error(`refusing to overwrite existing ${label}: ${relative}. Re-run with --force after reviewing the diff.`);
    }
  }
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, value);
  return "written";
}

export function resolveRepo(relativePath) {
  return path.resolve(repoRoot, relativePath);
}

export function findRepoRoot(start) {
  let current = path.resolve(start);
  while (true) {
    if (existsSync(path.join(current, ".git"))) return current;
    const parent = path.dirname(current);
    if (parent === current) fail("could not find repo root");
    current = parent;
  }
}

export function assertDirectory(directory, label) {
  if (!existsSync(directory) || !statSync(directory).isDirectory()) {
    fail(`${label} is not a directory: ${directory}`);
  }
}

export function escapeMd(value) {
  return String(value).replaceAll("|", "\\|");
}

export function fail(message) {
  console.error(message);
  process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  Promise.resolve()
    .then(() => main())
    .catch((error) => fail(error?.message ?? String(error)));
}
