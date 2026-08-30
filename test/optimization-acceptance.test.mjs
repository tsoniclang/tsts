import assert from "node:assert/strict";
import test from "node:test";

import { verifyOptimizationAcceptance } from "../scripts/optimization-acceptance.mjs";

const accepted = Object.freeze({
  pointerKeyMapCount: 69,
  locationPointerKeyMapCount: 60,
  directObjectPointerKeyMapCount: 9,
});

test("optimization acceptance exact-joins the pointer-key map denominator", () => {
  assert.doesNotThrow(() =>
    verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 69,
        optimizedLocationPointerKeyMapCount: 60,
        optimizedDirectObjectPointerKeyMapCount: 9,
      },
    }, accepted)
  );
});

test("optimization acceptance rejects missing and changed map denominators", () => {
  assert.throws(
    () => verifyOptimizationAcceptance({ pointer: {} }, accepted),
    /total pointer-key map denominator undefined differs from accepted 69/u,
  );
  assert.throws(
    () =>
      verifyOptimizationAcceptance({
        pointer: {
          optimizedPointerKeyMapCount: 68,
          optimizedLocationPointerKeyMapCount: 60,
          optimizedDirectObjectPointerKeyMapCount: 9,
        },
      }, accepted),
    /total pointer-key map denominator 68 differs from accepted 69/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({}, accepted),
    /pointer evidence must be an object/u,
  );
});

test("optimization acceptance rejects changed and inconsistent partitions", () => {
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 69,
        optimizedLocationPointerKeyMapCount: 59,
        optimizedDirectObjectPointerKeyMapCount: 9,
      },
    }, accepted),
    /location pointer-key map denominator 59 differs from accepted 60/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 69,
        optimizedLocationPointerKeyMapCount: 60,
        optimizedDirectObjectPointerKeyMapCount: 9,
      },
    }, {
      ...accepted,
      pointerKeyMapCount: 70,
    }),
    /total pointer-key map denominator 69 differs from accepted 70/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 70,
        optimizedLocationPointerKeyMapCount: 60,
        optimizedDirectObjectPointerKeyMapCount: 9,
      },
    }, {
      ...accepted,
      pointerKeyMapCount: 70,
    }),
    /partitions do not equal/u,
  );
});
