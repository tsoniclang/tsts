import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { redirectsFile as redirectsFile__from_compiler } from "../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileloader.js";
import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool } from "@gotots/runtime/scalars.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
export function EqualFunc$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument2: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined): bool {
    return generic_maps_kernel.MapsEqualFuncKernel<GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
export function EqualFunc$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$Named_tspath$Path$PointerTo_Named_compiler$redirectsFile$PointerTo_Named_compiler$redirectsFile($argument0: GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>, $argument1: GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>, $argument2: (($0: redirectsFile__from_compiler | undefined, $1: redirectsFile__from_compiler | undefined) => bool) | undefined): bool {
    return generic_maps_kernel.MapsEqualFuncKernel<GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>, GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>, Path__from_tspath, redirectsFile__from_compiler | undefined, redirectsFile__from_compiler | undefined>(($argument0: GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>): GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined> => {
        return $argument0;
    }, ($argument0: GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>): GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined> => {
        return $argument0;
    }, ($argument0: redirectsFile__from_compiler | undefined): redirectsFile__from_compiler | undefined => {
        return $argument0;
    }, ($argument0: redirectsFile__from_compiler | undefined): redirectsFile__from_compiler | undefined => {
        return $argument0;
    }, $argument0, $argument1, $argument2);
}
