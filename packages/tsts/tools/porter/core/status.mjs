import { buildGeneratedSourcePolicyStatus } from "../generated-source.mjs";
import { schemaPoliciesFromSourcePin } from "../source-pin.mjs";
import { declarationAuditsNotRun } from "./declaration-audits.mjs";
import { buildEffectivePolicyResolver } from "./effective-policies.mjs";
import { buildLargeFileSplitStatus } from "./large-files.mjs";
import { expectedTsPath, inactiveSourcePolicyFor, isActivePortPolicy, tsFilePolicyFor } from "./policies.mjs";
import { countsByModule, increment, moduleNameFor, repoRoot, resolveRepo, walk } from "./runtime.mjs";
import { isSemanticPrimaryUnitKind } from "./unit-kinds.mjs";
import { validateTsgoUnitMetadata } from "./ts-units.mjs";
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

const buildStatusInputKeys = Object.freeze([
  "config",
  "snapshot",
  "tsUnits",
  "generatedArtifacts",
  "astGeneratedArtifacts",
  "diagnosticsGeneratedArtifacts",
  "bundledGeneratedArtifacts",
  "unicodeGeneratedArtifacts",
  "schemaSourceSync",
  "localOverrides",
  "sourcePin",
  "generatedSourceCoverage",
  "globalGeneratedArtifacts",
]);
const buildStatusInputKeySet = new Set(buildStatusInputKeys);

function validateBuildStatusInput(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input) ||
      ![Object.prototype, null].includes(Object.getPrototypeOf(input))) {
    throw new TypeError("buildStatus input must be one exact object");
  }
  const keys = Reflect.ownKeys(input);
  if (keys.some((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(input, key);
    return typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor);
  })) {
    throw new TypeError("buildStatus input must contain only enumerable own data properties");
  }
  const extra = keys.filter((key) => !buildStatusInputKeySet.has(key)).sort();
  if (extra.length > 0) throw new TypeError(`buildStatus input has extra key(s): ${extra.join(", ")}`);
  const missing = buildStatusInputKeys.filter((key) => !Object.hasOwn(input, key));
  if (missing.length > 0) throw new TypeError(`buildStatus input is missing required key(s): ${missing.join(", ")}`);
  const undefinedKeys = buildStatusInputKeys.filter((key) => input[key] === undefined);
  if (undefinedKeys.length > 0) throw new TypeError(`buildStatus input has undefined key(s): ${undefinedKeys.join(", ")}`);
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
  } = input;
  const effectivePolicies = buildEffectivePolicyResolver(config, snapshot);
  const largeFileSplits = buildLargeFileSplitStatus(config, snapshot);
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
  const goUnits = [];
  const goByID = new Map();
  const duplicateGoIDs = [];

  for (const file of snapshot.files) {
    const filePolicy = effectivePolicies.file(file);
    for (const unit of file.units ?? []) {
      const policy = effectivePolicies.unit(unit, file);
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
        portable: isSemanticPrimaryUnitKind(unit.kind),
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
  const invalidTsMetadata = [];
  for (const unit of tsUnits.units) {
    if (tsByID.has(unit.id)) duplicateTsIDs.push(unit.id);
    tsByID.set(unit.id, unit);
    if (unit.metadata !== undefined) {
      for (const reason of validateTsgoUnitMetadata(unit.metadata)) {
        invalidTsMetadata.push({ id: unit.id ?? "", path: unit.path ?? "", reason });
      }
    }
  }

  const rows = [];
  const categoryCounts = new Map();
  const moduleCounts = new Map();
  const missing = [];
  const stale = [];
  const implemented = [];
  const stubbed = [];
  const excluded = [];
  const splitPathMismatches = [];

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
      tsPath: "",
      tsStatus: "",
    };

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
    row.kind = tsUnit.kind;
    const plannedSplitPath = largeFileSplits.assignments?.[unit.id];
    if (plannedSplitPath !== undefined && tsUnit.path !== plannedSplitPath) {
      splitPathMismatches.push({
        id: unit.id,
        actualPath: tsUnit.path,
        expectedPath: plannedSplitPath,
      });
    }
    const sigMatches = tsUnit.sigHash === unit.sigHash;
    if (!sigMatches) {
      row.status = "stale";
      row.reason = "signature metadata hash drift";
      stale.push(row);
    } else if (tsUnit.status === "implemented") {
      row.status = "implemented";
      implemented.push(row);
    } else if (tsUnit.status === "stub") {
      row.status = "stub";
      stubbed.push(row);
    } else {
      row.status = "invalid";
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
  const unitlessGoFiles = snapshot.files
    .filter((file) => (file.units ?? []).length === 0)
    .map((file) => ({
      path: file.path,
      lineCount: file.lineCount,
      reason: "No top-level declarations; package docs/comment-only files are valid but reported.",
    }));
  const declarationAudits = declarationAuditsNotRun();

  return {
    schemaVersion: 4,
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
    missing: missing.slice(0, 500),
    stale: stale.slice(0, 500),
    excluded: excluded.slice(0, 500),
    rows,
  };
}
