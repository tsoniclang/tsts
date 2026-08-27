import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { orderedSet as orderedSet__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/utilities.js";
import { $goMap$MapOf_PointerTo_Named_checker$Type_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function orderedSet$add$PointerTo_Named_checker$Type($argument0: orderedSet__from_checker<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): void {
    return orderedSet__from_checker.$go$private$checker$add$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: GoEmptyStruct, $argument1: int): GoMapValue<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, GoEmptyStruct> => {
        return GoMap.make($argument1, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument1);
}
