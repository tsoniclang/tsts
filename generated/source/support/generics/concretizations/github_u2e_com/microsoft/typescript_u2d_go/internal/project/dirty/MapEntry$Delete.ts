import type { configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { MapEntry as MapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function MapEntry$Delete$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> | undefined): void {
    return MapEntry__from_dirty.Delete$kernel<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
export function MapEntry$Delete$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: MapEntry__from_dirty<Path__from_tspath, configFileNames__from_project | undefined> | undefined): void {
    return MapEntry__from_dirty.Delete$kernel<Path__from_tspath, configFileNames__from_project | undefined>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
