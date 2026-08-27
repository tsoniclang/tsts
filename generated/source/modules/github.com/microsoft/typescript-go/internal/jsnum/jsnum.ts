import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { bool, float64, gostring, int, int32, uint32, uint64 } from "@gotots/runtime/scalars.js";
import { Marshal as Marshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { MaxFloat64$float64 as MaxFloat64$float64__from_math__package_1, MaxInt64$float64 as MaxInt64$float64__from_math__package_1, MinInt64$float64 as MinInt64$float64__from_math__package_1 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { $goInterfaceAdapter$float64 as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as named_math_big from "@gotots/gostdlib/internal/facets/named-math-big.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as big__from_gostdlib from "@gotots/gostdlib/math/big.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class Number {
    declare private readonly $goType: void;
    constructor(public readonly $value: float64) {
    }
    declare private readonly then?: never;
    Abs(): Number {
        return new Number(math__from_gostdlib.Abs(this.$value));
    }
    BitwiseAND(y: Number): Number {
        return new Number(this.$go$private$jsnum$toInt32() & y.$go$private$jsnum$toInt32());
    }
    BitwiseNOT(): Number {
        return new Number(~this.$go$private$jsnum$toInt32());
    }
    BitwiseOR(y: Number): Number {
        return new Number(this.$go$private$jsnum$toInt32() | y.$go$private$jsnum$toInt32());
    }
    BitwiseXOR(y: Number): Number {
        return new Number(this.$go$private$jsnum$toInt32() ^ y.$go$private$jsnum$toInt32());
    }
    Exponentiate(exponent: Number): Number {
        __gotots_control_target_2: {
            if ((this.$value ===
                ((void Number,
                    1) as float64) || this.$value ===
                ((void Number,
                    -1) as float64)) && exponent.IsInf()) {
                return NaN();
            }
            else if (this.$value ===
                ((void Number,
                    1) as float64) && exponent.IsNaN()) {
                return NaN();
            }
        }
        let b = this.$value;
        let e = exponent.$value;
        if (b >= MinInt64$float64__from_math__package_1 && b <= MaxInt64$float64__from_math__package_1 && b === math__from_gostdlib.Trunc(b) && e >= 0 && e <= MaxInt64$float64__from_math__package_1 && e === math__from_gostdlib.Trunc(e) && !math__from_gostdlib.IsInf(e, BigInt.asIntN(64, goNumberToBigInt(0)))) {
            let magnitude = e * math__from_gostdlib.Log2(math__from_gostdlib.Abs(b));
            if (magnitude > 53 && magnitude <= math__from_gostdlib.Log2(MaxFloat64$float64__from_math__package_1)) {
                const __gotots_receiver_12 = tsonicTypeScriptRuntime.location<big__from_gostdlib.Int>(named_math_big.MathBigIntOperations.$zero());
                const __gotots_receiver_13 = __gotots_receiver_12 === void 0 ? void 0 :
                    (__gotots_receiver_12 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value;
                const __gotots_conversion_3 = big__from_gostdlib.NewInt(BigInt.asIntN(64, goNumberToBigInt(b)));
                const __gotots_argument_0 = __gotots_conversion_3 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<big__from_gostdlib.Int>(__gotots_conversion_3, (): big__from_gostdlib.Int => {
                        return __gotots_conversion_3;
                    }, ($go$providerPointerValue: big__from_gostdlib.Int): void => {
                        named_math_big.MathBigIntOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
                    });
                const __gotots_conversion_4 = big__from_gostdlib.NewInt(BigInt.asIntN(64, goNumberToBigInt(e)));
                const __gotots_argument_1 = __gotots_conversion_4 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<big__from_gostdlib.Int>(__gotots_conversion_4, (): big__from_gostdlib.Int => {
                        return __gotots_conversion_4;
                    }, ($go$providerPointerValue: big__from_gostdlib.Int): void => {
                        named_math_big.MathBigIntOperations.$assign(__gotots_conversion_4, $go$providerPointerValue);
                    });
                const __gotots_argument_2 = void 0;
                const __gotots_conversion_5 = __gotots_argument_0;
                const __gotots_conversion_6 = __gotots_argument_1;
                const __gotots_conversion_7 = __gotots_argument_2;
                const __gotots_conversion_8 = big__from_gostdlib.Int.Exp(__gotots_receiver_13, __gotots_conversion_5 === undefined ? undefined :
                    (__gotots_conversion_5 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value, __gotots_conversion_6 === undefined ? undefined :
                    (__gotots_conversion_6 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value, __gotots_conversion_7 === undefined ? undefined :
                    (__gotots_conversion_7 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value);
                let ri: tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int> | undefined = __gotots_conversion_8 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<big__from_gostdlib.Int>(__gotots_conversion_8, (): big__from_gostdlib.Int => {
                        return __gotots_conversion_8;
                    }, ($go$providerPointerValue: big__from_gostdlib.Int): void => {
                        named_math_big.MathBigIntOperations.$assign(__gotots_conversion_8, $go$providerPointerValue);
                    });
                const __gotots_receiver_14 = tsonicTypeScriptRuntime.location<big__from_gostdlib.Float>(named_math_big.MathBigFloatOperations.$zero());
                const __gotots_conversion_9 = big__from_gostdlib.Float.SetPrec(__gotots_receiver_14 === void 0 ? void 0 :
                    (__gotots_receiver_14 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Float>).value, BigInt.asUintN(64, goNumberToBigInt(256)));
                const __gotots_receiver_15 = __gotots_conversion_9 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<big__from_gostdlib.Float>(__gotots_conversion_9, (): big__from_gostdlib.Float => {
                        return __gotots_conversion_9;
                    }, ($go$providerPointerValue: big__from_gostdlib.Float): void => {
                        named_math_big.MathBigFloatOperations.$assign(__gotots_conversion_9, $go$providerPointerValue);
                    });
                const __gotots_conversion_10 = ri;
                const __gotots_conversion_11 = big__from_gostdlib.Float.SetInt(__gotots_receiver_15 === void 0 ? void 0 :
                    (__gotots_receiver_15 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Float>).value, __gotots_conversion_10 === undefined ? undefined :
                    (__gotots_conversion_10 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value);
                const __gotots_receiver_16 = __gotots_conversion_11 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<big__from_gostdlib.Float>(__gotots_conversion_11, (): big__from_gostdlib.Float => {
                        return __gotots_conversion_11;
                    }, ($go$providerPointerValue: big__from_gostdlib.Float): void => {
                        named_math_big.MathBigFloatOperations.$assign(__gotots_conversion_11, $go$providerPointerValue);
                    });
                const __gotots_results_2 = big__from_gostdlib.Float.Float64(__gotots_receiver_16 === void 0 ? void 0 :
                    (__gotots_receiver_16 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Float>).value);
                let result = __gotots_results_2[0];
                return new Number(result);
            }
        }
        return new Number(math__from_gostdlib.Pow(b, e));
    }
    IsInf(): bool {
        return math__from_gostdlib.IsInf(this.$value, BigInt.asIntN(64, goNumberToBigInt(0)));
    }
    IsNaN(): bool {
        return math__from_gostdlib.IsNaN(this.$value);
    }
    LeftShift(y: Number): Number {
        return new Number(y.$go$private$jsnum$toShiftCount() < 0 ? GoPanic.raiseRuntime("negative shift amount") : y.$go$private$jsnum$toShiftCount() >= 32 ? 0 : (this.$go$private$jsnum$toInt32() | 0) << y.$go$private$jsnum$toShiftCount() | 0);
    }
    Remainder(d: Number): Number {
        __gotots_control_target_1: {
            if (this.IsNaN() || d.IsNaN()) {
                return NaN();
            }
            else if (this.IsInf()) {
                return NaN();
            }
            else if (d.IsInf()) {
                return this;
            }
            else if (d.$value ===
                ((void Number,
                    0) as float64)) {
                return NaN();
            }
            else if (this.$value ===
                ((void Number,
                    0) as float64)) {
                return this;
            }
        }
        return new Number(math__from_gostdlib.Mod(this.$value, d.$value));
    }
    SignedRightShift(y: Number): Number {
        return new Number(y.$go$private$jsnum$toShiftCount() < 0 ? GoPanic.raiseRuntime("negative shift amount") : y.$go$private$jsnum$toShiftCount() >= 32 ? (this.$go$private$jsnum$toInt32() | 0) < 0 ? -1 : 0 : (this.$go$private$jsnum$toInt32() | 0) >> y.$go$private$jsnum$toShiftCount() | 0);
    }
    String(): gostring {
        __gotots_control_target_0: {
            if (this.IsNaN()) {
                return "NaN";
            }
            else if (this.IsInf()) {
                if (this.$value < 0) {
                    return "-Infinity";
                }
                return "Infinity";
            }
        }
        if (MinSafeInteger$constant().$value <= this.$value && this.$value <= MaxSafeInteger$constant().$value) {
            {
                let i = BigInt.asIntN(64, goNumberToBigInt(this.$value));
                if (globalThis.Number(i) === this.$value) {
                    return strconv__from_gostdlib.FormatInt(i, BigInt.asIntN(64, goNumberToBigInt(10)));
                }
            }
        }
        const __gotots_results_0 = Marshal__from_json__package_1(new GoInterfaceAdapter(this.$value), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
        let b = __gotots_results_0[0];
        const __gotots_conversion_0 = b;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    }
    UnsignedRightShift(y: Number): Number {
        return new Number(y.$go$private$jsnum$toShiftCount() < 0 ? GoPanic.raiseRuntime("negative shift amount") : y.$go$private$jsnum$toShiftCount() >= 32 ? 0 : this.$go$private$jsnum$toUint32() >>> 0 >>> y.$go$private$jsnum$toShiftCount() >>> 0);
    }
    $go$private$jsnum$toInt32(): int32 {
        let x = this.$value;
        {
            let smi = Math.trunc(x) | 0;
            if (smi === x) {
                return smi;
            }
        }
        if (isNonFinite(x)) {
            return 0;
        }
        x = math__from_gostdlib.Trunc(x);
        x = math__from_gostdlib.Mod(x, 4294967296);
        return globalThis.Number(BigInt.asIntN(32, BigInt.asIntN(64, goNumberToBigInt(x))));
    }
    $go$private$jsnum$toShiftCount(): uint32 {
        return (this.$go$private$jsnum$toUint32() & 31) >>> 0;
    }
    $go$private$jsnum$toUint32(): uint32 {
        return this.$go$private$jsnum$toInt32() >>> 0;
    }
}
export function MaxSafeInteger$constant(): Number {
    return new Number(9007199254740991);
}
export function MinSafeInteger$constant(): Number {
    return new Number(-9007199254740991);
}
export function NaN(): Number {
    return new Number(math__from_gostdlib.NaN());
}
export function Inf(sign: int): Number {
    return new Number(math__from_gostdlib.Inf(BigInt.asIntN(64, goNumberToBigInt(sign))));
}
export function isNonFinite(x: float64): bool {
    const mask$uint64: uint64 = 9218868437227405312n;
    return goUint64(math__from_gostdlib.Float64bits(x) & mask$uint64) === mask$uint64;
}
