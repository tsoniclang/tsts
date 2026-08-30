import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentRange$Storage as CommentRange__from_ast$Storage, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { redirectsFile as redirectsFile__from_compiler } from "../../../../modules/github.com/microsoft/typescript-go/internal/compiler/fileloader.js";
import type { moduleCompletionNameAndKind$Storage as moduleCompletionNameAndKind__from_ls$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/string_completions.js";
import type { ModulePath$Storage as ModulePath__from_modulespecifiers$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
import type { EmitHelper as EmitHelper__from_printer } from "../../../../modules/github.com/microsoft/typescript-go/internal/printer/helpers.js";
import type { Path as Path__from_tspath } from "../../../../modules/github.com/microsoft/typescript-go/internal/tspath/path.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../interface-contracts.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { CommentRange as CommentRange__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import { moduleCompletionNameAndKind as moduleCompletionNameAndKind__from_ls } from "../../../../modules/github.com/microsoft/typescript-go/internal/ls/string_completions.js";
import { ModulePath as ModulePath__from_modulespecifiers } from "../../../../modules/github.com/microsoft/typescript-go/internal/modulespecifiers/types.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function Collect$Interface_void($argument0: iter.Seq<GoInterface | undefined>): RuntimeSlice<GoInterface | undefined> {
    return generic_slices_kernel.SlicesCollectKernel<GoInterface | undefined, GoInterface | undefined>(($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, ($argument0: GoInterface | undefined): GoInterface | undefined => {
        return $argument0;
    }, $argument0);
}
export function Collect$Named_ast$CommentRange($argument0: iter.Seq<CommentRange__from_ast>): RuntimeSlice<CommentRange__from_ast$Storage> {
    return generic_slices_kernel.SlicesCollectKernel<CommentRange__from_ast, CommentRange__from_ast$Storage>(($argument0: CommentRange__from_ast): CommentRange__from_ast => {
        return CommentRange__from_ast.$copy($argument0);
    }, ($argument0: CommentRange__from_ast): CommentRange__from_ast$Storage => {
        return CommentRange__from_ast.$storageOf($argument0);
    }, $argument0);
}
export function Collect$Named_ls$moduleCompletionNameAndKind($argument0: iter.Seq<moduleCompletionNameAndKind__from_ls>): RuntimeSlice<moduleCompletionNameAndKind__from_ls$Storage> {
    return generic_slices_kernel.SlicesCollectKernel<moduleCompletionNameAndKind__from_ls, moduleCompletionNameAndKind__from_ls$Storage>(($argument0: moduleCompletionNameAndKind__from_ls): moduleCompletionNameAndKind__from_ls => {
        return moduleCompletionNameAndKind__from_ls.$copy($argument0);
    }, ($argument0: moduleCompletionNameAndKind__from_ls): moduleCompletionNameAndKind__from_ls$Storage => {
        return moduleCompletionNameAndKind__from_ls.$storageOf($argument0);
    }, $argument0);
}
export function Collect$Named_modulespecifiers$ModulePath($argument0: iter.Seq<ModulePath__from_modulespecifiers>): RuntimeSlice<ModulePath__from_modulespecifiers$Storage> {
    return generic_slices_kernel.SlicesCollectKernel<ModulePath__from_modulespecifiers, ModulePath__from_modulespecifiers$Storage>(($argument0: ModulePath__from_modulespecifiers): ModulePath__from_modulespecifiers => {
        return ModulePath__from_modulespecifiers.$copy($argument0);
    }, ($argument0: ModulePath__from_modulespecifiers): ModulePath__from_modulespecifiers$Storage => {
        return ModulePath__from_modulespecifiers.$storageOf($argument0);
    }, $argument0);
}
export function Collect$Named_tspath$Path($argument0: iter.Seq<Path__from_tspath>): RuntimeSlice<gostring> {
    return generic_slices_kernel.SlicesCollectKernel<Path__from_tspath, gostring>(($argument0: Path__from_tspath): Path__from_tspath => {
        return $argument0;
    }, ($argument0: Path__from_tspath): gostring => {
        return $argument0.$value;
    }, $argument0);
}
export function Collect$PointerTo_Named_ast$Node($argument0: iter.Seq<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    return generic_slices_kernel.SlicesCollectKernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Collect$PointerTo_Named_ast$SourceFile($argument0: iter.Seq<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return generic_slices_kernel.SlicesCollectKernel<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Collect$PointerTo_Named_ast$Symbol($argument0: iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return generic_slices_kernel.SlicesCollectKernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined, tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Collect$PointerTo_Named_compiler$redirectsFile($argument0: iter.Seq<tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined> {
    return generic_slices_kernel.SlicesCollectKernel<tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined, tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined): tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined): tsonicTypeScriptRuntime.Location<redirectsFile__from_compiler> | undefined => {
        return $argument0;
    }, $argument0);
}
export function Collect$PointerTo_Named_printer$EmitHelper($argument0: iter.Seq<{
    value: EmitHelper__from_printer;
} | undefined>): RuntimeSlice<{
    value: EmitHelper__from_printer;
} | undefined> {
    return generic_slices_kernel.SlicesCollectKernel<{
        value: EmitHelper__from_printer;
    } | undefined, {
        value: EmitHelper__from_printer;
    } | undefined>(($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, ($argument0: {
        value: EmitHelper__from_printer;
    } | undefined): {
        value: EmitHelper__from_printer;
    } | undefined => {
        return $argument0;
    }, $argument0);
}
export function Collect$string($argument0: iter.Seq<gostring>): RuntimeSlice<gostring> {
    return generic_slices_kernel.SlicesCollectKernel<gostring, gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
