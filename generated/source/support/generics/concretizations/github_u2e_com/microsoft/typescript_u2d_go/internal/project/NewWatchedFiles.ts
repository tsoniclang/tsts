import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import type { WatchKind as WatchKind__from_lsproto } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/lsp/lsproto/lsp_generated.js";
import type { PatternsAndIgnored$Storage as PatternsAndIgnored__from_project$Storage, WatchedFiles as WatchedFiles__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { NewWatchedFiles$kernel, PatternsAndIgnored as PatternsAndIgnored__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import { $goMap$MapOf_Named_tspath$Path_To_string as GoMap } from "../../../../../../../maps.js";
export function NewWatchedFiles$MapOf_Named_tspath$Path_To_string($argument0: gostring, $argument1: WatchKind__from_lsproto, $argument2: bool, $argument3: (($0: GoMapValue<Path__from_tspath, gostring>) => PatternsAndIgnored__from_project) | undefined): {
    value: WatchedFiles__from_project<GoMapValue<Path__from_tspath, gostring>>;
} | undefined {
    return NewWatchedFiles$kernel<GoMapValue<Path__from_tspath, gostring>>(($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, (): GoMapValue<Path__from_tspath, gostring> => {
        return GoMap.nil();
    }, $argument0, $argument1, $argument2, $argument3);
}
export function NewWatchedFiles$Named_project$PatternsAndIgnored($argument0: gostring, $argument1: WatchKind__from_lsproto, $argument2: bool, $argument3: (($0: PatternsAndIgnored__from_project) => PatternsAndIgnored__from_project) | undefined): {
    value: WatchedFiles__from_project<PatternsAndIgnored__from_project>;
} | undefined {
    return NewWatchedFiles$kernel<PatternsAndIgnored__from_project>(($argument0: PatternsAndIgnored__from_project): PatternsAndIgnored__from_project$Storage => {
        return PatternsAndIgnored__from_project.$storageOf($argument0);
    }, (): PatternsAndIgnored__from_project => {
        return PatternsAndIgnored__from_project.$zero();
    }, $argument0, $argument1, $argument2, $argument3);
}
export function NewWatchedFiles$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path($argument0: gostring, $argument1: WatchKind__from_lsproto, $argument2: bool, $argument3: (($0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined) => PatternsAndIgnored__from_project) | undefined): {
    value: WatchedFiles__from_project<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
} | undefined {
    return NewWatchedFiles$kernel<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return void 0;
    }, $argument0, $argument1, $argument2, $argument3);
}
