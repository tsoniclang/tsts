import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { NodeId as NodeId__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ids.js";
import type { SymbolTable as SymbolTable__from_ast, Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { redirectsFile as redirectsFile__from_compiler } from "../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileloader.js";
import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import { moduleCompletionNameAndKind as moduleCompletionNameAndKind__from_ls } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/string_completions.js";
import { ModulePath as ModulePath__from_modulespecifiers } from "../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
import * as generic_maps_kernel from "@gotots/gostdlib/internal/facets/generic-maps-kernel.js";
export function Values$MapOf_Named_ast$NodeId_To_PointerTo_Named_ast$Node$Named_ast$NodeId$PointerTo_Named_ast$Node($argument0: GoMapValue<NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): iter.Seq<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: GoMapValue<NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): GoMapValue<NodeId__from_ast, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Values$MapOf_Named_tspath$Path_To_PointerTo_Named_ast$SourceFile$Named_tspath$Path$PointerTo_Named_ast$SourceFile($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): iter.Seq<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<Path__from_tspath, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Values$MapOf_Named_tspath$Path_To_PointerTo_Named_compiler$redirectsFile$Named_tspath$Path$PointerTo_Named_compiler$redirectsFile($argument0: GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>): iter.Seq<redirectsFile__from_compiler | undefined> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>, Path__from_tspath, redirectsFile__from_compiler | undefined>(($argument0: GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined>): GoMapValue<Path__from_tspath, redirectsFile__from_compiler | undefined> => {
        return $argument0;
    }, ($argument0: redirectsFile__from_compiler | undefined): redirectsFile__from_compiler | undefined => {
        return $argument0;
    }, $argument0);
}
export function Values$MapOf_Named_tspath$Path_To_string$Named_tspath$Path$string($argument0: GoMapValue<Path__from_tspath, gostring>): iter.Seq<gostring> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<Path__from_tspath, gostring>, Path__from_tspath, gostring>(($argument0: GoMapValue<Path__from_tspath, gostring>): GoMapValue<Path__from_tspath, gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
export function Values$MapOf_string_To_Named_ls$moduleCompletionNameAndKind$string$Named_ls$moduleCompletionNameAndKind($argument0: GoMapValue<gostring, moduleCompletionNameAndKind__from_ls>): iter.Seq<moduleCompletionNameAndKind__from_ls> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<gostring, moduleCompletionNameAndKind__from_ls>, gostring, moduleCompletionNameAndKind__from_ls>(($argument0: GoMapValue<gostring, moduleCompletionNameAndKind__from_ls>): GoMapValue<gostring, moduleCompletionNameAndKind__from_ls> => {
        return $argument0;
    }, ($argument0: moduleCompletionNameAndKind__from_ls): moduleCompletionNameAndKind__from_ls => {
        return moduleCompletionNameAndKind__from_ls.$copy($argument0);
    }, $argument0);
}
export function Values$MapOf_string_To_Named_modulespecifiers$ModulePath$string$Named_modulespecifiers$ModulePath($argument0: GoMapValue<gostring, ModulePath__from_modulespecifiers>): iter.Seq<ModulePath__from_modulespecifiers> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<gostring, ModulePath__from_modulespecifiers>, gostring, ModulePath__from_modulespecifiers>(($argument0: GoMapValue<gostring, ModulePath__from_modulespecifiers>): GoMapValue<gostring, ModulePath__from_modulespecifiers> => {
        return $argument0;
    }, ($argument0: ModulePath__from_modulespecifiers): ModulePath__from_modulespecifiers => {
        return ModulePath__from_modulespecifiers.$copy($argument0);
    }, $argument0);
}
export function Values$MapOf_string_To_PointerTo_Named_ast$Node$string$PointerTo_Named_ast$Node($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): iter.Seq<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Values$MapOf_string_To_PointerTo_Named_ast$SourceFile$string$PointerTo_Named_ast$SourceFile($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): iter.Seq<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return generic_maps_kernel.MapsValuesKernel<GoMapValue<gostring, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, gostring, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: GoMapValue<gostring, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Values$Named_ast$SymbolTable$string$PointerTo_Named_ast$Symbol($argument0: SymbolTable__from_ast): iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return generic_maps_kernel.MapsValuesKernel<SymbolTable__from_ast, gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: SymbolTable__from_ast): GoMapValue<gostring, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> => {
        return $argument0.$value;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
