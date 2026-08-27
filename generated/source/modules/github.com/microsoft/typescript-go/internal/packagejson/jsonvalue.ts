import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStorage, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { Decoder as Decoder__from_jsontext, Token as Token__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { $state as $state__json__package_1, UnmarshalDecode as UnmarshalDecode__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { unmarshalJSONValueV2$Named_packagejson$JSONValue } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/packagejson/unmarshalJSONValueV2.js";
import { $goInterfaceAdapter$Named_packagejson$JSONValueType, $goInterfaceAdapter$PointerTo_Interface_void, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Named_packagejson$JSONValue, $goInterfaceAdapter$SliceOf_Named_packagejson$JSONValue, $goInterfaceAdapter$bool, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { goInterfaceEqual } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export type JSONValueType = int8;
export function JSONValueTypeNotPresent$constant(): JSONValueType {
    return 0;
}
export function JSONValueTypeNull$constant(): JSONValueType {
    return 1;
}
export function JSONValueTypeString$constant(): JSONValueType {
    return 2;
}
export function JSONValueTypeNumber$constant(): JSONValueType {
    return 3;
}
export function JSONValueTypeBoolean$constant(): JSONValueType {
    return 4;
}
export function JSONValueTypeArray$constant(): JSONValueType {
    return 5;
}
export function JSONValueTypeObject$constant(): JSONValueType {
    return 6;
}
export function JSONValueType_String(t: JSONValueType): gostring {
    switch (t) {
        case JSONValueTypeNull$constant(): {
            return "null";
            break;
        }
        case JSONValueTypeString$constant(): {
            return "string";
            break;
        }
        case JSONValueTypeNumber$constant(): {
            return "number";
            break;
        }
        case JSONValueTypeBoolean$constant(): {
            return "boolean";
            break;
        }
        case JSONValueTypeArray$constant(): {
            return "array";
            break;
        }
        case JSONValueTypeObject$constant(): {
            return "object";
            break;
        }
        default: {
            return fmt__from_gostdlib.Sprintf("unknown(%d)", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_packagejson$JSONValueType(t)]));
            break;
        }
    }
}
export type JSONValue$Storage = {
    Type: int8;
    Value: GoInterface | undefined;
};
export class JSONValue implements GoContainerStoredValue<JSONValue$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: JSONValue$Storage) {
    }
    public static $storageOf($source: JSONValue): JSONValue$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: JSONValue$Storage): JSONValue {
        return new JSONValue($source);
    }
    public get Type(): JSONValueType {
        return this.$storage.Type;
    }
    public set Type($value: JSONValueType) {
        this.$storage.Type = $value;
    }
    public get Value(): GoInterface | undefined {
        return this.$storage.Value;
    }
    public set Value($value: GoInterface | undefined) {
        this.$storage.Value = $value;
    }
    declare readonly [$goContainerStorageType]: JSONValue$Storage;
    static $zero(): JSONValue {
        return new JSONValue({
            Type: 0,
            Value: void 0
        });
    }
    static $copy($source: JSONValue): JSONValue {
        return new JSONValue({
            Type: $source.$storage.Type,
            Value: $source.$storage.Value
        });
    }
    static $equal($left: JSONValue, $right: JSONValue): bool {
        return $left.$storage.Type === $right.$storage.Type && goInterfaceEqual($left.$storage.Value, $right.$storage.Value);
    }
    static $hash($source: JSONValue): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.Type));
        $hash = GoMapHash.mix($hash, $source.$storage.Value === undefined ? 0 : $source.$storage.Value.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
    static IsFalsy(v: tsonicTypeScriptRuntime.Location<JSONValue> | undefined): bool {
        switch (JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type) {
            case JSONValueTypeNotPresent$constant():
            case JSONValueTypeNull$constant(): {
                return true;
                break;
            }
            case JSONValueTypeString$constant(): {
                return goInterfaceEqual(JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Value, new GoInterfaceAdapter(""));
                break;
            }
            case JSONValueTypeNumber$constant(): {
                return goInterfaceEqual(JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Value, new $goInterfaceAdapter$int(0));
                break;
            }
            case JSONValueTypeBoolean$constant(): {
                return !(($value: GoInterface | undefined): bool => {
                    if (!$goInterfaceAdapter$bool.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Value);
                break;
            }
            default: {
                return false;
                break;
            }
        }
    }
    static IsPresent(v: tsonicTypeScriptRuntime.Location<JSONValue> | undefined): bool {
        return !(JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type === JSONValueTypeNotPresent$constant());
    }
    static UnmarshalJSONFrom(v: tsonicTypeScriptRuntime.Location<JSONValue> | undefined, dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        return unmarshalJSONValueV2$Named_packagejson$JSONValue(v, dec);
    }
    AsArray(): RuntimeSlice<JSONValue$Storage> {
        if (!(JSONValue.$storageOf(this).Type === JSONValueTypeArray$constant())) {
            const __gotots_argument_1 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("expected array, got %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_packagejson$JSONValueType(JSONValue.$storageOf(this).Type)])));
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
        return (($value: GoInterface | undefined): RuntimeSlice<JSONValue$Storage> => {
            if (!$goInterfaceAdapter$SliceOf_Named_packagejson$JSONValue.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(JSONValue.$storageOf(this).Value);
    }
    AsObject(): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue>> | undefined {
        if (!(JSONValue.$storageOf(this).Type === JSONValueTypeObject$constant())) {
            const __gotots_argument_0 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("expected object, got %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_packagejson$JSONValueType(JSONValue.$storageOf(this).Type)])));
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        return (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Named_packagejson$JSONValue.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(JSONValue.$storageOf(this).Value);
    }
    AsString(): gostring {
        if (!(JSONValue.$storageOf(this).Type === JSONValueTypeString$constant())) {
            const __gotots_argument_2 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("expected string, got %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_packagejson$JSONValueType(JSONValue.$storageOf(this).Type)])));
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
        }
        return (($value: GoInterface | undefined): gostring => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(JSONValue.$storageOf(this).Value);
    }
}
export function unmarshalJSONValueV2$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$from_container_storage$T0_to_T0: ($0: GoContainerStorage<T>) => T, $go$interface_adapt$PointerTo_Named_collections$OrderedMapOf_string_And_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, T>> | undefined) => GoInterface | undefined, $go$interface_adapt$PointerTo_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => GoInterface | undefined, $go$interface_adapt$SliceOf_T0_to_Interface_void: ($0: RuntimeSlice<GoContainerStorage<T>>) => GoInterface | undefined, $go$to_container_storage$T0_to_T0: ($0: T) => GoContainerStorage<T>, $go$zero$void_to_T0: () => T, $go$zero$void_to_MapOf_string_To_T0: () => GoMapValue<gostring, T>, v: tsonicTypeScriptRuntime.Location<JSONValue> | undefined, dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
    switch (Decoder__from_jsontext.PeekKind(dec)) {
        case 110: {
            {
                const __gotots_results_0 = Decoder__from_jsontext.ReadToken(dec);
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
                if (!(err === undefined)) {
                    return err;
                }
            }
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Value = void 0;
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type = JSONValueTypeNull$constant();
            return void 0;
            break;
        }
        case 34: {
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type = JSONValueTypeString$constant();
            {
                const __gotots_argument_3 = dec;
                const __gotots_store_0 = JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value);
                const __gotots_argument_4 = new $goInterfaceAdapter$PointerTo_Interface_void(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Value"));
                const __gotots_argument_5 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = UnmarshalDecode__from_json__package_1(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
                if (!(err === undefined)) {
                    return err;
                }
            }
            break;
        }
        case 91: {
            {
                const __gotots_results_1 = Decoder__from_jsontext.ReadToken(dec);
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
                if (!(err === undefined)) {
                    return err;
                }
            }
            let elements = RuntimeSlice.nil<GoContainerStorage<T>>();
            for (; !(Decoder__from_jsontext.PeekKind(dec) === Token__from_jsontext.$fromStorage($state__json__package_1.EndArray).Kind());) {
                let element: T = $go$zero$void_to_T0();
                const element$location = tsonicTypeScriptRuntime.boundLocation({}, () => element, element$next => element = element$next);
                {
                    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = UnmarshalDecode__from_json__package_1(dec, $go$interface_adapt$PointerTo_T0_to_Interface_void(element$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                    if (!(err === undefined)) {
                        return err;
                    }
                }
                const __gotots_slice_build_0 = elements;
                const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                let __gotots_slice_build_1 = __gotots_slice_build_0;
                if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                    __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(element)));
                }
                else {
                    __gotots_slice_build_1 = goSliceAllocate<GoContainerStorage<T>>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                    for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.set(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0($go$from_container_storage$T0_to_T0(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                    }
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, $go$to_container_storage$T0_to_T0($go$copy$T0_to_T0(element)));
                    for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.$initialize(__gotots_slice_build_3, $go$to_container_storage$T0_to_T0($go$zero$void_to_T0()));
                    }
                }
                elements = __gotots_slice_build_1;
            }
            {
                const __gotots_results_2 = Decoder__from_jsontext.ReadToken(dec);
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_2[1];
                if (!(err === undefined)) {
                    return err;
                }
            }
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type = JSONValueTypeArray$constant();
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Value = $go$interface_adapt$SliceOf_T0_to_Interface_void(elements);
            break;
        }
        case 123: {
            let __go_object = OrderedMap__from_collections.$zero<gostring, T>($go$zero$void_to_MapOf_string_To_T0);
            const __go_object$location = tsonicTypeScriptRuntime.boundLocation({}, () => __go_object, __go_object$next => __go_object = __go_object$next);
            {
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = UnmarshalDecode__from_json__package_1(dec, $go$interface_adapt$PointerTo_Named_collections$OrderedMapOf_string_And_T0_to_Interface_void(__go_object$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                if (!(err === undefined)) {
                    return err;
                }
            }
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type = JSONValueTypeObject$constant();
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Value = $go$interface_adapt$PointerTo_Named_collections$OrderedMapOf_string_And_T0_to_Interface_void(__go_object$location);
            break;
        }
        case 116:
        case 102: {
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type = JSONValueTypeBoolean$constant();
            {
                const __gotots_argument_6 = dec;
                const __gotots_store_1 = JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value);
                const __gotots_argument_7 = new $goInterfaceAdapter$PointerTo_Interface_void(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Value"));
                const __gotots_argument_8 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = UnmarshalDecode__from_json__package_1(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
                if (!(err === undefined)) {
                    return err;
                }
            }
            break;
        }
        default: {
            JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value).Type = JSONValueTypeNumber$constant();
            {
                const __gotots_argument_9 = dec;
                const __gotots_store_2 = JSONValue.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<JSONValue>).value);
                const __gotots_argument_10 = new $goInterfaceAdapter$PointerTo_Interface_void(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Value"));
                const __gotots_argument_11 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = UnmarshalDecode__from_json__package_1(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                if (!(err === undefined)) {
                    return err;
                }
            }
            break;
        }
    }
    return void 0;
}
