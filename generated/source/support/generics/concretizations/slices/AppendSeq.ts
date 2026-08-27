import type { CommentRange$Storage as CommentRange__from_ast$Storage } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { TextPos as TextPos__from_core } from "../../../../modules/github.com/microsoft/typescript-go/internal/core/text.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { CommentRange as CommentRange__from_ast } from "../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import * as generic_slices_kernel from "@gotots/gostdlib/internal/facets/generic-slices-kernel.js";
export function AppendSeq$SliceOf_Named_ast$CommentRange$Named_ast$CommentRange($argument0: RuntimeSlice<CommentRange__from_ast$Storage>, $argument1: iter.Seq<CommentRange__from_ast>): RuntimeSlice<CommentRange__from_ast$Storage> {
    return generic_slices_kernel.SlicesAppendSeqKernel<RuntimeSlice<CommentRange__from_ast$Storage>, CommentRange__from_ast, CommentRange__from_ast$Storage>(($argument0: RuntimeSlice<CommentRange__from_ast$Storage>): RuntimeSlice<CommentRange__from_ast$Storage> => {
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
export function AppendSeq$SliceOf_Named_core$TextPos$Named_core$TextPos($argument0: RuntimeSlice<TextPos__from_core>, $argument1: iter.Seq<TextPos__from_core>): RuntimeSlice<TextPos__from_core> {
    return generic_slices_kernel.SlicesAppendSeqKernel<RuntimeSlice<TextPos__from_core>, TextPos__from_core, TextPos__from_core>(($argument0: RuntimeSlice<TextPos__from_core>): RuntimeSlice<TextPos__from_core> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<TextPos__from_core>): RuntimeSlice<TextPos__from_core> => {
        return $argument0;
    }, ($argument0: TextPos__from_core): TextPos__from_core => {
        return $argument0;
    }, ($argument0: TextPos__from_core): TextPos__from_core => {
        return $argument0;
    }, ($argument0: TextPos__from_core): TextPos__from_core => {
        return $argument0;
    }, (): TextPos__from_core => {
        return 0;
    }, $argument0, $argument1);
}
export function AppendSeq$SliceOf_string$string($argument0: RuntimeSlice<gostring>, $argument1: iter.Seq<gostring>): RuntimeSlice<gostring> {
    return generic_slices_kernel.SlicesAppendSeqKernel<RuntimeSlice<gostring>, gostring, gostring>(($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>): RuntimeSlice<gostring> => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: gostring): gostring => {
        return $argument0;
    }, (): gostring => {
        return "";
    }, $argument0, $argument1);
}
