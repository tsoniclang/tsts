import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import { $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function SyncSet$AddIfAbsent$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined, $argument1: Path__from_tspath): bool {
    return SyncSet__from_collections.AddIfAbsent$kernel<Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
