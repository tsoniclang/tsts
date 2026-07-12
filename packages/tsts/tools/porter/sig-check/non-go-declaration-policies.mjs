import { compareText } from "../core/deterministic-order.mjs";

export function matchNonGoDeclarationPolicies(config, declarations) {
  const policies = normalizeDeclarationPolicies(config.nonGoDeclarationPolicies ?? []);
  const accepted = new Set();
  const mismatches = [];
  for (const declaration of declarations) {
    const key = declarationPolicyKey(declaration);
    const policy = policies.get(key);
    if (policy === undefined) continue;
    if (policy.declarationHash !== declaration.declarationHash) {
      mismatches.push({
        id: `typescript-local:${declaration.file}::${declaration.name}`,
        file: declaration.file,
        kind: "non-go-declaration-policy-drift",
        detail: `reviewed non-Go ${declaration.kind} '${declaration.name}' drifted: config=${policy.declarationHash} current=${declaration.declarationHash}`,
      });
      continue;
    }
    accepted.add(key);
  }
  for (const [key, policy] of policies) {
    if (accepted.has(key)) continue;
    if (declarations.some((declaration) => declarationPolicyKey(declaration) === key)) continue;
    mismatches.push({
      id: `typescript-policy:${policy.file}::${policy.name}`,
      file: policy.file,
      kind: "unused-non-go-declaration-policy",
      detail: `reviewed non-Go ${policy.kind} '${policy.name}' fragment ${policy.fragmentIndex} has no exact TypeScript declaration`,
    });
  }
  return { accepted, mismatches: mismatches.sort(mismatchOrder) };
}

export function matchNonGoExportRoutePolicies(config, routes) {
  const policies = normalizeExportRoutePolicies(config.nonGoExportRoutePolicies ?? []);
  const accepted = new Set();
  const mismatches = [];
  for (const route of routes) {
    const key = exportRoutePolicyKey(route);
    const policy = policies.get(key);
    if (policy === undefined) continue;
    if (policy.routeHash !== route.routeHash) {
      mismatches.push({
        id: `typescript-export:${route.file}::${route.namespace}::${route.name}`,
        file: route.file,
        kind: "non-go-export-route-policy-drift",
        detail: `reviewed non-Go ${route.namespace} export '${route.name}' drifted: config=${policy.routeHash} current=${route.routeHash}`,
      });
      continue;
    }
    accepted.add(key);
  }
  for (const [key, policy] of policies) {
    if (accepted.has(key)) continue;
    if (routes.some((route) => exportRoutePolicyKey(route) === key)) continue;
    mismatches.push({
      id: `typescript-export-policy:${policy.file}::${policy.namespace}::${policy.name}`,
      file: policy.file,
      kind: "unused-non-go-export-route-policy",
      detail: `reviewed non-Go ${policy.namespace} export '${policy.name}' has no exact TypeScript route`,
    });
  }
  return { accepted, mismatches: mismatches.sort(mismatchOrder) };
}

function normalizeDeclarationPolicies(value) {
  if (!Array.isArray(value)) throw new Error("config.nonGoDeclarationPolicies must be an array");
  const result = new Map();
  for (const [index, policy] of value.entries()) {
    const label = `nonGoDeclarationPolicies[${index}]`;
    requireExactObject(policy, new Set(["declarationHash", "file", "fragmentIndex", "kind", "name", "namespaces", "reason"]), label);
    requireNonEmpty(policy.file, `${label}.file`);
    requireNonEmpty(policy.kind, `${label}.kind`);
    requireNonEmpty(policy.name, `${label}.name`);
    if (!Number.isSafeInteger(policy.fragmentIndex) || policy.fragmentIndex < 0) throw new Error(`${label}.fragmentIndex must be a non-negative integer`);
    const namespaces = requireNamespaces(policy.namespaces, `${label}.namespaces`);
    requireHash(policy.declarationHash, `${label}.declarationHash`);
    requireReason(policy.reason, `${label}.reason`);
    const normalized = { ...policy, namespaces };
    const key = declarationPolicyKey(normalized);
    if (result.has(key)) throw new Error(`${label} duplicates reviewed non-Go declaration '${key}'`);
    result.set(key, normalized);
  }
  return result;
}

function normalizeExportRoutePolicies(value) {
  if (!Array.isArray(value)) throw new Error("config.nonGoExportRoutePolicies must be an array");
  const result = new Map();
  for (const [index, policy] of value.entries()) {
    const label = `nonGoExportRoutePolicies[${index}]`;
    requireExactObject(policy, new Set(["file", "name", "namespace", "reason", "routeHash", "target"]), label);
    for (const key of ["file", "name", "namespace", "target"]) requireNonEmpty(policy[key], `${label}.${key}`);
    if (!new Set(["type", "value", "type-star", "value-star", "type-namespace", "value-namespace"]).has(policy.namespace)) {
      throw new Error(`${label}.namespace has unsupported export space '${policy.namespace}'`);
    }
    requireHash(policy.routeHash, `${label}.routeHash`);
    requireReason(policy.reason, `${label}.reason`);
    const key = exportRoutePolicyKey(policy);
    if (result.has(key)) throw new Error(`${label} duplicates reviewed non-Go export route '${key}'`);
    result.set(key, policy);
  }
  return result;
}

function declarationPolicyKey(value) {
  return [value.file, value.kind, value.name, value.fragmentIndex, [...value.namespaces].sort(compareText).join(",")].join("\0");
}

function exportRoutePolicyKey(value) {
  return [value.file, value.namespace, value.name, value.target].join("\0");
}

function requireNamespaces(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => item !== "type" && item !== "value" && item !== "ambient")) {
    throw new Error(`${label} must contain exact type, value, or ambient ownership spaces`);
  }
  const result = [...new Set(value)].sort(compareText);
  if (result.length !== value.length) throw new Error(`${label} contains duplicate ownership spaces`);
  return result;
}

function requireExactObject(value, allowed, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`${label} contains unknown key(s): ${unknown.sort(compareText).join(", ")}`);
}

function requireNonEmpty(value, label) {
  if (typeof value !== "string" || value === "" || value.includes("\0")) throw new Error(`${label} must be one non-empty identity`);
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 contract snapshot`);
}

function requireReason(value, label) {
  if (typeof value !== "string" || value.trim().length < 20) throw new Error(`${label} must specifically justify the non-Go declaration`);
}

function mismatchOrder(left, right) {
  return compareText(left.file, right.file) || compareText(left.kind, right.kind) || compareText(left.id, right.id);
}
