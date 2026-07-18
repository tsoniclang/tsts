import path from "node:path";
import process from "node:process";
import {
  fail,
  loadConfig,
  parseArgs,
  repoRoot,
  resolveRepo,
  writeJson,
  writeJsonSafely,
  writeText,
} from "./common.mjs";
import {
  buildLocalOverrideStatus,
  buildSchemaSourceSyncStatus,
  buildStatus,
  collectSchemaSourceSyncFailures,
  runScan,
  scanTsUnits,
} from "./scan-status.mjs";
import { buildGeneratedArtifactStatus } from "./generated-status.mjs";
import {
  buildDraftLargeFileSplitPlan,
  buildLargeFileSplitStatus,
  printLargeFileSplitStatus,
  splitPlanLabel,
  verifyLargeFileSplitStatus,
} from "./large-file-splits.mjs";
import { writeExternalFacades } from "./external-facade-render.mjs";
import {
  collectGeneratedArtifactFailures,
  printScanSummary,
  printStatus,
  renderStatusMarkdown,
  verifyStatus,
} from "./reporting.mjs";
import {
  checkSkeletons,
  scaffoldMissing,
} from "./scaffold.mjs";
import { computeSignatureReport } from "../sig-check.mjs";
import {
  buildAstGeneratedArtifactStatus,
  collectAstArtifactFailures,
  writeAstGenerated,
} from "../ast-generator.mjs";
import {
  buildDiagnosticsGeneratedArtifactStatus,
  collectDiagnosticsArtifactFailures,
  writeDiagnosticsGenerated,
} from "../diagnostics-generator.mjs";
import { buildBundledGeneratedArtifactStatus } from "../../bundled/generate-bundled.mjs";
import { buildUnicodeGeneratedArtifactStatus } from "../../unicode/generate-unicode-data.mjs";

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

  fail(`unknown command '${command}'. Expected scan, status, verify, sig-check, scaffold, facades, large-files, ast, diagnostics, or skeleton-check.`);
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
