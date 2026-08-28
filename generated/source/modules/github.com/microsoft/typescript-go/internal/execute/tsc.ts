import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerHost as CompilerHost__from_compiler, Program as Program__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { CommandLineTesting as CommandLineTesting__from_tsc, System as System__from_tsc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import type { ExtendedConfigCache as ExtendedConfigCache__from_tsoptions, TSConfig as TSConfig__from_tsoptions, TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewCachedFSCompilerHost as NewCachedFSCompilerHost__from_compiler, NewProgram as NewProgram__from_compiler, ProgramOptions as ProgramOptions__from_compiler, WriteFile as WriteFile__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { NewOrchestrator as NewOrchestrator__from_build, Options as Options__from_build, Orchestrator as Orchestrator__from_build } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/build/package.js";
import { CreateHost as CreateHost__from_incremental, NewBuildInfoReader as NewBuildInfoReader__from_incremental, NewProgram as NewProgram__from_incremental, Program as Program__from_incremental, ReadBuildInfoProgram as ReadBuildInfoProgram__from_incremental } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/incremental/package.js";
import { CommandLineResult as CommandLineResult__from_tsc, CompileTimes as CompileTimes__from_tsc, CreateDiagnosticReporter as CreateDiagnosticReporter__from_tsc, CreateReportErrorSummary as CreateReportErrorSummary__from_tsc, EmitAndReportStatistics as EmitAndReportStatistics__from_tsc, EmitInput as EmitInput__from_tsc, ExitStatusDiagnosticsPresent_OutputsGenerated$constant as ExitStatusDiagnosticsPresent_OutputsGenerated$constant__from_tsc, ExitStatusDiagnosticsPresent_OutputsSkipped$constant as ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc, ExitStatusSuccess$constant as ExitStatusSuccess$constant__from_tsc, ExtendedConfigCache as ExtendedConfigCache__from_tsc, GetTraceWithWriterFromSys as GetTraceWithWriterFromSys__from_tsc, PrintBuildHelp as PrintBuildHelp__from_tsc, PrintHelp as PrintHelp__from_tsc, PrintVersion as PrintVersion__from_tsc, WriteConfigFile as WriteConfigFile__from_tsc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import { MarshalIndentWrite as MarshalIndentWrite__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { BeginProfiling as BeginProfiling__from_pprof, ProfileSession as ProfileSession__from_pprof } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pprof/package.js";
import { StartTracing as StartTracing__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { $state as $state__tsoptions, ConvertToTSConfig as ConvertToTSConfig__from_tsoptions, GetParsedCommandLineOfConfigFile as GetParsedCommandLineOfConfigFile__from_tsoptions, ParseBuildCommandLine as ParseBuildCommandLine__from_tsoptions, ParseCommandLine as ParseCommandLine__from_tsoptions, ParsedBuildCommandLine as ParsedBuildCommandLine__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { CombinePaths as CombinePaths__from_tspath, NormalizePath as NormalizePath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$string_to_bool as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { OrderedMap$Set$string$Interface_void } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { ForEachAncestorDirectory$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectory.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$Program, $goInterfaceAdapter$PointerTo_Named_execute$Watcher, $goInterfaceAdapter$PointerTo_Named_incremental$Program, $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache, $goInterfaceAdapter$PointerTo_Named_tsoptions$TSConfig, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_collections$OrderedMapOf_string_And_Interface_void as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$FileExists$string_to_bool } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { Watcher, createWatcher } from "./watcher.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function startTracingIfNeeded(sys: System__from_tsc | undefined, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, testing: CommandLineTesting__from_tsc | undefined): {
    value: Tracing__from_tracing;
} | undefined {
    let traceDir: CompilerOptions__from_core["GenerateTrace"] = (ParsedCommandLine__from_tsoptions.CompilerOptions(config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.GenerateTrace;
    if (traceDir === "") {
        return void 0;
    }
    let configFilePath = "";
    if (!(((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) && !((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile === undefined)) {
        configFilePath = SourceFile__from_ast.FileName((((config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile);
    }
    const __gotots_receiver_37 = sys;
    const __gotots_argument_57 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_37).FS();
    const __gotots_argument_58 = traceDir;
    const __gotots_argument_59 = configFilePath;
    const __gotots_argument_60 = !(testing === undefined);
    const __gotots_results_5 = StartTracing__from_tracing(__gotots_argument_57, __gotots_argument_58, __gotots_argument_59, __gotots_argument_60);
    let tr: {
        value: Tracing__from_tracing;
    } | undefined = __gotots_results_5[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_5[1];
    if (!(err === undefined)) {
        const __gotots_receiver_38 = sys;
        const __gotots_argument_61 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_38).Writer();
        const __gotots_argument_62 = "Warning: Failed to start tracing: %v\n";
        const __gotots_argument_63 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_61), __gotots_argument_62, __gotots_argument_63);
    }
    return tr;
}
export function stopTracing(sys: System__from_tsc | undefined, tr: {
    value: Tracing__from_tracing;
} | undefined): void {
    if (tr === undefined) {
        return;
    }
    {
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = Tracing__from_tracing.StopTracing(tr);
        if (!(err === undefined)) {
            const __gotots_receiver_39 = sys;
            const __gotots_argument_64 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_39).Writer();
            const __gotots_argument_65 = "Warning: Failed to stop tracing: %v\n";
            const __gotots_argument_66 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([err]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_64), __gotots_argument_65, __gotots_argument_66);
        }
    }
}
export function CommandLine(ctx: GoInterface | undefined, sys: System__from_tsc | undefined, commandLineArgs: RuntimeSlice<gostring>, testing: CommandLineTesting__from_tsc | undefined): CommandLineResult__from_tsc {
    if (commandLineArgs.length > 0) {
        switch (strings__from_gostdlib.ToLower(commandLineArgs.get(0))) {
            case "-b":
            case "--b":
            case "-build":
            case "--build": {
                return tscBuildCompilation(ctx, sys, ParseBuildCommandLine__from_tsoptions(commandLineArgs, sys), testing);
                break;
            }
        }
    }
    return tscCompilation(ctx, sys, ParseCommandLine__from_tsoptions(commandLineArgs, sys), testing);
}
export function tscBuildCompilation(ctx: GoInterface | undefined, sys: System__from_tsc | undefined, buildCommand: {
    value: ParsedBuildCommandLine__from_tsoptions;
} | undefined, testing: CommandLineTesting__from_tsc | undefined): CommandLineResult__from_tsc {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: CommandLineResult__from_tsc = CommandLineResult__from_tsc.$zero();
    try {
        try {
            __gotots_return_block_0: {
                let locale__shadow_1 = ParsedBuildCommandLine__from_tsoptions.Locale(buildCommand);
                const __gotots_argument_0 = sys;
                const __gotots_receiver_0 = sys;
                const __gotots_argument_1 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_0).Writer();
                const __gotots_argument_2 = Locale__from_locale.$copy(locale__shadow_1);
                const __gotots_argument_3: ParsedBuildCommandLine__from_tsoptions["CompilerOptions"] = (buildCommand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions;
                let reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined = CreateDiagnosticReporter__from_tsc(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
                if ((buildCommand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors.length > 0) {
                    const __gotots_range_0: ParsedBuildCommandLine__from_tsoptions["Errors"] = (buildCommand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Errors;
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                        let err: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_0;
                        const __gotots_callee_0 = reportDiagnostic;
                        const __gotots_argument_4 = err;
                        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4);
                    }
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                {
                    let pprofDir: CompilerOptions__from_core["PprofDir"] = ((buildCommand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PprofDir;
                    if (pprofDir !== "") {
                        const __gotots_argument_5 = pprofDir;
                        const __gotots_receiver_1 = sys;
                        const __gotots_argument_6 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_1).Writer();
                        let profileSession: {
                            value: ProfileSession__from_pprof;
                        } | undefined = BeginProfiling__from_pprof(__gotots_argument_5, __gotots_argument_6);
                        const __gotots_receiver_2 = profileSession;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            ProfileSession__from_pprof.Stop(__gotots_receiver_2);
                        });
                    }
                }
                if (Tristate_IsTrue__from_core(((buildCommand ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Help)) {
                    PrintVersion__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1));
                    PrintBuildHelp__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1), $state__tsoptions.BuildOpts);
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusSuccess$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                let orchestrator: {
                    value: Orchestrator__from_build;
                } | undefined = NewOrchestrator__from_build(new Options__from_build(sys, buildCommand, testing));
                __gotots_return_0 = Orchestrator__from_build.Start(orchestrator, ctx);
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_0) {
            if (!(__gotots_caught_0 instanceof GoPanic)) {
                throw __gotots_caught_0;
            }
            __gotots_panic_0 = __gotots_caught_0;
        }
    }
    finally {
        while (__gotots_defers_0.length !== 0) {
            const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return __gotots_return_0;
}
export function tscCompilation(ctx: GoInterface | undefined, sys: System__from_tsc | undefined, commandLine: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, testing: CommandLineTesting__from_tsc | undefined): CommandLineResult__from_tsc {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: CommandLineResult__from_tsc = CommandLineResult__from_tsc.$zero();
    try {
        try {
            __gotots_return_block_0: {
                let configFileName = "";
                let locale__shadow_1 = ParsedCommandLine__from_tsoptions.Locale(commandLine);
                const __gotots_argument_7 = sys;
                const __gotots_receiver_2 = sys;
                const __gotots_argument_8 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_2).Writer();
                const __gotots_argument_9 = Locale__from_locale.$copy(locale__shadow_1);
                const __gotots_argument_10 = ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine);
                let reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined = CreateDiagnosticReporter__from_tsc(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
                if (((commandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.Errors.length > 0) {
                    const __gotots_range_1 = ((commandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.Errors;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                        let e: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_1;
                        const __gotots_callee_1 = reportDiagnostic;
                        const __gotots_argument_11 = e;
                        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
                    }
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                {
                    let pprofDir: CompilerOptions__from_core["PprofDir"] = (ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PprofDir;
                    if (pprofDir !== "") {
                        const __gotots_argument_12 = pprofDir;
                        const __gotots_receiver_3 = sys;
                        const __gotots_argument_13 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_3).Writer();
                        let profileSession: {
                            value: ProfileSession__from_pprof;
                        } | undefined = BeginProfiling__from_pprof(__gotots_argument_12, __gotots_argument_13);
                        const __gotots_receiver_4 = profileSession;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            ProfileSession__from_pprof.Stop(__gotots_receiver_4);
                        });
                    }
                }
                if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Init)) {
                    WriteConfigFile__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1), reportDiagnostic, (($value: $goInterface$Interface_void | undefined): tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>> | undefined => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(((commandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.Raw));
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusSuccess$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Version)) {
                    PrintVersion__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1));
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusSuccess$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Help) || Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.All)) {
                    PrintHelp__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1), commandLine);
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusSuccess$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch) && Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListFilesOnly)) {
                    const __gotots_callee_2 = reportDiagnostic;
                    const __gotots_argument_14 = NewCompilerDiagnostic__from_ast($state__diagnostics.Options_0_and_1_cannot_be_combined, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string("watch"), new $goInterfaceAdapter$string("listFilesOnly")]));
                    (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                if ((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Project !== "") {
                    if (ParsedCommandLine__from_tsoptions.FileNames(commandLine).length !== 0) {
                        const __gotots_callee_3 = reportDiagnostic;
                        const __gotots_argument_15 = NewCompilerDiagnostic__from_ast($state__diagnostics.Option_project_cannot_be_mixed_with_source_files_on_a_command_line, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                        (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
                        __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                        break __gotots_return_block_0;
                    }
                    let fileOrDirectory = NormalizePath__from_tspath((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Project);
                    const __gotots_receiver_5 = sys;
                    const __gotots_receiver_6 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_5).FS();
                    const __gotots_argument_16 = fileOrDirectory;
                    if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).DirectoryExists(__gotots_argument_16)) {
                        configFileName = CombinePaths__from_tspath(fileOrDirectory, RuntimeSlice.literal<gostring>(["tsconfig.json"]));
                        const __gotots_receiver_7 = sys;
                        const __gotots_receiver_8 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_7).FS();
                        const __gotots_argument_17 = configFileName;
                        if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_8).FileExists(__gotots_argument_17)) {
                            const __gotots_callee_4 = reportDiagnostic;
                            const __gotots_argument_18 = NewCompilerDiagnostic__from_ast($state__diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(configFileName)]));
                            (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
                            __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                            break __gotots_return_block_0;
                        }
                    }
                    else {
                        configFileName = fileOrDirectory;
                        const __gotots_receiver_9 = sys;
                        const __gotots_receiver_10 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_9).FS();
                        const __gotots_argument_19 = configFileName;
                        if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).FileExists(__gotots_argument_19)) {
                            const __gotots_callee_5 = reportDiagnostic;
                            const __gotots_argument_20 = NewCompilerDiagnostic__from_ast($state__diagnostics.The_specified_path_does_not_exist_Colon_0, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(fileOrDirectory)]));
                            (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
                            __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                            break __gotots_return_block_0;
                        }
                    }
                }
                else if (!Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IgnoreConfig) || ParsedCommandLine__from_tsoptions.FileNames(commandLine).length === 0) {
                    const __gotots_receiver_11 = sys;
                    const __gotots_argument_21 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_11).GetCurrentDirectory();
                    let searchPath = NormalizePath__from_tspath(__gotots_argument_21);
                    const __gotots_argument_22 = searchPath;
                    const __gotots_receiver_12 = sys;
                    const __gotots_receiver_13 = goInterfaceNonNil(goInterfaceNonNil<System__from_tsc>(__gotots_receiver_12).FS());
                    const __gotots_argument_23 = DeferredCallableRegistry.register(($argument0: gostring): bool => __gotots_receiver_13.FileExists($argument0), ($go$recovery: GoRecovery, $argument0: gostring): bool => {
                        const __gotots_receiver_14: FS__from_vfs = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_13);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolveMethod($goInterfaceMethod$FileExists$string_to_bool, __gotots_receiver_14);
                        return __gotots_deferred_1 === undefined ? __gotots_receiver_14.FileExists($argument0) : __gotots_deferred_1($go$recovery, __gotots_receiver_14, $argument0);
                    });
                    const __gotots_argument_24 = "tsconfig.json";
                    configFileName = findConfigFile(__gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
                    if (ParsedCommandLine__from_tsoptions.FileNames(commandLine).length !== 0) {
                        if (configFileName !== "") {
                            const __gotots_callee_6 = reportDiagnostic;
                            const __gotots_argument_25 = NewCompilerDiagnostic__from_ast($state__diagnostics.X_tsconfig_json_is_present_but_will_not_be_loaded_if_files_are_specified_on_commandline_Use_ignoreConfig_to_skip_this_error, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
                            (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25);
                            __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                            break __gotots_return_block_0;
                        }
                    }
                    else if (configFileName === "") {
                        if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ShowConfig)) {
                            const __gotots_callee_7 = reportDiagnostic;
                            const __gotots_argument_28 = $state__diagnostics.Cannot_find_a_tsconfig_json_file_at_the_current_directory_Colon_0;
                            const __gotots_receiver_15 = sys;
                            const __gotots_argument_26 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_15).GetCurrentDirectory();
                            const __gotots_argument_27 = new $goInterfaceAdapter$string(NormalizePath__from_tspath(__gotots_argument_26));
                            const __gotots_argument_29 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_27]);
                            const __gotots_argument_30 = NewCompilerDiagnostic__from_ast(__gotots_argument_28, __gotots_argument_29);
                            (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
                        }
                        else {
                            PrintVersion__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1));
                            PrintHelp__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1), commandLine);
                        }
                        __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc(), void 0);
                        break __gotots_return_block_0;
                    }
                }
                let compilerOptionsFromCommandLine: {
                    value: CompilerOptions__from_core;
                } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine);
                let configForCompilation: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = commandLine;
                const __gotots_struct_0 = ExtendedConfigCache__from_tsc.$zero();
                let extendedConfigCache: tsonicTypeScriptRuntime.Location<ExtendedConfigCache__from_tsc> | undefined = tsonicTypeScriptRuntime.location<ExtendedConfigCache__from_tsc>(__gotots_struct_0);
                let compileTimes = CompileTimes__from_tsc.$zero();
                const compileTimes$location = tsonicTypeScriptRuntime.boundLocation({}, () => compileTimes, compileTimes$next => compileTimes = compileTimes$next);
                let commandLineRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>> | undefined = void 0;
                if (configFileName !== "") {
                    const __gotots_receiver_16 = sys;
                    let configStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_16).Now();
                    {
                        const __gotots_results_0 = (($value: $goInterface$Interface_void | undefined): [
                            tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>> | undefined,
                            boolean
                        ] => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return [void 0, false];
                            }
                            return [$value.$go$value, true];
                        })(((commandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.Raw);
                        let raw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>> | undefined = __gotots_results_0[0];
                        let ok = __gotots_results_0[1];
                        if (ok) {
                            const __gotots_struct_1 = OrderedMap__from_collections.$zero<gostring, $goInterface$Interface_void | undefined>((): GoMapValue<gostring, $goInterface$Interface_void | undefined> => {
                                return GoMap.nil();
                            });
                            let wrapped: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>> | undefined = tsonicTypeScriptRuntime.location<OrderedMap__from_collections<gostring, $goInterface$Interface_void | undefined>>(__gotots_struct_1);
                            OrderedMap$Set$string$Interface_void(wrapped, "compilerOptions", new GoInterfaceAdapter(raw));
                            commandLineRaw = wrapped;
                        }
                    }
                    const __gotots_results_1 = GetParsedCommandLineOfConfigFile__from_tsoptions(configFileName, compilerOptionsFromCommandLine, commandLineRaw, sys, new $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache(extendedConfigCache));
                    let configParseResult: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_1[0];
                    let errors = __gotots_results_1[1];
                    const __gotots_receiver_17 = sys;
                    compileTimes.ConfigTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_17).Now().Sub(named_time.TimeOperations.$copy(configStart));
                    if (errors.length !== 0) {
                        const __gotots_range_2 = errors;
                        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                            let e: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_2;
                            const __gotots_callee_8 = reportDiagnostic;
                            const __gotots_argument_31 = e;
                            (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31);
                        }
                        __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusDiagnosticsPresent_OutputsGenerated$constant__from_tsc(), void 0);
                        break __gotots_return_block_0;
                    }
                    configForCompilation = configParseResult;
                    const __gotots_argument_32 = sys;
                    const __gotots_receiver_18 = sys;
                    const __gotots_argument_33 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_18).Writer();
                    const __gotots_argument_34 = Locale__from_locale.$copy(locale__shadow_1);
                    const __gotots_argument_35 = ParsedCommandLine__from_tsoptions.CompilerOptions(commandLine);
                    reportDiagnostic = CreateDiagnosticReporter__from_tsc(__gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
                }
                let reportErrorSummary: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined = CreateReportErrorSummary__from_tsc(sys, Locale__from_locale.$copy(locale__shadow_1), ParsedCommandLine__from_tsoptions.CompilerOptions(configForCompilation));
                if (Tristate_IsTrue__from_core((compilerOptionsFromCommandLine ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ShowConfig)) {
                    showConfig(sys, configForCompilation, configFileName);
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusSuccess$constant__from_tsc(), void 0);
                    break __gotots_return_block_0;
                }
                if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(configForCompilation) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch)) {
                    let watcher: Watcher | undefined = createWatcher(sys, configForCompilation, compilerOptionsFromCommandLine, commandLineRaw, reportDiagnostic, reportErrorSummary, testing);
                    Watcher.$go$private$execute$start(watcher, ctx);
                    __gotots_return_0 = new CommandLineResult__from_tsc(ExitStatusSuccess$constant__from_tsc(), new $goInterfaceAdapter$PointerTo_Named_execute$Watcher(watcher));
                    break __gotots_return_block_0;
                }
                else if (CompilerOptions__from_core.IsIncremental(ParsedCommandLine__from_tsoptions.CompilerOptions(configForCompilation))) {
                    __gotots_return_0 = performIncrementalCompilation(sys, configForCompilation, reportDiagnostic, reportErrorSummary, new $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache(extendedConfigCache), compileTimes$location, testing);
                    break __gotots_return_block_0;
                }
                __gotots_return_0 = performCompilation(sys, configForCompilation, reportDiagnostic, reportErrorSummary, new $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache(extendedConfigCache), compileTimes$location, testing);
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_0) {
            if (!(__gotots_caught_0 instanceof GoPanic)) {
                throw __gotots_caught_0;
            }
            __gotots_panic_0 = __gotots_caught_0;
        }
    }
    finally {
        while (__gotots_defers_0.length !== 0) {
            const __gotots_deferred_0 = goDeferPop(__gotots_defers_0);
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return __gotots_return_0;
}
export function findConfigFile(searchPath: gostring, fileExists: (($0: gostring) => bool) | undefined, configName: gostring): gostring {
    const __gotots_results_2 = ForEachAncestorDirectory$string(searchPath, (ancestor: gostring): [
        gostring,
        bool
    ] => {
        let fullConfigName = CombinePaths__from_tspath(ancestor, RuntimeSlice.literal<gostring>([configName]));
        const __gotots_callee_9 = fileExists;
        const __gotots_argument_36 = fullConfigName;
        if ((__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36)) {
            return [fullConfigName, true];
        }
        return [fullConfigName, false];
    });
    let result = __gotots_results_2[0];
    let ok = __gotots_results_2[1];
    if (!ok) {
        return "";
    }
    return result;
}
export function getTraceFromSys(sys: System__from_tsc | undefined, locale__shadow_1: Locale__from_locale, testing: CommandLineTesting__from_tsc | undefined): (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined {
    const __gotots_receiver_36 = sys;
    const __gotots_argument_54 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_36).Writer();
    const __gotots_argument_55 = Locale__from_locale.$copy(locale__shadow_1);
    const __gotots_argument_56 = testing;
    return GetTraceWithWriterFromSys__from_tsc(__gotots_argument_54, __gotots_argument_55, __gotots_argument_56);
}
export function performIncrementalCompilation(sys: System__from_tsc | undefined, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, reportErrorSummary: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined, extendedConfigCache: ExtendedConfigCache__from_tsoptions | undefined, compileTimes: tsonicTypeScriptRuntime.Location<CompileTimes__from_tsc> | undefined, testing: CommandLineTesting__from_tsc | undefined): CommandLineResult__from_tsc {
    const __gotots_receiver_19 = sys;
    const __gotots_argument_41 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_19).GetCurrentDirectory();
    const __gotots_receiver_20 = sys;
    const __gotots_argument_42 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_20).FS();
    const __gotots_receiver_21 = sys;
    const __gotots_argument_43 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_21).DefaultLibraryPath();
    const __gotots_argument_44 = extendedConfigCache;
    const __gotots_argument_45 = getTraceFromSys(sys, ParsedCommandLine__from_tsoptions.Locale(config), testing);
    let host: CompilerHost__from_compiler | undefined = NewCachedFSCompilerHost__from_compiler(__gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45);
    const __gotots_receiver_22 = sys;
    let buildInfoReadStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_22).Now();
    let oldProgram: {
        value: Program__from_incremental;
    } | undefined = ReadBuildInfoProgram__from_incremental(config, NewBuildInfoReader__from_incremental(host), host);
    const __gotots_receiver_23 = sys;
    ((compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes__from_tsc>).value.BuildInfoReadTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_23).Now().Sub(named_time.TimeOperations.$copy(buildInfoReadStart));
    let tr: {
        value: Tracing__from_tracing;
    } | undefined = startTracingIfNeeded(sys, config, testing);
    const __gotots_receiver_24 = sys;
    let parseStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_24).Now();
    let program: {
        value: Program__from_compiler;
    } | undefined = NewProgram__from_compiler(new ProgramOptions__from_compiler(host, config, false, 0, void 0, "", "", tr));
    const __gotots_receiver_25 = sys;
    ((compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes__from_tsc>).value.ParseTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_25).Now().Sub(named_time.TimeOperations.$copy(parseStart));
    const __gotots_receiver_26 = sys;
    let changesComputeStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_26).Now();
    let incrementalProgram: {
        value: Program__from_incremental;
    } | undefined = NewProgram__from_incremental(program, oldProgram, CreateHost__from_incremental(host), !(testing === undefined));
    const __gotots_receiver_27 = sys;
    ((compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes__from_tsc>).value.ChangesComputeTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_27).Now().Sub(named_time.TimeOperations.$copy(changesComputeStart));
    const __gotots_field_0 = sys;
    const __gotots_field_1 = new $goInterfaceAdapter$PointerTo_Named_incremental$Program(incrementalProgram);
    const __gotots_field_2 = Program__from_incremental.GetProgram(incrementalProgram);
    const __gotots_field_3 = config;
    const __gotots_field_4 = reportDiagnostic;
    const __gotots_field_5 = reportErrorSummary;
    const __gotots_receiver_28 = sys;
    const __gotots_field_6 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_28).Writer();
    const __gotots_argument_46 = new EmitInput__from_tsc(__gotots_field_0, __gotots_field_1, __gotots_field_2, __gotots_field_3, __gotots_field_4, __gotots_field_5, __gotots_field_6, new WriteFile__from_compiler(void 0), compileTimes, testing, void 0, tr);
    const __gotots_results_3 = EmitAndReportStatistics__from_tsc(__gotots_argument_46);
    let result = __gotots_results_3[0];
    stopTracing(sys, tr);
    if (!(testing === undefined)) {
        const __gotots_receiver_29 = testing;
        const __gotots_argument_47 = incrementalProgram;
        goInterfaceNonNil<CommandLineTesting__from_tsc>(__gotots_receiver_29).OnProgram(__gotots_argument_47);
    }
    return new CommandLineResult__from_tsc(result.Status, void 0);
}
export function performCompilation(sys: System__from_tsc | undefined, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, reportErrorSummary: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined, extendedConfigCache: ExtendedConfigCache__from_tsoptions | undefined, compileTimes: tsonicTypeScriptRuntime.Location<CompileTimes__from_tsc> | undefined, testing: CommandLineTesting__from_tsc | undefined): CommandLineResult__from_tsc {
    const __gotots_receiver_30 = sys;
    const __gotots_argument_48 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_30).GetCurrentDirectory();
    const __gotots_receiver_31 = sys;
    const __gotots_argument_49 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_31).FS();
    const __gotots_receiver_32 = sys;
    const __gotots_argument_50 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_32).DefaultLibraryPath();
    const __gotots_argument_51 = extendedConfigCache;
    const __gotots_argument_52 = getTraceFromSys(sys, ParsedCommandLine__from_tsoptions.Locale(config), testing);
    let host: CompilerHost__from_compiler | undefined = NewCachedFSCompilerHost__from_compiler(__gotots_argument_48, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51, __gotots_argument_52);
    let tr: {
        value: Tracing__from_tracing;
    } | undefined = startTracingIfNeeded(sys, config, testing);
    const __gotots_receiver_33 = sys;
    let parseStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_33).Now();
    let program: {
        value: Program__from_compiler;
    } | undefined = NewProgram__from_compiler(new ProgramOptions__from_compiler(host, config, false, 0, void 0, "", "", tr));
    const __gotots_receiver_34 = sys;
    ((compileTimes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes__from_tsc>).value.ParseTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_34).Now().Sub(named_time.TimeOperations.$copy(parseStart));
    const __gotots_field_7 = sys;
    const __gotots_field_8 = new $goInterfaceAdapter$PointerTo_Named_compiler$Program(program);
    const __gotots_field_9 = program;
    const __gotots_field_10 = config;
    const __gotots_field_11 = reportDiagnostic;
    const __gotots_field_12 = reportErrorSummary;
    const __gotots_receiver_35 = sys;
    const __gotots_field_13 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_35).Writer();
    const __gotots_argument_53 = new EmitInput__from_tsc(__gotots_field_7, __gotots_field_8, __gotots_field_9, __gotots_field_10, __gotots_field_11, __gotots_field_12, __gotots_field_13, new WriteFile__from_compiler(void 0), compileTimes, testing, void 0, tr);
    const __gotots_results_4 = EmitAndReportStatistics__from_tsc(__gotots_argument_53);
    let result = __gotots_results_4[0];
    stopTracing(sys, tr);
    return new CommandLineResult__from_tsc(result.Status, void 0);
}
export function showConfig(sys: System__from_tsc | undefined, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, configFileName: gostring): void {
    let tsConfig: {
        value: TSConfig__from_tsoptions;
    } | undefined = ConvertToTSConfig__from_tsoptions(config, configFileName);
    const __gotots_receiver_18 = sys;
    const __gotots_argument_37 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_18).Writer();
    const __gotots_argument_38 = new $goInterfaceAdapter$PointerTo_Named_tsoptions$TSConfig(tsConfig);
    const __gotots_argument_39 = "";
    const __gotots_argument_40 = "    ";
    MarshalIndentWrite__from_json__package_1(__gotots_argument_37, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40);
}
