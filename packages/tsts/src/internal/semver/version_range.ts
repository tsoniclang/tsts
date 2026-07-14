import type { bool, byte, int, uint } from "../../go/scalars.js";
import type { GoPtr, GoSlice } from "../../go/compat.js";
import { GoSliceAppend, GoSliceValueOps } from "../../go/compat.js";
import { GoAppend, GoAppendSlice, GoNilSlice, GoSliceIsNil } from "../../go/compat.js";
import { Builder } from "../../go/strings.js";
import * as regexp from "../../go/regexp.js";
import * as strings from "../../go/strings.js";
import type { Version } from "./version.js";
import {
  Version_Compare,
  Version_String,
  Version_incrementMajor,
  Version_incrementMinor,
  Version_incrementPatch,
  getUintComponent,
  versionZero,
} from "./version.js";
import { GoSliceBuild, GoSliceStore, GoStringValueOps } from "../../go/compat.js";
import { GoSliceLoad } from "../../go/compat.js";



/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::varGroup::logicalOrRegExp+whitespaceRegExp","kind":"varGroup","status":"implemented","sigHash":"a22c76dc1e292b21f32ef0a7afa0ef0b6006367c61d8d203bd60341b756ecb97"}
 *
 * Go source:
 * var (
 * 	logicalOrRegExp  = regexp.MustCompile(`\|\|`)
 * 	whitespaceRegExp = regexp.MustCompile(`\s+`)
 * )
 */
export let logicalOrRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(`\\|\\|`);
export let whitespaceRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(`\\s+`);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::varGroup::partialRegExp","kind":"varGroup","status":"implemented","sigHash":"9a13ca7cf927f23e60719543a3b484439e4bda3ea7f453621378355f271a5941"}
 *
 * Go source:
 * var partialRegExp = regexp.MustCompile(`(?i)^([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:\.([x*0]|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$`)
 */
export let partialRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^([x*0]|[1-9]\\d*)(?:\\.([x*0]|[1-9]\\d*)(?:\\.([x*0]|[1-9]\\d*)(?:-([a-z0-9-.]+))?(?:\\+([a-z0-9-.]+))?)?)?$`,
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::varGroup::hyphenRegExp","kind":"varGroup","status":"implemented","sigHash":"985943ccf6fb2cb3b22d8066dd7274ecc96baad10df3fe72253aeef87aff6e89"}
 *
 * Go source:
 * var hyphenRegExp = regexp.MustCompile(`(?i)^\s*([a-z0-9-+.*]+)\s+-\s+([a-z0-9-+.*]+)\s*$`)
 */
export let hyphenRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^\\s*([a-z0-9-+.*]+)\\s+-\\s+([a-z0-9-+.*]+)\\s*$`,
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::varGroup::rangeRegExp","kind":"varGroup","status":"implemented","sigHash":"b04dca52066b815ce3a43e9ac5765b9436c818bc816d64179b7acb1f3dc01927"}
 *
 * Go source:
 * var rangeRegExp = regexp.MustCompile(`(?i)^([~^<>=]|<=|>=)?\s*([a-z0-9-+.*]+)$`)
 */
