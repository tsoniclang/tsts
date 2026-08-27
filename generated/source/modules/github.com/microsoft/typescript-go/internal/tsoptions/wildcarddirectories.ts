import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, DirectorySeparator$uint8 as DirectorySeparator$uint8__from_tspath, NormalizeSlashes as NormalizeSlashes__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { IsImplicitGlob as IsImplicitGlob__from_vfsmatch, NewSpecMatcher as NewSpecMatcher__from_vfsmatch, SpecMatcher as SpecMatcher__from_vfsmatch, UsageExclude$constant as UsageExclude$constant__from_vfsmatch } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function getWildcardDirectories(include: RuntimeSlice<gostring>, exclude: RuntimeSlice<gostring>, comparePathsOptions: ComparePathsOptions__from_tspath): GoMapValue<gostring, bool> {
    if (include.length === 0) {
        return GoMap.nil<gostring, bool>(false);
    }
    let excludeMatcher: SpecMatcher__from_vfsmatch | undefined = NewSpecMatcher__from_vfsmatch(exclude, comparePathsOptions.CurrentDirectory, UsageExclude$constant__from_vfsmatch(), comparePathsOptions.UseCaseSensitiveFileNames);
    let wildcardDirectories: GoMapValue<gostring, bool> = GoMap.make<gostring, bool>(false, 0, []);
    let wildCardKeyToPath: GoMapValue<gostring, gostring> = GoMap.make<gostring, gostring>("", 0, []);
    let recursiveKeys = RuntimeSlice.nil<gostring>();
    const __gotots_range_0 = include;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let file = __gotots_range_value_0;
        let spec = NormalizeSlashes__from_tspath(CombinePaths__from_tspath(comparePathsOptions.CurrentDirectory, RuntimeSlice.literal<gostring>([file])));
        if (!(excludeMatcher === undefined) && SpecMatcher__from_vfsmatch.MatchString(excludeMatcher, spec)) {
            continue;
        }
        let match: wildcardDirectoryMatch | undefined = getWildcardDirectoryFromSpec(spec, comparePathsOptions.UseCaseSensitiveFileNames);
        if (!(match === undefined)) {
            let key = (match ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Key;
            let path = (match ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Path;
            let recursive = (match ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Recursive;
            const __gotots_results_0 = wildCardKeyToPath.lookupOk(key);
            let existingPath = __gotots_results_0[0];
            let existsPath = __gotots_results_0[1];
            let existingRecursive = false;
            if (existsPath) {
                existingRecursive = wildcardDirectories.lookup(existingPath);
            }
            if (!existsPath || (!existingRecursive && recursive)) {
                let pathToUse = path;
                if (existsPath) {
                    pathToUse = existingPath;
                }
                wildcardDirectories.store(pathToUse, recursive);
                if (!existsPath) {
                    wildCardKeyToPath.store(key, path);
                }
                if (recursive) {
                    recursiveKeys = recursiveKeys.append("", [key]);
                }
            }
        }
        const __gotots_range_1 = wildcardDirectories;
        const __gotots_range_keys_0 = __gotots_range_1.keys();
        for (const __gotots_range_value_1 of __gotots_range_keys_0) {
            const __gotots_range_value_2 = __gotots_range_1.lookupOk(__gotots_range_value_1);
            if (!__gotots_range_value_2[1]) {
                continue;
            }
            const __gotots_range_value_3 = __gotots_range_value_1;
            let path = __gotots_range_value_3;
            const __gotots_range_2 = recursiveKeys;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_2.length; __gotots_range_index_1++) {
                const __gotots_range_value_4 = __gotots_range_2.get(__gotots_range_index_1);
                let recursiveKey = __gotots_range_value_4;
                let key = toCanonicalKey(path, comparePathsOptions.UseCaseSensitiveFileNames);
                if (key !== recursiveKey && ContainsPath__from_tspath(recursiveKey, key, ComparePathsOptions__from_tspath.$copy(comparePathsOptions))) {
                    wildcardDirectories.delete(path);
                }
            }
        }
    }
    return wildcardDirectories;
}
export function toCanonicalKey(path: gostring, useCaseSensitiveFileNames: bool): gostring {
    if (useCaseSensitiveFileNames) {
        return path;
    }
    return strings__from_gostdlib.ToLower(path);
}
export class wildcardDirectoryMatch {
    declare private readonly $goType: void;
    public constructor(public Key: gostring, public Path: gostring, public Recursive: bool) {
    }
    declare private readonly then?: never;
}
export function getWildcardDirectoryFromSpec(spec: gostring, useCaseSensitiveFileNames: bool): wildcardDirectoryMatch | undefined {
    let firstWildcard = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexAny(spec, "*?")));
    if (firstWildcard !== -1) {
        let lastSepBeforeWildcard = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(goStringSlice(spec, 0, firstWildcard), DirectorySeparator$uint8__from_tspath)));
        if (lastSepBeforeWildcard !== -1) {
            let path = goStringSlice(spec, 0, lastSepBeforeWildcard);
            let lastDirectorySeparatorIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(spec, DirectorySeparator$uint8__from_tspath)));
            let recursive = firstWildcard < lastDirectorySeparatorIndex;
            return new wildcardDirectoryMatch(toCanonicalKey(path, useCaseSensitiveFileNames), path, recursive);
        }
    }
    {
        let lastSepIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(spec, DirectorySeparator$uint8__from_tspath)));
        if (lastSepIndex !== -1) {
            let lastSegment = goStringSlice(spec, lastSepIndex + 1);
            if (IsImplicitGlob__from_vfsmatch(lastSegment)) {
                let path = RemoveTrailingDirectorySeparator__from_tspath(spec);
                return new wildcardDirectoryMatch(toCanonicalKey(path, useCaseSensitiveFileNames), path, true);
            }
        }
    }
    return void 0;
}
