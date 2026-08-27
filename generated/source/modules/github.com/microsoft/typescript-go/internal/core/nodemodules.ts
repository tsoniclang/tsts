import type { gostring } from "@gotots/runtime/scalars.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/state.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function NonRelativeModuleNameForTypingCache(moduleName: gostring): gostring {
    const __gotots_callee_0 = $state.NodeCoreModules;
    const __gotots_map_0 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))();
    const __gotots_map_1 = moduleName;
    if (__gotots_map_0.lookup(__gotots_map_1)) {
        return "node";
    }
    return moduleName;
}
