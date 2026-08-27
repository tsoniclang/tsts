import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { SameMapIndex$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function SameMapIndex$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $1: int) => tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined> {
    return SameMapIndex$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): bool => {
        return !tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
