import assert from "node:assert/strict";
import test from "node:test";

import {
  externalSnapshot,
  externalType,
  finalizeGeneratedFacadeFixtureCatalog,
  interfaceType,
  structType,
} from "../../test/external-facade-fixtures.mjs";
import { baseConfig } from "../../test/helpers.mjs";
import {
  buildIntrinsicInterfaceGoValueOperationCatalog,
  requireIntrinsicInterfaceGoValueOperationCatalog,
} from "./intrinsic-interface-providers.mjs";

test("external named interfaces receive exact intrinsic interface value operations", () => {
  const writer = externalType({ packagePath: "example.com/io", name: "Writer", rhs: interfaceType() });
  const token = externalType({ packagePath: "example.com/io", name: "Token", rhs: structType([]) });
  const snapshot = externalSnapshot([writer, token]);
  const config = { ...baseConfig, goModulePath: "example.com/compiler" };
  const externalFacadeCatalog = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
  const catalog = buildIntrinsicInterfaceGoValueOperationCatalog(config, snapshot, externalFacadeCatalog);

  assert.equal(catalog.size, 3);
  assert.deepEqual(catalog.get(writer.object.id), {
    disposition: "intrinsic",
    objectId: writer.object.id,
    operationTypeParameterIndexes: [],
    storageIdentity: "packages/tsts/src/go/example.com/io.ts::Writer",
    typeParameterCount: 0,
  });
  assert.equal(catalog.get(token.object.id), undefined);
  assert.deepEqual(catalog.requirements(config, snapshot).get(writer.object.id), {
    disposition: "intrinsic",
    operationTypeParameterIndexes: [],
    typeParameterCount: 0,
  });
  assert.equal(requireIntrinsicInterfaceGoValueOperationCatalog(catalog, config, snapshot), catalog);
});

test("intrinsic interface evidence is bound to its finalized config and snapshot", () => {
  const writer = externalType({ packagePath: "example.com/io", name: "Writer", rhs: interfaceType() });
  const snapshot = externalSnapshot([writer]);
  const config = { ...baseConfig, goModulePath: "example.com/compiler" };
  const externalFacadeCatalog = finalizeGeneratedFacadeFixtureCatalog(config, snapshot);
  const catalog = buildIntrinsicInterfaceGoValueOperationCatalog(config, snapshot, externalFacadeCatalog);

  assert.throws(() => catalog.requirements({ ...config }, snapshot), /different config or snapshot objects/);
  assert.throws(() => catalog.requirements(config, structuredClone(snapshot)), /different config or snapshot objects/);
});
