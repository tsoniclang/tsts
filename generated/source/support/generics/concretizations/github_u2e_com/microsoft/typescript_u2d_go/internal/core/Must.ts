import type { $goInterface$Interface_Method_Error_void_to_string as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring, uint8 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { Must$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function Must$SliceOf_byte($argument0: RuntimeSlice<uint8>, $argument1: GoInterface | undefined): RuntimeSlice<uint8> {
    return Must$kernel<RuntimeSlice<uint8>>($argument0, $argument1);
}
export function Must$string($argument0: gostring, $argument1: GoInterface | undefined): gostring {
    return Must$kernel<gostring>($argument0, $argument1);
}
