// Cached TSTS-parser-backed indexing for every TypeScript module under tsRoot.

import { readFileSync, readdirSync, realpathSync } from "node:fs";
import { isAbsolute, join, relative, resolve, sep } from "node:path";
import { collectDeclarationMetadata } from "./declaration-metadata.mjs";
import { compareText } from "../core/deterministic-order.mjs";
import { parseSource } from "./parser-runtime.mjs";
import { assertSourceModuleId, extractModuleStructure, resolveModuleId } from "./source-structure.mjs";

const parsedModulesByApi = new WeakMap();

function parserCache(api) {
  let cache = parsedModulesByApi.get(api);
  if (cache === undefined) {
    cache = new Map();
    parsedModulesByApi.set(api, cache);
  }
  return cache;
}

function assertParseSucceeded(api, sourceFile, moduleId) {
  const diagnostics = api.SourceFile_Diagnostics(sourceFile) ?? [];
  if (diagnostics.length === 0) return;
  const details = diagnostics
    .map((diagnostic) => `${api.Diagnostic_Code(diagnostic)}@${api.Diagnostic_Pos(diagnostic)}-${api.Diagnostic_End(diagnostic)}`)
    .sort(compareText)
    .join(", ");
  throw new Error(`TSTS parser reported syntax diagnostic(s) in '${moduleId}': ${details}`);
}

export function parseTypeScriptModule(api, moduleId, text) {
  assertSourceModuleId(moduleId);
  if (typeof text !== "string") throw new Error(`TypeScript module '${moduleId}' has no source text`);
  const cache = parserCache(api);
  const cached = cache.get(moduleId);
  if (cached?.text === text) return cachedModuleView(cached);

  const sourceFile = parseSource(api, moduleId, text);
  assertParseSucceeded(api, sourceFile, moduleId);
  const metadata = collectDeclarationMetadata(api, sourceFile, text, moduleId);
  const structure = extractModuleStructure(api, sourceFile, moduleId);
  const module = { moduleId, text, sourceFile, structure, metadata };
  deepFreezeCachedProduct(module);
  cache.set(moduleId, module);
  return cachedModuleView(module);
}

function cachedModuleView(module) {
  const { defaultValueExpression, ...plainStructure } = module.structure;
  return {
    ...module,
    structure: {
      ...structuredClone(plainStructure),
      ...(defaultValueExpression === undefined ? {} : { defaultValueExpression }),
    },
    metadata: module.metadata.map(cloneMetadataRecordView),
  };
}

function cloneMetadataRecordView(record) {
  const { document, metadata, override, statement, ...plainRecord } = record;
  return {
    ...structuredClone(plainRecord),
    document,
    metadata: structuredClone(metadata),
    ...(override === undefined ? {} : { override: structuredClone(override) }),
    statement,
  };
}

function deepFreezeCachedProduct(value, seen = new WeakSet()) {
  if (value === null || (typeof value !== "object" && typeof value !== "function") || seen.has(value)) return;
  seen.add(value);
  if (value instanceof Map) {
    for (const [key, entry] of value) {
      deepFreezeCachedProduct(key, seen);
      deepFreezeCachedProduct(entry, seen);
    }
  } else if (value instanceof Set) {
    for (const entry of value) deepFreezeCachedProduct(entry, seen);
  } else {
    for (const key of Reflect.ownKeys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if ("value" in descriptor) deepFreezeCachedProduct(descriptor.value, seen);
    }
  }
  if (!ArrayBuffer.isView(value)) Object.freeze(value);
}

