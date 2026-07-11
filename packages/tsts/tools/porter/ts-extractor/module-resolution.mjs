// Canonical type identity resolution through exact indexed re-export edges.

import { isSoftId } from "./type-descriptors.mjs";
import { compareText } from "../core/deterministic-order.mjs";

function splitTypeId(id) {
  const separator = id.lastIndexOf("::");
  return separator < 0 ? undefined : [id.slice(0, separator), id.slice(separator + 2)];
}

export function createCanonicalTypeResolver({
  namedReexport,
  starReexport,
  definedTypes,
  exportedTypes,
  knownModules,
  externalModules = new Set(),
  typeNamespaceReexport = new Map(),
  canonicalTypeAliases = {},
  nodeFormAliases,
}) {
  const cache = new Map();
  const dataTypeNames = new Set(nodeFormAliases?.dataTypeNames ?? []);
  const exactAliases = new Map(Object.entries(canonicalTypeAliases));
  for (const [source, target] of exactAliases) {
    if (!splitTypeId(source) || !splitTypeId(target)) throw new Error(`canonical type alias must use two full module/name identities: '${source}' -> '${target}'`);
    if (!definedTypes.has(source)) throw new Error(`canonical type alias source '${source}' is not an indexed type declaration`);
    if (!definedTypes.has(target)) throw new Error(`canonical type alias target '${target}' is not an indexed type declaration`);
  }

  const resolveExactAlias = (id, trail = []) => {
    const target = exactAliases.get(id);
    if (target === undefined) return id;
    if (trail.includes(id)) throw new Error(`cyclic canonical type alias: ${[...trail, id].join(" -> ")}`);
    return resolveExactAlias(target, [...trail, id]);
  };

  const resolveNamespaceQualifiedId = (id, trail = []) => {
    const parts = splitTypeId(id);
    if (parts === undefined) return id;
    const [moduleId, qualifiedName] = parts;
    const nameParts = qualifiedName.split(".");
    if (nameParts.length < 2) return id;
    const namespaceId = `${moduleId}::${nameParts[0]}`;
    const target = typeNamespaceReexport.get(namespaceId);
    if (target === undefined) return id;
    if (trail.includes(namespaceId)) {
      throw new Error(`cyclic TypeScript namespace re-export: ${[...trail, namespaceId].join(" -> ")}`);
    }
    const targetName = [...(target.local === undefined ? [] : [target.local]), ...nameParts.slice(1)].join(".");
    const resolved = `${target.module}::${targetName}`;
    return resolved === id ? id : resolveNamespaceQualifiedId(resolved, [...trail, namespaceId]);
  };

  const nodeEnvelopeAlias = (id) => {
    if (!nodeFormAliases?.unionModule || !nodeFormAliases?.sourceModulePrefixes?.length) return undefined;
    const parts = splitTypeId(id);
    if (!parts) return undefined;
    const [moduleId, name] = parts;
    const sourceMatch = nodeFormAliases.sourceModulePrefixes.some(
      (prefix) => moduleId === prefix || moduleId.startsWith(`${prefix}/`),
    );
    const dataMatch = moduleId === nodeFormAliases.dataModule && dataTypeNames.has(name);
    if (!sourceMatch && !dataMatch) return undefined;
    const candidateName = name.endsWith("Node") ? name : `${name}Node`;
    const candidate = `${nodeFormAliases.unionModule}::${candidateName}`;
    return definedTypes.has(candidate) ? candidate : undefined;
  };

  const resolveExport = (id, trail = [], required = false) => {
    if (cache.has(id)) return cache.get(id);
    const namedTarget = namedReexport.get(id);
    if (namedTarget !== undefined) {
      if (trail.includes(id)) {
        throw new Error(`cyclic TypeScript named re-export: ${[...trail, id].join(" -> ")}`);
      }
      const sourceParts = splitTypeId(id);
      const targetParts = splitTypeId(namedTarget);
      const targetResult = sourceParts && targetParts && sourceParts[0] === targetParts[0] && definedTypes.has(namedTarget)
        ? { id: namedTarget, found: true }
        : resolveExport(namedTarget, [...trail, id], true);
      if (targetResult.found) {
        cache.set(id, targetResult);
        return targetResult;
      }
      if (targetParts && externalModules.has(targetParts[0])) {
        const external = { id: namedTarget, found: true };
        cache.set(id, external);
        return external;
      }
      throw new Error(`TypeScript type re-export '${id}' does not resolve to an indexed type declaration`);
    }
    if (exportedTypes.has(id)) {
      const result = { id, found: true };
      cache.set(id, result);
      return result;
    }
    if (trail.includes(id)) return { id, found: false };

    const parts = splitTypeId(id);
    if (!parts) return { id, found: false };
    const [moduleId, name] = parts;
    if (externalModules.has(moduleId)) return { id, found: true };
    if (name === "default") {
      if (required && knownModules.has(moduleId)) {
        throw new Error(`TypeScript type export '${id}' does not resolve to an indexed type declaration`);
      }
      return { id, found: false };
    }
    const candidates = new Set();
    for (const sourceModule of starReexport.get(moduleId) ?? []) {
      const candidateId = `${sourceModule}::${name}`;
      const candidate = resolveExport(candidateId, [...trail, id]);
      if (candidate.found) candidates.add(candidate.id);
    }
    if (candidates.size > 1) {
      throw new Error(`ambiguous TypeScript star re-export '${id}': ${[...candidates].sort(compareText).join(", ")}`);
    }
    const result = candidates.size === 1
      ? { id: [...candidates][0], found: true }
      : { id, found: false };
    if (result.found) cache.set(id, result);
    if (!result.found && required && knownModules.has(moduleId)) {
      throw new Error(`TypeScript type export '${id}' does not resolve to an indexed type declaration`);
    }
    return result;
  };

  return (inputId) => {
    const id = resolveNamespaceQualifiedId(inputId);
    if (isSoftId(id) || !splitTypeId(id)) return id;
    const name = id.slice(id.lastIndexOf("::") + 2);
    const nodeAlias = nodeEnvelopeAlias(id);
    if (nodeAlias) return resolveExactAlias(nodeAlias);
    if (typeNamespaceReexport.has(id)) {
      throw new Error(`TypeScript namespace re-export '${id}' cannot be compared as a terminal type`);
    }
    if (namedReexport.has(id)) return resolveExactAlias(resolveExport(id, [], true).id);
    if (definedTypes.has(id) && (!name.includes(".") || exportedTypes.has(id))) return resolveExactAlias(id);
    return resolveExactAlias(resolveExport(id, [], true).id);
  };
}
