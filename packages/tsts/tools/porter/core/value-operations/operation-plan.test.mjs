import assert from "node:assert/strict";
import test from "node:test";

import { buildPorterUnitOwnership } from "../unit-ownership.mjs";
import { buildAuditedTypeStorageCatalog } from "../../sig-check/audited-type-storage.mjs";
import { emptyGeneratorOwnedGoValueOperationCatalog } from "./generator-owned-providers.mjs";
import { buildGoValueOperationPlan } from "./operation-plan.mjs";
import { buildReviewedGoValueOperationCatalog } from "./reviewed-providers.mjs";

test("the finalized operation plan uses direct storage ownership and package-level generated identity", () => {
  const fixture = planFixture();
  const reviewedProviders = buildReviewedGoValueOperationCatalog(fixture.config, fixture.snapshot);
  const generatorOwnedProviders = emptyGeneratorOwnedGoValueOperationCatalog(fixture.config, fixture.snapshot);
  const unitOwnership = buildPorterUnitOwnership({
    config: fixture.config,
    largeFileSplits: fixture.largeFileSplits,
    snapshot: fixture.snapshot,
    tsUnits: fixture.tsUnits,
  });
  const auditedStorage = auditedStorageFor(fixture, unitOwnership);
  const plan = buildGoValueOperationPlan({
    auditedStorage,
    config: fixture.config,
    generatorOwnedProviders,
    largeFileSplits: fixture.largeFileSplits,
    reviewedProviders,
    snapshot: fixture.snapshot,
    tsUnits: fixture.tsUnits,
    unitOwnership,
  });
  assert.equal(plan.size, 1);
  assert.equal(plan.generatedCount, 1);
  assert.equal(plan.providerCount, 0);
  const entry = plan.get(fixture.objectId);
  assert.equal(entry.disposition, "generated");
  assert.equal(entry.name, "Pair");
  assert.equal(entry.objectId, fixture.objectId);
  assert.equal(entry.operationIdentity, "src/internal/go-value-operations/generated/internal/sample.ts::PairValueOps");
  assert.deepEqual(entry.operationTypeParameterIndexes, [0]);
  assert.deepEqual(entry.requirementShape, {
      kind: "struct",
      fields: [{ name: "value", blank: false, shape: { kind: "typeParameter", key: `${fixture.objectId}::type::0`, name: "T" } }],
  });
  assert.equal(entry.semanticDeclaration, fixture.unit.semantic[0].type);
  assert.equal(entry.sourceUnit, unitOwnership.goByID.get(fixture.unit.id));
  assert.equal(entry.storageIdentity, "src/internal/sample/value.ts::Pair");
  assert.equal(entry.storageAudit, auditedStorage.get(fixture.objectId));
  assert.equal(entry.tsPath, "src/internal/sample/value.ts");
  assert.equal(entry.typeParameters.length, 1);
  assert.equal(entry.typeParameters[0].key, `${fixture.objectId}::type::0`);
  assert.equal(entry.typeParameters[0].name, "T");
  assert.equal(entry.typeParameters[0].semanticParameter, fixture.unit.semantic[0].type.typeParameters[0]);
  assert.equal(entry.unitId, fixture.unit.id);
});

test("operation planning rejects unfinalized and stale type ownership", () => {
  const fixture = planFixture();
  const reviewedProviders = buildReviewedGoValueOperationCatalog(fixture.config, fixture.snapshot);
  const generatorOwnedProviders = emptyGeneratorOwnedGoValueOperationCatalog(fixture.config, fixture.snapshot);
  const staleTsUnits = { ...fixture.tsUnits, units: [{ ...fixture.tsUnits.units[0], sigHash: "f".repeat(64) }] };
  Object.defineProperty(staleTsUnits.units[0], "declarationName", { value: "Pair", enumerable: false });
  const ownership = buildPorterUnitOwnership({
    config: fixture.config,
    largeFileSplits: fixture.largeFileSplits,
    snapshot: fixture.snapshot,
    tsUnits: staleTsUnits,
  });
  assert.throws(() => buildGoValueOperationPlan({
    auditedStorage: auditedStorageFor({ ...fixture, tsUnits: staleTsUnits }, ownership),
    config: fixture.config,
    generatorOwnedProviders,
    largeFileSplits: fixture.largeFileSplits,
    reviewedProviders,
    snapshot: fixture.snapshot,
    tsUnits: staleTsUnits,
    unitOwnership: ownership,
  }), /every active type declaration to be implemented and current/);
});

