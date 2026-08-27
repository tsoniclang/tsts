import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$Named_syscall$Errno, $goInterfaceAdapter$Named_syscall$Signal as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goProviderInterfaceBridge$Named_os$Signal, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as named_os from "@gotots/gostdlib/internal/facets/named-os.js";
import * as named_syscall from "@gotots/gostdlib/internal/facets/named-syscall.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as syscall__from_gostdlib from "@gotots/gostdlib/syscall.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function isProcessAlive(pid: int): bool {
    const __gotots_results_0 = os__from_gostdlib.FindProcess(BigInt.asIntN(64, goNumberToBigInt(pid)));
    const __gotots_conversion_0 = __gotots_results_0[0];
    const __gotots_results_1 = [__gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.Process>(__gotots_conversion_0, (): os__from_gostdlib.Process => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: os__from_gostdlib.Process): void => {
                named_os.OsProcessOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            }), GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
        tsonicTypeScriptRuntime.Location<os__from_gostdlib.Process> | undefined,
        GoInterface | undefined
    ];
    let proc: tsonicTypeScriptRuntime.Location<os__from_gostdlib.Process> | undefined = __gotots_results_1[0];
    let err: GoInterface | undefined = __gotots_results_1[1];
    if (!(err === undefined)) {
        return false;
    }
    const __gotots_receiver_0 = proc;
    err = GoProviderInterfaceBridge.$from(os__from_gostdlib.Process.Signal(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.Process>).value, $goProviderInterfaceBridge$Named_os$Signal.$to(new GoInterfaceAdapter(named_syscall.SyscallSignalValueOperations.$wrap(0n)))));
    let __gotots_logical_result_0 = err === undefined;
    if (!__gotots_logical_result_0) {
        const __gotots_argument_0 = err;
        const __gotots_argument_1 = new $goInterfaceAdapter$Named_syscall$Errno(syscall__from_gostdlib.EPERM);
        __gotots_logical_result_0 = provider_error.ErrorsIsDirect(__gotots_argument_0, __gotots_argument_1, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
    }
    return __gotots_logical_result_0;
}
