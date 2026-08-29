import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Arena$Storage as Arena__from_core$Storage } from "./arena.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { linkStoreGet } from "../../../../../../implementations/tsts/core-hotpaths.js";
import { Arena } from "./arena.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type LinkStore$Storage<K, V> = {
    entries: GoMapValue<K, tsonicTypeScriptRuntime.Location<V> | undefined>;
    arena: Arena__from_core$Storage<V>;
};
export class LinkStore<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: LinkStore$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: LinkStore<K, V>): LinkStore$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: LinkStore$Storage<K, V>): LinkStore<K, V> {
        return new LinkStore<K, V>($source);
    }
    static $zero<K, V>($go$zero$void_to_MapOf_T0_To_PointerTo_T1: () => GoMapValue<K, tsonicTypeScriptRuntime.Location<V> | undefined>): LinkStore<K, V> {
        return new LinkStore<K, V>({
            entries: $go$zero$void_to_MapOf_T0_To_PointerTo_T1(),
            arena: Arena.$zeroStorage<V>()
        });
    }
    static $copy<K, V>($source: LinkStore<K, V>): LinkStore<K, V> {
        return new LinkStore<K, V>({
            entries: $source.$storage.entries,
            arena: Arena.$storageOf<V>(Arena.$copy<V>(Arena.$fromStorage<V>($source.$storage.arena)))
        });
    }
    declare private readonly then?: never;
    static Get$kernel<K, V>(s: tsonicTypeScriptRuntime.Location<LinkStore<K, V>> | undefined, $go$capacity$SliceOf_T1_to_int: ($0: RuntimeSlice<GoContainerStorage<V>>) => int, $go$convert$SliceOf_T1_to_SliceOf_T1: ($0: RuntimeSlice<GoContainerStorage<V>>) => RuntimeSlice<GoContainerStorage<V>>, $go$copy$T1_to_T1: ($0: V) => V, $go$from_container_storage$T1_to_T1: ($0: GoContainerStorage<V>) => V, $go$index_address$SliceOf_T1_int_to_PointerTo_T1: ($0: RuntimeSlice<GoContainerStorage<V>>, $1: int) => tsonicTypeScriptRuntime.Location<V> | undefined, $go$length$SliceOf_T1_to_int: ($0: RuntimeSlice<GoContainerStorage<V>>) => int, $go$map_construct$PointerTo_T1_to_MapOf_T0_To_PointerTo_T1: ($0: tsonicTypeScriptRuntime.Location<V> | undefined) => GoMapValue<K, tsonicTypeScriptRuntime.Location<V> | undefined>, $go$to_container_storage$T1_to_T1: ($0: V) => GoContainerStorage<V>, $go$zero$void_to_T1: () => V, key__shadow_1: K): tsonicTypeScriptRuntime.Location<V> | undefined {
        return linkStoreGet(s, $go$capacity$SliceOf_T1_to_int, $go$convert$SliceOf_T1_to_SliceOf_T1, $go$copy$T1_to_T1, $go$from_container_storage$T1_to_T1, $go$index_address$SliceOf_T1_int_to_PointerTo_T1, $go$length$SliceOf_T1_to_int, $go$map_construct$PointerTo_T1_to_MapOf_T0_To_PointerTo_T1, $go$to_container_storage$T1_to_T1, $go$zero$void_to_T1, key__shadow_1);
    }
    static Has<K, V>(s: tsonicTypeScriptRuntime.Location<LinkStore<K, V>> | undefined, key__shadow_1: K): bool {
        const __gotots_results_0 = LinkStore.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LinkStore<K, V>>).value).entries.lookupOk(key__shadow_1);
        let ok = __gotots_results_0[1];
        return ok;
    }
    static TryGet<K, V>(s: tsonicTypeScriptRuntime.Location<LinkStore<K, V>> | undefined, key__shadow_1: K): tsonicTypeScriptRuntime.Location<V> | undefined {
        return LinkStore.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<LinkStore<K, V>>).value).entries.lookup(key__shadow_1);
    }
}
