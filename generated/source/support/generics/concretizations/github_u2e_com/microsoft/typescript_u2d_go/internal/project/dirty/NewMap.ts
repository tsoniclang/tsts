import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import type { MapEntry as MapEntry__from_dirty, Map as Map__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { NewMap$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$RegistryBucket, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$directory, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileNames as GoMap } from "../../../../../../../../maps.js";
export function NewMap$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>): {
    value: Map__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>;
} | undefined {
    return NewMap$kernel<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>(($argument0: MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> | undefined): GoMapValue<Path__from_tspath, MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string.make(0, []);
    }, $argument0);
}
export function NewMap$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: GoMapValue<Path__from_tspath, RegistryBucket__from_autoimport | undefined>): {
    value: Map__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined>;
} | undefined {
    return NewMap$kernel<Path__from_tspath, RegistryBucket__from_autoimport | undefined>(($argument0: MapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined> | undefined): GoMapValue<Path__from_tspath, MapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$RegistryBucket.make(0, []);
    }, $argument0);
}
export function NewMap$Named_tspath$Path$PointerTo_Named_autoimport$directory($argument0: GoMapValue<Path__from_tspath, directory__from_autoimport | undefined>): {
    value: Map__from_dirty<Path__from_tspath, directory__from_autoimport | undefined>;
} | undefined {
    return NewMap$kernel<Path__from_tspath, directory__from_autoimport | undefined>(($argument0: MapEntry__from_dirty<Path__from_tspath, directory__from_autoimport | undefined> | undefined): GoMapValue<Path__from_tspath, MapEntry__from_dirty<Path__from_tspath, directory__from_autoimport | undefined> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$directory.make(0, []);
    }, $argument0);
}
export function NewMap$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: GoMapValue<Path__from_tspath, configFileNames__from_project | undefined>): {
    value: Map__from_dirty<Path__from_tspath, configFileNames__from_project | undefined>;
} | undefined {
    return NewMap$kernel<Path__from_tspath, configFileNames__from_project | undefined>(($argument0: MapEntry__from_dirty<Path__from_tspath, configFileNames__from_project | undefined> | undefined): GoMapValue<Path__from_tspath, MapEntry__from_dirty<Path__from_tspath, configFileNames__from_project | undefined> | undefined> => {
        return GoMap.make(0, []);
    }, $argument0);
}
