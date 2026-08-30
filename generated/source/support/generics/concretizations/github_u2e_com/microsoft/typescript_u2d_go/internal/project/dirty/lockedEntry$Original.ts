import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { diskFile as diskFile__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { realpathAliasSet as realpathAliasSet__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { lockedEntry as lockedEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
export function lockedEntry$Original$Named_tspath$Path$PointerTo_Named_project$Project($argument0: lockedEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined {
    return lockedEntry__from_dirty.Original$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    });
}
export function lockedEntry$Original$Named_tspath$Path$PointerTo_Named_project$diskFile($argument0: lockedEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined> | undefined): tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined {
    return lockedEntry__from_dirty.Original$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined): tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined => {
        return $argument0;
    });
}
export function lockedEntry$Original$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet($argument0: lockedEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined {
    return lockedEntry__from_dirty.Original$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined => {
        return $argument0;
    });
}
