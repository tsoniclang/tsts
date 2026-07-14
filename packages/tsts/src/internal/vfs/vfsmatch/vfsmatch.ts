import type { bool, int, sbyte } from "../../../go/scalars.js";
import { GoAppend, GoMapIsNil, GoStringKey, GoZeroString, type GoPtr, type GoRune, type GoSlice } from "../../../go/compat.js";
import { GoSliceAppend, GoSliceAppendSlice, GoSliceBuild, GoSliceStore, GoStringValueOps } from "../../../go/compat.js";
import { MaxInt } from "../../../go/math.js";
import { SortStableFunc } from "../../../go/slices.js";
import { Every, Flatten, LastOrNil } from "../../core/core.js";
import { NewSetWithSizeHint, Set_Add, Set_Has } from "../../collections/set.js";
import type { Set } from "../../collections/set.js";
import { FileExtensionIsOneOf } from "../../tspath/extension.js";
import { ComparePathsOptions_GetComparer, CombinePaths, ContainsPath, GetCanonicalFileName, GetDirectoryPath, GetNormalizedPathComponents, HasExtension, IsRootedDiskPath, NormalizePath, RemoveTrailingDirectorySeparator } from "../../tspath/path.js";
import type { ComparePathsOptions } from "../../tspath/path.js";
import type { FS } from "../vfs.js";

import type { GoInterface } from "../../../go/compat.js";
/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::Usage","kind":"type","status":"implemented","sigHash":"56c72bc27d92dabb6a98e08c0218812331e176b895533580d85b7591ec37069d"}
 *
 * Go source:
 * Usage int8
 */
export type Usage = sbyte;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::constGroup::UsageFiles+UsageDirectories+UsageExclude","kind":"constGroup","status":"implemented","sigHash":"863d1561e1be7b2311738a5ce8545c9cc56908364e26958f09d413a3bfe7d8f5"}
 *
 * Go source:
 * const (
 * 	UsageFiles Usage = iota
 * 	UsageDirectories
 * 	UsageExclude
 * )
 */
export const UsageFiles: Usage = 0 as Usage;
export const UsageDirectories: Usage = 1 as Usage;
export const UsageExclude: Usage = 2 as Usage;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::constGroup::UnlimitedDepth","kind":"constGroup","status":"implemented","sigHash":"a4401657d71e66db3262e92b0829c9e3570d53f61dba229db53bcf6781a30479"}
 * @tsgo-override {"category":"runtime-numeric-representation","allow":["initializer"],"reason":"The JavaScript number carrier cannot represent the profile-dependent Go MaxInt values exactly; the rounded 64-bit sentinel remains behaviorally unlimited and is hash-pinned.","goInitializer":"[2,3,8,9,16,17,22,23,32,33,38,39,46,47,48,49,58,59,64,65,66,67,72,73,78,79,82,83,88,89]=>UnlimitedDepth={\"kind\":\"number\",\"value\":\"2147483647\"}|[0,1,4,5,6,7,10,11,12,13,14,15,18,19,20,21,24,25,26,27,28,29,30,31,34,35,36,37,40,41,42,43,44,45,50,51,52,53,54,55,56,57,60,61,62,63,68,69,70,71,74,75,76,77,80,81,84,85,86,87,90,91,92,93]=>UnlimitedDepth={\"kind\":\"number\",\"value\":\"9223372036854775807\"}","tsInitializer":"UnlimitedDepth={\"kind\":\"number\",\"value\":\"9223372036854776000\"}"}
 *
 * Go source:
 * const UnlimitedDepth = math.MaxInt
 */
export const UnlimitedDepth: int = MaxInt;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::ReadDirectory","kind":"func","status":"implemented","sigHash":"d4e3e6106bc8f65e288e603282ad88d4ff63bd888990ec2d2e1136aa420b27e0"}
 *
 * Go source:
 * func ReadDirectory(host vfs.FS, currentDir string, path string, extensions []string, excludes []string, includes []string, depth int) []string {
 * 	return matchFiles(path, extensions, excludes, includes, host.UseCaseSensitiveFileNames(), currentDir, depth, host)
 * }
 */
