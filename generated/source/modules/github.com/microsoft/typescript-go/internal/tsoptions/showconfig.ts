import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ProjectReference as ProjectReference__from_core, Tristate as Tristate__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { TsConfigSourceFile, configFileSpecs } from "./tsconfigparsing.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/state.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetRelativePathFromFile as GetRelativePathFromFile__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewOrderedMapWithSizeHint$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewOrderedMapWithSizeHint.js";
import { OrderedMap$Delete$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Delete.js";
import { OrderedMap$Entries$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Keys$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { OrderedMap$Set$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { $goInterfaceAdapter$Named_core$Tristate, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void, $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$bool, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Interface_void } from "../../../../../../support/maps.js";
import { $goReflectType$Named_core$CompilerOptions, $goReflectType$PointerTo_Named_core$CompilerOptions } from "../../../../../../support/reflection-types.js";
import "../../../../../../support/reflection-types.js";
import { CommandLineOption, CommandLineOptionKind } from "./commandlineoption.js";
import { ParsedCommandLine } from "./parsedcommandline.js";
import { CommandLineOptionNameMap, defaultIncludeSpec$string } from "./tsconfigparsing.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function computeFn$kernel<T>($go$interface_adapt$T0_to_Interface_void: ($0: T) => GoInterface | undefined, fn: (($0: {
    value: CompilerOptions__from_core;
} | undefined) => T) | undefined): (($0: {
    value: CompilerOptions__from_core;
} | undefined) => GoInterface | undefined) | undefined {
    return (opts: {
        value: CompilerOptions__from_core;
    } | undefined): GoInterface | undefined => {
        const __gotots_callee_2 = fn;
        const __gotots_argument_3 = opts;
        const __gotots_argument_4 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
        return $go$interface_adapt$T0_to_Interface_void(__gotots_argument_4);
    };
}
export type impliedOption$Storage = {
    name: gostring;
    dependencies: RuntimeSlice<gostring>;
    compute: (($0: {
        value: CompilerOptions__from_core;
    } | undefined) => GoInterface | undefined) | undefined;
};
export class impliedOption {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: impliedOption$Storage) {
    }
    public static $storageOf($source: impliedOption): impliedOption$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: impliedOption$Storage): impliedOption {
        return new impliedOption($source);
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    public get dependencies(): RuntimeSlice<gostring> {
        return this.$storage.dependencies;
    }
    public set dependencies($value: RuntimeSlice<gostring>) {
        this.$storage.dependencies = $value;
    }
    public get compute(): (($0: {
        value: CompilerOptions__from_core;
    } | undefined) => GoInterface | undefined) | undefined {
        return this.$storage.compute;
    }
    public set compute($value: (($0: {
        value: CompilerOptions__from_core;
    } | undefined) => GoInterface | undefined) | undefined) {
        this.$storage.compute = $value;
    }
    static $copy($source: impliedOption): impliedOption {
        return new impliedOption({
            name: $source.$storage.name,
            dependencies: $source.$storage.dependencies,
            compute: $source.$storage.compute
        });
    }
    declare private readonly then?: never;
}
export class TSConfig {
    declare private readonly $goType: void;
    public constructor(public CompilerOptions: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, public References: RuntimeSlice<GoInterface | undefined>, public Files: RuntimeSlice<gostring>, public Include: RuntimeSlice<gostring>, public Exclude: RuntimeSlice<gostring>, public CompileOnSave: tsonicTypeScriptRuntime.Location<bool> | undefined) {
    }
    static $copy($source: TSConfig): TSConfig {
        return new TSConfig($source.CompilerOptions, $source.References, $source.Files, $source.Include, $source.Exclude, $source.CompileOnSave);
    }
    declare private readonly then?: never;
}
export function ConvertToTSConfig(configParseResult: tsonicTypeScriptRuntime.Location<ParsedCommandLine> | undefined, configFileName: gostring): {
    value: TSConfig;
} | undefined {
    if (configFileName === "") {
        configFileName = "tsconfig.json";
    }
    let normalizedConfigPath = GetNormalizedAbsolutePath__from_tspath(configFileName, ParsedCommandLine.GetCurrentDirectory(configParseResult));
    let comparePathsOptions = new ComparePathsOptions__from_tspath(ParsedCommandLine.UseCaseSensitiveFileNames(configParseResult), ParsedCommandLine.GetCurrentDirectory(configParseResult));
    let files = RuntimeSlice.nil<gostring>();
    const __gotots_range_0 = ParsedCommandLine.FileNames(configParseResult);
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let f = __gotots_range_value_0;
        let normalizedFilePath = GetNormalizedAbsolutePath__from_tspath(f, ParsedCommandLine.GetCurrentDirectory(configParseResult));
        let relativePath = GetRelativePathFromFile__from_tspath(normalizedConfigPath, normalizedFilePath, ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
        files = files.append("", [relativePath]);
    }
    let optionMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = serializeCompilerOptions(ParsedCommandLine.CompilerOptions(configParseResult), normalizedConfigPath, ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
    const __gotots_range_1 = RuntimeSlice.literal<gostring>(["showConfig", "configFile", "configFilePath", "help", "init", "listFilesOnly", "listEmittedFiles", "project", "build", "version"]);
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let name = __gotots_range_value_1;
        OrderedMap$Delete$string$Interface_void(optionMap, name);
    }
    addImpliedOptions(optionMap, ParsedCommandLine.CompilerOptions(configParseResult), normalizedConfigPath, ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
    let config: {
        value: TSConfig;
    } | undefined = { value: new TSConfig(optionMap, RuntimeSlice.nil<GoInterface | undefined>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), void 0) };
    {
        let refs = ParsedCommandLine.ProjectReferences(configParseResult);
        if (refs.length > 0) {
            let references = RuntimeSlice.nil<GoInterface | undefined>();
            const __gotots_range_2 = refs;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let r: tsonicTypeScriptRuntime.Location<ProjectReference__from_core> | undefined = __gotots_range_value_2;
                const __gotots_struct_0 = OrderedMap__from_collections.$zero<gostring, GoInterface | undefined>((): GoMapValue<gostring, GoInterface | undefined> => {
                    return $goMap$MapOf_string_To_Interface_void.nil();
                });
                let ref: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = tsonicTypeScriptRuntime.location<OrderedMap__from_collections<gostring, GoInterface | undefined>>(__gotots_struct_0);
                OrderedMap$Set$string$Interface_void(ref, "path", new GoInterfaceAdapter(((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProjectReference__from_core>).value.OriginalPath));
                if (((r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProjectReference__from_core>).value.Circular) {
                    OrderedMap$Set$string$Interface_void(ref, "circular", new $goInterfaceAdapter$bool(true));
                }
                references = references.append(void 0, [new $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void(ref)]);
            }
            (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.References = references;
        }
    }
    if (files.length > 0) {
        (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Files = files;
    }
    if (!(((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile === undefined) && !((((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs === undefined)) {
        let specs: tsonicTypeScriptRuntime.Location<configFileSpecs> | undefined = (((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configFileSpecs;
        let include = filterSameAsDefaultInclude(((specs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedIncludeSpecs);
        if (include.length > 0) {
            (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Include = include;
        }
        (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Exclude = ((specs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<configFileSpecs>).value.validatedExcludeSpecs;
    }
    if (!(((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.CompileOnSave === undefined) &&
        ((((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine>).value.CompileOnSave ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<bool>).value) {
        let t = true;
        const t$location = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next => t = t$next);
        (config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompileOnSave =
            t$location;
    }
    return config;
}
export function filterSameAsDefaultInclude(specs: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
    if (specs.length === 0) {
        return RuntimeSlice.nil<gostring>();
    }
    if (specs.length === 1 && specs.get(0) === defaultIncludeSpec$string) {
        return RuntimeSlice.nil<gostring>();
    }
    return specs;
}
export function getNameOfCompilerOptionValue(value: GoInterface | undefined, enumMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): gostring {
    const __gotots_range_9 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(enumMap));
    if (__gotots_range_9 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_2 = 1;
    let __gotots_range_return_0: gostring = "";
    __gotots_range_9(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
        const __gotots_range_value_11 = $argument0;
        const __gotots_range_value_12 = $argument1;
        let k = __gotots_range_value_11;
        let v: GoInterface | undefined = __gotots_range_value_12;
        if (goInterfaceEqual(v, value)) {
            __gotots_range_return_0 = k;
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
        return __gotots_range_return_0;
    }
    __gotots_range_state_2 = -2;
    return "";
}
export function serializeCompilerOptions(options: {
    value: CompilerOptions__from_core;
} | undefined, configFilePath: gostring, comparePathsOptions: ComparePathsOptions__from_tspath): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined {
    let result: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = NewOrderedMapWithSizeHint$string$Interface_void(32);
    let configDir = GetDirectoryPath__from_tspath(configFilePath);
    let optionsValue = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_core$CompilerOptions(options)).Elem();
    let optionsTypeInfo: reflect__from_gostdlib.Type | undefined = $goReflectType$Named_core$CompilerOptions;
    const __gotots_range_3 = globalThis.Number(BigInt.asIntN(64, optionsValue.NumField()));
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_index_3;
        let i = __gotots_range_value_3;
        const __gotots_receiver_0 = optionsTypeInfo;
        const __gotots_argument_0 = i;
        let field = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_0).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_0)));
        if (!field.IsExported()) {
            continue;
        }
        let optionDecl: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = new CommandLineOptionNameMap($state.CommandLineCompilerOptionsMap).Get(field.Name);
        if (optionDecl === undefined) {
            continue;
        }
        if (CommandLineOption.$storageOf(((optionDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Category
            ===
                $state__diagnostics.Command_line_Options
            ||
                CommandLineOption.$storageOf(((optionDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Category
                    ===
                        $state__diagnostics.Output_Formatting) {
            continue;
        }
        let fieldValue = optionsValue.Field(BigInt.asIntN(64, goNumberToBigInt(i)));
        if (fieldValue.IsZero()) {
            continue;
        }
        let name = CommandLineOption.$storageOf(((optionDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name;
        let value: GoInterface | undefined = fieldValue.Interface();
        let enumMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = CommandLineOption.EnumMap(optionDecl);
        if (!(enumMap === undefined)) {
            let serialized = serializeEnumValue(value, enumMap);
            if (serialized !== "") {
                OrderedMap$Set$string$Interface_void(result, name, new GoInterfaceAdapter(serialized));
            }
            continue;
        }
        switch (((void CommandLineOptionKind,
            CommandLineOption.$storageOf(((optionDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Kind) as string)) {
            case "listOrElement": {
                Assert__from_debug(false, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("listOrElement option should not reach serialization")]));
                break;
            }
            case "list": {
                let elem: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = CommandLineOption.Elements(optionDecl);
                if (!(elem === undefined) && CommandLineOption.$storageOf(((elem ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).IsFilePath) {
                    {
                        const __gotots_results_0 = (($value: GoInterface | undefined): [
                            RuntimeSlice<gostring>,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$SliceOf_string.$is($value)) {
                                return [RuntimeSlice.nil<gostring>(), false];
                            }
                            return [$value.$go$value, true];
                        })(value);
                        let strs = __gotots_results_0[0];
                        let ok = __gotots_results_0[1];
                        if (ok) {
                            let relPaths = RuntimeSlice.make<gostring>(strs.length, null, "");
                            const __gotots_range_4 = strs;
                            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                                const __gotots_range_value_4 = __gotots_range_index_4;
                                const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
                                let j = __gotots_range_value_4;
                                let s = __gotots_range_value_5;
                                let absPath = GetNormalizedAbsolutePath__from_tspath(s, configDir);
                                relPaths.set(j, GetRelativePathFromFile__from_tspath(configFilePath, absPath, ComparePathsOptions__from_tspath.$copy(comparePathsOptions)));
                            }
                            OrderedMap$Set$string$Interface_void(result, name, new $goInterfaceAdapter$SliceOf_string(relPaths));
                            continue;
                        }
                    }
                }
                if (!(elem === undefined) && !(CommandLineOption.EnumMap(elem) === undefined)) {
                    let elemMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = CommandLineOption.EnumMap(elem);
                    {
                        const __gotots_results_1 = (($value: GoInterface | undefined): [
                            RuntimeSlice<gostring>,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$SliceOf_string.$is($value)) {
                                return [RuntimeSlice.nil<gostring>(), false];
                            }
                            return [$value.$go$value, true];
                        })(value);
                        let strs = __gotots_results_1[0];
                        let ok = __gotots_results_1[1];
                        if (ok) {
                            let serialized = RuntimeSlice.make<gostring>(0, strs.length, "");
                            const __gotots_range_5 = strs;
                            for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                                const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
                                let s = __gotots_range_value_6;
                                let found = getNameOfCompilerOptionValue(new GoInterfaceAdapter(s), elemMap);
                                if (found !== "") {
                                    serialized = serialized.append("", [found]);
                                }
                                else {
                                    serialized = serialized.append("", [s]);
                                }
                            }
                            OrderedMap$Set$string$Interface_void(result, name, new $goInterfaceAdapter$SliceOf_string(serialized));
                            continue;
                        }
                    }
                }
                OrderedMap$Set$string$Interface_void(result, name, value);
                break;
            }
            case "string": {
                if (CommandLineOption.$storageOf(((optionDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).IsFilePath) {
                    {
                        const __gotots_results_2 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(value);
                        let s = __gotots_results_2[0];
                        let ok = __gotots_results_2[1];
                        if (ok && s !== "") {
                            let absPath = GetNormalizedAbsolutePath__from_tspath(s, configDir);
                            OrderedMap$Set$string$Interface_void(result, name, new GoInterfaceAdapter(GetRelativePathFromFile__from_tspath(configFilePath, absPath, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))));
                            continue;
                        }
                    }
                }
                OrderedMap$Set$string$Interface_void(result, name, value);
                break;
            }
            case "boolean": {
                {
                    const __gotots_results_3 = (($value: GoInterface | undefined): [
                        Tristate__from_core,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$Named_core$Tristate.$is($value)) {
                            return [0, false];
                        }
                        return [$value.$go$value, true];
                    })(value);
                    let t = __gotots_results_3[0];
                    let ok = __gotots_results_3[1];
                    if (ok) {
                        if (Tristate_IsTrue__from_core(t)) {
                            OrderedMap$Set$string$Interface_void(result, name, new $goInterfaceAdapter$bool(true));
                        }
                        else if (Tristate_IsFalse__from_core(t)) {
                            OrderedMap$Set$string$Interface_void(result, name, new $goInterfaceAdapter$bool(false));
                        }
                    }
                    else {
                        OrderedMap$Set$string$Interface_void(result, name, value);
                    }
                }
                break;
            }
            case "number": {
                OrderedMap$Set$string$Interface_void(result, name, value);
                break;
            }
            default: {
                OrderedMap$Set$string$Interface_void(result, name, value);
                break;
            }
        }
    }
    return result;
}
export function serializeEnumValue(value: GoInterface | undefined, enumMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): gostring {
    let rv = reflect__from_gostdlib.ValueOf(value);
    if (rv.CanInt()) {
        let intVal = rv.Int();
        const __gotots_range_8 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(enumMap));
        if (__gotots_range_8 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_1 = 1;
        let __gotots_range_return_0: gostring = "";
        __gotots_range_8(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
            const __gotots_range_value_9 = $argument0;
            const __gotots_range_value_10 = $argument1;
            let k = __gotots_range_value_9;
            let v: GoInterface | undefined = __gotots_range_value_10;
            let ev = reflect__from_gostdlib.ValueOf(v);
            if (ev.CanInt() && ev.Int() === intVal) {
                __gotots_range_return_0 = k;
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
            return __gotots_range_return_0;
        }
        __gotots_range_state_1 = -2;
    }
    return getNameOfCompilerOptionValue(value, enumMap);
}
export function addImpliedOptions(optionMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, $2: gostring, $3: ComparePathsOptions__from_tspath): void {
    let provided: GoMapValue<gostring, bool> = GoMap.make<gostring, bool>(false, OrderedMap$Size$string$Interface_void(optionMap), []);
    const __gotots_range_6 = named_iter.IterSeqValueOperations.$project(OrderedMap$Keys$string$Interface_void(optionMap));
    if (__gotots_range_6 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    __gotots_range_6(($argument0: gostring): bool => {
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
        const __gotots_range_value_7 = $argument0;
        let k = __gotots_range_value_7;
        provided.store(k, true);
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    const __gotots_struct_1 = CompilerOptions__from_core.$zero();
    let defaultOpts: {
        value: CompilerOptions__from_core;
    } | undefined = { value: __gotots_struct_1 };
    const __gotots_range_7 = $state.impliedOptions;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
        const __gotots_range_value_8 = impliedOption.$copy(impliedOption.$fromStorage(__gotots_range_7.get(__gotots_range_index_6)));
        let entry = __gotots_range_value_8;
        let optionDecl: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = new CommandLineOptionNameMap($state.CommandLineCompilerOptionsMap).Get(impliedOption.$storageOf(entry).name);
        if (optionDecl === undefined) {
            continue;
        }
        if (provided.lookup(CommandLineOption.$storageOf(((optionDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)) {
            continue;
        }
        if (!anyDependencyProvided(impliedOption.$storageOf(entry).dependencies, provided)) {
            continue;
        }
        const __gotots_callee_0 = impliedOption.$storageOf(entry).compute;
        const __gotots_argument_1 = options;
        let implied: GoInterface | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        const __gotots_callee_1 = impliedOption.$storageOf(entry).compute;
        const __gotots_argument_2 = defaultOpts;
        let defaultVal: GoInterface | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        if (reflect__from_gostdlib.DeepEqual(implied, defaultVal)) {
            continue;
        }
        let serialized: GoInterface | undefined = serializeImpliedOptionValue(optionDecl, implied);
        if (serialized === undefined) {
            continue;
        }
        OrderedMap$Set$string$Interface_void(optionMap, CommandLineOption.$storageOf(((optionDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name, serialized);
    }
}
export function anyDependencyProvided(dependencies: RuntimeSlice<gostring>, provided: GoMapValue<gostring, bool>): bool {
    const __gotots_range_10 = dependencies;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_10.length; __gotots_range_index_7++) {
        const __gotots_range_value_13 = __gotots_range_10.get(__gotots_range_index_7);
        let dep = __gotots_range_value_13;
        let depDecl: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined = new CommandLineOptionNameMap($state.CommandLineCompilerOptionsMap).Get(dep);
        if (!(depDecl === undefined) && provided.lookup(CommandLineOption.$storageOf(((depDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption>).value).Name)) {
            return true;
        }
    }
    return false;
}
export function serializeImpliedOptionValue(optionDecl: tsonicTypeScriptRuntime.Location<CommandLineOption> | undefined, value: GoInterface | undefined): GoInterface | undefined {
    if (value === undefined) {
        return void 0;
    }
    let enumMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = CommandLineOption.EnumMap(optionDecl);
    if (!(enumMap === undefined)) {
        let s = serializeEnumValue(value, enumMap);
        if (s !== "") {
            return new GoInterfaceAdapter(s);
        }
        return void 0;
    }
    const __gotots_type_switch_0: GoInterface | undefined = value;
    switch (true) {
        case $goInterfaceAdapter$bool.$is(__gotots_type_switch_0): {
            let v: bool = __gotots_type_switch_0.$go$value;
            return new $goInterfaceAdapter$bool(v);
            break;
        }
        case $goInterfaceAdapter$Named_core$Tristate.$is(__gotots_type_switch_0): {
            let v: Tristate__from_core = __gotots_type_switch_0.$go$value;
            if (Tristate_IsTrue__from_core(v)) {
                return new $goInterfaceAdapter$bool(true);
            }
            else if (Tristate_IsFalse__from_core(v)) {
                return new $goInterfaceAdapter$bool(false);
            }
            return void 0;
            break;
        }
    }
    return value;
}
