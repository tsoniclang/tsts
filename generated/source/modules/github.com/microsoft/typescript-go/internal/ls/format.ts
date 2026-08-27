import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type * as iter__from_gostdlib from "@gotots/gostdlib/iter.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { CommentRange as CommentRange__from_ast, FindAncestor as FindAncestor__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, NodeFactory as NodeFactory__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetTrailingCommentRanges as GetTrailingCommentRanges__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { ConcatenateSeq$Named_ast$CommentRange } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/ConcatenateSeq.js";
import { getLeadingCommentRangesOfNode } from "./utilities.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function getRangeOfEnclosingComment(file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position__shadow_1: int, precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, tokenAtPosition: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined {
    let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(tokenAtPosition, ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.IsJSDoc($argument0);
    });
    if (!(jsdoc === undefined)) {
        tokenAtPosition = Node__from_ast.$storageOf(((jsdoc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    let tokenStart = GetStartOfNode__from_astnav(tokenAtPosition, file, false);
    if (tokenStart <= position__shadow_1 && position__shadow_1 < Node__from_ast.End(tokenAtPosition)) {
        return void 0;
    }
    let trailingRangesOfPreviousToken: iter__from_gostdlib.Seq<CommentRange__from_ast> = named_iter.IterSeqValueOperations.$wrap(void 0);
    if (!(precedingToken === undefined)) {
        const __gotots_struct_0 = NodeFactory__from_ast.$zero();
        const __gotots_argument_0 = tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_0);
        const __gotots_argument_1 = SourceFile__from_ast.Text(file);
        const __gotots_argument_2 = Node__from_ast.End(precedingToken);
        trailingRangesOfPreviousToken = GetTrailingCommentRanges__from_scanner(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
    }
    let leadingRangesOfNextToken: iter__from_gostdlib.Seq<CommentRange__from_ast> = getLeadingCommentRangesOfNode(tokenAtPosition, file);
    let commentRanges: iter__from_gostdlib.Seq<CommentRange__from_ast> = ConcatenateSeq$Named_ast$CommentRange(RuntimeSlice.literal<iter__from_gostdlib.Seq<CommentRange__from_ast>>([trailingRangesOfPreviousToken, leadingRangesOfNextToken]));
    const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(commentRanges);
    if (__gotots_range_0 === void 0) {
        GoPanic.raiseRuntime("call of nil function");
    }
    let __gotots_range_state_0 = 1;
    let __gotots_range_return_0: tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined = void 0;
    __gotots_range_0(($argument0: CommentRange__from_ast): bool => {
        if (__gotots_range_state_0 === 0) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        if (__gotots_range_state_0 === -1) {
            GoPanic.raiseRuntime("range function continued iteration after loop body panic");
        }
        if (__gotots_range_state_0 === -2) {
            GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
        }
        if (__gotots_range_state_0 === 2) {
            GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
        }
        __gotots_range_state_0 = -1;
        const __gotots_range_value_0 = CommentRange__from_ast.$copy($argument0);
        let commentRange = __gotots_range_value_0;
        const commentRange$location = tsonicTypeScriptRuntime.boundLocation({}, () => commentRange, commentRange$next => commentRange = commentRange$next);
        if (TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).ContainsExclusive(position__shadow_1) || position__shadow_1 === TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(commentRange).TextRange).End() && (CommentRange__from_ast.$storageOf(commentRange).Kind === KindSingleLineCommentTrivia$constant__from_ast() || position__shadow_1 === SourceFile__from_ast.Text(file).length)) {
            __gotots_range_return_0 =
                commentRange$location;
            __gotots_range_state_0 = 2;
            return false;
        }
        __gotots_range_state_0 = 1;
        return true;
    });
    if (__gotots_range_state_0 === -1) {
        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
    }
    if (__gotots_range_state_0 === 2) {
        return __gotots_range_return_0;
    }
    __gotots_range_state_0 = -2;
    return void 0;
}
