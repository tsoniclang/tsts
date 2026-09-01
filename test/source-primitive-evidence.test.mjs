import assert from "node:assert/strict";
import { test } from "node:test";

import {
  verifySourcePrimitiveEvidence,
} from "../scripts/source-primitive-evidence.mjs";

const valid = Object.freeze({
  typeReferenceCount: 41,
  removableImportBindingCount: 11,
});

test("source-primitive evidence accepts one exact closed denominator", () => {
  assert.doesNotThrow(() => verifySourcePrimitiveEvidence(valid));
});

test("source-primitive evidence rejects malformed or widened records", () => {
  for (const value of [
    undefined,
    [],
    { ...valid, extra: 0 },
    { ...valid, typeReferenceCount: -1 },
    { ...valid, removableImportBindingCount: 1.5 },
    { typeReferenceCount: valid.typeReferenceCount },
  ]) {
    assert.throws(() => verifySourcePrimitiveEvidence(value));
  }
});
