import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import type { PatternsAndIgnored$Storage as PatternsAndIgnored__from_project$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { PatternsAndIgnored as PatternsAndIgnored__from_project, WatchedFiles as WatchedFiles__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
export function WatchedFiles$Clone$MapOf_Named_tspath$Path_To_string($argument0: {
    value: WatchedFiles__from_project<GoMapValue<Path__from_tspath, gostring>>;
} | undefined, $argument1: GoMapValue<Path__from_tspath, gostring>): {
    value: WatchedFiles__from_project<GoMapValue<Path__from_tspath, gostring>>;
} | undefined {
    return WatchedFiles__from_project.Clone$kernel<GoMapValue<Path__from_tspath, gostring>>($argument0, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, $argument1);
}
export function WatchedFiles$Clone$Named_project$PatternsAndIgnored($argument0: {
    value: WatchedFiles__from_project<PatternsAndIgnored__from_project>;
} | undefined, $argument1: PatternsAndIgnored__from_project): {
    value: WatchedFiles__from_project<PatternsAndIgnored__from_project>;
} | undefined {
    return WatchedFiles__from_project.Clone$kernel<PatternsAndIgnored__from_project>($argument0, ($argument0: PatternsAndIgnored__from_project): PatternsAndIgnored__from_project => {
        return PatternsAndIgnored__from_project.$copy($argument0);
    }, ($argument0: PatternsAndIgnored__from_project): PatternsAndIgnored__from_project$Storage => {
        return PatternsAndIgnored__from_project.$storageOf($argument0);
    }, $argument1);
}
export function WatchedFiles$Clone$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path($argument0: {
    value: WatchedFiles__from_project<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
} | undefined, $argument1: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): {
    value: WatchedFiles__from_project<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
} | undefined {
    return WatchedFiles__from_project.Clone$kernel<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, $argument1);
}
