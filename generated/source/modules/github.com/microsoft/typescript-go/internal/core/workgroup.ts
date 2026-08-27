import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { Group as Group__from_errgroup, WithContext as WithContext__from_errgroup } from "../../../../../../packages/golang.org/x/sync@v0.21.0/errgroup/package.js";
import { $goInterfaceAdapter$PointerTo_Named_core$parallelWorkGroup, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_core$singleThreadedWorkGroup as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Queue$void_to_void_to_void, $goInterfaceMethod$RunAndWait$void_to_void } from "../../../../../../support/interface-methods.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoChannel } from "@gotots/runtime/channel.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export interface WorkGroup extends GoInterfaceValue {
    Queue($argument0: (() => void) | undefined): void;
    RunAndWait(): void;
}
export const WorkGroup$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Queue$void_to_void_to_void, $goInterfaceMethod$RunAndWait$void_to_void]);
export function WorkGroup$is(value: GoInterfaceValue | undefined): value is WorkGroup {
    return value !== undefined && value.$go$implements(WorkGroup$contract);
}
export function NewWorkGroup(singleThreaded: bool): WorkGroup | undefined {
    if (singleThreaded) {
        return new GoInterfaceAdapter({ value: new singleThreadedWorkGroup(named_sync_atomic.SyncAtomicBoolOperations.$zero(), named_sync.SyncMutexOperations.$zero(), RuntimeSlice.nil<(() => void) | undefined>()) });
    }
    return new $goInterfaceAdapter$PointerTo_Named_core$parallelWorkGroup({ value: new parallelWorkGroup(named_sync_atomic.SyncAtomicBoolOperations.$zero(), named_sync.SyncWaitGroupOperations.$zero()) });
}
export class parallelWorkGroup {
    declare private readonly $goType: void;
    public constructor(public done: atomic__from_gostdlib.Bool, public wg: sync__from_gostdlib.WaitGroup) {
    }
    static $copy($source: parallelWorkGroup): parallelWorkGroup {
        return new parallelWorkGroup(named_sync_atomic.SyncAtomicBoolOperations.$copy($source.done), named_sync.SyncWaitGroupOperations.$copy($source.wg));
    }
    static $equal($left: parallelWorkGroup, $right: parallelWorkGroup): bool {
        return named_sync_atomic.SyncAtomicBoolOperations.$equal($left.done, $right.done) && named_sync.SyncWaitGroupOperations.$equal($left.wg, $right.wg);
    }
    static $hash($source: parallelWorkGroup): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, named_sync_atomic.SyncAtomicBoolOperations.$hash($source.done));
        $hash = GoMapHash.mix($hash, named_sync.SyncWaitGroupOperations.$hash($source.wg));
        return $hash;
    }
    declare private readonly then?: never;
    static Queue(w: {
        value: parallelWorkGroup;
    } | undefined, fn: (() => void) | undefined): void {
        if (atomic__from_gostdlib.Bool.Load((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done)) {
            const __gotots_argument_2 = new $goInterfaceAdapter$string("Queue called after RunAndWait returned");
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        }
        sync__from_gostdlib.WaitGroup.Go((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wg, (): void => {
            const __gotots_callee_3 = fn;
            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
        });
    }
    static RunAndWait(w: {
        value: parallelWorkGroup;
    } | undefined): void {
        let __gotots_deferred_2: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_2: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_2: {
                    const __gotots_receiver_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done;
                    const __gotots_argument_3 = true;
                    __gotots_deferred_2 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncAtomicBoolStore(__gotots_receiver_1, __gotots_argument_3, $go$recovery);
                    };
                    sync__from_gostdlib.WaitGroup.Wait((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wg);
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
    }
}
export class singleThreadedWorkGroup {
    declare private readonly $goType: void;
    public constructor(public done: atomic__from_gostdlib.Bool, public fnsMu: sync__from_gostdlib.Mutex, public fns: RuntimeSlice<(() => void) | undefined>) {
    }
    static $copy($source: singleThreadedWorkGroup): singleThreadedWorkGroup {
        return new singleThreadedWorkGroup(named_sync_atomic.SyncAtomicBoolOperations.$copy($source.done), named_sync.SyncMutexOperations.$copy($source.fnsMu), $source.fns);
    }
    declare private readonly then?: never;
    static Queue(w: {
        value: singleThreadedWorkGroup;
    } | undefined, fn: (() => void) | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (atomic__from_gostdlib.Bool.Load((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done)) {
                        const __gotots_argument_0 = new $goInterfaceAdapter$string("Queue called after RunAndWait returned");
                        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                    }
                    sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fnsMu);
                    const __gotots_receiver_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fnsMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns.append(void 0, [fn]);
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
    static RunAndWait(w: {
        value: singleThreadedWorkGroup;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_receiver_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done;
                    const __gotots_argument_1 = true;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncAtomicBoolStore(__gotots_receiver_0, __gotots_argument_1, $go$recovery);
                    };
                    for (;;) {
                        let fn: (() => void) | undefined = singleThreadedWorkGroup.$go$private$core$pop(w);
                        if (fn === undefined) {
                            break __gotots_return_block_0;
                        }
                        const __gotots_callee_0 = fn;
                        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
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
    static $go$private$core$pop(w: {
        value: singleThreadedWorkGroup;
    } | undefined): (() => void) | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: (() => void) | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fnsMu);
                    const __gotots_receiver_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fnsMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns.length === 0) {
                        __gotots_return_0 = void 0;
                        break __gotots_return_block_0;
                    }
                    let end = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns.length - 1;
                    let fn: (() => void) | undefined = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns.get(end);
                    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns.set(end, void 0);
                    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fns.slice(0, end, null);
                    __gotots_return_0 = fn;
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
export class ThrottleGroup {
    declare private readonly $goType: void;
    public constructor(public semaphore: GoChannel<GoEmptyStruct> | undefined, public group: Group__from_errgroup | undefined) {
    }
    declare private readonly then?: never;
    static Go(tg: ThrottleGroup | undefined, fn: (() => $goInterface$Interface_Method_Error_void_to_string | undefined) | undefined): void {
        Group__from_errgroup.Go((tg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).group, (): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_1: GoPanic | undefined = undefined;
            let __gotots_return_1: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
            try {
                try {
                    __gotots_return_block_1: {
                        GoChannel.send((tg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).semaphore, new GoEmptyStruct);
                        const __gotots_callee_1 = (): void => {
                            GoChannel.receive((tg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).semaphore)[0];
                        };
                        __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                            __gotots_callee_1();
                        };
                        const __gotots_callee_2 = fn;
                        __gotots_return_1 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
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
        });
    }
    static Wait(tg: ThrottleGroup | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return Group__from_errgroup.Wait((tg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).group);
    }
}
export function NewThrottleGroup(ctx: GoInterface | undefined, semaphore: GoChannel<GoEmptyStruct> | undefined): ThrottleGroup | undefined {
    const __gotots_results_0 = WithContext__from_errgroup(ctx);
    let g: Group__from_errgroup | undefined = __gotots_results_0[0];
    return new ThrottleGroup(semaphore, g);
}