export function indexTypeScriptModuleSources(api, inputSources) {
  if (!(inputSources instanceof Map)) throw new Error("TypeScript module sources must be a Map");
  const modules = new Map();
  const sources = new Map();
  const sourceFiles = new Map();
  const tsDecls = new Map();
  const definedTypes = new Set();
  const definedValues = new Set();
  const exportedTypes = new Set();
  const exportedValues = new Set();
  const namedReexport = new Map();
  const starReexport = new Map();
  const valueNamedReexport = new Map();
  const valueStarReexport = new Map();
  const typeNamespaceReexport = new Map();
  const valueNamespaceReexport = new Map();
  const typeExports = new Map();
  const valueExports = new Map();
  const metadataById = new Map();
  const externalModules = new Set();
  const entries = [...inputSources].sort(([left], [right]) => compareText(left, right));

  for (const [moduleId, text] of entries) {
    if (modules.has(moduleId)) throw new Error(`duplicate TypeScript module '${moduleId}'`);
    const module = { ...parseTypeScriptModule(api, moduleId, text) };
    modules.set(moduleId, module);
    sources.set(moduleId, text);
    sourceFiles.set(moduleId, module.sourceFile);
  }
  validateModuleReferences(modules, externalModules);
  validateStarExportAmbiguities(modules, externalModules, "type");
  validateStarExportAmbiguities(modules, externalModules, "value");
  const resolvedNamespaces = buildNamespaceExportIndexes(modules);
  validateExplicitExports(modules, externalModules, resolvedNamespaces.type);
  validateNamedImports(modules, externalModules, resolvedNamespaces.type);
  attachDescriptorImports(modules, resolvedNamespaces.type);

  for (const module of modules.values()) {
    const { moduleId, structure } = module;
    for (const record of module.metadata) {
      const id = record.metadata.id;
      if (typeof id !== "string" || id.length === 0) continue;
      const previous = metadataById.get(id);
      if (previous !== undefined) throw new Error(`duplicate @tsgo-unit id '${id}' in '${previous.moduleId}' and '${moduleId}'`);
      metadataById.set(id, { moduleId, record });
    }
    for (const name of structure.localTypeNames) definedTypes.add(`${moduleId}::${name}`);
    for (const name of structure.localValueNames) definedValues.add(`${moduleId}::${name}`);
    for (const name of structure.exportedTypeNames) {
      exportedTypes.add(`${moduleId}::${name}`);
      const declarationModules = tsDecls.get(name) ?? new Set();
      declarationModules.add(moduleId);
      tsDecls.set(name, declarationModules);
    }
    for (const name of structure.exportedValueNames) exportedValues.add(`${moduleId}::${name}`);
    for (const name of structure.exportedNamespaceTypeNames) exportedTypes.add(`${moduleId}::${name}`);
    for (const name of structure.exportedNamespaceValueNames) exportedValues.add(`${moduleId}::${name}`);
    copyAvailableExports(typeExports, moduleId, structure.typeExports, "type", modules, externalModules);
    copyAvailableExports(valueExports, moduleId, structure.valueExports, "value", modules, externalModules);
    copyAvailableExports(namedReexport, moduleId, structure.namedReexports, "type", modules, externalModules);
    copyAvailableExports(valueNamedReexport, moduleId, structure.valueNamedReexports, "value", modules, externalModules);
    if (structure.starReexports.length > 0) starReexport.set(moduleId, structure.starReexports);
    if (structure.valueStarReexports.length > 0) valueStarReexport.set(moduleId, structure.valueStarReexports);
  }
  for (const [id, target] of resolvedNamespaces.type) setExact(typeNamespaceReexport, id, target, "type namespace re-export");
  for (const [id, target] of resolvedNamespaces.value) setExact(valueNamespaceReexport, id, target, "value namespace re-export");

  return {
    modules,
    sources,
    sourceFiles,
    tsDecls,
    definedTypes,
    definedValues,
    exportedTypes,
    exportedValues,
    typeExports,
    valueExports,
    namedReexport,
    starReexport,
    valueNamedReexport,
    valueStarReexport,
    typeNamespaceReexport,
    valueNamespaceReexport,
    metadataById,
    externalModules,
  };
}

function validateExplicitExports(modules, externalModules, namespaceExports) {
  for (const module of modules.values()) {
    const names = new Set([...module.structure.typeExports.keys(), ...module.structure.valueExports.keys()]);
    for (const name of names) {
      const typeTarget = module.structure.typeExports.get(name);
      const valueTarget = module.structure.valueExports.get(name);
      const typeDisposition = typeTarget === undefined
        ? "missing"
        : exportTargetDisposition(`${module.moduleId}::${name}`, "type", modules, externalModules, [], false);
      const valueDisposition = valueTarget === undefined
        ? "missing"
        : exportTargetDisposition(`${module.moduleId}::${name}`, "value", modules, externalModules, [], false);
      const valid = typeTarget !== undefined && valueTarget !== undefined
        ? typeDisposition !== "missing" || valueDisposition !== "missing"
        : typeTarget !== undefined ? typeDisposition !== "missing" : valueDisposition !== "missing";
      if (typeDisposition === "cycle" || valueDisposition === "cycle") {
        throw new Error(`cyclic TypeScript named export '${module.moduleId}::${name}'`);
      }
      if (!valid && !namespaceExports.has(`${module.moduleId}::${name}`)) {
        throw new Error(`TypeScript export '${module.moduleId}::${name}' does not resolve in its declared namespace`);
      }
    }
  }
}

