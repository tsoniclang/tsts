import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/state.js";
import { Enumerate$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Enumerate.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function defeatGenericSecretRegex(s: gostring): gostring {
    const __gotots_receiver_9 = $state.genericSecretKeywordRegex;
    return regexp__from_gostdlib.Regexp.ReplaceAllString(__gotots_receiver_9 === void 0 ? void 0 :
        (__gotots_receiver_9 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, s, "${1}X_X${2}");
}
export function sanitizeStackTrace(stack: gostring): gostring {
    let startIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(stack, "runtime/debug.Stack()")));
    if (startIndex < 0) {
        return "";
    }
    stack = goStringSlice(stack, startIndex);
    const __gotots_struct_0 = named_strings.StringsBuilderOperations.$zero();
    let result: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined = tsonicTypeScriptRuntime.location<strings__from_gostdlib.Builder>(__gotots_struct_0);
    const __gotots_range_0 = named_iter.IterSeq2ValueOperations.$project(Enumerate$string(strings__from_gostdlib.Lines(stack)));
    if (__gotots_range_0 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    __gotots_range_0(($argument0: int, $argument1: gostring): bool => {
        if (__gotots_range_state_0 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_0 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_0 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_0 = -1;
        const __gotots_range_value_0 = $argument0;
        const __gotots_range_value_1 = $argument1;
        let lineNum = __gotots_range_value_0;
        let line = __gotots_range_value_1;
        if (lineNum > 0) {
            const __gotots_receiver_0 = result;
            strings__from_gostdlib.Builder.WriteByte(__gotots_receiver_0 === void 0 ? void 0 :
                (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, 10);
        }
        let i = 0;
        for (; i < line.length;) {
            if (goStringIndex(line, i) !== 32 && goStringIndex(line, i) !== 9) {
                break;
            }
            i++;
        }
        const __gotots_receiver_1 = result;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_1 === void 0 ? void 0 :
            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, goStringSlice(line, 0, i));
        line = goStringSlice(line, i);
        let ourModuleIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(line, "typescript-go/internal")));
        if (ourModuleIndex >= 0) {
            line = goStringSlice(line, ourModuleIndex);
            writeSanitizedModuleOrPath(line, result);
        }
        else {
            const __gotots_receiver_2 = result;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_2 === void 0 ? void 0 :
                (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "(REDACTED FRAME)");
        }
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    const __gotots_receiver_3 = result;
    const __gotots_argument_0 = strings__from_gostdlib.Builder.String(__gotots_receiver_3 === void 0 ? void 0 :
        (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value);
    return defeatGenericSecretRegex(__gotots_argument_0);
}
export function writeSanitizedModuleOrPath(line: gostring, result: tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder> | undefined): void {
    line = strings__from_gostdlib.TrimSpace(line);
    {
        let plusHex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(line, " +0x")));
        if (plusHex >= 0) {
            line = goStringSlice(line, 0, plusHex);
        }
        else {
            let inGoroutine = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(line, " in goroutine ")));
            if (inGoroutine >= 0) {
                line = goStringSlice(line, 0, inGoroutine);
            }
        }
    }
    const __gotots_range_1 = strings__from_gostdlib.Split(line, "/");
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
        const __gotots_range_value_2 = __gotots_range_index_0;
        const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
        let segmentIndex = __gotots_range_value_2;
        let segment = __gotots_range_value_3;
        if (segmentIndex > 0) {
            const __gotots_receiver_4 = result;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_4 === void 0 ? void 0 :
                (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "|>");
        }
        if (strings__from_gostdlib.HasSuffix(segment, ")")) {
            let openParenIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(segment, 40)));
            if (openParenIndex < 0) {
                const __gotots_receiver_5 = result;
                strings__from_gostdlib.Builder.WriteString(__gotots_receiver_5 === void 0 ? void 0 :
                    (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "???");
                continue;
            }
            segment = goStringSlice(segment, 0, openParenIndex);
            const __gotots_receiver_6 = result;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_6 === void 0 ? void 0 :
                (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, segment);
            const __gotots_receiver_7 = result;
            strings__from_gostdlib.Builder.WriteString(__gotots_receiver_7 === void 0 ? void 0 :
                (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, "()");
            continue;
        }
        const __gotots_receiver_8 = result;
        strings__from_gostdlib.Builder.WriteString(__gotots_receiver_8 === void 0 ? void 0 :
            (__gotots_receiver_8 as tsonicTypeScriptRuntime.Location<strings__from_gostdlib.Builder>).value, segment);
    }
}
