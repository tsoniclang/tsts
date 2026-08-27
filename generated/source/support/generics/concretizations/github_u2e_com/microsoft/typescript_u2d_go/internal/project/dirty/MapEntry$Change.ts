import type { RegistryBucket as RegistryBucket__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { CloneableMap as CloneableMap__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/cloneablemap.js";
import { MapEntry as MapEntry__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import { $go$constraint_method$dirty$Clone$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, $go$constraint_method$dirty$Clone$PointerTo_Named_autoimport$RegistryBucket_to_PointerTo_Named_autoimport$RegistryBucket, $go$constraint_method$dirty$Clone$PointerTo_Named_project$configFileNames_to_PointerTo_Named_project$configFileNames } from "../../../../../../../capabilities/constraint_method.js";
export function MapEntry$Change$Named_tspath$Path$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string($argument0: MapEntry__from_dirty<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>> | undefined, $argument1: (($0: CloneableMap__from_dirty<Path__from_tspath, gostring>) => void) | undefined): void {
    return MapEntry__from_dirty.Change$kernel<Path__from_tspath, CloneableMap__from_dirty<Path__from_tspath, gostring>>($argument0, $go$constraint_method$dirty$Clone$Named_dirty$CloneableMapOf_Named_tspath$Path_And_string_to_Named_dirty$CloneableMapOf_Named_tspath$Path_And_string, ($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): CloneableMap__from_dirty<Path__from_tspath, gostring> => {
        return new CloneableMap__from_dirty($argument0);
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: CloneableMap__from_dirty<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0.$value;
    }, $argument1);
}
export function MapEntry$Change$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: MapEntry__from_dirty<Path__from_tspath, RegistryBucket__from_autoimport | undefined> | undefined, $argument1: (($0: RegistryBucket__from_autoimport | undefined) => void) | undefined): void {
    return MapEntry__from_dirty.Change$kernel<Path__from_tspath, RegistryBucket__from_autoimport | undefined>($argument0, $go$constraint_method$dirty$Clone$PointerTo_Named_autoimport$RegistryBucket_to_PointerTo_Named_autoimport$RegistryBucket, ($argument0: RegistryBucket__from_autoimport | undefined): RegistryBucket__from_autoimport | undefined => {
        return $argument0;
    }, ($argument0: RegistryBucket__from_autoimport | undefined): RegistryBucket__from_autoimport | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: RegistryBucket__from_autoimport | undefined): RegistryBucket__from_autoimport | undefined => {
        return $argument0;
    }, $argument1);
}
export function MapEntry$Change$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: MapEntry__from_dirty<Path__from_tspath, configFileNames__from_project | undefined> | undefined, $argument1: (($0: configFileNames__from_project | undefined) => void) | undefined): void {
    return MapEntry__from_dirty.Change$kernel<Path__from_tspath, configFileNames__from_project | undefined>($argument0, $go$constraint_method$dirty$Clone$PointerTo_Named_project$configFileNames_to_PointerTo_Named_project$configFileNames, ($argument0: configFileNames__from_project | undefined): configFileNames__from_project | undefined => {
        return $argument0;
    }, ($argument0: configFileNames__from_project | undefined): configFileNames__from_project | undefined => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: configFileNames__from_project | undefined): configFileNames__from_project | undefined => {
        return $argument0;
    }, $argument1);
}
