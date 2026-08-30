import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import { Box as Box__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/box.js";
import { $go$constraint_method$dirty$Clone$PointerTo_Named_project$Project_to_PointerTo_Named_project$Project } from "../../../../../../../capabilities/constraint_method.js";
export function Box$Change$PointerTo_Named_project$Project($argument0: {
    value: Box__from_dirty<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>;
} | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined) => void) | undefined): void {
    return Box__from_dirty.Change$kernel<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, $go$constraint_method$dirty$Clone$PointerTo_Named_project$Project_to_PointerTo_Named_project$Project, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, $argument1);
}
