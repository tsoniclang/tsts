import type { bool, gostring, int, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as sort__from_gostdlib from "@gotots/gostdlib/sort.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
import { goNumberIntegerDivide } from "@gotots/runtime/integer.js";
import { goStringIndex, goStringSlice } from "@gotots/runtime/string.js";
export class Index {
    declare private readonly $goType: void;
    constructor(public readonly $value: gostring) {
    }
    declare private readonly then?: never;
    Elem(x: int): gostring {
        return ((void Index,
            goStringSlice(this.$value, x * 4, x * 4 + 4)) as gostring);
    }
    Index(key: RuntimeSlice<uint8>): int {
        let n = key.length;
        const __gotots_callee_0 = (i__shadow_1: int): bool => {
            return cmp(new Index(goStringSlice(this.$value, i__shadow_1 * 4, i__shadow_1 * 4 + n)), key) !== -1;
        };
        let index = globalThis.Number(BigInt.asIntN(64, sort__from_gostdlib.Search(BigInt.asIntN(64, goNumberToBigInt(goNumberIntegerDivide(this.$value.length, 4))), __gotots_callee_0 === undefined ? undefined : $providerArgument0 => {
            return __gotots_callee_0(globalThis.Number(BigInt.asIntN(64, $providerArgument0)));
        })));
        let i = index * 4;
        if (cmp(new Index(goStringSlice(this.$value, i, i + key.length)), key) !== 0) {
            return -1;
        }
        return index;
    }
    Next(key: RuntimeSlice<uint8>, x: int): int {
        {
            x++;
            if (x * 4 < this.$value.length && cmp(new Index(goStringSlice(this.$value, x * 4, x * 4 + key.length)), key) === 0) {
                return x;
            }
        }
        return -1;
    }
}
export function cmp(a: Index, b: RuntimeSlice<uint8>): int {
    let n = a.$value.length;
    if (b.length < n) {
        n = b.length;
    }
    const __gotots_range_0 = b.slice(0, n, null);
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let c = __gotots_range_value_1;
        __gotots_control_target_0: {
            if (goStringIndex(a.$value, i) > c) {
                return 1;
            }
            else if (goStringIndex(a.$value, i) < c) {
                return -1;
            }
        }
    }
    __gotots_control_target_1: {
        if (a.$value.length < b.length) {
            return -1;
        }
        else if (a.$value.length > b.length) {
            return 1;
        }
    }
    return 0;
}
export function Compare(a: gostring, b: RuntimeSlice<uint8>): int {
    return cmp(new Index(a), b);
}
export function FixCase(form: gostring, b: RuntimeSlice<uint8>): bool {
    if (form.length !== b.length) {
        return false;
    }
    const __gotots_range_1 = b;
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_2 = __gotots_range_index_1;
        const __gotots_range_value_3 = __gotots_range_1.get(__gotots_range_index_1);
        let i = __gotots_range_value_2;
        let c = __gotots_range_value_3;
        if (goStringIndex(form, i) <= 90) {
            if (c >= 97) {
                c = c - 32;
            }
            if (c < 65 || 90 < c) {
                return false;
            }
        }
        else {
            if (c <= 90) {
                c += 32;
            }
            if (c < 97 || 122 < c) {
                return false;
            }
        }
        b.set(i, c);
    }
    return true;
}
