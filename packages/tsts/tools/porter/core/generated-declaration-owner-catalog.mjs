import { compareText } from "./deterministic-order.mjs";

const constructionToken = Symbol("FinalizedGeneratedDeclarationOwnerCatalog");
const ownerKeys = Object.freeze(["generator", "moduleId", "objectId", "tsName", "unitId"]);

export class FinalizedGeneratedDeclarationOwnerCatalog {
  #config;
  #owners;
  #snapshot;

  constructor(token, config, snapshot, owners) {
    if (token !== constructionToken) throw new Error("generated declaration owner catalogs must be finalized by Porter");
    this.#config = config;
    this.#snapshot = snapshot;
    this.#owners = new Map(owners);
    Object.freeze(this);
  }

  get size() { return this.#owners.size; }
  get(objectId) { return this.#owners.get(objectId); }
  has(objectId) { return this.#owners.has(objectId); }
  entries() { return this.#owners.entries(); }
  keys() { return this.#owners.keys(); }
  values() { return this.#owners.values(); }
  [Symbol.iterator]() { return this.#owners[Symbol.iterator](); }

  require(config, snapshot) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("generated declaration owner catalog was built from different config or snapshot objects");
    }
    return this;
  }
}

export function finalizeGeneratedDeclarationOwners(config, snapshot, owners) {
  if (!Array.isArray(owners)) throw new Error("generated declaration owners must be one finalized array");
  const byObjectId = new Map();
  for (const owner of owners) {
    validateGeneratedDeclarationOwnerShape(owner);
    const frozen = Object.freeze({ ...owner });
    if (byObjectId.has(frozen.objectId)) throw new Error(`generated Go object '${frozen.objectId}' has more than one finalized owner`);
    byObjectId.set(frozen.objectId, frozen);
  }
  return new FinalizedGeneratedDeclarationOwnerCatalog(
    constructionToken,
    config,
    snapshot,
    [...byObjectId].sort(([left], [right]) => compareText(left, right)),
  );
}

export function validateGeneratedDeclarationOwnerShape(owner) {
  if (owner === null || typeof owner !== "object" || Array.isArray(owner)) {
    throw new Error("generated declaration owner must be one object");
  }
  const actual = Object.keys(owner).sort(compareText);
  const expected = [...ownerKeys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`generated declaration ownership keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  for (const key of ownerKeys) {
    if (typeof owner[key] !== "string" || owner[key] === "") {
      throw new Error(`generated declaration ownership ${key} must be non-empty`);
    }
  }
}

export function emptyGeneratedDeclarationOwnerCatalog(config, snapshot) {
  return finalizeGeneratedDeclarationOwners(config, snapshot, []);
}

export function requireGeneratedDeclarationOwnerCatalog(value, config, snapshot) {
  if (!(value instanceof FinalizedGeneratedDeclarationOwnerCatalog)) {
    throw new Error("operation requires one finalized generated declaration owner catalog");
  }
  return value.require(config, snapshot);
}
