import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { EmitResult as EmitResult__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { Program as Program__from_incremental } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/execute/incremental/package.js";
import type { Locale as Locale__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type * as time__from_gostdlib from "@gotots/gostdlib/time.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { $goInterfaceMethod$DefaultLibraryPath$void_to_string, $goInterfaceMethod$DoCycle$void_to_void, $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetEnvironmentVariable$string_to_string, $goInterfaceMethod$GetTrace$Named_io$Writer_Named_locale$Locale_to_PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$GetWidthOfTerminal$void_to_int, $goInterfaceMethod$Now$void_to_Named_time$Time, $goInterfaceMethod$OnBuildStatusReportEnd$Named_io$Writer_to_void, $goInterfaceMethod$OnBuildStatusReportStart$Named_io$Writer_to_void, $goInterfaceMethod$OnEmittedFiles$PointerTo_Named_compiler$EmitResult_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_Named_time$Time_to_void, $goInterfaceMethod$OnListFilesEnd$Named_io$Writer_to_void, $goInterfaceMethod$OnListFilesStart$Named_io$Writer_to_void, $goInterfaceMethod$OnProgram$PointerTo_Named_incremental$Program_to_void, $goInterfaceMethod$OnStatisticsEnd$Named_io$Writer_to_void, $goInterfaceMethod$OnStatisticsStart$Named_io$Writer_to_void, $goInterfaceMethod$OnWatchStatusReportEnd$void_to_void, $goInterfaceMethod$OnWatchStatusReportStart$void_to_void, $goInterfaceMethod$SinceStart$void_to_Named_time$Duration, $goInterfaceMethod$WriteOutputIsTTY$void_to_bool, $goInterfaceMethod$Writer$void_to_Named_io$Writer } from "../../../../../../../support/interface-methods.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export interface System extends GoInterfaceValue {
    DefaultLibraryPath(): gostring;
    FS(): FS__from_vfs | undefined;
    GetCurrentDirectory(): gostring;
    GetEnvironmentVariable($argument0: gostring): gostring;
    GetWidthOfTerminal(): int;
    Now(): time__from_gostdlib.Time;
    SinceStart(): time__from_gostdlib.Duration;
    WriteOutputIsTTY(): bool;
    Writer(): GoInterface | undefined;
}
export const System$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$DefaultLibraryPath$void_to_string, $goInterfaceMethod$FS$void_to_Named_vfs$FS, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetEnvironmentVariable$string_to_string, $goInterfaceMethod$GetWidthOfTerminal$void_to_int, $goInterfaceMethod$Now$void_to_Named_time$Time, $goInterfaceMethod$SinceStart$void_to_Named_time$Duration, $goInterfaceMethod$WriteOutputIsTTY$void_to_bool, $goInterfaceMethod$Writer$void_to_Named_io$Writer]);
export function System$is(value: GoInterfaceValue | undefined): value is System {
    return value !== undefined && value.$go$implements(System$contract);
}
export class ExitStatus {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function ExitStatusSuccess$constant(): ExitStatus {
    return new ExitStatus(0);
}
export function ExitStatusDiagnosticsPresent_OutputsSkipped$constant(): ExitStatus {
    return new ExitStatus(1);
}
export function ExitStatusDiagnosticsPresent_OutputsGenerated$constant(): ExitStatus {
    return new ExitStatus(2);
}
export function ExitStatusProjectReferenceCycle_OutputsSkipped$constant(): ExitStatus {
    return new ExitStatus(4);
}
export interface Watcher extends GoInterfaceValue {
    DoCycle(): void;
}
export const Watcher$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$DoCycle$void_to_void]);
export function Watcher$is(value: GoInterfaceValue | undefined): value is Watcher {
    return value !== undefined && value.$go$implements(Watcher$contract);
}
export class CommandLineResult {
    declare private readonly $goType: void;
    public constructor(public Status: ExitStatus, public Watcher: Watcher | undefined) {
    }
    static $zero(): CommandLineResult {
        return new CommandLineResult(new ExitStatus(0), void 0);
    }
    static $copy($source: CommandLineResult): CommandLineResult {
        return new CommandLineResult($source.Status, $source.Watcher);
    }
    declare private readonly then?: never;
}
export interface CommandLineTesting extends GoInterfaceValue {
    GetTrace($argument0: GoInterface | undefined, $argument1: Locale__from_locale): (($0: {
        value: Message__from_diagnostics;
    } | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined;
    OnBuildStatusReportEnd($argument0: GoInterface | undefined): void;
    OnBuildStatusReportStart($argument0: GoInterface | undefined): void;
    OnEmittedFiles($argument0: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, time__from_gostdlib.Time>> | undefined): void;
    OnListFilesEnd($argument0: GoInterface | undefined): void;
    OnListFilesStart($argument0: GoInterface | undefined): void;
    OnProgram($argument0: {
        value: Program__from_incremental;
    } | undefined): void;
    OnStatisticsEnd($argument0: GoInterface | undefined): void;
    OnStatisticsStart($argument0: GoInterface | undefined): void;
    OnWatchStatusReportEnd(): void;
    OnWatchStatusReportStart(): void;
}
export const CommandLineTesting$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetTrace$Named_io$Writer_Named_locale$Locale_to_PointerTo_Named_diagnostics$Message_Variadic_SliceOf_Interface_void_to_void, $goInterfaceMethod$OnBuildStatusReportEnd$Named_io$Writer_to_void, $goInterfaceMethod$OnBuildStatusReportStart$Named_io$Writer_to_void, $goInterfaceMethod$OnEmittedFiles$PointerTo_Named_compiler$EmitResult_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_Named_time$Time_to_void, $goInterfaceMethod$OnListFilesEnd$Named_io$Writer_to_void, $goInterfaceMethod$OnListFilesStart$Named_io$Writer_to_void, $goInterfaceMethod$OnProgram$PointerTo_Named_incremental$Program_to_void, $goInterfaceMethod$OnStatisticsEnd$Named_io$Writer_to_void, $goInterfaceMethod$OnStatisticsStart$Named_io$Writer_to_void, $goInterfaceMethod$OnWatchStatusReportEnd$void_to_void, $goInterfaceMethod$OnWatchStatusReportStart$void_to_void]);
export function CommandLineTesting$is(value: GoInterfaceValue | undefined): value is CommandLineTesting {
    return value !== undefined && value.$go$implements(CommandLineTesting$contract);
}
export class CompileTimes {
    declare private readonly $goType: void;
    public constructor(public ConfigTime: time__from_gostdlib.Duration, public ParseTime: time__from_gostdlib.Duration, public bindTime: time__from_gostdlib.Duration, public checkTime: time__from_gostdlib.Duration, public totalTime: time__from_gostdlib.Duration, public emitTime: time__from_gostdlib.Duration, public BuildInfoReadTime: time__from_gostdlib.Duration, public ChangesComputeTime: time__from_gostdlib.Duration) {
    }
    static $zero(): CompileTimes {
        return new CompileTimes(named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n), named_time.TimeDurationValueOperations.$wrap(0n));
    }
    static $copy($source: CompileTimes): CompileTimes {
        return new CompileTimes($source.ConfigTime, $source.ParseTime, $source.bindTime, $source.checkTime, $source.totalTime, $source.emitTime, $source.BuildInfoReadTime, $source.ChangesComputeTime);
    }
    static $equal($left: CompileTimes, $right: CompileTimes): bool {
        return named_time.TimeDurationValueOperations.$project($left.ConfigTime) === named_time.TimeDurationValueOperations.$project($right.ConfigTime) && named_time.TimeDurationValueOperations.$project($left.ParseTime) === named_time.TimeDurationValueOperations.$project($right.ParseTime) && named_time.TimeDurationValueOperations.$project($left.bindTime) === named_time.TimeDurationValueOperations.$project($right.bindTime) && named_time.TimeDurationValueOperations.$project($left.checkTime) === named_time.TimeDurationValueOperations.$project($right.checkTime) && named_time.TimeDurationValueOperations.$project($left.totalTime) === named_time.TimeDurationValueOperations.$project($right.totalTime) && named_time.TimeDurationValueOperations.$project($left.emitTime) === named_time.TimeDurationValueOperations.$project($right.emitTime) && named_time.TimeDurationValueOperations.$project($left.BuildInfoReadTime) === named_time.TimeDurationValueOperations.$project($right.BuildInfoReadTime) && named_time.TimeDurationValueOperations.$project($left.ChangesComputeTime) === named_time.TimeDurationValueOperations.$project($right.ChangesComputeTime);
    }
    static $hash($source: CompileTimes): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.ConfigTime)));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.ParseTime)));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.bindTime)));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.checkTime)));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.totalTime)));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.emitTime)));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.BuildInfoReadTime)));
        $hash = GoMapHash.mix($hash, GoMapHash.bigint(named_time.TimeDurationValueOperations.$project($source.ChangesComputeTime)));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CompileAndEmitResult {
    declare private readonly $goType: void;
    public constructor(public Diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public EmitResult: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined, public Status: ExitStatus, public times: tsonicTypeScriptRuntime.Location<CompileTimes> | undefined) {
    }
    static $zero(): CompileAndEmitResult {
        return new CompileAndEmitResult(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), void 0, new ExitStatus(0), void 0);
    }
    static $copy($source: CompileAndEmitResult): CompileAndEmitResult {
        return new CompileAndEmitResult($source.Diagnostics, $source.EmitResult, $source.Status, $source.times);
    }
    declare private readonly then?: never;
}
