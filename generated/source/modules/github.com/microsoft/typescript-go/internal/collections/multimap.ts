import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type MultiMap$Storage<K, V> = {
    M: GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>;
};
export class MultiMap<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: MultiMap$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: MultiMap<K, V>): MultiMap$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: MultiMap$Storage<K, V>): MultiMap<K, V> {
        return new MultiMap<K, V>($source);
    }
    static $zero<K, V>($go$zero$void_to_MapOf_T0_To_SliceOf_T1: () => GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>): MultiMap<K, V> {
        return new MultiMap<K, V>({
            M: $go$zero$void_to_MapOf_T0_To_SliceOf_T1()
        });
    }
    declare private readonly then?: never;
    static Add$kernel<K, V>(s: MultiMap<K, V> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$from_container_storage$T1_to_T1: ($0: GoContainerStorage<V>) => V, $go$map_construct$SliceOf_T1_to_MapOf_T0_To_SliceOf_T1: ($0: RuntimeSlice<GoContainerStorage<V>>) => GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>, $go$to_container_storage$T1_to_T1: ($0: V) => GoContainerStorage<V>, $go$zero$void_to_T1: () => V, key: K, value: V): void {
        if (MultiMap.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).M.isNil()) {
            MultiMap.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).M = $go$map_construct$SliceOf_T1_to_MapOf_T0_To_SliceOf_T1(RuntimeSlice.nil<GoContainerStorage<V>>());
        }
        const __gotots_store_0 = MultiMap.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).M;
        const __gotots_store_1 = key;
        const __gotots_slice_build_0 = MultiMap.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).M.lookup(key);
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1(value)));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<V>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1($go$from_container_storage$T1_to_T1(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1(value)));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T1_to_T1($go$zero$void_to_T1()));
            }
        }
        __gotots_store_0.store(__gotots_store_1, __gotots_slice_build_1);
    }
    static Get<K, V>(s: MultiMap<K, V> | undefined, key: K): RuntimeSlice<GoContainerStorage<V>> {
        return MultiMap.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).M.lookup(key);
    }
    static Len$kernel<K, V>(s: MultiMap<K, V> | undefined, $go$length$MapOf_T0_To_SliceOf_T1_to_int: ($0: GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>) => int): int {
        return $go$length$MapOf_T0_To_SliceOf_T1_to_int(MultiMap.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).M);
    }
    static Values$kernel<K, V>(s: MultiMap<K, V> | undefined, $go$convert$MapOf_T0_To_SliceOf_T1_to_MapOf_T0_To_SliceOf_T1: ($0: GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>) => GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>, $go$copy$SliceOf_T1_to_SliceOf_T1: ($0: RuntimeSlice<GoContainerStorage<V>>) => RuntimeSlice<GoContainerStorage<V>>): iter__from_gostdlib.Seq<RuntimeSlice<GoContainerStorage<V>>> {
        return generic_maps_kernel.MapsValuesKernel<GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>, K, RuntimeSlice<GoContainerStorage<V>>>($go$convert$MapOf_T0_To_SliceOf_T1_to_MapOf_T0_To_SliceOf_T1, $go$copy$SliceOf_T1_to_SliceOf_T1, MultiMap.$storageOf((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).M);
    }
}
export function NewMultiMapWithSizeHint$kernel<K, V>($go$map_construct$SliceOf_T1_int_to_MapOf_T0_To_SliceOf_T1: ($0: RuntimeSlice<GoContainerStorage<V>>, $1: int) => GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>, hint: int): MultiMap<K, V> | undefined {
    return MultiMap.$fromStorage<K, V>({
        M: $go$map_construct$SliceOf_T1_int_to_MapOf_T0_To_SliceOf_T1(RuntimeSlice.nil<GoContainerStorage<V>>(), hint)
    });
}
export function GroupBy$kernel<K, V>($go$copy$T1_to_T1: ($0: V) => V, $go$from_container_storage$T1_to_T1: ($0: GoContainerStorage<V>) => V, $go$map_construct$SliceOf_T1_to_MapOf_T0_To_SliceOf_T1: ($0: RuntimeSlice<GoContainerStorage<V>>) => GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>, $go$to_container_storage$T1_to_T1: ($0: V) => GoContainerStorage<V>, $go$zero$void_to_T1: () => V, $go$zero$void_to_MapOf_T0_To_SliceOf_T1: () => GoMapValue<K, RuntimeSlice<GoContainerStorage<V>>>, items: RuntimeSlice<GoContainerStorage<V>>, groupId: (($0: V) => K) | undefined): MultiMap<K, V> | undefined {
    let m: MultiMap<K, V> | undefined = MultiMap.$fromStorage<K, V>({
        M: $go$zero$void_to_MapOf_T0_To_SliceOf_T1()
    });
    const __gotots_range_0 = items;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = $go$copy$T1_to_T1($go$from_container_storage$T1_to_T1(__gotots_range_0.get(__gotots_range_index_0)));
        let item: V = __gotots_range_value_0;
        const __gotots_receiver_0 = m;
        const __gotots_callee_2 = groupId;
        const __gotots_argument_0 = $go$copy$T1_to_T1(item);
        const __gotots_argument_1 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        const __gotots_argument_2 = __gotots_argument_1;
        const __gotots_argument_3 = $go$copy$T1_to_T1(item);
        MultiMap.Add$kernel<K, V>(__gotots_receiver_0, $go$copy$T1_to_T1, $go$from_container_storage$T1_to_T1, $go$map_construct$SliceOf_T1_to_MapOf_T0_To_SliceOf_T1, $go$to_container_storage$T1_to_T1, $go$zero$void_to_T1, __gotots_argument_2, __gotots_argument_3);
    }
    return m;
}
