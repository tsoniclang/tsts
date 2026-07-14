import type { int, uint } from "../../go/scalars.js";
import type { GoError, GoPtr, GoSlice } from "../../go/compat.js";
import { GoSliceIsNil } from "../../go/compat.js";
import * as cmp from "../../go/cmp.js";
import * as fmt from "../../go/fmt.js";
import * as regexp from "../../go/regexp.js";
import * as slices from "../../go/slices.js";
import * as strconv from "../../go/strconv.js";
import * as strings from "../../go/strings.js";

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::varGroup::versionRegexp","kind":"varGroup","status":"implemented","sigHash":"8d6db7c641dddc07ee01bfef3102c15654160c26e64f4097dfa73fcac7cfc275"}
 *
 * Go source:
 * var versionRegexp = regexp.MustCompile(`(?i)^(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:\.(0|[1-9]\d*)(?:-([a-z0-9-.]+))?(?:\+([a-z0-9-.]+))?)?)?$`)
 */
export let versionRegexp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^(0|[1-9]\\d*)(?:\\.(0|[1-9]\\d*)(?:\\.(0|[1-9]\\d*)(?:-([a-z0-9-.]+))?(?:\\+([a-z0-9-.]+))?)?)?$`,
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::varGroup::prereleaseRegexp+prereleasePartRegexp","kind":"varGroup","status":"implemented","sigHash":"9e69e167f6d8fadf67328d311584d246e8e7c68ec4f69e01a1ca3c2166bb27a6"}
 *
 * Go source:
 * var (
 * 	prereleaseRegexp     = regexp.MustCompile(`(?i)^(?:0|[1-9]\d*|[a-z-][a-z0-9-]*)(?:\.(?:0|[1-9]\d*|[a-zA-Z-][a-zA-Z0-9-]*))*$`)
 * 	prereleasePartRegexp = regexp.MustCompile(`(?i)^(?:0|[1-9]\d*|[a-z-][a-z0-9-]*)$`)
 * )
 */
export let prereleaseRegexp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^(?:0|[1-9]\\d*|[a-z-][a-z0-9-]*)(?:\\.(?:0|[1-9]\\d*|[a-zA-Z-][a-zA-Z0-9-]*))*$`,
);
export let prereleasePartRegexp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^(?:0|[1-9]\\d*|[a-z-][a-z0-9-]*)$`,
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::varGroup::buildRegExp+buildPartRegExp","kind":"varGroup","status":"implemented","sigHash":"fbf7195d59cbd8b93301268881663fb9bcb444bac42d6c1fa8e98b05d7f5cd7f"}
 *
 * Go source:
 * var (
 * 	buildRegExp     = regexp.MustCompile(`(?i)^[a-z0-9-]+(?:\.[a-z0-9-]+)*$`)
 * 	buildPartRegExp = regexp.MustCompile(`(?i)^[a-z0-9-]+$`)
 * )
 */
export let buildRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^[a-z0-9-]+(?:\\.[a-z0-9-]+)*$`,
);
export let buildPartRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `(?i)^[a-z0-9-]+$`,
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::varGroup::numericIdentifierRegExp","kind":"varGroup","status":"implemented","sigHash":"77399f4cadcead88c26bc5721e77d68bbddecaece07adbb0e9dd3845262be231"}
 *
 * Go source:
 * var numericIdentifierRegExp = regexp.MustCompile(`^(?:0|[1-9]\d*)$`)
 */
export let numericIdentifierRegExp: GoPtr<regexp.Regexp> = regexp.MustCompile(
  `^(?:0|[1-9]\\d*)$`,
);

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::type::Version","kind":"type","status":"implemented","sigHash":"a972480db15a6da3c0a8b9f20903dc858a70b37017e88f07f40ad74afcc9f97c"}
 *
 * Go source:
 * Version struct {
 * 	major      uint32
 * 	minor      uint32
 * 	patch      uint32
 * 	prerelease []string
 * 	build      []string
 * }
 */
