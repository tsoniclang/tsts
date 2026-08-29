import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_void, $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { bool, gostring, int, uint32, uint64 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/state.js";
import { Compare$int, Compare$uint32 } from "../../../../../../support/generics/concretizations/cmp/Compare.js";
import { CompareFunc$SliceOf_string$SliceOf_string$string$string } from "../../../../../../support/generics/concretizations/slices/CompareFunc.js";
import { $goInterfaceAdapter$PointerTo_Named_strings$Builder, $goInterfaceAdapter$string, $goInterfaceAdapter$uint32, $goInterfaceAdapter$PointerTo_Named_semver$SemverParseError as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export type Version$Storage = {
    major: uint32;
    minor: uint32;
    patch: uint32;
    prerelease: RuntimeSlice<gostring>;
    build: RuntimeSlice<gostring>;
};
export class Version {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: Version$Storage) {
    }
    public static $storageOf($source: Version): Version$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: Version$Storage): Version {
        return new Version($source);
    }
    public get major(): uint32 {
        return this.$storage.major;
    }
    public set major($value: uint32) {
        this.$storage.major = $value;
    }
    public get minor(): uint32 {
        return this.$storage.minor;
    }
    public set minor($value: uint32) {
        this.$storage.minor = $value;
    }
    public get patch(): uint32 {
        return this.$storage.patch;
    }
    public set patch($value: uint32) {
        this.$storage.patch = $value;
    }
    public get prerelease(): RuntimeSlice<gostring> {
        return this.$storage.prerelease;
    }
    public set prerelease($value: RuntimeSlice<gostring>) {
        this.$storage.prerelease = $value;
    }
    public get build(): RuntimeSlice<gostring> {
        return this.$storage.build;
    }
    public set build($value: RuntimeSlice<gostring>) {
        this.$storage.build = $value;
    }
    static $zero(): Version {
        return new Version({
            major: 0,
            minor: 0,
            patch: 0,
            prerelease: RuntimeSlice.nil<gostring>(),
            build: RuntimeSlice.nil<gostring>()
        });
    }
    static $copy($source: Version): Version {
        return new Version({
            major: $source.$storage.major,
            minor: $source.$storage.minor,
            patch: $source.$storage.patch,
            prerelease: $source.$storage.prerelease,
            build: $source.$storage.build
        });
    }
    static $zeroStorage(): Version$Storage {
        return {
            major: 0,
            minor: 0,
            patch: 0,
            prerelease: RuntimeSlice.nil<gostring>(),
            build: RuntimeSlice.nil<gostring>()
        };
    }
    declare private readonly then?: never;
    static Compare(a: tsonicTypeScriptRuntime.Location<Version> | undefined, b: tsonicTypeScriptRuntime.Location<Version> | undefined): int {
        __gotots_control_target_0: {
            if (tsonicTypeScriptRuntime.sameLocation(a, b)) {
                return comparisonEqualTo$int;
            }
            else if (a === undefined) {
                return comparisonLessThan$int;
            }
            else if (b === undefined) {
                return comparisonGreaterThan$int;
            }
        }
        let r = Compare$uint32(Version.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).major, Version.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).major);
        if (r !== 0) {
            return r;
        }
        r = Compare$uint32(Version.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).minor, Version.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).minor);
        if (r !== 0) {
            return r;
        }
        r = Compare$uint32(Version.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).patch, Version.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).patch);
        if (r !== 0) {
            return r;
        }
        return comparePreReleaseIdentifiers(Version.$storageOf(((a ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).prerelease, Version.$storageOf(((b ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).prerelease);
    }
    static String(v: tsonicTypeScriptRuntime.Location<Version> | undefined): gostring {
        let sb = named_strings.StringsBuilderOperations.$zero();
        const sb$location = tsonicTypeScriptRuntime.boundLocation({}, () => sb, sb$next => sb = sb$next);
        const __gotots_argument_1 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(sb$location);
        const __gotots_argument_2 = "%d.%d.%d";
        const __gotots_argument_3 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$uint32(Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).major), new $goInterfaceAdapter$uint32(Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).minor), new $goInterfaceAdapter$uint32(Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).patch)]);
        provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_1), __gotots_argument_2, __gotots_argument_3);
        if (Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).prerelease.length > 0) {
            const __gotots_argument_4 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(sb$location);
            const __gotots_argument_5 = "-%s";
            const __gotots_argument_6 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Join(Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).prerelease, "."))]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_4), __gotots_argument_5, __gotots_argument_6);
        }
        if (Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).build.length > 0) {
            const __gotots_argument_7 = new $goInterfaceAdapter$PointerTo_Named_strings$Builder(sb$location);
            const __gotots_argument_8 = "+%s";
            const __gotots_argument_9 = RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string(strings__from_gostdlib.Join(Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).build, "."))]);
            provider_fmt_writer.FprintfDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_7), __gotots_argument_8, __gotots_argument_9);
        }
        return strings__from_gostdlib.Builder.String(sb);
    }
    static $go$private$semver$incrementMajor(v: tsonicTypeScriptRuntime.Location<Version> | undefined): Version {
        return Version.$fromStorage({
            major: Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).major + 1,
            minor: 0,
            patch: 0,
            prerelease: RuntimeSlice.nil<gostring>(),
            build: RuntimeSlice.nil<gostring>()
        });
    }
    static $go$private$semver$incrementMinor(v: tsonicTypeScriptRuntime.Location<Version> | undefined): Version {
        return Version.$fromStorage({
            major: Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).major,
            minor: Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).minor + 1,
            patch: 0,
            prerelease: RuntimeSlice.nil<gostring>(),
            build: RuntimeSlice.nil<gostring>()
        });
    }
    static $go$private$semver$incrementPatch(v: tsonicTypeScriptRuntime.Location<Version> | undefined): Version {
        return Version.$fromStorage({
            major: Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).major,
            minor: Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).minor,
            patch: Version.$storageOf(((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Version>).value).patch + 1,
            prerelease: RuntimeSlice.nil<gostring>(),
            build: RuntimeSlice.nil<gostring>()
        });
    }
}
export const comparisonLessThan$int: int = -1;
export const comparisonEqualTo$int: int = 0;
export const comparisonGreaterThan$int: int = 1;
export function comparePreReleaseIdentifiers(left: RuntimeSlice<gostring>, right: RuntimeSlice<gostring>): int {
    if (left.length === 0) {
        if (right.length === 0) {
            return comparisonEqualTo$int;
        }
        return comparisonGreaterThan$int;
    }
    else if (right.length === 0) {
        return comparisonLessThan$int;
    }
    return CompareFunc$SliceOf_string$SliceOf_string$string$string(left, right, comparePreReleaseIdentifier);
}
export function comparePreReleaseIdentifier(left: gostring, right: gostring): int {
    let compareResult = globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(left, right)));
    if (compareResult === 0) {
        return compareResult;
    }
    const __gotots_receiver_0 = $state.numericIdentifierRegExp;
    let leftIsNumeric = regexp__from_gostdlib.Regexp.MatchString(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, left);
    const __gotots_receiver_1 = $state.numericIdentifierRegExp;
    let rightIsNumeric = regexp__from_gostdlib.Regexp.MatchString(__gotots_receiver_1 === void 0 ? void 0 :
        (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, right);
    if (leftIsNumeric || rightIsNumeric) {
        if (!rightIsNumeric) {
            return comparisonLessThan$int;
        }
        if (!leftIsNumeric) {
            return comparisonGreaterThan$int;
        }
        const __gotots_results_2 = getUintComponent(left);
        let leftAsNumber = __gotots_results_2[0];
        let leftErr: GoInterface | undefined = __gotots_results_2[1];
        const __gotots_results_3 = getUintComponent(right);
        let rightAsNumber = __gotots_results_3[0];
        let rightErr: GoInterface | undefined = __gotots_results_3[1];
        if (!(leftErr === undefined) || !(rightErr === undefined)) {
            let leftLen = left.length;
            let rightLen = right.length;
            let lenCompare = Compare$int(leftLen, rightLen);
            if (lenCompare === 0) {
                return compareResult;
            }
            else {
                return lenCompare;
            }
        }
        return Compare$uint32(leftAsNumber, rightAsNumber);
    }
    return compareResult;
}
export class SemverParseError {
    declare private readonly $goType: void;
    public constructor(public origInput: gostring) {
    }
    static $copy($source: SemverParseError): SemverParseError {
        return new SemverParseError($source.origInput);
    }
    static $equal($left: SemverParseError, $right: SemverParseError): bool {
        return $left.origInput === $right.origInput;
    }
    static $hash($source: SemverParseError): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.origInput));
        return $hash;
    }
    declare private readonly then?: never;
    static Error(e: {
        value: SemverParseError;
    } | undefined): gostring {
        return fmt__from_gostdlib.Sprintf("Could not parse version string from %q", RuntimeSlice.literal<$goInterface$Interface_void | undefined>([new $goInterfaceAdapter$string((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.origInput)]));
    }
}
export function TryParseVersion(text: gostring): [
    Version,
    GoInterface | undefined
] {
    let result = Version.$zero();
    const __gotots_receiver_2 = $state.versionRegexp;
    let match = regexp__from_gostdlib.Regexp.FindStringSubmatch(__gotots_receiver_2 === void 0 ? void 0 :
        (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, text);
    if (match.isNil()) {
        return [Version.$copy(result), new GoInterfaceAdapter({ value: new SemverParseError(text) })];
    }
    let majorStr = match.get(1);
    let minorStr = match.get(2);
    let patchStr = match.get(3);
    let prereleaseStr = match.get(4);
    let buildStr = match.get(5);
    let err: GoInterface | undefined = void 0;
    const __gotots_store_0 = Version.$storageOf(result);
    const __gotots_results_5 = getUintComponent(majorStr);
    __gotots_store_0.major = __gotots_results_5[0];
    err = __gotots_results_5[1];
    if (!(err === undefined)) {
        return [Version.$copy(result), err];
    }
    if (minorStr !== "") {
        const __gotots_store_1 = Version.$storageOf(result);
        const __gotots_results_6 = getUintComponent(minorStr);
        __gotots_store_1.minor = __gotots_results_6[0];
        err = __gotots_results_6[1];
        if (!(err === undefined)) {
            return [Version.$copy(result), err];
        }
    }
    if (patchStr !== "") {
        const __gotots_store_2 = Version.$storageOf(result);
        const __gotots_results_7 = getUintComponent(patchStr);
        __gotots_store_2.patch = __gotots_results_7[0];
        err = __gotots_results_7[1];
        if (!(err === undefined)) {
            return [Version.$copy(result), err];
        }
    }
    if (prereleaseStr !== "") {
        const __gotots_receiver_3 = $state.prereleaseRegexp;
        if (!regexp__from_gostdlib.Regexp.MatchString(__gotots_receiver_3 === void 0 ? void 0 :
            (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, prereleaseStr)) {
            return [Version.$copy(result), new GoInterfaceAdapter({ value: new SemverParseError(text) })];
        }
        Version.$storageOf(result).prerelease = strings__from_gostdlib.Split(prereleaseStr, ".");
    }
    if (buildStr !== "") {
        const __gotots_receiver_4 = $state.buildRegExp;
        if (!regexp__from_gostdlib.Regexp.MatchString(__gotots_receiver_4 === void 0 ? void 0 :
            (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, buildStr)) {
            return [Version.$copy(result), new GoInterfaceAdapter({ value: new SemverParseError(text) })];
        }
        Version.$storageOf(result).build = strings__from_gostdlib.Split(buildStr, ".");
    }
    return [Version.$copy(result), void 0];
}
export function MustParse(text: gostring): Version {
    const __gotots_results_4 = TryParseVersion(text);
    let v = __gotots_results_4[0];
    let err: GoInterface | undefined = __gotots_results_4[1];
    if (!(err === undefined)) {
        const __gotots_argument_0 = err;
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    return Version.$copy(v);
}
export function getUintComponent(text: gostring): [
    uint32,
    GoInterface | undefined
] {
    const __gotots_results_0 = strconv__from_gostdlib.ParseUint(text, BigInt.asIntN(64, goNumberToBigInt(10)), BigInt.asIntN(64, goNumberToBigInt(32)));
    const __gotots_results_1 = [__gotots_results_0[0], GoProviderInterfaceBridge.$from(__gotots_results_0[1])] satisfies [
        uint64,
        GoInterface | undefined
    ];
    let r = __gotots_results_1[0];
    let err: GoInterface | undefined = __gotots_results_1[1];
    return [globalThis.Number(BigInt.asUintN(32, r)), err];
}
