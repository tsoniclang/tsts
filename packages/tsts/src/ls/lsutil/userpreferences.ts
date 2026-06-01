/**
 * User preference model.
 */

import {
  Tristate,
  boolToTristate,
  tristateToJSON,
  tristateIsTrue,
  tristateFromJSON,
  type Tristate as TristateValue,
} from "../../core/index.js";
import {
  ImportModuleSpecifierEndingPreference,
  ImportModuleSpecifierPreference,
  isExcludedByRegex,
  type ImportModuleSpecifierEndingPreference as ImportModuleSpecifierEndingPreferenceValue,
  type ImportModuleSpecifierPreference as ImportModuleSpecifierPreferenceValue,
  type UserPreferences as ModuleSpecifierUserPreferences,
} from "../../modulespecifiers/index.js";
import { Usage, newSpecMatcher, type SpecMatcher } from "../../vfs/vfsmatch/index.js";
import {
  getDefaultFormatCodeSettings,
  parseIndentStyle,
  parseSemicolonPreference,
  type FormatCodeSettings,
} from "./formatCodeOptions.js";

export interface UserPreferences {
  readonly formatCodeSettings?: FormatCodeSettings;
  readonly quotePreference?: QuotePreference;
  readonly lazyConfiguredProjectsFromExternalProject?: TristateValue;
  readonly maximumHoverLength?: number;
  readonly includeCompletionsForModuleExports?: TristateValue;
  readonly includeCompletionsForImportStatements?: TristateValue;
  readonly includeAutomaticOptionalChainCompletions?: TristateValue;
  readonly includeCompletionsWithClassMemberSnippets?: TristateValue;
  readonly includeCompletionsWithObjectLiteralMethodSnippets?: TristateValue;
  readonly jsxAttributeCompletionStyle?: JsxAttributeCompletionStyle;
  readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
  readonly importModuleSpecifierPreference?: ImportModuleSpecifierPreferenceValue;
  readonly importModuleSpecifierEnding?: ImportModuleSpecifierEndingPreferenceValue;
  readonly autoImportSpecifierExcludeRegexes?: readonly string[];
  readonly autoImportFileExcludePatterns?: readonly string[];
  readonly autoImportEntrypointDirectorySearch?: TristateValue;
  readonly preferTypeOnlyAutoImports?: TristateValue;
  readonly organizeImportsIgnoreCase?: TristateValue;
  readonly organizeImportsCollation?: OrganizeImportsCollation;
  readonly organizeImportsLocale?: string;
  readonly organizeImportsNumericCollation?: TristateValue;
  readonly organizeImportsAccentCollation?: TristateValue;
  readonly organizeImportsCaseFirst?: OrganizeImportsCaseFirst;
  readonly organizeImportsTypeOrder?: OrganizeImportsTypeOrder;
  readonly allowTextChangesInNewFiles?: TristateValue;
  readonly allowRenameOfImportPath?: TristateValue;
  readonly useAliasesForRename?: TristateValue;
  readonly provideRefactorNotApplicableReason?: TristateValue;
  readonly inlayHints?: InlayHintsPreferences;
  readonly codeLens?: CodeLensUserPreferences;
  readonly preferGoToSourceDefinition?: boolean;
  readonly excludeLibrarySymbolsInNavTo?: TristateValue;
  readonly disableSuggestions?: TristateValue;
  readonly disableLineTextInReferences?: TristateValue;
  readonly displayPartsForJSDoc?: TristateValue;
  readonly reportStyleChecksAsWarnings?: TristateValue;
  readonly disableAutomaticTypeAcquisition?: TristateValue;
  readonly automaticTypeAcquisitionEnabled?: TristateValue;
  readonly customConfigFileName?: string;
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

export type JsxAttributeCompletionStyle = "" | "auto" | "braces" | "none";
export const JsxAttributeCompletionStyleUnknown: JsxAttributeCompletionStyle = "";
export const JsxAttributeCompletionStyleAuto: JsxAttributeCompletionStyle = "auto";
export const JsxAttributeCompletionStyleBraces: JsxAttributeCompletionStyle = "braces";
export const JsxAttributeCompletionStyleNone: JsxAttributeCompletionStyle = "none";

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

export function newDefaultUserPreferences(): UserPreferences {
  return {
    formatCodeSettings: getDefaultFormatCodeSettings(),
    includeCompletionsForModuleExports: Tristate.True,
    includeCompletionsForImportStatements: Tristate.True,
    allowRenameOfImportPath: Tristate.True,
    provideRefactorNotApplicableReason: Tristate.True,
    displayPartsForJSDoc: Tristate.True,
    disableLineTextInReferences: Tristate.True,
    reportStyleChecksAsWarnings: Tristate.True,
    excludeLibrarySymbolsInNavTo: Tristate.True,
    inlayHints: defaultInlayHintsPreferences(),
    codeLens: defaultCodeLensUserPreferences(),
  };
}

export function isATADisabled(preferences: UserPreferences): boolean {
  if ((preferences.automaticTypeAcquisitionEnabled ?? Tristate.Unknown) !== Tristate.Unknown) {
    return preferences.automaticTypeAcquisitionEnabled !== Tristate.True;
  }
  return preferences.disableAutomaticTypeAcquisition === Tristate.True;
}

export function withConfig(preferences: UserPreferences, config: Readonly<Record<string, unknown>>): UserPreferences {
  let result = preferences;
  const unstable = objectRecord(config.unstable);
  if (unstable !== undefined) {
    for (const [rawName, value] of Object.entries(unstable)) {
      const field = preferenceFields.find((entry) => entry.rawName === rawName);
      if (field !== undefined) result = field.set(result, field.parse(applyInvert(value, field.rawInvert)));
    }
  }

  for (const field of preferenceFields) {
    if (field.configPath === undefined) continue;
    const value = getNestedValue(config, field.configPath);
    if (value.exists) result = field.set(result, field.parse(applyInvert(value.value, field.configInvert)));
  }

  const customConfigFileName = normalizeCustomConfigFileName(result.customConfigFileName ?? "");
  if (customConfigFileName !== result.customConfigFileName) {
    result = { ...result, customConfigFileName };
  }
  return result;
}

export function withOverrides(preferences: UserPreferences, overrides: UserPreferences): UserPreferences {
  const result: MutableUserPreferences = { ...preferences };
  const writableResult = result as Record<string, unknown>;
  for (const key of Object.keys(overrides) as readonly (keyof UserPreferences)[]) {
    const value = overrides[key];
    if (value === undefined || value === "" || value === Tristate.Unknown) continue;
    writableResult[key] = mergePreferenceValue(preferences[key], value);
  }
  return result;
}

export function parseUserPreferences(items: Readonly<Record<string, unknown>>): UserPreferences {
  let preferences = newDefaultUserPreferences();
  const editor = objectRecord(items.editor);
  if (editor !== undefined) preferences = withConfig(preferences, { unstable: editor });

  for (const section of ["javascript", "typescript", "js/ts"] as const) {
    const item = items[section];
    const config = objectRecord(item);
    if (config !== undefined) {
      preferences = withConfig(preferences, config);
    } else if (isUserPreferences(item)) {
      preferences = withOverrides(preferences, item);
    }
  }
  return preferences;
}

export function userPreferencesFromJSON(config: Readonly<Record<string, unknown>>): UserPreferences {
  return withConfig(newDefaultUserPreferences(), config);
}

export function userPreferencesToJSON(preferences: UserPreferences): Record<string, unknown> {
  const config: Record<string, unknown> = {};
  for (const field of preferenceFields) {
    const value = field.serialize(field.get(preferences));
    if (value === undefined || value === null) continue;

    if (field.configPath !== undefined) {
      setNestedValue(config, field.configPath, applyInvert(value, field.configInvert));
    } else if (field.rawName !== undefined) {
      setNestedValue(config, "unstable." + field.rawName, applyInvert(value, field.rawInvert));
    }
  }
  return config;
}

export function moduleSpecifierPreferences(preferences: UserPreferences): ModuleSpecifierUserPreferences {
  return {
    importModuleSpecifierPreference: preferences.importModuleSpecifierPreference ?? ImportModuleSpecifierPreference.Shortest,
    importModuleSpecifierEnding: preferences.importModuleSpecifierEnding ?? ImportModuleSpecifierEndingPreference.Auto,
    autoImportSpecifierExcludeRegexes: preferences.autoImportSpecifierExcludeRegexes ?? [],
  };
}

export function parsedAutoImportFileExcludePatterns(
  preferences: UserPreferences,
  useCaseSensitiveFileNames: boolean,
): SpecMatcher | undefined {
  return newSpecMatcher(preferences.autoImportFileExcludePatterns ?? [], "", Usage.Exclude, useCaseSensitiveFileNames);
}

export function isModuleSpecifierExcluded(preferences: UserPreferences, moduleSpecifier: string): boolean {
  return isExcludedByRegex(moduleSpecifier, preferences.autoImportSpecifierExcludeRegexes ?? []);
}

interface PreferenceField {
  readonly rawName?: string | undefined;
  readonly configPath?: string | undefined;
  readonly rawInvert?: boolean | undefined;
  readonly configInvert?: boolean | undefined;
  readonly get: (preferences: UserPreferences) => unknown;
  readonly set: (preferences: UserPreferences, value: unknown) => UserPreferences;
  readonly parse: (value: unknown) => unknown;
  readonly serialize: (value: unknown) => unknown;
}

type MutableUserPreferences = {
  -readonly [K in keyof UserPreferences]: UserPreferences[K];
};

const preferenceFields: readonly PreferenceField[] = [
  field("quotePreference", "preferences.quoteStyle", p => p.quotePreference, (p, v) => ({ ...p, quotePreference: parseQuotePreference(v) }), identityPreference),
  field("lazyConfiguredProjectsFromExternalProject", undefined, p => p.lazyConfiguredProjectsFromExternalProject, (p, v) => ({ ...p, lazyConfiguredProjectsFromExternalProject: parseTristate(v) }), serializeTristate),
  field("maximumHoverLength", undefined, p => p.maximumHoverLength, (p, v) => ({ ...p, maximumHoverLength: parseInteger(v) }), identityPreference),
  field("includeCompletionsForModuleExports", "suggest.autoImports", p => p.includeCompletionsForModuleExports, (p, v) => ({ ...p, includeCompletionsForModuleExports: parseTristate(v) }), serializeTristate),
  field("includeCompletionsForImportStatements", "suggest.includeCompletionsForImportStatements", p => p.includeCompletionsForImportStatements, (p, v) => ({ ...p, includeCompletionsForImportStatements: parseTristate(v) }), serializeTristate),
  field("includeAutomaticOptionalChainCompletions", "suggest.includeAutomaticOptionalChainCompletions", p => p.includeAutomaticOptionalChainCompletions, (p, v) => ({ ...p, includeAutomaticOptionalChainCompletions: parseTristate(v) }), serializeTristate),
  field("includeCompletionsWithClassMemberSnippets", "suggest.classMemberSnippets.enabled", p => p.includeCompletionsWithClassMemberSnippets, (p, v) => ({ ...p, includeCompletionsWithClassMemberSnippets: parseTristate(v) }), serializeTristate),
  field("includeCompletionsWithObjectLiteralMethodSnippets", "suggest.objectLiteralMethodSnippets.enabled", p => p.includeCompletionsWithObjectLiteralMethodSnippets, (p, v) => ({ ...p, includeCompletionsWithObjectLiteralMethodSnippets: parseTristate(v) }), serializeTristate),
  field("jsxAttributeCompletionStyle", "preferences.jsxAttributeCompletionStyle", p => p.jsxAttributeCompletionStyle, (p, v) => ({ ...p, jsxAttributeCompletionStyle: parseJsxAttributeCompletionStyle(v) }), identityPreference),
  field("importModuleSpecifierPreference", "preferences.importModuleSpecifier", p => p.importModuleSpecifierPreference, (p, v) => ({ ...p, importModuleSpecifierPreference: parseImportModuleSpecifierPreference(v) }), identityPreference),
  field("importModuleSpecifierEnding", "preferences.importModuleSpecifierEnding", p => p.importModuleSpecifierEnding, (p, v) => ({ ...p, importModuleSpecifierEnding: parseImportModuleSpecifierEnding(v) }), identityPreference),
  field("autoImportSpecifierExcludeRegexes", "preferences.autoImportSpecifierExcludeRegexes", p => p.autoImportSpecifierExcludeRegexes, (p, v) => ({ ...p, autoImportSpecifierExcludeRegexes: parseStringArray(v) }), identityPreference),
  field("autoImportFileExcludePatterns", "preferences.autoImportFileExcludePatterns", p => p.autoImportFileExcludePatterns, (p, v) => ({ ...p, autoImportFileExcludePatterns: parseStringArray(v) }), identityPreference),
  field("autoImportEntrypointDirectorySearch", "preferences.autoImportEntrypointDirectorySearch", p => p.autoImportEntrypointDirectorySearch, (p, v) => ({ ...p, autoImportEntrypointDirectorySearch: parseTristate(v) }), serializeTristate),
  field("preferTypeOnlyAutoImports", "preferences.preferTypeOnlyAutoImports", p => p.preferTypeOnlyAutoImports, (p, v) => ({ ...p, preferTypeOnlyAutoImports: parseTristate(v) }), serializeTristate),
  field("organizeImportsIgnoreCase", "preferences.organizeImports.caseSensitivity", p => p.organizeImportsIgnoreCase, (p, v) => ({ ...p, organizeImportsIgnoreCase: parseOrganizeImportsIgnoreCase(v) }), serializeTristate),
  field("organizeImportsCollation", "preferences.organizeImports.unicodeCollation", p => p.organizeImportsCollation, (p, v) => ({ ...p, organizeImportsCollation: parseOrganizeImportsCollation(v) }), identityPreference),
  field("organizeImportsLocale", "preferences.organizeImports.locale", p => p.organizeImportsLocale, (p, v) => ({ ...p, organizeImportsLocale: parseString(v) }), identityPreference),
  field("organizeImportsNumericCollation", "preferences.organizeImports.numericCollation", p => p.organizeImportsNumericCollation, (p, v) => ({ ...p, organizeImportsNumericCollation: parseTristate(v) }), serializeTristate),
  field("organizeImportsAccentCollation", "preferences.organizeImports.accentCollation", p => p.organizeImportsAccentCollation, (p, v) => ({ ...p, organizeImportsAccentCollation: parseTristate(v) }), serializeTristate),
  field("organizeImportsCaseFirst", "preferences.organizeImports.caseFirst", p => p.organizeImportsCaseFirst, (p, v) => ({ ...p, organizeImportsCaseFirst: parseOrganizeImportsCaseFirst(v) }), identityPreference),
  field("organizeImportsTypeOrder", "preferences.organizeImports.typeOrder", p => p.organizeImportsTypeOrder, (p, v) => ({ ...p, organizeImportsTypeOrder: parseOrganizeImportsTypeOrder(v) }), identityPreference),
  field("allowTextChangesInNewFiles", undefined, p => p.allowTextChangesInNewFiles, (p, v) => ({ ...p, allowTextChangesInNewFiles: parseTristate(v) }), serializeTristate),
  field("providePrefixAndSuffixTextForRename", "preferences.useAliasesForRenames", p => p.useAliasesForRename, (p, v) => ({ ...p, useAliasesForRename: parseTristate(v) }), serializeTristate),
  field("allowRenameOfImportPath", undefined, p => p.allowRenameOfImportPath, (p, v) => ({ ...p, allowRenameOfImportPath: parseTristate(v) }), serializeTristate),
  field("provideRefactorNotApplicableReason", undefined, p => p.provideRefactorNotApplicableReason, (p, v) => ({ ...p, provideRefactorNotApplicableReason: parseTristate(v) }), serializeTristate),
  field("preferGoToSourceDefinition", undefined, p => p.preferGoToSourceDefinition, (p, v) => ({ ...p, preferGoToSourceDefinition: parseBoolean(v) }), identityPreference),
  field("excludeLibrarySymbolsInNavTo", "workspaceSymbols.excludeLibrarySymbols", p => p.excludeLibrarySymbolsInNavTo, (p, v) => ({ ...p, excludeLibrarySymbolsInNavTo: parseTristate(v) }), serializeTristate),
  field("disableSuggestions", undefined, p => p.disableSuggestions, (p, v) => ({ ...p, disableSuggestions: parseTristate(v) }), serializeTristate),
  field("disableLineTextInReferences", undefined, p => p.disableLineTextInReferences, (p, v) => ({ ...p, disableLineTextInReferences: parseTristate(v) }), serializeTristate),
  field("displayPartsForJSDoc", undefined, p => p.displayPartsForJSDoc, (p, v) => ({ ...p, displayPartsForJSDoc: parseTristate(v) }), serializeTristate),
  field("reportStyleChecksAsWarnings", undefined, p => p.reportStyleChecksAsWarnings, (p, v) => ({ ...p, reportStyleChecksAsWarnings: parseTristate(v) }), serializeTristate),
  field("disableAutomaticTypeAcquisition", "disableAutomaticTypeAcquisition", p => p.disableAutomaticTypeAcquisition, (p, v) => ({ ...p, disableAutomaticTypeAcquisition: parseTristate(v) }), serializeTristate),
  field("automaticTypeAcquisitionEnabled", "tsserver.automaticTypeAcquisition.enabled", p => p.automaticTypeAcquisitionEnabled, (p, v) => ({ ...p, automaticTypeAcquisitionEnabled: parseTristate(v) }), serializeTristate),
  field("customConfigFileName", "native-preview.customConfigFileName", p => p.customConfigFileName, (p, v) => ({ ...p, customConfigFileName: parseString(v) }), identityPreference),
  formatField("baseIndentSize", p => p.baseIndentSize, (settings, value) => ({ ...settings, baseIndentSize: parseInteger(value) ?? settings.baseIndentSize })),
  formatField("indentSize", p => p.indentSize, (settings, value) => ({ ...settings, indentSize: parseInteger(value) ?? settings.indentSize })),
  formatField("tabSize", p => p.tabSize, (settings, value) => ({ ...settings, tabSize: parseInteger(value) ?? settings.tabSize })),
  formatField("newLineCharacter", p => p.newLineCharacter, (settings, value) => ({ ...settings, newLineCharacter: parseString(value) ?? settings.newLineCharacter })),
  formatField("convertTabsToSpaces", p => p.convertTabsToSpaces, (settings, value) => ({ ...settings, convertTabsToSpaces: parseTristate(value) })),
  formatField("indentStyle", p => p.indentStyle, (settings, value) => ({ ...settings, indentStyle: parseIndentStyle(value) })),
  formatField("trimTrailingWhitespace", p => p.trimTrailingWhitespace, (settings, value) => ({ ...settings, trimTrailingWhitespace: parseTristate(value) })),
  formatField("semicolons", p => p.semicolons, (settings, value) => ({ ...settings, semicolons: parseSemicolonPreference(value) })),
];

function field(
  rawName: string | undefined,
  configPath: string | undefined,
  get: (preferences: UserPreferences) => unknown,
  set: (preferences: UserPreferences, value: unknown) => UserPreferences,
  serialize: (value: unknown) => unknown,
  options: { readonly rawInvert?: boolean; readonly configInvert?: boolean } = {},
): PreferenceField {
  return {
    rawName,
    configPath,
    get,
    set,
    parse: identityPreference,
    serialize,
    ...options,
  };
}

function formatField(
  rawName: string,
  get: (settings: FormatCodeSettings) => unknown,
  set: (settings: FormatCodeSettings, value: unknown) => FormatCodeSettings,
): PreferenceField {
  return field(
    rawName,
    undefined,
    preferences => get(preferences.formatCodeSettings ?? getDefaultFormatCodeSettings()),
    (preferences, value) => ({
      ...preferences,
      formatCodeSettings: set(preferences.formatCodeSettings ?? getDefaultFormatCodeSettings(), value),
    }),
    identityPreference,
  );
}

function identityPreference(value: unknown): unknown {
  return value;
}

function parseTristate(value: unknown): TristateValue {
  if (typeof value === "number" && (value === Tristate.Unknown || value === Tristate.False || value === Tristate.True)) return value;
  return tristateFromJSON(value);
}

function serializeTristate(value: unknown): unknown {
  return typeof value === "number" ? tristateToJSON(value as TristateValue) : undefined;
}

function parseQuotePreference(value: unknown): QuotePreference {
  if (typeof value !== "string") return QuotePreferenceUnknown;
  switch (value.toLowerCase()) {
    case QuotePreferenceAuto:
      return QuotePreferenceAuto;
    case QuotePreferenceDouble:
      return QuotePreferenceDouble;
    case QuotePreferenceSingle:
      return QuotePreferenceSingle;
    default:
      return QuotePreferenceUnknown;
  }
}

function parseJsxAttributeCompletionStyle(value: unknown): JsxAttributeCompletionStyle {
  if (typeof value !== "string") return JsxAttributeCompletionStyleAuto;
  switch (value.toLowerCase()) {
    case JsxAttributeCompletionStyleBraces:
      return JsxAttributeCompletionStyleBraces;
    case JsxAttributeCompletionStyleNone:
      return JsxAttributeCompletionStyleNone;
    case JsxAttributeCompletionStyleAuto:
      return JsxAttributeCompletionStyleAuto;
    default:
      return JsxAttributeCompletionStyleAuto;
  }
}

function parseImportModuleSpecifierPreference(value: unknown): ImportModuleSpecifierPreferenceValue {
  if (typeof value !== "string") return ImportModuleSpecifierPreference.Shortest;
  switch (value.toLowerCase()) {
    case ImportModuleSpecifierPreference.ProjectRelative:
      return ImportModuleSpecifierPreference.ProjectRelative;
    case ImportModuleSpecifierPreference.Relative:
      return ImportModuleSpecifierPreference.Relative;
    case ImportModuleSpecifierPreference.NonRelative:
      return ImportModuleSpecifierPreference.NonRelative;
    case ImportModuleSpecifierPreference.Shortest:
      return ImportModuleSpecifierPreference.Shortest;
    default:
      return ImportModuleSpecifierPreference.Shortest;
  }
}

function parseImportModuleSpecifierEnding(value: unknown): ImportModuleSpecifierEndingPreferenceValue {
  if (typeof value !== "string") return ImportModuleSpecifierEndingPreference.Auto;
  switch (value.toLowerCase()) {
    case ImportModuleSpecifierEndingPreference.Minimal:
      return ImportModuleSpecifierEndingPreference.Minimal;
    case ImportModuleSpecifierEndingPreference.Index:
      return ImportModuleSpecifierEndingPreference.Index;
    case ImportModuleSpecifierEndingPreference.Js:
      return ImportModuleSpecifierEndingPreference.Js;
    case ImportModuleSpecifierEndingPreference.Auto:
      return ImportModuleSpecifierEndingPreference.Auto;
    default:
      return ImportModuleSpecifierEndingPreference.Auto;
  }
}

function parseOrganizeImportsIgnoreCase(value: unknown): TristateValue {
  if (typeof value === "string") {
    switch (value.toLowerCase()) {
      case "caseinsensitive":
        return Tristate.True;
      case "casesensitive":
        return Tristate.False;
      default:
        return Tristate.Unknown;
    }
  }
  return parseTristate(value);
}

function parseOrganizeImportsCollation(value: unknown): OrganizeImportsCollation {
  return typeof value === "string" && value.toLowerCase() === OrganizeImportsCollationUnicode
    ? OrganizeImportsCollationUnicode
    : OrganizeImportsCollationOrdinal;
}

function parseOrganizeImportsCaseFirst(value: unknown): OrganizeImportsCaseFirst {
  if (typeof value !== "string") return OrganizeImportsCaseFirstFalse;
  if (value === OrganizeImportsCaseFirstLower) return OrganizeImportsCaseFirstLower;
  if (value === OrganizeImportsCaseFirstUpper) return OrganizeImportsCaseFirstUpper;
  return OrganizeImportsCaseFirstFalse;
}

function parseOrganizeImportsTypeOrder(value: unknown): OrganizeImportsTypeOrder {
  if (typeof value !== "string") return OrganizeImportsTypeOrderAuto;
  if (value === OrganizeImportsTypeOrderLast) return OrganizeImportsTypeOrderLast;
  if (value === OrganizeImportsTypeOrderInline) return OrganizeImportsTypeOrderInline;
  if (value === OrganizeImportsTypeOrderFirst) return OrganizeImportsTypeOrderFirst;
  return OrganizeImportsTypeOrderAuto;
}

function parseInteger(value: unknown): number {
  return typeof value === "number" && Number.isFinite(value) ? Math.trunc(value) : 0;
}

function parseBoolean(value: unknown): boolean {
  return typeof value === "boolean" ? value : false;
}

function parseString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function parseStringArray(value: unknown): readonly string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function objectRecord(value: unknown): Readonly<Record<string, unknown>> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Readonly<Record<string, unknown>>
    : undefined;
}

