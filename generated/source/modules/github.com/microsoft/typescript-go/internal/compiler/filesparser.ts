import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, FileReference as FileReference__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { CompilerOptions as CompilerOptions__from_core, WorkGroup as WorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { DiagAndArgs$Storage as DiagAndArgs__from___go_module$Storage, PackageId$Storage as PackageId__from___go_module$Storage, ResolvedModule as ResolvedModule__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { referenceFileLocation } from "./fileInclude.js";
import type { LibFile, jsxRuntimeImportSpecifier, libResolution } from "./fileloader.js";
import type { CompilerHost } from "./host.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { SourceFileMetaData as SourceFileMetaData__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/state.js";
import { ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ResolutionModeCommonJS$constant as ResolutionModeCommonJS$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { DiagAndArgs as DiagAndArgs__from___go_module, ModeAwareCacheKey as ModeAwareCacheKey__from___go_module, ModeAwareCache as ModeAwareCache__from___go_module, PackageId as PackageId__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { PhaseProgram$constant as PhaseProgram$constant__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { GetLibFileName as GetLibFileName__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetNormalizedAbsolutePathWithoutRoot as GetNormalizedAbsolutePathWithoutRoot__from_tspath, HasExtension as HasExtension__from_tspath, HasJSFileExtension as HasJSFileExtension__from_tspath, NormalizePath as NormalizePath__from_tspath, Path as Path__from_tspath, ToFileNameLowerCase as ToFileNameLowerCase__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { MaxInt$int as MaxInt$int__from_math__package_1 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Set$Add$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { SyncMap$Keys$Named_tspath$Path$PointerTo_Named_compiler$libResolution } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Keys.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_compiler$libResolution, SyncMap$Load$Named_tspath$Path$PointerTo_Named_compiler$parseTaskData } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$parseTaskData } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { Flatten$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Flatten.js";
import { IfElse$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Collect$Named_tspath$Path } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { Sort$SliceOf_Named_tspath$Path$Named_tspath$Path } from "../../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason, $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic, $goInterfaceAdapter$PointerTo_Named_compiler$parseTask, $goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_compiler$parseTaskData as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule, $goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective, $goMap$MapOf_Named___go_module$PackageId_To_PointerTo_Named_ast$SourceFile, $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedModule, $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedTypeReferenceDirective, $goMap$MapOf_Named_tspath$Path_To_Named_ast$SourceFileMetaData, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$Node, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$LibFile, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$jsxRuntimeImportSpecifier, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile, $goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_compiler$FileIncludeReason, $goMap$MapOf_Named_tspath$Path_To_SliceOf_string, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_PointerTo_Named_compiler$parseTaskData_To_string, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_PointerTo_Named_compiler$parseTask, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile as GoMap } from "../../../../../../support/maps.js";
import { FileIncludeReason, fileIncludeKind, fileIncludeKindLibReferenceDirective$int, referencedFileData } from "./fileInclude.js";
import { DuplicateSourceFile, fileLoader, processedFiles, redirectsFile } from "./fileloader.js";
import { includeProcessor } from "./includeprocessor.js";
import { includeExplainingDiagnostic, processingDiagnostic, processingDiagnosticKindExplainingFileInclude$constant, processingDiagnosticKindUnknownReference$constant } from "./processingDiagnostic.js";
import { ProgramOptions } from "./program.js";
import { projectReferenceFileMapper } from "./projectreferencefilemapper.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class parseTask {
    declare private readonly $goType: void;
    public constructor(public normalizedFilePath: gostring, public path: Path__from_tspath, public file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public libFile: {
        value: LibFile;
    } | undefined, public redirectedParseTask: {
        value: parseTask;
    } | undefined, public subTasks: RuntimeSlice<{
        value: parseTask;
    } | undefined>, public loaded: bool, public startedSubTasks: bool, public isForAutomaticTypeDirective: bool, public includeReason: {
        value: FileIncludeReason;
    } | undefined, public packageId: PackageId__from___go_module, public metadata: SourceFileMetaData__from_ast, public resolutionsInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>, public resolutionsTrace: RuntimeSlice<DiagAndArgs__from___go_module$Storage>, public typeResolutionsInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>, public typeResolutionsTrace: RuntimeSlice<DiagAndArgs__from___go_module$Storage>, public resolutionDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public processingDiagnostics: RuntimeSlice<{
        value: processingDiagnostic;
    } | undefined>, public importHelpersImportSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public jsxRuntimeImportSpecifier: {
        value: jsxRuntimeImportSpecifier;
    } | undefined, public increaseDepth: bool, public elideOnDepth: bool, public loadedTask: {
        value: parseTask;
    } | undefined, public allIncludeReasons: RuntimeSlice<{
        value: FileIncludeReason;
    } | undefined>) {
    }
    static $copy($source: parseTask): parseTask {
        return new parseTask($source.normalizedFilePath, $source.path, $source.file, $source.libFile, $source.redirectedParseTask, $source.subTasks, $source.loaded, $source.startedSubTasks, $source.isForAutomaticTypeDirective, $source.includeReason, PackageId__from___go_module.$copy($source.packageId), SourceFileMetaData__from_ast.$copy($source.metadata), $source.resolutionsInFile, $source.resolutionsTrace, $source.typeResolutionsInFile, $source.typeResolutionsTrace, $source.resolutionDiagnostics, $source.processingDiagnostics, $source.importHelpersImportSpecifier, $source.jsxRuntimeImportSpecifier, $source.increaseDepth, $source.elideOnDepth, $source.loadedTask, $source.allIncludeReasons);
    }
    declare private readonly then?: never;
    static FileName(t: {
        value: parseTask;
    } | undefined): gostring {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath;
    }
    static Path(t: {
        value: parseTask;
    } | undefined): Path__from_tspath {
        return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path;
    }
    static $go$private$compiler$addSubTask(t: {
        value: parseTask;
    } | undefined, ref: resolvedRef, libFile: {
        value: LibFile;
    } | undefined): void {
        let normalizedFilePath = NormalizePath__from_tspath(resolvedRef.$storageOf(ref).fileName);
        let subTask: {
            value: parseTask;
        } | undefined = { value: new parseTask(normalizedFilePath, new Path__from_tspath(""), void 0, libFile, void 0, RuntimeSlice.nil<{
                value: parseTask;
            } | undefined>(), false, false, false, resolvedRef.$storageOf(ref).includeReason, PackageId__from___go_module.$copy(PackageId__from___go_module.$fromStorage(resolvedRef.$storageOf(ref).packageId)), SourceFileMetaData__from_ast.$zero(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<{
                value: processingDiagnostic;
            } | undefined>(), void 0, void 0, resolvedRef.$storageOf(ref).increaseDepth, resolvedRef.$storageOf(ref).elideOnDepth, void 0, RuntimeSlice.nil<{
                value: FileIncludeReason;
            } | undefined>()) };
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks.append(void 0, [subTask]);
    }
    static $go$private$compiler$load(t: {
        value: parseTask;
    } | undefined, loader: tsonicTypeScriptRuntime.Location<fileLoader> | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loaded = true;
                    if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isForAutomaticTypeDirective) {
                        parseTask.$go$private$compiler$loadAutomaticTypeDirectives(t, loader);
                        break __gotots_return_block_0;
                    }
                    if (!(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing === undefined)) {
                        const __gotots_callee_2: (() => void) | undefined = Tracing__from_tracing.Push(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing, PhaseProgram$constant__from_tracing(), "findSourceFile", $goMap$MapOf_string_To_Interface_void.make(1, [["fileName", new $goInterfaceAdapter$string((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath)]]), false);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_2);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    let redirect = projectReferenceFileMapper.$go$private$compiler$getParseFileRedirect(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.projectReferenceFileMapper, new $goInterfaceAdapter$PointerTo_Named_compiler$parseTask(t));
                    if (redirect !== "") {
                        parseTask.$go$private$compiler$redirect(t, loader, redirect);
                        break __gotots_return_block_0;
                    }
                    if (HasExtension__from_tspath((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath)) {
                        let compilerOptions__shadow_1: {
                            value: CompilerOptions__from_core;
                        } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config);
                        let allowNonTsExtensions = Tristate_IsTrue__from_core((compilerOptions__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowNonTsExtensions);
                        if (!allowNonTsExtensions) {
                            const __gotots_argument_12 = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath;
                            const __gotots_receiver_5 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
                            const __gotots_receiver_6 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_5).FS();
                            const __gotots_argument_13 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).UseCaseSensitiveFileNames();
                            let canonicalFileName = GetCanonicalFileName__from_tspath(__gotots_argument_12, __gotots_argument_13);
                            if (!fileLoader.$go$private$compiler$isSupportedExtension(loader, canonicalFileName)) {
                                if (HasJSFileExtension__from_tspath(canonicalFileName)) {
                                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics.append(void 0, [
                                        { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(new Path__from_tspath(""), (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.includeReason, $state__diagnostics.File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath)])) })) },
                                    ]);
                                }
                                else {
                                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics.append(void 0, [
                                        { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(new Path__from_tspath(""), (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.includeReason, $state__diagnostics.File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath), new $goInterfaceAdapter$string("'" + strings__from_gostdlib.Join(Flatten$string(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.supportedExtensions), "', '") + "'")])) })) },
                                    ]);
                                }
                                break __gotots_return_block_0;
                            }
                        }
                    }
                    atomic__from_gostdlib.Int32.Add(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.totalFileCount, 1);
                    if (!((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.libFile === undefined)) {
                        atomic__from_gostdlib.Int32.Add(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.libFileCount, 1);
                        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadata = new SourceFileMetaData__from_ast("", "", ResolutionModeCommonJS$constant__from_core());
                    }
                    else {
                        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadata = fileLoader.$go$private$compiler$loadSourceFileMetaData(loader, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath);
                    }
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = fileLoader.$go$private$compiler$parseSourceFile(loader, t);
                    if (file === undefined) {
                        break __gotots_return_block_0;
                    }
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file = file;
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks = RuntimeSlice.make<{
                        value: parseTask;
                    } | undefined>(0, ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles.length + SourceFile__from_ast.Imports(file).length + ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations.length, void 0);
                    let compilerOptions: {
                        value: CompilerOptions__from_core;
                    } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config);
                    if (!Tristate_IsTrue__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoResolve)) {
                        const __gotots_range_8 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles;
                        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_8.length; __gotots_range_index_6++) {
                            const __gotots_range_value_13 = __gotots_range_index_6;
                            const __gotots_range_value_14 = __gotots_range_8.get(__gotots_range_index_6);
                            let index = __gotots_range_value_13;
                            let ref: {
                                value: FileReference__from_ast;
                            } | undefined = __gotots_range_value_14;
                            const __gotots_results_8 = fileLoader.$go$private$compiler$resolveTripleslashPathReference(loader, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName, SourceFile__from_ast.FileName(file), index);
                            let resolvedRef__shadow_1: resolvedRef | undefined = __gotots_results_8[0];
                            let processingDiagnostic__shadow_1: {
                                value: processingDiagnostic;
                            } | undefined = __gotots_results_8[1];
                            if (!(processingDiagnostic__shadow_1 === undefined)) {
                                (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics.append(void 0, [processingDiagnostic__shadow_1]);
                                continue;
                            }
                            parseTask.$go$private$compiler$addSubTask(t, resolvedRef.$copy(resolvedRef.$copy((resolvedRef__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")))), void 0);
                        }
                        fileLoader.$go$private$compiler$resolveTypeReferenceDirectives(loader, t);
                    }
                    if (!((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoLib === TSTrue$constant__from_core())) {
                        const __gotots_range_9 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives;
                        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_9.length; __gotots_range_index_7++) {
                            const __gotots_range_value_15 = __gotots_range_index_7;
                            const __gotots_range_value_16 = __gotots_range_9.get(__gotots_range_index_7);
                            let index = __gotots_range_value_15;
                            let lib: {
                                value: FileReference__from_ast;
                            } | undefined = __gotots_range_value_16;
                            let includeReason: {
                                value: FileIncludeReason;
                            } | undefined = { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindLibReferenceDirective$int), new $goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData({ value: new referencedFileData((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, index, void 0) }), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) };
                            {
                                const __gotots_results_9 = GetLibFileName__from_tsoptions((lib ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName);
                                let name = __gotots_results_9[0];
                                let ok = __gotots_results_9[1];
                                if (ok) {
                                    let libFile: {
                                        value: LibFile;
                                    } | undefined = fileLoader.$go$private$compiler$pathForLibFile(loader, name);
                                    parseTask.$go$private$compiler$addSubTask(t, resolvedRef.$fromStorage({
                                        fileName: (libFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path,
                                        includeReason: includeReason,
                                        increaseDepth: false,
                                        elideOnDepth: false,
                                        packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$zero())
                                    }), libFile);
                                }
                                else {
                                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics.append(void 0, [
                                        { value: new processingDiagnostic(processingDiagnosticKindUnknownReference$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason(includeReason)) },
                                    ]);
                                }
                            }
                        }
                    }
                    fileLoader.$go$private$compiler$resolveImportsAndModuleAugmentations(loader, t);
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
    static $go$private$compiler$loadAutomaticTypeDirectives(t: {
        value: parseTask;
    } | undefined, loader: tsonicTypeScriptRuntime.Location<fileLoader> | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (!(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing === undefined)) {
                        const __gotots_callee_2: (() => void) | undefined = Tracing__from_tracing.Push(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing, PhaseProgram$constant__from_tracing(), "processTypeReferences", $goMap$MapOf_string_To_Interface_void.nil(), false);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_2);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    const __gotots_results_10 = fileLoader.$go$private$compiler$resolveAutomaticTypeDirectives(loader, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath);
                    let toParseTypeRefs = __gotots_results_10[0];
                    let typeResolutionsInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined> = __gotots_results_10[1];
                    let typeResolutionsTrace = __gotots_results_10[2];
                    let pDiagnostics = __gotots_results_10[3];
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeResolutionsInFile = typeResolutionsInFile;
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeResolutionsTrace = typeResolutionsTrace;
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = goSliceAppendSlice<{
                        value: processingDiagnostic;
                    } | undefined>((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics, pDiagnostics, void 0);
                    const __gotots_range_10 = toParseTypeRefs;
                    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_10.length; __gotots_range_index_8++) {
                        const __gotots_range_value_17 = resolvedRef.$copy(resolvedRef.$fromStorage(__gotots_range_10.get(__gotots_range_index_8)));
                        let typeResolution = __gotots_range_value_17;
                        parseTask.$go$private$compiler$addSubTask(t, resolvedRef.$copy(typeResolution), void 0);
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
    static $go$private$compiler$redirect(t: {
        value: parseTask;
    } | undefined, loader: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, fileName: gostring): void {
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask =
            { value: new parseTask(NormalizePath__from_tspath(fileName), new Path__from_tspath(""), void 0, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.libFile, void 0, RuntimeSlice.nil<{
                    value: parseTask;
                } | undefined>(), false, false, false, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.includeReason, PackageId__from___go_module.$zero(), SourceFileMetaData__from_ast.$zero(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<{
                    value: processingDiagnostic;
                } | undefined>(), void 0, void 0, false, false, void 0, RuntimeSlice.nil<{
                    value: FileIncludeReason;
                } | undefined>()) };
        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks = RuntimeSlice.literal<{
            value: parseTask;
        } | undefined>([(t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask]);
    }
}
export type resolvedRef$Storage = {
    fileName: gostring;
    increaseDepth: bool;
    elideOnDepth: bool;
    includeReason: {
        value: FileIncludeReason;
    } | undefined;
    packageId: PackageId__from___go_module$Storage;
};
export class resolvedRef {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: resolvedRef$Storage) {
    }
    public static $storageOf($source: resolvedRef): resolvedRef$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: resolvedRef$Storage): resolvedRef {
        return new resolvedRef($source);
    }
    public get fileName(): gostring {
        return this.$storage.fileName;
    }
    public set fileName($value: gostring) {
        this.$storage.fileName = $value;
    }
    public get increaseDepth(): bool {
        return this.$storage.increaseDepth;
    }
    public set increaseDepth($value: bool) {
        this.$storage.increaseDepth = $value;
    }
    public get elideOnDepth(): bool {
        return this.$storage.elideOnDepth;
    }
    public set elideOnDepth($value: bool) {
        this.$storage.elideOnDepth = $value;
    }
    public get includeReason(): {
        value: FileIncludeReason;
    } | undefined {
        return this.$storage.includeReason;
    }
    public set includeReason($value: {
        value: FileIncludeReason;
    } | undefined) {
        this.$storage.includeReason = $value;
    }
    public get packageId(): PackageId__from___go_module {
        return PackageId__from___go_module.$fromStorage(this.$storage.packageId);
    }
    public set packageId($value: PackageId__from___go_module) {
        this.$storage.packageId = PackageId__from___go_module.$storageOf($value);
    }
    static $zero(): resolvedRef {
        return new resolvedRef({
            fileName: "",
            increaseDepth: false,
            elideOnDepth: false,
            includeReason: void 0,
            packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$zero())
        });
    }
    static $copy($source: resolvedRef): resolvedRef {
        return new resolvedRef({
            fileName: $source.$storage.fileName,
            increaseDepth: $source.$storage.increaseDepth,
            elideOnDepth: $source.$storage.elideOnDepth,
            includeReason: $source.$storage.includeReason,
            packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$copy(PackageId__from___go_module.$fromStorage($source.$storage.packageId)))
        });
    }
    declare private readonly then?: never;
}
export class filesParser {
    declare private readonly $goType: void;
    public constructor(public wg: WorkGroup__from_core | undefined, public taskDataByPath: SyncMap__from_collections<Path__from_tspath, {
        value: parseTaskData;
    } | undefined>, public maxDepth: int) {
    }
    static $copy($source: filesParser): filesParser {
        return new filesParser($source.wg, SyncMap__from_collections.$copy<Path__from_tspath, {
            value: parseTaskData;
        } | undefined>($source.taskDataByPath), $source.maxDepth);
    }
    declare private readonly then?: never;
    static $go$private$compiler$addIncludeReason(w: {
        value: filesParser;
    } | undefined, includeProcessor__shadow_1: {
        value: includeProcessor;
    } | undefined, task: {
        value: parseTask;
    } | undefined, reason: {
        value: FileIncludeReason;
    } | undefined): void {
        if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask === undefined)) {
            filesParser.$go$private$compiler$addIncludeReason(w, includeProcessor__shadow_1, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask, reason);
        }
        else if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loaded) {
            {
                const __gotots_results_7 = (includeProcessor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileIncludeReasons.lookupOk((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path);
                let existing = __gotots_results_7[0];
                let ok = __gotots_results_7[1];
                if (ok) {
                    (includeProcessor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileIncludeReasons.store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, existing.append(void 0, [reason]));
                }
                else {
                    (includeProcessor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileIncludeReasons.store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, RuntimeSlice.literal<{
                        value: FileIncludeReason;
                    } | undefined>([reason]));
                }
            }
        }
    }
    static $go$private$compiler$getProcessedFiles(w: {
        value: filesParser;
    } | undefined, loader: tsonicTypeScriptRuntime.Location<fileLoader> | undefined): processedFiles {
        let totalFileCount = atomic__from_gostdlib.Int32.Load(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.totalFileCount);
        let libFileCount = atomic__from_gostdlib.Int32.Load(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.libFileCount);
        let missingFiles = RuntimeSlice.nil<gostring>();
        let duplicateSourceFiles = RuntimeSlice.nil<{
            value: DuplicateSourceFile;
        } | undefined>();
        let files = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(0, totalFileCount - libFileCount, void 0);
        let libFiles = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(0, totalFileCount, void 0);
        let filesByPath: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = GoMap.make(totalFileCount, []);
        let tasksSeenByNameIgnoreCase: GoMapValue<gostring, {
            value: parseTask;
        } | undefined> = $goMap$MapOf_string_To_PointerTo_Named_compiler$parseTask.nil();
        if (((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.comparePathsOptions.UseCaseSensitiveFileNames) {
            tasksSeenByNameIgnoreCase = $goMap$MapOf_string_To_PointerTo_Named_compiler$parseTask.make(totalFileCount, []);
        }
        let includeProcessor__shadow_1: {
            value: includeProcessor;
        } | undefined = { value: new includeProcessor($goMap$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_compiler$FileIncludeReason.make(totalFileCount, []), RuntimeSlice.nil<{
                value: processingDiagnostic;
            } | undefined>(), SyncMap__from_collections.$zero<{
                value: FileIncludeReason;
            } | undefined, {
                value: referenceFileLocation;
            } | undefined>(), SyncMap__from_collections.$zero<{
                value: FileIncludeReason;
            } | undefined, tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>(), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) };
        let outputFileToProjectReferenceSource: GoMapValue<Path__from_tspath, gostring> = $goMap$MapOf_Named_tspath$Path_To_string.nil();
        const __gotots_store_0 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
        if (!ProgramOptions.$go$private$compiler$canUseProjectReferenceSource(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "opts"))) {
            outputFileToProjectReferenceSource = $goMap$MapOf_Named_tspath$Path_To_string.make(totalFileCount, []);
        }
        let resolvedModules: GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> = $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedModule.make(totalFileCount + 1, []);
        let typeResolutionsInFile: GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>> = $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.make(totalFileCount, []);
        let sourceFileMetaDatas: GoMapValue<Path__from_tspath, SourceFileMetaData__from_ast> = $goMap$MapOf_Named_tspath$Path_To_Named_ast$SourceFileMetaData.make(totalFileCount, []);
        let jsxRuntimeImportSpecifiers: GoMapValue<Path__from_tspath, {
            value: jsxRuntimeImportSpecifier;
        } | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$jsxRuntimeImportSpecifier.nil();
        let importHelpersImportSpecifiers: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$Node.nil();
        let sourceFilesFoundSearchingNodeModules = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        });
        const sourceFilesFoundSearchingNodeModules$location = tsonicTypeScriptRuntime.boundLocation({}, () => sourceFilesFoundSearchingNodeModules, sourceFilesFoundSearchingNodeModules$next => sourceFilesFoundSearchingNodeModules = sourceFilesFoundSearchingNodeModules$next);
        let libFilesMap: GoMapValue<Path__from_tspath, {
            value: LibFile;
        } | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$LibFile.make(libFileCount, []);
        let redirectTargetsMap: GoMapValue<Path__from_tspath, RuntimeSlice<gostring>> = $goMap$MapOf_Named_tspath$Path_To_SliceOf_string.nil();
        let redirectFilesByPath: GoMapValue<Path__from_tspath, redirectsFile | undefined> = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile.nil();
        let packageIdToSourceFile: GoMapValue<PackageId__from___go_module, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> = $goMap$MapOf_Named___go_module$PackageId_To_PointerTo_Named_ast$SourceFile.nil();
        if (!Tristate_IsFalse__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeduplicatePackages)) {
            redirectTargetsMap = $goMap$MapOf_Named_tspath$Path_To_SliceOf_string.make(0, []);
            packageIdToSourceFile = $goMap$MapOf_Named___go_module$PackageId_To_PointerTo_Named_ast$SourceFile.make(0, []);
        }
        let collectFiles: (($0: RuntimeSlice<{
            value: parseTask;
        } | undefined>, $1: GoMapValue<{
            value: parseTaskData;
        } | undefined, gostring>) => void) | undefined;
        collectFiles = (tasks: RuntimeSlice<{
            value: parseTask;
        } | undefined>, seen: GoMapValue<{
            value: parseTaskData;
        } | undefined, gostring>): void => {
            const __gotots_range_0 = tasks;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let task: {
                    value: parseTask;
                } | undefined = __gotots_range_value_0;
                let includeReason: {
                    value: FileIncludeReason;
                } | undefined = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.includeReason;
                if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask === undefined && !(task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isForAutomaticTypeDirective) {
                    if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loadedTask === undefined)) {
                        task = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loadedTask;
                    }
                    filesParser.$go$private$compiler$addIncludeReason(w, includeProcessor__shadow_1, task, includeReason);
                }
                const __gotots_store_1 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_results_0 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_compiler$parseTaskData(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "taskDataByPath"), (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path);
                let data: {
                    value: parseTaskData;
                } | undefined = __gotots_results_0[0];
                if (!(task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loaded) {
                    continue;
                }
                {
                    const __gotots_results_1 = seen.lookupOk(data);
                    let checkedName = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (ok) {
                        if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file === undefined) && checkedName !== (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath) {
                            duplicateSourceFiles = duplicateSourceFiles.append(void 0, [
                                { value: new DuplicateSourceFile(SourceFile__from_ast.ParseOptions((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file), Uint128__from_xxh3.$copy((((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Hash), (((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind) },
                            ]);
                        }
                        if (!Tristate_IsFalse__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ForceConsistentCasingInFileNames)) {
                            let checkedAbsolutePath = GetNormalizedAbsolutePathWithoutRoot__from_tspath(checkedName, ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.comparePathsOptions.CurrentDirectory);
                            let inputAbsolutePath = GetNormalizedAbsolutePathWithoutRoot__from_tspath((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.comparePathsOptions.CurrentDirectory);
                            if (checkedAbsolutePath !== inputAbsolutePath) {
                                includeProcessor.$go$private$compiler$addProcessingDiagnosticsForFileCasing(includeProcessor__shadow_1, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, checkedName, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, includeReason);
                            }
                        }
                        continue;
                    }
                    else {
                        seen.store(data, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath);
                    }
                }
                if (!tasksSeenByNameIgnoreCase.isNil()) {
                    let pathLowerCase = ToFileNameLowerCase__from_tspath((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path.$value);
                    {
                        const __gotots_results_2 = tasksSeenByNameIgnoreCase.lookupOk(pathLowerCase);
                        let taskByIgnoreCase: {
                            value: parseTask;
                        } | undefined = __gotots_results_2[0];
                        let ok = __gotots_results_2[1];
                        if (ok) {
                            includeProcessor.$go$private$compiler$addProcessingDiagnosticsForFileCasing(includeProcessor__shadow_1, (taskByIgnoreCase ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, (taskByIgnoreCase ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, includeReason);
                        }
                        else {
                            tasksSeenByNameIgnoreCase.store(pathLowerCase, task);
                        }
                    }
                }
                const __gotots_range_1 = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeResolutionsTrace;
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
                    let trace = __gotots_range_value_1;
                    const __gotots_receiver_1 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
                    const __gotots_argument_0 = DiagAndArgs__from___go_module.$storageOf(trace).Message;
                    const __gotots_argument_1 = DiagAndArgs__from___go_module.$storageOf(trace).Args;
                    goInterfaceNonNil<CompilerHost>(__gotots_receiver_1).Trace(__gotots_argument_0, __gotots_argument_1);
                }
                const __gotots_range_2 = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolutionsTrace;
                for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                    const __gotots_range_value_2 = DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_range_2.get(__gotots_range_index_2)));
                    let trace = __gotots_range_value_2;
                    const __gotots_receiver_2 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
                    const __gotots_argument_2 = DiagAndArgs__from___go_module.$storageOf(trace).Message;
                    const __gotots_argument_3 = DiagAndArgs__from___go_module.$storageOf(trace).Args;
                    goInterfaceNonNil<CompilerHost>(__gotots_receiver_2).Trace(__gotots_argument_2, __gotots_argument_3);
                }
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file;
                if (!packageIdToSourceFile.isNil() && PackageId__from___go_module.$storageOf((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                    {
                        const __gotots_results_3 = packageIdToSourceFile.lookupOk((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId);
                        let packageIdFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_3[0];
                        let exists = __gotots_results_3[1];
                        if (exists) {
                            if (!(file === undefined)) {
                                duplicateSourceFiles = duplicateSourceFiles.append(void 0, [
                                    { value: new DuplicateSourceFile(SourceFile__from_ast.ParseOptions(file), Uint128__from_xxh3.$copy(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Hash), ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind) },
                                ]);
                            }
                            redirectTargetsMap.store(SourceFile__from_ast.Path(packageIdFile), redirectTargetsMap.lookup(SourceFile__from_ast.Path(packageIdFile)).append("", [(task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath]));
                            if (redirectFilesByPath.isNil()) {
                                redirectFilesByPath = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile.make(totalFileCount, []);
                            }
                            redirectFilesByPath.store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, new redirectsFile(files.length + redirectFilesByPath.length(), (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, SourceFile__from_ast.Path(packageIdFile)));
                            filesByPath.store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, packageIdFile);
                            if ((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lowestDepth > 0) {
                                Set$Add$Named_tspath$Path(sourceFilesFoundSearchingNodeModules$location, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path);
                            }
                            continue;
                        }
                        else if (!(file === undefined)) {
                            packageIdToSourceFile.store((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId, file);
                        }
                    }
                }
                {
                    let subTasks = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks;
                    if (subTasks.length > 0) {
                        const __gotots_callee_0 = collectFiles;
                        const __gotots_argument_4 = subTasks;
                        const __gotots_argument_5 = seen;
                        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
                    }
                }
                if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask === undefined)) {
                    const __gotots_store_2 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
                    if (!ProgramOptions.$go$private$compiler$canUseProjectReferenceSource(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "opts"))) {
                        outputFileToProjectReferenceSource.store(((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, parseTask.FileName(task));
                    }
                    continue;
                }
                if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.isForAutomaticTypeDirective) {
                    typeResolutionsInFile.store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeResolutionsInFile);
                    if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics.length > 0) {
                        (includeProcessor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = goSliceAppendSlice<{
                            value: processingDiagnostic;
                        } | undefined>((includeProcessor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics, void 0);
                    }
                    continue;
                }
                let path = (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path;
                if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics.length > 0) {
                    (includeProcessor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = goSliceAppendSlice<{
                        value: processingDiagnostic;
                    } | undefined>((includeProcessor__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics, void 0);
                }
                if (file === undefined) {
                    missingFiles = missingFiles.append("", [(task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath]);
                    continue;
                }
                if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.libFile === undefined)) {
                    libFiles = libFiles.append(void 0, [file]);
                    libFilesMap.store(path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.libFile);
                }
                else {
                    files = files.append(void 0, [file]);
                }
                filesByPath.store(path, file);
                resolvedModules.store(path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolutionsInFile);
                typeResolutionsInFile.store(path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeResolutionsInFile);
                sourceFileMetaDatas.store(path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadata);
                if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.jsxRuntimeImportSpecifier === undefined)) {
                    if (jsxRuntimeImportSpecifiers.isNil()) {
                        jsxRuntimeImportSpecifiers = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$jsxRuntimeImportSpecifier.make(totalFileCount, []);
                    }
                    jsxRuntimeImportSpecifiers.store(path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.jsxRuntimeImportSpecifier);
                }
                if (!((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.importHelpersImportSpecifier === undefined)) {
                    if (importHelpersImportSpecifiers.isNil()) {
                        importHelpersImportSpecifiers = $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$Node.make(totalFileCount, []);
                    }
                    importHelpersImportSpecifiers.store(path, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.importHelpersImportSpecifier);
                }
                if ((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lowestDepth > 0) {
                    Set$Add$Named_tspath$Path(sourceFilesFoundSearchingNodeModules$location, path);
                }
            }
        };
        const __gotots_callee_1 = collectFiles;
        const __gotots_argument_6 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.rootTasks;
        const __gotots_argument_7 = $goMap$MapOf_PointerTo_Named_compiler$parseTaskData_To_string.make(totalFileCount, []);
        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
        fileLoader.$go$private$compiler$sortLibs(loader, libFiles);
        let allFiles = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(libFiles, files, void 0);
        const __gotots_range_3 = redirectFilesByPath;
        const __gotots_range_keys_0 = __gotots_range_3.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_0) {
            const __gotots_range_value_4 = __gotots_range_3.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_4[0];
            let redirectFile: redirectsFile | undefined = __gotots_range_value_5;
            const __gotots_store_3 = (redirectFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            __gotots_store_3.index = __gotots_store_3.index + libFiles.length;
        }
        const __gotots_store_4 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
        const __gotots_argument_8 = SyncMap$Keys$Named_tspath$Path$PointerTo_Named_compiler$libResolution(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "pathForLibFileResolutions"));
        let keys = Collect$Named_tspath$Path(__gotots_argument_8);
        Sort$SliceOf_Named_tspath$Path$Named_tspath$Path(keys);
        const __gotots_range_4 = keys;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
            const __gotots_range_value_6 = new Path__from_tspath(__gotots_range_4.get(__gotots_range_index_3));
            let key = __gotots_range_value_6;
            const __gotots_store_5 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
            const __gotots_results_4 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_compiler$libResolution(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "pathForLibFileResolutions"), key);
            let value: {
                value: libResolution;
            } | undefined = __gotots_results_4[0];
            resolvedModules.store(key, new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule.make(1, [[ModeAwareCacheKey__from___go_module.$fromStorage({
                        Name: (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.libraryName,
                        Mode: ModuleKindCommonJS$constant__from_core()
                    }), (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolution]])));
            const __gotots_range_5 = (value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.trace;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
                const __gotots_range_value_7 = DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_range_5.get(__gotots_range_index_4)));
                let trace = __gotots_range_value_7;
                const __gotots_receiver_3 = ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
                const __gotots_argument_9 = DiagAndArgs__from___go_module.$storageOf(trace).Message;
                const __gotots_argument_10 = DiagAndArgs__from___go_module.$storageOf(trace).Args;
                goInterfaceNonNil<CompilerHost>(__gotots_receiver_3).Trace(__gotots_argument_9, __gotots_argument_10);
            }
        }
        return new processedFiles(((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.resolver, allFiles, duplicateSourceFiles, filesByPath, ((loader ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.projectReferenceFileMapper, missingFiles, resolvedModules, typeResolutionsInFile, sourceFileMetaDatas, jsxRuntimeImportSpecifiers, importHelpersImportSpecifiers, libFilesMap, Set__from_collections.$copy<Path__from_tspath>(sourceFilesFoundSearchingNodeModules), includeProcessor__shadow_1, outputFileToProjectReferenceSource, redirectTargetsMap, redirectFilesByPath, true);
    }
    static $go$private$compiler$parse(w: {
        value: filesParser;
    } | undefined, loader: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, tasks: RuntimeSlice<{
        value: parseTask;
    } | undefined>): void {
        filesParser.$go$private$compiler$start(w, loader, tasks, 0);
        const __gotots_receiver_0 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_0).RunAndWait();
    }
    static $go$private$compiler$start(w: {
        value: filesParser;
    } | undefined, loader: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, tasks: RuntimeSlice<{
        value: parseTask;
    } | undefined>, depth: int): void {
        const __gotots_range_6 = tasks;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
            const __gotots_range_value_8 = __gotots_range_index_5;
            const __gotots_range_value_9 = __gotots_range_6.get(__gotots_range_index_5);
            let i = __gotots_range_value_8;
            let task: {
                value: parseTask;
            } | undefined = __gotots_range_value_9;
            (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path = fileLoader.$go$private$compiler$toPath(loader, (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath);
            let candidate: {
                value: parseTaskData;
            } | undefined = getParseTaskData(task);
            const __gotots_store_6 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_results_5 = SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$parseTaskData(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "taskDataByPath"), (task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, candidate);
            let data: {
                value: parseTaskData;
            } | undefined = __gotots_results_5[0];
            let loaded = __gotots_results_5[1];
            if (loaded) {
                putParseTaskData(candidate);
            }
            const __gotots_receiver_5 = (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.wg;
            const __gotots_argument_11 = (): void => {
                let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                let __gotots_panic_0: GoPanic | undefined = undefined;
                try {
                    try {
                        __gotots_return_block_0: {
                            sync__from_gostdlib.Mutex.Lock((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu);
                            const __gotots_receiver_4 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.mu;
                            __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                                recovery_sync.SyncMutexUnlock(__gotots_receiver_4, $go$recovery);
                            };
                            let startSubtasks = false;
                            if (loaded) {
                                {
                                    const __gotots_results_6 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks.lookupOk((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath);
                                    let existingTask: {
                                        value: parseTask;
                                    } | undefined = __gotots_results_6[0];
                                    let ok = __gotots_results_6[1];
                                    if (ok) {
                                        (tasks.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loadedTask = existingTask;
                                    }
                                    else {
                                        (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks.store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, task);
                                        startSubtasks = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startedSubTasks;
                                    }
                                }
                            }
                            if (PackageId__from___go_module.$storageOf((data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name === "" && PackageId__from___go_module.$storageOf((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId).Name !== "") {
                                (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId = PackageId__from___go_module.$copy((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packageId);
                            }
                            let currentDepth = IfElse$int((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.increaseDepth, depth + 1, depth);
                            if (currentDepth < (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lowestDepth) {
                                (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lowestDepth = currentDepth;
                                startSubtasks = true;
                                (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startedSubTasks = true;
                            }
                            if ((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.elideOnDepth && currentDepth > (w ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxDepth) {
                                break __gotots_return_block_0;
                            }
                            const __gotots_range_7 = (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks;
                            const __gotots_range_keys_1 = __gotots_range_7.keys();
                            for (const __gotots_range_value_10 of __gotots_range_keys_1) {
                                const __gotots_range_value_11 = __gotots_range_7.lookupOk(__gotots_range_value_10);
                                if (!__gotots_range_value_11[1]) {
                                    continue;
                                }
                                const __gotots_range_value_12 = __gotots_range_value_11[0];
                                let taskByFileName: {
                                    value: parseTask;
                                } | undefined = __gotots_range_value_12;
                                let loadSubTasks = startSubtasks;
                                if (!(taskByFileName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loaded) {
                                    parseTask.$go$private$compiler$load(taskByFileName, loader);
                                    if (!((taskByFileName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.redirectedParseTask === undefined)) {
                                        loadSubTasks = true;
                                        (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startedSubTasks = true;
                                    }
                                }
                                if (!(taskByFileName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startedSubTasks && loadSubTasks) {
                                    (taskByFileName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.startedSubTasks = true;
                                    filesParser.$go$private$compiler$start(w, loader, (taskByFileName ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.subTasks, (data ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lowestDepth);
                                }
                            }
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
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_5).Queue(__gotots_argument_11);
        }
    }
}
export function getParseTaskData(task: {
    value: parseTask;
} | undefined): {
    value: parseTaskData;
} | undefined {
    let td: {
        value: parseTaskData;
    } | undefined = (($value: GoInterface | undefined): {
        value: parseTaskData;
    } | undefined => {
        if (!GoInterfaceAdapter.$is($value)) {
            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
        }
        return $value.$go$value;
    })(sync__from_gostdlib.Pool.Get($state.parseTaskDataPool));
    (td ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks.store((task ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, task);
    (td ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.lowestDepth = MaxInt$int__from_math__package_1;
    return td;
}
export function putParseTaskData(td: {
    value: parseTaskData;
} | undefined): void {
    (td ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.tasks.clear();
    sync__from_gostdlib.Pool.Put($state.parseTaskDataPool, new GoInterfaceAdapter(td));
}
export class parseTaskData {
    declare private readonly $goType: void;
    public constructor(public tasks: GoMapValue<gostring, {
        value: parseTask;
    } | undefined>, public mu: sync__from_gostdlib.Mutex, public lowestDepth: int, public startedSubTasks: bool, public packageId: PackageId__from___go_module) {
    }
    static $copy($source: parseTaskData): parseTaskData {
        return new parseTaskData($source.tasks, named_sync.SyncMutexOperations.$copy($source.mu), $source.lowestDepth, $source.startedSubTasks, PackageId__from___go_module.$copy($source.packageId));
    }
    declare private readonly then?: never;
}
