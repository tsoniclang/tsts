import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerHost as CompilerHost__from_compiler, SourceMapEmitResult as SourceMapEmitResult__from_compiler, WriteFileData as WriteFileData__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { WorkGroup as WorkGroup__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { Host } from "./host.js";
import type { TestingData } from "./program.js";
import type { FileEmitKind, FileInfo, buildInfoDiagnosticWithFileName } from "./snapshot.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CombineEmitResults as CombineEmitResults__from_compiler, EmitAll$constant as EmitAll$constant__from_compiler, EmitOnlyDts$constant as EmitOnlyDts$constant__from_compiler, EmitOnlyJs$constant as EmitOnlyJs$constant__from_compiler, EmitOptions as EmitOptions__from_compiler, EmitResult as EmitResult__from_compiler, Program as Program__from_compiler, WriteFile as WriteFile__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, NewWorkGroup as NewWorkGroup__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { IsDeclarationFileName as IsDeclarationFileName__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { SyncMap$Delete$Named_tspath$Path$Named_incremental$FileEmitKind } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Delete.js";
import { SyncMap$Load$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate, SyncMap$Load$Named_tspath$Path$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Range$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$emitSignature, SyncMap$Range$Named_tspath$Path$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate, SyncMap$Store$Named_tspath$Path$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { collectAllAffectedFiles } from "./affectedfileshandler.js";
import { Program, SignatureUpdateKindStoredAtEmit$constant } from "./program.js";
import { DiagnosticsOrBuildInfoDiagnosticsWithFileName, FileEmitKindAllDts$constant, FileEmitKindAllJs$constant, FileEmitKindDtsErrors$constant, emitSignature, getPendingEmitKind, getTextHandlingSourceMapForSignature, snapshot } from "./snapshot.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_time from "@gotots/gostdlib/internal/facets/named-time.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class emitUpdate {
    declare private readonly $goType: void;
    public constructor(public pendingKind: FileEmitKind, public result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined, public dtsErrorsFromCache: bool) {
    }
    static $copy($source: emitUpdate): emitUpdate {
        return new emitUpdate($source.pendingKind, $source.result, $source.dtsErrorsFromCache);
    }
    static $equal($left: emitUpdate, $right: emitUpdate): bool {
        return $left.pendingKind === $right.pendingKind &&
            tsonicTypeScriptRuntime.sameLocation($left.result, $right.result) && $left.dtsErrorsFromCache === $right.dtsErrorsFromCache;
    }
    static $hash($source: emitUpdate): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.pendingKind));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.result));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.dtsErrorsFromCache));
        return $hash;
    }
    declare private readonly then?: never;
}
export class emitFilesHandler {
    declare private readonly $goType: void;
    public constructor(public ctx: GoInterface | undefined, public program: {
        value: Program;
    } | undefined, public isForDtsErrors: bool, public signatures: SyncMap__from_collections<Path__from_tspath, gostring>, public emitSignatures: SyncMap__from_collections<Path__from_tspath, {
        value: emitSignature;
    } | undefined>, public latestChangedDtsFiles: SyncMap__from_collections<Path__from_tspath, gostring>, public deletedPendingKinds: Set__from_collections<Path__from_tspath>, public emitUpdates: SyncMap__from_collections<Path__from_tspath, {
        value: emitUpdate;
    } | undefined>, public hasEmitDiagnostics: atomic__from_gostdlib.Bool) {
    }
    declare private readonly then?: never;
    static $go$private$incremental$emitAllAffectedFiles(h: emitFilesHandler | undefined, options: EmitOptions__from_compiler): tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined {
        if (snapshot.$go$private$incremental$canUseIncrementalState(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot)) {
            let results = emitFilesHandler.$go$private$incremental$emitFilesIncremental(h, EmitOptions__from_compiler.$copy(options));
            if ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isForDtsErrors) {
                if (!(options.TargetSourceFile === undefined)) {
                    const __gotots_store_13 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "emitDiagnosticsPerFile"), SourceFile__from_ast.Path(options.TargetSourceFile));
                    let diagnostics: {
                        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
                    } | undefined = __gotots_results_4[0];
                    let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(true, DiagnosticsOrBuildInfoDiagnosticsWithFileName.$go$private$incremental$getDiagnostics(diagnostics, ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, options.TargetSourceFile), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
                        value: SourceMapEmitResult__from_compiler;
                    } | undefined>()));
                    emitFilesHandler.$go$private$incremental$updateHasEmitDiagnostics(h, result);
                    return result;
                }
                const __gotots_range_2 = results;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
                    const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_1);
                    let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = __gotots_range_value_4;
                    emitFilesHandler.$go$private$incremental$updateHasEmitDiagnostics(h, result);
                }
                return CombineEmitResults__from_compiler(results);
            }
            else {
                let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = CombineEmitResults__from_compiler(results);
                emitFilesHandler.$go$private$incremental$updateHasEmitDiagnostics(h, result);
                emitFilesHandler.$go$private$incremental$emitBuildInfo(h, EmitOptions__from_compiler.$copy(options), result);
                return result;
            }
        }
        else if (!(h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isForDtsErrors) {
            let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = Program__from_compiler.Emit(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, emitFilesHandler.$go$private$incremental$getEmitOptions(h, EmitOptions__from_compiler.$copy(options)));
            emitFilesHandler.$go$private$incremental$updateHasEmitDiagnostics(h, result);
            emitFilesHandler.$go$private$incremental$updateSnapshot(h);
            emitFilesHandler.$go$private$incremental$emitBuildInfo(h, EmitOptions__from_compiler.$copy(options), result);
            return result;
        }
        else {
            let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(true, Program__from_compiler.GetDeclarationDiagnostics(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, options.TargetSourceFile), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
                value: SourceMapEmitResult__from_compiler;
            } | undefined>()));
            if (((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics.length !== 0) {
                emitFilesHandler.$go$private$incremental$updateHasEmitDiagnostics(h, result);
                ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasEmitDiagnostics = true;
            }
            return result;
        }
    }
    static $go$private$incremental$emitBuildInfo(h: emitFilesHandler | undefined, options: EmitOptions__from_compiler, result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined): void {
        let buildInfoResult: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = Program.$go$private$incremental$emitBuildInfo((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, EmitOptions__from_compiler.$copy(options));
        if (!(buildInfoResult === undefined)) {
            ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics, ((buildInfoResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics, void 0);
            ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles = goSliceAppendSlice<gostring>(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles, ((buildInfoResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.EmittedFiles, "");
        }
    }
    static $go$private$incremental$emitFilesIncremental(h: emitFilesHandler | undefined, options: EmitOptions__from_compiler): RuntimeSlice<tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined> {
        collectAllAffectedFiles((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        const __gotots_receiver_5 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_5).Err() === undefined)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined>();
        }
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program__from_compiler.SingleThreaded(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program));
        const __gotots_store_17 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        SyncMap$Range$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "affectedFilesPendingEmit"), (path: Path__from_tspath, emitKind: FileEmitKind): bool => {
            let affectedFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFileByPath(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
            if (affectedFile === undefined || !Program__from_compiler.SourceFileMayBeEmitted(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, affectedFile, false)) {
                const __gotots_store_18 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                Set$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "deletedPendingKinds"), path);
                return true;
            }
            let pendingKind = emitFilesHandler.$go$private$incremental$getPendingEmitKindForEmitOptions(h, emitKind, EmitOptions__from_compiler.$copy(options));
            if (!(pendingKind === 0)) {
                const __gotots_receiver_6 = wg;
                const __gotots_argument_8 = (): void => {
                    let emitOnly = 0;
                    if (!(((pendingKind & FileEmitKindAllJs$constant()) >>> 0) === 0)) {
                        emitOnly = EmitOnlyJs$constant__from_compiler();
                    }
                    if (!(((pendingKind & FileEmitKindAllDts$constant()) >>> 0) === 0)) {
                        if (emitOnly === EmitOnlyJs$constant__from_compiler()) {
                            emitOnly = EmitAll$constant__from_compiler();
                        }
                        else {
                            emitOnly = EmitOnlyDts$constant__from_compiler();
                        }
                    }
                    let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = void 0;
                    if (!(h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isForDtsErrors) {
                        result = Program__from_compiler.Emit(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, emitFilesHandler.$go$private$incremental$getEmitOptions(h, new EmitOptions__from_compiler(affectedFile, emitOnly, options.WriteFile)));
                    }
                    else {
                        result =
                            tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(true, Program__from_compiler.GetDeclarationDiagnostics(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, affectedFile), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
                                value: SourceMapEmitResult__from_compiler;
                            } | undefined>()));
                    }
                    emitFilesHandler.$go$private$incremental$updateHasEmitDiagnostics(h, result);
                    const __gotots_store_19 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "emitUpdates"), path, { value: new emitUpdate(getPendingEmitKind(emitKind, pendingKind), result, false) });
                };
                goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_6).Queue(__gotots_argument_8);
            }
            return true;
        });
        const __gotots_receiver_7 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_7).RunAndWait();
        const __gotots_receiver_8 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_8).Err() === undefined)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined>();
        }
        const __gotots_store_20 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "emitDiagnosticsPerFile"), (path: Path__from_tspath, diagnostics: {
            value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
        } | undefined): bool => {
            {
                const __gotots_store_21 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_results_6 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "emitUpdates"), path);
                let ok = __gotots_results_6[1];
                if (!ok) {
                    let affectedFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFileByPath(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
                    if (affectedFile === undefined || !Program__from_compiler.SourceFileMayBeEmitted(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, affectedFile, false)) {
                        const __gotots_store_22 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        Set$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "deletedPendingKinds"), path);
                        return true;
                    }
                    const __gotots_store_23 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    const __gotots_results_7 = SyncMap$Load$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "affectedFilesPendingEmit"), path);
                    let pendingKind = __gotots_results_7[0];
                    const __gotots_store_24 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "emitUpdates"), path, { value: new emitUpdate(pendingKind, tsonicTypeScriptRuntime.location<EmitResult__from_compiler>(new EmitResult__from_compiler(true, DiagnosticsOrBuildInfoDiagnosticsWithFileName.$go$private$incremental$getDiagnostics(diagnostics, ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, affectedFile), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
                            value: SourceMapEmitResult__from_compiler;
                        } | undefined>())), true) });
                }
            }
            return true;
        });
        return emitFilesHandler.$go$private$incremental$updateSnapshot(h);
    }
    static $go$private$incremental$getEmitOptions(h: emitFilesHandler | undefined, options: EmitOptions__from_compiler): EmitOptions__from_compiler {
        if (!CompilerOptions__from_core.GetEmitDeclarations(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options)) {
            return EmitOptions__from_compiler.$copy(options);
        }
        let canUseIncrementalState = snapshot.$go$private$incremental$canUseIncrementalState(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot);
        return new EmitOptions__from_compiler(options.TargetSourceFile, options.EmitOnly, new WriteFile__from_compiler((fileName: gostring, text: gostring, data: WriteFileData__from_compiler | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            let differsOnlyInMap = false;
            const differsOnlyInMap$location = tsonicTypeScriptRuntime.boundLocation({}, () => differsOnlyInMap, differsOnlyInMap$next => differsOnlyInMap = differsOnlyInMap$next);
            if (IsDeclarationFileName__from_tspath(fileName)) {
                if (canUseIncrementalState) {
                    let emitSignature__shadow_1 = "";
                    const __gotots_store_0 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "fileInfos"), SourceFile__from_ast.Path(options.TargetSourceFile));
                    let info: {
                        value: FileInfo;
                    } | undefined = __gotots_results_0[0];
                    if ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature === (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version) {
                        let signature = snapshot.$go$private$incremental$computeSignatureWithDiagnostics(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot, options.TargetSourceFile, text, data);
                        if ((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostics.length === 0) {
                            emitSignature__shadow_1 = signature;
                        }
                        if (signature !== (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version) {
                            const __gotots_store_1 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            SyncMap$Store$Named_tspath$Path$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "signatures"), SourceFile__from_ast.Path(options.TargetSourceFile), signature);
                        }
                    }
                    if (emitFilesHandler.$go$private$incremental$skipDtsOutputOfComposite(h, options.TargetSourceFile, fileName, text, data, emitSignature__shadow_1, differsOnlyInMap$location)) {
                        return void 0;
                    }
                }
            }
            let aTime = named_time.TimeOperations.$zero();
            if (differsOnlyInMap) {
                const __gotots_receiver_1 = ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_argument_0 = fileName;
                aTime = goInterfaceNonNil<Host>(__gotots_receiver_1).GetMTime(__gotots_argument_0);
            }
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
            if (!(options.WriteFile.$value === undefined)) {
                const __gotots_callee_0 = options.WriteFile.$value;
                const __gotots_argument_1 = fileName;
                const __gotots_argument_2 = text;
                const __gotots_argument_3 = data;
                err = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
            }
            else {
                const __gotots_receiver_2 = Program__from_compiler.Host(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program);
                const __gotots_receiver_3 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_2).FS();
                const __gotots_argument_4 = fileName;
                const __gotots_argument_5 = text;
                err = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).WriteFile(__gotots_argument_4, __gotots_argument_5);
            }
            if (err === undefined && differsOnlyInMap) {
                const __gotots_receiver_4 = ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host;
                const __gotots_argument_6 = fileName;
                const __gotots_argument_7 = named_time.TimeOperations.$copy(aTime);
                err = goInterfaceNonNil<Host>(__gotots_receiver_4).SetMTime(__gotots_argument_6, __gotots_argument_7);
            }
            return err;
        }));
    }
    static $go$private$incremental$getPendingEmitKindForEmitOptions(h: emitFilesHandler | undefined, emitKind: FileEmitKind, options: EmitOptions__from_compiler): FileEmitKind {
        let pendingKind = getPendingEmitKind(emitKind, 0);
        if (options.EmitOnly === EmitOnlyDts$constant__from_compiler()) {
            pendingKind = (pendingKind & 56) >>> 0;
        }
        if ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isForDtsErrors) {
            pendingKind = (pendingKind & 8) >>> 0;
        }
        return pendingKind;
    }
    static $go$private$incremental$skipDtsOutputOfComposite(h: emitFilesHandler | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, outputFileName: gostring, text: gostring, data: WriteFileData__from_compiler | undefined, newSignature: gostring, differsOnlyInMap: tsonicTypeScriptRuntime.Location<bool> | undefined): bool {
        if (!Tristate_IsTrue__from_core((((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite)) {
            return false;
        }
        let oldSignature = "";
        const __gotots_store_14 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_results_5 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "emitSignatures"), SourceFile__from_ast.Path(file));
        let oldSignatureFormat: {
            value: emitSignature;
        } | undefined = __gotots_results_5[0];
        let ok = __gotots_results_5[1];
        if (ok) {
            if ((oldSignatureFormat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature !== "") {
                oldSignature = (oldSignatureFormat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature;
            }
            else {
                oldSignature = (oldSignatureFormat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signatureWithDifferentOptions.get(0);
            }
        }
        if (newSignature === "") {
            newSignature = snapshot.$go$private$incremental$computeHash(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot, getTextHandlingSourceMapForSignature(text, data));
        }
        if (newSignature === oldSignature) {
            if (!(oldSignatureFormat === undefined) && (oldSignatureFormat ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature === oldSignature) {
                (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SkippedDtsWrite = true;
                return true;
            }
            else {
                void ((differsOnlyInMap ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
                    Tristate_IsTrue__from_core((Program.Options((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Build));
            }
        }
        else {
            const __gotots_store_15 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            SyncMap$Store$Named_tspath$Path$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "latestChangedDtsFiles"), SourceFile__from_ast.Path(file), outputFileName);
        }
        const __gotots_store_16 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "emitSignatures"), SourceFile__from_ast.Path(file), { value: new emitSignature(newSignature, RuntimeSlice.nil<gostring>()) });
        return false;
    }
    static $go$private$incremental$updateHasEmitDiagnostics(h: emitFilesHandler | undefined, result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined): void {
        if (!(result === undefined) && ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics.length !== 0) {
            atomic__from_gostdlib.Bool.Store((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasEmitDiagnostics, true);
        }
    }
    static $go$private$incremental$updateSnapshot(h: emitFilesHandler | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined> {
        if (snapshot.$go$private$incremental$canUseIncrementalState(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot)) {
            const __gotots_store_2 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            SyncMap$Range$Named_tspath$Path$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "signatures"), (file: Path__from_tspath, signature: gostring): bool => {
                const __gotots_store_3 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "fileInfos"), file);
                let info: {
                    value: FileInfo;
                } | undefined = __gotots_results_1[0];
                (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature = signature;
                if (!(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData === undefined)) {
                    (((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdatedSignatureKinds.store(file, SignatureUpdateKindStoredAtEmit$constant());
                }
                atomic__from_gostdlib.Bool.Store(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
                return true;
            });
            const __gotots_store_4 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "emitSignatures"), (file: Path__from_tspath, signature: {
                value: emitSignature;
            } | undefined): bool => {
                const __gotots_store_5 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "emitSignatures"), file, signature);
                atomic__from_gostdlib.Bool.Store(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
                return true;
            });
            const __gotots_store_6 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_range_0 = Set$Keys$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "deletedPendingKinds"));
            const __gotots_range_keys_0 = __gotots_range_0.keys();
            for (const __gotots_range_value_0 of __gotots_range_keys_0) {
                const __gotots_range_value_1 = __gotots_range_0.lookupOk(__gotots_range_value_0);
                if (!__gotots_range_value_1[1]) {
                    continue;
                }
                const __gotots_range_value_2 = __gotots_range_value_0;
                let file = __gotots_range_value_2;
                const __gotots_store_7 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                SyncMap$Delete$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "affectedFilesPendingEmit"), file);
                atomic__from_gostdlib.Bool.Store(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
            }
            let results = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined>();
            const __gotots_range_1 = Program.GetSourceFiles((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_0);
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_3;
                {
                    const __gotots_store_8 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "latestChangedDtsFiles"), SourceFile__from_ast.Path(file));
                    let latestChangedDtsFile = __gotots_results_2[0];
                    let ok = __gotots_results_2[1];
                    if (ok) {
                        ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.latestChangedDtsFile = latestChangedDtsFile;
                        atomic__from_gostdlib.Bool.Store(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
                        ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasChangedDtsFile = true;
                    }
                }
                {
                    const __gotots_store_9 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitUpdate(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "emitUpdates"), SourceFile__from_ast.Path(file));
                    let update: {
                        value: emitUpdate;
                    } | undefined = __gotots_results_3[0];
                    let ok = __gotots_results_3[1];
                    if (ok) {
                        if (!(update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.dtsErrorsFromCache) {
                            if ((update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingKind === 0) {
                                const __gotots_store_10 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                SyncMap$Delete$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "affectedFilesPendingEmit"), SourceFile__from_ast.Path(file));
                            }
                            else {
                                const __gotots_store_11 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "affectedFilesPendingEmit"), SourceFile__from_ast.Path(file), (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pendingKind);
                            }
                            atomic__from_gostdlib.Bool.Store(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
                        }
                        if (!((update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result === undefined)) {
                            results = results.append(void 0, [(update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result]);
                            if ((((update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics.length !== 0) {
                                const __gotots_store_12 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "emitDiagnosticsPerFile"), SourceFile__from_ast.Path(file), { value: new DiagnosticsOrBuildInfoDiagnosticsWithFileName((((update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult__from_compiler>).value.Diagnostics, RuntimeSlice.nil<{
                                        value: buildInfoDiagnosticWithFileName;
                                    } | undefined>()) });
                            }
                        }
                    }
                }
            }
            return results;
        }
        else if (atomic__from_gostdlib.Bool.Load((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasEmitDiagnostics)) {
            ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasEmitDiagnostics = true;
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined>();
    }
}
export function emitFiles(ctx: GoInterface | undefined, program: {
    value: Program;
} | undefined, options: EmitOptions__from_compiler, isForDtsErrors: bool): tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined {
    let emitHandler: emitFilesHandler | undefined = new emitFilesHandler(ctx, program, isForDtsErrors, SyncMap__from_collections.$zero<Path__from_tspath, gostring>(), SyncMap__from_collections.$zero<Path__from_tspath, {
        value: emitSignature;
    } | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, gostring>(), Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.nil();
    }), SyncMap__from_collections.$zero<Path__from_tspath, {
        value: emitUpdate;
    } | undefined>(), named_sync_atomic.SyncAtomicBoolOperations.$zero());
    if (!isForDtsErrors && !(options.TargetSourceFile === undefined)) {
        let result: tsonicTypeScriptRuntime.Location<EmitResult__from_compiler> | undefined = Program__from_compiler.Emit((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, ctx, emitFilesHandler.$go$private$incremental$getEmitOptions(emitHandler, EmitOptions__from_compiler.$copy(options)));
        emitFilesHandler.$go$private$incremental$updateHasEmitDiagnostics(emitHandler, result);
        const __gotots_receiver_0 = ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_0).Err() === undefined)) {
            return void 0;
        }
        emitFilesHandler.$go$private$incremental$updateSnapshot(emitHandler);
        return result;
    }
    return emitFilesHandler.$go$private$incremental$emitAllAffectedFiles(emitHandler, EmitOptions__from_compiler.$copy(options));
}
