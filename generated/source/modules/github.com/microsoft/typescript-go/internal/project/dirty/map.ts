import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { mapEntry$Storage as mapEntry__from_dirty$Storage } from "./entry.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { GoStorage } from "@gotots/runtime/storage.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { mapEntry } from "./entry.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type MapEntry$Storage<K, V> = {
    m: {
        value: Map<K, V>;
    } | undefined;
    mapEntry: mapEntry__from_dirty$Storage<K, V>;
};
export class MapEntry<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: MapEntry$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: MapEntry<K, V>): MapEntry$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: MapEntry$Storage<K, V>): MapEntry<K, V> {
        return new MapEntry<K, V>($source);
    }
    declare private readonly then?: never;
    static Change$kernel<K, V>(e: MapEntry<K, V> | undefined, $go$constraint_method$dirty$Clone$T1_to_T1: ($0: V) => V, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, apply: (($0: V) => void) | undefined): void {
        if (mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).__go_delete) {
            const __gotots_argument_0 = new GoInterfaceAdapter("tried to change a deleted entry");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        if (!mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).dirty) {
            mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).value = $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$constraint_method$dirty$Clone$T1_to_T1($go$from_storage$T1_to_T1(mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).value))));
            mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).dirty = true;
            Map.$storageOf((MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty.store($go$from_storage$T0_to_T0(mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).key), e);
        }
        const __gotots_callee_0 = apply;
        const __gotots_argument_1 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).value));
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
    }
    static ChangeIf$kernel<K, V>(e: MapEntry<K, V> | undefined, $go$constraint_method$dirty$Clone$T1_to_T1: ($0: V) => V, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_T1: () => V, cond: (($0: V) => bool) | undefined, apply: (($0: V) => void) | undefined): bool {
        const __gotots_callee_3 = cond;
        const __gotots_store_0 = MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")));
        const __gotots_argument_5 = mapEntry.Value$kernel<K, V>(tsonicTypeScriptRuntime.projectLocation<mapEntry__from_dirty$Storage<K, V>, mapEntry<K, V>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "mapEntry"), ($go$storage: mapEntry__from_dirty$Storage<K, V>): mapEntry<K, V> => {
            return mapEntry.$fromStorage<K, V>($go$storage);
        }, ($go$value: mapEntry<K, V>): mapEntry__from_dirty$Storage<K, V> => {
            return mapEntry.$storageOf<K, V>($go$value);
        }), $go$copy$T1_to_T1, $go$from_storage$T1_to_T1, $go$zero$void_to_T1);
        const __gotots_argument_6 = $go$copy$T1_to_T1(__gotots_argument_5);
        if ((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6)) {
            MapEntry.Change$kernel<K, V>(e, $go$constraint_method$dirty$Clone$T1_to_T1, $go$copy$T1_to_T1, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$to_storage$T1_to_T1, apply);
            return true;
        }
        return false;
    }
    static Delete$kernel<K, V>(e: MapEntry<K, V> | undefined, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K): void {
        if (!mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).dirty) {
            Map.$storageOf((MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty.store($go$from_storage$T0_to_T0(mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).key), e);
        }
        mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).__go_delete = true;
    }
    static Replace$kernel<K, V>(e: MapEntry<K, V> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, newValue: V): void {
        if (mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).__go_delete) {
            const __gotots_argument_7 = new GoInterfaceAdapter("tried to change a deleted entry");
            GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
        }
        if (!mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).dirty) {
            mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).dirty = true;
            Map.$storageOf((MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty.store($go$from_storage$T0_to_T0(mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).key), e);
        }
        mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).value = $go$to_storage$T1_to_T1($go$copy$T1_to_T1(newValue));
    }
}
export type Map$Storage<K, V> = {
    base: GoMapValue<K, V>;
    dirty: GoMapValue<K, MapEntry<K, V> | undefined>;
};
export class Map<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Map$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: Map<K, V>): Map$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: Map$Storage<K, V>): Map<K, V> {
        return new Map<K, V>($source);
    }
    static $copy<K, V>($source: Map<K, V>): Map<K, V> {
        return new Map<K, V>({
            base: $source.$storage.base,
            dirty: $source.$storage.dirty
        });
    }
    declare private readonly then?: never;
    static Add$kernel<K, V>(m: {
        value: Map<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $go$zero$void_to_T1: () => V, key: K, value: V): void {
        Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty.store(key, MapEntry.$fromStorage<K, V>({
            m: m,
            mapEntry: mapEntry.$storageOf<K, V>(mapEntry.$fromStorage<K, V>({
                key: $go$to_storage$T0_to_T0($go$copy$T0_to_T0(key)),
                value: $go$to_storage$T1_to_T1($go$copy$T1_to_T1(value)),
                dirty: true,
                original: $go$to_storage$T1_to_T1($go$zero$void_to_T1()),
                __go_delete: false
            }))
        }));
    }
    static Clear$kernel<K, V>(m: {
        value: Map<K, V>;
    } | undefined, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$map_construct$PointerTo_Named_dirty$MapEntryOf_T0_And_T1_to_MapOf_T0_To_PointerTo_Named_dirty$MapEntryOf_T0_And_T1: ($0: MapEntry<K, V> | undefined) => GoMapValue<K, MapEntry<K, V> | undefined>, $go$zero$void_to_T1: () => V): void {
        Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty = $go$map_construct$PointerTo_Named_dirty$MapEntryOf_T0_And_T1_to_MapOf_T0_To_PointerTo_Named_dirty$MapEntryOf_T0_And_T1(void 0);
        Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base = $go$map_construct$T1_to_MapOf_T0_To_T1($go$zero$void_to_T1());
    }
    static Delete$kernel<K, V>(m: {
        value: Map<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, key: K): void {
        if (!Map.TryDelete$kernel<K, V>(m, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$from_storage$T0_to_T0, $go$to_storage$T1_to_T1, $go$to_storage$T0_to_T0, $go$copy$T0_to_T0(key))) {
            const __gotots_argument_4 = new GoInterfaceAdapter("tried to delete a non-existent entry");
            GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        }
    }
    static Finalize$kernel<K, V>(m: {
        value: Map<K, V>;
    } | undefined, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$length$MapOf_T0_To_PointerTo_Named_dirty$MapEntryOf_T0_And_T1_to_int: ($0: GoMapValue<K, MapEntry<K, V> | undefined>) => int, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$map_construct$T1_int_to_MapOf_T0_To_T1: ($0: V, $1: int) => GoMapValue<K, V>, $go$zero$void_to_MapOf_T0_To_T1: () => GoMapValue<K, V>, $go$zero$void_to_T1: () => V): [
        GoMapValue<K, V>,
        bool
    ] {
        let result: GoMapValue<K, V> = $go$zero$void_to_MapOf_T0_To_T1();
        let changed: bool = false;
        if ($go$length$MapOf_T0_To_PointerTo_Named_dirty$MapEntryOf_T0_And_T1_to_int(Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty) === 0) {
            return [Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base, false];
        }
        if (Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base.isNil()) {
            result = $go$map_construct$T1_int_to_MapOf_T0_To_T1($go$zero$void_to_T1(), $go$length$MapOf_T0_To_PointerTo_Named_dirty$MapEntryOf_T0_And_T1_to_int(Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty));
        }
        else {
            result = generic_maps_kernel.MapsCloneKernel<GoMapValue<K, V>, K, V>($go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T0_to_T0, $go$copy$T1_to_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_T1, Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base);
        }
        const __gotots_range_0 = Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = $go$copy$T0_to_T0(__gotots_range_value_0);
            const __gotots_range_value_3 = __gotots_range_value_1[0];
            let key: K = __gotots_range_value_2;
            let entry: MapEntry<K, V> | undefined = __gotots_range_value_3;
            if (mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).__go_delete) {
                result.delete(key);
            }
            else {
                result.store(key, $go$from_storage$T1_to_T1(mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).value));
            }
        }
        return [result, true];
    }
    static Get$kernel<K, V>(m: {
        value: Map<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, key: K): [
        MapEntry<K, V> | undefined,
        bool
    ] {
        {
            const __gotots_results_0 = Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty.lookupOk(key);
            let entry: MapEntry<K, V> | undefined = __gotots_results_0[0];
            let ok__shadow_1 = __gotots_results_0[1];
            if (ok__shadow_1) {
                if (mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).__go_delete) {
                    return [void 0, false];
                }
                return [entry, true];
            }
        }
        const __gotots_results_1 = Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base.lookupOk(key);
        let value: V = $go$copy$T1_to_T1(__gotots_results_1[0]);
        let ok = __gotots_results_1[1];
        if (!ok) {
            return [void 0, false];
        }
        return [MapEntry.$fromStorage<K, V>({
                m: m,
                mapEntry: mapEntry.$storageOf<K, V>(mapEntry.$fromStorage<K, V>({
                    key: $go$to_storage$T0_to_T0($go$copy$T0_to_T0(key)),
                    original: $go$to_storage$T1_to_T1($go$copy$T1_to_T1(value)),
                    value: $go$to_storage$T1_to_T1($go$copy$T1_to_T1(value)),
                    dirty: false,
                    __go_delete: false
                }))
            }), true];
    }
    static Range$kernel<K, V>(m: {
        value: Map<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<K, GoEmptyStruct>, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, fn: (($0: MapEntry<K, V> | undefined) => bool) | undefined): void {
        let seenInDirty: GoMapValue<K, GoEmptyStruct> = $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero());
        const __gotots_range_1 = Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).dirty;
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_1.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = __gotots_range_value_5[0];
            let entry: MapEntry<K, V> | undefined = __gotots_range_value_6;
            seenInDirty.store($go$from_storage$T0_to_T0(mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).key), new GoEmptyStruct);
            let __gotots_logical_result_0 = !mapEntry.$storageOf(mapEntry.$fromStorage<K, V>(MapEntry.$storageOf((entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).mapEntry)).__go_delete;
            if (__gotots_logical_result_0) {
                const __gotots_callee_1 = fn;
                const __gotots_argument_2 = entry;
                __gotots_logical_result_0 = !(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
            }
            if (__gotots_logical_result_0) {
                break;
            }
        }
        const __gotots_range_2 = Map.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).base;
        const __gotots_range_keys_2 = __gotots_range_2.keys();
        for (const __gotots_range_value_7 of __gotots_range_keys_2) {
            const __gotots_range_value_8 = __gotots_range_2.lookupOk(__gotots_range_value_7);
            if (!__gotots_range_value_8[1]) {
                continue;
            }
            const __gotots_range_value_9 = $go$copy$T0_to_T0(__gotots_range_value_7);
            const __gotots_range_value_10 = __gotots_range_value_8[0];
            let key: K = __gotots_range_value_9;
            let value: V = __gotots_range_value_10;
            {
                const __gotots_results_2 = seenInDirty.lookupOk(key);
                let ok = __gotots_results_2[1];
                if (ok) {
                    continue;
                }
            }
            const __gotots_callee_2 = fn;
            const __gotots_argument_3 = MapEntry.$fromStorage<K, V>({
                m: m,
                mapEntry: mapEntry.$storageOf<K, V>(mapEntry.$fromStorage<K, V>({
                    key: $go$to_storage$T0_to_T0($go$copy$T0_to_T0(key)),
                    original: $go$to_storage$T1_to_T1($go$copy$T1_to_T1(value)),
                    value: $go$to_storage$T1_to_T1($go$copy$T1_to_T1(value)),
                    dirty: false,
                    __go_delete: false
                }))
            });
            if (!(__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3)) {
                break;
            }
        }
    }
    static TryDelete$kernel<K, V>(m: {
        value: Map<K, V>;
    } | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, key: K): bool {
        {
            const __gotots_results_3 = Map.Get$kernel<K, V>(m, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$to_storage$T1_to_T1, $go$to_storage$T0_to_T0, $go$copy$T0_to_T0(key));
            let entry: MapEntry<K, V> | undefined = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                MapEntry.Delete$kernel<K, V>(entry, $go$from_storage$T0_to_T0);
                return true;
            }
        }
        return false;
    }
}
export function NewMap$kernel<K, V>($go$map_construct$PointerTo_Named_dirty$MapEntryOf_T0_And_T1_to_MapOf_T0_To_PointerTo_Named_dirty$MapEntryOf_T0_And_T1: ($0: MapEntry<K, V> | undefined) => GoMapValue<K, MapEntry<K, V> | undefined>, base: GoMapValue<K, V>): {
    value: Map<K, V>;
} | undefined {
    return { value: Map.$fromStorage<K, V>({
            base: base,
            dirty: $go$map_construct$PointerTo_Named_dirty$MapEntryOf_T0_And_T1_to_MapOf_T0_To_PointerTo_Named_dirty$MapEntryOf_T0_And_T1(void 0)
        }) };
}
