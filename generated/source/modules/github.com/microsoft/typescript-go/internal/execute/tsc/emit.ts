import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ProgramLike as ProgramLike__from_compiler, SourceMapEmitResult as SourceMapEmitResult__from_compiler, WriteFile as WriteFile__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { CommandLineTesting, CompileTimes, System } from "./compile.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { EmitOptions as EmitOptions__from_compiler, EmitResult as EmitResult__from_compiler, GetDiagnosticsOfAnyProgram as GetDiagnosticsOfAnyProgram__from_compiler, Program as Program__from_compiler, SortAndDeduplicateDiagnostics as SortAndDeduplicateDiagnostics__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { PhaseBind$constant as PhaseBind$constant__from_tracing, PhaseCheck$constant as PhaseCheck$constant__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$Named_io$Writer_to_void, $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$OnListFilesEnd$Named_io$Writer_to_void } from "../../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_context$Context as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { CompileAndEmitResult, ExitStatusDiagnosticsPresent_OutputsGenerated$constant, ExitStatusDiagnosticsPresent_OutputsSkipped$constant, ExitStatusSuccess$constant } from "./compile.js";
import { Statistics, statisticsFromProgram } from "./statistics.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as named_runtime from "@gotots/gostdlib/internal/facets/named-runtime.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as runtime__from_gostdlib from "@gotots/gostdlib/runtime.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export function GetTraceWithWriterFromSys(w: GoInterface | undefined, locale__shadow_1: Locale__from_locale, testing: CommandLineTesting | undefined): (($0: {
    value: Message__from_diagnostics;
} | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined {
    if (testing === undefined) {
        return (msg: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): void => {
            const __gotots_argument_0 = w;
            const __gotots_argument_1 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(Message__from_diagnostics.Localize(msg, Locale__from_locale.$copy(locale__shadow_1), args))]);
            provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_0), __gotots_argument_1);
        };
    }
    else {
        const __gotots_receiver_1 = testing;
        const __gotots_argument_2 = w;
        const __gotots_argument_3 = Locale__from_locale.$copy(locale__shadow_1);
        return goInterfaceNonNil<CommandLineTesting>(__gotots_receiver_1).GetTrace(__gotots_argument_2, __gotots_argument_3);
    }
}
export class EmitInput {
    declare private readonly $goType: void;
    public constructor(public Sys: System | undefined, public ProgramLike: ProgramLike__from_compiler | undefined, public Program: {
        value: Program__from_compiler;
    } | undefined, public Config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public ReportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, public ReportErrorSummary: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined, public Writer: GoInterface | undefined, public WriteFile: WriteFile__from_compiler, public CompileTimes: tsonicTypeScriptRuntime.Location<CompileTimes> | undefined, public Testing: CommandLineTesting | undefined, public TestingMTimesCache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined, public Tracing: {
        value: Tracing__from_tracing;
    } | undefined) {
    }
    static $copy($source: EmitInput): EmitInput {
        return new EmitInput($source.Sys, $source.ProgramLike, $source.Program, $source.Config, $source.ReportDiagnostic, $source.ReportErrorSummary, $source.Writer, $source.WriteFile, $source.CompileTimes, $source.Testing, $source.TestingMTimesCache, $source.Tracing);
    }
    declare private readonly then?: never;
}
export function EmitAndReportStatistics(input: EmitInput): [
    CompileAndEmitResult,
    tsonicTypeScriptRuntime.Location<Statistics> | undefined
] {
    let statistics: tsonicTypeScriptRuntime.Location<Statistics> | undefined = void 0;
    let result = EmitFilesAndReportErrors(EmitInput.$copy(input));
    if (!(result.Status.$value === ExitStatusSuccess$constant().$value)) {
        return [CompileAndEmitResult.$copy(result), void 0];
    }
    const __gotots_receiver_0 = input.Sys;
    ((result.times ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.totalTime = goInterfaceNonNil<System>(__gotots_receiver_0).SinceStart();
    if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(input.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Diagnostics) || Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(input.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedDiagnostics)) {
        let memStats = named_runtime.RuntimeMemStatsOperations.$zero();
        const memStats$location = tsonicTypeScriptRuntime.boundLocation({}, () => memStats, memStats$next => memStats = memStats$next);
        runtime__from_gostdlib.GC();
        runtime__from_gostdlib.GC();
        const __gotots_conversion_0 = memStats$location;
        runtime__from_gostdlib.ReadMemStats(__gotots_conversion_0 === undefined ? undefined :
            (__gotots_conversion_0 as tsonicTypeScriptRuntime.Location<runtime__from_gostdlib.MemStats>).value);
        statistics = statisticsFromProgram(EmitInput.$copy(input), memStats$location);
        Statistics.Report(statistics, input.Writer, input.Testing);
    }
    if (((result.EmitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmitSkipped && result.Diagnostics.length > 0) {
        result.Status = ExitStatusDiagnosticsPresent_OutputsSkipped$constant();
    }
    else if (result.Diagnostics.length > 0) {
        result.Status = ExitStatusDiagnosticsPresent_OutputsGenerated$constant();
    }
    return [CompileAndEmitResult.$copy(result), statistics];
}
export function EmitFilesAndReportErrors(input: EmitInput): CompileAndEmitResult {
    let result: CompileAndEmitResult = CompileAndEmitResult.$zero();
    result.times = input.CompileTimes;
    let ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined = GoProviderInterfaceBridge.$from(context__from_gostdlib.Background());
    let allDiagnostics = GetDiagnosticsOfAnyProgram__from_compiler(ctx, input.ProgramLike, void 0, false, (ctx__shadow_1: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_0: {
                    {
                        let tr: {
                            value: Tracing__from_tracing;
                        } | undefined = input.Tracing;
                        if (!(tr === undefined)) {
                            const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push(tr, PhaseBind$constant__from_tracing(), "bindSourceFiles", GoMap.nil(), true);
                            const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                            });
                        }
                    }
                    const __gotots_receiver_2 = input.Sys;
                    let bindStart = goInterfaceNonNil<System>(__gotots_receiver_2).Now();
                    const __gotots_receiver_3 = input.ProgramLike;
                    const __gotots_argument_4 = ctx__shadow_1;
                    const __gotots_argument_5 = file;
                    let diags = goInterfaceNonNil<ProgramLike__from_compiler>(__gotots_receiver_3).GetBindDiagnostics(__gotots_argument_4, __gotots_argument_5);
                    const __gotots_receiver_4 = input.Sys;
                    ((result.times ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.bindTime = goInterfaceNonNil<System>(__gotots_receiver_4).Now().Sub(named_time.TimeOperations.$copy(bindStart));
                    __gotots_return_0 = diags;
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
    }, (ctx__shadow_1: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        const __gotots_defers_1: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_1: {
                    {
                        let tr: {
                            value: Tracing__from_tracing;
                        } | undefined = input.Tracing;
                        if (!(tr === undefined)) {
                            const __gotots_callee_1: (() => void) | undefined = Tracing__from_tracing.Push(tr, PhaseCheck$constant__from_tracing(), "checkSourceFiles", GoMap.nil(), true);
                            const __gotots_deferred_3 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                            __gotots_defers_1.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_3 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_3($go$recovery);
                            });
                        }
                    }
                    const __gotots_receiver_5 = input.Sys;
                    let checkStart = goInterfaceNonNil<System>(__gotots_receiver_5).Now();
                    const __gotots_receiver_6 = input.ProgramLike;
                    const __gotots_argument_6 = ctx__shadow_1;
                    const __gotots_argument_7 = file;
                    let diags = goInterfaceNonNil<ProgramLike__from_compiler>(__gotots_receiver_6).GetSemanticDiagnostics(__gotots_argument_6, __gotots_argument_7);
                    const __gotots_receiver_7 = input.Sys;
                    ((result.times ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.checkTime = goInterfaceNonNil<System>(__gotots_receiver_7).Now().Sub(named_time.TimeOperations.$copy(checkStart));
                    __gotots_return_1 = diags;
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_1 = __gotots_caught_2;
            }
        }
        finally {
            while (__gotots_defers_1.length !== 0) {
                const __gotots_deferred_2 = goDeferPop(__gotots_defers_1);
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_2(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_3) {
                    if (!(__gotots_caught_3 instanceof GoPanic)) {
                        throw __gotots_caught_3;
                    }
                    __gotots_panic_1 = __gotots_caught_3;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    });
    let emitResult: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(true, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([]), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
        value: SourceMapEmitResult__from_compiler;
    } | undefined>()));
    const __gotots_receiver_8 = input.ProgramLike;
    if (!Tristate_IsTrue__from_core((goInterfaceNonNil<ProgramLike__from_compiler>(__gotots_receiver_8).Options() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListFilesOnly)) {
        const __gotots_receiver_9 = input.Sys;
        let emitStart = goInterfaceNonNil<System>(__gotots_receiver_9).Now();
        const __gotots_receiver_10 = input.ProgramLike;
        const __gotots_argument_8 = ctx;
        const __gotots_argument_9 = new EmitOptions__from_compiler(void 0, 0, input.WriteFile);
        emitResult = goInterfaceNonNil<ProgramLike__from_compiler>(__gotots_receiver_10).Emit(__gotots_argument_8, __gotots_argument_9);
        const __gotots_receiver_11 = input.Sys;
        ((result.times ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CompileTimes>).value.emitTime = goInterfaceNonNil<System>(__gotots_receiver_11).Now().Sub(named_time.TimeOperations.$copy(emitStart));
    }
    if (!(emitResult === undefined)) {
        allDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(allDiagnostics, ((emitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics, void 0);
    }
    if (!(input.Testing === undefined)) {
        const __gotots_receiver_12 = input.Testing;
        const __gotots_argument_10 = emitResult;
        const __gotots_argument_11 = input.TestingMTimesCache;
        goInterfaceNonNil<CommandLineTesting>(__gotots_receiver_12).OnEmittedFiles(__gotots_argument_10, __gotots_argument_11);
    }
    allDiagnostics = SortAndDeduplicateDiagnostics__from_compiler(allDiagnostics);
    const __gotots_range_0 = allDiagnostics;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_0;
        const __gotots_callee_2 = input.ReportDiagnostic;
        const __gotots_argument_12 = diagnostic;
        (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
    }
    listFiles(EmitInput.$copy(input), emitResult);
    const __gotots_callee_3 = input.ReportErrorSummary;
    const __gotots_argument_13 = allDiagnostics;
    (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
    result.Diagnostics = allDiagnostics;
    result.EmitResult = emitResult;
    result.Status = ExitStatusSuccess$constant();
    return CompileAndEmitResult.$copy(result);
}
export function listFiles(input: EmitInput, emitResult: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined): void {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    try {
        try {
            __gotots_return_block_0: {
                if (!(input.Testing === undefined)) {
                    const __gotots_receiver_13 = input.Testing;
                    const __gotots_argument_14 = input.Writer;
                    goInterfaceNonNil<CommandLineTesting>(__gotots_receiver_13).OnListFilesStart(__gotots_argument_14);
                    const __gotots_receiver_14: CommandLineTesting = goInterfaceNonNil<CommandLineTesting>(input.Testing);
                    const __gotots_deferred_1 = $goDeferred$Named_io$Writer_to_void.resolveMethod($goInterfaceMethod$OnListFilesEnd$Named_io$Writer_to_void, __gotots_receiver_14);
                    const __gotots_argument_15 = input.Writer;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? __gotots_receiver_14.OnListFilesEnd(__gotots_argument_15) : __gotots_deferred_1($go$recovery, __gotots_receiver_14, __gotots_argument_15);
                    });
                }
                let options: {
                    value: CompilerOptions__from_core;
                } | undefined = Program__from_compiler.Options(input.Program);
                if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListEmittedFiles)) {
                    const __gotots_range_1 = ((emitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                        let file = __gotots_range_value_1;
                        const __gotots_argument_16 = input.Writer;
                        const __gotots_argument_17 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("TSFILE: "), new GoInterfaceAdapter(GetNormalizedAbsolutePath__from_tspath(file, Program__from_compiler.GetCurrentDirectory(input.Program)))]);
                        provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_16), __gotots_argument_17);
                    }
                }
                if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExplainFiles)) {
                    Program__from_compiler.ExplainFiles(input.Program, input.Writer, ParsedCommandLine__from_tsoptions.Locale(input.Config));
                }
                else if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListFiles) || Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListFilesOnly)) {
                    const __gotots_range_2 = Program__from_compiler.GetSourceFiles(input.Program);
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_2;
                        const __gotots_argument_18 = input.Writer;
                        const __gotots_argument_19 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(SourceFile__from_ast.FileName(file))]);
                        provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_18), __gotots_argument_19);
                    }
                }
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
}
