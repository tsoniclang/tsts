/**
 * File-extension utilities.
 *
 * Port of TS-Go internal/tspath/extension.go.
 */

import { fileExtensionIs, getAnyExtensionFromPath, getBaseFileName } from "./path.js";

export const extensionTs = ".ts";
export const extensionTsx = ".tsx";
export const extensionDts = ".d.ts";
export const extensionJs = ".js";
export const extensionJsx = ".jsx";
export const extensionJson = ".json";
export const extensionTsBuildInfo = ".tsbuildinfo";
export const extensionMjs = ".mjs";
export const extensionMts = ".mts";
export const extensionDmts = ".d.mts";
export const extensionCjs = ".cjs";
export const extensionCts = ".cts";
export const extensionDcts = ".d.cts";

export const supportedDeclarationExtensions: readonly string[] = [extensionDts, extensionDcts, extensionDmts];
export const supportedTSImplementationExtensions: readonly string[] = [extensionTs, extensionTsx, extensionMts, extensionCts];

const supportedTSExtensionsForExtractExtension: readonly string[] = [
  extensionDts,
  extensionDcts,
  extensionDmts,
  extensionTs,
  extensionTsx,
  extensionMts,
  extensionCts,
];

export const allSupportedExtensions: readonly (readonly string[])[] = [
  [extensionTs, extensionTsx, extensionDts, extensionJs, extensionJsx],
  [extensionCts, extensionDcts, extensionCjs],
  [extensionMts, extensionDmts, extensionMjs],
];

export const supportedTSExtensions: readonly (readonly string[])[] = [
  [extensionTs, extensionTsx, extensionDts],
  [extensionCts, extensionDcts],
  [extensionMts, extensionDmts],
];

export const supportedTSExtensionsFlat: readonly string[] = [
  extensionTs,
  extensionTsx,
  extensionDts,
  extensionCts,
  extensionDcts,
  extensionMts,
  extensionDmts,
];

export const supportedJSExtensions: readonly (readonly string[])[] = [
  [extensionJs, extensionJsx],
  [extensionMjs],
  [extensionCjs],
];

export const supportedJSExtensionsFlat: readonly string[] = [
  extensionJs,
  extensionJsx,
  extensionMjs,
  extensionCjs,
];

export const allSupportedExtensionsWithJson: readonly (readonly string[])[] = [
  ...allSupportedExtensions,
  [extensionJson],
];

export const supportedTSExtensionsWithJson: readonly (readonly string[])[] = [
  ...supportedTSExtensions,
  [extensionJson],
];

export const supportedTSExtensionsWithJsonFlat: readonly string[] = [
  ...supportedTSExtensionsFlat,
  extensionJson,
];

export const extensionsNotSupportingExtensionlessResolution: readonly string[] = [
  extensionMts,
  extensionDmts,
  extensionMjs,
  extensionCts,
  extensionDcts,
  extensionCjs,
];

export function extensionIsTs(ext: string): boolean {
  return (
    ext === extensionTs ||
    ext === extensionTsx ||
    ext === extensionDts ||
    ext === extensionMts ||
    ext === extensionDmts ||
    ext === extensionCts ||
    ext === extensionDcts ||
    (ext.length >= 7 && ext.startsWith(".d.") && ext.endsWith(".ts"))
  );
}

const extensionsToRemove: readonly string[] = [
  extensionDts,
  extensionDmts,
  extensionDcts,
  extensionMjs,
  extensionMts,
  extensionCjs,
  extensionCts,
  extensionTs,
  extensionJs,
  extensionTsx,
  extensionJsx,
  extensionJson,
];

export function removeFileExtension(path: string): string {
  for (const ext of extensionsToRemove) {
    if (path.endsWith(ext)) {
      return path.slice(0, path.length - ext.length);
    }
  }
  return path;
}

export function tryGetExtensionFromPath(path: string): string {
  for (const ext of extensionsToRemove) {
    if (fileExtensionIs(path, ext)) return ext;
  }
  return "";
}

export function removeExtension(path: string, extension: string): string {
  return path.slice(0, path.length - extension.length);
}

export function fileExtensionIsOneOf(path: string, extensions: readonly string[]): boolean {
  for (const ext of extensions) {
    if (fileExtensionIs(path, ext)) return true;
  }
  return false;
}

