import type { Box as Box__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/box.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import { NewBox$kernel } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/box.js";
export function NewBox$PointerTo_Named_project$Project($argument0: {
    value: Project__from_project;
} | undefined): {
    value: Box__from_dirty<{
        value: Project__from_project;
    } | undefined>;
} | undefined {
    return NewBox$kernel<{
        value: Project__from_project;
    } | undefined>(($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, $argument0);
}
