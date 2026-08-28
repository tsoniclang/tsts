import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommandLineOption as CommandLineOption__from_tsoptions } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/commandlineoption.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
export function OrderedMap$GetOrZero$Interface_void$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<GoInterface | undefined, RuntimeSlice<gostring>>> | undefined, $argument1: GoInterface | undefined): RuntimeSlice<gostring> {
    return OrderedMap__from_collections.GetOrZero$kernel<GoInterface | undefined, RuntimeSlice<gostring>>($argument0, $argument1);
}
export function OrderedMap$GetOrZero$string$Interface_void($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, GoInterface | undefined>> | undefined, $argument1: gostring): GoInterface | undefined {
    return OrderedMap__from_collections.GetOrZero$kernel<gostring, GoInterface | undefined>($argument0, $argument1);
}
export function OrderedMap$GetOrZero$string$PointerTo_Named_tsoptions$CommandLineOption($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>> | undefined, $argument1: gostring): tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined {
    return OrderedMap__from_collections.GetOrZero$kernel<gostring, tsonicTypeScriptRuntime.Location<CommandLineOption__from_tsoptions> | undefined>($argument0, $argument1);
}
export function OrderedMap$GetOrZero$string$SliceOf_string($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, RuntimeSlice<gostring>>> | undefined, $argument1: gostring): RuntimeSlice<gostring> {
    return OrderedMap__from_collections.GetOrZero$kernel<gostring, RuntimeSlice<gostring>>($argument0, $argument1);
}
export function OrderedMap$GetOrZero$string$int($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<gostring, int>> | undefined, $argument1: gostring): int {
    return OrderedMap__from_collections.GetOrZero$kernel<gostring, int>($argument0, $argument1);
}
