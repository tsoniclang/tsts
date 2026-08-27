import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { SourceFile as SourceFile__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../interface-contracts.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { MapFiltered$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function MapFiltered$PointerTo_Named_ast$SourceFile$string($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => [
    gostring,
    bool
]) | undefined): RuntimeSlice<gostring> {
    return MapFiltered$kernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, gostring>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
export function MapFiltered$string$Interface_void($argument0: RuntimeSlice<gostring>, $argument1: (($0: gostring) => [
    GoInterface | undefined,
    bool
]) | undefined): RuntimeSlice<GoInterface | undefined> {
    return MapFiltered$kernel<gostring, GoInterface | undefined>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, (): GoInterface | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
