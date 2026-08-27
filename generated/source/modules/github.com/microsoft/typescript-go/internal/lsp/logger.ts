import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { LogVerbosity as LogVerbosity__from_lsproto, MessageType as MessageType__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { Logger as Logger__from_logging } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/project/logging/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { Server } from "./server.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $state as $state__lsproto, LogMessageParams as LogMessageParams__from_lsproto, LogVerbosityDebug$constant as LogVerbosityDebug$constant__from_lsproto, LogVerbosityError$constant as LogVerbosityError$constant__from_lsproto, LogVerbosityInfo$constant as LogVerbosityInfo$constant__from_lsproto, LogVerbosityOff$constant as LogVerbosityOff$constant__from_lsproto, LogVerbosityTrace$constant as LogVerbosityTrace$constant__from_lsproto, LogVerbosityWarning$constant as LogVerbosityWarning$constant__from_lsproto, MessageTypeDebug$constant as MessageTypeDebug$constant__from_lsproto, MessageTypeError$constant as MessageTypeError$constant__from_lsproto, MessageTypeInfo$constant as MessageTypeInfo$constant__from_lsproto, MessageTypeWarning$constant as MessageTypeWarning$constant__from_lsproto, NotificationInfo as NotificationInfo__from_lsproto, RequestMessage as RequestMessage__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { dynamicQueue$Put$PointerTo_Named_lsproto$Message } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/dynamicQueue$Put.js";
import { NotificationInfo$NewNotificationMessage$PointerTo_Named_lsproto$LogMessageParams } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/lsp/lsproto/NotificationInfo$NewNotificationMessage.js";
import { $goInterfaceAdapter$PointerTo_Named_lsp$logger, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class logger {
    declare private readonly $goType: void;
    public constructor(public server: {
        value: Server;
    } | undefined, public mu: sync__from_gostdlib.Mutex, public verbosity: LogVerbosity__from_lsproto) {
    }
    static $copy($source: logger): logger {
        return new logger($source.server, named_sync.SyncMutexOperations.$copy($source.mu), $source.verbosity);
    }
    static $equal($left: logger, $right: logger): bool {
        return $left.server
            ===
                $right.server
            && named_sync.SyncMutexOperations.$equal($left.mu, $right.mu) && $left.verbosity === $right.verbosity;
    }
    static $hash($source: logger): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.server));
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.mu));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.verbosity));
        return $hash;
    }
    declare private readonly then?: never;
    static Error(l: {
        value: logger;
    } | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeError$constant__from_lsproto(), fmt__from_gostdlib.Sprint(msg));
    }
    static Errorf(l: {
        value: logger;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeError$constant__from_lsproto(), fmt__from_gostdlib.Sprintf(format, args));
    }
    static Info(l: {
        value: logger;
    } | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeInfo$constant__from_lsproto(), fmt__from_gostdlib.Sprint(msg));
    }
    static Infof(l: {
        value: logger;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeInfo$constant__from_lsproto(), fmt__from_gostdlib.Sprintf(format, args));
    }
    static IsTracing(l: {
        value: logger;
    } | undefined): bool {
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
                    sync__from_gostdlib.Mutex.Lock((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    __gotots_return_0 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity === LogVerbosityTrace$constant__from_lsproto();
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
    static IsVerbose(l: {
        value: logger;
    } | undefined): bool {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: bool = false;
        try {
            try {
                __gotots_return_block_1: {
                    if (l === undefined) {
                        __gotots_return_1 = false;
                        break __gotots_return_block_1;
                    }
                    sync__from_gostdlib.Mutex.Lock((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_1 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    __gotots_return_1 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity >= LogVerbosityTrace$constant__from_lsproto() && (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity <= LogVerbosityDebug$constant__from_lsproto();
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
    static Log(l: {
        value: logger;
    } | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeInfo$constant__from_lsproto(), fmt__from_gostdlib.Sprint(msg));
    }
    static Logf(l: {
        value: logger;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeInfo$constant__from_lsproto(), fmt__from_gostdlib.Sprintf(format, args));
    }
    static SetVerbose(l: {
        value: logger;
    } | undefined, verbose: bool): void {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_1: {
                    if (l === undefined) {
                        break __gotots_return_block_1;
                    }
                    sync__from_gostdlib.Mutex.Lock((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_1 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    if (verbose) {
                        (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity = LogVerbosityDebug$constant__from_lsproto();
                    }
                    else {
                        (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity = LogVerbosityInfo$constant__from_lsproto();
                    }
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
    }
    static SetVerbosity(l: {
        value: logger;
    } | undefined, verbosity: LogVerbosity__from_lsproto): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (l === undefined) {
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity = verbosity;
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
    static Verbose(l: {
        value: logger;
    } | undefined): Logger__from_logging | undefined {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: Logger__from_logging | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    if (l === undefined) {
                        __gotots_return_1 = void 0;
                        break __gotots_return_block_1;
                    }
                    sync__from_gostdlib.Mutex.Lock((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_1 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    if ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity === LogVerbosityOff$constant__from_lsproto() || (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity > LogVerbosityDebug$constant__from_lsproto()) {
                        __gotots_return_1 = void 0;
                        break __gotots_return_block_1;
                    }
                    __gotots_return_1 = new $goInterfaceAdapter$PointerTo_Named_lsp$logger(l);
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
    static Warn(l: {
        value: logger;
    } | undefined, msg: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeWarning$constant__from_lsproto(), fmt__from_gostdlib.Sprint(msg));
    }
    static Warnf(l: {
        value: logger;
    } | undefined, format: gostring, args: RuntimeSlice<GoInterface | undefined>): void {
        if (l === undefined) {
            return;
        }
        logger.$go$private$lsp$sendLogMessage(l, MessageTypeWarning$constant__from_lsproto(), fmt__from_gostdlib.Sprintf(format, args));
    }
    static $go$private$lsp$sendLogMessage(l: {
        value: logger;
    } | undefined, msgType: MessageType__from_lsproto, message: gostring): void {
        if (l === undefined) {
            return;
        }
        if (!atomic__from_gostdlib.Bool.Load(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.initStarted)) {
            const __gotots_argument_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stderr;
            const __gotots_argument_1 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(message)]);
            provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1);
            return;
        }
        sync__from_gostdlib.Mutex.Lock((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        let verbosity = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.verbosity;
        sync__from_gostdlib.Mutex.Unlock((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if (verbosity === LogVerbosityOff$constant__from_lsproto() || verbosity > maxVerbosityForMessageType(msgType)) {
            return;
        }
        let notification: {
            value: RequestMessage__from_lsproto;
        } | undefined = NotificationInfo$NewNotificationMessage$PointerTo_Named_lsproto$LogMessageParams(NotificationInfo__from_lsproto.$fromStorage<tsonicTypeScriptRuntime.Location<LogMessageParams__from_lsproto> | undefined>($state__lsproto.WindowLogMessageInfo), tsonicTypeScriptRuntime.location<LogMessageParams__from_lsproto>(new LogMessageParams__from_lsproto(msgType, message)));
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = dynamicQueue$Put$PointerTo_Named_lsproto$Message(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.outgoingQueue, ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx, RequestMessage__from_lsproto.Message(notification));
            if (!(err === undefined)) {
                const __gotots_receiver_0 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.backgroundCtx;
                if (!(goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_0).Err() === undefined)) {
                    const __gotots_argument_2 = ((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.server ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.stderr;
                    const __gotots_argument_3 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(message)]);
                    provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_2), __gotots_argument_3);
                }
            }
        }
    }
}
export function newLogger(server: {
    value: Server;
} | undefined): {
    value: logger;
} | undefined {
    return { value: new logger(server, named_sync.SyncMutexOperations.$zero(), LogVerbosityInfo$constant__from_lsproto()) };
}
export function maxVerbosityForMessageType(msgType: MessageType__from_lsproto): LogVerbosity__from_lsproto {
    switch (msgType) {
        case MessageTypeError$constant__from_lsproto(): {
            return LogVerbosityError$constant__from_lsproto();
            break;
        }
        case MessageTypeWarning$constant__from_lsproto(): {
            return LogVerbosityWarning$constant__from_lsproto();
            break;
        }
        case MessageTypeInfo$constant__from_lsproto(): {
            return LogVerbosityInfo$constant__from_lsproto();
            break;
        }
        case MessageTypeDebug$constant__from_lsproto(): {
            return LogVerbosityDebug$constant__from_lsproto();
            break;
        }
        default: {
            return LogVerbosityInfo$constant__from_lsproto();
            break;
        }
    }
}
export function isValidLogVerbosity(v: LogVerbosity__from_lsproto): bool {
    return v >= LogVerbosityOff$constant__from_lsproto() && v <= LogVerbosityError$constant__from_lsproto();
}
