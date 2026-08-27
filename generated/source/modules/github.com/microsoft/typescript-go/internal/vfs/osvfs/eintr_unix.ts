import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../support/interface-contracts.js";
import { $goInterfaceAdapter$Named_syscall$Errno as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import * as syscall__from_gostdlib from "@gotots/gostdlib/syscall.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function ignoringEINTR$kernel<T>(fn: (() => [
    T,
    GoInterface | undefined
]) | undefined): [
    T,
    GoInterface | undefined
] {
    for (;;) {
        const __gotots_callee_0 = fn;
        const __gotots_results_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        let v: T = __gotots_results_0[0];
        let err: GoInterface | undefined = __gotots_results_0[1];
        if (!goInterfaceEqual(err, new GoInterfaceAdapter(syscall__from_gostdlib.EINTR))) {
            return [v, err];
        }
    }
}
