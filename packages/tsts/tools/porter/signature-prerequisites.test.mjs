import assert from "node:assert/strict";
import test from "node:test";

import { computeSignatureReport, generatedArtifactPrerequisiteMismatches } from "./sig-check.mjs";

test("generated declaration artifacts block signature comparison once per root artifact", () => {
  const mismatches = generatedArtifactPrerequisiteMismatches({
    missing: [{ path: "packages/tsts/src/go/compat.ts", reason: "compatibility declarations are absent" }],
    stale: [{ path: "packages/tsts/src/go/iter.ts", reason: "iterator declarations changed" }],
    orphan: [],
    untracked: [],
    invalid: [],
    unresolved: [],
  });
  assert.deepEqual(mismatches.map((row) => row.id), [
    "generated-artifact:missing:packages/tsts/src/go/compat.ts",
    "generated-artifact:stale:packages/tsts/src/go/iter.ts",
  ]);
  assert.ok(mismatches.every((row) => row.kind === "signature-generated-artifact-prerequisite"));
  assert.throws(() => generatedArtifactPrerequisiteMismatches({
    missing: null, stale: [], orphan: [], untracked: [], invalid: [], unresolved: [],
  }), /status\.missing must be an array/);
});

test("filtered and whole-program signature checks require the same finalized facade catalog", async () => {
  await assert.rejects(
    computeSignatureReport({}, { idFilter: "fixture::*" }),
    /finalized external facade storage catalog/,
  );
  await assert.rejects(
    computeSignatureReport({ externalFacadeCatalog: new Map() }),
    /finalized external facade storage catalog/,
  );
});
