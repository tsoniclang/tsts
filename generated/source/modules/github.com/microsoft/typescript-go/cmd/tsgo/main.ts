import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { int } from "@gotots/runtime/scalars.js";
import { ApplyDebugStackLimit as ApplyDebugStackLimit__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { CommandLine as CommandLine__from_execute } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { $goInterfaceAdapter$PointerTo_Named_main$osSys, $goInterfaceAdapter$Named_syscall$Signal as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_os$Signal, $goProviderInterfaceBridge$Named_context$Context as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { runAPI } from "./api.js";
import { runLSP } from "./lsp.js";
import { newSystem } from "./sys.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as provider_os_signal from "@gotots/gostdlib/internal/facets/provider-os-signal.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as syscall__from_gostdlib from "@gotots/gostdlib/syscall.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, RuntimeSliceProjection } from "@gotots/runtime/slice.js";
export function main(): void {
    os__from_gostdlib.Exit(BigInt.asIntN(64, goNumberToBigInt(runMain())));
}
export function runMain(): int {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: int = 0;
    try {
        try {
            __gotots_return_block_0: {
                ApplyDebugStackLimit__from_core();
                let args = os__from_gostdlib.state.Args.slice(1, null, null);
                if (args.length > 0) {
                    switch (args.get(0)) {
                        case "--lsp": {
                            __gotots_return_0 = runLSP(args.slice(1, null, null));
                            break __gotots_return_block_0;
                            break;
                        }
                        case "--api": {
                            __gotots_return_0 = runAPI(args.slice(1, null, null));
                            break __gotots_return_block_0;
                            break;
                        }
                    }
                }
                const __gotots_argument_0 = GoProviderInterfaceBridge.$from(context__from_gostdlib.Background());
                const __gotots_argument_1 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(syscall__from_gostdlib.SIGINT), new GoInterfaceAdapter(syscall__from_gostdlib.SIGTERM)]);
                const __gotots_results_0 = provider_os_signal.OsSignalNotifyContextDirect(GoProviderProfileBridge.$to(__gotots_argument_0), new RuntimeSliceProjection<GoInterface | undefined, GoInterface | undefined>(__gotots_argument_1, ($productElement: GoInterface | undefined): GoInterface | undefined => {
                    return $goProviderInterfaceBridge$Named_os$Signal.$to($productElement);
                }, ($providerElement: GoInterface | undefined): GoInterface | undefined => {
                    return $goProviderInterfaceBridge$Named_os$Signal.$from($providerElement);
                }, void 0, void 0));
                const __gotots_results_1 = [GoProviderProfileBridge.$from(__gotots_results_0[0]), __gotots_results_0[1]] satisfies [
                    $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined,
                    (() => void) | undefined
                ];
                let ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined = __gotots_results_1[0];
                let stop: (() => void) | undefined = __gotots_results_1[1];
                const __gotots_callee_1: (() => void) | undefined = stop;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                let result = CommandLine__from_execute(ctx, new $goInterfaceAdapter$PointerTo_Named_main$osSys(newSystem()), args, void 0);
                __gotots_return_0 = result.Status.$value;
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_1) {
            if (!(__gotots_caught_1 instanceof GoPanic)) {
                throw __gotots_caught_1;
            }
            __gotots_panic_0 = __gotots_caught_1;
        }
    }
    finally {
        if (__gotots_deferred_0 !== undefined) {
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return __gotots_return_0;
}
