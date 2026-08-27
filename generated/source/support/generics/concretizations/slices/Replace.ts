import type { Export as Export__from_autoimport } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
import { goNumberToBigInt } from "@gotots/runtime/conversion.js";
export function Replace$SliceOf_PointerTo_Named_autoimport$Export$PointerTo_Named_autoimport$Export($argument0: RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined>, $argument1: int, $argument2: int, $argument3: RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined>): RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined> {
    return generic_slices_kernel.SlicesReplaceKernel<RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>, {
        value: Export__from_autoimport;
    } | undefined, {
        value: Export__from_autoimport;
    } | undefined>(($argument0: RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>): RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>): RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined> => {
        return $argument0;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Export__from_autoimport;
    } | undefined): {
        value: Export__from_autoimport;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Export__from_autoimport;
    } | undefined => {
        return void 0;
    }, $argument0, BigInt.asIntN(64, goNumberToBigInt($argument1)), BigInt.asIntN(64, goNumberToBigInt($argument2)), $argument3);
}
