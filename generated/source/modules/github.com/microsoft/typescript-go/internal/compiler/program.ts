import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { CheckJsDirective as CheckJsDirective__from_ast, FileReference as FileReference__from_ast, HasFileName as HasFileName__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, SourceFileMetaData as SourceFileMetaData__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core, ModuleResolutionKind as ModuleResolutionKind__from_core, ProjectReference as ProjectReference__from_core, Tristate as Tristate__from_core, WorkGroup as WorkGroup__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { ModeAwareCache as ModeAwareCache__from___go_module, ResolvedTypeReferenceDirective as ResolvedTypeReferenceDirective__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { Expected as Expected__from_packagejson, JSONValue$Storage as JSONValue__from_packagejson$Storage, PackageJson as PackageJson__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { EmitTextWriter as EmitTextWriter__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { RawSourceMap as RawSourceMap__from_sourcemap } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/sourcemap/package.js";
import type { FileExtensionInfo$Storage as FileExtensionInfo__from_tsoptions$Storage, SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions, TsConfigSourceFile as TsConfigSourceFile__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { FS as FS__from_vfs } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void, $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error, $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { CheckerPool } from "./checkerpool.js";
import type { EmitOnly } from "./emitter.js";
import type { DuplicateSourceFile, LibFile, jsxRuntimeImportSpecifier } from "./fileloader.js";
import type { CompilerHost } from "./host.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint32 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { CommentDirectiveKindExpectError$constant as CommentDirectiveKindExpectError$constant__from_ast, CommentDirectiveKindIgnore$constant as CommentDirectiveKindIgnore$constant__from_ast, CommentDirective as CommentDirective__from_ast, CompareDiagnostics as CompareDiagnostics__from_ast, Diagnostic as Diagnostic__from_ast, DiagnosticsCollection as DiagnosticsCollection__from_ast, EqualDiagnosticsNoRelatedInfo as EqualDiagnosticsNoRelatedInfo__from_ast, EqualDiagnostics as EqualDiagnostics__from_ast, GetEmitModuleFormatOfFileWorker as GetEmitModuleFormatOfFileWorker__from_ast, GetImpliedNodeFormatForEmitWorker as GetImpliedNodeFormatForEmitWorker__from_ast, HasDecorators as HasDecorators__from_ast, IsArrayLiteralExpression as IsArrayLiteralExpression__from_ast, IsCheckJSEnabledForFile as IsCheckJSEnabledForFile__from_ast, IsDecorator as IsDecorator__from_ast, IsExternalModule as IsExternalModule__from_ast, IsObjectLiteralExpression as IsObjectLiteralExpression__from_ast, IsPlainJSFile as IsPlainJSFile__from_ast, IsSourceFileJS as IsSourceFileJS__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, IsStringLiteral as IsStringLiteral__from_ast, KindParameter$constant as KindParameter$constant__from_ast, NewCompilerDiagnostic as NewCompilerDiagnostic__from_ast, NewDiagnostic as NewDiagnostic__from_ast, NewHasFileName as NewHasFileName__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PropertyAssignment as PropertyAssignment__from_ast, SourceFileParseOptions as SourceFileParseOptions__from_ast, SourceFile as SourceFile__from_ast, SubtreeContainsDecorators$constant as SubtreeContainsDecorators$constant__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { BindSourceFile as BindSourceFile__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import { Checker as Checker__from_checker } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/checker/package.js";
import { Set as Set__from_collections, SyncMap as SyncMap__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/compiler/state.js";
import { $state as $state__core, CompilerOptions as CompilerOptions__from_core, JsxEmitReact$constant as JsxEmitReact$constant__from_core, JsxEmitReactJSX$constant as JsxEmitReactJSX$constant__from_core, JsxEmitReactJSXDev$constant as JsxEmitReactJSXDev$constant__from_core, JsxEmit_String as JsxEmit_String__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, ModuleKindAMD$constant as ModuleKindAMD$constant__from_core, ModuleKindCommonJS$constant as ModuleKindCommonJS$constant__from_core, ModuleKindES2015$constant as ModuleKindES2015$constant__from_core, ModuleKindESNext$constant as ModuleKindESNext$constant__from_core, ModuleKindNode16$constant as ModuleKindNode16$constant__from_core, ModuleKindNodeNext$constant as ModuleKindNodeNext$constant__from_core, ModuleKindPreserve$constant as ModuleKindPreserve$constant__from_core, ModuleKindSystem$constant as ModuleKindSystem$constant__from_core, ModuleKindUMD$constant as ModuleKindUMD$constant__from_core, ModuleKind_String as ModuleKind_String__from_core, ModuleResolutionKindBundler$constant as ModuleResolutionKindBundler$constant__from_core, ModuleResolutionKindClassic$constant as ModuleResolutionKindClassic$constant__from_core, ModuleResolutionKindNode10$constant as ModuleResolutionKindNode10$constant__from_core, ModuleResolutionKindNode16$constant as ModuleResolutionKindNode16$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, ModuleResolutionKind_String as ModuleResolutionKind_String__from_core, NewLineKind_GetNewLineCharacter as NewLineKind_GetNewLineCharacter__from_core, NewWorkGroup as NewWorkGroup__from_core, ResolutionModeCommonJS$constant as ResolutionModeCommonJS$constant__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core, ScriptKindDeferred$constant as ScriptKindDeferred$constant__from_core, ScriptKindExternal$constant as ScriptKindExternal$constant__from_core, ScriptKindJS$constant as ScriptKindJS$constant__from_core, ScriptKindJSX$constant as ScriptKindJSX$constant__from_core, ScriptKindTS$constant as ScriptKindTS$constant__from_core, ScriptKindTSX$constant as ScriptKindTSX$constant__from_core, ScriptTargetES5$constant as ScriptTargetES5$constant__from_core, TextRange as TextRange__from_core, Tristate_DefaultIfUnknown as Tristate_DefaultIfUnknown__from_core, Tristate_IsFalseOrUnknown as Tristate_IsFalseOrUnknown__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, Tristate_IsUnknown as Tristate_IsUnknown__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { Marshal as Marshal__from_json__package_1 } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { Locale as Locale__from_locale } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { GetCompilerOptionsWithRedirect as GetCompilerOptionsWithRedirect__from___go_module, GetPackageNameFromTypesPackageName as GetPackageNameFromTypesPackageName__from___go_module, GetTypesPackageName as GetTypesPackageName__from___go_module, ModeAwareCacheKey as ModeAwareCacheKey__from___go_module, PackageId as PackageId__from___go_module, ParsePackageName as ParsePackageName__from___go_module, ResolvedModule as ResolvedModule__from___go_module, Resolver as Resolver__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { GetPackageNameFromDirectory as GetPackageNameFromDirectory__from_modulespecifiers } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { ForEachEmittedFile as ForEachEmittedFile__from_outputpaths, GetCommonSourceDirectory as GetCommonSourceDirectory__from_outputpaths, GetComputedCommonSourceDirectory as GetComputedCommonSourceDirectory__from_outputpaths, GetOutputPathsFor as GetOutputPathsFor__from_outputpaths, OutputPaths as OutputPaths__from_outputpaths } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/outputpaths/package.js";
import { DependencyFields as DependencyFields__from_packagejson, ExportsOrImports as ExportsOrImports__from_packagejson, InfoCacheEntry as InfoCacheEntry__from_packagejson, JSONValue as JSONValue__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { ParseIsolatedEntityName as ParseIsolatedEntityName__from_parser } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/parser/package.js";
import { NewTextWriter as NewTextWriter__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ComputeLineOfPosition as ComputeLineOfPosition__from_scanner, GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetECMALineStarts as GetECMALineStarts__from_scanner, IsIdentifierText as IsIdentifierText__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { KnownSymlinks as KnownSymlinks__from_symlinks, NewKnownSymlink as NewKnownSymlink__from_symlinks } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import { PhaseBind$constant as PhaseBind$constant__from_tracing, PhaseEmit$constant as PhaseEmit$constant__from_tracing, PhaseProgram$constant as PhaseProgram$constant__from_tracing, Tracing as Tracing__from_tracing } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tracing/package.js";
import { CreateDiagnosticAtReferenceSyntax as CreateDiagnosticAtReferenceSyntax__from_tsoptions, CreateDiagnosticForNodeInSourceFile as CreateDiagnosticForNodeInSourceFile__from_tsoptions, ForEachPropertyAssignment as ForEachPropertyAssignment__from_tsoptions, ForEachTsConfigPropArray as ForEachTsConfigPropArray__from_tsoptions, GetLibFileName as GetLibFileName__from_tsoptions, GetSupportedExtensionsWithJsonIfResolveJsonModule as GetSupportedExtensionsWithJsonIfResolveJsonModule__from_tsoptions, GetSupportedExtensions as GetSupportedExtensions__from_tsoptions, ParsedCommandLine as ParsedCommandLine__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { $state as $state__tspath, CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionIsOneOf as ExtensionIsOneOf__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, GetRelativePathFromFile as GetRelativePathFromFile__from_tspath, GetRootLength as GetRootLength__from_tspath, HasExtension as HasExtension__from_tspath, HasImplementationTSFileExtension as HasImplementationTSFileExtension__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath, PathIsAbsolute as PathIsAbsolute__from_tspath, PathIsRelative as PathIsRelative__from_tspath, Path as Path__from_tspath, ResolvePath as ResolvePath__from_tspath, ToFileNameLowerCase as ToFileNameLowerCase__from_tspath, ToPath as ToPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $goDeferred$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goDeferred$void_to_void as DeferredCallableRegistry } from "../../../../../../support/deferred-callables.js";
import { OrderedMap$Entries$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { Set$Add$Named_tspath$Path, Set$Add$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Set$AddIfAbsent$Named_tspath$Path } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$AddIfAbsent.js";
import { Set$Keys$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { SyncMap$Load$PointerTo_Named_ast$SourceFile$SliceOf_PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncMap$LoadOrStore$PointerTo_Named_ast$SourceFile$SliceOf_PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$LoadOrStore.js";
import { forEachResolution$PointerTo_Named___go_module$ResolvedModule, forEachResolution$PointerTo_Named___go_module$ResolvedTypeReferenceDirective } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/compiler/forEachResolution.js";
import { Concatenate$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Concatenate.js";
import { Filter$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { FindIndex$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FindIndex.js";
import { Identity$PointerTo_Named_ast$PropertyAssignment } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { IfElse$PointerTo_Named_ast$Node, IfElse$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { Map$PointerTo_Named_compiler$emitter$PointerTo_Named_compiler$EmitResult } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { MapFiltered$PointerTo_Named_ast$SourceFile$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/MapFiltered.js";
import { Memoize$PointerTo_Named_ast$ObjectLiteralExpression, Memoize$PointerTo_Named_ast$PropertyAssignment, Memoize$PointerTo_Named_ast$SourceFile, Memoize$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Memoize.js";
import { Must$SliceOf_byte } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Must.js";
import { Some$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { Expected$GetValue$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/packagejson/Expected$GetValue.js";
import { Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/maps/Clone.js";
import { EqualFunc$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile, EqualFunc$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$Named_tspath$Path$PointerTo_Named_compiler$redirectsFile$PointerTo_Named_compiler$redirectsFile } from "../../../../../../support/generics/concretizations/maps/EqualFunc.js";
import { Values$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$Named_tspath$Path$PointerTo_Named_compiler$redirectsFile } from "../../../../../../support/generics/concretizations/maps/Values.js";
import { Clip$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/Clip.js";
import { Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic, Clone$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile } from "../../../../../../support/generics/concretizations/slices/Clone.js";
import { Collect$PointerTo_Named_compiler$redirectsFile } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { CompactFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/CompactFunc.js";
import { Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic } from "../../../../../../support/generics/concretizations/slices/Concat.js";
import { Equal$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Equal.js";
import { EqualFunc$SliceOf_PointerTo_Named_ast$FileReference$SliceOf_PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference, EqualFunc$SliceOf_PointerTo_Named_ast$Node$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/EqualFunc.js";
import { SortFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic, SortFunc$SliceOf_PointerTo_Named_compiler$redirectsFile$PointerTo_Named_compiler$redirectsFile } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$PointerTo_Named_compiler$Program, $goInterfaceAdapter$PointerTo_Named_compiler$checkerPool, $goInterfaceAdapter$PointerTo_Named_compiler$emitHost, $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic, $goInterfaceAdapter$PointerTo_Named_compiler$redirectsFile, $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine, $goInterfaceAdapter$SliceOf_byte, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$Emit$Named_context$Context_Named_compiler$EmitOptions_to_PointerTo_Named_compiler$EmitResult, $goInterfaceMethod$GetBindDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetConfigFileParsingDiagnostics$void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetDeclarationDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetGlobalDiagnostics$Named_context$Context_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetProgramDiagnostics$void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetSemanticDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetSourceFile$string_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSuggestionDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetSyntacticDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$IsSourceFileDefaultLibrary$Named_tspath$Path_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$Program$void_to_PointerTo_Named_compiler$Program } from "../../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_SliceOf_PointerTo_Named_ast$Diagnostic, $goMap$MapOf_int_To_Named_ast$CommentDirective, $goMap$MapOf_string_To_Interface_void, $goMap$MapOf_string_To_Struct_void } from "../../../../../../support/maps.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { EmitTextWriter$contract, EmitTextWriter$is } from "../printer/emittextwriter.js";
import { checkerPool, newCheckerPoolWithTracing } from "./checkerpool.js";
import { emitHost, newEmitHost } from "./emitHost.js";
import { EmitOnlyForcedDts$constant, emitter, getDeclarationDiagnostics, getSourceFilesToEmit, sourceFileMayBeEmitted } from "./emitter.js";
import { FileIncludeReason } from "./fileInclude.js";
import { getDefaultResolutionModeForFile, getEmitSyntaxForUsageLocationWorker, getModeForUsageLocation, processAllProgramFiles, processedFiles, redirectsFile } from "./fileloader.js";
import { includeProcessor, updateFileIncludeProcessor } from "./includeprocessor.js";
import { includeExplainingDiagnostic, processingDiagnostic, processingDiagnosticKindExplainingFileInclude$constant } from "./processingDiagnostic.js";
import { projectReferenceFileMapper } from "./projectreferencefilemapper.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as named_sync_atomic from "@gotots/gostdlib/internal/facets/named-sync-atomic.js";
import * as named_sync from "@gotots/gostdlib/internal/facets/named-sync.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import * as atomic__from_gostdlib from "@gotots/gostdlib/sync/atomic.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMap, GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery, goDeferPop } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice, goSliceClear } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringIndex } from "@gotots/runtime/string.js";
export class ProgramOptions {
    declare private readonly $goType: void;
    public constructor(public Host: CompilerHost | undefined, public Config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, public UseSourceOfProjectReference: bool, public SingleThreaded: Tristate__from_core, public CreateCheckerPool: (($0: {
        value: Program;
    } | undefined) => CheckerPool | undefined) | undefined, public TypingsLocation: gostring, public ProjectName: gostring, public Tracing: {
        value: Tracing__from_tracing;
    } | undefined) {
    }
    static $copy($source: ProgramOptions): ProgramOptions {
        return new ProgramOptions($source.Host, $source.Config, $source.UseSourceOfProjectReference, $source.SingleThreaded, $source.CreateCheckerPool, $source.TypingsLocation, $source.ProjectName, $source.Tracing);
    }
    declare private readonly then?: never;
    static $go$private$compiler$canUseProjectReferenceSource(p: tsonicTypeScriptRuntime.Location<ProgramOptions> | undefined): bool {
        return ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProgramOptions>).value.UseSourceOfProjectReference && !Tristate_IsTrue__from_core((ParsedCommandLine__from_tsoptions.CompilerOptions(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ProgramOptions>).value.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DisableSourceOfProjectReferenceRedirect);
    }
}
export type lazyValue$Storage<T> = {
    value: tsonicTypeScriptRuntime.Location<T> | undefined;
    once: sync__from_gostdlib.Once;
    initialized: atomic__from_gostdlib.Bool;
};
export class lazyValue<T> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: lazyValue$Storage<T>) {
    }
    public static $storageOf<T>($source: lazyValue<T>): lazyValue$Storage<T> {
        return $source.$storage;
    }
    public static $fromStorage<T>($source: lazyValue$Storage<T>): lazyValue<T> {
        return new lazyValue<T>($source);
    }
    static $zero<T>(): lazyValue<T> {
        return new lazyValue<T>({
            value: void 0,
            once: named_sync.SyncOnceOperations.$zero(),
            initialized: named_sync_atomic.SyncAtomicBoolOperations.$zero()
        });
    }
    static $copy<T>($source: lazyValue<T>): lazyValue<T> {
        return new lazyValue<T>({
            value: $source.$storage.value,
            once: named_sync.SyncOnceOperations.$copy($source.$storage.once),
            initialized: named_sync_atomic.SyncAtomicBoolOperations.$copy($source.$storage.initialized)
        });
    }
    static $equal<T>($go$equal$PointerTo_T0_PointerTo_T0_to_bool: ($0: tsonicTypeScriptRuntime.Location<T> | undefined, $1: tsonicTypeScriptRuntime.Location<T> | undefined) => bool, $left: lazyValue<T>, $right: lazyValue<T>): bool {
        return $go$equal$PointerTo_T0_PointerTo_T0_to_bool($left.$storage.value, $right.$storage.value) && named_sync.SyncOnceOperations.$equal($left.$storage.once, $right.$storage.once) && named_sync_atomic.SyncAtomicBoolOperations.$equal($left.$storage.initialized, $right.$storage.initialized);
    }
    static $hash<T>($go$hash$PointerTo_T0_to_uint32: ($0: tsonicTypeScriptRuntime.Location<T> | undefined) => uint32, $source: lazyValue<T>): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, $go$hash$PointerTo_T0_to_uint32($source.$storage.value));
        $hash = GoMapHash.mix($hash, named_sync.SyncOnceOperations.$hash($source.$storage.once));
        $hash = GoMapHash.mix($hash, named_sync_atomic.SyncAtomicBoolOperations.$hash($source.$storage.initialized));
        return $hash;
    }
    declare private readonly then?: never;
    static $go$private$compiler$getValue<T>(l: tsonicTypeScriptRuntime.Location<lazyValue<T>> | undefined, compute: (() => tsonicTypeScriptRuntime.Location<T> | undefined) | undefined): tsonicTypeScriptRuntime.Location<T> | undefined {
        sync__from_gostdlib.Once.Do(lazyValue.$storageOf(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).once, (): void => {
            if (lazyValue.$storageOf(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).value === undefined) {
                const __gotots_callee_106 = compute;
                lazyValue.$storageOf(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).value = (__gotots_callee_106 ?? GoPanic.raiseRuntime("call of nil function"))();
            }
            atomic__from_gostdlib.Bool.Store(lazyValue.$storageOf(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).initialized, true);
        });
        return lazyValue.$storageOf(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).value;
    }
    static $go$private$compiler$tryReuse<T>(l: tsonicTypeScriptRuntime.Location<lazyValue<T>> | undefined, __go_from: tsonicTypeScriptRuntime.Location<lazyValue<T>> | undefined): void {
        if (atomic__from_gostdlib.Bool.Load(lazyValue.$storageOf(((__go_from ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).initialized)) {
            lazyValue.$storageOf(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).value = lazyValue.$storageOf(((__go_from ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).value;
            atomic__from_gostdlib.Bool.Store(lazyValue.$storageOf(((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<lazyValue<T>>).value).initialized, true);
        }
    }
}
export class packageNamesInfo {
    declare private readonly $goType: void;
    public constructor(public resolved: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public unresolved: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, public deepImportPackages: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined) {
    }
    static $copy($source: packageNamesInfo): packageNamesInfo {
        return new packageNamesInfo($source.resolved, $source.unresolved, $source.deepImportPackages);
    }
    static $equal($left: packageNamesInfo, $right: packageNamesInfo): bool {
        return tsonicTypeScriptRuntime.sameLocation($left.resolved, $right.resolved)
            &&
                tsonicTypeScriptRuntime.sameLocation($left.unresolved, $right.unresolved) &&
            tsonicTypeScriptRuntime.sameLocation($left.deepImportPackages, $right.deepImportPackages);
    }
    static $hash($source: packageNamesInfo): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.resolved));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.unresolved));
        $hash = GoMapHash.mix($hash, tsonicTypeScriptRuntime.hashLocation($source.deepImportPackages));
        return $hash;
    }
    declare private readonly then?: never;
}
export class Program {
    declare private readonly $goType: void;
    public constructor(public opts: ProgramOptions, public checkerPool: CheckerPool | undefined, public compilerCheckerPool: {
        value: checkerPool;
    } | undefined, public comparePathsOptions: ComparePathsOptions__from_tspath, public processedFiles: processedFiles, public usesUriStyleNodeCoreModules: Tristate__from_core, public commonSourceDirectory: gostring, public commonSourceDirectoryOnce: sync__from_gostdlib.Once, public declarationDiagnosticCache: SyncMap__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>, public programDiagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public hasEmitBlockingDiagnostics: Set__from_collections<Path__from_tspath>, public sourceFilesToEmitOnce: sync__from_gostdlib.Once, public sourceFilesToEmit: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, public unresolvedImports: lazyValue<Set__from_collections<gostring>>, public knownSymlinks: lazyValue<KnownSymlinks__from_symlinks>, public packageNames: lazyValue<packageNamesInfo>, public hasTSFileOnce: sync__from_gostdlib.Once, public hasTSFile: bool, public packagesMapOnce: sync__from_gostdlib.Once, public packagesMap: GoMapValue<gostring, bool>) {
    }
    static $copy($source: Program): Program {
        return new Program(ProgramOptions.$copy($source.opts), $source.checkerPool, $source.compilerCheckerPool, ComparePathsOptions__from_tspath.$copy($source.comparePathsOptions), processedFiles.$copy($source.processedFiles), $source.usesUriStyleNodeCoreModules, $source.commonSourceDirectory, named_sync.SyncOnceOperations.$copy($source.commonSourceDirectoryOnce), SyncMap__from_collections.$copy<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>($source.declarationDiagnosticCache), $source.programDiagnostics, Set__from_collections.$copy<Path__from_tspath>($source.hasEmitBlockingDiagnostics), named_sync.SyncOnceOperations.$copy($source.sourceFilesToEmitOnce), $source.sourceFilesToEmit, lazyValue.$copy<Set__from_collections<gostring>>($source.unresolvedImports), lazyValue.$copy<KnownSymlinks__from_symlinks>($source.knownSymlinks), lazyValue.$copy<packageNamesInfo>($source.packageNames), named_sync.SyncOnceOperations.$copy($source.hasTSFileOnce), $source.hasTSFile, named_sync.SyncOnceOperations.$copy($source.packagesMapOnce), $source.packagesMap);
    }
    declare private readonly then?: never;
    static BindSourceFiles(p: {
        value: Program;
    } | undefined): void {
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program.SingleThreaded(p));
        const __gotots_range_15 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_15.length; __gotots_range_index_14++) {
            const __gotots_range_value_17 = __gotots_range_15.get(__gotots_range_index_14);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_17;
            if (!SourceFile__from_ast.IsBound(file)) {
                const __gotots_receiver_42 = wg;
                const __gotots_argument_345 = (): void => {
                    const __gotots_defers_1: (($go$recovery: GoRecovery) => void)[] = [];
                    let __gotots_panic_1: GoPanic | undefined = undefined;
                    try {
                        try {
                            __gotots_return_block_1: {
                                if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing === undefined)) {
                                    const __gotots_callee_97: (() => void) | undefined = Tracing__from_tracing.Push((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing, PhaseBind$constant__from_tracing(), "bindSourceFile", $goMap$MapOf_string_To_Interface_void.make(1, [["path", new GoInterfaceAdapter(SourceFile__from_ast.Path(file).$value)]]), true);
                                    const __gotots_deferred_5 = DeferredCallableRegistry.resolve(__gotots_callee_97);
                                    __gotots_defers_1.push(($go$recovery: GoRecovery): void => {
                                        __gotots_deferred_5 === undefined ? (__gotots_callee_97 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_5($go$recovery);
                                    });
                                }
                                BindSourceFile__from_binder(file);
                            }
                        }
                        catch (__gotots_caught_2) {
                            if (!(__gotots_caught_2 instanceof GoPanic)) {
                                throw __gotots_caught_2;
                            }
                            __gotots_panic_1 = __gotots_caught_2;
                        }
                    }
                    finally {
                        while (__gotots_defers_1.length !== 0) {
                            const __gotots_deferred_4 = goDeferPop(__gotots_defers_1);
                            const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                            try {
                                __gotots_deferred_4(__gotots_recovery_1);
                                if (__gotots_recovery_1.recovered()) {
                                    __gotots_panic_1 = undefined;
                                }
                            }
                            catch (__gotots_caught_3) {
                                if (!(__gotots_caught_3 instanceof GoPanic)) {
                                    throw __gotots_caught_3;
                                }
                                __gotots_panic_1 = __gotots_caught_3;
                            }
                        }
                    }
                    if (__gotots_panic_1 !== undefined) {
                        throw __gotots_panic_1;
                    }
                };
                goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_42).Queue(__gotots_argument_345);
            }
        }
        const __gotots_receiver_43 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_43).RunAndWait();
    }
    static CommandLine(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config;
    }
    static CommonSourceDirectory(p: {
        value: Program;
    } | undefined): gostring {
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commonSourceDirectoryOnce, (): void => {
            let files: (() => RuntimeSlice<gostring>) | undefined = (): RuntimeSlice<gostring> => {
                return MapFiltered$PointerTo_Named_ast$SourceFile$string((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files, (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
                    gostring,
                    bool
                ] => {
                    return [SourceFile__from_ast.FileName(file), sourceFileMayBeEmitted(file, new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), false) && !((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile];
                });
            };
            const __gotots_argument_281 = Program.Options(p);
            const __gotots_argument_282 = files;
            const __gotots_argument_283 = Program.GetCurrentDirectory(p);
            const __gotots_argument_284 = Program.UseCaseSensitiveFileNames(p);
            const __gotots_receiver_3 = p;
            const __gotots_argument_285 = ($argument0: RuntimeSlice<gostring>, $argument1: gostring): bool => {
                return Program.$go$private$compiler$checkSourceFilesBelongToPath(__gotots_receiver_3, $argument0, $argument1);
            };
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commonSourceDirectory = GetCommonSourceDirectory__from_outputpaths(__gotots_argument_281, __gotots_argument_282, __gotots_argument_283, __gotots_argument_284, __gotots_argument_285);
        });
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.commonSourceDirectory;
    }
    static DeepImportPackageNames(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return ((Program.$go$private$compiler$collectPackageNames(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<packageNamesInfo>).value.deepImportPackages;
    }
    static DuplicateSourceFiles(p: {
        value: Program;
    } | undefined): RuntimeSlice<{
        value: DuplicateSourceFile;
    } | undefined> {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.duplicateSourceFiles;
    }
    static Emit(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, options: EmitOptions): tsonicTypeScriptRuntime.Location<EmitResult> | undefined {
        const __gotots_defers_1: (($go$recovery: GoRecovery) => void)[] = [];
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: tsonicTypeScriptRuntime.Location<EmitResult> | undefined = void 0;
        try {
            try {
                __gotots_return_block_1: {
                    {
                        let tr: {
                            value: Tracing__from_tracing;
                        } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing;
                        if (!(tr === undefined)) {
                            const __gotots_callee_96: (() => void) | undefined = Tracing__from_tracing.Push(tr, PhaseEmit$constant__from_tracing(), "emit", $goMap$MapOf_string_To_Interface_void.nil(), true);
                            const __gotots_deferred_5 = DeferredCallableRegistry.resolve(__gotots_callee_96);
                            __gotots_defers_1.push(($go$recovery: GoRecovery): void => {
                                __gotots_deferred_5 === undefined ? (__gotots_callee_96 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_5($go$recovery);
                            });
                        }
                    }
                    if (!(options.EmitOnly === EmitOnlyForcedDts$constant())) {
                        let result: tsonicTypeScriptRuntime.Location<EmitResult> | undefined = HandleNoEmitOnError(ctx, new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), options.TargetSourceFile);
                        let __gotots_logical_result_2 = !(result === undefined);
                        if (!__gotots_logical_result_2) {
                            const __gotots_receiver_36 = ctx;
                            __gotots_logical_result_2 = !(goInterfaceNonNil<$goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void>(__gotots_receiver_36).Err() === undefined);
                        }
                        if (__gotots_logical_result_2) {
                            __gotots_return_1 = result;
                            break __gotots_return_block_1;
                        }
                    }
                    let newLine = NewLineKind_GetNewLineCharacter__from_core((Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NewLine);
                    const __gotots_field_5 = (): $goInterface$Interface_void | undefined => {
                        return NewTextWriter__from_printer(newLine, 0);
                    };
                    const __gotots_struct_0 = named_sync.SyncPoolOperations.$zero();
                    __gotots_struct_0.New = __gotots_field_5;
                    let writerPool: tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool> | undefined = tsonicTypeScriptRuntime.location<sync__from_gostdlib.Pool>(__gotots_struct_0);
                    let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program.SingleThreaded(p));
                    let emitters = RuntimeSlice.nil<emitter | undefined>();
                    let sourceFiles = Program.$go$private$compiler$getSourceFilesToEmit(p, options.TargetSourceFile, options.EmitOnly === EmitOnlyForcedDts$constant());
                    const __gotots_range_14 = sourceFiles;
                    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_14.length; __gotots_range_index_13++) {
                        const __gotots_range_value_16 = __gotots_range_14.get(__gotots_range_index_13);
                        let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_16;
                        let emitter__shadow_1: emitter | undefined = new emitter(void 0, options.EmitOnly, DiagnosticsCollection__from_ast.$zero(), void 0, void 0, sourceFile, EmitResult.$zero(), options.WriteFile.$value, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing);
                        emitters = emitters.append(void 0, [emitter__shadow_1]);
                        const __gotots_receiver_40 = wg;
                        const __gotots_argument_344 = (): void => {
                            let __gotots_deferred_6: (($go$recovery: GoRecovery) => void) | undefined = undefined;
                            let __gotots_panic_2: GoPanic | undefined = undefined;
                            try {
                                try {
                                    __gotots_return_block_2: {
                                        const __gotots_results_7 = newEmitHost(ctx, p, sourceFile);
                                        let host: {
                                            value: emitHost;
                                        } | undefined = __gotots_results_7[0];
                                        let done: (() => void) | undefined = __gotots_results_7[1];
                                        const __gotots_callee_98: (() => void) | undefined = done;
                                        const __gotots_deferred_7 = DeferredCallableRegistry.resolve(__gotots_callee_98);
                                        __gotots_deferred_6 = ($go$recovery: GoRecovery): void => {
                                            __gotots_deferred_7 === undefined ? (__gotots_callee_98 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_7($go$recovery);
                                        };
                                        (emitter__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host = new $goInterfaceAdapter$PointerTo_Named_compiler$emitHost(host);
                                        const __gotots_receiver_37 = writerPool;
                                        let writer: EmitTextWriter__from_printer | undefined = (($value: $goInterface$Interface_void | undefined): EmitTextWriter__from_printer | undefined => {
                                            if (!EmitTextWriter$is($value)) {
                                                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                                            }
                                            return $value;
                                        })(sync__from_gostdlib.Pool.Get(__gotots_receiver_37 === void 0 ? void 0 :
                                            (__gotots_receiver_37 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value));
                                        const __gotots_receiver_38 = writer;
                                        goInterfaceNonNil<EmitTextWriter__from_printer>(__gotots_receiver_38).Clear();
                                        (emitter__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer = writer;
                                        (emitter__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).paths = GetOutputPathsFor__from_outputpaths(sourceFile, emitHost.Options(host), new $goInterfaceAdapter$PointerTo_Named_compiler$emitHost(host), options.EmitOnly === EmitOnlyForcedDts$constant());
                                        emitter.$go$private$compiler$emit(emitter__shadow_1);
                                        (emitter__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).writer = void 0;
                                        const __gotots_receiver_39 = writerPool;
                                        sync__from_gostdlib.Pool.Put(__gotots_receiver_39 === void 0 ? void 0 :
                                            (__gotots_receiver_39 as tsonicTypeScriptRuntime.Location<sync__from_gostdlib.Pool>).value, writer);
                                    }
                                }
                                catch (__gotots_caught_5) {
                                    if (!(__gotots_caught_5 instanceof GoPanic)) {
                                        throw __gotots_caught_5;
                                    }
                                    __gotots_panic_2 = __gotots_caught_5;
                                }
                            }
                            finally {
                                if (__gotots_deferred_6 !== undefined) {
                                    const __gotots_recovery_2 = new GoRecovery(__gotots_panic_2);
                                    try {
                                        __gotots_deferred_6(__gotots_recovery_2);
                                        if (__gotots_recovery_2.recovered()) {
                                            __gotots_panic_2 = undefined;
                                        }
                                    }
                                    catch (__gotots_caught_4) {
                                        if (!(__gotots_caught_4 instanceof GoPanic)) {
                                            throw __gotots_caught_4;
                                        }
                                        __gotots_panic_2 = __gotots_caught_4;
                                    }
                                }
                            }
                            if (__gotots_panic_2 !== undefined) {
                                throw __gotots_panic_2;
                            }
                        };
                        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_40).Queue(__gotots_argument_344);
                    }
                    const __gotots_receiver_41 = wg;
                    goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_41).RunAndWait();
                    __gotots_return_1 = CombineEmitResults(Map$PointerTo_Named_compiler$emitter$PointerTo_Named_compiler$EmitResult(emitters, (e: emitter | undefined): tsonicTypeScriptRuntime.Location<EmitResult> | undefined => {
                        const __gotots_store_2 = (e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        return tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "emitResult");
                    }));
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_2) {
                if (!(__gotots_caught_2 instanceof GoPanic)) {
                    throw __gotots_caught_2;
                }
                __gotots_panic_1 = __gotots_caught_2;
            }
        }
        finally {
            while (__gotots_defers_1.length !== 0) {
                const __gotots_deferred_4 = goDeferPop(__gotots_defers_1);
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_4(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_3) {
                    if (!(__gotots_caught_3 instanceof GoPanic)) {
                        throw __gotots_caught_3;
                    }
                    __gotots_panic_1 = __gotots_caught_3;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static ExplainFiles(p: {
        value: Program;
    } | undefined, w: $goInterface$Interface_Method_io$Write_SliceOf_byte_to_int_Named_error | undefined, locale__shadow_1: Locale__from_locale): void {
        let toRelativeFileName: (($0: gostring) => gostring) | undefined = (fileName: gostring): gostring => {
            return GetRelativePathFromDirectory__from_tspath(Program.GetCurrentDirectory(p), fileName, ComparePathsOptions__from_tspath.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions));
        };
        let filesExplained = 0;
        let explainFile: (($0: HasFileName__from_ast | undefined) => void) | undefined = (file: HasFileName__from_ast | undefined): void => {
            const __gotots_argument_311 = w;
            const __gotots_callee_91 = toRelativeFileName;
            const __gotots_receiver_16 = file;
            const __gotots_argument_309 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_16).FileName();
            const __gotots_argument_310 = new GoInterfaceAdapter((__gotots_callee_91 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_309));
            const __gotots_argument_312 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_310]);
            provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_311), __gotots_argument_312);
            const __gotots_map_0: includeProcessor["fileIncludeReasons"] = ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.fileIncludeReasons;
            const __gotots_receiver_17 = file;
            const __gotots_map_1 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_17).Path();
            const __gotots_range_11 = __gotots_map_0.lookup(__gotots_map_1);
            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11.length; __gotots_range_index_10++) {
                const __gotots_range_value_13 = __gotots_range_11.get(__gotots_range_index_10);
                let reason: {
                    value: FileIncludeReason;
                } | undefined = __gotots_range_value_13;
                const __gotots_argument_313 = w;
                const __gotots_argument_314 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("  "), new GoInterfaceAdapter(Diagnostic__from_ast.Localize(FileIncludeReason.$go$private$compiler$toDiagnostic(reason, p, true), Locale__from_locale.$copy(locale__shadow_1)))]);
                provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_313), __gotots_argument_314);
            }
            const __gotots_receiver_19 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor;
            const __gotots_argument_315 = p;
            const __gotots_receiver_18 = file;
            const __gotots_argument_316 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_18).Path();
            const __gotots_argument_317 = toRelativeFileName;
            const __gotots_range_12 = includeProcessor.$go$private$compiler$explainRedirectAndImpliedFormat(__gotots_receiver_19, __gotots_argument_315, __gotots_argument_316, __gotots_argument_317);
            for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_12.length; __gotots_range_index_11++) {
                const __gotots_range_value_14 = __gotots_range_12.get(__gotots_range_index_11);
                let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_14;
                const __gotots_argument_318 = w;
                const __gotots_argument_319 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("  "), new GoInterfaceAdapter(Diagnostic__from_ast.Localize(diag, Locale__from_locale.$copy(locale__shadow_1)))]);
                provider_fmt_writer.FprintlnDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_318), __gotots_argument_319);
            }
            filesExplained++;
        };
        let redirectFiles = Collect$PointerTo_Named_compiler$redirectsFile(Values$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$Named_tspath$Path$PointerTo_Named_compiler$redirectsFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.redirectFilesByPath));
        SortFunc$SliceOf_PointerTo_Named_compiler$redirectsFile$PointerTo_Named_compiler$redirectsFile(redirectFiles, (a: redirectsFile | undefined, b: redirectsFile | undefined): int => {
            return (a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index - (b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index;
        });
        let files = Program.GetSourceFiles(p);
        let sourceFileIndex = 0;
        let explainSourceFiles: (($0: int) => void) | undefined = (endIndex: int): void => {
            for (; filesExplained < endIndex;) {
                const __gotots_callee_92 = explainFile;
                const __gotots_argument_320 = new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(files.get(sourceFileIndex));
                (__gotots_callee_92 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_320);
                sourceFileIndex++;
            }
        };
        const __gotots_range_13 = redirectFiles;
        for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_13.length; __gotots_range_index_12++) {
            const __gotots_range_value_15 = __gotots_range_13.get(__gotots_range_index_12);
            let redirectFile: redirectsFile | undefined = __gotots_range_value_15;
            const __gotots_callee_93 = explainSourceFiles;
            const __gotots_argument_321 = (redirectFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index;
            (__gotots_callee_93 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_321);
            const __gotots_callee_94 = explainFile;
            const __gotots_argument_322 = new $goInterfaceAdapter$PointerTo_Named_compiler$redirectsFile(redirectFile);
            (__gotots_callee_94 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_322);
        }
        const __gotots_callee_95 = explainSourceFiles;
        const __gotots_argument_323 = files.length + redirectFiles.length;
        (__gotots_callee_95 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_323);
    }
    static FileExists(p: {
        value: Program;
    } | undefined, path: gostring): bool {
        const __gotots_receiver_54 = Program.Host(p);
        const __gotots_receiver_55 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_54).FS();
        const __gotots_argument_372 = path;
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_55).FileExists(__gotots_argument_372);
    }
    static FilesByPath(p: {
        value: Program;
    } | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath;
    }
    static ForEachCheckerParallel(p: {
        value: Program;
    } | undefined, cb: (($0: int, $1: {
        value: Checker__from_checker;
    } | undefined) => void) | undefined): void {
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool === undefined)) {
            checkerPool.$go$private$compiler$forEachCheckerParallel((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool, cb);
        }
    }
    static ForEachResolvedModule(p: {
        value: Program;
    } | undefined, callback: (($0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
        forEachResolution$PointerTo_Named___go_module$ResolvedModule((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules, callback, file);
    }
    static ForEachResolvedTypeReferenceDirective(p: {
        value: Program;
    } | undefined, callback: (($0: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
        forEachResolution$PointerTo_Named___go_module$ResolvedTypeReferenceDirective((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.typeResolutionsInFile, callback, file);
    }
    static GetBindDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        if (!(sourceFile === undefined)) {
            BindSourceFile__from_binder(sourceFile);
        }
        else {
            Program.BindSourceFiles(p);
        }
        return Program.$go$private$compiler$collectDiagnostics(p, ctx, sourceFile, false, ($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            return SourceFile__from_ast.BindDiagnostics(file);
        });
    }
    static GetCheckerPool(p: {
        value: Program;
    } | undefined): CheckerPool | undefined {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool;
    }
    static GetConfigFileParsingDiagnostics(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return Clip$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(ParsedCommandLine__from_tsoptions.GetConfigFileParsingDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config));
    }
    static GetCurrentDirectory(p: {
        value: Program;
    } | undefined): gostring {
        const __gotots_receiver_4 = Program.Host(p);
        return goInterfaceNonNil<CompilerHost>(__gotots_receiver_4).GetCurrentDirectory();
    }
    static GetDeclarationDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        const __gotots_receiver_47 = p;
        const __gotots_argument_354 = ctx;
        const __gotots_argument_355 = sourceFile;
        const __gotots_argument_356 = true;
        const __gotots_receiver_46 = p;
        const __gotots_argument_357 = ($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            return Program.$go$private$compiler$getDeclarationDiagnosticsForFile(__gotots_receiver_46, $argument0, $argument1);
        };
        return Program.$go$private$compiler$collectDiagnostics(__gotots_receiver_47, __gotots_argument_354, __gotots_argument_355, __gotots_argument_356, __gotots_argument_357);
    }
    static GetDefaultLibFile(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): {
        value: LibFile;
    } | undefined {
        {
            const __gotots_results_16 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.libFiles.lookupOk(path);
            let libFile: {
                value: LibFile;
            } | undefined = __gotots_results_16[0];
            let ok = __gotots_results_16[1];
            if (ok) {
                return libFile;
            }
        }
        return void 0;
    }
    static GetDefaultResolutionModeForFile(p: {
        value: Program;
    } | undefined, sourceFile: HasFileName__from_ast | undefined): ModuleKind__from_core {
        const __gotots_receiver_56 = sourceFile;
        const __gotots_argument_373 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_56).FileName();
        const __gotots_map_8 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.sourceFileMetaDatas;
        const __gotots_receiver_57 = sourceFile;
        const __gotots_map_9 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_57).Path();
        const __gotots_argument_374 = __gotots_map_8.lookup(__gotots_map_9);
        const __gotots_argument_375 = projectReferenceFileMapper.$go$private$compiler$getCompilerOptionsForFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, sourceFile);
        return getDefaultResolutionModeForFile(__gotots_argument_373, __gotots_argument_374, __gotots_argument_375);
    }
    static GetEmitModuleFormatOfFile(p: {
        value: Program;
    } | undefined, sourceFile: HasFileName__from_ast | undefined): ModuleKind__from_core {
        const __gotots_receiver_58 = sourceFile;
        const __gotots_argument_377 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_58).FileName();
        const __gotots_argument_378 = projectReferenceFileMapper.$go$private$compiler$getCompilerOptionsForFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, sourceFile);
        const __gotots_receiver_60 = p;
        const __gotots_receiver_59 = sourceFile;
        const __gotots_argument_376 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_59).Path();
        const __gotots_argument_379 = Program.GetSourceFileMetaData(__gotots_receiver_60, __gotots_argument_376);
        return GetEmitModuleFormatOfFileWorker__from_ast(__gotots_argument_377, __gotots_argument_378, __gotots_argument_379);
    }
    static GetEmitSyntaxForUsageLocation(p: {
        value: Program;
    } | undefined, sourceFile: HasFileName__from_ast | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core {
        const __gotots_receiver_61 = sourceFile;
        const __gotots_argument_380 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_61).FileName();
        const __gotots_map_10 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.sourceFileMetaDatas;
        const __gotots_receiver_62 = sourceFile;
        const __gotots_map_11 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_62).Path();
        const __gotots_argument_381 = __gotots_map_10.lookup(__gotots_map_11);
        const __gotots_argument_382 = location;
        const __gotots_argument_383 = projectReferenceFileMapper.$go$private$compiler$getCompilerOptionsForFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, sourceFile);
        return getEmitSyntaxForUsageLocationWorker(__gotots_argument_380, __gotots_argument_381, __gotots_argument_382, __gotots_argument_383);
    }
    static GetGlobalDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        }
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool === undefined)) {
            return checkerPool.GetGlobalDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool);
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    static GetGlobalTypingsCacheLocation(p: {
        value: Program;
    } | undefined): gostring {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.TypingsLocation;
    }
    static GetImpliedNodeFormatForEmit(p: {
        value: Program;
    } | undefined, sourceFile: HasFileName__from_ast | undefined): ModuleKind__from_core {
        const __gotots_receiver_23 = sourceFile;
        const __gotots_argument_327 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_23).FileName();
        const __gotots_argument_328 = CompilerOptions__from_core.GetEmitModuleKind(projectReferenceFileMapper.$go$private$compiler$getCompilerOptionsForFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, sourceFile));
        const __gotots_receiver_25 = p;
        const __gotots_receiver_24 = sourceFile;
        const __gotots_argument_326 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_24).Path();
        const __gotots_argument_329 = Program.GetSourceFileMetaData(__gotots_receiver_25, __gotots_argument_326);
        return GetImpliedNodeFormatForEmitWorker__from_ast(__gotots_argument_327, __gotots_argument_328, __gotots_argument_329);
    }
    static GetImportHelpersImportSpecifier(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.importHelpersImportSpecifiers.lookup(path);
    }
    static GetIncludeProcessorDiagnostics(p: {
        value: Program;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        if (Program.SkipTypeChecking(p, sourceFile, false)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        }
        const __gotots_results_8 = Program.$go$private$compiler$getDiagnosticsWithPrecedingDirectives(p, sourceFile, DiagnosticsCollection__from_ast.GetDiagnosticsForFile(includeProcessor.$go$private$compiler$getDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, p), SourceFile__from_ast.FileName(sourceFile)));
        let filtered = __gotots_results_8[0];
        return filtered;
    }
    static GetJSXRuntimeImportSpecifier(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): [
        gostring,
        tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined
    ] {
        let moduleReference: gostring = "";
        let specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        {
            let result: {
                value: jsxRuntimeImportSpecifier;
            } | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.jsxRuntimeImportSpecifiers.lookup(path);
            if (!(result === undefined)) {
                return [(result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.moduleReference, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.specifier];
            }
        }
        return ["", void 0];
    }
    static GetLibFileFromReference(p: {
        value: Program;
    } | undefined, ref: {
        value: FileReference__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        const __gotots_results_21 = GetLibFileName__from_tsoptions((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName);
        let path = __gotots_results_21[0];
        let ok = __gotots_results_21[1];
        if (!ok) {
            return void 0;
        }
        {
            const __gotots_results_22 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath.lookupOk(new Path__from_tspath(path));
            let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_results_22[0];
            let ok__shadow_1 = __gotots_results_22[1];
            if (ok__shadow_1) {
                return sourceFile;
            }
        }
        return void 0;
    }
    static GetModeForUsageLocation(p: {
        value: Program;
    } | undefined, sourceFile: HasFileName__from_ast | undefined, location: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core {
        const __gotots_receiver_26 = sourceFile;
        const __gotots_argument_331 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_26).FileName();
        const __gotots_map_4 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.sourceFileMetaDatas;
        const __gotots_receiver_27 = sourceFile;
        const __gotots_map_5 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_27).Path();
        const __gotots_argument_332 = __gotots_map_4.lookup(__gotots_map_5);
        const __gotots_argument_333 = location;
        const __gotots_argument_334 = projectReferenceFileMapper.$go$private$compiler$getCompilerOptionsForFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, sourceFile);
        return getModeForUsageLocation(__gotots_argument_331, __gotots_argument_332, __gotots_argument_333, __gotots_argument_334);
    }
    static GetNearestAncestorDirectoryWithPackageJson(p: {
        value: Program;
    } | undefined, dirname: gostring): gostring {
        let scoped: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = Resolver__from___go_module.GetPackageScopeForPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolver, dirname);
        if (!(scoped === undefined) && InfoCacheEntry__from_packagejson.Exists(scoped)) {
            return (scoped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory;
        }
        return "";
    }
    static GetPackageJsonInfo(p: {
        value: Program;
    } | undefined, pkgJsonPath: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined {
        let directory = GetDirectoryPath__from_tspath(pkgJsonPath);
        let scoped: {
            value: InfoCacheEntry__from_packagejson;
        } | undefined = Resolver__from___go_module.GetPackageScopeForPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolver, directory);
        if (!(scoped === undefined) && InfoCacheEntry__from_packagejson.Exists(scoped) && (scoped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PackageDirectory === directory) {
            return scoped;
        }
        return void 0;
    }
    static GetPackagesMap(p: {
        value: Program;
    } | undefined): GoMapValue<gostring, bool> {
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packagesMapOnce, (): void => {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packagesMap = GoMap.make<gostring, bool>(false, 0, []);
            const __gotots_range_23 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules;
            const __gotots_range_keys_1 = __gotots_range_23.keys();
            for (const __gotots_range_value_30 of __gotots_range_keys_1) {
                const __gotots_range_value_31 = __gotots_range_23.lookupOk(__gotots_range_value_30);
                if (!__gotots_range_value_31[1]) {
                    continue;
                }
                const __gotots_range_value_32 = __gotots_range_value_31[0];
                let resolvedModulesInFile: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined> = __gotots_range_value_32;
                const __gotots_range_24 = resolvedModulesInFile.$value;
                const __gotots_range_keys_2 = __gotots_range_24.keys();
                for (const __gotots_range_value_33 of __gotots_range_keys_2) {
                    const __gotots_range_value_34 = __gotots_range_24.lookupOk(__gotots_range_value_33);
                    if (!__gotots_range_value_34[1]) {
                        continue;
                    }
                    const __gotots_range_value_35 = __gotots_range_value_34[0];
                    let mod: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_range_value_35;
                    if (PackageId__from___go_module.$storageOf(((mod ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.PackageId).Name !== "") {
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packagesMap.store(PackageId__from___go_module.$storageOf(((mod ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.PackageId).Name, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packagesMap.lookup(PackageId__from___go_module.$storageOf(((mod ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.PackageId).Name) || ((mod ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.Extension === ExtensionDts$string__from_tspath);
                    }
                }
            }
        });
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.packagesMap;
    }
    static GetParseFileRedirect(p: {
        value: Program;
    } | undefined, fileName: gostring): gostring {
        return projectReferenceFileMapper.$go$private$compiler$getParseFileRedirect((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, NewHasFileName__from_ast(fileName, Program.$go$private$compiler$toPath(p, fileName)));
    }
    static GetProgramDiagnostics(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return SortAndDeduplicateDiagnostics(Concatenate$PointerTo_Named_ast$Diagnostic((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics, DiagnosticsCollection__from_ast.GetGlobalDiagnostics(includeProcessor.$go$private$compiler$getDiagnostics((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, p))));
    }
    static GetProjectReferenceFromOutputDts(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined {
        return projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromOutputDts((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, path);
    }
    static GetProjectReferenceFromSource(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined {
        return projectReferenceFileMapper.$go$private$compiler$getProjectReferenceFromSource((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, path);
    }
    static GetRedirectForResolution(p: {
        value: Program;
    } | undefined, file: HasFileName__from_ast | undefined): tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined {
        const __gotots_results_17 = projectReferenceFileMapper.$go$private$compiler$getRedirectForResolution((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, file);
        let redirect: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_17[0];
        return redirect;
    }
    static GetRedirectTargets(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): RuntimeSlice<gostring> {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.redirectTargetsMap.lookup(path);
    }
    static GetResolvedModule(p: {
        value: Program;
    } | undefined, file: HasFileName__from_ast | undefined, moduleReference: gostring, mode: ModuleKind__from_core): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined {
        {
            const __gotots_map_6 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules;
            const __gotots_receiver_28 = file;
            const __gotots_map_7 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_28).Path();
            const __gotots_results_5 = __gotots_map_6.lookupOk(__gotots_map_7);
            let resolutions: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined> = __gotots_results_5[0];
            let ok = __gotots_results_5[1];
            if (ok) {
                {
                    const __gotots_results_6 = resolutions.$value.lookupOk(ModeAwareCacheKey__from___go_module.$fromStorage({
                        Name: moduleReference,
                        Mode: mode
                    }));
                    let resolved: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_results_6[0];
                    let ok__shadow_1 = __gotots_results_6[1];
                    if (ok__shadow_1) {
                        return resolved;
                    }
                }
            }
        }
        return void 0;
    }
    static GetResolvedModuleFromModuleSpecifier(p: {
        value: Program;
    } | undefined, file: HasFileName__from_ast | undefined, moduleSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined {
        if (!IsStringLiteralLike__from_ast(moduleSpecifier)) {
            const __gotots_argument_330 = new GoInterfaceAdapter("moduleSpecifier must be a StringLiteralLike");
            GoPanic.raise(__gotots_argument_330 === undefined ? GoPanicNilValue.create() : __gotots_argument_330);
        }
        let mode = Program.GetModeForUsageLocation(p, file, moduleSpecifier);
        return Program.GetResolvedModule(p, file, Node__from_ast.Text(moduleSpecifier), mode);
    }
    static GetResolvedModules(p: {
        value: Program;
    } | undefined): GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined>> {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules;
    }
    static GetResolvedProjectReferences(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined> {
        return projectReferenceFileMapper.$go$private$compiler$getResolvedProjectReferences((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper);
    }
    static GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(p: {
        value: Program;
    } | undefined, typeRef: {
        value: FileReference__from_ast;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined {
        {
            const __gotots_results_19 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.typeResolutionsInFile.lookupOk(SourceFile__from_ast.Path(sourceFile));
            let resolutions: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined> = __gotots_results_19[0];
            let ok = __gotots_results_19[1];
            if (ok) {
                {
                    const __gotots_results_20 = resolutions.$value.lookupOk(ModeAwareCacheKey__from___go_module.$fromStorage({
                        Name: (typeRef ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName,
                        Mode: Program.$go$private$compiler$getModeForTypeReferenceDirectiveInFile(p, typeRef, sourceFile)
                    }));
                    let resolved: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined = __gotots_results_20[0];
                    let ok__shadow_1 = __gotots_results_20[1];
                    if (ok__shadow_1) {
                        return resolved;
                    }
                }
            }
        }
        return void 0;
    }
    static GetResolvedTypeReferenceDirectives(p: {
        value: Program;
    } | undefined): GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined>> {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.typeResolutionsInFile;
    }
    static GetSemanticDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        const __gotots_receiver_64 = p;
        const __gotots_argument_384 = ctx;
        const __gotots_argument_385 = sourceFile;
        const __gotots_receiver_63 = p;
        const __gotots_argument_386 = ($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: {
            value: Checker__from_checker;
        } | undefined, $argument2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            return Program.$go$private$compiler$getSemanticDiagnosticsWithChecker(__gotots_receiver_63, $argument0, $argument1, $argument2);
        };
        return Program.$go$private$compiler$collectCheckerDiagnostics(__gotots_receiver_64, __gotots_argument_384, __gotots_argument_385, __gotots_argument_386);
    }
    static GetSemanticDiagnosticsWithoutNoEmitFiltering(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>> {
        const __gotots_receiver_45 = p;
        const __gotots_argument_348 = ctx;
        const __gotots_argument_349 = sourceFiles;
        const __gotots_receiver_44 = p;
        const __gotots_argument_350 = ($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: {
            value: Checker__from_checker;
        } | undefined, $argument2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            return Program.$go$private$compiler$getBindAndCheckDiagnosticsWithChecker(__gotots_receiver_44, $argument0, $argument1, $argument2);
        };
        let allDiags = Program.$go$private$compiler$collectCheckerDiagnosticsFromFiles(__gotots_receiver_45, __gotots_argument_348, __gotots_argument_349, __gotots_argument_350);
        let result: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>> = $goMap$MapOf_PointerTo_Named_ast$SourceFile_To_SliceOf_PointerTo_Named_ast$Diagnostic.make(sourceFiles.length, []);
        const __gotots_range_16 = allDiags;
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_16.length; __gotots_range_index_15++) {
            const __gotots_range_value_18 = __gotots_range_index_15;
            const __gotots_range_value_19 = __gotots_range_16.get(__gotots_range_index_15);
            let i = __gotots_range_value_18;
            let diags = __gotots_range_value_19;
            result.store(sourceFiles.get(i), SortAndDeduplicateDiagnostics(diags));
        }
        return result;
    }
    static GetSourceFile(p: {
        value: Program;
    } | undefined, filename: gostring): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        let path = Program.$go$private$compiler$toPath(p, filename);
        return Program.GetSourceFileByPath(p, path);
    }
    static GetSourceFileByPath(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath.lookup(path);
    }
    static GetSourceFileForResolvedModule(p: {
        value: Program;
    } | undefined, fileName: gostring): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program.GetSourceFile(p, fileName);
        if (file === undefined) {
            let filename = Program.GetParseFileRedirect(p, fileName);
            if (filename !== "") {
                return Program.GetSourceFile(p, filename);
            }
        }
        return file;
    }
    static GetSourceFileFromReference(p: {
        value: Program;
    } | undefined, origin: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ref: {
        value: FileReference__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined {
        let fileName = ResolvePath__from_tspath(GetDirectoryPath__from_tspath(SourceFile__from_ast.FileName(origin)), RuntimeSlice.literal<gostring>([(ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName]));
        let supportedExtensionsBase = GetSupportedExtensions__from_tsoptions(Program.Options(p), RuntimeSlice.nil<FileExtensionInfo__from_tsoptions$Storage>());
        let supportedExtensions = GetSupportedExtensionsWithJsonIfResolveJsonModule__from_tsoptions(Program.Options(p), supportedExtensionsBase);
        let allowNonTsExtensions = Tristate_IsTrue__from_core((Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowNonTsExtensions);
        if (HasExtension__from_tspath(fileName)) {
            if (!allowNonTsExtensions) {
                let canonicalFileName = GetCanonicalFileName__from_tspath(fileName, Program.UseCaseSensitiveFileNames(p));
                let supported = false;
                const __gotots_range_30 = supportedExtensions;
                for (let __gotots_range_index_21 = 0; __gotots_range_index_21 < __gotots_range_30.length; __gotots_range_index_21++) {
                    const __gotots_range_value_55 = __gotots_range_30.get(__gotots_range_index_21);
                    let group = __gotots_range_value_55;
                    if (FileExtensionIsOneOf__from_tspath(canonicalFileName, group)) {
                        supported = true;
                        break;
                    }
                }
                if (!supported) {
                    return void 0;
                }
            }
            return Program.GetSourceFileForResolvedModule(p, fileName);
        }
        if (allowNonTsExtensions) {
            let extensionless: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program.GetSourceFileForResolvedModule(p, fileName);
            if (!(extensionless === undefined)) {
                return extensionless;
            }
        }
        const __gotots_range_31 = supportedExtensions.get(0);
        for (let __gotots_range_index_22 = 0; __gotots_range_index_22 < __gotots_range_31.length; __gotots_range_index_22++) {
            const __gotots_range_value_56 = __gotots_range_31.get(__gotots_range_index_22);
            let ext = __gotots_range_value_56;
            let result: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Program.GetSourceFileForResolvedModule(p, fileName + ext);
            if (!(result === undefined)) {
                return result;
            }
        }
        return void 0;
    }
    static GetSourceFileMetaData(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): SourceFileMetaData__from_ast {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.sourceFileMetaDatas.lookup(path);
    }
    static GetSourceFiles(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
    }
    static GetSourceOfProjectReferenceIfOutputIncluded(p: {
        value: Program;
    } | undefined, file: HasFileName__from_ast | undefined): gostring {
        {
            const __gotots_map_2 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.outputFileToProjectReferenceSource;
            const __gotots_receiver_21 = file;
            const __gotots_map_3 = goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_21).Path();
            const __gotots_results_4 = __gotots_map_2.lookupOk(__gotots_map_3);
            let source = __gotots_results_4[0];
            let ok = __gotots_results_4[1];
            if (ok) {
                return source;
            }
        }
        const __gotots_receiver_22 = file;
        return goInterfaceNonNil<HasFileName__from_ast>(__gotots_receiver_22).FileName();
    }
    static GetSuggestionDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        const __gotots_receiver_35 = p;
        const __gotots_argument_341 = ctx;
        const __gotots_argument_342 = sourceFile;
        const __gotots_receiver_34 = p;
        const __gotots_argument_343 = ($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: {
            value: Checker__from_checker;
        } | undefined, $argument2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            return Program.$go$private$compiler$getSuggestionDiagnosticsWithChecker(__gotots_receiver_34, $argument0, $argument1, $argument2);
        };
        return Program.$go$private$compiler$collectCheckerDiagnostics(__gotots_receiver_35, __gotots_argument_341, __gotots_argument_342, __gotots_argument_343);
    }
    static GetSymlinkCache(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined {
        const __gotots_store_13 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return lazyValue.$go$private$compiler$getValue<KnownSymlinks__from_symlinks>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "knownSymlinks"), (): tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined => {
            let knownSymlinks: tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined = NewKnownSymlink__from_symlinks(Program.GetCurrentDirectory(p), Program.UseCaseSensitiveFileNames(p));
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules.length() > 0 || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.typeResolutionsInFile.length() > 0) {
                const __gotots_receiver_67 = knownSymlinks;
                const __gotots_receiver_65 = p;
                const __gotots_argument_387 = ($argument0: (($0: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void => {
                    Program.ForEachResolvedModule(__gotots_receiver_65, $argument0, $argument1);
                };
                const __gotots_receiver_66 = p;
                const __gotots_argument_388 = ($argument0: (($0: tsonicTypeScriptRuntime.Location<ResolvedTypeReferenceDirective__from___go_module> | undefined, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void => {
                    Program.ForEachResolvedTypeReferenceDirective(__gotots_receiver_66, $argument0, $argument1);
                };
                KnownSymlinks__from_symlinks.SetSymlinksFromResolutions(__gotots_receiver_67, __gotots_argument_387, __gotots_argument_388);
            }
            let seenPackageJsons = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
            });
            const seenPackageJsons$location = tsonicTypeScriptRuntime.boundLocation({}, () => seenPackageJsons, seenPackageJsons$next => seenPackageJsons = seenPackageJsons$next);
            const __gotots_range_25 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.sourceFileMetaDatas;
            const __gotots_range_keys_3 = __gotots_range_25.keys();
            for (const __gotots_range_value_36 of __gotots_range_keys_3) {
                const __gotots_range_value_37 = __gotots_range_25.lookupOk(__gotots_range_value_36);
                if (!__gotots_range_value_37[1]) {
                    continue;
                }
                const __gotots_range_value_38 = __gotots_range_value_36;
                const __gotots_range_value_39 = __gotots_range_value_37[0];
                let filePath = __gotots_range_value_38;
                let meta = __gotots_range_value_39;
                if (meta.PackageJsonDirectory === "" || !Program.SourceFileMayBeEmitted(p, Program.GetSourceFileByPath(p, filePath), false) || !Set$AddIfAbsent$Named_tspath$Path(seenPackageJsons$location, Program.$go$private$compiler$toPath(p, meta.PackageJsonDirectory))) {
                    continue;
                }
                let packageJsonName = CombinePaths__from_tspath(meta.PackageJsonDirectory, RuntimeSlice.literal<gostring>(["package.json"]));
                let info: {
                    value: InfoCacheEntry__from_packagejson;
                } | undefined = Program.GetPackageJsonInfo(p, packageJsonName);
                if (InfoCacheEntry__from_packagejson.GetContents(info) === undefined) {
                    continue;
                }
                const __gotots_store_14: PackageJson__from_packagejson["Fields"] = (InfoCacheEntry__from_packagejson.GetContents(info) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields;
                const __gotots_range_26 = Set$Keys$string(DependencyFields__from_packagejson.GetRuntimeDependencyNames(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "DependencyFields")));
                const __gotots_range_keys_4 = __gotots_range_26.keys();
                for (const __gotots_range_value_40 of __gotots_range_keys_4) {
                    const __gotots_range_value_41 = __gotots_range_26.lookupOk(__gotots_range_value_40);
                    if (!__gotots_range_value_41[1]) {
                        continue;
                    }
                    const __gotots_range_value_42 = __gotots_range_value_40;
                    let dep = __gotots_range_value_42;
                    let possibleDirectoryPath = Program.$go$private$compiler$toPath(p, CombinePaths__from_tspath(meta.PackageJsonDirectory, RuntimeSlice.literal<gostring>(["node_modules", dep])));
                    if (KnownSymlinks__from_symlinks.HasDirectory(knownSymlinks, possibleDirectoryPath)) {
                        continue;
                    }
                    if (!strings__from_gostdlib.HasPrefix(dep, "@types")) {
                        let possibleTypesDirectoryPath = Program.$go$private$compiler$toPath(p, CombinePaths__from_tspath(meta.PackageJsonDirectory, RuntimeSlice.literal<gostring>(["node_modules", GetTypesPackageName__from___go_module(dep)])));
                        if (KnownSymlinks__from_symlinks.HasDirectory(knownSymlinks, possibleTypesDirectoryPath)) {
                            continue;
                        }
                    }
                    {
                        let packageResolution: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = Resolver__from___go_module.ResolvePackageDirectory((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolver, dep, packageJsonName, ResolutionModeCommonJS$constant__from_core(), void 0);
                        if (ResolvedModule__from___go_module.IsResolved(packageResolution)) {
                            KnownSymlinks__from_symlinks.ProcessResolution(knownSymlinks, CombinePaths__from_tspath(((packageResolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.OriginalPath, RuntimeSlice.literal<gostring>(["package.json"])), CombinePaths__from_tspath(((packageResolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName, RuntimeSlice.literal<gostring>(["package.json"])));
                        }
                    }
                }
            }
            return knownSymlinks;
        });
    }
    static GetSyntacticDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return Program.$go$private$compiler$collectDiagnostics(p, ctx, sourceFile, false, ($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
            let diags = Concatenate$PointerTo_Named_ast$Diagnostic(SourceFile__from_ast.Diagnostics(file), SourceFile__from_ast.JSDiagnostics(file));
            if (IsSourceFileJS__from_ast(file) && !IsCheckJSEnabledForFile__from_ast(file, Program.Options(p))) {
                diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, getAdditionalJSSyntacticDiagnostics(file, Program.Options(p)), void 0);
            }
            return diags;
        });
    }
    static GetTypeChecker(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool === undefined)) {
            return checkerPool.$go$private$compiler$getCheckerNonExclusive((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool);
        }
        const __gotots_receiver_68: Program["checkerPool"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool;
        const __gotots_argument_397 = ctx;
        const __gotots_argument_398 = void 0;
        return goInterfaceNonNil<CheckerPool>(__gotots_receiver_68).GetChecker(__gotots_argument_397, __gotots_argument_398);
    }
    static GetTypeCheckerForFile(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool === undefined)) {
            return checkerPool.$go$private$compiler$getCheckerForFileNonExclusive((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool, file);
        }
        const __gotots_receiver_53: Program["checkerPool"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool;
        const __gotots_argument_370 = ctx;
        const __gotots_argument_371 = file;
        return goInterfaceNonNil<CheckerPool>(__gotots_receiver_53).GetChecker(__gotots_argument_370, __gotots_argument_371);
    }
    static GetTypeCheckerForFileExclusive(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): [
        {
            value: Checker__from_checker;
        } | undefined,
        (() => void) | undefined
    ] {
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool === undefined)) {
            return checkerPool.$go$private$compiler$getCheckerForFileExclusive((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool, ctx, file);
        }
        const __gotots_receiver_20: Program["checkerPool"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool;
        const __gotots_argument_324 = ctx;
        const __gotots_argument_325 = file;
        return goInterfaceNonNil<CheckerPool>(__gotots_receiver_20).GetChecker(__gotots_argument_324, __gotots_argument_325);
    }
    static GetUnresolvedImports(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        const __gotots_store_16 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_70 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "unresolvedImports");
        const __gotots_receiver_69 = p;
        const __gotots_argument_399 = (): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined => {
            return Program.$go$private$compiler$extractUnresolvedImports(__gotots_receiver_69);
        };
        return lazyValue.$go$private$compiler$getValue<Set__from_collections<gostring>>(__gotots_receiver_70, __gotots_argument_399);
    }
    static HasSameFileNames(p: {
        value: Program;
    } | undefined, other: {
        value: Program;
    } | undefined): bool {
        return EqualFunc$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath, (other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath, (a: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
            return SourceFile__from_ast.FileName(a) === SourceFile__from_ast.FileName(b);
        }) && EqualFunc$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$Named_tspath$Path$PointerTo_Named_compiler$redirectsFile$PointerTo_Named_compiler$redirectsFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.redirectFilesByPath, (other ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.redirectFilesByPath, (a: redirectsFile | undefined, b: redirectsFile | undefined): bool => {
            return redirectsFile.FileName(a) === redirectsFile.FileName(b);
        });
    }
    static HasTSFile(p: {
        value: Program;
    } | undefined): bool {
        sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasTSFileOnce, (): void => {
            const __gotots_range_37 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
            for (let __gotots_range_index_27 = 0; __gotots_range_index_27 < __gotots_range_37.length; __gotots_range_index_27++) {
                const __gotots_range_value_65 = __gotots_range_37.get(__gotots_range_index_27);
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_65;
                if (HasImplementationTSFileExtension__from_tspath(SourceFile__from_ast.FileName(file))) {
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasTSFile = true;
                    break;
                }
            }
        });
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasTSFile;
    }
    static Host(p: {
        value: Program;
    } | undefined): CompilerHost | undefined {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Host;
    }
    static IdentifierCount(p: {
        value: Program;
    } | undefined): int {
        let count = 0;
        const __gotots_range_7 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
            const __gotots_range_value_9 = __gotots_range_7.get(__gotots_range_index_6);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_9;
            count += ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IdentifierCount;
        }
        return count;
    }
    static InstantiationCount(p: {
        value: Program;
    } | undefined): int {
        let val = named_sync_atomic.SyncAtomicUint32Operations.$zero();
        Program.ForEachCheckerParallel(p, ($0: int, c: {
            value: Checker__from_checker;
        } | undefined): void => {
            atomic__from_gostdlib.Uint32.Add(val, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TotalInstantiationCount);
        });
        return atomic__from_gostdlib.Uint32.Load(val);
    }
    static IsEmitBlocked(p: {
        value: Program;
    } | undefined, emitFileName: gostring): bool {
        const __gotots_store_3 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return Set__from_collections.Has<Path__from_tspath>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "hasEmitBlockingDiagnostics"), Program.$go$private$compiler$toPath(p, emitFileName));
    }
    static IsGlobalTypingsFile(p: {
        value: Program;
    } | undefined, fileName: gostring): bool {
        if (!IsDeclarationFileName__from_tspath(fileName)) {
            return false;
        }
        return ContainsPath__from_tspath(Program.GetGlobalTypingsCacheLocation(p), fileName, ComparePathsOptions__from_tspath.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions));
    }
    static IsLibFile(p: {
        value: Program;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        const __gotots_results_30 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.libFiles.lookupOk(SourceFile__from_ast.Path(sourceFile));
        let ok = __gotots_results_30[1];
        return ok;
    }
    static IsSourceFileDefaultLibrary(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): bool {
        const __gotots_results_3 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.libFiles.lookupOk(path);
        let ok = __gotots_results_3[1];
        return ok;
    }
    static IsSourceFileFromExternalLibrary(p: {
        value: Program;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        const __gotots_store_15: Program["processedFiles"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles;
        return Set__from_collections.Has<Path__from_tspath>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "sourceFilesFoundSearchingNodeModules"), SourceFile__from_ast.Path(file));
    }
    static IsSourceFromProjectReference(p: {
        value: Program;
    } | undefined, path: Path__from_tspath): bool {
        return projectReferenceFileMapper.$go$private$compiler$isSourceFromProjectReference((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, path);
    }
    static LineCount(p: {
        value: Program;
    } | undefined): int {
        let count = 0;
        const __gotots_range_6 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
            const __gotots_range_value_8 = __gotots_range_6.get(__gotots_range_index_5);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_8;
            count += SourceFile__from_ast.ECMALineMap(file).length;
        }
        return count;
    }
    static Options(p: {
        value: Program;
    } | undefined): {
        value: CompilerOptions__from_core;
    } | undefined {
        return ParsedCommandLine__from_tsoptions.CompilerOptions((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config);
    }
    static Program(p: {
        value: Program;
    } | undefined): {
        value: Program;
    } | undefined {
        return p;
    }
    static RangeResolvedProjectReference(p: {
        value: Program;
    } | undefined, f: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int) => bool) | undefined): bool {
        return projectReferenceFileMapper.$go$private$compiler$rangeResolvedProjectReference((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, f);
    }
    static RangeResolvedProjectReferenceInChildConfig(p: {
        value: Program;
    } | undefined, childConfig: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, f: (($0: Path__from_tspath, $1: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $2: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $3: int) => bool) | undefined): bool {
        return projectReferenceFileMapper.$go$private$compiler$rangeResolvedProjectReferenceInChildConfig((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, childConfig, f);
    }
    static ResolvedPackageNames(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return ((Program.$go$private$compiler$collectPackageNames(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<packageNamesInfo>).value.resolved;
    }
    static SingleThreaded(p: {
        value: Program;
    } | undefined): bool {
        return Tristate_IsTrue__from_core(Tristate_DefaultIfUnknown__from_core((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.SingleThreaded, (Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SingleThreaded));
    }
    static SkipTypeChecking(p: {
        value: Program;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, ignoreNoCheck: bool): bool {
        return (!ignoreNoCheck && Tristate_IsTrue__from_core((Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoCheck)) || Tristate_IsTrue__from_core((Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipLibCheck) && ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile || Tristate_IsTrue__from_core((Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SkipDefaultLibCheck) && Program.IsSourceFileDefaultLibrary(p, SourceFile__from_ast.Path(sourceFile)) || Program.IsSourceFromProjectReference(p, SourceFile__from_ast.Path(sourceFile)) || !Program.$go$private$compiler$canIncludeBindAndCheckDiagnostics(p, sourceFile);
    }
    static SourceFileMayBeEmitted(p: {
        value: Program;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, forceDtsEmit: bool): bool {
        return sourceFileMayBeEmitted(sourceFile, new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), forceDtsEmit);
    }
    static SourceFiles(p: {
        value: Program;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
    }
    static SymbolCount(p: {
        value: Program;
    } | undefined): int {
        let count = 0;
        const __gotots_range_8 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
            const __gotots_range_value_10 = __gotots_range_8.get(__gotots_range_index_7);
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_10;
            count += ((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.SymbolCount;
        }
        let val = named_sync_atomic.SyncAtomicUint32Operations.$zero();
        atomic__from_gostdlib.Uint32.Store(val, count >>> 0);
        Program.ForEachCheckerParallel(p, ($0: int, c: {
            value: Checker__from_checker;
        } | undefined): void => {
            atomic__from_gostdlib.Uint32.Add(val, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SymbolCount);
        });
        return atomic__from_gostdlib.Uint32.Load(val);
    }
    static Tracing(p: {
        value: Program;
    } | undefined): {
        value: Tracing__from_tracing;
    } | undefined {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing;
    }
    static TypeCount(p: {
        value: Program;
    } | undefined): int {
        let val = named_sync_atomic.SyncAtomicUint32Operations.$zero();
        Program.ForEachCheckerParallel(p, ($0: int, c: {
            value: Checker__from_checker;
        } | undefined): void => {
            atomic__from_gostdlib.Uint32.Add(val, (c ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TypeCount);
        });
        return atomic__from_gostdlib.Uint32.Load(val);
    }
    static UnresolvedPackageNames(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        return ((Program.$go$private$compiler$collectPackageNames(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<packageNamesInfo>).value.unresolved;
    }
    static UpdateProgram(p: {
        value: Program;
    } | undefined, changedFilePath: Path__from_tspath, newHost: CompilerHost | undefined, createCheckerPool: (($0: {
        value: Program;
    } | undefined) => CheckerPool | undefined) | undefined): [
        {
            value: Program;
        } | undefined,
        tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined,
        bool
    ] {
        let newOpts = ProgramOptions.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts);
        newOpts.Host = newHost;
        if (!(createCheckerPool === undefined)) {
            newOpts.CreateCheckerPool = createCheckerPool;
        }
        let oldFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath.lookup(changedFilePath);
        const __gotots_receiver_71 = newHost;
        const __gotots_argument_400 = SourceFile__from_ast.ParseOptions(oldFile);
        let newFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = goInterfaceNonNil<CompilerHost>(__gotots_receiver_71).GetSourceFile(__gotots_argument_400);
        const __gotots_results_23 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.redirectFilesByPath.lookupOk(changedFilePath);
        let inRedirectFiles = __gotots_results_23[1];
        const __gotots_results_24 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.redirectTargetsMap.lookupOk(changedFilePath);
        let isRedirectTarget = __gotots_results_24[1];
        if (inRedirectFiles || isRedirectTarget) {
            return [NewProgram(ProgramOptions.$copy(newOpts)), newFile, false];
        }
        if (!canReplaceFileInProgram(oldFile, newFile)) {
            return [NewProgram(ProgramOptions.$copy(newOpts)), newFile, false];
        }
        {
            let oldNeedsImportHelpers = !((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.importHelpersImportSpecifiers.lookup(SourceFile__from_ast.Path(oldFile)) === undefined);
            if (oldNeedsImportHelpers !== Program.$go$private$compiler$needsImportHelpersImportSpecifier(p, newFile)) {
                return [NewProgram(ProgramOptions.$copy(newOpts)), newFile, false];
            }
        }
        let result: {
            value: Program;
        } | undefined = { value: new Program(ProgramOptions.$copy(newOpts), void 0, void 0, ComparePathsOptions__from_tspath.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions), processedFiles.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles), (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.usesUriStyleNodeCoreModules, "", named_sync.SyncOnceOperations.$zero(), SyncMap__from_collections.$zero<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>(), (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics, Set__from_collections.$copy<Path__from_tspath>((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.hasEmitBlockingDiagnostics), named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(), lazyValue.$zero<Set__from_collections<gostring>>(), lazyValue.$zero<KnownSymlinks__from_symlinks>(), lazyValue.$zero<packageNamesInfo>(), named_sync.SyncOnceOperations.$zero(), false, named_sync.SyncOnceOperations.$zero(), GoMap.nil<gostring, bool>(false)) };
        const __gotots_store_17 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_72 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "unresolvedImports");
        const __gotots_store_18 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_401 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "unresolvedImports");
        lazyValue.$go$private$compiler$tryReuse<Set__from_collections<gostring>>(__gotots_receiver_72, __gotots_argument_401);
        const __gotots_store_19 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_73 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "knownSymlinks");
        const __gotots_store_20 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_402 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "knownSymlinks");
        lazyValue.$go$private$compiler$tryReuse<KnownSymlinks__from_symlinks>(__gotots_receiver_73, __gotots_argument_402);
        const __gotots_store_21 = (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_74 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "packageNames");
        const __gotots_store_22 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_403 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "packageNames");
        lazyValue.$go$private$compiler$tryReuse<packageNamesInfo>(__gotots_receiver_74, __gotots_argument_403);
        Program.$go$private$compiler$initCheckerPool(result);
        let index = FindIndex$PointerTo_Named_ast$SourceFile((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files, (file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
            return SourceFile__from_ast.Path(file).$value === SourceFile__from_ast.Path(newFile).$value;
        });
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files = Clone$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files);
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files.set(index, newFile);
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath = Clone$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath);
        (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath.store(SourceFile__from_ast.Path(newFile), newFile);
        updateFileIncludeProcessor(result);
        return [result, newFile, true];
    }
    static UseCaseSensitiveFileNames(p: {
        value: Program;
    } | undefined): bool {
        const __gotots_receiver_5 = Program.Host(p);
        const __gotots_receiver_6 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_5).FS();
        return goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_6).UseCaseSensitiveFileNames();
    }
    static UsesUriStyleNodeCoreModules(p: {
        value: Program;
    } | undefined): Tristate__from_core {
        return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.usesUriStyleNodeCoreModules;
    }
    static $go$private$compiler$blockEmittingOfFile(p: {
        value: Program;
    } | undefined, emitFileName: gostring, diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): void {
        const __gotots_store_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        Set$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "hasEmitBlockingDiagnostics"), Program.$go$private$compiler$toPath(p, emitFileName));
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics.append(void 0, [diag]);
    }
    static $go$private$compiler$canIncludeBindAndCheckDiagnostics(p: {
        value: Program;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        if (!(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CheckJsDirective === undefined) && !(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CheckJsDirective ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enabled) {
            return false;
        }
        if (((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindTS$constant__from_core() || ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindTSX$constant__from_core() || ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindExternal$constant__from_core()) {
            return true;
        }
        let isJS = ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindJS$constant__from_core() || ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindJSX$constant__from_core();
        let isCheckJS = isJS && IsCheckJSEnabledForFile__from_ast(sourceFile, Program.Options(p));
        let isPlainJS = IsPlainJSFile__from_ast(sourceFile, (Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckJs);
        return isPlainJS || isCheckJS || ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindDeferred$constant__from_core();
    }
    static $go$private$compiler$checkSourceFilesBelongToPath(p: {
        value: Program;
    } | undefined, sourceFiles: RuntimeSlice<gostring>, rootDirectory: gostring): bool {
        let allFilesBelongToPath = true;
        const __gotots_range_9 = sourceFiles;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
            const __gotots_range_value_11 = __gotots_range_9.get(__gotots_range_index_8);
            let file = __gotots_range_value_11;
            let absoluteSourceFilePath = GetCanonicalFileName__from_tspath(GetNormalizedAbsolutePath__from_tspath(file, Program.GetCurrentDirectory(p)), Program.UseCaseSensitiveFileNames(p));
            if (!ContainsPath__from_tspath(rootDirectory, file, ComparePathsOptions__from_tspath.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions))) {
                includeProcessor.$go$private$compiler$addProcessingDiagnostic((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor, RuntimeSlice.literal<{
                    value: processingDiagnostic;
                } | undefined>([
                    { value: new processingDiagnostic(processingDiagnosticKindExplainingFileInclude$constant(), new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(new Path__from_tspath(absoluteSourceFilePath), void 0, $state__diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(file), new GoInterfaceAdapter(rootDirectory)])) })) },
                ]));
                allFilesBelongToPath = false;
            }
        }
        return allFilesBelongToPath;
    }
    static $go$private$compiler$collectCheckerDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, collect: (($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $1: {
        value: Checker__from_checker;
    } | undefined, $2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        if (!(sourceFile === undefined)) {
            if (Program.SkipTypeChecking(p, sourceFile, false)) {
                return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
            }
            const __gotots_results_9 = Program.GetTypeCheckerForFileExclusive(p, ctx, sourceFile);
            let c: {
                value: Checker__from_checker;
            } | undefined = __gotots_results_9[0];
            let done: (() => void) | undefined = __gotots_results_9[1];
            const __gotots_callee_98 = collect;
            const __gotots_argument_351 = ctx;
            const __gotots_argument_352 = c;
            const __gotots_argument_353 = sourceFile;
            let result = (__gotots_callee_98 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_351, __gotots_argument_352, __gotots_argument_353);
            const __gotots_callee_99 = done;
            (__gotots_callee_99 ?? GoPanic.raiseRuntime("call of nil function"))();
            return SortAndDeduplicateDiagnostics(result);
        }
        return SortAndDeduplicateDiagnostics(Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(Program.$go$private$compiler$collectCheckerDiagnosticsFromFiles(p, ctx, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files, collect)));
    }
    static $go$private$compiler$collectCheckerDiagnosticsFromFiles(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, collect: (($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $1: {
        value: Checker__from_checker;
    } | undefined, $2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) | undefined): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>> {
        let diagnostics__shadow_1 = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>(sourceFiles.length, null, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>());
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool === undefined)) {
            checkerPool.$go$private$compiler$forEachCheckerGroupDo((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool, ctx, sourceFiles, Program.SingleThreaded(p), (c: {
                value: Checker__from_checker;
            } | undefined, fileIndex: int, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void => {
                const __gotots_store_7 = diagnostics__shadow_1;
                const __gotots_store_8 = fileIndex;
                const __gotots_callee_101 = collect;
                const __gotots_argument_361 = ctx;
                const __gotots_argument_362 = c;
                const __gotots_argument_363 = file;
                __gotots_store_7.set(__gotots_store_8, (__gotots_callee_101 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_361, __gotots_argument_362, __gotots_argument_363));
            });
        }
        else {
            let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(Program.SingleThreaded(p));
            const __gotots_range_20 = sourceFiles;
            for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_20.length; __gotots_range_index_18++) {
                const __gotots_range_value_26 = __gotots_range_index_18;
                const __gotots_range_value_27 = __gotots_range_20.get(__gotots_range_index_18);
                let i = __gotots_range_value_26;
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_27;
                if (Program.SkipTypeChecking(p, file, false)) {
                    continue;
                }
                const __gotots_receiver_51 = wg;
                const __gotots_argument_369 = (): void => {
                    const __gotots_receiver_50: Program["checkerPool"] = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool;
                    const __gotots_argument_364 = ctx;
                    const __gotots_argument_365 = file;
                    const __gotots_results_11 = goInterfaceNonNil<CheckerPool>(__gotots_receiver_50).GetChecker(__gotots_argument_364, __gotots_argument_365);
                    let c: {
                        value: Checker__from_checker;
                    } | undefined = __gotots_results_11[0];
                    let done: (() => void) | undefined = __gotots_results_11[1];
                    const __gotots_store_9 = diagnostics__shadow_1;
                    const __gotots_store_10 = i;
                    const __gotots_callee_102 = collect;
                    const __gotots_argument_366 = ctx;
                    const __gotots_argument_367 = c;
                    const __gotots_argument_368 = file;
                    __gotots_store_9.set(__gotots_store_10, (__gotots_callee_102 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_366, __gotots_argument_367, __gotots_argument_368));
                    const __gotots_callee_103 = done;
                    (__gotots_callee_103 ?? GoPanic.raiseRuntime("call of nil function"))();
                };
                goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_51).Queue(__gotots_argument_369);
            }
            const __gotots_receiver_52 = wg;
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_52).RunAndWait();
        }
        return diagnostics__shadow_1;
    }
    static $go$private$compiler$collectDiagnostics(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, concurrent: bool, collect: (($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        let result = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        if (!(sourceFile === undefined)) {
            const __gotots_callee_97 = collect;
            const __gotots_argument_346 = ctx;
            const __gotots_argument_347 = sourceFile;
            result = (__gotots_callee_97 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_346, __gotots_argument_347);
        }
        else {
            let diagnostics__shadow_1 = Program.$go$private$compiler$collectDiagnosticsFromFiles(p, ctx, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files, concurrent, collect);
            result = Concat$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(diagnostics__shadow_1);
        }
        return SortAndDeduplicateDiagnostics(result);
    }
    static $go$private$compiler$collectDiagnosticsFromFiles(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFiles: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, concurrent: bool, collect: (($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) | undefined): RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>> {
        let diagnostics__shadow_1 = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>(sourceFiles.length, null, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>());
        let wg: WorkGroup__from_core | undefined = NewWorkGroup__from_core(!concurrent || Program.SingleThreaded(p));
        const __gotots_range_18 = sourceFiles;
        for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_18.length; __gotots_range_index_17++) {
            const __gotots_range_value_21 = __gotots_range_index_17;
            const __gotots_range_value_22 = __gotots_range_18.get(__gotots_range_index_17);
            let i = __gotots_range_value_21;
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_22;
            const __gotots_receiver_48 = wg;
            const __gotots_argument_360 = (): void => {
                const __gotots_store_5 = diagnostics__shadow_1;
                const __gotots_store_6 = i;
                const __gotots_callee_100 = collect;
                const __gotots_argument_358 = ctx;
                const __gotots_argument_359 = file;
                __gotots_store_5.set(__gotots_store_6, (__gotots_callee_100 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_358, __gotots_argument_359));
            };
            goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_48).Queue(__gotots_argument_360);
        }
        const __gotots_receiver_49 = wg;
        goInterfaceNonNil<WorkGroup__from_core>(__gotots_receiver_49).RunAndWait();
        return diagnostics__shadow_1;
    }
    static $go$private$compiler$collectPackageNames(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<packageNamesInfo> | undefined {
        const __gotots_store_23 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return lazyValue.$go$private$compiler$getValue<packageNamesInfo>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "packageNames"), (): tsonicTypeScriptRuntime.Location<packageNamesInfo> | undefined => {
            let packageNames: tsonicTypeScriptRuntime.Location<packageNamesInfo> | undefined = tsonicTypeScriptRuntime.location<packageNamesInfo>(new packageNamesInfo(tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                M: $goMap$MapOf_string_To_Struct_void.nil()
            })), tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                M: $goMap$MapOf_string_To_Struct_void.nil()
            })), tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
                M: $goMap$MapOf_string_To_Struct_void.nil()
            }))));
            const __gotots_range_32 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
            for (let __gotots_range_index_23 = 0; __gotots_range_index_23 < __gotots_range_32.length; __gotots_range_index_23++) {
                const __gotots_range_value_57 = __gotots_range_32.get(__gotots_range_index_23);
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_57;
                if (Program.IsSourceFileDefaultLibrary(p, SourceFile__from_ast.Path(file)) || Program.IsSourceFileFromExternalLibrary(p, file) || strings__from_gostdlib.Contains(SourceFile__from_ast.FileName(file), "/node_modules/")) {
                    continue;
                }
                const __gotots_range_33 = SourceFile__from_ast.Imports(file);
                for (let __gotots_range_index_24 = 0; __gotots_range_index_24 < __gotots_range_33.length; __gotots_range_index_24++) {
                    const __gotots_range_value_58 = __gotots_range_33.get(__gotots_range_index_24);
                    let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_58;
                    if (IsExternalModuleNameRelative__from_tspath(Node__from_ast.Text(imp))) {
                        continue;
                    }
                    {
                        const __gotots_results_25 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules.lookupOk(SourceFile__from_ast.Path(file));
                        let resolvedModules: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined> = __gotots_results_25[0];
                        let ok = __gotots_results_25[1];
                        if (ok) {
                            let key = ModeAwareCacheKey__from___go_module.$fromStorage({
                                Name: Node__from_ast.Text(imp),
                                Mode: Program.GetModeForUsageLocation(p, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file), imp)
                            });
                            {
                                const __gotots_results_26 = resolvedModules.$value.lookupOk(key);
                                let resolvedModule: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_results_26[0];
                                let ok__shadow_1 = __gotots_results_26[1];
                                if (ok__shadow_1 && ResolvedModule__from___go_module.IsResolved(resolvedModule)) {
                                    if (!((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.IsExternalLibraryImport) {
                                        continue;
                                    }
                                    let name = PackageId__from___go_module.$storageOf(((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.PackageId).Name;
                                    if (name === "") {
                                        {
                                            let packageScope: {
                                                value: InfoCacheEntry__from_packagejson;
                                            } | undefined = Resolver__from___go_module.GetPackageScopeForPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolver, ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName);
                                            if (!(packageScope === undefined) && InfoCacheEntry__from_packagejson.Exists(packageScope)) {
                                                {
                                                    const __gotots_store_24 = ((packageScope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields;
                                                    const __gotots_results_27 = Expected$GetValue$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Name"));
                                                    let scopeName = __gotots_results_27[0];
                                                    let ok__shadow_2 = __gotots_results_27[1];
                                                    if (ok__shadow_2) {
                                                        name = scopeName;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (name === "") {
                                        name = GetPackageNameFromDirectory__from_modulespecifiers(((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName);
                                    }
                                    if (name !== "") {
                                        Set$Add$string(((packageNames ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<packageNamesInfo>).value.resolved, name);
                                        const __gotots_results_28 = ParsePackageName__from___go_module(Node__from_ast.Text(imp));
                                        let rest = __gotots_results_28[1];
                                        if (rest !== "") {
                                            {
                                                let scope: {
                                                    value: InfoCacheEntry__from_packagejson;
                                                } | undefined = Resolver__from___go_module.GetPackageScopeForPath((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolver, ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName);
                                                let __gotots_logical_result_3 = !(scope === undefined) && InfoCacheEntry__from_packagejson.Exists(scope);
                                                if (__gotots_logical_result_3) {
                                                    const __gotots_store_25 = ExportsOrImports__from_packagejson.$storageOf(((scope ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Contents ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports);
                                                    __gotots_logical_result_3 = !JSONValue__from_packagejson.IsPresent(tsonicTypeScriptRuntime.projectLocation<JSONValue__from_packagejson$Storage, JSONValue__from_packagejson>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "JSONValue"), JSONValue__from_packagejson.$fromStorage, JSONValue__from_packagejson.$storageOf));
                                                }
                                                if (__gotots_logical_result_3) {
                                                    Set$Add$string(((packageNames ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<packageNamesInfo>).value.deepImportPackages, GetPackageNameFromTypesPackageName__from___go_module(name));
                                                }
                                            }
                                        }
                                    }
                                    continue;
                                }
                            }
                        }
                    }
                    Set$Add$string(((packageNames ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<packageNamesInfo>).value.unresolved, Node__from_ast.Text(imp));
                }
            }
            return packageNames;
        });
    }
    static $go$private$compiler$extractUnresolvedImports(p: {
        value: Program;
    } | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
        let unresolvedSet: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = tsonicTypeScriptRuntime.location<Set__from_collections<gostring>>(Set__from_collections.$fromStorage<gostring>({
            M: $goMap$MapOf_string_To_Struct_void.nil()
        }));
        const __gotots_range_34 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
        for (let __gotots_range_index_25 = 0; __gotots_range_index_25 < __gotots_range_34.length; __gotots_range_index_25++) {
            const __gotots_range_value_59 = __gotots_range_34.get(__gotots_range_index_25);
            let sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_59;
            let unresolvedImports = Program.$go$private$compiler$extractUnresolvedImportsFromSourceFile(p, sourceFile);
            const __gotots_range_35 = unresolvedImports;
            for (let __gotots_range_index_26 = 0; __gotots_range_index_26 < __gotots_range_35.length; __gotots_range_index_26++) {
                const __gotots_range_value_60 = __gotots_range_35.get(__gotots_range_index_26);
                let imp = __gotots_range_value_60;
                Set$Add$string(unresolvedSet, imp);
            }
        }
        return unresolvedSet;
    }
    static $go$private$compiler$extractUnresolvedImportsFromSourceFile(p: {
        value: Program;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<gostring> {
        let unresolvedImports = RuntimeSlice.nil<gostring>();
        let resolvedModules: ModeAwareCache__from___go_module<tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined> = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.resolvedModules.lookup(SourceFile__from_ast.Path(file));
        const __gotots_range_36 = resolvedModules.$value;
        const __gotots_range_keys_8 = __gotots_range_36.keys();
        for (const __gotots_range_value_61 of __gotots_range_keys_8) {
            const __gotots_range_value_62 = __gotots_range_36.lookupOk(__gotots_range_value_61);
            if (!__gotots_range_value_62[1]) {
                continue;
            }
            const __gotots_range_value_63 = ModeAwareCacheKey__from___go_module.$copy(__gotots_range_value_61);
            const __gotots_range_value_64 = __gotots_range_value_62[0];
            let cacheKey = __gotots_range_value_63;
            let resolution: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = __gotots_range_value_64;
            let resolved = ResolvedModule__from___go_module.IsResolved(resolution);
            if ((!resolved || !ExtensionIsOneOf__from_tspath(((resolution ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.Extension, $state__tspath.SupportedTSExtensionsWithJsonFlat)) && !IsExternalModuleNameRelative__from_tspath(ModeAwareCacheKey__from___go_module.$storageOf(cacheKey).Name)) {
                unresolvedImports = unresolvedImports.append("", [ModeAwareCacheKey__from___go_module.$storageOf(cacheKey).Name]);
            }
        }
        return unresolvedImports;
    }
    static $go$private$compiler$getBindAndCheckDiagnosticsWithChecker(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, fileChecker: {
        value: Checker__from_checker;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        let compilerOptions: {
            value: CompilerOptions__from_core;
        } | undefined = Program.Options(p);
        if (Program.SkipTypeChecking(p, sourceFile, false)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        }
        let diags = Clip$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(SourceFile__from_ast.BindDiagnostics(sourceFile));
        diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, Checker__from_checker.GetDiagnostics(fileChecker, ctx, sourceFile), void 0);
        let isPlainJS = IsPlainJSFile__from_ast(sourceFile, (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckJs);
        if (isPlainJS) {
            return Filter$PointerTo_Named_ast$Diagnostic(diags, (d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): bool => {
                return Set__from_collections.Has<int32>($state.plainJSErrors, Diagnostic__from_ast.Code(d));
            });
        }
        let isJS = ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindJS$constant__from_core() || ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindJSX$constant__from_core();
        let isCheckJS = isJS && IsCheckJSEnabledForFile__from_ast(sourceFile, compilerOptions);
        if (isCheckJS) {
            diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, SourceFile__from_ast.JSDocDiagnostics(sourceFile), void 0);
        }
        const __gotots_results_10 = Program.$go$private$compiler$getDiagnosticsWithPrecedingDirectives(p, sourceFile, diags);
        let filtered = __gotots_results_10[0];
        let directivesByLine: GoMapValue<int, CommentDirective__from_ast> = __gotots_results_10[1];
        const __gotots_range_19 = directivesByLine;
        const __gotots_range_keys_0 = __gotots_range_19.keys();
        for (const __gotots_range_value_23 of __gotots_range_keys_0) {
            const __gotots_range_value_24 = __gotots_range_19.lookupOk(__gotots_range_value_23);
            if (!__gotots_range_value_24[1]) {
                continue;
            }
            const __gotots_range_value_25 = __gotots_range_value_24[0];
            let directive = __gotots_range_value_25;
            if (CommentDirective__from_ast.$storageOf(directive).Kind === CommentDirectiveKindExpectError$constant__from_ast()) {
                filtered = filtered.append(void 0, [NewDiagnostic__from_ast(sourceFile, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(CommentDirective__from_ast.$storageOf(directive).Loc)), $state__diagnostics.Unused_ts_expect_error_directive, RuntimeSlice.nil<$goInterface$Interface_void | undefined>())]);
            }
        }
        return filtered;
    }
    static $go$private$compiler$getDeclarationDiagnosticsForFile(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        let __gotots_deferred_4: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_1: GoPanic | undefined = undefined;
        let __gotots_return_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        try {
            try {
                __gotots_return_block_1: {
                    if (((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
                        __gotots_return_1 = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>([]);
                        break __gotots_return_block_1;
                    }
                    {
                        const __gotots_store_11 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_results_13 = SyncMap$Load$PointerTo_Named_ast$SourceFile$SliceOf_PointerTo_Named_ast$Diagnostic(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "declarationDiagnosticCache"), sourceFile);
                        let cached = __gotots_results_13[0];
                        let ok = __gotots_results_13[1];
                        if (ok) {
                            __gotots_return_1 = cached;
                            break __gotots_return_block_1;
                        }
                    }
                    const __gotots_results_14 = newEmitHost(ctx, p, sourceFile);
                    let host: {
                        value: emitHost;
                    } | undefined = __gotots_results_14[0];
                    let done: (() => void) | undefined = __gotots_results_14[1];
                    const __gotots_callee_104: (() => void) | undefined = done;
                    const __gotots_deferred_5 = DeferredCallableRegistry.resolve(__gotots_callee_104);
                    __gotots_deferred_4 = ($go$recovery: GoRecovery): void => {
                        __gotots_deferred_5 === undefined ? (__gotots_callee_104 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_5($go$recovery);
                    };
                    let diagnostics__shadow_1 = getDeclarationDiagnostics(new $goInterfaceAdapter$PointerTo_Named_compiler$emitHost(host), sourceFile);
                    const __gotots_store_12 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                    const __gotots_results_15 = SyncMap$LoadOrStore$PointerTo_Named_ast$SourceFile$SliceOf_PointerTo_Named_ast$Diagnostic(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "declarationDiagnosticCache"), sourceFile, diagnostics__shadow_1);
                    diagnostics__shadow_1 = __gotots_results_15[0];
                    __gotots_return_1 = diagnostics__shadow_1;
                    break __gotots_return_block_1;
                }
            }
            catch (__gotots_caught_3) {
                if (!(__gotots_caught_3 instanceof GoPanic)) {
                    throw __gotots_caught_3;
                }
                __gotots_panic_1 = __gotots_caught_3;
            }
        }
        finally {
            if (__gotots_deferred_4 !== undefined) {
                const __gotots_recovery_1 = new GoRecovery(__gotots_panic_1);
                try {
                    __gotots_deferred_4(__gotots_recovery_1);
                    if (__gotots_recovery_1.recovered()) {
                        __gotots_panic_1 = undefined;
                    }
                }
                catch (__gotots_caught_2) {
                    if (!(__gotots_caught_2 instanceof GoPanic)) {
                        throw __gotots_caught_2;
                    }
                    __gotots_panic_1 = __gotots_caught_2;
                }
            }
        }
        if (__gotots_panic_1 !== undefined) {
            throw __gotots_panic_1;
        }
        return __gotots_return_1;
    }
    static $go$private$compiler$getDiagnosticsWithPrecedingDirectives(p: {
        value: Program;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, diags: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): [
        RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>,
        GoMapValue<int, CommentDirective__from_ast>
    ] {
        if (((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommentDirectives.length === 0) {
            return [diags, $goMap$MapOf_int_To_Named_ast$CommentDirective.nil()];
        }
        let directivesByLine: GoMapValue<int, CommentDirective__from_ast> = $goMap$MapOf_int_To_Named_ast$CommentDirective.make(0, []);
        const __gotots_range_21 = ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CommentDirectives;
        for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_21.length; __gotots_range_index_19++) {
            const __gotots_range_value_28 = CommentDirective__from_ast.$copy(CommentDirective__from_ast.$fromStorage(__gotots_range_21.get(__gotots_range_index_19)));
            let directive = __gotots_range_value_28;
            let line = GetECMALineOfPosition__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), TextRange__from_core.$fromStorage(CommentDirective__from_ast.$storageOf(directive).Loc).Pos());
            directivesByLine.store(line, directive);
        }
        let lineStarts = GetECMALineStarts__from_scanner(new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile));
        let filtered = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(0, diags.length, void 0);
        const __gotots_range_22 = diags;
        for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_22.length; __gotots_range_index_20++) {
            const __gotots_range_value_29 = __gotots_range_22.get(__gotots_range_index_20);
            let diagnostic: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = __gotots_range_value_29;
            let ignoreDiagnostic = false;
            for (let line = ComputeLineOfPosition__from_scanner(lineStarts, Diagnostic__from_ast.Pos(diagnostic)) - 1; line >= 0; line--) {
                {
                    const __gotots_results_12 = directivesByLine.lookupOk(line);
                    let directive = __gotots_results_12[0];
                    let ok = __gotots_results_12[1];
                    if (ok) {
                        ignoreDiagnostic = true;
                        CommentDirective__from_ast.$storageOf(directive).Kind = CommentDirectiveKindIgnore$constant__from_ast();
                        directivesByLine.store(line, directive);
                        break;
                    }
                }
                if (!isCommentOrBlankLine(SourceFile__from_ast.Text(sourceFile), lineStarts.get(line))) {
                    break;
                }
            }
            if (!ignoreDiagnostic) {
                filtered = filtered.append(void 0, [diagnostic]);
            }
        }
        return [filtered, directivesByLine];
    }
    static $go$private$compiler$getModeForTypeReferenceDirectiveInFile(p: {
        value: Program;
    } | undefined, ref: {
        value: FileReference__from_ast;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): ModuleKind__from_core {
        if (!((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode === ResolutionModeNone$constant__from_core())) {
            return (ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode;
        }
        return Program.GetDefaultResolutionModeForFile(p, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile));
    }
    static $go$private$compiler$getSemanticDiagnosticsWithChecker(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, c: {
        value: Checker__from_checker;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        return Concatenate$PointerTo_Named_ast$Diagnostic(FilterNoEmitSemanticDiagnostics(Program.$go$private$compiler$getBindAndCheckDiagnosticsWithChecker(p, ctx, c, sourceFile), Program.Options(p)), Program.GetIncludeProcessorDiagnostics(p, sourceFile));
    }
    static $go$private$compiler$getSourceFilesToEmit(p: {
        value: Program;
    } | undefined, targetSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, forceDtsEmit: bool): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
        if (targetSourceFile === undefined && !forceDtsEmit) {
            sync__from_gostdlib.Once.Do((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFilesToEmitOnce, (): void => {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFilesToEmit = getSourceFilesToEmit(new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), void 0, false);
            });
            return (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.sourceFilesToEmit;
        }
        return getSourceFilesToEmit(new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), targetSourceFile, forceDtsEmit);
    }
    static $go$private$compiler$getSuggestionDiagnosticsWithChecker(p: {
        value: Program;
    } | undefined, ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, fileChecker: {
        value: Checker__from_checker;
    } | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
        if (Program.SkipTypeChecking(p, sourceFile, false)) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
        }
        let diags = Clip$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.BindSuggestionDiagnostics);
        diags = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(diags, Checker__from_checker.GetSuggestionDiagnostics(fileChecker, ctx, sourceFile), void 0);
        return diags;
    }
    static $go$private$compiler$initCheckerPool(p: {
        value: Program;
    } | undefined): void {
        if (!(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.finishedProcessing) {
            const __gotots_argument_0 = new GoInterfaceAdapter("Program must finish processing files before initializing checker pool");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.CreateCheckerPool === undefined)) {
            const __gotots_callee_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.CreateCheckerPool;
            const __gotots_argument_1 = p;
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
        }
        else {
            let pool: {
                value: checkerPool;
            } | undefined = newCheckerPoolWithTracing(p, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing);
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.checkerPool = new $goInterfaceAdapter$PointerTo_Named_compiler$checkerPool(pool);
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.compilerCheckerPool = pool;
        }
    }
    static $go$private$compiler$needsImportHelpersImportSpecifier(p: {
        value: Program;
    } | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
        const __gotots_results_29 = projectReferenceFileMapper.$go$private$compiler$getRedirectForResolution((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.projectReferenceFileMapper, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(file));
        let redirect: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined = __gotots_results_29[0];
        let optionsForFile: {
            value: CompilerOptions__from_core;
        } | undefined = GetCompilerOptionsWithRedirect__from___go_module(ParsedCommandLine__from_tsoptions.CompilerOptions((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config), new $goInterfaceAdapter$PointerTo_Named_tsoptions$ParsedCommandLine(redirect));
        if (!Tristate_IsTrue__from_core((optionsForFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportHelpers)) {
            return false;
        }
        let isJavaScriptFile = IsSourceFileJS__from_ast(file);
        let isExternalModuleFile = IsExternalModule__from_ast(file);
        if (!isJavaScriptFile && (((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile || (!CompilerOptions__from_core.GetIsolatedModules(optionsForFile) && !isExternalModuleFile))) {
            return false;
        }
        return true;
    }
    static $go$private$compiler$toPath(p: {
        value: Program;
    } | undefined, filename: gostring): Path__from_tspath {
        return ToPath__from_tspath(filename, Program.GetCurrentDirectory(p), Program.UseCaseSensitiveFileNames(p));
    }
    static $go$private$compiler$verifyCompilerOptions(p: {
        value: Program;
    } | undefined): void {
        let options: {
            value: CompilerOptions__from_core;
        } | undefined = Program.Options(p);
        let sourceFile: (() => tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) | undefined = Memoize$PointerTo_Named_ast$SourceFile((): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
            let configFile: {
                value: TsConfigSourceFile__from_tsoptions;
            } | undefined = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions>).value.ConfigFile;
            if (configFile === undefined) {
                return void 0;
            }
            return (configFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceFile;
        });
        let configFilePath: (() => gostring) | undefined = Memoize$string((): gostring => {
            const __gotots_callee_1 = sourceFile;
            let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
            if (!(file === undefined)) {
                return SourceFile__from_ast.FileName(file);
            }
            return "";
        });
        let getCompilerOptionsPropertySyntax: (() => tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) | undefined = Memoize$PointerTo_Named_ast$PropertyAssignment((): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined => {
            const __gotots_callee_2 = sourceFile;
            const __gotots_argument_2 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_argument_3 = "compilerOptions";
            const __gotots_argument_4 = ($argument0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined => {
                return Identity$PointerTo_Named_ast$PropertyAssignment($argument0);
            };
            return ForEachTsConfigPropArray__from_tsoptions<PropertyAssignment__from_ast>(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
        });
        let getCompilerOptionsObjectLiteralSyntax: (() => {
            value: ObjectLiteralExpression__from_ast;
        } | undefined) | undefined = Memoize$PointerTo_Named_ast$ObjectLiteralExpression((): {
            value: ObjectLiteralExpression__from_ast;
        } | undefined => {
            const __gotots_callee_3 = getCompilerOptionsPropertySyntax;
            let compilerOptionsProperty: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
            if (!(compilerOptionsProperty === undefined) && !(PropertyAssignment__from_ast.$storageOf(((compilerOptionsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer === undefined) && IsObjectLiteralExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((compilerOptionsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
                return Node__from_ast.AsObjectLiteralExpression(PropertyAssignment__from_ast.$storageOf(((compilerOptionsProperty ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
            }
            return void 0;
        });
        let createOptionDiagnosticInObjectLiteralSyntax: (($0: {
            value: ObjectLiteralExpression__from_ast;
        } | undefined, $1: bool, $2: gostring, $3: gostring, $4: {
            value: Message__from_diagnostics;
        } | undefined, $5: RuntimeSlice<$goInterface$Interface_void | undefined>) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (objectLiteral: {
            value: ObjectLiteralExpression__from_ast;
        } | undefined, onKey: bool, key1: gostring, key2: gostring, message: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = ForEachPropertyAssignment__from_tsoptions<Diagnostic__from_ast>(objectLiteral, key1, (property: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
                const __gotots_callee_4 = sourceFile;
                const __gotots_argument_5 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
                const __gotots_argument_6 = IfElse$PointerTo_Named_ast$Node(onKey, PropertyAssignment__from_ast.Name(property), PropertyAssignment__from_ast.$storageOf(((property ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
                const __gotots_argument_7 = message;
                const __gotots_argument_8 = args;
                return CreateDiagnosticForNodeInSourceFile__from_tsoptions(__gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
            }, RuntimeSlice.literal<gostring>([key2]));
            if (!(diag === undefined)) {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics.append(void 0, [diag]);
            }
            return diag;
        };
        let createCompilerOptionsDiagnostic: (($0: {
            value: Message__from_diagnostics;
        } | undefined, $1: RuntimeSlice<$goInterface$Interface_void | undefined>) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (message: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            const __gotots_callee_5 = getCompilerOptionsPropertySyntax;
            let compilerOptionsProperty: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))();
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = void 0;
            if (!(compilerOptionsProperty === undefined)) {
                const __gotots_callee_6 = sourceFile;
                const __gotots_argument_9 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))();
                const __gotots_argument_10 = PropertyAssignment__from_ast.Name(compilerOptionsProperty);
                const __gotots_argument_11 = message;
                const __gotots_argument_12 = args;
                diag = CreateDiagnosticForNodeInSourceFile__from_tsoptions(__gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
            }
            else {
                diag = NewCompilerDiagnostic__from_ast(message, args);
            }
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics.append(void 0, [diag]);
            return diag;
        };
        let createDiagnosticForOption: (($0: bool, $1: gostring, $2: gostring, $3: {
            value: Message__from_diagnostics;
        } | undefined, $4: RuntimeSlice<$goInterface$Interface_void | undefined>) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (onKey: bool, option1: gostring, option2: gostring, message: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            const __gotots_callee_8 = createOptionDiagnosticInObjectLiteralSyntax;
            const __gotots_callee_7 = getCompilerOptionsObjectLiteralSyntax;
            const __gotots_argument_13 = (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_argument_14 = onKey;
            const __gotots_argument_15 = option1;
            const __gotots_argument_16 = option2;
            const __gotots_argument_17 = message;
            const __gotots_argument_18 = args;
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
            if (diag === undefined) {
                const __gotots_callee_9 = createCompilerOptionsDiagnostic;
                const __gotots_argument_19 = message;
                const __gotots_argument_20 = args;
                diag = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19, __gotots_argument_20);
            }
            return diag;
        };
        let createDiagnosticForOptionName: (($0: {
            value: Message__from_diagnostics;
        } | undefined, $1: gostring, $2: gostring, $3: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined = (message: {
            value: Message__from_diagnostics;
        } | undefined, option1: gostring, option2: gostring, args: RuntimeSlice<$goInterface$Interface_void | undefined>): void => {
            let newArgs = RuntimeSlice.make<$goInterface$Interface_void | undefined>(0, args.length + 2, void 0);
            newArgs = newArgs.append(void 0, [new GoInterfaceAdapter(option1), new GoInterfaceAdapter(option2)]);
            newArgs = goSliceAppendSlice<$goInterface$Interface_void | undefined>(newArgs, args, void 0);
            const __gotots_callee_10 = createDiagnosticForOption;
            const __gotots_argument_21 = true;
            const __gotots_argument_22 = option1;
            const __gotots_argument_23 = option2;
            const __gotots_argument_24 = message;
            const __gotots_argument_25 = newArgs;
            (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25);
        };
        let createOptionValueDiagnostic: (($0: gostring, $1: {
            value: Message__from_diagnostics;
        } | undefined, $2: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined = (option1: gostring, message: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): void => {
            const __gotots_callee_11 = createDiagnosticForOption;
            const __gotots_argument_26 = false;
            const __gotots_argument_27 = option1;
            const __gotots_argument_28 = "";
            const __gotots_argument_29 = message;
            const __gotots_argument_30 = args;
            (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_26, __gotots_argument_27, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30);
        };
        let createRemovedOptionDiagnostic: (($0: gostring, $1: gostring, $2: gostring) => void) | undefined = (name: gostring, value: gostring, useInstead: gostring): void => {
            let message: {
                value: Message__from_diagnostics;
            } | undefined = void 0;
            let args = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            if (value === "") {
                message = $state__diagnostics.Option_0_has_been_removed_Please_remove_it_from_your_configuration;
                args = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(name)]);
            }
            else {
                message = $state__diagnostics.Option_0_1_has_been_removed_Please_remove_it_from_your_configuration;
                args = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(name), new GoInterfaceAdapter(value)]);
            }
            const __gotots_callee_12 = createDiagnosticForOption;
            const __gotots_argument_31 = value === "";
            const __gotots_argument_32 = name;
            const __gotots_argument_33 = "";
            const __gotots_argument_34 = message;
            const __gotots_argument_35 = args;
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35);
            if (useInstead !== "") {
                Diagnostic__from_ast.AddMessageChain(diag, NewCompilerDiagnostic__from_ast($state__diagnostics.Use_0_instead, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(useInstead)])));
            }
        };
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUrl !== "") {
            let useInstead = "";
            const __gotots_callee_13 = configFilePath;
            const __gotots_binary_operand_0 = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_binary_operand_1 = "";
            if (__gotots_binary_operand_0 !== __gotots_binary_operand_1) {
                const __gotots_callee_14 = configFilePath;
                const __gotots_argument_36 = (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))();
                const __gotots_argument_37: CompilerOptions__from_core["BaseUrl"] = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BaseUrl;
                const __gotots_argument_38 = ComparePathsOptions__from_tspath.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions);
                let relative = GetRelativePathFromFile__from_tspath(__gotots_argument_36, __gotots_argument_37, __gotots_argument_38);
                if (!(strings__from_gostdlib.HasPrefix(relative, "./") || strings__from_gostdlib.HasPrefix(relative, "../"))) {
                    relative = "./" + relative;
                }
                let suggestion = CombinePaths__from_tspath(relative, RuntimeSlice.literal<gostring>(["*"]));
                const __gotots_argument_40 = "\"paths\": {\"*\": [%s]}";
                const __gotots_results_0 = Marshal__from_json__package_1(new GoInterfaceAdapter(suggestion), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
                const __gotots_argument_39 = new $goInterfaceAdapter$SliceOf_byte(Must$SliceOf_byte(__gotots_results_0[0], __gotots_results_0[1]));
                const __gotots_argument_41 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_argument_39]);
                useInstead = fmt__from_gostdlib.Sprintf(__gotots_argument_40, __gotots_argument_41);
            }
            const __gotots_callee_15 = createRemovedOptionDiagnostic;
            const __gotots_argument_42 = "baseUrl";
            const __gotots_argument_43 = "";
            const __gotots_argument_44 = useInstead;
            (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_42, __gotots_argument_43, __gotots_argument_44);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile !== "") {
            const __gotots_callee_16 = createRemovedOptionDiagnostic;
            const __gotots_argument_45 = "outFile";
            const __gotots_argument_46 = "";
            const __gotots_argument_47 = "";
            (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_45, __gotots_argument_46, __gotots_argument_47);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Target === ScriptTargetES5$constant__from_core()) {
            const __gotots_callee_17 = createRemovedOptionDiagnostic;
            const __gotots_argument_48 = "target";
            const __gotots_argument_49 = "ES5";
            const __gotots_argument_50 = "";
            (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_48, __gotots_argument_49, __gotots_argument_50);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module === ModuleKindAMD$constant__from_core()) {
            const __gotots_callee_18 = createRemovedOptionDiagnostic;
            const __gotots_argument_51 = "module";
            const __gotots_argument_52 = "AMD";
            const __gotots_argument_53 = "";
            (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_51, __gotots_argument_52, __gotots_argument_53);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module === ModuleKindSystem$constant__from_core()) {
            const __gotots_callee_19 = createRemovedOptionDiagnostic;
            const __gotots_argument_54 = "module";
            const __gotots_argument_55 = "System";
            const __gotots_argument_56 = "";
            (__gotots_callee_19 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_54, __gotots_argument_55, __gotots_argument_56);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Module === ModuleKindUMD$constant__from_core()) {
            const __gotots_callee_20 = createRemovedOptionDiagnostic;
            const __gotots_argument_57 = "module";
            const __gotots_argument_58 = "UMD";
            const __gotots_argument_59 = "";
            (__gotots_callee_20 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_57, __gotots_argument_58, __gotots_argument_59);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution === ModuleResolutionKindClassic$constant__from_core()) {
            const __gotots_callee_21 = createRemovedOptionDiagnostic;
            const __gotots_argument_60 = "moduleResolution";
            const __gotots_argument_61 = "Classic";
            const __gotots_argument_62 = "";
            (__gotots_callee_21 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_60, __gotots_argument_61, __gotots_argument_62);
        }
        if (Tristate_IsFalse__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AlwaysStrict)) {
            const __gotots_callee_22 = createRemovedOptionDiagnostic;
            const __gotots_argument_63 = "alwaysStrict";
            const __gotots_argument_64 = "false";
            const __gotots_argument_65 = "";
            (__gotots_callee_22 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_63, __gotots_argument_64, __gotots_argument_65);
        }
        if (Tristate_IsFalse__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ESModuleInterop)) {
            const __gotots_callee_23 = createRemovedOptionDiagnostic;
            const __gotots_argument_66 = "esModuleInterop";
            const __gotots_argument_67 = "false";
            const __gotots_argument_68 = "";
            (__gotots_callee_23 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_66, __gotots_argument_67, __gotots_argument_68);
        }
        if (Tristate_IsFalse__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowSyntheticDefaultImports)) {
            const __gotots_callee_24 = createRemovedOptionDiagnostic;
            const __gotots_argument_69 = "allowSyntheticDefaultImports";
            const __gotots_argument_70 = "false";
            const __gotots_argument_71 = "";
            (__gotots_callee_24 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_69, __gotots_argument_70, __gotots_argument_71);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleResolution === ModuleResolutionKindNode10$constant__from_core()) {
            const __gotots_callee_25 = createRemovedOptionDiagnostic;
            const __gotots_argument_72 = "moduleResolution";
            const __gotots_argument_73 = "node10";
            const __gotots_argument_74 = "";
            (__gotots_callee_25 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_72, __gotots_argument_73, __gotots_argument_74);
        }
        if (!Tristate_IsUnknown__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DownlevelIteration)) {
            const __gotots_callee_26 = createRemovedOptionDiagnostic;
            const __gotots_argument_75 = "downlevelIteration";
            const __gotots_argument_76 = "";
            const __gotots_argument_77 = "";
            (__gotots_callee_26 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_75, __gotots_argument_76, __gotots_argument_77);
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictPropertyInitialization) && !CompilerOptions__from_core.GetStrictOptionValue(options, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictNullChecks)) {
            const __gotots_callee_27 = createDiagnosticForOptionName;
            const __gotots_argument_78 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1;
            const __gotots_argument_79 = "strictPropertyInitialization";
            const __gotots_argument_80 = "strictNullChecks";
            const __gotots_argument_81 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_27 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81);
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExactOptionalPropertyTypes) && !CompilerOptions__from_core.GetStrictOptionValue(options, (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.StrictNullChecks)) {
            const __gotots_callee_28 = createDiagnosticForOptionName;
            const __gotots_argument_82 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1;
            const __gotots_argument_83 = "exactOptionalPropertyTypes";
            const __gotots_argument_84 = "strictNullChecks";
            const __gotots_argument_85 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_28 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_82, __gotots_argument_83, __gotots_argument_84, __gotots_argument_85);
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedDeclarations)) {
            if (CompilerOptions__from_core.GetAllowJS(options)) {
                const __gotots_callee_29 = createDiagnosticForOptionName;
                const __gotots_argument_86 = $state__diagnostics.Option_0_cannot_be_specified_with_option_1;
                const __gotots_argument_87 = "allowJs";
                const __gotots_argument_88 = "isolatedDeclarations";
                const __gotots_argument_89 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_29 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_86, __gotots_argument_87, __gotots_argument_88, __gotots_argument_89);
            }
            if (!CompilerOptions__from_core.GetEmitDeclarations(options)) {
                const __gotots_callee_30 = createDiagnosticForOptionName;
                const __gotots_argument_90 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2;
                const __gotots_argument_91 = "isolatedDeclarations";
                const __gotots_argument_92 = "declaration";
                const __gotots_argument_93 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("composite")]);
                (__gotots_callee_30 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_90, __gotots_argument_91, __gotots_argument_92, __gotots_argument_93);
            }
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap)) {
            if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap)) {
                const __gotots_callee_31 = createDiagnosticForOptionName;
                const __gotots_argument_94 = $state__diagnostics.Option_0_cannot_be_specified_with_option_1;
                const __gotots_argument_95 = "sourceMap";
                const __gotots_argument_96 = "inlineSourceMap";
                const __gotots_argument_97 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_31 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_94, __gotots_argument_95, __gotots_argument_96, __gotots_argument_97);
            }
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot !== "") {
                const __gotots_callee_32 = createDiagnosticForOptionName;
                const __gotots_argument_98 = $state__diagnostics.Option_0_cannot_be_specified_with_option_1;
                const __gotots_argument_99 = "mapRoot";
                const __gotots_argument_100 = "inlineSourceMap";
                const __gotots_argument_101 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_32 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101);
            }
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite)) {
            if (Tristate_IsFalse__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Declaration)) {
                const __gotots_callee_33 = createDiagnosticForOptionName;
                const __gotots_argument_102 = $state__diagnostics.Composite_projects_may_not_disable_declaration_emit;
                const __gotots_argument_103 = "declaration";
                const __gotots_argument_104 = "";
                const __gotots_argument_105 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_33 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_102, __gotots_argument_103, __gotots_argument_104, __gotots_argument_105);
            }
            if (Tristate_IsFalse__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incremental)) {
                const __gotots_callee_34 = createDiagnosticForOptionName;
                const __gotots_argument_106 = $state__diagnostics.Composite_projects_may_not_disable_incremental_compilation;
                const __gotots_argument_107 = "declaration";
                const __gotots_argument_108 = "";
                const __gotots_argument_109 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_34 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_106, __gotots_argument_107, __gotots_argument_108, __gotots_argument_109);
            }
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TsBuildInfoFile === "" && Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Incremental) && (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath === "") {
            const __gotots_callee_35 = createCompilerOptionsDiagnostic;
            const __gotots_argument_110 = $state__diagnostics.Option_incremental_is_only_valid_with_a_known_configuration_file_like_tsconfig_json_or_when_tsBuildInfoFile_is_explicitly_provided;
            const __gotots_argument_111 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_35 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_110, __gotots_argument_111);
        }
        Program.$go$private$compiler$verifyProjectReferences(p);
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite)) {
            let rootPaths = Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
            });
            const rootPaths$location = tsonicTypeScriptRuntime.boundLocation({}, () => rootPaths, rootPaths$next => rootPaths = rootPaths$next);
            const __gotots_range_0 = ParsedCommandLine__from_tsoptions.FileNames((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let fileName = __gotots_range_value_0;
                Set$Add$Named_tspath$Path(rootPaths$location, Program.$go$private$compiler$toPath(p, fileName));
            }
            const __gotots_range_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_1;
                if (sourceFileMayBeEmitted(file, new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), false) && !Set__from_collections.Has<Path__from_tspath>(rootPaths$location, SourceFile__from_ast.Path(file))) {
                    const __gotots_receiver_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.includeProcessor;
                    const __gotots_field_3 = processingDiagnosticKindExplainingFileInclude$constant();
                    const __gotots_field_0 = SourceFile__from_ast.Path(file);
                    const __gotots_field_1 = $state__diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern;
                    const __gotots_slice_element_0 = new GoInterfaceAdapter(SourceFile__from_ast.FileName(file));
                    const __gotots_callee_36 = configFilePath;
                    const __gotots_slice_element_1 = new GoInterfaceAdapter((__gotots_callee_36 ?? GoPanic.raiseRuntime("call of nil function"))());
                    const __gotots_field_2 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([__gotots_slice_element_0, __gotots_slice_element_1]);
                    const __gotots_field_4 = new $goInterfaceAdapter$PointerTo_Named_compiler$includeExplainingDiagnostic({ value: new includeExplainingDiagnostic(__gotots_field_0, void 0, __gotots_field_1, __gotots_field_2) });
                    const __gotots_argument_112 = { value: new processingDiagnostic(__gotots_field_3, __gotots_field_4) };
                    const __gotots_argument_113 = RuntimeSlice.literal<{
                        value: processingDiagnostic;
                    } | undefined>([__gotots_argument_112]);
                    includeProcessor.$go$private$compiler$addProcessingDiagnostic(__gotots_receiver_0, __gotots_argument_113);
                }
            }
        }
        let forEachOptionPathsSyntax: (($0: (($0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (callback: (($0: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            const __gotots_callee_37 = getCompilerOptionsObjectLiteralSyntax;
            const __gotots_argument_114 = (__gotots_callee_37 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_argument_115 = "paths";
            const __gotots_argument_116 = callback;
            const __gotots_argument_117 = RuntimeSlice.nil<gostring>();
            return ForEachPropertyAssignment__from_tsoptions<Diagnostic__from_ast>(__gotots_argument_114, __gotots_argument_115, __gotots_argument_116, __gotots_argument_117);
        };
        let createDiagnosticForOptionPaths: (($0: bool, $1: gostring, $2: {
            value: Message__from_diagnostics;
        } | undefined, $3: RuntimeSlice<$goInterface$Interface_void | undefined>) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (onKey: bool, key: gostring, message: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            const __gotots_callee_39 = forEachOptionPathsSyntax;
            const __gotots_argument_124 = (pathProp: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
                if (IsObjectLiteralExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((pathProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
                    const __gotots_callee_38 = createOptionDiagnosticInObjectLiteralSyntax;
                    const __gotots_argument_118 = Node__from_ast.AsObjectLiteralExpression(PropertyAssignment__from_ast.$storageOf(((pathProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer);
                    const __gotots_argument_119 = onKey;
                    const __gotots_argument_120 = key;
                    const __gotots_argument_121 = "";
                    const __gotots_argument_122 = message;
                    const __gotots_argument_123 = args;
                    return (__gotots_callee_38 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_118, __gotots_argument_119, __gotots_argument_120, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123);
                }
                return void 0;
            };
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = (__gotots_callee_39 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_124);
            if (diag === undefined) {
                const __gotots_callee_40 = createCompilerOptionsDiagnostic;
                const __gotots_argument_125 = message;
                const __gotots_argument_126 = args;
                diag = (__gotots_callee_40 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_125, __gotots_argument_126);
            }
            return diag;
        };
        let createDiagnosticForOptionPathKeyValue: (($0: gostring, $1: int, $2: {
            value: Message__from_diagnostics;
        } | undefined, $3: RuntimeSlice<$goInterface$Interface_void | undefined>) => tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined) | undefined = (key: gostring, valueIndex: int, message: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
            const __gotots_callee_42 = forEachOptionPathsSyntax;
            const __gotots_argument_131 = (pathProp: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
                if (IsObjectLiteralExpression__from_ast(PropertyAssignment__from_ast.$storageOf(((pathProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer)) {
                    return ForEachPropertyAssignment__from_tsoptions<Diagnostic__from_ast>(Node__from_ast.AsObjectLiteralExpression(PropertyAssignment__from_ast.$storageOf(((pathProp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer), key, (keyProps: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined => {
                        let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PropertyAssignment__from_ast.$storageOf(((keyProps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).Initializer;
                        if (IsArrayLiteralExpression__from_ast(initializer)) {
                            let elements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = Node__from_ast.ElementList(initializer);
                            if (!(elements === undefined) && NodeList__from_ast.$storageOf(((elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > valueIndex) {
                                const __gotots_callee_41 = sourceFile;
                                const __gotots_argument_127 = (__gotots_callee_41 ?? GoPanic.raiseRuntime("call of nil function"))();
                                const __gotots_argument_128 = NodeList__from_ast.$storageOf(((elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(valueIndex);
                                const __gotots_argument_129 = message;
                                const __gotots_argument_130 = args;
                                let diag__shadow_1: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = CreateDiagnosticForNodeInSourceFile__from_tsoptions(__gotots_argument_127, __gotots_argument_128, __gotots_argument_129, __gotots_argument_130);
                                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics.append(void 0, [diag__shadow_1]);
                                return diag__shadow_1;
                            }
                        }
                        return void 0;
                    }, RuntimeSlice.nil<gostring>());
                }
                return void 0;
            };
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = (__gotots_callee_42 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_131);
            if (diag === undefined) {
                const __gotots_callee_43 = createCompilerOptionsDiagnostic;
                const __gotots_argument_132 = message;
                const __gotots_argument_133 = args;
                diag = (__gotots_callee_43 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_132, __gotots_argument_133);
            }
            return diag;
        };
        const __gotots_range_2 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$SliceOf_string((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths));
        if (__gotots_range_2 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_0 = 1;
        __gotots_range_2(($argument0: gostring, $argument1: RuntimeSlice<gostring>): bool => {
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
            const __gotots_range_value_3 = $argument1;
            let key = __gotots_range_value_2;
            let value = __gotots_range_value_3;
            if (!hasZeroOrOneAsteriskCharacter(key)) {
                const __gotots_callee_44 = createDiagnosticForOptionPaths;
                const __gotots_argument_134 = true;
                const __gotots_argument_135 = key;
                const __gotots_argument_136 = $state__diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character;
                const __gotots_argument_137 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(key)]);
                (__gotots_callee_44 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_134, __gotots_argument_135, __gotots_argument_136, __gotots_argument_137);
            }
            if (value.isNil()) {
                const __gotots_callee_45 = createDiagnosticForOptionPaths;
                const __gotots_argument_138 = false;
                const __gotots_argument_139 = key;
                const __gotots_argument_140 = $state__diagnostics.Substitutions_for_pattern_0_should_be_an_array;
                const __gotots_argument_141 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(key)]);
                (__gotots_callee_45 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_138, __gotots_argument_139, __gotots_argument_140, __gotots_argument_141);
            }
            else if (value.length === 0) {
                const __gotots_callee_46 = createDiagnosticForOptionPaths;
                const __gotots_argument_142 = false;
                const __gotots_argument_143 = key;
                const __gotots_argument_144 = $state__diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array;
                const __gotots_argument_145 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(key)]);
                (__gotots_callee_46 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_142, __gotots_argument_143, __gotots_argument_144, __gotots_argument_145);
            }
            const __gotots_range_3 = value;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_3.length; __gotots_range_index_2++) {
                const __gotots_range_value_4 = __gotots_range_index_2;
                const __gotots_range_value_5 = __gotots_range_3.get(__gotots_range_index_2);
                let i = __gotots_range_value_4;
                let subst = __gotots_range_value_5;
                if (!hasZeroOrOneAsteriskCharacter(subst)) {
                    const __gotots_callee_47 = createDiagnosticForOptionPathKeyValue;
                    const __gotots_argument_146 = key;
                    const __gotots_argument_147 = i;
                    const __gotots_argument_148 = $state__diagnostics.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character;
                    const __gotots_argument_149 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(subst), new GoInterfaceAdapter(key)]);
                    (__gotots_callee_47 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_146, __gotots_argument_147, __gotots_argument_148, __gotots_argument_149);
                }
                if (!PathIsRelative__from_tspath(subst) && !PathIsAbsolute__from_tspath(subst)) {
                    const __gotots_callee_48 = createDiagnosticForOptionPathKeyValue;
                    const __gotots_argument_150 = key;
                    const __gotots_argument_151 = i;
                    const __gotots_argument_152 = $state__diagnostics.Non_relative_paths_are_not_allowed_Did_you_forget_a_leading_Slash;
                    const __gotots_argument_153 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                    (__gotots_callee_48 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_150, __gotots_argument_151, __gotots_argument_152, __gotots_argument_153);
                }
            }
            __gotots_range_state_0 = 1;
            return true;
        });
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        __gotots_range_state_0 = -2;
        if (Tristate_IsFalseOrUnknown__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap) && Tristate_IsFalseOrUnknown__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSourceMap)) {
            if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.InlineSources)) {
                const __gotots_callee_49 = createDiagnosticForOptionName;
                const __gotots_argument_154 = $state__diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided;
                const __gotots_argument_155 = "inlineSources";
                const __gotots_argument_156 = "";
                const __gotots_argument_157 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_49 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_154, __gotots_argument_155, __gotots_argument_156, __gotots_argument_157);
            }
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot !== "") {
                const __gotots_callee_50 = createDiagnosticForOptionName;
                const __gotots_argument_158 = $state__diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided;
                const __gotots_argument_159 = "sourceRoot";
                const __gotots_argument_160 = "";
                const __gotots_argument_161 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_50 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_158, __gotots_argument_159, __gotots_argument_160, __gotots_argument_161);
            }
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot !== "" && !(Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceMap) || Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap))) {
            const __gotots_callee_51 = createDiagnosticForOptionName;
            const __gotots_argument_162 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2;
            const __gotots_argument_163 = "mapRoot";
            const __gotots_argument_164 = "sourceMap";
            const __gotots_argument_165 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("declarationMap")]);
            (__gotots_callee_51 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_162, __gotots_argument_163, __gotots_argument_164, __gotots_argument_165);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir !== "") {
            if (!CompilerOptions__from_core.GetEmitDeclarations(options)) {
                const __gotots_callee_52 = createDiagnosticForOptionName;
                const __gotots_argument_166 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2;
                const __gotots_argument_167 = "declarationDir";
                const __gotots_argument_168 = "declaration";
                const __gotots_argument_169 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("composite")]);
                (__gotots_callee_52 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_166, __gotots_argument_167, __gotots_argument_168, __gotots_argument_169);
            }
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationMap) && !CompilerOptions__from_core.GetEmitDeclarations(options)) {
            const __gotots_callee_53 = createDiagnosticForOptionName;
            const __gotots_argument_170 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2;
            const __gotots_argument_171 = "declarationMap";
            const __gotots_argument_172 = "declaration";
            const __gotots_argument_173 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("composite")]);
            (__gotots_callee_53 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_170, __gotots_argument_171, __gotots_argument_172, __gotots_argument_173);
        }
        if (!(options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Lib.isNil() && Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoLib)) {
            const __gotots_callee_54 = createDiagnosticForOptionName;
            const __gotots_argument_174 = $state__diagnostics.Option_0_cannot_be_specified_with_option_1;
            const __gotots_argument_175 = "lib";
            const __gotots_argument_176 = "noLib";
            const __gotots_argument_177 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_54 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_174, __gotots_argument_175, __gotots_argument_176, __gotots_argument_177);
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsolatedModules) || Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax)) {
            if (Tristate_IsFalse__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PreserveConstEnums)) {
                const __gotots_callee_55 = createDiagnosticForOptionName;
                const __gotots_argument_178 = $state__diagnostics.Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled;
                const __gotots_argument_179 = IfElse$string(Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax), "verbatimModuleSyntax", "isolatedModules");
                const __gotots_argument_180 = "preserveConstEnums";
                const __gotots_argument_181 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_55 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_178, __gotots_argument_179, __gotots_argument_180, __gotots_argument_181);
            }
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "" || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir !== "" || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SourceRoot !== "" || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MapRoot !== "" || (CompilerOptions__from_core.GetEmitDeclarations(options) && (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir !== "")) {
            let dir = Program.CommonSourceDirectory(p);
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "" && dir === "" && Some$PointerTo_Named_ast$SourceFile((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files, (f: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
                return GetRootLength__from_tspath(SourceFile__from_ast.FileName(f)) > 1;
            })) {
                const __gotots_callee_56 = createDiagnosticForOptionName;
                const __gotots_argument_182 = $state__diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files;
                const __gotots_argument_183 = "outDir";
                const __gotots_argument_184 = "";
                const __gotots_argument_185 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_56 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_182, __gotots_argument_183, __gotots_argument_184, __gotots_argument_185);
            }
        }
        if (!Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit) && !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite) && (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir === "" && (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "" && ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "" || (CompilerOptions__from_core.GetEmitDeclarations(options) && (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.DeclarationDir !== "") || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile !== "")) {
            let dir = Program.CommonSourceDirectory(p);
            let emittedFiles = RuntimeSlice.nil<gostring>();
            const __gotots_range_4 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.files;
            for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
                const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_3);
                let file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = __gotots_range_value_6;
                if (!((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile && sourceFileMayBeEmitted(file, new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), false)) {
                    emittedFiles = emittedFiles.append("", [SourceFile__from_ast.FileName(file)]);
                }
            }
            let dir59 = GetComputedCommonSourceDirectory__from_outputpaths(emittedFiles, Program.GetCurrentDirectory(p), Program.UseCaseSensitiveFileNames(p));
            if (dir59 !== "" && GetCanonicalFileName__from_tspath(dir, Program.UseCaseSensitiveFileNames(p)) !== GetCanonicalFileName__from_tspath(dir59, Program.UseCaseSensitiveFileNames(p))) {
                let option1 = "";
                if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile !== "") {
                    option1 = "outFile";
                }
                else if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "") {
                    option1 = "outDir";
                }
                else {
                    option1 = "declarationDir";
                }
                let option2 = "";
                if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutFile === "" && (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutDir !== "") {
                    option2 = "declarationDir";
                }
                const __gotots_callee_57 = createDiagnosticForOption;
                const __gotots_argument_186 = true;
                const __gotots_argument_187 = option1;
                const __gotots_argument_188 = option2;
                const __gotots_argument_189 = $state__diagnostics.The_common_source_directory_of_0_is_1_The_rootDir_setting_must_be_explicitly_set_to_this_or_another_path_to_adjust_your_output_s_file_layout;
                const __gotots_argument_190 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(GetBaseFileName__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath)), new GoInterfaceAdapter(GetRelativePathFromFile__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath, dir59, ComparePathsOptions__from_tspath.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.comparePathsOptions)))]);
                let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = (__gotots_callee_57 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_186, __gotots_argument_187, __gotots_argument_188, __gotots_argument_189, __gotots_argument_190);
                Diagnostic__from_ast.AddMessageChain(diag, NewCompilerDiagnostic__from_ast($state__diagnostics.Visit_https_Colon_Slash_Slashaka_ms_Slashts6_for_migration_information, RuntimeSlice.nil<$goInterface$Interface_void | undefined>()));
            }
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CheckJs) && !CompilerOptions__from_core.GetAllowJS(options)) {
            const __gotots_callee_58 = createDiagnosticForOptionName;
            const __gotots_argument_191 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1;
            const __gotots_argument_192 = "checkJs";
            const __gotots_argument_193 = "allowJs";
            const __gotots_argument_194 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_58 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_191, __gotots_argument_192, __gotots_argument_193, __gotots_argument_194);
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDeclarationOnly)) {
            if (!CompilerOptions__from_core.GetEmitDeclarations(options)) {
                const __gotots_callee_59 = createDiagnosticForOptionName;
                const __gotots_argument_195 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2;
                const __gotots_argument_196 = "emitDeclarationOnly";
                const __gotots_argument_197 = "declaration";
                const __gotots_argument_198 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("composite")]);
                (__gotots_callee_59 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_195, __gotots_argument_196, __gotots_argument_197, __gotots_argument_198);
            }
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDecoratorMetadata) && Tristate_IsFalseOrUnknown__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators)) {
            const __gotots_callee_60 = createDiagnosticForOptionName;
            const __gotots_argument_199 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1;
            const __gotots_argument_200 = "emitDecoratorMetadata";
            const __gotots_argument_201 = "experimentalDecorators";
            const __gotots_argument_202 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_60 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_199, __gotots_argument_200, __gotots_argument_201, __gotots_argument_202);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFactory !== "") {
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReactNamespace !== "") {
                const __gotots_callee_61 = createDiagnosticForOptionName;
                const __gotots_argument_203 = $state__diagnostics.Option_0_cannot_be_specified_with_option_1;
                const __gotots_argument_204 = "reactNamespace";
                const __gotots_argument_205 = "jsxFactory";
                const __gotots_argument_206 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_61 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_203, __gotots_argument_204, __gotots_argument_205, __gotots_argument_206);
            }
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSX$constant__from_core() || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core()) {
                const __gotots_callee_62 = createDiagnosticForOptionName;
                const __gotots_argument_207 = $state__diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1;
                const __gotots_argument_208 = "jsxFactory";
                const __gotots_argument_209 = JsxEmit_String__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx);
                const __gotots_argument_210 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_62 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_207, __gotots_argument_208, __gotots_argument_209, __gotots_argument_210);
            }
            if (ParseIsolatedEntityName__from_parser((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFactory) === undefined) {
                const __gotots_callee_63 = createOptionValueDiagnostic;
                const __gotots_argument_211 = "jsxFactory";
                const __gotots_argument_212 = $state__diagnostics.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name;
                const __gotots_argument_213 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFactory)]);
                (__gotots_callee_63 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_211, __gotots_argument_212, __gotots_argument_213);
            }
        }
        else if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReactNamespace !== "" && !IsIdentifierText__from_scanner((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReactNamespace, LanguageVariantStandard$constant__from_core())) {
            const __gotots_callee_64 = createOptionValueDiagnostic;
            const __gotots_argument_214 = "reactNamespace";
            const __gotots_argument_215 = $state__diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier;
            const __gotots_argument_216 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReactNamespace)]);
            (__gotots_callee_64 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_214, __gotots_argument_215, __gotots_argument_216);
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFragmentFactory !== "") {
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFactory === "") {
                const __gotots_callee_65 = createDiagnosticForOptionName;
                const __gotots_argument_217 = $state__diagnostics.Option_0_cannot_be_specified_without_specifying_option_1;
                const __gotots_argument_218 = "jsxFragmentFactory";
                const __gotots_argument_219 = "jsxFactory";
                const __gotots_argument_220 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_65 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_217, __gotots_argument_218, __gotots_argument_219, __gotots_argument_220);
            }
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSX$constant__from_core() || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core()) {
                const __gotots_callee_66 = createDiagnosticForOptionName;
                const __gotots_argument_221 = $state__diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1;
                const __gotots_argument_222 = "jsxFragmentFactory";
                const __gotots_argument_223 = JsxEmit_String__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx);
                const __gotots_argument_224 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_66 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_221, __gotots_argument_222, __gotots_argument_223, __gotots_argument_224);
            }
            if (ParseIsolatedEntityName__from_parser((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFragmentFactory) === undefined) {
                const __gotots_callee_67 = createOptionValueDiagnostic;
                const __gotots_argument_225 = "jsxFragmentFactory";
                const __gotots_argument_226 = $state__diagnostics.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name;
                const __gotots_argument_227 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxFragmentFactory)]);
                (__gotots_callee_67 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_225, __gotots_argument_226, __gotots_argument_227);
            }
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ReactNamespace !== "") {
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSX$constant__from_core() || (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReactJSXDev$constant__from_core()) {
                const __gotots_callee_68 = createDiagnosticForOptionName;
                const __gotots_argument_228 = $state__diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1;
                const __gotots_argument_229 = "reactNamespace";
                const __gotots_argument_230 = JsxEmit_String__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx);
                const __gotots_argument_231 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_68 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_228, __gotots_argument_229, __gotots_argument_230, __gotots_argument_231);
            }
        }
        if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.JsxImportSource !== "") {
            if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx === JsxEmitReact$constant__from_core()) {
                const __gotots_callee_69 = createDiagnosticForOptionName;
                const __gotots_argument_232 = $state__diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1;
                const __gotots_argument_233 = "jsxImportSource";
                const __gotots_argument_234 = JsxEmit_String__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Jsx);
                const __gotots_argument_235 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
                (__gotots_callee_69 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_232, __gotots_argument_233, __gotots_argument_234, __gotots_argument_235);
            }
        }
        let moduleKind = CompilerOptions__from_core.GetEmitModuleKind(options);
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AllowImportingTsExtensions) && !(Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit) || Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EmitDeclarationOnly) || Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RewriteRelativeImportExtensions))) {
            const __gotots_callee_70 = createOptionValueDiagnostic;
            const __gotots_argument_236 = "allowImportingTsExtensions";
            const __gotots_argument_237 = $state__diagnostics.Option_allowImportingTsExtensions_can_only_be_used_when_one_of_noEmit_emitDeclarationOnly_or_rewriteRelativeImportExtensions_is_set;
            const __gotots_argument_238 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_70 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_236, __gotots_argument_237, __gotots_argument_238);
        }
        let moduleResolution = CompilerOptions__from_core.GetModuleResolutionKind(options);
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonExports) && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
            const __gotots_callee_71 = createDiagnosticForOptionName;
            const __gotots_argument_239 = $state__diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler;
            const __gotots_argument_240 = "resolvePackageJsonExports";
            const __gotots_argument_241 = "";
            const __gotots_argument_242 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_71 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_239, __gotots_argument_240, __gotots_argument_241, __gotots_argument_242);
        }
        if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolvePackageJsonImports) && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
            const __gotots_callee_72 = createDiagnosticForOptionName;
            const __gotots_argument_243 = $state__diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler;
            const __gotots_argument_244 = "resolvePackageJsonImports";
            const __gotots_argument_245 = "";
            const __gotots_argument_246 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_72 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_243, __gotots_argument_244, __gotots_argument_245, __gotots_argument_246);
        }
        if (!(options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.CustomConditions.isNil() && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
            const __gotots_callee_73 = createDiagnosticForOptionName;
            const __gotots_argument_247 = $state__diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler;
            const __gotots_argument_248 = "customConditions";
            const __gotots_argument_249 = "";
            const __gotots_argument_250 = RuntimeSlice.nil<$goInterface$Interface_void | undefined>();
            (__gotots_callee_73 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_247, __gotots_argument_248, __gotots_argument_249, __gotots_argument_250);
        }
        if (moduleResolution === ModuleResolutionKindBundler$constant__from_core() && !emitModuleKindIsNonNodeESM(moduleKind) && !(moduleKind === ModuleKindPreserve$constant__from_core()) && !(moduleKind === ModuleKindCommonJS$constant__from_core())) {
            const __gotots_callee_74 = createOptionValueDiagnostic;
            const __gotots_argument_251 = "moduleResolution";
            const __gotots_argument_252 = $state__diagnostics.Option_0_can_only_be_used_when_module_is_set_to_preserve_commonjs_or_es2015_or_later;
            const __gotots_argument_253 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter("bundler")]);
            (__gotots_callee_74 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_251, __gotots_argument_252, __gotots_argument_253);
        }
        if (ModuleKindNode16$constant__from_core() <= moduleKind && moduleKind <= ModuleKindNodeNext$constant__from_core() && !(ModuleResolutionKindNode16$constant__from_core() <= moduleResolution && moduleResolution <= ModuleResolutionKindNodeNext$constant__from_core())) {
            let moduleKindName = ModuleKind_String__from_core(moduleKind);
            let moduleResolutionName = "";
            {
                const __gotots_results_1 = $state__core.ModuleKindToModuleResolutionKind.lookupOk(moduleKind);
                let v = __gotots_results_1[0];
                let ok = __gotots_results_1[1];
                if (ok) {
                    moduleResolutionName = ModuleResolutionKind_String__from_core(v);
                }
                else {
                    moduleResolutionName = "Node16";
                }
            }
            const __gotots_callee_75 = createOptionValueDiagnostic;
            const __gotots_argument_254 = "moduleResolution";
            const __gotots_argument_255 = $state__diagnostics.Option_moduleResolution_must_be_set_to_0_or_left_unspecified_when_option_module_is_set_to_1;
            const __gotots_argument_256 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(moduleResolutionName), new GoInterfaceAdapter(moduleKindName)]);
            (__gotots_callee_75 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_254, __gotots_argument_255, __gotots_argument_256);
        }
        else if (ModuleResolutionKindNode16$constant__from_core() <= moduleResolution && moduleResolution <= ModuleResolutionKindNodeNext$constant__from_core() && !(ModuleKindNode16$constant__from_core() <= moduleKind && moduleKind <= ModuleKindNodeNext$constant__from_core())) {
            let moduleResolutionName = ModuleResolutionKind_String__from_core(moduleResolution);
            const __gotots_callee_76 = createOptionValueDiagnostic;
            const __gotots_argument_257 = "module";
            const __gotots_argument_258 = $state__diagnostics.Option_module_must_be_set_to_0_when_option_moduleResolution_is_set_to_1;
            const __gotots_argument_259 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(moduleResolutionName), new GoInterfaceAdapter(moduleResolutionName)]);
            (__gotots_callee_76 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_257, __gotots_argument_258, __gotots_argument_259);
        }
        if (!Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit) && !Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SuppressOutputPathCheck)) {
            let emitFilesSeen = Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
                return $goMap$MapOf_string_To_Struct_void.nil();
            });
            const emitFilesSeen$location = tsonicTypeScriptRuntime.boundLocation({}, () => emitFilesSeen, emitFilesSeen$next => emitFilesSeen = emitFilesSeen$next);
            let verifyEmitFilePath: (($0: gostring) => void) | undefined = (emitFileName: gostring): void => {
                if (emitFileName !== "") {
                    let emitFilePath = Program.$go$private$compiler$toPath(p, emitFileName);
                    {
                        const __gotots_results_2 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles.filesByPath.lookupOk(emitFilePath);
                        let ok = __gotots_results_2[1];
                        if (ok) {
                            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = NewCompilerDiagnostic__from_ast($state__diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(emitFileName)]));
                            const __gotots_callee_77 = configFilePath;
                            const __gotots_binary_operand_2 = (__gotots_callee_77 ?? GoPanic.raiseRuntime("call of nil function"))();
                            const __gotots_binary_operand_3 = "";
                            if (__gotots_binary_operand_2 === __gotots_binary_operand_3) {
                                Diagnostic__from_ast.AddMessageChain(diag, NewCompilerDiagnostic__from_ast($state__diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig, RuntimeSlice.nil<$goInterface$Interface_void | undefined>()));
                            }
                            Program.$go$private$compiler$blockEmittingOfFile(p, emitFileName, diag);
                        }
                    }
                    let emitFileKey = "";
                    const __gotots_receiver_1 = Program.Host(p);
                    const __gotots_receiver_2 = goInterfaceNonNil<CompilerHost>(__gotots_receiver_1).FS();
                    if (!goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).UseCaseSensitiveFileNames()) {
                        emitFileKey = ToFileNameLowerCase__from_tspath(emitFilePath.$value);
                    }
                    else {
                        emitFileKey = emitFilePath.$value;
                    }
                    if (Set__from_collections.Has<gostring>(emitFilesSeen$location, emitFileKey)) {
                        Program.$go$private$compiler$blockEmittingOfFile(p, emitFileName, NewCompilerDiagnostic__from_ast($state__diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(emitFileName)])));
                    }
                    else {
                        Set$Add$string(emitFilesSeen$location, emitFileKey);
                    }
                }
            };
            ForEachEmittedFile__from_outputpaths(new $goInterfaceAdapter$PointerTo_Named_compiler$Program(p), options, (emitFileNames: OutputPaths__from_outputpaths | undefined, sourceFile__shadow_1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool => {
                const __gotots_callee_78 = verifyEmitFilePath;
                const __gotots_argument_260 = OutputPaths__from_outputpaths.JsFilePath(emitFileNames);
                (__gotots_callee_78 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_260);
                const __gotots_callee_79 = verifyEmitFilePath;
                const __gotots_argument_261 = OutputPaths__from_outputpaths.SourceMapFilePath(emitFileNames);
                (__gotots_callee_79 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_261);
                const __gotots_callee_80 = verifyEmitFilePath;
                const __gotots_argument_262 = OutputPaths__from_outputpaths.DeclarationFilePath(emitFileNames);
                (__gotots_callee_80 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_262);
                const __gotots_callee_81 = verifyEmitFilePath;
                const __gotots_argument_263 = OutputPaths__from_outputpaths.DeclarationMapPath(emitFileNames);
                (__gotots_callee_81 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_263);
                return false;
            }, Program.$go$private$compiler$getSourceFilesToEmit(p, void 0, false), false);
            const __gotots_callee_82 = verifyEmitFilePath;
            const __gotots_argument_264 = ParsedCommandLine__from_tsoptions.GetBuildInfoFileName((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config);
            (__gotots_callee_82 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_264);
        }
    }
    static $go$private$compiler$verifyProjectReferences(p: {
        value: Program;
    } | undefined): void {
        let buildInfoFileName = IfElse$string(!Tristate_IsTrue__from_core((Program.Options(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.SuppressOutputPathCheck), ParsedCommandLine__from_tsoptions.GetBuildInfoFileName((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Config), "");
        let createDiagnosticForReference: (($0: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, $1: int, $2: {
            value: Message__from_diagnostics;
        } | undefined, $3: RuntimeSlice<$goInterface$Interface_void | undefined>) => void) | undefined = (config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, index: int, message: {
            value: Message__from_diagnostics;
        } | undefined, args: RuntimeSlice<$goInterface$Interface_void | undefined>): void => {
            let diag: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = CreateDiagnosticAtReferenceSyntax__from_tsoptions(config, index, message, args);
            if (diag === undefined) {
                diag = NewCompilerDiagnostic__from_ast(message, args);
            }
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.programDiagnostics.append(void 0, [diag]);
        };
        Program.RangeResolvedProjectReference(p, (path: Path__from_tspath, config: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, parent: tsonicTypeScriptRuntime.Location<ParsedCommandLine__from_tsoptions> | undefined, index: int): bool => {
            let ref: ProjectReference__from_core | undefined = ParsedCommandLine__from_tsoptions.ProjectReferences(parent).get(index);
            if (config === undefined) {
                const __gotots_callee_83 = createDiagnosticForReference;
                const __gotots_argument_265 = parent;
                const __gotots_argument_266 = index;
                const __gotots_argument_267 = $state__diagnostics.File_0_not_found;
                const __gotots_argument_268 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path)]);
                (__gotots_callee_83 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_265, __gotots_argument_266, __gotots_argument_267, __gotots_argument_268);
                return true;
            }
            let refOptions: {
                value: CompilerOptions__from_core;
            } | undefined = ParsedCommandLine__from_tsoptions.CompilerOptions(config);
            if (!Tristate_IsTrue__from_core((refOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite) || Tristate_IsTrue__from_core((refOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit)) {
                if (ParsedCommandLine__from_tsoptions.FileNames(parent).length > 0) {
                    if (!Tristate_IsTrue__from_core((refOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Composite)) {
                        const __gotots_callee_84 = createDiagnosticForReference;
                        const __gotots_argument_269 = parent;
                        const __gotots_argument_270 = index;
                        const __gotots_argument_271 = $state__diagnostics.Referenced_project_0_must_have_setting_composite_Colon_true;
                        const __gotots_argument_272 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path)]);
                        (__gotots_callee_84 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_269, __gotots_argument_270, __gotots_argument_271, __gotots_argument_272);
                    }
                    if (Tristate_IsTrue__from_core((refOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit)) {
                        const __gotots_callee_85 = createDiagnosticForReference;
                        const __gotots_argument_273 = parent;
                        const __gotots_argument_274 = index;
                        const __gotots_argument_275 = $state__diagnostics.Referenced_project_0_may_not_disable_emit;
                        const __gotots_argument_276 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path)]);
                        (__gotots_callee_85 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_273, __gotots_argument_274, __gotots_argument_275, __gotots_argument_276);
                    }
                }
            }
            if (buildInfoFileName !== "" && buildInfoFileName === ParsedCommandLine__from_tsoptions.GetBuildInfoFileName(config)) {
                const __gotots_callee_86 = createDiagnosticForReference;
                const __gotots_argument_277 = parent;
                const __gotots_argument_278 = index;
                const __gotots_argument_279 = $state__diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1;
                const __gotots_argument_280 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(buildInfoFileName), new GoInterfaceAdapter((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path)]);
                (__gotots_callee_86 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_277, __gotots_argument_278, __gotots_argument_279, __gotots_argument_280);
                const __gotots_store_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                Set$Add$Named_tspath$Path(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "hasEmitBlockingDiagnostics"), Program.$go$private$compiler$toPath(p, buildInfoFileName));
            }
            return true;
        });
    }
}
export function NewProgram(opts: ProgramOptions): {
    value: Program;
} | undefined {
    const __gotots_defers_0: (($go$recovery: GoRecovery) => void)[] = [];
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: {
        value: Program;
    } | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                let p: {
                    value: Program;
                } | undefined = { value: new Program(ProgramOptions.$copy(opts), void 0, void 0, ComparePathsOptions__from_tspath.$zero(), processedFiles.$zero(), 0, "", named_sync.SyncOnceOperations.$zero(), SyncMap__from_collections.$zero<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>>(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), Set__from_collections.$zero<Path__from_tspath>((): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
                        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.nil();
                    }), named_sync.SyncOnceOperations.$zero(), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(), lazyValue.$zero<Set__from_collections<gostring>>(), lazyValue.$zero<KnownSymlinks__from_symlinks>(), lazyValue.$zero<packageNamesInfo>(), named_sync.SyncOnceOperations.$zero(), false, named_sync.SyncOnceOperations.$zero(), GoMap.nil<gostring, bool>(false)) };
                if (!((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing === undefined)) {
                    const __gotots_callee_0: (() => void) | undefined = Tracing__from_tracing.Push((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts.Tracing, PhaseProgram$constant__from_tracing(), "createProgram", $goMap$MapOf_string_To_Interface_void.make(1, [["configFilePath", new GoInterfaceAdapter((ParsedCommandLine__from_tsoptions.CompilerOptions(opts.Config) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath)]]), true);
                    const __gotots_deferred_1 = DeferredCallableRegistry.resolve(__gotots_callee_0);
                    __gotots_defers_0.push(($go$recovery: GoRecovery): void => {
                        __gotots_deferred_1 === undefined ? (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))() : __gotots_deferred_1($go$recovery);
                    });
                }
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.processedFiles = processAllProgramFiles(ProgramOptions.$copy((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.opts), Program.SingleThreaded(p));
                Program.$go$private$compiler$initCheckerPool(p);
                Program.$go$private$compiler$verifyCompilerOptions(p);
                __gotots_return_0 = p;
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
export function canReplaceFileInProgram(file1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, file2: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return !(file2 === undefined) && SourceFileParseOptions__from_ast.$equal(SourceFile__from_ast.ParseOptions(file1), SourceFile__from_ast.ParseOptions(file2)) && ((file1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.UsesUriStyleNodeCoreModules === ((file2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.UsesUriStyleNodeCoreModules && EqualFunc$SliceOf_PointerTo_Named_ast$Node$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(SourceFile__from_ast.Imports(file1), SourceFile__from_ast.Imports(file2), equalModuleSpecifiers) && EqualFunc$SliceOf_PointerTo_Named_ast$Node$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(((file1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations, ((file2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ModuleAugmentations, equalModuleAugmentationNames) && Equal$SliceOf_string$string(((file1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.AmbientModuleNames, ((file2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.AmbientModuleNames) && EqualFunc$SliceOf_PointerTo_Named_ast$FileReference$SliceOf_PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference(((file1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles, ((file2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ReferencedFiles, equalFileReferences) && EqualFunc$SliceOf_PointerTo_Named_ast$FileReference$SliceOf_PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference(((file1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives, ((file2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.TypeReferenceDirectives, equalFileReferences) && EqualFunc$SliceOf_PointerTo_Named_ast$FileReference$SliceOf_PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference$PointerTo_Named_ast$FileReference(((file1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives, ((file2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.LibReferenceDirectives, equalFileReferences) && equalCheckJSDirectives(((file1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CheckJsDirective, ((file2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.CheckJsDirective);
}
export function equalModuleSpecifiers(n1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, n2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((n1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === Node__from_ast.$storageOf(((n2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind && (!IsStringLiteral__from_ast(n1) || Node__from_ast.Text(n1) === Node__from_ast.Text(n2));
}
export function equalModuleAugmentationNames(n1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, n2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((n1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === Node__from_ast.$storageOf(((n2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind && Node__from_ast.Text(n1) === Node__from_ast.Text(n2);
}
export function equalFileReferences(f1: {
    value: FileReference__from_ast;
} | undefined, f2: {
    value: FileReference__from_ast;
} | undefined): bool {
    return (f1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName === (f2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FileName && (f1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode === (f2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ResolutionMode && (f1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve === (f2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Preserve;
}
export function equalCheckJSDirectives(d1: {
    value: CheckJsDirective__from_ast;
} | undefined, d2: {
    value: CheckJsDirective__from_ast;
} | undefined): bool {
    return d1 === undefined && d2 === undefined || !(d1 === undefined) && !(d2 === undefined) && (d1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enabled === (d2 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Enabled;
}
export function getAdditionalJSSyntacticDiagnostics(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators)) {
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    }
    let diags = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
    let walk: Visitor__from_ast = new Visitor__from_ast(void 0);
    walk = new Visitor__from_ast((node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsDecorators$constant__from_ast()) >>> 0 === 0) {
            return false;
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParameter$constant__from_ast() && HasDecorators__from_ast(node)) {
            let decorator: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Find$PointerTo_Named_ast$Node(Node__from_ast.ModifierNodes(node), IsDecorator__from_ast);
            if (!(decorator === undefined)) {
                diags = diags.append(void 0, [NewDiagnostic__from_ast(file, TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((decorator ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)), $state__diagnostics.Decorators_are_not_valid_here, RuntimeSlice.nil<$goInterface$Interface_void | undefined>())]);
            }
        }
        Node__from_ast.ForEachChild(node, walk);
        return false;
    });
    const __gotots_store_4 = NodeBase__from_ast.$storageOf(((file ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    Node__from_ast.ForEachChild(NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf)), walk);
    return diags;
}
export function hasZeroOrOneAsteriskCharacter(str: gostring): bool {
    let seenAsterisk = false;
    const __gotots_range_5 = str;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_5, __gotots_range_index_4);
        const __gotots_range_value_7 = __gotots_range_decode_0[0];
        let ch = __gotots_range_value_7;
        __gotots_range_index_4 += __gotots_range_decode_0[1];
        if (ch === 42) {
            if (!seenAsterisk) {
                seenAsterisk = true;
            }
            else {
                return false;
            }
        }
    }
    return true;
}
export function moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution: ModuleResolutionKind__from_core): bool {
    return moduleResolution >= ModuleResolutionKindNode16$constant__from_core() && moduleResolution <= ModuleResolutionKindNodeNext$constant__from_core() || moduleResolution === ModuleResolutionKindBundler$constant__from_core();
}
export function emitModuleKindIsNonNodeESM(moduleKind: ModuleKind__from_core): bool {
    return moduleKind >= ModuleKindES2015$constant__from_core() && moduleKind <= ModuleKindESNext$constant__from_core();
}
export function FilterNoEmitSemanticDiagnostics(diagnostics__shadow_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, options: {
    value: CompilerOptions__from_core;
} | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (!Tristate_IsTrue__from_core((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit)) {
        return diagnostics__shadow_1;
    }
    return Filter$PointerTo_Named_ast$Diagnostic(diagnostics__shadow_1, (d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined): bool => {
        return !Diagnostic__from_ast.SkippedOnNoEmit(d);
    });
}
export function isCommentOrBlankLine(text: gostring, pos: int): bool {
    for (; pos < text.length && (goStringIndex(text, pos) === 32 || goStringIndex(text, pos) === 9);) {
        pos++;
    }
    return pos === text.length || pos < text.length && (goStringIndex(text, pos) === 13 || goStringIndex(text, pos) === 10) || pos + 1 < text.length && goStringIndex(text, pos) === 47 && goStringIndex(text, pos + 1) === 47;
}
export function SortAndDeduplicateDiagnostics(diagnostics__shadow_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    diagnostics__shadow_1 = Clone$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(diagnostics__shadow_1);
    SortFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(diagnostics__shadow_1, CompareDiagnostics__from_ast);
    return compactAndMergeRelatedInfos(diagnostics__shadow_1);
}
export function compactAndMergeRelatedInfos(diagnostics__shadow_1: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    if (diagnostics__shadow_1.length < 2) {
        return diagnostics__shadow_1;
    }
    let i = 0;
    let j = 0;
    for (; i < diagnostics__shadow_1.length;) {
        let d: tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined = diagnostics__shadow_1.get(i);
        let n = 1;
        for (; i + n < diagnostics__shadow_1.length && EqualDiagnosticsNoRelatedInfo__from_ast(d, diagnostics__shadow_1.get(i + n));) {
            n++;
        }
        if (n > 1) {
            let relatedInfos = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>();
            const __gotots_range_10 = n;
            for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10; __gotots_range_index_9++) {
                const __gotots_range_value_12 = __gotots_range_index_9;
                let k = __gotots_range_value_12;
                relatedInfos = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(relatedInfos, Diagnostic__from_ast.RelatedInformation(diagnostics__shadow_1.get(i + k)), void 0);
            }
            if (!relatedInfos.isNil()) {
                SortFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(relatedInfos, CompareDiagnostics__from_ast);
                relatedInfos = CompactFunc$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(relatedInfos, EqualDiagnostics__from_ast);
                d = Diagnostic__from_ast.SetRelatedInfo(Diagnostic__from_ast.Clone(d), relatedInfos);
            }
        }
        diagnostics__shadow_1.set(j, d);
        i += n;
        j++;
    }
    goSliceClear(diagnostics__shadow_1.slice(j, null, null), void 0);
    return diagnostics__shadow_1.slice(0, j, null);
}
export class WriteFileData {
    declare private readonly $goType: void;
    public constructor(public SourceMapUrlPos: int, public BuildInfo: $goInterface$Interface_void | undefined, public Diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public SkippedDtsWrite: bool) {
    }
    declare private readonly then?: never;
}
export class WriteFile {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: gostring, $1: gostring, $2: WriteFileData | undefined) => GoInterface | undefined) | undefined) {
    }
    declare private readonly then?: never;
}
export class EmitOptions {
    declare private readonly $goType: void;
    public constructor(public TargetSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, public EmitOnly: EmitOnly, public WriteFile: WriteFile) {
    }
    static $copy($source: EmitOptions): EmitOptions {
        return new EmitOptions($source.TargetSourceFile, $source.EmitOnly, $source.WriteFile);
    }
    declare private readonly then?: never;
}
export class EmitResult {
    declare private readonly $goType: void;
    public constructor(public EmitSkipped: bool, public Diagnostics: RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>, public EmittedFiles: RuntimeSlice<gostring>, public SourceMaps: RuntimeSlice<{
        value: SourceMapEmitResult;
    } | undefined>) {
    }
    static $zero(): EmitResult {
        return new EmitResult(false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
            value: SourceMapEmitResult;
        } | undefined>());
    }
    static $copy($source: EmitResult): EmitResult {
        return new EmitResult($source.EmitSkipped, $source.Diagnostics, $source.EmittedFiles, $source.SourceMaps);
    }
    declare private readonly then?: never;
}
export class SourceMapEmitResult {
    declare private readonly $goType: void;
    public constructor(public InputSourceFileNames: RuntimeSlice<gostring>, public SourceMap: {
        value: RawSourceMap__from_sourcemap;
    } | undefined, public GeneratedFile: gostring) {
    }
    static $copy($source: SourceMapEmitResult): SourceMapEmitResult {
        return new SourceMapEmitResult($source.InputSourceFileNames, $source.SourceMap, $source.GeneratedFile);
    }
    declare private readonly then?: never;
}
export function CombineEmitResults(results: RuntimeSlice<tsonicTypeScriptRuntime.Location<EmitResult> | undefined>): tsonicTypeScriptRuntime.Location<EmitResult> | undefined {
    let result: tsonicTypeScriptRuntime.Location<EmitResult> | undefined = tsonicTypeScriptRuntime.location<EmitResult>(new EmitResult(false, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
        value: SourceMapEmitResult;
    } | undefined>()));
    const __gotots_range_17 = results;
    for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_17.length; __gotots_range_index_16++) {
        const __gotots_range_value_20 = __gotots_range_17.get(__gotots_range_index_16);
        let emitResult: tsonicTypeScriptRuntime.Location<EmitResult> | undefined = __gotots_range_value_20;
        if (emitResult === undefined) {
            continue;
        }
        if (((emitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.EmitSkipped) {
            ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.EmitSkipped = true;
        }
        ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.Diagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.Diagnostics, ((emitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.Diagnostics, void 0);
        ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.EmittedFiles = goSliceAppendSlice<gostring>(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.EmittedFiles, ((emitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.EmittedFiles, "");
        if (!((emitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.SourceMaps.isNil()) {
            ((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.SourceMaps = goSliceAppendSlice<{
                value: SourceMapEmitResult;
            } | undefined>(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.SourceMaps, ((emitResult ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<EmitResult>).value.SourceMaps, void 0);
        }
    }
    return result;
}
export interface ProgramLike extends GoInterfaceValue {
    CommonSourceDirectory(): gostring;
    Emit($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: EmitOptions): tsonicTypeScriptRuntime.Location<EmitResult> | undefined;
    GetBindDiagnostics($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    GetConfigFileParsingDiagnostics(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    GetDeclarationDiagnostics($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    GetGlobalDiagnostics($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    GetProgramDiagnostics(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    GetSemanticDiagnostics($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    GetSourceFile($argument0: gostring): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined;
    GetSourceFiles(): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>;
    GetSuggestionDiagnostics($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    GetSyntacticDiagnostics($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>;
    IsSourceFileDefaultLibrary($argument0: Path__from_tspath): bool;
    Options(): {
        value: CompilerOptions__from_core;
    } | undefined;
    Program(): {
        value: Program;
    } | undefined;
}
export const ProgramLike$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$Emit$Named_context$Context_Named_compiler$EmitOptions_to_PointerTo_Named_compiler$EmitResult, $goInterfaceMethod$GetBindDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetConfigFileParsingDiagnostics$void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetDeclarationDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetGlobalDiagnostics$Named_context$Context_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetProgramDiagnostics$void_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetSemanticDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetSourceFile$string_to_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSourceFiles$void_to_SliceOf_PointerTo_Named_ast$SourceFile, $goInterfaceMethod$GetSuggestionDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$GetSyntacticDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, $goInterfaceMethod$IsSourceFileDefaultLibrary$Named_tspath$Path_to_bool, $goInterfaceMethod$Options$void_to_PointerTo_Named_core$CompilerOptions, $goInterfaceMethod$Program$void_to_PointerTo_Named_compiler$Program]);
export function ProgramLike$is(value: GoInterfaceValue | undefined): value is ProgramLike {
    return value !== undefined && value.$go$implements(ProgramLike$contract);
}
export function HandleNoEmitOnError(ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, program: ProgramLike | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<EmitResult> | undefined {
    const __gotots_receiver_29 = program;
    if (!Tristate_IsTrue__from_core((goInterfaceNonNil<ProgramLike>(__gotots_receiver_29).Options() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmitOnError)) {
        return void 0;
    }
    const __gotots_argument_335 = ctx;
    const __gotots_argument_336 = program;
    const __gotots_argument_337 = file;
    const __gotots_argument_338 = true;
    const __gotots_receiver_30 = goInterfaceNonNil(program);
    const __gotots_argument_339 = $goDeferred$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic.register(($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => __gotots_receiver_30.GetBindDiagnostics($argument0, $argument1), ($go$recovery: GoRecovery, $argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        const __gotots_receiver_31: ProgramLike = goInterfaceNonNil<ProgramLike>(__gotots_receiver_30);
        const __gotots_deferred_2 = $goDeferred$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic.resolveMethod($goInterfaceMethod$GetBindDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, __gotots_receiver_31);
        return __gotots_deferred_2 === undefined ? __gotots_receiver_31.GetBindDiagnostics($argument0, $argument1) : __gotots_deferred_2($go$recovery, __gotots_receiver_31, $argument0, $argument1);
    });
    const __gotots_receiver_32 = goInterfaceNonNil(program);
    const __gotots_argument_340 = $goDeferred$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic.register(($argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => __gotots_receiver_32.GetSemanticDiagnostics($argument0, $argument1), ($go$recovery: GoRecovery, $argument0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> => {
        const __gotots_receiver_33: ProgramLike = goInterfaceNonNil<ProgramLike>(__gotots_receiver_32);
        const __gotots_deferred_3 = $goDeferred$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic.resolveMethod($goInterfaceMethod$GetSemanticDiagnostics$Named_context$Context_PointerTo_Named_ast$SourceFile_to_SliceOf_PointerTo_Named_ast$Diagnostic, __gotots_receiver_33);
        return __gotots_deferred_3 === undefined ? __gotots_receiver_33.GetSemanticDiagnostics($argument0, $argument1) : __gotots_deferred_3($go$recovery, __gotots_receiver_33, $argument0, $argument1);
    });
    let diagnostics__shadow_1 = GetDiagnosticsOfAnyProgram(__gotots_argument_335, __gotots_argument_336, __gotots_argument_337, __gotots_argument_338, __gotots_argument_339, __gotots_argument_340);
    if (diagnostics__shadow_1.length === 0) {
        return void 0;
    }
    return tsonicTypeScriptRuntime.location<EmitResult>(new EmitResult(true, diagnostics__shadow_1, RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<{
        value: SourceMapEmitResult;
    } | undefined>()));
}
export function GetDiagnosticsOfAnyProgram(ctx: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, program: ProgramLike | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, skipNoEmitCheckForDtsDiagnostics: bool, getBindDiagnostics: (($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) | undefined, getSemanticDiagnostics: (($0: $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined> {
    const __gotots_receiver_7 = program;
    const __gotots_argument_286 = goInterfaceNonNil<ProgramLike>(__gotots_receiver_7).GetConfigFileParsingDiagnostics();
    let allDiagnostics = Clip$SliceOf_PointerTo_Named_ast$Diagnostic$PointerTo_Named_ast$Diagnostic(__gotots_argument_286);
    let configFileParsingDiagnosticsLength = allDiagnostics.length;
    const __gotots_argument_289 = allDiagnostics;
    const __gotots_receiver_8 = program;
    const __gotots_argument_287 = ctx;
    const __gotots_argument_288 = file;
    const __gotots_argument_290 = goInterfaceNonNil<ProgramLike>(__gotots_receiver_8).GetSyntacticDiagnostics(__gotots_argument_287, __gotots_argument_288);
    allDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(__gotots_argument_289, __gotots_argument_290, void 0);
    if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
        const __gotots_argument_291 = allDiagnostics;
        const __gotots_receiver_9 = program;
        const __gotots_argument_292 = goInterfaceNonNil<ProgramLike>(__gotots_receiver_9).GetProgramDiagnostics();
        allDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(__gotots_argument_291, __gotots_argument_292, void 0);
        const __gotots_callee_89 = getBindDiagnostics;
        const __gotots_argument_293 = ctx;
        const __gotots_argument_294 = file;
        (__gotots_callee_89 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_293, __gotots_argument_294);
        const __gotots_receiver_10 = program;
        if (Tristate_IsFalseOrUnknown__from_core((goInterfaceNonNil<ProgramLike>(__gotots_receiver_10).Options() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ListFilesOnly)) {
            const __gotots_argument_296 = allDiagnostics;
            const __gotots_receiver_11 = program;
            const __gotots_argument_295 = ctx;
            const __gotots_argument_297 = goInterfaceNonNil<ProgramLike>(__gotots_receiver_11).GetGlobalDiagnostics(__gotots_argument_295);
            allDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(__gotots_argument_296, __gotots_argument_297, void 0);
            if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
                const __gotots_argument_300 = allDiagnostics;
                const __gotots_callee_90 = getSemanticDiagnostics;
                const __gotots_argument_298 = ctx;
                const __gotots_argument_299 = file;
                const __gotots_argument_301 = (__gotots_callee_90 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_298, __gotots_argument_299);
                allDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(__gotots_argument_300, __gotots_argument_301, void 0);
                const __gotots_argument_303 = allDiagnostics;
                const __gotots_receiver_12 = program;
                const __gotots_argument_302 = ctx;
                const __gotots_argument_304 = goInterfaceNonNil<ProgramLike>(__gotots_receiver_12).GetGlobalDiagnostics(__gotots_argument_302);
                allDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(__gotots_argument_303, __gotots_argument_304, void 0);
            }
            let __gotots_logical_result_0 = skipNoEmitCheckForDtsDiagnostics;
            if (!__gotots_logical_result_0) {
                const __gotots_receiver_13 = program;
                __gotots_logical_result_0 = Tristate_IsTrue__from_core((goInterfaceNonNil<ProgramLike>(__gotots_receiver_13).Options() ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NoEmit);
            }
            let __gotots_logical_result_1 = (__gotots_logical_result_0);
            if (__gotots_logical_result_1) {
                const __gotots_receiver_14 = program;
                __gotots_logical_result_1 = CompilerOptions__from_core.GetEmitDeclarations(goInterfaceNonNil<ProgramLike>(__gotots_receiver_14).Options());
            }
            if (__gotots_logical_result_1 && allDiagnostics.length === configFileParsingDiagnosticsLength) {
                const __gotots_argument_307 = allDiagnostics;
                const __gotots_receiver_15 = program;
                const __gotots_argument_305 = ctx;
                const __gotots_argument_306 = file;
                const __gotots_argument_308 = goInterfaceNonNil<ProgramLike>(__gotots_receiver_15).GetDeclarationDiagnostics(__gotots_argument_305, __gotots_argument_306);
                allDiagnostics = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Diagnostic__from_ast> | undefined>(__gotots_argument_307, __gotots_argument_308, void 0);
            }
        }
    }
    return allDiagnostics;
}
export function forEachResolution$kernel<T>(resolutionCache: GoMapValue<Path__from_tspath, ModeAwareCache__from___go_module<T>>, callback: (($0: T, $1: gostring, $2: ModuleKind__from_core, $3: Path__from_tspath) => void) | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
    if (!(file === undefined)) {
        {
            const __gotots_results_18 = resolutionCache.lookupOk(SourceFile__from_ast.Path(file));
            let resolutions: ModeAwareCache__from___go_module<T> = __gotots_results_18[0];
            let ok = __gotots_results_18[1];
            if (ok) {
                const __gotots_range_27 = resolutions.$value;
                const __gotots_range_keys_5 = __gotots_range_27.keys();
                for (const __gotots_range_value_43 of __gotots_range_keys_5) {
                    const __gotots_range_value_44 = __gotots_range_27.lookupOk(__gotots_range_value_43);
                    if (!__gotots_range_value_44[1]) {
                        continue;
                    }
                    const __gotots_range_value_45 = ModeAwareCacheKey__from___go_module.$copy(__gotots_range_value_43);
                    const __gotots_range_value_46 = __gotots_range_value_44[0];
                    let key = __gotots_range_value_45;
                    let resolution: T = __gotots_range_value_46;
                    const __gotots_callee_108 = callback;
                    const __gotots_argument_389 = resolution;
                    const __gotots_argument_390 = ModeAwareCacheKey__from___go_module.$storageOf(key).Name;
                    const __gotots_argument_391 = ModeAwareCacheKey__from___go_module.$storageOf(key).Mode;
                    const __gotots_argument_392 = SourceFile__from_ast.Path(file);
                    (__gotots_callee_108 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_389, __gotots_argument_390, __gotots_argument_391, __gotots_argument_392);
                }
            }
        }
    }
    else {
        const __gotots_range_28 = resolutionCache;
        const __gotots_range_keys_6 = __gotots_range_28.keys();
        for (const __gotots_range_value_47 of __gotots_range_keys_6) {
            const __gotots_range_value_48 = __gotots_range_28.lookupOk(__gotots_range_value_47);
            if (!__gotots_range_value_48[1]) {
                continue;
            }
            const __gotots_range_value_49 = __gotots_range_value_47;
            const __gotots_range_value_50 = __gotots_range_value_48[0];
            let filePath = __gotots_range_value_49;
            let resolutions: ModeAwareCache__from___go_module<T> = __gotots_range_value_50;
            const __gotots_range_29 = resolutions.$value;
            const __gotots_range_keys_7 = __gotots_range_29.keys();
            for (const __gotots_range_value_51 of __gotots_range_keys_7) {
                const __gotots_range_value_52 = __gotots_range_29.lookupOk(__gotots_range_value_51);
                if (!__gotots_range_value_52[1]) {
                    continue;
                }
                const __gotots_range_value_53 = ModeAwareCacheKey__from___go_module.$copy(__gotots_range_value_51);
                const __gotots_range_value_54 = __gotots_range_value_52[0];
                let key = __gotots_range_value_53;
                let resolution: T = __gotots_range_value_54;
                const __gotots_callee_109 = callback;
                const __gotots_argument_393 = resolution;
                const __gotots_argument_394 = ModeAwareCacheKey__from___go_module.$storageOf(key).Name;
                const __gotots_argument_395 = ModeAwareCacheKey__from___go_module.$storageOf(key).Mode;
                const __gotots_argument_396 = filePath;
                (__gotots_callee_109 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_393, __gotots_argument_394, __gotots_argument_395, __gotots_argument_396);
            }
        }
    }
}
