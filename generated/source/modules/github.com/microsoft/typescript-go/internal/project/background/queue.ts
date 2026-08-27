import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class Queue {
    declare private readonly $goType: void;
    public constructor(public wg: sync__from_gostdlib.WaitGroup, public mu: sync__from_gostdlib.RWMutex, public closed: bool) {
    }
    static $copy($source: Queue): Queue {
        return new Queue(named_sync.SyncWaitGroupOperations.$copy($source.wg), named_sync.SyncRWMutexOperations.$copy($source.mu), $source.closed);
    }
    static $equal($left: Queue, $right: Queue): bool {
        return named_sync.SyncWaitGroupOperations.$equal($left.wg, $right.wg) && named_sync.SyncRWMutexOperations.$equal($left.mu, $right.mu) && $left.closed === $right.closed;
    }
    static $hash($source: Queue): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, named_sync.SyncWaitGroupOperations.$hash($source.wg));
        $hash = GoMapHash.mix($hash, named_sync.SyncRWMutexOperations.$hash($source.mu));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.closed));
        return $hash;
    }
    declare private readonly then?: never;
    static Close(q: {
        value: Queue;
    } | undefined): void {
        sync__from_gostdlib.RWMutex.Lock((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        (q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed = true;
        sync__from_gostdlib.RWMutex.Unlock((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
    }
    static Enqueue(q: {
        value: Queue;
    } | undefined, ctx: GoInterface | undefined, fn: (($0: GoInterface | undefined) => void) | undefined): void {
        sync__from_gostdlib.RWMutex.RLock((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        if ((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.closed) {
            sync__from_gostdlib.RWMutex.RUnlock((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
            return;
        }
        sync__from_gostdlib.RWMutex.RUnlock((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
        const __gotots_receiver_0 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err() === undefined)) {
            return;
        }
        sync__from_gostdlib.WaitGroup.Go((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wg, (): void => {
            const __gotots_receiver_1 = ctx;
            if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Err() === undefined)) {
                return;
            }
            const __gotots_callee_0 = fn;
            const __gotots_argument_0 = ctx;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        });
    }
}
export function NewQueue(): {
    value: Queue;
} | undefined {
    return { value: new Queue(named_sync.SyncWaitGroupOperations.$zero(), named_sync.SyncRWMutexOperations.$zero(), false) };
}