export interface Version {
  major: uint;
  minor: uint;
  patch: uint;
  prerelease: GoSlice<string>;
  build: GoSlice<string>;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::varGroup::versionZero","kind":"varGroup","status":"implemented","sigHash":"a6f9f95527157cc7cf1f1b5a0c4aa726931a4b040d44fe45c311cf7f4c87447f"}
 *
 * Go source:
 * var versionZero = Version{
 * 	prerelease: []string{"0"},
 * }
 */
export let versionZero: Version = {
  major: 0,
  minor: 0,
  patch: 0,
  prerelease: ["0"],
  build: [],
};

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::method::Version.incrementMajor","kind":"method","status":"implemented","sigHash":"d20feb5885d7e19d6ab91e95cf4af503f99fe11920bd1a5551f9b54aebc36945"}
 *
 * Go source:
 * func (v *Version) incrementMajor() Version {
 * 	return Version{
 * 		major: v.major + 1,
 * 	}
 * }
 */
export function Version_incrementMajor(receiver: GoPtr<Version>): Version {
  const v: Version = receiver!;
  return {
    major: v.major + 1,
    minor: 0,
    patch: 0,
    prerelease: [],
    build: [],
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::method::Version.incrementMinor","kind":"method","status":"implemented","sigHash":"e06bda508928e5991514aabdd8ba79294c292653e637ae068c10b03e34f26e07"}
 *
 * Go source:
 * func (v *Version) incrementMinor() Version {
 * 	return Version{
 * 		major: v.major,
 * 		minor: v.minor + 1,
 * 	}
 * }
 */
export function Version_incrementMinor(receiver: GoPtr<Version>): Version {
  const v: Version = receiver!;
  return {
    major: v.major,
    minor: v.minor + 1,
    patch: 0,
    prerelease: [],
    build: [],
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::method::Version.incrementPatch","kind":"method","status":"implemented","sigHash":"623ee73fdb94d0ae987de4b9d3195e76e91979f5e7bde4ef2de2b0f70b8dcf65"}
 *
 * Go source:
 * func (v *Version) incrementPatch() Version {
 * 	return Version{
 * 		major: v.major,
 * 		minor: v.minor,
 * 		patch: v.patch + 1,
 * 	}
 * }
 */
export function Version_incrementPatch(receiver: GoPtr<Version>): Version {
  const v: Version = receiver!;
  return {
    major: v.major,
    minor: v.minor,
    patch: v.patch + 1,
    prerelease: [],
    build: [],
  };
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::constGroup::comparisonLessThan+comparisonEqualTo+comparisonGreaterThan","kind":"constGroup","status":"implemented","sigHash":"ae74468f468536b83e7f942c6b992e14e78673b04daf910be90bcb06fc9e4a41"}
 *
 * Go source:
 * const (
 * 	comparisonLessThan    = -1
 * 	comparisonEqualTo     = 0
 * 	comparisonGreaterThan = 1
 * )
 */
export const comparisonLessThan: int = -1;
export const comparisonEqualTo: int = 0;
export const comparisonGreaterThan: int = 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::method::Version.Compare","kind":"method","status":"implemented","sigHash":"b2e3fbc197fd83d04114c78e4be11333ebcf43aaf8185a05d54b1f5a6dc41807"}
 *
 * Go source:
 * func (a *Version) Compare(b *Version) int {
 * 	// https://semver.org/#spec-item-11
 * 	// > Precedence is determined by the first difference when comparing each of these
 * 	// > identifiers from left to right as follows: Major, minor, and patch versions are
 * 	// > always compared numerically.
 * 	//
 * 	// https://semver.org/#spec-item-11
 * 	// > Precedence for two pre-release versions with the same major, minor, and patch version
 * 	// > MUST be determined by comparing each dot separated identifier from left to right until
 * 	// > a difference is found [...]
 * 	//
 * 	// https://semver.org/#spec-item-11
 * 	// > Build metadata does not figure into precedence
 * 	switch {
 * 	case a == b:
 * 		return comparisonEqualTo
 * 	case a == nil:
 * 		return comparisonLessThan
 * 	case b == nil:
 * 		return comparisonGreaterThan
 * 	}
 * 
 * 	r := cmp.Compare(a.major, b.major)
 * 	if r != 0 {
 * 		return r
 * 	}
 * 
 * 	r = cmp.Compare(a.minor, b.minor)
 * 	if r != 0 {
 * 		return r
 * 	}
 * 
 * 	r = cmp.Compare(a.patch, b.patch)
 * 	if r != 0 {
 * 		return r
 * 	}
 * 
 * 	return comparePreReleaseIdentifiers(a.prerelease, b.prerelease)
 * }
 */
export function Version_Compare(receiver: GoPtr<Version>, b: GoPtr<Version>): int {
  const a: GoPtr<Version> = receiver;
  // https://semver.org/#spec-item-11
  // > Precedence is determined by the first difference when comparing each of these
  // > identifiers from left to right as follows: Major, minor, and patch versions are
  // > always compared numerically.
  //
  // https://semver.org/#spec-item-11
  // > Precedence for two pre-release versions with the same major, minor, and patch version
  // > MUST be determined by comparing each dot separated identifier from left to right until
  // > a difference is found [...]
  //
  // https://semver.org/#spec-item-11
  // > Build metadata does not figure into precedence
  if (a === b) {
    return comparisonEqualTo;
  } else if (a === undefined) {
    return comparisonLessThan;
  } else if (b === undefined) {
    return comparisonGreaterThan;
  }

  let r: int = cmp.Compare(a.major, b.major);
  if (r !== 0) {
    return r;
  }

  r = cmp.Compare(a.minor, b.minor);
  if (r !== 0) {
    return r;
  }

  r = cmp.Compare(a.patch, b.patch);
  if (r !== 0) {
    return r;
  }

  return comparePreReleaseIdentifiers(a.prerelease, b.prerelease);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::func::comparePreReleaseIdentifiers","kind":"func","status":"implemented","sigHash":"0df48a33e495fff4ad8f02d69ac68a2ae10586d1ce8ff9d66543f52b42037dfc"}
 *
 * Go source:
 * func comparePreReleaseIdentifiers(left, right []string) int {
 * 	// https://semver.org/#spec-item-11
 * 	// > When major, minor, and patch are equal, a pre-release version has lower precedence
 * 	// > than a normal version.
 * 	if len(left) == 0 {
 * 		if len(right) == 0 {
 * 			return comparisonEqualTo
 * 		}
 * 		return comparisonGreaterThan
 * 	} else if len(right) == 0 {
 * 		return comparisonLessThan
 * 	}
 * 
 * 	// https://semver.org/#spec-item-11
 * 	// > Precedence for two pre-release versions with the same major, minor, and patch version
 * 	// > MUST be determined by comparing each dot separated identifier from left to right until
 * 	// > a difference is found [...]
 * 	return slices.CompareFunc(left, right, comparePreReleaseIdentifier)
 * }
 */
export function comparePreReleaseIdentifiers(left: GoSlice<string>, right: GoSlice<string>): int {
  // https://semver.org/#spec-item-11
  // > When major, minor, and patch are equal, a pre-release version has lower precedence
  // > than a normal version.
  if (left.length === 0) {
    if (right.length === 0) {
      return comparisonEqualTo;
    }
    return comparisonGreaterThan;
  } else if (right.length === 0) {
    return comparisonLessThan;
  }

  // https://semver.org/#spec-item-11
  // > Precedence for two pre-release versions with the same major, minor, and patch version
  // > MUST be determined by comparing each dot separated identifier from left to right until
  // > a difference is found [...]
  return slices.CompareFunc(left, right, comparePreReleaseIdentifier);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::func::comparePreReleaseIdentifier","kind":"func","status":"implemented","sigHash":"a63c0c87d2c3408292f897c7c94ba228dec267177858522e12211264b9f1e44f"}
 *
 * Go source:
 * func comparePreReleaseIdentifier(left, right string) int {
 * 	// https://semver.org/#spec-item-11
 * 	// > Precedence for two pre-release versions with the same major, minor, and patch version
 * 	// > MUST be determined by comparing each dot separated identifier from left to right until
 * 	// > a difference is found [...]
 * 	compareResult := strings.Compare(left, right)
 * 	if compareResult == 0 {
 * 		return compareResult
 * 	}
 * 
 * 	leftIsNumeric := numericIdentifierRegExp.MatchString(left)
 * 	rightIsNumeric := numericIdentifierRegExp.MatchString(right)
 * 
 * 	if leftIsNumeric || rightIsNumeric {
 * 		// https://semver.org/#spec-item-11
 * 		// > Numeric identifiers always have lower precedence than non-numeric identifiers.
 * 		if !rightIsNumeric {
 * 			return comparisonLessThan
 * 		}
 * 		if !leftIsNumeric {
 * 			return comparisonGreaterThan
 * 		}
 * 
 * 		// https://semver.org/#spec-item-11
 * 		// > identifiers consisting of only digits are compared numerically
 * 		leftAsNumber, leftErr := getUintComponent(left)
 * 		rightAsNumber, rightErr := getUintComponent(right)
 * 		if leftErr != nil || rightErr != nil {
 * 			// This should only happen in the event of an overflow.
 * 			// If so, use the lengths or fall back to string comparison.
 * 			leftLen := len(left)
 * 			rightLen := len(right)
 * 			lenCompare := cmp.Compare(leftLen, rightLen)
 * 			if lenCompare == 0 {
 * 				return compareResult
 * 			} else {
 * 				return lenCompare
 * 			}
 * 		}
 * 		return cmp.Compare(leftAsNumber, rightAsNumber)
 * 	}
 * 
 * 	// https://semver.org/#spec-item-11
 * 	// > identifiers with letters or hyphens are compared lexically in ASCII sort order.
 * 	return compareResult
 * }
 */
export function comparePreReleaseIdentifier(left: string, right: string): int {
  // https://semver.org/#spec-item-11
  // > Precedence for two pre-release versions with the same major, minor, and patch version
  // > MUST be determined by comparing each dot separated identifier from left to right until
  // > a difference is found [...]
  const compareResult: int = strings.Compare(left, right);
  if (compareResult === 0) {
    return compareResult;
  }

  const leftIsNumeric: boolean = numericIdentifierRegExp!.MatchString(left);
  const rightIsNumeric: boolean = numericIdentifierRegExp!.MatchString(right);

  if (leftIsNumeric || rightIsNumeric) {
    // https://semver.org/#spec-item-11
    // > Numeric identifiers always have lower precedence than non-numeric identifiers.
    if (!rightIsNumeric) {
      return comparisonLessThan;
    }
    if (!leftIsNumeric) {
      return comparisonGreaterThan;
    }

    // https://semver.org/#spec-item-11
    // > identifiers consisting of only digits are compared numerically
    const [leftAsNumber, leftErr] = getUintComponent(left);
    const [rightAsNumber, rightErr] = getUintComponent(right);
    if (leftErr !== undefined || rightErr !== undefined) {
      // This should only happen in the event of an overflow.
      // If so, use the lengths or fall back to string comparison.
      const leftLen: int = left.length;
      const rightLen: int = right.length;
      const lenCompare: int = cmp.Compare(leftLen, rightLen);
      if (lenCompare === 0) {
        return compareResult;
      } else {
        return lenCompare;
      }
    }
    return cmp.Compare(leftAsNumber, rightAsNumber);
  }

  // https://semver.org/#spec-item-11
  // > identifiers with letters or hyphens are compared lexically in ASCII sort order.
  return compareResult;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::method::Version.String","kind":"method","status":"implemented","sigHash":"e09ff4c9bca9e8058e9a702afb5c6752540f651b1e5010091f7464185bd9e441"}
 *
 * Go source:
 * func (v *Version) String() string {
 * 	var sb strings.Builder
 * 	fmt.Fprintf(&sb, "%d.%d.%d", v.major, v.minor, v.patch)
 * 	if len(v.prerelease) > 0 {
 * 		fmt.Fprintf(&sb, "-%s", strings.Join(v.prerelease, "."))
 * 	}
 * 	if len(v.build) > 0 {
 * 		fmt.Fprintf(&sb, "+%s", strings.Join(v.build, "."))
 * 	}
 * 	return sb.String()
 * }
 */
export function Version_String(receiver: GoPtr<Version>): string {
  const v: Version = receiver!;
  const sb: strings.Builder = new strings.Builder();
  fmt.Fprintf(sb, "%d.%d.%d", v.major, v.minor, v.patch);
  if (v.prerelease.length > 0) {
    fmt.Fprintf(sb, "-%s", strings.Join(v.prerelease, "."));
  }
  if (v.build.length > 0) {
    fmt.Fprintf(sb, "+%s", strings.Join(v.build, "."));
  }
  return sb.String();
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::type::SemverParseError","kind":"type","status":"implemented","sigHash":"1f4df4fe021ed3615725d452b8a978948612144a1fe43bfa0c7e9858b54525c5"}
 *
 * Go source:
 * SemverParseError struct {
 * 	origInput string
 * }
 */
export interface SemverParseError {
  origInput: string;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::method::SemverParseError.Error","kind":"method","status":"implemented","sigHash":"736c412076a4a7f5f3f87f833b174e1b0b229a6747ae1b0a2d0ff98d6dc3b80e"}
 *
 * Go source:
 * func (e *SemverParseError) Error() string {
 * 	return fmt.Sprintf("Could not parse version string from %q", e.origInput)
 * }
 */
export function SemverParseError_Error(receiver: GoPtr<SemverParseError>): string {
  const e: SemverParseError = receiver!;
  return fmt.Sprintf("Could not parse version string from %q", e.origInput);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::func::TryParseVersion","kind":"func","status":"implemented","sigHash":"b0c1adc3d0c09288df0bdecbc609fe1c4c6ff6cccc053223fab9add30ff7229a"}
 *
 * Go source:
 * func TryParseVersion(text string) (Version, error) {
 * 	var result Version
 * 
 * 	match := versionRegexp.FindStringSubmatch(text)
 * 	if match == nil {
 * 		return result, &SemverParseError{origInput: text}
 * 	}
 * 
 * 	majorStr := match[1]
 * 	minorStr := match[2]
 * 	patchStr := match[3]
 * 	prereleaseStr := match[4]
 * 	buildStr := match[5]
 * 
 * 	var err error
 * 
 * 	result.major, err = getUintComponent(majorStr)
 * 	if err != nil {
 * 		return result, err
 * 	}
 * 
 * 	if minorStr != "" {
 * 		result.minor, err = getUintComponent(minorStr)
 * 		if err != nil {
 * 			return result, err
 * 		}
 * 	}
 * 
 * 	if patchStr != "" {
 * 		result.patch, err = getUintComponent(patchStr)
 * 		if err != nil {
 * 			return result, err
 * 		}
 * 	}
 * 
 * 	if prereleaseStr != "" {
 * 		if !prereleaseRegexp.MatchString(prereleaseStr) {
 * 			return result, &SemverParseError{origInput: text}
 * 		}
 * 
 * 		result.prerelease = strings.Split(prereleaseStr, ".")
 * 	}
 * 	if buildStr != "" {
 * 		if !buildRegExp.MatchString(buildStr) {
 * 			return result, &SemverParseError{origInput: text}
 * 		}
 * 
 * 		result.build = strings.Split(buildStr, ".")
 * 	}
 * 
 * 	return result, nil
 * }
 */
export function TryParseVersion(text: string): [Version, GoError] {
  const result: Version = {
    major: 0,
    minor: 0,
    patch: 0,
    prerelease: [],
    build: [],
  };

  const match: GoSlice<string> = versionRegexp!.FindStringSubmatch(text);
  if (GoSliceIsNil(match)) {
    return [result, new globalThis.Error(SemverParseError_Error({ origInput: text }))];
  }

  const majorStr: string = match[1]!;
  const minorStr: string = match[2]!;
  const patchStr: string = match[3]!;
  const prereleaseStr: string = match[4]!;
  const buildStr: string = match[5]!;

  const [majorVal, majorErr] = getUintComponent(majorStr);
  if (majorErr !== undefined) {
    return [result, majorErr];
  }
  result.major = majorVal;

  if (minorStr !== "") {
    const [minorVal, minorErr] = getUintComponent(minorStr);
    if (minorErr !== undefined) {
      return [result, minorErr];
    }
    result.minor = minorVal;
  }

  if (patchStr !== "") {
    const [patchVal, patchErr] = getUintComponent(patchStr);
    if (patchErr !== undefined) {
      return [result, patchErr];
    }
    result.patch = patchVal;
  }

  if (prereleaseStr !== "") {
    if (!prereleaseRegexp!.MatchString(prereleaseStr)) {
      return [result, new globalThis.Error(SemverParseError_Error({ origInput: text }))];
    }

    result.prerelease = strings.Split(prereleaseStr, ".");
  }
  if (buildStr !== "") {
    if (!buildRegExp!.MatchString(buildStr)) {
      return [result, new globalThis.Error(SemverParseError_Error({ origInput: text }))];
    }

    result.build = strings.Split(buildStr, ".");
  }

  return [result, undefined];
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::func::MustParse","kind":"func","status":"implemented","sigHash":"2e49b0b61ed5d0a4fc659c65f6e955538a6b979d9d617e665d1cbb0990d42d8d"}
 *
 * Go source:
 * func MustParse(text string) Version {
 * 	v, err := TryParseVersion(text)
 * 	if err != nil {
 * 		panic(err)
 * 	}
 * 	return v
 * }
 */
export function MustParse(text: string): Version {
  const [v, err] = TryParseVersion(text);
  if (err !== undefined) {
    throw err;
  }
  return v;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/semver/version.go::func::getUintComponent","kind":"func","status":"implemented","sigHash":"199c41db88a38dc3382519c0f0039ad44dbdf9b9077edffeac74a7ec79d6b754"}
 *
 * Go source:
 * func getUintComponent(text string) (uint32, error) {
 * 	r, err := strconv.ParseUint(text, 10, 32)
 * 	return uint32(r), err
 * }
 */
export function getUintComponent(text: string): [uint, GoError] {
  const [r, err] = strconv.ParseUint(text, 10, 32);
  return [(r >>> 0) as uint, err];
}
