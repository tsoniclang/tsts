import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RepopulateDiagnosticInfo as RepopulateDiagnosticInfo__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Set as Set__from_collections, SyncMap as SyncMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { LibFile as LibFile__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { BuildInfoFileInfo } from "./buildInfo.js";
import type { DiagnosticsOrBuildInfoDiagnosticsWithFileName, FileEmitKind, FileInfo, buildInfoDiagnosticWithFileName, emitSignature, snapshot } from "./snapshot.js";
import type * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { Diagnostic as Diagnostic__from_ast, IsJsonSourceFile as IsJsonSourceFile__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { Program as Program__from_compiler } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/package.js";
import { CompilerOptions as CompilerOptions__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, Version as Version__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { CommandLineOptionKind as CommandLineOptionKind__from_tsoptions, CommandLineOption as CommandLineOption__from_tsoptions, ForEachCompilerOptionValue as ForEachCompilerOptionValue__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ComparePathsOptions as ComparePathsOptions__from_tspath, EnsurePathIsNonModuleName as EnsurePathIsNonModuleName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, Path as Path__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { OrderedMap$Set$string$Interface_void } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Set.js";
import { Set$Keys$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { SyncMap$Keys$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Keys$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Keys.js";
import { SyncMap$Load$Named_tspath$Path$Named_incremental$FileEmitKind, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo, SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncSet$Has$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Has.js";
import { SyncSet$Keys$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Keys.js";
import { IfElse$Named_incremental$FileEmitKind } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$Named_incremental$BuildInfoFileId$string, Map$Named_tspath$Path$Named_incremental$BuildInfoFileId, Map$Named_tspath$Path$PointerTo_Named_incremental$BuildInfoDiagnosticsOfFile, Map$Named_tspath$Path$PointerTo_Named_incremental$BuildInfoReferenceMapEntry, Map$PointerTo_Named_ast$Diagnostic$PointerTo_Named_incremental$BuildInfoDiagnostic, Map$PointerTo_Named_ast$SourceFile$PointerTo_Named_incremental$BuildInfoFileInfo, Map$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName$PointerTo_Named_incremental$BuildInfoDiagnostic, Map$string$PointerTo_Named_incremental$BuildInfoRoot, Map$string$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void, Keys$MapOf_PointerTo_Named_ast$SourceFile_To_Named_tspath$Path$PointerTo_Named_ast$SourceFile$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/maps/Keys.js";
import { Collect$Named_tspath$Path, Collect$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/slices/Collect.js";
import { Sort$SliceOf_Named_incremental$BuildInfoFileId$Named_incremental$BuildInfoFileId, Sort$SliceOf_Named_tspath$Path$Named_tspath$Path } from "../../../../../../../support/generics/concretizations/slices/Sort.js";
import { SortFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile } from "../../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_incremental$BuildInfoFileId as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_Named_tspath$Path, $goMap$MapOf_string_To_Interface_void } from "../../../../../../../support/maps.js";
import { BuildInfo, BuildInfoDiagnostic, BuildInfoDiagnosticsOfFile, BuildInfoEmitSignature, BuildInfoFileId, BuildInfoFileIdListId, BuildInfoFilePendingEmit, BuildInfoReferenceMapEntry, BuildInfoRepopulateInfo, BuildInfoResolvedRoot, BuildInfoRoot, BuildInfoSemanticDiagnostic, newBuildInfoFileInfo } from "./buildInfo.js";
import { referenceMap } from "./referencemap.js";
import { GetFileEmitKind } from "./snapshot.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function snapshotToBuildInfo(snapshot__shadow_1: tsonicTypeScriptRuntime.Location<snapshot> | undefined, program: {
    value: Program__from_compiler;
} | undefined, buildInfoFileName: gostring): tsonicTypeScriptRuntime.Location<BuildInfo> | undefined {
    let buildInfo: tsonicTypeScriptRuntime.Location<BuildInfo> | undefined = tsonicTypeScriptRuntime.location<BuildInfo>(new BuildInfo(Version__from_core(), false, false, RuntimeSlice.nil<{
        value: BuildInfoRoot;
    } | undefined>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
        value: BuildInfoFileInfo;
    } | undefined>(), RuntimeSlice.nil<RuntimeSlice<int>>(), void 0, RuntimeSlice.nil<{
        value: BuildInfoReferenceMapEntry;
    } | undefined>(), RuntimeSlice.nil<{
        value: BuildInfoSemanticDiagnostic;
    } | undefined>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<BuildInfoDiagnosticsOfFile> | undefined>(), RuntimeSlice.nil<int>(), RuntimeSlice.nil<{
        value: BuildInfoFilePendingEmit;
    } | undefined>(), "", RuntimeSlice.nil<{
        value: BuildInfoEmitSignature;
    } | undefined>(), RuntimeSlice.nil<{
        value: BuildInfoResolvedRoot;
    } | undefined>(), false));
    let to: toBuildInfo | undefined = new toBuildInfo(snapshot__shadow_1, program, buildInfo, GetDirectoryPath__from_tspath(buildInfoFileName), new ComparePathsOptions__from_tspath(Program__from_compiler.UseCaseSensitiveFileNames(program), Program__from_compiler.GetCurrentDirectory(program)), GoMap.make<gostring, BuildInfoFileId>(new BuildInfoFileId(0), 0, []), GoMap.make<gostring, BuildInfoFileIdListId>(new BuildInfoFileIdListId(0), 0, []), $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_Named_tspath$Path.make(0, []));
    if (CompilerOptions__from_core.IsIncremental(((snapshot__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options)) {
        toBuildInfo.$go$private$incremental$collectRootFiles(to);
        toBuildInfo.$go$private$incremental$setFileInfoAndEmitSignatures(to);
        toBuildInfo.$go$private$incremental$setRootOfIncrementalProgram(to);
        toBuildInfo.$go$private$incremental$setCompilerOptions(to);
        toBuildInfo.$go$private$incremental$setReferencedMap(to);
        toBuildInfo.$go$private$incremental$setChangeFileSet(to);
        toBuildInfo.$go$private$incremental$setSemanticDiagnostics(to);
        toBuildInfo.$go$private$incremental$setEmitDiagnostics(to);
        toBuildInfo.$go$private$incremental$setAffectedFilesPendingEmit(to);
        if (((snapshot__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.latestChangedDtsFile !== "") {
            ((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.LatestChangedDtsFile = toBuildInfo.$go$private$incremental$relativeToBuildInfo(to, ((snapshot__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.latestChangedDtsFile);
        }
    }
    else {
        toBuildInfo.$go$private$incremental$setRootOfNonIncrementalProgram(to);
    }
    ((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Errors = Tristate_IsTrue__from_core(((snapshot__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasErrors);
    ((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.SemanticErrors = ((snapshot__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.hasSemanticErrors;
    ((buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.CheckPending = ((snapshot__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.checkPending;
    return buildInfo;
}
export class toBuildInfo {
    declare private readonly $goType: void;
    public constructor(public snapshot: tsonicTypeScriptRuntime.Location<snapshot> | undefined, public program: {
        value: Program__from_compiler;
    } | undefined, public buildInfo: tsonicTypeScriptRuntime.Location<BuildInfo> | undefined, public buildInfoDirectory: gostring, public comparePathsOptions: ComparePathsOptions__from_tspath, public fileNameToFileId: GoMapValue<gostring, BuildInfoFileId>, public fileNamesToFileIdListId: GoMapValue<gostring, BuildInfoFileIdListId>, public roots: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, Path__from_tspath>) {
    }
    declare private readonly then?: never;
    static $go$private$incremental$collectRootFiles(t: toBuildInfo | undefined): void {
        const __gotots_range_0 = ParsedCommandLine__from_tsoptions.FileNames(Program__from_compiler.CommandLine((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program));
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let fileName = __gotots_range_value_0;
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
            {
                let redirect = Program__from_compiler.GetParseFileRedirect((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, fileName);
                if (redirect !== "") {
                    file = Program__from_compiler.GetSourceFile((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, redirect);
                }
                else {
                    file = Program__from_compiler.GetSourceFile((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, fileName);
                }
            }
            if (!(file === undefined)) {
                (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).roots.store(file, ToPath__from_tspath(fileName, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).comparePathsOptions.CurrentDirectory, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).comparePathsOptions.UseCaseSensitiveFileNames));
            }
        }
    }
    static $go$private$incremental$relativeToBuildInfo(t: toBuildInfo | undefined, path: gostring): gostring {
        return EnsurePathIsNonModuleName__from_tspath(GetRelativePathFromDirectory__from_tspath((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfoDirectory, path, ComparePathsOptions__from_tspath.$copy((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).comparePathsOptions)));
    }
    static $go$private$incremental$setAffectedFilesPendingEmit(t: toBuildInfo | undefined): void {
        const __gotots_store_9 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_argument_5 = SyncMap$Keys$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "affectedFilesPendingEmit"));
        let files = Collect$Named_tspath$Path(__gotots_argument_5);
        Sort$SliceOf_Named_tspath$Path$Named_tspath$Path(files);
        let fullEmitKind = GetFileEmitKind((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options);
        const __gotots_range_3 = files;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = new Path__from_tspath(__gotots_range_3.get(__gotots_range_index_3));
            let filePath = __gotots_range_value_3;
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program__from_compiler.GetSourceFileByPath((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, filePath);
            if (file === undefined || !Program__from_compiler.SourceFileMayBeEmitted((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, file, false)) {
                continue;
            }
            const __gotots_store_10 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_5 = SyncMap$Load$Named_tspath$Path$Named_incremental$FileEmitKind(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "affectedFilesPendingEmit"), filePath);
            let pendingEmit = __gotots_results_5[0];
            (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.AffectedFilesPendingEmit = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.AffectedFilesPendingEmit.append(void 0, [
                { value: new BuildInfoFilePendingEmit(toBuildInfo.$go$private$incremental$toFileId(t, filePath), IfElse$Named_incremental$FileEmitKind(pendingEmit === fullEmitKind, 0, pendingEmit)) },
            ]);
        }
    }
    static $go$private$incremental$setChangeFileSet(t: toBuildInfo | undefined): void {
        const __gotots_store_4 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_argument_1 = SyncSet$Keys$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "changedFilesSet"));
        let files = Collect$Named_tspath$Path(__gotots_argument_1);
        Sort$SliceOf_Named_tspath$Path$Named_tspath$Path(files);
        const __gotots_argument_2 = files;
        const __gotots_receiver_0 = t;
        const __gotots_argument_3 = ($argument0: Path__from_tspath): BuildInfoFileId => {
            return toBuildInfo.$go$private$incremental$toFileId(__gotots_receiver_0, $argument0);
        };
        (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.ChangeFileSet = Map$Named_tspath$Path$Named_incremental$BuildInfoFileId(__gotots_argument_2, __gotots_argument_3);
    }
    static $go$private$incremental$setCompilerOptions(t: toBuildInfo | undefined): void {
        ForEachCompilerOptionValue__from_tsoptions((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options, (option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined): bool => {
            return CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).AffectsBuildInfo;
        }, (option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, value: reflect__from_gostdlib.Value, i: int): bool => {
            if (value.IsZero()) {
                return false;
            }
            if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Options === undefined) {
                const __gotots_struct_0 = OrderedMap__from_collections.$zero<gostring, GoInterface | undefined>((): GoMapValue<gostring, GoInterface | undefined> => {
                    return $goMap$MapOf_string_To_Interface_void.nil();
                });
                (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Options =
                    tsonicTypeScriptRuntime.location<OrderedMap__from_collections<gostring, GoInterface | undefined>>(__gotots_struct_0);
            }
            OrderedMap$Set$string$Interface_void((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Options, CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Name, toBuildInfo.$go$private$incremental$toRelativeToBuildInfoCompilerOptionValue(t, option, value.Interface()));
            return false;
        });
    }
    static $go$private$incremental$setEmitDiagnostics(t: toBuildInfo | undefined): void {
        const __gotots_store_7 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        const __gotots_argument_4 = SyncMap$Keys$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "emitDiagnosticsPerFile"));
        let files = Collect$Named_tspath$Path(__gotots_argument_4);
        Sort$SliceOf_Named_tspath$Path$Named_tspath$Path(files);
        (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.EmitDiagnosticsPerFile = Map$Named_tspath$Path$PointerTo_Named_incremental$BuildInfoDiagnosticsOfFile(files, (filePath: Path__from_tspath): tsonicTypeScriptRuntime.Location<BuildInfoDiagnosticsOfFile> | undefined => {
            const __gotots_store_8 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "emitDiagnosticsPerFile"), filePath);
            let value: {
                value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
            } | undefined = __gotots_results_4[0];
            return toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsOfFile(t, filePath, value);
        });
    }
    static $go$private$incremental$setFileInfoAndEmitSignatures(t: toBuildInfo | undefined): void {
        (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileInfos = Map$PointerTo_Named_ast$SourceFile$PointerTo_Named_incremental$BuildInfoFileInfo(Program__from_compiler.GetSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program), (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): {
            value: BuildInfoFileInfo;
        } | undefined => {
            const __gotots_store_0 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$FileInfo(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "fileInfos"), SourceFile__from_ast.Path(file));
            let info: {
                value: FileInfo;
            } | undefined = __gotots_results_0[0];
            let fileId = toBuildInfo.$go$private$incremental$toFileId(t, SourceFile__from_ast.Path(file));
            if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames.get(((void BuildInfoFileId,
                fileId.$value - 1) as number)) !== toBuildInfo.$go$private$incremental$relativeToBuildInfo(t, SourceFile__from_ast.Path(file).$value)) {
                {
                    let libFile: {
                        value: LibFile__from_compiler;
                    } | undefined = Program__from_compiler.GetDefaultLibFile((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, SourceFile__from_ast.Path(file));
                    if (libFile === undefined || (libFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Replaced || (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames.get(((void BuildInfoFileId,
                        fileId.$value - 1) as number)) !== (libFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name) {
                        const __gotots_argument_0 = new $goInterfaceAdapter$string(fmt__from_gostdlib.Sprintf("File name at index %d does not match expected relative path or libName: %s != %s", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(new BuildInfoFileId(fileId.$value - 1)), new $goInterfaceAdapter$string((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames.get(((void BuildInfoFileId,
                                fileId.$value - 1) as number))), new $goInterfaceAdapter$string(toBuildInfo.$go$private$incremental$relativeToBuildInfo(t, SourceFile__from_ast.Path(file).$value))])));
                        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                    }
                }
            }
            if (Tristate_IsTrue__from_core(((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value.options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite)) {
                if (!IsJsonSourceFile__from_ast(file) && Program__from_compiler.SourceFileMayBeEmitted((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, file, false)) {
                    {
                        const __gotots_store_1 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                        const __gotots_results_1 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$emitSignature(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "emitSignatures"), SourceFile__from_ast.Path(file));
                        let emitSignature__shadow_1: {
                            value: emitSignature;
                        } | undefined = __gotots_results_1[0];
                        let loaded = __gotots_results_1[1];
                        if (!loaded) {
                            (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.EmitSignatures = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.EmitSignatures.append(void 0, [
                                { value: new BuildInfoEmitSignature(fileId, "", false, false) },
                            ]);
                        }
                        else if ((emitSignature__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature !== (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature) {
                            let incrementalEmitSignature: {
                                value: BuildInfoEmitSignature;
                            } | undefined = { value: new BuildInfoEmitSignature(fileId, "", false, false) };
                            if ((emitSignature__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature !== "") {
                                (incrementalEmitSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Signature = (emitSignature__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature;
                            }
                            else if ((emitSignature__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signatureWithDifferentOptions.get(0) === (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signature) {
                                (incrementalEmitSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersOnlyInDtsMap = true;
                            }
                            else {
                                (incrementalEmitSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Signature = (emitSignature__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.signatureWithDifferentOptions.get(0);
                                (incrementalEmitSignature ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DiffersInOptions = true;
                            }
                            (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.EmitSignatures = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.EmitSignatures.append(void 0, [incrementalEmitSignature]);
                        }
                    }
                }
            }
            return newBuildInfoFileInfo(info);
        });
    }
    static $go$private$incremental$setReferencedMap(t: toBuildInfo | undefined): void {
        const __gotots_store_2 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
        let keys = referenceMap.$go$private$incremental$getPathsWithReferences(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "referencedMap"));
        Sort$SliceOf_Named_tspath$Path$Named_tspath$Path(keys);
        (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.ReferencedMap = Map$Named_tspath$Path$PointerTo_Named_incremental$BuildInfoReferenceMapEntry(keys, (filePath: Path__from_tspath): {
            value: BuildInfoReferenceMapEntry;
        } | undefined => {
            const __gotots_store_3 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_2 = referenceMap.$go$private$incremental$getReferences(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "referencedMap"), filePath);
            let references: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined = __gotots_results_2[0];
            return { value: new BuildInfoReferenceMapEntry(toBuildInfo.$go$private$incremental$toFileId(t, filePath), toBuildInfo.$go$private$incremental$toFileIdListId(t, references)) };
        });
    }
    static $go$private$incremental$setRootOfIncrementalProgram(t: toBuildInfo | undefined): void {
        let keys = Collect$PointerTo_Named_ast$SourceFile(Keys$MapOf_PointerTo_Named_ast$SourceFile_To_Named_tspath$Path$PointerTo_Named_ast$SourceFile$Named_tspath$Path((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).roots));
        SortFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile(keys, (a: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int => {
            return toBuildInfo.$go$private$incremental$toFileId(t, SourceFile__from_ast.Path(a)).$value - toBuildInfo.$go$private$incremental$toFileId(t, SourceFile__from_ast.Path(b)).$value;
        });
        const __gotots_range_1 = keys;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_1;
            let root = toBuildInfo.$go$private$incremental$toFileId(t, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).roots.lookup(file));
            let resolved = toBuildInfo.$go$private$incremental$toFileId(t, SourceFile__from_ast.Path(file));
            if ((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root.isNil()) {
                (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root.append(void 0, [
                    { value: new BuildInfoRoot(resolved, new BuildInfoFileId(0), "") },
                ]);
            }
            else {
                let last: {
                    value: BuildInfoRoot;
                } | undefined = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root.get((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root.length - 1);
                if ((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End.$value ===
                    ((void BuildInfoFileId,
                        resolved.$value - 1) as number)) {
                    (last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End = resolved;
                }
                else if ((last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End.$value ===
                    ((void BuildInfoFileId,
                        0) as number) && (last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Start.$value ===
                    ((void BuildInfoFileId,
                        resolved.$value - 1) as number)) {
                    (last ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.End = resolved;
                }
                else {
                    (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root.append(void 0, [
                        { value: new BuildInfoRoot(resolved, new BuildInfoFileId(0), "") },
                    ]);
                }
            }
            if (!(root.$value === resolved.$value)) {
                (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.ResolvedRoot = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.ResolvedRoot.append(void 0, [
                    { value: new BuildInfoResolvedRoot(resolved, root) },
                ]);
            }
        }
    }
    static $go$private$incremental$setRootOfNonIncrementalProgram(t: toBuildInfo | undefined): void {
        (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.Root = Map$string$PointerTo_Named_incremental$BuildInfoRoot(ParsedCommandLine__from_tsoptions.FileNames(Program__from_compiler.CommandLine((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program)), (fileName: gostring): {
            value: BuildInfoRoot;
        } | undefined => {
            return { value: new BuildInfoRoot(new BuildInfoFileId(0), new BuildInfoFileId(0), toBuildInfo.$go$private$incremental$relativeToBuildInfo(t, ToPath__from_tspath(fileName, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).comparePathsOptions.CurrentDirectory, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).comparePathsOptions.UseCaseSensitiveFileNames).$value)) };
        });
    }
    static $go$private$incremental$setSemanticDiagnostics(t: toBuildInfo | undefined): void {
        const __gotots_range_2 = Program__from_compiler.GetSourceFiles((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program);
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_2;
            const __gotots_store_5 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
            const __gotots_results_3 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_incremental$DiagnosticsOrBuildInfoDiagnosticsWithFileName(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "semanticDiagnosticsPerFile"), SourceFile__from_ast.Path(file));
            let value: {
                value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
            } | undefined = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (!ok) {
                const __gotots_store_6 = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).snapshot ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<snapshot>).value;
                if (!SyncSet$Has$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "changedFilesSet"), SourceFile__from_ast.Path(file))) {
                    (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.SemanticDiagnosticsPerFile = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.SemanticDiagnosticsPerFile.append(void 0, [
                        { value: new BuildInfoSemanticDiagnostic(toBuildInfo.$go$private$incremental$toFileId(t, SourceFile__from_ast.Path(file)), void 0) },
                    ]);
                }
            }
            else {
                let diagnostics: tsonicTypeScriptRuntime.Location<BuildInfoDiagnosticsOfFile> | undefined = toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsOfFile(t, SourceFile__from_ast.Path(file), value);
                if (!(diagnostics === undefined)) {
                    (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.SemanticDiagnosticsPerFile = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.SemanticDiagnosticsPerFile.append(void 0, [
                        { value: new BuildInfoSemanticDiagnostic(new BuildInfoFileId(0), diagnostics) },
                    ]);
                }
            }
        }
    }
    static $go$private$incremental$toBuildInfoDiagnosticsFromDiagnostics(t: toBuildInfo | undefined, filePath: Path__from_tspath, diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<{
        value: BuildInfoDiagnostic;
    } | undefined> {
        return Map$PointerTo_Named_ast$Diagnostic$PointerTo_Named_incremental$BuildInfoDiagnostic(diagnostics, (d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): {
            value: BuildInfoDiagnostic;
        } | undefined => {
            let file = new BuildInfoFileId(0);
            let noFile = false;
            if (Diagnostic__from_ast.File(d) === undefined) {
                noFile = true;
            }
            else if (!(SourceFile__from_ast.Path(Diagnostic__from_ast.File(d)).$value === filePath.$value)) {
                file = toBuildInfo.$go$private$incremental$toFileId(t, SourceFile__from_ast.Path(Diagnostic__from_ast.File(d)));
            }
            return { value: new BuildInfoDiagnostic(file, noFile, Diagnostic__from_ast.Loc(d).Pos(), Diagnostic__from_ast.Loc(d).End(), Diagnostic__from_ast.Code(d), Diagnostic__from_ast.Category(d), Diagnostic__from_ast.MessageKey(d), Diagnostic__from_ast.MessageArgs(d), toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsFromDiagnostics(t, filePath, Diagnostic__from_ast.MessageChain(d)), toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsFromDiagnostics(t, filePath, Diagnostic__from_ast.RelatedInformation(d)), Diagnostic__from_ast.ReportsUnnecessary(d), Diagnostic__from_ast.ReportsDeprecated(d), Diagnostic__from_ast.SkippedOnNoEmit(d), toBuildInfoRepopulateInfo(Diagnostic__from_ast.RepopulateInfo(d))) };
        });
    }
    static $go$private$incremental$toBuildInfoDiagnosticsFromFileNameDiagnostics(t: toBuildInfo | undefined, diagnostics: RuntimeSlice<{
        value: buildInfoDiagnosticWithFileName;
    } | undefined>): RuntimeSlice<{
        value: BuildInfoDiagnostic;
    } | undefined> {
        return Map$PointerTo_Named_incremental$buildInfoDiagnosticWithFileName$PointerTo_Named_incremental$BuildInfoDiagnostic(diagnostics, (d: {
            value: buildInfoDiagnosticWithFileName;
        } | undefined): {
            value: BuildInfoDiagnostic;
        } | undefined => {
            let file = new BuildInfoFileId(0);
            if (!((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file.$value ===
                ((void Path__from_tspath,
                    "") as string))) {
                file = toBuildInfo.$go$private$incremental$toFileId(t, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file);
            }
            return { value: new BuildInfoDiagnostic(file, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.noFile, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.pos, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.end, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.code, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.category, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageKey, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageArgs, toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsFromFileNameDiagnostics(t, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.messageChain), toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsFromFileNameDiagnostics(t, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.relatedInformation), (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsUnnecessary, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.reportsDeprecated, (d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.skippedOnNoEmit, toBuildInfoRepopulateInfo((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.repopulateInfo)) };
        });
    }
    static $go$private$incremental$toBuildInfoDiagnosticsOfFile(t: toBuildInfo | undefined, filePath: Path__from_tspath, diags: {
        value: DiagnosticsOrBuildInfoDiagnosticsWithFileName;
    } | undefined): tsonicTypeScriptRuntime.Location<BuildInfoDiagnosticsOfFile> | undefined {
        if ((diags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics.length > 0) {
            return tsonicTypeScriptRuntime.location<BuildInfoDiagnosticsOfFile>(new BuildInfoDiagnosticsOfFile(toBuildInfo.$go$private$incremental$toFileId(t, filePath), toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsFromDiagnostics(t, filePath, (diags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.diagnostics)));
        }
        if ((diags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoDiagnostics.length > 0) {
            return tsonicTypeScriptRuntime.location<BuildInfoDiagnosticsOfFile>(new BuildInfoDiagnosticsOfFile(toBuildInfo.$go$private$incremental$toFileId(t, filePath), toBuildInfo.$go$private$incremental$toBuildInfoDiagnosticsFromFileNameDiagnostics(t, (diags ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.buildInfoDiagnostics)));
        }
        return void 0;
    }
    static $go$private$incremental$toFileId(t: toBuildInfo | undefined, path: Path__from_tspath): BuildInfoFileId {
        let fileId = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNameToFileId.lookup(path.$value);
        if (fileId.$value ===
            ((void BuildInfoFileId,
                0) as number)) {
            {
                let libFile: {
                    value: LibFile__from_compiler;
                } | undefined = Program__from_compiler.GetDefaultLibFile((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).program, path);
                if (!(libFile === undefined) && !(libFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Replaced) {
                    (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames.append("", [(libFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Name]);
                }
                else {
                    (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames.append("", [toBuildInfo.$go$private$incremental$relativeToBuildInfo(t, path.$value)]);
                }
            }
            fileId = new BuildInfoFileId((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileNames.length);
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNameToFileId.store(path.$value, fileId);
        }
        return fileId;
    }
    static $go$private$incremental$toFileIdListId(t: toBuildInfo | undefined, __go_set: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): BuildInfoFileIdListId {
        const __gotots_argument_8 = Collect$Named_tspath$Path(Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void(Set$Keys$Named_tspath$Path(__go_set)));
        const __gotots_receiver_2 = t;
        const __gotots_argument_9 = ($argument0: Path__from_tspath): BuildInfoFileId => {
            return toBuildInfo.$go$private$incremental$toFileId(__gotots_receiver_2, $argument0);
        };
        let fileIds = Map$Named_tspath$Path$Named_incremental$BuildInfoFileId(__gotots_argument_8, __gotots_argument_9);
        Sort$SliceOf_Named_incremental$BuildInfoFileId$Named_incremental$BuildInfoFileId(fileIds);
        let key = strings__from_gostdlib.Join(Map$Named_incremental$BuildInfoFileId$string(fileIds, (id: BuildInfoFileId): gostring => {
            return fmt__from_gostdlib.Sprintf("%d", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(id)]));
        }), ",");
        let fileIdListId = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNamesToFileIdListId.lookup(key);
        if (fileIdListId.$value ===
            ((void BuildInfoFileIdListId,
                0) as number)) {
            (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileIdsList = (((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileIdsList.append(RuntimeSlice.nil<int>(), [fileIds]);
            fileIdListId = new BuildInfoFileIdListId((((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).buildInfo ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BuildInfo>).value.FileIdsList.length);
            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileNamesToFileIdListId.store(key, fileIdListId);
        }
        return fileIdListId;
    }
    static $go$private$incremental$toRelativeToBuildInfoCompilerOptionValue(t: toBuildInfo | undefined, option: tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined, v: GoInterface | undefined): GoInterface | undefined {
        if (((void CommandLineOptionKind__from_tsoptions,
            CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).Kind) as string)
            ===
                ((void CommandLineOptionKind__from_tsoptions,
                    "list") as string)) {
            if (CommandLineOption__from_tsoptions.$storageOf(((CommandLineOption__from_tsoptions.Elements(option) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).IsFilePath) {
                {
                    const __gotots_results_6 = (($value: GoInterface | undefined): [
                        RuntimeSlice<gostring>,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$SliceOf_string.$is($value)) {
                            return [RuntimeSlice.nil<gostring>(), false];
                        }
                        return [$value.$go$value, true];
                    })(v);
                    let arr = __gotots_results_6[0];
                    let ok = __gotots_results_6[1];
                    if (ok) {
                        const __gotots_argument_6 = arr;
                        const __gotots_receiver_1 = t;
                        const __gotots_argument_7 = ($argument0: gostring): gostring => {
                            return toBuildInfo.$go$private$incremental$relativeToBuildInfo(__gotots_receiver_1, $argument0);
                        };
                        return new $goInterfaceAdapter$SliceOf_string(Map$string$string(__gotots_argument_6, __gotots_argument_7));
                    }
                }
            }
        }
        else if (CommandLineOption__from_tsoptions.$storageOf(((option ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions>).value).IsFilePath) {
            {
                const __gotots_results_7 = (($value: GoInterface | undefined): [
                    gostring,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$string.$is($value)) {
                        return ["", false];
                    }
                    return [$value.$go$value, true];
                })(v);
                let str = __gotots_results_7[0];
                let ok = __gotots_results_7[1];
                if (ok && str !== "") {
                    return new $goInterfaceAdapter$string(toBuildInfo.$go$private$incremental$relativeToBuildInfo(t, (($value: GoInterface | undefined): gostring => {
                        if (!$goInterfaceAdapter$string.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(v)));
                }
            }
        }
        return v;
    }
}
export function toBuildInfoRepopulateInfo(info: {
    value: RepopulateDiagnosticInfo__from_ast;
} | undefined): {
    value: BuildInfoRepopulateInfo;
} | undefined {
    if (info === undefined) {
        return void 0;
    }
    return { value: new BuildInfoRepopulateInfo((info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Kind, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Mode, (info ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageName) };
}
