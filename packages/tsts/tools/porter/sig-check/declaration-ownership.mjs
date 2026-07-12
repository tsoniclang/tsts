export function declarationOwnershipIds(moduleId, name, kind) {
  return declarationNamespaces(kind).map((namespace) => declarationOwnershipId(moduleId, namespace, kind, name));
}

export function declarationOwnershipId(moduleId, namespace, kind, name) {
  for (const [value, label] of [[moduleId, "module"], [namespace, "namespace"], [kind, "kind"], [name, "name"]]) {
    if (typeof value !== "string" || value === "" || value.includes("\0")) {
      throw new Error(`TypeScript declaration ownership ${label} must be one non-empty identity component`);
    }
  }
  return `${moduleId}\0${namespace}\0${kind}\0${name}`;
}

export function declarationNamespaces(kind) {
  if (kind === "interface" || kind === "type") return ["type"];
  if (kind === "function" || kind === "variable" || kind === "export-assignment") return ["value"];
  if (kind === "class" || kind === "enum" || kind === "namespace") return ["type", "value"];
  if (kind === "ambient-module" || kind === "global-augmentation") return ["ambient"];
  throw new Error(`unsupported TypeScript declaration ownership kind '${kind}'`);
}

export function descriptorOwnershipKind(descriptor) {
  if (descriptor?.kind === "alias") return "type";
  if (descriptor?.kind === "func") return "function";
  if (descriptor?.kind === "value") return "variable";
  if (new Set(["class", "enum", "interface"]).has(descriptor?.kind)) return descriptor.kind;
  throw new Error(`unsupported authored TypeScript descriptor ownership kind '${descriptor?.kind ?? "<missing>"}'`);
}

export function buildDeclarationOwnershipRegistry(sources) {
  if (!Array.isArray(sources)) throw new Error("declaration ownership sources must be an array");
  const owners = new Map();
  const mismatches = [];
  for (const [sourceIndex, source] of sources.entries()) {
    if (typeof source?.owner !== "string" || source.owner === "") {
      throw new Error(`declaration ownership source #${sourceIndex} must have one non-empty owner`);
    }
    if (!(source.ids instanceof Set)) {
      throw new Error(`declaration ownership source '${source.owner}' must expose an exact Set of declaration identities`);
    }
    for (const id of [...source.ids].sort()) {
      const previous = owners.get(id);
      if (previous !== undefined && previous !== source.owner) {
        mismatches.push({
          id: `declaration-ownership:${id}`,
          file: declarationOwnershipModule(id),
          kind: "duplicate-declaration-ownership",
          detail: `TypeScript declaration identity is owned by both '${previous}' and '${source.owner}'`,
        });
        continue;
      }
      owners.set(id, source.owner);
    }
  }
  const inventory = [...owners]
    .map(([id, owner]) => ({ id, owner }))
    .sort((left, right) => compareText(left.id, right.id) || compareText(left.owner, right.owner));
  mismatches.sort((left, right) => compareText(left.file, right.file) || compareText(left.id, right.id));
  return { ids: new Set(owners.keys()), inventory, mismatches };
}

function declarationOwnershipModule(id) {
  const separator = typeof id === "string" ? id.indexOf("\0") : -1;
  return separator < 0 ? "" : id.slice(0, separator);
}
import { compareText } from "../core/deterministic-order.mjs";
