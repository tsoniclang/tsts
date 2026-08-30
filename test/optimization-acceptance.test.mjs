import assert from "node:assert/strict";
import test from "node:test";

import { verifyOptimizationAcceptance } from "../scripts/optimization-acceptance.mjs";

const accepted = Object.freeze({
  pointerKeyMapCount: 69,
  directLogicalFieldCount: 15312,
});

test("optimization acceptance exact-joins the pointer-key map denominator", () => {
  assert.doesNotThrow(() =>
    verifyOptimizationAcceptance({
      pointer: { optimizedPointerKeyMapCount: 69 },
      representationProjections: {
        directLogicalFields: { optimizedCount: 15312 },
      },
    }, accepted)
  );
});

test("optimization acceptance rejects missing and changed map denominators", () => {
  assert.throws(
    () => verifyOptimizationAcceptance({ pointer: {} }, accepted),
    /denominator undefined differs from accepted 69/u,
  );
  assert.throws(
    () =>
      verifyOptimizationAcceptance({
        pointer: { optimizedPointerKeyMapCount: 68 },
        representationProjections: {
          directLogicalFields: { optimizedCount: 15312 },
        },
      }, accepted),
    /denominator 68 differs from accepted 69/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({}, accepted),
    /pointer evidence must be an object/u,
  );
});

test("optimization acceptance rejects missing and changed direct-field denominators", () => {
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: { optimizedPointerKeyMapCount: 69 },
      representationProjections: {},
    }, accepted),
    /direct logical-field evidence must be an object/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: { optimizedPointerKeyMapCount: 69 },
      representationProjections: {
        directLogicalFields: { optimizedCount: 15311 },
      },
    }, accepted),
    /denominator 15311 differs from accepted 15312/u,
  );
});
