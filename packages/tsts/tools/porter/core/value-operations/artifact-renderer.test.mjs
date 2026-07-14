import assert from "node:assert/strict";
import test from "node:test";

import { buildPorterUnitOwnership } from "../unit-ownership.mjs";
import { buildAuditedTypeStorageCatalog } from "../../sig-check/audited-type-storage.mjs";
import { finalizeGeneratedFacadeFixtureCatalog } from "../../test/external-facade-fixtures.mjs";
import { snapshotWith } from "../../test/helpers.mjs";
import { renderGoValueOperationArtifacts } from "./artifact-renderer.mjs";
import { emptyGeneratorOwnedGoValueOperationCatalog } from "./generator-owned-providers.mjs";
import { buildGoValueOperationPlan } from "./operation-plan.mjs";
import { buildReviewedGoValueOperationCatalog } from "./reviewed-providers.mjs";

test("generated value operations use exact audited storage and operation-bearing parameters", () => {
  const fixture = operationFixture();
  const artifacts = renderGoValueOperationArtifacts({
    config: fixture.config,
    externalFacadeCatalog: fixture.externalFacadeCatalog,
    largeFileSplits: fixture.largeFileSplits,
    plan: fixture.plan,
    snapshot: fixture.snapshot,
  });
  assert.equal(artifacts.size, 1);
  const source = artifacts.get("packages/tsts/src/internal/go-value-operations/generated/internal/sample.ts");
  assert.match(source, /import \{ GoArrayValueOps, GoBooleanValueOps, GoZeroLengthArrayValueOps \} from "\.\.\/\.\.\/\.\.\/\.\.\/go\/compat\.js";/);
  assert.match(source, /import type \{ GoArray, GoValueOps \} from "\.\.\/\.\.\/\.\.\/\.\.\/go\/compat\.js";/);
  assert.match(source, /import type \{ Pair \} from "\.\.\/\.\.\/\.\.\/sample\/value\.js";/);
  assert.match(source, /export function PairValueOps<T>\(valueOps0: GoValueOps<T>\): GoValueOps<Pair<T>>/);
  assert.match(source, /const fieldOps1 = valueOps0;/);
  assert.match(source, /const fieldOps2 = GoArrayValueOps<bool, "2">\(2, GoBooleanValueOps\);/);
  assert.match(source, /const fieldOps3 = GoZeroLengthArrayValueOps<T>\(\);/);
  assert.match(source, /zero: \(\): Pair<T> => \(\{ value: fieldOps0\.zero\(\), __tsgoBlank0: fieldOps1\.zero\(\), flags: fieldOps2\.zero\(\), empty: fieldOps3\.zero\(\) \}\)/);
  assert.match(source, /copy: \(value: Pair<T>\): Pair<T> => \(\{ value: fieldOps0\.copy\(value\.value\), __tsgoBlank0: fieldOps1\.zero\(\), flags: fieldOps2\.copy\(value\.flags\), empty: fieldOps3\.copy\(value\.empty\) \}\)/);
});

