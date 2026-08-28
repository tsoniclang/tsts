import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ResolvedEntrypoint as ResolvedEntrypoint__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import type { FileExtensionInfo$Storage as FileExtensionInfo__from_tsoptions$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { ModuleSpecifierEnding, ModuleSpecifierGenerationHost, SourceFileForSpecifierGeneration } from "./types.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { CompareBooleans as CompareBooleans__from_core, CompilerOptions as CompilerOptions__from_core, IndexAfter as IndexAfter__from_core, ScriptKindExternal$constant as ScriptKindExternal$constant__from_core, ScriptKindJSON$constant as ScriptKindJSON$constant__from_core, TSTrue$constant as TSTrue$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EndingChangeable$constant as EndingChangeable$constant__from___go_module, EndingFixed$constant as EndingFixed$constant__from___go_module, TryGetJSExtensionForFile as TryGetJSExtensionForFile__from___go_module } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/module/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/state.js";
import { FileExtensionInfo as FileExtensionInfo__from_tsoptions, GetSupportedExtensions as GetSupportedExtensions__from_tsoptions } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tsoptions/package.js";
import { ChangeAnyExtension as ChangeAnyExtension__from_tspath, CompareNumberOfDirectorySeparators as CompareNumberOfDirectorySeparators__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ComparePaths as ComparePaths__from_tspath, ExtensionCjs$string as ExtensionCjs$string__from_tspath, ExtensionCts$string as ExtensionCts$string__from_tspath, ExtensionDcts$string as ExtensionDcts$string__from_tspath, ExtensionDmts$string as ExtensionDmts$string__from_tspath, ExtensionDts$string as ExtensionDts$string__from_tspath, ExtensionJs$string as ExtensionJs$string__from_tspath, ExtensionJsx$string as ExtensionJsx$string__from_tspath, ExtensionMjs$string as ExtensionMjs$string__from_tspath, ExtensionMts$string as ExtensionMts$string__from_tspath, ExtensionTs$string as ExtensionTs$string__from_tspath, ExtensionTsx$string as ExtensionTsx$string__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, GetBaseFileName as GetBaseFileName__from_tspath, GetDeclarationFileExtension as GetDeclarationFileExtension__from_tspath, GetNormalizedAbsolutePath as GetNormalizedAbsolutePath__from_tspath, GetRelativePathToDirectoryOrUrl as GetRelativePathToDirectoryOrUrl__from_tspath, IsRootedDiskPath as IsRootedDiskPath__from_tspath, PathIsAbsolute as PathIsAbsolute__from_tspath, PathIsRelative as PathIsRelative__from_tspath, RemoveExtension as RemoveExtension__from_tspath, RemoveFileExtension as RemoveFileExtension__from_tspath, TryGetExtensionFromPath as TryGetExtensionFromPath__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Index$SliceOf_Named_modulespecifiers$ModuleSpecifierEnding$Named_modulespecifiers$ModuleSpecifierEnding } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { GetAllowedEndingsInPreferredOrder } from "./preferences.js";
import { ModulePath, ModuleSpecifierEndingIndex$constant, ModuleSpecifierEndingJsExtension$constant, ModuleSpecifierEndingMinimal$constant, ModuleSpecifierEndingTsExtension$constant, UserPreferences } from "./types.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as provider_regexp from "@gotots/gostdlib/internal/facets/provider-regexp.js";
import * as recovery_sync from "@gotots/gostdlib/internal/facets/recovery-sync.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class regexPatternCacheKey {
    declare private readonly $goType: void;
    public constructor(public pattern: gostring, public caseInsensitive: bool) {
    }
    static $copy($source: regexPatternCacheKey): regexPatternCacheKey {
        return new regexPatternCacheKey($source.pattern, $source.caseInsensitive);
    }
    static $equal($left: regexPatternCacheKey, $right: regexPatternCacheKey): bool {
        return $left.pattern === $right.pattern && $left.caseInsensitive === $right.caseInsensitive;
    }
    static $hash($source: regexPatternCacheKey): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.pattern));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.caseInsensitive));
        return $hash;
    }
    declare private readonly then?: never;
}
export function comparePathsByRedirect(a: ModulePath, b: ModulePath, useCaseSensitiveFileNames: bool): int {
    {
        let c = CompareBooleans__from_core(ModulePath.$storageOf(b).IsRedirect, ModulePath.$storageOf(a).IsRedirect);
        if (c !== 0) {
            return c;
        }
    }
    {
        let c = CompareNumberOfDirectorySeparators__from_tspath(ModulePath.$storageOf(a).FileName, ModulePath.$storageOf(b).FileName);
        if (c !== 0) {
            return c;
        }
    }
    return ComparePaths__from_tspath(ModulePath.$storageOf(a).FileName, ModulePath.$storageOf(b).FileName, new ComparePathsOptions__from_tspath(useCaseSensitiveFileNames, ""));
}
export function PathIsBareSpecifier(path: gostring): bool {
    return !PathIsAbsolute__from_tspath(path) && !PathIsRelative__from_tspath(path);
}
export function IsExcludedByRegex(moduleSpecifier: gostring, excludes: RuntimeSlice<gostring>): bool {
    const __gotots_range_0 = excludes;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let pattern = __gotots_range_value_0;
        let re: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined = stringToRegex(pattern);
        if (re === undefined) {
            continue;
        }
        const __gotots_receiver_0 = re;
        if (regexp__from_gostdlib.Regexp.MatchString(__gotots_receiver_0 === void 0 ? void 0 :
            (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, moduleSpecifier)) {
            return true;
        }
    }
    return false;
}
export function stringToRegex(pattern: gostring): tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined = void 0;
    try {
        try {
            __gotots_return_block_0: {
                let caseInsensitive = false;
                if (pattern.length > 2 && goStringIndex(pattern, 0) === 47) {
                    let lastSlash = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(pattern, "/")));
                    if (lastSlash > 0) {
                        let hasUnescapedMiddleSlash = false;
                        for (let i = 1; i < lastSlash; i++) {
                            if (goStringIndex(pattern, i) === 47 && (i === 0 || goStringIndex(pattern, i - 1) !== 92)) {
                                hasUnescapedMiddleSlash = true;
                                break;
                            }
                        }
                        if (!hasUnescapedMiddleSlash) {
                            let flags = goStringSlice(pattern, lastSlash + 1);
                            pattern = goStringSlice(pattern, 1, lastSlash);
                            const __gotots_range_1 = flags;
                            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length;) {
                                const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_1, __gotots_range_index_1);
                                const __gotots_range_value_1 = __gotots_range_decode_0[0];
                                let flag = __gotots_range_value_1;
                                __gotots_range_index_1 += __gotots_range_decode_0[1];
                                switch (flag) {
                                    case 105: {
                                        caseInsensitive = true;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                let key = new regexPatternCacheKey(pattern, caseInsensitive);
                sync__from_gostdlib.RWMutex.RLock($state.regexPatternCacheMu);
                const __gotots_results_0 = $state.regexPatternCache.lookupOk(key);
                let re: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined = __gotots_results_0[0];
                let ok = __gotots_results_0[1];
                sync__from_gostdlib.RWMutex.RUnlock($state.regexPatternCacheMu);
                if (ok) {
                    __gotots_return_0 = re;
                    break __gotots_return_block_0;
                }
                sync__from_gostdlib.RWMutex.Lock($state.regexPatternCacheMu);
                const __gotots_receiver_1 = $state.regexPatternCacheMu;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    recovery_sync.SyncRWMutexUnlock(__gotots_receiver_1, $go$recovery);
                };
                const __gotots_results_1 = $state.regexPatternCache.lookupOk(key);
                re = __gotots_results_1[0];
                ok = __gotots_results_1[1];
                if (ok) {
                    __gotots_return_0 = re;
                    break __gotots_return_block_0;
                }
                if ($state.regexPatternCache.length() > 1000) {
                    $state.regexPatternCache.clear();
                }
                pattern = strings__from_gostdlib.Clone(pattern);
                key.pattern = pattern;
                let compilePattern = pattern;
                if (caseInsensitive) {
                    compilePattern = "(?i:" + pattern + ")";
                }
                const __gotots_results_2 = regexp__from_gostdlib.Compile(compilePattern);
                const __gotots_conversion_0 = __gotots_results_2[0];
                const __gotots_results_3 = [__gotots_conversion_0 === undefined ? undefined :
                        tsonicTypeScriptRuntime.boundLocation<regexp__from_gostdlib.Regexp>(__gotots_conversion_0, (): regexp__from_gostdlib.Regexp => {
                            return __gotots_conversion_0;
                        }, ($go$providerPointerValue: regexp__from_gostdlib.Regexp): void => {
                            provider_regexp.RegexpValueOperations.$assign(__gotots_conversion_0, $go$providerPointerValue);
                        }), GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                    tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined,
                    GoInterface | undefined
                ];
                let compiled: tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp> | undefined = __gotots_results_3[0];
                let err: GoInterface | undefined = __gotots_results_3[1];
                if (!(err === undefined)) {
                    $state.regexPatternCache.store(key, void 0);
                    __gotots_return_0 = void 0;
                    break __gotots_return_block_0;
                }
                $state.regexPatternCache.store(key, compiled);
                __gotots_return_0 = compiled;
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
export function ensurePathIsNonModuleName(path: gostring): gostring {
    if (PathIsBareSpecifier(path)) {
        return "./" + path;
    }
    return path;
}
export function GetJSExtensionForDeclarationFileExtension(ext: gostring): gostring {
    switch (ext) {
        case ExtensionDts$string__from_tspath: {
            return ExtensionJs$string__from_tspath;
            break;
        }
        case ExtensionDmts$string__from_tspath: {
            return ExtensionMjs$string__from_tspath;
            break;
        }
        case ExtensionDcts$string__from_tspath: {
            return ExtensionCjs$string__from_tspath;
            break;
        }
        default: {
            return goStringSlice(ext, 2, ext.length - 3);
            break;
        }
    }
}
export function TryGetRealFileNameForNonJSDeclarationFileName(fileName: gostring): gostring {
    let baseName = GetBaseFileName__from_tspath(fileName);
    if (!strings__from_gostdlib.HasSuffix(fileName, ExtensionTs$string__from_tspath) || !strings__from_gostdlib.Contains(baseName, ".d.") || strings__from_gostdlib.HasSuffix(baseName, ExtensionDts$string__from_tspath)) {
        return "";
    }
    let noExtension = RemoveExtension__from_tspath(fileName, ExtensionTs$string__from_tspath);
    let lastDotIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(noExtension, ".")));
    let ext = goStringSlice(noExtension, lastDotIndex);
    const __gotots_results_5 = strings__from_gostdlib.Cut(noExtension, ".d.");
    let before = __gotots_results_5[0];
    return before + ext;
}
export function getJSExtensionForFile(fileName: gostring, options: {
    value: CompilerOptions__from_core;
} | undefined): gostring {
    let result = TryGetJSExtensionForFile__from___go_module(fileName, options);
    if (result.length === 0) {
        const __gotots_argument_0 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Extension %s is unsupported:: FileName:: %s", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(extensionFromPath(fileName)), new GoInterfaceAdapter(fileName)])));
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    return result;
}
export function extensionFromPath(path: gostring): gostring {
    let ext = TryGetExtensionFromPath__from_tspath(path);
    if (ext.length === 0) {
        const __gotots_argument_6 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("File %s has unknown extension.", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new GoInterfaceAdapter(path)])));
        GoPanic.raise(__gotots_argument_6 === undefined ? GoPanicNilValue.create() : __gotots_argument_6);
    }
    return ext;
}
export function tryGetAnyFileFromPath(host: ModuleSpecifierGenerationHost | undefined, path: gostring): bool {
    const __gotots_field_0 = TSTrue$constant__from_core();
    const __gotots_struct_0 = CompilerOptions__from_core.$zero();
    __gotots_struct_0.AllowJs = __gotots_field_0;
    const __gotots_argument_1 = { value: __gotots_struct_0 };
    const __gotots_argument_2 = RuntimeSlice.literal<FileExtensionInfo__from_tsoptions$Storage>([
        (void FileExtensionInfo__from_tsoptions.$storageOf, (void FileExtensionInfo__from_tsoptions.$fromStorage,
            {
                Extension: "node",
                IsMixedContent: false,
                ScriptKind: ScriptKindExternal$constant__from_core()
            })), (void FileExtensionInfo__from_tsoptions.$storageOf, (void FileExtensionInfo__from_tsoptions.$fromStorage,
            {
                Extension: "json",
                IsMixedContent: false,
                ScriptKind: ScriptKindJSON$constant__from_core()
            })),
    ]);
    let extGroups = GetSupportedExtensions__from_tsoptions(__gotots_argument_1, __gotots_argument_2);
    const __gotots_range_2 = extGroups;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let exts = __gotots_range_value_2;
        const __gotots_range_3 = exts;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
            let e = __gotots_range_value_3;
            let fullPath = path + e;
            const __gotots_receiver_2 = host;
            const __gotots_argument_3 = fullPath;
            const __gotots_receiver_1 = host;
            const __gotots_argument_4 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_1).GetCurrentDirectory();
            const __gotots_argument_5 = GetNormalizedAbsolutePath__from_tspath(__gotots_argument_3, __gotots_argument_4);
            if (goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_2).FileExists(__gotots_argument_5)) {
                return true;
            }
        }
    }
    return false;
}
export function getPathsRelativeToRootDirs(path: gostring, rootDirs: RuntimeSlice<gostring>, useCaseSensitiveFileNames: bool): RuntimeSlice<gostring> {
    let results = RuntimeSlice.nil<gostring>();
    const __gotots_range_4 = rootDirs;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let rootDir = __gotots_range_value_4;
        let relativePath = getRelativePathIfInSameVolume(path, rootDir, useCaseSensitiveFileNames);
        if (!isPathRelativeToParent(relativePath)) {
            results = results.append("", [relativePath]);
        }
    }
    return results;
}
export function isPathRelativeToParent(path: gostring): bool {
    return strings__from_gostdlib.HasPrefix(path, "..");
}
export function getRelativePathIfInSameVolume(path: gostring, directoryPath: gostring, useCaseSensitiveFileNames: bool): gostring {
    let relativePath = GetRelativePathToDirectoryOrUrl__from_tspath(directoryPath, path, false, new ComparePathsOptions__from_tspath(useCaseSensitiveFileNames, directoryPath));
    if (IsRootedDiskPath__from_tspath(relativePath)) {
        return "";
    }
    return relativePath;
}
export function packageJsonPathsAreEqual(a: gostring, b: gostring, options: ComparePathsOptions__from_tspath): bool {
    if (a === b) {
        return true;
    }
    if (a.length === 0 || b.length === 0) {
        return false;
    }
    return ComparePaths__from_tspath(a, b, ComparePathsOptions__from_tspath.$copy(options)) === 0;
}
export function prefersTsExtension(allowedEndings: RuntimeSlice<ModuleSpecifierEnding>): bool {
    let jsPriority = Index$SliceOf_Named_modulespecifiers$ModuleSpecifierEnding$Named_modulespecifiers$ModuleSpecifierEnding(allowedEndings, ModuleSpecifierEndingJsExtension$constant());
    let tsPriority = Index$SliceOf_Named_modulespecifiers$ModuleSpecifierEnding$Named_modulespecifiers$ModuleSpecifierEnding(allowedEndings, ModuleSpecifierEndingTsExtension$constant());
    if (tsPriority > -1) {
        return tsPriority < jsPriority;
    }
    return false;
}
export function replaceFirstStar(s: gostring, replacement: gostring): gostring {
    return strings__from_gostdlib.Replace(s, "*", replacement, BigInt.asIntN(64, goNumberToBigInt(1)));
}
export class NodeModulePathParts {
    declare private readonly $goType: void;
    public constructor(public TopLevelNodeModulesIndex: int, public TopLevelPackageNameIndex: int, public PackageRootIndex: int, public FileNameIndex: int) {
    }
    static $copy($source: NodeModulePathParts): NodeModulePathParts {
        return new NodeModulePathParts($source.TopLevelNodeModulesIndex, $source.TopLevelPackageNameIndex, $source.PackageRootIndex, $source.FileNameIndex);
    }
    declare private readonly then?: never;
}
export type nodeModulesPathParseState = uint8;
export function nodeModulesPathParseStateBeforeNodeModules$constant(): nodeModulesPathParseState {
    return 0;
}
export function nodeModulesPathParseStateNodeModules$constant(): nodeModulesPathParseState {
    return 1;
}
export function nodeModulesPathParseStateScope$constant(): nodeModulesPathParseState {
    return 2;
}
export function nodeModulesPathParseStatePackageContent$constant(): nodeModulesPathParseState {
    return 3;
}
export function GetNodeModulePathParts(fullPath: gostring): NodeModulePathParts | undefined {
    let topLevelNodeModulesIndex = 0;
    let topLevelPackageNameIndex = 0;
    let packageRootIndex = 0;
    let fileNameIndex = 0;
    let partStart = 0;
    let partEnd = 0;
    let state = nodeModulesPathParseStateBeforeNodeModules$constant();
    for (; partEnd >= 0;) {
        partStart = partEnd;
        partEnd = IndexAfter__from_core(fullPath, "/", partStart + 1);
        switch (state) {
            case nodeModulesPathParseStateBeforeNodeModules$constant(): {
                if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(fullPath, partStart), "/node_modules/"))) === 0) {
                    topLevelNodeModulesIndex = partStart;
                    topLevelPackageNameIndex = partEnd;
                    state = nodeModulesPathParseStateNodeModules$constant();
                }
                break;
            }
            case nodeModulesPathParseStateNodeModules$constant():
            case nodeModulesPathParseStateScope$constant(): {
                if (state === nodeModulesPathParseStateNodeModules$constant() && goStringIndex(fullPath, partStart + 1) === 64) {
                    state = nodeModulesPathParseStateScope$constant();
                }
                else {
                    packageRootIndex = partEnd;
                    state = nodeModulesPathParseStatePackageContent$constant();
                }
                break;
            }
            case nodeModulesPathParseStatePackageContent$constant(): {
                if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(fullPath, partStart), "/node_modules/"))) === 0) {
                    state = nodeModulesPathParseStateNodeModules$constant();
                }
                else {
                    state = nodeModulesPathParseStatePackageContent$constant();
                }
                break;
            }
        }
    }
    fileNameIndex = partStart;
    if (state > nodeModulesPathParseStateNodeModules$constant()) {
        return new NodeModulePathParts(topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex);
    }
    return void 0;
}
export function GetPackageNameFromDirectory(fileOrDirectoryPath: gostring): gostring {
    let idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(fileOrDirectoryPath, "/node_modules/")));
    if (idx === -1) {
        return "";
    }
    let basename = goStringSlice(fileOrDirectoryPath, idx + 14);
    if (goStringIndex(basename, 0) === 46) {
        return "";
    }
    let nextSlash = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(basename, "/")));
    if (nextSlash === -1) {
        return basename;
    }
    if (goStringIndex(basename, 0) !== 64 || nextSlash === basename.length - 1) {
        return goStringSlice(basename, 0, nextSlash);
    }
    let secondSlash = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(basename, nextSlash + 1), "/")));
    if (secondSlash === -1) {
        return basename;
    }
    return goStringSlice(basename, 0, nextSlash + 1 + secondSlash);
}
export function ProcessEntrypointEnding(entrypoint: ResolvedEntrypoint__from___go_module | undefined, prefs: UserPreferences, host: ModuleSpecifierGenerationHost | undefined, options: {
    value: CompilerOptions__from_core;
} | undefined, importingSourceFile: SourceFileForSpecifierGeneration | undefined, allowedEndings: RuntimeSlice<ModuleSpecifierEnding>): gostring {
    let specifier = (entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ModuleSpecifier;
    if ((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Ending.$value === EndingFixed$constant__from___go_module().$value) {
        return specifier;
    }
    if (allowedEndings.length === 0) {
        const __gotots_argument_8 = UserPreferences.$copy(prefs);
        const __gotots_argument_9 = host;
        const __gotots_argument_10 = options;
        const __gotots_argument_11 = importingSourceFile;
        const __gotots_argument_12 = "";
        const __gotots_receiver_3 = host;
        const __gotots_argument_7 = importingSourceFile;
        const __gotots_argument_13 = goInterfaceNonNil<ModuleSpecifierGenerationHost>(__gotots_receiver_3).GetDefaultResolutionModeForFile(__gotots_argument_7);
        allowedEndings = GetAllowedEndingsInPreferredOrder(__gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13);
    }
    let preferredEnding = allowedEndings.get(0);
    let dtsExtension = GetDeclarationFileExtension__from_tspath(specifier);
    if (dtsExtension !== "") {
        switch (preferredEnding) {
            case ModuleSpecifierEndingTsExtension$constant():
            case ModuleSpecifierEndingJsExtension$constant(): {
                let jsExtension = GetJSExtensionForDeclarationFileExtension(dtsExtension);
                return ChangeAnyExtension__from_tspath(specifier, jsExtension, RuntimeSlice.literal<gostring>([dtsExtension]), false);
                break;
            }
            case ModuleSpecifierEndingMinimal$constant():
            case ModuleSpecifierEndingIndex$constant(): {
                if ((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Ending.$value === EndingChangeable$constant__from___go_module().$value) {
                    if (dtsExtension === ExtensionDts$string__from_tspath) {
                        specifier = RemoveExtension__from_tspath(specifier, dtsExtension);
                        if (preferredEnding === ModuleSpecifierEndingMinimal$constant()) {
                            specifier = strings__from_gostdlib.TrimSuffix(specifier, "/index");
                        }
                        return specifier;
                    }
                    let jsExtension__shadow_1 = GetJSExtensionForDeclarationFileExtension(dtsExtension);
                    return ChangeAnyExtension__from_tspath(specifier, jsExtension__shadow_1, RuntimeSlice.literal<gostring>([dtsExtension]), false);
                }
                let jsExtension = GetJSExtensionForDeclarationFileExtension(dtsExtension);
                return ChangeAnyExtension__from_tspath(specifier, jsExtension, RuntimeSlice.literal<gostring>([dtsExtension]), false);
                break;
            }
        }
        return specifier;
    }
    if (FileExtensionIsOneOf__from_tspath(specifier, RuntimeSlice.literal<gostring>([ExtensionTs$string__from_tspath, ExtensionTsx$string__from_tspath, ExtensionMts$string__from_tspath, ExtensionCts$string__from_tspath]))) {
        switch (preferredEnding) {
            case ModuleSpecifierEndingTsExtension$constant(): {
                return specifier;
                break;
            }
            case ModuleSpecifierEndingJsExtension$constant(): {
                {
                    let jsExtension = TryGetJSExtensionForFile__from___go_module(specifier, options);
                    if (jsExtension !== "") {
                        return RemoveFileExtension__from_tspath(specifier) + jsExtension;
                    }
                }
                return specifier;
                break;
            }
            case ModuleSpecifierEndingMinimal$constant():
            case ModuleSpecifierEndingIndex$constant(): {
                if ((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Ending.$value === EndingChangeable$constant__from___go_module().$value) {
                    specifier = RemoveFileExtension__from_tspath(specifier);
                    if (preferredEnding === ModuleSpecifierEndingMinimal$constant()) {
                        specifier = strings__from_gostdlib.TrimSuffix(specifier, "/index");
                    }
                    return specifier;
                }
                {
                    let jsExtension = TryGetJSExtensionForFile__from___go_module(specifier, options);
                    if (jsExtension !== "") {
                        return RemoveFileExtension__from_tspath(specifier) + jsExtension;
                    }
                }
                return specifier;
                break;
            }
        }
        return specifier;
    }
    if (FileExtensionIsOneOf__from_tspath(specifier, RuntimeSlice.literal<gostring>([ExtensionJs$string__from_tspath, ExtensionJsx$string__from_tspath, ExtensionMjs$string__from_tspath, ExtensionCjs$string__from_tspath]))) {
        switch (preferredEnding) {
            case ModuleSpecifierEndingTsExtension$constant():
            case ModuleSpecifierEndingJsExtension$constant(): {
                return specifier;
                break;
            }
            case ModuleSpecifierEndingMinimal$constant():
            case ModuleSpecifierEndingIndex$constant(): {
                if ((entrypoint ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Ending.$value === EndingChangeable$constant__from___go_module().$value) {
                    specifier = RemoveFileExtension__from_tspath(specifier);
                    if (preferredEnding === ModuleSpecifierEndingMinimal$constant()) {
                        specifier = strings__from_gostdlib.TrimSuffix(specifier, "/index");
                    }
                    return specifier;
                }
                return specifier;
                break;
            }
        }
        return specifier;
    }
    return specifier;
}
