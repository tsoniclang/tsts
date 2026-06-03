/**
 * Resolves user/import preferences into the concrete
 * `ModuleSpecifierEnding` decisions the generator uses.
 *
 * Port of TS-Go `internal/modulespecifiers/preferences.go`.
 *
 * Depends on `core.CompilerOptions`, `tspath.*`, and `core.ResolutionMode`
 * (the last currently forward-declared on this module's `types.ts`).
 * Function bodies use the upstream names; TSTS resolves them when the
 * respective subsystems land.
 */

import type { StringLiteralLike } from "../ast/index.js";

import {
  type ImportModuleSpecifierEndingPreference,
  ImportModuleSpecifierEndingPreference as IMEP,
  type ImportModuleSpecifierPreference,
  ImportModuleSpecifierPreference as IMSP,
  type ModuleSpecifierEnding,
  ModuleSpecifierEnding as MSE,
  type ModuleSpecifierGenerationHost,
  type RelativePreferenceKind,
  RelativePreferenceKind as RPK,
  type ResolutionMode,
  ResolutionMode as RM,
  type SourceFileForSpecifierGeneration,
  type UserPreferences,
} from "./types.js";

/**
 * Forward-declared CompilerOptions surface needed here. The full shape
 * lands with the `core` port; this captures just what `preferences.go`
 * reads.
 */
export interface CompilerOptionsForSpecifiers {
  getAllowImportingTsExtensions(): boolean;
  getModuleResolutionKind(): ModuleResolutionKind;
}

/**
 * Forward-declared `core.ModuleResolutionKind`. Values from TS-Go's
 * `core.ModuleResolutionKindNode16`..`ModuleResolutionKindNodeNext`
 * are used to detect Node-style resolution; the literal ordering is
 * preserved.
 */
export type ModuleResolutionKind =
  | "classic"
  | "node10"
  | "node16"
  | "nodenext"
  | "bundler";

export const ModuleResolutionKind: {
  readonly Classic: ModuleResolutionKind;
  readonly Node10: ModuleResolutionKind;
  readonly Node16: ModuleResolutionKind;
  readonly NodeNext: ModuleResolutionKind;
  readonly Bundler: ModuleResolutionKind;
} = {
  Classic: "classic" as ModuleResolutionKind,
  Node10: "node10" as ModuleResolutionKind,
  Node16: "node16" as ModuleResolutionKind,
  NodeNext: "nodenext" as ModuleResolutionKind,
  Bundler: "bundler" as ModuleResolutionKind,
};

function moduleResolutionIsNodeNextFamily(k: ModuleResolutionKind): boolean {
  return k === ModuleResolutionKind.Node16 || k === ModuleResolutionKind.NodeNext;
}

/**
 * Forward-declared tspath helpers. Implementations come from the
 * `tspath` module; this declares the surface used here.
 */
export interface TspathHelpers {
  isDeclarationFileName(fileName: string): boolean;
  pathIsRelative(path: string): boolean;
  pathIsAbsolute(path: string): boolean;
  hasTSFileExtension(path: string): boolean;
  hasJSFileExtension(path: string): boolean;
  fileExtensionIsOneOf(path: string, extensions: readonly string[]): boolean;
  readonly extensionsNotSupportingExtensionlessResolution: readonly string[];
  isExternalModuleNameRelative(path: string): boolean;
}

/**
 * Program errors validate `noEmit`/`emitDeclarationOnly`, so this
 * function doesn't check them to avoid propagating errors.
 *
 * Mirrors TS-Go `shouldAllowImportingTsExtension`.
 */
export function shouldAllowImportingTsExtension(
  compilerOptions: CompilerOptionsForSpecifiers,
  fromFileName: string,
  tspath: TspathHelpers,
): boolean {
  return (
    compilerOptions.getAllowImportingTsExtensions() ||
    (fromFileName.length > 0 && tspath.isDeclarationFileName(fromFileName))
  );
}

/**
 * Returns true if any of the file's imports use a TS/JS file extension
 * on a relative specifier. Mirrors TS-Go `usesExtensionsOnImports`.
 */
export function usesExtensionsOnImports(
  file: SourceFileForSpecifierGeneration,
  tspath: TspathHelpers,
): boolean {
  for (const ref of file.imports()) {
    const text = ref.text;
    if (
      tspath.pathIsRelative(text) &&
      !tspath.fileExtensionIsOneOf(text, tspath.extensionsNotSupportingExtensionlessResolution)
    ) {
      return tspath.hasTSFileExtension(text) || tspath.hasJSFileExtension(text);
    }
  }
  return false;
}

