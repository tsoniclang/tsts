import type { bool, byte, int } from "../../go/scalars.js";
import type { GoMap, GoPtr, GoSlice } from "../../go/compat.js";
import { GoSliceAppend, GoStringValueOps } from "../../go/compat.js";
import { GoAppend, GoBooleanKey, GoNilSlice, GoStringKey, GoStructField, GoStructKey, NewGoStructMap } from "../../go/compat.js";
import type { Regexp } from "../../go/regexp.js";
import { Compile } from "../../go/regexp.js";
import * as strings from "../../go/strings.js";
import { RWMutex } from "../../go/sync.js";
import type { OrderedMap } from "../collections/ordered_map.js";
import type { CompilerOptions } from "../core/compileroptions.js";
import { CompareBooleans, IndexAfter } from "../core/core.js";
import { TSTrue } from "../core/tristate.js";
import { EndingChangeable, EndingFixed } from "../module/resolver.js";
import type { ResolvedEntrypoint } from "../module/resolver.js";
import { TryGetJSExtensionForFile } from "../module/util.js";
import type { ExportsOrImports } from "../packagejson/exportsorimports.js";
import type { SourceFile } from "../ast/ast.js";
import { GetSupportedExtensions } from "../tsoptions/tsconfigparsing.js";
import type { FileExtensionInfo } from "../tsoptions/tsconfigparsing.js";
import { ScriptKindExternal, ScriptKindJSON } from "../core/scriptkind.js";
import { ChangeAnyExtension, ExtensionCjs, ExtensionCts, ExtensionDcts, ExtensionDmts, ExtensionDts, ExtensionJs, ExtensionJsx, ExtensionMjs, ExtensionMts, ExtensionTs, ExtensionTsx, FileExtensionIsOneOf, RemoveExtension, RemoveFileExtension, TryGetExtensionFromPath, GetDeclarationFileExtension } from "../tspath/extension.js";
import { ComparePaths, CompareNumberOfDirectorySeparators, GetBaseFileName, GetNormalizedAbsolutePath, GetRelativePathToDirectoryOrUrl, IsRootedDiskPath, PathIsAbsolute, PathIsRelative } from "../tspath/path.js";
import type { ComparePathsOptions } from "../tspath/path.js";
import { GetAllowedEndingsInPreferredOrder } from "./preferences.js";
import { getAllModulePaths, getInfo, tryGetModuleNameAsNodeModule } from "./specifiers.js";
import type { ModulePath, ModuleSpecifierEnding, ModuleSpecifierGenerationHost, ModuleSpecifierOptions, SourceFileForSpecifierGeneration, UserPreferences } from "./types.js";
import { ModuleSpecifierEndingIndex, ModuleSpecifierEndingJsExtension, ModuleSpecifierEndingMinimal, ModuleSpecifierEndingTsExtension } from "./types.js";

import type { GoInterface } from "../../go/compat.js";
import { GoSliceBuild, GoSliceStore } from "../../go/compat.js";
import { GoNumberValueOps, GoSliceLoad } from "../../go/compat.js";


/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::type::regexPatternCacheKey","kind":"type","status":"implemented","sigHash":"63f8dffdde16d3c433e1fb857a621811381ec4edabce90ea5657ef97194fce9d"}
 *
 * Go source:
 * regexPatternCacheKey struct {
 * 	pattern         string
 * 	caseInsensitive bool
 * }
 */
