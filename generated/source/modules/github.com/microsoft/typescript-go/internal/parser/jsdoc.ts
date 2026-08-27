import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CommentRange$Storage as CommentRange__from_ast$Storage, NodeFactory as NodeFactory__from_ast, QualifiedName as QualifiedName__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool, gostring, int32 } from "@gotots/runtime/scalars.js";
import { ArrayTypeNode as ArrayTypeNode__from_ast, CommentRange as CommentRange__from_ast, IsIdentifier as IsIdentifier__from_ast, IsTypeReferenceNode as IsTypeReferenceNode__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindObjectKeyword$constant as KindObjectKeyword$constant__from_ast, NodeWithTypeArgumentsBase as NodeWithTypeArgumentsBase__from_ast, Node as Node__from_ast, SetParseJSDocForNode as SetParseJSDocForNode__from_ast, SourceFile as SourceFile__from_ast, TypeReferenceNode as TypeReferenceNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { IsWhiteSpaceLike as IsWhiteSpaceLike__from_stringutil } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/stringutil/package.js";
import { Parser, getParser, putParser } from "./parser.js";
import { GetJSDocCommentRanges } from "./utilities.js";
import * as strings__from_gostdlib from "@gotots/gostdlib/strings.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function init(): void {
    SetParseJSDocForNode__from_ast(parseJSDocForNode);
}
export function parseJSDocForNode(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
    let __gotots_panic_0: GoPanic | undefined = undefined;
    let __gotots_return_0: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    try {
        try {
            __gotots_return_block_0: {
                let p: {
                    value: Parser;
                } | undefined = getParser();
                const __gotots_argument_0 = p;
                __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                    putParser(__gotots_argument_0);
                };
                Parser.$go$private$parser$initializeState(p, SourceFile__from_ast.ParseOptions(sourceFile), SourceFile__from_ast.Text(sourceFile), ((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind);
                const __gotots_store_0 = (p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "factory");
                const __gotots_argument_2 = RuntimeSlice.nil<CommentRange__from_ast$Storage>();
                const __gotots_argument_3 = node;
                const __gotots_argument_4 = SourceFile__from_ast.Text(sourceFile);
                let ranges = GetJSDocCommentRanges(__gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
                if (ranges.length === 0) {
                    __gotots_return_0 = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
                    break __gotots_return_block_0;
                }
                let jsdoc = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, ranges.length, void 0);
                let pos = Node__from_ast.Pos(node);
                const __gotots_range_0 = ranges;
                for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                    const __gotots_range_value_0 = CommentRange__from_ast.$copy(CommentRange__from_ast.$fromStorage(__gotots_range_0.get(__gotots_range_index_0)));
                    let comment = __gotots_range_value_0;
                    {
                        let parsed: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Parser.$go$private$parser$parseJSDocComment(p, node, TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).Pos(), TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(comment).TextRange).End(), pos);
                        if (!(parsed === undefined)) {
                            Node__from_ast.$storageOf(((parsed ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent = node;
                            jsdoc = jsdoc.append(void 0, [parsed]);
                            pos = Node__from_ast.End(parsed);
                        }
                    }
                }
                __gotots_return_0 = jsdoc;
                break __gotots_return_block_0;
            }
        }
        catch (__gotots_caught_1) {
            if (!(__gotots_caught_1 instanceof GoPanic)) {
                throw __gotots_caught_1;
            }
            __gotots_panic_0 = __gotots_caught_1;
        }
    }
    finally {
        if (__gotots_deferred_0 !== undefined) {
            const __gotots_recovery_0 = new GoRecovery(__gotots_panic_0);
            try {
                __gotots_deferred_0(__gotots_recovery_0);
                if (__gotots_recovery_0.recovered()) {
                    __gotots_panic_0 = undefined;
                }
            }
            catch (__gotots_caught_0) {
                if (!(__gotots_caught_0 instanceof GoPanic)) {
                    throw __gotots_caught_0;
                }
                __gotots_panic_0 = __gotots_caught_0;
            }
        }
    }
    if (__gotots_panic_0 !== undefined) {
        throw __gotots_panic_0;
    }
    return __gotots_return_0;
}
export type jsdocState = int32;
export function jsdocStateBeginningOfLine$constant(): jsdocState {
    return 0;
}
export function jsdocStateSawAsterisk$constant(): jsdocState {
    return 1;
}
export function jsdocStateSavingComments$constant(): jsdocState {
    return 2;
}
export function jsdocStateSavingBackticks$constant(): jsdocState {
    return 3;
}
export type propertyLikeParse = int32;
export function propertyLikeParseProperty$constant(): propertyLikeParse {
    return 1;
}
export function propertyLikeParseParameter$constant(): propertyLikeParse {
    return 2;
}
export function propertyLikeParseCallbackParameter$constant(): propertyLikeParse {
    return 4;
}
export function removeLeadingNewlines(comments: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
    let i = 0;
    for (; i < comments.length && strings__from_gostdlib.TrimLeft(comments.get(i), "\r\n") === "";) {
        i++;
    }
    return comments.slice(i, null, null);
}
export function trimEnd(s: gostring): gostring {
    return strings__from_gostdlib.TrimRightFunc(s, IsWhiteSpaceLike__from_stringutil);
}
export function removeTrailingWhitespace(comments: RuntimeSlice<gostring>): RuntimeSlice<gostring> {
    let end = comments.length;
    for (let i = comments.length - 1; i >= 0; i--) {
        let trimmed = trimEnd(comments.get(i));
        if (trimmed === "") {
            end = i;
        }
        else {
            comments.set(i, trimmed);
            break;
        }
    }
    return comments.slice(0, end, null);
}
export function isJSDocLinkTag(kind: gostring): bool {
    return kind === "link" || kind === "linkcode" || kind === "linkplain";
}
export function isObjectOrObjectArrayTypeReference(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindObjectKeyword$constant__from_ast(): {
            return true;
            break;
        }
        case KindArrayType$constant__from_ast(): {
            return isObjectOrObjectArrayTypeReference(ArrayTypeNode__from_ast.$storageOf(((Node__from_ast.AsArrayTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ArrayTypeNode__from_ast>).value).ElementType);
            break;
        }
        default: {
            if (IsTypeReferenceNode__from_ast(node)) {
                let ref: tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast> | undefined = Node__from_ast.AsTypeReferenceNode(node);
                return IsIdentifier__from_ast(TypeReferenceNode__from_ast.$storageOf(((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName) && Node__from_ast.Text(TypeReferenceNode__from_ast.$storageOf(((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).TypeName) === "Object" && NodeWithTypeArgumentsBase__from_ast.$storageOf(NodeWithTypeArgumentsBase__from_ast.$fromStorage(TypeReferenceNode__from_ast.$storageOf(((ref ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeReferenceNode__from_ast>).value).NodeWithTypeArgumentsBase)).TypeArguments === undefined;
            }
            return false;
            break;
        }
    }
}
export function textsEqual(a: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, b: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; !IsIdentifier__from_ast(a) || !IsIdentifier__from_ast(b);) {
        if (!IsIdentifier__from_ast(a) && !IsIdentifier__from_ast(b) && Node__from_ast.Text((Node__from_ast.AsQualifiedName(a) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right) === Node__from_ast.Text((Node__from_ast.AsQualifiedName(b) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Right)) {
            a = (Node__from_ast.AsQualifiedName(a) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left;
            b = (Node__from_ast.AsQualifiedName(b) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Left;
        }
        else {
            return false;
        }
    }
    return Node__from_ast.Text(a) === Node__from_ast.Text(b);
}
