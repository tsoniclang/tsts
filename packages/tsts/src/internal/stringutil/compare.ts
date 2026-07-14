import type { bool, int } from "../../go/scalars.js";
import { Compare, EqualFold, HasPrefix as stringsHasPrefix, HasSuffix as stringsHasSuffix, ToLower } from "../../go/strings.js";
import { ToLower as unicodeToLower } from "../../go/unicode.js";
import { DecodeRuneInStringViewAt, GetStringByteView, StringByteLen, StringByteSlice } from "../../go/unicode/utf8.js";

import type { GoFunc } from "../../go/compat.js";
// Go strings are immutable UTF-8 byte sequences; `len(s)` is a byte length and
// slices like `s[i:j]` operate on byte offsets. The standard-library facades
// (strings/utf8) follow that contract, so we mirror it here by operating over
// the UTF-8 byte view and converting back to a JS string at the boundaries.
const byteLen: (s: string) => int = StringByteLen;
const byteSlice: (s: string, start: int, end?: int) => string = StringByteSlice;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::EquateStringCaseInsensitive","kind":"func","status":"implemented","sigHash":"284949f704df7913456cab1010135bb5e23c8c347f244220d90a0321ec45440e"}
 *
 * Go source:
 * func EquateStringCaseInsensitive(a, b string) bool {
 * 	// !!!
 * 	// return a == b || strings.ToUpper(a) == strings.ToUpper(b)
 * 	return strings.EqualFold(a, b)
 * }
 */
