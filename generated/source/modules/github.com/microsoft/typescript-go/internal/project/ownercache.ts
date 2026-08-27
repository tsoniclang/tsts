import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncMap$Storage as SyncMap__from_collections$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, uint64 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage, GoStorage } from "@gotots/runtime/storage.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_uint64_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type ownerCacheEntry$Storage<V> = {
    mu: sync__from_gostdlib.Mutex;
    value: GoStorage<V>;
    owners: GoMapValue<uint64, GoEmptyStruct>;
};
export class ownerCacheEntry<V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ownerCacheEntry$Storage<V>) {
    }
    public static $storageOf<V>($source: ownerCacheEntry<V>): ownerCacheEntry$Storage<V> {
        return $source.$storage;
    }
    public static $fromStorage<V>($source: ownerCacheEntry$Storage<V>): ownerCacheEntry<V> {
        return new ownerCacheEntry<V>($source);
    }
    static $copy<V>($go$copy$T0_to_T0: ($0: V) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<V>) => V, $go$to_storage$T0_to_T0: ($0: V) => GoStorage<V>, $source: ownerCacheEntry<V>): ownerCacheEntry<V> {
        return new ownerCacheEntry<V>({
            mu: named_sync.SyncMutexOperations.$copy($source.$storage.mu),
            value: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.value))),
            owners: $source.$storage.owners
        });
    }
    declare private readonly then?: never;
}
export type OwnerCache$Storage<K, V, LoadArgs> = {
    entries: SyncMap__from_collections$Storage<K, {
        value: ownerCacheEntry<V>;
    } | undefined>;
    isExpired: (($0: K, $1: V, $2: LoadArgs) => bool) | undefined;
    parse: (($0: K, $1: LoadArgs) => V) | undefined;
};
export class OwnerCache<K, V, LoadArgs> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: OwnerCache$Storage<K, V, LoadArgs>) {
    }
    public static $storageOf<K, V, LoadArgs>($source: OwnerCache<K, V, LoadArgs>): OwnerCache$Storage<K, V, LoadArgs> {
        return $source.$storage;
    }
    public static $fromStorage<K, V, LoadArgs>($source: OwnerCache$Storage<K, V, LoadArgs>): OwnerCache<K, V, LoadArgs> {
        return new OwnerCache<K, V, LoadArgs>($source);
    }
    static $copy<K, V, LoadArgs>($source: OwnerCache<K, V, LoadArgs>): OwnerCache<K, V, LoadArgs> {
        return new OwnerCache<K, V, LoadArgs>({
            entries: SyncMap__from_collections.$storageOf<K, {
                value: ownerCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$copy<K, {
                value: ownerCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$fromStorage<K, {
                value: ownerCacheEntry<V>;
            } | undefined>($source.$storage.entries))),
            isExpired: $source.$storage.isExpired,
            parse: $source.$storage.parse
        });
    }
    declare private readonly then?: never;
    static AddOwner$kernel<K, V, LoadArgs>(c: {
        value: OwnerCache<K, V, LoadArgs>;
    } | undefined, $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: {
        value: ownerCacheEntry<V>;
    } | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: () => {
        value: ownerCacheEntry<V>;
    } | undefined, identity: K, owner: uint64): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_2 = OwnerCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_1 = SyncMap__from_collections.Load$kernel<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$fromStorage<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>($go$storage);
                    }, ($go$value: SyncMap__from_collections<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections$Storage<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$storageOf<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>($go$value);
                    }), $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$copy$T0_to_T0(identity));
                    let entry: {
                        value: ownerCacheEntry<V>;
                    } | undefined = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (!ok) {
                        const __gotots_argument_0 = new GoInterfaceAdapter("OwnerCache.AddOwner: entry not found");
                        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                    }
                    sync__from_gostdlib.Mutex.Lock(ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).owners.length() === 0) {
                        const __gotots_argument_1 = new GoInterfaceAdapter("OwnerCache.AddOwner: entry has no owners");
                        GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
                    }
                    ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).owners.store(owner, new GoEmptyStruct);
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
    static LoadAndAcquire$kernel<K, V, LoadArgs>(c: {
        value: OwnerCache<K, V, LoadArgs>;
    } | undefined, $go$copy$T2_to_T2: ($0: LoadArgs) => LoadArgs, $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: {
        value: ownerCacheEntry<V>;
    } | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$interface_adapt$PointerTo_Named_project$ownerCacheEntryOf_T1_to_Interface_void: ($0: {
        value: ownerCacheEntry<V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: () => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$zero$void_to_T1: () => V, identity: K, owner: uint64, loadArgs: LoadArgs): V {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: V = $go$zero$void_to_T1();
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_2 = OwnerCache.$go$private$project$loadOrStoreLockedEntry$kernel<K, V, LoadArgs>(c, $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$copy$T0_to_T0, $go$interface_adapt$PointerTo_Named_project$ownerCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$zero$void_to_T1, $go$copy$T0_to_T0(identity));
                    let entry: {
                        value: ownerCacheEntry<V>;
                    } | undefined = __gotots_results_2[0];
                    let loaded = __gotots_results_2[1];
                    const __gotots_receiver_1 = ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                    };
                    let __gotots_logical_result_1 = !loaded;
                    if (!__gotots_logical_result_1) {
                        let __gotots_logical_result_0 = !(OwnerCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).isExpired === undefined);
                        if (__gotots_logical_result_0) {
                            const __gotots_callee_0 = OwnerCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).isExpired;
                            const __gotots_argument_2 = $go$copy$T0_to_T0(identity);
                            const __gotots_argument_3 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value));
                            const __gotots_argument_4 = $go$copy$T2_to_T2(loadArgs);
                            __gotots_logical_result_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
                        }
                        __gotots_logical_result_1 = __gotots_logical_result_0;
                    }
                    if (__gotots_logical_result_1) {
                        const __gotots_callee_1 = OwnerCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).parse;
                        const __gotots_argument_5 = $go$copy$T0_to_T0(identity);
                        const __gotots_argument_6 = $go$copy$T2_to_T2(loadArgs);
                        const __gotots_argument_7 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6);
                        const __gotots_argument_8 = $go$copy$T1_to_T1(__gotots_argument_7);
                        ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value = $go$to_storage$T1_to_T1(__gotots_argument_8);
                    }
                    ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).owners.store(owner, new GoEmptyStruct);
                    __gotots_return_0 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value));
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
        return __gotots_return_0;
    }
    static Release$kernel<K, V, LoadArgs>(c: {
        value: OwnerCache<K, V, LoadArgs>;
    } | undefined, $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: {
        value: ownerCacheEntry<V>;
    } | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: () => {
        value: ownerCacheEntry<V>;
    } | undefined, identity: K, owner: uint64): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_0 = OwnerCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_0 = SyncMap__from_collections.Load$kernel<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$fromStorage<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>($go$storage);
                    }, ($go$value: SyncMap__from_collections<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections$Storage<K, {
                        value: ownerCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$storageOf<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>($go$value);
                    }), $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$copy$T0_to_T0(identity));
                    let entry: {
                        value: ownerCacheEntry<V>;
                    } | undefined = __gotots_results_0[0];
                    let ok = __gotots_results_0[1];
                    if (!ok) {
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock(ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).owners.delete(owner);
                    if (ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).owners.length() === 0) {
                        const __gotots_store_1 = OwnerCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                        SyncMap__from_collections.Delete$kernel<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>, SyncMap__from_collections<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>): SyncMap__from_collections<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined> => {
                            return SyncMap__from_collections.$fromStorage<K, {
                                value: ownerCacheEntry<V>;
                            } | undefined>($go$storage);
                        }, ($go$value: SyncMap__from_collections<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined>): SyncMap__from_collections$Storage<K, {
                            value: ownerCacheEntry<V>;
                        } | undefined> => {
                            return SyncMap__from_collections.$storageOf<K, {
                                value: ownerCacheEntry<V>;
                            } | undefined>($go$value);
                        }), $go$interface_adapt$T0_to_Interface_void, $go$copy$T0_to_T0(identity));
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
    static $go$private$project$loadOrStoreLockedEntry$kernel<K, V, LoadArgs>(c: {
        value: OwnerCache<K, V, LoadArgs>;
    } | undefined, $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: {
        value: ownerCacheEntry<V>;
    } | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$interface_adapt$PointerTo_Named_project$ownerCacheEntryOf_T1_to_Interface_void: ($0: {
        value: ownerCacheEntry<V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1: () => {
        value: ownerCacheEntry<V>;
    } | undefined, $go$zero$void_to_T1: () => V, key: K): [
        {
            value: ownerCacheEntry<V>;
        } | undefined,
        bool
    ] {
        let entry: {
            value: ownerCacheEntry<V>;
        } | undefined = { value: ownerCacheEntry.$fromStorage<V>({
                owners: GoMap.make(0, []),
                mu: named_sync.SyncMutexOperations.$zero(),
                value: $go$to_storage$T1_to_T1($go$zero$void_to_T1())
            }) };
        sync__from_gostdlib.Mutex.Lock(ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
        const __gotots_store_3 = OwnerCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
        const __gotots_results_3 = SyncMap__from_collections.LoadOrStore$kernel<K, {
            value: ownerCacheEntry<V>;
        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
            value: ownerCacheEntry<V>;
        } | undefined>, SyncMap__from_collections<K, {
            value: ownerCacheEntry<V>;
        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
            value: ownerCacheEntry<V>;
        } | undefined>): SyncMap__from_collections<K, {
            value: ownerCacheEntry<V>;
        } | undefined> => {
            return SyncMap__from_collections.$fromStorage<K, {
                value: ownerCacheEntry<V>;
            } | undefined>($go$storage);
        }, ($go$value: SyncMap__from_collections<K, {
            value: ownerCacheEntry<V>;
        } | undefined>): SyncMap__from_collections$Storage<K, {
            value: ownerCacheEntry<V>;
        } | undefined> => {
            return SyncMap__from_collections.$storageOf<K, {
                value: ownerCacheEntry<V>;
            } | undefined>($go$value);
        }), $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$interface_adapt$PointerTo_Named_project$ownerCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$copy$T0_to_T0(key), entry);
        let existing: {
            value: ownerCacheEntry<V>;
        } | undefined = __gotots_results_3[0];
        let loaded = __gotots_results_3[1];
        if (loaded) {
            sync__from_gostdlib.Mutex.Unlock(ownerCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
            sync__from_gostdlib.Mutex.Lock(ownerCacheEntry.$storageOf((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
            if (ownerCacheEntry.$storageOf((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).owners.length() === 0) {
                sync__from_gostdlib.Mutex.Unlock(ownerCacheEntry.$storageOf((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                return OwnerCache.$go$private$project$loadOrStoreLockedEntry$kernel<K, V, LoadArgs>(c, $go$copy$PointerTo_Named_project$ownerCacheEntryOf_T1_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$copy$T0_to_T0, $go$interface_adapt$PointerTo_Named_project$ownerCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_project$ownerCacheEntryOf_T1, $go$zero$void_to_T1, $go$copy$T0_to_T0(key));
            }
            return [existing, true];
        }
        return [entry, false];
    }
}
export function NewOwnerCache<K, V, LoadArgs>(parse: (($0: K, $1: LoadArgs) => V) | undefined, isExpired: (($0: K, $1: V, $2: LoadArgs) => bool) | undefined): {
    value: OwnerCache<K, V, LoadArgs>;
} | undefined {
    return { value: OwnerCache.$fromStorage<K, V, LoadArgs>({
            isExpired: isExpired,
            parse: parse,
            entries: SyncMap__from_collections.$storageOf<K, {
                value: ownerCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$zero<K, {
                value: ownerCacheEntry<V>;
            } | undefined>())
        }) };
}
