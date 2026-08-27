import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/state.js";
import { _Tristate_name$string } from "./tristate_stringer_generated.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function Tristate_String(i: Tristate): gostring {
    let idx = i - 0;
    if (i < 0 || idx >= 3) {
        return "Tristate(" + strconv__from_gostdlib.FormatInt(BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(10))) + ")";
    }
    return goStringSlice(_Tristate_name$string, $state._Tristate_index.get(idx), $state._Tristate_index.get(idx + 1));
}
export type Tristate = uint8;
export function TSUnknown$constant(): Tristate {
    return 0;
}
export function TSFalse$constant(): Tristate {
    return 1;
}
export function TSTrue$constant(): Tristate {
    return 2;
}
export function Tristate_IsTrue(t: Tristate): bool {
    return t === TSTrue$constant();
}
export function Tristate_IsTrueOrUnknown(t: Tristate): bool {
    return t === TSTrue$constant() || t === TSUnknown$constant();
}
export function Tristate_IsFalse(t: Tristate): bool {
    return t === TSFalse$constant();
}
export function Tristate_IsFalseOrUnknown(t: Tristate): bool {
    return t === TSFalse$constant() || t === TSUnknown$constant();
}
export function Tristate_IsUnknown(t: Tristate): bool {
    return t === TSUnknown$constant();
}
export function Tristate_DefaultIfUnknown(t: Tristate, value: Tristate): Tristate {
    if (t === TSUnknown$constant()) {
        return value;
    }
    return t;
}
export function Tristate_UnmarshalJSON(t: tsonicTypeScriptRuntime.Location<Tristate> | undefined, data: RuntimeSlice<uint8>): GoInterface | undefined {
    const __gotots_conversion_9 = data;
    let __gotots_conversion_10 = "";
    for (let __gotots_conversion_11 = 0; __gotots_conversion_11 < __gotots_conversion_9.length; __gotots_conversion_11++) {
        __gotots_conversion_10 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_9.get(__gotots_conversion_11)));
    }
    switch (__gotots_conversion_10) {
        case "true": {
            void ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                TSTrue$constant());
            break;
        }
        case "false": {
            void ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                TSFalse$constant());
            break;
        }
        default: {
            void ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                TSUnknown$constant());
            break;
        }
    }
    return void 0;
}
export function Tristate_MarshalJSON(t: Tristate): [
    RuntimeSlice<uint8>,
    GoInterface | undefined
] {
    switch (t) {
        case TSTrue$constant(): {
            const __gotots_conversion_0 = "true";
            const __gotots_conversion_1 = RuntimeSlice.make<uint8>(__gotots_conversion_0.length, null, 0);
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1.set(__gotots_conversion_2, __gotots_conversion_0.charCodeAt(__gotots_conversion_2));
            }
            const __gotots_results_0 = __gotots_conversion_1;
            const __gotots_results_1 = void 0;
            return [__gotots_results_0, __gotots_results_1];
            break;
        }
        case TSFalse$constant(): {
            const __gotots_conversion_3 = "false";
            const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
            }
            const __gotots_results_2 = __gotots_conversion_4;
            const __gotots_results_3 = void 0;
            return [__gotots_results_2, __gotots_results_3];
            break;
        }
        default: {
            const __gotots_conversion_6 = "null";
            const __gotots_conversion_7 = RuntimeSlice.make<uint8>(__gotots_conversion_6.length, null, 0);
            for (let __gotots_conversion_8 = 0; __gotots_conversion_8 < __gotots_conversion_6.length; __gotots_conversion_8++) {
                __gotots_conversion_7.set(__gotots_conversion_8, __gotots_conversion_6.charCodeAt(__gotots_conversion_8));
            }
            const __gotots_results_4 = __gotots_conversion_7;
            const __gotots_results_5 = void 0;
            return [__gotots_results_4, __gotots_results_5];
            break;
        }
    }
}
export function BoolToTristate(b: bool): Tristate {
    if (b) {
        return TSTrue$constant();
    }
    return TSFalse$constant();
}
