import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrowFunction as ArrowFunction__from_ast, ConstructorDeclaration as ConstructorDeclaration__from_ast, ExportDeclaration as ExportDeclaration__from_ast, ExportSpecifier as ExportSpecifier__from_ast, ImportDeclaration as ImportDeclaration__from_ast, ImportEqualsDeclaration as ImportEqualsDeclaration__from_ast, JsxOpeningElement as JsxOpeningElement__from_ast, JsxSelfClosingElement as JsxSelfClosingElement__from_ast, ModifiersBase$Storage as ModifiersBase__from_ast$Storage, ModuleDeclaration as ModuleDeclaration__from_ast, NamedExports as NamedExports__from_ast, NamedImports as NamedImports__from_ast, NewExpression as NewExpression__from_ast, Node$Storage as Node__from_ast$Storage, TaggedTemplateExpression as TaggedTemplateExpression__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { BodyBase as BodyBase__from_ast, CallExpression as CallExpression__from_ast, ClassDeclaration as ClassDeclaration__from_ast, ClassExpression as ClassExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, ExpressionWithTypeArguments as ExpressionWithTypeArguments__from_ast, FunctionDeclaration as FunctionDeclaration__from_ast, FunctionExpression as FunctionExpression__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, HasDecorators as HasDecorators__from_ast, HasSyntacticModifier as HasSyntacticModifier__from_ast, HeritageClause as HeritageClause__from_ast, ImportClause as ImportClause__from_ast, ImportSpecifier as ImportSpecifier__from_ast, IsAssertionExpression as IsAssertionExpression__from_ast, IsBinaryExpression as IsBinaryExpression__from_ast, IsEnumConst as IsEnumConst__from_ast, IsIdentifier as IsIdentifier__from_ast, IsInstantiatedModule as IsInstantiatedModule__from_ast, IsJSDocTypeAssertion as IsJSDocTypeAssertion__from_ast, IsParameterPropertyDeclaration as IsParameterPropertyDeclaration__from_ast, IsSatisfiesExpression as IsSatisfiesExpression__from_ast, IsStatement as IsStatement__from_ast, IsThisParameter as IsThisParameter__from_ast, KindAbstractKeyword$constant as KindAbstractKeyword$constant__from_ast, KindAnyKeyword$constant as KindAnyKeyword$constant__from_ast, KindArrayType$constant as KindArrayType$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindBooleanKeyword$constant as KindBooleanKeyword$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindClassDeclaration$constant as KindClassDeclaration$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindConstKeyword$constant as KindConstKeyword$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindDeclareKeyword$constant as KindDeclareKeyword$constant__from_ast, KindEnumDeclaration$constant as KindEnumDeclaration$constant__from_ast, KindExportDeclaration$constant as KindExportDeclaration$constant__from_ast, KindExportSpecifier$constant as KindExportSpecifier$constant__from_ast, KindExpressionWithTypeArguments$constant as KindExpressionWithTypeArguments$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindHeritageClause$constant as KindHeritageClause$constant__from_ast, KindImplementsKeyword$constant as KindImplementsKeyword$constant__from_ast, KindImportClause$constant as KindImportClause$constant__from_ast, KindImportDeclaration$constant as KindImportDeclaration$constant__from_ast, KindImportEqualsDeclaration$constant as KindImportEqualsDeclaration$constant__from_ast, KindImportSpecifier$constant as KindImportSpecifier$constant__from_ast, KindInKeyword$constant as KindInKeyword$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindInterfaceDeclaration$constant as KindInterfaceDeclaration$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindJSImportDeclaration$constant as KindJSImportDeclaration$constant__from_ast, KindJSTypeAliasDeclaration$constant as KindJSTypeAliasDeclaration$constant__from_ast, KindJsxOpeningElement$constant as KindJsxOpeningElement$constant__from_ast, KindJsxSelfClosingElement$constant as KindJsxSelfClosingElement$constant__from_ast, KindLiteralType$constant as KindLiteralType$constant__from_ast, KindMappedType$constant as KindMappedType$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindModuleDeclaration$constant as KindModuleDeclaration$constant__from_ast, KindNamedExports$constant as KindNamedExports$constant__from_ast, KindNamedImports$constant as KindNamedImports$constant__from_ast, KindNamespaceExportDeclaration$constant as KindNamespaceExportDeclaration$constant__from_ast, KindNeverKeyword$constant as KindNeverKeyword$constant__from_ast, KindNewExpression$constant as KindNewExpression$constant__from_ast, KindNonNullExpression$constant as KindNonNullExpression$constant__from_ast, KindNumberKeyword$constant as KindNumberKeyword$constant__from_ast, KindOptionalType$constant as KindOptionalType$constant__from_ast, KindOutKeyword$constant as KindOutKeyword$constant__from_ast, KindOverrideKeyword$constant as KindOverrideKeyword$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPrivateKeyword$constant as KindPrivateKeyword$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindProtectedKeyword$constant as KindProtectedKeyword$constant__from_ast, KindPublicKeyword$constant as KindPublicKeyword$constant__from_ast, KindReadonlyKeyword$constant as KindReadonlyKeyword$constant__from_ast, KindRestType$constant as KindRestType$constant__from_ast, KindSatisfiesExpression$constant as KindSatisfiesExpression$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindStringKeyword$constant as KindStringKeyword$constant__from_ast, KindSymbolKeyword$constant as KindSymbolKeyword$constant__from_ast, KindTaggedTemplateExpression$constant as KindTaggedTemplateExpression$constant__from_ast, KindThisType$constant as KindThisType$constant__from_ast, KindTupleType$constant as KindTupleType$constant__from_ast, KindTypeAliasDeclaration$constant as KindTypeAliasDeclaration$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindTypeLiteral$constant as KindTypeLiteral$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypeParameter$constant as KindTypeParameter$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, KindUnknownKeyword$constant as KindUnknownKeyword$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, KindVoidKeyword$constant as KindVoidKeyword$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, MethodDeclaration as MethodDeclaration__from_ast, ModifierFlagsAbstract$constant as ModifierFlagsAbstract$constant__from_ast, ModifierFlagsAmbient$constant as ModifierFlagsAmbient$constant__from_ast, ModifierFlagsParameterPropertyModifier$constant as ModifierFlagsParameterPropertyModifier$constant__from_ast, ModifierList as ModifierList__from_ast, ModifiersBase as ModifiersBase__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, SkipOuterExpressions as SkipOuterExpressions__from_ast, SubtreeContainsTypeScript$constant as SubtreeContainsTypeScript$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclaration as VariableDeclaration__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, TextRange as TextRange__from_core, Tristate_IsTrue as Tristate_IsTrue__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EmitContext as EmitContext__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ExtractModifiers as ExtractModifiers__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { Concat$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../../support/generics/concretizations/slices/Concat.js";
import { getInnermostModuleDeclarationFromDottedModule } from "./runtimesyntax.js";
import { GoPanic, GoRecovery } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
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
export class TypeEraserTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public parentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public currentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$tstransforms$elide(tx: TypeEraserTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_155 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        return EmitContext__from_printer.NewNotEmittedStatement(Transformer__from_transformers.EmitContext(__gotots_store_155.Transformer), (void Node__from_ast.AsNode,
            node));
    }
    static $go$private$tstransforms$popNode(tx: TypeEraserTransformer | undefined, grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): void {
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = grandparentNode;
    }
    static $go$private$tstransforms$pushNode(tx: TypeEraserTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        grandparentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode;
        (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).currentNode = node;
        return grandparentNode;
    }
    static $go$private$tstransforms$visit(tx: TypeEraserTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let __gotots_deferred_0: (($go$recovery: GoRecovery) => void) | undefined = undefined;
        let __gotots_panic_0: GoPanic | undefined = undefined;
        let __gotots_return_0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        try {
            try {
                __gotots_return_block_0: {
                    if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsTypeScript$constant__from_ast()) >>> 0 === 0) {
                        __gotots_return_0 = node;
                        break __gotots_return_block_0;
                    }
                    if (IsStatement__from_ast(node) && HasSyntacticModifier__from_ast(node, ModifierFlagsAmbient$constant__from_ast())) {
                        __gotots_return_0 = TypeEraserTransformer.$go$private$tstransforms$elide(tx, node);
                        break __gotots_return_block_0;
                    }
                    let grandparentNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = TypeEraserTransformer.$go$private$tstransforms$pushNode(tx, node);
                    const __gotots_receiver_2 = tx;
                    const __gotots_argument_2 = grandparentNode;
                    __gotots_deferred_0 = ($go$recovery: GoRecovery): void => {
                        TypeEraserTransformer.$go$private$tstransforms$popNode(__gotots_receiver_2, __gotots_argument_2);
                    };
                    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                        case KindPublicKeyword$constant__from_ast():
                        case KindPrivateKeyword$constant__from_ast():
                        case KindProtectedKeyword$constant__from_ast():
                        case KindAbstractKeyword$constant__from_ast():
                        case KindOverrideKeyword$constant__from_ast():
                        case KindConstKeyword$constant__from_ast():
                        case KindDeclareKeyword$constant__from_ast():
                        case KindReadonlyKeyword$constant__from_ast():
                        case KindArrayType$constant__from_ast():
                        case KindTupleType$constant__from_ast():
                        case KindOptionalType$constant__from_ast():
                        case KindRestType$constant__from_ast():
                        case KindTypeLiteral$constant__from_ast():
                        case KindTypePredicate$constant__from_ast():
                        case KindTypeParameter$constant__from_ast():
                        case KindAnyKeyword$constant__from_ast():
                        case KindUnknownKeyword$constant__from_ast():
                        case KindBooleanKeyword$constant__from_ast():
                        case KindStringKeyword$constant__from_ast():
                        case KindNumberKeyword$constant__from_ast():
                        case KindNeverKeyword$constant__from_ast():
                        case KindVoidKeyword$constant__from_ast():
                        case KindSymbolKeyword$constant__from_ast():
                        case KindConstructorType$constant__from_ast():
                        case KindFunctionType$constant__from_ast():
                        case KindTypeQuery$constant__from_ast():
                        case KindTypeReference$constant__from_ast():
                        case KindUnionType$constant__from_ast():
                        case KindIntersectionType$constant__from_ast():
                        case KindConditionalType$constant__from_ast():
                        case KindParenthesizedType$constant__from_ast():
                        case KindThisType$constant__from_ast():
                        case KindTypeOperator$constant__from_ast():
                        case KindIndexedAccessType$constant__from_ast():
                        case KindMappedType$constant__from_ast():
                        case KindLiteralType$constant__from_ast():
                        case KindIndexSignature$constant__from_ast(): {
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindInKeyword$constant__from_ast():
                        case KindOutKeyword$constant__from_ast(): {
                            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode === undefined || !IsBinaryExpression__from_ast((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode)) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_1 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindJSImportDeclaration$constant__from_ast(): {
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindTypeAliasDeclaration$constant__from_ast():
                        case KindJSTypeAliasDeclaration$constant__from_ast():
                        case KindInterfaceDeclaration$constant__from_ast(): {
                            __gotots_return_0 = TypeEraserTransformer.$go$private$tstransforms$elide(tx, node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindNamespaceExportDeclaration$constant__from_ast(): {
                            __gotots_return_0 = void 0;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindModuleDeclaration$constant__from_ast(): {
                            if (!IsIdentifier__from_ast(Node__from_ast.Name(node)) || !IsInstantiatedModule__from_ast(node, CompilerOptions__from_core.ShouldPreserveConstEnums((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions)) || BodyBase__from_ast.$storageOf((getInnermostModuleDeclarationFromDottedModule(Node__from_ast.AsModuleDeclaration(node)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.BodyBase).Body === undefined) {
                                __gotots_return_0 = TypeEraserTransformer.$go$private$tstransforms$elide(tx, node);
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_2 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_2.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindExpressionWithTypeArguments$constant__from_ast(): {
                            let n: tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast> | undefined = Node__from_ast.AsExpressionWithTypeArguments(node);
                            const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_4 = (Transformer__from_transformers.Factory(__gotots_store_3.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeFactory");
                            const __gotots_argument_3 = n;
                            const __gotots_store_5 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_4 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_5.Transformer), ExpressionWithTypeArguments__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ExpressionWithTypeArguments__from_ast>).value).Expression);
                            const __gotots_argument_5 = void 0;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateExpressionWithTypeArguments(__gotots_receiver_3, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindPropertyDeclaration$constant__from_ast(): {
                            if (Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExperimentalDecorators) && HasSyntacticModifier__from_ast(node, 192) && HasDecorators__from_ast(node)) {
                                let n__shadow_1: {
                                    value: PropertyDeclaration__from_ast;
                                } | undefined = Node__from_ast.AsPropertyDeclaration(node);
                                const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_7 = (Transformer__from_transformers.Factory(__gotots_store_6.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory");
                                const __gotots_argument_7 = n__shadow_1;
                                const __gotots_store_8 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_receiver_4 = Transformer__from_transformers.Visitor(__gotots_store_8.Transformer);
                                const __gotots_store_9 = (n__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_argument_6 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NamedMemberBase"));
                                const __gotots_argument_8 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_4, __gotots_argument_6);
                                const __gotots_store_10 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_argument_9 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_10.Transformer), PropertyDeclaration__from_ast.Name(n__shadow_1));
                                const __gotots_argument_10 = void 0;
                                const __gotots_argument_11 = void 0;
                                const __gotots_store_11 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_argument_12 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_11.Transformer), (n__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
                                __gotots_return_0 = NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_5, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
                                break __gotots_return_block_0;
                            }
                            if (HasSyntacticModifier__from_ast(node, 192)) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            let n: {
                                value: PropertyDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsPropertyDeclaration(node);
                            const __gotots_store_12 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_13 = (Transformer__from_transformers.Factory(__gotots_store_12.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_7 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory");
                            const __gotots_argument_14 = n;
                            const __gotots_store_14 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_6 = Transformer__from_transformers.Visitor(__gotots_store_14.Transformer);
                            const __gotots_store_15 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_13 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NamedMemberBase"));
                            const __gotots_argument_15 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_6, __gotots_argument_13);
                            const __gotots_store_16 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_16 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_16.Transformer), PropertyDeclaration__from_ast.Name(n));
                            const __gotots_argument_17 = void 0;
                            const __gotots_argument_18 = void 0;
                            const __gotots_store_17 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_19 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_17.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Initializer);
                            __gotots_return_0 = NodeFactory__from_ast.UpdatePropertyDeclaration(__gotots_receiver_7, __gotots_argument_14, __gotots_argument_15, __gotots_argument_16, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindConstructor$constant__from_ast(): {
                            let n: {
                                value: ConstructorDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsConstructorDeclaration(node);
                            if (NodeIsMissing__from_ast((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body)) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_18 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_19 = (Transformer__from_transformers.Factory(__gotots_store_18.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_8 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory");
                            const __gotots_argument_20 = n;
                            const __gotots_argument_21 = void 0;
                            const __gotots_argument_22 = void 0;
                            const __gotots_store_20 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_23 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_20.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                            const __gotots_argument_24 = void 0;
                            const __gotots_argument_25 = void 0;
                            const __gotots_store_21 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_26 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_21.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateConstructorDeclaration(__gotots_receiver_8, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24, __gotots_argument_25, __gotots_argument_26);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindMethodDeclaration$constant__from_ast(): {
                            let n: {
                                value: MethodDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsMethodDeclaration(node);
                            if (NodeIsMissing__from_ast((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body)) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_22 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_23 = (Transformer__from_transformers.Factory(__gotots_store_22.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory");
                            const __gotots_argument_28 = n;
                            const __gotots_store_24 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_9 = Transformer__from_transformers.Visitor(__gotots_store_24.Transformer);
                            const __gotots_store_25 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_27 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NamedMemberBase"));
                            const __gotots_argument_29 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_9, __gotots_argument_27);
                            const __gotots_argument_30 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
                            const __gotots_store_26 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_31 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_26.Transformer), MethodDeclaration__from_ast.Name(n));
                            const __gotots_argument_32 = void 0;
                            const __gotots_argument_33 = void 0;
                            const __gotots_store_27 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_34 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_27.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                            const __gotots_argument_35 = void 0;
                            const __gotots_argument_36 = void 0;
                            const __gotots_store_28 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_37 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_28.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateMethodDeclaration(__gotots_receiver_10, __gotots_argument_28, __gotots_argument_29, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33, __gotots_argument_34, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindGetAccessor$constant__from_ast(): {
                            let n: {
                                value: GetAccessorDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsGetAccessorDeclaration(node);
                            if (NodeIsMissing__from_ast((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body) && HasSyntacticModifier__from_ast(node, ModifierFlagsAbstract$constant__from_ast())) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_29 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_29.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body);
                            if (body === undefined) {
                                const __gotots_store_30 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_31 = (Transformer__from_transformers.Factory(__gotots_store_30.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "NodeFactory");
                                const __gotots_store_32 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_33 = (Transformer__from_transformers.Factory(__gotots_store_32.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_argument_38 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                                const __gotots_argument_39 = false;
                                body = NodeFactory__from_ast.NewBlock(__gotots_receiver_11, __gotots_argument_38, __gotots_argument_39);
                            }
                            const __gotots_store_34 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_35 = (Transformer__from_transformers.Factory(__gotots_store_34.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "NodeFactory");
                            const __gotots_argument_41 = n;
                            const __gotots_store_36 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_12 = Transformer__from_transformers.Visitor(__gotots_store_36.Transformer);
                            const __gotots_store_37: GetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
                            const __gotots_argument_40 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "NamedMemberBase"));
                            const __gotots_argument_42 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_12, __gotots_argument_40);
                            const __gotots_store_38 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_43 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_38.Transformer), GetAccessorDeclaration__from_ast.Name(n));
                            const __gotots_argument_44 = void 0;
                            const __gotots_store_39 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_45 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_39.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                            const __gotots_argument_46 = void 0;
                            const __gotots_argument_47 = void 0;
                            const __gotots_argument_48 = body;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateGetAccessorDeclaration(__gotots_receiver_13, __gotots_argument_41, __gotots_argument_42, __gotots_argument_43, __gotots_argument_44, __gotots_argument_45, __gotots_argument_46, __gotots_argument_47, __gotots_argument_48);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindSetAccessor$constant__from_ast(): {
                            let n: {
                                value: SetAccessorDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsSetAccessorDeclaration(node);
                            if (NodeIsMissing__from_ast((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body) && HasSyntacticModifier__from_ast(node, ModifierFlagsAbstract$constant__from_ast())) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_40 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_40.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).BodyBase)).Body);
                            if (body === undefined) {
                                const __gotots_store_41 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_42 = (Transformer__from_transformers.Factory(__gotots_store_41.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_receiver_14 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeFactory");
                                const __gotots_store_43 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_store_44 = (Transformer__from_transformers.Factory(__gotots_store_43.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                const __gotots_argument_49 = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory"), RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>());
                                const __gotots_argument_50 = false;
                                body = NodeFactory__from_ast.NewBlock(__gotots_receiver_14, __gotots_argument_49, __gotots_argument_50);
                            }
                            const __gotots_store_45 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_46 = (Transformer__from_transformers.Factory(__gotots_store_45.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_16 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeFactory");
                            const __gotots_argument_52 = n;
                            const __gotots_store_47 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_15 = Transformer__from_transformers.Visitor(__gotots_store_47.Transformer);
                            const __gotots_store_48: SetAccessorDeclaration__from_ast["AccessorDeclarationBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase;
                            const __gotots_argument_51 = NamedMemberBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "NamedMemberBase"));
                            const __gotots_argument_53 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_15, __gotots_argument_51);
                            const __gotots_store_49 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_54 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_49.Transformer), SetAccessorDeclaration__from_ast.Name(n));
                            const __gotots_argument_55 = void 0;
                            const __gotots_store_50 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_56 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_50.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                            const __gotots_argument_57 = void 0;
                            const __gotots_argument_58 = void 0;
                            const __gotots_argument_59 = body;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateSetAccessorDeclaration(__gotots_receiver_16, __gotots_argument_52, __gotots_argument_53, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58, __gotots_argument_59);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindVariableDeclaration$constant__from_ast(): {
                            let n: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined = Node__from_ast.AsVariableDeclaration(node);
                            const __gotots_store_51 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_52 = (Transformer__from_transformers.Factory(__gotots_store_51.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeFactory");
                            const __gotots_argument_60 = n;
                            const __gotots_store_53 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_61 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_53.Transformer), VariableDeclaration__from_ast.Name(n));
                            const __gotots_argument_62 = void 0;
                            const __gotots_argument_63 = void 0;
                            const __gotots_store_54 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_64 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_54.Transformer), VariableDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer);
                            let updated: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.UpdateVariableDeclaration(__gotots_receiver_17, __gotots_argument_60, __gotots_argument_61, __gotots_argument_62, __gotots_argument_63, __gotots_argument_64);
                            if (!(VariableDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Type === undefined)) {
                                const __gotots_store_55 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                EmitContext__from_printer.SetTypeNode(Transformer__from_transformers.EmitContext(__gotots_store_55.Transformer), VariableDeclaration__from_ast.Name(Node__from_ast.AsVariableDeclaration(updated)), VariableDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Type);
                            }
                            __gotots_return_0 = updated;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindHeritageClause$constant__from_ast(): {
                            let n: tsonicTypeScriptRuntime.Location<HeritageClause__from_ast> | undefined = Node__from_ast.AsHeritageClause(node);
                            if (HeritageClause__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token === KindImplementsKeyword$constant__from_ast()) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_56 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_57 = (Transformer__from_transformers.Factory(__gotots_store_56.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_18 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "NodeFactory");
                            const __gotots_argument_65 = n;
                            const __gotots_argument_66 = HeritageClause__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Token;
                            const __gotots_store_58 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_67 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_58.Transformer), HeritageClause__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<HeritageClause__from_ast>).value).Types);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateHeritageClause(__gotots_receiver_18, __gotots_argument_65, __gotots_argument_66, __gotots_argument_67);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindClassDeclaration$constant__from_ast(): {
                            let n: {
                                value: ClassDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsClassDeclaration(node);
                            const __gotots_store_59 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_60 = (Transformer__from_transformers.Factory(__gotots_store_59.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_20 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "NodeFactory");
                            const __gotots_argument_69 = n;
                            const __gotots_store_61 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_19 = Transformer__from_transformers.Visitor(__gotots_store_61.Transformer);
                            const __gotots_store_62: ClassDeclaration__from_ast["ClassLikeBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                            const __gotots_argument_68 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "ModifiersBase"));
                            const __gotots_argument_70 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_19, __gotots_argument_68);
                            const __gotots_store_63 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_71 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_63.Transformer), ClassDeclaration__from_ast.Name(n));
                            const __gotots_argument_72 = void 0;
                            const __gotots_store_64 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_73 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_64.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
                            const __gotots_store_65 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_74 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_65.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateClassDeclaration(__gotots_receiver_20, __gotots_argument_69, __gotots_argument_70, __gotots_argument_71, __gotots_argument_72, __gotots_argument_73, __gotots_argument_74);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindClassExpression$constant__from_ast(): {
                            let n: {
                                value: ClassExpression__from_ast;
                            } | undefined = Node__from_ast.AsClassExpression(node);
                            const __gotots_store_66 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_67 = (Transformer__from_transformers.Factory(__gotots_store_66.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_22 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "NodeFactory");
                            const __gotots_argument_76 = n;
                            const __gotots_store_68 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_21 = Transformer__from_transformers.Visitor(__gotots_store_68.Transformer);
                            const __gotots_store_69: ClassExpression__from_ast["ClassLikeBase"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase;
                            const __gotots_argument_75 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "ModifiersBase"));
                            const __gotots_argument_77 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_21, __gotots_argument_75);
                            const __gotots_store_70 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_78 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_70.Transformer), ClassExpression__from_ast.Name(n));
                            const __gotots_argument_79 = void 0;
                            const __gotots_store_71 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_80 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_71.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.HeritageClauses);
                            const __gotots_store_72 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_81 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_72.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClassLikeBase.Members);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateClassExpression(__gotots_receiver_22, __gotots_argument_76, __gotots_argument_77, __gotots_argument_78, __gotots_argument_79, __gotots_argument_80, __gotots_argument_81);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionDeclaration$constant__from_ast(): {
                            let n: tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast> | undefined = Node__from_ast.AsFunctionDeclaration(node);
                            if (NodeIsMissing__from_ast((void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body)) {
                                __gotots_return_0 = TypeEraserTransformer.$go$private$tstransforms$elide(tx, node);
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_73 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_74 = (Transformer__from_transformers.Factory(__gotots_store_73.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_24 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "NodeFactory");
                            const __gotots_argument_83 = n;
                            const __gotots_store_75 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_23 = Transformer__from_transformers.Visitor(__gotots_store_75.Transformer);
                            const __gotots_store_76 = FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value);
                            const __gotots_argument_82 = ModifiersBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_76, "ModifiersBase", ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
                            const __gotots_argument_84 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_23, __gotots_argument_82);
                            const __gotots_argument_85 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).AsteriskToken;
                            const __gotots_store_77 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_86 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_77.Transformer), FunctionDeclaration__from_ast.Name(n));
                            const __gotots_argument_87 = void 0;
                            const __gotots_store_78 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_88 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_78.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).FunctionLikeBase)).Parameters);
                            const __gotots_argument_89 = void 0;
                            const __gotots_argument_90 = void 0;
                            const __gotots_store_79 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_91 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_79.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                (void FunctionLikeWithBodyBase__from_ast.$storageOf, (void FunctionLikeWithBodyBase__from_ast.$fromStorage,
                                    FunctionDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionDeclaration__from_ast>).value).FunctionLikeWithBodyBase)).BodyBase)).Body);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateFunctionDeclaration(__gotots_receiver_24, __gotots_argument_83, __gotots_argument_84, __gotots_argument_85, __gotots_argument_86, __gotots_argument_87, __gotots_argument_88, __gotots_argument_89, __gotots_argument_90, __gotots_argument_91);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindFunctionExpression$constant__from_ast(): {
                            let n: {
                                value: FunctionExpression__from_ast;
                            } | undefined = Node__from_ast.AsFunctionExpression(node);
                            const __gotots_store_80 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_81 = (Transformer__from_transformers.Factory(__gotots_store_80.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_26 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_81, "NodeFactory");
                            const __gotots_argument_93 = n;
                            const __gotots_store_82 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_25 = Transformer__from_transformers.Visitor(__gotots_store_82.Transformer);
                            const __gotots_store_83 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_92 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_83, "ModifiersBase"));
                            const __gotots_argument_94 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_25, __gotots_argument_92);
                            const __gotots_argument_95 = (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).AsteriskToken;
                            const __gotots_store_84 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_96 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_84.Transformer), FunctionExpression__from_ast.Name(n));
                            const __gotots_argument_97 = void 0;
                            const __gotots_store_85 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_98 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_85.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                            const __gotots_argument_99 = void 0;
                            const __gotots_argument_100 = void 0;
                            const __gotots_store_86 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_101 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_86.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateFunctionExpression(__gotots_receiver_26, __gotots_argument_93, __gotots_argument_94, __gotots_argument_95, __gotots_argument_96, __gotots_argument_97, __gotots_argument_98, __gotots_argument_99, __gotots_argument_100, __gotots_argument_101);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindArrowFunction$constant__from_ast(): {
                            let n: {
                                value: ArrowFunction__from_ast;
                            } | undefined = Node__from_ast.AsArrowFunction(node);
                            const __gotots_store_87 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_88 = (Transformer__from_transformers.Factory(__gotots_store_87.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_28 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_88, "NodeFactory");
                            const __gotots_argument_103 = n;
                            const __gotots_store_89 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_receiver_27 = Transformer__from_transformers.Visitor(__gotots_store_89.Transformer);
                            const __gotots_store_90 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_102 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_90, "ModifiersBase"));
                            const __gotots_argument_104 = NodeVisitor__from_ast.VisitModifiers(__gotots_receiver_27, __gotots_argument_102);
                            const __gotots_argument_105 = void 0;
                            const __gotots_store_91 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_106 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_91.Transformer), (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters);
                            const __gotots_argument_107 = void 0;
                            const __gotots_argument_108 = void 0;
                            const __gotots_argument_109: ArrowFunction__from_ast["EqualsGreaterThanToken"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.EqualsGreaterThanToken;
                            const __gotots_store_92 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_110 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_92.Transformer), (void BodyBase__from_ast.$storageOf, (void BodyBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).BodyBase)).Body);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateArrowFunction(__gotots_receiver_28, __gotots_argument_103, __gotots_argument_104, __gotots_argument_105, __gotots_argument_106, __gotots_argument_107, __gotots_argument_108, __gotots_argument_109, __gotots_argument_110);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindParameter$constant__from_ast(): {
                            if (IsThisParameter__from_ast(node)) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            let n: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(node);
                            let modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined = void 0;
                            if (IsParameterPropertyDeclaration__from_ast(node, (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).parentNode)) {
                                const __gotots_store_93 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_argument_111 = Transformer__from_transformers.EmitContext(__gotots_store_93.Transformer);
                                const __gotots_store_94 = ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value);
                                const __gotots_argument_112 = ModifiersBase__from_ast.Modifiers(new $ProjectedPropertyLocation(__gotots_store_94, "ModifiersBase", ModifiersBase__from_ast.$fromStorage, ModifiersBase__from_ast.$storageOf));
                                const __gotots_argument_113 = ModifierFlagsParameterPropertyModifier$constant__from_ast();
                                modifiers = ExtractModifiers__from_transformers(__gotots_argument_111, __gotots_argument_112, __gotots_argument_113);
                            }
                            if (HasDecorators__from_ast(node)) {
                                let decorators = Node__from_ast.Decorators(node);
                                const __gotots_store_95 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                const __gotots_results_0 = NodeVisitor__from_ast.VisitSlice(Transformer__from_transformers.Visitor(__gotots_store_95.Transformer), decorators);
                                let visited = __gotots_results_0[0];
                                if (modifiers === undefined) {
                                    const __gotots_store_96 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_97 = (Transformer__from_transformers.Factory(__gotots_store_96.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    modifiers = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_97, "NodeFactory"), visited);
                                }
                                else {
                                    const __gotots_store_98 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_99 = (Transformer__from_transformers.Factory(__gotots_store_98.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    modifiers = NodeFactory__from_ast.NewModifierList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_99, "NodeFactory"), Concat$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(RuntimeSlice.literal<RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>>([(void NodeList__from_ast.$storageOf, (void NodeList__from_ast.$fromStorage,
                                            ModifierList__from_ast.$storageOf(((modifiers ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ModifierList__from_ast>).value).NodeList)).Nodes, visited])));
                                }
                            }
                            const __gotots_store_100 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_101 = (Transformer__from_transformers.Factory(__gotots_store_100.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_29 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_101, "NodeFactory");
                            const __gotots_argument_114 = n;
                            const __gotots_argument_115 = modifiers;
                            const __gotots_argument_116 = ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken;
                            const __gotots_store_102 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_117 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_102.Transformer), ParameterDeclaration__from_ast.Name(n));
                            const __gotots_argument_118 = void 0;
                            const __gotots_argument_119 = void 0;
                            const __gotots_store_103 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_120 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_103.Transformer), ParameterDeclaration__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateParameterDeclaration(__gotots_receiver_29, __gotots_argument_114, __gotots_argument_115, __gotots_argument_116, __gotots_argument_117, __gotots_argument_118, __gotots_argument_119, __gotots_argument_120);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindCallExpression$constant__from_ast(): {
                            let n: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined = Node__from_ast.AsCallExpression(node);
                            const __gotots_store_104 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_105 = (Transformer__from_transformers.Factory(__gotots_store_104.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_30 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_105, "NodeFactory");
                            const __gotots_argument_121 = n;
                            const __gotots_store_106 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_122 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_106.Transformer), CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
                            const __gotots_argument_123 = CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).QuestionDotToken;
                            const __gotots_argument_124 = void 0;
                            const __gotots_store_107 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_125 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_107.Transformer), CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments);
                            const __gotots_argument_126 = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                                        CallExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateCallExpression(__gotots_receiver_30, __gotots_argument_121, __gotots_argument_122, __gotots_argument_123, __gotots_argument_124, __gotots_argument_125, __gotots_argument_126);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindNewExpression$constant__from_ast(): {
                            let n: {
                                value: NewExpression__from_ast;
                            } | undefined = Node__from_ast.AsNewExpression(node);
                            const __gotots_store_108 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_109 = (Transformer__from_transformers.Factory(__gotots_store_108.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_31 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_109, "NodeFactory");
                            const __gotots_argument_127 = n;
                            const __gotots_store_110 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_128 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_110.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                            const __gotots_argument_129 = void 0;
                            const __gotots_store_111 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_130 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_111.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Arguments);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateNewExpression(__gotots_receiver_31, __gotots_argument_127, __gotots_argument_128, __gotots_argument_129, __gotots_argument_130);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindTaggedTemplateExpression$constant__from_ast(): {
                            let n: {
                                value: TaggedTemplateExpression__from_ast;
                            } | undefined = Node__from_ast.AsTaggedTemplateExpression(node);
                            const __gotots_store_112 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_113 = (Transformer__from_transformers.Factory(__gotots_store_112.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_32 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_113, "NodeFactory");
                            const __gotots_argument_131 = n;
                            const __gotots_store_114 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_132 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_114.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Tag);
                            const __gotots_argument_133: TaggedTemplateExpression__from_ast["QuestionDotToken"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.QuestionDotToken;
                            const __gotots_argument_134 = void 0;
                            const __gotots_store_115 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_135 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_115.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Template);
                            const __gotots_argument_136 = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
                                (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                                        (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                                            (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                                                (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                                    (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                                        MemberExpressionBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.MemberExpressionBase).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateTaggedTemplateExpression(__gotots_receiver_32, __gotots_argument_131, __gotots_argument_132, __gotots_argument_133, __gotots_argument_134, __gotots_argument_135, __gotots_argument_136);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindNonNullExpression$constant__from_ast():
                        case KindTypeAssertionExpression$constant__from_ast():
                        case KindAsExpression$constant__from_ast():
                        case KindSatisfiesExpression$constant__from_ast(): {
                            const __gotots_store_116 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_117 = (Transformer__from_transformers.Factory(__gotots_store_116.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_33 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_117, "NodeFactory");
                            const __gotots_store_118 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_137 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_118.Transformer), Node__from_ast.Expression(node));
                            let partial: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPartiallyEmittedExpression(__gotots_receiver_33, __gotots_argument_137);
                            const __gotots_store_119 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_119.Transformer), partial, node);
                            Node__from_ast.$storageOf(((partial ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                            __gotots_return_0 = partial;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindParenthesizedExpression$constant__from_ast(): {
                            if (!IsJSDocTypeAssertion__from_ast(node)) {
                                let n: tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined = Node__from_ast.AsParenthesizedExpression(node);
                                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipOuterExpressions__from_ast(ParenthesizedExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression, -55);
                                if (IsAssertionExpression__from_ast(expression) || IsSatisfiesExpression__from_ast(expression)) {
                                    const __gotots_store_120 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_store_121 = (Transformer__from_transformers.Factory(__gotots_store_120.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                                    const __gotots_receiver_34 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_121, "NodeFactory");
                                    const __gotots_store_122 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    const __gotots_argument_138 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_122.Transformer), ParenthesizedExpression__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
                                    let partial: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewPartiallyEmittedExpression(__gotots_receiver_34, __gotots_argument_138);
                                    const __gotots_store_123 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                    EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(__gotots_store_123.Transformer), partial, node);
                                    Node__from_ast.$storageOf(((partial ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
                                    __gotots_return_0 = partial;
                                    break __gotots_return_block_0;
                                }
                            }
                            const __gotots_store_124 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_124.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindJsxSelfClosingElement$constant__from_ast(): {
                            let n: {
                                value: JsxSelfClosingElement__from_ast;
                            } | undefined = Node__from_ast.AsJsxSelfClosingElement(node);
                            const __gotots_store_125 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_126 = (Transformer__from_transformers.Factory(__gotots_store_125.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_35 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_126, "NodeFactory");
                            const __gotots_argument_139 = n;
                            const __gotots_store_127 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_140 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_127.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName);
                            const __gotots_argument_141 = void 0;
                            const __gotots_store_128 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_142 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_128.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateJsxSelfClosingElement(__gotots_receiver_35, __gotots_argument_139, __gotots_argument_140, __gotots_argument_141, __gotots_argument_142);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindJsxOpeningElement$constant__from_ast(): {
                            let n: {
                                value: JsxOpeningElement__from_ast;
                            } | undefined = Node__from_ast.AsJsxOpeningElement(node);
                            const __gotots_store_129 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_130 = (Transformer__from_transformers.Factory(__gotots_store_129.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_36 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_130, "NodeFactory");
                            const __gotots_argument_143 = n;
                            const __gotots_store_131 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_144 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_131.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.TagName);
                            const __gotots_argument_145 = void 0;
                            const __gotots_store_132 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_146 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_132.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateJsxOpeningElement(__gotots_receiver_36, __gotots_argument_143, __gotots_argument_144, __gotots_argument_145, __gotots_argument_146);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindImportEqualsDeclaration$constant__from_ast(): {
                            let n: {
                                value: ImportEqualsDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsImportEqualsDeclaration(node);
                            if ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_133 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_133.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindImportDeclaration$constant__from_ast(): {
                            let n: {
                                value: ImportDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsImportDeclaration(node);
                            if ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause === undefined) {
                                __gotots_return_0 = node;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_134 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let importClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_134.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ImportClause);
                            if (importClause === undefined) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_135 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_136 = (Transformer__from_transformers.Factory(__gotots_store_135.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_37 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_136, "NodeFactory");
                            const __gotots_argument_147 = n;
                            const __gotots_store_137 = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_argument_148 = ModifiersBase__from_ast.Modifiers(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_137, "ModifiersBase"));
                            const __gotots_argument_149 = importClause;
                            const __gotots_argument_150: ImportDeclaration__from_ast["ModuleSpecifier"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier;
                            const __gotots_argument_151: ImportDeclaration__from_ast["Attributes"] = (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateImportDeclaration(__gotots_receiver_37, __gotots_argument_147, __gotots_argument_148, __gotots_argument_149, __gotots_argument_150, __gotots_argument_151);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindImportClause$constant__from_ast(): {
                            let n: {
                                value: ImportClause__from_ast;
                            } | undefined = Node__from_ast.AsImportClause(node);
                            const __gotots_store_138 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                                NodeBase__from_ast.$storageOf((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase).NodeDefault));
                            if (Node__from_ast.IsTypeOnly(new $ProjectedPropertyLocation(__gotots_store_138, "Node", Node__from_ast.$fromStorage, Node__from_ast.$storageOf))) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            let name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ImportClause__from_ast.Name(n);
                            const __gotots_store_139 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let namedBindings: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_139.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedBindings);
                            if (name === undefined && namedBindings === undefined) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_140 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_141 = (Transformer__from_transformers.Factory(__gotots_store_140.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateImportClause(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_141, "NodeFactory"), n, (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PhaseModifier, name, namedBindings);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindNamedImports$constant__from_ast(): {
                            let n: {
                                value: NamedImports__from_ast;
                            } | undefined = Node__from_ast.AsNamedImports(node);
                            if (NodeList__from_ast.$storageOf((((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
                                __gotots_return_0 = node;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_142 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let elements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_142.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements);
                            if (!Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax) && NodeList__from_ast.$storageOf(((elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_143 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_144 = (Transformer__from_transformers.Factory(__gotots_store_143.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateNamedImports(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_144, "NodeFactory"), n, elements);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindImportSpecifier$constant__from_ast(): {
                            let n: tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast> | undefined = Node__from_ast.AsImportSpecifier(node);
                            if (ImportSpecifier__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ImportSpecifier__from_ast>).value).IsTypeOnly) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = node;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindExportDeclaration$constant__from_ast(): {
                            let n: {
                                value: ExportDeclaration__from_ast;
                            } | undefined = Node__from_ast.AsExportDeclaration(node);
                            if ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            let exportClause: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                            if (!((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause === undefined)) {
                                const __gotots_store_145 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                                exportClause = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_145.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ExportClause);
                                if (exportClause === undefined) {
                                    __gotots_return_0 = void 0;
                                    break __gotots_return_block_0;
                                }
                            }
                            const __gotots_store_146 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_147 = (Transformer__from_transformers.Factory(__gotots_store_146.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            const __gotots_receiver_38 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_147, "NodeFactory");
                            const __gotots_argument_152 = n;
                            const __gotots_argument_153 = void 0;
                            const __gotots_argument_154 = false;
                            const __gotots_argument_155 = exportClause;
                            const __gotots_store_148 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_156 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_148.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ModuleSpecifier);
                            const __gotots_store_149 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_157 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_149.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Attributes);
                            __gotots_return_0 = NodeFactory__from_ast.UpdateExportDeclaration(__gotots_receiver_38, __gotots_argument_152, __gotots_argument_153, __gotots_argument_154, __gotots_argument_155, __gotots_argument_156, __gotots_argument_157);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindNamedExports$constant__from_ast(): {
                            let n: {
                                value: NamedExports__from_ast;
                            } | undefined = Node__from_ast.AsNamedExports(node);
                            if (NodeList__from_ast.$storageOf((((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
                                __gotots_return_0 = node;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_150 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            let elements: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(__gotots_store_150.Transformer), (n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements);
                            if (!Tristate_IsTrue__from_core(((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VerbatimModuleSyntax) && NodeList__from_ast.$storageOf(((elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_151 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_store_152 = (Transformer__from_transformers.Factory(__gotots_store_151.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                            __gotots_return_0 = NodeFactory__from_ast.UpdateNamedExports(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_152, "NodeFactory"), n, elements);
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindExportSpecifier$constant__from_ast(): {
                            let n: {
                                value: ExportSpecifier__from_ast;
                            } | undefined = Node__from_ast.AsExportSpecifier(node);
                            if ((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.IsTypeOnly) {
                                __gotots_return_0 = void 0;
                                break __gotots_return_block_0;
                            }
                            __gotots_return_0 = node;
                            break __gotots_return_block_0;
                            break;
                        }
                        case KindEnumDeclaration$constant__from_ast(): {
                            if (IsEnumConst__from_ast(node)) {
                                __gotots_return_0 = node;
                                break __gotots_return_block_0;
                            }
                            const __gotots_store_153 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_153.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                        default: {
                            const __gotots_store_154 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            __gotots_return_0 = NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_154.Transformer), node);
                            break __gotots_return_block_0;
                            break;
                        }
                    }
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
}
export function NewTypeEraserTransformer(opt: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions;
    let emitContext: {
        value: EmitContext__from_printer;
    } | undefined = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    let tx: TypeEraserTransformer | undefined = new TypeEraserTransformer(Transformer__from_transformers.$zero(), compilerOptions, void 0, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return TypeEraserTransformer.$go$private$tstransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = emitContext;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
