import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { int } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { arenaNew } from "../../../../../../implementations/tsts/core-hotpaths.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type Arena$Storage<T> = {
    data: RuntimeSlice<GoContainerStorage<T>>;
};
export class Arena<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Arena$Storage<T>) {
    }
    public static $storageOf<T>($source: Arena<T>): Arena$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: Arena$Storage<T>): Arena<T> {
        return new Arena<T>($source);
    }
    static $zero<T>(): Arena<T> {
        return new Arena<T>({
            data: RuntimeSlice.nil<GoContainerStorage<T>>()
        });
    }
    static $copy<T>($source: Arena<T>): Arena<T> {
        return new Arena<T>({
            data: $source.$storage.data
        });
    }
    static $zeroStorage<T>(): Arena$Storage<T> {
        return {
            data: RuntimeSlice.nil<GoContainerStorage<T>>()
        };
    }
    declare private readonly then?: never;
    static Clone$kernel<T>(a: tsonicTypeScriptRuntime.Location<Arena<T>> | undefined, $go$capacity$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, t: RuntimeSlice<GoContainerStorage<T>>): RuntimeSlice<GoContainerStorage<T>> {
        if ($go$length$SliceOf_T0_to_int(t) === 0) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        let slice = Arena.NewSlice$kernel<T>(a, $go$capacity$SliceOf_T0_to_int, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$length$SliceOf_T0_to_int, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, $go$length$SliceOf_T0_to_int(t));
        const __gotots_slice_build_0 = slice;
        const __gotots_slice_build_1 = t;
        const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
        let __gotots_slice_build_3 = __gotots_slice_build_1;
        if (__gotots_slice_build_2 > 0) {
            __gotots_slice_build_3 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_2, null);
            for (let __gotots_slice_build_4 = 0; __gotots_slice_build_4 < __gotots_slice_build_2; __gotots_slice_build_4++) {
                __gotots_slice_build_3.set(__gotots_slice_build_4, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_1.get(__gotots_slice_build_4)))));
            }
            for (let __gotots_slice_build_4 = 0; __gotots_slice_build_4 < __gotots_slice_build_2; __gotots_slice_build_4++) {
                __gotots_slice_build_0.set(__gotots_slice_build_4, __gotots_slice_build_3.get(__gotots_slice_build_4));
            }
        }
        __gotots_slice_build_2;
        return slice;
    }
    static New$kernel<T>(a: tsonicTypeScriptRuntime.Location<Arena<T>> | undefined, $go$capacity$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index_address$SliceOf_T0_int_to_PointerTo_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => tsonicTypeScriptRuntime.Location<T> | undefined, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T): tsonicTypeScriptRuntime.Location<T> | undefined {
        return arenaNew(a, $go$capacity$SliceOf_T0_to_int, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$index_address$SliceOf_T0_int_to_PointerTo_T0, $go$length$SliceOf_T0_to_int, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0);
    }
    static NewSlice$kernel<T>(a: tsonicTypeScriptRuntime.Location<Arena<T>> | undefined, $go$capacity$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, size: int): RuntimeSlice<GoContainerStorage<T>> {
        if (size === 0) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        if ($go$length$SliceOf_T0_to_int(Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data) + size > $go$capacity$SliceOf_T0_to_int(Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data)) {
            let nextSize = nextArenaSize($go$length$SliceOf_T0_to_int(Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data));
            if (size > nextSize) {
                const __gotots_slice_build_5 = goSliceAllocate<GoContainerStorage<T>>(size, null);
                for (let __gotots_slice_build_6 = 0; __gotots_slice_build_6 < __gotots_slice_build_5.capacity; __gotots_slice_build_6++) {
                    __gotots_slice_build_5.$initialize(__gotots_slice_build_6, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                }
                return __gotots_slice_build_5;
            }
            Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data = generic_slices_kernel.SlicesGrowKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, RuntimeSlice.nil<GoContainerStorage<T>>(), BigInt.asIntN(64, goNumberToBigInt(nextSize)));
        }
        let newLen = $go$length$SliceOf_T0_to_int(Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data) + size;
        let slice = Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data.slice($go$length$SliceOf_T0_to_int(Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data), newLen, newLen);
        Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data = Arena.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Arena<T>>).value).data.slice(0, newLen, null);
        return slice;
    }
    static NewSlice1$kernel<T>(a: tsonicTypeScriptRuntime.Location<Arena<T>> | undefined, $go$capacity$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, t: T): RuntimeSlice<GoContainerStorage<T>> {
        let slice = Arena.NewSlice$kernel<T>(a, $go$capacity$SliceOf_T0_to_int, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$length$SliceOf_T0_to_int, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, 1);
        slice.set(0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(t)));
        return slice;
    }
}
export function nextArenaSize(size: int): int {
    size = globalThis.Math.max(size, 1);
    size = globalThis.Math.min(size * 2, 256);
    return size;
}
