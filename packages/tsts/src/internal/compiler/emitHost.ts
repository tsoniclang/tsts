import type { bool } from "../../go/scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../go/compat.js";
import type { Context } from "../../go/context.js";
import type { FileReference, HasFileName, Node, SourceFile, StringLiteralLike } from "../ast/ast.js";
import type { ModifierFlags } from "../ast/modifierflags.js";
import { Checker_GetEmitResolver } from "../checker/checker/support.js";
import { EmitResolver_as_printer_EmitResolver } from "../checker/emitresolver.js";
import type { CompilerOptions, ModuleKind, ResolutionMode } from "../core/compileroptions.js";
import type { ResolvedModule } from "../module/types.js";
import type { InfoCacheEntry } from "../packagejson/cache.js";
import type { EmitHost as EmitHost_cf9bdcc7 } from "../printer/emithost.js";
import type { EmitResolver } from "../printer/emitresolver.js";
import type { ModuleSpecifierGenerationHost } from "../modulespecifiers/types.js";
import type { KnownSymlinks } from "../symlinks/knownsymlinks.js";
import type { DeclarationEmitHost, OutputPaths } from "../transformers/declarations/transform.js";
import type { SourceOutputAndProjectReference } from "../tsoptions/parsedcommandline.js";
import type { Path } from "../tspath/path.js";
import {
  GetOutputPathsFor,
  OutputPaths_DeclarationFilePath,
  OutputPaths_JsFilePath,
  type OutputPathsHost,
} from "../outputpaths/outputpaths.js";
import {
  Program_CommonSourceDirectory,
  Program_FileExists,
  Program_GetCurrentDirectory,
  Program_GetDefaultResolutionModeForFile,
  Program_GetEmitModuleFormatOfFile,
  Program_GetGlobalTypingsCacheLocation,
  Program_GetModeForUsageLocation,
  Program_GetNearestAncestorDirectoryWithPackageJson,
  Program_GetPackageJsonInfo,
  Program_GetProjectReferenceFromSource,
  Program_GetRedirectTargets,
  Program_GetResolvedModuleFromModuleSpecifier,
  Program_GetSourceFileFromReference,
  Program_GetSourceOfProjectReferenceIfOutputIncluded,
  Program_GetSymlinkCache,
  Program_GetTypeCheckerForFile,
  Program_Host,
  Program_IsEmitBlocked,
  Program_IsSourceFileFromExternalLibrary,
  Program_Options,
  Program_ResolveModuleName,
  Program_SourceFiles,
  Program_UseCaseSensitiveFileNames,
} from "./program.js";
import type { Program } from "./program.js";

import type { GoInterface } from "../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::type::EmitHost","kind":"type","status":"implemented","sigHash":"86d3825eb042c6035fe2cb5b2b3b1f40c7a5774c29d4ec77071e82aed8b8c86b"}
 *
 * Go source:
 * EmitHost interface {
 * 	printer.EmitHost
 * 	declarations.DeclarationEmitHost
 * 	Options() *core.CompilerOptions
 * 	SourceFiles() []*ast.SourceFile
 * 	UseCaseSensitiveFileNames() bool
 * 	GetCurrentDirectory() string
 * 	CommonSourceDirectory() string
 * 	IsEmitBlocked(file string) bool
 * }
 */
