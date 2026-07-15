import assert from "node:assert/strict";
import test from "node:test";

import { FinalizedGoValueOperationPlan } from "../core/value-operations/operation-plan.mjs";
import {
  buildPortableGoValueOperationCatalog,
  renderPortableGoValueOperationCatalog,
  requirePortableGoValueOperationCatalog,
} from "../core/value-operations/portable-operation-catalog.mjs";

const sha256A = "a".repeat(64);
const sha256B = "b".repeat(64);
const sha256C = "c".repeat(64);

test("the portable operation catalog exposes every finalized provider and canonical runtime rule", () => {
  const fixture = catalogFixture();
  const catalog = buildPortableGoValueOperationCatalog(fixture);

  assert.equal(catalog.schemaVersion, 1);
  assert.equal(catalog.state, "complete");
  assert.equal(catalog.entryCount, 5);
  assert.equal(catalog.generatedCount, 1);
  assert.equal(catalog.providerCount, 4);
  assert.deepEqual(catalog.entries.map((entry) => entry.objectId), [
    "builtin::type::any",
    "example.test/compiler::type::Pair",
    "example.test/runtime::type::GeneratedNode",
    "example.test/runtime::type::Paths",
    "time::type::Duration",
  ]);

  const generated = catalog.entries[1];
  assert.equal(generated.operationIdentity, "packages/tsts/src/internal/go-value-operations/generated/example.ts::PairValueOps");
  assert.equal(generated.storageIdentity, "packages/tsts/src/example.ts::Pair");
  assert.deepEqual(generated.operationTypeParameterIndexes, [0]);
  assert.deepEqual(generated.sourceOwnership, {
    tsPath: "packages/tsts/src/example.ts",
    unitId: "example.test/compiler/example.go::type::Pair",
  });
  assert.deepEqual(generated.storageAudit, {
    actualDescriptorHash: sha256A,
    exact: true,
    expectedDescriptorHash: sha256B,
    valueTypeDescriptorHash: sha256C,
  });
  assert.equal(generated.providerEvidence, null);

  const reviewed = catalog.entries[4];
  assert.deepEqual(reviewed.providerEvidence, {
    goDeclarationHash: sha256A,
    ownerId: null,
    tsDeclarationHash: sha256B,
  });
  assert.equal(reviewed.sourceOwnership, null);
  assert.equal(reviewed.storageAudit, null);

  assert.equal(catalog.runtimeOperations.moduleIdentity, "packages/tsts/src/go/compat.ts");
  assert.deepEqual(
    catalog.runtimeOperations.basics.find((entry) => entry.key === "int32"),
    {
      invocation: "constant",
      key: "int32",
      operationIdentity: "packages/tsts/src/go/compat.ts::GoNumberValueOps",
    },
  );
  assert.deepEqual(
    catalog.runtimeOperations.namedIntrinsics.find((entry) => entry.carrier === "slice"),
    {
      carrier: "slice",
      invocation: "target-zero-factory",
      operationIdentity: "packages/tsts/src/go/compat.ts::GoNamedValueOps",
      zeroIdentity: "packages/tsts/src/go/compat.ts::GoNilSlice",
    },
  );

  const rendered = renderPortableGoValueOperationCatalog(fixture);
  assert.ok(rendered.endsWith("\n"));
  assert.deepEqual(requirePortableGoValueOperationCatalog(JSON.parse(rendered)), catalog);
  assert.equal(renderPortableGoValueOperationCatalog(fixture), rendered);
});

test("the portable operation catalog fails closed on ambiguous storage identity", () => {
  const fixture = catalogFixture();
  const duplicate = reviewedProvider({
    objectId: "example.test/runtime::type::OtherDuration",
    operationIdentity: "packages/tsts/src/go/time.ts::OtherDurationValueOps",
    storageIdentity: "packages/tsts/src/go/time.ts::Duration",
  });
  const providers = [...fixture.plan.providers(fixture.config, fixture.snapshot), duplicate];
  const plan = new FinalizedGoValueOperationPlan(
    fixture.config,
    fixture.snapshot,
    [...fixture.plan.entries()].filter((entry) => entry.disposition === "generated"),
    fixture.plan.generated(fixture.config, fixture.snapshot),
    providers,
  );
  assert.throws(
    () => buildPortableGoValueOperationCatalog({ ...fixture, plan }),
    /storageIdentity is already owned/,
  );
});

test("the portable operation catalog rejects drifted runtime rules and plan provenance", () => {
  const fixture = catalogFixture();
  const catalog = structuredClone(buildPortableGoValueOperationCatalog(fixture));
  catalog.runtimeOperations.basics[0].operationIdentity = "packages/tsts/src/go/compat.ts::Wrong";
  assert.throws(
    () => requirePortableGoValueOperationCatalog(catalog),
    /differs from the canonical Porter runtime rules/,
  );
  assert.throws(
    () => buildPortableGoValueOperationCatalog({ ...fixture, config: { ...fixture.config } }),
    /different config or snapshot objects/,
  );
});

function catalogFixture() {
  const config = {
    goModulePath: "example.test/compiler",
    tsRoot: "packages/tsts/src",
  };
  const snapshot = { gitRevision: "1".repeat(40) };
  const generated = {
    objectId: "example.test/compiler::type::Pair",
    disposition: "generated",
    typeParameterCount: 1,
    operationTypeParameterIndexes: [0],
    storageIdentity: "packages/tsts/src/example.ts::Pair",
    operationIdentity: "packages/tsts/src/internal/go-value-operations/generated/example.ts::PairValueOps",
    unitId: "example.test/compiler/example.go::type::Pair",
    tsPath: "packages/tsts/src/example.ts",
    storageAudit: {
      actualDescriptorHash: sha256A,
      exact: true,
      expectedDescriptorHash: sha256B,
      valueTypeDescriptorHash: sha256C,
    },
    requirementShape: { kind: "scalar", name: "int" },
  };
  const providers = [
    {
      objectId: "builtin::type::any",
      disposition: "intrinsic",
      intrinsicCarrier: "interface",
      operationTypeParameterIndexes: [],
      typeParameterCount: 0,
    },
    generatorOwnedProvider(),
    {
      objectId: "example.test/runtime::type::Paths",
      disposition: "intrinsic",
      intrinsicCarrier: "slice",
      operationTypeParameterIndexes: [],
      storageIdentity: "packages/tsts/src/runtime.ts::Paths",
      typeParameterCount: 0,
    },
    reviewedProvider(),
  ];
  const plan = new FinalizedGoValueOperationPlan(config, snapshot, [generated], [generated], providers);
  return { config, plan, snapshot };
}

function reviewedProvider(overrides = {}) {
  return {
    objectId: "time::type::Duration",
    disposition: "reviewed",
    operationIdentity: "packages/tsts/src/go/time.ts::DurationValueOps",
    operationTypeParameterIndexes: [],
    storageIdentity: "packages/tsts/src/go/time.ts::Duration",
    typeParameterCount: 0,
    goDeclarationHash: sha256A,
    tsDeclarationHash: sha256B,
    ...overrides,
  };
}

function generatorOwnedProvider() {
  return {
    objectId: "example.test/runtime::type::GeneratedNode",
    disposition: "generator-owned",
    operationIdentity: "packages/tsts/src/internal/ast/generated/nodes.ts::GeneratedNodeValueOps",
    operationTypeParameterIndexes: [],
    storageIdentity: "packages/tsts/src/internal/ast/generated/nodes.ts::GeneratedNode",
    typeParameterCount: 0,
    goDeclarationHash: sha256B,
    ownerId: "porter:ast",
    tsDeclarationHash: sha256C,
  };
}
