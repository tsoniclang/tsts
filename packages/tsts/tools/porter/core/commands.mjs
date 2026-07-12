import { buildBundledGeneratedArtifactStatus, collectBundledArtifactFailures, writeBundledGenerated } from "../../bundled/generate-bundled.mjs";
import { buildUnicodeGeneratedArtifactStatusDeep, collectUnicodeArtifactFailures, writeUnicodeGenerated } from "../../unicode/generate-unicode-data.mjs";
import { buildAstGeneratedArtifactStatus, collectAstArtifactFailures, writeAstGenerated } from "../ast-generator.mjs";
import { buildDiagnosticsGeneratedArtifactStatus, collectDiagnosticsArtifactFailures, writeDiagnosticsGenerated } from "../diagnostics-generator.mjs";
import { renderGeneratedSourceCoverage } from "../generated-source.mjs";
import { computeSignatureReport } from "../sig-check.mjs";
import { runDelta, runDeltaVerify } from "./delta-command.mjs";
import { writeExternalFacades } from "./facade-artifacts.mjs";
import { prepareExternalFacadeStorageCatalog } from "./authored-facade-selections.mjs";
import { buildGeneratedArtifactStatus } from "./generated-artifacts.mjs";
import { buildDraftLargeFileSplitPlan, buildLargeFileSplitStatus, printLargeFileSplitStatus, splitPlanLabel, verifyLargeFileSplitStatus } from "./large-files.mjs";
import { printScanSummary, printStatus, renderStatusMarkdown } from "./reporting.mjs";
import { fail, loadConfig, parseArgs, repoRoot, resolveRepo, writeJson, writeJsonSafely, writeText, writeTextSafely } from "./runtime.mjs";
import { checkSkeletons, scaffoldMissing } from "./scaffolding.mjs";
import { runSigCheck, summarizeJsonTagReport, summarizeSignatureReport } from "./signature-command.mjs";
import { runPinnedScan, runScan } from "./scan-runner.mjs";
import { buildSchemaSourceSyncStatus, collectSchemaSourceSyncFailures } from "./status.mjs";
import { collectGeneratedArtifactFailures, verifyStatus } from "./verification.mjs";
import { prepareDeclarationAuditPrerequisites } from "./declaration-prerequisites.mjs";
import { preparePorterWorkspaceState } from "./workspace-state.mjs";
import process from "node:process";

export async function main() {
  const [command = "status", ...args] = process.argv.slice(2);
  const options = parseArgs(command, args);
  const config = loadConfig();

  if (command === "delta") {
    runDelta(config, options);
    return;
  }

  if (command === "delta-verify") {
    runDeltaVerify(config, options);
    return;
  }

  if (command === "generated-source-coverage") {
    const snapshot = runPinnedScan(config);
    const relativePath = config.generatedSourceCoveragePath ?? "packages/tsts/generated-source-coverage.json";
    const outcome = writeTextSafely(
      resolveRepo(relativePath),
      renderGeneratedSourceCoverage(snapshot),
      { force: options.force === true, label: "generated-source coverage evidence" },
    );
    console.log(`${outcome}: ${relativePath}`);
    return;
  }

  if (command === "bundled") {
    const snapshot = runPinnedScan(config);
    if (options.write === true) {
      const count = writeBundledGenerated(config, snapshot.gitRevision);
      console.log(`bundled generated files written (${count - 2} libs)`);
    } else {
      const status = buildBundledGeneratedArtifactStatus(config, snapshot.gitRevision);
      const failures = collectBundledArtifactFailures(status);
      if (failures.length > 0) fail(`bundled generated artifact check failed: ${failures.join(", ")}`);
      console.log("bundled generated artifact check passed");
    }
    return;
  }

  if (command === "unicode") {
    runPinnedScan(config);
    if (options.write === true) {
      const count = await writeUnicodeGenerated();
      console.log(`unicode generated files written (${count})`);
    } else {
      const status = await buildUnicodeGeneratedArtifactStatusDeep(config);
      const failures = collectUnicodeArtifactFailures(status);
      if (failures.length > 0) fail(`unicode generated artifact check failed: ${failures.join(", ")}`);
      console.log("unicode generated artifact check passed");
    }
    return;
  }

  if (command === "sig-check") {
    await runSigCheck(config, options);
    return;
  }

  if (command === "scan") {
    const snapshot = runPinnedScan(config);
    writeJson(resolveRepo(config.snapshotOut), snapshot);
    printScanSummary(config, snapshot);
    return;
  }

  if (command === "facades") {
    const snapshot = runPinnedScan(config);
    const facades = await prepareExternalFacadeStorageCatalog(config, snapshot, repoRoot);
    writeJson(resolveRepo(config.snapshotOut), snapshot);
    if (options.check === true) {
      const generatedArtifacts = buildGeneratedArtifactStatus(config, snapshot, facades);
      const failures = collectGeneratedArtifactFailures(generatedArtifacts);
      if (failures.length > 0) {
        fail(`generated facade check failed: ${failures.join(", ")}`);
      }
      console.log("generated facade check passed");
      return;
    }
    writeExternalFacades(config, snapshot, facades, options);
    return;
  }

  if (command === "large-files") {
    const snapshot = runPinnedScan(config);
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
    const snapshot = runPinnedScan(config);
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
    const snapshot = runPinnedScan(config);
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
    const snapshot = command === "status" || command === "verify" ? runScan(config) : runPinnedScan(config);
    const workspace = await preparePorterWorkspaceState({
      config,
      repositoryRoot: repoRoot,
      snapshot,
      unicodeMode: command === "verify" ? "deep" : "metadata",
    });
    const { externalFacadeCatalog, status } = workspace;
    if (command === "verify") {
      const prerequisites = await prepareDeclarationAuditPrerequisites(workspace);
      const signatureReport = await computeSignatureReport(prerequisites);
      status.signatureCheck = summarizeSignatureReport(signatureReport);
      status.jsonTagCheck = summarizeJsonTagReport(signatureReport.jsonTags);
    }
    writeJson(resolveRepo(config.snapshotOut), snapshot);
    writeJson(resolveRepo(config.statusOut), status);
    writeText(resolveRepo(config.reportOut), renderStatusMarkdown(status));
    printStatus(config, status);

    if (command === "verify") {
      verifyStatus(status);
      return;
    }
    if (command === "scaffold") {
      await scaffoldMissing(config, status, snapshot, externalFacadeCatalog, options);
      return;
    }
    if (command === "skeleton-check") {
      checkSkeletons(config, status, snapshot, externalFacadeCatalog, options);
      return;
    }
    return;
  }

  fail(`unknown command '${command}'. Expected delta, delta-verify, generated-source-coverage, bundled, unicode, scan, status, verify, sig-check, scaffold, facades, large-files, ast, diagnostics, or skeleton-check.`);
}
