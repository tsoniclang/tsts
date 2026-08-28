import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import type { bool, gostring, uint32, uint8 } from "@gotots/runtime/scalars.js";
import type { GoStorage } from "@gotots/runtime/storage.js";
import { Unmarshal as Unmarshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type Expected$Storage<T> = {
    actualJSONType: gostring;
    Null: bool;
    Valid: bool;
    Value: GoStorage<T>;
};
export class Expected<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Expected$Storage<T>) {
    }
    public static $storageOf<T>($source: Expected<T>): Expected$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: Expected$Storage<T>): Expected<T> {
        return new Expected<T>($source);
    }
    static $zero<T>($go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, $go$zero$void_to_T0: () => T): Expected<T> {
        return new Expected<T>({
            actualJSONType: "",
            Null: false,
            Valid: false,
            Value: $go$to_storage$T0_to_T0($go$zero$void_to_T0())
        });
    }
    static $copy<T>($go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, $source: Expected<T>): Expected<T> {
        return new Expected<T>({
            actualJSONType: $source.$storage.actualJSONType,
            Null: $source.$storage.Null,
            Valid: $source.$storage.Valid,
            Value: $go$to_storage$T0_to_T0($go$from_storage$T0_to_T0($source.$storage.Value))
        });
    }
    static $equal<T>($go$equal$T0_T0_to_bool: ($0: T, $1: T) => bool, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $left: Expected<T>, $right: Expected<T>): bool {
        return $left.$storage.actualJSONType === $right.$storage.actualJSONType && $left.$storage.Null === $right.$storage.Null && $left.$storage.Valid === $right.$storage.Valid && $go$equal$T0_T0_to_bool($go$from_storage$T0_to_T0($left.$storage.Value), $go$from_storage$T0_to_T0($right.$storage.Value));
    }
    static $hash<T>($go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$hash$T0_to_uint32: ($0: T) => uint32, $source: Expected<T>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.$storage.actualJSONType));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.Null));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.$storage.Valid));
        $hash = GoMapHash.mix($hash, $go$hash$T0_to_uint32($go$from_storage$T0_to_T0($source.$storage.Value)));
        return $hash;
    }
    declare private readonly then?: never;
    static ActualJSONType<T>(e: tsonicTypeScriptRuntime.Location<Expected<T>> | undefined): gostring {
        return Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).actualJSONType;
    }
    static ExpectedJSONType$kernel<T>(e: tsonicTypeScriptRuntime.Location<Expected<T>> | undefined, $go$reflection_type$PointerTo_T0_to_Named_reflect$Type: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => reflect__from_gostdlib.Type | undefined): gostring {
        const __gotots_receiver_0 = $go$reflection_type$PointerTo_T0_to_Named_reflect$Type(void 0);
        switch (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Kind())) {
            case 24n: {
                return "string";
                break;
            }
            case 1n: {
                return "boolean";
                break;
            }
            case 23n:
            case 17n: {
                return "array";
                break;
            }
            case 21n: {
                return "object";
                break;
            }
            case 2n:
            case 3n:
            case 4n:
            case 5n:
            case 6n:
            case 7n:
            case 8n:
            case 9n:
            case 10n:
            case 11n: {
                return "number";
                break;
            }
            default: {
                return "unknown";
                break;
            }
        }
    }
    static GetValue$kernel<T>(e: tsonicTypeScriptRuntime.Location<Expected<T>> | undefined, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$zero$void_to_T0: () => T): [
        T,
        bool
    ] {
        let value: T = $go$zero$void_to_T0();
        let ok: bool = false;
        return [$go$from_storage$T0_to_T0(Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).Value), Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).Valid];
    }
    static IsPresent<T>(e: tsonicTypeScriptRuntime.Location<Expected<T>> | undefined): bool {
        return Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).actualJSONType !== "";
    }
    static IsValid<T>(e: tsonicTypeScriptRuntime.Location<Expected<T>> | undefined): bool {
        return Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).Valid;
    }
    static UnmarshalJSON$kernel<T>(e: tsonicTypeScriptRuntime.Location<Expected<T>> | undefined, $go$from_storage$T0_to_T0: ($0: GoStorage<T>) => T, $go$interface_adapt$PointerTo_T0_to_Interface_void: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => $goInterface$Interface_void | undefined, $go$to_storage$T0_to_T0: ($0: T) => GoStorage<T>, $go$zero$void_to_T0: () => T, data: RuntimeSlice<uint8>): GoInterface | undefined {
        const __gotots_conversion_0 = data;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        const __gotots_binary_operand_0 = __gotots_conversion_1;
        const __gotots_binary_operand_1 = "null";
        if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
            void ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                Expected.$fromStorage<T>({
                    Null: true,
                    actualJSONType: "null",
                    Valid: false,
                    Value: $go$to_storage$T0_to_T0($go$zero$void_to_T0())
                }));
            return void 0;
        }
        const __gotots_argument_1 = data;
        const __gotots_store_0 = Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value);
        const __gotots_argument_0 = tsonicTypeScriptRuntime.projectLocation<GoStorage<T>, T>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Value"), ($go$storage: GoStorage<T>): T => {
            return $go$from_storage$T0_to_T0($go$storage);
        }, ($go$value: T): GoStorage<T> => {
            return $go$to_storage$T0_to_T0($go$value);
        });
        const __gotots_argument_2 = $go$interface_adapt$PointerTo_T0_to_Interface_void(__gotots_argument_0);
        const __gotots_argument_3 = RuntimeSlice.nil<Options__from_jsonopts | undefined>();
        if (Unmarshal__from_json__package_1(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3) === undefined) {
            Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).Valid = true;
        }
        switch (data.get(0)) {
            case 34: {
                Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).actualJSONType = "string";
                break;
            }
            case 116:
            case 102: {
                Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).actualJSONType = "boolean";
                break;
            }
            case 91: {
                Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).actualJSONType = "array";
                break;
            }
            case 123: {
                Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).actualJSONType = "object";
                break;
            }
            default: {
                Expected.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Expected<T>>).value).actualJSONType = "number";
                break;
            }
        }
        return void 0;
    }
}
