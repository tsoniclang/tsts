import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { GoSendChannel } from "@gotots/runtime/channel.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { Checker as Checker__from_checker, NewChecker as NewChecker__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { SortAndDeduplicateDiagnostics as SortAndDeduplicateDiagnostics__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { GetCheckerLifetime as GetCheckerLifetime__from_core, GetRequestID as GetRequestID__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$Named_time$Duration, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_compiler$Program as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_int as GoMap } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_context$Context$Using$context_Context$Direct$And$Error$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_context from "@gotots/gostdlib/internal/facets/provider-context.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { GoChannel } from "@gotots/runtime/channel.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export const checkerHeldAnonymous$string: gostring = "<anonymous>";
export class CheckerPoolOptions {
    declare private readonly $goType: void;
    public constructor(public MaxCheckers: int, public IdleTimeout: time__from_gostdlib.Duration) {
    }
    static $zero(): CheckerPoolOptions {
        return new CheckerPoolOptions(0, named_time.TimeDurationValueOperations.$wrap(0n));
    }
    static $copy($source: CheckerPoolOptions): CheckerPoolOptions {
        return new CheckerPoolOptions($source.MaxCheckers, $source.IdleTimeout);
    }
    static $equal($left: CheckerPoolOptions, $right: CheckerPoolOptions): bool {
        return $left.MaxCheckers === $right.MaxCheckers && named_time.TimeDurationValueOperations.$project($left.IdleTimeout) === named_time.TimeDurationValueOperations.$project($right.IdleTimeout);
    }
    static $hash($source: CheckerPoolOptions): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.MaxCheckers));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.IdleTimeout)));
        return $hash;
    }
    declare private readonly then?: never;
}
export class checkerPool {
    declare private readonly $goType: void;
    public constructor(public opts: CheckerPoolOptions, public program: {
        value: Program__from_compiler;
    } | undefined, public mu: sync__from_gostdlib.Mutex, public discarded: bool, public checkers: RuntimeSlice<{
        value: Checker__from_checker;
    } | undefined>, public heldBy: RuntimeSlice<gostring>, public fileAssociations: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, int>, public requestAssociations: GoMapValue<gostring, int>, public lastReleased: RuntimeSlice<time__from_gostdlib.Time>, public cleanupTimer: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer> | undefined, public persistentChecker: {
        value: Checker__from_checker;
    } | undefined, public persistentHeld: bool, public diagSem: GoChannel<GoEmptyStruct> | undefined, public querySem: GoChannel<GoEmptyStruct> | undefined, public persistentSem: GoChannel<GoEmptyStruct> | undefined, public log: (($0: gostring) => void) | undefined, public globalDiagAccumulated: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public globalDiagChanged: bool, public globalDiagCheckerCount: RuntimeSlice<int>) {
    }
    static $copy($source: checkerPool): checkerPool {
        return new checkerPool(CheckerPoolOptions.$copy($source.opts), $source.program, named_sync.SyncMutexOperations.$copy($source.mu), $source.discarded, $source.checkers, $source.heldBy, $source.fileAssociations, $source.requestAssociations, $source.lastReleased, $source.cleanupTimer, $source.persistentChecker, $source.persistentHeld, $source.diagSem, $source.querySem, $source.persistentSem, $source.log, $source.globalDiagAccumulated, $source.globalDiagChanged, $source.globalDiagCheckerCount);
    }
    declare private readonly then?: never;
    static Discard(p: {
        value: checkerPool;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0: checkerPool["mu"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.discarded) {
                        break __gotots_return_block_0;
                    }
                    const __gotots_callee_0: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                    const __gotots_argument_0 = "checkerpool: Discarding pool, stopping idle cleanup";
                    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.discarded = true;
                    if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer === undefined)) {
                        const __gotots_receiver_1: checkerPool["cleanupTimer"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer;
                        time__from_gostdlib.Timer.Stop(__gotots_receiver_1 === void 0 ? void 0 :
                            (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value);
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer = void 0;
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
    }
    static GetChecker(p: {
        value: checkerPool;
    } | undefined, ctx: GoInterface | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        let lifetime = GetCheckerLifetime__from_core(ctx);
        let requestID = GetRequestID__from_core(ctx);
        const __gotots_receiver_2 = ctx;
        if (goInterfaceNonNil<GoInterface>(__gotots_receiver_2).Done() === undefined) {
            requestID = "";
        }
        switch (lifetime.$value) {
            case 1: {
                return checkerPool.$go$private$project$getDiagnosticsChecker(p, ctx, requestID);
                break;
            }
            case 2: {
                return checkerPool.$go$private$project$getPersistentChecker(p);
                break;
            }
            default: {
                return checkerPool.$go$private$project$getQueryChecker(p, ctx, requestID, file);
                break;
            }
        }
    }
    static GetGlobalDiagnostics(p: {
        value: checkerPool;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_1: checkerPool["mu"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    __gotots_return_0 = Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagAccumulated);
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
    static TakeNewGlobalDiagnostics(p: {
        value: checkerPool;
    } | undefined): bool {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        let __gotots_return_2: bool = false;
        try {
            try {
                __gotots_return_block_2: {
                    sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_7: checkerPool["mu"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_7, $go$recovery);
                    };
                    let changed: checkerPool["globalDiagChanged"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagChanged;
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagChanged = false;
                    __gotots_return_2 = changed;
                    break __gotots_return_block_2;
                }
            }
            catch (__gotots_caught_5) {
                if (!(__gotots_caught_5 instanceof GoPanic)) {
                    throw __gotots_caught_5;
                }
                __gotots_panic_2 = __gotots_caught_5;
            }
        }
        finally {
            if (__gotots_deferred_2 !== undefined) {
                const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                try {
                    __gotots_deferred_2(__gotots_recovery_2);
                    if (__gotots_recovery_2.recovered()) {
                        __gotots_panic_2 = undefined;
                    }
                }
                catch (__gotots_caught_4) {
                    if (!(__gotots_caught_4 instanceof GoPanic)) {
                        throw __gotots_caught_4;
                    }
                    __gotots_panic_2 = __gotots_caught_4;
                }
            }
        }
        if (__gotots_panic_2 !== undefined) {
            throw __gotots_panic_2;
        }
        return __gotots_return_2;
    }
    static $go$private$project$cleanupIdleCheckers(p: {
        value: checkerPool;
    } | undefined): void {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_1: {
                    sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_6: checkerPool["mu"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_6, $go$recovery);
                    };
                    if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.discarded) {
                        break __gotots_return_block_1;
                    }
                    let now = time__from_gostdlib.Now();
                    const __gotots_range_3: checkerPool["checkers"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
                        const __gotots_range_value_9 = __gotots_range_index_1;
                        let i = __gotots_range_value_9;
                        let c: {
                            value: Checker__from_checker;
                        } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(i);
                        if (c === undefined || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.get(i) !== "") {
                            continue;
                        }
                        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastReleased.get(i).IsZero()) {
                            continue;
                        }
                        let idle = now.Sub(named_time.TimeOperations.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastReleased.get(i)));
                        if (named_time.TimeDurationValueOperations.$project(idle) >= named_time.TimeDurationValueOperations.$project((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.IdleTimeout)) {
                            const __gotots_callee_14: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                            const __gotots_argument_13 = fmt__from_gostdlib.Sprintf("checkerpool: Disposing idle checker %d (idle %v)", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(i), new $goInterfaceAdapter$Named_time$Duration(idle)]));
                            (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
                            checkerPool.$go$private$project$disposeCheckerLocked(p, i, c);
                        }
                    }
                    checkerPool.$go$private$project$scheduleCleanupLocked(p);
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
    static $go$private$project$createRelease(p: {
        value: checkerPool;
    } | undefined, requestID: gostring, index: int, c: {
        value: Checker__from_checker;
    } | undefined): (() => void) | undefined {
        return sync__from_gostdlib.OnceFunc((): void => {
            sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            if (Checker__from_checker.WasCanceled(c)) {
                const __gotots_callee_9: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                const __gotots_argument_8 = fmt__from_gostdlib.Sprintf("checkerpool: Checker %d for request %s was canceled, disposing", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(index), new $goInterfaceAdapter$string(holdTag(requestID))]));
                (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
                checkerPool.$go$private$project$disposeCheckerLocked(p, index, c);
            }
            else {
                checkerPool.$go$private$project$mergeGlobalDiagnosticsFromCheckerLocked(p, index, c);
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.set(index, "");
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastReleased.set(index, time__from_gostdlib.Now());
                if (!(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.discarded) {
                    checkerPool.$go$private$project$scheduleCleanupLocked(p);
                }
            }
            sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            if (index === 0) {
                GoChannel.receive((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagSem)[0];
            }
            else {
                GoChannel.receive((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.querySem)[0];
            }
        });
    }
    static $go$private$project$disposeCheckerLocked(p: {
        value: checkerPool;
    } | undefined, index: int, c: {
        value: Checker__from_checker;
    } | undefined): void {
        Assert__from_debug((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(index)
            ===
                c, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.set(index, void 0);
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.set(index, "");
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagCheckerCount.set(index, 0);
        const __gotots_store_0: checkerPool["lastReleased"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastReleased;
        const __gotots_store_1 = index;
        const __gotots_struct_0 = named_time.TimeOperations.$zero();
        __gotots_store_0.set(__gotots_store_1, __gotots_struct_0);
        const __gotots_range_0: checkerPool["fileAssociations"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            const __gotots_range_value_3 = __gotots_range_value_1[0];
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_2;
            let idx = __gotots_range_value_3;
            if (idx === index) {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations.delete(file);
            }
        }
        const __gotots_range_1: checkerPool["requestAssociations"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations;
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_1.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = __gotots_range_value_4;
            const __gotots_range_value_7 = __gotots_range_value_5[0];
            let req = __gotots_range_value_6;
            let idx = __gotots_range_value_7;
            if (idx === index) {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.delete(req);
            }
        }
    }
    static $go$private$project$findOrCreateQueryCheckerLocked(p: {
        value: checkerPool;
    } | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        int
    ] {
        for (let i = 1; i < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.length; i++) {
            {
                let c: {
                    value: Checker__from_checker;
                } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(i);
                if (!(c === undefined) && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.get(i) === "") {
                    return [c, i];
                }
            }
        }
        for (let i = 1; i < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.length; i++) {
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(i) === undefined) {
                const __gotots_callee_12: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                const __gotots_argument_9 = fmt__from_gostdlib.Sprintf("checkerpool: Creating query checker %d", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(i)]));
                (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9);
                const __gotots_results_10 = NewChecker__from_checker(new GoInterfaceAdapter((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program), void 0);
                let c: {
                    value: Checker__from_checker;
                } | undefined = __gotots_results_10[0];
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.set(i, c);
                return [c, i];
            }
        }
        const __gotots_argument_10 = new $goInterfaceAdapter$string("checkerpool: no available query slot despite holding semaphore token");
        GoPanic.raise(__gotots_argument_10 === undefined ? GoPanicNilValue.create() : __gotots_argument_10);
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$project$getDiagnosticsChecker(p: {
        value: checkerPool;
    } | undefined, ctx: GoInterface | undefined, requestID: gostring): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: [
            {
                value: Checker__from_checker;
            } | undefined,
            (() => void) | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    const diagIndex$int: int = 0;
                    {
                        const __gotots_results_0 = checkerPool.$go$private$project$tryReacquireForRequest(p, requestID, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagSem, true);
                        let c__shadow_1: {
                            value: Checker__from_checker;
                        } | undefined = __gotots_results_0[0];
                        let release: (() => void) | undefined = __gotots_results_0[1];
                        let ok = __gotots_results_0[2];
                        if (ok) {
                            __gotots_return_1 = [c__shadow_1, release];
                            break __gotots_return_block_1;
                        }
                    }
                    sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_3: checkerPool["mu"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_3, $go$recovery);
                    };
                    if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(diagIndex$int) === undefined) {
                        const __gotots_callee_1: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                        const __gotots_argument_1 = "checkerpool: Creating diagnostics checker";
                        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                        const __gotots_results_1 = NewChecker__from_checker(new GoInterfaceAdapter((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program), void 0);
                        let c__shadow_1: {
                            value: Checker__from_checker;
                        } | undefined = __gotots_results_1[0];
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.set(diagIndex$int, c__shadow_1);
                    }
                    let c: {
                        value: Checker__from_checker;
                    } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(diagIndex$int);
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.set(diagIndex$int, holdTag(requestID));
                    const __gotots_callee_2: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                    const __gotots_argument_2 = "checkerpool: Acquired diagnostics checker for request " + holdTag(requestID);
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                    if (requestID !== "") {
                        {
                            const __gotots_results_2 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.lookupOk(requestID);
                            let alreadyRegistered = __gotots_results_2[1];
                            if (!alreadyRegistered) {
                                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.store(requestID, diagIndex$int);
                                checkerPool.$go$private$project$registerRequestCleanup(p, ctx, requestID);
                            }
                        }
                    }
                    __gotots_return_1 = [c, checkerPool.$go$private$project$createRelease(p, requestID, diagIndex$int, c)];
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
    static $go$private$project$getPersistentChecker(p: {
        value: checkerPool;
    } | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        GoChannel.send((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentSem, new GoEmptyStruct);
        sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentChecker === undefined) {
            const __gotots_callee_3: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
            const __gotots_argument_3 = "checkerpool: Creating persistent checker";
            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
            const __gotots_results_3 = NewChecker__from_checker(new GoInterfaceAdapter((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program), void 0);
            let c__shadow_1: {
                value: Checker__from_checker;
            } | undefined = __gotots_results_3[0];
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentChecker = c__shadow_1;
        }
        let c: {
            value: Checker__from_checker;
        } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentChecker;
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentHeld = true;
        sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        return [c, sync__from_gostdlib.OnceFunc((): void => {
                sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentHeld = false;
                if (Checker__from_checker.WasCanceled(c)) {
                    const __gotots_callee_4: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                    const __gotots_argument_4 = "checkerpool: Persistent checker was canceled, disposing";
                    (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
                    if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentChecker
                        ===
                            c) {
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentChecker = void 0;
                    }
                }
                sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                GoChannel.receive((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.persistentSem)[0];
            })];
    }
    static $go$private$project$getQueryChecker(p: {
        value: checkerPool;
    } | undefined, ctx: GoInterface | undefined, requestID: gostring, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: [
            {
                value: Checker__from_checker;
            } | undefined,
            (() => void) | undefined
        ] = [void 0, void 0];
        try {
            try {
                __gotots_return_block_1: {
                    {
                        const __gotots_results_4 = checkerPool.$go$private$project$tryReacquireForRequest(p, requestID, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.querySem, false);
                        let c__shadow_1: {
                            value: Checker__from_checker;
                        } | undefined = __gotots_results_4[0];
                        let release: (() => void) | undefined = __gotots_results_4[1];
                        let ok = __gotots_results_4[2];
                        if (ok) {
                            __gotots_return_1 = [c__shadow_1, release];
                            break __gotots_return_block_1;
                        }
                    }
                    sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_3: checkerPool["mu"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_3, $go$recovery);
                    };
                    if (!(file === undefined)) {
                        {
                            const __gotots_results_5 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations.lookupOk(file);
                            let index__shadow_1 = __gotots_results_5[0];
                            let ok = __gotots_results_5[1];
                            if (ok && index__shadow_1 > 0) {
                                {
                                    let c__shadow_1: {
                                        value: Checker__from_checker;
                                    } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(index__shadow_1);
                                    if (!(c__shadow_1 === undefined) && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.get(index__shadow_1) === "") {
                                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.set(index__shadow_1, holdTag(requestID));
                                        if (requestID !== "") {
                                            {
                                                const __gotots_results_6 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.lookupOk(requestID);
                                                let alreadyRegistered = __gotots_results_6[1];
                                                if (!alreadyRegistered) {
                                                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.store(requestID, index__shadow_1);
                                                    checkerPool.$go$private$project$registerRequestCleanup(p, ctx, requestID);
                                                }
                                            }
                                        }
                                        __gotots_return_1 = [c__shadow_1, checkerPool.$go$private$project$createRelease(p, requestID, index__shadow_1, c__shadow_1)];
                                        break __gotots_return_block_1;
                                    }
                                }
                            }
                        }
                    }
                    const __gotots_results_7 = checkerPool.$go$private$project$findOrCreateQueryCheckerLocked(p);
                    let c: {
                        value: Checker__from_checker;
                    } | undefined = __gotots_results_7[0];
                    let index = __gotots_results_7[1];
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.set(index, holdTag(requestID));
                    const __gotots_callee_7: checkerPool["log"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log;
                    const __gotots_argument_5 = fmt__from_gostdlib.Sprintf("checkerpool: Acquired query checker %d for request %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int(index), new $goInterfaceAdapter$string(holdTag(requestID))]));
                    (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
                    if (requestID !== "") {
                        {
                            const __gotots_results_8 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.lookupOk(requestID);
                            let alreadyRegistered = __gotots_results_8[1];
                            if (!alreadyRegistered) {
                                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.store(requestID, index);
                                checkerPool.$go$private$project$registerRequestCleanup(p, ctx, requestID);
                            }
                        }
                    }
                    if (!(file === undefined)) {
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileAssociations.store(file, index);
                    }
                    __gotots_return_1 = [c, checkerPool.$go$private$project$createRelease(p, requestID, index, c)];
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
    static $go$private$project$mergeGlobalDiagnosticsFromCheckerLocked(p: {
        value: checkerPool;
    } | undefined, index: int, c: {
        value: Checker__from_checker;
    } | undefined): void {
        let globals = Checker__from_checker.GetGlobalDiagnostics(c);
        if (globals.length === (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagCheckerCount.get(index)) {
            return;
        }
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagCheckerCount.set(index, globals.length);
        let before = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagAccumulated.length;
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagAccumulated = SortAndDeduplicateDiagnostics__from_compiler(goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagAccumulated, globals, void 0));
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagAccumulated.length !== before) {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.globalDiagChanged = true;
        }
    }
    static $go$private$project$registerRequestCleanup(p: {
        value: checkerPool;
    } | undefined, ctx: GoInterface | undefined, requestID: gostring): void {
        const __gotots_argument_6 = ctx;
        const __gotots_argument_7 = (): void => {
            let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_1: GoPanic | undefined = undefined;
            try {
                try {
                    __gotots_return_block_1: {
                        sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                        const __gotots_receiver_3: checkerPool["mu"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                        __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_3, $go$recovery);
                        };
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.delete(requestID);
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
        };
        provider_context.ContextAfterFuncDirect(GoProviderProfileBridge.$to(__gotots_argument_6), __gotots_argument_7);
    }
    static $go$private$project$scheduleCleanupLocked(p: {
        value: checkerPool;
    } | undefined): void {
        let earliestDeadline = named_time.TimeOperations.$zero();
        const __gotots_range_2: checkerPool["checkers"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_2.length; __gotots_range_index_0++) {
            const __gotots_range_value_8 = __gotots_range_index_0;
            let i = __gotots_range_value_8;
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(i) === undefined || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.get(i) !== "" || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastReleased.get(i).IsZero()) {
                continue;
            }
            let deadline = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lastReleased.get(i).Add((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.IdleTimeout);
            if (earliestDeadline.IsZero() || deadline.Before(named_time.TimeOperations.$copy(earliestDeadline))) {
                earliestDeadline = named_time.TimeOperations.$copy(deadline);
            }
        }
        if (earliestDeadline.IsZero()) {
            if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer === undefined)) {
                const __gotots_receiver_3: checkerPool["cleanupTimer"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer;
                time__from_gostdlib.Timer.Stop(__gotots_receiver_3 === void 0 ? void 0 :
                    (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value);
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer = void 0;
            }
            return;
        }
        let delay = time__from_gostdlib.Until(named_time.TimeOperations.$copy(earliestDeadline));
        if (named_time.TimeDurationValueOperations.$project(delay) <= 0n) {
            delay = time__from_gostdlib.Millisecond;
        }
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer === undefined)) {
            const __gotots_receiver_4: checkerPool["cleanupTimer"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer;
            time__from_gostdlib.Timer.Reset(__gotots_receiver_4 === void 0 ? void 0 :
                (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Timer>).value, delay);
        }
        else {
            const __gotots_argument_11 = delay;
            const __gotots_receiver_5 = p;
            const __gotots_argument_12 = (): void => {
                checkerPool.$go$private$project$cleanupIdleCheckers(__gotots_receiver_5);
            };
            const __gotots_conversion_0 = time__from_gostdlib.AfterFunc(__gotots_argument_11, __gotots_argument_12);
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cleanupTimer = __gotots_conversion_0 === undefined ? undefined :
                tsonicTypeScriptRuntime.boundLocation<time__from_gostdlib.Timer>(__gotots_conversion_0, (): time__from_gostdlib.Timer => {
                    return __gotots_conversion_0;
                }, ($go$providerPointerValue: time__from_gostdlib.Timer): void => {
                    named_time.TimeTimerOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                });
        }
    }
    static $go$private$project$tryReacquireForRequest(p: {
        value: checkerPool;
    } | undefined, requestID: gostring, sem: GoSendChannel<GoEmptyStruct> | undefined, isDiag: bool): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined,
        bool
    ] {
        if (requestID === "") {
            GoChannel.send(sem, new GoEmptyStruct);
            return [void 0, void 0, false];
        }
        sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        const __gotots_results_9 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.lookupOk(requestID);
        let index = __gotots_results_9[0];
        let ok = __gotots_results_9[1];
        if (!ok) {
            sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            GoChannel.send(sem, new GoEmptyStruct);
            return [void 0, void 0, false];
        }
        if ((isDiag && index !== 0) || (!isDiag && index === 0)) {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.delete(requestID);
            sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            GoChannel.send(sem, new GoEmptyStruct);
            return [void 0, void 0, false];
        }
        let c: {
            value: Checker__from_checker;
        } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(index);
        if (c === undefined) {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.requestAssociations.delete(requestID);
            sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            GoChannel.send(sem, new GoEmptyStruct);
            return [void 0, void 0, false];
        }
        let held = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.get(index);
        if (held === requestID) {
            sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return [c, noop, true];
        }
        if (held === "") {
            sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            GoChannel.send(sem, new GoEmptyStruct);
            sync__from_gostdlib.Mutex.Lock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            {
                let cc: {
                    value: Checker__from_checker;
                } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkers.get(index);
                if (cc
                    ===
                        c
                    && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.get(index) === "") {
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.heldBy.set(index, requestID);
                    sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    return [c, checkerPool.$go$private$project$createRelease(p, requestID, index, c), true];
                }
            }
            sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return [void 0, void 0, false];
        }
        sync__from_gostdlib.Mutex.Unlock((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        GoChannel.send(sem, new GoEmptyStruct);
        return [void 0, void 0, false];
    }
}
export function newCheckerPool(opts: CheckerPoolOptions, program: {
    value: Program__from_compiler;
} | undefined, log: (($0: gostring) => void) | undefined): {
    value: checkerPool;
} | undefined {
    if (opts.MaxCheckers <= 0) {
        opts.MaxCheckers = 4;
    }
    else if (opts.MaxCheckers < 2) {
        opts.MaxCheckers = 2;
    }
    if (named_time.TimeDurationValueOperations.$project(opts.IdleTimeout) <= 0n) {
        opts.IdleTimeout = named_time.TimeDurationValueOperations.$wrap(30000000000n);
    }
    let querySlots = opts.MaxCheckers - 1;
    const __gotots_field_0 = program;
    const __gotots_field_1 = CheckerPoolOptions.$copy(opts);
    const __gotots_field_2 = RuntimeSlice.make<{
        value: Checker__from_checker;
    } | undefined>(opts.MaxCheckers, null, void 0);
    const __gotots_field_3 = RuntimeSlice.make<gostring>(opts.MaxCheckers, null, "");
    const __gotots_field_4 = GoMap.make(0, []);
    const __gotots_field_5 = GoMap__from_gotots_runtime.make<gostring, int>(0, 0, []);
    const __gotots_slice_build_0 = goSliceAllocate<time__from_gostdlib.Time>(opts.MaxCheckers, null);
    for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
        __gotots_slice_build_0.$initialize(__gotots_slice_build_1, named_time.TimeOperations.$zero());
    }
    const __gotots_field_6 = __gotots_slice_build_0;
    let pool: {
        value: checkerPool;
    } | undefined = { value: new checkerPool(__gotots_field_1, __gotots_field_0, named_sync.SyncMutexOperations.$zero(), false, __gotots_field_2, __gotots_field_3, __gotots_field_4, __gotots_field_5, __gotots_field_6, void 0, void 0, false, GoChannel.make<GoEmptyStruct>(1, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, (value: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                value);
        }), GoChannel.make<GoEmptyStruct>(querySlots, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, (value: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                value);
        }), GoChannel.make<GoEmptyStruct>(1, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, (value: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                value);
        }), log, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), false, RuntimeSlice.make<int>(opts.MaxCheckers, null, 0)) };
    if ((pool ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log === undefined) {
        (pool ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.log = (msg: gostring): void => {
        };
    }
    return pool;
}
export function holdTag(requestID: gostring): gostring {
    if (requestID === "") {
        return checkerHeldAnonymous$string;
    }
    return requestID;
}
export function noop(): void {
}
