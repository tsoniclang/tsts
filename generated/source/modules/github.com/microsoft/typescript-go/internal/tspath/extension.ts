import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/state.js";
import { Contains$SliceOf_string$string } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { FileExtensionIs, GetAnyExtensionFromPath, GetBaseFileName } from "./path.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export const ExtensionTs$string: gostring = ".ts";
export const ExtensionTsx$string: gostring = ".tsx";
export const ExtensionDts$string: gostring = ".d.ts";
export const ExtensionJs$string: gostring = ".js";
export const ExtensionJsx$string: gostring = ".jsx";
export const ExtensionJson$string: gostring = ".json";
export const ExtensionTsBuildInfo$string: gostring = ".tsbuildinfo";
export const ExtensionMjs$string: gostring = ".mjs";
export const ExtensionMts$string: gostring = ".mts";
export const ExtensionDmts$string: gostring = ".d.mts";
export const ExtensionCjs$string: gostring = ".cjs";
export const ExtensionCts$string: gostring = ".cts";
export const ExtensionDcts$string: gostring = ".d.cts";
export function ExtensionIsTs(ext: gostring): bool {
    return ext === ExtensionTs$string || ext === ExtensionTsx$string || ext === ExtensionDts$string || ext === ExtensionMts$string || ext === ExtensionDmts$string || ext === ExtensionCts$string || ext === ExtensionDcts$string || ext.length >= 7 && goStringSlice(ext, 0, 3) === ".d." && goStringSlice(ext, ext.length - 3) === ".ts";
}
export function RemoveFileExtension(path: gostring): gostring {
    const __gotots_range_1 = $state.extensionsToRemove;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let ext = __gotots_range_value_1;
        if (strings__from_gostdlib.HasSuffix(path, ext)) {
            return goStringSlice(path, 0, path.length - ext.length);
        }
    }
    return path;
}
export function TryGetExtensionFromPath(p: gostring): gostring {
    const __gotots_range_3 = $state.extensionsToRemove;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let ext = __gotots_range_value_3;
        if (FileExtensionIs(p, ext)) {
            return ext;
        }
    }
    return "";
}
export function RemoveExtension(path: gostring, extension: gostring): gostring {
    return goStringSlice(path, 0, path.length - extension.length);
}
export function FileExtensionIsOneOf(path: gostring, extensions: RuntimeSlice<gostring>): bool {
    const __gotots_range_2 = extensions;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let ext = __gotots_range_value_2;
        if (FileExtensionIs(path, ext)) {
            return true;
        }
    }
    return false;
}
export function TryExtractTSExtension(fileName: gostring): gostring {
    const __gotots_range_4 = $state.supportedTSExtensionsForExtractExtension;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let ext = __gotots_range_value_4;
        if (FileExtensionIs(fileName, ext)) {
            return ext;
        }
    }
    return "";
}
export function HasTSFileExtension(path: gostring): bool {
    return FileExtensionIsOneOf(path, $state.SupportedTSExtensionsFlat);
}
export function HasImplementationTSFileExtension(path: gostring): bool {
    return FileExtensionIsOneOf(path, $state.SupportedTSImplementationExtensions) && !IsDeclarationFileName(path);
}
export function HasJSFileExtension(path: gostring): bool {
    return FileExtensionIsOneOf(path, $state.SupportedJSExtensionsFlat);
}
export function IsDeclarationFileName(fileName: gostring): bool {
    return GetDeclarationFileExtension(fileName) !== "";
}
export function ExtensionIsOneOf(ext: gostring, extensions: RuntimeSlice<gostring>): bool {
    return Contains$SliceOf_string$string(extensions, ext);
}
export function GetDeclarationFileExtension(fileName: gostring): gostring {
    let base = GetBaseFileName(fileName);
    const __gotots_range_0 = $state.SupportedDeclarationExtensions;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let ext = __gotots_range_value_0;
        if (strings__from_gostdlib.HasSuffix(base, ext)) {
            return ext;
        }
    }
    if (strings__from_gostdlib.HasSuffix(base, ExtensionTs$string)) {
        let index = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(base, ".d.")));
        if (index >= 0) {
            return goStringSlice(base, index);
        }
    }
    return "";
}
export function GetDeclarationEmitExtensionForPath(path: gostring): gostring {
    __gotots_control_target_0: {
        if (FileExtensionIsOneOf(path, RuntimeSlice.literal<gostring>([ExtensionMjs$string, ExtensionMts$string]))) {
            return ExtensionDmts$string;
        }
        else if (FileExtensionIsOneOf(path, RuntimeSlice.literal<gostring>([ExtensionCjs$string, ExtensionCts$string]))) {
            return ExtensionDcts$string;
        }
        else if (FileExtensionIsOneOf(path, RuntimeSlice.literal<gostring>([ExtensionTs$string, ExtensionTsx$string, ExtensionJs$string, ExtensionJsx$string]))) {
            return ExtensionDts$string;
        }
        else {
            let ext = GetAnyExtensionFromPath(path, RuntimeSlice.nil<gostring>(), false);
            if (ext !== "") {
                return ".d" + ext + ".ts";
            }
            return ExtensionDts$string;
        }
    }
}
export function ChangeAnyExtension(path: gostring, ext: gostring, extensions: RuntimeSlice<gostring>, ignoreCase: bool): gostring {
    let pathext = GetAnyExtensionFromPath(path, extensions, ignoreCase);
    if (pathext !== "") {
        let result = goStringSlice(path, 0, path.length - pathext.length);
        if (ext === "") {
            return result;
        }
        if (strings__from_gostdlib.HasPrefix(ext, ".")) {
            return result + ext;
        }
        return result + "." + ext;
    }
    return path;
}
export function ChangeExtension(path: gostring, newExtension: gostring): gostring {
    return ChangeAnyExtension(path, newExtension, $state.extensionsToRemove, false);
}
export function ChangeFullExtension(path: gostring, newExtension: gostring): gostring {
    let declarationExtension = GetDeclarationFileExtension(path);
    if (declarationExtension !== "") {
        let ext = newExtension;
        if (!strings__from_gostdlib.HasPrefix(ext, ".")) {
            ext = "." + ext;
        }
        return goStringSlice(path, 0, path.length - declarationExtension.length) + ext;
    }
    return ChangeExtension(path, newExtension);
}
export function GetPossibleOriginalInputExtensionForExtension(path: gostring): RuntimeSlice<gostring> {
    if (FileExtensionIsOneOf(path, RuntimeSlice.literal<gostring>([ExtensionDmts$string, ExtensionMjs$string, ExtensionMts$string]))) {
        return RuntimeSlice.literal<gostring>([ExtensionMts$string, ExtensionMjs$string]);
    }
    if (FileExtensionIsOneOf(path, RuntimeSlice.literal<gostring>([ExtensionDcts$string, ExtensionCjs$string, ExtensionCts$string]))) {
        return RuntimeSlice.literal<gostring>([ExtensionCts$string, ExtensionCjs$string]);
    }
    {
        let ext = GetDeclarationFileExtension(path);
        if (ext !== "" && ext !== ExtensionDts$string) {
            let inner = goStringSlice(ext, 3, ext.length - 3);
            return RuntimeSlice.literal<gostring>(["." + inner]);
        }
    }
    return RuntimeSlice.literal<gostring>([ExtensionTsx$string, ExtensionTs$string, ExtensionJsx$string, ExtensionJs$string]);
}
