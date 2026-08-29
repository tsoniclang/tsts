import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage, GoStorage } from "@gotots/runtime/storage.js";
import { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext, Token as Token__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { $state as $state__json__package_1, MarshalEncode as MarshalEncode__from_json__package_1, UnmarshalDecode as UnmarshalDecode__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$contract as GoInterface$contract, $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type OrderedMap$Storage<K, V> = {
    $blank0: noCopy$Storage;
    keys: RuntimeSlice<GoContainerStorage<K>>;
    mp: GoMapValue<K, V>;
};
export class OrderedMap<K, V> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: OrderedMap$Storage<K, V>) {
    }
    public static $storageOf<K, V>($source: OrderedMap<K, V>): OrderedMap$Storage<K, V> {
        return $source.$storage;
    }
    public static $fromStorage<K, V>($source: OrderedMap$Storage<K, V>): OrderedMap<K, V> {
        return new OrderedMap<K, V>($source);
    }
    static $zero<K, V>($go$zero$void_to_MapOf_T0_To_T1: () => GoMapValue<K, V>): OrderedMap<K, V> {
        return new OrderedMap<K, V>({
            $blank0: noCopy.$zeroStorage(),
            keys: RuntimeSlice.nil<GoContainerStorage<K>>(),
            mp: $go$zero$void_to_MapOf_T0_To_T1()
        });
    }
    static $copy<K, V>($source: OrderedMap<K, V>): OrderedMap<K, V> {
        return new OrderedMap<K, V>({
            $blank0: noCopy.$zeroStorage(),
            keys: $source.$storage.keys,
            mp: $source.$storage.mp
        });
    }
    static $zeroStorage<K, V>($go$zero$void_to_MapOf_T0_To_T1: () => GoMapValue<K, V>): OrderedMap$Storage<K, V> {
        return {
            $blank0: noCopy.$zeroStorage(),
            keys: RuntimeSlice.nil<GoContainerStorage<K>>(),
            mp: $go$zero$void_to_MapOf_T0_To_T1()
        };
    }
    declare private readonly then?: never;
    static Clear$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$clear$MapOf_T0_To_T1_to_void: ($0: GoMapValue<K, V>) => void, $go$clear$SliceOf_T0_to_void: ($0: RuntimeSlice<GoContainerStorage<K>>) => void): void {
        $go$clear$SliceOf_T0_to_void(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys);
        OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys.slice(0, 0, null);
        $go$clear$MapOf_T0_To_T1_to_void(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp);
    }
    static Clone$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<K>>) => RuntimeSlice<GoContainerStorage<K>>, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T1: () => V): tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined {
        if (m === undefined) {
            return void 0;
        }
        let m2 = OrderedMap.$go$private$collections$clone$kernel<K, V>(m, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T1);
        const m2$location = tsonicTypeScriptRuntime.boundLocation({}, () => m2, m2$next => m2 = m2$next);
        return m2$location;
    }
    static Delete$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<K>>) => RuntimeSlice<GoContainerStorage<K>>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$equal$T0_T0_to_bool: ($0: K, $1: K) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V, key: K): [
        V,
        bool
    ] {
        const __gotots_results_3 = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookupOk(key);
        let v: V = $go$copy$T1_to_T1(__gotots_results_3[0]);
        let ok = __gotots_results_3[1];
        if (!ok) {
            let zero: V = $go$zero$void_to_T1();
            return [$go$copy$T1_to_T1(zero), false];
        }
        OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.delete(key);
        let i = globalThis.Number(BigInt.asIntN(64, generic_slices_kernel.SlicesIndexKernel<RuntimeSlice<GoContainerStorage<K>>, K, GoContainerStorage<K>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$equal$T0_T0_to_bool, $go$from_container_storage$T0_to_T0, OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys, $go$copy$T0_to_T0(key))));
        if (i === 0) {
            let zero: K = $go$zero$void_to_T0();
            OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys.set(0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(zero)));
            OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys.slice(1, null, null);
        }
        else {
            let end = $go$length$SliceOf_T0_to_int(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys) - 1;
            if (i === end) {
                let zero: K = $go$zero$void_to_T0();
                OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys.set(end, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(zero)));
                OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys.slice(0, end, null);
            }
            else {
                OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys = generic_slices_kernel.SlicesDeleteKernel<RuntimeSlice<GoContainerStorage<K>>, K, GoContainerStorage<K>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys, BigInt.asIntN(64, goNumberToBigInt(i)), BigInt.asIntN(64, goNumberToBigInt(i + 1)));
            }
        }
        return [$go$copy$T1_to_T1(v), true];
    }
    static Entries$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int): iter__from_gostdlib.Seq2<K, V> {
        return named_iter.IterSeq2ValueOperations.$wrap((__go_yield: (($0: K, $1: V) => bool) | undefined): void => {
            if (m === undefined) {
                return;
            }
            for (let i = 0; i < $go$length$SliceOf_T0_to_int(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys); i++) {
                let key: K = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys, i));
                const __gotots_callee_0 = __go_yield;
                const __gotots_argument_0 = $go$copy$T0_to_T0(key);
                const __gotots_argument_1 = $go$copy$T1_to_T1(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookup(key));
                if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1)) {
                    break;
                }
            }
        });
    }
    static EntryAt$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V, index: int): [
        K,
        V,
        bool
    ] {
        if (index < 0 || index >= $go$length$SliceOf_T0_to_int(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys)) {
            let zero: K = $go$zero$void_to_T0();
            let zeroV: V = $go$zero$void_to_T1();
            return [$go$copy$T0_to_T0(zero), $go$copy$T1_to_T1(zeroV), false];
        }
        let key: K = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys, index));
        let value: V = $go$copy$T1_to_T1(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookup(key));
        return [$go$copy$T0_to_T0(key), $go$copy$T1_to_T1(value), true];
    }
    static Get$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, key: K): [
        V,
        bool
    ] {
        const __gotots_results_2 = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookupOk(key);
        let v: V = $go$copy$T1_to_T1(__gotots_results_2[0]);
        let ok = __gotots_results_2[1];
        return [$go$copy$T1_to_T1(v), ok];
    }
    static GetOrZero$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, key: K): V {
        return OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookup(key);
    }
    static Has<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, key: K): bool {
        const __gotots_results_1 = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookupOk(key);
        let ok = __gotots_results_1[1];
        return ok;
    }
    static Keys$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int): iter__from_gostdlib.Seq<K> {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: K) => bool) | undefined): void => {
            if (m === undefined) {
                return;
            }
            for (let i = 0; i < $go$length$SliceOf_T0_to_int(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys); i++) {
                const __gotots_callee_1 = __go_yield;
                const __gotots_argument_2 = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys, i));
                if (!(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2)) {
                    break;
                }
            }
        });
    }
    static MarshalJSONTo$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$interface_adapt$T1_to_Interface_void: ($0: V) => $goInterface$Interface_void | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: K) => $goInterface$Interface_void | undefined, $go$reflection_value$PointerTo_T0_to_Named_reflect$Type: ($0: tsonicTypeScriptRuntime.Location<K> | undefined) => reflect__from_gostdlib.Type | undefined, enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): GoInterface | undefined {
        {
            let err: GoInterface | undefined = Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__json__package_1.BeginObject)));
            if (!(err === undefined)) {
                return err;
            }
        }
        const __gotots_range_0 = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = $go$from_container_storage$T0_to_T0(__gotots_range_0.get(__gotots_range_index_0));
            let k: K = __gotots_range_value_0;
            const __gotots_results_4 = resolveKeyName(reflect__from_gostdlib.ValueOf($go$interface_adapt$T0_to_Interface_void(k)));
            let keyString = __gotots_results_4[0];
            let err: GoInterface | undefined = __gotots_results_4[1];
            if (!(err === undefined)) {
                return err;
            }
            {
                let err__shadow_1: GoInterface | undefined = MarshalEncode__from_json__package_1(enc, new GoInterfaceAdapter(keyString), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            {
                let err__shadow_1: GoInterface | undefined = MarshalEncode__from_json__package_1(enc, $go$interface_adapt$T1_to_Interface_void(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookup(k)), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
        }
        return Encoder__from_jsontext.WriteToken(enc, Token__from_jsontext.$copy(Token__from_jsontext.$fromStorage($state__json__package_1.EndObject)));
    }
    static Set$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V, key: K, value: V): void {
        if (OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.isNil()) {
            OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp = $go$map_construct$T1_to_MapOf_T0_To_T1($go$zero$void_to_T1());
        }
        {
            const __gotots_results_0 = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookupOk(key);
            let ok = __gotots_results_0[1];
            if (!ok) {
                const __gotots_slice_build_0 = OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys;
                const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                let __gotots_slice_build_1 = __gotots_slice_build_0;
                if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                    __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(key)));
                }
                else {
                    __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<K>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                    for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                    }
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(key)));
                    for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                    }
                }
                OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys = __gotots_slice_build_1;
            }
        }
        OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.store(key, value);
    }
    static Size$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int): int {
        if (m === undefined) {
            return 0;
        }
        return $go$length$SliceOf_T0_to_int(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys);
    }
    static UnmarshalJSONFrom$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$interface_adapt$PointerTo_T1_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<V> | undefined) => $goInterface$Interface_void | undefined, $go$interface_adapt$PointerTo_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<K> | undefined) => $goInterface$Interface_void | undefined, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T0: () => K, $go$zero$void_to_T1: () => V, dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): GoInterface | undefined {
        const __gotots_results_5 = Decoder__from_jsontext.ReadToken(dec);
        let token = __gotots_results_5[0];
        let err: GoInterface | undefined = __gotots_results_5[1];
        if (!(err === undefined)) {
            return err;
        }
        if (token.Kind() === 110) {
            return void 0;
        }
        if (!(token.Kind() === 123)) {
            return GoProviderInterfaceBridge.$from(errors__from_gostdlib.New("cannot unmarshal non-object JSON value into Map"));
        }
        for (; !(Decoder__from_jsontext.PeekKind(dec) === 125);) {
            let key: K = $go$zero$void_to_T0();
            const key$location = tsonicTypeScriptRuntime.boundLocation({}, () => key, key$next => key = key$next);
            let value: V = $go$zero$void_to_T1();
            const value$location = tsonicTypeScriptRuntime.boundLocation({}, () => value, value$next => value = value$next);
            {
                let err__shadow_1: GoInterface | undefined = UnmarshalDecode__from_json__package_1(dec, $go$interface_adapt$PointerTo_T0_to_Interface_void(key$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            {
                let err__shadow_1: GoInterface | undefined = UnmarshalDecode__from_json__package_1(dec, $go$interface_adapt$PointerTo_T1_to_Interface_void(value$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                if (!(err__shadow_1 === undefined)) {
                    return err__shadow_1;
                }
            }
            OrderedMap.Set$kernel<K, V>(m, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, $go$zero$void_to_T1, $go$copy$T0_to_T0(key), $go$copy$T1_to_T1(value));
        }
        {
            const __gotots_results_6 = Decoder__from_jsontext.ReadToken(dec);
            let err__shadow_1: GoInterface | undefined = __gotots_results_6[1];
            if (!(err__shadow_1 === undefined)) {
                return err__shadow_1;
            }
        }
        return void 0;
    }
    static Values$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$copy$T1_to_T1: ($0: V) => V, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int): iter__from_gostdlib.Seq<V> {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: V) => bool) | undefined): void => {
            if (m === undefined) {
                return;
            }
            for (let i = 0; i < $go$length$SliceOf_T0_to_int(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys); i++) {
                const __gotots_callee_2 = __go_yield;
                const __gotots_argument_3 = $go$copy$T1_to_T1(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp.lookup($go$index$SliceOf_T0_int_to_T0(OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys, i)));
                if (!(__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3)) {
                    break;
                }
            }
        });
    }
    static $go$private$collections$clone$kernel<K, V>(m: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<K>>) => RuntimeSlice<GoContainerStorage<K>>, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1: ($0: GoMapValue<K, V>) => GoMapValue<K, V>, $go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T1: () => V): OrderedMap<K, V> {
        return OrderedMap.$fromStorage<K, V>({
            keys: generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<GoContainerStorage<K>>, K, GoContainerStorage<K>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).keys),
            mp: generic_maps_kernel.MapsCloneKernel<GoMapValue<K, V>, K, V>($go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$convert$MapOf_T0_To_T1_to_MapOf_T0_To_T1, $go$copy$T0_to_T0, $go$copy$T1_to_T1, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$zero$void_to_T1, OrderedMap.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<OrderedMap<K, V>>).value).mp),
            $blank0: noCopy.$zeroStorage()
        });
    }
}
export type noCopy$Storage = {};
export class noCopy {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: noCopy$Storage) {
    }
    public static $storageOf($source: noCopy): noCopy$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: noCopy$Storage): noCopy {
        return new noCopy($source);
    }
    static $zero(): noCopy {
        return new noCopy({});
    }
    static $copy($source: noCopy): noCopy {
        return new noCopy({});
    }
    static $equal($left: noCopy, $right: noCopy): bool {
        return true;
    }
    static $hash($source: noCopy): number {
        let $hash = 2166136261;
        return $hash;
    }
    static $zeroStorage(): noCopy$Storage {
        return {};
    }
    declare private readonly then?: never;
}
export function NewOrderedMapWithSizeHint$kernel<K, V>($go$map_construct$T1_int_to_MapOf_T0_To_T1: ($0: V, $1: int) => GoMapValue<K, V>, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T1: () => V, $go$zero$void_to_T0: () => K, hint: int): tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined {
    let m = newMapWithSizeHint$kernel<K, V>($go$map_construct$T1_int_to_MapOf_T0_To_T1, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T1, $go$zero$void_to_T0, hint);
    const m$location = tsonicTypeScriptRuntime.boundLocation({}, () => m, m$next => m = m$next);
    return m$location;
}
export function newMapWithSizeHint$kernel<K, V>($go$map_construct$T1_int_to_MapOf_T0_To_T1: ($0: V, $1: int) => GoMapValue<K, V>, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T1: () => V, $go$zero$void_to_T0: () => K, hint: int): OrderedMap<K, V> {
    const __gotots_slice_build_4 = goSliceAllocate<GoContainerStorage<K>>(0, hint);
    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
        __gotots_slice_build_4.$initialize(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
    }
    const __gotots_field_0 = __gotots_slice_build_4;
    return OrderedMap.$fromStorage<K, V>({
        keys: __gotots_field_0,
        mp: $go$map_construct$T1_int_to_MapOf_T0_To_T1($go$zero$void_to_T1(), hint),
        $blank0: noCopy.$zeroStorage()
    });
}
export type MapEntry$Storage<K, V> = {
    Key: GoStorage<K>;
    Value: GoStorage<V>;
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
    static $copy<K, V>($go$copy$T1_to_T1: ($0: V) => V, $go$copy$T0_to_T0: ($0: K) => K, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $source: MapEntry<K, V>): MapEntry<K, V> {
        return new MapEntry<K, V>({
            Key: $go$to_storage$T0_to_T0($go$copy$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.Key))),
            Value: $go$to_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1($source.$storage.Value)))
        });
    }
    declare private readonly then?: never;
}
export function NewOrderedMapFromList$kernel<K, V>($go$copy$T0_to_T0: ($0: K) => K, $go$copy$T1_to_T1: ($0: V) => V, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$from_storage$T1_to_T1: ($0: GoStorage<V>) => V, $go$length$SliceOf_Named_collections$MapEntryOf_T0_And_T1_to_int: ($0: RuntimeSlice<MapEntry$Storage<K, V>>) => int, $go$map_construct$T1_to_MapOf_T0_To_T1: ($0: V) => GoMapValue<K, V>, $go$map_construct$T1_int_to_MapOf_T0_To_T1: ($0: V, $1: int) => GoMapValue<K, V>, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $go$to_storage$T1_to_T1: ($0: V) => GoStorage<V>, $go$zero$void_to_T1: () => V, $go$zero$void_to_T0: () => K, items: RuntimeSlice<MapEntry$Storage<K, V>>): tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined {
    let mp: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined = NewOrderedMapWithSizeHint$kernel<K, V>($go$map_construct$T1_int_to_MapOf_T0_To_T1, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T1, $go$zero$void_to_T0, $go$length$SliceOf_Named_collections$MapEntryOf_T0_And_T1_to_int(items));
    const __gotots_range_3 = items;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
        const __gotots_range_value_5 = MapEntry.$copy<K, V>($go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$from_storage$T1_to_T1, $go$from_storage$T0_to_T0, $go$to_storage$T1_to_T1, $go$to_storage$T0_to_T0, MapEntry.$fromStorage<K, V>(__gotots_range_3.get(__gotots_range_index_1)));
        let item = __gotots_range_value_5;
        OrderedMap.Set$kernel<K, V>(mp, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$map_construct$T1_to_MapOf_T0_To_T1, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, $go$zero$void_to_T1, $go$copy$T0_to_T0($go$from_storage$T0_to_T0(MapEntry.$storageOf(item).Key)), $go$copy$T1_to_T1($go$from_storage$T1_to_T1(MapEntry.$storageOf(item).Value)));
    }
    return mp;
}
export function resolveKeyName(k: reflect__from_gostdlib.Value): [
    gostring,
    GoInterface | undefined
] {
    if (named_reflect.ReflectKindValueOperations.$project(k.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.String)) {
        return [k.String(), void 0];
    }
    {
        const __gotots_results_7 = (($value: $goInterface$Interface_void | undefined): [
            $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error | undefined,
            boolean
        ] => {
            if (!GoInterface$is($value)) {
                return [void 0, false];
            }
            return [$value, true];
        })(k.$unbox());
        let tm: $goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error | undefined = __gotots_results_7[0];
        let ok = __gotots_results_7[1];
        if (ok) {
            if (named_reflect.ReflectKindValueOperations.$project(k.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Pointer) && k.IsNil()) {
                return ["", void 0];
            }
            const __gotots_receiver_0 = tm;
            const __gotots_results_8 = goInterfaceNonNil<$goInterface$Interface_Method_encoding$MarshalText_void_to_SliceOf_byte_Named_error>(__gotots_receiver_0).MarshalText();
            let buf = __gotots_results_8[0];
            let err: GoInterface | undefined = __gotots_results_8[1];
            const __gotots_conversion_0 = buf;
            let __gotots_conversion_1 = "";
            for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
                __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
            }
            const __gotots_results_9 = __gotots_conversion_1;
            const __gotots_results_10 = err;
            return [__gotots_results_9, __gotots_results_10];
        }
    }
    switch (named_reflect.ReflectKindValueOperations.$project(k.Kind())) {
        case 2n:
        case 3n:
        case 4n:
        case 5n:
        case 6n: {
            return [strconv__from_gostdlib.FormatInt(k.Int(), BigInt.asIntN(64, goNumberToBigInt(10))), void 0];
            break;
        }
        case 7n:
        case 8n:
        case 9n:
        case 10n:
        case 11n:
        case 12n: {
            return [strconv__from_gostdlib.FormatUint(k.Uint(), BigInt.asIntN(64, goNumberToBigInt(10))), void 0];
            break;
        }
    }
    const __gotots_argument_4 = new GoInterfaceAdapter("unexpected map key type");
    GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
    GoPanic.raiseRuntime("unreachable Go function end");
}
export function DiffOrderedMaps$kernel<K, V>($go$binary_equal$T1_T1_to_bool: ($0: V, $1: V) => bool, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$T1_to_T1: ($0: V) => V, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int, m1: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, m2: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, onAdded: (($0: K, $1: V) => void) | undefined, onRemoved: (($0: K, $1: V) => void) | undefined, onModified: (($0: K, $1: V, $2: V) => void) | undefined): void {
    DiffOrderedMapsFunc$kernel<K, V>($go$copy$T0_to_T0, $go$copy$T1_to_T1, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int, m1, m2, (a: V, b: V): bool => {
        return $go$binary_equal$T1_T1_to_bool(a, b);
    }, onAdded, onRemoved, onModified);
}
export function DiffOrderedMapsFunc$kernel<K, V>($go$copy$T0_to_T0: ($0: K) => K, $go$copy$T1_to_T1: ($0: V) => V, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int, m1: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, m2: tsonicTypeScriptRuntime.Location<OrderedMap<K, V>> | undefined, equalValues: (($0: V, $1: V) => bool) | undefined, onAdded: (($0: K, $1: V) => void) | undefined, onRemoved: (($0: K, $1: V) => void) | undefined, onModified: (($0: K, $1: V, $2: V) => void) | undefined): void {
    const __gotots_range_1 = named_iter.IterSeq2ValueOperations.$project(OrderedMap.Entries$kernel<K, V>(m2, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int));
    if (__gotots_range_1 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    __gotots_range_1(($argument0: K, $argument1: V): bool => {
        if (__gotots_range_state_0 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_0 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_0 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_0 = -1;
        const __gotots_range_value_1 = $go$copy$T0_to_T0($argument0);
        const __gotots_range_value_2 = $go$copy$T1_to_T1($argument1);
        let k: K = __gotots_range_value_1;
        let v2: V = __gotots_range_value_2;
        {
            const __gotots_results_11 = OrderedMap.Get$kernel<K, V>(m1, $go$copy$T1_to_T1, $go$copy$T0_to_T0(k));
            let ok = __gotots_results_11[1];
            if (!ok) {
                const __gotots_callee_3 = onAdded;
                const __gotots_argument_5 = $go$copy$T0_to_T0(k);
                const __gotots_argument_6 = $go$copy$T1_to_T1(v2);
                (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6);
            }
        }
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    const __gotots_range_2 = named_iter.IterSeq2ValueOperations.$project(OrderedMap.Entries$kernel<K, V>(m1, $go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int));
    if (__gotots_range_2 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_1 = 1;
    __gotots_range_2(($argument0: K, $argument1: V): bool => {
        if (__gotots_range_state_1 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_1 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_1 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_1 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_1 = -1;
        const __gotots_range_value_3 = $go$copy$T0_to_T0($argument0);
        const __gotots_range_value_4 = $go$copy$T1_to_T1($argument1);
        let k: K = __gotots_range_value_3;
        let v1: V = __gotots_range_value_4;
        {
            const __gotots_results_12 = OrderedMap.Get$kernel<K, V>(m2, $go$copy$T1_to_T1, $go$copy$T0_to_T0(k));
            let v2: V = $go$copy$T1_to_T1(__gotots_results_12[0]);
            let ok = __gotots_results_12[1];
            if (ok) {
                const __gotots_callee_4 = equalValues;
                const __gotots_argument_7 = $go$copy$T1_to_T1(v1);
                const __gotots_argument_8 = $go$copy$T1_to_T1(v2);
                if (!(__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8)) {
                    const __gotots_callee_5 = onModified;
                    const __gotots_argument_9 = $go$copy$T0_to_T0(k);
                    const __gotots_argument_10 = $go$copy$T1_to_T1(v1);
                    const __gotots_argument_11 = $go$copy$T1_to_T1(v2);
                    (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                }
            }
            else {
                const __gotots_callee_6 = onRemoved;
                const __gotots_argument_12 = $go$copy$T0_to_T0(k);
                const __gotots_argument_13 = $go$copy$T1_to_T1(v1);
                (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13);
            }
        }
        __gotots_range_state_1 = 1;
        return true;
    });
    if (__gotots_range_state_1 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_1 = -2;
}
