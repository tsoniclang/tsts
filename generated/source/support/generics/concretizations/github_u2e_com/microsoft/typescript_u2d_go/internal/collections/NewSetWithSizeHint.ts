import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Set as Set__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { NewSetWithSizeHint$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/set.js";
import { $goMap$MapOf_string_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../maps.js";
export function NewSetWithSizeHint$Named_tspath$Path($argument0: int): tsonicTypeScriptRuntime.Location<Set__from_collections<Path__from_tspath>> | undefined {
    return NewSetWithSizeHint$kernel<Path__from_tspath>(($argument0: GoEmptyStruct, $argument1: int): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.make($argument1, []);
    }, $argument0);
}
export function NewSetWithSizeHint$string($argument0: int): tsonicTypeScriptRuntime.Location<Set__from_collections<gostring>> | undefined {
    return NewSetWithSizeHint$kernel<gostring>(($argument0: GoEmptyStruct, $argument1: int): GoMapValue<gostring, GoEmptyStruct> => {
        return $goMap$MapOf_string_To_Struct_void.make($argument1, []);
    }, $argument0);
}
