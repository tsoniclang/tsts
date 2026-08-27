import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type Set$Storage<T> = {
    M: GoMapValue<T, GoEmptyStruct>;
};
export class Set<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Set$Storage<T>) {
    }
    public static $storageOf<T>($source: Set<T>): Set$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: Set$Storage<T>): Set<T> {
        return new Set<T>($source);
    }
    static $zero<T>($go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<T, GoEmptyStruct>): Set<T> {
        return new Set<T>({
            M: $go$zero$void_to_MapOf_T0_To_Struct_void()
        });
    }
    static $copy<T>($source: Set<T>): Set<T> {
        return new Set<T>({
            M: $source.$storage.M
        });
    }
    declare private readonly then?: never;
    static Add$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<T, GoEmptyStruct>, key: T): void {
        if (Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M.isNil()) {
            Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M = $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero());
        }
        Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M.store(key, new GoEmptyStruct);
    }
    static AddIfAbsent$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<T, GoEmptyStruct>, key: T): bool {
        if (Set.Has<T>(s, $go$copy$T0_to_T0(key))) {
            return false;
        }
        Set.Add$kernel<T>(s, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void, $go$copy$T0_to_T0(key));
        return true;
    }
    static Clear$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$clear$MapOf_T0_To_Struct_void_to_void: ($0: GoMapValue<T, GoEmptyStruct>) => void): void {
        if (s === undefined) {
            return;
        }
        $go$clear$MapOf_T0_To_Struct_void_to_void(Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M);
    }
    static Clone$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoMapValue<T, GoEmptyStruct>) => GoMapValue<T, GoEmptyStruct>, $go$copy$T0_to_T0: ($0: T) => T, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<T, GoEmptyStruct>): tsonicTypeScriptRuntime.Location<Set<T>> | undefined {
        if (s === undefined) {
            return void 0;
        }
        let clone: tsonicTypeScriptRuntime.Location<Set<T>> | undefined = tsonicTypeScriptRuntime.location<Set<T>>(Set.$fromStorage<T>({
            M: generic_maps_kernel.MapsCloneKernel<GoMapValue<T, GoEmptyStruct>, T, GoEmptyStruct>($go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, $go$copy$T0_to_T0, ($argument0: GoEmptyStruct): GoEmptyStruct => {
                return GoEmptyStruct.$copy($argument0);
            }, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void, (): GoEmptyStruct => {
                return GoEmptyStruct.$zero();
            }, Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M)
        }));
        return clone;
    }
    static Delete<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, key: T): void {
        Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M.delete(key);
    }
    static Equals$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoMapValue<T, GoEmptyStruct>) => GoMapValue<T, GoEmptyStruct>, $go$equal$PointerTo_Named_collections$SetOf_T0_PointerTo_Named_collections$SetOf_T0_to_bool: ($0: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $1: tsonicTypeScriptRuntime.Location<Set<T>> | undefined) => bool, other: tsonicTypeScriptRuntime.Location<Set<T>> | undefined): bool {
        if ($go$equal$PointerTo_Named_collections$SetOf_T0_PointerTo_Named_collections$SetOf_T0_to_bool(s, other)) {
            return true;
        }
        if (s === undefined || other === undefined) {
            return false;
        }
        return generic_maps_kernel.MapsEqualKernel<GoMapValue<T, GoEmptyStruct>, GoMapValue<T, GoEmptyStruct>, T, GoEmptyStruct>($go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, ($argument0: GoEmptyStruct, $argument1: GoEmptyStruct): bool => {
            return GoEmptyStruct.$equal($argument0, $argument1);
        }, Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M, Set.$storageOf(((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M);
    }
    static Has<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, key: T): bool {
        if (s === undefined) {
            return false;
        }
        const __gotots_results_0 = Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M.lookupOk(key);
        let ok = __gotots_results_0[1];
        return ok;
    }
    static Intersects$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, other: tsonicTypeScriptRuntime.Location<Set<T>> | undefined): bool {
        if (s === undefined || other === undefined) {
            return false;
        }
        const __gotots_range_2 = Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M;
        const __gotots_range_keys_1 = __gotots_range_2.keys();
        for (const __gotots_range_value_4 of __gotots_range_keys_1) {
            const __gotots_range_value_5 = __gotots_range_2.lookupOk(__gotots_range_value_4);
            if (!__gotots_range_value_5[1]) {
                continue;
            }
            const __gotots_range_value_6 = $go$copy$T0_to_T0(__gotots_range_value_4);
            let key: T = __gotots_range_value_6;
            if (Set.Has<T>(other, $go$copy$T0_to_T0(key))) {
                return true;
            }
        }
        return false;
    }
    static IsSubsetOf$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, other: tsonicTypeScriptRuntime.Location<Set<T>> | undefined): bool {
        if (s === undefined) {
            return true;
        }
        const __gotots_range_1 = Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M;
        const __gotots_range_keys_0 = __gotots_range_1.keys();
        for (const __gotots_range_value_1 of __gotots_range_keys_0) {
            const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
            if (!__gotots_range_value_2[1]) {
                continue;
            }
            const __gotots_range_value_3 = $go$copy$T0_to_T0(__gotots_range_value_1);
            let key: T = __gotots_range_value_3;
            if (!Set.Has<T>(other, $go$copy$T0_to_T0(key))) {
                return false;
            }
        }
        return true;
    }
    static Keys$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<T, GoEmptyStruct>): GoMapValue<T, GoEmptyStruct> {
        if (s === undefined) {
            return $go$zero$void_to_MapOf_T0_To_Struct_void();
        }
        return Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M;
    }
    static Len$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$length$MapOf_T0_To_Struct_void_to_int: ($0: GoMapValue<T, GoEmptyStruct>) => int): int {
        if (s === undefined) {
            return 0;
        }
        return $go$length$MapOf_T0_To_Struct_void_to_int(Set.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M);
    }
    static UnionedWith$kernel<T>(s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoMapValue<T, GoEmptyStruct>) => GoMapValue<T, GoEmptyStruct>, $go$copy$T0_to_T0: ($0: T) => T, $go$length$MapOf_T0_To_Struct_void_to_int: ($0: GoMapValue<T, GoEmptyStruct>) => int, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<T, GoEmptyStruct>, $go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct, $1: int) => GoMapValue<T, GoEmptyStruct>, $go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<T, GoEmptyStruct>, other: tsonicTypeScriptRuntime.Location<Set<T>> | undefined): tsonicTypeScriptRuntime.Location<Set<T>> | undefined {
        if (s === undefined && other === undefined) {
            return void 0;
        }
        let result: tsonicTypeScriptRuntime.Location<Set<T>> | undefined = Set.Clone$kernel<T>(s, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, $go$copy$T0_to_T0, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void);
        if (!(other === undefined)) {
            if (result === undefined) {
                result =
                    tsonicTypeScriptRuntime.location<Set<T>>(Set.$fromStorage<T>({
                        M: $go$zero$void_to_MapOf_T0_To_Struct_void()
                    }));
            }
            if (Set.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M.isNil()) {
                Set.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M = $go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero(), $go$length$MapOf_T0_To_Struct_void_to_int(Set.$storageOf(((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M));
            }
            generic_maps_kernel.MapsCopyKernel<GoMapValue<T, GoEmptyStruct>, GoMapValue<T, GoEmptyStruct>, T, GoEmptyStruct>($go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, $go$copy$T0_to_T0, ($argument0: GoEmptyStruct): GoEmptyStruct => {
                return GoEmptyStruct.$copy($argument0);
            }, Set.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M, Set.$storageOf(((other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Set<T>>).value).M);
        }
        return result;
    }
}
export function NewSetWithSizeHint$kernel<T>($go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct, $1: int) => GoMapValue<T, GoEmptyStruct>, hint: int): tsonicTypeScriptRuntime.Location<Set<T>> | undefined {
    return tsonicTypeScriptRuntime.location<Set<T>>(Set.$fromStorage<T>({
        M: $go$map_construct$Struct_void_int_to_MapOf_T0_To_Struct_void(GoEmptyStruct.$zero(), hint)
    }));
}
export function NewSetFromItems$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<T, GoEmptyStruct>, $go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<T, GoEmptyStruct>, items: RuntimeSlice<GoContainerStorage<T>>): tsonicTypeScriptRuntime.Location<Set<T>> | undefined {
    let s: tsonicTypeScriptRuntime.Location<Set<T>> | undefined = tsonicTypeScriptRuntime.location<Set<T>>(Set.$fromStorage<T>({
        M: $go$zero$void_to_MapOf_T0_To_Struct_void()
    }));
    const __gotots_range_0 = items;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = $go$from_container_storage$T0_to_T0(__gotots_range_0.get(__gotots_range_index_0));
        let item: T = __gotots_range_value_0;
        Set.Add$kernel<T>(s, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void, item);
    }
    return s;
}
