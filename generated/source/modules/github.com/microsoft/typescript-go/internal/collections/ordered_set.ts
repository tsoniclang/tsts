import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap$Storage as OrderedMap__from_collections$Storage } from "./ordered_map.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { OrderedMap } from "./ordered_map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type OrderedSet$Storage<T> = {
    m: OrderedMap__from_collections$Storage<T, GoEmptyStruct>;
};
export class OrderedSet<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: OrderedSet$Storage<T>) {
    }
    public static $storageOf<T>($source: OrderedSet<T>): OrderedSet$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: OrderedSet$Storage<T>): OrderedSet<T> {
        return new OrderedSet<T>($source);
    }
    static $zero<T>($go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<T, GoEmptyStruct>): OrderedSet<T> {
        return new OrderedSet<T>({
            m: OrderedMap.$zeroStorage<T, GoEmptyStruct>($go$zero$void_to_MapOf_T0_To_Struct_void)
        });
    }
    static $copy<T>($source: OrderedSet<T>): OrderedSet<T> {
        return new OrderedSet<T>({
            m: OrderedMap.$storageOf<T, GoEmptyStruct>(OrderedMap.$copy<T, GoEmptyStruct>(OrderedMap.$fromStorage<T, GoEmptyStruct>($source.$storage.m)))
        });
    }
    static $zeroStorage<T>($go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<T, GoEmptyStruct>): OrderedSet$Storage<T> {
        return {
            m: OrderedMap.$zeroStorage<T, GoEmptyStruct>($go$zero$void_to_MapOf_T0_To_Struct_void)
        };
    }
    declare private readonly then?: never;
    static Add$kernel<T>(s: tsonicTypeScriptRuntime.Location<OrderedSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<T, GoEmptyStruct>, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, value: T): void {
        const __gotots_store_1 = OrderedSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedSet<T>>).value);
        OrderedMap.Set$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<OrderedMap__from_collections$Storage<T, GoEmptyStruct>, OrderedMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "m"), OrderedMap.$fromStorage, OrderedMap.$storageOf), $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, $go$copy$T0_to_T0(value), new GoEmptyStruct);
    }
    static Clear$kernel<T>(s: tsonicTypeScriptRuntime.Location<OrderedSet<T>> | undefined, $go$clear$MapOf_T0_To_Struct_void_to_void: ($0: GoMapValue<T, GoEmptyStruct>) => void, $go$clear$SliceOf_T0_to_void: ($0: RuntimeSlice<GoContainerStorage<T>>) => void): void {
        const __gotots_store_3 = OrderedSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedSet<T>>).value);
        OrderedMap.Clear$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<OrderedMap__from_collections$Storage<T, GoEmptyStruct>, OrderedMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "m"), OrderedMap.$fromStorage, OrderedMap.$storageOf), $go$clear$MapOf_T0_To_Struct_void_to_void, $go$clear$SliceOf_T0_to_void);
    }
    static Size$kernel<T>(s: tsonicTypeScriptRuntime.Location<OrderedSet<T>> | undefined, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int): int {
        const __gotots_store_0 = OrderedSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedSet<T>>).value);
        return OrderedMap.Size$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<OrderedMap__from_collections$Storage<T, GoEmptyStruct>, OrderedMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "m"), OrderedMap.$fromStorage, OrderedMap.$storageOf), $go$length$SliceOf_T0_to_int);
    }
    static Values$kernel<T>(s: tsonicTypeScriptRuntime.Location<OrderedSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int): iter__from_gostdlib.Seq<T> {
        const __gotots_store_2 = OrderedSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedSet<T>>).value);
        return OrderedMap.Keys$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<OrderedMap__from_collections$Storage<T, GoEmptyStruct>, OrderedMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "m"), OrderedMap.$fromStorage, OrderedMap.$storageOf), $go$copy$T0_to_T0, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int);
    }
}
