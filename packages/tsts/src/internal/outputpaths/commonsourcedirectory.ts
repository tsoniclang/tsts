import type { bool } from "../../go/scalars.js";
import { GoNilSlice, GoSliceIsNil, type GoFunc, type GoPtr, type GoSlice } from "../../go/compat.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import {
  EnsureTrailingDirectorySeparator,
  GetCanonicalFileName,
  GetDirectoryPath,
  GetNormalizedPathComponents,
  GetPathFromPathComponents,
} from "../tspath/path.js";
import { GoSliceLoad, GoStringValueOps } from "../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/outputpaths/commonsourcedirectory.go::func::computeCommonSourceDirectoryOfFilenames","kind":"func","status":"implemented","sigHash":"4239085a76e414c3bc2d225bca263ee0fdb177ca3c2f317fd883f6bd2075ecee"}
 *
 * Go source:
 * func computeCommonSourceDirectoryOfFilenames(fileNames []string, currentDirectory string, useCaseSensitiveFileNames bool) string {
 * 	var commonPathComponents []string
 * 	for _, sourceFile := range fileNames {
 * 		// Each file contributes into common source file path
 * 		sourcePathComponents := tspath.GetNormalizedPathComponents(sourceFile, currentDirectory)
 * 
 * 		// The base file name is not part of the common directory path
 * 		sourcePathComponents = sourcePathComponents[:len(sourcePathComponents)-1]
 * 
 * 		if commonPathComponents == nil {
 * 			// first file
 * 			commonPathComponents = sourcePathComponents
 * 			continue
 * 		}
 * 
 * 		n := min(len(commonPathComponents), len(sourcePathComponents))
 * 		for i := range n {
 * 			if tspath.GetCanonicalFileName(commonPathComponents[i], useCaseSensitiveFileNames) != tspath.GetCanonicalFileName(sourcePathComponents[i], useCaseSensitiveFileNames) {
 * 				if i == 0 {
 * 					// Failed to find any common path component
 * 					return ""
 * 				}
 * 
 * 				// New common path found that is 0 -> i-1
 * 				commonPathComponents = commonPathComponents[:i]
 * 				break
 * 			}
 * 		}
 * 
 * 		// If the sourcePathComponents was shorter than the commonPathComponents, truncate to the sourcePathComponents
 * 		if len(sourcePathComponents) < len(commonPathComponents) {
 * 			commonPathComponents = commonPathComponents[:len(sourcePathComponents)]
 * 		}
 * 	}
 * 
 * 	if len(commonPathComponents) == 0 {
 * 		// Can happen when all input files are .d.ts files
 * 		return currentDirectory
 * 	}
 * 
 * 	return tspath.GetPathFromPathComponents(commonPathComponents)
 * }
 */
