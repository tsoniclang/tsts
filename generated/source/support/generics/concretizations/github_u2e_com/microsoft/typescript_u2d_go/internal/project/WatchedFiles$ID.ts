import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import type { PatternsAndIgnored$Storage as PatternsAndIgnored__from_project$Storage, WatcherID as WatcherID__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { PatternsAndIgnored as PatternsAndIgnored__from_project, WatchedFiles as WatchedFiles__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
export function WatchedFiles$ID$MapOf_Named_tspath$Path_To_string($argument0: {
    value: WatchedFiles__from_project<GoMapValue<Path__from_tspath, gostring>>;
} | undefined): WatcherID__from_project {
    return WatchedFiles__from_project.ID$kernel<GoMapValue<Path__from_tspath, gostring>>($argument0, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    });
}
export function WatchedFiles$ID$Named_project$PatternsAndIgnored($argument0: {
    value: WatchedFiles__from_project<PatternsAndIgnored__from_project>;
} | undefined): WatcherID__from_project {
    return WatchedFiles__from_project.ID$kernel<PatternsAndIgnored__from_project>($argument0, ($argument0: PatternsAndIgnored__from_project): PatternsAndIgnored__from_project => {
        return PatternsAndIgnored__from_project.$copy($argument0);
    }, ($argument0: PatternsAndIgnored__from_project$Storage): PatternsAndIgnored__from_project => {
        return PatternsAndIgnored__from_project.$fromStorage($argument0);
    });
}
export function WatchedFiles$ID$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path($argument0: {
    value: WatchedFiles__from_project<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
} | undefined): WatcherID__from_project {
    return WatchedFiles__from_project.ID$kernel<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    });
}
