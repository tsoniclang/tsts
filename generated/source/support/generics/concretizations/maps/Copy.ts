import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/kind_generated.js";
import type { Export as Export__from_autoimport } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/export.js";
import type { SourceOutputAndProjectReference as SourceOutputAndProjectReference__from_tsoptions } from "../../../../modules/github.com/microsoft/typescript-go/internal/tsoptions/parsedcommandline.js";
import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../interface-contracts.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
import { GoEmptyStruct } from "@gotots/runtime/struct.js";
export function Copy$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$MapOf_Named_tspath$Path_To_PointerTo_Named_tsoptions$SourceOutputAndProjectReference$Named_tspath$Path$PointerTo_Named_tsoptions$SourceOutputAndProjectReference($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined>, $argument1: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined>, GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined>, Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined>(($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined): tsonicTypeScriptRuntime.Location<SourceOutputAndProjectReference__from_tsoptions> | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Copy$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export$MapOf_Named_tspath$Path_To_SliceOf_PointerTo_Named_autoimport$Export$Named_tspath$Path$SliceOf_PointerTo_Named_autoimport$Export($argument0: GoMapValue<Path__from_tspath, RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined>>, $argument1: GoMapValue<Path__from_tspath, RuntimeSlice<{
    value: Export__from_autoimport;
} | undefined>>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>>, GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>>, Path__from_tspath, RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>>(($argument0: GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>>): GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>>): GoMapValue<Path__from_tspath, RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined>): RuntimeSlice<{
        value: Export__from_autoimport;
    } | undefined> => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Copy$MapOf_Named_tspath$Path_To_Struct_void$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>, $argument1: GoMapValue<Path__from_tspath, GoEmptyStruct>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<Path__from_tspath, GoEmptyStruct>, GoMapValue<Path__from_tspath, GoEmptyStruct>, Path__from_tspath, GoEmptyStruct>(($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: GoEmptyStruct): GoEmptyStruct => {
        return (void GoEmptyStruct.$copy,
            $argument0);
    }, $argument0, $argument1);
}
export function Copy$MapOf_Named_tspath$Path_To_string$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string($argument0: GoMapValue<Path__from_tspath, gostring>, $argument1: GoMapValue<Path__from_tspath, gostring>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<Path__from_tspath, gostring>, GoMapValue<Path__from_tspath, gostring>, Path__from_tspath, gostring>(($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Copy$MapOf_string_To_Interface_void$MapOf_string_To_Interface_void$string$Interface_void($argument0: GoMapValue<gostring, GoInterface | undefined>, $argument1: GoMapValue<gostring, GoInterface | undefined>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<gostring, GoInterface | undefined>, GoMapValue<gostring, GoInterface | undefined>, gostring, GoInterface | undefined>(($argument0: GoMapValue<gostring, GoInterface | undefined>): GoMapValue<gostring, GoInterface | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, GoInterface | undefined>): GoMapValue<gostring, GoInterface | undefined> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Copy$MapOf_string_To_MapOf_Named_tspath$Path_To_string$MapOf_string_To_MapOf_Named_tspath$Path_To_string$string$MapOf_Named_tspath$Path_To_string($argument0: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>, $argument1: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>, GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>, gostring, GoMapValue<Path__from_tspath, gostring>>(($argument0: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>): GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>>): GoMapValue<gostring, GoMapValue<Path__from_tspath, gostring>> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Copy$MapOf_string_To_Named_ast$Kind$MapOf_string_To_Named_ast$Kind$string$Named_ast$Kind($argument0: GoMapValue<gostring, Kind__from_ast>, $argument1: GoMapValue<gostring, Kind__from_ast>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<gostring, Kind__from_ast>, GoMapValue<gostring, Kind__from_ast>, gostring, Kind__from_ast>(($argument0: GoMapValue<gostring, Kind__from_ast>): GoMapValue<gostring, Kind__from_ast> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, Kind__from_ast>): GoMapValue<gostring, Kind__from_ast> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: Kind__from_ast): Kind__from_ast => {
        return $argument0;
    }, $argument0, $argument1);
}
export function Copy$MapOf_string_To_bool$MapOf_string_To_bool$string$bool($argument0: GoMapValue<gostring, bool>, $argument1: GoMapValue<gostring, bool>): void {
    return generic_maps_kernel.MapsCopyKernel<GoMapValue<gostring, bool>, GoMapValue<gostring, bool>, gostring, bool>(($argument0: GoMapValue<gostring, bool>): GoMapValue<gostring, bool> => {
        return $argument0;
    }, ($argument0: GoMapValue<gostring, bool>): GoMapValue<gostring, bool> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: bool): bool => {
        return $argument0;
    }, $argument0, $argument1);
}
