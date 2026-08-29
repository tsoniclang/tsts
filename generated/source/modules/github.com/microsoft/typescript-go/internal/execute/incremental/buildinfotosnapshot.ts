import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { CompilerHost as CompilerHost__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { BuildInfoDiagnostic, BuildInfoDiagnosticsOfFile, BuildInfoFilePendingEmit, BuildInfoReferenceMapEntry, BuildInfoRepopulateInfo, BuildInfoSemanticDiagnostic } from "./buildInfo.js";
import type { FileEmitKind, FileInfo } from "./snapshot.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { RepopulateDiagnosticInfo as RepopulateDiagnosticInfo__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { CombinePaths as CombinePaths__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { NewSetWithSizeHint$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/NewSetWithSizeHint.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$emitSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Delete.js";
import { SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$FileInfo } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Range.js";
import { SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$FileInfo, SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Store.js";
import { SyncSet$Add$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Add.js";
import { SyncSet$Has$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Has.js";
import { IfElse$Named_core$Tristate, IfElse$Named_incremental$FileEmitKind } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_incremental$BuildInfoDiagnostic$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName, Map$SliceOf_Named_incremental$BuildInfoFileId$PointerTo_Named_collections$SetOf_Named_tspath$Path, Map$string$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { BuildInfo, BuildInfoEmitSignature, BuildInfoFileId, BuildInfoFileIdListId, BuildInfoFileInfo } from "./buildInfo.js";
import { referenceMap } from "./referencemap.js";
import { DiagnosticsOrBuildInfoDiagnosticsWithFileName, GetFileEmitKind, buildInfoDiagnosticWithFileName, emitSignature, snapshot } from "./snapshot.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function buildInfoToSnapshot(buildInfo: BuildInfo | undefined, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, host__shadow_1: CompilerHost__from_compiler | undefined): tsonicTypeScriptRuntime.Location<snapshot> | undefined {
    let to: toSnapshot | undefined = new toSnapshot(buildInfo, GetDirectoryPath__from_tspath(GetNormalizedAbsolutePath__from_tspath(ParsedCommandLine__from_tsoptions.GetBuildInfoFileName(config), ParsedCommandLine__from_tsoptions.GetCurrentDirectory(config))), snapshot.$zero(), RuntimeSlice.make<gostring>(0, (buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames.length, ((void Path__from_tspath,
        "") as string)), RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>(0, (buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileIdsList.length, void 0));
    (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filePaths = Map$string$Named_tspath$Path((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileNames, (fileName: gostring): Path__from_tspath => {
        if (!strings__from_gostdlib.HasPrefix(fileName, ".")) {
            const __gotots_receiver_0 = host__shadow_1;
            const __gotots_argument_0 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_0).DefaultLibraryPath();
            const __gotots_argument_1 = RuntimeSlice.literal<gostring>([fileName]);
            const __gotots_argument_2 = CombinePaths__from_tspath(__gotots_argument_0, __gotots_argument_1);
            const __gotots_receiver_1 = host__shadow_1;
            const __gotots_argument_3 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_1).GetCurrentDirectory();
            const __gotots_receiver_2 = host__shadow_1;
            const __gotots_receiver_3 = goInterfaceNonNil<CompilerHost__from_compiler>(__gotots_receiver_2).FS();
            const __gotots_argument_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).UseCaseSensitiveFileNames();
            return ToPath__from_tspath(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
        }
        return ToPath__from_tspath(fileName, (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfoDirectory, ParsedCommandLine__from_tsoptions.UseCaseSensitiveFileNames(config));
    });
    (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filePathSet = Map$SliceOf_Named_incremental$BuildInfoFileId$PointerTo_Named_collections$SetOf_Named_tspath$Path((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileIdsList, (fileIdList: RuntimeSlice<int>): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined => {
        let fileSet: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = NewSetWithSizeHint$Named_tspath$Path(fileIdList.length);
        const __gotots_range_0 = fileIdList;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = new BuildInfoFileId(__gotots_range_0.get(__gotots_range_index_0));
            let fileId = __gotots_range_value_0;
            Set$Add$Named_tspath$Path(fileSet, toSnapshot.$go$private$incremental$toFilePath(to, fileId));
        }
        return fileSet;
    });
    toSnapshot.$go$private$incremental$setCompilerOptions(to);
    toSnapshot.$go$private$incremental$setFileInfoAndEmitSignatures(to);
    toSnapshot.$go$private$incremental$setReferencedMap(to);
    toSnapshot.$go$private$incremental$setChangeFileSet(to);
    toSnapshot.$go$private$incremental$setSemanticDiagnostics(to);
    toSnapshot.$go$private$incremental$setEmitDiagnostics(to);
    toSnapshot.$go$private$incremental$setAffectedFilesPendingEmit(to);
    if ((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LatestChangedDtsFile !== "") {
        (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot.latestChangedDtsFile = toSnapshot.$go$private$incremental$toAbsolutePath(to, (buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).LatestChangedDtsFile);
    }
    (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot.hasErrors = IfElse$Named_core$Tristate((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Errors, TSTrue$constant__from_core(), TSFalse$constant__from_core());
    (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot.hasSemanticErrors = (buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SemanticErrors;
    (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot.checkPending = (buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CheckPending;
    const __gotots_store_0 = (to ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "snapshot");
}
export class toSnapshot {
    declare private readonly $goType: void;
    public constructor(public buildInfo: BuildInfo | undefined, public buildInfoDirectory: gostring, public snapshot: snapshot, public filePaths: RuntimeSlice<gostring>, public filePathSet: RuntimeSlice<tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$incremental$setAffectedFilesPendingEmit(t: toSnapshot | undefined): void {
        if (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AffectedFilesPendingEmit.length === 0) {
            return;
        }
        let ownOptionsEmitKind = GetFileEmitKind((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot.options);
        const __gotots_range_7 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AffectedFilesPendingEmit;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_8 = __gotots_range_7.get(__gotots_range_index_7);
            let pendingEmit: {
                value: BuildInfoFilePendingEmit;
            } | undefined = __gotots_range_value_8;
            const __gotots_store_14 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
            SyncMap$Store$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "affectedFilesPendingEmit"), toSnapshot.$go$private$incremental$toFilePath(t, (pendingEmit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId), IfElse$Named_incremental$FileEmitKind((pendingEmit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitKind === 0, ownOptionsEmitKind, (pendingEmit ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitKind));
        }
    }
    static $go$private$incremental$setChangeFileSet(t: toSnapshot | undefined): void {
        const __gotots_range_4 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ChangeFileSet;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_5 = new BuildInfoFileId(__gotots_range_4.get(__gotots_range_index_4));
            let fileId = __gotots_range_value_5;
            let filePath = toSnapshot.$go$private$incremental$toFilePath(t, fileId);
            const __gotots_store_7 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
            SyncSet$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "changedFilesSet"), filePath);
        }
    }
    static $go$private$incremental$setCompilerOptions(t: toSnapshot | undefined): void {
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot.options = BuildInfo.GetCompilerOptions((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfoDirectory);
    }
    static $go$private$incremental$setEmitDiagnostics(t: toSnapshot | undefined): void {
        const __gotots_range_6 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitDiagnosticsPerFile;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_7 = __gotots_range_6.get(__gotots_range_index_6);
            let diagnostic: BuildInfoDiagnosticsOfFile | undefined = __gotots_range_value_7;
            let filePath = toSnapshot.$go$private$incremental$toFilePath(t, (diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileId);
            const __gotots_store_13 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
            SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "emitDiagnosticsPerFile"), filePath, toSnapshot.$go$private$incremental$toDiagnosticsOrBuildInfoDiagnosticsWithFileName(t, diagnostic));
        }
    }
    static $go$private$incremental$setFileInfoAndEmitSignatures(t: toSnapshot | undefined): void {
        let isComposite = Tristate_IsTrue__from_core(((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite);
        const __gotots_range_1 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileInfos;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1);
            let index = __gotots_range_value_1;
            let buildInfoFileInfo: {
                value: BuildInfoFileInfo;
            } | undefined = __gotots_range_value_2;
            let path = toSnapshot.$go$private$incremental$toFilePath(t, new BuildInfoFileId(index + 1));
            let info: {
                value: FileInfo;
            } | undefined = BuildInfoFileInfo.GetFileInfo(buildInfoFileInfo);
            const __gotots_store_1 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
            SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "fileInfos"), path, info);
            if ((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature !== "" && isComposite) {
                const __gotots_store_2 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "emitSignatures"), path, { value: new emitSignature((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature, RuntimeSlice.nil<gostring>()) });
            }
        }
        const __gotots_range_2 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).EmitSignatures;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
            let value: {
                value: BuildInfoEmitSignature;
            } | undefined = __gotots_range_value_3;
            if (BuildInfoEmitSignature.$go$private$incremental$noEmitSignature(value)) {
                const __gotots_store_3 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
                SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "emitSignatures"), toSnapshot.$go$private$incremental$toFilePath(t, (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId));
            }
            else {
                let path = toSnapshot.$go$private$incremental$toFilePath(t, (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId);
                const __gotots_store_4 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
                const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "emitSignatures");
                const __gotots_argument_7 = path;
                const __gotots_receiver_4 = value;
                const __gotots_argument_5 = path;
                const __gotots_store_5 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
                const __gotots_argument_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "emitSignatures");
                const __gotots_argument_8 = BuildInfoEmitSignature.$go$private$incremental$toEmitSignature(__gotots_receiver_4, __gotots_argument_5, __gotots_argument_6);
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(__gotots_receiver_5, __gotots_argument_7, __gotots_argument_8);
            }
        }
    }
    static $go$private$incremental$setReferencedMap(t: toSnapshot | undefined): void {
        const __gotots_range_3 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ReferencedMap;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let entry: {
                value: BuildInfoReferenceMapEntry;
            } | undefined = __gotots_range_value_4;
            const __gotots_store_6 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
            referenceMap.$go$private$incremental$storeReferences(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "referencedMap"), toSnapshot.$go$private$incremental$toFilePath(t, (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId), toSnapshot.$go$private$incremental$toFilePathSet(t, (entry ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileIdListId));
        }
    }
    static $go$private$incremental$setSemanticDiagnostics(t: toSnapshot | undefined): void {
        const __gotots_store_8 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
        SyncMap$Range$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "fileInfos"), (path: Path__from_tspath, info: {
            value: FileInfo;
        } | undefined): bool => {
            const __gotots_store_9 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
            if (!SyncSet$Has$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "changedFilesSet"), path)) {
                const __gotots_store_10 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "semanticDiagnosticsPerFile"), path, { value: new DiagnosticsOrBuildInfoDiagnosticsWithFileName(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<{
                        value: buildInfoDiagnosticWithFileName;
                    } | undefined>()) });
            }
            return true;
        });
        const __gotots_range_5 = ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).SemanticDiagnosticsPerFile;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
            let diagnostic: {
                value: BuildInfoSemanticDiagnostic;
            } | undefined = __gotots_range_value_6;
            if (!((diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId.$value ===
                ((void BuildInfoFileId,
                    0) as number))) {
                let filePath = toSnapshot.$go$private$incremental$toFilePath(t, (diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileId);
                const __gotots_store_11 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
                SyncMap$Delete$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "semanticDiagnosticsPerFile"), filePath);
            }
            else {
                let filePath = toSnapshot.$go$private$incremental$toFilePath(t, ((diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Diagnostics ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).FileId);
                const __gotots_store_12 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot;
                SyncMap$Store$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "semanticDiagnosticsPerFile"), filePath, toSnapshot.$go$private$incremental$toDiagnosticsOrBuildInfoDiagnosticsWithFileName(t, (diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Diagnostics));
            }
        }
    }
    static $go$private$incremental$toAbsolutePath(t: toSnapshot | undefined, path: gostring): gostring {
        return GetNormalizedAbsolutePath__from_tspath(path, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfoDirectory);
    }
    static $go$private$incremental$toBuildInfoDiagnosticsWithFileName(t: toSnapshot | undefined, diagnostics: RuntimeSlice<{
        value: BuildInfoDiagnostic;
    } | undefined>): RuntimeSlice<{
        value: buildInfoDiagnosticWithFileName;
    } | undefined> {
        return Map$PointerTo_Named_incremental$BuildInfoDiagnostic$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName(diagnostics, (d: {
            value: BuildInfoDiagnostic;
        } | undefined): {
            value: buildInfoDiagnosticWithFileName;
        } | undefined => {
            let file = new Path__from_tspath("");
            if (!((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.File.$value ===
                ((void BuildInfoFileId,
                    0) as number))) {
                file = toSnapshot.$go$private$incremental$toFilePath(t, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.File);
            }
            return { value: new buildInfoDiagnosticWithFileName(file, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoFile, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Pos, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Code, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Category, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MessageKey, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MessageArgs, toSnapshot.$go$private$incremental$toBuildInfoDiagnosticsWithFileName(t, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MessageChain), toSnapshot.$go$private$incremental$toBuildInfoDiagnosticsWithFileName(t, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RelatedInformation), (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReportsUnnecessary, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReportsDeprecated, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkippedOnNoEmit, fromBuildInfoRepopulateInfo((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RepopulateInfo)) };
        });
    }
    static $go$private$incremental$toDiagnosticsOrBuildInfoDiagnosticsWithFileName(t: toSnapshot | undefined, dig: BuildInfoDiagnosticsOfFile | undefined): {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined {
        return { value: new DiagnosticsOrBuildInfoDiagnosticsWithFileName(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), toSnapshot.$go$private$incremental$toBuildInfoDiagnosticsWithFileName(t, (dig ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Diagnostics)) };
    }
    static $go$private$incremental$toFilePath(t: toSnapshot | undefined, fileId: BuildInfoFileId): Path__from_tspath {
        return new Path__from_tspath((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filePaths.get(((void BuildInfoFileId,
            fileId.$value - 1) as number)));
    }
    static $go$private$incremental$toFilePathSet(t: toSnapshot | undefined, fileIdListId: BuildInfoFileIdListId): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).filePathSet.get(((void BuildInfoFileIdListId,
            fileIdListId.$value - 1) as number));
    }
}
export function fromBuildInfoRepopulateInfo(info: {
    value: BuildInfoRepopulateInfo;
} | undefined): {
    value: RepopulateDiagnosticInfo__from_ast;
} | undefined {
    if (info === undefined) {
        return void 0;
    }
    return { value: new RepopulateDiagnosticInfo__from_ast((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Mode, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName) };
}
