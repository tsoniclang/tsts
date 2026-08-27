import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ImportDeclaration as ImportDeclaration__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, NamedImports as NamedImports__from_ast, Node$Storage as Node__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { Option$Storage as Option__from_collate$Storage } from "../../../../../../../packages/golang.org/x/text@v0.38.0/collate/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { GoContainerStorage } from "@gotots/runtime/storage.js";
import { CallExpression as CallExpression__from_ast, ImportClause as ImportClause__from_ast, IsStringLiteralLike as IsStringLiteralLike__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindExternalModuleReference$constant as KindExternalModuleReference$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast, VariableStatement as VariableStatement__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { BoolToTristate as BoolToTristate__from_core, CompareBooleans as CompareBooleans__from_core, TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core, Tristate_IsFalse as Tristate_IsFalse__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, Tristate_IsUnknown as Tristate_IsUnknown__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { $state as $state__locale, Locale as Locale__from_locale, Parse as Parse__from_locale } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/locale/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/state.js";
import { ImportModuleSpecifierEndingPreference as ImportModuleSpecifierEndingPreference__from_modulespecifiers, ImportModuleSpecifierPreference as ImportModuleSpecifierPreference__from_modulespecifiers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { CompareStringsCaseInsensitiveEslintCompatible as CompareStringsCaseInsensitiveEslintCompatible__from_stringutil, CompareStringsCaseSensitive as CompareStringsCaseSensitive__from_stringutil } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { IsExternalModuleNameRelative as IsExternalModuleNameRelative__from_tspath } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/package.js";
import { $state as $state__collate, Collator as Collator__from_collate, New as New__from_collate, Option as Option__from_collate } from "../../../../../../../packages/golang.org/x/text@v0.38.0/collate/package.js";
import { Parse as Parse__from_language__package_1, Tag as Tag__from_language__package_1 } from "../../../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import { MaxInt$int as MaxInt$int__from_math__package_1 } from "../../../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/math/index.js";
import { Compare$int } from "../../../../../../../support/generics/concretizations/cmp/Compare.js";
import { BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BinarySearchUniqueFunc.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { FirstResult$int } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/FirstResult.js";
import { measureSortedness$PointerTo_Named_ast$Node, measureSortedness$string } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/ls/lsutil/measureSortedness.js";
import { $goInterfaceAdapter$bool as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_lsutil$OrganizeImportsTypeOrder_To_string_string_to_int, $goMap$MapOf_Named_lsutil$OrganizeImportsTypeOrder_To_int as GoMap } from "../../../../../../../support/maps.js";
import { FormatCodeSettings } from "./formatcodeoptions.js";
import { CodeLensUserPreferences, InlayHintsPreferences, JsxAttributeCompletionStyle, OrganizeImportsCaseFirst, OrganizeImportsCollation, OrganizeImportsCollationUnicode$constant, OrganizeImportsTypeOrder, OrganizeImportsTypeOrderAuto$constant, OrganizeImportsTypeOrderFirst$constant, OrganizeImportsTypeOrderInline$constant, OrganizeImportsTypeOrderLast$constant, QuotePreference, UserPreferences } from "./userpreferences.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringDecodeRune } from "@gotots/runtime/string.js";
export function FilterImportDeclarations(statements: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return Filter$PointerTo_Named_ast$Node(statements, (stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.$storageOf(((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast();
    });
}
export function GetDetectionLists(preferences: UserPreferences): [
    RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>,
    RuntimeSlice<int>
] {
    let comparersToTest: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined> = RuntimeSlice.nil<(($0: gostring, $1: gostring) => int) | undefined>();
    let typeOrdersToTest: RuntimeSlice<int> = RuntimeSlice.nil<int>();
    if (!Tristate_IsUnknown__from_core(preferences.OrganizeImportsIgnoreCase)) {
        let ignoreCase = Tristate_IsTrue__from_core(preferences.OrganizeImportsIgnoreCase);
        comparersToTest = RuntimeSlice.literal<(($0: gostring, $1: gostring) => int) | undefined>([getOrganizeImportsStringComparer(UserPreferences.$copy(preferences), ignoreCase)]);
    }
    else {
        comparersToTest = RuntimeSlice.literal<(($0: gostring, $1: gostring) => int) | undefined>([getOrganizeImportsStringComparer(UserPreferences.$copy(preferences), true), getOrganizeImportsStringComparer(UserPreferences.$copy(preferences), false)]);
    }
    if (!(preferences.OrganizeImportsTypeOrder.$value === OrganizeImportsTypeOrderAuto$constant().$value)) {
        typeOrdersToTest = RuntimeSlice.literal<int>([preferences.OrganizeImportsTypeOrder.$value]);
    }
    else {
        typeOrdersToTest = RuntimeSlice.literal<int>([OrganizeImportsTypeOrderLast$constant().$value, OrganizeImportsTypeOrderInline$constant().$value, OrganizeImportsTypeOrderFirst$constant().$value]);
    }
    return [comparersToTest, typeOrdersToTest];
}
export function getOrganizeImportsOrdinalStringComparer(ignoreCase: bool): (($0: gostring, $1: gostring) => int) | undefined {
    if (ignoreCase) {
        return CompareStringsCaseInsensitiveEslintCompatible__from_stringutil;
    }
    return CompareStringsCaseSensitive__from_stringutil;
}
export function getOrganizeImportsUnicodeStringComparer(ignoreCase: bool, preferences: UserPreferences): (($0: gostring, $1: gostring) => int) | undefined {
    let resolvedLocale = getOrganizeImportsLocale(UserPreferences.$copy(preferences));
    let caseFirst = preferences.OrganizeImportsCaseFirst;
    let numeric = Tristate_IsTrue__from_core(preferences.OrganizeImportsNumericCollation);
    let accents = !Tristate_IsFalse__from_core(preferences.OrganizeImportsAccentCollation);
    const __gotots_results_4 = Parse__from_language__package_1(resolvedLocale);
    let tag = __gotots_results_4[0];
    let opts = RuntimeSlice.nil<Option__from_collate$Storage>();
    if (numeric) {
        const __gotots_slice_build_0 = opts;
        const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
        let __gotots_slice_build_1 = __gotots_slice_build_0;
        if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
            __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.Numeric))));
        }
        else {
            __gotots_slice_build_1 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
            for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                __gotots_slice_build_1.set(__gotots_slice_build_3, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
            }
            __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.Numeric))));
            for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                __gotots_slice_build_1.$initialize(__gotots_slice_build_3, Option__from_collate.$storageOf(Option__from_collate.$zero()));
            }
        }
        opts = __gotots_slice_build_1;
    }
    const __gotots_slice_build_4 = RuntimeSlice.literal<Option__from_collate$Storage>([]);
    const __gotots_slice_build_5 = opts;
    let __gotots_slice_build_6 = __gotots_slice_build_5;
    if (__gotots_slice_build_5.length > 0) {
        __gotots_slice_build_6 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_5.length, null);
        for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_5.length; __gotots_slice_build_9++) {
            __gotots_slice_build_6.set(__gotots_slice_build_9, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_5.get(__gotots_slice_build_9)))));
        }
    }
    const __gotots_slice_build_8 = __gotots_slice_build_4.length + __gotots_slice_build_6.length;
    let __gotots_slice_build_7 = __gotots_slice_build_4;
    if (__gotots_slice_build_8 <= __gotots_slice_build_4.capacity) {
        __gotots_slice_build_7 = __gotots_slice_build_4.$withLength(__gotots_slice_build_8);
        for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
            __gotots_slice_build_7.set(__gotots_slice_build_4.length + __gotots_slice_build_9, __gotots_slice_build_6.get(__gotots_slice_build_9));
        }
    }
    else {
        __gotots_slice_build_7 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_8, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_8));
        for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_4.length; __gotots_slice_build_9++) {
            __gotots_slice_build_7.set(__gotots_slice_build_9, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_9)))));
        }
        for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
            __gotots_slice_build_7.set(__gotots_slice_build_4.length + __gotots_slice_build_9, __gotots_slice_build_6.get(__gotots_slice_build_9));
        }
        for (let __gotots_slice_build_9 = __gotots_slice_build_8; __gotots_slice_build_9 < __gotots_slice_build_7.capacity; __gotots_slice_build_9++) {
            __gotots_slice_build_7.$initialize(__gotots_slice_build_9, Option__from_collate.$storageOf(Option__from_collate.$zero()));
        }
    }
    let looseOpts = __gotots_slice_build_7;
    const __gotots_slice_build_10 = looseOpts;
    const __gotots_slice_build_12 = __gotots_slice_build_10.length + 1;
    let __gotots_slice_build_11 = __gotots_slice_build_10;
    if (__gotots_slice_build_12 <= __gotots_slice_build_10.capacity) {
        __gotots_slice_build_11 = __gotots_slice_build_10.$withLength(__gotots_slice_build_12);
        __gotots_slice_build_11.set(__gotots_slice_build_10.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.Loose))));
    }
    else {
        __gotots_slice_build_11 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_12, RuntimeSlice.$grownCapacity(__gotots_slice_build_10.capacity, __gotots_slice_build_12));
        for (let __gotots_slice_build_13 = 0; __gotots_slice_build_13 < __gotots_slice_build_10.length; __gotots_slice_build_13++) {
            __gotots_slice_build_11.set(__gotots_slice_build_13, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_10.get(__gotots_slice_build_13)))));
        }
        __gotots_slice_build_11.set(__gotots_slice_build_10.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.Loose))));
        for (let __gotots_slice_build_13 = __gotots_slice_build_12; __gotots_slice_build_13 < __gotots_slice_build_11.capacity; __gotots_slice_build_13++) {
            __gotots_slice_build_11.$initialize(__gotots_slice_build_13, Option__from_collate.$storageOf(Option__from_collate.$zero()));
        }
    }
    looseOpts = __gotots_slice_build_11;
    let looseCollator: Collator__from_collate | undefined = New__from_collate(Tag__from_language__package_1.$copy(tag), looseOpts);
    if (!ignoreCase) {
        const __gotots_slice_build_14 = RuntimeSlice.literal<Option__from_collate$Storage>([]);
        const __gotots_slice_build_15 = opts;
        let __gotots_slice_build_16 = __gotots_slice_build_15;
        if (__gotots_slice_build_15.length > 0) {
            __gotots_slice_build_16 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_15.length, null);
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_15.length; __gotots_slice_build_19++) {
                __gotots_slice_build_16.set(__gotots_slice_build_19, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_15.get(__gotots_slice_build_19)))));
            }
        }
        const __gotots_slice_build_18 = __gotots_slice_build_14.length + __gotots_slice_build_16.length;
        let __gotots_slice_build_17 = __gotots_slice_build_14;
        if (__gotots_slice_build_18 <= __gotots_slice_build_14.capacity) {
            __gotots_slice_build_17 = __gotots_slice_build_14.$withLength(__gotots_slice_build_18);
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                __gotots_slice_build_17.set(__gotots_slice_build_14.length + __gotots_slice_build_19, __gotots_slice_build_16.get(__gotots_slice_build_19));
            }
        }
        else {
            __gotots_slice_build_17 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_18, RuntimeSlice.$grownCapacity(__gotots_slice_build_14.capacity, __gotots_slice_build_18));
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_14.length; __gotots_slice_build_19++) {
                __gotots_slice_build_17.set(__gotots_slice_build_19, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_14.get(__gotots_slice_build_19)))));
            }
            for (let __gotots_slice_build_19 = 0; __gotots_slice_build_19 < __gotots_slice_build_16.length; __gotots_slice_build_19++) {
                __gotots_slice_build_17.set(__gotots_slice_build_14.length + __gotots_slice_build_19, __gotots_slice_build_16.get(__gotots_slice_build_19));
            }
            for (let __gotots_slice_build_19 = __gotots_slice_build_18; __gotots_slice_build_19 < __gotots_slice_build_17.capacity; __gotots_slice_build_19++) {
                __gotots_slice_build_17.$initialize(__gotots_slice_build_19, Option__from_collate.$storageOf(Option__from_collate.$zero()));
            }
        }
        let caseInsensitiveOpts = __gotots_slice_build_17;
        const __gotots_slice_build_20 = caseInsensitiveOpts;
        const __gotots_slice_build_22 = __gotots_slice_build_20.length + 1;
        let __gotots_slice_build_21 = __gotots_slice_build_20;
        if (__gotots_slice_build_22 <= __gotots_slice_build_20.capacity) {
            __gotots_slice_build_21 = __gotots_slice_build_20.$withLength(__gotots_slice_build_22);
            __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.IgnoreCase))));
        }
        else {
            __gotots_slice_build_21 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_22, RuntimeSlice.$grownCapacity(__gotots_slice_build_20.capacity, __gotots_slice_build_22));
            for (let __gotots_slice_build_23 = 0; __gotots_slice_build_23 < __gotots_slice_build_20.length; __gotots_slice_build_23++) {
                __gotots_slice_build_21.set(__gotots_slice_build_23, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_20.get(__gotots_slice_build_23)))));
            }
            __gotots_slice_build_21.set(__gotots_slice_build_20.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.IgnoreCase))));
            for (let __gotots_slice_build_23 = __gotots_slice_build_22; __gotots_slice_build_23 < __gotots_slice_build_21.capacity; __gotots_slice_build_23++) {
                __gotots_slice_build_21.$initialize(__gotots_slice_build_23, Option__from_collate.$storageOf(Option__from_collate.$zero()));
            }
        }
        caseInsensitiveOpts = __gotots_slice_build_21;
        let caseInsensitiveCollator: Collator__from_collate | undefined = New__from_collate(Tag__from_language__package_1.$copy(tag), caseInsensitiveOpts);
        let fullCollator: Collator__from_collate | undefined = New__from_collate(Tag__from_language__package_1.$copy(tag), opts);
        return (a: gostring, b: gostring): int => {
            let primaryCmp = 0;
            if (!accents) {
                primaryCmp = Collator__from_collate.CompareString(looseCollator, a, b);
            }
            else {
                primaryCmp = Collator__from_collate.CompareString(caseInsensitiveCollator, a, b);
            }
            if (primaryCmp !== 0) {
                return primaryCmp;
            }
            const __gotots_conversion_0 = a;
            let __gotots_conversion_1 = RuntimeSlice.make<int32>(0, __gotots_conversion_0.length, 0);
            let __gotots_conversion_2 = 0;
            while (__gotots_conversion_2 < __gotots_conversion_0.length) {
                const __gotots_conversion_3 = goStringDecodeRune(__gotots_conversion_0, __gotots_conversion_2);
                __gotots_conversion_1 = __gotots_conversion_1.append(0, [__gotots_conversion_3[0]]);
                __gotots_conversion_2 += __gotots_conversion_3[1];
            }
            let aRunes = __gotots_conversion_1;
            const __gotots_conversion_4 = b;
            let __gotots_conversion_5 = RuntimeSlice.make<int32>(0, __gotots_conversion_4.length, 0);
            let __gotots_conversion_6 = 0;
            while (__gotots_conversion_6 < __gotots_conversion_4.length) {
                const __gotots_conversion_7 = goStringDecodeRune(__gotots_conversion_4, __gotots_conversion_6);
                __gotots_conversion_5 = __gotots_conversion_5.append(0, [__gotots_conversion_7[0]]);
                __gotots_conversion_6 += __gotots_conversion_7[1];
            }
            let bRunes = __gotots_conversion_5;
            let minLen = globalThis.Math.min(aRunes.length, bRunes.length);
            const __gotots_range_16 = minLen;
            for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_16; __gotots_range_index_16++) {
                const __gotots_range_value_18 = __gotots_range_index_16;
                let i = __gotots_range_value_18;
                let aUpper = unicode__from_gostdlib.IsUpper(aRunes.get(i));
                let bUpper = unicode__from_gostdlib.IsUpper(bRunes.get(i));
                if (aUpper !== bUpper) {
                    switch (caseFirst.$value) {
                        case 2: {
                            if (aUpper) {
                                return -1;
                            }
                            return 1;
                            break;
                        }
                        case 1: {
                            if (!aUpper) {
                                return -1;
                            }
                            return 1;
                            break;
                        }
                        default: {
                            if (aUpper) {
                                return 1;
                            }
                            return -1;
                            break;
                        }
                    }
                }
            }
            if (!accents) {
                if (aRunes.length !== bRunes.length) {
                    return aRunes.length - bRunes.length;
                }
                return 0;
            }
            return Collator__from_collate.CompareString(fullCollator, a, b);
        };
    }
    if (ignoreCase) {
        const __gotots_slice_build_24 = opts;
        const __gotots_slice_build_26 = __gotots_slice_build_24.length + 1;
        let __gotots_slice_build_25 = __gotots_slice_build_24;
        if (__gotots_slice_build_26 <= __gotots_slice_build_24.capacity) {
            __gotots_slice_build_25 = __gotots_slice_build_24.$withLength(__gotots_slice_build_26);
            __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.IgnoreCase))));
        }
        else {
            __gotots_slice_build_25 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_26, RuntimeSlice.$grownCapacity(__gotots_slice_build_24.capacity, __gotots_slice_build_26));
            for (let __gotots_slice_build_27 = 0; __gotots_slice_build_27 < __gotots_slice_build_24.length; __gotots_slice_build_27++) {
                __gotots_slice_build_25.set(__gotots_slice_build_27, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_24.get(__gotots_slice_build_27)))));
            }
            __gotots_slice_build_25.set(__gotots_slice_build_24.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.IgnoreCase))));
            for (let __gotots_slice_build_27 = __gotots_slice_build_26; __gotots_slice_build_27 < __gotots_slice_build_25.capacity; __gotots_slice_build_27++) {
                __gotots_slice_build_25.$initialize(__gotots_slice_build_27, Option__from_collate.$storageOf(Option__from_collate.$zero()));
            }
        }
        opts = __gotots_slice_build_25;
        if (!accents) {
            const __gotots_slice_build_28 = opts;
            const __gotots_slice_build_30 = __gotots_slice_build_28.length + 1;
            let __gotots_slice_build_29 = __gotots_slice_build_28;
            if (__gotots_slice_build_30 <= __gotots_slice_build_28.capacity) {
                __gotots_slice_build_29 = __gotots_slice_build_28.$withLength(__gotots_slice_build_30);
                __gotots_slice_build_29.set(__gotots_slice_build_28.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.Loose))));
            }
            else {
                __gotots_slice_build_29 = goSliceAllocate<Option__from_collate$Storage>(__gotots_slice_build_30, RuntimeSlice.$grownCapacity(__gotots_slice_build_28.capacity, __gotots_slice_build_30));
                for (let __gotots_slice_build_31 = 0; __gotots_slice_build_31 < __gotots_slice_build_28.length; __gotots_slice_build_31++) {
                    __gotots_slice_build_29.set(__gotots_slice_build_31, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage(__gotots_slice_build_28.get(__gotots_slice_build_31)))));
                }
                __gotots_slice_build_29.set(__gotots_slice_build_28.length + 0, Option__from_collate.$storageOf(Option__from_collate.$copy(Option__from_collate.$fromStorage($state__collate.Loose))));
                for (let __gotots_slice_build_31 = __gotots_slice_build_30; __gotots_slice_build_31 < __gotots_slice_build_29.capacity; __gotots_slice_build_31++) {
                    __gotots_slice_build_29.$initialize(__gotots_slice_build_31, Option__from_collate.$storageOf(Option__from_collate.$zero()));
                }
            }
            opts = __gotots_slice_build_29;
        }
    }
    let collator: Collator__from_collate | undefined = New__from_collate(Tag__from_language__package_1.$copy(tag), opts);
    return (a: gostring, b: gostring): int => {
        return Collator__from_collate.CompareString(collator, a, b);
    };
}
export function getOrganizeImportsLocale(preferences: UserPreferences): gostring {
    let localeStr = "en";
    if (preferences.OrganizeImportsLocale !== "") {
        localeStr = preferences.OrganizeImportsLocale;
    }
    if (localeStr === "auto") {
        const __gotots_equal_operand_0 = Locale__from_locale.$fromStorage($state__locale.Default);
        const __gotots_struct_0 = Locale__from_locale.$zero();
        if (!Locale__from_locale.$equal(__gotots_equal_operand_0, (__gotots_struct_0))) {
            let tag = Tag__from_language__package_1.$fromStorage(Locale__from_locale.$storageOf(Locale__from_locale.$copy(Locale__from_locale.$fromStorage($state__locale.Default))));
            return tag.String();
        }
        return "en";
    }
    {
        const __gotots_results_5 = Parse__from_locale(localeStr);
        let locale__shadow_1 = __gotots_results_5[0];
        let ok = __gotots_results_5[1];
        if (ok) {
            let tag = Tag__from_language__package_1.$fromStorage(Locale__from_locale.$storageOf(Locale__from_locale.$copy(locale__shadow_1)));
            return tag.String();
        }
    }
    return "en";
}
export function getOrganizeImportsStringComparer(preferences: UserPreferences, ignoreCase: bool): (($0: gostring, $1: gostring) => int) | undefined {
    let collation = preferences.OrganizeImportsCollation;
    if (collation.$value === OrganizeImportsCollationUnicode$constant().$value) {
        return getOrganizeImportsUnicodeStringComparer(ignoreCase, UserPreferences.$copy(preferences));
    }
    return getOrganizeImportsOrdinalStringComparer(ignoreCase);
}
export function getModuleSpecifierExpression(declaration: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    switch (Node__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindImportEqualsDeclaration$constant__from_ast(): {
            let importEquals: {
                value: ImportEqualsDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportEqualsDeclaration(declaration);
            if (Node__from_ast.$storageOf((((importEquals ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExternalModuleReference$constant__from_ast()) {
                return Node__from_ast.Expression((importEquals ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleReference);
            }
            return void 0;
            break;
        }
        case KindImportDeclaration$constant__from_ast(): {
            return Node__from_ast.ModuleSpecifier(declaration);
            break;
        }
        case KindVariableStatement$constant__from_ast(): {
            let declarations = NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(VariableStatement__from_ast.$storageOf(((Node__from_ast.AsVariableStatement(declaration) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableStatement__from_ast>).value).DeclarationList) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            if (declarations.length > 0) {
                let initializer: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(declarations.get(0));
                if (!(initializer === undefined) && Node__from_ast.$storageOf(((initializer ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCallExpression$constant__from_ast()) {
                    let callExpr: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(initializer);
                    if (NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((callExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                        return NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((callExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
                    }
                }
            }
            return void 0;
            break;
        }
        default: {
            return void 0;
            break;
        }
    }
}
export function GetExternalModuleName(specifier: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): gostring {
    if (!(specifier === undefined) && IsStringLiteralLike__from_ast(Node__from_ast.AsNode(specifier))) {
        return Node__from_ast.Text(specifier);
    }
    return "";
}
export function CompareModuleSpecifiers(m1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, m2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, comparer: (($0: gostring, $1: gostring) => int) | undefined): int {
    let name1 = GetExternalModuleName(m1);
    let name2 = GetExternalModuleName(m2);
    {
        let cmp__shadow_1 = CompareBooleans__from_core(name1 === "", name2 === "");
        if (cmp__shadow_1 !== 0) {
            return cmp__shadow_1;
        }
    }
    {
        let cmp__shadow_1 = CompareBooleans__from_core(IsExternalModuleNameRelative__from_tspath(name1), IsExternalModuleNameRelative__from_tspath(name2));
        if (cmp__shadow_1 !== 0) {
            return cmp__shadow_1;
        }
    }
    const __gotots_callee_2 = comparer;
    const __gotots_argument_4 = name1;
    const __gotots_argument_5 = name2;
    return (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5);
}
export function compareImportKind(s1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, s2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
    return Compare$int(getImportKindOrder(s1), getImportKindOrder(s2));
}
export const importKindOrderSideEffect$int: int = 0;
export const importKindOrderTypeOnly$int: int = 1;
export const importKindOrderNamespace$int: int = 2;
export const importKindOrderDefault$int: int = 3;
export const importKindOrderNamed$int: int = 4;
export const importKindOrderImportEquals$int: int = 5;
export const importKindOrderRequire$int: int = 6;
export const importKindOrderUnknown$int: int = 7;
export function getImportKindOrder(s1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int {
    switch (Node__from_ast.$storageOf(((s1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindImportDeclaration$constant__from_ast(): {
            let importDecl: {
                value: ImportDeclaration__from_ast;
            } | undefined = Node__from_ast.AsImportDeclaration(s1);
            if ((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
                return importKindOrderSideEffect$int;
            }
            let importClause: {
                value: ImportClause__from_ast;
            } | undefined = Node__from_ast.AsImportClause((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
            const __gotots_store_0 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
            if (Node__from_ast.IsTypeOnly(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
                return Node__from_ast.$fromStorage($go$storage);
            }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
                return Node__from_ast.$storageOf($go$value);
            }))) {
                return importKindOrderTypeOnly$int;
            }
            if (!((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) && Node__from_ast.$storageOf((((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamespaceImport$constant__from_ast()) {
                return importKindOrderNamespace$int;
            }
            if (!(ImportClause__from_ast.Name(importClause) === undefined)) {
                return importKindOrderDefault$int;
            }
            return importKindOrderNamed$int;
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast(): {
            return importKindOrderImportEquals$int;
            break;
        }
        case KindVariableStatement$constant__from_ast(): {
            return importKindOrderRequire$int;
            break;
        }
        default: {
            return importKindOrderUnknown$int;
            break;
        }
    }
}
export function CompareImportsOrRequireStatements(s1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, s2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, comparer: (($0: gostring, $1: gostring) => int) | undefined): int {
    {
        let cmp__shadow_1 = CompareModuleSpecifiers(getModuleSpecifierExpression(s1), getModuleSpecifierExpression(s2), comparer);
        if (cmp__shadow_1 !== 0) {
            return cmp__shadow_1;
        }
    }
    return compareImportKind(s1, s2);
}
export function compareImportOrExportSpecifiers(s1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, s2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, comparer: (($0: gostring, $1: gostring) => int) | undefined, preferences: UserPreferences): int {
    let typeOrder = preferences.OrganizeImportsTypeOrder;
    let s1Name = Node__from_ast.Text(Node__from_ast.Name(s1));
    let s2Name = Node__from_ast.Text(Node__from_ast.Name(s2));
    switch (typeOrder.$value) {
        case 3: {
            {
                let cmp__shadow_1 = CompareBooleans__from_core(Node__from_ast.IsTypeOnly(s2), Node__from_ast.IsTypeOnly(s1));
                if (cmp__shadow_1 !== 0) {
                    return cmp__shadow_1;
                }
            }
            const __gotots_callee_3 = comparer;
            const __gotots_argument_6 = s1Name;
            const __gotots_argument_7 = s2Name;
            return (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
            break;
        }
        case 2: {
            const __gotots_callee_4 = comparer;
            const __gotots_argument_8 = s1Name;
            const __gotots_argument_9 = s2Name;
            return (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8, __gotots_argument_9);
            break;
        }
        default: {
            {
                let cmp__shadow_1 = CompareBooleans__from_core(Node__from_ast.IsTypeOnly(s1), Node__from_ast.IsTypeOnly(s2));
                if (cmp__shadow_1 !== 0) {
                    return cmp__shadow_1;
                }
            }
            const __gotots_callee_5 = comparer;
            const __gotots_argument_10 = s1Name;
            const __gotots_argument_11 = s2Name;
            return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11);
            break;
        }
    }
}
export function GetNamedImportSpecifierComparer(preferences: UserPreferences, comparer: (($0: gostring, $1: gostring) => int) | undefined): (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined {
    if (comparer === undefined) {
        let ignoreCase = false;
        if (!Tristate_IsUnknown__from_core(preferences.OrganizeImportsIgnoreCase)) {
            ignoreCase = Tristate_IsTrue__from_core(preferences.OrganizeImportsIgnoreCase);
        }
        comparer = getOrganizeImportsOrdinalStringComparer(ignoreCase);
    }
    return (s1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, s2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
        return compareImportOrExportSpecifiers(s1, s2, comparer, UserPreferences.$copy(preferences));
    };
}
export function GetImportSpecifierInsertionIndex(sortedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, newImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, comparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined): int {
    const __gotots_results_1 = BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(sortedImports, (mid: int, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
        const __gotots_callee_0 = comparer;
        const __gotots_argument_0 = value;
        const __gotots_argument_1 = newImport;
        return (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
    });
    return FirstResult$int(__gotots_results_1[0], RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(__gotots_results_1[1])]));
}
export function GetImportDeclarationInsertIndex(sortedImports: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, newImport: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, comparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined): int {
    const __gotots_results_3 = BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(sortedImports, (mid: int, value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
        const __gotots_callee_1 = comparer;
        const __gotots_argument_2 = value;
        const __gotots_argument_3 = newImport;
        return (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2, __gotots_argument_3);
    });
    return FirstResult$int(__gotots_results_3[0], RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(__gotots_results_3[1])]));
}
export function GetOrganizeImportsStringComparerWithDetection(originalImportDecls: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, preferences: UserPreferences): [
    (($0: gostring, $1: gostring) => int) | undefined,
    bool
] {
    let comparer: (($0: gostring, $1: gostring) => int) | undefined = void 0;
    let isSorted: bool = false;
    const __gotots_results_2 = DetectModuleSpecifierCaseBySort(RuntimeSlice.literal<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>([originalImportDecls]), getComparers(UserPreferences.$copy(preferences)));
    let result: (($0: gostring, $1: gostring) => int) | undefined = __gotots_results_2[0];
    let sorted = __gotots_results_2[1];
    return [result, sorted];
}
export function getComparers(preferences: UserPreferences): RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined> {
    switch (preferences.OrganizeImportsIgnoreCase) {
        case TSTrue$constant__from_core(): {
            return $state.caseInsensitiveOrganizeImportsComparer;
            break;
        }
        case TSFalse$constant__from_core(): {
            return $state.caseSensitiveOrganizeImportsComparer;
            break;
        }
    }
    return $state.organizeImportsComparers;
}
export class namedImportSortResult {
    declare private readonly $goType: void;
    public constructor(public namedImportComparer: (($0: gostring, $1: gostring) => int) | undefined, public typeOrder: OrganizeImportsTypeOrder, public isSorted: bool) {
    }
    declare private readonly then?: never;
}
export function DetectNamedImportOrganizationBySort(originalGroups: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, comparersToTest: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>, typesToTest: RuntimeSlice<int>): [
    (($0: gostring, $1: gostring) => int) | undefined,
    OrganizeImportsTypeOrder,
    bool
] {
    let comparer: (($0: gostring, $1: gostring) => int) | undefined = void 0;
    let typeOrder: OrganizeImportsTypeOrder = new OrganizeImportsTypeOrder(0);
    let found: bool = false;
    let result: namedImportSortResult | undefined = detectNamedImportOrganizationBySort(originalGroups, comparersToTest, typesToTest);
    if (result === undefined) {
        return [void 0, OrganizeImportsTypeOrderLast$constant(), false];
    }
    return [(result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImportComparer, (result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeOrder, true];
}
export function detectNamedImportOrganizationBySort(originalGroups: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, comparersToTest: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>, typesToTest: RuntimeSlice<int>): namedImportSortResult | undefined {
    let bothNamedImports = false;
    let importDeclsWithNamed = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    const __gotots_range_0 = originalGroups;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
        if ((Node__from_ast.AsImportDeclaration(imp) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
            continue;
        }
        let clause: {
            value: ImportClause__from_ast;
        } | undefined = Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(imp) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
        if ((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined || !(Node__from_ast.$storageOf((((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNamedImports$constant__from_ast())) {
            continue;
        }
        let namedImports: {
            value: NamedImports__from_ast;
        } | undefined = Node__from_ast.AsNamedImports((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
        if (NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            continue;
        }
        if (!bothNamedImports) {
            let hasTypeOnly = false;
            let hasRegular = false;
            const __gotots_range_1 = NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                if (Node__from_ast.IsTypeOnly(elem)) {
                    hasTypeOnly = true;
                }
                else {
                    hasRegular = true;
                }
            }
            if (hasTypeOnly && hasRegular) {
                bothNamedImports = true;
            }
        }
        importDeclsWithNamed = importDeclsWithNamed.append(void 0, [imp]);
    }
    if (importDeclsWithNamed.length === 0) {
        return void 0;
    }
    let namedImportsByDecl = RuntimeSlice.make<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>(0, importDeclsWithNamed.length, RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
    const __gotots_range_2 = importDeclsWithNamed;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
        let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
        let clause: {
            value: ImportClause__from_ast;
        } | undefined = Node__from_ast.AsImportClause((Node__from_ast.AsImportDeclaration(imp) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
        let namedImports: {
            value: NamedImports__from_ast;
        } | undefined = Node__from_ast.AsNamedImports((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
        namedImportsByDecl = namedImportsByDecl.append(RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(), [NodeList__from_ast.$storageOf((((namedImports ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes]);
    }
    if (!bothNamedImports || typesToTest.length === 0) {
        let namesList = RuntimeSlice.make<RuntimeSlice<gostring>>(namedImportsByDecl.length, null, RuntimeSlice.nil<gostring>());
        const __gotots_range_3 = namedImportsByDecl;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_index_3;
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let i = __gotots_range_value_3;
            let imports = __gotots_range_value_4;
            let names = RuntimeSlice.make<gostring>(imports.length, null, "");
            const __gotots_range_4 = imports;
            for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
                const __gotots_range_value_5 = __gotots_range_index_4;
                const __gotots_range_value_6 = __gotots_range_4.get(__gotots_range_index_4);
                let j = __gotots_range_value_5;
                let imp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
                names.set(j, Node__from_ast.Text(Node__from_ast.Name(imp)));
            }
            namesList.set(i, names);
        }
        let sortState = detectCaseSensitivityBySort(namesList, comparersToTest);
        let typeOrder = OrganizeImportsTypeOrderLast$constant();
        if (typesToTest.length === 1) {
            typeOrder = new OrganizeImportsTypeOrder(typesToTest.get(0));
        }
        return new namedImportSortResult(sortState.comparer, typeOrder, sortState.isSorted);
    }
    let bestDiff: GoMapValue<OrganizeImportsTypeOrder, int> = GoMap.make(3, [[OrganizeImportsTypeOrderFirst$constant(), MaxInt$int__from_math__package_1], [OrganizeImportsTypeOrderLast$constant(), MaxInt$int__from_math__package_1], [OrganizeImportsTypeOrderInline$constant(), MaxInt$int__from_math__package_1]]);
    let bestComparer: GoMapValue<OrganizeImportsTypeOrder, (($0: gostring, $1: gostring) => int) | undefined> = $goMap$MapOf_Named_lsutil$OrganizeImportsTypeOrder_To_string_string_to_int.make(3, [[OrganizeImportsTypeOrderFirst$constant(), comparersToTest.get(0)], [OrganizeImportsTypeOrderLast$constant(), comparersToTest.get(0)], [OrganizeImportsTypeOrderInline$constant(), comparersToTest.get(0)]]);
    const __gotots_range_5 = comparersToTest;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
        const __gotots_range_value_7 = __gotots_range_5.get(__gotots_range_index_5);
        let curComparer: (($0: gostring, $1: gostring) => int) | undefined = __gotots_range_value_7;
        let currDiff: GoMapValue<OrganizeImportsTypeOrder, int> = GoMap.make(3, [[OrganizeImportsTypeOrderFirst$constant(), 0], [OrganizeImportsTypeOrderLast$constant(), 0], [OrganizeImportsTypeOrderInline$constant(), 0]]);
        const __gotots_range_6 = namedImportsByDecl;
        for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
            const __gotots_range_value_8 = __gotots_range_6.get(__gotots_range_index_6);
            let importDecl = __gotots_range_value_8;
            const __gotots_range_7 = typesToTest;
            for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_7.length; __gotots_range_index_7++) {
                const __gotots_range_value_9 = new OrganizeImportsTypeOrder(__gotots_range_7.get(__gotots_range_index_7));
                let typeOrder = __gotots_range_value_9;
                let prefs = new UserPreferences(FormatCodeSettings.$zero(), new QuotePreference(""), 0, 0, 0, 0, 0, 0, 0, new JsxAttributeCompletionStyle(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation(false), "", 0, 0, new OrganizeImportsCaseFirst(0), typeOrder, 0, 0, 0, 0, InlayHintsPreferences.$zero(), CodeLensUserPreferences.$zero(), false, 0, 0, 0, 0, 0, 0, 0, "");
                let diff = measureSortedness$PointerTo_Named_ast$Node(importDecl, (n1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, n2: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                    return compareImportOrExportSpecifiers(n1, n2, curComparer, UserPreferences.$copy(prefs));
                });
                currDiff.store(typeOrder, currDiff.lookup(typeOrder) + diff);
            }
        }
        const __gotots_range_8 = typesToTest;
        for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
            const __gotots_range_value_10 = new OrganizeImportsTypeOrder(__gotots_range_8.get(__gotots_range_index_8));
            let typeOrder = __gotots_range_value_10;
            if (currDiff.lookup(typeOrder) < bestDiff.lookup(typeOrder)) {
                bestDiff.store(typeOrder, currDiff.lookup(typeOrder));
                bestComparer.store(typeOrder, curComparer);
            }
        }
    }
    const __gotots_range_9 = typesToTest;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
        const __gotots_range_value_11 = new OrganizeImportsTypeOrder(__gotots_range_9.get(__gotots_range_index_9));
        let bestTypeOrder = __gotots_range_value_11;
        let isBest = true;
        const __gotots_range_10 = typesToTest;
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
            const __gotots_range_value_12 = new OrganizeImportsTypeOrder(__gotots_range_10.get(__gotots_range_index_10));
            let testTypeOrder = __gotots_range_value_12;
            if (bestDiff.lookup(testTypeOrder) < bestDiff.lookup(bestTypeOrder)) {
                isBest = false;
                break;
            }
        }
        if (isBest) {
            return new namedImportSortResult(bestComparer.lookup(bestTypeOrder), bestTypeOrder, bestDiff.lookup(bestTypeOrder) === 0);
        }
    }
    return new namedImportSortResult(bestComparer.lookup(OrganizeImportsTypeOrderLast$constant()), OrganizeImportsTypeOrderLast$constant(), bestDiff.lookup(OrganizeImportsTypeOrderLast$constant()) === 0);
}
export class caseSensitivityDetectionResult {
    declare private readonly $goType: void;
    public constructor(public comparer: (($0: gostring, $1: gostring) => int) | undefined, public isSorted: bool) {
    }
    declare private readonly then?: never;
}
export function DetectModuleSpecifierCaseBySort(importDeclsByGroup: RuntimeSlice<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>, comparersToTest: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>): [
    (($0: gostring, $1: gostring) => int) | undefined,
    bool
] {
    let comparer: (($0: gostring, $1: gostring) => int) | undefined = void 0;
    let isSorted: bool = false;
    let moduleSpecifiersByGroup = RuntimeSlice.make<RuntimeSlice<gostring>>(0, importDeclsByGroup.length, RuntimeSlice.nil<gostring>());
    const __gotots_range_11 = importDeclsByGroup;
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
        const __gotots_range_value_13 = __gotots_range_11.get(__gotots_range_index_11);
        let importGroup = __gotots_range_value_13;
        let moduleNames = RuntimeSlice.make<gostring>(0, importGroup.length, "");
        const __gotots_range_12 = importGroup;
        for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
            const __gotots_range_value_14 = __gotots_range_12.get(__gotots_range_index_12);
            let decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_14;
            {
                let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = getModuleSpecifierExpression(decl);
                if (!(expr === undefined)) {
                    moduleNames = moduleNames.append("", [GetExternalModuleName(expr)]);
                }
                else {
                    moduleNames = moduleNames.append("", [""]);
                }
            }
        }
        moduleSpecifiersByGroup = moduleSpecifiersByGroup.append(RuntimeSlice.nil<gostring>(), [moduleNames]);
    }
    let result = detectCaseSensitivityBySort(moduleSpecifiersByGroup, comparersToTest);
    return [result.comparer, result.isSorted];
}
export function detectCaseSensitivityBySort(originalGroups: RuntimeSlice<RuntimeSlice<gostring>>, comparersToTest: RuntimeSlice<(($0: gostring, $1: gostring) => int) | undefined>): caseSensitivityDetectionResult {
    let bestComparer: (($0: gostring, $1: gostring) => int) | undefined;
    let bestDiff = MaxInt$int__from_math__package_1;
    const __gotots_range_13 = comparersToTest;
    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
        const __gotots_range_value_15 = __gotots_range_13.get(__gotots_range_index_13);
        let curComparer: (($0: gostring, $1: gostring) => int) | undefined = __gotots_range_value_15;
        let diffOfCurrentComparer = 0;
        const __gotots_range_14 = originalGroups;
        for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
            const __gotots_range_value_16 = __gotots_range_14.get(__gotots_range_index_14);
            let listToSort = __gotots_range_value_16;
            if (listToSort.length <= 1) {
                continue;
            }
            let diff = measureSortedness$string(listToSort, curComparer);
            diffOfCurrentComparer += diff;
        }
        if (diffOfCurrentComparer < bestDiff) {
            bestDiff = diffOfCurrentComparer;
            bestComparer = curComparer;
        }
    }
    if (bestComparer === undefined && comparersToTest.length > 0) {
        bestComparer = comparersToTest.get(0);
    }
    return new caseSensitivityDetectionResult(bestComparer, bestDiff === 0);
}
export function measureSortedness$kernel<T>($go$index$SliceOf_T0_int_to_T0: ($0: RuntimeSlice<GoContainerStorage<T>>, $1: int) => T, $go$length$SliceOf_T0_to_int: ($0: RuntimeSlice<GoContainerStorage<T>>) => int, arr: RuntimeSlice<GoContainerStorage<T>>, comparer: (($0: T, $1: T) => int) | undefined): int {
    let i = 0;
    const __gotots_range_15 = $go$length$SliceOf_T0_to_int(arr) - 1;
    for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15; __gotots_range_index_15++) {
        const __gotots_range_value_17 = __gotots_range_index_15;
        let j = __gotots_range_value_17;
        const __gotots_callee_6 = comparer;
        const __gotots_argument_12 = $go$index$SliceOf_T0_int_to_T0(arr, j);
        const __gotots_argument_13 = $go$index$SliceOf_T0_int_to_T0(arr, j + 1);
        const __gotots_binary_operand_0 = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13);
        const __gotots_binary_operand_1 = 0;
        if (__gotots_binary_operand_0 > __gotots_binary_operand_1) {
            i++;
        }
    }
    return i;
}
export function GetNamedImportSpecifierComparerWithDetection(importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, preferences: UserPreferences): [
    (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined,
    Tristate__from_core
] {
    let specifierComparer: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined = void 0;
    let isSorted: Tristate__from_core = 0;
    const __gotots_results_0 = GetDetectionLists(UserPreferences.$copy(preferences));
    let comparersToTest = __gotots_results_0[0];
    let typeOrdersToTest = __gotots_results_0[1];
    let importStmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (Node__from_ast.$storageOf(((importDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportDeclaration$constant__from_ast()) {
        importStmt = importDecl;
    }
    specifierComparer = GetNamedImportSpecifierComparer(UserPreferences.$copy(preferences), comparersToTest.get(0));
    isSorted = TSUnknown$constant__from_core();
    if ((Tristate_IsUnknown__from_core(preferences.OrganizeImportsIgnoreCase) || preferences.OrganizeImportsTypeOrder.$value === OrganizeImportsTypeOrderAuto$constant().$value) && !(importStmt === undefined)) {
        let detectFromDecl: namedImportSortResult | undefined = detectNamedImportOrganizationBySort(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([importStmt]), comparersToTest, typeOrdersToTest);
        if (!(detectFromDecl === undefined)) {
            isSorted = BoolToTristate__from_core((detectFromDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isSorted);
            specifierComparer = GetNamedImportSpecifierComparer(new UserPreferences(FormatCodeSettings.$zero(), new QuotePreference(""), 0, 0, 0, 0, 0, 0, 0, new JsxAttributeCompletionStyle(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation(false), "", 0, 0, new OrganizeImportsCaseFirst(0), (detectFromDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeOrder, 0, 0, 0, 0, InlayHintsPreferences.$zero(), CodeLensUserPreferences.$zero(), false, 0, 0, 0, 0, 0, 0, 0, ""), (detectFromDecl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImportComparer);
        }
        else if (!(sourceFile === undefined)) {
            let allImports = FilterImportDeclarations(NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
            let detectFromFile: namedImportSortResult | undefined = detectNamedImportOrganizationBySort(allImports, comparersToTest, typeOrdersToTest);
            if (!(detectFromFile === undefined)) {
                isSorted = BoolToTristate__from_core((detectFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).isSorted);
                specifierComparer = GetNamedImportSpecifierComparer(new UserPreferences(FormatCodeSettings.$zero(), new QuotePreference(""), 0, 0, 0, 0, 0, 0, 0, new JsxAttributeCompletionStyle(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation(false), "", 0, 0, new OrganizeImportsCaseFirst(0), (detectFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).typeOrder, 0, 0, 0, 0, InlayHintsPreferences.$zero(), CodeLensUserPreferences.$zero(), false, 0, 0, 0, 0, 0, 0, 0, ""), (detectFromFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).namedImportComparer);
            }
        }
    }
    return [specifierComparer, isSorted];
}
