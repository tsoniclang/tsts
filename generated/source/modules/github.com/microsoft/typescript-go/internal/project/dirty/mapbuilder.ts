import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type MapBuilder$Storage<K, VBase, VBuilder> = {
    base: GoMapValue<K, VBase>;
    dirty: GoMapValue<K, VBuilder>;
    deleted: GoMapValue<K, GoEmptyStruct>;
    toBuilder: (($0: VBase) => VBuilder) | undefined;
    build: (($0: VBuilder) => VBase) | undefined;
};
export class MapBuilder<K, VBase, VBuilder> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: MapBuilder$Storage<K, VBase, VBuilder>) {
    }
    public static $storageOf<K, VBase, VBuilder>($source: MapBuilder<K, VBase, VBuilder>): MapBuilder$Storage<K, VBase, VBuilder> {
        return $source.$storage;
    }
    public static $fromStorage<K, VBase, VBuilder>($source: MapBuilder$Storage<K, VBase, VBuilder>): MapBuilder<K, VBase, VBuilder> {
        return new MapBuilder<K, VBase, VBuilder>($source);
    }
    declare private readonly then?: never;
    static Build$kernel<K, VBase, VBuilder>(mb: MapBuilder<K, VBase, VBuilder> | undefined, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, VBase>) => GoMapValue<K, VBase>, $go$copy$T1_to_T1: ($0: VBase) => VBase, $go$copy$T0_to_T0: ($0: K) => K, $go$length$MapOf_T0_To_T2_to_int: ($0: GoMapValue<K, VBuilder>) => int, $go$length$MapOf_T0_To_Struct_void_to_int: ($0: GoMapValue<K, GoEmptyStruct>) => int, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: VBase) => GoMapValue<K, VBase>, $go$zero$void_to_T1: () => VBase): GoMapValue<K, VBase> {
        if ($go$length$MapOf_T0_To_T2_to_int(MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).dirty) === 0 && $go$length$MapOf_T0_To_Struct_void_to_int(MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted) === 0) {
            return MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).base;
        }
        let result: GoMapValue<K, VBase> = generic_maps_kernel.MapsCloneKernel<GoMapValue<K, VBase>, K, VBase>($go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T0_to_T0, $go$copy$T1_to_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_T1, MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).base);
        if (result.isNil()) {
            result = $go$map_construct$T1_to_MapOf_T0_To_T1($go$zero$void_to_T1());
        }
        const __gotots_range_1 = MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted;
        const __gotots_range_keys_1 = __gotots_range_1.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_1) {
            const __gotots_range_value_4 = __gotots_range_1.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = $go$copy$T0_to_T0(__gotots_range_value_3);
            let key: K = __gotots_range_value_5;
            result.delete(key);
        }
        const __gotots_range_2 = MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).dirty;
        const __gotots_range_keys_2 = __gotots_range_2.keys();
        for (const __gotots_range_value_6 of __gotots_range_keys_2) {
            const __gotots_range_value_7 = __gotots_range_2.lookupOk(__gotots_range_value_6);
            if (!__gotots_range_value_7[1]) {
                continue;
            }
            const __gotots_range_value_8 = $go$copy$T0_to_T0(__gotots_range_value_6);
            const __gotots_range_value_9 = __gotots_range_value_7[0];
            let key: K = __gotots_range_value_8;
            let value: VBuilder = __gotots_range_value_9;
            const __gotots_store_0 = result;
            const __gotots_store_1 = key;
            const __gotots_callee_0 = MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).build;
            const __gotots_argument_0 = value;
            __gotots_store_0.store(__gotots_store_1, (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0));
        }
        return result;
    }
    static Clear$kernel<K, VBase, VBuilder>(mb: MapBuilder<K, VBase, VBuilder> | undefined, $go$length$MapOf_T0_To_T1_to_int: ($0: GoMapValue<K, VBase>) => int, $go$map_construct$T2_to_MapOf_T0_To_T2: ($0: VBuilder) => GoMapValue<K, VBuilder>, $go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct, $1: int) => GoMapValue<K, GoEmptyStruct>, $go$zero$void_to_T2: () => VBuilder): void {
        MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).dirty = $go$map_construct$T2_to_MapOf_T0_To_T2($go$zero$void_to_T2());
        MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted = $go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero(), $go$length$MapOf_T0_To_T1_to_int(MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).base));
        const __gotots_range_0 = MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).base;
        const __gotots_range_keys_0 = __gotots_range_0.keys();
        for (const __gotots_range_value_0 of __gotots_range_keys_0) {
            const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
            if (!__gotots_range_value_1[1]) {
                continue;
            }
            const __gotots_range_value_2 = __gotots_range_value_0;
            let key: K = __gotots_range_value_2;
            MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted.store(key, new GoEmptyStruct);
        }
    }
    static Delete$kernel<K, VBase, VBuilder>(mb: MapBuilder<K, VBase, VBuilder> | undefined, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<K, GoEmptyStruct>, key: K): void {
        if (MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted.isNil()) {
            MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted = $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero());
        }
        MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted.store(key, new GoEmptyStruct);
        MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).dirty.delete(key);
    }
    static Has<K, VBase, VBuilder>(mb: MapBuilder<K, VBase, VBuilder> | undefined, key: K): bool {
        {
            const __gotots_results_0 = MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted.lookupOk(key);
            let ok__shadow_1 = __gotots_results_0[1];
            if (ok__shadow_1) {
                return false;
            }
        }
        {
            const __gotots_results_1 = MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).dirty.lookupOk(key);
            let ok__shadow_1 = __gotots_results_1[1];
            if (ok__shadow_1) {
                return true;
            }
        }
        const __gotots_results_2 = MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).base.lookupOk(key);
        let ok = __gotots_results_2[1];
        return ok;
    }
    static Set<K, VBase, VBuilder>(mb: MapBuilder<K, VBase, VBuilder> | undefined, key: K, value: VBuilder): void {
        MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).dirty.store(key, value);
        MapBuilder.$storageOf((mb ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).deleted.delete(key);
    }
}
export function NewMapBuilder$kernel<K, VBase, VBuilder>($go$map_construct$T2_to_MapOf_T0_To_T2: ($0: VBuilder) => GoMapValue<K, VBuilder>, $go$zero$void_to_T2: () => VBuilder, $go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<K, GoEmptyStruct>, base: GoMapValue<K, VBase>, toBuilder: (($0: VBase) => VBuilder) | undefined, build: (($0: VBuilder) => VBase) | undefined): MapBuilder<K, VBase, VBuilder> | undefined {
    return MapBuilder.$fromStorage<K, VBase, VBuilder>({
        base: base,
        dirty: $go$map_construct$T2_to_MapOf_T0_To_T2($go$zero$void_to_T2()),
        toBuilder: toBuilder,
        build: build,
        deleted: $go$zero$void_to_MapOf_T0_To_Struct_void()
    });
}
