import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
export function Set$Equals$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): bool {
    return Set__from_collections.Equals$kernel<Path__from_tspath>($argument0, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, $argument1);
}
export function Set$Equals$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): bool {
    return Set__from_collections.Equals$kernel<gostring>($argument0, ($argument0: GoMapValue<gostring, GoEmptyStruct>): GoMapValue<gostring, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): bool => {
        return tsonicTypeScriptRuntime.sameLocation($argument0, $argument1);
    }, $argument1);
}
