import { compareText } from "../core/deterministic-order.mjs";

export function matchReviewedNonGoDeclarations(manifest, declarations) {
  const policies = new Map(manifest.declarations.map((policy) => [declarationPolicyKey(policy), policy]));
  const accepted = new Map();
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
        detail: `reviewed non-Go ${declaration.kind} '${declaration.name}' drifted: manifest=${policy.declarationHash} current=${declaration.declarationHash}`,
      });
      continue;
    }
    accepted.set(key, policy);
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

export function matchReviewedNonGoExportRoutes(manifest, routes) {
  const policies = new Map(manifest.routes.map((policy) => [exportRoutePolicyKey(policy), policy]));
  const accepted = new Map();
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
        detail: `reviewed non-Go ${route.namespace} export '${route.name}' drifted: manifest=${policy.routeHash} current=${route.routeHash}`,
      });
      continue;
    }
    accepted.set(key, policy);
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

export function declarationPolicyKey(value) {
  return [value.file, value.kind, value.name, value.fragmentIndex, [...value.namespaces].sort(compareText).join(","), value.visibility].join("\0");
}

export function exportRoutePolicyKey(value) {
  return [value.file, value.namespace, value.name, value.target].join("\0");
}

function mismatchOrder(left, right) {
  return compareText(left.file, right.file) || compareText(left.kind, right.kind) || compareText(left.id, right.id);
}
