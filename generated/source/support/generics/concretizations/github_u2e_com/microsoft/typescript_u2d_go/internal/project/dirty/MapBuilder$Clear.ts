import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { MapBuilder as MapBuilder__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/mapbuilder.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string as GoMap } from "../../../../../../../../maps.js";
export function MapBuilder$Clear$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string($argument0: MapBuilder__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined> | undefined): void {
    return MapBuilder__from_dirty.Clear$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>): int => {
        return $argument0.length();
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: GoEmptyStruct, $argument1: int): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $goMap$MapOf_Named_tspath$Path_To_Struct_void.make($argument1, []);
    }, (): tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined => {
        return void 0;
    });
}
