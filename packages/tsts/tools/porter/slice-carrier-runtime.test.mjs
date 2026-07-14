import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

import { renderGoCompatModule } from "./core/runtime-templates/compatibility.mjs";

const goOracle = JSON.parse(readFileSync(new URL("../go-runtime-oracle/slices.expected.json", import.meta.url), "utf8"));

function runtimeSource() {
  return renderGoCompatModule().replace(
    /^import type \{ bool, int \} from "\.\/scalars\.js";\n\n/,
    "type bool = boolean;\ntype int = number;\n\n",
  );
}

async function loadRuntime() {
  const javascript = ts.transpileModule(runtimeSource(), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);
}

function assertRuntimeContractCompiles(contract) {
  const fileName = "/go-array-value-operations-contract.ts";
  const source = `${runtimeSource()}\n${contract}`;
  const options = {
    module: ts.ModuleKind.ESNext,
    noEmit: true,
    strict: true,
    target: ts.ScriptTarget.ES2022,
  };
  const host = ts.createCompilerHost(options);
  const defaultGetSourceFile = host.getSourceFile.bind(host);
  const defaultFileExists = host.fileExists.bind(host);
  const defaultReadFile = host.readFile.bind(host);
  host.getSourceFile = (path, languageVersion, onError, shouldCreateNewSourceFile) => path === fileName
    ? ts.createSourceFile(path, source, languageVersion, true)
    : defaultGetSourceFile(path, languageVersion, onError, shouldCreateNewSourceFile);
  host.fileExists = (path) => path === fileName || defaultFileExists(path);
  host.readFile = (path) => path === fileName ? source : defaultReadFile(path);
  const diagnostics = ts.getPreEmitDiagnostics(ts.createProgram([fileName], options, host));
  assert.deepEqual(diagnostics.map((diagnostic) => ({
    code: diagnostic.code,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
  })), []);
}

function values(runtime, slice, valueOps) {
  const result = [];
  for (let index = 0; index < slice.length; index++) {
    result.push(runtime.GoSliceLoad(slice, index, valueOps));
  }
  return result;
}

function numbers(runtime, entries, capacity = entries.length) {
  return runtime.GoSliceBuild(entries.length, capacity, runtime.GoNumberValueOps, (slice) => {
    for (let index = 0; index < entries.length; index++) {
      runtime.GoSliceStore(slice, index, entries[index], runtime.GoNumberValueOps);
    }
  });
}

