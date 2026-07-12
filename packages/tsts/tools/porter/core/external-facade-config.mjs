import { compareText } from "./deterministic-order.mjs";
import { safeIdentifier } from "./names.mjs";
import { assertSourceModuleId } from "../ts-extractor/source-structure/modules.mjs";

const policyKeys = new Set(["methodBindings", "objectId", "runtimeAdaptation", "storageStrategy", "tsModule", "tsName"]);
const storageStrategies = new Set(["authored", "generated"]);
const scalarStorageTypes = new Set(["bigint", "boolean", "number", "string"]);

export function normalizeAuthoredFacadeModules(config) {
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

export function normalizeExternalFacadePolicyConfigs(config, authoredModules = normalizeAuthoredFacadeModules(config)) {
  const configured = config.externalFacadePolicies ?? [];
  if (!Array.isArray(configured)) throw new Error("config.externalFacadePolicies must be an array");
  const objectIds = new Set();
  const storageIdentities = new Set();
  return configured.map((policy, index) => {
    const label = `externalFacadePolicies[${index}]`;
    requirePlainObject(policy, label);
    requireExactKeys(policy, policyKeys, label, "forbidden hand-authored Go semantic field(s)");
    requireExternalTypeObjectId(policy.objectId, `${label}.objectId`);
    requireExactTsModule(policy.tsModule, `${label}.tsModule`);
    if (typeof policy.tsName !== "string" || policy.tsName === "" || safeIdentifier(policy.tsName) !== policy.tsName) {
      throw new Error(`${label}.tsName must be one exact TypeScript declaration identifier`);
    }
    if (!storageStrategies.has(policy.storageStrategy)) throw new Error(`${label}.storageStrategy must be 'authored' or 'generated'`);
    const authored = authoredModules.has(policy.tsModule);
    if (policy.storageStrategy === "authored" && !authored) throw new Error(`${label} declares authored storage outside config.authoredFacadeModules`);
    if (policy.storageStrategy === "generated" && authored) throw new Error(`${label} declares generated storage for authored module '${policy.tsModule}'`);
    if (objectIds.has(policy.objectId)) throw new Error(`${label}.objectId duplicates external facade policy '${policy.objectId}'`);
    const storageIdentity = `${policy.tsModule}::${policy.tsName}`;
    if (storageIdentities.has(storageIdentity)) throw new Error(`${label} duplicates TypeScript storage '${storageIdentity}'`);
    objectIds.add(policy.objectId);
    storageIdentities.add(storageIdentity);
    return {
      ...policy,
      methodBindings: normalizeExternalMethodBindingConfigs(policy.methodBindings, label),
      runtimeAdaptation: normalizeRuntimeAdaptationConfig(policy.runtimeAdaptation, policy.objectId),
    };
  }).sort((left, right) => compareText(left.objectId, right.objectId));
}

export function normalizeExternalMethodBindingConfigs(value, label) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`${label}.methodBindings must be an array`);
  const methodIds = new Set();
  const tsNames = new Set();
  return value.map((binding, index) => {
    const bindingLabel = `${label}.methodBindings[${index}]`;
    requirePlainObject(binding, bindingLabel);
    requireExactKeys(binding, new Set(["methodId", "reason", "receiverName", "tsName"]), bindingLabel);
    requireIdentity(binding.methodId, `${bindingLabel}.methodId`);
    requireIdentifier(binding.tsName, `${bindingLabel}.tsName`);
    requireIdentifier(binding.receiverName, `${bindingLabel}.receiverName`);
    requireReason(binding.reason, `${bindingLabel}.reason`, "moving the Go method to a TypeScript function");
    if (methodIds.has(binding.methodId)) throw new Error(`${label}.methodBindings duplicates Go method '${binding.methodId}'`);
    if (tsNames.has(binding.tsName)) throw new Error(`${label}.methodBindings duplicates TypeScript export '${binding.tsName}'`);
    methodIds.add(binding.methodId);
    tsNames.add(binding.tsName);
    return { ...binding, reason: binding.reason.trim() };
  }).sort((left, right) => compareText(left.methodId, right.methodId));
}

