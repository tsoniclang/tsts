import assert from "node:assert/strict";
import test from "node:test";

import { verifyOptimizationAcceptance } from "../scripts/optimization-acceptance.mjs";

const accepted = Object.freeze({
  pointerKeyMapCount: 69,
  dominatingNilCheckEliminationCount: 2843,
});

test("optimization acceptance exact-joins the pointer-key map denominator", () => {
  assert.doesNotThrow(() =>
    verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 69,
        dominatingNilChecks: { eliminatedGuardCount: 2843 },
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
        pointer: {
          optimizedPointerKeyMapCount: 68,
          dominatingNilChecks: { eliminatedGuardCount: 2843 },
        },
      }, accepted),
    /denominator 68 differs from accepted 69/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({}, accepted),
    /pointer evidence must be an object/u,
  );
});

test("optimization acceptance exact-joins dominating nil-check elimination", () => {
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 69,
        dominatingNilChecks: {},
      },
    }, accepted),
    /elimination denominator undefined differs from accepted 2843/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 69,
        dominatingNilChecks: { eliminatedGuardCount: 2842 },
      },
    }, accepted),
    /elimination denominator 2842 differs from accepted 2843/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: { optimizedPointerKeyMapCount: 69 },
    }, accepted),
    /dominating nil-check evidence must be an object/u,
  );
});
