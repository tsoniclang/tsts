import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { bool, gostring, int, int32, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/state.js";
import * as named_strings from "@gotots/gostdlib/internal/facets/named-strings.js";
import * as regexp__from_gostdlib from "@gotots/gostdlib/regexp.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import * as utf16__from_gostdlib from "@gotots/gostdlib/unicode/utf16.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
import { goStringDecodeRune, goStringEncodeRune, goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function IsWhiteSpaceLike(ch: int32): bool {
    return IsWhiteSpaceSingleLine(ch) || IsLineBreak(ch);
}
export function IsWhiteSpaceSingleLine(ch: int32): bool {
    switch (ch) {
        case 32:
        case 9:
        case 11:
        case 12:
        case 133:
        case 160:
        case 5760:
        case 8192:
        case 8193:
        case 8194:
        case 8195:
        case 8196:
        case 8197:
        case 8198:
        case 8199:
        case 8200:
        case 8201:
        case 8202:
        case 8203:
        case 8239:
        case 8287:
        case 12288:
        case 65279: {
            return true;
            break;
        }
    }
    return false;
}
export function IsLineBreak(ch: int32): bool {
    switch (ch) {
        case 10:
        case 13:
        case 8232:
        case 8233: {
            return true;
            break;
        }
    }
    return false;
}
export function IsDigit(ch: int32): bool {
    return ch >= 48 && ch <= 57;
}
export function IsOctalDigit(ch: int32): bool {
    return ch >= 48 && ch <= 55;
}
export function IsHexDigit(ch: int32): bool {
    return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
}
export function IsASCIILetter(ch: int32): bool {
    return ch >= 65 && ch <= 90 || ch >= 97 && ch <= 122;
}
export function SplitLines(text: gostring): RuntimeSlice<gostring> {
    let lines = RuntimeSlice.make<gostring>(0, globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(text, "\n"))) + 1, "");
    let start = 0;
    let pos = 0;
    for (; pos < text.length;) {
        {
            const __gotots_switch_tag_0 = goStringIndex(text, pos);
            let __gotots_switch_selection_0 = -1;
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_0 = false;
                if (!__gotots_switch_match_0) {
                    __gotots_switch_match_0 = __gotots_switch_tag_0 === 13;
                }
                if (__gotots_switch_match_0) {
                    __gotots_switch_selection_0 = 0;
                }
            }
            if (__gotots_switch_selection_0 === -1) {
                let __gotots_switch_match_1 = false;
                if (!__gotots_switch_match_1) {
                    __gotots_switch_match_1 = __gotots_switch_tag_0 === 10;
                }
                if (__gotots_switch_match_1) {
                    __gotots_switch_selection_0 = 1;
                }
            }
            __gotots_control_target_0: {
                if (__gotots_switch_selection_0 === 0) {
                    if (pos + 1 < text.length && goStringIndex(text, pos + 1) === 10) {
                        lines = lines.append("", [goStringSlice(text, start, pos)]);
                        pos += 2;
                        start = pos;
                        continue;
                    }
                    __gotots_switch_selection_0 = 1;
                }
                if (__gotots_switch_selection_0 === 1) {
                    lines = lines.append("", [goStringSlice(text, start, pos)]);
                    pos++;
                    start = pos;
                    continue;
                    break __gotots_control_target_0;
                }
            }
        }
        pos++;
    }
    if (start < text.length) {
        lines = lines.append("", [goStringSlice(text, start)]);
    }
    return lines;
}
export function GuessIndentation(lines: RuntimeSlice<gostring>): int {
    const MAX_SMI_X86: int = 1073741823;
    let indentation = MAX_SMI_X86;
    const __gotots_range_0 = lines;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let line = __gotots_range_value_0;
        if (line.length === 0) {
            continue;
        }
        let i = 0;
        for (; i < line.length && i < indentation;) {
            const __gotots_results_8 = utf8__from_gostdlib.DecodeRuneInString(goStringSlice(line, i));
            const __gotots_results_9 = [__gotots_results_8[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_8[1]))] satisfies [
                int32,
                int
            ];
            let ch = __gotots_results_9[0];
            let size = __gotots_results_9[1];
            if (!IsWhiteSpaceLike(ch)) {
                break;
            }
            i += size;
        }
        if (i < indentation) {
            indentation = i;
        }
        if (indentation === 0) {
            return 0;
        }
    }
    if (indentation === MAX_SMI_X86) {
        return 0;
    }
    return indentation;
}
export function EncodeURI(s: gostring): gostring {
    let builder = named_strings.StringsBuilderOperations.$zero();
    const __gotots_range_1 = s.length;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        let i = __gotots_range_value_1;
        let b = goStringIndex(s, i);
        if (!shouldEscapeForEncodeURI(b)) {
            strings__from_gostdlib.Builder.WriteByte(builder, b);
            continue;
        }
        const __gotots_conversion_3 = goStringSlice(s, i, i + 1);
        const __gotots_conversion_4 = RuntimeSlice.make<uint8>(__gotots_conversion_3.length, null, 0);
        for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
            __gotots_conversion_4.set(__gotots_conversion_5, __gotots_conversion_3.charCodeAt(__gotots_conversion_5));
        }
        const __gotots_range_2 = __gotots_conversion_4;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let escaped = __gotots_range_value_2;
            strings__from_gostdlib.Builder.WriteByte(builder, 37);
            strings__from_gostdlib.Builder.WriteByte(builder, goStringIndex(upperhex$string, escaped >> 4));
            strings__from_gostdlib.Builder.WriteByte(builder, goStringIndex(upperhex$string, escaped & 15));
        }
    }
    return strings__from_gostdlib.Builder.String(builder);
}
export const upperhex$string: gostring = "0123456789ABCDEF";
export function shouldEscapeForEncodeURI(b: uint8): bool {
    __gotots_control_target_1: {
        if (b >= 65 && b <= 90) {
            return false;
        }
        else if (b >= 97 && b <= 122) {
            return false;
        }
        else if (b >= 48 && b <= 57) {
            return false;
        }
    }
    switch (b) {
        case 59:
        case 47:
        case 63:
        case 58:
        case 64:
        case 38:
        case 61:
        case 43:
        case 36:
        case 44:
        case 35:
        case 45:
        case 95:
        case 46:
        case 33:
        case 126:
        case 42:
        case 39:
        case 40:
        case 41: {
            return false;
            break;
        }
        default: {
            return true;
            break;
        }
    }
}
export function getByteOrderMarkLength(text: gostring): int {
    if (text.length >= 1) {
        let ch0 = goStringIndex(text, 0);
        if (ch0 === 254) {
            if (text.length >= 2 && goStringIndex(text, 1) === 255) {
                return 2;
            }
            return 0;
        }
        if (ch0 === 255) {
            if (text.length >= 2 && goStringIndex(text, 1) === 254) {
                return 2;
            }
            return 0;
        }
        if (ch0 === 239) {
            if (text.length >= 3 && goStringIndex(text, 1) === 187 && goStringIndex(text, 2) === 191) {
                return 3;
            }
            return 0;
        }
    }
    return 0;
}
export function AddUTF8ByteOrderMark(text: gostring): gostring {
    if (getByteOrderMarkLength(text) === 0) {
        return "\u00EF\u00BB\u00BF" + text;
    }
    return text;
}
export function StripQuotes(name: gostring): gostring {
    if (name.length < 2) {
        return name;
    }
    const __gotots_results_4 = utf8__from_gostdlib.DecodeRuneInString(name);
    const __gotots_results_5 = [__gotots_results_4[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_4[1]))] satisfies [
        int32,
        int
    ];
    let firstChar = __gotots_results_5[0];
    const __gotots_results_6 = utf8__from_gostdlib.DecodeLastRuneInString(name);
    const __gotots_results_7 = [__gotots_results_6[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_6[1]))] satisfies [
        int32,
        int
    ];
    let lastChar = __gotots_results_7[0];
    if (firstChar === lastChar && (firstChar === 39 || firstChar === 34 || firstChar === 96)) {
        return goStringSlice(name, 1, name.length - 1);
    }
    return name;
}
export function matchSlashReplacer(__go_in: gostring): gostring {
    return goStringSlice(__go_in, 1);
}
export function UnquoteString(str: gostring): gostring {
    let inner = StripQuotes(str);
    const __gotots_receiver_0 = $state.matchSlashSomething;
    return regexp__from_gostdlib.Regexp.ReplaceAllStringFunc(__gotots_receiver_0 === void 0 ? void 0 :
        (__gotots_receiver_0 as tsonicTypeScriptRuntime.Location<regexp__from_gostdlib.Regexp>).value, inner, matchSlashReplacer);
}
export function TruncateByRunes(str: gostring, maxLength: int): gostring {
    if (str.length < maxLength) {
        return str;
    }
    if (maxLength <= 0) {
        return "";
    }
    let runeCount = 0;
    const __gotots_range_3 = str;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length;) {
        const __gotots_range_decode_0 = goStringDecodeRune(__gotots_range_3, __gotots_range_index_3);
        const __gotots_range_value_3 = __gotots_range_index_3;
        let i = __gotots_range_value_3;
        __gotots_range_index_3 += __gotots_range_decode_0[1];
        runeCount++;
        if (runeCount > maxLength) {
            return goStringSlice(str, 0, i);
        }
    }
    return str;
}
export const SurrogateLowStart$int32: int32 = 56320;
export function IsHighSurrogate(ch: int32): bool {
    return utf16__from_gostdlib.IsSurrogate(ch) && ch < SurrogateLowStart$int32;
}
export function IsLowSurrogate(ch: int32): bool {
    return utf16__from_gostdlib.IsSurrogate(ch) && ch >= SurrogateLowStart$int32;
}
export function IsSurrogate(ch: int32): bool {
    return utf16__from_gostdlib.IsSurrogate(ch);
}
export function SurrogatePairToCodePoint(high: int32, low: int32): int32 {
    return utf16__from_gostdlib.DecodeRune(high, low);
}
export function CodePointToSurrogatePair(ch: int32): [
    int32,
    int32
] {
    let high: int32 = 0;
    let low: int32 = 0;
    return utf16__from_gostdlib.EncodeRune(ch);
}
export const surrogateUTF8Lead$uint8: uint8 = 237;
export const surrogateUTF8LeadBits$int32: int32 = 53248;
export const utf8ContMarker$int32: int32 = 128;
export const utf8ContMarker$uint8: uint8 = 128;
export const utf8ContMax$uint8: uint8 = 191;
export const utf8ContMask$int32: int32 = 63;
export const utf8ContMask$uint8: uint8 = 63;
export const surrogateUTF8Byte1Min$uint8: uint8 = 160;
export const surrogateUTF8Byte1Max$uint8: uint8 = 191;
export function EncodeJSStringRune(ch: int32): gostring {
    if (IsSurrogate(ch)) {
        const __gotots_conversion_0 = RuntimeSlice.literal<uint8>([surrogateUTF8Lead$uint8, (utf8ContMarker$int32 | ((ch >> 6) & utf8ContMask$int32)) & 255, (utf8ContMarker$int32 | (ch & utf8ContMask$int32)) & 255]);
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    }
    return goStringEncodeRune(ch);
}
export function DecodeJSStringRune(s: gostring): [
    int32,
    int
] {
    if (s.length >= 3 && goStringIndex(s, 0) === surrogateUTF8Lead$uint8 && goStringIndex(s, 1) >= surrogateUTF8Byte1Min$uint8 && goStringIndex(s, 1) <= surrogateUTF8Byte1Max$uint8 && goStringIndex(s, 2) >= utf8ContMarker$uint8 && goStringIndex(s, 2) <= utf8ContMax$uint8) {
        return [surrogateUTF8LeadBits$int32 | (goStringIndex(s, 1) & utf8ContMask$uint8) << 6 | goStringIndex(s, 2) & utf8ContMask$uint8, 3];
    }
    const __gotots_results_2 = utf8__from_gostdlib.DecodeRuneInString(s);
    return [__gotots_results_2[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_2[1]))] satisfies [
        int32,
        int
    ];
}
export function CombineSurrogatePairs(s: gostring): gostring {
    if (globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.IndexByte(s, surrogateUTF8Lead$uint8))) < 0) {
        return s;
    }
    let b = named_strings.StringsBuilderOperations.$zero();
    strings__from_gostdlib.Builder.Grow(b, BigInt.asIntN(64, goNumberToBigInt(s.length)));
    for (let i = 0; i < s.length;) {
        const __gotots_results_0 = DecodeJSStringRune(goStringSlice(s, i));
        let r = __gotots_results_0[0];
        let size = __gotots_results_0[1];
        if (IsHighSurrogate(r)) {
            {
                const __gotots_results_1 = DecodeJSStringRune(goStringSlice(s, i + size));
                let low = __gotots_results_1[0];
                let lowSize = __gotots_results_1[1];
                if (IsLowSurrogate(low)) {
                    strings__from_gostdlib.Builder.WriteRune(b, SurrogatePairToCodePoint(r, low));
                    i += size + lowSize;
                    continue;
                }
            }
        }
        strings__from_gostdlib.Builder.WriteString(b, goStringSlice(s, i, i + size));
        i += size;
    }
    return strings__from_gostdlib.Builder.String(b);
}
