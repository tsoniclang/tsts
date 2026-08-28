import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { SyncMap$Storage as SyncMap__from_collections$Storage } from "./syncmap.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { $goInterfaceAdapter$Struct_void as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { SyncMap } from "./syncmap.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export type SyncSet$Storage<T> = {
    m: SyncMap__from_collections$Storage<T, GoEmptyStruct>;
};
export class SyncSet<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: SyncSet$Storage<T>) {
    }
    public static $storageOf<T>($source: SyncSet<T>): SyncSet$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: SyncSet$Storage<T>): SyncSet<T> {
        return new SyncSet<T>($source);
    }
    static $zero<T>(): SyncSet<T> {
        return new SyncSet<T>({
            m: SyncMap.$storageOf<T, GoEmptyStruct>(SyncMap.$zero<T, GoEmptyStruct>())
        });
    }
    static $copy<T>($source: SyncSet<T>): SyncSet<T> {
        return new SyncSet<T>({
            m: SyncMap.$storageOf<T, GoEmptyStruct>(SyncMap.$copy<T, GoEmptyStruct>(SyncMap.$fromStorage<T, GoEmptyStruct>($source.$storage.m)))
        });
    }
    declare private readonly then?: never;
    static Add$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$interface_adapt$T0_to_Interface_void: ($0: T) => GoInterface | undefined, key: T): void {
        SyncSet.AddIfAbsent$kernel<T>(s, $go$copy$T0_to_T0, $go$interface_adapt$T0_to_Interface_void, $go$copy$T0_to_T0(key));
    }
    static AddIfAbsent$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$interface_adapt$T0_to_Interface_void: ($0: T) => GoInterface | undefined, key: T): bool {
        const __gotots_store_2 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        const __gotots_results_0 = SyncMap.LoadOrStore$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, ($argument0: GoEmptyStruct): GoInterface | undefined => {
            return new GoInterfaceAdapter((void GoEmptyStruct.$copy,
                $argument0));
        }, $go$interface_adapt$T0_to_Interface_void, ($argument0: GoInterfaceValue | undefined): GoEmptyStruct => {
            return (($value: GoInterfaceValue | undefined): GoEmptyStruct => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return (void GoEmptyStruct.$copy,
                    $value.$go$value);
            })($argument0);
        }, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, $go$copy$T0_to_T0(key), new GoEmptyStruct);
        let loaded = __gotots_results_0[1];
        return !loaded;
    }
    static Delete$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: T) => GoInterface | undefined, key: T): void {
        const __gotots_store_8 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        SyncMap.Delete$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), $go$interface_adapt$T0_to_Interface_void, key);
    }
    static Has$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$interface_adapt$T0_to_Interface_void: ($0: T) => GoInterface | undefined, key: T): bool {
        const __gotots_store_3 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        const __gotots_results_1 = SyncMap.Load$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, $go$interface_adapt$T0_to_Interface_void, ($argument0: GoInterfaceValue | undefined): GoEmptyStruct => {
            return (($value: GoInterfaceValue | undefined): GoEmptyStruct => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return (void GoEmptyStruct.$copy,
                    $value.$go$value);
            })($argument0);
        }, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, key);
        let ok = __gotots_results_1[1];
        return ok;
    }
    static IsEmpty$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => T, $go$zero$void_to_T0: () => T): bool {
        let empty = true;
        const __gotots_store_7 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        SyncMap.Range$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, $go$copy$T0_to_T0, ($argument0: GoInterfaceValue | undefined): GoEmptyStruct => {
            return (($value: GoInterfaceValue | undefined): GoEmptyStruct => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return (void GoEmptyStruct.$copy,
                    $value.$go$value);
            })($argument0);
        }, $go$interface_assert$Interface_void_to_T0, $go$zero$void_to_T0, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, ($0: T, $1: GoEmptyStruct): bool => {
            empty = false;
            return false;
        });
        return empty;
    }
    static Keys$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => T, $go$zero$void_to_T0: () => T): iter__from_gostdlib.Seq<T> {
        return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: T) => bool) | undefined): void => {
            const __gotots_store_6 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
            SyncMap.Range$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
                return (void GoEmptyStruct.$copy,
                    $argument0);
            }, $go$copy$T0_to_T0, ($argument0: GoInterfaceValue | undefined): GoEmptyStruct => {
                return (($value: GoInterfaceValue | undefined): GoEmptyStruct => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return (void GoEmptyStruct.$copy,
                        $value.$go$value);
                })($argument0);
            }, $go$interface_assert$Interface_void_to_T0, $go$zero$void_to_T0, (): GoEmptyStruct => {
                return GoEmptyStruct.$zero();
            }, (key: T, value: GoEmptyStruct): bool => {
                const __gotots_callee_1 = __go_yield;
                const __gotots_argument_3 = $go$copy$T0_to_T0(key);
                if (!(__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3)) {
                    return false;
                }
                return true;
            });
        });
    }
    static Range$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => T, $go$zero$void_to_T0: () => T, fn: (($0: T) => bool) | undefined): void {
        const __gotots_store_4 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        SyncMap.Range$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, $go$copy$T0_to_T0, ($argument0: GoInterfaceValue | undefined): GoEmptyStruct => {
            return (($value: GoInterfaceValue | undefined): GoEmptyStruct => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return (void GoEmptyStruct.$copy,
                    $value.$go$value);
            })($argument0);
        }, $go$interface_assert$Interface_void_to_T0, $go$zero$void_to_T0, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, (key: T, value: GoEmptyStruct): bool => {
            const __gotots_callee_0 = fn;
            const __gotots_argument_2 = $go$copy$T0_to_T0(key);
            return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        });
    }
    static Size$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => T, $go$zero$void_to_T0: () => T): int {
        let count = 0;
        const __gotots_store_5 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        SyncMap.Range$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, $go$copy$T0_to_T0, ($argument0: GoInterfaceValue | undefined): GoEmptyStruct => {
            return (($value: GoInterfaceValue | undefined): GoEmptyStruct => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return (void GoEmptyStruct.$copy,
                    $value.$go$value);
            })($argument0);
        }, $go$interface_assert$Interface_void_to_T0, $go$zero$void_to_T0, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, ($0: T, $1: GoEmptyStruct): bool => {
            count++;
            return true;
        });
        return count;
    }
    static ToSlice$kernel<T>(s: tsonicTypeScriptRuntime.Location<SyncSet<T>> | undefined, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$interface_assert$Interface_void_to_T0: ($0: GoInterface | undefined) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T): RuntimeSlice<GoContainerStorage<T>> {
        let arr = RuntimeSlice.nil<GoContainerStorage<T>>();
        const __gotots_argument_0 = 0;
        const __gotots_store_0 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        const __gotots_argument_1 = SyncMap.Size<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "m"), SyncMap.$fromStorage, SyncMap.$storageOf));
        const __gotots_slice_build_0 = goSliceAllocate<GoContainerStorage<T>>(__gotots_argument_0, __gotots_argument_1);
        for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
            __gotots_slice_build_0.$initialize(__gotots_slice_build_1, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
        }
        arr = __gotots_slice_build_0;
        const __gotots_store_1 = SyncSet.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SyncSet<T>>).value);
        SyncMap.Range$kernel<T, GoEmptyStruct>(tsonicTypeScriptRuntime.projectLocation<SyncMap__from_collections$Storage<T, GoEmptyStruct>, SyncMap<T, GoEmptyStruct>>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "m"), SyncMap.$fromStorage, SyncMap.$storageOf), ($argument0: GoEmptyStruct): GoEmptyStruct => {
            return (void GoEmptyStruct.$copy,
                $argument0);
        }, $go$copy$T0_to_T0, ($argument0: GoInterfaceValue | undefined): GoEmptyStruct => {
            return (($value: GoInterfaceValue | undefined): GoEmptyStruct => {
                if (!GoInterfaceAdapter.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return (void GoEmptyStruct.$copy,
                    $value.$go$value);
            })($argument0);
        }, $go$interface_assert$Interface_void_to_T0, $go$zero$void_to_T0, (): GoEmptyStruct => {
            return GoEmptyStruct.$zero();
        }, (key: T, value: GoEmptyStruct): bool => {
            const __gotots_slice_build_2 = arr;
            const __gotots_slice_build_4 = __gotots_slice_build_2.length + 1;
            let __gotots_slice_build_3 = __gotots_slice_build_2;
            if (__gotots_slice_build_4 <= __gotots_slice_build_2.capacity) {
                __gotots_slice_build_3 = __gotots_slice_build_2.$withLength(__gotots_slice_build_4);
                __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(key)));
            }
            else {
                __gotots_slice_build_3 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_2.capacity, __gotots_slice_build_4));
                for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.set(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_2.get(__gotots_slice_build_5)))));
                }
                __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(key)));
                for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                    __gotots_slice_build_3.$initialize(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                }
            }
            arr = __gotots_slice_build_3;
            return true;
        });
        return arr;
    }
}
