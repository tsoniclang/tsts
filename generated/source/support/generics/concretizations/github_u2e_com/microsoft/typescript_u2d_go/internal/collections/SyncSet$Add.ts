import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { WatcherID as WatcherID__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import { $goInterfaceAdapter$Named_project$WatcherID, $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$string, $goInterfaceAdapter$Named_tspath$Path as GoInterfaceAdapter } from "../../../../../../../interface-adapters.js";
export function SyncSet$Add$Named_project$WatcherID($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<WatcherID__from_project>> | undefined, $argument1: WatcherID__from_project): void {
    return SyncSet__from_collections.Add$kernel<WatcherID__from_project>($argument0, ($argument0: WatcherID__from_project): WatcherID__from_project => {
        return $argument0;
    }, ($argument0: WatcherID__from_project): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_project$WatcherID($argument0);
    }, $argument1);
}
export function SyncSet$Add$Named_tspath$Path($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined, $argument1: Path__from_tspath): void {
    return SyncSet__from_collections.Add$kernel<Path__from_tspath>($argument0, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
export function SyncSet$Add$PointerTo_Named_ast$SourceFile($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): void {
    return SyncSet__from_collections.Add$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile($argument0);
    }, $argument1);
}
export function SyncSet$Add$string($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<gostring>> | undefined, $argument1: gostring): void {
    return SyncSet__from_collections.Add$kernel<gostring>($argument0, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): GoInterface | undefined => {
        return new $goInterfaceAdapter$string($argument0);
    }, $argument1);
}
