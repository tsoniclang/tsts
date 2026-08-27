import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function Equal$MapOf_Named_tspath$Path_To_Named_tspath$Path$MapOf_Named_tspath$Path_To_Named_tspath$Path$Named_tspath$Path$Named_tspath$Path($argument0: GoMapValue<Path__from_tspath, Path__from_tspath>, $argument1: GoMapValue<Path__from_tspath, Path__from_tspath>): bool {
    return generic_maps_kernel.MapsEqualKernel<GoMapValue<Path__from_tspath, Path__from_tspath>, GoMapValue<Path__from_tspath, Path__from_tspath>, Path__from_tspath, Path__from_tspath>(($argument0: GoMapValue<Path__from_tspath, Path__from_tspath>): GoMapValue<Path__from_tspath, Path__from_tspath> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, Path__from_tspath>): GoMapValue<Path__from_tspath, Path__from_tspath> => {
        return $argument0;
    }, ($argument0: Path__from_tspath, $argument1: Path__from_tspath): bool => {
        return $argument0.$value === $argument1.$value;
    }, $argument0, $argument1);
}
export function Equal$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>, $argument1: GoMapValue<Path__from_tspath, GoEmptyStruct>): bool {
    return generic_maps_kernel.MapsEqualKernel<GoMapValue<Path__from_tspath, GoEmptyStruct>, GoMapValue<Path__from_tspath, GoEmptyStruct>, Path__from_tspath, GoEmptyStruct>(($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: GoEmptyStruct, $argument1: GoEmptyStruct): bool => {
        return GoEmptyStruct.$equal($argument0, $argument1);
    }, $argument0, $argument1);
}
export function Equal$MapOf_Named_tspath$Path_To_string$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string($argument0: GoMapValue<Path__from_tspath, gostring>, $argument1: GoMapValue<Path__from_tspath, gostring>): bool {
    return generic_maps_kernel.MapsEqualKernel<GoMapValue<Path__from_tspath, gostring>, GoMapValue<Path__from_tspath, gostring>, Path__from_tspath, gostring>(($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: gostring, $argument1: gostring): bool => {
        return $argument0 === $argument1;
    }, $argument0, $argument1);
}
