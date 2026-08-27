import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FromTo$Storage as FromTo__from_language$Storage, Language as Language__from_language, Region as Region__from_language, Script as Script__from_language } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import type { Tag$Storage as Tag__from_language__package_1$Storage } from "./language.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int, uint16, uint8 } from "@gotots/runtime/scalars.js";
import { $state as $state__language, Builder as Builder__from_language, FromTo as FromTo__from_language, Macro$constant as Macro$constant__from_language, Region_Contains as Region_Contains__from_language, Region_String as Region_String__from_language, Tag as Tag__from_language } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import { $state } from "../../../../../packages/golang.org/x/text@v0.38.0/language/state.js";
import { $goInterfaceAdapter$PointerTo_Named_language__package_1$matcher as GoInterfaceAdapter } from "../../../../../support/interface-adapters.js";
import { $goInterfaceMethod$Match$Variadic_SliceOf_Named_language__package_1$Tag_to_Named_language__package_1$Tag_int_Named_language__package_1$Confidence } from "../../../../../support/interface-methods.js";
import { $goMap$MapOf_Named_language$Language_To_PointerTo_Named_language__package_1$matchHeader as GoMap } from "../../../../../support/maps.js";
import { All$constant, CanonType, Confidence, Exact$constant, High$constant, Low$constant, No$constant, Script, Tag, canonicalize, makeTag } from "./language.js";
import { mutualIntelligibility, regionIntelligibility, scriptIntelligibility } from "./tables.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goArrayAllocate } from "@gotots/runtime/array.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAddress } from "@gotots/runtime/slice.js";
export class MatchOption {
    declare private readonly $goType: void;
    constructor(public readonly $value: (($0: matcher | undefined) => void) | undefined) {
    }
    declare private readonly then?: never;
}
export interface Matcher extends GoInterfaceValue {
    Match($argument0: RuntimeSlice<Tag__from_language__package_1$Storage>): [
        Tag,
        int,
        Confidence
    ];
}
export const Matcher$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$Match$Variadic_SliceOf_Named_language__package_1$Tag_to_Named_language__package_1$Tag_int_Named_language__package_1$Confidence]);
export function Matcher$is(value: GoInterfaceValue | undefined): value is Matcher {
    return value !== undefined && value.$go$implements(Matcher$contract);
}
export function NewMatcher(t: RuntimeSlice<Tag__from_language__package_1$Storage>, options: RuntimeSlice<MatchOption>): Matcher | undefined {
    return new GoInterfaceAdapter(newMatcher(t, options));
}
export class matcher {
    declare private readonly $goType: void;
    public constructor(public default_: haveTag | undefined, public supported: RuntimeSlice<haveTag | undefined>, public index: GoMapValue<Language__from_language, matchHeader | undefined>, public passSettings: bool, public preferSameScript: bool) {
    }
    declare private readonly then?: never;
    static Match(m: matcher | undefined, want: RuntimeSlice<Tag__from_language__package_1$Storage>): [
        Tag,
        int,
        Confidence
    ] {
        let t: Tag = Tag.$zero();
        let index: int = 0;
        let c: Confidence = new Confidence(0);
        let tt = Tag__from_language.$zero();
        const tt$location = tsonicTypeScriptRuntime.boundLocation({}, () => tt, tt$next => tt = tt$next);
        const __gotots_results_6 = matcher.$go$private$language__package_1$getBest(m, want);
        let match: haveTag | undefined = __gotots_results_6[0];
        let w = __gotots_results_6[1];
        c = __gotots_results_6[2];
        if (!(match === undefined)) {
            const __gotots_assign_0 = Tag__from_language.$copy((match ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag);
            const __gotots_assign_1 = (match ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index;
            tt = __gotots_assign_0;
            index = __gotots_assign_1;
        }
        else {
            tt = Tag__from_language.$copy(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).default_ ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag);
            if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).preferSameScript) {
                const __gotots_range_12 = want;
                outer: for (let __gotots_range_index_12 = 0; __gotots_range_index_12 < __gotots_range_12.length; __gotots_range_index_12++) {
                    const __gotots_range_value_17 = Tag.$copy(Tag.$fromStorage(__gotots_range_12.get(__gotots_range_index_12)));
                    let w__shadow_1 = __gotots_range_value_17;
                    const __gotots_results_7 = w__shadow_1.Script();
                    let script = __gotots_results_7[0];
                    if (Script.$storageOf(script).scriptID === 0) {
                        continue;
                    }
                    const __gotots_range_13 = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).supported;
                    for (let __gotots_range_index_13 = 0; __gotots_range_index_13 < __gotots_range_13.length; __gotots_range_index_13++) {
                        const __gotots_range_value_18 = __gotots_range_index_13;
                        const __gotots_range_value_19 = __gotots_range_13.get(__gotots_range_index_13);
                        let i = __gotots_range_value_18;
                        let h: haveTag | undefined = __gotots_range_value_19;
                        if (Script.$storageOf(script).scriptID === (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxScript) {
                            const __gotots_assign_2 = Tag__from_language.$copy((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag);
                            const __gotots_assign_3 = i;
                            tt = __gotots_assign_2;
                            index = __gotots_assign_3;
                            break outer;
                        }
                    }
                }
            }
        }
        if (!(Tag__from_language.$storageOf(w).RegionID === Tag__from_language.$storageOf(tt).RegionID) && !(Tag__from_language.$storageOf(w).RegionID === 0)) {
            if (!(Tag__from_language.$storageOf(w).RegionID === 0) && !(Tag__from_language.$storageOf(tt).RegionID === 0) && Region_Contains__from_language(Tag__from_language.$storageOf(tt).RegionID, Tag__from_language.$storageOf(w).RegionID)) {
                Tag__from_language.$storageOf(tt).RegionID = Tag__from_language.$storageOf(w).RegionID;
                Tag__from_language.RemakeString(tt$location);
            }
            else {
                let r = Region_String__from_language(Tag__from_language.$storageOf(w).RegionID);
                if (r.length === 2) {
                    const __gotots_results_8 = tt.SetTypeForKey("rg", strings__from_gostdlib.ToLower(r) + "zzzz");
                    tt = __gotots_results_8[0];
                }
            }
        }
        {
            let e = w.Extensions();
            if (e.length > 0) {
                const __gotots_struct_2 = Builder__from_language.$zero();
                let b = __gotots_struct_2;
                Builder__from_language.SetTag(b, Tag__from_language.$copy(tt));
                const __gotots_range_14 = e;
                for (let __gotots_range_index_14 = 0; __gotots_range_index_14 < __gotots_range_14.length; __gotots_range_index_14++) {
                    const __gotots_range_value_20 = __gotots_range_14.get(__gotots_range_index_14);
                    let e__shadow_1 = __gotots_range_value_20;
                    Builder__from_language.AddExt(b, e__shadow_1);
                }
                tt = Builder__from_language.Make(b);
            }
        }
        return [makeTag(Tag__from_language.$copy(tt)), index, c];
    }
    static $go$private$language__package_1$getBest(m: matcher | undefined, want: RuntimeSlice<Tag__from_language__package_1$Storage>): [
        haveTag | undefined,
        Tag__from_language,
        Confidence
    ] {
        let got: haveTag | undefined = void 0;
        let orig: Tag__from_language = Tag__from_language.$zero();
        let c: Confidence = new Confidence(0);
        let best = new bestMatch(void 0, Tag__from_language.$zero(), new Confidence(0), 0, false, false, false, false, false, 0, false);
        const __gotots_range_15 = want;
        for (let __gotots_range_index_15 = 0; __gotots_range_index_15 < __gotots_range_15.length; __gotots_range_index_15++) {
            const __gotots_range_value_21 = __gotots_range_index_15;
            const __gotots_range_value_22 = Tag.$copy(Tag.$fromStorage(__gotots_range_15.get(__gotots_range_index_15)));
            let i = __gotots_range_value_21;
            let ww = __gotots_range_value_22;
            const ww$location = tsonicTypeScriptRuntime.boundLocation({}, () => ww, ww$next => ww = ww$next);
            let w = Tag.$go$private$language__package_1$tag(ww$location);
            let max = Tag__from_language.$zero();
            let h: matchHeader | undefined = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index.lookup(Tag__from_language.$storageOf(w).LangID);
            if (!(Tag__from_language.$storageOf(w).LangID === 0)) {
                if (h === undefined) {
                    continue;
                }
                const __gotots_results_9 = canonicalize(new CanonType(55), Tag__from_language.$copy(w));
                max = __gotots_results_9[0];
                if (!(Tag__from_language.$storageOf(w).RegionID === Tag__from_language.$storageOf(max).RegionID)) {
                    Tag__from_language.$storageOf(w).RegionID = Tag__from_language.$storageOf(max).RegionID;
                }
                const __gotots_results_10 = max.Maximize();
                max = __gotots_results_10[0];
            }
            else {
                if (!(h === undefined)) {
                    const __gotots_range_16 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags;
                    for (let __gotots_range_index_16 = 0; __gotots_range_index_16 < __gotots_range_16.length; __gotots_range_index_16++) {
                        const __gotots_range_value_23 = __gotots_range_index_16;
                        let i__shadow_1 = __gotots_range_value_23;
                        let have: haveTag | undefined = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.get(i__shadow_1);
                        if (equalsRest(Tag__from_language.$copy((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag), Tag__from_language.$copy(w))) {
                            return [have, Tag__from_language.$copy(w), Exact$constant()];
                        }
                    }
                }
                if (Tag__from_language.$storageOf(w).ScriptID === 0 && Tag__from_language.$storageOf(w).RegionID === 0) {
                    continue;
                }
                const __gotots_results_11 = w.Maximize();
                max = __gotots_results_11[0];
                {
                    h = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index.lookup(Tag__from_language.$storageOf(max).LangID);
                    if (h === undefined) {
                        continue;
                    }
                }
            }
            let pin = true;
            const __gotots_range_17 = want.slice(i + 1, null, null);
            for (let __gotots_range_index_17 = 0; __gotots_range_index_17 < __gotots_range_17.length; __gotots_range_index_17++) {
                const __gotots_range_value_24 = Tag.$copy(Tag.$fromStorage(__gotots_range_17.get(__gotots_range_index_17)));
                let t = __gotots_range_value_24;
                const t$location = tsonicTypeScriptRuntime.boundLocation({}, () => t, t$next => t = t$next);
                if (Tag__from_language.$storageOf(w).LangID === Tag.$go$private$language__package_1$lang(t$location)) {
                    pin = false;
                    break;
                }
            }
            const __gotots_range_18 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags;
            for (let __gotots_range_index_18 = 0; __gotots_range_index_18 < __gotots_range_18.length; __gotots_range_index_18++) {
                const __gotots_range_value_25 = __gotots_range_index_18;
                let i__shadow_1 = __gotots_range_value_25;
                let have: haveTag | undefined = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.get(i__shadow_1);
                bestMatch.$go$private$language__package_1$update(best, have, Tag__from_language.$copy(w), Tag__from_language.$storageOf(max).ScriptID, Tag__from_language.$storageOf(max).RegionID, pin);
                if (best.conf.$value === Exact$constant().$value) {
                    for (; (have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextMax !== 0;) {
                        have = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.get((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextMax);
                        bestMatch.$go$private$language__package_1$update(best, have, Tag__from_language.$copy(w), Tag__from_language.$storageOf(max).ScriptID, Tag__from_language.$storageOf(max).RegionID, pin);
                    }
                    return [best.have, Tag__from_language.$copy(best.want), best.conf];
                }
            }
        }
        if (best.conf.$value <= No$constant().$value) {
            if (want.length !== 0) {
                return [void 0, Tag.$go$private$language__package_1$tag(tsonicTypeScriptRuntime.projectLocation<Tag__from_language__package_1$Storage, Tag>(goSliceAddress<Tag__from_language__package_1$Storage>(want, 0), ($go$storage: Tag__from_language__package_1$Storage): Tag => {
                        return Tag.$fromStorage($go$storage);
                    }, ($go$value: Tag): Tag__from_language__package_1$Storage => {
                        return Tag.$storageOf($go$value);
                    })), No$constant()];
            }
            const __gotots_results_12 = void 0;
            const __gotots_struct_3 = Tag__from_language.$zero();
            const __gotots_results_13 = __gotots_struct_3;
            const __gotots_results_14 = No$constant();
            return [__gotots_results_12, __gotots_results_13, __gotots_results_14];
        }
        return [best.have, Tag__from_language.$copy(best.want), best.conf];
    }
    static $go$private$language__package_1$header(m: matcher | undefined, l: Language__from_language): matchHeader | undefined {
        {
            let h__shadow_1: matchHeader | undefined = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index.lookup(l);
            if (!(h__shadow_1 === undefined)) {
                return h__shadow_1;
            }
        }
        let h: matchHeader | undefined = new matchHeader(RuntimeSlice.nil<haveTag | undefined>(), false);
        (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index.store(l, h);
        return h;
    }
}
export class matchHeader {
    declare private readonly $goType: void;
    public constructor(public haveTags: RuntimeSlice<haveTag | undefined>, public original: bool) {
    }
    declare private readonly then?: never;
    static $go$private$language__package_1$addIfNew(h: matchHeader | undefined, n: haveTag, exact: bool): void {
        (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).original = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).original || exact;
        const __gotots_range_10 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags;
        for (let __gotots_range_index_10 = 0; __gotots_range_index_10 < __gotots_range_10.length; __gotots_range_index_10++) {
            const __gotots_range_value_14 = __gotots_range_10.get(__gotots_range_index_10);
            let v: haveTag | undefined = __gotots_range_value_14;
            if (equalsRest(Tag__from_language.$copy((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag), Tag__from_language.$copy(n.tag))) {
                return;
            }
        }
        const __gotots_range_11 = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags;
        for (let __gotots_range_index_11 = 0; __gotots_range_index_11 < __gotots_range_11.length; __gotots_range_index_11++) {
            const __gotots_range_value_15 = __gotots_range_index_11;
            const __gotots_range_value_16 = __gotots_range_11.get(__gotots_range_index_11);
            let i = __gotots_range_value_15;
            let v: haveTag | undefined = __gotots_range_value_16;
            if ((v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxScript === n.maxScript && (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxRegion === n.maxRegion && (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag.VariantOrPrivateUseTags() === n.tag.VariantOrPrivateUseTags()) {
                for (; ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextMax !== 0;) {
                    i = ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextMax;
                }
                ((h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).nextMax = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.length & 65535;
                break;
            }
        }
        (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags = (h ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.append(void 0, [n,]);
    }
}
export class haveTag {
    declare private readonly $goType: void;
    public constructor(public tag: Tag__from_language, public index: int, public conf: Confidence, public maxRegion: Region__from_language, public maxScript: Script__from_language, public altScript: Script__from_language, public nextMax: uint16) {
    }
    static $copy($source: haveTag): haveTag {
        return new haveTag(Tag__from_language.$copy($source.tag), $source.index, $source.conf, $source.maxRegion, $source.maxScript, $source.altScript, $source.nextMax);
    }
    declare private readonly then?: never;
}
export function makeHaveTag(tag: Tag__from_language, index: int): [
    haveTag,
    Language__from_language
] {
    let max = Tag__from_language.$copy(tag);
    const max$location = tsonicTypeScriptRuntime.boundLocation({}, () => max, max$next => max = max$next);
    if (!(Tag__from_language.$storageOf(tag).LangID === 0) || !(Tag__from_language.$storageOf(tag).RegionID === 0) || !(Tag__from_language.$storageOf(tag).ScriptID === 0)) {
        const __gotots_results_4 = canonicalize(All$constant(), Tag__from_language.$copy(max));
        max = __gotots_results_4[0];
        const __gotots_results_5 = max.Maximize();
        max = __gotots_results_5[0];
        Tag__from_language.RemakeString(max$location);
    }
    return [new haveTag(Tag__from_language.$copy(tag), index, Exact$constant(), Tag__from_language.$storageOf(max).RegionID, Tag__from_language.$storageOf(max).ScriptID, altScript(Tag__from_language.$storageOf(max).LangID, Tag__from_language.$storageOf(max).ScriptID), 0), Tag__from_language.$storageOf(max).LangID];
}
export function altScript(l: Language__from_language, s: Script__from_language): Script__from_language {
    const __gotots_range_8 = $state.matchScript;
    for (let __gotots_range_index_8 = 0; __gotots_range_index_8 < __gotots_range_8.length; __gotots_range_index_8++) {
        const __gotots_range_value_12 = scriptIntelligibility.$copy(scriptIntelligibility.$fromStorage(__gotots_range_8.get(__gotots_range_index_8)));
        let alt = __gotots_range_value_12;
        if ((scriptIntelligibility.$storageOf(alt).wantLang === l || scriptIntelligibility.$storageOf(alt).haveLang === l) && scriptIntelligibility.$storageOf(alt).haveScript === s) {
            return scriptIntelligibility.$storageOf(alt).wantScript;
        }
    }
    return 0;
}
export function toConf(d: uint8): Confidence {
    if (d <= 10) {
        return High$constant();
    }
    if (d < 30) {
        return Low$constant();
    }
    return No$constant();
}
export function newMatcher(supported: RuntimeSlice<Tag__from_language__package_1$Storage>, options: RuntimeSlice<MatchOption>): matcher | undefined {
    let m: matcher | undefined = new matcher(void 0, RuntimeSlice.nil<haveTag | undefined>(), GoMap.make(0, []), false, true);
    const __gotots_range_2 = options;
    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
        const __gotots_range_value_3 = __gotots_range_2.get(__gotots_range_index_2);
        let o: MatchOption = __gotots_range_value_3;
        const __gotots_callee_0 = o.$value;
        const __gotots_argument_0 = m;
        (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
    }
    if (supported.length === 0) {
        (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).default_ = new haveTag(Tag__from_language.$zero(), 0, new Confidence(0), 0, 0, 0, 0);
        return m;
    }
    const __gotots_range_3 = supported;
    for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
        const __gotots_range_value_4 = __gotots_range_index_3;
        const __gotots_range_value_5 = Tag.$copy(Tag.$fromStorage(__gotots_range_3.get(__gotots_range_index_3)));
        let i = __gotots_range_value_4;
        let tag = __gotots_range_value_5;
        const tag$location = tsonicTypeScriptRuntime.boundLocation({}, () => tag, tag$next => tag = tag$next);
        let tt = Tag.$go$private$language__package_1$tag(tag$location);
        const __gotots_results_2 = makeHaveTag(Tag__from_language.$copy(tt), i);
        let pair = __gotots_results_2[0];
        matchHeader.$go$private$language__package_1$addIfNew(matcher.$go$private$language__package_1$header(m, Tag__from_language.$storageOf(tt).LangID), haveTag.$copy(pair), true);
        (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).supported = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).supported.append(void 0, [pair,]);
    }
    (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).default_ = (matcher.$go$private$language__package_1$header(m, Tag.$go$private$language__package_1$lang(tsonicTypeScriptRuntime.projectLocation<Tag__from_language__package_1$Storage, Tag>(goSliceAddress<Tag__from_language__package_1$Storage>(supported, 0), ($go$storage: Tag__from_language__package_1$Storage): Tag => {
        return Tag.$fromStorage($go$storage);
    }, ($go$value: Tag): Tag__from_language__package_1$Storage => {
        return Tag.$storageOf($go$value);
    }))) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags.get(0);
    const __gotots_range_4 = supported;
    for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
        const __gotots_range_value_6 = __gotots_range_index_4;
        const __gotots_range_value_7 = Tag.$copy(Tag.$fromStorage(__gotots_range_4.get(__gotots_range_index_4)));
        let i = __gotots_range_value_6;
        let tag = __gotots_range_value_7;
        const tag$location2 = tsonicTypeScriptRuntime.boundLocation({}, () => tag, tag$next2 => tag = tag$next2);
        let tt = Tag.$go$private$language__package_1$tag(tag$location2);
        const __gotots_results_3 = makeHaveTag(Tag__from_language.$copy(tt), i);
        let pair = __gotots_results_3[0];
        let max = __gotots_results_3[1];
        if (!(max === Tag__from_language.$storageOf(tt).LangID)) {
            matchHeader.$go$private$language__package_1$addIfNew(matcher.$go$private$language__package_1$header(m, max), haveTag.$copy(pair), true);
        }
    }
    let update__shadow_1: (($0: uint16, $1: uint16, $2: Confidence) => void) | undefined = (want: uint16, have: uint16, conf: Confidence): void => {
        {
            let hh: matchHeader | undefined = (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).index.lookup(have);
            if (!(hh === undefined)) {
                if (!(hh ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).original) {
                    return;
                }
                let hw: matchHeader | undefined = matcher.$go$private$language__package_1$header(m, want);
                const __gotots_range_5 = (hh ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).haveTags;
                for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
                    const __gotots_range_value_8 = __gotots_range_5.get(__gotots_range_index_5);
                    let ht: haveTag | undefined = __gotots_range_value_8;
                    let v = haveTag.$copy(haveTag.$copy((ht ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))));
                    if (conf.$value < v.conf.$value) {
                        v.conf = conf;
                    }
                    v.nextMax = 0;
                    if (!(v.altScript === 0)) {
                        v.altScript = altScript(want, v.maxScript);
                    }
                    matchHeader.$go$private$language__package_1$addIfNew(hw, haveTag.$copy(v), conf.$value === Exact$constant().$value && (hh ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).original);
                }
            }
        }
    };
    const __gotots_range_6 = $state.matchLang;
    for (let __gotots_range_index_6 = 0; __gotots_range_index_6 < __gotots_range_6.length; __gotots_range_index_6++) {
        const __gotots_range_value_9 = mutualIntelligibility.$copy(mutualIntelligibility.$fromStorage(__gotots_range_6.get(__gotots_range_index_6)));
        let ml = __gotots_range_value_9;
        const __gotots_callee_1 = update__shadow_1;
        const __gotots_argument_1 = mutualIntelligibility.$storageOf(ml).want;
        const __gotots_argument_2 = mutualIntelligibility.$storageOf(ml).have;
        const __gotots_argument_3 = toConf(mutualIntelligibility.$storageOf(ml).distance);
        (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3);
        if (!mutualIntelligibility.$storageOf(ml).oneway) {
            const __gotots_callee_2 = update__shadow_1;
            const __gotots_argument_4 = mutualIntelligibility.$storageOf(ml).have;
            const __gotots_argument_5 = mutualIntelligibility.$storageOf(ml).want;
            const __gotots_argument_6 = toConf(mutualIntelligibility.$storageOf(ml).distance);
            (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_4, __gotots_argument_5, __gotots_argument_6);
        }
    }
    const __gotots_array_build_3 = $state__language.AliasMap;
    const __gotots_array_build_4 = goArrayAllocate<FromTo__from_language$Storage, 193>(193);
    for (let __gotots_array_build_5 = 0; __gotots_array_build_5 < 193; __gotots_array_build_5++) {
        __gotots_array_build_4.set(__gotots_array_build_5, FromTo__from_language.$storageOf(FromTo__from_language.$copy(FromTo__from_language.$fromStorage(__gotots_array_build_3.get(__gotots_array_build_5)))));
    }
    const __gotots_range_7 = __gotots_array_build_4;
    for (let __gotots_range_index_7 = 0; __gotots_range_index_7 < 193; __gotots_range_index_7++) {
        const __gotots_range_value_10 = __gotots_range_index_7;
        const __gotots_range_value_11 = FromTo__from_language.$copy(FromTo__from_language.$fromStorage(__gotots_range_7.get(__gotots_range_index_7)));
        let i = __gotots_range_value_10;
        let lm = __gotots_range_value_11;
        let conf = Exact$constant();
        if (!($state__language.AliasTypes.get(i) === Macro$constant__from_language())) {
            if (!isExactEquivalent(FromTo__from_language.$storageOf(lm).From)) {
                conf = High$constant();
            }
            const __gotots_callee_3 = update__shadow_1;
            const __gotots_argument_7 = FromTo__from_language.$storageOf(lm).To;
            const __gotots_argument_8 = FromTo__from_language.$storageOf(lm).From;
            const __gotots_argument_9 = conf;
            (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_7, __gotots_argument_8, __gotots_argument_9);
        }
        const __gotots_callee_4 = update__shadow_1;
        const __gotots_argument_10 = FromTo__from_language.$storageOf(lm).From;
        const __gotots_argument_11 = FromTo__from_language.$storageOf(lm).To;
        const __gotots_argument_12 = conf;
        (__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
    }
    return m;
}
export class bestMatch {
    declare private readonly $goType: void;
    public constructor(public have: haveTag | undefined, public want: Tag__from_language, public conf: Confidence, public pinnedRegion: Region__from_language, public pinLanguage: bool, public sameRegionGroup: bool, public origLang: bool, public origReg: bool, public paradigmReg: bool, public regGroupDist: uint8, public origScript: bool) {
    }
    declare private readonly then?: never;
    static $go$private$language__package_1$update(m: bestMatch | undefined, have: haveTag | undefined, tag: Tag__from_language, maxScript: Script__from_language, maxRegion: Region__from_language, pin: bool): void {
        let c = (have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conf;
        if (c.$value < (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conf.$value) {
            return;
        }
        if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pinLanguage && !(Tag__from_language.$storageOf(tag).LangID === Tag__from_language.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).want).LangID)) {
            return;
        }
        if (Tag__from_language.$storageOf(tag).LangID === Tag__from_language.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).want).LangID && (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sameRegionGroup) {
            const __gotots_results_15 = regionGroupDist((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pinnedRegion, (have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxRegion, (have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxScript, Tag__from_language.$storageOf((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).want).LangID);
            let sameGroup__shadow_1 = __gotots_results_15[1];
            if (!sameGroup__shadow_1) {
                return;
            }
        }
        if (c.$value === Exact$constant().$value && (have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxScript === maxScript) {
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pinLanguage = pin;
        }
        if (equalsRest(Tag__from_language.$copy((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag), Tag__from_language.$copy(tag))) {
        }
        else if (!((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxScript === maxScript)) {
            if (Low$constant().$value < (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conf.$value || !((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).altScript === maxScript)) {
                return;
            }
            c = Low$constant();
        }
        else if (!((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxRegion === maxRegion)) {
            if (High$constant().$value < c.$value) {
                c = High$constant();
            }
        }
        let beaten = false;
        if (!(c.$value === (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conf.$value)) {
            if (c.$value < (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conf.$value) {
                return;
            }
            beaten = true;
        }
        let origLang = Tag__from_language.$storageOf((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag).LangID === Tag__from_language.$storageOf(tag).LangID && !(Tag__from_language.$storageOf(tag).LangID === 0);
        if (!beaten && (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origLang !== origLang) {
            if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origLang) {
                return;
            }
            beaten = true;
        }
        let origReg = Tag__from_language.$storageOf((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag).RegionID === Tag__from_language.$storageOf(tag).RegionID && !(Tag__from_language.$storageOf(tag).RegionID === 0);
        if (!beaten && (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origReg !== origReg) {
            if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origReg) {
                return;
            }
            beaten = true;
        }
        const __gotots_results_16 = regionGroupDist((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxRegion, maxRegion, maxScript, Tag__from_language.$storageOf(tag).LangID);
        let regGroupDist = __gotots_results_16[0];
        let sameGroup = __gotots_results_16[1];
        if (!beaten && (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).regGroupDist !== regGroupDist) {
            if (regGroupDist > (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).regGroupDist) {
                return;
            }
            beaten = true;
        }
        let paradigmReg = isParadigmLocale(Tag__from_language.$storageOf(tag).LangID, (have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).maxRegion);
        if (!beaten && (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).paradigmReg !== paradigmReg) {
            if (!paradigmReg) {
                return;
            }
            beaten = true;
        }
        let origScript = Tag__from_language.$storageOf((have ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).tag).ScriptID === Tag__from_language.$storageOf(tag).ScriptID && !(Tag__from_language.$storageOf(tag).ScriptID === 0);
        if (!beaten && (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origScript !== origScript) {
            if ((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origScript) {
                return;
            }
            beaten = true;
        }
        if (beaten) {
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).have = have;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).want = Tag__from_language.$copy(tag);
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).conf = c;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).pinnedRegion = maxRegion;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).sameRegionGroup = sameGroup;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origLang = origLang;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origReg = origReg;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).paradigmReg = paradigmReg;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).origScript = origScript;
            (m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).regGroupDist = regGroupDist;
        }
    }
}
export function isParadigmLocale(lang: Language__from_language, r: Region__from_language): bool {
    const __gotots_range_20 = $state.paradigmLocales;
    for (let __gotots_range_index_20 = 0; __gotots_range_index_20 < __gotots_range_20.length; __gotots_range_index_20++) {
        const __gotots_range_value_27 = __gotots_range_20.get(__gotots_range_index_20).copy();
        let e = __gotots_range_value_27;
        if (e.get(0) === lang && (r === e.get(1) || r === e.get(2))) {
            return true;
        }
    }
    return false;
}
export function regionGroupDist(a: Region__from_language, b: Region__from_language, script: Script__from_language, lang: Language__from_language): [
    uint8,
    bool
] {
    let dist: uint8 = 0;
    let same: bool = false;
    const defaultDistance$uint8: uint8 = 4;
    let aGroup = $state.regionToGroups.get(a) << 1;
    let bGroup = $state.regionToGroups.get(b) << 1;
    const __gotots_range_19 = $state.matchRegion;
    for (let __gotots_range_index_19 = 0; __gotots_range_index_19 < __gotots_range_19.length; __gotots_range_index_19++) {
        const __gotots_range_value_26 = regionIntelligibility.$copy(regionIntelligibility.$fromStorage(__gotots_range_19.get(__gotots_range_index_19)));
        let ri = __gotots_range_value_26;
        if (regionIntelligibility.$storageOf(ri).lang === lang && (regionIntelligibility.$storageOf(ri).script === 0 || regionIntelligibility.$storageOf(ri).script === script)) {
            let group = (regionIntelligibility.$storageOf(ri).group & ~128) < 0 ? GoPanic.raiseRuntime("negative shift amount") : (regionIntelligibility.$storageOf(ri).group & ~128) >= 64 ? 0 : 1 << (regionIntelligibility.$storageOf(ri).group & ~128);
            if ((128 & regionIntelligibility.$storageOf(ri).group) === 0) {
                if ((aGroup & bGroup & group) !== 0) {
                    return [regionIntelligibility.$storageOf(ri).distance, regionIntelligibility.$storageOf(ri).distance === defaultDistance$uint8];
                }
            }
            else {
                if (((aGroup | bGroup) & group) === 0) {
                    return [regionIntelligibility.$storageOf(ri).distance, regionIntelligibility.$storageOf(ri).distance === defaultDistance$uint8];
                }
            }
        }
    }
    return [defaultDistance$uint8, true];
}
export function equalsRest(a: Tag__from_language, b: Tag__from_language): bool {
    return Tag__from_language.$storageOf(a).ScriptID === Tag__from_language.$storageOf(b).ScriptID && Tag__from_language.$storageOf(a).RegionID === Tag__from_language.$storageOf(b).RegionID && a.VariantOrPrivateUseTags() === b.VariantOrPrivateUseTags();
}
export function isExactEquivalent(l: Language__from_language): bool {
    const __gotots_range_9 = $state.notEquivalent;
    for (let __gotots_range_index_9 = 0; __gotots_range_index_9 < __gotots_range_9.length; __gotots_range_index_9++) {
        const __gotots_range_value_13 = __gotots_range_9.get(__gotots_range_index_9);
        let o = __gotots_range_value_13;
        if (o === l) {
            return false;
        }
    }
    return true;
}
export function init(): void {
    const __gotots_array_build_0 = $state__language.AliasMap;
    const __gotots_array_build_1 = goArrayAllocate<FromTo__from_language$Storage, 193>(193);
    for (let __gotots_array_build_2 = 0; __gotots_array_build_2 < 193; __gotots_array_build_2++) {
        __gotots_array_build_1.set(__gotots_array_build_2, FromTo__from_language.$storageOf(FromTo__from_language.$copy(FromTo__from_language.$fromStorage(__gotots_array_build_0.get(__gotots_array_build_2)))));
    }
    const __gotots_range_0 = __gotots_array_build_1;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < 193; __gotots_range_index_0++) {
        const __gotots_range_value_0 = FromTo__from_language.$copy(FromTo__from_language.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
        let lm = __gotots_range_value_0;
        const __gotots_field_0 = FromTo__from_language.$storageOf(lm).From;
        const __gotots_struct_0 = Tag__from_language.$zero();
        Tag__from_language.$storageOf(__gotots_struct_0).LangID = __gotots_field_0;
        let tag = __gotots_struct_0;
        {
            const __gotots_results_0 = canonicalize(All$constant(), Tag__from_language.$copy(tag));
            tag = __gotots_results_0[0];
            if (!(Tag__from_language.$storageOf(tag).ScriptID === 0) || !(Tag__from_language.$storageOf(tag).RegionID === 0)) {
                $state.notEquivalent = $state.notEquivalent.append(0, [FromTo__from_language.$storageOf(lm).From]);
            }
        }
    }
    const __gotots_range_1 = $state.paradigmLocales;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_index_1;
        const __gotots_range_value_2 = __gotots_range_1.get(__gotots_range_index_1).copy();
        let i = __gotots_range_value_1;
        let v = __gotots_range_value_2;
        const __gotots_field_1 = v.get(0);
        const __gotots_struct_1 = Tag__from_language.$zero();
        Tag__from_language.$storageOf(__gotots_struct_1).LangID = __gotots_field_1;
        let t = __gotots_struct_1;
        const __gotots_results_1 = t.Maximize();
        let max = __gotots_results_1[0];
        if (v.get(1) === 0) {
            $state.paradigmLocales.get(i).set(1, Tag__from_language.$storageOf(max).RegionID);
        }
        if (v.get(2) === 0) {
            $state.paradigmLocales.get(i).set(2, Tag__from_language.$storageOf(max).RegionID);
        }
    }
}
