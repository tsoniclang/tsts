import assert from "node:assert/strict";
import { test } from "node:test";

import { Checker_fillMissingTypeArguments, Checker_getMinTypeArgumentCount } from "./checker/signatures.js";
import { cloneInferenceInfo, hasInferenceCandidates, newInferenceInfo } from "./inference.js";
import { instantiateList } from "./checker/state.js";
import { Checker_instantiateTypes } from "./checker/types.js";
import { newTypeMapper, TypeMapper_Map, TypeMapper_MapsThisOnly } from "./mapper.js";
import { Checker_hasCovariantVoidArgument, IntersectionStateNone, Relater_typeArgumentsRelatedTo } from "./relater.js";
import { Checker_getSymbolTableAliases, stKindLocals, stKindMembers } from "./symbolaccessibility.js";
import { TernaryTrue, TypeAlias_TypeArguments } from "./types.js";

test("nil type slices remain nil across checker instantiation helpers", () => {
  let calls = 0;
  const result = instantiateList(undefined, undefined, undefined, (_checker, value) => {
    calls++;
    return value;
  });

  assert.equal(result, undefined);
  assert.equal(calls, 0);
  assert.equal(Checker_instantiateTypes(undefined, undefined, undefined), undefined);
});

test("allocated slices retain identity until an element changes", () => {
  const values = [1, 2];
  const unchanged = instantiateList(undefined, values, undefined, (_checker, value) => value);
  const changed = instantiateList(undefined, values, undefined, (_checker, value) => value === 2 ? 3 : value);

  assert.equal(unchanged, values);
  assert.deepEqual(changed, [1, 3]);
  assert.notEqual(changed, values);
  assert.deepEqual(values, [1, 2]);
});

test("nil type-parameter inputs preserve Go len and range behavior", () => {
  assert.equal(Checker_fillMissingTypeArguments(undefined, undefined, undefined, 0, false), undefined);
  assert.equal(Checker_getMinTypeArgumentCount(undefined, undefined), 0);
  assert.equal(Checker_hasCovariantVoidArgument(undefined, undefined, undefined), false);
  assert.equal(Relater_typeArgumentsRelatedTo(undefined, undefined, undefined, undefined, false, IntersectionStateNone), TernaryTrue);
  assert.equal(TypeAlias_TypeArguments(undefined), undefined);
});

test("nil array type mappers preserve empty-range behavior", () => {
  const mapper = newTypeMapper(undefined, undefined);

  assert.ok(mapper !== undefined);
  assert.equal(TypeMapper_Map(mapper, undefined), undefined);
  assert.equal(TypeMapper_MapsThisOnly(mapper), false);
  assert.throws(
    () => newTypeMapper([undefined], undefined),
    /single-source type mapper requires a target/,
  );
});

test("empty symbol tables preserve nil alias inventories", () => {
  assert.equal(Checker_getSymbolTableAliases(undefined, undefined, stKindMembers), undefined);
  assert.equal(Checker_getSymbolTableAliases(undefined, undefined, stKindLocals), undefined);
  assert.equal(Checker_getSymbolTableAliases(undefined, new Map(), stKindLocals), undefined);
});

test("inference candidates preserve nil through construction, reset state, and cloning", () => {
  const info = newInferenceInfo(undefined);

  assert.equal(info!.candidates, undefined);
  assert.equal(info!.candidateDepths, undefined);
  assert.equal(info!.contraCandidates, undefined);
  assert.equal(hasInferenceCandidates(info), false);

  const cloned = cloneInferenceInfo(info);
  assert.equal(cloned!.candidates, undefined);
  assert.equal(cloned!.candidateDepths, undefined);
  assert.equal(cloned!.contraCandidates, undefined);
  assert.equal(hasInferenceCandidates(cloned), false);
});
