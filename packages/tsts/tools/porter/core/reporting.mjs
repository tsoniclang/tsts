import { collectBundledArtifactFailures } from "../../bundled/generate-bundled.mjs";
import { collectDiagnosticsArtifactFailures } from "../diagnostics-generator.mjs";
import { escapeMd, repoRoot, resolveRepo } from "./runtime.mjs";
import { appendSignatureAuditMarkdown, signatureAuditSummaryLines } from "./signature-reporting.mjs";
import { collectGeneratedArtifactFailures } from "./verification.mjs";
import { collectGoValueOperationArtifactFailures } from "./value-operations/generated-artifacts.mjs";
import path from "node:path";

export function printScanSummary(config, snapshot) {
  console.log(`TS-Go ${snapshot.gitRevision.slice(0, 12)}`);
  console.log(`Go files: ${snapshot.summary.goFileCount}`);
  console.log(`Lines: ${snapshot.summary.lineCount}`);
  console.log(`Units: ${snapshot.summary.unitCount}`);
  console.log(`Struct tags: ${snapshot.summary.structTagCount} fields (${Object.entries(snapshot.summary.structTagKeyCounts).map(([key, count]) => `${key}=${count}`).join(", ")})`);
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
  console.log(`Generated source mechanisms files/mechanisms/issues: ${status.generatedSourcePolicies.relevantFileCount}/${status.generatedSourcePolicies.mechanismCount}/${status.counts.generatedSourcePolicyIssues}`);
  console.log(`Generated source coverage issues: ${status.counts.generatedSourceCoverageIssues}`);
  console.log(`Source pin/provenance issues: ${status.counts.sourcePinIssues}`);
  console.log(`Invalid @tsgo-unit metadata: ${status.counts.invalidTsMetadata}`);
  console.log(`Global generated-artifact providers/issues: ${status.globalGeneratedArtifacts.providerCount}/${status.counts.globalGeneratedArtifactIssues}`);
  console.log(`Go source interpretation issues: ${status.counts.sourceInterpretationIssues}`);
  console.log(`Generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingGeneratedArtifacts}/${status.counts.staleGeneratedArtifacts}/${status.counts.orphanGeneratedArtifacts}/${status.counts.untrackedGeneratedArtifacts}/${status.counts.invalidGeneratedArtifacts}`);
  console.log(`AST generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingAstArtifacts}/${status.counts.staleAstArtifacts}/${status.counts.orphanAstArtifacts}/${status.counts.untrackedAstArtifacts}/${status.counts.invalidAstArtifacts}`);
  console.log(`Diagnostics generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingDiagnosticsArtifacts}/${status.counts.staleDiagnosticsArtifacts}/${status.counts.orphanDiagnosticsArtifacts}/${status.counts.untrackedDiagnosticsArtifacts}/${status.counts.invalidDiagnosticsArtifacts}`);
  console.log(`Bundled generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingBundledArtifacts}/${status.counts.staleBundledArtifacts}/${status.counts.orphanBundledArtifacts}/${status.counts.untrackedBundledArtifacts}/${status.counts.invalidBundledArtifacts}`);
  console.log(`Unicode generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingUnicodeArtifacts}/${status.counts.staleUnicodeArtifacts}/${status.counts.orphanUnicodeArtifacts}/${status.counts.untrackedUnicodeArtifacts}/${status.counts.invalidUnicodeArtifacts}`);
  console.log(`Go value-operation generated artifact audit: ${status.valueOperationGeneratedArtifacts.state}`);
  console.log(`Go value-operation generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingValueOperationGeneratedArtifacts}/${status.counts.staleValueOperationGeneratedArtifacts}/${status.counts.orphanValueOperationGeneratedArtifacts}/${status.counts.untrackedValueOperationGeneratedArtifacts}/${status.counts.invalidValueOperationGeneratedArtifacts}`);
  console.log(`Large-file split plan failures: ${status.counts.largeFileSplitFailures}`);
  const localOverrides = status.localOverrides;
  console.log(`Local overrides inline/signature/initializer/value-order/issues: ${localOverrides.inline}/${localOverrides.byAllow.signature ?? 0}/${localOverrides.byAllow.initializer ?? 0}/${localOverrides.byAllow["value-order"] ?? 0}/${localOverrides.failureCount}`);
  for (const line of signatureAuditSummaryLines(status)) console.log(line);
  console.log(`Schema file policy issues: ${status.counts.schemaFilePolicyIssues}`);
  console.log(`Schema/source sync mismatches: ${status.counts.schemaSourceMismatches}`);
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
  lines.push(`- Generated source mechanisms files/mechanisms/issues: ${status.generatedSourcePolicies.relevantFileCount}/${status.generatedSourcePolicies.mechanismCount}/${status.counts.generatedSourcePolicyIssues}`);
  lines.push(`- Generated source coverage issues: ${status.counts.generatedSourceCoverageIssues}`);
  lines.push(`- Source pin/provenance issues: ${status.counts.sourcePinIssues}`);
  lines.push(`- Invalid @tsgo-unit metadata: ${status.counts.invalidTsMetadata}`);
  lines.push(`- Global generated-artifact providers/issues: ${status.globalGeneratedArtifacts.providerCount}/${status.counts.globalGeneratedArtifactIssues}`);
  lines.push(`- Go source interpretation issues: ${status.counts.sourceInterpretationIssues}`);
  lines.push(`- Generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingGeneratedArtifacts}/${status.counts.staleGeneratedArtifacts}/${status.counts.orphanGeneratedArtifacts}/${status.counts.untrackedGeneratedArtifacts}/${status.counts.invalidGeneratedArtifacts}`);
  lines.push(`- AST generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingAstArtifacts}/${status.counts.staleAstArtifacts}/${status.counts.orphanAstArtifacts}/${status.counts.untrackedAstArtifacts}/${status.counts.invalidAstArtifacts}`);
  lines.push(`- Diagnostics generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingDiagnosticsArtifacts}/${status.counts.staleDiagnosticsArtifacts}/${status.counts.orphanDiagnosticsArtifacts}/${status.counts.untrackedDiagnosticsArtifacts}/${status.counts.invalidDiagnosticsArtifacts}`);
  lines.push(`- Bundled generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingBundledArtifacts}/${status.counts.staleBundledArtifacts}/${status.counts.orphanBundledArtifacts}/${status.counts.untrackedBundledArtifacts}/${status.counts.invalidBundledArtifacts}`);
  lines.push(`- Unicode generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingUnicodeArtifacts}/${status.counts.staleUnicodeArtifacts}/${status.counts.orphanUnicodeArtifacts}/${status.counts.untrackedUnicodeArtifacts}/${status.counts.invalidUnicodeArtifacts}`);
  lines.push(`- Go value-operation generated artifact audit: ${status.valueOperationGeneratedArtifacts.state}`);
  lines.push(`- Go value-operation generated artifacts missing/stale/orphan/untracked/invalid: ${status.counts.missingValueOperationGeneratedArtifacts}/${status.counts.staleValueOperationGeneratedArtifacts}/${status.counts.orphanValueOperationGeneratedArtifacts}/${status.counts.untrackedValueOperationGeneratedArtifacts}/${status.counts.invalidValueOperationGeneratedArtifacts}`);
  lines.push(`- Large-file split plan failures: ${status.counts.largeFileSplitFailures}`);
  const localOverrides = status.localOverrides;
  lines.push(`- Local overrides inline/signature/initializer/value-order/issues: ${localOverrides.inline}/${localOverrides.byAllow.signature ?? 0}/${localOverrides.byAllow.initializer ?? 0}/${localOverrides.byAllow["value-order"] ?? 0}/${localOverrides.failureCount}`);
  for (const line of signatureAuditSummaryLines(status)) lines.push(`- ${line}`);
  lines.push(`- Schema file policy issues: ${status.counts.schemaFilePolicyIssues}`);
  lines.push(`- Schema/source sync mismatches: ${status.counts.schemaSourceMismatches}`);
  lines.push(`- Unitless Go files: ${status.counts.unitlessGoFiles}`);
  appendSignatureAuditMarkdown(lines, status);
  lines.push("");
  lines.push("## Categories");
  lines.push("");
  lines.push("| Category | Units |");
  lines.push("|---|---:|");
  for (const [name, count] of Object.entries(status.categories)) {
    lines.push(`| ${name} | ${count} |`);
  }
  lines.push("");
  lines.push("## Local Override Inventory");
  lines.push("");
  lines.push("| Unit | Category | Allowed Exception | Reason |");
  lines.push("|---|---|---|---|");
  for (const override of localOverrides.units) {
    lines.push(`| ${escapeMd(override.id)} | ${escapeMd(override.category)} | ${escapeMd(override.allow.join(", "))} | ${escapeMd(override.reason)} |`);
  }
  if (localOverrides.units.length === 0) lines.push("| _None_ |  |  |  |");
  lines.push("");
  lines.push("## Missing Modules");
  lines.push("");
  lines.push("| Module | Units |");
  lines.push("|---|---:|");
  for (const [name, count] of Object.entries(status.missingModules).sort((a, b) => b[1] - a[1])) {
    lines.push(`| ${name} | ${count} |`);
  }
  lines.push("");
  lines.push("## Coverage Diagnostics");
  lines.push("");
  lines.push(`- Go files with no top-level units: ${status.counts.unitlessGoFiles}`);
  lines.push(`- Forbidden TypeScript files: ${status.counts.forbiddenTsFiles}`);
  lines.push(`- TypeScript files without unit metadata: ${status.counts.untrackedTsFiles}`);
  lines.push(`- Generated artifact defects: ${status.counts.missingGeneratedArtifacts + status.counts.staleGeneratedArtifacts + status.counts.orphanGeneratedArtifacts + status.counts.untrackedGeneratedArtifacts + status.counts.invalidGeneratedArtifacts}`);
  lines.push(`- Bundled generated artifact defects: ${status.counts.missingBundledArtifacts + status.counts.staleBundledArtifacts + status.counts.orphanBundledArtifacts + status.counts.untrackedBundledArtifacts + status.counts.invalidBundledArtifacts}`);
  lines.push(`- Go value-operation generated artifact defects: ${status.counts.missingValueOperationGeneratedArtifacts + status.counts.staleValueOperationGeneratedArtifacts + status.counts.orphanValueOperationGeneratedArtifacts + status.counts.untrackedValueOperationGeneratedArtifacts + status.counts.invalidValueOperationGeneratedArtifacts}`);
  lines.push(`- Large-file split plan failures: ${status.counts.largeFileSplitFailures}`);
  lines.push(`- Units outside semantic split targets: ${status.counts.splitPathMismatches}`);
  if (status.largeFileSplits.files.length > 0) {
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
  if (status.largeFileSplits.issues.length > 0) {
    lines.push("");
    lines.push("### Large-File Split Plan Issues");
    lines.push("");
    lines.push("| Go path | Issue | Declaration | Target | Message |");
    lines.push("|---|---|---|---|---|");
    for (const issue of status.largeFileSplits.issues.slice(0, 100)) {
      lines.push(`| ${issue.file} | ${issue.kind} | ${escapeMd(issue.declaration ?? "")} | ${escapeMd(issue.target ?? "")} | ${escapeMd(issue.message)} |`);
    }
  }
  if (status.splitPathMismatches.length > 0) {
    lines.push("");
    lines.push("### Semantic Split Placement Mismatches");
    lines.push("");
    lines.push("| Unit | Expected TS path | Actual TS path |");
    lines.push("|---|---|---|");
    for (const issue of status.splitPathMismatches.slice(0, 100)) {
      lines.push(`| ${escapeMd(issue.id)} | ${issue.expectedPath} | ${issue.actualPath} |`);
    }
  }
  if (status.localOverrides.failureCount > 0) {
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
  const valueOperationArtifacts = status.valueOperationGeneratedArtifacts;
  if (collectGoValueOperationArtifactFailures(valueOperationArtifacts).length > 0) {
    lines.push("");
    lines.push("### Go Value-Operation Generated Artifact Defects");
    lines.push("");
    if (valueOperationArtifacts.state !== "complete") {
      lines.push(`- Audit not run: ${valueOperationArtifacts.reason}`);
    } else {
      lines.push("| Status | Path | Reason |");
      lines.push("|---|---|---|");
      for (const disposition of ["missing", "stale", "orphan", "untracked", "invalid"]) {
        for (const artifact of valueOperationArtifacts[disposition].slice(0, 100)) {
          lines.push(`| ${disposition} | ${artifact.path} | ${artifact.reason} |`);
        }
      }
    }
  }
  const bundledArtifacts = status.bundledGeneratedArtifacts;
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
  const diagnosticsArtifacts = status.diagnosticsGeneratedArtifacts;
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
