import path from "node:path";

import {
  countsByModule,
  escapeMd,
  fail,
  repoRoot,
  resolveRepo,
} from "./common.mjs";
import { expectedTsPath } from "./policy.mjs";
import {
  collectSchemaSourceSyncFailures,
  emptyLocalOverrideStatus,
  emptySchemaSourceSyncStatus,
} from "./scan-status.mjs";
import { emptyGeneratedArtifactStatus } from "./generated-status.mjs";
import {
  collectAstArtifactFailures,
  emptyAstGeneratedArtifactStatus,
} from "../ast-generator.mjs";
import {
  collectDiagnosticsArtifactFailures,
  emptyDiagnosticsGeneratedArtifactStatus,
} from "../diagnostics-generator.mjs";
import {
  collectBundledArtifactFailures,
  emptyBundledGeneratedArtifactStatus,
} from "../../bundled/generate-bundled.mjs";
import {
  collectUnicodeArtifactFailures,
  emptyUnicodeGeneratedArtifactStatus,
} from "../../unicode/generate-unicode-data.mjs";

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
