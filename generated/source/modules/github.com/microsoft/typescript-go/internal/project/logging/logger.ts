import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_logging$logger as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Error$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Errorf$string_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Info$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Infof$string_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$IsVerbose$void_to_bool, $goInterfaceMethod$Log$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Logf$string_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$SetVerbose$bool_to_void, $goInterfaceMethod$Verbose$void_to_Named_logging$Logger, $goInterfaceMethod$Warn$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Warnf$string_Variadic_SliceOf_Interface_void_to_void } from "../../../../../../../support/interface-methods.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface Logger extends GoInterfaceValue {
    Error($argument0: RuntimeSlice<GoInterface | undefined>): void;
    Errorf($argument0: gostring, $argument1: RuntimeSlice<GoInterface | undefined>): void;
    Info($argument0: RuntimeSlice<GoInterface | undefined>): void;
    Infof($argument0: gostring, $argument1: RuntimeSlice<GoInterface | undefined>): void;
    IsVerbose(): bool;
    Log($argument0: RuntimeSlice<GoInterface | undefined>): void;
    Logf($argument0: gostring, $argument1: RuntimeSlice<GoInterface | undefined>): void;
    SetVerbose($argument0: bool): void;
    Verbose(): Logger | undefined;
    Warn($argument0: RuntimeSlice<GoInterface | undefined>): void;
    Warnf($argument0: gostring, $argument1: RuntimeSlice<GoInterface | undefined>): void;
}
export const Logger$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Error$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Errorf$string_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Info$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Infof$string_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$IsVerbose$void_to_bool, $goInterfaceMethod$Log$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Logf$string_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$SetVerbose$bool_to_void, $goInterfaceMethod$Verbose$void_to_Named_logging$Logger, $goInterfaceMethod$Warn$Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$Warnf$string_Variadic_SliceOf_Interface_void_to_void]);
export function Logger$is(value: GoInterfaceValue | undefined): value is Logger {
    return value !== undefined && value.$go$implements(Logger$contract);
}
export class logger {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public verbose: bool, public writer: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public prefix: (() => gostring) | undefined) {
    }
    static $copy($source: logger): logger {
        return new logger(named_sync.SyncMutexOperations.$copy($source.mu), $source.verbose, $source.writer, $source.prefix);
    }
    declare private readonly then?: never;
    static Error(l: tsonicTypeScriptRuntime.Location<logger> | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        logger.Log(l, msg);
    }
    static Errorf(l: tsonicTypeScriptRuntime.Location<logger> | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        logger.Logf(l, format, args);
    }
    static Info(l: tsonicTypeScriptRuntime.Location<logger> | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        logger.Log(l, msg);
    }
    static Infof(l: tsonicTypeScriptRuntime.Location<logger> | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        logger.Logf(l, format, args);
    }
    static IsVerbose(l: tsonicTypeScriptRuntime.Location<logger> | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    if (l === undefined) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu);
                    const __gotots_receiver_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    __gotots_return_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.verbose;
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
    static Log(l: tsonicTypeScriptRuntime.Location<logger> | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (l === undefined) {
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu);
                    const __gotots_receiver_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_argument_2 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.writer;
                    const __gotots_callee_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.prefix;
                    const __gotots_argument_0 = new $goInterfaceAdapter$string((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))());
                    const __gotots_argument_1 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprint(msg));
                    const __gotots_argument_3 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_0, __gotots_argument_1]);
                    provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_2), __gotots_argument_3);
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
    }
    static Logf(l: tsonicTypeScriptRuntime.Location<logger> | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (l === undefined) {
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu);
                    const __gotots_receiver_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_argument_6 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.writer;
                    const __gotots_argument_7 = "%s %s\n";
                    const __gotots_callee_1 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.prefix;
                    const __gotots_argument_4 = new $goInterfaceAdapter$string((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))());
                    const __gotots_argument_5 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf(format, args));
                    const __gotots_argument_8 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_4, __gotots_argument_5]);
                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_6), __gotots_argument_7, __gotots_argument_8);
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
    }
    static SetVerbose(l: tsonicTypeScriptRuntime.Location<logger> | undefined, verbose: bool): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (l === undefined) {
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu);
                    const __gotots_receiver_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.verbose = verbose;
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
    }
    static Verbose(l: tsonicTypeScriptRuntime.Location<logger> | undefined): Logger | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: Logger | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (l === undefined) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu);
                    const __gotots_receiver_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (!((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<logger>).value.verbose) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    __gotots_return_0 = new GoInterfaceAdapter(l);
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
    static Warn(l: tsonicTypeScriptRuntime.Location<logger> | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        logger.Log(l, msg);
    }
    static Warnf(l: tsonicTypeScriptRuntime.Location<logger> | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        logger.Logf(l, format, args);
    }
}
export function NewNopLogger(): Logger | undefined {
    return new GoInterfaceAdapter(void 0);
}
export function formatTime(t: time__from_gostdlib.Time): gostring {
    return fmt__from_gostdlib.Sprintf("[%s]", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(t.Format("15:04:05.000"))]));
}
