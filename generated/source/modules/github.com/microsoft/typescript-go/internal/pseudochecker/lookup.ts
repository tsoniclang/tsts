import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Kind as Kind__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { PseudoTypeDirect, PseudoTypeMaybeConstLocation, PseudoTypeUnion } from "./type.js";
import type { bool, int } from "@gotots/runtime/scalars.js";
import { FindAncestor as FindAncestor__from_ast, IntersectionTypeNode as IntersectionTypeNode__from_ast, IsAccessor as IsAccessor__from_ast, IsArrowFunction as IsArrowFunction__from_ast, IsAssertionExpression as IsAssertionExpression__from_ast, IsCallExpression as IsCallExpression__from_ast, IsConstAssertion as IsConstAssertion__from_ast, IsConstructorDeclaration as IsConstructorDeclaration__from_ast, IsFunctionDeclaration as IsFunctionDeclaration__from_ast, IsFunctionExpression as IsFunctionExpression__from_ast, IsJsxElement as IsJsxElement__from_ast, IsJsxExpression as IsJsxExpression__from_ast, IsMethodDeclaration as IsMethodDeclaration__from_ast, IsSatisfiesExpression as IsSatisfiesExpression__from_ast, IsVariableParameterOrProperty as IsVariableParameterOrProperty__from_ast, KindArrayLiteralExpression$constant as KindArrayLiteralExpression$constant__from_ast, KindConditionalType$constant as KindConditionalType$constant__from_ast, KindImportType$constant as KindImportType$constant__from_ast, KindIndexedAccessType$constant as KindIndexedAccessType$constant__from_ast, KindIntersectionType$constant as KindIntersectionType$constant__from_ast, KindObjectLiteralExpression$constant as KindObjectLiteralExpression$constant__from_ast, KindOptionalType$constant as KindOptionalType$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindParenthesizedType$constant as KindParenthesizedType$constant__from_ast, KindPrefixUnaryExpression$constant as KindPrefixUnaryExpression$constant__from_ast, KindPropertyAssignment$constant as KindPropertyAssignment$constant__from_ast, KindRestType$constant as KindRestType$constant__from_ast, KindShorthandPropertyAssignment$constant as KindShorthandPropertyAssignment$constant__from_ast, KindSpreadElement$constant as KindSpreadElement$constant__from_ast, KindTemplateSpan$constant as KindTemplateSpan$constant__from_ast, KindTypeOperator$constant as KindTypeOperator$constant__from_ast, KindTypePredicate$constant as KindTypePredicate$constant__from_ast, KindTypeQuery$constant as KindTypeQuery$constant__from_ast, KindTypeReference$constant as KindTypeReference$constant__from_ast, KindUndefinedKeyword$constant as KindUndefinedKeyword$constant__from_ast, KindUnionType$constant as KindUnionType$constant__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast, ParameterDeclaration as ParameterDeclaration__from_ast, ParenthesizedTypeNode as ParenthesizedTypeNode__from_ast, UnionOrIntersectionTypeNodeBase as UnionOrIntersectionTypeNodeBase__from_ast, UnionTypeNode as UnionTypeNode__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $state } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/pseudochecker/state.js";
import { Some$PointerTo_Named_ast$Node, Some$PointerTo_Named_pseudochecker$PseudoType } from "../../../../../../support/generics/concretizations/github_u2e_com/microsoft/typescript_u2d_go/internal/core/Some.js";
import { NewPseudoTypeUnion, PseudoType, PseudoTypeKindDirect$constant, PseudoTypeKindInferred$constant, PseudoTypeKindMaybeConstLocation$constant, PseudoTypeKindNoResult$constant, PseudoTypeKindUndefined$constant, PseudoTypeKindUnion$constant } from "./type.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export function isValueSignatureDeclaration(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsFunctionExpression__from_ast(node) || IsArrowFunction__from_ast(node) || IsMethodDeclaration__from_ast(node) || IsAccessor__from_ast(node) || IsFunctionDeclaration__from_ast(node) || IsConstructorDeclaration__from_ast(node);
}
export function isConstContextPropagatingKind(kind: Kind__from_ast): bool {
    switch (kind) {
        case KindArrayLiteralExpression$constant__from_ast():
        case KindObjectLiteralExpression$constant__from_ast():
        case KindParenthesizedExpression$constant__from_ast():
        case KindSpreadElement$constant__from_ast():
        case KindPropertyAssignment$constant__from_ast():
        case KindShorthandPropertyAssignment$constant__from_ast():
        case KindTemplateSpan$constant__from_ast():
        case KindPrefixUnaryExpression$constant__from_ast(): {
            return true;
            break;
        }
    }
    return false;
}
export function IsInConstContext(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let maybeAssertion: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        return IsAssertionExpression__from_ast(n) || !isConstContextPropagatingKind(Node__from_ast.$storageOf(((n ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
    });
    return IsConstAssertion__from_ast(maybeAssertion);
}
export function isUndefinedPseudoType(t: PseudoType | undefined): bool {
    return (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindUndefined$constant() || ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindMaybeConstLocation$constant() && isUndefinedPseudoType((PseudoType.AsPseudoTypeMaybeConstLocation(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).ConstType));
}
export function typeNodeCouldReferToUndefined(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    for (; Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindParenthesizedType$constant__from_ast();) {
        node = ParenthesizedTypeNode__from_ast.$storageOf(((Node__from_ast.AsParenthesizedTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedTypeNode__from_ast>).value).Type;
    }
    switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
        case KindTypeReference$constant__from_ast():
        case KindIndexedAccessType$constant__from_ast():
        case KindTypeQuery$constant__from_ast():
        case KindOptionalType$constant__from_ast():
        case KindRestType$constant__from_ast():
        case KindImportType$constant__from_ast(): {
            return true;
            break;
        }
        case KindIntersectionType$constant__from_ast(): {
            return Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                IntersectionTypeNode__from_ast.$storageOf(((Node__from_ast.AsIntersectionTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<IntersectionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, typeNodeCouldReferToUndefined);
            break;
        }
        case KindUnionType$constant__from_ast(): {
            return Some$PointerTo_Named_ast$Node(NodeList__from_ast.$storageOf((((void UnionOrIntersectionTypeNodeBase__from_ast.$storageOf, (void UnionOrIntersectionTypeNodeBase__from_ast.$fromStorage,
                UnionTypeNode__from_ast.$storageOf(((Node__from_ast.AsUnionTypeNode(node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<UnionTypeNode__from_ast>).value).UnionOrIntersectionTypeNodeBase)).Types ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes, typeNodeCouldReferToUndefined);
            break;
        }
        case KindConditionalType$constant__from_ast(): {
            return true;
            break;
        }
        case KindTypeOperator$constant__from_ast(): {
            return true;
            break;
        }
        case KindTypePredicate$constant__from_ast(): {
            return true;
            break;
        }
        case KindUndefinedKeyword$constant__from_ast(): {
            return true;
            break;
        }
        default: {
            return false;
            break;
        }
    }
}
export function couldAlreadyReferToUndefinedType(t: PseudoType | undefined): bool {
    if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindNoResult$constant() || (t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindInferred$constant() || isUndefinedPseudoType(t)) {
        return true;
    }
    if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindMaybeConstLocation$constant()) {
        let mc: PseudoTypeMaybeConstLocation | undefined = PseudoType.AsPseudoTypeMaybeConstLocation(t);
        return couldAlreadyReferToUndefinedType((mc ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).RegularType);
    }
    if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindDirect$constant()) {
        let node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (PseudoType.AsPseudoTypeDirect(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).TypeNode;
        return typeNodeCouldReferToUndefined(node);
    }
    if ((t ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Kind === PseudoTypeKindUnion$constant()) {
        return Some$PointerTo_Named_pseudochecker$PseudoType((PseudoType.AsPseudoTypeUnion(t) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Types, couldAlreadyReferToUndefinedType);
    }
    return false;
}
export function isOptionalInitializedOrRestParameter(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    let p: tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast> | undefined = Node__from_ast.AsParameterDeclaration(node);
    if (!(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).DotDotDotToken === undefined) || !(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).Initializer === undefined) || !(ParameterDeclaration__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParameterDeclaration__from_ast>).value).QuestionToken === undefined)) {
        return true;
    }
    return false;
}
export function lastRequiredParamIndex(params: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): int {
    for (let i = params.length - 1; i >= 0; i--) {
        if (!isOptionalInitializedOrRestParameter(params.get(i))) {
            return i + 1;
        }
    }
    return 0;
}
export function addUndefinedIfDefinitelyRequired(expr: PseudoType | undefined): PseudoType | undefined {
    if (couldAlreadyReferToUndefinedType(expr)) {
        return expr;
    }
    return NewPseudoTypeUnion(RuntimeSlice.literal<PseudoType | undefined>([expr, $state.PseudoTypeUndefined]));
}
export function isContextuallyTyped(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return !(FindAncestor__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Parent, (n: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool => {
        if (IsCallExpression__from_ast(n)) {
            return true;
        }
        if (IsSatisfiesExpression__from_ast(n)) {
            return true;
        }
        if ((IsVariableParameterOrProperty__from_ast(n) || IsAssertionExpression__from_ast(n)) && !(Node__from_ast.Type(n) === undefined) && !IsConstAssertion__from_ast(n)) {
            return true;
        }
        return IsJsxElement__from_ast(n) || IsJsxExpression__from_ast(n);
    }) === undefined);
}
