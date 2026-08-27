import type { gostring, int } from "@gotots/runtime/scalars.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { goStringSlice } from "@gotots/runtime/string.js";
export function CountPathComponents(path: gostring): int {
    let initial = 0;
    if (strings__from_gostdlib.HasPrefix(path, "./")) {
        initial = 2;
    }
    return globalThis.Number(BigInt.asIntN(64, strings__from_gostdlib.Count(goStringSlice(path, initial), "/")));
}
