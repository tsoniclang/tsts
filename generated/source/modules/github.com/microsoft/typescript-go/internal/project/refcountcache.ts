import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncMap$Storage as SyncMap__from_collections$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, int, uint32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage, GoStorage } from "@gotots/runtime/storage.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
export type refCountCacheEntry$Storage<V> = {
    mu: sync__from_gostdlib.Mutex;
    value: GoStorage<V>;
    refCount: int;
};
export class refCountCacheEntry<V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: refCountCacheEntry$Storage<V>) {
    }
    public static $storageOf<V>($source: refCountCacheEntry<V>): refCountCacheEntry$Storage<V> {
        return $source.$storage;
    }
    public static $fromStorage<V>($source: refCountCacheEntry$Storage<V>): refCountCacheEntry<V> {
        return new refCountCacheEntry<V>($source);
    }
    static $copy<V>($go$copy$T0_to_T0: ($0: V) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<V>) => V, $go$to_storage$T0_to_T0: ($0: V) => GoStorage<V>, $source: refCountCacheEntry<V>): refCountCacheEntry<V> {
        return new refCountCacheEntry<V>({
            mu: named_sync.SyncMutexOperations.$copy($source.$storage.mu),
            value: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.value))),
            refCount: $source.$storage.refCount
        });
    }
    static $equal<V>($go$equal$T0_T0_to_bool: ($0: V, $1: V) => bool, $go$from_storage$T0_to_T0: ($0: GoStorage<V>) => V, $left: refCountCacheEntry<V>, $right: refCountCacheEntry<V>): bool {
        return named_sync.SyncMutexOperations.$equal($left.$storage.mu, $right.$storage.mu) && $go$equal$T0_T0_to_bool($go$from_storage$T0_to_T0($left.$storage.value), $go$from_storage$T0_to_T0($right.$storage.value)) && $left.$storage.refCount === $right.$storage.refCount;
    }
    static $hash<V>($go$from_storage$T0_to_T0: ($0: GoStorage<V>) => V, $go$hash$T0_to_uint32: ($0: V) => uint32, $source: refCountCacheEntry<V>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.$storage.mu));
        $hash = GoMapHash.mix($hash, $go$hash$T0_to_uint32($go$from_storage$T0_to_T0($source.$storage.value)));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.refCount));
        return $hash;
    }
    declare private readonly then?: never;
}
export type RefCountCacheOptions$Storage = {
    DisableDeletion: bool;
};
export class RefCountCacheOptions {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: RefCountCacheOptions$Storage) {
    }
    public static $storageOf($source: RefCountCacheOptions): RefCountCacheOptions$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: RefCountCacheOptions$Storage): RefCountCacheOptions {
        return new RefCountCacheOptions($source);
    }
    public get DisableDeletion(): bool {
        return this.$storage.DisableDeletion;
    }
    public set DisableDeletion($value: bool) {
        this.$storage.DisableDeletion = $value;
    }
    static $copy($source: RefCountCacheOptions): RefCountCacheOptions {
        return new RefCountCacheOptions({
            DisableDeletion: $source.$storage.DisableDeletion
        });
    }
    static $equal($left: RefCountCacheOptions, $right: RefCountCacheOptions): bool {
        return $left.$storage.DisableDeletion === $right.$storage.DisableDeletion;
    }
    static $hash($source: RefCountCacheOptions): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.DisableDeletion));
        return $hash;
    }
    declare private readonly then?: never;
}
export type RefCountCache$Storage<K, V, AcquireArgs> = {
    Options: RefCountCacheOptions$Storage;
    entries: SyncMap__from_collections$Storage<K, {
        value: refCountCacheEntry<V>;
    } | undefined>;
    parse: (($0: K, $1: AcquireArgs) => V) | undefined;
};
export class RefCountCache<K, V, AcquireArgs> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: RefCountCache$Storage<K, V, AcquireArgs>) {
    }
    public static $storageOf<K, V, AcquireArgs>($source: RefCountCache<K, V, AcquireArgs>): RefCountCache$Storage<K, V, AcquireArgs> {
        return $source.$storage;
    }
    public static $fromStorage<K, V, AcquireArgs>($source: RefCountCache$Storage<K, V, AcquireArgs>): RefCountCache<K, V, AcquireArgs> {
        return new RefCountCache<K, V, AcquireArgs>($source);
    }
    static $copy<K, V, AcquireArgs>($source: RefCountCache<K, V, AcquireArgs>): RefCountCache<K, V, AcquireArgs> {
        return new RefCountCache<K, V, AcquireArgs>({
            Options: RefCountCacheOptions.$storageOf(RefCountCacheOptions.$copy(RefCountCacheOptions.$fromStorage($source.$storage.Options))),
            entries: SyncMap__from_collections.$storageOf<K, {
                value: refCountCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$copy<K, {
                value: refCountCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$fromStorage<K, {
                value: refCountCacheEntry<V>;
            } | undefined>($source.$storage.entries))),
            parse: $source.$storage.parse
        });
    }
    declare private readonly then?: never;
    static Acquire$kernel<K, V, AcquireArgs>(c: {
        value: RefCountCache<K, V, AcquireArgs>;
    } | undefined, $go$copy$T2_to_T2: ($0: AcquireArgs) => AcquireArgs, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: {
        value: refCountCacheEntry<V>;
    } | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$interface_adapt$PointerTo_Named_project$refCountCacheEntryOf_T1_to_Interface_void: ($0: {
        value: refCountCacheEntry<V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: () => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$zero$void_to_T1: () => V, identity: K, acquireArgs: AcquireArgs): V {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_0: V = $go$zero$void_to_T1();
        try {
            try {
                __gotots_return_block_1: {
                    const __gotots_results_4 = RefCountCache.$go$private$project$loadOrStoreNewLockedEntry$kernel<K, V, AcquireArgs>(c, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$interface_adapt$PointerTo_Named_project$refCountCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$zero$void_to_T1, $go$copy$T0_to_T0(identity));
                    let entry: {
                        value: refCountCacheEntry<V>;
                    } | undefined = __gotots_results_4[0];
                    let loaded = __gotots_results_4[1];
                    const __gotots_receiver_2 = refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_2, $go$recovery);
                    };
                    if (!loaded) {
                        const __gotots_callee_0 = RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).parse;
                        const __gotots_argument_1 = $go$copy$T0_to_T0(identity);
                        const __gotots_argument_2 = $go$copy$T2_to_T2(acquireArgs);
                        const __gotots_argument_3 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2);
                        const __gotots_argument_4 = $go$copy$T1_to_T1(__gotots_argument_3);
                        refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value = $go$to_storage$T1_to_T1(__gotots_argument_4);
                        __gotots_return_0 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value));
                        break __gotots_return_block_1;
                    }
                    __gotots_return_0 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value));
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
    static Deref$kernel<K, V, AcquireArgs>(c: {
        value: RefCountCache<K, V, AcquireArgs>;
    } | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: {
        value: refCountCacheEntry<V>;
    } | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: () => {
        value: refCountCacheEntry<V>;
    } | undefined, identity: K): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_0 = RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_0 = SyncMap__from_collections.Load$kernel<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$fromStorage<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>($go$storage);
                    }, ($go$value: SyncMap__from_collections<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections$Storage<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$storageOf<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>($go$value);
                    }), $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$copy$T0_to_T0(identity));
                    let entry: {
                        value: refCountCacheEntry<V>;
                    } | undefined = __gotots_results_0[0];
                    let ok = __gotots_results_0[1];
                    if (!ok) {
                        break __gotots_return_block_0;
                    }
                    sync__from_gostdlib.Mutex.Lock(refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    const __gotots_store_1 = refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    __gotots_store_1.refCount = __gotots_store_1.refCount - 1;
                    if (refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).refCount <= 0 && !RefCountCacheOptions.$storageOf(RefCountCacheOptions.$fromStorage(RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).Options)).DisableDeletion) {
                        const __gotots_store_2 = RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                        SyncMap__from_collections.Delete$kernel<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>, SyncMap__from_collections<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>): SyncMap__from_collections<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined> => {
                            return SyncMap__from_collections.$fromStorage<K, {
                                value: refCountCacheEntry<V>;
                            } | undefined>($go$storage);
                        }, ($go$value: SyncMap__from_collections<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>): SyncMap__from_collections$Storage<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined> => {
                            return SyncMap__from_collections.$storageOf<K, {
                                value: refCountCacheEntry<V>;
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
    static Ref$kernel<K, V, AcquireArgs>(c: {
        value: RefCountCache<K, V, AcquireArgs>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: {
        value: refCountCacheEntry<V>;
    } | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$interface_adapt$PointerTo_Named_project$refCountCacheEntryOf_T1_to_Interface_void: ($0: {
        value: refCountCacheEntry<V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: () => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$zero$void_to_T1: () => V, identity: K): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    const __gotots_store_3 = RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_1 = SyncMap__from_collections.Load$kernel<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$fromStorage<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>($go$storage);
                    }, ($go$value: SyncMap__from_collections<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined>): SyncMap__from_collections$Storage<K, {
                        value: refCountCacheEntry<V>;
                    } | undefined> => {
                        return SyncMap__from_collections.$storageOf<K, {
                            value: refCountCacheEntry<V>;
                        } | undefined>($go$value);
                    }), $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$copy$T0_to_T0(identity));
                    let entry: {
                        value: refCountCacheEntry<V>;
                    } | undefined = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (!ok) {
                        const __gotots_argument_0 = new GoInterfaceAdapter("cache entry not found");
                        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                    }
                    sync__from_gostdlib.Mutex.Lock(refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    });
                    if (refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).refCount <= 0 && !RefCountCacheOptions.$storageOf(RefCountCacheOptions.$fromStorage(RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).Options)).DisableDeletion) {
                        const __gotots_results_2 = RefCountCache.$go$private$project$loadOrStoreNewLockedEntry$kernel<K, V, AcquireArgs>(c, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$interface_adapt$PointerTo_Named_project$refCountCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$zero$void_to_T1, $go$copy$T0_to_T0(identity));
                        let newEntry: {
                            value: refCountCacheEntry<V>;
                        } | undefined = __gotots_results_2[0];
                        const __gotots_receiver_1 = refCountCacheEntry.$storageOf((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                        });
                        refCountCacheEntry.$storageOf((newEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value = $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1(refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).value)));
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_4 = refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    __gotots_store_4.refCount = __gotots_store_4.refCount + 1;
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
    }
    static $go$private$project$loadOrStoreNewLockedEntry$kernel<K, V, AcquireArgs>(c: {
        value: RefCountCache<K, V, AcquireArgs>;
    } | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: {
        value: refCountCacheEntry<V>;
    } | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$interface_adapt$PointerTo_Named_project$refCountCacheEntryOf_T1_to_Interface_void: ($0: {
        value: refCountCacheEntry<V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: ($0: GoInterface | undefined) => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1: () => {
        value: refCountCacheEntry<V>;
    } | undefined, $go$zero$void_to_T1: () => V, key: K): [
        {
            value: refCountCacheEntry<V>;
        } | undefined,
        bool
    ] {
        let entry: {
            value: refCountCacheEntry<V>;
        } | undefined = { value: refCountCacheEntry.$fromStorage<V>({
                refCount: 1,
                mu: named_sync.SyncMutexOperations.$zero(),
                value: $go$to_storage$T1_to_T1($go$zero$void_to_T1())
            }) };
        sync__from_gostdlib.Mutex.Lock(refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
        const __gotots_store_5 = RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
        const __gotots_results_3 = SyncMap__from_collections.LoadOrStore$kernel<K, {
            value: refCountCacheEntry<V>;
        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
            value: refCountCacheEntry<V>;
        } | undefined>, SyncMap__from_collections<K, {
            value: refCountCacheEntry<V>;
        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "entries"), ($go$storage: SyncMap__from_collections$Storage<K, {
            value: refCountCacheEntry<V>;
        } | undefined>): SyncMap__from_collections<K, {
            value: refCountCacheEntry<V>;
        } | undefined> => {
            return SyncMap__from_collections.$fromStorage<K, {
                value: refCountCacheEntry<V>;
            } | undefined>($go$storage);
        }, ($go$value: SyncMap__from_collections<K, {
            value: refCountCacheEntry<V>;
        } | undefined>): SyncMap__from_collections$Storage<K, {
            value: refCountCacheEntry<V>;
        } | undefined> => {
            return SyncMap__from_collections.$storageOf<K, {
                value: refCountCacheEntry<V>;
            } | undefined>($go$value);
        }), $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$interface_adapt$PointerTo_Named_project$refCountCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$copy$T0_to_T0(key), entry);
        let existing: {
            value: refCountCacheEntry<V>;
        } | undefined = __gotots_results_3[0];
        let loaded = __gotots_results_3[1];
        if (loaded) {
            sync__from_gostdlib.Mutex.Unlock(refCountCacheEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
            sync__from_gostdlib.Mutex.Lock(refCountCacheEntry.$storageOf((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
            if (refCountCacheEntry.$storageOf((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).refCount <= 0 && !RefCountCacheOptions.$storageOf(RefCountCacheOptions.$fromStorage(RefCountCache.$storageOf((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).Options)).DisableDeletion) {
                sync__from_gostdlib.Mutex.Unlock(refCountCacheEntry.$storageOf((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                return RefCountCache.$go$private$project$loadOrStoreNewLockedEntry$kernel<K, V, AcquireArgs>(c, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_project$refCountCacheEntryOf_T1_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$interface_adapt$PointerTo_Named_project$refCountCacheEntryOf_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_project$refCountCacheEntryOf_T1, $go$zero$void_to_T1, $go$copy$T0_to_T0(key));
            }
            const __gotots_store_6 = refCountCacheEntry.$storageOf((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
            __gotots_store_6.refCount = __gotots_store_6.refCount + 1;
            return [existing, true];
        }
        return [entry, false];
    }
}
export function NewRefCountCache<K, V, AcquireArgs>(options: RefCountCacheOptions, parse: (($0: K, $1: AcquireArgs) => V) | undefined): {
    value: RefCountCache<K, V, AcquireArgs>;
} | undefined {
    return { value: RefCountCache.$fromStorage<K, V, AcquireArgs>({
            Options: RefCountCacheOptions.$storageOf(RefCountCacheOptions.$copy(options)),
            parse: parse,
            entries: SyncMap__from_collections.$storageOf<K, {
                value: refCountCacheEntry<V>;
            } | undefined>(SyncMap__from_collections.$zero<K, {
                value: refCountCacheEntry<V>;
            } | undefined>())
        }) };
}
