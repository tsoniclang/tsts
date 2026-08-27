import type { Elem } from "./collelem.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring, int, uint32, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { $goInterfaceMethod$AppendNext$SliceOf_Named_colltab$Elem_SliceOf_byte_to_SliceOf_Named_colltab$Elem_int, $goInterfaceMethod$AppendNextString$SliceOf_Named_colltab$Elem_string_to_SliceOf_Named_colltab$Elem_int, $goInterfaceMethod$Domain$void_to_SliceOf_string, $goInterfaceMethod$Start$int_SliceOf_byte_to_int, $goInterfaceMethod$StartString$int_string_to_int, $goInterfaceMethod$Top$void_to_uint32 } from "../../../../../../support/interface-methods.js";
export interface Weighter extends GoInterfaceValue {
    AppendNext($argument0: RuntimeSlice<Elem>, $argument1: RuntimeSlice<uint8>): [
        RuntimeSlice<Elem>,
        int
    ];
    AppendNextString($argument0: RuntimeSlice<Elem>, $argument1: gostring): [
        RuntimeSlice<Elem>,
        int
    ];
    Domain(): RuntimeSlice<gostring>;
    Start($argument0: int, $argument1: RuntimeSlice<uint8>): int;
    StartString($argument0: int, $argument1: gostring): int;
    Top(): uint32;
}
export const Weighter$contract: readonly object[] = globalThis.Object.freeze([$goInterfaceMethod$AppendNext$SliceOf_Named_colltab$Elem_SliceOf_byte_to_SliceOf_Named_colltab$Elem_int, $goInterfaceMethod$AppendNextString$SliceOf_Named_colltab$Elem_string_to_SliceOf_Named_colltab$Elem_int, $goInterfaceMethod$Domain$void_to_SliceOf_string, $goInterfaceMethod$Start$int_SliceOf_byte_to_int, $goInterfaceMethod$StartString$int_string_to_int, $goInterfaceMethod$Top$void_to_uint32]);
export function Weighter$is(value: GoInterfaceValue | undefined): value is Weighter {
    return value !== undefined && value.$go$implements(Weighter$contract);
}
