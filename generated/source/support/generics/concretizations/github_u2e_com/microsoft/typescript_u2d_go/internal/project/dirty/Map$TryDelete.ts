import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { RegistryBucket as RegistryBucket__from_autoimport } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { Map as Map__from_dirty } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/dirty/map.js";
import { Path as Path__from_tspath } from "../../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
export function Map$TryDelete$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket($argument0: {
    value: Map__from_dirty<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>;
} | undefined, $argument1: Path__from_tspath): bool {
    return Map__from_dirty.TryDelete$kernel<Path__from_tspath, tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined>($argument0, ($argument0: tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined): tsonicTypeScriptRuntime.Location<RegistryBucket__from_autoimport> | undefined => {
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
