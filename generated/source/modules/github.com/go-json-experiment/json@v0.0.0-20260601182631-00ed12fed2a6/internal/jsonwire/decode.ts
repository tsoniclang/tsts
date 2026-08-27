import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int32, uint, uint16, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonwire/state.js";
import { MaxUint64$uint64 as MaxUint64$uint64__from_math__package_1 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { RuneError$int32 as RuneError$int32__from_utf8, RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { NewInvalidCharacterError$SliceOf_byte } from "../../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/internal/jsonwire/NewInvalidCharacterError.js";
import { NewInvalidEscapeSequenceError$SliceOf_byte } from "../../../../../../support/generics/concretizations/github_u2e_com/go_u2d_json_u2d_experiment/json/internal/jsonwire/NewInvalidEscapeSequenceError.js";
import { Grow$SliceOf_byte$byte } from "../../../../../../support/generics/concretizations/slices/Grow.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { QuoteRune } from "./wire.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export class ValueFlags {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint) {
    }
    declare private readonly then?: never;
    static Join(f: tsonicTypeScriptRuntime.Location<ValueFlags> | undefined, f2: ValueFlags): void {
        const __gotots_store_0 = (f ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        void (__gotots_store_0.value =
            new ValueFlags(__gotots_store_0.value.$value | f2.$value));
    }
    IsCanonical(): bool {
        return ((void ValueFlags,
            this.$value & stringNonCanonical$constant().$value) as uint)
            ===
                ((void ValueFlags,
                    0) as uint);
    }
    IsVerbatim(): bool {
        return ((void ValueFlags,
            this.$value & stringNonVerbatim$constant().$value) as uint)
            ===
                ((void ValueFlags,
                    0) as uint);
    }
}
export function stringNonVerbatim$constant(): ValueFlags {
    return new ValueFlags(1);
}
export function stringNonCanonical$constant(): ValueFlags {
    return new ValueFlags(2);
}
export function ConsumeWhitespace(b: RuntimeSlice<uint8>): int {
    let n: int = 0;
    for (; b.length > n && (b.get(n) === 32 || b.get(n) === 9 || b.get(n) === 13 || b.get(n) === 10);) {
        n++;
    }
    return n;
}
export function ConsumeNull(b: RuntimeSlice<uint8>): int {
    const literal$string: gostring = "null";
    let __gotots_logical_result_3 = b.length >= 4;
    if (__gotots_logical_result_3) {
        const __gotots_conversion_3 = b.slice(0, 4, null);
        let __gotots_conversion_4 = "";
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
        }
        const __gotots_binary_operand_2 = __gotots_conversion_4;
        const __gotots_binary_operand_3 = literal$string;
        __gotots_logical_result_3 = __gotots_binary_operand_2 === __gotots_binary_operand_3;
    }
    if (__gotots_logical_result_3) {
        return 4;
    }
    return 0;
}
export function ConsumeFalse(b: RuntimeSlice<uint8>): int {
    const literal$string: gostring = "false";
    let __gotots_logical_result_4 = b.length >= 5;
    if (__gotots_logical_result_4) {
        const __gotots_conversion_6 = b.slice(0, 5, null);
        let __gotots_conversion_7 = "";
        for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
            __gotots_conversion_7 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_6.get(__gotots_conversion_8)));
        }
        const __gotots_binary_operand_4 = __gotots_conversion_7;
        const __gotots_binary_operand_5 = literal$string;
        __gotots_logical_result_4 = __gotots_binary_operand_4 === __gotots_binary_operand_5;
    }
    if (__gotots_logical_result_4) {
        return 5;
    }
    return 0;
}
export function ConsumeTrue(b: RuntimeSlice<uint8>): int {
    const literal$string: gostring = "true";
    let __gotots_logical_result_5 = b.length >= 4;
    if (__gotots_logical_result_5) {
        const __gotots_conversion_9 = b.slice(0, 4, null);
        let __gotots_conversion_10 = "";
        for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
            __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
        }
        const __gotots_binary_operand_6 = __gotots_conversion_10;
        const __gotots_binary_operand_7 = literal$string;
        __gotots_logical_result_5 = __gotots_binary_operand_6 === __gotots_binary_operand_7;
    }
    if (__gotots_logical_result_5) {
        return 4;
    }
    return 0;
}
export function ConsumeLiteral(b: RuntimeSlice<uint8>, lit: gostring): [
    int,
    GoInterface | undefined
] {
    let n: int = 0;
    let err: GoInterface | undefined = void 0;
    for (let i = 0; i < b.length && i < lit.length; i++) {
        if (b.get(i) !== goStringIndex(lit, i)) {
            return [i, NewInvalidCharacterError$SliceOf_byte(b.slice(i, null, null), "in literal " + lit + " (expecting " + strconv__from_gostdlib.QuoteRune(goStringIndex(lit, i)) + ")")];
        }
    }
    if (b.length < lit.length) {
        return [b.length, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
    }
    return [lit.length, void 0];
}
export function ConsumeSimpleString(b: RuntimeSlice<uint8>): int {
    let n: int = 0;
    if (b.length > 0 && b.get(0) === 34) {
        n++;
        for (; b.length > n && b.get(n) < RuneSelf$uint8__from_utf8 && $state.escapeASCII.get(b.get(n)) === 0;) {
            n++;
        }
        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && b.get(n) === 34) {
            n++;
            return n;
        }
    }
    return 0;
}
export function ConsumeString(flags: tsonicTypeScriptRuntime.Location<ValueFlags> | undefined, b: RuntimeSlice<uint8>, validateUTF8: bool): [
    int,
    GoInterface | undefined
] {
    let n: int = 0;
    let err: GoInterface | undefined = void 0;
    return ConsumeStringResumable(flags, b, 0, validateUTF8);
}
export function ConsumeStringResumable(flags: tsonicTypeScriptRuntime.Location<ValueFlags> | undefined, b: RuntimeSlice<uint8>, resumeOffset: int, validateUTF8: bool): [
    int,
    GoInterface | undefined
] {
    let n: int = 0;
    let err: GoInterface | undefined = void 0;
    __gotots_control_target_8: {
        if (resumeOffset > 0) {
            n = resumeOffset;
        }
        else if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) === 0) {
            return [n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
        }
        else if (b.get(0) === 34) {
            n++;
        }
        else {
            return [n, NewInvalidCharacterError$SliceOf_byte(b.slice(n, null, null), "at start of string (expecting '\"')")];
        }
    }
    for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)));) {
        let noEscape: (($0: uint8) => bool) | undefined = (c: uint8): bool => {
            return c < RuneSelf$uint8__from_utf8 && 32 <= c && c !== 92 && c !== 34;
        };
        {
            for (;;) {
                let __gotots_logical_result_6 = globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)));
                if (__gotots_logical_result_6) {
                    const __gotots_callee_1 = noEscape;
                    const __gotots_argument_2 = b.get(n);
                    __gotots_logical_result_6 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                }
                if (!__gotots_logical_result_6) {
                    break;
                }
                {
                    n++;
                }
            }
        }
        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
            return [n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
        }
        if (b.get(n) === 34) {
            n++;
            return [n, void 0];
        }
        {
            const __gotots_results_6 = utf8__from_gostdlib.DecodeRune(b.slice(n, null, null));
            const __gotots_results_7 = [__gotots_results_6[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_6[1]))] satisfies [
                int32,
                int
            ];
            let r = __gotots_results_7[0];
            let rn = __gotots_results_7[1];
            __gotots_control_target_9: {
                if (rn > 1) {
                    n += rn;
                }
                else if (r === 92) {
                    ValueFlags.Join(flags, stringNonVerbatim$constant());
                    resumeOffset = n;
                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) < globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n + 2)))) {
                        return [resumeOffset, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                    }
                    {
                        let r__shadow_1 = b.get(n + 1);
                        switch (r__shadow_1) {
                            case 47: {
                                ValueFlags.Join(flags, stringNonCanonical$constant());
                                n += 2;
                                break;
                            }
                            case 34:
                            case 92:
                            case 98:
                            case 102:
                            case 110:
                            case 114:
                            case 116: {
                                n += 2;
                                break;
                            }
                            case 117: {
                                if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) < globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n + 6)))) {
                                    if (hasEscapedUTF16Prefix(b.slice(n, null, null), false)) {
                                        return [resumeOffset, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                                    }
                                    ValueFlags.Join(flags, stringNonCanonical$constant());
                                    return [n, NewInvalidEscapeSequenceError$SliceOf_byte(b.slice(n, null, null))];
                                }
                                const __gotots_results_8 = parseHexUint16(b.slice(n + 2, n + 6, null));
                                let v1 = __gotots_results_8[0];
                                let ok = __gotots_results_8[1];
                                if (!ok) {
                                    ValueFlags.Join(flags, stringNonCanonical$constant());
                                    return [n, NewInvalidEscapeSequenceError$SliceOf_byte(b.slice(n, n + 6, null))];
                                }
                                switch (v1) {
                                    case 8:
                                    case 12:
                                    case 10:
                                    case 13:
                                    case 9: {
                                        ValueFlags.Join(flags, stringNonCanonical$constant());
                                        break;
                                    }
                                    default: {
                                        if (v1 >= 32) {
                                            ValueFlags.Join(flags, stringNonCanonical$constant());
                                        }
                                        else {
                                            const __gotots_range_2 = b.slice(n + 2, n + 6, null);
                                            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                                                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                                                let c = __gotots_range_value_2;
                                                if (65 <= c && c <= 70) {
                                                    ValueFlags.Join(flags, stringNonCanonical$constant());
                                                }
                                            }
                                        }
                                        break;
                                    }
                                }
                                n += 6;
                                let r__shadow_2 = v1;
                                if (validateUTF8 && utf16__from_gostdlib.IsSurrogate(r__shadow_2)) {
                                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) < globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n + 6)))) {
                                        if (hasEscapedUTF16Prefix(b.slice(n, null, null), true)) {
                                            return [resumeOffset, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                                        }
                                        ValueFlags.Join(flags, stringNonCanonical$constant());
                                        return [n - 6, NewInvalidEscapeSequenceError$SliceOf_byte(b.slice(n - 6, null, null))];
                                    }
                                    else {
                                        const __gotots_results_9 = parseHexUint16(b.slice(n + 2, n + 6, null));
                                        let v2 = __gotots_results_9[0];
                                        let ok__shadow_1 = __gotots_results_9[1];
                                        if (b.get(n) !== 92 || b.get(n + 1) !== 117 || !ok__shadow_1) {
                                            ValueFlags.Join(flags, stringNonCanonical$constant());
                                            return [n - 6, NewInvalidEscapeSequenceError$SliceOf_byte(b.slice(n - 6, n + 6, null))];
                                        }
                                        else {
                                            r__shadow_2 = utf16__from_gostdlib.DecodeRune(v1, v2);
                                            if (r__shadow_2 === RuneError$int32__from_utf8) {
                                                ValueFlags.Join(flags, stringNonCanonical$constant());
                                                return [n - 6, NewInvalidEscapeSequenceError$SliceOf_byte(b.slice(n - 6, n + 6, null))];
                                            }
                                            else {
                                                n += 6;
                                            }
                                        }
                                    }
                                }
                                break;
                            }
                            default: {
                                ValueFlags.Join(flags, stringNonCanonical$constant());
                                return [n, NewInvalidEscapeSequenceError$SliceOf_byte(b.slice(n, n + 2, null))];
                                break;
                            }
                        }
                    }
                }
                else if (r === RuneError$int32__from_utf8) {
                    if (!utf8__from_gostdlib.FullRune(b.slice(n, null, null))) {
                        return [n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                    }
                    ValueFlags.Join(flags, new ValueFlags(3));
                    if (validateUTF8) {
                        return [n, $state.ErrInvalidUTF8];
                    }
                    n++;
                }
                else if (r < 32) {
                    ValueFlags.Join(flags, new ValueFlags(3));
                    return [n, NewInvalidCharacterError$SliceOf_byte(b.slice(n, null, null), "in string (expecting non-control character)")];
                }
                else {
                    const __gotots_argument_3 = new GoInterfaceAdapter("BUG: unhandled character " + QuoteRune(b.slice(n, null, null)));
                    GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
                }
            }
        }
    }
    return [n, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
}
export function AppendUnquote(dst: RuntimeSlice<uint8>, src: RuntimeSlice<uint8>): [
    RuntimeSlice<uint8>,
    GoInterface | undefined
] {
    let v: RuntimeSlice<uint8> = RuntimeSlice.nil<uint8>();
    let err: GoInterface | undefined = void 0;
    dst = Grow$SliceOf_byte$byte(dst, src.length);
    let i = 0, n = 0;
    __gotots_control_target_1: {
        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) === 0) {
            return [dst, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
        }
        else if (src.get(0) === 34) {
            const __gotots_assign_0 = 1;
            const __gotots_assign_1 = 1;
            i = __gotots_assign_0;
            n = __gotots_assign_1;
        }
        else {
            return [dst, NewInvalidCharacterError$SliceOf_byte(src, "at start of string (expecting '\"')")];
        }
    }
    for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)));) {
        let noEscape: (($0: uint8) => bool) | undefined = (c: uint8): bool => {
            return c < RuneSelf$uint8__from_utf8 && 32 <= c && c !== 92 && c !== 34;
        };
        {
            for (;;) {
                let __gotots_logical_result_2 = globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)));
                if (__gotots_logical_result_2) {
                    const __gotots_callee_0 = noEscape;
                    const __gotots_argument_0 = src.get(n);
                    __gotots_logical_result_2 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
                }
                if (!__gotots_logical_result_2) {
                    break;
                }
                {
                    n++;
                }
            }
        }
        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
            dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n, null), 0);
            return [dst, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
        }
        if (src.get(n) === 34) {
            dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n, null), 0);
            n++;
            if (n < src.length) {
                err = NewInvalidCharacterError$SliceOf_byte(src.slice(n, null, null), "after string value");
            }
            return [dst, err];
        }
        {
            const __gotots_results_2 = utf8__from_gostdlib.DecodeRune(src.slice(n, null, null));
            const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
                int32,
                int
            ];
            let r = __gotots_results_3[0];
            let rn = __gotots_results_3[1];
            __gotots_control_target_2: {
                if (rn > 1) {
                    n += rn;
                }
                else if (r === 92) {
                    dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n, null), 0);
                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) < globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n + 2)))) {
                        return [dst, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                    }
                    {
                        let r__shadow_1 = src.get(n + 1);
                        switch (r__shadow_1) {
                            case 34:
                            case 92:
                            case 47: {
                                dst = dst.append(0, [r__shadow_1]);
                                n += 2;
                                break;
                            }
                            case 98: {
                                dst = dst.append(0, [8]);
                                n += 2;
                                break;
                            }
                            case 102: {
                                dst = dst.append(0, [12]);
                                n += 2;
                                break;
                            }
                            case 110: {
                                dst = dst.append(0, [10]);
                                n += 2;
                                break;
                            }
                            case 114: {
                                dst = dst.append(0, [13]);
                                n += 2;
                                break;
                            }
                            case 116: {
                                dst = dst.append(0, [9]);
                                n += 2;
                                break;
                            }
                            case 117: {
                                if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) < globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n + 6)))) {
                                    if (hasEscapedUTF16Prefix(src.slice(n, null, null), false)) {
                                        return [dst, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                                    }
                                    return [dst, NewInvalidEscapeSequenceError$SliceOf_byte(src.slice(n, null, null))];
                                }
                                const __gotots_results_4 = parseHexUint16(src.slice(n + 2, n + 6, null));
                                let v1 = __gotots_results_4[0];
                                let ok = __gotots_results_4[1];
                                if (!ok) {
                                    return [dst, NewInvalidEscapeSequenceError$SliceOf_byte(src.slice(n, n + 6, null))];
                                }
                                n += 6;
                                let r__shadow_2 = v1;
                                if (utf16__from_gostdlib.IsSurrogate(r__shadow_2)) {
                                    r__shadow_2 = RuneError$int32__from_utf8;
                                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(src.length))) < globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n + 6)))) {
                                        if (hasEscapedUTF16Prefix(src.slice(n, null, null), true)) {
                                            return [utf8__from_gostdlib.AppendRune(dst, r__shadow_2), GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                                        }
                                        err = NewInvalidEscapeSequenceError$SliceOf_byte(src.slice(n - 6, null, null));
                                    }
                                    else {
                                        const __gotots_results_5 = parseHexUint16(src.slice(n + 2, n + 6, null));
                                        let v2 = __gotots_results_5[0];
                                        let ok__shadow_1 = __gotots_results_5[1];
                                        if (src.get(n) !== 92 || src.get(n + 1) !== 117 || !ok__shadow_1) {
                                            err = NewInvalidEscapeSequenceError$SliceOf_byte(src.slice(n - 6, n + 6, null));
                                        }
                                        else {
                                            r__shadow_2 = utf16__from_gostdlib.DecodeRune(v1, v2);
                                            if (r__shadow_2 === RuneError$int32__from_utf8) {
                                                err = NewInvalidEscapeSequenceError$SliceOf_byte(src.slice(n - 6, n + 6, null));
                                            }
                                            else {
                                                n += 6;
                                            }
                                        }
                                    }
                                }
                                dst = utf8__from_gostdlib.AppendRune(dst, r__shadow_2);
                                break;
                            }
                            default: {
                                return [dst, NewInvalidEscapeSequenceError$SliceOf_byte(src.slice(n, n + 2, null))];
                                break;
                            }
                        }
                    }
                    i = n;
                }
                else if (r === RuneError$int32__from_utf8) {
                    dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n, null), 0);
                    if (!utf8__from_gostdlib.FullRune(src.slice(n, null, null))) {
                        return [dst, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                    }
                    const __gotots_slice_build_0 = dst;
                    const __gotots_slice_build_1 = "\u00EF\u00BF\u00BD";
                    const __gotots_slice_build_2 = goSliceAllocate<uint8>(__gotots_slice_build_1.length, null);
                    for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_1.length; __gotots_slice_build_3++) {
                        __gotots_slice_build_2.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
                    }
                    dst = goSliceAppendSlice<uint8>(__gotots_slice_build_0, __gotots_slice_build_2, 0);
                    n += rn;
                    i = n;
                    err = $state.ErrInvalidUTF8;
                }
                else if (r < 32) {
                    dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n, null), 0);
                    return [dst, NewInvalidCharacterError$SliceOf_byte(src.slice(n, null, null), "in string (expecting non-control character)")];
                }
                else {
                    const __gotots_argument_1 = new GoInterfaceAdapter("BUG: unhandled character " + QuoteRune(src.slice(n, null, null)));
                    GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                }
            }
        }
    }
    dst = goSliceAppendSlice<uint8>(dst, src.slice(i, n, null), 0);
    return [dst, GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
}
export function hasEscapedUTF16Prefix(b: RuntimeSlice<uint8>, lowerSurrogateHalf: bool): bool {
    const __gotots_range_0 = b.length;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        let i = __gotots_range_value_0;
        {
            let c = b.get(i);
            __gotots_control_target_6: {
                if (i === 0 && c !== 92) {
                    return false;
                }
                else if (i === 1 && c !== 117) {
                    return false;
                }
                else if (i === 2 && lowerSurrogateHalf && c !== 100 && c !== 68) {
                    return false;
                }
                else if (i === 3 && lowerSurrogateHalf && !(99 <= c && c <= 102) && !(67 <= c && c <= 70)) {
                    return false;
                }
                else if (i >= 2 && i < 6 && !(48 <= c && c <= 57) && !(97 <= c && c <= 102) && !(65 <= c && c <= 70)) {
                    return false;
                }
            }
        }
    }
    return true;
}
export function UnquoteMayCopy(b: RuntimeSlice<uint8>, isVerbatim: bool): RuntimeSlice<uint8> {
    if (isVerbatim) {
        return b.slice(1, b.length - 1, null);
    }
    const __gotots_results_0 = AppendUnquote(RuntimeSlice.nil<uint8>(), b);
    b = __gotots_results_0[0];
    return b;
}
export function ConsumeSimpleNumber(b: RuntimeSlice<uint8>): int {
    let n: int = 0;
    if (b.length > 0) {
        if (b.get(0) === 48) {
            n++;
        }
        else if (49 <= b.get(0) && b.get(0) <= 57) {
            n++;
            for (; b.length > n && (48 <= b.get(n) && b.get(n) <= 57);) {
                n++;
            }
        }
        else {
            return 0;
        }
        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) || (b.get(n) !== 46 && b.get(n) !== 101 && b.get(n) !== 69)) {
            return n;
        }
    }
    return 0;
}
export class ConsumeNumberState {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint) {
    }
    declare private readonly then?: never;
}
export function consumeNumberInit$constant(): ConsumeNumberState {
    return new ConsumeNumberState(0);
}
export function beforeIntegerDigits$constant(): ConsumeNumberState {
    return new ConsumeNumberState(1);
}
export function withinIntegerDigits$constant(): ConsumeNumberState {
    return new ConsumeNumberState(2);
}
export function beforeFractionalDigits$constant(): ConsumeNumberState {
    return new ConsumeNumberState(3);
}
export function withinFractionalDigits$constant(): ConsumeNumberState {
    return new ConsumeNumberState(4);
}
export function beforeExponentDigits$constant(): ConsumeNumberState {
    return new ConsumeNumberState(5);
}
export function withinExponentDigits$constant(): ConsumeNumberState {
    return new ConsumeNumberState(6);
}
export function ConsumeNumber(b: RuntimeSlice<uint8>): [
    int,
    GoInterface | undefined
] {
    let n: int = 0;
    let err: GoInterface | undefined = void 0;
    const __gotots_results_1 = ConsumeNumberResumable(b, 0, consumeNumberInit$constant());
    n = __gotots_results_1[0];
    err = __gotots_results_1[2];
    return [n, err];
}
export function ConsumeNumberResumable(b: RuntimeSlice<uint8>, resumeOffset: int, state: ConsumeNumberState): [
    int,
    ConsumeNumberState,
    GoInterface | undefined
] {
    let n: int = 0;
    let $result1: ConsumeNumberState = new ConsumeNumberState(0);
    let err: GoInterface | undefined = void 0;
    let __gotots_goto_state_0 = 0;
    __gotots_goto_dispatch_0: while (true) {
        switch (__gotots_goto_state_0) {
            case 0:
                n = resumeOffset;
                if (state.$value > consumeNumberInit$constant().$value) {
                    __gotots_control_target_3: switch (state.$value) {
                        case 2:
                        case 4:
                        case 6: {
                            __gotots_control_target_4: for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && (48 <= b.get(n) && b.get(n) <= 57);) {
                                n++;
                            }
                            if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                                return [n, state, void 0];
                            }
                            state = new ConsumeNumberState(state.$value + 1);
                            break;
                        }
                    }
                    __gotots_control_target_5: switch (state.$value) {
                        case 1: {
                            __gotots_goto_state_0 = 1;
                            continue __gotots_goto_dispatch_0;
                            break;
                        }
                        case 3: {
                            __gotots_goto_state_0 = 2;
                            continue __gotots_goto_dispatch_0;
                            break;
                        }
                        case 5: {
                            __gotots_goto_state_0 = 3;
                            continue __gotots_goto_dispatch_0;
                            break;
                        }
                        default: {
                            return [n, state, void 0];
                            break;
                        }
                    }
                }
                __gotots_goto_state_0 = 1;
                continue __gotots_goto_dispatch_0;
            case 1:
                beforeInteger: resumeOffset = n;
                if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > 0 && b.get(0) === 45) {
                    n++;
                }
                __gotots_control_target_6: {
                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                        return [resumeOffset, beforeIntegerDigits$constant(), GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                    }
                    else if (b.get(n) === 48) {
                        n++;
                        state = beforeFractionalDigits$constant();
                    }
                    else if (49 <= b.get(n) && b.get(n) <= 57) {
                        n++;
                        __gotots_control_target_7: for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && (48 <= b.get(n) && b.get(n) <= 57);) {
                            n++;
                        }
                        state = withinIntegerDigits$constant();
                    }
                    else {
                        return [n, state, NewInvalidCharacterError$SliceOf_byte(b.slice(n, null, null), "in number (expecting digit)")];
                    }
                }
                __gotots_goto_state_0 = 2;
                continue __gotots_goto_dispatch_0;
            case 2:
                beforeFractional: if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && b.get(n) === 46) {
                    resumeOffset = n;
                    n++;
                    __gotots_control_target_8: {
                        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                            return [resumeOffset, beforeFractionalDigits$constant(), GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                        }
                        else if (48 <= b.get(n) && b.get(n) <= 57) {
                            n++;
                        }
                        else {
                            return [n, state, NewInvalidCharacterError$SliceOf_byte(b.slice(n, null, null), "in number (expecting digit)")];
                        }
                    }
                    __gotots_control_target_9: for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && (48 <= b.get(n) && b.get(n) <= 57);) {
                        n++;
                    }
                    state = withinFractionalDigits$constant();
                }
                __gotots_goto_state_0 = 3;
                continue __gotots_goto_dispatch_0;
            case 3:
                beforeExponent: if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && (b.get(n) === 101 || b.get(n) === 69)) {
                    resumeOffset = n;
                    n++;
                    if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && (b.get(n) === 45 || b.get(n) === 43)) {
                        n++;
                    }
                    __gotots_control_target_10: {
                        if (globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) <= globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n)))) {
                            return [resumeOffset, beforeExponentDigits$constant(), GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrUnexpectedEOF)];
                        }
                        else if (48 <= b.get(n) && b.get(n) <= 57) {
                            n++;
                        }
                        else {
                            return [n, state, NewInvalidCharacterError$SliceOf_byte(b.slice(n, null, null), "in number (expecting digit)")];
                        }
                    }
                    __gotots_control_target_11: for (; globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(b.length))) > globalThis.Number(BigInt.asUintN(64, goNumberToBigInt(n))) && (48 <= b.get(n) && b.get(n) <= 57);) {
                        n++;
                    }
                    state = withinExponentDigits$constant();
                }
                return [n, state, void 0];
            default: continue __gotots_goto_dispatch_0;
        }
    }
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function parseHexUint16(b: RuntimeSlice<uint8>): [
    uint16,
    bool
] {
    let v: uint16 = 0;
    let ok: bool = false;
    if (b.length !== 4) {
        return [0, false];
    }
    const __gotots_range_1 = 4;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        let i = __gotots_range_value_1;
        let c = b.get(i);
        __gotots_control_target_7: {
            if (48 <= c && c <= 57) {
                c = c - 48;
            }
            else if (97 <= c && c <= 102) {
                c = 10 + c - 97;
            }
            else if (65 <= c && c <= 70) {
                c = 10 + c - 65;
            }
            else {
                return [0, false];
            }
        }
        v = v * 16 + c;
    }
    return [v, true];
}
export function ParseUint(b: RuntimeSlice<uint8>): [
    uint64,
    bool
] {
    let v: uint64 = 0n;
    let ok: bool = false;
    const unsafeWidth$int: int = 20;
    let n = 0;
    for (; b.length > n && (48 <= b.get(n) && b.get(n) <= 57); n++) {
        v = goUint64(goUint64(10n * v) + BigInt.asUintN(64, goNumberToBigInt(b.get(n) - 48)));
    }
    {
        let __gotots_switch_selection_0 = -1;
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_0 = false;
            if (!__gotots_switch_match_0) {
                let __gotots_logical_result_1 = n === 0 || b.length !== n;
                if (!__gotots_logical_result_1) {
                    let __gotots_logical_result_0 = b.get(0) === 48;
                    if (__gotots_logical_result_0) {
                        const __gotots_conversion_0 = b;
                        let __gotots_conversion_1 = "";
                        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
                        }
                        const __gotots_binary_operand_0 = __gotots_conversion_1;
                        const __gotots_binary_operand_1 = "0";
                        __gotots_logical_result_0 = __gotots_binary_operand_0 !== __gotots_binary_operand_1;
                    }
                    __gotots_logical_result_1 = (__gotots_logical_result_0);
                }
                __gotots_switch_match_0 = __gotots_logical_result_1;
            }
            if (__gotots_switch_match_0) {
                __gotots_switch_selection_0 = 0;
            }
        }
        if (__gotots_switch_selection_0 === -1) {
            let __gotots_switch_match_1 = false;
            if (!__gotots_switch_match_1) {
                __gotots_switch_match_1 = n >= unsafeWidth$int && (b.get(0) !== 49 || v < 10000000000000000000n || n > unsafeWidth$int);
            }
            if (__gotots_switch_match_1) {
                __gotots_switch_selection_0 = 1;
            }
        }
        __gotots_control_target_0: switch (__gotots_switch_selection_0) {
            case 0: {
                return [0n, false];
                break;
            }
            case 1: {
                return [MaxUint64$uint64__from_math__package_1, false];
                break;
            }
        }
    }
    return [v, true];
}