export function computeCommonSourceDirectoryOfFilenames(fileNames: GoSlice<string>, currentDirectory: string, useCaseSensitiveFileNames: bool): string {
  let commonPathComponents: GoSlice<string> = GoNilSlice<string>();
  for (const sourceFile of fileNames) {
    const allComponents = GetNormalizedPathComponents(sourceFile, currentDirectory);
    const sourcePathComponents = allComponents.slice(0, allComponents.length - 1);

    if (GoSliceIsNil(commonPathComponents)) {
      commonPathComponents = sourcePathComponents;
      continue;
    }

    const count = Math.min(commonPathComponents.length, sourcePathComponents.length);
    for (let index = 0; index < count; index++) {
      if (
        GetCanonicalFileName(GoSliceLoad(commonPathComponents, index, GoStringValueOps)!, useCaseSensitiveFileNames) !==
        GetCanonicalFileName(sourcePathComponents[index]!, useCaseSensitiveFileNames)
      ) {
        if (index === 0) {
          return "";
        }
        commonPathComponents = commonPathComponents.slice(0, index);
        break;
      }
    }

    if (sourcePathComponents.length < commonPathComponents.length) {
      commonPathComponents = commonPathComponents.slice(0, sourcePathComponents.length);
    }
  }

  if (commonPathComponents.length === 0) {
    // Can happen when all input files are .d.ts files
    return currentDirectory;
  }

  return GetPathFromPathComponents(commonPathComponents);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/outputpaths/commonsourcedirectory.go::func::GetComputedCommonSourceDirectory","kind":"func","status":"implemented","sigHash":"514fd7379da62c201eb92d26a6c0689f3db1331fff4a46f6e682c811bc8f2c7b"}
 *
 * Go source:
 * func GetComputedCommonSourceDirectory(emittedFiles []string, currentDirectory string, useCaseSensitiveFileNames bool) string {
 * 	commonSourceDirectory := computeCommonSourceDirectoryOfFilenames(emittedFiles, currentDirectory, useCaseSensitiveFileNames)
 * 	if len(commonSourceDirectory) > 0 {
 * 		commonSourceDirectory = tspath.EnsureTrailingDirectorySeparator(commonSourceDirectory)
 * 	}
 * 	return commonSourceDirectory
 * }
 */
export function GetComputedCommonSourceDirectory(emittedFiles: GoSlice<string>, currentDirectory: string, useCaseSensitiveFileNames: bool): string {
  const commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(emittedFiles, currentDirectory, useCaseSensitiveFileNames);
  if (commonSourceDirectory.length > 0) {
    return EnsureTrailingDirectorySeparator(commonSourceDirectory);
  }
  return commonSourceDirectory;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/outputpaths/commonsourcedirectory.go::func::GetCommonSourceDirectory","kind":"func","status":"implemented","sigHash":"2c7827f05d0d724bf245e7a3b1356d6464dafafd2dbd8feb9afaa8e05acd8542"}
 *
 * Go source:
 * func GetCommonSourceDirectory(options *core.CompilerOptions, files func() []string, currentDirectory string, useCaseSensitiveFileNames bool, checkSourceFilesBelongToPath func([]string, string) bool) string {
 * 	var commonSourceDirectory string
 * 	if options.RootDir != "" {
 * 		// If a rootDir is specified use it as the commonSourceDirectory
 * 		commonSourceDirectory = options.RootDir
 * 		if checkSourceFilesBelongToPath != nil {
 * 			checkSourceFilesBelongToPath(files(), options.RootDir)
 * 		}
 * 	} else if options.ConfigFilePath != "" {
 * 		// If the rootDir is not specified, then the common source directory is the directory of the config file.
 * 		commonSourceDirectory = tspath.GetDirectoryPath(options.ConfigFilePath)
 * 		if checkSourceFilesBelongToPath != nil {
 * 			checkSourceFilesBelongToPath(files(), commonSourceDirectory)
 * 		}
 * 	} else {
 * 		commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(files(), currentDirectory, useCaseSensitiveFileNames)
 * 	}
 *
 * 	if len(commonSourceDirectory) > 0 {
 * 		// Make sure directory path ends with directory separator so this string can directly
 * 		// used to replace with "" to get the relative path of the source file and the relative path doesn't
 * 		// start with / making it rooted path
 * 		commonSourceDirectory = tspath.EnsureTrailingDirectorySeparator(commonSourceDirectory)
 * 	}
 *
 * 	return commonSourceDirectory
 * }
 */
export function GetCommonSourceDirectory(options: GoPtr<CompilerOptions>, files: GoFunc<() => GoSlice<string>>, currentDirectory: string, useCaseSensitiveFileNames: bool, checkSourceFilesBelongToPath: GoFunc<(arg0: GoSlice<string>, arg1: string) => bool>): string {
  let commonSourceDirectory = "";
  if (options!.RootDir !== "") {
    // If a rootDir is specified use it as the commonSourceDirectory
    commonSourceDirectory = options!.RootDir;
    if (checkSourceFilesBelongToPath !== undefined) {
      checkSourceFilesBelongToPath(files!(), options!.RootDir);
    }
  } else if (options!.ConfigFilePath !== "") {
    // If the rootDir is not specified, then the common source directory is the directory of the config file.
    commonSourceDirectory = GetDirectoryPath(options!.ConfigFilePath);
    if (checkSourceFilesBelongToPath !== undefined) {
      checkSourceFilesBelongToPath(files!(), commonSourceDirectory);
    }
  } else {
    commonSourceDirectory = computeCommonSourceDirectoryOfFilenames(files!(), currentDirectory, useCaseSensitiveFileNames);
  }

  if (commonSourceDirectory.length > 0) {
    // Make sure directory path ends with directory separator so this string can directly
    // used to replace with "" to get the relative path of the source file and the relative path doesn't
    // start with / making it rooted path
    commonSourceDirectory = EnsureTrailingDirectorySeparator(commonSourceDirectory);
  }

  return commonSourceDirectory;
}
