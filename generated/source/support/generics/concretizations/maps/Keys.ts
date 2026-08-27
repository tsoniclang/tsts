import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { TypeFacts as TypeFacts__from_checker } from "../../../../modules/github.com/microsoft/typescript-go/internal/checker/checker.js";
import type { Diagnostic as Diagnostic__from_diagnosticwriter, FileLike as FileLike__from_diagnosticwriter } from "../../../../modules/github.com/microsoft/typescript-go/internal/diagnosticwriter/diagnosticwriter.js";
import type { newImportBinding as newImportBinding__from_autoimport } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/autoimport/fix.js";
import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import type { GoEmptyStruct } from "@gotots/runtime/struct.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
export function Keys$MapOf_Named_diagnosticwriter$FileLike_To_SliceOf_Named_diagnosticwriter$Diagnostic$Named_diagnosticwriter$FileLike$SliceOf_Named_diagnosticwriter$Diagnostic($argument0: GoMapValue<FileLike__from_diagnosticwriter | undefined, RuntimeSlice<Diagnostic__from_diagnosticwriter | undefined>>): iter.Seq<FileLike__from_diagnosticwriter | undefined> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<FileLike__from_diagnosticwriter | undefined, RuntimeSlice<Diagnostic__from_diagnosticwriter | undefined>>, FileLike__from_diagnosticwriter | undefined, RuntimeSlice<Diagnostic__from_diagnosticwriter | undefined>>(($argument0: GoMapValue<FileLike__from_diagnosticwriter | undefined, RuntimeSlice<Diagnostic__from_diagnosticwriter | undefined>>): GoMapValue<FileLike__from_diagnosticwriter | undefined, RuntimeSlice<Diagnostic__from_diagnosticwriter | undefined>> => {
        return $argument0;
    }, ($argument0: FileLike__from_diagnosticwriter | undefined): FileLike__from_diagnosticwriter | undefined => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_Named_tspath$Path_To_Struct_void$Named_tspath$Path$Struct_void($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): iter.Seq<Path__from_tspath> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<Path__from_tspath, GoEmptyStruct>, Path__from_tspath, GoEmptyStruct>(($argument0: GoMapValue<Path__from_tspath, GoEmptyStruct>): GoMapValue<Path__from_tspath, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_PointerTo_Named_ast$SourceFile_To_Named_tspath$Path$PointerTo_Named_ast$SourceFile$Named_tspath$Path($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, Path__from_tspath>): iter.Seq<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, Path__from_tspath>, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, Path__from_tspath>(($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, Path__from_tspath>): GoMapValue<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, Path__from_tspath> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_PointerTo_Named_ast$Symbol_To_string$PointerTo_Named_ast$Symbol$string($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, gostring>): iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, gostring>, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, gostring>(($argument0: GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, gostring>): GoMapValue<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, gostring> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_string_To_Named_checker$TypeFacts$string$Named_checker$TypeFacts($argument0: GoMapValue<gostring, TypeFacts__from_checker>): iter.Seq<gostring> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<gostring, TypeFacts__from_checker>, gostring, TypeFacts__from_checker>(($argument0: GoMapValue<gostring, TypeFacts__from_checker>): GoMapValue<gostring, TypeFacts__from_checker> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_string_To_PointerTo_Named_autoimport$newImportBinding$string$PointerTo_Named_autoimport$newImportBinding($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>): iter.Seq<gostring> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>, gostring, tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>(($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined>): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<newImportBinding__from_autoimport> | undefined> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_string_To_Struct_void$string$Struct_void($argument0: GoMapValue<gostring, GoEmptyStruct>): iter.Seq<gostring> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<gostring, GoEmptyStruct>, gostring, GoEmptyStruct>(($argument0: GoMapValue<gostring, GoEmptyStruct>): GoMapValue<gostring, GoEmptyStruct> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_string_To_bool$string$bool($argument0: GoMapValue<gostring, bool>): iter.Seq<gostring> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<gostring, bool>, gostring, bool>(($argument0: GoMapValue<gostring, bool>): GoMapValue<gostring, bool> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
export function Keys$MapOf_string_To_string$string$string($argument0: GoMapValue<gostring, gostring>): iter.Seq<gostring> {
    return generic_maps_kernel.MapsKeysKernel<GoMapValue<gostring, gostring>, gostring, gostring>(($argument0: GoMapValue<gostring, gostring>): GoMapValue<gostring, gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
