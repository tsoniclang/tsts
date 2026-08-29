import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Decoder as Decoder__from_jsontext } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { JSONValue$Storage as JSONValue__from_packagejson$Storage } from "./jsonvalue.js";
import type { bool, gostring, int8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { OrderedMap$Keys$string$Named_packagejson$ExportsOrImports } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { OrderedMap$Size$string$Named_packagejson$ExportsOrImports } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { unmarshalJSONValueV2$Named_packagejson$ExportsOrImports } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/packagejson/unmarshalJSONValueV2.js";
import { $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Named_packagejson$ExportsOrImports, $goInterfaceAdapter$SliceOf_Named_packagejson$ExportsOrImports, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { JSONValue, JSONValueTypeArray$constant, JSONValueTypeObject$constant } from "./jsonvalue.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export type objectKind = int8;
export function objectKindUnknown$constant(): objectKind {
    return 0;
}
export function objectKindSubpaths$constant(): objectKind {
    return 1;
}
export function objectKindConditions$constant(): objectKind {
    return 2;
}
export function objectKindImports$constant(): objectKind {
    return 3;
}
export function objectKindInvalid$constant(): objectKind {
    return 4;
}
export type ExportsOrImports$Storage = {
    JSONValue: JSONValue__from_packagejson$Storage;
    objectKind: int8;
};
export class ExportsOrImports implements GoContainerStoredValue<ExportsOrImports$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ExportsOrImports$Storage) {
    }
    public static $storageOf($source: ExportsOrImports): ExportsOrImports$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ExportsOrImports$Storage): ExportsOrImports {
        return new ExportsOrImports($source);
    }
    public get JSONValue(): JSONValue {
        return JSONValue.$fromStorage(this.$storage.JSONValue);
    }
    public set JSONValue($value: JSONValue) {
        this.$storage.JSONValue = JSONValue.$storageOf($value);
    }
    public get objectKind(): objectKind {
        return this.$storage.objectKind;
    }
    public set objectKind($value: objectKind) {
        this.$storage.objectKind = $value;
    }
    declare readonly [$goContainerStorageType]: ExportsOrImports$Storage;
    static $zero(): ExportsOrImports {
        return new ExportsOrImports({
            JSONValue: JSONValue.$zeroStorage(),
            objectKind: 0
        });
    }
    static $copy($source: ExportsOrImports): ExportsOrImports {
        return new ExportsOrImports({
            JSONValue: JSONValue.$storageOf(JSONValue.$copy(JSONValue.$fromStorage($source.$storage.JSONValue))),
            objectKind: $source.$storage.objectKind
        });
    }
    static $equal($left: ExportsOrImports, $right: ExportsOrImports): bool {
        return JSONValue.$equal(JSONValue.$fromStorage($left.$storage.JSONValue), JSONValue.$fromStorage($right.$storage.JSONValue)) && $left.$storage.objectKind === $right.$storage.objectKind;
    }
    static $hash($source: ExportsOrImports): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, JSONValue.$hash(JSONValue.$fromStorage($source.$storage.JSONValue)));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.$storage.objectKind));
        return $hash;
    }
    static $zeroStorage(): ExportsOrImports$Storage {
        return {
            JSONValue: JSONValue.$zeroStorage(),
            objectKind: 0
        };
    }
    declare private readonly then?: never;
    static UnmarshalJSONFrom(e: tsonicTypeScriptRuntime.Location<ExportsOrImports> | undefined, dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_store_0 = ExportsOrImports.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value);
        const __gotots_argument_2 = tsonicTypeScriptRuntime.projectLocation<JSONValue__from_packagejson$Storage, JSONValue>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "JSONValue"), JSONValue.$fromStorage, JSONValue.$storageOf);
        const __gotots_argument_3 = dec;
        return unmarshalJSONValueV2$Named_packagejson$ExportsOrImports(__gotots_argument_2, __gotots_argument_3);
    }
    static $go$private$packagejson$initObjectKind(e: tsonicTypeScriptRuntime.Location<ExportsOrImports> | undefined): void {
        if (ExportsOrImports.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value).objectKind === objectKindUnknown$constant() && (void JSONValue.$storageOf, (void JSONValue.$fromStorage,
            ExportsOrImports.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value).JSONValue)).Type === JSONValueTypeObject$constant()) {
            {
                let obj: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports>> | undefined = ((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value.AsObject();
                if (OrderedMap$Size$string$Named_packagejson$ExportsOrImports(obj) > 0) {
                    const __gotots_assign_0 = false;
                    const __gotots_assign_1 = false;
                    const __gotots_assign_2 = false;
                    let seenDot = __gotots_assign_0;
                    let seenHash = __gotots_assign_1;
                    let seenOther = __gotots_assign_2;
                    const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(OrderedMap$Keys$string$Named_packagejson$ExportsOrImports(obj));
                    if (__gotots_range_0 === void 0) {
                        GoPanic.raiseRuntime("call of nil function");
                    }
                    let __gotots_range_state_0 = 1;
                    __gotots_range_0(($argument0: gostring): bool => {
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
                        let k = __gotots_range_value_0;
                        if (k.length > 0) {
                            seenDot = seenDot || goStringIndex(k, 0) === 46;
                            seenHash = seenHash || goStringIndex(k, 0) === 35;
                            seenOther = seenOther || (goStringIndex(k, 0) !== 46 && goStringIndex(k, 0) !== 35);
                            if (seenOther && (seenDot || seenHash)) {
                                ExportsOrImports.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value).objectKind = objectKindInvalid$constant();
                                __gotots_range_state_0 = 2;
                                return false;
                            }
                        }
                        __gotots_range_state_0 = 1;
                        return true;
                    });
                    if (__gotots_range_state_0 === -1) {
                        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                    }
                    if (__gotots_range_state_0 === 2) {
                        return;
                    }
                    __gotots_range_state_0 = -2;
                    if (seenDot) {
                        ExportsOrImports.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value).objectKind = objectKindSubpaths$constant();
                        return;
                    }
                    if (seenHash) {
                        ExportsOrImports.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value).objectKind = objectKindImports$constant();
                        return;
                    }
                }
            }
            ExportsOrImports.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExportsOrImports>).value).objectKind = objectKindConditions$constant();
        }
    }
    AsArray(): RuntimeSlice<ExportsOrImports$Storage> {
        if (!((void JSONValue.$storageOf, (void JSONValue.$fromStorage,
            ExportsOrImports.$storageOf(this).JSONValue)).Type === JSONValueTypeArray$constant())) {
            const __gotots_argument_1 = new GoInterfaceAdapter("expected array");
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
        return (($value: GoInterface | undefined): RuntimeSlice<ExportsOrImports$Storage> => {
            if (!$goInterfaceAdapter$SliceOf_Named_packagejson$ExportsOrImports.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((void JSONValue.$storageOf, (void JSONValue.$fromStorage,
            ExportsOrImports.$storageOf(this).JSONValue)).Value);
    }
    AsObject(): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports>> | undefined {
        if (!((void JSONValue.$storageOf, (void JSONValue.$fromStorage,
            ExportsOrImports.$storageOf(this).JSONValue)).Type === JSONValueTypeObject$constant())) {
            const __gotots_argument_0 = new GoInterfaceAdapter("expected object");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        return (($value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Named_packagejson$ExportsOrImports.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })((void JSONValue.$storageOf, (void JSONValue.$fromStorage,
            ExportsOrImports.$storageOf(this).JSONValue)).Value);
    }
    IsConditions(): bool {
        let e: ExportsOrImports = ExportsOrImports.$copy(this);
        const e$location = tsonicTypeScriptRuntime.boundLocation({}, () => e, e$next => e = e$next);
        ExportsOrImports.$go$private$packagejson$initObjectKind(e$location);
        return ExportsOrImports.$storageOf(e).objectKind === objectKindConditions$constant();
    }
    IsSubpaths(): bool {
        let e: ExportsOrImports = ExportsOrImports.$copy(this);
        const e$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => e, e$next2 => e = e$next2);
        ExportsOrImports.$go$private$packagejson$initObjectKind(e$location2);
        return ExportsOrImports.$storageOf(e).objectKind === objectKindSubpaths$constant();
    }
}
