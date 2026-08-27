import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentRange$Storage as CommentRange__from_ast$Storage, Node as Node__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import type { Symbol as Symbol__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/symbol.js";
import type { Type as Type__from_checker } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/checker/types.js";
import type { TextRangeWithKind$Storage as TextRangeWithKind__from_format$Storage } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/format/scanner.js";
import type { gostring, int } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { CommentRange as CommentRange__from_ast } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/ast/ast.js";
import { LastOrNil$kernel } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/core/core.js";
import { TextRangeWithKind as TextRangeWithKind__from_format } from "../../../../../../../../modules/github.com/microsoft/typescript-go/internal/format/scanner.js";
export function LastOrNil$Named_ast$CommentRange($argument0: RuntimeSlice<CommentRange__from_ast$Storage>): CommentRange__from_ast {
    return LastOrNil$kernel<CommentRange__from_ast>(($argument0: CommentRange__from_ast): CommentRange__from_ast => {
        return CommentRange__from_ast.$copy($argument0);
    }, ($argument0: RuntimeSlice<CommentRange__from_ast$Storage>, $argument1: int): CommentRange__from_ast => {
        return CommentRange__from_ast.$fromStorage($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<CommentRange__from_ast$Storage>): int => {
        return $argument0.length;
    }, (): CommentRange__from_ast => {
        return CommentRange__from_ast.$zero();
    }, $argument0);
}
export function LastOrNil$Named_format$TextRangeWithKind($argument0: RuntimeSlice<TextRangeWithKind__from_format$Storage>): TextRangeWithKind__from_format {
    return LastOrNil$kernel<TextRangeWithKind__from_format>(($argument0: TextRangeWithKind__from_format): TextRangeWithKind__from_format => {
        return TextRangeWithKind__from_format.$copy($argument0);
    }, ($argument0: RuntimeSlice<TextRangeWithKind__from_format$Storage>, $argument1: int): TextRangeWithKind__from_format => {
        return TextRangeWithKind__from_format.$fromStorage($argument0.get($argument1));
    }, ($argument0: RuntimeSlice<TextRangeWithKind__from_format$Storage>): int => {
        return $argument0.length;
    }, (): TextRangeWithKind__from_format => {
        return TextRangeWithKind__from_format.$zero();
    }, $argument0);
}
export function LastOrNil$PointerTo_Named_ast$Node($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return LastOrNil$kernel<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int => {
        return $argument0.length;
    }, (): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
export function LastOrNil$PointerTo_Named_ast$Symbol($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined {
    return LastOrNil$kernel<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined>): int => {
        return $argument0.length;
    }, (): tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined => {
        return void 0;
    }, $argument0);
}
export function LastOrNil$PointerTo_Named_checker$Type($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined {
    return LastOrNil$kernel<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>(($argument0: tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0;
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>, $argument1: int): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined>): int => {
        return $argument0.length;
    }, (): tsonicTypeScriptRuntime.Location<Type__from_checker> | undefined => {
        return void 0;
    }, $argument0);
}
export function LastOrNil$string($argument0: RuntimeSlice<gostring>): gostring {
    return LastOrNil$kernel<gostring>(($argument0: gostring): gostring => {
        return $argument0;
    }, ($argument0: RuntimeSlice<gostring>, $argument1: int): gostring => {
        return $argument0.get($argument1);
    }, ($argument0: RuntimeSlice<gostring>): int => {
        return $argument0.length;
    }, (): gostring => {
        return "";
    }, $argument0);
}
