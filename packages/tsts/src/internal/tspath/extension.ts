import type { bool } from "../../go/scalars.js";
import { GoEqualStrict, type GoSlice } from "../../go/compat.js";
import * as strings from "../../go/strings.js";
import * as slices from "../../go/slices.js";
import { GetAnyExtensionFromPath, GetBaseFileName, FileExtensionIs } from "./path.js";
import { GoSliceBuild, GoSliceMake, GoSliceStore, GoSliceValueOps, GoStringValueOps } from "../../go/compat.js";
import { GoSliceLoad } from "../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::constGroup::ExtensionTs+ExtensionTsx+ExtensionDts+ExtensionJs+ExtensionJsx+ExtensionJson+ExtensionTsBuildInfo+ExtensionMjs+ExtensionMts+ExtensionDmts+ExtensionCjs+ExtensionCts+ExtensionDcts","kind":"constGroup","status":"implemented","sigHash":"3eeea5de951d6dd17cc446aa8b2c9e10d53c1b73faafa66011c81acf5fee8289"}
 *
 * Go source:
 * const (
 * 	ExtensionTs          = ".ts"
 * 	ExtensionTsx         = ".tsx"
 * 	ExtensionDts         = ".d.ts"
 * 	ExtensionJs          = ".js"
 * 	ExtensionJsx         = ".jsx"
 * 	ExtensionJson        = ".json"
 * 	ExtensionTsBuildInfo = ".tsbuildinfo"
 * 	ExtensionMjs         = ".mjs"
 * 	ExtensionMts         = ".mts"
 * 	ExtensionDmts        = ".d.mts"
 * 	ExtensionCjs         = ".cjs"
 * 	ExtensionCts         = ".cts"
 * 	ExtensionDcts        = ".d.cts"
 * )
 */
export const ExtensionTs: string = ".ts";
export const ExtensionTsx: string = ".tsx";
export const ExtensionDts: string = ".d.ts";
export const ExtensionJs: string = ".js";
export const ExtensionJsx: string = ".jsx";
export const ExtensionJson: string = ".json";
export const ExtensionTsBuildInfo: string = ".tsbuildinfo";
export const ExtensionMjs: string = ".mjs";
export const ExtensionMts: string = ".mts";
export const ExtensionDmts: string = ".d.mts";
export const ExtensionCjs: string = ".cjs";
export const ExtensionCts: string = ".cts";
export const ExtensionDcts: string = ".d.cts";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::varGroup::SupportedDeclarationExtensions+SupportedTSImplementationExtensions+supportedTSExtensionsForExtractExtension+AllSupportedExtensions+SupportedTSExtensions+SupportedTSExtensionsFlat+SupportedJSExtensions+SupportedJSExtensionsFlat+AllSupportedExtensionsWithJson+SupportedTSExtensionsWithJson+SupportedTSExtensionsWithJsonFlat+ExtensionsNotSupportingExtensionlessResolution","kind":"varGroup","status":"implemented","sigHash":"e1e8def32a6477867b4a2168f9fa62ac665a60281ad55ffede39ca40c3f9484f"}
 *
 * Go source:
 * var (
 * 	SupportedDeclarationExtensions                 = []string{ExtensionDts, ExtensionDcts, ExtensionDmts}
 * 	SupportedTSImplementationExtensions            = []string{ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}
 * 	supportedTSExtensionsForExtractExtension       = []string{ExtensionDts, ExtensionDcts, ExtensionDmts, ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts}
 * 	AllSupportedExtensions                         = [][]string{{ExtensionTs, ExtensionTsx, ExtensionDts, ExtensionJs, ExtensionJsx}, {ExtensionCts, ExtensionDcts, ExtensionCjs}, {ExtensionMts, ExtensionDmts, ExtensionMjs}}
 * 	SupportedTSExtensions                          = [][]string{{ExtensionTs, ExtensionTsx, ExtensionDts}, {ExtensionCts, ExtensionDcts}, {ExtensionMts, ExtensionDmts}}
 * 	SupportedTSExtensionsFlat                      = []string{ExtensionTs, ExtensionTsx, ExtensionDts, ExtensionCts, ExtensionDcts, ExtensionMts, ExtensionDmts}
 * 	SupportedJSExtensions                          = [][]string{{ExtensionJs, ExtensionJsx}, {ExtensionMjs}, {ExtensionCjs}}
 * 	SupportedJSExtensionsFlat                      = []string{ExtensionJs, ExtensionJsx, ExtensionMjs, ExtensionCjs}
 * 	AllSupportedExtensionsWithJson                 = slices.Concat(AllSupportedExtensions, [][]string{{ExtensionJson}})
 * 	SupportedTSExtensionsWithJson                  = slices.Concat(SupportedTSExtensions, [][]string{{ExtensionJson}})
 * 	SupportedTSExtensionsWithJsonFlat              = slices.Concat(SupportedTSExtensionsFlat, []string{ExtensionJson})
 * 	ExtensionsNotSupportingExtensionlessResolution = []string{ExtensionMts, ExtensionDmts, ExtensionMjs, ExtensionCts, ExtensionDcts, ExtensionCjs}
 * )
 */