test("opaque slice carrier matches pinned Go header, backing, append, copy, and address behavior", async () => {
  const runtime = await loadRuntime();
  const numberOps = runtime.GoNumberValueOps;

  const nilSlice = runtime.GoNilSlice();
  const emptySlice = runtime.GoSliceMake(0, 0, numberOps);
  assert.deepEqual({
    nilIsNil: runtime.GoSliceIsNil(nilSlice),
    emptyIsNil: runtime.GoSliceIsNil(emptySlice),
    nilLength: nilSlice.length,
    emptyLength: emptySlice.length,
    nilCapacity: runtime.GoSliceCapacity(nilSlice),
    emptyCapacity: runtime.GoSliceCapacity(emptySlice),
    nilResliceNil: runtime.GoSliceIsNil(runtime.GoSliceReslice(nilSlice, 0, 0)),
    emptyResliceNil: runtime.GoSliceIsNil(runtime.GoSliceReslice(emptySlice, 0, 0)),
  }, goOracle.nilAndEmpty);

  const base = numbers(runtime, [1, 2], 4);
  const view = runtime.GoSliceReslice(base, 0, 1);
  runtime.GoSliceStore(view, 0, 7, numberOps);
  const extended = runtime.GoSliceReslice(base, 0, 4);
  assert.deepEqual(values(runtime, base, numberOps), [7, 2]);
  assert.deepEqual(values(runtime, view, numberOps), [7]);
  assert.equal(runtime.GoSliceCapacity(view), 4);
  assert.deepEqual(values(runtime, extended, numberOps), [7, 2, 0, 0]);
  assert.equal(runtime.GoSliceElementRef(base, 0, numberOps), runtime.GoSliceElementRef(view, 0, numberOps));
  assert.deepEqual({
    base: values(runtime, base, numberOps),
    view: values(runtime, view, numberOps),
    viewLength: view.length,
    viewCapacity: runtime.GoSliceCapacity(view),
    backingShared: runtime.GoSliceElementRef(base, 0, numberOps) === runtime.GoSliceElementRef(view, 0, numberOps),
    extendedValues: values(runtime, extended, numberOps),
  }, goOracle.sharedSlice);

  const reuseBase = numbers(runtime, [4], 3);
  const reuseView = runtime.GoSliceAppend(reuseBase, 5, numberOps);
  runtime.GoSliceStore(reuseView, 0, 8, numberOps);
  assert.deepEqual(values(runtime, reuseBase, numberOps), [8]);
  assert.deepEqual(values(runtime, runtime.GoSliceReslice(reuseBase, 0, 3), numberOps), [8, 5, 0]);
  assert.deepEqual(values(runtime, reuseView, numberOps), [8, 5]);
  assert.equal(runtime.GoSliceElementRef(reuseBase, 0, numberOps), runtime.GoSliceElementRef(reuseView, 0, numberOps));

  const allocateBase = numbers(runtime, [4]);
  const allocateView = runtime.GoSliceAppend(allocateBase, 5, numberOps);
  assert.deepEqual(values(runtime, allocateBase, numberOps), [4]);
  assert.deepEqual(values(runtime, allocateView, numberOps), [4, 5]);
  assert.notEqual(runtime.GoSliceElementRef(allocateBase, 0, numberOps), runtime.GoSliceElementRef(allocateView, 0, numberOps));

  const zeroBase = numbers(runtime, [1, 2], 4);
  const zeroView = runtime.GoSliceReslice(zeroBase, 0, 0);
  const zeroAppended = runtime.GoSliceAppend(zeroView, 9, numberOps);
  assert.equal(runtime.GoSliceIsNil(zeroView), false);
  assert.deepEqual(values(runtime, zeroAppended, numberOps), [9]);
  assert.deepEqual(values(runtime, runtime.GoSliceReslice(zeroBase, 0, 4), numberOps), [9, 2, 0, 0]);

  const fullBase = numbers(runtime, [11, 12], 4);
  const fullView = runtime.GoSliceFullReslice(fullBase, 1, 2, 3);
  assert.equal(fullView.length, 1);
  assert.equal(runtime.GoSliceCapacity(fullView), 2);
  assert.equal(runtime.GoSliceLoad(fullView, 0, numberOps), 12);

  const overlap = numbers(runtime, [1, 2, 3, 4, 5]);
  const overlapCount = runtime.GoSliceCopy(
    runtime.GoSliceReslice(overlap, 1, overlap.length),
    runtime.GoSliceReslice(overlap, 0, 4),
    numberOps,
  );
  assert.equal(overlapCount, 4);
  assert.deepEqual(values(runtime, overlap, numberOps), [1, 1, 2, 3, 4]);

  const appendOverlap = numbers(runtime, [1, 2], 4);
  const appendedOverlap = runtime.GoSliceAppendSlice(appendOverlap, appendOverlap, numberOps);
  assert.deepEqual(values(runtime, appendedOverlap, numberOps), [1, 2, 1, 2]);
  assert.deepEqual(values(runtime, appendOverlap, numberOps), [1, 2]);

  const boundaryBase = numbers(runtime, [1], 2);
  const boundaryOldView = runtime.GoSliceReslice(boundaryBase, 0, 2);
  const boundaryItems = numbers(runtime, [2, 3]);
  const boundaryResult = runtime.GoSliceAppendSlice(boundaryBase, boundaryItems, numberOps);
  assert.deepEqual(values(runtime, boundaryOldView, numberOps), [1, 0]);
  assert.deepEqual(values(runtime, boundaryResult, numberOps), [1, 2, 3]);
  assert.deepEqual({
    reuseBase: values(runtime, reuseBase, numberOps),
    reuseBacking: values(runtime, runtime.GoSliceReslice(reuseBase, 0, runtime.GoSliceCapacity(reuseBase)), numberOps),
    reuseView: values(runtime, reuseView, numberOps),
    reuseShared: runtime.GoSliceElementRef(reuseBase, 0, numberOps) === runtime.GoSliceElementRef(reuseView, 0, numberOps),
    reuseBaseLength: reuseBase.length,
    reuseViewLength: reuseView.length,
    allocateBase: values(runtime, allocateBase, numberOps),
    allocateView: values(runtime, allocateView, numberOps),
    allocateShared: runtime.GoSliceElementRef(allocateBase, 0, numberOps) === runtime.GoSliceElementRef(allocateView, 0, numberOps),
    zeroAppendBacking: values(runtime, runtime.GoSliceReslice(zeroBase, 0, runtime.GoSliceCapacity(zeroBase)), numberOps),
    zeroViewWasNonNil: !runtime.GoSliceIsNil(zeroView),
    multiOldBacking: values(runtime, boundaryOldView, numberOps),
    multiResult: values(runtime, boundaryResult, numberOps),
  }, goOracle.append);
  assert.deepEqual({
    length: fullView.length,
    capacity: runtime.GoSliceCapacity(fullView),
    value: runtime.GoSliceLoad(fullView, 0, numberOps),
  }, goOracle.fullSlice);
  assert.equal(overlapCount, goOracle.copyAndDelete.overlapCopyCount);
  assert.deepEqual(values(runtime, overlap, numberOps), goOracle.copyAndDelete.overlapValues);
  assert.deepEqual({
    sameElementAddress: runtime.GoSliceElementRef(base, 0, numberOps) === runtime.GoSliceElementRef(base, 0, numberOps),
    subsliceAddress: runtime.GoSliceElementRef(base, 0, numberOps) === runtime.GoSliceElementRef(view, 0, numberOps),
  }, goOracle.addresses);
});

