import type { watchedDir as watchedDir__from_execute } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/execute/watcher.js";
import type { RegistryBucket as RegistryBucket__from_autoimport, directory as directory__from_autoimport } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/registry.js";
import type { configFileEntry as configFileEntry__from_project } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/project/configfileregistry.js";
import type { Path as Path__from_tspath } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { DiffMapsFunc$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function DiffMapsFunc$Named_tspath$Path$PointerTo_Named_autoimport$RegistryBucket$Struct_void($argument0: GoMapValue<Path__from_tspath, RegistryBucket__from_autoimport | undefined>, $argument1: GoMapValue<Path__from_tspath, GoEmptyStruct>, $argument2: (($0: RegistryBucket__from_autoimport | undefined, $1: GoEmptyStruct) => bool) | undefined, $argument3: (($0: Path__from_tspath, $1: GoEmptyStruct) => void) | undefined, $argument4: (($0: Path__from_tspath, $1: RegistryBucket__from_autoimport | undefined) => void) | undefined, $argument5: (($0: Path__from_tspath, $1: RegistryBucket__from_autoimport | undefined, $2: GoEmptyStruct) => void) | undefined): void {
    return DiffMapsFunc$kernel<Path__from_tspath, RegistryBucket__from_autoimport | undefined, GoEmptyStruct>(($argument0: GoEmptyStruct): GoEmptyStruct => {
        return GoEmptyStruct.$copy($argument0);
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: RegistryBucket__from_autoimport | undefined): RegistryBucket__from_autoimport | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5);
}
export function DiffMapsFunc$Named_tspath$Path$PointerTo_Named_autoimport$directory$string($argument0: GoMapValue<Path__from_tspath, directory__from_autoimport | undefined>, $argument1: GoMapValue<Path__from_tspath, gostring>, $argument2: (($0: directory__from_autoimport | undefined, $1: gostring) => bool) | undefined, $argument3: (($0: Path__from_tspath, $1: gostring) => void) | undefined, $argument4: (($0: Path__from_tspath, $1: directory__from_autoimport | undefined) => void) | undefined, $argument5: (($0: Path__from_tspath, $1: directory__from_autoimport | undefined, $2: gostring) => void) | undefined): void {
    return DiffMapsFunc$kernel<Path__from_tspath, directory__from_autoimport | undefined, gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: directory__from_autoimport | undefined): directory__from_autoimport | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5);
}
export function DiffMapsFunc$Named_tspath$Path$PointerTo_Named_project$configFileEntry$PointerTo_Named_project$configFileEntry($argument0: GoMapValue<Path__from_tspath, {
    value: configFileEntry__from_project;
} | undefined>, $argument1: GoMapValue<Path__from_tspath, {
    value: configFileEntry__from_project;
} | undefined>, $argument2: (($0: {
    value: configFileEntry__from_project;
} | undefined, $1: {
    value: configFileEntry__from_project;
} | undefined) => bool) | undefined, $argument3: (($0: Path__from_tspath, $1: {
    value: configFileEntry__from_project;
} | undefined) => void) | undefined, $argument4: (($0: Path__from_tspath, $1: {
    value: configFileEntry__from_project;
} | undefined) => void) | undefined, $argument5: (($0: Path__from_tspath, $1: {
    value: configFileEntry__from_project;
} | undefined, $2: {
    value: configFileEntry__from_project;
} | undefined) => void) | undefined): void {
    return DiffMapsFunc$kernel<Path__from_tspath, {
        value: configFileEntry__from_project;
    } | undefined, {
        value: configFileEntry__from_project;
    } | undefined>(($argument0: {
        value: configFileEntry__from_project;
    } | undefined): {
        value: configFileEntry__from_project;
    } | undefined => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: {
        value: configFileEntry__from_project;
    } | undefined): {
        value: configFileEntry__from_project;
    } | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5);
}
export function DiffMapsFunc$string$PointerTo_Named_execute$watchedDir$bool($argument0: GoMapValue<gostring, watchedDir__from_execute | undefined>, $argument1: GoMapValue<gostring, bool>, $argument2: (($0: watchedDir__from_execute | undefined, $1: bool) => bool) | undefined, $argument3: (($0: gostring, $1: bool) => void) | undefined, $argument4: (($0: gostring, $1: watchedDir__from_execute | undefined) => void) | undefined, $argument5: (($0: gostring, $1: watchedDir__from_execute | undefined, $2: bool) => void) | undefined): void {
    return DiffMapsFunc$kernel<gostring, watchedDir__from_execute | undefined, bool>(($argument0: bool): bool => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: watchedDir__from_execute | undefined): watchedDir__from_execute | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2, $argument3, $argument4, $argument5);
}