test("operation planning rejects generated operations for adapted TypeScript storage", () => {
  const fixture = planFixture();
  const reviewedProviders = buildReviewedGoValueOperationCatalog(fixture.config, fixture.snapshot);
  const generatorOwnedProviders = emptyGeneratorOwnedGoValueOperationCatalog(fixture.config, fixture.snapshot);
  const unitOwnership = buildPorterUnitOwnership({
    config: fixture.config,
    largeFileSplits: fixture.largeFileSplits,
    snapshot: fixture.snapshot,
    tsUnits: fixture.tsUnits,
  });
  const auditedStorage = auditedStorageFor(fixture, unitOwnership, [{ kind: "extra-member" }]);
  assert.throws(() => buildGoValueOperationPlan({
    auditedStorage,
    config: fixture.config,
    generatorOwnedProviders,
    largeFileSplits: fixture.largeFileSplits,
    reviewedProviders,
    snapshot: fixture.snapshot,
    tsUnits: fixture.tsUnits,
    unitOwnership,
  }), /adapted TypeScript storage.*reviewed operation provider/);
});

function planFixture() {
  const objectId = "example.test/compiler::type::Pair";
  const unitId = "example.test/compiler::internal/sample/value.go::type::Pair";
  const parameter = { ownerId: objectId, role: "type", index: 0, name: "T" };
  const declaration = {
    kind: "type",
    packagePath: "example.test/compiler/internal/sample",
    object: { id: objectId, name: "Pair", packagePath: "example.test/compiler/internal/sample", exported: true },
    type: {
      alias: false,
      object: { id: objectId, name: "Pair", packagePath: "example.test/compiler/internal/sample", exported: true },
      typeParameters: [{ reference: parameter, constraint: { kind: "interface", nilable: true, interface: {} } }],
      rhs: {
        kind: "struct",
        nilable: false,
        struct: { fields: [{ variable: { id: `${objectId}::rhs::field::0`, name: "value", embedded: false, type: { kind: "typeParameter", nilable: false, typeParameter: parameter } } }] },
      },
    },
    profiles: [0],
  };
  const unit = {
    id: unitId,
    kind: "type",
    qualifiedName: "Pair",
    sigHash: "a".repeat(64),
    generated: false,
    metadata: { goPath: "internal/sample/value.go" },
    semantic: [declaration],
  };
  const file = {
    path: "internal/sample/value.go",
    importPath: "example.test/compiler/internal/sample",
    packageName: "sample",
    lineCount: 1,
    generated: false,
    units: [unit],
  };
  const snapshot = {
    files: [file],
    semantic: {
      requiredFiles: [file.path],
      excludedFiles: [],
      dependencyTypeDeclarations: [],
      externalPackageSurface: { declarations: [], dependencyTypeDeclarations: [] },
    },
  };
  const tsUnit = {
    id: unitId,
    kind: "type",
    status: "implemented",
    sigHash: unit.sigHash,
    path: "src/internal/sample/value.ts",
    metadata: { id: unitId, kind: "type", status: "implemented", sigHash: unit.sigHash },
  };
  Object.defineProperty(tsUnit, "declarationName", { value: "Pair", enumerable: false });
  return {
    config: { goModulePath: "example.test/compiler", semanticRelations: [], tsRoot: "src" },
    largeFileSplits: { assignments: {} },
    objectId,
    snapshot,
    tsUnits: { files: [{ path: tsUnit.path, metadataCount: 1 }], units: [tsUnit] },
    unit,
  };
}

function auditedStorageFor(fixture, unitOwnership, rawMismatches = []) {
  const typeParameter = {
    name: "T",
    binding: { depth: 0, index: 0 },
    modifiers: { const: false, variance: null, unsupported: [] },
    constraint: null,
    default: null,
    invalidConstraint: null,
  };
  const descriptor = {
    kind: "interface",
    modifiers: ["export"],
    typeParams: [typeParameter],
    heritage: [],
    members: [{ kind: "property", name: "value", modifiers: [], type: { t: "tp", depth: 0, index: 0 } }],
  };
  return buildAuditedTypeStorageCatalog({
    canonicalIdentity: (identity) => identity,
    config: fixture.config,
    largeFileSplits: fixture.largeFileSplits,
    records: [{
      actual: descriptor,
      expected: descriptor,
      goUnit: unitOwnership.goByID.get(fixture.unit.id),
      rawMismatches,
      tsUnit: unitOwnership.tsByID.get(fixture.unit.id),
      valueType: { t: "ref", id: "src/internal/sample/value.ts::Pair", args: [{ t: "tp", depth: 0, index: 0 }] },
    }],
    snapshot: fixture.snapshot,
    tsUnits: fixture.tsUnits,
    unitOwnership,
  });
}
