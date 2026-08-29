import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast, Node as Node__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { ResolvedModule as ResolvedModule__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { InfoCacheEntry as InfoCacheEntry__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import type { KnownSymlinks as KnownSymlinks__from_symlinks } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { Path as Path__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { $goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$GetAliasedSymbol$PointerTo_Named_ast$Symbol_to_PointerTo_Named_ast$Symbol, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultResolutionModeForFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetGlobalTypingsCacheLocation$void_to_string, $goInterfaceMethod$GetModeForUsageLocation$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetNearestAncestorDirectoryWithPackageJson$string_to_string, $goInterfaceMethod$GetPackageJsonInfo$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$GetRedirectTargets$Named_tspath$Path_to_SliceOf_string, $goInterfaceMethod$GetResolvedModuleFromModuleSpecifier$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_PointerTo_Named___go_module$ResolvedModule, $goInterfaceMethod$GetSourceOfProjectReferenceIfOutputIncluded$Named_ast$HasFileName_to_string, $goInterfaceMethod$GetSymbolAtLocation$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Symbol, $goInterfaceMethod$GetSymlinkCache$void_to_PointerTo_Named_symlinks$KnownSymlinks, $goInterfaceMethod$Imports$void_to_SliceOf_PointerTo_Named_ast$Node, $goInterfaceMethod$IsJS$void_to_bool, $goInterfaceMethod$Path$void_to_Named_tspath$Path, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool } from "../../../../../../support/interface-methods.js";
export interface SourceFileForSpecifierGeneration extends GoInterfaceValue {
    FileName(): gostring;
    Imports(): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>;
    IsJS(): bool;
    Path(): Path__from_tspath;
}
export const SourceFileForSpecifierGeneration$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$FileName$void_to_string, $goInterfaceMethod$Imports$void_to_SliceOf_PointerTo_Named_ast$Node, $goInterfaceMethod$IsJS$void_to_bool, $goInterfaceMethod$Path$void_to_Named_tspath$Path]);
export function SourceFileForSpecifierGeneration$is(value: GoInterfaceValue | undefined): value is SourceFileForSpecifierGeneration {
    return value !== undefined && value.$go$implements(SourceFileForSpecifierGeneration$contract);
}
export interface CheckerShape extends GoInterfaceValue {
    GetAliasedSymbol($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
    GetSymbolAtLocation($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined;
}
export const CheckerShape$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$GetAliasedSymbol$PointerTo_Named_ast$Symbol_to_PointerTo_Named_ast$Symbol, $goInterfaceMethod$GetSymbolAtLocation$PointerTo_Named_ast$Node_to_PointerTo_Named_ast$Symbol]);
export function CheckerShape$is(value: GoInterfaceValue | undefined): value is CheckerShape {
    return value !== undefined && value.$go$implements(CheckerShape$contract);
}
export type ResultKind = uint8;
export function ResultKindNone$constant(): ResultKind {
    return 0;
}
export function ResultKindNodeModules$constant(): ResultKind {
    return 1;
}
export function ResultKindPaths$constant(): ResultKind {
    return 2;
}
export function ResultKindRedirect$constant(): ResultKind {
    return 3;
}
export function ResultKindRelative$constant(): ResultKind {
    return 4;
}
export function ResultKindAmbient$constant(): ResultKind {
    return 5;
}
export type ModulePath$Storage = {
    FileName: gostring;
    IsInNodeModules: bool;
    IsRedirect: bool;
};
export class ModulePath implements GoContainerStoredValue<ModulePath$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: ModulePath$Storage) {
    }
    public static $storageOf($source: ModulePath): ModulePath$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: ModulePath$Storage): ModulePath {
        return new ModulePath($source);
    }
    public get FileName(): gostring {
        return this.$storage.FileName;
    }
    public set FileName($value: gostring) {
        this.$storage.FileName = $value;
    }
    public get IsInNodeModules(): bool {
        return this.$storage.IsInNodeModules;
    }
    public set IsInNodeModules($value: bool) {
        this.$storage.IsInNodeModules = $value;
    }
    public get IsRedirect(): bool {
        return this.$storage.IsRedirect;
    }
    public set IsRedirect($value: bool) {
        this.$storage.IsRedirect = $value;
    }
    declare readonly [$goContainerStorageType]: ModulePath$Storage;
    static $zero(): ModulePath {
        return new ModulePath({
            FileName: "",
            IsInNodeModules: false,
            IsRedirect: false
        });
    }
    static $copy($source: ModulePath): ModulePath {
        return new ModulePath({
            FileName: $source.$storage.FileName,
            IsInNodeModules: $source.$storage.IsInNodeModules,
            IsRedirect: $source.$storage.IsRedirect
        });
    }
    static $zeroStorage(): ModulePath$Storage {
        return {
            FileName: "",
            IsInNodeModules: false,
            IsRedirect: false
        };
    }
    declare private readonly then?: never;
}
export interface ModuleSpecifierGenerationHost extends GoInterfaceValue {
    CommonSourceDirectory(): gostring;
    FileExists($argument0: gostring): bool;
    GetCurrentDirectory(): gostring;
    GetDefaultResolutionModeForFile($argument0: HasFileName__from_ast | undefined): ModuleKind__from_core;
    GetGlobalTypingsCacheLocation(): gostring;
    GetModeForUsageLocation($argument0: HasFileName__from_ast | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): ModuleKind__from_core;
    GetNearestAncestorDirectoryWithPackageJson($argument0: gostring): gostring;
    GetPackageJsonInfo($argument0: gostring): {
        value: InfoCacheEntry__from_packagejson;
    } | undefined;
    GetProjectReferenceFromSource($argument0: Path__from_tspath): {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined;
    GetRedirectTargets($argument0: Path__from_tspath): RuntimeSlice<gostring>;
    GetResolvedModuleFromModuleSpecifier($argument0: HasFileName__from_ast | undefined, $argument1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined;
    GetSourceOfProjectReferenceIfOutputIncluded($argument0: HasFileName__from_ast | undefined): gostring;
    GetSymlinkCache(): tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined;
    UseCaseSensitiveFileNames(): bool;
}
export const ModuleSpecifierGenerationHost$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$CommonSourceDirectory$void_to_string, $goInterfaceMethod$FileExists$string_to_bool, $goInterfaceMethod$GetCurrentDirectory$void_to_string, $goInterfaceMethod$GetDefaultResolutionModeForFile$Named_ast$HasFileName_to_Named_core$ModuleKind, $goInterfaceMethod$GetGlobalTypingsCacheLocation$void_to_string, $goInterfaceMethod$GetModeForUsageLocation$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_Named_core$ModuleKind, $goInterfaceMethod$GetNearestAncestorDirectoryWithPackageJson$string_to_string, $goInterfaceMethod$GetPackageJsonInfo$string_to_PointerTo_Named_packagejson$InfoCacheEntry, $goInterfaceMethod$GetProjectReferenceFromSource$Named_tspath$Path_to_PointerTo_Named_tsoptions$SourceOutputAndProjectReference, $goInterfaceMethod$GetRedirectTargets$Named_tspath$Path_to_SliceOf_string, $goInterfaceMethod$GetResolvedModuleFromModuleSpecifier$Named_ast$HasFileName_PointerTo_Named_ast$Node_to_PointerTo_Named___go_module$ResolvedModule, $goInterfaceMethod$GetSourceOfProjectReferenceIfOutputIncluded$Named_ast$HasFileName_to_string, $goInterfaceMethod$GetSymlinkCache$void_to_PointerTo_Named_symlinks$KnownSymlinks, $goInterfaceMethod$UseCaseSensitiveFileNames$void_to_bool]);
export function ModuleSpecifierGenerationHost$is(value: GoInterfaceValue | undefined): value is ModuleSpecifierGenerationHost {
    return value !== undefined && value.$go$implements(ModuleSpecifierGenerationHost$contract);
}
export class ImportModuleSpecifierPreference {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function ImportModuleSpecifierPreferenceShortest$constant(): ImportModuleSpecifierPreference {
    return new ImportModuleSpecifierPreference("shortest");
}
export function ImportModuleSpecifierPreferenceProjectRelative$constant(): ImportModuleSpecifierPreference {
    return new ImportModuleSpecifierPreference("project-relative");
}
export function ImportModuleSpecifierPreferenceRelative$constant(): ImportModuleSpecifierPreference {
    return new ImportModuleSpecifierPreference("relative");
}
export function ImportModuleSpecifierPreferenceNonRelative$constant(): ImportModuleSpecifierPreference {
    return new ImportModuleSpecifierPreference("non-relative");
}
export class ImportModuleSpecifierEndingPreference {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function ImportModuleSpecifierEndingPreferenceNone$constant(): ImportModuleSpecifierEndingPreference {
    return new ImportModuleSpecifierEndingPreference("");
}
export function ImportModuleSpecifierEndingPreferenceAuto$constant(): ImportModuleSpecifierEndingPreference {
    return new ImportModuleSpecifierEndingPreference("auto");
}
export function ImportModuleSpecifierEndingPreferenceMinimal$constant(): ImportModuleSpecifierEndingPreference {
    return new ImportModuleSpecifierEndingPreference("minimal");
}
export function ImportModuleSpecifierEndingPreferenceIndex$constant(): ImportModuleSpecifierEndingPreference {
    return new ImportModuleSpecifierEndingPreference("index");
}
export function ImportModuleSpecifierEndingPreferenceJs$constant(): ImportModuleSpecifierEndingPreference {
    return new ImportModuleSpecifierEndingPreference("js");
}
export class UserPreferences {
    declare private readonly $goType: void;
    public constructor(public ImportModuleSpecifierPreference: ImportModuleSpecifierPreference, public ImportModuleSpecifierEnding: ImportModuleSpecifierEndingPreference, public AutoImportSpecifierExcludeRegexes: RuntimeSlice<gostring>) {
    }
    static $copy($source: UserPreferences): UserPreferences {
        return new UserPreferences($source.ImportModuleSpecifierPreference, $source.ImportModuleSpecifierEnding, $source.AutoImportSpecifierExcludeRegexes);
    }
    declare private readonly then?: never;
}
export class ModuleSpecifierOptions {
    declare private readonly $goType: void;
    public constructor(public OverrideImportMode: ModuleKind__from_core) {
    }
    static $copy($source: ModuleSpecifierOptions): ModuleSpecifierOptions {
        return new ModuleSpecifierOptions($source.OverrideImportMode);
    }
    declare private readonly then?: never;
}
export type RelativePreferenceKind = uint8;
export function RelativePreferenceRelative$constant(): RelativePreferenceKind {
    return 0;
}
export function RelativePreferenceNonRelative$constant(): RelativePreferenceKind {
    return 1;
}
export function RelativePreferenceShortest$constant(): RelativePreferenceKind {
    return 2;
}
export function RelativePreferenceExternalNonRelative$constant(): RelativePreferenceKind {
    return 3;
}
export type ModuleSpecifierEnding = uint8;
export function ModuleSpecifierEndingMinimal$constant(): ModuleSpecifierEnding {
    return 0;
}
export function ModuleSpecifierEndingIndex$constant(): ModuleSpecifierEnding {
    return 1;
}
export function ModuleSpecifierEndingJsExtension$constant(): ModuleSpecifierEnding {
    return 2;
}
export function ModuleSpecifierEndingTsExtension$constant(): ModuleSpecifierEnding {
    return 3;
}
export type MatchingMode = uint8;
export function MatchingModeExact$constant(): MatchingMode {
    return 0;
}
export function MatchingModeDirectory$constant(): MatchingMode {
    return 1;
}
export function MatchingModePattern$constant(): MatchingMode {
    return 2;
}