function operationFixture() {
  const config = {
    goModulePath: "github.com/microsoft/typescript-go",
    semanticRelations: [],
    tsRoot: "packages/tsts/src",
  };
  const objectId = `${config.goModulePath}/internal/sample::type::Pair`;
  const unitId = `${config.goModulePath}::internal/sample/value.go::type::Pair`;
  const parameterReference = { ownerId: objectId, role: "type", index: 0, name: "T" };
  const typeParameter = {
    reference: parameterReference,
    constraint: emptyInterfaceType(),
    constraintSyntax: "any",
  };
  const objectType = {
    kind: "named",
    nilable: false,
    reference: { objectId, packagePath: `${config.goModulePath}/internal/sample`, name: "Pair", typeArgs: [] },
  };
  const object = {
    id: objectId,
    name: "Pair",
    packagePath: `${config.goModulePath}/internal/sample`,
    exported: true,
    type: objectType,
  };
  const fieldType = { kind: "typeParameter", nilable: false, typeParameter: parameterReference };
  const fields = [
    semanticField(object, objectId, 0, "value", fieldType),
    semanticField(object, objectId, 1, "_", fieldType),
    semanticField(object, objectId, 2, "flags", {
      kind: "array", nilable: false, length: "2", element: { kind: "basic", nilable: false, basic: { name: "bool", untyped: false } },
    }),
    semanticField(object, objectId, 3, "empty", {
      kind: "array", nilable: false, length: "0", element: fieldType,
    }),
  ];
  const declaration = {
    kind: "type",
    packagePath: object.packagePath,
    object,
    type: {
      alias: false,
      object,
      typeParameters: [typeParameter],
      rhs: { kind: "struct", nilable: false, struct: { fields } },
      methodSurface: "declaration-units",
      methods: [],
      valueMethodSet: [],
      pointerMethodSet: [],
    },
    profiles: [0],
  };
  const unit = {
    id: unitId,
    kind: "type",
    name: "Pair",
    qualifiedName: "Pair",
    sigHash: "a".repeat(64),
    generated: false,
    metadata: { goPath: "internal/sample/value.go" },
    members: fields.map((field) => ({ kind: "field", name: field.variable.name })),
    semantic: [declaration],
    typeParameterDetails: [{ name: "T", constraint: { text: "any" } }],
  };
  const file = {
    path: "internal/sample/value.go",
    importPath: object.packagePath,
    packageName: "sample",
    lineCount: 3,
    generated: false,
    imports: [],
    units: [unit],
  };
  const snapshot = snapshotWith([file]);
  const tsUnit = {
    id: unitId,
    kind: "type",
    status: "implemented",
    sigHash: unit.sigHash,
    path: "packages/tsts/src/internal/sample/value.ts",
    metadata: { id: unitId, kind: "type", status: "implemented", sigHash: unit.sigHash },
  };
  Object.defineProperty(tsUnit, "declarationName", { value: "Pair", enumerable: false });
  const tsUnits = { files: [{ path: tsUnit.path, metadataCount: 1 }], units: [tsUnit] };
  const largeFileSplits = { assignments: {} };
  const unitOwnership = buildPorterUnitOwnership({ config, largeFileSplits, snapshot, tsUnits });
  const typeParameterDescriptor = {
    name: "T",
    binding: { depth: 0, index: 0 },
    modifiers: { const: false, variance: null, unsupported: [] },
    constraint: { t: "kw", kw: "unknown" },
    default: null,
    invalidConstraint: null,
  };
  const storageDescriptor = {
    kind: "interface",
    modifiers: ["export"],
    typeParams: [typeParameterDescriptor],
    heritage: [],
    members: [
      { kind: "property", name: "value", modifiers: [], type: { t: "tp", depth: 0, index: 0 } },
      { kind: "property", name: "__tsgoBlank0", modifiers: [], type: { t: "tp", depth: 0, index: 0 } },
      { kind: "property", name: "flags", modifiers: [], type: {
        t: "ref", id: "packages/tsts/src/go/compat.ts::GoArray", args: [
          { t: "ref", id: "packages/tsts/src/go/scalars.ts::bool", args: [] },
          { t: "literal", kind: "string", value: "2" },
        ],
      } },
      { kind: "property", name: "empty", modifiers: [], type: {
        t: "ref", id: "packages/tsts/src/go/compat.ts::GoArray", args: [
          { t: "tp", depth: 0, index: 0 },
          { t: "literal", kind: "string", value: "0" },
        ],
      } },
    ],
  };
  const auditedStorage = buildAuditedTypeStorageCatalog({
    canonicalIdentity: (identity) => identity,
    config,
    largeFileSplits,
    records: [{
      actual: storageDescriptor,
      expected: storageDescriptor,
      goUnit: unitOwnership.goByID.get(unitId),
      rawMismatches: [],
      tsUnit: unitOwnership.tsByID.get(unitId),
      valueType: { t: "ref", id: `${tsUnit.path}::Pair`, args: [{ t: "tp", depth: 0, index: 0 }] },
    }],
    snapshot,
    tsUnits,
    unitOwnership,
  });
  const reviewedProviders = buildReviewedGoValueOperationCatalog(config, snapshot);
  const generatorOwnedProviders = emptyGeneratorOwnedGoValueOperationCatalog(config, snapshot);
  const plan = buildGoValueOperationPlan({
    auditedStorage,
    config,
    generatorOwnedProviders,
    largeFileSplits,
    reviewedProviders,
    snapshot,
    tsUnits,
    unitOwnership,
  });
  return {
    config,
    externalFacadeCatalog: finalizeGeneratedFacadeFixtureCatalog(config, snapshot),
    largeFileSplits,
    plan,
    snapshot,
  };
}

function semanticField(object, objectId, index, name, type) {
  return {
    variable: {
      id: `${objectId}::rhs::field::${index}`,
      name,
      nameKind: name === "_" ? "blank" : "named",
      packagePath: object.packagePath,
      embedded: false,
      exported: false,
      type,
    },
    tag: "",
    tagValues: [],
    tagRemainder: "",
  };
}

function emptyInterfaceType() {
  return {
    kind: "interface",
    nilable: true,
    interface: {
      explicitMethods: [],
      embeddedTypes: [],
      embeddedKinds: [],
      completeMethods: [],
      comparable: false,
      implicit: true,
      methodSetOnly: false,
      explicitMethodOrderProvenance: "source",
    },
  };
}
