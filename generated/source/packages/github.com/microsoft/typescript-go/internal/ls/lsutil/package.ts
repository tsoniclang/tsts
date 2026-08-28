import type { OrganizeImportsCaseFirst, OrganizeImportsCollation, OrganizeImportsTypeOrder, fieldInfo$Storage as fieldInfo__from_lsutil$Storage } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/userpreferences.js";
import type { $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage } from "../../../../../../../support/anonymous-structs.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { Tristate as Tristate__from_core } from "../../core/package.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int, uint32 } from "@gotots/runtime/scalars.js";
import { IndentStyleBlock$constant, IndentStyleNone$constant, IndentStyleSmart$constant, SemicolonPreferenceIgnore$constant, SemicolonPreferenceInsert$constant, SemicolonPreferenceRemove$constant, parseIndentStyle, parseSemicolonPreference } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/formatcodeoptions.js";
import { getOrganizeImportsOrdinalStringComparer } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/organizeimports.js";
import { ScriptElementKindAlias$constant, ScriptElementKindCallSignatureElement$constant, ScriptElementKindClassElement$constant, ScriptElementKindConstElement$constant, ScriptElementKindConstructSignatureElement$constant, ScriptElementKindConstructorImplementationElement$constant, ScriptElementKindDirectory$constant, ScriptElementKindEnumElement$constant, ScriptElementKindEnumMemberElement$constant, ScriptElementKindExternalModuleName$constant, ScriptElementKindFunctionElement$constant, ScriptElementKindIndexSignatureElement$constant, ScriptElementKindInterfaceElement$constant, ScriptElementKindKeyword$constant, ScriptElementKindLabel$constant, ScriptElementKindLetElement$constant, ScriptElementKindLocalClassElement$constant, ScriptElementKindLocalFunctionElement$constant, ScriptElementKindLocalVariableElement$constant, ScriptElementKindMemberFunctionElement$constant, ScriptElementKindMemberGetAccessorElement$constant, ScriptElementKindMemberSetAccessorElement$constant, ScriptElementKindMemberVariableElement$constant, ScriptElementKindModifierAbstract$constant, ScriptElementKindModifierAmbient$constant, ScriptElementKindModifierCjs$constant, ScriptElementKindModifierCts$constant, ScriptElementKindModifierDcts$constant, ScriptElementKindModifierDeprecated$constant, ScriptElementKindModifierDmts$constant, ScriptElementKindModifierDts$constant, ScriptElementKindModifierExported$constant, ScriptElementKindModifierJs$constant, ScriptElementKindModifierJson$constant, ScriptElementKindModifierJsx$constant, ScriptElementKindModifierMjs$constant, ScriptElementKindModifierMts$constant, ScriptElementKindModifierNone$constant, ScriptElementKindModifierOptional$constant, ScriptElementKindModifierPrivate$constant, ScriptElementKindModifierProtected$constant, ScriptElementKindModifierPublic$constant, ScriptElementKindModifierStatic$constant, ScriptElementKindModifierTs$constant, ScriptElementKindModifierTsx$constant, ScriptElementKindModuleElement$constant, ScriptElementKindParameterElement$constant, ScriptElementKindPrimitiveType$constant, ScriptElementKindScriptElement$constant, ScriptElementKindString$constant, ScriptElementKindTypeElement$constant, ScriptElementKindTypeParameterElement$constant, ScriptElementKindUnknown$constant, ScriptElementKindVariableAwaitUsingElement$constant, ScriptElementKindVariableElement$constant, ScriptElementKindVariableUsingElement$constant, ScriptElementKindWarning$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/symbol_display.js";
import { IncludeInlayParameterNameHintsAll$constant, IncludeInlayParameterNameHintsLiterals$constant, IncludeInlayParameterNameHintsNone$constant, JsxAttributeCompletionStyleAuto$constant, JsxAttributeCompletionStyleBraces$constant, JsxAttributeCompletionStyleNone$constant, OrganizeImportsCaseFirstFalse$constant, OrganizeImportsCaseFirstLower$constant, OrganizeImportsCaseFirstUpper$constant, OrganizeImportsCollationOrdinal$constant, OrganizeImportsCollationUnicode$constant, OrganizeImportsTypeOrderAuto$constant, OrganizeImportsTypeOrderFirst$constant, OrganizeImportsTypeOrderInline$constant, OrganizeImportsTypeOrderLast$constant, QuotePreferenceAuto$constant, QuotePreferenceDouble$constant, QuotePreferenceSingle$constant, QuotePreferenceUnknown$constant, collectFieldInfos, fieldInfo } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/userpreferences.js";
import { $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_ } from "../../../../../../../support/anonymous-structs.js";
import { $goInterfaceAdapter$Named_core$Tristate, $goInterfaceAdapter$Named_lsutil$IncludeInlayParameterNameHints, $goInterfaceAdapter$Named_lsutil$IndentStyle, $goInterfaceAdapter$Named_lsutil$JsxAttributeCompletionStyle, $goInterfaceAdapter$Named_lsutil$OrganizeImportsCaseFirst, $goInterfaceAdapter$Named_lsutil$OrganizeImportsCollation, $goInterfaceAdapter$Named_lsutil$OrganizeImportsTypeOrder, $goInterfaceAdapter$Named_lsutil$QuotePreference, $goInterfaceAdapter$Named_lsutil$SemicolonPreference, $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierEndingPreference, $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierPreference, $goInterfaceAdapter$string, $goInterfaceAdapter$bool as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_Named_reflect$Type_To_Interface_void_to_Interface_void, $goMap$MapOf_string_To_Interface_void_to_Interface_void as GoMap } from "../../../../../../../support/maps.js";
import { $goReflectType$Named_core$Tristate, $goReflectType$Named_lsutil$IncludeInlayParameterNameHints, $goReflectType$Named_lsutil$IndentStyle, $goReflectType$Named_lsutil$JsxAttributeCompletionStyle, $goReflectType$Named_lsutil$OrganizeImportsCaseFirst, $goReflectType$Named_lsutil$OrganizeImportsCollation, $goReflectType$Named_lsutil$OrganizeImportsTypeOrder, $goReflectType$Named_lsutil$QuotePreference, $goReflectType$Named_lsutil$SemicolonPreference, $goReflectType$Named_lsutil$UserPreferences, $goReflectType$Named_modulespecifiers$ImportModuleSpecifierEndingPreference, $goReflectType$Named_modulespecifiers$ImportModuleSpecifierPreference } from "../../../../../../../support/reflection-types.js";
import { TSFalse$constant as TSFalse$constant__from_core, TSTrue$constant as TSTrue$constant__from_core, TSUnknown$constant as TSUnknown$constant__from_core } from "../../core/package.js";
import { ImportModuleSpecifierEndingPreferenceAuto$constant as ImportModuleSpecifierEndingPreferenceAuto$constant__from_modulespecifiers, ImportModuleSpecifierEndingPreferenceIndex$constant as ImportModuleSpecifierEndingPreferenceIndex$constant__from_modulespecifiers, ImportModuleSpecifierEndingPreferenceJs$constant as ImportModuleSpecifierEndingPreferenceJs$constant__from_modulespecifiers, ImportModuleSpecifierEndingPreferenceMinimal$constant as ImportModuleSpecifierEndingPreferenceMinimal$constant__from_modulespecifiers, ImportModuleSpecifierPreferenceNonRelative$constant as ImportModuleSpecifierPreferenceNonRelative$constant__from_modulespecifiers, ImportModuleSpecifierPreferenceProjectRelative$constant as ImportModuleSpecifierPreferenceProjectRelative$constant__from_modulespecifiers, ImportModuleSpecifierPreferenceRelative$constant as ImportModuleSpecifierPreferenceRelative$constant__from_modulespecifiers, ImportModuleSpecifierPreferenceShortest$constant as ImportModuleSpecifierPreferenceShortest$constant__from_modulespecifiers } from "../../modulespecifiers/package.js";
import { $state } from "./state.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as sync__from_gostdlib from "@gotots/gostdlib/sync.js";
import { GoMap as GoMap__from_gotots_runtime } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function $initialize(): void {
    IncludeInlayParameterNameHintsAll = IncludeInlayParameterNameHintsAll$constant();
    IncludeInlayParameterNameHintsLiterals = IncludeInlayParameterNameHintsLiterals$constant();
    IncludeInlayParameterNameHintsNone = IncludeInlayParameterNameHintsNone$constant();
    IndentStyleBlock = IndentStyleBlock$constant();
    IndentStyleNone = IndentStyleNone$constant();
    IndentStyleSmart = IndentStyleSmart$constant();
    JsxAttributeCompletionStyleAuto = JsxAttributeCompletionStyleAuto$constant();
    JsxAttributeCompletionStyleBraces = JsxAttributeCompletionStyleBraces$constant();
    JsxAttributeCompletionStyleNone = JsxAttributeCompletionStyleNone$constant();
    OrganizeImportsCaseFirstFalse = OrganizeImportsCaseFirstFalse$constant();
    OrganizeImportsCaseFirstLower = OrganizeImportsCaseFirstLower$constant();
    OrganizeImportsCaseFirstUpper = OrganizeImportsCaseFirstUpper$constant();
    OrganizeImportsCollationOrdinal = OrganizeImportsCollationOrdinal$constant();
    OrganizeImportsCollationUnicode = OrganizeImportsCollationUnicode$constant();
    OrganizeImportsTypeOrderAuto = OrganizeImportsTypeOrderAuto$constant();
    OrganizeImportsTypeOrderFirst = OrganizeImportsTypeOrderFirst$constant();
    OrganizeImportsTypeOrderInline = OrganizeImportsTypeOrderInline$constant();
    OrganizeImportsTypeOrderLast = OrganizeImportsTypeOrderLast$constant();
    QuotePreferenceAuto = QuotePreferenceAuto$constant();
    QuotePreferenceDouble = QuotePreferenceDouble$constant();
    QuotePreferenceSingle = QuotePreferenceSingle$constant();
    QuotePreferenceUnknown = QuotePreferenceUnknown$constant();
    ScriptElementKindAlias = ScriptElementKindAlias$constant();
    ScriptElementKindCallSignatureElement = ScriptElementKindCallSignatureElement$constant();
    ScriptElementKindClassElement = ScriptElementKindClassElement$constant();
    ScriptElementKindConstElement = ScriptElementKindConstElement$constant();
    ScriptElementKindConstructSignatureElement = ScriptElementKindConstructSignatureElement$constant();
    ScriptElementKindConstructorImplementationElement = ScriptElementKindConstructorImplementationElement$constant();
    ScriptElementKindDirectory = ScriptElementKindDirectory$constant();
    ScriptElementKindEnumElement = ScriptElementKindEnumElement$constant();
    ScriptElementKindEnumMemberElement = ScriptElementKindEnumMemberElement$constant();
    ScriptElementKindExternalModuleName = ScriptElementKindExternalModuleName$constant();
    ScriptElementKindFunctionElement = ScriptElementKindFunctionElement$constant();
    ScriptElementKindIndexSignatureElement = ScriptElementKindIndexSignatureElement$constant();
    ScriptElementKindInterfaceElement = ScriptElementKindInterfaceElement$constant();
    ScriptElementKindKeyword = ScriptElementKindKeyword$constant();
    ScriptElementKindLabel = ScriptElementKindLabel$constant();
    ScriptElementKindLetElement = ScriptElementKindLetElement$constant();
    ScriptElementKindLocalClassElement = ScriptElementKindLocalClassElement$constant();
    ScriptElementKindLocalFunctionElement = ScriptElementKindLocalFunctionElement$constant();
    ScriptElementKindLocalVariableElement = ScriptElementKindLocalVariableElement$constant();
    ScriptElementKindMemberFunctionElement = ScriptElementKindMemberFunctionElement$constant();
    ScriptElementKindMemberGetAccessorElement = ScriptElementKindMemberGetAccessorElement$constant();
    ScriptElementKindMemberSetAccessorElement = ScriptElementKindMemberSetAccessorElement$constant();
    ScriptElementKindMemberVariableElement = ScriptElementKindMemberVariableElement$constant();
    ScriptElementKindModifierAbstract = ScriptElementKindModifierAbstract$constant();
    ScriptElementKindModifierAmbient = ScriptElementKindModifierAmbient$constant();
    ScriptElementKindModifierCjs = ScriptElementKindModifierCjs$constant();
    ScriptElementKindModifierCts = ScriptElementKindModifierCts$constant();
    ScriptElementKindModifierDcts = ScriptElementKindModifierDcts$constant();
    ScriptElementKindModifierDeprecated = ScriptElementKindModifierDeprecated$constant();
    ScriptElementKindModifierDmts = ScriptElementKindModifierDmts$constant();
    ScriptElementKindModifierDts = ScriptElementKindModifierDts$constant();
    ScriptElementKindModifierExported = ScriptElementKindModifierExported$constant();
    ScriptElementKindModifierJs = ScriptElementKindModifierJs$constant();
    ScriptElementKindModifierJson = ScriptElementKindModifierJson$constant();
    ScriptElementKindModifierJsx = ScriptElementKindModifierJsx$constant();
    ScriptElementKindModifierMjs = ScriptElementKindModifierMjs$constant();
    ScriptElementKindModifierMts = ScriptElementKindModifierMts$constant();
    ScriptElementKindModifierNone = ScriptElementKindModifierNone$constant();
    ScriptElementKindModifierOptional = ScriptElementKindModifierOptional$constant();
    ScriptElementKindModifierPrivate = ScriptElementKindModifierPrivate$constant();
    ScriptElementKindModifierProtected = ScriptElementKindModifierProtected$constant();
    ScriptElementKindModifierPublic = ScriptElementKindModifierPublic$constant();
    ScriptElementKindModifierStatic = ScriptElementKindModifierStatic$constant();
    ScriptElementKindModifierTs = ScriptElementKindModifierTs$constant();
    ScriptElementKindModifierTsx = ScriptElementKindModifierTsx$constant();
    ScriptElementKindModuleElement = ScriptElementKindModuleElement$constant();
    ScriptElementKindParameterElement = ScriptElementKindParameterElement$constant();
    ScriptElementKindPrimitiveType = ScriptElementKindPrimitiveType$constant();
    ScriptElementKindScriptElement = ScriptElementKindScriptElement$constant();
    ScriptElementKindString = ScriptElementKindString$constant();
    ScriptElementKindTypeElement = ScriptElementKindTypeElement$constant();
    ScriptElementKindTypeParameterElement = ScriptElementKindTypeParameterElement$constant();
    ScriptElementKindUnknown = ScriptElementKindUnknown$constant();
    ScriptElementKindVariableAwaitUsingElement = ScriptElementKindVariableAwaitUsingElement$constant();
    ScriptElementKindVariableElement = ScriptElementKindVariableElement$constant();
    ScriptElementKindVariableUsingElement = ScriptElementKindVariableUsingElement$constant();
    ScriptElementKindWarning = ScriptElementKindWarning$constant();
    SemicolonPreferenceIgnore = SemicolonPreferenceIgnore$constant();
    SemicolonPreferenceInsert = SemicolonPreferenceInsert$constant();
    SemicolonPreferenceRemove = SemicolonPreferenceRemove$constant();
    $state.FileExtensionKindModifiers = 0;
    $state.caseInsensitiveOrganizeImportsComparer = RuntimeSlice.nil<(($0: gostring, $1: gostring) => int) | undefined>();
    $state.caseSensitiveOrganizeImportsComparer = RuntimeSlice.nil<(($0: gostring, $1: gostring) => int) | undefined>();
    $state.configPathParsers = GoMap.nil();
    $state.fieldInfoCache = void 0;
    $state.organizeImportsComparers = RuntimeSlice.nil<(($0: gostring, $1: gostring) => int) | undefined>();
    $state.scriptElementKindModifierNames = RuntimeSlice.nil<$goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage>();
    $state.typeParsers = $goMap$MapOf_Named_reflect$Type_To_Interface_void_to_Interface_void.nil();
    $state.typeSerializers = $goMap$MapOf_Named_reflect$Type_To_Interface_void_to_Interface_void.nil();
    $state.unstableNameIndex = void 0;
    {
        $state.caseInsensitiveOrganizeImportsComparer = RuntimeSlice.literal<(($0: gostring, $1: gostring) => int) | undefined>([getOrganizeImportsOrdinalStringComparer(true)]);
    }
    {
        $state.caseSensitiveOrganizeImportsComparer = RuntimeSlice.literal<(($0: gostring, $1: gostring) => int) | undefined>([getOrganizeImportsOrdinalStringComparer(false)]);
    }
    {
        $state.organizeImportsComparers = RuntimeSlice.literal<(($0: gostring, $1: gostring) => int) | undefined>([$state.caseInsensitiveOrganizeImportsComparer.get(0), $state.caseSensitiveOrganizeImportsComparer.get(0)]);
    }
    {
        $state.scriptElementKindModifierNames = RuntimeSlice.literal<$goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_$Storage>([
            (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierPublic$constant(),
                    name: "public"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierPrivate$constant(),
                    name: "private"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierProtected$constant(),
                    name: "protected"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierExported$constant(),
                    name: "export"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierAmbient$constant(),
                    name: "declare"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierStatic$constant(),
                    name: "static"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierAbstract$constant(),
                    name: "abstract"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierOptional$constant(),
                    name: "optional"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierDeprecated$constant(),
                    name: "deprecated"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierDts$constant(),
                    name: ".d.ts"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierTs$constant(),
                    name: ".ts"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierTsx$constant(),
                    name: ".tsx"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierJs$constant(),
                    name: ".js"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierJsx$constant(),
                    name: ".jsx"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierJson$constant(),
                    name: ".json"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierDmts$constant(),
                    name: ".d.mts"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierMts$constant(),
                    name: ".mts"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierMjs$constant(),
                    name: ".mjs"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierDcts$constant(),
                    name: ".d.cts"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierCts$constant(),
                    name: ".cts"
                })), (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$storageOf, (void $goStruct$Struct_Field_lsutil_u24_flag_Named_lsutil$ScriptElementKindModifier_Tag__empty__Field_lsutil_u24_name_string_Tag__empty_.$fromStorage,
                {
                    flag: ScriptElementKindModifierCjs$constant(),
                    name: ".cjs"
                })),
        ]);
    }
    {
        $state.FileExtensionKindModifiers = 4193280;
    }
    {
        $state.typeParsers = $goMap$MapOf_Named_reflect$Type_To_Interface_void_to_Interface_void.make(11, [[$goReflectType$Named_core$Tristate, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_0 = (($value: GoInterface | undefined): [
                            bool,
                            boolean
                        ] => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return [false, false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let b = __gotots_results_0[0];
                        let ok = __gotots_results_0[1];
                        if (ok) {
                            if (b) {
                                return new $goInterfaceAdapter$Named_core$Tristate(TSTrue$constant__from_core());
                            }
                            return new $goInterfaceAdapter$Named_core$Tristate(TSFalse$constant__from_core());
                        }
                    }
                    return new $goInterfaceAdapter$Named_core$Tristate(TSUnknown$constant__from_core());
                }], [$goReflectType$Named_lsutil$IndentStyle, (val: GoInterface | undefined): GoInterface | undefined => {
                    return new $goInterfaceAdapter$Named_lsutil$IndentStyle(parseIndentStyle(val));
                }], [$goReflectType$Named_lsutil$SemicolonPreference, (val: GoInterface | undefined): GoInterface | undefined => {
                    return new $goInterfaceAdapter$Named_lsutil$SemicolonPreference(parseSemicolonPreference(val));
                }], [$goReflectType$Named_lsutil$QuotePreference, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_1 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_1[0];
                        let ok = __gotots_results_1[1];
                        if (ok) {
                            switch (strings__from_gostdlib.ToLower(s)) {
                                case "auto": {
                                    return new $goInterfaceAdapter$Named_lsutil$QuotePreference(QuotePreferenceAuto$constant());
                                    break;
                                }
                                case "double": {
                                    return new $goInterfaceAdapter$Named_lsutil$QuotePreference(QuotePreferenceDouble$constant());
                                    break;
                                }
                                case "single": {
                                    return new $goInterfaceAdapter$Named_lsutil$QuotePreference(QuotePreferenceSingle$constant());
                                    break;
                                }
                            }
                        }
                    }
                    return new $goInterfaceAdapter$Named_lsutil$QuotePreference(QuotePreferenceUnknown$constant());
                }], [$goReflectType$Named_lsutil$JsxAttributeCompletionStyle, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_2 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_2[0];
                        let ok = __gotots_results_2[1];
                        if (ok) {
                            switch (strings__from_gostdlib.ToLower(s)) {
                                case "braces": {
                                    return new $goInterfaceAdapter$Named_lsutil$JsxAttributeCompletionStyle(JsxAttributeCompletionStyleBraces$constant());
                                    break;
                                }
                                case "none": {
                                    return new $goInterfaceAdapter$Named_lsutil$JsxAttributeCompletionStyle(JsxAttributeCompletionStyleNone$constant());
                                    break;
                                }
                            }
                        }
                    }
                    return new $goInterfaceAdapter$Named_lsutil$JsxAttributeCompletionStyle(JsxAttributeCompletionStyleAuto$constant());
                }], [$goReflectType$Named_lsutil$IncludeInlayParameterNameHints, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_3 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_3[0];
                        let ok = __gotots_results_3[1];
                        if (ok) {
                            switch (s) {
                                case "all": {
                                    return new $goInterfaceAdapter$Named_lsutil$IncludeInlayParameterNameHints(IncludeInlayParameterNameHintsAll$constant());
                                    break;
                                }
                                case "literals": {
                                    return new $goInterfaceAdapter$Named_lsutil$IncludeInlayParameterNameHints(IncludeInlayParameterNameHintsLiterals$constant());
                                    break;
                                }
                            }
                        }
                    }
                    return new $goInterfaceAdapter$Named_lsutil$IncludeInlayParameterNameHints(IncludeInlayParameterNameHintsNone$constant());
                }], [$goReflectType$Named_lsutil$OrganizeImportsCollation, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_4 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_4[0];
                        let ok = __gotots_results_4[1];
                        if (ok && strings__from_gostdlib.ToLower(s) === "unicode") {
                            return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsCollation(OrganizeImportsCollationUnicode$constant());
                        }
                    }
                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsCollation(OrganizeImportsCollationOrdinal$constant());
                }], [$goReflectType$Named_lsutil$OrganizeImportsCaseFirst, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_5 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_5[0];
                        let ok = __gotots_results_5[1];
                        if (ok) {
                            switch (s) {
                                case "lower": {
                                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsCaseFirst(OrganizeImportsCaseFirstLower$constant());
                                    break;
                                }
                                case "upper": {
                                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsCaseFirst(OrganizeImportsCaseFirstUpper$constant());
                                    break;
                                }
                            }
                        }
                    }
                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsCaseFirst(OrganizeImportsCaseFirstFalse$constant());
                }], [$goReflectType$Named_lsutil$OrganizeImportsTypeOrder, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_6 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_6[0];
                        let ok = __gotots_results_6[1];
                        if (ok) {
                            switch (s) {
                                case "last": {
                                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsTypeOrder(OrganizeImportsTypeOrderLast$constant());
                                    break;
                                }
                                case "inline": {
                                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsTypeOrder(OrganizeImportsTypeOrderInline$constant());
                                    break;
                                }
                                case "first": {
                                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsTypeOrder(OrganizeImportsTypeOrderFirst$constant());
                                    break;
                                }
                            }
                        }
                    }
                    return new $goInterfaceAdapter$Named_lsutil$OrganizeImportsTypeOrder(OrganizeImportsTypeOrderAuto$constant());
                }], [$goReflectType$Named_modulespecifiers$ImportModuleSpecifierPreference, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_7 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_7[0];
                        let ok = __gotots_results_7[1];
                        if (ok) {
                            switch (strings__from_gostdlib.ToLower(s)) {
                                case "project-relative": {
                                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierPreference(ImportModuleSpecifierPreferenceProjectRelative$constant__from_modulespecifiers());
                                    break;
                                }
                                case "relative": {
                                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierPreference(ImportModuleSpecifierPreferenceRelative$constant__from_modulespecifiers());
                                    break;
                                }
                                case "non-relative": {
                                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierPreference(ImportModuleSpecifierPreferenceNonRelative$constant__from_modulespecifiers());
                                    break;
                                }
                            }
                        }
                    }
                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierPreference(ImportModuleSpecifierPreferenceShortest$constant__from_modulespecifiers());
                }], [$goReflectType$Named_modulespecifiers$ImportModuleSpecifierEndingPreference, (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_8 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_8[0];
                        let ok = __gotots_results_8[1];
                        if (ok) {
                            switch (strings__from_gostdlib.ToLower(s)) {
                                case "minimal": {
                                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierEndingPreference(ImportModuleSpecifierEndingPreferenceMinimal$constant__from_modulespecifiers());
                                    break;
                                }
                                case "index": {
                                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierEndingPreference(ImportModuleSpecifierEndingPreferenceIndex$constant__from_modulespecifiers());
                                    break;
                                }
                                case "js": {
                                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierEndingPreference(ImportModuleSpecifierEndingPreferenceJs$constant__from_modulespecifiers());
                                    break;
                                }
                            }
                        }
                    }
                    return new $goInterfaceAdapter$Named_modulespecifiers$ImportModuleSpecifierEndingPreference(ImportModuleSpecifierEndingPreferenceAuto$constant__from_modulespecifiers());
                }]]);
    }
    {
        $state.typeSerializers = $goMap$MapOf_Named_reflect$Type_To_Interface_void_to_Interface_void.make(4, [[$goReflectType$Named_core$Tristate, (val: GoInterface | undefined): GoInterface | undefined => {
                    switch ((($value: GoInterface | undefined): Tristate__from_core => {
                        if (!$goInterfaceAdapter$Named_core$Tristate.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(val)) {
                        case TSTrue$constant__from_core(): {
                            return new GoInterfaceAdapter(true);
                            break;
                        }
                        case TSFalse$constant__from_core(): {
                            return new GoInterfaceAdapter(false);
                            break;
                        }
                        default: {
                            return void 0;
                            break;
                        }
                    }
                }], [$goReflectType$Named_lsutil$OrganizeImportsCollation, (val: GoInterface | undefined): GoInterface | undefined => {
                    if ((($value: GoInterface | undefined): OrganizeImportsCollation => {
                        if (!$goInterfaceAdapter$Named_lsutil$OrganizeImportsCollation.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(val).$value === OrganizeImportsCollationUnicode$constant().$value) {
                        return new $goInterfaceAdapter$string("unicode");
                    }
                    return new $goInterfaceAdapter$string("ordinal");
                }], [$goReflectType$Named_lsutil$OrganizeImportsCaseFirst, (val: GoInterface | undefined): GoInterface | undefined => {
                    switch ((($value: GoInterface | undefined): OrganizeImportsCaseFirst => {
                        if (!$goInterfaceAdapter$Named_lsutil$OrganizeImportsCaseFirst.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(val).$value) {
                        case 1: {
                            return new $goInterfaceAdapter$string("lower");
                            break;
                        }
                        case 2: {
                            return new $goInterfaceAdapter$string("upper");
                            break;
                        }
                        default: {
                            return new $goInterfaceAdapter$string("default");
                            break;
                        }
                    }
                }], [$goReflectType$Named_lsutil$OrganizeImportsTypeOrder, (val: GoInterface | undefined): GoInterface | undefined => {
                    switch ((($value: GoInterface | undefined): OrganizeImportsTypeOrder => {
                        if (!$goInterfaceAdapter$Named_lsutil$OrganizeImportsTypeOrder.$is($value)) {
                            return GoPanic.raiseRuntime("runtime error: interface conversion failed");
                        }
                        return $value.$go$value;
                    })(val).$value) {
                        case 1: {
                            return new $goInterfaceAdapter$string("last");
                            break;
                        }
                        case 2: {
                            return new $goInterfaceAdapter$string("inline");
                            break;
                        }
                        case 3: {
                            return new $goInterfaceAdapter$string("first");
                            break;
                        }
                        default: {
                            return new $goInterfaceAdapter$string("auto");
                            break;
                        }
                    }
                }]]);
    }
    {
        $state.configPathParsers = GoMap.make(1, [["preferences.organizeImports.caseSensitivity", (val: GoInterface | undefined): GoInterface | undefined => {
                    {
                        const __gotots_results_9 = (($value: GoInterface | undefined): [
                            gostring,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$string.$is($value)) {
                                return ["", false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let s = __gotots_results_9[0];
                        let ok = __gotots_results_9[1];
                        if (ok) {
                            switch (strings__from_gostdlib.ToLower(s)) {
                                case "caseinsensitive": {
                                    return new $goInterfaceAdapter$Named_core$Tristate(TSTrue$constant__from_core());
                                    break;
                                }
                                case "casesensitive": {
                                    return new $goInterfaceAdapter$Named_core$Tristate(TSFalse$constant__from_core());
                                    break;
                                }
                            }
                        }
                    }
                    {
                        const __gotots_results_10 = (($value: GoInterface | undefined): [
                            bool,
                            boolean
                        ] => {
                            if (!GoInterfaceAdapter.$is($value)) {
                                return [false, false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let b = __gotots_results_10[0];
                        let ok = __gotots_results_10[1];
                        if (ok) {
                            if (b) {
                                return new $goInterfaceAdapter$Named_core$Tristate(TSTrue$constant__from_core());
                            }
                            return new $goInterfaceAdapter$Named_core$Tristate(TSFalse$constant__from_core());
                        }
                    }
                    return new $goInterfaceAdapter$Named_core$Tristate(TSUnknown$constant__from_core());
                }]]);
    }
    {
        $state.fieldInfoCache = sync__from_gostdlib.OnceValue<RuntimeSlice<fieldInfo__from_lsutil$Storage>>((): RuntimeSlice<fieldInfo__from_lsutil$Storage> => {
            return collectFieldInfos($goReflectType$Named_lsutil$UserPreferences, RuntimeSlice.nil<int>());
        });
    }
    {
        $state.unstableNameIndex = sync__from_gostdlib.OnceValue<GoMapValue<gostring, int>>((): GoMapValue<gostring, int> => {
            const __gotots_callee_2 = $state.fieldInfoCache;
            let infos = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))();
            let index: GoMapValue<gostring, int> = GoMap__from_gotots_runtime.make<gostring, int>(0, infos.length, []);
            const __gotots_range_0 = infos;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_index_0;
                const __gotots_range_value_1 = fieldInfo.$copy(fieldInfo.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
                let i = __gotots_range_value_0;
                let info = __gotots_range_value_1;
                if (fieldInfo.$storageOf(info).rawName !== "") {
                    index.store(fieldInfo.$storageOf(info).rawName, i);
                }
            }
            return index;
        });
    }
}
export { NodeIsASICandidate, PositionIsASICandidate, SyntaxMayBeASICandidate, SyntaxRequiresTrailingCommaOrSemicolonOrASI, SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI, SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI, SyntaxRequiresTrailingSemicolonOrASI } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/asi.js";
export { AssertHasRealPosition, GetFirstToken, GetLastChild, GetLastToken, GetLastVisitedChild } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/children.js";
export { IsCompletedNode, PositionBelongsToNode } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/completednode.js";
export { EditorSettings, FormatCodeSettings, FromLSFormatOptions, GetDefaultFormatCodeSettings, IndentStyle, IndentStyleBlock$constant, IndentStyleNone$constant, IndentStyleSmart$constant, SemicolonPreference, SemicolonPreferenceIgnore$constant, SemicolonPreferenceInsert$constant, SemicolonPreferenceRemove$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/formatcodeoptions.js";
export { CompareImportsOrRequireStatements, CompareModuleSpecifiers, DetectModuleSpecifierCaseBySort, DetectNamedImportOrganizationBySort, FilterImportDeclarations, GetDetectionLists, GetExternalModuleName, GetImportDeclarationInsertIndex, GetImportSpecifierInsertionIndex, GetNamedImportSpecifierComparer, GetNamedImportSpecifierComparerWithDetection, GetOrganizeImportsStringComparerWithDetection } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/organizeimports.js";
export { GetSymbolKind, GetSymbolModifiers, ScriptElementKind, ScriptElementKindAlias$constant, ScriptElementKindCallSignatureElement$constant, ScriptElementKindClassElement$constant, ScriptElementKindConstElement$constant, ScriptElementKindConstructSignatureElement$constant, ScriptElementKindConstructorImplementationElement$constant, ScriptElementKindDirectory$constant, ScriptElementKindEnumElement$constant, ScriptElementKindEnumMemberElement$constant, ScriptElementKindExternalModuleName$constant, ScriptElementKindFunctionElement$constant, ScriptElementKindIndexSignatureElement$constant, ScriptElementKindInterfaceElement$constant, ScriptElementKindKeyword$constant, ScriptElementKindLabel$constant, ScriptElementKindLetElement$constant, ScriptElementKindLocalClassElement$constant, ScriptElementKindLocalFunctionElement$constant, ScriptElementKindLocalVariableElement$constant, ScriptElementKindMemberFunctionElement$constant, ScriptElementKindMemberGetAccessorElement$constant, ScriptElementKindMemberSetAccessorElement$constant, ScriptElementKindMemberVariableElement$constant, ScriptElementKindModifier, ScriptElementKindModifierAbstract$constant, ScriptElementKindModifierAmbient$constant, ScriptElementKindModifierCjs$constant, ScriptElementKindModifierCts$constant, ScriptElementKindModifierDcts$constant, ScriptElementKindModifierDeprecated$constant, ScriptElementKindModifierDmts$constant, ScriptElementKindModifierDts$constant, ScriptElementKindModifierExported$constant, ScriptElementKindModifierJs$constant, ScriptElementKindModifierJson$constant, ScriptElementKindModifierJsx$constant, ScriptElementKindModifierMjs$constant, ScriptElementKindModifierMts$constant, ScriptElementKindModifierNone$constant, ScriptElementKindModifierOptional$constant, ScriptElementKindModifierPrivate$constant, ScriptElementKindModifierProtected$constant, ScriptElementKindModifierPublic$constant, ScriptElementKindModifierStatic$constant, ScriptElementKindModifierTs$constant, ScriptElementKindModifierTsx$constant, ScriptElementKindModuleElement$constant, ScriptElementKindParameterElement$constant, ScriptElementKindPrimitiveType$constant, ScriptElementKindScriptElement$constant, ScriptElementKindString$constant, ScriptElementKindTypeElement$constant, ScriptElementKindTypeParameterElement$constant, ScriptElementKindUnknown$constant, ScriptElementKindVariableAwaitUsingElement$constant, ScriptElementKindVariableElement$constant, ScriptElementKindVariableUsingElement$constant, ScriptElementKindWarning$constant } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/symbol_display.js";
export { CodeLensUserPreferences, IncludeInlayParameterNameHints, IncludeInlayParameterNameHintsAll$constant, IncludeInlayParameterNameHintsLiterals$constant, IncludeInlayParameterNameHintsNone$constant, InlayHintsPreferences, JsxAttributeCompletionStyle, JsxAttributeCompletionStyleAuto$constant, JsxAttributeCompletionStyleBraces$constant, JsxAttributeCompletionStyleNone$constant, NewDefaultUserPreferences, OrganizeImportsCaseFirst, OrganizeImportsCaseFirstFalse$constant, OrganizeImportsCaseFirstLower$constant, OrganizeImportsCaseFirstUpper$constant, OrganizeImportsCollation, OrganizeImportsCollationOrdinal$constant, OrganizeImportsCollationUnicode$constant, OrganizeImportsTypeOrder, OrganizeImportsTypeOrderAuto$constant, OrganizeImportsTypeOrderFirst$constant, OrganizeImportsTypeOrderInline$constant, OrganizeImportsTypeOrderLast$constant, ParseUserPreferences, QuotePreference, QuotePreferenceAuto$constant, QuotePreferenceDouble$constant, QuotePreferenceSingle$constant, QuotePreferenceUnknown$constant, UserPreferences } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/userpreferences.js";
export { GetQuotePreference, IsNonContextualKeyword, ModuleSpecifierToValidIdentifier, ModuleSymbolToValidIdentifier, ProbablyUsesSemicolons, QuotePreferenceFromString, ShouldUseUriStyleNodeCoreModules } from "../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsutil/utilities.js";
export let IncludeInlayParameterNameHintsAll: ReturnType<typeof IncludeInlayParameterNameHintsAll$constant>;
export let IncludeInlayParameterNameHintsLiterals: ReturnType<typeof IncludeInlayParameterNameHintsLiterals$constant>;
export let IncludeInlayParameterNameHintsNone: ReturnType<typeof IncludeInlayParameterNameHintsNone$constant>;
export let IndentStyleBlock: ReturnType<typeof IndentStyleBlock$constant>;
export let IndentStyleNone: ReturnType<typeof IndentStyleNone$constant>;
export let IndentStyleSmart: ReturnType<typeof IndentStyleSmart$constant>;
export let JsxAttributeCompletionStyleAuto: ReturnType<typeof JsxAttributeCompletionStyleAuto$constant>;
export let JsxAttributeCompletionStyleBraces: ReturnType<typeof JsxAttributeCompletionStyleBraces$constant>;
export let JsxAttributeCompletionStyleNone: ReturnType<typeof JsxAttributeCompletionStyleNone$constant>;
export let OrganizeImportsCaseFirstFalse: ReturnType<typeof OrganizeImportsCaseFirstFalse$constant>;
export let OrganizeImportsCaseFirstLower: ReturnType<typeof OrganizeImportsCaseFirstLower$constant>;
export let OrganizeImportsCaseFirstUpper: ReturnType<typeof OrganizeImportsCaseFirstUpper$constant>;
export let OrganizeImportsCollationOrdinal: ReturnType<typeof OrganizeImportsCollationOrdinal$constant>;
export let OrganizeImportsCollationUnicode: ReturnType<typeof OrganizeImportsCollationUnicode$constant>;
export let OrganizeImportsTypeOrderAuto: ReturnType<typeof OrganizeImportsTypeOrderAuto$constant>;
export let OrganizeImportsTypeOrderFirst: ReturnType<typeof OrganizeImportsTypeOrderFirst$constant>;
export let OrganizeImportsTypeOrderInline: ReturnType<typeof OrganizeImportsTypeOrderInline$constant>;
export let OrganizeImportsTypeOrderLast: ReturnType<typeof OrganizeImportsTypeOrderLast$constant>;
export let QuotePreferenceAuto: ReturnType<typeof QuotePreferenceAuto$constant>;
export let QuotePreferenceDouble: ReturnType<typeof QuotePreferenceDouble$constant>;
export let QuotePreferenceSingle: ReturnType<typeof QuotePreferenceSingle$constant>;
export let QuotePreferenceUnknown: ReturnType<typeof QuotePreferenceUnknown$constant>;
export let ScriptElementKindAlias: ReturnType<typeof ScriptElementKindAlias$constant>;
export let ScriptElementKindCallSignatureElement: ReturnType<typeof ScriptElementKindCallSignatureElement$constant>;
export let ScriptElementKindClassElement: ReturnType<typeof ScriptElementKindClassElement$constant>;
export let ScriptElementKindConstElement: ReturnType<typeof ScriptElementKindConstElement$constant>;
export let ScriptElementKindConstructSignatureElement: ReturnType<typeof ScriptElementKindConstructSignatureElement$constant>;
export let ScriptElementKindConstructorImplementationElement: ReturnType<typeof ScriptElementKindConstructorImplementationElement$constant>;
export let ScriptElementKindDirectory: ReturnType<typeof ScriptElementKindDirectory$constant>;
export let ScriptElementKindEnumElement: ReturnType<typeof ScriptElementKindEnumElement$constant>;
export let ScriptElementKindEnumMemberElement: ReturnType<typeof ScriptElementKindEnumMemberElement$constant>;
export let ScriptElementKindExternalModuleName: ReturnType<typeof ScriptElementKindExternalModuleName$constant>;
export let ScriptElementKindFunctionElement: ReturnType<typeof ScriptElementKindFunctionElement$constant>;
export let ScriptElementKindIndexSignatureElement: ReturnType<typeof ScriptElementKindIndexSignatureElement$constant>;
export let ScriptElementKindInterfaceElement: ReturnType<typeof ScriptElementKindInterfaceElement$constant>;
export let ScriptElementKindKeyword: ReturnType<typeof ScriptElementKindKeyword$constant>;
export let ScriptElementKindLabel: ReturnType<typeof ScriptElementKindLabel$constant>;
export let ScriptElementKindLetElement: ReturnType<typeof ScriptElementKindLetElement$constant>;
export let ScriptElementKindLocalClassElement: ReturnType<typeof ScriptElementKindLocalClassElement$constant>;
export let ScriptElementKindLocalFunctionElement: ReturnType<typeof ScriptElementKindLocalFunctionElement$constant>;
export let ScriptElementKindLocalVariableElement: ReturnType<typeof ScriptElementKindLocalVariableElement$constant>;
export let ScriptElementKindMemberFunctionElement: ReturnType<typeof ScriptElementKindMemberFunctionElement$constant>;
export let ScriptElementKindMemberGetAccessorElement: ReturnType<typeof ScriptElementKindMemberGetAccessorElement$constant>;
export let ScriptElementKindMemberSetAccessorElement: ReturnType<typeof ScriptElementKindMemberSetAccessorElement$constant>;
export let ScriptElementKindMemberVariableElement: ReturnType<typeof ScriptElementKindMemberVariableElement$constant>;
export let ScriptElementKindModifierAbstract: ReturnType<typeof ScriptElementKindModifierAbstract$constant>;
export let ScriptElementKindModifierAmbient: ReturnType<typeof ScriptElementKindModifierAmbient$constant>;
export let ScriptElementKindModifierCjs: ReturnType<typeof ScriptElementKindModifierCjs$constant>;
export let ScriptElementKindModifierCts: ReturnType<typeof ScriptElementKindModifierCts$constant>;
export let ScriptElementKindModifierDcts: ReturnType<typeof ScriptElementKindModifierDcts$constant>;
export let ScriptElementKindModifierDeprecated: ReturnType<typeof ScriptElementKindModifierDeprecated$constant>;
export let ScriptElementKindModifierDmts: ReturnType<typeof ScriptElementKindModifierDmts$constant>;
export let ScriptElementKindModifierDts: ReturnType<typeof ScriptElementKindModifierDts$constant>;
export let ScriptElementKindModifierExported: ReturnType<typeof ScriptElementKindModifierExported$constant>;
export let ScriptElementKindModifierJs: ReturnType<typeof ScriptElementKindModifierJs$constant>;
export let ScriptElementKindModifierJson: ReturnType<typeof ScriptElementKindModifierJson$constant>;
export let ScriptElementKindModifierJsx: ReturnType<typeof ScriptElementKindModifierJsx$constant>;
export let ScriptElementKindModifierMjs: ReturnType<typeof ScriptElementKindModifierMjs$constant>;
export let ScriptElementKindModifierMts: ReturnType<typeof ScriptElementKindModifierMts$constant>;
export let ScriptElementKindModifierNone: ReturnType<typeof ScriptElementKindModifierNone$constant>;
export let ScriptElementKindModifierOptional: ReturnType<typeof ScriptElementKindModifierOptional$constant>;
export let ScriptElementKindModifierPrivate: ReturnType<typeof ScriptElementKindModifierPrivate$constant>;
export let ScriptElementKindModifierProtected: ReturnType<typeof ScriptElementKindModifierProtected$constant>;
export let ScriptElementKindModifierPublic: ReturnType<typeof ScriptElementKindModifierPublic$constant>;
export let ScriptElementKindModifierStatic: ReturnType<typeof ScriptElementKindModifierStatic$constant>;
export let ScriptElementKindModifierTs: ReturnType<typeof ScriptElementKindModifierTs$constant>;
export let ScriptElementKindModifierTsx: ReturnType<typeof ScriptElementKindModifierTsx$constant>;
export let ScriptElementKindModuleElement: ReturnType<typeof ScriptElementKindModuleElement$constant>;
export let ScriptElementKindParameterElement: ReturnType<typeof ScriptElementKindParameterElement$constant>;
export let ScriptElementKindPrimitiveType: ReturnType<typeof ScriptElementKindPrimitiveType$constant>;
export let ScriptElementKindScriptElement: ReturnType<typeof ScriptElementKindScriptElement$constant>;
export let ScriptElementKindString: ReturnType<typeof ScriptElementKindString$constant>;
export let ScriptElementKindTypeElement: ReturnType<typeof ScriptElementKindTypeElement$constant>;
export let ScriptElementKindTypeParameterElement: ReturnType<typeof ScriptElementKindTypeParameterElement$constant>;
export let ScriptElementKindUnknown: ReturnType<typeof ScriptElementKindUnknown$constant>;
export let ScriptElementKindVariableAwaitUsingElement: ReturnType<typeof ScriptElementKindVariableAwaitUsingElement$constant>;
export let ScriptElementKindVariableElement: ReturnType<typeof ScriptElementKindVariableElement$constant>;
export let ScriptElementKindVariableUsingElement: ReturnType<typeof ScriptElementKindVariableUsingElement$constant>;
export let ScriptElementKindWarning: ReturnType<typeof ScriptElementKindWarning$constant>;
export let SemicolonPreferenceIgnore: ReturnType<typeof SemicolonPreferenceIgnore$constant>;
export let SemicolonPreferenceInsert: ReturnType<typeof SemicolonPreferenceInsert$constant>;
export let SemicolonPreferenceRemove: ReturnType<typeof SemicolonPreferenceRemove$constant>;
export { $state };
