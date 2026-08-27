import type { bool, gostring, int, int32 } from "@gotots/runtime/scalars.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function EquateStringCaseInsensitive(a: gostring, b: gostring): bool {
    return strings__from_gostdlib.EqualFold(a, b);
}
export function EquateStringCaseSensitive(a: gostring, b: gostring): bool {
    return a === b;
}
export function GetStringEqualityComparer(ignoreCase: bool): (($0: gostring, $1: gostring) => bool) | undefined {
    if (ignoreCase) {
        return EquateStringCaseInsensitive;
    }
    return EquateStringCaseSensitive;
}
export const ComparisonLessThan: int = -1;
export const ComparisonEqual: int = 0;
export const ComparisonGreaterThan: int = 1;
export function CompareStringsCaseInsensitive(a: gostring, b: gostring): int {
    if (a === b) {
        return ComparisonEqual;
    }
    for (;;) {
        const __gotots_results_0 = utf8__from_gostdlib.DecodeRuneInString(a);
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let ca = __gotots_results_1[0];
        let sa = __gotots_results_1[1];
        const __gotots_results_2 = utf8__from_gostdlib.DecodeRuneInString(b);
        const __gotots_results_3 = [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
            int32,
            int
        ];
        let cb = __gotots_results_3[0];
        let sb = __gotots_results_3[1];
        if (sa === 0) {
            if (sb === 0) {
                return ComparisonEqual;
            }
            return ComparisonLessThan;
        }
        if (sb === 0) {
            return ComparisonGreaterThan;
        }
        let lca = unicode__from_gostdlib.ToLower(ca);
        let lcb = unicode__from_gostdlib.ToLower(cb);
        if (lca !== lcb) {
            if (lca < lcb) {
                return ComparisonLessThan;
            }
            return ComparisonGreaterThan;
        }
        a = goStringSlice(a, sa);
        b = goStringSlice(b, sb);
    }
}
export function CompareStringsCaseSensitive(a: gostring, b: gostring): int {
    return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(a, b)));
}
export function GetStringComparer(ignoreCase: bool): (($0: gostring, $1: gostring) => int) | undefined {
    if (ignoreCase) {
        return CompareStringsCaseInsensitive;
    }
    return CompareStringsCaseSensitive;
}
export function HasPrefix(s: gostring, prefix: gostring, caseSensitive: bool): bool {
    if (caseSensitive) {
        return strings__from_gostdlib.HasPrefix(s, prefix);
    }
    if (prefix.length > s.length) {
        return false;
    }
    return strings__from_gostdlib.EqualFold(goStringSlice(s, 0, prefix.length), prefix);
}
export function HasSuffix(s: gostring, suffix: gostring, caseSensitive: bool): bool {
    if (caseSensitive) {
        return strings__from_gostdlib.HasSuffix(s, suffix);
    }
    if (suffix.length > s.length) {
        return false;
    }
    return strings__from_gostdlib.EqualFold(goStringSlice(s, s.length - suffix.length), suffix);
}
export function HasPrefixAndSuffixWithoutOverlap(s: gostring, prefix: gostring, suffix: gostring, caseSensitive: bool): bool {
    if (prefix.length + suffix.length > s.length) {
        return false;
    }
    return HasPrefix(s, prefix, caseSensitive) && HasSuffix(s, suffix, caseSensitive);
}
export function CompareStringsCaseInsensitiveEslintCompatible(a: gostring, b: gostring): int {
    if (a === b) {
        return ComparisonEqual;
    }
    a = strings__from_gostdlib.ToLower(a);
    b = strings__from_gostdlib.ToLower(b);
    return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Compare(a, b)));
}
