import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, NodeList$Storage as NodeList__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { ForEachChildAndJSDoc as ForEachChildAndJSDoc__from_ast, IsJSDocKind as IsJSDocKind__from_ast, IsJSDocLinkLike as IsJSDocLinkLike__from_ast, IsJSDocSingleCommentNodeComment as IsJSDocSingleCommentNodeComment__from_ast, IsJSDocSingleCommentNodeList as IsJSDocSingleCommentNodeList__from_ast, IsJSDocTag as IsJSDocTag__from_ast, IsJsxChild as IsJsxChild__from_ast, IsKeywordKind as IsKeywordKind__from_ast, IsNonWhitespaceToken as IsNonWhitespaceToken__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, IsPropertyNameLiteral as IsPropertyNameLiteral__from_ast, IsTokenKind as IsTokenKind__from_ast, IsWhitespaceOnlyJsxText as IsWhitespaceOnlyJsxText__from_ast, KindEndOfFile$constant as KindEndOfFile$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindJSDoc$constant as KindJSDoc$constant__from_ast, KindJSDocSignature$constant as KindJSDocSignature$constant__from_ast, KindJSDocText$constant as KindJSDocText$constant__from_ast, KindJSDocTypeLiteral$constant as KindJSDocTypeLiteral$constant__from_ast, KindLessThanLessThanToken$constant as KindLessThanLessThanToken$constant__from_ast, Kind_String as Kind_String__from_ast, ModifierList as ModifierList__from_ast, NewNodeVisitor as NewNodeVisitor__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitorHooks as NodeVisitorHooks__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, Visitor as Visitor__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GetScannerForSourceFile as GetScannerForSourceFile__from_scanner, GetTokenPosOfNode as GetTokenPosOfNode__from_scanner, Scanner as Scanner__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/BinarySearchUniqueFunc.js";
import { Filter$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Filter.js";
import { Identity$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Identity.js";
import { IfElse$int } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$Named_ast$Kind, $goInterfaceAdapter$int, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import * as fmt__from_gostdlib from "@gotots/gostdlib/fmt.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function shouldRescanLessThanLessThanToken(s: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined, containingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, token: Kind__from_ast): bool {
    return token === KindLessThanLessThanToken$constant__from_ast() && IsJsxChild__from_ast(containingNode);
}
export function scanNavigationToken(s: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined, containingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): Kind__from_ast {
    let token = Scanner__from_scanner.Token(s);
    if (shouldRescanLessThanLessThanToken(s, containingNode, token)) {
        return Scanner__from_scanner.ReScanJsxToken(s, true);
    }
    return token;
}
export function GetTouchingPropertyName(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return getTokenAtPosition(sourceFile, position, false, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return IsPropertyNameLiteral__from_ast(node) || IsKeywordKind__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) || IsPrivateIdentifier__from_ast(node);
    });
}
export function GetTouchingToken(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return getTokenAtPosition(sourceFile, position, false, void 0);
}
export function GetTokenAtPosition(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return getTokenAtPosition(sourceFile, position, true, void 0);
}
export function getTokenAtPosition(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int, allowPositionInLeadingTrivia: bool, includePrecedingTokenAtEndPosition: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let next: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0, prevSubtree: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    const __gotots_store_0 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
    let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    let left = 0;
    let nodeAfterLeft: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let testNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => int) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
        if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEndOfFile$constant__from_ast()) && Node__from_ast.End(node) === position && !(includePrecedingTokenAtEndPosition === undefined) && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
            prevSubtree = node;
        }
        if (Node__from_ast.End(node) < position || Node__from_ast.End(node) === position && !(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEndOfFile$constant__from_ast()) && (!IsJSDocKind__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) || Node__from_ast.End(node) !== Node__from_ast.End(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken))) {
            return -1;
        }
        let nodePos = getPosition(node, sourceFile, allowPositionInLeadingTrivia);
        if (nodePos > position) {
            return 1;
        }
        return 0;
    };
    let visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (node === undefined || !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
            return void 0;
        }
        if (nodeAfterLeft === undefined) {
            nodeAfterLeft = node;
        }
        if (next === undefined) {
            const __gotots_callee_0 = testNode;
            const __gotots_argument_0 = node;
            let result = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_0);
            switch (result) {
                case -1: {
                    if (!IsJSDocKind__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
                        left = Node__from_ast.End(node);
                    }
                    nodeAfterLeft = void 0;
                    break;
                }
                case 0: {
                    next = node;
                    break;
                }
            }
        }
        return node;
    };
    let visitNodeList: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined = (nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
        if (nodeList === undefined || NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return nodeList;
        }
        if (nodeAfterLeft === undefined) {
            const __gotots_range_0 = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
            for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
                const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
                let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
                if ((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
                    nodeAfterLeft = node;
                    break;
                }
            }
        }
        if (next === undefined) {
            if (NodeList__from_ast.End(nodeList) === position && !(includePrecedingTokenAtEndPosition === undefined)) {
                left = NodeList__from_ast.End(nodeList);
                nodeAfterLeft = void 0;
                for (let i = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1; i >= 0; i--) {
                    if ((Node__from_ast.$storageOf(((NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
                        prevSubtree = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i);
                        break;
                    }
                }
            }
            else if (NodeList__from_ast.End(nodeList) <= position) {
                left = NodeList__from_ast.End(nodeList);
                nodeAfterLeft = void 0;
            }
            else if (NodeList__from_ast.Pos(nodeList) <= position) {
                let nodes = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                const __gotots_results_0 = BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(nodes, (middle: int, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                    if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                        return 0;
                    }
                    const __gotots_callee_1 = testNode;
                    const __gotots_argument_1 = node;
                    let cmp = (__gotots_callee_1 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                    if (cmp < 0) {
                        left = Node__from_ast.End(node);
                        nodeAfterLeft = void 0;
                        for (let i = middle + 1; i < nodes.length; i++) {
                            if ((Node__from_ast.$storageOf(((nodes.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
                                nodeAfterLeft = nodes.get(i);
                                break;
                            }
                        }
                    }
                    return cmp;
                });
                let index = __gotots_results_0[0];
                let match = __gotots_results_0[1];
                if (match && !((Node__from_ast.$storageOf(((nodes.get(index) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                    nodes = Filter$PointerTo_Named_ast$Node(nodes, (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                        return (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0;
                    });
                    const __gotots_results_1 = BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(nodes, (middle: int, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                        const __gotots_callee_2 = testNode;
                        const __gotots_argument_2 = node;
                        let cmp = (__gotots_callee_2 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
                        if (cmp < 0) {
                            left = Node__from_ast.End(node);
                            if (middle + 1 < nodes.length) {
                                nodeAfterLeft = nodes.get(middle + 1);
                            }
                            else {
                                nodeAfterLeft = void 0;
                            }
                        }
                        return cmp;
                    });
                    index = __gotots_results_1[0];
                    match = __gotots_results_1[1];
                }
                if (match) {
                    next = nodes.get(index);
                }
            }
        }
        return nodeList;
    };
    for (;;) {
        VisitEachChildAndJSDoc(current, sourceFile, visitNode, visitNodeList);
        if (!(prevSubtree === undefined)) {
            let child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingTokenEx(sourceFile, position, prevSubtree, false);
            let __gotots_logical_result_0 = !(child === undefined) && Node__from_ast.End(child) === position;
            if (__gotots_logical_result_0) {
                const __gotots_callee_3 = includePrecedingTokenAtEndPosition;
                const __gotots_argument_3 = child;
                __gotots_logical_result_0 = (__gotots_callee_3 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_3);
            }
            if (__gotots_logical_result_0) {
                return child;
            }
            prevSubtree = void 0;
        }
        if (next === undefined) {
            if (IsTokenKind__from_ast(Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) || shouldSkipChild(current)) {
                return current;
            }
            let scanner__shadow_1: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(sourceFile, left);
            let end = Node__from_ast.End(current);
            if (!(nodeAfterLeft === undefined)) {
                end = Node__from_ast.Pos(nodeAfterLeft);
            }
            for (; left < end;) {
                let token = scanNavigationToken(scanner__shadow_1, current);
                let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
                let tokenStart = IfElse$int(allowPositionInLeadingTrivia, tokenFullStart, Scanner__from_scanner.TokenStart(scanner__shadow_1));
                let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
                let flags = Scanner__from_scanner.TokenFlags(scanner__shadow_1);
                if (tokenEnd > end) {
                    break;
                }
                if (tokenStart <= position && (position < tokenEnd)) {
                    if (token === KindIdentifier$constant__from_ast() || !IsTokenKind__from_ast(token)) {
                        if (IsJSDocKind__from_ast(Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
                            return current;
                        }
                        const __gotots_argument_4 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("did not expect %s to have %s in its trivia", RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter(Kind_String__from_ast(Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)), new GoInterfaceAdapter(Kind_String__from_ast(token))])));
                        GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
                    }
                    return SourceFile__from_ast.GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
                }
                if (!(includePrecedingTokenAtEndPosition === undefined) && tokenEnd === position) {
                    let prevToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SourceFile__from_ast.GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, current, flags);
                    const __gotots_callee_4 = includePrecedingTokenAtEndPosition;
                    const __gotots_argument_5 = prevToken;
                    if ((__gotots_callee_4 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_5)) {
                        return prevToken;
                    }
                }
                left = tokenEnd;
                Scanner__from_scanner.Scan(scanner__shadow_1);
            }
            return current;
        }
        current = next;
        left = Node__from_ast.Pos(current);
        nodeAfterLeft = void 0;
        next = void 0;
    }
}
export function getPosition(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, allowPositionInLeadingTrivia: bool): int {
    if (allowPositionInLeadingTrivia) {
        return Node__from_ast.Pos(node);
    }
    return GetTokenPosOfNode__from_scanner(node, sourceFile, true);
}
export function VisitEachChildAndJSDoc(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
    value: NodeVisitor__from_ast;
} | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, visitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
    value: NodeVisitor__from_ast;
} | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined): void {
    let visitor: {
        value: NodeVisitor__from_ast;
    } | undefined = getNodeVisitor(visitNode, visitNodes);
    const __gotots_range_1 = Node__from_ast.JSDoc(node, sourceFile);
    for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
        const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
        let jsdoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        if (!((visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNode === undefined)) {
            const __gotots_callee_5 = (visitor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Hooks.VisitNode;
            const __gotots_argument_6 = jsdoc;
            const __gotots_argument_7 = visitor;
            (__gotots_callee_5 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6, __gotots_argument_7);
        }
        else {
            NodeVisitor__from_ast.VisitNode(visitor, jsdoc);
        }
    }
    Node__from_ast.VisitEachChild(node, visitor);
}
export const comparisonLessThan$int: int = -1;
export const comparisonEqualTo$int: int = 0;
export const comparisonGreaterThan$int: int = 1;
export function FindPrecedingToken(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    return FindPrecedingTokenEx(sourceFile, position, void 0, false);
}
export function FindPrecedingTokenEx(sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, position: int, startNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, excludeJSDoc: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let find: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined;
    find = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (IsNonWhitespaceToken__from_ast(n) && !(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEndOfFile$constant__from_ast())) {
            return n;
        }
        let foundChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0, prevChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (node__shadow_1 === undefined || !((Node__from_ast.$storageOf(((node__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                return node__shadow_1;
            }
            if (!(foundChild === undefined)) {
                return node__shadow_1;
            }
            if (position < Node__from_ast.End(node__shadow_1) && (prevChild === undefined || Node__from_ast.End(prevChild) <= position)) {
                foundChild = node__shadow_1;
            }
            else {
                prevChild = node__shadow_1;
            }
            return node__shadow_1;
        };
        let visitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined = (nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            if (!(foundChild === undefined)) {
                return nodeList;
            }
            if (!(nodeList === undefined) && NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                let nodes = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                const __gotots_results_2 = BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(nodes, (middle: int, $1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                    if (!((Node__from_ast.$storageOf(((nodes.get(middle) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                        return comparisonLessThan$int;
                    }
                    if (position < Node__from_ast.End(nodes.get(middle))) {
                        if (middle === 0 || position >= Node__from_ast.End(nodes.get(middle - 1))) {
                            return comparisonEqualTo$int;
                        }
                        return comparisonGreaterThan$int;
                    }
                    return comparisonLessThan$int;
                });
                let index = __gotots_results_2[0];
                let match = __gotots_results_2[1];
                if (match) {
                    foundChild = nodes.get(index);
                }
                let validLookupIndex = IfElse$int(match, index - 1, nodes.length - 1);
                for (let i = validLookupIndex; i >= 0; i--) {
                    if (!((Node__from_ast.$storageOf(((nodes.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                        continue;
                    }
                    if (prevChild === undefined) {
                        prevChild = nodes.get(i);
                    }
                }
            }
            return nodeList;
        };
        VisitEachChildAndJSDoc(n, sourceFile, visitNode, visitNodes);
        if (!(foundChild === undefined)) {
            let start = GetStartOfNode(foundChild, sourceFile, !excludeJSDoc);
            let lookInPreviousChild = start >= position || !isValidPrecedingNode(foundChild, sourceFile);
            if (lookInPreviousChild) {
                if (position >= Node__from_ast.Pos(foundChild)) {
                    let jsDoc: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                    let nodeJSDoc = Node__from_ast.JSDoc(n, sourceFile);
                    for (let i = nodeJSDoc.length - 1; i >= 0; i--) {
                        if (Node__from_ast.Pos(nodeJSDoc.get(i)) >= Node__from_ast.Pos(foundChild)) {
                            jsDoc = nodeJSDoc.get(i);
                            break;
                        }
                    }
                    if (!(jsDoc === undefined)) {
                        if (!excludeJSDoc && position < Node__from_ast.End(jsDoc)) {
                            const __gotots_callee_6 = find;
                            const __gotots_argument_8 = jsDoc;
                            return (__gotots_callee_6 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_8);
                        }
                        else {
                            return findRightmostValidToken(Node__from_ast.End(jsDoc), sourceFile, n, position, excludeJSDoc);
                        }
                    }
                    return findRightmostValidToken(Node__from_ast.Pos(foundChild), sourceFile, n, -1, excludeJSDoc);
                }
                else {
                    return findRightmostValidToken(Node__from_ast.Pos(foundChild), sourceFile, n, position, excludeJSDoc);
                }
            }
            else {
                const __gotots_callee_7 = find;
                const __gotots_argument_9 = foundChild;
                return (__gotots_callee_7 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9);
            }
        }
        if (position >= Node__from_ast.End(n)) {
            return findRightmostValidToken(Node__from_ast.End(n), sourceFile, n, -1, excludeJSDoc);
        }
        else {
            return findRightmostValidToken(Node__from_ast.End(n), sourceFile, n, position, excludeJSDoc);
        }
    };
    let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (!(startNode === undefined)) {
        node = startNode;
    }
    else {
        const __gotots_store_1 = NodeBase__from_ast.$storageOf(((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        node = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
    const __gotots_callee_8 = find;
    const __gotots_argument_10 = node;
    let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (__gotots_callee_8 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_10);
    if (!(result === undefined) && IsWhitespaceOnlyJsxText__from_ast(result)) {
        const __gotots_argument_11 = new GoInterfaceAdapter("Expected result to be a non-whitespace token.");
        GoPanic.raise(__gotots_argument_11 === undefined ? GoPanicNilValue.create() : __gotots_argument_11);
    }
    return result;
}
export function isValidPrecedingNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindEndOfFile$constant__from_ast()) {
        return Node__from_ast.JSDoc(node, sourceFile).length > 0;
    }
    let start = GetStartOfNode(node, sourceFile, false);
    let width = Node__from_ast.End(node) - start;
    return !(IsWhitespaceOnlyJsxText__from_ast(node) || width === 0);
}
export function GetStartOfNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, includeJSDoc: bool): int {
    return GetTokenPosOfNode__from_scanner(node, file, includeJSDoc);
}
export function findRightmostValidToken(endPos: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, containingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, position: int, excludeJSDoc: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (position === -1) {
        position = Node__from_ast.End(containingNode);
    }
    let find: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: int) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined;
    find = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, endPos__shadow_1: int): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (n === undefined) {
            return void 0;
        }
        if (IsNonWhitespaceToken__from_ast(n)) {
            return n;
        }
        let rightmostValidNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let rightmostVisitedNodes = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(0, 1, void 0);
        let hasChildren = false;
        let shouldVisitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
            return !(!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) || Node__from_ast.End(node) > endPos__shadow_1 || GetStartOfNode(node, sourceFile, !excludeJSDoc) >= position);
        };
        let visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (node === undefined || !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                return node;
            }
            hasChildren = true;
            const __gotots_callee_12 = shouldVisitNode;
            const __gotots_argument_18 = node;
            if (!(__gotots_callee_12 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_18)) {
                return node;
            }
            rightmostVisitedNodes = rightmostVisitedNodes.append(void 0, [node]);
            if (isValidPrecedingNode(node, sourceFile)) {
                rightmostValidNode = node;
                rightmostVisitedNodes = rightmostVisitedNodes.slice(0, 0, null);
            }
            return node;
        };
        let visitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined = (nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            if (!(nodeList === undefined) && NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
                hasChildren = true;
                const __gotots_results_3 = BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (middle: int, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                    if (Node__from_ast.End(node) > endPos__shadow_1) {
                        return comparisonGreaterThan$int;
                    }
                    return comparisonLessThan$int;
                });
                let index = __gotots_results_3[0];
                let validIndex = -1;
                for (let i = index - 1; i >= 0; i--) {
                    const __gotots_callee_13 = shouldVisitNode;
                    const __gotots_argument_19 = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i);
                    if (!(__gotots_callee_13 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_19)) {
                        continue;
                    }
                    if (isValidPrecedingNode(NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i), sourceFile)) {
                        validIndex = i;
                        rightmostValidNode = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i);
                        break;
                    }
                }
                for (let i = validIndex + 1; i < index; i++) {
                    const __gotots_callee_14 = shouldVisitNode;
                    const __gotots_argument_20 = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i);
                    if (!(__gotots_callee_14 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_20)) {
                        continue;
                    }
                    rightmostVisitedNodes = rightmostVisitedNodes.append(void 0, [NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i)]);
                }
            }
            return nodeList;
        };
        VisitEachChildAndJSDoc(n, sourceFile, visitNode, visitNodes);
        if (!shouldSkipChild(n)) {
            let startPos = 0;
            if (!(rightmostValidNode === undefined)) {
                startPos = Node__from_ast.End(rightmostValidNode);
            }
            else {
                startPos = Node__from_ast.Pos(n);
            }
            let scanner__shadow_1: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(sourceFile, startPos);
            let tokens = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
            const __gotots_range_2 = rightmostVisitedNodes;
            for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
                const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
                let visitedNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
                for (; startPos < globalThis.Math.min(Node__from_ast.Pos(visitedNode), position);) {
                    let token = scanNavigationToken(scanner__shadow_1, n);
                    let tokenStart = Scanner__from_scanner.TokenStart(scanner__shadow_1);
                    if (tokenStart >= position) {
                        break;
                    }
                    let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
                    let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
                    startPos = tokenEnd;
                    let flags = Scanner__from_scanner.TokenFlags(scanner__shadow_1);
                    tokens = tokens.append(void 0, [SourceFile__from_ast.GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags)]);
                    Scanner__from_scanner.Scan(scanner__shadow_1);
                }
                startPos = Node__from_ast.End(visitedNode);
                Scanner__from_scanner.ResetPos(scanner__shadow_1, startPos);
                Scanner__from_scanner.Scan(scanner__shadow_1);
            }
            for (; startPos < globalThis.Math.min(endPos__shadow_1, position);) {
                let token = scanNavigationToken(scanner__shadow_1, n);
                let tokenStart = Scanner__from_scanner.TokenStart(scanner__shadow_1);
                if (tokenStart >= position) {
                    break;
                }
                let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
                let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
                startPos = tokenEnd;
                let flags = Scanner__from_scanner.TokenFlags(scanner__shadow_1);
                tokens = tokens.append(void 0, [SourceFile__from_ast.GetOrCreateToken(sourceFile, token, tokenFullStart, tokenEnd, n, flags)]);
                Scanner__from_scanner.Scan(scanner__shadow_1);
            }
            let lastToken = tokens.length - 1;
            for (let i = lastToken; i >= 0; i--) {
                if (!IsWhitespaceOnlyJsxText__from_ast(tokens.get(i))) {
                    return tokens.get(i);
                }
            }
        }
        if (!hasChildren) {
            if (!tsonicTypeScriptRuntime.sameLocation(n, containingNode)) {
                return n;
            }
            return void 0;
        }
        if (!(rightmostValidNode === undefined)) {
            endPos__shadow_1 = Node__from_ast.End(rightmostValidNode);
        }
        const __gotots_callee_15 = find;
        const __gotots_argument_21 = rightmostValidNode;
        const __gotots_argument_22 = endPos__shadow_1;
        return (__gotots_callee_15 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_21, __gotots_argument_22);
    };
    const __gotots_callee_16 = find;
    const __gotots_argument_23 = containingNode;
    const __gotots_argument_24 = endPos;
    return (__gotots_callee_16 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_23, __gotots_argument_24);
}
export function FindNextToken(previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let find: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined;
    find = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (IsTokenKind__from_ast(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) && Node__from_ast.Pos(n) === Node__from_ast.End(previousToken)) {
            return n;
        }
        let foundNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (!(node === undefined) && (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0 && Node__from_ast.Pos(node) <= Node__from_ast.End(previousToken) && Node__from_ast.End(node) > Node__from_ast.End(previousToken)) {
                foundNode = node;
            }
            return node;
        };
        let visitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined = (nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            if (!(nodeList === undefined) && NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0 && foundNode === undefined) {
                let nodes = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                const __gotots_results_4 = BinarySearchUniqueFunc$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(nodes, ($0: int, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): int => {
                    if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
                        return comparisonLessThan$int;
                    }
                    if (Node__from_ast.Pos(node) > Node__from_ast.End(previousToken)) {
                        return comparisonGreaterThan$int;
                    }
                    if (Node__from_ast.End(node) <= Node__from_ast.Pos(previousToken)) {
                        return comparisonLessThan$int;
                    }
                    return comparisonEqualTo$int;
                });
                let index = __gotots_results_4[0];
                let match = __gotots_results_4[1];
                if (match) {
                    foundNode = nodes.get(index);
                }
            }
            return nodeList;
        };
        VisitEachChildAndJSDoc(n, file, visitNode, visitNodes);
        if (!(foundNode === undefined)) {
            const __gotots_callee_17 = find;
            const __gotots_argument_25 = foundNode;
            return (__gotots_callee_17 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_25);
        }
        let startPos = Node__from_ast.End(previousToken);
        if (startPos >= Node__from_ast.Pos(n) && startPos < Node__from_ast.End(n)) {
            let scanner__shadow_1: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(file, startPos);
            let token = Scanner__from_scanner.Token(scanner__shadow_1);
            let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
            let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
            let flags = Scanner__from_scanner.TokenFlags(scanner__shadow_1);
            if (tokenFullStart === Node__from_ast.End(previousToken)) {
                return SourceFile__from_ast.GetOrCreateToken(file, token, tokenFullStart, tokenEnd, n, flags);
            }
            const __gotots_argument_26 = new GoInterfaceAdapter(fmt__from_gostdlib.Sprintf("Expected to find next token at %d, got token %s at %d", RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$int(Node__from_ast.End(previousToken)), new $goInterfaceAdapter$Named_ast$Kind(token), new $goInterfaceAdapter$int(tokenFullStart)])));
            GoPanic.raise(__gotots_argument_26 === undefined ? GoPanicNilValue.create() : __gotots_argument_26);
        }
        return void 0;
    };
    const __gotots_callee_18 = find;
    const __gotots_argument_27 = parent;
    return (__gotots_callee_18 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_27);
}
export function getNodeVisitor(visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
    value: NodeVisitor__from_ast;
} | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined, visitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
    value: NodeVisitor__from_ast;
} | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined): {
    value: NodeVisitor__from_ast;
} | undefined {
    let wrappedVisitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined;
    let wrappedVisitNodes: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined;
    if (!(visitNode === undefined)) {
        wrappedVisitNode = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, v: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            if (IsJSDocSingleCommentNodeComment__from_ast(n)) {
                return n;
            }
            const __gotots_callee_9 = visitNode;
            const __gotots_argument_12 = n;
            const __gotots_argument_13 = v;
            return (__gotots_callee_9 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_12, __gotots_argument_13);
        };
    }
    if (!(visitNodes === undefined)) {
        wrappedVisitNodes = (n: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, v: {
            value: NodeVisitor__from_ast;
        } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
            if (IsJSDocSingleCommentNodeList__from_ast(n)) {
                return n;
            }
            const __gotots_callee_10 = visitNodes;
            const __gotots_argument_14 = n;
            const __gotots_argument_15 = v;
            return (__gotots_callee_10 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_14, __gotots_argument_15);
        };
    }
    return NewNodeVisitor__from_ast(($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return Identity$PointerTo_Named_ast$Node($argument0);
    }, void 0, new NodeVisitorHooks__from_ast(wrappedVisitNode, wrappedVisitNode, wrappedVisitNodes, (modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, visitor: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined => {
        if (!(modifiers === undefined)) {
            const __gotots_callee_11 = wrappedVisitNodes;
            const __gotots_store_2 = ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
            const __gotots_argument_16 = tsonicTypeScriptRuntime.projectLocation<NodeList__from_ast$Storage, NodeList__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeList"), NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
            const __gotots_argument_17 = visitor;
            (__gotots_callee_11 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_16, __gotots_argument_17);
        }
        return modifiers;
    }, void 0, void 0, void 0, void 0, void 0));
}
export function shouldSkipChild(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDoc$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocText$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocTypeLiteral$constant__from_ast() || Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindJSDocSignature$constant__from_ast() || IsJSDocLinkLike__from_ast(node) || IsJSDocTag__from_ast(node);
}
export function FindChildOfKind(containingNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, kind: Kind__from_ast, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let lastNodePos = Node__from_ast.Pos(containingNode);
    let scan: tsonicTypeScriptRuntime.Location<Scanner__from_scanner> | undefined = GetScannerForSourceFile__from_scanner(sourceFile, lastNodePos);
    let foundChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined = (node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (node === undefined || !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
            return false;
        }
        let startPos__shadow_1 = lastNodePos;
        for (; startPos__shadow_1 < Node__from_ast.Pos(node);) {
            let tokenKind = Scanner__from_scanner.Token(scan);
            let tokenEnd = Scanner__from_scanner.TokenEnd(scan);
            if (tokenKind === kind) {
                let tokenFullStart = Scanner__from_scanner.TokenFullStart(scan);
                let flags = Scanner__from_scanner.TokenFlags(scan);
                foundChild = SourceFile__from_ast.GetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, containingNode, flags);
                return true;
            }
            startPos__shadow_1 = tokenEnd;
            Scanner__from_scanner.Scan(scan);
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === kind) {
            foundChild = node;
            return true;
        }
        lastNodePos = Node__from_ast.End(node);
        Scanner__from_scanner.ResetPos(scan, lastNodePos);
        return false;
    };
    ForEachChildAndJSDoc__from_ast(containingNode, sourceFile, new Visitor__from_ast(visitNode));
    if (!(foundChild === undefined)) {
        return foundChild;
    }
    let startPos = lastNodePos;
    for (; startPos < Node__from_ast.End(containingNode);) {
        let tokenKind = Scanner__from_scanner.Token(scan);
        let tokenEnd = Scanner__from_scanner.TokenEnd(scan);
        if (tokenKind === kind) {
            let tokenFullStart = Scanner__from_scanner.TokenFullStart(scan);
            let flags = Scanner__from_scanner.TokenFlags(scan);
            let token: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SourceFile__from_ast.GetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, containingNode, flags);
            return token;
        }
        startPos = tokenEnd;
        Scanner__from_scanner.Scan(scan);
    }
    return void 0;
}
