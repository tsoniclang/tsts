import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { configFileEntry as configFileEntry__from_project, configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import type { diskFile as diskFile__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { mapEntry as mapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/entry.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function mapEntry$Key$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>> | undefined): Path__from_tspath {
    return mapEntry__from_dirty.Key$kernel<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
export function mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined>> | undefined): Path__from_tspath {
    return mapEntry__from_dirty.Key$kernel<Path__from_tspath, RegistryBucket__from_autoimport | undefined>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
export function mapEntry$Key$Named_tspath$Path$PointerTo_Named_autoimport$directory($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, directory__from_autoimport | undefined>> | undefined): Path__from_tspath {
    return mapEntry__from_dirty.Key$kernel<Path__from_tspath, directory__from_autoimport | undefined>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
export function mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined): Path__from_tspath {
    return mapEntry__from_dirty.Key$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
export function mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileEntry($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, {
    value: configFileEntry__from_project;
} | undefined>> | undefined): Path__from_tspath {
    return mapEntry__from_dirty.Key$kernel<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
export function mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, configFileNames__from_project | undefined>> | undefined): Path__from_tspath {
    return mapEntry__from_dirty.Key$kernel<Path__from_tspath, configFileNames__from_project | undefined>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
export function mapEntry$Key$Named_tspath$Path$PointerTo_Named_project$diskFile($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, {
    value: diskFile__from_project;
} | undefined>> | undefined): Path__from_tspath {
    return mapEntry__from_dirty.Key$kernel<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>($argument0, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    });
}
