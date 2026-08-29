import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FileReference as FileReference__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { WorkGroup as WorkGroup__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ModeAwareCache as ModeAwareCache__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { Program } from "./program.js";
import type { FileEmitKind } from "./snapshot.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Diagnostic as Diagnostic__from_ast, GetSourceFileOfNode as GetSourceFileOfNode__from_ast, IsExternalOrCommonJSModule as IsExternalOrCommonJSModule__from_ast, IsGlobalScopeAugmentation as IsGlobalScopeAugmentation__from_ast, IsJsonSourceFile as IsJsonSourceFile__from_ast, IsModuleWithStringLiteralName as IsModuleWithStringLiteralName__from_ast, IsStringLiteral as IsStringLiteral__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, Symbol as Symbol__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { BindSourceFile as BindSourceFile__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { Checker as Checker__from_checker } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, NewWorkGroup as NewWorkGroup__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { CompilerOptionsAffectDeclarationPath as CompilerOptionsAffectDeclarationPath__from_tsoptions, CompilerOptionsAffectEmit as CompilerOptionsAffectEmit__from_tsoptions, CompilerOptionsAffectSemanticDiagnostics as CompilerOptionsAffectSemanticDiagnostics__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { GetDirectoryPath as GetDirectoryPath__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../../support/deferred-callables.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$Equals$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Equals.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { Set$Len$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Len.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$Range$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$FileInfo } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$FileInfo, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { SyncSet$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$Has$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Has.js";
import { SyncSet$Range$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Range.js";
import { IfElse$PointerTo_Named_collections$SetOf_Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import { $goProviderInterfaceBridge$Named_context$Context as GoProviderInterfaceBridge } from "../../../../../../../support/provider-interface-bridges.js";
import { referenceMap } from "./referencemap.js";
import { DiagnosticsOrBuildInfoDiagnosticsWithFileName, FileEmitKindNone$constant, FileInfo, GetFileEmitKind, buildInfoDiagnosticWithFileName, emitSignature, getPendingEmitKindWithOptions, repopulateDiagnosticChain, snapshot } from "./snapshot.js";
import * as context__from_gostdlib from "@gotots/gostdlib/context.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function programToSnapshot(program: {
    value: Program__from_compiler;
} | undefined, oldProgram: {
    value: Program;
} | undefined, hashWithText: bool): tsonicTypeScriptRuntime.Location<snapshot> | undefined {
    if (!(oldProgram === undefined) &&
        (oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.program
            ===
                program) {
        return (oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot;
    }
    let snapshot__shadow_1: tsonicTypeScriptRuntime.Location<snapshot> | undefined = tsonicTypeScriptRuntime.location<snapshot>(new snapshot(SyncMap__from_collections.$zero<Path__from_tspath, {
        value: FileInfo;
    } | undefined>(), Program__from_compiler.Options(program), referenceMap.$zero(), SyncMap__from_collections.$zero<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined>(), SyncSet__from_collections.$zero<Path__from_tspath>(), SyncMap__from_collections.$zero<Path__from_tspath, FileEmitKind>(), "", SyncMap__from_collections.$zero<Path__from_tspath, {
        value: emitSignature;
    } | undefined>(), 0, false, Tristate_IsTrue__from_core((Program__from_compiler.Options(program) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoCheck), named_sync_atomic.SyncAtomicBoolOperations.$zero(), 0, false, named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(), false, false, hashWithText));
    let to: toProgramSnapshot | undefined = new toProgramSnapshot(program, oldProgram, snapshot__shadow_1, false);
    if (snapshot.$go$private$incremental$canUseIncrementalState((to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot)) {
        toProgramSnapshot.$go$private$incremental$reuseFromOldProgram(to);
        toProgramSnapshot.$go$private$incremental$computeProgramFileChanges(to);
        toProgramSnapshot.$go$private$incremental$handleFileDelete(to);
        toProgramSnapshot.$go$private$incremental$handlePendingEmit(to);
        toProgramSnapshot.$go$private$incremental$handlePendingCheck(to);
    }
    return snapshot__shadow_1;
}
export class toProgramSnapshot {
    declare private readonly $goType: void;
    public constructor(public program: {
        value: Program__from_compiler;
    } | undefined, public oldProgram: {
        value: Program;
    } | undefined, public snapshot: tsonicTypeScriptRuntime.Location<snapshot> | undefined, public globalFileRemoved: bool) {
    }
    declare private readonly then?: never;
    static $go$private$incremental$computeProgramFileChanges(t: toProgramSnapshot | undefined): void {
        let canCopySemanticDiagnostics = !((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram === undefined) && !CompilerOptionsAffectSemanticDiagnostics__from_tsoptions(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options, Program__from_compiler.Options((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
        let canCopyEmitSignatures = Tristate_IsTrue__from_core(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite) && !((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram === undefined) && !CompilerOptionsAffectDeclarationPath__from_tsoptions(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options, Program__from_compiler.Options((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
        let copyDeclarationFileDiagnostics = canCopySemanticDiagnostics && Tristate_IsTrue__from_core(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipLibCheck) === Tristate_IsTrue__from_core((((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipLibCheck);
        let copyLibFileDiagnostics = copyDeclarationFileDiagnostics && Tristate_IsTrue__from_core(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipDefaultLibCheck) === Tristate_IsTrue__from_core((((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipDefaultLibCheck);
        let files = Program__from_compiler.GetSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program__from_compiler.SingleThreaded((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
        const __gotots_range_0 = files;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_0;
            const __gotots_receiver_0 = wg;
            const __gotots_argument_0 = (): void => {
                let version = snapshot.$go$private$incremental$computeHash((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Text(file));
                let impliedNodeFormat = Program__from_compiler.GetSourceFileMetaData((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, SourceFile__from_ast.Path(file)).ImpliedNodeFormat;
                let affectsGlobalScope = fileAffectsGlobalScope(file);
                let signature = "";
                let newReferences: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = getReferencedFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, file);
                if (!(newReferences === undefined)) {
                    const __gotots_store_4 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    referenceMap.$go$private$incremental$storeReferences(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "referencedMap"), SourceFile__from_ast.Path(file), newReferences);
                }
                if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram === undefined)) {
                    {
                        const __gotots_store_5 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                        const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "fileInfos"), SourceFile__from_ast.Path(file));
                        let oldFileInfo: {
                            value: FileInfo;
                        } | undefined = __gotots_results_0[0];
                        let ok = __gotots_results_0[1];
                        if (ok) {
                            signature = (oldFileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature;
                            if ((oldFileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.version !== version || (oldFileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.affectsGlobalScope !== affectsGlobalScope || !((oldFileInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.impliedNodeFormat === impliedNodeFormat)) {
                                snapshot.$go$private$incremental$addFileToChangeSet((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Path(file));
                            }
                            else {
                                const __gotots_store_6 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                const __gotots_results_1 = referenceMap.$go$private$incremental$getReferences(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "referencedMap"), SourceFile__from_ast.Path(file));
                                let oldReferences: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = __gotots_results_1[0];
                                if (!Set$Equals$Named_tspath$Path(newReferences, oldReferences)) {
                                    snapshot.$go$private$incremental$addFileToChangeSet((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Path(file));
                                }
                                else if (!(newReferences === undefined)) {
                                    const __gotots_range_1 = Set$Keys$Named_tspath$Path(newReferences);
                                    const __gotots_range_keys_0 = __gotots_range_1.keys();
                                    for (const __gotots_range_value_1 of __gotots_range_keys_0) {
                                        const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
                                        if (!__gotots_range_value_2[1]) {
                                            continue;
                                        }
                                        const __gotots_range_value_3 = __gotots_range_value_1;
                                        let refPath = __gotots_range_value_3;
                                        if (Program__from_compiler.GetSourceFileByPath((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, refPath) === undefined) {
                                            {
                                                const __gotots_store_7 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                                const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "fileInfos"), refPath);
                                                let ok__shadow_1 = __gotots_results_2[1];
                                                if (ok__shadow_1) {
                                                    snapshot.$go$private$incremental$addFileToChangeSet((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Path(file));
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            snapshot.$go$private$incremental$addFileToChangeSet((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Path(file));
                        }
                    }
                    const __gotots_store_8 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    if (!SyncSet$Has$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "changedFilesSet"), SourceFile__from_ast.Path(file))) {
                        {
                            const __gotots_store_9 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                            const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "emitDiagnosticsPerFile"), SourceFile__from_ast.Path(file));
                            let emitDiagnostics: {
                                value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
                            } | undefined = __gotots_results_3[0];
                            let ok = __gotots_results_3[1];
                            if (ok) {
                                const __gotots_store_10 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "emitDiagnosticsPerFile"), SourceFile__from_ast.Path(file), repopulateDiagnosticsOfFile(emitDiagnostics, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, file));
                            }
                        }
                        if (canCopySemanticDiagnostics) {
                            if ((!((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile || copyDeclarationFileDiagnostics) && (!Program__from_compiler.IsSourceFileDefaultLibrary((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, SourceFile__from_ast.Path(file)) || copyLibFileDiagnostics)) {
                                {
                                    const __gotots_store_11 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                    const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file));
                                    let diagnostics: {
                                        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
                                    } | undefined = __gotots_results_4[0];
                                    let ok = __gotots_results_4[1];
                                    if (ok) {
                                        const __gotots_store_12 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                        SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file), repopulateDiagnosticsOfFile(diagnostics, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, file));
                                    }
                                }
                            }
                        }
                    }
                    if (canCopyEmitSignatures) {
                        {
                            const __gotots_store_13 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                            const __gotots_results_5 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "emitSignatures"), SourceFile__from_ast.Path(file));
                            let oldEmitSignature: {
                                value: emitSignature;
                            } | undefined = __gotots_results_5[0];
                            let ok = __gotots_results_5[1];
                            if (ok) {
                                const __gotots_store_14 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "emitSignatures"), SourceFile__from_ast.Path(file), emitSignature.$go$private$incremental$getNewEmitSignature(oldEmitSignature, ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options, (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options));
                            }
                        }
                    }
                }
                else {
                    snapshot.$go$private$incremental$addFileToAffectedFilesPendingEmit((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Path(file), GetFileEmitKind((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options));
                    signature = version;
                }
                const __gotots_store_15 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "fileInfos"), SourceFile__from_ast.Path(file), { value: new FileInfo(version, signature, affectsGlobalScope, impliedNodeFormat) });
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_0).Queue(__gotots_argument_0);
        }
        const __gotots_receiver_1 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_1).RunAndWait();
    }
    static $go$private$incremental$handleFileDelete(t: toProgramSnapshot | undefined): void {
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram === undefined)) {
            const __gotots_store_16 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "fileInfos"), (filePath: Path__from_tspath, oldInfo: {
                value: FileInfo;
            } | undefined): bool => {
                {
                    const __gotots_store_17 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    const __gotots_results_6 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "fileInfos"), filePath);
                    let ok = __gotots_results_6[1];
                    if (!ok) {
                        if ((oldInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.affectsGlobalScope) {
                            const __gotots_range_2 = snapshot.$go$private$incremental$getAllFilesExcludingDefaultLibraryFile((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, void 0);
                            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
                                const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_1);
                                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_4;
                                snapshot.$go$private$incremental$addFileToChangeSet((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Path(file));
                            }
                            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).globalFileRemoved = true;
                        }
                        else {
                            atomic__from_gostdlib.Bool.Store((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
                        }
                        return false;
                    }
                }
                return true;
            });
        }
    }
    static $go$private$incremental$handlePendingCheck(t: toProgramSnapshot | undefined): void {
        let __gotots_logical_result_0 = !((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram === undefined);
        if (__gotots_logical_result_0) {
            const __gotots_store_19 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_binary_operand_0 = SyncMap__from_collections.Size<Path__from_tspath, {
                value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
            } | undefined>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "semanticDiagnosticsPerFile"));
            const __gotots_binary_operand_1 = Program__from_compiler.GetSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program).length;
            __gotots_logical_result_0 = __gotots_binary_operand_0 !== __gotots_binary_operand_1;
        }
        if (__gotots_logical_result_0 && ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.checkPending !== (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.checkPending) {
            atomic__from_gostdlib.Bool.Store((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
        }
    }
    static $go$private$incremental$handlePendingEmit(t: toProgramSnapshot | undefined): void {
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram === undefined) && !(t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).globalFileRemoved) {
            let pendingEmitKind = 0;
            if (CompilerOptionsAffectEmit__from_tsoptions(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options, (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options)) {
                pendingEmitKind = GetFileEmitKind((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options);
            }
            else {
                pendingEmitKind = getPendingEmitKindWithOptions((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options, ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options);
            }
            if (!(pendingEmitKind === FileEmitKindNone$constant())) {
                const __gotots_range_3 = Program__from_compiler.GetSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                    const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_2);
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_5;
                    const __gotots_store_18 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                    if (!SyncSet$Has$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "changedFilesSet"), SourceFile__from_ast.Path(file))) {
                        snapshot.$go$private$incremental$addFileToAffectedFilesPendingEmit((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot, SourceFile__from_ast.Path(file), pendingEmitKind);
                    }
                }
                atomic__from_gostdlib.Bool.Store((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, true);
            }
        }
    }
    static $go$private$incremental$reuseFromOldProgram(t: toProgramSnapshot | undefined): void {
        if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram === undefined)) {
            if (Tristate_IsTrue__from_core(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite)) {
                (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.latestChangedDtsFile = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.latestChangedDtsFile;
            }
            const __gotots_store_0 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            SyncSet$Range$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "changedFilesSet"), (key: Path__from_tspath): bool => {
                const __gotots_store_1 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                SyncSet$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "changedFilesSet"), key);
                return true;
            });
            const __gotots_store_2 = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            SyncMap$Range$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "affectedFilesPendingEmit"), (key: Path__from_tspath, emitKind: FileEmitKind): bool => {
                const __gotots_store_3 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "affectedFilesPendingEmit"), key, emitKind);
                return true;
            });
            atomic__from_gostdlib.Bool.Store((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, atomic__from_gostdlib.Bool.Load(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending));
            (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrorsFromOldState = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrors;
            (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrorsFromOldState = ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).oldProgram ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrors;
        }
        else {
            atomic__from_gostdlib.Bool.Store((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.buildInfoEmitPending, CompilerOptions__from_core.IsIncremental((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options));
        }
    }
}
export function fileAffectsGlobalScope(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    BindSourceFile__from_binder(file);
    if (Some$PointerTo_Named_ast$Node(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations, (augmentation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return IsGlobalScopeAugmentation__from_ast(Node__from_ast.$storageOf(((augmentation ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    })) {
        return true;
    }
    if (IsExternalOrCommonJSModule__from_ast(file) || IsJsonSourceFile__from_ast(file)) {
        return false;
    }
    return !(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements === undefined) && !NodeList__from_ast.$storageOf(((((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.isNil() && Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !IsModuleWithStringLiteralName__from_ast(stmt);
    });
}
export function addReferencedFilesFromSymbol(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, referencedFiles: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): void {
    if (__go_symbol === undefined) {
        return;
    }
    const __gotots_range_9 = Symbol__from_ast.$storageOf(((__go_symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
        const __gotots_range_value_13 = __gotots_range_9.get(__gotots_range_index_7);
        let declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_13;
        let fileOfDecl: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfNode__from_ast(declaration);
        if (fileOfDecl === undefined) {
            continue;
        }
        if (!tsonicTypeScriptRuntime.sameLocation(file, fileOfDecl)) {
            Set$Add$Named_tspath$Path(referencedFiles, SourceFile__from_ast.Path(fileOfDecl));
        }
    }
}
export function addReferencedFilesFromImportLiteral(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, referencedFiles: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, checker__shadow_1: {
    value: Checker__from_checker;
} | undefined, importName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    let __go_symbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = Checker__from_checker.GetSymbolAtLocation(checker__shadow_1, importName);
    addReferencedFilesFromSymbol(file, referencedFiles, __go_symbol);
}
export function addReferencedFileFromFileName(program: {
    value: Program__from_compiler;
} | undefined, fileName: gostring, referencedFiles: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, sourceFileDirectory: gostring): void {
    {
        let redirect = Program__from_compiler.GetParseFileRedirect(program, fileName);
        if (redirect !== "") {
            Set$Add$Named_tspath$Path(referencedFiles, ToPath__from_tspath(redirect, Program__from_compiler.GetCurrentDirectory(program), Program__from_compiler.UseCaseSensitiveFileNames(program)));
        }
        else {
            Set$Add$Named_tspath$Path(referencedFiles, ToPath__from_tspath(fileName, sourceFileDirectory, Program__from_compiler.UseCaseSensitiveFileNames(program)));
        }
    }
}
export function getReferencedFiles(program: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                let referencedFiles = Set__from_collections.$fromStorage<Path__from_tspath>({
                    M: GoMap.nil()
                });
                const referencedFiles$location = tsonicTypeScriptRuntime.boundLocation({}, () => referencedFiles, referencedFiles$next => referencedFiles = referencedFiles$next);
                const __gotots_results_7 = Program__from_compiler.GetTypeCheckerForFileExclusive(program, GoProviderInterfaceBridge.$from(context__from_gostdlib.TODO()), file);
                let checker__shadow_1: {
                    value: Checker__from_checker;
                } | undefined = __gotots_results_7[0];
                let done: (() => void) | undefined = __gotots_results_7[1];
                const __gotots_callee_0: (() => void) | undefined = done;
                const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                };
                const __gotots_range_4 = SourceFile__from_ast.Imports(file);
                for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
                    const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_3);
                    let importName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                    addReferencedFilesFromImportLiteral(file, referencedFiles$location, checker__shadow_1, importName);
                }
                let sourceFileDirectory = GetDirectoryPath__from_tspath(SourceFile__from_ast.FileName(file));
                const __gotots_range_5 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles;
                for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
                    const __gotots_range_value_7 = __gotots_range_5.get(__gotots_range_index_4);
                    let referencedFile: {
                        value: FileReference__from_ast;
                    } | undefined = __gotots_range_value_7;
                    addReferencedFileFromFileName(program, (referencedFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName, referencedFiles$location, sourceFileDirectory);
                }
                {
                    const __gotots_results_8 = Program__from_compiler.GetResolvedTypeReferenceDirectives(program).lookupOk(SourceFile__from_ast.Path(file));
                    let typeRefsInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined> = __gotots_results_8[0];
                    let ok = __gotots_results_8[1];
                    if (ok) {
                        const __gotots_range_6 = typeRefsInFile.$value;
                        const __gotots_range_keys_1 = __gotots_range_6.keys();
                        for (const __gotots_range_value_8 of __gotots_range_keys_1) {
                            const __gotots_range_value_9 = __gotots_range_6.lookupOk(__gotots_range_value_8);
                            if (!__gotots_range_value_9[1]) {
                                continue;
                            }
                            const __gotots_range_value_10 = __gotots_range_value_9[0];
                            let typeRef: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined = __gotots_range_value_10;
                            if (((typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolvedFileName !== "") {
                                addReferencedFileFromFileName(program, ((typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolvedFileName, referencedFiles$location, sourceFileDirectory);
                            }
                        }
                    }
                }
                const __gotots_range_7 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations;
                for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_7.length; __gotots_range_index_5++) {
                    const __gotots_range_value_11 = __gotots_range_7.get(__gotots_range_index_5);
                    let moduleName: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_11;
                    if (!IsStringLiteral__from_ast(moduleName)) {
                        continue;
                    }
                    addReferencedFilesFromImportLiteral(file, referencedFiles$location, checker__shadow_1, moduleName);
                }
                const __gotots_range_8 = Checker__from_checker.GetAmbientModules(checker__shadow_1);
                for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
                    const __gotots_range_value_12 = __gotots_range_8.get(__gotots_range_index_6);
                    let ambientModule: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_range_value_12;
                    addReferencedFilesFromSymbol(file, referencedFiles$location, ambientModule);
                }
                __gotots_return_0 = IfElse$PointerTo_Named_collections$SetOf_Named_tspath$Path(Set$Len$Named_tspath$Path(referencedFiles$location) > 0, referencedFiles$location, void 0);
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
export function repopulateDiagnosticsOfFile(diags: {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
} | undefined, p: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): {
    value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
} | undefined {
    if (!(diags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics.isNil()) {
        let repopulated = repopulateDiagnosticsList((diags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics, p, file);
        if (repopulated.isNil()) {
            return diags;
        }
        return { value: new DiagnosticsOrBuildInfoDiagnosticsWithFileName(repopulated, RuntimeSlice.nil<{
                value: buildInfoDiagnosticWithFileName;
            } | undefined>()) };
    }
    return diags;
}
export function repopulateDiagnosticsList(diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, p: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    let changed = false;
    let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags.length, null, void 0);
    const __gotots_range_10 = diags;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_10.length; __gotots_range_index_8++) {
        const __gotots_range_value_14 = __gotots_range_index_8;
        const __gotots_range_value_15 = __gotots_range_10.get(__gotots_range_index_8);
        let i = __gotots_range_value_14;
        let d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_15;
        let repopulated = repopulateDiagnosticMessageChain(Diagnostic__from_ast.MessageChain(d), p, file);
        if (!repopulated.isNil()) {
            let clone: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = Diagnostic__from_ast.Clone(d);
            Diagnostic__from_ast.SetMessageChain(clone, repopulated);
            result.set(i, clone);
            changed = true;
        }
        else {
            result.set(i, d);
        }
    }
    if (!changed) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    return result;
}
export function repopulateDiagnosticMessageChain(chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, p: {
    value: Program__from_compiler;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (chain.length === 0) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    let changed = false;
    let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(chain.length, null, void 0);
    const __gotots_range_11 = chain;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_11.length; __gotots_range_index_9++) {
        const __gotots_range_value_16 = __gotots_range_index_9;
        const __gotots_range_value_17 = __gotots_range_11.get(__gotots_range_index_9);
        let i = __gotots_range_value_16;
        let c: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_17;
        if (!(Diagnostic__from_ast.RepopulateInfo(c) === undefined)) {
            let b: {
                value: buildInfoDiagnosticWithFileName;
            } | undefined = { value: new buildInfoDiagnosticWithFileName(new Path__from_tspath(""), false, Diagnostic__from_ast.Pos(c), Diagnostic__from_ast.End(c), Diagnostic__from_ast.Code(c), Diagnostic__from_ast.Category(c), Diagnostic__from_ast.MessageKey(c), Diagnostic__from_ast.MessageArgs(c), RuntimeSlice.nil<{
                    value: buildInfoDiagnosticWithFileName;
                } | undefined>(), RuntimeSlice.nil<{
                    value: buildInfoDiagnosticWithFileName;
                } | undefined>(), false, false, false, Diagnostic__from_ast.RepopulateInfo(c)) };
            const __gotots_range_12 = Diagnostic__from_ast.MessageChain(c);
            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_12.length; __gotots_range_index_10++) {
                const __gotots_range_value_18 = __gotots_range_12.get(__gotots_range_index_10);
                let nested: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_18;
                (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain.append(void 0, [astDiagToBuildInfoDiag(nested)]);
            }
            result.set(i, repopulateDiagnosticChain(b, p, file));
            changed = true;
        }
        else {
            let nested = repopulateDiagnosticMessageChain(Diagnostic__from_ast.MessageChain(c), p, file);
            if (!nested.isNil()) {
                let clone: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = Diagnostic__from_ast.Clone(c);
                Diagnostic__from_ast.SetMessageChain(clone, nested);
                result.set(i, clone);
                changed = true;
            }
            else {
                result.set(i, c);
            }
        }
    }
    if (!changed) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    return result;
}
export function astDiagToBuildInfoDiag(d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): {
    value: buildInfoDiagnosticWithFileName;
} | undefined {
    let b: {
        value: buildInfoDiagnosticWithFileName;
    } | undefined = { value: new buildInfoDiagnosticWithFileName(new Path__from_tspath(""), false, Diagnostic__from_ast.Pos(d), Diagnostic__from_ast.End(d), Diagnostic__from_ast.Code(d), Diagnostic__from_ast.Category(d), Diagnostic__from_ast.MessageKey(d), Diagnostic__from_ast.MessageArgs(d), RuntimeSlice.nil<{
            value: buildInfoDiagnosticWithFileName;
        } | undefined>(), RuntimeSlice.nil<{
            value: buildInfoDiagnosticWithFileName;
        } | undefined>(), false, false, false, Diagnostic__from_ast.RepopulateInfo(d)) };
    const __gotots_range_13 = Diagnostic__from_ast.MessageChain(d);
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_13.length; __gotots_range_index_11++) {
        const __gotots_range_value_19 = __gotots_range_13.get(__gotots_range_index_11);
        let nested: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_19;
        (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain = (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain.append(void 0, [astDiagToBuildInfoDiag(nested)]);
    }
    return b;
}