export let SupportedDeclarationExtensions: GoSlice<string> = GoSliceBuild(3, 3, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, ExtensionDts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, ExtensionDcts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ExtensionDmts, GoStringValueOps);
});
export let SupportedTSImplementationExtensions: GoSlice<string> = GoSliceBuild(4, 4, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, ExtensionTs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, ExtensionTsx, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ExtensionMts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 3, ExtensionCts, GoStringValueOps);
});
export let supportedTSExtensionsForExtractExtension: GoSlice<string> = GoSliceBuild(7, 7, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, ExtensionDts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, ExtensionDcts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ExtensionDmts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 3, ExtensionTs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 4, ExtensionTsx, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 5, ExtensionMts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 6, ExtensionCts, GoStringValueOps);
});
export let AllSupportedExtensions: GoSlice<GoSlice<string>> = GoSliceBuild(3, 3, GoSliceValueOps<string>(), (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, GoSliceBuild(5, 5, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionTs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionTsx, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionDts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 3, ExtensionJs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 4, ExtensionJsx, GoStringValueOps);
  }), GoSliceValueOps<string>());
  GoSliceStore(__goSliceLiteral, 1, GoSliceBuild(3, 3, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionCts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionDcts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionCjs, GoStringValueOps);
  }), GoSliceValueOps<string>());
  GoSliceStore(__goSliceLiteral, 2, GoSliceBuild(3, 3, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionMts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionDmts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionMjs, GoStringValueOps);
  }), GoSliceValueOps<string>());
});
export let SupportedTSExtensions: GoSlice<GoSlice<string>> = GoSliceBuild(3, 3, GoSliceValueOps<string>(), (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, GoSliceBuild(3, 3, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionTs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionTsx, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionDts, GoStringValueOps);
  }), GoSliceValueOps<string>());
  GoSliceStore(__goSliceLiteral, 1, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionCts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionDcts, GoStringValueOps);
  }), GoSliceValueOps<string>());
  GoSliceStore(__goSliceLiteral, 2, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionMts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionDmts, GoStringValueOps);
  }), GoSliceValueOps<string>());
});
export let SupportedTSExtensionsFlat: GoSlice<string> = GoSliceBuild(7, 7, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, ExtensionTs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, ExtensionTsx, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ExtensionDts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 3, ExtensionCts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 4, ExtensionDcts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 5, ExtensionMts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 6, ExtensionDmts, GoStringValueOps);
});
export let SupportedJSExtensions: GoSlice<GoSlice<string>> = GoSliceBuild(3, 3, GoSliceValueOps<string>(), (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionJs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionJsx, GoStringValueOps);
  }), GoSliceValueOps<string>());
  GoSliceStore(__goSliceLiteral, 1, GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionMjs, GoStringValueOps);
  }), GoSliceValueOps<string>());
  GoSliceStore(__goSliceLiteral, 2, GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionCjs, GoStringValueOps);
  }), GoSliceValueOps<string>());
});
export let SupportedJSExtensionsFlat: GoSlice<string> = GoSliceBuild(4, 4, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, ExtensionJs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, ExtensionJsx, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ExtensionMjs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 3, ExtensionCjs, GoStringValueOps);
});
export let AllSupportedExtensionsWithJson: GoSlice<GoSlice<string>> = slices.Concat<GoSlice<string>>(AllSupportedExtensions, [[ExtensionJson]]);
export let SupportedTSExtensionsWithJson: GoSlice<GoSlice<string>> = slices.Concat<GoSlice<string>>(SupportedTSExtensions, [[ExtensionJson]]);
export let SupportedTSExtensionsWithJsonFlat: GoSlice<string> = slices.Concat<string>(SupportedTSExtensionsFlat, [ExtensionJson]);
export let ExtensionsNotSupportingExtensionlessResolution: GoSlice<string> = GoSliceBuild(6, 6, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, ExtensionMts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, ExtensionDmts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ExtensionMjs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 3, ExtensionCts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 4, ExtensionDcts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 5, ExtensionCjs, GoStringValueOps);
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::ExtensionIsTs","kind":"func","status":"implemented","sigHash":"3049c81c8f6456f7757c391bee3802bf890d1107e6df4f7dc063f58fdcaed34d"}
 *
 * Go source:
 * func ExtensionIsTs(ext string) bool {
 * 	return ext == ExtensionTs || ext == ExtensionTsx || ext == ExtensionDts || ext == ExtensionMts || ext == ExtensionDmts || ext == ExtensionCts || ext == ExtensionDcts || len(ext) >= 7 && ext[:3] == ".d." && ext[len(ext)-3:] == ".ts"
 * }
 */
