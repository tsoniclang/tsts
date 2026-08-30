import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { directory as directory__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { MapEntry as MapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $go$constraint_method$dirty$Clone$PointerTo_Named_autoimport$directory_to_PointerTo_Named_autoimport$directory } from "../../../../../../../capabilities/constraint_method.js";
export function MapEntry$ChangeIf$Named_tspath$Path$PointerTo_Named_autoimport$directory($argument0: tsonicTypeScriptRuntime.Location<MapEntry__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>> | undefined, $argument1: (($0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined) => bool) | undefined, $argument2: (($0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined) => void) | undefined): bool {
    return MapEntry__from_dirty.ChangeIf$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>($argument0, $go$constraint_method$dirty$Clone$PointerTo_Named_autoimport$directory_to_PointerTo_Named_autoimport$directory, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return void 0;
    }, $argument1, $argument2);
}
