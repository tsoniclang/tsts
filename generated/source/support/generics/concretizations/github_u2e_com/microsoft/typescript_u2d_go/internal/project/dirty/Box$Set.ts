import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import { Box as Box__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/box.js";
export function Box$Set$PointerTo_Named_project$Project($argument0: {
    value: Box__from_dirty<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>;
} | undefined, $argument1: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): void {
    return Box__from_dirty.Set$kernel<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<Project__from_project> | undefined): tsonicTypeScriptRuntime.Location<Project__from_project> | undefined => {
        return $argument0;
    }, $argument1);
}
