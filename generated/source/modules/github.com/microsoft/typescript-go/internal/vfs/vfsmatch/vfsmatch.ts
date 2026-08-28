import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FS as FS__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32, int8 } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { CombinePaths as CombinePaths__from_tspath, ComparePathsOptions as ComparePathsOptions__from_tspath, ContainsPath as ContainsPath__from_tspath, FileExtensionIsOneOf as FileExtensionIsOneOf__from_tspath, GetCanonicalFileName as GetCanonicalFileName__from_tspath, GetDirectoryPath as GetDirectoryPath__from_tspath, GetNormalizedPathComponents as GetNormalizedPathComponents__from_tspath, HasExtension as HasExtension__from_tspath, IsRootedDiskPath as IsRootedDiskPath__from_tspath, NormalizePath as NormalizePath__from_tspath, RemoveTrailingDirectorySeparator as RemoveTrailingDirectorySeparator__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { Entries as Entries__from_vfs } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/state.js";
import { Set$Add$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Add.js";
import { Every$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Flatten$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Flatten.js";
import { LastOrNil$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/LastOrNil.js";
import { SortStableFunc$SliceOf_string$string } from "../../../../../../../support/generics/concretizations/slices/SortStableFunc.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../support/maps.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export type Usage = int8;
export function UsageFiles$constant(): Usage {
    return 0;
}
export function UsageDirectories$constant(): Usage {
    return 1;
}
export function UsageExclude$constant(): Usage {
    return 2;
}
export const UnlimitedDepth$int: int = 9223372036854776000;
export function ReadDirectory(host: FS__from_vfs | undefined, currentDir: gostring, path: gostring, extensions: RuntimeSlice<gostring>, excludes: RuntimeSlice<gostring>, includes: RuntimeSlice<gostring>, depth: int): RuntimeSlice<gostring> {
    const __gotots_argument_0 = path;
    const __gotots_argument_1 = extensions;
    const __gotots_argument_2 = excludes;
    const __gotots_argument_3 = includes;
    const __gotots_receiver_0 = host;
    const __gotots_argument_4 = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_0).UseCaseSensitiveFileNames();
    const __gotots_argument_5 = currentDir;
    const __gotots_argument_6 = depth;
    const __gotots_argument_7 = host;
    return matchFiles(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7);
}
export function IsImplicitGlob(lastPathComponent: gostring): bool {
    return !strings__from_gostdlib.ContainsAny(lastPathComponent, ".*?");
}
export function getIncludeBasePath(absolute: gostring): gostring {
    const __gotots_argument_11 = absolute;
    const __gotots_conversion_0 = $state.wildcardCharCodes;
    let __gotots_conversion_1 = "";
    for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
        __gotots_conversion_1 += goStringEncodeRune(__gotots_conversion_0.get(__gotots_conversion_2));
    }
    const __gotots_argument_12 = __gotots_conversion_1;
    let wildcardOffset = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexAny(__gotots_argument_11, __gotots_argument_12)));
    if (wildcardOffset < 0) {
        if (!HasExtension__from_tspath(absolute)) {
            return absolute;
        }
        else {
            return RemoveTrailingDirectorySeparator__from_tspath(GetDirectoryPath__from_tspath(absolute));
        }
    }
    return goStringSlice(absolute, 0, globalThis.Math.max(globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.LastIndex(goStringSlice(absolute, 0, wildcardOffset), "/"))), 0));
}
export function getBasePaths(path: gostring, includes: RuntimeSlice<gostring>, useCaseSensitiveFileNames: bool): RuntimeSlice<gostring> {
    let basePaths = RuntimeSlice.literal<gostring>([path]);
    if (includes.length > 0) {
        let comparePathsOptions = new ComparePathsOptions__from_tspath(useCaseSensitiveFileNames, path);
        let stringComparer: (($0: gostring, $1: gostring) => int) | undefined = comparePathsOptions.GetComparer();
        let includeBasePaths = RuntimeSlice.literal<gostring>([]);
        const __gotots_range_7 = includes;
        for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
            const __gotots_range_value_7 = __gotots_range_7.get(__gotots_range_index_7);
            let include = __gotots_range_value_7;
            let absolute = "";
            if (IsRootedDiskPath__from_tspath(include)) {
                absolute = include;
            }
            else {
                absolute = NormalizePath__from_tspath(CombinePaths__from_tspath(path, RuntimeSlice.literal<gostring>([include])));
            }
            includeBasePaths = includeBasePaths.append("", [getIncludeBasePath(absolute)]);
        }
        SortStableFunc$SliceOf_string$string(includeBasePaths, stringComparer);
        const __gotots_range_8 = includeBasePaths;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_8 = __gotots_range_8.get(__gotots_range_index_8);
            let includeBasePath = __gotots_range_value_8;
            if (Every$string(basePaths, (basepath: gostring): bool => {
                return !ContainsPath__from_tspath(basepath, includeBasePath, ComparePathsOptions__from_tspath.$copy(comparePathsOptions));
            })) {
                basePaths = basePaths.append("", [includeBasePath]);
            }
        }
    }
    return basePaths;
}
export type globPattern$Storage = {
    components: RuntimeSlice<component$Storage>;
    isExclude: bool;
    caseSensitive: bool;
    excludeMinJs: bool;
};
export class globPattern {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: globPattern$Storage) {
    }
    public static $storageOf($source: globPattern): globPattern$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: globPattern$Storage): globPattern {
        return new globPattern($source);
    }
    public get components(): RuntimeSlice<component$Storage> {
        return this.$storage.components;
    }
    public set components($value: RuntimeSlice<component$Storage>) {
        this.$storage.components = $value;
    }
    public get isExclude(): bool {
        return this.$storage.isExclude;
    }
    public set isExclude($value: bool) {
        this.$storage.isExclude = $value;
    }
    public get caseSensitive(): bool {
        return this.$storage.caseSensitive;
    }
    public set caseSensitive($value: bool) {
        this.$storage.caseSensitive = $value;
    }
    public get excludeMinJs(): bool {
        return this.$storage.excludeMinJs;
    }
    public set excludeMinJs($value: bool) {
        this.$storage.excludeMinJs = $value;
    }
    static $zero(): globPattern {
        return new globPattern({
            components: RuntimeSlice.nil<component$Storage>(),
            isExclude: false,
            caseSensitive: false,
            excludeMinJs: false
        });
    }
    static $copy($source: globPattern): globPattern {
        return new globPattern({
            components: $source.$storage.components,
            isExclude: $source.$storage.isExclude,
            caseSensitive: $source.$storage.caseSensitive,
            excludeMinJs: $source.$storage.excludeMinJs
        });
    }
    declare private readonly then?: never;
    static $go$private$vfsmatch$hasMinJsSuffix(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, filename: gostring): bool {
        if (globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).caseSensitive) {
            return strings__from_gostdlib.HasSuffix(filename, ".min.js");
        }
        const minJs$string: gostring = ".min.js";
        if (filename.length < 7) {
            return false;
        }
        return strings__from_gostdlib.EqualFold(goStringSlice(filename, filename.length - 7), minJs$string);
    }
    static $go$private$vfsmatch$matchPathParts(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, prefix: gostring, suffix: gostring, pathOffset: int, compIdx: int, prefixOnly: bool): bool {
        for (;;) {
            const __gotots_results_1 = nextPathPartParts(prefix, suffix, pathOffset);
            let pathPart = __gotots_results_1[0];
            let nextOffset = __gotots_results_1[1];
            let ok = __gotots_results_1[2];
            if (!ok) {
                if (prefixOnly) {
                    return true;
                }
                return globPattern.$go$private$vfsmatch$patternSatisfied(p, compIdx);
            }
            if (compIdx >= globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).components.length) {
                return globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).isExclude && !prefixOnly;
            }
            let comp = component.$copy(component.$fromStorage(globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).components.get(compIdx)));
            switch (((void componentKind,
                component.$storageOf(comp).kind) as int)) {
                case 2: {
                    if (globPattern.$go$private$vfsmatch$matchPathParts(p, prefix, suffix, pathOffset, compIdx + 1, prefixOnly)) {
                        return true;
                    }
                    if (!globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).isExclude && (isHiddenPath(pathPart) || isPackageFolder(pathPart))) {
                        return false;
                    }
                    pathOffset = nextOffset;
                    continue;
                    break;
                }
                case 0: {
                    if (component.$storageOf(comp).skipPackageFolders && isPackageFolder(pathPart)) {
                        const __gotots_argument_8 = new GoInterfaceAdapter("unreachable: literal components never have skipPackageFolders");
                        GoPanic.raise(__gotots_argument_8 === undefined ? GoPanicNilValue.create() : __gotots_argument_8);
                    }
                    if (!globPattern.$go$private$vfsmatch$stringsEqual(p, component.$storageOf(comp).literal, pathPart)) {
                        return false;
                    }
                    break;
                }
                case 1: {
                    if (component.$storageOf(comp).skipPackageFolders && isPackageFolder(pathPart)) {
                        return false;
                    }
                    if (!globPattern.$go$private$vfsmatch$matchWildcard(p, component.$storageOf(comp).segments, pathPart)) {
                        return false;
                    }
                    break;
                }
            }
            pathOffset = nextOffset;
            compIdx++;
        }
    }
    static $go$private$vfsmatch$matchSegments(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, segs: RuntimeSlice<segment$Storage>, s: gostring): bool {
        const __gotots_assign_0 = 0;
        const __gotots_assign_1 = 0;
        let segIdx = __gotots_assign_0;
        let sIdx = __gotots_assign_1;
        const __gotots_assign_2 = -1;
        const __gotots_assign_3 = 0;
        let starSegIdx = __gotots_assign_2;
        let starSIdx = __gotots_assign_3;
        for (; sIdx < s.length;) {
            if (segIdx < segs.length) {
                let seg = segment.$copy(segment.$fromStorage(segs.get(segIdx)));
                switch (((void segmentKind,
                    segment.$storageOf(seg).kind) as int)) {
                    case 0: {
                        let end = sIdx + segment.$storageOf(seg).literal.length;
                        if (end <= s.length && globPattern.$go$private$vfsmatch$stringsEqual(p, segment.$storageOf(seg).literal, goStringSlice(s, sIdx, end))) {
                            sIdx = end;
                            segIdx++;
                            continue;
                        }
                        break;
                    }
                    case 2: {
                        if (goStringIndex(s, sIdx) !== 47) {
                            const __gotots_results_6 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(s, sIdx));
                            const __gotots_results_7 = [__gotots_results_6[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_6[1]))] satisfies [
                                int32,
                                int
                            ];
                            let size = __gotots_results_7[1];
                            sIdx += size;
                            segIdx++;
                            continue;
                        }
                        break;
                    }
                    case 1: {
                        starSegIdx = segIdx;
                        starSIdx = sIdx;
                        segIdx++;
                        continue;
                        break;
                    }
                }
            }
            if (starSegIdx >= 0 && starSIdx < s.length && goStringIndex(s, starSIdx) !== 47) {
                const __gotots_results_8 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(s, starSIdx));
                const __gotots_results_9 = [__gotots_results_8[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_8[1]))] satisfies [
                    int32,
                    int
                ];
                let size = __gotots_results_9[1];
                starSIdx += size;
                sIdx = starSIdx;
                segIdx = starSegIdx + 1;
                continue;
            }
            return false;
        }
        for (; segIdx < segs.length && ((void segmentKind,
            (void segment.$storageOf, (void segment.$fromStorage,
                segs.get(segIdx))).kind) as int)
            === segStar$constant().$value;) {
            segIdx++;
        }
        return segIdx >= segs.length;
    }
    static $go$private$vfsmatch$matchWildcard(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, segs: RuntimeSlice<segment$Storage>, s: gostring): bool {
        if (!globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).isExclude && segs.length > 0 && isHiddenPath(s) && (((void segmentKind,
            (void segment.$storageOf, (void segment.$fromStorage,
                segs.get(0))).kind) as int)
            === segStar$constant().$value || ((void segmentKind,
            (void segment.$storageOf, (void segment.$fromStorage,
                segs.get(0))).kind) as int)
            === segQuestion$constant().$value)) {
            return false;
        }
        if (segs.length === 2 && ((void segmentKind,
            (void segment.$storageOf, (void segment.$fromStorage,
                segs.get(0))).kind) as int)
            === segStar$constant().$value && ((void segmentKind,
            (void segment.$storageOf, (void segment.$fromStorage,
                segs.get(1))).kind) as int)
            === segLiteral$constant().$value) {
            let suffix = (void segment.$storageOf, (void segment.$fromStorage,
                segs.get(1))).literal;
            if (s.length < suffix.length || !globPattern.$go$private$vfsmatch$stringsEqual(p, suffix, goStringSlice(s, s.length - suffix.length))) {
                return false;
            }
            return globPattern.$go$private$vfsmatch$shouldIncludeMinJs(p, s, segs);
        }
        return globPattern.$go$private$vfsmatch$matchSegments(p, segs, s) && globPattern.$go$private$vfsmatch$shouldIncludeMinJs(p, s, segs);
    }
    static $go$private$vfsmatch$matches(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, path: gostring): bool {
        return globPattern.$go$private$vfsmatch$matchPathParts(p, path, "", 0, 0, false);
    }
    static $go$private$vfsmatch$matchesParts(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, prefix: gostring, suffix: gostring): bool {
        return globPattern.$go$private$vfsmatch$matchPathParts(p, prefix, suffix, 0, 0, false);
    }
    static $go$private$vfsmatch$matchesPrefixParts(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, prefix: gostring, suffix: gostring): bool {
        return globPattern.$go$private$vfsmatch$matchPathParts(p, prefix, suffix, 0, 0, true);
    }
    static $go$private$vfsmatch$patternMentionsMinSuffix(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, segs: RuntimeSlice<segment$Storage>): bool {
        const __gotots_range_18 = segs;
        for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_18.length; __gotots_range_index_18++) {
            const __gotots_range_value_18 = segment.$copy(segment.$fromStorage(__gotots_range_18.get(__gotots_range_index_18)));
            let seg = __gotots_range_value_18;
            if (!(((void segmentKind,
                segment.$storageOf(seg).kind) as int)
                === segLiteral$constant().$value)) {
                continue;
            }
            let lit = segment.$storageOf(seg).literal;
            if (!globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).caseSensitive) {
                lit = strings__from_gostdlib.ToLower(lit);
            }
            if (strings__from_gostdlib.Contains(lit, ".min.js") || strings__from_gostdlib.Contains(lit, ".min.")) {
                return true;
            }
        }
        return false;
    }
    static $go$private$vfsmatch$patternSatisfied(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, compIdx: int): bool {
        const __gotots_range_13 = globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).components.slice(compIdx, null, null);
        for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
            const __gotots_range_value_13 = component.$copy(component.$fromStorage(__gotots_range_13.get(__gotots_range_index_13)));
            let c = __gotots_range_value_13;
            if (!(((void componentKind,
                component.$storageOf(c).kind) as int)
                === kindDoubleAsterisk$constant().$value)) {
                return false;
            }
        }
        return true;
    }
    static $go$private$vfsmatch$shouldIncludeMinJs(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, filename: gostring, segs: RuntimeSlice<segment$Storage>): bool {
        if (!globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).excludeMinJs) {
            return true;
        }
        if (!globPattern.$go$private$vfsmatch$hasMinJsSuffix(p, filename)) {
            return true;
        }
        if (globPattern.$go$private$vfsmatch$patternMentionsMinSuffix(p, segs)) {
            return true;
        }
        return false;
    }
    static $go$private$vfsmatch$stringsEqual(p: tsonicTypeScriptRuntime.Location<globPattern> | undefined, a: gostring, b: gostring): bool {
        if (globPattern.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<globPattern>).value).caseSensitive) {
            return a === b;
        }
        return strings__from_gostdlib.EqualFold(a, b);
    }
}
export type component$Storage = {
    kind: int;
    literal: gostring;
    segments: RuntimeSlice<segment$Storage>;
    skipPackageFolders: bool;
};
export class component {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: component$Storage) {
    }
    public static $storageOf($source: component): component$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: component$Storage): component {
        return new component($source);
    }
    public get kind(): componentKind {
        return new componentKind(this.$storage.kind);
    }
    public set kind($value: componentKind) {
        this.$storage.kind = $value.$value;
    }
    public get literal(): gostring {
        return this.$storage.literal;
    }
    public set literal($value: gostring) {
        this.$storage.literal = $value;
    }
    public get segments(): RuntimeSlice<segment$Storage> {
        return this.$storage.segments;
    }
    public set segments($value: RuntimeSlice<segment$Storage>) {
        this.$storage.segments = $value;
    }
    public get skipPackageFolders(): bool {
        return this.$storage.skipPackageFolders;
    }
    public set skipPackageFolders($value: bool) {
        this.$storage.skipPackageFolders = $value;
    }
    static $zero(): component {
        return new component({
            kind: ((void componentKind,
                0) as int),
            literal: "",
            segments: RuntimeSlice.nil<segment$Storage>(),
            skipPackageFolders: false
        });
    }
    static $copy($source: component): component {
        return new component({
            kind: ((void componentKind,
                $source.$storage.kind) as int),
            literal: $source.$storage.literal,
            segments: $source.$storage.segments,
            skipPackageFolders: $source.$storage.skipPackageFolders
        });
    }
    declare private readonly then?: never;
}
export class componentKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function kindLiteral$constant(): componentKind {
    return new componentKind(0);
}
export function kindWildcard$constant(): componentKind {
    return new componentKind(1);
}
export function kindDoubleAsterisk$constant(): componentKind {
    return new componentKind(2);
}
export type segment$Storage = {
    kind: int;
    literal: gostring;
};
export class segment {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: segment$Storage) {
    }
    public static $storageOf($source: segment): segment$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: segment$Storage): segment {
        return new segment($source);
    }
    public get kind(): segmentKind {
        return new segmentKind(this.$storage.kind);
    }
    public set kind($value: segmentKind) {
        this.$storage.kind = $value.$value;
    }
    public get literal(): gostring {
        return this.$storage.literal;
    }
    public set literal($value: gostring) {
        this.$storage.literal = $value;
    }
    static $zero(): segment {
        return new segment({
            kind: ((void segmentKind,
                0) as int),
            literal: ""
        });
    }
    static $copy($source: segment): segment {
        return new segment({
            kind: ((void segmentKind,
                $source.$storage.kind) as int),
            literal: $source.$storage.literal
        });
    }
    declare private readonly then?: never;
}
export class segmentKind {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function segLiteral$constant(): segmentKind {
    return new segmentKind(0);
}
export function segStar$constant(): segmentKind {
    return new segmentKind(1);
}
export function segQuestion$constant(): segmentKind {
    return new segmentKind(2);
}
export function compileGlobPattern(spec: gostring, basePath: gostring, usage: Usage, caseSensitive: bool): [
    globPattern,
    bool
] {
    let parts = GetNormalizedPathComponents__from_tspath(spec, basePath);
    if (!(usage === UsageExclude$constant()) && LastOrNil$string(parts) === "**") {
        return [globPattern.$fromStorage({
                components: RuntimeSlice.nil<component$Storage>(),
                isExclude: false,
                caseSensitive: false,
                excludeMinJs: false
            }), false];
    }
    parts.set(0, RemoveTrailingDirectorySeparator__from_tspath(parts.get(0)));
    if (IsImplicitGlob(LastOrNil$string(parts))) {
        parts = parts.append("", ["**", "*"]);
    }
    const __gotots_field_0 = usage === UsageExclude$constant();
    const __gotots_field_1 = caseSensitive;
    const __gotots_field_2 = usage === UsageFiles$constant();
    const __gotots_slice_build_6 = goSliceAllocate<component$Storage>(0, parts.length);
    for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_6.capacity; __gotots_slice_build_7++) {
        __gotots_slice_build_6.$initialize(__gotots_slice_build_7, component.$storageOf(component.$zero()));
    }
    const __gotots_field_3 = __gotots_slice_build_6;
    let p = globPattern.$fromStorage({
        isExclude: __gotots_field_0,
        caseSensitive: __gotots_field_1,
        excludeMinJs: __gotots_field_2,
        components: __gotots_field_3
    });
    const __gotots_range_3 = parts;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let part = __gotots_range_value_3;
        const __gotots_slice_build_8 = globPattern.$storageOf(p).components;
        const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
        let __gotots_slice_build_9 = __gotots_slice_build_8;
        if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
            __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
            __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, component.$storageOf(parseComponent(part, !(usage === UsageExclude$constant()))));
        }
        else {
            __gotots_slice_build_9 = goSliceAllocate<component$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
            for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                __gotots_slice_build_9.set(__gotots_slice_build_11, component.$storageOf(component.$copy(component.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
            }
            __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, component.$storageOf(parseComponent(part, !(usage === UsageExclude$constant()))));
            for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                __gotots_slice_build_9.$initialize(__gotots_slice_build_11, component.$storageOf(component.$zero()));
            }
        }
        globPattern.$storageOf(p).components = __gotots_slice_build_9;
    }
    return [globPattern.$copy(p), true];
}
export function parseComponent(s: gostring, isInclude: bool): component {
    if (s === "**") {
        return component.$fromStorage({
            kind: kindDoubleAsterisk$constant().$value,
            literal: "",
            segments: RuntimeSlice.nil<segment$Storage>(),
            skipPackageFolders: false
        });
    }
    if (!strings__from_gostdlib.ContainsAny(s, "*?")) {
        return component.$fromStorage({
            kind: kindLiteral$constant().$value,
            literal: s,
            segments: RuntimeSlice.nil<segment$Storage>(),
            skipPackageFolders: false
        });
    }
    return component.$fromStorage({
        kind: kindWildcard$constant().$value,
        segments: parseSegments(s),
        skipPackageFolders: isInclude,
        literal: ""
    });
}
export function parseSegments(s: gostring): RuntimeSlice<segment$Storage> {
    let wildcards = 0;
    const __gotots_range_11 = s.length;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11; __gotots_range_index_11++) {
        const __gotots_range_value_11 = __gotots_range_index_11;
        let i = __gotots_range_value_11;
        if (goStringIndex(s, i) === 42 || goStringIndex(s, i) === 63) {
            wildcards++;
        }
    }
    const __gotots_slice_build_24 = goSliceAllocate<segment$Storage>(0, 2 * wildcards + 1);
    for (let __gotots_slice_build_25 = 0; __gotots_slice_build_25 < __gotots_slice_build_24.capacity; __gotots_slice_build_25++) {
        __gotots_slice_build_24.$initialize(__gotots_slice_build_25, segment.$storageOf(segment.$zero()));
    }
    let result = __gotots_slice_build_24;
    let start = 0;
    const __gotots_range_12 = s.length;
    for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12; __gotots_range_index_12++) {
        const __gotots_range_value_12 = __gotots_range_index_12;
        let i = __gotots_range_value_12;
        switch (goStringIndex(s, i)) {
            case 42:
            case 63: {
                if (i > start) {
                    const __gotots_slice_build_26 = result;
                    const __gotots_slice_build_28 = __gotots_slice_build_26.length + 1;
                    let __gotots_slice_build_27 = __gotots_slice_build_26;
                    if (__gotots_slice_build_28 <= __gotots_slice_build_26.capacity) {
                        __gotots_slice_build_27 = __gotots_slice_build_26.$withLength(__gotots_slice_build_28);
                        __gotots_slice_build_27.set(__gotots_slice_build_26.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                            {
                                kind: segLiteral$constant().$value,
                                literal: goStringSlice(s, start, i)
                            })));
                    }
                    else {
                        __gotots_slice_build_27 = goSliceAllocate<segment$Storage>(__gotots_slice_build_28, RuntimeSlice.$grownCapacity(__gotots_slice_build_26.capacity, __gotots_slice_build_28));
                        for (let __gotots_slice_build_29 = 0; __gotots_slice_build_29 < __gotots_slice_build_26.length; __gotots_slice_build_29++) {
                            __gotots_slice_build_27.set(__gotots_slice_build_29, segment.$storageOf(segment.$copy(segment.$fromStorage(__gotots_slice_build_26.get(__gotots_slice_build_29)))));
                        }
                        __gotots_slice_build_27.set(__gotots_slice_build_26.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                            {
                                kind: segLiteral$constant().$value,
                                literal: goStringSlice(s, start, i)
                            })));
                        for (let __gotots_slice_build_29 = __gotots_slice_build_28; __gotots_slice_build_29 < __gotots_slice_build_27.capacity; __gotots_slice_build_29++) {
                            __gotots_slice_build_27.$initialize(__gotots_slice_build_29, segment.$storageOf(segment.$zero()));
                        }
                    }
                    result = __gotots_slice_build_27;
                }
                if (goStringIndex(s, i) === 42) {
                    const __gotots_slice_build_30 = result;
                    const __gotots_slice_build_32 = __gotots_slice_build_30.length + 1;
                    let __gotots_slice_build_31 = __gotots_slice_build_30;
                    if (__gotots_slice_build_32 <= __gotots_slice_build_30.capacity) {
                        __gotots_slice_build_31 = __gotots_slice_build_30.$withLength(__gotots_slice_build_32);
                        __gotots_slice_build_31.set(__gotots_slice_build_30.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                            {
                                kind: segStar$constant().$value,
                                literal: ""
                            })));
                    }
                    else {
                        __gotots_slice_build_31 = goSliceAllocate<segment$Storage>(__gotots_slice_build_32, RuntimeSlice.$grownCapacity(__gotots_slice_build_30.capacity, __gotots_slice_build_32));
                        for (let __gotots_slice_build_33 = 0; __gotots_slice_build_33 < __gotots_slice_build_30.length; __gotots_slice_build_33++) {
                            __gotots_slice_build_31.set(__gotots_slice_build_33, segment.$storageOf(segment.$copy(segment.$fromStorage(__gotots_slice_build_30.get(__gotots_slice_build_33)))));
                        }
                        __gotots_slice_build_31.set(__gotots_slice_build_30.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                            {
                                kind: segStar$constant().$value,
                                literal: ""
                            })));
                        for (let __gotots_slice_build_33 = __gotots_slice_build_32; __gotots_slice_build_33 < __gotots_slice_build_31.capacity; __gotots_slice_build_33++) {
                            __gotots_slice_build_31.$initialize(__gotots_slice_build_33, segment.$storageOf(segment.$zero()));
                        }
                    }
                    result = __gotots_slice_build_31;
                }
                else {
                    const __gotots_slice_build_34 = result;
                    const __gotots_slice_build_36 = __gotots_slice_build_34.length + 1;
                    let __gotots_slice_build_35 = __gotots_slice_build_34;
                    if (__gotots_slice_build_36 <= __gotots_slice_build_34.capacity) {
                        __gotots_slice_build_35 = __gotots_slice_build_34.$withLength(__gotots_slice_build_36);
                        __gotots_slice_build_35.set(__gotots_slice_build_34.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                            {
                                kind: segQuestion$constant().$value,
                                literal: ""
                            })));
                    }
                    else {
                        __gotots_slice_build_35 = goSliceAllocate<segment$Storage>(__gotots_slice_build_36, RuntimeSlice.$grownCapacity(__gotots_slice_build_34.capacity, __gotots_slice_build_36));
                        for (let __gotots_slice_build_37 = 0; __gotots_slice_build_37 < __gotots_slice_build_34.length; __gotots_slice_build_37++) {
                            __gotots_slice_build_35.set(__gotots_slice_build_37, segment.$storageOf(segment.$copy(segment.$fromStorage(__gotots_slice_build_34.get(__gotots_slice_build_37)))));
                        }
                        __gotots_slice_build_35.set(__gotots_slice_build_34.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                            {
                                kind: segQuestion$constant().$value,
                                literal: ""
                            })));
                        for (let __gotots_slice_build_37 = __gotots_slice_build_36; __gotots_slice_build_37 < __gotots_slice_build_35.capacity; __gotots_slice_build_37++) {
                            __gotots_slice_build_35.$initialize(__gotots_slice_build_37, segment.$storageOf(segment.$zero()));
                        }
                    }
                    result = __gotots_slice_build_35;
                }
                start = i + 1;
                break;
            }
        }
    }
    if (start < s.length) {
        const __gotots_slice_build_38 = result;
        const __gotots_slice_build_40 = __gotots_slice_build_38.length + 1;
        let __gotots_slice_build_39 = __gotots_slice_build_38;
        if (__gotots_slice_build_40 <= __gotots_slice_build_38.capacity) {
            __gotots_slice_build_39 = __gotots_slice_build_38.$withLength(__gotots_slice_build_40);
            __gotots_slice_build_39.set(__gotots_slice_build_38.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                {
                    kind: segLiteral$constant().$value,
                    literal: goStringSlice(s, start)
                })));
        }
        else {
            __gotots_slice_build_39 = goSliceAllocate<segment$Storage>(__gotots_slice_build_40, RuntimeSlice.$grownCapacity(__gotots_slice_build_38.capacity, __gotots_slice_build_40));
            for (let __gotots_slice_build_41 = 0; __gotots_slice_build_41 < __gotots_slice_build_38.length; __gotots_slice_build_41++) {
                __gotots_slice_build_39.set(__gotots_slice_build_41, segment.$storageOf(segment.$copy(segment.$fromStorage(__gotots_slice_build_38.get(__gotots_slice_build_41)))));
            }
            __gotots_slice_build_39.set(__gotots_slice_build_38.length + 0, (void segment.$storageOf, (void segment.$fromStorage,
                {
                    kind: segLiteral$constant().$value,
                    literal: goStringSlice(s, start)
                })));
            for (let __gotots_slice_build_41 = __gotots_slice_build_40; __gotots_slice_build_41 < __gotots_slice_build_39.capacity; __gotots_slice_build_41++) {
                __gotots_slice_build_39.$initialize(__gotots_slice_build_41, segment.$storageOf(segment.$zero()));
            }
        }
        result = __gotots_slice_build_39;
    }
    return result;
}
export function nextPathPartSingle(s: gostring, offset: int): [
    gostring,
    int,
    bool
] {
    let part: gostring = "";
    let nextOffset: int = 0;
    let ok: bool = false;
    if (offset >= s.length) {
        return ["", offset, false];
    }
    if (offset === 0 && s.length > 0 && goStringIndex(s, 0) === 47) {
        return ["", 1, true];
    }
    for (; offset < s.length && goStringIndex(s, offset) === 47;) {
        offset++;
    }
    if (offset >= s.length) {
        return ["", offset, false];
    }
    let rest = goStringSlice(s, offset);
    {
        let idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(rest, 47)));
        if (idx >= 0) {
            return [goStringSlice(rest, 0, idx), offset + idx, true];
        }
    }
    return [rest, s.length, true];
}
export function nextPathPartParts(prefix: gostring, suffix: gostring, offset: int): [
    gostring,
    int,
    bool
] {
    let part: gostring = "";
    let nextOffset: int = 0;
    let ok: bool = false;
    if (suffix.length === 0) {
        return nextPathPartSingle(prefix, offset);
    }
    if (prefix.length === 0) {
        return nextPathPartSingle(suffix, offset);
    }
    let totalLen = prefix.length + suffix.length;
    if (offset >= totalLen) {
        return ["", offset, false];
    }
    if (offset === 0 && goStringIndex(prefix, 0) === 47) {
        return ["", 1, true];
    }
    if (offset < prefix.length) {
        for (; offset < prefix.length && goStringIndex(prefix, offset) === 47;) {
            offset++;
        }
        if (offset < prefix.length) {
            let rest = goStringSlice(prefix, offset);
            let idx = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(rest, 47)));
            return [goStringSlice(rest, 0, idx), offset + idx, true];
        }
    }
    let sOff = offset - prefix.length;
    if (sOff >= suffix.length) {
        return ["", offset, false];
    }
    return [goStringSlice(suffix, sOff), totalLen, true];
}
export function isHiddenPath(name: gostring): bool {
    return name.length > 0 && goStringIndex(name, 0) === 46;
}
export function isPackageFolder(name: gostring): bool {
    switch (name.length) {
        case 12: {
            return strings__from_gostdlib.EqualFold(name, "node_modules");
            break;
        }
        case 13: {
            return strings__from_gostdlib.EqualFold(name, "jspm_packages");
            break;
        }
        case 16: {
            return strings__from_gostdlib.EqualFold(name, "bower_components");
            break;
        }
    }
    return false;
}
export function ensureTrailingSlash(s: gostring): gostring {
    if (s.length > 0 && goStringIndex(s, s.length - 1) !== 47) {
        return s + "/";
    }
    return s;
}
export class globMatcher {
    declare private readonly $goType: void;
    public constructor(public includes: RuntimeSlice<globPattern$Storage>, public excludes: RuntimeSlice<globPattern$Storage>, public hadIncludes: bool) {
    }
    declare private readonly then?: never;
    static $go$private$vfsmatch$matchesDirectoryParts(m: globMatcher | undefined, prefix: gostring, suffix: gostring): bool {
        const __gotots_range_16 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).excludes;
        for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_16.length; __gotots_range_index_16++) {
            const __gotots_range_value_16 = __gotots_range_index_16;
            let i = __gotots_range_value_16;
            if (globPattern.$go$private$vfsmatch$matchesParts(tsonicTypeScriptRuntime.projectLocation<globPattern$Storage, globPattern>(goSliceAddress<globPattern$Storage>((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).excludes, i), globPattern.$fromStorage, globPattern.$storageOf), prefix, suffix)) {
                return false;
            }
        }
        if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes.length === 0) {
            return !(m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hadIncludes;
        }
        const __gotots_range_17 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes;
        for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_17.length; __gotots_range_index_17++) {
            const __gotots_range_value_17 = __gotots_range_index_17;
            let i = __gotots_range_value_17;
            if (globPattern.$go$private$vfsmatch$matchesPrefixParts(tsonicTypeScriptRuntime.projectLocation<globPattern$Storage, globPattern>(goSliceAddress<globPattern$Storage>((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes, i), globPattern.$fromStorage, globPattern.$storageOf), prefix, suffix)) {
                return true;
            }
        }
        return false;
    }
    static $go$private$vfsmatch$matchesFileParts(m: globMatcher | undefined, prefix: gostring, suffix: gostring): [
        int,
        bool
    ] {
        const __gotots_range_14 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).excludes;
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
            const __gotots_range_value_14 = __gotots_range_index_14;
            let i = __gotots_range_value_14;
            if (globPattern.$go$private$vfsmatch$matchesParts(tsonicTypeScriptRuntime.projectLocation<globPattern$Storage, globPattern>(goSliceAddress<globPattern$Storage>((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).excludes, i), globPattern.$fromStorage, globPattern.$storageOf), prefix, suffix)) {
                return [0, false];
            }
        }
        if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes.length === 0) {
            if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).hadIncludes) {
                return [0, false];
            }
            return [0, true];
        }
        const __gotots_range_15 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes;
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15.length; __gotots_range_index_15++) {
            const __gotots_range_value_15 = __gotots_range_index_15;
            let i = __gotots_range_value_15;
            if (globPattern.$go$private$vfsmatch$matchesParts(tsonicTypeScriptRuntime.projectLocation<globPattern$Storage, globPattern>(goSliceAddress<globPattern$Storage>((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes, i), globPattern.$fromStorage, globPattern.$storageOf), prefix, suffix)) {
                return [i, true];
            }
        }
        return [0, false];
    }
}
export function newGlobMatcher(includeSpecs: RuntimeSlice<gostring>, excludeSpecs: RuntimeSlice<gostring>, basePath: gostring, caseSensitive: bool, usage: Usage): globMatcher | undefined {
    const __gotots_field_4 = includeSpecs.length > 0;
    const __gotots_slice_build_12 = goSliceAllocate<globPattern$Storage>(0, includeSpecs.length);
    for (let __gotots_slice_build_13 = 0; __gotots_slice_build_13 < __gotots_slice_build_12.capacity; __gotots_slice_build_13++) {
        __gotots_slice_build_12.$initialize(__gotots_slice_build_13, globPattern.$storageOf(globPattern.$zero()));
    }
    const __gotots_field_5 = __gotots_slice_build_12;
    const __gotots_slice_build_14 = goSliceAllocate<globPattern$Storage>(0, excludeSpecs.length);
    for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_14.capacity; __gotots_slice_build_15++) {
        __gotots_slice_build_14.$initialize(__gotots_slice_build_15, globPattern.$storageOf(globPattern.$zero()));
    }
    const __gotots_field_6 = __gotots_slice_build_14;
    let m: globMatcher | undefined = new globMatcher(__gotots_field_5, __gotots_field_6, __gotots_field_4);
    const __gotots_range_5 = includeSpecs;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_5 = __gotots_range_5.get(__gotots_range_index_5);
        let spec = __gotots_range_value_5;
        {
            const __gotots_results_2 = compileGlobPattern(spec, basePath, usage, caseSensitive);
            let p = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok) {
                const __gotots_slice_build_16 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes;
                const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
                let __gotots_slice_build_17 = __gotots_slice_build_16;
                if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
                    __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
                    __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, globPattern.$storageOf(globPattern.$copy(p)));
                }
                else {
                    __gotots_slice_build_17 = goSliceAllocate<globPattern$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
                    for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.set(__gotots_slice_build_19, globPattern.$storageOf(globPattern.$copy(globPattern.$fromStorage(__gotots_slice_build_16.get(__gotots_slice_build_19)))));
                    }
                    __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, globPattern.$storageOf(globPattern.$copy(p)));
                    for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                        __gotots_slice_build_17.$initialize(__gotots_slice_build_19, globPattern.$storageOf(globPattern.$zero()));
                    }
                }
                (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes = __gotots_slice_build_17;
            }
        }
    }
    const __gotots_range_6 = excludeSpecs;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_6 = __gotots_range_6.get(__gotots_range_index_6);
        let spec = __gotots_range_value_6;
        {
            const __gotots_results_3 = compileGlobPattern(spec, basePath, UsageExclude$constant(), caseSensitive);
            let p = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                const __gotots_slice_build_20 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).excludes;
                const __gotots_slice_build_22 = __gotots_slice_build_20.length + 1;
                let __gotots_slice_build_21 = __gotots_slice_build_20;
                if (__gotots_slice_build_22 <= __gotots_slice_build_20.capacity) {
                    __gotots_slice_build_21 = __gotots_slice_build_20.$withLength(__gotots_slice_build_22);
                    __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, globPattern.$storageOf(globPattern.$copy(p)));
                }
                else {
                    __gotots_slice_build_21 = goSliceAllocate<globPattern$Storage>(__gotots_slice_build_22, RuntimeSlice.$grownCapacity(__gotots_slice_build_20.capacity, __gotots_slice_build_22));
                    for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_20.length; __gotots_slice_build_23++) {
                        __gotots_slice_build_21.set(__gotots_slice_build_23, globPattern.$storageOf(globPattern.$copy(globPattern.$fromStorage(__gotots_slice_build_20.get(__gotots_slice_build_23)))));
                    }
                    __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, globPattern.$storageOf(globPattern.$copy(p)));
                    for (let __gotots_slice_build_23 = __gotots_slice_build_22; __gotots_slice_build_23 < __gotots_slice_build_21.capacity; __gotots_slice_build_23++) {
                        __gotots_slice_build_21.$initialize(__gotots_slice_build_23, globPattern.$storageOf(globPattern.$zero()));
                    }
                }
                (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).excludes = __gotots_slice_build_21;
            }
        }
    }
    return m;
}
export class globVisitor {
    declare private readonly $goType: void;
    public constructor(public host: FS__from_vfs | undefined, public fileMatcher: globMatcher | undefined, public directoryMatcher: globMatcher | undefined, public extensions: RuntimeSlice<gostring>, public useCaseSensitiveFileNames: bool, public visited: Set__from_collections<gostring>, public results: RuntimeSlice<RuntimeSlice<gostring>>) {
    }
    declare private readonly then?: never;
    static $go$private$vfsmatch$visit(v: globVisitor | undefined, path: gostring, absolutePath: gostring, depth: int, resolvedRealPath: gostring): void {
        let realPath = "";
        if (resolvedRealPath !== "") {
            realPath = resolvedRealPath;
        }
        else {
            const __gotots_receiver_1 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
            const __gotots_argument_9 = absolutePath;
            realPath = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_1).Realpath(__gotots_argument_9);
        }
        let canonicalPath = GetCanonicalFileName__from_tspath(realPath, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).useCaseSensitiveFileNames);
        const __gotots_store_0 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        if (Set__from_collections.Has<gostring>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "visited"), canonicalPath)) {
            return;
        }
        const __gotots_store_1 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        Set$Add$string(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "visited"), canonicalPath);
        const __gotots_receiver_2 = (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).host;
        const __gotots_argument_10 = absolutePath;
        let entries = goInterfaceNonNil<FS__from_vfs>(__gotots_receiver_2).GetAccessibleEntries(__gotots_argument_10);
        let pathPrefix = ensureTrailingSlash(path);
        let absPrefix = ensureTrailingSlash(absolutePath);
        const __gotots_range_9 = Entries__from_vfs.$storageOf(entries).Files;
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
            const __gotots_range_value_9 = __gotots_range_9.get(__gotots_range_index_9);
            let file = __gotots_range_value_9;
            if ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions.length > 0 && !FileExtensionIsOneOf__from_tspath(file, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).extensions)) {
                continue;
            }
            {
                const __gotots_results_4 = globMatcher.$go$private$vfsmatch$matchesFileParts((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).fileMatcher, absPrefix, file);
                let idx = __gotots_results_4[0];
                let ok = __gotots_results_4[1];
                if (ok) {
                    (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).results.set(idx, (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).results.get(idx).append("", [pathPrefix + file]));
                }
            }
        }
        if (depth !== UnlimitedDepth$int) {
            depth--;
            if (depth === 0) {
                return;
            }
        }
        const __gotots_range_10 = Entries__from_vfs.$storageOf(entries).Directories;
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
            const __gotots_range_value_10 = __gotots_range_10.get(__gotots_range_index_10);
            let dir = __gotots_range_value_10;
            if (!globMatcher.$go$private$vfsmatch$matchesDirectoryParts((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).directoryMatcher, absPrefix, dir)) {
                continue;
            }
            let absDir = absPrefix + dir;
            let childRealPath = "";
            if (!Entries__from_vfs.$storageOf(entries).Symlinks.isNil()) {
                {
                    const __gotots_results_5 = Entries__from_vfs.$storageOf(entries).Symlinks.lookupOk(dir);
                    let isSymlink = __gotots_results_5[1];
                    if (!isSymlink) {
                        childRealPath = CombinePaths__from_tspath(realPath, RuntimeSlice.literal<gostring>([dir]));
                    }
                }
            }
            globVisitor.$go$private$vfsmatch$visit(v, pathPrefix + dir, absDir, depth, childRealPath);
        }
    }
}
export function matchFiles(path: gostring, extensions: RuntimeSlice<gostring>, excludes: RuntimeSlice<gostring>, includes: RuntimeSlice<gostring>, useCaseSensitiveFileNames: bool, currentDirectory: gostring, depth: int, host: FS__from_vfs | undefined): RuntimeSlice<gostring> {
    path = NormalizePath__from_tspath(path);
    currentDirectory = NormalizePath__from_tspath(currentDirectory);
    let absolutePath = CombinePaths__from_tspath(currentDirectory, RuntimeSlice.literal<gostring>([path]));
    let fileMatcher: globMatcher | undefined = newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageFiles$constant());
    let directoryMatcher: globMatcher | undefined = newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageDirectories$constant());
    let v = new globVisitor(host, fileMatcher, directoryMatcher, extensions, useCaseSensitiveFileNames, Set__from_collections.$zero<gostring>((): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.nil();
    }), RuntimeSlice.make<RuntimeSlice<gostring>>(globalThis.Math.max((fileMatcher ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).includes.length, 1), null, RuntimeSlice.nil<gostring>()));
    const __gotots_range_4 = getBasePaths(path, includes, useCaseSensitiveFileNames);
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_4 = __gotots_range_4.get(__gotots_range_index_4);
        let basePath = __gotots_range_value_4;
        globVisitor.$go$private$vfsmatch$visit(v, basePath, CombinePaths__from_tspath(currentDirectory, RuntimeSlice.literal<gostring>([basePath])), depth, "");
    }
    if (v.results.length === 1) {
        return v.results.get(0);
    }
    return Flatten$string(v.results);
}
export class SpecMatcher {
    declare private readonly $goType: void;
    public constructor(public patterns: RuntimeSlice<globPattern$Storage>) {
    }
    declare private readonly then?: never;
    static MatchIndex(m: SpecMatcher | undefined, path: gostring): int {
        const __gotots_range_2 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).patterns;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_index_2;
            let i = __gotots_range_value_2;
            if (globPattern.$go$private$vfsmatch$matches(tsonicTypeScriptRuntime.projectLocation<globPattern$Storage, globPattern>(goSliceAddress<globPattern$Storage>((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).patterns, i), globPattern.$fromStorage, globPattern.$storageOf), path)) {
                return i;
            }
        }
        return -1;
    }
    static MatchString(m: SpecMatcher | undefined, path: gostring): bool {
        const __gotots_range_1 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).patterns;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_index_1;
            let i = __gotots_range_value_1;
            if (globPattern.$go$private$vfsmatch$matches(tsonicTypeScriptRuntime.projectLocation<globPattern$Storage, globPattern>(goSliceAddress<globPattern$Storage>((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).patterns, i), globPattern.$fromStorage, globPattern.$storageOf), path)) {
                return true;
            }
        }
        return false;
    }
}
export function NewSpecMatcher(specs: RuntimeSlice<gostring>, basePath: gostring, usage: Usage, useCaseSensitiveFileNames: bool): SpecMatcher | undefined {
    if (specs.length === 0) {
        return void 0;
    }
    const __gotots_slice_build_0 = goSliceAllocate<globPattern$Storage>(0, specs.length);
    for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
        __gotots_slice_build_0.$initialize(__gotots_slice_build_1, globPattern.$storageOf(globPattern.$zero()));
    }
    let patterns = __gotots_slice_build_0;
    const __gotots_range_0 = specs;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let spec = __gotots_range_value_0;
        {
            const __gotots_results_0 = compileGlobPattern(spec, basePath, usage, useCaseSensitiveFileNames);
            let p = __gotots_results_0[0];
            let ok = __gotots_results_0[1];
            if (ok) {
                const __gotots_slice_build_2 = patterns;
                const __gotots_slice_build_4 = __gotots_slice_build_2.length + 1;
                let __gotots_slice_build_3 = __gotots_slice_build_2;
                if (__gotots_slice_build_4 <= __gotots_slice_build_2.capacity) {
                    __gotots_slice_build_3 = __gotots_slice_build_2.$withLength(__gotots_slice_build_4);
                    __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, globPattern.$storageOf(globPattern.$copy(p)));
                }
                else {
                    __gotots_slice_build_3 = goSliceAllocate<globPattern$Storage>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_2.capacity, __gotots_slice_build_4));
                    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                        __gotots_slice_build_3.set(__gotots_slice_build_5, globPattern.$storageOf(globPattern.$copy(globPattern.$fromStorage(__gotots_slice_build_2.get(__gotots_slice_build_5)))));
                    }
                    __gotots_slice_build_3.set(__gotots_slice_build_2.length + 0, globPattern.$storageOf(globPattern.$copy(p)));
                    for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                        __gotots_slice_build_3.$initialize(__gotots_slice_build_5, globPattern.$storageOf(globPattern.$zero()));
                    }
                }
                patterns = __gotots_slice_build_3;
            }
        }
    }
    if (patterns.length === 0) {
        return void 0;
    }
    return new SpecMatcher(patterns);
}
