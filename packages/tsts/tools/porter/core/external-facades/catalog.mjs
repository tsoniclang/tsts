class FinalizedExternalFacadeStorageCatalog {
  #artifactView;
  #authoredSurfaces;
  #auditView;
  #config;
  #snapshot;

  constructor(config, snapshot, artifactFacades, auditFacades, authoredSurfaces) {
    this.#config = config;
    this.#snapshot = snapshot;
    this.#artifactView = new ImmutableFacadeView(config, snapshot, "artifact", artifactFacades);
    this.#auditView = new ImmutableFacadeView(config, snapshot, "audit", auditFacades);
    this.#authoredSurfaces = new Map([...authoredSurfaces].map(([objectId, surface]) => [
      objectId,
      immutableFacadeEvidenceCopy(surface),
    ]));
    Object.freeze(this);
  }

  artifactFacades(config, snapshot) { this.#requireInputs(config, snapshot); return this.#artifactView; }
  auditFacades(config, snapshot) { this.#requireInputs(config, snapshot); return this.#auditView; }
  authoredSurface(config, snapshot, objectId) { this.#requireInputs(config, snapshot); return this.#authoredSurfaces.get(objectId); }

  #requireInputs(config, snapshot) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("external facade catalog was built from different config or snapshot objects");
    }
  }
}

class ImmutableFacadeView {
  #config;
  #facades;
  #scope;
  #snapshot;

  constructor(config, snapshot, scope, facades) {
    this.#config = config;
    this.#facades = new Map(facades);
    this.#scope = scope;
    this.#snapshot = snapshot;
    Object.freeze(this);
  }

  get size() { return this.#facades.size; }
  get(objectId) { return this.#facades.get(objectId); }
  has(objectId) { return this.#facades.has(objectId); }
  entries() { return this.#facades.entries(); }
  keys() { return this.#facades.keys(); }
  values() { return this.#facades.values(); }
  [Symbol.iterator]() { return this.#facades[Symbol.iterator](); }

  require(config, snapshot, expectedScope) {
    if (config !== this.#config || snapshot !== this.#snapshot) {
      throw new Error("external facade storage view was built from different config or snapshot objects");
    }
    if (expectedScope !== undefined && expectedScope !== this.#scope) {
      throw new Error(`external facade storage view has '${this.#scope}' scope, not required '${expectedScope}' scope`);
    }
    return this.#scope;
  }
}

export function createFinalizedExternalFacadeStorageCatalog(config, snapshot, artifactFacades, auditFacades, authoredSurfaces) {
  return new FinalizedExternalFacadeStorageCatalog(config, snapshot, artifactFacades, auditFacades, authoredSurfaces);
}

export function requireFinalizedExternalFacadeStorageCatalog(value, config, snapshot) {
  if (!(value instanceof FinalizedExternalFacadeStorageCatalog)) {
    throw new Error("operation requires one finalized external facade storage catalog");
  }
  value.artifactFacades(config, snapshot);
  return value;
}

export function requireExternalFacadeStorageView(value, config, snapshot, expectedScope = undefined) {
  if (!(value instanceof ImmutableFacadeView)) {
    throw new Error("operation requires one finalized external facade storage view");
  }
  return value.require(config, snapshot, expectedScope);
}

export function immutableFacadeEvidenceCopy(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return Object.freeze(value.map(immutableFacadeEvidenceCopy));
  if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
    throw new Error("finalized external facade evidence contains a non-canonical mutable object");
  }
  return Object.freeze(Object.fromEntries(Object.entries(value).map(([key, entry]) => [
    key,
    immutableFacadeEvidenceCopy(entry),
  ])));
}
