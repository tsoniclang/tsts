import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$PointerTo_Named_os$File, $goInterfaceAdapter$int64, $goInterfaceAdapter$string, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_io$Writer, $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_io_fs from "@gotots/gostdlib/internal/facets/named-io-fs.js";
import * as named_os from "@gotots/gostdlib/internal/facets/named-os.js";
import * as named_runtime_pprof from "@gotots/gostdlib/internal/facets/named-runtime-pprof.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as provider_runtime_pprof from "@gotots/gostdlib/internal/facets/provider-runtime-pprof.js";
import * as recovery_io from "@gotots/gostdlib/internal/facets/recovery-io.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as io__from_gostdlib from "@gotots/gostdlib/io.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as filepath__from_gostdlib from "@gotots/gostdlib/path/filepath.js";
import * as runtime__from_gostdlib from "@gotots/gostdlib/runtime.js";
import * as pprof__from_gostdlib from "@gotots/gostdlib/runtime/pprof.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class ProfileSession {
    declare private readonly $goType: void;
    public constructor(public cpuFilePath: gostring, public memFilePath: gostring, public cpuFile: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined, public logWriter: GoInterface | undefined) {
    }
    static $copy($source: ProfileSession): ProfileSession {
        return new ProfileSession($source.cpuFilePath, $source.memFilePath, $source.cpuFile, $source.logWriter);
    }
    static $equal($left: ProfileSession, $right: ProfileSession): bool {
        return $left.cpuFilePath === $right.cpuFilePath && $left.memFilePath === $right.memFilePath &&
            tsonicTypeScriptRuntime.sameLocation($left.cpuFile, $right.cpuFile) && goInterfaceEqual($left.logWriter, $right.logWriter);
    }
    static $hash($source: ProfileSession): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.cpuFilePath));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.memFilePath));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.cpuFile));
        $hash = GoMapHash.mix($hash, $source.logWriter === undefined ? 0 : $source.logWriter.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static Stop(p: {
        value: ProfileSession;
    } | undefined): void {
        pprof__from_gostdlib.StopCPUProfile();
        const __gotots_receiver_0: ProfileSession["cpuFile"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cpuFile;
        os__from_gostdlib.File.Close(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value);
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.memFilePath !== "") {
            const __gotots_results_2 = os__from_gostdlib.Create((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.memFilePath);
            const __gotots_conversion_1 = __gotots_results_2[0];
            const __gotots_results_3 = [__gotots_conversion_1 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_1, (): os__from_gostdlib.File => {
                        return __gotots_conversion_1;
                    }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                        named_os.OsFileOperations.$assign(__gotots_conversion_1, $go$providerPointerValue);
                    }), GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let memFile: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined = __gotots_results_3[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
            if (!(err === undefined)) {
                const __gotots_argument_4 = err;
                GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
            }
            {
                const __gotots_conversion_2 = pprof__from_gostdlib.Lookup("allocs");
                const __gotots_receiver_1 = __gotots_conversion_2 === undefined ? undefined :
                    tsonicTypeScriptRuntime.boundLocation<pprof__from_gostdlib.Profile>(__gotots_conversion_2, (): pprof__from_gostdlib.Profile => {
                        return __gotots_conversion_2;
                    }, ($go$providerPointerValue: pprof__from_gostdlib.Profile): void => {
                        named_runtime_pprof.RuntimePprofProfileOperations.$assign(__gotots_conversion_2, $go$providerPointerValue);
                    });
                const __gotots_receiver_2 = __gotots_receiver_1 === void 0 ? void 0 :
                    (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<pprof__from_gostdlib.Profile>).value;
                const __gotots_argument_5 = new $goInterfaceAdapter$PointerTo_Named_os$File(memFile);
                const __gotots_argument_6 = 0;
                let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_runtime_pprof.PprofProfileWriteToDirect(__gotots_receiver_2, GoProviderProfileBridge.$to(__gotots_argument_5), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_6))));
                if (!(err__shadow_1 === undefined)) {
                    const __gotots_argument_7 = err__shadow_1;
                    GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
                }
            }
            const __gotots_receiver_3 = memFile;
            os__from_gostdlib.File.Close(__gotots_receiver_3 === void 0 ? void 0 :
                (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value);
            const __gotots_argument_8: ProfileSession["logWriter"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logWriter;
            const __gotots_argument_9 = "Memory profile: %v\n";
            const __gotots_argument_10 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.memFilePath)]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_8), __gotots_argument_9, __gotots_argument_10);
        }
        const __gotots_argument_11: ProfileSession["logWriter"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.logWriter;
        const __gotots_argument_12 = "CPU profile: %v\n";
        const __gotots_argument_13 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cpuFilePath)]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_11), __gotots_argument_12, __gotots_argument_13);
    }
}
export function BeginProfiling(profileDir: gostring, logWriter: GoInterface | undefined): {
    value: ProfileSession;
} | undefined {
    {
        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = GoProviderInterfaceBridge.$from(os__from_gostdlib.MkdirAll(profileDir, named_io_fs.IoFsFileModeValueOperations.$wrap(493)));
        if (!(err__shadow_1 === undefined)) {
            const __gotots_argument_0 = err__shadow_1;
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
    }
    let pid = globalThis.Number(BigInt.asIntN(64, os__from_gostdlib.Getpid()));
    let cpuProfilePath = filepath__from_gostdlib.Join(RuntimeSlice.literal<gostring>([profileDir, fmt__from_gostdlib.Sprintf("%d-cpuprofile.pb.gz", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(pid)]))]));
    let memProfilePath = filepath__from_gostdlib.Join(RuntimeSlice.literal<gostring>([profileDir, fmt__from_gostdlib.Sprintf("%d-memprofile.pb.gz", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(pid)]))]));
    const __gotots_results_0 = os__from_gostdlib.Create(cpuProfilePath);
    const __gotots_conversion_0 = __gotots_results_0[0];
    const __gotots_results_1 = [__gotots_conversion_0 === undefined ? undefined :
            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_0, (): os__from_gostdlib.File => {
                return __gotots_conversion_0;
            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                named_os.OsFileOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
            }), GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
        tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
    let cpuFile: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined = __gotots_results_1[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
    if (!(err === undefined)) {
        const __gotots_argument_1 = err;
        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
    }
    {
        const __gotots_argument_2 = new $goInterfaceAdapter$PointerTo_Named_os$File(cpuFile);
        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_runtime_pprof.PprofStartCPUProfileDirect(GoProviderProfileBridge.$to(__gotots_argument_2)));
        if (!(err__shadow_1 === undefined)) {
            const __gotots_argument_3 = err__shadow_1;
            GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
        }
    }
    return { value: new ProfileSession(cpuProfilePath, memProfilePath, cpuFile, logWriter) };
}
export class CPUProfiler {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public session: {
        value: ProfileSession;
    } | undefined) {
    }
    static $zero(): CPUProfiler {
        return new CPUProfiler(named_sync.SyncMutexOperations.$zero(), void 0);
    }
    static $copy($source: CPUProfiler): CPUProfiler {
        return new CPUProfiler(named_sync.SyncMutexOperations.$copy($source.mu), $source.session);
    }
    static $equal($left: CPUProfiler, $right: CPUProfiler): bool {
        return named_sync.SyncMutexOperations.$equal($left.mu, $right.mu) &&
            $left.session
                ===
                    $right.session;
    }
    static $hash($source: CPUProfiler): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.mu));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.session));
        return $hash;
    }
    declare private readonly then?: never;
    static StartCPUProfile(c: tsonicTypeScriptRuntime.Location<CPUProfiler> | undefined, profileDir: gostring): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.mu);
                    const __gotots_receiver_4 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_4, $go$recovery);
                    };
                    if (!(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.session === undefined)) {
                        __gotots_return_0 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("CPU profiling already in progress"));
                        break __gotots_return_block_0;
                    }
                    {
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = GoProviderInterfaceBridge.$from(os__from_gostdlib.MkdirAll(profileDir, named_io_fs.IoFsFileModeValueOperations.$wrap(493)));
                        if (!(err__shadow_1 === undefined)) {
                            __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create profile directory: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])));
                            break __gotots_return_block_0;
                        }
                    }
                    let cpuProfilePath = filepath__from_gostdlib.Join(RuntimeSlice.literal<gostring>([profileDir, fmt__from_gostdlib.Sprintf("%d-%d-cpuprofile.pb.gz", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(globalThis.Number(BigInt.asIntN(64, os__from_gostdlib.Getpid()))), new $goInterfaceAdapter$int64(time__from_gostdlib.Now().UnixMilli())]))]));
                    const __gotots_results_4 = os__from_gostdlib.Create(cpuProfilePath);
                    const __gotots_conversion_3 = __gotots_results_4[0];
                    const __gotots_results_5 = [__gotots_conversion_3 === undefined ? undefined :
                            tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_3, (): os__from_gostdlib.File => {
                                return __gotots_conversion_3;
                            }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                                named_os.OsFileOperations.$assign(__gotots_conversion_3, $go$providerPointerValue);
                            }), GoProviderInterfaceBridge.$from(__gotots_results_4[1])] satisfies [
                        tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined,
                        $goInterface$Interface_Method_Error_void_to_string | undefined
                    ];
                    let cpuFile: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined = __gotots_results_5[0];
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
                    if (!(err === undefined)) {
                        __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create CPU profile file: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])));
                        break __gotots_return_block_0;
                    }
                    {
                        const __gotots_argument_14 = new $goInterfaceAdapter$PointerTo_Named_os$File(cpuFile);
                        let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_runtime_pprof.PprofStartCPUProfileDirect(GoProviderProfileBridge.$to(__gotots_argument_14)));
                        if (!(err__shadow_1 === undefined)) {
                            const __gotots_receiver_5 = cpuFile;
                            os__from_gostdlib.File.Close(__gotots_receiver_5 === void 0 ? void 0 :
                                (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value);
                            os__from_gostdlib.Remove(cpuProfilePath);
                            __gotots_return_0 = GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to start CPU profile: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])));
                            break __gotots_return_block_0;
                        }
                    }
                    ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.session =
                        { value: new ProfileSession(cpuProfilePath, "", cpuFile, $goProviderInterfaceBridge$Named_io$Writer.$from(io__from_gostdlib.state.Discard)) };
                    __gotots_return_0 = void 0;
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
    static StopCPUProfile(c: tsonicTypeScriptRuntime.Location<CPUProfiler> | undefined): [
        gostring,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            gostring,
            $goInterface$Interface_Method_Error_void_to_string | undefined
        ] = ["", void 0];
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.mu);
                    const __gotots_receiver_5 = ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_5, $go$recovery);
                    };
                    if (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.session === undefined) {
                        __gotots_return_0 = ["", GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("CPU profiling not in progress"))];
                        break __gotots_return_block_0;
                    }
                    let filePath: ProfileSession["cpuFilePath"] = (((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.session ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cpuFilePath;
                    ProfileSession.Stop(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.session);
                    ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CPUProfiler>).value.session = void 0;
                    __gotots_return_0 = [filePath, void 0];
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
}
export function SaveHeapProfile(profileDir: gostring): [
    gostring,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: [
        gostring,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] = ["", void 0];
    try {
        try {
            __gotots_return_block_0: {
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = GoProviderInterfaceBridge.$from(os__from_gostdlib.MkdirAll(profileDir, named_io_fs.IoFsFileModeValueOperations.$wrap(493)));
                    if (!(err__shadow_1 === undefined)) {
                        __gotots_return_0 = ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create profile directory: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])))];
                        break __gotots_return_block_0;
                    }
                }
                let heapProfilePath = filepath__from_gostdlib.Join(RuntimeSlice.literal<gostring>([profileDir, fmt__from_gostdlib.Sprintf("%d-%d-heapprofile.pb.gz", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(globalThis.Number(BigInt.asIntN(64, os__from_gostdlib.Getpid()))), new $goInterfaceAdapter$int64(time__from_gostdlib.Now().UnixMilli())]))]));
                const __gotots_results_6 = os__from_gostdlib.Create(heapProfilePath);
                const __gotots_conversion_4 = __gotots_results_6[0];
                const __gotots_results_7 = [__gotots_conversion_4 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_4, (): os__from_gostdlib.File => {
                            return __gotots_conversion_4;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_4, $go$providerPointerValue);
                        }), GoProviderInterfaceBridge.$from(__gotots_results_6[1])] satisfies [
                    tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ];
                let heapFile: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined = __gotots_results_7[0];
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_7[1];
                if (!(err === undefined)) {
                    __gotots_return_0 = ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create heap profile file: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
                    break __gotots_return_block_0;
                }
                const __gotots_receiver_5 = heapFile;
                const __gotots_receiver_6 = __gotots_receiver_5 === void 0 ? void 0 :
                    (__gotots_receiver_5 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    recovery_io.OsFileClose(__gotots_receiver_6, $go$recovery);
                };
                runtime__from_gostdlib.GC();
                {
                    const __gotots_conversion_5 = pprof__from_gostdlib.Lookup("heap");
                    const __gotots_receiver_7 = __gotots_conversion_5 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<pprof__from_gostdlib.Profile>(__gotots_conversion_5, (): pprof__from_gostdlib.Profile => {
                            return __gotots_conversion_5;
                        }, ($go$providerPointerValue: pprof__from_gostdlib.Profile): void => {
                            named_runtime_pprof.RuntimePprofProfileOperations.$assign(__gotots_conversion_5, $go$providerPointerValue);
                        });
                    const __gotots_receiver_8 = __gotots_receiver_7 === void 0 ? void 0 :
                        (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<pprof__from_gostdlib.Profile>).value;
                    const __gotots_argument_15 = new $goInterfaceAdapter$PointerTo_Named_os$File(heapFile);
                    const __gotots_argument_16 = 0;
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_runtime_pprof.PprofProfileWriteToDirect(__gotots_receiver_8, GoProviderProfileBridge.$to(__gotots_argument_15), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_16))));
                    if (!(err__shadow_1 === undefined)) {
                        os__from_gostdlib.Remove(heapProfilePath);
                        __gotots_return_0 = ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to write heap profile: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])))];
                        break __gotots_return_block_0;
                    }
                }
                __gotots_return_0 = [heapProfilePath, void 0];
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
export function SaveAllocProfile(profileDir: gostring): [
    gostring,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_1: GoPanic | undefined = undefined;
    let __gotots_return_1: [
        gostring,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] = ["", void 0];
    try {
        try {
            __gotots_return_block_1: {
                {
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = GoProviderInterfaceBridge.$from(os__from_gostdlib.MkdirAll(profileDir, named_io_fs.IoFsFileModeValueOperations.$wrap(493)));
                    if (!(err__shadow_1 === undefined)) {
                        __gotots_return_1 = ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create profile directory: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])))];
                        break __gotots_return_block_1;
                    }
                }
                let allocProfilePath = filepath__from_gostdlib.Join(RuntimeSlice.literal<gostring>([profileDir, fmt__from_gostdlib.Sprintf("%d-%d-allocprofile.pb.gz", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(globalThis.Number(BigInt.asIntN(64, os__from_gostdlib.Getpid()))), new $goInterfaceAdapter$int64(time__from_gostdlib.Now().UnixMilli())]))]));
                const __gotots_results_8 = os__from_gostdlib.Create(allocProfilePath);
                const __gotots_conversion_6 = __gotots_results_8[0];
                const __gotots_results_9 = [__gotots_conversion_6 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<os__from_gostdlib.File>(__gotots_conversion_6, (): os__from_gostdlib.File => {
                            return __gotots_conversion_6;
                        }, ($go$providerPointerValue: os__from_gostdlib.File): void => {
                            named_os.OsFileOperations.$assign(__gotots_conversion_6, $go$providerPointerValue);
                        }), GoProviderInterfaceBridge.$from(__gotots_results_8[1])] satisfies [
                    tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined,
                    $goInterface$Interface_Method_Error_void_to_string | undefined
                ];
                let allocFile: tsonicTypeScriptRuntime.Location<os__from_gostdlib.File> | undefined = __gotots_results_9[0];
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_9[1];
                if (!(err === undefined)) {
                    __gotots_return_1 = ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to create alloc profile file: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err])))];
                    break __gotots_return_block_1;
                }
                const __gotots_receiver_9 = allocFile;
                const __gotots_receiver_10 = __gotots_receiver_9 === void 0 ? void 0 :
                    (__gotots_receiver_9 as tsonicTypeScriptRuntime.Location<os__from_gostdlib.File>).value;
                __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                    recovery_io.OsFileClose(__gotots_receiver_10, $go$recovery);
                };
                {
                    const __gotots_conversion_7 = pprof__from_gostdlib.Lookup("allocs");
                    const __gotots_receiver_11 = __gotots_conversion_7 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<pprof__from_gostdlib.Profile>(__gotots_conversion_7, (): pprof__from_gostdlib.Profile => {
                            return __gotots_conversion_7;
                        }, ($go$providerPointerValue: pprof__from_gostdlib.Profile): void => {
                            named_runtime_pprof.RuntimePprofProfileOperations.$assign(__gotots_conversion_7, $go$providerPointerValue);
                        });
                    const __gotots_receiver_12 = __gotots_receiver_11 === void 0 ? void 0 :
                        (__gotots_receiver_11 as tsonicTypeScriptRuntime.Location<pprof__from_gostdlib.Profile>).value;
                    const __gotots_argument_17 = new $goInterfaceAdapter$PointerTo_Named_os$File(allocFile);
                    const __gotots_argument_18 = 0;
                    let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = $goProviderProfileBridge$Named_error$Using$Error$Direct.$from(provider_runtime_pprof.PprofProfileWriteToDirect(__gotots_receiver_12, GoProviderProfileBridge.$to(__gotots_argument_17), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_18))));
                    if (!(err__shadow_1 === undefined)) {
                        os__from_gostdlib.Remove(allocProfilePath);
                        __gotots_return_1 = ["", GoProviderInterfaceBridge.$from(fmt__from_gostdlib.Errorf("failed to write alloc profile: %w", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err__shadow_1])))];
                        break __gotots_return_block_1;
                    }
                }
                __gotots_return_1 = [allocProfilePath, void 0];
                break __gotots_return_block_1;
            }
        }
        catch (__gotots_caught_3) {
            if (!(__gotots_caught_3 instanceof GoPanic)) {
                throw __gotots_caught_3;
            }
            __gotots_panic_1 = __gotots_caught_3;
        }
    }
    finally {
        if (__gotots_deferred_1 !== undefined) {
            const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
            try {
                __gotots_deferred_1(__gotots_recovery_1);
                if (__gotots_recovery_1.recovered()) {
                    __gotots_panic_1 = undefined;
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_1 = __gotots_caught_2;
            }
        }
    }
    if (__gotots_panic_1 !== undefined) {
        throw __gotots_panic_1;
    }
    return __gotots_return_1;
}
export function RunGC(): void {
    runtime__from_gostdlib.GC();
}
