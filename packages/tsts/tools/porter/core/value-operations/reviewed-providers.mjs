import { compareText } from "../deterministic-order.mjs";
import { semanticDeclarationVariantsHash } from "../semantic-declaration-hash.mjs";
import { semanticRelationsOfKind } from "../semantic-relations.mjs";
import { canonicalSchemaValue } from "../semantic-variants.mjs";
import { buildSemanticTypeCatalog } from "../type-storage-policies.mjs";
import { requireDirectProviderIdentity } from "./provider-identity.mjs";

const intrinsicInterfaceObjects = new Set(["builtin::type::any", "builtin::type::error"]);

export class FinalizedReviewedGoValueOperationCatalog {
  #config;
  #policies;
  #snapshot;

  constructor(config, snapshot, policies) {
    this.#config = config;
    this.#snapshot = snapshot;
    this.#policies = new Map(policies);
    Object.freeze(this);
  }

  get size() { return this.#policies.size; }
  get(objectId) { return this.#policies.get(objectId); }
  has(objectId) { return this.#policies.has(objectId); }
  entries() { return this.#policies.entries(); }
  values() { return this.#policies.values(); }
  [Symbol.iterator]() { return this.#policies[Symbol.iterator](); }

  requirements(config, snapshot) {
    this.#requireInputs(config, snapshot);
    return new Map([...this.#policies].map(([objectId, policy]) => [objectId, Object.freeze({
      disposition: "reviewed",
      operationTypeParameterIndexes: policy.operationTypeParameterIndexes,
      typeParameterCount: policy.typeParameterCount,
    })]));
  }

  require(config, snapshot) {
    this.#requireInputs(config, snapshot);
    return this;
  }

  #requireInputs(config, snapshot) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("reviewed Go value-operation catalog was built from different config or snapshot objects");
    }
  }
}

export function buildReviewedGoValueOperationCatalog(config, snapshot) {
  const semanticTypes = buildSemanticTypeCatalog(snapshot);
  const policies = new Map();
  const operationOwners = new Map();
  for (const [index, value] of semanticRelationsOfKind(config, "go-value-ops").entries()) {
    const label = `semanticRelations[go-value-ops:${index}]`;
    requireExactObject(value, new Set([
      "goDeclarationHash",
      "kind",
      "objectId",
      "operationIdentity",
      "operationTypeParameterIndexes",
      "reason",
      "storageIdentity",
      "tsDeclarationHash",
      "typeParameterCount",
    ]), label);
    requireGoTypeIdentity(value.objectId, `${label}.objectId`);
    if (intrinsicInterfaceObjects.has(value.objectId)) {
      throw new Error(`${label}.objectId '${value.objectId}' is an intrinsic interface value and cannot use a reviewed provider`);
    }
    requireOperationIdentity(value.operationIdentity, config, `${label}.operationIdentity`);
    requireStorageIdentity(value.storageIdentity, config, `${label}.storageIdentity`);
    requireHash(value.goDeclarationHash, `${label}.goDeclarationHash`);
    requireHash(value.tsDeclarationHash, `${label}.tsDeclarationHash`);
    requireReason(value.reason, `${label}.reason`);
    requireTypeParameterCount(value.typeParameterCount, `${label}.typeParameterCount`);
    const indexes = requireOperationIndexes(
      value.operationTypeParameterIndexes,
      value.typeParameterCount,
      `${label}.operationTypeParameterIndexes`,
    );
    if (policies.has(value.objectId)) throw new Error(`${label} duplicates Go value-operation provider '${value.objectId}'`);
    const previousOwner = operationOwners.get(value.operationIdentity);
    if (previousOwner !== undefined) {
      throw new Error(`${label}.operationIdentity '${value.operationIdentity}' is already owned by '${previousOwner}'`);
    }
    const semantic = semanticTypes.get(value.objectId);
    if (semantic === undefined) throw new Error(`${label}.objectId '${value.objectId}' has no extracted Go type declaration`);
    requireInvariantStorageShape(semantic, label);
    const arity = requireSemanticArity(semantic, label);
    if (arity !== value.typeParameterCount) {
      throw new Error(`${label}.typeParameterCount is ${value.typeParameterCount}, but the Go declaration arity is ${arity}`);
    }
    const currentHash = semanticDeclarationVariantsHash(semantic, `reviewed Go value operations '${value.objectId}'`);
    if (currentHash !== value.goDeclarationHash) {
      throw new Error(`${label} Go declaration snapshot drifted: config=${value.goDeclarationHash} current=${currentHash}`);
    }
    const policy = Object.freeze({
      goDeclarationHash: value.goDeclarationHash,
      objectId: value.objectId,
      operationIdentity: value.operationIdentity,
      operationTypeParameterIndexes: Object.freeze(indexes),
      reason: value.reason.trim(),
      semantic,
      storageIdentity: value.storageIdentity,
      tsDeclarationHash: value.tsDeclarationHash,
      typeParameterCount: value.typeParameterCount,
    });
    policies.set(value.objectId, policy);
    operationOwners.set(value.operationIdentity, value.objectId);
  }
  return new FinalizedReviewedGoValueOperationCatalog(
    config,
    snapshot,
    [...policies].sort(([left], [right]) => compareText(left, right)),
  );
}

export function requireReviewedGoValueOperationCatalog(value, config, snapshot) {
  if (!(value instanceof FinalizedReviewedGoValueOperationCatalog)) {
    throw new Error("Go value-operation planning requires one finalized reviewed-provider catalog");
  }
  return value.require(config, snapshot);
}

function requireInvariantStorageShape(semantic, label) {
  const shapes = new Set(semantic.variants.map((variant) => canonicalSchemaValue({
    alias: variant.declaration.type.alias,
    rhs: variant.declaration.type.rhs,
    typeParameters: variant.declaration.type.typeParameters,
  })));
  if (shapes.size !== 1) {
    throw new Error(`${label}.objectId '${semantic.objectId}' changes value-storage shape across semantic profiles`);
  }
}

function requireSemanticArity(semantic, label) {
  const arities = new Set(semantic.variants.map((variant) => variant.declaration.type.typeParameters.length));
  if (arities.size !== 1) throw new Error(`${label}.objectId '${semantic.objectId}' changes generic arity across semantic profiles`);
  return arities.values().next().value;
}

function requireOperationIndexes(value, arity, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  const indexes = [];
  let previous = -1;
  for (const [position, index] of value.entries()) {
    if (!Number.isSafeInteger(index) || index < 0 || index >= arity) {
      throw new Error(`${label}[${position}] '${index}' is outside generic arity ${arity}`);
    }
    if (index <= previous) throw new Error(`${label} must be strictly increasing with no duplicates`);
    previous = index;
    indexes.push(index);
  }
  return indexes;
}

function requireOperationIdentity(value, config, label) {
  requireDirectProviderIdentity(value, config.tsRoot, label, "operation");
}

function requireStorageIdentity(value, config, label) {
  requireDirectProviderIdentity(value, config.tsRoot, label, "storage");
}

function requireExactObject(value, allowed, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort(compareText);
  const expected = [...allowed].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
}

function requireGoTypeIdentity(value, label) {
  if (typeof value !== "string" || !/^(?:builtin|[^:\s]+)::type::[^:\s]+$/.test(value)) {
    throw new Error(`${label} must be one exact Go type object identity`);
  }
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 contract snapshot`);
}

function requireReason(value, label) {
  if (typeof value !== "string" || value.trim().length < 40 || /\b(?:todo|tbd|fixme|phase\s*\d+|slice\s*\d+)\b/i.test(value)) {
    throw new Error(`${label} must be one durable, timeless explanation of at least 40 characters`);
  }
}

function requireTypeParameterCount(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`);
}
