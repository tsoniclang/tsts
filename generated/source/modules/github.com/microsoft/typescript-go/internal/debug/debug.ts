import type { $goInterface$Interface_Method_debug$KindString_void_to_string, $goInterface$Interface_Method_fmt$String_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_fmt$String_void_to_string$contract, $goInterface$Interface_Method_fmt$String_void_to_string$is, $goInterface$Interface_Method_debug$KindString_void_to_string$contract as GoInterface$contract, $goInterface$Interface_Method_debug$KindString_void_to_string$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function Fail(reason: gostring): void {
    if (reason.length === 0) {
        reason = "Debug failure.";
    }
    else {
        reason = "Debug failure. " + reason;
    }
    const __gotots_argument_0 = new GoInterfaceAdapter(reason);
    GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
}
export function FailBadSyntaxKind(node: $goInterface$Interface_Method_debug$KindString_void_to_string | undefined, message: RuntimeSlice<GoInterface | undefined>): void {
    let msg = "";
    if (message.length === 0) {
        msg = "Unexpected node.";
    }
    else {
        msg = fmt__from_gostdlib.Sprint(message);
    }
    const __gotots_argument_3 = "%s\nNode %s was unexpected.";
    const __gotots_argument_1 = new GoInterfaceAdapter(msg);
    const __gotots_receiver_0 = node;
    const __gotots_argument_2 = new GoInterfaceAdapter(goInterfaceNonNil<$goInterface$Interface_Method_debug$KindString_void_to_string>(__gotots_receiver_0).KindString());
    const __gotots_argument_4 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_1, __gotots_argument_2]);
    const __gotots_argument_5 = fmt__from_gostdlib.Sprintf(__gotots_argument_3, __gotots_argument_4);
    Fail(__gotots_argument_5);
}
export function AssertNever(member: GoInterface | undefined, message: RuntimeSlice<GoInterface | undefined>): void {
    let msg = "";
    if (message.length === 0) {
        msg = "Illegal value:";
    }
    else {
        msg = fmt__from_gostdlib.Sprint(message);
    }
    let detail = "";
    {
        const __gotots_results_0 = (($value: GoInterface | undefined): [
            $goInterface$Interface_Method_debug$KindString_void_to_string | undefined,
            boolean
        ] => {
            if (!GoInterface$is($value)) {
                return [void 0, false];
            }
            return [$value, true];
        })(member);
        let m: $goInterface$Interface_Method_debug$KindString_void_to_string | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            const __gotots_receiver_1 = m;
            detail = goInterfaceNonNil<$goInterface$Interface_Method_debug$KindString_void_to_string>(__gotots_receiver_1).KindString();
        }
        else {
            const __gotots_results_1 = (($value: GoInterface | undefined): [
                $goInterface$Interface_Method_fmt$String_void_to_string | undefined,
                boolean
            ] => {
                if (!$goInterface$Interface_Method_fmt$String_void_to_string$is($value)) {
                    return [void 0, false];
                }
                return [$value, true];
            })(member);
            let m__shadow_1: $goInterface$Interface_Method_fmt$String_void_to_string | undefined = __gotots_results_1[0];
            let ok__shadow_1 = __gotots_results_1[1];
            if (ok__shadow_1) {
                const __gotots_receiver_2 = m__shadow_1;
                detail = goInterfaceNonNil<$goInterface$Interface_Method_fmt$String_void_to_string>(__gotots_receiver_2).String();
            }
            else {
                detail = fmt__from_gostdlib.Sprintf("%v", RuntimeSlice.literal<GoInterface | undefined>([member]));
            }
        }
    }
    Fail(fmt__from_gostdlib.Sprintf("%s %s", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(msg), new GoInterfaceAdapter(detail)])));
}
export function Assert(value: bool, message: RuntimeSlice<GoInterface | undefined>): void {
    if (value) {
        return;
    }
    assertSlow(message);
}
export function assertSlow(message: RuntimeSlice<GoInterface | undefined>): void {
    let msg = "";
    if (message.length > 0) {
        msg = "False expression: " + fmt__from_gostdlib.Sprint(message);
    }
    else {
        msg = "False expression.";
    }
    Fail(msg);
}
