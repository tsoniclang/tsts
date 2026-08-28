import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, int, uint32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { GoChannel, goSelect } from "@gotots/runtime/channel.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type dynamicQueue$Storage<T> = {
    idle: GoChannel<dynamicQueueState<T> | undefined> | undefined;
    ready: GoChannel<dynamicQueueState<T> | undefined> | undefined;
};
export class dynamicQueue<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: dynamicQueue$Storage<T>) {
    }
    public static $storageOf<T>($source: dynamicQueue<T>): dynamicQueue$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: dynamicQueue$Storage<T>): dynamicQueue<T> {
        return new dynamicQueue<T>($source);
    }
    static $copy<T>($source: dynamicQueue<T>): dynamicQueue<T> {
        return new dynamicQueue<T>({
            idle: $source.$storage.idle,
            ready: $source.$storage.ready
        });
    }
    static $equal<T>($go$equal$ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_to_bool: ($0: GoChannel<dynamicQueueState<T> | undefined> | undefined, $1: GoChannel<dynamicQueueState<T> | undefined> | undefined) => bool, $left: dynamicQueue<T>, $right: dynamicQueue<T>): bool {
        return $go$equal$ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_to_bool($left.$storage.idle, $right.$storage.idle) && $go$equal$ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_to_bool($left.$storage.ready, $right.$storage.ready);
    }
    static $hash<T>($go$hash$ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_to_uint32: ($0: GoChannel<dynamicQueueState<T> | undefined> | undefined) => uint32, $source: dynamicQueue<T>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $go$hash$ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_to_uint32($source.$storage.idle));
        $hash = GoMapHash.mix($hash, $go$hash$ChannelOf_PointerTo_Named_lsp$dynamicQueueStateOf_T0_to_uint32($source.$storage.ready));
        return $hash;
    }
    declare private readonly then?: never;
    static Get$kernel<T>(q: {
        value: dynamicQueue<T>;
    } | undefined, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, ctx: GoInterface | undefined): [
        T,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        {
            const __gotots_receiver_0 = ctx;
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err();
            if (!(err__shadow_1 === undefined)) {
                let zero__shadow_1: T = $go$zero$void_to_T0();
                return [zero__shadow_1, err__shadow_1];
            }
        }
        const __gotots_results_0 = dynamicQueue.$go$private$lsp$getReady<T>(q, ctx);
        let state: dynamicQueueState<T> | undefined = __gotots_results_0[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
        if (!(err === undefined)) {
            let zero__shadow_1: T = $go$zero$void_to_T0();
            return [zero__shadow_1, err];
        }
        let item: T = $go$index$SliceOf_T0_int_to_T0(dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items, 0);
        let zero: T = $go$zero$void_to_T0();
        dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items.set(0, $go$to_container_storage$T0_to_T0(zero));
        dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items = dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items.slice(1, null, null);
        if ($go$length$SliceOf_T0_to_int(dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items) === 0) {
            dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items = RuntimeSlice.nil<GoContainerStorage<T>>();
            GoChannel.send(dynamicQueue.$storageOf((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).idle, state);
        }
        else {
            GoChannel.send(dynamicQueue.$storageOf((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).ready, state);
        }
        return [item, void 0];
    }
    static Put$kernel<T>(q: {
        value: dynamicQueue<T>;
    } | undefined, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, ctx: GoInterface | undefined, item: T): $goInterface$Interface_Method_Error_void_to_string | undefined {
        {
            const __gotots_receiver_1 = ctx;
            let err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<GoInterface>(__gotots_receiver_1).Err();
            if (!(err__shadow_1 === undefined)) {
                return err__shadow_1;
            }
        }
        const __gotots_results_1 = dynamicQueue.$go$private$lsp$getAny<T>(q, ctx);
        let state: dynamicQueueState<T> | undefined = __gotots_results_1[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
        if (!(err === undefined)) {
            return err;
        }
        const __gotots_slice_build_0 = dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0(item));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_0.get(__gotots_slice_build_3))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0(item));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
        }
        dynamicQueueState.$storageOf((state ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).items = __gotots_slice_build_1;
        GoChannel.send(dynamicQueue.$storageOf((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).ready, state);
        return void 0;
    }
    static $go$private$lsp$getAny<T>(q: {
        value: dynamicQueue<T>;
    } | undefined, ctx: GoInterface | undefined): [
        dynamicQueueState<T> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_receive_2: [
            dynamicQueueState<T> | undefined,
            boolean
        ] | undefined = undefined;
        const __gotots_select_2 = GoChannel.$selectReceive(dynamicQueue.$storageOf((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).idle, (value: dynamicQueueState<T> | undefined, ok: boolean): void => {
            __gotots_receive_2 = [value, ok];
        });
        let __gotots_receive_3: [
            dynamicQueueState<T> | undefined,
            boolean
        ] | undefined = undefined;
        const __gotots_select_3 = GoChannel.$selectReceive(dynamicQueue.$storageOf((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).ready, (value: dynamicQueueState<T> | undefined, ok: boolean): void => {
            __gotots_receive_3 = [value, ok];
        });
        const __gotots_receiver_4 = ctx;
        const __gotots_channel_2 = goInterfaceNonNil<GoInterface>(__gotots_receiver_4).Done();
        const __gotots_channel_3 = (value: GoEmptyStruct, ok: boolean): void => {
            __gotots_receive_4 = [value, ok];
        };
        let __gotots_receive_4: [
            GoEmptyStruct,
            boolean
        ] | undefined = undefined;
        const __gotots_select_4 = GoChannel.$selectReceive(__gotots_channel_2, __gotots_channel_3);
        const __gotots_switch_selection_1 = goSelect([__gotots_select_2, __gotots_select_3, __gotots_select_4]);
        switch (__gotots_switch_selection_1) {
            case 0: {
                if (__gotots_receive_2 === undefined) {
                    GoPanic.raiseRuntime("selected receive has no result");
                }
                let state: dynamicQueueState<T> | undefined = __gotots_receive_2[0];
                return [state, void 0];
                break;
            }
            case 1: {
                if (__gotots_receive_3 === undefined) {
                    GoPanic.raiseRuntime("selected receive has no result");
                }
                let state: dynamicQueueState<T> | undefined = __gotots_receive_3[0];
                return [state, void 0];
                break;
            }
            case 2: {
                const __gotots_results_4 = void 0;
                const __gotots_receiver_5 = ctx;
                const __gotots_results_5 = goInterfaceNonNil<GoInterface>(__gotots_receiver_5).Err();
                return [__gotots_results_4, __gotots_results_5];
                break;
            }
            default: GoPanic.raiseRuntime("select returned an invalid case");
        }
    }
    static $go$private$lsp$getReady<T>(q: {
        value: dynamicQueue<T>;
    } | undefined, ctx: GoInterface | undefined): [
        dynamicQueueState<T> | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let __gotots_receive_0: [
            dynamicQueueState<T> | undefined,
            boolean
        ] | undefined = undefined;
        const __gotots_select_0 = GoChannel.$selectReceive(dynamicQueue.$storageOf((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).ready, (value: dynamicQueueState<T> | undefined, ok: boolean): void => {
            __gotots_receive_0 = [value, ok];
        });
        const __gotots_receiver_2 = ctx;
        const __gotots_channel_0 = goInterfaceNonNil<GoInterface>(__gotots_receiver_2).Done();
        const __gotots_channel_1 = (value: GoEmptyStruct, ok: boolean): void => {
            __gotots_receive_1 = [value, ok];
        };
        let __gotots_receive_1: [
            GoEmptyStruct,
            boolean
        ] | undefined = undefined;
        const __gotots_select_1 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
        const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1]);
        switch (__gotots_switch_selection_0) {
            case 0: {
                if (__gotots_receive_0 === undefined) {
                    GoPanic.raiseRuntime("selected receive has no result");
                }
                let state: dynamicQueueState<T> | undefined = __gotots_receive_0[0];
                return [state, void 0];
                break;
            }
            case 1: {
                const __gotots_results_2 = void 0;
                const __gotots_receiver_3 = ctx;
                const __gotots_results_3 = goInterfaceNonNil<GoInterface>(__gotots_receiver_3).Err();
                return [__gotots_results_2, __gotots_results_3];
                break;
            }
            default: GoPanic.raiseRuntime("select returned an invalid case");
        }
    }
}
export type dynamicQueueState$Storage<T> = {
    items: RuntimeSlice<GoContainerStorage<T>>;
};
export class dynamicQueueState<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: dynamicQueueState$Storage<T>) {
    }
    public static $storageOf<T>($source: dynamicQueueState<T>): dynamicQueueState$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: dynamicQueueState$Storage<T>): dynamicQueueState<T> {
        return new dynamicQueueState<T>($source);
    }
    declare private readonly then?: never;
}
export function newDynamicQueue<T>(): {
    value: dynamicQueue<T>;
} | undefined {
    let q: {
        value: dynamicQueue<T>;
    } | undefined = { value: dynamicQueue.$fromStorage<T>({
            idle: GoChannel.make<dynamicQueueState<T> | undefined>(1, (): dynamicQueueState<T> | undefined => {
                return void 0;
            }, (value: dynamicQueueState<T> | undefined): dynamicQueueState<T> | undefined => {
                return value;
            }),
            ready: GoChannel.make<dynamicQueueState<T> | undefined>(1, (): dynamicQueueState<T> | undefined => {
                return void 0;
            }, (value: dynamicQueueState<T> | undefined): dynamicQueueState<T> | undefined => {
                return value;
            })
        }) };
    GoChannel.send(dynamicQueue.$storageOf((q ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value).idle, dynamicQueueState.$fromStorage<T>({
        items: RuntimeSlice.nil<GoContainerStorage<T>>()
    }));
    return q;
}
