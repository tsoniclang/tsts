import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { MapEntry as MapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import { Map as Map__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { $goMap$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory, $goMap$MapOf_Named_tspath$Path_To_string, $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_project$configFileNames as GoMap } from "../../../../../../../../maps.js";
export function Map$Finalize$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: {
    value: Map__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>;
} | undefined): [
    GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>,
    bool
] {
    return Map__from_dirty.Finalize$kernel<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>($argument0, ($argument0: GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>): GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> => {
        return $argument0;
    }, ($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return new CloneableMap__from_dirty($argument0);
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>> | undefined>): int => {
        return $argument0.length();
    }, ($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> => {
        return $goMap$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string.make(0, []);
    }, ($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>, $argument1: int): GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> => {
        return $goMap$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string.make($argument1, []);
    }, (): GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> => {
        return $goMap$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string.nil();
    }, (): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return new CloneableMap__from_dirty($goMap$MapOf_Named_tspath$Path_To_string.nil());
    });
}
export function Map$Finalize$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: {
    value: Map__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>;
} | undefined): [
    GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>,
    bool
] {
    return Map__from_dirty.Finalize$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>($argument0, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>> | undefined>): int => {
        return $argument0.length();
    }, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined, $argument1: int): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket.make($argument1, []);
    }, (): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket.nil();
    }, (): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return void 0;
    });
}
export function Map$Finalize$Named_tspath$Path$PointerTo_Named_autoimport$directory($argument0: {
    value: Map__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>;
} | undefined): [
    GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>,
    bool
] {
    return Map__from_dirty.Finalize$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>($argument0, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>> | undefined>): int => {
        return $argument0.length();
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined, $argument1: int): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory.make($argument1, []);
    }, (): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined> => {
        return $goMap$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory.nil();
    }, (): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return void 0;
    });
}
export function Map$Finalize$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: {
    value: Map__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>;
} | undefined): [
    GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>,
    bool
] {
    return Map__from_dirty.Finalize$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>($argument0, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>> | undefined>): int => {
        return $argument0.length();
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined> => {
        return GoMap.make(0, []);
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined, $argument1: int): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined> => {
        return GoMap.make($argument1, []);
    }, (): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined> => {
        return GoMap.nil();
    }, (): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return void 0;
    });
}
