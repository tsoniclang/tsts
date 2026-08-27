import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { WatcherID as WatcherID__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import { $goInterfaceAdapter$Named_project$WatcherID, $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function SyncSet$Has$Named_project$WatcherID($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<WatcherID__from_project>> | undefined, $argument1: WatcherID__from_project): bool {
    return SyncSet__from_collections.Has$kernel<WatcherID__from_project>($argument0, ($argument0: WatcherID__from_project): WatcherID__from_project => {
        return $argument0;
    }, ($argument0: WatcherID__from_project): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_project$WatcherID($argument0);
    }, $argument1);
}
export function SyncSet$Has$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined, $argument1: Path__from_tspath): bool {
    return SyncSet__from_collections.Has$kernel<Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
