import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function Reverse$SliceOf_int$int($argument0: RuntimeSlice<int>): void {
    return generic_slices_kernel.SlicesReverseKernel<RuntimeSlice<int>, int, int>(($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, $argument0);
}
