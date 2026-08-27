import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CompilerHost as CompilerHost__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { CommandLineTesting as CommandLineTesting__from_tsc, CompileAndEmitResult as CompileAndEmitResult__from_tsc, System as System__from_tsc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import type { Event$Storage as Event__from_fswatch$Storage, WatchOption as WatchOption__from_fswatch, Watcher as Watcher__from_fswatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/fswatch/package.js";
import type { TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_Is_Named_error_to_bool, $goInterface$Interface_Method_Unwrap_void_to_Named_error, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void, $goInterface$Interface_Method_io$Close_void_to_Named_error, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { NewCompilerHost as NewCompilerHost__from_compiler, NewProgram as NewProgram__from_compiler, ProgramOptions as ProgramOptions__from_compiler, Program as Program__from_compiler, WriteFile as WriteFile__from_compiler } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { NewBuildInfoReader as NewBuildInfoReader__from_incremental, NewProgram as NewProgram__from_incremental, Program as Program__from_incremental, ReadBuildInfoProgram as ReadBuildInfoProgram__from_incremental } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/incremental/package.js";
import { CompileTimes as CompileTimes__from_tsc, CreateWatchStatusReporter as CreateWatchStatusReporter__from_tsc, EmitFilesAndReportErrors as EmitFilesAndReportErrors__from_tsc, EmitInput as EmitInput__from_tsc, ExtendedConfigCache as ExtendedConfigCache__from_tsc } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/tsc/package.js";
import { $state as $state__fswatch, Default as Default__from_fswatch, EventKind as EventKind__from_fswatch, Event as Event__from_fswatch, WatchCallback as WatchCallback__from_fswatch, WithIgnore as WithIgnore__from_fswatch, WithRecursive as WithRecursive__from_fswatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/fswatch/package.js";
import { GetParsedCommandLineOfConfigFile as GetParsedCommandLineOfConfigFile__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetPathComponents as GetPathComponents__from_tspath, IsVolumeCharacter as IsVolumeCharacter__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { FS as FS__from_cachedvfs, From as From__from_cachedvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/cachedvfs/package.js";
import { FS as FS__from_trackingvfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/trackingvfs/package.js";
import { NewSetWithSizeHint$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { SyncMap$Delete$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Delete.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncMap$Store$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { SyncSet$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$ToSlice$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$ToSlice.js";
import { DiffMapsFunc$string$PointerTo_Named_execute$watchedDir$bool } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/DiffMapsFunc.js";
import { $goInterfaceAdapter$Named_fswatch$EventKind, $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS, $goInterfaceAdapter$PointerTo_Named_core$ParsedOptions, $goInterfaceAdapter$PointerTo_Named_execute$fswatchBackend, $goInterfaceAdapter$PointerTo_Named_execute$watchCompilerHost, $goInterfaceAdapter$PointerTo_Named_incremental$Program, $goInterfaceAdapter$PointerTo_Named_trackingvfs$FS, $goInterfaceAdapter$bool, $goInterfaceAdapter$int, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_tsc$ExtendedConfigCache as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterface$Interface_Method_Unwrap_void_to_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$contract, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is, $goInterface$Interface_Method_Is_Named_error_to_bool$contract as GoInterface$contract, $goInterface$Interface_Method_Is_Named_error_to_bool$is as GoInterface$is } from "../../../../../../support/interface-contracts.js";
import { $goInterfaceMethod$WatchBackend$void_to_Named_execute$WatchBackend, $goInterfaceMethod$WatchDirectory$string_Named_fswatch$WatchCallback_bool_string_to_bool_to_Named_io$Closer_Named_error } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_string_To_Named_time$Time, $goMap$MapOf_string_To_PointerTo_Named_execute$watchedDir as GoMap } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { $goReflectType$PointerTo_Named_core$ParsedOptions } from "../../../../../../support/reflection-types.js";
import "../../../../../../support/reflection-types.js";
import { getTraceFromSys } from "./tsc.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as provider_error from "@gotots/gostdlib/internal/facets/provider-error.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoChannel, goSelect, goSelectReady } from "@gotots/runtime/channel.js";
import { goInterfaceEqual, goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash, GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export interface WatchBackend extends GoInterfaceValue {
    WatchDirectory($argument0: gostring, $argument1: WatchCallback__from_fswatch, $argument2: bool, $argument3: (($0: gostring) => bool) | undefined): [
        $goInterface$Interface_Method_io$Close_void_to_Named_error | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ];
}
export const WatchBackend$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$WatchDirectory$string_Named_fswatch$WatchCallback_bool_string_to_bool_to_Named_io$Closer_Named_error]);
export function WatchBackend$is(value: GoInterfaceValue | undefined): value is WatchBackend {
    return value !== undefined && value.$go$implements(WatchBackend$contract);
}
export interface commandLineTestingWithWatchBackend extends GoInterfaceValue {
    WatchBackend(): WatchBackend | undefined;
}
export const commandLineTestingWithWatchBackend$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$WatchBackend$void_to_Named_execute$WatchBackend]);
export function commandLineTestingWithWatchBackend$is(value: GoInterfaceValue | undefined): value is commandLineTestingWithWatchBackend {
    return value !== undefined && value.$go$implements(commandLineTestingWithWatchBackend$contract);
}
export class fswatchBackend {
    declare private readonly $goType: void;
    public constructor(public inner: Watcher__from_fswatch | undefined) {
    }
    declare private readonly then?: never;
    static WatchDirectory(b: fswatchBackend | undefined, dir: gostring, fn: WatchCallback__from_fswatch, recursive: bool, ignore: (($0: gostring) => bool) | undefined): [
        $goInterface$Interface_Method_io$Close_void_to_Named_error | undefined,
        $goInterface$Interface_Method_Error_void_to_string | undefined
    ] {
        let opts = RuntimeSlice.nil<WatchOption__from_fswatch | undefined>();
        if (recursive) {
            opts = opts.append(void 0, [WithRecursive__from_fswatch()]);
        }
        if (!(ignore === undefined)) {
            opts = opts.append(void 0, [WithIgnore__from_fswatch(ignore)]);
        }
        const __gotots_receiver_56 = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).inner;
        const __gotots_argument_94 = dir;
        const __gotots_argument_95 = fn;
        const __gotots_argument_96 = opts;
        const __gotots_results_10 = goInterfaceNonNil<Watcher__from_fswatch>(__gotots_receiver_56).WatchDirectory(__gotots_argument_94, __gotots_argument_95, __gotots_argument_96);
        return [__gotots_results_10[0], __gotots_results_10[1]];
    }
}
export class watchedDir {
    declare private readonly $goType: void;
    public constructor(public closer: $goInterface$Interface_Method_io$Close_void_to_Named_error | undefined, public recursive: bool) {
    }
    declare private readonly then?: never;
}
export class cachedSourceFile {
    declare private readonly $goType: void;
    public constructor(public file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public modTime: time__from_gostdlib.Time) {
    }
    static $copy($source: cachedSourceFile): cachedSourceFile {
        return new cachedSourceFile($source.file, named_time.TimeOperations.$copy($source.modTime));
    }
    static $equal($left: cachedSourceFile, $right: cachedSourceFile): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.file, $right.file)
            && named_time.TimeOperations.$equal($left.modTime, $right.modTime);
    }
    static $hash($source: cachedSourceFile): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.file));
        $hash = GoMapHash.mix($hash, named_time.TimeOperations.$hash($source.modTime));
        return $hash;
    }
    declare private readonly then?: never;
}
export class watchCompilerHost {
    declare private readonly $goType: void;
    public constructor(public CompilerHost: CompilerHost__from_compiler | undefined, public cache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: cachedSourceFile;
    } | undefined>> | undefined) {
    }
    static $copy($source: watchCompilerHost): watchCompilerHost {
        return new watchCompilerHost($source.CompilerHost, $source.cache);
    }
    static $equal($left: watchCompilerHost, $right: watchCompilerHost): bool {
        return goInterfaceEqual($left.CompilerHost, $right.CompilerHost) &&
            tsonicTypeScriptRuntime.sameLocation($left.cache, $right.cache);
    }
    static $hash($source: watchCompilerHost): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $source.CompilerHost === undefined ? 0 : $source.CompilerHost.$go$hash());
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.cache));
        return $hash;
    }
    declare private readonly then?: never;
    static GetSourceFile(h: {
        value: watchCompilerHost;
    } | undefined, opts: SourceFileParseOptions__from_ast): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        const __gotots_receiver_57 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerHost;
        const __gotots_receiver_58 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_57).FS();
        const __gotots_argument_97 = SourceFileParseOptions__from_ast.$storageOf(opts).FileName;
        let info: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_58).Stat(__gotots_argument_97);
        {
            const __gotots_results_11 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cache, new Path__from_tspath(SourceFileParseOptions__from_ast.$storageOf(opts).Path));
            let cached: {
                value: cachedSourceFile;
            } | undefined = __gotots_results_11[0];
            let ok = __gotots_results_11[1];
            if (ok) {
                let __gotots_logical_result_2 = !(info === undefined);
                if (__gotots_logical_result_2) {
                    const __gotots_receiver_59 = info;
                    __gotots_logical_result_2 = goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_59).ModTime().Equal(named_time.TimeOperations.$copy((cached ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.modTime));
                }
                if (__gotots_logical_result_2) {
                    return (cached ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file;
                }
            }
        }
        const __gotots_receiver_60 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CompilerHost;
        const __gotots_argument_98 = SourceFileParseOptions__from_ast.$copy(opts);
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_60).GetSourceFile(__gotots_argument_98);
        if (!(file === undefined)) {
            if (!(info === undefined)) {
                const __gotots_receiver_62 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cache;
                const __gotots_argument_99 = new Path__from_tspath(SourceFileParseOptions__from_ast.$storageOf(opts).Path);
                const __gotots_field_19 = file;
                const __gotots_receiver_61 = info;
                const __gotots_field_20 = goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_61).ModTime();
                const __gotots_argument_100 = { value: new cachedSourceFile(__gotots_field_19, __gotots_field_20) };
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile(__gotots_receiver_62, __gotots_argument_99, __gotots_argument_100);
            }
        }
        else {
            SyncMap$Delete$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.cache, new Path__from_tspath(SourceFileParseOptions__from_ast.$storageOf(opts).Path));
        }
        return file;
    }
}
export class Watcher {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public sys: System__from_tsc | undefined, public configFileName: gostring, public config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public compilerOptionsFromCommandLine: {
        value: CompilerOptions__from_core;
    } | undefined, public commandLineRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, public reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, public reportErrorSummary: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined, public reportWatchStatus: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, public testing: CommandLineTesting__from_tsc | undefined, public program: {
        value: Program__from_incremental;
    } | undefined, public extendedConfigCache: tsonicTypeScriptRuntime.Location<ExtendedConfigCache__from_tsc> | undefined, public configModified: bool, public configHasErrors: bool, public configFilePaths: RuntimeSlice<gostring>, public sourceFileCache: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, {
        value: cachedSourceFile;
    } | undefined>> | undefined, public backend: WatchBackend | undefined, public watchedDirs: GoMapValue<gostring, watchedDir | undefined>, public seenFiles: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, public configMtimes: GoMapValue<gostring, time__from_gostdlib.Time>, public doCycleCh: GoChannel<GoEmptyStruct> | undefined, public debugLog: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, public changedMu: sync__from_gostdlib.Mutex, public changedPaths: GoMapValue<gostring, EventKind__from_fswatch>, public changedOverflow: bool) {
    }
    declare private readonly then?: never;
    static DoCycle(w: Watcher | undefined): void {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
                    const __gotots_receiver_21 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_21, $go$recovery);
                    };
                    sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
                    let changedPaths: GoMapValue<gostring, EventKind__from_fswatch> = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedPaths;
                    let overflow = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedOverflow;
                    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedPaths = GoMap__from_gotots_runtime.nil<gostring, EventKind__from_fswatch>(new EventKind__from_fswatch(0));
                    (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedOverflow = false;
                    sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
                    let hasEvents = changedPaths.length() > 0 || overflow;
                    if (Watcher.$go$private$execute$recheckTsConfig(w)) {
                        break __gotots_return_block_0;
                    }
                    if (hasEvents && !overflow && !(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configModified) {
                        if (Watcher.$go$private$execute$isRelevantChange(w, changedPaths)) {
                            Watcher.$go$private$execute$evictChangedSourceFiles(w, changedPaths);
                        }
                        else {
                            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                                const __gotots_argument_22 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                                const __gotots_argument_23 = "[watch] DoCycle: %d event(s) not relevant to compilation, skipping rebuild\n";
                                const __gotots_argument_24 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(changedPaths.length())]);
                                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_22), __gotots_argument_23, __gotots_argument_24);
                            }
                            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing === undefined)) {
                                const __gotots_receiver_22 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing;
                                const __gotots_argument_25 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program;
                                goInterfaceNonNil<CommandLineTesting__from_tsc>(__gotots_receiver_22).OnProgram(__gotots_argument_25);
                            }
                            break __gotots_return_block_0;
                        }
                    }
                    else if (overflow) {
                        const __gotots_struct_3 = SyncMap__from_collections.$zero<Path__from_tspath, {
                            value: cachedSourceFile;
                        } | undefined>();
                        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileCache =
                            tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, {
                                value: cachedSourceFile;
                            } | undefined>>(__gotots_struct_3);
                    }
                    else if (!hasEvents && !(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configModified) {
                        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                            const __gotots_argument_26 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                            const __gotots_argument_27 = "[watch] DoCycle: no events, skipping\n";
                            const __gotots_argument_28 = RuntimeSlice.nil<GoInterface | undefined>();
                            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_26), __gotots_argument_27, __gotots_argument_28);
                        }
                        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing === undefined)) {
                            const __gotots_receiver_23 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing;
                            const __gotots_argument_29 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program;
                            goInterfaceNonNil<CommandLineTesting__from_tsc>(__gotots_receiver_23).OnProgram(__gotots_argument_29);
                        }
                        break __gotots_return_block_0;
                    }
                    const __gotots_callee_3 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportWatchStatus;
                    const __gotots_argument_30 = NewCompilerDiagnostic__from_ast($state__diagnostics.File_change_detected_Starting_incremental_compilation, RuntimeSlice.nil<GoInterface | undefined>());
                    (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30);
                    Watcher.$go$private$execute$doBuild(w);
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
    static $go$private$execute$closeAllWatches(w: Watcher | undefined): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        let dirs = RuntimeSlice.make<$goInterface$Interface_Method_io$Close_void_to_Named_error | undefined>(0, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs.length(), void 0);
        const __gotots_range_4 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs;
        const __gotots_range_keys_1 = __gotots_range_4.keys();
        for (const __gotots_range_value_6 of __gotots_range_keys_1) {
            const __gotots_range_value_7 = __gotots_range_4.lookupOk(__gotots_range_value_6);
            if (!__gotots_range_value_7[1]) {
                continue;
            }
            const __gotots_range_value_8 = __gotots_range_value_6;
            const __gotots_range_value_9 = __gotots_range_value_7[0];
            let dir = __gotots_range_value_8;
            let wd: watchedDir | undefined = __gotots_range_value_9;
            dirs = dirs.append(void 0, [(wd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closer]);
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs.delete(dir);
        }
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        const __gotots_range_5 = dirs;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_5.length; __gotots_range_index_3++) {
            const __gotots_range_value_10 = __gotots_range_5.get(__gotots_range_index_3);
            let c: $goInterface$Interface_Method_io$Close_void_to_Named_error | undefined = __gotots_range_value_10;
            const __gotots_receiver_20 = c;
            goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error>(__gotots_receiver_20).Close();
        }
    }
    static $go$private$execute$comparePathsOptions(w: Watcher | undefined): ComparePathsOptions__from_tspath {
        const __gotots_receiver_47 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_receiver_48 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_47).FS();
        const __gotots_field_17 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_48).UseCaseSensitiveFileNames();
        const __gotots_receiver_49 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_field_18 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_49).GetCurrentDirectory();
        return new ComparePathsOptions__from_tspath(__gotots_field_17, __gotots_field_18);
    }
    static $go$private$execute$compileAndEmit(w: Watcher | undefined): CompileAndEmitResult__from_tsc {
        const __gotots_field_9 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_field_10 = new $goInterfaceAdapter$PointerTo_Named_incremental$Program((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        const __gotots_field_11 = Program__from_incremental.GetProgram((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        const __gotots_field_12 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config;
        const __gotots_field_13 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportDiagnostic;
        const __gotots_field_14 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportErrorSummary;
        const __gotots_receiver_23 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_field_15 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_23).Writer();
        const __gotots_struct_4 = CompileTimes__from_tsc.$zero();
        const __gotots_field_16 = tsonicTypeScriptRuntime.location<CompileTimes__from_tsc>(__gotots_struct_4);
        const __gotots_argument_31 = new EmitInput__from_tsc(__gotots_field_9, __gotots_field_10, __gotots_field_11, __gotots_field_12, __gotots_field_13, __gotots_field_14, __gotots_field_15, new WriteFile__from_compiler(void 0), __gotots_field_16, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing, void 0, void 0);
        return EmitFilesAndReportErrors__from_tsc(__gotots_argument_31);
    }
    static $go$private$execute$computeDesiredWatches(w: Watcher | undefined, seenFilePaths: RuntimeSlice<gostring>): GoMapValue<gostring, bool> {
        const __gotots_receiver_37 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        let cwd = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_37).GetCurrentDirectory();
        let desiredDirs: GoMapValue<gostring, bool> = GoMap__from_gotots_runtime.make<gostring, bool>(false, 0, []);
        if (!((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined)) {
            const __gotots_range_10 = ParsedCommandLine__from_tsoptions.WildcardDirectories((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config);
            const __gotots_range_keys_5 = __gotots_range_10.keys();
            for (const __gotots_range_value_21 of __gotots_range_keys_5) {
                const __gotots_range_value_22 = __gotots_range_10.lookupOk(__gotots_range_value_21);
                if (!__gotots_range_value_22[1]) {
                    continue;
                }
                const __gotots_range_value_23 = __gotots_range_value_21;
                const __gotots_range_value_24 = __gotots_range_value_22[0];
                let dir = __gotots_range_value_23;
                let recursive = __gotots_range_value_24;
                const __gotots_receiver_38 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
                const __gotots_receiver_39 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_38).FS();
                const __gotots_argument_46 = dir;
                let realDir = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_39).Realpath(__gotots_argument_46);
                desiredDirs.store(realDir, recursive);
            }
        }
        if ((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined && desiredDirs.length() === 0) {
            const __gotots_receiver_40 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
            const __gotots_receiver_41 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_40).FS();
            const __gotots_argument_47 = cwd;
            let dir = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_41).Realpath(__gotots_argument_47);
            desiredDirs.store(dir, false);
        }
        const __gotots_range_11 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_11.length; __gotots_range_index_5++) {
            const __gotots_range_value_25 = __gotots_range_11.get(__gotots_range_index_5);
            let cfgPath = __gotots_range_value_25;
            const __gotots_receiver_42 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
            const __gotots_receiver_43 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_42).FS();
            const __gotots_argument_48 = cfgPath;
            let realPath = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_43).Realpath(__gotots_argument_48);
            let dir = GetDirectoryPath__from_tspath(realPath);
            {
                const __gotots_results_4 = desiredDirs.lookupOk(dir);
                let has = __gotots_results_4[1];
                if (!has) {
                    desiredDirs.store(dir, false);
                }
            }
        }
        if ((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) {
            const __gotots_range_12 = ParsedCommandLine__from_tsoptions.FileNames((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config);
            for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_12.length; __gotots_range_index_6++) {
                const __gotots_range_value_26 = __gotots_range_12.get(__gotots_range_index_6);
                let fileName = __gotots_range_value_26;
                let absPath = GetNormalizedAbsolutePath__from_tspath(fileName, cwd);
                const __gotots_receiver_44 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
                const __gotots_receiver_45 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_44).FS();
                const __gotots_argument_49 = absPath;
                let realPath = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_45).Realpath(__gotots_argument_49);
                let dir = GetDirectoryPath__from_tspath(realPath);
                {
                    const __gotots_results_5 = desiredDirs.lookupOk(dir);
                    let has = __gotots_results_5[1];
                    if (!has) {
                        desiredDirs.store(dir, false);
                    }
                }
            }
        }
        let resolvedDirs: GoMapValue<gostring, bool> = Watcher.$go$private$execute$resolveDesiredDirs(w, desiredDirs);
        let opts = Watcher.$go$private$execute$comparePathsOptions(w);
        const __gotots_range_13 = seenFilePaths;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_13.length; __gotots_range_index_7++) {
            const __gotots_range_value_27 = __gotots_range_13.get(__gotots_range_index_7);
            let filePath = __gotots_range_value_27;
            let dir = GetDirectoryPath__from_tspath(filePath);
            let covered = false;
            const __gotots_range_14 = resolvedDirs;
            const __gotots_range_keys_6 = __gotots_range_14.keys();
            for (const __gotots_range_value_28 of __gotots_range_keys_6) {
                const __gotots_range_value_29 = __gotots_range_14.lookupOk(__gotots_range_value_28);
                if (!__gotots_range_value_29[1]) {
                    continue;
                }
                const __gotots_range_value_30 = __gotots_range_value_28;
                const __gotots_range_value_31 = __gotots_range_value_29[0];
                let wdir = __gotots_range_value_30;
                let recursive = __gotots_range_value_31;
                if (recursive) {
                    if (ContainsPath__from_tspath(wdir, dir, ComparePathsOptions__from_tspath.$copy(opts))) {
                        covered = true;
                        break;
                    }
                }
                else if (dir === wdir) {
                    covered = true;
                    break;
                }
            }
            if (!covered) {
                if (canWatchDirectory(dir)) {
                    resolvedDirs.store(dir, false);
                }
            }
        }
        return Watcher.$go$private$execute$resolveDesiredDirs(w, resolvedDirs);
    }
    static $go$private$execute$createDirWatch(w: Watcher | undefined, dir: gostring, recursive: bool): void {
        let entry: watchedDir | undefined = new watchedDir(void 0, recursive);
        let cb: (($0: RuntimeSlice<Event__from_fswatch$Storage>, $1: $goInterface$Interface_Method_Error_void_to_string | undefined) => void) | undefined = (events: RuntimeSlice<Event__from_fswatch$Storage>, err__shadow_1: $goInterface$Interface_Method_Error_void_to_string | undefined): void => {
            let __gotots_logical_result_1 = !(err__shadow_1 === undefined);
            if (__gotots_logical_result_1) {
                const __gotots_argument_50 = err__shadow_1;
                const __gotots_argument_51 = $state__fswatch.ErrWatchTerminated;
                __gotots_logical_result_1 = provider_error.ErrorsIsDirect(__gotots_argument_50, __gotots_argument_51, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is);
            }
            if (__gotots_logical_result_1) {
                Watcher.$go$private$execute$handleWatchTerminated(w, dir, entry);
                return;
            }
            Watcher.$go$private$execute$onWatchEvents(w, events, err__shadow_1);
        };
        const __gotots_receiver_46 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).backend;
        const __gotots_argument_52 = dir;
        const __gotots_argument_53 = new WatchCallback__from_fswatch(cb);
        const __gotots_argument_54 = recursive;
        const __gotots_argument_55 = shouldIgnoreWatchPath;
        const __gotots_results_6 = goInterfaceNonNil<WatchBackend>(__gotots_receiver_46).WatchDirectory(__gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55);
        let watch: $goInterface$Interface_Method_io$Close_void_to_Named_error | undefined = __gotots_results_6[0];
        let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_6[1];
        if (!(err === undefined)) {
            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                const __gotots_argument_56 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_57 = "[watch] failed to watch directory %s: %v\n";
                const __gotots_argument_58 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(dir), err]);
                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_56), __gotots_argument_57, __gotots_argument_58);
            }
            return;
        }
        (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closer = watch;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs.store(dir, entry);
    }
    static $go$private$execute$doBuild(w: Watcher | undefined): void {
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configModified) {
            const __gotots_struct_2 = SyncMap__from_collections.$zero<Path__from_tspath, {
                value: cachedSourceFile;
            } | undefined>();
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileCache =
                tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, {
                    value: cachedSourceFile;
                } | undefined>>(__gotots_struct_2);
        }
        const __gotots_receiver_8 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_argument_11 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_8).FS();
        let cached: {
            value: FS__from_cachedvfs;
        } | undefined = From__from_cachedvfs(__gotots_argument_11);
        let tfs: {
            value: FS__from_trackingvfs;
        } | undefined = { value: new FS__from_trackingvfs(new $goInterfaceAdapter$PointerTo_Named_cachedvfs$FS(cached), SyncSet__from_collections.$zero<gostring>()) };
        const __gotots_receiver_9 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_argument_12 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_9).GetCurrentDirectory();
        const __gotots_argument_13 = new $goInterfaceAdapter$PointerTo_Named_trackingvfs$FS(tfs);
        const __gotots_receiver_10 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_argument_14 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_10).DefaultLibraryPath();
        const __gotots_argument_15 = new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extendedConfigCache);
        const __gotots_argument_16 = getTraceFromSys((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys, ParsedCommandLine__from_tsoptions.Locale((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing);
        let innerHost: CompilerHost__from_compiler | undefined = NewCompilerHost__from_compiler(__gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
        let host: {
            value: watchCompilerHost;
        } | undefined = { value: new watchCompilerHost(innerHost, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileCache) };
        let wildcardDirs: GoMapValue<gostring, bool> = GoMap__from_gotots_runtime.nil<gostring, bool>(false);
        if (!((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined)) {
            wildcardDirs = ParsedCommandLine__from_tsoptions.WildcardDirectories((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config);
            const __gotots_range_0 = wildcardDirs;
            const __gotots_range_keys_0 = __gotots_range_0.keys();
            for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                if (!__gotots_range_value_1[1]) {
                    continue;
                }
                const __gotots_range_value_2 = __gotots_range_value_0;
                let dir = __gotots_range_value_2;
                const __gotots_store_0 = (tfs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "SeenFiles"), dir);
            }
            if (wildcardDirs.length() > 0) {
                const __gotots_receiver_12 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config;
                const __gotots_receiver_11 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
                const __gotots_argument_17 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_11).FS();
                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config = ParsedCommandLine__from_tsoptions.ReloadFileNamesOfParsedCommandLine(__gotots_receiver_12, __gotots_argument_17);
            }
        }
        const __gotots_range_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
            const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
            let path = __gotots_range_value_3;
            const __gotots_store_1 = (tfs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            SyncSet$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "SeenFiles"), path);
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program = NewProgram__from_incremental(NewProgram__from_compiler(new ProgramOptions__from_compiler(new $goInterfaceAdapter$PointerTo_Named_execute$watchCompilerHost(host), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config, false, 0, void 0, "", "", void 0)), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, void 0, !((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing === undefined));
        let result = Watcher.$go$private$execute$compileAndEmit(w);
        FS__from_cachedvfs.DisableAndClearCache(cached);
        const __gotots_receiver_13 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_receiver_14 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_13).FS();
        let caseSensitive = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_14).UseCaseSensitiveFileNames();
        const __gotots_receiver_15 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        let cwd = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_15).GetCurrentDirectory();
        const __gotots_store_2 = (tfs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let seenSlice = SyncSet$ToSlice$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "SeenFiles"));
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).seenFiles = NewSetWithSizeHint$Named_tspath$Path(seenSlice.length);
        const __gotots_range_2 = seenSlice;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
            const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_1);
            let p = __gotots_range_value_4;
            Set$Add$Named_tspath$Path((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).seenFiles, ToPath__from_tspath(p, cwd, caseSensitive));
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configMtimes = $goMap$MapOf_string_To_Named_time$Time.make((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths.length, []);
        const __gotots_range_3 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
            const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_2);
            let cfgPath = __gotots_range_value_5;
            {
                const __gotots_receiver_16 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
                const __gotots_receiver_17 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_16).FS();
                const __gotots_argument_18 = cfgPath;
                let s: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_17).Stat(__gotots_argument_18);
                if (!(s === undefined)) {
                    const __gotots_store_3 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configMtimes;
                    const __gotots_store_4 = cfgPath;
                    const __gotots_receiver_18 = s;
                    __gotots_store_3.store(__gotots_store_4, goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_18).ModTime());
                }
            }
        }
        Watcher.$go$private$execute$reconcileWatches(w, seenSlice);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configModified = false;
        let programFiles: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = Program__from_compiler.FilesByPath(Program__from_incremental.GetProgram((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileCache, (path: Path__from_tspath, $1: {
            value: cachedSourceFile;
        } | undefined): bool => {
            {
                const __gotots_results_1 = programFiles.lookupOk(path);
                let ok = __gotots_results_1[1];
                if (!ok) {
                    SyncMap$Delete$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileCache, path);
                }
            }
            return true;
        });
        let errorCount = result.Diagnostics.length;
        if (errorCount === 1) {
            const __gotots_callee_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportWatchStatus;
            const __gotots_argument_19 = NewCompilerDiagnostic__from_ast($state__diagnostics.Found_1_error_Watching_for_file_changes, RuntimeSlice.nil<GoInterface | undefined>());
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19);
        }
        else {
            const __gotots_callee_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportWatchStatus;
            const __gotots_argument_20 = NewCompilerDiagnostic__from_ast($state__diagnostics.Found_0_errors_Watching_for_file_changes, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(errorCount)]));
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20);
        }
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing === undefined)) {
            const __gotots_receiver_19 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing;
            const __gotots_argument_21 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program;
            goInterfaceNonNil<CommandLineTesting__from_tsc>(__gotots_receiver_19).OnProgram(__gotots_argument_21);
        }
    }
    static $go$private$execute$evictChangedSourceFiles(w: Watcher | undefined, changedPaths: GoMapValue<gostring, EventKind__from_fswatch>): void {
        const __gotots_receiver_34 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_receiver_35 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_34).FS();
        let caseSensitive = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_35).UseCaseSensitiveFileNames();
        const __gotots_receiver_36 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        let cwd = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_36).GetCurrentDirectory();
        const __gotots_range_9 = changedPaths;
        const __gotots_range_keys_4 = __gotots_range_9.keys();
        for (const __gotots_range_value_18 of __gotots_range_keys_4) {
            const __gotots_range_value_19 = __gotots_range_9.lookupOk(__gotots_range_value_18);
            if (!__gotots_range_value_19[1]) {
                continue;
            }
            const __gotots_range_value_20 = __gotots_range_value_18;
            let eventPath = __gotots_range_value_20;
            let p = ToPath__from_tspath(eventPath, cwd, caseSensitive);
            {
                const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileCache, p);
                let ok = __gotots_results_3[1];
                if (ok) {
                    if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                        const __gotots_argument_43 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                        const __gotots_argument_44 = "[watch] evicting cached source file: %s\n";
                        const __gotots_argument_45 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_tspath$Path(p)]);
                        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_43), __gotots_argument_44, __gotots_argument_45);
                    }
                    SyncMap$Delete$Named_tspath$Path$PointerTo_Named_execute$cachedSourceFile((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sourceFileCache, p);
                }
            }
        }
    }
    static $go$private$execute$handleWatchTerminated(w: Watcher | undefined, dir: gostring, identity: watchedDir | undefined): void {
        if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
            const __gotots_argument_70 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
            const __gotots_argument_71 = "[watch] watch terminated: %s\n";
            const __gotots_argument_72 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(dir)]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_70), __gotots_argument_71, __gotots_argument_72);
        }
        let staleCloser: $goInterface$Interface_Method_io$Close_void_to_Named_error | undefined = void 0;
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        {
            const __gotots_results_9 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs.lookupOk(dir);
            let wd: watchedDir | undefined = __gotots_results_9[0];
            let ok = __gotots_results_9[1];
            if (ok &&
                wd
                    ===
                        identity) {
                staleCloser = (wd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closer;
                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs.delete(dir);
            }
        }
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        if (!(staleCloser === undefined)) {
            const __gotots_receiver_54 = staleCloser;
            goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error>(__gotots_receiver_54).Close();
        }
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedOverflow = true;
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
        Watcher.$go$private$execute$signalDoCycle(w);
    }
    static $go$private$execute$isRelevantChange(w: Watcher | undefined, changedPaths: GoMapValue<gostring, EventKind__from_fswatch>): bool {
        const __gotots_receiver_29 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_receiver_30 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_29).FS();
        let caseSensitive = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_30).UseCaseSensitiveFileNames();
        const __gotots_receiver_31 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        let cwd = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_31).GetCurrentDirectory();
        let opts = Watcher.$go$private$execute$comparePathsOptions(w);
        const __gotots_range_7 = changedPaths;
        const __gotots_range_keys_2 = __gotots_range_7.keys();
        for (const __gotots_range_value_12 of __gotots_range_keys_2) {
            const __gotots_range_value_13 = __gotots_range_7.lookupOk(__gotots_range_value_12);
            if (!__gotots_range_value_13[1]) {
                continue;
            }
            const __gotots_range_value_14 = __gotots_range_value_12;
            let eventPath = __gotots_range_value_14;
            let p = ToPath__from_tspath(eventPath, cwd, caseSensitive);
            if (Set__from_collections.Has<Path__from_tspath>((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).seenFiles, p)) {
                return true;
            }
            if (!((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) && ParsedCommandLine__from_tsoptions.PossiblyMatchesFileName((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config, eventPath)) {
                return true;
            }
            if (!((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined) && ParsedCommandLine__from_tsoptions.PossiblyMatchesDirectoryName((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config, p)) {
                return true;
            }
            const __gotots_receiver_32 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
            const __gotots_receiver_33 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_32).FS();
            const __gotots_argument_42 = eventPath;
            if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_33).DirectoryExists(__gotots_argument_42)) {
                const __gotots_range_8 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs;
                const __gotots_range_keys_3 = __gotots_range_8.keys();
                for (const __gotots_range_value_15 of __gotots_range_keys_3) {
                    const __gotots_range_value_16 = __gotots_range_8.lookupOk(__gotots_range_value_15);
                    if (!__gotots_range_value_16[1]) {
                        continue;
                    }
                    const __gotots_range_value_17 = __gotots_range_value_15;
                    let dir = __gotots_range_value_17;
                    if (ContainsPath__from_tspath(dir, eventPath, ComparePathsOptions__from_tspath.$copy(opts))) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    static $go$private$execute$onWatchEvents(w: Watcher | undefined, events: RuntimeSlice<Event__from_fswatch$Storage>, err: $goInterface$Interface_Method_Error_void_to_string | undefined): void {
        if (!(err === undefined)) {
            const __gotots_argument_73 = err;
            const __gotots_argument_74 = $state__fswatch.ErrOverflow;
            if (provider_error.ErrorsIsDirect(__gotots_argument_73, __gotots_argument_74, GoInterface$is, $goInterface$Interface_Method_Unwrap_void_to_Named_error$is, $goInterface$Interface_Method_Unwrap_void_to_SliceOf_Named_error$is)) {
                if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                    const __gotots_argument_75 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                    const __gotots_argument_76 = "[watch] event overflow, triggering rebuild\n";
                    const __gotots_argument_77 = RuntimeSlice.nil<GoInterface | undefined>();
                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_75), __gotots_argument_76, __gotots_argument_77);
                }
                sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedOverflow = true;
                sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
                Watcher.$go$private$execute$signalDoCycle(w);
                return;
            }
            const __gotots_receiver_55 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
            const __gotots_argument_78 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_55).Writer();
            const __gotots_argument_79 = "Warning: File watch error: %v\n";
            const __gotots_argument_80 = RuntimeSlice.literal<GoInterface | undefined>([err]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_78), __gotots_argument_79, __gotots_argument_80);
            return;
        }
        if (events.length > 0) {
            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                const __gotots_argument_81 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_82 = "[watch] %d event(s): ";
                const __gotots_argument_83 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(events.length)]);
                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_81), __gotots_argument_82, __gotots_argument_83);
                const __gotots_range_17 = events;
                for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_17.length; __gotots_range_index_9++) {
                    const __gotots_range_value_37 = __gotots_range_index_9;
                    const __gotots_range_value_38 = Event__from_fswatch.$copy(Event__from_fswatch.$fromStorage(__gotots_range_17.get(__gotots_range_index_9)));
                    let i = __gotots_range_value_37;
                    let e = __gotots_range_value_38;
                    if (i > 0) {
                        const __gotots_argument_84 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                        const __gotots_argument_85 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(", ")]);
                        provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_84), __gotots_argument_85);
                    }
                    if (i >= 5) {
                        const __gotots_argument_86 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                        const __gotots_argument_87 = "... and %d more";
                        const __gotots_argument_88 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(events.length - i)]);
                        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_86), __gotots_argument_87, __gotots_argument_88);
                        break;
                    }
                    const __gotots_argument_89 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                    const __gotots_argument_90 = "%s %s";
                    const __gotots_argument_91 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_fswatch$EventKind(new EventKind__from_fswatch(Event__from_fswatch.$storageOf(e).Kind)), new $goInterfaceAdapter$string(Event__from_fswatch.$storageOf(e).Path)]);
                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_89), __gotots_argument_90, __gotots_argument_91);
                }
                const __gotots_argument_92 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_93 = RuntimeSlice.nil<GoInterface | undefined>();
                provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_92), __gotots_argument_93);
            }
            sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
            if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedPaths.isNil()) {
                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedPaths = GoMap__from_gotots_runtime.make<gostring, EventKind__from_fswatch>(new EventKind__from_fswatch(0), events.length, []);
            }
            const __gotots_range_18 = events;
            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_18.length; __gotots_range_index_10++) {
                const __gotots_range_value_39 = Event__from_fswatch.$copy(Event__from_fswatch.$fromStorage(__gotots_range_18.get(__gotots_range_index_10)));
                let e = __gotots_range_value_39;
                (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedPaths.store(Event__from_fswatch.$storageOf(e).Path, new EventKind__from_fswatch(Event__from_fswatch.$storageOf(e).Kind));
            }
            sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).changedMu);
            Watcher.$go$private$execute$signalDoCycle(w);
        }
    }
    static $go$private$execute$parseConfigFile(w: Watcher | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_struct_5 = ExtendedConfigCache__from_tsc.$zero();
        let extendedConfigCache: tsonicTypeScriptRuntime.Location<ExtendedConfigCache__from_tsc> | undefined = tsonicTypeScriptRuntime.location<ExtendedConfigCache__from_tsc>(__gotots_struct_5);
        const __gotots_results_7 = GetParsedCommandLineOfConfigFile__from_tsoptions((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFileName, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptionsFromCommandLine, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).commandLineRaw, (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys, new GoInterfaceAdapter(extendedConfigCache));
        let configParseResult: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_7[0];
        let errors__shadow_1 = __gotots_results_7[1];
        if (errors__shadow_1.length > 0) {
            const __gotots_range_15 = errors__shadow_1;
            for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_15.length; __gotots_range_index_8++) {
                const __gotots_range_value_32 = __gotots_range_15.get(__gotots_range_index_8);
                let e: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_32;
                const __gotots_callee_4 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportDiagnostic;
                const __gotots_argument_59 = e;
                (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_59);
            }
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configHasErrors = true;
            let errorCount = errors__shadow_1.length;
            if (errorCount === 1) {
                const __gotots_callee_5 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportWatchStatus;
                const __gotots_argument_60 = NewCompilerDiagnostic__from_ast($state__diagnostics.Found_1_error_Watching_for_file_changes, RuntimeSlice.nil<GoInterface | undefined>());
                (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60);
            }
            else {
                const __gotots_callee_6 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportWatchStatus;
                const __gotots_argument_61 = NewCompilerDiagnostic__from_ast($state__diagnostics.Found_0_errors_Watching_for_file_changes, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(errorCount)]));
                (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_61);
            }
            return void 0;
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extendedConfigCache = extendedConfigCache;
        return configParseResult;
    }
    static $go$private$execute$recheckTsConfig(w: Watcher | undefined): bool {
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFileName === "") {
            return false;
        }
        if (!(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configHasErrors && (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths.length > 0) {
            let changed = false;
            const __gotots_range_6 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_6.length; __gotots_range_index_4++) {
                const __gotots_range_value_11 = __gotots_range_6.get(__gotots_range_index_4);
                let path = __gotots_range_value_11;
                const __gotots_results_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configMtimes.lookupOk(path);
                let oldMtime = __gotots_results_2[0];
                let ok = __gotots_results_2[1];
                const __gotots_receiver_26 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
                const __gotots_receiver_27 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_26).FS();
                const __gotots_argument_41 = path;
                let s: $goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void | undefined = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_27).Stat(__gotots_argument_41);
                if (!ok) {
                    if (!(s === undefined)) {
                        changed = true;
                        break;
                    }
                }
                else {
                    let __gotots_logical_result_0 = s === undefined;
                    if (!__gotots_logical_result_0) {
                        const __gotots_receiver_28 = s;
                        __gotots_logical_result_0 = !goInterfaceNonNil<$goInterface$Interface_Method_fs$IsDir_void_to_bool_Method_fs$ModTime_void_to_Named_time$Time_Method_fs$Mode_void_to_Named_fs$FileMode_Method_fs$Name_void_to_string_Method_fs$Size_void_to_int64_Method_fs$Sys_void_to_Interface_void>(__gotots_receiver_28).ModTime().Equal(named_time.TimeOperations.$copy(oldMtime));
                    }
                    if (__gotots_logical_result_0) {
                        changed = true;
                        break;
                    }
                }
            }
            if (!changed) {
                return false;
            }
        }
        let configParseResult: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = Watcher.$go$private$execute$parseConfigFile(w);
        if (configParseResult === undefined) {
            return true;
        }
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configHasErrors) {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configModified = true;
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configHasErrors = false;
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths = goSliceAppendSlice<gostring>(RuntimeSlice.literal<gostring>([(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFileName]), ParsedCommandLine__from_tsoptions.ExtendedSourceFiles(configParseResult), "");
        if (!reflect__from_gostdlib.DeepEqual(new $goInterfaceAdapter$PointerTo_Named_core$ParsedOptions((((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ParsedConfig), new $goInterfaceAdapter$PointerTo_Named_core$ParsedOptions(((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ParsedConfig))) {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configModified = true;
        }
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config = configParseResult;
        return false;
    }
    static $go$private$execute$reconcileWatches(w: Watcher | undefined, seenFilePaths: RuntimeSlice<gostring>): void {
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).backend === undefined) {
            return;
        }
        let desiredDirs: GoMapValue<gostring, bool> = Watcher.$go$private$execute$computeDesiredWatches(w, seenFilePaths);
        DiffMapsFunc$string$PointerTo_Named_execute$watchedDir$bool((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs, desiredDirs, (wd: watchedDir | undefined, recursive: bool): bool => {
            return (wd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).recursive === recursive;
        }, (dir: gostring, recursive: bool): void => {
            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                const __gotots_argument_32 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_33 = "[watch] watching directory %s (recursive=%v)\n";
                const __gotots_argument_34 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(dir), new $goInterfaceAdapter$bool(recursive)]);
                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_32), __gotots_argument_33, __gotots_argument_34);
            }
            Watcher.$go$private$execute$createDirWatch(w, dir, recursive);
        }, (dir: gostring, wd: watchedDir | undefined): void => {
            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                const __gotots_argument_35 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_36 = "[watch] closing stale dir watch: %s\n";
                const __gotots_argument_37 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(dir)]);
                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_35), __gotots_argument_36, __gotots_argument_37);
            }
            const __gotots_receiver_24 = (wd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closer;
            goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error>(__gotots_receiver_24).Close();
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs.delete(dir);
        }, (dir: gostring, wd: watchedDir | undefined, recursive: bool): void => {
            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                const __gotots_argument_38 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_39 = "[watch] recreating dir watch %s (recursive %v\u00E2\u0086\u0092%v)\n";
                const __gotots_argument_40 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(dir), new $goInterfaceAdapter$bool((wd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).recursive), new $goInterfaceAdapter$bool(recursive)]);
                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_38), __gotots_argument_39, __gotots_argument_40);
            }
            const __gotots_receiver_25 = (wd ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).closer;
            goInterfaceNonNil<$goInterface$Interface_Method_io$Close_void_to_Named_error>(__gotots_receiver_25).Close();
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).watchedDirs.delete(dir);
            Watcher.$go$private$execute$createDirWatch(w, dir, recursive);
        });
    }
    static $go$private$execute$resolveDesiredDirs(w: Watcher | undefined, desiredDirs: GoMapValue<gostring, bool>): GoMapValue<gostring, bool> {
        let resolved: GoMapValue<gostring, bool> = GoMap__from_gotots_runtime.make<gostring, bool>(false, desiredDirs.length(), []);
        const __gotots_range_16 = desiredDirs;
        const __gotots_range_keys_7 = __gotots_range_16.keys();
        for (const __gotots_range_value_33 of __gotots_range_keys_7) {
            const __gotots_range_value_34 = __gotots_range_16.lookupOk(__gotots_range_value_33);
            if (!__gotots_range_value_34[1]) {
                continue;
            }
            const __gotots_range_value_35 = __gotots_range_value_33;
            const __gotots_range_value_36 = __gotots_range_value_34[0];
            let dir = __gotots_range_value_35;
            let recursive = __gotots_range_value_36;
            let watchDir = dir;
            let watchRecursive = recursive;
            {
                for (;;) {
                    const __gotots_receiver_50 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
                    const __gotots_receiver_51 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_50).FS();
                    const __gotots_argument_62 = watchDir;
                    if (!!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_51).DirectoryExists(__gotots_argument_62)) {
                        break;
                    }
                    {
                        let parent = GetDirectoryPath__from_tspath(watchDir);
                        if (parent === watchDir) {
                            break;
                        }
                        watchDir = parent;
                        watchRecursive = false;
                    }
                }
            }
            const __gotots_receiver_52 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
            const __gotots_receiver_53 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_52).FS();
            const __gotots_argument_63 = watchDir;
            if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_53).DirectoryExists(__gotots_argument_63) || !canWatchDirectory(watchDir)) {
                if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                    const __gotots_argument_64 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                    const __gotots_argument_65 = "[watch] no watchable ancestor for %s\n";
                    const __gotots_argument_66 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(dir)]);
                    provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_64), __gotots_argument_65, __gotots_argument_66);
                }
                continue;
            }
            if (watchDir !== dir && !((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                const __gotots_argument_67 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_68 = "[watch] resolved %s to ancestor %s\n";
                const __gotots_argument_69 = RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(dir), new $goInterfaceAdapter$string(watchDir)]);
                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_67), __gotots_argument_68, __gotots_argument_69);
            }
            {
                const __gotots_results_8 = resolved.lookupOk(watchDir);
                let existing = __gotots_results_8[0];
                let has = __gotots_results_8[1];
                if (has) {
                    resolved.store(watchDir, existing || watchRecursive);
                }
                else {
                    resolved.store(watchDir, watchRecursive);
                }
            }
        }
        return resolved;
    }
    static $go$private$execute$signalDoCycle(w: Watcher | undefined): void {
        const __gotots_select_2 = GoChannel.$selectSend((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).doCycleCh, new GoEmptyStruct);
        const __gotots_switch_selection_1 = goSelectReady([__gotots_select_2]);
        switch (__gotots_switch_selection_1 === undefined ? -1 : __gotots_switch_selection_1) {
            case 0: {
                break;
            }
            case -1: {
                break;
            }
            default: GoPanic.raiseRuntime("select returned an invalid case");
        }
    }
    static $go$private$execute$start(w: Watcher | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): void {
        sync__from_gostdlib.Mutex.Lock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        const __gotots_struct_1 = ExtendedConfigCache__from_tsc.$zero();
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extendedConfigCache =
            tsonicTypeScriptRuntime.location<ExtendedConfigCache__from_tsc>(__gotots_struct_1);
        const __gotots_receiver_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_argument_0 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_1).GetCurrentDirectory();
        const __gotots_receiver_2 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_argument_1 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_2).FS();
        const __gotots_receiver_3 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_argument_2 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_3).DefaultLibraryPath();
        const __gotots_argument_3 = new GoInterfaceAdapter((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extendedConfigCache);
        const __gotots_argument_4 = getTraceFromSys((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys, ParsedCommandLine__from_tsoptions.Locale((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config), (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing);
        let host: CompilerHost__from_compiler | undefined = NewCompilerHost__from_compiler(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program = ReadBuildInfoProgram__from_incremental((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config, NewBuildInfoReader__from_incremental(host), host);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFileName !== "") {
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFilePaths = goSliceAppendSlice<gostring>(RuntimeSlice.literal<gostring>([(w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFileName]), ParsedCommandLine__from_tsoptions.ExtendedSourceFiles((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).config), "");
        }
        const __gotots_receiver_4 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
        const __gotots_argument_5 = "TS_WATCH_DEBUG";
        const __gotots_binary_operand_0 = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_4).GetEnvironmentVariable(__gotots_argument_5);
        const __gotots_binary_operand_1 = "";
        if (__gotots_binary_operand_0 !== __gotots_binary_operand_1) {
            const __gotots_receiver_5 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sys;
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog = goInterfaceNonNil<System__from_tsc>(__gotots_receiver_5).Writer();
        }
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing === undefined && (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).backend === undefined) {
            let fsw: Watcher__from_fswatch | undefined = Default__from_fswatch();
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).backend = new $goInterfaceAdapter$PointerTo_Named_execute$fswatchBackend(new fswatchBackend(fsw));
            if (!((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog === undefined)) {
                const __gotots_argument_7 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).debugLog;
                const __gotots_argument_8 = "[watch] using %s backend\n";
                const __gotots_receiver_6 = fsw;
                const __gotots_argument_6 = new $goInterfaceAdapter$string(goInterfaceNonNil<Watcher__from_fswatch>(__gotots_receiver_6).Name());
                const __gotots_argument_9 = RuntimeSlice.literal<GoInterface | undefined>([__gotots_argument_6]);
                provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_7), __gotots_argument_8, __gotots_argument_9);
            }
        }
        const __gotots_callee_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).reportWatchStatus;
        const __gotots_argument_10 = NewCompilerDiagnostic__from_ast($state__diagnostics.Starting_compilation_in_watch_mode, RuntimeSlice.nil<GoInterface | undefined>());
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
        Watcher.$go$private$execute$doBuild(w);
        sync__from_gostdlib.Mutex.Unlock((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mu);
        if ((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).testing === undefined) {
            for (;;) {
                const __gotots_receiver_7 = ctx;
                const __gotots_channel_0 = goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_7).Done();
                const __gotots_channel_1 = (value: GoEmptyStruct, ok: boolean): void => {
                    __gotots_receive_0 = [value, ok];
                };
                let __gotots_receive_0: [
                    GoEmptyStruct,
                    boolean
                ] | undefined = undefined;
                const __gotots_select_0 = GoChannel.$selectReceive(__gotots_channel_0, __gotots_channel_1);
                let __gotots_receive_1: [
                    GoEmptyStruct,
                    boolean
                ] | undefined = undefined;
                const __gotots_select_1 = GoChannel.$selectReceive((w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).doCycleCh, (value: GoEmptyStruct, ok: boolean): void => {
                    __gotots_receive_1 = [value, ok];
                });
                const __gotots_switch_selection_0 = goSelect([__gotots_select_0, __gotots_select_1]);
                switch (__gotots_switch_selection_0) {
                    case 0: {
                        Watcher.$go$private$execute$closeAllWatches(w);
                        return;
                        break;
                    }
                    case 1: {
                        Watcher.DoCycle(w);
                        break;
                    }
                    default: GoPanic.raiseRuntime("select returned an invalid case");
                }
            }
        }
    }
}
export function createWatcher(sys: System__from_tsc | undefined, configParseResult: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, compilerOptionsFromCommandLine: {
    value: CompilerOptions__from_core;
} | undefined, commandLineRaw: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, reportDiagnostic: (($0: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) => void) | undefined, reportErrorSummary: (($0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) => void) | undefined, testing: CommandLineTesting__from_tsc | undefined): Watcher | undefined {
    const __gotots_field_0 = sys;
    const __gotots_field_1 = configParseResult;
    const __gotots_field_2 = compilerOptionsFromCommandLine;
    const __gotots_field_3 = commandLineRaw;
    const __gotots_field_4 = reportDiagnostic;
    const __gotots_field_5 = reportErrorSummary;
    const __gotots_field_6 = CreateWatchStatusReporter__from_tsc(sys, ParsedCommandLine__from_tsoptions.Locale(configParseResult), ParsedCommandLine__from_tsoptions.CompilerOptions(configParseResult), testing);
    const __gotots_field_7 = testing;
    const __gotots_struct_0 = SyncMap__from_collections.$zero<Path__from_tspath, {
        value: cachedSourceFile;
    } | undefined>();
    const __gotots_field_8 = tsonicTypeScriptRuntime.location<SyncMap__from_collections<Path__from_tspath, {
        value: cachedSourceFile;
    } | undefined>>(__gotots_struct_0);
    let w: Watcher | undefined = new Watcher(named_sync.SyncMutexOperations.$zero(), __gotots_field_0, "", __gotots_field_1, __gotots_field_2, __gotots_field_3, __gotots_field_4, __gotots_field_5, __gotots_field_6, __gotots_field_7, void 0, void 0, false, false, RuntimeSlice.nil<gostring>(), __gotots_field_8, void 0, GoMap.make(0, []), void 0, $goMap$MapOf_string_To_Named_time$Time.nil(), GoChannel.make<GoEmptyStruct>(1, (): GoEmptyStruct => {
        return GoEmptyStruct.$zero();
    }, (value: GoEmptyStruct): GoEmptyStruct => {
        return GoEmptyStruct.$copy(value);
    }), void 0, named_sync.SyncMutexOperations.$zero(), GoMap__from_gotots_runtime.nil<gostring, EventKind__from_fswatch>(new EventKind__from_fswatch(0)), false);
    if (!(((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined)) {
        (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).configFileName = SourceFile__from_ast.FileName((((configParseResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile);
    }
    {
        const __gotots_results_0 = (($value: CommandLineTesting__from_tsc | undefined): [
            commandLineTestingWithWatchBackend | undefined,
            boolean
        ] => {
            if (!commandLineTestingWithWatchBackend$is($value)) {
                return [void 0, false];
            }
            return [$value, true];
        })(testing);
        let t: commandLineTestingWithWatchBackend | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            const __gotots_receiver_0 = t;
            (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).backend = goInterfaceNonNil<commandLineTestingWithWatchBackend>(__gotots_receiver_0).WatchBackend();
        }
    }
    return w;
}
export function canWatchDirectory(dir: gostring): bool {
    let components = GetPathComponents__from_tspath(dir, "");
    let length = components.length;
    if (length <= 2) {
        return false;
    }
    let rootLength = perceivedOsRootLengthForWatching(components);
    return length > rootLength + 1;
}
export function perceivedOsRootLengthForWatching(components: RuntimeSlice<gostring>): int {
    let length = components.length;
    if (length <= 1) {
        return 1;
    }
    let root = components.get(0);
    let indexAfterOsRoot = 1;
    let isDosStyle = root.length >= 2 && IsVolumeCharacter__from_tspath(goStringIndex(root, 0)) && goStringIndex(root, 1) === 58;
    if (root !== "/" && !isDosStyle && components.length > 1) {
        if (components.get(1).length >= 2 && IsVolumeCharacter__from_tspath(goStringIndex(components.get(1), 0)) && strings__from_gostdlib.HasSuffix(components.get(1), "$")) {
            if (length === 2) {
                return 2;
            }
            indexAfterOsRoot = 2;
            isDosStyle = true;
        }
    }
    if (isDosStyle && (indexAfterOsRoot >= length || !strings__from_gostdlib.EqualFold(components.get(indexAfterOsRoot), "users"))) {
        return indexAfterOsRoot;
    }
    if (indexAfterOsRoot < length && strings__from_gostdlib.EqualFold(components.get(indexAfterOsRoot), "workspaces")) {
        return indexAfterOsRoot + 1;
    }
    return indexAfterOsRoot + 2;
}
export function shouldIgnoreWatchPath(path: gostring): bool {
    let p = NormalizeSlashes__from_tspath(path);
    return strings__from_gostdlib.HasSuffix(p, "/.git") || strings__from_gostdlib.Contains(p, "/.git/") || strings__from_gostdlib.Contains(p, "/node_modules/.") || strings__from_gostdlib.Contains(p, "/.#");
}
