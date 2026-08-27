import type * as iter from "@gotots/gostdlib/iter.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function Sorted$string($argument0: iter.Seq<gostring>): RuntimeSlice<gostring> {
    return generic_slices_kernel.SlicesSortedKernel<gostring, gostring>(($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 < $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
