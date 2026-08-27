import type { CompilerOptions as CompilerOptions__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { EnsureTrailingDirectorySeparator as EnsureTrailingDirectorySeparator__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedPathComponents as GetNormalizedPathComponents__from_tspath, GetPathFromPathComponents as GetPathFromPathComponents__from_tspath } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function computeCommonSourceDirectoryOfFilenames(fileNames: RuntimeSlice<gostring>, currentDirectory: gostring, useCaseSensitiveFileNames: bool): gostring {
    let commonPathComponents = RuntimeSlice.nil<gostring>();
    const __gotots_range_0 = fileNames;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let sourceFile = __gotots_range_value_0;
        let sourcePathComponents = GetNormalizedPathComponents__from_tspath(sourceFile, currentDirectory);
        sourcePathComponents = sourcePathComponents.slice(0, sourcePathComponents.length - 1, null);
        if (commonPathComponents.isNil()) {
            commonPathComponents = sourcePathComponents;
            continue;
        }
        let n = globalThis.Math.min(commonPathComponents.length, sourcePathComponents.length);
        const __gotots_range_1 = n;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            let i = __gotots_range_value_1;
            if (GetCanonicalFileName__from_tspath(commonPathComponents.get(i), useCaseSensitiveFileNames) !== GetCanonicalFileName__from_tspath(sourcePathComponents.get(i), useCaseSensitiveFileNames)) {
                if (i === 0) {
                    return "";
                }
                commonPathComponents = commonPathComponents.slice(0, i, null);
                break;
            }
        }
        if (sourcePathComponents.length < commonPathComponents.length) {
            commonPathComponents = commonPathComponents.slice(0, sourcePathComponents.length, null);
        }
    }
    if (commonPathComponents.length === 0) {
        return currentDirectory;
    }
    return GetPathFromPathComponents__from_tspath(commonPathComponents);
}
export function GetComputedCommonSourceDirectory(emittedFiles: RuntimeSlice<gostring>, currentDirectory: gostring, useCaseSensitiveFileNames: bool): gostring {
    let commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(emittedFiles, currentDirectory, useCaseSensitiveFileNames);
    if (commonSourceDirectory.length > 0) {
        commonSourceDirectory = EnsureTrailingDirectorySeparator__from_tspath(commonSourceDirectory);
    }
    return commonSourceDirectory;
}
export function GetCommonSourceDirectory(options: {
    value: CompilerOptions__from_core;
} | undefined, files: (() => RuntimeSlice<gostring>) | undefined, currentDirectory: gostring, useCaseSensitiveFileNames: bool, checkSourceFilesBelongToPath: (($0: RuntimeSlice<gostring>, $1: gostring) => bool) | undefined): gostring {
    let commonSourceDirectory = "";
    if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir !== "") {
        commonSourceDirectory = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir;
        if (!(checkSourceFilesBelongToPath === undefined)) {
            const __gotots_callee_1 = checkSourceFilesBelongToPath;
            const __gotots_callee_0 = files;
            const __gotots_argument_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_argument_1 = (options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.RootDir;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
        }
    }
    else if ((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath !== "") {
        commonSourceDirectory = GetDirectoryPath__from_tspath((options ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ConfigFilePath);
        if (!(checkSourceFilesBelongToPath === undefined)) {
            const __gotots_callee_3 = checkSourceFilesBelongToPath;
            const __gotots_callee_2 = files;
            const __gotots_argument_2 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
            const __gotots_argument_3 = commonSourceDirectory;
            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
        }
    }
    else {
        const __gotots_callee_4 = files;
        const __gotots_argument_4 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_argument_5 = currentDirectory;
        const __gotots_argument_6 = useCaseSensitiveFileNames;
        commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
    }
    if (commonSourceDirectory.length > 0) {
        commonSourceDirectory = EnsureTrailingDirectorySeparator__from_tspath(commonSourceDirectory);
    }
    return commonSourceDirectory;
}
