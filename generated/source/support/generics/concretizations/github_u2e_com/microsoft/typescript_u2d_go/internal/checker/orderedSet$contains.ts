import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { orderedSet as orderedSet__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/utilities.js";
export function orderedSet$contains$PointerTo_Named_checker$Type($argument0: orderedSet__from_checker<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool {
    return orderedSet__from_checker.$go$private$checker$contains$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>($argument0, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, $argument1);
}