export function tryExtractTSExtension(fileName: string): string {
  for (const ext of supportedTSExtensionsForExtractExtension) {
    if (fileExtensionIs(fileName, ext)) return ext;
  }
  return "";
}

export function hasTSFileExtension(path: string): boolean {
  return fileExtensionIsOneOf(path, supportedTSExtensionsFlat);
}

export function hasImplementationTSFileExtension(path: string): boolean {
  return fileExtensionIsOneOf(path, supportedTSImplementationExtensions) && !isDeclarationFileName(path);
}

export function hasJSFileExtension(path: string): boolean {
  return fileExtensionIsOneOf(path, supportedJSExtensionsFlat);
}

export function hasJSONFileExtension(path: string): boolean {
  return fileExtensionIs(path, extensionJson);
}

export function isDeclarationFileName(fileName: string): boolean {
  return getDeclarationFileExtension(fileName) !== "";
}

export function extensionIsOneOf(ext: string, extensions: readonly string[]): boolean {
  return extensions.includes(ext);
}

export function getDeclarationFileExtension(fileName: string): string {
  const base = getBaseFileName(fileName);
  for (const ext of supportedDeclarationExtensions) {
    if (base.endsWith(ext)) return ext;
  }
  if (base.endsWith(extensionTs)) {
    const index = base.indexOf(".d.");
    if (index >= 0) return base.slice(index);
  }
  return "";
}

export function getDeclarationEmitExtensionForPath(path: string): string {
  if (fileExtensionIsOneOf(path, [extensionMjs, extensionMts])) {
    return extensionDmts;
  } else if (fileExtensionIsOneOf(path, [extensionCjs, extensionCts])) {
    return extensionDcts;
  } else if (fileExtensionIsOneOf(path, [extensionTs, extensionTsx, extensionJs, extensionJsx])) {
    return extensionDts;
  } else {
    const ext = getAnyExtensionFromPath(path, undefined, false);
    if (ext !== "") {
      return ".d" + ext + ".ts";
    }
    return extensionDts;
  }
}

/**
 * Changes the extension of a path to the provided extension if it has one of the provided extensions.
 *
 * ```
 * changeAnyExtension("/path/to/file.ext", ".js", [".ext"]) === "/path/to/file.js"
 * changeAnyExtension("/path/to/file.ext", ".js", [".ts"]) === "/path/to/file.ext"
 * changeAnyExtension("/path/to/file.ext", ".js", [".ext", ".ts"]) === "/path/to/file.js"
 * ```
 */
export function changeAnyExtension(
  path: string,
  ext: string,
  extensions: readonly string[] | undefined,
  ignoreCase: boolean
): string {
  const pathext = getAnyExtensionFromPath(path, extensions, ignoreCase);
  if (pathext !== "") {
    const result = path.slice(0, path.length - pathext.length);
    if (ext === "") return result;
    if (ext.startsWith(".")) return result + ext;
    return result + "." + ext;
  }
  return path;
}

export function changeExtension(path: string, newExtension: string): string {
  return changeAnyExtension(path, newExtension, extensionsToRemove, false);
}

/**
 * Like `changeAnyExtension`, but declaration file extensions are recognized
 * and replaced starting from the `.d`.
 *
 * ```
 * changeAnyExtension("file.d.ts", ".js") === "file.d.js"
 * changeFullExtension("file.d.ts", ".js") === "file.js"
 * ```
 */
export function changeFullExtension(path: string, newExtension: string): string {
  const declarationExtension = getDeclarationFileExtension(path);
  if (declarationExtension !== "") {
    let ext = newExtension;
    if (!ext.startsWith(".")) {
      ext = "." + ext;
    }
    return path.slice(0, path.length - declarationExtension.length) + ext;
  }
  return changeExtension(path, newExtension);
}

export function getPossibleOriginalInputExtensionForExtension(path: string): readonly string[] {
  if (fileExtensionIsOneOf(path, [extensionDmts, extensionMjs, extensionMts])) {
    return [extensionMts, extensionMjs];
  }
  if (fileExtensionIsOneOf(path, [extensionDcts, extensionCjs, extensionCts])) {
    return [extensionCts, extensionCjs];
  }
  const ext = getDeclarationFileExtension(path);
  if (ext !== "" && ext !== extensionDts) {
    const inner = ext.slice(".d.".length, ext.length - ".ts".length);
    return ["." + inner];
  }
  return [extensionTsx, extensionTs, extensionJsx, extensionJs];
}
