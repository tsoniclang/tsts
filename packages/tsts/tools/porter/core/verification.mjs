import { collectBundledArtifactFailures } from "../../bundled/generate-bundled.mjs";
import { collectUnicodeArtifactFailures } from "../../unicode/generate-unicode-data.mjs";
import { collectAstArtifactFailures } from "../ast-generator.mjs";
import { collectDiagnosticsArtifactFailures } from "../diagnostics-generator.mjs";
import { collectGeneratedSourceCoverageFailures, collectGlobalGeneratedArtifactFailures } from "../generated-source.mjs";
import { collectSourcePinFailures } from "../source-pin.mjs";
import { auditExecutionLabel, declarationAuditEntries } from "./declaration-audits.mjs";
import { fail } from "./runtime.mjs";
import { collectSchemaSourceSyncFailures } from "./status.mjs";

const requiredVerificationFields = Object.freeze([
  "astGeneratedArtifacts",
  "bundledGeneratedArtifacts",
  "counts",
  "diagnosticsGeneratedArtifacts",
  "generatedArtifacts",
  "generatedSourceCoverage",
  "globalGeneratedArtifacts",
  "jsonTagCheck",
  "localOverrides",
  "schemaSourceSync",
  "signatureCheck",
  "sourcePin",
  "unicodeGeneratedArtifacts",
]);

export function verifyStatus(status) {
  const failures = collectVerifyFailures(status);
  if (failures.length > 0) {
    fail(`porter verify failed: ${failures.join(", ")}`);
  }
  console.log("porter verify passed");
}

export function collectVerifyFailures(status) {
  requireVerificationStatus(status);
  const failures = [];
  for (const entry of declarationAuditEntries(status)) {
    if (entry.audit?.state !== "complete") {
      failures.push(`${entry.label} must be complete for trusted verification (${auditExecutionLabel(entry.audit)})`);
    }
  }
  if (status.signatureCheck?.state === "complete" && status.signatureCheck.selection?.kind !== "all-active") {
    failures.push("Go/TypeScript signature unit audit must cover all active units for trusted verification");
  }
  if (status.counts.duplicateGoIDs > 0) failures.push(`${status.counts.duplicateGoIDs} duplicate Go IDs`);
  if (status.counts.duplicateTsIDs > 0) failures.push(`${status.counts.duplicateTsIDs} duplicate TS IDs`);
  if (status.counts.largeFileSplitFailures > 0) failures.push(`${status.counts.largeFileSplitFailures} large-file split plan failures`);
  if (status.counts.splitPathMismatches > 0) failures.push(`${status.counts.splitPathMismatches} units outside their semantic split targets`);
  if (status.counts.orphan > 0) failures.push(`${status.counts.orphan} orphan TS units`);
  if (status.counts.forbiddenTsFiles > 0) failures.push(`${status.counts.forbiddenTsFiles} forbidden TS files`);
  if (status.counts.untrackedTsFiles > 0) failures.push(`${status.counts.untrackedTsFiles} TS files without @tsgo-unit metadata`);
  if (status.counts.stale > 0) failures.push(`${status.counts.stale} stale TS units`);
  if (status.counts.generatedSourcePolicyIssues > 0) {
    failures.push(`${status.counts.generatedSourcePolicyIssues} generated source policy issues`);
  }
  if (status.counts.invalidTsMetadata > 0) failures.push(`${status.counts.invalidTsMetadata} invalid @tsgo-unit metadata entries`);
  failures.push(...collectGeneratedSourceCoverageFailures(status.generatedSourceCoverage));
  failures.push(...collectGlobalGeneratedArtifactFailures(status.globalGeneratedArtifacts));
  if (status.counts.sourceInterpretationIssues > 0) {
    failures.push(`${status.counts.sourceInterpretationIssues} unresolved Go source interpretation issues`);
  }
  failures.push(...collectSourcePinFailures(status.sourcePin));
  failures.push(...collectSchemaSourceSyncFailures(status.schemaSourceSync));
  failures.push(...collectGeneratedArtifactFailures(status.generatedArtifacts));
  failures.push(...collectAstArtifactFailures(status.astGeneratedArtifacts));
  failures.push(...collectDiagnosticsArtifactFailures(status.diagnosticsGeneratedArtifacts));
  failures.push(...collectBundledArtifactFailures(status.bundledGeneratedArtifacts));
  failures.push(...collectUnicodeArtifactFailures(status.unicodeGeneratedArtifacts));
  failures.push(...collectLocalOverrideFailures(status.localOverrides));
  if (status.signatureCheck.overrideIssues > 0) {
    failures.push(`${status.signatureCheck.overrideIssues} signature override metadata issues`);
  }
  if (status.signatureCheck.mismatches > 0) {
    const byKind = Object.entries(status.signatureCheck.byKind ?? {})
      .sort((a, b) => b[1] - a[1])
      .map(([kind, count]) => `${kind}=${count}`)
      .join(", ");
    failures.push(`${status.signatureCheck.mismatches} signature/type mismatches${byKind ? ` (${byKind})` : ""}`);
  }
  if (status.jsonTagCheck.mismatches > 0) {
    const byKind = Object.entries(status.jsonTagCheck.byKind ?? {})
      .sort((a, b) => b[1] - a[1])
      .map(([kind, count]) => `${kind}=${count}`)
      .join(", ");
    failures.push(`${status.jsonTagCheck.mismatches} Go struct JSON-tag mismatches${byKind ? ` (${byKind})` : ""}`);
  }
  if (status.counts.missing > 0) failures.push(`${status.counts.missing} missing Go units`);
  if (status.counts.stubbed > 0) failures.push(`${status.counts.stubbed} stub Go units`);
  return failures;
}

