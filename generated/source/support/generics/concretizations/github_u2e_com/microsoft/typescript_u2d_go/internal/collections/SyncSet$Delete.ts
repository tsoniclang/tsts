import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { WatcherID as WatcherID__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import { $goInterfaceAdapter$Named_project$WatcherID as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function SyncSet$Delete$Named_project$WatcherID($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<WatcherID__from_project>> | undefined, $argument1: WatcherID__from_project): void {
    return SyncSet__from_collections.Delete$kernel<WatcherID__from_project>($argument0, ($argument0: WatcherID__from_project): WatcherID__from_project => {
        return $argument0;
    }, ($argument0: WatcherID__from_project): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
