import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Checker as Checker__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { SyncMap as SyncMap__from_collections } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/collections/syncmap.js";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import type { MapEntry as MapEntry__from_dirty } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring, int, int32 } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { FirstResult$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function FirstResult$MapOf_Named_tspath$Path_To_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>, $argument1: RuntimeSlice<GoInterface | undefined>): GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> {
    return FirstResult$kernel<GoMapValue<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>>($argument0, $argument1);
}
export function FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$RegistryBucket($argument0: GoMapValue<Path__from_tspath, RegistryBucket__from_autoimport | undefined>, $argument1: RuntimeSlice<GoInterface | undefined>): GoMapValue<Path__from_tspath, RegistryBucket__from_autoimport | undefined> {
    return FirstResult$kernel<GoMapValue<Path__from_tspath, RegistryBucket__from_autoimport | undefined>>($argument0, $argument1);
}
export function FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_autoimport$directory($argument0: GoMapValue<Path__from_tspath, directory__from_autoimport | undefined>, $argument1: RuntimeSlice<GoInterface | undefined>): GoMapValue<Path__from_tspath, directory__from_autoimport | undefined> {
    return FirstResult$kernel<GoMapValue<Path__from_tspath, directory__from_autoimport | undefined>>($argument0, $argument1);
}
export function FirstResult$MapOf_Named_tspath$Path_To_PointerTo_Named_collections$SyncMapOf_Named_tspath$Path_And_string($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>, $argument1: RuntimeSlice<GoInterface | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined> {
    return FirstResult$kernel<GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SyncMap__from_collections<Path__from_tspath, gostring>> | undefined>>($argument0, $argument1);
}
export function FirstResult$Named_tspath$Path($argument0: Path__from_tspath, $argument1: RuntimeSlice<GoInterface | undefined>): Path__from_tspath {
    return FirstResult$kernel<Path__from_tspath>($argument0, $argument1);
}
export function FirstResult$PointerTo_Named_autoimport$directory($argument0: directory__from_autoimport | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): directory__from_autoimport | undefined {
    return FirstResult$kernel<directory__from_autoimport | undefined>($argument0, $argument1);
}
export function FirstResult$PointerTo_Named_checker$Checker($argument0: {
    value: Checker__from_checker;
} | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): {
    value: Checker__from_checker;
} | undefined {
    return FirstResult$kernel<{
        value: Checker__from_checker;
    } | undefined>($argument0, $argument1);
}
export function FirstResult$PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$RegistryBucket($argument0: MapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined> | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): MapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined> | undefined {
    return FirstResult$kernel<MapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined> | undefined>($argument0, $argument1);
}
export function FirstResult$PointerTo_Named_dirty$MapEntryOf_Named_tspath$Path_And_PointerTo_Named_autoimport$directory($argument0: MapEntry__from_dirty<Path__from_tspath, directory__from_autoimport | undefined> | undefined, $argument1: RuntimeSlice<GoInterface | undefined>): MapEntry__from_dirty<Path__from_tspath, directory__from_autoimport | undefined> | undefined {
    return FirstResult$kernel<MapEntry__from_dirty<Path__from_tspath, directory__from_autoimport | undefined> | undefined>($argument0, $argument1);
}
export function FirstResult$SliceOf_PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: RuntimeSlice<GoInterface | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return FirstResult$kernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>($argument0, $argument1);
}
export function FirstResult$SliceOf_string($argument0: RuntimeSlice<gostring>, $argument1: RuntimeSlice<GoInterface | undefined>): RuntimeSlice<gostring> {
    return FirstResult$kernel<RuntimeSlice<gostring>>($argument0, $argument1);
}
export function FirstResult$int($argument0: int, $argument1: RuntimeSlice<GoInterface | undefined>): int {
    return FirstResult$kernel<int>($argument0, $argument1);
}
export function FirstResult$rune($argument0: int32, $argument1: RuntimeSlice<GoInterface | undefined>): int32 {
    return FirstResult$kernel<int32>($argument0, $argument1);
}
