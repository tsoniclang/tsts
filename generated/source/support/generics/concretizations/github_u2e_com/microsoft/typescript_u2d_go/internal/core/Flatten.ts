import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Flatten$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function Flatten$string($argument0: RuntimeSlice<RuntimeSlice<gostring>>): RuntimeSlice<gostring> {
    return Flatten$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0);
}
