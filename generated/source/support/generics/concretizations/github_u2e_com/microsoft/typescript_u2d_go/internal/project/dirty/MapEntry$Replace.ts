import type { RegistryBucket as RegistryBucket__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { MapEntry as MapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function MapEntry$Replace$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: MapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined> | undefined, $argument1: RegistryBucket__from_autoimport | undefined): void {
    return MapEntry__from_dirty.Replace$kernel<Path__from_tspath, RegistryBucket__from_autoimport | undefined>($argument0, ($argument0: RegistryBucket__from_autoimport | undefined): RegistryBucket__from_autoimport | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: RegistryBucket__from_autoimport | undefined): RegistryBucket__from_autoimport | undefined => {
        return $argument0;
    }, $argument1);
}
