import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Diagnostic as Diagnostic__from_ast, ExportDeclaration as ExportDeclaration__from_ast, ExternalModuleIndicatorOptions$Storage as ExternalModuleIndicatorOptions__from_ast$Storage, FileReference as FileReference__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportTypeNode as ImportTypeNode__from_ast, JSDocImportTag as JSDocImportTag__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core, ScriptKind as ScriptKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { DiagAndArgs$Storage as DiagAndArgs__from___go_module$Storage, PackageId$Storage as PackageId__from___go_module$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { Expected as Expected__from_packagejson, PackageJson as PackageJson__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { FileExtensionInfo$Storage as FileExtensionInfo__from_tsoptions$Storage, SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions, TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { parseTaskData, resolvedRef$Storage as resolvedRef__from_compiler$Storage } from "./filesparser.js";
import type { CompilerHost } from "./host.js";
import type { includeProcessor } from "./includeprocessor.js";
import type { projectReferenceParseTask } from "./projectreferenceparser.js";
import type * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { ExternalModuleIndicatorOptions as ExternalModuleIndicatorOptions__from_ast, GetEmitModuleFormatOfFileWorker as GetEmitModuleFormatOfFileWorker__from_ast, GetExternalModuleIndicatorOptions as GetExternalModuleIndicatorOptions__from_ast, GetImpliedNodeFormatForEmitWorker as GetImpliedNodeFormatForEmitWorker__from_ast, GetImpliedNodeFormatForFile as GetImpliedNodeFormatForFile__from_ast, GetJSXImplicitImportBase as GetJSXImplicitImportBase__from_ast, GetJSXRuntimeImport as GetJSXRuntimeImport__from_ast, IsExclusivelyTypeOnlyImportOrExport as IsExclusivelyTypeOnlyImportOrExport__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExternalModuleReference as IsExternalModuleReference__from_ast, IsExternalModule as IsExternalModule__from_ast, IsImportCall as IsImportCall__from_ast, IsImportDeclaration as IsImportDeclaration__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsImportTypeNode as IsImportTypeNode__from_ast, IsInJSFile as IsInJSFile__from_ast, IsJSDocImportTag as IsJSDocImportTag__from_ast, IsLiteralTypeNode as IsLiteralTypeNode__from_ast, IsRequireCall as IsRequireCall__from_ast, IsSourceFileJS as IsSourceFileJS__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindJSDocImportTag$constant as KindJSDocImportTag$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, NewHasFileName as NewHasFileName__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsJSDoc$constant as NodeFlagsJSDoc$constant__from_ast, Node as Node__from_ast, ShouldTransformImportCall as ShouldTransformImportCall__from_ast, SourceFileMetaData as SourceFileMetaData__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast, TokenFlagsNone$constant as TokenFlagsNone$constant__from_ast, WalkUpParenthesizedExpressions as WalkUpParenthesizedExpressions__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ModuleKindNone$constant as ModuleKindNone$constant__from_core, ModuleKindPreserve$constant as ModuleKindPreserve$constant__from_core, ModuleKind_IsNonNodeESM as ModuleKind_IsNonNodeESM__from_core, ModuleResolutionKindNode16$constant as ModuleResolutionKindNode16$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, NewWorkGroup as NewWorkGroup__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core, ScriptKindJSX$constant as ScriptKindJSX$constant__from_core, ScriptKindTSX$constant as ScriptKindTSX$constant__from_core, Tristate_IsFalseOrUnknown as Tristate_IsFalseOrUnknown__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { DiagAndArgs as DiagAndArgs__from___go_module, GetAutomaticTypeDirectiveNames as GetAutomaticTypeDirectiveNames__from___go_module, GetCompilerOptionsWithRedirect as GetCompilerOptionsWithRedirect__from___go_module, GetResolutionDiagnostic as GetResolutionDiagnostic__from___go_module, InferredTypesContainingFile$string as InferredTypesContainingFile$string__from___go_module, ModeAwareCacheKey as ModeAwareCacheKey__from___go_module, ModeAwareCache as ModeAwareCache__from___go_module, NewResolver as NewResolver__from___go_module, PackageId as PackageId__from___go_module, ResolvedModule as ResolvedModule__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module, Resolver as Resolver__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { PhaseParse$constant as PhaseParse$constant__from_tracing, PhaseProgram$constant as PhaseProgram$constant__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { $state as $state__tsoptions, GetDefaultLibFileName as GetDefaultLibFileName__from_tsoptions, GetLibFileName as GetLibFileName__from_tsoptions, GetSupportedExtensionsWithJsonIfResolveJsonModule as GetSupportedExtensionsWithJsonIfResolveJsonModule__from_tsoptions, GetSupportedExtensions as GetSupportedExtensions__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { $state as $state__tspath, CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, DirectorySeparator$uint8 as DirectorySeparator$uint8__from_tspath, ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, HasExtension as HasExtension__from_tspath, HasJSFileExtension as HasJSFileExtension__from_tspath, IsRootedDiskPath as IsRootedDiskPath__from_tspath, NormalizePath as NormalizePath__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath, Path as Path__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Uint128 as Uint128__from_xxh3 } from "../../../../../../packages/github.com/zeebo/xxh3@v1.1.0/_root/package.js";
import { $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { Compare$int } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { SyncMap$Load$string$PointerTo_Named_compiler$LibFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$libResolution, SyncMap$LoadOrStore$string$PointerTo_Named_compiler$LibFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { Flatten$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Flatten.js";
import { IfElse$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Expected$GetValue$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/packagejson/Expected$GetValue.js";
import { Index$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { SortFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason, $goInterfaceAdapter$PointerTo_Named_compiler$automaticTypeDirectiveFileData, $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic, $goInterfaceAdapter$PointerTo_Named_compiler$parseTask, $goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData, $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine, $goInterfaceAdapter$bool, $goInterfaceAdapter$string, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule, $goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective, $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedModule, $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedTypeReferenceDirective, $goMap$MapOf_Named_tspath$Path_To_Named_ast$SourceFileMetaData, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$Node, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$LibFile, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$jsxRuntimeImportSpecifier, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goMap$MapOf_Named_tspath$Path_To_SliceOf_Named_tspath$Path, $goMap$MapOf_Named_tspath$Path_To_SliceOf_string, $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$ParsedCommandLine as GoMap } from "../../../../../../support/maps.js";
import { FileIncludeReason, automaticTypeDirectiveFileData, fileIncludeKind, fileIncludeKindAutomaticTypeDirectiveFile$int, fileIncludeKindImport$int, fileIncludeKindLibFile$int, fileIncludeKindReferenceFile$int, fileIncludeKindRootFile$int, fileIncludeKindTypeReferenceDirective$int, referencedFileData } from "./fileInclude.js";
import { filesParser, parseTask, resolvedRef } from "./filesparser.js";
import { includeExplainingDiagnostic, processingDiagnostic, processingDiagnosticKindExplainingFileInclude$constant, processingDiagnosticKindUnknownReference$constant } from "./processingDiagnostic.js";
import { ProgramOptions } from "./program.js";
import { projectReferenceFileMapper } from "./projectreferencefilemapper.js";
import { createProjectReferenceParseTasks, projectReferenceParser } from "./projectreferenceparser.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class libResolution {
    declare private readonly $goType: void;
    public constructor(public libraryName: gostring, public resolution: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined, public trace: RuntimeSlice<DiagAndArgs__from___go_module$Storage>) {
    }
    static $copy($source: libResolution): libResolution {
        return new libResolution($source.libraryName, $source.resolution, $source.trace);
    }
    declare private readonly then?: never;
}
export class LibFile {
    declare private readonly $goType: void;
    public constructor(public Name: gostring, public path: gostring, public Replaced: bool) {
    }
    static $copy($source: LibFile): LibFile {
        return new LibFile($source.Name, $source.path, $source.Replaced);
    }
    static $equal($left: LibFile, $right: LibFile): bool {
        return $left.Name === $right.Name && $left.path === $right.path && $left.Replaced === $right.Replaced;
    }
    static $hash($source: LibFile): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.Name));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.path));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.Replaced));
        return $hash;
    }
    declare private readonly then?: never;
}
export class sourceFileFromReferenceDiagnostic {
    declare private readonly $goType: void;
    public constructor(public message: {
        value: Message__from_diagnostics;
    } | undefined, public args: RuntimeSlice<GoInterface | undefined>) {
    }
    declare private readonly then?: never;
}
export class fileLoader {
    declare private readonly $goType: void;
    public constructor(public opts: ProgramOptions, public resolver: {
        value: Resolver__from___go_module;
    } | undefined, public defaultLibraryPath: gostring, public comparePathsOptions: ComparePathsOptions__from_tspath, public supportedExtensions: RuntimeSlice<RuntimeSlice<gostring>>, public supportedExtensionsWithJsonIfResolveJsonModule: RuntimeSlice<RuntimeSlice<gostring>>, public filesParser: {
        value: filesParser;
    } | undefined, public rootTasks: RuntimeSlice<{
        value: parseTask;
    } | undefined>, public totalFileCount: atomic__from_gostdlib.Int32, public libFileCount: atomic__from_gostdlib.Int32, public factoryMu: sync__from_gostdlib.Mutex, public factory: NodeFactory__from_ast, public projectReferenceFileMapper: {
        value: projectReferenceFileMapper;
    } | undefined, public dtsDirectories: Set__from_collections<Path__from_tspath>, public pathForLibFileCache: SyncMap__from_collections<gostring, {
        value: LibFile;
    } | undefined>, public pathForLibFileResolutions: SyncMap__from_collections<Path__from_tspath, {
        value: libResolution;
    } | undefined>) {
    }
    static $copy($source: fileLoader): fileLoader {
        return new fileLoader(ProgramOptions.$copy($source.opts), $source.resolver, $source.defaultLibraryPath, ComparePathsOptions__from_tspath.$copy($source.comparePathsOptions), $source.supportedExtensions, $source.supportedExtensionsWithJsonIfResolveJsonModule, $source.filesParser, $source.rootTasks, named_sync_atomic.SyncAtomicInt32Operations.$copy($source.totalFileCount), named_sync_atomic.SyncAtomicInt32Operations.$copy($source.libFileCount), named_sync.SyncMutexOperations.$copy($source.factoryMu), NodeFactory__from_ast.$copy($source.factory), $source.projectReferenceFileMapper, Set__from_collections.$copy<Path__from_tspath>($source.dtsDirectories), SyncMap__from_collections.$copy<gostring, {
            value: LibFile;
        } | undefined>($source.pathForLibFileCache), SyncMap__from_collections.$copy<Path__from_tspath, {
            value: libResolution;
        } | undefined>($source.pathForLibFileResolutions));
    }
    declare private readonly then?: never;
    static $go$private$compiler$addAutomaticTypeDirectiveTasks(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined): void {
        let containingDirectory = "";
        let compilerOptions: {
            value: CompilerOptions__from_core;
        } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config);
        if ((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "") {
            containingDirectory = GetDirectoryPath__from_tspath((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath);
        }
        else {
            const __gotots_receiver_8 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
            containingDirectory = goInterfaceNonNil<CompilerHost>(__gotots_receiver_8).GetCurrentDirectory();
        }
        let containingFileName = CombinePaths__from_tspath(containingDirectory, RuntimeSlice.literal<gostring>([InferredTypesContainingFile$string__from___go_module]));
        ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.rootTasks = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.rootTasks.append(void 0, [
            { value: new parseTask(containingFileName, new Path__from_tspath(""), void 0, void 0, void 0, RuntimeSlice.nil<{
                    value: parseTask;
                } | undefined>(), false, false, true, void 0, PackageId__from___go_module.$zero(), SourceFileMetaData__from_ast.$zero(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<{
                    value: processingDiagnostic;
                } | undefined>(), void 0, void 0, false, false, void 0, RuntimeSlice.nil<{
                    value: FileIncludeReason;
                } | undefined>()) },
        ]);
    }
    static $go$private$compiler$addProjectReferenceTasks(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, singleThreaded: bool): void {
        ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.projectReferenceFileMapper =
            { value: new projectReferenceFileMapper(ProgramOptions.$copy(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts), ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host, void 0, GoMap.nil(), $goMap$MapOf_Named_tspath$Path_To_SliceOf_Named_tspath$Path.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference.nil(), SyncMap__from_collections.$zero<Path__from_tspath, {
                    value: SourceOutputAndProjectReference__from_tsoptions;
                } | undefined>()) };
        let projectReferences = ParsedCommandLine__from_tsoptions.ResolvedProjectReferencePaths(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config);
        if (projectReferences.length === 0) {
            return;
        }
        let parser: projectReferenceParser | undefined = new projectReferenceParser(p, NewWorkGroup__from_core(singleThreaded), SyncMap__from_collections.$zero<Path__from_tspath, {
            value: projectReferenceParseTask;
        } | undefined>());
        let rootTasks = createProjectReferenceParseTasks(projectReferences);
        projectReferenceParser.$go$private$compiler$parse(parser, rootTasks);
    }
    static $go$private$compiler$addRootFileTask(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, fileName: gostring, libFile: {
        value: LibFile;
    } | undefined, includeReason: {
        value: FileIncludeReason;
    } | undefined): void {
        const __gotots_receiver_5 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
        let currDir = goInterfaceNonNil<CompilerHost>(__gotots_receiver_5).GetCurrentDirectory();
        let absPath = GetNormalizedAbsolutePath__from_tspath(fileName, currDir);
        let containingFile = currDir;
        if (!(((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile === undefined)) {
            containingFile = GetNormalizedAbsolutePath__from_tspath(SourceFile__from_ast.FileName((((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile), currDir);
        }
        const __gotots_results_1 = fileLoader.$go$private$compiler$getSourceFileFromReference(p, absPath, fileName, containingFile, includeReason);
        let resolvedFile = __gotots_results_1[0];
        let diagnostic: sourceFileFromReferenceDiagnostic | undefined = __gotots_results_1[1];
        let rootTask: {
            value: parseTask;
        } | undefined = { value: new parseTask(resolvedFile, new Path__from_tspath(""), void 0, libFile, void 0, RuntimeSlice.nil<{
                value: parseTask;
            } | undefined>(), false, false, false, includeReason, PackageId__from___go_module.$zero(), SourceFileMetaData__from_ast.$zero(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<{
                value: processingDiagnostic;
            } | undefined>(), void 0, void 0, false, false, void 0, RuntimeSlice.nil<{
                value: FileIncludeReason;
            } | undefined>()) };
        if (!(diagnostic === undefined)) {
            (rootTask ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath = absPath;
            (rootTask ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = RuntimeSlice.literal<{
                value: processingDiagnostic;
            } | undefined>([
                { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(new Path__from_tspath(""), includeReason, (diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).message, (diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).args) })) },
            ]);
        }
        ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.rootTasks = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.rootTasks.append(void 0, [rootTask]);
    }
    static $go$private$compiler$addRootTask(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, fileName: gostring, libFile: {
        value: LibFile;
    } | undefined, includeReason: {
        value: FileIncludeReason;
    } | undefined): void {
        const __gotots_argument_5 = fileName;
        const __gotots_receiver_7 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
        const __gotots_argument_6 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_7).GetCurrentDirectory();
        let absPath = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_5, __gotots_argument_6);
        if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowNonTsExtensions) || HasExtension__from_tspath(absPath)) {
            ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.rootTasks = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.rootTasks.append(void 0, [
                { value: new parseTask(absPath, new Path__from_tspath(""), void 0, libFile, void 0, RuntimeSlice.nil<{
                        value: parseTask;
                    } | undefined>(), false, false, false, includeReason, PackageId__from___go_module.$zero(), SourceFileMetaData__from_ast.$zero(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.nil()), RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<{
                        value: processingDiagnostic;
                    } | undefined>(), void 0, void 0, false, false, void 0, RuntimeSlice.nil<{
                        value: FileIncludeReason;
                    } | undefined>()) },
            ]);
        }
    }
    static $go$private$compiler$createSyntheticImport(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, text: gostring, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    sync__from_gostdlib.Mutex.Lock(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.factoryMu);
                    const __gotots_receiver_23 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.factoryMu;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        recovery_sync.SyncMutexUnlock(__gotots_receiver_23, $go$recovery);
                    };
                    const __gotots_store_4 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
                    let externalHelpersModuleReference: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewStringLiteral(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "factory"), text, TokenFlagsNone$constant__from_ast());
                    const __gotots_store_5 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
                    let importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewImportDeclaration(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "factory"), void 0, void 0, externalHelpersModuleReference, void 0);
                    Node__from_ast.$storageOf(((externalHelpersModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = importDecl;
                    const __gotots_store_6 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
                    Node__from_ast.$storageOf(((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    __gotots_return_0 = externalHelpersModuleReference;
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
    static $go$private$compiler$getDefaultLibFilePriority(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, a: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
        let defaultLibraryPath = RemoveTrailingDirectorySeparator__from_tspath(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.defaultLibraryPath);
        let aFileName = SourceFile__from_ast.FileName(a);
        if (strings__from_gostdlib.HasPrefix(aFileName, defaultLibraryPath) && aFileName.length > defaultLibraryPath.length && goStringIndex(aFileName, defaultLibraryPath.length) === DirectorySeparator$uint8__from_tspath) {
            let basename = goStringSlice(aFileName, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(aFileName, DirectorySeparator$uint8__from_tspath))) + 1);
            if (basename === "lib.d.ts" || basename === "lib.es6.d.ts") {
                return 0;
            }
            let name = strings__from_gostdlib.TrimSuffix(strings__from_gostdlib.TrimPrefix(basename, "lib."), ".d.ts");
            let index = Index$SliceOf_string$string($state__tsoptions.Libs, name);
            if (index !== -1) {
                return index + 1;
            }
        }
        return $state__tsoptions.Libs.length + 2;
    }
    static $go$private$compiler$getSourceFileFromReference(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, fileName: gostring, referenceText: gostring, containingFile: gostring, includeReason: {
        value: FileIncludeReason;
    } | undefined): [
        gostring,
        sourceFileFromReferenceDiagnostic | undefined
    ] {
        let options: {
            value: CompilerOptions__from_core;
        } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config);
        let allowNonTsExtensions = Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowNonTsExtensions);
        let diagnosticFileName = NormalizeSlashes__from_tspath(referenceText);
        if (HasExtension__from_tspath(fileName)) {
            const __gotots_argument_7 = fileName;
            const __gotots_receiver_9 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
            const __gotots_receiver_10 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_9).FS();
            const __gotots_argument_8 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_10).UseCaseSensitiveFileNames();
            let canonicalFileName = GetCanonicalFileName__from_tspath(__gotots_argument_7, __gotots_argument_8);
            if (!allowNonTsExtensions && !fileLoader.$go$private$compiler$isSupportedExtension(p, canonicalFileName)) {
                if (HasJSFileExtension__from_tspath(canonicalFileName)) {
                    return ["", new sourceFileFromReferenceDiagnostic($state__diagnostics.File_0_is_a_JavaScript_file_Did_you_mean_to_enable_the_allowJs_option, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(diagnosticFileName)])),];
                }
                return ["", new sourceFileFromReferenceDiagnostic($state__diagnostics.File_0_has_an_unsupported_extension_The_only_supported_extensions_are_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(diagnosticFileName), new $goInterfaceAdapter$string("'" + strings__from_gostdlib.Join(Flatten$string(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.supportedExtensions), "', '") + "'")])),];
            }
            const __gotots_receiver_11 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
            const __gotots_receiver_12 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_11).FS();
            const __gotots_argument_9 = fileName;
            if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_12).FileExists(__gotots_argument_9)) {
                return ["", new sourceFileFromReferenceDiagnostic($state__diagnostics.File_0_not_found, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(diagnosticFileName)])),];
            }
            let __gotots_logical_result_0 = FileIncludeReason.$go$private$compiler$isReferencedFile(includeReason);
            if (__gotots_logical_result_0) {
                const __gotots_argument_10 = containingFile;
                const __gotots_receiver_13 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
                const __gotots_receiver_14 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_13).FS();
                const __gotots_argument_11 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_14).UseCaseSensitiveFileNames();
                const __gotots_binary_operand_0 = GetCanonicalFileName__from_tspath(__gotots_argument_10, __gotots_argument_11);
                const __gotots_binary_operand_1 = canonicalFileName;
                __gotots_logical_result_0 = __gotots_binary_operand_0 === __gotots_binary_operand_1;
            }
            if (__gotots_logical_result_0) {
                return ["", new sourceFileFromReferenceDiagnostic($state__diagnostics.A_file_cannot_have_a_reference_to_itself, RuntimeSlice.nil<GoInterface | undefined>()),];
            }
            return [fileName, void 0];
        }
        let __gotots_logical_result_1 = allowNonTsExtensions;
        if (__gotots_logical_result_1) {
            const __gotots_receiver_15 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
            const __gotots_receiver_16 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_15).FS();
            const __gotots_argument_12 = fileName;
            __gotots_logical_result_1 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_16).FileExists(__gotots_argument_12);
        }
        if (__gotots_logical_result_1) {
            return [fileName, void 0];
        }
        if (allowNonTsExtensions) {
            return ["", new sourceFileFromReferenceDiagnostic($state__diagnostics.File_0_not_found, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(diagnosticFileName)])),];
        }
        const __gotots_range_2 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.supportedExtensions.get(0);
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_2);
            let ext = __gotots_range_value_4;
            let candidate = fileName + ext;
            const __gotots_receiver_17 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
            const __gotots_receiver_18 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_17).FS();
            const __gotots_argument_13 = candidate;
            if (goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_18).FileExists(__gotots_argument_13)) {
                return [candidate, void 0];
            }
        }
        return ["", new sourceFileFromReferenceDiagnostic($state__diagnostics.Could_not_resolve_the_path_0_with_the_extensions_Colon_1, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(diagnosticFileName), new $goInterfaceAdapter$string("'" + strings__from_gostdlib.Join(Flatten$string(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.supportedExtensions), "', '") + "'")])),];
    }
    static $go$private$compiler$isSupportedExtension(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, canonicalFileName: gostring): bool {
        const __gotots_range_3 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.supportedExtensionsWithJsonIfResolveJsonModule;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_3);
            let group = __gotots_range_value_5;
            if (FileExtensionIsOneOf__from_tspath(canonicalFileName, group)) {
                return true;
            }
        }
        return false;
    }
    static $go$private$compiler$loadSourceFileMetaData(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, fileName: gostring): SourceFileMetaData__from_ast {
        let packageJsonScope: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = Resolver__from___go_module.GetPackageScopeForPath(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.resolver, GetDirectoryPath__from_tspath(fileName));
        let moduleResolutionKind = CompilerOptions__from_core.GetModuleResolutionKind(ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config));
        let packageJsonType = "", packageJsonDirectory = "";
        if (InfoCacheEntry__from_packagejson.Exists(packageJsonScope)) {
            packageJsonDirectory = (packageJsonScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
            {
                const __gotots_store_3 = ((packageJsonScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields;
                const __gotots_results_5 = Expected$GetValue$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Type"));
                let value = __gotots_results_5[0];
                let ok = __gotots_results_5[1];
                if (ok) {
                    if (!FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionMts$string__from_tspath, ExtensionCts$string__from_tspath, ExtensionMjs$string__from_tspath, ExtensionCjs$string__from_tspath])) && ModuleResolutionKindNode16$constant__from_core() <= moduleResolutionKind && moduleResolutionKind <= ModuleResolutionKindNodeNext$constant__from_core() || strings__from_gostdlib.Contains(fileName, "/node_modules/")) {
                        packageJsonType = value;
                    }
                }
            }
        }
        let impliedNodeFormat = GetImpliedNodeFormatForFile__from_ast(fileName, packageJsonType);
        return new SourceFileMetaData__from_ast(packageJsonType, packageJsonDirectory, impliedNodeFormat);
    }
    static $go$private$compiler$parseSourceFile(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, t: {
        value: parseTask;
    } | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if (!(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing === undefined)) {
                        const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing, PhaseParse$constant__from_tracing(), "createSourceFile", $goMap$MapOf_string_To_Interface_void.make(1, [["path", new $goInterfaceAdapter$string((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath)]]), true);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    let path = fileLoader.$go$private$compiler$toPath(p, (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath);
                    let options: {
                        value: CompilerOptions__from_core;
                    } | undefined = projectReferenceFileMapper.$go$private$compiler$getCompilerOptionsForFile(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.projectReferenceFileMapper, new $goInterfaceAdapter$PointerTo_Named_compiler$parseTask(t));
                    const __gotots_receiver_22 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
                    const __gotots_argument_17 = SourceFileParseOptions__from_ast.$fromStorage({
                        FileName: (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath,
                        Path: path.$value,
                        ExternalModuleIndicatorOptions: ExternalModuleIndicatorOptions__from_ast.$storageOf(GetExternalModuleIndicatorOptions__from_ast((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.normalizedFilePath, options, SourceFileMetaData__from_ast.$copy((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadata)))
                    });
                    let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = goInterfaceNonNil<CompilerHost>(__gotots_receiver_22).GetSourceFile(__gotots_argument_17);
                    __gotots_return_0 = sourceFile;
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
    static $go$private$compiler$pathForLibFile(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, name: gostring): {
        value: LibFile;
    } | undefined {
        {
            const __gotots_store_0 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
            const __gotots_results_2 = SyncMap$Load$string$PointerTo_Named_compiler$LibFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "pathForLibFileCache"), name);
            let cached: {
                value: LibFile;
            } | undefined = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok) {
                return cached;
            }
        }
        let path = CombinePaths__from_tspath(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.defaultLibraryPath, RuntimeSlice.literal<gostring>([name]));
        let replaced = false;
        if (Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.LibReplacement) && name !== "lib.d.ts") {
            let libraryName = getLibraryNameFromLibFileName(name);
            const __gotots_argument_2 = ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config);
            const __gotots_receiver_6 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
            const __gotots_argument_3 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_6).GetCurrentDirectory();
            const __gotots_argument_4 = name;
            let resolveFrom = getInferredLibraryNameResolveFrom(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
            const __gotots_results_3 = fileLoader.$go$private$compiler$resolveLibrary(p, libraryName, resolveFrom);
            let resolution: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_results_3[0];
            let trace = __gotots_results_3[1];
            if (ResolvedModule__from___go_module.IsResolved(resolution)) {
                path = ((resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName;
                replaced = true;
            }
            const __gotots_store_1 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
            SyncMap$LoadOrStore$Named_tspath$Path$PointerTo_Named_compiler$libResolution(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "pathForLibFileResolutions"), fileLoader.$go$private$compiler$toPath(p, resolveFrom), { value: new libResolution(libraryName, resolution, trace) });
        }
        const __gotots_store_2 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value;
        const __gotots_results_4 = SyncMap$LoadOrStore$string$PointerTo_Named_compiler$LibFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "pathForLibFileCache"), name, { value: new LibFile(name, path, replaced) });
        let libPath: {
            value: LibFile;
        } | undefined = __gotots_results_4[0];
        return libPath;
    }
    static $go$private$compiler$resolveAutomaticTypeDirectives(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, containingFileName: gostring): [
        RuntimeSlice<resolvedRef__from_compiler$Storage>,
        ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>,
        RuntimeSlice<DiagAndArgs__from___go_module$Storage>,
        RuntimeSlice<{
            value: processingDiagnostic;
        } | undefined>
    ] {
        let toParse: RuntimeSlice<resolvedRef__from_compiler$Storage> = RuntimeSlice.nil<resolvedRef__from_compiler$Storage>();
        let typeResolutionsInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined> = new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.nil());
        let typeResolutionsTrace: RuntimeSlice<DiagAndArgs__from___go_module$Storage> = RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>();
        let pDiagnostics: RuntimeSlice<{
            value: processingDiagnostic;
        } | undefined> = RuntimeSlice.nil<{
            value: processingDiagnostic;
        } | undefined>();
        let automaticTypeDirectiveNames = GetAutomaticTypeDirectiveNames__from___go_module(ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config), ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host);
        if (automaticTypeDirectiveNames.length !== 0) {
            const __gotots_slice_build_12 = goSliceAllocate<resolvedRef__from_compiler$Storage>(0, automaticTypeDirectiveNames.length);
            for (let __gotots_slice_build_13 = 0; __gotots_slice_build_13 < __gotots_slice_build_12.capacity; __gotots_slice_build_13++) {
                __gotots_slice_build_12.$initialize(__gotots_slice_build_13, resolvedRef.$storageOf(resolvedRef.$zero()));
            }
            toParse = __gotots_slice_build_12;
            typeResolutionsInFile = new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.make(automaticTypeDirectiveNames.length, []));
            const __gotots_range_7 = automaticTypeDirectiveNames;
            for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
                const __gotots_range_value_11 = __gotots_range_7.get(__gotots_range_index_7);
                let name = __gotots_range_value_11;
                let resolutionMode = ResolutionModeNone$constant__from_core();
                const __gotots_results_11 = Resolver__from___go_module.ResolveTypeReferenceDirective(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.resolver, name, containingFileName, resolutionMode, void 0);
                let resolved: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined = __gotots_results_11[0];
                let trace = __gotots_results_11[1];
                let traceDone: (() => void) | undefined;
                if (!(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing === undefined)) {
                    traceDone = Tracing__from_tracing.Push(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing, PhaseProgram$constant__from_tracing(), "processTypeReferenceDirective", $goMap$MapOf_string_To_Interface_void.make(3, [["directive", new $goInterfaceAdapter$string(name)], ["hasResolved", new $goInterfaceAdapter$bool(ResolvedTypeReferenceDirective__from___go_module.IsResolved(resolved))], ["refKind", new GoInterfaceAdapter(6)]]), false);
                }
                typeResolutionsInFile.$value.store(ModeAwareCacheKey__from___go_module.$fromStorage({
                    Name: name,
                    Mode: resolutionMode
                }), resolved);
                const __gotots_slice_build_14 = typeResolutionsTrace;
                const __gotots_slice_build_15 = trace;
                let __gotots_slice_build_16 = __gotots_slice_build_15;
                if (__gotots_slice_build_15.length > 0) {
                    __gotots_slice_build_16 = goSliceAllocate<DiagAndArgs__from___go_module$Storage>(__gotots_slice_build_15.length, null);
                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_15.length; __gotots_slice_build_19++) {
                        __gotots_slice_build_16.set(__gotots_slice_build_19, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_slice_build_15.get(__gotots_slice_build_19)))));
                    }
                }
                const __gotots_slice_build_18 = __gotots_slice_build_14.length + __gotots_slice_build_16.length;
                let __gotots_slice_build_17 = __gotots_slice_build_14;
                if (__gotots_slice_build_18 <= __gotots_slice_build_14.capacity) {
                    __gotots_slice_build_17 = __gotots_slice_build_14.$withLength(__gotots_slice_build_18);
                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.set(__gotots_slice_build_14.length + __gotots_slice_build_19, __gotots_slice_build_16.get(__gotots_slice_build_19));
                    }
                }
                else {
                    __gotots_slice_build_17 = goSliceAllocate<DiagAndArgs__from___go_module$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_14.capacity, __gotots_slice_build_18));
                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_14.length; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.set(__gotots_slice_build_19, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_slice_build_14.get(__gotots_slice_build_19)))));
                    }
                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.set(__gotots_slice_build_14.length + __gotots_slice_build_19, __gotots_slice_build_16.get(__gotots_slice_build_19));
                    }
                    for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.$initialize(__gotots_slice_build_19, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$zero()));
                    }
                }
                typeResolutionsTrace = __gotots_slice_build_17;
                if (ResolvedTypeReferenceDirective__from___go_module.IsResolved(resolved)) {
                    const __gotots_slice_build_20 = toParse;
                    const __gotots_slice_build_22 = __gotots_slice_build_20.length + 1;
                    let __gotots_slice_build_21 = __gotots_slice_build_20;
                    if (__gotots_slice_build_22 <= __gotots_slice_build_20.capacity) {
                        __gotots_slice_build_21 = __gotots_slice_build_20.$withLength(__gotots_slice_build_22);
                        __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, resolvedRef.$storageOf(resolvedRef.$fromStorage({
                            fileName: ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolvedFileName,
                            increaseDepth: ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.IsExternalLibraryImport,
                            elideOnDepth: false,
                            includeReason: { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindAutomaticTypeDirectiveFile$int), new $goInterfaceAdapter$PointerTo_Named_compiler$automaticTypeDirectiveFileData({ value: new automaticTypeDirectiveFileData(name, PackageId__from___go_module.$copy(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.PackageId)) }), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) },
                            packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$copy(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.PackageId))
                        })));
                    }
                    else {
                        __gotots_slice_build_21 = goSliceAllocate<resolvedRef__from_compiler$Storage>(__gotots_slice_build_22, RuntimeSlice.$grownCapacity(__gotots_slice_build_20.capacity, __gotots_slice_build_22));
                        for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_20.length; __gotots_slice_build_23++) {
                            __gotots_slice_build_21.set(__gotots_slice_build_23, resolvedRef.$storageOf(resolvedRef.$copy(resolvedRef.$fromStorage(__gotots_slice_build_20.get(__gotots_slice_build_23)))));
                        }
                        __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, resolvedRef.$storageOf(resolvedRef.$fromStorage({
                            fileName: ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolvedFileName,
                            increaseDepth: ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.IsExternalLibraryImport,
                            elideOnDepth: false,
                            includeReason: { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindAutomaticTypeDirectiveFile$int), new $goInterfaceAdapter$PointerTo_Named_compiler$automaticTypeDirectiveFileData({ value: new automaticTypeDirectiveFileData(name, PackageId__from___go_module.$copy(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.PackageId)) }), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) },
                            packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$copy(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.PackageId))
                        })));
                        for (let __gotots_slice_build_23 = __gotots_slice_build_22; __gotots_slice_build_23 < __gotots_slice_build_21.capacity; __gotots_slice_build_23++) {
                            __gotots_slice_build_21.$initialize(__gotots_slice_build_23, resolvedRef.$storageOf(resolvedRef.$zero()));
                        }
                    }
                    toParse = __gotots_slice_build_21;
                }
                else {
                    pDiagnostics = pDiagnostics.append(void 0, [
                        { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(new Path__from_tspath(""), { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindAutomaticTypeDirectiveFile$int), new $goInterfaceAdapter$PointerTo_Named_compiler$automaticTypeDirectiveFileData({ value: new automaticTypeDirectiveFileData(name, PackageId__from___go_module.$zero()) }), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) }, $state__diagnostics.Cannot_find_type_definition_file_for_0, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string(name)])) })) },
                    ]);
                }
                if (!(traceDone === undefined)) {
                    const __gotots_callee_1 = traceDone;
                    (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                }
            }
        }
        return [toParse, typeResolutionsInFile, typeResolutionsTrace, pDiagnostics];
    }
    static $go$private$compiler$resolveImportsAndModuleAugmentations(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, t: {
        value: parseTask;
    } | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    if (!(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing === undefined)) {
                        const __gotots_callee_1: (() => void) | undefined = Tracing__from_tracing.Push(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing, PhaseProgram$constant__from_tracing(), "resolveModuleNamesWorker", $goMap$MapOf_string_To_Interface_void.make(1, [["containingFileName", new $goInterfaceAdapter$string(SourceFile__from_ast.FileName((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file))]]), false);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_1);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file;
                    let meta = SourceFileMetaData__from_ast.$copy((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadata);
                    let moduleNames = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, SourceFile__from_ast.Imports(file).length + ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations.length + 2, void 0);
                    let isJavaScriptFile = IsSourceFileJS__from_ast(file);
                    let isExternalModuleFile = IsExternalModule__from_ast(file);
                    const __gotots_results_9 = projectReferenceFileMapper.$go$private$compiler$getRedirectForResolution(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.projectReferenceFileMapper, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file));
                    let redirect: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_9[0];
                    let fileName = __gotots_results_9[1];
                    let optionsForFile: {
                        value: CompilerOptions__from_core;
                    } | undefined = GetCompilerOptionsWithRedirect__from___go_module(ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config), new $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine(redirect));
                    if (isJavaScriptFile || (!((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile && (CompilerOptions__from_core.GetIsolatedModules(optionsForFile) || isExternalModuleFile))) {
                        if (Tristate_IsTrue__from_core((optionsForFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportHelpers)) {
                            let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = fileLoader.$go$private$compiler$createSyntheticImport(p, externalHelpersModuleNameText$string, file);
                            moduleNames = moduleNames.append(void 0, [specifier]);
                            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.importHelpersImportSpecifier = specifier;
                        }
                    }
                    if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindJSX$constant__from_core() || ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindTSX$constant__from_core()) {
                        let jsxImport = GetJSXRuntimeImport__from_ast(GetJSXImplicitImportBase__from_ast(optionsForFile, file), optionsForFile);
                        if (jsxImport !== "") {
                            let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = fileLoader.$go$private$compiler$createSyntheticImport(p, jsxImport, file);
                            moduleNames = moduleNames.append(void 0, [specifier]);
                            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.jsxRuntimeImportSpecifier =
                                { value: new jsxRuntimeImportSpecifier(jsxImport, specifier) };
                        }
                    }
                    let importsStart = moduleNames.length;
                    moduleNames = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(moduleNames, SourceFile__from_ast.Imports(file), void 0);
                    const __gotots_range_5 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations;
                    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                        const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_5);
                        let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
                        if (Node__from_ast.$storageOf(((imp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindStringLiteral$constant__from_ast()) {
                            moduleNames = moduleNames.append(void 0, [imp]);
                        }
                    }
                    if (moduleNames.length !== 0) {
                        let resolutionsInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined> = new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedModule.make(moduleNames.length, []));
                        let resolutionsTrace = RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>();
                        const __gotots_range_6 = moduleNames;
                        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
                            const __gotots_range_value_9 = __gotots_range_index_6;
                            const __gotots_range_value_10 = __gotots_range_6.get(__gotots_range_index_6);
                            let index = __gotots_range_value_9;
                            let entry: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_10;
                            let moduleName = Node__from_ast.Text(entry);
                            if (moduleName === "") {
                                continue;
                            }
                            let mode = getModeForUsageLocation(SourceFile__from_ast.FileName(file), SourceFileMetaData__from_ast.$copy(meta), entry, optionsForFile);
                            const __gotots_results_10 = Resolver__from___go_module.ResolveModuleName(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.resolver, moduleName, fileName, mode, new $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine(redirect));
                            let resolvedModule: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_results_10[0];
                            let trace = __gotots_results_10[1];
                            resolutionsInFile.$value.store(ModeAwareCacheKey__from___go_module.$fromStorage({
                                Name: moduleName,
                                Mode: mode
                            }), resolvedModule);
                            const __gotots_slice_build_6 = resolutionsTrace;
                            const __gotots_slice_build_7 = trace;
                            let __gotots_slice_build_8 = __gotots_slice_build_7;
                            if (__gotots_slice_build_7.length > 0) {
                                __gotots_slice_build_8 = goSliceAllocate<DiagAndArgs__from___go_module$Storage>(__gotots_slice_build_7.length, null);
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_7.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_8.set(__gotots_slice_build_11, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_slice_build_7.get(__gotots_slice_build_11)))));
                                }
                            }
                            const __gotots_slice_build_10 = __gotots_slice_build_6.length + __gotots_slice_build_8.length;
                            let __gotots_slice_build_9 = __gotots_slice_build_6;
                            if (__gotots_slice_build_10 <= __gotots_slice_build_6.capacity) {
                                __gotots_slice_build_9 = __gotots_slice_build_6.$withLength(__gotots_slice_build_10);
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.set(__gotots_slice_build_6.length + __gotots_slice_build_11, __gotots_slice_build_8.get(__gotots_slice_build_11));
                                }
                            }
                            else {
                                __gotots_slice_build_9 = goSliceAllocate<DiagAndArgs__from___go_module$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_10));
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_6.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.set(__gotots_slice_build_11, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_11)))));
                                }
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.set(__gotots_slice_build_6.length + __gotots_slice_build_11, __gotots_slice_build_8.get(__gotots_slice_build_11));
                                }
                                for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.$initialize(__gotots_slice_build_11, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$zero()));
                                }
                            }
                            resolutionsTrace = __gotots_slice_build_9;
                            if (!ResolvedModule__from___go_module.IsResolved(resolvedModule)) {
                                continue;
                            }
                            let resolvedFileName = ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName;
                            let isFromNodeModulesSearch = ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.IsExternalLibraryImport;
                            let isJsFile = !FileExtensionIsOneOf__from_tspath(resolvedFileName, $state__tspath.SupportedTSExtensionsWithJsonFlat) && projectReferenceFileMapper.$go$private$compiler$getRedirectParsedCommandLineForResolution(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.projectReferenceFileMapper, NewHasFileName__from_ast(resolvedFileName, fileLoader.$go$private$compiler$toPath(p, resolvedFileName))) === undefined;
                            let isJsFileFromNodeModules = isFromNodeModulesSearch && isJsFile && strings__from_gostdlib.Contains(resolvedFileName, "/node_modules/");
                            let importIndex = index - importsStart;
                            let shouldAddFile = moduleName !== "" && GetResolutionDiagnostic__from___go_module(optionsForFile, resolvedModule, file) === undefined && !Tristate_IsTrue__from_core((optionsForFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoResolve) && !(isJsFile && !CompilerOptions__from_core.GetAllowJS(optionsForFile)) && (importIndex < 0 || (importIndex < SourceFile__from_ast.Imports(file).length && (IsInJSFile__from_ast(SourceFile__from_ast.Imports(file).get(importIndex)) || (Node__from_ast.$storageOf(((SourceFile__from_ast.Imports(file).get(importIndex) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsJSDoc$constant__from_ast()) >>> 0 === 0)));
                            if (shouldAddFile) {
                                parseTask.$go$private$compiler$addSubTask(t, resolvedRef.$fromStorage({
                                    fileName: resolvedFileName,
                                    increaseDepth: ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.IsExternalLibraryImport,
                                    elideOnDepth: isJsFileFromNodeModules,
                                    includeReason: { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindImport$int), new $goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData({ value: new referencedFileData((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, importIndex, IfElse$PointerTo_Named_ast$Node(importIndex < 0, entry, void 0)) }), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) },
                                    packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$copy(((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.PackageId))
                                }), void 0);
                            }
                        }
                        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolutionsInFile = resolutionsInFile;
                        (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.resolutionsTrace = resolutionsTrace;
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
    static $go$private$compiler$resolveLibrary(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, libraryName: gostring, resolveFrom: gostring): [
        tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined,
        RuntimeSlice<DiagAndArgs__from___go_module$Storage>
    ] {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: [
            tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined,
            RuntimeSlice<DiagAndArgs__from___go_module$Storage>
        ] = [void 0, RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>()];
        try {
            try {
                __gotots_return_block_0: {
                    {
                        let tr: {
                            value: Tracing__from_tracing;
                        } | undefined = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing;
                        if (!(tr === undefined)) {
                            const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push(tr, PhaseProgram$constant__from_tracing(), "resolveLibrary", $goMap$MapOf_string_To_Interface_void.make(1, [["resolveFrom", new $goInterfaceAdapter$string(resolveFrom)]]), false);
                            const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                            __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                            });
                        }
                    }
                    __gotots_return_0 = Resolver__from___go_module.ResolveModuleName(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.resolver, libraryName, resolveFrom, ModuleKindCommonJS$constant__from_core(), void 0);
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
    static $go$private$compiler$resolveTripleslashPathReference(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, moduleName: gostring, containingFile: gostring, index: int): [
        resolvedRef | undefined,
        {
            value: processingDiagnostic;
        } | undefined
    ] {
        let basePath = GetDirectoryPath__from_tspath(containingFile);
        let referencedFileName = moduleName;
        if (!IsRootedDiskPath__from_tspath(moduleName)) {
            referencedFileName = CombinePaths__from_tspath(basePath, RuntimeSlice.literal<gostring>([moduleName]));
        }
        let normalizedFileName = NormalizePath__from_tspath(referencedFileName);
        let includeReason: {
            value: FileIncludeReason;
        } | undefined = { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindReferenceFile$int), new $goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData({ value: new referencedFileData(fileLoader.$go$private$compiler$toPath(p, containingFile), index, void 0) }), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) };
        const __gotots_results_6 = fileLoader.$go$private$compiler$getSourceFileFromReference(p, normalizedFileName, moduleName, containingFile, includeReason);
        let resolvedFileName = __gotots_results_6[0];
        let diagnostic: sourceFileFromReferenceDiagnostic | undefined = __gotots_results_6[1];
        if (!(diagnostic === undefined)) {
            return [void 0, { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(new Path__from_tspath(""), includeReason, (diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).message, (diagnostic ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).args) })) },
            ];
        }
        return [resolvedRef.$fromStorage({
                fileName: resolvedFileName,
                includeReason: includeReason,
                increaseDepth: false,
                elideOnDepth: false,
                packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$zero())
            }), void 0];
    }
    static $go$private$compiler$resolveTypeReferenceDirectives(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, t: {
        value: parseTask;
    } | undefined): void {
        const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_0: GoPanic | undefined = undefined;
        try {
            try {
                __gotots_return_block_0: {
                    let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.file;
                    if (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives.length === 0) {
                        break __gotots_return_block_0;
                    }
                    if (!(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing === undefined)) {
                        const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing, PhaseProgram$constant__from_tracing(), "resolveTypeReferenceDirectiveNamesWorker", $goMap$MapOf_string_To_Interface_void.make(1, [["containingFileName", new $goInterfaceAdapter$string(SourceFile__from_ast.FileName(file))]]), false);
                        const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                        __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                            __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                        });
                    }
                    let meta = SourceFileMetaData__from_ast.$copy((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.metadata);
                    let typeResolutionsInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined> = new ModeAwareCache__from___go_module($goMap$MapOf_Named___go_module$ModeAwareCacheKey_To_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.make(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives.length, []));
                    let typeResolutionsTrace = RuntimeSlice.nil<DiagAndArgs__from___go_module$Storage>();
                    const __gotots_range_4 = ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives;
                    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                        const __gotots_range_value_6 = __gotots_range_index_4;
                        const __gotots_range_value_7 = __gotots_range_4.get(__gotots_range_index_4);
                        let index = __gotots_range_value_6;
                        let ref: {
                            value: FileReference__from_ast;
                        } | undefined = __gotots_range_value_7;
                        const __gotots_results_7 = projectReferenceFileMapper.$go$private$compiler$getRedirectForResolution(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.projectReferenceFileMapper, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file));
                        let redirect: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_7[0];
                        let fileName = __gotots_results_7[1];
                        let resolutionMode = getModeForTypeReferenceDirectiveInFile(ref, file, SourceFileMetaData__from_ast.$copy(meta), GetCompilerOptionsWithRedirect__from___go_module(ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Config), new $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine(redirect)));
                        const __gotots_results_8 = Resolver__from___go_module.ResolveTypeReferenceDirective(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.resolver, (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName, fileName, resolutionMode, new $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine(redirect));
                        let resolved: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined = __gotots_results_8[0];
                        let trace = __gotots_results_8[1];
                        let traceDone: (() => void) | undefined;
                        if (!(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing === undefined)) {
                            traceDone = Tracing__from_tracing.Push(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Tracing, PhaseProgram$constant__from_tracing(), "processTypeReferenceDirective", $goMap$MapOf_string_To_Interface_void.make(4, [["directive", new $goInterfaceAdapter$string((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName)], ["hasResolved", new $goInterfaceAdapter$bool(ResolvedTypeReferenceDirective__from___go_module.IsResolved(resolved))], ["refKind", new GoInterfaceAdapter(2)], ["refPath", new $goInterfaceAdapter$string((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path.$value)]]), false);
                        }
                        typeResolutionsInFile.$value.store(ModeAwareCacheKey__from___go_module.$fromStorage({
                            Name: (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName,
                            Mode: resolutionMode
                        }), resolved);
                        let includeReason: {
                            value: FileIncludeReason;
                        } | undefined = { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindTypeReferenceDirective$int), new $goInterfaceAdapter$PointerTo_Named_compiler$referencedFileData({ value: new referencedFileData((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, index, void 0) }), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) };
                        const __gotots_slice_build_0 = typeResolutionsTrace;
                        const __gotots_slice_build_1 = trace;
                        let __gotots_slice_build_2 = __gotots_slice_build_1;
                        if (__gotots_slice_build_1.length > 0) {
                            __gotots_slice_build_2 = goSliceAllocate<DiagAndArgs__from___go_module$Storage>(__gotots_slice_build_1.length, null);
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_1.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_2.set(__gotots_slice_build_5, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_slice_build_1.get(__gotots_slice_build_5)))));
                            }
                        }
                        const __gotots_slice_build_4 = __gotots_slice_build_0.length + __gotots_slice_build_2.length;
                        let __gotots_slice_build_3 = __gotots_slice_build_0;
                        if (__gotots_slice_build_4 <= __gotots_slice_build_0.capacity) {
                            __gotots_slice_build_3 = __gotots_slice_build_0.$withLength(__gotots_slice_build_4);
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                            }
                        }
                        else {
                            __gotots_slice_build_3 = goSliceAllocate<DiagAndArgs__from___go_module$Storage>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_4));
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_0.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.set(__gotots_slice_build_5, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$copy(DiagAndArgs__from___go_module.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_5)))));
                            }
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                            }
                            for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.$initialize(__gotots_slice_build_5, DiagAndArgs__from___go_module.$storageOf(DiagAndArgs__from___go_module.$zero()));
                            }
                        }
                        typeResolutionsTrace = __gotots_slice_build_3;
                        if (ResolvedTypeReferenceDirective__from___go_module.IsResolved(resolved)) {
                            parseTask.$go$private$compiler$addSubTask(t, resolvedRef.$fromStorage({
                                fileName: ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.ResolvedFileName,
                                increaseDepth: ((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.IsExternalLibraryImport,
                                elideOnDepth: false,
                                includeReason: includeReason,
                                packageId: PackageId__from___go_module.$storageOf(PackageId__from___go_module.$copy(((resolved ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module>).value.PackageId))
                            }), void 0);
                        }
                        else {
                            (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics = (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processingDiagnostics.append(void 0, [
                                { value: new processingDiagnostic(processingDiagnosticKindUnknownReference$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$FileIncludeReason(includeReason)) },
                            ]);
                        }
                        if (!(traceDone === undefined)) {
                            const __gotots_callee_1 = traceDone;
                            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                        }
                    }
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeResolutionsInFile = typeResolutionsInFile;
                    (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.typeResolutionsTrace = typeResolutionsTrace;
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
    static $go$private$compiler$sortLibs(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, libFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): void {
        SortFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile(libFiles, (f1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, f2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int => {
            return Compare$int(fileLoader.$go$private$compiler$getDefaultLibFilePriority(p, f1), fileLoader.$go$private$compiler$getDefaultLibFilePriority(p, f2));
        });
    }
    static $go$private$compiler$toPath(p: tsonicTypeScriptRuntime.Location<fileLoader> | undefined, file: gostring): Path__from_tspath {
        const __gotots_argument_14 = file;
        const __gotots_receiver_19 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
        const __gotots_argument_15 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_19).GetCurrentDirectory();
        const __gotots_receiver_20 = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<fileLoader>).value.opts.Host;
        const __gotots_receiver_21 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_20).FS();
        const __gotots_argument_16 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_21).UseCaseSensitiveFileNames();
        return ToPath__from_tspath(__gotots_argument_14, __gotots_argument_15, __gotots_argument_16);
    }
}
export class redirectsFile {
    declare private readonly $goType: void;
    public constructor(public index: int, public fileName: gostring, public path: Path__from_tspath, public target: Path__from_tspath) {
    }
    declare private readonly then?: never;
    static FileName(r: redirectsFile | undefined): gostring {
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileName;
    }
    static Path(r: redirectsFile | undefined): Path__from_tspath {
        return (r ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).path;
    }
}
export class DuplicateSourceFile {
    declare private readonly $goType: void;
    public constructor(public ParseOptions: SourceFileParseOptions__from_ast, public Hash: Uint128__from_xxh3, public ScriptKind: ScriptKind__from_core) {
    }
    static $copy($source: DuplicateSourceFile): DuplicateSourceFile {
        return new DuplicateSourceFile(SourceFileParseOptions__from_ast.$copy($source.ParseOptions), Uint128__from_xxh3.$copy($source.Hash), $source.ScriptKind);
    }
    static $equal($left: DuplicateSourceFile, $right: DuplicateSourceFile): bool {
        return SourceFileParseOptions__from_ast.$equal($left.ParseOptions, $right.ParseOptions) && Uint128__from_xxh3.$equal($left.Hash, $right.Hash) && $left.ScriptKind === $right.ScriptKind;
    }
    static $hash($source: DuplicateSourceFile): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, SourceFileParseOptions__from_ast.$hash($source.ParseOptions));
        $hash = GoMapHash.mix($hash, Uint128__from_xxh3.$hash($source.Hash));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ScriptKind));
        return $hash;
    }
    declare private readonly then?: never;
}
export class processedFiles {
    declare private readonly $goType: void;
    public constructor(public resolver: {
        value: Resolver__from___go_module;
    } | undefined, public files: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, public duplicateSourceFiles: RuntimeSlice<{
        value: DuplicateSourceFile;
    } | undefined>, public filesByPath: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, public projectReferenceFileMapper: {
        value: projectReferenceFileMapper;
    } | undefined, public missingFiles: RuntimeSlice<gostring>, public resolvedModules: GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>>, public typeResolutionsInFile: GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>>, public sourceFileMetaDatas: GoMapValue<Path__from_tspath, SourceFileMetaData__from_ast>, public jsxRuntimeImportSpecifiers: GoMapValue<Path__from_tspath, {
        value: jsxRuntimeImportSpecifier;
    } | undefined>, public importHelpersImportSpecifiers: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, public libFiles: GoMapValue<Path__from_tspath, {
        value: LibFile;
    } | undefined>, public sourceFilesFoundSearchingNodeModules: Set__from_collections<Path__from_tspath>, public includeProcessor: {
        value: includeProcessor;
    } | undefined, public outputFileToProjectReferenceSource: GoMapValue<Path__from_tspath, gostring>, public redirectTargetsMap: GoMapValue<Path__from_tspath, RuntimeSlice<gostring>>, public redirectFilesByPath: GoMapValue<Path__from_tspath, redirectsFile | undefined>, public finishedProcessing: bool) {
    }
    static $zero(): processedFiles {
        return new processedFiles(void 0, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(), RuntimeSlice.nil<{
            value: DuplicateSourceFile;
        } | undefined>(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile.nil(), void 0, RuntimeSlice.nil<gostring>(), $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedModule.nil(), $goMap$MapOf_Named_tspath$Path_To_Named___go_module$ModeAwareCacheOf_PointerTo_Named___go_module$ResolvedTypeReferenceDirective.nil(), $goMap$MapOf_Named_tspath$Path_To_Named_ast$SourceFileMetaData.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$jsxRuntimeImportSpecifier.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$Node.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$LibFile.nil(), Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
            return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
        }), void 0, $goMap$MapOf_Named_tspath$Path_To_string.nil(), $goMap$MapOf_Named_tspath$Path_To_SliceOf_string.nil(), $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile.nil(), false);
    }
    static $copy($source: processedFiles): processedFiles {
        return new processedFiles($source.resolver, $source.files, $source.duplicateSourceFiles, $source.filesByPath, $source.projectReferenceFileMapper, $source.missingFiles, $source.resolvedModules, $source.typeResolutionsInFile, $source.sourceFileMetaDatas, $source.jsxRuntimeImportSpecifiers, $source.importHelpersImportSpecifiers, $source.libFiles, Set__from_collections.$copy<Path__from_tspath>($source.sourceFilesFoundSearchingNodeModules), $source.includeProcessor, $source.outputFileToProjectReferenceSource, $source.redirectTargetsMap, $source.redirectFilesByPath, $source.finishedProcessing);
    }
    declare private readonly then?: never;
}
export class jsxRuntimeImportSpecifier {
    declare private readonly $goType: void;
    public constructor(public moduleReference: gostring, public specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    static $copy($source: jsxRuntimeImportSpecifier): jsxRuntimeImportSpecifier {
        return new jsxRuntimeImportSpecifier($source.moduleReference, $source.specifier);
    }
    static $equal($left: jsxRuntimeImportSpecifier, $right: jsxRuntimeImportSpecifier): bool {
        return $left.moduleReference === $right.moduleReference &&
            tsonicTypeScriptRuntime.sameLocation($left.specifier, $right.specifier);
    }
    static $hash($source: jsxRuntimeImportSpecifier): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.moduleReference));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.specifier));
        return $hash;
    }
    declare private readonly then?: never;
}
export function processAllProgramFiles(opts: ProgramOptions, singleThreaded: bool): processedFiles {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: processedFiles = processedFiles.$zero();
    try {
        try {
            __gotots_return_block_0: {
                let compilerOptions: {
                    value: CompilerOptions__from_core;
                } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions(opts.Config);
                let rootFiles = ParsedCommandLine__from_tsoptions.FileNames(opts.Config);
                let supportedExtensions = GetSupportedExtensions__from_tsoptions(compilerOptions, RuntimeSlice.nil<FileExtensionInfo__from_tsoptions$Storage>());
                let supportedExtensionsWithJsonIfResolveJsonModule = GetSupportedExtensionsWithJsonIfResolveJsonModule__from_tsoptions(compilerOptions, supportedExtensions);
                let maxNodeModuleJsDepth = 0;
                {
                    let p: tsonicTypeScriptRuntime.Location<int> | undefined = (ParsedCommandLine__from_tsoptions.CompilerOptions(opts.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MaxNodeModuleJsDepth;
                    if (!(p === undefined)) {
                        maxNodeModuleJsDepth =
                            ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<int>).value;
                    }
                }
                const __gotots_field_2 = ProgramOptions.$copy(opts);
                const __gotots_receiver_0 = opts.Host;
                const __gotots_argument_0 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_0).DefaultLibraryPath();
                const __gotots_receiver_1 = opts.Host;
                const __gotots_argument_1 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_1).GetCurrentDirectory();
                const __gotots_field_3 = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_0, __gotots_argument_1);
                const __gotots_receiver_2 = opts.Host;
                const __gotots_receiver_3 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_2).FS();
                const __gotots_field_0 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_3).UseCaseSensitiveFileNames();
                const __gotots_receiver_4 = opts.Host;
                const __gotots_field_1 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_4).GetCurrentDirectory();
                const __gotots_field_4 = new ComparePathsOptions__from_tspath(__gotots_field_0, __gotots_field_1);
                let loader = new fileLoader(__gotots_field_2, void 0, __gotots_field_3, __gotots_field_4, supportedExtensions, supportedExtensionsWithJsonIfResolveJsonModule, { value: new filesParser(NewWorkGroup__from_core(singleThreaded), SyncMap__from_collections.$zero<Path__from_tspath, {
                        value: parseTaskData;
                    } | undefined>(), maxNodeModuleJsDepth) }, RuntimeSlice.make<{
                    value: parseTask;
                } | undefined>(0, rootFiles.length + (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib.length, void 0), named_sync_atomic.SyncAtomicInt32Operations.$zero(), named_sync_atomic.SyncAtomicInt32Operations.$zero(), named_sync.SyncMutexOperations.$zero(), NodeFactory__from_ast.$zero(), void 0, Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                    return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
                }), SyncMap__from_collections.$zero<gostring, {
                    value: LibFile;
                } | undefined>(), SyncMap__from_collections.$zero<Path__from_tspath, {
                    value: libResolution;
                } | undefined>());
                const loader$location = tsonicTypeScriptRuntime.boundLocation({}, () => loader, loader$next => loader = loader$next);
                fileLoader.$go$private$compiler$addProjectReferenceTasks(loader$location, singleThreaded);
                loader.resolver = NewResolver__from___go_module((loader.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host, compilerOptions, opts.TypingsLocation, opts.ProjectName);
                if (!(opts.Tracing === undefined)) {
                    const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push(opts.Tracing, PhaseProgram$constant__from_tracing(), "processRootFiles", $goMap$MapOf_string_To_Interface_void.make(1, [["count", new GoInterfaceAdapter(rootFiles.length)]]), false);
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    });
                }
                const __gotots_range_0 = rootFiles;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = __gotots_range_index_0;
                    const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
                    let index = __gotots_range_value_0;
                    let rootFile = __gotots_range_value_1;
                    fileLoader.$go$private$compiler$addRootFileTask(loader$location, rootFile, void 0, { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindRootFile$int), new GoInterfaceAdapter(index), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) });
                }
                if (rootFiles.length > 0 && Tristate_IsFalseOrUnknown__from_core((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoLib)) {
                    if ((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib.isNil()) {
                        let name = GetDefaultLibFileName__from_tsoptions(compilerOptions);
                        let libFile: {
                            value: LibFile;
                        } | undefined = fileLoader.$go$private$compiler$pathForLibFile(loader$location, name);
                        fileLoader.$go$private$compiler$addRootTask(loader$location, (libFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, libFile, { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindLibFile$int), void 0, void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) });
                    }
                    else {
                        const __gotots_range_1 = (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib;
                        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                            const __gotots_range_value_2 = __gotots_range_index_1;
                            const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_1);
                            let index = __gotots_range_value_2;
                            let lib = __gotots_range_value_3;
                            {
                                const __gotots_results_0 = GetLibFileName__from_tsoptions(lib);
                                let name = __gotots_results_0[0];
                                let ok = __gotots_results_0[1];
                                if (ok) {
                                    let libFile: {
                                        value: LibFile;
                                    } | undefined = fileLoader.$go$private$compiler$pathForLibFile(loader$location, name);
                                    fileLoader.$go$private$compiler$addRootTask(loader$location, (libFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.path, libFile, { value: new FileIncludeReason(new fileIncludeKind(fileIncludeKindLibFile$int), new GoInterfaceAdapter(index), void 0, named_sync.SyncOnceOperations.$zero(), void 0, named_sync.SyncOnceOperations.$zero()) });
                                }
                            }
                        }
                    }
                }
                if (rootFiles.length > 0) {
                    fileLoader.$go$private$compiler$addAutomaticTypeDirectiveTasks(loader$location);
                }
                filesParser.$go$private$compiler$parse(loader.filesParser, loader$location, loader.rootTasks);
                (loader.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.loader = void 0;
                (loader.projectReferenceFileMapper ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.host = void 0;
                __gotots_return_0 = filesParser.$go$private$compiler$getProcessedFiles(loader.filesParser, loader$location);
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
export const externalHelpersModuleNameText$string: gostring = "tslib";
export function getLibraryNameFromLibFileName(libFileName: gostring): gostring {
    let components = strings__from_gostdlib.Split(libFileName, ".");
    let path = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.WriteString(path, "@typescript/lib-");
    if (components.length > 1) {
        strings__from_gostdlib.Builder.WriteString(path, components.get(1));
    }
    let i = 2;
    for (; i < components.length && components.get(i) !== "" && components.get(i) !== "d";) {
        if (i === 2) {
            strings__from_gostdlib.Builder.WriteByte(path, 47);
        }
        else {
            strings__from_gostdlib.Builder.WriteByte(path, 45);
        }
        strings__from_gostdlib.Builder.WriteString(path, components.get(i));
        i++;
    }
    return strings__from_gostdlib.Builder.String(path);
}
export function getInferredLibraryNameResolveFrom(options: {
    value: CompilerOptions__from_core;
} | undefined, currentDirectory: gostring, libFileName: gostring): gostring {
    let containingDirectory = "";
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "") {
        containingDirectory = GetDirectoryPath__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath);
    }
    else {
        containingDirectory = currentDirectory;
    }
    return CombinePaths__from_tspath(containingDirectory, RuntimeSlice.literal<gostring>(["__lib_node_modules_lookup_" + libFileName + "__.ts"]));
}
export function getModeForTypeReferenceDirectiveInFile(ref: {
    value: FileReference__from_ast;
} | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, meta: SourceFileMetaData__from_ast, options: {
    value: CompilerOptions__from_core;
} | undefined): ModuleKind__from_core {
    if (!((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode === ResolutionModeNone$constant__from_core())) {
        return (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode;
    }
    else {
        return getDefaultResolutionModeForFile(SourceFile__from_ast.FileName(file), SourceFileMetaData__from_ast.$copy(meta), options);
    }
}
export function getDefaultResolutionModeForFile(fileName: gostring, meta: SourceFileMetaData__from_ast, options: {
    value: CompilerOptions__from_core;
} | undefined): ModuleKind__from_core {
    if (importSyntaxAffectsModuleResolution(options)) {
        return GetImpliedNodeFormatForEmitWorker__from_ast(fileName, CompilerOptions__from_core.GetEmitModuleKind(options), SourceFileMetaData__from_ast.$copy(meta));
    }
    else {
        return ResolutionModeNone$constant__from_core();
    }
}
export function getModeForUsageLocation(fileName: gostring, meta: SourceFileMetaData__from_ast, usage: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): ModuleKind__from_core {
    if (IsImportDeclaration__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSImportDeclaration$constant__from_ast() || IsExportDeclaration__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) || IsJSDocImportTag__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        let isTypeOnly = IsExclusivelyTypeOnlyImportOrExport__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
        if (isTypeOnly) {
            let __go_override = 0;
            let ok = false;
            switch (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindImportDeclaration$constant__from_ast():
                case KindJSImportDeclaration$constant__from_ast(): {
                    const __gotots_results_12 = Node__from_ast.GetResolutionModeOverride((Node__from_ast.AsImportDeclaration(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                    __go_override = __gotots_results_12[0];
                    ok = __gotots_results_12[1];
                    break;
                }
                case KindExportDeclaration$constant__from_ast(): {
                    const __gotots_results_13 = Node__from_ast.GetResolutionModeOverride((Node__from_ast.AsExportDeclaration(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                    __go_override = __gotots_results_13[0];
                    ok = __gotots_results_13[1];
                    break;
                }
                case KindJSDocImportTag$constant__from_ast(): {
                    const __gotots_results_14 = Node__from_ast.GetResolutionModeOverride((Node__from_ast.AsJSDocImportTag(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                    __go_override = __gotots_results_14[0];
                    ok = __gotots_results_14[1];
                    break;
                }
            }
            if (ok) {
                return __go_override;
            }
        }
    }
    if (IsLiteralTypeNode__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsImportTypeNode__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        {
            const __gotots_results_15 = Node__from_ast.GetResolutionModeOverride((Node__from_ast.AsImportTypeNode(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
            let __go_override = __gotots_results_15[0];
            let ok = __gotots_results_15[1];
            if (ok) {
                return __go_override;
            }
        }
    }
    if (!(options === undefined) && importSyntaxAffectsModuleResolution(options)) {
        return getEmitSyntaxForUsageLocationWorker(fileName, SourceFileMetaData__from_ast.$copy(meta), usage, options);
    }
    return ResolutionModeNone$constant__from_core();
}
export function importSyntaxAffectsModuleResolution(options: {
    value: CompilerOptions__from_core;
} | undefined): bool {
    let moduleResolution = CompilerOptions__from_core.GetModuleResolutionKind(options);
    return ModuleResolutionKindNode16$constant__from_core() <= moduleResolution && moduleResolution <= ModuleResolutionKindNodeNext$constant__from_core() || CompilerOptions__from_core.GetResolvePackageJsonExports(options) || CompilerOptions__from_core.GetResolvePackageJsonImports(options);
}
export function getEmitSyntaxForUsageLocationWorker(fileName: gostring, meta: SourceFileMetaData__from_ast, usage: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): ModuleKind__from_core {
    if (IsRequireCall__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, false) || IsExternalModuleReference__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) && IsImportEqualsDeclaration__from_ast(Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
        return ModuleKindCommonJS$constant__from_core();
    }
    let fileEmitMode = GetEmitModuleFormatOfFileWorker__from_ast(fileName, options, SourceFileMetaData__from_ast.$copy(meta));
    if (IsImportCall__from_ast(WalkUpParenthesizedExpressions__from_ast(Node__from_ast.$storageOf(((usage ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent))) {
        if (ShouldTransformImportCall__from_ast(fileName, options, fileEmitMode)) {
            return ModuleKindCommonJS$constant__from_core();
        }
        else {
            return ModuleKindESNext$constant__from_core();
        }
    }
    if (fileEmitMode === ModuleKindCommonJS$constant__from_core()) {
        return ModuleKindCommonJS$constant__from_core();
    }
    else {
        if (ModuleKind_IsNonNodeESM__from_core(fileEmitMode) || fileEmitMode === ModuleKindPreserve$constant__from_core()) {
            return ModuleKindESNext$constant__from_core();
        }
    }
    return ModuleKindNone$constant__from_core();
}
