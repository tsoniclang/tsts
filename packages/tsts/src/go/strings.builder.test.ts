import assert from "node:assert/strict";
import { test } from "node:test";
import { GoNumberValueOps, GoSliceBuild, GoSliceStore } from "./compat.js";
import { Builder, BuilderValueOps } from "./strings.js";

const copyPanic = {
  message: "strings: illegal use of non-zero Builder copied by value",
};

const writeBytes = GoSliceBuild(3, 3, GoNumberValueOps, (bytes) => {
  GoSliceStore(bytes, 0, 0x47, GoNumberValueOps);
  GoSliceStore(bytes, 1, 0x6f, GoNumberValueOps);
  GoSliceStore(bytes, 2, 0x20, GoNumberValueOps);
});

test("BuilderValueOps creates fresh Go zero values", () => {
  const first = BuilderValueOps.zero();
  const second = BuilderValueOps.zero();

  assert.notEqual(first, second);
  assert.equal(first.String(), "");
  assert.equal(first.Len(), 0);
  assert.equal(first.Cap(), 0);
  assert.equal(second.String(), "");
  assert.equal(second.Len(), 0);
  assert.equal(second.Cap(), 0);
});

test("copying an unused zero Builder produces independently usable values", () => {
  const source = new Builder();
  const copied = BuilderValueOps.copy(source);

  assert.notEqual(copied, source);
  assert.deepEqual(source.WriteString("source"), [6, undefined]);
  assert.deepEqual(copied.WriteString("copy"), [4, undefined]);
  assert.equal(source.String(), "source");
  assert.equal(copied.String(), "copy");
});

test("a copied non-zero Builder permits reads and panics on every mutation", () => {
  const source = new Builder();
  source.Grow(8);
  source.WriteString("x");

  const readableCopy = BuilderValueOps.copy(source);
  source.WriteString("y");
  assert.equal(readableCopy.String(), "x");
  assert.equal(readableCopy.Len(), 1);
  assert.equal(readableCopy.Cap(), 8);

  const writeCopy = BuilderValueOps.copy(source);
  assert.throws(() => writeCopy.Write(writeBytes), copyPanic);

  const byteCopy = BuilderValueOps.copy(source);
  assert.throws(() => byteCopy.WriteByte(0x21), copyPanic);

  const runeCopy = BuilderValueOps.copy(source);
  assert.throws(() => runeCopy.WriteRune(0x4e16), copyPanic);

  const stringCopy = BuilderValueOps.copy(source);
  assert.throws(() => stringCopy.WriteString("!"), copyPanic);

  const growCopy = BuilderValueOps.copy(source);
  assert.throws(() => growCopy.Grow(1), copyPanic);
});

test("Grow(0) initializes the exact addr invariant", () => {
  const source = new Builder();
  source.Grow(0);
  const copied = BuilderValueOps.copy(source);

  assert.equal(copied.String(), "");
  assert.equal(copied.Len(), 0);
  assert.equal(copied.Cap(), 0);
  assert.throws(() => copied.WriteByte(0x78), copyPanic);
});

test("Reset restores a usable zero Builder", () => {
  const builder = new Builder();
  builder.Grow(16);
  builder.WriteString("before");
  const previous = builder.String();

  builder.Reset();
  assert.equal(builder.String(), "");
  assert.equal(builder.Len(), 0);
  assert.equal(builder.Cap(), 0);
  assert.deepEqual(builder.WriteString("after"), [5, undefined]);
  assert.equal(builder.String(), "after");
  assert.equal(previous, "before");

  const copied = BuilderValueOps.copy(builder);
  copied.Reset();
  assert.deepEqual(copied.WriteString("reused"), [6, undefined]);
  assert.equal(copied.String(), "reused");
});

test("Grow rejects negative counts and guarantees writable capacity", () => {
  const negative = new Builder();
  assert.throws(
    () => negative.Grow(-1),
    { message: "strings.Builder.Grow: negative count" },
  );

  const builder = new Builder();
  builder.Grow(5);
  assert.ok(builder.Cap() >= 5);
  const firstCapacity = builder.Cap();
  builder.WriteString("abcde");
  assert.equal(builder.Cap(), firstCapacity);

  builder.Grow(6);
  assert.ok(builder.Cap() >= builder.Len() + 6);
  const secondCapacity = builder.Cap();
  assert.ok(secondCapacity > firstCapacity);
  builder.WriteString("fghijk");
  assert.equal(builder.Cap(), secondCapacity);
  assert.equal(builder.String(), "abcdefghijk");
});

test("Builder writes bytes, byte, runes, and UTF-8 strings", () => {
  const builder = new Builder();

  assert.deepEqual(builder.Write(writeBytes), [3, undefined]);
  assert.equal(builder.WriteByte(0x41), undefined);
  assert.deepEqual(builder.WriteRune(0x4e16), [3, undefined]);
  assert.deepEqual(builder.WriteRune(-1), [3, undefined]);
  assert.deepEqual(builder.WriteString(" é"), [3, undefined]);

  const expected = "Go A世� é";
  assert.equal(builder.String(), expected);
  assert.equal(builder.Len(), new TextEncoder().encode(expected).length);
  assert.ok(builder.Cap() >= builder.Len());
});