/**
 * Infer the preferred extension from observed imports. Mirrors TS-Go
 * `inferPreference`.
 */
export function inferPreference(
  resolutionMode: ResolutionMode,
  sourceFile: SourceFileForSpecifierGeneration | undefined,
  moduleResolutionIsNodeNext: boolean,
  tspath: TspathHelpers,
): ModuleSpecifierEnding {
  let usesJsExtensions = false;
  let specifiers: readonly StringLiteralLike[] = [];
  if (sourceFile !== undefined && sourceFile.imports().length > 0) {
    specifiers = sourceFile.imports();
  } else if (sourceFile !== undefined && sourceFile.isJS()) {
    // TODO: JS support — TS-Go uses getRequiresAtTopOfFile here.
    specifiers = [];
  }

  for (const specifier of specifiers) {
    const path = specifier.text;
    if (tspath.pathIsRelative(path)) {
      if (moduleResolutionIsNodeNext && resolutionMode === RM.CommonJS) {
        // We're deciding for CJS but looking at an ESM import; skip.
        continue;
      }
      if (tspath.fileExtensionIsOneOf(path, tspath.extensionsNotSupportingExtensionlessResolution)) {
        continue;
      }
      if (tspath.hasTSFileExtension(path)) {
        return MSE.TsExtension;
      }
      if (tspath.hasJSFileExtension(path)) {
        usesJsExtensions = true;
      }
    }
  }

  return usesJsExtensions ? MSE.JsExtension : MSE.Minimal;
}

/**
 * Resolves the user's "preferred ending" preference to a concrete
 * `ModuleSpecifierEnding`. Mirrors TS-Go
 * `getModuleSpecifierEndingPreference`.
 */
export function getModuleSpecifierEndingPreference(
  pref: ImportModuleSpecifierEndingPreference,
  resolutionMode: ResolutionMode,
  compilerOptions: CompilerOptionsForSpecifiers,
  sourceFile: SourceFileForSpecifierGeneration | undefined,
  tspath: TspathHelpers,
): ModuleSpecifierEnding {
  const moduleResolution = compilerOptions.getModuleResolutionKind();
  const isNodeNext = moduleResolutionIsNodeNextFamily(moduleResolution);

  if (pref === IMEP.Js || (resolutionMode === RM.ESM && isNodeNext)) {
    if (!shouldAllowImportingTsExtension(compilerOptions, "", tspath)) {
      return MSE.JsExtension;
    }
    if (inferPreference(resolutionMode, sourceFile, isNodeNext, tspath) !== MSE.JsExtension) {
      return MSE.TsExtension;
    }
    return MSE.JsExtension;
  }

  if (pref === IMEP.Minimal) return MSE.Minimal;
  if (pref === IMEP.Index) return MSE.Index;

  if (!shouldAllowImportingTsExtension(compilerOptions, "", tspath)) {
    if (sourceFile !== undefined && usesExtensionsOnImports(sourceFile, tspath)) {
      return MSE.JsExtension;
    }
    return MSE.Minimal;
  }

  return inferPreference(resolutionMode, sourceFile, isNodeNext, tspath);
}

/**
 * Resolves the preferred ending, including the
 * `oldImportSpecifier`-based override for renames/refactors. Mirrors
 * TS-Go `getPreferredEnding`.
 */
export function getPreferredEnding(
  prefs: UserPreferences,
  host: ModuleSpecifierGenerationHost,
  compilerOptions: CompilerOptionsForSpecifiers,
  importingSourceFile: SourceFileForSpecifierGeneration,
  oldImportSpecifier: string,
  resolutionMode: ResolutionMode,
  tspath: TspathHelpers,
): ModuleSpecifierEnding {
  if (oldImportSpecifier.length > 0) {
    if (tspath.hasJSFileExtension(oldImportSpecifier)) return MSE.JsExtension;
    if (oldImportSpecifier.endsWith("/index")) return MSE.Index;
  }
  if (resolutionMode === RM.None) {
    resolutionMode = host.getDefaultResolutionModeForFile(importingSourceFile);
  }
  return getModuleSpecifierEndingPreference(
    prefs.importModuleSpecifierEnding,
    resolutionMode,
    compilerOptions,
    importingSourceFile,
    tspath,
  );
}

/** Internal preference structure. */
export interface ModuleSpecifierPreferences {
  readonly relativePreference: RelativePreferenceKind;
  readonly getAllowedEndingsInPreferredOrder: (
    syntaxImpliedNodeFormat: ResolutionMode,
  ) => readonly ModuleSpecifierEnding[];
  readonly excludeRegexes: readonly string[];
}

