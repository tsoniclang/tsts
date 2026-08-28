import type { Base$Storage as Base__from_language__package_1$Storage, Region$Storage as Region__from_language__package_1$Storage, Script$Storage as Script__from_language__package_1$Storage, Tag$Storage as Tag__from_language__package_1$Storage } from "./language.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, uint16 } from "@gotots/runtime/scalars.js";
import { BaseLanguages as BaseLanguages__from_language, NumRegions$int as NumRegions$int__from_language, NumScripts$int as NumScripts$int__from_language } from "../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import { $goInterfaceMethod$BaseLanguages$void_to_SliceOf_Named_language__package_1$Base, $goInterfaceMethod$Regions$void_to_SliceOf_Named_language__package_1$Region, $goInterfaceMethod$Scripts$void_to_SliceOf_Named_language__package_1$Script, $goInterfaceMethod$Tags$void_to_SliceOf_Named_language__package_1$Tag } from "../../../../../support/interface-methods.js";
import { Base, Region, Script } from "./language.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
export interface Coverage extends GoInterfaceValue {
    BaseLanguages(): RuntimeSlice<Base__from_language__package_1$Storage>;
    Regions(): RuntimeSlice<Region__from_language__package_1$Storage>;
    Scripts(): RuntimeSlice<Script__from_language__package_1$Storage>;
    Tags(): RuntimeSlice<Tag__from_language__package_1$Storage>;
}
export const Coverage$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$BaseLanguages$void_to_SliceOf_Named_language__package_1$Base, $goInterfaceMethod$Regions$void_to_SliceOf_Named_language__package_1$Region, $goInterfaceMethod$Scripts$void_to_SliceOf_Named_language__package_1$Script, $goInterfaceMethod$Tags$void_to_SliceOf_Named_language__package_1$Tag]);
export function Coverage$is(value: GoInterfaceValue | undefined): value is Coverage {
    return value !== undefined && value.$go$implements(Coverage$contract);
}
export class allSubtags {
    declare private readonly $goType: void;
    public constructor() {
    }
    static $equal($left: allSubtags, $right: allSubtags): bool {
        return true;
    }
    static $hash($source: allSubtags): number {
        let $hash = 2166136261;
        return $hash;
    }
    declare private readonly then?: never;
    BaseLanguages(): RuntimeSlice<Base__from_language__package_1$Storage> {
        let bs = BaseLanguages__from_language();
        const __gotots_slice_build_0 = goSliceAllocate<Base__from_language__package_1$Storage>(bs.length, null);
        for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
            __gotots_slice_build_0.$initialize(__gotots_slice_build_1, Base.$storageOf(Base.$zero()));
        }
        let base = __gotots_slice_build_0;
        const __gotots_range_0 = bs;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let b = __gotots_range_value_1;
            base.set(i, (void Base.$storageOf, (void Base.$fromStorage,
                {
                    langID: b
                })));
        }
        return base;
    }
    Regions(): RuntimeSlice<Region__from_language__package_1$Storage> {
        const __gotots_slice_build_2 = goSliceAllocate<Region__from_language__package_1$Storage>(NumRegions$int__from_language, null);
        for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_2.capacity; __gotots_slice_build_3++) {
            __gotots_slice_build_2.$initialize(__gotots_slice_build_3, Region.$storageOf(Region.$zero()));
        }
        let reg = __gotots_slice_build_2;
        const __gotots_range_1 = reg;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_2 = __gotots_range_index_1;
            let i = __gotots_range_value_2;
            reg.set(i, (void Region.$storageOf, (void Region.$fromStorage,
                {
                    regionID: i + 1 & 65535
                })));
        }
        return reg;
    }
    Scripts(): RuntimeSlice<Script__from_language__package_1$Storage> {
        const __gotots_slice_build_4 = goSliceAllocate<Script__from_language__package_1$Storage>(NumScripts$int__from_language, null);
        for (let __gotots_slice_build_5 = 0; __gotots_slice_build_5 < __gotots_slice_build_4.capacity; __gotots_slice_build_5++) {
            __gotots_slice_build_4.$initialize(__gotots_slice_build_5, Script.$storageOf(Script.$zero()));
        }
        let scr = __gotots_slice_build_4;
        const __gotots_range_2 = scr;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_3 = __gotots_range_index_2;
            let i = __gotots_range_value_3;
            scr.set(i, (void Script.$storageOf, (void Script.$fromStorage,
                {
                    scriptID: i + 1 & 65535
                })));
        }
        return scr;
    }
    Tags(): RuntimeSlice<Tag__from_language__package_1$Storage> {
        return RuntimeSlice.nil<Tag__from_language__package_1$Storage>();
    }
}
