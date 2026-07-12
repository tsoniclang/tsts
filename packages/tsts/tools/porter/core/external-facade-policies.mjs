import { safeIdentifier } from "./names.mjs";
import { normalizeExternalMethodBindings } from "./external-facade-method-bindings.mjs";
import { normalizeRuntimeAdaptation } from "./external-facade-runtime-adaptation.mjs";
import { isExternalPackage } from "./dependency-type-ownership.mjs";

const policyKeys = new Set([
  "methodBindings", "objectId", "runtimeAdaptation", "storageStrategy", "tsModule", "tsName",
]);
const storageStrategies = new Set(["authored", "generated"]);

export function externalFacadeModulePath(config, profile, importPath) {
  if (typeof importPath !== "string" || importPath === "") throw new Error("external Go package path must be non-empty");
  const sourceRoot = config.tsRoot.replace(/\/+$/, "");
  const placeholder = "{importPath}";
  const placeholderIndex = profile.facadeTemplate.indexOf(placeholder);
  if (placeholderIndex < 0 || placeholderIndex !== profile.facadeTemplate.lastIndexOf(placeholder)) {
    throw new Error("signatureCheck.facadeTemplate must contain exactly one {importPath} placeholder");
  }
  const repoPath = `${profile.facadeTemplate.slice(0, placeholderIndex)}${importPath}${profile.facadeTemplate.slice(placeholderIndex + placeholder.length)}`;
  const prefix = `${sourceRoot}/`;
  if (!repoPath.startsWith(prefix)) {
    throw new Error(`signatureCheck.facadeTemplate must place external facades below tsRoot '${sourceRoot}'`);
  }
  const relative = repoPath.slice(prefix.length);
  requireExactTsModule(relative, "signatureCheck.facadeTemplate result");
  return relative;
}

export function normalizedExternalFacadePolicies(config, semanticIndex, profileStorage, authoredModules, deferredObjectIds = new Set()) {
  const policies = new Map();
  const configured = config.externalFacadePolicies ?? [];
  if (!Array.isArray(configured)) throw new Error("config.externalFacadePolicies must be an array");
  for (const [index, policy] of configured.entries()) {
    const label = `externalFacadePolicies[${index}]`;
    requirePlainObject(policy, label);
    const unknown = Object.keys(policy).filter((key) => !policyKeys.has(key));
    if (unknown.length > 0) {
      throw new Error(`${label} contains forbidden hand-authored Go semantic field(s): ${unknown.sort().join(", ")}`);
    }
    const objectId = policy.objectId;
    requireExternalTypeObjectId(objectId, `${label}.objectId`);
    const semantic = semanticIndex.get(objectId);
    if (semantic === undefined) {
      if (deferredObjectIds.has(objectId)) continue;
      throw new Error(`${label}.objectId '${objectId}' has no extracted go/types declaration`);
    }
    if (!isExternalPackage(semantic.packagePath, config.goModulePath)) {
      throw new Error(`${label}.objectId '${objectId}' is module-local; excluded local dependency types require go-type-storage relations`);
    }
    if (profileStorage.has(objectId)) {
      throw new Error(`external Go type '${objectId}' has both facade policy storage and profile named-type storage`);
    }
    for (const key of ["tsModule", "tsName"]) {
      if (typeof policy[key] !== "string" || policy[key] === "") throw new Error(`${label}.${key} must be non-empty`);
    }
    requireExactTsModule(policy.tsModule, `${label}.tsModule`);
    if (safeIdentifier(policy.tsName) !== policy.tsName) {
      throw new Error(`${label}.tsName '${policy.tsName}' is not one exact TypeScript declaration identifier`);
    }
    if (!storageStrategies.has(policy.storageStrategy)) {
      throw new Error(`${label}.storageStrategy must be 'authored' or 'generated'`);
    }
    if (policies.has(objectId)) throw new Error(`${label}.objectId duplicates external facade policy '${objectId}'`);
    const runtimeAdaptation = normalizeRuntimeAdaptation(policy.runtimeAdaptation, semantic, objectId);
    const methodBindings = normalizeExternalMethodBindings(policy.methodBindings, semantic, label);
    const normalized = { ...policy, runtimeAdaptation, methodBindings };
    validateExternalFacadePolicy(normalized, semantic, authoredModules, label);
    policies.set(objectId, normalized);
  }
  return policies;
}

export function addSelectedExternalTypePolicies(selections, semanticIndex, policies, authoredModules) {
  for (const selection of selections.filter((row) => row.goKind === "type")) {
    const semantic = semanticIndex.get(selection.objectId);
    if (semantic === undefined) throw new Error(`selected external Go type '${selection.objectId}' has no extracted go/types declaration`);
    const existing = policies.get(selection.objectId);
    if (existing !== undefined) {
      if (existing.storageStrategy !== "authored" || existing.tsModule !== selection.tsModule || existing.tsName !== selection.tsName) {
        throw new Error(`selected external Go type '${selection.objectId}' storage disagrees with its externalFacadePolicies contract`);
      }
      continue;
    }
    const policy = {
      objectId: selection.objectId,
      tsModule: selection.tsModule,
      tsName: selection.tsName,
      storageStrategy: "authored",
      runtimeAdaptation: undefined,
      methodBindings: [],
    };
    validateExternalFacadePolicy(policy, semantic, authoredModules, `external package type selection '${selection.objectId}'`);
    policies.set(selection.objectId, policy);
  }
}