function validateNamedImports(modules, externalModules, namespaceExports) {
  for (const module of modules.values()) {
    for (const [local, binding] of module.structure.imports.named) {
      const sourceModule = resolveModuleId(binding.module, module.moduleId);
      if (externalModules.has(sourceModule)) continue;
      const id = `${sourceModule}::${binding.imported}`;
      const typeDisposition = exportTargetDisposition(id, "type", modules, externalModules, [], false);
      const valueDisposition = exportTargetDisposition(id, "value", modules, externalModules, [], false);
      const valid = binding.typeOnly
        ? typeDisposition !== "missing"
        : typeDisposition !== "missing" || valueDisposition !== "missing";
      if (!valid && !namespaceExports.has(id)) {
        throw new Error(`TypeScript import '${module.moduleId}::${local}' references missing export '${id}'`);
      }
    }
  }
}

function buildNamespaceExportIndexes(modules) {
  return {
    type: buildNamespaceExportIndex(modules, "type"),
    value: buildNamespaceExportIndex(modules, "value"),
  };
}

function buildNamespaceExportIndex(modules, namespace) {
  const namesByModule = new Map();
  for (const module of modules.values()) {
    namesByModule.set(module.moduleId, new Set([
      ...module.structure.namespaceReexports.keys(),
      ...(namespace === "type" ? module.structure.typeExports.keys() : module.structure.valueExports.keys()),
    ]));
  }
  let changed = true;
  while (changed) {
    changed = false;
    for (const module of modules.values()) {
      const names = namesByModule.get(module.moduleId);
      const stars = namespace === "type" ? module.structure.starReexports : module.structure.valueStarReexports;
      for (const sourceModule of stars) {
        for (const name of namesByModule.get(sourceModule) ?? []) {
          if (name !== "default" && !names.has(name)) {
            names.add(name);
            changed = true;
          }
        }
      }
    }
  }
  const resolved = new Map();
  const resolveNamespace = (moduleId, name, trail = []) => {
    const id = `${moduleId}::${name}`;
    if (trail.includes(id)) return undefined;
    const module = modules.get(moduleId);
    if (module === undefined) return undefined;
    const direct = module.structure.namespaceReexports.get(name);
    if (direct !== undefined && (namespace === "type" || !direct.typeOnly)) return direct;
    const candidates = new Map();
    const explicit = (namespace === "type" ? module.structure.typeExports : module.structure.valueExports).get(name);
    if (explicit !== undefined && explicit !== id) {
      const target = explicit;
      const separator = target.lastIndexOf("::");
      if (separator >= 0) {
        const targetNamespace = resolveNamespace(target.slice(0, separator), target.slice(separator + 2), [...trail, id]);
        if (targetNamespace !== undefined) addNamespaceCandidate(candidates, {
          ...targetNamespace,
          typeOnly: namespace === "type" ? targetNamespace.typeOnly : false,
        });
      }
    } else if (name !== "default") {
      const stars = namespace === "type" ? module.structure.starReexports : module.structure.valueStarReexports;
      for (const sourceModule of stars) {
        const targetNamespace = resolveNamespace(sourceModule, name, [...trail, id]);
        if (targetNamespace !== undefined) addNamespaceCandidate(candidates, {
          ...targetNamespace,
          typeOnly: namespace === "type" ? targetNamespace.typeOnly : false,
        });
      }
    }
    if (candidates.size > 1) {
      throw new Error(`ambiguous TypeScript namespace re-export '${id}': ${[...candidates.keys()].sort(compareText).join(", ")}`);
    }
    return candidates.values().next().value;
  };
  for (const [moduleId, names] of namesByModule) {
    for (const name of [...names].sort(compareText)) {
      const target = resolveNamespace(moduleId, name);
      if (target !== undefined) resolved.set(`${moduleId}::${name}`, target);
    }
  }
  return resolved;
}

