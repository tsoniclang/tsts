import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Struct as Struct__from_jsonopts } from "../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { GoArray } from "@gotots/runtime/array.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../support/interface-contracts.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../support/provider-interface-bridges.js";
import { addressableValue } from "./arshal.js";
import { nonComparable } from "./doc.js";
import * as errors__from_gostdlib from "@gotots/gostdlib/errors.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type typedArshalers$Storage<Coder> = {
    nonComparable: GoArray<(() => void) | undefined, 0>;
    fncVals: RuntimeSlice<typedArshaler$Storage<Coder>>;
    fncCache: sync__from_gostdlib.Map;
    fromAny: bool;
};
export class typedArshalers<Coder> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: typedArshalers$Storage<Coder>) {
    }
    public static $storageOf<Coder>($source: typedArshalers<Coder>): typedArshalers$Storage<Coder> {
        return $source.$storage;
    }
    public static $fromStorage<Coder>($source: typedArshalers$Storage<Coder>): typedArshalers<Coder> {
        return new typedArshalers<Coder>($source);
    }
    static $copy<Coder>($source: typedArshalers<Coder>): typedArshalers<Coder> {
        return new typedArshalers<Coder>({
            nonComparable: new nonComparable(new nonComparable($source.$storage.nonComparable).$value.copy()).$value,
            fncVals: $source.$storage.fncVals,
            fncCache: named_sync.SyncMapOperations.$copy($source.$storage.fncCache),
            fromAny: $source.$storage.fromAny
        });
    }
    declare private readonly then?: never;
    static $go$private$json$lookup$kernel<Coder>(a: tsonicTypeScriptRuntime.Location<typedArshalers<Coder>> | undefined, $go$interface_adapt$PointerTo_T0_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error_to_Interface_void: ($0: (($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined) => $goInterface$Interface_void | undefined, $go$interface_assert$Interface_void_to_PointerTo_T0_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error: ($0: $goInterface$Interface_void | undefined) => (($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined, $go$length$SliceOf_PointerTo_T0_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error_to_int: ($0: RuntimeSlice<(($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined>) => int, fnc: (($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined, t: reflect__from_gostdlib.Type | undefined): [
        (($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined,
        bool
    ] {
        if (a === undefined) {
            return [fnc, false];
        }
        {
            const __gotots_results_1 = sync__from_gostdlib.Map.Load(typedArshalers.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typedArshalers<Coder>>).value).fncCache, t);
            let v__shadow_1: $goInterface$Interface_void | undefined = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                if (v__shadow_1 === undefined) {
                    return [fnc, false];
                }
                return [$go$interface_assert$Interface_void_to_PointerTo_T0_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error(v__shadow_1), true];
            }
        }
        let fncs = RuntimeSlice.nil<(($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined>();
        const __gotots_range_0 = typedArshalers.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typedArshalers<Coder>>).value).fncVals;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = typedArshaler.$copy<Coder>(typedArshaler.$fromStorage<Coder>(__gotots_range_0.get(__gotots_range_index_0)));
            let fncVal = __gotots_range_value_0;
            if (!castableTo(t, typedArshaler.$storageOf(fncVal).typ)) {
                continue;
            }
            fncs = fncs.append(void 0, [typedArshaler.$storageOf(fncVal).fnc]);
            if (!typedArshaler.$storageOf(fncVal).maySkip) {
                break;
            }
        }
        if ($go$length$SliceOf_PointerTo_T0_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error_to_int(fncs) === 0) {
            sync__from_gostdlib.Map.Store(typedArshalers.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typedArshalers<Coder>>).value).fncCache, t, void 0);
            return [fnc, false];
        }
        let fncDefault: (($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = fnc;
        fnc = (c: tsonicTypeScriptRuntime.Location<Coder> | undefined, v__shadow_1: addressableValue, o: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined): GoInterface | undefined => {
            const __gotots_range_1 = fncs;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let fnc__shadow_1: (($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined = __gotots_range_value_1;
                {
                    const __gotots_callee_0 = fnc__shadow_1;
                    const __gotots_argument_0 = c;
                    const __gotots_argument_1 = addressableValue.$copy(v__shadow_1);
                    const __gotots_argument_2 = o;
                    let err: GoInterface | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
                    const __gotots_argument_3 = err;
                    const __gotots_argument_4 = GoProviderInterfaceBridge.$from(errors__from_gostdlib.state.ErrUnsupported);
                    if (!provider_error.ErrorsIsDirect(__gotots_argument_3, __gotots_argument_4, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                        return err;
                    }
                }
            }
            const __gotots_callee_1 = fncDefault;
            const __gotots_argument_5 = c;
            const __gotots_argument_6 = addressableValue.$copy(v__shadow_1);
            const __gotots_argument_7 = o;
            return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
        };
        const __gotots_results_3 = sync__from_gostdlib.Map.LoadOrStore(typedArshalers.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<typedArshalers<Coder>>).value).fncCache, t, $go$interface_adapt$PointerTo_T0_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error_to_Interface_void(fnc));
        let v: $goInterface$Interface_void | undefined = __gotots_results_3[0];
        return [$go$interface_assert$Interface_void_to_PointerTo_T0_Named_json$addressableValue_PointerTo_Named_jsonopts$Struct_to_Named_error(v), true];
    }
}
export type typedArshaler$Storage<Coder> = {
    typ: reflect__from_gostdlib.Type | undefined;
    fnc: (($0: tsonicTypeScriptRuntime.Location<Coder> | undefined, $1: addressableValue, $2: tsonicTypeScriptRuntime.Location<Struct__from_jsonopts> | undefined) => GoInterface | undefined) | undefined;
    maySkip: bool;
};
export class typedArshaler<Coder> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: typedArshaler$Storage<Coder>) {
    }
    public static $storageOf<Coder>($source: typedArshaler<Coder>): typedArshaler$Storage<Coder> {
        return $source.$storage;
    }
    public static $fromStorage<Coder>($source: typedArshaler$Storage<Coder>): typedArshaler<Coder> {
        return new typedArshaler<Coder>($source);
    }
    static $zero<Coder>(): typedArshaler<Coder> {
        return new typedArshaler<Coder>({
            typ: void 0,
            fnc: void 0,
            maySkip: false
        });
    }
    static $copy<Coder>($source: typedArshaler<Coder>): typedArshaler<Coder> {
        return new typedArshaler<Coder>({
            typ: $source.$storage.typ,
            fnc: $source.$storage.fnc,
            maySkip: $source.$storage.maySkip
        });
    }
    declare private readonly then?: never;
}
export function castableTo(__go_from: reflect__from_gostdlib.Type | undefined, to: reflect__from_gostdlib.Type | undefined): bool {
    const __gotots_receiver_0 = to;
    switch (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Kind())) {
        case 20n: {
            const __gotots_receiver_1 = reflect__from_gostdlib.PointerTo(__go_from);
            const __gotots_argument_8 = to;
            return goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_1).Implements(__gotots_argument_8);
            break;
        }
        case 22n: {
            return goInterfaceEqual(reflect__from_gostdlib.PointerTo(__go_from), to);
            break;
        }
        default: {
            return goInterfaceEqual(__go_from, to);
            break;
        }
    }
}
