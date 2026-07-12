import { collectBundledArtifactFailures } from "../../bundled/generate-bundled.mjs";
import { collectUnicodeArtifactFailures } from "../../unicode/generate-unicode-data.mjs";
import { collectAstArtifactFailures } from "../ast-generator.mjs";
import { collectDiagnosticsArtifactFailures } from "../diagnostics-generator.mjs";
import { collectGeneratedSourceCoverageFailures, collectGlobalGeneratedArtifactFailures } from "../generated-source.mjs";
import { collectSourcePinFailures } from "../source-pin.mjs";
import { auditExecutionLabel, declarationAuditEntries } from "./declaration-audits.mjs";
import { fail } from "./runtime.mjs";
import { collectSchemaSourceSyncFailures } from "./status.mjs";
import { requireExactPlainObject, requireExactPorterStatus } from "./status-contract.mjs";

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
  if (status.signatureCheck.overrideIssueCount > 0) {
    failures.push(`${status.signatureCheck.overrideIssueCount} signature override metadata issues`);
  }
  if (status.signatureCheck.mismatchCount > 0) {
    const byKind = Object.entries(status.signatureCheck.byKind ?? {})
      .sort((a, b) => b[1] - a[1])
      .map(([kind, count]) => `${kind}=${count}`)
      .join(", ");
    failures.push(`${status.signatureCheck.mismatchCount} signature/type mismatches${byKind ? ` (${byKind})` : ""}`);
  }
  if (status.jsonTagCheck.mismatchCount > 0) {
    const byKind = Object.entries(status.jsonTagCheck.byKind ?? {})
      .sort((a, b) => b[1] - a[1])
      .map(([kind, count]) => `${kind}=${count}`)
      .join(", ");
    failures.push(`${status.jsonTagCheck.mismatchCount} Go struct JSON-tag mismatches${byKind ? ` (${byKind})` : ""}`);
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
  requireExactPorterStatus(status);
  requireCompleteSignatureAudit(status.signatureCheck);
  requireCompleteJsonTagAudit(status.jsonTagCheck);
}

function requireCompleteSignatureAudit(audit) {
  if (audit?.state === "not-run") {
    requireExactPlainObject(audit, [
      "ambientReferenceRelations", "authoredFacades", "declarationOwnership", "externalPackageSurface", "reason", "state",
      "selection", "typeEquivalenceRelations", "typeStoragePolicies", "untrackedTypeScript",
    ], "Porter status.signatureCheck");
    requireNotRunReason(audit, "Porter status.signatureCheck");
    requireSignatureSelection(audit.selection);
    for (const key of ["ambientReferenceRelations", "authoredFacades", "declarationOwnership", "externalPackageSurface", "typeEquivalenceRelations", "typeStoragePolicies", "untrackedTypeScript"]) {
      requireNotRunAudit(audit[key], `Porter status.signatureCheck.${key}`);
    }
    return;
  }
  requireExactPlainObject(audit, [
    "ambientReferenceRelations", "authoredFacades", "byKind", "checked", "declarationOwnership", "descriptors",
    "externalPackageSurface", "mismatchCount", "mismatches", "overrideIssueCount", "overrideIssues", "overriddenUnits",
    "selection", "state", "typeEquivalenceRelations", "typeStoragePolicies", "untrackedTypeScript",
  ], "Porter status.signatureCheck");
  if (audit.state !== "complete") throw new Error("Porter status.signatureCheck.state must be 'complete'");
  requireSignatureSelection(audit.selection);
  for (const key of ["checked", "descriptors", "mismatchCount", "overrideIssueCount", "overriddenUnits"]) requireCount(audit[key], `Porter status.signatureCheck.${key}`);
  requireEvidenceArray(audit.mismatches, "Porter status.signatureCheck.mismatches", "kind");
  requireEvidenceArray(audit.overrideIssues, "Porter status.signatureCheck.overrideIssues", "reason");
  if (audit.mismatchCount !== audit.mismatches.length) throw new Error("Porter status.signatureCheck.mismatchCount does not match mismatch evidence");
  if (audit.overrideIssueCount !== audit.overrideIssues.length) throw new Error("Porter status.signatureCheck.overrideIssueCount does not match override evidence");
  requireByKind(audit.byKind, audit.mismatches, "Porter status.signatureCheck.byKind");
  requireAuthoredFacadeAudit(audit.authoredFacades);
  requireInventoryAudit(audit.externalPackageSurface, ["checked", "inventory", "mismatchCount", "resolvedProfileCount", "state", "unresolvedProfileCount"], "externalPackageSurface");
  for (const key of ["typeStoragePolicies", "typeEquivalenceRelations", "ambientReferenceRelations", "declarationOwnership"]) {
    requireInventoryAudit(audit[key], ["checked", "inventory", "mismatchCount", "state"], key);
  }
  requireUntrackedTypeScriptAudit(audit.untrackedTypeScript);
}

