import assert from "node:assert/strict";
import test from "node:test";

import { verifyOptimizationAcceptance } from "../scripts/optimization-acceptance.mjs";

const accepted = Object.freeze({
  pointerKeyMapCount: 69,
  dominatingNilCheckEliminationCount: 2843,
  sourcePrimitiveTypeReferenceCount: 11,
  sourcePrimitiveImportBindingCount: 11,
});

const sourcePrimitives = Object.freeze({
  typeReferenceCount: 11,
  removableImportBindingCount: 11,
});

test("optimization acceptance exact-joins the pointer-key map denominator", () => {
  assert.doesNotThrow(() =>
    verifyOptimizationAcceptance({
      pointer: {
        optimizedPointerKeyMapCount: 69,
        dominatingNilChecks: { eliminatedGuardCount: 2843 },
      },
      sourcePrimitives,
    }, accepted)
  );
});

test("optimization acceptance exact-joins source-primitive denominators", () => {
  const evidence = {
    pointer: {
      optimizedPointerKeyMapCount: 69,
      dominatingNilChecks: { eliminatedGuardCount: 2843 },
    },
    sourcePrimitives,
  };
  assert.doesNotThrow(() => verifyOptimizationAcceptance(evidence, accepted));
  assert.throws(
    () => verifyOptimizationAcceptance({
      ...evidence,
      sourcePrimitives: {
        ...sourcePrimitives,
        typeReferenceCount: 10,
      },
    }, accepted),
    /source-primitive type-reference denominator 10 differs from accepted 11/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({
      ...evidence,
      sourcePrimitives: {
        ...sourcePrimitives,
        removableImportBindingCount: 10,
      },
    }, accepted),
    /source-primitive import-binding denominator 10 differs from accepted 11/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance(evidence, {
      ...accepted,
      sourcePrimitiveTypeReferenceCount: 0,
    }),
    /source-primitive type-reference denominator 11 differs from accepted 0/u,
  );
  assert.throws(
    () => verifyOptimizationAcceptance({
      ...evidence,
      sourcePrimitives: undefined,
    }, accepted),
    /source-primitive evidence must be an object/u,
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
