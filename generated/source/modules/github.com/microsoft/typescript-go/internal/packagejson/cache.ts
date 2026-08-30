import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { Version$Storage as Version__from_semver$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { VersionMajorMinor as VersionMajorMinor__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/state.js";
import { TryParseVersionRange as TryParseVersionRange__from_semver, VersionRange as VersionRange__from_semver, Version as Version__from_semver } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/package.js";
import { ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewOrderedMapWithSizeHint$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewOrderedMapWithSizeHint.js";
import { OrderedMap$Entries$string$Named_packagejson$JSONValue } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Set$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$string$Named_packagejson$JSONValue } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_packagejson$InfoCacheEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_packagejson$InfoCacheEntry } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { JSONValue, JSONValueTypeArray$constant, JSONValueTypeNotPresent$constant, JSONValueTypeObject$constant, JSONValueTypeString$constant, JSONValueType_String } from "./jsonvalue.js";
import { Fields } from "./packagejson.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export class PackageJson {
    declare private readonly $goType: void;
    public constructor(public Fields: Fields, public Parseable: bool, public versionPaths: VersionPaths, public versionTraces: RuntimeSlice<diagnosticAndArgs$Storage>, public once: sync__from_gostdlib.Once) {
    }
    static $zero(): PackageJson {
        return new PackageJson(Fields.$zero(), false, VersionPaths.$zero(), RuntimeSlice.nil<diagnosticAndArgs$Storage>(), named_sync.SyncOnceOperations.$zero());
    }
    static $copy($source: PackageJson): PackageJson {
        return new PackageJson(Fields.$copy($source.Fields), $source.Parseable, VersionPaths.$copy($source.versionPaths), $source.versionTraces, named_sync.SyncOnceOperations.$copy($source.once));
    }
    declare private readonly then?: never;
    static GetVersionPaths(p: {
        value: PackageJson;
    } | undefined, trace: (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<GoInterface | undefined>) => void) | undefined): VersionPaths {
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.once, (): void => {
            if (JSONValue.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.TypesVersions).Type === JSONValueTypeNotPresent$constant()) {
                const __gotots_slice_build_0: PackageJson["versionTraces"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces;
                const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                let __gotots_slice_build_1 = __gotots_slice_build_0;
                if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                    __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                        {
                            message: $state__diagnostics.X_package_json_does_not_have_a_0_field,
                            args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions")])
                        })));
                }
                else {
                    __gotots_slice_build_1 = goSliceAllocate<diagnosticAndArgs$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                    for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.set(__gotots_slice_build_3, diagnosticAndArgs.$storageOf(diagnosticAndArgs.$copy(diagnosticAndArgs.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                    }
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                        {
                            message: $state__diagnostics.X_package_json_does_not_have_a_0_field,
                            args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions")])
                        })));
                    for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.$initialize(__gotots_slice_build_3, diagnosticAndArgs.$zeroStorage());
                    }
                }
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces = __gotots_slice_build_1;
                return;
            }
            if (!(JSONValue.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.TypesVersions).Type === JSONValueTypeObject$constant())) {
                const __gotots_slice_build_4: PackageJson["versionTraces"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces;
                const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                let __gotots_slice_build_5 = __gotots_slice_build_4;
                if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                    __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                    __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                        {
                            message: $state__diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2,
                            args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions"), new GoInterfaceAdapter("object"), new GoInterfaceAdapter(JSONValueType_String(JSONValue.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.TypesVersions).Type))])
                        })));
                }
                else {
                    __gotots_slice_build_5 = goSliceAllocate<diagnosticAndArgs$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                    for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                        __gotots_slice_build_5.set(__gotots_slice_build_7, diagnosticAndArgs.$storageOf(diagnosticAndArgs.$copy(diagnosticAndArgs.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                    }
                    __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                        {
                            message: $state__diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2,
                            args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions"), new GoInterfaceAdapter("object"), new GoInterfaceAdapter(JSONValueType_String(JSONValue.$storageOf((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.TypesVersions).Type))])
                        })));
                    for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                        __gotots_slice_build_5.$initialize(__gotots_slice_build_7, diagnosticAndArgs.$zeroStorage());
                    }
                }
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces = __gotots_slice_build_5;
                return;
            }
            const __gotots_slice_build_8: PackageJson["versionTraces"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces;
            const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
            let __gotots_slice_build_9 = __gotots_slice_build_8;
            if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                    {
                        message: $state__diagnostics.X_package_json_has_a_typesVersions_field_with_version_specific_path_mappings,
                        args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions")])
                    })));
            }
            else {
                __gotots_slice_build_9 = goSliceAllocate<diagnosticAndArgs$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.set(__gotots_slice_build_11, diagnosticAndArgs.$storageOf(diagnosticAndArgs.$copy(diagnosticAndArgs.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                }
                __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                    {
                        message: $state__diagnostics.X_package_json_has_a_typesVersions_field_with_version_specific_path_mappings,
                        args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions")])
                    })));
                for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.$initialize(__gotots_slice_build_11, diagnosticAndArgs.$zeroStorage());
                }
            }
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces = __gotots_slice_build_9;
            const __gotots_range_0 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Named_packagejson$JSONValue((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.TypesVersions.AsObject()));
            if (__gotots_range_0 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
            __gotots_range_0(($argument0: gostring, $argument1: JSONValue): bool => {
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
                const __gotots_range_value_1 = JSONValue.$copy($argument1);
                let key = __gotots_range_value_0;
                let value = __gotots_range_value_1;
                const __gotots_results_0 = TryParseVersionRange__from_semver(key);
                let keyRange = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                if (!ok) {
                    const __gotots_slice_build_12: PackageJson["versionTraces"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces;
                    const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
                    let __gotots_slice_build_13 = __gotots_slice_build_12;
                    if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
                        __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                            {
                                message: $state__diagnostics.X_package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range,
                                args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(key)])
                            })));
                    }
                    else {
                        __gotots_slice_build_13 = goSliceAllocate<diagnosticAndArgs$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
                        for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.set(__gotots_slice_build_15, diagnosticAndArgs.$storageOf(diagnosticAndArgs.$copy(diagnosticAndArgs.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
                        }
                        __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                            {
                                message: $state__diagnostics.X_package_json_has_a_typesVersions_entry_0_that_is_not_a_valid_semver_range,
                                args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(key)])
                            })));
                        for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                            __gotots_slice_build_13.$initialize(__gotots_slice_build_15, diagnosticAndArgs.$zeroStorage());
                        }
                    }
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces = __gotots_slice_build_13;
                    __gotots_range_state_0 = 1;
                    return true;
                }
                if (VersionRange__from_semver.Test(keyRange, new $ProjectedPropertyLocation($state, "typeScriptVersion", Version__from_semver.$fromStorage, Version__from_semver.$storageOf))) {
                    if (!(JSONValue.$storageOf(value).Type === JSONValueTypeObject$constant())) {
                        const __gotots_slice_build_16: PackageJson["versionTraces"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces;
                        const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
                        let __gotots_slice_build_17 = __gotots_slice_build_16;
                        if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
                            __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
                            __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                                {
                                    message: $state__diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2,
                                    args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions['" + key + "']"), new GoInterfaceAdapter("object"), new GoInterfaceAdapter(JSONValueType_String(JSONValue.$storageOf(value).Type))])
                                })));
                        }
                        else {
                            __gotots_slice_build_17 = goSliceAllocate<diagnosticAndArgs$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
                            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                                __gotots_slice_build_17.set(__gotots_slice_build_19, diagnosticAndArgs.$storageOf(diagnosticAndArgs.$copy(diagnosticAndArgs.$fromStorage(__gotots_slice_build_16.get(__gotots_slice_build_19)))));
                            }
                            __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                                {
                                    message: $state__diagnostics.Expected_type_of_0_field_in_package_json_to_be_1_got_2,
                                    args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("typesVersions['" + key + "']"), new GoInterfaceAdapter("object"), new GoInterfaceAdapter(JSONValueType_String(JSONValue.$storageOf(value).Type))])
                                })));
                            for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                                __gotots_slice_build_17.$initialize(__gotots_slice_build_19, diagnosticAndArgs.$zeroStorage());
                            }
                        }
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces = __gotots_slice_build_17;
                        __gotots_range_state_0 = 2;
                        return false;
                    }
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionPaths = new VersionPaths(key, value.AsObject(), void 0);
                    __gotots_range_state_0 = 2;
                    return false;
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
            const __gotots_slice_build_20: PackageJson["versionTraces"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces;
            const __gotots_slice_build_22 = __gotots_slice_build_20.length + 1;
            let __gotots_slice_build_21 = __gotots_slice_build_20;
            if (__gotots_slice_build_22 <= __gotots_slice_build_20.capacity) {
                __gotots_slice_build_21 = __gotots_slice_build_20.$withLength(__gotots_slice_build_22);
                __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                    {
                        message: $state__diagnostics.X_package_json_does_not_have_a_typesVersions_entry_that_matches_version_0,
                        args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(VersionMajorMinor__from_core())])
                    })));
            }
            else {
                __gotots_slice_build_21 = goSliceAllocate<diagnosticAndArgs$Storage>(__gotots_slice_build_22, RuntimeSlice.$grownCapacity(__gotots_slice_build_20.capacity, __gotots_slice_build_22));
                for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_20.length; __gotots_slice_build_23++) {
                    __gotots_slice_build_21.set(__gotots_slice_build_23, diagnosticAndArgs.$storageOf(diagnosticAndArgs.$copy(diagnosticAndArgs.$fromStorage(__gotots_slice_build_20.get(__gotots_slice_build_23)))));
                }
                __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void diagnosticAndArgs.$storageOf, (void diagnosticAndArgs.$fromStorage,
                    {
                        message: $state__diagnostics.X_package_json_does_not_have_a_typesVersions_entry_that_matches_version_0,
                        args: RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(VersionMajorMinor__from_core())])
                    })));
                for (let __gotots_slice_build_23 = __gotots_slice_build_22; __gotots_slice_build_23 < __gotots_slice_build_21.capacity; __gotots_slice_build_23++) {
                    __gotots_slice_build_21.$initialize(__gotots_slice_build_23, diagnosticAndArgs.$zeroStorage());
                }
            }
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces = __gotots_slice_build_21;
        });
        if (!(trace === undefined)) {
            const __gotots_range_1: PackageJson["versionTraces"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionTraces;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                const __gotots_range_value_2 = diagnosticAndArgs.$copy(diagnosticAndArgs.$fromStorage(__gotots_range_1.get(__gotots_range_index_0)));
                let msg = __gotots_range_value_2;
                const __gotots_callee_1 = trace;
                const __gotots_argument_0 = diagnosticAndArgs.$storageOf(msg).message;
                const __gotots_argument_1 = diagnosticAndArgs.$storageOf(msg).args;
                (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
            }
        }
        return VersionPaths.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.versionPaths);
    }
}
export type diagnosticAndArgs$Storage = {
    message: {
        value: Message__from_diagnostics;
    } | undefined;
    args: RuntimeSlice<GoInterface | undefined>;
};
export class diagnosticAndArgs {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: diagnosticAndArgs$Storage) {
    }
    public static $storageOf($source: diagnosticAndArgs): diagnosticAndArgs$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: diagnosticAndArgs$Storage): diagnosticAndArgs {
        return new diagnosticAndArgs($source);
    }
    public get message(): {
        value: Message__from_diagnostics;
    } | undefined {
        return this.$storage.message;
    }
    public set message($value: {
        value: Message__from_diagnostics;
    } | undefined) {
        this.$storage.message = $value;
    }
    public get args(): RuntimeSlice<GoInterface | undefined> {
        return this.$storage.args;
    }
    public set args($value: RuntimeSlice<GoInterface | undefined>) {
        this.$storage.args = $value;
    }
    static $copy($source: diagnosticAndArgs): diagnosticAndArgs {
        return new diagnosticAndArgs({
            message: $source.$storage.message,
            args: $source.$storage.args
        });
    }
    static $zeroStorage(): diagnosticAndArgs$Storage {
        return {
            message: void 0,
            args: RuntimeSlice.nil<GoInterface | undefined>()
        };
    }
    declare private readonly then?: never;
}
export class VersionPaths {
    declare private readonly $goType: void;
    public constructor(public Version: gostring, public pathsJSON: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, JSONValue>> | undefined, public paths: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined) {
    }
    static $zero(): VersionPaths {
        return new VersionPaths("", void 0, void 0);
    }
    static $copy($source: VersionPaths): VersionPaths {
        return new VersionPaths($source.Version, $source.pathsJSON, $source.paths);
    }
    static $equal($left: VersionPaths, $right: VersionPaths): bool {
        return $left.Version === $right.Version &&
            tsonicTypeScriptRuntime.sameLocation($left.pathsJSON, $right.pathsJSON) &&
            tsonicTypeScriptRuntime.sameLocation($left.paths, $right.paths);
    }
    static $hash($source: VersionPaths): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Version));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.pathsJSON));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.paths));
        return $hash;
    }
    declare private readonly then?: never;
    static Exists(v: tsonicTypeScriptRuntime.Location<VersionPaths> | undefined): bool {
        return !(v === undefined) && ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.Version !== "" && !(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.pathsJSON === undefined);
    }
    static GetPaths(v: tsonicTypeScriptRuntime.Location<VersionPaths> | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined {
        if (!VersionPaths.Exists(v)) {
            return void 0;
        }
        if (!(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.paths === undefined)) {
            return ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.paths;
        }
        let paths: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined = NewOrderedMapWithSizeHint$string$SliceOf_string(OrderedMap$Size$string$Named_packagejson$JSONValue(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.pathsJSON));
        const __gotots_range_2 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Named_packagejson$JSONValue(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.pathsJSON));
        if (__gotots_range_2 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_1 = 1;
        __gotots_range_2(($argument0: gostring, $argument1: JSONValue): bool => {
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
            const __gotots_range_value_4 = JSONValue.$copy($argument1);
            let key = __gotots_range_value_3;
            let value = __gotots_range_value_4;
            if (!(JSONValue.$storageOf(value).Type === JSONValueTypeArray$constant())) {
                __gotots_range_state_1 = 1;
                return true;
            }
            let slice = RuntimeSlice.make<gostring>(value.AsArray().length, null, "");
            const __gotots_range_3 = value.AsArray();
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3.length; __gotots_range_index_1++) {
                const __gotots_range_value_5 = __gotots_range_index_1;
                const __gotots_range_value_6 = JSONValue.$copy(JSONValue.$fromStorage(__gotots_range_3.get(__gotots_range_index_1)));
                let i = __gotots_range_value_5;
                let path = __gotots_range_value_6;
                if (!(JSONValue.$storageOf(path).Type === JSONValueTypeString$constant())) {
                    continue;
                }
                slice.set(i, (($value: GoInterface | undefined): gostring => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(JSONValue.$storageOf(path).Value));
            }
            OrderedMap$Set$string$SliceOf_string(paths, key, slice);
            __gotots_range_state_1 = 1;
            return true;
        });
        if (__gotots_range_state_1 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_1 = -2;
        ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.paths = paths;
        return ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VersionPaths>).value.paths;
    }
}
export class InfoCacheEntry {
    declare private readonly $goType: void;
    public constructor(public PackageDirectory: gostring, public DirectoryExists: bool, public Contents: {
        value: PackageJson;
    } | undefined) {
    }
    static $copy($source: InfoCacheEntry): InfoCacheEntry {
        return new InfoCacheEntry($source.PackageDirectory, $source.DirectoryExists, $source.Contents);
    }
    static $equal($left: InfoCacheEntry, $right: InfoCacheEntry): bool {
        return $left.PackageDirectory === $right.PackageDirectory && $left.DirectoryExists === $right.DirectoryExists &&
            $left.Contents
                ===
                    $right.Contents;
    }
    static $hash($source: InfoCacheEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.PackageDirectory));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.DirectoryExists));
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.Contents));
        return $hash;
    }
    declare private readonly then?: never;
    static Exists(p: {
        value: InfoCacheEntry;
    } | undefined): bool {
        return !(p === undefined) && !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents === undefined);
    }
    static GetContents(p: {
        value: InfoCacheEntry;
    } | undefined): {
        value: PackageJson;
    } | undefined {
        if (p === undefined || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents === undefined) {
            return void 0;
        }
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents;
    }
    static WithPackageDirectory(p: {
        value: InfoCacheEntry;
    } | undefined, packageDirectory: gostring): {
        value: InfoCacheEntry;
    } | undefined {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory === packageDirectory) {
            return p;
        }
        return { value: new InfoCacheEntry(packageDirectory, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DirectoryExists, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents) };
    }
}
export class InfoCache {
    declare private readonly $goType: void;
    public constructor(public cache: SyncMap__from_collections<Path__from_tspath, {
        value: InfoCacheEntry;
    } | undefined>, public currentDirectory: gostring, public useCaseSensitiveFileNames: bool) {
    }
    static $copy($source: InfoCache): InfoCache {
        return new InfoCache(SyncMap__from_collections.$copy<Path__from_tspath, {
            value: InfoCacheEntry;
        } | undefined>($source.cache), $source.currentDirectory, $source.useCaseSensitiveFileNames);
    }
    declare private readonly then?: never;
    static Get(p: {
        value: InfoCache;
    } | undefined, packageJsonPath: gostring): {
        value: InfoCacheEntry;
    } | undefined {
        let key = ToPath__from_tspath(packageJsonPath, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useCaseSensitiveFileNames);
        {
            const __gotots_store_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_packagejson$InfoCacheEntry(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "cache"), key);
            let value: {
                value: InfoCacheEntry;
            } | undefined = __gotots_results_1[0];
            let ok = __gotots_results_1[1];
            if (ok) {
                return value;
            }
        }
        return void 0;
    }
    static Set(p: {
        value: InfoCache;
    } | undefined, packageJsonPath: gostring, info: {
        value: InfoCacheEntry;
    } | undefined): {
        value: InfoCacheEntry;
    } | undefined {
        let key = ToPath__from_tspath(packageJsonPath, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.currentDirectory, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.useCaseSensitiveFileNames);
        const __gotots_store_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_2 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_packagejson$InfoCacheEntry(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "cache"), key, info);
        let actual: {
            value: InfoCacheEntry;
        } | undefined = __gotots_results_2[0];
        return actual;
    }
}
export function NewInfoCache(currentDirectory: gostring, useCaseSensitiveFileNames: bool): {
    value: InfoCache;
} | undefined {
    return { value: new InfoCache(SyncMap__from_collections.$zero<Path__from_tspath, {
            value: InfoCacheEntry;
        } | undefined>(), currentDirectory, useCaseSensitiveFileNames) };
}
