import type { bool, int } from "../../go/scalars.js";
import type { Seq, Seq2 } from "../../go/iter.js";
import type { GoError, GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import { GoEqualStrict, GoNilMap, GoNilSlice, GoNumberKey, GoPointerKey, GoStringKey, GoStructField, GoStructKey, GoValueRef, GoZeroPointer, GoZeroRef, GoZeroSlice, GoZeroString, NewGoStructMap } from "../../go/compat.js";
import type { Context } from "../../go/context.js";
import type { Writer } from "../../go/io.js";
import { Once, Map as SyncMapMap } from "../../go/sync.js";
import { Bool } from "../../go/sync/atomic.js";
import * as slices from "../../go/slices.js";
import * as maps from "../../go/maps.js";
import { BindSourceFile } from "../binder/binder.js";
import type { CheckJsDirective, CommentDirective, FileReference, HasFileName, Node, SourceFile, SourceFileMetaData, SourceFileLike, StringLiteralLike, Visitor } from "../ast/ast.js";
import { CommentDirectiveKindIgnore, CommentDirectiveKindExpectError, SourceFile_as_ast_HasFileName } from "../ast/ast.js";
import { NewDiagnostic, NewCompilerDiagnostic, CompareDiagnostics, EqualDiagnosticsNoRelatedInfo, EqualDiagnostics } from "../ast/diagnostic.js";
import type { Diagnostic, DiagnosticsCollection } from "../ast/diagnostic.js";
import { Diagnostic_Pos, Diagnostic_Code, Diagnostic_RelatedInformation, Diagnostic_SkippedOnNoEmit, Diagnostic_AddMessageChain, Diagnostic_Clone, Diagnostic_SetRelatedInfo, Diagnostic_Localize } from "../ast/diagnostic.js";
import { DiagnosticsCollection_GetGlobalDiagnostics, DiagnosticsCollection_GetDiagnosticsForFile } from "../ast/diagnostic.js";
import { IsStringLiteralLike, IsSourceFileJS, IsCheckJSEnabledForFile, IsPlainJSFile, HasDecorators, NewHasFileName, GetEmitModuleFormatOfFileWorker, GetImpliedNodeFormatForEmitWorker, IsExternalModule } from "../ast/utilities.js";
import { IsDecorator, IsObjectLiteralExpression, IsArrayLiteralExpression, IsStringLiteral } from "../ast/generated/predicates.js";
import { KindParameter } from "../ast/generated/kinds.js";
import type { ArrayLiteralExpression, ObjectLiteralExpression, PropertyAssignment } from "../ast/generated/data.js";
import { AsObjectLiteralExpression, AsArrayLiteralExpression } from "../ast/generated/casts.js";
import { SubtreeContainsDecorators } from "../ast/subtreefacts.js";
import { Node_ForEachChild, Node_SubtreeFacts, Node_AsNode, NamedMemberBase_Name } from "../ast/spine.js";
import { SourceFile_BindDiagnostics, SourceFile_Diagnostics, SourceFile_JSDiagnostics, SourceFile_JSDocDiagnostics, SourceFile_ECMALineMap, SourceFile_Imports, SourceFile_Path, SourceFile_ParseOptions, SourceFile_ForEachChild, SourceFile_FileName, SourceFile_IsBound, SourceFile_Text, Node_Text, Node_ModifierNodes } from "../ast/ast.js";
import type { Checker, Host as CheckerHost, Program as Program_e32ad451 } from "../checker/checker/state.js";
import { Checker_GetDiagnostics, Checker_GetSuggestionDiagnostics } from "../checker/checker/diagnostics.js";
import type { Set } from "../collections/set.js";
import { Set_Has, Set_Add, Set_AddIfAbsent, Set_Keys, NewSetFromItems } from "../collections/set.js";
import { SyncMap_Load, SyncMap_LoadOrStore } from "../collections/syncmap.js";
import type { SyncMap } from "../collections/syncmap.js";
import { Concatenate, Filter, FindIndex, Map as core_Map, Some, Memoize, IfElse, Find } from "../core/core.js";
import type { CompilerOptions, ModuleKind, ModuleResolutionKind, ResolutionMode, JsxEmit } from "../core/compileroptions.js";
import { CompilerOptions_GetAllowJS, CompilerOptions_GetEmitDeclarations, CompilerOptions_GetEmitModuleKind, CompilerOptions_GetIsolatedModules, CompilerOptions_GetModuleResolutionKind, CompilerOptions_GetStrictOptionValue, JsxEmit_String, JsxEmitReact, JsxEmitReactJSX, JsxEmitReactJSXDev, ModuleKindNode16, ModuleKindNodeNext, ModuleKindES2015, ModuleKindESNext, ModuleKindPreserve, ModuleKindCommonJS, ModuleResolutionKindNode16, ModuleResolutionKindNodeNext, ModuleResolutionKindBundler, ResolutionModeNone, ResolutionModeCommonJS, ModuleKindToModuleResolutionKind, ModuleResolutionKind_String, NewLineKind_GetNewLineCharacter } from "../core/compileroptions.js";
import { ModuleKind_String } from "../core/modulekind_stringer_generated.js";
import { ScriptKindTS, ScriptKindTSX, ScriptKindJS, ScriptKindJSX, ScriptKindExternal, ScriptKindDeferred } from "../core/scriptkind.js";
import { Tristate_DefaultIfUnknown, Tristate_IsTrue, Tristate_IsFalse, Tristate_IsFalseOrUnknown, TSUnknown } from "../core/tristate.js";
import type { Tristate } from "../core/tristate.js";
import { TextRange_Pos } from "../core/text.js";
import type { Message } from "../diagnostics/diagnostics.js";
import * as diagnostics from "../diagnostics/generated/messages.js";
import type { Locale } from "../locale/locale.js";
import type { ModeAwareCache } from "../module/cache.js";
import type { ModeAwareCacheKey, ResolvedModule, ResolvedTypeReferenceDirective } from "../module/types.js";
import { ResolvedModule_IsProviderVirtual, ResolvedModule_IsResolved } from "../module/types.js";
import { GetCompilerOptionsWithRedirect, Resolver_GetPackageScopeForPath, Resolver_ResolveModuleName, Resolver_ResolvePackageDirectory } from "../module/resolver.js";
import type { Resolver } from "../module/resolver.js";
import { GetPackageNameFromTypesPackageName, GetTypesPackageName, ParsePackageName } from "../module/util.js";
import type { ModuleSpecifierGenerationHost } from "../modulespecifiers/types.js";
import { GetPackageNameFromDirectory } from "../modulespecifiers/util.js";
import type { InfoCacheEntry } from "../packagejson/cache.js";
import { InfoCacheEntry_Exists, InfoCacheEntry_GetContents } from "../packagejson/cache.js";
import { JSONValue_IsPresent } from "../packagejson/jsonvalue.js";
import type { DependencyFields } from "../packagejson/packagejson.js";
import { DependencyFields_GetRuntimeDependencyNames } from "../packagejson/packagejson.js";
import type { Expected } from "../packagejson/expected.js";
import { Expected_GetValue } from "../packagejson/expected.js";
import type { RawSourceMap } from "../sourcemap/generator.js";
import { NewTextWriter } from "../printer/textwriter.js";
import { GetECMALineStarts, GetECMALineOfPosition, ComputeLineOfPosition } from "../scanner/scanner.js";
import { IsIdentifierText } from "../scanner/utilities.js";
import type { KnownSymlinks } from "../symlinks/knownsymlinks.js";
import { NewKnownSymlink, KnownSymlinks_HasDirectory, KnownSymlinks_ProcessResolution, KnownSymlinks_SetSymlinksFromResolutions } from "../symlinks/knownsymlinks.js";
import { PhaseProgram, Tracing_Push } from "../tracing/tracing.js";
import type { Tracing as Tracing_bcfc8412 } from "../tracing/tracing.js";
import type { ParsedCommandLine, SourceOutputAndProjectReference } from "../tsoptions/parsedcommandline.js";
import { ParsedCommandLine_CompilerOptions, ParsedCommandLine_GetConfigFileParsingDiagnostics, ParsedCommandLine_FileNames, ParsedCommandLine_GetBuildInfoFileName, ParsedCommandLine_ProjectReferences, ParsedCommandLine_as_ResolvedProjectReference } from "../tsoptions/parsedcommandline.js";
import { GetSupportedExtensions, GetSupportedExtensionsWithJsonIfResolveJsonModule, ForEachTsConfigPropArray, ForEachPropertyAssignment, CreateDiagnosticAtReferenceSyntax } from "../tsoptions/tsconfigparsing.js";
import { CreateDiagnosticForNodeInSourceFile } from "../tsoptions/errors.js";
import { GetLibFileName } from "../tsoptions/enummaps.js";
import { ContainsPath, ToPath, GetDirectoryPath, GetCanonicalFileName, GetNormalizedAbsolutePath, GetRelativePathFromFile, GetRelativePathFromDirectory, PathIsRelative, PathIsAbsolute, IsExternalModuleNameRelative, GetBaseFileName, GetRootLength, CombinePaths, ToFileNameLowerCase, ResolvePath, HasExtension } from "../tspath/path.js";
import { IsDeclarationFileName, HasImplementationTSFileExtension, FileExtensionIsOneOf, ExtensionIsOneOf, SupportedTSExtensionsWithJsonFlat } from "../tspath/extension.js";
import type { ComparePathsOptions, Path } from "../tspath/path.js";
import { GetCommonSourceDirectory, GetComputedCommonSourceDirectory } from "../outputpaths/commonsourcedirectory.js";
import { ForEachEmittedFile, GetOutputPathsFor, OutputPaths_JsFilePath, OutputPaths_SourceMapFilePath, OutputPaths_DeclarationFilePath, OutputPaths_DeclarationMapPath, type OutputPathsHost } from "../outputpaths/outputpaths.js";
import { ParseIsolatedEntityName } from "../parser/parser/support.js";
import { byteAt, byteLen } from "../parser/utilities.js";
import { checkerPool_GetGlobalDiagnostics, checkerPool_getCheckerNonExclusive, checkerPool_getCheckerForFileNonExclusive, checkerPool_getCheckerForFileExclusive, checkerPool_forEachCheckerParallel, checkerPool_forEachCheckerGroupDo, checkerPool_as_compiler_CheckerPool } from "./checkerpool.js";
import type { checkerPool, CheckerPool } from "./checkerpool.js";
import { newCheckerPoolWithTracing } from "./checkerpool.js";
import { getSourceFilesToEmit, sourceFileMayBeEmitted, getDeclarationDiagnostics, emitter_emit } from "./emitter.js";
import type { emitter as emitterType, EmitOnly, SourceFileMayBeEmittedHost } from "./emitter.js";
import { newEmitHost, emitHost_as_compiler_EmitHost, emitHost_as_outputpaths_OutputPathsHost, emitHost_Options } from "./emitHost.js";
import type { FileIncludeReason } from "./fileInclude.js";
import { FileIncludeReason_toDiagnostic } from "./fileInclude.js";
import type { DuplicateSourceFile, LibFile, processedFiles, redirectsFile } from "./fileloader.js";
import { processAllProgramFiles, getModeForUsageLocation, getEmitSyntaxForUsageLocationWorker, getDefaultResolutionModeForFile } from "./fileloader.js";
import type { CompilerHost } from "./host.js";
import { includeProcessor_getDiagnostics, includeProcessor_addProcessingDiagnostic, updateFileIncludeProcessor, includeProcessor_explainRedirectAndImpliedFormat } from "./includeprocessor.js";
import type { processingDiagnostic } from "./processingDiagnostic.js";
import { processingDiagnosticKindExplainingFileInclude } from "./processingDiagnostic.js";
import type { includeExplainingDiagnostic } from "./processingDiagnostic.js";
import { projectReferenceFileMapper_getProjectReferenceFromSource, projectReferenceFileMapper_isSourceFromProjectReference, projectReferenceFileMapper_getProjectReferenceFromOutputDts, projectReferenceFileMapper_getResolvedReferenceFor, projectReferenceFileMapper_getRedirectForResolution, projectReferenceFileMapper_getParseFileRedirect, projectReferenceFileMapper_getResolvedProjectReferences, projectReferenceFileMapper_rangeResolvedProjectReference, projectReferenceFileMapper_rangeResolvedProjectReferenceInChildConfig, projectReferenceFileMapper_getCompilerOptionsForFile } from "./projectreferencefilemapper.js";
import type { includeProcessor } from "./includeprocessor.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import { OrderedMap_Entries } from "../collections/ordered_map.js";
import { recordBoundSourceFileExtensionFacts } from "../../extensions/compiler-integration.js";
import { collectExtensionDiagnosticsForSourceFile } from "../../extensions/diagnostics.js";
import { attachExtensionHostToProgram } from "../../extensions/host.js";

import type { GoFunc, GoInterface, GoRef } from "../../go/compat.js";

const sourceFileKey = GoPointerKey<SourceFile>();
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::ProgramOptions","kind":"type","status":"implemented","sigHash":"9eb7d18f0dae3f15940de7ca327de6159681203c5eb38cedc77879444adaee3f"}
 *
 * Go source:
 * ProgramOptions struct {
 * 	Host                        CompilerHost
 * 	Config                      *tsoptions.ParsedCommandLine
 * 	UseSourceOfProjectReference bool
 * 	SingleThreaded              core.Tristate
 * 	CreateCheckerPool           func(*Program) CheckerPool
 * 	TypingsLocation             string
 * 	ProjectName                 string
 * 	Tracing                     *tracing.Tracing
 * }
 */
export interface ProgramOptions {
  Host: GoInterface<CompilerHost>;
  Config: GoPtr<ParsedCommandLine>;
  UseSourceOfProjectReference?: bool;
  SingleThreaded?: Tristate;
  CreateCheckerPool?: (arg0: GoPtr<Program>) => CheckerPool;
  TypingsLocation?: string;
  ProjectName?: string;
  Tracing?: GoPtr<Tracing_bcfc8412>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::ProgramOptions.canUseProjectReferenceSource","kind":"method","status":"implemented","sigHash":"ec0b72e7f02ed0bbf938625750f60c5c5ca5fb65607e514b72a434b8d968f95a"}
 *
 * Go source:
 * func (p *ProgramOptions) canUseProjectReferenceSource() bool {
 * 	return p.UseSourceOfProjectReference && !p.Config.CompilerOptions().DisableSourceOfProjectReferenceRedirect.IsTrue()
 * }
 */
export function ProgramOptions_canUseProjectReferenceSource(receiver: GoPtr<ProgramOptions>): bool {
  return (receiver!.UseSourceOfProjectReference === true && !Tristate_IsTrue(ParsedCommandLine_CompilerOptions(receiver!.Config)!.DisableSourceOfProjectReferenceRedirect)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::lazyValue","kind":"type","status":"implemented","sigHash":"26023d6be91e21c7ab20729c24c040bb5e0c2f767af281019b4e6bae319804c6"}
 *
 * Go source:
 * lazyValue[T any] struct {
 * 	value       *T
 * 	once        sync.Once
 * 	initialized atomic.Bool
 * }
 */
export interface lazyValue<T = unknown> {
  value: GoRef<T>;
  once: Once;
  initialized: Bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::lazyValue.getValue","kind":"method","status":"implemented","sigHash":"b3467f442b9cfa32947eba0eea2cf4372f53e1c8fd4a277db69238e17ffb21a5"}
 *
 * Go source:
 * func (l *lazyValue[T]) getValue(compute func() *T) *T {
 * 	l.once.Do(func() {
 * 		if l.value == nil {
 * 			l.value = compute()
 * 		}
 * 		l.initialized.Store(true)
 * 	})
 * 	return l.value
 * }
 */
export function lazyValue_getValue<T>(receiver: GoPtr<lazyValue<T>>, compute: GoFunc<() => GoRef<T>>): GoRef<T> {
  receiver!.once.Do(() => {
    if (receiver!.value === undefined) {
      receiver!.value = compute!();
    }
    receiver!.initialized.Store(true as bool);
  });
  return receiver!.value;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::lazyValue.tryReuse","kind":"method","status":"implemented","sigHash":"eeb3dce026db714361936f193c70dd4d92b89cbc0a94ef79943f6230766d8aa9"}
 *
 * Go source:
 * func (l *lazyValue[T]) tryReuse(from *lazyValue[T]) {
 * 	if from.initialized.Load() {
 * 		l.value = from.value
 * 		l.initialized.Store(true)
 * 	}
 * }
 */
export function lazyValue_tryReuse<T>(receiver: GoPtr<lazyValue<T>>, from_: GoPtr<lazyValue<T>>): void {
  if (from_!.initialized.Load()) {
    receiver!.value = from_!.value;
    receiver!.initialized.Store(true as bool);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::packageNamesInfo","kind":"type","status":"implemented","sigHash":"b1133be40de190cc9ad88f29fa923d2eabb6da9c0a4536486cd5f1cd440e4c40"}
 *
 * Go source:
 * packageNamesInfo struct {
 * 	resolved           *collections.Set[string]
 * 	unresolved         *collections.Set[string]
 * 	deepImportPackages *collections.Set[string]
 * }
 */
export interface packageNamesInfo {
  resolved: GoPtr<Set<string>>;
  unresolved: GoPtr<Set<string>>;
  deepImportPackages: GoPtr<Set<string>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::Program","kind":"type","status":"implemented","sigHash":"c60019065d3ec9810ed2446897b82620c3db486992de68fd6eea46cab24d5e45"}
 *
 * Go source:
 * Program struct {
 * 	opts        ProgramOptions
 * 	checkerPool CheckerPool // always set; used as fallback for project system pools
 * 
 * 	// compilerCheckerPool is set only when the built-in compiler checker pool is in use
 * 	// (i.e. CreateCheckerPool was not provided). It enables grouped parallel iteration,
 * 	// non-exclusive access for emit, and direct global diagnostics collection.
 * 	compilerCheckerPool *checkerPool
 * 
 * 	comparePathsOptions tspath.ComparePathsOptions
 * 
 * 	processedFiles
 * 
 * 	usesUriStyleNodeCoreModules core.Tristate
 * 
 * 	commonSourceDirectory     string
 * 	commonSourceDirectoryOnce sync.Once
 * 
 * 	declarationDiagnosticCache collections.SyncMap[*ast.SourceFile, []*ast.Diagnostic]
 * 
 * 	programDiagnostics         []*ast.Diagnostic
 * 	hasEmitBlockingDiagnostics collections.Set[tspath.Path]
 * 
 * 	sourceFilesToEmitOnce sync.Once
 * 	sourceFilesToEmit     []*ast.SourceFile
 * 
 * 	// Cached unresolved imports for ATA
 * 	unresolvedImports lazyValue[collections.Set[string]]
 * 	knownSymlinks     lazyValue[symlinks.KnownSymlinks]
 * 
 * 	// Used by auto-imports
 * 	packageNames lazyValue[packageNamesInfo]
 * 
 * 	// Used by workspace/symbol
 * 	hasTSFileOnce sync.Once
 * 	hasTSFile     bool
 * 
 * 	// Cached map of package names to whether they bundle types
 * 	packagesMapOnce sync.Once
 * 	packagesMap     map[string]bool
 * }
 */
export interface Program {
  opts: ProgramOptions;
  checkerPool: CheckerPool | undefined;
  compilerCheckerPool: GoPtr<checkerPool>;
  comparePathsOptions: ComparePathsOptions;
  __tsgoEmbedded0: processedFiles;
  usesUriStyleNodeCoreModules: Tristate;
  commonSourceDirectory: string;
  commonSourceDirectoryOnce: Once;
  declarationDiagnosticCache: SyncMap<GoPtr<SourceFile>, GoSlice<GoPtr<Diagnostic>>>;
  programDiagnostics: GoSlice<GoPtr<Diagnostic>>;
  hasEmitBlockingDiagnostics: Set<Path>;
  sourceFilesToEmitOnce: Once;
  sourceFilesToEmit: GoSlice<GoPtr<SourceFile>>;
  unresolvedImports: lazyValue<Set<string>>;
  knownSymlinks: lazyValue<KnownSymlinks>;
  packageNames: lazyValue<packageNamesInfo>;
  hasTSFileOnce: Once;
  hasTSFile: bool;
  packagesMapOnce: Once;
  packagesMap: GoMap<string, bool>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.FileExists","kind":"method","status":"implemented","sigHash":"fc912035af474961c38b93b1b1845c470bb60819f12b82dd9aaafe4e5b4ba38c"}
 *
 * Go source:
 * func (p *Program) FileExists(path string) bool {
 * 	return p.Host().FS().FileExists(path)
 * }
 */
export function Program_FileExists(receiver: GoPtr<Program>, path: string): bool {
  return Program_Host(receiver)!.FS()!.FileExists(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetCurrentDirectory","kind":"method","status":"implemented","sigHash":"49421efcb8d09dde8f656aa85d37c9bcf5954c7e34a9270d5e0337d215a26e9a"}
 *
 * Go source:
 * func (p *Program) GetCurrentDirectory() string {
 * 	return p.Host().GetCurrentDirectory()
 * }
 */
export function Program_GetCurrentDirectory(receiver: GoPtr<Program>): string {
  return Program_Host(receiver)!.GetCurrentDirectory();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetGlobalTypingsCacheLocation","kind":"method","status":"implemented","sigHash":"96959a9eaae02a63df920de2286450b775a650152b33092cc73145621516b3b9"}
 *
 * Go source:
 * func (p *Program) GetGlobalTypingsCacheLocation() string {
 * 	return p.opts.TypingsLocation
 * }
 */
export function Program_GetGlobalTypingsCacheLocation(receiver: GoPtr<Program>): string {
  return receiver!.opts.TypingsLocation ?? "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetNearestAncestorDirectoryWithPackageJson","kind":"method","status":"implemented","sigHash":"3a507a72bd6f35c1a4d41f2ea49ac2bcfdc4af76350d933869a5566c8f3dc685"}
 *
 * Go source:
 * func (p *Program) GetNearestAncestorDirectoryWithPackageJson(dirname string) string {
 * 	scoped := p.resolver.GetPackageScopeForPath(dirname)
 * 	if scoped != nil && scoped.Exists() {
 * 		return scoped.PackageDirectory
 * 	}
 * 	return ""
 * }
 */
export function Program_GetNearestAncestorDirectoryWithPackageJson(receiver: GoPtr<Program>, dirname: string): string {
  const scoped = Resolver_GetPackageScopeForPath(receiver!.__tsgoEmbedded0!.resolver, dirname);
  if (scoped !== undefined && InfoCacheEntry_Exists(scoped)) {
    return scoped.PackageDirectory;
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetPackageJsonInfo","kind":"method","status":"implemented","sigHash":"b35499705a40b88298678165b7f45dd9224e167636b559449bf543dac304379e"}
 *
 * Go source:
 * func (p *Program) GetPackageJsonInfo(pkgJsonPath string) *packagejson.InfoCacheEntry {
 * 	directory := tspath.GetDirectoryPath(pkgJsonPath)
 * 	scoped := p.resolver.GetPackageScopeForPath(directory)
 * 	if scoped != nil && scoped.Exists() && scoped.PackageDirectory == directory {
 * 		return scoped
 * 	}
 * 	return nil
 * }
 */
export function Program_GetPackageJsonInfo(receiver: GoPtr<Program>, pkgJsonPath: string): GoPtr<InfoCacheEntry> {
  const directory = GetDirectoryPath(pkgJsonPath);
  const scoped = Resolver_GetPackageScopeForPath(receiver!.__tsgoEmbedded0!.resolver, directory);
  if (scoped !== undefined && InfoCacheEntry_Exists(scoped) && scoped.PackageDirectory === directory) {
    return scoped;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetRedirectTargets","kind":"method","status":"implemented","sigHash":"daa3b7276bc94f309aa85376da97480b2cc006ef2f6dd9f7a1735be2e8cc3edf"}
 *
 * Go source:
 * func (p *Program) GetRedirectTargets(path tspath.Path) []string {
 * 	return p.redirectTargetsMap[path]
 * }
 */
export function Program_GetRedirectTargets(receiver: GoPtr<Program>, path: Path): GoSlice<string> {
  return receiver!.__tsgoEmbedded0!.redirectTargetsMap.get(path) ?? [];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSourceOfProjectReferenceIfOutputIncluded","kind":"method","status":"implemented","sigHash":"cf149aec4713f436ef479bc037332a1495ee8576d04d9b26c372fa8022241991"}
 *
 * Go source:
 * func (p *Program) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string {
 * 	if source, ok := p.outputFileToProjectReferenceSource[file.Path()]; ok {
 * 		return source
 * 	}
 * 	return file.FileName()
 * }
 */
export function Program_GetSourceOfProjectReferenceIfOutputIncluded(receiver: GoPtr<Program>, file: GoInterface<HasFileName>): string {
  const source = receiver!.__tsgoEmbedded0!.outputFileToProjectReferenceSource.get(file!.Path());
  if (source !== undefined) {
    return source;
  }
  return file!.FileName();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetProjectReferenceFromSource","kind":"method","status":"implemented","sigHash":"2095e9d5c9d3f9eaaa3f419e539f9bc33ecfce2cb795a859351a7e750f0e94f3"}
 *
 * Go source:
 * func (p *Program) GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
 * 	return p.projectReferenceFileMapper.getProjectReferenceFromSource(path)
 * }
 */
export function Program_GetProjectReferenceFromSource(receiver: GoPtr<Program>, path: Path): GoPtr<SourceOutputAndProjectReference> {
  return projectReferenceFileMapper_getProjectReferenceFromSource(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IsSourceFromProjectReference","kind":"method","status":"implemented","sigHash":"30766b98273eee304899a8a66eae4a27bc46c7367c16e1601d1cf2367f4695a7"}
 *
 * Go source:
 * func (p *Program) IsSourceFromProjectReference(path tspath.Path) bool {
 * 	return p.projectReferenceFileMapper.isSourceFromProjectReference(path)
 * }
 */
export function Program_IsSourceFromProjectReference(receiver: GoPtr<Program>, path: Path): bool {
  return projectReferenceFileMapper_isSourceFromProjectReference(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetProjectReferenceFromOutputDts","kind":"method","status":"implemented","sigHash":"04b57beebace0fbdea12ca0e14d189e66f63cd6eb49f09ff81dd068f0906acfd"}
 *
 * Go source:
 * func (p *Program) GetProjectReferenceFromOutputDts(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
 * 	return p.projectReferenceFileMapper.getProjectReferenceFromOutputDts(path)
 * }
 */
export function Program_GetProjectReferenceFromOutputDts(receiver: GoPtr<Program>, path: Path): GoPtr<SourceOutputAndProjectReference> {
  return projectReferenceFileMapper_getProjectReferenceFromOutputDts(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetResolvedProjectReferenceFor","kind":"method","status":"implemented","sigHash":"8e85fa3e5b4cffc13653f82b39b0891a4ffa9b7b0c1e4212088efcd1f91c95f6"}
 *
 * Go source:
 * func (p *Program) GetResolvedProjectReferenceFor(path tspath.Path) (*tsoptions.ParsedCommandLine, bool) {
 * 	return p.projectReferenceFileMapper.getResolvedReferenceFor(path)
 * }
 */
export function Program_GetResolvedProjectReferenceFor(receiver: GoPtr<Program>, path: Path): [GoPtr<ParsedCommandLine>, bool] {
  return projectReferenceFileMapper_getResolvedReferenceFor(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetRedirectForResolution","kind":"method","status":"implemented","sigHash":"131f48f30f099827074ce4455f5b2cc01ac7eb2140bfd8fb3b244cf4b5bbefdf"}
 *
 * Go source:
 * func (p *Program) GetRedirectForResolution(file ast.HasFileName) *tsoptions.ParsedCommandLine {
 * 	redirect, _ := p.projectReferenceFileMapper.getRedirectForResolution(file)
 * 	return redirect
 * }
 */
export function Program_GetRedirectForResolution(receiver: GoPtr<Program>, file: GoInterface<HasFileName>): GoPtr<ParsedCommandLine> {
  const [redirect] = projectReferenceFileMapper_getRedirectForResolution(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, file);
  return redirect;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetParseFileRedirect","kind":"method","status":"implemented","sigHash":"9d46b66c6a83be5a07a3a876ea4b6df5b5ff7d14e6f2cbf5f2cf36751c0b0d7a"}
 *
 * Go source:
 * func (p *Program) GetParseFileRedirect(fileName string) string {
 * 	return p.projectReferenceFileMapper.getParseFileRedirect(ast.NewHasFileName(fileName, p.toPath(fileName)))
 * }
 */
export function Program_GetParseFileRedirect(receiver: GoPtr<Program>, fileName: string): string {
  return projectReferenceFileMapper_getParseFileRedirect(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, NewHasFileName(fileName, Program_toPath(receiver, fileName)));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetResolvedProjectReferences","kind":"method","status":"implemented","sigHash":"788ba86529f0d3db0ff340dc7d30f82cdf049656168dd37489b3e82a9e9563de"}
 *
 * Go source:
 * func (p *Program) GetResolvedProjectReferences() []*tsoptions.ParsedCommandLine {
 * 	return p.projectReferenceFileMapper.getResolvedProjectReferences()
 * }
 */
export function Program_GetResolvedProjectReferences(receiver: GoPtr<Program>): GoSlice<GoPtr<ParsedCommandLine>> {
  return projectReferenceFileMapper_getResolvedProjectReferences(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.RangeResolvedProjectReference","kind":"method","status":"implemented","sigHash":"991d6ba156d64c903de9474973c0ef3b82cda7b05e2e741cc331b53cb4e8dbea"}
 *
 * Go source:
 * func (p *Program) RangeResolvedProjectReference(f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool) bool {
 * 	return p.projectReferenceFileMapper.rangeResolvedProjectReference(f)
 * }
 */
export function Program_RangeResolvedProjectReference(receiver: GoPtr<Program>, f: GoFunc<(path: Path, config: GoPtr<ParsedCommandLine>, parent: GoPtr<ParsedCommandLine>, index: int) => bool>): bool {
  return projectReferenceFileMapper_rangeResolvedProjectReference(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, f);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.RangeResolvedProjectReferenceInChildConfig","kind":"method","status":"implemented","sigHash":"21d1cf7926668889fdcd4cd3389111acf6304b7792b2a59893e1dc4a6e3d59bc"}
 *
 * Go source:
 * func (p *Program) RangeResolvedProjectReferenceInChildConfig(
 * 	childConfig *tsoptions.ParsedCommandLine,
 * 	f func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool,
 * ) bool {
 * 	return p.projectReferenceFileMapper.rangeResolvedProjectReferenceInChildConfig(childConfig, f)
 * }
 */
export function Program_RangeResolvedProjectReferenceInChildConfig(receiver: GoPtr<Program>, childConfig: GoPtr<ParsedCommandLine>, f: GoFunc<(path: Path, config: GoPtr<ParsedCommandLine>, parent: GoPtr<ParsedCommandLine>, index: int) => bool>): bool {
  return projectReferenceFileMapper_rangeResolvedProjectReferenceInChildConfig(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, childConfig, f);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"59abc6749f71dee6255755c5682f466ab593c39d9ea1b06d0864db7e4999a2e6"}
 *
 * Go source:
 * func (p *Program) UseCaseSensitiveFileNames() bool {
 * 	return p.Host().FS().UseCaseSensitiveFileNames()
 * }
 */
export function Program_UseCaseSensitiveFileNames(receiver: GoPtr<Program>): bool {
  return Program_Host(receiver)!.FS()!.UseCaseSensitiveFileNames();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.UsesUriStyleNodeCoreModules","kind":"method","status":"implemented","sigHash":"290d2a5d2197835f8003b3f9d67737d0b82445c9a585a07e74734179e3a08c39"}
 *
 * Go source:
 * func (p *Program) UsesUriStyleNodeCoreModules() core.Tristate {
 * 	return p.usesUriStyleNodeCoreModules
 * }
 */
export function Program_UsesUriStyleNodeCoreModules(receiver: GoPtr<Program>): Tristate {
  return receiver!.usesUriStyleNodeCoreModules;
}

export function Program_as_outputpaths_OutputPathsHost(receiver: GoPtr<Program>): OutputPathsHost {
  return {
    CommonSourceDirectory: (): string => Program_CommonSourceDirectory(receiver),
    GetCurrentDirectory: (): string => Program_GetCurrentDirectory(receiver),
    UseCaseSensitiveFileNames: (): bool => Program_UseCaseSensitiveFileNames(receiver),
  };
}

export function Program_as_emitter_SourceFileMayBeEmittedHost(receiver: GoPtr<Program>): SourceFileMayBeEmittedHost {
  return {
    Options: (): GoPtr<CompilerOptions> => Program_Options(receiver),
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => Program_GetProjectReferenceFromSource(receiver, path),
    IsSourceFileFromExternalLibrary: (file: GoPtr<SourceFile>): bool => Program_IsSourceFileFromExternalLibrary(receiver, file),
    GetCurrentDirectory: (): string => Program_GetCurrentDirectory(receiver),
    UseCaseSensitiveFileNames: (): bool => Program_UseCaseSensitiveFileNames(receiver),
    SourceFiles: (): GoSlice<GoPtr<SourceFile>> => Program_SourceFiles(receiver),
  };
}

export function Program_as_modulespecifiers_ModuleSpecifierGenerationHost(receiver: GoPtr<Program>): ModuleSpecifierGenerationHost {
  return {
    GetSymlinkCache: (): GoPtr<KnownSymlinks> => Program_GetSymlinkCache(receiver),
    CommonSourceDirectory: (): string => Program_CommonSourceDirectory(receiver),
    GetGlobalTypingsCacheLocation: (): string => Program_GetGlobalTypingsCacheLocation(receiver),
    UseCaseSensitiveFileNames: (): bool => Program_UseCaseSensitiveFileNames(receiver),
    GetCurrentDirectory: (): string => Program_GetCurrentDirectory(receiver),
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => Program_GetProjectReferenceFromSource(receiver, path),
    GetRedirectTargets: (path: Path): GoSlice<string> => Program_GetRedirectTargets(receiver, path),
    GetSourceOfProjectReferenceIfOutputIncluded: (file: HasFileName): string => Program_GetSourceOfProjectReferenceIfOutputIncluded(receiver, file),
    FileExists: (path: string): bool => Program_FileExists(receiver, path),
    GetNearestAncestorDirectoryWithPackageJson: (dirname: string): string => Program_GetNearestAncestorDirectoryWithPackageJson(receiver, dirname),
    GetPackageJsonInfo: (pkgJsonPath: string): GoPtr<InfoCacheEntry> => Program_GetPackageJsonInfo(receiver, pkgJsonPath),
    GetDefaultResolutionModeForFile: (file: HasFileName): ResolutionMode => Program_GetDefaultResolutionModeForFile(receiver, file),
    GetResolvedModuleFromModuleSpecifier: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> => Program_GetResolvedModuleFromModuleSpecifier(receiver, file, moduleSpecifier),
    GetModeForUsageLocation: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode => Program_GetModeForUsageLocation(receiver, file, moduleSpecifier),
  };
}

export function Program_as_checker_Host(receiver: GoPtr<Program>): CheckerHost {
  return {
    __tsgoEmbedded0: Program_as_modulespecifiers_ModuleSpecifierGenerationHost(receiver),
    GetSymlinkCache: (): GoPtr<KnownSymlinks> => Program_GetSymlinkCache(receiver),
    CommonSourceDirectory: (): string => Program_CommonSourceDirectory(receiver),
    GetGlobalTypingsCacheLocation: (): string => Program_GetGlobalTypingsCacheLocation(receiver),
    UseCaseSensitiveFileNames: (): bool => Program_UseCaseSensitiveFileNames(receiver),
    GetCurrentDirectory: (): string => Program_GetCurrentDirectory(receiver),
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => Program_GetProjectReferenceFromSource(receiver, path),
    GetRedirectTargets: (path: Path): GoSlice<string> => Program_GetRedirectTargets(receiver, path),
    GetSourceOfProjectReferenceIfOutputIncluded: (file: HasFileName): string => Program_GetSourceOfProjectReferenceIfOutputIncluded(receiver, file),
    FileExists: (path: string): bool => Program_FileExists(receiver, path),
    GetNearestAncestorDirectoryWithPackageJson: (dirname: string): string => Program_GetNearestAncestorDirectoryWithPackageJson(receiver, dirname),
    GetPackageJsonInfo: (pkgJsonPath: string): GoPtr<InfoCacheEntry> => Program_GetPackageJsonInfo(receiver, pkgJsonPath),
    GetDefaultResolutionModeForFile: (file: HasFileName): ResolutionMode => Program_GetDefaultResolutionModeForFile(receiver, file),
    GetResolvedModuleFromModuleSpecifier: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> => Program_GetResolvedModuleFromModuleSpecifier(receiver, file, moduleSpecifier),
    GetModeForUsageLocation: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode => Program_GetModeForUsageLocation(receiver, file, moduleSpecifier),
  };
}

export function Program_as_checker_Program(receiver: GoPtr<Program>): Program_e32ad451 {
  const adapter: Program_e32ad451 = {
    __tsgoEmbedded0: Program_as_checker_Host(receiver),
    GetSymlinkCache: (): GoPtr<KnownSymlinks> => Program_GetSymlinkCache(receiver),
    CommonSourceDirectory: (): string => Program_CommonSourceDirectory(receiver),
    GetGlobalTypingsCacheLocation: (): string => Program_GetGlobalTypingsCacheLocation(receiver),
    UseCaseSensitiveFileNames: (): bool => Program_UseCaseSensitiveFileNames(receiver),
    GetCurrentDirectory: (): string => Program_GetCurrentDirectory(receiver),
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => Program_GetProjectReferenceFromSource(receiver, path),
    GetRedirectTargets: (path: Path): GoSlice<string> => Program_GetRedirectTargets(receiver, path),
    GetSourceOfProjectReferenceIfOutputIncluded: (file: HasFileName): string => Program_GetSourceOfProjectReferenceIfOutputIncluded(receiver, file),
    FileExists: (fileName: string): bool => Program_FileExists(receiver, fileName),
    GetNearestAncestorDirectoryWithPackageJson: (dirname: string): string => Program_GetNearestAncestorDirectoryWithPackageJson(receiver, dirname),
    GetPackageJsonInfo: (pkgJsonPath: string): GoPtr<InfoCacheEntry> => Program_GetPackageJsonInfo(receiver, pkgJsonPath),
    GetDefaultResolutionModeForFile: (file: HasFileName): ResolutionMode => Program_GetDefaultResolutionModeForFile(receiver, file),
    GetResolvedModuleFromModuleSpecifier: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> => Program_GetResolvedModuleFromModuleSpecifier(receiver, file, moduleSpecifier),
    GetModeForUsageLocation: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode => Program_GetModeForUsageLocation(receiver, file, moduleSpecifier),
    Options: (): GoPtr<CompilerOptions> => Program_Options(receiver),
    SourceFiles: (): GoSlice<GoPtr<SourceFile>> => Program_SourceFiles(receiver),
    BindSourceFiles: (): void => Program_BindSourceFiles(receiver),
    GetSourceFile: (fileName: string): GoPtr<SourceFile> => Program_GetSourceFile(receiver, fileName),
    GetSourceFileForResolvedModule: (fileName: string): GoPtr<SourceFile> => Program_GetSourceFileForResolvedModule(receiver, fileName),
    GetEmitModuleFormatOfFile: (sourceFile: HasFileName): ModuleKind => Program_GetEmitModuleFormatOfFile(receiver, sourceFile),
    GetEmitSyntaxForUsageLocation: (sourceFile: HasFileName, usageLocation: GoPtr<StringLiteralLike>): ResolutionMode => Program_GetEmitSyntaxForUsageLocation(receiver, sourceFile, usageLocation),
    GetImpliedNodeFormatForEmit: (sourceFile: HasFileName): ModuleKind => Program_GetImpliedNodeFormatForEmit(receiver, sourceFile),
    GetResolvedModule: (currentSourceFile: HasFileName, moduleReference: string, mode: ResolutionMode): GoPtr<ResolvedModule> => Program_GetResolvedModule(receiver, currentSourceFile, moduleReference, mode),
    GetResolvedModules: (): GoMap<Path, ModeAwareCache<GoPtr<ResolvedModule>>> => Program_GetResolvedModules(receiver),
    GetPackagesMap: (): GoMap<string, bool> => Program_GetPackagesMap(receiver),
    GetSourceFileMetaData: (path: Path): SourceFileMetaData => Program_GetSourceFileMetaData(receiver, path),
    GetJSXRuntimeImportSpecifier: (path: Path): [string, GoPtr<Node>] => Program_GetJSXRuntimeImportSpecifier(receiver, path),
    GetImportHelpersImportSpecifier: (path: Path): GoPtr<Node> => Program_GetImportHelpersImportSpecifier(receiver, path),
    SourceFileMayBeEmitted: (sourceFile: GoPtr<SourceFile>, forceDtsEmit: bool): bool => Program_SourceFileMayBeEmitted(receiver, sourceFile, forceDtsEmit),
    IsSourceFileDefaultLibrary: (path: Path): bool => Program_IsSourceFileDefaultLibrary(receiver, path),
    GetProjectReferenceFromOutputDts: (path: Path): GoPtr<SourceOutputAndProjectReference> => Program_GetProjectReferenceFromOutputDts(receiver, path),
    GetRedirectForResolution: (file: HasFileName): GoPtr<ParsedCommandLine> => Program_GetRedirectForResolution(receiver, file),
  };
  if (receiver !== undefined) {
    attachExtensionHostToProgram(receiver, adapter, { bindCompilerProgram: false });
  }
  return adapter;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ checker.Program = (*Program)(nil)
 */
export let __7d754c38_0: GoInterface<Program_e32ad451> = Program_as_checker_Program(undefined);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSourceFileFromReference","kind":"method","status":"implemented","sigHash":"d17110acc4563d1cc15b71c7c34578869a09f5420d3f57151d53da44c275e35a"}
 *
 * Go source:
 * func (p *Program) GetSourceFileFromReference(origin *ast.SourceFile, ref *ast.FileReference) *ast.SourceFile {
 * 	// TODO: The module loader in corsa is fairly different than strada, it should probably be able to expose this functionality at some point,
 * 	// rather than redoing the logic approximately here, since most of the related logic now lives in module.Resolver
 * 	// Still, without the failed lookup reporting that only the loader does, this isn't terribly complicated
 * 
 * 	fileName := tspath.ResolvePath(tspath.GetDirectoryPath(origin.FileName()), ref.FileName)
 * 	supportedExtensionsBase := tsoptions.GetSupportedExtensions(p.Options(), nil /*extraFileExtensions* /)
 * 	supportedExtensions := tsoptions.GetSupportedExtensionsWithJsonIfResolveJsonModule(p.Options(), supportedExtensionsBase)
 * 	allowNonTsExtensions := p.Options().AllowNonTsExtensions.IsTrue()
 * 	if tspath.HasExtension(fileName) {
 * 		if !allowNonTsExtensions {
 * 			canonicalFileName := tspath.GetCanonicalFileName(fileName, p.UseCaseSensitiveFileNames())
 * 			supported := false
 * 			for _, group := range supportedExtensions {
 * 				if tspath.FileExtensionIsOneOf(canonicalFileName, group) {
 * 					supported = true
 * 					break
 * 				}
 * 			}
 * 			if !supported {
 * 				return nil // unsupported extensions are forced to fail
 * 			}
 * 		}
 * 
 * 		return p.GetSourceFileForResolvedModule(fileName)
 * 	}
 * 	if allowNonTsExtensions {
 * 		extensionless := p.GetSourceFileForResolvedModule(fileName)
 * 		if extensionless != nil {
 * 			return extensionless
 * 		}
 * 	}
 *
 * 	// Only try adding extensions from the first supported group (which should be .ts/.tsx/.d.ts)
 * 	for _, ext := range supportedExtensions[0] {
 * 		result := p.GetSourceFileForResolvedModule(fileName + ext)
 * 		if result != nil {
 * 			return result
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Program_GetSourceFileFromReference(receiver: GoPtr<Program>, origin: GoPtr<SourceFile>, ref: GoPtr<FileReference>): GoPtr<SourceFile> {
  const fileName = ResolvePath(GetDirectoryPath(SourceFile_FileName(origin)), ref!.FileName);
  const supportedExtensionsBase = GetSupportedExtensions(Program_Options(receiver), []);
  const supportedExtensions = GetSupportedExtensionsWithJsonIfResolveJsonModule(Program_Options(receiver), supportedExtensionsBase);
  const allowNonTsExtensions = Tristate_IsTrue(Program_Options(receiver)!.AllowNonTsExtensions);
  if (HasExtension(fileName)) {
    if (!allowNonTsExtensions) {
      const canonicalFileName = GetCanonicalFileName(fileName, Program_UseCaseSensitiveFileNames(receiver));
      let supported = false;
      for (const group of supportedExtensions) {
        if (FileExtensionIsOneOf(canonicalFileName, group)) {
          supported = true;
          break;
        }
      }
      if (!supported) {
        return undefined;
      }
    }
    return Program_GetSourceFileForResolvedModule(receiver, fileName);
  }
  if (allowNonTsExtensions) {
    const extensionless = Program_GetSourceFileForResolvedModule(receiver, fileName);
    if (extensionless !== undefined) {
      return extensionless;
    }
  }
  for (const ext of (supportedExtensions[0] ?? [])) {
    const result = Program_GetSourceFileForResolvedModule(receiver, fileName + ext);
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::NewProgram","kind":"func","status":"implemented","sigHash":"a124c4f6a47008ca4e3457fd95247b6cb4c9c33b70716c69b709067d1bb2518e"}
 *
 * Go source:
 * func NewProgram(opts ProgramOptions) *Program {
 * 	p := &Program{opts: opts}
 * 	if p.opts.Tracing != nil {
 * 		defer p.opts.Tracing.Push(tracing.PhaseProgram, "createProgram", map[string]any{"configFilePath": opts.Config.CompilerOptions().ConfigFilePath}, true)()
 * 	}
 * 	p.processedFiles = processAllProgramFiles(p.opts, p.SingleThreaded())
 * 	p.initCheckerPool()
 * 	p.verifyCompilerOptions()
 * 	return p
 * }
 */
export function NewProgram(opts: ProgramOptions): GoPtr<Program> {
  // Compute singleThreaded before creating the program (needed for processAllProgramFiles)
  const singleThreaded = Tristate_IsTrue(Tristate_DefaultIfUnknown(opts.SingleThreaded ?? TSUnknown, ParsedCommandLine_CompilerOptions(opts.Config)!.SingleThreaded));
  let popTrace: (() => void) | undefined;
  if (opts.Tracing !== undefined) {
    popTrace = Tracing_Push(opts.Tracing, PhaseProgram, "createProgram", new globalThis.Map([["configFilePath", ParsedCommandLine_CompilerOptions(opts.Config)!.ConfigFilePath]]), true);
  }
  const pf = processAllProgramFiles(opts, singleThreaded);
  const p: Program = {
    opts,
    checkerPool: undefined,
    compilerCheckerPool: undefined,
    comparePathsOptions: { UseCaseSensitiveFileNames: false as bool, CurrentDirectory: "" },
    __tsgoEmbedded0: pf,
    usesUriStyleNodeCoreModules: TSUnknown,
    commonSourceDirectory: "",
    commonSourceDirectoryOnce: new Once(),
    declarationDiagnosticCache: { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncMapMap() } as SyncMap<GoPtr<SourceFile>, GoSlice<GoPtr<Diagnostic>>>,
    programDiagnostics: [],
    hasEmitBlockingDiagnostics: { M: new globalThis.Map<Path, { readonly __tsgoEmpty?: never }>() },
    sourceFilesToEmitOnce: new Once(),
    sourceFilesToEmit: [],
    unresolvedImports: { value: undefined, once: new Once(), initialized: new Bool() },
    knownSymlinks: { value: undefined, once: new Once(), initialized: new Bool() },
    packageNames: { value: undefined, once: new Once(), initialized: new Bool() },
    hasTSFileOnce: new Once(),
    hasTSFile: false as bool,
    packagesMapOnce: new Once(),
    packagesMap: new globalThis.Map<string, bool>(),
  };
  attachExtensionHostToProgram(opts, p);
  Program_initCheckerPool(p);
  Program_verifyCompilerOptions(p);
  if (popTrace !== undefined) {
    popTrace();
  }
  return p;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.UpdateProgram","kind":"method","status":"implemented","sigHash":"097d85513c9c582286da9c22bc2c9f5b1879006347dc4b6bf85f79c2b301cd05"}
 *
 * Go source:
 * // The returned *ast.SourceFile is the changed file as acquired through newHost; it is nil
 * // only if the host cannot locate the file (e.g. it was deleted). Callers that manage
 * // host-side parse caches must release this exact pointer when the old program could not be
 * // reused, since it was acquired speculatively before that decision was made.
 * func (p *Program) UpdateProgram(changedFilePath tspath.Path, newHost CompilerHost, createCheckerPool func(*Program) CheckerPool) (*Program, *ast.SourceFile, bool) {
 * 	newOpts := p.opts
 * 	newOpts.Host = newHost
 * 	if createCheckerPool != nil {
 * 		newOpts.CreateCheckerPool = createCheckerPool
 * 	}
 *
 * 	oldFile := p.filesByPath[changedFilePath]
 * 	newFile := newHost.GetSourceFile(oldFile.ParseOptions())
 *
 * 	// If this file is part of a package redirect group (same package installed in multiple
 * 	// node_modules locations), we need to rebuild the program because the redirect targets
 * 	// might need recalculation.
 * 	_, inRedirectFiles := p.redirectFilesByPath[changedFilePath]
 * 	_, isRedirectTarget := p.redirectTargetsMap[changedFilePath]
 * 	if inRedirectFiles || isRedirectTarget {
 * 		return NewProgram(newOpts), newFile, false
 * 	}
 *
 * 	if !canReplaceFileInProgram(oldFile, newFile) {
 * 		return NewProgram(newOpts), newFile, false
 * 	}
 * 	if oldNeedsImportHelpers := p.importHelpersImportSpecifiers[oldFile.Path()] != nil; oldNeedsImportHelpers != p.needsImportHelpersImportSpecifier(newFile) {
 * 		return NewProgram(newOpts), newFile, false
 * 	}
 * 	// TODO: reverify compiler options when config has changed?
 * 	result := &Program{
 * 		opts:                        newOpts,
 * 		comparePathsOptions:         p.comparePathsOptions,
 * 		processedFiles:              p.processedFiles,
 * 		usesUriStyleNodeCoreModules: p.usesUriStyleNodeCoreModules,
 * 		programDiagnostics:          p.programDiagnostics,
 * 		hasEmitBlockingDiagnostics:  p.hasEmitBlockingDiagnostics,
 * 	}
 * 	result.unresolvedImports.tryReuse(&p.unresolvedImports)
 * 	result.knownSymlinks.tryReuse(&p.knownSymlinks)
 * 	result.packageNames.tryReuse(&p.packageNames)
 * 	result.initCheckerPool()
 * 	index := core.FindIndex(result.files, func(file *ast.SourceFile) bool { return file.Path() == newFile.Path() })
 * 	result.files = slices.Clone(result.files)
 * 	result.files[index] = newFile
 * 	result.filesByPath = maps.Clone(result.filesByPath)
 * 	result.filesByPath[newFile.Path()] = newFile
 * 	updateFileIncludeProcessor(result)
 * 	return result, newFile, true
 * }
 */
export function Program_UpdateProgram(receiver: GoPtr<Program>, changedFilePath: Path, newHost: GoInterface<CompilerHost>, createCheckerPool: (arg0: GoPtr<Program>) => CheckerPool): [GoPtr<Program>, GoPtr<SourceFile>, bool] {
  const newOpts: ProgramOptions = { ...receiver!.opts, Host: newHost };
  if (createCheckerPool !== undefined) {
    newOpts.CreateCheckerPool = createCheckerPool;
  }

  const oldFile = receiver!.__tsgoEmbedded0!.filesByPath.get(changedFilePath);
  const newFile = newHost!.GetSourceFile(SourceFile_ParseOptions(oldFile));

  // If this file is part of a package redirect group (same package installed in multiple
  // node_modules locations), we need to rebuild the program because the redirect targets
  // might need recalculation.
  const inRedirectFiles = receiver!.__tsgoEmbedded0!.redirectFilesByPath.has(changedFilePath);
  const isRedirectTarget = receiver!.__tsgoEmbedded0!.redirectTargetsMap.has(changedFilePath);
  if (inRedirectFiles || isRedirectTarget) {
    return [NewProgram(newOpts), newFile, false as bool];
  }

  if (!canReplaceFileInProgram(oldFile, newFile)) {
    return [NewProgram(newOpts), newFile, false as bool];
  }
  const oldNeedsImportHelpers = receiver!.__tsgoEmbedded0!.importHelpersImportSpecifiers.get(SourceFile_Path(oldFile)) !== undefined;
  if (oldNeedsImportHelpers !== Program_needsImportHelpersImportSpecifier(receiver, newFile)) {
    return [NewProgram(newOpts), newFile, false as bool];
  }
  // TODO: reverify compiler options when config has changed?
  // Clone processedFiles (embedded struct) since we will modify files and filesByPath
  const pf = receiver!.__tsgoEmbedded0!;
  const resultPf: processedFiles = { ...pf };
  const resultUnresolvedImports: lazyValue<Set<string>> = { value: undefined, once: new Once(), initialized: new Bool() };
  const resultKnownSymlinks: lazyValue<KnownSymlinks> = { value: undefined, once: new Once(), initialized: new Bool() };
  const resultPackageNames: lazyValue<packageNamesInfo> = { value: undefined, once: new Once(), initialized: new Bool() };
  const result: Program = {
    opts: newOpts,
    checkerPool: undefined,
    compilerCheckerPool: undefined,
    comparePathsOptions: receiver!.comparePathsOptions,
    __tsgoEmbedded0: resultPf,
    usesUriStyleNodeCoreModules: receiver!.usesUriStyleNodeCoreModules,
    commonSourceDirectory: "",
    commonSourceDirectoryOnce: new Once(),
    declarationDiagnosticCache: { __tsgoBlank0: [], __tsgoBlank1: [], m: new SyncMapMap() } as SyncMap<GoPtr<SourceFile>, GoSlice<GoPtr<Diagnostic>>>,
    programDiagnostics: receiver!.programDiagnostics,
    hasEmitBlockingDiagnostics: receiver!.hasEmitBlockingDiagnostics,
    sourceFilesToEmitOnce: new Once(),
    sourceFilesToEmit: [],
    unresolvedImports: resultUnresolvedImports,
    knownSymlinks: resultKnownSymlinks,
    packageNames: resultPackageNames,
    hasTSFileOnce: new Once(),
    hasTSFile: false as bool,
    packagesMapOnce: new Once(),
    packagesMap: new globalThis.Map<string, bool>(),
  };
  lazyValue_tryReuse(resultUnresolvedImports, receiver!.unresolvedImports);
  lazyValue_tryReuse(resultKnownSymlinks, receiver!.knownSymlinks);
  lazyValue_tryReuse(resultPackageNames, receiver!.packageNames);
  Program_initCheckerPool(result);
  const index = FindIndex(resultPf.files, (file: GoPtr<SourceFile>): bool => (SourceFile_Path(file) === SourceFile_Path(newFile)) as bool);
  resultPf.files = slices.Clone(resultPf.files) ?? [];
  resultPf.files[index] = newFile;
  resultPf.filesByPath = maps.Clone(resultPf.filesByPath, GoStringKey);
  resultPf.filesByPath.set(SourceFile_Path(newFile), newFile);
  updateFileIncludeProcessor(result);
  return [result, newFile, true as bool];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.initCheckerPool","kind":"method","status":"implemented","sigHash":"000437a9efbeaad3221bebdc1fb51c128da3df5f1289c1e71ea96c2ddca562d2"}
 *
 * Go source:
 * func (p *Program) initCheckerPool() {
 * 	if !p.finishedProcessing {
 * 		panic("Program must finish processing files before initializing checker pool")
 * 	}
 * 
 * 	if p.opts.CreateCheckerPool != nil {
 * 		p.checkerPool = p.opts.CreateCheckerPool(p)
 * 	} else {
 * 		pool := newCheckerPoolWithTracing(p, p.opts.Tracing)
 * 		p.checkerPool = pool
 * 		p.compilerCheckerPool = pool
 * 	}
 * }
 */
export function Program_initCheckerPool(receiver: GoPtr<Program>): void {
  if (!receiver!.__tsgoEmbedded0!.finishedProcessing) {
    throw new globalThis.Error("Program must finish processing files before initializing checker pool");
  }
  if (receiver!.opts.CreateCheckerPool !== undefined) {
    receiver!.checkerPool = receiver!.opts.CreateCheckerPool(receiver);
  } else {
    const pool = newCheckerPoolWithTracing(receiver, receiver!.opts.Tracing);
    receiver!.checkerPool = checkerPool_as_compiler_CheckerPool(pool);
    receiver!.compilerCheckerPool = pool;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetCheckerPool","kind":"method","status":"implemented","sigHash":"366050abc6a31e95bec7998d21cc67dbc0de33075b90f132b3753745b4e78356"}
 *
 * Go source:
 * // GetCheckerPool returns the checker pool associated with this program.
 * func (p *Program) GetCheckerPool() CheckerPool {
 * 	return p.checkerPool
 * }
 */
export function Program_GetCheckerPool(receiver: GoPtr<Program>): GoInterface<CheckerPool> {
  return receiver!.checkerPool!;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::canReplaceFileInProgram","kind":"func","status":"implemented","sigHash":"4f8fd32177e983587505934059babd27f42b0d687899b031ac73f14c2924ef7a"}
 *
 * Go source:
 * func canReplaceFileInProgram(file1 *ast.SourceFile, file2 *ast.SourceFile) bool {
 * 	return file2 != nil &&
 * 		file1.ParseOptions() == file2.ParseOptions() &&
 * 		file1.UsesUriStyleNodeCoreModules == file2.UsesUriStyleNodeCoreModules &&
 * 		slices.EqualFunc(file1.Imports(), file2.Imports(), equalModuleSpecifiers) &&
 * 		slices.EqualFunc(file1.ModuleAugmentations, file2.ModuleAugmentations, equalModuleAugmentationNames) &&
 * 		slices.Equal(file1.AmbientModuleNames, file2.AmbientModuleNames) &&
 * 		slices.EqualFunc(file1.ReferencedFiles, file2.ReferencedFiles, equalFileReferences) &&
 * 		slices.EqualFunc(file1.TypeReferenceDirectives, file2.TypeReferenceDirectives, equalFileReferences) &&
 * 		slices.EqualFunc(file1.LibReferenceDirectives, file2.LibReferenceDirectives, equalFileReferences) &&
 * 		equalCheckJSDirectives(file1.CheckJsDirective, file2.CheckJsDirective)
 * }
 */
export function canReplaceFileInProgram(file1: GoPtr<SourceFile>, file2: GoPtr<SourceFile>): bool {
  return (file2 !== undefined &&
    SourceFile_ParseOptions(file1) === SourceFile_ParseOptions(file2) &&
    file1!.UsesUriStyleNodeCoreModules === file2!.UsesUriStyleNodeCoreModules &&
    slices.EqualFunc(SourceFile_Imports(file1), SourceFile_Imports(file2), equalModuleSpecifiers) &&
    slices.EqualFunc(file1!.ModuleAugmentations, file2!.ModuleAugmentations, equalModuleAugmentationNames) &&
    slices.Equal(file1!.AmbientModuleNames, file2!.AmbientModuleNames, GoEqualStrict<string>) &&
    slices.EqualFunc(file1!.ReferencedFiles, file2!.ReferencedFiles, equalFileReferences) &&
    slices.EqualFunc(file1!.TypeReferenceDirectives, file2!.TypeReferenceDirectives, equalFileReferences) &&
    slices.EqualFunc(file1!.LibReferenceDirectives, file2!.LibReferenceDirectives, equalFileReferences) &&
    equalCheckJSDirectives(file1!.CheckJsDirective, file2!.CheckJsDirective)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.needsImportHelpersImportSpecifier","kind":"method","status":"implemented","sigHash":"1c70bf32d9548dc6b9c333b3d4a17d9621bdb2d1f4425b6fc44eab874b88ec9a"}
 *
 * Go source:
 * func (p *Program) needsImportHelpersImportSpecifier(file *ast.SourceFile) bool {
 * 	redirect, _ := p.projectReferenceFileMapper.getRedirectForResolution(file)
 * 	optionsForFile := module.GetCompilerOptionsWithRedirect(p.opts.Config.CompilerOptions(), redirect)
 * 	if !optionsForFile.ImportHelpers.IsTrue() {
 * 		return false
 * 	}
 * 	isJavaScriptFile := ast.IsSourceFileJS(file)
 * 	isExternalModuleFile := ast.IsExternalModule(file)
 * 	if !isJavaScriptFile && (file.IsDeclarationFile || (!optionsForFile.GetIsolatedModules() && !isExternalModuleFile)) {
 * 		return false
 * 	}
 * 	return true
 * }
 */
export function Program_needsImportHelpersImportSpecifier(receiver: GoPtr<Program>, file: GoPtr<SourceFile>): bool {
  const [redirect] = projectReferenceFileMapper_getRedirectForResolution(receiver!.__tsgoEmbedded0!.projectReferenceFileMapper, SourceFile_as_ast_HasFileName(file));
  const optionsForFile = GetCompilerOptionsWithRedirect(
    ParsedCommandLine_CompilerOptions(receiver!.opts.Config),
    redirect !== undefined ? ParsedCommandLine_as_ResolvedProjectReference(redirect) : undefined,
  );
  if (!Tristate_IsTrue(optionsForFile!.ImportHelpers)) {
    return false as bool;
  }
  const isJavaScriptFile = IsSourceFileJS(file);
  const isExternalModuleFile = IsExternalModule(file);
  if (!isJavaScriptFile && (file!.IsDeclarationFile || (!CompilerOptions_GetIsolatedModules(optionsForFile) && !isExternalModuleFile))) {
    return false as bool;
  }
  return true as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::equalModuleSpecifiers","kind":"func","status":"implemented","sigHash":"4544cb65d07ffe43d581d18a3f180f117f978bd5bf9ccff7e1e9821b1ddd69c7"}
 *
 * Go source:
 * func equalModuleSpecifiers(n1 *ast.Node, n2 *ast.Node) bool {
 * 	return n1.Kind == n2.Kind && (!ast.IsStringLiteral(n1) || n1.Text() == n2.Text())
 * }
 */
export function equalModuleSpecifiers(n1: GoPtr<Node>, n2: GoPtr<Node>): bool {
  return (n1!.Kind === n2!.Kind && (!IsStringLiteral(n1) || Node_Text(n1) === Node_Text(n2))) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::equalModuleAugmentationNames","kind":"func","status":"implemented","sigHash":"a045b82c7c9e78b034629e2295dfafa92acd413c93ae0ad5025ce1698d1c4ac9"}
 *
 * Go source:
 * func equalModuleAugmentationNames(n1 *ast.Node, n2 *ast.Node) bool {
 * 	return n1.Kind == n2.Kind && n1.Text() == n2.Text()
 * }
 */
export function equalModuleAugmentationNames(n1: GoPtr<Node>, n2: GoPtr<Node>): bool {
  return (n1!.Kind === n2!.Kind && Node_Text(n1) === Node_Text(n2)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::equalFileReferences","kind":"func","status":"implemented","sigHash":"126c1d7c7d26f623ea6c87363446aecc52fb011f5aaf335f82d8956fb2aa4a8d"}
 *
 * Go source:
 * func equalFileReferences(f1 *ast.FileReference, f2 *ast.FileReference) bool {
 * 	return f1.FileName == f2.FileName && f1.ResolutionMode == f2.ResolutionMode && f1.Preserve == f2.Preserve
 * }
 */
export function equalFileReferences(f1: GoPtr<FileReference>, f2: GoPtr<FileReference>): bool {
  return (f1!.FileName === f2!.FileName && f1!.ResolutionMode === f2!.ResolutionMode && f1!.Preserve === f2!.Preserve) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::equalCheckJSDirectives","kind":"func","status":"implemented","sigHash":"5aa4e224238cf5857efacd83f24769ea55944909e67223b34ad99d4b78dd8340"}
 *
 * Go source:
 * func equalCheckJSDirectives(d1 *ast.CheckJsDirective, d2 *ast.CheckJsDirective) bool {
 * 	return d1 == nil && d2 == nil || d1 != nil && d2 != nil && d1.Enabled == d2.Enabled
 * }
 */
export function equalCheckJSDirectives(d1: GoPtr<CheckJsDirective>, d2: GoPtr<CheckJsDirective>): bool {
  return (d1 === undefined && d2 === undefined || d1 !== undefined && d2 !== undefined && d1!.Enabled === d2!.Enabled) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.SourceFiles","kind":"method","status":"implemented","sigHash":"608e18c5721ca7f7e807977f05ba791d60021445a1ac8adb068fab9d371cd435"}
 *
 * Go source:
 * func (p *Program) SourceFiles() []*ast.SourceFile               { return p.files }
 */
export function Program_SourceFiles(receiver: GoPtr<Program>): GoSlice<GoPtr<SourceFile>> {
  return receiver!.__tsgoEmbedded0!.files;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.DuplicateSourceFiles","kind":"method","status":"implemented","sigHash":"6052d32bc61ab054cbf2e71007b9576670d714a54c815a6601ac8a2661322350"}
 *
 * Go source:
 * func (p *Program) DuplicateSourceFiles() []*DuplicateSourceFile { return p.duplicateSourceFiles }
 */
export function Program_DuplicateSourceFiles(receiver: GoPtr<Program>): GoSlice<GoPtr<DuplicateSourceFile>> {
  return receiver!.__tsgoEmbedded0!.duplicateSourceFiles;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.Options","kind":"method","status":"implemented","sigHash":"818bcf698efc58e835b155c2301c3e4526057d6a332c7110d77edb167dbd54de"}
 *
 * Go source:
 * func (p *Program) Options() *core.CompilerOptions               { return p.opts.Config.CompilerOptions() }
 */
export function Program_Options(receiver: GoPtr<Program>): GoPtr<CompilerOptions> {
  return ParsedCommandLine_CompilerOptions(receiver!.opts.Config);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.CommandLine","kind":"method","status":"implemented","sigHash":"4b37ffe140b96df28d6f0687f406a7fd51ebce286244b7cad9eaeef4ef273ab5"}
 *
 * Go source:
 * func (p *Program) CommandLine() *tsoptions.ParsedCommandLine    { return p.opts.Config }
 */
export function Program_CommandLine(receiver: GoPtr<Program>): GoPtr<ParsedCommandLine> {
  return receiver!.opts.Config;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.Host","kind":"method","status":"implemented","sigHash":"b1bb3471775e3489a88821d8204f7d237db0c537e1c70d2d77da6843d38b8105"}
 *
 * Go source:
 * func (p *Program) Host() CompilerHost                           { return p.opts.Host }
 */
export function Program_Host(receiver: GoPtr<Program>): GoInterface<CompilerHost> {
  return receiver!.opts.Host;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.Tracing","kind":"method","status":"implemented","sigHash":"ab20db87195fe8af07ec6bf25797b635efb77a21fec2ed7d46a950dd05fbe306"}
 *
 * Go source:
 * func (p *Program) Tracing() *tracing.Tracing                    { return p.opts.Tracing }
 */
export function Program_Tracing(receiver: GoPtr<Program>): GoPtr<Tracing_bcfc8412> {
  return receiver!.opts.Tracing;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetConfigFileParsingDiagnostics","kind":"method","status":"implemented","sigHash":"a5bd0bd1fc1c78e44ba8319a3319cb03633083eced257f55b1566222533f268a"}
 *
 * Go source:
 * func (p *Program) GetConfigFileParsingDiagnostics() []*ast.Diagnostic {
 * 	return slices.Clip(p.opts.Config.GetConfigFileParsingDiagnostics())
 * }
 */
export function Program_GetConfigFileParsingDiagnostics(receiver: GoPtr<Program>): GoSlice<GoPtr<Diagnostic>> {
  return slices.Clip(ParsedCommandLine_GetConfigFileParsingDiagnostics(receiver!.opts.Config));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetUnresolvedImports","kind":"method","status":"implemented","sigHash":"b5213501873a4601d4e2b5adc0da370c43e6a25707032a45d422911e790e36d6"}
 *
 * Go source:
 * func (p *Program) GetUnresolvedImports() *collections.Set[string] {
 * 	return p.unresolvedImports.getValue(p.extractUnresolvedImports)
 * }
 */
export function Program_GetUnresolvedImports(receiver: GoPtr<Program>): GoPtr<Set<string>> {
  return lazyValue_getValue(receiver!.unresolvedImports, () => GoValueRef(Program_extractUnresolvedImports(receiver)!))!.v;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.extractUnresolvedImports","kind":"method","status":"implemented","sigHash":"2e680105768a1ba9a4da4b54dec265ba0bc97afa31696124e68f88dac6334ae7"}
 *
 * Go source:
 * func (p *Program) extractUnresolvedImports() *collections.Set[string] {
 * 	unresolvedSet := &collections.Set[string]{}
 * 
 * 	for _, sourceFile := range p.files {
 * 		unresolvedImports := p.extractUnresolvedImportsFromSourceFile(sourceFile)
 * 		for _, imp := range unresolvedImports {
 * 			unresolvedSet.Add(imp)
 * 		}
 * 	}
 * 
 * 	return unresolvedSet
 * }
 */
export function Program_extractUnresolvedImports(receiver: GoPtr<Program>): GoPtr<Set<string>> {
  const unresolvedSet: Set<string> = { M: new Map() };
  for (const sourceFile of receiver!.__tsgoEmbedded0!.files) {
    const unresolvedImports = Program_extractUnresolvedImportsFromSourceFile(receiver, sourceFile);
    for (const imp of unresolvedImports) {
      Set_Add(unresolvedSet, imp, GoStringKey);
    }
  }
  return unresolvedSet;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.extractUnresolvedImportsFromSourceFile","kind":"method","status":"implemented","sigHash":"1e18f9e0b1ed8ef4b0685953e7d655edbc1bc18a6f86d8e3fc9f5f5a82584dea"}
 *
 * Go source:
 * func (p *Program) extractUnresolvedImportsFromSourceFile(file *ast.SourceFile) []string {
 * 	var unresolvedImports []string
 * 
 * 	resolvedModules := p.resolvedModules[file.Path()]
 * 	for cacheKey, resolution := range resolvedModules {
 * 		resolved := resolution.IsResolved()
 * 		if (!resolved || !tspath.ExtensionIsOneOf(resolution.Extension, tspath.SupportedTSExtensionsWithJsonFlat)) &&
 * 			!tspath.IsExternalModuleNameRelative(cacheKey.Name) {
 * 			unresolvedImports = append(unresolvedImports, cacheKey.Name)
 * 		}
 * 	}
 * 
 * 	return unresolvedImports
 * }
 */
export function Program_extractUnresolvedImportsFromSourceFile(receiver: GoPtr<Program>, file: GoPtr<SourceFile>): GoSlice<string> {
  const unresolvedImports: string[] = [];
  const resolvedModules = receiver!.__tsgoEmbedded0!.resolvedModules.get(SourceFile_Path(file)!);
  if (resolvedModules !== undefined) {
    for (const [cacheKey, resolution_] of resolvedModules) {
      const resolution = resolution_ as GoPtr<ResolvedModule>;
      const resolved = ResolvedModule_IsResolved(resolution);
      if ((!resolved || (!ResolvedModule_IsProviderVirtual(resolution) && !ExtensionIsOneOf(resolution!.Extension, SupportedTSExtensionsWithJsonFlat as GoSlice<string>))) &&
          !IsExternalModuleNameRelative(cacheKey.Name)) {
        unresolvedImports.push(cacheKey.Name);
      }
    }
  }
  return unresolvedImports;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.SingleThreaded","kind":"method","status":"implemented","sigHash":"8a982734284cda94896ef3e8c885f215edb405bfd7f16ac83cd57cde9b378af6"}
 *
 * Go source:
 * func (p *Program) SingleThreaded() bool {
 * 	return p.opts.SingleThreaded.DefaultIfUnknown(p.Options().SingleThreaded).IsTrue()
 * }
 */
export function Program_SingleThreaded(receiver: GoPtr<Program>): bool {
  return Tristate_IsTrue(Tristate_DefaultIfUnknown(receiver!.opts.SingleThreaded ?? TSUnknown, Program_Options(receiver)!.SingleThreaded));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.BindSourceFiles","kind":"method","status":"implemented","sigHash":"adbb681ce817a1474ae6c753e2045b27ef0b0ead57fdc141f8e63bb8642fd42f"}
 *
 * Go source:
 * func (p *Program) BindSourceFiles() {
 * 	wg := core.NewWorkGroup(p.SingleThreaded())
 * 	for _, file := range p.files {
 * 		if !file.IsBound() {
 * 			wg.Queue(func() {
 * 				if p.opts.Tracing != nil {
 * 					defer p.opts.Tracing.Push(tracing.PhaseBind, "bindSourceFile", map[string]any{"path": string(file.Path())}, true)()
 * 				}
 * 				binder.BindSourceFile(file)
 * 			})
 * 		}
 * 	}
 * 	wg.RunAndWait()
 * }
 */
export function Program_BindSourceFiles(receiver: GoPtr<Program>): void {
  for (const file of receiver!.__tsgoEmbedded0!.files) {
    if (!SourceFile_IsBound(file)) {
      BindSourceFile(file);
      recordBoundSourceFileExtensionFacts(receiver!.opts, file);
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetTypeChecker","kind":"method","status":"implemented","sigHash":"7f22b10d2f692dbfc5270037934530f76bb2909dc53fc1119c05c25fbc471cd8"}
 *
 * Go source:
 * func (p *Program) GetTypeChecker(ctx context.Context) (*checker.Checker, func()) {
 * 	if p.compilerCheckerPool != nil {
 * 		return p.compilerCheckerPool.getCheckerNonExclusive()
 * 	}
 * 	return p.checkerPool.GetChecker(ctx, nil)
 * }
 */
export function Program_GetTypeChecker(receiver: GoPtr<Program>, ctx: GoInterface<Context>): [GoPtr<Checker>, GoFunc<() => void>] {
  if (receiver!.compilerCheckerPool !== undefined) {
    return checkerPool_getCheckerNonExclusive(receiver!.compilerCheckerPool);
  }
  return receiver!.checkerPool!.GetChecker(ctx, undefined);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.ForEachCheckerParallel","kind":"method","status":"implemented","sigHash":"5a3006370d25c05251a48a40a185f9e41f887e1fbbc47f61a778ef9ad9ac33d5"}
 *
 * Go source:
 * func (p *Program) ForEachCheckerParallel(cb func(idx int, c *checker.Checker)) {
 * 	if p.compilerCheckerPool != nil {
 * 		p.compilerCheckerPool.forEachCheckerParallel(cb)
 * 	}
 * }
 */
export function Program_ForEachCheckerParallel(receiver: GoPtr<Program>, cb: GoFunc<(idx: int, c: GoPtr<Checker>) => void>): void {
  if (receiver!.compilerCheckerPool !== undefined) {
    checkerPool_forEachCheckerParallel(receiver!.compilerCheckerPool, cb);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetTypeCheckerForFile","kind":"method","status":"implemented","sigHash":"1e9f5cdc23ad2cc53c97af88539ba8f5c29e9faf05c932ff496ba8f901c370b3"}
 *
 * Go source:
 * func (p *Program) GetTypeCheckerForFile(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
 * 	if p.compilerCheckerPool != nil {
 * 		return p.compilerCheckerPool.getCheckerForFileNonExclusive(file)
 * 	}
 * 	return p.checkerPool.GetChecker(ctx, file)
 * }
 */
export function Program_GetTypeCheckerForFile(receiver: GoPtr<Program>, ctx: GoInterface<Context>, file: GoPtr<SourceFile>): [GoPtr<Checker>, GoFunc<() => void>] {
  if (receiver!.compilerCheckerPool !== undefined) {
    return checkerPool_getCheckerForFileNonExclusive(receiver!.compilerCheckerPool, file);
  }
  return receiver!.checkerPool!.GetChecker(ctx, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetTypeCheckerForFileExclusive","kind":"method","status":"implemented","sigHash":"e1d0b0bd38d97ea1e440c824b55c973914ec69b0657ebfe3153c18e9293790e0"}
 *
 * Go source:
 * func (p *Program) GetTypeCheckerForFileExclusive(ctx context.Context, file *ast.SourceFile) (*checker.Checker, func()) {
 * 	if p.compilerCheckerPool != nil {
 * 		return p.compilerCheckerPool.getCheckerForFileExclusive(ctx, file)
 * 	}
 * 	return p.checkerPool.GetChecker(ctx, file)
 * }
 */
export function Program_GetTypeCheckerForFileExclusive(receiver: GoPtr<Program>, ctx: GoInterface<Context>, file: GoPtr<SourceFile>): [GoPtr<Checker>, GoFunc<() => void>] {
  if (receiver!.compilerCheckerPool !== undefined) {
    return checkerPool_getCheckerForFileExclusive(receiver!.compilerCheckerPool, ctx, file);
  }
  return receiver!.checkerPool!.GetChecker(ctx, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetResolvedModule","kind":"method","status":"implemented","sigHash":"eb787d5ddb04bd874d214bb1cc82f727b68073d11a36c71c8c9206e1f4b258d4"}
 *
 * Go source:
 * func (p *Program) GetResolvedModule(file ast.HasFileName, moduleReference string, mode core.ResolutionMode) *module.ResolvedModule {
 * 	if resolutions, ok := p.resolvedModules[file.Path()]; ok {
 * 		if resolved, ok := resolutions[module.ModeAwareCacheKey{Name: moduleReference, Mode: mode}]; ok {
 * 			return resolved
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Program_GetResolvedModule(receiver: GoPtr<Program>, file: GoInterface<HasFileName>, moduleReference: string, mode: ResolutionMode): GoPtr<ResolvedModule> {
  const resolutions = receiver!.__tsgoEmbedded0!.resolvedModules.get(file!.Path());
  if (resolutions !== undefined) {
    for (const [k, v] of resolutions) {
      if (k.Name === moduleReference && k.Mode === mode) {
        return v as GoPtr<ResolvedModule>;
      }
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetResolvedModuleFromModuleSpecifier","kind":"method","status":"implemented","sigHash":"02a6e4a4695bd3db8a306f22abd65633f27cca0edcba16fc5da0f535b9e8aad8"}
 *
 * Go source:
 * func (p *Program) GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule {
 * 	if !ast.IsStringLiteralLike(moduleSpecifier) {
 * 		panic("moduleSpecifier must be a StringLiteralLike")
 * 	}
 * 	mode := p.GetModeForUsageLocation(file, moduleSpecifier)
 * 	return p.GetResolvedModule(file, moduleSpecifier.Text(), mode)
 * }
 */
export function Program_GetResolvedModuleFromModuleSpecifier(receiver: GoPtr<Program>, file: GoInterface<HasFileName>, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> {
  if (!IsStringLiteralLike(moduleSpecifier)) {
    throw new globalThis.Error("moduleSpecifier must be a StringLiteralLike");
  }
  const mode = Program_GetModeForUsageLocation(receiver, file, moduleSpecifier);
  return Program_GetResolvedModule(receiver, file, Node_Text(moduleSpecifier), mode);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetResolvedModules","kind":"method","status":"implemented","sigHash":"da91cb47c6a885908aa99b705ab7e6a069659a4186a8f807641d2fc622ea0e6e"}
 *
 * Go source:
 * func (p *Program) GetResolvedModules() map[tspath.Path]module.ModeAwareCache[*module.ResolvedModule] {
 * 	return p.resolvedModules
 * }
 */
export function Program_GetResolvedModules(receiver: GoPtr<Program>): GoMap<Path, ModeAwareCache<GoPtr<ResolvedModule>>> {
  return receiver!.__tsgoEmbedded0!.resolvedModules;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetPackagesMap","kind":"method","status":"implemented","sigHash":"03785ca54279e316b56cd7c042292a5a71949c299b02ad076e1fda139bc4b76c"}
 *
 * Go source:
 * func (p *Program) GetPackagesMap() map[string]bool {
 * 	p.packagesMapOnce.Do(func() {
 * 		p.packagesMap = make(map[string]bool)
 * 		for _, resolvedModulesInFile := range p.resolvedModules {
 * 			for _, mod := range resolvedModulesInFile {
 * 				if mod.PackageId.Name != "" {
 * 					p.packagesMap[mod.PackageId.Name] = p.packagesMap[mod.PackageId.Name] || mod.Extension == tspath.ExtensionDts
 * 				}
 * 			}
 * 		}
 * 	})
 * 	return p.packagesMap
 * }
 */
export function Program_GetPackagesMap(receiver: GoPtr<Program>): GoMap<string, bool> {
  receiver!.packagesMapOnce.Do(() => {
    receiver!.packagesMap = new globalThis.Map<string, bool>();
    for (const [, resolvedModulesInFile] of receiver!.__tsgoEmbedded0!.resolvedModules ?? []) {
      for (const [, mod] of resolvedModulesInFile ?? []) {
        const m = mod as GoPtr<ResolvedModule>;
        if (m !== undefined && !ResolvedModule_IsProviderVirtual(m) && m!.PackageId !== undefined && m!.PackageId.Name !== "") {
          receiver!.packagesMap.set(
            m!.PackageId.Name,
            (receiver!.packagesMap.get(m!.PackageId.Name) || (m!.Extension === ".d.ts")) as bool,
          );
        }
      }
    }
  });
  return receiver!.packagesMap;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.collectDiagnostics","kind":"method","status":"implemented","sigHash":"124e0090ae352ee76aa7b31ad4da3be50da7c5737365b0a14c7fcff73f002e78"}
 *
 * Go source:
 * func (p *Program) collectDiagnostics(ctx context.Context, sourceFile *ast.SourceFile, concurrent bool, collect func(context.Context, *ast.SourceFile) []*ast.Diagnostic) []*ast.Diagnostic {
 * 	var result []*ast.Diagnostic
 * 	if sourceFile != nil {
 * 		result = collect(ctx, sourceFile)
 * 	} else {
 * 		diagnostics := p.collectDiagnosticsFromFiles(ctx, p.files, concurrent, collect)
 * 		result = slices.Concat(diagnostics...)
 * 	}
 * 	return SortAndDeduplicateDiagnostics(result)
 * }
 */
export function Program_collectDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>, concurrent: bool, collect: (arg0: Context, arg1: GoPtr<SourceFile>) => GoSlice<GoPtr<Diagnostic>>): GoSlice<GoPtr<Diagnostic>> {
  let result: GoSlice<GoPtr<Diagnostic>>;
  if (sourceFile !== undefined) {
    result = collect(ctx!, sourceFile);
  } else {
    const diagnostics = Program_collectDiagnosticsFromFiles(receiver, ctx, receiver!.__tsgoEmbedded0!.files, concurrent, collect);
    result = slices.Concat(...diagnostics);
  }
  return SortAndDeduplicateDiagnostics(result);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.collectDiagnosticsFromFiles","kind":"method","status":"implemented","sigHash":"9144f49fb3417b26eeadc037bd2267b2fa8e312a015b1343138387df643df1b5"}
 *
 * Go source:
 * func (p *Program) collectDiagnosticsFromFiles(ctx context.Context, sourceFiles []*ast.SourceFile, concurrent bool, collect func(context.Context, *ast.SourceFile) []*ast.Diagnostic) [][]*ast.Diagnostic {
 * 	diagnostics := make([][]*ast.Diagnostic, len(sourceFiles))
 * 	wg := core.NewWorkGroup(!concurrent || p.SingleThreaded())
 * 	for i, file := range sourceFiles {
 * 		wg.Queue(func() {
 * 			diagnostics[i] = collect(ctx, file)
 * 		})
 * 	}
 * 	wg.RunAndWait()
 * 	return diagnostics
 * }
 */
export function Program_collectDiagnosticsFromFiles(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFiles: GoSlice<GoPtr<SourceFile>>, concurrent: bool, collect: (arg0: Context, arg1: GoPtr<SourceFile>) => GoSlice<GoPtr<Diagnostic>>): GoSlice<GoSlice<GoPtr<Diagnostic>>> {
  const diagnostics: GoSlice<GoPtr<Diagnostic>>[] = new Array(sourceFiles.length);
  for (let i = 0; i < sourceFiles.length; i++) {
    diagnostics[i] = collect(ctx!, sourceFiles[i]);
  }
  return diagnostics;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.collectCheckerDiagnostics","kind":"method","status":"implemented","sigHash":"51b1af4466cb4d0534fd7782470e7a60e57b6d407e86bbebb938dac174a4f05a"}
 *
 * Go source:
 * func (p *Program) collectCheckerDiagnostics(ctx context.Context, sourceFile *ast.SourceFile, collect func(context.Context, *checker.Checker, *ast.SourceFile) []*ast.Diagnostic) []*ast.Diagnostic {
 * 	if sourceFile != nil {
 * 		if p.SkipTypeChecking(sourceFile, false) {
 * 			return nil
 * 		}
 * 		c, done := p.GetTypeCheckerForFileExclusive(ctx, sourceFile)
 * 		result := collect(ctx, c, sourceFile)
 * 		done()
 * 		return SortAndDeduplicateDiagnostics(result)
 * 	}
 * 	return SortAndDeduplicateDiagnostics(slices.Concat(p.collectCheckerDiagnosticsFromFiles(ctx, p.files, collect)...))
 * }
 */
export function Program_collectCheckerDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>, collect: (arg0: Context, arg1: GoPtr<Checker>, arg2: GoPtr<SourceFile>) => GoSlice<GoPtr<Diagnostic>>): GoSlice<GoPtr<Diagnostic>> {
  if (sourceFile !== undefined) {
    if (Program_SkipTypeChecking(receiver, sourceFile, false as bool)) {
      return undefined!;
    }
    const [c, done] = Program_GetTypeCheckerForFileExclusive(receiver, ctx, sourceFile);
    const result = collect(ctx!, c, sourceFile);
    done!();
    return SortAndDeduplicateDiagnostics(result);
  }
  const allDiags = Program_collectCheckerDiagnosticsFromFiles(receiver, ctx, receiver!.__tsgoEmbedded0!.files, collect);
  return SortAndDeduplicateDiagnostics(slices.Concat(...allDiags));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.collectCheckerDiagnosticsFromFiles","kind":"method","status":"implemented","sigHash":"6c8971e48d6bae50278c40718b6b259e90eb1e626abb7ae5fbbabf424eb24261"}
 *
 * Go source:
 * func (p *Program) collectCheckerDiagnosticsFromFiles(ctx context.Context, sourceFiles []*ast.SourceFile, collect func(context.Context, *checker.Checker, *ast.SourceFile) []*ast.Diagnostic) [][]*ast.Diagnostic {
 * 	diagnostics := make([][]*ast.Diagnostic, len(sourceFiles))
 * 	if p.compilerCheckerPool != nil {
 * 		p.compilerCheckerPool.forEachCheckerGroupDo(ctx, sourceFiles, p.SingleThreaded(), func(c *checker.Checker, fileIndex int, file *ast.SourceFile) {
 * 			diagnostics[fileIndex] = collect(ctx, c, file)
 * 		})
 * 	} else {
 * 		wg := core.NewWorkGroup(p.SingleThreaded())
 * 		for i, file := range sourceFiles {
 * 			if p.SkipTypeChecking(file, false) {
 * 				continue
 * 			}
 * 			wg.Queue(func() {
 * 				c, done := p.checkerPool.GetChecker(ctx, file)
 * 				diagnostics[i] = collect(ctx, c, file)
 * 				done()
 * 			})
 * 		}
 * 		wg.RunAndWait()
 * 	}
 * 	return diagnostics
 * }
 */
export function Program_collectCheckerDiagnosticsFromFiles(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFiles: GoSlice<GoPtr<SourceFile>>, collect: (arg0: Context, arg1: GoPtr<Checker>, arg2: GoPtr<SourceFile>) => GoSlice<GoPtr<Diagnostic>>): GoSlice<GoSlice<GoPtr<Diagnostic>>> {
  const diagnostics: GoSlice<GoPtr<Diagnostic>>[] = new Array(sourceFiles.length);
  if (receiver!.compilerCheckerPool !== undefined) {
    checkerPool_forEachCheckerGroupDo(receiver!.compilerCheckerPool, ctx, sourceFiles, Program_SingleThreaded(receiver), (c, fileIndex, file) => {
      diagnostics[fileIndex] = collect(ctx!, c, file);
    });
  } else {
    for (let i = 0; i < sourceFiles.length; i++) {
      const file = sourceFiles[i];
      if (Program_SkipTypeChecking(receiver, file, false as bool)) {
        continue;
      }
      const [c, done] = receiver!.checkerPool!.GetChecker(ctx, file);
      diagnostics[i] = collect(ctx!, c, file);
      done!();
    }
  }
  return diagnostics;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSyntacticDiagnostics","kind":"method","status":"implemented","sigHash":"5b7931971e5188c205afc074b2b9cf7fc2773d14b5ad5a3d43cd75043f1dbe21"}
 *
 * Go source:
 * func (p *Program) GetSyntacticDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	return p.collectDiagnostics(ctx, sourceFile, false /*concurrent* /, func(_ context.Context, file *ast.SourceFile) []*ast.Diagnostic {
 * 		diags := core.Concatenate(file.Diagnostics(), file.JSDiagnostics())
 * 		// For JS files that won't be checked by the checker (no checkJs/ts-check), we need
 * 		// program-level syntactic checks that require compiler options. This mirrors Strada's
 * 		// getJSSyntacticDiagnosticsForFile in program.ts.
 * 		if ast.IsSourceFileJS(file) && !ast.IsCheckJSEnabledForFile(file, p.Options()) {
 * 			diags = append(diags, getAdditionalJSSyntacticDiagnostics(file, p.Options())...)
 * 		}
 * 		return diags
 * 	})
 * }
 */
export function Program_GetSyntacticDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  return Program_collectDiagnostics(receiver, ctx, sourceFile, false as bool, (_, file) => {
    let diags = Concatenate(SourceFile_Diagnostics(file), SourceFile_JSDiagnostics(file));
    if (IsSourceFileJS(file) && !IsCheckJSEnabledForFile(file, Program_Options(receiver))) {
      diags = Concatenate(diags, getAdditionalJSSyntacticDiagnostics(file, Program_Options(receiver)));
    }
    return diags;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::getAdditionalJSSyntacticDiagnostics","kind":"func","status":"implemented","sigHash":"4cc134e32ccd6eb365106c7b13be731a4c16d12b9df6e3157876d7e86a0987a1"}
 *
 * Go source:
 * func getAdditionalJSSyntacticDiagnostics(file *ast.SourceFile, options *core.CompilerOptions) []*ast.Diagnostic {
 * 	if options.ExperimentalDecorators.IsTrue() {
 * 		return nil
 * 	}
 * 	var diags []*ast.Diagnostic
 * 	// Parameter decorators are only valid with experimentalDecorators. Without it,
 * 	// the checker would report this, but the checker doesn't run on unchecked JS files.
 * 	var walk ast.Visitor
 * 	walk = func(node *ast.Node) bool {
 * 		if node.SubtreeFacts()&ast.SubtreeContainsDecorators == 0 {
 * 			return false
 * 		}
 * 		if node.Kind == ast.KindParameter && ast.HasDecorators(node) {
 * 			decorator := core.Find(node.ModifierNodes(), ast.IsDecorator)
 * 			if decorator != nil {
 * 				diags = append(diags, ast.NewDiagnostic(file, decorator.Loc, diagnostics.Decorators_are_not_valid_here))
 * 			}
 * 		}
 * 		node.ForEachChild(walk)
 * 		return false
 * 	}
 * 	file.AsNode().ForEachChild(walk)
 * 	return diags
 * }
 */
export function getAdditionalJSSyntacticDiagnostics(file: GoPtr<SourceFile>, options: GoPtr<CompilerOptions>): GoSlice<GoPtr<Diagnostic>> {
  if (Tristate_IsTrue(options!.ExperimentalDecorators)) {
    return undefined!;
  }
  const diags: GoPtr<Diagnostic>[] = [];
  const walk: Visitor = (node) => {
    if ((Node_SubtreeFacts(node) & SubtreeContainsDecorators) === 0) {
      return false as bool;
    }
    if (node!.Kind === KindParameter && HasDecorators(node)) {
      const decorator = Find(Node_ModifierNodes(node) ?? [], IsDecorator, GoZeroPointer<Node>);
      if (decorator !== undefined) {
        diags.push(NewDiagnostic(file, decorator!.Loc, diagnostics.Decorators_are_not_valid_here));
      }
    }
    Node_ForEachChild(node, walk);
    return false as bool;
  };
  SourceFile_ForEachChild(file, walk);
  return diags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetBindDiagnostics","kind":"method","status":"implemented","sigHash":"095da506f9a3fd3269680f3ea12f04dfced3daec560c8cc8df2fe01d23a70933"}
 *
 * Go source:
 * func (p *Program) GetBindDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	if sourceFile != nil {
 * 		binder.BindSourceFile(sourceFile)
 * 	} else {
 * 		p.BindSourceFiles()
 * 	}
 * 	return p.collectDiagnostics(ctx, sourceFile, false /*concurrent* /, func(_ context.Context, file *ast.SourceFile) []*ast.Diagnostic {
 * 		return file.BindDiagnostics()
 * 	})
 * }
 */
export function Program_GetBindDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  if (sourceFile !== undefined) {
    BindSourceFile(sourceFile);
    recordBoundSourceFileExtensionFacts(receiver!.opts, sourceFile);
  } else {
    Program_BindSourceFiles(receiver);
  }
  return Program_collectDiagnostics(receiver, ctx, sourceFile, false as bool, (_, file) => {
    return SourceFile_BindDiagnostics(file);
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSemanticDiagnostics","kind":"method","status":"implemented","sigHash":"bcc981c426c3f57d04542f3263562ddee4d27f91f7f301bdb982d72820e92c2a"}
 *
 * Go source:
 * func (p *Program) GetSemanticDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	return p.collectCheckerDiagnostics(ctx, sourceFile, p.getSemanticDiagnosticsWithChecker)
 * }
 */
export function Program_GetSemanticDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  const diagnostics = Program_collectCheckerDiagnostics(receiver, ctx, sourceFile, Program_getSemanticDiagnosticsWithChecker.bind(undefined, receiver)) ?? [];
  const extensionDiagnostics = collectExtensionDiagnosticsForSourceFile(receiver!, sourceFile);
  if (extensionDiagnostics.length === 0) {
    return diagnostics;
  }
  return SortAndDeduplicateDiagnostics([...diagnostics, ...extensionDiagnostics]);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSemanticDiagnosticsWithoutNoEmitFiltering","kind":"method","status":"implemented","sigHash":"d3d9c2f85f878717309d4b733bc00728a9022c33d1c199c86ccdf25566f1b67a"}
 *
 * Go source:
 * func (p *Program) GetSemanticDiagnosticsWithoutNoEmitFiltering(ctx context.Context, sourceFiles []*ast.SourceFile) map[*ast.SourceFile][]*ast.Diagnostic {
 * 	allDiags := p.collectCheckerDiagnosticsFromFiles(ctx, sourceFiles, p.getBindAndCheckDiagnosticsWithChecker)
 * 	result := make(map[*ast.SourceFile][]*ast.Diagnostic, len(sourceFiles))
 * 	for i, diags := range allDiags {
 * 		result[sourceFiles[i]] = SortAndDeduplicateDiagnostics(diags)
 * 	}
 * 	return result
 * }
 */
export function Program_GetSemanticDiagnosticsWithoutNoEmitFiltering(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFiles: GoSlice<GoPtr<SourceFile>>): GoMap<GoPtr<SourceFile>, GoSlice<GoPtr<Diagnostic>>> {
  const allDiags = Program_collectCheckerDiagnosticsFromFiles(receiver, ctx, sourceFiles, Program_getBindAndCheckDiagnosticsWithChecker.bind(undefined, receiver));
  const result = new globalThis.Map<GoPtr<SourceFile>, GoSlice<GoPtr<Diagnostic>>>();
  for (let i = 0; i < allDiags.length; i++) {
    const file = sourceFiles[i];
    result.set(file, SortAndDeduplicateDiagnostics([...(allDiags[i] ?? []), ...collectExtensionDiagnosticsForSourceFile(receiver!, file)]));
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSuggestionDiagnostics","kind":"method","status":"implemented","sigHash":"90d9d4190153ef91a9d8c50bd06a034bfeb4aed45ba7b3c553be5c1f9519f7be"}
 *
 * Go source:
 * func (p *Program) GetSuggestionDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	return p.collectCheckerDiagnostics(ctx, sourceFile, p.getSuggestionDiagnosticsWithChecker)
 * }
 */
export function Program_GetSuggestionDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  return Program_collectCheckerDiagnostics(receiver, ctx, sourceFile, Program_getSuggestionDiagnosticsWithChecker.bind(undefined, receiver));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetProgramDiagnostics","kind":"method","status":"implemented","sigHash":"26d89878cad6bdc89a718a62296967d3f30a5323975dac05f14234c33e3559d5"}
 *
 * Go source:
 * func (p *Program) GetProgramDiagnostics() []*ast.Diagnostic {
 * 	return SortAndDeduplicateDiagnostics(core.Concatenate(
 * 		p.programDiagnostics,
 * 		p.includeProcessor.getDiagnostics(p).GetGlobalDiagnostics(),
 * 	))
 * }
 */
export function Program_GetProgramDiagnostics(receiver: GoPtr<Program>): GoSlice<GoPtr<Diagnostic>> {
  return SortAndDeduplicateDiagnostics(Concatenate(
    receiver!.programDiagnostics,
    DiagnosticsCollection_GetGlobalDiagnostics(includeProcessor_getDiagnostics(receiver!.__tsgoEmbedded0!.includeProcessor, receiver)),
  ));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetIncludeProcessorDiagnostics","kind":"method","status":"implemented","sigHash":"8f118bd3b19429cb32fc1f20ad63ecbc44b27028ee32d85d3862551c9d3fa44d"}
 *
 * Go source:
 * func (p *Program) GetIncludeProcessorDiagnostics(sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	if p.SkipTypeChecking(sourceFile, false) {
 * 		return nil
 * 	}
 * 	filtered, _ := p.getDiagnosticsWithPrecedingDirectives(sourceFile, p.includeProcessor.getDiagnostics(p).GetDiagnosticsForFile(sourceFile.FileName()))
 * 	return filtered
 * }
 */
export function Program_GetIncludeProcessorDiagnostics(receiver: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  if (Program_SkipTypeChecking(receiver, sourceFile, false as bool)) {
    return undefined!;
  }
  const [filtered] = Program_getDiagnosticsWithPrecedingDirectives(
    receiver,
    sourceFile,
    DiagnosticsCollection_GetDiagnosticsForFile(includeProcessor_getDiagnostics(receiver!.__tsgoEmbedded0!.includeProcessor, receiver), SourceFile_FileName(sourceFile)),
  );
  return filtered;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.SkipTypeChecking","kind":"method","status":"implemented","sigHash":"e1c9c4921b79fdb73618b7a2e06277fe7b8e0454477101d14845e9493a0ec692"}
 *
 * Go source:
 * func (p *Program) SkipTypeChecking(sourceFile *ast.SourceFile, ignoreNoCheck bool) bool {
 * 	return (!ignoreNoCheck && p.Options().NoCheck.IsTrue()) ||
 * 		p.Options().SkipLibCheck.IsTrue() && sourceFile.IsDeclarationFile ||
 * 		p.Options().SkipDefaultLibCheck.IsTrue() && p.IsSourceFileDefaultLibrary(sourceFile.Path()) ||
 * 		p.IsSourceFromProjectReference(sourceFile.Path()) ||
 * 		!p.canIncludeBindAndCheckDiagnostics(sourceFile)
 * }
 */
export function Program_SkipTypeChecking(receiver: GoPtr<Program>, sourceFile: GoPtr<SourceFile>, ignoreNoCheck: bool): bool {
  return (
    (!ignoreNoCheck && Tristate_IsTrue(Program_Options(receiver)!.NoCheck)) ||
    (Tristate_IsTrue(Program_Options(receiver)!.SkipLibCheck) && sourceFile!.IsDeclarationFile) ||
    (Tristate_IsTrue(Program_Options(receiver)!.SkipDefaultLibCheck) && Program_IsSourceFileDefaultLibrary(receiver, SourceFile_Path(sourceFile)!)) ||
    Program_IsSourceFromProjectReference(receiver, SourceFile_Path(sourceFile)!) ||
    !Program_canIncludeBindAndCheckDiagnostics(receiver, sourceFile)
  ) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.canIncludeBindAndCheckDiagnostics","kind":"method","status":"implemented","sigHash":"8276847e4a290cb8dae4937fae38b775db9b679ce669a5a26d3ae6ddd6893b68"}
 *
 * Go source:
 * func (p *Program) canIncludeBindAndCheckDiagnostics(sourceFile *ast.SourceFile) bool {
 * 	if sourceFile.CheckJsDirective != nil && !sourceFile.CheckJsDirective.Enabled {
 * 		return false
 * 	}
 * 
 * 	if sourceFile.ScriptKind == core.ScriptKindTS || sourceFile.ScriptKind == core.ScriptKindTSX || sourceFile.ScriptKind == core.ScriptKindExternal {
 * 		return true
 * 	}
 * 
 * 	isJS := sourceFile.ScriptKind == core.ScriptKindJS || sourceFile.ScriptKind == core.ScriptKindJSX
 * 	isCheckJS := isJS && ast.IsCheckJSEnabledForFile(sourceFile, p.Options())
 * 	isPlainJS := ast.IsPlainJSFile(sourceFile, p.Options().CheckJs)
 * 
 * 	// By default, only type-check .ts, .tsx, Deferred, plain JS, checked JS and External
 * 	// - plain JS: .js files with no // ts-check and checkJs: undefined
 * 	// - check JS: .js files with either // ts-check or checkJs: true
 * 	// - external: files that are added by plugins
 * 	return isPlainJS || isCheckJS || sourceFile.ScriptKind == core.ScriptKindDeferred
 * }
 */
export function Program_canIncludeBindAndCheckDiagnostics(receiver: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): bool {
  if (sourceFile!.CheckJsDirective !== undefined && !sourceFile!.CheckJsDirective!.Enabled) {
    return false as bool;
  }
  if (sourceFile!.ScriptKind === ScriptKindTS || sourceFile!.ScriptKind === ScriptKindTSX || sourceFile!.ScriptKind === ScriptKindExternal) {
    return true as bool;
  }
  const isJS = sourceFile!.ScriptKind === ScriptKindJS || sourceFile!.ScriptKind === ScriptKindJSX;
  const isCheckJS = isJS && IsCheckJSEnabledForFile(sourceFile, Program_Options(receiver));
  const isPlainJS = IsPlainJSFile(sourceFile, Program_Options(receiver)!.CheckJs);
  return (isPlainJS || isCheckJS || sourceFile!.ScriptKind === ScriptKindDeferred) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.getSourceFilesToEmit","kind":"method","status":"implemented","sigHash":"3c8a73c97308d3345d56635603b4df341f1b6e1e5cadfe2da4a5623c6bc9dbe5"}
 *
 * Go source:
 * func (p *Program) getSourceFilesToEmit(targetSourceFile *ast.SourceFile, forceDtsEmit bool) []*ast.SourceFile {
 * 	if targetSourceFile == nil && !forceDtsEmit {
 * 		p.sourceFilesToEmitOnce.Do(func() {
 * 			p.sourceFilesToEmit = getSourceFilesToEmit(p, nil, false)
 * 		})
 * 		return p.sourceFilesToEmit
 * 	}
 * 	return getSourceFilesToEmit(p, targetSourceFile, forceDtsEmit)
 * }
 */
export function Program_getSourceFilesToEmit(receiver: GoPtr<Program>, targetSourceFile: GoPtr<SourceFile>, forceDtsEmit: bool): GoSlice<GoPtr<SourceFile>> {
  if (targetSourceFile === undefined && !forceDtsEmit) {
    receiver!.sourceFilesToEmitOnce.Do(() => {
      receiver!.sourceFilesToEmit = getSourceFilesToEmit(Program_as_emitter_SourceFileMayBeEmittedHost(receiver), undefined, false as bool);
    });
    return receiver!.sourceFilesToEmit;
  }
  return getSourceFilesToEmit(Program_as_emitter_SourceFileMayBeEmittedHost(receiver), targetSourceFile, forceDtsEmit);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.verifyCompilerOptions","kind":"method","status":"implemented","sigHash":"077d344c33eac5f06e7ebc368fe85b0d94a968ec929fb31061adafdeadd171e1"}
 *
 * Go source:
 * func (p *Program) verifyCompilerOptions() {
 * 	options := p.Options()
 * 
 * 	sourceFile := core.Memoize(func() *ast.SourceFile {
 * 		configFile := p.opts.Config.ConfigFile
 * 		if configFile == nil {
 * 			return nil
 * 		}
 * 		return configFile.SourceFile
 * 	})
 * 
 * 	configFilePath := core.Memoize(func() string {
 * 		file := sourceFile()
 * 		if file != nil {
 * 			return file.FileName()
 * 		}
 * 		return ""
 * 	})
 * 
 * 	getCompilerOptionsPropertySyntax := core.Memoize(func() *ast.PropertyAssignment {
 * 		return tsoptions.ForEachTsConfigPropArray(sourceFile(), "compilerOptions", core.Identity)
 * 	})
 * 
 * 	getCompilerOptionsObjectLiteralSyntax := core.Memoize(func() *ast.ObjectLiteralExpression {
 * 		compilerOptionsProperty := getCompilerOptionsPropertySyntax()
 * 		if compilerOptionsProperty != nil &&
 * 			compilerOptionsProperty.Initializer != nil &&
 * 			ast.IsObjectLiteralExpression(compilerOptionsProperty.Initializer) {
 * 			return compilerOptionsProperty.Initializer.AsObjectLiteralExpression()
 * 		}
 * 		return nil
 * 	})
 * 
 * 	createOptionDiagnosticInObjectLiteralSyntax := func(objectLiteral *ast.ObjectLiteralExpression, onKey bool, key1 string, key2 string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 		diag := tsoptions.ForEachPropertyAssignment(objectLiteral, key1, func(property *ast.PropertyAssignment) *ast.Diagnostic {
 * 			return tsoptions.CreateDiagnosticForNodeInSourceFile(sourceFile(), core.IfElse(onKey, property.Name(), property.Initializer), message, args...)
 * 		}, key2)
 * 		if diag != nil {
 * 			p.programDiagnostics = append(p.programDiagnostics, diag)
 * 		}
 * 		return diag
 * 	}
 * 
 * 	createCompilerOptionsDiagnostic := func(message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 		compilerOptionsProperty := getCompilerOptionsPropertySyntax()
 * 		var diag *ast.Diagnostic
 * 		if compilerOptionsProperty != nil {
 * 			diag = tsoptions.CreateDiagnosticForNodeInSourceFile(sourceFile(), compilerOptionsProperty.Name(), message, args...)
 * 		} else {
 * 			diag = ast.NewCompilerDiagnostic(message, args...)
 * 		}
 * 		p.programDiagnostics = append(p.programDiagnostics, diag)
 * 		return diag
 * 	}
 * 
 * 	createDiagnosticForOption := func(onKey bool, option1 string, option2 string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 		diag := createOptionDiagnosticInObjectLiteralSyntax(getCompilerOptionsObjectLiteralSyntax(), onKey, option1, option2, message, args...)
 * 		if diag == nil {
 * 			diag = createCompilerOptionsDiagnostic(message, args...)
 * 		}
 * 		return diag
 * 	}
 * 
 * 	createDiagnosticForOptionName := func(message *diagnostics.Message, option1 string, option2 string, args ...any) {
 * 		newArgs := make([]any, 0, len(args)+2)
 * 		newArgs = append(newArgs, option1, option2)
 * 		newArgs = append(newArgs, args...)
 * 		createDiagnosticForOption(true /*onKey* /, option1, option2, message, newArgs...)
 * 	}
 * 
 * 	createOptionValueDiagnostic := func(option1 string, message *diagnostics.Message, args ...any) {
 * 		createDiagnosticForOption(false /*onKey* /, option1, "", message, args...)
 * 	}
 * 
 * 	createRemovedOptionDiagnostic := func(name string, value string, useInstead string) {
 * 		var message *diagnostics.Message
 * 		var args []any
 * 		if value == "" {
 * 			message = diagnostics.Option_0_has_been_removed_Please_remove_it_from_your_configuration
 * 			args = []any{name}
 * 		} else {
 * 			message = diagnostics.Option_0_1_has_been_removed_Please_remove_it_from_your_configuration
 * 			args = []any{name, value}
 * 		}
 * 
 * 		diag := createDiagnosticForOption(value == "", name, "", message, args...)
 * 		if useInstead != "" {
 * 			diag.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.Use_0_instead, useInstead))
 * 		}
 * 	}
 * 
 * 	// Removed in TS7
 * 
 * 	if options.BaseUrl != "" {
 * 		// BaseUrl will have been turned absolute by this point.
 * 		var useInstead string
 * 		if configFilePath() != "" {
 * 			relative := tspath.GetRelativePathFromFile(configFilePath(), options.BaseUrl, p.comparePathsOptions)
 * 			if !(strings.HasPrefix(relative, "./") || strings.HasPrefix(relative, "../")) {
 * 				relative = "./" + relative
 * 			}
 * 			suggestion := tspath.CombinePaths(relative, "*")
 * 			useInstead = fmt.Sprintf(`"paths": {"*": [%s]}`, core.Must(json.Marshal(suggestion)))
 * 		}
 * 		createRemovedOptionDiagnostic("baseUrl", "", useInstead)
 * 	}
 * 
 * 	if options.OutFile != "" {
 * 		createRemovedOptionDiagnostic("outFile", "", "")
 * 	}
 * 
 * 	if options.Target == core.ScriptTargetES5 {
 * 		createRemovedOptionDiagnostic("target", "ES5", "")
 * 	}
 * 
 * 	if options.Module == core.ModuleKindAMD {
 * 		createRemovedOptionDiagnostic("module", "AMD", "")
 * 	}
 * 	if options.Module == core.ModuleKindSystem {
 * 		createRemovedOptionDiagnostic("module", "System", "")
 * 	}
 * 	if options.Module == core.ModuleKindUMD {
 * 		createRemovedOptionDiagnostic("module", "UMD", "")
 * 	}
 * 
 * 	if options.ModuleResolution == core.ModuleResolutionKindClassic {
 * 		createRemovedOptionDiagnostic("moduleResolution", "Classic", "")
 * 	}
 * 
 * 	if options.AlwaysStrict.IsFalse() {
 * 		createRemovedOptionDiagnostic("alwaysStrict", "false", "")
 * 	}
 * 
 * 	if options.ESModuleInterop.IsFalse() {
 * 		createRemovedOptionDiagnostic("esModuleInterop", "false", "")
 * 	}
 * 
 * 	if options.AllowSyntheticDefaultImports.IsFalse() {
 * 		createRemovedOptionDiagnostic("allowSyntheticDefaultImports", "false", "")
 * 	}
 * 
 * 	if options.ModuleResolution == core.ModuleResolutionKindNode10 {
 * 		createRemovedOptionDiagnostic("moduleResolution", "node10", "")
 * 	}
 * 
 * 	if !options.DownlevelIteration.IsUnknown() {
 * 		createRemovedOptionDiagnostic("downlevelIteration", "", "")
 * 	}
 * 
 * 	if options.StrictPropertyInitialization.IsTrue() && !options.GetStrictOptionValue(options.StrictNullChecks) {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "strictPropertyInitialization", "strictNullChecks")
 * 	}
 * 	if options.ExactOptionalPropertyTypes.IsTrue() && !options.GetStrictOptionValue(options.StrictNullChecks) {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "exactOptionalPropertyTypes", "strictNullChecks")
 * 	}
 * 
 * 	if options.IsolatedDeclarations.IsTrue() {
 * 		if options.GetAllowJS() {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "isolatedDeclarations")
 * 		}
 * 		if !options.GetEmitDeclarations() {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "isolatedDeclarations", "declaration", "composite")
 * 		}
 * 	}
 * 
 * 	if options.InlineSourceMap.IsTrue() {
 * 		if options.SourceMap.IsTrue() {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap")
 * 		}
 * 		if options.MapRoot != "" {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap")
 * 		}
 * 	}
 * 
 * 	if options.Composite.IsTrue() {
 * 		if options.Declaration.IsFalse() {
 * 			createDiagnosticForOptionName(diagnostics.Composite_projects_may_not_disable_declaration_emit, "declaration", "")
 * 		}
 * 		if options.Incremental.IsFalse() {
 * 			createDiagnosticForOptionName(diagnostics.Composite_projects_may_not_disable_incremental_compilation, "declaration", "")
 * 		}
 * 	}
 * 
 * 	if options.TsBuildInfoFile == "" && options.Incremental.IsTrue() && options.ConfigFilePath == "" {
 * 		createCompilerOptionsDiagnostic(diagnostics.Option_incremental_is_only_valid_with_a_known_configuration_file_like_tsconfig_json_or_when_tsBuildInfoFile_is_explicitly_provided)
 * 	}
 * 
 * 	p.verifyProjectReferences()
 * 
 * 	if options.Composite.IsTrue() {
 * 		var rootPaths collections.Set[tspath.Path]
 * 		for _, fileName := range p.opts.Config.FileNames() {
 * 			rootPaths.Add(p.toPath(fileName))
 * 		}
 * 
 * 		for _, file := range p.files {
 * 			if sourceFileMayBeEmitted(file, p, false) && !rootPaths.Has(file.Path()) {
 * 				p.includeProcessor.addProcessingDiagnostic(&processingDiagnostic{
 * 					kind: processingDiagnosticKindExplainingFileInclude,
 * 					data: &includeExplainingDiagnostic{
 * 						file:    file.Path(),
 * 						message: diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern,
 * 						args:    []any{file.FileName(), configFilePath()},
 * 					},
 * 				})
 * 			}
 * 		}
 * 	}
 * 
 * 	forEachOptionPathsSyntax := func(callback func(*ast.PropertyAssignment) *ast.Diagnostic) *ast.Diagnostic {
 * 		return tsoptions.ForEachPropertyAssignment(getCompilerOptionsObjectLiteralSyntax(), "paths", callback)
 * 	}
 * 
 * 	createDiagnosticForOptionPaths := func(onKey bool, key string, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 		diag := forEachOptionPathsSyntax(func(pathProp *ast.PropertyAssignment) *ast.Diagnostic {
 * 			if ast.IsObjectLiteralExpression(pathProp.Initializer) {
 * 				return createOptionDiagnosticInObjectLiteralSyntax(pathProp.Initializer.AsObjectLiteralExpression(), onKey, key, "", message, args...)
 * 			}
 * 			return nil
 * 		})
 * 		if diag == nil {
 * 			diag = createCompilerOptionsDiagnostic(message, args...)
 * 		}
 * 		return diag
 * 	}
 * 
 * 	createDiagnosticForOptionPathKeyValue := func(key string, valueIndex int, message *diagnostics.Message, args ...any) *ast.Diagnostic {
 * 		diag := forEachOptionPathsSyntax(func(pathProp *ast.PropertyAssignment) *ast.Diagnostic {
 * 			if ast.IsObjectLiteralExpression(pathProp.Initializer) {
 * 				return tsoptions.ForEachPropertyAssignment(pathProp.Initializer.AsObjectLiteralExpression(), key, func(keyProps *ast.PropertyAssignment) *ast.Diagnostic {
 * 					initializer := keyProps.Initializer
 * 					if ast.IsArrayLiteralExpression(initializer) {
 * 						elements := initializer.ElementList()
 * 						if elements != nil && len(elements.Nodes) > valueIndex {
 * 							diag := tsoptions.CreateDiagnosticForNodeInSourceFile(sourceFile(), elements.Nodes[valueIndex], message, args...)
 * 							p.programDiagnostics = append(p.programDiagnostics, diag)
 * 							return diag
 * 						}
 * 					}
 * 					return nil
 * 				})
 * 			}
 * 			return nil
 * 		})
 * 		if diag == nil {
 * 			diag = createCompilerOptionsDiagnostic(message, args...)
 * 		}
 * 		return diag
 * 	}
 * 
 * 	for key, value := range options.Paths.Entries() {
 * 		// !!! This code does not handle cases where where the path mappings have the wrong types,
 * 		// as that information is mostly lost during the parsing process.
 * 		if !hasZeroOrOneAsteriskCharacter(key) {
 * 			createDiagnosticForOptionPaths(true /*onKey* /, key, diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, key)
 * 		}
 * 		if value == nil {
 * 			createDiagnosticForOptionPaths(false /*onKey* /, key, diagnostics.Substitutions_for_pattern_0_should_be_an_array, key)
 * 		} else if len(value) == 0 {
 * 			createDiagnosticForOptionPaths(false /*onKey* /, key, diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array, key)
 * 		}
 * 		for i, subst := range value {
 * 			if !hasZeroOrOneAsteriskCharacter(subst) {
 * 				createDiagnosticForOptionPathKeyValue(key, i, diagnostics.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character, subst, key)
 * 			}
 * 			if !tspath.PathIsRelative(subst) && !tspath.PathIsAbsolute(subst) {
 * 				createDiagnosticForOptionPathKeyValue(key, i, diagnostics.Non_relative_paths_are_not_allowed_Did_you_forget_a_leading_Slash)
 * 			}
 * 		}
 * 	}
 * 
 * 	if options.SourceMap.IsFalseOrUnknown() && options.InlineSourceMap.IsFalseOrUnknown() {
 * 		if options.InlineSources.IsTrue() {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "inlineSources", "")
 * 		}
 * 		if options.SourceRoot != "" {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "sourceRoot", "")
 * 		}
 * 	}
 * 
 * 	if options.MapRoot != "" && !(options.SourceMap.IsTrue() || options.DeclarationMap.IsTrue()) {
 * 		// Error to specify --mapRoot without --sourcemap
 * 		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "mapRoot", "sourceMap", "declarationMap")
 * 	}
 * 
 * 	if options.DeclarationDir != "" {
 * 		if !options.GetEmitDeclarations() {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationDir", "declaration", "composite")
 * 		}
 * 	}
 * 
 * 	if options.DeclarationMap.IsTrue() && !options.GetEmitDeclarations() {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationMap", "declaration", "composite")
 * 	}
 * 
 * 	if options.Lib != nil && options.NoLib.IsTrue() {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "lib", "noLib")
 * 	}
 * 
 * 	if options.IsolatedModules.IsTrue() || options.VerbatimModuleSyntax.IsTrue() {
 * 		if options.PreserveConstEnums.IsFalse() {
 * 			createDiagnosticForOptionName(diagnostics.Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled, core.IfElse(options.VerbatimModuleSyntax.IsTrue(), "verbatimModuleSyntax", "isolatedModules"), "preserveConstEnums")
 * 		}
 * 	}
 * 
 * 	if options.OutDir != "" ||
 * 		options.RootDir != "" ||
 * 		options.SourceRoot != "" ||
 * 		options.MapRoot != "" ||
 * 		(options.GetEmitDeclarations() && options.DeclarationDir != "") {
 * 		// !!! sheetal checkSourceFilesBelongToPath - for root Dir and configFile - explaining why file is in the program
 * 		dir := p.CommonSourceDirectory()
 * 		if options.OutDir != "" && dir == "" && core.Some(p.files, func(f *ast.SourceFile) bool { return tspath.GetRootLength(f.FileName()) > 1 }) {
 * 			createDiagnosticForOptionName(diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files, "outDir", "")
 * 		}
 * 	}
 * 
 * 	if !options.NoEmit.IsTrue() &&
 * 		!options.Composite.IsTrue() &&
 * 		options.RootDir == "" &&
 * 		options.ConfigFilePath != "" &&
 * 		(options.OutDir != "" ||
 * 			(options.GetEmitDeclarations() && options.DeclarationDir != "") ||
 * 			options.OutFile != "") {
 * 		// Check if rootDir inferred changed and issue diagnostic
 * 		dir := p.CommonSourceDirectory()
 * 		var emittedFiles []string
 * 		for _, file := range p.files {
 * 			if !file.IsDeclarationFile && sourceFileMayBeEmitted(file, p, false) {
 * 				emittedFiles = append(emittedFiles, file.FileName())
 * 			}
 * 		}
 * 		dir59 := outputpaths.GetComputedCommonSourceDirectory(emittedFiles, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * 		if dir59 != "" && tspath.GetCanonicalFileName(dir, p.UseCaseSensitiveFileNames()) != tspath.GetCanonicalFileName(dir59, p.UseCaseSensitiveFileNames()) {
 * 			// change in layout
 * 			var option1 string
 * 			if options.OutFile != "" {
 * 				option1 = "outFile"
 * 			} else if options.OutDir != "" {
 * 				option1 = "outDir"
 * 			} else {
 * 				option1 = "declarationDir"
 * 			}
 * 			var option2 string
 * 			if options.OutFile == "" && options.OutDir != "" {
 * 				option2 = "declarationDir"
 * 			}
 * 			diag := createDiagnosticForOption(
 * 				true, /*onKey* /
 * 				option1,
 * 				option2,
 * 				diagnostics.The_common_source_directory_of_0_is_1_The_rootDir_setting_must_be_explicitly_set_to_this_or_another_path_to_adjust_your_output_s_file_layout,
 * 				tspath.GetBaseFileName(options.ConfigFilePath),
 * 				tspath.GetRelativePathFromFile(options.ConfigFilePath, dir59, p.comparePathsOptions),
 * 			)
 * 			diag.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.Visit_https_Colon_Slash_Slashaka_ms_Slashts6_for_migration_information))
 * 		}
 * 	}
 * 
 * 	if options.CheckJs.IsTrue() && !options.GetAllowJS() {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "checkJs", "allowJs")
 * 	}
 * 
 * 	if options.EmitDeclarationOnly.IsTrue() {
 * 		if !options.GetEmitDeclarations() {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "emitDeclarationOnly", "declaration", "composite")
 * 		}
 * 	}
 * 
 * 	if options.EmitDecoratorMetadata.IsTrue() && options.ExperimentalDecorators.IsFalseOrUnknown() {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators")
 * 	}
 * 
 * 	if options.JsxFactory != "" {
 * 		if options.ReactNamespace != "" {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "reactNamespace", "jsxFactory")
 * 		}
 * 		if options.Jsx == core.JsxEmitReactJSX || options.Jsx == core.JsxEmitReactJSXDev {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFactory", options.Jsx.String())
 * 		}
 * 		if parser.ParseIsolatedEntityName(options.JsxFactory) == nil {
 * 			createOptionValueDiagnostic("jsxFactory", diagnostics.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name, options.JsxFactory)
 * 		}
 * 	} else if options.ReactNamespace != "" && !scanner.IsIdentifierText(options.ReactNamespace, core.LanguageVariantStandard) {
 * 		createOptionValueDiagnostic("reactNamespace", diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier, options.ReactNamespace)
 * 	}
 * 
 * 	if options.JsxFragmentFactory != "" {
 * 		if options.JsxFactory == "" {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "jsxFragmentFactory", "jsxFactory")
 * 		}
 * 		if options.Jsx == core.JsxEmitReactJSX || options.Jsx == core.JsxEmitReactJSXDev {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFragmentFactory", options.Jsx.String())
 * 		}
 * 		if parser.ParseIsolatedEntityName(options.JsxFragmentFactory) == nil {
 * 			createOptionValueDiagnostic("jsxFragmentFactory", diagnostics.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name, options.JsxFragmentFactory)
 * 		}
 * 	}
 * 
 * 	if options.ReactNamespace != "" {
 * 		if options.Jsx == core.JsxEmitReactJSX || options.Jsx == core.JsxEmitReactJSXDev {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "reactNamespace", options.Jsx.String())
 * 		}
 * 	}
 * 
 * 	if options.JsxImportSource != "" {
 * 		if options.Jsx == core.JsxEmitReact {
 * 			createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxImportSource", options.Jsx.String())
 * 		}
 * 	}
 * 
 * 	moduleKind := options.GetEmitModuleKind()
 * 
 * 	if options.AllowImportingTsExtensions.IsTrue() && !(options.NoEmit.IsTrue() || options.EmitDeclarationOnly.IsTrue() || options.RewriteRelativeImportExtensions.IsTrue()) {
 * 		createOptionValueDiagnostic("allowImportingTsExtensions", diagnostics.Option_allowImportingTsExtensions_can_only_be_used_when_one_of_noEmit_emitDeclarationOnly_or_rewriteRelativeImportExtensions_is_set)
 * 	}
 * 
 * 	moduleResolution := options.GetModuleResolutionKind()
 * 	if options.ResolvePackageJsonExports.IsTrue() && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution) {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonExports", "")
 * 	}
 * 	if options.ResolvePackageJsonImports.IsTrue() && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution) {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonImports", "")
 * 	}
 * 	if options.CustomConditions != nil && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution) {
 * 		createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "customConditions", "")
 * 	}
 * 
 * 	if moduleResolution == core.ModuleResolutionKindBundler && !emitModuleKindIsNonNodeESM(moduleKind) && moduleKind != core.ModuleKindPreserve && moduleKind != core.ModuleKindCommonJS {
 * 		createOptionValueDiagnostic("moduleResolution", diagnostics.Option_0_can_only_be_used_when_module_is_set_to_preserve_commonjs_or_es2015_or_later, "bundler")
 * 	}
 * 
 * 	if core.ModuleKindNode16 <= moduleKind && moduleKind <= core.ModuleKindNodeNext &&
 * 		!(core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext) {
 * 		moduleKindName := moduleKind.String()
 * 		var moduleResolutionName string
 * 		if v, ok := core.ModuleKindToModuleResolutionKind[moduleKind]; ok {
 * 			moduleResolutionName = v.String()
 * 		} else {
 * 			moduleResolutionName = "Node16"
 * 		}
 * 		createOptionValueDiagnostic("moduleResolution", diagnostics.Option_moduleResolution_must_be_set_to_0_or_left_unspecified_when_option_module_is_set_to_1, moduleResolutionName, moduleKindName)
 * 	} else if core.ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= core.ModuleResolutionKindNodeNext &&
 * 		!(core.ModuleKindNode16 <= moduleKind && moduleKind <= core.ModuleKindNodeNext) {
 * 		moduleResolutionName := moduleResolution.String()
 * 		createOptionValueDiagnostic("module", diagnostics.Option_module_must_be_set_to_0_when_option_moduleResolution_is_set_to_1, moduleResolutionName, moduleResolutionName)
 * 	}
 * 
 * 	// !!! The below needs filesByName, which is not equivalent to p.filesByPath.
 * 
 * 	// If the emit is enabled make sure that every output file is unique and not overwriting any of the input files
 * 	if !options.NoEmit.IsTrue() && !options.SuppressOutputPathCheck.IsTrue() {
 * 		var emitFilesSeen collections.Set[string]
 * 
 * 		// Verify that all the emit files are unique and don't overwrite input files
 * 		verifyEmitFilePath := func(emitFileName string) {
 * 			if emitFileName != "" {
 * 				emitFilePath := p.toPath(emitFileName)
 * 				// Report error if the output overwrites input file
 * 				if _, ok := p.filesByPath[emitFilePath]; ok {
 * 					diag := ast.NewCompilerDiagnostic(diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, emitFileName)
 * 					if configFilePath() == "" {
 * 						// The program is from either an inferred project or an external project
 * 						diag.AddMessageChain(ast.NewCompilerDiagnostic(diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig))
 * 					}
 * 					p.blockEmittingOfFile(emitFileName, diag)
 * 				}
 * 
 * 				var emitFileKey string
 * 				if !p.Host().FS().UseCaseSensitiveFileNames() {
 * 					emitFileKey = tspath.ToFileNameLowerCase(string(emitFilePath))
 * 				} else {
 * 					emitFileKey = string(emitFilePath)
 * 				}
 * 
 * 				// Report error if multiple files write into same file
 * 				if emitFilesSeen.Has(emitFileKey) {
 * 					// Already seen the same emit file - report error
 * 					p.blockEmittingOfFile(emitFileName, ast.NewCompilerDiagnostic(diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, emitFileName))
 * 				} else {
 * 					emitFilesSeen.Add(emitFileKey)
 * 				}
 * 			}
 * 		}
 * 
 * 		outputpaths.ForEachEmittedFile(p, options, func(emitFileNames *outputpaths.OutputPaths, sourceFile *ast.SourceFile) bool {
 * 			verifyEmitFilePath(emitFileNames.JsFilePath())
 * 			verifyEmitFilePath(emitFileNames.SourceMapFilePath())
 * 			verifyEmitFilePath(emitFileNames.DeclarationFilePath())
 * 			verifyEmitFilePath(emitFileNames.DeclarationMapPath())
 * 			return false
 * 		}, p.getSourceFilesToEmit(nil, false), false)
 * 		verifyEmitFilePath(p.opts.Config.GetBuildInfoFileName())
 * 	}
 * }
 */
export function Program_verifyCompilerOptions(receiver: GoPtr<Program>): void {
  const options = Program_Options(receiver);

  const sourceFile = Memoize(() => {
    const configFile = receiver!.opts.Config!.ConfigFile;
    if (configFile === undefined) {
      return undefined as GoPtr<import("../ast/ast.js").SourceFile>;
    }
    return configFile!.SourceFile;
  }, GoZeroPointer<SourceFile>);

  const configFilePath = Memoize(() => {
    const file = sourceFile!();
    if (file !== undefined) {
      return SourceFile_FileName(file);
    }
    return "";
  }, GoZeroString);

  const getCompilerOptionsPropertySyntax = Memoize(() => {
    return ForEachTsConfigPropArray(sourceFile!(), "compilerOptions", (property) => GoValueRef(property!));
  }, GoZeroRef<PropertyAssignment>);

  const getCompilerOptionsObjectLiteralSyntax = Memoize((): GoPtr<ObjectLiteralExpression> | undefined => {
    const compilerOptionsProperty = getCompilerOptionsPropertySyntax!();
    if (compilerOptionsProperty !== undefined &&
        compilerOptionsProperty!.v.Initializer !== undefined &&
        IsObjectLiteralExpression(compilerOptionsProperty!.v.Initializer)) {
      return AsObjectLiteralExpression(compilerOptionsProperty!.v.Initializer!);
    }
    return undefined;
  }, GoZeroPointer<ObjectLiteralExpression>);

  const createOptionDiagnosticInObjectLiteralSyntax = (objectLiteral: GoPtr<ObjectLiteralExpression>, onKey: bool, key1: string, key2: string, message: GoPtr<Message>, ...args: unknown[]): GoPtr<Diagnostic> => {
    const diag = ForEachPropertyAssignment<Diagnostic>(objectLiteral, key1, (property) => {
      return GoValueRef(CreateDiagnosticForNodeInSourceFile(sourceFile!()!, onKey ? NamedMemberBase_Name(property) : property!.Initializer, message, ...args)!);
    }, key2);
    if (diag !== undefined) {
      receiver!.programDiagnostics = [...receiver!.programDiagnostics!, diag!.v];
    }
    return diag?.v;
  };

  const createCompilerOptionsDiagnostic = (message: GoPtr<Message>, ...args: unknown[]): GoPtr<Diagnostic> => {
    const compilerOptionsProperty = getCompilerOptionsPropertySyntax!();
    let diag: GoPtr<Diagnostic>;
    if (compilerOptionsProperty !== undefined) {
      diag = CreateDiagnosticForNodeInSourceFile(sourceFile!()!, NamedMemberBase_Name(compilerOptionsProperty!.v), message, ...args);
    } else {
      diag = NewCompilerDiagnostic(message, ...args);
    }
    receiver!.programDiagnostics = [...receiver!.programDiagnostics, diag];
    return diag;
  };

  const createDiagnosticForOption = (onKey: bool, option1: string, option2: string, message: GoPtr<Message>, ...args: unknown[]): GoPtr<Diagnostic> => {
    let diag = createOptionDiagnosticInObjectLiteralSyntax(getCompilerOptionsObjectLiteralSyntax!(), onKey, option1, option2, message, ...args);
    if (diag === undefined) {
      diag = createCompilerOptionsDiagnostic(message, ...args);
    }
    return diag;
  };

  const createDiagnosticForOptionName = (message: GoPtr<Message>, option1: string, option2: string, ...args: unknown[]): void => {
    createDiagnosticForOption(true as bool, option1, option2, message, option1, option2, ...args);
  };

  const createOptionValueDiagnostic = (option1: string, message: GoPtr<Message>, ...args: unknown[]): void => {
    createDiagnosticForOption(false as bool, option1, "", message, ...args);
  };

  const createRemovedOptionDiagnostic = (name: string, value: string, useInstead: string): void => {
    let message: GoPtr<Message>;
    let args: unknown[];
    if (value === "") {
      message = diagnostics.Option_0_has_been_removed_Please_remove_it_from_your_configuration;
      args = [name];
    } else {
      message = diagnostics.Option_0_1_has_been_removed_Please_remove_it_from_your_configuration;
      args = [name, value];
    }
    const diag = createDiagnosticForOption(value === "", name, "", message, ...args);
    if (useInstead !== "") {
      Diagnostic_AddMessageChain(diag, NewCompilerDiagnostic(diagnostics.Use_0_instead, useInstead));
    }
  };

  if (options!.BaseUrl !== "") {
    let useInstead = "";
    if (configFilePath!() !== "") {
      let relative = GetRelativePathFromFile(configFilePath!(), options!.BaseUrl, receiver!.comparePathsOptions);
      if (!relative.startsWith("./") && !relative.startsWith("../")) {
        relative = "./" + relative;
      }
      const suggestion = CombinePaths(relative, "*");
      useInstead = `"paths": {"*": [${globalThis.JSON.stringify(suggestion)}]}`;
    }
    createRemovedOptionDiagnostic("baseUrl", "", useInstead);
  }

  if (options!.OutFile !== "") {
    createRemovedOptionDiagnostic("outFile", "", "");
  }

  if (options!.Target === 1 /* ScriptTargetES5 */) {
    createRemovedOptionDiagnostic("target", "ES5", "");
  }

  if (options!.Module === 2 /* ModuleKindAMD */) {
    createRemovedOptionDiagnostic("module", "AMD", "");
  }
  if (options!.Module === 4 /* ModuleKindSystem */) {
    createRemovedOptionDiagnostic("module", "System", "");
  }
  if (options!.Module === 3 /* ModuleKindUMD */) {
    createRemovedOptionDiagnostic("module", "UMD", "");
  }

  if (options!.ModuleResolution === 1 /* ModuleResolutionKindClassic */) {
    createRemovedOptionDiagnostic("moduleResolution", "Classic", "");
  }

  if (Tristate_IsFalse(options!.AlwaysStrict)) {
    createRemovedOptionDiagnostic("alwaysStrict", "false", "");
  }
  if (Tristate_IsFalse(options!.ESModuleInterop)) {
    createRemovedOptionDiagnostic("esModuleInterop", "false", "");
  }
  if (Tristate_IsFalse(options!.AllowSyntheticDefaultImports)) {
    createRemovedOptionDiagnostic("allowSyntheticDefaultImports", "false", "");
  }
  if (options!.ModuleResolution === 2 /* ModuleResolutionKindNode10 */) {
    createRemovedOptionDiagnostic("moduleResolution", "node10", "");
  }
  if (options!.DownlevelIteration !== TSUnknown) {
    createRemovedOptionDiagnostic("downlevelIteration", "", "");
  }

  if (Tristate_IsTrue(options!.StrictPropertyInitialization) && !CompilerOptions_GetStrictOptionValue(options, options!.StrictNullChecks)) {
    createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "strictPropertyInitialization", "strictNullChecks");
  }
  if (Tristate_IsTrue(options!.ExactOptionalPropertyTypes) && !CompilerOptions_GetStrictOptionValue(options, options!.StrictNullChecks)) {
    createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "exactOptionalPropertyTypes", "strictNullChecks");
  }

  if (Tristate_IsTrue(options!.IsolatedDeclarations)) {
    if (CompilerOptions_GetAllowJS(options)) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "allowJs", "isolatedDeclarations");
    }
    if (!CompilerOptions_GetEmitDeclarations(options)) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "isolatedDeclarations", "declaration", "composite");
    }
  }

  if (Tristate_IsTrue(options!.InlineSourceMap)) {
    if (Tristate_IsTrue(options!.SourceMap)) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "sourceMap", "inlineSourceMap");
    }
    if (options!.MapRoot !== "") {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "mapRoot", "inlineSourceMap");
    }
  }

  if (Tristate_IsTrue(options!.Composite)) {
    if (Tristate_IsFalse(options!.Declaration)) {
      createDiagnosticForOptionName(diagnostics.Composite_projects_may_not_disable_declaration_emit, "declaration", "");
    }
    if (Tristate_IsFalse(options!.Incremental)) {
      createDiagnosticForOptionName(diagnostics.Composite_projects_may_not_disable_incremental_compilation, "declaration", "");
    }
  }

  if (options!.TsBuildInfoFile === "" && Tristate_IsTrue(options!.Incremental) && options!.ConfigFilePath === "") {
    createCompilerOptionsDiagnostic(diagnostics.Option_incremental_is_only_valid_with_a_known_configuration_file_like_tsconfig_json_or_when_tsBuildInfoFile_is_explicitly_provided);
  }

  Program_verifyProjectReferences(receiver);

  if (Tristate_IsTrue(options!.Composite)) {
    const rootPaths: Set<Path> = { M: new globalThis.Map() };
    for (const fileName of ParsedCommandLine_FileNames(receiver!.opts.Config)) {
      Set_Add(rootPaths, Program_toPath(receiver, fileName), GoStringKey);
    }

    for (const file of receiver!.__tsgoEmbedded0!.files) {
      if (sourceFileMayBeEmitted(file, Program_as_emitter_SourceFileMayBeEmittedHost(receiver), false as bool) && !Set_Has(rootPaths, SourceFile_Path(file)!)) {
        includeProcessor_addProcessingDiagnostic(receiver!.__tsgoEmbedded0!.includeProcessor, {
          kind: processingDiagnosticKindExplainingFileInclude,
          data: {
            file: SourceFile_Path(file)!,
            message: diagnostics.File_0_is_not_listed_within_the_file_list_of_project_1_Projects_must_list_all_files_or_use_an_include_pattern,
            args: [SourceFile_FileName(file), configFilePath!()],
          } as includeExplainingDiagnostic,
        });
      }
    }
  }

  const forEachOptionPathsSyntax = (callback: (p: GoPtr<PropertyAssignment>) => GoPtr<Diagnostic>): GoPtr<Diagnostic> => {
    return ForEachPropertyAssignment<Diagnostic>(getCompilerOptionsObjectLiteralSyntax!(), "paths", (property) => {
      const diagnostic = callback(property);
      return diagnostic === undefined ? undefined : GoValueRef(diagnostic);
    })?.v;
  };

  const createDiagnosticForOptionPaths = (onKey: bool, key: string, message: GoPtr<Message>, ...args: unknown[]): GoPtr<Diagnostic> => {
    let diag = forEachOptionPathsSyntax((pathProp) => {
      if (IsObjectLiteralExpression(pathProp!.Initializer)) {
        return createOptionDiagnosticInObjectLiteralSyntax(AsObjectLiteralExpression(pathProp!.Initializer!), onKey, key, "", message, ...args);
      }
      return undefined;
    });
    if (diag === undefined) {
      diag = createCompilerOptionsDiagnostic(message, ...args);
    }
    return diag;
  };

  const createDiagnosticForOptionPathKeyValue = (key: string, valueIndex: int, message: GoPtr<Message>, ...args: unknown[]): GoPtr<Diagnostic> => {
    let diag = forEachOptionPathsSyntax((pathProp) => {
      if (IsObjectLiteralExpression(pathProp!.Initializer)) {
        return ForEachPropertyAssignment<Diagnostic>(AsObjectLiteralExpression(pathProp!.Initializer!), key, (keyProps) => {
          const initializer = keyProps!.Initializer;
          if (IsArrayLiteralExpression(initializer)) {
            const elements = AsArrayLiteralExpression(initializer!)!.Elements;
            if (elements !== undefined && elements!.Nodes.length > valueIndex) {
              const d = CreateDiagnosticForNodeInSourceFile(sourceFile!()!, elements!.Nodes[valueIndex], message, ...args);
              receiver!.programDiagnostics = [...receiver!.programDiagnostics, d];
              return GoValueRef(d!);
            }
          }
          return undefined;
        })?.v;
      }
      return undefined;
    });
    if (diag === undefined) {
      diag = createCompilerOptionsDiagnostic(message, ...args);
    }
    return diag;
  };

  OrderedMap_Entries(options!.Paths as GoPtr<import("../collections/ordered_map.js").OrderedMap<string, GoSlice<string>>>)!((key: string, value: GoSlice<string>): bool => {
    if (!hasZeroOrOneAsteriskCharacter(key)) {
      createDiagnosticForOptionPaths(true as bool, key, diagnostics.Pattern_0_can_have_at_most_one_Asterisk_character, key);
    }
    if (value === undefined) {
      createDiagnosticForOptionPaths(false as bool, key, diagnostics.Substitutions_for_pattern_0_should_be_an_array, key);
    } else if (value.length === 0) {
      createDiagnosticForOptionPaths(false as bool, key, diagnostics.Substitutions_for_pattern_0_shouldn_t_be_an_empty_array, key);
    }
    if (value !== undefined) {
      for (let i = 0; i < value.length; i++) {
        const subst = value[i]!;
        if (!hasZeroOrOneAsteriskCharacter(subst)) {
          createDiagnosticForOptionPathKeyValue(key, i, diagnostics.Substitution_0_in_pattern_1_can_have_at_most_one_Asterisk_character, subst, key);
        }
        if (!PathIsRelative(subst) && !PathIsAbsolute(subst)) {
          createDiagnosticForOptionPathKeyValue(key, i, diagnostics.Non_relative_paths_are_not_allowed_Did_you_forget_a_leading_Slash);
        }
      }
    }
    // Go `for ... range` iterates every entry; the Seq yield returns true to continue.
    return true as bool;
  });

  if (Tristate_IsFalseOrUnknown(options!.SourceMap) && Tristate_IsFalseOrUnknown(options!.InlineSourceMap)) {
    if (Tristate_IsTrue(options!.InlineSources)) {
      createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "inlineSources", "");
    }
    if (options!.SourceRoot !== "") {
      createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_either_option_inlineSourceMap_or_option_sourceMap_is_provided, "sourceRoot", "");
    }
  }

  if (options!.MapRoot !== "" && !(Tristate_IsTrue(options!.SourceMap) || Tristate_IsTrue(options!.DeclarationMap))) {
    createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "mapRoot", "sourceMap", "declarationMap");
  }

  if (options!.DeclarationDir !== "") {
    if (!CompilerOptions_GetEmitDeclarations(options)) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationDir", "declaration", "composite");
    }
  }

  if (Tristate_IsTrue(options!.DeclarationMap) && !CompilerOptions_GetEmitDeclarations(options)) {
    createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "declarationMap", "declaration", "composite");
  }

  if (options!.Lib !== undefined && Tristate_IsTrue(options!.NoLib)) {
    createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "lib", "noLib");
  }

  if (Tristate_IsTrue(options!.IsolatedModules) || Tristate_IsTrue(options!.VerbatimModuleSyntax)) {
    if (Tristate_IsFalse(options!.PreserveConstEnums)) {
      createDiagnosticForOptionName(
        diagnostics.Option_preserveConstEnums_cannot_be_disabled_when_0_is_enabled,
        Tristate_IsTrue(options!.VerbatimModuleSyntax) ? "verbatimModuleSyntax" : "isolatedModules",
        "preserveConstEnums",
      );
    }
  }

  if (options!.OutDir !== "" ||
      options!.RootDir !== "" ||
      options!.SourceRoot !== "" ||
      options!.MapRoot !== "" ||
      (CompilerOptions_GetEmitDeclarations(options) && options!.DeclarationDir !== "")) {
    const dir = Program_CommonSourceDirectory(receiver);
    if (options!.OutDir !== "" && dir === "" && Some(receiver!.__tsgoEmbedded0!.files, (f) => GetRootLength(SourceFile_FileName(f)) > 1)) {
      createDiagnosticForOptionName(diagnostics.Cannot_find_the_common_subdirectory_path_for_the_input_files, "outDir", "");
    }
  }

  if (!Tristate_IsTrue(options!.NoEmit) &&
      !Tristate_IsTrue(options!.Composite) &&
      options!.RootDir === "" &&
      options!.ConfigFilePath !== "" &&
      (options!.OutDir !== "" ||
        (CompilerOptions_GetEmitDeclarations(options) && options!.DeclarationDir !== "") ||
        options!.OutFile !== "")) {
    const dir = Program_CommonSourceDirectory(receiver);
    const emittedFiles: string[] = [];
    for (const file of receiver!.__tsgoEmbedded0!.files) {
      if (!file!.IsDeclarationFile && sourceFileMayBeEmitted(file, Program_as_emitter_SourceFileMayBeEmittedHost(receiver), false as bool)) {
        emittedFiles.push(SourceFile_FileName(file));
      }
    }
    const dir59 = GetComputedCommonSourceDirectory(emittedFiles, Program_GetCurrentDirectory(receiver), Program_UseCaseSensitiveFileNames(receiver));
    if (dir59 !== "" && GetCanonicalFileName(dir, Program_UseCaseSensitiveFileNames(receiver)) !== GetCanonicalFileName(dir59, Program_UseCaseSensitiveFileNames(receiver))) {
      let option1: string;
      if (options!.OutFile !== "") {
        option1 = "outFile";
      } else if (options!.OutDir !== "") {
        option1 = "outDir";
      } else {
        option1 = "declarationDir";
      }
      let option2 = "";
      if (options!.OutFile === "" && options!.OutDir !== "") {
        option2 = "declarationDir";
      }
      const diag = createDiagnosticForOption(
        true as bool,
        option1,
        option2,
        diagnostics.The_common_source_directory_of_0_is_1_The_rootDir_setting_must_be_explicitly_set_to_this_or_another_path_to_adjust_your_output_s_file_layout,
        GetBaseFileName(options!.ConfigFilePath),
        GetRelativePathFromFile(options!.ConfigFilePath, dir59, receiver!.comparePathsOptions),
      );
      Diagnostic_AddMessageChain(diag, NewCompilerDiagnostic(diagnostics.Visit_https_Colon_Slash_Slashaka_ms_Slashts6_for_migration_information));
    }
  }

  if (Tristate_IsTrue(options!.CheckJs) && !CompilerOptions_GetAllowJS(options)) {
    createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "checkJs", "allowJs");
  }

  if (Tristate_IsTrue(options!.EmitDeclarationOnly)) {
    if (!CompilerOptions_GetEmitDeclarations(options)) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1_or_option_2, "emitDeclarationOnly", "declaration", "composite");
    }
  }

  if (Tristate_IsTrue(options!.EmitDecoratorMetadata) && Tristate_IsFalseOrUnknown(options!.ExperimentalDecorators)) {
    createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "emitDecoratorMetadata", "experimentalDecorators");
  }

  if (options!.JsxFactory !== "") {
    if (options!.ReactNamespace !== "") {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_with_option_1, "reactNamespace", "jsxFactory");
    }
    if (options!.Jsx === JsxEmitReactJSX || options!.Jsx === JsxEmitReactJSXDev) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFactory", JsxEmit_String(options!.Jsx));
    }
    if (ParseIsolatedEntityName(options!.JsxFactory) === undefined) {
      createOptionValueDiagnostic("jsxFactory", diagnostics.Invalid_value_for_jsxFactory_0_is_not_a_valid_identifier_or_qualified_name, options!.JsxFactory);
    }
  } else if (options!.ReactNamespace !== "" && !IsIdentifierText(options!.ReactNamespace, 0 /* LanguageVariantStandard */)) {
    createOptionValueDiagnostic("reactNamespace", diagnostics.Invalid_value_for_reactNamespace_0_is_not_a_valid_identifier, options!.ReactNamespace);
  }

  if (options!.JsxFragmentFactory !== "") {
    if (options!.JsxFactory === "") {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_without_specifying_option_1, "jsxFragmentFactory", "jsxFactory");
    }
    if (options!.Jsx === JsxEmitReactJSX || options!.Jsx === JsxEmitReactJSXDev) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxFragmentFactory", JsxEmit_String(options!.Jsx));
    }
    if (ParseIsolatedEntityName(options!.JsxFragmentFactory) === undefined) {
      createOptionValueDiagnostic("jsxFragmentFactory", diagnostics.Invalid_value_for_jsxFragmentFactory_0_is_not_a_valid_identifier_or_qualified_name, options!.JsxFragmentFactory);
    }
  }

  if (options!.ReactNamespace !== "") {
    if (options!.Jsx === JsxEmitReactJSX || options!.Jsx === JsxEmitReactJSXDev) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "reactNamespace", JsxEmit_String(options!.Jsx));
    }
  }

  if (options!.JsxImportSource !== "") {
    if (options!.Jsx === JsxEmitReact) {
      createDiagnosticForOptionName(diagnostics.Option_0_cannot_be_specified_when_option_jsx_is_1, "jsxImportSource", JsxEmit_String(options!.Jsx));
    }
  }

  const moduleKind = CompilerOptions_GetEmitModuleKind(options);

  if (Tristate_IsTrue(options!.AllowImportingTsExtensions) && !(Tristate_IsTrue(options!.NoEmit) || Tristate_IsTrue(options!.EmitDeclarationOnly) || Tristate_IsTrue(options!.RewriteRelativeImportExtensions))) {
    createOptionValueDiagnostic("allowImportingTsExtensions", diagnostics.Option_allowImportingTsExtensions_can_only_be_used_when_one_of_noEmit_emitDeclarationOnly_or_rewriteRelativeImportExtensions_is_set);
  }

  const moduleResolution = CompilerOptions_GetModuleResolutionKind(options);
  if (Tristate_IsTrue(options!.ResolvePackageJsonExports) && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
    createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonExports", "");
  }
  if (Tristate_IsTrue(options!.ResolvePackageJsonImports) && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
    createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "resolvePackageJsonImports", "");
  }
  if (options!.CustomConditions !== undefined && !moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution)) {
    createDiagnosticForOptionName(diagnostics.Option_0_can_only_be_used_when_moduleResolution_is_set_to_node16_nodenext_or_bundler, "customConditions", "");
  }

  if (moduleResolution === ModuleResolutionKindBundler && !emitModuleKindIsNonNodeESM(moduleKind) && moduleKind !== ModuleKindPreserve && moduleKind !== ModuleKindCommonJS) {
    createOptionValueDiagnostic("moduleResolution", diagnostics.Option_0_can_only_be_used_when_module_is_set_to_preserve_commonjs_or_es2015_or_later, "bundler");
  }

  if (ModuleKindNode16 <= moduleKind && moduleKind <= ModuleKindNodeNext &&
      !(ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= ModuleResolutionKindNodeNext)) {
    const moduleKindName = ModuleKind_String(moduleKind);
    let moduleResolutionName: string;
    const v = ModuleKindToModuleResolutionKind.get(moduleKind);
    if (v !== undefined) {
      moduleResolutionName = ModuleResolutionKind_String(v);
    } else {
      moduleResolutionName = "Node16";
    }
    createOptionValueDiagnostic("moduleResolution", diagnostics.Option_moduleResolution_must_be_set_to_0_or_left_unspecified_when_option_module_is_set_to_1, moduleResolutionName, moduleKindName);
  } else if (ModuleResolutionKindNode16 <= moduleResolution && moduleResolution <= ModuleResolutionKindNodeNext &&
      !(ModuleKindNode16 <= moduleKind && moduleKind <= ModuleKindNodeNext)) {
    const moduleResolutionName = ModuleResolutionKind_String(moduleResolution);
    createOptionValueDiagnostic("module", diagnostics.Option_module_must_be_set_to_0_when_option_moduleResolution_is_set_to_1, moduleResolutionName, moduleResolutionName);
  }

  if (!Tristate_IsTrue(options!.NoEmit) && !Tristate_IsTrue(options!.SuppressOutputPathCheck)) {
    const emitFilesSeen: Set<string> = { M: new globalThis.Map() };

    const verifyEmitFilePath = (emitFileName: string): void => {
      if (emitFileName !== "") {
        const emitFilePath = Program_toPath(receiver, emitFileName);
        if (receiver!.__tsgoEmbedded0!.filesByPath.has(emitFilePath)) {
          const diag = NewCompilerDiagnostic(diagnostics.Cannot_write_file_0_because_it_would_overwrite_input_file, emitFileName);
          if (configFilePath!() === "") {
            Diagnostic_AddMessageChain(diag, NewCompilerDiagnostic(diagnostics.Adding_a_tsconfig_json_file_will_help_organize_projects_that_contain_both_TypeScript_and_JavaScript_files_Learn_more_at_https_Colon_Slash_Slashaka_ms_Slashtsconfig));
          }
          Program_blockEmittingOfFile(receiver, emitFileName, diag);
        }

        const emitFileKey = !Program_Host(receiver)!.FS()!.UseCaseSensitiveFileNames()
          ? ToFileNameLowerCase(emitFilePath)
          : emitFilePath;

        if (Set_Has(emitFilesSeen, emitFileKey)) {
          Program_blockEmittingOfFile(receiver, emitFileName, NewCompilerDiagnostic(diagnostics.Cannot_write_file_0_because_it_would_be_overwritten_by_multiple_input_files, emitFileName));
        } else {
          Set_Add(emitFilesSeen, emitFileKey, GoStringKey);
        }
      }
    };

    ForEachEmittedFile(Program_as_outputpaths_OutputPathsHost(receiver), options, (emitFileNames, _sourceFile) => {
      verifyEmitFilePath(OutputPaths_JsFilePath(emitFileNames));
      verifyEmitFilePath(OutputPaths_SourceMapFilePath(emitFileNames));
      verifyEmitFilePath(OutputPaths_DeclarationFilePath(emitFileNames));
      verifyEmitFilePath(OutputPaths_DeclarationMapPath(emitFileNames));
      return false as bool;
    }, Program_getSourceFilesToEmit(receiver, undefined, false as bool), false as bool);
    verifyEmitFilePath(ParsedCommandLine_GetBuildInfoFileName(receiver!.opts.Config));
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.blockEmittingOfFile","kind":"method","status":"implemented","sigHash":"c96c781237b1980acd22e79aaaa602327c78cb095740c5cc91ff83de3031b1d3"}
 *
 * Go source:
 * func (p *Program) blockEmittingOfFile(emitFileName string, diag *ast.Diagnostic) {
 * 	p.hasEmitBlockingDiagnostics.Add(p.toPath(emitFileName))
 * 	p.programDiagnostics = append(p.programDiagnostics, diag)
 * }
 */
export function Program_blockEmittingOfFile(receiver: GoPtr<Program>, emitFileName: string, diag: GoPtr<Diagnostic>): void {
  Set_Add(receiver!.hasEmitBlockingDiagnostics, Program_toPath(receiver, emitFileName), GoStringKey);
  receiver!.programDiagnostics = [...receiver!.programDiagnostics, diag];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IsEmitBlocked","kind":"method","status":"implemented","sigHash":"6bf019df57aa8ab727f7176b278d0e89eb0caa7b99bbf6d31eaaa712cd22c8cd"}
 *
 * Go source:
 * func (p *Program) IsEmitBlocked(emitFileName string) bool {
 * 	return p.hasEmitBlockingDiagnostics.Has(p.toPath(emitFileName))
 * }
 */
export function Program_IsEmitBlocked(receiver: GoPtr<Program>, emitFileName: string): bool {
  return Set_Has(receiver!.hasEmitBlockingDiagnostics, Program_toPath(receiver, emitFileName));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.verifyProjectReferences","kind":"method","status":"implemented","sigHash":"cb81aeefa8f159be6f8c0425d4919e3bc29189150aeff7a34a16c620dcc1b841"}
 *
 * Go source:
 * func (p *Program) verifyProjectReferences() {
 * 	buildInfoFileName := core.IfElse(!p.Options().SuppressOutputPathCheck.IsTrue(), p.opts.Config.GetBuildInfoFileName(), "")
 * 	createDiagnosticForReference := func(config *tsoptions.ParsedCommandLine, index int, message *diagnostics.Message, args ...any) {
 * 		diag := tsoptions.CreateDiagnosticAtReferenceSyntax(config, index, message, args...)
 * 		if diag == nil {
 * 			diag = ast.NewCompilerDiagnostic(message, args...)
 * 		}
 * 		p.programDiagnostics = append(p.programDiagnostics, diag)
 * 	}
 * 
 * 	p.RangeResolvedProjectReference(func(path tspath.Path, config *tsoptions.ParsedCommandLine, parent *tsoptions.ParsedCommandLine, index int) bool {
 * 		ref := parent.ProjectReferences()[index]
 * 		// !!! Deprecated in 5.0 and removed since 5.5
 * 		// verifyRemovedProjectReference(ref, parent, index);
 * 		if config == nil {
 * 			createDiagnosticForReference(parent, index, diagnostics.File_0_not_found, ref.Path)
 * 			return true
 * 		}
 * 		refOptions := config.CompilerOptions()
 * 		if !refOptions.Composite.IsTrue() || refOptions.NoEmit.IsTrue() {
 * 			if len(parent.FileNames()) > 0 {
 * 				if !refOptions.Composite.IsTrue() {
 * 					createDiagnosticForReference(parent, index, diagnostics.Referenced_project_0_must_have_setting_composite_Colon_true, ref.Path)
 * 				}
 * 				if refOptions.NoEmit.IsTrue() {
 * 					createDiagnosticForReference(parent, index, diagnostics.Referenced_project_0_may_not_disable_emit, ref.Path)
 * 				}
 * 			}
 * 		}
 * 		if buildInfoFileName != "" && buildInfoFileName == config.GetBuildInfoFileName() {
 * 			createDiagnosticForReference(parent, index, diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, buildInfoFileName, ref.Path)
 * 			p.hasEmitBlockingDiagnostics.Add(p.toPath(buildInfoFileName))
 * 		}
 * 		return true
 * 	})
 * }
 */
export function Program_verifyProjectReferences(receiver: GoPtr<Program>): void {
  const buildInfoFileName = !Tristate_IsTrue(Program_Options(receiver)!.SuppressOutputPathCheck) ? ParsedCommandLine_GetBuildInfoFileName(receiver!.opts.Config) : "";
  const createDiagnosticForReference = (config: GoPtr<ParsedCommandLine>, index: int, message: GoPtr<Message>, ...args: unknown[]): void => {
    let diag = CreateDiagnosticAtReferenceSyntax(config, index, message, ...args);
    if (diag === undefined) {
      diag = NewCompilerDiagnostic(message, ...args);
    }
    receiver!.programDiagnostics = [...receiver!.programDiagnostics, diag];
  };

  Program_RangeResolvedProjectReference(receiver, (path, config, parent, index) => {
    const ref = ParsedCommandLine_ProjectReferences(parent)![index];
    if (config === undefined) {
      createDiagnosticForReference(parent, index, diagnostics.File_0_not_found, ref!.Path);
      return true as bool;
    }
    const refOptions = ParsedCommandLine_CompilerOptions(config);
    if (!Tristate_IsTrue(refOptions!.Composite) || Tristate_IsTrue(refOptions!.NoEmit)) {
      if (ParsedCommandLine_FileNames(parent).length > 0) {
        if (!Tristate_IsTrue(refOptions!.Composite)) {
          createDiagnosticForReference(parent, index, diagnostics.Referenced_project_0_must_have_setting_composite_Colon_true, ref!.Path);
        }
        if (Tristate_IsTrue(refOptions!.NoEmit)) {
          createDiagnosticForReference(parent, index, diagnostics.Referenced_project_0_may_not_disable_emit, ref!.Path);
        }
      }
    }
    if (buildInfoFileName !== "" && buildInfoFileName === ParsedCommandLine_GetBuildInfoFileName(config)) {
      createDiagnosticForReference(parent, index, diagnostics.Cannot_write_file_0_because_it_will_overwrite_tsbuildinfo_file_generated_by_referenced_project_1, buildInfoFileName, ref!.Path);
      Set_Add(receiver!.hasEmitBlockingDiagnostics, Program_toPath(receiver, buildInfoFileName), GoStringKey);
    }
    return true as bool;
  });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::hasZeroOrOneAsteriskCharacter","kind":"func","status":"implemented","sigHash":"c85c0244ba29cdd35813a987e01f767e83e79446e0057021489cf72a833854f2"}
 *
 * Go source:
 * func hasZeroOrOneAsteriskCharacter(str string) bool {
 * 	seenAsterisk := false
 * 	for _, ch := range str {
 * 		if ch == '*' {
 * 			if !seenAsterisk {
 * 				seenAsterisk = true
 * 			} else {
 * 				// have already seen asterisk
 * 				return false
 * 			}
 * 		}
 * 	}
 * 	return true
 * }
 */
export function hasZeroOrOneAsteriskCharacter(str: string): bool {
  let seenAsterisk = false;
  for (const ch of str) {
    if (ch === "*") {
      if (!seenAsterisk) {
        seenAsterisk = true;
      } else {
        return false as bool;
      }
    }
  }
  return true as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::moduleResolutionSupportsPackageJsonExportsAndImports","kind":"func","status":"implemented","sigHash":"ffa431f5ea2177742a52f59fa43ad007a5d922958202a5c83fbc120f31406946"}
 *
 * Go source:
 * func moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution core.ModuleResolutionKind) bool {
 * 	return moduleResolution >= core.ModuleResolutionKindNode16 && moduleResolution <= core.ModuleResolutionKindNodeNext ||
 * 		moduleResolution == core.ModuleResolutionKindBundler
 * }
 */
export function moduleResolutionSupportsPackageJsonExportsAndImports(moduleResolution: ModuleResolutionKind): bool {
  return ((moduleResolution >= ModuleResolutionKindNode16 && moduleResolution <= ModuleResolutionKindNodeNext) ||
    moduleResolution === ModuleResolutionKindBundler) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::emitModuleKindIsNonNodeESM","kind":"func","status":"implemented","sigHash":"a0bbeac925b62f7bda274e6743864d9676bc62bd277f81481040659ca54e9daa"}
 *
 * Go source:
 * func emitModuleKindIsNonNodeESM(moduleKind core.ModuleKind) bool {
 * 	return moduleKind >= core.ModuleKindES2015 && moduleKind <= core.ModuleKindESNext
 * }
 */
export function emitModuleKindIsNonNodeESM(moduleKind: ModuleKind): bool {
  return (moduleKind >= ModuleKindES2015 && moduleKind <= ModuleKindESNext) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetGlobalDiagnostics","kind":"method","status":"implemented","sigHash":"af850db7e0012d4a166325e0bfc7157e77f96394fcf83ca8e2841cbe7899ce6e"}
 *
 * Go source:
 * func (p *Program) GetGlobalDiagnostics(ctx context.Context) []*ast.Diagnostic {
 * 	if len(p.files) == 0 {
 * 		return nil
 * 	}
 * 	if p.compilerCheckerPool != nil {
 * 		return p.compilerCheckerPool.GetGlobalDiagnostics()
 * 	}
 * 	// For external pools (project system), global diagnostics are collected
 * 	// incrementally as checkers are used, not via a bulk query.
 * 	return nil
 * }
 */
export function Program_GetGlobalDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>): GoSlice<GoPtr<Diagnostic>> {
  if (receiver!.__tsgoEmbedded0!.files.length === 0) {
    return undefined!;
  }
  if (receiver!.compilerCheckerPool !== undefined) {
    return checkerPool_GetGlobalDiagnostics(receiver!.compilerCheckerPool);
  }
  return undefined!;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetDeclarationDiagnostics","kind":"method","status":"implemented","sigHash":"c3917b6b1826f05f4b2c8ab649d4c7b1e31dc6031facb585157d92dde07a9fa4"}
 *
 * Go source:
 * func (p *Program) GetDeclarationDiagnostics(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	return p.collectDiagnostics(ctx, sourceFile, true /*concurrent* /, p.getDeclarationDiagnosticsForFile)
 * }
 */
export function Program_GetDeclarationDiagnostics(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  return Program_collectDiagnostics(receiver, ctx, sourceFile, true as bool, Program_getDeclarationDiagnosticsForFile.bind(undefined, receiver));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::FilterNoEmitSemanticDiagnostics","kind":"func","status":"implemented","sigHash":"5e6ed69f28095291eb89e0af0888bcd352e47d8aea82eadea016b77b2908aac5"}
 *
 * Go source:
 * func FilterNoEmitSemanticDiagnostics(diagnostics []*ast.Diagnostic, options *core.CompilerOptions) []*ast.Diagnostic {
 * 	if !options.NoEmit.IsTrue() {
 * 		return diagnostics
 * 	}
 * 	return core.Filter(diagnostics, func(d *ast.Diagnostic) bool {
 * 		return !d.SkippedOnNoEmit()
 * 	})
 * }
 */
export function FilterNoEmitSemanticDiagnostics(diagnostics: GoSlice<GoPtr<Diagnostic>>, options: GoPtr<CompilerOptions>): GoSlice<GoPtr<Diagnostic>> {
  if (!Tristate_IsTrue(options!.NoEmit)) {
    return diagnostics;
  }
  return Filter(diagnostics, (d) => !Diagnostic_SkippedOnNoEmit(d));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.getSemanticDiagnosticsWithChecker","kind":"method","status":"implemented","sigHash":"1b2927878abfa426f8e674d5a82927fbd22894eaf9d5357fa6d75d1c4659bcd1"}
 *
 * Go source:
 * func (p *Program) getSemanticDiagnosticsWithChecker(ctx context.Context, c *checker.Checker, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	return core.Concatenate(
 * 		FilterNoEmitSemanticDiagnostics(p.getBindAndCheckDiagnosticsWithChecker(ctx, c, sourceFile), p.Options()),
 * 		p.GetIncludeProcessorDiagnostics(sourceFile),
 * 	)
 * }
 */
export function Program_getSemanticDiagnosticsWithChecker(receiver: GoPtr<Program>, ctx: GoInterface<Context>, c: GoPtr<Checker>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  return Concatenate(
    FilterNoEmitSemanticDiagnostics(Program_getBindAndCheckDiagnosticsWithChecker(receiver, ctx, c, sourceFile), Program_Options(receiver)),
    Program_GetIncludeProcessorDiagnostics(receiver, sourceFile),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.getBindAndCheckDiagnosticsWithChecker","kind":"method","status":"implemented","sigHash":"58024f4d99ada564df7a23698f4cc8b6567aebe9250892ed517fdaae0f7ab8be"}
 *
 * Go source:
 * func (p *Program) getBindAndCheckDiagnosticsWithChecker(ctx context.Context, fileChecker *checker.Checker, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	compilerOptions := p.Options()
 * 	if p.SkipTypeChecking(sourceFile, false) {
 * 		return nil
 * 	}
 * 
 * 	// Checker creation forces binding, so bind diagnostics will be populated.
 * 	diags := slices.Clip(sourceFile.BindDiagnostics())
 * 	diags = append(diags, fileChecker.GetDiagnostics(ctx, sourceFile)...)
 * 
 * 	isPlainJS := ast.IsPlainJSFile(sourceFile, compilerOptions.CheckJs)
 * 	if isPlainJS {
 * 		return core.Filter(diags, func(d *ast.Diagnostic) bool {
 * 			return plainJSErrors.Has(d.Code())
 * 		})
 * 	}
 * 
 * 	isJS := sourceFile.ScriptKind == core.ScriptKindJS || sourceFile.ScriptKind == core.ScriptKindJSX
 * 	isCheckJS := isJS && ast.IsCheckJSEnabledForFile(sourceFile, compilerOptions)
 * 	if isCheckJS {
 * 		diags = append(diags, sourceFile.JSDocDiagnostics()...)
 * 	}
 * 
 * 	filtered, directivesByLine := p.getDiagnosticsWithPrecedingDirectives(sourceFile, diags)
 * 	for _, directive := range directivesByLine {
 * 		// Above we changed all used directive kinds to @ts-ignore, so any @ts-expect-error directives that
 * 		// remain are unused and thus errors.
 * 		if directive.Kind == ast.CommentDirectiveKindExpectError {
 * 			filtered = append(filtered, ast.NewDiagnostic(sourceFile, directive.Loc, diagnostics.Unused_ts_expect_error_directive))
 * 		}
 * 	}
 * 	return filtered
 * }
 */
export function Program_getBindAndCheckDiagnosticsWithChecker(receiver: GoPtr<Program>, ctx: GoInterface<Context>, fileChecker: GoPtr<Checker>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  const compilerOptions = Program_Options(receiver);
  if (Program_SkipTypeChecking(receiver, sourceFile, false as bool)) {
    return undefined!;
  }

  recordBoundSourceFileExtensionFacts(receiver!.opts, sourceFile);
  let diags: GoPtr<Diagnostic>[] = slices.Clip(SourceFile_BindDiagnostics(sourceFile)) ?? [];
  diags = [...diags, ...(Checker_GetDiagnostics(fileChecker, ctx, sourceFile) ?? [])];

  const isPlainJS = IsPlainJSFile(sourceFile, compilerOptions!.CheckJs);
  if (isPlainJS) {
    return Filter(diags, (d) => Set_Has(plainJSErrors as GoPtr<Set<int>>, Diagnostic_Code(d)));
  }

  const isJS = sourceFile!.ScriptKind === ScriptKindJS || sourceFile!.ScriptKind === ScriptKindJSX;
  const isCheckJS = isJS && IsCheckJSEnabledForFile(sourceFile, compilerOptions);
  if (isCheckJS) {
    diags = [...diags, ...(SourceFile_JSDocDiagnostics(sourceFile) ?? [])];
  }

  const [filtered, directivesByLine] = Program_getDiagnosticsWithPrecedingDirectives(receiver, sourceFile, diags);
  const result: GoPtr<Diagnostic>[] = [...filtered];
  if (directivesByLine !== undefined) {
    for (const [, directive] of directivesByLine) {
      if (directive.Kind === CommentDirectiveKindExpectError) {
        result.push(NewDiagnostic(sourceFile, directive.Loc, diagnostics.Unused_ts_expect_error_directive));
      }
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.getDiagnosticsWithPrecedingDirectives","kind":"method","status":"implemented","sigHash":"cfad4c54294ed6238befb391c0c1cdc142c1e9810460139fbd1e08b7d3ece4f3"}
 *
 * Go source:
 * func (p *Program) getDiagnosticsWithPrecedingDirectives(sourceFile *ast.SourceFile, diags []*ast.Diagnostic) ([]*ast.Diagnostic, map[int]ast.CommentDirective) {
 * 	if len(sourceFile.CommentDirectives) == 0 {
 * 		return diags, nil
 * 	}
 * 	// Build map of directives by line number
 * 	directivesByLine := make(map[int]ast.CommentDirective)
 * 	for _, directive := range sourceFile.CommentDirectives {
 * 		line := scanner.GetECMALineOfPosition(sourceFile, directive.Loc.Pos())
 * 		directivesByLine[line] = directive
 * 	}
 * 	lineStarts := scanner.GetECMALineStarts(sourceFile)
 * 	filtered := make([]*ast.Diagnostic, 0, len(diags))
 * 	for _, diagnostic := range diags {
 * 		ignoreDiagnostic := false
 * 		for line := scanner.ComputeLineOfPosition(lineStarts, diagnostic.Pos()) - 1; line >= 0; line-- {
 * 			// If line contains a @ts-ignore or @ts-expect-error directive, ignore this diagnostic and change
 * 			// the directive kind to @ts-ignore to indicate it was used.
 * 			if directive, ok := directivesByLine[line]; ok {
 * 				ignoreDiagnostic = true
 * 				directive.Kind = ast.CommentDirectiveKindIgnore
 * 				directivesByLine[line] = directive
 * 				break
 * 			}
 * 			// Stop searching backwards when we encounter a line that isn't blank or a comment.
 * 			if !isCommentOrBlankLine(sourceFile.Text(), int(lineStarts[line])) {
 * 				break
 * 			}
 * 		}
 * 		if !ignoreDiagnostic {
 * 			filtered = append(filtered, diagnostic)
 * 		}
 * 	}
 * 	return filtered, directivesByLine
 * }
 */
export function Program_getDiagnosticsWithPrecedingDirectives(receiver: GoPtr<Program>, sourceFile: GoPtr<SourceFile>, diags: GoSlice<GoPtr<Diagnostic>>): [GoSlice<GoPtr<Diagnostic>>, GoMap<int, CommentDirective>] {
  if (sourceFile!.CommentDirectives === undefined || sourceFile!.CommentDirectives.length === 0) {
    return [diags, undefined!];
  }
  const directivesByLine = new globalThis.Map<int, CommentDirective>();
  const sourceFileLike: SourceFileLike = { Text: () => SourceFile_Text(sourceFile), ECMALineMap: () => SourceFile_ECMALineMap(sourceFile) };
  for (const directive of sourceFile!.CommentDirectives) {
    const line = GetECMALineOfPosition(sourceFileLike, TextRange_Pos(directive.Loc));
    directivesByLine.set(line, directive);
  }
  const lineStarts = GetECMALineStarts(sourceFileLike);
  const filtered: GoPtr<Diagnostic>[] = [];
  for (const diagnostic of diags) {
    let ignoreDiagnostic = false;
    for (let line = ComputeLineOfPosition(lineStarts, Diagnostic_Pos(diagnostic)) - 1; line >= 0; line--) {
      const dir = directivesByLine.get(line);
      if (dir !== undefined) {
        ignoreDiagnostic = true;
        directivesByLine.set(line, { ...dir, Kind: CommentDirectiveKindIgnore });
        break;
      }
      if (!isCommentOrBlankLine(SourceFile_Text(sourceFile), lineStarts[line]!)) {
        break;
      }
    }
    if (!ignoreDiagnostic) {
      filtered.push(diagnostic);
    }
  }
  return [filtered, directivesByLine];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.getDeclarationDiagnosticsForFile","kind":"method","status":"implemented","sigHash":"342ad0d3ce5ef039ad93dcb41c26af4af6823117e0dda02880de2cdc3363dd4b"}
 *
 * Go source:
 * func (p *Program) getDeclarationDiagnosticsForFile(ctx context.Context, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	if sourceFile.IsDeclarationFile {
 * 		return []*ast.Diagnostic{}
 * 	}
 * 
 * 	if cached, ok := p.declarationDiagnosticCache.Load(sourceFile); ok {
 * 		return cached
 * 	}
 * 
 * 	host, done := newEmitHost(ctx, p, sourceFile)
 * 	defer done()
 * 	diagnostics := getDeclarationDiagnostics(host, sourceFile)
 * 	diagnostics, _ = p.declarationDiagnosticCache.LoadOrStore(sourceFile, diagnostics)
 * 	return diagnostics
 * }
 */
export function Program_getDeclarationDiagnosticsForFile(receiver: GoPtr<Program>, ctx: GoInterface<Context>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  if (sourceFile!.IsDeclarationFile) {
    return [];
  }
  const [cached, ok] = SyncMap_Load(receiver!.declarationDiagnosticCache, sourceFile, GoZeroSlice<GoPtr<Diagnostic>>, sourceFileKey);
  if (ok) {
    return cached as GoSlice<GoPtr<Diagnostic>>;
  }
  const [host, done] = newEmitHost(ctx, receiver, sourceFile);
  const diags = getDeclarationDiagnostics(emitHost_as_compiler_EmitHost(host), sourceFile);
  const [stored] = SyncMap_LoadOrStore(receiver!.declarationDiagnosticCache, sourceFile, diags, GoZeroSlice<GoPtr<Diagnostic>>, sourceFileKey);
  done!();
  return stored !== undefined ? stored as GoSlice<GoPtr<Diagnostic>> : diags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.getSuggestionDiagnosticsWithChecker","kind":"method","status":"implemented","sigHash":"3f4cddb03eb443780d3e6d49fe4e18d093b340e664670eb829a660fe3f87116c"}
 *
 * Go source:
 * func (p *Program) getSuggestionDiagnosticsWithChecker(ctx context.Context, fileChecker *checker.Checker, sourceFile *ast.SourceFile) []*ast.Diagnostic {
 * 	if p.SkipTypeChecking(sourceFile, false) {
 * 		return nil
 * 	}
 * 
 * 	// Checker creation forces binding, so bind suggestion diagnostics will be populated.
 * 	diags := slices.Clip(sourceFile.BindSuggestionDiagnostics)
 * 	diags = append(diags, fileChecker.GetSuggestionDiagnostics(ctx, sourceFile)...)
 * 
 * 	return diags
 * }
 */
export function Program_getSuggestionDiagnosticsWithChecker(receiver: GoPtr<Program>, ctx: GoInterface<Context>, fileChecker: GoPtr<Checker>, sourceFile: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> {
  if (Program_SkipTypeChecking(receiver, sourceFile, false as bool)) {
    return undefined!;
  }
  let diags: GoPtr<Diagnostic>[] = slices.Clip(sourceFile!.BindSuggestionDiagnostics) ?? [];
  diags = [...diags, ...(Checker_GetSuggestionDiagnostics(fileChecker, ctx, sourceFile) ?? [])];
  return diags;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::isCommentOrBlankLine","kind":"func","status":"implemented","sigHash":"2cf9546cf1f4a3932154b336798580469e7bcadd259f7c0f4e9d328775d9cf32"}
 *
 * Go source:
 * func isCommentOrBlankLine(text string, pos int) bool {
 * 	for pos < len(text) && (text[pos] == ' ' || text[pos] == '\t') {
 * 		pos++
 * 	}
 * 	return pos == len(text) ||
 * 		pos < len(text) && (text[pos] == '\r' || text[pos] == '\n') ||
 * 		pos+1 < len(text) && text[pos] == '/' && text[pos+1] == '/'
 * }
 */
export function isCommentOrBlankLine(text: string, pos: int): bool {
  const n = byteLen(text);
  while (pos < n && (byteAt(text, pos) === 0x20 /* ' ' */ || byteAt(text, pos) === 0x09 /* '\t' */)) {
    pos++;
  }
  return (pos === n ||
    (pos < n && (byteAt(text, pos) === 0x0d /* '\r' */ || byteAt(text, pos) === 0x0a /* '\n' */)) ||
    (pos + 1 < n && byteAt(text, pos) === 0x2f /* '/' */ && byteAt(text, pos + 1) === 0x2f /* '/' */)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::SortAndDeduplicateDiagnostics","kind":"func","status":"implemented","sigHash":"9915c58133857e0f27b023ab28200543e6b2ff75f632810af0fa3f2a9021027a"}
 *
 * Go source:
 * func SortAndDeduplicateDiagnostics(diagnostics []*ast.Diagnostic) []*ast.Diagnostic {
 * 	diagnostics = slices.Clone(diagnostics)
 * 	slices.SortFunc(diagnostics, ast.CompareDiagnostics)
 * 	return compactAndMergeRelatedInfos(diagnostics)
 * }
 */
export function SortAndDeduplicateDiagnostics(diagnostics: GoSlice<GoPtr<Diagnostic>>): GoSlice<GoPtr<Diagnostic>> {
  const cloned = slices.Clone(diagnostics) ?? [];
  cloned.sort(CompareDiagnostics);
  return compactAndMergeRelatedInfos(cloned);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::compactAndMergeRelatedInfos","kind":"func","status":"implemented","sigHash":"42709cae8871346e6c6a3377b0e66bcbe09454353ad492549702e97ff9075513"}
 *
 * Go source:
 * func compactAndMergeRelatedInfos(diagnostics []*ast.Diagnostic) []*ast.Diagnostic {
 * 	if len(diagnostics) < 2 {
 * 		return diagnostics
 * 	}
 * 	i := 0
 * 	j := 0
 * 	for i < len(diagnostics) {
 * 		d := diagnostics[i]
 * 		n := 1
 * 		for i+n < len(diagnostics) && ast.EqualDiagnosticsNoRelatedInfo(d, diagnostics[i+n]) {
 * 			n++
 * 		}
 * 		if n > 1 {
 * 			var relatedInfos []*ast.Diagnostic
 * 			for k := range n {
 * 				relatedInfos = append(relatedInfos, diagnostics[i+k].RelatedInformation()...)
 * 			}
 * 			if relatedInfos != nil {
 * 				slices.SortFunc(relatedInfos, ast.CompareDiagnostics)
 * 				relatedInfos = slices.CompactFunc(relatedInfos, ast.EqualDiagnostics)
 * 				d = d.Clone().SetRelatedInfo(relatedInfos)
 * 			}
 * 		}
 * 		diagnostics[j] = d
 * 		i += n
 * 		j++
 * 	}
 * 	clear(diagnostics[j:])
 * 	return diagnostics[:j]
 * }
 */
export function compactAndMergeRelatedInfos(diagnostics: GoSlice<GoPtr<Diagnostic>>): GoSlice<GoPtr<Diagnostic>> {
  if (diagnostics === undefined || diagnostics.length < 2) {
    return diagnostics;
  }
  const result: GoPtr<Diagnostic>[] = [];
  let i = 0;
  while (i < diagnostics.length) {
    let d = diagnostics[i];
    let n = 1;
    while (i + n < diagnostics.length && EqualDiagnosticsNoRelatedInfo(d, diagnostics[i + n])) {
      n++;
    }
    if (n > 1) {
      let relatedInfos: GoPtr<Diagnostic>[] = [];
      for (let k = 0; k < n; k++) {
        relatedInfos = [...relatedInfos, ...(Diagnostic_RelatedInformation(diagnostics[i + k]) ?? [])];
      }
      if (relatedInfos.length > 0) {
        relatedInfos.sort(CompareDiagnostics);
        // compact: remove adjacent equal entries
        const compacted: GoPtr<Diagnostic>[] = [];
        for (let m = 0; m < relatedInfos.length; m++) {
          if (m === 0 || !EqualDiagnostics(relatedInfos[m], relatedInfos[m - 1])) {
            compacted.push(relatedInfos[m]);
          }
        }
        d = Diagnostic_SetRelatedInfo(Diagnostic_Clone(d), compacted);
      }
    }
    result.push(d);
    i += n;
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.LineCount","kind":"method","status":"implemented","sigHash":"f10bc6c1d012957be80fc2c82135f28c10e0f5ebcead3a557baacb7533a19fe0"}
 *
 * Go source:
 * func (p *Program) LineCount() int {
 * 	var count int
 * 	for _, file := range p.files {
 * 		count += len(file.ECMALineMap())
 * 	}
 * 	return count
 * }
 */
export function Program_LineCount(receiver: GoPtr<Program>): int {
  let count = 0;
  for (const file of receiver!.__tsgoEmbedded0!.files) {
    count += SourceFile_ECMALineMap(file).length;
  }
  return count;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IdentifierCount","kind":"method","status":"implemented","sigHash":"0ec8ead5b1bca16814afbbc1fdfd6465b36249696759818aec213064e87467b5"}
 *
 * Go source:
 * func (p *Program) IdentifierCount() int {
 * 	var count int
 * 	for _, file := range p.files {
 * 		count += file.IdentifierCount
 * 	}
 * 	return count
 * }
 */
export function Program_IdentifierCount(receiver: GoPtr<Program>): int {
  let count = 0;
  for (const file of receiver!.__tsgoEmbedded0!.files) {
    count += file!.IdentifierCount;
  }
  return count;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.SymbolCount","kind":"method","status":"implemented","sigHash":"b648897f379bb8af20af2508807d12f45cc3539dd2f7bde6d018990c18612e94"}
 *
 * Go source:
 * func (p *Program) SymbolCount() int {
 * 	var count int
 * 	for _, file := range p.files {
 * 		count += file.SymbolCount
 * 	}
 * 	var val atomic.Uint32
 * 	val.Store(uint32(count))
 * 	p.ForEachCheckerParallel(func(_ int, c *checker.Checker) {
 * 		val.Add(c.SymbolCount)
 * 	})
 * 	return int(val.Load())
 * }
 */
export function Program_SymbolCount(receiver: GoPtr<Program>): int {
  let count = 0;
  for (const file of receiver!.__tsgoEmbedded0!.files) {
    count += file!.SymbolCount;
  }
  Program_ForEachCheckerParallel(receiver, (_, c) => {
    count += c!.SymbolCount;
  });
  return count;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.TypeCount","kind":"method","status":"implemented","sigHash":"2a5a60d5b8150f23591fb16721161d51534a05214f87a2f69bec91c862590e35"}
 *
 * Go source:
 * func (p *Program) TypeCount() int {
 * 	var val atomic.Uint32
 * 	p.ForEachCheckerParallel(func(_ int, c *checker.Checker) {
 * 		val.Add(c.TypeCount)
 * 	})
 * 	return int(val.Load())
 * }
 */
export function Program_TypeCount(receiver: GoPtr<Program>): int {
  let count = 0;
  Program_ForEachCheckerParallel(receiver, (_, c) => {
    count += c!.TypeCount;
  });
  return count;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.InstantiationCount","kind":"method","status":"implemented","sigHash":"bf058749e3c8e0ab455bdd89855fa4afa4b2b2d095db962676c9a720b5b9adb1"}
 *
 * Go source:
 * func (p *Program) InstantiationCount() int {
 * 	var val atomic.Uint32
 * 	p.ForEachCheckerParallel(func(_ int, c *checker.Checker) {
 * 		val.Add(c.TotalInstantiationCount)
 * 	})
 * 	return int(val.Load())
 * }
 */
export function Program_InstantiationCount(receiver: GoPtr<Program>): int {
  let count = 0;
  Program_ForEachCheckerParallel(receiver, (_, c) => {
    count += c!.TotalInstantiationCount;
  });
  return count;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.Program","kind":"method","status":"implemented","sigHash":"a674f6f932c9fa66b91e09e0c7f555d210360200ee171bdabfe75135c557be72"}
 *
 * Go source:
 * func (p *Program) Program() *Program {
 * 	return p
 * }
 */
export function Program_Program(receiver: GoPtr<Program>): GoPtr<Program> {
  return receiver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSourceFileMetaData","kind":"method","status":"implemented","sigHash":"1e40507ef9422b126edb9064cfed4ee395402334152905447c67b1e1507e702b"}
 *
 * Go source:
 * func (p *Program) GetSourceFileMetaData(path tspath.Path) ast.SourceFileMetaData {
 * 	return p.sourceFileMetaDatas[path]
 * }
 */
export function Program_GetSourceFileMetaData(receiver: GoPtr<Program>, path: Path): SourceFileMetaData {
  return receiver!.__tsgoEmbedded0!.sourceFileMetaDatas.get(path)!;
}

/**
 * Port note: upstream implementation source follows.
 *
 * Go source:
 * func (p *Program) GetEmitModuleFormatOfFile(sourceFile ast.HasFileName) core.ModuleKind {
 * 	return ast.GetEmitModuleFormatOfFileWorker(sourceFile.FileName(), p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile), p.GetSourceFileMetaData(sourceFile.Path()))
 * }
 */
function Program_getCompilerOptionsForFile(receiver: GoPtr<Program>, sourceFile: HasFileName): GoPtr<CompilerOptions> {
  const mapper = receiver!.__tsgoEmbedded0!.projectReferenceFileMapper;
  if (mapper === undefined) {
    return Program_Options(receiver);
  }
  return projectReferenceFileMapper_getCompilerOptionsForFile(mapper, sourceFile);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetEmitModuleFormatOfFile","kind":"method","status":"implemented","sigHash":"73eecf33ce88657b0b60f119379740a50fa2d8705d9599b6ea26251190d848ff"}
 */
export function Program_GetEmitModuleFormatOfFile(receiver: GoPtr<Program>, sourceFile: GoInterface<HasFileName>): ModuleKind {
  return GetEmitModuleFormatOfFileWorker(
    sourceFile!.FileName(),
    Program_getCompilerOptionsForFile(receiver, sourceFile!),
    Program_GetSourceFileMetaData(receiver, sourceFile!.Path()),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetEmitSyntaxForUsageLocation","kind":"method","status":"implemented","sigHash":"2ef4a9bd8c4c108a9ae28a13a2cbd638242c0f18cf11674026f9754cd5d72433"}
 *
 * Go source:
 * func (p *Program) GetEmitSyntaxForUsageLocation(sourceFile ast.HasFileName, location *ast.StringLiteralLike) core.ResolutionMode {
 * 	return getEmitSyntaxForUsageLocationWorker(sourceFile.FileName(), p.sourceFileMetaDatas[sourceFile.Path()], location, p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile))
 * }
 */
export function Program_GetEmitSyntaxForUsageLocation(receiver: GoPtr<Program>, sourceFile: GoInterface<HasFileName>, location: GoPtr<StringLiteralLike>): ResolutionMode {
  return getEmitSyntaxForUsageLocationWorker(
    sourceFile!.FileName(),
    receiver!.__tsgoEmbedded0!.sourceFileMetaDatas.get(sourceFile!.Path())!,
    location,
    Program_getCompilerOptionsForFile(receiver, sourceFile!),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetImpliedNodeFormatForEmit","kind":"method","status":"implemented","sigHash":"203188fee2b3c8e9166e87495595c67553777b96c58081adb3c170d64e27331a"}
 *
 * Go source:
 * func (p *Program) GetImpliedNodeFormatForEmit(sourceFile ast.HasFileName) core.ResolutionMode {
 * 	return ast.GetImpliedNodeFormatForEmitWorker(sourceFile.FileName(), p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile).GetEmitModuleKind(), p.GetSourceFileMetaData(sourceFile.Path()))
 * }
 */
export function Program_GetImpliedNodeFormatForEmit(receiver: GoPtr<Program>, sourceFile: GoInterface<HasFileName>): ResolutionMode {
  return GetImpliedNodeFormatForEmitWorker(
    sourceFile!.FileName(),
    CompilerOptions_GetEmitModuleKind(Program_getCompilerOptionsForFile(receiver, sourceFile!)),
    Program_GetSourceFileMetaData(receiver, sourceFile!.Path()),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetModeForUsageLocation","kind":"method","status":"implemented","sigHash":"d772e66f00d4427e8d13ad24d5b9d49a0a9346ee17a8d8f3768bd2d44013d3c2"}
 *
 * Go source:
 * func (p *Program) GetModeForUsageLocation(sourceFile ast.HasFileName, location *ast.StringLiteralLike) core.ResolutionMode {
 * 	return getModeForUsageLocation(sourceFile.FileName(), p.sourceFileMetaDatas[sourceFile.Path()], location, p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile))
 * }
 */
export function Program_GetModeForUsageLocation(receiver: GoPtr<Program>, sourceFile: GoInterface<HasFileName>, location: GoPtr<StringLiteralLike>): ResolutionMode {
  return getModeForUsageLocation(
    sourceFile!.FileName(),
    receiver!.__tsgoEmbedded0!.sourceFileMetaDatas.get(sourceFile!.Path())!,
    location,
    Program_getCompilerOptionsForFile(receiver, sourceFile!),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetDefaultResolutionModeForFile","kind":"method","status":"implemented","sigHash":"251cee09e6eff3a3a9c2901d4f11df0c8f042893ddfd0bbf8ddeb6f09a97b90b"}
 *
 * Go source:
 * func (p *Program) GetDefaultResolutionModeForFile(sourceFile ast.HasFileName) core.ResolutionMode {
 * 	return getDefaultResolutionModeForFile(sourceFile.FileName(), p.sourceFileMetaDatas[sourceFile.Path()], p.projectReferenceFileMapper.getCompilerOptionsForFile(sourceFile))
 * }
 */
export function Program_GetDefaultResolutionModeForFile(receiver: GoPtr<Program>, sourceFile: GoInterface<HasFileName>): ResolutionMode {
  return getDefaultResolutionModeForFile(
    sourceFile!.FileName(),
    receiver!.__tsgoEmbedded0!.sourceFileMetaDatas.get(sourceFile!.Path())!,
    Program_getCompilerOptionsForFile(receiver, sourceFile!),
  );
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IsSourceFileDefaultLibrary","kind":"method","status":"implemented","sigHash":"459e2eb7d34fee27688587398e4ee323c035b5f58ac2b198ee38c195c78b1f01"}
 *
 * Go source:
 * func (p *Program) IsSourceFileDefaultLibrary(path tspath.Path) bool {
 * 	_, ok := p.libFiles[path]
 * 	return ok
 * }
 */
export function Program_IsSourceFileDefaultLibrary(receiver: GoPtr<Program>, path: Path): bool {
  return receiver!.__tsgoEmbedded0!.libFiles.has(path) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IsGlobalTypingsFile","kind":"method","status":"implemented","sigHash":"ed6e1496e45f6c1d1dc5067be9d1ac6e4ef4f76ae45d232825c7d919d7c3ca95"}
 *
 * Go source:
 * func (p *Program) IsGlobalTypingsFile(fileName string) bool {
 * 	if !tspath.IsDeclarationFileName(fileName) {
 * 		return false
 * 	}
 * 	return tspath.ContainsPath(p.GetGlobalTypingsCacheLocation(), fileName, p.comparePathsOptions)
 * }
 */
export function Program_IsGlobalTypingsFile(receiver: GoPtr<Program>, fileName: string): bool {
  if (!IsDeclarationFileName(fileName)) {
    return false as bool;
  }
  return ContainsPath(Program_GetGlobalTypingsCacheLocation(receiver), fileName, receiver!.comparePathsOptions) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetDefaultLibFile","kind":"method","status":"implemented","sigHash":"8ce0d7e33d7833ea5fb8ec7c5b8cacdd214fe0099f1ea74c7274e8f48c15cb7e"}
 *
 * Go source:
 * func (p *Program) GetDefaultLibFile(path tspath.Path) *LibFile {
 * 	if libFile, ok := p.libFiles[path]; ok {
 * 		return libFile
 * 	}
 * 	return nil
 * }
 */
export function Program_GetDefaultLibFile(receiver: GoPtr<Program>, path: Path): GoPtr<LibFile> {
  const libFile = receiver!.__tsgoEmbedded0!.libFiles.get(path);
  if (libFile !== undefined) {
    return libFile;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.CommonSourceDirectory","kind":"method","status":"implemented","sigHash":"937483ca5bd530054d5ba315e96d4b45935515604e16ae770a62e2b3763ef557"}
 *
 * Go source:
 * func (p *Program) CommonSourceDirectory() string {
 * 	p.commonSourceDirectoryOnce.Do(func() {
 * 		p.commonSourceDirectory = outputpaths.GetCommonSourceDirectory(
 * 			p.Options(),
 * 			func() []string {
 * 				var files []string
 * 				for _, file := range p.files {
 * 					if sourceFileMayBeEmitted(file, p, false /*forceDtsEmit* /) {
 * 						files = append(files, file.FileName())
 * 					}
 * 				}
 * 				return files
 * 			},
 * 			p.GetCurrentDirectory(),
 * 			p.UseCaseSensitiveFileNames(),
 * 			p.checkSourceFilesBelongToPath,
 * 		)
 * 	})
 * 	return p.commonSourceDirectory
 * }
 */
export function Program_CommonSourceDirectory(receiver: GoPtr<Program>): string {
  receiver!.commonSourceDirectoryOnce.Do(() => {
    receiver!.commonSourceDirectory = GetCommonSourceDirectory(
      Program_Options(receiver),
      () => {
        const files: string[] = [];
        for (const file of receiver!.__tsgoEmbedded0!.files) {
          if (sourceFileMayBeEmitted(file, Program_as_emitter_SourceFileMayBeEmittedHost(receiver), false as bool)) {
            files.push(SourceFile_FileName(file));
          }
        }
        return files;
      },
      Program_GetCurrentDirectory(receiver),
      Program_UseCaseSensitiveFileNames(receiver),
      (sourceFiles, rootDirectory) => Program_checkSourceFilesBelongToPath(receiver, sourceFiles, rootDirectory),
    );
  });
  return receiver!.commonSourceDirectory;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.checkSourceFilesBelongToPath","kind":"method","status":"implemented","sigHash":"8cecb85222182aa47aab6f17ea783e121c7da0c58143b277e78d731b96f8a268"}
 *
 * Go source:
 * func (p *Program) checkSourceFilesBelongToPath(sourceFiles []string, rootDirectory string) bool {
 * 	allFilesBelongToPath := true
 * 	for _, file := range sourceFiles {
 * 		absoluteSourceFilePath := tspath.GetCanonicalFileName(tspath.GetNormalizedAbsolutePath(file, p.GetCurrentDirectory()), p.UseCaseSensitiveFileNames())
 * 		if !tspath.ContainsPath(rootDirectory, file, p.comparePathsOptions) {
 * 			p.includeProcessor.addProcessingDiagnostic(&processingDiagnostic{
 * 				kind: processingDiagnosticKindExplainingFileInclude,
 * 				data: &includeExplainingDiagnostic{
 * 					file:    tspath.Path(absoluteSourceFilePath),
 * 					message: diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files,
 * 					args:    []any{file, rootDirectory},
 * 				},
 * 			})
 * 			allFilesBelongToPath = false
 * 		}
 * 	}
 *
 * 	return allFilesBelongToPath
 * }
 */
export function Program_checkSourceFilesBelongToPath(receiver: GoPtr<Program>, sourceFiles: GoSlice<string>, rootDirectory: string): bool {
  let allFilesBelongToPath = true as bool;
  for (const file of sourceFiles) {
    const absoluteSourceFilePath = GetCanonicalFileName(GetNormalizedAbsolutePath(file, Program_GetCurrentDirectory(receiver)), Program_UseCaseSensitiveFileNames(receiver));
    if (!ContainsPath(rootDirectory, file, receiver!.comparePathsOptions)) {
      includeProcessor_addProcessingDiagnostic(receiver!.__tsgoEmbedded0!.includeProcessor, {
        kind: processingDiagnosticKindExplainingFileInclude,
        data: {
          file: absoluteSourceFilePath as Path,
          message: diagnostics.File_0_is_not_under_rootDir_1_rootDir_is_expected_to_contain_all_source_files,
          args: [file, rootDirectory],
        } as includeExplainingDiagnostic,
      });
      allFilesBelongToPath = false as bool;
    }
  }

  return allFilesBelongToPath;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::WriteFileData","kind":"type","status":"implemented","sigHash":"d02490559e7148904b3f7b5cb45b50fc74ceda7b7b8f1867e80c5e3c4fa1c2f4"}
 *
 * Go source:
 * WriteFileData struct {
 * 	SourceMapUrlPos int
 * 	BuildInfo       any
 * 	Diagnostics     []*ast.Diagnostic
 * 	SkippedDtsWrite bool
 * }
 */
export interface WriteFileData {
  SourceMapUrlPos: int;
  BuildInfo: GoInterface<unknown>;
  Diagnostics: GoSlice<GoPtr<Diagnostic>>;
  SkippedDtsWrite: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::WriteFile","kind":"type","status":"implemented","sigHash":"ba248e1607ef5b04f34850638b47f043fd241cbd5b280e645682cff6e5c82cda"}
 *
 * Go source:
 * WriteFile func(fileName string, text string, data *WriteFileData) error
 */
export type WriteFile = GoFunc<(fileName: string, text: string, data: GoPtr<WriteFileData>) => GoError>;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::EmitOptions","kind":"type","status":"implemented","sigHash":"83ed49471ad2467500bc809d9a9f0d63d64794c8e634e9fce9d4baf6375d0a61"}
 *
 * Go source:
 * EmitOptions struct {
 * 	TargetSourceFile *ast.SourceFile // Single file to emit. If `nil`, emits all files
 * 	EmitOnly         EmitOnly
 * 	WriteFile        WriteFile
 * }
 */
export interface EmitOptions {
  TargetSourceFile: GoPtr<SourceFile>;
  EmitOnly: EmitOnly;
  WriteFile: WriteFile;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::EmitResult","kind":"type","status":"implemented","sigHash":"2b25aa59d895e79438eb5e11a2f176f46472bb77b9e5124546e1db4ee3fb05fb"}
 *
 * Go source:
 * EmitResult struct {
 * 	EmitSkipped  bool
 * 	Diagnostics  []*ast.Diagnostic      // Contains declaration emit diagnostics
 * 	EmittedFiles []string               // Array of files the compiler wrote to disk
 * 	SourceMaps   []*SourceMapEmitResult // Array of sourceMapData if compiler emitted sourcemaps
 * }
 */
export interface EmitResult {
  EmitSkipped: bool;
  Diagnostics: GoSlice<GoPtr<Diagnostic>>;
  EmittedFiles: GoSlice<string>;
  SourceMaps: GoSlice<GoPtr<SourceMapEmitResult>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::SourceMapEmitResult","kind":"type","status":"implemented","sigHash":"7ad85d13512052f6531bc4053ced1acc97e80e662f021a4ebac5cec2388f8c36"}
 *
 * Go source:
 * SourceMapEmitResult struct {
 * 	InputSourceFileNames []string // Input source file (which one can use on program to get the file), 1:1 mapping with the sourceMap.sources list
 * 	SourceMap            *sourcemap.RawSourceMap
 * 	GeneratedFile        string
 * }
 */
export interface SourceMapEmitResult {
  InputSourceFileNames: GoSlice<string>;
  SourceMap: GoPtr<RawSourceMap>;
  GeneratedFile: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.Emit","kind":"method","status":"implemented","sigHash":"7abab2f1a8e2d654d7db6e62222718c78cca49738cce59150dd2a0a133db89f1"}
 *
 * Go source:
 * func (p *Program) Emit(ctx context.Context, options EmitOptions) *EmitResult {
 * 	if tr := p.opts.Tracing; tr != nil {
 * 		defer tr.Push(tracing.PhaseEmit, "emit", nil, true)()
 * 	}
 * 
 * 	if options.EmitOnly != EmitOnlyForcedDts {
 * 		result := HandleNoEmitOnError(
 * 			ctx,
 * 			p,
 * 			options.TargetSourceFile,
 * 		)
 * 		if result != nil || ctx.Err() != nil {
 * 			return result
 * 		}
 * 	}
 * 
 * 	newLine := p.Options().NewLine.GetNewLineCharacter()
 * 	writerPool := &sync.Pool{
 * 		New: func() any {
 * 			return printer.NewTextWriter(newLine, 0)
 * 		},
 * 	}
 * 	wg := core.NewWorkGroup(p.SingleThreaded())
 * 	var emitters []*emitter
 * 	sourceFiles := p.getSourceFilesToEmit(options.TargetSourceFile, options.EmitOnly == EmitOnlyForcedDts)
 * 
 * 	for _, sourceFile := range sourceFiles {
 * 		emitter := &emitter{
 * 			writer:     nil,
 * 			sourceFile: sourceFile,
 * 			emitOnly:   options.EmitOnly,
 * 			writeFile:  options.WriteFile,
 * 			tr:         p.opts.Tracing,
 * 		}
 * 		emitters = append(emitters, emitter)
 * 		wg.Queue(func() {
 * 			host, done := newEmitHost(ctx, p, sourceFile)
 * 			defer done()
 * 			emitter.host = host
 * 
 * 			// take an unused writer
 * 			writer := writerPool.Get().(printer.EmitTextWriter)
 * 			writer.Clear()
 * 
 * 			// attach writer and perform emit
 * 			emitter.writer = writer
 * 			emitter.paths = outputpaths.GetOutputPathsFor(sourceFile, host.Options(), host, options.EmitOnly == EmitOnlyForcedDts)
 * 			emitter.emit()
 * 			emitter.writer = nil
 * 
 * 			// put the writer back in the pool
 * 			writerPool.Put(writer)
 * 		})
 * 	}
 * 
 * 	// wait for emit to complete
 * 	wg.RunAndWait()
 * 
 * 	// collect results from emit, preserving input order
 * 	return CombineEmitResults(core.Map(emitters, func(e *emitter) *EmitResult {
 * 		return &e.emitResult
 * 	}))
 * }
 */
export function Program_Emit(receiver: GoPtr<Program>, ctx: GoInterface<Context>, options: EmitOptions): GoPtr<EmitResult> {
  if (options.EmitOnly !== 3 /* EmitOnlyForcedDts */) {
    const result = HandleNoEmitOnError(ctx, Program_as_compiler_ProgramLike(receiver), options.TargetSourceFile);
    if (result !== undefined) {
      return result;
    }
  }

  const newLine = NewLineKind_GetNewLineCharacter(Program_Options(receiver)!.NewLine);
  const sourceFiles = Program_getSourceFilesToEmit(receiver, options.TargetSourceFile, options.EmitOnly === 3 /* EmitOnlyForcedDts */);
  const emitters: GoPtr<emitterType>[] = [];

  for (const sourceFile of sourceFiles) {
    const e: emitterType = {
      host: undefined!,
      sourceFile,
      emitOnly: options.EmitOnly,
      writeFile: options.WriteFile,
      tr: receiver!.opts.Tracing,
      writer: undefined!,
      paths: undefined!,
      emitterDiagnostics: {
        mu: new (class { Lock(): void {} Unlock(): void {} TryLock(): bool { return true as bool; } })(),
        count: 0 as int,
        fileDiagnostics: GoNilMap(),
        fileDiagnosticsSorted: { M: GoNilMap() },
        nonFileDiagnostics: GoNilSlice(),
        nonFileDiagnosticsSorted: false as bool,
      },
      emitResult: { EmitSkipped: false as bool, Diagnostics: [], EmittedFiles: [], SourceMaps: [] },
    };
    emitters.push(e);
    const [host, done] = newEmitHost(ctx, receiver, sourceFile);
    e.host = emitHost_as_compiler_EmitHost(host);
    const writer = NewTextWriter(newLine, 0);
    writer!.Clear();
    e.writer = writer;
    e.paths = GetOutputPathsFor(sourceFile, emitHost_Options(host), emitHost_as_outputpaths_OutputPathsHost(host), options.EmitOnly === 3 /* EmitOnlyForcedDts */);
    emitter_emit(e);
    e.writer = undefined!;
    done!();
  }

  return CombineEmitResults(core_Map(emitters, (e) => e !== undefined ? e!.emitResult : undefined));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::CombineEmitResults","kind":"func","status":"implemented","sigHash":"d342ab3c98b22d1fcf89ec01659c0c81d8e00f090a4ad4393812d90e6190186f"}
 *
 * Go source:
 * func CombineEmitResults(results []*EmitResult) *EmitResult {
 * 	result := &EmitResult{}
 * 	for _, emitResult := range results {
 * 		if emitResult == nil {
 * 			continue // Skip nil results
 * 		}
 * 		if emitResult.EmitSkipped {
 * 			result.EmitSkipped = true
 * 		}
 * 		result.Diagnostics = append(result.Diagnostics, emitResult.Diagnostics...)
 * 		result.EmittedFiles = append(result.EmittedFiles, emitResult.EmittedFiles...)
 * 		if emitResult.SourceMaps != nil {
 * 			result.SourceMaps = append(result.SourceMaps, emitResult.SourceMaps...)
 * 		}
 * 	}
 * 	return result
 * }
 */
export function CombineEmitResults(results: GoSlice<GoPtr<EmitResult>>): GoPtr<EmitResult> {
  const result: EmitResult = {
    EmitSkipped: false as bool,
    Diagnostics: [],
    EmittedFiles: [],
    SourceMaps: [],
  };
  for (const emitResult of results) {
    if (emitResult === undefined) {
      continue;
    }
    if (emitResult!.EmitSkipped) {
      result.EmitSkipped = true as bool;
    }
    result.Diagnostics = [...result.Diagnostics, ...(emitResult!.Diagnostics ?? [])];
    result.EmittedFiles = [...result.EmittedFiles, ...(emitResult!.EmittedFiles ?? [])];
    if (emitResult!.SourceMaps !== undefined) {
      result.SourceMaps = [...result.SourceMaps, ...(emitResult!.SourceMaps ?? [])];
    }
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::type::ProgramLike","kind":"type","status":"implemented","sigHash":"45c6e989acc4aaba77f0d584525ceb25ca00c5414248da6530c643ddac31b5c1"}
 *
 * Go source:
 * ProgramLike interface {
 * 	Options() *core.CompilerOptions
 * 	GetSourceFile(path string) *ast.SourceFile
 * 	GetSourceFiles() []*ast.SourceFile
 * 	GetConfigFileParsingDiagnostics() []*ast.Diagnostic
 * 	GetSyntacticDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
 * 	GetBindDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
 * 	GetProgramDiagnostics() []*ast.Diagnostic
 * 	GetGlobalDiagnostics(ctx context.Context) []*ast.Diagnostic
 * 	GetSemanticDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
 * 	GetDeclarationDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
 * 	GetSuggestionDiagnostics(ctx context.Context, file *ast.SourceFile) []*ast.Diagnostic
 * 	Emit(ctx context.Context, options EmitOptions) *EmitResult
 * 	CommonSourceDirectory() string
 * 	IsSourceFileDefaultLibrary(path tspath.Path) bool
 * 	Program() *Program
 * }
 */
export interface ProgramLike {
  Options(): GoPtr<CompilerOptions>;
  GetSourceFile(path: string): GoPtr<SourceFile>;
  GetSourceFiles(): GoSlice<GoPtr<SourceFile>>;
  GetConfigFileParsingDiagnostics(): GoSlice<GoPtr<Diagnostic>>;
  GetSyntacticDiagnostics(ctx: GoInterface<Context>, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>>;
  GetBindDiagnostics(ctx: GoInterface<Context>, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>>;
  GetProgramDiagnostics(): GoSlice<GoPtr<Diagnostic>>;
  GetGlobalDiagnostics(ctx: GoInterface<Context>): GoSlice<GoPtr<Diagnostic>>;
  GetSemanticDiagnostics(ctx: GoInterface<Context>, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>>;
  GetDeclarationDiagnostics(ctx: GoInterface<Context>, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>>;
  GetSuggestionDiagnostics(ctx: GoInterface<Context>, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>>;
  Emit(ctx: GoInterface<Context>, options: EmitOptions): GoPtr<EmitResult>;
  CommonSourceDirectory(): string;
  IsSourceFileDefaultLibrary(path: Path): bool;
  Program(): GoPtr<Program>;
}

export function Program_as_compiler_ProgramLike(receiver: GoPtr<Program>): ProgramLike {
  return {
    Options: (): GoPtr<CompilerOptions> => Program_Options(receiver),
    GetSourceFile: (path: string): GoPtr<SourceFile> => Program_GetSourceFile(receiver, path),
    GetSourceFiles: (): GoSlice<GoPtr<SourceFile>> => Program_GetSourceFiles(receiver),
    GetConfigFileParsingDiagnostics: (): GoSlice<GoPtr<Diagnostic>> => Program_GetConfigFileParsingDiagnostics(receiver),
    GetSyntacticDiagnostics: (ctx: Context, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> => Program_GetSyntacticDiagnostics(receiver, ctx, file),
    GetBindDiagnostics: (ctx: Context, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> => Program_GetBindDiagnostics(receiver, ctx, file),
    GetProgramDiagnostics: (): GoSlice<GoPtr<Diagnostic>> => Program_GetProgramDiagnostics(receiver),
    GetGlobalDiagnostics: (ctx: Context): GoSlice<GoPtr<Diagnostic>> => Program_GetGlobalDiagnostics(receiver, ctx),
    GetSemanticDiagnostics: (ctx: Context, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> => Program_GetSemanticDiagnostics(receiver, ctx, file),
    GetDeclarationDiagnostics: (ctx: Context, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> => Program_GetDeclarationDiagnostics(receiver, ctx, file),
    GetSuggestionDiagnostics: (ctx: Context, file: GoPtr<SourceFile>): GoSlice<GoPtr<Diagnostic>> => Program_GetSuggestionDiagnostics(receiver, ctx, file),
    Emit: (ctx: Context, options: EmitOptions): GoPtr<EmitResult> => Program_Emit(receiver, ctx, options),
    CommonSourceDirectory: (): string => Program_CommonSourceDirectory(receiver),
    IsSourceFileDefaultLibrary: (path: Path): bool => Program_IsSourceFileDefaultLibrary(receiver, path),
    Program: (): GoPtr<Program> => receiver,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::HandleNoEmitOnError","kind":"func","status":"implemented","sigHash":"28dba03229c19cfc96503e26722fab84ad25ac1c5bb4e6ee84ed503249aba001"}
 *
 * Go source:
 * func HandleNoEmitOnError(ctx context.Context, program ProgramLike, file *ast.SourceFile) *EmitResult {
 * 	if !program.Options().NoEmitOnError.IsTrue() {
 * 		return nil // No emit on error is not set, so we can proceed with emitting
 * 	}
 * 
 * 	diagnostics := GetDiagnosticsOfAnyProgram(
 * 		ctx,
 * 		program,
 * 		file,
 * 		true,
 * 		program.GetBindDiagnostics,
 * 		program.GetSemanticDiagnostics,
 * 	)
 * 	if len(diagnostics) == 0 {
 * 		return nil // No diagnostics, so we can proceed with emitting
 * 	}
 * 	return &EmitResult{
 * 		Diagnostics: diagnostics,
 * 		EmitSkipped: true,
 * 	}
 * }
 */
export function HandleNoEmitOnError(ctx: GoInterface<Context>, program: GoInterface<ProgramLike>, file: GoPtr<SourceFile>): GoPtr<EmitResult> {
  if (!Tristate_IsTrue(program!.Options()!.NoEmitOnError)) {
    return undefined;
  }
  const diags = GetDiagnosticsOfAnyProgram(
    ctx,
    program,
    file,
    true as bool,
    program!.GetBindDiagnostics.bind(program),
    program!.GetSemanticDiagnostics.bind(program),
  );
  if (diags.length === 0) {
    return undefined;
  }
  return {
    Diagnostics: diags,
    EmitSkipped: true as bool,
    EmittedFiles: [],
    SourceMaps: [],
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::GetDiagnosticsOfAnyProgram","kind":"func","status":"implemented","sigHash":"83c1b7952f0c3423e8da28b9f912beda2d8a85c7d4385beed1bbae4c8c45876b"}
 *
 * Go source:
 * func GetDiagnosticsOfAnyProgram(
 * 	ctx context.Context,
 * 	program ProgramLike,
 * 	file *ast.SourceFile,
 * 	skipNoEmitCheckForDtsDiagnostics bool,
 * 	getBindDiagnostics func(context.Context, *ast.SourceFile) []*ast.Diagnostic,
 * 	getSemanticDiagnostics func(context.Context, *ast.SourceFile) []*ast.Diagnostic,
 * ) []*ast.Diagnostic {
 * 	allDiagnostics := slices.Clip(program.GetConfigFileParsingDiagnostics())
 * 	configFileParsingDiagnosticsLength := len(allDiagnostics)
 * 
 * 	allDiagnostics = append(allDiagnostics, program.GetSyntacticDiagnostics(ctx, file)...)
 *
 * 	// If we didn't have any syntactic errors, then also try getting the program (options),
 * 	// global and semantic errors.
 * 	if len(allDiagnostics) == configFileParsingDiagnosticsLength {
 * 		allDiagnostics = append(allDiagnostics, program.GetProgramDiagnostics()...)
 *
 * 		// Do binding early so we can track the time.
 * 		getBindDiagnostics(ctx, file)
 * 
 * 		if program.Options().ListFilesOnly.IsFalseOrUnknown() {
 * 			allDiagnostics = append(allDiagnostics, program.GetGlobalDiagnostics(ctx)...)
 * 
 * 			if len(allDiagnostics) == configFileParsingDiagnosticsLength {
 * 				allDiagnostics = append(allDiagnostics, getSemanticDiagnostics(ctx, file)...)
 * 				// Ask for the global diagnostics again (they were empty above); we may have found new during checking, e.g. missing globals.
 * 				allDiagnostics = append(allDiagnostics, program.GetGlobalDiagnostics(ctx)...)
 * 			}
 * 
 * 			if (skipNoEmitCheckForDtsDiagnostics || program.Options().NoEmit.IsTrue()) && program.Options().GetEmitDeclarations() && len(allDiagnostics) == configFileParsingDiagnosticsLength {
 * 				allDiagnostics = append(allDiagnostics, program.GetDeclarationDiagnostics(ctx, file)...)
 * 			}
 * 		}
 * 	}
 * 	return allDiagnostics
 * }
 */
export function GetDiagnosticsOfAnyProgram(ctx: GoInterface<Context>, program: GoInterface<ProgramLike>, file: GoPtr<SourceFile>, skipNoEmitCheckForDtsDiagnostics: bool, getBindDiagnostics: (arg0: Context, arg1: GoPtr<SourceFile>) => GoSlice<GoPtr<Diagnostic>>, getSemanticDiagnostics: (arg0: Context, arg1: GoPtr<SourceFile>) => GoSlice<GoPtr<Diagnostic>>): GoSlice<GoPtr<Diagnostic>> {
  let allDiagnostics: GoPtr<Diagnostic>[] = [...(slices.Clip(program!.GetConfigFileParsingDiagnostics()) ?? [])];
  const configFileParsingDiagnosticsLength = allDiagnostics.length;

  allDiagnostics = [...allDiagnostics, ...(program!.GetSyntacticDiagnostics(ctx, file) ?? [])];

  // If we didn't have any syntactic errors, then also try getting the program (options),
  // global and semantic errors.
  if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
    allDiagnostics = [...allDiagnostics, ...(program!.GetProgramDiagnostics() ?? [])];

    getBindDiagnostics(ctx!, file);

    if (Tristate_IsFalseOrUnknown(program!.Options()!.ListFilesOnly)) {
      allDiagnostics = [...allDiagnostics, ...(program!.GetGlobalDiagnostics(ctx) ?? [])];

      if (allDiagnostics.length === configFileParsingDiagnosticsLength) {
        allDiagnostics = [...allDiagnostics, ...(getSemanticDiagnostics(ctx!, file) ?? [])];
        allDiagnostics = [...allDiagnostics, ...(program!.GetGlobalDiagnostics(ctx) ?? [])];
      }

      if ((skipNoEmitCheckForDtsDiagnostics || Tristate_IsTrue(program!.Options()!.NoEmit)) && CompilerOptions_GetEmitDeclarations(program!.Options()) && allDiagnostics.length === configFileParsingDiagnosticsLength) {
        allDiagnostics = [...allDiagnostics, ...(program!.GetDeclarationDiagnostics(ctx, file) ?? [])];
      }
    }
  }
  return allDiagnostics;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.toPath","kind":"method","status":"implemented","sigHash":"f69013146a9fb21694dd0447ba3918451fcd7d018ac573a4613b054e34187cc9"}
 *
 * Go source:
 * func (p *Program) toPath(filename string) tspath.Path {
 * 	return tspath.ToPath(filename, p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * }
 */
export function Program_toPath(receiver: GoPtr<Program>, filename: string): Path {
  return ToPath(filename, Program_GetCurrentDirectory(receiver), Program_UseCaseSensitiveFileNames(receiver));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSourceFile","kind":"method","status":"implemented","sigHash":"56cce9e525da96018c543df9736e11cf42843f64fba5cd520ca422b7a1518b7c"}
 *
 * Go source:
 * func (p *Program) GetSourceFile(filename string) *ast.SourceFile {
 * 	path := p.toPath(filename)
 * 	return p.GetSourceFileByPath(path)
 * }
 */
export function Program_GetSourceFile(receiver: GoPtr<Program>, filename: string): GoPtr<SourceFile> {
  const path = Program_toPath(receiver, filename);
  return Program_GetSourceFileByPath(receiver, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSourceFileForResolvedModule","kind":"method","status":"implemented","sigHash":"69f2f701eeb2d3cb93185ba919c652be48f9055ced866c71a482cc7880d6487e"}
 *
 * Go source:
 * func (p *Program) GetSourceFileForResolvedModule(fileName string) *ast.SourceFile {
 * 	file := p.GetSourceFile(fileName)
 * 	if file == nil {
 * 		filename := p.GetParseFileRedirect(fileName)
 * 		if filename != "" {
 * 			return p.GetSourceFile(filename)
 * 		}
 * 	}
 * 	return file
 * }
 */
export function Program_GetSourceFileForResolvedModule(receiver: GoPtr<Program>, fileName: string): GoPtr<SourceFile> {
  let file = Program_GetSourceFile(receiver, fileName);
  if (file === undefined) {
    const filename = Program_GetParseFileRedirect(receiver, fileName);
    if (filename !== "") {
      return Program_GetSourceFile(receiver, filename);
    }
  }
  return file;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.FilesByPath","kind":"method","status":"implemented","sigHash":"aa7f24705fa768a6d9ed006b6ea017e37b685fd706ae3d1abf92e940f42ce592"}
 *
 * Go source:
 * func (p *Program) FilesByPath() map[tspath.Path]*ast.SourceFile {
 * 	return p.filesByPath
 * }
 */
export function Program_FilesByPath(receiver: GoPtr<Program>): GoMap<Path, GoPtr<SourceFile>> {
  return receiver!.__tsgoEmbedded0!.filesByPath;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSourceFileByPath","kind":"method","status":"implemented","sigHash":"93d3f5cd2c450223cbebd65db29759c4ba9e1e11ceefbf4da2cfbd7803591f4c"}
 *
 * Go source:
 * func (p *Program) GetSourceFileByPath(path tspath.Path) *ast.SourceFile {
 * 	return p.filesByPath[path]
 * }
 */
export function Program_GetSourceFileByPath(receiver: GoPtr<Program>, path: Path): GoPtr<SourceFile> {
  return receiver!.__tsgoEmbedded0!.filesByPath.get(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.HasSameFileNames","kind":"method","status":"implemented","sigHash":"2e10b08a05d61b52123910ce12be10cc5dd9aa56d9c3478451ed60ef6b331faf"}
 *
 * Go source:
 * func (p *Program) HasSameFileNames(other *Program) bool {
 * 	return maps.EqualFunc(p.filesByPath, other.filesByPath, func(a, b *ast.SourceFile) bool {
 * 		// checks for casing differences on case-insensitive file systems
 * 		return a.FileName() == b.FileName()
 * 	}) && maps.EqualFunc(p.redirectFilesByPath, other.redirectFilesByPath, func(a, b *redirectsFile) bool {
 * 		return a.FileName() == b.FileName()
 * 	})
 * }
 */
export function Program_HasSameFileNames(receiver: GoPtr<Program>, other: GoPtr<Program>): bool {
  return (
    maps.EqualFunc(receiver!.__tsgoEmbedded0!.filesByPath, other!.__tsgoEmbedded0!.filesByPath, (a, b) => {
      return (SourceFile_FileName(a) === SourceFile_FileName(b)) as bool;
    }) &&
    maps.EqualFunc(receiver!.__tsgoEmbedded0!.redirectFilesByPath, other!.__tsgoEmbedded0!.redirectFilesByPath, (a, b) => {
      return (a!.fileName === b!.fileName) as bool;
    })
  ) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSourceFiles","kind":"method","status":"implemented","sigHash":"4da95b79293a0779cef5715d311692fc13cb693566e29be4b9a1a1cd3daa0d2d"}
 *
 * Go source:
 * func (p *Program) GetSourceFiles() []*ast.SourceFile {
 * 	return p.files
 * }
 */
export function Program_GetSourceFiles(receiver: GoPtr<Program>): GoSlice<GoPtr<SourceFile>> {
  return receiver!.__tsgoEmbedded0!.files;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetIncludeReasons","kind":"method","status":"implemented","sigHash":"dd29fca2b6838ce96ba4bf323041fa7d981ba77a09dfc4cb5ad04ac4edbf3c89"}
 *
 * Go source:
 * func (p *Program) GetIncludeReasons() map[tspath.Path][]*FileIncludeReason {
 * 	return p.includeProcessor.fileIncludeReasons
 * }
 */
export function Program_GetIncludeReasons(receiver: GoPtr<Program>): GoMap<Path, GoSlice<GoPtr<FileIncludeReason>>> {
  return receiver!.__tsgoEmbedded0!.includeProcessor!.fileIncludeReasons;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IsMissingPath","kind":"method","status":"implemented","sigHash":"04652ace2a4230553969bc9fb5fcd0a7e115b155055a65ef94a184441f6412ae"}
 *
 * Go source:
 * func (p *Program) IsMissingPath(path tspath.Path) bool {
 * 	return slices.ContainsFunc(p.missingFiles, func(missingPath string) bool {
 * 		return p.toPath(missingPath) == path
 * 	})
 * }
 */
export function Program_IsMissingPath(receiver: GoPtr<Program>, path: Path): bool {
  return slices.ContainsFunc(receiver!.__tsgoEmbedded0!.missingFiles, (missingPath) => {
    return (Program_toPath(receiver, missingPath) === path) as bool;
  }) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.ExplainFiles","kind":"method","status":"implemented","sigHash":"e666f5eb699cdd988c5f7196d09dc04e2b641201d4835664b005a53d6426ae21"}
 *
 * Go source:
 * func (p *Program) ExplainFiles(w io.Writer, locale locale.Locale) {
 * 	toRelativeFileName := func(fileName string) string {
 * 		return tspath.GetRelativePathFromDirectory(p.GetCurrentDirectory(), fileName, p.comparePathsOptions)
 * 	}
 * 	filesExplained := 0
 * 	explainFile := func(file ast.HasFileName) {
 * 		fmt.Fprintln(w, toRelativeFileName(file.FileName()))
 * 		for _, reason := range p.includeProcessor.fileIncludeReasons[file.Path()] {
 * 			fmt.Fprintln(w, "  ", reason.toDiagnostic(p, true).Localize(locale))
 * 		}
 * 		for _, diag := range p.includeProcessor.explainRedirectAndImpliedFormat(p, file.Path(), toRelativeFileName) {
 * 			fmt.Fprintln(w, "  ", diag.Localize(locale))
 * 		}
 * 		filesExplained++
 * 	}
 * 
 * 	redirectFiles := slices.Collect(maps.Values(p.redirectFilesByPath))
 * 	slices.SortFunc(redirectFiles, func(a, b *redirectsFile) int {
 * 		return a.index - b.index
 * 	})
 * 
 * 	files := p.GetSourceFiles()
 * 	sourceFileIndex := 0
 * 	explainSourceFiles := func(endIndex int) {
 * 		for filesExplained < endIndex {
 * 			explainFile(files[sourceFileIndex])
 * 			sourceFileIndex++
 * 		}
 * 	}
 * 
 * 	for _, redirectFile := range redirectFiles {
 * 		// Explain all sourceFiles till we reach this redirectFile index
 * 		explainSourceFiles(redirectFile.index)
 * 		explainFile(redirectFile)
 * 	}
 * 
 * 	// Explain any remaining sourceFiles
 * 	explainSourceFiles(len(files) + len(redirectFiles))
 * }
 */
export function Program_ExplainFiles(receiver: GoPtr<Program>, w: GoInterface<Writer>, locale: Locale): void {
  const encoder = new globalThis.TextEncoder();
  const writeStr = (s: string): void => { w!.Write(encoder.encode(s) as unknown as number[]); };
  const toRelativeFileName = (fileName: string): string => {
    return GetRelativePathFromDirectory(Program_GetCurrentDirectory(receiver), fileName, receiver!.comparePathsOptions);
  };
  let filesExplained = 0;
  const explainFile = (file: HasFileName): void => {
    writeStr(toRelativeFileName(file.FileName()) + "\n");
    const reasons = receiver!.__tsgoEmbedded0!.includeProcessor!.fileIncludeReasons.get(file.Path() as Path);
    for (const reason of (reasons ?? [])) {
      writeStr("   " + Diagnostic_Localize(FileIncludeReason_toDiagnostic(reason, receiver, true as bool), locale) + "\n");
    }
    for (const diag of (includeProcessor_explainRedirectAndImpliedFormat(receiver!.__tsgoEmbedded0!.includeProcessor!, receiver, file.Path() as Path, toRelativeFileName) ?? [])) {
      writeStr("   " + Diagnostic_Localize(diag, locale) + "\n");
    }
    filesExplained++;
  };

  const redirectFiles = slices.Collect(maps.Values(receiver!.__tsgoEmbedded0!.redirectFilesByPath));
  redirectFiles.sort((a, b) => a!.index - b!.index);

  const files = Program_GetSourceFiles(receiver);
  let sourceFileIndex = 0;
  const explainSourceFiles = (endIndex: number): void => {
    while (filesExplained < endIndex) {
      explainFile(files[sourceFileIndex]! as unknown as HasFileName);
      sourceFileIndex++;
    }
  };

  for (const redirectFile of redirectFiles) {
    explainSourceFiles(redirectFile!.index);
    explainFile(redirectFile! as unknown as HasFileName);
  }

  explainSourceFiles(files.length + redirectFiles.length);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetLibFileFromReference","kind":"method","status":"implemented","sigHash":"83b9b2396187d6efe197c68da10ad549bee50b684a500da00b00bc9904dc53e6"}
 *
 * Go source:
 * func (p *Program) GetLibFileFromReference(ref *ast.FileReference) *ast.SourceFile {
 * 	path, ok := tsoptions.GetLibFileName(ref.FileName)
 * 	if !ok {
 * 		return nil
 * 	}
 * 	if sourceFile, ok := p.filesByPath[tspath.Path(path)]; ok {
 * 		return sourceFile
 * 	}
 * 	return nil
 * }
 */
export function Program_GetLibFileFromReference(receiver: GoPtr<Program>, ref: GoPtr<FileReference>): GoPtr<SourceFile> {
  const [path, ok] = GetLibFileName(ref!.FileName);
  if (!ok) {
    return undefined;
  }
  const sourceFile = receiver!.__tsgoEmbedded0!.filesByPath.get(path as Path);
  if (sourceFile !== undefined) {
    return sourceFile;
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective","kind":"method","status":"implemented","sigHash":"1d9b862b8296a30f3159fcd86ffcf348fff2636f951bbd25cf0862ac060327cb"}
 *
 * Go source:
 * func (p *Program) GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typeRef *ast.FileReference, sourceFile *ast.SourceFile) *module.ResolvedTypeReferenceDirective {
 * 	if resolutions, ok := p.typeResolutionsInFile[sourceFile.Path()]; ok {
 * 		if resolved, ok := resolutions[module.ModeAwareCacheKey{Name: typeRef.FileName, Mode: p.getModeForTypeReferenceDirectiveInFile(typeRef, sourceFile)}]; ok {
 * 			return resolved
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function Program_GetResolvedTypeReferenceDirectiveFromTypeReferenceDirective(receiver: GoPtr<Program>, typeRef: GoPtr<FileReference>, sourceFile: GoPtr<SourceFile>): GoPtr<ResolvedTypeReferenceDirective> {
  const resolutions = receiver!.__tsgoEmbedded0!.typeResolutionsInFile.get(SourceFile_Path(sourceFile));
  if (resolutions !== undefined) {
    const mode = Program_getModeForTypeReferenceDirectiveInFile(receiver, typeRef, sourceFile);
    for (const [k, v] of resolutions) {
      if (k.Name === typeRef!.FileName && k.Mode === mode) {
        return v as GoPtr<ResolvedTypeReferenceDirective>;
      }
    }
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetResolvedTypeReferenceDirectives","kind":"method","status":"implemented","sigHash":"f3c33f8d4696f8abb437609f1da0e76ea173e3723b42fbe095c7330f9fc3c016"}
 *
 * Go source:
 * func (p *Program) GetResolvedTypeReferenceDirectives() map[tspath.Path]module.ModeAwareCache[*module.ResolvedTypeReferenceDirective] {
 * 	return p.typeResolutionsInFile
 * }
 */
export function Program_GetResolvedTypeReferenceDirectives(receiver: GoPtr<Program>): GoMap<Path, ModeAwareCache<GoPtr<ResolvedTypeReferenceDirective>>> {
  return receiver!.__tsgoEmbedded0!.typeResolutionsInFile;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.getModeForTypeReferenceDirectiveInFile","kind":"method","status":"implemented","sigHash":"bfc866ed97eb9967a233b81e0647c9ab80371077347b7ab01f3b892503e72fa6"}
 *
 * Go source:
 * func (p *Program) getModeForTypeReferenceDirectiveInFile(ref *ast.FileReference, sourceFile *ast.SourceFile) core.ResolutionMode {
 * 	if ref.ResolutionMode != core.ResolutionModeNone {
 * 		return ref.ResolutionMode
 * 	}
 * 	return p.GetDefaultResolutionModeForFile(sourceFile)
 * }
 */
export function Program_getModeForTypeReferenceDirectiveInFile(receiver: GoPtr<Program>, ref: GoPtr<FileReference>, sourceFile: GoPtr<SourceFile>): ResolutionMode {
  if (ref!.ResolutionMode !== ResolutionModeNone) {
    return ref!.ResolutionMode;
  }
  return Program_GetDefaultResolutionModeForFile(receiver, sourceFile as unknown as HasFileName);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IsSourceFileFromExternalLibrary","kind":"method","status":"implemented","sigHash":"bff36fa42f49c031a1761b16dd91d64e60d9582ce8bde3e7674db4ef507aba27"}
 *
 * Go source:
 * func (p *Program) IsSourceFileFromExternalLibrary(file *ast.SourceFile) bool {
 * 	return p.sourceFilesFoundSearchingNodeModules.Has(file.Path())
 * }
 */
export function Program_IsSourceFileFromExternalLibrary(receiver: GoPtr<Program>, file: GoPtr<SourceFile>): bool {
  return Set_Has(receiver!.__tsgoEmbedded0!.sourceFilesFoundSearchingNodeModules, SourceFile_Path(file)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetJSXRuntimeImportSpecifier","kind":"method","status":"implemented","sigHash":"77020f69dcc4a03021eeb6641e952dbb0bd7337cbac7f373202550bdc45ffaf1"}
 *
 * Go source:
 * func (p *Program) GetJSXRuntimeImportSpecifier(path tspath.Path) (moduleReference string, specifier *ast.Node) {
 * 	if result := p.jsxRuntimeImportSpecifiers[path]; result != nil {
 * 		return result.moduleReference, result.specifier
 * 	}
 * 	return "", nil
 * }
 */
export function Program_GetJSXRuntimeImportSpecifier(receiver: GoPtr<Program>, path: Path): [string, GoPtr<Node>] {
  const result = receiver!.__tsgoEmbedded0!.jsxRuntimeImportSpecifiers.get(path);
  if (result !== undefined) {
    return [result.moduleReference, result.specifier as unknown as GoPtr<Node>];
  }
  return ["", undefined];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetImportHelpersImportSpecifier","kind":"method","status":"implemented","sigHash":"3b5178d721b7324f5b4a82060374aa8df1d20f459c98ea7387aad3674ddbced7"}
 *
 * Go source:
 * func (p *Program) GetImportHelpersImportSpecifier(path tspath.Path) *ast.Node {
 * 	return p.importHelpersImportSpecifiers[path]
 * }
 */
export function Program_GetImportHelpersImportSpecifier(receiver: GoPtr<Program>, path: Path): GoPtr<Node> {
  return receiver!.__tsgoEmbedded0!.importHelpersImportSpecifiers.get(path) as unknown as GoPtr<Node>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.SourceFileMayBeEmitted","kind":"method","status":"implemented","sigHash":"9fb8f8a01f94af0b564949750d403a9173a9fdaba589f06b4ada3056cb7a5ff5"}
 *
 * Go source:
 * func (p *Program) SourceFileMayBeEmitted(sourceFile *ast.SourceFile, forceDtsEmit bool) bool {
 * 	return sourceFileMayBeEmitted(sourceFile, p, forceDtsEmit)
 * }
 */
export function Program_SourceFileMayBeEmitted(receiver: GoPtr<Program>, sourceFile: GoPtr<SourceFile>, forceDtsEmit: bool): bool {
  return sourceFileMayBeEmitted(sourceFile, Program_as_emitter_SourceFileMayBeEmittedHost(receiver), forceDtsEmit);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.ResolvedPackageNames","kind":"method","status":"implemented","sigHash":"595264da7bbb204d855c8d22db5da39f36512a379395fbff736ddafdf5248a30"}
 *
 * Go source:
 * func (p *Program) ResolvedPackageNames() *collections.Set[string] {
 * 	return p.collectPackageNames().resolved
 * }
 */
export function Program_ResolvedPackageNames(receiver: GoPtr<Program>): GoPtr<Set<string>> {
  return Program_collectPackageNames(receiver)!.resolved;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.UnresolvedPackageNames","kind":"method","status":"implemented","sigHash":"a839f1703ff3c9364a248bc95c0323810358b5034c12adc07ae6e5aba8cf937d"}
 *
 * Go source:
 * func (p *Program) UnresolvedPackageNames() *collections.Set[string] {
 * 	return p.collectPackageNames().unresolved
 * }
 */
export function Program_UnresolvedPackageNames(receiver: GoPtr<Program>): GoPtr<Set<string>> {
  return Program_collectPackageNames(receiver)!.unresolved;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.DeepImportPackageNames","kind":"method","status":"implemented","sigHash":"c139be1518025bdcaea27c57cbd5eefef08c80dd33bfa7744fc211b5ba427891"}
 *
 * Go source:
 * func (p *Program) DeepImportPackageNames() *collections.Set[string] {
 * 	return p.collectPackageNames().deepImportPackages
 * }
 */
export function Program_DeepImportPackageNames(receiver: GoPtr<Program>): GoPtr<Set<string>> {
  return Program_collectPackageNames(receiver)!.deepImportPackages;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.collectPackageNames","kind":"method","status":"implemented","sigHash":"48bd1d40dc59b3b222b445f4d905a5c7b6991751c29cfadbed625d7869a41037"}
 *
 * Go source:
 * func (p *Program) collectPackageNames() *packageNamesInfo {
 * 	return p.packageNames.getValue(func() *packageNamesInfo {
 * 		packageNames := &packageNamesInfo{&collections.Set[string]{}, &collections.Set[string]{}, &collections.Set[string]{}}
 * 		for _, file := range p.files {
 * 			if p.IsSourceFileDefaultLibrary(file.Path()) || p.IsSourceFileFromExternalLibrary(file) || strings.Contains(file.FileName(), "/node_modules/") {
 * 				// Checking for /node_modules/ is a little imprecise, but ATA treats locally installed typings
 * 				// as root files, which would not pass IsSourceFileFromExternalLibrary.
 * 				continue
 * 			}
 * 			for _, imp := range file.Imports() {
 * 				if tspath.IsExternalModuleNameRelative(imp.Text()) {
 * 					continue
 * 				}
 * 				if resolvedModules, ok := p.resolvedModules[file.Path()]; ok {
 * 					key := module.ModeAwareCacheKey{Name: imp.Text(), Mode: p.GetModeForUsageLocation(file, imp)}
 * 					if resolvedModule, ok := resolvedModules[key]; ok && resolvedModule.IsResolved() {
 * 						if !resolvedModule.IsExternalLibraryImport {
 * 							continue
 * 						}
 * 						// Priority order for getting package name:
 * 						// 1. PackageId.Name (requires both name and version in package.json)
 * 						name := resolvedModule.PackageId.Name
 * 						if name == "" {
 * 							// 2. GetPackageScopeForPath - get name from package.json in the package directory
 * 							if packageScope := p.resolver.GetPackageScopeForPath(resolvedModule.ResolvedFileName); packageScope != nil && packageScope.Exists() {
 * 								if scopeName, ok := packageScope.Contents.Name.GetValue(); ok {
 * 									name = scopeName
 * 								}
 * 							}
 * 						}
 * 						if name == "" {
 * 							// 3. GetPackageNameFromDirectory - extract from node_modules path
 * 							name = modulespecifiers.GetPackageNameFromDirectory(resolvedModule.ResolvedFileName)
 * 						}
 * 						// 4. If all fail, don't add empty string
 * 						if name != "" {
 * 							packageNames.resolved.Add(name)
 * 							// Detect deep imports: subpath imports in packages without exports.
 * 							// These are imports like "lodash/fp" where the package has no exports
 * 							// map, so auto-import can only find them via recursive directory search.
 * 							_, rest := module.ParsePackageName(imp.Text())
 * 							if rest != "" {
 * 								if scope := p.resolver.GetPackageScopeForPath(resolvedModule.ResolvedFileName); scope != nil && scope.Exists() && !scope.Contents.Exports.IsPresent() {
 * 									packageNames.deepImportPackages.Add(module.GetPackageNameFromTypesPackageName(name))
 * 								}
 * 							}
 * 						}
 * 						continue
 * 					}
 * 				}
 * 				packageNames.unresolved.Add(imp.Text())
 * 			}
 * 		}
 * 		return packageNames
 * 	})
 * }
 */
export function Program_collectPackageNames(receiver: GoPtr<Program>): GoPtr<packageNamesInfo> {
  return lazyValue_getValue(receiver!.packageNames, () => {
    const packageNames: packageNamesInfo = {
      resolved: { M: new globalThis.Map<string, { readonly __tsgoEmpty?: never }>() },
      unresolved: { M: new globalThis.Map<string, { readonly __tsgoEmpty?: never }>() },
      deepImportPackages: { M: new globalThis.Map<string, { readonly __tsgoEmpty?: never }>() },
    };
    for (const file of receiver!.__tsgoEmbedded0!.files) {
      if (
        Program_IsSourceFileDefaultLibrary(receiver, SourceFile_Path(file)) ||
        Program_IsSourceFileFromExternalLibrary(receiver, file) ||
        SourceFile_FileName(file).includes("/node_modules/")
      ) {
        continue;
      }
      for (const imp of (SourceFile_Imports(file) ?? [])) {
        const impText = Node_Text(imp);
        if (IsExternalModuleNameRelative(impText)) {
          continue;
        }
        const resolvedModules = receiver!.__tsgoEmbedded0!.resolvedModules.get(SourceFile_Path(file));
        if (resolvedModules !== undefined) {
          const mode = Program_GetModeForUsageLocation(receiver, SourceFile_as_ast_HasFileName(file), imp as unknown as GoPtr<StringLiteralLike>);
          let resolvedModule: unknown = undefined;
          for (const [k, v] of resolvedModules) {
            if (k.Name === impText && k.Mode === mode) {
              resolvedModule = v;
              break;
            }
          }
          if (resolvedModule !== undefined && ResolvedModule_IsResolved(resolvedModule as GoPtr<ResolvedModule>)) {
            const mod = resolvedModule as GoPtr<ResolvedModule>;
            if (!mod!.IsExternalLibraryImport) {
              continue;
            }
            let name = mod!.PackageId !== undefined ? mod!.PackageId.Name : "";
            if (name === "") {
              const packageScope = Resolver_GetPackageScopeForPath(receiver!.__tsgoEmbedded0!.resolver, mod!.ResolvedFileName);
              if (packageScope !== undefined && InfoCacheEntry_Exists(packageScope)) {
                const contents = InfoCacheEntry_GetContents(packageScope);
                if (contents !== undefined && contents!.__tsgoEmbedded0 !== undefined && contents!.__tsgoEmbedded0!.__tsgoEmbedded0 !== undefined) {
                  const [scopeName, ok] = Expected_GetValue<string>(contents!.__tsgoEmbedded0!.__tsgoEmbedded0!.Name);
                  if (ok) {
                    name = scopeName;
                  }
                }
              }
            }
            if (name === "") {
              name = GetPackageNameFromDirectory(mod!.ResolvedFileName);
            }
            if (name !== "") {
              Set_Add(packageNames.resolved!, name, GoStringKey);
              // Detect deep imports: subpath imports in packages without exports.
              // These are imports like "lodash/fp" where the package has no exports
              // map, so auto-import can only find them via recursive directory search.
              const [, rest] = ParsePackageName(impText);
              if (rest !== "") {
                const scope = Resolver_GetPackageScopeForPath(receiver!.__tsgoEmbedded0!.resolver, mod!.ResolvedFileName);
                if (scope !== undefined && InfoCacheEntry_Exists(scope)) {
                  const scopeContents = InfoCacheEntry_GetContents(scope);
                  if (
                    scopeContents !== undefined &&
                    scopeContents!.__tsgoEmbedded0 !== undefined &&
                    scopeContents!.__tsgoEmbedded0!.__tsgoEmbedded1 !== undefined &&
                    !JSONValue_IsPresent(scopeContents!.__tsgoEmbedded0!.__tsgoEmbedded1!.Exports.__tsgoEmbedded0)
                  ) {
                    Set_Add(packageNames.deepImportPackages!, GetPackageNameFromTypesPackageName(name), GoStringKey);
                  }
                }
              }
            }
            continue;
          }
        }
        Set_Add(packageNames.unresolved!, impText, GoStringKey);
      }
    }
    return GoValueRef(packageNames);
  })!.v;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.IsLibFile","kind":"method","status":"implemented","sigHash":"a1329db2cd0433236a96806172e5409b6da0f5539b315ee486aa39d1a8b14c87"}
 *
 * Go source:
 * func (p *Program) IsLibFile(sourceFile *ast.SourceFile) bool {
 * 	_, ok := p.libFiles[sourceFile.Path()]
 * 	return ok
 * }
 */
export function Program_IsLibFile(receiver: GoPtr<Program>, sourceFile: GoPtr<SourceFile>): bool {
  return receiver!.__tsgoEmbedded0!.libFiles.has(SourceFile_Path(sourceFile)) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.HasTSFile","kind":"method","status":"implemented","sigHash":"daa0d52b9d2c75eef5437ddef5cbff5d77738e46410a079e9216c1c3b828fd74"}
 *
 * Go source:
 * func (p *Program) HasTSFile() bool {
 * 	p.hasTSFileOnce.Do(func() {
 * 		for _, file := range p.files {
 * 			if tspath.HasImplementationTSFileExtension(file.FileName()) {
 * 				p.hasTSFile = true
 * 				break
 * 			}
 * 		}
 * 	})
 * 	return p.hasTSFile
 * }
 */
export function Program_HasTSFile(receiver: GoPtr<Program>): bool {
  receiver!.hasTSFileOnce.Do(() => {
    for (const file of receiver!.__tsgoEmbedded0!.files) {
      if (HasImplementationTSFileExtension(SourceFile_FileName(file))) {
        receiver!.hasTSFile = true as bool;
        break;
      }
    }
  });
  return receiver!.hasTSFile;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.GetSymlinkCache","kind":"method","status":"implemented","sigHash":"4c5876cf3bd9e74ae4f0a799368a3cb07a3e5e11b174ed412544e58588d9fb62"}
 *
 * Go source:
 * func (p *Program) GetSymlinkCache() *symlinks.KnownSymlinks {
 * 	return p.knownSymlinks.getValue(func() *symlinks.KnownSymlinks {
 * 		knownSymlinks := symlinks.NewKnownSymlink(p.GetCurrentDirectory(), p.UseCaseSensitiveFileNames())
 * 
 * 		// Resolved modules store realpath information when they're resolved inside node_modules
 * 		if len(p.resolvedModules) > 0 || len(p.typeResolutionsInFile) > 0 {
 * 			knownSymlinks.SetSymlinksFromResolutions(p.ForEachResolvedModule, p.ForEachResolvedTypeReferenceDirective)
 * 		}
 * 
 * 		// Check other dependencies for symlinks
 * 		var seenPackageJsons collections.Set[tspath.Path]
 * 		for filePath, meta := range p.sourceFileMetaDatas {
 * 			if meta.PackageJsonDirectory == "" ||
 * 				!p.SourceFileMayBeEmitted(p.GetSourceFileByPath(filePath), false) ||
 * 				!seenPackageJsons.AddIfAbsent(p.toPath(meta.PackageJsonDirectory)) {
 * 				continue
 * 			}
 * 			packageJsonName := tspath.CombinePaths(meta.PackageJsonDirectory, "package.json")
 * 			info := p.GetPackageJsonInfo(packageJsonName)
 * 			if info.GetContents() == nil {
 * 				continue
 * 			}
 * 
 * 			for dep := range info.GetContents().GetRuntimeDependencyNames().Keys() {
 * 				// Skip work in common case: we already saved a symlink for this package directory
 * 				// in the node_modules adjacent to this package.json
 * 				possibleDirectoryPath := p.toPath(tspath.CombinePaths(meta.PackageJsonDirectory, "node_modules", dep))
 * 				if knownSymlinks.HasDirectory(possibleDirectoryPath) {
 * 					continue
 * 				}
 * 				if !strings.HasPrefix(dep, "@types") {
 * 					possibleTypesDirectoryPath := p.toPath(tspath.CombinePaths(meta.PackageJsonDirectory, "node_modules", module.GetTypesPackageName(dep)))
 * 					if knownSymlinks.HasDirectory(possibleTypesDirectoryPath) {
 * 						continue
 * 					}
 * 				}
 * 
 * 				if packageResolution := p.resolver.ResolvePackageDirectory(dep, packageJsonName, core.ResolutionModeCommonJS, nil); packageResolution.IsResolved() {
 * 					knownSymlinks.ProcessResolution(
 * 						tspath.CombinePaths(packageResolution.OriginalPath, "package.json"),
 * 						tspath.CombinePaths(packageResolution.ResolvedFileName, "package.json"),
 * 					)
 * 				}
 * 			}
 * 		}
 * 		return knownSymlinks
 * 	})
 * }
 */
export function Program_GetSymlinkCache(receiver: GoPtr<Program>): GoPtr<KnownSymlinks> {
  return lazyValue_getValue(receiver!.knownSymlinks, () => {
    const knownSymlinks = NewKnownSymlink(Program_GetCurrentDirectory(receiver), Program_UseCaseSensitiveFileNames(receiver));

    if (receiver!.__tsgoEmbedded0!.resolvedModules.size > 0 || receiver!.__tsgoEmbedded0!.typeResolutionsInFile.size > 0) {
      KnownSymlinks_SetSymlinksFromResolutions(
        knownSymlinks,
        (cb, file) => Program_ForEachResolvedModule(receiver, cb, file),
        (cb, file) => Program_ForEachResolvedTypeReferenceDirective(receiver, cb, file),
      );
    }

    const seenPackageJsons: Set<Path> = { M: new globalThis.Map<Path, { readonly __tsgoEmpty?: never }>() };
    for (const [filePath, meta] of receiver!.__tsgoEmbedded0!.sourceFileMetaDatas) {
      if (
        meta.PackageJsonDirectory === "" ||
        !Program_SourceFileMayBeEmitted(receiver, Program_GetSourceFileByPath(receiver, filePath), false as bool) ||
        !Set_AddIfAbsent(seenPackageJsons, Program_toPath(receiver, meta.PackageJsonDirectory), GoStringKey)
      ) {
        continue;
      }
      const packageJsonName = CombinePaths(meta.PackageJsonDirectory, "package.json");
      const info = Program_GetPackageJsonInfo(receiver, packageJsonName);
      if (InfoCacheEntry_GetContents(info) === undefined) {
        continue;
      }

      const contents = InfoCacheEntry_GetContents(info)!;
      const depFields = contents.__tsgoEmbedded0?.__tsgoEmbedded2;
      if (depFields === undefined) {
        continue;
      }
      const runtimeDeps = DependencyFields_GetRuntimeDependencyNames(depFields);
      for (const depUnknown of Set_Keys(runtimeDeps).keys()) {
        const dep = depUnknown as string;
        const possibleDirectoryPath = Program_toPath(receiver, CombinePaths(meta.PackageJsonDirectory, "node_modules", dep));
        if (KnownSymlinks_HasDirectory(knownSymlinks, possibleDirectoryPath)) {
          continue;
        }
        if (!dep.startsWith("@types")) {
          const possibleTypesDirectoryPath = Program_toPath(receiver, CombinePaths(meta.PackageJsonDirectory, "node_modules", GetTypesPackageName(dep)));
          if (KnownSymlinks_HasDirectory(knownSymlinks, possibleTypesDirectoryPath)) {
            continue;
          }
        }

        const packageResolution = Resolver_ResolvePackageDirectory(receiver!.__tsgoEmbedded0!.resolver, dep, packageJsonName, ResolutionModeCommonJS, undefined);
        if (packageResolution !== undefined && ResolvedModule_IsResolved(packageResolution as GoPtr<ResolvedModule>)) {
          const resolved = packageResolution as GoPtr<ResolvedModule>;
          KnownSymlinks_ProcessResolution(
            knownSymlinks,
            CombinePaths(resolved!.OriginalPath, "package.json"),
            CombinePaths(resolved!.ResolvedFileName, "package.json"),
          );
        }
      }
    }
    return GoValueRef(knownSymlinks!);
  })!.v;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.ResolveModuleName","kind":"method","status":"implemented","sigHash":"8dda9fc3b8a83d8df64d2a67fc34ed6e037084e40e6361cc83e850b523540c03"}
 *
 * Go source:
 * func (p *Program) ResolveModuleName(moduleName string, containingFile string, resolutionMode core.ResolutionMode) *module.ResolvedModule {
 * 	resolved, _ := p.resolver.ResolveModuleName(moduleName, containingFile, resolutionMode, nil)
 * 	return resolved
 * }
 */
export function Program_ResolveModuleName(receiver: GoPtr<Program>, moduleName: string, containingFile: string, resolutionMode: ResolutionMode): GoPtr<ResolvedModule> {
  const [resolved] = Resolver_ResolveModuleName(receiver!.__tsgoEmbedded0!.resolver, moduleName, containingFile, resolutionMode, undefined);
  return resolved;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.ForEachResolvedModule","kind":"method","status":"implemented","sigHash":"fd6993e3483550000e477f723fb21fbc3a793b9f704d3fad95d86d16fec33d4e"}
 *
 * Go source:
 * func (p *Program) ForEachResolvedModule(callback func(resolution *module.ResolvedModule, moduleName string, mode core.ResolutionMode, filePath tspath.Path), file *ast.SourceFile) {
 * 	forEachResolution(p.resolvedModules, callback, file)
 * }
 */
export function Program_ForEachResolvedModule(receiver: GoPtr<Program>, callback: GoFunc<(resolution: GoPtr<ResolvedModule>, moduleName: string, mode: ResolutionMode, filePath: Path) => void>, file: GoPtr<SourceFile>): void {
  forEachResolution<GoPtr<ResolvedModule>>(receiver!.__tsgoEmbedded0!.resolvedModules, callback, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::method::Program.ForEachResolvedTypeReferenceDirective","kind":"method","status":"implemented","sigHash":"195a83c38de7c14d24c816cf3628f62f60a1d2f9d043270b6bb985af3f2e7dcc"}
 *
 * Go source:
 * func (p *Program) ForEachResolvedTypeReferenceDirective(callback func(resolution *module.ResolvedTypeReferenceDirective, moduleName string, mode core.ResolutionMode, filePath tspath.Path), file *ast.SourceFile) {
 * 	forEachResolution(p.typeResolutionsInFile, callback, file)
 * }
 */
export function Program_ForEachResolvedTypeReferenceDirective(receiver: GoPtr<Program>, callback: GoFunc<(resolution: GoPtr<ResolvedTypeReferenceDirective>, moduleName: string, mode: ResolutionMode, filePath: Path) => void>, file: GoPtr<SourceFile>): void {
  forEachResolution<GoPtr<ResolvedTypeReferenceDirective>>(receiver!.__tsgoEmbedded0!.typeResolutionsInFile, callback, file);
}

/**
 * Port note: upstream implementation source follows.
 *
 * Go source:
 * func forEachResolution[T any](resolutionCache map[tspath.Path]module.ModeAwareCache[T], callback func(resolution T, moduleName string, mode core.ResolutionMode, filePath tspath.Path), file *ast.SourceFile) {
 * 	if file != nil {
 * 		if resolutions, ok := resolutionCache[file.Path()]; ok {
 * 			for key, resolution := range resolutions {
 * 				callback(resolution, key.Name, key.Mode, file.Path())
 * 			}
 * 		}
 * 	} else {
 * 		for filePath, resolutions := range resolutionCache {
 * 			for key, resolution := range resolutions {
 * 				callback(resolution, key.Name, key.Mode, filePath)
 * 			}
 * 		}
 * 	}
 * }
 */
const emptyResolutionCache: GoMap<Path, ModeAwareCache<unknown>> = new globalThis.Map<Path, ModeAwareCache<unknown>>();
const emptyModeAwareCache: ModeAwareCache<unknown> = NewGoStructMap<ModeAwareCacheKey, unknown>(GoStructKey(
  [GoStructField((value: ModeAwareCacheKey) => value.Name, GoStringKey), GoStructField((value: ModeAwareCacheKey) => value.Mode, GoNumberKey)],
  ([Name, Mode]) => ({ Name, Mode }),
));

const goMapEntries = <K, V>(map: GoMap<K, V> | undefined, empty: GoMap<K, V>): Iterable<[K, V]> =>
  map !== undefined ? map : empty;

const resolutionCacheEntries = <T>(resolutionCache: GoMap<Path, ModeAwareCache<T>> | undefined): Iterable<[Path, ModeAwareCache<T>]> =>
  goMapEntries(resolutionCache, emptyResolutionCache as GoMap<Path, ModeAwareCache<T>>);

const modeAwareCacheEntries = <T>(modeAwareCache: ModeAwareCache<T> | undefined): Iterable<[ModeAwareCacheKey, T]> =>
  goMapEntries(modeAwareCache, emptyModeAwareCache as ModeAwareCache<T>);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::func::forEachResolution","kind":"func","status":"implemented","sigHash":"81ad1e76a1bc9f4c9a1cfccfabf6ff831d6183bed38698ac95e80a7c0786dead"}
 */
export function forEachResolution<T>(resolutionCache: GoMap<Path, ModeAwareCache<T>>, callback: GoFunc<(resolution: T, moduleName: string, mode: ResolutionMode, filePath: Path) => void>, file: GoPtr<SourceFile>): void {
  if (file !== undefined) {
    const resolutions = resolutionCache.get(SourceFile_Path(file));
    for (const [key, resolution] of modeAwareCacheEntries(resolutions)) {
      callback!(resolution, key.Name, key.Mode, SourceFile_Path(file));
    }
  } else {
    for (const [filePath, resolutions] of resolutionCacheEntries(resolutionCache)) {
      for (const [key, resolution] of modeAwareCacheEntries(resolutions)) {
        callback!(resolution, key.Name, key.Mode, filePath);
      }
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/program.go::varGroup::plainJSErrors","kind":"varGroup","status":"implemented","sigHash":"f55145f3906b495bb0164c522458cdc580f30a349f9018d3b5169e2e2db37142"}
 *
 * Go source:
 * var plainJSErrors = collections.NewSetFromItems(
 * 	// binder errors
 * 	diagnostics.Cannot_redeclare_block_scoped_variable_0.Code(),
 * 	diagnostics.A_module_cannot_have_multiple_default_exports.Code(),
 * 	diagnostics.Another_export_default_is_here.Code(),
 * 	diagnostics.The_first_export_default_is_here.Code(),
 * 	diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module.Code(),
 * 	diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode.Code(),
 * 	diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here.Code(),
 * 	diagnostics.X_constructor_is_a_reserved_word.Code(),
 * 	diagnostics.X_delete_cannot_be_called_on_an_identifier_in_strict_mode.Code(),
 * 	diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode.Code(),
 * 	diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode.Code(),
 * 	diagnostics.Invalid_use_of_0_in_strict_mode.Code(),
 * 	diagnostics.A_label_is_not_allowed_here.Code(),
 * 	diagnostics.X_with_statements_are_not_allowed_in_strict_mode.Code(),
 * 	// grammar errors
 * 	diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement.Code(),
 * 	diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement.Code(),
 * 	diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name.Code(),
 * 	diagnostics.A_class_member_cannot_have_the_0_keyword.Code(),
 * 	diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name.Code(),
 * 	diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement.Code(),
 * 	diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement.Code(),
 * 	diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement.Code(),
 * 	diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration.Code(),
 * 	diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context.Code(),
 * 	diagnostics.A_destructuring_declaration_must_have_an_initializer.Code(),
 * 	diagnostics.A_get_accessor_cannot_have_parameters.Code(),
 * 	diagnostics.A_rest_element_cannot_contain_a_binding_pattern.Code(),
 * 	diagnostics.A_rest_element_cannot_have_a_property_name.Code(),
 * 	diagnostics.A_rest_element_cannot_have_an_initializer.Code(),
 * 	diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern.Code(),
 * 	diagnostics.A_rest_parameter_cannot_have_an_initializer.Code(),
 * 	diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list.Code(),
 * 	diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma.Code(),
 * 	diagnostics.A_return_statement_cannot_be_used_inside_a_class_static_block.Code(),
 * 	diagnostics.A_set_accessor_cannot_have_rest_parameter.Code(),
 * 	diagnostics.A_set_accessor_must_have_exactly_one_parameter.Code(),
 * 	diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module.Code(),
 * 	diagnostics.An_export_declaration_cannot_have_modifiers.Code(),
 * 	diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module.Code(),
 * 	diagnostics.An_import_declaration_cannot_have_modifiers.Code(),
 * 	diagnostics.An_object_member_cannot_be_declared_optional.Code(),
 * 	diagnostics.Argument_of_dynamic_import_cannot_be_spread_element.Code(),
 * 	diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable.Code(),
 * 	diagnostics.Cannot_redeclare_identifier_0_in_catch_clause.Code(),
 * 	diagnostics.Catch_clause_variable_cannot_have_an_initializer.Code(),
 * 	diagnostics.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator.Code(),
 * 	diagnostics.Classes_can_only_extend_a_single_class.Code(),
 * 	diagnostics.Classes_may_not_have_a_field_named_constructor.Code(),
 * 	diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.Code(),
 * 	diagnostics.Duplicate_label_0.Code(),
 * 	diagnostics.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_set_of_attributes_as_arguments.Code(),
 * 	diagnostics.X_for_await_loops_cannot_be_used_inside_a_class_static_block.Code(),
 * 	diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression.Code(),
 * 	diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name.Code(),
 * 	diagnostics.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array.Code(),
 * 	diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names.Code(),
 * 	diagnostics.Jump_target_cannot_cross_function_boundary.Code(),
 * 	diagnostics.Line_terminator_not_permitted_before_arrow.Code(),
 * 	diagnostics.Modifiers_cannot_appear_here.Code(),
 * 	diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement.Code(),
 * 	diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement.Code(),
 * 	diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies.Code(),
 * 	diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression.Code(),
 * 	diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier.Code(),
 * 	diagnostics.Tagged_template_expressions_are_not_permitted_in_an_optional_chain.Code(),
 * 	diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async.Code(),
 * 	diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer.Code(),
 * 	diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer.Code(),
 * 	diagnostics.Trailing_comma_not_allowed.Code(),
 * 	diagnostics.Variable_declaration_list_cannot_be_empty.Code(),
 * 	diagnostics.X_0_and_1_operations_cannot_be_mixed_without_parentheses.Code(),
 * 	diagnostics.X_0_expected.Code(),
 * 	diagnostics.X_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2.Code(),
 * 	diagnostics.X_0_list_cannot_be_empty.Code(),
 * 	diagnostics.X_0_modifier_already_seen.Code(),
 * 	diagnostics.X_0_modifier_cannot_appear_on_a_constructor_declaration.Code(),
 * 	diagnostics.X_0_modifier_cannot_appear_on_a_module_or_namespace_element.Code(),
 * 	diagnostics.X_0_modifier_cannot_appear_on_a_parameter.Code(),
 * 	diagnostics.X_0_modifier_cannot_appear_on_class_elements_of_this_kind.Code(),
 * 	diagnostics.X_0_modifier_cannot_be_used_here.Code(),
 * 	diagnostics.X_0_modifier_must_precede_1_modifier.Code(),
 * 	diagnostics.X_0_declarations_can_only_be_declared_inside_a_block.Code(),
 * 	diagnostics.X_0_declarations_must_be_initialized.Code(),
 * 	diagnostics.X_extends_clause_already_seen.Code(),
 * 	diagnostics.X_let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations.Code(),
 * 	diagnostics.Class_constructor_may_not_be_a_generator.Code(),
 * 	diagnostics.Class_constructor_may_not_be_an_accessor.Code(),
 * 	diagnostics.X_await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.Code(),
 * 	diagnostics.X_await_using_statements_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.Code(),
 * 	diagnostics.Private_field_0_must_be_declared_in_an_enclosing_class.Code(),
 * 	// Type errors
 * 	diagnostics.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value.Code(),
 * )
 */
export let plainJSErrors: GoPtr<Set<int>> = NewSetFromItems<int>(
  GoNumberKey,
  // binder errors
  diagnostics.Cannot_redeclare_block_scoped_variable_0.code,
  diagnostics.A_module_cannot_have_multiple_default_exports.code,
  diagnostics.Another_export_default_is_here.code,
  diagnostics.The_first_export_default_is_here.code,
  diagnostics.Identifier_expected_0_is_a_reserved_word_at_the_top_level_of_a_module.code,
  diagnostics.Identifier_expected_0_is_a_reserved_word_in_strict_mode_Modules_are_automatically_in_strict_mode.code,
  diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here.code,
  diagnostics.X_constructor_is_a_reserved_word.code,
  diagnostics.X_delete_cannot_be_called_on_an_identifier_in_strict_mode.code,
  diagnostics.Code_contained_in_a_class_is_evaluated_in_JavaScript_s_strict_mode_which_does_not_allow_this_use_of_0_For_more_information_see_https_Colon_Slash_Slashdeveloper_mozilla_org_Slashen_US_Slashdocs_SlashWeb_SlashJavaScript_SlashReference_SlashStrict_mode.code,
  diagnostics.Invalid_use_of_0_Modules_are_automatically_in_strict_mode.code,
  diagnostics.Invalid_use_of_0_in_strict_mode.code,
  diagnostics.A_label_is_not_allowed_here.code,
  diagnostics.X_with_statements_are_not_allowed_in_strict_mode.code,
  // grammar errors
  diagnostics.A_break_statement_can_only_be_used_within_an_enclosing_iteration_or_switch_statement.code,
  diagnostics.A_break_statement_can_only_jump_to_a_label_of_an_enclosing_statement.code,
  diagnostics.A_class_declaration_without_the_default_modifier_must_have_a_name.code,
  diagnostics.A_class_member_cannot_have_the_0_keyword.code,
  diagnostics.A_comma_expression_is_not_allowed_in_a_computed_property_name.code,
  diagnostics.A_continue_statement_can_only_be_used_within_an_enclosing_iteration_statement.code,
  diagnostics.A_continue_statement_can_only_jump_to_a_label_of_an_enclosing_iteration_statement.code,
  diagnostics.A_default_clause_cannot_appear_more_than_once_in_a_switch_statement.code,
  diagnostics.A_default_export_must_be_at_the_top_level_of_a_file_or_module_declaration.code,
  diagnostics.A_definite_assignment_assertion_is_not_permitted_in_this_context.code,
  diagnostics.A_destructuring_declaration_must_have_an_initializer.code,
  diagnostics.A_get_accessor_cannot_have_parameters.code,
  diagnostics.A_rest_element_cannot_contain_a_binding_pattern.code,
  diagnostics.A_rest_element_cannot_have_a_property_name.code,
  diagnostics.A_rest_element_cannot_have_an_initializer.code,
  diagnostics.A_rest_element_must_be_last_in_a_destructuring_pattern.code,
  diagnostics.A_rest_parameter_cannot_have_an_initializer.code,
  diagnostics.A_rest_parameter_must_be_last_in_a_parameter_list.code,
  diagnostics.A_rest_parameter_or_binding_pattern_may_not_have_a_trailing_comma.code,
  diagnostics.A_return_statement_cannot_be_used_inside_a_class_static_block.code,
  diagnostics.A_set_accessor_cannot_have_rest_parameter.code,
  diagnostics.A_set_accessor_must_have_exactly_one_parameter.code,
  diagnostics.An_export_declaration_can_only_be_used_at_the_top_level_of_a_module.code,
  diagnostics.An_export_declaration_cannot_have_modifiers.code,
  diagnostics.An_import_declaration_can_only_be_used_at_the_top_level_of_a_module.code,
  diagnostics.An_import_declaration_cannot_have_modifiers.code,
  diagnostics.An_object_member_cannot_be_declared_optional.code,
  diagnostics.Argument_of_dynamic_import_cannot_be_spread_element.code,
  diagnostics.Cannot_assign_to_private_method_0_Private_methods_are_not_writable.code,
  diagnostics.Cannot_redeclare_identifier_0_in_catch_clause.code,
  diagnostics.Catch_clause_variable_cannot_have_an_initializer.code,
  diagnostics.Class_decorators_can_t_be_used_with_static_private_identifier_Consider_removing_the_experimental_decorator.code,
  diagnostics.Classes_can_only_extend_a_single_class.code,
  diagnostics.Classes_may_not_have_a_field_named_constructor.code,
  diagnostics.Did_you_mean_to_use_a_Colon_An_can_only_follow_a_property_name_when_the_containing_object_literal_is_part_of_a_destructuring_pattern.code,
  diagnostics.Duplicate_label_0.code,
  diagnostics.Dynamic_imports_can_only_accept_a_module_specifier_and_an_optional_set_of_attributes_as_arguments.code,
  diagnostics.X_for_await_loops_cannot_be_used_inside_a_class_static_block.code,
  diagnostics.JSX_attributes_must_only_be_assigned_a_non_empty_expression.code,
  diagnostics.JSX_elements_cannot_have_multiple_attributes_with_the_same_name.code,
  diagnostics.JSX_expressions_may_not_use_the_comma_operator_Did_you_mean_to_write_an_array.code,
  diagnostics.JSX_property_access_expressions_cannot_include_JSX_namespace_names.code,
  diagnostics.Jump_target_cannot_cross_function_boundary.code,
  diagnostics.Line_terminator_not_permitted_before_arrow.code,
  diagnostics.Modifiers_cannot_appear_here.code,
  diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_in_statement.code,
  diagnostics.Only_a_single_variable_declaration_is_allowed_in_a_for_of_statement.code,
  diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies.code,
  diagnostics.Private_identifiers_are_only_allowed_in_class_bodies_and_may_only_be_used_as_part_of_a_class_member_declaration_property_access_or_on_the_left_hand_side_of_an_in_expression.code,
  diagnostics.Property_0_is_not_accessible_outside_class_1_because_it_has_a_private_identifier.code,
  diagnostics.Tagged_template_expressions_are_not_permitted_in_an_optional_chain.code,
  diagnostics.The_left_hand_side_of_a_for_of_statement_may_not_be_async.code,
  diagnostics.The_variable_declaration_of_a_for_in_statement_cannot_have_an_initializer.code,
  diagnostics.The_variable_declaration_of_a_for_of_statement_cannot_have_an_initializer.code,
  diagnostics.Trailing_comma_not_allowed.code,
  diagnostics.Variable_declaration_list_cannot_be_empty.code,
  diagnostics.X_0_and_1_operations_cannot_be_mixed_without_parentheses.code,
  diagnostics.X_0_expected.code,
  diagnostics.X_0_is_not_a_valid_meta_property_for_keyword_1_Did_you_mean_2.code,
  diagnostics.X_0_list_cannot_be_empty.code,
  diagnostics.X_0_modifier_already_seen.code,
  diagnostics.X_0_modifier_cannot_appear_on_a_constructor_declaration.code,
  diagnostics.X_0_modifier_cannot_appear_on_a_module_or_namespace_element.code,
  diagnostics.X_0_modifier_cannot_appear_on_a_parameter.code,
  diagnostics.X_0_modifier_cannot_appear_on_class_elements_of_this_kind.code,
  diagnostics.X_0_modifier_cannot_be_used_here.code,
  diagnostics.X_0_modifier_must_precede_1_modifier.code,
  diagnostics.X_0_declarations_can_only_be_declared_inside_a_block.code,
  diagnostics.X_0_declarations_must_be_initialized.code,
  diagnostics.X_extends_clause_already_seen.code,
  diagnostics.X_let_is_not_allowed_to_be_used_as_a_name_in_let_or_const_declarations.code,
  diagnostics.Class_constructor_may_not_be_a_generator.code,
  diagnostics.Class_constructor_may_not_be_an_accessor.code,
  diagnostics.X_await_expressions_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.code,
  diagnostics.X_await_using_statements_are_only_allowed_within_async_functions_and_at_the_top_levels_of_modules.code,
  diagnostics.Private_field_0_must_be_declared_in_an_enclosing_class.code,
  // Type errors
  diagnostics.This_condition_will_always_return_0_since_JavaScript_compares_objects_by_reference_not_value.code,
);
