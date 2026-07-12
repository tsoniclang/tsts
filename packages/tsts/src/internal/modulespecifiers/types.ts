import type { bool, byte } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import type { HasFileName, Node, StringLiteralLike } from "../ast/ast.js";
import type { Symbol } from "../ast/symbol.js";
import type { ResolutionMode } from "../core/compileroptions.js";
import type { ResolvedModule } from "../module/types.js";
import type { InfoCacheEntry } from "../packagejson/cache.js";
import type { KnownSymlinks } from "../symlinks/knownsymlinks.js";
import type { SourceOutputAndProjectReference } from "../tsoptions/parsedcommandline.js";
import type { Path } from "../tspath/path.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::SourceFileForSpecifierGeneration","kind":"type","status":"implemented","sigHash":"22e224940624792a0cfee19756d39bf4642a6e5b3b4f57eb206205843770bbfa"}
 *
 * Go source:
 * SourceFileForSpecifierGeneration interface {
 * 	Path() tspath.Path
 * 	FileName() string
 * 	Imports() []*ast.StringLiteralLike
 * 	IsJS() bool
 * }
 */
export interface SourceFileForSpecifierGeneration {
  Path(): Path;
  FileName(): string;
  Imports(): GoSlice<GoPtr<StringLiteralLike>>;
  IsJS(): bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::CheckerShape","kind":"type","status":"implemented","sigHash":"c66e72683096011e09c33607e8a7a59724e06b514651dfbb04b177edee5f1d89"}
 *
 * Go source:
 * CheckerShape interface {
 * 	GetSymbolAtLocation(node *ast.Node) *ast.Symbol
 * 	GetAliasedSymbol(symbol *ast.Symbol) *ast.Symbol
 * }
 */
export interface CheckerShape {
  GetSymbolAtLocation(node: GoPtr<Node>): GoPtr<Symbol>;
  GetAliasedSymbol(symbol_: GoPtr<Symbol>): GoPtr<Symbol>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ResultKind","kind":"type","status":"implemented","sigHash":"44d9b5a5b5c1560f4295c0b452af50ca4990d6c5c2aedc303c16ac30adbe8d40"}
 *
 * Go source:
 * ResultKind uint8
 */
export type ResultKind = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ResultKindNone+ResultKindNodeModules+ResultKindPaths+ResultKindRedirect+ResultKindRelative+ResultKindAmbient","kind":"constGroup","status":"implemented","sigHash":"c6a0ef9c3669f1b23224039ce4ce7a7a00d3778fbbc97c0f2659d8bb15029aad"}
 *
 * Go source:
 * const (
 * 	ResultKindNone ResultKind = iota
 * 	ResultKindNodeModules
 * 	ResultKindPaths
 * 	ResultKindRedirect
 * 	ResultKindRelative
 * 	ResultKindAmbient
 * )
 */
export const ResultKindNone: ResultKind = 0 as ResultKind;
export const ResultKindNodeModules: ResultKind = 1 as ResultKind;
export const ResultKindPaths: ResultKind = 2 as ResultKind;
export const ResultKindRedirect: ResultKind = 3 as ResultKind;
export const ResultKindRelative: ResultKind = 4 as ResultKind;
export const ResultKindAmbient: ResultKind = 5 as ResultKind;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModulePath","kind":"type","status":"implemented","sigHash":"dd99fef1d29d5304b1ed8a57c7629ca7626d7f6ed919ad1cd77e7a4b9c4aaaba"}
 *
 * Go source:
 * ModulePath struct {
 * 	FileName        string
 * 	IsInNodeModules bool
 * 	IsRedirect      bool
 * }
 */
export interface ModulePath {
  FileName: string;
  IsInNodeModules: bool;
  IsRedirect: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModuleSpecifierGenerationHost","kind":"type","status":"implemented","sigHash":"50f5b1f95682414caa3bb033cf960e8248910fd40b482031a2b1a4b34f49449b"}
 *
 * Go source:
 * ModuleSpecifierGenerationHost interface {
 * 	// GetModuleResolutionCache() any // !!! TODO: adapt new resolution cache model
 * 	GetSymlinkCache() *symlinks.KnownSymlinks
 * 	// GetFileIncludeReasons() any // !!! TODO: adapt new resolution cache model
 * 	CommonSourceDirectory() string
 * 	GetGlobalTypingsCacheLocation() string
 * 	UseCaseSensitiveFileNames() bool
 * 	GetCurrentDirectory() string
 * 
 * 	GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference
 * 	GetRedirectTargets(path tspath.Path) []string
 * 	GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string
 * 
 * 	FileExists(path string) bool
 * 
 * 	GetNearestAncestorDirectoryWithPackageJson(dirname string) string
 * 	GetPackageJsonInfo(pkgJsonPath string) *packagejson.InfoCacheEntry
 * 	GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode
 * 	GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule
 * 	GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode
 * }
 */
export interface ModuleSpecifierGenerationHost {
  GetSymlinkCache(): GoPtr<KnownSymlinks>;
  CommonSourceDirectory(): string;
  GetGlobalTypingsCacheLocation(): string;
  UseCaseSensitiveFileNames(): bool;
  GetCurrentDirectory(): string;
  GetProjectReferenceFromSource(path: Path): GoPtr<SourceOutputAndProjectReference>;
  GetRedirectTargets(path: Path): GoSlice<string>;
  GetSourceOfProjectReferenceIfOutputIncluded(file: HasFileName): string;
  FileExists(path: string): bool;
  GetNearestAncestorDirectoryWithPackageJson(dirname: string): string;
  GetPackageJsonInfo(pkgJsonPath: string): GoPtr<InfoCacheEntry>;
  GetDefaultResolutionModeForFile(file: HasFileName): ResolutionMode;
  GetResolvedModuleFromModuleSpecifier(file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule>;
  GetModeForUsageLocation(file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ImportModuleSpecifierPreference","kind":"type","status":"implemented","sigHash":"1e3dc3dcc050093980e02d485848635d0e33245228ccbd3999dd0ff0b6c2bf68"}
 *
 * Go source:
 * ImportModuleSpecifierPreference string
 */
export type ImportModuleSpecifierPreference = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ImportModuleSpecifierPreferenceNone+ImportModuleSpecifierPreferenceShortest+ImportModuleSpecifierPreferenceProjectRelative+ImportModuleSpecifierPreferenceRelative+ImportModuleSpecifierPreferenceNonRelative","kind":"constGroup","status":"implemented","sigHash":"f3476272c68f4df9e63be3e8fcc202567a309efdde8b77f25fbb165105ea895c"}
 *
 * Go source:
 * const (
 * 	ImportModuleSpecifierPreferenceNone            ImportModuleSpecifierPreference = "" // !!!
 * 	ImportModuleSpecifierPreferenceShortest        ImportModuleSpecifierPreference = "shortest"
 * 	ImportModuleSpecifierPreferenceProjectRelative ImportModuleSpecifierPreference = "project-relative"
 * 	ImportModuleSpecifierPreferenceRelative        ImportModuleSpecifierPreference = "relative"
 * 	ImportModuleSpecifierPreferenceNonRelative     ImportModuleSpecifierPreference = "non-relative"
 * )
 */
export const ImportModuleSpecifierPreferenceNone: ImportModuleSpecifierPreference = "";
export const ImportModuleSpecifierPreferenceShortest: ImportModuleSpecifierPreference = "shortest";
export const ImportModuleSpecifierPreferenceProjectRelative: ImportModuleSpecifierPreference = "project-relative";
export const ImportModuleSpecifierPreferenceRelative: ImportModuleSpecifierPreference = "relative";
export const ImportModuleSpecifierPreferenceNonRelative: ImportModuleSpecifierPreference = "non-relative";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ImportModuleSpecifierEndingPreference","kind":"type","status":"implemented","sigHash":"7b3939233c240c0d9e245a6fd3e165d8406b9f62f7c74304898ee6ec9589acae"}
 *
 * Go source:
 * ImportModuleSpecifierEndingPreference string
 */
export type ImportModuleSpecifierEndingPreference = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ImportModuleSpecifierEndingPreferenceNone+ImportModuleSpecifierEndingPreferenceAuto+ImportModuleSpecifierEndingPreferenceMinimal+ImportModuleSpecifierEndingPreferenceIndex+ImportModuleSpecifierEndingPreferenceJs","kind":"constGroup","status":"implemented","sigHash":"7e4744fd28a5524490e31630b74cefeef5776ac4ef0fcdcc4a158c80752b3b1f"}
 *
 * Go source:
 * const (
 * 	ImportModuleSpecifierEndingPreferenceNone    ImportModuleSpecifierEndingPreference = "" // !!!
 * 	ImportModuleSpecifierEndingPreferenceAuto    ImportModuleSpecifierEndingPreference = "auto"
 * 	ImportModuleSpecifierEndingPreferenceMinimal ImportModuleSpecifierEndingPreference = "minimal"
 * 	ImportModuleSpecifierEndingPreferenceIndex   ImportModuleSpecifierEndingPreference = "index"
 * 	ImportModuleSpecifierEndingPreferenceJs      ImportModuleSpecifierEndingPreference = "js"
 * )
 */
export const ImportModuleSpecifierEndingPreferenceNone: ImportModuleSpecifierEndingPreference = "";
export const ImportModuleSpecifierEndingPreferenceAuto: ImportModuleSpecifierEndingPreference = "auto";
export const ImportModuleSpecifierEndingPreferenceMinimal: ImportModuleSpecifierEndingPreference = "minimal";
export const ImportModuleSpecifierEndingPreferenceIndex: ImportModuleSpecifierEndingPreference = "index";
export const ImportModuleSpecifierEndingPreferenceJs: ImportModuleSpecifierEndingPreference = "js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::UserPreferences","kind":"type","status":"implemented","sigHash":"b42bed1b655ef06c9b9fd42b0edab081f2cd4190c0a311a7dd68a265a5623a4f"}
 *
 * Go source:
 * UserPreferences struct {
 * 	ImportModuleSpecifierPreference   ImportModuleSpecifierPreference
 * 	ImportModuleSpecifierEnding       ImportModuleSpecifierEndingPreference
 * 	AutoImportSpecifierExcludeRegexes []string
 * }
 */
export interface UserPreferences {
  ImportModuleSpecifierPreference: ImportModuleSpecifierPreference;
  ImportModuleSpecifierEnding: ImportModuleSpecifierEndingPreference;
  AutoImportSpecifierExcludeRegexes: GoSlice<string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModuleSpecifierOptions","kind":"type","status":"implemented","sigHash":"dbf6ecb578aba301df10434c9d1fb7907514f63f24228494590c43ee7403e877"}
 *
 * Go source:
 * ModuleSpecifierOptions struct {
 * 	OverrideImportMode core.ResolutionMode
 * }
 */
export interface ModuleSpecifierOptions {
  OverrideImportMode: ResolutionMode;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::RelativePreferenceKind","kind":"type","status":"implemented","sigHash":"ada206686c7712fa6f837c9e22906b299f92e2e91597fd6022b9149469f7a7c1"}
 *
 * Go source:
 * RelativePreferenceKind uint8
 */
export type RelativePreferenceKind = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::RelativePreferenceRelative+RelativePreferenceNonRelative+RelativePreferenceShortest+RelativePreferenceExternalNonRelative","kind":"constGroup","status":"implemented","sigHash":"b9e655ccf21382b52721b409695c99000abf15f39938f866aa0e796b824ff024"}
 *
 * Go source:
 * const (
 * 	RelativePreferenceRelative RelativePreferenceKind = iota
 * 	RelativePreferenceNonRelative
 * 	RelativePreferenceShortest
 * 	RelativePreferenceExternalNonRelative
 * )
 */
export const RelativePreferenceRelative: RelativePreferenceKind = 0 as RelativePreferenceKind;
export const RelativePreferenceNonRelative: RelativePreferenceKind = 1 as RelativePreferenceKind;
export const RelativePreferenceShortest: RelativePreferenceKind = 2 as RelativePreferenceKind;
export const RelativePreferenceExternalNonRelative: RelativePreferenceKind = 3 as RelativePreferenceKind;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModuleSpecifierEnding","kind":"type","status":"implemented","sigHash":"eb609658423e0fd281c80c577ccc6390d7cf4916e62af1bb9b86dc885fdfb49c"}
 *
 * Go source:
 * ModuleSpecifierEnding uint8
 */
export type ModuleSpecifierEnding = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ModuleSpecifierEndingMinimal+ModuleSpecifierEndingIndex+ModuleSpecifierEndingJsExtension+ModuleSpecifierEndingTsExtension","kind":"constGroup","status":"implemented","sigHash":"caa71c9344c149dfd20bab01c9eb96978f52ce7c25d0214e986157c3b6714585"}
 *
 * Go source:
 * const (
 * 	ModuleSpecifierEndingMinimal ModuleSpecifierEnding = iota
 * 	ModuleSpecifierEndingIndex
 * 	ModuleSpecifierEndingJsExtension
 * 	ModuleSpecifierEndingTsExtension
 * )
 */
export const ModuleSpecifierEndingMinimal: ModuleSpecifierEnding = 0 as ModuleSpecifierEnding;
export const ModuleSpecifierEndingIndex: ModuleSpecifierEnding = 1 as ModuleSpecifierEnding;
export const ModuleSpecifierEndingJsExtension: ModuleSpecifierEnding = 2 as ModuleSpecifierEnding;
export const ModuleSpecifierEndingTsExtension: ModuleSpecifierEnding = 3 as ModuleSpecifierEnding;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::MatchingMode","kind":"type","status":"implemented","sigHash":"591d0ccd909e1455b59e5f473b9d647fa55cac588c61c4c5c2b89a6b7329da83"}
 *
 * Go source:
 * MatchingMode uint8
 */
export type MatchingMode = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::MatchingModeExact+MatchingModeDirectory+MatchingModePattern","kind":"constGroup","status":"implemented","sigHash":"aeff72ccc58fe336b2db3630d8e70793d5a33b14c34f38c1736d4f3f39deff6f"}
 *
 * Go source:
 * const (
 * 	MatchingModeExact MatchingMode = iota
 * 	MatchingModeDirectory
 * 	MatchingModePattern
 * )
 */
export const MatchingModeExact: MatchingMode = 0 as MatchingMode;
export const MatchingModeDirectory: MatchingMode = 1 as MatchingMode;
export const MatchingModePattern: MatchingMode = 2 as MatchingMode;
