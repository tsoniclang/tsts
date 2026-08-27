import type { configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { MapEntry as MapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { Map as Map__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileNames, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames as GoMap } from "../../../../../../../../maps.js";
export function Map$Clear$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: {
    value: Map__from_dirty<Path__from_tspath, configFileNames__from_project | undefined>;
} | undefined): void {
    return Map__from_dirty.Clear$kernel<Path__from_tspath, configFileNames__from_project | undefined>($argument0, ($argument0: configFileNames__from_project | undefined): GoMapValue<Path__from_tspath, configFileNames__from_project | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: MapEntry__from_dirty<Path__from_tspath, configFileNames__from_project | undefined> | undefined): GoMapValue<Path__from_tspath, MapEntry__from_dirty<Path__from_tspath, configFileNames__from_project | undefined> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileNames.make(0, []);
    }, (): configFileNames__from_project | undefined => {
        return void 0;
    });
}
