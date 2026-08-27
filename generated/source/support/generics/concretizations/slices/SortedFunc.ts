import type { FileLike as FileLike__from_diagnosticwriter } from "../../../../modules/github.com/microsoft/typescript-go/internal/diagnosticwriter/diagnosticwriter.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function SortedFunc$Named_diagnosticwriter$FileLike($argument0: iter.Seq<FileLike__from_diagnosticwriter | undefined>, $argument1: (($0: FileLike__from_diagnosticwriter | undefined, $1: FileLike__from_diagnosticwriter | undefined) => int) | undefined): RuntimeSlice<FileLike__from_diagnosticwriter | undefined> {
    const __gotots_callee_2 = $argument1;
    return generic_slices_kernel.SlicesSortedFuncKernel<FileLike__from_diagnosticwriter | undefined, FileLike__from_diagnosticwriter | undefined>(($argument0: FileLike__from_diagnosticwriter | undefined): FileLike__from_diagnosticwriter | undefined => {
        return $argument0;
    }, ($argument0: FileLike__from_diagnosticwriter | undefined): FileLike__from_diagnosticwriter | undefined => {
        return $argument0;
    }, ($argument0: FileLike__from_diagnosticwriter | undefined): FileLike__from_diagnosticwriter | undefined => {
        return $argument0;
    }, $argument0, __gotots_callee_2 === undefined ? undefined : ($providerArgument0, $providerArgument1) => {
        return BigInt.asIntN(64, goNumberToBigInt(__gotots_callee_2($providerArgument0, $providerArgument1)));
    });
}
