import type { Value as Value__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/interfaces.js";
import type { lockedEntry as lockedEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import type { diskFile as diskFile__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { realpathAliasSet as realpathAliasSet__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import { $goInterfaceAdapter$PointerTo_Named_dirty$lockedEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile, $goInterfaceAdapter$PointerTo_Named_dirty$lockedEntryOf_Named_tspath$Path_And_PointerTo_Named_project$realpathAliasSet, $goInterfaceAdapter$PointerTo_Named_dirty$lockedEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
export function SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$Project($argument0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>;
} | undefined, $argument1: (($0: Value__from_dirty<{
    value: Project__from_project;
} | undefined> | undefined) => void) | undefined): void {
    return SyncMapEntry__from_dirty.Locked$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: lockedEntry__from_dirty<Path__from_tspath, {
        value: Project__from_project;
    } | undefined> | undefined): Value__from_dirty<{
        value: Project__from_project;
    } | undefined> | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
export function SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$diskFile($argument0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>;
} | undefined, $argument1: (($0: Value__from_dirty<{
    value: diskFile__from_project;
} | undefined> | undefined) => void) | undefined): void {
    return SyncMapEntry__from_dirty.Locked$kernel<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>($argument0, ($argument0: lockedEntry__from_dirty<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined> | undefined): Value__from_dirty<{
        value: diskFile__from_project;
    } | undefined> | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_dirty$lockedEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile($argument0);
    }, $argument1);
}
export function SyncMapEntry$Locked$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet($argument0: {
    value: SyncMapEntry__from_dirty<Path__from_tspath, {
        value: realpathAliasSet__from_project;
    } | undefined>;
} | undefined, $argument1: (($0: Value__from_dirty<{
    value: realpathAliasSet__from_project;
} | undefined> | undefined) => void) | undefined): void {
    return SyncMapEntry__from_dirty.Locked$kernel<Path__from_tspath, {
        value: realpathAliasSet__from_project;
    } | undefined>($argument0, ($argument0: lockedEntry__from_dirty<Path__from_tspath, {
        value: realpathAliasSet__from_project;
    } | undefined> | undefined): Value__from_dirty<{
        value: realpathAliasSet__from_project;
    } | undefined> | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_dirty$lockedEntryOf_Named_tspath$Path_And_PointerTo_Named_project$realpathAliasSet($argument0);
    }, $argument1);
}
