import type { bool, double, int, uint } from "../../go/scalars.js";
import * as math from "../../go/math.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::constGroup::MaxSafeInteger+MinSafeInteger","kind":"constGroup","status":"implemented","sigHash":"0b1885948707d38451046b6d3f4f92bc901aedd072178765f25c98dad74c5719"}
 *
 * Go source:
 * const (
 * 	MaxSafeInteger Number = 1<<53 - 1
 * 	MinSafeInteger Number = -MaxSafeInteger
 * )
 */
export const MaxSafeInteger: Number = (2 ** 53 - 1) as Number;
export const MinSafeInteger: Number = -MaxSafeInteger as Number;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::type::Number","kind":"type","status":"implemented","sigHash":"85a1467d656e7508c2c4423ee1e20dc12278ec2cae6295a1023c1567fe859537"}
 *
 * Go source:
 * Number float64
 */
export type Number = double;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::func::NaN","kind":"func","status":"implemented","sigHash":"995f7fd220017b2cc971cad50be39804e37732d2828d24b4da1fc63fcf6464c0"}
 *
 * Go source:
 * func NaN() Number {
 * 	return Number(math.NaN())
 * }
 */
export function NaN(): Number {
  return math.NaN() as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.IsNaN","kind":"method","status":"implemented","sigHash":"65d9dd4518ec6452b48a321304a002f750c42743a7d01dd9e1fe8f25557b714f"}
 *
 * Go source:
 * func (n Number) IsNaN() bool {
 * 	return math.IsNaN(float64(n))
 * }
 */
export function Number_IsNaN(receiver: Number): bool {
  return math.IsNaN(receiver as double);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::func::Inf","kind":"func","status":"implemented","sigHash":"cf53296be6324bc83abe909dd244faa6a89abbc67fbd7b51ee27ba5cb14fead3"}
 *
 * Go source:
 * func Inf(sign int) Number {
 * 	return Number(math.Inf(sign))
 * }
 */
export function Inf(sign: int): Number {
  return math.Inf(sign) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.IsInf","kind":"method","status":"implemented","sigHash":"27d64766a626ebddaf4578f820ca4fa8fc3650d434a7cc49ed305887de73f5ca"}
 *
 * Go source:
 * func (n Number) IsInf() bool {
 * 	return math.IsInf(float64(n), 0)
 * }
 */
export function Number_IsInf(receiver: Number): bool {
  return math.IsInf(receiver as double, 0);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::func::isNonFinite","kind":"func","status":"implemented","sigHash":"8efbb66e26529903a31355d2541d1839400a09ef3363fce538eb24d798cd501a"}
 *
 * Go source:
 * func isNonFinite(x float64) bool {
 * 	// This is equivalent to checking `math.IsNaN(x) || math.IsInf(x, 0)` in one operation.
 * 	const mask = 0x7FF0000000000000
 * 	return math.Float64bits(x)&mask == mask
 * }
 */
export function isNonFinite(x: double): bool {
  // This is equivalent to checking `math.IsNaN(x) || math.IsInf(x, 0)` in one operation.
  // The 64-bit AND against the exponent mask is performed via BigInt because the
  // mask (0x7FF0000000000000) and the uint64 bit pattern exceed JS's 32-bit
  // bitwise-operator range.
  const mask: bigint = 0x7ff0000000000000n;
  return (globalThis.BigInt(math.Float64bits(x)) & mask) === mask;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.toUint32","kind":"method","status":"implemented","sigHash":"c01947569414c838d9a1dd1de3918583e77ecebe6001373507ce125d019ee62c"}
 *
 * Go source:
 * func (x Number) toUint32() uint32 {
 * 	// The only difference between ToUint32 and ToInt32 is the interpretation of the bits.
 * 	return uint32(x.toInt32())
 * }
 */
export function Number_toUint32(receiver: Number): uint {
  // The only difference between ToUint32 and ToInt32 is the interpretation of the bits.
  // `uint32(int32)` reinterprets the same bit pattern as unsigned: `>>> 0`.
  return (Number_toInt32(receiver) >>> 0) as uint;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.toInt32","kind":"method","status":"implemented","sigHash":"63ae566cc4bc930228090b910bb73c34bb917f9032282f14d196181da5f130f9"}
 *
 * Go source:
 * func (n Number) toInt32() int32 {
 * 	x := float64(n)
 *
 * 	// Fast path: if the number is in the range (-2^31, 2^32), i.e. an SMI,
 * 	// then we don't need to do any special mapping.
 * 	if smi := int32(x); float64(smi) == x {
 * 		return smi
 * 	}
 *
 * 	// 2. If number is not finite or number is either +0𝔽 or -0𝔽, return +0𝔽.
 * 	// Zero was covered by the test above.
 * 	if isNonFinite(x) {
 * 		return 0
 * 	}
 *
 * 	// Let int be truncate(ℝ(number)).
 * 	x = math.Trunc(x)
 * 	// Let int32bit be int modulo 2**32.
 * 	x = math.Mod(x, 1<<32)
 * 	// If int32bit ≥ 2**31, return 𝔽(int32bit - 2**32); otherwise return 𝔽(int32bit).
 * 	return int32(int64(x))
 * }
 */
export function Number_toInt32(receiver: Number): int {
  const x: double = receiver as double;

  // Fast path: if the number is in the range (-2^31, 2^32), i.e. an SMI,
  // then we don't need to do any special mapping.
  // `int32(x)` truncates toward zero with 32-bit signed wrap, matched by `| 0`.
  const smi = (x | 0) as int;
  if ((smi as double) === x) {
    return smi;
  }

  // 2. If number is not finite or number is either +0𝔽 or -0𝔽, return +0𝔽.
  // Zero was covered by the test above.
  if (isNonFinite(x)) {
    return 0 as int;
  }

  // Let int be truncate(ℝ(number)).
  const truncated = math.Trunc(x);
  // Let int32bit be int modulo 2**32.
  const int32bit = math.Mod(truncated, 2 ** 32);
  // If int32bit ≥ 2**31, return 𝔽(int32bit - 2**32); otherwise return 𝔽(int32bit).
  // `int32(int64(x))` reinterprets the low 32 bits as signed, matched by `| 0`.
  return (int32bit | 0) as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.toShiftCount","kind":"method","status":"implemented","sigHash":"c94c787fa8a05ec52b53588106181f42f75e9b1066d2113554a425510ebc5ef0"}
 *
 * Go source:
 * func (x Number) toShiftCount() uint32 {
 * 	return x.toUint32() & 31
 * }
 */
export function Number_toShiftCount(receiver: Number): uint {
  return (Number_toUint32(receiver) & 31) as uint;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.SignedRightShift","kind":"method","status":"implemented","sigHash":"cf16eeda1152f4d8ebe6cf97130333b0a7d77cb11f75614ee9543c137d25f191"}
 *
 * Go source:
 * func (x Number) SignedRightShift(y Number) Number {
 * 	return Number(x.toInt32() >> y.toShiftCount())
 * }
 */
export function Number_SignedRightShift(receiver: Number, y: Number): Number {
  return (Number_toInt32(receiver) >> Number_toShiftCount(y)) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.UnsignedRightShift","kind":"method","status":"implemented","sigHash":"ed8ada8d94b5620433cdb011ef2b202bbcd0a55a455a469aa664b45f7fc2c7de"}
 *
 * Go source:
 * func (x Number) UnsignedRightShift(y Number) Number {
 * 	return Number(x.toUint32() >> y.toShiftCount())
 * }
 */
export function Number_UnsignedRightShift(receiver: Number, y: Number): Number {
  // `uint32 >> n` is a logical shift; `>>>` performs the unsigned right shift.
  return (Number_toUint32(receiver) >>> Number_toShiftCount(y)) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.LeftShift","kind":"method","status":"implemented","sigHash":"671b95d13e96886dbe4bf8334781be91dd07f1ed8d5413a63e110667b3b36926"}
 *
 * Go source:
 * func (x Number) LeftShift(y Number) Number {
 * 	return Number(x.toInt32() << y.toShiftCount())
 * }
 */
export function Number_LeftShift(receiver: Number, y: Number): Number {
  return (Number_toInt32(receiver) << Number_toShiftCount(y)) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.BitwiseNOT","kind":"method","status":"implemented","sigHash":"5355c84a87802fb20c69b03d9707002b74de02baac12a8a73308648e7e49dc17"}
 *
 * Go source:
 * func (x Number) BitwiseNOT() Number {
 * 	return Number(^x.toInt32())
 * }
 */
export function Number_BitwiseNOT(receiver: Number): Number {
  return ~Number_toInt32(receiver) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.BitwiseOR","kind":"method","status":"implemented","sigHash":"c2a16007659f730b097590c6edd11199576d6160ae05af631d711ddb452a8198"}
 *
 * Go source:
 * func (x Number) BitwiseOR(y Number) Number {
 * 	return Number(x.toInt32() | y.toInt32())
 * }
 */
export function Number_BitwiseOR(receiver: Number, y: Number): Number {
  return (Number_toInt32(receiver) | Number_toInt32(y)) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.BitwiseAND","kind":"method","status":"implemented","sigHash":"00dd292354f15b2f5f8591983b818427ee9eafaf76413db416b12eab8c950d1b"}
 *
 * Go source:
 * func (x Number) BitwiseAND(y Number) Number {
 * 	return Number(x.toInt32() & y.toInt32())
 * }
 */
export function Number_BitwiseAND(receiver: Number, y: Number): Number {
  return (Number_toInt32(receiver) & Number_toInt32(y)) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.BitwiseXOR","kind":"method","status":"implemented","sigHash":"ed54fc753508762faa1129983f87ee62a9f9d7f7f0376ccc2a38a94dccd09825"}
 *
 * Go source:
 * func (x Number) BitwiseXOR(y Number) Number {
 * 	return Number(x.toInt32() ^ y.toInt32())
 * }
 */
export function Number_BitwiseXOR(receiver: Number, y: Number): Number {
  return (Number_toInt32(receiver) ^ Number_toInt32(y)) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.trunc","kind":"method","status":"implemented","sigHash":"5e5a3f872a0293a663bcc0f32fae7510aa85c23a24d94e4166720f3039abddaa"}
 *
 * Go source:
 * func (x Number) trunc() Number {
 * 	return Number(math.Trunc(float64(x)))
 * }
 */
export function Number_trunc(receiver: Number): Number {
  return math.Trunc(receiver as double) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.Floor","kind":"method","status":"implemented","sigHash":"e6ebe87deaa9aa180804103288e5994b5758a4960deabf0c35a2cf1d64e44c06"}
 *
 * Go source:
 * func (x Number) Floor() Number {
 * 	return Number(math.Floor(float64(x)))
 * }
 */
export function Number_Floor(receiver: Number): Number {
  return math.Floor(receiver as double) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.Abs","kind":"method","status":"implemented","sigHash":"31156d92815a7804aa0491fb8699f2804b5abd4a377b073838f4cb4410a17c20"}
 *
 * Go source:
 * func (x Number) Abs() Number {
 * 	return Number(math.Abs(float64(x)))
 * }
 */
export function Number_Abs(receiver: Number): Number {
  return math.Abs(receiver as double) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::varGroup::negativeZero","kind":"varGroup","status":"implemented","sigHash":"c4c47f8899c8e9f322d2ec8ef381c3df22ea7e53bf1db2b9e3d3f15c64938111"}
 *
 * Go source:
 * var negativeZero = Number(math.Copysign(0, -1))
 */
export let negativeZero: Number = math.Copysign(0, -1) as Number;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.Remainder","kind":"method","status":"implemented","sigHash":"5db7ebfb8524209b4b5a85765f1499a751ca27f8d8b4b52546fa0755be2c1fcf"}
 *
 * Go source:
 * func (n Number) Remainder(d Number) Number {
 * 	switch {
 * 	case n.IsNaN() || d.IsNaN():
 * 		return NaN()
 * 	case n.IsInf():
 * 		return NaN()
 * 	case d.IsInf():
 * 		return n
 * 	case d == 0:
 * 		return NaN()
 * 	case n == 0:
 * 		return n
 * 	}
 * 	return Number(math.Mod(float64(n), float64(d)))
 * }
 */
export function Number_Remainder(receiver: Number, d: Number): Number {
  switch (true) {
    case Number_IsNaN(receiver) || Number_IsNaN(d):
      return NaN();
    case Number_IsInf(receiver):
      return NaN();
    case Number_IsInf(d):
      return receiver;
    case d === (0 as Number):
      return NaN();
    case receiver === (0 as Number):
      return receiver;
  }
  return math.Mod(receiver as double, d as double) as Number;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/jsnum/jsnum.go::method::Number.Exponentiate","kind":"method","status":"implemented","sigHash":"a492e4ab60b4b7e1d410744836b03c9aa9a13f1f73da699178f77012b511b4e7"}
 *
 * Go source:
 * func (base Number) Exponentiate(exponent Number) Number {
 * 	switch {
 * 	case (base == 1 || base == -1) && exponent.IsInf():
 * 		return NaN()
 * 	case base == 1 && exponent.IsNaN():
 * 		return NaN()
 * 	}
 *
 * 	b := float64(base)
 * 	e := float64(exponent)
 *
 * 	// For integer base ** integer exponent where the result exceeds 53 bits,
 * 	// math.Pow can be off by multiple ULPs vs JS engines. Use exact big.Int
 * 	// arithmetic and IEEE 754 round-to-nearest-even conversion instead.
 * 	// The ES spec (§6.1.6.1.3) says exponentiate returns an
 * 	// "implementation-approximated" value, so engines are allowed to differ.
 * 	// This won't exactly match every engine (V8's fdlibm-compiled pow can
 * 	// round halfway ties differently), but will always be within 1 ULP
 * 	// (unit in the last place, i.e. the least significant bit of the result).
 * 	if b >= math.MinInt64 && b <= math.MaxInt64 && b == math.Trunc(b) &&
 * 		e >= 0 && e <= math.MaxInt64 && e == math.Trunc(e) && !math.IsInf(e, 0) {
 * 		magnitude := e * math.Log2(math.Abs(b))
 * 		if magnitude > 53 && magnitude <= math.Log2(math.MaxFloat64) {
 * 			ri := new(big.Int).Exp(big.NewInt(int64(b)), big.NewInt(int64(e)), nil)
 * 			result, _ := new(big.Float).SetPrec(256).SetInt(ri).Float64()
 * 			return Number(result)
 * 		}
 * 	}
 *
 * 	return Number(math.Pow(b, e))
 * }
 */
export function Number_Exponentiate(receiver: Number, exponent: Number): Number {
  switch (true) {
    case (receiver === (1 as Number) || receiver === (-1 as Number)) && Number_IsInf(exponent):
      return NaN();
    case receiver === (1 as Number) && Number_IsNaN(exponent):
      return NaN();
  }

  const b: double = receiver as double;
  const e: double = exponent as double;

  // For integer base ** integer exponent where the result exceeds 53 bits,
  // use exact BigInt arithmetic and IEEE 754 round-to-nearest-even conversion.
  if (
    b >= math.MinInt64 &&
    b <= math.MaxInt64 &&
    b === math.Trunc(b) &&
    e >= 0 &&
    e <= math.MaxInt64 &&
    e === math.Trunc(e) &&
    !math.IsInf(e, 0)
  ) {
    const magnitude: double = e * math.Log2(math.Abs(b));
    if (magnitude > 53 && magnitude <= math.Log2(math.MaxFloat64)) {
      // Use BigInt for exact integer exponentiation, then convert to float64.
      const bBig = globalThis.BigInt(globalThis.Math.trunc(b));
      const eBig = globalThis.BigInt(globalThis.Math.trunc(e));
      const riBig = bBig ** eBig;
      const result: double = globalThis.Number(riBig) as double;
      return result as Number;
    }
  }

  return math.Pow(b, e) as Number;
}