test("slice stores, loads, appends, clones, and clears apply explicit Go value operations", async () => {
  const runtime = await loadRuntime();
  const boxOps = Object.freeze({
    zero: () => ({ value: 0 }),
    copy: (box) => ({ value: box.value }),
  });
  const source = { value: 1 };
  const slice = runtime.GoSliceMake(1, 2, boxOps);
  runtime.GoSliceStore(slice, 0, source, boxOps);
  source.value = 2;
  assert.equal(runtime.GoSliceLoad(slice, 0, boxOps).value, 1);

  const loaded = runtime.GoSliceLoad(slice, 0, boxOps);
  loaded.value = 3;
  assert.equal(runtime.GoSliceLoad(slice, 0, boxOps).value, 1);

  const appended = runtime.GoSliceAppend(slice, loaded, boxOps);
  loaded.value = 4;
  assert.deepEqual(values(runtime, appended, boxOps), [{ value: 1 }, { value: 3 }]);

  const clone = runtime.GoSliceClone(appended, boxOps);
  runtime.GoSliceElementRef(clone, 0, boxOps).v.value = 9;
  assert.deepEqual(values(runtime, appended, boxOps), [{ value: 1 }, { value: 3 }]);
  assert.deepEqual(values(runtime, clone, boxOps), [{ value: 9 }, { value: 3 }]);

  const replacement = { value: 11 };
  runtime.GoSliceElementRef(clone, 1, boxOps).v = replacement;
  replacement.value = 12;
  assert.equal(runtime.GoSliceLoad(clone, 1, boxOps).value, 11);

  runtime.GoSliceClear(clone, boxOps);
  assert.deepEqual(values(runtime, clone, boxOps), [{ value: 0 }, { value: 0 }]);
});

test("fixed arrays are opaque values and slices share their exact backing locations", async () => {
  const runtime = await loadRuntime();
  const numberOps = runtime.GoNumberValueOps;
  const array = runtime.GoArrayBuild(3, numberOps, (value) => {
    runtime.GoArrayStore(value, 0, 1, numberOps);
    runtime.GoArrayStore(value, 1, 2, numberOps);
    runtime.GoArrayStore(value, 2, 3, numberOps);
  });
  const slice = runtime.GoArraySlice(array, 1, 3);
  runtime.GoSliceStore(slice, 0, 7, numberOps);
  assert.equal(runtime.GoArrayLoad(array, 1, numberOps), 7);
  assert.equal(runtime.GoArrayElementRef(array, 1, numberOps), runtime.GoSliceElementRef(slice, 0, numberOps));

  const arrayOps = runtime.GoArrayValueOps(3, numberOps);
  const copy = arrayOps.copy(array);
  runtime.GoArrayStore(copy, 1, 9, numberOps);
  assert.equal(runtime.GoArrayLoad(array, 1, numberOps), 7);
  assert.equal(runtime.GoArrayLoad(copy, 1, numberOps), 9);
  assert.notEqual(runtime.GoArrayElementRef(array, 1, numberOps), runtime.GoArrayElementRef(copy, 1, numberOps));
  assert.deepEqual({
    arrayAfterSliceWrite: [
      runtime.GoArrayLoad(array, 0, numberOps),
      runtime.GoArrayLoad(array, 1, numberOps),
      runtime.GoArrayLoad(array, 2, numberOps),
    ],
    copiedArray: [
      runtime.GoArrayLoad(copy, 0, numberOps),
      runtime.GoArrayLoad(copy, 1, numberOps),
      runtime.GoArrayLoad(copy, 2, numberOps),
    ],
    sliceSharesAddress: runtime.GoArrayElementRef(array, 1, numberOps) === runtime.GoSliceElementRef(slice, 0, numberOps),
  }, goOracle.array);
});