export let rangeRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^([~^<>=]|<=|>=)?\\s*([a-z0-9-+.*]+)$`,
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::type::VersionRange","kind":"type","status":"implemented","sigHash":"eaf86841360cd4c02aaa41e0e2b3b73879512b9808c17ccb27c24d538b5a2183"}
 *
 * Go source:
 * VersionRange struct {
 * 	alternatives [][]versionComparator
 * }
 */
export interface VersionRange {
  alternatives: GoSlice<GoSlice<versionComparator>>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::type::versionComparator","kind":"type","status":"implemented","sigHash":"c137885dda5f73079828f0cb333c11bd80ce3e793acf45af264b9eb0d076b4c1"}
 *
 * Go source:
 * versionComparator struct {
 * 	operator comparatorOperator
 * 	operand  Version
 * }
 */
export interface versionComparator {
  operator: comparatorOperator;
  operand: Version;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::type::comparatorOperator","kind":"type","status":"implemented","sigHash":"c399bc7c4ccd344b6fa568133ae3fcd68b45ba10fdd767b6262ed123195a70de"}
 *
 * Go source:
 * comparatorOperator string
 */
export type comparatorOperator = string;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::constGroup::rangeLessThan+rangeLessThanEqual+rangeEqual+rangeGreaterThanEqual+rangeGreaterThan","kind":"constGroup","status":"implemented","sigHash":"cf343357308ec29bf7d56a6836185a72da21617d439313b99548ccd956a6cfed"}
 *
 * Go source:
 * const (
 * 	rangeLessThan         comparatorOperator = "<"
 * 	rangeLessThanEqual    comparatorOperator = "<="
 * 	rangeEqual            comparatorOperator = "="
 * 	rangeGreaterThanEqual comparatorOperator = ">="
 * 	rangeGreaterThan      comparatorOperator = ">"
 * )
 */
export const rangeLessThan: comparatorOperator = "<";
export const rangeLessThanEqual: comparatorOperator = "<=";
export const rangeEqual: comparatorOperator = "=";
export const rangeGreaterThanEqual: comparatorOperator = ">=";
export const rangeGreaterThan: comparatorOperator = ">";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::method::VersionRange.String","kind":"method","status":"implemented","sigHash":"1ab7ad7850543ac741f22bb145a02b17e3e57a06d793110047096cfdd2a39391"}
 *
 * Go source:
 * func (v *VersionRange) String() string {
 * 	var sb strings.Builder
 * 	formatDisjunction(&sb, v.alternatives)
 * 	return sb.String()
 * }
 */
export function VersionRange_String(receiver: GoPtr<VersionRange>): string {
  const v: VersionRange = receiver!;
  const sb: Builder = new Builder();
  formatDisjunction(sb, v.alternatives);
  return sb.String();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::formatDisjunction","kind":"func","status":"implemented","sigHash":"6dc0a55e5fdf6108908ed83a1448e4a80a133d1f5f5b81b39a8857e47dcb4905"}
 *
 * Go source:
 * func formatDisjunction(sb *strings.Builder, alternatives [][]versionComparator) {
 * 	origLen := sb.Len()
 * 
 * 	for i, alternative := range alternatives {
 * 		if i > 0 {
 * 			sb.WriteString(" || ")
 * 		}
 * 		formatAlternative(sb, alternative)
 * 	}
 * 
 * 	if sb.Len() == origLen {
 * 		sb.WriteString("*")
 * 	}
 * }
 */
export function formatDisjunction(sb: GoPtr<Builder>, alternatives: GoSlice<GoSlice<versionComparator>>): void {
  const b: Builder = sb!;
  const origLen: int = b.Len();

  for (let i = 0; i < alternatives.length; i++) {
    const alternative: GoSlice<versionComparator> = alternatives[i]!;
    if (i > 0) {
      b.WriteString(" || ");
    }
    formatAlternative(b, alternative);
  }

  if (b.Len() === origLen) {
    b.WriteString("*");
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::formatAlternative","kind":"func","status":"implemented","sigHash":"fcfd3172d99bebcd8e7a5e26b197f4d7b70d49818c0f6656ed73c1f9def47765"}
 *
 * Go source:
 * func formatAlternative(sb *strings.Builder, comparators []versionComparator) {
 * 	for i, comparator := range comparators {
 * 		if i > 0 {
 * 			sb.WriteByte(' ')
 * 		}
 * 		formatComparator(sb, comparator)
 * 	}
 * }
 */
export function formatAlternative(sb: GoPtr<Builder>, comparators: GoSlice<versionComparator>): void {
  const b: Builder = sb!;
  for (let i = 0; i < comparators.length; i++) {
    const comparator: versionComparator = comparators[i]!;
    if (i > 0) {
      b.WriteByte(0x20 as byte); // ' '
    }
    formatComparator(b, comparator);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::formatComparator","kind":"func","status":"implemented","sigHash":"27531fbba73ef080e219e9123db53523ecaa7bdd1044a3ca322961aece0d0b2f"}
 *
 * Go source:
 * func formatComparator(sb *strings.Builder, comparator versionComparator) {
 * 	sb.WriteString(string(comparator.operator))
 * 	sb.WriteString(comparator.operand.String())
 * }
 */
export function formatComparator(sb: GoPtr<Builder>, comparator: versionComparator): void {
  const b: Builder = sb!;
  b.WriteString(comparator.operator);
  b.WriteString(Version_String(comparator.operand));
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::method::VersionRange.Test","kind":"method","status":"implemented","sigHash":"e4fb00bab43bb1e06d358c3423d9c3f849144a658ef3212c122a43f8178ca4d3"}
 *
 * Go source:
 * func (v *VersionRange) Test(version *Version) bool {
 * 	return testDisjunction(v.alternatives, version)
 * }
 */
export function VersionRange_Test(receiver: GoPtr<VersionRange>, version: GoPtr<Version>): bool {
  const v: VersionRange = receiver!;
  return testDisjunction(v.alternatives, version);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::testDisjunction","kind":"func","status":"implemented","sigHash":"16e413eb2fd0b781f316c50b3d74b5a67fcace3685b3ef3e32ffef5db0a1609f"}
 *
 * Go source:
 * func testDisjunction(alternatives [][]versionComparator, version *Version) bool {
 * 	// an empty disjunction is treated as "*" (all versions)
 * 	if len(alternatives) == 0 {
 * 		return true
 * 	}
 * 
 * 	for _, alternative := range alternatives {
 * 		if testAlternative(alternative, version) {
 * 			return true
 * 		}
 * 	}
 * 
 * 	return false
 * }
 */
export function testDisjunction(alternatives: GoSlice<GoSlice<versionComparator>>, version: GoPtr<Version>): bool {
  // an empty disjunction is treated as "*" (all versions)
  if (alternatives.length === 0) {
    return true;
  }

  for (const alternative of alternatives) {
    if (testAlternative(alternative, version)) {
      return true;
    }
  }

  return false;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::testAlternative","kind":"func","status":"implemented","sigHash":"29a767bdf53420b183993063125154351c467e1b5cce761844099d54f9db46d5"}
 *
 * Go source:
 * func testAlternative(alternative []versionComparator, version *Version) bool {
 * 	for _, comparator := range alternative {
 * 		if !testComparator(comparator, version) {
 * 			return false
 * 		}
 * 	}
 * 	return true
 * }
 */
export function testAlternative(alternative: GoSlice<versionComparator>, version: GoPtr<Version>): bool {
  for (const comparator of alternative) {
    if (!testComparator(comparator, version)) {
      return false;
    }
  }
  return true;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::testComparator","kind":"func","status":"implemented","sigHash":"04e85e4776d2c53933cfaf00a1041693a9458648b299cfcae7bcca78711a2b21"}
 *
 * Go source:
 * func testComparator(comparator versionComparator, version *Version) bool {
 * 	cmp := version.Compare(&comparator.operand)
 * 	switch comparator.operator {
 * 	case rangeLessThan:
 * 		return cmp < 0
 * 	case rangeLessThanEqual:
 * 		return cmp <= 0
 * 	case rangeEqual:
 * 		return cmp == 0
 * 	case rangeGreaterThanEqual:
 * 		return cmp >= 0
 * 	case rangeGreaterThan:
 * 		return cmp > 0
 * 	default:
 * 		panic("Unexpected operator: " + comparator.operator)
 * 	}
 * }
 */
export function testComparator(comparator: versionComparator, version: GoPtr<Version>): bool {
  const cmp: int = Version_Compare(version, comparator.operand);
  switch (comparator.operator) {
    case rangeLessThan:
      return cmp < 0;
    case rangeLessThanEqual:
      return cmp <= 0;
    case rangeEqual:
      return cmp === 0;
    case rangeGreaterThanEqual:
      return cmp >= 0;
    case rangeGreaterThan:
      return cmp > 0;
    default:
      throw new globalThis.Error("Unexpected operator: " + comparator.operator);
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::TryParseVersionRange","kind":"func","status":"implemented","sigHash":"e0a0971c2e5f595d9fb4db24477e3952d09bfaac41384657e878f60b2200e5ac"}
 *
 * Go source:
 * func TryParseVersionRange(text string) (VersionRange, bool) {
 * 	alternatives, ok := parseAlternatives(text)
 * 	return VersionRange{alternatives: alternatives}, ok
 * }
 */
export function TryParseVersionRange(text: string): [VersionRange, bool] {
  const [alternatives, ok] = parseAlternatives(text);
  return [{ alternatives: alternatives }, ok];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::parseAlternatives","kind":"func","status":"implemented","sigHash":"bfd48c56558d28564b697a14e5427ecb029419e4250a43df4933e71e959880ef"}
 *
 * Go source:
 * func parseAlternatives(text string) ([][]versionComparator, bool) {
 * 	var alternatives [][]versionComparator
 * 
 * 	text = strings.TrimSpace(text)
 * 	ranges := logicalOrRegExp.Split(text, -1)
 * 	for _, r := range ranges {
 * 		r = strings.TrimSpace(r)
 * 		if r == "" {
 * 			continue
 * 		}
 * 
 * 		var comparators []versionComparator
 * 
 * 		if hyphenMatch := hyphenRegExp.FindStringSubmatch(r); hyphenMatch != nil {
 * 			if parsedComparators, ok := parseHyphen(hyphenMatch[1], hyphenMatch[2]); ok {
 * 				comparators = append(comparators, parsedComparators...)
 * 			} else {
 * 				return nil, false
 * 			}
 * 		} else {
 * 			for _, simple := range whitespaceRegExp.Split(r, -1) {
 * 				match := rangeRegExp.FindStringSubmatch(strings.TrimSpace(simple))
 * 				if match == nil {
 * 					return nil, false
 * 				}
 * 
 * 				if parsedComparators, ok := parseComparator(match[1], match[2]); ok {
 * 					comparators = append(comparators, parsedComparators...)
 * 				} else {
 * 					return nil, false
 * 				}
 * 			}
 * 		}
 * 
 * 		alternatives = append(alternatives, comparators)
 * 	}
 * 
 * 	return alternatives, true
 * }
 */
export function parseAlternatives(text: string): [GoSlice<GoSlice<versionComparator>>, bool] {
  let alternatives: GoSlice<GoSlice<versionComparator>> = GoNilSlice();

  const trimmed: string = strings.TrimSpace(text);
  // Split with n=-1 returns all substrings (never nil); Go ranges over the
  // resulting slice (a nil slice would simply yield zero iterations).
  const ranges: GoSlice<string> = logicalOrRegExp!.Split(trimmed, -1);
  for (
    let __goRangeSlice2 = ranges,
      __goRangeLength2 = __goRangeSlice2.length,
      __goRangeValueOps2 = GoStringValueOps,
      __goRangeIndex2 = 0;
    __goRangeIndex2 < __goRangeLength2;
    __goRangeIndex2++
  ) {
    const rRaw = GoSliceLoad(__goRangeSlice2, __goRangeIndex2, __goRangeValueOps2);
    const r: string = strings.TrimSpace(rRaw);
    if (r === "") {
      continue;
    }

    let comparators: GoSlice<versionComparator> = GoNilSlice();

    const hyphenMatch: GoSlice<string> = hyphenRegExp!.FindStringSubmatch(r);
    if (!GoSliceIsNil(hyphenMatch)) {
      const [parsedComparators, ok] = parseHyphen(GoSliceLoad(hyphenMatch, 1, GoStringValueOps)!, GoSliceLoad(hyphenMatch, 2, GoStringValueOps)!);
      if (ok) {
        comparators = GoAppendSlice(comparators, parsedComparators);
      } else {
        return [GoNilSlice(), false];
      }
    } else {
      for (
        let __goRangeSlice = whitespaceRegExp!.Split(r, -1),
          __goRangeLength = __goRangeSlice.length,
          __goRangeValueOps = GoStringValueOps,
          __goRangeIndex = 0;
        __goRangeIndex < __goRangeLength;
        __goRangeIndex++
      ) {
        const simple = GoSliceLoad(__goRangeSlice, __goRangeIndex, __goRangeValueOps);
        const match: GoSlice<string> = rangeRegExp!.FindStringSubmatch(strings.TrimSpace(simple));
        if (GoSliceIsNil(match)) {
          return [GoNilSlice(), false];
        }

        const [parsedComparators, ok] = parseComparator(GoSliceLoad(match, 1, GoStringValueOps)!, GoSliceLoad(match, 2, GoStringValueOps)!);
        if (ok) {
          comparators = GoAppendSlice(comparators, parsedComparators);
        } else {
          return [GoNilSlice(), false];
        }
      }
    }

    alternatives = GoSliceAppend(alternatives, comparators, GoSliceValueOps<versionComparator>());
  }

  return [alternatives, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::parseHyphen","kind":"func","status":"implemented","sigHash":"42e7c805f85927282e13135fe4153c667a5051fa194e29d5b3b541f577135e23"}
 *
 * Go source:
 * func parseHyphen(left, right string) ([]versionComparator, bool) {
 * 	leftResult, leftOk := parsePartial(left)
 * 	if !leftOk {
 * 		return nil, false
 * 	}
 * 
 * 	rightResult, rightOk := parsePartial(right)
 * 	if !rightOk {
 * 		return nil, false
 * 	}
 * 
 * 	var comparators []versionComparator
 * 	if !isWildcard(leftResult.majorStr) {
 * 		// `MAJOR.*.*-...` gives us `>=MAJOR.0.0 ...`
 * 		comparators = append(comparators, versionComparator{
 * 			operator: rangeGreaterThanEqual,
 * 			operand:  leftResult.version,
 * 		})
 * 	}
 * 
 * 	if !isWildcard(rightResult.majorStr) {
 * 		var operator comparatorOperator
 * 		operand := rightResult.version
 * 
 * 		switch {
 * 		case isWildcard(rightResult.minorStr):
 * 			// `...-MAJOR.*.*` gives us `... <(MAJOR+1).0.0`
 * 			operand = operand.incrementMajor()
 * 			operator = rangeLessThan
 * 		case isWildcard(rightResult.patchStr):
 * 			// `...-MAJOR.MINOR.*` gives us `... <MAJOR.(MINOR+1).0`
 * 			operand = operand.incrementMinor()
 * 			operator = rangeLessThan
 * 		default:
 * 			// `...-MAJOR.MINOR.PATCH` gives us `... <=MAJOR.MINOR.PATCH`
 * 			operator = rangeLessThanEqual
 * 		}
 * 
 * 		comparators = append(comparators, versionComparator{
 * 			operator: operator,
 * 			operand:  operand,
 * 		})
 * 	}
 * 
 * 	return comparators, true
 * }
 */
export function parseHyphen(left: string, right: string): [GoSlice<versionComparator>, bool] {
  const [leftResult, leftOk] = parsePartial(left);
  if (!leftOk) {
    return [GoNilSlice(), false];
  }

  const [rightResult, rightOk] = parsePartial(right);
  if (!rightOk) {
    return [GoNilSlice(), false];
  }

  let comparators: GoSlice<versionComparator> = GoNilSlice();
  if (!isWildcard(leftResult.majorStr)) {
    // `MAJOR.*.*-...` gives us `>=MAJOR.0.0 ...`
    comparators = GoAppend(comparators, {
      operator: rangeGreaterThanEqual,
      operand: leftResult.version,
    });
  }

  if (!isWildcard(rightResult.majorStr)) {
    let operator: comparatorOperator;
    let operand: Version = rightResult.version;

    if (isWildcard(rightResult.minorStr)) {
      // `...-MAJOR.*.*` gives us `... <(MAJOR+1).0.0`
      operand = Version_incrementMajor(operand);
      operator = rangeLessThan;
    } else if (isWildcard(rightResult.patchStr)) {
      // `...-MAJOR.MINOR.*` gives us `... <MAJOR.(MINOR+1).0`
      operand = Version_incrementMinor(operand);
      operator = rangeLessThan;
    } else {
      // `...-MAJOR.MINOR.PATCH` gives us `... <=MAJOR.MINOR.PATCH`
      operator = rangeLessThanEqual;
    }

    comparators = GoAppend(comparators, {
      operator: operator,
      operand: operand,
    });
  }

  return [comparators, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::type::partialVersion","kind":"type","status":"implemented","sigHash":"5d58b97ede1050e72ae9bd9a33da4fc7e4459710b42c1257c94a105516a4a26a"}
 *
 * Go source:
 * partialVersion struct {
 * 	version  Version
 * 	majorStr string
 * 	minorStr string
 * 	patchStr string
 * }
 */
export interface partialVersion {
  version: Version;
  majorStr: string;
  minorStr: string;
  patchStr: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::parsePartial","kind":"func","status":"implemented","sigHash":"32653d560c37cd2f2ae9d950b82ab053e13b736dc76f6780a18706f6b7df1b98"}
 *
 * Go source:
 * func parsePartial(text string) (partialVersion, bool) {
 * 	match := partialRegExp.FindStringSubmatch(text)
 * 	if match == nil {
 * 		return partialVersion{}, false
 * 	}
 * 
 * 	majorStr := match[1]
 * 	minorStr := match[2]
 * 	patchStr := match[3]
 * 	prereleaseStr := match[4]
 * 	buildStr := match[5]
 * 
 * 	if minorStr == "" {
 * 		minorStr = "*"
 * 	}
 * 	if patchStr == "" {
 * 		patchStr = "*"
 * 	}
 * 
 * 	var majorNumeric, minorNumeric, patchNumeric uint32
 * 	var err error
 * 
 * 	if isWildcard(majorStr) {
 * 		majorNumeric = 0
 * 		minorNumeric = 0
 * 		patchNumeric = 0
 * 	} else {
 * 		majorNumeric, err = getUintComponent(majorStr)
 * 		if err != nil {
 * 			return partialVersion{}, false
 * 		}
 * 
 * 		if isWildcard(minorStr) {
 * 			minorNumeric = 0
 * 			patchNumeric = 0
 * 		} else {
 * 			minorNumeric, err = getUintComponent(minorStr)
 * 			if err != nil {
 * 				return partialVersion{}, false
 * 			}
 * 
 * 			if isWildcard(patchStr) {
 * 				patchNumeric = 0
 * 			} else {
 * 				patchNumeric, err = getUintComponent(patchStr)
 * 				if err != nil {
 * 					return partialVersion{}, false
 * 				}
 * 			}
 * 		}
 * 	}
 * 
 * 	var prerelease []string
 * 	if prereleaseStr != "" {
 * 		prerelease = strings.Split(prereleaseStr, ".")
 * 	}
 * 
 * 	var build []string
 * 	if buildStr != "" {
 * 		build = strings.Split(buildStr, ".")
 * 	}
 * 
 * 	result := partialVersion{
 * 		version: Version{
 * 			major:      majorNumeric,
 * 			minor:      minorNumeric,
 * 			patch:      patchNumeric,
 * 			prerelease: prerelease,
 * 			build:      build,
 * 		},
 * 		majorStr: majorStr,
 * 		minorStr: minorStr,
 * 		patchStr: patchStr,
 * 	}
 * 
 * 	return result, true
 * }
 */
export function parsePartial(text: string): [partialVersion, bool] {
  // Zero value of partialVersion (Go `partialVersion{}`): zero Version and
  // empty component strings.
  const zeroPartial: partialVersion = {
    version: {
      major: 0,
      minor: 0,
      patch: 0,
      prerelease: GoNilSlice(),
      build: GoNilSlice(),
    },
    majorStr: "",
    minorStr: "",
    patchStr: "",
  };

  const match: GoSlice<string> = partialRegExp!.FindStringSubmatch(text);
  if (GoSliceIsNil(match)) {
    return [zeroPartial, false];
  }

  const majorStr: string = GoSliceLoad(match, 1, GoStringValueOps)!;
  let minorStr: string = GoSliceLoad(match, 2, GoStringValueOps)!;
  let patchStr: string = GoSliceLoad(match, 3, GoStringValueOps)!;
  const prereleaseStr: string = GoSliceLoad(match, 4, GoStringValueOps)!;
  const buildStr: string = GoSliceLoad(match, 5, GoStringValueOps)!;

  if (minorStr === "") {
    minorStr = "*";
  }
  if (patchStr === "") {
    patchStr = "*";
  }

  let majorNumeric: uint = 0;
  let minorNumeric: uint = 0;
  let patchNumeric: uint = 0;

  if (isWildcard(majorStr)) {
    majorNumeric = 0;
    minorNumeric = 0;
    patchNumeric = 0;
  } else {
    const [majorVal, majorErr] = getUintComponent(majorStr);
    if (majorErr !== undefined) {
      return [zeroPartial, false];
    }
    majorNumeric = majorVal;

    if (isWildcard(minorStr)) {
      minorNumeric = 0;
      patchNumeric = 0;
    } else {
      const [minorVal, minorErr] = getUintComponent(minorStr);
      if (minorErr !== undefined) {
        return [zeroPartial, false];
      }
      minorNumeric = minorVal;

      if (isWildcard(patchStr)) {
        patchNumeric = 0;
      } else {
        const [patchVal, patchErr] = getUintComponent(patchStr);
        if (patchErr !== undefined) {
          return [zeroPartial, false];
        }
        patchNumeric = patchVal;
      }
    }
  }

  let prerelease = GoNilSlice<string>();
  if (prereleaseStr !== "") {
    prerelease = strings.Split(prereleaseStr, ".");
  }

  let build = GoNilSlice<string>();
  if (buildStr !== "") {
    build = strings.Split(buildStr, ".");
  }

  const result: partialVersion = {
    version: {
      major: majorNumeric,
      minor: minorNumeric,
      patch: patchNumeric,
      prerelease: prerelease,
      build: build,
    },
    majorStr: majorStr,
    minorStr: minorStr,
    patchStr: patchStr,
  };

  return [result, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::parseComparator","kind":"func","status":"implemented","sigHash":"2dbd07f54f81b0de794b72d671394e3c30d75b59360f8c1954646c9d4b44249a"}
 *
 * Go source:
 * func parseComparator(op string, text string) ([]versionComparator, bool) {
 * 	operator := comparatorOperator(op)
 * 
 * 	result, ok := parsePartial(text)
 * 	if !ok {
 * 		return nil, false
 * 	}
 * 
 * 	var comparatorsResult []versionComparator
 * 
 * 	if !isWildcard(result.majorStr) {
 * 		switch operator {
 * 		case "~":
 * 			first := versionComparator{rangeGreaterThanEqual, result.version}
 * 
 * 			var secondVersion Version
 * 			if isWildcard(result.minorStr) {
 * 				secondVersion = result.version.incrementMajor()
 * 			} else {
 * 				secondVersion = result.version.incrementMinor()
 * 			}
 * 
 * 			second := versionComparator{rangeLessThan, secondVersion}
 * 			comparatorsResult = []versionComparator{first, second}
 * 
 * 		case "^":
 * 			first := versionComparator{rangeGreaterThanEqual, result.version}
 * 
 * 			var secondVersion Version
 * 			if result.version.major > 0 || isWildcard(result.minorStr) {
 * 				secondVersion = result.version.incrementMajor()
 * 			} else if result.version.minor > 0 || isWildcard(result.patchStr) {
 * 				secondVersion = result.version.incrementMinor()
 * 			} else {
 * 				secondVersion = result.version.incrementPatch()
 * 			}
 * 			second := versionComparator{rangeLessThan, secondVersion}
 * 			comparatorsResult = []versionComparator{first, second}
 * 
 * 		case "<", ">=":
 * 			version := result.version
 * 			if isWildcard(result.minorStr) || isWildcard(result.patchStr) {
 * 				version.prerelease = []string{"0"}
 * 			}
 * 			comparatorsResult = []versionComparator{
 * 				{operator, version},
 * 			}
 * 
 * 		case "<=", ">":
 * 			version := result.version
 * 			if isWildcard(result.minorStr) {
 * 				if operator == rangeLessThanEqual {
 * 					operator = rangeLessThan
 * 				} else {
 * 					operator = rangeGreaterThanEqual
 * 				}
 * 
 * 				version = version.incrementMajor()
 * 				version.prerelease = []string{"0"}
 * 			} else if isWildcard(result.patchStr) {
 * 				if operator == rangeLessThanEqual {
 * 					operator = rangeLessThan
 * 				} else {
 * 					operator = rangeGreaterThanEqual
 * 				}
 * 
 * 				version = version.incrementMinor()
 * 				version.prerelease = []string{"0"}
 * 			}
 * 
 * 			comparatorsResult = []versionComparator{
 * 				{operator, version},
 * 			}
 * 		case "=", "":
 * 			// normalize empty string to `=`
 * 			operator = rangeEqual
 * 
 * 			if isWildcard(result.minorStr) || isWildcard(result.patchStr) {
 * 				originalVersion := result.version
 * 
 * 				firstVersion := originalVersion
 * 				firstVersion.prerelease = []string{"0"}
 * 
 * 				var secondVersion Version
 * 				if isWildcard(result.minorStr) {
 * 					secondVersion = originalVersion.incrementMajor()
 * 				} else {
 * 					secondVersion = originalVersion.incrementMinor()
 * 				}
 * 				secondVersion.prerelease = []string{"0"}
 * 
 * 				comparatorsResult = []versionComparator{
 * 					{rangeGreaterThanEqual, firstVersion},
 * 					{rangeLessThan, secondVersion},
 * 				}
 * 			} else {
 * 				comparatorsResult = []versionComparator{
 * 					{operator, result.version},
 * 				}
 * 			}
 * 		default:
 * 			panic("Unexpected operator: " + operator)
 * 		}
 * 	} else {
 * 		if operator == "<" || operator == ">" {
 * 			comparatorsResult = []versionComparator{
 * 				// < 0.0.0-0
 * 				{rangeLessThan, versionZero},
 * 			}
 * 		}
 * 	}
 * 
 * 	return comparatorsResult, true
 * }
 */
export function parseComparator(op: string, text: string): [GoSlice<versionComparator>, bool] {
  let operator: comparatorOperator = op;

  const [result, ok] = parsePartial(text);
  if (!ok) {
    return [GoNilSlice(), false];
  }

  let comparatorsResult = GoNilSlice<versionComparator>();

  if (!isWildcard(result.majorStr)) {
    switch (operator) {
      case "~": {
        const first: versionComparator = { operator: rangeGreaterThanEqual, operand: result.version };

        let secondVersion: Version;
        if (isWildcard(result.minorStr)) {
          secondVersion = Version_incrementMajor(result.version);
        } else {
          secondVersion = Version_incrementMinor(result.version);
        }

        const second: versionComparator = { operator: rangeLessThan, operand: secondVersion };
        comparatorsResult = [first, second];
        break;
      }

      case "^": {
        const first: versionComparator = { operator: rangeGreaterThanEqual, operand: result.version };

        let secondVersion: Version;
        if (result.version.major > 0 || isWildcard(result.minorStr)) {
          secondVersion = Version_incrementMajor(result.version);
        } else if (result.version.minor > 0 || isWildcard(result.patchStr)) {
          secondVersion = Version_incrementMinor(result.version);
        } else {
          secondVersion = Version_incrementPatch(result.version);
        }
        const second: versionComparator = { operator: rangeLessThan, operand: secondVersion };
        comparatorsResult = [first, second];
        break;
      }

      case "<":
      case ">=": {
        const version: Version = { ...result.version };
        if (isWildcard(result.minorStr) || isWildcard(result.patchStr)) {
          version.prerelease = GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, "0", GoStringValueOps);
          });
        }
        comparatorsResult = [{ operator: operator, operand: version }];
        break;
      }

      case "<=":
      case ">": {
        let version: Version = { ...result.version };
        if (isWildcard(result.minorStr)) {
          if (operator === rangeLessThanEqual) {
            operator = rangeLessThan;
          } else {
            operator = rangeGreaterThanEqual;
          }

          version = Version_incrementMajor(version);
          version.prerelease = GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, "0", GoStringValueOps);
          });
        } else if (isWildcard(result.patchStr)) {
          if (operator === rangeLessThanEqual) {
            operator = rangeLessThan;
          } else {
            operator = rangeGreaterThanEqual;
          }

          version = Version_incrementMinor(version);
          version.prerelease = GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, "0", GoStringValueOps);
          });
        }

        comparatorsResult = [{ operator: operator, operand: version }];
        break;
      }
      case "=":
      case "": {
        // normalize empty string to `=`
        operator = rangeEqual;

        if (isWildcard(result.minorStr) || isWildcard(result.patchStr)) {
          const originalVersion: Version = result.version;

          const firstVersion: Version = { ...originalVersion };
          firstVersion.prerelease = GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, "0", GoStringValueOps);
          });

          let secondVersion: Version;
          if (isWildcard(result.minorStr)) {
            secondVersion = Version_incrementMajor(originalVersion);
          } else {
            secondVersion = Version_incrementMinor(originalVersion);
          }
          secondVersion.prerelease = GoSliceBuild(1, 1, GoStringValueOps, (__goSliceLiteral) => {
            GoSliceStore(__goSliceLiteral, 0, "0", GoStringValueOps);
          });

          comparatorsResult = [
            { operator: rangeGreaterThanEqual, operand: firstVersion },
            { operator: rangeLessThan, operand: secondVersion },
          ];
        } else {
          comparatorsResult = [{ operator: operator, operand: result.version }];
        }
        break;
      }
      default:
        throw new globalThis.Error("Unexpected operator: " + operator);
    }
  } else {
    if (operator === "<" || operator === ">") {
      comparatorsResult = [
        // < 0.0.0-0
        { operator: rangeLessThan, operand: versionZero },
      ];
    }
  }

  return [comparatorsResult, true];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version_range.go::func::isWildcard","kind":"func","status":"implemented","sigHash":"a6fe02a4c6e4f2c6cd7e09468071a37e59d04b96975396fab40af13010922a65"}
 *
 * Go source:
 * func isWildcard(text string) bool {
 * 	return text == "*" || text == "x" || text == "X"
 * }
 */
export function isWildcard(text: string): bool {
  return text === "*" || text === "x" || text === "X";
}
