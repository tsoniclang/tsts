import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function CompareFunc$SliceOf_string$SliceOf_string$string$string($argument0: RuntimeSlice<gostring>, $argument1: RuntimeSlice<gostring>, $argument2: (($0: gostring, $1: gostring) => int) | undefined): int {
    const __gotots_callee_0 = $argument2;
    return globalThis.Number(BigInt.asIntN(64, generic_slices_kernel.SlicesCompareFuncKernel<RuntimeSlice<gostring>, RuntimeSlice<gostring>, gostring, gostring, gostring, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, $argument1, __gotots_callee_0 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_0($providerArgument0, $providerArgument1)));
    })));
}
