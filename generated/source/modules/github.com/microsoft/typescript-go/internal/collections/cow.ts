import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type CopyOnWriteMap$Storage<K, V> = {
    m: GoMapValue<K, V>;
    owned: bool;
};
export class CopyOnWriteMap<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: CopyOnWriteMap$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: CopyOnWriteMap<K, V>): CopyOnWriteMap$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: CopyOnWriteMap$Storage<K, V>): CopyOnWriteMap<K, V> {
        return new CopyOnWriteMap<K, V>($source);
    }
    static $zero<K, V>($go$zero$void_to_MapOf_T0_To_T1: () => GoMapValue<K, V>): CopyOnWriteMap<K, V> {
        return new CopyOnWriteMap<K, V>({
            m: $go$zero$void_to_MapOf_T0_To_T1(),
            owned: false
        });
    }
    static $copy<K, V>($source: CopyOnWriteMap<K, V>): CopyOnWriteMap<K, V> {
        return new CopyOnWriteMap<K, V>({
            m: $source.$storage.m,
            owned: $source.$storage.owned
        });
    }
    declare private readonly then?: never;
    static EnterScope<K, V>(c: tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>> | undefined): (() => void) | undefined {
        let saved = CopyOnWriteMap.$copy<K, V>(CopyOnWriteMap.$copy<K, V>(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value));
        CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).owned = false;
        return (): void => {
            void ((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                CopyOnWriteMap.$copy<K, V>(saved));
        };
    }
    static Get$kernel<K, V>(c: tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, k: K): [
        V,
        bool
    ] {
        const __gotots_results_0 = CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).m.lookupOk(k);
        let v: V = $go$copy$T1_to_T1(__gotots_results_0[0]);
        let ok = __gotots_results_0[1];
        return [$go$copy$T1_to_T1(v), ok];
    }
    static Set$kernel<K, V>(c: tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>> | undefined, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$zero$void_to_T1: () => V, k: K, v: V): void {
        CopyOnWriteMap.$go$private$collections$ensureOwned$kernel<K, V>(c, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_T1);
        CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).m.store(k, v);
    }
    static $go$private$collections$ensureOwned$kernel<K, V>(c: tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>> | undefined, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$zero$void_to_T1: () => V): void {
        if (CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).owned) {
            return;
        }
        if (CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).m.isNil()) {
            CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).m = $go$map_construct$T1_to_MapOf_T0_To_T1($go$zero$void_to_T1());
        }
        else {
            CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).m = generic_maps_kernel.MapsCloneKernel<GoMapValue<K, V>, K, V>($go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T0_to_T0, $go$copy$T1_to_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_T1, CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).m);
        }
        CopyOnWriteMap.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteMap<K, V>>).value).owned = true;
    }
}
export type CopyOnWriteSet$Storage<K> = {
    m: CopyOnWriteMap$Storage<K, GoEmptyStruct>;
};
export class CopyOnWriteSet<K> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: CopyOnWriteSet$Storage<K>) {
    }
    public static $storageOf<K>($source: CopyOnWriteSet<K>): CopyOnWriteSet$Storage<K> {
        return $source.$storage;
    }
    public static $fromStorage<K>($source: CopyOnWriteSet$Storage<K>): CopyOnWriteSet<K> {
        return new CopyOnWriteSet<K>($source);
    }
    static $zero<K>($go$zero$void_to_MapOf_T0_To_Struct_void: () => GoMapValue<K, GoEmptyStruct>): CopyOnWriteSet<K> {
        return new CopyOnWriteSet<K>({
            m: CopyOnWriteMap.$storageOf<K, GoEmptyStruct>(CopyOnWriteMap.$zero<K, GoEmptyStruct>($go$zero$void_to_MapOf_T0_To_Struct_void))
        });
    }
    static $copy<K>($source: CopyOnWriteSet<K>): CopyOnWriteSet<K> {
        return new CopyOnWriteSet<K>({
            m: CopyOnWriteMap.$storageOf<K, GoEmptyStruct>(CopyOnWriteMap.$copy<K, GoEmptyStruct>(CopyOnWriteMap.$fromStorage<K, GoEmptyStruct>($source.$storage.m)))
        });
    }
    declare private readonly then?: never;
    static Add$kernel<K>(c: tsonicTypeScriptRuntime.Location<CopyOnWriteSet<K>> | undefined, $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoMapValue<K, GoEmptyStruct>) => GoMapValue<K, GoEmptyStruct>, $go$copy$T0_to_T0: ($0: K) => K, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void: ($0: GoEmptyStruct) => GoMapValue<K, GoEmptyStruct>, k: K): void {
        const __gotots_store_1 = CopyOnWriteSet.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteSet<K>>).value);
        CopyOnWriteMap.Set$kernel<K, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<CopyOnWriteMap$Storage<K, GoEmptyStruct>, CopyOnWriteMap<K, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "m"), CopyOnWriteMap.$fromStorage, CopyOnWriteMap.$storageOf), $go$convert$MapOf_T0_To_Struct_void_to_MapOf_T0_To_Struct_void, ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, $go$copy$T0_to_T0, $go$map_construct$Struct_void_to_MapOf_T0_To_Struct_void, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, $go$copy$T0_to_T0(k), new GoEmptyStruct);
    }
    static EnterScope<K>(c: tsonicTypeScriptRuntime.Location<CopyOnWriteSet<K>> | undefined): (() => void) | undefined {
        const __gotots_store_2 = CopyOnWriteSet.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteSet<K>>).value);
        return CopyOnWriteMap.EnterScope<K, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<CopyOnWriteMap$Storage<K, GoEmptyStruct>, CopyOnWriteMap<K, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "m"), CopyOnWriteMap.$fromStorage, CopyOnWriteMap.$storageOf));
    }
    static Has$kernel<K>(c: tsonicTypeScriptRuntime.Location<CopyOnWriteSet<K>> | undefined, k: K): bool {
        const __gotots_store_0 = CopyOnWriteSet.$storageOf(((c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CopyOnWriteSet<K>>).value);
        const __gotots_results_1 = CopyOnWriteMap.Get$kernel<K, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<CopyOnWriteMap$Storage<K, GoEmptyStruct>, CopyOnWriteMap<K, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "m"), CopyOnWriteMap.$fromStorage, CopyOnWriteMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, k);
        let ok = __gotots_results_1[1];
        return ok;
    }
}
