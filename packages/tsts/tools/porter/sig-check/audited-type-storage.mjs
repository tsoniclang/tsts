import { compareText } from "../core/deterministic-order.mjs";
import { invariantSemanticVariant } from "../core/semantic-variants.mjs";
import { requirePorterUnitOwnership } from "../core/unit-ownership.mjs";
import { directUnitStorageIdentity } from "../core/value-operations/storage-identity.mjs";
import { unitSignatureHash, unitSignatureSnapshot } from "./overrides.mjs";

const finalizedInputs = new WeakMap();
const inputKeys = Object.freeze(["canonicalIdentity", "config", "largeFileSplits", "records", "snapshot", "tsUnits", "unitOwnership"]);
const recordKeys = Object.freeze(["actual", "expected", "goUnit", "rawMismatches", "tsUnit", "valueType"]);

export class FinalizedAuditedTypeStorageCatalog {
  #entries;

  constructor(inputs, entries) {
    this.#entries = new Map(entries.map((entry) => [entry.objectId, entry]));
    finalizedInputs.set(this, inputs);
    Object.freeze(this);
  }

  get size() { return this.#entries.size; }
  get(objectId) { return this.#entries.get(objectId); }
  entries() { return this.#entries.values(); }
  [Symbol.iterator]() { return this.#entries[Symbol.iterator](); }
}

export function buildAuditedTypeStorageCatalog(input) {
  requireExactObject(input, inputKeys, "audited type-storage input");
  const { canonicalIdentity, config, largeFileSplits, records, snapshot, tsUnits, unitOwnership } = input;
  if (typeof canonicalIdentity !== "function") throw new Error("audited type storage requires one finalized canonical-identity resolver");
  requirePorterUnitOwnership(unitOwnership, {
    config,
    largeFileSplits,
    snapshot,
    tsUnits,
  });
  if (!Array.isArray(records)) throw new Error("audited type-storage records must be an array");
  const entries = [];
  const objectIds = new Set();
  const storageOwners = new Map();
  for (const [index, record] of records.entries()) {
    const label = `audited type-storage record[${index}]`;
    requireExactObject(record, recordKeys, label);
    const { actual, expected, goUnit, rawMismatches, tsUnit, valueType } = record;
    if (goUnit?.kind !== "type") throw new Error(`${label}.goUnit must be one type declaration`);
    if (!Array.isArray(rawMismatches)) throw new Error(`${label}.rawMismatches must be an array`);
    const semanticDeclaration = invariantSemanticVariant(goUnit, "bound to audited TypeScript storage").type;
    const objectId = requireIdentity(semanticDeclaration?.object?.id, `${label} objectId`);
    if (objectIds.has(objectId)) throw new Error(`${label} duplicates Go object '${objectId}'`);
    objectIds.add(objectId);
    const storageIdentity = directUnitStorageIdentity(config, tsUnit, objectId);
    const previousStorageOwner = storageOwners.get(storageIdentity);
    if (previousStorageOwner !== undefined) {
      throw new Error(`${label} storage '${storageIdentity}' is already owned by '${previousStorageOwner}'`);
    }
    storageOwners.set(storageIdentity, objectId);
    const exact = rawMismatches.length === 0;
    const fieldMappings = exact ? buildFieldMappings(semanticDeclaration, expected, actual, label) : [];
    entries.push(Object.freeze({
      actualDescriptorHash: unitSignatureHash(actual, canonicalIdentity),
      actualDescriptorSnapshot: unitSignatureSnapshot(actual, canonicalIdentity),
      exact,
      expectedDescriptorHash: unitSignatureHash(expected, canonicalIdentity),
      expectedDescriptorSnapshot: unitSignatureSnapshot(expected, canonicalIdentity),
      fieldMappings: Object.freeze(fieldMappings),
      objectId,
      rawMismatchKinds: Object.freeze(rawMismatches.map((mismatch) => String(mismatch?.kind ?? "invalid-mismatch"))),
      semanticDeclaration,
      storageIdentity,
      unitId: goUnit.id,
      valueTypeDescriptor: deepFreeze(structuredClone(valueType)),
      valueTypeDescriptorHash: unitSignatureHash(valueType, canonicalIdentity),
      valueTypeDescriptorSnapshot: unitSignatureSnapshot(valueType, canonicalIdentity),
    }));
  }
  entries.sort((left, right) => compareText(left.objectId, right.objectId));
  const catalog = new FinalizedAuditedTypeStorageCatalog(
    Object.freeze({ canonicalIdentity, config, snapshot, unitOwnership }),
    entries,
  );
  return catalog;
}

export function requireAuditedTypeStorageCatalog(value, input) {
  if (!(value instanceof FinalizedAuditedTypeStorageCatalog)) {
    throw new Error("Go value-operation planning requires one finalized audited type-storage catalog");
  }
  const finalized = finalizedInputs.get(value);
  if (finalized === undefined || finalized.config !== input.config || finalized.snapshot !== input.snapshot ||
      finalized.unitOwnership !== input.unitOwnership) {
    throw new Error("audited type-storage catalog was built from different config, snapshot, or ownership objects");
  }
  return value;
}

function buildFieldMappings(declaration, expected, actual, label) {
  if (declaration?.rhs?.kind !== "struct") return [];
  const fields = declaration.rhs.struct?.fields;
  if (!Array.isArray(fields)) throw new Error(`${label} has no exact semantic struct fields`);
  if (fields.length === 0) return [];
  if (expected?.kind !== "interface" || actual?.kind !== "interface" ||
      !Array.isArray(expected.members) || !Array.isArray(actual.members)) {
    throw new Error(`${label} exact struct storage must be one audited TypeScript interface`);
  }
  if (expected.members.length !== fields.length || actual.members.length !== fields.length) {
    throw new Error(`${label} exact struct field count differs from audited TypeScript storage`);
  }
  return fields.map((field, index) => {
    const variable = field?.variable;
    const expectedMember = expected.members[index];
    const actualMember = actual.members[index];
    if (expectedMember?.kind !== "property" || actualMember?.kind !== "property" || expectedMember.name !== actualMember.name) {
      throw new Error(`${label} field #${index} has no exact audited TypeScript property mapping`);
    }
    return Object.freeze({
      blank: variable?.name === "_",
      goFieldId: requireIdentity(variable?.id, `${label} field #${index} identity`),
      goFieldIndex: index,
      goFieldName: requireIdentity(variable?.name, `${label} field #${index} name`),
      tsMemberIndex: index,
      tsMemberName: actualMember.name,
    });
  });
}

function requireExactObject(value, keys, label) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new Error(`${label} must be an object`);
  const actual = Object.keys(value).sort(compareText);
  const expected = [...keys].sort(compareText);
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    throw new Error(`${label} keys must be exactly ${expected.join(", ")}; got ${actual.join(", ")}`);
  }
  for (const key of expected) if (value[key] === undefined) throw new Error(`${label}.${key} must be defined`);
}

function requireIdentity(value, label) {
  if (typeof value !== "string" || value === "" || value.includes("\0")) throw new Error(`${label} is missing`);
  return value;
}

function deepFreeze(value) {
  if (value !== null && typeof value === "object" && !Object.isFrozen(value)) {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
