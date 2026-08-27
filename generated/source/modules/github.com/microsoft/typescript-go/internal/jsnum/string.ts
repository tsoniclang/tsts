import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, float64, gostring, int, int32, int64 } from "@gotots/runtime/scalars.js";
import { IsDigit as IsDigit__from_stringutil, IsHexDigit as IsHexDigit__from_stringutil, IsOctalDigit as IsOctalDigit__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { Inf, NaN, Number } from "./jsnum.js";
import * as named_math_big from "@gotots/gostdlib/internal/facets/named-math-big.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_unicode from "@gotots/gostdlib/internal/facets/named-unicode.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as big__from_gostdlib from "@gotots/gostdlib/math/big.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goStringDecodeRune, goStringSlice } from "@gotots/runtime/string.js";
export function FromString(s: gostring): Number {
    s = strings__from_gostdlib.TrimFunc(s, isStrWhiteSpace);
    switch (s) {
        case "": {
            return new Number(0);
            break;
        }
        case "Infinity":
        case "+Infinity": {
            return Inf(1);
            break;
        }
        case "-Infinity": {
            return Inf(-1);
            break;
        }
    }
    const __gotots_range_0 = s;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_0, __gotots_range_index_0);
        const __gotots_range_value_0 = __gotots_range_decode_0[0];
        let r = __gotots_range_value_0;
        __gotots_range_index_0 += __gotots_range_decode_0[1];
        if (!isNumberRune(r)) {
            return NaN();
        }
    }
    {
        const __gotots_results_0 = tryParseInt(s);
        let n = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            return n;
        }
    }
    const __gotots_results_2 = strings__from_gostdlib.CutPrefix(s, "-");
    s = __gotots_results_2[0];
    let negative = __gotots_results_2[1];
    if (!negative) {
        const __gotots_results_4 = strings__from_gostdlib.CutPrefix(s, "+");
        s = __gotots_results_4[0];
    }
    {
        const __gotots_results_5 = utf8__from_gostdlib.DecodeRuneInString(s);
        const __gotots_results_6 = [__gotots_results_5[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_5[1]))] satisfies [
            int32,
            int
        ];
        let first = __gotots_results_6[0];
        if (!IsDigit__from_stringutil(first) && first !== 46) {
            return NaN();
        }
    }
    let f = parseFloatString(s);
    if (math__from_gostdlib.IsNaN(f)) {
        return NaN();
    }
    let sign = 1;
    if (negative) {
        sign = -1;
    }
    return new Number(math__from_gostdlib.Copysign(f, sign));
}
export function isStrWhiteSpace(r: int32): bool {
    switch (r) {
        case 10:
        case 13:
        case 8232:
        case 8233: {
            return true;
            break;
        }
        case 9:
        case 11:
        case 12:
        case 65279: {
            return true;
            break;
        }
    }
    const __gotots_conversion_0 = unicode__from_gostdlib.state.Zs;
    const __gotots_argument_0 = __gotots_conversion_0 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<unicode__from_gostdlib.RangeTable>(__gotots_conversion_0, (): unicode__from_gostdlib.RangeTable => {
            return __gotots_conversion_0;
        }, ($go$providerPointerValue: unicode__from_gostdlib.RangeTable): void => {
            named_unicode.UnicodeRangeTableOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
        });
    const __gotots_argument_1 = r;
    const __gotots_conversion_1 = __gotots_argument_0;
    return unicode__from_gostdlib.Is(__gotots_conversion_1 === undefined ? undefined :
        (__gotots_conversion_1 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value, __gotots_argument_1);
}
export function tryParseInt(s: gostring): [
    Number,
    bool
] {
    let i = 0n;
    let err: GoInterface | undefined = void 0;
    let hasIntResult = false;
    if (s.length > 2) {
        const __gotots_assign_0 = goStringSlice(s, 0, 2);
        const __gotots_assign_1 = goStringSlice(s, 2);
        let prefix = __gotots_assign_0;
        let rest = __gotots_assign_1;
        switch (prefix) {
            case "0b":
            case "0B": {
                if (!isAllBinaryDigits(rest)) {
                    return [NaN(), true];
                }
                const __gotots_results_7 = strconv__from_gostdlib.ParseInt(rest, BigInt.asIntN(64, goNumberToBigInt(2)), BigInt.asIntN(64, goNumberToBigInt(64)));
                const __gotots_results_8 = [__gotots_results_7[0], GoProviderInterfaceBridge.$from(__gotots_results_7[1])] satisfies [
                    int64,
                    GoInterface | undefined
                ];
                i = __gotots_results_8[0];
                err = __gotots_results_8[1];
                hasIntResult = true;
                break;
            }
            case "0o":
            case "0O": {
                if (!isAllOctalDigits(rest)) {
                    return [NaN(), true];
                }
                const __gotots_results_9 = strconv__from_gostdlib.ParseInt(rest, BigInt.asIntN(64, goNumberToBigInt(8)), BigInt.asIntN(64, goNumberToBigInt(64)));
                const __gotots_results_10 = [__gotots_results_9[0], GoProviderInterfaceBridge.$from(__gotots_results_9[1])] satisfies [
                    int64,
                    GoInterface | undefined
                ];
                i = __gotots_results_10[0];
                err = __gotots_results_10[1];
                hasIntResult = true;
                break;
            }
            case "0x":
            case "0X": {
                if (!isAllHexDigits(rest)) {
                    return [NaN(), true];
                }
                const __gotots_results_11 = strconv__from_gostdlib.ParseInt(rest, BigInt.asIntN(64, goNumberToBigInt(16)), BigInt.asIntN(64, goNumberToBigInt(64)));
                const __gotots_results_12 = [__gotots_results_11[0], GoProviderInterfaceBridge.$from(__gotots_results_11[1])] satisfies [
                    int64,
                    GoInterface | undefined
                ];
                i = __gotots_results_12[0];
                err = __gotots_results_12[1];
                hasIntResult = true;
                break;
            }
        }
    }
    if (!hasIntResult) {
        s = trimLeadingZeros(s);
        if (!isAllDigits(s)) {
            return [new Number(0), false];
        }
        const __gotots_results_13 = strconv__from_gostdlib.ParseInt(s, BigInt.asIntN(64, goNumberToBigInt(10)), BigInt.asIntN(64, goNumberToBigInt(64)));
        const __gotots_results_14 = [__gotots_results_13[0], GoProviderInterfaceBridge.$from(__gotots_results_13[1])] satisfies [
            int64,
            GoInterface | undefined
        ];
        i = __gotots_results_14[0];
        err = __gotots_results_14[1];
        hasIntResult = true;
    }
    if (hasIntResult && err === undefined) {
        return [new Number(globalThis.Number(i)), true];
    }
    const __gotots_receiver_0 = tsonicTypeScriptRuntime.location<big__from_gostdlib.Int>(named_math_big.MathBigIntOperations.$zero());
    const __gotots_results_15 = big__from_gostdlib.Int.SetString(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value, s, BigInt.asIntN(64, goNumberToBigInt(0)));
    const __gotots_conversion_2 = __gotots_results_15[0];
    const __gotots_results_16 = [__gotots_conversion_2 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<big__from_gostdlib.Int>(__gotots_conversion_2, (): big__from_gostdlib.Int => {
                return __gotots_conversion_2;
            }, ($go$providerPointerValue: big__from_gostdlib.Int): void => {
                named_math_big.MathBigIntOperations.$assign(__gotots_conversion_2, $go$providerPointerValue);
            }), __gotots_results_15[1]] satisfies [
        tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int> | undefined,
        bool
    ];
    let bi: tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int> | undefined = __gotots_results_16[0];
    let ok = __gotots_results_16[1];
    if (!ok) {
        return [NaN(), true];
    }
    const __gotots_receiver_1 = bi;
    const __gotots_results_18 = big__from_gostdlib.Int.Float64(__gotots_receiver_1 === void 0 ? void 0 :
        (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<big__from_gostdlib.Int>).value);
    let f = __gotots_results_18[0];
    return [new Number(f), true];
}
export function parseFloatString(s: gostring): float64 {
    let hasDot = false, hasExp = false;
    let a = "", b = "", c = "", rest = "";
    const __gotots_results_20 = strings__from_gostdlib.Cut(s, ".");
    a = __gotots_results_20[0];
    rest = __gotots_results_20[1];
    hasDot = __gotots_results_20[2];
    if (hasDot) {
        const __gotots_results_21 = cutAny(rest, "eE");
        b = __gotots_results_21[0];
        c = __gotots_results_21[1];
        hasExp = __gotots_results_21[2];
    }
    else {
        const __gotots_results_22 = cutAny(s, "eE");
        a = __gotots_results_22[0];
        c = __gotots_results_22[1];
        hasExp = __gotots_results_22[2];
    }
    let sb = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.Grow(sb, BigInt.asIntN(64, goNumberToBigInt(a.length + b.length + c.length + 3)));
    if (a === "") {
        if (hasDot && b === "") {
            return math__from_gostdlib.NaN();
        }
        if (hasExp && c === "") {
            return math__from_gostdlib.NaN();
        }
        strings__from_gostdlib.Builder.WriteString(sb, "0");
    }
    else {
        a = trimLeadingZeros(a);
        if (!isAllDigits(a)) {
            return math__from_gostdlib.NaN();
        }
        strings__from_gostdlib.Builder.WriteString(sb, a);
    }
    if (hasDot) {
        strings__from_gostdlib.Builder.WriteString(sb, ".");
        if (b === "") {
            strings__from_gostdlib.Builder.WriteString(sb, "0");
        }
        else {
            b = trimTrailingZeros(b);
            if (!isAllDigits(b)) {
                return math__from_gostdlib.NaN();
            }
            strings__from_gostdlib.Builder.WriteString(sb, b);
        }
    }
    if (hasExp) {
        strings__from_gostdlib.Builder.WriteString(sb, "e");
        const __gotots_results_24 = strings__from_gostdlib.CutPrefix(c, "-");
        let c__shadow_1 = __gotots_results_24[0];
        let negative = __gotots_results_24[1];
        if (negative) {
            strings__from_gostdlib.Builder.WriteString(sb, "-");
        }
        else {
            const __gotots_results_26 = strings__from_gostdlib.CutPrefix(c__shadow_1, "+");
            c__shadow_1 = __gotots_results_26[0];
        }
        c__shadow_1 = trimLeadingZeros(c__shadow_1);
        if (!isAllDigits(c__shadow_1)) {
            return math__from_gostdlib.NaN();
        }
        strings__from_gostdlib.Builder.WriteString(sb, c__shadow_1);
    }
    return stringToFloat64(strings__from_gostdlib.Builder.String(sb));
}
export function cutAny(s: gostring, cutset: gostring): [
    gostring,
    gostring,
    bool
] {
    let before: gostring = "";
    let after: gostring = "";
    let found: bool = false;
    {
        let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexAny(s, cutset)));
        if (i >= 0) {
            before = goStringSlice(s, 0, i);
            let afterAndFound = goStringSlice(s, i);
            const __gotots_results_27 = utf8__from_gostdlib.DecodeRuneInString(afterAndFound);
            const __gotots_results_28 = [__gotots_results_27[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_27[1]))] satisfies [
                int32,
                int
            ];
            let size = __gotots_results_28[1];
            after = goStringSlice(afterAndFound, size);
            return [before, after, true];
        }
    }
    return [s, "", false];
}
export function trimLeadingZeros(s: gostring): gostring {
    if (strings__from_gostdlib.HasPrefix(s, "0")) {
        s = strings__from_gostdlib.TrimLeft(s, "0");
        if (s === "") {
            return "0";
        }
    }
    return s;
}
export function trimTrailingZeros(s: gostring): gostring {
    if (strings__from_gostdlib.HasSuffix(s, "0")) {
        s = strings__from_gostdlib.TrimRight(s, "0");
        if (s === "") {
            return "0";
        }
    }
    return s;
}
export function stringToFloat64(s: gostring): float64 {
    {
        const __gotots_results_29 = strconv__from_gostdlib.ParseFloat(s, BigInt.asIntN(64, goNumberToBigInt(64)));
        const __gotots_results_30 = [__gotots_results_29[0], GoProviderInterfaceBridge.$from(__gotots_results_29[1])] satisfies [
            float64,
            GoInterface | undefined
        ];
        let f = __gotots_results_30[0];
        let err: GoInterface | undefined = __gotots_results_30[1];
        if (err === undefined) {
            return f;
        }
        else {
            const __gotots_argument_2 = err;
            const __gotots_argument_3 = GoProviderInterfaceBridge.$from(strconv__from_gostdlib.state.ErrRange);
            if (provider_error.ErrorsIsDirect(__gotots_argument_2, __gotots_argument_3, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                return f;
            }
        }
    }
    return math__from_gostdlib.NaN();
}
export function isAllDigits(s: gostring): bool {
    const __gotots_range_4 = s;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length;) {
        const __gotots_range_decode_4 = goStringDecodeRune(__gotots_range_4, __gotots_range_index_4);
        const __gotots_range_value_4 = __gotots_range_decode_4[0];
        let r = __gotots_range_value_4;
        __gotots_range_index_4 += __gotots_range_decode_4[1];
        if (!IsDigit__from_stringutil(r)) {
            return false;
        }
    }
    return true;
}
export function isAllBinaryDigits(s: gostring): bool {
    const __gotots_range_1 = s;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length;) {
        const __gotots_range_decode_1 = goStringDecodeRune(__gotots_range_1, __gotots_range_index_1);
        const __gotots_range_value_1 = __gotots_range_decode_1[0];
        let r = __gotots_range_value_1;
        __gotots_range_index_1 += __gotots_range_decode_1[1];
        if (r !== 48 && r !== 49) {
            return false;
        }
    }
    return true;
}
export function isAllOctalDigits(s: gostring): bool {
    const __gotots_range_2 = s;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length;) {
        const __gotots_range_decode_2 = goStringDecodeRune(__gotots_range_2, __gotots_range_index_2);
        const __gotots_range_value_2 = __gotots_range_decode_2[0];
        let r = __gotots_range_value_2;
        __gotots_range_index_2 += __gotots_range_decode_2[1];
        if (!IsOctalDigit__from_stringutil(r)) {
            return false;
        }
    }
    return true;
}
export function isAllHexDigits(s: gostring): bool {
    const __gotots_range_3 = s;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length;) {
        const __gotots_range_decode_3 = goStringDecodeRune(__gotots_range_3, __gotots_range_index_3);
        const __gotots_range_value_3 = __gotots_range_decode_3[0];
        let r = __gotots_range_value_3;
        __gotots_range_index_3 += __gotots_range_decode_3[1];
        if (!IsHexDigit__from_stringutil(r)) {
            return false;
        }
    }
    return true;
}
export function isNumberRune(r: int32): bool {
    if (IsDigit__from_stringutil(r)) {
        return true;
    }
    if (97 <= r && r <= 102) {
        return true;
    }
    if (65 <= r && r <= 70) {
        return true;
    }
    switch (r) {
        case 46:
        case 45:
        case 43:
        case 120:
        case 88:
        case 111:
        case 79: {
            return true;
            break;
        }
    }
    return false;
}
