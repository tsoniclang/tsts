import type { TextPos as TextPos__from_core } from "../../../../modules/github.com/microsoft/typescript-go/internal/core/text.js";
import type { LSPLineStarts as LSPLineStarts__from_lsconv } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/lsconv/linemap.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function BinarySearch$Named_lsconv$LSPLineStarts$Named_core$TextPos($argument0: LSPLineStarts__from_lsconv, $argument1: TextPos__from_core): [
    int,
    bool
] {
    const __gotots_results_0 = generic_slices_kernel.SlicesBinarySearchKernel<LSPLineStarts__from_lsconv, TextPos__from_core, TextPos__from_core>(($argument0: TextPos__from_core, $argument1: TextPos__from_core): bool => {
        return $argument0 < $argument1;
    }, ($argument0: LSPLineStarts__from_lsconv): RuntimeSlice<TextPos__from_core> => {
        return $argument0.$value;
    }, ($argument0: TextPos__from_core): TextPos__from_core => {
        return $argument0;
    }, ($argument0: TextPos__from_core, $argument1: TextPos__from_core): bool => {
        return $argument0 === $argument1;
    }, ($argument0: TextPos__from_core): TextPos__from_core => {
        return $argument0;
    }, $argument0, $argument1);
    return [globalThis.Number(BigInt.asIntN(64, __gotots_results_0[0])), __gotots_results_0[1]] satisfies [
        int,
        bool
    ];
}
