import { compareText } from "../deterministic-order.mjs";
import { semanticDeclarationVariantsHash } from "../semantic-declaration-hash.mjs";
import { canonicalSchemaValue } from "../semantic-variants.mjs";
import { buildSemanticTypeCatalog } from "../type-storage-policies.mjs";
import { requireDirectProviderIdentity } from "./provider-identity.mjs";

const registeredOwners = new Map([
  ["porter:ast", "internal/ast/generated"],
]);

export class FinalizedGeneratorOwnedGoValueOperationCatalog {
  #config;
  #entries;
  #snapshot;

  constructor(config, snapshot, entries) {
    this.#config = config;
    this.#snapshot = snapshot;
    this.#entries = new Map(entries);
    Object.freeze(this);
  }

  get size() { return this.#entries.size; }
  get(objectId) { return this.#entries.get(objectId); }
  has(objectId) { return this.#entries.has(objectId); }
  entries() { return this.#entries.entries(); }
  [Symbol.iterator]() { return this.#entries[Symbol.iterator](); }

  requirements(config, snapshot) {
    this.#requireInputs(config, snapshot);
    return new Map([...this.#entries].map(([objectId, entry]) => [objectId, Object.freeze({
      disposition: "generator-owned",
      operationTypeParameterIndexes: entry.operationTypeParameterIndexes,
      typeParameterCount: entry.typeParameterCount,
    })]));
  }

  require(config, snapshot) { this.#requireInputs(config, snapshot); return this; }

  #requireInputs(config, snapshot) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("generator-owned Go value-operation catalog was built from different config or snapshot objects");
    }
  }
}

export function buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, values) {
  if (!Array.isArray(values)) throw new Error("generator-owned Go value operations must be an array");
  const semanticTypes = buildSemanticTypeCatalog(snapshot);
  const entries = new Map();
  const operationOwners = new Map();
  for (const [index, value] of values.entries()) {
    const label = `generator-owned Go value operation[${index}]`;
    requireExactObject(value, new Set([
      "goDeclarationHash",
      "objectId",
      "operationIdentity",
      "operationTypeParameterIndexes",
      "ownerId",
      "storageIdentity",
      "tsDeclarationHash",
      "typeParameterCount",
    ]), label);
    const relativeRoot = registeredOwners.get(value.ownerId);
    if (relativeRoot === undefined) throw new Error(`${label}.ownerId '${value.ownerId}' is not a registered operation generator`);
    requireGoTypeIdentity(value.objectId, `${label}.objectId`);
    requireOperationIdentity(value.operationIdentity, config, relativeRoot, `${label}.operationIdentity`);
    requireGeneratedIdentity(value.storageIdentity, config, relativeRoot, `${label}.storageIdentity`, "storage");
    requireHash(value.goDeclarationHash, `${label}.goDeclarationHash`);
    requireHash(value.tsDeclarationHash, `${label}.tsDeclarationHash`);
    requireTypeParameterCount(value.typeParameterCount, `${label}.typeParameterCount`);
    const indexes = requireOperationIndexes(value.operationTypeParameterIndexes, value.typeParameterCount, `${label}.operationTypeParameterIndexes`);
    if (entries.has(value.objectId)) throw new Error(`${label} duplicates generator-owned object '${value.objectId}'`);
    const previous = operationOwners.get(value.operationIdentity);
    if (previous !== undefined) throw new Error(`${label}.operationIdentity '${value.operationIdentity}' is already owned by '${previous}'`);
    const semantic = semanticTypes.get(value.objectId);
    if (semantic === undefined) throw new Error(`${label}.objectId '${value.objectId}' has no extracted Go type declaration`);
    requireInvariantStorageShape(semantic, label);
    const arity = requireSemanticArity(semantic, label);
    if (arity !== value.typeParameterCount) {
      throw new Error(`${label}.typeParameterCount is ${value.typeParameterCount}, but the Go declaration arity is ${arity}`);
    }
    const currentHash = semanticDeclarationVariantsHash(semantic, `generator-owned Go value operations '${value.objectId}'`);
    if (currentHash !== value.goDeclarationHash) throw new Error(`${label} Go declaration snapshot drifted: config=${value.goDeclarationHash} current=${currentHash}`);
    const entry = Object.freeze({
      goDeclarationHash: value.goDeclarationHash,
      objectId: value.objectId,
      operationIdentity: value.operationIdentity,
      operationTypeParameterIndexes: Object.freeze(indexes),
      ownerId: value.ownerId,
      semantic,
      storageIdentity: value.storageIdentity,
      tsDeclarationHash: value.tsDeclarationHash,
      typeParameterCount: value.typeParameterCount,
    });
    entries.set(value.objectId, entry);
    operationOwners.set(value.operationIdentity, value.objectId);
  }
  return new FinalizedGeneratorOwnedGoValueOperationCatalog(
    config,
    snapshot,
    [...entries].sort(([left], [right]) => compareText(left, right)),
  );
}

export function emptyGeneratorOwnedGoValueOperationCatalog(config, snapshot) {
  return buildGeneratorOwnedGoValueOperationCatalog(config, snapshot, []);
}

export function requireGeneratorOwnedGoValueOperationCatalog(value, config, snapshot) {
  if (!(value instanceof FinalizedGeneratorOwnedGoValueOperationCatalog)) {
    throw new Error("Go value-operation planning requires one finalized generator-owned catalog");
  }
  return value.require(config, snapshot);
}

function requireOperationIdentity(value, config, relativeRoot, label) {
  requireGeneratedIdentity(value, config, relativeRoot, label, "operation");
}

function requireGeneratedIdentity(value, config, relativeRoot, label, role) {
  const root = `${config.tsRoot.replace(/\/+$/, "")}/${relativeRoot}`;
  requireDirectProviderIdentity(value, root, label, `generated ${role}`);
}

function requireInvariantStorageShape(semantic, label) {
  const storageShapes = new Set(semantic.variants.map((variant) => canonicalSchemaValue({
    alias: variant.declaration.type.alias,
    rhs: variant.declaration.type.rhs,
    typeParameters: variant.declaration.type.typeParameters,
  })));
  if (storageShapes.size !== 1) {
    throw new Error(`${label}.objectId '${semantic.objectId}' changes storage shape across semantic profiles`);
  }
}

function requireSemanticArity(semantic, label) {
  const arities = new Set(semantic.variants.map((variant) => variant.declaration.type.typeParameters.length));
  if (arities.size !== 1) {
    throw new Error(`${label}.objectId '${semantic.objectId}' changes generic arity across semantic profiles`);
  }
  return arities.values().next().value;
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
  if (typeof value !== "string" || !/^(?:builtin|[^:\s]+)::type::[^:\s]+$/.test(value)) throw new Error(`${label} must be one exact Go type object identity`);
}

function requireHash(value, label) {
  if (typeof value !== "string" || !/^[0-9a-f]{64}$/.test(value)) throw new Error(`${label} must be one SHA-256 contract snapshot`);
}

function requireTypeParameterCount(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error(`${label} must be a non-negative safe integer`);
}

function requireOperationIndexes(value, arity, label) {
  if (!Array.isArray(value)) throw new Error(`${label} must be an array`);
  const indexes = [];
  let previous = -1;
  for (const [position, index] of value.entries()) {
    if (!Number.isSafeInteger(index) || index < 0 || index >= arity) throw new Error(`${label}[${position}] '${index}' is outside generic arity ${arity}`);
    if (index <= previous) throw new Error(`${label} must be strictly increasing with no duplicates`);
    previous = index;
    indexes.push(index);
  }
  return indexes;
}
