import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { Box as Box__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/box.js";
export function Box$Finalize$PointerTo_Named_project$Project($argument0: {
    value: Box__from_dirty<{
        value: Project__from_project;
    } | undefined>;
} | undefined): [
    {
        value: Project__from_project;
    } | undefined,
    bool
] {
    return Box__from_dirty.Finalize$kernel<{
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, (): {
        value: Project__from_project;
    } | undefined => {
        return void 0;
    });
}
