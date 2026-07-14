import { buildGeneratedSourcePolicyStatus } from "../generated-source.mjs";
import { schemaPoliciesFromSourcePin } from "../source-pin.mjs";
import { declarationAuditsNotRun } from "./declaration-audits.mjs";
import { buildEffectivePolicyResolver } from "./effective-policies.mjs";
import { inactiveSourcePolicyFor, isActivePortPolicy, tsFilePolicyFor } from "./policies.mjs";
import { countsByModule, repoRoot, resolveRepo, walk } from "./runtime.mjs";
import { buildPorterUnitOwnership } from "./unit-ownership.mjs";
import { PORTER_STATUS_SCHEMA_VERSION, requireExactPorterStatus } from "./status-contract.mjs";
import { validateBuildStatusInput } from "./status-input-contract.mjs";
import { requireGoValueOperationGeneratedArtifactStatus } from "./value-operations/generated-artifacts.mjs";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

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
  let policies;
  try {
    policies = config.schemaFilePolicies ?? schemaPoliciesFromSourcePin(repoRoot, config);
  } catch (error) {
    return {
      mismatches: [],
      policyIssues: [{ path: config.sourcePinManifest ?? "<source-pin>", reason: error.message }],
      classifiedFileCount: 0,
    };
  }
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

export function buildStatus(input) {
  if (arguments.length !== 1) throw new TypeError(`buildStatus requires exactly one input object; received ${arguments.length} arguments`);
  validateBuildStatusInput(input);
  const {
    config,
    snapshot,
    tsUnits,
    generatedArtifacts,
    astGeneratedArtifacts,
    diagnosticsGeneratedArtifacts,
    bundledGeneratedArtifacts,
    unicodeGeneratedArtifacts,
    schemaSourceSync,
    localOverrides,
    sourcePin,
    generatedSourceCoverage,
    globalGeneratedArtifacts,
    largeFileSplits,
    valueOperationGeneratedArtifacts,
  } = input;
  const effectivePolicies = buildEffectivePolicyResolver(config, snapshot);
  const generatedSourcePolicies = buildGeneratedSourcePolicyStatus(snapshot, {
    isInactive: (sourcePath) => inactiveSourcePolicyFor(config, sourcePath) !== undefined,
    requireAllMechanisms: config.sourcePinManifest !== undefined,
    artifactStatuses: {
      astGeneratedArtifacts,
      bundledGeneratedArtifacts,
      diagnosticsGeneratedArtifacts,
      unicodeGeneratedArtifacts,
    },
  });
  const sourceInterpretationIssues = [];
  for (const file of snapshot.files) {
    const filePolicy = effectivePolicies.file(file);
    if (!isActivePortPolicy(filePolicy)) continue;
    for (const imported of file.imports ?? []) {
      if (imported.path === "C") {
        sourceInterpretationIssues.push({ path: file.path, reason: "active source uses cgo import C, which has no registered porter mechanism" });
      } else if (imported.name === ".") {
        sourceInterpretationIssues.push({ path: file.path, reason: `active source uses dot import '${imported.path}', which cannot be resolved by explicit symbol identity` });
      }
    }
  }
  const ownership = buildPorterUnitOwnership({ config, largeFileSplits, snapshot, tsUnits });
  const {
    categoryCounts,
    duplicateGoIDs,
    duplicateTsIDs,
    excluded,
    goByID,
    implemented,
    invalidTsMetadata,
    missing,
    moduleCounts,
    orphanTsUnits,
    rows,
    splitPathMismatches,
    stale,
    stubbed,
  } = ownership;
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
  const unitlessGoFiles = snapshot.files
    .filter((file) => (file.units ?? []).length === 0)
    .map((file) => ({
      path: file.path,
      lineCount: file.lineCount,
      reason: "No top-level declarations; package docs/comment-only files are valid but reported.",
    }));
  const declarationAudits = declarationAuditsNotRun();

  return requireExactPorterStatus({
    schemaVersion: PORTER_STATUS_SCHEMA_VERSION,
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
    signatureCheck: declarationAudits.signatureCheck,
    jsonTagCheck: declarationAudits.jsonTagCheck,
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
      missingValueOperationGeneratedArtifacts: valueOperationGeneratedArtifacts.missing.length,
      staleValueOperationGeneratedArtifacts: valueOperationGeneratedArtifacts.stale.length,
      orphanValueOperationGeneratedArtifacts: valueOperationGeneratedArtifacts.orphan.length,
      untrackedValueOperationGeneratedArtifacts: valueOperationGeneratedArtifacts.untracked.length,
      invalidValueOperationGeneratedArtifacts: valueOperationGeneratedArtifacts.invalid.length,
      largeFileSplitFailures: largeFileSplits.failureCount,
      splitPathMismatches: splitPathMismatches.length,
      schemaSourceMismatches: schemaSourceSync.mismatches.length,
      schemaFilePolicyIssues: (schemaSourceSync.policyIssues ?? []).length,
      localOverrideIssues: localOverrides.failureCount,
      generatedSourcePolicyIssues: generatedSourcePolicies.issues.length,
      generatedSourceCoverageIssues: generatedSourceCoverage.issues.length,
      sourcePinIssues: sourcePin.issues.length,
      invalidTsMetadata: invalidTsMetadata.length,
      globalGeneratedArtifactIssues: globalGeneratedArtifacts.issues.length,
      sourceInterpretationIssues: sourceInterpretationIssues.length,
    },
    categories: Object.fromEntries([...categoryCounts.entries()].sort()),
    modules: Object.fromEntries([...moduleCounts.entries()].sort()),
    missingModules: countsByModule(missing),
    duplicateGoIDs,
    duplicateTsIDs,
    orphanTsUnits,
    unitlessGoFiles,
    untrackedTsFiles,
    forbiddenTsFiles,
    generatedArtifacts,
    astGeneratedArtifacts,
    diagnosticsGeneratedArtifacts,
    bundledGeneratedArtifacts,
    unicodeGeneratedArtifacts,
    valueOperationGeneratedArtifacts,
    schemaSourceSync,
    localOverrides,
    generatedSourcePolicies,
    generatedSourceCoverage,
    sourcePin,
    invalidTsMetadata,
    globalGeneratedArtifacts,
    sourceInterpretationIssues,
    largeFileSplits,
    splitPathMismatches,
    missing,
    stale,
    excluded,
    rows,
  });
}

export function withGoValueOperationGeneratedArtifactStatus(status, artifactStatus) {
  requireExactPorterStatus(status);
  requireGoValueOperationGeneratedArtifactStatus(artifactStatus);
  return requireExactPorterStatus({
    ...status,
    counts: {
      ...status.counts,
      missingValueOperationGeneratedArtifacts: artifactStatus.missing.length,
      staleValueOperationGeneratedArtifacts: artifactStatus.stale.length,
      orphanValueOperationGeneratedArtifacts: artifactStatus.orphan.length,
      untrackedValueOperationGeneratedArtifacts: artifactStatus.untracked.length,
      invalidValueOperationGeneratedArtifacts: artifactStatus.invalid.length,
    },
    valueOperationGeneratedArtifacts: artifactStatus,
  });
}
