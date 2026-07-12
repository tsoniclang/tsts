import { readFileSync } from "node:fs";
import path from "node:path";

import { compareText } from "./deterministic-order.mjs";

const declarationKinds = new Set([
  "ambient-module", "class", "enum", "export-assignment", "function", "global-augmentation", "interface", "namespace", "type", "variable",
]);
const declarationVisibilities = new Set(["ambient", "direct-export", "indirect-export", "module-private", "script-global"]);
const routeNamespaces = new Set(["type", "type-namespace", "type-star", "value", "value-namespace", "value-star"]);

export function loadNonGoDeclarationManifest(config, repoRoot, readSource = (file) => readFileSync(path.join(repoRoot, file), "utf8")) {
  validateNonGoDeclarationManifestPath(config.nonGoDeclarationManifestPath);
  if (typeof repoRoot !== "string" || !path.isAbsolute(repoRoot)) throw new Error("non-Go declaration manifest loader requires an absolute repository root");
  let manifest;
  try {
    manifest = JSON.parse(readSource(config.nonGoDeclarationManifestPath));
  } catch (error) {
    throw new Error(`cannot read non-Go declaration manifest '${config.nonGoDeclarationManifestPath}': ${error instanceof Error ? error.message : String(error)}`);
  }
  return normalizeNonGoDeclarationManifest(manifest);
}

export function validateNonGoDeclarationManifestPath(value) {
  if (typeof value !== "string" || value === "" || path.isAbsolute(value) || value.includes("\\") || value.includes("\0") ||
      value.split("/").some((segment) => segment === "" || segment === "." || segment === "..") || !value.endsWith(".json")) {
    throw new Error("Porter config nonGoDeclarationManifestPath must be one canonical repository-relative JSON path");
  }
}

export function normalizeNonGoDeclarationManifest(manifest) {
  requireExactObject(manifest, new Set(["declarations", "owners", "routes", "schemaVersion"]), "non-Go declaration manifest");
  if (manifest.schemaVersion !== 1) throw new Error("non-Go declaration manifest schemaVersion must be 1");
  if (!Array.isArray(manifest.owners) || !Array.isArray(manifest.declarations) || !Array.isArray(manifest.routes)) {
    throw new Error("non-Go declaration manifest owners, declarations, and routes must be arrays");
  }
  const owners = new Map();
  for (const [index, owner] of manifest.owners.entries()) {
    const label = `non-Go declaration manifest owners[${index}]`;
    requireExactObject(owner, new Set(["id", "reason"]), label);
    if (typeof owner.id !== "string" || !/^[a-z][a-z0-9-]*$/.test(owner.id)) throw new Error(`${label}.id must be one stable kebab-case owner identity`);
    requireReason(owner.reason, `${label}.reason`);
    if (owners.has(owner.id)) throw new Error(`${label}.id duplicates owner '${owner.id}'`);
    owners.set(owner.id, { id: owner.id, reason: owner.reason.trim() });
  }
  const declarations = manifest.declarations.map((row, index) => normalizeDeclaration(row, index, owners));
  const routes = manifest.routes.map((row, index) => normalizeRoute(row, index, owners));
  requireUnique(declarations, declarationIdentity, "declaration");
  requireUnique(routes, routeIdentity, "route");
  const usedOwners = new Set([...declarations, ...routes].map((row) => row.owner));
  for (const owner of owners.keys()) if (!usedOwners.has(owner)) throw new Error(`non-Go declaration manifest owner '${owner}' is unused`);
  return {
    schemaVersion: 1,
    owners: [...owners.values()].sort((left, right) => compareText(left.id, right.id)),
    declarations: declarations.sort(declarationOrder),
    routes: routes.sort(routeOrder),
  };
}

export function emptyNonGoDeclarationManifest() {
  return { schemaVersion: 1, owners: [], declarations: [], routes: [] };
}

