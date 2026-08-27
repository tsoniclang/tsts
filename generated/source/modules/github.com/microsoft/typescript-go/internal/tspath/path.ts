import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import type { $goContainerStorageType, $goStorageType, GoContainerStoredValue, GoStoredValue } from "@gotots/runtime/storage.js";
import { CompareStringsCaseInsensitive as CompareStringsCaseInsensitive__from_stringutil, EquateStringCaseInsensitive as EquateStringCaseInsensitive__from_stringutil, GetStringComparer as GetStringComparer__from_stringutil, GetStringEqualityComparer as GetStringEqualityComparer__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_ } from "../../../../../../support/anonymous-structs.js";
import { Compare$int } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { Sort$SliceOf_Named_tspath$Path$Named_tspath$Path } from "../../../../../../support/generics/concretizations/slices/Sort.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../support/maps.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { goUnsafeString } from "@gotots/runtime/unsafe.js";
export class Path implements GoStoredValue<gostring>, GoContainerStoredValue<gostring> {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare readonly [$goStorageType]: gostring;
    declare readonly [$goContainerStorageType]: gostring;
    declare private readonly then?: never;
    ContainsPath(child: Path): bool {
        if (this.$value.length === 0) {
            return false;
        }
        return this.$value === child.$value || child.$value.length > this.$value.length && strings__from_gostdlib.HasPrefix(child.$value, this.$value) && (goStringIndex(this.$value, this.$value.length - 1) === 47 || goStringIndex(child.$value, this.$value.length) === 47);
    }
    EnsureTrailingDirectorySeparator(): Path {
        return new Path(EnsureTrailingDirectorySeparator(this.$value));
    }
    GetDirectoryPath(): Path {
        return new Path(GetDirectoryPath(this.$value));
    }
}
export const DirectorySeparator$uint8: uint8 = 47;
export const urlSchemeSeparator$string: gostring = "://";
export function isAnyDirectorySeparator(char: uint8): bool {
    return char === 47 || char === 92;
}
export function IsUrl(path: gostring): bool {
    return GetEncodedRootLength(path) < 0;
}
export function IsRootedDiskPath(path: gostring): bool {
    return GetEncodedRootLength(path) > 0;
}
export function IsDynamicFileName(fileName: gostring): bool {
    return strings__from_gostdlib.HasPrefix(fileName, "^/");
}
export function PathIsAbsolute(path: gostring): bool {
    return GetEncodedRootLength(path) !== 0;
}
export function HasTrailingDirectorySeparator(path: gostring): bool {
    return path.length > 0 && isAnyDirectorySeparator(goStringIndex(path, path.length - 1));
}
export function CombinePaths(firstPath: gostring, paths: RuntimeSlice<gostring>): gostring {
    firstPath = NormalizeSlashes(firstPath);
    let b = named_strings.StringsBuilderOperations.$zero();
    let size = firstPath.length + paths.length;
    const __gotots_range_0 = paths;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let p = __gotots_range_value_0;
        size += p.length;
    }
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(size)));
    strings__from_gostdlib.Builder.WriteString(b, firstPath);
    let start = 0;
    let result: (() => gostring) | undefined = (): gostring => {
        return goStringSlice(strings__from_gostdlib.Builder.String(b), start);
    };
    let setResult: (($0: gostring) => void) | undefined = (value: gostring): void => {
        start = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Builder.Len(b)));
        strings__from_gostdlib.Builder.WriteString(b, value);
    };
    const __gotots_range_1 = paths;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let trailingPath = __gotots_range_value_1;
        if (trailingPath === "") {
            continue;
        }
        trailingPath = NormalizeSlashes(trailingPath);
        const __gotots_callee_0 = result;
        const __gotots_binary_operand_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        const __gotots_binary_operand_1 = "";
        if (__gotots_binary_operand_0 === __gotots_binary_operand_1 || GetRootLength(trailingPath) !== 0) {
            const __gotots_callee_1 = setResult;
            const __gotots_argument_0 = trailingPath;
            (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
        }
        else {
            const __gotots_callee_2 = result;
            const __gotots_argument_1 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
            if (!HasTrailingDirectorySeparator(__gotots_argument_1)) {
                strings__from_gostdlib.Builder.WriteByte(b, DirectorySeparator$uint8);
            }
            strings__from_gostdlib.Builder.WriteString(b, trailingPath);
        }
    }
    const __gotots_callee_3 = result;
    return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))();
}
export function GetPathComponents(path: gostring, currentDirectory: gostring): RuntimeSlice<gostring> {
    path = CombinePaths(currentDirectory, RuntimeSlice.literal<gostring>([path]));
    return pathComponents(path, GetRootLength(path));
}
export function pathComponents(path: gostring, rootLength: int): RuntimeSlice<gostring> {
    let root = goStringSlice(path, 0, rootLength);
    let rest = strings__from_gostdlib.Split(goStringSlice(path, rootLength), "/");
    if (rest.length > 0 && rest.get(rest.length - 1) === "") {
        rest = rest.slice(0, rest.length - 1, null);
    }
    return goSliceAppendSlice<gostring>(RuntimeSlice.literal<gostring>([root]), rest, "");
}
export function IsVolumeCharacter(char: uint8): bool {
    return char >= 97 && char <= 122 || char >= 65 && char <= 90;
}
export function getFileUrlVolumeSeparatorEnd(url: gostring, start: int): int {
    if (url.length <= start) {
        return -1;
    }
    let ch0 = goStringIndex(url, start);
    if (ch0 === 58) {
        return start + 1;
    }
    if (ch0 === 37 && url.length > start + 2 && goStringIndex(url, start + 1) === 51) {
        let ch2 = goStringIndex(url, start + 2);
        if (ch2 === 97 || ch2 === 65) {
            return start + 3;
        }
    }
    return -1;
}
export function GetEncodedRootLength(path: gostring): int {
    let ln = path.length;
    if (ln === 0) {
        return 0;
    }
    let ch0 = goStringIndex(path, 0);
    if (ch0 === 47 || ch0 === 92) {
        if (ln === 1 || goStringIndex(path, 1) !== ch0) {
            return 1;
        }
        let offset = 2;
        let p1 = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(goStringSlice(path, offset), ch0)));
        if (p1 < 0) {
            return ln;
        }
        return p1 + offset + 1;
    }
    if (IsVolumeCharacter(ch0) && ln > 1 && goStringIndex(path, 1) === 58) {
        if (ln === 2) {
            return 2;
        }
        let ch2 = goStringIndex(path, 2);
        if (ch2 === 47 || ch2 === 92) {
            return 3;
        }
    }
    if (ch0 === 94 && ln > 1 && goStringIndex(path, 1) === 47) {
        return 2;
    }
    let schemeEnd = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(path, urlSchemeSeparator$string)));
    if (schemeEnd !== -1) {
        let authorityStart = schemeEnd + 3;
        let authorityLength = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Index(goStringSlice(path, authorityStart), "/")));
        if (authorityLength !== -1) {
            let authorityEnd = authorityStart + authorityLength;
            let scheme = goStringSlice(path, 0, schemeEnd);
            let authority = goStringSlice(path, authorityStart, authorityEnd);
            if (scheme === "file" && (authority === "" || authority === "localhost") && (path.length > authorityEnd + 2) && IsVolumeCharacter(goStringIndex(path, authorityEnd + 1))) {
                let volumeSeparatorEnd = getFileUrlVolumeSeparatorEnd(path, authorityEnd + 2);
                if (volumeSeparatorEnd !== -1) {
                    if (volumeSeparatorEnd === path.length) {
                        return ~volumeSeparatorEnd;
                    }
                    if (goStringIndex(path, volumeSeparatorEnd) === 47) {
                        return ~(volumeSeparatorEnd + 1);
                    }
                }
            }
            return ~(authorityEnd + 1);
        }
        return ~ln;
    }
    return 0;
}
export function GetRootLength(path: gostring): int {
    let rootLength = GetEncodedRootLength(path);
    if (rootLength < 0) {
        return ~rootLength;
    }
    return rootLength;
}
export function GetDirectoryPath(path: gostring): gostring {
    path = NormalizeSlashes(path);
    let rootLength = GetRootLength(path);
    if (rootLength === path.length) {
        return path;
    }
    path = RemoveTrailingDirectorySeparator(path);
    return goStringSlice(path, 0, globalThis.Math.max(rootLength, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(path, "/")))));
}
export function GetPathFromPathComponents(pathComponents__shadow_1: RuntimeSlice<gostring>): gostring {
    if (pathComponents__shadow_1.length === 0) {
        return "";
    }
    let root = pathComponents__shadow_1.get(0);
    if (root !== "") {
        root = EnsureTrailingDirectorySeparator(root);
    }
    return root + strings__from_gostdlib.Join(pathComponents__shadow_1.slice(1, null, null), "/");
}
export function NormalizeSlashes(path: gostring): gostring {
    return strings__from_gostdlib.ReplaceAll(path, "\\", "/");
}
export function reducePathComponents(components: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
    if (components.length === 0) {
        return RuntimeSlice.literal<gostring>([]);
    }
    let reduced = RuntimeSlice.literal<gostring>([components.get(0)]);
    for (let i = 1; i < components.length; i++) {
        let component = components.get(i);
        if (component === "") {
            continue;
        }
        if (component === ".") {
            continue;
        }
        if (component === "..") {
            if (reduced.length > 1) {
                if (reduced.get(reduced.length - 1) !== "..") {
                    reduced = reduced.slice(0, reduced.length - 1, null);
                    continue;
                }
            }
            else if (reduced.get(0) !== "") {
                continue;
            }
        }
        reduced = reduced.append("", [component]);
    }
    return reduced;
}
export function ResolvePath(path: gostring, paths: RuntimeSlice<gostring>): gostring {
    let combinedPath = "";
    if (paths.length > 0) {
        combinedPath = CombinePaths(path, paths);
    }
    else {
        combinedPath = NormalizeSlashes(path);
    }
    return NormalizePath(combinedPath);
}
export function GetNormalizedPathComponents(path: gostring, currentDirectory: gostring): RuntimeSlice<gostring> {
    let combined = CombinePaths(currentDirectory, RuntimeSlice.literal<gostring>([path]));
    return getNormalizedPathComponentsFromCombined(combined);
}
export function getNormalizedPathComponentsFromCombined(path: gostring): RuntimeSlice<gostring> {
    let rootLength = GetRootLength(path);
    let components = RuntimeSlice.make<gostring>(1, 8, "");
    components.set(0, goStringSlice(path, 0, rootLength));
    for (let i = rootLength; i < path.length;) {
        for (; i < path.length && goStringIndex(path, i) === 47;) {
            i++;
        }
        if (i >= path.length) {
            break;
        }
        let start = i;
        for (; i < path.length && goStringIndex(path, i) !== 47;) {
            i++;
        }
        let component = goStringSlice(path, start, i);
        if (component === "" || component === ".") {
            continue;
        }
        if (component === "..") {
            if (components.length > 1) {
                if (components.get(components.length - 1) !== "..") {
                    components = components.slice(0, components.length - 1, null);
                    continue;
                }
            }
            else if (components.get(0) !== "") {
                continue;
            }
        }
        components = components.append("", [component]);
    }
    return components;
}
export function GetNormalizedAbsolutePathWithoutRoot(fileName: gostring, currentDirectory: gostring): gostring {
    let absolutePath = GetNormalizedAbsolutePath(fileName, currentDirectory);
    let rootLength = GetRootLength(absolutePath);
    return goStringSlice(absolutePath, rootLength);
}
export function GetNormalizedAbsolutePath(fileName: gostring, currentDirectory: gostring): gostring {
    let rootLength = GetRootLength(fileName);
    if (rootLength === 0 && currentDirectory !== "") {
        fileName = CombinePaths(currentDirectory, RuntimeSlice.literal<gostring>([fileName]));
    }
    else {
        fileName = NormalizeSlashes(fileName);
    }
    rootLength = GetRootLength(fileName);
    {
        const __gotots_results_1 = simpleNormalizePath(fileName);
        let simpleNormalized = __gotots_results_1[0];
        let ok = __gotots_results_1[1];
        if (ok) {
            let length__shadow_1 = simpleNormalized.length;
            if (length__shadow_1 > rootLength) {
                return RemoveTrailingDirectorySeparator(simpleNormalized);
            }
            if (length__shadow_1 === rootLength && rootLength !== 0) {
                return EnsureTrailingDirectorySeparator(simpleNormalized);
            }
            return simpleNormalized;
        }
    }
    let length = fileName.length;
    let root = goStringSlice(fileName, 0, rootLength);
    let changed = false;
    let normalized = "";
    let segmentStart = 0;
    let index = rootLength;
    let normalizedUpTo = index;
    let seenNonDotDotSegment = rootLength !== 0;
    for (; index < length;) {
        segmentStart = index;
        let ch = goStringIndex(fileName, index);
        for (; ch === 47;) {
            index++;
            if (index < length) {
                ch = goStringIndex(fileName, index);
            }
            else {
                break;
            }
        }
        if (index > segmentStart) {
            if (!changed) {
                normalized = goStringSlice(fileName, 0, globalThis.Math.max(rootLength, segmentStart - 1));
                changed = true;
            }
            if (index === length) {
                break;
            }
            segmentStart = index;
        }
        let segmentEnd = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(goStringSlice(fileName, index + 1), 47)));
        if (segmentEnd === -1) {
            segmentEnd = length;
        }
        else {
            segmentEnd += index + 1;
        }
        let segmentLength = segmentEnd - segmentStart;
        if (segmentLength === 1 && goStringIndex(fileName, index) === 46) {
            if (!changed) {
                normalized = goStringSlice(fileName, 0, normalizedUpTo);
                changed = true;
            }
        }
        else if (segmentLength === 2 && goStringIndex(fileName, index) === 46 && goStringIndex(fileName, index + 1) === 46) {
            if (!seenNonDotDotSegment) {
                if (changed) {
                    if (normalized.length === rootLength) {
                        normalized = normalized + "..";
                    }
                    else {
                        normalized = normalized + "/..";
                    }
                }
                else {
                    normalizedUpTo = index + 2;
                }
            }
            else if (!changed) {
                if (normalizedUpTo - 1 >= 0) {
                    normalized = goStringSlice(fileName, 0, globalThis.Math.max(rootLength, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(goStringSlice(fileName, 0, normalizedUpTo - 1), 47)))));
                }
                else {
                    normalized = goStringSlice(fileName, 0, normalizedUpTo);
                }
                changed = true;
                seenNonDotDotSegment = (normalized.length !== rootLength || rootLength !== 0) && normalized !== ".." && !strings__from_gostdlib.HasSuffix(normalized, "/..");
            }
            else {
                let lastSlash = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndexByte(normalized, 47)));
                if (lastSlash !== -1) {
                    normalized = goStringSlice(normalized, 0, globalThis.Math.max(rootLength, lastSlash));
                }
                else {
                    normalized = root;
                }
                seenNonDotDotSegment = (normalized.length !== rootLength || rootLength !== 0) && normalized !== ".." && !strings__from_gostdlib.HasSuffix(normalized, "/..");
            }
        }
        else if (changed) {
            if (normalized.length !== rootLength) {
                normalized = normalized + "/";
            }
            seenNonDotDotSegment = true;
            normalized = normalized + goStringSlice(fileName, segmentStart, segmentEnd);
        }
        else {
            seenNonDotDotSegment = true;
            normalizedUpTo = segmentEnd;
        }
        index = segmentEnd + 1;
    }
    if (changed) {
        return normalized;
    }
    if (length > rootLength) {
        return RemoveTrailingDirectorySeparators(fileName);
    }
    if (length === rootLength) {
        return EnsureTrailingDirectorySeparator(fileName);
    }
    return fileName;
}
export function simpleNormalizePath(path: gostring): [
    gostring,
    bool
] {
    if (!hasRelativePathSegment(path)) {
        return [path, true];
    }
    let simplified = strings__from_gostdlib.ReplaceAll(path, "/./", "/");
    let trimmed = strings__from_gostdlib.TrimPrefix(simplified, "./");
    if (trimmed !== path && !hasRelativePathSegment(trimmed) && !(trimmed !== simplified && strings__from_gostdlib.HasPrefix(trimmed, "/"))) {
        path = trimmed;
        return [path, true];
    }
    return ["", false];
}
export function hasRelativePathSegment(p: gostring): bool {
    let n = p.length;
    if (n === 0) {
        return false;
    }
    if (p === "." || p === "..") {
        return true;
    }
    if (goStringIndex(p, 0) === 46) {
        if (n >= 2 && goStringIndex(p, 1) === 47) {
            return true;
        }
        if (n >= 3 && goStringIndex(p, 1) === 46 && goStringIndex(p, 2) === 47) {
            return true;
        }
    }
    if (goStringIndex(p, n - 1) === 46) {
        if (n >= 2 && goStringIndex(p, n - 2) === 47) {
            return true;
        }
        if (n >= 3 && goStringIndex(p, n - 2) === 46 && goStringIndex(p, n - 3) === 47) {
            return true;
        }
    }
    let prevSlash = false;
    let segLen = 0;
    let dotCount = 0;
    const __gotots_range_2 = n;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_index_2;
        let i = __gotots_range_value_2;
        let c = goStringIndex(p, i);
        if (c === 47) {
            if (prevSlash) {
                return true;
            }
            if ((segLen === 1 && dotCount === 1) || (segLen === 2 && dotCount === 2)) {
                return true;
            }
            prevSlash = true;
            segLen = 0;
            dotCount = 0;
            continue;
        }
        if (c === 46) {
            if (dotCount >= 0) {
                dotCount++;
            }
        }
        else {
            dotCount = -1;
        }
        segLen++;
        prevSlash = false;
    }
    return (segLen === 1 && dotCount === 1) || (segLen === 2 && dotCount === 2);
}
export function NormalizePath(path: gostring): gostring {
    path = NormalizeSlashes(path);
    {
        const __gotots_results_0 = simpleNormalizePath(path);
        let normalized__shadow_1 = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok) {
            return normalized__shadow_1;
        }
    }
    let normalized = GetNormalizedAbsolutePath(path, "");
    if (normalized !== "" && HasTrailingDirectorySeparator(path)) {
        normalized = EnsureTrailingDirectorySeparator(normalized);
    }
    return normalized;
}
export function GetCanonicalFileName(fileName: gostring, useCaseSensitiveFileNames: bool): gostring {
    if (useCaseSensitiveFileNames) {
        return fileName;
    }
    return ToFileNameLowerCase(fileName);
}
export function ToFileNameLowerCase(fileName: gostring): gostring {
    const IWithDot$int32: int32 = 304;
    let ascii = true;
    let needsLower = false;
    let fileNameLen = fileName.length;
    const __gotots_range_3 = fileNameLen;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_index_3;
        let i = __gotots_range_value_3;
        let c = goStringIndex(fileName, i);
        if (c >= 128) {
            ascii = false;
            break;
        }
        if (65 <= c && c <= 90) {
            needsLower = true;
        }
    }
    if (ascii) {
        if (!needsLower) {
            return fileName;
        }
        let b = RuntimeSlice.make<uint8>(fileNameLen, null, 0);
        const __gotots_range_4 = fileNameLen;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4; __gotots_range_index_4++) {
            const __gotots_range_value_4 = __gotots_range_index_4;
            let i = __gotots_range_value_4;
            let c = goStringIndex(fileName, i);
            if (65 <= c && c <= 90) {
                c += 32;
            }
            b.set(i, c);
        }
        return goUnsafeString<uint8>(b, 0, b.length);
    }
    return strings__from_gostdlib.Map((r: int32): int32 => {
        if (r === IWithDot$int32) {
            return r;
        }
        return unicode__from_gostdlib.ToLower(r);
    }, fileName);
}
export function ToPath(fileName: gostring, basePath: gostring, useCaseSensitiveFileNames: bool): Path {
    let nonCanonicalizedPath = "";
    if (IsRootedDiskPath(fileName)) {
        nonCanonicalizedPath = NormalizePath(fileName);
    }
    else {
        nonCanonicalizedPath = GetNormalizedAbsolutePath(fileName, basePath);
    }
    return new Path(GetCanonicalFileName(nonCanonicalizedPath, useCaseSensitiveFileNames));
}
export function RemoveTrailingDirectorySeparator(path: gostring): gostring {
    if (HasTrailingDirectorySeparator(path)) {
        return goStringSlice(path, 0, path.length - 1);
    }
    return path;
}
export function RemoveTrailingDirectorySeparators(path: gostring): gostring {
    for (; HasTrailingDirectorySeparator(path);) {
        path = RemoveTrailingDirectorySeparator(path);
    }
    return path;
}
export function EnsureTrailingDirectorySeparator(path: gostring): gostring {
    if (!HasTrailingDirectorySeparator(path)) {
        return path + "/";
    }
    return path;
}
export function GetPathComponentsRelativeTo(__go_from: gostring, to: gostring, options: ComparePathsOptions): RuntimeSlice<gostring> {
    let fromComponents = reducePathComponents(GetPathComponents(__go_from, options.CurrentDirectory));
    let toComponents = reducePathComponents(GetPathComponents(to, options.CurrentDirectory));
    let start = 0;
    let maxCommonComponents = globalThis.Math.min(fromComponents.length, toComponents.length);
    let stringEqualer: (($0: gostring, $1: gostring) => bool) | undefined = options.$go$private$tspath$getEqualityComparer();
    for (; start < maxCommonComponents; start++) {
        let fromComponent = fromComponents.get(start);
        let toComponent = toComponents.get(start);
        if (start === 0) {
            if (!EquateStringCaseInsensitive__from_stringutil(fromComponent, toComponent)) {
                break;
            }
        }
        else {
            const __gotots_callee_7 = stringEqualer;
            const __gotots_argument_6 = fromComponent;
            const __gotots_argument_7 = toComponent;
            if (!(__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7)) {
                break;
            }
        }
    }
    if (start === 0) {
        return toComponents;
    }
    let numDotDotSlashes = fromComponents.length - start;
    let result = RuntimeSlice.make<gostring>(1 + numDotDotSlashes + toComponents.length - start, null, "");
    result.set(0, "");
    let i = 1;
    const __gotots_range_6 = numDotDotSlashes;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6; __gotots_range_index_6++) {
        result.set(i, "..");
        i++;
    }
    const __gotots_range_7 = toComponents.slice(start, null, null);
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
        const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
        let component = __gotots_range_value_7;
        result.set(i, component);
        i++;
    }
    return result;
}
export function GetRelativePathFromDirectory(fromDirectory: gostring, to: gostring, options: ComparePathsOptions): gostring {
    if ((GetRootLength(fromDirectory) > 0) !== (GetRootLength(to) > 0)) {
        const __gotots_argument_3 = new GoInterfaceAdapter("paths must either both be absolute or both be relative");
        GoPanic.raise(__gotots_argument_3 === undefined ? GoPanicNilValue.create() : __gotots_argument_3);
    }
    let pathComponents__shadow_1 = GetPathComponentsRelativeTo(fromDirectory, to, ComparePathsOptions.$copy(options));
    return GetPathFromPathComponents(pathComponents__shadow_1);
}
export function GetRelativePathFromFile(__go_from: gostring, to: gostring, options: ComparePathsOptions): gostring {
    return EnsurePathIsNonModuleName(GetRelativePathFromDirectory(GetDirectoryPath(__go_from), to, ComparePathsOptions.$copy(options)));
}
export function ConvertToRelativePath(absoluteOrRelativePath: gostring, options: ComparePathsOptions): gostring {
    if (!IsRootedDiskPath(absoluteOrRelativePath)) {
        return absoluteOrRelativePath;
    }
    return GetRelativePathToDirectoryOrUrl(options.CurrentDirectory, absoluteOrRelativePath, false, ComparePathsOptions.$copy(options));
}
export function GetRelativePathToDirectoryOrUrl(directoryPathOrUrl: gostring, relativeOrAbsolutePath: gostring, isAbsolutePathAnUrl: bool, options: ComparePathsOptions): gostring {
    let pathComponents__shadow_1 = GetPathComponentsRelativeTo(directoryPathOrUrl, relativeOrAbsolutePath, ComparePathsOptions.$copy(options));
    let firstComponent = pathComponents__shadow_1.get(0);
    if (isAbsolutePathAnUrl && IsRootedDiskPath(firstComponent)) {
        let prefix = "";
        if (goStringIndex(firstComponent, 0) === DirectorySeparator$uint8) {
            prefix = "file://";
        }
        else {
            prefix = "file:///";
        }
        pathComponents__shadow_1.set(0, prefix + firstComponent);
    }
    return GetPathFromPathComponents(pathComponents__shadow_1);
}
export function GetBaseFileName(path: gostring): gostring {
    path = NormalizeSlashes(path);
    let rootLength = GetRootLength(path);
    if (rootLength === path.length) {
        return "";
    }
    path = RemoveTrailingDirectorySeparator(path);
    return goStringSlice(path, globalThis.Math.max(GetRootLength(path), globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(path, "/"))) + 1));
}
export function GetAnyExtensionFromPath(path: gostring, extensions: RuntimeSlice<gostring>, ignoreCase: bool): gostring {
    if (extensions.length > 0) {
        return getAnyExtensionFromPathWorker(RemoveTrailingDirectorySeparator(path), extensions, GetStringEqualityComparer__from_stringutil(ignoreCase));
    }
    let baseFileName = GetBaseFileName(path);
    let extensionIndex = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(baseFileName, ".")));
    if (extensionIndex >= 0) {
        return goStringSlice(baseFileName, extensionIndex);
    }
    return "";
}
export function getAnyExtensionFromPathWorker(path: gostring, extensions: RuntimeSlice<gostring>, stringEqualityComparer: (($0: gostring, $1: gostring) => bool) | undefined): gostring {
    const __gotots_range_8 = extensions;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
        let extension = __gotots_range_value_8;
        let result = tryGetExtensionFromPath(path, extension, stringEqualityComparer);
        if (result !== "") {
            return result;
        }
    }
    return "";
}
export function tryGetExtensionFromPath(path: gostring, extension: gostring, stringEqualityComparer: (($0: gostring, $1: gostring) => bool) | undefined): gostring {
    if (!strings__from_gostdlib.HasPrefix(extension, ".")) {
        extension = "." + extension;
    }
    if (path.length >= extension.length && goStringIndex(path, path.length - extension.length) === 46) {
        let pathExtension = goStringSlice(path, path.length - extension.length);
        const __gotots_callee_10 = stringEqualityComparer;
        const __gotots_argument_12 = pathExtension;
        const __gotots_argument_13 = extension;
        if ((__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13)) {
            return pathExtension;
        }
    }
    return "";
}
export function PathIsRelative(path: gostring): bool {
    if (path === "." || path === "..") {
        return true;
    }
    if (path.length >= 2 && goStringIndex(path, 0) === 46 && (goStringIndex(path, 1) === 47 || goStringIndex(path, 1) === 92)) {
        return true;
    }
    if (path.length >= 3 && goStringIndex(path, 0) === 46 && goStringIndex(path, 1) === 46 && (goStringIndex(path, 2) === 47 || goStringIndex(path, 2) === 92)) {
        return true;
    }
    return false;
}
export function EnsurePathIsNonModuleName(path: gostring): gostring {
    if (!PathIsAbsolute(path) && !PathIsRelative(path)) {
        return "./" + path;
    }
    return path;
}
export function IsExternalModuleNameRelative(moduleName: gostring): bool {
    return PathIsRelative(moduleName) || IsRootedDiskPath(moduleName);
}
export class ComparePathsOptions {
    declare private readonly $goType: void;
    public constructor(public UseCaseSensitiveFileNames: bool, public CurrentDirectory: gostring) {
    }
    static $zero(): ComparePathsOptions {
        return new ComparePathsOptions(false, "");
    }
    static $copy($source: ComparePathsOptions): ComparePathsOptions {
        return new ComparePathsOptions($source.UseCaseSensitiveFileNames, $source.CurrentDirectory);
    }
    static $equal($left: ComparePathsOptions, $right: ComparePathsOptions): bool {
        return $left.UseCaseSensitiveFileNames === $right.UseCaseSensitiveFileNames && $left.CurrentDirectory === $right.CurrentDirectory;
    }
    static $hash($source: ComparePathsOptions): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.UseCaseSensitiveFileNames));
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.CurrentDirectory));
        return $hash;
    }
    declare private readonly then?: never;
    GetComparer(): (($0: gostring, $1: gostring) => int) | undefined {
        return GetStringComparer__from_stringutil(!this.UseCaseSensitiveFileNames);
    }
    $go$private$tspath$getEqualityComparer(): (($0: gostring, $1: gostring) => bool) | undefined {
        return GetStringEqualityComparer__from_stringutil(!this.UseCaseSensitiveFileNames);
    }
}
export function ComparePaths(a: gostring, b: gostring, options: ComparePathsOptions): int {
    a = CombinePaths(options.CurrentDirectory, RuntimeSlice.literal<gostring>([a]));
    b = CombinePaths(options.CurrentDirectory, RuntimeSlice.literal<gostring>([b]));
    if (a === b) {
        return 0;
    }
    if (a === "") {
        return -1;
    }
    if (b === "") {
        return 1;
    }
    let aRoot = goStringSlice(a, 0, GetRootLength(a));
    let bRoot = goStringSlice(b, 0, GetRootLength(b));
    let result = CompareStringsCaseInsensitive__from_stringutil(aRoot, bRoot);
    if (result !== 0) {
        return result;
    }
    let aRest = goStringSlice(a, aRoot.length);
    let bRest = goStringSlice(b, bRoot.length);
    if (!hasRelativePathSegment(aRest) && !hasRelativePathSegment(bRest)) {
        const __gotots_callee_8 = options.GetComparer();
        const __gotots_argument_8 = aRest;
        const __gotots_argument_9 = bRest;
        return (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
    }
    let aComponents = reducePathComponents(GetPathComponents(a, ""));
    let bComponents = reducePathComponents(GetPathComponents(b, ""));
    let sharedLength = globalThis.Math.min(aComponents.length, bComponents.length);
    for (let i = 1; i < sharedLength; i++) {
        const __gotots_callee_9 = options.GetComparer();
        const __gotots_argument_10 = aComponents.get(i);
        const __gotots_argument_11 = bComponents.get(i);
        let result__shadow_1 = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11);
        if (result__shadow_1 !== 0) {
            return result__shadow_1;
        }
    }
    return Compare$int(aComponents.length, bComponents.length);
}
export function ContainsPath(parent: gostring, child: gostring, options: ComparePathsOptions): bool {
    parent = CombinePaths(options.CurrentDirectory, RuntimeSlice.literal<gostring>([parent]));
    child = CombinePaths(options.CurrentDirectory, RuntimeSlice.literal<gostring>([child]));
    if (parent === "" || child === "") {
        return false;
    }
    if (parent === child) {
        return true;
    }
    let parentComponents = reducePathComponents(GetPathComponents(parent, ""));
    let childComponents = reducePathComponents(GetPathComponents(child, ""));
    if (childComponents.length < parentComponents.length) {
        return false;
    }
    let componentComparer: (($0: gostring, $1: gostring) => bool) | undefined = options.$go$private$tspath$getEqualityComparer();
    const __gotots_range_5 = parentComponents;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_index_5;
        const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
        let i = __gotots_range_value_5;
        let parentComponent = __gotots_range_value_6;
        let comparer: (($0: gostring, $1: gostring) => bool) | undefined;
        if (i === 0) {
            comparer = EquateStringCaseInsensitive__from_stringutil;
        }
        else {
            comparer = componentComparer;
        }
        const __gotots_callee_6 = comparer;
        const __gotots_argument_4 = parentComponent;
        const __gotots_argument_5 = childComponents.get(i);
        if (!(__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5)) {
            return false;
        }
    }
    return true;
}
export function FileExtensionIs(path: gostring, extension: gostring): bool {
    return path.length > extension.length && strings__from_gostdlib.HasSuffix(path, extension);
}
export function ForEachAncestorDirectoryStoppingAtGlobalCache$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$zero$void_to_T0: () => T, globalCacheLocation: gostring, directory: gostring, callback: (($0: gostring) => [
    T,
    bool
]) | undefined): T {
    const __gotots_results_4 = ForEachAncestorDirectory$kernel<T>($go$copy$T0_to_T0, $go$zero$void_to_T0, directory, (ancestorDirectory: gostring): [
        T,
        bool
    ] => {
        const __gotots_callee_11 = callback;
        const __gotots_argument_14 = ancestorDirectory;
        const __gotots_results_3 = (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14);
        let result__shadow_1: T = $go$copy$T0_to_T0(__gotots_results_3[0]);
        let stop = __gotots_results_3[1];
        if (stop || ancestorDirectory === globalCacheLocation) {
            return [$go$copy$T0_to_T0(result__shadow_1), true];
        }
        return [$go$copy$T0_to_T0(result__shadow_1), false];
    });
    let result: T = $go$copy$T0_to_T0(__gotots_results_4[0]);
    return $go$copy$T0_to_T0(result);
}
export function ForEachAncestorDirectory$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$zero$void_to_T0: () => T, directory: gostring, callback: (($0: gostring) => [
    T,
    bool
]) | undefined): [
    T,
    bool
] {
    let result: T = $go$zero$void_to_T0();
    let ok: bool = false;
    for (;;) {
        const __gotots_callee_4 = callback;
        const __gotots_argument_2 = directory;
        const __gotots_results_2 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        let result__shadow_1: T = $go$copy$T0_to_T0(__gotots_results_2[0]);
        let stop = __gotots_results_2[1];
        if (stop) {
            return [$go$copy$T0_to_T0(result__shadow_1), true];
        }
        let parentPath = GetDirectoryPath(directory);
        if (parentPath === directory) {
            let zero: T = $go$zero$void_to_T0();
            return [$go$copy$T0_to_T0(zero), false];
        }
        directory = parentPath;
    }
}
export function ForEachAncestorDirectoryPath$kernel<T>($go$copy$T0_to_T0: ($0: T) => T, $go$zero$void_to_T0: () => T, directory: Path, callback: (($0: Path) => [
    T,
    bool
]) | undefined): [
    T,
    bool
] {
    let result: T = $go$zero$void_to_T0();
    let ok: bool = false;
    return ForEachAncestorDirectory$kernel<T>($go$copy$T0_to_T0, $go$zero$void_to_T0, directory.$value, (directory__shadow_1: gostring): [
        T,
        bool
    ] => {
        const __gotots_callee_14 = callback;
        const __gotots_argument_22 = new Path(directory__shadow_1);
        return (__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22);
    });
}
export function HasExtension(fileName: gostring): bool {
    return strings__from_gostdlib.Contains(GetBaseFileName(fileName), ".");
}
export function SplitVolumePath(path: gostring): [
    gostring,
    gostring,
    bool
] {
    let volume: gostring = "";
    let rest: gostring = "";
    let ok: bool = false;
    if (path.length >= 2 && IsVolumeCharacter(goStringIndex(path, 0)) && goStringIndex(path, 1) === 58) {
        return [strings__from_gostdlib.ToLower(goStringSlice(path, 0, 2)), goStringSlice(path, 2), true];
    }
    return ["", path, false];
}
export function GetCommonParents(paths: RuntimeSlice<gostring>, minComponents: int, getPathComponents: (($0: gostring, $1: gostring) => RuntimeSlice<gostring>) | undefined, options: ComparePathsOptions): [
    RuntimeSlice<gostring>,
    GoMapValue<gostring, GoEmptyStruct>
] {
    let parents: RuntimeSlice<gostring> = RuntimeSlice.nil<gostring>();
    let ignored: GoMapValue<gostring, GoEmptyStruct> = GoMap.nil();
    if (minComponents < 1) {
        const __gotots_argument_15 = new GoInterfaceAdapter("minComponents must be at least 1");
        GoPanic.raise(__gotots_argument_15 === undefined ? GoPanicNilValue.create() : __gotots_argument_15);
    }
    if (paths.length === 0) {
        return [RuntimeSlice.nil<gostring>(), GoMap.nil()];
    }
    if (paths.length === 1) {
        const __gotots_callee_12 = getPathComponents;
        const __gotots_argument_16 = paths.get(0);
        const __gotots_argument_17 = options.CurrentDirectory;
        const __gotots_argument_18 = (__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17);
        const __gotots_binary_operand_2 = reducePathComponents(__gotots_argument_18).length;
        const __gotots_binary_operand_3 = minComponents;
        if (__gotots_binary_operand_2 < __gotots_binary_operand_3) {
            return [RuntimeSlice.nil<gostring>(), GoMap.make(1, [[paths.get(0), new GoEmptyStruct]])];
        }
        return [paths, GoMap.nil()];
    }
    ignored = GoMap.make(0, []);
    let pathComponents__shadow_1 = RuntimeSlice.make<RuntimeSlice<gostring>>(0, paths.length, RuntimeSlice.nil<gostring>());
    const __gotots_range_9 = paths;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
        const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
        let path = __gotots_range_value_9;
        const __gotots_callee_13 = getPathComponents;
        const __gotots_argument_19 = path;
        const __gotots_argument_20 = options.CurrentDirectory;
        const __gotots_argument_21 = (__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19, __gotots_argument_20);
        let components = reducePathComponents(__gotots_argument_21);
        if (components.length < minComponents) {
            ignored.store(path, new GoEmptyStruct);
        }
        else {
            pathComponents__shadow_1 = pathComponents__shadow_1.append(RuntimeSlice.nil<gostring>(), [components]);
        }
    }
    let results = getCommonParentsWorker(pathComponents__shadow_1, minComponents, ComparePathsOptions.$copy(options));
    let resultPaths = RuntimeSlice.make<gostring>(results.length, null, "");
    const __gotots_range_10 = results;
    for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
        const __gotots_range_value_10 = __gotots_range_index_10;
        const __gotots_range_value_11 = __gotots_range_10.get(__gotots_range_index_10);
        let i = __gotots_range_value_10;
        let comps = __gotots_range_value_11;
        resultPaths.set(i, GetPathFromPathComponents(comps));
    }
    return [resultPaths, ignored];
}
export function getCommonParentsWorker(componentGroups: RuntimeSlice<RuntimeSlice<gostring>>, minComponents: int, options: ComparePathsOptions): RuntimeSlice<RuntimeSlice<gostring>> {
    if (componentGroups.length === 0) {
        return RuntimeSlice.nil<RuntimeSlice<gostring>>();
    }
    let maxDepth = componentGroups.get(0).length;
    const __gotots_range_11 = componentGroups.slice(1, null, null);
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
        const __gotots_range_value_12 = __gotots_range_11.get(__gotots_range_index_11);
        let comps = __gotots_range_value_12;
        {
            let l = comps.length;
            if (l < maxDepth) {
                maxDepth = l;
            }
        }
    }
    let equality: (($0: gostring, $1: gostring) => bool) | undefined = options.$go$private$tspath$getEqualityComparer();
    const __gotots_range_12 = maxDepth;
    for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12; __gotots_range_index_12++) {
        const __gotots_range_value_13 = __gotots_range_index_12;
        let lastCommonIndex = __gotots_range_value_13;
        let candidate = componentGroups.get(0).get(lastCommonIndex);
        const __gotots_range_13 = componentGroups.slice(1, null, null);
        for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
            const __gotots_range_value_14 = __gotots_range_index_13;
            const __gotots_range_value_15 = __gotots_range_13.get(__gotots_range_index_13);
            let j = __gotots_range_value_14;
            let comps = __gotots_range_value_15;
            const __gotots_callee_15 = equality;
            const __gotots_argument_23 = candidate;
            const __gotots_argument_24 = comps.get(lastCommonIndex);
            if (!(__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23, __gotots_argument_24)) {
                if (lastCommonIndex < minComponents) {
                    let orderedGroups = RuntimeSlice.make<gostring>(0, componentGroups.length - j, ((void Path,
                        "") as gostring));
                    let newGroups: GoMapValue<Path, $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_> = $goMap$MapOf_Named_tspath$Path_To_Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_.make(0, []);
                    const __gotots_range_14 = componentGroups;
                    for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
                        const __gotots_range_value_16 = __gotots_range_14.get(__gotots_range_index_14);
                        let g = __gotots_range_value_16;
                        let key = ToPath(g.get(lastCommonIndex), options.CurrentDirectory, options.UseCaseSensitiveFileNames);
                        {
                            const __gotots_results_5 = newGroups.lookupOk(key);
                            let ok = __gotots_results_5[1];
                            if (!ok) {
                                orderedGroups = orderedGroups.append(((void Path,
                                    "") as gostring), [key.$value]);
                            }
                        }
                        newGroups.store(key, new $goStruct$Struct_Field_tspath_u24_head_SliceOf_string_Tag__empty__Field_tspath_u24_tails_SliceOf_SliceOf_string_Tag__empty_(g.slice(0, lastCommonIndex + 1, null), newGroups.lookup(key).tails.append(RuntimeSlice.nil<gostring>(), [g.slice(lastCommonIndex + 1, null, null)])));
                    }
                    Sort$SliceOf_Named_tspath$Path$Named_tspath$Path(orderedGroups);
                    let result = RuntimeSlice.make<RuntimeSlice<gostring>>(0, newGroups.length(), RuntimeSlice.nil<gostring>());
                    const __gotots_range_15 = orderedGroups;
                    for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15.length; __gotots_range_index_15++) {
                        const __gotots_range_value_17 = new Path(__gotots_range_15.get(__gotots_range_index_15));
                        let key = __gotots_range_value_17;
                        let group = newGroups.lookup(key);
                        let subResults = getCommonParentsWorker(group.tails, minComponents - (lastCommonIndex + 1), ComparePathsOptions.$copy(options));
                        const __gotots_range_16 = subResults;
                        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_16.length; __gotots_range_index_16++) {
                            const __gotots_range_value_18 = __gotots_range_16.get(__gotots_range_index_16);
                            let sr = __gotots_range_value_18;
                            result = result.append(RuntimeSlice.nil<gostring>(), [goSliceAppendSlice<gostring>(group.head, sr, "")]);
                        }
                    }
                    return result;
                }
                return RuntimeSlice.literal<RuntimeSlice<gostring>>([componentGroups.get(0).slice(0, lastCommonIndex, null)]);
            }
        }
    }
    return RuntimeSlice.literal<RuntimeSlice<gostring>>([componentGroups.get(0).slice(0, maxDepth, null)]);
}
export function StartsWithDirectory(fileName: gostring, directoryName: gostring, useCaseSensitiveFileNames: bool): bool {
    if (directoryName === "") {
        return false;
    }
    let canonicalFileName = GetCanonicalFileName(fileName, useCaseSensitiveFileNames);
    let canonicalDirectoryName = GetCanonicalFileName(directoryName, useCaseSensitiveFileNames);
    canonicalDirectoryName = strings__from_gostdlib.TrimSuffix(canonicalDirectoryName, "/");
    canonicalDirectoryName = strings__from_gostdlib.TrimSuffix(canonicalDirectoryName, "\\");
    return strings__from_gostdlib.HasPrefix(canonicalFileName, canonicalDirectoryName + "/") || strings__from_gostdlib.HasPrefix(canonicalFileName, canonicalDirectoryName + "\\");
}
export function CompareNumberOfDirectorySeparators(path1: gostring, path2: gostring): int {
    return Compare$int(globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(path1, "/"))), globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(path2, "/"))));
}