function requireSignatureSelection(selection) {
  if (selection?.kind === "all-active") {
    requireExactPlainObject(selection, ["kind"], "Porter status.signatureCheck.selection");
    return;
  }
  if (selection?.kind === "id-filter") {
    requireExactPlainObject(selection, ["kind", "matchedUnitCount", "pattern"], "Porter status.signatureCheck.selection");
    requireCount(selection.matchedUnitCount, "Porter status.signatureCheck.selection.matchedUnitCount");
    if (typeof selection.pattern !== "string" || selection.pattern.length === 0) throw new Error("Porter status.signatureCheck.selection.pattern must be non-empty");
    return;
  }
  throw new Error("Porter status.signatureCheck.selection.kind is invalid");
}

function requireCompleteJsonTagAudit(audit) {
  if (audit?.state === "not-run") return requireNotRunAudit(audit, "Porter status.jsonTagCheck");
  requireExactPlainObject(audit, ["byKind", "contractFields", "contractUnits", "mismatchCount", "mismatches", "state", "taggedFields", "taggedUnits"], "Porter status.jsonTagCheck");
  if (audit.state !== "complete") throw new Error("Porter status.jsonTagCheck.state must be 'complete'");
  for (const key of ["contractFields", "contractUnits", "mismatchCount", "taggedFields", "taggedUnits"]) requireCount(audit[key], `Porter status.jsonTagCheck.${key}`);
  requireEvidenceArray(audit.mismatches, "Porter status.jsonTagCheck.mismatches", "kind");
  if (audit.mismatchCount !== audit.mismatches.length) throw new Error("Porter status.jsonTagCheck.mismatchCount does not match mismatch evidence");
  requireByKind(audit.byKind, audit.mismatches, "Porter status.jsonTagCheck.byKind");
}

function requireAuthoredFacadeAudit(audit) {
  if (audit?.state === "not-run") return requireNotRunAudit(audit, "Porter status.signatureCheck.authoredFacades");
  const arrays = ["constructors", "methodBindings", "privateStorageMembers", "tsOnlyMembers", "unselectedGoMembers"];
  const counts = ["constructorCount", "methodBindingCount", "privateStorageMemberCount", "tsOnlyMemberCount", "unselectedGoMemberCount"];
  requireExactPlainObject(audit, ["checked", "mismatchCount", "state", ...arrays, ...counts], "Porter status.signatureCheck.authoredFacades");
  if (audit.state !== "complete") throw new Error("Porter status.signatureCheck.authoredFacades.state must be 'complete'");
  requireCount(audit.checked, "authoredFacades.checked");
  requireCount(audit.mismatchCount, "authoredFacades.mismatchCount");
  for (let index = 0; index < arrays.length; index++) {
    if (!Array.isArray(audit[arrays[index]])) throw new Error(`authoredFacades.${arrays[index]} must be an array`);
    requireCount(audit[counts[index]], `authoredFacades.${counts[index]}`);
    if (audit[counts[index]] !== audit[arrays[index]].length) throw new Error(`authoredFacades.${counts[index]} does not match ${arrays[index]}`);
  }
}

