import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, uint8 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/state.js";
import { Tag } from "./language.js";
import { Region_Contains } from "./lookup.js";
import { _en$uint16, langNoIndexOffset$uint16, likelyLangRegion, likelyLangScript, likelyScriptRegion, likelyTag, nRegionGroups$uint8 } from "./tables.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goArraySlice } from "@gotots/runtime/slice.js";
export const isList$uint8: uint8 = 1;
export const scriptInFrom$uint8: uint8 = 2;
export function specializeRegion(t: Tag | undefined): bool {
    {
        let i = $state.regionInclusion.get(Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).RegionID);
        if (i < nRegionGroups$uint8) {
            let x = likelyTag.$copy(likelyTag.$fromStorage($state.likelyRegionGroup.get(i)));
            if (likelyTag.$storageOf(x).lang === Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).LangID && likelyTag.$storageOf(x).script === Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).ScriptID) {
                Tag.$storageOf((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"))).RegionID = likelyTag.$storageOf(x).region;
            }
            return true;
        }
    }
    return false;
}
export function addTags(t: Tag): [
    Tag,
    GoInterface | undefined
] {
    if (t.IsPrivateUse()) {
        return [Tag.$copy(t), void 0];
    }
    if (!(Tag.$storageOf(t).ScriptID === 0) && !(Tag.$storageOf(t).RegionID === 0)) {
        if (!(Tag.$storageOf(t).LangID === 0)) {
            specializeRegion(t);
            return [Tag.$copy(t), void 0];
        }
        let list = goArraySlice($state.likelyRegion, Tag.$storageOf(t).RegionID, Tag.$storageOf(t).RegionID + 1, null);
        {
            let x = likelyLangScript.$copy(likelyLangScript.$fromStorage(list.get(0)));
            if ((likelyLangScript.$storageOf(x).flags & isList$uint8) !== 0) {
                list = goArraySlice($state.likelyRegionList, likelyLangScript.$storageOf(x).lang, likelyLangScript.$storageOf(x).lang + likelyLangScript.$storageOf(x).script, null);
            }
        }
        const __gotots_range_0 = list;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = likelyLangScript.$copy(likelyLangScript.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
            let x = __gotots_range_value_0;
            if (likelyLangScript.$storageOf(x).script === Tag.$storageOf(t).ScriptID) {
                Tag.$go$private$language$setUndefinedLang(t, likelyLangScript.$storageOf(x).lang);
                return [Tag.$copy(t), void 0];
            }
        }
    }
    if (!(Tag.$storageOf(t).LangID === 0)) {
        if (Tag.$storageOf(t).LangID < langNoIndexOffset$uint16) {
            let x = likelyScriptRegion.$copy(likelyScriptRegion.$fromStorage($state.likelyLang.get(Tag.$storageOf(t).LangID)));
            if ((likelyScriptRegion.$storageOf(x).flags & isList$uint8) !== 0) {
                let list = goArraySlice($state.likelyLangList, likelyScriptRegion.$storageOf(x).region, likelyScriptRegion.$storageOf(x).region + likelyScriptRegion.$storageOf(x).script, null);
                if (!(Tag.$storageOf(t).ScriptID === 0)) {
                    const __gotots_range_1 = list;
                    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                        const __gotots_range_value_1 = likelyScriptRegion.$copy(likelyScriptRegion.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
                        let x__shadow_1 = __gotots_range_value_1;
                        if (likelyScriptRegion.$storageOf(x__shadow_1).script === Tag.$storageOf(t).ScriptID && (likelyScriptRegion.$storageOf(x__shadow_1).flags & scriptInFrom$uint8) !== 0) {
                            Tag.$go$private$language$setUndefinedRegion(t, likelyScriptRegion.$storageOf(x__shadow_1).region);
                            return [Tag.$copy(t), void 0];
                        }
                    }
                }
                else if (!(Tag.$storageOf(t).RegionID === 0)) {
                    let count = 0;
                    let goodScript = true;
                    let tt = Tag.$copy(t);
                    const __gotots_range_2 = list;
                    for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                        const __gotots_range_value_2 = likelyScriptRegion.$copy(likelyScriptRegion.$fromStorage(__gotots_range_2.get(__gotots_range_index_2)));
                        let x__shadow_1 = __gotots_range_value_2;
                        if ((likelyScriptRegion.$storageOf(x__shadow_1).flags & scriptInFrom$uint8) === 0 && Region_Contains(Tag.$storageOf(t).RegionID, likelyScriptRegion.$storageOf(x__shadow_1).region)) {
                            Tag.$storageOf(tt).RegionID = likelyScriptRegion.$storageOf(x__shadow_1).region;
                            Tag.$go$private$language$setUndefinedScript(tt, likelyScriptRegion.$storageOf(x__shadow_1).script);
                            goodScript = goodScript && Tag.$storageOf(tt).ScriptID === likelyScriptRegion.$storageOf(x__shadow_1).script;
                            count++;
                        }
                    }
                    if (count === 1) {
                        return [Tag.$copy(tt), void 0];
                    }
                    if (goodScript) {
                        Tag.$storageOf(t).ScriptID = Tag.$storageOf(tt).ScriptID;
                    }
                }
            }
        }
    }
    else {
        if (!(Tag.$storageOf(t).ScriptID === 0)) {
            let x = likelyLangRegion.$copy(likelyLangRegion.$fromStorage($state.likelyScript.get(Tag.$storageOf(t).ScriptID)));
            if (likelyLangRegion.$storageOf(x).region !== 0) {
                Tag.$go$private$language$setUndefinedRegion(t, likelyLangRegion.$storageOf(x).region);
                Tag.$go$private$language$setUndefinedLang(t, likelyLangRegion.$storageOf(x).lang);
                return [Tag.$copy(t), void 0];
            }
        }
        if (!(Tag.$storageOf(t).RegionID === 0)) {
            {
                let i = $state.regionInclusion.get(Tag.$storageOf(t).RegionID);
                if (i < nRegionGroups$uint8) {
                    let x = likelyTag.$copy(likelyTag.$fromStorage($state.likelyRegionGroup.get(i)));
                    if (likelyTag.$storageOf(x).region !== 0) {
                        Tag.$go$private$language$setUndefinedLang(t, likelyTag.$storageOf(x).lang);
                        Tag.$go$private$language$setUndefinedScript(t, likelyTag.$storageOf(x).script);
                        Tag.$storageOf(t).RegionID = likelyTag.$storageOf(x).region;
                    }
                }
                else {
                    let x = likelyLangScript.$copy(likelyLangScript.$fromStorage($state.likelyRegion.get(Tag.$storageOf(t).RegionID)));
                    if ((likelyLangScript.$storageOf(x).flags & isList$uint8) !== 0) {
                        x = likelyLangScript.$copy(likelyLangScript.$fromStorage($state.likelyRegionList.get(likelyLangScript.$storageOf(x).lang)));
                    }
                    if (likelyLangScript.$storageOf(x).script !== 0 && likelyLangScript.$storageOf(x).flags !== scriptInFrom$uint8) {
                        Tag.$go$private$language$setUndefinedLang(t, likelyLangScript.$storageOf(x).lang);
                        Tag.$go$private$language$setUndefinedScript(t, likelyLangScript.$storageOf(x).script);
                        return [Tag.$copy(t), void 0];
                    }
                }
            }
        }
    }
    if (Tag.$storageOf(t).LangID < langNoIndexOffset$uint16) {
        let x = likelyScriptRegion.$copy(likelyScriptRegion.$fromStorage($state.likelyLang.get(Tag.$storageOf(t).LangID)));
        if ((likelyScriptRegion.$storageOf(x).flags & isList$uint8) !== 0) {
            x = likelyScriptRegion.$copy(likelyScriptRegion.$fromStorage($state.likelyLangList.get(likelyScriptRegion.$storageOf(x).region)));
        }
        if (likelyScriptRegion.$storageOf(x).region !== 0) {
            Tag.$go$private$language$setUndefinedScript(t, likelyScriptRegion.$storageOf(x).script);
            Tag.$go$private$language$setUndefinedRegion(t, likelyScriptRegion.$storageOf(x).region);
        }
        specializeRegion(t);
        if (Tag.$storageOf(t).LangID === 0) {
            Tag.$storageOf(t).LangID = _en$uint16;
        }
        return [Tag.$copy(t), void 0];
    }
    return [Tag.$copy(t), $state.ErrMissingLikelyTagsData];
}
