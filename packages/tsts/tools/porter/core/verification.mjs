import { collectBundledArtifactFailures, emptyBundledGeneratedArtifactStatus } from "../../bundled/generate-bundled.mjs";
import { collectUnicodeArtifactFailures, emptyUnicodeGeneratedArtifactStatus } from "../../unicode/generate-unicode-data.mjs";
import { collectAstArtifactFailures, emptyAstGeneratedArtifactStatus } from "../ast-generator.mjs";
import { collectDiagnosticsArtifactFailures, emptyDiagnosticsGeneratedArtifactStatus } from "../diagnostics-generator.mjs";
import { collectGeneratedSourceCoverageFailures, collectGlobalGeneratedArtifactFailures } from "../generated-source.mjs";
import { collectSourcePinFailures, emptySourcePinStatus } from "../source-pin.mjs";
import { emptyGeneratedArtifactStatus } from "./generated-artifacts.mjs";
import { emptyLocalOverrideStatus } from "./local-overrides.mjs";
import { auditExecutionLabel, declarationAuditEntries } from "./declaration-audits.mjs";
import { fail } from "./runtime.mjs";
import { collectSchemaSourceSyncFailures, emptySchemaSourceSyncStatus } from "./status.mjs";

export function verifyStatus(status, options) {
  const failures = collectVerifyFailures(status, options);
  if (failures.length > 0) {
    fail(`porter verify failed: ${failures.join(", ")}`);
  }
  console.log("porter verify passed");
}

export function collectVerifyFailures(status, options = {}) {
  const strictPort = options["strict-port"] === true;
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
  if ((status.counts.largeFileSplitFailures ?? 0) > 0) failures.push(`${status.counts.largeFileSplitFailures} large-file split plan failures`);
  if ((status.counts.splitPathMismatches ?? 0) > 0) failures.push(`${status.counts.splitPathMismatches} units outside their semantic split targets`);
  if (status.counts.orphan > 0) failures.push(`${status.counts.orphan} orphan TS units`);
  if (status.counts.forbiddenTsFiles > 0) failures.push(`${status.counts.forbiddenTsFiles} forbidden TS files`);
  if (status.counts.untrackedTsFiles > 0) failures.push(`${status.counts.untrackedTsFiles} TS files without @tsgo-unit metadata`);
  if (status.counts.stale > 0) failures.push(`${status.counts.stale} stale TS units`);
  if ((status.counts.generatedSourcePolicyIssues ?? 0) > 0) {
    failures.push(`${status.counts.generatedSourcePolicyIssues} generated source policy issues`);
  }
  if ((status.counts.invalidTsMetadata ?? 0) > 0) failures.push(`${status.counts.invalidTsMetadata} invalid @tsgo-unit metadata entries`);
  failures.push(...collectGeneratedSourceCoverageFailures(status.generatedSourceCoverage ?? { issues: [] }));
  failures.push(...collectGlobalGeneratedArtifactFailures(status.globalGeneratedArtifacts ?? { issues: [] }));
  if ((status.counts.sourceInterpretationIssues ?? 0) > 0) {
    failures.push(`${status.counts.sourceInterpretationIssues} unresolved Go source interpretation issues`);
  }
  failures.push(...collectSourcePinFailures(status.sourcePin ?? emptySourcePinStatus()));
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
  if ((status.jsonTagCheck?.mismatches ?? 0) > 0) {
    const byKind = Object.entries(status.jsonTagCheck.byKind ?? {})
      .sort((a, b) => b[1] - a[1])
      .map(([kind, count]) => `${kind}=${count}`)
      .join(", ");
    failures.push(`${status.jsonTagCheck.mismatches} Go struct JSON-tag mismatches${byKind ? ` (${byKind})` : ""}`);
  }
  if ((status.counts.embeddedSourceMismatches ?? 0) > 0) {
    const examples = (status.embeddedSourceMismatches ?? []).slice(0, 3).map((issue) => issue.name).join(", ");
    failures.push(`${status.counts.embeddedSourceMismatches} stale or missing embedded Go source blocks${examples ? ` (${examples})` : ""}`);
  }
  if (strictPort && status.counts.missing > 0) failures.push(`${status.counts.missing} missing Go units`);
  if (strictPort && status.counts.stubbed > 0) failures.push(`${status.counts.stubbed} stub Go units`);
  return failures;
}

export function collectLocalOverrideFailures(status) {
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
  const failures = [];
  if (generatedArtifacts.missing.length > 0) failures.push(`${generatedArtifacts.missing.length} missing generated artifacts`);
  if (generatedArtifacts.stale.length > 0) failures.push(`${generatedArtifacts.stale.length} stale generated artifacts`);
  if (generatedArtifacts.orphan.length > 0) failures.push(`${generatedArtifacts.orphan.length} orphan generated artifacts`);
  if (generatedArtifacts.untracked.length > 0) failures.push(`${generatedArtifacts.untracked.length} untracked generated artifacts`);
  if (generatedArtifacts.invalid.length > 0) failures.push(`${generatedArtifacts.invalid.length} invalid generated artifacts`);
  return failures;
}
