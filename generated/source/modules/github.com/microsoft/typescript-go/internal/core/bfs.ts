import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { MapEntry$Storage as MapEntry__from_collections$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int, int64 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage, GoStorage } from "@gotots/runtime/storage.js";
import { MapEntry as MapEntry__from_collections, OrderedMap as OrderedMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { MaxInt64$int64 as MaxInt64$int64__from_math__package_1 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { NewOrderedMapFromList$kernel, NewOrderedMapWithSizeHint$kernel } from "../collections/ordered_map.js";
import { Map$kernel } from "./core.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type BreadthFirstSearchResult$Storage<N> = {
    Stopped: bool;
    Path: RuntimeSlice<GoContainerStorage<N>>;
};
export class BreadthFirstSearchResult<N> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: BreadthFirstSearchResult$Storage<N>) {
    }
    public static $storageOf<N>($source: BreadthFirstSearchResult<N>): BreadthFirstSearchResult$Storage<N> {
        return $source.$storage;
    }
    public static $fromStorage<N>($source: BreadthFirstSearchResult$Storage<N>): BreadthFirstSearchResult<N> {
        return new BreadthFirstSearchResult<N>($source);
    }
    declare private readonly then?: never;
}
export type breadthFirstSearchJob$Storage<N> = {
    node: GoStorage<N>;
    parent: breadthFirstSearchJob<N> | undefined;
};
export class breadthFirstSearchJob<N> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: breadthFirstSearchJob$Storage<N>) {
    }
    public static $storageOf<N>($source: breadthFirstSearchJob<N>): breadthFirstSearchJob$Storage<N> {
        return $source.$storage;
    }
    public static $fromStorage<N>($source: breadthFirstSearchJob$Storage<N>): breadthFirstSearchJob<N> {
        return new breadthFirstSearchJob<N>($source);
    }
    declare private readonly then?: never;
}
export type BreadthFirstSearchLevel$Storage<K, N> = {
    jobs: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<K, breadthFirstSearchJob<N> | undefined>> | undefined;
};
export class BreadthFirstSearchLevel<K, N> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: BreadthFirstSearchLevel$Storage<K, N>) {
    }
    public static $storageOf<K, N>($source: BreadthFirstSearchLevel<K, N>): BreadthFirstSearchLevel$Storage<K, N> {
        return $source.$storage;
    }
    public static $fromStorage<K, N>($source: BreadthFirstSearchLevel$Storage<K, N>): BreadthFirstSearchLevel<K, N> {
        return new BreadthFirstSearchLevel<K, N>($source);
    }
    declare private readonly then?: never;
    static Delete$kernel<K, N>(l: BreadthFirstSearchLevel<K, N> | undefined, $go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<K>>) => RuntimeSlice<GoContainerStorage<K>>, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined) => breadthFirstSearchJob<N> | undefined, $go$equal$T0_T0_to_bool: ($0: K, $1: K) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$zero$void_to_T0: () => K, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: () => breadthFirstSearchJob<N> | undefined, key__shadow_1: K): void {
        OrderedMap__from_collections.Delete$kernel<K, breadthFirstSearchJob<N> | undefined>(BreadthFirstSearchLevel.$storageOf((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).jobs, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$copy$T0_to_T0, $go$equal$T0_T0_to_bool, $go$from_container_storage$T0_to_T0, $go$length$SliceOf_T0_to_int, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$copy$T0_to_T0(key__shadow_1));
    }
    static Has$kernel<K, N>(l: BreadthFirstSearchLevel<K, N> | undefined, $go$copy$T0_to_T0: ($0: K) => K, key__shadow_1: K): bool {
        return OrderedMap__from_collections.Has<K, breadthFirstSearchJob<N> | undefined>(BreadthFirstSearchLevel.$storageOf((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).jobs, $go$copy$T0_to_T0(key__shadow_1));
    }
    static Range$kernel<K, N>(l: BreadthFirstSearchLevel<K, N> | undefined, $go$copy$T1_to_T1: ($0: N) => N, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined) => breadthFirstSearchJob<N> | undefined, $go$from_storage$T1_to_T1: ($0: GoStorage<N>) => N, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int, f: (($0: N) => bool) | undefined): void {
        const __gotots_range_3 = named_iter.IterSeqValueOperations.$project(OrderedMap__from_collections.Values$kernel<K, breadthFirstSearchJob<N> | undefined>(BreadthFirstSearchLevel.$storageOf((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).jobs, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int));
        if (__gotots_range_3 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_1 = 1;
        __gotots_range_3(($argument0: breadthFirstSearchJob<N> | undefined): bool => {
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
            const __gotots_range_value_3 = $argument0;
            let job: breadthFirstSearchJob<N> | undefined = __gotots_range_value_3;
            const __gotots_callee_10 = f;
            const __gotots_argument_21 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((job ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node));
            if (!(__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21)) {
                __gotots_range_state_1 = 2;
                return false;
            }
            __gotots_range_state_1 = 1;
            return true;
        });
        if (__gotots_range_state_1 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_1 === 2) {
            return;
        }
        __gotots_range_state_1 = -2;
    }
}
export type BreadthFirstSearchOptions$Storage<K, N> = {
    Visited: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<K>> | undefined;
    PreprocessLevel: (($0: BreadthFirstSearchLevel<K, N> | undefined) => void) | undefined;
};
export class BreadthFirstSearchOptions<K, N> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: BreadthFirstSearchOptions$Storage<K, N>) {
    }
    public static $storageOf<K, N>($source: BreadthFirstSearchOptions<K, N>): BreadthFirstSearchOptions$Storage<K, N> {
        return $source.$storage;
    }
    public static $fromStorage<K, N>($source: BreadthFirstSearchOptions$Storage<K, N>): BreadthFirstSearchOptions<K, N> {
        return new BreadthFirstSearchOptions<K, N>($source);
    }
    declare private readonly then?: never;
}
export function BreadthFirstSearchParallelEx$kernel<K, N>($go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined) => breadthFirstSearchJob<N> | undefined, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$T1_to_T1: ($0: N) => N, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<K>) => K, $go$from_container_storage$T1_to_T1: ($0: GoContainerStorage<N>) => N, $go$from_storage$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined) => breadthFirstSearchJob<N> | undefined, $go$from_storage$T0_to_T0: ($0: GoStorage<K>) => K, $go$from_storage$T1_to_T1: ($0: GoStorage<N>) => N, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<K>>, $1: int) => K, $go$interface_adapt$T0_to_Interface_void: ($0: K) => GoInterface | undefined, $go$length$SliceOf_T1_to_int: ($0: RuntimeSlice<GoContainerStorage<N>>) => int, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<K>>) => int, $go$length$SliceOf_Named_collections$MapEntryOf_T0_And_PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_int: ($0: RuntimeSlice<MapEntry__from_collections$Storage<K, breadthFirstSearchJob<N> | undefined>>) => int, $go$map_construct$PointerTo_Named_core$breadthFirstSearchJobOf_T1_int_to_MapOf_T0_To_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined, $1: int) => GoMapValue<K, breadthFirstSearchJob<N> | undefined>, $go$map_construct$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_MapOf_T0_To_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined) => GoMapValue<K, breadthFirstSearchJob<N> | undefined>, $go$to_container_storage$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined) => breadthFirstSearchJob<N> | undefined, $go$to_container_storage$T0_to_T0: ($0: K) => GoContainerStorage<K>, $go$to_container_storage$T1_to_T1: ($0: N) => GoContainerStorage<N>, $go$to_storage$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: ($0: breadthFirstSearchJob<N> | undefined) => breadthFirstSearchJob<N> | undefined, $go$to_storage$T0_to_T0: ($0: K) => GoStorage<K>, $go$to_storage$T1_to_T1: ($0: N) => GoStorage<N>, $go$zero$void_to_T1: () => N, $go$zero$void_to_T0: () => K, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1: () => breadthFirstSearchJob<N> | undefined, start: N, neighbors: (($0: N) => RuntimeSlice<GoContainerStorage<N>>) | undefined, visit: (($0: N) => [
    bool,
    bool
]) | undefined, options: BreadthFirstSearchOptions<K, N>, getKey: (($0: N) => K) | undefined): BreadthFirstSearchResult<N> {
    let visited: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<K>> | undefined = BreadthFirstSearchOptions.$storageOf(options).Visited;
    if (visited === undefined) {
        const __gotots_struct_0 = SyncSet__from_collections.$zero<K>();
        visited =
            tsonicTypeScriptRuntime.location<SyncSet__from_collections<K>>(__gotots_struct_0);
    }
    class result {
        declare private readonly $goType: void;
        public constructor(public stop: bool, public job: breadthFirstSearchJob<N> | undefined, public next: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<K, breadthFirstSearchJob<N> | undefined>> | undefined) {
        }
        declare private readonly then?: never;
    }
    let fallback: breadthFirstSearchJob<N> | undefined = void 0;
    let processLevel: (($0: int, $1: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<K, breadthFirstSearchJob<N> | undefined>> | undefined) => result) | undefined = (index: int, jobs: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<K, breadthFirstSearchJob<N> | undefined>> | undefined): result => {
        let lowestFallback = named_sync_atomic.SyncAtomicInt64Operations.$zero();
        const lowestFallback$location = tsonicTypeScriptRuntime.boundLocation({}, () => lowestFallback, lowestFallback$next => lowestFallback = lowestFallback$next);
        let lowestGoal = named_sync_atomic.SyncAtomicInt64Operations.$zero();
        const lowestGoal$location = tsonicTypeScriptRuntime.boundLocation({}, () => lowestGoal, lowestGoal$next => lowestGoal = lowestGoal$next);
        let nextJobCount = named_sync_atomic.SyncAtomicInt64Operations.$zero();
        atomic__from_gostdlib.Int64.Store(lowestGoal, MaxInt64$int64__from_math__package_1);
        atomic__from_gostdlib.Int64.Store(lowestFallback, MaxInt64$int64__from_math__package_1);
        if (!(BreadthFirstSearchOptions.$storageOf(options).PreprocessLevel === undefined)) {
            const __gotots_callee_0 = BreadthFirstSearchOptions.$storageOf(options).PreprocessLevel;
            const __gotots_argument_0 = BreadthFirstSearchLevel.$fromStorage<K, N>({
                jobs: jobs
            });
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        }
        let next = RuntimeSlice.make<RuntimeSlice<breadthFirstSearchJob<N> | undefined>>(OrderedMap__from_collections.Size$kernel<K, breadthFirstSearchJob<N> | undefined>(jobs, $go$length$SliceOf_T0_to_int), null, RuntimeSlice.nil<breadthFirstSearchJob<N> | undefined>());
        let wg = named_sync.SyncWaitGroupOperations.$zero();
        let i = 0;
        const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(OrderedMap__from_collections.Values$kernel<K, breadthFirstSearchJob<N> | undefined>(jobs, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int));
        if (__gotots_range_0 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_0(($argument0: breadthFirstSearchJob<N> | undefined): bool => {
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
            const __gotots_range_value_0 = $argument0;
            let j: breadthFirstSearchJob<N> | undefined = __gotots_range_value_0;
            sync__from_gostdlib.WaitGroup.Add(wg, BigInt.asIntN(64, goNumberToBigInt(1)));
            ((i__shadow_1: int, j__shadow_1: breadthFirstSearchJob<N> | undefined): void => {
                let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_0: GoPanic | undefined = undefined;
                try {
                    try {
                        __gotots_return_block_0: {
                            const __gotots_receiver_0 = wg;
                            __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncWaitGroupDone(__gotots_receiver_0, $go$recovery);
                            };
                            if (BigInt.asIntN(64, goNumberToBigInt(i__shadow_1)) >= atomic__from_gostdlib.Int64.Load(lowestGoal)) {
                                break __gotots_return_block_0;
                            }
                            const __gotots_receiver_1 = visited;
                            const __gotots_callee_1 = getKey;
                            const __gotots_argument_1 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((j__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node));
                            const __gotots_argument_2 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                            const __gotots_argument_3 = $go$copy$T0_to_T0(__gotots_argument_2);
                            if (!SyncSet__from_collections.AddIfAbsent$kernel<K>(__gotots_receiver_1, $go$copy$T0_to_T0, $go$interface_adapt$T0_to_Interface_void, __gotots_argument_3)) {
                                break __gotots_return_block_0;
                            }
                            const __gotots_callee_2 = visit;
                            const __gotots_argument_4 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((j__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node));
                            const __gotots_results_0 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
                            let isResult = __gotots_results_0[0];
                            let stop = __gotots_results_0[1];
                            if (isResult) {
                                if (stop) {
                                    updateMin(lowestGoal$location, BigInt.asIntN(64, goNumberToBigInt(i__shadow_1)));
                                    break __gotots_return_block_0;
                                }
                                if (fallback === undefined) {
                                    updateMin(lowestFallback$location, BigInt.asIntN(64, goNumberToBigInt(i__shadow_1)));
                                }
                            }
                            if (BigInt.asIntN(64, goNumberToBigInt(i__shadow_1)) >= atomic__from_gostdlib.Int64.Load(lowestGoal)) {
                                break __gotots_return_block_0;
                            }
                            const __gotots_callee_3 = neighbors;
                            const __gotots_argument_5 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((j__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node));
                            let neighborNodes = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
                            if ($go$length$SliceOf_T1_to_int(neighborNodes) > 0) {
                                atomic__from_gostdlib.Int64.Add(nextJobCount, BigInt.asIntN(64, goNumberToBigInt($go$length$SliceOf_T1_to_int(neighborNodes))));
                                next.set(i__shadow_1, Map$kernel<N, breadthFirstSearchJob<N> | undefined>($go$copy$T1_to_T1, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$from_container_storage$T1_to_T1, $go$length$SliceOf_T1_to_int, $go$to_container_storage$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, neighborNodes, (child: N): breadthFirstSearchJob<N> | undefined => {
                                    return breadthFirstSearchJob.$fromStorage<N>({
                                        node: $go$to_storage$T1_to_T1($go$copy$T1_to_T1(child)),
                                        parent: j__shadow_1
                                    });
                                }));
                            }
                        }
                    }
                    catch (__gotots_caught_1) {
                        if (!(__gotots_caught_1 instanceof GoPanic)) {
                            throw __gotots_caught_1;
                        }
                        __gotots_panic_0 = __gotots_caught_1;
                    }
                }
                finally {
                    if (__gotots_deferred_0 !== undefined) {
                        const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                        try {
                            __gotots_deferred_0(__gotots_recovery_0);
                            if (__gotots_recovery_0.recovered()) {
                                __gotots_panic_0 = undefined;
                            }
                        }
                        catch (__gotots_caught_0) {
                            if (!(__gotots_caught_0 instanceof GoPanic)) {
                                throw __gotots_caught_0;
                            }
                            __gotots_panic_0 = __gotots_caught_0;
                        }
                    }
                }
                if (__gotots_panic_0 !== undefined) {
                    throw __gotots_panic_0;
                }
            })(i, j);
            i++;
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        sync__from_gostdlib.WaitGroup.Wait(wg);
        {
            let index__shadow_1 = atomic__from_gostdlib.Int64.Load(lowestGoal);
            if (index__shadow_1 !== MaxInt64$int64__from_math__package_1) {
                const __gotots_results_1 = OrderedMap__from_collections.EntryAt$kernel<K, breadthFirstSearchJob<N> | undefined>(jobs, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$copy$T0_to_T0, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int, $go$zero$void_to_T0, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, globalThis.Number(BigInt.asIntN(64, index__shadow_1)));
                let job: breadthFirstSearchJob<N> | undefined = __gotots_results_1[1];
                return new result(true, job, void 0);
            }
        }
        if (fallback === undefined) {
            {
                let index__shadow_1 = atomic__from_gostdlib.Int64.Load(lowestFallback);
                if (index__shadow_1 !== MaxInt64$int64__from_math__package_1) {
                    const __gotots_results_2 = OrderedMap__from_collections.EntryAt$kernel<K, breadthFirstSearchJob<N> | undefined>(jobs, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$copy$T0_to_T0, $go$index$SliceOf_T0_int_to_T0, $go$length$SliceOf_T0_to_int, $go$zero$void_to_T0, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, globalThis.Number(BigInt.asIntN(64, index__shadow_1)));
                    fallback = __gotots_results_2[1];
                }
            }
        }
        let nextJobs: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<K, breadthFirstSearchJob<N> | undefined>> | undefined = NewOrderedMapWithSizeHint$kernel<K, breadthFirstSearchJob<N> | undefined>($go$map_construct$PointerTo_Named_core$breadthFirstSearchJobOf_T1_int_to_MapOf_T0_To_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$to_container_storage$T0_to_T0, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$zero$void_to_T0, globalThis.Number(BigInt.asIntN(64, atomic__from_gostdlib.Int64.Load(nextJobCount))));
        const __gotots_range_1 = next;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_0);
            let jobs__shadow_1 = __gotots_range_value_1;
            const __gotots_range_2 = jobs__shadow_1;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_1);
                let j: breadthFirstSearchJob<N> | undefined = __gotots_range_value_2;
                const __gotots_receiver_2 = nextJobs;
                const __gotots_callee_4 = getKey;
                const __gotots_argument_6 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((j ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node));
                const __gotots_argument_7 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
                const __gotots_argument_8 = $go$copy$T0_to_T0(__gotots_argument_7);
                if (!OrderedMap__from_collections.Has<K, breadthFirstSearchJob<N> | undefined>(__gotots_receiver_2, __gotots_argument_8)) {
                    const __gotots_receiver_3 = nextJobs;
                    const __gotots_callee_5 = getKey;
                    const __gotots_argument_9 = $go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((j ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node));
                    const __gotots_argument_10 = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9);
                    const __gotots_argument_11 = $go$copy$T0_to_T0(__gotots_argument_10);
                    const __gotots_argument_12 = j;
                    OrderedMap__from_collections.Set$kernel<K, breadthFirstSearchJob<N> | undefined>(__gotots_receiver_3, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$map_construct$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_MapOf_T0_To_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, __gotots_argument_11, __gotots_argument_12);
                }
            }
        }
        return new result(false, void 0, nextJobs);
    };
    let createPath: (($0: breadthFirstSearchJob<N> | undefined) => RuntimeSlice<GoContainerStorage<N>>) | undefined = (job: breadthFirstSearchJob<N> | undefined): RuntimeSlice<GoContainerStorage<N>> => {
        let path = RuntimeSlice.nil<GoContainerStorage<N>>();
        for (; !(job === undefined);) {
            const __gotots_slice_build_0 = path;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((job ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node))));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<N>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1($go$from_container_storage$T1_to_T1(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1($go$from_storage$T1_to_T1(breadthFirstSearchJob.$storageOf((job ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).node))));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T1_to_T1($go$zero$void_to_T1()));
                }
            }
            path = __gotots_slice_build_1;
            job = breadthFirstSearchJob.$storageOf((job ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).parent;
        }
        return path;
    };
    let levelIndex = 0;
    const __gotots_callee_6 = getKey;
    const __gotots_argument_13 = $go$copy$T1_to_T1(start);
    const __gotots_argument_14 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
    const __gotots_argument_15 = $go$copy$T0_to_T0(__gotots_argument_14);
    const __gotots_field_0 = $go$to_storage$T0_to_T0(__gotots_argument_15);
    const __gotots_slice_element_0 = (void MapEntry__from_collections.$storageOf, (void MapEntry__from_collections.$fromStorage,
        {
            Key: __gotots_field_0,
            Value: breadthFirstSearchJob.$fromStorage<N>({
                node: $go$to_storage$T1_to_T1($go$copy$T1_to_T1(start)),
                parent: void 0
            })
        }));
    const __gotots_argument_16 = RuntimeSlice.literal<MapEntry__from_collections$Storage<K, breadthFirstSearchJob<N> | undefined>>([__gotots_slice_element_0]);
    let level: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<K, breadthFirstSearchJob<N> | undefined>> | undefined = NewOrderedMapFromList$kernel<K, breadthFirstSearchJob<N> | undefined>($go$copy$T0_to_T0, $go$copy$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$from_container_storage$T0_to_T0, $go$from_storage$T0_to_T0, $go$from_storage$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$length$SliceOf_Named_collections$MapEntryOf_T0_And_PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_int, $go$map_construct$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_MapOf_T0_To_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$map_construct$PointerTo_Named_core$breadthFirstSearchJobOf_T1_int_to_MapOf_T0_To_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$to_container_storage$T0_to_T0, $go$to_storage$T0_to_T0, $go$to_storage$PointerTo_Named_core$breadthFirstSearchJobOf_T1_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$zero$void_to_PointerTo_Named_core$breadthFirstSearchJobOf_T1, $go$zero$void_to_T0, __gotots_argument_16);
    for (; OrderedMap__from_collections.Size$kernel<K, breadthFirstSearchJob<N> | undefined>(level, $go$length$SliceOf_T0_to_int) > 0;) {
        const __gotots_callee_7 = processLevel;
        const __gotots_argument_17 = levelIndex;
        const __gotots_argument_18 = level;
        let result__shadow_1 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17, __gotots_argument_18);
        if (result__shadow_1.stop) {
            const __gotots_field_1 = true;
            const __gotots_callee_8 = createPath;
            const __gotots_argument_19 = result__shadow_1.job;
            const __gotots_field_2 = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
            return BreadthFirstSearchResult.$fromStorage<N>({
                Stopped: __gotots_field_1,
                Path: __gotots_field_2
            });
        }
        else if (!(result__shadow_1.job === undefined) && fallback === undefined) {
            fallback = result__shadow_1.job;
        }
        level = result__shadow_1.next;
        levelIndex++;
    }
    const __gotots_field_3 = false;
    const __gotots_callee_9 = createPath;
    const __gotots_argument_20 = fallback;
    const __gotots_field_4 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
    return BreadthFirstSearchResult.$fromStorage<N>({
        Stopped: __gotots_field_3,
        Path: __gotots_field_4
    });
}
export function updateMin(a: tsonicTypeScriptRuntime.Location<atomic__from_gostdlib.Int64> | undefined, candidate: int64): bool {
    for (;;) {
        const __gotots_receiver_3 = a;
        let current = atomic__from_gostdlib.Int64.Load(__gotots_receiver_3 === void 0 ? void 0 :
            (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<atomic__from_gostdlib.Int64>).value);
        if (current < candidate) {
            return false;
        }
        const __gotots_receiver_4 = a;
        if (atomic__from_gostdlib.Int64.CompareAndSwap(__gotots_receiver_4 === void 0 ? void 0 :
            (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<atomic__from_gostdlib.Int64>).value, current, candidate)) {
            return true;
        }
    }
}