test("zero-length fixed-array operations have an exact element-operation-free contract", () => {
  assertRuntimeContractCompiles(`
type Box = { value: number };
declare const boxOps: GoValueOps<Box>;
const zeroOps: GoValueOps<GoArray<Box, "0">> = GoZeroLengthArrayValueOps<Box>();
const zero: GoArray<Box, "0"> = zeroOps.zero();
const copy: GoArray<Box, "0"> = zeroOps.copy(zero);
const nonzeroOps: GoValueOps<GoArray<Box, "1">> = GoArrayValueOps<Box, "1">(1, boxOps);
// @ts-expect-error zero-length array operations do not accept element operations
GoZeroLengthArrayValueOps<Box>(boxOps);
// @ts-expect-error the zero-length provider cannot operate on nonzero arrays
zeroOps.copy(nonzeroOps.zero());
// @ts-expect-error exact Go fixed-array lengths are not interchangeable
const wrongLength: GoArray<Box, "1"> = zero;
// @ts-expect-error nonzero array operations still require element operations
GoArrayValueOps<Box, "1">(1);
void copy;
void wrongLength;
`);
});

test("zero-length fixed-array operations allocate isolated non-resizable values", async () => {
  const runtime = await loadRuntime();
  const zeroOps = runtime.GoZeroLengthArrayValueOps();
  const zero = zeroOps.zero();
  const otherZero = zeroOps.zero();
  const copy = zeroOps.copy(zero);

  for (const value of [zero, otherZero, copy]) {
    assert.equal(value.length, 0);
    assert.equal(Array.isArray(value), false);
    assert.equal(Object.isFrozen(value), true);
    assert.equal(Object.isFrozen(value.backing), true);
    assert.equal(Object.isFrozen(value.backing.values), true);
    assert.equal(Reflect.set(value, "length", 1), false);
    assert.equal(value.length, 0);
  }
  assert.notEqual(zero, otherZero);
  assert.notEqual(zero, copy);
  assert.notEqual(zero.backing, otherZero.backing);
  assert.notEqual(zero.backing, copy.backing);
  assert.notEqual(zero.backing.values, copy.backing.values);
  assert.throws(() => zero.backing.values.push({ value: 1 }), TypeError);

  const slice = runtime.GoArraySlice(zero, 0, 0);
  assert.equal(runtime.GoSliceIsNil(slice), false);
  assert.equal(runtime.GoSliceCapacity(slice), 0);
  const appended = runtime.GoSliceAppend(slice, { value: 1 }, Object.freeze({
    zero: () => ({ value: 0 }),
    copy: (value) => ({ value: value.value }),
  }));
  assert.equal(appended.length, 1);
  assert.equal(zero.length, 0);

  const nonzero = runtime.GoArrayMake(1, runtime.GoNumberValueOps);
  assert.throws(() => zeroOps.copy(nonzero), /zero-length array value expected/);
});

test("slice carrier rejects invalid construction, bounds, and overflow without fallback behavior", async () => {
  const runtime = await loadRuntime();
  const numberOps = runtime.GoNumberValueOps;
  assert.throws(() => runtime.GoSliceMake(-1, 0, numberOps), /length out of range/);
  assert.throws(() => runtime.GoSliceMake(Number.MAX_SAFE_INTEGER + 1, Number.MAX_SAFE_INTEGER + 1, numberOps), /length out of range/);
  assert.throws(() => runtime.GoSliceMake(2, 1, numberOps), /makeslice: len out of range/);
  assert.throws(() => runtime.GoArrayMake(-1, numberOps), /array length out of range/);
  const slice = numbers(runtime, [1, 2], 3);
  assert.throws(() => runtime.GoSliceLoad(slice, -1, numberOps), /index out of range/);
  assert.throws(() => runtime.GoSliceLoad(slice, 2, numberOps), /index out of range/);
  assert.throws(() => runtime.GoSliceReslice(slice, 0, 4), /slice bounds out of range/);
  assert.throws(() => runtime.GoSliceFullReslice(slice, 1, 2, 4), /slice bounds out of range/);
  assert.throws(() => runtime.GoSliceFullReslice(slice, 2, 1, 2), /slice bounds out of range/);
});
