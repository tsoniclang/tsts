import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type * as iter from "@gotots/gostdlib/iter.js";
import type { gostring } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { CommentRange as CommentRange__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import { ConcatenateSeq$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
export function ConcatenateSeq$Named_ast$CommentRange($argument0: RuntimeSlice<iter.Seq<CommentRange__from_ast>>): iter.Seq<CommentRange__from_ast> {
    return ConcatenateSeq$kernel<CommentRange__from_ast>(($argument0: CommentRange__from_ast): CommentRange__from_ast => {
        return CommentRange__from_ast.$copy($argument0);
    }, $argument0);
}
export function ConcatenateSeq$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>>): iter.Seq<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined> {
    return ConcatenateSeq$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, $argument0);
}
export function ConcatenateSeq$string($argument0: RuntimeSlice<iter.Seq<gostring>>): iter.Seq<gostring> {
    return ConcatenateSeq$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, $argument0);
}
