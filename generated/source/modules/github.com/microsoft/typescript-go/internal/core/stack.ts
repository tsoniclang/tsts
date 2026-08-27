import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { int } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type Stack$Storage<T> = {
    data: RuntimeSlice<GoContainerStorage<T>>;
};
export class Stack<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Stack$Storage<T>) {
    }
    public static $storageOf<T>($source: Stack<T>): Stack$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: Stack$Storage<T>): Stack<T> {
        return new Stack<T>($source);
    }
    static $zero<T>(): Stack<T> {
        return new Stack<T>({
            data: RuntimeSlice.nil<GoContainerStorage<T>>()
        });
    }
    static $copy<T>($source: Stack<T>): Stack<T> {
        return new Stack<T>({
            data: $source.$storage.data
        });
    }
    declare private readonly then?: never;
    static Len$kernel<T>(s: tsonicTypeScriptRuntime.Location<Stack<T>> | undefined, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int): int {
        return $go$length$SliceOf_T0_to_int(Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data);
    }
    static Peek$kernel<T>(s: tsonicTypeScriptRuntime.Location<Stack<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int): T {
        let l = $go$length$SliceOf_T0_to_int(Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data);
        if (l === 0) {
            const __gotots_argument_1 = new GoInterfaceAdapter("stack is empty");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
        return $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data, l - 1));
    }
    static Pop$kernel<T>(s: tsonicTypeScriptRuntime.Location<Stack<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T): T {
        let l = $go$length$SliceOf_T0_to_int(Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data);
        if (l === 0) {
            const __gotots_argument_0 = new GoInterfaceAdapter("stack is empty");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        let item: T = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data, l - 1));
        let zero: T = $go$zero$void_to_T0();
        Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data.set(l - 1, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(zero)));
        Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data = Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data.slice(0, l - 1, null);
        return $go$copy$T0_to_T0(item);
    }
    static Push$kernel<T>(s: tsonicTypeScriptRuntime.Location<Stack<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, item: T): void {
        const __gotots_slice_build_0 = Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(item)));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(item)));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
        }
        Stack.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Stack<T>>).value).data = __gotots_slice_build_1;
    }
}
