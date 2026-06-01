/**
 * User preference model.
 */

export interface UserPreferences {
  readonly quotePreference?: "auto" | "single" | "double";
  readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
  readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
  readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
  readonly allowTextChangesInNewFiles?: boolean;
}
