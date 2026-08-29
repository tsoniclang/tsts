import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { Version$Storage as Version__from_semver$Storage } from "./version.js";
import type { bool, gostring, uint32 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/semver/state.js";
import { $goInterfaceAdapter$Named_semver$comparatorOperator as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Version, getUintComponent } from "./version.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export class VersionRange {
    declare private readonly $goType: void;
    public constructor(public alternatives: RuntimeSlice<RuntimeSlice<versionComparator$Storage>>) {
    }
    declare private readonly then?: never;
    static Test(v: VersionRange | undefined, version: tsonicTypeScriptRuntime.Location<Version> | undefined): bool {
        return testDisjunction((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).alternatives, version);
    }
}
export type versionComparator$Storage = {
    operator: gostring;
    operand: Version__from_semver$Storage;
};
export class versionComparator {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: versionComparator$Storage) {
    }
    public static $storageOf($source: versionComparator): versionComparator$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: versionComparator$Storage): versionComparator {
        return new versionComparator($source);
    }
    public get operator(): comparatorOperator {
        return new comparatorOperator(this.$storage.operator);
    }
    public set operator($value: comparatorOperator) {
        this.$storage.operator = $value.$value;
    }
    public get operand(): Version {
        return Version.$fromStorage(this.$storage.operand);
    }
    public set operand($value: Version) {
        this.$storage.operand = Version.$storageOf($value);
    }
    static $copy($source: versionComparator): versionComparator {
        return new versionComparator({
            operator: ((void comparatorOperator,
                $source.$storage.operator) as gostring),
            operand: Version.$storageOf(Version.$copy(Version.$fromStorage($source.$storage.operand)))
        });
    }
    static $zeroStorage(): versionComparator$Storage {
        return {
            operator: ((void comparatorOperator,
                "") as gostring),
            operand: Version.$zeroStorage()
        };
    }
    declare private readonly then?: never;
}
export class comparatorOperator {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function rangeLessThan$constant(): comparatorOperator {
    return new comparatorOperator("<");
}
export function rangeLessThanEqual$constant(): comparatorOperator {
    return new comparatorOperator("<=");
}
export function rangeEqual$constant(): comparatorOperator {
    return new comparatorOperator("=");
}
export function rangeGreaterThanEqual$constant(): comparatorOperator {
    return new comparatorOperator(">=");
}
export function rangeGreaterThan$constant(): comparatorOperator {
    return new comparatorOperator(">");
}
export function testDisjunction(alternatives: RuntimeSlice<RuntimeSlice<versionComparator$Storage>>, version: tsonicTypeScriptRuntime.Location<Version> | undefined): bool {
    if (alternatives.length === 0) {
        return true;
    }
    const __gotots_range_2 = alternatives;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let alternative = __gotots_range_value_2;
        if (testAlternative(alternative, version)) {
            return true;
        }
    }
    return false;
}
export function testAlternative(alternative: RuntimeSlice<versionComparator$Storage>, version: tsonicTypeScriptRuntime.Location<Version> | undefined): bool {
    const __gotots_range_3 = alternative;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = versionComparator.$copy(versionComparator.$fromStorage(__gotots_range_3.get(__gotots_range_index_3)));
        let comparator = __gotots_range_value_3;
        if (!testComparator(versionComparator.$copy(comparator), version)) {
            return false;
        }
    }
    return true;
}
export function testComparator(comparator: versionComparator, version: tsonicTypeScriptRuntime.Location<Version> | undefined): bool {
    const __gotots_receiver_5 = version;
    const __gotots_store_5 = versionComparator.$storageOf(comparator);
    const __gotots_argument_1 = tsonicTypeScriptRuntime.projectLocation<Version__from_semver$Storage, Version>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "operand"), Version.$fromStorage, Version.$storageOf);
    let cmp = Version.Compare(__gotots_receiver_5, __gotots_argument_1);
    switch (((void comparatorOperator,
        versionComparator.$storageOf(comparator).operator) as gostring)) {
        case "<": {
            return cmp < 0;
            break;
        }
        case "<=": {
            return cmp <= 0;
            break;
        }
        case "=": {
            return cmp === 0;
            break;
        }
        case ">=": {
            return cmp >= 0;
            break;
        }
        case ">": {
            return cmp > 0;
            break;
        }
        default: {
            const __gotots_argument_2 = new GoInterfaceAdapter(new comparatorOperator("Unexpected operator: " +
                ((void comparatorOperator,
                    versionComparator.$storageOf(comparator).operator) as gostring)));
            GoPanic.raise(__gotots_argument_2 === undefined ? GoPanicNilValue.create() : __gotots_argument_2);
            break;
        }
    }
}
export function TryParseVersionRange(text: gostring): [
    VersionRange,
    bool
] {
    const __gotots_results_0 = parseAlternatives(text);
    let alternatives = __gotots_results_0[0];
    let ok = __gotots_results_0[1];
    return [new VersionRange(alternatives), ok];
}
export function parseAlternatives(text: gostring): [
    RuntimeSlice<RuntimeSlice<versionComparator$Storage>>,
    bool
] {
    let alternatives = RuntimeSlice.nil<RuntimeSlice<versionComparator$Storage>>();
    text = strings__from_gostdlib.TrimSpace(text);
    const __gotots_receiver_0 = $state.logicalOrRegExp;
    let ranges = regexp__from_gostdlib.Regexp.Split(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, text, BigInt.asIntN(64, goNumberToBigInt(-1)));
    const __gotots_range_0 = ranges;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let r = __gotots_range_value_0;
        r = strings__from_gostdlib.TrimSpace(r);
        if (r === "") {
            continue;
        }
        let comparators = RuntimeSlice.nil<versionComparator$Storage>();
        {
            const __gotots_receiver_1 = $state.hyphenRegExp;
            let hyphenMatch = regexp__from_gostdlib.Regexp.FindStringSubmatch(__gotots_receiver_1 === void 0 ? void 0 :
                (__gotots_receiver_1 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, r);
            if (!hyphenMatch.isNil()) {
                {
                    const __gotots_results_1 = parseHyphen(hyphenMatch.get(1), hyphenMatch.get(2));
                    let parsedComparators = __gotots_results_1[0];
                    let ok = __gotots_results_1[1];
                    if (ok) {
                        const __gotots_slice_build_0 = comparators;
                        const __gotots_slice_build_1 = parsedComparators;
                        let __gotots_slice_build_2 = __gotots_slice_build_1;
                        if (__gotots_slice_build_1.length > 0) {
                            __gotots_slice_build_2 = goSliceAllocate<versionComparator$Storage>(__gotots_slice_build_1.length, null);
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_1.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_2.set(__gotots_slice_build_5, versionComparator.$storageOf(versionComparator.$copy(versionComparator.$fromStorage(__gotots_slice_build_1.get(__gotots_slice_build_5)))));
                            }
                        }
                        const __gotots_slice_build_4 = __gotots_slice_build_0.length + __gotots_slice_build_2.length;
                        let __gotots_slice_build_3 = __gotots_slice_build_0;
                        if (__gotots_slice_build_4 <= __gotots_slice_build_0.capacity) {
                            __gotots_slice_build_3 = __gotots_slice_build_0.$withLength(__gotots_slice_build_4);
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                            }
                        }
                        else {
                            __gotots_slice_build_3 = goSliceAllocate<versionComparator$Storage>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_4));
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_0.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.set(__gotots_slice_build_5, versionComparator.$storageOf(versionComparator.$copy(versionComparator.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_5)))));
                            }
                            for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                            }
                            for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                                __gotots_slice_build_3.$initialize(__gotots_slice_build_5, versionComparator.$zeroStorage());
                            }
                        }
                        comparators = __gotots_slice_build_3;
                    }
                    else {
                        return [RuntimeSlice.nil<RuntimeSlice<versionComparator$Storage>>(), false];
                    }
                }
            }
            else {
                const __gotots_receiver_2 = $state.whitespaceRegExp;
                const __gotots_range_1 = regexp__from_gostdlib.Regexp.Split(__gotots_receiver_2 === void 0 ? void 0 :
                    (__gotots_receiver_2 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, r, BigInt.asIntN(64, goNumberToBigInt(-1)));
                for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                    const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                    let simple = __gotots_range_value_1;
                    const __gotots_receiver_3 = $state.rangeRegExp;
                    let match = regexp__from_gostdlib.Regexp.FindStringSubmatch(__gotots_receiver_3 === void 0 ? void 0 :
                        (__gotots_receiver_3 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, strings__from_gostdlib.TrimSpace(simple));
                    if (match.isNil()) {
                        return [RuntimeSlice.nil<RuntimeSlice<versionComparator$Storage>>(), false];
                    }
                    {
                        const __gotots_results_2 = parseComparator(match.get(1), match.get(2));
                        let parsedComparators = __gotots_results_2[0];
                        let ok = __gotots_results_2[1];
                        if (ok) {
                            const __gotots_slice_build_6 = comparators;
                            const __gotots_slice_build_7 = parsedComparators;
                            let __gotots_slice_build_8 = __gotots_slice_build_7;
                            if (__gotots_slice_build_7.length > 0) {
                                __gotots_slice_build_8 = goSliceAllocate<versionComparator$Storage>(__gotots_slice_build_7.length, null);
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_7.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_8.set(__gotots_slice_build_11, versionComparator.$storageOf(versionComparator.$copy(versionComparator.$fromStorage(__gotots_slice_build_7.get(__gotots_slice_build_11)))));
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
                                __gotots_slice_build_9 = goSliceAllocate<versionComparator$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_10));
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_6.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.set(__gotots_slice_build_11, versionComparator.$storageOf(versionComparator.$copy(versionComparator.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_11)))));
                                }
                                for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.set(__gotots_slice_build_6.length + __gotots_slice_build_11, __gotots_slice_build_8.get(__gotots_slice_build_11));
                                }
                                for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                                    __gotots_slice_build_9.$initialize(__gotots_slice_build_11, versionComparator.$zeroStorage());
                                }
                            }
                            comparators = __gotots_slice_build_9;
                        }
                        else {
                            return [RuntimeSlice.nil<RuntimeSlice<versionComparator$Storage>>(), false];
                        }
                    }
                }
            }
        }
        alternatives = alternatives.append(RuntimeSlice.nil<versionComparator$Storage>(), [comparators]);
    }
    return [alternatives, true];
}
export function parseHyphen(left: gostring, right: gostring): [
    RuntimeSlice<versionComparator$Storage>,
    bool
] {
    const __gotots_results_3 = parsePartial(left);
    let leftResult = __gotots_results_3[0];
    let leftOk = __gotots_results_3[1];
    if (!leftOk) {
        return [RuntimeSlice.nil<versionComparator$Storage>(), false];
    }
    const __gotots_results_4 = parsePartial(right);
    let rightResult = __gotots_results_4[0];
    let rightOk = __gotots_results_4[1];
    if (!rightOk) {
        return [RuntimeSlice.nil<versionComparator$Storage>(), false];
    }
    let comparators = RuntimeSlice.nil<versionComparator$Storage>();
    if (!isWildcard(leftResult.majorStr)) {
        const __gotots_slice_build_12 = comparators;
        const __gotots_slice_build_14 = __gotots_slice_build_12.length + 1;
        let __gotots_slice_build_13 = __gotots_slice_build_12;
        if (__gotots_slice_build_14 <= __gotots_slice_build_12.capacity) {
            __gotots_slice_build_13 = __gotots_slice_build_12.$withLength(__gotots_slice_build_14);
            __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                {
                    operator: rangeGreaterThanEqual$constant().$value,
                    operand: Version.$storageOf(Version.$copy(leftResult.version))
                })));
        }
        else {
            __gotots_slice_build_13 = goSliceAllocate<versionComparator$Storage>(__gotots_slice_build_14, RuntimeSlice.$grownCapacity(__gotots_slice_build_12.capacity, __gotots_slice_build_14));
            for (let __gotots_slice_build_15 = 0; __gotots_slice_build_15 < __gotots_slice_build_12.length; __gotots_slice_build_15++) {
                __gotots_slice_build_13.set(__gotots_slice_build_15, versionComparator.$storageOf(versionComparator.$copy(versionComparator.$fromStorage(__gotots_slice_build_12.get(__gotots_slice_build_15)))));
            }
            __gotots_slice_build_13.set(__gotots_slice_build_12.length + 0, (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                {
                    operator: rangeGreaterThanEqual$constant().$value,
                    operand: Version.$storageOf(Version.$copy(leftResult.version))
                })));
            for (let __gotots_slice_build_15 = __gotots_slice_build_14; __gotots_slice_build_15 < __gotots_slice_build_13.capacity; __gotots_slice_build_15++) {
                __gotots_slice_build_13.$initialize(__gotots_slice_build_15, versionComparator.$zeroStorage());
            }
        }
        comparators = __gotots_slice_build_13;
    }
    if (!isWildcard(rightResult.majorStr)) {
        let operator = new comparatorOperator("");
        let operand = Version.$copy(rightResult.version);
        const operand$location = tsonicTypeScriptRuntime.boundLocation({}, () => operand, operand$next => operand = operand$next);
        __gotots_control_target_0: {
            if (isWildcard(rightResult.minorStr)) {
                operand = Version.$go$private$semver$incrementMajor(operand$location);
                operator = rangeLessThan$constant();
            }
            else if (isWildcard(rightResult.patchStr)) {
                operand = Version.$go$private$semver$incrementMinor(operand$location);
                operator = rangeLessThan$constant();
            }
            else {
                operator = rangeLessThanEqual$constant();
            }
        }
        const __gotots_slice_build_16 = comparators;
        const __gotots_slice_build_18 = __gotots_slice_build_16.length + 1;
        let __gotots_slice_build_17 = __gotots_slice_build_16;
        if (__gotots_slice_build_18 <= __gotots_slice_build_16.capacity) {
            __gotots_slice_build_17 = __gotots_slice_build_16.$withLength(__gotots_slice_build_18);
            __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                {
                    operator: operator.$value,
                    operand: Version.$storageOf(Version.$copy(operand))
                })));
        }
        else {
            __gotots_slice_build_17 = goSliceAllocate<versionComparator$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_16.capacity, __gotots_slice_build_18));
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                __gotots_slice_build_17.set(__gotots_slice_build_19, versionComparator.$storageOf(versionComparator.$copy(versionComparator.$fromStorage(__gotots_slice_build_16.get(__gotots_slice_build_19)))));
            }
            __gotots_slice_build_17.set(__gotots_slice_build_16.length + 0, (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                {
                    operator: operator.$value,
                    operand: Version.$storageOf(Version.$copy(operand))
                })));
            for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                __gotots_slice_build_17.$initialize(__gotots_slice_build_19, versionComparator.$zeroStorage());
            }
        }
        comparators = __gotots_slice_build_17;
    }
    return [comparators, true];
}
export class partialVersion {
    declare private readonly $goType: void;
    public constructor(public version: Version, public majorStr: gostring, public minorStr: gostring, public patchStr: gostring) {
    }
    static $copy($source: partialVersion): partialVersion {
        return new partialVersion(Version.$copy($source.version), $source.majorStr, $source.minorStr, $source.patchStr);
    }
    declare private readonly then?: never;
}
export function parsePartial(text: gostring): [
    partialVersion,
    bool
] {
    const __gotots_receiver_4 = $state.partialRegExp;
    let match = regexp__from_gostdlib.Regexp.FindStringSubmatch(__gotots_receiver_4 === void 0 ? void 0 :
        (__gotots_receiver_4 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, text);
    if (match.isNil()) {
        return [new partialVersion(Version.$zero(), "", "", ""), false];
    }
    let majorStr = match.get(1);
    let minorStr = match.get(2);
    let patchStr = match.get(3);
    let prereleaseStr = match.get(4);
    let buildStr = match.get(5);
    if (minorStr === "") {
        minorStr = "*";
    }
    if (patchStr === "") {
        patchStr = "*";
    }
    let majorNumeric = 0, minorNumeric = 0, patchNumeric = 0;
    let err: GoInterface | undefined = void 0;
    if (isWildcard(majorStr)) {
        majorNumeric = 0;
        minorNumeric = 0;
        patchNumeric = 0;
    }
    else {
        const __gotots_results_6 = getUintComponent(majorStr);
        majorNumeric = __gotots_results_6[0];
        err = __gotots_results_6[1];
        if (!(err === undefined)) {
            return [new partialVersion(Version.$zero(), "", "", ""), false];
        }
        if (isWildcard(minorStr)) {
            minorNumeric = 0;
            patchNumeric = 0;
        }
        else {
            const __gotots_results_7 = getUintComponent(minorStr);
            minorNumeric = __gotots_results_7[0];
            err = __gotots_results_7[1];
            if (!(err === undefined)) {
                return [new partialVersion(Version.$zero(), "", "", ""), false];
            }
            if (isWildcard(patchStr)) {
                patchNumeric = 0;
            }
            else {
                const __gotots_results_8 = getUintComponent(patchStr);
                patchNumeric = __gotots_results_8[0];
                err = __gotots_results_8[1];
                if (!(err === undefined)) {
                    return [new partialVersion(Version.$zero(), "", "", ""), false];
                }
            }
        }
    }
    let prerelease = RuntimeSlice.nil<gostring>();
    if (prereleaseStr !== "") {
        prerelease = strings__from_gostdlib.Split(prereleaseStr, ".");
    }
    let build = RuntimeSlice.nil<gostring>();
    if (buildStr !== "") {
        build = strings__from_gostdlib.Split(buildStr, ".");
    }
    let result = new partialVersion(Version.$fromStorage({
        major: majorNumeric,
        minor: minorNumeric,
        patch: patchNumeric,
        prerelease: prerelease,
        build: build
    }), majorStr, minorStr, patchStr);
    return [partialVersion.$copy(result), true];
}
export function parseComparator(op: gostring, text: gostring): [
    RuntimeSlice<versionComparator$Storage>,
    bool
] {
    let operator = new comparatorOperator(op);
    const __gotots_results_5 = parsePartial(text);
    let result = __gotots_results_5[0];
    let ok = __gotots_results_5[1];
    if (!ok) {
        return [RuntimeSlice.nil<versionComparator$Storage>(), false];
    }
    let comparatorsResult = RuntimeSlice.nil<versionComparator$Storage>();
    if (!isWildcard(result.majorStr)) {
        switch (operator.$value) {
            case "~": {
                let first = versionComparator.$fromStorage({
                    operator: rangeGreaterThanEqual$constant().$value,
                    operand: Version.$storageOf(Version.$copy(result.version))
                });
                let secondVersion = Version.$zero();
                if (isWildcard(result.minorStr)) {
                    const __gotots_store_0 = result;
                    secondVersion = Version.$go$private$semver$incrementMajor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "version"));
                }
                else {
                    const __gotots_store_1 = result;
                    secondVersion = Version.$go$private$semver$incrementMinor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "version"));
                }
                let second = versionComparator.$fromStorage({
                    operator: rangeLessThan$constant().$value,
                    operand: Version.$storageOf(Version.$copy(secondVersion))
                });
                comparatorsResult = RuntimeSlice.literal<versionComparator$Storage>([versionComparator.$storageOf(versionComparator.$copy(first)), versionComparator.$storageOf(versionComparator.$copy(second))]);
                break;
            }
            case "^": {
                let first = versionComparator.$fromStorage({
                    operator: rangeGreaterThanEqual$constant().$value,
                    operand: Version.$storageOf(Version.$copy(result.version))
                });
                let secondVersion = Version.$zero();
                if (Version.$storageOf(result.version).major > 0 || isWildcard(result.minorStr)) {
                    const __gotots_store_2 = result;
                    secondVersion = Version.$go$private$semver$incrementMajor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "version"));
                }
                else if (Version.$storageOf(result.version).minor > 0 || isWildcard(result.patchStr)) {
                    const __gotots_store_3 = result;
                    secondVersion = Version.$go$private$semver$incrementMinor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "version"));
                }
                else {
                    const __gotots_store_4 = result;
                    secondVersion = Version.$go$private$semver$incrementPatch(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "version"));
                }
                let second = versionComparator.$fromStorage({
                    operator: rangeLessThan$constant().$value,
                    operand: Version.$storageOf(Version.$copy(secondVersion))
                });
                comparatorsResult = RuntimeSlice.literal<versionComparator$Storage>([versionComparator.$storageOf(versionComparator.$copy(first)), versionComparator.$storageOf(versionComparator.$copy(second))]);
                break;
            }
            case "<":
            case ">=": {
                let version = Version.$copy(result.version);
                if (isWildcard(result.minorStr) || isWildcard(result.patchStr)) {
                    Version.$storageOf(version).prerelease = RuntimeSlice.literal<gostring>(["0"]);
                }
                comparatorsResult = RuntimeSlice.literal<versionComparator$Storage>([
                    (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                        {
                            operator: operator.$value,
                            operand: Version.$storageOf(Version.$copy(version))
                        })),
                ]);
                break;
            }
            case "<=":
            case ">": {
                let version = Version.$copy(result.version);
                const version$location = tsonicTypeScriptRuntime.boundLocation({}, () => version, version$next => version = version$next);
                if (isWildcard(result.minorStr)) {
                    if (operator.$value === rangeLessThanEqual$constant().$value) {
                        operator = rangeLessThan$constant();
                    }
                    else {
                        operator = rangeGreaterThanEqual$constant();
                    }
                    version = Version.$go$private$semver$incrementMajor(version$location);
                    Version.$storageOf(version).prerelease = RuntimeSlice.literal<gostring>(["0"]);
                }
                else if (isWildcard(result.patchStr)) {
                    if (operator.$value === rangeLessThanEqual$constant().$value) {
                        operator = rangeLessThan$constant();
                    }
                    else {
                        operator = rangeGreaterThanEqual$constant();
                    }
                    version = Version.$go$private$semver$incrementMinor(version$location);
                    Version.$storageOf(version).prerelease = RuntimeSlice.literal<gostring>(["0"]);
                }
                comparatorsResult = RuntimeSlice.literal<versionComparator$Storage>([
                    (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                        {
                            operator: operator.$value,
                            operand: Version.$storageOf(Version.$copy(version))
                        })),
                ]);
                break;
            }
            case "=":
            case "": {
                operator = rangeEqual$constant();
                if (isWildcard(result.minorStr) || isWildcard(result.patchStr)) {
                    let originalVersion = Version.$copy(result.version);
                    const originalVersion$location = tsonicTypeScriptRuntime.boundLocation({}, () => originalVersion, originalVersion$next => originalVersion = originalVersion$next);
                    let firstVersion = Version.$copy(originalVersion);
                    Version.$storageOf(firstVersion).prerelease = RuntimeSlice.literal<gostring>(["0"]);
                    let secondVersion = Version.$zero();
                    if (isWildcard(result.minorStr)) {
                        secondVersion = Version.$go$private$semver$incrementMajor(originalVersion$location);
                    }
                    else {
                        secondVersion = Version.$go$private$semver$incrementMinor(originalVersion$location);
                    }
                    Version.$storageOf(secondVersion).prerelease = RuntimeSlice.literal<gostring>(["0"]);
                    comparatorsResult = RuntimeSlice.literal<versionComparator$Storage>([
                        (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                            {
                                operator: rangeGreaterThanEqual$constant().$value,
                                operand: Version.$storageOf(Version.$copy(firstVersion))
                            })), (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                            {
                                operator: rangeLessThan$constant().$value,
                                operand: Version.$storageOf(Version.$copy(secondVersion))
                            })),
                    ]);
                }
                else {
                    comparatorsResult = RuntimeSlice.literal<versionComparator$Storage>([
                        (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                            {
                                operator: operator.$value,
                                operand: Version.$storageOf(Version.$copy(result.version))
                            })),
                    ]);
                }
                break;
            }
            default: {
                const __gotots_argument_0 = new GoInterfaceAdapter(new comparatorOperator("Unexpected operator: " + operator.$value));
                GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
                break;
            }
        }
    }
    else {
        if (operator.$value ===
            ((void comparatorOperator,
                "<") as gostring) || operator.$value ===
            ((void comparatorOperator,
                ">") as gostring)) {
            comparatorsResult = RuntimeSlice.literal<versionComparator$Storage>([
                (void versionComparator.$storageOf, (void versionComparator.$fromStorage,
                    {
                        operator: rangeLessThan$constant().$value,
                        operand: Version.$storageOf(Version.$copy(Version.$fromStorage($state.versionZero)))
                    })),
            ]);
        }
    }
    return [comparatorsResult, true];
}
export function isWildcard(text: gostring): bool {
    return text === "*" || text === "x" || text === "X";
}