export interface EmitHost extends EmitHost_cf9bdcc7, DeclarationEmitHost {
  Options(): GoPtr<CompilerOptions>;
  SourceFiles(): GoSlice<GoPtr<SourceFile>>;
  UseCaseSensitiveFileNames(): bool;
  GetCurrentDirectory(): string;
  CommonSourceDirectory(): string;
  IsEmitBlocked(file: string): bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::varGroup::_","kind":"varGroup","status":"implemented","sigHash":"49fbaf64ae10ed60e869e0234672578cdcd492d18042f56b9c710f8c12be2c3e"}
 *
 * Go source:
 * var _ EmitHost = (*emitHost)(nil)
 */
export let __6e5ea12b_0: GoInterface<EmitHost> = emitHost_as_compiler_EmitHost(undefined);

export function EmitHost_as_printer_EmitHost(receiver: EmitHost): EmitHost_cf9bdcc7 {
  return receiver;
}

export function EmitHost_as_declarations_DeclarationEmitHost(receiver: EmitHost): DeclarationEmitHost {
  return receiver;
}

export function emitHost_as_modulespecifiers_ModuleSpecifierGenerationHost(receiver: GoPtr<emitHost>): ModuleSpecifierGenerationHost {
  return {
    GetSymlinkCache: (): GoPtr<KnownSymlinks> => emitHost_GetSymlinkCache(receiver),
    CommonSourceDirectory: (): string => emitHost_CommonSourceDirectory(receiver),
    GetGlobalTypingsCacheLocation: (): string => emitHost_GetGlobalTypingsCacheLocation(receiver),
    UseCaseSensitiveFileNames: (): bool => emitHost_UseCaseSensitiveFileNames(receiver),
    GetCurrentDirectory: (): string => emitHost_GetCurrentDirectory(receiver),
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => emitHost_GetProjectReferenceFromSource(receiver, path),
    GetRedirectTargets: (path: Path): GoSlice<string> => emitHost_GetRedirectTargets(receiver, path),
    GetSourceOfProjectReferenceIfOutputIncluded: (file: HasFileName): string => emitHost_GetSourceOfProjectReferenceIfOutputIncluded(receiver, file),
    FileExists: (path: string): bool => emitHost_FileExists(receiver, path),
    GetNearestAncestorDirectoryWithPackageJson: (dirname: string): string => emitHost_GetNearestAncestorDirectoryWithPackageJson(receiver, dirname),
    GetPackageJsonInfo: (pkgJsonPath: string): GoPtr<InfoCacheEntry> => emitHost_GetPackageJsonInfo(receiver, pkgJsonPath),
    GetDefaultResolutionModeForFile: (file: HasFileName): ResolutionMode => emitHost_GetDefaultResolutionModeForFile(receiver, file),
    GetResolvedModuleFromModuleSpecifier: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> => emitHost_GetResolvedModuleFromModuleSpecifier(receiver, file, moduleSpecifier),
    GetModeForUsageLocation: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode => emitHost_GetModeForUsageLocation(receiver, file, moduleSpecifier),
  };
}

export function emitHost_as_printer_EmitHost(receiver: GoPtr<emitHost>): EmitHost_cf9bdcc7 {
  return {
    Options: (): GoPtr<CompilerOptions> => emitHost_Options(receiver),
    SourceFiles: (): GoSlice<GoPtr<SourceFile>> => emitHost_SourceFiles(receiver),
    UseCaseSensitiveFileNames: (): bool => emitHost_UseCaseSensitiveFileNames(receiver),
    GetCurrentDirectory: (): string => emitHost_GetCurrentDirectory(receiver),
    CommonSourceDirectory: (): string => emitHost_CommonSourceDirectory(receiver),
    IsEmitBlocked: (file: string): bool => emitHost_IsEmitBlocked(receiver, file),
    WriteFile: (fileName: string, text: string): GoError => emitHost_WriteFile(receiver, fileName, text),
    GetEmitModuleFormatOfFile: (file: HasFileName): ModuleKind => emitHost_GetEmitModuleFormatOfFile(receiver, file),
    GetEmitResolver: (): EmitResolver => emitHost_GetEmitResolver(receiver)!,
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => emitHost_GetProjectReferenceFromSource(receiver, path),
    IsSourceFileFromExternalLibrary: (file: GoPtr<SourceFile>): bool => emitHost_IsSourceFileFromExternalLibrary(receiver, file),
  };
}

export function emitHost_as_declarations_DeclarationEmitHost(receiver: GoPtr<emitHost>): DeclarationEmitHost {
  return {
    __tsgoEmbedded0: emitHost_as_modulespecifiers_ModuleSpecifierGenerationHost(receiver),
    GetSymlinkCache: (): GoPtr<KnownSymlinks> => emitHost_GetSymlinkCache(receiver),
    CommonSourceDirectory: (): string => emitHost_CommonSourceDirectory(receiver),
    GetGlobalTypingsCacheLocation: (): string => emitHost_GetGlobalTypingsCacheLocation(receiver),
    UseCaseSensitiveFileNames: (): bool => emitHost_UseCaseSensitiveFileNames(receiver),
    GetCurrentDirectory: (): string => emitHost_GetCurrentDirectory(receiver),
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => emitHost_GetProjectReferenceFromSource(receiver, path),
    GetRedirectTargets: (path: Path): GoSlice<string> => emitHost_GetRedirectTargets(receiver, path),
    GetSourceOfProjectReferenceIfOutputIncluded: (file: HasFileName): string => emitHost_GetSourceOfProjectReferenceIfOutputIncluded(receiver, file),
    FileExists: (path: string): bool => emitHost_FileExists(receiver, path),
    GetNearestAncestorDirectoryWithPackageJson: (dirname: string): string => emitHost_GetNearestAncestorDirectoryWithPackageJson(receiver, dirname),
    GetPackageJsonInfo: (pkgJsonPath: string): GoPtr<InfoCacheEntry> => emitHost_GetPackageJsonInfo(receiver, pkgJsonPath),
    GetDefaultResolutionModeForFile: (file: HasFileName): ResolutionMode => emitHost_GetDefaultResolutionModeForFile(receiver, file),
    GetResolvedModuleFromModuleSpecifier: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> => emitHost_GetResolvedModuleFromModuleSpecifier(receiver, file, moduleSpecifier),
    GetModeForUsageLocation: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode => emitHost_GetModeForUsageLocation(receiver, file, moduleSpecifier),
    GetSourceFileFromReference: (origin: GoPtr<SourceFile>, ref: GoPtr<FileReference>): GoPtr<SourceFile> => emitHost_GetSourceFileFromReference(receiver, origin, ref),
    GetOutputPathsFor: (file: GoPtr<SourceFile>, forceDtsPaths: bool): OutputPaths => emitHost_GetOutputPathsFor(receiver, file, forceDtsPaths)!,
    GetResolutionModeOverride: (node: GoPtr<Node>): ResolutionMode => emitHost_GetResolutionModeOverride(receiver, node),
    GetEffectiveDeclarationFlags: (node: GoPtr<Node>, flags: ModifierFlags): ModifierFlags => emitHost_GetEffectiveDeclarationFlags(receiver, node, flags),
    GetEmitResolver: (): EmitResolver => emitHost_GetEmitResolver(receiver)!,
  };
}

export function emitHost_as_outputpaths_OutputPathsHost(receiver: GoPtr<emitHost>): OutputPathsHost {
  return {
    CommonSourceDirectory: (): string => emitHost_CommonSourceDirectory(receiver),
    GetCurrentDirectory: (): string => emitHost_GetCurrentDirectory(receiver),
    UseCaseSensitiveFileNames: (): bool => emitHost_UseCaseSensitiveFileNames(receiver),
  };
}

export function emitHost_as_compiler_EmitHost(receiver: GoPtr<emitHost>): EmitHost {
  return {
    GetSymlinkCache: (): GoPtr<KnownSymlinks> => emitHost_GetSymlinkCache(receiver),
    CommonSourceDirectory: (): string => emitHost_CommonSourceDirectory(receiver),
    GetGlobalTypingsCacheLocation: (): string => emitHost_GetGlobalTypingsCacheLocation(receiver),
    UseCaseSensitiveFileNames: (): bool => emitHost_UseCaseSensitiveFileNames(receiver),
    GetCurrentDirectory: (): string => emitHost_GetCurrentDirectory(receiver),
    GetProjectReferenceFromSource: (path: Path): GoPtr<SourceOutputAndProjectReference> => emitHost_GetProjectReferenceFromSource(receiver, path),
    GetRedirectTargets: (path: Path): GoSlice<string> => emitHost_GetRedirectTargets(receiver, path),
    GetSourceOfProjectReferenceIfOutputIncluded: (file: HasFileName): string => emitHost_GetSourceOfProjectReferenceIfOutputIncluded(receiver, file),
    FileExists: (path: string): bool => emitHost_FileExists(receiver, path),
    GetNearestAncestorDirectoryWithPackageJson: (dirname: string): string => emitHost_GetNearestAncestorDirectoryWithPackageJson(receiver, dirname),
    GetPackageJsonInfo: (pkgJsonPath: string): GoPtr<InfoCacheEntry> => emitHost_GetPackageJsonInfo(receiver, pkgJsonPath),
    GetDefaultResolutionModeForFile: (file: HasFileName): ResolutionMode => emitHost_GetDefaultResolutionModeForFile(receiver, file),
    GetResolvedModuleFromModuleSpecifier: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> => emitHost_GetResolvedModuleFromModuleSpecifier(receiver, file, moduleSpecifier),
    GetModeForUsageLocation: (file: HasFileName, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode => emitHost_GetModeForUsageLocation(receiver, file, moduleSpecifier),
    GetSourceFileFromReference: (origin: GoPtr<SourceFile>, ref: GoPtr<FileReference>): GoPtr<SourceFile> => emitHost_GetSourceFileFromReference(receiver, origin, ref),
    GetOutputPathsFor: (file: GoPtr<SourceFile>, forceDtsPaths: bool): OutputPaths => emitHost_GetOutputPathsFor(receiver, file, forceDtsPaths)!,
    GetResolutionModeOverride: (node: GoPtr<Node>): ResolutionMode => emitHost_GetResolutionModeOverride(receiver, node),
    GetEffectiveDeclarationFlags: (node: GoPtr<Node>, flags: ModifierFlags): ModifierFlags => emitHost_GetEffectiveDeclarationFlags(receiver, node, flags),
    GetEmitResolver: (): EmitResolver => emitHost_GetEmitResolver(receiver)!,
    Options: (): GoPtr<CompilerOptions> => emitHost_Options(receiver),
    SourceFiles: (): GoSlice<GoPtr<SourceFile>> => emitHost_SourceFiles(receiver),
    IsEmitBlocked: (file: string): bool => emitHost_IsEmitBlocked(receiver, file),
    WriteFile: (fileName: string, text: string): GoError => emitHost_WriteFile(receiver, fileName, text),
    GetEmitModuleFormatOfFile: (file: HasFileName): ModuleKind => emitHost_GetEmitModuleFormatOfFile(receiver, file),
    IsSourceFileFromExternalLibrary: (file: GoPtr<SourceFile>): bool => emitHost_IsSourceFileFromExternalLibrary(receiver, file),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::type::emitHost","kind":"type","status":"implemented","sigHash":"82a8160ff4f5bebeb3e890a32bc68c27a504ee28ed1414475783e6f93c9ed5fb"}
 *
 * Go source:
 * emitHost struct {
 * 	program      *Program
 * 	emitResolver printer.EmitResolver
 * }
 */
export interface emitHost {
  program: GoPtr<Program>;
  emitResolver: GoInterface<EmitResolver>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::func::newEmitHost","kind":"func","status":"implemented","sigHash":"377586cc6bb0ee18b8a142078f4a59c05d021896e0d1b269ac5348099fd51bbd"}
 *
 * Go source:
 * func newEmitHost(ctx context.Context, program *Program, file *ast.SourceFile) (*emitHost, func()) {
 * 	checker, done := program.GetTypeCheckerForFile(ctx, file)
 * 	return &emitHost{
 * 		program:      program,
 * 		emitResolver: checker.GetEmitResolver(),
 * 	}, done
 * }
 */
export function newEmitHost(ctx: GoInterface<Context>, program: GoPtr<Program>, file: GoPtr<SourceFile>): [GoPtr<emitHost>, () => void] {
  const [checker, done] = Program_GetTypeCheckerForFile(program, ctx, file);
  const emitResolver = EmitResolver_as_printer_EmitResolver(Checker_GetEmitResolver(checker));
  return [{ program, emitResolver }, done];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetModeForUsageLocation","kind":"method","status":"implemented","sigHash":"fc560f86320b97f1f35a1a8696de5afa5ecacfa3fc3c63956dc48c3049be96d3"}
 *
 * Go source:
 * func (host *emitHost) GetModeForUsageLocation(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) core.ResolutionMode {
 * 	return host.program.GetModeForUsageLocation(file, moduleSpecifier)
 * }
 */
export function emitHost_GetModeForUsageLocation(receiver: GoPtr<emitHost>, file: GoInterface<HasFileName>, moduleSpecifier: GoPtr<StringLiteralLike>): ResolutionMode {
  return Program_GetModeForUsageLocation(receiver!.program, file, moduleSpecifier);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetResolvedModuleFromModuleSpecifier","kind":"method","status":"implemented","sigHash":"cfdae610398bd748bca9ba6bc024b3ae94d904bd5edcdc0b78a542b8155013a4"}
 *
 * Go source:
 * func (host *emitHost) GetResolvedModuleFromModuleSpecifier(file ast.HasFileName, moduleSpecifier *ast.StringLiteralLike) *module.ResolvedModule {
 * 	return host.program.GetResolvedModuleFromModuleSpecifier(file, moduleSpecifier)
 * }
 */
export function emitHost_GetResolvedModuleFromModuleSpecifier(receiver: GoPtr<emitHost>, file: GoInterface<HasFileName>, moduleSpecifier: GoPtr<StringLiteralLike>): GoPtr<ResolvedModule> {
  return Program_GetResolvedModuleFromModuleSpecifier(receiver!.program, file, moduleSpecifier);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetDefaultResolutionModeForFile","kind":"method","status":"implemented","sigHash":"af23a403126d8ed749bcaa5aaf7fdd4e24b1ecb7f90b056abe37bbfaa49386cf"}
 *
 * Go source:
 * func (host *emitHost) GetDefaultResolutionModeForFile(file ast.HasFileName) core.ResolutionMode {
 * 	return host.program.GetDefaultResolutionModeForFile(file)
 * }
 */
export function emitHost_GetDefaultResolutionModeForFile(receiver: GoPtr<emitHost>, file: GoInterface<HasFileName>): ResolutionMode {
  return Program_GetDefaultResolutionModeForFile(receiver!.program, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetEmitModuleFormatOfFile","kind":"method","status":"implemented","sigHash":"e7affbcc0eeb0b90adad23e1eb9022c4f5cd6ac41a3d525fdfcb719f7d69e3d4"}
 *
 * Go source:
 * func (host *emitHost) GetEmitModuleFormatOfFile(file ast.HasFileName) core.ModuleKind {
 * 	return host.program.GetEmitModuleFormatOfFile(file)
 * }
 */
export function emitHost_GetEmitModuleFormatOfFile(receiver: GoPtr<emitHost>, file: GoInterface<HasFileName>): ModuleKind {
  return Program_GetEmitModuleFormatOfFile(receiver!.program, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.FileExists","kind":"method","status":"implemented","sigHash":"29a077517078ac670f9f0a17dd73b0fb7a9ca7d26b9919fe79a80c6887bd93bc"}
 *
 * Go source:
 * func (host *emitHost) FileExists(path string) bool {
 * 	return host.program.FileExists(path)
 * }
 */
export function emitHost_FileExists(receiver: GoPtr<emitHost>, path: string): bool {
  return Program_FileExists(receiver!.program, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetGlobalTypingsCacheLocation","kind":"method","status":"implemented","sigHash":"44763cff9591a8a01139e3b792e836ed0bd7a7d26f97513ed8fb2bb1c16d1b6f"}
 *
 * Go source:
 * func (host *emitHost) GetGlobalTypingsCacheLocation() string {
 * 	return host.program.GetGlobalTypingsCacheLocation()
 * }
 */
export function emitHost_GetGlobalTypingsCacheLocation(receiver: GoPtr<emitHost>): string {
  return Program_GetGlobalTypingsCacheLocation(receiver!.program);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetNearestAncestorDirectoryWithPackageJson","kind":"method","status":"implemented","sigHash":"dbc85b889c9f7ea5467ecf24615ecd56439a03c925fa6e553e725f08328853a4"}
 *
 * Go source:
 * func (host *emitHost) GetNearestAncestorDirectoryWithPackageJson(dirname string) string {
 * 	return host.program.GetNearestAncestorDirectoryWithPackageJson(dirname)
 * }
 */
export function emitHost_GetNearestAncestorDirectoryWithPackageJson(receiver: GoPtr<emitHost>, dirname: string): string {
  return Program_GetNearestAncestorDirectoryWithPackageJson(receiver!.program, dirname);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetPackageJsonInfo","kind":"method","status":"implemented","sigHash":"a7a07ab02a0d37ee2518194b93ee1482eba9ab1572c1032b3afcdb815d1ced0d"}
 *
 * Go source:
 * func (host *emitHost) GetPackageJsonInfo(pkgJsonPath string) *packagejson.InfoCacheEntry {
 * 	return host.program.GetPackageJsonInfo(pkgJsonPath)
 * }
 */
export function emitHost_GetPackageJsonInfo(receiver: GoPtr<emitHost>, pkgJsonPath: string): GoPtr<InfoCacheEntry> {
  return Program_GetPackageJsonInfo(receiver!.program, pkgJsonPath);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetSourceOfProjectReferenceIfOutputIncluded","kind":"method","status":"implemented","sigHash":"88a184e609f0420dc593b4b149e0128978ba1e3a236094ea7fb6bd8982d6a976"}
 *
 * Go source:
 * func (host *emitHost) GetSourceOfProjectReferenceIfOutputIncluded(file ast.HasFileName) string {
 * 	return host.program.GetSourceOfProjectReferenceIfOutputIncluded(file)
 * }
 */
export function emitHost_GetSourceOfProjectReferenceIfOutputIncluded(receiver: GoPtr<emitHost>, file: GoInterface<HasFileName>): string {
  return Program_GetSourceOfProjectReferenceIfOutputIncluded(receiver!.program, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetProjectReferenceFromSource","kind":"method","status":"implemented","sigHash":"d9aede4821850d82ef1e0b3153d05eaf655b231f7c7a29b91781bc366f2bda68"}
 *
 * Go source:
 * func (host *emitHost) GetProjectReferenceFromSource(path tspath.Path) *tsoptions.SourceOutputAndProjectReference {
 * 	return host.program.GetProjectReferenceFromSource(path)
 * }
 */
export function emitHost_GetProjectReferenceFromSource(receiver: GoPtr<emitHost>, path: Path): GoPtr<SourceOutputAndProjectReference> {
  return Program_GetProjectReferenceFromSource(receiver!.program, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetRedirectTargets","kind":"method","status":"implemented","sigHash":"26b434fb5ba1f6e2bdb359ff307de3961797bf93c3a5e84b894064b5e963b6f1"}
 *
 * Go source:
 * func (host *emitHost) GetRedirectTargets(path tspath.Path) []string {
 * 	return host.program.GetRedirectTargets(path)
 * }
 */
export function emitHost_GetRedirectTargets(receiver: GoPtr<emitHost>, path: Path): GoSlice<string> {
  return Program_GetRedirectTargets(receiver!.program, path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetEffectiveDeclarationFlags","kind":"method","status":"implemented","sigHash":"a712c4c9a747747aebb8b8c3b9e92c58070f6543ace774fba23d01d953660370"}
 *
 * Go source:
 * func (host *emitHost) GetEffectiveDeclarationFlags(node *ast.Node, flags ast.ModifierFlags) ast.ModifierFlags {
 * 	return host.GetEmitResolver().GetEffectiveDeclarationFlags(node, flags)
 * }
 */
export function emitHost_GetEffectiveDeclarationFlags(receiver: GoPtr<emitHost>, node: GoPtr<Node>, flags: ModifierFlags): ModifierFlags {
  return emitHost_GetEmitResolver(receiver)!.GetEffectiveDeclarationFlags(node, flags);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetOutputPathsFor","kind":"method","status":"implemented","sigHash":"d83670f4bf8f9d6213f49144513fd1de5456e96978086d49dbd4567f101ae2ec"}
 *
 * Go source:
 * func (host *emitHost) GetOutputPathsFor(file *ast.SourceFile, forceDtsPaths bool) declarations.OutputPaths {
 * 	// TODO: cache
 * 	return outputpaths.GetOutputPathsFor(file, host.Options(), host, forceDtsPaths)
 * }
 */
export function emitHost_GetOutputPathsFor(receiver: GoPtr<emitHost>, file: GoPtr<SourceFile>, forceDtsPaths: bool): GoInterface<OutputPaths> {
  const host = emitHost_as_outputpaths_OutputPathsHost(receiver);
  const result = GetOutputPathsFor(file, emitHost_Options(receiver), host, forceDtsPaths);
  return {
    DeclarationFilePath: (): string => OutputPaths_DeclarationFilePath(result),
    JsFilePath: (): string => OutputPaths_JsFilePath(result),
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetResolutionModeOverride","kind":"method","status":"implemented","sigHash":"1f55097ce8f906adbe4199adaa1b62efb875522271a65de28e69d9c285025681"}
 *
 * Go source:
 * func (host *emitHost) GetResolutionModeOverride(node *ast.Node) core.ResolutionMode {
 * 	return host.GetEmitResolver().GetResolutionModeOverride(node)
 * }
 */
export function emitHost_GetResolutionModeOverride(receiver: GoPtr<emitHost>, node: GoPtr<Node>): ResolutionMode {
  return emitHost_GetEmitResolver(receiver)!.GetResolutionModeOverride(node);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetSourceFileFromReference","kind":"method","status":"implemented","sigHash":"3a411e83b1d1649b912ba2bbf193754a6ebc14f3cec7ad8643457fb934b2a55d"}
 *
 * Go source:
 * func (host *emitHost) GetSourceFileFromReference(origin *ast.SourceFile, ref *ast.FileReference) *ast.SourceFile {
 * 	return host.program.GetSourceFileFromReference(origin, ref)
 * }
 */
export function emitHost_GetSourceFileFromReference(receiver: GoPtr<emitHost>, origin: GoPtr<SourceFile>, ref: GoPtr<FileReference>): GoPtr<SourceFile> {
  return Program_GetSourceFileFromReference(receiver!.program, origin, ref);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.Options","kind":"method","status":"implemented","sigHash":"cf6443df21f906e297f0e87e42afce93724f6f5b1325cb5e8d4698e487c21e4b"}
 *
 * Go source:
 * func (host *emitHost) Options() *core.CompilerOptions { return host.program.Options() }
 */
export function emitHost_Options(receiver: GoPtr<emitHost>): GoPtr<CompilerOptions> {
  return Program_Options(receiver!.program);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.SourceFiles","kind":"method","status":"implemented","sigHash":"86c7b6b6b40bf827a41304fdec779271be74f5c3e30a0144a2e66a7e134e37c5"}
 *
 * Go source:
 * func (host *emitHost) SourceFiles() []*ast.SourceFile { return host.program.SourceFiles() }
 */
export function emitHost_SourceFiles(receiver: GoPtr<emitHost>): GoSlice<GoPtr<SourceFile>> {
  return Program_SourceFiles(receiver!.program);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetCurrentDirectory","kind":"method","status":"implemented","sigHash":"7e21c267c018a4667efe8349136d5417bfe61070de5b785b281b62da0d8806e7"}
 *
 * Go source:
 * func (host *emitHost) GetCurrentDirectory() string    { return host.program.GetCurrentDirectory() }
 */
export function emitHost_GetCurrentDirectory(receiver: GoPtr<emitHost>): string {
  return Program_GetCurrentDirectory(receiver!.program);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.CommonSourceDirectory","kind":"method","status":"implemented","sigHash":"a3db1102fca4e45ba4e1fd70c4f361acdc577b0f914e3556a0c1d628dbbf3fa9"}
 *
 * Go source:
 * func (host *emitHost) CommonSourceDirectory() string  { return host.program.CommonSourceDirectory() }
 */
export function emitHost_CommonSourceDirectory(receiver: GoPtr<emitHost>): string {
  return Program_CommonSourceDirectory(receiver!.program);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.UseCaseSensitiveFileNames","kind":"method","status":"implemented","sigHash":"b8b1872559f27b673d94fa77f2fa5f986c3a8f1c56e118e2b094d42fff90cdca"}
 *
 * Go source:
 * func (host *emitHost) UseCaseSensitiveFileNames() bool {
 * 	return host.program.UseCaseSensitiveFileNames()
 * }
 */
export function emitHost_UseCaseSensitiveFileNames(receiver: GoPtr<emitHost>): bool {
  return Program_UseCaseSensitiveFileNames(receiver!.program);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.IsEmitBlocked","kind":"method","status":"implemented","sigHash":"e07d61c3e724057ce2f92882e16b7f3ac0489a5fabf07b2971001a2532174736"}
 *
 * Go source:
 * func (host *emitHost) IsEmitBlocked(file string) bool {
 * 	return host.program.IsEmitBlocked(file)
 * }
 */
export function emitHost_IsEmitBlocked(receiver: GoPtr<emitHost>, file: string): bool {
  return Program_IsEmitBlocked(receiver!.program, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.WriteFile","kind":"method","status":"implemented","sigHash":"8b047a8f632ae735fe504ec0a0b5d818ce226187a0779cd4b05e309427bf7058"}
 *
 * Go source:
 * func (host *emitHost) WriteFile(fileName string, text string) error {
 * 	return host.program.Host().FS().WriteFile(fileName, text)
 * }
 */
export function emitHost_WriteFile(receiver: GoPtr<emitHost>, fileName: string, text: string): GoError {
  return Program_Host(receiver!.program)!.FS()!.WriteFile(fileName, text);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetEmitResolver","kind":"method","status":"implemented","sigHash":"9c5f371868c855caab9c6e4aa283b2667377b1bc7286d27a8948e414a11c1bce"}
 *
 * Go source:
 * func (host *emitHost) GetEmitResolver() printer.EmitResolver {
 * 	return host.emitResolver
 * }
 */
export function emitHost_GetEmitResolver(receiver: GoPtr<emitHost>): GoInterface<EmitResolver> {
  return receiver!.emitResolver;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.IsSourceFileFromExternalLibrary","kind":"method","status":"implemented","sigHash":"7cd83aca9ae75be2ef2025aa1b5dbc5c37bf12bda72b909c1a1c2ae36c13e40d"}
 *
 * Go source:
 * func (host *emitHost) IsSourceFileFromExternalLibrary(file *ast.SourceFile) bool {
 * 	return host.program.IsSourceFileFromExternalLibrary(file)
 * }
 */
export function emitHost_IsSourceFileFromExternalLibrary(receiver: GoPtr<emitHost>, file: GoPtr<SourceFile>): bool {
  return Program_IsSourceFileFromExternalLibrary(receiver!.program, file);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.GetSymlinkCache","kind":"method","status":"implemented","sigHash":"bf7c644af870582decc0cd8ead49a0663f4492f3f6bb87e785784bf97eb85f57"}
 *
 * Go source:
 * func (host *emitHost) GetSymlinkCache() *symlinks.KnownSymlinks {
 * 	return host.program.GetSymlinkCache()
 * }
 */
export function emitHost_GetSymlinkCache(receiver: GoPtr<emitHost>): GoPtr<KnownSymlinks> {
  return Program_GetSymlinkCache(receiver!.program);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/compiler/emitHost.go::method::emitHost.ResolveModuleName","kind":"method","status":"implemented","sigHash":"0c7462e235eb0006e9136e0243cadd9d5d66149e308cfc33dc014de215de5e50"}
 *
 * Go source:
 * func (host *emitHost) ResolveModuleName(moduleName string, containingFile string, resolutionMode core.ResolutionMode) *module.ResolvedModule {
 * 	resolved, _ := host.program.resolver.ResolveModuleName(moduleName, containingFile, resolutionMode, nil)
 * 	return resolved
 * }
 */
export function emitHost_ResolveModuleName(receiver: GoPtr<emitHost>, moduleName: string, containingFile: string, resolutionMode: ResolutionMode): GoPtr<ResolvedModule> {
  return Program_ResolveModuleName(receiver!.program, moduleName, containingFile, resolutionMode);
}
