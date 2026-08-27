import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { NewStdioServer as NewStdioServer__from_api, StdioServerOptions as StdioServerOptions__from_api, StdioServer as StdioServer__from_api } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/api/package.js";
import { LibPath as LibPath__from_bundled } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/bundled/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Must$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Must.js";
import { $goInterfaceAdapter$Named_syscall$Signal, $goInterfaceAdapter$PointerTo_Named_os$File as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_context$Context, $goProviderInterfaceBridge$Named_os$Signal, $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as flag__from_gostdlib from "@gotots/gostdlib/flag.js";
import * as named_flag from "@gotots/gostdlib/internal/facets/named-flag.js";
import * as named_os from "@gotots/gostdlib/internal/facets/named-os.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as provider_os_signal from "@gotots/gostdlib/internal/facets/provider-os-signal.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as syscall__from_gostdlib from "@gotots/gostdlib/syscall.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, RuntimeSliceProjection } from "@gotots/runtime/slice.js";
export function runAPI(args: RuntimeSlice<gostring>): int {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: int = 0;
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_conversion_0 = flag__from_gostdlib.NewFlagSet("api", flag__from_gostdlib.ContinueOnError);
                let flag__shadow_1: tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet> | undefined = __gotots_conversion_0 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<flag__from_gostdlib.FlagSet>(__gotots_conversion_0, (): flag__from_gostdlib.FlagSet => {
                        return __gotots_conversion_0;
                    }, ($go$providerPointerValue: flag__from_gostdlib.FlagSet): void => {
                        named_flag.FlagSetValueOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                    });
                const __gotots_receiver_0 = flag__shadow_1;
                const __gotots_receiver_1 = __gotots_receiver_0 === void 0 ? void 0 :
                    (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value;
                const __gotots_argument_0 = "cwd";
                const __gotots_results_0 = os__from_gostdlib.Getwd();
                const __gotots_results_1 = [__gotots_results_0[0], GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
                    gostring,
                    GoInterface | undefined
                ];
                const __gotots_argument_1 = Must$string(__gotots_results_1[0], __gotots_results_1[1]);
                const __gotots_argument_2 = "current working directory";
                const __gotots_conversion_1 = flag__from_gostdlib.FlagSet.String(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
                let cwd: tsonicTypeScriptRuntime.Location<gostring> | undefined = __gotots_conversion_1 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<gostring>(__gotots_conversion_1, (): gostring => {
                        return __gotots_conversion_1.value;
                    }, ($go$providerPointerValue: gostring): void => {
                        __gotots_conversion_1.value = $go$providerPointerValue;
                    });
                const __gotots_receiver_2 = flag__shadow_1;
                const __gotots_conversion_2 = flag__from_gostdlib.FlagSet.String(__gotots_receiver_2 === void 0 ? void 0 :
                    (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, "pipe", "", "use named pipe or Unix domain socket for communication instead of stdio");
                let pipePath: tsonicTypeScriptRuntime.Location<gostring> | undefined = __gotots_conversion_2 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<gostring>(__gotots_conversion_2, (): gostring => {
                        return __gotots_conversion_2.value;
                    }, ($go$providerPointerValue: gostring): void => {
                        __gotots_conversion_2.value = $go$providerPointerValue;
                    });
                const __gotots_receiver_3 = flag__shadow_1;
                const __gotots_conversion_3 = flag__from_gostdlib.FlagSet.String(__gotots_receiver_3 === void 0 ? void 0 :
                    (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, "callbacks", "", "comma-separated list of FS callbacks to enable (readFile,fileExists,directoryExists,getAccessibleEntries,realpath)");
                let callbacks: tsonicTypeScriptRuntime.Location<gostring> | undefined = __gotots_conversion_3 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<gostring>(__gotots_conversion_3, (): gostring => {
                        return __gotots_conversion_3.value;
                    }, ($go$providerPointerValue: gostring): void => {
                        __gotots_conversion_3.value = $go$providerPointerValue;
                    });
                const __gotots_receiver_4 = flag__shadow_1;
                const __gotots_conversion_4 = flag__from_gostdlib.FlagSet.Bool(__gotots_receiver_4 === void 0 ? void 0 :
                    (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, "async", false, "use JSON-RPC protocol instead of MessagePack (for async API)");
                let __go_async: tsonicTypeScriptRuntime.Location<bool> | undefined = __gotots_conversion_4 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<bool>(__gotots_conversion_4, (): bool => {
                        return __gotots_conversion_4.value;
                    }, ($go$providerPointerValue: bool): void => {
                        __gotots_conversion_4.value = $go$providerPointerValue;
                    });
                {
                    const __gotots_receiver_5 = flag__shadow_1;
                    let err: GoInterface | undefined = GoProviderInterfaceBridge.$from(flag__from_gostdlib.FlagSet.Parse(__gotots_receiver_5 === void 0 ? void 0 :
                        (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, args));
                    if (!(err === undefined)) {
                        __gotots_return_0 = 2;
                        break __gotots_return_block_0;
                    }
                }
                let defaultLibraryPath = LibPath__from_bundled();
                let callbacksList = RuntimeSlice.nil<gostring>();
                if (((callbacks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value
                    !== "") {
                    callbacksList = strings__from_gostdlib.Split(((callbacks ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value, ",");
                }
                const __gotots_conversion_5 = os__from_gostdlib.state.Stderr;
                const __gotots_field_0 = new GoInterfaceAdapter(__gotots_conversion_5 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_5, (): os__from_gostdlib.File => {
                        return __gotots_conversion_5;
                    }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                        named_os.OsFileOperations.$assign(__gotots_conversion_5, $go$providerPointerValue);
                    }));
                let options: StdioServerOptions__from_api | undefined = new StdioServerOptions__from_api(void 0, void 0, __gotots_field_0, ((cwd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value, defaultLibraryPath, "", callbacksList, ((__go_async ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value);
                if (((pipePath ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value
                    !== "") {
                    (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PipePath =
                        ((pipePath ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
                }
                else {
                    const __gotots_conversion_6 = os__from_gostdlib.state.Stdin;
                    (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).In = new GoInterfaceAdapter(__gotots_conversion_6 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_6, (): os__from_gostdlib.File => {
                            return __gotots_conversion_6;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_6, $go$providerPointerValue);
                        }));
                    const __gotots_conversion_7 = os__from_gostdlib.state.Stdout;
                    (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Out = new GoInterfaceAdapter(__gotots_conversion_7 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_7, (): os__from_gostdlib.File => {
                            return __gotots_conversion_7;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_7, $go$providerPointerValue);
                        }));
                }
                let s: StdioServer__from_api | undefined = NewStdioServer__from_api(options);
                const __gotots_argument_3 = $goProviderInterfaceBridge$Named_context$Context.$from(context__from_gostdlib.Background());
                const __gotots_argument_4 = RuntimeSlice.literal<$goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined>([$goProviderInterfaceBridge$Named_os$Signal.$from(os__from_gostdlib.state.Interrupt), new $goInterfaceAdapter$Named_syscall$Signal(syscall__from_gostdlib.SIGTERM)]);
                const __gotots_results_2 = provider_os_signal.OsSignalNotifyContextDirect(GoProviderProfileBridge.$to(__gotots_argument_3), new RuntimeSliceProjection<$goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined>(__gotots_argument_4, ($productElement: $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined): $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined => {
                    return $goProviderInterfaceBridge$Named_os$Signal.$to($productElement);
                }, ($providerElement: $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined): $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined => {
                    return $goProviderInterfaceBridge$Named_os$Signal.$from($providerElement);
                }, void 0, void 0));
                const __gotots_results_3 = [GoProviderProfileBridge.$from(__gotots_results_2[0]), __gotots_results_2[1]] satisfies [
                    $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined,
                    (() => void) | undefined
                ];
                let ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined = __gotots_results_3[0];
                let stop: (() => void) | undefined = __gotots_results_3[1];
                const __gotots_callee_1: (() => void) | undefined = stop;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                {
                    let err: GoInterface | undefined = StdioServer__from_api.Run(s, ctx);
                    if (!(err === undefined)) {
                        const __gotots_conversion_8 = os__from_gostdlib.state.Stderr;
                        const __gotots_argument_5 = new GoInterfaceAdapter(__gotots_conversion_8 === undefined ? undefined :
                            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_8, (): os__from_gostdlib.File => {
                                return __gotots_conversion_8;
                            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                                named_os.OsFileOperations.$assign(__gotots_conversion_8, $go$providerPointerValue);
                            }));
                        const __gotots_argument_6 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                        provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract>($goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct.$to(__gotots_argument_5), __gotots_argument_6);
                        __gotots_return_0 = 1;
                        break __gotots_return_block_0;
                    }
                }
                __gotots_return_0 = 0;
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
