import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { configFileNames as configFileNames__from_project } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { Map as Map__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function Map$Delete$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: {
    value: Map__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>;
} | undefined, $argument1: Path__from_tspath): void {
    return Map__from_dirty.Delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, $argument1);
}
export function Map$Delete$Named_tspath$Path$PointerTo_Named_autoimport$directory($argument0: {
    value: Map__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>;
} | undefined, $argument1: Path__from_tspath): void {
    return Map__from_dirty.Delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<directory__from_autoimport> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, $argument1);
}
export function Map$Delete$Named_tspath$Path$PointerTo_Named_project$configFileNames($argument0: {
    value: Map__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>;
} | undefined, $argument1: Path__from_tspath): void {
    return Map__from_dirty.Delete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): Path__from_tspath => {
        return new Path__from_tspath($argument0);
    }, ($argument0: tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined): tsonicTypeScriptRuntime.Location<configFileNames__from_project> | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, $argument1);
}
