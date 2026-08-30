import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import type { diskFile as diskFile__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { realpathAliasSet as realpathAliasSet__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/snapshotfs.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { lockedEntry as lockedEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$realpathAliasSet as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function lockedEntry$Delete$Named_tspath$Path$PointerTo_Named_project$Project($argument0: lockedEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> | undefined): void {
    return lockedEntry__from_dirty.Delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return void 0;
    });
}
export function lockedEntry$Delete$Named_tspath$Path$PointerTo_Named_project$diskFile($argument0: lockedEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined> | undefined): void {
    return lockedEntry__from_dirty.Delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined): tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined): tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$diskFile.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined): tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<diskFile__from_project> | undefined>> | undefined => {
        return void 0;
    });
}
export function lockedEntry$Delete$Named_tspath$Path$PointerTo_Named_project$realpathAliasSet($argument0: lockedEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined> | undefined): void {
    return lockedEntry__from_dirty.Delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined): GoInterface | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined): tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<realpathAliasSet__from_project> | undefined>> | undefined => {
        return void 0;
    });
}
