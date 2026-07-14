import { compareText } from "../deterministic-order.mjs";
import { requireFinalizedExternalFacadeStorageCatalog } from "../external-facades.mjs";

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
    const classifications = facade.variants.map((variant, index) => {
      const rhs = variant?.declaration?.rhs;
      if (rhs === null || typeof rhs !== "object" || Array.isArray(rhs) || typeof rhs.kind !== "string") {
        throw new Error(`external Go value type '${objectId}' variant #${index} has no exact semantic RHS`);
      }
      return rhs.kind;
    });
    const intrinsicCarriers = classifications.map(intrinsicCarrier);
    if (intrinsicCarriers.every((carrier) => carrier === undefined)) continue;
    if (intrinsicCarriers.some((carrier) => carrier === undefined) || new Set(intrinsicCarriers).size !== 1) {
      throw new Error(`external Go value type '${objectId}' changes intrinsic carrier semantics across active profiles`);
    }
    const carrier = intrinsicCarriers[0];
    for (const [index, variant] of facade.variants.entries()) {
      if (variant.declaration.rhs.nilable !== true) {
        throw new Error(`external Go ${carrier} type '${objectId}' variant #${index} is not intrinsically nilable`);
      }
    }
    if (facade.runtimeAdaptation !== undefined) continue;
    if (!Number.isSafeInteger(facade.arity) || facade.arity < 0) {
      throw new Error(`external Go intrinsic carrier '${objectId}' has invalid generic arity '${facade.arity}'`);
    }
    if (typeof facade.storageIdentity !== "string" || facade.storageIdentity === "") {
      throw new Error(`external Go intrinsic carrier '${objectId}' has no finalized TypeScript storage identity`);
    }
    if (entries.has(objectId)) throw new Error(`external Go intrinsic carrier '${objectId}' conflicts with an intrinsic builtin identity`);
    entries.set(objectId, intrinsicEntry(objectId, facade.arity, carrier, facade.storageIdentity));
  }
  return new FinalizedIntrinsicGoValueOperationCatalog(
    config,
    snapshot,
    [...entries].sort(([left], [right]) => compareText(left, right)),
  );
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
