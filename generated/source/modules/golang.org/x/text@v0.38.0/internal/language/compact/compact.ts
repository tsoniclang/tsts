import type { Tag$Storage as Tag__from_language$Storage } from "../../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import type { bool, int, uint16 } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/compact/state.js";
import { CompactCoreInfo_Tag as CompactCoreInfo_Tag__from_language, GetCompactCore as GetCompactCore__from_language, MustParse as MustParse__from_language, Tag as Tag__from_language } from "../../../../../../../packages/golang.org/x/text@v0.38.0/internal/language/package.js";
import { specialTagsStr } from "./tables.js";
import * as sort__from_gostdlib from "@gotots/gostdlib/sort.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goSliceAllocate } from "@gotots/runtime/slice.js";
export type ID = uint16;
export function getCoreIndex(t: Tag__from_language): [
    ID,
    bool
] {
    let id: ID = 0;
    let ok: bool = false;
    const __gotots_results_0 = GetCompactCore__from_language(Tag__from_language.$copy(t));
    let cci = __gotots_results_0[0];
    ok = __gotots_results_0[1];
    if (!ok) {
        return [0, false];
    }
    const __gotots_callee_0 = (i__shadow_1: int): bool => {
        return cci <= $state.coreTags.get(i__shadow_1);
    };
    let i = globalThis.Number(BigInt.asIntN(64, sort__from_gostdlib.Search(BigInt.asIntN(64, goNumberToBigInt($state.coreTags.length)), __gotots_callee_0 === undefined ? undefined : $providerArgument0 => {
        return __gotots_callee_0(globalThis.Number(BigInt.asIntN(64, $providerArgument0)));
    })));
    if (i === $state.coreTags.length || !($state.coreTags.get(i) === cci)) {
        return [0, false];
    }
    return [i & 65535, true];
}
export function ID_Tag(id: ID): Tag__from_language {
    if (id >= $state.coreTags.length) {
        return Tag__from_language.$copy(Tag__from_language.$fromStorage($state.specialTags.get(id - $state.coreTags.length)));
    }
    return CompactCoreInfo_Tag__from_language($state.coreTags.get(id));
}
export function init(): void {
    let tags = strings__from_gostdlib.Split(specialTagsStr, " ");
    const __gotots_slice_build_0 = goSliceAllocate<Tag__from_language$Storage>(tags.length, null);
    for (let __gotots_slice_build_1 = 0; __gotots_slice_build_1 < __gotots_slice_build_0.capacity; __gotots_slice_build_1++) {
        __gotots_slice_build_0.$initialize(__gotots_slice_build_1, Tag__from_language.$storageOf(Tag__from_language.$zero()));
    }
    $state.specialTags = __gotots_slice_build_0;
    const __gotots_range_0 = tags;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let t = __gotots_range_value_1;
        $state.specialTags.set(i, Tag__from_language.$storageOf(MustParse__from_language(t)));
    }
}