export function ReadDirectory(host: GoInterface<FS>, currentDir: string, path: string, extensions: GoSlice<string>, excludes: GoSlice<string>, includes: GoSlice<string>, depth: int): GoSlice<string> {
  return matchFiles(path, extensions, excludes, includes, host!.UseCaseSensitiveFileNames(), currentDir, depth, host);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::IsImplicitGlob","kind":"func","status":"implemented","sigHash":"af1b4b5d110ee8081b7b62612fd3447f5d575bb245a70e99fb82eec9d9686173"}
 *
 * Go source:
 * func IsImplicitGlob(lastPathComponent string) bool {
 * 	return !strings.ContainsAny(lastPathComponent, ".*?")
 * }
 */
export function IsImplicitGlob(lastPathComponent: string): bool {
  return !lastPathComponent.includes(".") && !lastPathComponent.includes("*") && !lastPathComponent.includes("?") as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::varGroup::wildcardCharCodes","kind":"varGroup","status":"implemented","sigHash":"54551279500e5a34df2bfd94caa1ee0bb4d96bb079f46b88df3138582a284577"}
 *
 * Go source:
 * var wildcardCharCodes = []rune{'*', '?'}
 */
export let wildcardCharCodes: GoSlice<GoRune> = [0x2a, 0x3f] as GoSlice<GoRune>; // '*', '?'

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::getIncludeBasePath","kind":"func","status":"implemented","sigHash":"8d50a317ffb7fb224ecf550f5c6cee8f39ba6f9c84401ed760249cc559bd9a70"}
 *
 * Go source:
 * func getIncludeBasePath(absolute string) string {
 * 	wildcardOffset := strings.IndexAny(absolute, string(wildcardCharCodes))
 * 	if wildcardOffset < 0 {
 * 		// No "*" or "?" in the path
 * 		if !tspath.HasExtension(absolute) {
 * 			return absolute
 * 		} else {
 * 			return tspath.RemoveTrailingDirectorySeparator(tspath.GetDirectoryPath(absolute))
 * 		}
 * 	}
 * 	return absolute[:max(strings.LastIndex(absolute[:wildcardOffset], string(tspath.DirectorySeparator)), 0)]
 * }
 */
export function getIncludeBasePath(absolute: string): string {
  // strings.IndexAny(absolute, string(wildcardCharCodes)) — find first * or ?
  const wildcardOffset = findFirstWildcard(absolute);
  if (wildcardOffset < 0) {
    // No "*" or "?" in the path
    if (!HasExtension(absolute)) {
      return absolute;
    } else {
      return RemoveTrailingDirectorySeparator(GetDirectoryPath(absolute));
    }
  }
  // absolute[:max(strings.LastIndex(absolute[:wildcardOffset], string(tspath.DirectorySeparator)), 0)]
  const prefix = absolute.slice(0, wildcardOffset);
  const lastSlash = prefix.lastIndexOf("/");
  return absolute.slice(0, Math.max(lastSlash, 0));
}

function findFirstWildcard(s: string): int {
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*" || s[i] === "?") {
      return i as int;
    }
  }
  return -1 as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::getBasePaths","kind":"func","status":"implemented","sigHash":"0b5cf11493451cfe1b155cd7dbf759dd6549bb0ef224e047988369f1344ec12a"}
 *
 * Go source:
 * func getBasePaths(path string, includes []string, useCaseSensitiveFileNames bool) []string {
 * 	// Storage for our results in the form of literal paths (e.g. the paths as written by the user).
 * 	basePaths := []string{path}
 * 
 * 	if len(includes) > 0 {
 * 		comparePathsOptions := tspath.ComparePathsOptions{CurrentDirectory: path, UseCaseSensitiveFileNames: useCaseSensitiveFileNames}
 * 		stringComparer := comparePathsOptions.GetComparer()
 * 
 * 		// Storage for literal base paths amongst the include patterns.
 * 		includeBasePaths := []string{}
 * 		for _, include := range includes {
 * 			// We also need to check the relative paths by converting them to absolute and normalizing
 * 			// in case they escape the base path (e.g "..\somedirectory")
 * 			var absolute string
 * 			if tspath.IsRootedDiskPath(include) {
 * 				absolute = include
 * 			} else {
 * 				absolute = tspath.NormalizePath(tspath.CombinePaths(path, include))
 * 			}
 * 			// Append the literal and canonical candidate base paths.
 * 			includeBasePaths = append(includeBasePaths, getIncludeBasePath(absolute))
 * 		}
 * 
 * 		// Sort the offsets array using either the literal or canonical path representations.
 * 		slices.SortStableFunc(includeBasePaths, stringComparer)
 * 
 * 		// Iterate over each include base path and include unique base paths that are not a
 * 		// subpath of an existing base path
 * 		for _, includeBasePath := range includeBasePaths {
 * 			if core.Every(basePaths, func(basepath string) bool {
 * 				return !tspath.ContainsPath(basepath, includeBasePath, comparePathsOptions)
 * 			}) {
 * 				basePaths = append(basePaths, includeBasePath)
 * 			}
 * 		}
 * 	}
 * 
 * 	return basePaths
 * }
 */
export function getBasePaths(path: string, includes: GoSlice<string>, useCaseSensitiveFileNames: bool): GoSlice<string> {
  const basePaths: string[] = [path];
  const includeList = includes ?? [];

  if (includeList.length > 0) {
    const comparePathsOptions: ComparePathsOptions = { CurrentDirectory: path, UseCaseSensitiveFileNames: useCaseSensitiveFileNames };
    const stringComparer = ComparePathsOptions_GetComparer(comparePathsOptions);

    const includeBasePaths: string[] = [];
    for (const include of includeList) {
      let absolute: string;
      if (IsRootedDiskPath(include)) {
        absolute = include;
      } else {
        absolute = NormalizePath(CombinePaths(path, include));
      }
      includeBasePaths.push(getIncludeBasePath(absolute));
    }

    SortStableFunc(includeBasePaths, stringComparer!);

    for (const includeBasePath of includeBasePaths) {
      if (Every(basePaths, (basepath: string) => !ContainsPath(basepath, includeBasePath, comparePathsOptions) as bool)) {
        basePaths.push(includeBasePath);
      }
    }
  }

  return basePaths;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::globPattern","kind":"type","status":"implemented","sigHash":"0bda93ac6e4caeff035e8678220d0bcaacf12fdfda6fa5d2076e72aeb16084d1"}
 *
 * Go source:
 * globPattern struct {
 * 	components    []component // path segments to match (e.g., ["src", "**", "*.ts"])
 * 	isExclude     bool        // exclude patterns have different matching rules
 * 	caseSensitive bool
 * 	excludeMinJs  bool // for "files" patterns, exclude .min.js by default
 * }
 */
export interface globPattern {
  components: GoSlice<component>;
  isExclude: bool;
  caseSensitive: bool;
  excludeMinJs: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::component","kind":"type","status":"implemented","sigHash":"392c7e997c826cb333a76b51c4343857364e2bde70ef0fcaf8cabc40e35002a1"}
 *
 * Go source:
 * component struct {
 * 	kind     componentKind
 * 	literal  string    // for kindLiteral: the exact string to match
 * 	segments []segment // for kindWildcard: parsed wildcard pattern
 * 	// Include patterns with wildcards skip common package folders (node_modules, etc.)
 * 	skipPackageFolders bool
 * }
 */
export interface component {
  kind: componentKind;
  literal: string;
  segments: GoSlice<segment>;
  skipPackageFolders: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::componentKind","kind":"type","status":"implemented","sigHash":"d24512119ee1c70f0a621c39e9b7f9569b8d5fc782f67e45c5f5bc11eaf33895"}
 *
 * Go source:
 * componentKind int
 */
export type componentKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::constGroup::kindLiteral+kindWildcard+kindDoubleAsterisk","kind":"constGroup","status":"implemented","sigHash":"794acdb49bbca051a122b7eb54832cb1fc30bf1b79e5a98c36f42878aa4f5dd6"}
 *
 * Go source:
 * const (
 * 	kindLiteral        componentKind = iota // exact match (e.g., "src")
 * 	kindWildcard                            // contains * or ? (e.g., "*.ts")
 * 	kindDoubleAsterisk                      // ** matches zero or more directories
 * )
 */
export const kindLiteral: componentKind = 0 as componentKind;
export const kindWildcard: componentKind = 1 as componentKind;
export const kindDoubleAsterisk: componentKind = 2 as componentKind;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::segment","kind":"type","status":"implemented","sigHash":"8a472c79aa6bb8c32a342a18cc17a538e7663999dfb211218ff6d3c349fbf622"}
 *
 * Go source:
 * segment struct {
 * 	kind    segmentKind
 * 	literal string // only for segLiteral
 * }
 */
export interface segment {
  kind: segmentKind;
  literal: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::segmentKind","kind":"type","status":"implemented","sigHash":"138b5917537a844639cfdad997d1d26a478082269b62b91fda21f7124d5d4b36"}
 *
 * Go source:
 * segmentKind int
 */
export type segmentKind = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::constGroup::segLiteral+segStar+segQuestion","kind":"constGroup","status":"implemented","sigHash":"2089f155ef73323e7455e8f6e5778d4ac6d6f56442817ec67ec29daa2f5dc6a2"}
 *
 * Go source:
 * const (
 * 	segLiteral  segmentKind = iota // exact text
 * 	segStar                        // * matches any chars except /
 * 	segQuestion                    // ? matches single char except /
 * )
 */
export const segLiteral: segmentKind = 0 as segmentKind;
export const segStar: segmentKind = 1 as segmentKind;
export const segQuestion: segmentKind = 2 as segmentKind;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::compileGlobPattern","kind":"func","status":"implemented","sigHash":"37d2964678a33802bc75750c9c69ac42ec36fff8cd2477ac69ab87b048846ff1"}
 *
 * Go source:
 * func compileGlobPattern(spec string, basePath string, usage Usage, caseSensitive bool) (globPattern, bool) {
 * 	parts := tspath.GetNormalizedPathComponents(spec, basePath)
 * 
 * 	// "src/**" without a filename matches nothing (for include patterns)
 * 	if usage != UsageExclude && core.LastOrNil(parts) == "**" {
 * 		return globPattern{}, false
 * 	}
 * 
 * 	// Normalize root: "/home/" -> "/home"
 * 	parts[0] = tspath.RemoveTrailingDirectorySeparator(parts[0])
 * 
 * 	// Directories implicitly match all files: "src" -> "src/** /*"
 * 	if IsImplicitGlob(core.LastOrNil(parts)) {
 * 		parts = append(parts, "**", "*")
 * 	}
 * 
 * 	p := globPattern{
 * 		isExclude:     usage == UsageExclude,
 * 		caseSensitive: caseSensitive,
 * 		excludeMinJs:  usage == UsageFiles,
 * 		// Avoid slice growth during compilation.
 * 		components: make([]component, 0, len(parts)),
 * 	}
 * 
 * 	for _, part := range parts {
 * 		p.components = append(p.components, parseComponent(part, usage != UsageExclude))
 * 	}
 * 	return p, true
 * }
 */
export function compileGlobPattern(spec: string, basePath: string, usage: Usage, caseSensitive: bool): [globPattern, bool] {
  let parts = GetNormalizedPathComponents(spec, basePath);

  // "src/**" without a filename matches nothing (for include patterns)
  if (usage !== UsageExclude && LastOrNil(parts, GoZeroString) === "**") {
    return [{ components: [], isExclude: false, caseSensitive: false, excludeMinJs: false }, false];
  }

  // Normalize root: "/home/" -> "/home"
  parts[0] = RemoveTrailingDirectorySeparator(parts[0]!);

  // Directories implicitly match all files: "src" -> "src/** /*"
  if (IsImplicitGlob(LastOrNil(parts, GoZeroString))) {
    parts = GoSliceAppendSlice(parts, GoSliceBuild(2, 2, GoStringValueOps, (__goSliceLiteral_3b10) => { GoSliceStore(__goSliceLiteral_3b10, 0, "**", GoStringValueOps); GoSliceStore(__goSliceLiteral_3b10, 1, "*", GoStringValueOps); }), GoStringValueOps);
  }

  const p: globPattern = {
    isExclude: usage === UsageExclude,
    caseSensitive: caseSensitive,
    excludeMinJs: usage === UsageFiles,
    components: [],
  };

  for (const part of parts) {
    p.components = GoAppend(p.components, parseComponent(part, usage !== UsageExclude));
  }
  return [p, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::parseComponent","kind":"func","status":"implemented","sigHash":"5df166f734cb1ff3a06b24d3bcea40983d2e0826e42be1e3b61c0d618782b975"}
 *
 * Go source:
 * func parseComponent(s string, isInclude bool) component {
 * 	if s == "**" {
 * 		return component{kind: kindDoubleAsterisk}
 * 	}
 * 	if !strings.ContainsAny(s, "*?") {
 * 		return component{kind: kindLiteral, literal: s}
 * 	}
 * 	return component{
 * 		kind:               kindWildcard,
 * 		segments:           parseSegments(s),
 * 		skipPackageFolders: isInclude,
 * 	}
 * }
 */
export function parseComponent(s: string, isInclude: bool): component {
  if (s === "**") {
    return { kind: kindDoubleAsterisk, literal: "", segments: [], skipPackageFolders: false };
  }
  if (!s.includes("*") && !s.includes("?")) {
    return { kind: kindLiteral, literal: s, segments: [], skipPackageFolders: false };
  }
  return {
    kind: kindWildcard,
    literal: "",
    segments: parseSegments(s),
    skipPackageFolders: isInclude,
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::parseSegments","kind":"func","status":"implemented","sigHash":"9964a3443cba889966a2d29872ba48467d95a615da1b80c65e1f2977233a4108"}
 *
 * Go source:
 * func parseSegments(s string) []segment {
 * 	// Preallocate based on wildcard count: each wildcard contributes 1 segment,
 * 	// and each wildcard can split literals into at most one extra literal segment.
 * 	wildcards := 0
 * 	for i := range len(s) {
 * 		if s[i] == '*' || s[i] == '?' {
 * 			wildcards++
 * 		}
 * 	}
 * 	result := make([]segment, 0, 2*wildcards+1)
 * 	start := 0
 * 	for i := range len(s) {
 * 		switch s[i] {
 * 		case '*', '?':
 * 			if i > start {
 * 				result = append(result, segment{kind: segLiteral, literal: s[start:i]})
 * 			}
 * 			if s[i] == '*' {
 * 				result = append(result, segment{kind: segStar})
 * 			} else {
 * 				result = append(result, segment{kind: segQuestion})
 * 			}
 * 			start = i + 1
 * 		}
 * 	}
 * 	if start < len(s) {
 * 		result = append(result, segment{kind: segLiteral, literal: s[start:]})
 * 	}
 * 	return result
 * }
 */
export function parseSegments(s: string): GoSlice<segment> {
  const result: segment[] = [];
  let start = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "*" || s[i] === "?") {
      if (i > start) {
        result.push({ kind: segLiteral, literal: s.slice(start, i) });
      }
      if (s[i] === "*") {
        result.push({ kind: segStar, literal: "" });
      } else {
        result.push({ kind: segQuestion, literal: "" });
      }
      start = i + 1;
    }
  }
  if (start < s.length) {
    result.push({ kind: segLiteral, literal: s.slice(start) });
  }
  return result;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.matches","kind":"method","status":"implemented","sigHash":"1048b7a5f70462ae104c9c442fbe232b202c0be24bf3c62211d7ea8aedc76940"}
 *
 * Go source:
 * func (p *globPattern) matches(path string) bool {
 * 	return p.matchPathParts(path, "", 0, 0, false)
 * }
 */
export function globPattern_matches(receiver: GoPtr<globPattern>, path: string): bool {
  return globPattern_matchPathParts(receiver, path, "", 0 as int, 0 as int, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.matchesParts","kind":"method","status":"implemented","sigHash":"d5c16a085aacb0f5237d9aac7bbb38f724c980423056aba1e20109a49a48ca06"}
 *
 * Go source:
 * func (p *globPattern) matchesParts(prefix, suffix string) bool {
 * 	return p.matchPathParts(prefix, suffix, 0, 0, false)
 * }
 */
export function globPattern_matchesParts(receiver: GoPtr<globPattern>, prefix: string, suffix: string): bool {
  return globPattern_matchPathParts(receiver, prefix, suffix, 0 as int, 0 as int, false as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.matchesPrefixParts","kind":"method","status":"implemented","sigHash":"7a9497127d92936002dfea999ac8858b04b6e87ab8cc26e71da3af796049a1a5"}
 *
 * Go source:
 * func (p *globPattern) matchesPrefixParts(prefix, suffix string) bool {
 * 	return p.matchPathParts(prefix, suffix, 0, 0, true)
 * }
 */
export function globPattern_matchesPrefixParts(receiver: GoPtr<globPattern>, prefix: string, suffix: string): bool {
  return globPattern_matchPathParts(receiver, prefix, suffix, 0 as int, 0 as int, true as bool);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.matchPathParts","kind":"method","status":"implemented","sigHash":"2eb7db4207d691bf1a18751d0a4fe65aeb23bdb89b90d9c0cfc6e19cda2fc27c"}
 *
 * Go source:
 * func (p *globPattern) matchPathParts(prefix, suffix string, pathOffset, compIdx int, prefixOnly bool) bool {
 * 	for {
 * 		pathPart, nextOffset, ok := nextPathPartParts(prefix, suffix, pathOffset)
 * 		if !ok {
 * 			if prefixOnly {
 * 				return true
 * 			}
 * 			return p.patternSatisfied(compIdx)
 * 		}
 * 
 * 		if compIdx >= len(p.components) {
 * 			return p.isExclude && !prefixOnly
 * 		}
 * 
 * 		comp := p.components[compIdx]
 * 		switch comp.kind {
 * 		case kindDoubleAsterisk:
 * 			if p.matchPathParts(prefix, suffix, pathOffset, compIdx+1, prefixOnly) {
 * 				return true
 * 			}
 * 			if !p.isExclude && (isHiddenPath(pathPart) || isPackageFolder(pathPart)) {
 * 				return false
 * 			}
 * 			pathOffset = nextOffset
 * 			continue
 * 		case kindLiteral:
 * 			if comp.skipPackageFolders && isPackageFolder(pathPart) {
 * 				panic("unreachable: literal components never have skipPackageFolders")
 * 			}
 * 			if !p.stringsEqual(comp.literal, pathPart) {
 * 				return false
 * 			}
 * 		case kindWildcard:
 * 			if comp.skipPackageFolders && isPackageFolder(pathPart) {
 * 				return false
 * 			}
 * 			if !p.matchWildcard(comp.segments, pathPart) {
 * 				return false
 * 			}
 * 		}
 * 
 * 		pathOffset = nextOffset
 * 		compIdx++
 * 	}
 * }
 */
export function globPattern_matchPathParts(receiver: GoPtr<globPattern>, prefix: string, suffix: string, pathOffset: int, compIdx: int, prefixOnly: bool): bool {
  let curPathOffset = pathOffset;
  let curCompIdx = compIdx;
  while (true) {
    const [pathPart, nextOffset, ok] = nextPathPartParts(prefix, suffix, curPathOffset);
    if (!ok) {
      if (prefixOnly) {
        return true;
      }
      return globPattern_patternSatisfied(receiver, curCompIdx);
    }

    if (curCompIdx >= receiver!.components.length) {
      return receiver!.isExclude && !prefixOnly;
    }

    const comp = receiver!.components[curCompIdx]!;
    if (comp.kind === kindDoubleAsterisk) {
      if (globPattern_matchPathParts(receiver, prefix, suffix, curPathOffset, curCompIdx + 1 as int, prefixOnly)) {
        return true;
      }
      if (!receiver!.isExclude && (isHiddenPath(pathPart) || isPackageFolder(pathPart))) {
        return false;
      }
      curPathOffset = nextOffset;
      // continue
    } else if (comp.kind === kindLiteral) {
      if (!globPattern_stringsEqual(receiver, comp.literal, pathPart)) {
        return false;
      }
      curPathOffset = nextOffset;
      curCompIdx = curCompIdx + 1 as int;
    } else {
      // kindWildcard
      if (comp.skipPackageFolders && isPackageFolder(pathPart)) {
        return false;
      }
      if (!globPattern_matchWildcard(receiver, comp.segments, pathPart)) {
        return false;
      }
      curPathOffset = nextOffset;
      curCompIdx = curCompIdx + 1 as int;
    }
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.patternSatisfied","kind":"method","status":"implemented","sigHash":"f74471cd24603a3562e9657da6482adce23c8377a7aa611fdc836fac6f18eb59"}
 *
 * Go source:
 * func (p *globPattern) patternSatisfied(compIdx int) bool {
 * 	// A pattern is satisfied when remaining components can match empty input.
 * 	// For both include and exclude patterns, only trailing "**" components may match nothing.
 * 	for _, c := range p.components[compIdx:] {
 * 		if c.kind != kindDoubleAsterisk {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function globPattern_patternSatisfied(receiver: GoPtr<globPattern>, compIdx: int): bool {
  for (const c of receiver!.components.slice(compIdx)) {
    if (c.kind !== kindDoubleAsterisk) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::nextPathPartSingle","kind":"func","status":"implemented","sigHash":"fc4f1f2b9fc3afa95ebbd4f91ba8d5270c2750a174f19b1d449887cae33befd4"}
 *
 * Go source:
 * func nextPathPartSingle(s string, offset int) (part string, nextOffset int, ok bool) {
 * 	if offset >= len(s) {
 * 		return "", offset, false
 * 	}
 * 	if offset == 0 && len(s) > 0 && s[0] == '/' {
 * 		return "", 1, true
 * 	}
 * 	for offset < len(s) && s[offset] == '/' {
 * 		offset++
 * 	}
 * 	if offset >= len(s) {
 * 		return "", offset, false
 * 	}
 * 	rest := s[offset:]
 * 	if idx := strings.IndexByte(rest, '/'); idx >= 0 {
 * 		return rest[:idx], offset + idx, true
 * 	}
 * 	return rest, len(s), true
 * }
 */
export function nextPathPartSingle(s: string, offset: int): [part: string, nextOffset: int, ok: bool] {
  let off = offset as number;
  if (off >= s.length) {
    return ["", off as int, false];
  }
  if (off === 0 && s.length > 0 && s[0] === "/") {
    return ["", 1 as int, true];
  }
  while (off < s.length && s[off] === "/") {
    off++;
  }
  if (off >= s.length) {
    return ["", off as int, false];
  }
  const rest = s.slice(off);
  const idx = rest.indexOf("/");
  if (idx >= 0) {
    return [rest.slice(0, idx), (off + idx) as int, true];
  }
  return [rest, s.length as int, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::nextPathPartParts","kind":"func","status":"implemented","sigHash":"73943580feb1e39ee4d91fe6233a98aa09c17f864c51c10143929d4a6078c99e"}
 *
 * Go source:
 * func nextPathPartParts(prefix, suffix string, offset int) (part string, nextOffset int, ok bool) {
 * 	// Fast paths: keep the hot single-string scan tight.
 * 	if len(suffix) == 0 {
 * 		return nextPathPartSingle(prefix, offset)
 * 	}
 * 	if len(prefix) == 0 {
 * 		return nextPathPartSingle(suffix, offset)
 * 	}
 * 
 * 	// For matchFilesNoRegex call sites, prefix is a directory path ending in '/',
 * 	// and suffix is a single entry name (no '/'). That makes this significantly
 * 	// simpler than a general-purpose "virtual concatenation" scanner.
 * 
 * 	totalLen := len(prefix) + len(suffix)
 * 	if offset >= totalLen {
 * 		return "", offset, false
 * 	}
 * 
 * 	// Handle leading slash (root of absolute path)
 * 	if offset == 0 && prefix[0] == '/' {
 * 		return "", 1, true
 * 	}
 * 
 * 	// Scan within prefix.
 * 	if offset < len(prefix) {
 * 		for offset < len(prefix) && prefix[offset] == '/' {
 * 			offset++
 * 		}
 * 		if offset < len(prefix) {
 * 			rest := prefix[offset:]
 * 			idx := strings.IndexByte(rest, '/')
 * 			// idx is guaranteed >= 0 for the call sites we care about because prefix ends in '/'.
 * 			return rest[:idx], offset + idx, true
 * 		}
 * 		// Fall through into suffix region.
 * 	}
 * 
 * 	// Scan suffix: it's a single component.
 * 	sOff := offset - len(prefix)
 * 	if sOff >= len(suffix) {
 * 		return "", offset, false
 * 	}
 * 	return suffix[sOff:], totalLen, true
 * }
 */
export function nextPathPartParts(prefix: string, suffix: string, offset: int): [part: string, nextOffset: int, ok: bool] {
  // Fast paths: keep the hot single-string scan tight.
  if (suffix.length === 0) {
    return nextPathPartSingle(prefix, offset);
  }
  if (prefix.length === 0) {
    return nextPathPartSingle(suffix, offset);
  }

  const totalLen = prefix.length + suffix.length;
  let off = offset as number;
  if (off >= totalLen) {
    return ["", off as int, false];
  }

  // Handle leading slash (root of absolute path)
  if (off === 0 && prefix[0] === "/") {
    return ["", 1 as int, true];
  }

  // Scan within prefix.
  if (off < prefix.length) {
    while (off < prefix.length && prefix[off] === "/") {
      off++;
    }
    if (off < prefix.length) {
      const rest = prefix.slice(off);
      const idx = rest.indexOf("/");
      // idx is guaranteed >= 0 for the call sites we care about because prefix ends in '/'.
      return [rest.slice(0, idx), (off + idx) as int, true];
    }
    // Fall through into suffix region.
  }

  // Scan suffix: it's a single component.
  const sOff = off - prefix.length;
  if (sOff >= suffix.length) {
    return ["", off as int, false];
  }
  return [suffix.slice(sOff), totalLen as int, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.matchWildcard","kind":"method","status":"implemented","sigHash":"2d27ac57e5ea405729e541daf9ba099a9e827e71b4732217d22e00b62a53755b"}
 *
 * Go source:
 * func (p *globPattern) matchWildcard(segs []segment, s string) bool {
 * 	// Include patterns: wildcards at start cannot match hidden files
 * 	if !p.isExclude && len(segs) > 0 && isHiddenPath(s) && (segs[0].kind == segStar || segs[0].kind == segQuestion) {
 * 		return false
 * 	}
 * 
 * 	// Fast path: single * followed by literal suffix (e.g., "*.ts")
 * 	if len(segs) == 2 && segs[0].kind == segStar && segs[1].kind == segLiteral {
 * 		suffix := segs[1].literal
 * 		if len(s) < len(suffix) || !p.stringsEqual(suffix, s[len(s)-len(suffix):]) {
 * 			return false
 * 		}
 * 		return p.shouldIncludeMinJs(s, segs)
 * 	}
 * 
 * 	return p.matchSegments(segs, s) && p.shouldIncludeMinJs(s, segs)
 * }
 */
export function globPattern_matchWildcard(receiver: GoPtr<globPattern>, segs: GoSlice<segment>, s: string): bool {
  // Include patterns: wildcards at start cannot match hidden files
  if (!receiver!.isExclude && segs.length > 0 && isHiddenPath(s) && (segs[0]!.kind === segStar || segs[0]!.kind === segQuestion)) {
    return false;
  }

  // Fast path: single * followed by literal suffix (e.g., "*.ts")
  if (segs.length === 2 && segs[0]!.kind === segStar && segs[1]!.kind === segLiteral) {
    const sfx = segs[1]!.literal;
    if (s.length < sfx.length || !globPattern_stringsEqual(receiver, sfx, s.slice(s.length - sfx.length))) {
      return false;
    }
    return globPattern_shouldIncludeMinJs(receiver, s, segs);
  }

  return globPattern_matchSegments(receiver, segs, s) && globPattern_shouldIncludeMinJs(receiver, s, segs);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.matchSegments","kind":"method","status":"implemented","sigHash":"e60d9a63e6c6aa71a3fc2702747eb85e826a2d283f5fb52eaece9ffab4f6a8d8"}
 *
 * Go source:
 * func (p *globPattern) matchSegments(segs []segment, s string) bool {
 * 	segIdx, sIdx := 0, 0
 * 	starSegIdx, starSIdx := -1, 0
 * 
 * 	for sIdx < len(s) {
 * 		if segIdx < len(segs) {
 * 			seg := segs[segIdx]
 * 			switch seg.kind {
 * 			case segLiteral:
 * 				end := sIdx + len(seg.literal)
 * 				if end <= len(s) && p.stringsEqual(seg.literal, s[sIdx:end]) {
 * 					sIdx = end
 * 					segIdx++
 * 					continue
 * 				}
 * 			case segQuestion:
 * 				if s[sIdx] != '/' {
 * 					_, size := utf8.DecodeRuneInString(s[sIdx:])
 * 					sIdx += size
 * 					segIdx++
 * 					continue
 * 				}
 * 			case segStar:
 * 				// Record star position for backtracking, then try matching zero chars.
 * 				starSegIdx = segIdx
 * 				starSIdx = sIdx
 * 				segIdx++
 * 				continue
 * 			}
 * 		}
 * 
 * 		// Current segment didn't match. Backtrack to last star if possible.
 * 		if starSegIdx >= 0 && starSIdx < len(s) && s[starSIdx] != '/' {
 * 			// Star consumes one more character (rune), retry from segment after star.
 * 			_, size := utf8.DecodeRuneInString(s[starSIdx:])
 * 			starSIdx += size
 * 			sIdx = starSIdx
 * 			segIdx = starSegIdx + 1
 * 			continue
 * 		}
 * 
 * 		return false
 * 	}
 * 
 * 	// Consume any trailing stars.
 * 	for segIdx < len(segs) && segs[segIdx].kind == segStar {
 * 		segIdx++
 * 	}
 * 	return segIdx >= len(segs)
 * }
 */
export function globPattern_matchSegments(receiver: GoPtr<globPattern>, segs: GoSlice<segment>, s: string): bool {
  let segIdx = 0;
  let sIdx = 0;
  let starSegIdx = -1;
  let starSIdx = 0;

  while (sIdx < s.length) {
    if (segIdx < segs.length) {
      const seg = segs[segIdx]!;
      if (seg.kind === segLiteral) {
        const end = sIdx + seg.literal.length;
        if (end <= s.length && globPattern_stringsEqual(receiver, seg.literal, s.slice(sIdx, end))) {
          sIdx = end;
          segIdx++;
          continue;
        }
      } else if (seg.kind === segQuestion) {
        if (s[sIdx] !== "/") {
          // utf8.DecodeRuneInString: advance by one unicode code point
          const cp = s.codePointAt(sIdx)!;
          const size = cp > 0xffff ? 2 : 1;
          sIdx += size;
          segIdx++;
          continue;
        }
      } else {
        // segStar: record star position for backtracking, try matching zero chars
        starSegIdx = segIdx;
        starSIdx = sIdx;
        segIdx++;
        continue;
      }
    }

    // Current segment didn't match. Backtrack to last star if possible.
    if (starSegIdx >= 0 && starSIdx < s.length && s[starSIdx] !== "/") {
      // Star consumes one more character (rune), retry from segment after star.
      const cp = s.codePointAt(starSIdx)!;
      const size = cp > 0xffff ? 2 : 1;
      starSIdx += size;
      sIdx = starSIdx;
      segIdx = starSegIdx + 1;
      continue;
    }

    return false;
  }

  // Consume any trailing stars.
  while (segIdx < segs.length && segs[segIdx]!.kind === segStar) {
    segIdx++;
  }
  return segIdx >= segs.length;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.shouldIncludeMinJs","kind":"method","status":"implemented","sigHash":"1483e3bca64f4fc7597d01cae97a7e363454b834eccdb14c77c6c5bf9b6478c6"}
 *
 * Go source:
 * func (p *globPattern) shouldIncludeMinJs(filename string, segs []segment) bool {
 * 	if !p.excludeMinJs {
 * 		return true
 * 	}
 * 
 * 	// Preserve legacy behavior:
 * 	// - When matching is case-sensitive, only the exact ".min.js" suffix is excluded by default.
 * 	// - When matching is case-insensitive, any casing variant is excluded by default.
 * 	if !p.hasMinJsSuffix(filename) {
 * 		return true
 * 	}
 * 	// Allow when the user's pattern explicitly references the .min. suffix.
 * 	if p.patternMentionsMinSuffix(segs) {
 * 		return true
 * 	}
 * 	return false
 * }
 */
export function globPattern_shouldIncludeMinJs(receiver: GoPtr<globPattern>, filename: string, segs: GoSlice<segment>): bool {
  if (!receiver!.excludeMinJs) {
    return true;
  }
  if (!globPattern_hasMinJsSuffix(receiver, filename)) {
    return true;
  }
  // Allow when the user's pattern explicitly references the .min. suffix.
  if (globPattern_patternMentionsMinSuffix(receiver, segs)) {
    return true;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.hasMinJsSuffix","kind":"method","status":"implemented","sigHash":"7249efc0bd57d472b1ae95fd1ff0e5552008414fb0f5e0aca550a9b253e49f22"}
 *
 * Go source:
 * func (p *globPattern) hasMinJsSuffix(filename string) bool {
 * 	if p.caseSensitive {
 * 		return strings.HasSuffix(filename, ".min.js")
 * 	}
 * 	const minJs = ".min.js"
 * 	if len(filename) < len(minJs) {
 * 		return false
 * 	}
 * 	// Avoid allocating via strings.ToLower; compare suffix case-insensitively.
 * 	return strings.EqualFold(filename[len(filename)-len(minJs):], minJs)
 * }
 */
export function globPattern_hasMinJsSuffix(receiver: GoPtr<globPattern>, filename: string): bool {
  const minJs = ".min.js";
  if (receiver!.caseSensitive) {
    return filename.endsWith(minJs) as bool;
  }
  if (filename.length < minJs.length) {
    return false;
  }
  // case-insensitive suffix comparison
  return (filename.slice(filename.length - minJs.length).toLowerCase() === minJs) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.patternMentionsMinSuffix","kind":"method","status":"implemented","sigHash":"90b5d254a5e437042f85bcc978995bd102f79551a19b0c2b3242120a85294673"}
 *
 * Go source:
 * func (p *globPattern) patternMentionsMinSuffix(segs []segment) bool {
 * 	for _, seg := range segs {
 * 		if seg.kind != segLiteral {
 * 			continue
 * 		}
 * 		lit := seg.literal
 * 		if !p.caseSensitive {
 * 			lit = strings.ToLower(lit)
 * 		}
 * 		if strings.Contains(lit, ".min.js") || strings.Contains(lit, ".min.") {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function globPattern_patternMentionsMinSuffix(receiver: GoPtr<globPattern>, segs: GoSlice<segment>): bool {
  for (const seg of segs) {
    if (seg.kind !== segLiteral) {
      continue;
    }
    let lit = seg.literal;
    if (!receiver!.caseSensitive) {
      lit = lit.toLowerCase();
    }
    if (lit.includes(".min.js") || lit.includes(".min.")) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globPattern.stringsEqual","kind":"method","status":"implemented","sigHash":"e9fc7f90d8f67bcbd5e2fde7b4c39f9f072bc47c4602ccc2ef1e719bd5f5dc50"}
 *
 * Go source:
 * func (p *globPattern) stringsEqual(a, b string) bool {
 * 	if p.caseSensitive {
 * 		return a == b
 * 	}
 * 	return strings.EqualFold(a, b)
 * }
 */
export function globPattern_stringsEqual(receiver: GoPtr<globPattern>, a: string, b: string): bool {
  if (receiver!.caseSensitive) {
    return (a === b) as bool;
  }
  return (a.toLowerCase() === b.toLowerCase()) as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::isHiddenPath","kind":"func","status":"implemented","sigHash":"1e528df54d49b36ecb01a8d431e92181db0649345c6d94f3630c0e387c9f0f5a"}
 *
 * Go source:
 * func isHiddenPath(name string) bool {
 * 	return len(name) > 0 && name[0] == '.'
 * }
 */
export function isHiddenPath(name: string): bool {
  return (name.length > 0 && name[0] === ".") as bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::isPackageFolder","kind":"func","status":"implemented","sigHash":"58d0055d14b63662a0a67495314b83cf1976ecb52400dc55c2456bc8f1e599d0"}
 *
 * Go source:
 * func isPackageFolder(name string) bool {
 * 	switch len(name) {
 * 	case len("node_modules"):
 * 		return strings.EqualFold(name, "node_modules")
 * 	case len("jspm_packages"):
 * 		return strings.EqualFold(name, "jspm_packages")
 * 	case len("bower_components"):
 * 		return strings.EqualFold(name, "bower_components")
 * 	}
 * 	return false
 * }
 */
export function isPackageFolder(name: string): bool {
  switch (name.length) {
    case "node_modules".length:
      return (name.toLowerCase() === "node_modules") as bool;
    case "jspm_packages".length:
      return (name.toLowerCase() === "jspm_packages") as bool;
    case "bower_components".length:
      return (name.toLowerCase() === "bower_components") as bool;
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::ensureTrailingSlash","kind":"func","status":"implemented","sigHash":"d765a88e09ac1b8b43ec682681714ee1448f58ff5ebf848ab86099accf287c0f"}
 *
 * Go source:
 * func ensureTrailingSlash(s string) string {
 * 	if len(s) > 0 && s[len(s)-1] != '/' {
 * 		return s + "/"
 * 	}
 * 	return s
 * }
 */
export function ensureTrailingSlash(s: string): string {
  if (s.length > 0 && s[s.length - 1] !== "/") {
    return s + "/";
  }
  return s;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::globMatcher","kind":"type","status":"implemented","sigHash":"ddc9beca7f5d81a410fb9117f7f9a5cefd9f944a72e0bbe4c4eadc3feee1b045"}
 *
 * Go source:
 * globMatcher struct {
 * 	includes    []globPattern
 * 	excludes    []globPattern
 * 	hadIncludes bool // true if include specs were provided (even if none compiled)
 * }
 */
export interface globMatcher {
  includes: GoSlice<globPattern>;
  excludes: GoSlice<globPattern>;
  hadIncludes: bool;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::newGlobMatcher","kind":"func","status":"implemented","sigHash":"00dce2ed78e83667a0cfbf819df8ed59a3868b43b0b8b4d158720574825a955c"}
 *
 * Go source:
 * func newGlobMatcher(includeSpecs, excludeSpecs []string, basePath string, caseSensitive bool, usage Usage) *globMatcher {
 * 	m := &globMatcher{
 * 		hadIncludes: len(includeSpecs) > 0,
 * 		includes:    make([]globPattern, 0, len(includeSpecs)),
 * 		excludes:    make([]globPattern, 0, len(excludeSpecs)),
 * 	}
 * 
 * 	for _, spec := range includeSpecs {
 * 		if p, ok := compileGlobPattern(spec, basePath, usage, caseSensitive); ok {
 * 			m.includes = append(m.includes, p)
 * 		}
 * 	}
 * 	for _, spec := range excludeSpecs {
 * 		if p, ok := compileGlobPattern(spec, basePath, UsageExclude, caseSensitive); ok {
 * 			m.excludes = append(m.excludes, p)
 * 		}
 * 	}
 * 	return m
 * }
 */
export function newGlobMatcher(includeSpecs: GoSlice<string>, excludeSpecs: GoSlice<string>, basePath: string, caseSensitive: bool, usage: Usage): GoPtr<globMatcher> {
  const includeList = includeSpecs ?? [];
  const excludeList = excludeSpecs ?? [];
  const m: globMatcher = {
    hadIncludes: includeList.length > 0,
    includes: [],
    excludes: [],
  };

  for (const spec of includeList) {
    const [p, ok] = compileGlobPattern(spec, basePath, usage, caseSensitive);
    if (ok) {
      m.includes = GoAppend(m.includes, p);
    }
  }
  for (const spec of excludeList) {
    const [p, ok] = compileGlobPattern(spec, basePath, UsageExclude, caseSensitive);
    if (ok) {
      m.excludes = GoAppend(m.excludes, p);
    }
  }
  return m;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globMatcher.matchesFileParts","kind":"method","status":"implemented","sigHash":"a5ef277c48756da6c46cd301937e0f23e2c033aa0d1e0b62e4699c4c0a621dc8"}
 *
 * Go source:
 * func (m *globMatcher) matchesFileParts(prefix, suffix string) (int, bool) {
 * 	for i := range m.excludes {
 * 		if m.excludes[i].matchesParts(prefix, suffix) {
 * 			return 0, false
 * 		}
 * 	}
 * 	if len(m.includes) == 0 {
 * 		if m.hadIncludes {
 * 			return 0, false
 * 		}
 * 		return 0, true
 * 	}
 * 	for i := range m.includes {
 * 		if m.includes[i].matchesParts(prefix, suffix) {
 * 			return i, true
 * 		}
 * 	}
 * 	return 0, false
 * }
 */
export function globMatcher_matchesFileParts(receiver: GoPtr<globMatcher>, prefix: string, suffix: string): [int, bool] {
  for (let i = 0; i < receiver!.excludes.length; i++) {
    if (globPattern_matchesParts(receiver!.excludes[i], prefix, suffix)) {
      return [0 as int, false];
    }
  }
  if (receiver!.includes.length === 0) {
    if (receiver!.hadIncludes) {
      return [0 as int, false];
    }
    return [0 as int, true];
  }
  for (let i = 0; i < receiver!.includes.length; i++) {
    if (globPattern_matchesParts(receiver!.includes[i], prefix, suffix)) {
      return [i as int, true];
    }
  }
  return [0 as int, false];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globMatcher.matchesDirectoryParts","kind":"method","status":"implemented","sigHash":"598abc6865903a8c39c734730e64f289cb19af6e3ba13c241fc6c5e6c3bb587d"}
 *
 * Go source:
 * func (m *globMatcher) matchesDirectoryParts(prefix, suffix string) bool {
 * 	for i := range m.excludes {
 * 		if m.excludes[i].matchesParts(prefix, suffix) {
 * 			return false
 * 		}
 * 	}
 * 	if len(m.includes) == 0 {
 * 		return !m.hadIncludes
 * 	}
 * 	for i := range m.includes {
 * 		if m.includes[i].matchesPrefixParts(prefix, suffix) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function globMatcher_matchesDirectoryParts(receiver: GoPtr<globMatcher>, prefix: string, suffix: string): bool {
  for (let i = 0; i < receiver!.excludes.length; i++) {
    if (globPattern_matchesParts(receiver!.excludes[i], prefix, suffix)) {
      return false;
    }
  }
  if (receiver!.includes.length === 0) {
    return !receiver!.hadIncludes as bool;
  }
  for (let i = 0; i < receiver!.includes.length; i++) {
    if (globPattern_matchesPrefixParts(receiver!.includes[i], prefix, suffix)) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::globVisitor","kind":"type","status":"implemented","sigHash":"83b834331519256a5881e74c55ffabd7cb21e9b4f7d846c37c07fdf9e16a5b75"}
 *
 * Go source:
 * globVisitor struct {
 * 	host                      vfs.FS
 * 	fileMatcher               *globMatcher
 * 	directoryMatcher          *globMatcher
 * 	extensions                []string
 * 	useCaseSensitiveFileNames bool
 * 	visited                   collections.Set[string]
 * 	results                   [][]string
 * }
 */
export interface globVisitor {
  host: GoInterface<FS>;
  fileMatcher: GoPtr<globMatcher>;
  directoryMatcher: GoPtr<globMatcher>;
  extensions: GoSlice<string>;
  useCaseSensitiveFileNames: bool;
  visited: Set<string>;
  results: GoSlice<GoSlice<string>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::globVisitor.visit","kind":"method","status":"implemented","sigHash":"eb8db61c7218a31fe21bd2aef0ed74ea7c916738d3b35d0e818b71c43b499edb"}
 *
 * Go source:
 * // visit walks a directory tree, collecting files that match the glob patterns.
 * // resolvedRealPath, when non-empty, is the already-resolved real path for this
 * // directory (computed incrementally from the parent). When empty, Realpath is
 * // called to resolve symlinks.
 * func (v *globVisitor) visit(path, absolutePath string, depth int, resolvedRealPath string) {
 * 	// Detect symlink cycles
 * 	var realPath string
 * 	if resolvedRealPath != "" {
 * 		realPath = resolvedRealPath
 * 	} else {
 * 		realPath = v.host.Realpath(absolutePath)
 * 	}
 * 	canonicalPath := tspath.GetCanonicalFileName(realPath, v.useCaseSensitiveFileNames)
 * 	if v.visited.Has(canonicalPath) {
 * 		return
 * 	}
 * 	v.visited.Add(canonicalPath)
 *
 * 	entries := v.host.GetAccessibleEntries(absolutePath)
 *
 * 	pathPrefix := ensureTrailingSlash(path)
 * 	absPrefix := ensureTrailingSlash(absolutePath)
 *
 * 	for _, file := range entries.Files {
 * 		if len(v.extensions) > 0 && !tspath.FileExtensionIsOneOf(file, v.extensions) {
 * 			continue
 * 		}
 * 		if idx, ok := v.fileMatcher.matchesFileParts(absPrefix, file); ok {
 * 			v.results[idx] = append(v.results[idx], pathPrefix+file)
 * 		}
 * 	}
 *
 * 	if depth != UnlimitedDepth {
 * 		depth--
 * 		if depth == 0 {
 * 			return
 * 		}
 * 	}
 *
 * 	for _, dir := range entries.Directories {
 * 		if !v.directoryMatcher.matchesDirectoryParts(absPrefix, dir) {
 * 			continue
 * 		}
 * 		absDir := absPrefix + dir
 * 		var childRealPath string
 * 		if entries.Symlinks != nil {
 * 			if _, isSymlink := entries.Symlinks[dir]; !isSymlink {
 * 				// Non-symlink directory: compute realpath incrementally.
 * 				childRealPath = tspath.CombinePaths(realPath, dir)
 * 			}
 * 			// else: symlink directory; leave childRealPath empty to force Realpath call.
 * 		}
 * 		// If Symlinks is nil, the FS doesn't track symlinks;
 * 		// leave childRealPath empty to call Realpath (preserving old behavior).
 * 		v.visit(pathPrefix+dir, absDir, depth, childRealPath)
 * 	}
 * }
 */
export function globVisitor_visit(receiver: GoPtr<globVisitor>, path: string, absolutePath: string, depth: int, resolvedRealPath: string): void {
  // Detect symlink cycles
  let realPath: string;
  if (resolvedRealPath !== "") {
    realPath = resolvedRealPath;
  } else {
    realPath = receiver!.host!.Realpath(absolutePath);
  }
  const canonicalPath = GetCanonicalFileName(realPath, receiver!.useCaseSensitiveFileNames);
  if (Set_Has(receiver!.visited, canonicalPath)) {
    return;
  }
  Set_Add(receiver!.visited, canonicalPath, GoStringKey);

  const entries = receiver!.host!.GetAccessibleEntries(absolutePath);

  const pathPrefix = ensureTrailingSlash(path);
  const absPrefix = ensureTrailingSlash(absolutePath);

  for (const file of entries.Files) {
    if ((receiver!.extensions?.length ?? 0) > 0 && !FileExtensionIsOneOf(file, receiver!.extensions)) {
      continue;
    }
    const [idx, ok] = globMatcher_matchesFileParts(receiver!.fileMatcher, absPrefix, file);
    if (ok) {
      receiver!.results[idx] = GoSliceAppend(receiver!.results[idx]!, pathPrefix + file, GoStringValueOps);
    }
  }

  let curDepth = depth as number;
  if (curDepth !== (UnlimitedDepth as number)) {
    curDepth--;
    if (curDepth === 0) {
      return;
    }
  }

  for (const dir of entries.Directories) {
    if (!globMatcher_matchesDirectoryParts(receiver!.directoryMatcher, absPrefix, dir)) {
      continue;
    }
    const absDir = absPrefix + dir;
    let childRealPath = "";
    if (!GoMapIsNil(entries.Symlinks)) {
      if (!entries.Symlinks.has(dir)) {
        // Non-symlink directory: compute realpath incrementally.
        childRealPath = CombinePaths(realPath, dir);
      }
      // else: symlink directory; leave childRealPath empty to force Realpath call.
    }
    // If Symlinks is nil, the FS doesn't track symlinks;
    // leave childRealPath empty to call Realpath (preserving old behavior).
    globVisitor_visit(receiver, pathPrefix + dir, absDir, curDepth as int, childRealPath);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::matchFiles","kind":"func","status":"implemented","sigHash":"d49c8a50798469b5926e6428bff9230615efa440d458dc3a93315cae332efe5f"}
 *
 * Go source:
 * func matchFiles(path string, extensions, excludes, includes []string, useCaseSensitiveFileNames bool, currentDirectory string, depth int, host vfs.FS) []string {
 * 	path = tspath.NormalizePath(path)
 * 	currentDirectory = tspath.NormalizePath(currentDirectory)
 * 	absolutePath := tspath.CombinePaths(currentDirectory, path)
 * 
 * 	fileMatcher := newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageFiles)
 * 	directoryMatcher := newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageDirectories)
 * 
 * 	v := globVisitor{
 * 		host:                      host,
 * 		fileMatcher:               fileMatcher,
 * 		directoryMatcher:          directoryMatcher,
 * 		extensions:                extensions,
 * 		useCaseSensitiveFileNames: useCaseSensitiveFileNames,
 * 		results:                   make([][]string, max(len(fileMatcher.includes), 1)),
 * 	}
 * 
 * 	for _, basePath := range getBasePaths(path, includes, useCaseSensitiveFileNames) {
 * 		v.visit(basePath, tspath.CombinePaths(currentDirectory, basePath), depth, "")
 * 	}
 * 
 * 	// Fast path: a single include bucket (or no includes) doesn't need flattening.
 * 	if len(v.results) == 1 {
 * 		return v.results[0]
 * 	}
 * 	return core.Flatten(v.results)
 * }
 */
export function matchFiles(path: string, extensions: GoSlice<string>, excludes: GoSlice<string>, includes: GoSlice<string>, useCaseSensitiveFileNames: bool, currentDirectory: string, depth: int, host: GoInterface<FS>): GoSlice<string> {
  const normalizedPath = NormalizePath(path);
  const normalizedCurrentDir = NormalizePath(currentDirectory);
  const absolutePath = CombinePaths(normalizedCurrentDir, normalizedPath);
  const extensionList = extensions ?? [];

  const fileMatcher = newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageFiles);
  const directoryMatcher = newGlobMatcher(includes, excludes, absolutePath, useCaseSensitiveFileNames, UsageDirectories);

  const resultsLen = Math.max(fileMatcher!.includes.length, 1);
  const results: string[][] = [];
  for (let i = 0; i < resultsLen; i++) {
    results.push([]);
  }

  const v: globVisitor = {
    host: host,
    fileMatcher: fileMatcher,
    directoryMatcher: directoryMatcher,
    extensions: extensionList,
    useCaseSensitiveFileNames: useCaseSensitiveFileNames,
    visited: NewSetWithSizeHint<string>(0 as int, GoStringKey)!,
    results: results,
  };

  for (const basePath of getBasePaths(normalizedPath, includes, useCaseSensitiveFileNames)) {
    globVisitor_visit(v, basePath, CombinePaths(normalizedCurrentDir, basePath), depth, "");
  }

  // Fast path: a single include bucket (or no includes) doesn't need flattening.
  if (v.results.length === 1) {
    return v.results[0]!;
  }
  return Flatten(v.results);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::type::SpecMatcher","kind":"type","status":"implemented","sigHash":"3f47c690592ccf63c71407d3509460a38e69aa7f7260d365e10dd3a414b43147"}
 *
 * Go source:
 * SpecMatcher struct {
 * 	patterns []globPattern
 * }
 */
export interface SpecMatcher {
  patterns: GoSlice<globPattern>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::SpecMatcher.MatchString","kind":"method","status":"implemented","sigHash":"d8cbf6efb0c2d465018d7045ef49f14aee53dd9337a5487b12874e7431a39a4a"}
 *
 * Go source:
 * func (m *SpecMatcher) MatchString(path string) bool {
 * 	for i := range m.patterns {
 * 		if m.patterns[i].matches(path) {
 * 			return true
 * 		}
 * 	}
 * 	return false
 * }
 */
export function SpecMatcher_MatchString(receiver: GoPtr<SpecMatcher>, path: string): bool {
  for (let i = 0; i < receiver!.patterns.length; i++) {
    if (globPattern_matches(receiver!.patterns[i], path)) {
      return true;
    }
  }
  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::method::SpecMatcher.MatchIndex","kind":"method","status":"implemented","sigHash":"0d1840d3dd402db2d6ecc059fef3ed5d86296e45a07000a16a1495d8cc9ad115"}
 *
 * Go source:
 * func (m *SpecMatcher) MatchIndex(path string) int {
 * 	for i := range m.patterns {
 * 		if m.patterns[i].matches(path) {
 * 			return i
 * 		}
 * 	}
 * 	return -1
 * }
 */
export function SpecMatcher_MatchIndex(receiver: GoPtr<SpecMatcher>, path: string): int {
  for (let i = 0; i < receiver!.patterns.length; i++) {
    if (globPattern_matches(receiver!.patterns[i], path)) {
      return i as int;
    }
  }
  return -1 as int;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/vfs/vfsmatch/vfsmatch.go::func::NewSpecMatcher","kind":"func","status":"implemented","sigHash":"f0eb715ef33e1642ab9d2bb15a73c42d8b115b4366194894705900b2a9bbc8d5"}
 *
 * Go source:
 * func NewSpecMatcher(specs []string, basePath string, usage Usage, useCaseSensitiveFileNames bool) *SpecMatcher {
 * 	if len(specs) == 0 {
 * 		return nil
 * 	}
 * 	patterns := make([]globPattern, 0, len(specs))
 * 	for _, spec := range specs {
 * 		if p, ok := compileGlobPattern(spec, basePath, usage, useCaseSensitiveFileNames); ok {
 * 			patterns = append(patterns, p)
 * 		}
 * 	}
 * 	if len(patterns) == 0 {
 * 		return nil
 * 	}
 * 	return &SpecMatcher{patterns: patterns}
 * }
 */
export function NewSpecMatcher(specs: GoSlice<string>, basePath: string, usage: Usage, useCaseSensitiveFileNames: bool): GoPtr<SpecMatcher> {
  if (specs.length === 0) {
    return undefined;
  }
  const patterns: globPattern[] = [];
  for (const spec of specs) {
    const [p, ok] = compileGlobPattern(spec, basePath, usage, useCaseSensitiveFileNames);
    if (ok) {
      patterns.push(p);
    }
  }
  if (patterns.length === 0) {
    return undefined;
  }
  return { patterns: patterns };
}
