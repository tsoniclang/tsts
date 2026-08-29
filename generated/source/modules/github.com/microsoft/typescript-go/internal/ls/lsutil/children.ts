import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeVisitor as NodeVisitor__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { IsIdentifier as IsIdentifier__from_ast, IsJSDocSingleCommentNode as IsJSDocSingleCommentNode__from_ast, IsTokenKind as IsTokenKind__from_ast, KindFirstNode$constant as KindFirstNode$constant__from_ast, NodeFlagsReparsed$constant as NodeFlagsReparsed$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PositionIsSynthesized as PositionIsSynthesized__from_ast, SourceFile as SourceFile__from_ast, Visitor as Visitor__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { VisitEachChildAndJSDoc as VisitEachChildAndJSDoc__from_astnav } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { GetScannerForSourceFile as GetScannerForSourceFile__from_scanner, Scanner as Scanner__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { IfElse$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/IfElse.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function GetLastChild(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let lastChildNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastVisitedChild(node, sourceFile);
    if (IsJSDocSingleCommentNode__from_ast(node) && lastChildNode === undefined) {
        return void 0;
    }
    let tokenStartPos = 0;
    if (!(lastChildNode === undefined)) {
        tokenStartPos = Node__from_ast.End(lastChildNode);
    }
    else {
        tokenStartPos = Node__from_ast.Pos(node);
    }
    let lastToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let scanner__shadow_1: Scanner__from_scanner | undefined = GetScannerForSourceFile__from_scanner(sourceFile, tokenStartPos);
    for (let startPos = tokenStartPos; startPos < Node__from_ast.End(node);) {
        let tokenKind = Scanner__from_scanner.Token(scanner__shadow_1);
        let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
        let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
        lastToken = SourceFile__from_ast.GetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, node, Scanner__from_scanner.TokenFlags(scanner__shadow_1));
        startPos = tokenEnd;
        Scanner__from_scanner.Scan(scanner__shadow_1);
    }
    return IfElse$PointerTo_Named_ast$Node(!(lastToken === undefined), lastToken, lastChildNode);
}
export function GetLastToken(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (node === undefined) {
        return void 0;
    }
    if (IsTokenKind__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) || IsIdentifier__from_ast(node)) {
        return void 0;
    }
    AssertHasRealPosition(node);
    let lastChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastChild(node, sourceFile);
    if (lastChild === undefined) {
        return void 0;
    }
    if (Node__from_ast.$storageOf(((lastChild ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind < KindFirstNode$constant__from_ast()) {
        return lastChild;
    }
    else {
        return GetLastToken(lastChild, sourceFile);
    }
}
export function GetLastVisitedChild(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let lastChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    let visitNode: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) | undefined = (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        if (!(n === undefined) && (Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
            lastChild = n;
        }
        return n;
    };
    let visitNodeList: (($0: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined) => tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined) | undefined = (nodeList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, $1: {
        value: NodeVisitor__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined => {
        if (!(nodeList === undefined) && NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0) {
            for (let i = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1; i >= 0; i--) {
                if ((Node__from_ast.$storageOf(((NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0) {
                    lastChild = NodeList__from_ast.$storageOf(((nodeList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(i);
                    break;
                }
            }
        }
        return nodeList;
    };
    VisitEachChildAndJSDoc__from_astnav(node, sourceFile, visitNode, visitNodeList);
    return lastChild;
}
export function GetFirstToken(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    if (IsIdentifier__from_ast(node) || IsTokenKind__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        return void 0;
    }
    AssertHasRealPosition(node);
    let firstChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    Node__from_ast.ForEachChild(node, new Visitor__from_ast((n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (n === undefined || !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsReparsed$constant__from_ast()) >>> 0 === 0)) {
            return false;
        }
        firstChild = n;
        return true;
    }));
    let tokenEndPosition = 0;
    if (!(firstChild === undefined)) {
        tokenEndPosition = Node__from_ast.Pos(firstChild);
    }
    else {
        tokenEndPosition = Node__from_ast.End(node);
    }
    let scanner__shadow_1: Scanner__from_scanner | undefined = GetScannerForSourceFile__from_scanner(sourceFile, Node__from_ast.Pos(node));
    let firstToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
    if (Node__from_ast.Pos(node) < tokenEndPosition) {
        let tokenKind = Scanner__from_scanner.Token(scanner__shadow_1);
        let tokenFullStart = Scanner__from_scanner.TokenFullStart(scanner__shadow_1);
        let tokenEnd = Scanner__from_scanner.TokenEnd(scanner__shadow_1);
        firstToken = SourceFile__from_ast.GetOrCreateToken(sourceFile, tokenKind, tokenFullStart, tokenEnd, node, Scanner__from_scanner.TokenFlags(scanner__shadow_1));
    }
    if (!(firstToken === undefined)) {
        return firstToken;
    }
    if (firstChild === undefined) {
        return void 0;
    }
    if (Node__from_ast.$storageOf(((firstChild ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind < KindFirstNode$constant__from_ast()) {
        return firstChild;
    }
    return GetFirstToken(firstChild, sourceFile);
}
export function AssertHasRealPosition(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    if (PositionIsSynthesized__from_ast(Node__from_ast.Pos(node)) || PositionIsSynthesized__from_ast(Node__from_ast.End(node))) {
        const __gotots_argument_0 = new GoInterfaceAdapter("Node must have a real position for this operation.");
        GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
    }
}
