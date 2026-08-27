import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Signature as Signature__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { minAndMax$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/utilities.js";
export function minAndMax$PointerTo_Named_checker$Signature($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined) => int) | undefined): [
    int,
    int
] {
    return minAndMax$kernel<tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Signature__from_checker> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
