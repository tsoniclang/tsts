import type { bool, int } from "@gotots/runtime/scalars.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function BinarySearchUniqueFunc$kernel<S, E>($go$index$T0_int_to_T1: ($0: S, $1: int) => E, $go$length$T0_to_int: ($0: S) => int, x: S, cmp: (($0: int, $1: E) => int) | undefined): [
    int,
    bool
] {
    let n = $go$length$T0_to_int(x);
    if (n === 0) {
        return [0, false];
    }
    const __gotots_assign_0 = 0;
    const __gotots_assign_1 = n - 1;
    let low = __gotots_assign_0;
    let high = __gotots_assign_1;
    for (; low <= high;) {
        let middle = low + ((high - low) >> 1);
        const __gotots_callee_0 = cmp;
        const __gotots_argument_0 = middle;
        const __gotots_argument_1 = $go$index$T0_int_to_T1(x, middle);
        let value = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1);
        if (value < 0) {
            low = middle + 1;
        }
        else if (value > 0) {
            high = middle - 1;
        }
        else {
            return [middle, true];
        }
    }
    return [low, false];
}
