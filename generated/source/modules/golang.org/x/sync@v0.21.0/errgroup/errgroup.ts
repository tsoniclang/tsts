import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../support/provider-interface-bridges.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../support/provider-interface-bridges.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoChannel } from "@gotots/runtime/channel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
export class token {
    declare private readonly $goType: void;
    public constructor() {
    }
    declare private readonly then?: never;
}
export class Group {
    declare private readonly $goType: void;
    public constructor(public cancel: (($0: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined, public wg: sync__from_gostdlib.WaitGroup, public sem: GoChannel<token> | undefined, public errOnce: sync__from_gostdlib.Once, public err: $goInterface$Interface_Method_Error_void_to_string | undefined) {
    }
    declare private readonly then?: never;
    static Go(g: Group | undefined, f: (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
        if (!((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sem === undefined)) {
            GoChannel.send((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sem, new token);
        }
        sync__from_gostdlib.WaitGroup.Add((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wg, BigInt.asIntN(64, goNumberToBigInt(1)));
        ((): void => {
            let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_0: GoPanic | undefined = undefined;
            try {
                try {
                    __gotots_return_block_0: {
                        const __gotots_receiver_0 = g;
                        __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                            Group.$go$private$errgroup$done(__gotots_receiver_0);
                        };
                        {
                            const __gotots_callee_1 = f;
                            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                            if (!(err === undefined)) {
                                sync__from_gostdlib.Once.Do((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errOnce, (): void => {
                                    (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err = err;
                                    if (!((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cancel === undefined)) {
                                        const __gotots_callee_2 = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cancel;
                                        const __gotots_argument_1 = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err;
                                        (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                                    }
                                });
                            }
                        }
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
        })();
    }
    static Wait(g: Group | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        sync__from_gostdlib.WaitGroup.Wait((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wg);
        if (!((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cancel === undefined)) {
            const __gotots_callee_4 = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cancel;
            const __gotots_argument_2 = (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err;
            (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        }
        return (g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).err;
    }
    static $go$private$errgroup$done(g: Group | undefined): void {
        if (!((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sem === undefined)) {
            GoChannel.receive((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sem)[0];
        }
        sync__from_gostdlib.WaitGroup.Done((g ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).wg);
    }
}
export function WithContext(ctx: GoInterface | undefined): [
    Group | undefined,
    GoInterface | undefined
] {
    const __gotots_argument_0 = ctx;
    const __gotots_results_0 = provider_context.ContextWithCancelCauseDirect(GoProviderProfileBridge.$to(__gotots_argument_0));
    const __gotots_callee_0 = __gotots_results_0[1];
    const __gotots_results_1 = [GoProviderProfileBridge.$from(__gotots_results_0[0]), __gotots_callee_0 === undefined ? undefined : ($argument0: $goInterface$Interface_Method_Error_void_to_string | undefined): void => {
            __gotots_callee_0($goProviderProfileBridge$Named_error$Using$Error$Direct.$to($argument0));
        }] satisfies [
        GoInterface | undefined,
        (($0: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined
    ];
    ctx = __gotots_results_1[0];
    let cancel: (($0: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined = __gotots_results_1[1];
    return [new Group(cancel, named_sync.SyncWaitGroupOperations.$zero(), undefined, named_sync.SyncOnceOperations.$zero(), void 0), ctx];
}
