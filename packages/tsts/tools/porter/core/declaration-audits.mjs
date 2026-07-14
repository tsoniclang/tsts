export const DECLARATION_AUDIT_DEFINITIONS = Object.freeze([
  Object.freeze({ key: "signature-units", label: "Go/TypeScript signature unit audit", path: Object.freeze(["signatureCheck"]) }),
  Object.freeze({ key: "authored-facades", label: "authored facade audit", path: Object.freeze(["signatureCheck", "authoredFacades"]) }),
  Object.freeze({ key: "external-package-surface", label: "external package surface audit", path: Object.freeze(["signatureCheck", "externalPackageSurface"]) }),
  Object.freeze({ key: "type-storage-policies", label: "reviewed type storage policy audit", path: Object.freeze(["signatureCheck", "typeStoragePolicies"]) }),
  Object.freeze({ key: "go-value-operation-providers", label: "reviewed Go value-operation provider audit", path: Object.freeze(["signatureCheck", "valueOperationProviders"]) }),
  Object.freeze({ key: "type-equivalence-relations", label: "TypeScript type-equivalence relation audit", path: Object.freeze(["signatureCheck", "typeEquivalenceRelations"]) }),
  Object.freeze({ key: "ambient-reference-relations", label: "ambient reference relation audit", path: Object.freeze(["signatureCheck", "ambientReferenceRelations"]) }),
  Object.freeze({ key: "declaration-ownership", label: "declaration ownership audit", path: Object.freeze(["signatureCheck", "declarationOwnership"]) }),
  Object.freeze({ key: "typescript-declarations", label: "unmatched TypeScript declaration audit", path: Object.freeze(["signatureCheck", "untrackedTypeScript"]) }),
  Object.freeze({ key: "json-tags", label: "Go struct JSON-tag declaration audit", path: Object.freeze(["jsonTagCheck"]) }),
]);

export function completeAudit(fields = {}) {
  return { ...fields, state: "complete" };
}

export function notRunAudit(reason) {
  if (typeof reason !== "string" || reason.trim() === "") throw new Error("a not-run audit requires a non-empty reason");
  return { state: "not-run", reason };
}

export function declarationAuditsNotRun(subject = "This command") {
  const skipped = (label) => notRunAudit(`${subject} did not execute the ${label}.`);
  return {
    signatureCheck: {
      ...skipped("Go/TypeScript signature unit audit"),
      selection: { kind: "all-active" },
      authoredFacades: skipped("authored facade audit"),
      externalPackageSurface: skipped("external package surface audit"),
      typeStoragePolicies: skipped("reviewed type storage policy audit"),
      valueOperationProviders: skipped("reviewed Go value-operation provider audit"),
      typeEquivalenceRelations: skipped("TypeScript type-equivalence relation audit"),
      ambientReferenceRelations: skipped("ambient reference relation audit"),
      declarationOwnership: skipped("declaration ownership audit"),
      untrackedTypeScript: skipped("unmatched TypeScript declaration audit"),
    },
    jsonTagCheck: skipped("Go struct JSON-tag declaration audit"),
  };
}

export function declarationAuditEntries(status) {
  return DECLARATION_AUDIT_DEFINITIONS.map((definition) => ({
    ...definition,
    audit: definition.path.reduce((value, key) => value?.[key], status),
  }));
}

export function auditExecutionLabel(audit) {
  if (audit?.state === "complete") return "complete";
  if (audit?.state === "not-run") {
    return `not run — ${typeof audit.reason === "string" && audit.reason.trim() !== "" ? audit.reason : "no execution reason was recorded"}`;
  }
  return `invalid — expected state 'complete' or 'not-run', got ${JSON.stringify(audit?.state)}`;
}