/**
 * Returns the list of allowed endings in preferred order. Mirrors
 * TS-Go `GetAllowedEndingsInPreferredOrder`.
 */
export function getAllowedEndingsInPreferredOrder(
  prefs: UserPreferences,
  host: ModuleSpecifierGenerationHost,
  compilerOptions: CompilerOptionsForSpecifiers,
  importingSourceFile: SourceFileForSpecifierGeneration,
  oldImportSpecifier: string,
  syntaxImpliedNodeFormat: ResolutionMode,
  tspath: TspathHelpers,
): readonly ModuleSpecifierEnding[] {
  let preferredEnding = getPreferredEnding(
    prefs,
    host,
    compilerOptions,
    importingSourceFile,
    oldImportSpecifier,
    RM.None,
    tspath,
  );
  const resolutionMode = host.getDefaultResolutionModeForFile(importingSourceFile);
  if (resolutionMode !== syntaxImpliedNodeFormat) {
    preferredEnding = getPreferredEnding(
      prefs,
      host,
      compilerOptions,
      importingSourceFile,
      oldImportSpecifier,
      syntaxImpliedNodeFormat,
      tspath,
    );
  }
  const moduleResolution = compilerOptions.getModuleResolutionKind();
  const isNodeNext = moduleResolutionIsNodeNextFamily(moduleResolution);
  const allowImportingTsExtension = shouldAllowImportingTsExtension(
    compilerOptions,
    importingSourceFile.fileName(),
    tspath,
  );

  if (syntaxImpliedNodeFormat === RM.ESM && isNodeNext) {
    if (allowImportingTsExtension) {
      return [MSE.TsExtension, MSE.JsExtension];
    }
    return [MSE.JsExtension];
  }

  switch (preferredEnding) {
    case MSE.JsExtension:
      if (allowImportingTsExtension) {
        return [MSE.JsExtension, MSE.TsExtension, MSE.Minimal, MSE.Index];
      }
      return [MSE.JsExtension, MSE.Minimal, MSE.Index];
    case MSE.TsExtension:
      return [MSE.TsExtension, MSE.Minimal, MSE.JsExtension, MSE.Index];
    case MSE.Index:
      if (allowImportingTsExtension) {
        return [MSE.Index, MSE.Minimal, MSE.TsExtension, MSE.JsExtension];
      }
      return [MSE.Index, MSE.Minimal, MSE.JsExtension];
    case MSE.Minimal:
      if (allowImportingTsExtension) {
        return [MSE.Minimal, MSE.Index, MSE.TsExtension, MSE.JsExtension];
      }
      return [MSE.Minimal, MSE.Index, MSE.JsExtension];
    default:
      // Mirrors TS-Go `debug.AssertNever(preferredEnding)`.
      throw new Error("unhandled preferredEnding: " + String(preferredEnding));
  }
}

/**
 * Computes the resolved `ModuleSpecifierPreferences` for a generation
 * request. Mirrors TS-Go `getModuleSpecifierPreferences`.
 */
export function getModuleSpecifierPreferences(
  prefs: UserPreferences,
  host: ModuleSpecifierGenerationHost,
  compilerOptions: CompilerOptionsForSpecifiers,
  importingSourceFile: SourceFileForSpecifierGeneration,
  oldImportSpecifier: string,
  tspath: TspathHelpers,
): ModuleSpecifierPreferences {
  const excludes = prefs.autoImportSpecifierExcludeRegexes;
  let relativePreference: RelativePreferenceKind = RPK.Shortest;

  if (oldImportSpecifier.length > 0) {
    if (tspath.isExternalModuleNameRelative(oldImportSpecifier)) {
      relativePreference = RPK.Relative;
    } else {
      relativePreference = RPK.NonRelative;
    }
  } else {
    switch (prefs.importModuleSpecifierPreference) {
      case IMSP.Relative:
        relativePreference = RPK.Relative;
        break;
      case IMSP.NonRelative:
        relativePreference = RPK.NonRelative;
        break;
      case IMSP.ProjectRelative:
        relativePreference = RPK.ExternalNonRelative;
        break;
      // all others are shortest
    }
  }

  const getAllowed = (syntaxImpliedNodeFormat: ResolutionMode): readonly ModuleSpecifierEnding[] =>
    getAllowedEndingsInPreferredOrder(
      prefs,
      host,
      compilerOptions,
      importingSourceFile,
      oldImportSpecifier,
      syntaxImpliedNodeFormat,
      tspath,
    );

  return {
    excludeRegexes: excludes,
    relativePreference,
    getAllowedEndingsInPreferredOrder: getAllowed,
  };
}
