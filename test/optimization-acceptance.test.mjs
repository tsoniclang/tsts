import assert from "node:assert/strict";
import test from "node:test";

import { verifyOptimizationAcceptance } from "../scripts/optimization-acceptance.mjs";

const accepted = Object.freeze({
  pointerKeyMapCount: 69,
  staticPropertyLocationCount: 3429,
  staticPropertyLocationClassCount: 97,
});

const exactEvidence = Object.freeze({
  pointer: Object.freeze({
    optimizedPointerKeyMapCount: 69,
    optimizedStaticPropertyLocationCount: 3429,
    staticPropertyLocationClassCount: 97,
  }),
});

test("optimization acceptance exact-joins every selected denominator", () => {
  assert.doesNotThrow(() => verifyOptimizationAcceptance(exactEvidence, accepted));
});

test("optimization acceptance rejects missing and changed denominators", () => {
  const mutations = [
    ["optimizedPointerKeyMapCount", 68, /pointer-key map denominator 68 differs from accepted 69/u],
    ["optimizedStaticPropertyLocationCount", 3428, /static property-location denominator 3428 differs from accepted 3429/u],
    ["staticPropertyLocationClassCount", 96, /static property-location class denominator 96 differs from accepted 97/u],
  ];
  for (const [field, value, message] of mutations) {
    assert.throws(
      () => verifyOptimizationAcceptance({
        pointer: { ...exactEvidence.pointer, [field]: value },
      }, accepted),
      message,
    );
    const missing = { ...exactEvidence.pointer };
    delete missing[field];
    assert.throws(
      () => verifyOptimizationAcceptance({ pointer: missing }, accepted),
      /denominator undefined differs from accepted/u,
    );
  }
  assert.throws(
    () => verifyOptimizationAcceptance({}, accepted),
    /pointer evidence must be an object/u,
  );
});
