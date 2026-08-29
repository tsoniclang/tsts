import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentRange$Storage as CommentRange__from_ast$Storage, Kind as Kind__from_ast, NodeFactory as NodeFactory__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LanguageVariant as LanguageVariant__from_core, ScriptKind as ScriptKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { bool, gostring } from "@gotots/runtime/scalars.js";
import { CommentRange as CommentRange__from_ast, IsKeywordKind as IsKeywordKind__from_ast, IsPunctuationKind as IsPunctuationKind__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { LanguageVariantJSX$constant as LanguageVariantJSX$constant__from_core, LanguageVariantStandard$constant as LanguageVariantStandard$constant__from_core, ScriptKindJS$constant as ScriptKindJS$constant__from_core, ScriptKindJSON$constant as ScriptKindJSON$constant__from_core, ScriptKindJSX$constant as ScriptKindJSX$constant__from_core, ScriptKindTSX$constant as ScriptKindTSX$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetLeadingCommentRanges as GetLeadingCommentRanges__from_scanner, GetTrailingCommentRanges as GetTrailingCommentRanges__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { DeleteFunc$SliceOf_Named_ast$CommentRange$Named_ast$CommentRange } from "../../../../../../support/generics/concretizations/slices/DeleteFunc.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAllocate } from "@gotots/runtime/slice.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export function getLanguageVariant(scriptKind: ScriptKind__from_core): LanguageVariant__from_core {
    switch (scriptKind) {
        case ScriptKindTSX$constant__from_core():
        case ScriptKindJSX$constant__from_core():
        case ScriptKindJS$constant__from_core():
        case ScriptKindJSON$constant__from_core(): {
            return LanguageVariantJSX$constant__from_core();
            break;
        }
    }
    return LanguageVariantStandard$constant__from_core();
}
export function tokenIsIdentifierOrKeyword(token: Kind__from_ast): bool {
    return token >= KindIdentifier$constant__from_ast();
}
export function tokenIsIdentifierOrKeywordOrGreaterThan(token: Kind__from_ast): bool {
    return token === KindGreaterThanToken$constant__from_ast() || tokenIsIdentifierOrKeyword(token);
}
export function GetJSDocCommentRanges(f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, commentRanges: RuntimeSlice<CommentRange__from_ast$Storage>, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, text: gostring): RuntimeSlice<CommentRange__from_ast$Storage> {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParameter$constant__from_ast():
        case KindTypeParameter$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindArrowFunction$constant__from_ast():
        case KindParenthesizedExpression$constant__from_ast():
        case KindVariableDeclaration$constant__from_ast():
        case KindExportSpecifier$constant__from_ast(): {
            const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(GetTrailingCommentRanges__from_scanner(f, text, Node__from_ast.Pos(node)));
            if (__gotots_range_0 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_0 = 1;
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
                const __gotots_slice_build_0 = commentRanges;
                const __gotots_slice_build_2 = __gotots_slice_build_0.length + 1;
                let __gotots_slice_build_1 = __gotots_slice_build_0;
                if (__gotots_slice_build_2 <= __gotots_slice_build_0.capacity) {
                    __gotots_slice_build_1 = __gotots_slice_build_0.$withLength(__gotots_slice_build_2);
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(commentRange)));
                }
                else {
                    __gotots_slice_build_1 = goSliceAllocate<CommentRange__from_ast$Storage>(__gotots_slice_build_2, RuntimeSlice.$grownCapacity(__gotots_slice_build_0.capacity, __gotots_slice_build_2));
                    for (let __gotots_slice_build_3 = 0; __gotots_slice_build_3 < __gotots_slice_build_0.length; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.set(__gotots_slice_build_3, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_slice_build_0.get(__gotots_slice_build_3)))));
                    }
                    __gotots_slice_build_1.set(__gotots_slice_build_0.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(commentRange)));
                    for (let __gotots_slice_build_3 = __gotots_slice_build_2; __gotots_slice_build_3 < __gotots_slice_build_1.capacity; __gotots_slice_build_3++) {
                        __gotots_slice_build_1.$initialize(__gotots_slice_build_3, CommentRange__from_ast.$zeroStorage());
                    }
                }
                commentRanges = __gotots_slice_build_1;
                __gotots_range_state_0 = 1;
                return true;
            });
            if (__gotots_range_state_0 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_0 = -2;
            const __gotots_range_1 = named_iter.IterSeqValueOperations.$project(GetLeadingCommentRanges__from_scanner(f, text, Node__from_ast.Pos(node)));
            if (__gotots_range_1 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_1 = 1;
            __gotots_range_1(($argument0: CommentRange__from_ast): bool => {
                if (__gotots_range_state_1 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_1 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_1 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_1 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_1 = -1;
                const __gotots_range_value_1 = CommentRange__from_ast.$copy($argument0);
                let commentRange = __gotots_range_value_1;
                const __gotots_slice_build_4 = commentRanges;
                const __gotots_slice_build_6 = __gotots_slice_build_4.length + 1;
                let __gotots_slice_build_5 = __gotots_slice_build_4;
                if (__gotots_slice_build_6 <= __gotots_slice_build_4.capacity) {
                    __gotots_slice_build_5 = __gotots_slice_build_4.$withLength(__gotots_slice_build_6);
                    __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(commentRange)));
                }
                else {
                    __gotots_slice_build_5 = goSliceAllocate<CommentRange__from_ast$Storage>(__gotots_slice_build_6, RuntimeSlice.$grownCapacity(__gotots_slice_build_4.capacity, __gotots_slice_build_6));
                    for (let __gotots_slice_build_7 = 0; __gotots_slice_build_7 < __gotots_slice_build_4.length; __gotots_slice_build_7++) {
                        __gotots_slice_build_5.set(__gotots_slice_build_7, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_slice_build_4.get(__gotots_slice_build_7)))));
                    }
                    __gotots_slice_build_5.set(__gotots_slice_build_4.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(commentRange)));
                    for (let __gotots_slice_build_7 = __gotots_slice_build_6; __gotots_slice_build_7 < __gotots_slice_build_5.capacity; __gotots_slice_build_7++) {
                        __gotots_slice_build_5.$initialize(__gotots_slice_build_7, CommentRange__from_ast.$zeroStorage());
                    }
                }
                commentRanges = __gotots_slice_build_5;
                __gotots_range_state_1 = 1;
                return true;
            });
            if (__gotots_range_state_1 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_1 = -2;
            break;
        }
        default: {
            const __gotots_range_2 = named_iter.IterSeqValueOperations.$project(GetLeadingCommentRanges__from_scanner(f, text, Node__from_ast.Pos(node)));
            if (__gotots_range_2 === void 0) {
                GoPanic.raiseRuntime("call of nil function");
            }
            let __gotots_range_state_2 = 1;
            __gotots_range_2(($argument0: CommentRange__from_ast): bool => {
                if (__gotots_range_state_2 === 0) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                if (__gotots_range_state_2 === -1) {
                    GoPanic.raiseRuntime("range function continued iteration after loop body panic");
                }
                if (__gotots_range_state_2 === -2) {
                    GoPanic.raiseRuntime("range function continued iteration after whole loop exit");
                }
                if (__gotots_range_state_2 === 2) {
                    GoPanic.raiseRuntime("range function continued iteration after function for loop body returned false");
                }
                __gotots_range_state_2 = -1;
                const __gotots_range_value_2 = CommentRange__from_ast.$copy($argument0);
                let commentRange = __gotots_range_value_2;
                const __gotots_slice_build_8 = commentRanges;
                const __gotots_slice_build_10 = __gotots_slice_build_8.length + 1;
                let __gotots_slice_build_9 = __gotots_slice_build_8;
                if (__gotots_slice_build_10 <= __gotots_slice_build_8.capacity) {
                    __gotots_slice_build_9 = __gotots_slice_build_8.$withLength(__gotots_slice_build_10);
                    __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(commentRange)));
                }
                else {
                    __gotots_slice_build_9 = goSliceAllocate<CommentRange__from_ast$Storage>(__gotots_slice_build_10, RuntimeSlice.$grownCapacity(__gotots_slice_build_8.capacity, __gotots_slice_build_10));
                    for (let __gotots_slice_build_11 = 0; __gotots_slice_build_11 < __gotots_slice_build_8.length; __gotots_slice_build_11++) {
                        __gotots_slice_build_9.set(__gotots_slice_build_11, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_slice_build_8.get(__gotots_slice_build_11)))));
                    }
                    __gotots_slice_build_9.set(__gotots_slice_build_8.length + 0, CommentRange__from_ast.$storageOf(CommentRange__from_ast.$copy(commentRange)));
                    for (let __gotots_slice_build_11 = __gotots_slice_build_10; __gotots_slice_build_11 < __gotots_slice_build_9.capacity; __gotots_slice_build_11++) {
                        __gotots_slice_build_9.$initialize(__gotots_slice_build_11, CommentRange__from_ast.$zeroStorage());
                    }
                }
                commentRanges = __gotots_slice_build_9;
                __gotots_range_state_2 = 1;
                return true;
            });
            if (__gotots_range_state_2 === -1) {
                GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
            }
            __gotots_range_state_2 = -2;
            break;
        }
    }
    return DeleteFunc$SliceOf_Named_ast$CommentRange$Named_ast$CommentRange(commentRanges, (comment: CommentRange__from_ast): bool => {
        let commentStart = TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Pos();
        let commentLen = TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).End() - commentStart;
        return TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).End() > Node__from_ast.End(node) || commentLen < 4 || goStringIndex(text, commentStart + 1) !== 42 || goStringIndex(text, commentStart + 2) !== 42 || goStringIndex(text, commentStart + 3) === 47;
    });
}
export function isKeywordOrPunctuation(token: Kind__from_ast): bool {
    return IsKeywordKind__from_ast(token) || IsPunctuationKind__from_ast(token);
}
export function isJSDocLikeText(text: gostring): bool {
    return text.length >= 4 && goStringIndex(text, 1) === 42 && goStringIndex(text, 2) === 42 && goStringIndex(text, 3) !== 47;
}