function normalizeDeclaration(row, index, owners) {
  const label = `non-Go declaration manifest declarations[${index}]`;
  requireExactObject(row, new Set([
    "declarationHash", "file", "fragmentIndex", "kind", "name", "namespaces", "owner", "visibility",
  ]), label);
  requireOwner(row.owner, owners, `${label}.owner`);
  requireRepositoryPath(row.file, `${label}.file`);
  requireIdentity(row.kind, `${label}.kind`);
  requireIdentity(row.name, `${label}.name`);
  if (!declarationKinds.has(row.kind)) throw new Error(`${label}.kind has unsupported declaration kind '${row.kind}'`);
  if (!Number.isSafeInteger(row.fragmentIndex) || row.fragmentIndex < 0) throw new Error(`${label}.fragmentIndex must be a non-negative integer`);
  const namespaces = requireNamespaces(row.namespaces, `${label}.namespaces`);
  requireHash(row.declarationHash, `${label}.declarationHash`);
  if (!declarationVisibilities.has(row.visibility)) {
    throw new Error(`${label}.visibility must be one exact declaration exposure class`);
  }
  return { ...row, namespaces, ownerReason: owners.get(row.owner).reason };
}

function normalizeRoute(row, index, owners) {
  const label = `non-Go declaration manifest routes[${index}]`;
  requireExactObject(row, new Set(["file", "name", "namespace", "owner", "routeHash", "target"]), label);
  requireOwner(row.owner, owners, `${label}.owner`);
  requireRepositoryPath(row.file, `${label}.file`);
  for (const key of ["name", "namespace", "target"]) requireIdentity(row[key], `${label}.${key}`);
  if (!routeNamespaces.has(row.namespace)) {
    throw new Error(`${label}.namespace has unsupported export space '${row.namespace}'`);
  }
  requireHash(row.routeHash, `${label}.routeHash`);
  return { ...row, ownerReason: owners.get(row.owner).reason };
}

function requireOwner(value, owners, label) {
  if (typeof value !== "string" || !owners.has(value)) throw new Error(`${label} must reference one declared owner`);
}

function requireNamespaces(value, label) {
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => item !== "type" && item !== "value" && item !== "ambient")) {
    throw new Error(`${label} must contain exact type, value, or ambient ownership spaces`);
  }
  const normalized = [...new Set(value)].sort(compareText);
  if (normalized.length !== value.length) throw new Error(`${label} contains duplicate ownership spaces`);
  return normalized;
}

function requireExactObject(value, allowed, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`${label} contains unknown key(s): ${unknown.sort(compareText).join(", ")}`);
}

function requireIdentity(value, label) {
  if (typeof value !== "string" || value === "" || value.includes("\0")) throw new Error(`${label} must be one non-empty identity`);
}

function requireRepositoryPath(value, label) {
  requireIdentity(value, label);
  if (path.isAbsolute(value) || value.includes("\\") || value.split("/").some((segment) => segment === "" || segment === "." || segment === "..")) {
    throw new Error(`${label} must be one canonical repository-relative path`);
  }
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 contract snapshot`);
}

function requireReason(value, label) {
  if (typeof value !== "string" || value.trim().length < 20) throw new Error(`${label} must specifically justify the non-Go declaration owner`);
}

function declarationIdentity(row) {
  return [row.file, row.kind, row.name, row.fragmentIndex, row.namespaces.join(","), row.visibility].join("\0");
}

function routeIdentity(row) {
  return [row.file, row.namespace, row.name, row.target].join("\0");
}

function requireUnique(rows, identity, label) {
  const seen = new Set();
  for (const row of rows) {
    const key = identity(row);
    if (seen.has(key)) throw new Error(`non-Go declaration manifest contains duplicate ${label} '${key.replaceAll("\0", "::")}'`);
    seen.add(key);
  }
}

function declarationOrder(left, right) {
  return compareText(left.file, right.file) || compareText(left.kind, right.kind) || compareText(left.name, right.name) ||
    left.fragmentIndex - right.fragmentIndex || compareText(left.visibility, right.visibility);
}

function routeOrder(left, right) {
  return compareText(left.file, right.file) || compareText(left.namespace, right.namespace) || compareText(left.name, right.name) || compareText(left.target, right.target);
}
