import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../support/interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { Tag } from "./language.js";
import { Parse } from "./parse.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function MustParse(s: gostring): Tag {
    const __gotots_results_0 = Parse(s);
    let t = __gotots_results_0[0];
    let err: GoInterface | undefined = __gotots_results_0[1];
    if (!(err === undefined)) {
        const __gotots_argument_0 = err;
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
    return Tag.$copy(t);
}
