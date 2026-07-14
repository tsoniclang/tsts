import assert from "node:assert/strict";
import { test } from "node:test";

import type { byte, int } from "../../../scalars.js";
import type { GoError, GoSlice, GoValueOps } from "../../../compat.js";
import {
  GoNilSlice,
  GoNumberValueOps,
  GoSliceAppend,
  GoSliceBuild,
  GoSliceIsNil,
  GoSliceLoad,
  GoSliceStore,
} from "../../../compat.js";
import type { Reader, Writer } from "../../../io.js";
import {
  BeginArray,
  BeginObject,
  DecoderValueOps,
  EncoderValueOps,
  EndArray,
  EndObject,
  KindValueOps,
  NewDecoder,
  NewEncoder,
  Null,
  type Decoder,
  type Encoder,
  type Kind,
  type Value,
} from "./jsontext.js";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();
const endOfInput = new Error("EOF");

class SliceReader implements Reader {
  #offset: int = 0;
  readonly source: GoSlice<byte>;
  readCount: int = 0;

  constructor(source: GoSlice<byte>) {
    this.source = source;
  }

  Read(destination: GoSlice<byte>): [int, GoError] {
    this.readCount++;
    const count = Math.min(destination.length, this.source.length - this.#offset);
    for (let index = 0; index < count; index++) {
      GoSliceStore(
        destination,
        index,
        GoSliceLoad(this.source, this.#offset + index, GoNumberValueOps),
        GoNumberValueOps,
      );
    }
    this.#offset += count;
    return [count, this.#offset === this.source.length ? endOfInput : undefined];
  }
}

class CollectingWriter implements Writer {
  bytes: GoSlice<byte> = GoNilSlice<byte>();
  writeCount: int = 0;

  Write(source: GoSlice<byte>): [int, GoError] {
    this.writeCount++;
    for (let index = 0; index < source.length; index++) {
      this.bytes = GoSliceAppend(
        this.bytes,
        GoSliceLoad(source, index, GoNumberValueOps),
        GoNumberValueOps,
      );
    }
    return [source.length, undefined];
  }
}

const valueFromString = (text: string): Value => {
  const encoded = textEncoder.encode(text);
  return GoSliceBuild<byte>(encoded.length, encoded.length, GoNumberValueOps, (value) => {
    for (let index = 0; index < encoded.length; index++) {
      GoSliceStore(value, index, encoded[index]!, GoNumberValueOps);
    }
  });
};

const valueString = (value: GoSlice<byte>): string => {
  const bytes = new Uint8Array(value.length);
  for (let index = 0; index < value.length; index++) {
    bytes[index] = GoSliceLoad(value, index, GoNumberValueOps);
  }
  return textDecoder.decode(bytes);
};

test("jsontext value operations have direct exact types and true zero values", () => {
  const kindOperations: GoValueOps<Kind> = KindValueOps;
  const decoderOperations: GoValueOps<Decoder> = DecoderValueOps;
  const encoderOperations: GoValueOps<Encoder> = EncoderValueOps;

  assert.equal(Object.isFrozen(kindOperations), true);
  assert.equal(Object.isFrozen(decoderOperations), true);
  assert.equal(Object.isFrozen(encoderOperations), true);
  assert.equal(kindOperations.zero(), "\0");
  assert.equal(kindOperations.copy("["), "[");

  const zeroDecoder = decoderOperations.zero();
  const anotherZeroDecoder = decoderOperations.zero();
  assert.notEqual(zeroDecoder, anotherZeroDecoder);
  assert.equal(zeroDecoder.PeekKind(), "\0");
  const [zeroValue, zeroDecoderError] = zeroDecoder.ReadValue();
  assert.equal(GoSliceIsNil(zeroValue), true);
  assert.match(zeroDecoderError?.message ?? "", /uninitialized zero value/);

  const zeroEncoder = encoderOperations.zero();
  const anotherZeroEncoder = encoderOperations.zero();
  assert.notEqual(zeroEncoder, anotherZeroEncoder);
  assert.match(zeroEncoder.WriteValue(valueFromString("null"))?.message ?? "", /uninitialized zero value/);
});

test("Decoder assignment copies outer state and shares Go reference-like fields", () => {
  const loadedReader = new SliceReader(valueFromString(`{"a":1}`));
  const source = NewDecoder(loadedReader);
  assert.equal(source.PeekKind(), "{");
  const copied = DecoderValueOps.copy(source);
  assert.notEqual(copied, source);

  const [sourceValue, sourceError] = source.ReadValue();
  assert.equal(sourceError, undefined);
  assert.equal(valueString(sourceValue), `{"a":1}`);
  GoSliceStore(sourceValue, 2, "b".charCodeAt(0), GoNumberValueOps);

  const [copiedValue, copiedError] = copied.ReadValue();
  assert.equal(copiedError, undefined);
  assert.equal(valueString(copiedValue), `{"b":1}`);

  const sharedReader = new SliceReader(valueFromString("true"));
  const beforeLoad = NewDecoder(sharedReader);
  const beforeLoadCopy = DecoderValueOps.copy(beforeLoad);
  assert.equal(beforeLoad.ReadValue()[1], undefined);
  const [missingValue, sharedHandleError] = beforeLoadCopy.ReadValue();
  assert.equal(GoSliceIsNil(missingValue), true);
  assert.equal(sharedHandleError, endOfInput);
});

test("Encoder assignment copies outer state while retaining the writer interface handle", () => {
  const writer = new CollectingWriter();
  const source = NewEncoder(writer);
  const copied = EncoderValueOps.copy(source);

  assert.notEqual(copied, source);
  assert.equal(source.WriteValue(valueFromString("1")), undefined);
  assert.equal(copied.WriteValue(valueFromString("2")), undefined);
  assert.equal(writer.writeCount, 2);
  assert.equal(valueString(writer.bytes), "1\n2\n");
});

test("Decoder and Encoder preserve token and raw Value streaming behavior", () => {
  const decoder = NewDecoder(new SliceReader(valueFromString(`{"a":[null,2]}`)));
  assert.equal(decoder.PeekKind(), BeginObject.Kind());
  assert.equal(decoder.ReadToken()[0].Kind(), BeginObject.Kind());

  const [name, nameError] = decoder.ReadValue();
  assert.equal(nameError, undefined);
  assert.equal(valueString(name), `"a"`);
  assert.equal(decoder.ReadToken()[0].Kind(), BeginArray.Kind());
  assert.equal(decoder.ReadToken()[0].Kind(), Null.Kind());

  const [number, numberError] = decoder.ReadValue();
  assert.equal(numberError, undefined);
  assert.equal(valueString(number), "2");
  assert.equal(decoder.ReadToken()[0].Kind(), EndArray.Kind());
  assert.equal(decoder.ReadToken()[0].Kind(), EndObject.Kind());

  const writer = new CollectingWriter();
  const encoder = NewEncoder(writer);
  assert.equal(encoder.WriteToken(BeginObject), undefined);
  assert.equal(encoder.WriteValue(valueFromString(`"a"`)), undefined);
  assert.equal(encoder.WriteToken(BeginArray), undefined);
  assert.equal(encoder.WriteToken(Null), undefined);
  assert.equal(encoder.WriteValue(valueFromString("2")), undefined);
  assert.equal(encoder.WriteToken(EndArray), undefined);
  assert.equal(encoder.WriteToken(EndObject), undefined);
  assert.equal(valueString(writer.bytes), `{"a":[null,2]}\n`);
});

test("Value remains an opaque named GoSlice with nil behavior", () => {
  const value = valueFromString("true");
  assert.equal(Array.isArray(value), false);
  assert.equal(Symbol.iterator in Object(value), false);
  assert.equal(valueString(value), "true");

  const writer = new CollectingWriter();
  const encoder = NewEncoder(writer);
  const nilValue: Value = GoNilSlice<byte>();
  assert.notEqual(encoder.WriteValue(nilValue), undefined);
  assert.equal(writer.writeCount, 0);
  assert.equal(GoSliceIsNil(nilValue), true);
});
