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

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::SourceFileForSpecifierGeneration","kind":"type","status":"implemented","sigHash":"cdfe7411646a80582f7b77fe78efbe50bcfe5e93fcf2304ca1dc25ae71d47927"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::CheckerShape","kind":"type","status":"implemented","sigHash":"7198368fcca43ebbed45c7de16d37883feacb39a3fb5265d35ad25d59ade4048"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ResultKind","kind":"type","status":"implemented","sigHash":"bc43538d35addb3471ae6025b83f44b67ed0475f82054cc8c97724c98df18d84"}
 *
 * Go source:
 * ResultKind uint8
 */
export type ResultKind = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ResultKindNone+ResultKindNodeModules+ResultKindPaths+ResultKindRedirect+ResultKindRelative+ResultKindAmbient","kind":"constGroup","status":"implemented","sigHash":"0fa95ef3df7d3181841effeb1c891174df5290743d2d33b3d42e37b5efda2476"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModulePath","kind":"type","status":"implemented","sigHash":"14690d843b586d8dee8064438d7abae1decc255f1cc83c78ad88d2bed973f6df"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModuleSpecifierGenerationHost","kind":"type","status":"implemented","sigHash":"6c216fdede2ba863cb3501189a8d420cbbc4955b0c691623d48eb7be6d32b74a"}
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
  GetSourceOfProjectReferenceIfOutputIncluded(file: GoInterface<HasFileName>): string;
  FileExists(path: string): bool;
  GetNearestAncestorDirectoryWithPackageJson(dirname: string): string;
  GetPackageJsonInfo(pkgJsonPath: string): GoPtr<InfoCacheEntry>;
  GetDefaultResolutionModeForFile(file: GoInterface<HasFileName>): ResolutionMode;
  GetResolvedModuleFromModuleSpecifier(file: GoInterface<HasFileName>, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule>;
  GetModeForUsageLocation(file: GoInterface<HasFileName>, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ImportModuleSpecifierPreference","kind":"type","status":"implemented","sigHash":"1a27bccf942f34ec97a696b68d348710de7041ace7428fe7fe943f132f53cfc8"}
 *
 * Go source:
 * ImportModuleSpecifierPreference string
 */
export type ImportModuleSpecifierPreference = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ImportModuleSpecifierPreferenceNone+ImportModuleSpecifierPreferenceShortest+ImportModuleSpecifierPreferenceProjectRelative+ImportModuleSpecifierPreferenceRelative+ImportModuleSpecifierPreferenceNonRelative","kind":"constGroup","status":"implemented","sigHash":"66db70a27d263c3650c4cb13b9def0e4de970c6c1d70ffa4dedf0334b2ed01dd"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ImportModuleSpecifierEndingPreference","kind":"type","status":"implemented","sigHash":"b6494fa3677928953e46f212701c0d0e1be57b7df38dc8a71583cd55dca0668c"}
 *
 * Go source:
 * ImportModuleSpecifierEndingPreference string
 */
export type ImportModuleSpecifierEndingPreference = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ImportModuleSpecifierEndingPreferenceNone+ImportModuleSpecifierEndingPreferenceAuto+ImportModuleSpecifierEndingPreferenceMinimal+ImportModuleSpecifierEndingPreferenceIndex+ImportModuleSpecifierEndingPreferenceJs","kind":"constGroup","status":"implemented","sigHash":"95d9af8992b76cab3c255a95342ee30274258729b3c81ca09a91f31944d77c42"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::UserPreferences","kind":"type","status":"implemented","sigHash":"29af29d67b3f2b12ed82a1ad9010ca06e53c8fd4632a41f41201b9669417fdfe"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModuleSpecifierOptions","kind":"type","status":"implemented","sigHash":"e934d9b6fb8454d1926d59697abb7ad4771595da6cc87764472e90adaa0dec4d"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::RelativePreferenceKind","kind":"type","status":"implemented","sigHash":"f4433e293b20e8c512ee55acaec007bed9a9d0d569cfc2099c137cce9b43bd3d"}
 *
 * Go source:
 * RelativePreferenceKind uint8
 */
export type RelativePreferenceKind = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::RelativePreferenceRelative+RelativePreferenceNonRelative+RelativePreferenceShortest+RelativePreferenceExternalNonRelative","kind":"constGroup","status":"implemented","sigHash":"d53cd862b6a31cd8e1030295eef83ccf3cff16bb9e950bc9149f2726509e339c"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::ModuleSpecifierEnding","kind":"type","status":"implemented","sigHash":"c6272ea2c1309f6ab64e451891b254cf08d89573509dd1aedc3472844f6017ca"}
 *
 * Go source:
 * ModuleSpecifierEnding uint8
 */
export type ModuleSpecifierEnding = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::ModuleSpecifierEndingMinimal+ModuleSpecifierEndingIndex+ModuleSpecifierEndingJsExtension+ModuleSpecifierEndingTsExtension","kind":"constGroup","status":"implemented","sigHash":"198a853ed6694cfa26db29691c2809388ee5a0692fa488ebe455bc3ceda0d5c3"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::type::MatchingMode","kind":"type","status":"implemented","sigHash":"02446b03d3ae0964842c55ab03e2c7f8f6032173fa6e17725efe10d49f4bb577"}
 *
 * Go source:
 * MatchingMode uint8
 */
export type MatchingMode = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/types.go::constGroup::MatchingModeExact+MatchingModeDirectory+MatchingModePattern","kind":"constGroup","status":"implemented","sigHash":"55cac17ad1dbd40017076994e676c7d7daf75ea2622f07ee91acb3ebb167ac40"}
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
