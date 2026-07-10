import assert from "node:assert/strict";
import { test } from "node:test";
import { AttachJsonFieldNamesForGoStruct, DefineJsonFieldNamesForGoStruct, JsonFieldNames, Marshal, Unmarshal } from "./json.js";

const bytes = (text: string): number[] => Array.from(new TextEncoder().encode(text));

test("struct metadata limits marshaling to declared JSON fields", () => {
  const value = {
    [JsonFieldNames]: {
      Exported: "exported",
    },
    Exported: "kept",
    internalState: "must not leak",
  };

  const [encoded, error] = Marshal(value);

  assert.equal(error, undefined);
  assert.equal(new TextDecoder().decode(Uint8Array.from(encoded)), '{"exported":"kept"}');
});

test("struct metadata ignores unknown JSON object members", () => {
  const value = {
    [JsonFieldNames]: {
      Exported: "exported",
    },
    Exported: "before",
  };

  const error = Unmarshal(bytes('{"exported":"after","unknown":"must not attach"}'), value);

  assert.equal(error, undefined);
  assert.equal(value.Exported, "after");
  assert.equal("unknown" in value, false);
});

test("typed Go struct metadata distinguishes omitzero and omitempty", () => {
  interface Values {
    Zero: number;
    BigZero: bigint;
    PointerZero: number | undefined;
    ExplicitNull: unknown;
    NilSlice: string[] | undefined;
    AllocatedEmpty: string[];
    Empty: string[];
    MarshaledEmpty: string;
    NonZeroEmpty: number;
    Ignored: string;
  }
  const metadata = DefineJsonFieldNamesForGoStruct<Values>("example::values.go::type::Values", {
    Zero: { name: "zero", omitZero: true },
    BigZero: { name: "bigZero", omitZero: true },
    PointerZero: { name: "pointerZero", omitZero: true, zero: "nil" },
    ExplicitNull: { name: "explicitNull", omitZero: true },
    NilSlice: { name: "nilSlice", omitZero: true, zero: "nil" },
    AllocatedEmpty: { name: "allocatedEmpty", omitZero: true, zero: "nil" },
    Empty: { name: "empty", omitEmpty: true },
    MarshaledEmpty: { name: "marshaledEmpty", omitEmpty: true, marshal: () => [] },
    NonZeroEmpty: { name: "nonZeroEmpty", omitEmpty: true },
    Ignored: { name: "ignored", ignored: true },
  }, {
    strategy: "runtime",
    reason: "The test binds exact Go field-tag semantics to a runtime object.",
  });
  const value = AttachJsonFieldNamesForGoStruct<Values>({
    Zero: 0,
    BigZero: 0n,
    PointerZero: 0,
    ExplicitNull: null,
    NilSlice: undefined,
    AllocatedEmpty: [],
    Empty: [],
    MarshaledEmpty: "non-empty before marshaling",
    NonZeroEmpty: 0,
    Ignored: "must not appear",
  }, metadata);

  const [encoded, error] = Marshal(value);

  assert.equal(error, undefined);
  assert.equal(new TextDecoder().decode(Uint8Array.from(encoded)), '{"pointerZero":0,"explicitNull":null,"allocatedEmpty":[],"nonZeroEmpty":0}');

  const decodeError = Unmarshal(bytes('{"ignored":"changed","allocatedEmpty":["decoded"]}'), value);
  assert.equal(decodeError, undefined);
  assert.equal(value.Ignored, "must not appear");
  assert.deepEqual(value.AllocatedEmpty, ["decoded"]);
});
