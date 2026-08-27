import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { LibPath as LibPath__from_bundled, WrapFS as WrapFS__from_bundled } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/bundled/package.js";
import { NewServer as NewServer__from_lsp, ServerOptions as ServerOptions__from_lsp, Server as Server__from_lsp, ToReader as ToReader__from_lsp, ToWriter as ToWriter__from_lsp } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/package.js";
import { BeginProfiling as BeginProfiling__from_pprof, ProfileSession as ProfileSession__from_pprof } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pprof/package.js";
import { FS as FS__from_osvfs, GetGlobalTypingsCacheLocation as GetGlobalTypingsCacheLocation__from_osvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/osvfs/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Must$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Must.js";
import { $goInterfaceAdapter$Named_syscall$Signal, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_os$File as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_context$Context, $goProviderInterfaceBridge$Named_os$Signal, $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct, $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { isProcessAlive } from "./isprocessalive_unix.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as flag__from_gostdlib from "@gotots/gostdlib/flag.js";
import * as named_flag from "@gotots/gostdlib/internal/facets/named-flag.js";
import * as named_os_exec from "@gotots/gostdlib/internal/facets/named-os-exec.js";
import * as named_os from "@gotots/gostdlib/internal/facets/named-os.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as provider_os_signal from "@gotots/gostdlib/internal/facets/provider-os-signal.js";
import * as recovery_value from "@gotots/gostdlib/internal/facets/recovery-value.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as exec__from_gostdlib from "@gotots/gostdlib/os/exec.js";
import * as syscall__from_gostdlib from "@gotots/gostdlib/syscall.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { GoChannel, goSelect } from "@gotots/runtime/channel.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, RuntimeSliceProjection } from "@gotots/runtime/slice.js";
export function runLSP(args: RuntimeSlice<gostring>): int {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: int = 0;
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_conversion_0 = flag__from_gostdlib.NewFlagSet("lsp", flag__from_gostdlib.ContinueOnError);
                let flag__shadow_1: tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet> | undefined = __gotots_conversion_0 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<flag__from_gostdlib.FlagSet>(__gotots_conversion_0, (): flag__from_gostdlib.FlagSet => {
                        return __gotots_conversion_0;
                    }, ($go$providerPointerValue: flag__from_gostdlib.FlagSet): void => {
                        named_flag.FlagSetValueOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                    });
                const __gotots_receiver_0 = flag__shadow_1;
                const __gotots_conversion_1 = flag__from_gostdlib.FlagSet.Bool(__gotots_receiver_0 === void 0 ? void 0 :
                    (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, "stdio", false, "use stdio for communication");
                let stdio: tsonicTypeScriptRuntime.Location<bool> | undefined = __gotots_conversion_1 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<bool>(__gotots_conversion_1, (): bool => {
                        return __gotots_conversion_1.value;
                    }, ($go$providerPointerValue: bool): void => {
                        __gotots_conversion_1.value = $go$providerPointerValue;
                    });
                const __gotots_receiver_1 = flag__shadow_1;
                const __gotots_conversion_2 = flag__from_gostdlib.FlagSet.String(__gotots_receiver_1 === void 0 ? void 0 :
                    (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, "pprofDir", "", "Generate pprof CPU/memory profiles to the given directory.");
                let pprofDir: tsonicTypeScriptRuntime.Location<gostring> | undefined = __gotots_conversion_2 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<gostring>(__gotots_conversion_2, (): gostring => {
                        return __gotots_conversion_2.value;
                    }, ($go$providerPointerValue: gostring): void => {
                        __gotots_conversion_2.value = $go$providerPointerValue;
                    });
                const __gotots_receiver_2 = flag__shadow_1;
                const __gotots_conversion_3 = flag__from_gostdlib.FlagSet.String(__gotots_receiver_2 === void 0 ? void 0 :
                    (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, "pipe", "", "use named pipe for communication");
                let pipe: tsonicTypeScriptRuntime.Location<gostring> | undefined = __gotots_conversion_3 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<gostring>(__gotots_conversion_3, (): gostring => {
                        return __gotots_conversion_3.value;
                    }, ($go$providerPointerValue: gostring): void => {
                        __gotots_conversion_3.value = $go$providerPointerValue;
                    });
                pipe;
                const __gotots_receiver_3 = flag__shadow_1;
                const __gotots_conversion_4 = flag__from_gostdlib.FlagSet.String(__gotots_receiver_3 === void 0 ? void 0 :
                    (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, "socket", "", "use socket for communication");
                let socket: tsonicTypeScriptRuntime.Location<gostring> | undefined = __gotots_conversion_4 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<gostring>(__gotots_conversion_4, (): gostring => {
                        return __gotots_conversion_4.value;
                    }, ($go$providerPointerValue: gostring): void => {
                        __gotots_conversion_4.value = $go$providerPointerValue;
                    });
                socket;
                {
                    const __gotots_receiver_4 = flag__shadow_1;
                    let err: GoInterface | undefined = GoProviderInterfaceBridge.$from(flag__from_gostdlib.FlagSet.Parse(__gotots_receiver_4 === void 0 ? void 0 :
                        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<flag__from_gostdlib.FlagSet>).value, args));
                    if (!(err === undefined)) {
                        __gotots_return_0 = 2;
                        break __gotots_return_block_0;
                    }
                }
                if (!((stdio ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value) {
                    const __gotots_conversion_5 = os__from_gostdlib.state.Stderr;
                    const __gotots_argument_0 = new GoInterfaceAdapter(__gotots_conversion_5 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_5, (): os__from_gostdlib.File => {
                            return __gotots_conversion_5;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_5, $go$providerPointerValue);
                        }));
                    const __gotots_argument_1 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("only stdio is supported")]);
                    provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1);
                    __gotots_return_0 = 1;
                    break __gotots_return_block_0;
                }
                if (((pprofDir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value
                    !== "") {
                    const __gotots_conversion_6 = os__from_gostdlib.state.Stderr;
                    const __gotots_argument_2 = new GoInterfaceAdapter(__gotots_conversion_6 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_6, (): os__from_gostdlib.File => {
                            return __gotots_conversion_6;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_6, $go$providerPointerValue);
                        }));
                    const __gotots_argument_3 = "pprof profiles will be written to: %v\n";
                    const __gotots_argument_4 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(((pprofDir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value)]);
                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_2), __gotots_argument_3, __gotots_argument_4);
                    const __gotots_argument_5 = ((pprofDir ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value;
                    const __gotots_conversion_7 = os__from_gostdlib.state.Stderr;
                    const __gotots_argument_6 = new GoInterfaceAdapter(__gotots_conversion_7 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_7, (): os__from_gostdlib.File => {
                            return __gotots_conversion_7;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_7, $go$providerPointerValue);
                        }));
                    let profileSession: {
                        value: ProfileSession__from_pprof;
                    } | undefined = BeginProfiling__from_pprof(__gotots_argument_5, __gotots_argument_6);
                    const __gotots_receiver_5 = profileSession;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        ProfileSession__from_pprof.Stop(__gotots_receiver_5);
                    });
                }
                let fs: FS__from_vfs | undefined = WrapFS__from_bundled(FS__from_osvfs());
                let defaultLibraryPath = LibPath__from_bundled();
                let typingsLocation = GetGlobalTypingsCacheLocation__from_osvfs();
                const __gotots_argument_7 = $goProviderInterfaceBridge$Named_context$Context.$from(context__from_gostdlib.Background());
                const __gotots_argument_8 = RuntimeSlice.literal<$goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined>([$goProviderInterfaceBridge$Named_os$Signal.$from(os__from_gostdlib.state.Interrupt), new $goInterfaceAdapter$Named_syscall$Signal(syscall__from_gostdlib.SIGTERM)]);
                const __gotots_results_0 = provider_os_signal.OsSignalNotifyContextDirect($goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$to(__gotots_argument_7), new RuntimeSliceProjection<$goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined, $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined>(__gotots_argument_8, ($productElement: $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined): $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined => {
                    return $goProviderInterfaceBridge$Named_os$Signal.$to($productElement);
                }, ($providerElement: $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined): $goInterface$Interface_Method_os$Signal_void_to_void_Method_os$String_void_to_string | undefined => {
                    return $goProviderInterfaceBridge$Named_os$Signal.$from($providerElement);
                }, void 0, void 0));
                const __gotots_results_1 = [$goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct.$from(__gotots_results_0[0]), __gotots_results_0[1]] satisfies [
                    $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined,
                    (() => void) | undefined
                ];
                let ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined = __gotots_results_1[0];
                let stop: (() => void) | undefined = __gotots_results_1[1];
                const __gotots_callee_1: (() => void) | undefined = stop;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                });
                const __gotots_conversion_8 = os__from_gostdlib.state.Stdin;
                const __gotots_argument_9 = new GoInterfaceAdapter(__gotots_conversion_8 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_8, (): os__from_gostdlib.File => {
                        return __gotots_conversion_8;
                    }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                        named_os.OsFileOperations.$assign(__gotots_conversion_8, $go$providerPointerValue);
                    }));
                const __gotots_field_0 = ToReader__from_lsp(__gotots_argument_9);
                const __gotots_conversion_9 = os__from_gostdlib.state.Stdout;
                const __gotots_argument_10 = new GoInterfaceAdapter(__gotots_conversion_9 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_9, (): os__from_gostdlib.File => {
                        return __gotots_conversion_9;
                    }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                        named_os.OsFileOperations.$assign(__gotots_conversion_9, $go$providerPointerValue);
                    }));
                const __gotots_field_1 = ToWriter__from_lsp(__gotots_argument_10);
                const __gotots_conversion_10 = os__from_gostdlib.state.Stderr;
                const __gotots_field_2 = new GoInterfaceAdapter(__gotots_conversion_10 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_10, (): os__from_gostdlib.File => {
                        return __gotots_conversion_10;
                    }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                        named_os.OsFileOperations.$assign(__gotots_conversion_10, $go$providerPointerValue);
                    }));
                const __gotots_results_2 = os__from_gostdlib.Getwd();
                const __gotots_results_3 = [__gotots_results_2[0], GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                    gostring,
                    GoInterface | undefined
                ];
                const __gotots_field_3 = Must$string(__gotots_results_3[0], __gotots_results_3[1]);
                const __gotots_argument_11 = new ServerOptions__from_lsp(__gotots_field_0, __gotots_field_1, __gotots_field_2, __gotots_field_3, fs, defaultLibraryPath, typingsLocation, void 0, (cwd: gostring, args__shadow_1: RuntimeSlice<gostring>): [
                    RuntimeSlice<uint8>,
                    GoInterface | undefined
                ] => {
                    const __gotots_conversion_11 = exec__from_gostdlib.Command("npm", args__shadow_1);
                    let cmd: tsonicTypeScriptRuntime.Location<exec__from_gostdlib.Cmd> | undefined = __gotots_conversion_11 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<exec__from_gostdlib.Cmd>(__gotots_conversion_11, (): exec__from_gostdlib.Cmd => {
                            return __gotots_conversion_11;
                        }, ($go$providerPointerValue: exec__from_gostdlib.Cmd): void => {
                            named_os_exec.OsExecCmdOperations.$assign(__gotots_conversion_11, $go$providerPointerValue);
                        });
                    ((cmd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<exec__from_gostdlib.Cmd>).value.Dir = cwd;
                    const __gotots_receiver_6 = cmd;
                    const __gotots_results_4 = exec__from_gostdlib.Cmd.Output(__gotots_receiver_6 === void 0 ? void 0 :
                        (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<exec__from_gostdlib.Cmd>).value);
                    return [__gotots_results_4[0], GoProviderInterfaceBridge.$from(__gotots_results_4[1])] satisfies [
                        RuntimeSlice<uint8>,
                        GoInterface | undefined
                    ];
                }, named_time.TimeDurationValueOperations.$wrap(250000000n), newParentProcessWatchdog(ctx, stop));
                let s: {
                    value: Server__from_lsp;
                } | undefined = NewServer__from_lsp(__gotots_argument_11);
                {
                    let err: GoInterface | undefined = Server__from_lsp.Run(s, ctx);
                    if (!(err === undefined)) {
                        const __gotots_conversion_12 = os__from_gostdlib.state.Stderr;
                        const __gotots_argument_12 = new GoInterfaceAdapter(__gotots_conversion_12 === undefined ? undefined :
                            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_12, (): os__from_gostdlib.File => {
                                return __gotots_conversion_12;
                            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                                named_os.OsFileOperations.$assign(__gotots_conversion_12, $go$providerPointerValue);
                            }));
                        const __gotots_argument_13 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
                        provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_12), __gotots_argument_13);
                        __gotots_return_0 = 1;
                        break __gotots_return_block_0;
                    }
                }
                __gotots_return_0 = 0;
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_0) {
            if (!(__gotots_caught_0 instanceof GoPanic)) {
                throw __gotots_caught_0;
            }
            __gotots_panic_0 = __gotots_caught_0;
        }
    }
    finally {
        while (__gotots_defers_0.length !== 0) {
            const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return __gotots_return_0;
}
export function newParentProcessWatchdog(ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, stop: (() => void) | undefined): (($0: int) => void) | undefined {
    if (false) {
        return void 0;
    }
    return (parentPID: int): void => {
        startParentProcessWatchdog(ctx, stop, parentPID);
    };
}
export function startParentProcessWatchdog(ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, stop: (() => void) | undefined, parentPID: int): void {
    if (parentPID <= 0) {
        return;
    }
    ((): void => {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_conversion_13 = time__from_gostdlib.NewTicker(named_time.TimeDurationValueOperations.$wrap(5000000000n));
                    let ticker: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker> | undefined = __gotots_conversion_13 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<time__from_gostdlib.Ticker>(__gotots_conversion_13, (): time__from_gostdlib.Ticker => {
                            return __gotots_conversion_13;
                        }, ($go$providerPointerValue: time__from_gostdlib.Ticker): void => {
                            named_time.TimeTickerOperations.$assign(__gotots_conversion_13, $go$providerPointerValue);
                        });
                    const __gotots_receiver_6 = ticker;
                    const __gotots_receiver_7 = __gotots_receiver_6 === void 0 ? void 0 :
                        (__gotots_receiver_6 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker>).value;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_value.TimeTickerStop(__gotots_receiver_7, $go$recovery);
                    };
                    for (;;) {
                        const __gotots_receiver_8 = ctx;
                        const __gotots_channel_0 = goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_8).Done();
                        const __gotots_channel_1 = (value: GoEmptyStruct, ok: boolean): void => {
                            __gotots_receive_0 = [value, ok];
                        };
                        let __gotots_receive_0: [
                            GoEmptyStruct,
                            boolean
                        ] | undefined = undefined;
                        const __gotots_select_0 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
                        let __gotots_receive_1: [
                            time__from_gostdlib.Time,
                            boolean
                        ] | undefined = undefined;
                        const __gotots_select_1 = GoChannel.$selectReceive(((ticker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker>).value.C, (value: time__from_gostdlib.Time, ok: boolean): void => {
                            __gotots_receive_1 = [value, ok];
                        });
                        const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1]);
                        switch (__gotots_switch_selection_0) {
                            case 0: {
                                break __gotots_return_block_0;
                                break;
                            }
                            case 1: {
                                if (!isProcessAlive(parentPID)) {
                                    const __gotots_conversion_14 = os__from_gostdlib.state.Stderr;
                                    const __gotots_argument_14 = new GoInterfaceAdapter(__gotots_conversion_14 === undefined ? undefined :
                                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_14, (): os__from_gostdlib.File => {
                                            return __gotots_conversion_14;
                                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                                            named_os.OsFileOperations.$assign(__gotots_conversion_14, $go$providerPointerValue);
                                        }));
                                    const __gotots_argument_15 = "Parent process %d has exited, shutting down.\n";
                                    const __gotots_argument_16 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(parentPID)]);
                                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_14), __gotots_argument_15, __gotots_argument_16);
                                    const __gotots_callee_1 = stop;
                                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                                    break __gotots_return_block_0;
                                }
                                break;
                            }
                            default: GoPanic.raiseRuntime("select returned an invalid case");
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
