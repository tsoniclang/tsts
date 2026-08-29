import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ArrayLiteralExpression as ArrayLiteralExpression__from_ast, AsExpression as AsExpression__from_ast, ExportAssignment as ExportAssignment__from_ast, GetAccessorDeclaration as GetAccessorDeclaration__from_ast, MethodDeclaration as MethodDeclaration__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, ObjectLiteralExpression as ObjectLiteralExpression__from_ast, PropertyDeclaration as PropertyDeclaration__from_ast, SetAccessorDeclaration as SetAccessorDeclaration__from_ast, TypeAssertion as TypeAssertion__from_ast, TypeParameterDeclaration as TypeParameterDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../support/interface-contracts.js";
import type { PseudoObjectElement, PseudoParameter, PseudoTypeInferred } from "./type.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { AllAccessorDeclarations as AllAccessorDeclarations__from_ast, DeclarationBase as DeclarationBase__from_ast, ExpressionBase as ExpressionBase__from_ast, ForEachReturnStatement as ForEachReturnStatement__from_ast, FunctionFlagsAsyncGenerator$constant as FunctionFlagsAsyncGenerator$constant__from_ast, FunctionLikeBase as FunctionLikeBase__from_ast, FunctionLikeWithBodyBase as FunctionLikeWithBodyBase__from_ast, GetAllAccessorDeclarationsForDeclaration as GetAllAccessorDeclarationsForDeclaration__from_ast, GetAssignmentDeclarationKind as GetAssignmentDeclarationKind__from_ast, GetFunctionFlags as GetFunctionFlags__from_ast, HasModifier as HasModifier__from_ast, Identifier as Identifier__from_ast, IsBlock as IsBlock__from_ast, IsConstTypeReference as IsConstTypeReference__from_ast, IsFunctionLike as IsFunctionLike__from_ast, IsGetAccessorDeclaration as IsGetAccessorDeclaration__from_ast, IsIdentifier as IsIdentifier__from_ast, IsParameterDeclaration as IsParameterDeclaration__from_ast, IsPrimitiveLiteralValue as IsPrimitiveLiteralValue__from_ast, IsPropertyDeclaration as IsPropertyDeclaration__from_ast, IsTemplateExpression as IsTemplateExpression__from_ast, IsTypePredicateNode as IsTypePredicateNode__from_ast, IsVarConst as IsVarConst__from_ast, IsVariableDeclaration as IsVariableDeclaration__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindArrowFunction$constant as KindArrowFunction$constant__from_ast, KindAsExpression$constant as KindAsExpression$constant__from_ast, KindBigIntLiteral$constant as KindBigIntLiteral$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindBindingElement$constant as KindBindingElement$constant__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindCallSignature$constant as KindCallSignature$constant__from_ast, KindClassExpression$constant as KindClassExpression$constant__from_ast, KindComputedPropertyName$constant as KindComputedPropertyName$constant__from_ast, KindConstructSignature$constant as KindConstructSignature$constant__from_ast, KindConstructor$constant as KindConstructor$constant__from_ast, KindConstructorType$constant as KindConstructorType$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindExportAssignment$constant as KindExportAssignment$constant__from_ast, KindFalseKeyword$constant as KindFalseKeyword$constant__from_ast, KindFunctionDeclaration$constant as KindFunctionDeclaration$constant__from_ast, KindFunctionExpression$constant as KindFunctionExpression$constant__from_ast, KindFunctionType$constant as KindFunctionType$constant__from_ast, KindGetAccessor$constant as KindGetAccessor$constant__from_ast, KindIdentifier$constant as KindIdentifier$constant__from_ast, KindIndexSignature$constant as KindIndexSignature$constant__from_ast, KindJSDocPropertyTag$constant as KindJSDocPropertyTag$constant__from_ast, KindJSDocSignature$constant as KindJSDocSignature$constant__from_ast, KindMethodDeclaration$constant as KindMethodDeclaration$constant__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindNoSubstitutionTemplateLiteral$constant as KindNoSubstitutionTemplateLiteral$constant__from_ast, KindNullKeyword$constant as KindNullKeyword$constant__from_ast, KindNumericLiteral$constant as KindNumericLiteral$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOmittedExpression$constant as KindOmittedExpression$constant__from_ast, KindParameter$constant as KindParameter$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPlusToken$constant as KindPlusToken$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPrivateIdentifier$constant as KindPrivateIdentifier$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindPropertyDeclaration$constant as KindPropertyDeclaration$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindSetAccessor$constant as KindSetAccessor$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSpreadAssignment$constant as KindSpreadAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindStringLiteral$constant as KindStringLiteral$constant__from_ast, KindTemplateExpression$constant as KindTemplateExpression$constant__from_ast, KindTrueKeyword$constant as KindTrueKeyword$constant__from_ast, KindTypeAssertionExpression$constant as KindTypeAssertionExpression$constant__from_ast, KindVariableDeclaration$constant as KindVariableDeclaration$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, ModifierFlagsReadonly$constant as ModifierFlagsReadonly$constant__from_ast, NamedMemberBase as NamedMemberBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFlagsThisNodeHasError$constant as NodeFlagsThisNodeHasError$constant__from_ast, NodeIsMissing as NodeIsMissing__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, PrefixUnaryExpression as PrefixUnaryExpression__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyAssignment as PropertyAssignment__from_ast, ReturnStatement as ReturnStatement__from_ast, Symbol as Symbol__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast, VariableDeclaration as VariableDeclaration__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { FailBadSyntaxKind as FailBadSyntaxKind__from_debug } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pseudochecker/state.js";
import { CountWhere$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/CountWhere.js";
import { Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node } from "../../../../../../support/generics/concretizations/slices/Index.js";
import { $goInterfaceAdapter$string, $goInterfaceAdapter$PointerTo_Named_ast$Node as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { IsInConstContext, addUndefinedIfDefinitelyRequired, isContextuallyTyped, isValueSignatureDeclaration, lastRequiredParamIndex } from "./lookup.js";
import { NewPseudoGetAccessor, NewPseudoObjectMethod, NewPseudoParameter, NewPseudoPropertyAssignment, NewPseudoSetAccessor, NewPseudoTypeBigIntLiteral, NewPseudoTypeDirect, NewPseudoTypeInferred, NewPseudoTypeInferredWithErrors, NewPseudoTypeMaybeConstLocation, NewPseudoTypeNoResult, NewPseudoTypeNumericLiteral, NewPseudoTypeObjectLiteral, NewPseudoTypeSingleCallSignature, NewPseudoTypeStringLiteral, NewPseudoTypeTuple, PseudoType, PseudoTypeKindDirect$constant, PseudoTypeKindInferred$constant, PseudoTypeKindNoResult$constant } from "./type.js";
import { GoMapHash } from "@gotots/runtime/map.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class PseudoChecker {
    declare private readonly $goType: void;
    public constructor(public strictNullChecks: bool, public exactOptionalPropertyTypes: bool) {
    }
    static $copy($source: PseudoChecker): PseudoChecker {
        return new PseudoChecker($source.strictNullChecks, $source.exactOptionalPropertyTypes);
    }
    static $equal($left: PseudoChecker, $right: PseudoChecker): bool {
        return $left.strictNullChecks === $right.strictNullChecks && $left.exactOptionalPropertyTypes === $right.exactOptionalPropertyTypes;
    }
    static $hash($source: PseudoChecker): number {
        let $hash = 2166136261;
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.strictNullChecks));
        $hash = GoMapHash.mix($hash, GoMapHash.boolean($source.exactOptionalPropertyTypes));
        return $hash;
    }
    declare private readonly then?: never;
    static GetReturnTypeOfSignature(ch: {
        value: PseudoChecker;
    } | undefined, signatureNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        switch (Node__from_ast.$storageOf(((signatureNode ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindGetAccessor$constant__from_ast(): {
                return PseudoChecker.GetTypeOfAccessor(ch, signatureNode);
                break;
            }
            case KindMethodDeclaration$constant__from_ast():
            case KindFunctionDeclaration$constant__from_ast():
            case KindConstructor$constant__from_ast():
            case KindMethodSignature$constant__from_ast():
            case KindCallSignature$constant__from_ast():
            case KindConstructSignature$constant__from_ast():
            case KindSetAccessor$constant__from_ast():
            case KindIndexSignature$constant__from_ast():
            case KindFunctionType$constant__from_ast():
            case KindConstructorType$constant__from_ast():
            case KindFunctionExpression$constant__from_ast():
            case KindArrowFunction$constant__from_ast():
            case KindJSDocSignature$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$createReturnFromSignature(ch, signatureNode);
                break;
            }
            default: {
                FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(signatureNode), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("Node needs to be an inferrable node")]));
                return void 0;
                break;
            }
        }
    }
    static GetTypeOfAccessor(ch: {
        value: PseudoChecker;
    } | undefined, __go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        let annotated: PseudoType | undefined = PseudoChecker.$go$private$pseudochecker$typeFromAccessor(ch, __go_accessor);
        if ((annotated ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindNoResult$constant()) {
            return PseudoChecker.$go$private$pseudochecker$inferAccessorType(ch, __go_accessor);
        }
        return annotated;
    }
    static GetTypeOfDeclaration(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindParameter$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromParameter(ch, Node__from_ast.AsParameterDeclaration(node));
                break;
            }
            case KindVariableDeclaration$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromVariable(ch, Node__from_ast.AsVariableDeclaration(node));
                break;
            }
            case KindPropertySignature$constant__from_ast():
            case KindPropertyDeclaration$constant__from_ast():
            case KindJSDocPropertyTag$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromProperty(ch, node);
                break;
            }
            case KindBindingElement$constant__from_ast(): {
                return NewPseudoTypeNoResult(node);
                break;
            }
            case KindExportAssignment$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, (Node__from_ast.AsExportAssignment(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast():
            case KindElementAccessExpression$constant__from_ast():
            case KindBinaryExpression$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromExpandoProperty(ch, node);
                break;
            }
            case KindPropertyAssignment$constant__from_ast():
            case KindShorthandPropertyAssignment$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromPropertyAssignment(ch, node);
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                switch (GetAssignmentDeclarationKind__from_ast(node).$value) {
                    case 5: {
                        {
                        }
                        break;
                    }
                    case 6: {
                        {
                        }
                        break;
                    }
                }
                return NewPseudoTypeNoResult(node);
                break;
            }
            default: {
                FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(node), RuntimeSlice.literal<GoInterface | undefined>([new $goInterfaceAdapter$string("node needs to be an inferrable node")]));
                return void 0;
                break;
            }
        }
    }
    static $go$private$pseudochecker$canGetTypeFromArrayLiteral(ch: {
        value: PseudoChecker;
    } | undefined, node: {
        value: ArrayLiteralExpression__from_ast;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        const __gotots_store_17 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_23 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (!IsInConstContext(__gotots_argument_23)) {
            const __gotots_store_18 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_slice_element_0 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([__gotots_slice_element_0]);
        }
        const __gotots_range_4 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_4 = 0; __gotots_range_index_4 < __gotots_range_4.length; __gotots_range_index_4++) {
            const __gotots_range_value_5 = __gotots_range_4.get(__gotots_range_index_4);
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_5;
            if (Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSpreadElement$constant__from_ast()) {
                return RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([e]);
            }
        }
        return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
    }
    static $go$private$pseudochecker$canGetTypeFromObjectLiteral(ch: {
        value: PseudoChecker;
    } | undefined, node: {
        value: ObjectLiteralExpression__from_ast;
    } | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties === undefined || NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        }
        let errorNodes = RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>();
        const __gotots_range_5 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_5 = 0; __gotots_range_index_5 < __gotots_range_5.length; __gotots_range_index_5++) {
            const __gotots_range_value_6 = __gotots_range_5.get(__gotots_range_index_5);
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_6;
            if (!((Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsThisNodeHasError$constant__from_ast()) >>> 0 === 0)) {
                errorNodes = errorNodes.append(void 0, [e]);
                continue;
            }
            if (Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindShorthandPropertyAssignment$constant__from_ast() || Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSpreadAssignment$constant__from_ast()) {
                errorNodes = errorNodes.append(void 0, [e]);
                continue;
            }
            if (!((Node__from_ast.$storageOf(((Node__from_ast.Name(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsThisNodeHasError$constant__from_ast()) >>> 0 === 0)) {
                errorNodes = errorNodes.append(void 0, [Node__from_ast.Name(e)]);
                continue;
            }
            if (Node__from_ast.$storageOf(((Node__from_ast.Name(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPrivateIdentifier$constant__from_ast()) {
                errorNodes = errorNodes.append(void 0, [e]);
                continue;
            }
            if (Node__from_ast.$storageOf(((Node__from_ast.Name(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindComputedPropertyName$constant__from_ast()) {
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(Node__from_ast.Name(e));
                if (!IsPrimitiveLiteralValue__from_ast(expression, false)) {
                    errorNodes = errorNodes.append(void 0, [Node__from_ast.Name(e)]);
                }
            }
        }
        return errorNodes;
    }
    static $go$private$pseudochecker$cloneParameters(ch: {
        value: PseudoChecker;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): RuntimeSlice<PseudoParameter | undefined> {
        if (nodes === undefined) {
            return RuntimeSlice.nil<PseudoParameter | undefined>();
        }
        if (NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return RuntimeSlice.nil<PseudoParameter | undefined>();
        }
        let lastRequired = lastRequiredParamIndex(NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        let result = RuntimeSlice.make<PseudoParameter | undefined>(0, NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
        const __gotots_range_3 = NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_3 = 0; __gotots_range_index_3 < __gotots_range_3.length; __gotots_range_index_3++) {
            const __gotots_range_value_3 = __gotots_range_index_3;
            const __gotots_range_value_4 = __gotots_range_3.get(__gotots_range_index_3);
            let i = __gotots_range_value_3;
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_4;
            let p: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(e);
            let optional = !(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken === undefined);
            if (!optional && !(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined)) {
                optional = i >= lastRequired - 1;
            }
            result = result.append(void 0, [NewPseudoParameter(!(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined), Node__from_ast.Name(e), optional, PseudoChecker.$go$private$pseudochecker$typeFromParameterWorker(ch, p, i, lastRequired))]);
        }
        return result;
    }
    static $go$private$pseudochecker$cloneTypeParameters(ch: {
        value: PseudoChecker;
    } | undefined, nodes: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined): RuntimeSlice<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined> {
        if (nodes === undefined) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined>();
        }
        if (NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return RuntimeSlice.nil<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined>();
        }
        let result = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<TypeParameterDeclaration__from_ast> | undefined>(0, NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
        const __gotots_range_2 = NodeList__from_ast.$storageOf(((nodes ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_2 = 0; __gotots_range_index_2 < __gotots_range_2.length; __gotots_range_index_2++) {
            const __gotots_range_value_2 = __gotots_range_2.get(__gotots_range_index_2);
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_2;
            result = result.append(void 0, [Node__from_ast.AsTypeParameterDeclaration(e)]);
        }
        return result;
    }
    static $go$private$pseudochecker$createReturnFromSignature(ch: {
        value: PseudoChecker;
    } | undefined, fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        if (IsFunctionLike__from_ast(fn)) {
            let d: tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast> | undefined = Node__from_ast.FunctionLikeData(fn);
            let r: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FunctionLikeBase__from_ast.$storageOf(((d ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).Type;
            if (!(r === undefined)) {
                return NewPseudoTypeDirect(r);
            }
        }
        if (isValueSignatureDeclaration(fn)) {
            return PseudoChecker.$go$private$pseudochecker$typeFromSingleReturnExpression(ch, fn);
        }
        return NewPseudoTypeNoResult(fn);
    }
    static $go$private$pseudochecker$getAccessorMember(ch: {
        value: PseudoChecker;
    } | undefined, __go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, name: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoObjectElement | undefined {
        let allAccessors = GetAllAccessorDeclarationsForDeclaration__from_ast(__go_accessor, Symbol__from_ast.$storageOf(((Node__from_ast.Symbol(__go_accessor) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations);
        if (!(allAccessors.GetAccessor === undefined) && !((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((allAccessors.GetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type === undefined) && !(allAccessors.SetAccessor === undefined) && NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((allAccessors.SetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length > 0 && !(ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((allAccessors.SetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type === undefined)) {
            if (IsGetAccessorDeclaration__from_ast(__go_accessor)) {
                return NewPseudoGetAccessor(__go_accessor, name, false, PseudoChecker.$go$private$pseudochecker$typeFromAccessor(ch, __go_accessor));
            }
            else {
                return NewPseudoSetAccessor(__go_accessor, name, false, PseudoChecker.$go$private$pseudochecker$cloneParameters(ch, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsSetAccessorDeclaration(__go_accessor) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters).get(0));
            }
        }
        if (tsonicTypeScriptRuntime.sameLocation(__go_accessor, allAccessors.FirstAccessor)) {
            let accessorType: PseudoType | undefined = PseudoChecker.$go$private$pseudochecker$typeFromAccessor(ch, __go_accessor);
            let __go_readonly = IsGetAccessorDeclaration__from_ast(__go_accessor) && allAccessors.SecondAccessor === undefined;
            return NewPseudoPropertyAssignment(__go_readonly, name, false, accessorType);
        }
        return void 0;
    }
    static $go$private$pseudochecker$getTypeAnnotationFromAccessor(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (node === undefined) {
            return void 0;
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGetAccessor$constant__from_ast()) {
            return (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsGetAccessorDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Type;
        }
        let __go_set: {
            value: SetAccessorDeclaration__from_ast;
        } | undefined = Node__from_ast.AsSetAccessorDeclaration(node);
        if ((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_set ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters === undefined || NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_set ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length < 1) {
            return void 0;
        }
        let p: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeList__from_ast.$storageOf((((void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
            FunctionLikeWithBodyBase__from_ast.$storageOf((__go_set ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.FunctionLikeWithBodyBase).FunctionLikeBase)).Parameters ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.get(0);
        if (!IsParameterDeclaration__from_ast(p)) {
            return void 0;
        }
        return ParameterDeclaration__from_ast.$storageOf(((Node__from_ast.AsParameterDeclaration(p) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type;
    }
    static $go$private$pseudochecker$getTypeAnnotationFromAllAccessorDeclarations(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, accessors: AllAccessorDeclarations__from_ast): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let accessorType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PseudoChecker.$go$private$pseudochecker$getTypeAnnotationFromAccessor(ch, node);
        if (accessorType === undefined && !tsonicTypeScriptRuntime.sameLocation(node, accessors.FirstAccessor)) {
            accessorType = PseudoChecker.$go$private$pseudochecker$getTypeAnnotationFromAccessor(ch, accessors.FirstAccessor);
        }
        if (accessorType === undefined && !(accessors.SecondAccessor === undefined) && !tsonicTypeScriptRuntime.sameLocation(node, accessors.SecondAccessor)) {
            accessorType = PseudoChecker.$go$private$pseudochecker$getTypeAnnotationFromAccessor(ch, accessors.SecondAccessor);
        }
        return accessorType;
    }
    static $go$private$pseudochecker$inferAccessorType(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindGetAccessor$constant__from_ast()) {
            return PseudoChecker.$go$private$pseudochecker$createReturnFromSignature(ch, node);
        }
        return NewPseudoTypeNoResult(node);
    }
    static $go$private$pseudochecker$typeFromAccessor(ch: {
        value: PseudoChecker;
    } | undefined, __go_accessor: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        let accessorDeclarations = GetAllAccessorDeclarationsForDeclaration__from_ast(__go_accessor, Symbol__from_ast.$storageOf(((DeclarationBase__from_ast.$storageOf(((Node__from_ast.DeclarationData(__go_accessor) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<DeclarationBase__from_ast>).value).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations);
        let accessorType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PseudoChecker.$go$private$pseudochecker$getTypeAnnotationFromAllAccessorDeclarations(ch, __go_accessor, AllAccessorDeclarations__from_ast.$copy(accessorDeclarations));
        if (!(accessorType === undefined) && !IsTypePredicateNode__from_ast(accessorType)) {
            return NewPseudoTypeDirect(accessorType);
        }
        if (!(accessorDeclarations.GetAccessor === undefined)) {
            const __gotots_receiver_0 = ch;
            const __gotots_store_0 = NodeBase__from_ast.$storageOf((accessorDeclarations.GetAccessor ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.AccessorDeclarationBase.NodeBase);
            const __gotots_argument_0 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return PseudoChecker.$go$private$pseudochecker$createReturnFromSignature(__gotots_receiver_0, __gotots_argument_0);
        }
        return NewPseudoTypeNoResult(__go_accessor);
    }
    static $go$private$pseudochecker$typeFromArrayLiteral(ch: {
        value: PseudoChecker;
    } | undefined, node: {
        value: ArrayLiteralExpression__from_ast;
    } | undefined): PseudoType | undefined {
        {
            let errorNodes = PseudoChecker.$go$private$pseudochecker$canGetTypeFromArrayLiteral(ch, node);
            if (!errorNodes.isNil()) {
                const __gotots_store_12 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                        PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_16 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_17 = errorNodes;
                return NewPseudoTypeInferredWithErrors(__gotots_argument_16, __gotots_argument_17);
            }
        }
        const __gotots_store_13 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                            (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_18 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let __gotots_logical_result_1 = IsInConstContext(__gotots_argument_18);
        if (__gotots_logical_result_1) {
            const __gotots_store_14 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_19 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_1 = isContextuallyTyped(__gotots_argument_19);
        }
        if (__gotots_logical_result_1) {
            const __gotots_store_15 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_20 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NewPseudoTypeInferred(__gotots_argument_20);
        }
        let results = RuntimeSlice.make<PseudoType | undefined>(0, NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
        const __gotots_range_0 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Elements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_0;
            results = results.append(void 0, [PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, e)]);
        }
        return NewPseudoTypeTuple(results);
    }
    static $go$private$pseudochecker$typeFromExpandoProperty(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        let declaredType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(node);
        if (!(declaredType === undefined)) {
            return NewPseudoTypeDirect(declaredType);
        }
        return NewPseudoTypeNoResult(node);
    }
    static $go$private$pseudochecker$typeFromExpression(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindOmittedExpression$constant__from_ast(): {
                return $state.PseudoTypeUndefined;
                break;
            }
            case KindParenthesizedExpression$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, ParenthesizedExpression__from_ast.$storageOf(((Node__from_ast.AsParenthesizedExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression);
                break;
            }
            case KindIdentifier$constant__from_ast(): {
                if (Identifier__from_ast.$storageOf(((Node__from_ast.AsIdentifier(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Identifier__from_ast>).value).Text === "undefined") {
                    return $state.PseudoTypeUndefined;
                }
                break;
            }
            case KindNullKeyword$constant__from_ast(): {
                return $state.PseudoTypeNull;
                break;
            }
            case KindArrowFunction$constant__from_ast():
            case KindFunctionExpression$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromFunctionLikeExpression(ch, node);
                break;
            }
            case KindTypeAssertionExpression$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromTypeAssertion(ch, (Node__from_ast.AsTypeAssertion(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, (Node__from_ast.AsTypeAssertion(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type);
                break;
            }
            case KindAsExpression$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromTypeAssertion(ch, (Node__from_ast.AsAsExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, (Node__from_ast.AsAsExpression(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type);
                break;
            }
            case KindPrefixUnaryExpression$constant__from_ast(): {
                if (IsPrimitiveLiteralValue__from_ast(node, true)) {
                    return PseudoChecker.$go$private$pseudochecker$typeFromPrimitiveLiteralPrefix(ch, Node__from_ast.AsPrefixUnaryExpression(node));
                }
                break;
            }
            case KindArrayLiteralExpression$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromArrayLiteral(ch, Node__from_ast.AsArrayLiteralExpression(node));
                break;
            }
            case KindObjectLiteralExpression$constant__from_ast(): {
                return PseudoChecker.$go$private$pseudochecker$typeFromObjectLiteral(ch, Node__from_ast.AsObjectLiteralExpression(node));
                break;
            }
            case KindClassExpression$constant__from_ast(): {
                return NewPseudoTypeInferred(node);
                break;
            }
            case KindTemplateExpression$constant__from_ast(): {
                if (IsInConstContext(node)) {
                    return NewPseudoTypeInferred(node);
                }
                return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeInferred(node), $state.PseudoTypeString);
                break;
            }
            case KindNumericLiteral$constant__from_ast(): {
                return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeNumericLiteral(node), $state.PseudoTypeNumber);
                break;
            }
            case KindNoSubstitutionTemplateLiteral$constant__from_ast(): {
                return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), $state.PseudoTypeString);
                break;
            }
            case KindStringLiteral$constant__from_ast(): {
                return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeStringLiteral(node), $state.PseudoTypeString);
                break;
            }
            case KindBigIntLiteral$constant__from_ast(): {
                return NewPseudoTypeMaybeConstLocation(node, NewPseudoTypeBigIntLiteral(node), $state.PseudoTypeBigInt);
                break;
            }
            case KindTrueKeyword$constant__from_ast(): {
                return NewPseudoTypeMaybeConstLocation(node, $state.PseudoTypeTrue, $state.PseudoTypeBoolean);
                break;
            }
            case KindFalseKeyword$constant__from_ast(): {
                return NewPseudoTypeMaybeConstLocation(node, $state.PseudoTypeFalse, $state.PseudoTypeBoolean);
                break;
            }
        }
        return NewPseudoTypeInferred(node);
    }
    static $go$private$pseudochecker$typeFromFunctionLikeExpression(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        if (!(FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).FullSignature === undefined)) {
            return NewPseudoTypeDirect(FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).FullSignature);
        }
        let returnType: PseudoType | undefined = PseudoChecker.$go$private$pseudochecker$createReturnFromSignature(ch, node);
        if ((returnType ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindNoResult$constant()) {
            return NewPseudoTypeInferred((void Node__from_ast.AsNode,
                node));
        }
        let typeParameters = PseudoChecker.$go$private$pseudochecker$cloneTypeParameters(ch, FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).TypeParameters);
        let parameters = PseudoChecker.$go$private$pseudochecker$cloneParameters(ch, FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).Parameters);
        return NewPseudoTypeSingleCallSignature(node, parameters, typeParameters, returnType);
    }
    static $go$private$pseudochecker$typeFromObjectLiteral(ch: {
        value: PseudoChecker;
    } | undefined, node: {
        value: ObjectLiteralExpression__from_ast;
    } | undefined): PseudoType | undefined {
        {
            let errorNodes = PseudoChecker.$go$private$pseudochecker$canGetTypeFromObjectLiteral(ch, node);
            if (!errorNodes.isNil()) {
                const __gotots_store_16 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                            (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                                (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                    (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                        PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                const __gotots_argument_21 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                const __gotots_argument_22 = errorNodes;
                return NewPseudoTypeInferredWithErrors(__gotots_argument_21, __gotots_argument_22);
            }
        }
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties === undefined || NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length === 0) {
            return NewPseudoTypeObjectLiteral(RuntimeSlice.nil<PseudoObjectElement | undefined>());
        }
        let results = RuntimeSlice.make<PseudoObjectElement | undefined>(0, NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes.length, void 0);
        const __gotots_range_1 = NodeList__from_ast.$storageOf((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Properties ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let e: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            switch (Node__from_ast.$storageOf(((e ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindMethodDeclaration$constant__from_ast(): {
                    let optional = !(NamedMemberBase__from_ast.$storageOf((Node__from_ast.AsMethodDeclaration(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken === undefined) && Node__from_ast.$storageOf(((NamedMemberBase__from_ast.$storageOf((Node__from_ast.AsMethodDeclaration(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQuestionToken$constant__from_ast();
                    if (!(FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).FullSignature === undefined)) {
                        results = results.append(void 0, [NewPseudoPropertyAssignment(false, Node__from_ast.Name(e), optional, NewPseudoTypeDirect(FunctionLikeBase__from_ast.$storageOf(((Node__from_ast.FunctionLikeData(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<FunctionLikeBase__from_ast>).value).FullSignature))]);
                    }
                    else {
                        results = results.append(void 0, [NewPseudoObjectMethod(e, Node__from_ast.Name(e), optional, PseudoChecker.$go$private$pseudochecker$cloneTypeParameters(ch, (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                                FunctionLikeWithBodyBase__from_ast.$storageOf((Node__from_ast.AsMethodDeclaration(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.FunctionLikeWithBodyBase).FunctionLikeBase)).TypeParameters), PseudoChecker.$go$private$pseudochecker$cloneParameters(ch, Node__from_ast.ParameterList(e)), PseudoChecker.$go$private$pseudochecker$createReturnFromSignature(ch, e))]);
                    }
                    break;
                }
                case KindPropertyAssignment$constant__from_ast(): {
                    results = results.append(void 0, [NewPseudoPropertyAssignment(false, Node__from_ast.Name(e), !((void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                            PropertyAssignment__from_ast.$storageOf(((Node__from_ast.AsPropertyAssignment(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).NamedMemberBase)).PostfixToken === undefined) && Node__from_ast.$storageOf((((void NamedMemberBase__from_ast.$storageOf, (void NamedMemberBase__from_ast.$fromStorage,
                            PropertyAssignment__from_ast.$storageOf(((Node__from_ast.AsPropertyAssignment(e) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAssignment__from_ast>).value).NamedMemberBase)).PostfixToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQuestionToken$constant__from_ast(), PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, Node__from_ast.Initializer(e)))]);
                    break;
                }
                case KindSetAccessor$constant__from_ast():
                case KindGetAccessor$constant__from_ast(): {
                    let member: PseudoObjectElement | undefined = PseudoChecker.$go$private$pseudochecker$getAccessorMember(ch, e, Node__from_ast.Name(e));
                    if (!(member === undefined)) {
                        results = results.append(void 0, [member]);
                    }
                    break;
                }
            }
        }
        return NewPseudoTypeObjectLiteral(results);
    }
    static $go$private$pseudochecker$typeFromParameter(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined): PseudoType | undefined {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent;
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast()) {
            return PseudoChecker.GetTypeOfAccessor(ch, parent);
        }
        if (ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) {
            if (!(ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type === undefined)) {
                return NewPseudoTypeDirect(ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type);
            }
            const __gotots_store_1 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_1 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            return NewPseudoTypeNoResult(__gotots_argument_1);
        }
        let p = Node__from_ast.Parameters(parent);
        const __gotots_argument_2 = p;
        const __gotots_store_2 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_3 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        let selfIdx = Index$SliceOf_PointerTo_Named_ast$Node$PointerTo_Named_ast$Node(__gotots_argument_2, __gotots_argument_3);
        let lastRequired = lastRequiredParamIndex(p);
        return PseudoChecker.$go$private$pseudochecker$typeFromParameterWorker(ch, node, selfIdx, lastRequired);
    }
    static $go$private$pseudochecker$typeFromParameterWorker(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined, selfIdx: int, lastRequired: int): PseudoType | undefined {
        let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase)).NodeDefault)).Node)).Parent;
        if (Node__from_ast.$storageOf(((parent ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSetAccessor$constant__from_ast()) {
            return PseudoChecker.GetTypeOfAccessor(ch, parent);
        }
        let hasRequiredAfter = selfIdx < lastRequired - 1;
        let declaredType: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Type;
        if (!(declaredType === undefined)) {
            let result: PseudoType | undefined = NewPseudoTypeDirect(declaredType);
            if ((ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks && !(ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) && hasRequiredAfter) {
                return addUndefinedIfDefinitelyRequired(result);
            }
            return result;
        }
        let __gotots_logical_result_0 = !(ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) && IsIdentifier__from_ast(ParameterDeclaration__from_ast.Name(node));
        if (__gotots_logical_result_0) {
            const __gotots_store_7 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_8 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            __gotots_logical_result_0 = !isContextuallyTyped(__gotots_argument_8);
        }
        if (__gotots_logical_result_0) {
            let expr: PseudoType | undefined = PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer);
            if (!(ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.strictNullChecks) {
                return expr;
            }
            if (!hasRequiredAfter) {
                return expr;
            }
            return addUndefinedIfDefinitelyRequired(expr);
        }
        const __gotots_store_8 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            ParameterDeclaration__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_9 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NewPseudoTypeNoResult(__gotots_argument_9);
    }
    static $go$private$pseudochecker$typeFromPrimitiveLiteralPrefix(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast> | undefined): PseudoType | undefined {
        const __gotots_store_9 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                    (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                        PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        if (PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operator === KindPlusToken$constant__from_ast()) {
            expr = PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
        }
        let inner: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).Operand;
        if (Node__from_ast.$storageOf(((inner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindBigIntLiteral$constant__from_ast()) {
            const __gotots_store_10 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_10 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_11 = NewPseudoTypeBigIntLiteral((void Node__from_ast.AsNode,
                expr));
            const __gotots_argument_12 = $state.PseudoTypeBigInt;
            return NewPseudoTypeMaybeConstLocation(__gotots_argument_10, __gotots_argument_11, __gotots_argument_12);
        }
        if (Node__from_ast.$storageOf(((inner ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindNumericLiteral$constant__from_ast()) {
            const __gotots_store_11 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            PrefixUnaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PrefixUnaryExpression__from_ast>).value).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_13 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            const __gotots_argument_14 = NewPseudoTypeNumericLiteral((void Node__from_ast.AsNode,
                expr));
            const __gotots_argument_15 = $state.PseudoTypeNumber;
            return NewPseudoTypeMaybeConstLocation(__gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
        }
        FailBadSyntaxKind__from_debug(new GoInterfaceAdapter(inner), RuntimeSlice.nil<GoInterface | undefined>());
        return void 0;
    }
    static $go$private$pseudochecker$typeFromProperty(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(node);
        if (!(t === undefined)) {
            return NewPseudoTypeDirect(t);
        }
        if (IsPropertyDeclaration__from_ast(node)) {
            let init: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(node);
            if (!(init === undefined) && !isContextuallyTyped(node)) {
                if (HasModifier__from_ast(node, ModifierFlagsReadonly$constant__from_ast()) && IsTemplateExpression__from_ast(init)) {
                    return NewPseudoTypeNoResult(node);
                }
                let expr: PseudoType | undefined = PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, init);
                if (!(expr === undefined) && (!((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindInferred$constant()) || (PseudoType.AsPseudoTypeInferred(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes.length > 0)) {
                    if (!((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindDirect$constant()) && !(NamedMemberBase__from_ast.$storageOf((Node__from_ast.AsPropertyDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken === undefined) && Node__from_ast.$storageOf(((NamedMemberBase__from_ast.$storageOf((Node__from_ast.AsPropertyDeclaration(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NamedMemberBase).PostfixToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindQuestionToken$constant__from_ast()) {
                        return addUndefinedIfDefinitelyRequired(expr);
                    }
                    return expr;
                }
            }
        }
        return NewPseudoTypeNoResult(node);
    }
    static $go$private$pseudochecker$typeFromPropertyAssignment(ch: {
        value: PseudoChecker;
    } | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        let annotation: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Type(node);
        if (!(annotation === undefined)) {
            return NewPseudoTypeDirect(annotation);
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAssignment$constant__from_ast()) {
            let init: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Initializer(node);
            if (!(init === undefined)) {
                let expr: PseudoType | undefined = PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, init);
                if (!(expr === undefined) && (!((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindInferred$constant()) || (PseudoType.AsPseudoTypeInferred(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes.length > 0)) {
                    return expr;
                }
            }
        }
        return NewPseudoTypeNoResult(node);
    }
    static $go$private$pseudochecker$typeFromSingleReturnExpression(ch: {
        value: PseudoChecker;
    } | undefined, fn: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        let candidateExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (!(fn === undefined) && !NodeIsMissing__from_ast(Node__from_ast.Body(fn))) {
            let flags = GetFunctionFlags__from_ast(fn);
            if (!((flags & FunctionFlagsAsyncGenerator$constant__from_ast()) >>> 0 === 0)) {
                return NewPseudoTypeNoResult(fn);
            }
            let body: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Body(fn);
            if (IsBlock__from_ast(body)) {
                ForEachReturnStatement__from_ast(body, (stmt: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
                    if (!tsonicTypeScriptRuntime.sameLocation(Node__from_ast.$storageOf(((stmt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, body)) {
                        candidateExpr = void 0;
                        return true;
                    }
                    if (candidateExpr === undefined) {
                        candidateExpr = ReturnStatement__from_ast.$storageOf(((Node__from_ast.AsReturnStatement(stmt) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ReturnStatement__from_ast>).value).Expression;
                    }
                    else {
                        candidateExpr = void 0;
                        return true;
                    }
                    return false;
                });
            }
            else {
                candidateExpr = body;
            }
        }
        if (!(candidateExpr === undefined)) {
            if (isContextuallyTyped(candidateExpr)) {
                let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
                if (Node__from_ast.$storageOf(((candidateExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindTypeAssertionExpression$constant__from_ast()) {
                    t = (Node__from_ast.AsTypeAssertion(candidateExpr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                }
                else if (Node__from_ast.$storageOf(((candidateExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindAsExpression$constant__from_ast()) {
                    t = (Node__from_ast.AsAsExpression(candidateExpr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Type;
                }
                if (!(t === undefined) && !IsConstTypeReference__from_ast(t)) {
                    return NewPseudoTypeDirect(t);
                }
            }
            else {
                return PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, candidateExpr);
            }
        }
        return NewPseudoTypeNoResult(fn);
    }
    static $go$private$pseudochecker$typeFromTypeAssertion(ch: {
        value: PseudoChecker;
    } | undefined, expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, typeNode: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): PseudoType | undefined {
        if (IsConstTypeReference__from_ast(typeNode)) {
            return PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, expression);
        }
        return NewPseudoTypeDirect(typeNode);
    }
    static $go$private$pseudochecker$typeFromVariable(ch: {
        value: PseudoChecker;
    } | undefined, declaration: tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast> | undefined): PseudoType | undefined {
        let t: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Type;
        if (!(t === undefined)) {
            return NewPseudoTypeDirect(t);
        }
        let init: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).Initializer;
        if (!(init === undefined) && (Symbol__from_ast.$storageOf((((void DeclarationBase__from_ast.$storageOf, (void DeclarationBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).DeclarationBase)).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations.length === 1 || CountWhere$PointerTo_Named_ast$Node(Symbol__from_ast.$storageOf((((void DeclarationBase__from_ast.$storageOf, (void DeclarationBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).DeclarationBase)).Symbol ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).Declarations, IsVariableDeclaration__from_ast) === 1)) {
            const __gotots_store_3 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
            const __gotots_argument_4 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
            if (!isContextuallyTyped(__gotots_argument_4)) {
                const __gotots_store_4 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
                const __gotots_argument_5 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                if (IsVarConst__from_ast(__gotots_argument_5) && IsTemplateExpression__from_ast(init)) {
                    const __gotots_store_5 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
                    const __gotots_argument_6 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                    return NewPseudoTypeNoResult(__gotots_argument_6);
                }
                let expr: PseudoType | undefined = PseudoChecker.$go$private$pseudochecker$typeFromExpression(ch, init);
                if (!(expr === undefined) && (!((expr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindInferred$constant()) || (PseudoType.AsPseudoTypeInferred(expr) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ErrorNodes.length > 0)) {
                    return expr;
                }
            }
        }
        const __gotots_store_6 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            VariableDeclaration__from_ast.$storageOf(((declaration ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<VariableDeclaration__from_ast>).value).NodeBase));
        const __gotots_argument_7 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NewPseudoTypeNoResult(__gotots_argument_7);
    }
}
export function NewPseudoChecker(strictNullChecks: bool, exactOptionalPropertyTypes: bool): {
    value: PseudoChecker;
} | undefined {
    return { value: new PseudoChecker(strictNullChecks, exactOptionalPropertyTypes) };
}