function namespaceTargetKey(target) {
  return `${target.module}::${target.local ?? "*"}`;
}

function addNamespaceCandidate(candidates, target) {
  const key = namespaceTargetKey(target);
  const existing = candidates.get(key);
  candidates.set(key, existing === undefined ? target : { ...existing, typeOnly: existing.typeOnly && target.typeOnly });
}

function attachDescriptorImports(modules, namespaceExports) {
  for (const module of modules.values()) {
    const namespaces = new Map(module.structure.imports.namespaces);
    for (const [local, binding] of module.structure.imports.named) {
      const sourceModule = resolveModuleId(binding.module, module.moduleId);
      const target = namespaceExports.get(`${sourceModule}::${binding.imported}`);
      if (target !== undefined) {
        namespaces.set(local, {
          module: target.module,
          ...(target.local === undefined ? {} : { local: target.local }),
          typeOnly: binding.typeOnly || target.typeOnly,
        });
      }
    }
    module.descriptorImports = { named: module.structure.imports.named, namespaces };
  }
}

function validateModuleReferences(modules, externalModules) {
  for (const module of modules.values()) {
    for (const reference of module.structure.moduleReferences) {
      if (!reference.relative) {
        externalModules.add(reference.resolved);
      } else if (!modules.has(reference.resolved)) {
        throw new Error(`relative module '${reference.specifier}' from '${module.moduleId}' resolves to missing '${reference.resolved}'`);
      }
    }
  }
}

function validateStarExportAmbiguities(modules, externalModules, namespace) {
  const namesByModule = new Map();
  for (const module of modules.values()) {
    const exports = namespace === "type" ? module.structure.typeExports : module.structure.valueExports;
    namesByModule.set(module.moduleId, new Set(exports.keys()));
  }
  let changed = true;
  while (changed) {
    changed = false;
    for (const module of modules.values()) {
      const names = namesByModule.get(module.moduleId);
      const stars = namespace === "type" ? module.structure.starReexports : module.structure.valueStarReexports;
      for (const sourceModule of stars) {
        for (const name of namesByModule.get(sourceModule) ?? []) {
          if (name !== "default" && !names.has(name)) {
            names.add(name);
            changed = true;
          }
        }
      }
    }
  }
  for (const [moduleId, names] of namesByModule) {
    for (const name of [...names].sort(compareText)) {
      exportTargetDisposition(`${moduleId}::${name}`, namespace, modules, externalModules, [], false);
    }
  }
}

function copyAvailableExports(target, moduleId, exports, namespace, modules, externalModules) {
  for (const [name, value] of exports) {
    if (exportTargetDisposition(`${moduleId}::${name}`, namespace, modules, externalModules, [], false) !== "missing") {
      setExact(target, `${moduleId}::${name}`, value, "export");
    }
  }
}

function exportTargetDisposition(id, namespace, modules, externalModules, trail, allowLocal) {
  const result = exportTargetResolution(id, namespace, modules, externalModules, trail, allowLocal);
  if (result.origins.size > 1) {
    throw new Error(`ambiguous TypeScript ${namespace} star re-export '${id}': ${[...result.origins].sort(compareText).join(", ")}`);
  }
  if (result.origins.size === 1) return "available";
  return result.cycle ? "cycle" : "missing";
}

