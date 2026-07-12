import { escapeMd } from "./runtime.mjs";

export function signatureAuditSummaryLines(status) {
  const signature = status.signatureCheck;
  const jsonTags = status.jsonTagCheck;
  if (signature?.state !== "complete") {
    return [
      `Signature, facade, and unmatched-TypeScript audits: ${auditExecutionLabel(signature)}`,
      `Go struct JSON-tag declaration audit: ${auditExecutionLabel(jsonTags)}`,
    ];
  }
  return [
    `Signature units/descriptors/mismatches/override issues: ${metric(signature.checked)}/${metric(signature.descriptors)}/${metric(signature.mismatches)}/${metric(signature.overrideIssues)}`,
    `Authored facades checked/bound methods/Go-only/TS-only: ${metric(signature.authoredFacades?.checked)}/${metric(signature.authoredFacades?.methodBindingCount)}/${metric(signature.authoredFacades?.goOnlyMemberCount)}/${metric(signature.authoredFacades?.tsOnlyMemberCount)}`,
    `TypeScript exported/private/reviewed/re-export inventories: ${metric(signature.untrackedTypeScript?.exportedDeclarationCount)}/${metric(signature.untrackedTypeScript?.privateDeclarationCount)}/${metric(signature.untrackedTypeScript?.reviewedDeclarationCount)}/${metric(signature.untrackedTypeScript?.reExportCount)}`,
    jsonTags?.state === "complete"
      ? `JSON tagged structs/fields declaration contracts/fields/issues: ${metric(jsonTags.taggedUnits)}/${metric(jsonTags.taggedFields)} ${metric(jsonTags.contractUnits)}/${metric(jsonTags.contractFields)}/${metric(jsonTags.mismatches)}`
      : `Go struct JSON-tag declaration audit: ${auditExecutionLabel(jsonTags)}`,
  ];
}

export function appendSignatureAuditMarkdown(lines, status) {
  const signature = status.signatureCheck;
  lines.push("");
  lines.push("## Declaration Audit Execution");
  lines.push("");
  lines.push(`- Signature, authored-facade, and unmatched-TypeScript audits: ${auditExecutionLabel(signature)}`);
  lines.push(`- Go struct JSON-tag declaration audit: ${auditExecutionLabel(status.jsonTagCheck)}`);
  if (signature?.state !== "complete") return;

  const facades = signature.authoredFacades;
  const untracked = signature.untrackedTypeScript;
  appendFacadeMemberInventory(lines, "Authored Facade Go-Only Members", facades?.goOnlyMembers);
  appendFacadeMemberInventory(lines, "Authored Facade TypeScript-Only Members", facades?.tsOnlyMembers);
  appendFacadeMemberInventory(lines, "Authored Facade Constructors", facades?.constructors);
  appendFacadeMemberInventory(lines, "Authored Facade Private/Protected Storage", facades?.privateStorageMembers);
  appendMethodBindingInventory(lines, facades?.methodBindings);
  appendTypeScriptDeclarationInventory(lines, "Unmatched Exported/Source-Visible TypeScript Declarations", untracked?.exportedDeclarations);
  appendTypeScriptDeclarationInventory(lines, "Module-Private TypeScript Declarations", untracked?.privateDeclarations);
  appendTypeScriptDeclarationInventory(lines, "Reviewed Non-Go TypeScript Declarations", untracked?.reviewedDeclarations);
  appendReExportInventory(lines, untracked?.reExports);
}

function auditExecutionLabel(audit) {
  if (audit?.state === "complete") return "complete";
  if (audit?.state === "not-run") return `not run — ${audit.reason ?? "no execution reason was recorded"}`;
  return "unknown — no valid audit execution state was recorded";
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