export function normalizeRuntimeAdaptationConfig(value, objectId) {
  if (value === undefined) return undefined;
  const label = `external facade '${objectId}' runtimeAdaptation`;
  requirePlainObject(value, label);
  requireExactKeys(value, new Set([
    "extraMembers", "goDeclarationHash", "nominality", "nominalityReason", "pointer", "reason", "representation", "scalarCarrierIdentity", "scalarStorage", "tsDeclarationHash",
  ]), label);
  if (value.representation !== undefined && !new Set(["class", "scalar", "structural"]).has(value.representation)) {
    throw new Error(`${label}.representation must be 'class', 'scalar', or 'structural'`);
  }
  if (value.pointer !== undefined && value.pointer !== "aggregate" && value.pointer !== "slot") {
    throw new Error(`${label}.pointer must be 'aggregate' or 'slot'`);
  }
  if (value.representation === "class" && value.pointer === "slot") throw new Error(`${label} class runtime storage cannot use replaceable-slot pointer storage`);
  if (value.representation === "scalar" && !scalarStorageTypes.has(value.scalarStorage)) {
    throw new Error(`${label} scalar runtime storage requires exact scalarStorage 'bigint', 'boolean', 'number', or 'string'`);
  }
  if (value.representation !== "scalar" && value.scalarStorage !== undefined) throw new Error(`${label}.scalarStorage applies only to scalar runtime storage`);
  if (value.scalarCarrierIdentity !== undefined) {
    if (value.representation !== "scalar") throw new Error(`${label}.scalarCarrierIdentity applies only to scalar runtime storage`);
    requireScalarCarrierIdentity(value.scalarCarrierIdentity, objectId);
  }
  if (value.nominality !== undefined && value.nominality !== "erased" && value.nominality !== "preserved") {
    throw new Error(`${label}.nominality must be 'erased' or 'preserved' when present`);
  }
  if (value.nominality === "erased") requireReason(value.nominalityReason, `${label}.nominalityReason`, "erased Go nominality");
  if (value.nominality !== "erased" && value.nominalityReason !== undefined) throw new Error(`${label}.nominalityReason is valid only when nominality is 'erased'`);
  if (value.representation === undefined && value.pointer === undefined) throw new Error(`${label} must define representation or pointer storage`);
  requireReason(value.reason, `${label}.reason`, "runtime representation adaptation");
  requireHash(value.goDeclarationHash, `${label}.goDeclarationHash`);
  if (value.tsDeclarationHash !== undefined) requireHash(value.tsDeclarationHash, `${label}.tsDeclarationHash`);
  if (value.representation === undefined && value.tsDeclarationHash !== undefined) throw new Error(`${label}.tsDeclarationHash applies only to a runtime representation adaptation`);
  const extraMembers = normalizeExtraMembers(value.extraMembers, objectId);
  return {
    ...(extraMembers.length === 0 ? {} : { extraMembers }),
    ...(value.representation === undefined ? {} : { representation: value.representation }),
    ...(value.pointer === undefined ? {} : { pointer: value.pointer }),
    ...(value.scalarStorage === undefined ? {} : { scalarStorage: value.scalarStorage }),
    ...(value.scalarCarrierIdentity === undefined ? {} : { scalarCarrierIdentity: value.scalarCarrierIdentity }),
    ...(value.nominality === undefined ? {} : { nominality: value.nominality }),
    ...(value.nominalityReason === undefined ? {} : { nominalityReason: value.nominalityReason.trim() }),
    goDeclarationHash: value.goDeclarationHash,
    ...(value.tsDeclarationHash === undefined ? {} : { tsDeclarationHash: value.tsDeclarationHash }),
    reason: value.reason.trim(),
  };
}

export function requireExactTsModule(value, label) {
  try {
    assertSourceModuleId(value);
  } catch {
    throw new Error(`${label} must be one normalized relative TypeScript module path ending in .ts`);
  }
}

function normalizeExtraMembers(value, objectId) {
  if (value === undefined) return [];
  if (!Array.isArray(value)) throw new Error(`external facade '${objectId}' runtimeAdaptation.extraMembers must be an array`);
  const keys = new Set();
  return value.map((member, index) => {
    const label = `external facade '${objectId}' runtimeAdaptation.extraMembers[${index}]`;
    requirePlainObject(member, label);
    requireExactKeys(member, new Set(["declarationHash", "kind", "name", "reason"]), label);
    requireIdentity(member.name, `${label}.name`);
    requireIdentity(member.kind, `${label}.kind`);
    requireHash(member.declarationHash, `${label}.declarationHash`);
    requireReason(member.reason, `${label}.reason`, "the extra TypeScript member");
    const key = `${member.kind}\0${member.name}`;
    if (keys.has(key)) throw new Error(`${label} duplicates extra member '${member.kind} ${member.name}'`);
    keys.add(key);
    return { ...member, reason: member.reason.trim() };
  }).sort((left, right) => compareText(left.kind, right.kind) || compareText(left.name, right.name));
}

function requireScalarCarrierIdentity(value, objectId) {
  if (typeof value !== "string") throw new Error(`external facade '${objectId}' scalarCarrierIdentity must be one exact TypeScript type identity`);
  const separator = value.lastIndexOf("::");
  const moduleId = separator < 0 ? "" : value.slice(0, separator);
  const name = separator < 0 ? "" : value.slice(separator + 2);
  requireExactTsModule(moduleId, `external facade '${objectId}' scalarCarrierIdentity module`);
  requireIdentifier(name, `external facade '${objectId}' scalarCarrierIdentity name`);
}

function requireExternalTypeObjectId(value, label) {
  if (typeof value !== "string" || !/^[^:\s]+::type::[^:\s]+$/.test(value)) throw new Error(`${label} must be one exact external Go type object identity`);
}

function requireIdentifier(value, label) {
  if (typeof value !== "string" || value === "" || safeIdentifier(value) !== value) throw new Error(`${label} must be one exact TypeScript identifier`);
}

function requireIdentity(value, label) {
  if (typeof value !== "string" || value === "" || value.includes("\0")) throw new Error(`${label} must be non-empty`);
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 declaration snapshot`);
}

function requireReason(value, label, purpose) {
  if (typeof value !== "string" || value.trim().length < 20) throw new Error(`${label} must specifically justify ${purpose}`);
}

function requireExactKeys(value, allowed, label, unknownLabel = "unknown key(s)") {
  const unknown = Object.keys(value).filter((key) => !allowed.has(key));
  if (unknown.length > 0) throw new Error(`${label} contains ${unknownLabel}: ${unknown.sort(compareText).join(", ")}`);
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
