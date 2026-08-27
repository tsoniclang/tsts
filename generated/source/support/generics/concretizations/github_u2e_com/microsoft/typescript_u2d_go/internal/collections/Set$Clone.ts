import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_string_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function Set$Clone$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined {
    return Set__from_collections.Clone$kernel<Path__from_tspath>($argument0, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.make(0, []);
    });
}
export function Set$Clone$string($argument0: tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
    return Set__from_collections.Clone$kernel<gostring>($argument0, ($argument0: GoMapValue<gostring, GoEmptyStruct>): GoMapValue<gostring, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoMapValue<gostring, GoEmptyStruct> => {
        return GoMap.make(0, []);
    });
}
