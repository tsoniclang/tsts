import type { bool } from "../../go/scalars.js";
import { GoEqualStrict, type GoSlice } from "../../go/compat.js";
import * as strings from "../../go/strings.js";
import * as slices from "../../go/slices.js";
import { GetAnyExtensionFromPath, GetBaseFileName, FileExtensionIs } from "./path.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::constGroup::ExtensionTs+ExtensionTsx+ExtensionDts+ExtensionJs+ExtensionJsx+ExtensionJson+ExtensionTsBuildInfo+ExtensionMjs+ExtensionMts+ExtensionDmts+ExtensionCjs+ExtensionCts+ExtensionDcts","kind":"constGroup","status":"implemented","sigHash":"cd8f4d8c8262077661ed7818cd5830cdb2877fbaf83354b93a5e246b8d066d7f"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::varGroup::SupportedDeclarationExtensions+SupportedTSImplementationExtensions+supportedTSExtensionsForExtractExtension+AllSupportedExtensions+SupportedTSExtensions+SupportedTSExtensionsFlat+SupportedJSExtensions+SupportedJSExtensionsFlat+AllSupportedExtensionsWithJson+SupportedTSExtensionsWithJson+SupportedTSExtensionsWithJsonFlat+ExtensionsNotSupportingExtensionlessResolution","kind":"varGroup","status":"implemented","sigHash":"a402e674e6a6852421ed893015944bf98f3772cb7c012057a8bbc9aee1b99732"}
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
export let SupportedDeclarationExtensions: GoSlice<string> = [ExtensionDts, ExtensionDcts, ExtensionDmts];
export let SupportedTSImplementationExtensions: GoSlice<string> = [ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts];
export let supportedTSExtensionsForExtractExtension: GoSlice<string> = [ExtensionDts, ExtensionDcts, ExtensionDmts, ExtensionTs, ExtensionTsx, ExtensionMts, ExtensionCts];
export let AllSupportedExtensions: GoSlice<GoSlice<string>> = [
  [ExtensionTs, ExtensionTsx, ExtensionDts, ExtensionJs, ExtensionJsx],
  [ExtensionCts, ExtensionDcts, ExtensionCjs],
  [ExtensionMts, ExtensionDmts, ExtensionMjs],
];
export let SupportedTSExtensions: GoSlice<GoSlice<string>> = [
  [ExtensionTs, ExtensionTsx, ExtensionDts],
  [ExtensionCts, ExtensionDcts],
  [ExtensionMts, ExtensionDmts],
];
export let SupportedTSExtensionsFlat: GoSlice<string> = [ExtensionTs, ExtensionTsx, ExtensionDts, ExtensionCts, ExtensionDcts, ExtensionMts, ExtensionDmts];
export let SupportedJSExtensions: GoSlice<GoSlice<string>> = [[ExtensionJs, ExtensionJsx], [ExtensionMjs], [ExtensionCjs]];
export let SupportedJSExtensionsFlat: GoSlice<string> = [ExtensionJs, ExtensionJsx, ExtensionMjs, ExtensionCjs];
export let AllSupportedExtensionsWithJson: GoSlice<GoSlice<string>> = slices.Concat<GoSlice<string>>(AllSupportedExtensions, [[ExtensionJson]]);
export let SupportedTSExtensionsWithJson: GoSlice<GoSlice<string>> = slices.Concat<GoSlice<string>>(SupportedTSExtensions, [[ExtensionJson]]);
export let SupportedTSExtensionsWithJsonFlat: GoSlice<string> = slices.Concat<string>(SupportedTSExtensionsFlat, [ExtensionJson]);
export let ExtensionsNotSupportingExtensionlessResolution: GoSlice<string> = [ExtensionMts, ExtensionDmts, ExtensionMjs, ExtensionCts, ExtensionDcts, ExtensionCjs];

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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::varGroup::extensionsToRemove","kind":"varGroup","status":"implemented","sigHash":"364ae8be36fb152fe8797c9667aabe35e776fd5792af4d085f55535d97a45036"}
 *
 * Go source:
 * var extensionsToRemove = []string{ExtensionDts, ExtensionDmts, ExtensionDcts, ExtensionMjs, ExtensionMts, ExtensionCjs, ExtensionCts, ExtensionTs, ExtensionJs, ExtensionTsx, ExtensionJsx, ExtensionJson}
 */
export let extensionsToRemove: GoSlice<string> = [ExtensionDts, ExtensionDmts, ExtensionDcts, ExtensionMjs, ExtensionMts, ExtensionCjs, ExtensionCts, ExtensionTs, ExtensionJs, ExtensionTsx, ExtensionJsx, ExtensionJson];

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
  for (const ext of extensionsToRemove) {
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
  for (const ext of extensionsToRemove) {
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
  for (const ext of extensions) {
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
  for (const ext of supportedTSExtensionsForExtractExtension) {
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
  for (const ext of SupportedDeclarationExtensions) {
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
  if (FileExtensionIsOneOf(path, [ExtensionMjs, ExtensionMts])) {
    return ExtensionDmts;
  } else if (FileExtensionIsOneOf(path, [ExtensionCjs, ExtensionCts])) {
    return ExtensionDcts;
  } else if (FileExtensionIsOneOf(path, [ExtensionTs, ExtensionTsx, ExtensionJs, ExtensionJsx])) {
    return ExtensionDts;
  } else {
    const ext = GetAnyExtensionFromPath(path, [], false);
    if (ext !== "") {
      return ".d" + ext + ".ts";
    }
    return ExtensionDts;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::ChangeAnyExtension","kind":"func","status":"implemented","sigHash":"bafeb754dd28635ca222be7a4e7b4bd97de05c3d2f4a29787b258fb79d314643"}
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
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/tspath/extension.go::func::ChangeFullExtension","kind":"func","status":"implemented","sigHash":"6654d483bf83fdae9f6c8045b02e7aec8c4a9fed2666e0b7437330dbb0e570bf"}
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
  if (FileExtensionIsOneOf(path, [ExtensionDmts, ExtensionMjs, ExtensionMts])) {
    return [ExtensionMts, ExtensionMjs];
  }
  if (FileExtensionIsOneOf(path, [ExtensionDcts, ExtensionCjs, ExtensionCts])) {
    return [ExtensionCts, ExtensionCjs];
  }
  // Handle any custom .d.x.ts extension (e.g., .d.json.ts -> .json, .d.css.ts -> .css)
  {
    const ext = GetDeclarationFileExtension(path);
    if (ext !== "" && ext !== ExtensionDts) {
      const inner = ext.slice(".d.".length, ext.length - ".ts".length);
      return ["." + inner];
    }
  }
  return [ExtensionTsx, ExtensionTs, ExtensionJsx, ExtensionJs];
}