export function resolveExternalFacadePolicy(config, profile, semantic, policies, authoredModules) {
  if (semantic === undefined) return undefined;
  const explicit = policies.get(semantic.objectId);
  if (explicit !== undefined) return explicit;
  const tsModule = externalFacadeModulePath(config, profile, semantic.packagePath);
  if (authoredModules.has(tsModule)) {
    const authored = {
      objectId: semantic.objectId,
      tsModule,
      tsName: semantic.name,
      storageStrategy: "authored",
      runtimeAdaptation: undefined,
      methodBindings: [],
    };
    validateExternalFacadePolicy(authored, semantic, authoredModules, `automatic authored external facade '${semantic.objectId}'`);
    policies.set(semantic.objectId, authored);
    return authored;
  }
  if (safeIdentifier(semantic.name) !== semantic.name) {
    throw new Error(`external Go type '${semantic.objectId}' needs an explicit storage policy because its name is not an exact TypeScript declaration identifier`);
  }
  const generated = {
    objectId: semantic.objectId,
    tsModule,
    tsName: semantic.name,
    storageStrategy: "generated",
    runtimeAdaptation: undefined,
    methodBindings: [],
  };
  validateExternalFacadePolicy(generated, semantic, authoredModules, `automatic external facade '${semantic.objectId}'`);
  policies.set(semantic.objectId, generated);
  return generated;
}

export function externalStorageOwners(config, policies, profileStorage) {
  const owners = new Map();
  for (const [objectId, identity] of profileStorage) setStorageOwner(identity, objectId);
  for (const policy of policies.values()) {
    setStorageOwner(`${config.tsRoot.replace(/\/+$/, "")}/${policy.tsModule}::${policy.tsName}`, policy.objectId);
  }
  return owners;

  function setStorageOwner(identity, objectId) {
    const previous = owners.get(identity);
    if (previous !== undefined && previous !== objectId) {
      throw new Error(`external Go types '${previous}' and '${objectId}' map to the same TypeScript storage '${identity}'`);
    }
    owners.set(identity, objectId);
  }
}

export function authoredFacadeModuleSet(config) {
  const entries = config.authoredFacadeModules ?? [];
  if (!Array.isArray(entries)) throw new Error("config.authoredFacadeModules must be an array");
  const modules = new Set();
  for (const [index, entry] of entries.entries()) {
    if (typeof entry !== "string") throw new Error(`config.authoredFacadeModules[${index}] must be a string`);
    requireExactTsModule(entry, `config.authoredFacadeModules[${index}]`);
    if (modules.has(entry)) throw new Error(`config.authoredFacadeModules duplicates '${entry}'`);
    modules.add(entry);
  }
  return modules;
}

function validateExternalFacadePolicy(policy, semantic, authoredModules, label) {
  const authored = authoredModules.has(policy.tsModule);
  if (policy.storageStrategy === "authored" && !authored) {
    throw new Error(`${label} declares authored storage outside config.authoredFacadeModules`);
  }
  if (policy.storageStrategy === "generated" && authored) {
    throw new Error(`${label} declares generated storage for authored module '${policy.tsModule}'`);
  }
  const representation = policy.runtimeAdaptation?.representation;
  if (policy.methodBindings.length > 0 && policy.storageStrategy !== "authored") {
    throw new Error(`${label}.methodBindings require authored storage`);
  }
  if (policy.methodBindings.length > 0 && representation !== "scalar") {
    throw new Error(`${label}.methodBindings are permitted only when reviewed scalar storage cannot carry Go instance methods`);
  }
  if (policy.storageStrategy === "generated" && policy.runtimeAdaptation !== undefined) {
    throw new Error(`${label} generated declaration storage cannot define runtime adaptation; runtime representation belongs to authored storage`);
  }
  if (policy.storageStrategy === "authored" && representation !== undefined && policy.runtimeAdaptation?.tsDeclarationHash === undefined) {
    throw new Error(`${label} authored runtime representation requires one exact tsDeclarationHash`);
  }
  if (policy.storageStrategy === "generated" && policy.runtimeAdaptation?.tsDeclarationHash !== undefined) {
    throw new Error(`${label} generated runtime representation cannot carry an authored tsDeclarationHash`);
  }
}

function requireExternalTypeObjectId(value, label) {
  if (typeof value !== "string" || !/^[^:\s]+::type::[^:\s]+$/.test(value)) {
    throw new Error(`${label} must be one exact external Go type object identity`);
  }
}

function requireExactTsModule(value, label) {
  if (value.startsWith("/") || value.includes("\\") || value.split("/").some((segment) => segment === "" || segment === "." || segment === "..") || !value.endsWith(".ts")) {
    throw new Error(`${label} must be one normalized relative TypeScript module path ending in .ts`);
  }
}

function requirePlainObject(value, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value) ||
      (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) ||
      Reflect.ownKeys(value).some((key) => {
        const descriptor = Object.getOwnPropertyDescriptor(value, key);
        return typeof key !== "string" || descriptor?.enumerable !== true || !("value" in descriptor);
      })) {
    throw new Error(`${label} must be a plain enumerable own-data-property object`);
  }
}
