import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SyncSet as SyncSet__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncset.js";
import type { Logger as Logger__from_logging } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/logging/logger.js";
import type { Session as Session__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/session.js";
import type { PatternsAndIgnored$Storage as PatternsAndIgnored__from_project$Storage, WatchedFiles as WatchedFiles__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_Method_Error_void_to_string, $goInterface$Interface_Method_context$Deadline_void_to_Named_time$Time_bool_Method_context$Done_void_to_ReceiveChannelOf_Struct_void_Method_context$Err_void_to_Named_error_Method_context$Value_Interface_void_to_Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { updateWatch$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/session.js";
import { PatternsAndIgnored as PatternsAndIgnored__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/watch.js";
export function updateWatch$MapOf_Named_tspath$Path_To_string($argument0: GoInterface | undefined, $argument1: {
    value: Session__from_project;
} | undefined, $argument2: Logger__from_logging | undefined, $argument3: {
    value: WatchedFiles__from_project<GoMapValue<Path__from_tspath, gostring>>;
} | undefined, $argument4: {
    value: WatchedFiles__from_project<GoMapValue<Path__from_tspath, gostring>>;
} | undefined): RuntimeSlice<$goInterface$Interface_Method_Error_void_to_string | undefined> {
    return updateWatch$kernel<GoMapValue<Path__from_tspath, gostring>>(($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4);
}
export function updateWatch$Named_project$PatternsAndIgnored($argument0: GoInterface | undefined, $argument1: {
    value: Session__from_project;
} | undefined, $argument2: Logger__from_logging | undefined, $argument3: {
    value: WatchedFiles__from_project<PatternsAndIgnored__from_project>;
} | undefined, $argument4: {
    value: WatchedFiles__from_project<PatternsAndIgnored__from_project>;
} | undefined): RuntimeSlice<$goInterface$Interface_Method_Error_void_to_string | undefined> {
    return updateWatch$kernel<PatternsAndIgnored__from_project>(($argument0: PatternsAndIgnored__from_project): PatternsAndIgnored__from_project => {
        return PatternsAndIgnored__from_project.$copy($argument0);
    }, ($argument0: PatternsAndIgnored__from_project$Storage): PatternsAndIgnored__from_project => {
        return PatternsAndIgnored__from_project.$fromStorage($argument0);
    }, $argument0, $argument1, $argument2, $argument3, $argument4);
}
export function updateWatch$PointerTo_Named_collections$SyncSetOf_Named_tspath$Path($argument0: GoInterface | undefined, $argument1: {
    value: Session__from_project;
} | undefined, $argument2: Logger__from_logging | undefined, $argument3: {
    value: WatchedFiles__from_project<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
} | undefined, $argument4: {
    value: WatchedFiles__from_project<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>;
} | undefined): RuntimeSlice<$goInterface$Interface_Method_Error_void_to_string | undefined> {
    return updateWatch$kernel<tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined): tsonicTypeScriptRuntime.Location<SyncSet__from_collections<Path__from_tspath>> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4);
}