function exportTargetResolution(id, namespace, modules, externalModules, trail, allowLocal) {
  const separator = id.lastIndexOf("::");
  if (separator < 0) return emptyExportResolution();
  const moduleId = id.slice(0, separator);
  const name = id.slice(separator + 2);
  if (externalModules.has(moduleId)) return { origins: new Set([id]), cycle: false };
  if (trail.includes(id)) return { origins: new Set(), cycle: true };
  const module = modules.get(moduleId);
  if (module === undefined) return emptyExportResolution();
  const localNames = namespace === "type" ? module.structure.localTypeNames : module.structure.localValueNames;
  const exports = namespace === "type" ? module.structure.typeExports : module.structure.valueExports;
  const explicit = exports.get(name);
  if (explicit !== undefined) {
    if (explicit === id) {
      if (localNames.has(name)) return { origins: new Set([id]), cycle: false };
      const namespaceExport = namespace === "value" ? module.structure.namespaceReexports.get(name) : undefined;
      return namespaceExport !== undefined && !namespaceExport.typeOnly
        ? { origins: new Set([`namespace:${namespaceTargetKey(namespaceExport)}`]), cycle: false }
        : emptyExportResolution();
    }
    const targetSeparator = explicit.lastIndexOf("::");
    const targetModule = targetSeparator < 0 ? "" : explicit.slice(0, targetSeparator);
    return exportTargetResolution(explicit, namespace, modules, externalModules, [...trail, id], targetModule === moduleId);
  }
  if (namespace === "value") {
    const namespaceExport = module.structure.namespaceReexports.get(name);
    if (namespaceExport !== undefined && !namespaceExport.typeOnly) {
      return { origins: new Set([`namespace:${namespaceTargetKey(namespaceExport)}`]), cycle: false };
    }
  }
  if (allowLocal && localNames.has(name)) return { origins: new Set([id]), cycle: false };
  if (name === "default") return emptyExportResolution();
  const stars = namespace === "type" ? module.structure.starReexports : module.structure.valueStarReexports;
  const origins = new Set();
  for (const sourceModule of stars) {
    const result = exportTargetResolution(`${sourceModule}::${name}`, namespace, modules, externalModules, [...trail, id], false);
    for (const origin of result.origins) origins.add(origin);
  }
  return { origins, cycle: false };
}

function emptyExportResolution() {
  return { origins: new Set(), cycle: false };
}

function setExact(index, id, target, label) {
  if (index.has(id)) throw new Error(`duplicate TypeScript ${label} '${id}'`);
  index.set(id, target);
}

function collectTypeScriptFiles(rootDirectory) {
  const files = [];
  const directories = [rootDirectory];
  while (directories.length > 0) {
    const directory = directories.pop();
    const entries = readdirSync(directory, { withFileTypes: true }).sort((left, right) => compareText(left.name, right.name));
    for (const entry of entries) {
      const path = join(directory, entry.name);
      if (entry.isDirectory()) directories.push(path);
      else if (entry.isFile() && entry.name.endsWith(".ts")) files.push(path);
    }
  }
  return files.sort(compareText);
}

function toPosixPath(path) {
  return sep === "/" ? path : path.split(sep).join("/");
}

export function loadTypeScriptModuleIndex(api, repoRoot, tsRootRelative) {
  if (typeof tsRootRelative !== "string" || tsRootRelative.length === 0 || isAbsolute(tsRootRelative) ||
      tsRootRelative.includes("\\") || tsRootRelative.split("/").some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
    throw new Error(`TypeScript module root must be an exact repo-relative path: '${tsRootRelative}'`);
  }
  const canonicalRepoRoot = realpathSync(resolve(repoRoot));
  const rootDirectory = realpathSync(resolve(canonicalRepoRoot, tsRootRelative));
  const rootFromRepo = relative(canonicalRepoRoot, rootDirectory);
  if (rootFromRepo === "" || rootFromRepo.startsWith(`..${sep}`) || rootFromRepo === ".." || isAbsolute(rootFromRepo)) {
    throw new Error(`TypeScript module root '${tsRootRelative}' is not contained within repo root`);
  }
  const moduleRoot = toPosixPath(tsRootRelative).replace(/^\.\//, "").replace(/\/$/, "");
  if (!moduleRoot) throw new Error("TypeScript module root must be non-empty");
  const sources = new Map();
  for (const path of collectTypeScriptFiles(rootDirectory)) {
    const relativePath = toPosixPath(relative(rootDirectory, path));
    sources.set(`${moduleRoot}/${relativePath}`, readFileSync(path, "utf8"));
  }
  return indexTypeScriptModuleSources(api, sources);
}

export function requireIndexedModule(index, moduleId) {
  const module = index.modules.get(moduleId);
  if (!module) throw new Error(`TypeScript module '${moduleId}' is not present in the parser-backed module index`);
  return module;
}
