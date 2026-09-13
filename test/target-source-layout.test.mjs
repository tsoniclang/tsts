import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalTargetSourcePath,
  createTargetSourceLayout,
  withProviderDeclarationArtifacts,
} from "../scripts/target-source-layout.mjs";

test("target source layout roots every canonical module exactly once", () => {
  const layout = createTargetSourceLayout([
    "modules/application.ts",
    "packages/unreferenced/package.ts",
    "program.ts",
    "runtime/scalars.ts",
  ]);
  assert.deepEqual(layout.rootFiles, [
    "modules/application.ts",
    "node_modules/@gotots/runtime/scalars.ts",
    "packages/unreferenced/package.ts",
    "program.ts",
    "runner.ts",
  ]);
  assert.deepEqual(layout.rootFiles.map(path => canonicalTargetSourcePath(path, layout.canonicalSet)).sort(),
    [...layout.expectedArtifacts].sort());
  assert.deepEqual(layout.expectedArtifacts, [
    "modules/application.ts",
    "packages/unreferenced/package.ts",
    "program.ts",
    "runner.ts",
    "runtime/scalars.ts",
  ]);
  assert.equal(
    canonicalTargetSourcePath(
      "node_modules/@gotots/runtime/scalars.ts",
      layout.canonicalSet,
    ),
    "runtime/scalars.ts",
  );
});

test("provider declaration artifacts join the sealed package without admitting implementation edits", () => {
  const packages = {
    gostdlib: { files: ["dist/src/reflect.d.ts", "dist/src/reflect.js", "package.json"] },
    externals: { files: ["package.json"] },
  };
  const layout = createTargetSourceLayout(["program.ts"]);
  const declaration = { kind: "source", path: "node_modules/@gotots/gostdlib/dist/src/reflect.d.ts", text: "lowered declaration" };
  assert.deepEqual(withProviderDeclarationArtifacts(layout, [declaration], packages).expectedArtifacts, [
    declaration.path, "program.ts", "runner.ts",
  ]);
  assert.throws(() => withProviderDeclarationArtifacts(layout, [declaration, declaration], packages), /duplicated/u);
  for (const path of ["dist/src/missing.d.ts", "dist/src/reflect.js", "package.json", "dist/src/../reflect.d.ts"]) {
    assert.throws(() => withProviderDeclarationArtifacts(layout, [{ ...declaration, path: `node_modules/@gotots/gostdlib/${path}` }], packages), /no exact selected declaration/u);
  }
});

test("target source layout fails closed on an unowned runtime package artifact", () => {
  const layout = createTargetSourceLayout(["program.ts", "runtime/scalars.ts"]);
  assert.throws(
    () => canonicalTargetSourcePath(
      "node_modules/@gotots/runtime/unknown.ts",
      layout.canonicalSet,
    ),
    /has no canonical artifact 'runtime\/unknown\.ts'/u,
  );
  assert.throws(
    () => createTargetSourceLayout(["program.ts", "program.ts"]),
    /source paths are duplicated/u,
  );
  assert.throws(
    () => createTargetSourceLayout(["program.ts", "runner.ts"]),
    /collides with product runner/u,
  );
  assert.throws(
    () => createTargetSourceLayout(["runtime/scalars.ts", "node_modules/@gotots/runtime/scalars.ts"]),
    /installed runtime alias/u,
  );
});
