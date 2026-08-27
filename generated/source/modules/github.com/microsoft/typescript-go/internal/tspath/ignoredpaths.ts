import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/tspath/state.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
export function ContainsIgnoredPath(path: gostring): bool {
    const __gotots_range_0 = $state.ignoredPaths;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
        let pattern = __gotots_range_value_0;
        if (strings__from_gostdlib.Contains(path, pattern)) {
            return true;
        }
    }
    return false;
}
