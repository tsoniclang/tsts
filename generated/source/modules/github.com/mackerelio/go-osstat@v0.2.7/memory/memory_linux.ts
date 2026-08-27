import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../support/provider-interface-bridges.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, uint64 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_os$File as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_PointerTo_uint64 as GoMap } from "../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Reader$Using$Error$Direct$And$io_Reader$Direct as GoProviderProfileBridge } from "../../../../../support/provider-interface-bridges.js";
import { $goProviderState$Named_bufio$Scanner as GoProviderState } from "../../../../../support/provider-stateful-representations.js";
import * as bufio__from_gostdlib from "@gotots/gostdlib/bufio.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_os from "@gotots/gostdlib/internal/facets/named-os.js";
import * as provider_bufio_scanner from "@gotots/gostdlib/internal/facets/provider-bufio-scanner.js";
import * as recovery_io from "@gotots/gostdlib/internal/facets/recovery-io.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goUint64 } from "@gotots/runtime/integer.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function Get(): [
    Stats | undefined,
    GoInterface | undefined
] {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        Stats | undefined,
        GoInterface | undefined
    ] = [void 0, void 0];
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_results_0 = os__from_gostdlib.Open("/proc/meminfo");
                const __gotots_conversion_0 = __gotots_results_0[0];
                const __gotots_results_1 = [__gotots_conversion_0 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_0, (): os__from_gostdlib.File => {
                            return __gotots_conversion_0;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                        }), GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
                    tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined,
                    GoInterface | undefined
                ];
                let file: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined = __gotots_results_1[0];
                let err: GoInterface | undefined = __gotots_results_1[1];
                if (!(err === undefined)) {
                    __gotots_return_0 = [void 0, err];
                    break __gotots_return_block_0;
                }
                const __gotots_receiver_0 = file;
                const __gotots_receiver_1 = __gotots_receiver_0 === void 0 ? void 0 :
                    (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    recovery_io.OsFileClose(__gotots_receiver_1, $go$recovery);
                };
                __gotots_return_0 = collectMemoryStats(new GoInterfaceAdapter(file));
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
export class Stats {
    declare private readonly $goType: void;
    public constructor(public Total: uint64, public Used: uint64, public Buffers: uint64, public Cached: uint64, public Free: uint64, public Available: uint64, public Active: uint64, public Inactive: uint64, public SwapTotal: uint64, public SwapUsed: uint64, public SwapCached: uint64, public SwapFree: uint64, public Mapped: uint64, public Shmem: uint64, public Slab: uint64, public PageTables: uint64, public Committed: uint64, public VmallocUsed: uint64, public MemAvailableEnabled: bool) {
    }
    static $zero(): Stats {
        return new Stats(0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, 0n, false);
    }
    declare private readonly then?: never;
}
export function collectMemoryStats(__go_out: $goInterface$Interface_Method_io$Read_SliceOf_byte_to_int_Named_error | undefined): [
    Stats | undefined,
    GoInterface | undefined
] {
    const __gotots_argument_0 = __go_out;
    const __gotots_conversion_1 = provider_bufio_scanner.NewScannerDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(bufio__from_gostdlib.state.ErrBadReadCount)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(bufio__from_gostdlib.state.ErrTooLong)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.EOF)), $goProviderProfileBridge$Named_error$Using$Error$Direct.$to(GoProviderInterfaceBridge.$from(io__from_gostdlib.state.ErrNoProgress)));
    let scanner: tsonicTypeScriptRuntime.Location<GoProviderState> | undefined = __gotots_conversion_1 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<GoProviderState>(__gotots_conversion_1, (): GoProviderState => {
            return __gotots_conversion_1;
        }, ($go$providerPointerValue: GoProviderState): void => {
            GoProviderState.$assign(__gotots_conversion_1, $go$providerPointerValue);
        });
    let memory = Stats.$zero();
    const __gotots_map_0 = "MemTotal";
    const __gotots_store_0 = memory;
    const __gotots_map_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Total");
    const __gotots_map_2 = "MemFree";
    const __gotots_store_1 = memory;
    const __gotots_map_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Free");
    const __gotots_map_4 = "MemAvailable";
    const __gotots_store_2 = memory;
    const __gotots_map_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Available");
    const __gotots_map_6 = "Buffers";
    const __gotots_store_3 = memory;
    const __gotots_map_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Buffers");
    const __gotots_map_8 = "Cached";
    const __gotots_store_4 = memory;
    const __gotots_map_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Cached");
    const __gotots_map_10 = "Active";
    const __gotots_store_5 = memory;
    const __gotots_map_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Active");
    const __gotots_map_12 = "Inactive";
    const __gotots_store_6 = memory;
    const __gotots_map_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Inactive");
    const __gotots_map_14 = "SwapCached";
    const __gotots_store_7 = memory;
    const __gotots_map_15 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "SwapCached");
    const __gotots_map_16 = "SwapTotal";
    const __gotots_store_8 = memory;
    const __gotots_map_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "SwapTotal");
    const __gotots_map_18 = "SwapFree";
    const __gotots_store_9 = memory;
    const __gotots_map_19 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "SwapFree");
    const __gotots_map_20 = "Mapped";
    const __gotots_store_10 = memory;
    const __gotots_map_21 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Mapped");
    const __gotots_map_22 = "Shmem";
    const __gotots_store_11 = memory;
    const __gotots_map_23 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Shmem");
    const __gotots_map_24 = "Slab";
    const __gotots_store_12 = memory;
    const __gotots_map_25 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Slab");
    const __gotots_map_26 = "PageTables";
    const __gotots_store_13 = memory;
    const __gotots_map_27 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "PageTables");
    const __gotots_map_28 = "Committed_AS";
    const __gotots_store_14 = memory;
    const __gotots_map_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Committed");
    const __gotots_map_30 = "VmallocUsed";
    const __gotots_store_15 = memory;
    const __gotots_map_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "VmallocUsed");
    let memStats: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<uint64> | undefined> = GoMap.make(16, [[__gotots_map_0, __gotots_map_1], [__gotots_map_2, __gotots_map_3], [__gotots_map_4, __gotots_map_5], [__gotots_map_6, __gotots_map_7], [__gotots_map_8, __gotots_map_9], [__gotots_map_10, __gotots_map_11], [__gotots_map_12, __gotots_map_13], [__gotots_map_14, __gotots_map_15], [__gotots_map_16, __gotots_map_17], [__gotots_map_18, __gotots_map_19], [__gotots_map_20, __gotots_map_21], [__gotots_map_22, __gotots_map_23], [__gotots_map_24, __gotots_map_25], [__gotots_map_26, __gotots_map_27], [__gotots_map_28, __gotots_map_29], [__gotots_map_30, __gotots_map_31]]);
    {
        for (;;) {
            const __gotots_receiver_0 = scanner;
            if (!GoProviderState.Scan(__gotots_receiver_0 === void 0 ? void 0 :
                (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<GoProviderState>).value)) {
                break;
            }
            {
                const __gotots_receiver_1 = scanner;
                let line = GoProviderState.Text(__gotots_receiver_1 === void 0 ? void 0 :
                    (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<GoProviderState>).value);
                let i = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexRune(line, 58)));
                if (i < 0) {
                    continue;
                }
                let fld = goStringSlice(line, 0, i);
                {
                    let ptr: tsonicTypeScriptRuntime.Location<uint64> | undefined = memStats.lookup(fld);
                    if (!(ptr === undefined)) {
                        let val = strings__from_gostdlib.TrimSpace(strings__from_gostdlib.TrimRight(goStringSlice(line, i + 1), "kB"));
                        {
                            const __gotots_results_2 = strconv__from_gostdlib.ParseUint(val, BigInt.asIntN(64, goNumberToBigInt(10)), BigInt.asIntN(64, goNumberToBigInt(64)));
                            const __gotots_results_3 = [__gotots_results_2[0], GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                                uint64,
                                GoInterface | undefined
                            ];
                            let v = __gotots_results_3[0];
                            let err: GoInterface | undefined = __gotots_results_3[1];
                            if (err === undefined) {
                                void ((ptr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                                    goUint64(v * 1024n));
                            }
                        }
                        if (fld === "MemAvailable") {
                            memory.MemAvailableEnabled = true;
                        }
                    }
                }
            }
        }
    }
    {
        const __gotots_receiver_2 = scanner;
        let err: GoInterface | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(GoProviderState.Err(__gotots_receiver_2 === void 0 ? void 0 :
            (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<GoProviderState>).value));
        if (!(err === undefined)) {
            return [void 0, GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("scan error for /proc/meminfo: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
        }
    }
    memory.SwapUsed = goUint64(memory.SwapTotal - memory.SwapFree);
    if (memory.MemAvailableEnabled) {
        memory.Used = goUint64(memory.Total - memory.Available);
    }
    else {
        memory.Used = goUint64(goUint64(goUint64(memory.Total - memory.Free) - memory.Buffers) - memory.Cached);
    }
    return [memory, void 0];
}
