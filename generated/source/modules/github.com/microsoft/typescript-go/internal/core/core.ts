import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CompilerOptions } from "./compileroptions.js";
import type { ScriptKind } from "./scriptkind.js";
import type { TextPos } from "./text.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/state.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { MarshalIndent as MarshalIndent__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { IsLineBreak as IsLineBreak__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, ExtensionTsx$string as ExtensionTsx$string__from_tspath, HasTSFileExtension as HasTSFileExtension__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, PathIsRelative as PathIsRelative__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { GetSpellingSuggestion$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/GetSpellingSuggestion.js";
import { Identity$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { AppendSeq$SliceOf_Named_core$TextPos$Named_core$TextPos } from "../../../../../../support/generics/concretizations/slices/AppendSeq.js";
import { Grow$SliceOf_float64$float64 } from "../../../../../../support/generics/concretizations/slices/Grow.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_core$levenshteinBuffers as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { ScriptKindJS$constant, ScriptKindJSON$constant, ScriptKindJSX$constant, ScriptKindTS$constant, ScriptKindTSX$constant, ScriptKindUnknown$constant } from "./scriptkind.js";
import { Tristate_IsTrue } from "./tristate.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as math__from_gostdlib from "@gotots/gostdlib/math.js";
import * as os__from_gostdlib from "@gotots/gostdlib/os.js";
import * as debug__from_gostdlib from "@gotots/gostdlib/runtime/debug.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function ApplyDebugStackLimit(): void {
    let v = os__from_gostdlib.Getenv("TS_GO_DEBUG_STACK_LIMIT");
    if (v === "") {
        return;
    }
    const __gotots_results_0 = strconv__from_gostdlib.Atoi(v);
    const __gotots_results_1 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_0[0])), GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
        int,
        GoInterface | undefined
    ];
    let n = __gotots_results_1[0];
    let err: GoInterface | undefined = __gotots_results_1[1];
    if (!(err === undefined) || n <= 0) {
        return;
    }
    debug__from_gostdlib.SetMaxStack(BigInt.asIntN(64, goNumberToBigInt(n)));
}
export function Filter$kernel<T>($go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): RuntimeSlice<GoContainerStorage<T>> {
    const __gotots_range_0 = slice;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_0.get(__gotots_range_index_0)));
        let i = __gotots_range_value_0;
        let value: T = __gotots_range_value_1;
        const __gotots_callee_0 = f;
        const __gotots_argument_1 = $go$copy$T0_to_T0(value);
        if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1)) {
            let result = generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, slice.slice(0, i, null));
            for (i++; i < $go$length$SliceOf_T0_to_int(slice); i++) {
                value = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(slice, i));
                const __gotots_callee_1 = f;
                const __gotots_argument_2 = $go$copy$T0_to_T0(value);
                if ((__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2)) {
                    const __gotots_slice_build_0 = result;
                    const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                    let __gotots_slice_build_1 = __gotots_slice_build_0;
                    if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                        __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(value)));
                    }
                    else {
                        __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                        }
                        __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(value)));
                        for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                            __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                        }
                    }
                    result = __gotots_slice_build_1;
                }
            }
            return result;
        }
    }
    return slice;
}
export function FilterSeq$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): iter__from_gostdlib.Seq<T> {
    return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: T) => bool) | undefined): void => {
        const __gotots_range_24 = slice;
        for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_24.length; __gotots_range_index_19++) {
            const __gotots_range_value_37 = $go$from_container_storage$T0_to_T0(__gotots_range_24.get(__gotots_range_index_19));
            let value: T = __gotots_range_value_37;
            const __gotots_callee_31 = f;
            const __gotots_argument_59 = value;
            if ((__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59)) {
                const __gotots_callee_32 = __go_yield;
                const __gotots_argument_60 = value;
                if (!(__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60)) {
                    return;
                }
            }
        }
    });
}
export function Map$kernel<T, U>($go$copy$T0_to_T0: ($0: T) => T, $go$copy$T1_to_T1: ($0: U) => U, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T1_to_T1: ($0: U) => GoContainerStorage<U>, $go$zero$void_to_T1: () => U, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => U) | undefined): RuntimeSlice<GoContainerStorage<U>> {
    if (slice.isNil()) {
        return RuntimeSlice.nil<GoContainerStorage<U>>();
    }
    const __gotots_slice_build_4 = goSliceAllocate<GoContainerStorage<U>>($go$length$SliceOf_T0_to_int(slice), null);
    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
        __gotots_slice_build_4.$initialize(__gotots_slice_build_5, $go$to_container_storage$T1_to_T1($go$zero$void_to_T1()));
    }
    let result = __gotots_slice_build_4;
    const __gotots_range_1 = slice;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_2 = __gotots_range_index_1;
        const __gotots_range_value_3 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_1.get(__gotots_range_index_1)));
        let i = __gotots_range_value_2;
        let value: T = __gotots_range_value_3;
        const __gotots_store_0 = result;
        const __gotots_store_1 = i;
        const __gotots_callee_2 = f;
        const __gotots_argument_3 = $go$copy$T0_to_T0(value);
        const __gotots_argument_4 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
        const __gotots_argument_5 = $go$copy$T1_to_T1(__gotots_argument_4);
        __gotots_store_0.set(__gotots_store_1, $go$to_container_storage$T1_to_T1(__gotots_argument_5));
    }
    return result;
}
export function MapIndex$kernel<T, U>($go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T1_to_T1: ($0: U) => GoContainerStorage<U>, $go$zero$void_to_T1: () => U, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T, $1: int) => U) | undefined): RuntimeSlice<GoContainerStorage<U>> {
    if (slice.isNil()) {
        return RuntimeSlice.nil<GoContainerStorage<U>>();
    }
    const __gotots_slice_build_23 = goSliceAllocate<GoContainerStorage<U>>($go$length$SliceOf_T0_to_int(slice), null);
    for (let __gotots_slice_build_24 = 0; __gotots_slice_build_24 < __gotots_slice_build_23.capacity; __gotots_slice_build_24++) {
        __gotots_slice_build_23.$initialize(__gotots_slice_build_24, $go$to_container_storage$T1_to_T1($go$zero$void_to_T1()));
    }
    let result = __gotots_slice_build_23;
    const __gotots_range_14 = slice;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_14.length; __gotots_range_index_11++) {
        const __gotots_range_value_24 = __gotots_range_index_11;
        const __gotots_range_value_25 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_14.get(__gotots_range_index_11)));
        let i = __gotots_range_value_24;
        let value: T = __gotots_range_value_25;
        const __gotots_store_4 = result;
        const __gotots_store_5 = i;
        const __gotots_callee_19 = f;
        const __gotots_argument_29 = $go$copy$T0_to_T0(value);
        const __gotots_argument_30 = i;
        const __gotots_argument_31 = (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29, __gotots_argument_30);
        const __gotots_argument_32 = __gotots_argument_31;
        __gotots_store_4.set(__gotots_store_5, $go$to_container_storage$T1_to_T1(__gotots_argument_32));
    }
    return result;
}
export function MapNonNil$kernel<T, U>($go$binary_not_equal$T1_T1_to_bool: ($0: U, $1: U) => bool, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$from_container_storage$T1_to_T1: ($0: GoContainerStorage<U>) => U, $go$to_container_storage$T1_to_T1: ($0: U) => GoContainerStorage<U>, $go$zero$void_to_T1: () => U, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => U) | undefined): RuntimeSlice<GoContainerStorage<U>> {
    let result = RuntimeSlice.nil<GoContainerStorage<U>>();
    const __gotots_range_21 = slice;
    for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_21.length; __gotots_range_index_16++) {
        const __gotots_range_value_33 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_21.get(__gotots_range_index_16)));
        let value: T = __gotots_range_value_33;
        const __gotots_callee_27 = f;
        const __gotots_argument_49 = $go$copy$T0_to_T0(value);
        const __gotots_argument_50 = (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49);
        let mapped: U = __gotots_argument_50;
        if ($go$binary_not_equal$T1_T1_to_bool(mapped, $go$zero$void_to_T1())) {
            const __gotots_slice_build_33 = result;
            const __gotots_slice_build_35 = __gotots_slice_build_33.length + 1;
            let __gotots_slice_build_34 = __gotots_slice_build_33;
            if (__gotots_slice_build_35 <= __gotots_slice_build_33.capacity) {
                __gotots_slice_build_34 = __gotots_slice_build_33.$withLength(__gotots_slice_build_35);
                __gotots_slice_build_34.set(__gotots_slice_build_33.length + 0, $go$to_container_storage$T1_to_T1(mapped));
            }
            else {
                __gotots_slice_build_34 = goSliceAllocate<GoContainerStorage<U>>(__gotots_slice_build_35, RuntimeSlice.$grownCapacity(__gotots_slice_build_33.capacity, __gotots_slice_build_35));
                for (let __gotots_slice_build_36 = 0; __gotots_slice_build_36 < __gotots_slice_build_33.length; __gotots_slice_build_36++) {
                    __gotots_slice_build_34.set(__gotots_slice_build_36, $go$to_container_storage$T1_to_T1($go$from_container_storage$T1_to_T1(__gotots_slice_build_33.get(__gotots_slice_build_36))));
                }
                __gotots_slice_build_34.set(__gotots_slice_build_33.length + 0, $go$to_container_storage$T1_to_T1(mapped));
                for (let __gotots_slice_build_36 = __gotots_slice_build_35; __gotots_slice_build_36 < __gotots_slice_build_34.capacity; __gotots_slice_build_36++) {
                    __gotots_slice_build_34.$initialize(__gotots_slice_build_36, $go$to_container_storage$T1_to_T1($go$zero$void_to_T1()));
                }
            }
            result = __gotots_slice_build_34;
        }
    }
    return result;
}
export function MapFiltered$kernel<T, U>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$from_container_storage$T1_to_T1: ($0: GoContainerStorage<U>) => U, $go$to_container_storage$T1_to_T1: ($0: U) => GoContainerStorage<U>, $go$zero$void_to_T1: () => U, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => [
    U,
    bool
]) | undefined): RuntimeSlice<GoContainerStorage<U>> {
    let result = RuntimeSlice.nil<GoContainerStorage<U>>();
    const __gotots_range_10 = slice;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_10.length; __gotots_range_index_8++) {
        const __gotots_range_value_19 = $go$from_container_storage$T0_to_T0(__gotots_range_10.get(__gotots_range_index_8));
        let value: T = __gotots_range_value_19;
        const __gotots_callee_13 = f;
        const __gotots_argument_23 = value;
        const __gotots_results_9 = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
        let mapped: U = __gotots_results_9[0];
        let ok = __gotots_results_9[1];
        if (!ok) {
            continue;
        }
        const __gotots_slice_build_19 = result;
        const __gotots_slice_build_21 = __gotots_slice_build_19.length + 1;
        let __gotots_slice_build_20 = __gotots_slice_build_19;
        if (__gotots_slice_build_21 <= __gotots_slice_build_19.capacity) {
            __gotots_slice_build_20 = __gotots_slice_build_19.$withLength(__gotots_slice_build_21);
            __gotots_slice_build_20.set(__gotots_slice_build_19.length + 0, $go$to_container_storage$T1_to_T1(mapped));
        }
        else {
            __gotots_slice_build_20 = goSliceAllocate<GoContainerStorage<U>>(__gotots_slice_build_21, RuntimeSlice.$grownCapacity(__gotots_slice_build_19.capacity, __gotots_slice_build_21));
            for (let __gotots_slice_build_22 = 0; __gotots_slice_build_22 < __gotots_slice_build_19.length; __gotots_slice_build_22++) {
                __gotots_slice_build_20.set(__gotots_slice_build_22, $go$to_container_storage$T1_to_T1($go$from_container_storage$T1_to_T1(__gotots_slice_build_19.get(__gotots_slice_build_22))));
            }
            __gotots_slice_build_20.set(__gotots_slice_build_19.length + 0, $go$to_container_storage$T1_to_T1(mapped));
            for (let __gotots_slice_build_22 = __gotots_slice_build_21; __gotots_slice_build_22 < __gotots_slice_build_20.capacity; __gotots_slice_build_22++) {
                __gotots_slice_build_20.$initialize(__gotots_slice_build_22, $go$to_container_storage$T1_to_T1($go$zero$void_to_T1()));
            }
        }
        result = __gotots_slice_build_20;
    }
    return result;
}
export function FlatMap$kernel<T, U>($go$copy$T1_to_T1: ($0: U) => U, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$from_container_storage$T1_to_T1: ($0: GoContainerStorage<U>) => U, $go$length$SliceOf_T1_to_int: ($0: RuntimeSlice<GoContainerStorage<U>>) => int, $go$to_container_storage$T1_to_T1: ($0: U) => GoContainerStorage<U>, $go$zero$void_to_T1: () => U, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => RuntimeSlice<GoContainerStorage<U>>) | undefined): RuntimeSlice<GoContainerStorage<U>> {
    let result = RuntimeSlice.nil<GoContainerStorage<U>>();
    const __gotots_range_25 = slice;
    for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_25.length; __gotots_range_index_20++) {
        const __gotots_range_value_38 = $go$from_container_storage$T0_to_T0(__gotots_range_25.get(__gotots_range_index_20));
        let value: T = __gotots_range_value_38;
        const __gotots_callee_33 = f;
        const __gotots_argument_61 = value;
        let mapped = (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_61);
        if ($go$length$SliceOf_T1_to_int(mapped) !== 0) {
            const __gotots_slice_build_44 = result;
            const __gotots_slice_build_45 = mapped;
            let __gotots_slice_build_46 = __gotots_slice_build_45;
            if (__gotots_slice_build_45.length > 0) {
                __gotots_slice_build_46 = goSliceAllocate<GoContainerStorage<U>>(__gotots_slice_build_45.length, null);
                for (let __gotots_slice_build_49 = 0; __gotots_slice_build_49 < __gotots_slice_build_45.length; __gotots_slice_build_49++) {
                    __gotots_slice_build_46.set(__gotots_slice_build_49, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1($go$from_container_storage$T1_to_T1(__gotots_slice_build_45.get(__gotots_slice_build_49)))));
                }
            }
            const __gotots_slice_build_48 = __gotots_slice_build_44.length + __gotots_slice_build_46.length;
            let __gotots_slice_build_47 = __gotots_slice_build_44;
            if (__gotots_slice_build_48 <= __gotots_slice_build_44.capacity) {
                __gotots_slice_build_47 = __gotots_slice_build_44.$withLength(__gotots_slice_build_48);
                for (let __gotots_slice_build_49 = 0; __gotots_slice_build_49 < __gotots_slice_build_46.length; __gotots_slice_build_49++) {
                    __gotots_slice_build_47.set(__gotots_slice_build_44.length + __gotots_slice_build_49, __gotots_slice_build_46.get(__gotots_slice_build_49));
                }
            }
            else {
                __gotots_slice_build_47 = goSliceAllocate<GoContainerStorage<U>>(__gotots_slice_build_48, RuntimeSlice.$grownCapacity(__gotots_slice_build_44.capacity, __gotots_slice_build_48));
                for (let __gotots_slice_build_49 = 0; __gotots_slice_build_49 < __gotots_slice_build_44.length; __gotots_slice_build_49++) {
                    __gotots_slice_build_47.set(__gotots_slice_build_49, $go$to_container_storage$T1_to_T1($go$copy$T1_to_T1($go$from_container_storage$T1_to_T1(__gotots_slice_build_44.get(__gotots_slice_build_49)))));
                }
                for (let __gotots_slice_build_49 = 0; __gotots_slice_build_49 < __gotots_slice_build_46.length; __gotots_slice_build_49++) {
                    __gotots_slice_build_47.set(__gotots_slice_build_44.length + __gotots_slice_build_49, __gotots_slice_build_46.get(__gotots_slice_build_49));
                }
                for (let __gotots_slice_build_49 = __gotots_slice_build_48; __gotots_slice_build_49 < __gotots_slice_build_47.capacity; __gotots_slice_build_49++) {
                    __gotots_slice_build_47.$initialize(__gotots_slice_build_49, $go$to_container_storage$T1_to_T1($go$zero$void_to_T1()));
                }
            }
            result = __gotots_slice_build_47;
        }
    }
    return result;
}
export function SameMap$kernel<T>($go$binary_not_equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => T) | undefined): RuntimeSlice<GoContainerStorage<T>> {
    const __gotots_range_7 = slice;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_7.length; __gotots_range_index_5++) {
        const __gotots_range_value_15 = __gotots_range_index_5;
        const __gotots_range_value_16 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_7.get(__gotots_range_index_5)));
        let i = __gotots_range_value_15;
        let value: T = __gotots_range_value_16;
        const __gotots_callee_10 = f;
        const __gotots_argument_17 = $go$copy$T0_to_T0(value);
        const __gotots_argument_18 = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17);
        let mapped: T = $go$copy$T0_to_T0(__gotots_argument_18);
        if ($go$binary_not_equal$T0_T0_to_bool(mapped, value)) {
            const __gotots_slice_build_6 = goSliceAllocate<GoContainerStorage<T>>($go$length$SliceOf_T0_to_int(slice), null);
            for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_6.capacity; __gotots_slice_build_7++) {
                __gotots_slice_build_6.$initialize(__gotots_slice_build_7, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
            let result = __gotots_slice_build_6;
            const __gotots_slice_build_8 = result;
            const __gotots_slice_build_9 = slice.slice(0, i, null);
            const __gotots_slice_build_10 = globalThis.Math.min(__gotots_slice_build_8.length, __gotots_slice_build_9.length);
            let __gotots_slice_build_11 = __gotots_slice_build_9;
            if (__gotots_slice_build_10 > 0) {
                __gotots_slice_build_11 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_10, null);
                for (let __gotots_slice_build_12 = 0; __gotots_slice_build_12 < __gotots_slice_build_10; __gotots_slice_build_12++) {
                    __gotots_slice_build_11.set(__gotots_slice_build_12, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_9.get(__gotots_slice_build_12)))));
                }
                for (let __gotots_slice_build_12 = 0; __gotots_slice_build_12 < __gotots_slice_build_10; __gotots_slice_build_12++) {
                    __gotots_slice_build_8.set(__gotots_slice_build_12, __gotots_slice_build_11.get(__gotots_slice_build_12));
                }
            }
            __gotots_slice_build_10;
            result.set(i, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(mapped)));
            for (let j = i + 1; j < $go$length$SliceOf_T0_to_int(slice); j++) {
                const __gotots_store_2 = result;
                const __gotots_store_3 = j;
                const __gotots_callee_11 = f;
                const __gotots_argument_19 = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(slice, j));
                const __gotots_argument_20 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
                const __gotots_argument_21 = $go$copy$T0_to_T0(__gotots_argument_20);
                __gotots_store_2.set(__gotots_store_3, $go$to_container_storage$T0_to_T0(__gotots_argument_21));
            }
            return result;
        }
    }
    return slice;
}
export function SameMapIndex$kernel<T>($go$binary_not_equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T, $1: int) => T) | undefined): RuntimeSlice<GoContainerStorage<T>> {
    const __gotots_range_23 = slice;
    for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_23.length; __gotots_range_index_18++) {
        const __gotots_range_value_35 = __gotots_range_index_18;
        const __gotots_range_value_36 = $go$from_container_storage$T0_to_T0(__gotots_range_23.get(__gotots_range_index_18));
        let i = __gotots_range_value_35;
        let value: T = __gotots_range_value_36;
        const __gotots_callee_29 = f;
        const __gotots_argument_52 = value;
        const __gotots_argument_53 = i;
        const __gotots_argument_54 = (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52, __gotots_argument_53);
        let mapped: T = __gotots_argument_54;
        if ($go$binary_not_equal$T0_T0_to_bool(mapped, value)) {
            const __gotots_slice_build_37 = goSliceAllocate<GoContainerStorage<T>>($go$length$SliceOf_T0_to_int(slice), null);
            for (let __gotots_slice_build_38 = 0; __gotots_slice_build_38 < __gotots_slice_build_37.capacity; __gotots_slice_build_38++) {
                __gotots_slice_build_37.$initialize(__gotots_slice_build_38, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
            let result = __gotots_slice_build_37;
            const __gotots_slice_build_39 = result;
            const __gotots_slice_build_40 = slice.slice(0, i, null);
            const __gotots_slice_build_41 = globalThis.Math.min(__gotots_slice_build_39.length, __gotots_slice_build_40.length);
            let __gotots_slice_build_42 = __gotots_slice_build_40;
            if (__gotots_slice_build_41 > 0) {
                __gotots_slice_build_42 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_41, null);
                for (let __gotots_slice_build_43 = 0; __gotots_slice_build_43 < __gotots_slice_build_41; __gotots_slice_build_43++) {
                    __gotots_slice_build_42.set(__gotots_slice_build_43, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_40.get(__gotots_slice_build_43))));
                }
                for (let __gotots_slice_build_43 = 0; __gotots_slice_build_43 < __gotots_slice_build_41; __gotots_slice_build_43++) {
                    __gotots_slice_build_39.set(__gotots_slice_build_43, __gotots_slice_build_42.get(__gotots_slice_build_43));
                }
            }
            __gotots_slice_build_41;
            result.set(i, $go$to_container_storage$T0_to_T0(mapped));
            for (let j = i + 1; j < $go$length$SliceOf_T0_to_int(slice); j++) {
                const __gotots_store_6 = result;
                const __gotots_store_7 = j;
                const __gotots_callee_30 = f;
                const __gotots_argument_55 = $go$index$SliceOf_T0_int_to_T0(slice, j);
                const __gotots_argument_56 = j;
                const __gotots_argument_57 = (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_55, __gotots_argument_56);
                const __gotots_argument_58 = __gotots_argument_57;
                __gotots_store_6.set(__gotots_store_7, $go$to_container_storage$T0_to_T0(__gotots_argument_58));
            }
            return result;
        }
    }
    return slice;
}
export function Same$kernel<T>($go$equal$PointerTo_T0_PointerTo_T0_to_bool: ($0: tsonicTypeScriptRuntime.Location<T> | undefined, $1: tsonicTypeScriptRuntime.Location<T> | undefined) => bool, $go$index_address$SliceOf_T0_int_to_PointerTo_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => tsonicTypeScriptRuntime.Location<T> | undefined, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, s1: RuntimeSlice<GoContainerStorage<T>>, s2: RuntimeSlice<GoContainerStorage<T>>): bool {
    if ($go$length$SliceOf_T0_to_int(s1) === $go$length$SliceOf_T0_to_int(s2)) {
        return $go$length$SliceOf_T0_to_int(s1) === 0 || $go$equal$PointerTo_T0_PointerTo_T0_to_bool($go$index_address$SliceOf_T0_int_to_PointerTo_T0(s1, 0), $go$index_address$SliceOf_T0_int_to_PointerTo_T0(s2, 0));
    }
    return false;
}
export function Some$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): bool {
    const __gotots_range_4 = slice;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_6 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_4.get(__gotots_range_index_4)));
        let value: T = __gotots_range_value_6;
        const __gotots_callee_4 = f;
        const __gotots_argument_7 = $go$copy$T0_to_T0(value);
        if ((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7)) {
            return true;
        }
    }
    return false;
}
export function Every$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): bool {
    const __gotots_range_8 = slice;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
        const __gotots_range_value_17 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_8.get(__gotots_range_index_6)));
        let value: T = __gotots_range_value_17;
        const __gotots_callee_12 = f;
        const __gotots_argument_22 = $go$copy$T0_to_T0(value);
        if (!(__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22)) {
            return false;
        }
    }
    return true;
}
export function Or$kernel<T>(funcs: RuntimeSlice<(($0: T) => bool) | undefined>): (($0: T) => bool) | undefined {
    return (input: T): bool => {
        const __gotots_range_31 = funcs;
        for (let __gotots_range_index_26 = 0; __gotots_range_index_26 < __gotots_range_31.length; __gotots_range_index_26++) {
            const __gotots_range_value_44 = __gotots_range_31.get(__gotots_range_index_26);
            let f: (($0: T) => bool) | undefined = __gotots_range_value_44;
            const __gotots_callee_35 = f;
            const __gotots_argument_65 = input;
            if ((__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_65)) {
                return true;
            }
        }
        return false;
    };
}
export function Find$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): T {
    const __gotots_range_13 = slice;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_13.length; __gotots_range_index_10++) {
        const __gotots_range_value_23 = $go$from_container_storage$T0_to_T0(__gotots_range_13.get(__gotots_range_index_10));
        let value: T = __gotots_range_value_23;
        const __gotots_callee_15 = f;
        const __gotots_argument_25 = value;
        if ((__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25)) {
            return value;
        }
    }
    return $go$zero$void_to_T0();
}
export function FindLast$kernel<T>($go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): T {
    for (let i = $go$length$SliceOf_T0_to_int(slice) - 1; i >= 0; i--) {
        let value: T = $go$index$SliceOf_T0_int_to_T0(slice, i);
        const __gotots_callee_23 = f;
        const __gotots_argument_44 = value;
        if ((__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_44)) {
            return value;
        }
    }
    return $go$zero$void_to_T0();
}
export function FindIndex$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): int {
    const __gotots_range_12 = slice;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_12.length; __gotots_range_index_9++) {
        const __gotots_range_value_21 = __gotots_range_index_9;
        const __gotots_range_value_22 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_12.get(__gotots_range_index_9)));
        let i = __gotots_range_value_21;
        let value: T = __gotots_range_value_22;
        const __gotots_callee_14 = f;
        const __gotots_argument_24 = $go$copy$T0_to_T0(value);
        if ((__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24)) {
            return i;
        }
    }
    return -1;
}
export function FindLastIndex$kernel<T>($go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): int {
    for (let i = $go$length$SliceOf_T0_to_int(slice) - 1; i >= 0; i--) {
        let value: T = $go$index$SliceOf_T0_int_to_T0(slice, i);
        const __gotots_callee_25 = f;
        const __gotots_argument_46 = value;
        if ((__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_46)) {
            return i;
        }
    }
    return -1;
}
export function FirstOrNil$kernel<T>($go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>): T {
    if ($go$length$SliceOf_T0_to_int(slice) !== 0) {
        return $go$index$SliceOf_T0_int_to_T0(slice, 0);
    }
    return $go$zero$void_to_T0();
}
export function LastOrNil$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>): T {
    if ($go$length$SliceOf_T0_to_int(slice) !== 0) {
        return $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(slice, $go$length$SliceOf_T0_to_int(slice) - 1));
    }
    return $go$copy$T0_to_T0($go$zero$void_to_T0());
}
export function ElementOrNil$kernel<T>($go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, index: int): T {
    if (index < $go$length$SliceOf_T0_to_int(slice)) {
        return $go$index$SliceOf_T0_int_to_T0(slice, index);
    }
    return $go$zero$void_to_T0();
}
export function FirstOrNilSeq$kernel<T>($go$zero$void_to_T0: () => T, seq: iter__from_gostdlib.Seq<T>): T {
    if (!(named_iter.IterSeqValueOperations.$project(seq) === undefined)) {
        const __gotots_range_11 = named_iter.IterSeqValueOperations.$project(seq);
        if (__gotots_range_11 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        let __gotots_range_return_0: T = $go$zero$void_to_T0();
        __gotots_range_11(($argument0: T): bool => {
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
            const __gotots_range_value_20 = $argument0;
            let value: T = __gotots_range_value_20;
            __gotots_range_return_0 = value;
            __gotots_range_state_0 = 2;
            return false;
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_0 === 2) {
            return __gotots_range_return_0;
        }
        __gotots_range_state_0 = -2;
    }
    return $go$zero$void_to_T0();
}
export function FirstNonNil$kernel<T, U>($go$binary_not_equal$T1_T1_to_bool: ($0: U, $1: U) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$zero$void_to_T1: () => U, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => U) | undefined): U {
    const __gotots_range_20 = slice;
    for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_20.length; __gotots_range_index_15++) {
        const __gotots_range_value_32 = $go$from_container_storage$T0_to_T0(__gotots_range_20.get(__gotots_range_index_15));
        let value: T = __gotots_range_value_32;
        const __gotots_callee_26 = f;
        const __gotots_argument_47 = value;
        const __gotots_argument_48 = (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47);
        let mapped: U = __gotots_argument_48;
        if ($go$binary_not_equal$T1_T1_to_bool(mapped, $go$zero$void_to_T1())) {
            return mapped;
        }
    }
    return $go$zero$void_to_T1();
}
export function FirstNonZero$kernel<T>($go$binary_not_equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$zero$void_to_T0: () => T, values: RuntimeSlice<GoContainerStorage<T>>): T {
    let zero: T = $go$zero$void_to_T0();
    const __gotots_range_27 = values;
    for (let __gotots_range_index_22 = 0; __gotots_range_index_22 < __gotots_range_27.length; __gotots_range_index_22++) {
        const __gotots_range_value_40 = $go$from_container_storage$T0_to_T0(__gotots_range_27.get(__gotots_range_index_22));
        let value: T = __gotots_range_value_40;
        if ($go$binary_not_equal$T0_T0_to_bool(value, zero)) {
            return value;
        }
    }
    return zero;
}
export function Concatenate$kernel<T>($go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, s1: RuntimeSlice<GoContainerStorage<T>>, s2: RuntimeSlice<GoContainerStorage<T>>): RuntimeSlice<GoContainerStorage<T>> {
    if ($go$length$SliceOf_T0_to_int(s2) === 0) {
        return s1;
    }
    if ($go$length$SliceOf_T0_to_int(s1) === 0) {
        return s2;
    }
    return generic_slices_kernel.SlicesConcatKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, RuntimeSlice.literal<RuntimeSlice<GoContainerStorage<T>>>([s1, s2]));
}
export function Splice$kernel<T>($go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, s1: RuntimeSlice<GoContainerStorage<T>>, start: int, deleteCount: int, items: RuntimeSlice<GoContainerStorage<T>>): RuntimeSlice<GoContainerStorage<T>> {
    if (start < 0) {
        start = $go$length$SliceOf_T0_to_int(s1) + start;
    }
    if (start < 0) {
        start = 0;
    }
    if (start > $go$length$SliceOf_T0_to_int(s1)) {
        start = $go$length$SliceOf_T0_to_int(s1);
    }
    if (deleteCount < 0) {
        deleteCount = 0;
    }
    let end = globalThis.Math.min(start + globalThis.Math.max(deleteCount, 0), $go$length$SliceOf_T0_to_int(s1));
    if (start === end && $go$length$SliceOf_T0_to_int(items) === 0) {
        return s1;
    }
    return generic_slices_kernel.SlicesConcatKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, RuntimeSlice.literal<RuntimeSlice<GoContainerStorage<T>>>([s1.slice(0, start, null), items, s1.slice(end, null, null)]));
}
export function CountWhere$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, slice: RuntimeSlice<GoContainerStorage<T>>, f: (($0: T) => bool) | undefined): int {
    let count = 0;
    const __gotots_range_22 = slice;
    for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_22.length; __gotots_range_index_17++) {
        const __gotots_range_value_34 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_22.get(__gotots_range_index_17)));
        let value: T = __gotots_range_value_34;
        const __gotots_callee_28 = f;
        const __gotots_argument_51 = $go$copy$T0_to_T0(value);
        if ((__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_51)) {
            count++;
        }
    }
    return count;
}
export function ReplaceElement$kernel<T>($go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, slice: RuntimeSlice<GoContainerStorage<T>>, i: int, t: T): RuntimeSlice<GoContainerStorage<T>> {
    let result = generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, slice);
    result.set(i, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(t)));
    return result;
}
export function InsertSorted$kernel<T>($go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, element: T, cmp: (($0: T, $1: T) => int) | undefined): RuntimeSlice<GoContainerStorage<T>> {
    const __gotots_callee_9 = cmp;
    const __gotots_results_4 = generic_slices_kernel.SlicesBinarySearchFuncKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>, T>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, slice, $go$copy$T0_to_T0(element), __gotots_callee_9 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_9($providerArgument0, $providerArgument1)));
    });
    const __gotots_results_5 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_4[0])), __gotots_results_4[1]] satisfies [
        int,
        bool
    ];
    let i = __gotots_results_5[0];
    return generic_slices_kernel.SlicesInsertKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, $go$zero$void_to_T0, slice, BigInt.asIntN(64, goNumberToBigInt(i)), RuntimeSlice.literal<GoContainerStorage<T>>([$go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(element))]));
}
export function MinAllFunc$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, xs: RuntimeSlice<GoContainerStorage<T>>, cmp: (($0: T, $1: T) => int) | undefined): RuntimeSlice<GoContainerStorage<T>> {
    if ($go$length$SliceOf_T0_to_int(xs) === 0) {
        return RuntimeSlice.nil<GoContainerStorage<T>>();
    }
    let m: T = $go$index$SliceOf_T0_int_to_T0(xs, 0);
    let mins = RuntimeSlice.literal<GoContainerStorage<T>>([$go$to_container_storage$T0_to_T0(m)]);
    const __gotots_range_28 = xs.slice(1, null, null);
    for (let __gotots_range_index_23 = 0; __gotots_range_index_23 < __gotots_range_28.length; __gotots_range_index_23++) {
        const __gotots_range_value_41 = $go$from_container_storage$T0_to_T0(__gotots_range_28.get(__gotots_range_index_23));
        let x: T = __gotots_range_value_41;
        const __gotots_callee_34 = cmp;
        const __gotots_argument_63 = x;
        const __gotots_argument_64 = m;
        let c = (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63, __gotots_argument_64);
        __gotots_control_target_1: {
            if (c < 0) {
                m = x;
                mins = mins.slice(0, 0, null);
                const __gotots_slice_build_50 = mins;
                const __gotots_slice_build_52 = __gotots_slice_build_50.length + 1;
                let __gotots_slice_build_51 = __gotots_slice_build_50;
                if (__gotots_slice_build_52 <= __gotots_slice_build_50.capacity) {
                    __gotots_slice_build_51 = __gotots_slice_build_50.$withLength(__gotots_slice_build_52);
                    __gotots_slice_build_51.set(__gotots_slice_build_50.length + 0, $go$to_container_storage$T0_to_T0(x));
                }
                else {
                    __gotots_slice_build_51 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_52, RuntimeSlice.$grownCapacity(__gotots_slice_build_50.capacity, __gotots_slice_build_52));
                    for (let __gotots_slice_build_53 = 0; __gotots_slice_build_53 < __gotots_slice_build_50.length; __gotots_slice_build_53++) {
                        __gotots_slice_build_51.set(__gotots_slice_build_53, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_50.get(__gotots_slice_build_53))));
                    }
                    __gotots_slice_build_51.set(__gotots_slice_build_50.length + 0, $go$to_container_storage$T0_to_T0(x));
                    for (let __gotots_slice_build_53 = __gotots_slice_build_52; __gotots_slice_build_53 < __gotots_slice_build_51.capacity; __gotots_slice_build_53++) {
                        __gotots_slice_build_51.$initialize(__gotots_slice_build_53, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                    }
                }
                mins = __gotots_slice_build_51;
            }
            else if (c === 0) {
                const __gotots_slice_build_54 = mins;
                const __gotots_slice_build_56 = __gotots_slice_build_54.length + 1;
                let __gotots_slice_build_55 = __gotots_slice_build_54;
                if (__gotots_slice_build_56 <= __gotots_slice_build_54.capacity) {
                    __gotots_slice_build_55 = __gotots_slice_build_54.$withLength(__gotots_slice_build_56);
                    __gotots_slice_build_55.set(__gotots_slice_build_54.length + 0, $go$to_container_storage$T0_to_T0(x));
                }
                else {
                    __gotots_slice_build_55 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_56, RuntimeSlice.$grownCapacity(__gotots_slice_build_54.capacity, __gotots_slice_build_56));
                    for (let __gotots_slice_build_57 = 0; __gotots_slice_build_57 < __gotots_slice_build_54.length; __gotots_slice_build_57++) {
                        __gotots_slice_build_55.set(__gotots_slice_build_57, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_54.get(__gotots_slice_build_57))));
                    }
                    __gotots_slice_build_55.set(__gotots_slice_build_54.length + 0, $go$to_container_storage$T0_to_T0(x));
                    for (let __gotots_slice_build_57 = __gotots_slice_build_56; __gotots_slice_build_57 < __gotots_slice_build_55.capacity; __gotots_slice_build_57++) {
                        __gotots_slice_build_55.$initialize(__gotots_slice_build_57, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                    }
                }
                mins = __gotots_slice_build_55;
            }
        }
    }
    return mins;
}
export function AppendIfUnique$kernel<T>($go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, element: T): RuntimeSlice<GoContainerStorage<T>> {
    if (generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$equal$T0_T0_to_bool, $go$from_container_storage$T0_to_T0, slice, $go$copy$T0_to_T0(element))) {
        return slice;
    }
    const __gotots_slice_build_29 = slice;
    const __gotots_slice_build_31 = __gotots_slice_build_29.length + 1;
    let __gotots_slice_build_30 = __gotots_slice_build_29;
    if (__gotots_slice_build_31 <= __gotots_slice_build_29.capacity) {
        __gotots_slice_build_30 = __gotots_slice_build_29.$withLength(__gotots_slice_build_31);
        __gotots_slice_build_30.set(__gotots_slice_build_29.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(element)));
    }
    else {
        __gotots_slice_build_30 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_31, RuntimeSlice.$grownCapacity(__gotots_slice_build_29.capacity, __gotots_slice_build_31));
        for (let __gotots_slice_build_32 = 0; __gotots_slice_build_32 < __gotots_slice_build_29.length; __gotots_slice_build_32++) {
            __gotots_slice_build_30.set(__gotots_slice_build_32, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_29.get(__gotots_slice_build_32)))));
        }
        __gotots_slice_build_30.set(__gotots_slice_build_29.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(element)));
        for (let __gotots_slice_build_32 = __gotots_slice_build_31; __gotots_slice_build_32 < __gotots_slice_build_30.capacity; __gotots_slice_build_32++) {
            __gotots_slice_build_30.$initialize(__gotots_slice_build_32, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
        }
    }
    return __gotots_slice_build_30;
}
export function Memoize$kernel<T>($go$zero$void_to_T0: () => T, create: (() => T) | undefined): (() => T) | undefined {
    let value: T = $go$zero$void_to_T0();
    return (): T => {
        if (!(create === undefined)) {
            const __gotots_callee_3 = create;
            const __gotots_argument_6 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
            value = __gotots_argument_6;
            create = void 0;
        }
        return value;
    };
}
export function IfElse$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, b: bool, whenTrue: T, whenFalse: T): T {
    if (b) {
        return $go$copy$T0_to_T0(whenTrue);
    }
    return $go$copy$T0_to_T0(whenFalse);
}
export function OrElse$kernel<T>($go$binary_not_equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$zero$void_to_T0: () => T, value: T, defaultValue: T): T {
    if ($go$binary_not_equal$T0_T0_to_bool(value, $go$zero$void_to_T0())) {
        return value;
    }
    return defaultValue;
}
export function Coalesce$kernel<T, U>($go$nil_equal$T0_to_bool: ($0: T) => bool, a: T, b: T): T {
    if ($go$nil_equal$T0_to_bool(a)) {
        return b;
    }
    else {
        return a;
    }
}
export class ECMALineStarts {
    declare private readonly $goType: void;
    constructor(public readonly $value: RuntimeSlice<TextPos>) {
    }
    declare private readonly then?: never;
}
export function ComputeECMALineStarts(text: gostring): ECMALineStarts {
    let result = RuntimeSlice.make<TextPos>(0, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(text, "\n"))) + 1, 0);
    return new ECMALineStarts(AppendSeq$SliceOf_Named_core$TextPos$Named_core$TextPos(result, ComputeECMALineStartsSeq(text)));
}
export function ComputeECMALineStartsSeq(text: gostring): iter__from_gostdlib.Seq<TextPos> {
    return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: TextPos) => bool) | undefined): void => {
        let textLen = text.length | 0;
        let pos = 0;
        let lineStart = 0;
        for (; pos < textLen;) {
            let b = goStringIndex(text, pos);
            if (b < RuneSelf$uint8__from_utf8) {
                pos = pos + 1;
                {
                    const __gotots_switch_tag_0 = b;
                    let __gotots_switch_selection_0 = -1;
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_0 = false;
                        if (!__gotots_switch_match_0) {
                            __gotots_switch_match_0 = __gotots_switch_tag_0 === 13;
                        }
                        if (__gotots_switch_match_0) {
                            __gotots_switch_selection_0 = 0;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_1 = false;
                        if (!__gotots_switch_match_1) {
                            __gotots_switch_match_1 = __gotots_switch_tag_0 === 10;
                        }
                        if (__gotots_switch_match_1) {
                            __gotots_switch_selection_0 = 1;
                        }
                    }
                    __gotots_control_target_0: {
                        if (__gotots_switch_selection_0 === 0) {
                            if (pos < textLen && goStringIndex(text, pos) === 10) {
                                pos = pos + 1;
                            }
                            __gotots_switch_selection_0 = 1;
                        }
                        if (__gotots_switch_selection_0 === 1) {
                            const __gotots_callee_16 = __go_yield;
                            const __gotots_argument_26 = lineStart;
                            if (!(__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26)) {
                                return;
                            }
                            lineStart = pos;
                            break __gotots_control_target_0;
                        }
                    }
                }
            }
            else {
                const __gotots_results_10 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(text, pos));
                const __gotots_results_11 = [__gotots_results_10[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_10[1]))] satisfies [
                    int32,
                    int
                ];
                let ch = __gotots_results_11[0];
                let size = __gotots_results_11[1];
                pos = pos + (size | 0);
                if (IsLineBreak__from_stringutil(ch)) {
                    const __gotots_callee_17 = __go_yield;
                    const __gotots_argument_27 = lineStart;
                    if (!(__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27)) {
                        return;
                    }
                    lineStart = pos;
                }
            }
        }
        const __gotots_callee_18 = __go_yield;
        const __gotots_argument_28 = lineStart;
        (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28);
    });
}
export class UTF16Offset {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function UTF16Len(s: gostring): UTF16Offset {
    const __gotots_range_2 = s.length;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2; __gotots_range_index_2++) {
        const __gotots_range_value_4 = __gotots_range_index_2;
        let i = __gotots_range_value_4;
        if (goStringIndex(s, i) >= RuneSelf$uint8__from_utf8) {
            let n = new UTF16Offset(i);
            const __gotots_range_3 = goStringSlice(s, i);
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length;) {
                const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_3, __gotots_range_index_3);
                const __gotots_range_value_5 = __gotots_range_decode_0[0];
                let r = __gotots_range_value_5;
                __gotots_range_index_3 += __gotots_range_decode_0[1];
                n = new UTF16Offset(n.$value +
                    ((void UTF16Offset,
                        globalThis.Number(BigInt.asIntN(64, utf16__from_gostdlib.RuneLen(r)))) as int));
            }
            return n;
        }
    }
    return new UTF16Offset(s.length);
}
export function Flatten$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, array: RuntimeSlice<RuntimeSlice<GoContainerStorage<T>>>): RuntimeSlice<GoContainerStorage<T>> {
    let result = RuntimeSlice.nil<GoContainerStorage<T>>();
    const __gotots_range_9 = array;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
        const __gotots_range_value_18 = __gotots_range_9.get(__gotots_range_index_7);
        let subArray = __gotots_range_value_18;
        const __gotots_slice_build_13 = result;
        const __gotots_slice_build_14 = subArray;
        let __gotots_slice_build_15 = __gotots_slice_build_14;
        if (__gotots_slice_build_14.length > 0) {
            __gotots_slice_build_15 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_14.length, null);
            for (let __gotots_slice_build_18 = 0; __gotots_slice_build_18 < __gotots_slice_build_14.length; __gotots_slice_build_18++) {
                __gotots_slice_build_15.set(__gotots_slice_build_18, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_14.get(__gotots_slice_build_18))));
            }
        }
        const __gotots_slice_build_17 = __gotots_slice_build_13.length + __gotots_slice_build_15.length;
        let __gotots_slice_build_16 = __gotots_slice_build_13;
        if (__gotots_slice_build_17 <= __gotots_slice_build_13.capacity) {
            __gotots_slice_build_16 = __gotots_slice_build_13.$withLength(__gotots_slice_build_17);
            for (let __gotots_slice_build_18 = 0; __gotots_slice_build_18 < __gotots_slice_build_15.length; __gotots_slice_build_18++) {
                __gotots_slice_build_16.set(__gotots_slice_build_13.length + __gotots_slice_build_18, __gotots_slice_build_15.get(__gotots_slice_build_18));
            }
        }
        else {
            __gotots_slice_build_16 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_17, RuntimeSlice.$grownCapacity(__gotots_slice_build_13.capacity, __gotots_slice_build_17));
            for (let __gotots_slice_build_18 = 0; __gotots_slice_build_18 < __gotots_slice_build_13.length; __gotots_slice_build_18++) {
                __gotots_slice_build_16.set(__gotots_slice_build_18, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_13.get(__gotots_slice_build_18))));
            }
            for (let __gotots_slice_build_18 = 0; __gotots_slice_build_18 < __gotots_slice_build_15.length; __gotots_slice_build_18++) {
                __gotots_slice_build_16.set(__gotots_slice_build_13.length + __gotots_slice_build_18, __gotots_slice_build_15.get(__gotots_slice_build_18));
            }
            for (let __gotots_slice_build_18 = __gotots_slice_build_17; __gotots_slice_build_18 < __gotots_slice_build_16.capacity; __gotots_slice_build_18++) {
                __gotots_slice_build_16.$initialize(__gotots_slice_build_18, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
        }
        result = __gotots_slice_build_16;
    }
    return result;
}
export function Must$kernel<T>(v: T, err: GoInterface | undefined): T {
    if (!(err === undefined)) {
        const __gotots_argument_0 = err;
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    return v;
}
export function FirstResult$kernel<T1>(t1: T1, $1: RuntimeSlice<$goInterface$Interface_void | undefined>): T1 {
    return t1;
}
export function StringifyJson(input: $goInterface$Interface_void | undefined, prefix: gostring, indent: gostring): [
    gostring,
    GoInterface | undefined
] {
    const __gotots_results_6 = MarshalIndent__from_json__package_1(input, prefix, indent);
    let output = __gotots_results_6[0];
    let err: GoInterface | undefined = __gotots_results_6[1];
    const __gotots_conversion_0 = output;
    let __gotots_conversion_1 = "";
    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
        __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
    }
    const __gotots_results_7 = __gotots_conversion_1;
    const __gotots_results_8 = err;
    return [__gotots_results_7, __gotots_results_8];
}
export function GetScriptKindFromFileName(fileName: gostring): ScriptKind {
    let dotPos = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(fileName, ".")));
    if (dotPos >= 0) {
        switch (strings__from_gostdlib.ToLower(goStringSlice(fileName, dotPos))) {
            case ExtensionJs$string__from_tspath:
            case ExtensionCjs$string__from_tspath:
            case ExtensionMjs$string__from_tspath: {
                return ScriptKindJS$constant();
                break;
            }
            case ExtensionJsx$string__from_tspath: {
                return ScriptKindJSX$constant();
                break;
            }
            case ExtensionTs$string__from_tspath:
            case ExtensionCts$string__from_tspath:
            case ExtensionMts$string__from_tspath: {
                return ScriptKindTS$constant();
                break;
            }
            case ExtensionTsx$string__from_tspath: {
                return ScriptKindTSX$constant();
                break;
            }
            case ExtensionJson$string__from_tspath: {
                return ScriptKindJSON$constant();
                break;
            }
        }
    }
    return ScriptKindUnknown$constant();
}
export function GetSpellingSuggestion$kernel<T>($go$zero$void_to_T0: () => T, name: gostring, candidates: iter__from_gostdlib.Seq<T>, getName: (($0: T) => gostring) | undefined, compare: (($0: T, $1: T) => int) | undefined): T {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: T = $go$zero$void_to_T0();
    try {
        try {
            __gotots_return_block_0: {
                const __gotots_conversion_3 = name;
                let __gotots_conversion_4 = RuntimeSlice.make<int32>(0, __gotots_conversion_3.length, 0);
                let __gotots_conversion_5 = 0;
                while (__gotots_conversion_5 < __gotots_conversion_3.length) {
                    const __gotots_conversion_6 = goStringDecodeRune(__gotots_conversion_3, __gotots_conversion_5);
                    __gotots_conversion_4 = __gotots_conversion_4.append(0, [__gotots_conversion_6[0]]);
                    __gotots_conversion_5 += __gotots_conversion_6[1];
                }
                let runeName = __gotots_conversion_4;
                let maximumLengthDifference = globalThis.Math.max(2, globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(runeName.length * 0.34))));
                let bestDistance = math__from_gostdlib.Floor(runeName.length * 0.4) + 0.9;
                let buffers: {
                    value: levenshteinBuffers;
                } | undefined = (($value: $goInterface$Interface_void | undefined): {
                    value: levenshteinBuffers;
                } | undefined => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(sync__from_gostdlib.Pool.Get($state.levenshteinBuffersPool));
                const __gotots_receiver_0 = $state.levenshteinBuffersPool;
                const __gotots_argument_37 = new GoInterfaceAdapter(buffers);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    recovery_sync.SyncPoolPut(__gotots_receiver_0, __gotots_argument_37, $go$recovery);
                };
                let bestCandidate: T = $go$zero$void_to_T0();
                let hasBest = false;
                const __gotots_range_15 = named_iter.IterSeqValueOperations.$project(candidates);
                if (__gotots_range_15 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_1 = 1;
                __gotots_range_15(($argument0: T): bool => {
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
                    const __gotots_range_value_26 = $argument0;
                    let candidate: T = __gotots_range_value_26;
                    const __gotots_callee_21 = getName;
                    const __gotots_argument_38 = candidate;
                    let candidateName = (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_38);
                    let maxLen = globalThis.Math.max(candidateName.length, runeName.length);
                    let minLen = globalThis.Math.min(candidateName.length, runeName.length);
                    if (candidateName !== "" && maxLen - minLen <= maximumLengthDifference) {
                        if (candidateName === name) {
                            __gotots_range_state_1 = 1;
                            return true;
                        }
                        if (candidateName.length < 3 && !strings__from_gostdlib.EqualFold(candidateName, name)) {
                            __gotots_range_state_1 = 1;
                            return true;
                        }
                        const __gotots_argument_39 = buffers;
                        const __gotots_argument_40 = runeName;
                        const __gotots_conversion_7 = candidateName;
                        let __gotots_conversion_8 = RuntimeSlice.make<int32>(0, __gotots_conversion_7.length, 0);
                        let __gotots_conversion_9 = 0;
                        while (__gotots_conversion_9 < __gotots_conversion_7.length) {
                            const __gotots_conversion_10 = goStringDecodeRune(__gotots_conversion_7, __gotots_conversion_9);
                            __gotots_conversion_8 = __gotots_conversion_8.append(0, [__gotots_conversion_10[0]]);
                            __gotots_conversion_9 += __gotots_conversion_10[1];
                        }
                        const __gotots_argument_41 = __gotots_conversion_8;
                        const __gotots_argument_42 = bestDistance;
                        let distance = levenshteinWithMax(__gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42);
                        if (distance < 0) {
                            __gotots_range_state_1 = 1;
                            return true;
                        }
                        Assert__from_debug(distance <= bestDistance, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                        if (distance < bestDistance) {
                            bestDistance = distance;
                            bestCandidate = candidate;
                            hasBest = true;
                        }
                        else {
                            let __gotots_logical_result_1 = !hasBest;
                            if (!__gotots_logical_result_1) {
                                const __gotots_callee_22 = compare;
                                const __gotots_argument_43 = candidate;
                                const __gotots_argument_44 = bestCandidate;
                                const __gotots_binary_operand_0 = (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_43, __gotots_argument_44);
                                const __gotots_binary_operand_1 = 0;
                                __gotots_logical_result_1 = __gotots_binary_operand_0 < __gotots_binary_operand_1;
                            }
                            if (__gotots_logical_result_1) {
                                bestCandidate = candidate;
                                hasBest = true;
                            }
                        }
                    }
                    __gotots_range_state_1 = 1;
                    return true;
                });
                if (__gotots_range_state_1 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_1 = -2;
                __gotots_return_0 = bestCandidate;
                break __gotots_return_block_0;
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
    return __gotots_return_0;
}
export function GetSpellingSuggestionForStrings(name: gostring, candidates: iter__from_gostdlib.Seq<gostring>): gostring {
    const __gotots_argument_33 = name;
    const __gotots_argument_34 = candidates;
    const __gotots_argument_35 = ($argument0: gostring): gostring => {
        return Identity$string($argument0);
    };
    const __gotots_callee_20 = strings__from_gostdlib.Compare;
    const __gotots_argument_36 = __gotots_callee_20 === undefined ? undefined : ($argument0: gostring, $argument1: gostring): int => {
        return globalThis.Number(BigInt.asIntN(64, __gotots_callee_20($argument0, $argument1)));
    };
    return GetSpellingSuggestion$string(__gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36);
}
export class levenshteinBuffers {
    declare private readonly $goType: void;
    public constructor(public previous: RuntimeSlice<float64>, public current: RuntimeSlice<float64>) {
    }
    static $copy($source: levenshteinBuffers): levenshteinBuffers {
        return new levenshteinBuffers($source.previous, $source.current);
    }
    declare private readonly then?: never;
}
export function levenshteinWithMax(buffers: {
    value: levenshteinBuffers;
} | undefined, s1: RuntimeSlice<int32>, s2: RuntimeSlice<int32>, maxValue: float64): float64 {
    let bufferSize = s2.length + 1;
    (buffers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.previous = Grow$SliceOf_float64$float64((buffers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.previous.slice(0, 0, null), bufferSize).slice(0, bufferSize, null);
    (buffers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.current = Grow$SliceOf_float64$float64((buffers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.current.slice(0, 0, null), bufferSize).slice(0, bufferSize, null);
    let previous = (buffers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.previous;
    let current = (buffers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.current;
    let big = maxValue + 0.01;
    const __gotots_range_17 = previous;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_17.length; __gotots_range_index_13++) {
        const __gotots_range_value_29 = __gotots_range_index_13;
        let i = __gotots_range_value_29;
        previous.set(i, i);
    }
    for (let i = 1; i <= s1.length; i++) {
        let c1 = s1.get(i - 1);
        let minJ = globalThis.Math.max(globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(math__from_gostdlib.Ceil(i - maxValue)))), 1);
        let maxJ = globalThis.Math.min(globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(math__from_gostdlib.Floor(maxValue + i)))), s2.length);
        let colMin = i;
        current.set(0, colMin);
        for (let j = 1; j < minJ; j++) {
            current.set(j, big);
        }
        for (let j = minJ; j <= maxJ; j++) {
            let substitutionDistance = 0, dist = 0;
            if (unicode__from_gostdlib.ToLower(s1.get(i - 1)) === unicode__from_gostdlib.ToLower(s2.get(j - 1))) {
                substitutionDistance = previous.get(j - 1) + 0.1;
            }
            else {
                substitutionDistance = previous.get(j - 1) + 2;
            }
            if (c1 === s2.get(j - 1)) {
                dist = previous.get(j - 1);
            }
            else {
                dist = math__from_gostdlib.Min(previous.get(j) + 1, math__from_gostdlib.Min(current.get(j - 1) + 1, substitutionDistance));
            }
            current.set(j, dist);
            colMin = math__from_gostdlib.Min(colMin, dist);
        }
        for (let j = maxJ + 1; j <= s2.length; j++) {
            current.set(j, big);
        }
        if (colMin > maxValue) {
            return -1;
        }
        const __gotots_assign_0 = current;
        const __gotots_assign_1 = previous;
        previous = __gotots_assign_0;
        current = __gotots_assign_1;
    }
    let res = previous.get(s2.length);
    if (res > maxValue) {
        return -1;
    }
    return res;
}
export function Identity$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, t: T): T {
    return $go$copy$T0_to_T0(t);
}
export function CheckEachDefined<S>(s: RuntimeSlice<tsonicTypeScriptRuntime.Location<S> | undefined>, msg: gostring): RuntimeSlice<tsonicTypeScriptRuntime.Location<S> | undefined> {
    const __gotots_range_26 = s;
    for (let __gotots_range_index_21 = 0; __gotots_range_index_21 < __gotots_range_26.length; __gotots_range_index_21++) {
        const __gotots_range_value_39 = __gotots_range_26.get(__gotots_range_index_21);
        let value: tsonicTypeScriptRuntime.Location<S> | undefined = __gotots_range_value_39;
        if (value === undefined) {
            const __gotots_argument_62 = new $goInterfaceAdapter$string(msg);
            GoPanic.raise(__gotots_argument_62 === undefined ? GoPanicNilValue.create() : __gotots_argument_62);
        }
    }
    return s;
}
export function IndexAfter(s: gostring, pattern: gostring, startIndex: int): int {
    let matched = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(s, startIndex), pattern)));
    if (matched === -1) {
        return -1;
    }
    else {
        return matched + startIndex;
    }
}
export function ShouldRewriteModuleSpecifier(specifier: gostring, compilerOptions: {
    value: CompilerOptions;
} | undefined): bool {
    return Tristate_IsTrue((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RewriteRelativeImportExtensions) && PathIsRelative__from_tspath(specifier) && !IsDeclarationFileName__from_tspath(specifier) && HasTSFileExtension__from_tspath(specifier);
}
export function SingleElementSlice<T>(element: tsonicTypeScriptRuntime.Location<T> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<T> | undefined> {
    if (element === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<T> | undefined>();
    }
    return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<T> | undefined>([element]);
}
export function ConcatenateSeq$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, seqs: RuntimeSlice<iter__from_gostdlib.Seq<T>>): iter__from_gostdlib.Seq<T> {
    return named_iter.IterSeqValueOperations.$wrap((__go_yield: (($0: T) => bool) | undefined): void => {
        const __gotots_range_18 = seqs;
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_18.length; __gotots_range_index_14++) {
            const __gotots_range_value_30 = __gotots_range_18.get(__gotots_range_index_14);
            let seq: iter__from_gostdlib.Seq<T> = __gotots_range_value_30;
            if (named_iter.IterSeqValueOperations.$project(seq) === undefined) {
                continue;
            }
            const __gotots_range_19 = named_iter.IterSeqValueOperations.$project(seq);
            if (__gotots_range_19 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_2 = 1;
            __gotots_range_19(($argument0: T): bool => {
                if (__gotots_range_state_2 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_2 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_2 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_2 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_2 = -1;
                const __gotots_range_value_31 = $go$copy$T0_to_T0($argument0);
                let e: T = __gotots_range_value_31;
                const __gotots_callee_24 = __go_yield;
                const __gotots_argument_45 = $go$copy$T0_to_T0(e);
                if (!(__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45)) {
                    __gotots_range_state_2 = 2;
                    return false;
                }
                __gotots_range_state_2 = 1;
                return true;
            });
            if (__gotots_range_state_2 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            if (__gotots_range_state_2 === 2) {
                return;
            }
            __gotots_range_state_2 = -2;
        }
    });
}
export function Enumerate$kernel<T>(seq: iter__from_gostdlib.Seq<T>): iter__from_gostdlib.Seq2<int, T> {
    return named_iter.IterSeq2ValueOperations.$wrap((__go_yield: (($0: int, $1: T) => bool) | undefined): void => {
        let i = 0;
        const __gotots_range_32 = named_iter.IterSeqValueOperations.$project(seq);
        if (__gotots_range_32 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_3 = 1;
        __gotots_range_32(($argument0: T): bool => {
            if (__gotots_range_state_3 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_3 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_3 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_3 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_3 = -1;
            const __gotots_range_value_45 = $argument0;
            let v: T = __gotots_range_value_45;
            const __gotots_callee_37 = __go_yield;
            const __gotots_argument_68 = i;
            const __gotots_argument_69 = v;
            if (!(__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_68, __gotots_argument_69)) {
                __gotots_range_state_3 = 2;
                return false;
            }
            i++;
            __gotots_range_state_3 = 1;
            return true;
        });
        if (__gotots_range_state_3 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_3 === 2) {
            return;
        }
        __gotots_range_state_3 = -2;
    });
}
export function comparableValuesEqual$kernel<T>($go$binary_equal$T0_T0_to_bool: ($0: T, $1: T) => bool, a: T, b: T): bool {
    return $go$binary_equal$T0_T0_to_bool(a, b);
}
export function DiffMaps$kernel<K, V>($go$binary_equal$T1_T1_to_bool: ($0: V, $1: V) => bool, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$T1_to_T1: ($0: V) => V, m1: GoMapValue<K, V>, m2: GoMapValue<K, V>, onAdded: (($0: K, $1: V) => void) | undefined, onRemoved: (($0: K, $1: V) => void) | undefined, onChanged: (($0: K, $1: V, $2: V) => void) | undefined): void {
    DiffMapsFunc$kernel<K, V, V>($go$copy$T1_to_T1, $go$copy$T0_to_T0, $go$copy$T1_to_T1, m1, m2, ($argument0: V, $argument1: V): bool => {
        return comparableValuesEqual$kernel<V>($go$binary_equal$T1_T1_to_bool, $argument0, $argument1);
    }, onAdded, onRemoved, onChanged);
}
export function DiffMapsFunc$kernel<K, V1, V2>($go$copy$T2_to_T2: ($0: V2) => V2, $go$copy$T0_to_T0: ($0: K) => K, $go$copy$T1_to_T1: ($0: V1) => V1, m1: GoMapValue<K, V1>, m2: GoMapValue<K, V2>, equalValues: (($0: V1, $1: V2) => bool) | undefined, onAdded: (($0: K, $1: V2) => void) | undefined, onRemoved: (($0: K, $1: V1) => void) | undefined, onChanged: (($0: K, $1: V1, $2: V2) => void) | undefined): void {
    if (!(onAdded === undefined)) {
        const __gotots_range_5 = m2;
        const __gotots_range_keys_0 = __gotots_range_5.keys();
        for (const __gotots_range_value_7 of __gotots_range_keys_0) {
            const __gotots_range_value_8 = __gotots_range_5.lookupOk(__gotots_range_value_7);
            if (!__gotots_range_value_8[1]) {
                continue;
            }
            const __gotots_range_value_9 = $go$copy$T0_to_T0(__gotots_range_value_7);
            const __gotots_range_value_10 = __gotots_range_value_8[0];
            let k: K = __gotots_range_value_9;
            let v2: V2 = __gotots_range_value_10;
            {
                const __gotots_results_2 = m1.lookupOk(k);
                let ok = __gotots_results_2[1];
                if (!ok) {
                    const __gotots_callee_5 = onAdded;
                    const __gotots_argument_8 = $go$copy$T0_to_T0(k);
                    const __gotots_argument_9 = $go$copy$T2_to_T2(v2);
                    (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
                }
            }
        }
    }
    if (onChanged === undefined && onRemoved === undefined) {
        return;
    }
    const __gotots_range_6 = m1;
    const __gotots_range_keys_1 = __gotots_range_6.keys();
    for (const __gotots_range_value_11 of __gotots_range_keys_1) {
        const __gotots_range_value_12 = __gotots_range_6.lookupOk(__gotots_range_value_11);
        if (!__gotots_range_value_12[1]) {
            continue;
        }
        const __gotots_range_value_13 = $go$copy$T0_to_T0(__gotots_range_value_11);
        const __gotots_range_value_14 = __gotots_range_value_12[0];
        let k: K = __gotots_range_value_13;
        let v1: V1 = __gotots_range_value_14;
        {
            const __gotots_results_3 = m2.lookupOk(k);
            let v2: V2 = $go$copy$T2_to_T2(__gotots_results_3[0]);
            let ok = __gotots_results_3[1];
            if (ok) {
                let __gotots_logical_result_0 = !(onChanged === undefined);
                if (__gotots_logical_result_0) {
                    const __gotots_callee_6 = equalValues;
                    const __gotots_argument_10 = $go$copy$T1_to_T1(v1);
                    const __gotots_argument_11 = $go$copy$T2_to_T2(v2);
                    __gotots_logical_result_0 = !(__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11);
                }
                if (__gotots_logical_result_0) {
                    const __gotots_callee_7 = onChanged;
                    const __gotots_argument_12 = $go$copy$T0_to_T0(k);
                    const __gotots_argument_13 = $go$copy$T1_to_T1(v1);
                    const __gotots_argument_14 = $go$copy$T2_to_T2(v2);
                    (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14);
                }
            }
            else {
                const __gotots_callee_8 = onRemoved;
                const __gotots_argument_15 = $go$copy$T0_to_T0(k);
                const __gotots_argument_16 = $go$copy$T1_to_T1(v1);
                (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15, __gotots_argument_16);
            }
        }
    }
}
export function CopyMapInto$kernel<M1, M2, K, V>($go$convert$T1_to_MapOf_T2_To_T3: ($0: M2) => GoMapValue<K, V>, $go$convert$MapOf_T2_To_T3_to_T1: ($0: GoMapValue<K, V>) => M2, $go$convert$T0_to_MapOf_T2_To_T3: ($0: M1) => GoMapValue<K, V>, $go$copy$T2_to_T2: ($0: K) => K, $go$copy$T3_to_T3: ($0: V) => V, $go$map_construct$T3_to_MapOf_T2_To_T3: ($0: V) => GoMapValue<K, V>, $go$nil_equal$T0_to_bool: ($0: M1) => bool, $go$zero$void_to_T3: () => V, dst: M1, src: M2): GoMapValue<K, V> {
    if ($go$nil_equal$T0_to_bool(dst)) {
        return $go$convert$T1_to_MapOf_T2_To_T3(generic_maps_kernel.MapsCloneKernel<M2, K, V>($go$convert$MapOf_T2_To_T3_to_T1, $go$convert$T1_to_MapOf_T2_To_T3, $go$copy$T2_to_T2, $go$copy$T3_to_T3, $go$map_construct$T3_to_MapOf_T2_To_T3, $go$zero$void_to_T3, src));
    }
    generic_maps_kernel.MapsCopyKernel<M1, M2, K, V>($go$convert$T0_to_MapOf_T2_To_T3, $go$convert$T1_to_MapOf_T2_To_T3, $go$copy$T2_to_T2, $go$copy$T3_to_T3, dst, src);
    return $go$convert$T0_to_MapOf_T2_To_T3(dst);
}
export function UnorderedEqual$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$map_construct$int_to_MapOf_T0_To_int: ($0: int) => GoMapValue<T, int>, s1: RuntimeSlice<GoContainerStorage<T>>, s2: RuntimeSlice<GoContainerStorage<T>>): bool {
    if ($go$length$SliceOf_T0_to_int(s1) !== $go$length$SliceOf_T0_to_int(s2)) {
        return false;
    }
    let counts: GoMapValue<T, int> = $go$map_construct$int_to_MapOf_T0_To_int(0);
    const __gotots_range_29 = s1;
    for (let __gotots_range_index_24 = 0; __gotots_range_index_24 < __gotots_range_29.length; __gotots_range_index_24++) {
        const __gotots_range_value_42 = $go$from_container_storage$T0_to_T0(__gotots_range_29.get(__gotots_range_index_24));
        let v: T = __gotots_range_value_42;
        const __gotots_store_8 = counts;
        const __gotots_store_9 = v;
        __gotots_store_8.store(__gotots_store_9, __gotots_store_8.lookup(__gotots_store_9) + 1);
    }
    const __gotots_range_30 = s2;
    for (let __gotots_range_index_25 = 0; __gotots_range_index_25 < __gotots_range_30.length; __gotots_range_index_25++) {
        const __gotots_range_value_43 = $go$from_container_storage$T0_to_T0(__gotots_range_30.get(__gotots_range_index_25));
        let v: T = __gotots_range_value_43;
        const __gotots_store_10 = counts;
        const __gotots_store_11 = v;
        __gotots_store_10.store(__gotots_store_11, __gotots_store_10.lookup(__gotots_store_11) - 1);
        if (counts.lookup(v) < 0) {
            return false;
        }
    }
    return true;
}
export function Deduplicate$kernel<T>($go$convert$SliceOf_T0_to_SliceOf_T0: ($0: RuntimeSlice<GoContainerStorage<T>>) => RuntimeSlice<GoContainerStorage<T>>, $go$copy$T0_to_T0: ($0: T) => T, $go$equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>): RuntimeSlice<GoContainerStorage<T>> {
    if ($go$length$SliceOf_T0_to_int(slice) > 1) {
        const __gotots_range_16 = slice;
        for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_16.length; __gotots_range_index_12++) {
            const __gotots_range_value_27 = __gotots_range_index_12;
            const __gotots_range_value_28 = $go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_range_16.get(__gotots_range_index_12)));
            let i = __gotots_range_value_27;
            let value: T = __gotots_range_value_28;
            if (generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$equal$T0_T0_to_bool, $go$from_container_storage$T0_to_T0, slice.slice(0, i, null), $go$copy$T0_to_T0(value))) {
                let result = generic_slices_kernel.SlicesCloneKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$from_container_storage$T0_to_T0, $go$to_container_storage$T0_to_T0, slice.slice(0, i, null));
                for (i++; i < $go$length$SliceOf_T0_to_int(slice); i++) {
                    value = $go$copy$T0_to_T0($go$index$SliceOf_T0_int_to_T0(slice, i));
                    if (!generic_slices_kernel.SlicesContainsKernel<RuntimeSlice<GoContainerStorage<T>>, T, GoContainerStorage<T>>($go$convert$SliceOf_T0_to_SliceOf_T0, $go$copy$T0_to_T0, $go$equal$T0_T0_to_bool, $go$from_container_storage$T0_to_T0, result, $go$copy$T0_to_T0(value))) {
                        const __gotots_slice_build_25 = result;
                        const __gotots_slice_build_27 = __gotots_slice_build_25.length + 1;
                        let __gotots_slice_build_26 = __gotots_slice_build_25;
                        if (__gotots_slice_build_27 <= __gotots_slice_build_25.capacity) {
                            __gotots_slice_build_26 = __gotots_slice_build_25.$withLength(__gotots_slice_build_27);
                            __gotots_slice_build_26.set(__gotots_slice_build_25.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(value)));
                        }
                        else {
                            __gotots_slice_build_26 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_27, RuntimeSlice.$grownCapacity(__gotots_slice_build_25.capacity, __gotots_slice_build_27));
                            for (let __gotots_slice_build_28 = 0; __gotots_slice_build_28 < __gotots_slice_build_25.length; __gotots_slice_build_28++) {
                                __gotots_slice_build_26.set(__gotots_slice_build_28, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_25.get(__gotots_slice_build_28)))));
                            }
                            __gotots_slice_build_26.set(__gotots_slice_build_25.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(value)));
                            for (let __gotots_slice_build_28 = __gotots_slice_build_27; __gotots_slice_build_28 < __gotots_slice_build_26.capacity; __gotots_slice_build_28++) {
                                __gotots_slice_build_26.$initialize(__gotots_slice_build_28, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                            }
                        }
                        result = __gotots_slice_build_26;
                    }
                }
                return result;
            }
        }
    }
    return slice;
}
export function DeduplicateSorted$kernel<T>($go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, slice: RuntimeSlice<GoContainerStorage<T>>, isEqual: (($0: T, $1: T) => bool) | undefined): RuntimeSlice<GoContainerStorage<T>> {
    if ($go$length$SliceOf_T0_to_int(slice) === 0) {
        return slice;
    }
    let last: T = $go$index$SliceOf_T0_int_to_T0(slice, 0);
    let deduplicated = slice.slice(0, 1, null);
    for (let i = 1; i < $go$length$SliceOf_T0_to_int(slice); i++) {
        let next: T = $go$index$SliceOf_T0_int_to_T0(slice, i);
        const __gotots_callee_36 = isEqual;
        const __gotots_argument_66 = last;
        const __gotots_argument_67 = next;
        if ((__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_66, __gotots_argument_67)) {
            continue;
        }
        const __gotots_slice_build_58 = deduplicated;
        const __gotots_slice_build_60 = __gotots_slice_build_58.length + 1;
        let __gotots_slice_build_59 = __gotots_slice_build_58;
        if (__gotots_slice_build_60 <= __gotots_slice_build_58.capacity) {
            __gotots_slice_build_59 = __gotots_slice_build_58.$withLength(__gotots_slice_build_60);
            __gotots_slice_build_59.set(__gotots_slice_build_58.length + 0, $go$to_container_storage$T0_to_T0(next));
        }
        else {
            __gotots_slice_build_59 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_60, RuntimeSlice.$grownCapacity(__gotots_slice_build_58.capacity, __gotots_slice_build_60));
            for (let __gotots_slice_build_61 = 0; __gotots_slice_build_61 < __gotots_slice_build_58.length; __gotots_slice_build_61++) {
                __gotots_slice_build_59.set(__gotots_slice_build_61, $go$to_container_storage$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_58.get(__gotots_slice_build_61))));
            }
            __gotots_slice_build_59.set(__gotots_slice_build_58.length + 0, $go$to_container_storage$T0_to_T0(next));
            for (let __gotots_slice_build_61 = __gotots_slice_build_60; __gotots_slice_build_61 < __gotots_slice_build_59.capacity; __gotots_slice_build_61++) {
                __gotots_slice_build_59.$initialize(__gotots_slice_build_61, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
            }
        }
        deduplicated = __gotots_slice_build_59;
        last = next;
    }
    return deduplicated;
}
export function CompareBooleans(a: bool, b: bool): int {
    if (a && !b) {
        return 1;
    }
    else if (!a && b) {
        return -1;
    }
    return 0;
}
