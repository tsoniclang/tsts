import { computeSignatureReport } from "../sig-check.mjs";
import { isActivePortPolicy, policyForUnit } from "./policies.mjs";
import { repoRoot, resolveRepo } from "./runtime.mjs";
import { runPinnedScan } from "./snapshot.mjs";
import { scanTsUnits } from "./ts-units.mjs";
import process from "node:process";

// Signature/type-equivalence check. Compares each ported @tsgo-unit's actual TS
// signature against the signature derived from Go. `porter verify` always runs
// this as a hard gate; the standalone command supports `--id <glob>`, `--json`,
// and `--no-gate` for local exploration.
export async function runSigCheck(config, options) {
  const snapshot = runPinnedScan(config);
  const tsUnits = scanTsUnits(resolveRepo(config.tsRoot));
  const tsById = new Map(tsUnits.units.map((u) => [u.id, u]));
  const tsFiles = tsUnits.files.filter((file) => file.metadataCount > 0);
  const report = await computeSignatureReport(
    { config, snapshot, repoRoot, tsFiles, tsById, activeIds: activeSignatureUnitIds(config, snapshot) },
    { idFilter: typeof options.id === "string" ? options.id : undefined },
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
  for (const mismatch of report.mismatches) byKind[mismatch.kind] = (byKind[mismatch.kind] ?? 0) + 1;
  return {
    checked: report.checked,
    descriptors: report.descriptors,
    overriddenUnits: report.overriddenUnits,
    mismatches: report.mismatches.length,
    overrideIssues: report.overrideIssues?.length ?? 0,
    byKind,
  };
}

export function summarizeJsonTagReport(report) {
  const byKind = {};
  for (const mismatch of report?.mismatches ?? []) byKind[mismatch.kind] = (byKind[mismatch.kind] ?? 0) + 1;
  return {
    taggedUnits: report?.taggedUnits ?? 0,
    taggedFields: report?.taggedFields ?? 0,
    fieldMapUnits: report?.fieldMapUnits ?? 0,
    fieldMapFields: report?.fieldMapFields ?? 0,
    runtimeUnits: report?.runtimeUnits ?? 0,
    customCodecUnits: report?.customCodecUnits ?? 0,
    sourceMetadataUnits: report?.sourceMetadataUnits ?? 0,
    mismatches: report?.mismatchCount ?? report?.mismatches?.length ?? 0,
    byKind,
  };
}

export function printSigReport(report) {
  const byKind = new Map();
  for (const m of report.mismatches) byKind.set(m.kind, (byKind.get(m.kind) ?? 0) + 1);
  console.log(`porter sig-check: ${report.checked} units checked, ${report.overriddenUnits} overridden, ${report.mismatches.length} mismatches, ${report.overrideIssues?.length ?? 0} override metadata issues`);
  console.log(`porter JSON tags: ${report.jsonTags?.taggedUnits ?? 0} structs/${report.jsonTags?.taggedFields ?? 0} fields, ${report.jsonTags?.fieldMapUnits ?? 0}/${report.jsonTags?.fieldMapFields ?? 0} mapped, runtime/custom/source=${report.jsonTags?.runtimeUnits ?? 0}/${report.jsonTags?.customCodecUnits ?? 0}/${report.jsonTags?.sourceMetadataUnits ?? 0}, ${report.jsonTags?.mismatchCount ?? 0} issues`);
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
    if (m.goSignature !== undefined || m.tsSignature !== undefined) {
      console.log(`  goSignature: ${m.goSignature}\n  tsSignature: ${m.tsSignature}`);
    }
  }
  for (const m of (report.jsonTags?.mismatches ?? []).slice(0, 50)) {
    const unit = m.id.split("::").slice(2).join("::");
    console.log(`\n[${m.kind}] ${unit}\n  ${m.file}\n  ${m.detail}`);
  }
  if (report.mismatches.length > 50) console.log(`\n… and ${report.mismatches.length - 50} more (use --json for the full list).`);
}
