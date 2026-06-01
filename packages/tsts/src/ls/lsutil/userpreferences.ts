/**
 * User preference model.
 */

export interface UserPreferences {
  readonly quotePreference?: QuotePreference;
  readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
  readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
  readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
  readonly allowTextChangesInNewFiles?: boolean;
}

export type QuotePreference = "" | "auto" | "double" | "single";
export const QuotePreferenceUnknown: QuotePreference = "";
export const QuotePreferenceAuto: QuotePreference = "auto";
export const QuotePreferenceDouble: QuotePreference = "double";
export const QuotePreferenceSingle: QuotePreference = "single";
