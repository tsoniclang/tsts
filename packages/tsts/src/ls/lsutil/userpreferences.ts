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
  readonly allowTextChangesInNewFiles?: boolean;
  readonly allowRenameOfImportPath?: TristateValue;
  readonly useAliasesForRename?: TristateValue;
  readonly codeLens?: CodeLensUserPreferences;
}

export type QuotePreference = "" | "auto" | "double" | "single";
export const QuotePreferenceUnknown: QuotePreference = "";
export const QuotePreferenceAuto: QuotePreference = "auto";
export const QuotePreferenceDouble: QuotePreference = "double";
export const QuotePreferenceSingle: QuotePreference = "single";

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
