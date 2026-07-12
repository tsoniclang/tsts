import { computeSignatureReport } from "../sig-check.mjs";
import { isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { repoRoot, resolveRepo } from "./runtime.mjs";
import { runPinnedScan } from "./scan-runner.mjs";
import { signatureAuditSummaryLines } from "./signature-reporting.mjs";
import { parserOptionsForConfig, scanTsUnits } from "./ts-units.mjs";
import process from "node:process";

// Signature/type-equivalence check. Compares each ported @tsgo-unit's actual TS
// signature against the signature derived from Go. `porter verify` always runs
// this as a hard gate; the standalone command supports `--id <glob>`, `--json`,
// and `--no-gate` for local exploration.
export async function runSigCheck(config, options = {}) {
  let idFilter;
  if (Object.hasOwn(options, "id")) {
    if (typeof options.id !== "string" || options.id.trim() === "") throw new Error("porter sig-check requires a non-empty glob after --id");
    idFilter = options.id;
  }
  const snapshot = runPinnedScan(config);
  const tsUnits = await scanTsUnits(resolveRepo(config.tsRoot), { parser: parserOptionsForConfig(config) });
  const tsById = new Map(tsUnits.units.map((u) => [u.id, u]));
  const tsFiles = tsUnits.files.filter((file) => file.metadataCount > 0);
  const report = await computeSignatureReport(
    { config, snapshot, repoRoot, tsFiles, tsById, activeIds: activeSignatureUnitIds(config, snapshot) },
    { idFilter },
  );
  if (options.json === true) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printSigReport(report);
  }
  if ((report.mismatches.length > 0 || (report.overrideIssues?.length ?? 0) > 0 || (report.jsonTags?.mismatchCount ?? 0) > 0) && options["no-gate"] !== true) {
    process.exit(1);
  }
}

export function activeSignatureUnitIds(config, snapshot) {
  const primary = new Set(config.primaryUnitKinds);
  const ids = new Set();
  for (const file of snapshot.files ?? []) {
    for (const unit of file.units ?? []) {
      if (primary.has(unit.kind) && isActivePortPolicy(policyForUnit(config, unit, file))) ids.add(unit.id);
    }
  }
  return ids;
}

export function summarizeSignatureReport(report) {
  const byKind = {};
  for (const mismatch of report?.mismatches ?? []) byKind[mismatch.kind] = (byKind[mismatch.kind] ?? 0) + 1;
  const execution = {
    state: report?.state,
    ...(report?.reason === undefined ? {} : { reason: report.reason }),
    ...(report?.selection === undefined ? {} : { selection: { ...report.selection } }),
    authoredFacades: preserveSubaudit(report?.authoredFacades),
    typeStoragePolicies: preserveSubaudit(report?.typeStoragePolicies),
    typeEquivalenceRelations: preserveSubaudit(report?.typeEquivalenceRelations),
    ambientReferenceRelations: preserveSubaudit(report?.ambientReferenceRelations),
    declarationOwnership: preserveSubaudit(report?.declarationOwnership),
    untrackedTypeScript: preserveSubaudit(report?.untrackedTypeScript),
  };
  if (report?.state !== "complete") return execution;
  return {
    ...execution,
    checked: report.checked,
    descriptors: report.descriptors,
    overriddenUnits: report.overriddenUnits,
    mismatches: report.mismatches.length,
    overrideIssues: report.overrideIssues?.length ?? 0,
    byKind,
  };
}

export function summarizeJsonTagReport(report) {
  const execution = {
    state: report?.state,
    ...(report?.reason === undefined ? {} : { reason: report.reason }),
  };
  if (report?.state !== "complete") return execution;
  const byKind = {};
  for (const mismatch of report?.mismatches ?? []) byKind[mismatch.kind] = (byKind[mismatch.kind] ?? 0) + 1;
  return {
    ...execution,
    taggedUnits: report?.taggedUnits ?? 0,
    taggedFields: report?.taggedFields ?? 0,
    contractUnits: report?.contractUnits ?? 0,
    contractFields: report?.contractFields ?? 0,
    mismatches: report?.mismatchCount ?? report?.mismatches?.length ?? 0,
    byKind,
  };
}

export function printSigReport(report) {
  const byKind = new Map();
  for (const m of report.mismatches) byKind.set(m.kind, (byKind.get(m.kind) ?? 0) + 1);
  const status = {
    signatureCheck: summarizeSignatureReport(report),
    jsonTagCheck: summarizeJsonTagReport(report.jsonTags),
  };
  for (const line of signatureAuditSummaryLines(status)) console.log(`porter ${line}`);
  for (const issue of report.overrideIssues ?? []) {
    console.log(`\n[override-metadata] ${issue.id || "<config>"}\n  ${issue.reason}`);
  }
  for (const [kind, n] of [...byKind.entries()].sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(n).padStart(5)}  ${kind}`);
  }
  for (const m of report.mismatches.slice(0, 50)) {
    const unit = printableIdentity(m.id);
    console.log(`\n[${m.kind}] ${unit}\n  ${m.file}\n  ${m.detail}`);
    if (m.expected !== undefined || m.actual !== undefined) {
      console.log(`  expected: ${m.expected}\n  actual:   ${m.actual}`);
    }
    if (m.goSignature !== undefined || m.tsSignature !== undefined) {
      console.log(`  goSignature: ${m.goSignature}\n  tsSignature: ${m.tsSignature}`);
    }
  }
  for (const m of (report.jsonTags?.mismatches ?? []).slice(0, 50)) {
    const unit = printableIdentity(m.id);
    console.log(`\n[${m.kind}] ${unit}\n  ${m.file}\n  ${m.detail}`);
  }
  if (report.mismatches.length > 50) console.log(`\n… and ${report.mismatches.length - 50} more (use --json for the full list).`);
}

function preserveSubaudit(audit) {
  if (audit === undefined) return undefined;
  return { ...audit };
}

function printableIdentity(value) {
  return typeof value === "string" ? value.replaceAll("\0", "\\0") : "<unknown>";
}
