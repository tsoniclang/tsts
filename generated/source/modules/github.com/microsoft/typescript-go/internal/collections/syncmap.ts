import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goArrayAllocate } from "@gotots/runtime/array.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type SyncMap$Storage<K, V> = {
    $blank0: GoArray<GoContainerStorage<K>, 0>;
    $blank1: GoArray<GoContainerStorage<V>, 0>;
    m: sync__from_gostdlib.Map;
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
    static $zero<K, V>(): SyncMap<K, V> {
        return new SyncMap<K, V>({
            $blank0: goArrayAllocate<GoContainerStorage<K>, 0>(0),
            $blank1: goArrayAllocate<GoContainerStorage<V>, 0>(0),
            m: named_sync.SyncMapOperations.$zero()
        });
    }
    static $copy<K, V>($source: SyncMap<K, V>): SyncMap<K, V> {
        return new SyncMap<K, V>({
            $blank0: goArrayAllocate<GoContainerStorage<K>, 0>(0),
            $blank1: goArrayAllocate<GoContainerStorage<V>, 0>(0),
            m: named_sync.SyncMapOperations.$copy($source.$storage.m)
        });
    }
    declare private readonly then?: never;
    static Clear<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined): void {
        sync__from_gostdlib.Map.Clear(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m);
    }
    static Clone<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined): tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined {
        let clone: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined = tsonicTypeScriptRuntime.location<SyncMap<K, V>>(SyncMap.$fromStorage<K, V>({
            $blank0: goArrayAllocate<GoContainerStorage<K>, 0>(0),
            $blank1: goArrayAllocate<GoContainerStorage<V>, 0>(0),
            m: named_sync.SyncMapOperations.$zero()
        }));
        sync__from_gostdlib.Map.Range(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, (key: GoInterface | undefined, value: GoInterface | undefined): bool => {
            sync__from_gostdlib.Map.Store(SyncMap.$storageOf(((clone ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, key, value);
            return true;
        });
        return clone;
    }
    static Delete$kernel<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, key: K): void {
        sync__from_gostdlib.Map.Delete(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, $go$interface_adapt$T0_to_Interface_void(key));
    }
    static Keys$kernel<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => K): iter__from_gostdlib.Seq<K> {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: K) => bool) | undefined): void => {
            sync__from_gostdlib.Map.Range(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, (key: GoInterface | undefined, value: GoInterface | undefined): bool => {
                const __gotots_callee_4 = __go_yield;
                const __gotots_argument_2 = $go$copy$T0_to_T0($go$interface_assert$Interface_void_to_T0(key));
                if (!(__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2)) {
                    return false;
                }
                return true;
            });
        });
    }
    static Load$kernel<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_T1: ($0: GoInterface | undefined) => V, $go$zero$void_to_T1: () => V, key: K): [
        V,
        bool
    ] {
        let value: V = $go$zero$void_to_T1();
        let ok: bool = false;
        const __gotots_results_1 = sync__from_gostdlib.Map.Load(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, $go$interface_adapt$T0_to_Interface_void(key));
        let val: GoInterface | undefined = __gotots_results_1[0];
        ok = __gotots_results_1[1];
        if (!ok || val === undefined) {
            return [$go$copy$T1_to_T1(value), ok];
        }
        return [$go$copy$T1_to_T1($go$interface_assert$Interface_void_to_T1(val)), true];
    }
    static LoadOrStore$kernel<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$interface_adapt$T1_to_Interface_void: ($0: V) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$interface_assert$Interface_void_to_T1: ($0: GoInterface | undefined) => V, $go$zero$void_to_T1: () => V, key: K, value: V): [
        V,
        bool
    ] {
        let actual: V = $go$zero$void_to_T1();
        let loaded: bool = false;
        const __gotots_results_3 = sync__from_gostdlib.Map.LoadOrStore(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, $go$interface_adapt$T0_to_Interface_void(key), $go$interface_adapt$T1_to_Interface_void(value));
        let actualAny: GoInterface | undefined = __gotots_results_3[0];
        loaded = __gotots_results_3[1];
        if (actualAny === undefined) {
            return [$go$copy$T1_to_T1(actual), loaded];
        }
        return [$go$copy$T1_to_T1($go$interface_assert$Interface_void_to_T1(actualAny)), loaded];
    }
    static Range$kernel<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$interface_assert$Interface_void_to_T1: ($0: GoInterface | undefined) => V, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => K, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V, f: (($0: K, $1: V) => bool) | undefined): void {
        sync__from_gostdlib.Map.Range(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, (key: GoInterface | undefined, value: GoInterface | undefined): bool => {
            let k: K = $go$zero$void_to_T0();
            if (!(key === undefined)) {
                k = $go$copy$T0_to_T0($go$interface_assert$Interface_void_to_T0(key));
            }
            let v: V = $go$zero$void_to_T1();
            if (!(value === undefined)) {
                v = $go$copy$T1_to_T1($go$interface_assert$Interface_void_to_T1(value));
            }
            const __gotots_callee_0 = f;
            const __gotots_argument_0 = $go$copy$T0_to_T0(k);
            const __gotots_argument_1 = $go$copy$T1_to_T1(v);
            return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
        });
    }
    static Size<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined): int {
        let count = 0;
        sync__from_gostdlib.Map.Range(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, ($0: GoInterface | undefined, $1: GoInterface | undefined): bool => {
            count++;
            return true;
        });
        return count;
    }
    static Store$kernel<K, V>(s: tsonicTypeScriptRuntime.Location<SyncMap<K, V>> | undefined, $go$interface_adapt$T1_to_Interface_void: ($0: V) => GoInterface | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, key: K, value: V): void {
        sync__from_gostdlib.Map.Store(SyncMap.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncMap<K, V>>).value).m, $go$interface_adapt$T0_to_Interface_void(key), $go$interface_adapt$T1_to_Interface_void(value));
    }
}
