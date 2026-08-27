import type { Tag$Storage as Tag__from_language__package_1$Storage } from "../../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { $state as $state__language__package_1, All$constant as All$constant__from_language__package_1, Base as Base__from_language__package_1, High$constant as High$constant__from_language__package_1, Raw$constant as Raw$constant__from_language__package_1, Region as Region__from_language__package_1, Script as Script__from_language__package_1, Tag as Tag__from_language__package_1 } from "../../../../../../packages/golang.org/x/text@v0.38.0/language/package.js";
import { $goInterfaceAdapter$Named_language__package_1$Region, $goInterfaceAdapter$Named_language__package_1$Script, $goInterfaceAdapter$Named_language__package_1$Tag, $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension, $goInterfaceAdapter$Named_language__package_1$Base as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as sort__from_gostdlib from "@gotots/gostdlib/sort.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function MatchLang(t: Tag__from_language__package_1, tags: RuntimeSlice<Tag__from_language__package_1$Storage>): int {
    const __gotots_results_0 = All$constant__from_language__package_1().Canonicalize(Tag__from_language__package_1.$copy(t));
    t = __gotots_results_0[0];
    const __gotots_results_1 = t.Base();
    let base = __gotots_results_1[0];
    let conf = __gotots_results_1[1];
    if (conf.$value < High$constant__from_language__package_1().$value) {
        return 0;
    }
    {
        const __gotots_results_2 = t.Raw();
        let s = __gotots_results_2[1];
        let r = __gotots_results_2[2];
        const __gotots_equal_operand_0 = r;
        const __gotots_struct_0 = Region__from_language__package_1.$zero();
        if ((!Region__from_language__package_1.$equal(__gotots_equal_operand_0, __gotots_struct_0))) {
            const __gotots_results_3 = Raw$constant__from_language__package_1().Compose(RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Base__from_language__package_1.$copy(base)), new $goInterfaceAdapter$Named_language__package_1$Script(Script__from_language__package_1.$copy(s)), new $goInterfaceAdapter$Named_language__package_1$Region(Region__from_language__package_1.$copy(r))]));
            let p = __gotots_results_3[0];
            p = p.Parent();
            const __gotots_results_4 = Raw$constant__from_language__package_1().Compose(RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$Named_language__package_1$Tag(Tag__from_language__package_1.$copy(p)), new $goInterfaceAdapter$Named_language__package_1$Region(Region__from_language__package_1.$copy(r)), new $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension(t.Extensions())]));
            t = __gotots_results_4[0];
        }
        else {
            const __gotots_results_5 = Raw$constant__from_language__package_1().Compose(RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Base__from_language__package_1.$copy(base)), new $goInterfaceAdapter$Named_language__package_1$Script(Script__from_language__package_1.$copy(s)), new $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension(t.Extensions())]));
            t = __gotots_results_5[0];
        }
    }
    const __gotots_binary_operand_0 = 1;
    const __gotots_callee_0 = (i: int): bool => {
        const __gotots_results_6 = Tag__from_language__package_1.$fromStorage(tags.get(i + 1)).Raw();
        let b = __gotots_results_6[0];
        return base.String() <= b.String();
    };
    const __gotots_binary_operand_1 = globalThis.Number(BigInt.asIntN(64, sort__from_gostdlib.Search(BigInt.asIntN(64, goNumberToBigInt(tags.length - 1)), __gotots_callee_0 === undefined ? undefined : $providerArgument0 => {
        return __gotots_callee_0(globalThis.Number(BigInt.asIntN(64, $providerArgument0)));
    })));
    let start = __gotots_binary_operand_0 + __gotots_binary_operand_1;
    if (start < tags.length) {
        {
            const __gotots_results_7 = Tag__from_language__package_1.$fromStorage(tags.get(start)).Raw();
            let b = __gotots_results_7[0];
            if (!Base__from_language__package_1.$equal(b, base)) {
                return 0;
            }
        }
    }
    const __gotots_receiver_0 = Raw$constant__from_language__package_1();
    const __gotots_results_8 = t.Raw();
    const __gotots_results_9 = __gotots_receiver_0.Compose(RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(__gotots_results_8[0]), new $goInterfaceAdapter$Named_language__package_1$Script(__gotots_results_8[1]), new $goInterfaceAdapter$Named_language__package_1$Region(__gotots_results_8[2])]));
    let tdef = __gotots_results_9[0];
    const __gotots_results_10 = tdef.SetTypeForKey("va", t.TypeForKey("va"));
    tdef = __gotots_results_10[0];
    let __go_try = RuntimeSlice.literal<Tag__from_language__package_1$Storage>([Tag__from_language__package_1.$storageOf(Tag__from_language__package_1.$copy(tdef))]);
    {
        let co = t.TypeForKey("co");
        if (co !== "") {
            const __gotots_results_11 = tdef.SetTypeForKey("co", co);
            let tco = __gotots_results_11[0];
            __go_try = RuntimeSlice.literal<Tag__from_language__package_1$Storage>([Tag__from_language__package_1.$storageOf(Tag__from_language__package_1.$copy(tco)), Tag__from_language__package_1.$storageOf(Tag__from_language__package_1.$copy(tdef))]);
        }
    }
    const __gotots_range_0 = __go_try;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = Tag__from_language__package_1.$copy(Tag__from_language__package_1.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
        let tx__shadow_1 = __gotots_range_value_0;
        for (; !Tag__from_language__package_1.$equal(tx__shadow_1, Tag__from_language__package_1.$fromStorage($state__language__package_1.Und)); tx__shadow_1 = parent(Tag__from_language__package_1.$copy(tx__shadow_1))) {
            const __gotots_range_1 = tags.slice(start, null, null);
            for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
                const __gotots_range_value_1 = __gotots_range_index_1;
                const __gotots_range_value_2 = Tag__from_language__package_1.$copy(Tag__from_language__package_1.$fromStorage(__gotots_range_1.get(__gotots_range_index_1)));
                let i = __gotots_range_value_1;
                let t__shadow_1 = __gotots_range_value_2;
                {
                    const __gotots_results_12 = t__shadow_1.Raw();
                    let b = __gotots_results_12[0];
                    if (!Base__from_language__package_1.$equal(b, base)) {
                        break;
                    }
                }
                if (Tag__from_language__package_1.$equal(tx__shadow_1, t__shadow_1)) {
                    return start + i;
                }
            }
        }
    }
    return 0;
}
export function parent(t: Tag__from_language__package_1): Tag__from_language__package_1 {
    if (t.TypeForKey("va") !== "") {
        const __gotots_results_13 = t.SetTypeForKey("va", "");
        t = __gotots_results_13[0];
        return Tag__from_language__package_1.$copy(t);
    }
    let result = Tag__from_language__package_1.$copy(Tag__from_language__package_1.$fromStorage($state__language__package_1.Und));
    {
        const __gotots_results_14 = t.Raw();
        let b = __gotots_results_14[0];
        let s = __gotots_results_14[1];
        let r = __gotots_results_14[2];
        const __gotots_equal_operand_1 = r;
        const __gotots_struct_1 = Region__from_language__package_1.$zero();
        if ((!Region__from_language__package_1.$equal(__gotots_equal_operand_1, __gotots_struct_1))) {
            const __gotots_results_15 = Raw$constant__from_language__package_1().Compose(RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Base__from_language__package_1.$copy(b)), new $goInterfaceAdapter$Named_language__package_1$Script(Script__from_language__package_1.$copy(s)), new $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension(t.Extensions())]));
            result = __gotots_results_15[0];
        }
        else {
            const __gotots_equal_operand_2 = s;
            const __gotots_struct_2 = Script__from_language__package_1.$zero();
            if ((!Script__from_language__package_1.$equal(__gotots_equal_operand_2, __gotots_struct_2))) {
                const __gotots_results_16 = Raw$constant__from_language__package_1().Compose(RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Base__from_language__package_1.$copy(b)), new $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension(t.Extensions())]));
                result = __gotots_results_16[0];
            }
            else {
                const __gotots_equal_operand_3 = b;
                const __gotots_struct_3 = Base__from_language__package_1.$zero();
                if ((!Base__from_language__package_1.$equal(__gotots_equal_operand_3, __gotots_struct_3))) {
                    const __gotots_results_17 = Raw$constant__from_language__package_1().Compose(RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$SliceOf_Named_language__package_1$Extension(t.Extensions())]));
                    result = __gotots_results_17[0];
                }
            }
        }
    }
    return Tag__from_language__package_1.$copy(result);
}
