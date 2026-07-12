import { escapeMd } from "./runtime.mjs";
import { auditExecutionLabel, declarationAuditEntries } from "./declaration-audits.mjs";

export function signatureAuditSummaryLines(status) {
  const signature = status.signatureCheck;
  const jsonTags = status.jsonTagCheck;
  return [
    auditSummaryLine(signature, "Signature unit audit", () => `Signature units/descriptors/mismatches/override issues: ${metric(signature.checked)}/${metric(signature.descriptors)}/${metric(signature.mismatches)}/${metric(signature.overrideIssues)}`),
    auditSummaryLine(signature?.authoredFacades, "Authored facade audit", () => `Authored facades checked/bound methods/unselected Go/TS-only/issues: ${metric(signature.authoredFacades.checked)}/${metric(signature.authoredFacades.methodBindingCount)}/${metric(signature.authoredFacades.unselectedGoMemberCount)}/${metric(signature.authoredFacades.tsOnlyMemberCount)}/${metric(signature.authoredFacades.mismatchCount)}`),
    auditSummaryLine(signature?.typeStoragePolicies, "Reviewed type storage policy audit", () => `Reviewed type storage policies checked/issues: ${metric(signature.typeStoragePolicies.checked)}/${metric(signature.typeStoragePolicies.mismatchCount)}`),
    auditSummaryLine(signature?.typeEquivalenceRelations, "TypeScript type-equivalence relation audit", () => `TypeScript type-equivalence relations checked/issues: ${metric(signature.typeEquivalenceRelations.checked)}/${metric(signature.typeEquivalenceRelations.mismatchCount)}`),
    auditSummaryLine(signature?.ambientReferenceRelations, "Ambient reference relation audit", () => `Ambient reference relations checked/issues: ${metric(signature.ambientReferenceRelations.checked)}/${metric(signature.ambientReferenceRelations.mismatchCount)}`),
    auditSummaryLine(signature?.declarationOwnership, "Declaration ownership audit", () => `Declaration ownership entries checked/issues: ${metric(signature.declarationOwnership.checked)}/${metric(signature.declarationOwnership.mismatchCount)}`),
    auditSummaryLine(signature?.untrackedTypeScript, "Unmatched TypeScript declaration audit", () => `TypeScript exported/private/reviewed/re-export inventories/issues: ${metric(signature.untrackedTypeScript.exportedDeclarationCount)}/${metric(signature.untrackedTypeScript.privateDeclarationCount)}/${metric(signature.untrackedTypeScript.reviewedDeclarationCount)}/${metric(signature.untrackedTypeScript.reExportCount)}/${metric(signature.untrackedTypeScript.mismatchCount)}`),
    auditSummaryLine(jsonTags, "Go struct JSON-tag declaration audit", () => `JSON tagged structs/fields declaration contracts/fields/issues: ${metric(jsonTags.taggedUnits)}/${metric(jsonTags.taggedFields)} ${metric(jsonTags.contractUnits)}/${metric(jsonTags.contractFields)}/${metric(jsonTags.mismatches)}`),
  ];
}

export function appendSignatureAuditMarkdown(lines, status) {
  const signature = status.signatureCheck;
  lines.push("");
  lines.push("## Declaration Audit Execution");
  lines.push("");
  for (const entry of declarationAuditEntries(status)) lines.push(`- ${entry.label}: ${auditExecutionLabel(entry.audit)}`);

  const facades = signature?.authoredFacades;
  if (facades?.state === "complete") {
    appendFacadeMemberInventory(lines, "Authored Facade Unselected Go Members", facades.unselectedGoMembers);
    appendFacadeMemberInventory(lines, "Authored Facade TypeScript-Only Members", facades.tsOnlyMembers);
    appendFacadeMemberInventory(lines, "Authored Facade Constructors", facades.constructors);
    appendFacadeMemberInventory(lines, "Authored Facade Private/Protected Storage", facades.privateStorageMembers);
    appendMethodBindingInventory(lines, facades.methodBindings);
  }
  if (signature?.typeStoragePolicies?.state === "complete") appendTypeStorageInventory(lines, signature.typeStoragePolicies.inventory);
  if (signature?.typeEquivalenceRelations?.state === "complete") appendTypeEquivalenceInventory(lines, signature.typeEquivalenceRelations.inventory);
  if (signature?.ambientReferenceRelations?.state === "complete") appendAmbientReferenceInventory(lines, signature.ambientReferenceRelations.inventory);
  if (signature?.declarationOwnership?.state === "complete") appendDeclarationOwnershipInventory(lines, signature.declarationOwnership.inventory);
  const untracked = signature?.untrackedTypeScript;
  if (untracked?.state === "complete") {
    appendTypeScriptDeclarationInventory(lines, "Unmatched Exported/Source-Visible TypeScript Declarations", untracked.exportedDeclarations);
    appendTypeScriptDeclarationInventory(lines, "Module-Private TypeScript Declarations", untracked.privateDeclarations);
    appendTypeScriptDeclarationInventory(lines, "Reviewed Non-Go TypeScript Declarations", untracked.reviewedDeclarations);
    appendReExportInventory(lines, untracked.reExports);
  }
}