export function collectLocalOverrideFailures(status) {
  requireIssueArray(status, "invalidInline", "local override status");
  const failures = [];
  if (status.invalidInline.length > 0) failures.push(`${status.invalidInline.length} invalid local @tsgo-override entries`);
  return failures;
}

export function assertLargeFileSplitPlanClean(status) {
  const failures = status.counts.largeFileSplitFailures ?? 0;
  if (failures > 0) {
    fail(`large-file split plan must be clean before scaffolding or skeleton rendering: ${failures} issue(s)`);
  }
}

export function collectGeneratedArtifactFailures(generatedArtifacts) {
  for (const key of ["missing", "stale", "orphan", "untracked", "invalid"]) {
    requireIssueArray(generatedArtifacts, key, "generated artifact status");
  }
  const failures = [];
  if (generatedArtifacts.missing.length > 0) failures.push(`${generatedArtifacts.missing.length} missing generated artifacts`);
  if (generatedArtifacts.stale.length > 0) failures.push(`${generatedArtifacts.stale.length} stale generated artifacts`);
  if (generatedArtifacts.orphan.length > 0) failures.push(`${generatedArtifacts.orphan.length} orphan generated artifacts`);
  if (generatedArtifacts.untracked.length > 0) failures.push(`${generatedArtifacts.untracked.length} untracked generated artifacts`);
  if (generatedArtifacts.invalid.length > 0) failures.push(`${generatedArtifacts.invalid.length} invalid generated artifacts`);
  return failures;
}

function requireVerificationStatus(status) {
  if (status === null || typeof status !== "object" || Array.isArray(status)) {
    throw new Error("Porter verification status must be an object");
  }
  for (const key of requiredVerificationFields) {
    if (status[key] === undefined) throw new Error(`Porter verification status.${key} is required`);
  }
  if (status.counts === null || typeof status.counts !== "object" || Array.isArray(status.counts)) {
    throw new Error("Porter verification status.counts must be an object");
  }
  for (const key of [
    "duplicateGoIDs", "duplicateTsIDs", "forbiddenTsFiles", "generatedSourcePolicyIssues", "invalidTsMetadata",
    "largeFileSplitFailures", "missing", "orphan", "sourceInterpretationIssues", "splitPathMismatches", "stale",
    "stubbed", "untrackedTsFiles",
  ]) {
    if (!Number.isSafeInteger(status.counts[key]) || status.counts[key] < 0) {
      throw new Error(`Porter verification status.counts.${key} must be a non-negative safe integer`);
    }
  }
}

function requireIssueArray(status, key, label) {
  if (status === null || typeof status !== "object" || Array.isArray(status) || !Array.isArray(status[key])) {
    throw new Error(`${label}.${key} must be an array`);
  }
}
