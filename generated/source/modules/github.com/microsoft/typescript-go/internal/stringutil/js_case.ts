import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/state.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { specialCasingConditionFinalSigma$constant } from "./js_case_generated.js";
import { DecodeJSStringRune, EncodeJSStringRune, IsSurrogate } from "./util.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function ToLowerJS(str: gostring): gostring {
    {
        const __gotots_results_3 = toLowerASCII(str);
        let ascii = __gotots_results_3[0];
        let ok = __gotots_results_3[1];
        if (ok) {
            return ascii;
        }
    }
    let builder = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.Grow(builder, BigInt.asIntN(64, goNumberToBigInt(str.length)));
    let casedBefore = false;
    for (let i = 0; i < str.length;) {
        const __gotots_results_4 = DecodeJSStringRune(goStringSlice(str, i));
        let r = __gotots_results_4[0];
        let size = __gotots_results_4[1];
        i += size;
        if (IsSurrogate(r)) {
            strings__from_gostdlib.Builder.WriteString(builder, EncodeJSStringRune(r));
        }
        else {
            const __gotots_results_5 = $state.specialCasingMappings.lookupOk(r);
            let mapping = __gotots_results_5[0];
            let ok = __gotots_results_5[1];
            if (ok) {
                if (mapping.condition === specialCasingConditionFinalSigma$constant() && !isFinalSigmaContext(casedBefore, str, i)) {
                    strings__from_gostdlib.Builder.WriteRune(builder, unicode__from_gostdlib.ToLower(r));
                }
                else {
                    strings__from_gostdlib.Builder.WriteString(builder, mapping.lower);
                }
            }
            else {
                strings__from_gostdlib.Builder.WriteRune(builder, unicode__from_gostdlib.ToLower(r));
            }
        }
        if (!isUnicodeCaseIgnorable(r)) {
            casedBefore = isSigmaCased(r);
        }
    }
    return strings__from_gostdlib.Builder.String(builder);
}
export function ToUpperJS(str: gostring): gostring {
    {
        const __gotots_results_0 = toUpperASCII(str);
        let ascii = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            return ascii;
        }
    }
    let builder = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.Grow(builder, BigInt.asIntN(64, goNumberToBigInt(str.length)));
    for (let i = 0; i < str.length;) {
        const __gotots_results_1 = DecodeJSStringRune(goStringSlice(str, i));
        let r = __gotots_results_1[0];
        let size = __gotots_results_1[1];
        if (IsSurrogate(r)) {
            strings__from_gostdlib.Builder.WriteString(builder, goStringSlice(str, i, i + size));
        }
        else {
            const __gotots_results_2 = $state.specialCasingMappings.lookupOk(r);
            let mapping = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok) {
                strings__from_gostdlib.Builder.WriteString(builder, mapping.upper);
            }
            else {
                strings__from_gostdlib.Builder.WriteRune(builder, unicode__from_gostdlib.ToUpper(r));
            }
        }
        i += size;
    }
    return strings__from_gostdlib.Builder.String(builder);
}
export function toLowerASCII(str: gostring): [
    gostring,
    bool
] {
    let needsMapping = false;
    const __gotots_range_2 = str.length;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2; __gotots_range_index_2++) {
        const __gotots_range_value_3 = __gotots_range_index_2;
        let i = __gotots_range_value_3;
        let ch = goStringIndex(str, i);
        if (ch >= RuneSelf$uint8__from_utf8) {
            return ["", false];
        }
        needsMapping = needsMapping || (65 <= ch && ch <= 90);
    }
    if (!needsMapping) {
        return [str, true];
    }
    const __gotots_conversion_6 = str;
    const __gotots_conversion_7 = RuntimeSlice.make<uint8>(__gotots_conversion_6.length, null, 0);
    for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
        __gotots_conversion_7.set(__gotots_conversion_8, __gotots_conversion_6.charCodeAt(__gotots_conversion_8));
    }
    let buf = __gotots_conversion_7;
    const __gotots_range_3 = buf;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_4 = __gotots_range_index_3;
        const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_3);
        let i = __gotots_range_value_4;
        let ch = __gotots_range_value_5;
        if (65 <= ch && ch <= 90) {
            buf.set(i, ch + (32));
        }
    }
    const __gotots_conversion_9 = buf;
    let __gotots_conversion_10 = "";
    for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
        __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
    }
    const __gotots_results_8 = __gotots_conversion_10;
    const __gotots_results_9 = true;
    return [__gotots_results_8, __gotots_results_9];
}
export function toUpperASCII(str: gostring): [
    gostring,
    bool
] {
    let needsMapping = false;
    const __gotots_range_0 = str.length;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        let i = __gotots_range_value_0;
        let ch = goStringIndex(str, i);
        if (ch >= RuneSelf$uint8__from_utf8) {
            return ["", false];
        }
        needsMapping = needsMapping || (97 <= ch && ch <= 122);
    }
    if (!needsMapping) {
        return [str, true];
    }
    const __gotots_conversion_0 = str;
    const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
        __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
    }
    let buf = __gotots_conversion_1;
    const __gotots_range_1 = buf;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
        let i = __gotots_range_value_1;
        let ch = __gotots_range_value_2;
        if (97 <= ch && ch <= 122) {
            buf.set(i, ch - (32));
        }
    }
    const __gotots_conversion_3 = buf;
    let __gotots_conversion_4 = "";
    for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
        __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
    }
    const __gotots_results_6 = __gotots_conversion_4;
    const __gotots_results_7 = true;
    return [__gotots_results_6, __gotots_results_7];
}
export function isFinalSigmaContext(casedBefore: bool, str: gostring, afterOffset: int): bool {
    return casedBefore && !hasSigmaCasedAfter(str, afterOffset);
}
export function hasSigmaCasedAfter(str: gostring, start: int): bool {
    for (let i = start; i < str.length;) {
        const __gotots_results_10 = DecodeJSStringRune(goStringSlice(str, i));
        let r = __gotots_results_10[0];
        let size = __gotots_results_10[1];
        i += size;
        if (isUnicodeCaseIgnorable(r)) {
            continue;
        }
        return isSigmaCased(r);
    }
    return false;
}
export function isSigmaCased(r: int32): bool {
    const __gotots_conversion_13 = $state.unicodeCasedRanges;
    return unicode__from_gostdlib.Is(__gotots_conversion_13 === undefined ? undefined :
        (__gotots_conversion_13 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value, r);
}
export function isUnicodeCaseIgnorable(r: int32): bool {
    const __gotots_conversion_12 = $state.unicodeCaseIgnorableRanges;
    return unicode__from_gostdlib.Is(__gotots_conversion_12 === undefined ? undefined :
        (__gotots_conversion_12 as tsonicTypeScriptRuntime.Location<unicode__from_gostdlib.RangeTable>).value, r);
}
