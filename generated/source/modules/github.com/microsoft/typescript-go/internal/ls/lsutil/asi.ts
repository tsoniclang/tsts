import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { FindAncestorResult as FindAncestorResult__from_ast, Kind as Kind__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { FindAncestorOrQuit as FindAncestorOrQuit__from_ast, FindAncestorQuit$constant as FindAncestorQuit$constant__from_ast, FindAncestor as FindAncestor__from_ast, IsFunctionBlock as IsFunctionBlock__from_ast, IsModuleBlock as IsModuleBlock__from_ast, KindBreakStatement$constant as KindBreakStatement$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCommaToken$constant as KindCommaToken$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindContinueStatement$constant as KindContinueStatement$constant__from_ast, KindDebuggerStatement$constant as KindDebuggerStatement$constant__from_ast, KindDoStatement$constant as KindDoStatement$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExpressionStatement$constant as KindExpressionStatement$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindReturnStatement$constant as KindReturnStatement$constant__from_ast, KindSemicolonToken$constant as KindSemicolonToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindThrowStatement$constant as KindThrowStatement$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindVariableStatement$constant as KindVariableStatement$constant__from_ast, Node as Node__from_ast, ToFindAncestorResult as ToFindAncestorResult__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindNextToken as FindNextToken__from_astnav, GetStartOfNode as GetStartOfNode__from_astnav } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { GetECMALineOfPosition as GetECMALineOfPosition__from_scanner } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { GetLastChild, GetLastToken } from "./children.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function PositionIsASICandidate(pos: int, context: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    let contextAncestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestorOrQuit__from_ast(context, (ancestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): FindAncestorResult__from_ast => {
        if (Node__from_ast.End(ancestor) !== pos) {
            return FindAncestorQuit$constant__from_ast();
        }
        return ToFindAncestorResult__from_ast(SyntaxMayBeASICandidate(Node__from_ast.$storageOf(((ancestor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind));
    });
    return !(contextAncestor === undefined) && NodeIsASICandidate(contextAncestor, file);
}
export function SyntaxMayBeASICandidate(kind: Kind__from_ast): bool {
    return SyntaxRequiresTrailingCommaOrSemicolonOrASI(kind) || SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind) || SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind) || SyntaxRequiresTrailingSemicolonOrASI(kind);
}
export function SyntaxRequiresTrailingCommaOrSemicolonOrASI(kind: Kind__from_ast): bool {
    return kind === KindCallSignature$constant__from_ast() || kind === KindConstructSignature$constant__from_ast() || kind === KindIndexSignature$constant__from_ast() || kind === KindPropertySignature$constant__from_ast() || kind === KindMethodSignature$constant__from_ast();
}
export function SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(kind: Kind__from_ast): bool {
    return kind === KindFunctionDeclaration$constant__from_ast() || kind === KindConstructor$constant__from_ast() || kind === KindMethodDeclaration$constant__from_ast() || kind === KindGetAccessor$constant__from_ast() || kind === KindSetAccessor$constant__from_ast();
}
export function SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(kind: Kind__from_ast): bool {
    return kind === KindModuleDeclaration$constant__from_ast();
}
export function SyntaxRequiresTrailingSemicolonOrASI(kind: Kind__from_ast): bool {
    return kind === KindVariableStatement$constant__from_ast() || kind === KindExpressionStatement$constant__from_ast() || kind === KindDoStatement$constant__from_ast() || kind === KindContinueStatement$constant__from_ast() || kind === KindBreakStatement$constant__from_ast() || kind === KindReturnStatement$constant__from_ast() || kind === KindThrowStatement$constant__from_ast() || kind === KindDebuggerStatement$constant__from_ast() || kind === KindPropertyDeclaration$constant__from_ast() || kind === KindTypeAliasDeclaration$constant__from_ast() || kind === KindImportDeclaration$constant__from_ast() || kind === KindImportEqualsDeclaration$constant__from_ast() || kind === KindExportDeclaration$constant__from_ast() || kind === KindNamespaceExportDeclaration$constant__from_ast() || kind === KindExportAssignment$constant__from_ast();
}
export function NodeIsASICandidate(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    let lastToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastToken(node, file);
    if (!(lastToken === undefined) && Node__from_ast.$storageOf(((lastToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSemicolonToken$constant__from_ast()) {
        return false;
    }
    if (SyntaxRequiresTrailingCommaOrSemicolonOrASI(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        if (!(lastToken === undefined) && Node__from_ast.$storageOf(((lastToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCommaToken$constant__from_ast()) {
            return false;
        }
    }
    else if (SyntaxRequiresTrailingModuleBlockOrSemicolonOrASI(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        let lastChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastChild(node, file);
        if (!(lastChild === undefined) && IsModuleBlock__from_ast(lastChild)) {
            return false;
        }
    }
    else if (SyntaxRequiresTrailingFunctionBlockOrSemicolonOrASI(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        let lastChild: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetLastChild(node, file);
        if (!(lastChild === undefined) && IsFunctionBlock__from_ast(lastChild)) {
            return false;
        }
    }
    else if (!SyntaxRequiresTrailingSemicolonOrASI(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind)) {
        return false;
    }
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindDoStatement$constant__from_ast()) {
        return true;
    }
    let topNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(node, (ancestor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return Node__from_ast.$storageOf(((ancestor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined;
    });
    let nextToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindNextToken__from_astnav(node, topNode, file);
    if (nextToken === undefined || Node__from_ast.$storageOf(((nextToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindCloseBraceToken$constant__from_ast()) {
        return true;
    }
    let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(file), Node__from_ast.End(node));
    let endLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(file), GetStartOfNode__from_astnav(nextToken, file, false));
    return startLine !== endLine;
}