function requireInventoryAudit(audit, keys, name) {
  if (audit?.state === "not-run") return requireNotRunAudit(audit, `Porter status.signatureCheck.${name}`);
  requireExactPlainObject(audit, keys, `Porter status.signatureCheck.${name}`);
  if (audit.state !== "complete") throw new Error(`Porter status.signatureCheck.${name}.state must be 'complete'`);
  if (!Array.isArray(audit.inventory)) throw new Error(`${name}.inventory must be an array`);
  for (const key of keys.filter((key) => key.endsWith("Count") || key === "checked")) requireCount(audit[key], `${name}.${key}`);
  requireCount(audit.mismatchCount, `${name}.mismatchCount`);
  if (audit.checked !== audit.inventory.length) throw new Error(`${name}.checked does not match its inventory`);
}

function requireUntrackedTypeScriptAudit(audit) {
  if (audit?.state === "not-run") return requireNotRunAudit(audit, "Porter status.signatureCheck.untrackedTypeScript");
  const arrays = ["exportedDeclarations", "privateDeclarations", "reExports", "reviewedDeclarations", "reviewedRoutes", "testParityFiles"];
  const counts = ["exportedDeclarationCount", "privateDeclarationCount", "reExportCount", "reviewedDeclarationCount", "reviewedRouteCount", "testParityFileCount"];
  requireExactPlainObject(audit, ["mismatchCount", "state", "testParityDeclarationCount", ...arrays, ...counts], "Porter status.signatureCheck.untrackedTypeScript");
  if (audit.state !== "complete") throw new Error("Porter status.signatureCheck.untrackedTypeScript.state must be 'complete'");
  requireCount(audit.mismatchCount, "untrackedTypeScript.mismatchCount");
  requireCount(audit.testParityDeclarationCount, "untrackedTypeScript.testParityDeclarationCount");
  for (let index = 0; index < arrays.length; index++) {
    if (!Array.isArray(audit[arrays[index]])) throw new Error(`untrackedTypeScript.${arrays[index]} must be an array`);
    requireCount(audit[counts[index]], `untrackedTypeScript.${counts[index]}`);
    if (audit[counts[index]] !== audit[arrays[index]].length) throw new Error(`untrackedTypeScript.${counts[index]} does not match ${arrays[index]}`);
  }
  const declarationCount = audit.testParityFiles.reduce((count, file) => count + (Number.isSafeInteger(file?.declarationCount) ? file.declarationCount : Number.NaN), 0);
  if (declarationCount !== audit.testParityDeclarationCount) throw new Error("untrackedTypeScript.testParityDeclarationCount does not match testParityFiles");
}

function requireEvidenceArray(value, label, requiredKey) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  for (const [index, row] of value.entries()) {
    if (row === null || typeof row !== "object" || Array.isArray(row) || typeof row[requiredKey] !== "string" || row[requiredKey].length === 0) {
      throw new Error(`${label}[${index}] must be a concrete evidence object with ${requiredKey}`);
    }
  }
}

function requireByKind(value, rows, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) || ![Object.prototype, null].includes(Object.getPrototypeOf(value))) throw new Error(`${label} must be one plain object`);
  const expected = {};
  for (const row of rows) expected[row.kind] = (expected[row.kind] ?? 0) + 1;
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`${label} does not match concrete mismatch evidence`);
}

function requireCount(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`);
}

function requireNotRunAudit(audit, label) {
  requireExactPlainObject(audit, ["reason", "state"], label);
  requireNotRunReason(audit, label);
}

function requireNotRunReason(audit, label) {
  if (audit.state !== "not-run" || typeof audit.reason !== "string" || audit.reason.trim() === "") {
    throw new Error(`${label} must carry exact not-run evidence`);
  }
}

function requireIssueArray(status, key, label) {
  if (status === null || typeof status !== "object" || Array.isArray(status) || !Array.isArray(status[key])) {
    throw new Error(`${label}.${key} must be an array`);
  }
}
