import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { EmitResult as EmitResult__from_compiler, WriteFileData as WriteFileData__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { BuildOptions as BuildOptions__from_core, ProjectReference as ProjectReference__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { BuildInfoReader as BuildInfoReader__from_incremental } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/incremental/package.js";
import type { CommandLineTesting as CommandLineTesting__from_tsc, ExitStatus as ExitStatus__from_tsc, System as System__from_tsc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../../support/provider-interface-bridges.js";
import type { orchestratorResult } from "./orchestrator.js";
import type { parseCache } from "./parseCache.js";
import type * as scalars from "@gotots/gostdlib/internal/scalars.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewProgram as NewProgram__from_compiler, ProgramOptions as ProgramOptions__from_compiler, Program as Program__from_compiler, WriteFile as WriteFile__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, ResolveConfigFileNameOfProjectReference as ResolveConfigFileNameOfProjectReference__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, Version as Version__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { BuildInfoFileInfo as BuildInfoFileInfo__from_incremental, BuildInfoRootInfoReader as BuildInfoRootInfoReader__from_incremental, BuildInfo as BuildInfo__from_incremental, ComputeHash as ComputeHash__from_incremental, FileInfo as FileInfo__from_incremental, NewBuildInfoReader as NewBuildInfoReader__from_incremental, NewProgram as NewProgram__from_incremental, Program as Program__from_incremental, ReadBuildInfoProgram as ReadBuildInfoProgram__from_incremental } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/incremental/package.js";
import { CompileTimes as CompileTimes__from_tsc, EmitAndReportStatistics as EmitAndReportStatistics__from_tsc, EmitInput as EmitInput__from_tsc, ExitStatusDiagnosticsPresent_OutputsGenerated$constant as ExitStatusDiagnosticsPresent_OutputsGenerated$constant__from_tsc, ExitStatusDiagnosticsPresent_OutputsSkipped$constant as ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc, GetTraceWithWriterFromSys as GetTraceWithWriterFromSys__from_tsc, QuietDiagnosticsReporter as QuietDiagnosticsReporter__from_tsc, Statistics as Statistics__from_tsc } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import { ParsedBuildCommandLine as ParsedBuildCommandLine__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewSetFromItems$Named_tspath$Path, NewSetFromItems$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetFromItems.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { SyncMap$Load$Named_tspath$Path$Named_time$Duration } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Store$Named_tspath$Path$Named_time$Duration } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { FirstOrNilSeq$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstOrNilSeq.js";
import { IfElse$Named_build$upToDateStatusType, IfElse$Named_build$updateKind, IfElse$PointerTo_Named_diagnostics$Message, IfElse$SliceOf_PointerTo_Named_ast$Diagnostic } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$string$Named_time$Time, Map$string$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { parseCache$delete$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/execute/build/parseCache$delete.js";
import { parseCache$store$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/execute/build/parseCache$store.js";
import { Equal$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/Equal.js";
import { $goInterfaceAdapter$Named_build$upToDateStatusType, $goInterfaceAdapter$PointerTo_Named_build$compilerHost, $goInterfaceAdapter$PointerTo_Named_build$host, $goInterfaceAdapter$PointerTo_Named_build$inputOutputFileAndTime, $goInterfaceAdapter$PointerTo_Named_build$inputOutputName, $goInterfaceAdapter$PointerTo_Named_build$upstreamErrors, $goInterfaceAdapter$PointerTo_Named_incremental$BuildInfo, $goInterfaceAdapter$PointerTo_Named_incremental$Program, $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { compilerHost } from "./compilerHost.js";
import { host } from "./host.js";
import { Orchestrator } from "./orchestrator.js";
import { fileAndTime, inputOutputFileAndTime, inputOutputName, upToDateStatus, upToDateStatusTypeBuildErrors$constant, upToDateStatusTypeConfigFileNotFound$constant, upToDateStatusTypeForceBuild$constant, upToDateStatusTypeInputFileMissing$constant, upToDateStatusTypeInputFileNewer$constant, upToDateStatusTypeOutOfDateBuildInfoWithErrors$constant, upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit$constant, upToDateStatusTypeOutOfDateOptions$constant, upToDateStatusTypeOutOfDateRoots$constant, upToDateStatusTypeOutputMissing$constant, upToDateStatusTypeSolution$constant, upToDateStatusTypeTsVersionOutputOfDate$constant, upToDateStatusTypeUpToDate$constant, upToDateStatusTypeUpToDateWithInputFileText$constant, upToDateStatusTypeUpToDateWithUpstreamTypes$constant, upToDateStatusTypeUpstreamErrors$constant, upstreamErrors } from "./uptodatestatus.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { GoChannel } from "@gotots/runtime/channel.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export class updateKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint) {
    }
    declare private readonly then?: never;
}
export function updateKindNone$constant(): updateKind {
    return new updateKind(0);
}
export function updateKindConfig$constant(): updateKind {
    return new updateKind(1);
}
export function updateKindUpdate$constant(): updateKind {
    return new updateKind(2);
}
export class buildKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: uint) {
    }
    declare private readonly then?: never;
}
export function buildKindPseudo$constant(): buildKind {
    return new buildKind(1);
}
export function buildKindProgram$constant(): buildKind {
    return new buildKind(2);
}
export class upstreamTask {
    declare private readonly $goType: void;
    public constructor(public task: {
        value: BuildTask;
    } | undefined, public refIndex: int) {
    }
    static $copy($source: upstreamTask): upstreamTask {
        return new upstreamTask($source.task, $source.refIndex);
    }
    static $equal($left: upstreamTask, $right: upstreamTask): bool {
        return $left.task
            ===
                $right.task
            && $left.refIndex === $right.refIndex;
    }
    static $hash($source: upstreamTask): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer)))($source.task));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.refIndex));
        return $hash;
    }
    declare private readonly then?: never;
}
export class buildInfoEntry {
    declare private readonly $goType: void;
    public constructor(public buildInfo: BuildInfo__from_incremental | undefined, public path: Path__from_tspath, public mTime: time__from_gostdlib.Time, public dtsTime: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Time> | undefined) {
    }
    static $copy($source: buildInfoEntry): buildInfoEntry {
        return new buildInfoEntry($source.buildInfo, $source.path, named_time.TimeOperations.$copy($source.mTime), $source.dtsTime);
    }
    static $equal($left: buildInfoEntry, $right: buildInfoEntry): bool {
        return $left.buildInfo
            ===
                $right.buildInfo
            && $left.path.$value === $right.path.$value && named_time.TimeOperations.$equal($left.mTime, $right.mTime) &&
            tsonicTypeScriptRuntime.sameLocation($left.dtsTime, $right.dtsTime);
    }
    static $hash($source: buildInfoEntry): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, (($pointer2: object | undefined) => tsonicTypeScriptRuntime.hashRawPointer($pointer2 === void 0 ? void 0 : tsonicTypeScriptRuntime.rawPointer($pointer2)))($source.buildInfo));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.path.$value));
        $hash = GoMapHash.mix($hash, named_time.TimeOperations.$hash($source.mTime));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.dtsTime));
        return $hash;
    }
    declare private readonly then?: never;
}
export class taskResult {
    declare private readonly $goType: void;
    public constructor(public builder: strings__from_gostdlib.Builder, public reportStatus: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, public diagnosticReporter: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, public exitStatus: ExitStatus__from_tsc, public statistics: tsonicTypeScriptRuntime.Location<Statistics__from_tsc> | undefined, public program: {
        value: Program__from_incremental;
    } | undefined, public buildKind: buildKind, public filesToDelete: RuntimeSlice<gostring>) {
    }
    static $copy($source: taskResult): taskResult {
        return new taskResult(named_strings.StringsBuilderOperations.$copy($source.builder), $source.reportStatus, $source.diagnosticReporter, $source.exitStatus, $source.statistics, $source.program, $source.buildKind, $source.filesToDelete);
    }
    declare private readonly then?: never;
}
export class BuildTask {
    declare private readonly $goType: void;
    public constructor(public config: gostring, public resolved: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public upStream: RuntimeSlice<{
        value: upstreamTask;
    } | undefined>, public downStream: RuntimeSlice<{
        value: BuildTask;
    } | undefined>, public status: {
        value: upToDateStatus;
    } | undefined, public done: GoChannel<GoEmptyStruct> | undefined, public result: {
        value: taskResult;
    } | undefined, public prevReporter: {
        value: BuildTask;
    } | undefined, public reportDone: GoChannel<GoEmptyStruct> | undefined, public configTime: time__from_gostdlib.Time, public extendedConfigTimes: RuntimeSlice<time__from_gostdlib.Time>, public inputFiles: RuntimeSlice<time__from_gostdlib.Time>, public buildInfoEntry: {
        value: buildInfoEntry;
    } | undefined, public buildInfoEntryMu: sync__from_gostdlib.Mutex, public errors: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public pending: atomic__from_gostdlib.Bool, public isInitialCycle: bool, public downStreamUpdateMu: sync__from_gostdlib.Mutex, public dirty: bool) {
    }
    static $copy($source: BuildTask): BuildTask {
        return new BuildTask($source.config, $source.resolved, $source.upStream, $source.downStream, $source.status, $source.done, $source.result, $source.prevReporter, $source.reportDone, named_time.TimeOperations.$copy($source.configTime), $source.extendedConfigTimes, $source.inputFiles, $source.buildInfoEntry, named_sync.SyncMutexOperations.$copy($source.buildInfoEntryMu), $source.errors, named_sync_atomic.SyncAtomicBoolOperations.$copy($source.pending), $source.isInitialCycle, named_sync.SyncMutexOperations.$copy($source.downStreamUpdateMu), $source.dirty);
    }
    declare private readonly then?: never;
    static $go$private$build$buildProject(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, path: Path__from_tspath): void {
        BuildTask.$go$private$build$waitOnUpstream(t);
        if (atomic__from_gostdlib.Bool.Load((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending)) {
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status = BuildTask.$go$private$build$getUpToDateStatus(t, orchestrator, path);
            BuildTask.$go$private$build$reportUpToDateStatus(t, orchestrator);
            if (!BuildTask.$go$private$build$handleStatusThatDoesntRequireBuild(t, orchestrator)) {
                BuildTask.$go$private$build$compileAndEmit(t, orchestrator, path);
                BuildTask.$go$private$build$updateDownstream(t, orchestrator, path);
            }
            else {
                if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined)) {
                    const __gotots_range_0 = ParsedCommandLine__from_tsoptions.GetConfigFileParsingDiagnostics((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
                    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                        let diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_0;
                        BuildTask.$go$private$build$reportDiagnostic(t, diagnostic);
                    }
                }
                if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors.length > 0) {
                    ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exitStatus = ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc();
                }
            }
        }
        else {
            if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors.length > 0) {
                BuildTask.$go$private$build$reportUpToDateStatus(t, orchestrator);
                const __gotots_range_1: BuildTask["errors"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let err: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_1;
                    const __gotots_callee_0: taskResult["diagnosticReporter"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReporter;
                    const __gotots_argument_0 = err;
                    (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
                }
            }
        }
        BuildTask.$go$private$build$unblockDownstream(t);
    }
    static $go$private$build$canUpdateJsDtsOutputTimestamps(t: {
        value: BuildTask;
    } | undefined): bool {
        return !Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit) && !CompilerOptions__from_core.IsIncremental(ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
    }
    static $go$private$build$cleanProject(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, path: Path__from_tspath): void {
        if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined) {
            BuildTask.$go$private$build$reportDiagnostic(t, NewCompilerDiagnostic__from_ast($state__diagnostics.File_0_not_found, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)])));
            ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exitStatus = ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc();
            return;
        }
        const __gotots_argument_1 = ParsedCommandLine__from_tsoptions.FileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
        const __gotots_receiver_0 = orchestrator;
        const __gotots_argument_2 = ($argument0: gostring): Path__from_tspath => {
            return Orchestrator.$go$private$build$toPath(__gotots_receiver_0, $argument0);
        };
        const __gotots_argument_3 = Map$string$Named_tspath$Path(__gotots_argument_1, __gotots_argument_2);
        let inputs: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = NewSetFromItems$Named_tspath$Path(__gotots_argument_3);
        const __gotots_range_2 = named_iter.IterSeqValueOperations.$project(ParsedCommandLine__from_tsoptions.GetOutputFileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
        if (__gotots_range_2 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_2(($argument0: gostring): bool => {
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
            const __gotots_range_value_2 = $argument0;
            let outputFile = __gotots_range_value_2;
            BuildTask.$go$private$build$cleanProjectOutput(t, orchestrator, outputFile, inputs);
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        BuildTask.$go$private$build$cleanProjectOutput(t, orchestrator, ParsedCommandLine__from_tsoptions.GetBuildInfoFileName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved), inputs);
    }
    static $go$private$build$cleanProjectOutput(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, outputFile: gostring, inputs: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): void {
        let outputPath = Orchestrator.$go$private$build$toPath(orchestrator, outputFile);
        if (Set__from_collections.Has<Path__from_tspath>(inputs, outputPath)) {
            return;
        }
        const __gotots_receiver_13 = host.FS((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
        const __gotots_argument_37 = outputFile;
        if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_13).FileExists(__gotots_argument_37)) {
            if (!Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Dry)) {
                const __gotots_receiver_14 = host.FS((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
                const __gotots_argument_38 = outputFile;
                let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_14).Remove(__gotots_argument_38);
                if (!(err === undefined)) {
                    BuildTask.$go$private$build$reportDiagnostic(t, NewCompilerDiagnostic__from_ast($state__diagnostics.Failed_to_delete_file_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(outputFile)])));
                }
            }
            else {
                ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.filesToDelete = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.filesToDelete.append("", [outputFile]);
            }
        }
    }
    static $go$private$build$compileAndEmit(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, path: Path__from_tspath): void {
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Verbose)) {
            const __gotots_callee_22: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
            const __gotots_argument_30 = NewCompilerDiagnostic__from_ast($state__diagnostics.Building_project_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config))]));
            (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
        }
        let compileTimes = CompileTimes__from_tsc.$zero();
        const compileTimes$location = tsonicTypeScriptRuntime.boundLocation({}, () => compileTimes, compileTimes$next => compileTimes = compileTimes$next);
        const __gotots_store_5 = ((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$Named_time$Duration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "configTimes"), path);
        let configTime = __gotots_results_3[0];
        compileTimes.ConfigTime = configTime;
        const __gotots_receiver_6 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        let buildInfoReadStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_6).Now();
        let oldProgram: {
            value: Program__from_incremental;
        } | undefined = void 0;
        if (!Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Force)) {
            oldProgram = ReadBuildInfoProgram__from_incremental((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved, new $goInterfaceAdapter$PointerTo_Named_build$host((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host), new $goInterfaceAdapter$PointerTo_Named_build$host((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host));
        }
        const __gotots_receiver_7 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        compileTimes.BuildInfoReadTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_7).Now().Sub(named_time.TimeOperations.$copy(buildInfoReadStart));
        const __gotots_receiver_8 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        let parseStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_8).Now();
        const __gotots_field_2: BuildTask["resolved"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved;
        const __gotots_field_0: Orchestrator["host"] = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
        const __gotots_store_6 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_31 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "builder"));
        const __gotots_argument_32 = ParsedBuildCommandLine__from_tsoptions.Locale((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command);
        const __gotots_argument_33 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing;
        const __gotots_field_1 = GetTraceWithWriterFromSys__from_tsc(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
        const __gotots_field_3 = new $goInterfaceAdapter$PointerTo_Named_build$compilerHost({ value: new compilerHost(__gotots_field_0, __gotots_field_1) });
        const __gotots_argument_34 = new ProgramOptions__from_compiler(__gotots_field_3, __gotots_field_2, false, 0, void 0, "", "", void 0);
        let program: {
            value: Program__from_compiler;
        } | undefined = NewProgram__from_compiler(__gotots_argument_34);
        const __gotots_receiver_9 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        compileTimes.ParseTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_9).Now().Sub(named_time.TimeOperations.$copy(parseStart));
        const __gotots_receiver_10 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        let changesComputeStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_10).Now();
        ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program = NewProgram__from_incremental(program, oldProgram, new $goInterfaceAdapter$PointerTo_Named_build$host((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host), !((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing === undefined));
        const __gotots_receiver_11 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        compileTimes.ChangesComputeTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_11).Now().Sub(named_time.TimeOperations.$copy(changesComputeStart));
        const __gotots_field_4 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        const __gotots_field_5 = new $goInterfaceAdapter$PointerTo_Named_incremental$Program(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
        const __gotots_field_6 = program;
        const __gotots_field_7: BuildTask["resolved"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved;
        const __gotots_receiver_12 = t;
        const __gotots_field_8 = ($argument0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void => {
            BuildTask.$go$private$build$reportDiagnostic(__gotots_receiver_12, $argument0);
        };
        const __gotots_field_9 = QuietDiagnosticsReporter__from_tsc;
        const __gotots_store_7 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_field_10 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "builder"));
        const __gotots_argument_35 = new EmitInput__from_tsc(__gotots_field_4, __gotots_field_5, __gotots_field_6, __gotots_field_7, __gotots_field_8, __gotots_field_9, __gotots_field_10, new WriteFile__from_compiler((fileName: gostring, text: gostring, data: WriteFileData__from_compiler | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            return BuildTask.$go$private$build$writeFile(t, orchestrator, fileName, text, data);
        }), compileTimes$location, (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing, ((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTimes, void 0);
        const __gotots_results_4 = EmitAndReportStatistics__from_tsc(__gotots_argument_35);
        let result = __gotots_results_4[0];
        let statistics: tsonicTypeScriptRuntime.Location<Statistics__from_tsc> | undefined = __gotots_results_4[1];
        ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exitStatus = result.Status;
        ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.statistics = statistics;
        if ((!Tristate_IsTrue__from_core((Program__from_compiler.Options(program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitOnError) || result.Diagnostics.length === 0) && (((result.EmitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles.length > 0 || !(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === upToDateStatusTypeOutOfDateBuildInfoWithErrors$constant()))) {
            BuildTask.$go$private$build$updateTimeStamps(t, orchestrator, ((result.EmitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles, $state__diagnostics.Updating_unchanged_output_timestamps_of_project_0);
        }
        ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildKind = buildKindProgram$constant();
        if (result.Status.$value === ExitStatusDiagnosticsPresent_OutputsSkipped$constant__from_tsc().$value || result.Status.$value === ExitStatusDiagnosticsPresent_OutputsGenerated$constant__from_tsc().$value) {
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status =
                { value: new upToDateStatus(upToDateStatusTypeBuildErrors$constant(), void 0) };
        }
        else {
            let oldestOutputFileName = "";
            if (((result.EmitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles.length > 0) {
                oldestOutputFileName = ((result.EmitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles.get(0);
            }
            else {
                oldestOutputFileName = FirstOrNilSeq$string(ParsedCommandLine__from_tsoptions.GetOutputFileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
            }
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status =
                { value: new upToDateStatus(upToDateStatusTypeUpToDate$constant(), new GoInterfaceAdapter(oldestOutputFileName)) };
        }
    }
    static $go$private$build$getLatestChangedDtsMTime(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined): time__from_gostdlib.Time {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: time__from_gostdlib.Time = named_time.TimeOperations.$zero();
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu);
                    const __gotots_receiver_16: BuildTask["buildInfoEntryMu"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_16, $go$recovery);
                    };
                    if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dtsTime === undefined)) {
                        __gotots_return_0 = named_time.TimeOperations.$copy(named_time.TimeOperations.$copy(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dtsTime ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<time__from_gostdlib.Time>).value));
                        break __gotots_return_block_0;
                    }
                    let dtsTime = host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, GetNormalizedAbsolutePath__from_tspath((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LatestChangedDtsFile, GetDirectoryPath__from_tspath(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path.$value)));
                    const dtsTime$location = tsonicTypeScriptRuntime.boundLocation({}, () => dtsTime, dtsTime$next => dtsTime = dtsTime$next);
                    ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dtsTime =
                        dtsTime$location;
                    __gotots_return_0 = named_time.TimeOperations.$copy(dtsTime);
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$build$getUpToDateStatus(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, configPath: Path__from_tspath): {
        value: upToDateStatus;
    } | undefined {
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status === undefined)) {
            return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status;
        }
        if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined) {
            return { value: new upToDateStatus(upToDateStatusTypeConfigFileNotFound$constant(), void 0) };
        }
        if (ParsedCommandLine__from_tsoptions.FileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved).length === 0 && !ParsedCommandLine__from_tsoptions.ProjectReferences((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved).isNil()) {
            return { value: new upToDateStatus(upToDateStatusTypeSolution$constant(), void 0) };
        }
        const __gotots_range_7: BuildTask["upStream"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.upStream;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_7.length; __gotots_range_index_5++) {
            const __gotots_range_value_9 = __gotots_range_7.get(__gotots_range_index_5);
            let upstream: {
                value: upstreamTask;
            } | undefined = __gotots_range_value_9;
            if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StopBuildOnErrors) && upToDateStatus.$go$private$build$isError(((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status)) {
                return { value: new upToDateStatus(upToDateStatusTypeUpstreamErrors$constant(), new $goInterfaceAdapter$PointerTo_Named_build$upstreamErrors({ value: new upstreamErrors((ParsedCommandLine__from_tsoptions.ProjectReferences((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved).get((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refIndex) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path, (((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === upToDateStatusTypeUpstreamErrors$constant()) })) };
            }
        }
        if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Force)) {
            return { value: new upToDateStatus(upToDateStatusTypeForceBuild$constant(), void 0) };
        }
        let buildInfoPath = ParsedCommandLine__from_tsoptions.GetBuildInfoFileName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
        const __gotots_results_0 = BuildTask.$go$private$build$loadOrStoreBuildInfo(t, orchestrator, configPath, buildInfoPath);
        let buildInfo: BuildInfo__from_incremental | undefined = __gotots_results_0[0];
        let buildInfoTime = __gotots_results_0[1];
        if (buildInfo === undefined) {
            return { value: new upToDateStatus(upToDateStatusTypeOutputMissing$constant(), new GoInterfaceAdapter(buildInfoPath)) };
        }
        if (!BuildInfo__from_incremental.IsValidVersion(buildInfo)) {
            return { value: new upToDateStatus(upToDateStatusTypeTsVersionOutputOfDate$constant(), new GoInterfaceAdapter((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Version)) };
        }
        if ((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Errors || (!Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoCheck) && ((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SemanticErrors || (buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CheckPending))) {
            return { value: new upToDateStatus(upToDateStatusTypeOutOfDateBuildInfoWithErrors$constant(), new GoInterfaceAdapter(buildInfoPath)) };
        }
        if (CompilerOptions__from_core.IsIncremental(ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved))) {
            if (!BuildInfo__from_incremental.IsIncremental(buildInfo)) {
                return { value: new upToDateStatus(upToDateStatusTypeOutOfDateOptions$constant(), new GoInterfaceAdapter(buildInfoPath)) };
            }
            if ((CompilerOptions__from_core.GetEmitDeclarations(ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved)) && !(buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitDiagnosticsPerFile.isNil()) || (!Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoCheck) && (!(buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ChangeFileSet.isNil() || !(buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SemanticDiagnosticsPerFile.isNil()))) {
                return { value: new upToDateStatus(upToDateStatusTypeOutOfDateBuildInfoWithErrors$constant(), new GoInterfaceAdapter(buildInfoPath)) };
            }
            if (!Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit) && (!(buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ChangeFileSet.isNil() || !(buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AffectedFilesPendingEmit.isNil())) {
                return { value: new upToDateStatus(upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit$constant(), new GoInterfaceAdapter(buildInfoPath)) };
            }
            if (BuildInfo__from_incremental.IsEmitPending(buildInfo, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved, GetDirectoryPath__from_tspath(GetNormalizedAbsolutePath__from_tspath(buildInfoPath, (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions.CurrentDirectory)))) {
                return { value: new upToDateStatus(upToDateStatusTypeOutOfDateOptions$constant(), new GoInterfaceAdapter(buildInfoPath)) };
            }
        }
        let inputTextUnchanged = false;
        let oldestOutputFileAndTime = new fileAndTime(buildInfoPath, named_time.TimeOperations.$copy(buildInfoTime));
        let newestInputFileAndTime = fileAndTime.$zero();
        let seenRoots = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return GoMap.nil();
        });
        const seenRoots$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenRoots, seenRoots$next => seenRoots = seenRoots$next);
        let buildInfoRootInfoReader: BuildInfoRootInfoReader__from_incremental | undefined = void 0;
        const __gotots_range_8 = ParsedCommandLine__from_tsoptions.FileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
            const __gotots_range_value_10 = __gotots_range_8.get(__gotots_range_index_6);
            let inputFile = __gotots_range_value_10;
            let inputTime = host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, inputFile);
            if (inputTime.IsZero()) {
                return { value: new upToDateStatus(upToDateStatusTypeInputFileMissing$constant(), new GoInterfaceAdapter(inputFile)) };
            }
            let inputPath = Orchestrator.$go$private$build$toPath(orchestrator, inputFile);
            if (inputTime.After(named_time.TimeOperations.$copy(oldestOutputFileAndTime.time))) {
                let version = "";
                let currentVersion = "";
                if (BuildInfo__from_incremental.IsIncremental(buildInfo)) {
                    if (buildInfoRootInfoReader === undefined) {
                        buildInfoRootInfoReader = BuildInfo__from_incremental.GetBuildInfoRootInfoReader(buildInfo, GetDirectoryPath__from_tspath(GetNormalizedAbsolutePath__from_tspath(buildInfoPath, (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions.CurrentDirectory)), ComparePathsOptions__from_tspath.$copy((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions));
                    }
                    const __gotots_results_1 = BuildInfoRootInfoReader__from_incremental.GetBuildInfoFileInfo(buildInfoRootInfoReader, inputPath);
                    let buildInfoFileInfo: {
                        value: BuildInfoFileInfo__from_incremental;
                    } | undefined = __gotots_results_1[0];
                    let resolvedInputPath = __gotots_results_1[1];
                    {
                        let fileInfo: {
                            value: FileInfo__from_incremental;
                        } | undefined = BuildInfoFileInfo__from_incremental.GetFileInfo(buildInfoFileInfo);
                        if (!(fileInfo === undefined) && FileInfo__from_incremental.Version(fileInfo) !== "") {
                            version = FileInfo__from_incremental.Version(fileInfo);
                            {
                                const __gotots_receiver_5 = host.FS((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
                                const __gotots_argument_7 = resolvedInputPath.$value;
                                const __gotots_results_2 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_5).ReadFile(__gotots_argument_7);
                                let text = __gotots_results_2[0];
                                let ok = __gotots_results_2[1];
                                if (ok) {
                                    currentVersion = ComputeHash__from_incremental(text, !((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing === undefined));
                                    if (version === currentVersion) {
                                        inputTextUnchanged = true;
                                    }
                                }
                            }
                        }
                    }
                }
                if (version === "" || version !== currentVersion) {
                    return { value: new upToDateStatus(upToDateStatusTypeInputFileNewer$constant(), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputName({ value: new inputOutputName(inputFile, buildInfoPath) })) };
                }
            }
            if (inputTime.After(named_time.TimeOperations.$copy(newestInputFileAndTime.time))) {
                newestInputFileAndTime = new fileAndTime(inputFile, named_time.TimeOperations.$copy(inputTime));
            }
            Set$Add$Named_tspath$Path(seenRoots$location, inputPath);
        }
        if (buildInfoRootInfoReader === undefined) {
            buildInfoRootInfoReader = BuildInfo__from_incremental.GetBuildInfoRootInfoReader(buildInfo, GetDirectoryPath__from_tspath(GetNormalizedAbsolutePath__from_tspath(buildInfoPath, (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions.CurrentDirectory)), ComparePathsOptions__from_tspath.$copy((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions));
        }
        const __gotots_range_9 = named_iter.IterSeqValueOperations.$project(BuildInfoRootInfoReader__from_incremental.Roots(buildInfoRootInfoReader));
        if (__gotots_range_9 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_2 = 1;
        let __gotots_range_return_0: {
            value: upToDateStatus;
        } | undefined = void 0;
        __gotots_range_9(($argument0: Path__from_tspath): bool => {
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
            let root = __gotots_range_value_11;
            if (!Set__from_collections.Has<Path__from_tspath>(seenRoots$location, root)) {
                __gotots_range_return_0 =
                    { value: new upToDateStatus(upToDateStatusTypeOutOfDateRoots$constant(), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputName({ value: new inputOutputName(root.$value, buildInfoPath) })) };
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
        if (!CompilerOptions__from_core.IsIncremental(ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved))) {
            const __gotots_range_10 = named_iter.IterSeqValueOperations.$project(ParsedCommandLine__from_tsoptions.GetOutputFileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
            if (__gotots_range_10 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_3 = 1;
            let __gotots_range_return_1: {
                value: upToDateStatus;
            } | undefined = void 0;
            __gotots_range_10(($argument0: gostring): bool => {
                if (__gotots_range_state_3 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_3 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_3 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_3 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_3 = -1;
                const __gotots_range_value_12 = $argument0;
                let outputFile = __gotots_range_value_12;
                let outputTime = host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, outputFile);
                if (outputTime.IsZero()) {
                    __gotots_range_return_1 =
                        { value: new upToDateStatus(upToDateStatusTypeOutputMissing$constant(), new GoInterfaceAdapter(outputFile)) };
                    __gotots_range_state_3 = 2;
                    return false;
                }
                if (outputTime.Before(named_time.TimeOperations.$copy(newestInputFileAndTime.time))) {
                    __gotots_range_return_1 =
                        { value: new upToDateStatus(upToDateStatusTypeInputFileNewer$constant(), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputName({ value: new inputOutputName(newestInputFileAndTime.file, outputFile) })) };
                    __gotots_range_state_3 = 2;
                    return false;
                }
                if (outputTime.Before(named_time.TimeOperations.$copy(oldestOutputFileAndTime.time))) {
                    oldestOutputFileAndTime = new fileAndTime(outputFile, named_time.TimeOperations.$copy(outputTime));
                }
                __gotots_range_state_3 = 1;
                return true;
            });
            if (__gotots_range_state_3 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            if (__gotots_range_state_3 === 2) {
                return __gotots_range_return_1;
            }
            __gotots_range_state_3 = -2;
        }
        let refDtsUnchanged = false;
        const __gotots_range_11: BuildTask["upStream"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.upStream;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_11.length; __gotots_range_index_7++) {
            const __gotots_range_value_13 = __gotots_range_11.get(__gotots_range_index_7);
            let upstream: {
                value: upstreamTask;
            } | undefined = __gotots_range_value_13;
            if ((((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind === upToDateStatusTypeSolution$constant()) {
                continue;
            }
            let refInputOutputFileAndTime: {
                value: inputOutputFileAndTime;
            } | undefined = upToDateStatus.$go$private$build$inputOutputFileAndTime(((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status);
            if (!(refInputOutputFileAndTime === undefined) && !(refInputOutputFileAndTime ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.input.time.IsZero() && (refInputOutputFileAndTime ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.input.time.Before(named_time.TimeOperations.$copy(oldestOutputFileAndTime.time))) {
                continue;
            }
            if (BuildTask.$go$private$build$hasConflictingBuildInfo(t, orchestrator, (upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.task)) {
                return { value: new upToDateStatus(upToDateStatusTypeInputFileNewer$constant(), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputName({ value: new inputOutputName((ParsedCommandLine__from_tsoptions.ProjectReferences((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved).get((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refIndex) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path, oldestOutputFileAndTime.file) })) };
            }
            let newestDtsChangeTime = BuildTask.$go$private$build$getLatestChangedDtsMTime((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.task, orchestrator);
            if (!newestDtsChangeTime.IsZero() && newestDtsChangeTime.Before(named_time.TimeOperations.$copy(oldestOutputFileAndTime.time))) {
                refDtsUnchanged = true;
                continue;
            }
            return { value: new upToDateStatus(upToDateStatusTypeInputFileNewer$constant(), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputName({ value: new inputOutputName((ParsedCommandLine__from_tsoptions.ProjectReferences((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved).get((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refIndex) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path, oldestOutputFileAndTime.file) })) };
        }
        let checkInputFileTime: (($0: gostring) => {
            value: upToDateStatus;
        } | undefined) | undefined = (inputFile: gostring): {
            value: upToDateStatus;
        } | undefined => {
            let inputTime = host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, inputFile);
            if (inputTime.After(named_time.TimeOperations.$copy(oldestOutputFileAndTime.time))) {
                return { value: new upToDateStatus(upToDateStatusTypeInputFileNewer$constant(), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputName({ value: new inputOutputName(inputFile, oldestOutputFileAndTime.file) })) };
            }
            return void 0;
        };
        const __gotots_callee_1 = checkInputFileTime;
        const __gotots_argument_8: BuildTask["config"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config;
        let configStatus: {
            value: upToDateStatus;
        } | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
        if (!(configStatus === undefined)) {
            return configStatus;
        }
        const __gotots_range_12 = ParsedCommandLine__from_tsoptions.ExtendedSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_12.length; __gotots_range_index_8++) {
            const __gotots_range_value_14 = __gotots_range_12.get(__gotots_range_index_8);
            let extendedConfig = __gotots_range_value_14;
            const __gotots_callee_2 = checkInputFileTime;
            const __gotots_argument_9 = extendedConfig;
            let extendedConfigStatus: {
                value: upToDateStatus;
            } | undefined = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9);
            if (!(extendedConfigStatus === undefined)) {
                return extendedConfigStatus;
            }
        }
        return { value: new upToDateStatus(IfElse$Named_build$upToDateStatusType(refDtsUnchanged, upToDateStatusTypeUpToDateWithUpstreamTypes$constant(), IfElse$Named_build$upToDateStatusType(inputTextUnchanged, upToDateStatusTypeUpToDateWithInputFileText$constant(), upToDateStatusTypeUpToDate$constant())), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputFileAndTime({ value: new inputOutputFileAndTime(fileAndTime.$copy(newestInputFileAndTime), fileAndTime.$copy(oldestOutputFileAndTime), buildInfoPath) })) };
    }
    static $go$private$build$handleStatusThatDoesntRequireBuild(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined): bool {
        switch (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind) {
            case upToDateStatusTypeUpToDate$constant(): {
                if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Dry)) {
                    const __gotots_callee_18: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                    const __gotots_argument_26 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_up_to_date, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)]));
                    (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26);
                }
                return true;
                break;
            }
            case upToDateStatusTypeUpstreamErrors$constant(): {
                let upstreamStatus: {
                    value: upstreamErrors;
                } | undefined = upToDateStatus.$go$private$build$upstreamErrors((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status);
                if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Verbose)) {
                    const __gotots_callee_19: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                    const __gotots_argument_27 = NewCompilerDiagnostic__from_ast(IfElse$PointerTo_Named_diagnostics$Message((upstreamStatus ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refHasUpstreamErrors, $state__diagnostics.Skipping_build_of_project_0_because_its_dependency_1_was_not_built, $state__diagnostics.Skipping_build_of_project_0_because_its_dependency_1_has_errors), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (upstreamStatus ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref))]));
                    (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
                }
                return true;
                break;
            }
            case upToDateStatusTypeSolution$constant(): {
                return true;
                break;
            }
            case upToDateStatusTypeConfigFileNotFound$constant(): {
                BuildTask.$go$private$build$reportDiagnostic(t, NewCompilerDiagnostic__from_ast($state__diagnostics.File_0_not_found, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)])));
                return true;
                break;
            }
        }
        if (upToDateStatus.$go$private$build$isPseudoBuild((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status)) {
            if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Dry)) {
                const __gotots_callee_20: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_28 = NewCompilerDiagnostic__from_ast($state__diagnostics.A_non_dry_build_would_update_timestamps_for_output_of_project_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)]));
                (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_28);
                (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status =
                    { value: new upToDateStatus(upToDateStatusTypeUpToDate$constant(), void 0) };
                return true;
            }
            BuildTask.$go$private$build$updateTimeStamps(t, orchestrator, RuntimeSlice.nil<gostring>(), $state__diagnostics.Updating_output_timestamps_of_project_0);
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status =
                { value: new upToDateStatus(upToDateStatusTypeUpToDate$constant(), ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data) };
            ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildKind = buildKindPseudo$constant();
            return true;
        }
        if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Dry)) {
            const __gotots_callee_21: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
            const __gotots_argument_29 = NewCompilerDiagnostic__from_ast($state__diagnostics.A_non_dry_build_would_build_project_0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)]));
            (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_29);
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status =
                { value: new upToDateStatus(upToDateStatusTypeUpToDate$constant(), void 0) };
            return true;
        }
        return false;
    }
    static $go$private$build$hasConflictingBuildInfo(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, upstream: {
        value: BuildTask;
    } | undefined): bool {
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry === undefined) && !((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry === undefined)) {
            return ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path.$value === ((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path.$value;
        }
        return false;
    }
    static $go$private$build$hasUpdate(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, path: Path__from_tspath): updateKind {
        let needsConfigUpdate = false;
        let needsUpdate = false;
        {
            let configTime = host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config);
            if (!named_time.TimeOperations.$equal(configTime, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configTime)) {
                BuildTask.$go$private$build$resetConfig(t, orchestrator, path);
                needsConfigUpdate = true;
            }
        }
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined)) {
            const __gotots_range_4 = ParsedCommandLine__from_tsoptions.ExtendedSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_4.length; __gotots_range_index_2++) {
                const __gotots_range_value_4 = __gotots_range_index_2;
                const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_2);
                let index = __gotots_range_value_4;
                let file = __gotots_range_value_5;
                if (!named_time.TimeOperations.$equal(host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, file), (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigTimes.get(index))) {
                    BuildTask.$go$private$build$resetConfig(t, orchestrator, path);
                    needsConfigUpdate = true;
                }
            }
            const __gotots_range_5 = ParsedCommandLine__from_tsoptions.FileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_5.length; __gotots_range_index_3++) {
                const __gotots_range_value_6 = __gotots_range_index_3;
                const __gotots_range_value_7 = __gotots_range_5.get(__gotots_range_index_3);
                let index = __gotots_range_value_6;
                let file = __gotots_range_value_7;
                if (!named_time.TimeOperations.$equal(host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, file), (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inputFiles.get(index))) {
                    BuildTask.$go$private$build$resetStatus(t);
                    needsUpdate = true;
                }
            }
            if (!needsConfigUpdate) {
                const __gotots_receiver_3 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
                let configStart = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_3).Now();
                let newConfig: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = ParsedCommandLine__from_tsoptions.ReloadFileNamesOfParsedCommandLine((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved, host.FS((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host));
                const __gotots_receiver_4 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
                let configTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_4).Now().Sub(named_time.TimeOperations.$copy(configStart));
                (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportDone = GoChannel.make<GoEmptyStruct>(0, (): GoEmptyStruct => {
                    return GoEmptyStruct.$zero();
                }, (value: GoEmptyStruct): GoEmptyStruct => {
                    return (void GoEmptyStruct.$copy,
                        value);
                });
                (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done = GoChannel.make<GoEmptyStruct>(0, (): GoEmptyStruct => {
                    return GoEmptyStruct.$zero();
                }, (value: GoEmptyStruct): GoEmptyStruct => {
                    return (void GoEmptyStruct.$copy,
                        value);
                });
                if (!Equal$SliceOf_string$string(ParsedCommandLine__from_tsoptions.FileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved), ParsedCommandLine__from_tsoptions.FileNames(newConfig))) {
                    const __gotots_store_3 = ((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    parseCache$store$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "resolvedReferences"), path, newConfig);
                    const __gotots_store_4 = ((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    SyncMap$Store$Named_tspath$Path$Named_time$Duration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "configTimes"), path, configTime);
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved = newConfig;
                    BuildTask.$go$private$build$resetStatus(t);
                    needsUpdate = true;
                }
            }
        }
        return IfElse$Named_build$updateKind(needsConfigUpdate, updateKindConfig$constant(), IfElse$Named_build$updateKind(needsUpdate, updateKindUpdate$constant(), updateKindNone$constant()));
    }
    static $go$private$build$loadOrStoreBuildInfo(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, configPath: Path__from_tspath, buildInfoFileName: gostring): [
        BuildInfo__from_incremental | undefined,
        time__from_gostdlib.Time
    ] {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            BuildInfo__from_incremental | undefined,
            time__from_gostdlib.Time
        ] = [void 0, named_time.TimeOperations.$zero()];
        try {
            try {
                __gotots_return_block_0: {
                    let path = Orchestrator.$go$private$build$toPath(orchestrator, buildInfoFileName);
                    sync__from_gostdlib.Mutex.Lock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu);
                    const __gotots_receiver_15: BuildTask["buildInfoEntryMu"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_15, $go$recovery);
                    };
                    if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry === undefined) && ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path.$value === path.$value) {
                        __gotots_return_0 = [((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfo, named_time.TimeOperations.$copy(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTime)];
                        break __gotots_return_block_0;
                    }
                    const __gotots_receiver_16 = NewBuildInfoReader__from_incremental(new $goInterfaceAdapter$PointerTo_Named_build$host((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host));
                    const __gotots_argument_39: BuildTask["resolved"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved;
                    const __gotots_field_11 = goInterfaceNonNil<BuildInfoReader__from_incremental>(__gotots_receiver_16).ReadBuildInfo(__gotots_argument_39);
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry =
                        { value: new buildInfoEntry(__gotots_field_11, path, named_time.TimeOperations.$zero(), void 0) };
                    let mTime = named_time.TimeOperations.$zero();
                    if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfo === undefined)) {
                        mTime = host.GetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, buildInfoFileName);
                    }
                    ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTime = named_time.TimeOperations.$copy(mTime);
                    __gotots_return_0 = [((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfo, named_time.TimeOperations.$copy(mTime)];
                    break __gotots_return_block_0;
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
        return __gotots_return_0;
    }
    static $go$private$build$onBuildInfoEmit(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, buildInfoFileName: gostring, buildInfo: BuildInfo__from_incremental | undefined, hasChangedDtsFile: bool): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu);
                    const __gotots_receiver_20: BuildTask["buildInfoEntryMu"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_20, $go$recovery);
                    };
                    let dtsTime: tsonicTypeScriptRuntime.Location<time__from_gostdlib.Time> | undefined = void 0;
                    const __gotots_receiver_21 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
                    let mTime = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_21).Now();
                    const mTime$location = tsonicTypeScriptRuntime.boundLocation({}, () => mTime, mTime$next => mTime = mTime$next);
                    if (hasChangedDtsFile) {
                        dtsTime =
                            mTime$location;
                    }
                    else if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry === undefined)) {
                        dtsTime = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dtsTime;
                    }
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry =
                        { value: new buildInfoEntry(buildInfo, Orchestrator.$go$private$build$toPath(orchestrator, buildInfoFileName), named_time.TimeOperations.$copy(mTime), dtsTime) };
                }
            }
            catch (__gotots_caught_1) {
                if (!(__gotots_caught_1 instanceof GoPanic)) {
                    throw __gotots_caught_1;
                }
                __gotots_panic_0 = __gotots_caught_1;
            }
        }
        finally {
            if (__gotots_deferred_0 !== undefined) {
                const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
                try {
                    __gotots_deferred_0(__gotots_recovery_0);
                    if (__gotots_recovery_0.recovered()) {
                        __gotots_panic_0 = undefined;
                    }
                }
                catch (__gotots_caught_0) {
                    if (!(__gotots_caught_0 instanceof GoPanic)) {
                        throw __gotots_caught_0;
                    }
                    __gotots_panic_0 = __gotots_caught_0;
                }
            }
        }
        if (__gotots_panic_0 !== undefined) {
            throw __gotots_panic_0;
        }
    }
    static $go$private$build$report(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, configPath: Path__from_tspath, buildResult: orchestratorResult | undefined): void {
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.prevReporter === undefined)) {
            GoChannel.receive(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.prevReporter ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportDone)[0];
        }
        if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors.length > 0) {
            (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(IfElse$SliceOf_PointerTo_Named_ast$Diagnostic(!(buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors.isNil(), (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).errors, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([])), (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors, void 0);
        }
        const __gotots_receiver_1 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        const __gotots_argument_4 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_1).Writer();
        const __gotots_argument_5 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(strings__from_gostdlib.Builder.String(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.builder))]);
        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_4), __gotots_argument_5);
        if (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exitStatus.$value > (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result.Status.$value) {
            (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).result.Status = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.exitStatus;
        }
        if (!(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.statistics === undefined)) {
            const __gotots_store_0 = (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            Statistics__from_tsc.Aggregate(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "statistics"), ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.statistics);
        }
        switch (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildKind.$value) {
            case 2: {
                if (!((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing === undefined)) {
                    const __gotots_receiver_2 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Testing;
                    const __gotots_argument_6: taskResult["program"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program;
                    goInterfaceNonNil<CommandLineTesting__from_tsc>(__gotots_receiver_2).OnProgram(__gotots_argument_6);
                }
                const __gotots_store_1 = (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).statistics;
                __gotots_store_1.ProjectsBuilt = __gotots_store_1.ProjectsBuilt + 1;
                break;
            }
            case 1: {
                const __gotots_store_2 = (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).statistics;
                __gotots_store_2.TimestampUpdates = __gotots_store_2.TimestampUpdates + 1;
                break;
            }
        }
        (buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filesToDelete = goSliceAppendSlice<gostring>((buildResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filesToDelete, ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.filesToDelete, "");
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result = void 0;
        GoChannel.close((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportDone);
    }
    static $go$private$build$reportDiagnostic(t: {
        value: BuildTask;
    } | undefined, err: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void {
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors.append(void 0, [err]);
        const __gotots_callee_23: taskResult["diagnosticReporter"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnosticReporter;
        const __gotots_argument_36 = err;
        (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_36);
    }
    static $go$private$build$reportUpToDateStatus(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined): void {
        if (!Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Verbose)) {
            return;
        }
        switch (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind) {
            case upToDateStatusTypeConfigFileNotFound$constant(): {
                const __gotots_callee_3: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_10 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_config_file_does_not_exist, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config))]));
                (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
                break;
            }
            case upToDateStatusTypeUpstreamErrors$constant(): {
                let upstreamStatus: {
                    value: upstreamErrors;
                } | undefined = upToDateStatus.$go$private$build$upstreamErrors((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status);
                const __gotots_callee_4: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_11 = NewCompilerDiagnostic__from_ast(IfElse$PointerTo_Named_diagnostics$Message((upstreamStatus ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.refHasUpstreamErrors, $state__diagnostics.Project_0_can_t_be_built_because_its_dependency_1_was_not_built, $state__diagnostics.Project_0_can_t_be_built_because_its_dependency_1_has_errors), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (upstreamStatus ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref))]));
                (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_11);
                break;
            }
            case upToDateStatusTypeBuildErrors$constant(): {
                const __gotots_callee_5: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_12 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_it_has_errors, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config))]));
                (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12);
                break;
            }
            case upToDateStatusTypeUpToDate$constant(): {
                {
                    let inputOutputFileAndTime__shadow_1: {
                        value: inputOutputFileAndTime;
                    } | undefined = upToDateStatus.$go$private$build$inputOutputFileAndTime((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status);
                    if (!(inputOutputFileAndTime__shadow_1 === undefined)) {
                        const __gotots_callee_6: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                        const __gotots_argument_13 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_up_to_date_because_newest_input_1_is_older_than_output_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (inputOutputFileAndTime__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.input.file)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (inputOutputFileAndTime__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.output.file))]));
                        (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13);
                    }
                }
                break;
            }
            case upToDateStatusTypeUpToDateWithUpstreamTypes$constant(): {
                const __gotots_callee_7: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_14 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_up_to_date_with_d_ts_files_from_its_dependencies, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config))]));
                (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
                break;
            }
            case upToDateStatusTypeUpToDateWithInputFileText$constant(): {
                const __gotots_callee_8: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_15 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_up_to_date_but_needs_to_update_timestamps_of_output_files_that_are_older_than_input_files, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config))]));
                (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_15);
                break;
            }
            case upToDateStatusTypeInputFileMissing$constant(): {
                const __gotots_callee_9: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_16 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_input_1_does_not_exist, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (($value: GoInterface | undefined): gostring => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data)))]));
                (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16);
                break;
            }
            case upToDateStatusTypeOutputMissing$constant(): {
                const __gotots_callee_10: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_17 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_output_file_1_does_not_exist, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (($value: GoInterface | undefined): gostring => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data)))]));
                (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_17);
                break;
            }
            case upToDateStatusTypeInputFileNewer$constant(): {
                let inputOutput: {
                    value: inputOutputName;
                } | undefined = upToDateStatus.$go$private$build$inputOutputName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status);
                const __gotots_callee_11: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_18 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_output_1_is_older_than_input_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (inputOutput ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.output)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (inputOutput ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.input))]));
                (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18);
                break;
            }
            case upToDateStatusTypeOutOfDateBuildInfoWithPendingEmit$constant(): {
                const __gotots_callee_12: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_19 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_some_of_the_changes_were_not_emitted, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (($value: GoInterface | undefined): gostring => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data)))]));
                (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
                break;
            }
            case upToDateStatusTypeOutOfDateBuildInfoWithErrors$constant(): {
                const __gotots_callee_13: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_20 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_program_needs_to_report_errors, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (($value: GoInterface | undefined): gostring => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data)))]));
                (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
                break;
            }
            case upToDateStatusTypeOutOfDateOptions$constant(): {
                const __gotots_callee_14: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_21 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_there_is_change_in_compilerOptions, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (($value: GoInterface | undefined): gostring => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data)))]));
                (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21);
                break;
            }
            case upToDateStatusTypeOutOfDateRoots$constant(): {
                let inputOutput: {
                    value: inputOutputName;
                } | undefined = upToDateStatus.$go$private$build$inputOutputName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status);
                const __gotots_callee_15: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_22 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_buildinfo_file_1_indicates_that_file_2_was_root_file_of_compilation_but_not_any_more, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (inputOutput ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.output)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (inputOutput ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.input))]));
                (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22);
                break;
            }
            case upToDateStatusTypeTsVersionOutputOfDate$constant(): {
                const __gotots_callee_16: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_23 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_out_of_date_because_output_for_it_was_generated_with_version_1_that_differs_with_current_version_2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config)), new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (($value: GoInterface | undefined): gostring => {
                        if (!GoInterfaceAdapter.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data))), new GoInterfaceAdapter(Version__from_core())]));
                (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23);
                break;
            }
            case upToDateStatusTypeForceBuild$constant(): {
                const __gotots_callee_17: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_24 = NewCompilerDiagnostic__from_ast($state__diagnostics.Project_0_is_being_forcibly_rebuilt, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config))]));
                (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24);
                break;
            }
            case upToDateStatusTypeSolution$constant(): {
                break;
            }
            default: {
                const __gotots_argument_25 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Unknown up to date status kind: %v", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_build$upToDateStatusType(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind)])));
                GoPanic.raise(__gotots_argument_25 === undefined ? GoPanicNilValue.create() : __gotots_argument_25);
                break;
            }
        }
    }
    static $go$private$build$resetConfig(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, path: Path__from_tspath): void {
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dirty = true;
        const __gotots_store_8 = ((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        parseCache$delete$Named_tspath$Path$PointerTo_Named_tsoptions$ParsedCommandLine(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "resolvedReferences"), path);
    }
    static $go$private$build$resetStatus(t: {
        value: BuildTask;
    } | undefined): void {
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status = void 0;
        atomic__from_gostdlib.Bool.Store((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending, true);
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.errors = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    static $go$private$build$storeOutputTimeStamp(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined): bool {
        return Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Watch) && !CompilerOptions__from_core.IsIncremental(ParsedCommandLine__from_tsoptions.CompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
    }
    static $go$private$build$unblockDownstream(t: {
        value: BuildTask;
    } | undefined): void {
        atomic__from_gostdlib.Bool.Store((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending, false);
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isInitialCycle = false;
        GoChannel.close((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done);
    }
    static $go$private$build$updateDownstream(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, path: Path__from_tspath): void {
        if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isInitialCycle) {
            return;
        }
        if (Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StopBuildOnErrors) && upToDateStatus.$go$private$build$isError((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status)) {
            return;
        }
        const __gotots_range_13: BuildTask["downStream"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.downStream;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_13.length; __gotots_range_index_9++) {
            const __gotots_range_value_15 = __gotots_range_13.get(__gotots_range_index_9);
            let downStream: {
                value: BuildTask;
            } | undefined = __gotots_range_value_15;
            sync__from_gostdlib.Mutex.Lock((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.downStreamUpdateMu);
            if (!((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status === undefined)) {
                {
                    const __gotots_switch_tag_0: upToDateStatus["kind"] = ((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind;
                    let __gotots_switch_selection_0 = -1;
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_0 = false;
                        if (!__gotots_switch_match_0) {
                            __gotots_switch_match_0 = __gotots_switch_tag_0 === upToDateStatusTypeUpToDate$constant();
                        }
                        if (__gotots_switch_match_0) {
                            __gotots_switch_selection_0 = 0;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_1 = false;
                        if (!__gotots_switch_match_1) {
                            __gotots_switch_match_1 = __gotots_switch_tag_0 === upToDateStatusTypeUpToDateWithUpstreamTypes$constant();
                        }
                        if (!__gotots_switch_match_1) {
                            __gotots_switch_match_1 = __gotots_switch_tag_0 === upToDateStatusTypeUpToDateWithInputFileText$constant();
                        }
                        if (__gotots_switch_match_1) {
                            __gotots_switch_selection_0 = 1;
                        }
                    }
                    if (__gotots_switch_selection_0 === -1) {
                        let __gotots_switch_match_2 = false;
                        if (!__gotots_switch_match_2) {
                            __gotots_switch_match_2 = __gotots_switch_tag_0 === upToDateStatusTypeUpstreamErrors$constant();
                        }
                        if (__gotots_switch_match_2) {
                            __gotots_switch_selection_0 = 2;
                        }
                    }
                    __gotots_control_target_0: {
                        if (__gotots_switch_selection_0 === 0) {
                            if (!Program__from_incremental.HasChangedDtsFile(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program)) {
                                (downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status =
                                    { value: new upToDateStatus(upToDateStatusTypeUpToDateWithUpstreamTypes$constant(), ((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.data) };
                                break __gotots_control_target_0;
                            }
                            __gotots_switch_selection_0 = 1;
                        }
                        if (__gotots_switch_selection_0 === 1) {
                            if (Program__from_incremental.HasChangedDtsFile(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program)) {
                                (downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status =
                                    { value: new upToDateStatus(upToDateStatusTypeInputFileNewer$constant(), new $goInterfaceAdapter$PointerTo_Named_build$inputOutputName({ value: new inputOutputName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config, upToDateStatus.$go$private$build$oldestOutputFileName((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status)) })) };
                            }
                            break __gotots_control_target_0;
                        }
                        if (__gotots_switch_selection_0 === 2) {
                            let upstreamErrors__shadow_1: {
                                value: upstreamErrors;
                            } | undefined = upToDateStatus.$go$private$build$upstreamErrors((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.status);
                            let refConfig = ResolveConfigFileNameOfProjectReference__from_core((upstreamErrors__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ref);
                            if (Orchestrator.$go$private$build$toPath(orchestrator, refConfig).$value === path.$value) {
                                BuildTask.$go$private$build$resetStatus(downStream);
                            }
                            break __gotots_control_target_0;
                        }
                    }
                }
            }
            atomic__from_gostdlib.Bool.Store((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pending, true);
            sync__from_gostdlib.Mutex.Unlock((downStream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.downStreamUpdateMu);
        }
    }
    static $go$private$build$updateTimeStamps(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, emittedFiles: RuntimeSlice<gostring>, verboseMessage: {
        value: Message__from_diagnostics;
    } | undefined): void {
        let emitted: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = NewSetFromItems$string(emittedFiles);
        let verboseMessageReported = false;
        let buildInfoName = ParsedCommandLine__from_tsoptions.GetBuildInfoFileName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
        const __gotots_receiver_16 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
        let now = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_16).Now();
        let updateTimeStamp: (($0: gostring) => void) | undefined = (file: gostring): void => {
            if (Set__from_collections.Has<gostring>(emitted, file)) {
                return;
            }
            if (!verboseMessageReported && Tristate_IsTrue__from_core((((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Command ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BuildOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Verbose)) {
                const __gotots_callee_24: taskResult["reportStatus"] = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportStatus;
                const __gotots_argument_40 = NewCompilerDiagnostic__from_ast(verboseMessage, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Orchestrator.$go$private$build$relativeFileName(orchestrator, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config))]));
                (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_40);
                verboseMessageReported = true;
            }
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = host.SetMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, file, named_time.TimeOperations.$copy(now));
            if (err === undefined) {
                if (file === buildInfoName) {
                    sync__from_gostdlib.Mutex.Lock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu);
                    if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry === undefined)) {
                        ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mTime = named_time.TimeOperations.$copy(now);
                    }
                    sync__from_gostdlib.Mutex.Unlock((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoEntryMu);
                }
                else if (BuildTask.$go$private$build$storeOutputTimeStamp(t, orchestrator)) {
                    host.$go$private$build$storeMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, file, named_time.TimeOperations.$copy(now));
                }
            }
        };
        if (BuildTask.$go$private$build$canUpdateJsDtsOutputTimestamps(t)) {
            const __gotots_range_14 = named_iter.IterSeqValueOperations.$project(ParsedCommandLine__from_tsoptions.GetOutputFileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
            if (__gotots_range_14 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_4 = 1;
            __gotots_range_14(($argument0: gostring): bool => {
                if (__gotots_range_state_4 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_4 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_4 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_4 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_4 = -1;
                const __gotots_range_value_16 = $argument0;
                let outputFile = __gotots_range_value_16;
                const __gotots_callee_25 = updateTimeStamp;
                const __gotots_argument_41 = outputFile;
                (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_41);
                __gotots_range_state_4 = 1;
                return true;
            });
            if (__gotots_range_state_4 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_4 = -2;
        }
        const __gotots_callee_26 = updateTimeStamp;
        const __gotots_argument_42 = ParsedCommandLine__from_tsoptions.GetBuildInfoFileName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved);
        (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42);
    }
    static $go$private$build$updateWatch(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, oldCache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined): void {
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.configTime = host.$go$private$build$loadOrStoreMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.config, oldCache, false);
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved === undefined)) {
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.extendedConfigTimes = Map$string$Named_time$Time(ParsedCommandLine__from_tsoptions.ExtendedSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved), (p: gostring): time__from_gostdlib.Time => {
                return host.$go$private$build$loadOrStoreMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, p, oldCache, false);
            });
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.inputFiles = Map$string$Named_time$Time(ParsedCommandLine__from_tsoptions.FileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved), (p: gostring): time__from_gostdlib.Time => {
                return host.$go$private$build$loadOrStoreMTime((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, p, oldCache, false);
            });
            if (BuildTask.$go$private$build$canUpdateJsDtsOutputTimestamps(t)) {
                const __gotots_range_3 = named_iter.IterSeqValueOperations.$project(ParsedCommandLine__from_tsoptions.GetOutputFileNames((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolved));
                if (__gotots_range_3 === void 0) {
                    GoPanic.raiseRuntime("call of nil function");
                }
                let __gotots_range_state_1 = 1;
                __gotots_range_3(($argument0: gostring): bool => {
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
                    let outputFile = __gotots_range_value_3;
                    host.$go$private$build$storeMTimeFromOldCache((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, outputFile, oldCache);
                    __gotots_range_state_1 = 1;
                    return true;
                });
                if (__gotots_range_state_1 === -1) {
                    GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                }
                __gotots_range_state_1 = -2;
            }
        }
    }
    static $go$private$build$waitOnUpstream(t: {
        value: BuildTask;
    } | undefined): void {
        const __gotots_range_6: BuildTask["upStream"] = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.upStream;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_6.length; __gotots_range_index_4++) {
            const __gotots_range_value_8 = __gotots_range_6.get(__gotots_range_index_4);
            let upstream: {
                value: upstreamTask;
            } | undefined = __gotots_range_value_8;
            GoChannel.receive(((upstream ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.done)[0];
        }
    }
    static $go$private$build$writeFile(t: {
        value: BuildTask;
    } | undefined, orchestrator: {
        value: Orchestrator;
    } | undefined, fileName: gostring, text: gostring, data: WriteFileData__from_compiler | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        const __gotots_receiver_17 = host.FS((orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host);
        const __gotots_argument_43 = fileName;
        const __gotots_argument_44 = text;
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_17).WriteFile(__gotots_argument_43, __gotots_argument_44);
        if (err === undefined) {
            if (!(data === undefined) && !((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).BuildInfo === undefined)) {
                BuildTask.$go$private$build$onBuildInfoEmit(t, orchestrator, fileName, (($value: GoInterface | undefined): BuildInfo__from_incremental | undefined => {
                    if (!$goInterfaceAdapter$PointerTo_Named_incremental$BuildInfo.$is($value)) {
                        return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                    }
                    return $value.$go$value;
                })((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).BuildInfo), Program__from_incremental.HasChangedDtsFile(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program));
            }
            else if (BuildTask.$go$private$build$storeOutputTimeStamp(t, orchestrator)) {
                const __gotots_receiver_19: Orchestrator["host"] = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_argument_45 = fileName;
                const __gotots_receiver_18 = (orchestrator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Sys;
                const __gotots_argument_46 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_18).Now();
                host.$go$private$build$storeMTime(__gotots_receiver_19, __gotots_argument_45, __gotots_argument_46);
            }
        }
        return err;
    }
}
