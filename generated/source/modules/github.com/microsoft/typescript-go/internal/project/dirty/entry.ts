import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { bool, uint32 } from "@gotots/runtime/scalars.js";
import type { GoStorage } from "@gotots/runtime/storage.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export type mapEntry$Storage<K, V> = {
    key: GoStorage<K>;
    original: GoStorage<V>;
    value: GoStorage<V>;
    dirty: bool;
    __go_delete: bool;
};
export class mapEntry<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: mapEntry$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: mapEntry<K, V>): mapEntry$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: mapEntry$Storage<K, V>): mapEntry<K, V> {
        return new mapEntry<K, V>($source);
    }
    static $copy<K, V>($go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $source: mapEntry<K, V>): mapEntry<K, V> {
        return new mapEntry<K, V>({
            key: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.key))),
            original: $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1($source.$storage.original))),
            value: $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1($source.$storage.value))),
            dirty: $source.$storage.dirty,
            __go_delete: $source.$storage.__go_delete
        });
    }
    static $equal<K, V>($go$equal$T1_T1_to_bool: ($0: V, $1: V) => bool, $go$equal$T0_T0_to_bool: ($0: K, $1: K) => bool, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $left: mapEntry<K, V>, $right: mapEntry<K, V>): bool {
        return $go$equal$T0_T0_to_bool($go$from_storage$T0_to_T0($left.$storage.key), $go$from_storage$T0_to_T0($right.$storage.key)) && $go$equal$T1_T1_to_bool($go$from_storage$T1_to_T1($left.$storage.original), $go$from_storage$T1_to_T1($right.$storage.original)) && $go$equal$T1_T1_to_bool($go$from_storage$T1_to_T1($left.$storage.value), $go$from_storage$T1_to_T1($right.$storage.value)) && $left.$storage.dirty === $right.$storage.dirty && $left.$storage.__go_delete === $right.$storage.__go_delete;
    }
    static $hash<K, V>($go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$hash$T0_to_uint32: ($0: K) => uint32, $go$hash$T1_to_uint32: ($0: V) => uint32, $source: mapEntry<K, V>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $go$hash$T0_to_uint32($go$from_storage$T0_to_T0($source.$storage.key)));
        $hash = GoMapHash.mix($hash, $go$hash$T1_to_uint32($go$from_storage$T1_to_T1($source.$storage.original)));
        $hash = GoMapHash.mix($hash, $go$hash$T1_to_uint32($go$from_storage$T1_to_T1($source.$storage.value)));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.dirty));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.__go_delete));
        return $hash;
    }
    declare private readonly then?: never;
    static Key$kernel<K, V>(e: tsonicTypeScriptRuntime.Location<mapEntry<K, V>> | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K): K {
        return $go$copy$T0_to_T0($go$from_storage$T0_to_T0(mapEntry.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<mapEntry<K, V>>).value).key));
    }
    static Original$kernel<K, V>(e: tsonicTypeScriptRuntime.Location<mapEntry<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V): V {
        return $go$copy$T1_to_T1($go$from_storage$T1_to_T1(mapEntry.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<mapEntry<K, V>>).value).original));
    }
    static Value$kernel<K, V>(e: tsonicTypeScriptRuntime.Location<mapEntry<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$zero$void_to_T1: () => V): V {
        if (mapEntry.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<mapEntry<K, V>>).value).__go_delete) {
            let zero: V = $go$zero$void_to_T1();
            return $go$copy$T1_to_T1(zero);
        }
        return $go$copy$T1_to_T1($go$from_storage$T1_to_T1(mapEntry.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<mapEntry<K, V>>).value).value));
    }
}