export function EquateStringCaseInsensitive(a: string, b: string): bool {
  // !!!
  // return a == b || strings.ToUpper(a) == strings.ToUpper(b)
  return EqualFold(a, b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::EquateStringCaseSensitive","kind":"func","status":"implemented","sigHash":"38f4b81aeb4fc44bf88ad525e86f1acbaaf213a63ba2a308733150e08ac4e55a"}
 *
 * Go source:
 * func EquateStringCaseSensitive(a, b string) bool {
 * 	return a == b
 * }
 */
export function EquateStringCaseSensitive(a: string, b: string): bool {
  return a === b;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::GetStringEqualityComparer","kind":"func","status":"implemented","sigHash":"c947ebb615552c68869a35b2d225d0850ccd8eb2888ba41e2977119544e7278d"}
 *
 * Go source:
 * func GetStringEqualityComparer(ignoreCase bool) func(a, b string) bool {
 * 	if ignoreCase {
 * 		return EquateStringCaseInsensitive
 * 	}
 * 	return EquateStringCaseSensitive
 * }
 */
export function GetStringEqualityComparer(ignoreCase: bool): GoFunc<(a: string, b: string) => bool> {
  if (ignoreCase) {
    return EquateStringCaseInsensitive;
  }
  return EquateStringCaseSensitive;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::type::Comparison","kind":"type","status":"implemented","sigHash":"99ab707b7926c29386ab1a73e8519c4eeef59796b71aa1a1cac47ae231263f2c"}
 *
 * Go source:
 * Comparison = int
 */
export type Comparison = int;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::constGroup::ComparisonLessThan+ComparisonEqual+ComparisonGreaterThan","kind":"constGroup","status":"implemented","sigHash":"a6832ca64750960882a237c5c99224970eacda822c6c483fbfebbb457eb37c89"}
 *
 * Go source:
 * const (
 * 	ComparisonLessThan    Comparison = -1
 * 	ComparisonEqual       Comparison = 0
 * 	ComparisonGreaterThan Comparison = 1
 * )
 */
export const ComparisonLessThan: Comparison = -1;
export const ComparisonEqual: Comparison = 0;
export const ComparisonGreaterThan: Comparison = 1;

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::CompareStringsCaseInsensitive","kind":"func","status":"implemented","sigHash":"ac591ad324210bd22e25893f024961237ad3030219a6084cb964a51e7cc883b6"}
 *
 * Go source:
 * func CompareStringsCaseInsensitive(a string, b string) Comparison {
 * 	if a == b {
 * 		return ComparisonEqual
 * 	}
 * 	for {
 * 		ca, sa := utf8.DecodeRuneInString(a)
 * 		cb, sb := utf8.DecodeRuneInString(b)
 * 		if sa == 0 {
 * 			if sb == 0 {
 * 				return ComparisonEqual
 * 			}
 * 			return ComparisonLessThan
 * 		}
 * 		if sb == 0 {
 * 			return ComparisonGreaterThan
 * 		}
 * 		lca := unicode.ToLower(ca)
 * 		lcb := unicode.ToLower(cb)
 * 		if lca != lcb {
 * 			if lca < lcb {
 * 				return ComparisonLessThan
 * 			}
 * 			return ComparisonGreaterThan
 * 		}
 * 		a = a[sa:]
 * 		b = b[sb:]
 * 	}
 * }
 */
export function CompareStringsCaseInsensitive(a: string, b: string): Comparison {
  if (a === b) {
    return ComparisonEqual;
  }
  const aView = GetStringByteView(a);
  const bView = GetStringByteView(b);
  let aPos = 0;
  let bPos = 0;
  for (;;) {
    const [ca, sa] = DecodeRuneInStringViewAt(a, aView, aPos);
    const [cb, sb] = DecodeRuneInStringViewAt(b, bView, bPos);
    if (sa === 0) {
      if (sb === 0) {
        return ComparisonEqual;
      }
      return ComparisonLessThan;
    }
    if (sb === 0) {
      return ComparisonGreaterThan;
    }
    const lca = unicodeToLower(ca);
    const lcb = unicodeToLower(cb);
    if (lca !== lcb) {
      if (lca < lcb) {
        return ComparisonLessThan;
      }
      return ComparisonGreaterThan;
    }
    aPos += sa;
    bPos += sb;
  }
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::CompareStringsCaseSensitive","kind":"func","status":"implemented","sigHash":"b9971f54fe4386aa97f9f049e4189bef241d2d78a850136b97a4f52f958e65c5"}
 *
 * Go source:
 * func CompareStringsCaseSensitive(a string, b string) Comparison {
 * 	return strings.Compare(a, b)
 * }
 */
export function CompareStringsCaseSensitive(a: string, b: string): Comparison {
  return Compare(a, b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::GetStringComparer","kind":"func","status":"implemented","sigHash":"90e49d772b19c5c18b3e4b76c8cb065275723bd44046861239e811327803a653"}
 *
 * Go source:
 * func GetStringComparer(ignoreCase bool) func(a, b string) Comparison {
 * 	if ignoreCase {
 * 		return CompareStringsCaseInsensitive
 * 	}
 * 	return CompareStringsCaseSensitive
 * }
 */
export function GetStringComparer(ignoreCase: bool): GoFunc<(a: string, b: string) => Comparison> {
  if (ignoreCase) {
    return CompareStringsCaseInsensitive;
  }
  return CompareStringsCaseSensitive;
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::HasPrefix","kind":"func","status":"implemented","sigHash":"3aec1bc2e2b086e450456497dd628dd36120fc3a0eb58a19c868875df77db322"}
 *
 * Go source:
 * func HasPrefix(s string, prefix string, caseSensitive bool) bool {
 * 	if caseSensitive {
 * 		return strings.HasPrefix(s, prefix)
 * 	}
 * 	if len(prefix) > len(s) {
 * 		return false
 * 	}
 * 	return strings.EqualFold(s[0:len(prefix)], prefix)
 * }
 */
export function HasPrefix(s: string, prefix: string, caseSensitive: bool): bool {
  if (caseSensitive) {
    return stringsHasPrefix(s, prefix);
  }
  if (byteLen(prefix) > byteLen(s)) {
    return false;
  }
  return EqualFold(byteSlice(s, 0, byteLen(prefix)), prefix);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::HasSuffix","kind":"func","status":"implemented","sigHash":"9d42e86e86fe77ce4997a9218e755c3f72bf407f8bab2f09c8530f46e5a25b06"}
 *
 * Go source:
 * func HasSuffix(s string, suffix string, caseSensitive bool) bool {
 * 	if caseSensitive {
 * 		return strings.HasSuffix(s, suffix)
 * 	}
 * 	if len(suffix) > len(s) {
 * 		return false
 * 	}
 * 	return strings.EqualFold(s[len(s)-len(suffix):], suffix)
 * }
 */
export function HasSuffix(s: string, suffix: string, caseSensitive: bool): bool {
  if (caseSensitive) {
    return stringsHasSuffix(s, suffix);
  }
  if (byteLen(suffix) > byteLen(s)) {
    return false;
  }
  return EqualFold(byteSlice(s, byteLen(s) - byteLen(suffix)), suffix);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::HasPrefixAndSuffixWithoutOverlap","kind":"func","status":"implemented","sigHash":"5e8d62c91cfa6feacb2c5be6647f9c4da3de3df7e17ff7326b6be16598a0111e"}
 *
 * Go source:
 * func HasPrefixAndSuffixWithoutOverlap(s string, prefix string, suffix string, caseSensitive bool) bool {
 * 	if len(prefix)+len(suffix) > len(s) {
 * 		return false
 * 	}
 * 
 * 	return HasPrefix(s, prefix, caseSensitive) && HasSuffix(s, suffix, caseSensitive)
 * }
 */
export function HasPrefixAndSuffixWithoutOverlap(s: string, prefix: string, suffix: string, caseSensitive: bool): bool {
  if (byteLen(prefix) + byteLen(suffix) > byteLen(s)) {
    return false;
  }

  return HasPrefix(s, prefix, caseSensitive) && HasSuffix(s, suffix, caseSensitive);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::CompareStringsCaseInsensitiveThenSensitive","kind":"func","status":"implemented","sigHash":"01a432c5f45bd781971f304ceff94be9f254e524b91acb63b1bd289afb261262"}
 *
 * Go source:
 * func CompareStringsCaseInsensitiveThenSensitive(a, b string) Comparison {
 * 	cmp := CompareStringsCaseInsensitive(a, b)
 * 	if cmp != ComparisonEqual {
 * 		return cmp
 * 	}
 * 	return CompareStringsCaseSensitive(a, b)
 * }
 */
export function CompareStringsCaseInsensitiveThenSensitive(a: string, b: string): Comparison {
  const cmp = CompareStringsCaseInsensitive(a, b);
  if (cmp !== ComparisonEqual) {
    return cmp;
  }
  return CompareStringsCaseSensitive(a, b);
}

/**
 * @tsgo-unit {"id":"github.com/microsoft/typescript-go::internal/stringutil/compare.go::func::CompareStringsCaseInsensitiveEslintCompatible","kind":"func","status":"implemented","sigHash":"3b8f3f2819c14afeb23608eba63b35a59a6a63a60e17063a7b5006ecce47999f"}
 *
 * Go source:
 * func CompareStringsCaseInsensitiveEslintCompatible(a, b string) Comparison {
 * 	if a == b {
 * 		return ComparisonEqual
 * 	}
 * 	a = strings.ToLower(a)
 * 	b = strings.ToLower(b)
 * 	return strings.Compare(a, b)
 * }
 */
export function CompareStringsCaseInsensitiveEslintCompatible(a: string, b: string): Comparison {
  if (a === b) {
    return ComparisonEqual;
  }
  a = ToLower(a);
  b = ToLower(b);
  return Compare(a, b);
}
