import assert from "node:assert/strict";
import test from "node:test";

import { inspectGeneratedArtifactRegistration, stripGeneratedArtifactEnvelope } from "../../generated-artifact-registry.mjs";
import { collectGoValueOperationArtifactFailures } from "./generated-artifacts.mjs";
import { registerGoValueOperationArtifacts } from "./registered-artifacts.mjs";

test("value-operation bodies receive one exact registered generated-artifact envelope", () => {
  const moduleId = "packages/tsts/src/internal/go-value-operations/generated/internal/sample.ts";
  const registered = registerGoValueOperationArtifacts({
    artifacts: new Map([[moduleId, "export const Sample = 1;\n\n"]]),
    config: { tsRoot: "packages/tsts/src" },
    snapshot: { gitRevision: "pinned-revision" },
  });
  const relativePath = "internal/go-value-operations/generated/internal/sample.ts";
  assert.deepEqual([...registered.keys()], [relativePath]);
  const source = registered.get(relativePath);
  const inspection = inspectGeneratedArtifactRegistration(relativePath, source);
  assert.equal(inspection.error, undefined);
  assert.equal(inspection.provider.id, "porter:value-operations");
  assert.equal(inspection.metadata.kind, "go-value-operations");
  assert.equal(stripGeneratedArtifactEnvelope(source), "export const Sample = 1;\n");
});

test("value-operation registration rejects modules outside its exclusive root", () => {
  assert.throws(() => registerGoValueOperationArtifacts({
    artifacts: new Map([["packages/tsts/src/internal/sample.ts", "export {};\n"]]),
    config: { tsRoot: "packages/tsts/src" },
    snapshot: { gitRevision: "pinned-revision" },
  }), /outside its registered generated-artifact root/);
});

test("value-operation artifact failures preserve every independent disposition", () => {
  assert.deepEqual(collectGoValueOperationArtifactFailures({
    state: "complete",
    invalid: [{}],
    missing: [{}, {}],
    orphan: [{}, {}, {}],
    stale: [{}, {}, {}, {}],
    untracked: [{}, {}, {}, {}, {}],
  }), [
    "2 missing Go value-operation artifacts",
    "4 stale Go value-operation artifacts",
    "3 orphan Go value-operation artifacts",
    "5 untracked Go value-operation artifacts",
    "1 invalid Go value-operation artifacts",
  ]);
});

test("value-operation artifact failures reject an unexecuted audit as non-green", () => {
  assert.deepEqual(collectGoValueOperationArtifactFailures({
    state: "not-run",
    reason: "The declaration audit has not run.",
    invalid: [],
    missing: [],
    orphan: [],
    stale: [],
    untracked: [],
  }), ["Go value-operation generated-artifact audit must be complete (The declaration audit has not run.)"]);
});
