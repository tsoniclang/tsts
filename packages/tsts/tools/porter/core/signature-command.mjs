import { computeSignatureReport } from "../sig-check.mjs";
import { prepareDeclarationAuditPrerequisites } from "./declaration-prerequisites.mjs";
import { repoRoot } from "./runtime.mjs";
import { runPinnedScan } from "./scan-runner.mjs";
import { signatureAuditSummaryLines } from "./signature-reporting.mjs";
import { preparePorterWorkspaceState } from "./workspace-state.mjs";
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
  const workspace = await preparePorterWorkspaceState({ config, repositoryRoot: repoRoot, snapshot, unicodeMode: "deep" });
  const prerequisites = await prepareDeclarationAuditPrerequisites(workspace);
  const report = await computeSignatureReport(prerequisites, { idFilter });
  if (options.json === true) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    printSigReport(report);
  }
  if ((report.mismatches.length > 0 || (report.overrideIssues?.length ?? 0) > 0 || (report.jsonTags?.mismatchCount ?? 0) > 0) && options["no-gate"] !== true) {
    process.exit(1);
  }
}

export function summarizeSignatureReport(report) {
  const byKind = {};
  for (const mismatch of report?.mismatches ?? []) byKind[mismatch.kind] = (byKind[mismatch.kind] ?? 0) + 1;
  const execution = {
    state: report?.state,
    ...(report?.reason === undefined ? {} : { reason: report.reason }),
    ...(report?.selection === undefined ? {} : { selection: { ...report.selection } }),
    authoredFacades: preserveSubaudit(report?.authoredFacades),
    externalPackageSurface: preserveSubaudit(report?.externalPackageSurface),
    typeStoragePolicies: preserveSubaudit(report?.typeStoragePolicies),
    valueOperationProviders: preserveSubaudit(report?.valueOperationProviders),
    typeEquivalenceRelations: preserveSubaudit(report?.typeEquivalenceRelations),
    ambientReferenceRelations: preserveSubaudit(report?.ambientReferenceRelations),
    declarationOwnership: preserveSubaudit(report?.declarationOwnership),
    untrackedTypeScript: preserveSubaudit(report?.untrackedTypeScript),
  };
  if (report?.state !== "complete") return jsonEvidence(execution, "signature audit summary");
  return jsonEvidence({
    ...execution,
    checked: report.checked,
    descriptors: report.descriptors,
    overriddenUnits: report.overriddenUnits,
    mismatchCount: report.mismatches.length,
    mismatches: report.mismatches.map((mismatch) => ({ ...mismatch })),
    overrideIssueCount: report.overrideIssues.length,
    overrideIssues: report.overrideIssues.map((issue) => ({ ...issue })),
    byKind,
  }, "signature audit summary");
}

export function summarizeJsonTagReport(report) {
  const execution = {
    state: report?.state,
    ...(report?.reason === undefined ? {} : { reason: report.reason }),
  };
  if (report?.state !== "complete") return jsonEvidence(execution, "JSON-tag audit summary");
  const byKind = {};
  for (const mismatch of report?.mismatches ?? []) byKind[mismatch.kind] = (byKind[mismatch.kind] ?? 0) + 1;
  return jsonEvidence({
    ...execution,
    taggedUnits: report?.taggedUnits ?? 0,
    taggedFields: report?.taggedFields ?? 0,
    contractUnits: report?.contractUnits ?? 0,
    contractFields: report?.contractFields ?? 0,
    mismatchCount: report.mismatches.length,
    mismatches: report.mismatches.map((mismatch) => ({ ...mismatch })),
    byKind,
  }, "JSON-tag audit summary");
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
    if (m.goSignatureHash !== undefined || m.tsSignatureHash !== undefined) {
      console.log(`  goSignatureHash: ${m.goSignatureHash}\n  tsSignatureHash: ${m.tsSignatureHash}`);
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

function jsonEvidence(value, label, seen = new Set()) {
  if (value === null || typeof value === "string" || typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value))) return value;
  if (value === undefined) return undefined;
  if (typeof value !== "object") throw new Error(`${label} contains a non-JSON value`);
  if (seen.has(value)) throw new Error(`${label} contains a cycle`);
  seen.add(value);
  if (Array.isArray(value)) {
    const result = value.map((entry, index) => {
      const normalized = jsonEvidence(entry, `${label}[${index}]`, seen);
      if (normalized === undefined) throw new Error(`${label}[${index}] cannot be undefined`);
      return normalized;
    });
    seen.delete(value);
    return result;
  }
  if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
    throw new Error(`${label} contains a non-plain object`);
  }
  const result = {};
  for (const key of Object.keys(value)) {
    const normalized = jsonEvidence(value[key], `${label}.${key}`, seen);
    if (normalized !== undefined) result[key] = normalized;
  }
  seen.delete(value);
  return result;
}

function printableIdentity(value) {
  return typeof value === "string" ? value.replaceAll("\0", "\\0") : "<unknown>";
}
