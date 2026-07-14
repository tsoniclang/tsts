import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

import { renderGoCompatModule } from "./core/runtime-templates/compatibility.mjs";
import { stringRuntime } from "./core/runtime-templates/compatibility/strings.mjs";

const goOracle = JSON.parse(readFileSync(new URL("../go-runtime-oracle/slices.expected.json", import.meta.url), "utf8"));

function combinedRuntimeSource({ instrumentSequenceAllocations = false } = {}) {
  const source = `${renderGoCompatModule()}\n${stringRuntime}`.replace(
    /^import type \{ bool, int \} from "\.\/scalars\.js";\n\n/,
    "type bool = boolean;\ntype byte = number;\ntype int = number;\n\n",
  );
  if (!instrumentSequenceAllocations) return source;
  const allocationFunction = "function allocateUninitializedGoSequenceBacking<T>(capacity: int): GoSequenceBacking<T> {\n";
  assert.equal(source.split(allocationFunction).length, 2, "slice allocation instrumentation target drifted");
  return source.replace(allocationFunction, `let goStringTestSequenceAllocationCount = 0;

export function GoStringTestSequenceAllocationCount(): int {
  return goStringTestSequenceAllocationCount;
}

export function GoStringTestResetSequenceAllocationCount(): void {
  goStringTestSequenceAllocationCount = 0;
}

${allocationFunction}  goStringTestSequenceAllocationCount++;
`);
}

