import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CatchClause as CatchClause__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, Kind as Kind__from_ast, NamedMemberBase$Storage as NamedMemberBase__from_ast$Storage, NamespaceExportDeclaration as NamespaceExportDeclaration__from_ast, NodeList$Storage as NodeList__from_ast$Storage, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, ShorthandPropertyAssignment as ShorthandPropertyAssignment__from_ast, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, IsAutoAccessorPropertyDeclaration as IsAutoAccessorPropertyDeclaration__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsModifierLike as IsModifierLike__from_ast, IsNamespaceExportDeclaration as IsNamespaceExportDeclaration__from_ast, IsPropertyAssignment as IsPropertyAssignment__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsShorthandPropertyAssignment as IsShorthandPropertyAssignment__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindBlock$constant as KindBlock$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindCatchClause$constant as KindCatchClause$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindCloseBraceToken$constant as KindCloseBraceToken$constant__from_ast, KindCloseParenToken$constant as KindCloseParenToken$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindExclamationToken$constant as KindExclamationToken$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindGreaterThanToken$constant as KindGreaterThanToken$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindLessThanToken$constant as KindLessThanToken$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindModuleBlock$constant as KindModuleBlock$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindOpenBraceToken$constant as KindOpenBraceToken$constant__from_ast, KindOpenParenToken$constant as KindOpenParenToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnknown$constant as KindUnknown$constant__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, PropertyAssignment as PropertyAssignment__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FindPrecedingToken as FindPrecedingToken__from_astnav } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/astnav/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { GetECMALineOfPosition as GetECMALineOfPosition__from_scanner, GetECMALineStarts as GetECMALineStarts__from_scanner } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/scanner/package.js";
import { Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Contains.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
class $ProjectedPropertyLocation<TObject extends object, TKey extends keyof TObject, TTarget> {
    storageIdentity: TObject;
    storageKey: TKey;
    fromSource: (value: TObject[TKey]) => TTarget;
    toSource: (value: TTarget) => TObject[TKey];
    constructor(storageIdentity: TObject, storageKey: TKey, fromSource: (value: TObject[TKey]) => TTarget, toSource: (value: TTarget) => TObject[TKey]) {
        this.storageIdentity = storageIdentity;
        this.storageKey = storageKey;
        this.fromSource = fromSource;
        this.toSource = toSource;
    }
    get value(): TTarget {
        return this.fromSource(this.storageIdentity[this.storageKey]);
    }
    set value(value: TTarget) {
        this.storageIdentity[this.storageKey] = this.toSource(value);
    }
}
export function rangeIsOnOneLine(node: TextRange__from_core, file: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): bool {
    let startLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(file), node.Pos());
    let endLine = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(file), node.End());
    return startLine === endLine;
}
export function getOpenTokenForList(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): Kind__from_ast {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindConstructor$constant__from_ast():
        case KindFunctionDeclaration$constant__from_ast():
        case KindFunctionExpression$constant__from_ast():
        case KindMethodDeclaration$constant__from_ast():
        case KindMethodSignature$constant__from_ast():
        case KindArrowFunction$constant__from_ast():
        case KindCallSignature$constant__from_ast():
        case KindConstructSignature$constant__from_ast():
        case KindFunctionType$constant__from_ast():
        case KindConstructorType$constant__from_ast():
        case KindGetAccessor$constant__from_ast():
        case KindSetAccessor$constant__from_ast(): {
            if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.TypeParameterList(node), list)) {
                return KindLessThanToken$constant__from_ast();
            }
            else if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.ParameterList(node), list)) {
                return KindOpenParenToken$constant__from_ast();
            }
            break;
        }
        case KindCallExpression$constant__from_ast():
        case KindNewExpression$constant__from_ast(): {
            if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.TypeArgumentList(node), list)) {
                return KindLessThanToken$constant__from_ast();
            }
            else if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.ArgumentList(node), list)) {
                return KindOpenParenToken$constant__from_ast();
            }
            break;
        }
        case KindClassDeclaration$constant__from_ast():
        case KindClassExpression$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast(): {
            if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.TypeParameterList(node), list)) {
                return KindLessThanToken$constant__from_ast();
            }
            break;
        }
        case KindTypeReference$constant__from_ast():
        case KindTaggedTemplateExpression$constant__from_ast():
        case KindTypeQuery$constant__from_ast():
        case KindExpressionWithTypeArguments$constant__from_ast():
        case KindImportType$constant__from_ast(): {
            if (tsonicTypeScriptRuntime.sameLocation(Node__from_ast.TypeArgumentList(node), list)) {
                return KindLessThanToken$constant__from_ast();
            }
            break;
        }
        case KindTypeLiteral$constant__from_ast(): {
            return KindOpenBraceToken$constant__from_ast();
            break;
        }
    }
    return KindUnknown$constant__from_ast();
}
export function getCloseTokenForOpenToken(kind: Kind__from_ast): Kind__from_ast {
    switch (kind) {
        case KindOpenParenToken$constant__from_ast(): {
            return KindCloseParenToken$constant__from_ast();
            break;
        }
        case KindLessThanToken$constant__from_ast(): {
            return KindGreaterThanToken$constant__from_ast();
            break;
        }
        case KindOpenBraceToken$constant__from_ast(): {
            return KindCloseBraceToken$constant__from_ast();
            break;
        }
    }
    return KindUnknown$constant__from_ast();
}
export function GetLineStartPositionForPosition(position: int, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): int {
    let lineStarts = GetECMALineStarts__from_scanner(new GoInterfaceAdapter(sourceFile));
    let line = GetECMALineOfPosition__from_scanner(new GoInterfaceAdapter(sourceFile), position);
    return lineStarts.get(line);
}
export function isGrammarError(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsTypeParameterDeclaration__from_ast(parent)) {
        return tsonicTypeScriptRuntime.sameLocation(child, TypeParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsTypeParameterDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).Expression);
    }
    if (IsPropertySignatureDeclaration__from_ast(parent)) {
        return tsonicTypeScriptRuntime.sameLocation(child, Node__from_ast.Initializer(parent));
    }
    if (IsPropertyDeclaration__from_ast(parent)) {
        return IsAutoAccessorPropertyDeclaration__from_ast(parent) &&
            tsonicTypeScriptRuntime.sameLocation(child, Node__from_ast.PostfixToken(parent)) && Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQuestionToken$constant__from_ast();
    }
    if (IsPropertyAssignment__from_ast(parent)) {
        let pa: tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast> | undefined = Node__from_ast.AsPropertyAssignment(parent);
        const __gotots_store_0 = PropertyAssignment__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value);
        let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NamedMemberBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_0, "NamedMemberBase", NamedMemberBase__from_ast.$fromStorage, NamedMemberBase__from_ast.$storageOf));
        let __gotots_logical_result_1 = tsonicTypeScriptRuntime.sameLocation(child, (void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
            PropertyAssignment__from_ast.$storageOf(((pa ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).NamedMemberBase)).PostfixToken);
        if (!__gotots_logical_result_1) {
            let __gotots_logical_result_0 = !(mods === undefined);
            if (__gotots_logical_result_0) {
                const __gotots_store_1 = ModifierList__from_ast.$storageOf(((mods ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                const __gotots_argument_0 = new $ProjectedPropertyLocation(__gotots_store_1, "NodeList", NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
                const __gotots_argument_1 = child;
                const __gotots_argument_2 = IsModifierLike__from_ast;
                __gotots_logical_result_0 = isGrammarErrorElement(__gotots_argument_0, __gotots_argument_1, __gotots_argument_2);
            }
            __gotots_logical_result_1 = (__gotots_logical_result_0);
        }
        return __gotots_logical_result_1;
    }
    if (IsShorthandPropertyAssignment__from_ast(parent)) {
        let sp: {
            value: ShorthandPropertyAssignment__from_ast;
        } | undefined = Node__from_ast.AsShorthandPropertyAssignment(parent);
        const __gotots_store_2 = (sp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NamedMemberBase"));
        let __gotots_logical_result_3 = tsonicTypeScriptRuntime.sameLocation(child, (sp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsToken)
            ||
                tsonicTypeScriptRuntime.sameLocation(child, NamedMemberBase__from_ast.$storageOf((sp ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken);
        if (!__gotots_logical_result_3) {
            let __gotots_logical_result_2 = !(mods === undefined);
            if (__gotots_logical_result_2) {
                const __gotots_store_3 = ModifierList__from_ast.$storageOf(((mods ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
                const __gotots_argument_3 = new $ProjectedPropertyLocation(__gotots_store_3, "NodeList", NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
                const __gotots_argument_4 = child;
                const __gotots_argument_5 = IsModifierLike__from_ast;
                __gotots_logical_result_2 = isGrammarErrorElement(__gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
            }
            __gotots_logical_result_3 = (__gotots_logical_result_2);
        }
        return __gotots_logical_result_3;
    }
    if (IsMethodDeclaration__from_ast(parent)) {
        return tsonicTypeScriptRuntime.sameLocation(child, Node__from_ast.PostfixToken(parent))
            && Node__from_ast.$storageOf(((child ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindExclamationToken$constant__from_ast();
    }
    if (IsConstructorDeclaration__from_ast(parent)) {
        return tsonicTypeScriptRuntime.sameLocation(child, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsConstructorDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Type)
            || isGrammarErrorElement(Node__from_ast.TypeParameterList(parent), child, IsTypeParameterDeclaration__from_ast);
    }
    if (IsGetAccessorDeclaration__from_ast(parent)) {
        return isGrammarErrorElement(Node__from_ast.TypeParameterList(parent), child, IsTypeParameterDeclaration__from_ast);
    }
    if (IsSetAccessorDeclaration__from_ast(parent)) {
        return tsonicTypeScriptRuntime.sameLocation(child, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsSetAccessorDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type)
            || isGrammarErrorElement(Node__from_ast.TypeParameterList(parent), child, IsTypeParameterDeclaration__from_ast);
    }
    if (IsNamespaceExportDeclaration__from_ast(parent)) {
        const __gotots_store_4 = (Node__from_ast.AsNamespaceExportDeclaration(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let mods: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "ModifiersBase"));
        let __gotots_logical_result_4 = !(mods === undefined);
        if (__gotots_logical_result_4) {
            const __gotots_store_5 = ModifierList__from_ast.$storageOf(((mods ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value);
            const __gotots_argument_6 = new $ProjectedPropertyLocation(__gotots_store_5, "NodeList", NodeList__from_ast.$fromStorage, NodeList__from_ast.$storageOf);
            const __gotots_argument_7 = child;
            const __gotots_argument_8 = IsModifierLike__from_ast;
            __gotots_logical_result_4 = isGrammarErrorElement(__gotots_argument_6, __gotots_argument_7, __gotots_argument_8);
        }
        return __gotots_logical_result_4;
    }
    return false;
}
export function isGrammarErrorElement(list: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined, child: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, isPossibleElement: (($0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) => bool) | undefined): bool {
    if (list === undefined || NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
        return false;
    }
    const __gotots_callee_0 = isPossibleElement;
    const __gotots_argument_9 = child;
    if (!(__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_9)) {
        return false;
    }
    return Contains$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((list ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, child);
}
export function findImmediatelyPrecedingTokenOfKind(end: int, expectedTokenKind: Kind__from_ast, sourceFile: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let precedingToken: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindPrecedingToken__from_astnav(sourceFile, end);
    if (precedingToken === undefined || !(Node__from_ast.$storageOf(((precedingToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === expectedTokenKind) || Node__from_ast.End(precedingToken) !== end) {
        return void 0;
    }
    return precedingToken;
}
export function findOutermostNodeWithinListLevel(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let current: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = node;
    for (; !(current === undefined) && !(Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent === undefined) && Node__from_ast.End(Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent) === Node__from_ast.End(node) && !isListElement(Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, current);) {
        current = Node__from_ast.$storageOf(((current ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
    }
    return current;
}
export function isListElement(parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindClassDeclaration$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast(): {
            return TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.MemberList(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            break;
        }
        case KindModuleDeclaration$constant__from_ast(): {
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(parent);
            return !(body === undefined) && Node__from_ast.$storageOf(((body ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindModuleBlock$constant__from_ast() && TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList(body) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            break;
        }
        case KindSourceFile$constant__from_ast():
        case KindBlock$constant__from_ast():
        case KindModuleBlock$constant__from_ast(): {
            return TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            break;
        }
        case KindCatchClause$constant__from_ast(): {
            return TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc).ContainedBy(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((Node__from_ast.StatementList((Node__from_ast.AsCatchClause(parent) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Block) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
            break;
        }
    }
    return false;
}