export interface regexPatternCacheKey {
  pattern: string;
  caseInsensitive: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::varGroup::regexPatternCacheMu+regexPatternCache","kind":"varGroup","status":"implemented","sigHash":"34800e66db1866c2e1d4775fb582d161878146e45432f58e7e08b628ecc8eebf"}
 *
 * Go source:
 * var (
 * 	regexPatternCacheMu sync.RWMutex
 * 	regexPatternCache   = make(map[regexPatternCacheKey]*regexp.Regexp)
 * )
 */
export let regexPatternCacheMu: RWMutex = new RWMutex();
export let regexPatternCache: GoMap<regexPatternCacheKey, GoPtr<Regexp>> = NewGoStructMap<regexPatternCacheKey, GoPtr<Regexp>>(GoStructKey(
  [GoStructField((value: regexPatternCacheKey) => value.pattern, GoStringKey), GoStructField((value: regexPatternCacheKey) => value.caseInsensitive, GoBooleanKey)],
  ([pattern, caseInsensitive]) => ({ pattern, caseInsensitive }),
));

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::comparePathsByRedirect","kind":"func","status":"implemented","sigHash":"d1ddf359d6332eede302f451c3e819b0bbd2485ea838b6b05debfaf1aaf63eca"}
 *
 * Go source:
 * func comparePathsByRedirect(a ModulePath, b ModulePath, useCaseSensitiveFileNames bool) int {
 * 	// Redirects sort first, matching Strada's compareBooleans(b.isRedirect, a.isRedirect).
 * 	if c := core.CompareBooleans(b.IsRedirect, a.IsRedirect); c != 0 {
 * 		return c
 * 	}
 * 	if c := tspath.CompareNumberOfDirectorySeparators(a.FileName, b.FileName); c != 0 {
 * 		return c
 * 	}
 * 	// Strada relies on Map insertion order to break remaining ties deterministically;
 * 	// Go maps are unordered, so compare paths to keep the ordering stable.
 * 	return tspath.ComparePaths(a.FileName, b.FileName, tspath.ComparePathsOptions{UseCaseSensitiveFileNames: useCaseSensitiveFileNames})
 * }
 */
export function comparePathsByRedirect(a: ModulePath, b: ModulePath, useCaseSensitiveFileNames: bool): int {
  // Redirects sort first, matching Strada's compareBooleans(b.isRedirect, a.isRedirect).
  const c1 = CompareBooleans(b.IsRedirect, a.IsRedirect);
  if (c1 !== 0) {
    return c1;
  }
  const c2 = CompareNumberOfDirectorySeparators(a.FileName, b.FileName);
  if (c2 !== 0) {
    return c2;
  }
  // Strada relies on Map insertion order to break remaining ties deterministically;
  // Go maps are unordered, so compare paths to keep the ordering stable.
  return ComparePaths(a.FileName, b.FileName, { UseCaseSensitiveFileNames: useCaseSensitiveFileNames, CurrentDirectory: "" });
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::PathIsBareSpecifier","kind":"func","status":"implemented","sigHash":"e59b4811fe0e34ed3b74950fc46499f254549350ae7d13280b2d9f4fff06438b"}
 *
 * Go source:
 * func PathIsBareSpecifier(path string) bool {
 * 	return !tspath.PathIsAbsolute(path) && !tspath.PathIsRelative(path)
 * }
 */
export function PathIsBareSpecifier(path: string): bool {
  return !PathIsAbsolute(path) && !PathIsRelative(path);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::IsExcludedByRegex","kind":"func","status":"implemented","sigHash":"d77979a7983433a8c124750563e010d31e2e8efc64386b59c2c56d3a0b4aee38"}
 *
 * Go source:
 * func IsExcludedByRegex(moduleSpecifier string, excludes []string) bool {
 * 	for _, pattern := range excludes {
 * 		re := stringToRegex(pattern)
 * 		if re == nil {
 * 			continue
 * 		}
 * 		if re.MatchString(moduleSpecifier) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function IsExcludedByRegex(moduleSpecifier: string, excludes: GoSlice<string>): bool {
  for (const pattern of excludes) {
    const re = stringToRegex(pattern);
    if (re === undefined) {
      continue;
    }
    if (re.MatchString(moduleSpecifier)) {
      return true;
    }
  }
  return false;
}

/**
 * Port note: upstream implementation source follows.
 *
 * Go source:
 * func stringToRegex(pattern string) *regexp.Regexp {
 * 	caseInsensitive := false
 *
 * 	if len(pattern) > 2 && pattern[0] == '/' {
 * 		lastSlash := strings.LastIndex(pattern, "/")
 * 		if lastSlash > 0 {
 * 			hasUnescapedMiddleSlash := false
 * 			for i := 1; i < lastSlash; i++ {
 * 				if pattern[i] == '/' && (i == 0 || pattern[i-1] != '\\') {
 * 					hasUnescapedMiddleSlash = true
 * 					break
 * 				}
 * 			}
 *
 * 			if !hasUnescapedMiddleSlash {
 * 				flags := pattern[lastSlash+1:]
 * 				pattern = pattern[1:lastSlash]
 *
 * 				for _, flag := range flags {
 * 					switch flag {
 * 					case 'i':
 * 						caseInsensitive = true
 * 					}
 * 				}
 * 			}
 * 		}
 * 	}
 * 	key := regexPatternCacheKey{pattern, caseInsensitive}
 *
 * 	regexPatternCacheMu.RLock()
 * 	re, ok := regexPatternCache[key]
 * 	regexPatternCacheMu.RUnlock()
 * 	if ok {
 * 		return re
 * 	}
 *
 * 	regexPatternCacheMu.Lock()
 * 	defer regexPatternCacheMu.Unlock()
 *
 * 	re, ok = regexPatternCache[key]
 * 	if ok {
 * 		return re
 * 	}
 *
 * 	if len(regexPatternCache) > 1000 {
 * 		clear(regexPatternCache)
 * 	}
 *
 * 	pattern = strings.Clone(pattern)
 * 	key.pattern = pattern
 *
 * 	compilePattern := pattern
 * 	if caseInsensitive {
 * 		compilePattern = "(?i:" + pattern + ")"
 * 	}
 *
 * 	compiled, err := regexp.Compile(compilePattern)
 * 	if err != nil {
 * 		regexPatternCache[key] = nil
 * 		return nil
 * 	}
 * 	regexPatternCache[key] = compiled
 * 	return compiled
 * }
 */
// Internal string-keyed cache used at runtime (Go uses struct key; TS uses serialized string key)
const _regexPatternCacheInternal: globalThis.Map<string, GoPtr<Regexp>> = new globalThis.Map<string, GoPtr<Regexp>>();

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::stringToRegex","kind":"func","status":"implemented","sigHash":"98e2fa5bb16ffdc03a7579f0c689e066e1489319a37a366d4f1077123e53ed09"}
 */
export function stringToRegex(pattern: string): GoPtr<Regexp> {
  let caseInsensitive = false;

  if (pattern.length > 2 && pattern[0] === "/") {
    const lastSlash = strings.LastIndex(pattern, "/");
    if (lastSlash > 0) {
      let hasUnescapedMiddleSlash = false;
      for (let i = 1; i < lastSlash; i++) {
        if (pattern[i] === "/" && (i === 0 || pattern[i - 1] !== "\\")) {
          hasUnescapedMiddleSlash = true;
          break;
        }
      }

      if (!hasUnescapedMiddleSlash) {
        const flags = pattern.slice(lastSlash + 1);
        pattern = pattern.slice(1, lastSlash);

        for (const flag of flags) {
          switch (flag) {
            case "i":
              caseInsensitive = true;
              break;
          }
        }
      }
    }
  }

  const cacheKey = `${caseInsensitive ? "i" : ""}:${pattern}`;

  if (_regexPatternCacheInternal.has(cacheKey)) {
    return _regexPatternCacheInternal.get(cacheKey)!;
  }

  if (_regexPatternCacheInternal.size > 1000) {
    _regexPatternCacheInternal.clear();
  }

  const compilePattern = caseInsensitive ? `(?i:${pattern})` : pattern;

  const [compiled, err] = Compile(compilePattern);
  if (err !== undefined) {
    _regexPatternCacheInternal.set(cacheKey, undefined);
    return undefined;
  }
  _regexPatternCacheInternal.set(cacheKey, compiled);
  return compiled;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::ensurePathIsNonModuleName","kind":"func","status":"implemented","sigHash":"60c25c479a0a9972c001c901ed9b68e3af1dce6649ca3a9400505e129d19a17a"}
 *
 * Go source:
 * func ensurePathIsNonModuleName(path string) string {
 * 	if PathIsBareSpecifier(path) {
 * 		return "./" + path
 * 	}
 * 	return path
 * }
 */
export function ensurePathIsNonModuleName(path: string): string {
  if (PathIsBareSpecifier(path)) {
    return "./" + path;
  }
  return path;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::GetJSExtensionForDeclarationFileExtension","kind":"func","status":"implemented","sigHash":"8b21c9b04ee113cb934ce555238dba65f6e5dd03a0c67ee95e7042466a4c73a7"}
 *
 * Go source:
 * func GetJSExtensionForDeclarationFileExtension(ext string) string {
 * 	switch ext {
 * 	case tspath.ExtensionDts:
 * 		return tspath.ExtensionJs
 * 	case tspath.ExtensionDmts:
 * 		return tspath.ExtensionMjs
 * 	case tspath.ExtensionDcts:
 * 		return tspath.ExtensionCjs
 * 	default:
 * 		// .d.json.ts and the like
 * 		return ext[len(".d") : len(ext)-len(tspath.ExtensionTs)]
 * 	}
 * }
 */
export function GetJSExtensionForDeclarationFileExtension(ext: string): string {
  switch (ext) {
    case ExtensionDts:
      return ExtensionJs;
    case ExtensionDmts:
      return ExtensionMjs;
    case ExtensionDcts:
      return ExtensionCjs;
    default:
      // .d.json.ts and the like
      return ext.slice(".d".length, ext.length - ExtensionTs.length);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::TryGetRealFileNameForNonJSDeclarationFileName","kind":"func","status":"implemented","sigHash":"41eb18c1e3f93c0cdf270694aa8583e439b5f5e843a015390d58f875fad634ef"}
 *
 * Go source:
 * func TryGetRealFileNameForNonJSDeclarationFileName(fileName string) string {
 * 	baseName := tspath.GetBaseFileName(fileName)
 * 	// Ends with .ts, contains ".d.", and is NOT a standard .d.ts file
 * 	if !strings.HasSuffix(fileName, tspath.ExtensionTs) ||
 * 		!strings.Contains(baseName, ".d.") ||
 * 		strings.HasSuffix(baseName, tspath.ExtensionDts) {
 * 		return ""
 * 	}
 * 	noExtension := tspath.RemoveExtension(fileName, tspath.ExtensionTs)
 * 	lastDotIndex := strings.LastIndex(noExtension, ".")
 * 	ext := noExtension[lastDotIndex:]
 * 	before, _, _ := strings.Cut(noExtension, ".d.")
 * 	return before + ext
 * }
 */
export function TryGetRealFileNameForNonJSDeclarationFileName(fileName: string): string {
  const baseName = GetBaseFileName(fileName);
  // Ends with .ts, contains ".d.", and is NOT a standard .d.ts file
  if (!strings.HasSuffix(fileName, ExtensionTs) ||
    !strings.Contains(baseName, ".d.") ||
    strings.HasSuffix(baseName, ExtensionDts)) {
    return "";
  }
  const noExtension = RemoveExtension(fileName, ExtensionTs);
  const lastDotIndex = strings.LastIndex(noExtension, ".");
  const ext = noExtension.slice(lastDotIndex);
  const [before] = strings.Cut(noExtension, ".d.");
  return before + ext;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::getJSExtensionForFile","kind":"func","status":"implemented","sigHash":"9126c08bec1e238bb1410328f11e9a883788db20301c6a5dfd9ce7c149e9d929"}
 *
 * Go source:
 * func getJSExtensionForFile(fileName string, options *core.CompilerOptions) string {
 * 	result := module.TryGetJSExtensionForFile(fileName, options)
 * 	if len(result) == 0 {
 * 		panic(fmt.Sprintf("Extension %s is unsupported:: FileName:: %s", extensionFromPath(fileName), fileName))
 * 	}
 * 	return result
 * }
 */
export function getJSExtensionForFile(fileName: string, options: GoPtr<CompilerOptions>): string {
  const result = TryGetJSExtensionForFile(fileName, options);
  if (result.length === 0) {
    throw new globalThis.Error(`Extension ${extensionFromPath(fileName)} is unsupported:: FileName:: ${fileName}`);
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::extensionFromPath","kind":"func","status":"implemented","sigHash":"adc220554fb8a87a7a17ac7a65b200a1dbff869e6a5cf525952b937f9d8f77f2"}
 *
 * Go source:
 * func extensionFromPath(path string) string {
 * 	ext := tspath.TryGetExtensionFromPath(path)
 * 	if len(ext) == 0 {
 * 		panic(fmt.Sprintf("File %s has unknown extension.", path))
 * 	}
 * 	return ext
 * }
 */
export function extensionFromPath(path: string): string {
  const ext = TryGetExtensionFromPath(path);
  if (ext.length === 0) {
    throw new globalThis.Error(`File ${path} has unknown extension.`);
  }
  return ext;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::tryGetAnyFileFromPath","kind":"func","status":"implemented","sigHash":"541dbc1ea92bd9de4c7a3d0064593109947b80011ebc08efb1291cf75500351d"}
 *
 * Go source:
 * func tryGetAnyFileFromPath(host ModuleSpecifierGenerationHost, path string) bool {
 * 	// !!! TODO: shouldn't this use readdir instead of fileexists for perf?
 * 	// We check all js, `node` and `json` extensions in addition to TS, since node module resolution would also choose those over the directory
 * 	extGroups := tsoptions.GetSupportedExtensions(
 * 		&core.CompilerOptions{
 * 			AllowJs: core.TSTrue,
 * 		},
 * 		[]tsoptions.FileExtensionInfo{
 * 			{
 * 				Extension:      "node",
 * 				IsMixedContent: false,
 * 				ScriptKind:     core.ScriptKindExternal,
 * 			},
 * 			{
 * 				Extension:      "json",
 * 				IsMixedContent: false,
 * 				ScriptKind:     core.ScriptKindJSON,
 * 			},
 * 		},
 * 	)
 * 	for _, exts := range extGroups {
 * 		for _, e := range exts {
 * 			fullPath := path + e
 * 			if host.FileExists(tspath.GetNormalizedAbsolutePath(fullPath, host.GetCurrentDirectory())) {
 * 				return true
 * 			}
 * 		}
 * 	}
 * 	return false
 * }
 */
export function tryGetAnyFileFromPath(host: GoInterface<ModuleSpecifierGenerationHost>, path: string): bool {
  // !!! TODO: shouldn't this use readdir instead of fileexists for perf?
  // We check all js, `node` and `json` extensions in addition to TS, since node module resolution would also choose those over the directory
  const extGroups = GetSupportedExtensions(
    { AllowJs: TSTrue } as Parameters<typeof GetSupportedExtensions>[0],
    [
      {
        Extension: "node",
        IsMixedContent: false,
        ScriptKind: ScriptKindExternal,
      } as FileExtensionInfo,
      {
        Extension: "json",
        IsMixedContent: false,
        ScriptKind: ScriptKindJSON,
      } as FileExtensionInfo,
    ],
  );
  for (const exts of extGroups) {
    for (const e of exts) {
      const fullPath = path + e;
      if (host!.FileExists(GetNormalizedAbsolutePath(fullPath, host!.GetCurrentDirectory()))) {
        return true;
      }
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::getPathsRelativeToRootDirs","kind":"func","status":"implemented","sigHash":"d6d5537ab878449108d49d28c8d9905405110a0ac7b953a8154da83967f93fbe"}
 *
 * Go source:
 * func getPathsRelativeToRootDirs(path string, rootDirs []string, useCaseSensitiveFileNames bool) []string {
 * 	var results []string
 * 	for _, rootDir := range rootDirs {
 * 		relativePath := getRelativePathIfInSameVolume(path, rootDir, useCaseSensitiveFileNames)
 * 		if !isPathRelativeToParent(relativePath) {
 * 			results = append(results, relativePath)
 * 		}
 * 	}
 * 	return results
 * }
 */
export function getPathsRelativeToRootDirs(path: string, rootDirs: GoSlice<string>, useCaseSensitiveFileNames: bool): GoSlice<string> {
  let results = GoNilSlice<string>();
  for (const rootDir of rootDirs) {
    const relativePath = getRelativePathIfInSameVolume(path, rootDir, useCaseSensitiveFileNames);
    if (!isPathRelativeToParent(relativePath)) {
      results = GoSliceAppend(results, relativePath, GoStringValueOps);
    }
  }
  return results;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::isPathRelativeToParent","kind":"func","status":"implemented","sigHash":"58a8a5550c8c2a3d9f4a40ca1ff903ae991a245c6b223aeee7c9ec72f5d26961"}
 *
 * Go source:
 * func isPathRelativeToParent(path string) bool {
 * 	return strings.HasPrefix(path, "..")
 * }
 */
export function isPathRelativeToParent(path: string): bool {
  return strings.HasPrefix(path, "..");
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::getRelativePathIfInSameVolume","kind":"func","status":"implemented","sigHash":"6040e78b03b84605583949d1c472133636db53cbe8b4d50fdaaa7db205765494"}
 *
 * Go source:
 * func getRelativePathIfInSameVolume(path string, directoryPath string, useCaseSensitiveFileNames bool) string {
 * 	relativePath := tspath.GetRelativePathToDirectoryOrUrl(directoryPath, path, false, tspath.ComparePathsOptions{
 * 		UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
 * 		CurrentDirectory:          directoryPath,
 * 	})
 * 	if tspath.IsRootedDiskPath(relativePath) {
 * 		return ""
 * 	}
 * 	return relativePath
 * }
 */
export function getRelativePathIfInSameVolume(path: string, directoryPath: string, useCaseSensitiveFileNames: bool): string {
  const relativePath = GetRelativePathToDirectoryOrUrl(directoryPath, path, false, {
    UseCaseSensitiveFileNames: useCaseSensitiveFileNames,
    CurrentDirectory: directoryPath,
  });
  if (IsRootedDiskPath(relativePath)) {
    return "";
  }
  return relativePath;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::packageJsonPathsAreEqual","kind":"func","status":"implemented","sigHash":"83030f2af64b2fec7efe3ff10c17b7cb9d2e219a3c8e2a59acc1eb2ae7bfc94e"}
 *
 * Go source:
 * func packageJsonPathsAreEqual(a string, b string, options tspath.ComparePathsOptions) bool {
 * 	if a == b {
 * 		return true
 * 	}
 * 	if len(a) == 0 || len(b) == 0 {
 * 		return false
 * 	}
 * 	return tspath.ComparePaths(a, b, options) == 0
 * }
 */
export function packageJsonPathsAreEqual(a: string, b: string, options: ComparePathsOptions): bool {
  if (a === b) {
    return true;
  }
  if (a.length === 0 || b.length === 0) {
    return false;
  }
  return ComparePaths(a, b, options) === 0;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::prefersTsExtension","kind":"func","status":"implemented","sigHash":"e5024ba6bb6cb39fcda5e8d225edce1100732a540592a9a7d74f279f7c3bda77"}
 *
 * Go source:
 * func prefersTsExtension(allowedEndings []ModuleSpecifierEnding) bool {
 * 	jsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingJsExtension)
 * 	tsPriority := slices.Index(allowedEndings, ModuleSpecifierEndingTsExtension)
 * 	if tsPriority > -1 {
 * 		return tsPriority < jsPriority
 * 	}
 * 	return false
 * }
 */
export function prefersTsExtension(allowedEndings: GoSlice<ModuleSpecifierEnding>): bool {
  const jsPriority = allowedEndings.indexOf(ModuleSpecifierEndingJsExtension);
  const tsPriority = allowedEndings.indexOf(ModuleSpecifierEndingTsExtension);
  if (tsPriority > -1) {
    return tsPriority < jsPriority;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::replaceFirstStar","kind":"func","status":"implemented","sigHash":"4f49d9372d7ff3145ef69e0e99af26e1de7c253cf22edb11ad3b353f2d1fe5fe"}
 *
 * Go source:
 * func replaceFirstStar(s string, replacement string) string {
 * 	return strings.Replace(s, "*", replacement, 1)
 * }
 */
export function replaceFirstStar(s: string, replacement: string): string {
  return strings.Replace(s, "*", replacement, 1);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::type::NodeModulePathParts","kind":"type","status":"implemented","sigHash":"8ff5af92e2086ff0ddaf52d0a7a4e62f2d7b728000ebf6f87223fb7f0f59768b"}
 *
 * Go source:
 * NodeModulePathParts struct {
 * 	TopLevelNodeModulesIndex int
 * 	TopLevelPackageNameIndex int
 * 	PackageRootIndex         int
 * 	FileNameIndex            int
 * }
 */
export interface NodeModulePathParts {
  TopLevelNodeModulesIndex: int;
  TopLevelPackageNameIndex: int;
  PackageRootIndex: int;
  FileNameIndex: int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::type::nodeModulesPathParseState","kind":"type","status":"implemented","sigHash":"b05bf61b23d305f8385e94b756f3438334561a1892f455a44d76116610b2c95a"}
 *
 * Go source:
 * nodeModulesPathParseState uint8
 */
export type nodeModulesPathParseState = byte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::constGroup::nodeModulesPathParseStateBeforeNodeModules+nodeModulesPathParseStateNodeModules+nodeModulesPathParseStateScope+nodeModulesPathParseStatePackageContent","kind":"constGroup","status":"implemented","sigHash":"f9f6cce5f728a083c9da388524d53964ffe557027ea55b2d94ef605606fa942b"}
 *
 * Go source:
 * const (
 * 	nodeModulesPathParseStateBeforeNodeModules nodeModulesPathParseState = iota
 * 	nodeModulesPathParseStateNodeModules
 * 	nodeModulesPathParseStateScope
 * 	nodeModulesPathParseStatePackageContent
 * )
 */
export const nodeModulesPathParseStateBeforeNodeModules: nodeModulesPathParseState = 0 as nodeModulesPathParseState;
export const nodeModulesPathParseStateNodeModules: nodeModulesPathParseState = 1 as nodeModulesPathParseState;
export const nodeModulesPathParseStateScope: nodeModulesPathParseState = 2 as nodeModulesPathParseState;
export const nodeModulesPathParseStatePackageContent: nodeModulesPathParseState = 3 as nodeModulesPathParseState;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::GetNodeModulePathParts","kind":"func","status":"implemented","sigHash":"0961c5f0b343f13e819fe5d56f9be2c49ab4a9030236c73015ebe892f2f1ec65"}
 *
 * Go source:
 * func GetNodeModulePathParts(fullPath string) *NodeModulePathParts {
 * 	// If fullPath can't be valid module file within node_modules, returns undefined.
 * 	// Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
 * 	// Returns indices:                       ^            ^                                                      ^             ^
 *
 * 	topLevelNodeModulesIndex := 0
 * 	topLevelPackageNameIndex := 0
 * 	packageRootIndex := 0
 * 	fileNameIndex := 0
 *
 * 	partStart := 0
 * 	partEnd := 0
 * 	state := nodeModulesPathParseStateBeforeNodeModules
 *
 * 	for partEnd >= 0 {
 * 		partStart = partEnd
 * 		partEnd = core.IndexAfter(fullPath, "/", partStart+1)
 * 		switch state {
 * 		case nodeModulesPathParseStateBeforeNodeModules:
 * 			if strings.Index(fullPath[partStart:], "/node_modules/") == 0 {
 * 				topLevelNodeModulesIndex = partStart
 * 				topLevelPackageNameIndex = partEnd
 * 				state = nodeModulesPathParseStateNodeModules
 * 			}
 * 		case nodeModulesPathParseStateNodeModules, nodeModulesPathParseStateScope:
 * 			if state == nodeModulesPathParseStateNodeModules && fullPath[partStart+1] == '@' {
 * 				state = nodeModulesPathParseStateScope
 * 			} else {
 * 				packageRootIndex = partEnd
 * 				state = nodeModulesPathParseStatePackageContent
 * 			}
 * 		case nodeModulesPathParseStatePackageContent:
 * 			if strings.Index(fullPath[partStart:], "/node_modules/") == 0 {
 * 				state = nodeModulesPathParseStateNodeModules
 * 			} else {
 * 				state = nodeModulesPathParseStatePackageContent
 * 			}
 * 		}
 * 	}
 *
 * 	fileNameIndex = partStart
 *
 * 	if state > nodeModulesPathParseStateNodeModules {
 * 		return &NodeModulePathParts{
 * 			TopLevelNodeModulesIndex: topLevelNodeModulesIndex,
 * 			TopLevelPackageNameIndex: topLevelPackageNameIndex,
 * 			PackageRootIndex:         packageRootIndex,
 * 			FileNameIndex:            fileNameIndex,
 * 		}
 * 	}
 * 	return nil
 * }
 */
export function GetNodeModulePathParts(fullPath: string): GoPtr<NodeModulePathParts> {
  // If fullPath can't be valid module file within node_modules, returns undefined.
  // Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
  // Returns indices:                       ^            ^                                                      ^             ^

  let topLevelNodeModulesIndex = 0;
  let topLevelPackageNameIndex = 0;
  let packageRootIndex = 0;
  let fileNameIndex = 0;

  let partStart = 0;
  let partEnd = 0;
  let state: nodeModulesPathParseState = nodeModulesPathParseStateBeforeNodeModules;

  for (; partEnd >= 0;) {
    partStart = partEnd;
    partEnd = IndexAfter(fullPath, "/", partStart + 1);
    switch (state) {
      case nodeModulesPathParseStateBeforeNodeModules:
        if (strings.Index(fullPath.slice(partStart), "/node_modules/") === 0) {
          topLevelNodeModulesIndex = partStart;
          topLevelPackageNameIndex = partEnd;
          state = nodeModulesPathParseStateNodeModules;
        }
        break;
      case nodeModulesPathParseStateNodeModules:
      case nodeModulesPathParseStateScope:
        if (state === nodeModulesPathParseStateNodeModules && fullPath[partStart + 1] === "@") {
          state = nodeModulesPathParseStateScope;
        } else {
          packageRootIndex = partEnd;
          state = nodeModulesPathParseStatePackageContent;
        }
        break;
      case nodeModulesPathParseStatePackageContent:
        if (strings.Index(fullPath.slice(partStart), "/node_modules/") === 0) {
          state = nodeModulesPathParseStateNodeModules;
        } else {
          state = nodeModulesPathParseStatePackageContent;
        }
        break;
    }
  }

  fileNameIndex = partStart;

  if (state > nodeModulesPathParseStateNodeModules) {
    return {
      TopLevelNodeModulesIndex: topLevelNodeModulesIndex,
      TopLevelPackageNameIndex: topLevelPackageNameIndex,
      PackageRootIndex: packageRootIndex,
      FileNameIndex: fileNameIndex,
    };
  }
  return undefined;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::GetNodeModulesPackageName","kind":"func","status":"implemented","sigHash":"5cd549e10f17cb8a849869e457a62a71542819f5867c4dc7319fe1be6b0f83cd"}
 *
 * Go source:
 * func GetNodeModulesPackageName(
 * 	compilerOptions *core.CompilerOptions,
 * 	importingSourceFile *ast.SourceFile, // !!! | FutureSourceFile
 * 	nodeModulesFileName string,
 * 	host ModuleSpecifierGenerationHost,
 * 	preferences UserPreferences,
 * 	options ModuleSpecifierOptions,
 * ) string {
 * 	info := getInfo(importingSourceFile.FileName(), host)
 * 	modulePaths := getAllModulePaths(info, nodeModulesFileName, host, compilerOptions, preferences, options)
 * 	for _, modulePath := range modulePaths {
 * 		if result := tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile, host, compilerOptions, preferences, true /*packageNameOnly* /, options.OverrideImportMode); len(result) > 0 {
 * 			return result
 * 		}
 * 	}
 * 	return ""
 * }
 */
export function GetNodeModulesPackageName(compilerOptions: GoPtr<CompilerOptions>, importingSourceFile: GoPtr<SourceFile>, nodeModulesFileName: string, host: GoInterface<ModuleSpecifierGenerationHost>, preferences: UserPreferences, options: ModuleSpecifierOptions): string {
  const info = getInfo(importingSourceFile!.FileName(), host);
  const modulePaths = getAllModulePaths(info, nodeModulesFileName, host, compilerOptions, preferences, options);
  for (const modulePath of modulePaths) {
    const result = tryGetModuleNameAsNodeModule(modulePath, info, importingSourceFile!, host, compilerOptions, preferences, true /*packageNameOnly*/, options.OverrideImportMode);
    if (result.length > 0) {
      return result;
    }
  }
  return "";
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::allKeysStartWithDot","kind":"func","status":"implemented","sigHash":"dfa5c55d4674d12fc3b95a141a92945a864c82bd85523123c90b446a77c056f0"}
 *
 * Go source:
 * func allKeysStartWithDot(obj *collections.OrderedMap[string, packagejson.ExportsOrImports]) bool {
 * 	for k := range obj.Keys() {
 * 		if !strings.HasPrefix(k, ".") {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function allKeysStartWithDot(obj: GoPtr<OrderedMap<string, ExportsOrImports>>): bool {
  const keys = obj!.keys as string[];
  for (const k of keys) {
    if (!strings.HasPrefix(k, ".")) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::GetPackageNameFromDirectory","kind":"func","status":"implemented","sigHash":"3b2e3fcad19d78ba20ab33a0053b33a11058268a0a83345145900fbb7d12f693"}
 *
 * Go source:
 * func GetPackageNameFromDirectory(fileOrDirectoryPath string) string {
 * 	idx := strings.LastIndex(fileOrDirectoryPath, "/node_modules/")
 * 	if idx == -1 {
 * 		return ""
 * 	}
 *
 * 	basename := fileOrDirectoryPath[idx+len("/node_modules/"):]
 * 	if basename[0] == '.' {
 * 		return ""
 * 	}
 *
 * 	nextSlash := strings.Index(basename, "/")
 * 	if nextSlash == -1 {
 * 		return basename
 * 	}
 *
 * 	if basename[0] != '@' || nextSlash == len(basename)-1 {
 * 		return basename[:nextSlash]
 * 	}
 *
 * 	secondSlash := strings.Index(basename[nextSlash+1:], "/")
 * 	if secondSlash == -1 {
 * 		return basename
 * 	}
 *
 * 	return basename[:nextSlash+1+secondSlash]
 * }
 */
export function GetPackageNameFromDirectory(fileOrDirectoryPath: string): string {
  const idx = strings.LastIndex(fileOrDirectoryPath, "/node_modules/");
  if (idx === -1) {
    return "";
  }

  const basename = fileOrDirectoryPath.slice(idx + "/node_modules/".length);
  if (basename[0] === ".") {
    return "";
  }

  const nextSlash = strings.Index(basename, "/");
  if (nextSlash === -1) {
    return basename;
  }

  if (basename[0] !== "@" || nextSlash === basename.length - 1) {
    return basename.slice(0, nextSlash);
  }

  const secondSlash = strings.Index(basename.slice(nextSlash + 1), "/");
  if (secondSlash === -1) {
    return basename;
  }

  return basename.slice(0, nextSlash + 1 + secondSlash);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/modulespecifiers/util.go::func::ProcessEntrypointEnding","kind":"func","status":"implemented","sigHash":"688af0e5aefd874bcf85d15ee0186af18a5dc65fc37e76c143a23bb19d1a3b1a"}
 *
 * Go source:
 * func ProcessEntrypointEnding(
 * 	entrypoint *module.ResolvedEntrypoint,
 * 	prefs UserPreferences,
 * 	host ModuleSpecifierGenerationHost,
 * 	options *core.CompilerOptions,
 * 	importingSourceFile SourceFileForSpecifierGeneration,
 * 	allowedEndings []ModuleSpecifierEnding,
 * ) string {
 * 	specifier := entrypoint.ModuleSpecifier
 * 	if entrypoint.Ending == module.EndingFixed {
 * 		return specifier
 * 	}
 *
 * 	if len(allowedEndings) == 0 {
 * 		allowedEndings = GetAllowedEndingsInPreferredOrder(
 * 			prefs,
 * 			host,
 * 			options,
 * 			importingSourceFile,
 * 			"",
 * 			host.GetDefaultResolutionModeForFile(importingSourceFile),
 * 		)
 * 	}
 *
 * 	preferredEnding := allowedEndings[0]
 *
 * 	// Handle declaration file extensions
 * 	dtsExtension := tspath.GetDeclarationFileExtension(specifier)
 * 	if dtsExtension != "" {
 * 		switch preferredEnding {
 * 		case ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension:
 * 			// Map .d.ts -> .js, .d.mts -> .mjs, .d.cts -> .cjs
 * 			jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
 * 			return tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, false)
 * 		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
 * 			if entrypoint.Ending == module.EndingChangeable {
 * 				// .d.mts/.d.cts must keep an extension; rewrite to .mjs/.cjs instead of dropping
 * 				if dtsExtension == tspath.ExtensionDts {
 * 					specifier = tspath.RemoveExtension(specifier, dtsExtension)
 * 					if preferredEnding == ModuleSpecifierEndingMinimal {
 * 						specifier = strings.TrimSuffix(specifier, "/index")
 * 					}
 * 					return specifier
 * 				}
 * 				jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
 * 				return tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, false)
 * 			}
 * 			// EndingExtensionChangeable - can only change extension, not remove it
 * 			jsExtension := GetJSExtensionForDeclarationFileExtension(dtsExtension)
 * 			return tspath.ChangeAnyExtension(specifier, jsExtension, []string{dtsExtension}, false)
 * 		}
 * 		return specifier
 * 	}
 *
 * 	// Handle .ts/.tsx/.mts/.cts extensions
 * 	if tspath.FileExtensionIsOneOf(specifier, []string{tspath.ExtensionTs, tspath.ExtensionTsx, tspath.ExtensionMts, tspath.ExtensionCts}) {
 * 		switch preferredEnding {
 * 		case ModuleSpecifierEndingTsExtension:
 * 			return specifier
 * 		case ModuleSpecifierEndingJsExtension:
 * 			if jsExtension := module.TryGetJSExtensionForFile(specifier, options); jsExtension != "" {
 * 				return tspath.RemoveFileExtension(specifier) + jsExtension
 * 			}
 * 			return specifier
 * 		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
 * 			if entrypoint.Ending == module.EndingChangeable {
 * 				specifier = tspath.RemoveFileExtension(specifier)
 * 				if preferredEnding == ModuleSpecifierEndingMinimal {
 * 					specifier = strings.TrimSuffix(specifier, "/index")
 * 				}
 * 				return specifier
 * 			}
 * 			// EndingExtensionChangeable - can only change extension, not remove it
 * 			if jsExtension := module.TryGetJSExtensionForFile(specifier, options); jsExtension != "" {
 * 				return tspath.RemoveFileExtension(specifier) + jsExtension
 * 			}
 * 			return specifier
 * 		}
 * 		return specifier
 * 	}
 *
 * 	// Handle .js/.jsx/.mjs/.cjs extensions
 * 	if tspath.FileExtensionIsOneOf(specifier, []string{tspath.ExtensionJs, tspath.ExtensionJsx, tspath.ExtensionMjs, tspath.ExtensionCjs}) {
 * 		switch preferredEnding {
 * 		case ModuleSpecifierEndingTsExtension, ModuleSpecifierEndingJsExtension:
 * 			return specifier
 * 		case ModuleSpecifierEndingMinimal, ModuleSpecifierEndingIndex:
 * 			if entrypoint.Ending == module.EndingChangeable {
 * 				specifier = tspath.RemoveFileExtension(specifier)
 * 				if preferredEnding == ModuleSpecifierEndingMinimal {
 * 					specifier = strings.TrimSuffix(specifier, "/index")
 * 				}
 * 				return specifier
 * 			}
 * 			// EndingExtensionChangeable - keep the extension
 * 			return specifier
 * 		}
 * 		return specifier
 * 	}
 *
 * 	// For other extensions (like .json), return as-is
 * 	return specifier
 * }
 */
export function ProcessEntrypointEnding(entrypoint: GoPtr<ResolvedEntrypoint>, prefs: UserPreferences, host: GoInterface<ModuleSpecifierGenerationHost>, options: GoPtr<CompilerOptions>, importingSourceFile: GoInterface<SourceFileForSpecifierGeneration>, allowedEndings: GoSlice<ModuleSpecifierEnding>): string {
  let specifier = entrypoint!.ModuleSpecifier;
  if (entrypoint!.Ending === EndingFixed) {
    return specifier;
  }

  if (allowedEndings.length === 0) {
    allowedEndings = GetAllowedEndingsInPreferredOrder(
      prefs,
      host,
      options,
      importingSourceFile,
      "",
      host!.GetDefaultResolutionModeForFile(importingSourceFile),
    );
  }

  const preferredEnding = GoSliceLoad(allowedEndings, 0, GoNumberValueOps);

  // Handle declaration file extensions
  const dtsExtension = GetDeclarationFileExtension(specifier);
  if (dtsExtension !== "") {
    switch (preferredEnding) {
      case ModuleSpecifierEndingTsExtension:
      case ModuleSpecifierEndingJsExtension: {
        // Map .d.ts -> .js, .d.mts -> .mjs, .d.cts -> .cjs
        const jsExtension = GetJSExtensionForDeclarationFileExtension(dtsExtension);
        return ChangeAnyExtension(specifier, jsExtension, GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
          GoSliceStore(__goSliceLiteral, 0, dtsExtension, GoStringValueOps);
        }), false);
      }
      case ModuleSpecifierEndingMinimal:
      case ModuleSpecifierEndingIndex:
        if (entrypoint!.Ending === EndingChangeable) {
          // .d.mts/.d.cts must keep an extension; rewrite to .mjs/.cjs instead of dropping
          if (dtsExtension === ExtensionDts) {
            specifier = RemoveExtension(specifier, dtsExtension);
            if (preferredEnding === ModuleSpecifierEndingMinimal) {
              specifier = strings.TrimSuffix(specifier, "/index");
            }
            return specifier;
          }
          const jsExtension2 = GetJSExtensionForDeclarationFileExtension(dtsExtension);
          return ChangeAnyExtension(specifier, jsExtension2, GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, dtsExtension, GoStringValueOps);
          }), false);
        }
        // EndingExtensionChangeable - can only change extension, not remove it
        {
          const jsExtension3 = GetJSExtensionForDeclarationFileExtension(dtsExtension);
          return ChangeAnyExtension(specifier, jsExtension3, GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, dtsExtension, GoStringValueOps);
          }), false);
        }
    }
    return specifier;
  }

  // Handle .ts/.tsx/.mts/.cts extensions
  if (FileExtensionIsOneOf(specifier, GoSliceBuild(4, 4, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionTs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionTsx, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionMts, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 3, ExtensionCts, GoStringValueOps);
  }))) {
    switch (preferredEnding) {
      case ModuleSpecifierEndingTsExtension:
        return specifier;
      case ModuleSpecifierEndingJsExtension: {
        const jsExtension = TryGetJSExtensionForFile(specifier, options);
        if (jsExtension !== "") {
          return RemoveFileExtension(specifier) + jsExtension;
        }
        return specifier;
      }
      case ModuleSpecifierEndingMinimal:
      case ModuleSpecifierEndingIndex:
        if (entrypoint!.Ending === EndingChangeable) {
          specifier = RemoveFileExtension(specifier);
          if (preferredEnding === ModuleSpecifierEndingMinimal) {
            specifier = strings.TrimSuffix(specifier, "/index");
          }
          return specifier;
        }
        // EndingExtensionChangeable - can only change extension, not remove it
        {
          const jsExtension2 = TryGetJSExtensionForFile(specifier, options);
          if (jsExtension2 !== "") {
            return RemoveFileExtension(specifier) + jsExtension2;
          }
          return specifier;
        }
    }
    return specifier;
  }

  // Handle .js/.jsx/.mjs/.cjs extensions
  if (FileExtensionIsOneOf(specifier, GoSliceBuild(4, 4, GoStringValueOps, (__goSliceLiteral) => {
    GoSliceStore(__goSliceLiteral, 0, ExtensionJs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 1, ExtensionJsx, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 2, ExtensionMjs, GoStringValueOps);
    GoSliceStore(__goSliceLiteral, 3, ExtensionCjs, GoStringValueOps);
  }))) {
    switch (preferredEnding) {
      case ModuleSpecifierEndingTsExtension:
      case ModuleSpecifierEndingJsExtension:
        return specifier;
      case ModuleSpecifierEndingMinimal:
      case ModuleSpecifierEndingIndex:
        if (entrypoint!.Ending === EndingChangeable) {
          specifier = RemoveFileExtension(specifier);
          if (preferredEnding === ModuleSpecifierEndingMinimal) {
            specifier = strings.TrimSuffix(specifier, "/index");
          }
          return specifier;
        }
        // EndingExtensionChangeable - keep the extension
        return specifier;
    }
    return specifier;
  }

  // For other extensions (like .json), return as-is
  return specifier;
}