async function loadRuntime(options) {
  const javascript = ts.transpileModule(combinedRuntimeSource(options), {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(javascript).toString("base64")}`);
}

function stringBytes(runtime, value) {
  const bytes = [];
  for (let index = 0; index < runtime.GoStringLength(value); index++) {
    bytes.push(runtime.GoStringByteAt(value, index));
  }
  return bytes;
}

function sliceBytes(runtime, value) {
  const bytes = [];
  for (let index = 0; index < value.length; index++) {
    bytes.push(runtime.GoSliceLoad(value, index, runtime.GoNumberValueOps));
  }
  return bytes;
}

function byteSlice(runtime, values, capacity = values.length) {
  return runtime.GoSliceBuild(values.length, capacity, runtime.GoNumberValueOps, (slice) => {
    for (let index = 0; index < values.length; index++) {
      runtime.GoSliceStore(slice, index, values[index], runtime.GoNumberValueOps);
    }
  });
}

test("Go string carrier is opaque, byte-authoritative, and has one representation", () => {
  const source = combinedRuntimeSource();
  assert.match(source, /class GoStringHeader \{/);
  assert.match(source, /export type GoString = GoStringHeader;/);
  assert.doesNotMatch(source, /GoString\s*=\s*string|string\s*\|\s*GoString|GoString\s*\|\s*string/);
  assert.doesNotMatch(stringRuntime, /TextEncoder|TextDecoder|Uint8Array|Proxy|Reflect/);

  const fileName = "/go-string-contract.ts";
  const contractSource = `${source}
declare const carrier: GoString;
// @ts-expect-error native JavaScript strings are not Go string carriers
const fromNative: GoString = "native";
// @ts-expect-error Go string carriers are not native JavaScript strings
const toNative: string = carrier;
// @ts-expect-error Go strings expose no JavaScript UTF-16 length
const nativeLength = carrier.length;
// @ts-expect-error Go strings require byte indexing through GoStringByteAt
const nativeIndex = carrier[0];
// @ts-expect-error Go strings expose no JavaScript slicing method
const nativeSlice = carrier.slice(0, 1);
// @ts-expect-error Go string backing storage is private
const nativeBacking = carrier.backing;
const decoded: string = GoStringToUtf8(carrier);
const encoded: GoString = GoStringFromUtf8(decoded);
void fromNative;
void toNative;
void nativeLength;
void nativeIndex;
void nativeSlice;
void nativeBacking;
void decoded;
void encoded;
`;
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
    ? ts.createSourceFile(path, contractSource, languageVersion, true)
    : defaultGetSourceFile(path, languageVersion, onError, shouldCreateNewSourceFile);
  host.fileExists = (path) => path === fileName || defaultFileExists(path);
  host.readFile = (path) => path === fileName ? contractSource : defaultReadFile(path);
  const diagnostics = ts.getPreEmitDiagnostics(ts.createProgram([fileName], options, host));
  assert.deepEqual(diagnostics.map((diagnostic) => ({
    code: diagnostic.code,
    message: ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
  })), []);
});

test("Go string UTF-8 adapters, raw bytes, indexing, slicing, and conversions match Go semantics", async () => {
  const runtime = await loadRuntime();
  const oracle = goOracle.stringBytes;

  const utf8 = runtime.GoStringFromUtf8("é💚");
  assert.deepEqual(stringBytes(runtime, utf8), oracle.appendUtf8);
  assert.equal(runtime.GoStringLength(utf8), oracle.appendUtf8.length);
  assert.equal(runtime.GoStringToUtf8(utf8), "é💚");
  assert.deepEqual(stringBytes(runtime, runtime.GoStringSlice(utf8, 1, 2)), oracle.utf8MiddleSlice);
  const utf8Boundaries = "\u0000\u007f\u0080\u07ff\u0800\ud7ff\ue000\uffff\u{10000}\u{10ffff}\ufeff";
  assert.equal(runtime.GoStringToUtf8(runtime.GoStringFromUtf8(utf8Boundaries)), utf8Boundaries);

  const rawValues = [0xff, 0, 0x61, 0xc3, 0xa9];
  const raw = runtime.GoStringFromByteValues(rawValues);
  rawValues[0] = 1;
  assert.equal(runtime.GoStringLength(raw), oracle.rawLength);
  assert.deepEqual(stringBytes(runtime, raw), oracle.rawIndexes);
  const rawSlice = runtime.GoStringSlice(raw, 1, 4);
  assert.deepEqual(stringBytes(runtime, rawSlice), oracle.rawSlice);
  assert.deepEqual(sliceBytes(runtime, runtime.GoStringToByteSlice(rawSlice)), oracle.rawSlice);
  assert.deepEqual(stringBytes(runtime, raw), oracle.rawAfterSourceMutation);

  const sourceBacking = byteSlice(runtime, [9, ...oracle.appendRaw, 8], oracle.appendRaw.length + 4);
  const sourceSlice = runtime.GoSliceReslice(sourceBacking, 1, oracle.appendRaw.length + 1);
  const fromSlice = runtime.GoStringFromByteSlice(sourceSlice);
  runtime.GoSliceStore(sourceBacking, 1, 1, runtime.GoNumberValueOps);
  assert.deepEqual(stringBytes(runtime, fromSlice), oracle.rawAfterSourceMutation);

  const converted = runtime.GoStringToByteSlice(raw);
  runtime.GoSliceStore(converted, 1, 9, runtime.GoNumberValueOps);
  assert.deepEqual(stringBytes(runtime, raw), oracle.rawAfterConvertedMutation);
  assert.deepEqual(sliceBytes(runtime, runtime.GoStringToByteSlice(raw)), oracle.appendRaw);

  const emptyBytes = runtime.GoStringToByteSlice(runtime.GoStringFromUtf8(""));
  assert.equal(runtime.GoSliceIsNil(emptyBytes), oracle.emptyBytesIsNil);
  assert.equal(emptyBytes.length, oracle.emptyBytesLength);
  assert.equal(runtime.GoSliceCapacity(emptyBytes), oracle.emptyBytesCapacity);
  assert.equal(runtime.GoStringLength(runtime.GoStringFromByteSlice(runtime.GoNilSlice())), oracle.nilBytesStringLength);

  assert.deepEqual(stringBytes(runtime, runtime.GoStringSlice(raw, 0, runtime.GoStringLength(raw))), oracle.rawIndexes);
  assert.equal(runtime.GoStringLength(runtime.GoStringSlice(raw, 2, 2)), 0);

  const everyByteValues = Array.from({ length: 256 }, (_value, index) => index);
  const everyByte = runtime.GoStringFromByteValues(everyByteValues);
  assert.deepEqual(stringBytes(runtime, everyByte), everyByteValues);
  assert.deepEqual(sliceBytes(runtime, runtime.GoStringToByteSlice(everyByte)), everyByteValues);
  assert.equal(runtime.GoStringByteAt(runtime.GoStringFromByteValues([-0]), 0), 0);
});

test("Go string append and copy preserve single-operation slice behavior", async () => {
  const runtime = await loadRuntime({ instrumentSequenceAllocations: true });
  const oracle = goOracle.stringBytes;
  const raw = runtime.GoStringFromByteValues(oracle.appendRaw);

  const emptyAppendBase = byteSlice(runtime, [7], 2);
  runtime.GoStringTestResetSequenceAllocationCount();
  const emptyAppendResult = runtime.GoStringAppendToByteSlice(emptyAppendBase, runtime.GoStringFromUtf8(""));
  assert.deepEqual(sliceBytes(runtime, emptyAppendResult), [7]);
  assert.equal(runtime.GoStringTestSequenceAllocationCount(), 0);

  const allocateBase = byteSlice(runtime, [7], 2);
  const allocateOldBacking = runtime.GoSliceReslice(allocateBase, 0, runtime.GoSliceCapacity(allocateBase));
  runtime.GoStringTestResetSequenceAllocationCount();
  const allocateResult = runtime.GoStringAppendToByteSlice(allocateBase, raw);
  assert.equal(runtime.GoStringTestSequenceAllocationCount(), 1);
  assert.deepEqual(sliceBytes(runtime, allocateOldBacking), oracle.appendAllocateOldBacking);
  assert.deepEqual(sliceBytes(runtime, allocateResult), oracle.appendAllocateResult);

  const reuseBase = byteSlice(runtime, [7], 8);
  runtime.GoStringTestResetSequenceAllocationCount();
  const reuseResult = runtime.GoStringAppendToByteSlice(reuseBase, raw);
  assert.equal(runtime.GoStringTestSequenceAllocationCount(), 0);
  const reuseBacking = runtime.GoSliceReslice(reuseBase, 0, runtime.GoSliceCapacity(reuseBase));
  assert.deepEqual(sliceBytes(runtime, reuseBacking), oracle.appendReuseBacking);
  assert.deepEqual(sliceBytes(runtime, reuseResult), oracle.appendReuseResult);
  assert.equal(
    runtime.GoSliceElementRef(reuseBase, 0, runtime.GoNumberValueOps),
    runtime.GoSliceElementRef(reuseResult, 0, runtime.GoNumberValueOps),
  );

  const copyTarget = byteSlice(runtime, [0, 0, 0, 0]);
  runtime.GoStringTestResetSequenceAllocationCount();
  assert.equal(runtime.GoStringCopyToByteSlice(copyTarget, raw), oracle.copyCount);
  assert.equal(runtime.GoStringTestSequenceAllocationCount(), 0);
  assert.deepEqual(sliceBytes(runtime, copyTarget), oracle.copyBytes);

  const shortTarget = byteSlice(runtime, [0]);
  const utf8 = runtime.GoStringFromUtf8("é");
  runtime.GoStringTestResetSequenceAllocationCount();
  assert.equal(runtime.GoStringCopyToByteSlice(shortTarget, utf8), oracle.truncatedUtf8CopyCount);
  assert.equal(runtime.GoStringTestSequenceAllocationCount(), 0);
  assert.deepEqual(sliceBytes(runtime, shortTarget), oracle.truncatedUtf8CopyBytes);

  const slicedTarget = byteSlice(runtime, [0, 0, 0]);
  assert.equal(runtime.GoStringCopyToByteSlice(slicedTarget, runtime.GoStringSlice(raw, 1, 4)), 3);
  assert.deepEqual(sliceBytes(runtime, slicedTarget), oracle.rawSlice);

  runtime.GoStringTestResetSequenceAllocationCount();
  assert.deepEqual(sliceBytes(runtime, runtime.GoStringToByteSlice(raw)), oracle.appendRaw);
  assert.equal(runtime.GoStringTestSequenceAllocationCount(), 1);
});

test("Go string carrier fails closed on invalid adapters and bounds", async () => {
  const runtime = await loadRuntime();
  assert.throws(() => runtime.GoStringFromUtf8(42), /Go UTF-8 input must be a string/);
  assert.throws(() => runtime.GoStringFromByteValues({ length: 0 }), /Go string byte values must be an array/);
  assert.throws(() => runtime.GoStringFromByteValues([-1]), /Go string byte out of range/);
  assert.throws(() => runtime.GoStringFromByteValues([256]), /Go string byte out of range/);
  assert.throws(() => runtime.GoStringFromByteValues([1.5]), /Go string byte out of range/);
  assert.throws(() => runtime.GoStringFromByteValues([Number.NaN]), /Go string byte out of range/);
  assert.throws(() => runtime.GoStringFromByteSlice(byteSlice(runtime, [256])), /Go string byte out of range/);
  assert.throws(() => runtime.GoStringFromUtf8("\ud800"), /unpaired surrogate/);
  assert.throws(() => runtime.GoStringFromUtf8("\ud800A"), /unpaired surrogate/);
  assert.throws(() => runtime.GoStringFromUtf8("\udc00"), /unpaired surrogate/);
  const malformedUtf8 = [
    [0x80],
    [0xc0, 0x80],
    [0xc2],
    [0xe0, 0x80, 0x80],
    [0xe2, 0x28, 0xa1],
    [0xed, 0xa0, 0x80],
    [0xf0, 0x80, 0x80, 0x80],
    [0xf4, 0x90, 0x80, 0x80],
    [0xf5, 0x80, 0x80, 0x80],
  ];
  for (const bytes of malformedUtf8) {
    assert.throws(() => runtime.GoStringToUtf8(runtime.GoStringFromByteValues(bytes)), /invalid UTF-8 at byte 0/);
  }
  const value = runtime.GoStringFromByteValues([1, 2]);
  for (const index of [-1, 2, 0.5, Number.NaN, Number.POSITIVE_INFINITY, Number.MAX_SAFE_INTEGER + 1]) {
    assert.throws(() => runtime.GoStringByteAt(value, index), /string index out of range/);
  }
  for (const [low, high] of [
    [-1, 1],
    [2, 1],
    [0, 3],
    [0.5, 1],
    [0, 1.5],
    [Number.NaN, 1],
    [0, Number.POSITIVE_INFINITY],
    [0, Number.MAX_SAFE_INTEGER + 1],
  ]) {
    assert.throws(() => runtime.GoStringSlice(value, low, high), /slice bounds out of range/);
  }
});
