import type { Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int, int32 } from "@gotots/runtime/scalars.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_compiler$Program_To_int32 as GoMap } from "../../../../../../support/maps.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
export class programCounter {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public refs: GoMapValue<{
        value: Program__from_compiler;
    } | undefined, int32>) {
    }
    static $copy($source: programCounter): programCounter {
        return new programCounter(named_sync.SyncMutexOperations.$copy($source.mu), $source.refs);
    }
    declare private readonly then?: never;
    static Deref(c: {
        value: programCounter;
    } | undefined, program: {
        value: Program__from_compiler;
    } | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0: programCounter["mu"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_results_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refs.lookupOk(program);
                    let count = __gotots_results_0[0];
                    let ok = __gotots_results_0[1];
                    if (!ok) {
                        __gotots_return_0 = false;
                        break __gotots_return_block_0;
                    }
                    count--;
                    if (count < 0) {
                        const __gotots_argument_0 = new GoInterfaceAdapter("program reference count went below zero");
                        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                    }
                    if (count === 0) {
                        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refs.delete(program);
                        __gotots_return_0 = true;
                        break __gotots_return_block_0;
                    }
                    (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refs.store(program, count);
                    __gotots_return_0 = false;
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
    static Len(c: {
        value: programCounter;
    } | undefined): int {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: int = 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0: programCounter["mu"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    __gotots_return_0 = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refs.length();
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
    static Ref(c: {
        value: programCounter;
    } | undefined, program: {
        value: Program__from_compiler;
    } | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_0: programCounter["mu"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refs.isNil()) {
                        (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refs = GoMap.make(0, []);
                    }
                    const __gotots_store_0: programCounter["refs"] = (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refs;
                    const __gotots_store_1 = program;
                    __gotots_store_0.store(__gotots_store_1, __gotots_store_0.lookup(__gotots_store_1) + 1);
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
}
