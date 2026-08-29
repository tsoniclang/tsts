import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncMap$Storage as SyncMap__from_collections$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool, uint32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage, GoStorage } from "@gotots/runtime/storage.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
export type parseCacheEntry$Storage<V> = {
    value: GoStorage<V>;
    mu: sync__from_gostdlib.Mutex;
};
export class parseCacheEntry<V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: parseCacheEntry$Storage<V>) {
    }
    public static $storageOf<V>($source: parseCacheEntry<V>): parseCacheEntry$Storage<V> {
        return $source.$storage;
    }
    public static $fromStorage<V>($source: parseCacheEntry$Storage<V>): parseCacheEntry<V> {
        return new parseCacheEntry<V>($source);
    }
    static $copy<V>($go$from_storage$T0_to_T0: ($0: GoStorage<V>) => V, $go$to_storage$T0_to_T0: ($0: V) => GoStorage<V>, $source: parseCacheEntry<V>): parseCacheEntry<V> {
        return new parseCacheEntry<V>({
            value: $go$to_storage$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.value)),
            mu: named_sync.SyncMutexOperations.$copy($source.$storage.mu)
        });
    }
    static $equal<V>($go$equal$T0_T0_to_bool: ($0: V, $1: V) => bool, $go$from_storage$T0_to_T0: ($0: GoStorage<V>) => V, $left: parseCacheEntry<V>, $right: parseCacheEntry<V>): bool {
        return $go$equal$T0_T0_to_bool($go$from_storage$T0_to_T0($left.$storage.value), $go$from_storage$T0_to_T0($right.$storage.value)) && named_sync.SyncMutexOperations.$equal($left.$storage.mu, $right.$storage.mu);
    }
    static $hash<V>($go$from_storage$T0_to_T0: ($0: GoStorage<V>) => V, $go$hash$T0_to_uint32: ($0: V) => uint32, $source: parseCacheEntry<V>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $go$hash$T0_to_uint32($go$from_storage$T0_to_T0($source.$storage.value)));
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.$storage.mu));
        return $hash;
    }
    declare private readonly then?: never;
}
export type parseCache$Storage<K, V> = {
    entries: SyncMap__from_collections$Storage<K, {
        value: parseCacheEntry<V>;
    } | undefined>;
};
export class parseCache<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: parseCache$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: parseCache<K, V>): parseCache$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: parseCache$Storage<K, V>): parseCache<K, V> {
        return new parseCache<K, V>($source);
    }
    static $zero<K, V>(): parseCache<K, V> {
        return new parseCache<K, V>({
            entries: SyncMap__from_collections.$zeroStorage<K, {
                value: parseCacheEntry<V>;
            } | undefined>()
        });
    }
    static $copy<K, V>($source: parseCache<K, V>): parseCache<K, V> {
        return new parseCache<K, V>({
            entries: SyncMap__from_collections.$storageOf<K, {
                value: parseCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$copy<K, {
                value: parseCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$fromStorage<K, {
                value: parseCacheEntry<V>;
            } | undefined>($source.$storage.entries)))
        });
    }
    declare private readonly then?: never;
    static $go$private$build$delete$kernel<K, V>(c: tsonicTypeScriptRuntime.Location<parseCache<K, V>> | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, key: K): void {
        const __gotots_store_2 = parseCache.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<parseCache<K, V>>).value);
        SyncMap__from_collections.Delete$kernel<K, {
            value: parseCacheEntry<V>;
        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
            value: parseCacheEntry<V>;
        } | undefined>, SyncMap__from_collections<K, {
            value: parseCacheEntry<V>;
        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "entries"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$interface_adapt$T0_to_Interface_void, key);
    }
    static $go$private$build$loadOrStore$kernel<K, V>(c: tsonicTypeScriptRuntime.Location<parseCache<K, V>> | undefined, $go$binary_not_equal$T1_T1_to_bool: ($0: V, $1: V) => bool, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_build$parseCacheEntryOf_T1_to_PointerTo_Named_build$parseCacheEntryOf_T1: ($0: {
        value: parseCacheEntry<V>;
    } | undefined) => {
        value: parseCacheEntry<V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_adapt$PointerTo_Named_build$parseCacheEntryOf_T1_to_Interface_void: ($0: {
        value: parseCacheEntry<V>;
    } | undefined) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_build$parseCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: parseCacheEntry<V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_build$parseCacheEntryOf_T1: () => {
        value: parseCacheEntry<V>;
    } | undefined, $go$zero$void_to_T1: () => V, key: K, parse: (($0: K) => V) | undefined, allowZero: bool): V {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: V = $go$zero$void_to_T1();
        try {
            try {
                __gotots_return_block_0: {
                    let newEntry: {
                        value: parseCacheEntry<V>;
                    } | undefined = { value: parseCacheEntry.$fromStorage<V>({
                            value: $go$to_storage$T1_to_T1($go$zero$void_to_T1()),
                            mu: named_sync.SyncMutexOperations.$zero()
                        }) };
                    sync__from_gostdlib.Mutex.Lock(parseCacheEntry.$storageOf((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = parseCacheEntry.$storageOf((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    });
                    {
                        const __gotots_store_0 = parseCache.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<parseCache<K, V>>).value);
                        const __gotots_results_0 = SyncMap__from_collections.LoadOrStore$kernel<K, {
                            value: parseCacheEntry<V>;
                        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                            value: parseCacheEntry<V>;
                        } | undefined>, SyncMap__from_collections<K, {
                            value: parseCacheEntry<V>;
                        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "entries"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_build$parseCacheEntryOf_T1_to_PointerTo_Named_build$parseCacheEntryOf_T1, $go$interface_adapt$PointerTo_Named_build$parseCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_build$parseCacheEntryOf_T1, $go$zero$void_to_PointerTo_Named_build$parseCacheEntryOf_T1, $go$copy$T0_to_T0(key), newEntry);
                        let entry: {
                            value: parseCacheEntry<V>;
                        } | undefined = __gotots_results_0[0];
                        let loaded = __gotots_results_0[1];
                        if (loaded) {
                            sync__from_gostdlib.Mutex.Lock(parseCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                            const __gotots_receiver_1 = parseCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                            });
                            if (allowZero || $go$binary_not_equal$T1_T1_to_bool($go$from_storage$T1_to_T1(parseCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value), $go$zero$void_to_T1())) {
                                __gotots_return_0 = $go$from_storage$T1_to_T1(parseCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value);
                                break __gotots_return_block_0;
                            }
                            newEntry = entry;
                        }
                    }
                    const __gotots_callee_0 = parse;
                    const __gotots_argument_0 = $go$copy$T0_to_T0(key);
                    const __gotots_argument_1 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
                    const __gotots_argument_2 = __gotots_argument_1;
                    parseCacheEntry.$storageOf((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value = $go$to_storage$T1_to_T1(__gotots_argument_2);
                    __gotots_return_0 = $go$from_storage$T1_to_T1(parseCacheEntry.$storageOf((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value);
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
    static $go$private$build$reset<K, V>(c: tsonicTypeScriptRuntime.Location<parseCache<K, V>> | undefined): void {
        const __gotots_struct_0 = SyncMap__from_collections.$zero<K, {
            value: parseCacheEntry<V>;
        } | undefined>();
        parseCache.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<parseCache<K, V>>).value).entries = SyncMap__from_collections.$storageOf<K, {
            value: parseCacheEntry<V>;
        } | undefined>(__gotots_struct_0);
    }
    static $go$private$build$store$kernel<K, V>(c: tsonicTypeScriptRuntime.Location<parseCache<K, V>> | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_adapt$PointerTo_Named_build$parseCacheEntryOf_T1_to_Interface_void: ($0: {
        value: parseCacheEntry<V>;
    } | undefined) => GoInterface | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, key: K, value: V): void {
        const __gotots_store_1 = parseCache.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<parseCache<K, V>>).value);
        SyncMap__from_collections.Store$kernel<K, {
            value: parseCacheEntry<V>;
        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
            value: parseCacheEntry<V>;
        } | undefined>, SyncMap__from_collections<K, {
            value: parseCacheEntry<V>;
        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "entries"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$interface_adapt$PointerTo_Named_build$parseCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, key, { value: parseCacheEntry.$fromStorage<V>({
                value: $go$to_storage$T1_to_T1(value),
                mu: named_sync.SyncMutexOperations.$zero()
            }) });
    }
}
