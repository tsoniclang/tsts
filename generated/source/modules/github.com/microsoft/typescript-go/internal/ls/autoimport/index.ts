import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { RuneError$int32 as RuneError$int32__from_utf8 } from "../../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { FirstResult$rune } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_rune_To_SliceOf_int as GoMap } from "../../../../../../../support/maps.js";
import { wordIndices } from "./util.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringSlice } from "@gotots/runtime/string.js";
export type Index$Storage<T> = {
    entries: RuntimeSlice<GoContainerStorage<T>>;
    index: GoMapValue<int32, RuntimeSlice<int>>;
};
export class Index<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Index$Storage<T>) {
    }
    public static $storageOf<T>($source: Index<T>): Index$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: Index$Storage<T>): Index<T> {
        return new Index<T>($source);
    }
    declare private readonly then?: never;
    static Clone$kernel<T>(idx: Index<T> | undefined, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, filter: (($0: T) => bool) | undefined): Index<T> | undefined {
        if (idx === undefined) {
            return void 0;
        }
        const __gotots_slice_build_14 = goSliceAllocate<GoContainerStorage<T>>(0, $go$length$SliceOf_T0_to_int(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries));
        for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_14.capacity; __gotots_slice_build_15++) {
            __gotots_slice_build_14.$initialize(__gotots_slice_build_15, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
        }
        const __gotots_field_0 = __gotots_slice_build_14;
        let newIdx: Index<T> | undefined = Index.$fromStorage<T>({
            entries: __gotots_field_0,
            index: GoMap.make(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.length(), [])
        });
        let oldToNew: GoMapValue<int, int> = GoMap__from_gotots_runtime.make<int, int>(0, $go$length$SliceOf_T0_to_int(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries), []);
        const __gotots_range_5 = Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_6 = __gotots_range_index_5;
            const __gotots_range_value_7 = $go$from_container_storage$T0_to_T0(__gotots_range_5.get(__gotots_range_index_5));
            let oldIndex = __gotots_range_value_6;
            let entry: T = __gotots_range_value_7;
            const __gotots_callee_0 = filter;
            const __gotots_argument_1 = entry;
            if ((__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1)) {
                let newIndex = $go$length$SliceOf_T0_to_int(Index.$storageOf((newIdx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries);
                const __gotots_slice_build_16 = Index.$storageOf((newIdx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries;
                const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
                let __gotots_slice_build_17 = __gotots_slice_build_16;
                if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
                    __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
                    __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, $go$to_container_storage$T0_to_T0(entry));
                }
                else {
                    __gotots_slice_build_17 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.set(__gotots_slice_build_19, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_16.get(__gotots_slice_build_19))));
                    }
                    __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, $go$to_container_storage$T0_to_T0(entry));
                    for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.$initialize(__gotots_slice_build_19, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                    }
                }
                Index.$storageOf((newIdx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries = __gotots_slice_build_17;
                oldToNew.store(oldIndex, newIndex);
            }
        }
        const __gotots_range_6 = Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index;
        const __gotots_range_keys_0 = __gotots_range_6.keys();
        for (const __gotots_range_value_8 of __gotots_range_keys_0) {
            const __gotots_range_value_9 = __gotots_range_6.lookupOk(__gotots_range_value_8);
            if (!__gotots_range_value_9[1]) {
                continue;
            }
            const __gotots_range_value_10 = __gotots_range_value_8;
            const __gotots_range_value_11 = __gotots_range_value_9[0];
            let r = __gotots_range_value_10;
            let oldIndices = __gotots_range_value_11;
            let newIndices = RuntimeSlice.make<int>(0, oldIndices.length, 0);
            const __gotots_range_7 = oldIndices;
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
                const __gotots_range_value_12 = __gotots_range_7.get(__gotots_range_index_6);
                let oldIndex = __gotots_range_value_12;
                {
                    const __gotots_results_11 = oldToNew.lookupOk(oldIndex);
                    let newIndex = __gotots_results_11[0];
                    let ok = __gotots_results_11[1];
                    if (ok) {
                        newIndices = newIndices.append(0, [newIndex]);
                    }
                }
            }
            if (newIndices.length > 0) {
                Index.$storageOf((newIdx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.store(r, newIndices);
            }
        }
        return newIdx;
    }
    static Find$kernel<T>(idx: Index<T> | undefined, $go$constraint_method$autoimport$Name$T0_to_string: ($0: T) => gostring, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, name: gostring, caseSensitive: bool): RuntimeSlice<GoContainerStorage<T>> {
        if ($go$length$SliceOf_T0_to_int(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries) === 0 || name.length === 0) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        const __gotots_results_4 = utf8__from_gostdlib.DecodeRuneInString(name);
        const __gotots_results_5 = [__gotots_results_4[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_4[1]))] satisfies [
            int32,
            int
        ];
        let firstRune = FirstResult$rune(__gotots_results_5[0], RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(__gotots_results_5[1])]));
        if (firstRune === RuneError$int32__from_utf8) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        let firstRuneUpper = unicode__from_gostdlib.ToUpper(firstRune);
        const __gotots_results_6 = Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.lookupOk(firstRuneUpper);
        let candidates = __gotots_results_6[0];
        let ok = __gotots_results_6[1];
        if (!ok) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        let results = RuntimeSlice.nil<GoContainerStorage<T>>();
        const __gotots_range_2 = candidates;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let entryIndex = __gotots_range_value_2;
            let entry: T = $go$index$SliceOf_T0_int_to_T0(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries, entryIndex);
            let entryName = $go$constraint_method$autoimport$Name$T0_to_string(entry);
            if ((caseSensitive && entryName === name) || (!caseSensitive && strings__from_gostdlib.EqualFold(entryName, name))) {
                const __gotots_slice_build_6 = results;
                const __gotots_slice_build_8 = __gotots_slice_build_6.length + 1;
                let __gotots_slice_build_7 = __gotots_slice_build_6;
                if (__gotots_slice_build_8 <= __gotots_slice_build_6.capacity) {
                    __gotots_slice_build_7 = __gotots_slice_build_6.$withLength(__gotots_slice_build_8);
                    __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, $go$to_container_storage$T0_to_T0(entry));
                }
                else {
                    __gotots_slice_build_7 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_8, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_8));
                    for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
                        __gotots_slice_build_7.set(__gotots_slice_build_9, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_6.get(__gotots_slice_build_9))));
                    }
                    __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, $go$to_container_storage$T0_to_T0(entry));
                    for (let __gotots_slice_build_9 = __gotots_slice_build_8; __gotots_slice_build_9 < __gotots_slice_build_7.capacity; __gotots_slice_build_9++) {
                        __gotots_slice_build_7.$initialize(__gotots_slice_build_9, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                    }
                }
                results = __gotots_slice_build_7;
            }
        }
        return results;
    }
    static SearchWordPrefix$kernel<T>(idx: Index<T> | undefined, $go$constraint_method$autoimport$Name$T0_to_string: ($0: T) => gostring, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, prefix: gostring): RuntimeSlice<GoContainerStorage<T>> {
        if ($go$length$SliceOf_T0_to_int(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries) === 0) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        if (prefix.length === 0) {
            return Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries;
        }
        prefix = strings__from_gostdlib.ToLower(prefix);
        const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(prefix);
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let firstRune = __gotots_results_1[0];
        if (firstRune === RuneError$int32__from_utf8) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        let firstRuneUpper = unicode__from_gostdlib.ToUpper(firstRune);
        let firstRuneLower = unicode__from_gostdlib.ToLower(firstRune);
        let wordStarts = RuntimeSlice.nil<int>();
        const __gotots_results_2 = Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.lookupOk(firstRuneUpper);
        let nameStarts = __gotots_results_2[0];
        if (firstRuneUpper !== firstRuneLower) {
            const __gotots_results_3 = Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.lookupOk(firstRuneLower);
            wordStarts = __gotots_results_3[0];
        }
        let count = nameStarts.length + wordStarts.length;
        if (count === 0) {
            return RuntimeSlice.nil<GoContainerStorage<T>>();
        }
        const __gotots_slice_build_0 = goSliceAllocate<GoContainerStorage<T>>(0, count);
        for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
            __gotots_slice_build_0.$initialize(__gotots_slice_build_1, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
        }
        let results = __gotots_slice_build_0;
        const __gotots_range_0 = RuntimeSlice.literal<RuntimeSlice<int>>([nameStarts, wordStarts]);
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let starts = __gotots_range_value_0;
            const __gotots_range_1 = starts;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let i = __gotots_range_value_1;
                let entry: T = $go$index$SliceOf_T0_int_to_T0(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries, i);
                if (containsCharsInOrder($go$constraint_method$autoimport$Name$T0_to_string(entry), prefix)) {
                    const __gotots_slice_build_2 = results;
                    const __gotots_slice_build_4 = __gotots_slice_build_2.length + 1;
                    let __gotots_slice_build_3 = __gotots_slice_build_2;
                    if (__gotots_slice_build_4 <= __gotots_slice_build_2.capacity) {
                        __gotots_slice_build_3 = __gotots_slice_build_2.$withLength(__gotots_slice_build_4);
                        __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, $go$to_container_storage$T0_to_T0(entry));
                    }
                    else {
                        __gotots_slice_build_3 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_2.capacity, __gotots_slice_build_4));
                        for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                            __gotots_slice_build_3.set(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_2.get(__gotots_slice_build_5))));
                        }
                        __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, $go$to_container_storage$T0_to_T0(entry));
                        for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                            __gotots_slice_build_3.$initialize(__gotots_slice_build_5, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                        }
                    }
                    results = __gotots_slice_build_3;
                }
            }
        }
        return results;
    }
    static $go$private$autoimport$insertAsWords$kernel<T>(idx: Index<T> | undefined, $go$constraint_method$autoimport$Name$T0_to_string: ($0: T) => gostring, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, value: T): void {
        if (Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.isNil()) {
            Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index = GoMap.make(0, []);
        }
        let name = $go$constraint_method$autoimport$Name$T0_to_string(value);
        if (name.length === 0) {
            const __gotots_argument_0 = new $goInterfaceAdapter$string("Cannot index entry with empty name");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        let entryIndex = $go$length$SliceOf_T0_to_int(Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries);
        const __gotots_slice_build_10 = Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries;
        const __gotots_slice_build_12 = __gotots_slice_build_10.length + 1;
        let __gotots_slice_build_11 = __gotots_slice_build_10;
        if (__gotots_slice_build_12 <= __gotots_slice_build_10.capacity) {
            __gotots_slice_build_11 = __gotots_slice_build_10.$withLength(__gotots_slice_build_12);
            __gotots_slice_build_11.set(__gotots_slice_build_10.length + 0, $go$to_container_storage$T0_to_T0(value));
        }
        else {
            __gotots_slice_build_11 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_12, RuntimeSlice.$grownCapacity(__gotots_slice_build_10.capacity, __gotots_slice_build_12));
            for (let __gotots_slice_build_13 = 0; __gotots_slice_build_13 < __gotots_slice_build_10.length; __gotots_slice_build_13++) {
                __gotots_slice_build_11.set(__gotots_slice_build_13, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_10.get(__gotots_slice_build_13))));
            }
            __gotots_slice_build_11.set(__gotots_slice_build_10.length + 0, $go$to_container_storage$T0_to_T0(value));
            for (let __gotots_slice_build_13 = __gotots_slice_build_12; __gotots_slice_build_13 < __gotots_slice_build_11.capacity; __gotots_slice_build_13++) {
                __gotots_slice_build_11.$initialize(__gotots_slice_build_13, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
        }
        Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).entries = __gotots_slice_build_11;
        let indices = wordIndices(name);
        let seenRunes: GoMapValue<int32, bool> = GoMap__from_gotots_runtime.make<int32, bool>(false, 0, []);
        const __gotots_range_3 = indices;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_index_3;
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let i = __gotots_range_value_3;
            let start = __gotots_range_value_4;
            let substr = goStringSlice(name, start);
            const __gotots_results_7 = utf8__from_gostdlib.DecodeRuneInString(substr);
            const __gotots_results_8 = [__gotots_results_7[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_7[1]))] satisfies [
                int32,
                int
            ];
            let firstRune = __gotots_results_8[0];
            if (firstRune === RuneError$int32__from_utf8) {
                continue;
            }
            if (i === 0) {
                firstRune = unicode__from_gostdlib.ToUpper(firstRune);
                Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.store(firstRune, Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.lookup(firstRune).append(0, [entryIndex]));
                seenRunes.store(firstRune, true);
            }
            else {
                firstRune = unicode__from_gostdlib.ToLower(firstRune);
                if (!seenRunes.lookup(firstRune)) {
                    Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.store(firstRune, Index.$storageOf((idx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).index.lookup(firstRune).append(0, [entryIndex]));
                    seenRunes.store(firstRune, true);
                }
            }
        }
    }
}
export function containsCharsInOrder(str: gostring, pattern: gostring): bool {
    str = strings__from_gostdlib.ToLower(str);
    pattern = strings__from_gostdlib.ToLower(pattern);
    let patternIdx = 0;
    const __gotots_range_4 = str;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_4, __gotots_range_index_4);
        const __gotots_range_value_5 = __gotots_range_decode_0[0];
        let ch = __gotots_range_value_5;
        __gotots_range_index_4 += __gotots_range_decode_0[1];
        if (patternIdx < pattern.length) {
            const __gotots_results_9 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(pattern, patternIdx));
            const __gotots_results_10 = [__gotots_results_9[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_9[1]))] satisfies [
                int32,
                int
            ];
            let patternRune = __gotots_results_10[0];
            let size = __gotots_results_10[1];
            if (ch === patternRune) {
                patternIdx += size;
            }
        }
    }
    return patternIdx === pattern.length;
}
