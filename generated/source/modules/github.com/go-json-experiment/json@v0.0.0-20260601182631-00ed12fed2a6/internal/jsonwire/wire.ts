import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { RuneError$int32 as RuneError$int32__from_utf8, RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { Compare$byte, Compare$int, Compare$rune } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { $goInterfaceAdapter$PointerTo_Named_jsonwire$InvalidTextError as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function TrimSuffixWhitespace(b: RuntimeSlice<uint8>): RuntimeSlice<uint8> {
    let n = b.length - 1;
    for (; n >= 0 && (b.get(n) === 32 || b.get(n) === 9 || b.get(n) === 13 || b.get(n) === 10);) {
        n--;
    }
    return b.slice(0, n + 1, null);
}
export function TrimSuffixString(b: RuntimeSlice<uint8>): RuntimeSlice<uint8> {
    if (b.length > 0 && b.get(b.length - 1) === 34) {
        b = b.slice(0, b.length - 1, null);
    }
    for (; b.length >= 2 && !(b.get(b.length - 1) === 34 && b.get(b.length - 2) !== 92);) {
        b = b.slice(0, b.length - 1, null);
    }
    if (b.length > 0 && b.get(b.length - 1) === 34) {
        b = b.slice(0, b.length - 1, null);
    }
    return b;
}
export function HasSuffixByte(b: RuntimeSlice<uint8>, c: uint8): bool {
    return b.length > 0 && b.get(b.length - 1) === c;
}
export function TrimSuffixByte(b: RuntimeSlice<uint8>, c: uint8): RuntimeSlice<uint8> {
    if (b.length > 0 && b.get(b.length - 1) === c) {
        return b.slice(0, b.length - 1, null);
    }
    return b;
}
export function QuoteRune(b: RuntimeSlice<uint8>): gostring {
    const __gotots_results_0 = utf8__from_gostdlib.DecodeRune(b);
    const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
        int32,
        int
    ];
    let r = __gotots_results_1[0];
    let n = __gotots_results_1[1];
    if (r === RuneError$int32__from_utf8 && n === 1) {
        return "'\\x" + strconv__from_gostdlib.FormatUint(BigInt.asUintN(64, goNumberToBigInt(b.get(0))), BigInt.asIntN(64, goNumberToBigInt(16))) + "'";
    }
    return strconv__from_gostdlib.QuoteRune(r);
}
export function CompareUTF16(x: RuntimeSlice<uint8>, y: RuntimeSlice<uint8>): int {
    let isUTF16Self: (($0: int32) => bool) | undefined = (r: int32): bool => {
        return (0 <= r && r <= 55295) || (57344 <= r && r <= 65535);
    };
    for (;;) {
        if (x.length === 0 || y.length === 0) {
            return Compare$int(x.length, y.length);
        }
        if (x.get(0) < RuneSelf$uint8__from_utf8 || y.get(0) < RuneSelf$uint8__from_utf8) {
            if (x.get(0) !== y.get(0)) {
                return Compare$byte(x.get(0), y.get(0));
            }
            const __gotots_assign_0 = x.slice(1, null, null);
            const __gotots_assign_1 = y.slice(1, null, null);
            x = __gotots_assign_0;
            y = __gotots_assign_1;
            continue;
        }
        const __gotots_results_4 = utf8__from_gostdlib.DecodeRune(x);
        const __gotots_results_5 = [__gotots_results_4[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_4[1]))] satisfies [
            int32,
            int
        ];
        let rx = __gotots_results_5[0];
        let nx = __gotots_results_5[1];
        const __gotots_results_6 = utf8__from_gostdlib.DecodeRune(y);
        const __gotots_results_7 = [__gotots_results_6[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_6[1]))] satisfies [
            int32,
            int
        ];
        let ry = __gotots_results_7[0];
        let ny = __gotots_results_7[1];
        const __gotots_callee_0 = isUTF16Self;
        const __gotots_argument_1 = rx;
        let selfx = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        const __gotots_callee_1 = isUTF16Self;
        const __gotots_argument_2 = ry;
        let selfy = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        __gotots_control_target_0: {
            if (selfx && !selfy) {
                const __gotots_results_9 = utf16__from_gostdlib.EncodeRune(ry);
                ry = __gotots_results_9[0];
            }
            else if (selfy && !selfx) {
                const __gotots_results_11 = utf16__from_gostdlib.EncodeRune(rx);
                rx = __gotots_results_11[0];
            }
        }
        if (rx !== ry) {
            return Compare$rune(rx, ry);
        }
        if (isInvalidUTF8(rx, nx) || isInvalidUTF8(ry, ny)) {
            if (x.get(0) !== y.get(0)) {
                return Compare$byte(x.get(0), y.get(0));
            }
        }
        const __gotots_assign_2 = x.slice(nx, null, null);
        const __gotots_assign_3 = y.slice(ny, null, null);
        x = __gotots_assign_2;
        y = __gotots_assign_3;
    }
}
export function NewInvalidCharacterError$kernel<Bytes>($go$convert$T0_to_string: ($0: Bytes) => gostring, $go$convert$T0_to_SliceOf_byte: ($0: Bytes) => RuntimeSlice<uint8>, $go$slice$T0_int_int_to_T0: ($0: Bytes, $1: int, $2: int) => Bytes, prefix: Bytes, where: gostring): GoInterface | undefined {
    const __gotots_results_2 = utf8__from_gostdlib.DecodeRune($go$convert$T0_to_SliceOf_byte(prefix));
    const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
        int32,
        int
    ];
    let n = __gotots_results_3[1];
    const __gotots_field_0 = "character";
    const __gotots_slice_operand_0 = prefix;
    const __gotots_argument_0 = $go$slice$T0_int_int_to_T0(__gotots_slice_operand_0, 0, n);
    const __gotots_field_1 = $go$convert$T0_to_string(__gotots_argument_0);
    return new GoInterfaceAdapter({ value: new InvalidTextError(__gotots_field_0, __gotots_field_1, where) });
}
export function NewInvalidEscapeSequenceError$kernel<Bytes>($go$convert$T0_to_string: ($0: Bytes) => gostring, $go$length$T0_to_int: ($0: Bytes) => int, what: Bytes): GoInterface | undefined {
    if ($go$length$T0_to_int(what) > 6) {
        return new GoInterfaceAdapter({ value: new InvalidTextError("surrogate pair", $go$convert$T0_to_string(what), "in string") });
    }
    return new GoInterfaceAdapter({ value: new InvalidTextError("escape sequence", $go$convert$T0_to_string(what), "in string") });
}
export class InvalidTextError {
    declare private readonly $goType: void;
    public constructor(public Label: gostring, public What: gostring, public Where: gostring) {
    }
    static $copy($source: InvalidTextError): InvalidTextError {
        return new InvalidTextError($source.Label, $source.What, $source.Where);
    }
    static $equal($left: InvalidTextError, $right: InvalidTextError): bool {
        return $left.Label === $right.Label && $left.What === $right.What && $left.Where === $right.Where;
    }
    static $hash($source: InvalidTextError): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Label));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.What));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Where));
        return $hash;
    }
    declare private readonly then?: never;
    static Error(e: {
        value: InvalidTextError;
    } | undefined): gostring {
        let what = "";
        let needEscape = strings__from_gostdlib.ContainsFunc((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.What, (r: int32): bool => {
            return r === 96 || r === RuneError$int32__from_utf8 || unicode__from_gostdlib.IsSpace(r) || !unicode__from_gostdlib.IsPrint(r);
        });
        {
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    const __gotots_conversion_0: InvalidTextError["What"] = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.What;
                    const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
                    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                        __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
                    }
                    const __gotots_argument_3 = __gotots_conversion_1;
                    const __gotots_binary_operand_0 = globalThis.Number(BigInt.asIntN(64, utf8__from_gostdlib.RuneCount(__gotots_argument_3)));
                    const __gotots_binary_operand_1 = 1;
                    __gotots_switch_match_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = needEscape;
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
                    const __gotots_conversion_3: InvalidTextError["What"] = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.What;
                    const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
                    for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                        __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
                    }
                    const __gotots_argument_4 = __gotots_conversion_4;
                    what = QuoteRune(__gotots_argument_4);
                    break;
                }
                case 1: {
                    what = strconv__from_gostdlib.Quote((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.What);
                    break;
                }
                case 2: {
                    what = "`" + (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.What + "`";
                    break;
                }
            }
        }
        return strings__from_gostdlib.TrimSuffix("invalid " + (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Label + " " + what + " " + (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Where, " ");
    }
}
export function TruncatePointer(s: gostring, n: int): gostring {
    if (s.length <= n) {
        return s;
    }
    let i = goNumberIntegerDivide(n, 2);
    let j = s.length - goNumberIntegerDivide(n, 2);
    {
        let k = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(goStringSlice(s, 0, i), 47)));
        if (k > 0) {
            i = k;
        }
    }
    {
        let k = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(goStringSlice(s, j), 47)));
        if (k >= 0) {
            j += k + 1;
        }
    }
    {
        for (;;) {
            let __gotots_logical_result_0 = i > 0;
            if (__gotots_logical_result_0) {
                const __gotots_results_12 = utf8__from_gostdlib.DecodeLastRuneInString(goStringSlice(s, 0, i));
                const __gotots_results_13 = [__gotots_results_12[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_12[1]))] satisfies [
                    int32,
                    int
                ];
                __gotots_logical_result_0 = isInvalidUTF8(__gotots_results_13[0], __gotots_results_13[1]);
            }
            if (!__gotots_logical_result_0) {
                break;
            }
            {
                i--;
            }
        }
    }
    {
        for (;;) {
            let __gotots_logical_result_1 = j < s.length;
            if (__gotots_logical_result_1) {
                const __gotots_results_14 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(s, j));
                const __gotots_results_15 = [__gotots_results_14[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_14[1]))] satisfies [
                    int32,
                    int
                ];
                __gotots_logical_result_1 = isInvalidUTF8(__gotots_results_15[0], __gotots_results_15[1]);
            }
            if (!__gotots_logical_result_1) {
                break;
            }
            {
                j++;
            }
        }
    }
    let middle = "";
    switch (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(goStringSlice(s, i, j), "/")))) {
        case 0: {
            middle = "\u00E2\u0080\u00A6";
            break;
        }
        case 1: {
            middle = "\u00E2\u0080\u00A6/\u00E2\u0080\u00A6";
            break;
        }
        default: {
            middle = "\u00E2\u0080\u00A6/\u00E2\u0080\u00A6/\u00E2\u0080\u00A6";
            break;
        }
    }
    if (strings__from_gostdlib.HasPrefix(goStringSlice(s, i, j), "/") && middle !== "\u00E2\u0080\u00A6") {
        middle = strings__from_gostdlib.TrimPrefix(middle, "\u00E2\u0080\u00A6");
    }
    if (strings__from_gostdlib.HasSuffix(goStringSlice(s, i, j), "/") && middle !== "\u00E2\u0080\u00A6") {
        middle = strings__from_gostdlib.TrimSuffix(middle, "\u00E2\u0080\u00A6");
    }
    return goStringSlice(s, 0, i) + middle + goStringSlice(s, j);
}
export function isInvalidUTF8(r: int32, rn: int): bool {
    return r === RuneError$int32__from_utf8 && rn === 1;
}
