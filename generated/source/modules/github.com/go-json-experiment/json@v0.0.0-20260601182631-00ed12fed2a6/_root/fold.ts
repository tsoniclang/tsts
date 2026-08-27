import type { int, int32, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { RuneSelf$uint8 as RuneSelf$uint8__from_utf8 } from "../../../../../support/constant-projections/e198f9173c5331b90e99bf65378418357500552220caa240d191aede8854dde4/unicode/utf8/index.js";
import * as unicode__from_gostdlib from "@gotots/gostdlib/unicode.js";
import * as utf8__from_gostdlib from "@gotots/gostdlib/unicode/utf8.js";
import { GoArray } from "@gotots/runtime/array.js";
import { goArraySlice } from "@gotots/runtime/slice.js";
export function foldName(__go_in: RuntimeSlice<uint8>): RuntimeSlice<uint8> {
    let arr = GoArray.zero<uint8, 32>(32, 0);
    return appendFoldedName(goArraySlice(arr, 0, 0, null), __go_in);
}
export function appendFoldedName(__go_out: RuntimeSlice<uint8>, __go_in: RuntimeSlice<uint8>): RuntimeSlice<uint8> {
    for (let i = 0; i < __go_in.length;) {
        {
            let c = __go_in.get(i);
            if (c < RuneSelf$uint8__from_utf8) {
                if (c !== 95 && c !== 45) {
                    if (97 <= c && c <= 122) {
                        c = c - 32;
                    }
                    __go_out = __go_out.append(0, [c]);
                }
                i++;
                continue;
            }
        }
        const __gotots_results_0 = utf8__from_gostdlib.DecodeRune(__go_in.slice(i, null, null));
        const __gotots_results_1 = [__gotots_results_0[0], globalThis.Number(BigInt.asIntN(64, __gotots_results_0[1]))] satisfies [
            int32,
            int
        ];
        let r = __gotots_results_1[0];
        let n = __gotots_results_1[1];
        __go_out = utf8__from_gostdlib.AppendRune(__go_out, foldRune(r));
        i += n;
    }
    return __go_out;
}
export function foldRune(r: int32): int32 {
    for (;;) {
        let r2 = unicode__from_gostdlib.SimpleFold(r);
        if (r2 <= r) {
            return r2;
        }
        r = r2;
    }
}
