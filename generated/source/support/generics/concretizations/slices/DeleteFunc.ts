import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentRange$Storage as CommentRange__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { ResolvedEntrypoint as ResolvedEntrypoint__from___go_module } from "../../../../modules/github.com/microsoft/typescript-go/internal/module/resolver.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { CommentRange as CommentRange__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function DeleteFunc$SliceOf_Named_ast$CommentRange$Named_ast$CommentRange($argument0: RuntimeSlice<CommentRange__from_ast$Storage>, $argument1: (($0: CommentRange__from_ast) => bool) | undefined): RuntimeSlice<CommentRange__from_ast$Storage> {
    return generic_slices_kernel.SlicesDeleteFuncKernel<RuntimeSlice<CommentRange__from_ast$Storage>, CommentRange__from_ast, CommentRange__from_ast$Storage>(($argument0: RuntimeSlice<CommentRange__from_ast$Storage>): RuntimeSlice<CommentRange__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<CommentRange__from_ast$Storage>): RuntimeSlice<CommentRange__from_ast$Storage> => {
        return $argument0;
    }, ($argument0: CommentRange__from_ast): CommentRange__from_ast => {
        return CommentRange__from_ast.$copy($argument0);
    }, ($argument0: CommentRange__from_ast$Storage): CommentRange__from_ast => {
        return CommentRange__from_ast.$fromStorage($argument0);
    }, ($argument0: CommentRange__from_ast): CommentRange__from_ast$Storage => {
        return CommentRange__from_ast.$storageOf($argument0);
    }, (): CommentRange__from_ast => {
        return CommentRange__from_ast.$zero();
    }, $argument0, $argument1);
}
export function DeleteFunc$SliceOf_PointerTo_Named___go_module$ResolvedEntrypoint$PointerTo_Named___go_module$ResolvedEntrypoint($argument0: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>, $argument1: (($0: ResolvedEntrypoint__from___go_module | undefined) => bool) | undefined): RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined> {
    return generic_slices_kernel.SlicesDeleteFuncKernel<RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>, ResolvedEntrypoint__from___go_module | undefined, ResolvedEntrypoint__from___go_module | undefined>(($argument0: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>): RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined>): RuntimeSlice<ResolvedEntrypoint__from___go_module | undefined> => {
        return $argument0;
    }, ($argument0: ResolvedEntrypoint__from___go_module | undefined): ResolvedEntrypoint__from___go_module | undefined => {
        return $argument0;
    }, ($argument0: ResolvedEntrypoint__from___go_module | undefined): ResolvedEntrypoint__from___go_module | undefined => {
        return $argument0;
    }, ($argument0: ResolvedEntrypoint__from___go_module | undefined): ResolvedEntrypoint__from___go_module | undefined => {
        return $argument0;
    }, (): ResolvedEntrypoint__from___go_module | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
export function DeleteFunc$SliceOf_PointerTo_Named_ast$SourceFile$PointerTo_Named_ast$SourceFile($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, $argument1: (($0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined) => bool) | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> {
    return generic_slices_kernel.SlicesDeleteFuncKernel<RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>(($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined> => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return $argument0;
    }, (): tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined => {
        return void 0;
    }, $argument0, $argument1);
}
