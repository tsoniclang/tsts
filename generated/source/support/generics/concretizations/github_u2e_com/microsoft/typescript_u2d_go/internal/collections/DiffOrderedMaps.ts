import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { OrderedMap as OrderedMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import type { Project as Project__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/project.js";
import type { bool, gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { DiffOrderedMaps$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/ordered_map.js";
import { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function DiffOrderedMaps$Named_tspath$Path$PointerTo_Named_project$Project($argument0: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined, $argument1: tsonicTypeScriptRuntime.Location<OrderedMap__from_collections<Path__from_tspath, {
    value: Project__from_project;
} | undefined>> | undefined, $argument2: (($0: Path__from_tspath, $1: {
    value: Project__from_project;
} | undefined) => void) | undefined, $argument3: (($0: Path__from_tspath, $1: {
    value: Project__from_project;
} | undefined) => void) | undefined, $argument4: (($0: Path__from_tspath, $1: {
    value: Project__from_project;
} | undefined, $2: {
    value: Project__from_project;
} | undefined) => void) | undefined): void {
    return DiffOrderedMaps$kernel<Path__from_tspath, {
        value: Project__from_project;
    } | undefined>(($argument0: {
        value: Project__from_project;
    } | undefined, $argument1: {
        value: Project__from_project;
    } | undefined): bool => {
        return $argument0
            ===
                $argument1;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: Project__from_project;
    } | undefined): {
        value: Project__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): Path__from_tspath => {
        return new Path__from_tspath($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, $argument0, $argument1, $argument2, $argument3, $argument4);
}