function auditSummaryLine(audit, label, renderComplete) {
  return audit?.state === "complete" ? renderComplete() : `${label}: ${auditExecutionLabel(audit)}`;
}

function metric(value) {
  return Number.isInteger(value) && value >= 0 ? String(value) : "unknown";
}

function appendFacadeMemberInventory(lines, title, rows) {
  appendTable(lines, title, ["Go object", "TS file", "Member kind", "Member"], rows, (row) => [
    row.objectId,
    row.file,
    row.memberKind,
    row.name,
  ]);
}

function appendMethodBindingInventory(lines, rows) {
  appendTable(lines, "Authored Facade Method Bindings", ["Go method", "Go object", "TS file", "TS export", "Receiver parameter"], rows, (row) => [
    row.methodId,
    row.objectId,
    row.file,
    row.tsName,
    row.receiverName,
  ]);
}

function appendTypeScriptDeclarationInventory(lines, title, rows) {
  appendTable(lines, title, ["TS file", "Declaration kind", "Name", "Fragment", "Namespaces", "Source-visible", "Contract hash"], rows, (row) => [
    row.file,
    row.kind,
    row.name,
    row.fragmentIndex,
    Array.isArray(row.namespaces) ? row.namespaces.join(", ") : "",
    row.sourceVisible,
    row.declarationHash,
  ]);
}

function appendReExportInventory(lines, rows) {
  appendTable(lines, "TypeScript Re-Export Routes", ["TS file", "Namespace", "Export", "Target", "Route hash"], rows, (row) => [
    row.file,
    row.namespace,
    row.name,
    row.target,
    row.routeHash,
  ]);
}

function appendTypeStorageInventory(lines, rows) {
  appendTable(lines, "Reviewed Type Storage Policies", ["Go object", "TS storage", "Go declaration hash", "TS declaration hash", "Reason"], rows, (row) => [
    row.objectId,
    row.storageIdentity,
    row.goDeclarationHash,
    row.tsDeclarationHash,
    row.reason,
  ]);
}

function appendTypeEquivalenceInventory(lines, rows) {
  appendTable(lines, "TypeScript Type-Equivalence Relations", ["Go object", "Members", "Go declaration hash", "Use sites", "Reason"], rows, (row) => [
    row.objectId,
    (row.members ?? []).map((member) => `${member.identity} @ ${member.declarationHash}`).join("; "),
    row.goDeclarationHash,
    (row.uses ?? []).join(", "),
    row.reason,
  ]);
}

function appendAmbientReferenceInventory(lines, rows) {
  appendTable(lines, "Ambient Reference Relations", ["Identity", "Namespace", "Source files", "Source-set hash", "Declaration hash", "Use sites", "Reason"], rows, (row) => [
    row.identity,
    row.namespace,
    (row.sourceFiles ?? []).join(", "),
    row.sourceSetHash,
    row.declarationHash,
    (row.uses ?? []).join(", "),
    row.reason,
  ]);
}

function appendDeclarationOwnershipInventory(lines, rows) {
  appendTable(lines, "Declaration Ownership", ["Declaration", "Owner"], rows, (row) => [
    typeof row.id === "string" ? row.id.replaceAll("\0", "\\0") : row.id,
    row.owner,
  ]);
}

function appendTable(lines, title, headers, rows, project) {
  lines.push("");
  lines.push(`### ${title}`);
  lines.push("");
  lines.push(`| ${headers.join(" | ")} |`);
  lines.push(`|${headers.map(() => "---").join("|")}|`);
  if (!Array.isArray(rows)) {
    lines.push(`| _Unknown: completed audit omitted this inventory_ |${headers.slice(1).map(() => " ").join("|")}|`);
    return;
  }
  if (rows.length === 0) {
    lines.push(`| _None_ |${headers.slice(1).map(() => " ").join("|")}|`);
    return;
  }
  for (const row of rows) lines.push(`| ${project(row).map((value) => escapeMd(String(value ?? ""))).join(" | ")} |`);
}
