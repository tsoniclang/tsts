/**
 * User preference model.
 */

import {
  Tristate,
  tristateIsTrue,
  type Tristate as TristateValue,
} from "../../core/index.js";

export interface UserPreferences {
  readonly quotePreference?: QuotePreference;
  readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
  readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
  readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
  readonly organizeImportsIgnoreCase?: TristateValue;
  readonly organizeImportsCollation?: OrganizeImportsCollation;
  readonly organizeImportsLocale?: string;
  readonly organizeImportsNumericCollation?: TristateValue;
  readonly organizeImportsAccentCollation?: TristateValue;
  readonly organizeImportsCaseFirst?: OrganizeImportsCaseFirst;
  readonly organizeImportsTypeOrder?: OrganizeImportsTypeOrder;
  readonly allowTextChangesInNewFiles?: boolean;
  readonly allowRenameOfImportPath?: TristateValue;
  readonly useAliasesForRename?: TristateValue;
  readonly inlayHints?: InlayHintsPreferences;
  readonly codeLens?: CodeLensUserPreferences;
}

export type QuotePreference = "" | "auto" | "double" | "single";
export const QuotePreferenceUnknown: QuotePreference = "";
export const QuotePreferenceAuto: QuotePreference = "auto";
export const QuotePreferenceDouble: QuotePreference = "double";
export const QuotePreferenceSingle: QuotePreference = "single";

export type OrganizeImportsCollation = "ordinal" | "unicode";
export const OrganizeImportsCollationOrdinal: OrganizeImportsCollation = "ordinal";
export const OrganizeImportsCollationUnicode: OrganizeImportsCollation = "unicode";

export type OrganizeImportsCaseFirst = "" | "lower" | "upper";
export const OrganizeImportsCaseFirstFalse: OrganizeImportsCaseFirst = "";
export const OrganizeImportsCaseFirstLower: OrganizeImportsCaseFirst = "lower";
export const OrganizeImportsCaseFirstUpper: OrganizeImportsCaseFirst = "upper";

export type OrganizeImportsTypeOrder = "auto" | "last" | "inline" | "first";
export const OrganizeImportsTypeOrderAuto: OrganizeImportsTypeOrder = "auto";
export const OrganizeImportsTypeOrderLast: OrganizeImportsTypeOrder = "last";
export const OrganizeImportsTypeOrderInline: OrganizeImportsTypeOrder = "inline";
export const OrganizeImportsTypeOrderFirst: OrganizeImportsTypeOrder = "first";

export type IncludeInlayParameterNameHints = "" | "all" | "literals";
export const IncludeInlayParameterNameHintsNone: IncludeInlayParameterNameHints = "";
export const IncludeInlayParameterNameHintsAll: IncludeInlayParameterNameHints = "all";
export const IncludeInlayParameterNameHintsLiterals: IncludeInlayParameterNameHints = "literals";

export interface InlayHintsPreferences {
  readonly includeInlayParameterNameHints: IncludeInlayParameterNameHints;
  readonly includeInlayParameterNameHintsWhenArgumentMatchesName: TristateValue;
  readonly includeInlayFunctionParameterTypeHints: TristateValue;
  readonly includeInlayVariableTypeHints: TristateValue;
  readonly includeInlayVariableTypeHintsWhenTypeMatchesName: TristateValue;
  readonly includeInlayPropertyDeclarationTypeHints: TristateValue;
  readonly includeInlayFunctionLikeReturnTypeHints: TristateValue;
  readonly includeInlayEnumMemberValueHints: TristateValue;
}

export function defaultInlayHintsPreferences(): InlayHintsPreferences {
  return {
    includeInlayParameterNameHints: IncludeInlayParameterNameHintsNone,
    includeInlayParameterNameHintsWhenArgumentMatchesName: Tristate.Unknown,
    includeInlayFunctionParameterTypeHints: Tristate.Unknown,
    includeInlayVariableTypeHints: Tristate.Unknown,
    includeInlayVariableTypeHintsWhenTypeMatchesName: Tristate.Unknown,
    includeInlayPropertyDeclarationTypeHints: Tristate.Unknown,
    includeInlayFunctionLikeReturnTypeHints: Tristate.Unknown,
    includeInlayEnumMemberValueHints: Tristate.Unknown,
  };
}

export interface CodeLensPreferenceFlag {
  readonly value: TristateValue;
  isTrue(): boolean;
}

export interface CodeLensUserPreferences {
  readonly referencesCodeLensEnabled: CodeLensPreferenceFlag;
  readonly implementationsCodeLensEnabled: CodeLensPreferenceFlag;
  readonly referencesCodeLensShowOnAllFunctions: CodeLensPreferenceFlag;
  readonly implementationsCodeLensShowOnInterfaceMethods: CodeLensPreferenceFlag;
  readonly implementationsCodeLensShowOnAllClassMethods: CodeLensPreferenceFlag;
}

export interface CodeLensUserPreferenceInit {
  readonly referencesCodeLensEnabled?: TristateValue | boolean;
  readonly implementationsCodeLensEnabled?: TristateValue | boolean;
  readonly referencesCodeLensShowOnAllFunctions?: TristateValue | boolean;
  readonly implementationsCodeLensShowOnInterfaceMethods?: TristateValue | boolean;
  readonly implementationsCodeLensShowOnAllClassMethods?: TristateValue | boolean;
}

export function createCodeLensUserPreferences(
  init: CodeLensUserPreferenceInit = {},
): CodeLensUserPreferences {
  return {
    referencesCodeLensEnabled: codeLensPreferenceFlag(init.referencesCodeLensEnabled),
    implementationsCodeLensEnabled: codeLensPreferenceFlag(init.implementationsCodeLensEnabled),
    referencesCodeLensShowOnAllFunctions: codeLensPreferenceFlag(init.referencesCodeLensShowOnAllFunctions),
    implementationsCodeLensShowOnInterfaceMethods: codeLensPreferenceFlag(init.implementationsCodeLensShowOnInterfaceMethods),
    implementationsCodeLensShowOnAllClassMethods: codeLensPreferenceFlag(init.implementationsCodeLensShowOnAllClassMethods),
  };
}

export function defaultCodeLensUserPreferences(): CodeLensUserPreferences {
  return createCodeLensUserPreferences();
}

function codeLensPreferenceFlag(value: TristateValue | boolean | undefined): CodeLensPreferenceFlag {
  const tristate = typeof value === "boolean"
    ? (value ? Tristate.True : Tristate.False)
    : value ?? Tristate.Unknown;
  return {
    value: tristate,
    isTrue(): boolean {
      return tristateIsTrue(tristate);
    },
  };
}
