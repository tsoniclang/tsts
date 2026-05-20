/**
 * Tests for jsnum. Ported subset from TS-Go internal/jsnum/jsnum_test.go.
 */

import { describe, it } from "node:test";
import { strict as assert } from "node:assert";

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
} from "../../src/jsnum/index.js";

describe("jsnum — basics", () => {
  it("constants", () => {
    assert.equal(maxSafeInteger, Number.MAX_SAFE_INTEGER);
    assert.equal(minSafeInteger, Number.MIN_SAFE_INTEGER);
  });

  it("NaN / Infinity detection", () => {
    assert.equal(isNaN(NaN), true);
    assert.equal(isNaN(0), false);
    assert.equal(isInf(Infinity), true);
    assert.equal(isInf(-Infinity), true);
    assert.equal(isInf(0), false);
  });

  it("inf factory", () => {
    assert.equal(inf(1), Infinity);
    assert.equal(inf(-1), -Infinity);
  });
});

describe("jsnum — ToInt32 / ToUint32", () => {
  it("safe-integer round-trip", () => {
    assert.equal(toInt32(42), 42);
    assert.equal(toInt32(-42), -42);
  });

  it("non-finite returns 0", () => {
    assert.equal(toInt32(NaN), 0);
    assert.equal(toInt32(Infinity), 0);
    assert.equal(toInt32(-Infinity), 0);
  });

  it("wraps mod 2^32", () => {
    assert.equal(toInt32(2 ** 31), -(2 ** 31));         // wrap
    assert.equal(toUint32(-1), 2 ** 32 - 1);
  });

  it("truncates fractions", () => {
    assert.equal(toInt32(1.9), 1);
    assert.equal(toInt32(-1.9), -1);
  });
});

describe("jsnum — bitwise", () => {
  it("AND / OR / XOR", () => {
    assert.equal(bitwiseAND(0b1100, 0b1010), 0b1000);
    assert.equal(bitwiseOR(0b1100, 0b1010), 0b1110);
    assert.equal(bitwiseXOR(0b1100, 0b1010), 0b0110);
  });

  it("NOT", () => {
    assert.equal(bitwiseNOT(0), -1);
    assert.equal(bitwiseNOT(-1), 0);
  });

  it("shifts", () => {
    assert.equal(leftShift(1, 4), 16);
    assert.equal(signedRightShift(-16, 2), -4);
    assert.equal(unsignedRightShift(-1, 0), 2 ** 32 - 1);
  });

  it("shift count masked to 5 bits", () => {
    // 33 mod 32 = 1
    assert.equal(leftShift(1, 33), 2);
  });
});

describe("jsnum — math", () => {
  it("trunc / floor / abs", () => {
    assert.equal(trunc(1.9), 1);
    assert.equal(trunc(-1.9), -1);
    assert.equal(floor(1.9), 1);
    assert.equal(floor(-1.9), -2);
    assert.equal(abs(-5), 5);
  });

  it("remainder", () => {
    assert.equal(remainder(5, 2), 1);
    assert.equal(remainder(-5, 2), -1);
    assert.equal(isNaN(remainder(NaN, 1)), true);
    assert.equal(isNaN(remainder(1, 0)), true);
    assert.equal(isNaN(remainder(Infinity, 1)), true);
    assert.equal(remainder(5, Infinity), 5);     // d=Inf → return n
    assert.equal(Object.is(remainder(0, 5), 0), true);
  });

  it("exponentiate", () => {
    assert.equal(exponentiate(2, 10), 1024);
    assert.equal(exponentiate(2, 0), 1);
    assert.equal(exponentiate(0, 0), 1);
    assert.equal(isNaN(exponentiate(1, NaN)), true);
    assert.equal(isNaN(exponentiate(1, Infinity)), true);
    assert.equal(isNaN(exponentiate(-1, Infinity)), true);
  });
});

describe("jsnum — number → string", () => {
  it("handles NaN/Infinity literals", () => {
    assert.equal(numberToString(NaN), "NaN");
    assert.equal(numberToString(Infinity), "Infinity");
    assert.equal(numberToString(-Infinity), "-Infinity");
  });

  it("safe integers", () => {
    assert.equal(numberToString(42), "42");
    assert.equal(numberToString(-42), "-42");
    assert.equal(numberToString(0), "0");
  });

  it("fractions", () => {
    assert.equal(numberToString(1.5), "1.5");
  });
});

describe("jsnum — string → number", () => {
  it("decimals", () => {
    assert.equal(fromString("42"), 42);
    assert.equal(fromString("-42"), -42);
    assert.equal(fromString("3.14"), 3.14);
  });

  it("hex / octal / binary", () => {
    assert.equal(fromString("0xFF"), 255);
    assert.equal(fromString("0o17"), 15);
    assert.equal(fromString("0b1010"), 10);
  });

  it("infinities", () => {
    assert.equal(fromString("Infinity"), Infinity);
    assert.equal(fromString("-Infinity"), -Infinity);
    assert.equal(fromString("+Infinity"), Infinity);
  });

  it("empty string is 0", () => {
    assert.equal(fromString(""), 0);
  });

  it("trims whitespace", () => {
    assert.equal(fromString("  42  "), 42);
  });

  it("NaN for invalid", () => {
    assert.equal(isNaN(fromString("abc")), true);
    assert.equal(isNaN(fromString("1.2.3")), true);
  });

  it("signed zero", () => {
    assert.equal(Object.is(fromString("-0"), -0), true);
    assert.equal(Object.is(fromString("0"), 0), true);
  });
});