function getNestedValue(config: Readonly<Record<string, unknown>>, path: string): { readonly exists: boolean; readonly value?: unknown } {
  let current: unknown = config;
  for (const part of path.split(".")) {
    const record = objectRecord(current);
    if (record === undefined || !Object.hasOwn(record, part)) return { exists: false };
    current = record[part];
  }
  return { exists: true, value: current };
}

function setNestedValue(config: Record<string, unknown>, path: string, value: unknown): void {
  const parts = path.split(".");
  let current = config;
  for (const part of parts.slice(0, -1)) {
    const next = objectRecord(current[part]);
    if (next === undefined) {
      const created: Record<string, unknown> = {};
      current[part] = created;
      current = created;
    } else {
      current = next as Record<string, unknown>;
    }
  }
  current[parts[parts.length - 1]!] = value;
}

function applyInvert(value: unknown, invert: boolean | undefined): unknown {
  return invert === true && typeof value === "boolean" ? !value : value;
}

function normalizeCustomConfigFileName(value: string): string {
  const name = value.trim();
  if (name === "" || name === "." || name === "..") return "";
  return /[/\\]/u.test(name) ? "" : name;
}

function mergePreferenceValue(current: unknown, override: unknown): UserPreferences[keyof UserPreferences] {
  if (isPlainObject(current) && isPlainObject(override)) {
    return { ...current, ...override } as unknown as UserPreferences[keyof UserPreferences];
  }
  return override as UserPreferences[keyof UserPreferences];
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isUserPreferences(value: unknown): value is UserPreferences {
  return isPlainObject(value);
}
