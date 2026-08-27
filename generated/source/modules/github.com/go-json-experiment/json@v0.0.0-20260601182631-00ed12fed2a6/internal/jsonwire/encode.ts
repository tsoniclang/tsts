import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Flags as Flags__from_jsonflags } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, float64, gostring, int, int32, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { AllowInvalidUTF8$constant as AllowInvalidUTF8$constant__from_jsonflags, AnyEscape$constant as AnyEscape$constant__from_jsonflags, CanonicalizeNumbers$constant as CanonicalizeNumbers$constant__from_jsonflags, CanonicalizeRawFloats$constant as CanonicalizeRawFloats$constant__from_jsonflags, CanonicalizeRawInts$constant as CanonicalizeRawInts$constant__from_jsonflags, EscapeForHTML$constant as EscapeForHTML$constant__from_jsonflags, EscapeForJS$constant as EscapeForJS$constant__from_jsonflags, PreserveRawStrings$constant as PreserveRawStrings$constant__from_jsonflags } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonflags/package.js";
import { $state } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/state.js";
import { RuneError$int32 as RuneError$int32__from_utf8, RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { Grow$SliceOf_byte$byte } from "../../../../../../support/generics/concretizations/slices/Grow.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { AppendUnquote, ConsumeNumber, ConsumeString, ValueFlags } from "./decode.js";
import { isInvalidUTF8 } from "./wire.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goFloat32 } from "@gotots/runtime/float.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export function NeedEscape(src: RuntimeSlice<uint8>): bool {
    let i = 0;
    for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(i)));) {
        {
            let c = src.get(i);
            if (c < RuneSelf$uint8__from_utf8) {
                if ($state.escapeASCII.get(c) > 0) {
                    return true;
                }
                i++;
            }
            else {
                const __gotots_results_2 = utf8__from_gostdlib.DecodeRune(src.slice(i, null, null));
                const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
                    int32,
                    int
                ];
                let r = __gotots_results_3[0];
                let rn = __gotots_results_3[1];
                if (r === RuneError$int32__from_utf8 || r === 8232 || r === 8233) {
                    return true;
                }
                i += rn;
            }
        }
    }
    return false;
}
export function AppendQuote(dst: RuntimeSlice<uint8>, src: RuntimeSlice<uint8>, flags: tsonicTypeScriptRuntime.Location<Flags__from_jsonflags> | undefined): [
    RuntimeSlice<uint8>,
    GoInterface | undefined
] {
    let i = 0, n = 0;
    let hasInvalidUTF8 = false;
    dst = Grow$SliceOf_byte$byte(dst, 1 + src.length + 1);
    dst = dst.append(0, [34]);
    for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)));) {
        {
            let c = src.get(n);
            if (c < RuneSelf$uint8__from_utf8) {
                n++;
                if ($state.escapeASCII.get(c) === 0) {
                    continue;
                }
                if (!(c === 60 || c === 62 || c === 38) || ((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(EscapeForHTML$constant__from_jsonflags())) {
                    dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n - 1, null), 0);
                    dst = appendEscapedASCII(dst, c);
                    i = n;
                }
            }
            else {
                const __gotots_results_0 = utf8__from_gostdlib.DecodeRune(src.slice(n, null, null));
                const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
                    int32,
                    int
                ];
                let r = __gotots_results_1[0];
                let rn = __gotots_results_1[1];
                n += rn;
                if (r !== RuneError$int32__from_utf8 && r !== 8232 && r !== 8233) {
                    continue;
                }
                __gotots_control_target_0: {
                    if (isInvalidUTF8(r, rn)) {
                        hasInvalidUTF8 = true;
                        dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n - rn, null), 0);
                        const __gotots_slice_build_0 = dst;
                        const __gotots_slice_build_1 = "\u00EF\u00BF\u00BD";
                        const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                        }
                        dst = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
                        i = n;
                    }
                    else if ((r === 8232 || r === 8233) && ((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(EscapeForJS$constant__from_jsonflags())) {
                        dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n - rn, null), 0);
                        dst = appendEscapedUnicode(dst, r);
                        i = n;
                    }
                }
            }
        }
    }
    dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n, null), 0);
    dst = dst.append(0, [34]);
    if (hasInvalidUTF8 && !((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(AllowInvalidUTF8$constant__from_jsonflags())) {
        return [dst, $state.ErrInvalidUTF8];
    }
    return [dst, void 0];
}
export function appendEscapedASCII(dst: RuntimeSlice<uint8>, c: uint8): RuntimeSlice<uint8> {
    switch (c) {
        case 34:
        case 92: {
            dst = dst.append(0, [92, c]);
            break;
        }
        case 8: {
            const __gotots_slice_build_4 = dst;
            const __gotots_slice_build_5 = "\\b";
            const __gotots_slice_build_6 = goSliceAllocate<uint8>(__gotots_slice_build_5.length, null);
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_5.length; __gotots_slice_build_7++) {
                __gotots_slice_build_6.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
            }
            dst = goSliceAppendSlice<uint8>(__gotots_slice_build_4, __gotots_slice_build_6, 0);
            break;
        }
        case 12: {
            const __gotots_slice_build_8 = dst;
            const __gotots_slice_build_9 = "\\f";
            const __gotots_slice_build_10 = goSliceAllocate<uint8>(__gotots_slice_build_9.length, null);
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_9.length; __gotots_slice_build_11++) {
                __gotots_slice_build_10.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
            }
            dst = goSliceAppendSlice<uint8>(__gotots_slice_build_8, __gotots_slice_build_10, 0);
            break;
        }
        case 10: {
            const __gotots_slice_build_12 = dst;
            const __gotots_slice_build_13 = "\\n";
            const __gotots_slice_build_14 = goSliceAllocate<uint8>(__gotots_slice_build_13.length, null);
            for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_13.length; __gotots_slice_build_15++) {
                __gotots_slice_build_14.set(__gotots_slice_build_15, __gotots_slice_build_13.charCodeAt(__gotots_slice_build_15));
            }
            dst = goSliceAppendSlice<uint8>(__gotots_slice_build_12, __gotots_slice_build_14, 0);
            break;
        }
        case 13: {
            const __gotots_slice_build_16 = dst;
            const __gotots_slice_build_17 = "\\r";
            const __gotots_slice_build_18 = goSliceAllocate<uint8>(__gotots_slice_build_17.length, null);
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_17.length; __gotots_slice_build_19++) {
                __gotots_slice_build_18.set(__gotots_slice_build_19, __gotots_slice_build_17.charCodeAt(__gotots_slice_build_19));
            }
            dst = goSliceAppendSlice<uint8>(__gotots_slice_build_16, __gotots_slice_build_18, 0);
            break;
        }
        case 9: {
            const __gotots_slice_build_20 = dst;
            const __gotots_slice_build_21 = "\\t";
            const __gotots_slice_build_22 = goSliceAllocate<uint8>(__gotots_slice_build_21.length, null);
            for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_21.length; __gotots_slice_build_23++) {
                __gotots_slice_build_22.set(__gotots_slice_build_23, __gotots_slice_build_21.charCodeAt(__gotots_slice_build_23));
            }
            dst = goSliceAppendSlice<uint8>(__gotots_slice_build_20, __gotots_slice_build_22, 0);
            break;
        }
        default: {
            dst = appendEscapedUTF16(dst, c);
            break;
        }
    }
    return dst;
}
export function appendEscapedUnicode(dst: RuntimeSlice<uint8>, r: int32): RuntimeSlice<uint8> {
    {
        const __gotots_results_13 = utf16__from_gostdlib.EncodeRune(r);
        let r1 = __gotots_results_13[0];
        let r2 = __gotots_results_13[1];
        if (r1 !== 65533 && r2 !== 65533) {
            dst = appendEscapedUTF16(dst, r1 & 65535);
            dst = appendEscapedUTF16(dst, r2 & 65535);
        }
        else {
            dst = appendEscapedUTF16(dst, r & 65535);
        }
    }
    return dst;
}
export function appendEscapedUTF16(dst: RuntimeSlice<uint8>, x: uint16): RuntimeSlice<uint8> {
    const hex$string: gostring = "0123456789abcdef";
    return dst.append(0, [92, 117, goStringIndex(hex$string, (x >> 12) & 15), goStringIndex(hex$string, (x >> 8) & 15), goStringIndex(hex$string, (x >> 4) & 15), goStringIndex(hex$string, (x >> 0) & 15)]);
}
export function ReformatString(dst: RuntimeSlice<uint8>, src: RuntimeSlice<uint8>, flags: tsonicTypeScriptRuntime.Location<Flags__from_jsonflags> | undefined): [
    RuntimeSlice<uint8>,
    int,
    GoInterface | undefined
] {
    let valFlags = new ValueFlags(0);
    const valFlags$location = tsonicTypeScriptRuntime.boundLocation({}, () => valFlags, valFlags$next => valFlags = valFlags$next);
    const __gotots_results_4 = ConsumeString(valFlags$location, src, !((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(AllowInvalidUTF8$constant__from_jsonflags()));
    let n = __gotots_results_4[0];
    let err: GoInterface | undefined = __gotots_results_4[1];
    if (!(err === undefined)) {
        return [dst, n, err];
    }
    if (!((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(AnyEscape$constant__from_jsonflags()) && (valFlags.IsCanonical() || ((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(PreserveRawStrings$constant__from_jsonflags()))) {
        dst = goSliceAppendSlice<uint8>(dst, src.slice(0, n, null), 0);
        return [dst, n, void 0];
    }
    if (((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(PreserveRawStrings$constant__from_jsonflags())) {
        let i = 0, lastAppendIndex = 0;
        for (; i < n;) {
            {
                let c = src.get(i);
                if (c < RuneSelf$uint8__from_utf8) {
                    if ((c === 60 || c === 62 || c === 38) && ((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(EscapeForHTML$constant__from_jsonflags())) {
                        dst = goSliceAppendSlice<uint8>(dst, src.slice(lastAppendIndex, i, null), 0);
                        dst = appendEscapedASCII(dst, c);
                        lastAppendIndex = i + 1;
                    }
                    i++;
                }
                else {
                    const __gotots_results_5 = utf8__from_gostdlib.DecodeRune(src.slice(i, null, null));
                    const __gotots_results_6 = [__gotots_results_5[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_5[1]))] satisfies [
                        int32,
                        int
                    ];
                    let r = __gotots_results_6[0];
                    let rn = __gotots_results_6[1];
                    if ((r === 8232 || r === 8233) && ((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(EscapeForJS$constant__from_jsonflags())) {
                        dst = goSliceAppendSlice<uint8>(dst, src.slice(lastAppendIndex, i, null), 0);
                        dst = appendEscapedUnicode(dst, r);
                        lastAppendIndex = i + rn;
                    }
                    i += rn;
                }
            }
        }
        return [goSliceAppendSlice<uint8>(dst, src.slice(lastAppendIndex, n, null), 0), n, void 0];
    }
    const __gotots_results_7 = AppendUnquote(RuntimeSlice.nil<uint8>(), src.slice(0, n, null));
    let b = __gotots_results_7[0];
    const __gotots_results_8 = AppendQuote(dst, b, flags);
    dst = __gotots_results_8[0];
    return [dst, n, void 0];
}
export function AppendFloat(dst: RuntimeSlice<uint8>, src: float64, bits: int): RuntimeSlice<uint8> {
    if (bits === 32) {
        src = goFloat32(src);
    }
    let abs = math__from_gostdlib.Abs(src);
    let fmt = 102;
    if (abs !== 0) {
        if (bits === 64 && (abs < 0.000001 || abs >= 1e+21) || bits === 32 && (goFloat32(abs) < 9.999999974752427e-7 || goFloat32(abs) >= 1.0000000200408773e+21)) {
            fmt = 101;
        }
    }
    dst = strconv__from_gostdlib.AppendFloat(dst, src, fmt, BigInt.asIntN(64, goNumberToBigInt(-1)), BigInt.asIntN(64, goNumberToBigInt(bits)));
    if (fmt === 101) {
        let n = dst.length;
        if (n >= 4 && dst.get(n - 4) === 101 && dst.get(n - 3) === 45 && dst.get(n - 2) === 48) {
            dst.set(n - 2, dst.get(n - 1));
            dst = dst.slice(0, n - 1, null);
        }
    }
    return dst;
}
export function ReformatNumber(dst: RuntimeSlice<uint8>, src: RuntimeSlice<uint8>, flags: tsonicTypeScriptRuntime.Location<Flags__from_jsonflags> | undefined): [
    RuntimeSlice<uint8>,
    int,
    GoInterface | undefined
] {
    const __gotots_results_9 = ConsumeNumber(src);
    let n = __gotots_results_9[0];
    let err: GoInterface | undefined = __gotots_results_9[1];
    if (!(err === undefined)) {
        return [dst, n, err];
    }
    if (!((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(CanonicalizeNumbers$constant__from_jsonflags())) {
        dst = goSliceAppendSlice<uint8>(dst, src.slice(0, n, null), 0);
        return [dst, n, void 0];
    }
    let isFloat = false;
    const __gotots_range_0 = src.slice(0, n, null);
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let c = __gotots_range_value_0;
        if (c === 46 || c === 101 || c === 69) {
            isFloat = true;
            break;
        }
    }
    {
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                const __gotots_conversion_0 = src.slice(0, n, null);
                let __gotots_conversion_1 = "";
                for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                    __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                }
                const __gotots_binary_operand_0 = __gotots_conversion_1;
                const __gotots_binary_operand_1 = "-0";
                __gotots_switch_match_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = isFloat;
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            __gotots_switch_selection_0 = 2;
        }
        __gotots_control_target_1: switch (__gotots_switch_selection_0) {
            case 0: {
                break;
                break;
            }
            case 1: {
                if (!((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(CanonicalizeRawFloats$constant__from_jsonflags())) {
                    dst = goSliceAppendSlice<uint8>(dst, src.slice(0, n, null), 0);
                    return [dst, n, void 0];
                }
                break;
            }
            case 2: {
                const maxExactIntegerDigits$int: int = 16;
                if (!((flags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Flags__from_jsonflags>).value.Get(CanonicalizeRawInts$constant__from_jsonflags()) || n < maxExactIntegerDigits$int) {
                    dst = goSliceAppendSlice<uint8>(dst, src.slice(0, n, null), 0);
                    return [dst, n, void 0];
                }
                break;
            }
        }
    }
    const __gotots_conversion_3 = src.slice(0, n, null);
    let __gotots_conversion_4 = "";
    for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
        __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
    }
    const __gotots_argument_0 = __gotots_conversion_4;
    const __gotots_argument_1 = 64;
    const __gotots_results_10 = strconv__from_gostdlib.ParseFloat(__gotots_argument_0, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_1)));
    const __gotots_results_11 = [__gotots_results_10[0], GoProviderInterfaceBridge.$from(__gotots_results_10[1])] satisfies [
        float64,
        GoInterface | undefined
    ];
    let fv = __gotots_results_11[0];
    __gotots_control_target_2: {
        if (fv === 0) {
            fv = 0;
        }
        else if (math__from_gostdlib.IsInf(fv, BigInt.asIntN(64, goNumberToBigInt(1)))) {
            fv = 1.7976931348623157e+308;
        }
        else if (math__from_gostdlib.IsInf(fv, BigInt.asIntN(64, goNumberToBigInt(-1)))) {
            fv = -1.7976931348623157e+308;
        }
    }
    return [AppendFloat(dst, fv, 64), n, void 0];
}
