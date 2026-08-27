import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { UnorderedEqual$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { GoMap } from "@gotots/runtime/map.js";
export function UnorderedEqual$string($argument0: RuntimeSlice<gostring>, $argument1: RuntimeSlice<gostring>): bool {
    return UnorderedEqual$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, ($argument0: int): GoMapValue<gostring, int> => {
        return GoMap.make<gostring, int>($argument0, 0, []);
    }, $argument0, $argument1);
}