export function ExtensionIsTs(ext: string): bool {
  return ext === ExtensionTs || ext === ExtensionTsx || ext === ExtensionDts || ext === ExtensionMts || ext === ExtensionDmts || ext === ExtensionCts || ext === ExtensionDcts || (ext.length >= 7 && ext.slice(0, 3) === ".d." && ext.slice(ext.length - 3) === ".ts");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::varGroup::extensionsToRemove","kind":"varGroup","status":"implemented","sigHash":"b0133c812a668bd4ae8207039e9baf727d43f004238b9f8163503fa4ef90fc1d"}
 *
 * Go source:
 * var extensionsToRemove = []string{ExtensionDts, ExtensionDmts, ExtensionDcts, ExtensionMjs, ExtensionMts, ExtensionCjs, ExtensionCts, ExtensionTs, ExtensionJs, ExtensionTsx, ExtensionJsx, ExtensionJson}
 */
export let extensionsToRemove: GoSlice<string> = GoSliceBuild(12, 12, GoStringValueOps, (__goSliceLiteral) => {
  GoSliceStore(__goSliceLiteral, 0, ExtensionDts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 1, ExtensionDmts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 2, ExtensionDcts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 3, ExtensionMjs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 4, ExtensionMts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 5, ExtensionCjs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 6, ExtensionCts, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 7, ExtensionTs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 8, ExtensionJs, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 9, ExtensionTsx, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 10, ExtensionJsx, GoStringValueOps);
  GoSliceStore(__goSliceLiteral, 11, ExtensionJson, GoStringValueOps);
});

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::RemoveFileExtension","kind":"func","status":"implemented","sigHash":"fed8cdfe80d8331bfc6071432f6e12a2bb014ce39de271c868f4dd34ff0c61dd"}
 *
 * Go source:
 * func RemoveFileExtension(path string) string {
 * 	// Remove any known extension even if it has more than one dot
 * 	for _, ext := range extensionsToRemove {
 * 		if strings.HasSuffix(path, ext) {
 * 			return path[:len(path)-len(ext)]
 * 		}
 * 	}
 *
 * 	return path
 * }
 */
export function RemoveFileExtension(path: string): string {
  // Remove any known extension even if it has more than one dot
  for (
    let __goRangeSlice = extensionsToRemove,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const ext = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (strings.HasSuffix(path, ext)) {
      return path.slice(0, path.length - ext.length);
    }
  }

  return path;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::TryGetExtensionFromPath","kind":"func","status":"implemented","sigHash":"fd7038f36cbbe26a6740acaf1e34781f63e29a2a9a2aa2b04bc8e16ad70ac4e7"}
 *
 * Go source:
 * func TryGetExtensionFromPath(p string) string {
 * 	for _, ext := range extensionsToRemove {
 * 		if FileExtensionIs(p, ext) {
 * 			return ext
 * 		}
 * 	}
 * 	return ""
 * }
 */
export function TryGetExtensionFromPath(p: string): string {
  for (
    let __goRangeSlice = extensionsToRemove,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const ext = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (FileExtensionIs(p, ext)) {
      return ext;
    }
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::RemoveExtension","kind":"func","status":"implemented","sigHash":"3a80e00df40e206130b53164f06cac20f876ae8bcf5d3229050b1bca2f26f8b6"}
 *
 * Go source:
 * func RemoveExtension(path string, extension string) string {
 * 	return path[:len(path)-len(extension)]
 * }
 */
export function RemoveExtension(path: string, extension: string): string {
  return path.slice(0, path.length - extension.length);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::FileExtensionIsOneOf","kind":"func","status":"implemented","sigHash":"fb830c23ed2a0efe6c26e00511011a7b3cfe6f18cefd20d5dd682c6ba52be531"}
 *
 * Go source:
 * func FileExtensionIsOneOf(path string, extensions []string) bool {
 * 	for _, ext := range extensions {
 * 		if FileExtensionIs(path, ext) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function FileExtensionIsOneOf(path: string, extensions: GoSlice<string>): bool {
  for (
    let __goRangeSlice = extensions,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const ext = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (FileExtensionIs(path, ext)) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::TryExtractTSExtension","kind":"func","status":"implemented","sigHash":"0be8aa5beb209b573eef22ad6eb48cdef7a9ebb122c486a97e5f7756399ce0eb"}
 *
 * Go source:
 * func TryExtractTSExtension(fileName string) string {
 * 	for _, ext := range supportedTSExtensionsForExtractExtension {
 * 		if FileExtensionIs(fileName, ext) {
 * 			return ext
 * 		}
 * 	}
 * 	return ""
 * }
 */
export function TryExtractTSExtension(fileName: string): string {
  for (
    let __goRangeSlice = supportedTSExtensionsForExtractExtension,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const ext = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (FileExtensionIs(fileName, ext)) {
      return ext;
    }
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::HasTSFileExtension","kind":"func","status":"implemented","sigHash":"8eac363a7ddab958a850d51d749d3a783e91b1cde50c90718809f0c03af48252"}
 *
 * Go source:
 * func HasTSFileExtension(path string) bool {
 * 	return FileExtensionIsOneOf(path, SupportedTSExtensionsFlat)
 * }
 */
export function HasTSFileExtension(path: string): bool {
  return FileExtensionIsOneOf(path, SupportedTSExtensionsFlat);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::HasImplementationTSFileExtension","kind":"func","status":"implemented","sigHash":"148b1eb9c78562d9dbc86f1234da8bab81877936bcee3584c64d18d0fa828549"}
 *
 * Go source:
 * func HasImplementationTSFileExtension(path string) bool {
 * 	return FileExtensionIsOneOf(path, SupportedTSImplementationExtensions) && !IsDeclarationFileName(path)
 * }
 */
export function HasImplementationTSFileExtension(path: string): bool {
  return FileExtensionIsOneOf(path, SupportedTSImplementationExtensions) && !IsDeclarationFileName(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::HasJSFileExtension","kind":"func","status":"implemented","sigHash":"c9fba13ca2ba570bfbca84f4f047050da5a8fa4159765f27556dd2d5ca5248ec"}
 *
 * Go source:
 * func HasJSFileExtension(path string) bool {
 * 	return FileExtensionIsOneOf(path, SupportedJSExtensionsFlat)
 * }
 */
export function HasJSFileExtension(path: string): bool {
  return FileExtensionIsOneOf(path, SupportedJSExtensionsFlat);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::HasJSONFileExtension","kind":"func","status":"implemented","sigHash":"0c2fc00e4a92aecabb0b2d8e4e803bca345a97975ac367f98e5b5b2e33d7aa59"}
 *
 * Go source:
 * func HasJSONFileExtension(path string) bool {
 * 	return FileExtensionIs(path, ExtensionJson)
 * }
 */
export function HasJSONFileExtension(path: string): bool {
  return FileExtensionIs(path, ExtensionJson);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::IsDeclarationFileName","kind":"func","status":"implemented","sigHash":"b1c296a976bf4d96f65ca36d0a36a74a4a1dd9067022095d792e832ace36bf39"}
 *
 * Go source:
 * func IsDeclarationFileName(fileName string) bool {
 * 	return GetDeclarationFileExtension(fileName) != ""
 * }
 */
export function IsDeclarationFileName(fileName: string): bool {
  return GetDeclarationFileExtension(fileName) !== "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::ExtensionIsOneOf","kind":"func","status":"implemented","sigHash":"7348b56d898df8eabbd37cbddb1e3b16c067d39b79637cf0e02d79774a047935"}
 *
 * Go source:
 * func ExtensionIsOneOf(ext string, extensions []string) bool {
 * 	return slices.Contains(extensions, ext)
 * }
 */
export function ExtensionIsOneOf(ext: string, extensions: GoSlice<string>): bool {
  return slices.Contains(extensions, ext, GoEqualStrict);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::GetDeclarationFileExtension","kind":"func","status":"implemented","sigHash":"bc62955a088f373996b3e52d7e0c951cad93575287e48f9bd6272f5fab1c56e0"}
 *
 * Go source:
 * func GetDeclarationFileExtension(fileName string) string {
 * 	base := GetBaseFileName(fileName)
 * 	for _, ext := range SupportedDeclarationExtensions {
 * 		if strings.HasSuffix(base, ext) {
 * 			return ext
 * 		}
 * 	}
 * 	if strings.HasSuffix(base, ExtensionTs) {
 * 		index := strings.Index(base, ".d.")
 * 		if index >= 0 {
 * 			return base[index:]
 * 		}
 * 	}
 * 	return ""
 * }
 */
export function GetDeclarationFileExtension(fileName: string): string {
  const base = GetBaseFileName(fileName);
  for (
    let __goRangeSlice = SupportedDeclarationExtensions,
      __goRangeLength = __goRangeSlice.length,
      __goRangeValueOps = GoStringValueOps,
      __goRangeIndex = 0;
    __goRangeIndex < __goRangeLength;
    __goRangeIndex++
  ) {
    const ext = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
    if (strings.HasSuffix(base, ext)) {
      return ext;
    }
  }
  if (strings.HasSuffix(base, ExtensionTs)) {
    const index = base.indexOf(".d.");
    if (index >= 0) {
      return base.slice(index);
    }
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::GetDeclarationEmitExtensionForPath","kind":"func","status":"implemented","sigHash":"6fe3d3768d8ed9582b303d113d5fa908090986ab028f6b6d273ad956c9f6e029"}
 *
 * Go source:
 * func GetDeclarationEmitExtensionForPath(path string) string {
 * 	switch {
 * 	case FileExtensionIsOneOf(path, []string{ExtensionMjs, ExtensionMts}):
 * 		return ExtensionDmts
 * 	case FileExtensionIsOneOf(path, []string{ExtensionCjs, ExtensionCts}):
 * 		return ExtensionDcts
 * 	case FileExtensionIsOneOf(path, []string{ExtensionTs, ExtensionTsx, ExtensionJs, ExtensionJsx}):
 * 		return ExtensionDts
 * 	default:
 * 		ext := GetAnyExtensionFromPath(path, nil, false)
 * 		if ext != "" {
 * 			return ".d" + ext + ".ts"
 * 		}
 * 		return ExtensionDts
 * 	}
 * }
 */
export function GetDeclarationEmitExtensionForPath(path: string): string {
  if (FileExtensionIsOneOf(path, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionMjs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionMts, GoStringValueOps);
  }))) {
    return ExtensionDmts;
  } else if (FileExtensionIsOneOf(path, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionCjs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionCts, GoStringValueOps);
  }))) {
    return ExtensionDcts;
  } else if (FileExtensionIsOneOf(path, GoSliceBuild(4, 4, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionTs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionTsx, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionJs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 3, ExtensionJsx, GoStringValueOps);
  }))) {
    return ExtensionDts;
  } else {
    const ext = GetAnyExtensionFromPath(path, GoSliceMake(0, 0, GoStringValueOps), false);
    if (ext !== "") {
      return ".d" + ext + ".ts";
    }
    return ExtensionDts;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::ChangeAnyExtension","kind":"func","status":"implemented","sigHash":"2f317e28249c13aea9ea04d80eb20e09ce5cd9b06501437ed14da8e0d3e23fc6"}
 *
 * Go source:
 * func ChangeAnyExtension(path string, ext string, extensions []string, ignoreCase bool) string {
 * 	pathext := GetAnyExtensionFromPath(path, extensions, ignoreCase)
 * 	if pathext != "" {
 * 		result := path[:len(path)-len(pathext)]
 * 		if ext == "" {
 * 			return result
 * 		}
 * 		if strings.HasPrefix(ext, ".") {
 * 			return result + ext
 * 		}
 * 		return result + "." + ext
 * 	}
 * 	return path
 * }
 */
export function ChangeAnyExtension(path: string, ext: string, extensions: GoSlice<string>, ignoreCase: bool): string {
  const pathext = GetAnyExtensionFromPath(path, extensions, ignoreCase);
  if (pathext !== "") {
    const result = path.slice(0, path.length - pathext.length);
    if (ext === "") {
      return result;
    }
    if (strings.HasPrefix(ext, ".")) {
      return result + ext;
    }
    return result + "." + ext;
  }
  return path;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::ChangeExtension","kind":"func","status":"implemented","sigHash":"7a68c6850abb2a83dc87b060e0197d28594e651969de09ac5bff3ea16ce20d89"}
 *
 * Go source:
 * func ChangeExtension(path string, newExtension string) string {
 * 	return ChangeAnyExtension(path, newExtension, extensionsToRemove, false /*ignoreCase* /)
 * }
 */
export function ChangeExtension(path: string, newExtension: string): string {
  return ChangeAnyExtension(path, newExtension, extensionsToRemove, false /*ignoreCase*/);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::ChangeFullExtension","kind":"func","status":"implemented","sigHash":"c6bfe4b31e124fbab6f94a059690cdd04906f02b838d36722b0bcd96648d193c"}
 *
 * Go source:
 * func ChangeFullExtension(path string, newExtension string) string {
 * 	declarationExtension := GetDeclarationFileExtension(path)
 * 	if declarationExtension != "" {
 * 		ext := newExtension
 * 		if !strings.HasPrefix(ext, ".") {
 * 			ext = "." + ext
 * 		}
 * 		return path[:len(path)-len(declarationExtension)] + ext
 * 	}
 * 	return ChangeExtension(path, newExtension)
 * }
 */
export function ChangeFullExtension(path: string, newExtension: string): string {
  const declarationExtension = GetDeclarationFileExtension(path);
  if (declarationExtension !== "") {
    const ext = strings.HasPrefix(newExtension, ".") ? newExtension : ("." + newExtension);
    return path.slice(0, path.length - declarationExtension.length) + ext;
  }
  return ChangeExtension(path, newExtension);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::GetPossibleOriginalInputExtensionForExtension","kind":"func","status":"implemented","sigHash":"04c4e931c27e8c3f8cdefb39d3120ec06878e853b07963a12c41428bb17b6b27"}
 *
 * Go source:
 * func GetPossibleOriginalInputExtensionForExtension(path string) []string {
 * 	if FileExtensionIsOneOf(path, []string{ExtensionDmts, ExtensionMjs, ExtensionMts}) {
 * 		return []string{ExtensionMts, ExtensionMjs}
 * 	}
 * 	if FileExtensionIsOneOf(path, []string{ExtensionDcts, ExtensionCjs, ExtensionCts}) {
 * 		return []string{ExtensionCts, ExtensionCjs}
 * 	}
 * 	// Handle any custom .d.x.ts extension (e.g., .d.json.ts -> .json, .d.css.ts -> .css)
 * 	if ext := GetDeclarationFileExtension(path); ext != "" && ext != ExtensionDts {
 * 		inner := ext[len(".d.") : len(ext)-len(".ts")]
 * 		return []string{"." + inner}
 * 	}
 * 	return []string{ExtensionTsx, ExtensionTs, ExtensionJsx, ExtensionJs}
 * }
 */
export function GetPossibleOriginalInputExtensionForExtension(path: string): GoSlice<string> {
  if (FileExtensionIsOneOf(path, GoSliceBuild(3, 3, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionDmts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionMjs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionMts, GoStringValueOps);
  }))) {
    return GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, ExtensionMts, GoStringValueOps);
      GoSliceStore(__goSliceLiteral, 1, ExtensionMjs, GoStringValueOps);
    });
  }
  if (FileExtensionIsOneOf(path, GoSliceBuild(3, 3, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionDcts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionCjs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionCts, GoStringValueOps);
  }))) {
    return GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral) => {
      GoSliceStore(__goSliceLiteral, 0, ExtensionCts, GoStringValueOps);
      GoSliceStore(__goSliceLiteral, 1, ExtensionCjs, GoStringValueOps);
    });
  }
  // Handle any custom .d.x.ts extension (e.g., .d.json.ts -> .json, .d.css.ts -> .css)
  {
    const ext = GetDeclarationFileExtension(path);
    if (ext !== "" && ext !== ExtensionDts) {
      const inner = ext.slice(".d.".length, ext.length - ".ts".length);
      return GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
        GoSliceStore(__goSliceLiteral, 0, "." + inner, GoStringValueOps);
      });
    }
  }
  return GoSliceBuild(4, 4, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionTsx, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionTs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionJsx, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 3, ExtensionJs, GoStringValueOps);
  });
}
