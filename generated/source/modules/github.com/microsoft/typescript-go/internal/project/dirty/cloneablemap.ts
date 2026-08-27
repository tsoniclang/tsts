import type { GoMapValue } from "@gotots/runtime/map.js";
import type { $goStorageType, GoStoredValue } from "@gotots/runtime/storage.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
export class CloneableMap<K, V> implements GoStoredValue<GoMapValue<K, V>> {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoMapValue<K, V>) {
    }
    declare readonly [$goStorageType]: GoMapValue<K, V>;
    declare private readonly then?: never;
    Clone$kernel($go$convert$Named_dirty$CloneableMapOf_T0_And_T1_to_MapOf_T0_To_T1: ($0: CloneableMap<K, V>) => GoMapValue<K, V>, $go$convert$MapOf_T0_To_T1_to_Named_dirty$CloneableMapOf_T0_And_T1: ($0: GoMapValue<K, V>) => CloneableMap<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$zero$void_to_T1: () => V): CloneableMap<K, V> {
        return generic_maps_kernel.MapsCloneKernel<CloneableMap<K, V>, K, V>($go$convert$MapOf_T0_To_T1_to_Named_dirty$CloneableMapOf_T0_And_T1, $go$convert$Named_dirty$CloneableMapOf_T0_And_T1_to_MapOf_T0_To_T1, $go$copy$T0_to_T0, $go$copy$T1_to_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_T1, this);
    }
}
