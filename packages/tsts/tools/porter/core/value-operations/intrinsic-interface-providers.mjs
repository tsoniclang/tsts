import { compareText } from "../deterministic-order.mjs";
import { requireFinalizedExternalFacadeStorageCatalog } from "../external-facades.mjs";

const builtinInterfaceObjectIds = Object.freeze([
  "builtin::type::any",
  "builtin::type::error",
]);

export class FinalizedIntrinsicInterfaceGoValueOperationCatalog {
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
      throw new Error("intrinsic interface Go value-operation catalog was built from different config or snapshot objects");
    }
  }
}

export function buildIntrinsicInterfaceGoValueOperationCatalog(config, snapshot, externalFacadeCatalog) {
  const facades = requireFinalizedExternalFacadeStorageCatalog(externalFacadeCatalog, config, snapshot)
    .artifactFacades(config, snapshot);
  const entries = new Map(builtinInterfaceObjectIds.map((objectId) => [objectId, intrinsicEntry(objectId, 0)]));
  for (const [objectId, facade] of facades) {
    const classifications = facade.variants.map((variant, index) => {
      const rhs = variant?.declaration?.rhs;
      if (rhs === null || typeof rhs !== "object" || Array.isArray(rhs) || typeof rhs.kind !== "string") {
        throw new Error(`external Go value type '${objectId}' variant #${index} has no exact semantic RHS`);
      }
      return rhs.kind;
    });
    const interfaceCount = classifications.filter((kind) => kind === "interface").length;
    if (interfaceCount === 0) continue;
    if (interfaceCount !== classifications.length) {
      throw new Error(`external Go value type '${objectId}' changes interface value semantics across active profiles`);
    }
    for (const [index, variant] of facade.variants.entries()) {
      if (variant.declaration.rhs.nilable !== true) {
        throw new Error(`external Go interface '${objectId}' variant #${index} is not intrinsically nilable`);
      }
    }
    if (!Number.isSafeInteger(facade.arity) || facade.arity < 0) {
      throw new Error(`external Go interface '${objectId}' has invalid generic arity '${facade.arity}'`);
    }
    if (typeof facade.storageIdentity !== "string" || facade.storageIdentity === "") {
      throw new Error(`external Go interface '${objectId}' has no finalized TypeScript storage identity`);
    }
    if (entries.has(objectId)) throw new Error(`external Go interface '${objectId}' conflicts with an intrinsic builtin identity`);
    entries.set(objectId, intrinsicEntry(objectId, facade.arity, facade.storageIdentity));
  }
  return new FinalizedIntrinsicInterfaceGoValueOperationCatalog(
    config,
    snapshot,
    [...entries].sort(([left], [right]) => compareText(left, right)),
  );
}

export function requireIntrinsicInterfaceGoValueOperationCatalog(value, config, snapshot) {
  if (!(value instanceof FinalizedIntrinsicInterfaceGoValueOperationCatalog)) {
    throw new Error("Go value-operation planning requires one finalized intrinsic-interface catalog");
  }
  return value.require(config, snapshot);
}

function intrinsicEntry(objectId, typeParameterCount, storageIdentity = undefined) {
  return Object.freeze({
    disposition: "intrinsic",
    objectId,
    operationTypeParameterIndexes: Object.freeze([]),
    typeParameterCount,
    ...(storageIdentity === undefined ? {} : { storageIdentity }),
  });
}
