import assert from "node:assert/strict";
import test from "node:test";

import { compareSignatureUnit } from "./sig-check.mjs";

test("one invalid unit becomes an unwaivable contract error instead of aborting the report", () => {
  const result = compareSignatureUnit({
    id: "m::pkg/file.go::func::broken",
    file: "pkg/file.ts",
    go: { kind: "func", semantic: [] },
    actual: undefined,
    localOverride: undefined,
    expectedIndex: {},
    canonicalIdentity: (identity) => identity,
    conventions: { goConstraintId: "m.ts::GoConstraint" },
    ambientReferences: { accept: () => false },
    overrideIssues: [],
  });
  assert.equal(result.overridden, false);
  assert.deepEqual(result.mismatches.map(({ kind, id, file }) => ({ kind, id, file })), [{
    kind: "signature-contract-error",
    id: "m::pkg/file.go::func::broken",
    file: "pkg/file.ts",
  }]);
  assert.match(result.mismatches[0].detail, /failed closed.*no semantic profile variants/);
});
