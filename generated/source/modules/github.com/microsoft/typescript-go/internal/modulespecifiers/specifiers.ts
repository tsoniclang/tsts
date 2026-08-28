import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { OrderedMap as OrderedMap__from_collections, SyncSet as SyncSet__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { CheckerShape, MatchingMode, ModulePath$Storage as ModulePath__from_modulespecifiers$Storage, ModuleSpecifierEnding, ModuleSpecifierGenerationHost, ResultKind, SourceFileForSpecifierGeneration } from "./types.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, GoContainerStoredValue } from "@gotots/runtime/storage.js";
import { FindAncestor as FindAncestor__from_ast, GetSourceFileOfModule as GetSourceFileOfModule__from_ast, InternalSymbolNameExportEquals$string as InternalSymbolNameExportEquals$string__from_ast, IsModuleAugmentationExternal as IsModuleAugmentationExternal__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsModuleWithStringLiteralName as IsModuleWithStringLiteralName__from_ast, IsSourceFile as IsSourceFile__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, Node as Node__from_ast, SymbolFlagsAlias$constant as SymbolFlagsAlias$constant__from_ast, SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, IndexAfter as IndexAfter__from_core, ModuleResolutionKindBundler$constant as ModuleResolutionKindBundler$constant__from_core, ModuleResolutionKindNodeNext$constant as ModuleResolutionKindNodeNext$constant__from_core, Pattern as Pattern__from_core, ResolutionModeCommonJS$constant as ResolutionModeCommonJS$constant__from_core, ResolutionModeESM$constant as ResolutionModeESM$constant__from_core, ResolutionModeNone$constant as ResolutionModeNone$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { AssertNever as AssertNever__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { GetConditions as GetConditions__from___go_module, GetPackageNameFromTypesPackageName as GetPackageNameFromTypesPackageName__from___go_module, IsApplicableVersionedTypesKey as IsApplicableVersionedTypesKey__from___go_module, MatchPatternOrExact as MatchPatternOrExact__from___go_module, ResolvedModule as ResolvedModule__from___go_module, TryGetJSExtensionForFile as TryGetJSExtensionForFile__from___go_module, TryParsePatterns as TryParsePatterns__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { GetOutputDeclarationFileNameWorker as GetOutputDeclarationFileNameWorker__from_outputpaths, GetOutputJSFileNameWorker as GetOutputJSFileNameWorker__from_outputpaths } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/outputpaths/package.js";
import { Expected as Expected__from_packagejson, ExportsOrImports as ExportsOrImports__from_packagejson, InfoCacheEntry as InfoCacheEntry__from_packagejson, JSONValueTypeArray$constant as JSONValueTypeArray$constant__from_packagejson, JSONValueTypeNotPresent$constant as JSONValueTypeNotPresent$constant__from_packagejson, JSONValueTypeNull$constant as JSONValueTypeNull$constant__from_packagejson, JSONValueTypeObject$constant as JSONValueTypeObject$constant__from_packagejson, JSONValueTypeString$constant as JSONValueTypeString$constant__from_packagejson, JSONValue as JSONValue__from_packagejson, PackageJson as PackageJson__from_packagejson, VersionPaths as VersionPaths__from_packagejson } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/packagejson/package.js";
import { HasPrefixAndSuffixWithoutOverlap as HasPrefixAndSuffixWithoutOverlap__from_stringutil, HasPrefix as HasPrefix__from_stringutil, HasSuffix as HasSuffix__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { KnownSymlinks as KnownSymlinks__from_symlinks } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/symlinks/package.js";
import { $state as $state__tspath, ChangeExtension as ChangeExtension__from_tspath, ChangeFullExtension as ChangeFullExtension__from_tspath, CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ComparePaths as ComparePaths__from_tspath, ContainsPath as ContainsPath__from_tspath, EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionDcts$string as ExtensionDcts$string__from_tspath, ExtensionDmts$string as ExtensionDmts$string__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionJson$string as ExtensionJson$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetDeclarationFileExtension as GetDeclarationFileExtension__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetRelativePathFromDirectory as GetRelativePathFromDirectory__from_tspath, HasImplementationTSFileExtension as HasImplementationTSFileExtension__from_tspath, HasTSFileExtension as HasTSFileExtension__from_tspath, IsDeclarationFileName as IsDeclarationFileName__from_tspath, IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath, NormalizePath as NormalizePath__from_tspath, PathIsRelative as PathIsRelative__from_tspath, Path as Path__from_tspath, RemoveExtension as RemoveExtension__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath, ResolvePath as ResolvePath__from_tspath, StartsWithDirectory as StartsWithDirectory__from_tspath, ToPath as ToPath__from_tspath, TryGetExtensionFromPath as TryGetExtensionFromPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { OrderedMap$Entries$string$Named_packagejson$ExportsOrImports, OrderedMap$Entries$string$SliceOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/OrderedMap$Entries.js";
import { SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncMap$Load.js";
import { SyncSet$Range$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/SyncSet$Range.js";
import { Every$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Map$string$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Map.js";
import { Some$Named_modulespecifiers$ModulePath, Some$Named_modulespecifiers$specPair } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { ForEachAncestorDirectoryStoppingAtGlobalCache$bool } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/tspath/ForEachAncestorDirectoryStoppingAtGlobalCache.js";
import { Values$MapOf_string_To_Named_modulespecifiers$ModulePath$string$Named_modulespecifiers$ModulePath } from "../../../../../../support/generics/concretizations/maps/Values.js";
import { Collect$Named_modulespecifiers$ModulePath } from "../../../../../../support/generics/concretizations/slices/Collect.js";
import { Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { Index$SliceOf_Named_modulespecifiers$ModuleSpecifierEnding$Named_modulespecifiers$ModuleSpecifierEnding } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { SortFunc$SliceOf_Named_modulespecifiers$ModulePath$Named_modulespecifiers$ModulePath } from "../../../../../../support/generics/concretizations/slices/SortFunc.js";
import { $goInterfaceAdapter$Named_modulespecifiers$ModuleSpecifierEnding, $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Named_modulespecifiers$ModulePath as GoMap } from "../../../../../../support/maps.js";
import { CountPathComponents } from "./compare.js";
import { ModuleSpecifierPreferences, getModuleSpecifierPreferences } from "./preferences.js";
import { MatchingModeDirectory$constant, MatchingModeExact$constant, MatchingModePattern$constant, ModulePath, ModuleSpecifierEndingIndex$constant, ModuleSpecifierEndingJsExtension$constant, ModuleSpecifierEndingMinimal$constant, ModuleSpecifierEndingTsExtension$constant, ModuleSpecifierOptions, RelativePreferenceExternalNonRelative$constant, RelativePreferenceNonRelative$constant, RelativePreferenceRelative$constant, ResultKindAmbient$constant, ResultKindNodeModules$constant, ResultKindNone$constant, ResultKindPaths$constant, ResultKindRedirect$constant, ResultKindRelative$constant, UserPreferences } from "./types.js";
import { GetJSExtensionForDeclarationFileExtension, GetNodeModulePathParts, IsExcludedByRegex, NodeModulePathParts, PathIsBareSpecifier, TryGetRealFileNameForNonJSDeclarationFileName, comparePathsByRedirect, ensurePathIsNonModuleName, getJSExtensionForFile, getPathsRelativeToRootDirs, getRelativePathIfInSameVolume, isPathRelativeToParent, packageJsonPathsAreEqual, prefersTsExtension, replaceFirstStar, tryGetAnyFileFromPath } from "./util.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function GetModuleSpecifiers(moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker: CheckerShape | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, importingSourceFile: SourceFileForSpecifierGeneration | undefined, host: ModuleSpecifierGenerationHost | undefined, userPreferences: UserPreferences, options: ModuleSpecifierOptions, forAutoImports: bool): RuntimeSlice<gostring> {
    const __gotots_results_0 = GetModuleSpecifiersWithInfo(moduleSymbol, checker, compilerOptions, importingSourceFile, host, UserPreferences.$copy(userPreferences), ModuleSpecifierOptions.$copy(options), forAutoImports);
    let result = __gotots_results_0[0];
    return result;
}
export function GetModuleSpecifiersWithInfo(moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker: CheckerShape | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, importingSourceFile: SourceFileForSpecifierGeneration | undefined, host: ModuleSpecifierGenerationHost | undefined, userPreferences: UserPreferences, options: ModuleSpecifierOptions, forAutoImports: bool): [
    RuntimeSlice<gostring>,
    ResultKind
] {
    let ambient = tryGetModuleNameFromAmbientModule(moduleSymbol, checker);
    if (ambient.length > 0) {
        if (forAutoImports && IsExcludedByRegex(ambient, userPreferences.AutoImportSpecifierExcludeRegexes)) {
            return [RuntimeSlice.nil<gostring>(), ResultKindAmbient$constant()];
        }
        return [RuntimeSlice.literal<gostring>([ambient]), ResultKindAmbient$constant()];
    }
    let moduleSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = GetSourceFileOfModule__from_ast(moduleSymbol);
    if (moduleSourceFile === undefined) {
        return [RuntimeSlice.nil<gostring>(), ResultKindNone$constant()];
    }
    const __gotots_receiver_0 = host;
    const __gotots_argument_0 = new GoInterfaceAdapter(moduleSourceFile);
    let moduleFileName = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_0).GetSourceOfProjectReferenceIfOutputIncluded(__gotots_argument_0);
    return GetModuleSpecifiersForFileWithInfo(importingSourceFile, moduleFileName, compilerOptions, host, UserPreferences.$copy(userPreferences), ModuleSpecifierOptions.$copy(options), forAutoImports);
}
export function GetModuleSpecifiersForFileWithInfo(importingSourceFile: SourceFileForSpecifierGeneration | undefined, moduleFileName: gostring, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined, userPreferences: UserPreferences, options: ModuleSpecifierOptions, forAutoImports: bool): [
    RuntimeSlice<gostring>,
    ResultKind
] {
    const __gotots_receiver_3 = host;
    const __gotots_argument_3 = importingSourceFile;
    const __gotots_argument_4 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_3).GetSourceOfProjectReferenceIfOutputIncluded(__gotots_argument_3);
    const __gotots_argument_5 = host;
    const __gotots_argument_6 = getInfo(__gotots_argument_4, __gotots_argument_5);
    const __gotots_argument_7 = moduleFileName;
    const __gotots_argument_8 = host;
    const __gotots_argument_9 = compilerOptions;
    const __gotots_argument_10 = ModuleSpecifierOptions.$copy(options);
    let modulePaths = getAllModulePathsWorker(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
    return computeModuleSpecifiers(modulePaths, compilerOptions, importingSourceFile, host, UserPreferences.$copy(userPreferences), ModuleSpecifierOptions.$copy(options), forAutoImports);
}
export function tryGetModuleNameFromAmbientModule(moduleSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, checker: CheckerShape | undefined): gostring {
    const __gotots_range_0 = Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if (IsModuleWithStringLiteralName__from_ast(decl) && (!IsModuleAugmentationExternal__from_ast(decl) || !IsExternalModuleNameRelative__from_tspath(Node__from_ast.Text(Node__from_ast.Name(decl))))) {
            return Node__from_ast.Text(Node__from_ast.Name(decl));
        }
    }
    const __gotots_range_1 = Symbol__from_ast.$storageOf(((moduleSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let d: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        if (!IsModuleDeclaration__from_ast(d)) {
            continue;
        }
        let possibleContainer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(d, IsModuleWithStringLiteralName__from_ast);
        if (possibleContainer === undefined || Node__from_ast.$storageOf(((possibleContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined || !IsSourceFile__from_ast(Node__from_ast.$storageOf(((possibleContainer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)) {
            continue;
        }
        const __gotots_results_1 = new SymbolTable__from_ast(Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(possibleContainer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Exports).$value.lookupOk(InternalSymbolNameExportEquals$string__from_ast);
        let sym: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (!ok || sym === undefined) {
            continue;
        }
        let exportAssignmentDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Symbol__from_ast.$storageOf(((sym ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration;
        if (exportAssignmentDecl === undefined || !(Node__from_ast.$storageOf(((exportAssignmentDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExportAssignment$constant__from_ast())) {
            continue;
        }
        const __gotots_receiver_1 = checker;
        const __gotots_argument_1 = Node__from_ast.Expression(exportAssignmentDecl);
        let exportSymbol: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined = goInterfaceNonNil<CheckerShape>(__gotots_receiver_1).GetSymbolAtLocation(__gotots_argument_1);
        if (exportSymbol === undefined) {
            continue;
        }
        if (!((Symbol__from_ast.$storageOf(((exportSymbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Flags & SymbolFlagsAlias$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_receiver_2 = checker;
            const __gotots_argument_2 = exportSymbol;
            exportSymbol = goInterfaceNonNil<CheckerShape>(__gotots_receiver_2).GetAliasedSymbol(__gotots_argument_2);
        }
        if (tsonicTypeScriptRuntime.sameLocation(exportSymbol, Node__from_ast.Symbol(d))) {
            return Node__from_ast.Text(Node__from_ast.Name(possibleContainer));
        }
    }
    return "";
}
export class Info {
    declare private readonly $goType: void;
    public constructor(public UseCaseSensitiveFileNames: bool, public ImportingSourceFileName: gostring, public SourceDirectory: gostring) {
    }
    static $copy($source: Info): Info {
        return new Info($source.UseCaseSensitiveFileNames, $source.ImportingSourceFileName, $source.SourceDirectory);
    }
    declare private readonly then?: never;
}
export function getInfo(importingSourceFileName: gostring, host: ModuleSpecifierGenerationHost | undefined): Info {
    let sourceDirectory = GetDirectoryPath__from_tspath(importingSourceFileName);
    const __gotots_field_0 = importingSourceFileName;
    const __gotots_field_1 = sourceDirectory;
    const __gotots_receiver_4 = host;
    const __gotots_field_2 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_4).UseCaseSensitiveFileNames();
    return new Info(__gotots_field_2, __gotots_field_0, __gotots_field_1);
}
export function getAllModulePaths(info: Info, importedFileName: gostring, host: ModuleSpecifierGenerationHost | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, preferences: UserPreferences, options: ModuleSpecifierOptions): RuntimeSlice<ModulePath__from_modulespecifiers$Storage> {
    let modulePaths = getAllModulePathsWorker(Info.$copy(info), importedFileName, host, compilerOptions, ModuleSpecifierOptions.$copy(options));
    return modulePaths;
}
export function getAllModulePathsWorker(info: Info, importedFileName: gostring, host: ModuleSpecifierGenerationHost | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, options: ModuleSpecifierOptions): RuntimeSlice<ModulePath__from_modulespecifiers$Storage> {
    let allFileNames: GoMapValue<gostring, ModulePath> = GoMap.make(0, []);
    let paths = GetEachFileNameOfModule(info.ImportingSourceFileName, importedFileName, host, true);
    const __gotots_range_2 = paths;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = ModulePath.$copy(ModulePath.$fromStorage(__gotots_range_2.get(__gotots_range_index_2)));
        let p = __gotots_range_value_2;
        allFileNames.store(ModulePath.$storageOf(p).FileName, p);
    }
    let useCaseSensitiveFileNames = info.UseCaseSensitiveFileNames;
    let comparePaths: (($0: ModulePath, $1: ModulePath) => int) | undefined = (a: ModulePath, b: ModulePath): int => {
        return comparePathsByRedirect(ModulePath.$copy(a), ModulePath.$copy(b), useCaseSensitiveFileNames);
    };
    const __gotots_slice_build_0 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(0, paths.length);
    for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
        __gotots_slice_build_0.$initialize(__gotots_slice_build_1, ModulePath.$storageOf(ModulePath.$zero()));
    }
    let sortedPaths = __gotots_slice_build_0;
    for (let directory = info.SourceDirectory; allFileNames.length() !== 0;) {
        let directoryStart = EnsureTrailingDirectorySeparator__from_tspath(directory);
        let pathsInDirectory = RuntimeSlice.nil<ModulePath__from_modulespecifiers$Storage>();
        const __gotots_range_3 = allFileNames;
        const __gotots_range_keys_0 = __gotots_range_3.keys();
        for (const __gotots_range_value_3 of __gotots_range_keys_0) {
            const __gotots_range_value_4 = __gotots_range_3.lookupOk(__gotots_range_value_3);
            if (!__gotots_range_value_4[1]) {
                continue;
            }
            const __gotots_range_value_5 = __gotots_range_value_3;
            const __gotots_range_value_6 = __gotots_range_value_4[0];
            let fileName = __gotots_range_value_5;
            let p = __gotots_range_value_6;
            if (strings__from_gostdlib.HasPrefix(fileName, directoryStart)) {
                const __gotots_slice_build_2 = pathsInDirectory;
                const __gotots_slice_build_4 = __gotots_slice_build_2.length + 1;
                let __gotots_slice_build_3 = __gotots_slice_build_2;
                if (__gotots_slice_build_4 <= __gotots_slice_build_2.capacity) {
                    __gotots_slice_build_3 = __gotots_slice_build_2.$withLength(__gotots_slice_build_4);
                    __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, ModulePath.$storageOf(ModulePath.$copy(p)));
                }
                else {
                    __gotots_slice_build_3 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_2.capacity, __gotots_slice_build_4));
                    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                        __gotots_slice_build_3.set(__gotots_slice_build_5, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_2.get(__gotots_slice_build_5)))));
                    }
                    __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, ModulePath.$storageOf(ModulePath.$copy(p)));
                    for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                        __gotots_slice_build_3.$initialize(__gotots_slice_build_5, ModulePath.$storageOf(ModulePath.$zero()));
                    }
                }
                pathsInDirectory = __gotots_slice_build_3;
                allFileNames.delete(fileName);
            }
        }
        if (pathsInDirectory.length > 0) {
            SortFunc$SliceOf_Named_modulespecifiers$ModulePath$Named_modulespecifiers$ModulePath(pathsInDirectory, comparePaths);
            const __gotots_slice_build_6 = sortedPaths;
            const __gotots_slice_build_7 = pathsInDirectory;
            let __gotots_slice_build_8 = __gotots_slice_build_7;
            if (__gotots_slice_build_7.length > 0) {
                __gotots_slice_build_8 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_7.length, null);
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_7.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_8.set(__gotots_slice_build_11, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_7.get(__gotots_slice_build_11)))));
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
                __gotots_slice_build_9 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_10));
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_6.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.set(__gotots_slice_build_11, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_11)))));
                }
                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.set(__gotots_slice_build_6.length + __gotots_slice_build_11, __gotots_slice_build_8.get(__gotots_slice_build_11));
                }
                for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                    __gotots_slice_build_9.$initialize(__gotots_slice_build_11, ModulePath.$storageOf(ModulePath.$zero()));
                }
            }
            sortedPaths = __gotots_slice_build_9;
        }
        let newDirectory = GetDirectoryPath__from_tspath(directory);
        if (newDirectory === directory) {
            break;
        }
        directory = newDirectory;
    }
    if (allFileNames.length() > 0) {
        let remainingPaths = Collect$Named_modulespecifiers$ModulePath(Values$MapOf_string_To_Named_modulespecifiers$ModulePath$string$Named_modulespecifiers$ModulePath(allFileNames));
        SortFunc$SliceOf_Named_modulespecifiers$ModulePath$Named_modulespecifiers$ModulePath(remainingPaths, comparePaths);
        const __gotots_slice_build_12 = sortedPaths;
        const __gotots_slice_build_13 = remainingPaths;
        let __gotots_slice_build_14 = __gotots_slice_build_13;
        if (__gotots_slice_build_13.length > 0) {
            __gotots_slice_build_14 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_13.length, null);
            for (let __gotots_slice_build_17 = 0; __gotots_slice_build_17 < __gotots_slice_build_13.length; __gotots_slice_build_17++) {
                __gotots_slice_build_14.set(__gotots_slice_build_17, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_13.get(__gotots_slice_build_17)))));
            }
        }
        const __gotots_slice_build_16 = __gotots_slice_build_12.length + __gotots_slice_build_14.length;
        let __gotots_slice_build_15 = __gotots_slice_build_12;
        if (__gotots_slice_build_16 <= __gotots_slice_build_12.capacity) {
            __gotots_slice_build_15 = __gotots_slice_build_12.$withLength(__gotots_slice_build_16);
            for (let __gotots_slice_build_17 = 0; __gotots_slice_build_17 < __gotots_slice_build_14.length; __gotots_slice_build_17++) {
                __gotots_slice_build_15.set(__gotots_slice_build_12.length + __gotots_slice_build_17, __gotots_slice_build_14.get(__gotots_slice_build_17));
            }
        }
        else {
            __gotots_slice_build_15 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_16, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_16));
            for (let __gotots_slice_build_17 = 0; __gotots_slice_build_17 < __gotots_slice_build_12.length; __gotots_slice_build_17++) {
                __gotots_slice_build_15.set(__gotots_slice_build_17, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_17)))));
            }
            for (let __gotots_slice_build_17 = 0; __gotots_slice_build_17 < __gotots_slice_build_14.length; __gotots_slice_build_17++) {
                __gotots_slice_build_15.set(__gotots_slice_build_12.length + __gotots_slice_build_17, __gotots_slice_build_14.get(__gotots_slice_build_17));
            }
            for (let __gotots_slice_build_17 = __gotots_slice_build_16; __gotots_slice_build_17 < __gotots_slice_build_15.capacity; __gotots_slice_build_17++) {
                __gotots_slice_build_15.$initialize(__gotots_slice_build_17, ModulePath.$storageOf(ModulePath.$zero()));
            }
        }
        sortedPaths = __gotots_slice_build_15;
    }
    return sortedPaths;
}
export function containsIgnoredPath(s: gostring): bool {
    return strings__from_gostdlib.Contains(s, "/node_modules/.") || strings__from_gostdlib.Contains(s, "/.git") || strings__from_gostdlib.Contains(s, ".#");
}
export function ContainsNodeModules(s: gostring): bool {
    return strings__from_gostdlib.Contains(s, "/node_modules/");
}
export function GetEachFileNameOfModule(importingFileName: gostring, importedFileName: gostring, host: ModuleSpecifierGenerationHost | undefined, preferSymlinks: bool): RuntimeSlice<ModulePath__from_modulespecifiers$Storage> {
    const __gotots_receiver_13 = host;
    let cwd = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_13).GetCurrentDirectory();
    const __gotots_argument_25 = importedFileName;
    const __gotots_argument_26 = cwd;
    const __gotots_receiver_14 = host;
    const __gotots_argument_27 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_14).UseCaseSensitiveFileNames();
    let importedPath = ToPath__from_tspath(__gotots_argument_25, __gotots_argument_26, __gotots_argument_27);
    let referenceRedirect = "";
    const __gotots_receiver_15 = host;
    const __gotots_argument_28 = importedPath;
    let outputAndReference: {
        value: SourceOutputAndProjectReference__from_tsoptions;
    } | undefined = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_15).GetProjectReferenceFromSource(__gotots_argument_28);
    if (!(outputAndReference === undefined) && (outputAndReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutputDts !== "") {
        referenceRedirect = (outputAndReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OutputDts;
    }
    const __gotots_receiver_16 = host;
    const __gotots_argument_29 = importedPath;
    let redirects = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_16).GetRedirectTargets(__gotots_argument_29);
    let importedFileNames = RuntimeSlice.make<gostring>(0, 2 + redirects.length, "");
    if (referenceRedirect.length > 0) {
        importedFileNames = importedFileNames.append("", [referenceRedirect]);
    }
    importedFileNames = importedFileNames.append("", [importedFileName]);
    importedFileNames = goSliceAppendSlice<gostring>(importedFileNames, redirects, "");
    let targets = Map$string$string(importedFileNames, (f: gostring): gostring => {
        return GetNormalizedAbsolutePath__from_tspath(f, cwd);
    });
    let shouldFilterIgnoredPaths = !Every$string(targets, containsIgnoredPath);
    const __gotots_slice_build_18 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(0, 2);
    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_18.capacity; __gotots_slice_build_19++) {
        __gotots_slice_build_18.$initialize(__gotots_slice_build_19, ModulePath.$storageOf(ModulePath.$zero()));
    }
    let results = __gotots_slice_build_18;
    if (!preferSymlinks) {
        const __gotots_range_7 = targets;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
            const __gotots_range_value_10 = __gotots_range_7.get(__gotots_range_index_6);
            let p = __gotots_range_value_10;
            if (!(shouldFilterIgnoredPaths && containsIgnoredPath(p))) {
                const __gotots_slice_build_20 = results;
                const __gotots_slice_build_22 = __gotots_slice_build_20.length + 1;
                let __gotots_slice_build_21 = __gotots_slice_build_20;
                if (__gotots_slice_build_22 <= __gotots_slice_build_20.capacity) {
                    __gotots_slice_build_21 = __gotots_slice_build_20.$withLength(__gotots_slice_build_22);
                    __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void ModulePath.$storageOf, (void ModulePath.$fromStorage,
                        {
                            FileName: p,
                            IsInNodeModules: ContainsNodeModules(p),
                            IsRedirect: referenceRedirect === p
                        })));
                }
                else {
                    __gotots_slice_build_21 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_22, RuntimeSlice.$grownCapacity(__gotots_slice_build_20.capacity, __gotots_slice_build_22));
                    for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_20.length; __gotots_slice_build_23++) {
                        __gotots_slice_build_21.set(__gotots_slice_build_23, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_20.get(__gotots_slice_build_23)))));
                    }
                    __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, (void ModulePath.$storageOf, (void ModulePath.$fromStorage,
                        {
                            FileName: p,
                            IsInNodeModules: ContainsNodeModules(p),
                            IsRedirect: referenceRedirect === p
                        })));
                    for (let __gotots_slice_build_23 = __gotots_slice_build_22; __gotots_slice_build_23 < __gotots_slice_build_21.capacity; __gotots_slice_build_23++) {
                        __gotots_slice_build_21.$initialize(__gotots_slice_build_23, ModulePath.$storageOf(ModulePath.$zero()));
                    }
                }
                results = __gotots_slice_build_21;
            }
        }
    }
    const __gotots_receiver_17 = host;
    let symlinkCache: tsonicTypeScriptRuntime.Location<KnownSymlinks__from_symlinks> | undefined = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_17).GetSymlinkCache();
    let fullImportedFileName = GetNormalizedAbsolutePath__from_tspath(importedFileName, cwd);
    if (!(symlinkCache === undefined)) {
        const __gotots_receiver_18 = host;
        const __gotots_argument_43 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_18).GetGlobalTypingsCacheLocation();
        const __gotots_argument_44 = GetDirectoryPath__from_tspath(fullImportedFileName);
        const __gotots_argument_45 = (realPathDirectory: gostring): [
            bool,
            bool
        ] => {
            const __gotots_receiver_20 = KnownSymlinks__from_symlinks.DirectoriesByRealpath(symlinkCache);
            const __gotots_argument_30 = realPathDirectory;
            const __gotots_argument_31 = cwd;
            const __gotots_receiver_19 = host;
            const __gotots_argument_32 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_19).UseCaseSensitiveFileNames();
            const __gotots_argument_33 = ToPath__from_tspath(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32).EnsureTrailingDirectorySeparator();
            const __gotots_results_2 = SyncMap$Load$Named_tspath$Path$PointerTo_Named_collections$SyncSetOf_string(__gotots_receiver_20, __gotots_argument_33);
            let symlinkSet: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (!ok) {
                return [false, false];
            }
            const __gotots_argument_34 = importingFileName;
            const __gotots_argument_35 = realPathDirectory;
            const __gotots_receiver_21 = host;
            const __gotots_argument_36 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_21).UseCaseSensitiveFileNames();
            if (StartsWithDirectory__from_tspath(__gotots_argument_34, __gotots_argument_35, __gotots_argument_36)) {
                return [false, true];
            }
            const __gotots_range_8 = targets;
            for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
                const __gotots_range_value_11 = __gotots_range_8.get(__gotots_range_index_7);
                let target = __gotots_range_value_11;
                const __gotots_argument_37 = target;
                const __gotots_argument_38 = realPathDirectory;
                const __gotots_receiver_22 = host;
                const __gotots_argument_39 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_22).UseCaseSensitiveFileNames();
                if (!StartsWithDirectory__from_tspath(__gotots_argument_37, __gotots_argument_38, __gotots_argument_39)) {
                    continue;
                }
                const __gotots_argument_40 = realPathDirectory;
                const __gotots_argument_41 = target;
                const __gotots_receiver_23 = host;
                const __gotots_field_3 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_23).UseCaseSensitiveFileNames();
                const __gotots_argument_42 = new ComparePathsOptions__from_tspath(__gotots_field_3, cwd);
                let relative = GetRelativePathFromDirectory__from_tspath(__gotots_argument_40, __gotots_argument_41, __gotots_argument_42);
                SyncSet$Range$string(symlinkSet, (symlinkDirectory: gostring): bool => {
                    let option = ResolvePath__from_tspath(symlinkDirectory, RuntimeSlice.literal<gostring>([relative]));
                    const __gotots_slice_build_24 = results;
                    const __gotots_slice_build_26 = __gotots_slice_build_24.length + 1;
                    let __gotots_slice_build_25 = __gotots_slice_build_24;
                    if (__gotots_slice_build_26 <= __gotots_slice_build_24.capacity) {
                        __gotots_slice_build_25 = __gotots_slice_build_24.$withLength(__gotots_slice_build_26);
                        __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, (void ModulePath.$storageOf, (void ModulePath.$fromStorage,
                            {
                                FileName: option,
                                IsInNodeModules: ContainsNodeModules(option),
                                IsRedirect: target === referenceRedirect
                            })));
                    }
                    else {
                        __gotots_slice_build_25 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_26, RuntimeSlice.$grownCapacity(__gotots_slice_build_24.capacity, __gotots_slice_build_26));
                        for (let __gotots_slice_build_27 = 0; __gotots_slice_build_27 < __gotots_slice_build_24.length; __gotots_slice_build_27++) {
                            __gotots_slice_build_25.set(__gotots_slice_build_27, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_24.get(__gotots_slice_build_27)))));
                        }
                        __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, (void ModulePath.$storageOf, (void ModulePath.$fromStorage,
                            {
                                FileName: option,
                                IsInNodeModules: ContainsNodeModules(option),
                                IsRedirect: target === referenceRedirect
                            })));
                        for (let __gotots_slice_build_27 = __gotots_slice_build_26; __gotots_slice_build_27 < __gotots_slice_build_25.capacity; __gotots_slice_build_27++) {
                            __gotots_slice_build_25.$initialize(__gotots_slice_build_27, ModulePath.$storageOf(ModulePath.$zero()));
                        }
                    }
                    results = __gotots_slice_build_25;
                    shouldFilterIgnoredPaths = true;
                    return true;
                });
            }
            return [false, false];
        };
        ForEachAncestorDirectoryStoppingAtGlobalCache$bool(__gotots_argument_43, __gotots_argument_44, __gotots_argument_45);
    }
    if (preferSymlinks) {
        const __gotots_range_9 = targets;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9.length; __gotots_range_index_8++) {
            const __gotots_range_value_12 = __gotots_range_9.get(__gotots_range_index_8);
            let p = __gotots_range_value_12;
            if (!(shouldFilterIgnoredPaths && containsIgnoredPath(p))) {
                const __gotots_slice_build_28 = results;
                const __gotots_slice_build_30 = __gotots_slice_build_28.length + 1;
                let __gotots_slice_build_29 = __gotots_slice_build_28;
                if (__gotots_slice_build_30 <= __gotots_slice_build_28.capacity) {
                    __gotots_slice_build_29 = __gotots_slice_build_28.$withLength(__gotots_slice_build_30);
                    __gotots_slice_build_29.set(__gotots_slice_build_28.length + 0, (void ModulePath.$storageOf, (void ModulePath.$fromStorage,
                        {
                            FileName: p,
                            IsInNodeModules: ContainsNodeModules(p),
                            IsRedirect: referenceRedirect === p
                        })));
                }
                else {
                    __gotots_slice_build_29 = goSliceAllocate<ModulePath__from_modulespecifiers$Storage>(__gotots_slice_build_30, RuntimeSlice.$grownCapacity(__gotots_slice_build_28.capacity, __gotots_slice_build_30));
                    for (let __gotots_slice_build_31 = 0; __gotots_slice_build_31 < __gotots_slice_build_28.length; __gotots_slice_build_31++) {
                        __gotots_slice_build_29.set(__gotots_slice_build_31, ModulePath.$storageOf(ModulePath.$copy(ModulePath.$fromStorage(__gotots_slice_build_28.get(__gotots_slice_build_31)))));
                    }
                    __gotots_slice_build_29.set(__gotots_slice_build_28.length + 0, (void ModulePath.$storageOf, (void ModulePath.$fromStorage,
                        {
                            FileName: p,
                            IsInNodeModules: ContainsNodeModules(p),
                            IsRedirect: referenceRedirect === p
                        })));
                    for (let __gotots_slice_build_31 = __gotots_slice_build_30; __gotots_slice_build_31 < __gotots_slice_build_29.capacity; __gotots_slice_build_31++) {
                        __gotots_slice_build_29.$initialize(__gotots_slice_build_31, ModulePath.$storageOf(ModulePath.$zero()));
                    }
                }
                results = __gotots_slice_build_29;
            }
        }
    }
    return results;
}
export function computeModuleSpecifiers(modulePaths: RuntimeSlice<ModulePath__from_modulespecifiers$Storage>, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, importingSourceFile: SourceFileForSpecifierGeneration | undefined, host: ModuleSpecifierGenerationHost | undefined, userPreferences: UserPreferences, options: ModuleSpecifierOptions, forAutoImport: bool): [
    RuntimeSlice<gostring>,
    ResultKind
] {
    const __gotots_receiver_5 = importingSourceFile;
    const __gotots_argument_11 = goInterfaceNonNil<SourceFileForSpecifierGeneration>(__gotots_receiver_5).FileName();
    const __gotots_argument_12 = host;
    let info = getInfo(__gotots_argument_11, __gotots_argument_12);
    let preferences = getModuleSpecifierPreferences(UserPreferences.$copy(userPreferences), host, compilerOptions, importingSourceFile, "");
    let existingSpecifier = "";
    const __gotots_range_4 = modulePaths;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_4.length; __gotots_range_index_3++) {
        const __gotots_range_value_7 = ModulePath.$copy(ModulePath.$fromStorage(__gotots_range_4.get(__gotots_range_index_3)));
        let modulePath = __gotots_range_value_7;
        const __gotots_argument_13 = ModulePath.$storageOf(modulePath).FileName;
        const __gotots_receiver_6 = host;
        const __gotots_argument_14 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_6).GetCurrentDirectory();
        const __gotots_argument_15 = info.UseCaseSensitiveFileNames;
        let targetPath = ToPath__from_tspath(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
        let existingImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_receiver_7 = importingSourceFile;
        const __gotots_range_5 = goInterfaceNonNil<SourceFileForSpecifierGeneration>(__gotots_receiver_7).Imports();
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
            const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_4);
            let importSpecifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_8;
            const __gotots_receiver_8 = host;
            const __gotots_argument_16 = importingSourceFile;
            const __gotots_argument_17 = importSpecifier;
            let resolvedModule: tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module> | undefined = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_8).GetResolvedModuleFromModuleSpecifier(__gotots_argument_16, __gotots_argument_17);
            let __gotots_logical_result_0 = ResolvedModule__from___go_module.IsResolved(resolvedModule);
            if (__gotots_logical_result_0) {
                const __gotots_argument_18 = ((resolvedModule ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ResolvedModule__from___go_module>).value.ResolvedFileName;
                const __gotots_receiver_9 = host;
                const __gotots_argument_19 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_9).GetCurrentDirectory();
                const __gotots_argument_20 = info.UseCaseSensitiveFileNames;
                __gotots_logical_result_0 = ToPath__from_tspath(__gotots_argument_18, __gotots_argument_19, __gotots_argument_20).$value === targetPath.$value;
            }
            if (__gotots_logical_result_0) {
                existingImport = importSpecifier;
                break;
            }
        }
        if (!(existingImport === undefined)) {
            if (preferences.relativePreference === RelativePreferenceNonRelative$constant() && PathIsRelative__from_tspath(Node__from_ast.Text(existingImport))) {
                continue;
            }
            const __gotots_receiver_10 = host;
            const __gotots_argument_21 = importingSourceFile;
            const __gotots_argument_22 = existingImport;
            let existingMode = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_10).GetModeForUsageLocation(__gotots_argument_21, __gotots_argument_22);
            let targetMode = options.OverrideImportMode;
            if (targetMode === ResolutionModeNone$constant__from_core()) {
                const __gotots_receiver_11 = host;
                const __gotots_argument_23 = importingSourceFile;
                targetMode = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_11).GetDefaultResolutionModeForFile(__gotots_argument_23);
            }
            if (!(existingMode === targetMode) && !(existingMode === ResolutionModeNone$constant__from_core()) && !(targetMode === ResolutionModeNone$constant__from_core())) {
                continue;
            }
            existingSpecifier = Node__from_ast.Text(existingImport);
            break;
        }
    }
    if (existingSpecifier !== "") {
        return [RuntimeSlice.literal<gostring>([existingSpecifier]), ResultKindNone$constant()];
    }
    let importedFileIsInNodeModules = Some$Named_modulespecifiers$ModulePath(modulePaths, (p: ModulePath): bool => {
        return ModulePath.$storageOf(p).IsInNodeModules;
    });
    let pathsSpecifiers = RuntimeSlice.nil<gostring>();
    let redirectPathsSpecifiers = RuntimeSlice.nil<gostring>();
    let nodeModulesSpecifiers = RuntimeSlice.nil<gostring>();
    let relativeSpecifiers = RuntimeSlice.nil<gostring>();
    const __gotots_range_6 = modulePaths;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
        const __gotots_range_value_9 = ModulePath.$copy(ModulePath.$fromStorage(__gotots_range_6.get(__gotots_range_index_5)));
        let modulePath = __gotots_range_value_9;
        let specifier = "";
        if (ModulePath.$storageOf(modulePath).IsInNodeModules) {
            specifier = tryGetModuleNameAsNodeModule(ModulePath.$copy(modulePath), Info.$copy(info), importingSourceFile, host, compilerOptions, UserPreferences.$copy(userPreferences), false, options.OverrideImportMode);
        }
        if (specifier.length > 0 && !(forAutoImport && IsExcludedByRegex(specifier, preferences.excludeRegexes))) {
            nodeModulesSpecifiers = nodeModulesSpecifiers.append("", [specifier]);
            if (ModulePath.$storageOf(modulePath).IsRedirect) {
                return [nodeModulesSpecifiers, ResultKindNodeModules$constant()];
            }
        }
        let importMode = options.OverrideImportMode;
        if (importMode === ResolutionModeNone$constant__from_core()) {
            const __gotots_receiver_12 = host;
            const __gotots_argument_24 = importingSourceFile;
            importMode = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_12).GetDefaultResolutionModeForFile(__gotots_argument_24);
        }
        let local = getLocalModuleSpecifier(ModulePath.$storageOf(modulePath).FileName, Info.$copy(info), compilerOptions, host, importMode, ModuleSpecifierPreferences.$copy(preferences), ModulePath.$storageOf(modulePath).IsRedirect || specifier.length > 0);
        if (local.length === 0 || forAutoImport && IsExcludedByRegex(local, preferences.excludeRegexes)) {
            continue;
        }
        if (ModulePath.$storageOf(modulePath).IsRedirect) {
            redirectPathsSpecifiers = redirectPathsSpecifiers.append("", [local]);
        }
        else if (PathIsBareSpecifier(local)) {
            if (ContainsNodeModules(local)) {
                relativeSpecifiers = relativeSpecifiers.append("", [local]);
            }
            else {
                pathsSpecifiers = pathsSpecifiers.append("", [local]);
            }
        }
        else if (forAutoImport || !importedFileIsInNodeModules || ModulePath.$storageOf(modulePath).IsInNodeModules) {
            relativeSpecifiers = relativeSpecifiers.append("", [local]);
        }
    }
    if (pathsSpecifiers.length > 0) {
        return [pathsSpecifiers, ResultKindPaths$constant()];
    }
    if (redirectPathsSpecifiers.length > 0) {
        return [redirectPathsSpecifiers, ResultKindRedirect$constant()];
    }
    if (nodeModulesSpecifiers.length > 0) {
        return [nodeModulesSpecifiers, ResultKindNodeModules$constant()];
    }
    return [relativeSpecifiers, ResultKindRelative$constant()];
}
export function getLocalModuleSpecifier(moduleFileName: gostring, info: Info, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined, importMode: ModuleKind__from_core, preferences: ModuleSpecifierPreferences, pathsOnly: bool): gostring {
    let paths: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined = (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Paths;
    let rootDirs: CompilerOptions__from_core["RootDirs"] = (compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDirs;
    if (pathsOnly && paths === undefined) {
        return "";
    }
    let sourceDirectory = info.SourceDirectory;
    const __gotots_callee_1 = preferences.getAllowedEndingsInPreferredOrder;
    const __gotots_argument_47 = importMode;
    let allowedEndings = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_47);
    let relativePath = "";
    if (rootDirs.length > 0) {
        relativePath = tryGetModuleNameFromRootDirs(rootDirs, moduleFileName, sourceDirectory, allowedEndings, compilerOptions, host);
    }
    if (relativePath.length === 0) {
        const __gotots_argument_48 = sourceDirectory;
        const __gotots_argument_49 = moduleFileName;
        const __gotots_receiver_26 = host;
        const __gotots_field_4 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_26).UseCaseSensitiveFileNames();
        const __gotots_receiver_27 = host;
        const __gotots_field_5 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_27).GetCurrentDirectory();
        const __gotots_argument_50 = new ComparePathsOptions__from_tspath(__gotots_field_4, __gotots_field_5);
        const __gotots_argument_51 = GetRelativePathFromDirectory__from_tspath(__gotots_argument_48, __gotots_argument_49, __gotots_argument_50);
        const __gotots_argument_52 = ensurePathIsNonModuleName(__gotots_argument_51);
        const __gotots_argument_53 = allowedEndings;
        const __gotots_argument_54 = compilerOptions;
        const __gotots_argument_55 = host;
        relativePath = processEnding(__gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55);
    }
    if ((paths === undefined && !CompilerOptions__from_core.GetResolvePackageJsonImports(compilerOptions)) || preferences.relativePreference === RelativePreferenceRelative$constant()) {
        if (pathsOnly) {
            return "";
        }
        return relativePath;
    }
    const __gotots_receiver_29 = compilerOptions;
    const __gotots_receiver_28 = host;
    const __gotots_argument_56 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_28).GetCurrentDirectory();
    let root = CompilerOptions__from_core.GetPathsBasePath(__gotots_receiver_29, __gotots_argument_56);
    const __gotots_argument_57 = root;
    const __gotots_receiver_30 = host;
    const __gotots_argument_58 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_30).GetCurrentDirectory();
    let baseDirectory = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_57, __gotots_argument_58);
    const __gotots_argument_59 = moduleFileName;
    const __gotots_argument_60 = baseDirectory;
    const __gotots_receiver_31 = host;
    const __gotots_argument_61 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_31).UseCaseSensitiveFileNames();
    let relativeToBaseUrl = getRelativePathIfInSameVolume(__gotots_argument_59, __gotots_argument_60, __gotots_argument_61);
    if (relativeToBaseUrl.length === 0) {
        if (pathsOnly) {
            return "";
        }
        return relativePath;
    }
    let fromPackageJsonImports = "";
    if (!pathsOnly) {
        fromPackageJsonImports = tryGetModuleNameFromPackageJsonImports(moduleFileName, sourceDirectory, compilerOptions, host, importMode, prefersTsExtension(allowedEndings));
    }
    let fromPaths = "";
    if ((pathsOnly || fromPackageJsonImports.length === 0) && !(paths === undefined)) {
        fromPaths = tryGetModuleNameFromPaths(relativeToBaseUrl, paths, allowedEndings, baseDirectory, host, compilerOptions);
    }
    if (pathsOnly) {
        return fromPaths;
    }
    let maybeNonRelative = "";
    if (fromPackageJsonImports.length > 0) {
        maybeNonRelative = fromPackageJsonImports;
    }
    else {
        maybeNonRelative = fromPaths;
    }
    if (maybeNonRelative.length === 0) {
        return relativePath;
    }
    let relativeIsExcluded = IsExcludedByRegex(relativePath, preferences.excludeRegexes);
    let nonRelativeIsExcluded = IsExcludedByRegex(maybeNonRelative, preferences.excludeRegexes);
    if (!relativeIsExcluded && nonRelativeIsExcluded) {
        return relativePath;
    }
    if (relativeIsExcluded && !nonRelativeIsExcluded) {
        return maybeNonRelative;
    }
    if (preferences.relativePreference === RelativePreferenceNonRelative$constant() && !PathIsRelative__from_tspath(maybeNonRelative)) {
        return maybeNonRelative;
    }
    if (preferences.relativePreference === RelativePreferenceExternalNonRelative$constant() && !PathIsRelative__from_tspath(maybeNonRelative)) {
        let projectDirectory = new Path__from_tspath("");
        if ((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath.length > 0) {
            const __gotots_argument_62 = GetDirectoryPath__from_tspath((compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath);
            const __gotots_receiver_32 = host;
            const __gotots_argument_63 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_32).GetCurrentDirectory();
            const __gotots_receiver_33 = host;
            const __gotots_argument_64 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_33).UseCaseSensitiveFileNames();
            projectDirectory = ToPath__from_tspath(__gotots_argument_62, __gotots_argument_63, __gotots_argument_64);
        }
        else {
            const __gotots_receiver_34 = host;
            const __gotots_argument_65 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_34).GetCurrentDirectory();
            const __gotots_receiver_35 = host;
            const __gotots_argument_66 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_35).GetCurrentDirectory();
            const __gotots_receiver_36 = host;
            const __gotots_argument_67 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_36).UseCaseSensitiveFileNames();
            projectDirectory = ToPath__from_tspath(__gotots_argument_65, __gotots_argument_66, __gotots_argument_67);
        }
        const __gotots_argument_68 = sourceDirectory;
        const __gotots_receiver_37 = host;
        const __gotots_argument_69 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_37).GetCurrentDirectory();
        const __gotots_receiver_38 = host;
        const __gotots_argument_70 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_38).UseCaseSensitiveFileNames();
        let canonicalSourceDirectory = ToPath__from_tspath(__gotots_argument_68, __gotots_argument_69, __gotots_argument_70);
        const __gotots_argument_71 = moduleFileName;
        const __gotots_argument_72 = projectDirectory.$value;
        const __gotots_receiver_39 = host;
        const __gotots_argument_73 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_39).UseCaseSensitiveFileNames();
        let modulePath = ToPath__from_tspath(__gotots_argument_71, __gotots_argument_72, __gotots_argument_73);
        let sourceIsInternal = projectDirectory.ContainsPath(canonicalSourceDirectory);
        let targetIsInternal = projectDirectory.ContainsPath(modulePath);
        if (sourceIsInternal && !targetIsInternal || !sourceIsInternal && targetIsInternal) {
            return maybeNonRelative;
        }
        const __gotots_receiver_40 = host;
        const __gotots_argument_74 = GetDirectoryPath__from_tspath(modulePath.$value);
        let nearestTargetPackageJson = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_40).GetNearestAncestorDirectoryWithPackageJson(__gotots_argument_74);
        const __gotots_receiver_41 = host;
        const __gotots_argument_75 = sourceDirectory;
        let nearestSourcePackageJson = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_41).GetNearestAncestorDirectoryWithPackageJson(__gotots_argument_75);
        const __gotots_argument_76 = nearestTargetPackageJson;
        const __gotots_argument_77 = nearestSourcePackageJson;
        const __gotots_receiver_42 = host;
        const __gotots_field_6 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_42).UseCaseSensitiveFileNames();
        const __gotots_receiver_43 = host;
        const __gotots_field_7 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_43).GetCurrentDirectory();
        const __gotots_argument_78 = new ComparePathsOptions__from_tspath(__gotots_field_6, __gotots_field_7);
        if (!packageJsonPathsAreEqual(__gotots_argument_76, __gotots_argument_77, __gotots_argument_78)) {
            return maybeNonRelative;
        }
        return relativePath;
    }
    if (isPathRelativeToParent(maybeNonRelative) || CountPathComponents(relativePath) < CountPathComponents(maybeNonRelative)) {
        return relativePath;
    }
    return maybeNonRelative;
}
export function processEnding(fileName: gostring, allowedEndings: RuntimeSlice<ModuleSpecifierEnding>, options: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined): gostring {
    if (FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionJson$string__from_tspath, ExtensionMjs$string__from_tspath, ExtensionCjs$string__from_tspath]))) {
        return fileName;
    }
    let noExtension = RemoveFileExtension__from_tspath(fileName);
    if (fileName === noExtension) {
        return fileName;
    }
    let jsPriority = Index$SliceOf_Named_modulespecifiers$ModuleSpecifierEnding$Named_modulespecifiers$ModuleSpecifierEnding(allowedEndings, ModuleSpecifierEndingJsExtension$constant());
    let tsPriority = Index$SliceOf_Named_modulespecifiers$ModuleSpecifierEnding$Named_modulespecifiers$ModuleSpecifierEnding(allowedEndings, ModuleSpecifierEndingTsExtension$constant());
    if (FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionMts$string__from_tspath, ExtensionCts$string__from_tspath])) && tsPriority !== -1 && tsPriority < jsPriority) {
        return fileName;
    }
    if (FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionDmts$string__from_tspath, ExtensionDcts$string__from_tspath]))) {
        let inputExt = GetDeclarationFileExtension__from_tspath(fileName);
        let ext = GetJSExtensionForDeclarationFileExtension(inputExt);
        return RemoveExtension__from_tspath(fileName, inputExt) + ext;
    }
    if (FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionMts$string__from_tspath, ExtensionCts$string__from_tspath]))) {
        return noExtension + getJSExtensionForFile(fileName, options);
    }
    if (!FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionDts$string__from_tspath])) && FileExtensionIsOneOf__from_tspath(fileName, RuntimeSlice.literal<gostring>([ExtensionTs$string__from_tspath])) && strings__from_gostdlib.Contains(fileName, ".d.")) {
        {
            let result = TryGetRealFileNameForNonJSDeclarationFileName(fileName);
            if (result !== "") {
                return result;
            }
        }
    }
    switch (allowedEndings.get(0)) {
        case ModuleSpecifierEndingMinimal$constant(): {
            let withoutIndex = strings__from_gostdlib.TrimSuffix(noExtension, "/index");
            if (!(host === undefined) && withoutIndex !== noExtension && tryGetAnyFileFromPath(host, withoutIndex)) {
                return noExtension;
            }
            return withoutIndex;
            break;
        }
        case ModuleSpecifierEndingIndex$constant(): {
            return noExtension;
            break;
        }
        case ModuleSpecifierEndingJsExtension$constant(): {
            return noExtension + getJSExtensionForFile(fileName, options);
            break;
        }
        case ModuleSpecifierEndingTsExtension$constant(): {
            if (IsDeclarationFileName__from_tspath(fileName)) {
                let extensionlessPriority = -1;
                const __gotots_range_10 = allowedEndings;
                for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10.length; __gotots_range_index_9++) {
                    const __gotots_range_value_13 = __gotots_range_index_9;
                    const __gotots_range_value_14 = __gotots_range_10.get(__gotots_range_index_9);
                    let i = __gotots_range_value_13;
                    let e = __gotots_range_value_14;
                    if (e === ModuleSpecifierEndingMinimal$constant() || e === ModuleSpecifierEndingIndex$constant()) {
                        extensionlessPriority = i;
                        break;
                    }
                }
                if (extensionlessPriority !== -1 && extensionlessPriority < jsPriority) {
                    return noExtension;
                }
                return noExtension + getJSExtensionForFile(fileName, options);
            }
            return fileName;
            break;
        }
        default: {
            AssertNever__from_debug(new $goInterfaceAdapter$Named_modulespecifiers$ModuleSpecifierEnding(allowedEndings.get(0)), RuntimeSlice.nil<GoInterface | undefined>());
            return "";
            break;
        }
    }
}
export function tryGetModuleNameFromRootDirs(rootDirs: RuntimeSlice<gostring>, moduleFileName: gostring, sourceDirectory: gostring, allowedEndings: RuntimeSlice<ModuleSpecifierEnding>, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined): gostring {
    const __gotots_argument_87 = moduleFileName;
    const __gotots_argument_88 = rootDirs;
    const __gotots_receiver_50 = host;
    const __gotots_argument_89 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_50).UseCaseSensitiveFileNames();
    let normalizedTargetPaths = getPathsRelativeToRootDirs(__gotots_argument_87, __gotots_argument_88, __gotots_argument_89);
    if (normalizedTargetPaths.length === 0) {
        return "";
    }
    const __gotots_argument_90 = sourceDirectory;
    const __gotots_argument_91 = rootDirs;
    const __gotots_receiver_51 = host;
    const __gotots_argument_92 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_51).UseCaseSensitiveFileNames();
    let normalizedSourcePaths = getPathsRelativeToRootDirs(__gotots_argument_90, __gotots_argument_91, __gotots_argument_92);
    let shortest = "";
    let shortestSepCount = 0;
    const __gotots_range_11 = normalizedSourcePaths;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11.length; __gotots_range_index_10++) {
        const __gotots_range_value_15 = __gotots_range_11.get(__gotots_range_index_10);
        let sourcePath = __gotots_range_value_15;
        const __gotots_range_12 = normalizedTargetPaths;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_12.length; __gotots_range_index_11++) {
            const __gotots_range_value_16 = __gotots_range_12.get(__gotots_range_index_11);
            let targetPath = __gotots_range_value_16;
            const __gotots_argument_93 = sourcePath;
            const __gotots_argument_94 = targetPath;
            const __gotots_receiver_52 = host;
            const __gotots_field_10 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_52).UseCaseSensitiveFileNames();
            const __gotots_receiver_53 = host;
            const __gotots_field_11 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_53).GetCurrentDirectory();
            const __gotots_argument_95 = new ComparePathsOptions__from_tspath(__gotots_field_10, __gotots_field_11);
            const __gotots_argument_96 = GetRelativePathFromDirectory__from_tspath(__gotots_argument_93, __gotots_argument_94, __gotots_argument_95);
            let candidate = ensurePathIsNonModuleName(__gotots_argument_96);
            let candidateSepCount = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(candidate, "/")));
            if (shortest.length === 0 || candidateSepCount < shortestSepCount) {
                shortest = candidate;
                shortestSepCount = candidateSepCount;
            }
        }
    }
    if (shortest.length === 0) {
        return "";
    }
    return processEnding(shortest, allowedEndings, compilerOptions, host);
}
export function tryGetModuleNameAsNodeModule(pathObj: ModulePath, info: Info, importingSourceFile: SourceFileForSpecifierGeneration | undefined, host: ModuleSpecifierGenerationHost | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, userPreferences: UserPreferences, packageNameOnly: bool, overrideMode: ModuleKind__from_core): gostring {
    let parts: NodeModulePathParts | undefined = GetNodeModulePathParts(ModulePath.$storageOf(pathObj).FileName);
    if (parts === undefined) {
        return "";
    }
    let preferences = getModuleSpecifierPreferences(UserPreferences.$copy(userPreferences), host, options, importingSourceFile, "");
    const __gotots_callee_0 = preferences.getAllowedEndingsInPreferredOrder;
    const __gotots_argument_46 = ResolutionModeNone$constant__from_core();
    let allowedEndings = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_46);
    const __gotots_receiver_24 = host;
    let caseSensitive = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_24).UseCaseSensitiveFileNames();
    let moduleSpecifier = ModulePath.$storageOf(pathObj).FileName;
    let isPackageRootPath = false;
    if (!packageNameOnly) {
        let packageRootIndex = (parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).PackageRootIndex;
        let moduleFileName = "";
        for (; true;) {
            let pkgJsonResults = tryDirectoryWithPackageJson(NodeModulePathParts.$copy(NodeModulePathParts.$copy((parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")))), ModulePath.$copy(pathObj), importingSourceFile, host, overrideMode, options, allowedEndings);
            let moduleFileToTry = pkgJsonResults.moduleFileToTry;
            let packageRootPath = pkgJsonResults.packageRootPath;
            let blockedByExports = pkgJsonResults.blockedByExports;
            let verbatimFromExports = pkgJsonResults.verbatimFromExports;
            if (blockedByExports) {
                return "";
            }
            if (verbatimFromExports) {
                return moduleFileToTry;
            }
            if (packageRootPath.length > 0) {
                moduleSpecifier = packageRootPath;
                isPackageRootPath = true;
                break;
            }
            if (moduleFileName.length === 0) {
                moduleFileName = moduleFileToTry;
            }
            packageRootIndex = IndexAfter__from_core(ModulePath.$storageOf(pathObj).FileName, "/", packageRootIndex + 1);
            if (packageRootIndex === -1) {
                moduleSpecifier = processEnding(moduleFileName, allowedEndings, options, host);
                break;
            }
        }
    }
    if (ModulePath.$storageOf(pathObj).IsRedirect && !isPackageRootPath) {
        return "";
    }
    const __gotots_receiver_25 = host;
    let globalTypingsCacheLocation = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_25).GetGlobalTypingsCacheLocation();
    let pathToTopLevelNodeModules = goStringSlice(moduleSpecifier, 0, (parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TopLevelNodeModulesIndex);
    if (!HasPrefix__from_stringutil(info.SourceDirectory, pathToTopLevelNodeModules, caseSensitive) || globalTypingsCacheLocation.length > 0 && HasPrefix__from_stringutil(globalTypingsCacheLocation, pathToTopLevelNodeModules, caseSensitive)) {
        return "";
    }
    let nodeModulesDirectoryName = goStringSlice(moduleSpecifier, (parts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TopLevelPackageNameIndex + 1);
    return GetPackageNameFromTypesPackageName__from___go_module(nodeModulesDirectoryName);
}
export class pkgJsonDirAttemptResult {
    declare private readonly $goType: void;
    public constructor(public moduleFileToTry: gostring, public packageRootPath: gostring, public blockedByExports: bool, public verbatimFromExports: bool) {
    }
    declare private readonly then?: never;
}
export function tryDirectoryWithPackageJson(parts: NodeModulePathParts, pathObj: ModulePath, importingSourceFile: SourceFileForSpecifierGeneration | undefined, host: ModuleSpecifierGenerationHost | undefined, overrideMode: ModuleKind__from_core, options: {
    value: CompilerOptions__from_core;
} | undefined, allowedEndings: RuntimeSlice<ModuleSpecifierEnding>): pkgJsonDirAttemptResult {
    let rootIdx = parts.PackageRootIndex;
    if (rootIdx === -1) {
        rootIdx = ModulePath.$storageOf(pathObj).FileName.length;
    }
    let packageRootPath = goStringSlice(ModulePath.$storageOf(pathObj).FileName, 0, rootIdx);
    let packageJsonPath = CombinePaths__from_tspath(packageRootPath, RuntimeSlice.literal<gostring>(["package.json"]));
    let moduleFileToTry = ModulePath.$storageOf(pathObj).FileName;
    let maybeBlockedByTypesVersions = false;
    const __gotots_receiver_44 = host;
    const __gotots_argument_79 = packageJsonPath;
    let packageJson: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_44).GetPackageJsonInfo(__gotots_argument_79);
    if (packageJson === undefined) {
        let fileName = goStringSlice(moduleFileToTry, parts.PackageRootIndex + 1);
        if (fileName === "index.d.ts" || fileName === "index.js" || fileName === "index.ts" || fileName === "index.tsx") {
            return new pkgJsonDirAttemptResult(moduleFileToTry, packageRootPath, false, false);
        }
        else {
            return new pkgJsonDirAttemptResult(moduleFileToTry, "", false, false);
        }
    }
    let importMode = overrideMode;
    if (importMode === ResolutionModeNone$constant__from_core()) {
        const __gotots_receiver_45 = host;
        const __gotots_argument_80 = importingSourceFile;
        importMode = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_45).GetDefaultResolutionModeForFile(__gotots_argument_80);
    }
    let packageJsonContent: {
        value: PackageJson__from_packagejson;
    } | undefined = InfoCacheEntry__from_packagejson.GetContents(packageJson);
    if (CompilerOptions__from_core.GetResolvePackageJsonExports(options)) {
        let nodeModulesDirectoryName = goStringSlice(packageRootPath, parts.TopLevelPackageNameIndex + 1);
        let packageName = GetPackageNameFromTypesPackageName__from___go_module(nodeModulesDirectoryName);
        if (FileExtensionIsOneOf__from_tspath(ModulePath.$storageOf(pathObj).FileName, RuntimeSlice.literal<gostring>([ExtensionCjs$string__from_tspath, ExtensionCts$string__from_tspath, ExtensionDcts$string__from_tspath]))) {
            importMode = ResolutionModeCommonJS$constant__from_core();
        }
        else if (FileExtensionIsOneOf__from_tspath(ModulePath.$storageOf(pathObj).FileName, RuntimeSlice.literal<gostring>([ExtensionMjs$string__from_tspath, ExtensionMts$string__from_tspath, ExtensionDmts$string__from_tspath]))) {
            importMode = ResolutionModeESM$constant__from_core();
        }
        let conditions = GetConditions__from___go_module(options, importMode);
        let fromExports = "";
        if (!(packageJsonContent === undefined) && !((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
            ExportsOrImports__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports).JSONValue)).Type === JSONValueTypeNotPresent$constant__from_packagejson())) {
            fromExports = tryGetModuleNameFromExports(options, host, ModulePath.$storageOf(pathObj).FileName, packageRootPath, packageName, ExportsOrImports__from_packagejson.$copy((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports), conditions);
        }
        if (fromExports.length > 0) {
            return new pkgJsonDirAttemptResult(fromExports, "", false, true);
        }
        if (!(packageJsonContent === undefined) && !((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
            ExportsOrImports__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Exports).JSONValue)).Type === JSONValueTypeNotPresent$constant__from_packagejson())) {
            return new pkgJsonDirAttemptResult(ModulePath.$storageOf(pathObj).FileName, "", true, false);
        }
    }
    let versionPaths = VersionPaths__from_packagejson.$zero();
    const versionPaths$location = tsonicTypeScriptRuntime.boundLocation({}, () => versionPaths, versionPaths$next => versionPaths = versionPaths$next);
    if (!(packageJsonContent === undefined) && JSONValue__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.TypesVersions).Type === JSONValueTypeObject$constant__from_packagejson()) {
        versionPaths = PackageJson__from_packagejson.GetVersionPaths(packageJsonContent, void 0);
    }
    if (!(VersionPaths__from_packagejson.GetPaths(versionPaths$location) === undefined)) {
        let subModuleName = goStringSlice(ModulePath.$storageOf(pathObj).FileName, packageRootPath.length + 1);
        let fromPaths = tryGetModuleNameFromPaths(subModuleName, VersionPaths__from_packagejson.GetPaths(versionPaths$location), allowedEndings, packageRootPath, host, options);
        if (fromPaths.length === 0) {
            maybeBlockedByTypesVersions = true;
        }
        else {
            moduleFileToTry = CombinePaths__from_tspath(packageRootPath, RuntimeSlice.literal<gostring>([fromPaths]));
        }
    }
    let mainFileRelative = "index.js";
    if (!(packageJsonContent === undefined)) {
        if (Expected__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Typings).Valid) {
            mainFileRelative = Expected__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Typings).Value;
        }
        else if (Expected__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Types).Valid) {
            mainFileRelative = Expected__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Types).Value;
        }
        else if (Expected__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Main).Valid) {
            mainFileRelative = Expected__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Main).Value;
        }
    }
    if (mainFileRelative.length > 0 && !(maybeBlockedByTypesVersions && !Pattern__from_core.$equal(MatchPatternOrExact__from___go_module(TryParsePatterns__from___go_module(VersionPaths__from_packagejson.GetPaths(versionPaths$location)), mainFileRelative), Pattern__from_core.$fromStorage({
        Text: "",
        StarIndex: 0
    })))) {
        const __gotots_argument_81 = mainFileRelative;
        const __gotots_argument_82 = packageRootPath;
        const __gotots_receiver_46 = host;
        const __gotots_argument_83 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_46).UseCaseSensitiveFileNames();
        let mainExportFile = ToPath__from_tspath(__gotots_argument_81, __gotots_argument_82, __gotots_argument_83);
        const __gotots_receiver_47 = host;
        const __gotots_field_8 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_47).UseCaseSensitiveFileNames();
        const __gotots_receiver_48 = host;
        const __gotots_field_9 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_48).GetCurrentDirectory();
        let compareOpt = new ComparePathsOptions__from_tspath(__gotots_field_8, __gotots_field_9);
        if (ComparePaths__from_tspath(RemoveFileExtension__from_tspath(mainExportFile.$value), RemoveFileExtension__from_tspath(moduleFileToTry), ComparePathsOptions__from_tspath.$copy(compareOpt)) === 0) {
            return new pkgJsonDirAttemptResult(moduleFileToTry, packageRootPath, false, false);
        }
        else {
            let __gotots_logical_result_2 = packageJsonContent === undefined;
            if (!__gotots_logical_result_2) {
                let __gotots_logical_result_1 = Expected__from_packagejson.$storageOf((packageJsonContent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.HeaderFields.Type).Value !== "module" && !FileExtensionIsOneOf__from_tspath(moduleFileToTry, $state__tspath.ExtensionsNotSupportingExtensionlessResolution);
                if (__gotots_logical_result_1) {
                    const __gotots_argument_84 = moduleFileToTry;
                    const __gotots_argument_85 = mainExportFile.$value;
                    const __gotots_receiver_49 = host;
                    const __gotots_argument_86 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_49).UseCaseSensitiveFileNames();
                    __gotots_logical_result_1 = HasPrefix__from_stringutil(__gotots_argument_84, __gotots_argument_85, __gotots_argument_86);
                }
                __gotots_logical_result_2 = __gotots_logical_result_1 && ComparePaths__from_tspath(GetDirectoryPath__from_tspath(moduleFileToTry), RemoveTrailingDirectorySeparator__from_tspath(mainExportFile.$value), ComparePathsOptions__from_tspath.$copy(compareOpt)) === 0 && RemoveFileExtension__from_tspath(GetBaseFileName__from_tspath(moduleFileToTry)) === "index";
            }
            if (__gotots_logical_result_2) {
                return new pkgJsonDirAttemptResult(moduleFileToTry, packageRootPath, false, false);
            }
        }
    }
    return new pkgJsonDirAttemptResult(moduleFileToTry, "", false, false);
}
export function tryGetModuleNameFromExports(options: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined, targetFilePath: gostring, packageDirectory: gostring, packageName: gostring, exports: ExportsOrImports__from_packagejson, conditions: RuntimeSlice<gostring>): gostring {
    if (exports.IsSubpaths()) {
        const __gotots_range_18 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Named_packagejson$ExportsOrImports(exports.AsObject()));
        if (__gotots_range_18 === void 0) {
            GoPanic.raiseRuntime("call of nil function");
        }
        let __gotots_range_state_2 = 1;
        let __gotots_range_return_0: gostring = "";
        __gotots_range_18(($argument0: gostring, $argument1: ExportsOrImports__from_packagejson): bool => {
            if (__gotots_range_state_2 === 0) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            if (__gotots_range_state_2 === -1) {
                GoPanic.raiseRuntime("range function continued iteration after loop body panic");
            }
            if (__gotots_range_state_2 === -2) {
                GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
            }
            if (__gotots_range_state_2 === 2) {
                GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
            }
            __gotots_range_state_2 = -1;
            const __gotots_range_value_24 = $argument0;
            const __gotots_range_value_25 = ExportsOrImports__from_packagejson.$copy($argument1);
            let k = __gotots_range_value_24;
            let subk = __gotots_range_value_25;
            let subPackageName = GetNormalizedAbsolutePath__from_tspath(CombinePaths__from_tspath(packageName, RuntimeSlice.literal<gostring>([k])), "");
            let mode = MatchingModeExact$constant();
            if (strings__from_gostdlib.HasSuffix(k, "/")) {
                mode = MatchingModeDirectory$constant();
            }
            else if (strings__from_gostdlib.Contains(k, "*")) {
                mode = MatchingModePattern$constant();
            }
            let result = tryGetModuleNameFromExportsOrImports(options, host, targetFilePath, packageDirectory, subPackageName, ExportsOrImports__from_packagejson.$copy(subk), conditions, mode, false, false);
            if (result.length > 0) {
                __gotots_range_return_0 = result;
                __gotots_range_state_2 = 2;
                return false;
            }
            __gotots_range_state_2 = 1;
            return true;
        });
        if (__gotots_range_state_2 === -1) {
            GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
        }
        if (__gotots_range_state_2 === 2) {
            return __gotots_range_return_0;
        }
        __gotots_range_state_2 = -2;
    }
    return tryGetModuleNameFromExportsOrImports(options, host, targetFilePath, packageDirectory, packageName, ExportsOrImports__from_packagejson.$copy(exports), conditions, MatchingModeExact$constant(), false, false);
}
export function tryGetModuleNameFromPackageJsonImports(moduleFileName: gostring, sourceDirectory: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined, importMode: ModuleKind__from_core, preferTsExtension: bool): gostring {
    if (!CompilerOptions__from_core.GetResolvePackageJsonImports(options)) {
        return "";
    }
    const __gotots_receiver_54 = host;
    const __gotots_argument_97 = sourceDirectory;
    let ancestorDirectoryWithPackageJson = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_54).GetNearestAncestorDirectoryWithPackageJson(__gotots_argument_97);
    if (ancestorDirectoryWithPackageJson.length === 0) {
        return "";
    }
    let packageJsonPath = CombinePaths__from_tspath(ancestorDirectoryWithPackageJson, RuntimeSlice.literal<gostring>(["package.json"]));
    const __gotots_receiver_55 = host;
    const __gotots_argument_98 = packageJsonPath;
    let info: {
        value: InfoCacheEntry__from_packagejson;
    } | undefined = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_55).GetPackageJsonInfo(__gotots_argument_98);
    if (info === undefined) {
        return "";
    }
    let imports = ExportsOrImports__from_packagejson.$copy((InfoCacheEntry__from_packagejson.GetContents(info) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Fields.PathFields.Imports);
    switch ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
        ExportsOrImports__from_packagejson.$storageOf(imports).JSONValue)).Type) {
        case JSONValueTypeNotPresent$constant__from_packagejson():
        case JSONValueTypeArray$constant__from_packagejson():
        case JSONValueTypeString$constant__from_packagejson(): {
            return "";
            break;
        }
        case JSONValueTypeObject$constant__from_packagejson(): {
            let conditions = GetConditions__from___go_module(options, importMode);
            let top: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined = imports.AsObject();
            let entries: iter.Seq2<gostring, ExportsOrImports__from_packagejson> = OrderedMap$Entries$string$Named_packagejson$ExportsOrImports(top);
            const __gotots_range_13 = named_iter.IterSeq2ValueOperations.$project(entries);
            if (__gotots_range_13 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
            let __gotots_range_return_0: gostring = "";
            __gotots_range_13(($argument0: gostring, $argument1: ExportsOrImports__from_packagejson): bool => {
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
                const __gotots_range_value_17 = $argument0;
                const __gotots_range_value_18 = ExportsOrImports__from_packagejson.$copy($argument1);
                let k = __gotots_range_value_17;
                let value = __gotots_range_value_18;
                if (k === "#" || k === "#/" || !strings__from_gostdlib.HasPrefix(k, "#")) {
                    __gotots_range_state_0 = 1;
                    return true;
                }
                if (strings__from_gostdlib.HasPrefix(k, "#/") && !(CompilerOptions__from_core.GetModuleResolutionKind(options) === ModuleResolutionKindNodeNext$constant__from_core()) && !(CompilerOptions__from_core.GetModuleResolutionKind(options) === ModuleResolutionKindBundler$constant__from_core())) {
                    __gotots_range_state_0 = 1;
                    return true;
                }
                let mode = MatchingModeExact$constant();
                if (strings__from_gostdlib.HasSuffix(k, "/")) {
                    mode = MatchingModeDirectory$constant();
                }
                else if (strings__from_gostdlib.Contains(k, "*")) {
                    mode = MatchingModePattern$constant();
                }
                let result = tryGetModuleNameFromExportsOrImports(options, host, moduleFileName, ancestorDirectoryWithPackageJson, k, ExportsOrImports__from_packagejson.$copy(value), conditions, mode, true, preferTsExtension);
                if (result.length > 0) {
                    __gotots_range_return_0 = result;
                    __gotots_range_state_0 = 2;
                    return false;
                }
                __gotots_range_state_0 = 1;
                return true;
            });
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            if (__gotots_range_state_0 === 2) {
                return __gotots_range_return_0;
            }
            __gotots_range_state_0 = -2;
            break;
        }
    }
    return "";
}
export type specPair$Storage = {
    ending: uint8;
    value: gostring;
};
export class specPair implements GoContainerStoredValue<specPair$Storage> {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: specPair$Storage) {
    }
    public static $storageOf($source: specPair): specPair$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: specPair$Storage): specPair {
        return new specPair($source);
    }
    public get ending(): ModuleSpecifierEnding {
        return this.$storage.ending;
    }
    public set ending($value: ModuleSpecifierEnding) {
        this.$storage.ending = $value;
    }
    public get value(): gostring {
        return this.$storage.value;
    }
    public set value($value: gostring) {
        this.$storage.value = $value;
    }
    declare readonly [$goContainerStorageType]: specPair$Storage;
    static $zero(): specPair {
        return new specPair({
            ending: 0,
            value: ""
        });
    }
    static $copy($source: specPair): specPair {
        return new specPair({
            ending: $source.$storage.ending,
            value: $source.$storage.value
        });
    }
    declare private readonly then?: never;
}
export function tryGetModuleNameFromPaths(relativeToBaseUrl: gostring, paths: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined, allowedEndings: RuntimeSlice<ModuleSpecifierEnding>, baseDirectory: gostring, host: ModuleSpecifierGenerationHost | undefined, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined): gostring {
    const __gotots_receiver_56 = host;
    let caseSensitive = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_56).UseCaseSensitiveFileNames();
    const __gotots_range_14 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$SliceOf_string(paths));
    if (__gotots_range_14 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_1 = 1;
    let __gotots_range_return_0: gostring = "";
    __gotots_range_14(($argument0: gostring, $argument1: RuntimeSlice<gostring>): bool => {
        if (__gotots_range_state_1 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_1 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_1 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_1 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_1 = -1;
        const __gotots_range_value_19 = $argument0;
        const __gotots_range_value_20 = $argument1;
        let key = __gotots_range_value_19;
        let values = __gotots_range_value_20;
        const __gotots_range_15 = values;
        for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_15.length; __gotots_range_index_12++) {
            const __gotots_range_value_21 = __gotots_range_15.get(__gotots_range_index_12);
            let patternText = __gotots_range_value_21;
            let normalized = NormalizePath__from_tspath(patternText);
            let pattern = getRelativePathIfInSameVolume(normalized, baseDirectory, caseSensitive);
            if (pattern.length === 0) {
                pattern = normalized;
            }
            const __gotots_results_4 = strings__from_gostdlib.Cut(pattern, "*");
            let prefix = __gotots_results_4[0];
            let suffix = __gotots_results_4[1];
            let ok = __gotots_results_4[2];
            let candidates = RuntimeSlice.nil<specPair$Storage>();
            const __gotots_range_16 = allowedEndings;
            for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_16.length; __gotots_range_index_13++) {
                const __gotots_range_value_22 = __gotots_range_16.get(__gotots_range_index_13);
                let ending = __gotots_range_value_22;
                let result = processEnding(relativeToBaseUrl, RuntimeSlice.literal<ModuleSpecifierEnding>([ending]), compilerOptions, host);
                const __gotots_slice_build_32 = candidates;
                const __gotots_slice_build_34 = __gotots_slice_build_32.length + 1;
                let __gotots_slice_build_33 = __gotots_slice_build_32;
                if (__gotots_slice_build_34 <= __gotots_slice_build_32.capacity) {
                    __gotots_slice_build_33 = __gotots_slice_build_32.$withLength(__gotots_slice_build_34);
                    __gotots_slice_build_33.set(__gotots_slice_build_32.length + 0, (void specPair.$storageOf, (void specPair.$fromStorage,
                        {
                            ending: ending,
                            value: result
                        })));
                }
                else {
                    __gotots_slice_build_33 = goSliceAllocate<specPair$Storage>(__gotots_slice_build_34, RuntimeSlice.$grownCapacity(__gotots_slice_build_32.capacity, __gotots_slice_build_34));
                    for (let __gotots_slice_build_35 = 0; __gotots_slice_build_35 < __gotots_slice_build_32.length; __gotots_slice_build_35++) {
                        __gotots_slice_build_33.set(__gotots_slice_build_35, specPair.$storageOf(specPair.$copy(specPair.$fromStorage(__gotots_slice_build_32.get(__gotots_slice_build_35)))));
                    }
                    __gotots_slice_build_33.set(__gotots_slice_build_32.length + 0, (void specPair.$storageOf, (void specPair.$fromStorage,
                        {
                            ending: ending,
                            value: result
                        })));
                    for (let __gotots_slice_build_35 = __gotots_slice_build_34; __gotots_slice_build_35 < __gotots_slice_build_33.capacity; __gotots_slice_build_35++) {
                        __gotots_slice_build_33.$initialize(__gotots_slice_build_35, specPair.$storageOf(specPair.$zero()));
                    }
                }
                candidates = __gotots_slice_build_33;
            }
            if (TryGetExtensionFromPath__from_tspath(pattern).length > 0) {
                const __gotots_slice_build_36 = candidates;
                const __gotots_slice_build_38 = __gotots_slice_build_36.length + 1;
                let __gotots_slice_build_37 = __gotots_slice_build_36;
                if (__gotots_slice_build_38 <= __gotots_slice_build_36.capacity) {
                    __gotots_slice_build_37 = __gotots_slice_build_36.$withLength(__gotots_slice_build_38);
                    __gotots_slice_build_37.set(__gotots_slice_build_36.length + 0, (void specPair.$storageOf, (void specPair.$fromStorage,
                        {
                            ending: ModuleSpecifierEndingJsExtension$constant(),
                            value: relativeToBaseUrl
                        })));
                }
                else {
                    __gotots_slice_build_37 = goSliceAllocate<specPair$Storage>(__gotots_slice_build_38, RuntimeSlice.$grownCapacity(__gotots_slice_build_36.capacity, __gotots_slice_build_38));
                    for (let __gotots_slice_build_39 = 0; __gotots_slice_build_39 < __gotots_slice_build_36.length; __gotots_slice_build_39++) {
                        __gotots_slice_build_37.set(__gotots_slice_build_39, specPair.$storageOf(specPair.$copy(specPair.$fromStorage(__gotots_slice_build_36.get(__gotots_slice_build_39)))));
                    }
                    __gotots_slice_build_37.set(__gotots_slice_build_36.length + 0, (void specPair.$storageOf, (void specPair.$fromStorage,
                        {
                            ending: ModuleSpecifierEndingJsExtension$constant(),
                            value: relativeToBaseUrl
                        })));
                    for (let __gotots_slice_build_39 = __gotots_slice_build_38; __gotots_slice_build_39 < __gotots_slice_build_37.capacity; __gotots_slice_build_39++) {
                        __gotots_slice_build_37.$initialize(__gotots_slice_build_39, specPair.$storageOf(specPair.$zero()));
                    }
                }
                candidates = __gotots_slice_build_37;
            }
            if (ok) {
                const __gotots_range_17 = candidates;
                for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_17.length; __gotots_range_index_14++) {
                    const __gotots_range_value_23 = specPair.$copy(specPair.$fromStorage(__gotots_range_17.get(__gotots_range_index_14)));
                    let c = __gotots_range_value_23;
                    let value = specPair.$storageOf(c).value;
                    if (value.length >= prefix.length + suffix.length && HasPrefix__from_stringutil(value, prefix, caseSensitive) && HasSuffix__from_stringutil(value, suffix, caseSensitive) && validateEnding(specPair.$copy(c), relativeToBaseUrl, compilerOptions, host)) {
                        let matchedStar = goStringSlice(value, prefix.length, value.length - suffix.length);
                        if (!PathIsRelative__from_tspath(matchedStar)) {
                            __gotots_range_return_0 = replaceFirstStar(key, matchedStar);
                            __gotots_range_state_1 = 2;
                            return false;
                        }
                    }
                }
            }
            else if (Some$Named_modulespecifiers$specPair(candidates, (c: specPair): bool => {
                return !(specPair.$storageOf(c).ending === ModuleSpecifierEndingMinimal$constant()) && pattern === specPair.$storageOf(c).value;
            }) || Some$Named_modulespecifiers$specPair(candidates, (c: specPair): bool => {
                return specPair.$storageOf(c).ending === ModuleSpecifierEndingMinimal$constant() && pattern === specPair.$storageOf(c).value && validateEnding(specPair.$copy(c), relativeToBaseUrl, compilerOptions, host);
            })) {
                __gotots_range_return_0 = key;
                __gotots_range_state_1 = 2;
                return false;
            }
        }
        __gotots_range_state_1 = 1;
        return true;
    });
    if (__gotots_range_state_1 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    if (__gotots_range_state_1 === 2) {
        return __gotots_range_return_0;
    }
    __gotots_range_state_1 = -2;
    return "";
}
export function validateEnding(c: specPair, relativeToBaseUrl: gostring, compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined): bool {
    return !(specPair.$storageOf(c).ending === ModuleSpecifierEndingMinimal$constant()) || specPair.$storageOf(c).value === processEnding(relativeToBaseUrl, RuntimeSlice.literal<ModuleSpecifierEnding>([specPair.$storageOf(c).ending]), compilerOptions, host);
}
export function tryGetModuleNameFromExportsOrImports(options: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined, targetFilePath: gostring, packageDirectory: gostring, packageName: gostring, exports: ExportsOrImports__from_packagejson, conditions: RuntimeSlice<gostring>, mode: MatchingMode, isImports: bool, preferTsExtension: bool): gostring {
    switch ((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
        ExportsOrImports__from_packagejson.$storageOf(exports).JSONValue)).Type) {
        case JSONValueTypeNotPresent$constant__from_packagejson(): {
            return "";
            break;
        }
        case JSONValueTypeString$constant__from_packagejson(): {
            let strValue = (($value: GoInterface | undefined): gostring => {
                if (!$goInterfaceAdapter$string.$is($value)) {
                    return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                }
                return $value.$go$value;
            })((void JSONValue__from_packagejson.$storageOf, (void JSONValue__from_packagejson.$fromStorage,
                ExportsOrImports__from_packagejson.$storageOf(exports).JSONValue)).Value);
            let outputFile = "";
            let declarationFile = "";
            if (isImports) {
                outputFile = GetOutputJSFileNameWorker__from_outputpaths(targetFilePath, options, host);
                declarationFile = GetOutputDeclarationFileNameWorker__from_outputpaths(targetFilePath, options, host);
            }
            let pathOrPattern = GetNormalizedAbsolutePath__from_tspath(CombinePaths__from_tspath(packageDirectory, RuntimeSlice.literal<gostring>([strValue])), "");
            let extensionSwappedTarget = "";
            if (HasTSFileExtension__from_tspath(targetFilePath)) {
                extensionSwappedTarget = RemoveFileExtension__from_tspath(targetFilePath) + TryGetJSExtensionForFile__from___go_module(targetFilePath, options);
            }
            let canTryTsExtension = preferTsExtension && HasImplementationTSFileExtension__from_tspath(targetFilePath);
            const __gotots_receiver_57 = host;
            const __gotots_field_12 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_57).UseCaseSensitiveFileNames();
            const __gotots_receiver_58 = host;
            const __gotots_field_13 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_58).GetCurrentDirectory();
            let compareOpts = new ComparePathsOptions__from_tspath(__gotots_field_12, __gotots_field_13);
            switch (mode) {
                case MatchingModeExact$constant(): {
                    if (extensionSwappedTarget.length > 0 && ComparePaths__from_tspath(extensionSwappedTarget, pathOrPattern, ComparePathsOptions__from_tspath.$copy(compareOpts)) === 0 || ComparePaths__from_tspath(targetFilePath, pathOrPattern, ComparePathsOptions__from_tspath.$copy(compareOpts)) === 0 || outputFile.length > 0 && ComparePaths__from_tspath(outputFile, pathOrPattern, ComparePathsOptions__from_tspath.$copy(compareOpts)) === 0 || declarationFile.length > 0 && ComparePaths__from_tspath(declarationFile, pathOrPattern, ComparePathsOptions__from_tspath.$copy(compareOpts)) === 0) {
                        return packageName;
                    }
                    break;
                }
                case MatchingModeDirectory$constant(): {
                    if (canTryTsExtension && ContainsPath__from_tspath(targetFilePath, pathOrPattern, ComparePathsOptions__from_tspath.$copy(compareOpts))) {
                        let fragment = GetRelativePathFromDirectory__from_tspath(pathOrPattern, targetFilePath, ComparePathsOptions__from_tspath.$copy(compareOpts));
                        return GetNormalizedAbsolutePath__from_tspath(CombinePaths__from_tspath(CombinePaths__from_tspath(packageName, RuntimeSlice.literal<gostring>([strValue])), RuntimeSlice.literal<gostring>([fragment])), "");
                    }
                    if (extensionSwappedTarget.length > 0 && ContainsPath__from_tspath(pathOrPattern, extensionSwappedTarget, ComparePathsOptions__from_tspath.$copy(compareOpts))) {
                        let fragment = GetRelativePathFromDirectory__from_tspath(pathOrPattern, extensionSwappedTarget, ComparePathsOptions__from_tspath.$copy(compareOpts));
                        return GetNormalizedAbsolutePath__from_tspath(CombinePaths__from_tspath(CombinePaths__from_tspath(packageName, RuntimeSlice.literal<gostring>([strValue])), RuntimeSlice.literal<gostring>([fragment])), "");
                    }
                    if (!canTryTsExtension && ContainsPath__from_tspath(pathOrPattern, targetFilePath, ComparePathsOptions__from_tspath.$copy(compareOpts))) {
                        let fragment = GetRelativePathFromDirectory__from_tspath(pathOrPattern, targetFilePath, ComparePathsOptions__from_tspath.$copy(compareOpts));
                        return GetNormalizedAbsolutePath__from_tspath(CombinePaths__from_tspath(CombinePaths__from_tspath(packageName, RuntimeSlice.literal<gostring>([strValue])), RuntimeSlice.literal<gostring>([fragment])), "");
                    }
                    if (outputFile.length > 0 && ContainsPath__from_tspath(pathOrPattern, outputFile, ComparePathsOptions__from_tspath.$copy(compareOpts))) {
                        let fragment = GetRelativePathFromDirectory__from_tspath(pathOrPattern, outputFile, ComparePathsOptions__from_tspath.$copy(compareOpts));
                        return CombinePaths__from_tspath(packageName, RuntimeSlice.literal<gostring>([fragment]));
                    }
                    if (declarationFile.length > 0 && ContainsPath__from_tspath(pathOrPattern, declarationFile, ComparePathsOptions__from_tspath.$copy(compareOpts))) {
                        let fragment = GetRelativePathFromDirectory__from_tspath(pathOrPattern, declarationFile, ComparePathsOptions__from_tspath.$copy(compareOpts));
                        let jsExtension = getJSExtensionForFile(declarationFile, options);
                        let fragmentWithJsExtension = ChangeExtension__from_tspath(fragment, jsExtension);
                        return CombinePaths__from_tspath(packageName, RuntimeSlice.literal<gostring>([fragmentWithJsExtension]));
                    }
                    break;
                }
                case MatchingModePattern$constant(): {
                    const __gotots_results_6 = strings__from_gostdlib.Cut(pathOrPattern, "*");
                    let leadingSlice = __gotots_results_6[0];
                    let trailingSlice = __gotots_results_6[1];
                    const __gotots_receiver_59 = host;
                    let caseSensitive = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_59).UseCaseSensitiveFileNames();
                    if (canTryTsExtension && HasPrefixAndSuffixWithoutOverlap__from_stringutil(targetFilePath, leadingSlice, trailingSlice, caseSensitive)) {
                        let starReplacement = goStringSlice(targetFilePath, leadingSlice.length, targetFilePath.length - trailingSlice.length);
                        return replaceFirstStar(packageName, starReplacement);
                    }
                    if (extensionSwappedTarget.length > 0 && HasPrefixAndSuffixWithoutOverlap__from_stringutil(extensionSwappedTarget, leadingSlice, trailingSlice, caseSensitive)) {
                        let starReplacement = goStringSlice(extensionSwappedTarget, leadingSlice.length, extensionSwappedTarget.length - trailingSlice.length);
                        return replaceFirstStar(packageName, starReplacement);
                    }
                    if (!canTryTsExtension && HasPrefixAndSuffixWithoutOverlap__from_stringutil(targetFilePath, leadingSlice, trailingSlice, caseSensitive)) {
                        let starReplacement = goStringSlice(targetFilePath, leadingSlice.length, targetFilePath.length - trailingSlice.length);
                        return replaceFirstStar(packageName, starReplacement);
                    }
                    if (outputFile.length > 0 && HasPrefixAndSuffixWithoutOverlap__from_stringutil(outputFile, leadingSlice, trailingSlice, caseSensitive)) {
                        let starReplacement = goStringSlice(outputFile, leadingSlice.length, outputFile.length - trailingSlice.length);
                        return replaceFirstStar(packageName, starReplacement);
                    }
                    if (declarationFile.length > 0 && HasPrefixAndSuffixWithoutOverlap__from_stringutil(declarationFile, leadingSlice, trailingSlice, caseSensitive)) {
                        let starReplacement = goStringSlice(declarationFile, leadingSlice.length, declarationFile.length - trailingSlice.length);
                        let substituted = replaceFirstStar(packageName, starReplacement);
                        let jsExtension = TryGetJSExtensionForFile__from___go_module(declarationFile, options);
                        if (jsExtension.length > 0) {
                            return ChangeFullExtension__from_tspath(substituted, jsExtension);
                        }
                    }
                    break;
                }
            }
            return "";
            break;
        }
        case JSONValueTypeArray$constant__from_packagejson(): {
            let arr = exports.AsArray();
            const __gotots_range_19 = arr;
            for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_19.length; __gotots_range_index_15++) {
                const __gotots_range_value_26 = ExportsOrImports__from_packagejson.$copy(ExportsOrImports__from_packagejson.$fromStorage(__gotots_range_19.get(__gotots_range_index_15)));
                let e = __gotots_range_value_26;
                let result = tryGetModuleNameFromExportsOrImports(options, host, targetFilePath, packageDirectory, packageName, ExportsOrImports__from_packagejson.$copy(e), conditions, mode, isImports, preferTsExtension);
                if (result.length > 0) {
                    return result;
                }
            }
            break;
        }
        case JSONValueTypeObject$constant__from_packagejson(): {
            let obj: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, ExportsOrImports__from_packagejson>> | undefined = exports.AsObject();
            const __gotots_range_20 = named_iter.IterSeq2ValueOperations.$project(OrderedMap$Entries$string$Named_packagejson$ExportsOrImports(obj));
            if (__gotots_range_20 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_3 = 1;
            let __gotots_range_return_0: gostring = "";
            __gotots_range_20(($argument0: gostring, $argument1: ExportsOrImports__from_packagejson): bool => {
                if (__gotots_range_state_3 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_3 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_3 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_3 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_3 = -1;
                const __gotots_range_value_27 = $argument0;
                const __gotots_range_value_28 = ExportsOrImports__from_packagejson.$copy($argument1);
                let key = __gotots_range_value_27;
                let value = __gotots_range_value_28;
                if (key === "default" || Contains$SliceOf_string$string(conditions, key) || Contains$SliceOf_string$string(conditions, "types") && IsApplicableVersionedTypesKey__from___go_module(key)) {
                    let result = tryGetModuleNameFromExportsOrImports(options, host, targetFilePath, packageDirectory, packageName, ExportsOrImports__from_packagejson.$copy(value), conditions, mode, isImports, preferTsExtension);
                    if (result.length > 0) {
                        __gotots_range_return_0 = result;
                        __gotots_range_state_3 = 2;
                        return false;
                    }
                }
                __gotots_range_state_3 = 1;
                return true;
            });
            if (__gotots_range_state_3 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            if (__gotots_range_state_3 === 2) {
                return __gotots_range_return_0;
            }
            __gotots_range_state_3 = -2;
            break;
        }
        case JSONValueTypeNull$constant__from_packagejson(): {
            return "";
            break;
        }
    }
    return "";
}
export function UpdateModuleSpecifier(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined, importingSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, importingSourceFileName: gostring, oldImportSpecifier: gostring, toFileName: gostring, userPreferences: UserPreferences, options: ModuleSpecifierOptions): gostring {
    return getModuleSpecifierWithPreferences(compilerOptions, host, importingSourceFile, importingSourceFileName, oldImportSpecifier, toFileName, UserPreferences.$copy(userPreferences), ModuleSpecifierOptions.$copy(options));
}
export function getModuleSpecifierWithPreferences(compilerOptions: {
    value: CompilerOptions__from_core;
} | undefined, host: ModuleSpecifierGenerationHost | undefined, importingSourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, importingSourceFileName: gostring, oldImportSpecifier: gostring, toFileName: gostring, userPreferences: UserPreferences, options: ModuleSpecifierOptions): gostring {
    let info = getInfo(importingSourceFileName, host);
    let modulePaths = getAllModulePaths(Info.$copy(info), toFileName, host, compilerOptions, UserPreferences.$copy(userPreferences), ModuleSpecifierOptions.$copy(options));
    let preferences = getModuleSpecifierPreferences(UserPreferences.$copy(userPreferences), host, compilerOptions, new GoInterfaceAdapter(importingSourceFile), oldImportSpecifier);
    let resolutionMode = options.OverrideImportMode;
    if (resolutionMode === ResolutionModeNone$constant__from_core()) {
        const __gotots_receiver_60 = host;
        const __gotots_argument_99 = new GoInterfaceAdapter(importingSourceFile);
        resolutionMode = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_60).GetDefaultResolutionModeForFile(__gotots_argument_99);
    }
    const __gotots_range_21 = modulePaths;
    for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_21.length; __gotots_range_index_16++) {
        const __gotots_range_value_29 = ModulePath.$copy(ModulePath.$fromStorage(__gotots_range_21.get(__gotots_range_index_16)));
        let modulePath = __gotots_range_value_29;
        {
            let firstDefined = tryGetModuleNameAsNodeModule(ModulePath.$copy(modulePath), Info.$copy(info), new GoInterfaceAdapter(importingSourceFile), host, compilerOptions, UserPreferences.$copy(userPreferences), false, options.OverrideImportMode);
            if (firstDefined.length > 0) {
                return firstDefined;
            }
        }
    }
    return getLocalModuleSpecifier(toFileName, Info.$copy(info), compilerOptions, host, resolutionMode, ModuleSpecifierPreferences.$copy(preferences), false);
}
