import type { Language } from "./lookup.js";
import { $state } from "../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/state.js";
import { NumLanguages$int, langNoIndexOffset$int, nonCanonicalUnd$int } from "./tables.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function BaseLanguages(): RuntimeSlice<Language> {
    let base__shadow_1 = RuntimeSlice.make<Language>(0, NumLanguages$int, 0);
    for (let i__shadow_1 = 0; i__shadow_1 < langNoIndexOffset$int; i__shadow_1++) {
        if (i__shadow_1 !== nonCanonicalUnd$int) {
            base__shadow_1 = base__shadow_1.append(0, [i__shadow_1 & 65535]);
        }
    }
    let i = langNoIndexOffset$int;
    const __gotots_range_0 = $state.langNoIndex.copy();
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < 2197; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let v = __gotots_range_value_0;
        for (let k = 0; k < 8; k++) {
            if ((v & 1) === 1) {
                base__shadow_1 = base__shadow_1.append(0, [i & 65535]);
            }
            v = v >> 1;
            i++;
        }
    }
    return base__shadow_1;
}
