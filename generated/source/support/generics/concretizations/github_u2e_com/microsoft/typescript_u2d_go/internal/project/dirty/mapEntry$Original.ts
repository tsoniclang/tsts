import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { diskFile as diskFile__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/overlayfs.js";
import type { Project as Project__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { mapEntry as mapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/entry.js";
export function mapEntry$Original$Named_tspath$Path$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined): {
    value: Project__from_project;
} | undefined {
    return mapEntry__from_dirty.Original$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>($argument0, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    });
}
export function mapEntry$Original$Named_tspath$Path$PointerTo_Named_project$diskFile($argument0: tsonicTypeScriptRuntime.Location<mapEntry__from_dirty<Path__from_tspath, {
    value: diskFile__from_project;
} | undefined>> | undefined): {
    value: diskFile__from_project;
} | undefined {
    return mapEntry__from_dirty.Original$kernel<Path__from_tspath, {
        value: diskFile__from_project;
    } | undefined>($argument0, ($argument0: {
        value: diskFile__from_project;
    } | undefined): {
        value: diskFile__from_project;
    } | undefined => {
        return $argument0;
    });
}
