import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Value as Value__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/interfaces.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import { Box as Box__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/box.js";
import { $goInterfaceAdapter$PointerTo_Named_dirty$BoxOf_PointerTo_Named_project$Project as GoInterfaceAdapter } from "../../../../../../../../interface-adapters.js";
export function Box$Locked$PointerTo_Named_project$Project($argument0: {
    value: Box__from_dirty<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>;
} | undefined, $argument1: (($0: Value__from_dirty<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> | undefined) => void) | undefined): void {
    return Box__from_dirty.Locked$kernel<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>($argument0, ($argument0: {
        value: Box__from_dirty<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined>;
    } | undefined): Value__from_dirty<tsonicTypeScriptRuntime.Location<Project__from_project> | undefined> | undefined => {
        return new GoInterfaceAdapter($argument0);
    }, $argument1);
}
