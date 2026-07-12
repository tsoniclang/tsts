import assert from "node:assert/strict";
import test from "node:test";

import {
  emptyNonGoDeclarationManifest,
  loadNonGoDeclarationManifest,
  normalizeNonGoDeclarationManifest,
  validateNonGoDeclarationManifestPath,
} from "./core/non-go-declaration-manifest.mjs";

const HASH = "a".repeat(64);
const OWNER = {
  id: "runtime-infrastructure",
  reason: "This declaration is authored runtime infrastructure with no corresponding Go declaration.",
};

test("non-Go declaration manifests retain exact owner provenance and deterministic identities", () => {
  const normalized = normalizeNonGoDeclarationManifest({
    schemaVersion: 1,
    owners: [OWNER],
    declarations: [{
      declarationHash: HASH,
      file: "packages/tsts/src/runtime.ts",
      fragmentIndex: 0,
      kind: "function",
      name: "runtimeHelper",
      namespaces: ["value"],
      owner: OWNER.id,
      visibility: "direct-export",
    }],
    routes: [{
      file: "packages/tsts/src/index.ts",
      name: "runtimeHelper",
      namespace: "value",
      owner: OWNER.id,
      routeHash: HASH,
      target: "packages/tsts/src/runtime.ts::runtimeHelper",
    }],
  });
  assert.equal(normalized.declarations[0].ownerReason, OWNER.reason);
  assert.equal(normalized.routes[0].ownerReason, OWNER.reason);
});

test("non-Go declaration manifests reject malformed, duplicate, and unowned contracts", () => {
  const declaration = {
    declarationHash: HASH,
    file: "packages/tsts/src/runtime.ts",
    fragmentIndex: 0,
    kind: "function",
    name: "runtimeHelper",
    namespaces: ["value"],
    owner: OWNER.id,
    visibility: "direct-export",
  };
  const exact = { schemaVersion: 1, owners: [OWNER], declarations: [declaration], routes: [] };
  assert.throws(() => normalizeNonGoDeclarationManifest({ ...exact, future: true }), /unknown key/);
  assert.throws(() => normalizeNonGoDeclarationManifest({ ...exact, schemaVersion: 2 }), /schemaVersion must be 1/);
  assert.throws(() => normalizeNonGoDeclarationManifest({ ...exact, declarations: [{ ...declaration, owner: "missing" }] }), /declared owner/);
  assert.throws(() => normalizeNonGoDeclarationManifest({ ...exact, declarations: [declaration, declaration] }), /duplicate declaration/);
  assert.throws(() => normalizeNonGoDeclarationManifest({ ...exact, declarations: [{ ...declaration, file: "../runtime.ts" }] }), /repository-relative path/);
  assert.throws(() => normalizeNonGoDeclarationManifest({ ...exact, declarations: [{ ...declaration, kind: "statement" }] }), /unsupported declaration kind/);
  assert.throws(() => normalizeNonGoDeclarationManifest({ ...exact, declarations: [] }), /owner 'runtime-infrastructure' is unused/);
});

test("non-Go declaration manifest loading uses one explicit canonical repository path", () => {
  validateNonGoDeclarationManifestPath("packages/tsts/porter.non-go-declarations.json");
  assert.throws(() => validateNonGoDeclarationManifestPath("../manifest.json"), /canonical repository-relative/);
  assert.throws(() => validateNonGoDeclarationManifestPath("manifest.txt"), /canonical repository-relative/);
  const loaded = loadNonGoDeclarationManifest(
    { nonGoDeclarationManifestPath: "packages/tsts/porter.non-go-declarations.json" },
    "/repo",
    (file) => {
      assert.equal(file, "packages/tsts/porter.non-go-declarations.json");
      return JSON.stringify(emptyNonGoDeclarationManifest());
    },
  );
  assert.deepEqual(loaded, emptyNonGoDeclarationManifest());
  assert.throws(() => loadNonGoDeclarationManifest(
    { nonGoDeclarationManifestPath: "packages/tsts/porter.non-go-declarations.json" },
    "relative",
    () => "{}",
  ), /absolute repository root/);
});
