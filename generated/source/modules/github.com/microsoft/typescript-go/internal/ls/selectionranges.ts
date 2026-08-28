import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, TemplateSpan as TemplateSpan__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { LanguageService } from "./languageservice.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { CommentRange as CommentRange__from_ast, IsBlock as IsBlock__from_ast, IsFunctionLikeDeclaration as IsFunctionLikeDeclaration__from_ast, IsJSDocSignature as IsJSDocSignature__from_ast, IsJSDocTypeExpression as IsJSDocTypeExpression__from_ast, IsJSDocTypeLiteral as IsJSDocTypeLiteral__from_ast, IsStringLiteral as IsStringLiteral__from_ast, IsTemplateExpression as IsTemplateExpression__from_ast, IsTemplateHead as IsTemplateHead__from_ast, IsTemplateSpan as IsTemplateSpan__from_ast, IsTemplateTail as IsTemplateTail__from_ast, IsVariableDeclarationList as IsVariableDeclarationList__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, IsVariableStatement as IsVariableStatement__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindSingleLineCommentTrivia$constant as KindSingleLineCommentTrivia$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, NewNodeVisitor as NewNodeVisitor__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { NewTextRange as NewTextRange__from_core, TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { Position as Position__from_lsproto, Range as Range__from_lsproto, SelectionRange as SelectionRange__from_lsproto } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, GetTrailingCommentRanges as GetTrailingCommentRanges__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as named_iter from "@gotots/gostdlib/internal/facets/named-iter.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { goStringIndex } from "@gotots/runtime/string.js";
export function getSmartSelectionRange(l: LanguageService | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, pos: int): {
    value: SelectionRange__from_lsproto;
} | undefined {
    const __gotots_struct_0 = NodeFactory__from_ast.$zero();
    let factory: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined = tsonicTypeScriptRuntime.location<NodeFactory__from_ast>(__gotots_struct_0);
    let nodeContainsPosition: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (node === undefined) {
            return false;
        }
        let start = GetTokenPosOfNode__from_scanner(node, sourceFile, true);
        let end = Node__from_ast.End(node);
        return start <= pos && pos < end;
    };
    let pushSelectionRange: (($0: {
        value: SelectionRange__from_lsproto;
    } | undefined, $1: int, $2: int) => {
        value: SelectionRange__from_lsproto;
    } | undefined) | undefined = (current__shadow_1: {
        value: SelectionRange__from_lsproto;
    } | undefined, start: int, end: int): {
        value: SelectionRange__from_lsproto;
    } | undefined => {
        if (start === end) {
            return current__shadow_1;
        }
        if (!(start <= pos && pos <= end)) {
            return current__shadow_1;
        }
        let lspRange = Converters__from_lsconv.ToLSPRange((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), NewTextRange__from_core(start, end));
        if (!(current__shadow_1 === undefined) && Range__from_lsproto.$equal((current__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Range, lspRange)) {
            return current__shadow_1;
        }
        return { value: new SelectionRange__from_lsproto(Range__from_lsproto.$copy(lspRange), current__shadow_1) };
    };
    let pushSelectionCommentRange: (($0: {
        value: SelectionRange__from_lsproto;
    } | undefined, $1: int, $2: int) => {
        value: SelectionRange__from_lsproto;
    } | undefined) | undefined = (current__shadow_1: {
        value: SelectionRange__from_lsproto;
    } | undefined, start: int, end: int): {
        value: SelectionRange__from_lsproto;
    } | undefined => {
        const __gotots_callee_0 = pushSelectionRange;
        const __gotots_argument_0 = current__shadow_1;
        const __gotots_argument_1 = start;
        const __gotots_argument_2 = end;
        current__shadow_1 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
        let commentPos = start;
        let text = SourceFile__from_ast.Text(sourceFile);
        for (; commentPos < end && commentPos < text.length && goStringIndex(text, commentPos) === 47;) {
            commentPos++;
        }
        const __gotots_callee_1 = pushSelectionRange;
        const __gotots_argument_3 = current__shadow_1;
        const __gotots_argument_4 = commentPos;
        const __gotots_argument_5 = end;
        current__shadow_1 = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
        return current__shadow_1;
    };
    let positionsAreOnSameLine: (($0: int, $1: int) => bool) | undefined = (pos1: int, pos2: int): bool => {
        if (pos1 === pos2) {
            return true;
        }
        let lspPos1 = Converters__from_lsconv.PositionToLineAndCharacter((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), pos1 | 0);
        let lspPos2 = Converters__from_lsconv.PositionToLineAndCharacter((l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new GoInterfaceAdapter(sourceFile), pos2 | 0);
        return Position__from_lsproto.$storageOf(lspPos1).Line === Position__from_lsproto.$storageOf(lspPos2).Line;
    };
    let shouldSkipNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (IsBlock__from_ast(node)) {
            return true;
        }
        if (IsTemplateSpan__from_ast(node) || IsTemplateHead__from_ast(node) || IsTemplateTail__from_ast(node)) {
            return true;
        }
        if (!(parent === undefined) && IsVariableDeclarationList__from_ast(node) && IsVariableStatement__from_ast(parent)) {
            return true;
        }
        if (!(parent === undefined) && IsVariableDeclaration__from_ast(node) && IsVariableDeclarationList__from_ast(parent)) {
            let decl: tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast> | undefined = Node__from_ast.AsVariableDeclarationList(parent);
            if (!(decl === undefined) && NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((decl ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1) {
                return true;
            }
        }
        if (IsJSDocTypeExpression__from_ast(node) || IsJSDocSignature__from_ast(node) || IsJSDocTypeLiteral__from_ast(node)) {
            return true;
        }
        return false;
    };
    const __gotots_receiver_0 = (l ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters;
    const __gotots_argument_8 = new GoInterfaceAdapter(sourceFile);
    const __gotots_store_0 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
        NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
    const __gotots_argument_6 = Node__from_ast.Pos(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
    const __gotots_store_1 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
        NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase).NodeDefault));
    const __gotots_argument_7 = Node__from_ast.End(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
    const __gotots_argument_9 = NewTextRange__from_core(__gotots_argument_6, __gotots_argument_7);
    let fullRange = Converters__from_lsconv.ToLSPRange(__gotots_receiver_0, __gotots_argument_8, __gotots_argument_9);
    let result: {
        value: SelectionRange__from_lsproto;
    } | undefined = { value: new SelectionRange__from_lsproto(Range__from_lsproto.$copy(fullRange), void 0) };
    let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    {
        const __gotots_store_2 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        current = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        for (; !(current === undefined);) {
            let next: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
            let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = current;
            let visit: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
                if (!(node === undefined) && next === undefined) {
                    let foundComment: tsonicTypeScriptRuntime.Location<CommentRange__from_ast> | undefined = void 0;
                    const __gotots_range_0 = named_iter.IterSeqValueOperations.$project(GetTrailingCommentRanges__from_scanner(factory, SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(node)));
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
                        let comment = __gotots_range_value_0;
                        const comment$location = tsonicTypeScriptRuntime.boundLocation({}, () => comment, comment$next => comment = comment$next);
                        foundComment =
                            comment$location;
                        __gotots_range_state_0 = 0;
                        return false;
                        __gotots_range_state_0 = 1;
                        return true;
                    });
                    if (__gotots_range_state_0 === -1) {
                        GoPanic.raiseRuntime("range function recovered a loop body panic and did not resume panicking");
                    }
                    __gotots_range_state_0 = -2;
                    if (!(foundComment === undefined) && CommentRange__from_ast.$storageOf(((foundComment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).Kind === KindSingleLineCommentTrivia$constant__from_ast()) {
                        const __gotots_callee_2 = pushSelectionCommentRange;
                        const __gotots_argument_10 = result;
                        const __gotots_argument_11 = TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(((foundComment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).TextRange).Pos();
                        const __gotots_argument_12 = TextRange__from_core.$fromStorage(CommentRange__from_ast.$storageOf(((foundComment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CommentRange__from_ast>).value).TextRange).End();
                        result = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
                    }
                    const __gotots_callee_3 = nodeContainsPosition;
                    const __gotots_argument_13 = node;
                    if ((__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_13)) {
                        if (IsBlock__from_ast(node) && IsFunctionLikeDeclaration__from_ast(parent)) {
                            const __gotots_callee_4 = positionsAreOnSameLine;
                            const __gotots_argument_14 = GetStartOfNode__from_astnav(node, sourceFile, false);
                            const __gotots_argument_15 = Node__from_ast.End(node);
                            if (!(__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14, __gotots_argument_15)) {
                                let start = GetStartOfNode__from_astnav(node, sourceFile, false);
                                let end = Node__from_ast.End(node);
                                const __gotots_callee_5 = pushSelectionRange;
                                const __gotots_argument_16 = result;
                                const __gotots_argument_17 = start;
                                const __gotots_argument_18 = end;
                                result = (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17, __gotots_argument_18);
                            }
                        }
                        if (IsTemplateSpan__from_ast(parent)) {
                            let templateSpan: {
                                value: TemplateSpan__from_ast;
                            } | undefined = Node__from_ast.AsTemplateSpan(parent);
                            if (!((templateSpan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal === undefined)) {
                                let spanStart = Node__from_ast.Pos(node) - 2;
                                let spanEnd = GetStartOfNode__from_astnav((templateSpan ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Literal, sourceFile, false) + 1;
                                let text = SourceFile__from_ast.Text(sourceFile);
                                if (spanStart >= 0 && spanEnd <= text.length && spanStart < spanEnd) {
                                    const __gotots_callee_6 = pushSelectionRange;
                                    const __gotots_argument_19 = result;
                                    const __gotots_argument_20 = spanStart;
                                    const __gotots_argument_21 = spanEnd;
                                    result = (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19, __gotots_argument_20, __gotots_argument_21);
                                }
                            }
                        }
                        const __gotots_callee_7 = shouldSkipNode;
                        const __gotots_argument_22 = node;
                        const __gotots_argument_23 = parent;
                        if (!(__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_22, __gotots_argument_23)) {
                            let start = GetStartOfNode__from_astnav(node, sourceFile, false);
                            let end = Node__from_ast.End(node);
                            const __gotots_callee_8 = pushSelectionRange;
                            const __gotots_argument_24 = result;
                            const __gotots_argument_25 = start;
                            const __gotots_argument_26 = end;
                            result = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
                            if (IsStringLiteral__from_ast(node) || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTemplateExpression$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNoSubstitutionTemplateLiteral$constant__from_ast()) {
                                if (start + 1 < end - 1) {
                                    const __gotots_callee_9 = pushSelectionRange;
                                    const __gotots_argument_27 = result;
                                    const __gotots_argument_28 = start + 1;
                                    const __gotots_argument_29 = end - 1;
                                    result = (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27, __gotots_argument_28, __gotots_argument_29);
                                }
                            }
                        }
                        next = node;
                    }
                }
                return node;
            };
            let visitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
                value: NodeVisitor__from_ast;
            } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined = (nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, v: {
                value: NodeVisitor__from_ast;
            } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
                if (!(nodes === undefined) && NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                    let shouldSkipList = !(parent === undefined) && (IsVariableDeclarationList__from_ast(parent) || IsTemplateExpression__from_ast(parent));
                    if (!shouldSkipList) {
                        let start = GetStartOfNode__from_astnav(NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0), sourceFile, false);
                        let end = Node__from_ast.End(NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1));
                        if (start <= pos && pos < end) {
                            const __gotots_callee_10 = pushSelectionRange;
                            const __gotots_argument_30 = result;
                            const __gotots_argument_31 = start;
                            const __gotots_argument_32 = end;
                            result = (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_30, __gotots_argument_31, __gotots_argument_32);
                        }
                    }
                }
                return NodeVisitor__from_ast.VisitNodes(v, nodes);
            };
            const __gotots_range_1 = Node__from_ast.JSDoc(current, sourceFile);
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_1.length; __gotots_range_index_0++) {
                const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_0);
                let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
                const __gotots_callee_11 = visit;
                const __gotots_argument_33 = jsdoc;
                (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_33);
            }
            let tempVisitor: {
                value: NodeVisitor__from_ast;
            } | undefined = NewNodeVisitor__from_ast(visit, void 0, new NodeVisitorHooks__from_ast(void 0, void 0, visitNodes, void 0, void 0, void 0, void 0, void 0, void 0));
            Node__from_ast.VisitEachChild(current, tempVisitor);
            current = next;
        }
    }
    return result;
}
