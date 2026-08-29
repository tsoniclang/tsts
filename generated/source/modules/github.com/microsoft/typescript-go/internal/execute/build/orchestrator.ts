import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFileParseOptions$Storage as SourceFileParseOptions__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerHost as CompilerHost__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { BuildOptions as BuildOptions__from_core, CompilerOptions as CompilerOptions__from_core, ProjectReference as ProjectReference__from_core, WorkGroup as WorkGroup__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { CommandLineTesting as CommandLineTesting__from_tsc, System as System__from_tsc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { buildInfoEntry } from "./buildtask.js";
import type * as scalars from "@gotots/gostdlib/internal/scalars.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewCachedFSCompilerHost as NewCachedFSCompilerHost__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { NewWorkGroup as NewWorkGroup__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, WatchOptions as WatchOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { CommandLineResult as CommandLineResult__from_tsc, CreateBuilderStatusReporter as CreateBuilderStatusReporter__from_tsc, CreateDiagnosticReporter as CreateDiagnosticReporter__from_tsc, CreateReportErrorSummary as CreateReportErrorSummary__from_tsc, CreateWatchStatusReporter as CreateWatchStatusReporter__from_tsc, ExitStatusProjectReferenceCycle_OutputsSkipped$constant as ExitStatusProjectReferenceCycle_OutputsSkipped$constant__from_tsc, ExitStatus as ExitStatus__from_tsc, ExtendedConfigCache as ExtendedConfigCache__from_tsc, Statistics as Statistics__from_tsc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import { ParsedBuildCommandLine as ParsedBuildCommandLine__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, ConvertToRelativePath as ConvertToRelativePath__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { FS as FS__from_cachedvfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/cachedvfs/package.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_build$BuildTask } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_build$BuildTask } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { IfElse$PointerTo_Named_diagnostics$Message } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { LastOrNil$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { Map$string$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS, $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_build$Orchestrator as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { BuildTask, buildKind, taskResult, updateKindConfig$constant, updateKindNone$constant, upstreamTask } from "./buildtask.js";
import { host } from "./host.js";
import { parseCache } from "./parseCache.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as recovery_value from "@gotots/gostdlib/internal/facets/recovery-value.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import { GoChannel, goSelect } from "@gotots/runtime/channel.js";
import { goInt64 } from "@gotots/runtime/integer.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class Options {
    declare private readonly $goType: void;
    public constructor(public Sys: System__from_tsc | undefined, public Command: {
        value: ParsedBuildCommandLine__from_tsoptions;
    } | undefined, public Testing: CommandLineTesting__from_tsc | undefined) {
    }
    static $copy($source: Options): Options {
        return new Options($source.Sys, $source.Command, $source.Testing);
    }
    static $equal($left: Options, $right: Options): bool {
        return goInterfaceEqual($left.Sys, $right.Sys) &&
            $left.Command
                ===
                    $right.Command && goInterfaceEqual($left.Testing, $right.Testing);
    }
    static $hash($source: Options): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.Sys === undefined ? 0 : $source.Sys.$go$hash());
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.Command));
        $hash = GoMapHash.mix($hash, $source.Testing === undefined ? 0 : $source.Testing.$go$hash());
        return $hash;
    }
    declare private readonly then?: never;
}
export class orchestratorResult {
    declare private readonly $goType: void;
    public constructor(public result: CommandLineResult__from_tsc, public errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public statistics: Statistics__from_tsc, public filesToDelete: RuntimeSlice<gostring>) {
    }
    static $zero(): orchestratorResult {
        return new orchestratorResult(CommandLineResult__from_tsc.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), Statistics__from_tsc.$zero(), RuntimeSlice.nil<gostring>());
    }
    declare private readonly then?: never;
    static $go$private$build$report(b: orchestratorResult | undefined, o: {
        value: Orchestrator;
    } | undefined): void {
        if (Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch)) {
            const __gotots_callee_7: Orchestrator["watchStatusReporter"] = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watchStatusReporter;
            const __gotots_argument_12 = NewCompilerDiagnostic__from_ast(IfElse$PointerTo_Named_diagnostics$Message((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.length === 1, $state__diagnostics.Found_1_error_Watching_for_file_changes, $state__diagnostics.Found_0_errors_Watching_for_file_changes), RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$int((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.length)]));
            (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
        }
        else {
            const __gotots_callee_8: Orchestrator["errorSummaryReporter"] = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorSummaryReporter;
            const __gotots_argument_13 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors;
            (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
        }
        if (!(b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filesToDelete.isNil()) {
            const __gotots_callee_9 = Orchestrator.$go$private$build$createBuilderStatusReporter(o, void 0);
            const __gotots_argument_14 = NewCompilerDiagnostic__from_ast($state__diagnostics.A_non_dry_build_would_delete_the_following_files_Colon_0, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Join(Map$string$string((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filesToDelete, (f: gostring): gostring => {
                    return "\r\n * " + f;
                }), ""))]));
            (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
        }
        if (!Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Diagnostics) && !Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExtendedDiagnostics)) {
            return;
        }
        const __gotots_store_0 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_12 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "statistics");
        const __gotots_receiver_11 = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        const __gotots_argument_15 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_11).SinceStart();
        Statistics__from_tsc.SetTotalTime(__gotots_receiver_12, __gotots_argument_15);
        const __gotots_store_1 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "statistics");
        const __gotots_receiver_13 = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        const __gotots_argument_16 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_13).Writer();
        const __gotots_argument_17 = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing;
        Statistics__from_tsc.Report(__gotots_receiver_14, __gotots_argument_16, __gotots_argument_17);
    }
}
export class Orchestrator {
    declare private readonly $goType: void;
    public constructor(public opts: Options, public comparePathsOptions: ComparePathsOptions__from_tspath, public host: {
        value: host;
    } | undefined, public tasks: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: BuildTask;
    } | undefined>> | undefined, public order: RuntimeSlice<gostring>, public errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public errorSummaryReporter: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined, public watchStatusReporter: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined) {
    }
    static $copy($source: Orchestrator): Orchestrator {
        return new Orchestrator(Options.$copy($source.opts), ComparePathsOptions__from_tspath.$copy($source.comparePathsOptions), $source.host, $source.tasks, $source.order, $source.errors, $source.errorSummaryReporter, $source.watchStatusReporter);
    }
    declare private readonly then?: never;
    static DoCycle(o: {
        value: Orchestrator;
    } | undefined): void {
        let needsConfigUpdate = named_sync_atomic.SyncAtomicBoolOperations.$zero();
        let needsUpdate = named_sync_atomic.SyncAtomicBoolOperations.$zero();
        let mTimes: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined = SyncMap__from_collections.Clone<Path__from_tspath, time__from_gostdlib.Time>(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes);
        Orchestrator.$go$private$build$rangeTask(o, (path: Path__from_tspath, task: {
            value: BuildTask;
        } | undefined): void => {
            {
                let updateKind__shadow_1 = BuildTask.$go$private$build$hasUpdate(task, o, path);
                if (!(updateKind__shadow_1.$value === updateKindNone$constant().$value)) {
                    atomic__from_gostdlib.Bool.Store(needsUpdate, true);
                    if (updateKind__shadow_1.$value === updateKindConfig$constant().$value) {
                        atomic__from_gostdlib.Bool.Store(needsConfigUpdate, true);
                    }
                }
            }
        });
        if (!atomic__from_gostdlib.Bool.Load(needsUpdate)) {
            ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes = mTimes;
            Orchestrator.$go$private$build$resetCaches(o);
            return;
        }
        const __gotots_callee_10: Orchestrator["watchStatusReporter"] = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watchStatusReporter;
        const __gotots_argument_18 = NewCompilerDiagnostic__from_ast($state__diagnostics.File_change_detected_Starting_incremental_compilation, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
        (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
        if (atomic__from_gostdlib.Bool.Load(needsConfigUpdate)) {
            Orchestrator.GenerateGraphReusingOldTasks(o);
        }
        Orchestrator.$go$private$build$buildOrClean(o);
        Orchestrator.$go$private$build$updateWatch(o);
        Orchestrator.$go$private$build$resetCaches(o);
    }
    static GenerateGraph(o: {
        value: Orchestrator;
    } | undefined, oldTasks: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: BuildTask;
    } | undefined>> | undefined): void {
        let projects = ParsedBuildCommandLine__from_tsoptions.ResolvedProjectPaths((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command);
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SingleThreaded));
        Orchestrator.$go$private$build$createBuildTasks(o, oldTasks, projects, wg);
        const __gotots_receiver_6 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_6).RunAndWait();
        let completed = Set__from_collections.$fromStorage<Path__from_tspath>({
            M: GoMap.nil()
        });
        const completed$location = tsonicTypeScriptRuntime.boundLocation({}, () => completed, completed$next => completed = completed$next);
        let analyzing = Set__from_collections.$fromStorage<Path__from_tspath>({
            M: GoMap.nil()
        });
        const analyzing$location = tsonicTypeScriptRuntime.boundLocation({}, () => analyzing, analyzing$next => analyzing = analyzing$next);
        let circularityStack = RuntimeSlice.literal<gostring>([]);
        const __gotots_range_0 = projects;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let project = __gotots_range_value_0;
            Orchestrator.$go$private$build$setupBuildTask(o, project, void 0, false, completed$location, analyzing$location, circularityStack);
        }
    }
    static GenerateGraphReusingOldTasks(o: {
        value: Orchestrator;
    } | undefined): void {
        let tasks: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
            value: BuildTask;
        } | undefined>> | undefined = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks;
        const __gotots_struct_5 = SyncMap__from_collections.$zero<Path__from_tspath, {
            value: BuildTask;
        } | undefined>();
        (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks =
            tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, {
                value: BuildTask;
            } | undefined>>(__gotots_struct_5);
        (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.order = RuntimeSlice.nil<gostring>();
        (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        Orchestrator.GenerateGraph(o, tasks);
    }
    static Order(o: {
        value: Orchestrator;
    } | undefined): RuntimeSlice<gostring> {
        return (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.order;
    }
    static Start(o: {
        value: Orchestrator;
    } | undefined, ctx: GoInterface | undefined): CommandLineResult__from_tsc {
        if (Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch)) {
            const __gotots_callee_0: Orchestrator["watchStatusReporter"] = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watchStatusReporter;
            const __gotots_argument_5 = NewCompilerDiagnostic__from_ast($state__diagnostics.Starting_compilation_in_watch_mode, RuntimeSlice.nil<$goInterface$Interface_void | undefined>());
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
        }
        Orchestrator.GenerateGraph(o, void 0);
        let result = Orchestrator.$go$private$build$buildOrClean(o);
        if (Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch)) {
            Orchestrator.Watch(o, ctx);
            result.Watcher = new GoInterfaceAdapter(o);
        }
        return CommandLineResult__from_tsc.$copy(result);
    }
    static Watch(o: {
        value: Orchestrator;
    } | undefined, ctx: GoInterface | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    Orchestrator.$go$private$build$updateWatch(o);
                    Orchestrator.$go$private$build$resetCaches(o);
                    if ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing === undefined) {
                        let watchInterval = WatchOptions__from_core.WatchInterval(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.WatchOptions);
                        const __gotots_conversion_0 = time__from_gostdlib.NewTicker(watchInterval);
                        let ticker: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker> | undefined = __gotots_conversion_0 === undefined ? undefined :
                            tsonicTypeScriptRuntime.boundLocation<time__from_gostdlib.Ticker>(__gotots_conversion_0, (): time__from_gostdlib.Ticker => {
                                return __gotots_conversion_0;
                            }, ($go$providerPointerValue: time__from_gostdlib.Ticker): void => {
                                named_time.TimeTickerOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                            });
                        const __gotots_receiver_7 = ticker;
                        const __gotots_receiver_8 = __gotots_receiver_7 === void 0 ? void 0 :
                            (__gotots_receiver_7 as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker>).value;
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            recovery_value.TimeTickerStop(__gotots_receiver_8, $go$recovery);
                        });
                        for (;;) {
                            const __gotots_receiver_9 = ctx;
                            const __gotots_channel_0 = goInterfaceNonNil<GoInterface>(__gotots_receiver_9).Done();
                            const __gotots_channel_1 = (value: GoEmptyStruct, ok: boolean): void => {
                                __gotots_receive_0 = [value, ok];
                            };
                            let __gotots_receive_0: [
                                GoEmptyStruct,
                                boolean
                            ] | undefined = undefined;
                            const __gotots_select_0 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
                            let __gotots_receive_1: [
                                time__from_gostdlib.Time,
                                boolean
                            ] | undefined = undefined;
                            const __gotots_select_1 = GoChannel.$selectReceive(((ticker ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Ticker>).value.C, (value: time__from_gostdlib.Time, ok: boolean): void => {
                                __gotots_receive_1 = [value, ok];
                            });
                            const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1]);
                            switch (__gotots_switch_selection_0) {
                                case 0: {
                                    break __gotots_return_block_0;
                                    break;
                                }
                                case 1: {
                                    Orchestrator.DoCycle(o);
                                    break;
                                }
                                default: GoPanic.raiseRuntime("select returned an invalid case");
                            }
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
    static $go$private$build$buildOrClean(o: {
        value: Orchestrator;
    } | undefined): CommandLineResult__from_tsc {
        if (!Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clean) && Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Verbose)) {
            const __gotots_callee_1 = Orchestrator.$go$private$build$createBuilderStatusReporter(o, void 0);
            const __gotots_argument_6 = NewCompilerDiagnostic__from_ast($state__diagnostics.Projects_in_this_build_Colon_0, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Join(Map$string$string(Orchestrator.Order(o), (p: gostring): gostring => {
                    return "\r\n    * " + Orchestrator.$go$private$build$relativeFileName(o, p);
                }), ""))]));
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
        }
        let buildResult = orchestratorResult.$zero();
        if ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors.length === 0) {
            buildResult.statistics.Projects = Orchestrator.Order(o).length;
            Orchestrator.$go$private$build$rangeTask(o, (path: Path__from_tspath, task: {
                value: BuildTask;
            } | undefined): void => {
                Orchestrator.$go$private$build$buildOrCleanProject(o, task, path, buildResult);
            });
        }
        else {
            buildResult.result.Status = ExitStatusProjectReferenceCycle_OutputsSkipped$constant__from_tsc();
            let reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined = Orchestrator.$go$private$build$createDiagnosticReporter(o, void 0);
            const __gotots_range_1: Orchestrator["errors"] = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let err: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_1;
                const __gotots_callee_2 = reportDiagnostic;
                const __gotots_argument_7 = err;
                (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7);
            }
            buildResult.errors = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors;
        }
        orchestratorResult.$go$private$build$report(buildResult, o);
        return CommandLineResult__from_tsc.$copy(buildResult.result);
    }
    static $go$private$build$buildOrCleanProject(o: {
        value: Orchestrator;
    } | undefined, task: {
        value: BuildTask;
    } | undefined, path: Path__from_tspath, buildResult: orchestratorResult | undefined): void {
        (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result =
            { value: new taskResult(named_strings.StringsBuilderOperations.$zero(), void 0, void 0, new ExitStatus__from_tsc(0), void 0, void 0, new buildKind(0), RuntimeSlice.nil<gostring>()) };
        ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus = Orchestrator.$go$private$build$createBuilderStatusReporter(o, task);
        ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReporter = Orchestrator.$go$private$build$createDiagnosticReporter(o, task);
        if (!Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Clean)) {
            BuildTask.$go$private$build$buildProject(task, o, path);
        }
        else {
            BuildTask.$go$private$build$cleanProject(task, o, path);
        }
        BuildTask.$go$private$build$report(task, o, path, buildResult);
    }
    static $go$private$build$createBuildTasks(o: {
        value: Orchestrator;
    } | undefined, oldTasks: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: BuildTask;
    } | undefined>> | undefined, configs: RuntimeSlice<gostring>, wg: WorkGroup__from_core | undefined): void {
        const __gotots_range_2 = configs;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let config = __gotots_range_value_2;
            const __gotots_receiver_8 = wg;
            const __gotots_argument_8 = (): void => {
                let path = Orchestrator.$go$private$build$toPath(o, config);
                let task: {
                    value: BuildTask;
                } | undefined = void 0;
                let buildInfo: {
                    value: buildInfoEntry;
                } | undefined = void 0;
                if (!(oldTasks === undefined)) {
                    {
                        const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_build$BuildTask(oldTasks, path);
                        let existing: {
                            value: BuildTask;
                        } | undefined = __gotots_results_0[0];
                        let ok = __gotots_results_0[1];
                        if (ok) {
                            if (!(existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty) {
                                task = existing;
                            }
                            else {
                                buildInfo = (existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry;
                            }
                        }
                    }
                }
                if (task === undefined) {
                    task =
                        { value: new BuildTask(config, void 0, RuntimeSlice.nil<{
                                value: upstreamTask;
                            } | undefined>(), RuntimeSlice.nil<{
                                value: BuildTask;
                            } | undefined>(), void 0, undefined, void 0, void 0, undefined, named_time.TimeOperations.$zero(), RuntimeSlice.nil<time__from_gostdlib.Time>(), RuntimeSlice.nil<time__from_gostdlib.Time>(), void 0, named_sync.SyncMutexOperations.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), named_sync_atomic.SyncAtomicBoolOperations.$zero(), oldTasks === undefined, named_sync.SyncMutexOperations.$zero(), false) };
                    atomic__from_gostdlib.Bool.Store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending, true);
                    (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry = buildInfo;
                }
                {
                    const __gotots_results_1 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_build$BuildTask((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks, path, task);
                    let loaded = __gotots_results_1[1];
                    if (loaded) {
                        return;
                    }
                }
                (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved = host.GetResolvedProjectReference((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, config, path);
                (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.upStream = RuntimeSlice.nil<{
                    value: upstreamTask;
                } | undefined>();
                if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined)) {
                    Orchestrator.$go$private$build$createBuildTasks(o, oldTasks, ParsedCommandLine__from_tsoptions.ResolvedProjectReferencePaths((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved), wg);
                }
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_8).Queue(__gotots_argument_8);
        }
    }
    static $go$private$build$createBuilderStatusReporter(o: {
        value: Orchestrator;
    } | undefined, task: {
        value: BuildTask;
    } | undefined): (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined {
        return CreateBuilderStatusReporter__from_tsc((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys, Orchestrator.$go$private$build$getWriter(o, task), ParsedBuildCommandLine__from_tsoptions.Locale((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command), ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions, (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing);
    }
    static $go$private$build$createDiagnosticReporter(o: {
        value: Orchestrator;
    } | undefined, task: {
        value: BuildTask;
    } | undefined): (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined {
        return CreateDiagnosticReporter__from_tsc((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys, Orchestrator.$go$private$build$getWriter(o, task), ParsedBuildCommandLine__from_tsoptions.Locale((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command), ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions);
    }
    static $go$private$build$getTask(o: {
        value: Orchestrator;
    } | undefined, path: Path__from_tspath): {
        value: BuildTask;
    } | undefined {
        const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_build$BuildTask((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks, path);
        let task: {
            value: BuildTask;
        } | undefined = __gotots_results_4[0];
        let ok = __gotots_results_4[1];
        if (!ok) {
            const __gotots_argument_19 = new $goInterfaceAdapter$Named_tspath$Path(new Path__from_tspath("No build task found for " + path.$value));
            GoPanic.raise(__gotots_argument_19 === undefined ? GoPanicNilValue.create() : __gotots_argument_19);
        }
        return task;
    }
    static $go$private$build$getWriter(o: {
        value: Orchestrator;
    } | undefined, task: {
        value: BuildTask;
    } | undefined): $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined {
        if (task === undefined) {
            const __gotots_receiver_16 = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
            return goInterfaceNonNil<System__from_tsc>(__gotots_receiver_16).Writer();
        }
        const __gotots_store_3 = ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return new $goInterfaceAdapter$PointerTo_Named_strings$Builder(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "builder"));
    }
    static $go$private$build$rangeTask(o: {
        value: Orchestrator;
    } | undefined, f: (($0: Path__from_tspath, $1: {
        value: BuildTask;
    } | undefined) => void) | undefined): void {
        let numRoutines = 4;
        if (Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SingleThreaded)) {
            numRoutines = 1;
        }
        else {
            let builders: tsonicTypeScriptRuntime.Location<int> | undefined = (((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Builders;
            if (!(builders === undefined)) {
                numRoutines =
                    ((builders ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
            }
        }
        let currentTaskIndex = named_sync_atomic.SyncAtomicInt64Operations.$zero();
        let getNextTask: (() => [
            Path__from_tspath,
            {
                value: BuildTask;
            } | undefined,
            bool
        ]) | undefined = (): [
            Path__from_tspath,
            {
                value: BuildTask;
            } | undefined,
            bool
        ] => {
            let index = globalThis.Number(BigInt.asIntN(64, goInt64(atomic__from_gostdlib.Int64.Add(currentTaskIndex, 1n) - 1n)));
            if (index >= (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.order.length) {
                return [new Path__from_tspath(""), void 0, false];
            }
            let config = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.order.get(index);
            let path = Orchestrator.$go$private$build$toPath(o, config);
            let task: {
                value: BuildTask;
            } | undefined = Orchestrator.$go$private$build$getTask(o, path);
            return [path, task, true];
        };
        let runTask: (() => void) | undefined = (): void => {
            {
                const __gotots_callee_3 = getNextTask;
                const __gotots_results_2 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
                let path = __gotots_results_2[0];
                let task: {
                    value: BuildTask;
                } | undefined = __gotots_results_2[1];
                let ok = __gotots_results_2[2];
                let __gotots_for_first_0 = true;
                for (;;) {
                    if (__gotots_for_first_0) {
                        __gotots_for_first_0 = false;
                    }
                    else {
                        const __gotots_callee_4 = getNextTask;
                        const __gotots_results_3 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
                        path = __gotots_results_3[0];
                        task = __gotots_results_3[1];
                        ok = __gotots_results_3[2];
                    }
                    if (!ok) {
                        break;
                    }
                    {
                        const __gotots_callee_5 = f;
                        const __gotots_argument_9 = path;
                        const __gotots_argument_10 = task;
                        (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9, __gotots_argument_10);
                    }
                }
            }
        };
        if (numRoutines === 1) {
            const __gotots_callee_6 = runTask;
            (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        else {
            let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(false);
            const __gotots_range_4 = numRoutines;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4; __gotots_range_index_4++) {
                const __gotots_receiver_9 = wg;
                const __gotots_argument_11 = runTask;
                goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_9).Queue(__gotots_argument_11);
            }
            const __gotots_receiver_10 = wg;
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_10).RunAndWait();
        }
    }
    static $go$private$build$relativeFileName(o: {
        value: Orchestrator;
    } | undefined, fileName: gostring): gostring {
        return ConvertToRelativePath__from_tspath(fileName, ComparePathsOptions__from_tspath.$copy((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions));
    }
    static $go$private$build$resetCaches(o: {
        value: Orchestrator;
    } | undefined): void {
        const __gotots_receiver_15: host["host"] = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        let cachesVfs: {
            value: FS__from_cachedvfs;
        } | undefined = (($value: FS__from_vfs | undefined): {
            value: FS__from_cachedvfs;
        } | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_cachedvfs$FS.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })(goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_15).FS());
        FS__from_cachedvfs.ClearCache(cachesVfs);
        const __gotots_struct_3 = ExtendedConfigCache__from_tsc.$zero();
        ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigCache = __gotots_struct_3;
        const __gotots_store_2 = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        parseCache.$go$private$build$reset<SourceFileParseOptions__from_ast, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "sourceFiles"));
        const __gotots_struct_4 = SyncMap__from_collections.$zero<Path__from_tspath, time__from_gostdlib.Duration>();
        ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configTimes = __gotots_struct_4;
    }
    static $go$private$build$setupBuildTask(o: {
        value: Orchestrator;
    } | undefined, configName: gostring, downStream: {
        value: BuildTask;
    } | undefined, inCircularContext: bool, completed: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, analyzing: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, circularityStack: RuntimeSlice<gostring>): {
        value: BuildTask;
    } | undefined {
        let path = Orchestrator.$go$private$build$toPath(o, configName);
        let task: {
            value: BuildTask;
        } | undefined = Orchestrator.$go$private$build$getTask(o, path);
        if (!Set__from_collections.Has<Path__from_tspath>(completed, path)) {
            if (Set__from_collections.Has<Path__from_tspath>(analyzing, path)) {
                if (!inCircularContext) {
                    (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors.append(void 0, [NewCompilerDiagnostic__from_ast($state__diagnostics.Project_references_may_not_form_a_circular_graph_Cycle_detected_Colon_0, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Join(circularityStack, "\n"))]))]);
                }
                return void 0;
            }
            Set$Add$Named_tspath$Path(analyzing, path);
            circularityStack = circularityStack.append("", [configName]);
            if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined)) {
                const __gotots_range_3 = ParsedCommandLine__from_tsoptions.ResolvedProjectReferencePaths((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
                    const __gotots_range_value_3 = __gotots_range_index_3;
                    const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
                    let index = __gotots_range_value_3;
                    let subReference = __gotots_range_value_4;
                    let upstream: {
                        value: BuildTask;
                    } | undefined = Orchestrator.$go$private$build$setupBuildTask(o, subReference, task, inCircularContext || (ParsedCommandLine__from_tsoptions.ProjectReferences((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved).get(index) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Circular, completed, analyzing, circularityStack);
                    if (!(upstream === undefined)) {
                        (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.upStream = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.upStream.append(void 0, [
                            { value: new upstreamTask(upstream, index) },
                        ]);
                    }
                }
            }
            circularityStack = circularityStack.slice(0, circularityStack.length - 1, null);
            Set$Add$Named_tspath$Path(completed, path);
            (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportDone = GoChannel.make<GoEmptyStruct>(0, (): GoEmptyStruct => {
                return GoEmptyStruct.$zero();
            }, (value: GoEmptyStruct): GoEmptyStruct => {
                return (void GoEmptyStruct.$copy,
                    value);
            });
            let prev = LastOrNil$string((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.order);
            if (prev !== "") {
                (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.prevReporter = Orchestrator.$go$private$build$getTask(o, Orchestrator.$go$private$build$toPath(o, prev));
            }
            (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done = GoChannel.make<GoEmptyStruct>(0, (): GoEmptyStruct => {
                return GoEmptyStruct.$zero();
            }, (value: GoEmptyStruct): GoEmptyStruct => {
                return (void GoEmptyStruct.$copy,
                    value);
            });
            (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.order = (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.order.append("", [configName]);
        }
        if (Tristate_IsTrue__from_core((((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch) && !(downStream === undefined)) {
            (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.downStream = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.downStream.append(void 0, [downStream]);
        }
        return task;
    }
    static $go$private$build$toPath(o: {
        value: Orchestrator;
    } | undefined, fileName: gostring): Path__from_tspath {
        return ToPath__from_tspath(fileName, (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions.CurrentDirectory, (o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions.UseCaseSensitiveFileNames);
    }
    static $go$private$build$updateWatch(o: {
        value: Orchestrator;
    } | undefined): void {
        let oldCache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined = ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes;
        const __gotots_struct_2 = SyncMap__from_collections.$zero<Path__from_tspath, time__from_gostdlib.Time>();
        ((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes =
            tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>>(__gotots_struct_2);
        Orchestrator.$go$private$build$rangeTask(o, (path: Path__from_tspath, task: {
            value: BuildTask;
        } | undefined): void => {
            BuildTask.$go$private$build$updateWatch(task, o, oldCache);
        });
    }
}
export function NewOrchestrator(opts: Options): {
    value: Orchestrator;
} | undefined {
    const __gotots_field_2 = Options.$copy(opts);
    const __gotots_receiver_0 = opts.Sys;
    const __gotots_field_0 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_0).GetCurrentDirectory();
    const __gotots_receiver_1 = opts.Sys;
    const __gotots_receiver_2 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_1).FS();
    const __gotots_field_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).UseCaseSensitiveFileNames();
    const __gotots_field_3 = new ComparePathsOptions__from_tspath(__gotots_field_1, __gotots_field_0);
    const __gotots_struct_0 = SyncMap__from_collections.$zero<Path__from_tspath, {
        value: BuildTask;
    } | undefined>();
    const __gotots_field_4 = tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, {
        value: BuildTask;
    } | undefined>>(__gotots_struct_0);
    let orchestrator: {
        value: Orchestrator;
    } | undefined = { value: new Orchestrator(__gotots_field_2, __gotots_field_3, void 0, __gotots_field_4, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), void 0, void 0) };
    const __gotots_field_5 = orchestrator;
    const __gotots_receiver_3 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
    const __gotots_argument_0 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_3).GetCurrentDirectory();
    const __gotots_receiver_4 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
    const __gotots_argument_1 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_4).FS();
    const __gotots_receiver_5 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
    const __gotots_argument_2 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_5).DefaultLibraryPath();
    const __gotots_argument_3 = void 0;
    const __gotots_argument_4 = void 0;
    const __gotots_field_6 = NewCachedFSCompilerHost__from_compiler(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
    const __gotots_struct_1 = SyncMap__from_collections.$zero<Path__from_tspath, time__from_gostdlib.Time>();
    const __gotots_field_7 = tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>>(__gotots_struct_1);
    (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host =
        { value: new host(__gotots_field_5, __gotots_field_6, ExtendedConfigCache__from_tsc.$zero(), parseCache.$zero<SourceFileParseOptions__from_ast, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, time__from_gostdlib.Duration>(), parseCache.$zero<Path__from_tspath, tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined>(), __gotots_field_7) };
    if (Tristate_IsTrue__from_core(((opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch)) {
        (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.watchStatusReporter = CreateWatchStatusReporter__from_tsc(opts.Sys, ParsedBuildCommandLine__from_tsoptions.Locale(opts.Command), (opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions, opts.Testing);
    }
    else {
        (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errorSummaryReporter = CreateReportErrorSummary__from_tsc(opts.Sys, ParsedBuildCommandLine__from_tsoptions.Locale(opts.Command), (opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions);
    }
    return orchestrator;
}
