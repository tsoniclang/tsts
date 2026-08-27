import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { BuildOptions as BuildOptions__from_core, CompilerOptions as CompilerOptions__from_core, PollingKind as PollingKind__from_core, Tristate as Tristate__from_core, TypeAcquisition as TypeAcquisition__from_core, WatchDirectoryKind as WatchDirectoryKind__from_core, WatchFileKind as WatchFileKind__from_core, WatchOptions as WatchOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { ProjectReference as ProjectReference__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import { GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewOrderedMapWithSizeHint$string$Interface_void, NewOrderedMapWithSizeHint$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewOrderedMapWithSizeHint.js";
import { OrderedMap$Entries$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$Set$string$Interface_void, OrderedMap$Set$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Map$Interface_void$Interface_void, Map$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { floatOrInt32ToFlag$Named_core$JsxEmit, floatOrInt32ToFlag$Named_core$ModuleDetectionKind, floatOrInt32ToFlag$Named_core$ModuleKind, floatOrInt32ToFlag$Named_core$ModuleResolutionKind, floatOrInt32ToFlag$Named_core$NewLineKind, floatOrInt32ToFlag$Named_core$ScriptTarget } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tsoptions/floatOrInt32ToFlag.js";
import { $goInterfaceAdapter$Named_core$PollingKind, $goInterfaceAdapter$Named_core$Tristate, $goInterfaceAdapter$Named_core$WatchDirectoryKind, $goInterfaceAdapter$Named_core$WatchFileKind, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void, $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$bool, $goInterfaceAdapter$float64, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$SliceOf_string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import { $goReflectType$PointerTo_Named_core$CompilerOptions } from "../../../../../../support/reflection-types.js";
import "../../../../../../support/reflection-types.js";
import { CommandLineOption, CommandLineOptionKind } from "./commandlineoption.js";
import { extraKeyDiagnostics, extraKeyDidYouMeanDiagnostics } from "./errors.js";
import { NameMap } from "./namemap.js";
import { CommandLineOptionNameMap } from "./tsconfigparsing.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function ParseTristate(value: GoInterface | undefined): Tristate__from_core {
    if (value === undefined) {
        return TSUnknown$constant__from_core();
    }
    {
        const __gotots_results_6 = (($value: GoInterface | undefined): [
            Tristate__from_core,
            boolean
        ] => {
            if (!$goInterfaceAdapter$Named_core$Tristate.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })(value);
        let v = __gotots_results_6[0];
        let ok = __gotots_results_6[1];
        if (ok) {
            return v;
        }
    }
    if (goInterfaceEqual(value, new $goInterfaceAdapter$bool(true))) {
        return TSTrue$constant__from_core();
    }
    else {
        return TSFalse$constant__from_core();
    }
}
export function ParseStringArray(value: GoInterface | undefined): RuntimeSlice<gostring> {
    {
        const __gotots_results_8 = (($value: GoInterface | undefined): [
            RuntimeSlice<GoInterface | undefined>,
            boolean
        ] => {
            if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                return [RuntimeSlice.nil<GoInterface | undefined>(), false];
            }
            return [$value.$go$value, true];
        })(value);
        let arr = __gotots_results_8[0];
        let ok = __gotots_results_8[1];
        if (ok) {
            if (arr.isNil()) {
                return RuntimeSlice.nil<gostring>();
            }
            let result = RuntimeSlice.make<gostring>(0, arr.length, "");
            const __gotots_range_1 = arr;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_0);
                let v: GoInterface | undefined = __gotots_range_value_2;
                {
                    const __gotots_results_9 = (($value: GoInterface | undefined): [
                        gostring,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$string.$is($value)) {
                            return ["", false];
                        }
                        return [$value.$go$value, true];
                    })(v);
                    let str = __gotots_results_9[0];
                    let ok__shadow_1 = __gotots_results_9[1];
                    if (ok__shadow_1) {
                        result = result.append("", [str]);
                    }
                }
            }
            return result;
        }
    }
    return RuntimeSlice.nil<gostring>();
}
export function parseStringMap(value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined {
    {
        const __gotots_results_11 = (($value: GoInterface | undefined): [
            tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(value);
        let m: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_11[0];
        let ok = __gotots_results_11[1];
        if (ok) {
            let result: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined = NewOrderedMapWithSizeHint$string$SliceOf_string(OrderedMap$Size$string$Interface_void(m));
            const __gotots_range_2 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(m));
            if (__gotots_range_2 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_1 = 1;
            __gotots_range_2(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
                const __gotots_range_value_4 = $argument1;
                let k = __gotots_range_value_3;
                let v: GoInterface | undefined = __gotots_range_value_4;
                OrderedMap$Set$string$SliceOf_string(result, k, ParseStringArray(v));
                __gotots_range_state_1 = 1;
                return true;
            });
            if (__gotots_range_state_1 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_1 = -2;
            return result;
        }
    }
    return void 0;
}
export function ParseString(value: GoInterface | undefined): gostring {
    {
        const __gotots_results_7 = (($value: GoInterface | undefined): [
            gostring,
            boolean
        ] => {
            if (!$goInterfaceAdapter$string.$is($value)) {
                return ["", false];
            }
            return [$value.$go$value, true];
        })(value);
        let str = __gotots_results_7[0];
        let ok = __gotots_results_7[1];
        if (ok) {
            return str;
        }
    }
    return "";
}
export function parseNumber(value: GoInterface | undefined): tsonicTypeScriptRuntime.Location<int> | undefined {
    {
        const __gotots_results_12 = (($value: GoInterface | undefined): [
            int,
            boolean
        ] => {
            if (!$goInterfaceAdapter$int.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })(value);
        let num = __gotots_results_12[0];
        const num$location = tsonicTypeScriptRuntime.boundLocation({}, () => num, num$next => num = num$next);
        let ok = __gotots_results_12[1];
        if (ok) {
            return num$location;
        }
    }
    {
        const __gotots_results_13 = (($value: GoInterface | undefined): [
            float64,
            boolean
        ] => {
            if (!$goInterfaceAdapter$float64.$is($value)) {
                return [0, false];
            }
            return [$value.$go$value, true];
        })(value);
        let num = __gotots_results_13[0];
        let ok = __gotots_results_13[1];
        if (ok) {
            let n = globalThis.Number(BigInt.asIntN(64, goNumberToBigInt(num)));
            const n$location = tsonicTypeScriptRuntime.boundLocation({}, () => n, n$next => n = n$next);
            return n$location;
        }
    }
    return void 0;
}
export function parseProjectReference(json: GoInterface | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined> {
    let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined>();
    {
        const __gotots_results_29 = (($value: GoInterface | undefined): [
            tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(json);
        let v: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_29[0];
        let ok = __gotots_results_29[1];
        if (ok) {
            let reference = ProjectReference__from_core.$zero();
            const reference$location = tsonicTypeScriptRuntime.boundLocation({}, () => reference, reference$next => reference = reference$next);
            {
                const __gotots_results_30 = OrderedMap$Get$string$Interface_void(v, "path");
                let v__shadow_1: GoInterface | undefined = __gotots_results_30[0];
                let ok__shadow_1 = __gotots_results_30[1];
                if (ok__shadow_1) {
                    reference.Path = (($value: GoInterface | undefined): gostring => {
                        if (!$goInterfaceAdapter$string.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(v__shadow_1);
                }
            }
            {
                const __gotots_results_31 = OrderedMap$Get$string$Interface_void(v, "circular");
                let v__shadow_1: GoInterface | undefined = __gotots_results_31[0];
                let ok__shadow_1 = __gotots_results_31[1];
                if (ok__shadow_1) {
                    reference.Circular = (($value: GoInterface | undefined): bool => {
                        if (!$goInterfaceAdapter$bool.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(v__shadow_1);
                }
            }
            result = result.append(void 0, [
                reference$location,
            ]);
        }
    }
    return result;
}
export function parseJsonToStringKey(json: GoInterface | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined {
    let result: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = NewOrderedMapWithSizeHint$string$Interface_void(6);
    {
        const __gotots_results_19 = (($value: GoInterface | undefined): [
            tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(json);
        let m: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_19[0];
        let ok = __gotots_results_19[1];
        if (ok) {
            {
                const __gotots_results_20 = OrderedMap$Get$string$Interface_void(m, "include");
                let v: GoInterface | undefined = __gotots_results_20[0];
                let ok__shadow_1 = __gotots_results_20[1];
                if (ok__shadow_1) {
                    OrderedMap$Set$string$Interface_void(result, "include", v);
                }
            }
            {
                const __gotots_results_21 = OrderedMap$Get$string$Interface_void(m, "exclude");
                let v: GoInterface | undefined = __gotots_results_21[0];
                let ok__shadow_1 = __gotots_results_21[1];
                if (ok__shadow_1) {
                    OrderedMap$Set$string$Interface_void(result, "exclude", v);
                }
            }
            {
                const __gotots_results_22 = OrderedMap$Get$string$Interface_void(m, "files");
                let v: GoInterface | undefined = __gotots_results_22[0];
                let ok__shadow_1 = __gotots_results_22[1];
                if (ok__shadow_1) {
                    OrderedMap$Set$string$Interface_void(result, "files", v);
                }
            }
            {
                const __gotots_results_23 = OrderedMap$Get$string$Interface_void(m, "references");
                let v: GoInterface | undefined = __gotots_results_23[0];
                let ok__shadow_1 = __gotots_results_23[1];
                if (ok__shadow_1) {
                    OrderedMap$Set$string$Interface_void(result, "references", v);
                }
            }
            {
                const __gotots_results_24 = OrderedMap$Get$string$Interface_void(m, "extends");
                let v: GoInterface | undefined = __gotots_results_24[0];
                let ok__shadow_1 = __gotots_results_24[1];
                if (ok__shadow_1) {
                    {
                        const __gotots_results_25 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(v);
                        let str = __gotots_results_25[0];
                        let ok__shadow_2 = __gotots_results_25[1];
                        if (ok__shadow_2) {
                            OrderedMap$Set$string$Interface_void(result, "extends", new $goInterfaceAdapter$SliceOf_Interface_void(RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(str)])));
                        }
                    }
                    OrderedMap$Set$string$Interface_void(result, "extends", v);
                }
            }
            {
                const __gotots_results_26 = OrderedMap$Get$string$Interface_void(m, "compilerOptions");
                let v: GoInterface | undefined = __gotots_results_26[0];
                let ok__shadow_1 = __gotots_results_26[1];
                if (ok__shadow_1) {
                    OrderedMap$Set$string$Interface_void(result, "compilerOptions", v);
                }
            }
            {
                const __gotots_results_27 = OrderedMap$Get$string$Interface_void(m, "excludes");
                let v: GoInterface | undefined = __gotots_results_27[0];
                let ok__shadow_1 = __gotots_results_27[1];
                if (ok__shadow_1) {
                    OrderedMap$Set$string$Interface_void(result, "excludes", v);
                }
            }
            {
                const __gotots_results_28 = OrderedMap$Get$string$Interface_void(m, "typeAcquisition");
                let v: GoInterface | undefined = __gotots_results_28[0];
                let ok__shadow_1 = __gotots_results_28[1];
                if (ok__shadow_1) {
                    OrderedMap$Set$string$Interface_void(result, "typeAcquisition", v);
                }
            }
        }
    }
    return result;
}
export class compilerOptionsParser {
    declare private readonly $goType: void;
    public constructor(public CompilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined) {
    }
    declare private readonly then?: never;
    static ParseOption(o: compilerOptionsParser | undefined, key: gostring, value: GoInterface | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return ParseCompilerOptions(key, value, (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions);
    }
    static UnknownDidYouMeanDiagnostic(o: compilerOptionsParser | undefined): {
        value: Message__from_diagnostics;
    } | undefined {
        return extraKeyDidYouMeanDiagnostics("compilerOptions");
    }
    static UnknownOptionDiagnostic(o: compilerOptionsParser | undefined): {
        value: Message__from_diagnostics;
    } | undefined {
        return extraKeyDiagnostics("compilerOptions");
    }
}
export class watchOptionsParser {
    declare private readonly $goType: void;
    public constructor(public WatchOptions: {
        value: WatchOptions__from_core;
    } | undefined) {
    }
    declare private readonly then?: never;
    static ParseOption(o: watchOptionsParser | undefined, key: gostring, value: GoInterface | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return ParseWatchOptions(key, value, (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).WatchOptions);
    }
}
export class typeAcquisitionParser {
    declare private readonly $goType: void;
    public constructor(public TypeAcquisition: {
        value: TypeAcquisition__from_core;
    } | undefined) {
    }
    declare private readonly then?: never;
    static ParseOption(o: typeAcquisitionParser | undefined, key: gostring, value: GoInterface | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return ParseTypeAcquisition(key, value, (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeAcquisition);
    }
    static UnknownDidYouMeanDiagnostic(o: typeAcquisitionParser | undefined): {
        value: Message__from_diagnostics;
    } | undefined {
        return extraKeyDidYouMeanDiagnostics("typeAcquisition");
    }
    static UnknownOptionDiagnostic(o: typeAcquisitionParser | undefined): {
        value: Message__from_diagnostics;
    } | undefined {
        return extraKeyDiagnostics("typeAcquisition");
    }
}
export class buildOptionsParser {
    declare private readonly $goType: void;
    public constructor(public BuildOptions: {
        value: BuildOptions__from_core;
    } | undefined) {
    }
    declare private readonly then?: never;
    static ParseOption(o: buildOptionsParser | undefined, key: gostring, value: GoInterface | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return ParseBuildOptions(key, value, (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).BuildOptions);
    }
}
export function ParseCompilerOptions(key: gostring, value: GoInterface | undefined, allOptions: {
    value: CompilerOptions__from_core;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (value === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    if (allOptions === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    parseCompilerOptions(key, value, allOptions);
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
}
export function parseCompilerOptions(key: gostring, value: GoInterface | undefined, allOptions: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    let foundKey: bool = false;
    let option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = new CommandLineOptionNameMap($state.CommandLineCompilerOptionsMap).Get(key);
    if (!(option === undefined)) {
        key = CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name;
    }
    switch (key) {
        case "allowJs": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowJs = ParseTristate(value);
            break;
        }
        case "allowImportingTsExtensions": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowImportingTsExtensions = ParseTristate(value);
            break;
        }
        case "allowSyntheticDefaultImports": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowSyntheticDefaultImports = ParseTristate(value);
            break;
        }
        case "allowNonTsExtensions": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowNonTsExtensions = ParseTristate(value);
            break;
        }
        case "allowUmdGlobalAccess": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowUmdGlobalAccess = ParseTristate(value);
            break;
        }
        case "allowUnreachableCode": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowUnreachableCode = ParseTristate(value);
            break;
        }
        case "allowUnusedLabels": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowUnusedLabels = ParseTristate(value);
            break;
        }
        case "allowArbitraryExtensions": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowArbitraryExtensions = ParseTristate(value);
            break;
        }
        case "alwaysStrict": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AlwaysStrict = ParseTristate(value);
            break;
        }
        case "assumeChangesOnlyAffectDirectDependencies": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AssumeChangesOnlyAffectDirectDependencies = ParseTristate(value);
            break;
        }
        case "baseUrl": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUrl = ParseString(value);
            break;
        }
        case "build": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Build = ParseTristate(value);
            break;
        }
        case "checkJs": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckJs = ParseTristate(value);
            break;
        }
        case "customConditions": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CustomConditions = ParseStringArray(value);
            break;
        }
        case "composite": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite = ParseTristate(value);
            break;
        }
        case "declarationDir": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir = ParseString(value);
            break;
        }
        case "deduplicatePackages": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeduplicatePackages = ParseTristate(value);
            break;
        }
        case "diagnostics": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Diagnostics = ParseTristate(value);
            break;
        }
        case "disableSizeLimit": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableSizeLimit = ParseTristate(value);
            break;
        }
        case "disableSourceOfProjectReferenceRedirect": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableSourceOfProjectReferenceRedirect = ParseTristate(value);
            break;
        }
        case "disableSolutionSearching": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableSolutionSearching = ParseTristate(value);
            break;
        }
        case "disableReferencedProjectLoad": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableReferencedProjectLoad = ParseTristate(value);
            break;
        }
        case "declarationMap": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap = ParseTristate(value);
            break;
        }
        case "declaration": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declaration = ParseTristate(value);
            break;
        }
        case "downlevelIteration": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DownlevelIteration = ParseTristate(value);
            break;
        }
        case "erasableSyntaxOnly": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ErasableSyntaxOnly = ParseTristate(value);
            break;
        }
        case "emitDeclarationOnly": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDeclarationOnly = ParseTristate(value);
            break;
        }
        case "extendedDiagnostics": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedDiagnostics = ParseTristate(value);
            break;
        }
        case "emitDecoratorMetadata": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDecoratorMetadata = ParseTristate(value);
            break;
        }
        case "emitBOM": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitBOM = ParseTristate(value);
            break;
        }
        case "esModuleInterop": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ESModuleInterop = ParseTristate(value);
            break;
        }
        case "exactOptionalPropertyTypes": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExactOptionalPropertyTypes = ParseTristate(value);
            break;
        }
        case "explainFiles": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExplainFiles = ParseTristate(value);
            break;
        }
        case "experimentalDecorators": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators = ParseTristate(value);
            break;
        }
        case "forceConsistentCasingInFileNames": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ForceConsistentCasingInFileNames = ParseTristate(value);
            break;
        }
        case "generateCpuProfile": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateCpuProfile = ParseString(value);
            break;
        }
        case "generateTrace": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateTrace = ParseString(value);
            break;
        }
        case "isolatedModules": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedModules = ParseTristate(value);
            break;
        }
        case "ignoreConfig": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IgnoreConfig = ParseTristate(value);
            break;
        }
        case "ignoreDeprecations": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IgnoreDeprecations = ParseString(value);
            break;
        }
        case "importHelpers": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportHelpers = ParseTristate(value);
            break;
        }
        case "incremental": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incremental = ParseTristate(value);
            break;
        }
        case "init": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Init = ParseTristate(value);
            break;
        }
        case "inlineSourceMap": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap = ParseTristate(value);
            break;
        }
        case "inlineSources": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSources = ParseTristate(value);
            break;
        }
        case "isolatedDeclarations": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedDeclarations = ParseTristate(value);
            break;
        }
        case "jsx": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx = floatOrInt32ToFlag$Named_core$JsxEmit(value);
            break;
        }
        case "jsxFactory": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFactory = ParseString(value);
            break;
        }
        case "jsxFragmentFactory": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFragmentFactory = ParseString(value);
            break;
        }
        case "jsxImportSource": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxImportSource = ParseString(value);
            break;
        }
        case "lib": {
            {
                const __gotots_results_1 = (($value: GoInterface | undefined): [
                    RuntimeSlice<gostring>,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return [RuntimeSlice.nil<gostring>(), false];
                    }
                    return [$value.$go$value, true];
                })(value);
                let ok = __gotots_results_1[1];
                if (ok) {
                    (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib = (($value: GoInterface | undefined): RuntimeSlice<gostring> => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(value);
                }
                else {
                    (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib = ParseStringArray(value);
                }
            }
            break;
        }
        case "libReplacement": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LibReplacement = ParseTristate(value);
            break;
        }
        case "listEmittedFiles": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListEmittedFiles = ParseTristate(value);
            break;
        }
        case "listFiles": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListFiles = ParseTristate(value);
            break;
        }
        case "listFilesOnly": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListFilesOnly = ParseTristate(value);
            break;
        }
        case "locale": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Locale = ParseString(value);
            break;
        }
        case "mapRoot": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot = ParseString(value);
            break;
        }
        case "module": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module = floatOrInt32ToFlag$Named_core$ModuleKind(value);
            break;
        }
        case "moduleDetectionKind": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleDetection = floatOrInt32ToFlag$Named_core$ModuleDetectionKind(value);
            break;
        }
        case "moduleResolution": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution = floatOrInt32ToFlag$Named_core$ModuleResolutionKind(value);
            break;
        }
        case "moduleSuffixes": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSuffixes = ParseStringArray(value);
            break;
        }
        case "moduleDetection": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleDetection = floatOrInt32ToFlag$Named_core$ModuleDetectionKind(value);
            break;
        }
        case "noCheck": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoCheck = ParseTristate(value);
            break;
        }
        case "noFallthroughCasesInSwitch": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoFallthroughCasesInSwitch = ParseTristate(value);
            break;
        }
        case "noEmitForJsFiles": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitForJsFiles = ParseTristate(value);
            break;
        }
        case "noErrorTruncation": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoErrorTruncation = ParseTristate(value);
            break;
        }
        case "noImplicitAny": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitAny = ParseTristate(value);
            break;
        }
        case "noImplicitThis": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitThis = ParseTristate(value);
            break;
        }
        case "noLib": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoLib = ParseTristate(value);
            break;
        }
        case "noPropertyAccessFromIndexSignature": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoPropertyAccessFromIndexSignature = ParseTristate(value);
            break;
        }
        case "noUncheckedIndexedAccess": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoUncheckedIndexedAccess = ParseTristate(value);
            break;
        }
        case "noEmitHelpers": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitHelpers = ParseTristate(value);
            break;
        }
        case "noEmitOnError": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitOnError = ParseTristate(value);
            break;
        }
        case "noImplicitReturns": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitReturns = ParseTristate(value);
            break;
        }
        case "noUnusedLocals": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoUnusedLocals = ParseTristate(value);
            break;
        }
        case "noUnusedParameters": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoUnusedParameters = ParseTristate(value);
            break;
        }
        case "noImplicitOverride": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoImplicitOverride = ParseTristate(value);
            break;
        }
        case "noUncheckedSideEffectImports": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoUncheckedSideEffectImports = ParseTristate(value);
            break;
        }
        case "outFile": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile = ParseString(value);
            break;
        }
        case "noResolve": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoResolve = ParseTristate(value);
            break;
        }
        case "paths": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths = parseStringMap(value);
            break;
        }
        case "preserveWatchOutput": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveWatchOutput = ParseTristate(value);
            break;
        }
        case "preserveConstEnums": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveConstEnums = ParseTristate(value);
            break;
        }
        case "preserveSymlinks": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveSymlinks = ParseTristate(value);
            break;
        }
        case "project": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Project = ParseString(value);
            break;
        }
        case "pretty": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pretty = ParseTristate(value);
            break;
        }
        case "resolveJsonModule": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolveJsonModule = ParseTristate(value);
            break;
        }
        case "resolvePackageJsonExports": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonExports = ParseTristate(value);
            break;
        }
        case "resolvePackageJsonImports": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonImports = ParseTristate(value);
            break;
        }
        case "reactNamespace": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReactNamespace = ParseString(value);
            break;
        }
        case "rewriteRelativeImportExtensions": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RewriteRelativeImportExtensions = ParseTristate(value);
            break;
        }
        case "rootDir": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir = ParseString(value);
            break;
        }
        case "rootDirs": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDirs = ParseStringArray(value);
            break;
        }
        case "removeComments": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RemoveComments = ParseTristate(value);
            break;
        }
        case "stableTypeOrdering": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StableTypeOrdering = ParseTristate(value);
            break;
        }
        case "strict": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Strict = ParseTristate(value);
            break;
        }
        case "strictBindCallApply": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictBindCallApply = ParseTristate(value);
            break;
        }
        case "strictBuiltinIteratorReturn": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictBuiltinIteratorReturn = ParseTristate(value);
            break;
        }
        case "strictFunctionTypes": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictFunctionTypes = ParseTristate(value);
            break;
        }
        case "strictNullChecks": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictNullChecks = ParseTristate(value);
            break;
        }
        case "strictPropertyInitialization": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictPropertyInitialization = ParseTristate(value);
            break;
        }
        case "skipDefaultLibCheck": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipDefaultLibCheck = ParseTristate(value);
            break;
        }
        case "sourceMap": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap = ParseTristate(value);
            break;
        }
        case "sourceRoot": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot = ParseString(value);
            break;
        }
        case "stripInternal": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StripInternal = ParseTristate(value);
            break;
        }
        case "suppressOutputPathCheck": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SuppressOutputPathCheck = ParseTristate(value);
            break;
        }
        case "target": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target = floatOrInt32ToFlag$Named_core$ScriptTarget(value);
            break;
        }
        case "traceResolution": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TraceResolution = ParseTristate(value);
            break;
        }
        case "tsBuildInfoFile": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TsBuildInfoFile = ParseString(value);
            break;
        }
        case "typeRoots": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeRoots = ParseStringArray(value);
            break;
        }
        case "types": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Types = ParseStringArray(value);
            break;
        }
        case "useDefineForClassFields": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseDefineForClassFields = ParseTristate(value);
            break;
        }
        case "useUnknownInCatchVariables": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UseUnknownInCatchVariables = ParseTristate(value);
            break;
        }
        case "verbatimModuleSyntax": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax = ParseTristate(value);
            break;
        }
        case "version": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Version = ParseTristate(value);
            break;
        }
        case "help": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Help = ParseTristate(value);
            break;
        }
        case "all": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.All = ParseTristate(value);
            break;
        }
        case "maxNodeModuleJsDepth": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MaxNodeModuleJsDepth = parseNumber(value);
            break;
        }
        case "skipLibCheck": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipLibCheck = ParseTristate(value);
            break;
        }
        case "noEmit": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit = ParseTristate(value);
            break;
        }
        case "showConfig": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ShowConfig = ParseTristate(value);
            break;
        }
        case "configFilePath": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath = ParseString(value);
            break;
        }
        case "noDtsResolution": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoDtsResolution = ParseTristate(value);
            break;
        }
        case "pathsBasePath": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PathsBasePath = ParseString(value);
            break;
        }
        case "outDir": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir = ParseString(value);
            break;
        }
        case "newLine": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine = floatOrInt32ToFlag$Named_core$NewLineKind(value);
            break;
        }
        case "watch": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch = ParseTristate(value);
            break;
        }
        case "pprofDir": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PprofDir = ParseString(value);
            break;
        }
        case "singleThreaded": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SingleThreaded = ParseTristate(value);
            break;
        }
        case "quiet": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Quiet = ParseTristate(value);
            break;
        }
        case "checkers": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Checkers = parseNumber(value);
            break;
        }
        default: {
            return false;
            break;
        }
    }
    return true;
}
export function floatOrInt32ToFlag$kernel<T>($go$convert$float64_to_T0: ($0: float64) => T, $go$interface_assert_ok$Interface_void_to_T0_bool: ($0: GoInterface | undefined) => [
    T,
    bool
], value: GoInterface | undefined): T {
    {
        const __gotots_results_10 = $go$interface_assert_ok$Interface_void_to_T0_bool(value);
        let v: T = __gotots_results_10[0];
        let ok = __gotots_results_10[1];
        if (ok) {
            return v;
        }
    }
    return $go$convert$float64_to_T0((($value: GoInterface | undefined): float64 => {
        if (!$goInterfaceAdapter$float64.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(value));
}
export function ParseWatchOptions(key: gostring, value: GoInterface | undefined, allOptions: {
    value: WatchOptions__from_core;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (allOptions === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    switch (key) {
        case "watchInterval": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Interval = parseNumber(value);
            break;
        }
        case "watchFile": {
            if (!(value === undefined)) {
                (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileKind = (($value: GoInterface | undefined): WatchFileKind__from_core => {
                    if (!$goInterfaceAdapter$Named_core$WatchFileKind.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(value);
            }
            break;
        }
        case "watchDirectory": {
            if (!(value === undefined)) {
                (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DirectoryKind = (($value: GoInterface | undefined): WatchDirectoryKind__from_core => {
                    if (!$goInterfaceAdapter$Named_core$WatchDirectoryKind.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(value);
            }
            break;
        }
        case "fallbackPolling": {
            if (!(value === undefined)) {
                (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FallbackPolling = (($value: GoInterface | undefined): PollingKind__from_core => {
                    if (!$goInterfaceAdapter$Named_core$PollingKind.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })(value);
            }
            break;
        }
        case "synchronousWatchDirectory": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SyncWatchDir = ParseTristate(value);
            break;
        }
        case "excludeDirectories": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExcludeDir = ParseStringArray(value);
            break;
        }
        case "excludeFiles": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExcludeFiles = ParseStringArray(value);
            break;
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
}
export function ParseTypeAcquisition(key: gostring, value: GoInterface | undefined, allOptions: {
    value: TypeAcquisition__from_core;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (value === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    if (allOptions === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    switch (key) {
        case "enable": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enable = ParseTristate(value);
            break;
        }
        case "include": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Include = ParseStringArray(value);
            break;
        }
        case "exclude": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Exclude = ParseStringArray(value);
            break;
        }
        case "disableFilenameBasedTypeAcquisition": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableFilenameBasedTypeAcquisition = ParseTristate(value);
            break;
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
}
export function ParseBuildOptions(key: gostring, value: GoInterface | undefined, allOptions: {
    value: BuildOptions__from_core;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (value === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    if (allOptions === undefined) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    let option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = NameMap.Get($state.BuildNameMap, key);
    if (!(option === undefined)) {
        key = CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name;
    }
    switch (key) {
        case "clean": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clean = ParseTristate(value);
            break;
        }
        case "dry": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Dry = ParseTristate(value);
            break;
        }
        case "force": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Force = ParseTristate(value);
            break;
        }
        case "builders": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Builders = parseNumber(value);
            break;
        }
        case "stopBuildOnErrors": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StopBuildOnErrors = ParseTristate(value);
            break;
        }
        case "verbose": {
            (allOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Verbose = ParseTristate(value);
            break;
        }
    }
    return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
}
export function mergeCompilerOptions(targetOptions: {
    value: CompilerOptions__from_core;
} | undefined, sourceOptions: {
    value: CompilerOptions__from_core;
} | undefined, rawSource: GoInterface | undefined): {
    value: CompilerOptions__from_core;
} | undefined {
    if (sourceOptions === undefined) {
        return targetOptions;
    }
    let explicitNullFields = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.nil();
    });
    const explicitNullFields$location = tsonicTypeScriptRuntime.boundLocation({}, () => explicitNullFields, explicitNullFields$next => explicitNullFields = explicitNullFields$next);
    if (!(rawSource === undefined)) {
        {
            const __gotots_results_14 = (($value: GoInterface | undefined): [
                tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
                boolean
            ] => {
                if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void.$is($value)) {
                    return [void 0, false];
                }
                return [$value.$go$value, true];
            })(rawSource);
            let rawMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_14[0];
            let ok = __gotots_results_14[1];
            if (ok && !(rawMap === undefined)) {
                {
                    const __gotots_results_15 = OrderedMap$Get$string$Interface_void(rawMap, "compilerOptions");
                    let compilerOptionsRaw: GoInterface | undefined = __gotots_results_15[0];
                    let exists = __gotots_results_15[1];
                    if (exists) {
                        {
                            const __gotots_results_16 = (($value: GoInterface | undefined): [
                                tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined,
                                boolean
                            ] => {
                                if (!$goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void.$is($value)) {
                                    return [void 0, false];
                                }
                                return [$value.$go$value, true];
                            })(compilerOptionsRaw);
                            let compilerOptionsMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = __gotots_results_16[0];
                            let ok__shadow_1 = __gotots_results_16[1];
                            if (ok__shadow_1) {
                                const __gotots_range_3 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(compilerOptionsMap));
                                if (__gotots_range_3 === void 0) {
                                    GoPanic.raiseRuntime("call of nil function");
                                }
                                let __gotots_range_state_2 = 1;
                                __gotots_range_3(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
                                    const __gotots_range_value_5 = $argument0;
                                    const __gotots_range_value_6 = $argument1;
                                    let key = __gotots_range_value_5;
                                    let value: GoInterface | undefined = __gotots_range_value_6;
                                    if (value === undefined) {
                                        Set$Add$string(explicitNullFields$location, key);
                                    }
                                    __gotots_range_state_2 = 1;
                                    return true;
                                });
                                if (__gotots_range_state_2 === -1) {
                                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                                }
                                __gotots_range_state_2 = -2;
                            }
                        }
                    }
                }
            }
        }
    }
    let targetValue = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions(targetOptions)).Elem();
    let sourceValue = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions(sourceOptions)).Elem();
    let targetType: reflect__from_gostdlib.Type | undefined = targetValue.Type();
    const __gotots_range_4 = globalThis.Number(BigInt.asIntN(64, targetValue.NumField()));
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_4; __gotots_range_index_1++) {
        const __gotots_range_value_7 = __gotots_range_index_1;
        let i = __gotots_range_value_7;
        let targetField = targetValue.Field(BigInt.asIntN(64, goNumberToBigInt(i)));
        let sourceField = sourceValue.Field(BigInt.asIntN(64, goNumberToBigInt(i)));
        {
            const __gotots_receiver_0 = targetType;
            const __gotots_argument_0 = i;
            let jsonTag = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_0))).Tag.Get("json");
            if (jsonTag !== "") {
                {
                    const __gotots_results_18 = strings__from_gostdlib.Cut(jsonTag, ",");
                    let jsonFieldName = __gotots_results_18[0];
                    if (jsonFieldName !== "" && Set__from_collections.Has<gostring>(explicitNullFields$location, jsonFieldName)) {
                        targetField.SetZero();
                        continue;
                    }
                }
            }
        }
        if (!sourceField.IsZero()) {
            targetField.Set(named_reflect.ReflectValueOperations.$copy(sourceField));
        }
    }
    return targetOptions;
}
export function convertToOptionsWithAbsolutePaths(optionsBase: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, optionMap: CommandLineOptionNameMap, cwd: gostring): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined {
    if (optionsBase === undefined) {
        return void 0;
    }
    const __gotots_range_0 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(optionsBase));
    if (__gotots_range_0 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    __gotots_range_0(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
        const __gotots_range_value_1 = $argument1;
        let o = __gotots_range_value_0;
        let v: GoInterface | undefined = __gotots_range_value_1;
        const __gotots_results_0 = ConvertOptionToAbsolutePath(o, v, optionMap, cwd);
        let result: GoInterface | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            OrderedMap$Set$string$Interface_void(optionsBase, o, result);
        }
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    return optionsBase;
}
export function ConvertOptionToAbsolutePath(o: gostring, v: GoInterface | undefined, optionMap: CommandLineOptionNameMap, cwd: gostring): [
    GoInterface | undefined,
    bool
] {
    let option: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = optionMap.Get(o);
    if (option === undefined) {
        return [void 0, false];
    }
    if (((void CommandLineOptionKind,
        CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)
        ===
            ((void CommandLineOptionKind,
                "list") as string)) {
        if (CommandLineOption.$storageOf(((CommandLineOption.Elements(option) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).IsFilePath) {
            {
                const __gotots_results_2 = (($value: GoInterface | undefined): [
                    RuntimeSlice<gostring>,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return [RuntimeSlice.nil<gostring>(), false];
                    }
                    return [$value.$go$value, true];
                })(v);
                let arr = __gotots_results_2[0];
                let ok = __gotots_results_2[1];
                if (ok) {
                    return [new GoInterfaceAdapter(Map$string$string(arr, (item: gostring): gostring => {
                            return GetNormalizedAbsolutePath__from_tspath(item, cwd);
                        })), true];
                }
            }
            {
                const __gotots_results_3 = (($value: GoInterface | undefined): [
                    RuntimeSlice<GoInterface | undefined>,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                        return [RuntimeSlice.nil<GoInterface | undefined>(), false];
                    }
                    return [$value.$go$value, true];
                })(v);
                let arr = __gotots_results_3[0];
                let ok = __gotots_results_3[1];
                if (ok) {
                    return [new $goInterfaceAdapter$SliceOf_Interface_void(Map$Interface_void$Interface_void(arr, (item: GoInterface | undefined): GoInterface | undefined => {
                            {
                                const __gotots_results_4 = (($value: GoInterface | undefined): [
                                    gostring,
                                    boolean
                                ] => {
                                    if (!$goInterfaceAdapter$string.$is($value)) {
                                        return ["", false];
                                    }
                                    return [$value.$go$value, true];
                                })(item);
                                let s = __gotots_results_4[0];
                                let isStr = __gotots_results_4[1];
                                if (isStr) {
                                    return new $goInterfaceAdapter$string(GetNormalizedAbsolutePath__from_tspath(s, cwd));
                                }
                            }
                            return item;
                        })), true];
                }
            }
        }
    }
    else if (CommandLineOption.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).IsFilePath) {
        {
            const __gotots_results_5 = (($value: GoInterface | undefined): [
                gostring,
                boolean
            ] => {
                if (!$goInterfaceAdapter$string.$is($value)) {
                    return ["", false];
                }
                return [$value.$go$value, true];
            })(v);
            let value = __gotots_results_5[0];
            let ok = __gotots_results_5[1];
            if (ok) {
                return [new $goInterfaceAdapter$string(GetNormalizedAbsolutePath__from_tspath(value, cwd)), true];
            }
        }
    }
    return [void 0, false];
}
