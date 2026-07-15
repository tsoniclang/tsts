import { compareText } from "../deterministic-order.mjs";
import { requireFinalizedExternalFacadeStorageCatalog } from "../external-facades.mjs";
import { buildTypeStoragePolicyCatalog } from "../type-storage-policies.mjs";

const builtinInterfaceObjectIds = Object.freeze([
  "builtin::type::any",
  "builtin::type::error",
]);

export class FinalizedIntrinsicGoValueOperationCatalog {
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
      disposition: "intrinsic",
      operationTypeParameterIndexes: entry.operationTypeParameterIndexes,
      typeParameterCount: entry.typeParameterCount,
    })]));
  }

  require(config, snapshot) { this.#requireInputs(config, snapshot); return this; }

  #requireInputs(config, snapshot) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("intrinsic Go value-operation catalog was built from different config or snapshot objects");
    }
  }
}

export function buildIntrinsicGoValueOperationCatalog(config, snapshot, externalFacadeCatalog) {
  const facades = requireFinalizedExternalFacadeStorageCatalog(externalFacadeCatalog, config, snapshot)
    .artifactFacades(config, snapshot);
  const entries = new Map(builtinInterfaceObjectIds.map((objectId) => [objectId, intrinsicEntry(objectId, 0, "interface")]));
  for (const [objectId, facade] of facades) {
    if (facade.runtimeAdaptation !== undefined) continue;
    addIntrinsicNamedType(entries, {
      arities: facade.variants.map(() => facade.arity),
      label: "external Go value type",
      objectId,
      rhsVariants: facade.variants.map((variant) => variant.declaration.rhs),
      storageIdentity: facade.storageIdentity,
    });
  }
  for (const [objectId, policy] of buildTypeStoragePolicyCatalog(config, snapshot)) {
    addIntrinsicNamedType(entries, {
      arities: policy.semantic.variants.map((variant) => variant.declaration.type.typeParameters.length),
      label: "excluded module-local Go value type",
      objectId,
      rhsVariants: policy.semantic.variants.map((variant) => variant.declaration.type.rhs),
      storageIdentity: policy.storageIdentity,
    });
  }
  return new FinalizedIntrinsicGoValueOperationCatalog(
    config,
    snapshot,
    [...entries].sort(([left], [right]) => compareText(left, right)),
  );
}

function addIntrinsicNamedType(entries, input) {
  const { arities, label, objectId, rhsVariants, storageIdentity } = input;
  const classifications = rhsVariants.map((rhs, index) => {
    if (rhs === null || typeof rhs !== "object" || Array.isArray(rhs) || typeof rhs.kind !== "string") {
      throw new Error(`${label} '${objectId}' variant #${index} has no exact semantic RHS`);
    }
    return rhs.kind;
  });
  const intrinsicCarriers = classifications.map(intrinsicCarrier);
  if (intrinsicCarriers.every((carrier) => carrier === undefined)) return;
  if (intrinsicCarriers.some((carrier) => carrier === undefined) || new Set(intrinsicCarriers).size !== 1) {
    throw new Error(`${label} '${objectId}' changes intrinsic carrier semantics across active profiles`);
  }
  const carrier = intrinsicCarriers[0];
  for (const [index, rhs] of rhsVariants.entries()) {
    if (rhs.nilable !== true) throw new Error(`${label} ${carrier} '${objectId}' variant #${index} is not intrinsically nilable`);
  }
  if (arities.length !== rhsVariants.length || arities.some((arity) => !Number.isSafeInteger(arity) || arity < 0) || new Set(arities).size !== 1) {
    throw new Error(`${label} intrinsic carrier '${objectId}' has no invariant generic arity`);
  }
  if (typeof storageIdentity !== "string" || storageIdentity === "") {
    throw new Error(`${label} intrinsic carrier '${objectId}' has no finalized TypeScript storage identity`);
  }
  if (entries.has(objectId)) throw new Error(`${label} intrinsic carrier '${objectId}' conflicts with another intrinsic provider`);
  entries.set(objectId, intrinsicEntry(objectId, arities[0], carrier, storageIdentity));
}

export function requireIntrinsicGoValueOperationCatalog(value, config, snapshot) {
  if (!(value instanceof FinalizedIntrinsicGoValueOperationCatalog)) {
    throw new Error("Go value-operation planning requires one finalized intrinsic catalog");
  }
  return value.require(config, snapshot);
}

function intrinsicEntry(objectId, typeParameterCount, intrinsicCarrier, storageIdentity = undefined) {
  return Object.freeze({
    disposition: "intrinsic",
    intrinsicCarrier,
    objectId,
    operationTypeParameterIndexes: Object.freeze([]),
    typeParameterCount,
    ...(storageIdentity === undefined ? {} : { storageIdentity }),
  });
}

function intrinsicCarrier(kind) {
  if (kind === "interface") return "interface";
  if (kind === "slice") return "slice";
  if (kind === "map") return "map";
  if (kind === "signature") return "function";
  return undefined;
}
