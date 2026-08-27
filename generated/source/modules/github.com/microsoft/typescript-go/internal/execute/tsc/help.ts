import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { CommandLineOption$Storage as CommandLineOption__from_tsoptions$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { System } from "./compile.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { TSUnknown$constant as TSUnknown$constant__from_core, Tristate_IsFalseOrUnknown as Tristate_IsFalseOrUnknown__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, Version as Version__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics, Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { $state as $state__tsoptions, CommandLineOptionKind as CommandLineOptionKind__from_tsoptions, CommandLineOptionTypeEnum$constant as CommandLineOptionTypeEnum$constant__from_tsoptions, CommandLineOptionTypeList$constant as CommandLineOptionTypeList$constant__from_tsoptions, CommandLineOptionTypeListOrElement$constant as CommandLineOptionTypeListOrElement$constant__from_tsoptions, CommandLineOptionTypeObject$constant as CommandLineOptionTypeObject$constant__from_tsoptions, CommandLineOption as CommandLineOption__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { NewOrderedMapWithSizeHint$Interface_void$SliceOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewOrderedMapWithSizeHint.js";
import { OrderedMap$Entries$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { OrderedMap$GetOrZero$Interface_void$SliceOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$GetOrZero.js";
import { OrderedMap$Set$Interface_void$SliceOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { OrderedMap$Size$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Size.js";
import { OrderedMap$Values$Interface_void$SliceOf_string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Values.js";
import { Filter$PointerTo_Named_tsoptions$CommandLineOption } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { IfElse$PointerTo_Named_tsoptions$CommandLineOption, IfElse$int, IfElse$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Clone$SliceOf_PointerTo_Named_tsoptions$CommandLineOption$PointerTo_Named_tsoptions$CommandLineOption } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { SortFunc$SliceOf_PointerTo_Named_tsoptions$CommandLineOption$PointerTo_Named_tsoptions$CommandLineOption } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_core$Tristate, $goInterfaceAdapter$PointerTo_Named_diagnostics$Message, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_SliceOf_PointerTo_Named_tsoptions$CommandLineOption as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { colors, createColors } from "./diagnostics.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function PrintVersion(sys: System | undefined, locale__shadow_1: Locale__from_locale): void {
    const __gotots_receiver_0 = sys;
    const __gotots_argument_0 = goInterfaceNonNil<System>(__gotots_receiver_0).Writer();
    const __gotots_argument_1 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Message__from_diagnostics.Localize($state__diagnostics.Version_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Version__from_core())])))]);
    provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1);
}
export function PrintHelp(sys: System | undefined, locale__shadow_1: Locale__from_locale, commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): void {
    if (Tristate_IsFalseOrUnknown__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.All)) {
        printEasyHelp(sys, Locale__from_locale.$copy(locale__shadow_1), getOptionsForHelp(commandLine));
    }
    else {
        printAllHelp(sys, Locale__from_locale.$copy(locale__shadow_1), getOptionsForHelp(commandLine));
    }
}
export function getOptionsForHelp(commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined> {
    let opts = Clone$SliceOf_PointerTo_Named_tsoptions$CommandLineOption$PointerTo_Named_tsoptions$CommandLineOption($state__tsoptions.OptionsDeclarations);
    opts = opts.append(void 0, [
        tsonicTypeScriptRuntime.projectLocation<CommandLineOption__from_tsoptions$Storage, CommandLineOption__from_tsoptions>(tsonicTypeScriptRuntime.propertyLocation($state__tsoptions, "TscBuildOption"), ($go$storage: CommandLineOption__from_tsoptions$Storage): CommandLineOption__from_tsoptions => {
            return CommandLineOption__from_tsoptions.$fromStorage($go$storage);
        }, ($go$value: CommandLineOption__from_tsoptions): CommandLineOption__from_tsoptions$Storage => {
            return CommandLineOption__from_tsoptions.$storageOf($go$value);
        }),
    ]);
    if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.All)) {
        SortFunc$SliceOf_PointerTo_Named_tsoptions$CommandLineOption$PointerTo_Named_tsoptions$CommandLineOption(opts, (a: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, b: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): int => {
            return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(strings__from_gostdlib.ToLower(CommandLineOption__from_tsoptions.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Name), strings__from_gostdlib.ToLower(CommandLineOption__from_tsoptions.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Name))));
        });
        return opts;
    }
    else {
        return Filter$PointerTo_Named_tsoptions$CommandLineOption(opts, (opt: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): bool => {
            return CommandLineOption__from_tsoptions.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).ShowInSimplifiedHelpView;
        });
    }
}
export function getHeader(sys: System | undefined, message: gostring): RuntimeSlice<gostring> {
    let colors__shadow_1: colors | undefined = createColors(sys);
    let header = RuntimeSlice.make<gostring>(0, 3, "");
    const __gotots_receiver_2 = sys;
    let terminalWidth = goInterfaceNonNil<System>(__gotots_receiver_2).GetWidthOfTerminal();
    const tsIcon$string: gostring = "     ";
    const tsIconTS$string: gostring = "  TS ";
    const tsIconLength: int = 5;
    let tsIconFirstLine = colors.$go$private$tsc$blueBackground(colors__shadow_1, tsIcon$string);
    let tsIconSecondLine = colors.$go$private$tsc$blueBackground(colors__shadow_1, colors.$go$private$tsc$brightWhite(colors__shadow_1, tsIconTS$string));
    if (terminalWidth >= message.length + tsIconLength) {
        let rightAlign = IfElse$int(terminalWidth > 120, 120, terminalWidth);
        let leftAlign = rightAlign - tsIconLength;
        header = header.append("", [fmt__from_gostdlib.Sprintf("%-*s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(leftAlign), new GoInterfaceAdapter(message)])), tsIconFirstLine, "\n"]);
        header = header.append("", [strings__from_gostdlib.Repeat(" ", BigInt.asIntN(64, goNumberToBigInt(leftAlign))), tsIconSecondLine, "\n"]);
    }
    else {
        header = header.append("", [message, "\n", "\n"]);
    }
    return header;
}
export function printEasyHelp(sys: System | undefined, locale__shadow_1: Locale__from_locale, simpleOptions: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): void {
    let colors__shadow_1: colors | undefined = createColors(sys);
    let output = RuntimeSlice.nil<gostring>();
    let example: (($0: RuntimeSlice<gostring>, $1: {
        value: Message__from_diagnostics;
    } | undefined) => void) | undefined = (examples: RuntimeSlice<gostring>, desc: {
        value: Message__from_diagnostics;
    } | undefined): void => {
        const __gotots_range_3 = examples;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let example__shadow_1 = __gotots_range_value_3;
            output = output.append("", ["  ", colors.$go$private$tsc$blue(colors__shadow_1, example__shadow_1), "\n"]);
        }
        output = output.append("", ["  ", Message__from_diagnostics.Localize(desc, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), "\n", "\n"]);
    };
    let msg = Message__from_diagnostics.Localize($state__diagnostics.X_tsc_Colon_The_TypeScript_Compiler, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()) + " - " + Message__from_diagnostics.Localize($state__diagnostics.Version_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Version__from_core())]));
    output = goSliceAppendSlice<gostring>(output, getHeader(sys, msg), "");
    output = output.append("", [colors.$go$private$tsc$bold(colors__shadow_1, Message__from_diagnostics.Localize($state__diagnostics.COMMON_COMMANDS, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>())), "\n", "\n"]);
    const __gotots_callee_0 = example;
    const __gotots_argument_4 = RuntimeSlice.literal<gostring>(["tsc"]);
    const __gotots_argument_5 = $state__diagnostics.Compiles_the_current_project_tsconfig_json_in_the_working_directory;
    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
    const __gotots_callee_1 = example;
    const __gotots_argument_6 = RuntimeSlice.literal<gostring>(["tsc app.ts util.ts"]);
    const __gotots_argument_7 = $state__diagnostics.Ignoring_tsconfig_json_compiles_the_specified_files_with_default_compiler_options;
    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
    const __gotots_callee_2 = example;
    const __gotots_argument_8 = RuntimeSlice.literal<gostring>(["tsc -b"]);
    const __gotots_argument_9 = $state__diagnostics.Build_a_composite_project_in_the_working_directory;
    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
    const __gotots_callee_3 = example;
    const __gotots_argument_10 = RuntimeSlice.literal<gostring>(["tsc --init"]);
    const __gotots_argument_11 = $state__diagnostics.Creates_a_tsconfig_json_with_the_recommended_settings_in_the_working_directory;
    (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11);
    const __gotots_callee_4 = example;
    const __gotots_argument_12 = RuntimeSlice.literal<gostring>(["tsc -p ./path/to/tsconfig.json"]);
    const __gotots_argument_13 = $state__diagnostics.Compiles_the_TypeScript_project_located_at_the_specified_path;
    (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13);
    const __gotots_callee_5 = example;
    const __gotots_argument_14 = RuntimeSlice.literal<gostring>(["tsc --help --all"]);
    const __gotots_argument_15 = $state__diagnostics.An_expanded_version_of_this_information_showing_all_possible_compiler_options;
    (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14, __gotots_argument_15);
    const __gotots_callee_6 = example;
    const __gotots_argument_16 = RuntimeSlice.literal<gostring>(["tsc --noEmit", "tsc --target esnext"]);
    const __gotots_argument_17 = $state__diagnostics.Compiles_the_current_project_with_additional_settings;
    (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17);
    let cliCommands = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>();
    let configOpts = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>();
    const __gotots_range_4 = simpleOptions;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let opt: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined = __gotots_range_value_4;
        if (CommandLineOption__from_tsoptions.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).IsCommandLineOnly ||
            CommandLineOption__from_tsoptions.$storageOf(((opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Category
                ===
                    $state__diagnostics.Command_line_Options) {
            cliCommands = cliCommands.append(void 0, [opt]);
        }
        else {
            configOpts = configOpts.append(void 0, [opt]);
        }
    }
    output = goSliceAppendSlice<gostring>(output, generateSectionOptionsOutput(sys, Locale__from_locale.$copy(locale__shadow_1), Message__from_diagnostics.Localize($state__diagnostics.COMMAND_LINE_FLAGS, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), cliCommands, false, void 0, void 0), "");
    let after = Message__from_diagnostics.Localize($state__diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("https://aka.ms/tsc")]));
    const after$location = tsonicTypeScriptRuntime.boundLocation({}, () => after, after$next => after = after$next);
    output = goSliceAppendSlice<gostring>(output, generateSectionOptionsOutput(sys, Locale__from_locale.$copy(locale__shadow_1), Message__from_diagnostics.Localize($state__diagnostics.COMMON_COMPILER_OPTIONS, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), configOpts, false, void 0, after$location), "");
    const __gotots_range_5 = output;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let chunk = __gotots_range_value_5;
        const __gotots_receiver_3 = sys;
        const __gotots_argument_18 = goInterfaceNonNil<System>(__gotots_receiver_3).Writer();
        const __gotots_argument_19 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(chunk)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_18), __gotots_argument_19);
    }
}
export function printAllHelp(sys: System | undefined, locale__shadow_1: Locale__from_locale, options: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): void {
    let output = RuntimeSlice.nil<gostring>();
    let msg = Message__from_diagnostics.Localize($state__diagnostics.X_tsc_Colon_The_TypeScript_Compiler, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()) + " - " + Message__from_diagnostics.Localize($state__diagnostics.Version_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Version__from_core())]));
    output = goSliceAppendSlice<gostring>(output, getHeader(sys, msg), "");
    let afterCompilerOptions = Message__from_diagnostics.Localize($state__diagnostics.You_can_learn_about_all_of_the_compiler_options_at_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("https://aka.ms/tsc")]));
    const afterCompilerOptions$location = tsonicTypeScriptRuntime.boundLocation({}, () => afterCompilerOptions, afterCompilerOptions$next => afterCompilerOptions = afterCompilerOptions$next);
    output = goSliceAppendSlice<gostring>(output, generateSectionOptionsOutput(sys, Locale__from_locale.$copy(locale__shadow_1), Message__from_diagnostics.Localize($state__diagnostics.ALL_COMPILER_OPTIONS, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), options, true, void 0, afterCompilerOptions$location), "");
    let beforeWatchOptions = Message__from_diagnostics.Localize($state__diagnostics.Including_watch_w_will_start_watching_the_current_project_for_the_file_changes_Once_set_you_can_config_watch_mode_with_Colon, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>());
    const beforeWatchOptions$location = tsonicTypeScriptRuntime.boundLocation({}, () => beforeWatchOptions, beforeWatchOptions$next => beforeWatchOptions = beforeWatchOptions$next);
    output = goSliceAppendSlice<gostring>(output, generateSectionOptionsOutput(sys, Locale__from_locale.$copy(locale__shadow_1), Message__from_diagnostics.Localize($state__diagnostics.WATCH_OPTIONS, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), $state__tsoptions.OptionsForWatch, false, beforeWatchOptions$location, void 0), "");
    let beforeBuildOptions = Message__from_diagnostics.Localize($state__diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("https://aka.ms/tsc-composite-builds")]));
    const beforeBuildOptions$location = tsonicTypeScriptRuntime.boundLocation({}, () => beforeBuildOptions, beforeBuildOptions$next => beforeBuildOptions = beforeBuildOptions$next);
    let buildOptions = Filter$PointerTo_Named_tsoptions$CommandLineOption($state__tsoptions.OptionsForBuild, (option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation(option, tsonicTypeScriptRuntime.projectLocation<CommandLineOption__from_tsoptions$Storage, CommandLineOption__from_tsoptions>(tsonicTypeScriptRuntime.propertyLocation($state__tsoptions, "TscBuildOption"), ($go$storage: CommandLineOption__from_tsoptions$Storage): CommandLineOption__from_tsoptions => {
            return CommandLineOption__from_tsoptions.$fromStorage($go$storage);
        }, ($go$value: CommandLineOption__from_tsoptions): CommandLineOption__from_tsoptions$Storage => {
            return CommandLineOption__from_tsoptions.$storageOf($go$value);
        }));
    });
    output = goSliceAppendSlice<gostring>(output, generateSectionOptionsOutput(sys, Locale__from_locale.$copy(locale__shadow_1), Message__from_diagnostics.Localize($state__diagnostics.BUILD_OPTIONS, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), buildOptions, false, beforeBuildOptions$location, void 0), "");
    const __gotots_range_6 = output;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let chunk = __gotots_range_value_6;
        const __gotots_receiver_4 = sys;
        const __gotots_argument_20 = goInterfaceNonNil<System>(__gotots_receiver_4).Writer();
        const __gotots_argument_21 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(chunk)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_20), __gotots_argument_21);
    }
}
export function PrintBuildHelp(sys: System | undefined, locale__shadow_1: Locale__from_locale, buildOptions: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): void {
    let output = RuntimeSlice.nil<gostring>();
    output = goSliceAppendSlice<gostring>(output, getHeader(sys, Message__from_diagnostics.Localize($state__diagnostics.X_tsc_Colon_The_TypeScript_Compiler, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()) + " - " + Message__from_diagnostics.Localize($state__diagnostics.Version_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Version__from_core())]))), "");
    let before = Message__from_diagnostics.Localize($state__diagnostics.Using_build_b_will_make_tsc_behave_more_like_a_build_orchestrator_than_a_compiler_This_is_used_to_trigger_building_composite_projects_which_you_can_learn_more_about_at_0, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("https://aka.ms/tsc-composite-builds")]));
    const before$location = tsonicTypeScriptRuntime.boundLocation({}, () => before, before$next => before = before$next);
    let options = Filter$PointerTo_Named_tsoptions$CommandLineOption(buildOptions, (option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation(option, tsonicTypeScriptRuntime.projectLocation<CommandLineOption__from_tsoptions$Storage, CommandLineOption__from_tsoptions>(tsonicTypeScriptRuntime.propertyLocation($state__tsoptions, "TscBuildOption"), ($go$storage: CommandLineOption__from_tsoptions$Storage): CommandLineOption__from_tsoptions => {
            return CommandLineOption__from_tsoptions.$fromStorage($go$storage);
        }, ($go$value: CommandLineOption__from_tsoptions): CommandLineOption__from_tsoptions$Storage => {
            return CommandLineOption__from_tsoptions.$storageOf($go$value);
        }));
    });
    output = goSliceAppendSlice<gostring>(output, generateSectionOptionsOutput(sys, Locale__from_locale.$copy(locale__shadow_1), Message__from_diagnostics.Localize($state__diagnostics.BUILD_OPTIONS, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), options, false, before$location, void 0), "");
    const __gotots_range_0 = output;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let chunk = __gotots_range_value_0;
        const __gotots_receiver_1 = sys;
        const __gotots_argument_2 = goInterfaceNonNil<System>(__gotots_receiver_1).Writer();
        const __gotots_argument_3 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(chunk)]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_2), __gotots_argument_3);
    }
}
export function generateSectionOptionsOutput(sys: System | undefined, locale__shadow_1: Locale__from_locale, sectionName: gostring, options: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>, subCategory: bool, beforeOptionsDescription: tsonicTypeScriptRuntime.Location<gostring> | undefined, afterOptionsDescription: tsonicTypeScriptRuntime.Location<gostring> | undefined): RuntimeSlice<gostring> {
    let output: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
    output = output.append("", [colors.$go$private$tsc$bold(createColors(sys), sectionName), "\n", "\n"]);
    if (!(beforeOptionsDescription === undefined)) {
        output = output.append("", [
            ((beforeOptionsDescription ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value, "\n", "\n"]);
    }
    if (!subCategory) {
        output = goSliceAppendSlice<gostring>(output, generateGroupOptionOutput(sys, Locale__from_locale.$copy(locale__shadow_1), options), "");
        if (!(afterOptionsDescription === undefined)) {
            output = output.append("", [
                ((afterOptionsDescription ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value, "\n", "\n"]);
        }
        return output;
    }
    let categoryMap: GoMapValue<gostring, RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>> = GoMap.make(0, []);
    let categoryOrder = RuntimeSlice.nil<gostring>();
    const __gotots_range_1 = options;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined = __gotots_range_value_1;
        if (CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Category === undefined) {
            continue;
        }
        let curCategory = Message__from_diagnostics.Localize(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Category, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>());
        {
            const __gotots_results_0 = categoryMap.lookupOk(curCategory);
            let exists = __gotots_results_0[1];
            if (!exists) {
                categoryOrder = categoryOrder.append("", [curCategory]);
            }
        }
        categoryMap.store(curCategory, categoryMap.lookup(curCategory).append(void 0, [option]));
    }
    const __gotots_range_2 = categoryOrder;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let key = __gotots_range_value_2;
        let value = categoryMap.lookup(key);
        output = output.append("", ["### ", key, "\n", "\n"]);
        output = goSliceAppendSlice<gostring>(output, generateGroupOptionOutput(sys, Locale__from_locale.$copy(locale__shadow_1), value), "");
    }
    if (!(afterOptionsDescription === undefined)) {
        output = output.append("", [
            ((afterOptionsDescription ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<gostring>).value, "\n", "\n"]);
    }
    return output;
}
export function generateGroupOptionOutput(sys: System | undefined, locale__shadow_1: Locale__from_locale, optionsList: RuntimeSlice<tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>): RuntimeSlice<gostring> {
    let maxLength = 0;
    const __gotots_range_7 = optionsList;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
        let option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined = __gotots_range_value_7;
        let curLenght = getDisplayNameTextOfOption(option).length;
        maxLength = globalThis.Math.max(curLenght, maxLength);
    }
    let rightAlignOfLeftPart = maxLength + 2;
    let leftAlignOfRightPart = rightAlignOfLeftPart + 2;
    let lines = RuntimeSlice.nil<gostring>();
    const __gotots_range_8 = optionsList;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
        let option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined = __gotots_range_value_8;
        let tmp = generateOptionOutput(sys, Locale__from_locale.$copy(locale__shadow_1), option, rightAlignOfLeftPart, leftAlignOfRightPart);
        lines = goSliceAppendSlice<gostring>(lines, tmp, "");
    }
    if (lines.length < 2 || lines.get(lines.length - 2) !== "\n") {
        lines = lines.append("", ["\n"]);
    }
    return lines;
}
export function generateOptionOutput(sys: System | undefined, locale__shadow_1: Locale__from_locale, option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, rightAlignOfLeft: int, leftAlignOfRight: int): RuntimeSlice<gostring> {
    let text = RuntimeSlice.nil<gostring>();
    let colors__shadow_1: colors | undefined = createColors(sys);
    let name = getDisplayNameTextOfOption(option);
    let valueCandidates: valueCandidate | undefined = getValueCandidate(sys, Locale__from_locale.$copy(locale__shadow_1), option);
    let defaultValueDescription = "";
    {
        const __gotots_results_1 = (($value: GoInterface | undefined): [
            {
                value: Message__from_diagnostics;
            } | undefined,
            boolean
        ] => {
            if (!$goInterfaceAdapter$PointerTo_Named_diagnostics$Message.$is($value)) {
                return [void 0, false];
            }
            return [$value.$go$value, true];
        })(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).DefaultValueDescription);
        let msg: {
            value: Message__from_diagnostics;
        } | undefined = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (ok && !(msg === undefined)) {
            defaultValueDescription = Message__from_diagnostics.Localize(msg, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>());
        }
        else {
            defaultValueDescription = formatDefaultValue(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).DefaultValueDescription, IfElse$PointerTo_Named_tsoptions$CommandLineOption(((void CommandLineOptionKind__from_tsoptions,
                CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)
                === CommandLineOptionTypeList$constant__from_tsoptions().$value || ((void CommandLineOptionKind__from_tsoptions,
                CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)
                === CommandLineOptionTypeListOrElement$constant__from_tsoptions().$value, CommandLineOption__from_tsoptions.Elements(option), option));
        }
    }
    const __gotots_receiver_5 = sys;
    let terminalWidth = goInterfaceNonNil<System>(__gotots_receiver_5).GetWidthOfTerminal();
    if (terminalWidth >= 80) {
        let description = "";
        if (!(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Description === undefined)) {
            description = Message__from_diagnostics.Localize(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Description, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>());
        }
        text = goSliceAppendSlice<gostring>(text, getPrettyOutput(colors__shadow_1, name, description, rightAlignOfLeft, leftAlignOfRight, terminalWidth, true), "");
        text = text.append("", ["\n"]);
        if (showAdditionalInfoOutput(valueCandidates, option)) {
            if (!(valueCandidates === undefined)) {
                text = goSliceAppendSlice<gostring>(text, getPrettyOutput(colors__shadow_1, (valueCandidates ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).valueType, (valueCandidates ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleValues, rightAlignOfLeft, leftAlignOfRight, terminalWidth, false), "");
                text = text.append("", ["\n"]);
            }
            if (defaultValueDescription !== "") {
                text = goSliceAppendSlice<gostring>(text, getPrettyOutput(colors__shadow_1, Message__from_diagnostics.Localize($state__diagnostics.X_default_Colon, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), defaultValueDescription, rightAlignOfLeft, leftAlignOfRight, terminalWidth, false), "");
                text = text.append("", ["\n"]);
            }
        }
        text = text.append("", ["\n"]);
    }
    else {
        text = text.append("", [colors.$go$private$tsc$blue(colors__shadow_1, name), "\n"]);
        if (!(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Description === undefined)) {
            text = text.append("", [Message__from_diagnostics.Localize(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Description, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>())]);
        }
        text = text.append("", ["\n"]);
        if (showAdditionalInfoOutput(valueCandidates, option)) {
            if (!(valueCandidates === undefined)) {
                text = text.append("", [(valueCandidates ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).valueType, " ", (valueCandidates ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleValues]);
            }
            if (defaultValueDescription !== "") {
                if (!(valueCandidates === undefined)) {
                    text = text.append("", ["\n"]);
                }
                text = text.append("", [Message__from_diagnostics.Localize($state__diagnostics.X_default_Colon, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>()), " ", defaultValueDescription]);
            }
            text = text.append("", ["\n"]);
        }
        text = text.append("", ["\n"]);
    }
    return text;
}
export function formatDefaultValue(defaultValue: GoInterface | undefined, option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): gostring {
    if (defaultValue === undefined || goInterfaceEqual(defaultValue, new $goInterfaceAdapter$Named_core$Tristate(TSUnknown$constant__from_core()))) {
        return "undefined";
    }
    if (((void CommandLineOptionKind__from_tsoptions,
        CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)
        === CommandLineOptionTypeEnum$constant__from_tsoptions().$value) {
        let names = RuntimeSlice.nil<gostring>();
        const __gotots_range_9 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(CommandLineOption__from_tsoptions.EnumMap(option)));
        if (__gotots_range_9 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_9(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
            const __gotots_range_value_9 = $argument0;
            const __gotots_range_value_10 = $argument1;
            let name = __gotots_range_value_9;
            let value: GoInterface | undefined = __gotots_range_value_10;
            if (goInterfaceEqual(value, defaultValue)) {
                names = names.append("", [name]);
            }
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        return strings__from_gostdlib.Join(names, "/");
    }
    return fmt__from_gostdlib.Sprintf("%v", RuntimeSlice.literal<GoInterface | undefined>([defaultValue]));
}
export class valueCandidate {
    declare private readonly $goType: void;
    public constructor(public valueType: gostring, public possibleValues: gostring) {
    }
    declare private readonly then?: never;
}
export function showAdditionalInfoOutput(valueCandidates: valueCandidate | undefined, option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): bool {
    if (CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Category
        ===
            $state__diagnostics.Command_line_Options) {
        return false;
    }
    if (!(valueCandidates === undefined) && (valueCandidates ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleValues === "string" && (CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).DefaultValueDescription === undefined || goInterfaceEqual(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).DefaultValueDescription, new GoInterfaceAdapter("false")) || goInterfaceEqual(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).DefaultValueDescription, new GoInterfaceAdapter("n/a")))) {
        return false;
    }
    return true;
}
export function getValueCandidate(sys: System | undefined, locale__shadow_1: Locale__from_locale, option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): valueCandidate | undefined {
    if (((void CommandLineOptionKind__from_tsoptions,
        CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)
        === CommandLineOptionTypeObject$constant__from_tsoptions().$value) {
        return void 0;
    }
    let res: valueCandidate | undefined = new valueCandidate("", "");
    if (((void CommandLineOptionKind__from_tsoptions,
        CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)
        === CommandLineOptionTypeListOrElement$constant__from_tsoptions().$value) {
        const __gotots_argument_22 = new GoInterfaceAdapter("no value candidate for list or element");
        GoPanic.raise(__gotots_argument_22 === undefined ? GoPanicNilValue.create() : __gotots_argument_22);
    }
    switch (((void CommandLineOptionKind__from_tsoptions,
        CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)) {
        case "string":
        case "number":
        case "boolean": {
            (res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).valueType = Message__from_diagnostics.Localize($state__diagnostics.X_type_Colon, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>());
            break;
        }
        case "list": {
            (res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).valueType = Message__from_diagnostics.Localize($state__diagnostics.X_one_or_more_Colon, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>());
            break;
        }
        default: {
            (res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).valueType = Message__from_diagnostics.Localize($state__diagnostics.X_one_of_Colon, Locale__from_locale.$copy(locale__shadow_1), RuntimeSlice.nil<GoInterface | undefined>());
            break;
        }
    }
    (res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).possibleValues = getPossibleValues(option);
    return res;
}
export function getPossibleValues(option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): gostring {
    switch (((void CommandLineOptionKind__from_tsoptions,
        CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)) {
        case "string":
        case "number":
        case "boolean": {
            return ((void CommandLineOptionKind__from_tsoptions,
                CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string);
            break;
        }
        case "list":
        case "listOrElement": {
            return getPossibleValues(CommandLineOption__from_tsoptions.Elements(option));
            break;
        }
        case "object": {
            return "";
            break;
        }
        default: {
            let enumMap: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined = CommandLineOption__from_tsoptions.EnumMap(option);
            let inverted: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<GoInterface | undefined, RuntimeSlice<gostring>>> | undefined = NewOrderedMapWithSizeHint$Interface_void$SliceOf_string(OrderedMap$Size$string$Interface_void(enumMap));
            let deprecatedKeys: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = CommandLineOption__from_tsoptions.DeprecatedKeys(option);
            const __gotots_range_10 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Interface_void(enumMap));
            if (__gotots_range_10 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_1 = 1;
            __gotots_range_10(($argument0: gostring, $argument1: GoInterface | undefined): bool => {
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
                const __gotots_range_value_11 = $argument0;
                const __gotots_range_value_12 = $argument1;
                let name = __gotots_range_value_11;
                let value: GoInterface | undefined = __gotots_range_value_12;
                if (deprecatedKeys === undefined || !Set__from_collections.Has<gostring>(deprecatedKeys, name)) {
                    OrderedMap$Set$Interface_void$SliceOf_string(inverted, value, OrderedMap$GetOrZero$Interface_void$SliceOf_string(inverted, value).append("", [name]));
                }
                __gotots_range_state_1 = 1;
                return true;
            });
            if (__gotots_range_state_1 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_1 = -2;
            let syns = RuntimeSlice.nil<gostring>();
            const __gotots_range_11 = named_iter.IterSeqValueOperations.$project(OrderedMap$Values$Interface_void$SliceOf_string(inverted));
            if (__gotots_range_11 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_2 = 1;
            __gotots_range_11(($argument0: RuntimeSlice<gostring>): bool => {
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
                const __gotots_range_value_13 = $argument0;
                let synonyms = __gotots_range_value_13;
                syns = syns.append("", [strings__from_gostdlib.Join(synonyms, "/")]);
                __gotots_range_state_2 = 1;
                return true;
            });
            if (__gotots_range_state_2 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_2 = -2;
            return strings__from_gostdlib.Join(syns, ", ");
            break;
        }
    }
}
export function getPrettyOutput(colors__shadow_1: colors | undefined, left: gostring, right: gostring, rightAlignOfLeft: int, leftAlignOfRight: int, terminalWidth: int, colorLeft: bool): RuntimeSlice<gostring> {
    let res = RuntimeSlice.make<gostring>(0, 4, "");
    let isFirstLine = true;
    let remainRight = right;
    let rightCharacterNumber = terminalWidth - leftAlignOfRight;
    for (; remainRight.length > 0;) {
        let curLeft = "";
        if (isFirstLine) {
            curLeft = fmt__from_gostdlib.Sprintf("%*s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(rightAlignOfLeft), new GoInterfaceAdapter(left)]));
            curLeft = fmt__from_gostdlib.Sprintf("%-*s", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(leftAlignOfRight), new GoInterfaceAdapter(curLeft)]));
            if (colorLeft) {
                curLeft = colors.$go$private$tsc$blue(colors__shadow_1, curLeft);
            }
        }
        else {
            curLeft = strings__from_gostdlib.Repeat(" ", BigInt.asIntN(64, goNumberToBigInt(leftAlignOfRight)));
        }
        let idx = globalThis.Math.min(rightCharacterNumber, remainRight.length);
        let curRight = goStringSlice(remainRight, 0, idx);
        remainRight = goStringSlice(remainRight, idx);
        res = res.append("", [curLeft, curRight, "\n"]);
        isFirstLine = false;
    }
    return res;
}
export function getDisplayNameTextOfOption(option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): gostring {
    return "--" + CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Name + IfElse$string(CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).ShortName !== "", ", -" + CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).ShortName, "");
}
