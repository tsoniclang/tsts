import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { JsxElement as JsxElement__from_ast, JsxFragment as JsxFragment__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { ExpressionBase as ExpressionBase__from_ast, IsJsxElement as IsJsxElement__from_ast, IsJsxFragment as IsJsxFragment__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFlagsThisNodeHasError$constant as NodeFlagsThisNodeHasError$constant__from_ast, Node as Node__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, TagNamesAreEquivalent as TagNamesAreEquivalent__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function isUnclosedTag(node: {
    value: JsxElement__from_ast;
} | undefined): bool {
    let openingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement;
    let closingElement: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClosingElement;
    if (!TagNamesAreEquivalent__from_ast(Node__from_ast.TagName(openingElement), Node__from_ast.TagName(closingElement))) {
        return true;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Parent;
    if (IsJsxElement__from_ast(parent)) {
        let parent__shadow_1: {
            value: JsxElement__from_ast;
        } | undefined = Node__from_ast.AsJsxElement(parent);
        return TagNamesAreEquivalent__from_ast(Node__from_ast.TagName(openingElement), Node__from_ast.TagName((parent__shadow_1 ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.OpeningElement)) && isUnclosedTag(parent__shadow_1);
    }
    return false;
}
export function isUnclosedFragment(node: {
    value: JsxFragment__from_ast;
} | undefined): bool {
    let closingFragment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ClosingFragment;
    if (!((Node__from_ast.$storageOf(((closingFragment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsThisNodeHasError$constant__from_ast()) >>> 0 === 0)) {
        return true;
    }
    let parent: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = (void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
        (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
            (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                    (void UnaryExpressionBase__from_ast.$storageOf, (void UnaryExpressionBase__from_ast.$fromStorage,
                        (void UpdateExpressionBase__from_ast.$storageOf, (void UpdateExpressionBase__from_ast.$fromStorage,
                            (void LeftHandSideExpressionBase__from_ast.$storageOf, (void LeftHandSideExpressionBase__from_ast.$fromStorage,
                                (void MemberExpressionBase__from_ast.$storageOf, (void MemberExpressionBase__from_ast.$fromStorage,
                                    PrimaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.PrimaryExpressionBase).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Parent;
    if (IsJsxFragment__from_ast(parent) && isUnclosedFragment(Node__from_ast.AsJsxFragment(parent))) {
        return true;
    }
    return false;
}
