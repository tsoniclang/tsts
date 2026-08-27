import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { System } from "./compile.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { JsxEmitReactJSX$constant as JsxEmitReactJSX$constant__from_core, ModuleDetectionKindForce$constant as ModuleDetectionKindForce$constant__from_core, ModuleKindNodeNext$constant as ModuleKindNodeNext$constant__from_core, ScriptTargetESNext$constant as ScriptTargetESNext$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { MarshalIndent as MarshalIndent__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { $state as $state__tsoptions, CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { CombinePaths as CombinePaths__from_tspath, NormalizePath as NormalizePath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { OrderedMap$Entries$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$Get$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Get.js";
import { OrderedMap$GetOrZero$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$GetOrZero.js";
import { OrderedMap$Keys$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Keys.js";
import { OrderedMap$Size$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { Delete$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/Delete.js";
import { Index$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$Named_core$JsxEmit, $goInterfaceAdapter$Named_core$ModuleDetectionKind, $goInterfaceAdapter$Named_core$ModuleKind, $goInterfaceAdapter$Named_core$ScriptTarget, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$bool, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import "../../../../../../../support/reflection-types.js";
import { getHeader } from "./help.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function WriteConfigFile(sys: System | undefined, locale__shadow_1: Locale__from_locale, reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, options: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): void {
    const __gotots_receiver_0 = sys;
    let getCurrentDirectory = goInterfaceNonNil<System>(__gotots_receiver_0).GetCurrentDirectory();
    let file = NormalizePath__from_tspath(CombinePaths__from_tspath(getCurrentDirectory, RuntimeSlice.literal<gostring>(["tsconfig.json"])));
    const __gotots_receiver_1 = sys;
    const __gotots_receiver_2 = goInterfaceNonNil<System>(__gotots_receiver_1).FS();
    const __gotots_argument_0 = file;
    if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).FileExists(__gotots_argument_0)) {
        const __gotots_callee_0 = reportDiagnostic;
        const __gotots_argument_1 = NewCompilerDiagnostic__from_ast($state__diagnostics.A_tsconfig_json_file_is_already_defined_at_Colon_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(file)]));
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
    }
    else {
        const __gotots_receiver_3 = sys;
        const __gotots_receiver_4 = goInterfaceNonNil<System>(__gotots_receiver_3).FS();
        const __gotots_argument_2 = file;
        const __gotots_argument_3 = generateTSConfig(options, Locale__from_locale.$copy(locale__shadow_1));
        goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_4).WriteFile(__gotots_argument_2, __gotots_argument_3);
        let output = RuntimeSlice.literal<gostring>(["\n"]);
        output = goSliceAppendSlice<gostring>(output, getHeader(sys, "Created a new tsconfig.json"), "");
        output = output.append("", ["You can learn more at https://aka.ms/tsconfig", "\n"]);
        const __gotots_receiver_5 = sys;
        const __gotots_argument_4 = goInterfaceNonNil<System>(__gotots_receiver_5).Writer();
        const __gotots_argument_5 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Join(output, ""))]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_4), __gotots_argument_5);
    }
}
export function generateTSConfig(options: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, locale__shadow_1: Locale__from_locale): gostring {
    let result = RuntimeSlice.nil<gostring>();
    let allSetOptions = RuntimeSlice.make<gostring>(0, OrderedMap$Size$string$Interface_void(options), "");
    const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(OrderedMap$Keys$string$Interface_void(options));
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
        if (k !== "init" && k !== "help" && k !== "watch") {
            allSetOptions = allSetOptions.append("", [k]);
        }
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    __gotots_range_state_0 = -2;
    let emitHeader: (($0: {
        value: Message__from_diagnostics;
    } | undefined) => void) | undefined = (header: {
        value: Message__from_diagnostics;
    } | undefined): void => {
        result = result.append("", ["    // " + Message__from_diagnostics.Localize(header, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>())]);
    };
    let newline: (() => void) | undefined = (): void => {
        result = result.append("", [""]);
    };
    let push: (($0: RuntimeSlice<gostring>) => void) | undefined = (args: RuntimeSlice<gostring>): void => {
        result = goSliceAppendSlice<gostring>(result, args, "");
    };
    let formatSingleValue: (($0: GoInterface | undefined, $1: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined) => gostring) | undefined = (value: GoInterface | undefined, enumMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined): gostring => {
        if (!(enumMap === undefined)) {
            let found = false;
            const __gotots_range_1 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(enumMap));
            if (__gotots_range_1 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_1 = 1;
            __gotots_range_1(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
                const __gotots_range_value_1 = $argument0;
                const __gotots_range_value_2 = $argument1;
                let k = __gotots_range_value_1;
                let v: GoInterface | undefined = __gotots_range_value_2;
                if (goInterfaceEqual(value, v)) {
                    value = new GoInterfaceAdapter(k);
                    found = true;
                    __gotots_range_state_1 = 0;
                    return false;
                }
                __gotots_range_state_1 = 1;
                return true;
            });
            if (__gotots_range_state_1 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_1 = -2;
            if (!found) {
                const __gotots_argument_6 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("No matching value of %v", RuntimeSlice.literal<GoInterface | undefined>([value])));
                GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
            }
        }
        const __gotots_results_0 = MarshalIndent__from_json__package_1(value, "", "");
        let b = __gotots_results_0[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_0[1];
        if (!(err === undefined)) {
            const __gotots_argument_7 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("should not happen: %v", RuntimeSlice.literal<GoInterface | undefined>([err])));
            GoPanic.raise(__gotots_argument_7 === undefined ? GoPanicNilValue.create() : __gotots_argument_7);
        }
        const __gotots_conversion_0 = b;
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    };
    let formatValueOrArray: (($0: gostring, $1: GoInterface | undefined) => gostring) | undefined = (settingName: gostring, value: GoInterface | undefined): gostring => {
        let option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined = void 0;
        const __gotots_range_2 = $state__tsoptions.OptionsDeclarations;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_2.length; __gotots_range_index_0++) {
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_0);
            let decl: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined = __gotots_range_value_3;
            if (CommandLineOption__from_tsoptions.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Name === settingName) {
                option = decl;
            }
        }
        if (option === undefined) {
            const __gotots_argument_8 = new GoInterfaceAdapter("No option named " + settingName);
            GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
        }
        let rval = reflect__from_gostdlib.ValueOf(value);
        if (named_reflect.ReflectKindValueOperations.$project(rval.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Slice)) {
            let enumMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = void 0;
            {
                let elemOption: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined = CommandLineOption__from_tsoptions.Elements(option);
                if (!(elemOption === undefined)) {
                    enumMap = CommandLineOption__from_tsoptions.EnumMap(elemOption);
                }
            }
            let elems = RuntimeSlice.nil<gostring>();
            const __gotots_range_3 = globalThis.Number(BigInt.asIntN(64, rval.Len()));
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_3; __gotots_range_index_1++) {
                const __gotots_range_value_4 = __gotots_range_index_1;
                let i = __gotots_range_value_4;
                const __gotots_argument_11 = elems;
                const __gotots_callee_1 = formatSingleValue;
                const __gotots_argument_9 = rval.Index(BigInt.asIntN(64, goNumberToBigInt(i))).Interface();
                const __gotots_argument_10 = enumMap;
                const __gotots_argument_12 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10);
                elems = __gotots_argument_11.append("", [__gotots_argument_12]);
            }
            return "[" + strings__from_gostdlib.Join(elems, ", ") + "]";
        }
        else {
            const __gotots_callee_2 = formatSingleValue;
            const __gotots_argument_13 = value;
            const __gotots_argument_14 = CommandLineOption__from_tsoptions.EnumMap(option);
            return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14);
        }
    };
    class commented {
        declare private readonly $goType: void;
        constructor(public readonly $value: int) {
        }
        declare private readonly then?: never;
    }
    const commentedNever: commented = new commented(0);
    const commentedAlways: commented = new commented(1);
    const commentedOptional: commented = new commented(2);
    let emitOption: (($0: gostring, $1: GoInterface | undefined, $2: commented) => void) | undefined = (setting: gostring, defaultValue: GoInterface | undefined, commented__shadow_1: commented): void => {
        if (commented__shadow_1.$value > 2) {
            const __gotots_argument_15 = new GoInterfaceAdapter("should not happen: invalid `commented`, must be a bug.");
            GoPanic.raise(__gotots_argument_15 === undefined ? GoPanicNilValue.create() : __gotots_argument_15);
        }
        let existingOptionIndex = Index$SliceOf_string$string(allSetOptions, setting);
        if (existingOptionIndex >= 0) {
            allSetOptions = Delete$SliceOf_string$string(allSetOptions, existingOptionIndex, existingOptionIndex + 1);
        }
        let comment = false;
        switch (commented__shadow_1.$value) {
            case 1: {
                comment = true;
                break;
            }
            case 0: {
                comment = false;
                break;
            }
            default: {
                comment = !OrderedMap__from_collections.Has<gostring, GoInterface | undefined>(options, setting);
                break;
            }
        }
        const __gotots_results_1 = OrderedMap$Get$string$Interface_void(options, setting);
        let value: GoInterface | undefined = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (!ok) {
            value = defaultValue;
        }
        if (comment) {
            const __gotots_callee_4 = push;
            const __gotots_binary_operand_0 = "    // \"" + setting + "\": ";
            const __gotots_callee_3 = formatValueOrArray;
            const __gotots_argument_16 = setting;
            const __gotots_argument_17 = value;
            const __gotots_binary_operand_1 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17);
            const __gotots_binary_operand_2 = __gotots_binary_operand_0 + __gotots_binary_operand_1;
            const __gotots_binary_operand_3 = ",";
            const __gotots_argument_18 = __gotots_binary_operand_2 + __gotots_binary_operand_3;
            const __gotots_argument_19 = RuntimeSlice.literal<gostring>([__gotots_argument_18]);
            (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
        }
        else {
            const __gotots_callee_6 = push;
            const __gotots_binary_operand_4 = "    \"" + setting + "\": ";
            const __gotots_callee_5 = formatValueOrArray;
            const __gotots_argument_20 = setting;
            const __gotots_argument_21 = value;
            const __gotots_binary_operand_5 = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20, __gotots_argument_21);
            const __gotots_binary_operand_6 = __gotots_binary_operand_4 + __gotots_binary_operand_5;
            const __gotots_binary_operand_7 = ",";
            const __gotots_argument_22 = __gotots_binary_operand_6 + __gotots_binary_operand_7;
            const __gotots_argument_23 = RuntimeSlice.literal<gostring>([__gotots_argument_22]);
            (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
        }
    };
    const __gotots_callee_7 = push;
    const __gotots_argument_24 = RuntimeSlice.literal<gostring>(["{"]);
    (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
    const __gotots_callee_8 = push;
    const __gotots_argument_25 = RuntimeSlice.literal<gostring>(["  // " + Message__from_diagnostics.Localize($state__diagnostics.Visit_https_Colon_Slash_Slashaka_ms_Slashtsconfig_to_read_more_about_this_file, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>())]);
    (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25);
    const __gotots_callee_9 = push;
    const __gotots_argument_26 = RuntimeSlice.literal<gostring>(["  \"compilerOptions\": {"]);
    (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26);
    const __gotots_callee_10 = emitHeader;
    const __gotots_argument_27 = $state__diagnostics.File_Layout;
    (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
    const __gotots_callee_11 = emitOption;
    const __gotots_argument_28 = "rootDir";
    const __gotots_argument_29 = new GoInterfaceAdapter("./src");
    const __gotots_argument_30 = commentedOptional;
    (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28, __gotots_argument_29, __gotots_argument_30);
    const __gotots_callee_12 = emitOption;
    const __gotots_argument_31 = "outDir";
    const __gotots_argument_32 = new GoInterfaceAdapter("./dist");
    const __gotots_argument_33 = commentedOptional;
    (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
    const __gotots_callee_13 = newline;
    (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_callee_14 = emitHeader;
    const __gotots_argument_34 = $state__diagnostics.Environment_Settings;
    (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_34);
    const __gotots_callee_15 = emitHeader;
    const __gotots_argument_35 = $state__diagnostics.See_also_https_Colon_Slash_Slashaka_ms_Slashtsconfig_Slashmodule;
    (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_35);
    const __gotots_callee_16 = emitOption;
    const __gotots_argument_36 = "module";
    const __gotots_argument_37 = new $goInterfaceAdapter$Named_core$ModuleKind(ModuleKindNodeNext$constant__from_core());
    const __gotots_argument_38 = commentedNever;
    (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36, __gotots_argument_37, __gotots_argument_38);
    const __gotots_callee_17 = emitOption;
    const __gotots_argument_39 = "target";
    const __gotots_argument_40 = new $goInterfaceAdapter$Named_core$ScriptTarget(ScriptTargetESNext$constant__from_core());
    const __gotots_argument_41 = commentedNever;
    (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_39, __gotots_argument_40, __gotots_argument_41);
    const __gotots_callee_18 = emitOption;
    const __gotots_argument_42 = "types";
    const __gotots_argument_43 = new $goInterfaceAdapter$SliceOf_Interface_void(RuntimeSlice.literal<GoInterface | undefined>([]));
    const __gotots_argument_44 = commentedNever;
    (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42, __gotots_argument_43, __gotots_argument_44);
    {
        const __gotots_results_2 = OrderedMap$Get$string$Interface_void(options, "lib");
        let lib: GoInterface | undefined = __gotots_results_2[0];
        let ok = __gotots_results_2[1];
        if (ok) {
            const __gotots_callee_19 = emitOption;
            const __gotots_argument_45 = "lib";
            const __gotots_argument_46 = lib;
            const __gotots_argument_47 = commentedNever;
            (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45, __gotots_argument_46, __gotots_argument_47);
        }
    }
    const __gotots_callee_20 = emitHeader;
    const __gotots_argument_48 = $state__diagnostics.For_nodejs_Colon;
    (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48);
    const __gotots_callee_21 = push;
    const __gotots_argument_49 = RuntimeSlice.literal<gostring>(["    // \"lib\": [\"esnext\"],"]);
    (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_49);
    const __gotots_callee_22 = push;
    const __gotots_argument_50 = RuntimeSlice.literal<gostring>(["    // \"types\": [\"node\"],"]);
    (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_50);
    const __gotots_callee_23 = emitHeader;
    const __gotots_argument_51 = $state__diagnostics.X_and_npm_install_D_types_Slashnode;
    (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_51);
    const __gotots_callee_24 = newline;
    (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_callee_25 = emitHeader;
    const __gotots_argument_52 = $state__diagnostics.Other_Outputs;
    (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_52);
    const __gotots_callee_26 = emitOption;
    const __gotots_argument_53 = "sourceMap";
    const __gotots_argument_54 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_55 = commentedNever;
    (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_53, __gotots_argument_54, __gotots_argument_55);
    const __gotots_callee_27 = emitOption;
    const __gotots_argument_56 = "declaration";
    const __gotots_argument_57 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_58 = commentedNever;
    (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
    const __gotots_callee_28 = emitOption;
    const __gotots_argument_59 = "declarationMap";
    const __gotots_argument_60 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_61 = commentedNever;
    (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
    const __gotots_callee_29 = newline;
    (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_callee_30 = emitHeader;
    const __gotots_argument_62 = $state__diagnostics.Stricter_Typechecking_Options;
    (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_62);
    const __gotots_callee_31 = emitOption;
    const __gotots_argument_63 = "noUncheckedIndexedAccess";
    const __gotots_argument_64 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_65 = commentedNever;
    (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63, __gotots_argument_64, __gotots_argument_65);
    const __gotots_callee_32 = emitOption;
    const __gotots_argument_66 = "exactOptionalPropertyTypes";
    const __gotots_argument_67 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_68 = commentedNever;
    (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_66, __gotots_argument_67, __gotots_argument_68);
    const __gotots_callee_33 = newline;
    (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_callee_34 = emitHeader;
    const __gotots_argument_69 = $state__diagnostics.Style_Options;
    (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_69);
    const __gotots_callee_35 = emitOption;
    const __gotots_argument_70 = "noImplicitReturns";
    const __gotots_argument_71 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_72 = commentedOptional;
    (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_70, __gotots_argument_71, __gotots_argument_72);
    const __gotots_callee_36 = emitOption;
    const __gotots_argument_73 = "noImplicitOverride";
    const __gotots_argument_74 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_75 = commentedOptional;
    (__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_73, __gotots_argument_74, __gotots_argument_75);
    const __gotots_callee_37 = emitOption;
    const __gotots_argument_76 = "noUnusedLocals";
    const __gotots_argument_77 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_78 = commentedOptional;
    (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_76, __gotots_argument_77, __gotots_argument_78);
    const __gotots_callee_38 = emitOption;
    const __gotots_argument_79 = "noUnusedParameters";
    const __gotots_argument_80 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_81 = commentedOptional;
    (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_79, __gotots_argument_80, __gotots_argument_81);
    const __gotots_callee_39 = emitOption;
    const __gotots_argument_82 = "noFallthroughCasesInSwitch";
    const __gotots_argument_83 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_84 = commentedOptional;
    (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_82, __gotots_argument_83, __gotots_argument_84);
    const __gotots_callee_40 = emitOption;
    const __gotots_argument_85 = "noPropertyAccessFromIndexSignature";
    const __gotots_argument_86 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_87 = commentedOptional;
    (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_85, __gotots_argument_86, __gotots_argument_87);
    const __gotots_callee_41 = newline;
    (__gotots_callee_41 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_callee_42 = emitHeader;
    const __gotots_argument_88 = $state__diagnostics.Recommended_Options;
    (__gotots_callee_42 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_88);
    const __gotots_callee_43 = emitOption;
    const __gotots_argument_89 = "strict";
    const __gotots_argument_90 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_91 = commentedNever;
    (__gotots_callee_43 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_89, __gotots_argument_90, __gotots_argument_91);
    const __gotots_callee_44 = emitOption;
    const __gotots_argument_92 = "jsx";
    const __gotots_argument_93 = new $goInterfaceAdapter$Named_core$JsxEmit(JsxEmitReactJSX$constant__from_core());
    const __gotots_argument_94 = commentedNever;
    (__gotots_callee_44 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_92, __gotots_argument_93, __gotots_argument_94);
    const __gotots_callee_45 = emitOption;
    const __gotots_argument_95 = "verbatimModuleSyntax";
    const __gotots_argument_96 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_97 = commentedNever;
    (__gotots_callee_45 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_95, __gotots_argument_96, __gotots_argument_97);
    const __gotots_callee_46 = emitOption;
    const __gotots_argument_98 = "isolatedModules";
    const __gotots_argument_99 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_100 = commentedNever;
    (__gotots_callee_46 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_98, __gotots_argument_99, __gotots_argument_100);
    const __gotots_callee_47 = emitOption;
    const __gotots_argument_101 = "noUncheckedSideEffectImports";
    const __gotots_argument_102 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_103 = commentedNever;
    (__gotots_callee_47 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_101, __gotots_argument_102, __gotots_argument_103);
    const __gotots_callee_48 = emitOption;
    const __gotots_argument_104 = "moduleDetection";
    const __gotots_argument_105 = new $goInterfaceAdapter$Named_core$ModuleDetectionKind(ModuleDetectionKindForce$constant__from_core());
    const __gotots_argument_106 = commentedNever;
    (__gotots_callee_48 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_104, __gotots_argument_105, __gotots_argument_106);
    const __gotots_callee_49 = emitOption;
    const __gotots_argument_107 = "skipLibCheck";
    const __gotots_argument_108 = new $goInterfaceAdapter$bool(true);
    const __gotots_argument_109 = commentedNever;
    (__gotots_callee_49 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_107, __gotots_argument_108, __gotots_argument_109);
    if (allSetOptions.length > 0) {
        const __gotots_callee_50 = newline;
        (__gotots_callee_50 ?? GoPanic.raiseRuntime("call of nil function"))();
        for (; allSetOptions.length > 0;) {
            const __gotots_callee_51 = emitOption;
            const __gotots_argument_110 = allSetOptions.get(0);
            const __gotots_argument_111 = OrderedMap$GetOrZero$string$Interface_void(options, allSetOptions.get(0));
            const __gotots_argument_112 = commentedNever;
            (__gotots_callee_51 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_110, __gotots_argument_111, __gotots_argument_112);
        }
    }
    const __gotots_callee_52 = push;
    const __gotots_argument_113 = RuntimeSlice.literal<gostring>(["  }"]);
    (__gotots_callee_52 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_113);
    const __gotots_callee_53 = push;
    const __gotots_argument_114 = RuntimeSlice.literal<gostring>(["}"]);
    (__gotots_callee_53 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_114);
    const __gotots_callee_54 = push;
    const __gotots_argument_115 = RuntimeSlice.literal<gostring>([""]);
    (__gotots_callee_54 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_115);
    return strings__from_gostdlib.Join(result, "\n");
}
