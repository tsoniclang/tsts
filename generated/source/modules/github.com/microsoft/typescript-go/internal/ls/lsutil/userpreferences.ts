import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Options as Options__from_jsonopts } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/internal/jsonopts/package.js";
import type { Decoder as Decoder__from_jsontext, Encoder as Encoder__from_jsontext } from "../../../../../../../packages/github.com/go-json-experiment/json@v0.0.0-20260601182631-00ed12fed2a6/jsontext/package.js";
import type { Tristate as Tristate__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { SpecMatcher as SpecMatcher__from_vfsmatch } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, float64, gostring, int } from "@gotots/runtime/scalars.js";
import { TSTrue$constant as TSTrue$constant__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core, Tristate_IsUnknown as Tristate_IsUnknown__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Deterministic as Deterministic__from_json__package_1, MarshalEncode as MarshalEncode__from_json__package_1, UnmarshalDecode as UnmarshalDecode__from_json__package_1 } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/json/package.js";
import { $state } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsutil/state.js";
import { ImportModuleSpecifierEndingPreference as ImportModuleSpecifierEndingPreference__from_modulespecifiers, ImportModuleSpecifierPreference as ImportModuleSpecifierPreference__from_modulespecifiers, UserPreferences as UserPreferences__from_modulespecifiers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/modulespecifiers/package.js";
import { NewSpecMatcher as NewSpecMatcher__from_vfsmatch, UsageExclude$constant as UsageExclude$constant__from_vfsmatch } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/vfs/vfsmatch/package.js";
import { Clone$SliceOf_int$int } from "../../../../../../../support/generics/concretizations/slices/Clone.js";
import { $goInterfaceAdapter$MapOf_string_To_Interface_void, $goInterfaceAdapter$Named_lsutil$UserPreferences, $goInterfaceAdapter$PointerTo_MapOf_string_To_Interface_void, $goInterfaceAdapter$PointerTo_Named_lsutil$UserPreferences, $goInterfaceAdapter$SliceOf_Interface_void, $goInterfaceAdapter$SliceOf_string, $goInterfaceAdapter$bool, $goInterfaceAdapter$float64, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { $goMap$MapOf_string_To_Interface_void as GoMap } from "../../../../../../../support/maps.js";
import { $goReflectType$PointerTo_Named_lsutil$UserPreferences, $goReflectType$string } from "../../../../../../../support/reflection-types.js";
import "../../../../../../../support/reflection-types.js";
import { FormatCodeSettings, GetDefaultFormatCodeSettings } from "./formatcodeoptions.js";
import * as named_reflect from "@gotots/gostdlib/internal/facets/named-reflect.js";
import * as reflect__from_gostdlib from "@gotots/gostdlib/reflect.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export function NewDefaultUserPreferences(): UserPreferences {
    return new UserPreferences(GetDefaultFormatCodeSettings(), new QuotePreference(""), 0, 0, TSTrue$constant__from_core(), TSTrue$constant__from_core(), 0, 0, 0, new JsxAttributeCompletionStyle(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation(false), "", 0, 0, new OrganizeImportsCaseFirst(0), new OrganizeImportsTypeOrder(0), 0, 0, TSTrue$constant__from_core(), TSTrue$constant__from_core(), InlayHintsPreferences.$zero(), CodeLensUserPreferences.$zero(), false, TSTrue$constant__from_core(), 0, TSTrue$constant__from_core(), TSTrue$constant__from_core(), TSTrue$constant__from_core(), 0, 0, "");
}
export class UserPreferences {
    declare private readonly $goType: void;
    public constructor(public FormatCodeSettings: FormatCodeSettings, public QuotePreference: QuotePreference, public LazyConfiguredProjectsFromExternalProject: Tristate__from_core, public MaximumHoverLength: int, public IncludeCompletionsForModuleExports: Tristate__from_core, public IncludeCompletionsForImportStatements: Tristate__from_core, public IncludeAutomaticOptionalChainCompletions: Tristate__from_core, public IncludeCompletionsWithClassMemberSnippets: Tristate__from_core, public IncludeCompletionsWithObjectLiteralMethodSnippets: Tristate__from_core, public JsxAttributeCompletionStyle: JsxAttributeCompletionStyle, public ImportModuleSpecifierPreference: ImportModuleSpecifierPreference__from_modulespecifiers, public ImportModuleSpecifierEnding: ImportModuleSpecifierEndingPreference__from_modulespecifiers, public AutoImportSpecifierExcludeRegexes: RuntimeSlice<gostring>, public AutoImportFileExcludePatterns: RuntimeSlice<gostring>, public AutoImportEntrypointDirectorySearch: Tristate__from_core, public PreferTypeOnlyAutoImports: Tristate__from_core, public OrganizeImportsIgnoreCase: Tristate__from_core, public OrganizeImportsCollation: OrganizeImportsCollation, public OrganizeImportsLocale: gostring, public OrganizeImportsNumericCollation: Tristate__from_core, public OrganizeImportsAccentCollation: Tristate__from_core, public OrganizeImportsCaseFirst: OrganizeImportsCaseFirst, public OrganizeImportsTypeOrder: OrganizeImportsTypeOrder, public AllowTextChangesInNewFiles: Tristate__from_core, public UseAliasesForRename: Tristate__from_core, public AllowRenameOfImportPath: Tristate__from_core, public ProvideRefactorNotApplicableReason: Tristate__from_core, public InlayHints: InlayHintsPreferences, public CodeLens: CodeLensUserPreferences, public PreferGoToSourceDefinition: bool, public ExcludeLibrarySymbolsInNavTo: Tristate__from_core, public DisableSuggestions: Tristate__from_core, public DisableLineTextInReferences: Tristate__from_core, public DisplayPartsForJSDoc: Tristate__from_core, public ReportStyleChecksAsWarnings: Tristate__from_core, public DisableAutomaticTypeAcquisition: Tristate__from_core, public AutomaticTypeAcquisitionEnabled: Tristate__from_core, public CustomConfigFileName: gostring) {
    }
    static $zero(): UserPreferences {
        return new UserPreferences(FormatCodeSettings.$zero(), new QuotePreference(""), 0, 0, 0, 0, 0, 0, 0, new JsxAttributeCompletionStyle(""), new ImportModuleSpecifierPreference__from_modulespecifiers(""), new ImportModuleSpecifierEndingPreference__from_modulespecifiers(""), RuntimeSlice.nil<gostring>(), RuntimeSlice.nil<gostring>(), 0, 0, 0, new OrganizeImportsCollation(false), "", 0, 0, new OrganizeImportsCaseFirst(0), new OrganizeImportsTypeOrder(0), 0, 0, 0, 0, InlayHintsPreferences.$zero(), CodeLensUserPreferences.$zero(), false, 0, 0, 0, 0, 0, 0, 0, "");
    }
    static $copy($source: UserPreferences): UserPreferences {
        return new UserPreferences(FormatCodeSettings.$copy($source.FormatCodeSettings), $source.QuotePreference, $source.LazyConfiguredProjectsFromExternalProject, $source.MaximumHoverLength, $source.IncludeCompletionsForModuleExports, $source.IncludeCompletionsForImportStatements, $source.IncludeAutomaticOptionalChainCompletions, $source.IncludeCompletionsWithClassMemberSnippets, $source.IncludeCompletionsWithObjectLiteralMethodSnippets, $source.JsxAttributeCompletionStyle, $source.ImportModuleSpecifierPreference, $source.ImportModuleSpecifierEnding, $source.AutoImportSpecifierExcludeRegexes, $source.AutoImportFileExcludePatterns, $source.AutoImportEntrypointDirectorySearch, $source.PreferTypeOnlyAutoImports, $source.OrganizeImportsIgnoreCase, $source.OrganizeImportsCollation, $source.OrganizeImportsLocale, $source.OrganizeImportsNumericCollation, $source.OrganizeImportsAccentCollation, $source.OrganizeImportsCaseFirst, $source.OrganizeImportsTypeOrder, $source.AllowTextChangesInNewFiles, $source.UseAliasesForRename, $source.AllowRenameOfImportPath, $source.ProvideRefactorNotApplicableReason, InlayHintsPreferences.$copy($source.InlayHints), CodeLensUserPreferences.$copy($source.CodeLens), $source.PreferGoToSourceDefinition, $source.ExcludeLibrarySymbolsInNavTo, $source.DisableSuggestions, $source.DisableLineTextInReferences, $source.DisplayPartsForJSDoc, $source.ReportStyleChecksAsWarnings, $source.DisableAutomaticTypeAcquisition, $source.AutomaticTypeAcquisitionEnabled, $source.CustomConfigFileName);
    }
    declare private readonly then?: never;
    static MarshalJSONTo(p: tsonicTypeScriptRuntime.Location<UserPreferences> | undefined, enc: tsonicTypeScriptRuntime.Location<Encoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let config: GoMapValue<gostring, GoInterface | undefined> = GoMap.make(0, []);
        let v = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_lsutil$UserPreferences(p)).Elem();
        const __gotots_callee_4 = $state.fieldInfoCache;
        const __gotots_range_10 = (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))();
        for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_10.length; __gotots_range_index_9++) {
            const __gotots_range_value_13 = fieldInfo.$copy(fieldInfo.$fromStorage(__gotots_range_10.get(__gotots_range_index_9)));
            let info = __gotots_range_value_13;
            let field = getFieldByPath(named_reflect.ReflectValueOperations.$copy(v), fieldInfo.$storageOf(info).fieldPath);
            let val: GoInterface | undefined = serializeField(named_reflect.ReflectValueOperations.$copy(field));
            if (val === undefined) {
                continue;
            }
            if (fieldInfo.$storageOf(info).configPath !== "") {
                if (fieldInfo.$storageOf(info).configInvert) {
                    {
                        const __gotots_results_16 = (($value: GoInterface | undefined): [
                            bool,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$bool.$is($value)) {
                                return [false, false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let b = __gotots_results_16[0];
                        let ok = __gotots_results_16[1];
                        if (ok) {
                            val = new $goInterfaceAdapter$bool(!b);
                        }
                    }
                }
                setNestedValue(config, fieldInfo.$storageOf(info).configPath, val);
            }
            else if (fieldInfo.$storageOf(info).rawName !== "") {
                if (fieldInfo.$storageOf(info).rawInvert) {
                    {
                        const __gotots_results_17 = (($value: GoInterface | undefined): [
                            bool,
                            boolean
                        ] => {
                            if (!$goInterfaceAdapter$bool.$is($value)) {
                                return [false, false];
                            }
                            return [$value.$go$value, true];
                        })(val);
                        let b = __gotots_results_17[0];
                        let ok = __gotots_results_17[1];
                        if (ok) {
                            val = new $goInterfaceAdapter$bool(!b);
                        }
                    }
                }
                setNestedValue(config, "unstable." + fieldInfo.$storageOf(info).rawName, val);
            }
        }
        return MarshalEncode__from_json__package_1(enc, new $goInterfaceAdapter$MapOf_string_To_Interface_void(config), RuntimeSlice.literal<Options__from_jsonopts | undefined>([Deterministic__from_json__package_1(true)]));
    }
    static UnmarshalJSONFrom(p: tsonicTypeScriptRuntime.Location<UserPreferences> | undefined, dec: tsonicTypeScriptRuntime.Location<Decoder__from_jsontext> | undefined): $goInterface$Interface_Method_Error_void_to_string | undefined {
        let config: GoMapValue<gostring, GoInterface | undefined> = GoMap.nil();
        const config$location = tsonicTypeScriptRuntime.boundLocation({}, () => config, config$next => config = config$next);
        {
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = UnmarshalDecode__from_json__package_1(dec, new $goInterfaceAdapter$PointerTo_MapOf_string_To_Interface_void(config$location), RuntimeSlice.nil<Options__from_jsonopts | undefined>());
            if (!(err === undefined)) {
                return err;
            }
        }
        void ((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value =
            NewDefaultUserPreferences().$go$private$lsutil$withConfig(config));
        return void 0;
    }
    IsATADisabled(): bool {
        if (!Tristate_IsUnknown__from_core(this.AutomaticTypeAcquisitionEnabled)) {
            return !Tristate_IsTrue__from_core(this.AutomaticTypeAcquisitionEnabled);
        }
        return Tristate_IsTrue__from_core(this.DisableAutomaticTypeAcquisition);
    }
    ModuleSpecifierPreferences(): UserPreferences__from_modulespecifiers {
        return new UserPreferences__from_modulespecifiers(this.ImportModuleSpecifierPreference, this.ImportModuleSpecifierEnding, this.AutoImportSpecifierExcludeRegexes);
    }
    ParsedAutoImportFileExcludePatterns(useCaseSensitiveFileNames: bool): SpecMatcher__from_vfsmatch | undefined {
        return NewSpecMatcher__from_vfsmatch(this.AutoImportFileExcludePatterns, "", UsageExclude$constant__from_vfsmatch(), useCaseSensitiveFileNames);
    }
    WithOverrides(overrides: UserPreferences): UserPreferences {
        const overrides$location = tsonicTypeScriptRuntime.boundLocation({}, () => overrides, overrides$next => overrides = overrides$next);
        let p: UserPreferences = UserPreferences.$copy(this);
        const p$location = tsonicTypeScriptRuntime.boundLocation({}, () => p, p$next => p = p$next);
        mergeNonZeroFields(reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_lsutil$UserPreferences(p$location)).Elem(), reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_lsutil$UserPreferences(overrides$location)).Elem());
        return UserPreferences.$copy(p);
    }
    $go$private$lsutil$withConfig(config: GoMapValue<gostring, GoInterface | undefined>): UserPreferences {
        let p: UserPreferences = UserPreferences.$copy(this);
        const p$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => p, p$next2 => p = p$next2);
        let v = reflect__from_gostdlib.ValueOf(new $goInterfaceAdapter$PointerTo_Named_lsutil$UserPreferences(p$location2)).Elem();
        const __gotots_callee_0 = $state.fieldInfoCache;
        let infos = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
        {
            const __gotots_results_3 = (($value: GoInterface | undefined): [
                GoMapValue<gostring, GoInterface | undefined>,
                boolean
            ] => {
                if (!$goInterfaceAdapter$MapOf_string_To_Interface_void.$is($value)) {
                    return [GoMap.nil(), false];
                }
                return [$value.$go$value, true];
            })(config.lookup("unstable"));
            let unstable: GoMapValue<gostring, GoInterface | undefined> = __gotots_results_3[0];
            let ok = __gotots_results_3[1];
            if (ok) {
                const __gotots_callee_1 = $state.unstableNameIndex;
                let index: GoMapValue<gostring, int> = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))();
                const __gotots_range_4 = unstable;
                const __gotots_range_keys_0 = __gotots_range_4.keys();
                for (const __gotots_range_value_4 of __gotots_range_keys_0) {
                    const __gotots_range_value_5 = __gotots_range_4.lookupOk(__gotots_range_value_4);
                    if (!__gotots_range_value_5[1]) {
                        continue;
                    }
                    const __gotots_range_value_6 = __gotots_range_value_4;
                    const __gotots_range_value_7 = __gotots_range_value_5[0];
                    let name = __gotots_range_value_6;
                    let value: GoInterface | undefined = __gotots_range_value_7;
                    {
                        const __gotots_results_4 = index.lookupOk(name);
                        let idx = __gotots_results_4[0];
                        let found = __gotots_results_4[1];
                        if (found) {
                            let info = fieldInfo.$copy(fieldInfo.$fromStorage(infos.get(idx)));
                            let field = getFieldByPath(named_reflect.ReflectValueOperations.$copy(v), fieldInfo.$storageOf(info).fieldPath);
                            if (fieldInfo.$storageOf(info).rawInvert) {
                                {
                                    const __gotots_results_5 = (($value: GoInterface | undefined): [
                                        bool,
                                        boolean
                                    ] => {
                                        if (!$goInterfaceAdapter$bool.$is($value)) {
                                            return [false, false];
                                        }
                                        return [$value.$go$value, true];
                                    })(value);
                                    let b = __gotots_results_5[0];
                                    let ok__shadow_1 = __gotots_results_5[1];
                                    if (ok__shadow_1) {
                                        value = new $goInterfaceAdapter$bool(!b);
                                    }
                                }
                            }
                            setFieldFromValue(named_reflect.ReflectValueOperations.$copy(field), value);
                        }
                    }
                }
            }
        }
        const __gotots_range_5 = infos;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_5.length; __gotots_range_index_4++) {
            const __gotots_range_value_8 = fieldInfo.$copy(fieldInfo.$fromStorage(__gotots_range_5.get(__gotots_range_index_4)));
            let info = __gotots_range_value_8;
            if (fieldInfo.$storageOf(info).configPath === "") {
                continue;
            }
            const __gotots_results_6 = getNestedValue(config, fieldInfo.$storageOf(info).configPath);
            let val: GoInterface | undefined = __gotots_results_6[0];
            let ok = __gotots_results_6[1];
            if (!ok) {
                continue;
            }
            let field = getFieldByPath(named_reflect.ReflectValueOperations.$copy(v), fieldInfo.$storageOf(info).fieldPath);
            if (fieldInfo.$storageOf(info).configInvert) {
                {
                    const __gotots_results_7 = (($value: GoInterface | undefined): [
                        bool,
                        boolean
                    ] => {
                        if (!$goInterfaceAdapter$bool.$is($value)) {
                            return [false, false];
                        }
                        return [$value.$go$value, true];
                    })(val);
                    let b = __gotots_results_7[0];
                    let ok__shadow_1 = __gotots_results_7[1];
                    if (ok__shadow_1) {
                        val = new $goInterfaceAdapter$bool(!b);
                    }
                }
            }
            {
                const __gotots_results_8 = $state.configPathParsers.lookupOk(fieldInfo.$storageOf(info).configPath);
                let parser: (($0: GoInterface | undefined) => GoInterface | undefined) | undefined = __gotots_results_8[0];
                let ok__shadow_1 = __gotots_results_8[1];
                if (ok__shadow_1) {
                    const __gotots_receiver_7 = field;
                    const __gotots_callee_2 = parser;
                    const __gotots_argument_2 = val;
                    const __gotots_argument_3 = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                    const __gotots_argument_4 = reflect__from_gostdlib.ValueOf(__gotots_argument_3);
                    __gotots_receiver_7.Set(__gotots_argument_4);
                    continue;
                }
            }
            setFieldFromValue(named_reflect.ReflectValueOperations.$copy(field), val);
        }
        if (p.CustomConfigFileName !== "") {
            let name = strings__from_gostdlib.TrimSpace(p.CustomConfigFileName);
            if (strings__from_gostdlib.ContainsAny(name, "/\\") || name === ".." || name === ".") {
                p.CustomConfigFileName = "";
            }
            else {
                p.CustomConfigFileName = name;
            }
        }
        return UserPreferences.$copy(p);
    }
}
export class InlayHintsPreferences {
    declare private readonly $goType: void;
    public constructor(public IncludeInlayParameterNameHints: IncludeInlayParameterNameHints, public IncludeInlayParameterNameHintsWhenArgumentMatchesName: Tristate__from_core, public IncludeInlayFunctionParameterTypeHints: Tristate__from_core, public IncludeInlayVariableTypeHints: Tristate__from_core, public IncludeInlayVariableTypeHintsWhenTypeMatchesName: Tristate__from_core, public IncludeInlayPropertyDeclarationTypeHints: Tristate__from_core, public IncludeInlayFunctionLikeReturnTypeHints: Tristate__from_core, public IncludeInlayEnumMemberValueHints: Tristate__from_core) {
    }
    static $zero(): InlayHintsPreferences {
        return new InlayHintsPreferences(new IncludeInlayParameterNameHints(""), 0, 0, 0, 0, 0, 0, 0);
    }
    static $copy($source: InlayHintsPreferences): InlayHintsPreferences {
        return new InlayHintsPreferences($source.IncludeInlayParameterNameHints, $source.IncludeInlayParameterNameHintsWhenArgumentMatchesName, $source.IncludeInlayFunctionParameterTypeHints, $source.IncludeInlayVariableTypeHints, $source.IncludeInlayVariableTypeHintsWhenTypeMatchesName, $source.IncludeInlayPropertyDeclarationTypeHints, $source.IncludeInlayFunctionLikeReturnTypeHints, $source.IncludeInlayEnumMemberValueHints);
    }
    static $equal($left: InlayHintsPreferences, $right: InlayHintsPreferences): bool {
        return $left.IncludeInlayParameterNameHints.$value === $right.IncludeInlayParameterNameHints.$value && $left.IncludeInlayParameterNameHintsWhenArgumentMatchesName === $right.IncludeInlayParameterNameHintsWhenArgumentMatchesName && $left.IncludeInlayFunctionParameterTypeHints === $right.IncludeInlayFunctionParameterTypeHints && $left.IncludeInlayVariableTypeHints === $right.IncludeInlayVariableTypeHints && $left.IncludeInlayVariableTypeHintsWhenTypeMatchesName === $right.IncludeInlayVariableTypeHintsWhenTypeMatchesName && $left.IncludeInlayPropertyDeclarationTypeHints === $right.IncludeInlayPropertyDeclarationTypeHints && $left.IncludeInlayFunctionLikeReturnTypeHints === $right.IncludeInlayFunctionLikeReturnTypeHints && $left.IncludeInlayEnumMemberValueHints === $right.IncludeInlayEnumMemberValueHints;
    }
    static $hash($source: InlayHintsPreferences): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.string($source.IncludeInlayParameterNameHints.$value));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IncludeInlayParameterNameHintsWhenArgumentMatchesName));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IncludeInlayFunctionParameterTypeHints));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IncludeInlayVariableTypeHints));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IncludeInlayVariableTypeHintsWhenTypeMatchesName));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IncludeInlayPropertyDeclarationTypeHints));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IncludeInlayFunctionLikeReturnTypeHints));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.IncludeInlayEnumMemberValueHints));
        return $hash;
    }
    declare private readonly then?: never;
}
export class CodeLensUserPreferences {
    declare private readonly $goType: void;
    public constructor(public ReferencesCodeLensEnabled: Tristate__from_core, public ImplementationsCodeLensEnabled: Tristate__from_core, public ReferencesCodeLensShowOnAllFunctions: Tristate__from_core, public ImplementationsCodeLensShowOnInterfaceMethods: Tristate__from_core, public ImplementationsCodeLensShowOnAllClassMethods: Tristate__from_core) {
    }
    static $zero(): CodeLensUserPreferences {
        return new CodeLensUserPreferences(0, 0, 0, 0, 0);
    }
    static $copy($source: CodeLensUserPreferences): CodeLensUserPreferences {
        return new CodeLensUserPreferences($source.ReferencesCodeLensEnabled, $source.ImplementationsCodeLensEnabled, $source.ReferencesCodeLensShowOnAllFunctions, $source.ImplementationsCodeLensShowOnInterfaceMethods, $source.ImplementationsCodeLensShowOnAllClassMethods);
    }
    static $equal($left: CodeLensUserPreferences, $right: CodeLensUserPreferences): bool {
        return $left.ReferencesCodeLensEnabled === $right.ReferencesCodeLensEnabled && $left.ImplementationsCodeLensEnabled === $right.ImplementationsCodeLensEnabled && $left.ReferencesCodeLensShowOnAllFunctions === $right.ReferencesCodeLensShowOnAllFunctions && $left.ImplementationsCodeLensShowOnInterfaceMethods === $right.ImplementationsCodeLensShowOnInterfaceMethods && $left.ImplementationsCodeLensShowOnAllClassMethods === $right.ImplementationsCodeLensShowOnAllClassMethods;
    }
    static $hash($source: CodeLensUserPreferences): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ReferencesCodeLensEnabled));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ImplementationsCodeLensEnabled));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ReferencesCodeLensShowOnAllFunctions));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ImplementationsCodeLensShowOnInterfaceMethods));
        $hash = GoMapHash.mix($hash, GoMapHash.number($source.ImplementationsCodeLensShowOnAllClassMethods));
        return $hash;
    }
    declare private readonly then?: never;
}
export class QuotePreference {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function QuotePreferenceUnknown$constant(): QuotePreference {
    return new QuotePreference("");
}
export function QuotePreferenceAuto$constant(): QuotePreference {
    return new QuotePreference("auto");
}
export function QuotePreferenceDouble$constant(): QuotePreference {
    return new QuotePreference("double");
}
export function QuotePreferenceSingle$constant(): QuotePreference {
    return new QuotePreference("single");
}
export class JsxAttributeCompletionStyle {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function JsxAttributeCompletionStyleAuto$constant(): JsxAttributeCompletionStyle {
    return new JsxAttributeCompletionStyle("auto");
}
export function JsxAttributeCompletionStyleBraces$constant(): JsxAttributeCompletionStyle {
    return new JsxAttributeCompletionStyle("braces");
}
export function JsxAttributeCompletionStyleNone$constant(): JsxAttributeCompletionStyle {
    return new JsxAttributeCompletionStyle("none");
}
export class IncludeInlayParameterNameHints {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
}
export function IncludeInlayParameterNameHintsNone$constant(): IncludeInlayParameterNameHints {
    return new IncludeInlayParameterNameHints("");
}
export function IncludeInlayParameterNameHintsAll$constant(): IncludeInlayParameterNameHints {
    return new IncludeInlayParameterNameHints("all");
}
export function IncludeInlayParameterNameHintsLiterals$constant(): IncludeInlayParameterNameHints {
    return new IncludeInlayParameterNameHints("literals");
}
export class OrganizeImportsCollation {
    declare private readonly $goType: void;
    constructor(public readonly $value: bool) {
    }
    declare private readonly then?: never;
}
export function OrganizeImportsCollationOrdinal$constant(): OrganizeImportsCollation {
    return new OrganizeImportsCollation(false);
}
export function OrganizeImportsCollationUnicode$constant(): OrganizeImportsCollation {
    return new OrganizeImportsCollation(true);
}
export class OrganizeImportsCaseFirst {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function OrganizeImportsCaseFirstFalse$constant(): OrganizeImportsCaseFirst {
    return new OrganizeImportsCaseFirst(0);
}
export function OrganizeImportsCaseFirstLower$constant(): OrganizeImportsCaseFirst {
    return new OrganizeImportsCaseFirst(1);
}
export function OrganizeImportsCaseFirstUpper$constant(): OrganizeImportsCaseFirst {
    return new OrganizeImportsCaseFirst(2);
}
export class OrganizeImportsTypeOrder {
    declare private readonly $goType: void;
    constructor(public readonly $value: int) {
    }
    declare private readonly then?: never;
}
export function OrganizeImportsTypeOrderAuto$constant(): OrganizeImportsTypeOrder {
    return new OrganizeImportsTypeOrder(0);
}
export function OrganizeImportsTypeOrderLast$constant(): OrganizeImportsTypeOrder {
    return new OrganizeImportsTypeOrder(1);
}
export function OrganizeImportsTypeOrderInline$constant(): OrganizeImportsTypeOrder {
    return new OrganizeImportsTypeOrder(2);
}
export function OrganizeImportsTypeOrderFirst$constant(): OrganizeImportsTypeOrder {
    return new OrganizeImportsTypeOrder(3);
}
export type fieldInfo$Storage = {
    rawName: gostring;
    configPath: gostring;
    fieldPath: RuntimeSlice<int>;
    rawInvert: bool;
    configInvert: bool;
};
export class fieldInfo {
    declare private readonly $goType: void;
    public constructor(private readonly $storage: fieldInfo$Storage) {
    }
    public static $storageOf($source: fieldInfo): fieldInfo$Storage {
        return $source.$storage;
    }
    public static $fromStorage($source: fieldInfo$Storage): fieldInfo {
        return new fieldInfo($source);
    }
    public get rawName(): gostring {
        return this.$storage.rawName;
    }
    public set rawName($value: gostring) {
        this.$storage.rawName = $value;
    }
    public get configPath(): gostring {
        return this.$storage.configPath;
    }
    public set configPath($value: gostring) {
        this.$storage.configPath = $value;
    }
    public get fieldPath(): RuntimeSlice<int> {
        return this.$storage.fieldPath;
    }
    public set fieldPath($value: RuntimeSlice<int>) {
        this.$storage.fieldPath = $value;
    }
    public get rawInvert(): bool {
        return this.$storage.rawInvert;
    }
    public set rawInvert($value: bool) {
        this.$storage.rawInvert = $value;
    }
    public get configInvert(): bool {
        return this.$storage.configInvert;
    }
    public set configInvert($value: bool) {
        this.$storage.configInvert = $value;
    }
    static $copy($source: fieldInfo): fieldInfo {
        return new fieldInfo({
            rawName: $source.$storage.rawName,
            configPath: $source.$storage.configPath,
            fieldPath: $source.$storage.fieldPath,
            rawInvert: $source.$storage.rawInvert,
            configInvert: $source.$storage.configInvert
        });
    }
    static $zeroStorage(): fieldInfo$Storage {
        return {
            rawName: "",
            configPath: "",
            fieldPath: RuntimeSlice.nil<int>(),
            rawInvert: false,
            configInvert: false
        };
    }
    declare private readonly then?: never;
}
export function collectFieldInfos(t: reflect__from_gostdlib.Type | undefined, indexPath: RuntimeSlice<int>): RuntimeSlice<fieldInfo$Storage> {
    let infos = RuntimeSlice.nil<fieldInfo$Storage>();
    const __gotots_receiver_3 = t;
    const __gotots_range_0 = globalThis.Number(BigInt.asIntN(64, goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_3).NumField()));
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        let i = __gotots_range_value_0;
        const __gotots_receiver_4 = t;
        const __gotots_argument_0 = i;
        let field = goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_4).Field(BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_0)));
        let currentPath = Clone$SliceOf_int$int(indexPath).append(0, [i]);
        let rawTag = field.Tag.Get("raw");
        let configTag = field.Tag.Get("config");
        if (rawTag === "" && configTag === "") {
            const __gotots_receiver_5 = field.Type;
            if (named_reflect.ReflectKindValueOperations.$project(goInterfaceNonNil<reflect__from_gostdlib.Type>(__gotots_receiver_5).Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Struct)) {
                const __gotots_slice_build_0 = infos;
                const __gotots_slice_build_1 = collectFieldInfos(field.Type, currentPath);
                let __gotots_slice_build_2 = __gotots_slice_build_1;
                if (__gotots_slice_build_1.length > 0) {
                    __gotots_slice_build_2 = goSliceAllocate<fieldInfo$Storage>(__gotots_slice_build_1.length, null);
                    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_1.length; __gotots_slice_build_5++) {
                        __gotots_slice_build_2.set(__gotots_slice_build_5, fieldInfo.$storageOf(fieldInfo.$copy(fieldInfo.$fromStorage(__gotots_slice_build_1.get(__gotots_slice_build_5)))));
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
                    __gotots_slice_build_3 = goSliceAllocate<fieldInfo$Storage>(__gotots_slice_build_4, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_4));
                    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_0.length; __gotots_slice_build_5++) {
                        __gotots_slice_build_3.set(__gotots_slice_build_5, fieldInfo.$storageOf(fieldInfo.$copy(fieldInfo.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_5)))));
                    }
                    for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_2.length; __gotots_slice_build_5++) {
                        __gotots_slice_build_3.set(__gotots_slice_build_0.length + __gotots_slice_build_5, __gotots_slice_build_2.get(__gotots_slice_build_5));
                    }
                    for (let __gotots_slice_build_5 = __gotots_slice_build_4; __gotots_slice_build_5 < __gotots_slice_build_3.capacity; __gotots_slice_build_5++) {
                        __gotots_slice_build_3.$initialize(__gotots_slice_build_5, fieldInfo.$zeroStorage());
                    }
                }
                infos = __gotots_slice_build_3;
                continue;
            }
            const __gotots_argument_1 = new GoInterfaceAdapter("raw or config tag required for field " + field.Name);
            GoPanic.raise(__gotots_argument_1 === undefined ? GoPanicNilValue.create() : __gotots_argument_1);
        }
        let info = fieldInfo.$fromStorage({
            fieldPath: currentPath,
            rawName: "",
            configPath: "",
            rawInvert: false,
            configInvert: false
        });
        if (rawTag !== "") {
            let parts = strings__from_gostdlib.Split(rawTag, ",");
            fieldInfo.$storageOf(info).rawName = parts.get(0);
            const __gotots_range_1 = parts.slice(1, null, null);
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
                let part = __gotots_range_value_1;
                if (part === "invert") {
                    fieldInfo.$storageOf(info).rawInvert = true;
                }
            }
        }
        if (configTag !== "") {
            let parts = strings__from_gostdlib.Split(configTag, ",");
            fieldInfo.$storageOf(info).configPath = parts.get(0);
            const __gotots_range_2 = parts.slice(1, null, null);
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let part = __gotots_range_value_2;
                if (part === "invert") {
                    fieldInfo.$storageOf(info).configInvert = true;
                }
            }
        }
        const __gotots_slice_build_6 = infos;
        const __gotots_slice_build_8 = __gotots_slice_build_6.length + 1;
        let __gotots_slice_build_7 = __gotots_slice_build_6;
        if (__gotots_slice_build_8 <= __gotots_slice_build_6.capacity) {
            __gotots_slice_build_7 = __gotots_slice_build_6.$withLength(__gotots_slice_build_8);
            __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, fieldInfo.$storageOf(fieldInfo.$copy(info)));
        }
        else {
            __gotots_slice_build_7 = goSliceAllocate<fieldInfo$Storage>(__gotots_slice_build_8, RuntimeSlice.$grownCapacity(__gotots_slice_build_6.capacity, __gotots_slice_build_8));
            for (let __gotots_slice_build_9 = 0; __gotots_slice_build_9 < __gotots_slice_build_6.length; __gotots_slice_build_9++) {
                __gotots_slice_build_7.set(__gotots_slice_build_9, fieldInfo.$storageOf(fieldInfo.$copy(fieldInfo.$fromStorage(__gotots_slice_build_6.get(__gotots_slice_build_9)))));
            }
            __gotots_slice_build_7.set(__gotots_slice_build_6.length + 0, fieldInfo.$storageOf(fieldInfo.$copy(info)));
            for (let __gotots_slice_build_9 = __gotots_slice_build_8; __gotots_slice_build_9 < __gotots_slice_build_7.capacity; __gotots_slice_build_9++) {
                __gotots_slice_build_7.$initialize(__gotots_slice_build_9, fieldInfo.$zeroStorage());
            }
        }
        infos = __gotots_slice_build_7;
    }
    return infos;
}
export function getNestedValue(config: GoMapValue<gostring, GoInterface | undefined>, path: gostring): [
    GoInterface | undefined,
    bool
] {
    let parts = strings__from_gostdlib.Split(path, ".");
    let current: GoInterface | undefined = new $goInterfaceAdapter$MapOf_string_To_Interface_void(config);
    const __gotots_range_8 = parts;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < __gotots_range_8.length; __gotots_range_index_7++) {
        const __gotots_range_value_11 = __gotots_range_8.get(__gotots_range_index_7);
        let part = __gotots_range_value_11;
        const __gotots_results_14 = (($value: GoInterface | undefined): [
            GoMapValue<gostring, GoInterface | undefined>,
            boolean
        ] => {
            if (!$goInterfaceAdapter$MapOf_string_To_Interface_void.$is($value)) {
                return [GoMap.nil(), false];
            }
            return [$value.$go$value, true];
        })(current);
        let m: GoMapValue<gostring, GoInterface | undefined> = __gotots_results_14[0];
        let ok = __gotots_results_14[1];
        if (!ok) {
            return [void 0, false];
        }
        const __gotots_results_15 = m.lookupOk(part);
        current = __gotots_results_15[0];
        ok = __gotots_results_15[1];
        if (!ok) {
            return [void 0, false];
        }
    }
    return [current, true];
}
export function setNestedValue(config: GoMapValue<gostring, GoInterface | undefined>, path: gostring, value: GoInterface | undefined): void {
    let parts = strings__from_gostdlib.Split(path, ".");
    let current: GoMapValue<gostring, GoInterface | undefined> = config;
    const __gotots_range_12 = parts.slice(0, parts.length - 1, null);
    for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_12.length; __gotots_range_index_11++) {
        const __gotots_range_value_15 = __gotots_range_12.get(__gotots_range_index_11);
        let part = __gotots_range_value_15;
        const __gotots_results_19 = (($value: GoInterface | undefined): [
            GoMapValue<gostring, GoInterface | undefined>,
            boolean
        ] => {
            if (!$goInterfaceAdapter$MapOf_string_To_Interface_void.$is($value)) {
                return [GoMap.nil(), false];
            }
            return [$value.$go$value, true];
        })(current.lookup(part));
        let next: GoMapValue<gostring, GoInterface | undefined> = __gotots_results_19[0];
        let ok = __gotots_results_19[1];
        if (!ok) {
            next = GoMap.make(0, []);
            current.store(part, new $goInterfaceAdapter$MapOf_string_To_Interface_void(next));
        }
        current = next;
    }
    current.store(parts.get(parts.length - 1), value);
}
export function getFieldByPath(v: reflect__from_gostdlib.Value, path: RuntimeSlice<int>): reflect__from_gostdlib.Value {
    const __gotots_range_6 = path;
    for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_6.length; __gotots_range_index_5++) {
        const __gotots_range_value_9 = __gotots_range_6.get(__gotots_range_index_5);
        let idx = __gotots_range_value_9;
        v = v.Field(BigInt.asIntN(64, goNumberToBigInt(idx)));
    }
    return named_reflect.ReflectValueOperations.$copy(v);
}
export function setFieldFromValue(field: reflect__from_gostdlib.Value, val: GoInterface | undefined): void {
    if (val === undefined) {
        return;
    }
    {
        const __gotots_results_9 = $state.typeParsers.lookupOk(field.Type());
        let parser: (($0: GoInterface | undefined) => GoInterface | undefined) | undefined = __gotots_results_9[0];
        let ok = __gotots_results_9[1];
        if (ok) {
            const __gotots_receiver_9 = field;
            const __gotots_callee_3 = parser;
            const __gotots_argument_5 = val;
            const __gotots_argument_6 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5);
            const __gotots_argument_7 = reflect__from_gostdlib.ValueOf(__gotots_argument_6);
            __gotots_receiver_9.Set(__gotots_argument_7);
            return;
        }
    }
    switch (named_reflect.ReflectKindValueOperations.$project(field.Kind())) {
        case 1n: {
            {
                const __gotots_results_10 = (($value: GoInterface | undefined): [
                    bool,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$bool.$is($value)) {
                        return [false, false];
                    }
                    return [$value.$go$value, true];
                })(val);
                let b = __gotots_results_10[0];
                let ok = __gotots_results_10[1];
                if (ok) {
                    field.SetBool(b);
                }
            }
            break;
        }
        case 2n: {
            const __gotots_type_switch_1: GoInterface | undefined = val;
            switch (true) {
                case $goInterfaceAdapter$int.$is(__gotots_type_switch_1): {
                    let v: int = __gotots_type_switch_1.$go$value;
                    field.SetInt(BigInt.asIntN(64, goNumberToBigInt(v)));
                    break;
                }
                case $goInterfaceAdapter$float64.$is(__gotots_type_switch_1): {
                    let v: float64 = __gotots_type_switch_1.$go$value;
                    field.SetInt(BigInt.asIntN(64, goNumberToBigInt(v)));
                    break;
                }
            }
            break;
        }
        case 24n: {
            {
                const __gotots_results_11 = (($value: GoInterface | undefined): [
                    gostring,
                    boolean
                ] => {
                    if (!GoInterfaceAdapter.$is($value)) {
                        return ["", false];
                    }
                    return [$value.$go$value, true];
                })(val);
                let s = __gotots_results_11[0];
                let ok = __gotots_results_11[1];
                if (ok) {
                    field.SetString(s);
                }
            }
            break;
        }
        case 23n: {
            {
                const __gotots_results_12 = (($value: GoInterface | undefined): [
                    RuntimeSlice<GoInterface | undefined>,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$SliceOf_Interface_void.$is($value)) {
                        return [RuntimeSlice.nil<GoInterface | undefined>(), false];
                    }
                    return [$value.$go$value, true];
                })(val);
                let arr = __gotots_results_12[0];
                let ok = __gotots_results_12[1];
                if (ok) {
                    let result = reflect__from_gostdlib.MakeSlice(field.Type(), BigInt.asIntN(64, goNumberToBigInt(0)), BigInt.asIntN(64, goNumberToBigInt(arr.length)));
                    const __gotots_range_7 = arr;
                    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_7.length; __gotots_range_index_6++) {
                        const __gotots_range_value_10 = __gotots_range_7.get(__gotots_range_index_6);
                        let item: GoInterface | undefined = __gotots_range_value_10;
                        {
                            const __gotots_results_13 = (($value: GoInterface | undefined): [
                                gostring,
                                boolean
                            ] => {
                                if (!GoInterfaceAdapter.$is($value)) {
                                    return ["", false];
                                }
                                return [$value.$go$value, true];
                            })(item);
                            let s = __gotots_results_13[0];
                            let ok__shadow_1 = __gotots_results_13[1];
                            if (ok__shadow_1) {
                                result = reflect__from_gostdlib.Append(named_reflect.ReflectValueOperations.$copy(result), RuntimeSlice.literal<reflect__from_gostdlib.Value>([reflect__from_gostdlib.ValueOf(new GoInterfaceAdapter(s))]));
                            }
                        }
                    }
                    field.Set(named_reflect.ReflectValueOperations.$copy(result));
                }
            }
            break;
        }
    }
}
export function serializeField(field: reflect__from_gostdlib.Value): GoInterface | undefined {
    {
        const __gotots_results_18 = $state.typeSerializers.lookupOk(field.Type());
        let serializer: (($0: GoInterface | undefined) => GoInterface | undefined) | undefined = __gotots_results_18[0];
        let ok = __gotots_results_18[1];
        if (ok) {
            const __gotots_callee_5 = serializer;
            const __gotots_argument_8 = field.Interface();
            return (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
        }
    }
    switch (named_reflect.ReflectKindValueOperations.$project(field.Kind())) {
        case 1n: {
            return new $goInterfaceAdapter$bool(field.Bool());
            break;
        }
        case 2n: {
            return new $goInterfaceAdapter$int(globalThis.Number(BigInt.asIntN(64, field.Int())));
            break;
        }
        case 24n: {
            return new GoInterfaceAdapter(field.String());
            break;
        }
        case 23n: {
            if (field.IsNil()) {
                return void 0;
            }
            let result = RuntimeSlice.make<gostring>(globalThis.Number(BigInt.asIntN(64, field.Len())), null, "");
            const __gotots_range_11 = globalThis.Number(BigInt.asIntN(64, field.Len()));
            for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_11; __gotots_range_index_10++) {
                const __gotots_range_value_14 = __gotots_range_index_10;
                let i = __gotots_range_value_14;
                result.set(i, field.Index(BigInt.asIntN(64, goNumberToBigInt(i))).String());
            }
            return new $goInterfaceAdapter$SliceOf_string(result);
            break;
        }
        default: {
            return field.Interface();
            break;
        }
    }
}
export function mergeNonZeroFields(dst: reflect__from_gostdlib.Value, src: reflect__from_gostdlib.Value): void {
    const __gotots_range_9 = globalThis.Number(BigInt.asIntN(64, dst.NumField()));
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_9; __gotots_range_index_8++) {
        const __gotots_range_value_12 = __gotots_range_index_8;
        let i = __gotots_range_value_12;
        let srcField = src.Field(BigInt.asIntN(64, goNumberToBigInt(i)));
        let dstField = dst.Field(BigInt.asIntN(64, goNumberToBigInt(i)));
        if (named_reflect.ReflectKindValueOperations.$project(srcField.Kind()) === named_reflect.ReflectKindValueOperations.$project(reflect__from_gostdlib.Struct)) {
            mergeNonZeroFields(named_reflect.ReflectValueOperations.$copy(dstField), named_reflect.ReflectValueOperations.$copy(srcField));
            continue;
        }
        if (!srcField.IsZero()) {
            dstField.Set(named_reflect.ReflectValueOperations.$copy(srcField));
        }
    }
}
export function ParseUserPreferences(items: GoMapValue<gostring, GoInterface | undefined>): UserPreferences {
    let prefs = NewDefaultUserPreferences();
    {
        const __gotots_results_0 = items.lookupOk("editor");
        let editorItem: GoInterface | undefined = __gotots_results_0[0];
        let ok = __gotots_results_0[1];
        if (ok && !(editorItem === undefined)) {
            {
                const __gotots_results_1 = (($value: GoInterface | undefined): [
                    GoMapValue<gostring, GoInterface | undefined>,
                    boolean
                ] => {
                    if (!$goInterfaceAdapter$MapOf_string_To_Interface_void.$is($value)) {
                        return [GoMap.nil(), false];
                    }
                    return [$value.$go$value, true];
                })(editorItem);
                let editorSettings: GoMapValue<gostring, GoInterface | undefined> = __gotots_results_1[0];
                let ok__shadow_1 = __gotots_results_1[1];
                if (ok__shadow_1) {
                    prefs = prefs.$go$private$lsutil$withConfig(GoMap.make(1, [["unstable", new $goInterfaceAdapter$MapOf_string_To_Interface_void(editorSettings)]]));
                }
            }
        }
    }
    const __gotots_range_3 = RuntimeSlice.literal<gostring>(["javascript", "typescript", "js/ts"]);
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_3 = __gotots_range_3.get(__gotots_range_index_3);
        let section = __gotots_range_value_3;
        {
            const __gotots_results_2 = items.lookupOk(section);
            let item: GoInterface | undefined = __gotots_results_2[0];
            let ok = __gotots_results_2[1];
            if (ok && !(item === undefined)) {
                const __gotots_type_switch_0: GoInterface | undefined = item;
                switch (true) {
                    case $goInterfaceAdapter$MapOf_string_To_Interface_void.$is(__gotots_type_switch_0): {
                        let settings: GoMapValue<gostring, GoInterface | undefined> = __gotots_type_switch_0.$go$value;
                        prefs = prefs.$go$private$lsutil$withConfig(settings);
                        break;
                    }
                    case $goInterfaceAdapter$Named_lsutil$UserPreferences.$is(__gotots_type_switch_0): {
                        let settings: UserPreferences = UserPreferences.$copy(__gotots_type_switch_0.$go$value);
                        prefs = prefs.WithOverrides(UserPreferences.$copy(settings));
                        break;
                    }
                }
            }
        }
    }
    return UserPreferences.$copy(prefs);
}
