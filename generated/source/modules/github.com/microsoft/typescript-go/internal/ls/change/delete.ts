import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, BindingPattern as BindingPattern__from_ast, NamedImports as NamedImports__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { Position$Storage as Position__from_lsproto$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { LeadingTriviaOption, TrailingTriviaOption } from "./tracker.js";
import type { GoMapValue } from "@gotots/runtime/map.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { CallExpression as CallExpression__from_ast, FindAncestorKind as FindAncestorKind__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, ImportClause as ImportClause__from_ast, IsAnyImportSyntax as IsAnyImportSyntax__from_ast, KindArrayBindingPattern$constant as KindArrayBindingPattern$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindForInStatement$constant as KindForInStatement$constant__from_ast, KindForOfStatement$constant as KindForOfStatement$constant__from_ast, KindForStatement$constant as KindForStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionKeyword$constant as KindFunctionKeyword$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindNamespaceImport$constant as KindNamespaceImport$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindTypeKeyword$constant as KindTypeKeyword$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, Kind_String as Kind_String__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, SourceFile as SourceFile__from_ast, VariableDeclarationList as VariableDeclarationList__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindChildOfKind as FindChildOfKind__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav, GetTokenAtPosition as GetTokenAtPosition__from_astnav } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { Assert as Assert__from_debug, Fail as Fail__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { GetContainingList as GetContainingList__from_format, GetLineStartPositionForPosition as GetLineStartPositionForPosition__from_format } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/format/package.js";
import { Converters as Converters__from_lsconv } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ls/lsconv/package.js";
import { Position as Position__from_lsproto, Range as Range__from_lsproto } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/lsp/lsproto/package.js";
import { SkipTriviaEx as SkipTriviaEx__from_scanner, SkipTriviaOptions as SkipTriviaOptions__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { Find$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Find.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Contains.js";
import { Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile, $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { LeadingTriviaOptionExclude$constant, LeadingTriviaOptionIncludeAll$constant, LeadingTriviaOptionJSDoc$constant, LeadingTriviaOptionStartLine$constant, Tracker, TrailingTriviaOptionExclude$constant, TrailingTriviaOptionInclude$constant, TrailingTriviaOptionNone$constant } from "./tracker.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function deleteDeclaration(t: Tracker | undefined, deletedNodesInLists: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, bool>, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindParameter$constant__from_ast(): {
            let oldFunction: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (Node__from_ast.$storageOf(((oldFunction ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrowFunction$constant__from_ast() && NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsArrowFunction(oldFunction) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1 && FindChildOfKind__from_astnav(oldFunction, KindOpenParenToken$constant__from_ast(), sourceFile) === undefined) {
                Tracker.ReplaceRangeWithText(t, sourceFile, Tracker.GetAdjustedRange(t, sourceFile, node, node, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant()), "()");
            }
            else {
                deleteNodeInList(t, deletedNodesInLists, sourceFile, node);
            }
            break;
        }
        case KindImportDeclaration$constant__from_ast():
        case KindImportEqualsDeclaration$constant__from_ast(): {
            let imports = SourceFile__from_ast.Imports(sourceFile);
            let isFirstImport = imports.length > 0 &&
                tsonicTypeScriptRuntime.sameLocation(node, Node__from_ast.$storageOf(((imports.get(0) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ||
                tsonicTypeScriptRuntime.sameLocation(node, Find$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((((sourceFile ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, (s: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    return IsAnyImportSyntax__from_ast(s);
                }));
            let leadingTrivia = LeadingTriviaOptionStartLine$constant();
            if (isFirstImport) {
                leadingTrivia = LeadingTriviaOptionExclude$constant();
            }
            else if (hasJSDocNodes(node)) {
                leadingTrivia = LeadingTriviaOptionJSDoc$constant();
            }
            deleteNode(t, sourceFile, node, leadingTrivia, TrailingTriviaOptionInclude$constant());
            break;
        }
        case KindBindingElement$constant__from_ast(): {
            let pattern: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            let preserveComma = Node__from_ast.$storageOf(((pattern ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindArrayBindingPattern$constant__from_ast() && !tsonicTypeScriptRuntime.sameLocation(node, NodeList__from_ast.$storageOf((((Node__from_ast.AsBindingPattern(pattern) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(NodeList__from_ast.$storageOf((((Node__from_ast.AsBindingPattern(pattern) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1));
            if (preserveComma) {
                deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionExclude$constant());
            }
            else {
                deleteNodeInList(t, deletedNodesInLists, sourceFile, node);
            }
            break;
        }
        case KindVariableDeclaration$constant__from_ast(): {
            deleteVariableDeclaration(t, deletedNodesInLists, sourceFile, node);
            break;
        }
        case KindTypeParameter$constant__from_ast(): {
            deleteNodeInList(t, deletedNodesInLists, sourceFile, node);
            break;
        }
        case KindImportSpecifier$constant__from_ast(): {
            let namedImports: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
            if (NodeList__from_ast.$storageOf((((Node__from_ast.AsNamedImports(namedImports) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1) {
                deleteImportBinding(t, sourceFile, namedImports);
            }
            else {
                deleteNodeInList(t, deletedNodesInLists, sourceFile, node);
            }
            break;
        }
        case KindNamespaceImport$constant__from_ast(): {
            deleteImportBinding(t, sourceFile, node);
            break;
        }
        case KindSemicolonToken$constant__from_ast(): {
            deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionExclude$constant());
            break;
        }
        case KindTypeKeyword$constant__from_ast(): {
            deleteNode(t, sourceFile, node, LeadingTriviaOptionExclude$constant(), TrailingTriviaOptionInclude$constant());
            break;
        }
        case KindFunctionKeyword$constant__from_ast(): {
            deleteNode(t, sourceFile, node, LeadingTriviaOptionExclude$constant(), TrailingTriviaOptionInclude$constant());
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast(): {
            let leadingTrivia = LeadingTriviaOptionStartLine$constant();
            if (hasJSDocNodes(node)) {
                leadingTrivia = LeadingTriviaOptionJSDoc$constant();
            }
            deleteNode(t, sourceFile, node, leadingTrivia, TrailingTriviaOptionInclude$constant());
            break;
        }
        default: {
            if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) {
                deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
            }
            else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindImportClause$constant__from_ast() &&
                tsonicTypeScriptRuntime.sameLocation(ImportClause__from_ast.Name(Node__from_ast.AsImportClause(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent)), node)) {
                deleteDefaultImport(t, sourceFile, Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
            }
            else if (Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCallExpression$constant__from_ast() && Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((CallExpression__from_ast.$storageOf(((Node__from_ast.AsCallExpression(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, node)) {
                deleteNodeInList(t, deletedNodesInLists, sourceFile, node);
            }
            else {
                deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
            }
            break;
        }
    }
}
export function deleteDefaultImport(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    let clause: {
        value: ImportClause__from_ast;
    } | undefined = Node__from_ast.AsImportClause(importClause);
    if ((clause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings === undefined) {
        deleteNode(t, sourceFile, Node__from_ast.$storageOf(((importClause ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
    }
    else {
        let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ImportClause__from_ast.Name(clause);
        let start = GetStartOfNode__from_astnav(name, sourceFile, false);
        let nextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(sourceFile, Node__from_ast.End(name));
        if (!(nextToken === undefined) && Node__from_ast.$storageOf(((nextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
            let end = SkipTriviaEx__from_scanner(SourceFile__from_ast.Text(sourceFile), Node__from_ast.End(nextToken), new SkipTriviaOptions__from_scanner(false, true, false));
            let startPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), start | 0);
            let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), end | 0);
            Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$fromStorage({
                Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(startPos)),
                End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
            }), "");
        }
        else {
            deleteNode(t, sourceFile, name, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
        }
    }
}
export function deleteImportBinding(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    let importClause: {
        value: ImportClause__from_ast;
    } | undefined = Node__from_ast.AsImportClause(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent);
    if (!(ImportClause__from_ast.Name(importClause) === undefined)) {
        let previousToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetTokenAtPosition__from_astnav(sourceFile, Node__from_ast.Pos(node) - 1);
        Assert__from_debug(!(previousToken === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("previousToken should not be nil")]));
        let startPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), GetStartOfNode__from_astnav(previousToken, sourceFile, false) | 0);
        let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), Node__from_ast.End(node) | 0);
        Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$fromStorage({
            Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(startPos)),
            End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
        }), "");
    }
    else {
        let importDecl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorKind__from_ast(node, KindImportDeclaration$constant__from_ast());
        Assert__from_debug(!(importDecl === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("importDecl should not be nil")]));
        deleteNode(t, sourceFile, importDecl, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
    }
}
export function deleteVariableDeclaration(t: Tracker | undefined, deletedNodesInLists: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, bool>, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCatchClause$constant__from_ast()) {
        let openParen: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(parent, KindOpenParenToken$constant__from_ast(), sourceFile);
        let closeParen: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindChildOfKind__from_astnav(parent, KindCloseParenToken$constant__from_ast(), sourceFile);
        Assert__from_debug(!(openParen === undefined) && !(closeParen === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("catch clause should have parens")]));
        Tracker.DeleteNodeRange(t, sourceFile, openParen, closeParen, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
        return;
    }
    if (NodeList__from_ast.$storageOf(((VariableDeclarationList__from_ast.$storageOf(((Node__from_ast.AsVariableDeclarationList(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclarationList__from_ast>).value).Declarations ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length !== 1) {
        deleteNodeInList(t, deletedNodesInLists, sourceFile, node);
        return;
    }
    let gp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    switch (Node__from_ast.$storageOf(((gp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindForOfStatement$constant__from_ast():
        case KindForInStatement$constant__from_ast(): {
            Tracker.ReplaceNode(t, sourceFile, node, NodeFactory__from_ast.NewObjectLiteralExpression((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, NodeFactory__from_ast.NewNodeList((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).NodeFactory, RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([])), false), void 0);
            break;
        }
        case KindForStatement$constant__from_ast(): {
            deleteNode(t, sourceFile, parent, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
            break;
        }
        case KindVariableStatement$constant__from_ast(): {
            let leadingTrivia = LeadingTriviaOptionStartLine$constant();
            if (hasJSDocNodes(gp)) {
                leadingTrivia = LeadingTriviaOptionJSDoc$constant();
            }
            deleteNode(t, sourceFile, gp, leadingTrivia, TrailingTriviaOptionInclude$constant());
            break;
        }
        default: {
            Fail__from_debug("Unexpected grandparent kind: " + Kind_String__from_ast(Node__from_ast.$storageOf(((gp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
            break;
        }
    }
}
export function deleteNode(t: Tracker | undefined, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, leadingTrivia: LeadingTriviaOption, trailingTrivia: TrailingTriviaOption): void {
    let startPosition = Tracker.$go$private$change$getAdjustedStartPosition(t, sourceFile, node, leadingTrivia, false);
    let endPosition = Tracker.$go$private$change$getAdjustedEndPosition(t, sourceFile, node, trailingTrivia);
    let startPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), startPosition | 0);
    let endPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), endPosition | 0);
    Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$fromStorage({
        Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(startPos)),
        End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endPos))
    }), "");
}
export function deleteNodeInList(t: Tracker | undefined, deletedNodesInLists: GoMapValue<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, bool>, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
    let containingList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = GetContainingList__from_format(node, sourceFile);
    Assert__from_debug(!(containingList === undefined), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("containingList should not be nil")]));
    let index = Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, node);
    Assert__from_debug(index !== -1, RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("node should be in containing list")]));
    if (NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 1) {
        deleteNode(t, sourceFile, node, LeadingTriviaOptionIncludeAll$constant(), TrailingTriviaOptionInclude$constant());
        return;
    }
    Assert__from_debug(!deletedNodesInLists.lookup(node), RuntimeSlice.literal<GoInterface | undefined>([new GoInterfaceAdapter("Deleting a node twice")]));
    deletedNodesInLists.store(node, true);
    let startPos = Tracker.$go$private$change$startPositionToDeleteNodeInList(t, sourceFile, node);
    let endPos = 0;
    if (index === NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length - 1) {
        endPos = Tracker.$go$private$change$getAdjustedEndPosition(t, sourceFile, node, TrailingTriviaOptionNone$constant());
    }
    else {
        let prevNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (index > 0) {
            prevNode = NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(index - 1);
        }
        endPos = Tracker.$go$private$change$endPositionToDeleteNodeInList(t, sourceFile, node, prevNode, NodeList__from_ast.$storageOf(((containingList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(index + 1));
    }
    let startLSPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), startPos | 0);
    let endLSPos = Converters__from_lsconv.PositionToLineAndCharacter((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).converters, new $goInterfaceAdapter$PointerTo_Named_ast$SourceFile(sourceFile), endPos | 0);
    Tracker.ReplaceRangeWithText(t, sourceFile, Range__from_lsproto.$fromStorage({
        Start: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(startLSPos)),
        End: Position__from_lsproto.$storageOf(Position__from_lsproto.$copy(endLSPos))
    }), "");
}
export function positionsAreOnSameLine(pos1: int, pos2: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    return GetLineStartPositionForPosition__from_format(pos1, sourceFile) === GetLineStartPositionForPosition__from_format(pos2, sourceFile);
}
export function hasJSDocNodes(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (node === undefined) {
        return false;
    }
    let jsdocs = Node__from_ast.JSDoc(node, void 0);
    return jsdocs.length > 0;
}
