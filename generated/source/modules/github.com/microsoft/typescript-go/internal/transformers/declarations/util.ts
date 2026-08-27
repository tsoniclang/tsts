import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModifierFlags as ModifierFlags__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { EmitResolver as EmitResolver__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { DeclarationEmitHost } from "./transform.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { BodyBase as BodyBase__from_ast, DeclarationBase as DeclarationBase__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetClassExtendsHeritageElement as GetClassExtendsHeritageElement__from_ast, GetCombinedModifierFlags as GetCombinedModifierFlags__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, IsAmbientModule as IsAmbientModule__from_ast, IsAnyImportOrReExport as IsAnyImportOrReExport__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsBindingElement as IsBindingElement__from_ast, IsBindingPattern as IsBindingPattern__from_ast, IsCallExpression as IsCallExpression__from_ast, IsCallSignatureDeclaration as IsCallSignatureDeclaration__from_ast, IsClassDeclaration as IsClassDeclaration__from_ast, IsConstructSignatureDeclaration as IsConstructSignatureDeclaration__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsExportAssignment as IsExportAssignment__from_ast, IsExportDeclaration as IsExportDeclaration__from_ast, IsExpressionWithTypeArguments as IsExpressionWithTypeArguments__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsImportEqualsDeclaration as IsImportEqualsDeclaration__from_ast, IsIndexSignatureDeclaration as IsIndexSignatureDeclaration__from_ast, IsInterfaceDeclaration as IsInterfaceDeclaration__from_ast, IsJSTypeAliasDeclaration as IsJSTypeAliasDeclaration__from_ast, IsMappedTypeNode as IsMappedTypeNode__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsMethodSignatureDeclaration as IsMethodSignatureDeclaration__from_ast, IsModuleDeclaration as IsModuleDeclaration__from_ast, IsOmittedExpression as IsOmittedExpression__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsPropertySignatureDeclaration as IsPropertySignatureDeclaration__from_ast, IsSetAccessorDeclaration as IsSetAccessorDeclaration__from_ast, IsSourceFile as IsSourceFile__from_ast, IsTypeAliasDeclaration as IsTypeAliasDeclaration__from_ast, IsTypeParameterDeclaration as IsTypeParameterDeclaration__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassStaticBlockDeclaration$constant as KindClassStaticBlockDeclaration$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, ModifierFlagsAmbient$constant as ModifierFlagsAmbient$constant__from_ast, ModifierFlagsDefault$constant as ModifierFlagsDefault$constant__from_ast, ModifierFlagsExport$constant as ModifierFlagsExport$constant__from_ast, ModifierFlagsPrivate$constant as ModifierFlagsPrivate$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, Symbol as Symbol__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { EmitContext as EmitContext__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Every$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Every.js";
import { Some$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { goInterfaceNonNil } from "@gotots/runtime/interface.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function needsScopeMarker(result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !IsAnyImportOrReExport__from_ast(result) && !IsExportAssignment__from_ast(result) && !HasSyntacticModifier__from_ast(result, ModifierFlagsExport$constant__from_ast()) && !IsAmbientModule__from_ast(result);
}
export function canHaveLiteralInitializer(host: DeclarationEmitHost | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindPropertyDeclaration$constant__from_ast():
        case KindPropertySignature$constant__from_ast(): {
            const __gotots_receiver_3 = host;
            const __gotots_argument_4 = node;
            const __gotots_argument_5 = ModifierFlagsPrivate$constant__from_ast();
            return goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_3).GetEffectiveDeclarationFlags(__gotots_argument_4, __gotots_argument_5) === 0;
            break;
        }
        case KindParameter$constant__from_ast():
        case KindVariableDeclaration$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function canProduceDiagnostics(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsVariableDeclaration__from_ast(node) || IsPropertyDeclaration__from_ast(node) || IsPropertySignatureDeclaration__from_ast(node) || IsBindingElement__from_ast(node) || IsSetAccessorDeclaration__from_ast(node) || IsGetAccessorDeclaration__from_ast(node) || IsConstructSignatureDeclaration__from_ast(node) || IsCallSignatureDeclaration__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsMethodSignatureDeclaration__from_ast(node) || IsFunctionDeclaration__from_ast(node) || IsParameterDeclaration__from_ast(node) || IsTypeParameterDeclaration__from_ast(node) || IsExpressionWithTypeArguments__from_ast(node) || IsImportEqualsDeclaration__from_ast(node) || IsTypeAliasDeclaration__from_ast(node) || IsJSTypeAliasDeclaration__from_ast(node) || IsConstructorDeclaration__from_ast(node) || IsIndexSignatureDeclaration__from_ast(node) || IsPropertyAccessExpression__from_ast(node) || IsElementAccessExpression__from_ast(node) || IsBinaryExpression__from_ast(node) || IsCallExpression__from_ast(node);
}
export function isDeclarationAndNotVisible(emitContext: {
    value: EmitContext__from_printer;
} | undefined, resolver: EmitResolver__from_printer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    node = EmitContext__from_printer.ParseNode(emitContext, node);
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindFunctionDeclaration$constant__from_ast():
        case KindModuleDeclaration$constant__from_ast():
        case KindInterfaceDeclaration$constant__from_ast():
        case KindClassDeclaration$constant__from_ast():
        case KindTypeAliasDeclaration$constant__from_ast():
        case KindJSTypeAliasDeclaration$constant__from_ast():
        case KindEnumDeclaration$constant__from_ast(): {
            const __gotots_receiver_0 = resolver;
            const __gotots_argument_0 = node;
            return !goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_0).IsDeclarationVisible(__gotots_argument_0);
            break;
        }
        case KindVariableDeclaration$constant__from_ast(): {
            return !getBindingNameVisible(resolver, node);
            break;
        }
        case KindImportEqualsDeclaration$constant__from_ast():
        case KindImportDeclaration$constant__from_ast():
        case KindJSImportDeclaration$constant__from_ast():
        case KindExportDeclaration$constant__from_ast():
        case KindExportAssignment$constant__from_ast(): {
            return false;
            break;
        }
        case KindClassStaticBlockDeclaration$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function getBindingNameVisible(resolver: EmitResolver__from_printer | undefined, elem: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (IsOmittedExpression__from_ast(elem)) {
        return false;
    }
    if (Node__from_ast.Name(elem) === undefined) {
        return false;
    }
    if (IsBindingPattern__from_ast(Node__from_ast.Name(elem))) {
        const __gotots_range_0 = Node__from_ast.Elements(Node__from_ast.Name(elem));
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let elem__shadow_1: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            if (getBindingNameVisible(resolver, elem__shadow_1)) {
                return true;
            }
        }
        return false;
    }
    else {
        const __gotots_receiver_1 = resolver;
        const __gotots_argument_1 = elem;
        return goInterfaceNonNil<EmitResolver__from_printer>(__gotots_receiver_1).IsDeclarationVisible(__gotots_argument_1);
    }
}
export function isEnclosingDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsSourceFile__from_ast(node) || IsTypeAliasDeclaration__from_ast(node) || IsJSTypeAliasDeclaration__from_ast(node) || IsModuleDeclaration__from_ast(node) || IsClassDeclaration__from_ast(node) || IsInterfaceDeclaration__from_ast(node) || IsFunctionLike__from_ast(node) || IsIndexSignatureDeclaration__from_ast(node) || IsMappedTypeNode__from_ast(node);
}
export function isAlwaysType(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindInterfaceDeclaration$constant__from_ast()) {
        return true;
    }
    return false;
}
export function maskModifierFlags(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, modifierMask: ModifierFlags__from_ast, modifierAdditions: ModifierFlags__from_ast): ModifierFlags__from_ast {
    let flags = (((GetCombinedModifierFlags__from_ast(node) & modifierMask) >>> 0) | modifierAdditions) >>> 0;
    if (!((flags & ModifierFlagsDefault$constant__from_ast()) >>> 0 === 0) && ((flags & ModifierFlagsExport$constant__from_ast()) >>> 0 === 0)) {
        flags = (flags ^ 32) >>> 0;
    }
    if (!((flags & ModifierFlagsDefault$constant__from_ast()) >>> 0 === 0) && !((flags & ModifierFlagsAmbient$constant__from_ast()) >>> 0 === 0)) {
        flags = (flags ^ 128) >>> 0;
    }
    return flags;
}
export function unwrapParenthesizedExpression(o: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    for (; Node__from_ast.$storageOf(((o ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParenthesizedExpression$constant__from_ast();) {
        o = Node__from_ast.Expression(o);
    }
    return o;
}
export function isPrivateMethodTypeParameter(host: DeclarationEmitHost | undefined, node: tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined): bool {
    const __gotots_store_0 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(TypeParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).NodeBase));
    let __gotots_logical_result_0 = Node__from_ast.$storageOf(((Node__from_ast.$storageOf(((NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
        return NodeDefault__from_ast.$fromStorage($go$storage);
    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
        return NodeDefault__from_ast.$storageOf($go$value);
    })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindMethodDeclaration$constant__from_ast();
    if (__gotots_logical_result_0) {
        const __gotots_receiver_2 = host;
        const __gotots_store_1 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(TypeParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_2 = Node__from_ast.$storageOf(((NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent;
        const __gotots_argument_3 = ModifierFlagsPrivate$constant__from_ast();
        __gotots_logical_result_0 = !(goInterfaceNonNil<DeclarationEmitHost>(__gotots_receiver_2).GetEffectiveDeclarationFlags(__gotots_argument_2, __gotots_argument_3) === 0);
    }
    return __gotots_logical_result_0;
}
export function shouldEmitFunctionProperties(input: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined): bool {
    if (!(BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body === undefined)) {
        return true;
    }
    return !Every$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf(DeclarationBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((input ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).DeclarationBase)).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, (decl: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return !IsFunctionDeclaration__from_ast(decl) || BodyBase__from_ast.$storageOf(BodyBase__from_ast.$fromStorage(FunctionLikeWithBodyBase__from_ast.$storageOf(FunctionLikeWithBodyBase__from_ast.$fromStorage(FunctionDeclaration__from_ast.$storageOf(((Node__from_ast.AsFunctionDeclaration(decl) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body === undefined;
    });
}
export function getEffectiveBaseTypeNode(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
    let baseType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = GetClassExtendsHeritageElement__from_ast(node);
    return baseType;
}
export function isScopeMarker(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsExportAssignment__from_ast(node) || IsExportDeclaration__from_ast(node);
}
export function hasScopeMarker(statements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): bool {
    if (statements === undefined) {
        return false;
    }
    return Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf(((statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, isScopeMarker);
}
