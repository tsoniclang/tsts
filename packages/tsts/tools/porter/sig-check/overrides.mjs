const SIGNATURE_MISMATCH_KINDS = new Set([
  "declaration-kind", "declaration-modifier", "declaration-fragment-contract", "declaration-fragment-count",
  "declaration-fragment-modifier", "type-param-count", "type-param-name", "type-param-binding", "type-param-constraint",
  "type-param-default", "type-param-const", "type-param-variance", "type-param-modifier", "type-param-invalid-constraint",
  "function-signature-count", "param-order", "arity", "param-name", "param-role", "param-type",
  "param-annotation-missing", "param-optionality", "param-optional-syntax", "param-question", "param-modifier",
  "param-initializer-status", "param-initializer", "param-initializer-unresolved",
  "variadic-position", "return-type", "return-type-policy", "return-annotation-missing", "function-modifier",
  "interface-heritage", "member-order", "missing-member", "unsupported-member", "extra-member", "duplicate-member",
  "member-overload-count", "member-type", "member-optionality", "member-readonly", "member-definite", "member-modifier",
  "member-annotation-missing", "alias-type", "enum-member-count", "enum-member-name", "enum-member-value",
  "value-annotation-missing", "value-type-unresolved", "value-type", "missing-value", "extra-value",
  "value-declaration-kind", "value-definite", "value-modifier", "unresolved-ref", "unsupported-type",
]);
const INITIALIZER_MISMATCH_KINDS = new Set([
  "value-initializer-status", "value-initializer", "value-initializer-unresolved",
]);
const VALUE_ORDER_MISMATCH_KINDS = new Set(["value-order"]);

export function resolveOverride(localOverride, id, expected, actual, canon, overrideIssues) {
  const ignore = new Set();
  const issues = [];
  if (localOverride?.allow?.includes?.("signature")) {
    requireSnapshot(localOverride.goSignature, unitSignatureSnapshot(expected, canon), "goSignature", issues);
    requireSnapshot(localOverride.tsSignature, unitSignatureSnapshot(actual, canon), "tsSignature", issues);
  }
  if (localOverride?.allow?.includes?.("initializer")) {
    requireSnapshot(localOverride.goInitializer, unitInitializerSnapshot(expected), "goInitializer", issues);
    requireSnapshot(localOverride.tsInitializer, unitInitializerSnapshot(actual), "tsInitializer", issues);
  }
  if (localOverride?.allow?.includes?.("value-order")) {
    requireSnapshot(localOverride.goValueOrder, unitValueOrderSnapshot(expected), "goValueOrder", issues);
    requireSnapshot(localOverride.tsValueOrder, unitValueOrderSnapshot(actual), "tsValueOrder", issues);
  }
  if (issues.length > 0) {
    overrideIssues.push({ id, reason: issues.join("; ") });
    return { ignore, reason: localOverride.reason ?? "" };
  }
  if (localOverride?.allow?.includes?.("signature")) for (const kind of SIGNATURE_MISMATCH_KINDS) ignore.add(kind);
  if (localOverride?.allow?.includes?.("initializer")) for (const kind of INITIALIZER_MISMATCH_KINDS) ignore.add(kind);
  if (localOverride?.allow?.includes?.("value-order")) for (const kind of VALUE_ORDER_MISMATCH_KINDS) ignore.add(kind);
  return { ignore, reason: localOverride?.reason ?? "" };
}

function requireSnapshot(recorded, current, name, issues) {
  if (recorded !== current) issues.push(`${name} snapshot drifted: metadata=${recorded ?? "<missing>"} current=${current}`);
}

function unitInitializerSnapshot(descriptor) {
  if (descriptor?.kind === "profileVariants") {
    return profileSnapshot(descriptor, unitInitializerSnapshot, "initializer");
  }
  if (descriptor?.kind !== "value") return "<not-value>";
  return (descriptor.decls ?? []).map((declaration) =>
    `${declaration.name}=${declaration.valueIssue !== undefined ? `unresolved:${declaration.valueIssue}` : JSON.stringify(declaration.value)}`,
  ).join(";");
}

function unitValueOrderSnapshot(descriptor) {
  if (descriptor?.kind === "profileVariants") {
    return profileSnapshot(descriptor, unitValueOrderSnapshot, "value-order");
  }
  if (descriptor?.kind !== "value") return "<not-value>";
  return (descriptor.decls ?? []).map((declaration) => declaration.name).join(",");
}

function profileSnapshot(descriptor, snapshot, label) {
  if (!Array.isArray(descriptor.variants) || descriptor.variants.length === 0) {
    throw new Error(`profile-aware ${label} snapshot requires at least one semantic variant`);
  }
  return descriptor.variants.map((variant) => {
    if (!Array.isArray(variant.profiles) || variant.profiles.length === 0) {
      throw new Error(`profile-aware ${label} snapshot requires a non-empty profile identity list`);
    }
    return `${JSON.stringify(variant.profiles)}=>${snapshot(variant.descriptor)}`;
  }).join("|");
}

export function unitSignatureSnapshot(descriptor, canon = (identity) => identity) {
  if (!descriptor) return "<missing>";
  return stableSnapshot(descriptor, canon);
}

function stableSnapshot(value, canon = (identity) => identity, owner = undefined) {
  return JSON.stringify(snapshotValue(value, canon, owner));
}

function snapshotValue(value, canon, owner) {
  if (value === undefined) return ["undefined"];
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return ["array", value.map((item) => snapshotValue(item, canon))];
  const entries = Object.keys(value).sort().map((key) => {
    const child = (value.t === "ref" || value.t === "query") && key === "id" ? canon(value[key]) : value[key];
    return [key, snapshotValue(child, canon, value)];
  });
  return ["object", entries];
}

export function withSignatureOverrideSnapshots(mismatches, expected, actual, canon = (identity) => identity) {
  const goSignature = unitSignatureSnapshot(expected, canon);
  const tsSignature = unitSignatureSnapshot(actual, canon);
  return mismatches.map((mismatch) => ({ ...mismatch, goSignature, tsSignature }));
}

export { unitInitializerSnapshot, unitValueOrderSnapshot };

export function validateOverrideUse(localOverride, mismatches, id, overrideIssues) {
  if (!Array.isArray(localOverride?.allow)) return;
  for (const [aspect, kinds] of [
    ["signature", SIGNATURE_MISMATCH_KINDS],
    ["initializer", INITIALIZER_MISMATCH_KINDS],
    ["value-order", VALUE_ORDER_MISMATCH_KINDS],
  ]) {
    if (localOverride.allow.includes(aspect) && !mismatches.some((mismatch) => kinds.has(mismatch.kind))) {
      overrideIssues.push({ id, reason: `unused '${aspect}' override allowance: the current Go and TypeScript contracts have no ${aspect} mismatch` });
    }
  }
}
