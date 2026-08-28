import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncMap$Storage as SyncMap__from_collections$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { mapEntry$Storage as mapEntry__from_dirty$Storage } from "./entry.js";
import type { Value } from "./interfaces.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, uint32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage, GoStorage } from "@gotots/runtime/storage.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { mapEntry } from "./entry.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type lockedEntry$Storage<K, V> = {
    e: {
        value: SyncMapEntry<K, V>;
    } | undefined;
};
export class lockedEntry<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: lockedEntry$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: lockedEntry<K, V>): lockedEntry$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: lockedEntry$Storage<K, V>): lockedEntry<K, V> {
        return new lockedEntry<K, V>($source);
    }
    declare private readonly then?: never;
    static Change$kernel<K, V>(e: lockedEntry<K, V> | undefined, $go$constraint_method$dirty$Clone$T1_to_T1: ($0: V) => V, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, apply: (($0: V) => void) | undefined): void {
        SyncMapEntry.$go$private$dirty$changeLocked$kernel<K, V>(lockedEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).e, $go$constraint_method$dirty$Clone$T1_to_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, apply);
    }
    static ChangeIf$kernel<K, V>(e: lockedEntry<K, V> | undefined, $go$constraint_method$dirty$Clone$T1_to_T1: ($0: V) => V, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$zero$void_to_T1: () => V, cond: (($0: V) => bool) | undefined, apply: (($0: V) => void) | undefined): bool {
        const __gotots_callee_12 = cond;
        const __gotots_argument_14 = $go$copy$T1_to_T1(SyncMapEntry.$go$private$dirty$valueLocked$kernel<K, V>(lockedEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).e, $go$copy$T1_to_T1, $go$from_storage$T1_to_T1, $go$zero$void_to_T1));
        if ((__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14)) {
            SyncMapEntry.$go$private$dirty$changeLocked$kernel<K, V>(lockedEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).e, $go$constraint_method$dirty$Clone$T1_to_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, apply);
            return true;
        }
        return false;
    }
    static Delete$kernel<K, V>(e: lockedEntry<K, V> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined): void {
        SyncMapEntry.$go$private$dirty$deleteLocked$kernel<K, V>(lockedEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).e, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1);
    }
    static Dirty<K, V>(e: lockedEntry<K, V> | undefined): bool {
        return (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
            SyncMapEntry.$storageOf((lockedEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty;
    }
    static Locked$kernel<K, V>(e: lockedEntry<K, V> | undefined, $go$interface_adapt$PointerTo_Named_dirty$lockedEntryOf_T0_And_T1_to_Named_dirty$ValueOf_T1: ($0: lockedEntry<K, V> | undefined) => Value<V> | undefined, fn: (($0: Value<V> | undefined) => void) | undefined): void {
        const __gotots_callee_13 = fn;
        const __gotots_argument_15 = $go$interface_adapt$PointerTo_Named_dirty$lockedEntryOf_T0_And_T1_to_Named_dirty$ValueOf_T1(e);
        (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
    }
    static Original$kernel<K, V>(e: lockedEntry<K, V> | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V): V {
        return $go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
            SyncMapEntry.$storageOf((lockedEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).original);
    }
    static Value$kernel<K, V>(e: lockedEntry<K, V> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$zero$void_to_T1: () => V): V {
        return $go$copy$T1_to_T1(SyncMapEntry.$go$private$dirty$valueLocked$kernel<K, V>(lockedEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).e, $go$copy$T1_to_T1, $go$from_storage$T1_to_T1, $go$zero$void_to_T1));
    }
}
export type SyncMapEntry$Storage<K, V> = {
    m: {
        value: SyncMap<K, V>;
    } | undefined;
    mu: sync__from_gostdlib.Mutex;
    mapEntry: mapEntry__from_dirty$Storage<K, V>;
    proxyFor: {
        value: SyncMapEntry<K, V>;
    } | undefined;
};
export class SyncMapEntry<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SyncMapEntry$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: SyncMapEntry<K, V>): SyncMapEntry$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: SyncMapEntry$Storage<K, V>): SyncMapEntry<K, V> {
        return new SyncMapEntry<K, V>($source);
    }
    static $copy<K, V>($go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $source: SyncMapEntry<K, V>): SyncMapEntry<K, V> {
        return new SyncMapEntry<K, V>({
            m: $source.$storage.m,
            mu: named_sync.SyncMutexOperations.$copy($source.$storage.mu),
            mapEntry: mapEntry.$storageOf<K, V>(mapEntry.$copy<K, V>($go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$to_storage$T1_to_T1, $go$to_storage$T0_to_T0, mapEntry.$fromStorage<K, V>($source.$storage.mapEntry))),
            proxyFor: $source.$storage.proxyFor
        });
    }
    static $equal<K, V>($go$equal$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_bool: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined, $1: {
        value: SyncMapEntry<K, V>;
    } | undefined) => bool, $go$equal$PointerTo_Named_dirty$SyncMapOf_T0_And_T1_PointerTo_Named_dirty$SyncMapOf_T0_And_T1_to_bool: ($0: {
        value: SyncMap<K, V>;
    } | undefined, $1: {
        value: SyncMap<K, V>;
    } | undefined) => bool, $go$equal$Named_dirty$mapEntryOf_T0_And_T1_Named_dirty$mapEntryOf_T0_And_T1_to_bool: ($0: mapEntry<K, V>, $1: mapEntry<K, V>) => bool, $left: SyncMapEntry<K, V>, $right: SyncMapEntry<K, V>): bool {
        return $go$equal$PointerTo_Named_dirty$SyncMapOf_T0_And_T1_PointerTo_Named_dirty$SyncMapOf_T0_And_T1_to_bool($left.$storage.m, $right.$storage.m) && named_sync.SyncMutexOperations.$equal($left.$storage.mu, $right.$storage.mu) && $go$equal$Named_dirty$mapEntryOf_T0_And_T1_Named_dirty$mapEntryOf_T0_And_T1_to_bool(mapEntry.$fromStorage<K, V>($left.$storage.mapEntry), mapEntry.$fromStorage<K, V>($right.$storage.mapEntry)) && $go$equal$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_bool($left.$storage.proxyFor, $right.$storage.proxyFor);
    }
    static $hash<K, V>($go$hash$Named_dirty$mapEntryOf_T0_And_T1_to_uint32: ($0: mapEntry<K, V>) => uint32, $go$hash$PointerTo_Named_dirty$SyncMapOf_T0_And_T1_to_uint32: ($0: {
        value: SyncMap<K, V>;
    } | undefined) => uint32, $go$hash$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_uint32: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => uint32, $source: SyncMapEntry<K, V>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $go$hash$PointerTo_Named_dirty$SyncMapOf_T0_And_T1_to_uint32($source.$storage.m));
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.$storage.mu));
        $hash = GoMapHash.mix($hash, $go$hash$Named_dirty$mapEntryOf_T0_And_T1_to_uint32(mapEntry.$fromStorage<K, V>($source.$storage.mapEntry)));
        $hash = GoMapHash.mix($hash, $go$hash$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_uint32($source.$storage.proxyFor));
        return $hash;
    }
    declare private readonly then?: never;
    static Change$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$constraint_method$dirty$Clone$T1_to_T1: ($0: V) => V, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, apply: (($0: V) => void) | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (!(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor === undefined)) {
                        SyncMapEntry.Change$kernel<K, V>(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor, $go$constraint_method$dirty$Clone$T1_to_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, apply);
                        break __gotots_return_block_0;
                    }
                    SyncMapEntry.$go$private$dirty$changeLocked$kernel<K, V>(e, $go$constraint_method$dirty$Clone$T1_to_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, apply);
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
    static ChangeIf$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$constraint_method$dirty$Clone$T1_to_T1: ($0: V) => V, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, cond: (($0: V) => bool) | undefined, apply: (($0: V) => void) | undefined): bool {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (!(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor === undefined)) {
                        __gotots_return_0 = SyncMapEntry.ChangeIf$kernel<K, V>(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor, $go$constraint_method$dirty$Clone$T1_to_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, cond, apply);
                        break __gotots_return_block_0;
                    }
                    const __gotots_callee_5 = cond;
                    const __gotots_argument_5 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                    if ((__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5)) {
                        SyncMapEntry.$go$private$dirty$changeLocked$kernel<K, V>(e, $go$constraint_method$dirty$Clone$T1_to_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, apply);
                        __gotots_return_0 = true;
                        break __gotots_return_block_0;
                    }
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
    static Delete$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    });
                    if (!(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor === undefined)) {
                        SyncMapEntry.Delete$kernel<K, V>(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1);
                        break __gotots_return_block_0;
                    }
                    if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty) {
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete = true;
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_0 = SyncMap.$storageOf((SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_0 = SyncMap__from_collections.LoadOrStore$kernel<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$copy$T0_to_T0($go$from_storage$T0_to_T0((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).key)), e);
                    let entry: {
                        value: SyncMapEntry<K, V>;
                    } | undefined = __gotots_results_0[0];
                    let loaded = __gotots_results_0[1];
                    if (loaded) {
                        sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                        const __gotots_receiver_1 = SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                        });
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete = true;
                    }
                    else {
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete = true;
                    }
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
    static DeleteIf$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, cond: (($0: V) => bool) | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (!(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor === undefined)) {
                        SyncMapEntry.DeleteIf$kernel<K, V>(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, cond);
                        break __gotots_return_block_0;
                    }
                    const __gotots_callee_6 = cond;
                    const __gotots_argument_6 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                    if ((__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6)) {
                        SyncMapEntry.$go$private$dirty$deleteLocked$kernel<K, V>(e, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$to_storage$T1_to_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1);
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
    static Dirty<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined): bool {
        let __gotots_deferred_1: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: bool = false;
        try {
            try {
                __gotots_return_block_1: {
                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_2 = SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_1 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_2, $go$recovery);
                    };
                    if (!(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor === undefined)) {
                        __gotots_return_1 = SyncMapEntry.Dirty<K, V>(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor);
                        break __gotots_return_block_1;
                    }
                    __gotots_return_1 = (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty;
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
    static Locked$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$interface_adapt$PointerTo_Named_dirty$lockedEntryOf_T0_And_T1_to_Named_dirty$ValueOf_T1: ($0: lockedEntry<K, V> | undefined) => Value<V> | undefined, fn: (($0: Value<V> | undefined) => void) | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (!(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor === undefined)) {
                        SyncMapEntry.Locked$kernel<K, V>(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor, $go$interface_adapt$PointerTo_Named_dirty$lockedEntryOf_T0_And_T1_to_Named_dirty$ValueOf_T1, fn);
                        break __gotots_return_block_0;
                    }
                    const __gotots_callee_2 = fn;
                    const __gotots_argument_2 = $go$interface_adapt$PointerTo_Named_dirty$lockedEntryOf_T0_And_T1_to_Named_dirty$ValueOf_T1(lockedEntry.$fromStorage<K, V>({
                        e: e
                    }));
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
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
    static Value$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$zero$void_to_T1: () => V): V {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: V = $go$zero$void_to_T1();
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                    const __gotots_receiver_0 = SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                    };
                    if (!(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor === undefined)) {
                        __gotots_return_0 = $go$copy$T1_to_T1(SyncMapEntry.Value$kernel<K, V>(SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor, $go$copy$T1_to_T1, $go$from_storage$T1_to_T1, $go$zero$void_to_T1));
                        break __gotots_return_block_0;
                    }
                    __gotots_return_0 = $go$copy$T1_to_T1(SyncMapEntry.$go$private$dirty$valueLocked$kernel<K, V>(e, $go$copy$T1_to_T1, $go$from_storage$T1_to_T1, $go$zero$void_to_T1));
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
    static $go$private$dirty$changeLocked$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$constraint_method$dirty$Clone$T1_to_T1: ($0: V) => V, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, apply: (($0: V) => void) | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty) {
                        const __gotots_callee_3 = apply;
                        const __gotots_argument_3 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                        (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_3 = SyncMap.$storageOf((SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_4 = SyncMap__from_collections.LoadOrStore$kernel<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$copy$T0_to_T0($go$from_storage$T0_to_T0((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).key)), e);
                    let entry: {
                        value: SyncMapEntry<K, V>;
                    } | undefined = __gotots_results_4[0];
                    let loaded = __gotots_results_4[1];
                    if (loaded) {
                        sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                        const __gotots_receiver_0 = SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                        });
                    }
                    if (!(void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty) {
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value = $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$constraint_method$dirty$Clone$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value))));
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty = true;
                    }
                    if (loaded) {
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor = entry;
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value = $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value)));
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty = true;
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete = (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete;
                    }
                    const __gotots_callee_4 = apply;
                    const __gotots_argument_4 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                    (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
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
    static $go$private$dirty$deleteLocked$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty) {
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete = true;
                        break __gotots_return_block_0;
                    }
                    const __gotots_store_7 = SyncMap.$storageOf((SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_9 = SyncMap__from_collections.LoadOrStore$kernel<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$copy$T0_to_T0($go$from_storage$T0_to_T0((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).key)), e);
                    let entry: {
                        value: SyncMapEntry<K, V>;
                    } | undefined = __gotots_results_9[0];
                    let loaded = __gotots_results_9[1];
                    if (loaded) {
                        sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                        const __gotots_receiver_0 = SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                        });
                        SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).proxyFor = entry;
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value = $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value)));
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete = true;
                        (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty = (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty;
                    }
                    (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete = true;
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
    static $go$private$dirty$valueLocked$kernel<K, V>(e: {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$zero$void_to_T1: () => V): V {
        if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete) {
            let zero: V = $go$zero$void_to_T1();
            return $go$copy$T1_to_T1(zero);
        }
        return $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
            SyncMapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
    }
}
export type SyncMap$Storage<K, V> = {
    base: GoMapValue<K, V>;
    dirty: SyncMap__from_collections$Storage<K, {
        value: SyncMapEntry<K, V>;
    } | undefined>;
};
export class SyncMap<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SyncMap$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: SyncMap<K, V>): SyncMap$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: SyncMap$Storage<K, V>): SyncMap<K, V> {
        return new SyncMap<K, V>($source);
    }
    static $copy<K, V>($source: SyncMap<K, V>): SyncMap<K, V> {
        return new SyncMap<K, V>({
            base: $source.$storage.base,
            dirty: SyncMap__from_collections.$storageOf<K, {
                value: SyncMapEntry<K, V>;
            } | undefined>(SyncMap__from_collections.$copy<K, {
                value: SyncMapEntry<K, V>;
            } | undefined>(SyncMap__from_collections.$fromStorage<K, {
                value: SyncMapEntry<K, V>;
            } | undefined>($source.$storage.dirty)))
        });
    }
    declare private readonly then?: never;
    static Finalize$kernel<K, V>(m: {
        value: SyncMap<K, V>;
    } | undefined, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => K, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V): [
        GoMapValue<K, V>,
        bool
    ] {
        return SyncMap.$go$private$dirty$finalize$kernel<K, V>(m, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$interface_assert$Interface_void_to_T0, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_T0, $go$zero$void_to_T1, FinalizationHooks.$fromStorage<K, V>({
            OnDelete: void 0,
            OnChange: void 0,
            OnAdd: void 0
        }));
    }
    static FinalizeWith$kernel<K, V>(m: {
        value: SyncMap<K, V>;
    } | undefined, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => K, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V, hooks: FinalizationHooks<K, V>): [
        GoMapValue<K, V>,
        bool
    ] {
        return SyncMap.$go$private$dirty$finalize$kernel<K, V>(m, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$from_storage$T1_to_T1, $go$interface_assert$Interface_void_to_T0, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_T0, $go$zero$void_to_T1, FinalizationHooks.$copy<K, V>(hooks));
    }
    static Load$kernel<K, V>(m: {
        value: SyncMap<K, V>;
    } | undefined, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, key: K): [
        {
            value: SyncMapEntry<K, V>;
        } | undefined,
        bool
    ] {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: SyncMapEntry<K, V>;
            } | undefined,
            bool
        ] = [void 0, false];
        try {
            try {
                __gotots_return_block_0: {
                    {
                        const __gotots_store_2 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                        const __gotots_results_2 = SyncMap__from_collections.Load$kernel<K, {
                            value: SyncMapEntry<K, V>;
                        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                            value: SyncMapEntry<K, V>;
                        } | undefined>, SyncMap__from_collections<K, {
                            value: SyncMapEntry<K, V>;
                        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, key);
                        let entry: {
                            value: SyncMapEntry<K, V>;
                        } | undefined = __gotots_results_2[0];
                        let ok = __gotots_results_2[1];
                        if (ok) {
                            sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                            const __gotots_receiver_0 = SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                            });
                            if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete) {
                                __gotots_return_0 = [void 0, false];
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = [entry, true];
                            break __gotots_return_block_0;
                        }
                    }
                    {
                        const __gotots_results_3 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base.lookupOk(key);
                        let val: V = __gotots_results_3[0];
                        let ok = __gotots_results_3[1];
                        if (ok) {
                            __gotots_return_0 = [
                                { value: SyncMapEntry.$fromStorage<K, V>({
                                        m: m,
                                        mapEntry: (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                            {
                                                key: $go$to_storage$T0_to_T0(key),
                                                original: $go$to_storage$T1_to_T1(val),
                                                value: $go$to_storage$T1_to_T1(val),
                                                dirty: false,
                                                __go_delete: false
                                            })),
                                        mu: named_sync.SyncMutexOperations.$zero(),
                                        proxyFor: void 0
                                    }) }, true];
                            break __gotots_return_block_0;
                        }
                    }
                    __gotots_return_0 = [void 0, false];
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
    static LoadOrStore$kernel<K, V>(m: {
        value: SyncMap<K, V>;
    } | undefined, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$zero$void_to_T1: () => V, key: K, value: V): [
        {
            value: SyncMapEntry<K, V>;
        } | undefined,
        bool
    ] {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            {
                value: SyncMapEntry<K, V>;
            } | undefined,
            bool
        ] = [void 0, false];
        try {
            try {
                __gotots_return_block_0: {
                    {
                        const __gotots_results_5 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base.lookupOk(key);
                        let baseValue: V = __gotots_results_5[0];
                        let ok = __gotots_results_5[1];
                        if (ok) {
                            {
                                const __gotots_store_4 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                                const __gotots_results_6 = SyncMap__from_collections.Load$kernel<K, {
                                    value: SyncMapEntry<K, V>;
                                } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                                    value: SyncMapEntry<K, V>;
                                } | undefined>, SyncMap__from_collections<K, {
                                    value: SyncMapEntry<K, V>;
                                } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, key);
                                let dirty: {
                                    value: SyncMapEntry<K, V>;
                                } | undefined = __gotots_results_6[0];
                                let ok__shadow_1 = __gotots_results_6[1];
                                if (ok__shadow_1) {
                                    sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((dirty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                                    const __gotots_receiver_0 = SyncMapEntry.$storageOf((dirty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                        recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                                    });
                                    if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                        SyncMapEntry.$storageOf((dirty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete) {
                                        __gotots_return_0 = [void 0, false];
                                        break __gotots_return_block_0;
                                    }
                                    __gotots_return_0 = [dirty, true];
                                    break __gotots_return_block_0;
                                }
                            }
                            __gotots_return_0 = [
                                { value: SyncMapEntry.$fromStorage<K, V>({
                                        m: m,
                                        mapEntry: (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                            {
                                                key: $go$to_storage$T0_to_T0(key),
                                                original: $go$to_storage$T1_to_T1(baseValue),
                                                value: $go$to_storage$T1_to_T1(baseValue),
                                                dirty: false,
                                                __go_delete: false
                                            })),
                                        mu: named_sync.SyncMutexOperations.$zero(),
                                        proxyFor: void 0
                                    }) }, true];
                            break __gotots_return_block_0;
                        }
                    }
                    const __gotots_store_5 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
                    const __gotots_results_7 = SyncMap__from_collections.LoadOrStore$kernel<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>, SyncMap__from_collections<K, {
                        value: SyncMapEntry<K, V>;
                    } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_adapt$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_Interface_void, $go$interface_adapt$T0_to_Interface_void, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, key, { value: SyncMapEntry.$fromStorage<K, V>({
                            m: m,
                            mapEntry: (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                {
                                    key: $go$to_storage$T0_to_T0(key),
                                    value: $go$to_storage$T1_to_T1(value),
                                    dirty: true,
                                    original: $go$to_storage$T1_to_T1($go$zero$void_to_T1()),
                                    __go_delete: false
                                })),
                            mu: named_sync.SyncMutexOperations.$zero(),
                            proxyFor: void 0
                        }) });
                    let entry: {
                        value: SyncMapEntry<K, V>;
                    } | undefined = __gotots_results_7[0];
                    let loaded = __gotots_results_7[1];
                    if (loaded) {
                        sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                        const __gotots_receiver_1 = SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_1, $go$recovery);
                        });
                        if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete) {
                            __gotots_return_0 = [void 0, false];
                            break __gotots_return_block_0;
                        }
                    }
                    __gotots_return_0 = [entry, loaded];
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
    static Range$kernel<K, V>(m: {
        value: SyncMap<K, V>;
    } | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => K, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<K, GoEmptyStruct>, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$zero$void_to_T0: () => K, fn: (($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => bool) | undefined): void {
        let seenInDirty: GoMapValue<K, GoEmptyStruct> = $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero());
        const __gotots_store_1 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
        SyncMap__from_collections.Range$kernel<K, {
            value: SyncMapEntry<K, V>;
        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
            value: SyncMapEntry<K, V>;
        } | undefined>, SyncMap__from_collections<K, {
            value: SyncMapEntry<K, V>;
        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$copy$T0_to_T0, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_assert$Interface_void_to_T0, $go$zero$void_to_T0, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, (key: K, entry: {
            value: SyncMapEntry<K, V>;
        } | undefined): bool => {
            seenInDirty.store(key, new GoEmptyStruct);
            sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
            let deleted = (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete;
            sync__from_gostdlib.Mutex.Unlock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
            let __gotots_logical_result_0 = !deleted;
            if (__gotots_logical_result_0) {
                const __gotots_callee_0 = fn;
                const __gotots_argument_0 = entry;
                __gotots_logical_result_0 = !(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            }
            if (__gotots_logical_result_0) {
                return false;
            }
            return true;
        });
        const __gotots_range_0 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = $go$copy$T0_to_T0(__gotots_range_value_0);
            const __gotots_range_value_3 = __gotots_range_value_1[0];
            let key: K = __gotots_range_value_2;
            let value: V = __gotots_range_value_3;
            {
                const __gotots_results_1 = seenInDirty.lookupOk(key);
                let ok = __gotots_results_1[1];
                if (ok) {
                    continue;
                }
            }
            const __gotots_callee_1 = fn;
            const __gotots_argument_1 = { value: SyncMapEntry.$fromStorage<K, V>({
                    m: m,
                    mapEntry: (void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                        {
                            key: $go$to_storage$T0_to_T0($go$copy$T0_to_T0(key)),
                            original: $go$to_storage$T1_to_T1(value),
                            value: $go$to_storage$T1_to_T1(value),
                            dirty: false,
                            __go_delete: false
                        })),
                    mu: named_sync.SyncMutexOperations.$zero(),
                    proxyFor: void 0
                }) };
            if (!(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1)) {
                break;
            }
        }
    }
    static $go$private$dirty$finalize$kernel<K, V>(m: {
        value: SyncMap<K, V>;
    } | undefined, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: {
        value: SyncMapEntry<K, V>;
    } | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => K, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: ($0: GoInterface | undefined) => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1: () => {
        value: SyncMapEntry<K, V>;
    } | undefined, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V, hooks: FinalizationHooks<K, V>): [
        GoMapValue<K, V>,
        bool
    ] {
        let changed = false;
        let result: GoMapValue<K, V> = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base;
        let ensureCloned: (() => void) | undefined = (): void => {
            if (!changed) {
                if (SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base.isNil()) {
                    result = $go$map_construct$T1_to_MapOf_T0_To_T1($go$zero$void_to_T1());
                }
                else {
                    result = generic_maps_kernel.MapsCloneKernel<GoMapValue<K, V>, K, V>($go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T0_to_T0, $go$copy$T1_to_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_T1, SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base);
                }
                changed = true;
            }
        };
        const __gotots_store_6 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value);
        SyncMap__from_collections.Range$kernel<K, {
            value: SyncMapEntry<K, V>;
        } | undefined>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<K, {
            value: SyncMapEntry<K, V>;
        } | undefined>, SyncMap__from_collections<K, {
            value: SyncMapEntry<K, V>;
        } | undefined>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "dirty"), SyncMap__from_collections.$fromStorage, SyncMap__from_collections.$storageOf), $go$copy$PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$copy$T0_to_T0, $go$interface_assert$Interface_void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, $go$interface_assert$Interface_void_to_T0, $go$zero$void_to_T0, $go$zero$void_to_PointerTo_Named_dirty$SyncMapEntryOf_T0_And_T1, (key: K, entry: {
            value: SyncMapEntry<K, V>;
        } | undefined): bool => {
            let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
            let __gotots_panic_0: GoPanic | undefined = undefined;
            let __gotots_return_0: bool = false;
            try {
                try {
                    __gotots_return_block_0: {
                        sync__from_gostdlib.Mutex.Lock(SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu);
                        const __gotots_receiver_0 = SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mu;
                        __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                            recovery_sync.SyncMutexUnlock(__gotots_receiver_0, $go$recovery);
                        };
                        if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).__go_delete) {
                            const __gotots_callee_7 = ensureCloned;
                            (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))();
                            if (!(FinalizationHooks.$storageOf(hooks).OnDelete === undefined)) {
                                const __gotots_callee_8 = FinalizationHooks.$storageOf(hooks).OnDelete;
                                const __gotots_argument_7 = $go$copy$T0_to_T0(key);
                                const __gotots_argument_8 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                    SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                                (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8);
                            }
                            result.delete(key);
                        }
                        else if ((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).dirty) {
                            const __gotots_callee_9 = ensureCloned;
                            (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))();
                            if (!(FinalizationHooks.$storageOf(hooks).OnChange === undefined) || !(FinalizationHooks.$storageOf(hooks).OnAdd === undefined)) {
                                {
                                    const __gotots_results_8 = SyncMap.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base.lookupOk(key);
                                    let ok = __gotots_results_8[1];
                                    if (ok) {
                                        if (!(FinalizationHooks.$storageOf(hooks).OnChange === undefined)) {
                                            const __gotots_callee_10 = FinalizationHooks.$storageOf(hooks).OnChange;
                                            const __gotots_argument_9 = $go$copy$T0_to_T0(key);
                                            const __gotots_argument_10 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                                SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).original));
                                            const __gotots_argument_11 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                                SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                                            (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                                        }
                                    }
                                    else if (!(FinalizationHooks.$storageOf(hooks).OnAdd === undefined)) {
                                        const __gotots_callee_11 = FinalizationHooks.$storageOf(hooks).OnAdd;
                                        const __gotots_argument_12 = $go$copy$T0_to_T0(key);
                                        const __gotots_argument_13 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                            SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                                        (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13);
                                    }
                                }
                            }
                            result.store(key, $go$from_storage$T1_to_T1((void mapEntry.$storageOf, (void mapEntry.$fromStorage,
                                SyncMapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).mapEntry)).value));
                        }
                        __gotots_return_0 = true;
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
        });
        return [result, changed];
    }
}
export function NewSyncMap<K, V>(base: GoMapValue<K, V>): {
    value: SyncMap<K, V>;
} | undefined {
    const __gotots_field_0 = base;
    const __gotots_struct_0 = SyncMap__from_collections.$zero<K, {
        value: SyncMapEntry<K, V>;
    } | undefined>();
    const __gotots_field_1 = SyncMap__from_collections.$storageOf<K, {
        value: SyncMapEntry<K, V>;
    } | undefined>(__gotots_struct_0);
    return { value: SyncMap.$fromStorage<K, V>({
            base: __gotots_field_0,
            dirty: __gotots_field_1
        }) };
}
export type FinalizationHooks$Storage<K, V> = {
    OnDelete: (($0: K, $1: V) => void) | undefined;
    OnChange: (($0: K, $1: V, $2: V) => void) | undefined;
    OnAdd: (($0: K, $1: V) => void) | undefined;
};
export class FinalizationHooks<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: FinalizationHooks$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: FinalizationHooks<K, V>): FinalizationHooks$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: FinalizationHooks$Storage<K, V>): FinalizationHooks<K, V> {
        return new FinalizationHooks<K, V>($source);
    }
    static $copy<K, V>($source: FinalizationHooks<K, V>): FinalizationHooks<K, V> {
        return new FinalizationHooks<K, V>({
            OnDelete: $source.$storage.OnDelete,
            OnChange: $source.$storage.OnChange,
            OnAdd: $source.$storage.OnAdd
        });
    }
    declare private readonly then?: never;
}
