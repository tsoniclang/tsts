import test from "node:test";
import assert from "node:assert/strict";

import {
  abs,
  bitwiseAND,
  bitwiseNOT,
  bitwiseOR,
  bitwiseXOR,
  exponentiate,
  floor,
  fromString,
  inf,
  isInf,
  isNaN,
  leftShift,
  maxSafeInteger,
  minSafeInteger,
  numberToString,
  remainder,
  signedRightShift,
  toInt32,
  toUint32,
  trunc,
  unsignedRightShift,
} from "./index.js";

test("constants", () => {
  assert.strictEqual(maxSafeInteger, Number.MAX_SAFE_INTEGER);
  assert.strictEqual(minSafeInteger, Number.MIN_SAFE_INTEGER);
});

test("nan infinity detection", () => {
  assert.ok(isNaN(NaN));
  assert.ok(!isNaN(0));
  assert.ok(isInf(Infinity));
  assert.ok(isInf(-Infinity));
  assert.ok(!isInf(0));
});

test("inf factory", () => {
  assert.strictEqual(inf(1), Infinity);
  assert.strictEqual(inf(-1), -Infinity);
});

test("safe integer round trip", () => {
  assert.strictEqual(toInt32(42), 42);
  assert.strictEqual(toInt32(-42), -42);
});

test("non finite returns zero", () => {
  assert.strictEqual(toInt32(NaN), 0);
  assert.strictEqual(toInt32(Infinity), 0);
  assert.strictEqual(toInt32(-Infinity), 0);
});

test("wraps mod 2 pow 32", () => {
  assert.strictEqual(toInt32(2 ** 31), -(2 ** 31));
  assert.strictEqual(toUint32(-1), 2 ** 32 - 1);
});

test("truncates fractions", () => {
  assert.strictEqual(toInt32(1.9), 1);
  assert.strictEqual(toInt32(-1.9), -1);
});

test("and or xor", () => {
  assert.strictEqual(bitwiseAND(0b1100, 0b1010), 0b1000);
  assert.strictEqual(bitwiseOR(0b1100, 0b1010), 0b1110);
  assert.strictEqual(bitwiseXOR(0b1100, 0b1010), 0b0110);
});

test("not", () => {
  assert.strictEqual(bitwiseNOT(0), -1);
  assert.strictEqual(bitwiseNOT(-1), 0);
});

test("shifts", () => {
  assert.strictEqual(leftShift(1, 4), 16);
  assert.strictEqual(signedRightShift(-16, 2), -4);
  assert.strictEqual(unsignedRightShift(-1, 0), 2 ** 32 - 1);
});

test("shift count masked to 5 bits", () => {
  assert.strictEqual(leftShift(1, 33), 2);
});

test("trunc floor abs", () => {
  assert.strictEqual(trunc(1.9), 1);
  assert.strictEqual(trunc(-1.9), -1);
  assert.strictEqual(floor(1.9), 1);
  assert.strictEqual(floor(-1.9), -2);
  assert.strictEqual(abs(-5), 5);
});

test("remainder basic", () => {
  assert.strictEqual(remainder(5, 2), 1);
  assert.strictEqual(remainder(-5, 2), -1);
  assert.ok(isNaN(remainder(NaN, 1)));
  assert.ok(isNaN(remainder(1, 0)));
  assert.ok(isNaN(remainder(Infinity, 1)));
  assert.strictEqual(remainder(5, Infinity), 5);
  assert.ok(Object.is(remainder(0, 5), 0));
});

test("exponentiate basic", () => {
  assert.strictEqual(exponentiate(2, 10), 1024);
  assert.strictEqual(exponentiate(2, 0), 1);
  assert.strictEqual(exponentiate(0, 0), 1);
  assert.ok(isNaN(exponentiate(1, NaN)));
  assert.ok(isNaN(exponentiate(1, Infinity)));
  assert.ok(isNaN(exponentiate(-1, Infinity)));
});

test("nan infinity literals", () => {
  assert.strictEqual(numberToString(NaN), "NaN");
  assert.strictEqual(numberToString(Infinity), "Infinity");
  assert.strictEqual(numberToString(-Infinity), "-Infinity");
});

test("safe integers", () => {
  assert.strictEqual(numberToString(42), "42");
  assert.strictEqual(numberToString(-42), "-42");
  assert.strictEqual(numberToString(0), "0");
});

test("fractions", () => {
  assert.strictEqual(numberToString(1.5), "1.5");
});

test("decimals", () => {
  assert.strictEqual(fromString("42"), 42);
  assert.strictEqual(fromString("-42"), -42);
  assert.strictEqual(fromString("3.14"), 3.14);
});

test("hex octal binary", () => {
  assert.strictEqual(fromString("0xFF"), 255);
  assert.strictEqual(fromString("0o17"), 15);
  assert.strictEqual(fromString("0b1010"), 10);
});

test("infinities", () => {
  assert.strictEqual(fromString("Infinity"), Infinity);
  assert.strictEqual(fromString("-Infinity"), -Infinity);
  assert.strictEqual(fromString("+Infinity"), Infinity);
});

test("empty string is zero", () => {
  assert.strictEqual(fromString(""), 0);
});

test("trims whitespace", () => {
  assert.strictEqual(fromString("  42  "), 42);
});

test("nan for invalid", () => {
  assert.ok(isNaN(fromString("abc")));
  assert.ok(isNaN(fromString("1.2.3")));
});

test("signed zero", () => {
  assert.ok(Object.is(fromString("-0"), -0));
  assert.ok(Object.is(fromString("0"), 0));
});
