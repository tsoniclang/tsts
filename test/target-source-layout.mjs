import assert from "node:assert/strict";
import test from "node:test";

import {
  canonicalTargetSourcePath,
  createTargetSourceLayout,
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
    "packages/unreferenced/package.ts",
    "program.ts",
    "runner.ts",
  ]);
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
});
