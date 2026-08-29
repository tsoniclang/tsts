import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Checker as Checker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import type { WriteFileData as WriteFileData__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { WorkGroup as WorkGroup__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { SignatureUpdateKind, TestingData } from "./program.js";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName, FileEmitKind, FileInfo } from "./snapshot.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { DeclarationBase as DeclarationBase__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, SourceFile as SourceFile__from_ast, SymbolFlagsConstEnum$constant as SymbolFlagsConstEnum$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { SkipAlias as SkipAlias__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { EmitOnlyForcedDts$constant as EmitOnlyForcedDts$constant__from_compiler, EmitOptions as EmitOptions__from_compiler, Program as Program__from_compiler, WriteFile as WriteFile__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, NewWorkGroup as NewWorkGroup__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { IsDeclarationFileName as IsDeclarationFileName__from_tspath, Path as Path__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Delete.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature, SyncMap$LoadOrStore$Named_tspath$Path$bool } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncMap$Store$Named_tspath$Path$bool } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { SyncSet$Add$Named_tspath$Path, SyncSet$Add$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$Has$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Has.js";
import { SyncSet$Range$Named_tspath$Path, SyncSet$Range$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Range.js";
import { SyncSet$Size$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Size.js";
import { Filter$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { IfElse$Named_incremental$FileEmitKind } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Values$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/maps/Values.js";
import { Collect$Named_tspath$Path, Collect$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/slices/Collect.js";
import { ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/ContainsFunc.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile, $goMap$MapOf_Named_tspath$Path_To_Named_incremental$FileEmitKind as GoMap } from "../../../../../../../support/maps.js";
import { Program, SignatureUpdateKindUsedVersion$constant } from "./program.js";
import { referenceMap } from "./referencemap.js";
import { FileEmitKindAllDts$constant, FileEmitKindDts$constant, GetFileEmitKind, snapshot } from "./snapshot.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class dtsMayChange {
    declare private readonly $goType: void;
    constructor(public readonly $value: GoMapValue<Path__from_tspath, FileEmitKind>) {
    }
    declare private readonly then?: never;
    $go$private$incremental$addFileToAffectedFilesPendingEmit(filePath: Path__from_tspath, emitKind: FileEmitKind): void {
        this.$value.store(filePath, emitKind);
    }
}
export class updatedSignature {
    declare private readonly $goType: void;
    public constructor(public mu: sync__from_gostdlib.Mutex, public signature: gostring, public kind: SignatureUpdateKind) {
    }
    static $copy($source: updatedSignature): updatedSignature {
        return new updatedSignature(named_sync.SyncMutexOperations.$copy($source.mu), $source.signature, $source.kind);
    }
    static $equal($left: updatedSignature, $right: updatedSignature): bool {
        return named_sync.SyncMutexOperations.$equal($left.mu, $right.mu) && $left.signature === $right.signature && $left.kind === $right.kind;
    }
    static $hash($source: updatedSignature): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, named_sync.SyncMutexOperations.$hash($source.mu));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.signature));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.kind));
        return $hash;
    }
    declare private readonly then?: never;
}
export class affectedFilesHandler {
    declare private readonly $goType: void;
    public constructor(public ctx: GoInterface | undefined, public program: {
        value: Program;
    } | undefined, public hasAllFilesExcludingDefaultLibraryFile: atomic__from_gostdlib.Bool, public updatedSignatures: SyncMap__from_collections<Path__from_tspath, {
        value: updatedSignature;
    } | undefined>, public dtsMayChange: RuntimeSlice<GoMapValue<Path__from_tspath, FileEmitKind>>, public filesToRemoveDiagnostics: SyncSet__from_collections<Path__from_tspath>, public cleanedDiagnosticsOfLibFiles: sync__from_gostdlib.Once, public seenFileAndReferences: SyncMap__from_collections<Path__from_tspath, bool>) {
    }
    declare private readonly then?: never;
    static $go$private$incremental$computeDtsSignature(h: affectedFilesHandler | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): gostring {
        let signature = "";
        Program__from_compiler.Emit(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, new EmitOptions__from_compiler(file, EmitOnlyForcedDts$constant__from_compiler(), new WriteFile__from_compiler((fileName: gostring, text: gostring, data: WriteFileData__from_compiler | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined => {
            if (!IsDeclarationFileName__from_tspath(fileName)) {
                const __gotots_argument_5 = new GoInterfaceAdapter("File extension for signature expected to be dts, got : " + fileName);
                GoPanic.raise(__gotots_argument_5 === undefined ? GoPanicNilValue.create() : __gotots_argument_5);
            }
            signature = snapshot.$go$private$incremental$computeSignatureWithDiagnostics(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot, file, text, data);
            return void 0;
        })));
        return signature;
    }
    static $go$private$incremental$forEachFileReferencedBy(h: affectedFilesHandler | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, fn: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $1: Path__from_tspath) => [
        bool,
        bool
    ]) | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        let seenFileNamesMap: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile.make(0, []);
        seenFileNamesMap.store(SourceFile__from_ast.Path(file), file);
        const __gotots_store_12 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_argument_2 = referenceMap.$go$private$incremental$getReferencedBy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "referencedMap"), SourceFile__from_ast.Path(file));
        let queue = Collect$Named_tspath$Path(__gotots_argument_2);
        for (; queue.length > 0;) {
            let currentPath = new Path__from_tspath(queue.get(queue.length - 1));
            queue = queue.slice(0, queue.length - 1, null);
            {
                const __gotots_results_5 = seenFileNamesMap.lookupOk(currentPath);
                let ok = __gotots_results_5[1];
                if (!ok) {
                    let currentFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFileByPath(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, currentPath);
                    seenFileNamesMap.store(currentPath, currentFile);
                    const __gotots_callee_1 = fn;
                    const __gotots_argument_3 = currentFile;
                    const __gotots_argument_4 = currentPath;
                    const __gotots_results_6 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4);
                    let queueForFile = __gotots_results_6[0];
                    let fastReturn = __gotots_results_6[1];
                    if (fastReturn) {
                        return seenFileNamesMap;
                    }
                    if (queueForFile) {
                        const __gotots_store_13 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                        const __gotots_range_6 = named_iter.IterSeqValueOperations.$project(referenceMap.$go$private$incremental$getReferencedBy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "referencedMap"), SourceFile__from_ast.Path(currentFile)));
                        if (__gotots_range_6 === void 0) {
                            GoPanic.raiseRuntime("call of nil function");
                        }
                        let __gotots_range_state_2 = 1;
                        __gotots_range_6(($argument0: Path__from_tspath): bool => {
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
                            let ref = __gotots_range_value_11;
                            queue = queue.append(((void Path__from_tspath,
                                "") as string), [ref.$value]);
                            __gotots_range_state_2 = 1;
                            return true;
                        });
                        if (__gotots_range_state_2 === -1) {
                            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                        }
                        __gotots_range_state_2 = -2;
                    }
                }
            }
        }
        return seenFileNamesMap;
    }
    static $go$private$incremental$getDtsMayChange(h: affectedFilesHandler | undefined, affectedFilePath: Path__from_tspath, affectedFileEmitKind: FileEmitKind): dtsMayChange {
        let result: dtsMayChange = new dtsMayChange(GoMap.make(1, [[affectedFilePath, affectedFileEmitKind]]));
        (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dtsMayChange = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dtsMayChange.append(new dtsMayChange(GoMap.nil()).$value, [result.$value]);
        return result;
    }
    static $go$private$incremental$getFilesAffectedBy(h: affectedFilesHandler | undefined, path: Path__from_tspath): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFileByPath(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
        if (file === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>();
        }
        if (!affectedFilesHandler.$go$private$incremental$updateShapeSignature(h, file, false)) {
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>([file]);
        }
        {
            const __gotots_store_2 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "fileInfos"), SourceFile__from_ast.Path(file));
            let info: {
                value: FileInfo;
            } | undefined = __gotots_results_0[0];
            if ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.affectsGlobalScope) {
                atomic__from_gostdlib.Bool.Store((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasAllFilesExcludingDefaultLibraryFile, true);
                snapshot.$go$private$incremental$getAllFilesExcludingDefaultLibraryFile(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot, ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file);
            }
        }
        if (Tristate_IsTrue__from_core((((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedModules)) {
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>([file]);
        }
        let seenFileNamesMap: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = affectedFilesHandler.$go$private$incremental$forEachFileReferencedBy(h, file, (currentFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, currentPath: Path__from_tspath): [
            bool,
            bool
        ] => {
            let queueForFile: bool = false;
            let fastReturn: bool = false;
            if (!(currentFile === undefined) && affectedFilesHandler.$go$private$incremental$updateShapeSignature(h, currentFile, false)) {
                return [true, false];
            }
            return [false, false];
        });
        return Filter$PointerTo_Named_ast$SourceFile(Collect$PointerTo_Named_ast$SourceFile(Values$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile(seenFileNamesMap)), (file__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
            return !(file__shadow_1 === undefined);
        });
    }
    static $go$private$incremental$handleDtsMayChangeOf(h: affectedFilesHandler | undefined, dtsMayChange__shadow_1: dtsMayChange, path: Path__from_tspath, invalidateJsFiles: bool): void {
        const __gotots_store_18 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        if (SyncSet$Has$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "changedFilesSet"), path)) {
            return;
        }
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFileByPath(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, path);
        if (file === undefined) {
            return;
        }
        affectedFilesHandler.$go$private$incremental$removeSemanticDiagnosticsOf(h, path);
        affectedFilesHandler.$go$private$incremental$updateShapeSignature(h, file, true);
        if (invalidateJsFiles) {
            dtsMayChange__shadow_1.$go$private$incremental$addFileToAffectedFilesPendingEmit(path, GetFileEmitKind(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options));
        }
        else if (CompilerOptions__from_core.GetEmitDeclarations(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options)) {
            dtsMayChange__shadow_1.$go$private$incremental$addFileToAffectedFilesPendingEmit(path, IfElse$Named_incremental$FileEmitKind(Tristate_IsTrue__from_core((((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap), FileEmitKindAllDts$constant(), FileEmitKindDts$constant()));
        }
    }
    static $go$private$incremental$handleDtsMayChangeOfAffectedFile(h: affectedFilesHandler | undefined, dtsMayChange__shadow_1: dtsMayChange, affectedFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
        affectedFilesHandler.$go$private$incremental$removeSemanticDiagnosticsOf(h, SourceFile__from_ast.Path(affectedFile));
        if (atomic__from_gostdlib.Bool.Load((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hasAllFilesExcludingDefaultLibraryFile)) {
            affectedFilesHandler.$go$private$incremental$removeDiagnosticsOfLibraryFiles(h);
            affectedFilesHandler.$go$private$incremental$updateShapeSignature(h, affectedFile, false);
            return;
        }
        if (Tristate_IsTrue__from_core((((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AssumeChangesOnlyAffectDirectDependencies)) {
            return;
        }
        const __gotots_store_3 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        if (!SyncSet$Has$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "changedFilesSet"), SourceFile__from_ast.Path(affectedFile)) || !affectedFilesHandler.$go$private$incremental$isChangedSignature(h, SourceFile__from_ast.Path(affectedFile))) {
            return;
        }
        if (Tristate_IsTrue__from_core((((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedModules)) {
            affectedFilesHandler.$go$private$incremental$forEachFileReferencedBy(h, affectedFile, (currentFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, currentPath: Path__from_tspath): [
                bool,
                bool
            ] => {
                let queueForFile: bool = false;
                let fastReturn: bool = false;
                if (affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOfGlobalScope(h, dtsMayChange__shadow_1, currentPath, false)) {
                    return [false, true];
                }
                affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOf(h, dtsMayChange__shadow_1, currentPath, false);
                if (affectedFilesHandler.$go$private$incremental$isChangedSignature(h, currentPath)) {
                    return [true, false];
                }
                return [false, false];
            });
        }
        let invalidateJsFiles = false;
        let typeChecker: {
            value: Checker__from_checker;
        } | undefined = void 0;
        let done: (() => void) | undefined;
        if (!(DeclarationBase__from_ast.$storageOf(((affectedFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol === undefined)) {
            const __gotots_range_1 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf(((affectedFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.DeclarationBase).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value;
            const __gotots_range_keys_0 = __gotots_range_1.keys();
            for (const __gotots_range_value_1 of __gotots_range_keys_0) {
                const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
                if (!__gotots_range_value_2[1]) {
                    continue;
                }
                const __gotots_range_value_3 = __gotots_range_value_2[0];
                let exported: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_3;
                if (!((Symbol__from_ast.$storageOf(((exported ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsConstEnum$constant__from_ast()) >>> 0 === 0)) {
                    invalidateJsFiles = true;
                    break;
                }
                if (typeChecker === undefined) {
                    const __gotots_results_1 = Program__from_compiler.GetTypeCheckerForFileExclusive(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx, affectedFile);
                    typeChecker = __gotots_results_1[0];
                    done = __gotots_results_1[1];
                }
                let aliased: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = SkipAlias__from_checker(exported, typeChecker);
                if (tsonicTypeScriptRuntime.sameLocation(aliased, exported)) {
                    continue;
                }
                if (!(((Symbol__from_ast.$storageOf(((aliased ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsConstEnum$constant__from_ast()) >>> 0) === 0)) {
                    if (ContainsFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((aliased ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        return tsonicTypeScriptRuntime.sameLocation(GetSourceFileOfNode__from_ast(d), affectedFile);
                    })) {
                        invalidateJsFiles = true;
                        break;
                    }
                }
            }
        }
        if (!(done === undefined)) {
            const __gotots_callee_0 = done;
            (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        }
        const __gotots_store_4 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_range_2 = named_iter.IterSeqValueOperations.$project(referenceMap.$go$private$incremental$getReferencedBy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "referencedMap"), SourceFile__from_ast.Path(affectedFile)));
        if (__gotots_range_2 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_2(($argument0: Path__from_tspath): bool => {
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
            const __gotots_range_value_4 = $argument0;
            let fileReferencingChangedFile = __gotots_range_value_4;
            if (affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOfGlobalScope(h, dtsMayChange__shadow_1, fileReferencingChangedFile, invalidateJsFiles)) {
                __gotots_range_state_0 = 2;
                return false;
            }
            const __gotots_store_5 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_range_3 = named_iter.IterSeqValueOperations.$project(referenceMap.$go$private$incremental$getReferencedBy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "referencedMap"), fileReferencingChangedFile));
            if (__gotots_range_3 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_1 = 1;
            __gotots_range_3(($argument0: Path__from_tspath): bool => {
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
                const __gotots_range_value_5 = $argument0;
                let fileReferencingAffectedFile = __gotots_range_value_5;
                if (affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOfFileAndReferences(h, dtsMayChange__shadow_1, fileReferencingAffectedFile, invalidateJsFiles)) {
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
                __gotots_range_state_0 = 2;
                return false;
            }
            __gotots_range_state_1 = -2;
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_0 === 2) {
            return;
        }
        __gotots_range_state_0 = -2;
    }
    static $go$private$incremental$handleDtsMayChangeOfFileAndReferences(h: affectedFilesHandler | undefined, dtsMayChange__shadow_1: dtsMayChange, filePath: Path__from_tspath, invalidateJsFiles: bool): bool {
        {
            const __gotots_store_19 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_results_10 = SyncMap$LoadOrStore$Named_tspath$Path$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "seenFileAndReferences"), filePath, invalidateJsFiles);
            let existing = __gotots_results_10[0];
            let loaded = __gotots_results_10[1];
            if (loaded && (existing || !invalidateJsFiles)) {
                return false;
            }
            else if (loaded && invalidateJsFiles) {
                const __gotots_store_20 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                SyncMap$Store$Named_tspath$Path$bool(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "seenFileAndReferences"), filePath, true);
            }
        }
        if (affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOfGlobalScope(h, dtsMayChange__shadow_1, filePath, invalidateJsFiles)) {
            return true;
        }
        affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOf(h, dtsMayChange__shadow_1, filePath, invalidateJsFiles);
        const __gotots_store_21 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_range_9 = named_iter.IterSeqValueOperations.$project(referenceMap.$go$private$incremental$getReferencedBy(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "referencedMap"), filePath));
        if (__gotots_range_9 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_3 = 1;
        let __gotots_range_return_0: bool = false;
        __gotots_range_9(($argument0: Path__from_tspath): bool => {
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
            const __gotots_range_value_14 = $argument0;
            let referencingFilePath = __gotots_range_value_14;
            if (affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOfFileAndReferences(h, dtsMayChange__shadow_1, referencingFilePath, invalidateJsFiles)) {
                __gotots_range_return_0 = true;
                __gotots_range_state_3 = 2;
                return false;
            }
            __gotots_range_state_3 = 1;
            return true;
        });
        if (__gotots_range_state_3 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_3 === 2) {
            return __gotots_range_return_0;
        }
        __gotots_range_state_3 = -2;
        return false;
    }
    static $go$private$incremental$handleDtsMayChangeOfGlobalScope(h: affectedFilesHandler | undefined, dtsMayChange__shadow_1: dtsMayChange, filePath: Path__from_tspath, invalidateJsFiles: bool): bool {
        {
            const __gotots_store_17 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_9 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "fileInfos"), filePath);
            let info: {
                value: FileInfo;
            } | undefined = __gotots_results_9[0];
            let ok = __gotots_results_9[1];
            if (!ok || !(info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.affectsGlobalScope) {
                return false;
            }
        }
        const __gotots_range_8 = snapshot.$go$private$incremental$getAllFilesExcludingDefaultLibraryFile(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot, ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, void 0);
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_8.length; __gotots_range_index_3++) {
            const __gotots_range_value_13 = __gotots_range_8.get(__gotots_range_index_3);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_13;
            affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOf(h, dtsMayChange__shadow_1, SourceFile__from_ast.Path(file), invalidateJsFiles);
        }
        affectedFilesHandler.$go$private$incremental$removeDiagnosticsOfLibraryFiles(h);
        return true;
    }
    static $go$private$incremental$isChangedSignature(h: affectedFilesHandler | undefined, path: Path__from_tspath): bool {
        const __gotots_store_15 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_results_7 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "updatedSignatures"), path);
        let newSignature: {
            value: updatedSignature;
        } | undefined = __gotots_results_7[0];
        const __gotots_store_16 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_results_8 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "fileInfos"), path);
        let oldInfo: {
            value: FileInfo;
        } | undefined = __gotots_results_8[0];
        return (newSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature !== (oldInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature;
    }
    static $go$private$incremental$removeDiagnosticsOfLibraryFiles(h: affectedFilesHandler | undefined): void {
        sync__from_gostdlib.Once.Do((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cleanedDiagnosticsOfLibFiles, (): void => {
            const __gotots_range_7 = Program.GetSourceFiles((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_7.length; __gotots_range_index_2++) {
                const __gotots_range_value_12 = __gotots_range_7.get(__gotots_range_index_2);
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_12;
                if (Program__from_compiler.IsSourceFileDefaultLibrary(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, SourceFile__from_ast.Path(file)) && !Program__from_compiler.SkipTypeChecking(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program, file, true)) {
                    affectedFilesHandler.$go$private$incremental$removeSemanticDiagnosticsOf(h, SourceFile__from_ast.Path(file));
                }
            }
        });
    }
    static $go$private$incremental$removeSemanticDiagnosticsOf(h: affectedFilesHandler | undefined, path: Path__from_tspath): void {
        const __gotots_store_14 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        SyncSet$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "filesToRemoveDiagnostics"), path);
    }
    static $go$private$incremental$updateShapeSignature(h: affectedFilesHandler | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, useFileVersionAsSignature: bool): bool {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: bool = false;
        try {
            try {
                __gotots_return_block_0: {
                    let update: {
                        value: updatedSignature;
                    } | undefined = { value: new updatedSignature(named_sync.SyncMutexOperations.$zero(), "", 0) };
                    sync__from_gostdlib.Mutex.Lock((update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                    const __gotots_receiver_6: updatedSignature["mu"] = (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_6, $go$recovery);
                    });
                    {
                        const __gotots_store_10 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_results_3 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "updatedSignatures"), SourceFile__from_ast.Path(file), update);
                        let existing: {
                            value: updatedSignature;
                        } | undefined = __gotots_results_3[0];
                        let ok = __gotots_results_3[1];
                        if (ok) {
                            sync__from_gostdlib.Mutex.Lock((existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                            const __gotots_receiver_7: updatedSignature["mu"] = (existing ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncMutexUnlock(__gotots_receiver_7, $go$recovery);
                            });
                            __gotots_return_0 = false;
                            break __gotots_return_block_0;
                        }
                    }
                    const __gotots_store_11 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "fileInfos"), SourceFile__from_ast.Path(file));
                    let info: {
                        value: FileInfo;
                    } | undefined = __gotots_results_4[0];
                    let prevSignature: FileInfo["signature"] = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature;
                    if (!((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile && !useFileVersionAsSignature) {
                        (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature = affectedFilesHandler.$go$private$incremental$computeDtsSignature(h, file);
                    }
                    if ((update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature === "") {
                        (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature = (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version;
                        (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind = SignatureUpdateKindUsedVersion$constant();
                    }
                    __gotots_return_0 = (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature !== prevSignature;
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
    static $go$private$incremental$updateSnapshot(h: affectedFilesHandler | undefined): void {
        const __gotots_receiver_5 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ctx;
        if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_5).Err() === undefined)) {
            return;
        }
        const __gotots_store_6 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$updatedSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "updatedSignatures"), (filePath: Path__from_tspath, update: {
            value: updatedSignature;
        } | undefined): bool => {
            {
                const __gotots_store_7 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "fileInfos"), filePath);
                let info: {
                    value: FileInfo;
                } | undefined = __gotots_results_2[0];
                let ok = __gotots_results_2[1];
                if (ok) {
                    (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature = (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature;
                    if (!(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData === undefined)) {
                        (((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.testingData ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UpdatedSignatureKinds.store(filePath, (update ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.kind);
                    }
                }
            }
            return true;
        });
        const __gotots_store_8 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        SyncSet$Range$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "filesToRemoveDiagnostics"), (file: Path__from_tspath): bool => {
            const __gotots_store_9 = ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "semanticDiagnosticsPerFile"), file);
            return true;
        });
        const __gotots_range_4 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).dtsMayChange;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_4.length; __gotots_range_index_1++) {
            const __gotots_range_value_6 = new dtsMayChange(__gotots_range_4.get(__gotots_range_index_1));
            let change: dtsMayChange = __gotots_range_value_6;
            const __gotots_range_5 = change.$value;
            const __gotots_range_keys_1 = __gotots_range_5.keys();
            for (const __gotots_range_value_7 of __gotots_range_keys_1) {
                const __gotots_range_value_8 = __gotots_range_5.lookupOk(__gotots_range_value_7);
                if (!__gotots_range_value_8[1]) {
                    continue;
                }
                const __gotots_range_value_9 = __gotots_range_value_7;
                const __gotots_range_value_10 = __gotots_range_value_8[0];
                let filePath = __gotots_range_value_9;
                let emitKind = __gotots_range_value_10;
                snapshot.$go$private$incremental$addFileToAffectedFilesPendingEmit(((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot, filePath, emitKind);
            }
        }
        const __gotots_struct_0 = SyncSet__from_collections.$zero<Path__from_tspath>();
        ((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.changedFilesSet = __gotots_struct_0;
        atomic__from_gostdlib.Bool.Store(((((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
    }
}
export function collectAllAffectedFiles(ctx: GoInterface | undefined, program: {
    value: Program;
} | undefined): void {
    const __gotots_store_0 = (((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
    const __gotots_binary_operand_0 = SyncSet$Size$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "changedFilesSet"));
    const __gotots_binary_operand_1 = 0;
    if (__gotots_binary_operand_0 === __gotots_binary_operand_1) {
        return;
    }
    let handler = new affectedFilesHandler(ctx, program, named_sync_atomic.SyncAtomicBoolOperations.$zero(), SyncMap__from_collections.$zero<Path__from_tspath, {
        value: updatedSignature;
    } | undefined>(), RuntimeSlice.nil<GoMapValue<Path__from_tspath, FileEmitKind>>(), SyncSet__from_collections.$zero<Path__from_tspath>(), named_sync.SyncOnceOperations.$zero(), SyncMap__from_collections.$zero<Path__from_tspath, bool>());
    let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program__from_compiler.SingleThreaded((handler.program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program));
    let result = SyncSet__from_collections.$zero<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>();
    const result$location = tsonicTypeScriptRuntime.boundLocation({}, () => result, result$next => result = result$next);
    const __gotots_store_1 = (((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
    SyncSet$Range$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "changedFilesSet"), (file: Path__from_tspath): bool => {
        const __gotots_receiver_0 = wg;
        const __gotots_argument_0 = (): void => {
            const __gotots_range_0 = affectedFilesHandler.$go$private$incremental$getFilesAffectedBy(handler, file);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let affectedFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_0;
                SyncSet$Add$PointerTo_Named_ast$SourceFile(result$location, affectedFile);
            }
        };
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_0).Queue(__gotots_argument_0);
        return true;
    });
    const __gotots_receiver_1 = wg;
    goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_1).RunAndWait();
    const __gotots_receiver_2 = ctx;
    if (!(goInterfaceNonNil<GoInterface>(__gotots_receiver_2).Err() === undefined)) {
        return;
    }
    wg = NewWorkGroup__from_core(Program__from_compiler.SingleThreaded((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program));
    let emitKind = GetFileEmitKind((((program ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options);
    SyncSet$Range$PointerTo_Named_ast$SourceFile(result$location, (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
        let dtsMayChange__shadow_1: dtsMayChange = affectedFilesHandler.$go$private$incremental$getDtsMayChange(handler, SourceFile__from_ast.Path(file), emitKind);
        const __gotots_receiver_3 = wg;
        const __gotots_argument_1 = (): void => {
            affectedFilesHandler.$go$private$incremental$handleDtsMayChangeOfAffectedFile(handler, dtsMayChange__shadow_1, file);
        };
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_3).Queue(__gotots_argument_1);
        return true;
    });
    const __gotots_receiver_4 = wg;
    goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_4).RunAndWait();
    affectedFilesHandler.$go$private$incremental$updateSnapshot(handler);
}
