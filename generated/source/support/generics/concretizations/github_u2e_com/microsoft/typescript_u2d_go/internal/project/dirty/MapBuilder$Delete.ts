import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import type { ResolvedEntrypoint as ResolvedEntrypoint__from___go_module } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/module/resolver.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import { MapBuilder as MapBuilder__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/mapbuilder.js";
import { $goMap$MapOf_Named_tspath$Path_To_Struct_void as GoMap } from "../../../../../../../../maps.js";
export function MapBuilder$Delete$Named_tspath$Path$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string$PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string($argument0: MapBuilder__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined> | undefined, $argument1: Path__from_tspath): void {
    return MapBuilder__from_dirty.Delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>($argument0, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, $argument1);
}
export function MapBuilder$Delete$Named_tspath$Path$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint($argument0: MapBuilder__from_dirty<Path__from_tspath, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>> | undefined, $argument1: Path__from_tspath): void {
    return MapBuilder__from_dirty.Delete$kernel<Path__from_tspath, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>, RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>>($argument0, ($argument0: GoEmptyStruct): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return GoMap.make(0, []);
    }, $argument1);
}
