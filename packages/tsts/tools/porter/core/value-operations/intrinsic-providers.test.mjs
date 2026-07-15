import assert from "node:assert/strict";
import test from "node:test";

import {
  basic,
  externalSnapshot,
  externalType,
  finalizeGeneratedFacadeFixtureCatalog,
  interfaceType,
  signature,
  sliceType,
  structType,
} from "../../test/external-facade-fixtures.mjs";
import { baseConfig } from "../../test/helpers.mjs";
import { semanticDeclarationVariantsHash } from "../semantic-declaration-hash.mjs";
import { buildSemanticTypeCatalog } from "../type-storage-policies.mjs";
import {
  buildIntrinsicGoValueOperationCatalog,
  requireIntrinsicGoValueOperationCatalog,
} from "./intrinsic-providers.mjs";

test("external named nilable carriers receive exact intrinsic value operations", () => {
  const writer = externalType({ packagePath: "example.com/io", name: "Writer", rhs: interfaceType() });
  const bytes = externalType({ packagePath: "example.com/io", name: "Bytes", rhs: sliceType(basic("byte")) });
  const table = externalType({ packagePath: "example.com/io", name: "Table", rhs: mapType() });
  const callback = externalType({ packagePath: "example.com/io", name: "Callback", rhs: signatureType() });
  const token = externalType({ packagePath: "example.com/io", name: "Token", rhs: structType([]) });
  const snapshot = externalSnapshot([writer, bytes, table, callback, token]);
  const config = { ...baseConfig, goModulePath: "example.com/compiler" };
  const externalFacadeCatalog = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
  const catalog = buildIntrinsicGoValueOperationCatalog(config, snapshot, externalFacadeCatalog);

  assert.equal(catalog.size, 6);
  assert.deepEqual(catalog.get(writer.object.id), {
    disposition: "intrinsic",
    intrinsicCarrier: "interface",
    objectId: writer.object.id,
    operationTypeParameterIndexes: [],
    storageIdentity: "packages/tsts/src/go/example.com/io.ts::Writer",
    typeParameterCount: 0,
  });
  assert.equal(catalog.get(bytes.object.id).intrinsicCarrier, "slice");
  assert.equal(catalog.get(table.object.id).intrinsicCarrier, "map");
  assert.equal(catalog.get(callback.object.id).intrinsicCarrier, "function");
  assert.equal(catalog.get(token.object.id), undefined);
  assert.deepEqual(catalog.requirements(config, snapshot).get(writer.object.id), {
    disposition: "intrinsic",
    operationTypeParameterIndexes: [],
    typeParameterCount: 0,
  });
  assert.equal(requireIntrinsicGoValueOperationCatalog(catalog, config, snapshot), catalog);
});

function mapType() {
  return { kind: "map", nilable: true, key: basic("string"), element: basic("int") };
}

function signatureType() {
  return { kind: "signature", nilable: true, signature: signature([]) };
}

test("intrinsic interface evidence is bound to its finalized config and snapshot", () => {
  const writer = externalType({ packagePath: "example.com/io", name: "Writer", rhs: interfaceType() });
  const snapshot = externalSnapshot([writer]);
  const config = { ...baseConfig, goModulePath: "example.com/compiler" };
  const externalFacadeCatalog = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
  const catalog = buildIntrinsicGoValueOperationCatalog(config, snapshot, externalFacadeCatalog);

  assert.throws(() => catalog.requirements({ ...config }, snapshot), /different config or snapshot objects/);
  assert.throws(() => catalog.requirements(config, structuredClone(snapshot)), /different config or snapshot objects/);
});

test("excluded module-local named carriers receive intrinsic operations from exact storage relations", () => {
  const watcher = externalType({
    packagePath: "example.com/compiler/internal/fswatch",
    name: "Watcher",
    rhs: interfaceType(),
  });
  const snapshot = externalSnapshot([watcher]);
  const semantic = buildSemanticTypeCatalog(snapshot).get(watcher.object.id);
  assert.ok(semantic);
  const config = {
    ...baseConfig,
    goModulePath: "example.com/compiler",
    semanticRelations: [{
      kind: "go-type-storage",
      objectId: watcher.object.id,
      storageIdentity: "packages/tsts/src/internal/fswatch/fswatch.ts::Watcher",
      goDeclarationHash: semanticDeclarationVariantsHash(semantic, "test module-local watcher"),
      tsDeclarationHash: "b".repeat(64),
      reason: "The host-native watcher stores the excluded Go interface in one exact authored declaration.",
    }],
  };
  const externalFacadeCatalog = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
  const catalog = buildIntrinsicGoValueOperationCatalog(config, snapshot, externalFacadeCatalog);

  assert.deepEqual(catalog.get(watcher.object.id), {
    disposition: "intrinsic",
    intrinsicCarrier: "interface",
    objectId: watcher.object.id,
    operationTypeParameterIndexes: [],
    storageIdentity: "packages/tsts/src/internal/fswatch/fswatch.ts::Watcher",
    typeParameterCount: 0,
  });
});
