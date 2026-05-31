/**
 * Common source directory computation.
 *
 * Port of TS-Go `internal/outputpaths/commonsourcedirectory.go`.
 */

import type { CompilerOptions } from "../core/compileroptions.js";
import {
  getNormalizedPathComponents,
  getCanonicalFileName,
  getPathFromPathComponents,
  ensureTrailingDirectorySeparator,
  getDirectoryPath,
} from "../tspath/index.js";

function computeCommonSourceDirectoryOfFilenames(
  fileNames: readonly string[],
  currentDirectory: string,
  useCaseSensitiveFileNames: boolean,
): string {
  let commonPathComponents: readonly string[] | undefined;
  for (const sourceFile of fileNames) {
    // Each file contributes into common source file path
    const allComponents = getNormalizedPathComponents(sourceFile, currentDirectory);

    // The base file name is not part of the common directory path
    const sourcePathComponents = allComponents.slice(0, allComponents.length - 1);

    if (commonPathComponents === undefined) {
      // first file
      commonPathComponents = sourcePathComponents;
      continue;
    }

    const n = Math.min(commonPathComponents.length, sourcePathComponents.length);
    for (let i = 0; i < n; i++) {
      if (
        getCanonicalFileName(commonPathComponents[i]!, useCaseSensitiveFileNames) !==
        getCanonicalFileName(sourcePathComponents[i]!, useCaseSensitiveFileNames)
      ) {
        if (i === 0) {
          // Failed to find any common path component
          return "";
        }

        // New common path found that is 0 -> i-1
        commonPathComponents = commonPathComponents.slice(0, i);
        break;
      }
    }

    // If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
    if (sourcePathComponents.length < commonPathComponents.length) {
      commonPathComponents = commonPathComponents.slice(0, sourcePathComponents.length);
    }
  }

  if (commonPathComponents === undefined || commonPathComponents.length === 0) {
    // Can happen when all input files are .d.ts files
    return currentDirectory;
  }

  return getPathFromPathComponents(commonPathComponents);
}

export function getComputedCommonSourceDirectory(
  emittedFiles: readonly string[],
  currentDirectory: string,
  useCaseSensitiveFileNames: boolean,
): string {
  let commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(
    emittedFiles,
    currentDirectory,
    useCaseSensitiveFileNames,
  );
  if (commonSourceDirectory.length > 0) {
    commonSourceDirectory = ensureTrailingDirectorySeparator(commonSourceDirectory);
  }
  return commonSourceDirectory;
}

export function getCommonSourceDirectory(
  options: CompilerOptions,
  files: () => readonly string[],
  currentDirectory: string,
  useCaseSensitiveFileNames: boolean,
): string {
  let commonSourceDirectory: string;
  if (options.rootDir !== undefined && options.rootDir !== "") {
    // If a rootDir is specified use it as the commonSourceDirectory
    commonSourceDirectory = options.rootDir;
  } else if (options.configFilePath !== undefined && options.configFilePath !== "") {
    // If the rootDir is not specified, then the common source directory is the directory of the config file.
    commonSourceDirectory = getDirectoryPath(options.configFilePath);
  } else {
    commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(
      files(),
      currentDirectory,
      useCaseSensitiveFileNames,
    );
  }

  if (commonSourceDirectory.length > 0) {
    // Make sure directory path ends with directory separator so this string can directly
    // used to replace with "" to get the relative path of the source file and the relative path doesn't
    // start with / making it rooted path
    commonSourceDirectory = ensureTrailingDirectorySeparator(commonSourceDirectory);
  }

  return commonSourceDirectory;
}
