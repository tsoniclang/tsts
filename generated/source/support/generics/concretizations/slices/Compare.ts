import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function Compare$SliceOf_int$int($argument0: RuntimeSlice<int>, $argument1: RuntimeSlice<int>): int {
    return globalThis.Number(BigInt.asIntN(64, generic_slices_kernel.SlicesCompareKernel<RuntimeSlice<int>, int, int>(($argument0: int, $argument1: int): bool => {
        return $argument0 < $argument1;
    }, ($argument0: RuntimeSlice<int>): RuntimeSlice<int> => {
        return $argument0;
    }, ($argument0: int): int => {
        return $argument0;
    }, ($argument0: int, $argument1: int): bool => {
        return $argument0 === $argument1;
    }, ($argument0: int): int => {
        return $argument0;
    }, $argument0, $argument1)));
}
export function Compare$SliceOf_string$string($argument0: RuntimeSlice<gostring>, $argument1: RuntimeSlice<gostring>): int {
    return globalThis.Number(BigInt.asIntN(64, generic_slices_kernel.SlicesCompareKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 < $argument1;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, $argument1)));
}
