import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Message as Message__from_diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import { Set as Set__from_collections } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/collections/package.js";
import { GetSpellingSuggestionForStrings as GetSpellingSuggestionForStrings__from_core, ScriptTargetES2018$constant as ScriptTargetES2018$constant__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state as $state__diagnostics } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/diagnostics/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/state.js";
import { CodePointToSurrogatePair as CodePointToSurrogatePair__from_stringutil, DecodeJSStringRune as DecodeJSStringRune__from_stringutil, EncodeJSStringRune as EncodeJSStringRune__from_stringutil, IsASCIILetter as IsASCIILetter__from_stringutil, IsDigit as IsDigit__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { MaxInt$int as MaxInt$int__from_math__package_1 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { RuneError$int32 as RuneError$int32__from_utf8 } from "../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import { Set$Keys$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/collections/Set$Keys.js";
import { ConcatenateSeq$string } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/ConcatenateSeq.js";
import { Keys$MapOf_string_To_Struct_void$string$Struct_void, Keys$MapOf_string_To_bool$string$bool, Keys$MapOf_string_To_string$string$string } from "../../../../../../support/generics/concretizations/maps/Keys.js";
import { $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge } from "../../../../../../support/provider-interface-bridges.js";
import { EscapeSequenceScanningFlagsAnnexB$constant, EscapeSequenceScanningFlagsAnyUnicodeMode$constant, EscapeSequenceScanningFlagsAtomEscape$constant, EscapeSequenceScanningFlagsRegularExpression$constant, IsIdentifierPart, Scanner, isWordCharacter } from "./scanner.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoMap } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export type regularExpressionFlags = int32;
export function regularExpressionFlagsNone$constant(): regularExpressionFlags {
    return 0;
}
export function regularExpressionFlagsHasIndices$constant(): regularExpressionFlags {
    return 1;
}
export function regularExpressionFlagsGlobal$constant(): regularExpressionFlags {
    return 2;
}
export function regularExpressionFlagsIgnoreCase$constant(): regularExpressionFlags {
    return 4;
}
export function regularExpressionFlagsMultiline$constant(): regularExpressionFlags {
    return 8;
}
export function regularExpressionFlagsDotAll$constant(): regularExpressionFlags {
    return 16;
}
export function regularExpressionFlagsUnicode$constant(): regularExpressionFlags {
    return 32;
}
export function regularExpressionFlagsUnicodeSets$constant(): regularExpressionFlags {
    return 64;
}
export function regularExpressionFlagsSticky$constant(): regularExpressionFlags {
    return 128;
}
export function regularExpressionFlagsAnyUnicodeMode$constant(): regularExpressionFlags {
    return 96;
}
export function regularExpressionFlagsModifiers$constant(): regularExpressionFlags {
    return 28;
}
export class classSetExpressionType {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function classSetExpressionTypeClassIntersection$constant(): classSetExpressionType {
    return new classSetExpressionType(2);
}
export function classSetExpressionTypeClassSubtraction$constant(): classSetExpressionType {
    return new classSetExpressionType(3);
}
export type groupNameReference$Storage = {
    pos: int;
    end: int;
    name: gostring;
};
export class groupNameReference {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: groupNameReference$Storage) {
    }
    public static $storageOf($source: groupNameReference): groupNameReference$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: groupNameReference$Storage): groupNameReference {
        return new groupNameReference($source);
    }
    public get pos(): int {
        return this.$storage.pos;
    }
    public set pos($value: int) {
        this.$storage.pos = $value;
    }
    public get end(): int {
        return this.$storage.end;
    }
    public set end($value: int) {
        this.$storage.end = $value;
    }
    public get name(): gostring {
        return this.$storage.name;
    }
    public set name($value: gostring) {
        this.$storage.name = $value;
    }
    static $zero(): groupNameReference {
        return new groupNameReference({
            pos: 0,
            end: 0,
            name: ""
        });
    }
    static $copy($source: groupNameReference): groupNameReference {
        return new groupNameReference({
            pos: $source.$storage.pos,
            end: $source.$storage.end,
            name: $source.$storage.name
        });
    }
    declare private readonly then?: never;
}
export type decimalEscapeValue$Storage = {
    pos: int;
    end: int;
    value: int;
};
export class decimalEscapeValue {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: decimalEscapeValue$Storage) {
    }
    public static $storageOf($source: decimalEscapeValue): decimalEscapeValue$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: decimalEscapeValue$Storage): decimalEscapeValue {
        return new decimalEscapeValue($source);
    }
    public get pos(): int {
        return this.$storage.pos;
    }
    public set pos($value: int) {
        this.$storage.pos = $value;
    }
    public get end(): int {
        return this.$storage.end;
    }
    public set end($value: int) {
        this.$storage.end = $value;
    }
    public get value(): int {
        return this.$storage.value;
    }
    public set value($value: int) {
        this.$storage.value = $value;
    }
    static $zero(): decimalEscapeValue {
        return new decimalEscapeValue({
            pos: 0,
            end: 0,
            value: 0
        });
    }
    static $copy($source: decimalEscapeValue): decimalEscapeValue {
        return new decimalEscapeValue({
            pos: $source.$storage.pos,
            end: $source.$storage.end,
            value: $source.$storage.value
        });
    }
    declare private readonly then?: never;
}
export class regExpParser {
    declare private readonly $goType: void;
    public constructor(public scanner: tsonicTypeScriptRuntime.Location<Scanner> | undefined, public end: int, public regExpFlags: regularExpressionFlags, public anyUnicodeMode: bool, public unicodeSetsMode: bool, public annexB: bool, public anyUnicodeModeOrNonAnnexB: bool, public namedCaptureGroups: bool, public mayContainStrings: bool, public numberOfCapturingGroups: int, public groupSpecifiers: GoMapValue<gostring, bool>, public groupNameReferences: RuntimeSlice<groupNameReference$Storage>, public decimalEscapes: RuntimeSlice<decimalEscapeValue$Storage>, public namedCapturingGroups: RuntimeSlice<GoMapValue<gostring, bool>>, public pendingLowSurrogate: int32) {
    }
    declare private readonly then?: never;
    static $go$private$scanner$char(p: regExpParser | undefined): int32 {
        return Scanner.$go$private$scanner$char((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner);
    }
    static $go$private$scanner$charAt(p: regExpParser | undefined, pos: int): int32 {
        return Scanner.$go$private$scanner$charAt((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner, pos - regExpParser.$go$private$scanner$pos(p));
    }
    static $go$private$scanner$error(p: regExpParser | undefined, msg: {
        value: Message__from_diagnostics;
    } | undefined, pos: int, length: int, args: RuntimeSlice<GoInterface | undefined>): void {
        Scanner.$go$private$scanner$errorAt((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner, msg, pos, length, args);
    }
    static $go$private$scanner$getSpellingSuggestionForUnicodePropertyName(p: regExpParser | undefined, name: gostring): gostring {
        return GetSpellingSuggestionForStrings__from_core(name, Keys$MapOf_string_To_string$string$string($state.nonBinaryUnicodeProperties));
    }
    static $go$private$scanner$getSpellingSuggestionForUnicodePropertyNameOrValue(p: regExpParser | undefined, name: gostring): gostring {
        return GetSpellingSuggestionForStrings__from_core(name, ConcatenateSeq$string(RuntimeSlice.literal<iter__from_gostdlib.Seq<gostring>>([Keys$MapOf_string_To_Struct_void$string$Struct_void(Set$Keys$string($state.valuesOfNonBinaryUnicodeProperties.lookup("General_Category"))), Keys$MapOf_string_To_Struct_void$string$Struct_void(Set$Keys$string($state.binaryUnicodeProperties)), Keys$MapOf_string_To_Struct_void$string$Struct_void(Set$Keys$string($state.binaryUnicodePropertiesOfStrings))])));
    }
    static $go$private$scanner$getSpellingSuggestionForUnicodePropertyValue(p: regExpParser | undefined, propertyName: gostring, value: gostring): gostring {
        let values: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = $state.valuesOfNonBinaryUnicodeProperties.lookup(propertyName);
        if (values === undefined) {
            return "";
        }
        return GetSpellingSuggestionForStrings__from_core(value, Keys$MapOf_string_To_Struct_void$string$Struct_void(Set$Keys$string(values)));
    }
    static $go$private$scanner$incPos(p: regExpParser | undefined, n: int): void {
        const __gotots_store_2 = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState;
        __gotots_store_2.pos = __gotots_store_2.pos + n;
    }
    static $go$private$scanner$isClassContentExit(p: regExpParser | undefined, ch: int32): bool {
        return ch === 93 || regExpParser.$go$private$scanner$pos(p) >= (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;
    }
    static $go$private$scanner$namedCapturingGroupsContains(p: regExpParser | undefined, name: gostring): bool {
        const __gotots_range_2 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let group: GoMapValue<gostring, bool> = __gotots_range_value_2;
            if (group.lookup(name)) {
                return true;
            }
        }
        return false;
    }
    static $go$private$scanner$pos(p: regExpParser | undefined): int {
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.pos;
    }
    static $go$private$scanner$run(p: regExpParser | undefined): void {
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeMode || !(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).annexB;
        regExpParser.$go$private$scanner$scanDisjunction(p, false);
        const __gotots_range_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).groupNameReferences;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = groupNameReference.$copy(groupNameReference.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
            let reference = __gotots_range_value_0;
            if (!(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).groupSpecifiers.lookup(groupNameReference.$storageOf(reference).name)) {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.There_is_no_capturing_group_named_0_in_this_regular_expression, groupNameReference.$storageOf(reference).pos, groupNameReference.$storageOf(reference).end - groupNameReference.$storageOf(reference).pos, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(groupNameReference.$storageOf(reference).name)]));
                if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).groupSpecifiers.length() > 0) {
                    let suggestion = GetSpellingSuggestionForStrings__from_core(groupNameReference.$storageOf(reference).name, Keys$MapOf_string_To_bool$string$bool((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).groupSpecifiers));
                    if (suggestion !== "") {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Did_you_mean_0, groupNameReference.$storageOf(reference).pos, groupNameReference.$storageOf(reference).end - groupNameReference.$storageOf(reference).pos, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(suggestion)]));
                    }
                }
            }
        }
        const __gotots_range_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).decimalEscapes;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = decimalEscapeValue.$copy(decimalEscapeValue.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
            let escape = __gotots_range_value_1;
            if (decimalEscapeValue.$storageOf(escape).value > (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).numberOfCapturingGroups) {
                if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).numberOfCapturingGroups > 0) {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_only_0_capturing_groups_in_this_regular_expression, decimalEscapeValue.$storageOf(escape).pos, decimalEscapeValue.$storageOf(escape).end - decimalEscapeValue.$storageOf(escape).pos, RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).numberOfCapturingGroups)]));
                }
                else {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.This_backreference_refers_to_a_group_that_does_not_exist_There_are_no_capturing_groups_in_this_regular_expression, decimalEscapeValue.$storageOf(escape).pos, decimalEscapeValue.$storageOf(escape).end - decimalEscapeValue.$storageOf(escape).pos, RuntimeSlice.nil<GoInterface | undefined>());
                }
            }
        }
    }
    static $go$private$scanner$scanAlternative(p: regExpParser | undefined, isInGroup: bool): void {
        let isPreviousTermQuantifiable = false;
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;) {
            let start = regExpParser.$go$private$scanner$pos(p);
            let ch = regExpParser.$go$private$scanner$char(p);
            {
                const __gotots_switch_tag_0 = ch;
                let __gotots_switch_selection_0 = -1;
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_0 = false;
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === 94;
                    }
                    if (!__gotots_switch_match_0) {
                        __gotots_switch_match_0 = __gotots_switch_tag_0 === 36;
                    }
                    if (__gotots_switch_match_0) {
                        __gotots_switch_selection_0 = 0;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_1 = false;
                    if (!__gotots_switch_match_1) {
                        __gotots_switch_match_1 = __gotots_switch_tag_0 === 92;
                    }
                    if (__gotots_switch_match_1) {
                        __gotots_switch_selection_0 = 1;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_2 = false;
                    if (!__gotots_switch_match_2) {
                        __gotots_switch_match_2 = __gotots_switch_tag_0 === 40;
                    }
                    if (__gotots_switch_match_2) {
                        __gotots_switch_selection_0 = 2;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_3 = false;
                    if (!__gotots_switch_match_3) {
                        __gotots_switch_match_3 = __gotots_switch_tag_0 === 123;
                    }
                    if (__gotots_switch_match_3) {
                        __gotots_switch_selection_0 = 3;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_4 = false;
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_0 === 42;
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_0 === 43;
                    }
                    if (!__gotots_switch_match_4) {
                        __gotots_switch_match_4 = __gotots_switch_tag_0 === 63;
                    }
                    if (__gotots_switch_match_4) {
                        __gotots_switch_selection_0 = 4;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_5 = false;
                    if (!__gotots_switch_match_5) {
                        __gotots_switch_match_5 = __gotots_switch_tag_0 === 46;
                    }
                    if (__gotots_switch_match_5) {
                        __gotots_switch_selection_0 = 5;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_6 = false;
                    if (!__gotots_switch_match_6) {
                        __gotots_switch_match_6 = __gotots_switch_tag_0 === 91;
                    }
                    if (__gotots_switch_match_6) {
                        __gotots_switch_selection_0 = 6;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_7 = false;
                    if (!__gotots_switch_match_7) {
                        __gotots_switch_match_7 = __gotots_switch_tag_0 === 41;
                    }
                    if (__gotots_switch_match_7) {
                        __gotots_switch_selection_0 = 7;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_8 = false;
                    if (!__gotots_switch_match_8) {
                        __gotots_switch_match_8 = __gotots_switch_tag_0 === 93;
                    }
                    if (!__gotots_switch_match_8) {
                        __gotots_switch_match_8 = __gotots_switch_tag_0 === 125;
                    }
                    if (__gotots_switch_match_8) {
                        __gotots_switch_selection_0 = 8;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    let __gotots_switch_match_9 = false;
                    if (!__gotots_switch_match_9) {
                        __gotots_switch_match_9 = __gotots_switch_tag_0 === 47;
                    }
                    if (!__gotots_switch_match_9) {
                        __gotots_switch_match_9 = __gotots_switch_tag_0 === 124;
                    }
                    if (__gotots_switch_match_9) {
                        __gotots_switch_selection_0 = 9;
                    }
                }
                if (__gotots_switch_selection_0 === -1) {
                    __gotots_switch_selection_0 = 10;
                }
                __gotots_control_target_0: {
                    if (__gotots_switch_selection_0 === 0) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        isPreviousTermQuantifiable = false;
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 1) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        switch (regExpParser.$go$private$scanner$char(p)) {
                            case 98:
                            case 66: {
                                regExpParser.$go$private$scanner$incPos(p, 1);
                                isPreviousTermQuantifiable = false;
                                break;
                            }
                            default: {
                                regExpParser.$go$private$scanner$scanAtomEscape(p);
                                isPreviousTermQuantifiable = true;
                                break;
                            }
                        }
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 2) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        if (regExpParser.$go$private$scanner$char(p) === 63) {
                            regExpParser.$go$private$scanner$incPos(p, 1);
                            switch (regExpParser.$go$private$scanner$char(p)) {
                                case 61:
                                case 33: {
                                    regExpParser.$go$private$scanner$incPos(p, 1);
                                    isPreviousTermQuantifiable = !(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB;
                                    break;
                                }
                                case 60: {
                                    let groupNameStart = regExpParser.$go$private$scanner$pos(p);
                                    regExpParser.$go$private$scanner$incPos(p, 1);
                                    switch (regExpParser.$go$private$scanner$char(p)) {
                                        case 61:
                                        case 33: {
                                            regExpParser.$go$private$scanner$incPos(p, 1);
                                            isPreviousTermQuantifiable = false;
                                            break;
                                        }
                                        default: {
                                            regExpParser.$go$private$scanner$scanGroupName(p, false);
                                            regExpParser.$go$private$scanner$scanExpectedChar(p, 62);
                                            if (Scanner.$go$private$scanner$languageVersion((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner) < ScriptTargetES2018$constant__from_core()) {
                                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Named_capturing_groups_are_only_available_when_targeting_ES2018_or_later, groupNameStart, regExpParser.$go$private$scanner$pos(p) - groupNameStart, RuntimeSlice.nil<GoInterface | undefined>());
                                            }
                                            const __gotots_store_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                            __gotots_store_0.numberOfCapturingGroups = __gotots_store_0.numberOfCapturingGroups + 1;
                                            isPreviousTermQuantifiable = true;
                                            break;
                                        }
                                    }
                                    break;
                                }
                                default: {
                                    let flagsStart = regExpParser.$go$private$scanner$pos(p);
                                    let setFlags = regExpParser.$go$private$scanner$scanPatternModifiers(p, regularExpressionFlagsNone$constant());
                                    if (regExpParser.$go$private$scanner$char(p) === 45) {
                                        regExpParser.$go$private$scanner$incPos(p, 1);
                                        regExpParser.$go$private$scanner$scanPatternModifiers(p, setFlags);
                                        if (regExpParser.$go$private$scanner$pos(p) === flagsStart + 1) {
                                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Subpattern_flags_must_be_present_when_there_is_a_minus_sign, flagsStart, regExpParser.$go$private$scanner$pos(p) - flagsStart, RuntimeSlice.nil<GoInterface | undefined>());
                                        }
                                    }
                                    regExpParser.$go$private$scanner$scanExpectedChar(p, 58);
                                    isPreviousTermQuantifiable = true;
                                    break;
                                }
                            }
                        }
                        else {
                            const __gotots_store_1 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_store_1.numberOfCapturingGroups = __gotots_store_1.numberOfCapturingGroups + 1;
                            isPreviousTermQuantifiable = true;
                        }
                        regExpParser.$go$private$scanner$scanDisjunction(p, true);
                        regExpParser.$go$private$scanner$scanExpectedChar(p, 41);
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 3) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        let digitsStart = regExpParser.$go$private$scanner$pos(p);
                        regExpParser.$go$private$scanner$scanDigits(p);
                        let minStr = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue;
                        if (!(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB && minStr === "") {
                            isPreviousTermQuantifiable = true;
                            continue;
                        }
                        if (regExpParser.$go$private$scanner$char(p) === 44) {
                            regExpParser.$go$private$scanner$incPos(p, 1);
                            regExpParser.$go$private$scanner$scanDigits(p);
                            let maxStr = (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue;
                            if (minStr === "") {
                                if (maxStr !== "" || regExpParser.$go$private$scanner$char(p) === 125) {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Incomplete_quantifier_Digit_expected, digitsStart, 0, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                                else {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                                    isPreviousTermQuantifiable = true;
                                    continue;
                                }
                            }
                            else if (maxStr !== "") {
                                if (compareDecimalStrings(minStr, maxStr) > 0 && ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB || regExpParser.$go$private$scanner$char(p) === 125)) {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Numbers_out_of_order_in_quantifier, digitsStart, regExpParser.$go$private$scanner$pos(p) - digitsStart, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                            }
                        }
                        else if (minStr === "") {
                            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB) {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, start, 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                            }
                            isPreviousTermQuantifiable = true;
                            continue;
                        }
                        if (regExpParser.$go$private$scanner$char(p) !== 125) {
                            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB) {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_0_expected, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("}")]));
                                regExpParser.$go$private$scanner$incPos(p, -1);
                            }
                            else {
                                isPreviousTermQuantifiable = true;
                                continue;
                            }
                        }
                        __gotots_switch_selection_0 = 4;
                    }
                    if (__gotots_switch_selection_0 === 4) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        if (regExpParser.$go$private$scanner$char(p) === 63) {
                            regExpParser.$go$private$scanner$incPos(p, 1);
                        }
                        if (!isPreviousTermQuantifiable) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.There_is_nothing_available_for_repetition, start, regExpParser.$go$private$scanner$pos(p) - start, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        isPreviousTermQuantifiable = false;
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 5) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        isPreviousTermQuantifiable = true;
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 6) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unicodeSetsMode) {
                            regExpParser.$go$private$scanner$scanClassSetExpression(p);
                        }
                        else {
                            regExpParser.$go$private$scanner$scanClassRanges(p);
                            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingLowSurrogate = 0;
                        }
                        regExpParser.$go$private$scanner$scanExpectedChar(p, 93);
                        isPreviousTermQuantifiable = true;
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 7) {
                        if (isInGroup) {
                            return;
                        }
                        __gotots_switch_selection_0 = 8;
                    }
                    if (__gotots_switch_selection_0 === 8) {
                        if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB || ch === 41) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p), 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                        }
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        isPreviousTermQuantifiable = true;
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 9) {
                        return;
                        break __gotots_control_target_0;
                    }
                    if (__gotots_switch_selection_0 === 10) {
                        regExpParser.$go$private$scanner$scanSourceCharacter(p);
                        isPreviousTermQuantifiable = true;
                        break __gotots_control_target_0;
                    }
                }
            }
        }
    }
    static $go$private$scanner$scanAtomEscape(p: regExpParser | undefined): void {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 92, RuntimeSlice.nil<GoInterface | undefined>());
        {
            const __gotots_switch_tag_1 = regExpParser.$go$private$scanner$char(p);
            let __gotots_switch_selection_1 = -1;
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_10 = false;
                if (!__gotots_switch_match_10) {
                    __gotots_switch_match_10 = __gotots_switch_tag_1 === 107;
                }
                if (__gotots_switch_match_10) {
                    __gotots_switch_selection_1 = 0;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                let __gotots_switch_match_11 = false;
                if (!__gotots_switch_match_11) {
                    __gotots_switch_match_11 = __gotots_switch_tag_1 === 113;
                }
                if (__gotots_switch_match_11) {
                    __gotots_switch_selection_1 = 1;
                }
            }
            if (__gotots_switch_selection_1 === -1) {
                __gotots_switch_selection_1 = 2;
            }
            __gotots_control_target_1: {
                if (__gotots_switch_selection_1 === 0) {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    if (regExpParser.$go$private$scanner$char(p) === 60) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        regExpParser.$go$private$scanner$scanGroupName(p, true);
                        regExpParser.$go$private$scanner$scanExpectedChar(p, 62);
                    }
                    else if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCaptureGroups) {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_k_must_be_followed_by_a_capturing_group_name_enclosed_in_angle_brackets, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    break __gotots_control_target_1;
                }
                if (__gotots_switch_selection_1 === 1) {
                    if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unicodeSetsMode) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_q_is_only_available_inside_character_class, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                        return;
                    }
                    __gotots_switch_selection_1 = 2;
                }
                if (__gotots_switch_selection_1 === 2) {
                    if (!regExpParser.$go$private$scanner$scanCharacterClassEscape(p) && !regExpParser.$go$private$scanner$scanDecimalEscape(p)) {
                        Assert__from_debug(regExpParser.$go$private$scanner$scanCharacterEscape(p, true) !== "", RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    break __gotots_control_target_1;
                }
            }
        }
    }
    static $go$private$scanner$scanCharacterClassEscape(p: regExpParser | undefined): bool {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 92, RuntimeSlice.nil<GoInterface | undefined>());
        let isCharacterComplement = false;
        let start = regExpParser.$go$private$scanner$pos(p) - 1;
        let ch = regExpParser.$go$private$scanner$char(p);
        {
            const __gotots_switch_tag_2 = ch;
            let __gotots_switch_selection_2 = -1;
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_12 = false;
                if (!__gotots_switch_match_12) {
                    __gotots_switch_match_12 = __gotots_switch_tag_2 === 100;
                }
                if (!__gotots_switch_match_12) {
                    __gotots_switch_match_12 = __gotots_switch_tag_2 === 68;
                }
                if (!__gotots_switch_match_12) {
                    __gotots_switch_match_12 = __gotots_switch_tag_2 === 115;
                }
                if (!__gotots_switch_match_12) {
                    __gotots_switch_match_12 = __gotots_switch_tag_2 === 83;
                }
                if (!__gotots_switch_match_12) {
                    __gotots_switch_match_12 = __gotots_switch_tag_2 === 119;
                }
                if (!__gotots_switch_match_12) {
                    __gotots_switch_match_12 = __gotots_switch_tag_2 === 87;
                }
                if (__gotots_switch_match_12) {
                    __gotots_switch_selection_2 = 0;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_13 = false;
                if (!__gotots_switch_match_13) {
                    __gotots_switch_match_13 = __gotots_switch_tag_2 === 80;
                }
                if (__gotots_switch_match_13) {
                    __gotots_switch_selection_2 = 1;
                }
            }
            if (__gotots_switch_selection_2 === -1) {
                let __gotots_switch_match_14 = false;
                if (!__gotots_switch_match_14) {
                    __gotots_switch_match_14 = __gotots_switch_tag_2 === 112;
                }
                if (__gotots_switch_match_14) {
                    __gotots_switch_selection_2 = 2;
                }
            }
            __gotots_control_target_2: {
                if (__gotots_switch_selection_2 === 0) {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    return true;
                    break __gotots_control_target_2;
                }
                if (__gotots_switch_selection_2 === 1) {
                    isCharacterComplement = true;
                    __gotots_switch_selection_2 = 2;
                }
                if (__gotots_switch_selection_2 === 2) {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    if (regExpParser.$go$private$scanner$char(p) === 123) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        let propertyNameOrValueStart = regExpParser.$go$private$scanner$pos(p);
                        let propertyNameOrValue = regExpParser.$go$private$scanner$scanWordCharacters(p);
                        if (regExpParser.$go$private$scanner$char(p) === 61) {
                            let propertyName = $state.nonBinaryUnicodeProperties.lookup(propertyNameOrValue);
                            if (regExpParser.$go$private$scanner$pos(p) === propertyNameOrValueStart) {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Expected_a_Unicode_property_name, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                            else if (propertyName === "") {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unknown_Unicode_property_name, propertyNameOrValueStart, regExpParser.$go$private$scanner$pos(p) - propertyNameOrValueStart, RuntimeSlice.nil<GoInterface | undefined>());
                                let suggestion = regExpParser.$go$private$scanner$getSpellingSuggestionForUnicodePropertyName(p, propertyNameOrValue);
                                if (suggestion !== "") {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Did_you_mean_0, propertyNameOrValueStart, regExpParser.$go$private$scanner$pos(p) - propertyNameOrValueStart, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(suggestion)]));
                                }
                            }
                            regExpParser.$go$private$scanner$incPos(p, 1);
                            let propertyValueStart = regExpParser.$go$private$scanner$pos(p);
                            let propertyValue = regExpParser.$go$private$scanner$scanWordCharacters(p);
                            if (regExpParser.$go$private$scanner$pos(p) === propertyValueStart) {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Expected_a_Unicode_property_value, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                            else if (propertyName !== "") {
                                let values: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined = $state.valuesOfNonBinaryUnicodeProperties.lookup(propertyName);
                                if (!(values === undefined) && !Set__from_collections.Has<gostring>(values, propertyValue)) {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unknown_Unicode_property_value, propertyValueStart, regExpParser.$go$private$scanner$pos(p) - propertyValueStart, RuntimeSlice.nil<GoInterface | undefined>());
                                    let suggestion = regExpParser.$go$private$scanner$getSpellingSuggestionForUnicodePropertyValue(p, propertyName, propertyValue);
                                    if (suggestion !== "") {
                                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Did_you_mean_0, propertyValueStart, regExpParser.$go$private$scanner$pos(p) - propertyValueStart, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(suggestion)]));
                                    }
                                }
                            }
                        }
                        else {
                            if (regExpParser.$go$private$scanner$pos(p) === propertyNameOrValueStart) {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Expected_a_Unicode_property_name_or_value, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                            else if (Set__from_collections.Has<gostring>($state.binaryUnicodePropertiesOfStrings, propertyNameOrValue)) {
                                if (!(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).unicodeSetsMode) {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Any_Unicode_property_that_would_possibly_match_more_than_a_single_character_is_only_available_when_the_Unicode_Sets_v_flag_is_set, propertyNameOrValueStart, regExpParser.$go$private$scanner$pos(p) - propertyNameOrValueStart, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                                else if (isCharacterComplement) {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, propertyNameOrValueStart, regExpParser.$go$private$scanner$pos(p) - propertyNameOrValueStart, RuntimeSlice.nil<GoInterface | undefined>());
                                }
                                else {
                                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = true;
                                }
                            }
                            else if (!Set__from_collections.Has<gostring>($state.valuesOfNonBinaryUnicodeProperties.lookup("General_Category"), propertyNameOrValue) && !Set__from_collections.Has<gostring>($state.binaryUnicodeProperties, propertyNameOrValue)) {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unknown_Unicode_property_name_or_value, propertyNameOrValueStart, regExpParser.$go$private$scanner$pos(p) - propertyNameOrValueStart, RuntimeSlice.nil<GoInterface | undefined>());
                                let suggestion = regExpParser.$go$private$scanner$getSpellingSuggestionForUnicodePropertyNameOrValue(p, propertyNameOrValue);
                                if (suggestion !== "") {
                                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Did_you_mean_0, propertyNameOrValueStart, regExpParser.$go$private$scanner$pos(p) - propertyNameOrValueStart, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(suggestion)]));
                                }
                            }
                        }
                        regExpParser.$go$private$scanner$scanExpectedChar(p, 125);
                        if (!(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeMode) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unicode_property_value_expressions_are_only_available_when_the_Unicode_u_flag_or_the_Unicode_Sets_v_flag_is_set, start, regExpParser.$go$private$scanner$pos(p) - start, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                    }
                    else if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB) {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_0_must_be_followed_by_a_Unicode_property_value_expression_enclosed_in_braces, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                    }
                    else {
                        regExpParser.$go$private$scanner$incPos(p, -1);
                        return false;
                    }
                    return true;
                    break __gotots_control_target_2;
                }
            }
        }
        return false;
    }
    static $go$private$scanner$scanCharacterEscape(p: regExpParser | undefined, atomEscape: bool): gostring {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 92, RuntimeSlice.nil<GoInterface | undefined>());
        let ch = regExpParser.$go$private$scanner$char(p);
        switch (ch) {
            case -1: {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Undetermined_character_escape, regExpParser.$go$private$scanner$pos(p) - 1, 1, RuntimeSlice.nil<GoInterface | undefined>());
                return "\\";
                break;
            }
            case 99: {
                regExpParser.$go$private$scanner$incPos(p, 1);
                ch = regExpParser.$go$private$scanner$char(p);
                if (IsASCIILetter__from_stringutil(ch)) {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    return goStringEncodeRune(ch & 31);
                }
                if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB) {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_c_must_be_followed_by_an_ASCII_letter, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                }
                else if (atomEscape) {
                    regExpParser.$go$private$scanner$incPos(p, -1);
                    return "\\";
                }
                return goStringEncodeRune(ch);
                break;
            }
            case 94:
            case 36:
            case 47:
            case 92:
            case 46:
            case 42:
            case 43:
            case 63:
            case 40:
            case 41:
            case 91:
            case 93:
            case 123:
            case 125:
            case 124: {
                regExpParser.$go$private$scanner$incPos(p, 1);
                return goStringEncodeRune(ch);
                break;
            }
            default: {
                regExpParser.$go$private$scanner$incPos(p, -1);
                let flags = EscapeSequenceScanningFlagsRegularExpression$constant();
                if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).annexB) {
                    flags = flags | 8;
                }
                if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeMode) {
                    flags = flags | 16;
                }
                if (atomEscape) {
                    flags = flags | 32;
                }
                return Scanner.$go$private$scanner$scanEscapeSequence((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner, flags);
                break;
            }
        }
    }
    static $go$private$scanner$scanClassAtom(p: regExpParser | undefined): gostring {
        if (regExpParser.$go$private$scanner$char(p) === 92) {
            regExpParser.$go$private$scanner$incPos(p, 1);
            let ch = regExpParser.$go$private$scanner$char(p);
            switch (ch) {
                case 98: {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    return "\b";
                    break;
                }
                case 45: {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    return goStringEncodeRune(ch);
                    break;
                }
                default: {
                    if (regExpParser.$go$private$scanner$scanCharacterClassEscape(p)) {
                        return "";
                    }
                    return regExpParser.$go$private$scanner$scanCharacterEscape(p, false);
                    break;
                }
            }
        }
        else {
            return regExpParser.$go$private$scanner$scanSourceCharacter(p);
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$scanner$scanClassRanges(p: regExpParser | undefined): void {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 91, RuntimeSlice.nil<GoInterface | undefined>());
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingLowSurrogate = 0;
        if (regExpParser.$go$private$scanner$char(p) === 94) {
            regExpParser.$go$private$scanner$incPos(p, 1);
        }
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;) {
            let ch = regExpParser.$go$private$scanner$char(p);
            if (regExpParser.$go$private$scanner$isClassContentExit(p, ch)) {
                return;
            }
            let minStart = regExpParser.$go$private$scanner$pos(p);
            let minCharacter = regExpParser.$go$private$scanner$scanClassAtom(p);
            if (regExpParser.$go$private$scanner$char(p) === 45) {
                regExpParser.$go$private$scanner$incPos(p, 1);
                ch = regExpParser.$go$private$scanner$char(p);
                if (regExpParser.$go$private$scanner$isClassContentExit(p, ch)) {
                    return;
                }
                if (minCharacter === "" && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB) {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, minStart, regExpParser.$go$private$scanner$pos(p) - 1 - minStart, RuntimeSlice.nil<GoInterface | undefined>());
                }
                let maxStart = regExpParser.$go$private$scanner$pos(p);
                let maxCharacter = regExpParser.$go$private$scanner$scanClassAtom(p);
                if (maxCharacter === "" && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeModeOrNonAnnexB) {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, maxStart, regExpParser.$go$private$scanner$pos(p) - maxStart, RuntimeSlice.nil<GoInterface | undefined>());
                    continue;
                }
                if (minCharacter === "") {
                    continue;
                }
                const __gotots_results_5 = DecodeJSStringRune__from_stringutil(minCharacter);
                let minCharacterValue = __gotots_results_5[0];
                let minSize = __gotots_results_5[1];
                const __gotots_results_6 = DecodeJSStringRune__from_stringutil(maxCharacter);
                let maxCharacterValue = __gotots_results_6[0];
                let maxSize = __gotots_results_6[1];
                if (minCharacter.length === minSize && maxCharacter.length === maxSize && minCharacterValue > maxCharacterValue) {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Range_out_of_order_in_character_class, minStart, regExpParser.$go$private$scanner$pos(p) - minStart, RuntimeSlice.nil<GoInterface | undefined>());
                }
            }
        }
    }
    static $go$private$scanner$scanClassSetCharacter(p: regExpParser | undefined): gostring {
        let ch = regExpParser.$go$private$scanner$char(p);
        if (ch === 92) {
            regExpParser.$go$private$scanner$incPos(p, 1);
            let innerCh = regExpParser.$go$private$scanner$char(p);
            switch (innerCh) {
                case 98: {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    return "\b";
                    break;
                }
                case 38:
                case 45:
                case 33:
                case 35:
                case 37:
                case 44:
                case 58:
                case 59:
                case 60:
                case 61:
                case 62:
                case 64:
                case 96:
                case 126: {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    return goStringEncodeRune(innerCh);
                    break;
                }
                default: {
                    return regExpParser.$go$private$scanner$scanCharacterEscape(p, false);
                    break;
                }
            }
        }
        else if (regExpParser.$go$private$scanner$pos(p) + 1 < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end && ch === regExpParser.$go$private$scanner$charAt(p, regExpParser.$go$private$scanner$pos(p) + 1)) {
            switch (ch) {
                case 38:
                case 33:
                case 35:
                case 37:
                case 42:
                case 43:
                case 44:
                case 46:
                case 58:
                case 59:
                case 60:
                case 61:
                case 62:
                case 63:
                case 64:
                case 96:
                case 126: {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.A_character_class_must_not_contain_a_reserved_double_punctuator_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p), 2, RuntimeSlice.nil<GoInterface | undefined>());
                    regExpParser.$go$private$scanner$incPos(p, 2);
                    return goStringSlice(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 2, regExpParser.$go$private$scanner$pos(p));
                    break;
                }
            }
        }
        switch (ch) {
            case 47:
            case 40:
            case 41:
            case 91:
            case 93:
            case 123:
            case 125:
            case 45:
            case 124: {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p), 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                regExpParser.$go$private$scanner$incPos(p, 1);
                return goStringEncodeRune(ch);
                break;
            }
        }
        return regExpParser.$go$private$scanner$scanSourceCharacter(p);
    }
    static $go$private$scanner$scanClassSetExpression(p: regExpParser | undefined): void {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 91, RuntimeSlice.nil<GoInterface | undefined>());
        let isCharacterComplement = false;
        if (regExpParser.$go$private$scanner$char(p) === 94) {
            regExpParser.$go$private$scanner$incPos(p, 1);
            isCharacterComplement = true;
        }
        let expressionMayContainStrings = false;
        let ch = regExpParser.$go$private$scanner$char(p);
        if (regExpParser.$go$private$scanner$isClassContentExit(p, ch)) {
            return;
        }
        let start = regExpParser.$go$private$scanner$pos(p);
        let operand = "";
        let twoChars = "";
        if (regExpParser.$go$private$scanner$pos(p) + 1 < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end) {
            twoChars = goStringSlice(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p), regExpParser.$go$private$scanner$pos(p) + 2);
        }
        switch (twoChars) {
            case "--":
            case "&&": {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Expected_a_class_set_operand, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.nil<GoInterface | undefined>());
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = false;
                break;
            }
            default: {
                operand = regExpParser.$go$private$scanner$scanClassSetOperand(p);
                break;
            }
        }
        switch (regExpParser.$go$private$scanner$char(p)) {
            case 45: {
                if (regExpParser.$go$private$scanner$pos(p) + 1 < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end && regExpParser.$go$private$scanner$charAt(p, regExpParser.$go$private$scanner$pos(p) + 1) === 45) {
                    if (isCharacterComplement && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings) {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, regExpParser.$go$private$scanner$pos(p) - start, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    expressionMayContainStrings = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings;
                    regExpParser.$go$private$scanner$scanClassSetSubExpression(p, classSetExpressionTypeClassSubtraction$constant());
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                    return;
                }
                break;
            }
            case 38: {
                if (regExpParser.$go$private$scanner$pos(p) + 1 < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end && regExpParser.$go$private$scanner$charAt(p, regExpParser.$go$private$scanner$pos(p) + 1) === 38) {
                    regExpParser.$go$private$scanner$scanClassSetSubExpression(p, classSetExpressionTypeClassIntersection$constant());
                    if (isCharacterComplement && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings) {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, regExpParser.$go$private$scanner$pos(p) - start, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    expressionMayContainStrings = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings;
                    (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                    return;
                }
                else {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p), 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                }
                break;
            }
            default: {
                if (isCharacterComplement && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings) {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, start, regExpParser.$go$private$scanner$pos(p) - start, RuntimeSlice.nil<GoInterface | undefined>());
                }
                expressionMayContainStrings = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings;
                break;
            }
        }
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;) {
            ch = regExpParser.$go$private$scanner$char(p);
            switch (ch) {
                case 45: {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    ch = regExpParser.$go$private$scanner$char(p);
                    if (regExpParser.$go$private$scanner$isClassContentExit(p, ch)) {
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
                        return;
                    }
                    if (ch === 45) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                        start = regExpParser.$go$private$scanner$pos(p) - 2;
                        operand = goStringSlice(regExpParser.$go$private$scanner$text(p), start, regExpParser.$go$private$scanner$pos(p));
                        continue;
                    }
                    else {
                        if (operand === "") {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, start, regExpParser.$go$private$scanner$pos(p) - 1 - start, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        let secondStart = regExpParser.$go$private$scanner$pos(p);
                        let secondOperand = regExpParser.$go$private$scanner$scanClassSetOperand(p);
                        if (isCharacterComplement && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Anything_that_would_possibly_match_more_than_a_single_character_is_invalid_inside_a_negated_character_class, secondStart, regExpParser.$go$private$scanner$pos(p) - secondStart, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        expressionMayContainStrings = expressionMayContainStrings || (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings;
                        if (secondOperand === "") {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.A_character_class_range_must_not_be_bounded_by_another_character_class, secondStart, regExpParser.$go$private$scanner$pos(p) - secondStart, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        else if (operand !== "") {
                            const __gotots_results_3 = DecodeJSStringRune__from_stringutil(operand);
                            let minCharacterValue = __gotots_results_3[0];
                            let minSize = __gotots_results_3[1];
                            const __gotots_results_4 = DecodeJSStringRune__from_stringutil(secondOperand);
                            let maxCharacterValue = __gotots_results_4[0];
                            let maxSize = __gotots_results_4[1];
                            if (operand.length === minSize && secondOperand.length === maxSize && minCharacterValue > maxCharacterValue) {
                                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Range_out_of_order_in_character_class, start, regExpParser.$go$private$scanner$pos(p) - start, RuntimeSlice.nil<GoInterface | undefined>());
                            }
                        }
                    }
                    break;
                }
                case 38: {
                    start = regExpParser.$go$private$scanner$pos(p);
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    if (regExpParser.$go$private$scanner$char(p) === 38) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                        if (regExpParser.$go$private$scanner$char(p) === 38) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p), 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                            regExpParser.$go$private$scanner$incPos(p, 1);
                        }
                    }
                    else {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p) - 1, 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                    }
                    operand = goStringSlice(regExpParser.$go$private$scanner$text(p), start, regExpParser.$go$private$scanner$pos(p));
                    continue;
                    break;
                }
            }
            if (regExpParser.$go$private$scanner$isClassContentExit(p, regExpParser.$go$private$scanner$char(p))) {
                break;
            }
            start = regExpParser.$go$private$scanner$pos(p);
            twoChars = "";
            if (regExpParser.$go$private$scanner$pos(p) + 1 < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end) {
                twoChars = goStringSlice(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p), regExpParser.$go$private$scanner$pos(p) + 2);
            }
            switch (twoChars) {
                case "--":
                case "&&": {
                    regExpParser.$go$private$scanner$error(p, $state__diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, regExpParser.$go$private$scanner$pos(p), 2, RuntimeSlice.nil<GoInterface | undefined>());
                    regExpParser.$go$private$scanner$incPos(p, 2);
                    operand = goStringSlice(regExpParser.$go$private$scanner$text(p), start, regExpParser.$go$private$scanner$pos(p));
                    break;
                }
                default: {
                    operand = regExpParser.$go$private$scanner$scanClassSetOperand(p);
                    break;
                }
            }
        }
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = !isCharacterComplement && expressionMayContainStrings;
    }
    static $go$private$scanner$scanClassSetOperand(p: regExpParser | undefined): gostring {
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = false;
        {
            const __gotots_switch_tag_3 = regExpParser.$go$private$scanner$char(p);
            let __gotots_switch_selection_3 = -1;
            if (__gotots_switch_selection_3 === -1) {
                let __gotots_switch_match_15 = false;
                if (!__gotots_switch_match_15) {
                    __gotots_switch_match_15 = __gotots_switch_tag_3 === 91;
                }
                if (__gotots_switch_match_15) {
                    __gotots_switch_selection_3 = 0;
                }
            }
            if (__gotots_switch_selection_3 === -1) {
                let __gotots_switch_match_16 = false;
                if (!__gotots_switch_match_16) {
                    __gotots_switch_match_16 = __gotots_switch_tag_3 === 92;
                }
                if (__gotots_switch_match_16) {
                    __gotots_switch_selection_3 = 1;
                }
            }
            if (__gotots_switch_selection_3 === -1) {
                __gotots_switch_selection_3 = 2;
            }
            __gotots_control_target_3: {
                if (__gotots_switch_selection_3 === 0) {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    regExpParser.$go$private$scanner$scanClassSetExpression(p);
                    regExpParser.$go$private$scanner$scanExpectedChar(p, 93);
                    return "";
                    break __gotots_control_target_3;
                }
                if (__gotots_switch_selection_3 === 1) {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    if (regExpParser.$go$private$scanner$scanCharacterClassEscape(p)) {
                        return "";
                    }
                    else if (regExpParser.$go$private$scanner$char(p) === 113) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        if (regExpParser.$go$private$scanner$char(p) === 123) {
                            regExpParser.$go$private$scanner$incPos(p, 1);
                            regExpParser.$go$private$scanner$scanClassStringDisjunctionContents(p);
                            regExpParser.$go$private$scanner$scanExpectedChar(p, 125);
                            return "";
                        }
                        else {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_q_must_be_followed_by_string_alternatives_enclosed_in_braces, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                            return "q";
                        }
                    }
                    regExpParser.$go$private$scanner$incPos(p, -1);
                    __gotots_switch_selection_3 = 2;
                }
                if (__gotots_switch_selection_3 === 2) {
                    return regExpParser.$go$private$scanner$scanClassSetCharacter(p);
                    break __gotots_control_target_3;
                }
            }
        }
        GoPanic.raiseRuntime("unreachable Go function end");
    }
    static $go$private$scanner$scanClassSetSubExpression(p: regExpParser | undefined, expressionType: classSetExpressionType): void {
        let expressionMayContainStrings = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings;
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;) {
            let ch = regExpParser.$go$private$scanner$char(p);
            if (regExpParser.$go$private$scanner$isClassContentExit(p, ch)) {
                break;
            }
            switch (ch) {
                case 45: {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    if (regExpParser.$go$private$scanner$char(p) === 45) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        if (!(expressionType.$value === classSetExpressionTypeClassSubtraction$constant().$value)) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                    }
                    else {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, regExpParser.$go$private$scanner$pos(p) - 1, 1, RuntimeSlice.nil<GoInterface | undefined>());
                    }
                    break;
                }
                case 38: {
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    if (regExpParser.$go$private$scanner$char(p) === 38) {
                        regExpParser.$go$private$scanner$incPos(p, 1);
                        if (!(expressionType.$value === classSetExpressionTypeClassIntersection$constant().$value)) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Operators_must_not_be_mixed_within_a_character_class_Wrap_it_in_a_nested_class_instead, regExpParser.$go$private$scanner$pos(p) - 2, 2, RuntimeSlice.nil<GoInterface | undefined>());
                        }
                        if (regExpParser.$go$private$scanner$char(p) === 38) {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p), 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                            regExpParser.$go$private$scanner$incPos(p, 1);
                        }
                    }
                    else {
                        regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unexpected_0_Did_you_mean_to_escape_it_with_backslash, regExpParser.$go$private$scanner$pos(p) - 1, 1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
                    }
                    break;
                }
                default: {
                    switch (expressionType.$value) {
                        case 3: {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_0_expected, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("--")]));
                            break;
                        }
                        case 2: {
                            regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_0_expected, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("&&")]));
                            break;
                        }
                    }
                    break;
                }
            }
            ch = regExpParser.$go$private$scanner$char(p);
            if (regExpParser.$go$private$scanner$isClassContentExit(p, ch)) {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Expected_a_class_set_operand, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.nil<GoInterface | undefined>());
                break;
            }
            regExpParser.$go$private$scanner$scanClassSetOperand(p);
            if (expressionType.$value === classSetExpressionTypeClassIntersection$constant().$value) {
                expressionMayContainStrings = expressionMayContainStrings && (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings;
            }
        }
        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = expressionMayContainStrings;
    }
    static $go$private$scanner$scanClassStringDisjunctionContents(p: regExpParser | undefined): void {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 123, RuntimeSlice.nil<GoInterface | undefined>());
        let characterCount = 0;
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;) {
            let ch = regExpParser.$go$private$scanner$char(p);
            switch (ch) {
                case 125: {
                    if (characterCount !== 1) {
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = true;
                    }
                    return;
                    break;
                }
                case 124: {
                    if (characterCount !== 1) {
                        (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).mayContainStrings = true;
                    }
                    regExpParser.$go$private$scanner$incPos(p, 1);
                    characterCount = 0;
                    break;
                }
                default: {
                    regExpParser.$go$private$scanner$scanClassSetCharacter(p);
                    characterCount++;
                    break;
                }
            }
        }
    }
    static $go$private$scanner$scanDecimalEscape(p: regExpParser | undefined): bool {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 92, RuntimeSlice.nil<GoInterface | undefined>());
        let ch = regExpParser.$go$private$scanner$char(p);
        if (ch >= 49 && ch <= 57) {
            let start = regExpParser.$go$private$scanner$pos(p);
            regExpParser.$go$private$scanner$scanDigits(p);
            const __gotots_results_14 = strconv__from_gostdlib.Atoi((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue);
            const __gotots_results_15 = [globalThis.Number(BigInt.asIntN(64, __gotots_results_14[0])), GoProviderInterfaceBridge.$from(__gotots_results_14[1])] satisfies [
                int,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let val = __gotots_results_15[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_15[1];
            if (!(err === undefined)) {
                val = MaxInt$int__from_math__package_1;
            }
            const __gotots_slice_build_4 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).decimalEscapes;
            const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
            let __gotots_slice_build_5 = __gotots_slice_build_4;
            if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void decimalEscapeValue.$storageOf, (void decimalEscapeValue.$fromStorage,
                    {
                        pos: start,
                        end: regExpParser.$go$private$scanner$pos(p),
                        value: val
                    })));
            }
            else {
                __gotots_slice_build_5 = goSliceAllocate<decimalEscapeValue$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                    __gotots_slice_build_5.set(__gotots_slice_build_7, decimalEscapeValue.$storageOf(decimalEscapeValue.$copy(decimalEscapeValue.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                }
                __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, (void decimalEscapeValue.$storageOf, (void decimalEscapeValue.$fromStorage,
                    {
                        pos: start,
                        end: regExpParser.$go$private$scanner$pos(p),
                        value: val
                    })));
                for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                    __gotots_slice_build_5.$initialize(__gotots_slice_build_7, decimalEscapeValue.$storageOf(decimalEscapeValue.$zero()));
                }
            }
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).decimalEscapes = __gotots_slice_build_5;
            return true;
        }
        return false;
    }
    static $go$private$scanner$scanDigits(p: regExpParser | undefined): void {
        let start = regExpParser.$go$private$scanner$pos(p);
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end && IsDigit__from_stringutil(regExpParser.$go$private$scanner$char(p));) {
            regExpParser.$go$private$scanner$incPos(p, 1);
        }
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue = goStringSlice(regExpParser.$go$private$scanner$text(p), start, regExpParser.$go$private$scanner$pos(p));
    }
    static $go$private$scanner$scanDisjunction(p: regExpParser | undefined, isInGroup: bool): void {
        for (;;) {
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups.append(GoMap.nil<gostring, bool>(false), [GoMap.make<gostring, bool>(false, 0, [])]);
            regExpParser.$go$private$scanner$scanAlternative(p, isInGroup);
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups.slice(0, (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups.length - 1, null);
            if (regExpParser.$go$private$scanner$char(p) !== 124) {
                return;
            }
            regExpParser.$go$private$scanner$incPos(p, 1);
        }
    }
    static $go$private$scanner$scanExpectedChar(p: regExpParser | undefined, ch: int32): void {
        if (regExpParser.$go$private$scanner$char(p) === ch) {
            regExpParser.$go$private$scanner$incPos(p, 1);
        }
        else {
            regExpParser.$go$private$scanner$error(p, $state__diagnostics.X_0_expected, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(goStringEncodeRune(ch))]));
        }
    }
    static $go$private$scanner$scanGroupName(p: regExpParser | undefined, isReference: bool): void {
        Assert__from_debug(regExpParser.$go$private$scanner$pos(p) > 0 && goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1) === 60, RuntimeSlice.nil<GoInterface | undefined>());
        (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart = regExpParser.$go$private$scanner$pos(p);
        Scanner.$go$private$scanner$scanIdentifier((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner, 0);
        if (regExpParser.$go$private$scanner$pos(p) === (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart) {
            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Expected_a_capturing_group_name, regExpParser.$go$private$scanner$pos(p), 0, RuntimeSlice.nil<GoInterface | undefined>());
        }
        else if (isReference) {
            const __gotots_slice_build_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).groupNameReferences;
            const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
            let __gotots_slice_build_1 = __gotots_slice_build_0;
            if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void groupNameReference.$storageOf, (void groupNameReference.$fromStorage,
                    {
                        pos: (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart,
                        end: regExpParser.$go$private$scanner$pos(p),
                        name: (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue
                    })));
            }
            else {
                __gotots_slice_build_1 = goSliceAllocate<groupNameReference$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.set(__gotots_slice_build_3, groupNameReference.$storageOf(groupNameReference.$copy(groupNameReference.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                }
                __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, (void groupNameReference.$storageOf, (void groupNameReference.$fromStorage,
                    {
                        pos: (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart,
                        end: regExpParser.$go$private$scanner$pos(p),
                        name: (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue
                    })));
                for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                    __gotots_slice_build_1.$initialize(__gotots_slice_build_3, groupNameReference.$storageOf(groupNameReference.$zero()));
                }
            }
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).groupNameReferences = __gotots_slice_build_1;
        }
        else if (regExpParser.$go$private$scanner$namedCapturingGroupsContains(p, (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue)) {
            regExpParser.$go$private$scanner$error(p, $state__diagnostics.Named_capturing_groups_with_the_same_name_must_be_mutually_exclusive_to_each_other, (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, regExpParser.$go$private$scanner$pos(p) - (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenStart, RuntimeSlice.nil<GoInterface | undefined>());
        }
        else {
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups.length > 0) {
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups.get((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedCapturingGroups.length - 1).store((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue, true);
            }
            (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).groupSpecifiers.store((((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.ScannerState.tokenValue, true);
        }
    }
    static $go$private$scanner$scanPatternModifiers(p: regExpParser | undefined, currFlags: regularExpressionFlags): regularExpressionFlags {
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;) {
            const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p)));
            const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
                int32,
                int
            ];
            let ch = __gotots_results_1[0];
            let size = __gotots_results_1[1];
            if (ch === RuneError$int32__from_utf8 || !IsIdentifierPart(ch)) {
                break;
            }
            const __gotots_results_2 = $state.charCodeToRegExpFlag.lookupOk(ch);
            let flag = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (!ok) {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Unknown_regular_expression_flag, regExpParser.$go$private$scanner$pos(p), size, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else if (!((currFlags & flag) === 0)) {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.Duplicate_regular_expression_flag, regExpParser.$go$private$scanner$pos(p), size, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else if ((flag & regularExpressionFlagsModifiers$constant()) === 0) {
                regExpParser.$go$private$scanner$error(p, $state__diagnostics.This_regular_expression_flag_cannot_be_toggled_within_a_subpattern, regExpParser.$go$private$scanner$pos(p), size, RuntimeSlice.nil<GoInterface | undefined>());
            }
            else {
                currFlags = currFlags | flag;
                Scanner.$go$private$scanner$checkRegularExpressionFlagAvailability((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner, flag, regExpParser.$go$private$scanner$pos(p), size);
            }
            regExpParser.$go$private$scanner$incPos(p, size);
        }
        return currFlags;
    }
    static $go$private$scanner$scanSourceCharacter(p: regExpParser | undefined): gostring {
        if (regExpParser.$go$private$scanner$pos(p) >= (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end) {
            return "";
        }
        if (!(p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).anyUnicodeMode) {
            if ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingLowSurrogate !== 0) {
                const __gotots_results_7 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p)));
                const __gotots_results_8 = [__gotots_results_7[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_7[1]))] satisfies [
                    int32,
                    int
                ];
                let size__shadow_2 = __gotots_results_8[1];
                regExpParser.$go$private$scanner$incPos(p, size__shadow_2);
                let low = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingLowSurrogate;
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingLowSurrogate = 0;
                return EncodeJSStringRune__from_stringutil(low);
            }
            const __gotots_results_9 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p)));
            const __gotots_results_10 = [__gotots_results_9[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_9[1]))] satisfies [
                int32,
                int
            ];
            let ch__shadow_1 = __gotots_results_10[0];
            let size__shadow_1 = __gotots_results_10[1];
            if (ch__shadow_1 === RuneError$int32__from_utf8 || size__shadow_1 === 0) {
                regExpParser.$go$private$scanner$incPos(p, 1);
                return goStringEncodeRune(goStringIndex(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p) - 1));
            }
            if (globalThis.Number(BigInt.asIntN(64, utf16__from_gostdlib.RuneLen(ch__shadow_1))) === 2) {
                const __gotots_results_11 = CodePointToSurrogatePair__from_stringutil(ch__shadow_1);
                let high = __gotots_results_11[0];
                let low = __gotots_results_11[1];
                (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pendingLowSurrogate = low;
                return EncodeJSStringRune__from_stringutil(high);
            }
            regExpParser.$go$private$scanner$incPos(p, size__shadow_1);
            return goStringEncodeRune(ch__shadow_1);
        }
        const __gotots_results_12 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(regExpParser.$go$private$scanner$text(p), regExpParser.$go$private$scanner$pos(p)));
        const __gotots_results_13 = [__gotots_results_12[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_12[1]))] satisfies [
            int32,
            int
        ];
        let ch = __gotots_results_13[0];
        let size = __gotots_results_13[1];
        if (size === 0) {
            return "";
        }
        if (ch === RuneError$int32__from_utf8) {
            regExpParser.$go$private$scanner$incPos(p, size);
            return "";
        }
        regExpParser.$go$private$scanner$incPos(p, size);
        return goStringEncodeRune(ch);
    }
    static $go$private$scanner$scanWordCharacters(p: regExpParser | undefined): gostring {
        let start = regExpParser.$go$private$scanner$pos(p);
        for (; regExpParser.$go$private$scanner$pos(p) < (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).end;) {
            let ch = regExpParser.$go$private$scanner$char(p);
            if (!isWordCharacter(ch)) {
                break;
            }
            regExpParser.$go$private$scanner$incPos(p, 1);
        }
        return goStringSlice(regExpParser.$go$private$scanner$text(p), start, regExpParser.$go$private$scanner$pos(p));
    }
    static $go$private$scanner$text(p: regExpParser | undefined): gostring {
        return (((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).scanner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Scanner>).value.text;
    }
}
export function compareDecimalStrings(a: gostring, b: gostring): int {
    a = strings__from_gostdlib.TrimLeft(a, "0");
    b = strings__from_gostdlib.TrimLeft(b, "0");
    if (a === "") {
        a = "0";
    }
    if (b === "") {
        b = "0";
    }
    if (a.length !== b.length) {
        if (a.length < b.length) {
            return -1;
        }
        return 1;
    }
    return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(a, b)));
}
