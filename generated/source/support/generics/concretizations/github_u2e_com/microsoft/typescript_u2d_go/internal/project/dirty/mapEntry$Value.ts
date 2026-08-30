import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import { mapEntry as mapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/entry.js";
import { $goMap$MapOf_Named_tspath$Path_To_string as GoMap } from "../../../../../../../../maps.js";
export function mapEntry$Value$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>> | undefined): CloneableMap__from_dirty<Path__from_tspath, gostring> {
    return mapEntry__from_dirty.Value$kernel<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>($argument0, ($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return new CloneableMap__from_dirty($argument0);
    }, (): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return new CloneableMap__from_dirty(GoMap.nil());
    });
}
export function mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined {
    return mapEntry__from_dirty.Value$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return void 0;
    });
}
export function mapEntry$Value$Named_tspath$Path$PointerTo_Named_autoimport$directory($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined {
    return mapEntry__from_dirty.Value$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return void 0;
    });
}
export function mapEntry$Value$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined {
    return mapEntry__from_dirty.Value$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return void 0;
    });
}
