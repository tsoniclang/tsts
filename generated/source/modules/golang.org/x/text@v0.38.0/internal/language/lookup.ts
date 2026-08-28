import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { $goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct$ProviderContract as GoProviderProfileBridge$ProviderContract } from "../../../../../../support/provider-interface-bridges.js";
import type { AliasType } from "./common.js";
import type { FromTo$Storage as FromTo__from_language$Storage } from "./tables.js";
import type { bool, gostring, int, uint, uint16, uint64, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/state.js";
import { Compare as Compare__from_tag, FixCase as FixCase__from_tag, Index as Index__from_tag } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/tag/package.js";
import { $goInterfaceAdapter$Named_language$ValueError, $goInterfaceAdapter$PointerTo_Named_bytes$Buffer, $goInterfaceAdapter$int as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { $goProviderProfileBridge$Named_error$Using$Error$Direct, $goProviderInterfaceBridge$Named_error as GoProviderInterfaceBridge, $goProviderProfileBridge$Named_io$Writer$Using$Error$Direct$And$io_Writer$Direct as GoProviderProfileBridge } from "../../../../../../support/provider-interface-bridges.js";
import { AliasTypeUnknown$constant } from "./common.js";
import { Make, Tag } from "./language.js";
import { NewValueError, ValueError, isAlpha } from "./parse.js";
import { FromTo, _XK$uint16, altLangISO3$constant, altRegionISO3, isoRegionOffset$uint16, lang$constant, langNoIndexOffset$uint, langNoIndexOffset$uint16, nRegionGroups$uint8, nonCanonicalUnd$uint16, regionISO$constant, script$constant } from "./tables.js";
import * as bytes__from_gostdlib from "@gotots/gostdlib/bytes.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import * as named_bytes from "@gotots/gostdlib/internal/facets/named-bytes.js";
import * as provider_fmt_writer from "@gotots/gostdlib/internal/facets/provider-fmt-writer.js";
import * as sort__from_gostdlib from "@gotots/gostdlib/sort.js";
import * as strconv__from_gostdlib from "@gotots/gostdlib/strconv.js";
import { GoArray, goArrayAllocate } from "@gotots/runtime/array.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerDivide, goNumberIntegerRemainder, goUint64 } from "@gotots/runtime/integer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goArraySlice } from "@gotots/runtime/slice.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export function Region_IsCountry(r: Region): bool {
    if (r === 0 || Region_IsGroup(r) || Region_IsPrivateUse(r) && !(r === _XK$uint16)) {
        return false;
    }
    return true;
}
export function Region_IsGroup(r: Region): bool {
    if (r === 0) {
        return false;
    }
    return $state.regionInclusion.get(r) < 33;
}
export function Region_Contains(r: Region, c: Region): bool {
    if (r === c) {
        return true;
    }
    let g = $state.regionInclusion.get(r);
    if (g >= nRegionGroups$uint8) {
        return false;
    }
    let m = $state.regionContainment.get(g);
    let d = $state.regionInclusion.get(c);
    let b = $state.regionInclusionBits.get(d);
    if (d >= nRegionGroups$uint8) {
        return goUint64(b & m) !== 0n;
    }
    return goUint64(b & ~m) === 0n;
}
export function Region_Canonicalize(r: Region): Region {
    {
        let cr = normRegion(r);
        if (!(cr === 0)) {
            return cr;
        }
    }
    return r;
}
export function findIndex(idx: Index__from_tag, key: RuntimeSlice<uint8>, form: gostring): [
    int,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    let index: int = 0;
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = void 0;
    if (!FixCase__from_tag(form, key)) {
        return [0, $state.ErrSyntax];
    }
    let i = idx.Index(key);
    if (i === -1) {
        return [0, new $goInterfaceAdapter$Named_language$ValueError(NewValueError(key))];
    }
    return [i, void 0];
}
export type Language = uint16;
export function getLangID(s: RuntimeSlice<uint8>): [
    Language,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    if (s.length === 2) {
        return getLangISO2(s);
    }
    return getLangISO3(s);
}
export function Language_Canonicalize(id: Language): [
    Language,
    AliasType
] {
    return normLang(id);
}
export function normLang(id: Language): [
    Language,
    AliasType
] {
    const __gotots_callee_0 = (i: int): bool => {
        return (void FromTo.$storageOf, (void FromTo.$fromStorage,
            $state.AliasMap.get(i))).From >= id;
    };
    let k = globalThis.Number(BigInt.asIntN(64, sort__from_gostdlib.Search(BigInt.asIntN(64, goNumberToBigInt(193)), __gotots_callee_0 === undefined ? undefined : $providerArgument0 => {
        return __gotots_callee_0(globalThis.Number(BigInt.asIntN(64, $providerArgument0)));
    })));
    if (k < 193 && (void FromTo.$storageOf, (void FromTo.$fromStorage,
        $state.AliasMap.get(k))).From === id) {
        return [(void FromTo.$storageOf, (void FromTo.$fromStorage,
                $state.AliasMap.get(k))).To, $state.AliasTypes.get(k)];
    }
    return [id, AliasTypeUnknown$constant()];
}
export function getLangISO2(s: RuntimeSlice<uint8>): [
    Language,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    if (!FixCase__from_tag("zz", s)) {
        return [0, $state.ErrSyntax];
    }
    {
        let i = lang$constant().Index(s);
        if (i !== -1 && goStringIndex(lang$constant().Elem(i), 3) !== 0) {
            return [i & 65535, void 0];
        }
    }
    return [0, new $goInterfaceAdapter$Named_language$ValueError(NewValueError(s))];
}
export const base$uint: uint = 26;
export function strToInt(s: RuntimeSlice<uint8>): uint {
    let v = 0;
    for (let i = 0; i < s.length; i++) {
        v = v * base$uint;
        v += s.get(i) - 97;
    }
    return v;
}
export function intToStr(v: uint, s: RuntimeSlice<uint8>): void {
    for (let i = s.length - 1; i >= 0; i--) {
        s.set(i, (goNumberIntegerRemainder(v, base$uint) & 255) + 97);
        v = goNumberIntegerDivide(v, base$uint);
    }
}
export function getLangISO3(s: RuntimeSlice<uint8>): [
    Language,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    if (FixCase__from_tag("und", s)) {
        for (let i = lang$constant().Index(s.slice(0, 2, null)); i !== -1; i = lang$constant().Next(s.slice(0, 2, null), i)) {
            {
                let e = lang$constant().Elem(i);
                if (goStringIndex(e, 3) === 0 && goStringIndex(e, 2) === s.get(2)) {
                    let id = i & 65535;
                    if (id === nonCanonicalUnd$uint16) {
                        return [0, void 0];
                    }
                    return [id, void 0];
                }
            }
        }
        {
            let i = altLangISO3$constant().Index(s);
            if (i !== -1) {
                return [$state.altLangIndex.get(goStringIndex(altLangISO3$constant().Elem(i), 3)), void 0];
            }
        }
        let n = strToInt(s);
        if (($state.langNoIndex.get(goNumberIntegerDivide(n, 8)) & ((goNumberIntegerRemainder(n, 8)) < 0 ? GoPanic.raiseRuntime("negative shift amount") : (goNumberIntegerRemainder(n, 8)) >= 8 ? 0 : (1 & 255) << (goNumberIntegerRemainder(n, 8)) & 255)) !== 0) {
            return [(n & 65535) + langNoIndexOffset$uint16, void 0];
        }
        for (let i = lang$constant().Index(s.slice(0, 1, null)); i !== -1; i = lang$constant().Next(s.slice(0, 1, null), i)) {
            {
                let e = lang$constant().Elem(i);
                if (goStringIndex(e, 2) === s.get(1) && goStringIndex(e, 3) === s.get(2)) {
                    return [i & 65535, void 0];
                }
            }
        }
        return [0, new $goInterfaceAdapter$Named_language$ValueError(NewValueError(s))];
    }
    return [0, $state.ErrSyntax];
}
export function Language_StringToBuf(id: Language, b: RuntimeSlice<uint8>): int {
    if (id >= langNoIndexOffset$uint16) {
        intToStr(id - langNoIndexOffset$uint, b.slice(0, 3, null));
        return 3;
    }
    else if (id === 0) {
        const __gotots_slice_build_0 = b;
        const __gotots_slice_build_1 = "und";
        const __gotots_slice_build_2 = globalThis.Math.min(__gotots_slice_build_0.length, __gotots_slice_build_1.length);
        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2; __gotots_slice_build_3++) {
            __gotots_slice_build_0.set(__gotots_slice_build_3, __gotots_slice_build_1.charCodeAt(__gotots_slice_build_3));
        }
        return __gotots_slice_build_2;
    }
    let l = new Index__from_tag(goStringSlice(lang$constant().$value, id << 2));
    if (goStringIndex(l.$value, 3) === 0) {
        const __gotots_slice_build_4 = b;
        const __gotots_slice_build_5 = ((void Index__from_tag,
            goStringSlice(l.$value, 0, 3)) as string);
        const __gotots_slice_build_6 = globalThis.Math.min(__gotots_slice_build_4.length, __gotots_slice_build_5.length);
        for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_6; __gotots_slice_build_7++) {
            __gotots_slice_build_4.set(__gotots_slice_build_7, __gotots_slice_build_5.charCodeAt(__gotots_slice_build_7));
        }
        return __gotots_slice_build_6;
    }
    const __gotots_slice_build_8 = b;
    const __gotots_slice_build_9 = ((void Index__from_tag,
        goStringSlice(l.$value, 0, 2)) as string);
    const __gotots_slice_build_10 = globalThis.Math.min(__gotots_slice_build_8.length, __gotots_slice_build_9.length);
    for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_10; __gotots_slice_build_11++) {
        __gotots_slice_build_8.set(__gotots_slice_build_11, __gotots_slice_build_9.charCodeAt(__gotots_slice_build_11));
    }
    return __gotots_slice_build_10;
}
export function Language_String(b: Language): gostring {
    if (b === 0) {
        return "und";
    }
    else if (b >= langNoIndexOffset$uint16) {
        b = b - 1330;
        let buf = GoArray.literal<uint8, 3>(3, 0, [], []);
        intToStr(b, goArraySlice(buf, 0, null, null));
        const __gotots_conversion_0 = goArraySlice(buf, 0, null, null);
        let __gotots_conversion_1 = "";
        for (let __gotots_conversion_2 = 0; __gotots_conversion_2 < __gotots_conversion_0.length; __gotots_conversion_2++) {
            __gotots_conversion_1 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_0.get(__gotots_conversion_2)));
        }
        return __gotots_conversion_1;
    }
    let l = lang$constant().Elem(b);
    if (goStringIndex(l, 3) === 0) {
        return goStringSlice(l, 0, 3);
    }
    return goStringSlice(l, 0, 2);
}
export function Language_SuppressScript(b: Language): Script {
    if (b < langNoIndexOffset$uint16) {
        return $state.suppressScript.get(b);
    }
    return 0;
}
export type Region = uint16;
export function getRegionID(s: RuntimeSlice<uint8>): [
    Region,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    if (s.length === 3) {
        if (isAlpha(s.get(0))) {
            return getRegionISO3(s);
        }
        {
            const __gotots_conversion_3 = s;
            let __gotots_conversion_4 = "";
            for (let __gotots_conversion_5 = 0; __gotots_conversion_5 < __gotots_conversion_3.length; __gotots_conversion_5++) {
                __gotots_conversion_4 += globalThis.String.fromCharCode(globalThis.Number(__gotots_conversion_3.get(__gotots_conversion_5)));
            }
            const __gotots_argument_0 = __gotots_conversion_4;
            const __gotots_argument_1 = 10;
            const __gotots_argument_2 = 10;
            const __gotots_results_2 = strconv__from_gostdlib.ParseUint(__gotots_argument_0, BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_1)), BigInt.asIntN(64, goNumberToBigInt(__gotots_argument_2)));
            const __gotots_results_3 = [__gotots_results_2[0], GoProviderInterfaceBridge.$from(__gotots_results_2[1])] satisfies [
                uint64,
                $goInterface$Interface_Method_Error_void_to_string | undefined
            ];
            let i = __gotots_results_3[0];
            let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_3[1];
            if (err === undefined) {
                return getRegionM49(globalThis.Number(BigInt.asIntN(64, i)));
            }
        }
    }
    return getRegionISO2(s);
}
export function getRegionISO2(s: RuntimeSlice<uint8>): [
    Region,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    const __gotots_results_4 = findIndex(regionISO$constant(), s, "ZZ");
    let i = __gotots_results_4[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_4[1];
    if (!(err === undefined)) {
        return [0, err];
    }
    return [(i & 65535) + isoRegionOffset$uint16, void 0];
}
export function getRegionISO3(s: RuntimeSlice<uint8>): [
    Region,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    if (FixCase__from_tag("ZZZ", s)) {
        for (let i = regionISO$constant().Index(s.slice(0, 1, null)); i !== -1; i = regionISO$constant().Next(s.slice(0, 1, null), i)) {
            {
                let e = regionISO$constant().Elem(i);
                if (goStringIndex(e, 2) === s.get(1) && goStringIndex(e, 3) === s.get(2)) {
                    return [(i & 65535) + isoRegionOffset$uint16, void 0];
                }
            }
        }
        for (let i = 0; i < 33; i += 3) {
            if (Compare__from_tag(goStringSlice(altRegionISO3, i, i + 3), s) === 0) {
                return [$state.altRegionIDs.get(goNumberIntegerDivide(i, 3)), void 0];
            }
        }
        return [0, new $goInterfaceAdapter$Named_language$ValueError(NewValueError(s))];
    }
    return [0, $state.ErrSyntax];
}
export function getRegionM49(n: int): [
    Region,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    if (0 < n && n <= 999) {
        const searchBits$int: int = 7;
        const regionBits$uint16: uint16 = 9;
        const regionMask$uint16: uint16 = 511;
        let idx = n >> searchBits$int;
        let buf = goArraySlice($state.fromM49, $state.m49Index.get(idx), $state.m49Index.get(idx + 1), null);
        let val = (n & 65535) << regionBits$uint16;
        const __gotots_callee_2 = (i__shadow_1: int): bool => {
            return buf.get(i__shadow_1) >= val;
        };
        let i = globalThis.Number(BigInt.asIntN(64, sort__from_gostdlib.Search(BigInt.asIntN(64, goNumberToBigInt(buf.length)), __gotots_callee_2 === undefined ? undefined : $providerArgument0 => {
            return __gotots_callee_2(globalThis.Number(BigInt.asIntN(64, $providerArgument0)));
        })));
        {
            let r = $state.fromM49.get($state.m49Index.get(idx) + i);
            if ((r & ~regionMask$uint16) === val) {
                return [r & regionMask$uint16, void 0];
            }
        }
    }
    let e = ValueError.$zero();
    const __gotots_conversion_6 = bytes__from_gostdlib.NewBuffer(goArraySlice(e.v, 0, null, null));
    const __gotots_argument_3 = new $goInterfaceAdapter$PointerTo_Named_bytes$Buffer(__gotots_conversion_6 === undefined ? undefined :
        tsonicTypeScriptRuntime.boundLocation<bytes__from_gostdlib.Buffer>(__gotots_conversion_6, (): bytes__from_gostdlib.Buffer => {
            return __gotots_conversion_6;
        }, ($go$providerPointerValue: bytes__from_gostdlib.Buffer): void => {
            named_bytes.BytesBufferOperations.$assign(__gotots_conversion_6, $go$providerPointerValue);
        }));
    const __gotots_argument_4 = RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(n)]);
    provider_fmt_writer.FprintDirect<$goProviderProfileBridge$Named_error$Using$Error$Direct$ProviderContract, GoProviderProfileBridge$ProviderContract>(GoProviderProfileBridge.$to(__gotots_argument_3), __gotots_argument_4);
    return [0, new $goInterfaceAdapter$Named_language$ValueError(ValueError.$copy(e))];
}
export function normRegion(r: Region): Region {
    const __gotots_array_build_0 = $state.regionOldMap;
    const __gotots_array_build_1 = goArrayAllocate<FromTo__from_language$Storage, 20>(20);
    for (let __gotots_array_build_2 = 0; __gotots_array_build_2 < 20; __gotots_array_build_2++) {
        __gotots_array_build_1.set(__gotots_array_build_2, FromTo.$storageOf(FromTo.$copy(FromTo.$fromStorage(__gotots_array_build_0.get(__gotots_array_build_2)))));
    }
    let m = __gotots_array_build_1;
    const __gotots_callee_1 = (i: int): bool => {
        return (void FromTo.$storageOf, (void FromTo.$fromStorage,
            m.get(i))).From >= r;
    };
    let k = globalThis.Number(BigInt.asIntN(64, sort__from_gostdlib.Search(BigInt.asIntN(64, goNumberToBigInt(20)), __gotots_callee_1 === undefined ? undefined : $providerArgument0 => {
        return __gotots_callee_1(globalThis.Number(BigInt.asIntN(64, $providerArgument0)));
    })));
    if (k < 20 && (void FromTo.$storageOf, (void FromTo.$fromStorage,
        m.get(k))).From === r) {
        return (void FromTo.$storageOf, (void FromTo.$fromStorage,
            m.get(k))).To;
    }
    return 0;
}
export const iso3166UserAssigned$uint8: uint8 = 1;
export function Region_typ(r: Region): uint8 {
    return $state.regionTypes.get(r);
}
export function Region_String(r: Region): gostring {
    if (r < isoRegionOffset$uint16) {
        if (r === 0) {
            return "ZZ";
        }
        return fmt__from_gostdlib.Sprintf("%03d", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Region_M49(r))]));
    }
    r = r - 32;
    return goStringSlice(regionISO$constant().Elem(r), 0, 2);
}
export function Region_M49(r: Region): int {
    return $state.m49.get(r);
}
export function Region_IsPrivateUse(r: Region): bool {
    return (Region_typ(r) & iso3166UserAssigned$uint8) !== 0;
}
export type Script = uint16;
export function getScriptID(idx: Index__from_tag, s: RuntimeSlice<uint8>): [
    Script,
    $goInterface$Interface_Method_Error_void_to_string | undefined
] {
    const __gotots_results_1 = findIndex(idx, s, "Zzzz");
    let i = __gotots_results_1[0];
    let err: $goInterface$Interface_Method_Error_void_to_string | undefined = __gotots_results_1[1];
    return [i & 65535, err];
}
export function Script_String(s: Script): gostring {
    if (s === 0) {
        return "Zzzz";
    }
    return script$constant().Elem(s);
}
export const maxAltTaglen: int = 11;
export function grandfathered(s: GoArray<uint8, 11>): [
    Tag,
    bool
] {
    let t: Tag = Tag.$zero();
    let ok: bool = false;
    {
        const __gotots_results_0 = $state.grandfatheredMap.lookupOk(s);
        let v = __gotots_results_0[0];
        let ok__shadow_1 = __gotots_results_0[1];
        if (ok__shadow_1) {
            if (v < 0) {
                return [Make(goStringSlice($state.altTags, $state.altTagIndex.get(-v - 1), $state.altTagIndex.get(-v))), true];
            }
            Tag.$storageOf(t).LangID = v & 65535;
            return [Tag.$copy(t), true];
        }
    }
    return [Tag.$copy(t), false];
}
