import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { configFileEntry as configFileEntry__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../../interface-contracts.js";
import type { GoInterfaceValue } from "@gotots/runtime/interface-value.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { SyncMapEntry as SyncMapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/syncmap.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $goInterfaceAdapter$Named_tspath$Path, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileEntry, $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
import { $go$constraint_method$dirty$Clone$PointerTo_Named_project$Project_to_PointerTo_Named_project$Project, $go$constraint_method$dirty$Clone$PointerTo_Named_project$configFileEntry_to_PointerTo_Named_project$configFileEntry } from "../../../../../../../capabilities/constraint_method.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined) => bool) | undefined, $argument2: (($0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined) => void) | undefined): bool {
    return SyncMapEntry__from_dirty.ChangeIf$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, $go$constraint_method$dirty$Clone$PointerTo_Named_project$Project_to_PointerTo_Named_project$Project, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
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
        return new GoInterfaceAdapter($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
            if (!GoInterfaceAdapter.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
export function SyncMapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_project$configFileEntry($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined) => bool) | undefined, $argument2: (($0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined) => void) | undefined): bool {
    return SyncMapEntry__from_dirty.ChangeIf$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>($argument0, $go$constraint_method$dirty$Clone$PointerTo_Named_project$configFileEntry_to_PointerTo_Named_project$configFileEntry, ($argument0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined): GoInterface | undefined => {
        return new $goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileEntry($argument0);
    }, ($argument0: Path__from_tspath): GoInterface | undefined => {
        return new $goInterfaceAdapter$Named_tspath$Path($argument0);
    }, ($argument0: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
        return (($value: GoInterfaceValue | undefined): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
            if (!$goInterfaceAdapter$PointerTo_Named_dirty$SyncMapEntryOf_Named_tspath$Path_And_PointerTo_Named_project$configFileEntry.$is($value)) {
                return GoPanic.raiseRuntime("runtime error: interface conversion failed");
            }
            return $value.$go$value;
        })($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SyncMapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileEntry__from_project> | undefined>> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
