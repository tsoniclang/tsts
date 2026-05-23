import { attributes as A } from "@tsonic/core/lang.js";
import { Assert, FactAttribute } from "xunit-types/Xunit.js";

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

export class JsnumBasicsTests {
  constants(): void {
    Assert.Equal(Number.MAX_SAFE_INTEGER, maxSafeInteger);
    Assert.Equal(Number.MIN_SAFE_INTEGER, minSafeInteger);
  }

  nan_infinity_detection(): void {
    Assert.True(isNaN(NaN));
    Assert.False(isNaN(0));
    Assert.True(isInf(Infinity));
    Assert.True(isInf(-Infinity));
    Assert.False(isInf(0));
  }

  inf_factory(): void {
    Assert.Equal(Infinity, inf(1));
    Assert.Equal(-Infinity, inf(-1));
  }
}

export class JsnumToIntUintTests {
  safe_integer_round_trip(): void {
    Assert.Equal(42, toInt32(42));
    Assert.Equal(-42, toInt32(-42));
  }

  non_finite_returns_zero(): void {
    Assert.Equal(0, toInt32(NaN));
    Assert.Equal(0, toInt32(Infinity));
    Assert.Equal(0, toInt32(-Infinity));
  }

  wraps_mod_2_pow_32(): void {
    Assert.Equal(-(2 ** 31), toInt32(2 ** 31));
    Assert.Equal(2 ** 32 - 1, toUint32(-1));
  }

  truncates_fractions(): void {
    Assert.Equal(1, toInt32(1.9));
    Assert.Equal(-1, toInt32(-1.9));
  }
}

export class JsnumBitwiseTests {
  and_or_xor(): void {
    Assert.Equal(0b1000, bitwiseAND(0b1100, 0b1010));
    Assert.Equal(0b1110, bitwiseOR(0b1100, 0b1010));
    Assert.Equal(0b0110, bitwiseXOR(0b1100, 0b1010));
  }

  not(): void {
    Assert.Equal(-1, bitwiseNOT(0));
    Assert.Equal(0, bitwiseNOT(-1));
  }

  shifts(): void {
    Assert.Equal(16, leftShift(1, 4));
    Assert.Equal(-4, signedRightShift(-16, 2));
    Assert.Equal(2 ** 32 - 1, unsignedRightShift(-1, 0));
  }

  shift_count_masked_to_5_bits(): void {
    Assert.Equal(2, leftShift(1, 33));
  }
}

export class JsnumMathTests {
  trunc_floor_abs(): void {
    Assert.Equal(1, trunc(1.9));
    Assert.Equal(-1, trunc(-1.9));
    Assert.Equal(1, floor(1.9));
    Assert.Equal(-2, floor(-1.9));
    Assert.Equal(5, abs(-5));
  }

  remainder_basic(): void {
    Assert.Equal(1, remainder(5, 2));
    Assert.Equal(-1, remainder(-5, 2));
    Assert.True(isNaN(remainder(NaN, 1)));
    Assert.True(isNaN(remainder(1, 0)));
    Assert.True(isNaN(remainder(Infinity, 1)));
    Assert.Equal(5, remainder(5, Infinity));
    Assert.True(Object.is(remainder(0, 5), 0));
  }

  exponentiate_basic(): void {
    Assert.Equal(1024, exponentiate(2, 10));
    Assert.Equal(1, exponentiate(2, 0));
    Assert.Equal(1, exponentiate(0, 0));
    Assert.True(isNaN(exponentiate(1, NaN)));
    Assert.True(isNaN(exponentiate(1, Infinity)));
    Assert.True(isNaN(exponentiate(-1, Infinity)));
  }
}

export class JsnumNumberToStringTests {
  nan_infinity_literals(): void {
    Assert.Equal("NaN", numberToString(NaN));
    Assert.Equal("Infinity", numberToString(Infinity));
    Assert.Equal("-Infinity", numberToString(-Infinity));
  }

  safe_integers(): void {
    Assert.Equal("42", numberToString(42));
    Assert.Equal("-42", numberToString(-42));
    Assert.Equal("0", numberToString(0));
  }

  fractions(): void {
    Assert.Equal("1.5", numberToString(1.5));
  }
}

export class JsnumFromStringTests {
  decimals(): void {
    Assert.Equal(42, fromString("42"));
    Assert.Equal(-42, fromString("-42"));
    Assert.Equal(3.14, fromString("3.14"));
  }

  hex_octal_binary(): void {
    Assert.Equal(255, fromString("0xFF"));
    Assert.Equal(15, fromString("0o17"));
    Assert.Equal(10, fromString("0b1010"));
  }

  infinities(): void {
    Assert.Equal(Infinity, fromString("Infinity"));
    Assert.Equal(-Infinity, fromString("-Infinity"));
    Assert.Equal(Infinity, fromString("+Infinity"));
  }

  empty_string_is_zero(): void {
    Assert.Equal(0, fromString(""));
  }

  trims_whitespace(): void {
    Assert.Equal(42, fromString("  42  "));
  }

  nan_for_invalid(): void {
    Assert.True(isNaN(fromString("abc")));
    Assert.True(isNaN(fromString("1.2.3")));
  }

  signed_zero(): void {
    Assert.True(Object.is(fromString("-0"), -0));
    Assert.True(Object.is(fromString("0"), 0));
  }
}

A<JsnumBasicsTests>().method((t) => t.constants).add(FactAttribute);
A<JsnumBasicsTests>().method((t) => t.nan_infinity_detection).add(FactAttribute);
A<JsnumBasicsTests>().method((t) => t.inf_factory).add(FactAttribute);
A<JsnumToIntUintTests>().method((t) => t.safe_integer_round_trip).add(FactAttribute);
A<JsnumToIntUintTests>().method((t) => t.non_finite_returns_zero).add(FactAttribute);
A<JsnumToIntUintTests>().method((t) => t.wraps_mod_2_pow_32).add(FactAttribute);
A<JsnumToIntUintTests>().method((t) => t.truncates_fractions).add(FactAttribute);
A<JsnumBitwiseTests>().method((t) => t.and_or_xor).add(FactAttribute);
A<JsnumBitwiseTests>().method((t) => t.not).add(FactAttribute);
A<JsnumBitwiseTests>().method((t) => t.shifts).add(FactAttribute);
A<JsnumBitwiseTests>().method((t) => t.shift_count_masked_to_5_bits).add(FactAttribute);
A<JsnumMathTests>().method((t) => t.trunc_floor_abs).add(FactAttribute);
A<JsnumMathTests>().method((t) => t.remainder_basic).add(FactAttribute);
A<JsnumMathTests>().method((t) => t.exponentiate_basic).add(FactAttribute);
A<JsnumNumberToStringTests>().method((t) => t.nan_infinity_literals).add(FactAttribute);
A<JsnumNumberToStringTests>().method((t) => t.safe_integers).add(FactAttribute);
A<JsnumNumberToStringTests>().method((t) => t.fractions).add(FactAttribute);
A<JsnumFromStringTests>().method((t) => t.decimals).add(FactAttribute);
A<JsnumFromStringTests>().method((t) => t.hex_octal_binary).add(FactAttribute);
A<JsnumFromStringTests>().method((t) => t.infinities).add(FactAttribute);
A<JsnumFromStringTests>().method((t) => t.empty_string_is_zero).add(FactAttribute);
A<JsnumFromStringTests>().method((t) => t.trims_whitespace).add(FactAttribute);
A<JsnumFromStringTests>().method((t) => t.nan_for_invalid).add(FactAttribute);
A<JsnumFromStringTests>().method((t) => t.signed_zero).add(FactAttribute);
