import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { DeleteExpression as DeleteExpression__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, Node$Storage as Node__from_ast$Storage, SyntheticReferenceExpression as SyntheticReferenceExpression__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import type { $goInterface$Interface_void as GoInterface } from "../../../../../../../support/interface-contracts.js";
import type { bool } from "@gotots/runtime/scalars.js";
import { CallExpression as CallExpression__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, IsCallExpression as IsCallExpression__from_ast, IsNonNullExpression as IsNonNullExpression__from_ast, IsParenthesizedExpression as IsParenthesizedExpression__from_ast, IsSyntheticReferenceExpression as IsSyntheticReferenceExpression__from_ast, IsTaggedTemplateExpression as IsTaggedTemplateExpression__from_ast, KindCallExpression$constant as KindCallExpression$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindDeleteExpression$constant as KindDeleteExpression$constant__from_ast, KindElementAccessExpression$constant as KindElementAccessExpression$constant__from_ast, KindParenthesizedExpression$constant as KindParenthesizedExpression$constant__from_ast, KindPropertyAccessExpression$constant as KindPropertyAccessExpression$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, KindSuperKeyword$constant as KindSuperKeyword$constant__from_ast, LeftHandSideExpressionBase as LeftHandSideExpressionBase__from_ast, MemberExpressionBase as MemberExpressionBase__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeFlagsOptionalChain$constant as NodeFlagsOptionalChain$constant__from_ast, NodeList as NodeList__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, OEKPartiallyEmittedExpressions$constant as OEKPartiallyEmittedExpressions$constant__from_ast, ParenthesizedExpression as ParenthesizedExpression__from_ast, PrimaryExpressionBase as PrimaryExpressionBase__from_ast, PropertyAccessExpression as PropertyAccessExpression__from_ast, SkipParentheses as SkipParentheses__from_ast, SkipPartiallyEmittedExpressions as SkipPartiallyEmittedExpressions__from_ast, SubtreeContainsOptionalChaining$constant as SubtreeContainsOptionalChaining$constant__from_ast, UnaryExpressionBase as UnaryExpressionBase__from_ast, UpdateExpressionBase as UpdateExpressionBase__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Assert as Assert__from_debug } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/debug/package.js";
import { EFNoComments$constant as EFNoComments$constant__from_printer, EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsSimpleCopiableExpression as IsSimpleCopiableExpression__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { $goInterfaceAdapter$PointerTo_Named_printer$NodeFactory as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { createNotNullCondition } from "./utilities.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice, goSliceAppendSlice } from "@gotots/runtime/slice.js";
export class optionalChainTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$visit(ch: optionalChainTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsOptionalChaining$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindCallExpression$constant__from_ast(): {
                return optionalChainTransformer.$go$private$estransforms$visitCallExpression(ch, Node__from_ast.AsCallExpression(node), false);
                break;
            }
            case KindPropertyAccessExpression$constant__from_ast():
            case KindElementAccessExpression$constant__from_ast(): {
                if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0)) {
                    return optionalChainTransformer.$go$private$estransforms$visitOptionalExpression(ch, node, false, false);
                }
                const __gotots_store_1 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Transformer")), node);
                break;
            }
            case KindDeleteExpression$constant__from_ast(): {
                return optionalChainTransformer.$go$private$estransforms$visitDeleteExpression(ch, Node__from_ast.AsDeleteExpression(node));
                break;
            }
            default: {
                const __gotots_store_2 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Transformer")), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitCallExpression(ch: optionalChainTransformer | undefined, node: tsonicTypeScriptRuntime.Location<CallExpression__from_ast> | undefined, captureThisArg: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0)) {
            const __gotots_receiver_2 = ch;
            const __gotots_store_3 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_2 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            const __gotots_argument_3 = captureThisArg;
            const __gotots_argument_4 = false;
            return optionalChainTransformer.$go$private$estransforms$visitOptionalExpression(__gotots_receiver_2, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4);
        }
        if (IsParenthesizedExpression__from_ast(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression)) {
            let unwrapped: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression);
            if (!((Node__from_ast.$storageOf(((unwrapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0)) {
                let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = optionalChainTransformer.$go$private$estransforms$visitParenthesizedExpression(ch, Node__from_ast.AsParenthesizedExpression(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Expression), true, false);
                const __gotots_store_4 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let args: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Transformer")), CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).Arguments);
                if (IsSyntheticReferenceExpression__from_ast(expression)) {
                    const __gotots_store_5 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewFunctionCallCall(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Transformer")), (Node__from_ast.AsSyntheticReferenceExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, (Node__from_ast.AsSyntheticReferenceExpression(expression) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ThisArg, NodeList__from_ast.$storageOf(((args ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
                    Node__from_ast.$storageOf(((res ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
                    const __gotots_store_6 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    const __gotots_receiver_3 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer"));
                    const __gotots_argument_5 = res;
                    const __gotots_store_7 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
                    const __gotots_argument_6 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                        return NodeDefault__from_ast.$fromStorage($go$storage);
                    }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                        return NodeDefault__from_ast.$storageOf($go$value);
                    }));
                    EmitContext__from_printer.SetOriginal(__gotots_receiver_3, __gotots_argument_5, __gotots_argument_6);
                    return res;
                }
                const __gotots_store_8 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_9 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                return NodeFactory__from_ast.UpdateCallExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeFactory"), node, expression, void 0, void 0, args, Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags);
            }
        }
        const __gotots_store_10 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_4 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "Transformer"));
        const __gotots_store_11 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(CallExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<CallExpression__from_ast>).value).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
        const __gotots_argument_7 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_4, __gotots_argument_7);
    }
    static $go$private$estransforms$visitDeleteExpression(ch: optionalChainTransformer | undefined, node: {
        value: DeleteExpression__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let unwrapped: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
        if (!((Node__from_ast.$storageOf(((unwrapped ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0)) {
            return optionalChainTransformer.$go$private$estransforms$visitNonOptionalExpression(ch, (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression, false, true);
        }
        const __gotots_store_56 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_12 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_56, "Transformer"));
        const __gotots_store_57 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.UnaryExpressionBase).ExpressionBase)).NodeBase));
        const __gotots_argument_43 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_57, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_12, __gotots_argument_43);
    }
    static $go$private$estransforms$visitNonOptionalExpression(ch: optionalChainTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, captureThisArg: bool, isDelete: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindParenthesizedExpression$constant__from_ast(): {
                return optionalChainTransformer.$go$private$estransforms$visitParenthesizedExpression(ch, Node__from_ast.AsParenthesizedExpression(node), captureThisArg, isDelete);
                break;
            }
            case KindElementAccessExpression$constant__from_ast():
            case KindPropertyAccessExpression$constant__from_ast(): {
                return optionalChainTransformer.$go$private$estransforms$visitPropertyOrElementAccessExpression(ch, node, captureThisArg, isDelete);
                break;
            }
            case KindCallExpression$constant__from_ast(): {
                return optionalChainTransformer.$go$private$estransforms$visitCallExpression(ch, Node__from_ast.AsCallExpression(node), captureThisArg);
                break;
            }
            default: {
                const __gotots_store_66 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_66, "Transformer")), Node__from_ast.AsNode(node));
                break;
            }
        }
    }
    static $go$private$estransforms$visitOptionalExpression(ch: optionalChainTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, captureThisArg: bool, isDelete: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let r = flattenChain(node);
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = r.expression;
        let chain = r.chain;
        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = optionalChainTransformer.$go$private$estransforms$visitNonOptionalExpression(ch, SkipPartiallyEmittedExpressions__from_ast(expression), isCallChain(chain.get(0)), false);
        let leftThisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let capturedLeft: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = left;
        if (IsSyntheticReferenceExpression__from_ast(left)) {
            leftThisArg = (Node__from_ast.AsSyntheticReferenceExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ThisArg;
            capturedLeft = (Node__from_ast.AsSyntheticReferenceExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression;
        }
        const __gotots_store_12 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let leftExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.RestoreOuterExpressions(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "Transformer")), expression, capturedLeft, OEKPartiallyEmittedExpressions$constant__from_ast());
        if (!IsSimpleCopiableExpression__from_transformers(capturedLeft)) {
            const __gotots_store_13 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            capturedLeft = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Transformer")));
            const __gotots_store_14 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Transformer")), capturedLeft);
            const __gotots_store_15 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            leftExpression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Transformer")), capturedLeft, leftExpression);
        }
        let rightExpression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = capturedLeft;
        let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_range_0 = chain;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_index_0;
            const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
            let i = __gotots_range_value_0;
            let segment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
            switch (Node__from_ast.$storageOf(((segment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
                case KindElementAccessExpression$constant__from_ast():
                case KindPropertyAccessExpression$constant__from_ast(): {
                    if (i === chain.length - 1 && captureThisArg) {
                        if (!IsSimpleCopiableExpression__from_transformers(rightExpression)) {
                            const __gotots_store_16 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            thisArg = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Transformer")));
                            const __gotots_store_17 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "Transformer")), thisArg);
                            const __gotots_store_18 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            rightExpression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Transformer")), thisArg, rightExpression);
                        }
                        else {
                            thisArg = rightExpression;
                        }
                    }
                    if (Node__from_ast.$storageOf(((segment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindElementAccessExpression$constant__from_ast()) {
                        const __gotots_store_19 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_20 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_5 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory");
                        const __gotots_argument_8 = rightExpression;
                        const __gotots_argument_9 = void 0;
                        const __gotots_store_21 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_10 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "Transformer")), ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(segment) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                        const __gotots_argument_11 = NodeFlagsNone$constant__from_ast();
                        rightExpression = NodeFactory__from_ast.NewElementAccessExpression(__gotots_receiver_5, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11);
                    }
                    else {
                        const __gotots_store_22 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_23 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_6 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory");
                        const __gotots_argument_12 = rightExpression;
                        const __gotots_argument_13 = void 0;
                        const __gotots_store_24 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_14 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Transformer")), PropertyAccessExpression__from_ast.Name(Node__from_ast.AsPropertyAccessExpression(segment)));
                        const __gotots_argument_15 = NodeFlagsNone$constant__from_ast();
                        rightExpression = NodeFactory__from_ast.NewPropertyAccessExpression(__gotots_receiver_6, __gotots_argument_12, __gotots_argument_13, __gotots_argument_14, __gotots_argument_15);
                    }
                    break;
                }
                case KindCallExpression$constant__from_ast(): {
                    if (i === 0 && !(leftThisArg === undefined)) {
                        const __gotots_store_25 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        if (!EmitContext__from_printer.HasAutoGenerateInfo(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "Transformer")), leftThisArg)) {
                            const __gotots_receiver_7 = leftThisArg;
                            const __gotots_store_26 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            const __gotots_argument_16 = new GoInterfaceAdapter(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Transformer")));
                            leftThisArg = Node__from_ast.Clone(__gotots_receiver_7, __gotots_argument_16);
                            const __gotots_store_27 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            EmitContext__from_printer.AddEmitFlags(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_27, "Transformer")), leftThisArg, EFNoComments$constant__from_printer());
                        }
                        let callThisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = leftThisArg;
                        if (Node__from_ast.$storageOf(((leftThisArg ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSuperKeyword$constant__from_ast()) {
                            const __gotots_store_28 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                            callThisArg = NodeFactory__from_printer.NewThisExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_28, "Transformer")));
                        }
                        const __gotots_store_29 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_receiver_8 = Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_29, "Transformer"));
                        const __gotots_argument_17 = rightExpression;
                        const __gotots_argument_18 = callThisArg;
                        const __gotots_store_30 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_19 = NodeList__from_ast.$storageOf(((NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_30, "Transformer")), Node__from_ast.ArgumentList(segment)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes;
                        rightExpression = NodeFactory__from_printer.NewFunctionCallCall(__gotots_receiver_8, __gotots_argument_17, __gotots_argument_18, __gotots_argument_19);
                    }
                    else {
                        const __gotots_store_31 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_store_32 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_31, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                        const __gotots_receiver_9 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_32, "NodeFactory");
                        const __gotots_argument_20 = rightExpression;
                        const __gotots_argument_21 = void 0;
                        const __gotots_argument_22 = void 0;
                        const __gotots_store_33 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                        const __gotots_argument_23 = NodeVisitor__from_ast.VisitNodes(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_33, "Transformer")), Node__from_ast.ArgumentList(segment));
                        const __gotots_argument_24 = NodeFlagsNone$constant__from_ast();
                        rightExpression = NodeFactory__from_ast.NewCallExpression(__gotots_receiver_9, __gotots_argument_20, __gotots_argument_21, __gotots_argument_22, __gotots_argument_23, __gotots_argument_24);
                    }
                    break;
                }
            }
            const __gotots_store_34 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_34, "Transformer")), rightExpression, segment);
        }
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (isDelete) {
            const __gotots_store_35 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_36 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_35, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_10 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_36, "NodeFactory");
            const __gotots_store_37 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_25 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_37, "Transformer"));
            const __gotots_argument_26 = leftExpression;
            const __gotots_argument_27 = capturedLeft;
            const __gotots_argument_28 = true;
            const __gotots_argument_29 = createNotNullCondition(__gotots_argument_25, __gotots_argument_26, __gotots_argument_27, __gotots_argument_28);
            const __gotots_store_38 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_39 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_38, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_30 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_39, "NodeFactory"), KindQuestionToken$constant__from_ast());
            const __gotots_store_40 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_31 = NodeFactory__from_printer.NewTrueExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_40, "Transformer")));
            const __gotots_store_41 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_42 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_41, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_32 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_42, "NodeFactory"), KindColonToken$constant__from_ast());
            const __gotots_store_43 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_44 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_43, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_33 = NodeFactory__from_ast.NewDeleteExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_44, "NodeFactory"), rightExpression);
            target = NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_10, __gotots_argument_29, __gotots_argument_30, __gotots_argument_31, __gotots_argument_32, __gotots_argument_33);
        }
        else {
            const __gotots_store_45 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_46 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_45, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_11 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_46, "NodeFactory");
            const __gotots_store_47 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_34 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_47, "Transformer"));
            const __gotots_argument_35 = leftExpression;
            const __gotots_argument_36 = capturedLeft;
            const __gotots_argument_37 = true;
            const __gotots_argument_38 = createNotNullCondition(__gotots_argument_34, __gotots_argument_35, __gotots_argument_36, __gotots_argument_37);
            const __gotots_store_48 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_49 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_48, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_39 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_49, "NodeFactory"), KindQuestionToken$constant__from_ast());
            const __gotots_store_50 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_40 = NodeFactory__from_printer.NewVoidZeroExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_50, "Transformer")));
            const __gotots_store_51 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_52 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_51, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_41 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_52, "NodeFactory"), KindColonToken$constant__from_ast());
            const __gotots_argument_42 = rightExpression;
            target = NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_11, __gotots_argument_38, __gotots_argument_39, __gotots_argument_40, __gotots_argument_41, __gotots_argument_42);
        }
        Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        if (!(thisArg === undefined)) {
            const __gotots_store_53 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_54 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_53, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            target = NodeFactory__from_ast.NewSyntheticReferenceExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_54, "NodeFactory"), target, thisArg);
        }
        const __gotots_store_55 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_55, "Transformer")), target, Node__from_ast.AsNode(node));
        return target;
    }
    static $go$private$estransforms$visitParenthesizedExpression(ch: optionalChainTransformer | undefined, node: tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast> | undefined, captureThisArg: bool, isDelete: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let expr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = optionalChainTransformer.$go$private$estransforms$visitNonOptionalExpression(ch, ParenthesizedExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).Expression, captureThisArg, isDelete);
        if (IsSyntheticReferenceExpression__from_ast(expr)) {
            let synth: {
                value: SyntheticReferenceExpression__from_ast;
            } | undefined = Node__from_ast.AsSyntheticReferenceExpression(expr);
            const __gotots_store_58 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_59 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_58, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_13 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_59, "NodeFactory");
            const __gotots_store_60 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_61 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_60, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_argument_44 = NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_61, "NodeFactory"), node, (synth ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Expression);
            const __gotots_argument_45 = (synth ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.ThisArg;
            let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSyntheticReferenceExpression(__gotots_receiver_13, __gotots_argument_44, __gotots_argument_45);
            const __gotots_store_62 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_14 = Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_62, "Transformer"));
            const __gotots_argument_46 = res;
            const __gotots_store_63 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PrimaryExpressionBase__from_ast.$storageOf(PrimaryExpressionBase__from_ast.$fromStorage(ParenthesizedExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ParenthesizedExpression__from_ast>).value).PrimaryExpressionBase)).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase));
            const __gotots_argument_47 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_63, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                return NodeDefault__from_ast.$fromStorage($go$storage);
            }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                return NodeDefault__from_ast.$storageOf($go$value);
            }));
            EmitContext__from_printer.SetOriginal(__gotots_receiver_14, __gotots_argument_46, __gotots_argument_47);
            return res;
        }
        const __gotots_store_64 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_65 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_64, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        return NodeFactory__from_ast.UpdateParenthesizedExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_65, "NodeFactory"), node, expr);
    }
    static $go$private$estransforms$visitPropertyOrElementAccessExpression(ch: optionalChainTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, captureThisArg: bool, isDelete: bool): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0)) {
            return optionalChainTransformer.$go$private$estransforms$visitOptionalExpression(ch, Node__from_ast.AsNode(node), captureThisArg, isDelete);
        }
        const __gotots_store_67 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_67, "Transformer")), Node__from_ast.Expression(node));
        Assert__from_debug(expression === undefined || !IsSyntheticReferenceExpression__from_ast(expression), RuntimeSlice.nil<GoInterface | undefined>());
        let thisArg: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        if (captureThisArg) {
            if (!IsSimpleCopiableExpression__from_transformers(expression)) {
                const __gotots_store_68 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                thisArg = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_68, "Transformer")));
                const __gotots_store_69 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_69, "Transformer")), thisArg);
                const __gotots_store_70 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                expression = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_70, "Transformer")), thisArg, expression);
            }
            else {
                thisArg = expression;
            }
        }
        if (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindPropertyAccessExpression$constant__from_ast()) {
            let p: tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast> | undefined = Node__from_ast.AsPropertyAccessExpression(node);
            const __gotots_store_71 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_72 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_71, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_15 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_72, "NodeFactory");
            const __gotots_argument_48 = p;
            const __gotots_argument_49 = expression;
            const __gotots_argument_50 = void 0;
            const __gotots_store_73 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_51 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_73, "Transformer")), PropertyAccessExpression__from_ast.Name(p));
            const __gotots_argument_52 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(PropertyAccessExpression__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertyAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
            expression = NodeFactory__from_ast.UpdatePropertyAccessExpression(__gotots_receiver_15, __gotots_argument_48, __gotots_argument_49, __gotots_argument_50, __gotots_argument_51, __gotots_argument_52);
        }
        else {
            let p: tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast> | undefined = Node__from_ast.AsElementAccessExpression(node);
            const __gotots_store_74 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_75 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_74, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_17 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_75, "NodeFactory");
            const __gotots_argument_54 = p;
            const __gotots_argument_55 = expression;
            const __gotots_argument_56 = void 0;
            const __gotots_store_76 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_receiver_16 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_76, "Transformer"));
            const __gotots_store_77 = NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(ElementAccessExpression__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault));
            const __gotots_argument_53 = ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_77, "Node"), ($go$storage: Node__from_ast$Storage): Node__from_ast => {
                return Node__from_ast.$fromStorage($go$storage);
            }, ($go$value: Node__from_ast): Node__from_ast$Storage => {
                return Node__from_ast.$storageOf($go$value);
            })) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression;
            const __gotots_argument_57 = NodeVisitor__from_ast.VisitNode(__gotots_receiver_16, __gotots_argument_53);
            const __gotots_argument_58 = Node__from_ast.$storageOf(Node__from_ast.$fromStorage(NodeDefault__from_ast.$storageOf(NodeDefault__from_ast.$fromStorage(NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(UnaryExpressionBase__from_ast.$storageOf(UnaryExpressionBase__from_ast.$fromStorage(UpdateExpressionBase__from_ast.$storageOf(UpdateExpressionBase__from_ast.$fromStorage(LeftHandSideExpressionBase__from_ast.$storageOf(LeftHandSideExpressionBase__from_ast.$fromStorage(MemberExpressionBase__from_ast.$storageOf(MemberExpressionBase__from_ast.$fromStorage(ElementAccessExpression__from_ast.$storageOf(((p ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).MemberExpressionBase)).LeftHandSideExpressionBase)).UpdateExpressionBase)).UnaryExpressionBase)).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Flags;
            expression = NodeFactory__from_ast.UpdateElementAccessExpression(__gotots_receiver_17, __gotots_argument_54, __gotots_argument_55, __gotots_argument_56, __gotots_argument_57, __gotots_argument_58);
        }
        if (!(thisArg === undefined)) {
            const __gotots_store_78 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_79 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_78, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            let res: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_ast.NewSyntheticReferenceExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_79, "NodeFactory"), expression, thisArg);
            const __gotots_store_80 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.SetOriginal(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_80, "Transformer")), res, Node__from_ast.AsNode(node));
            return res;
        }
        return expression;
    }
}
export class flattenResult {
    declare private readonly $goType: void;
    public constructor(public expression: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined, public chain: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>) {
    }
    declare private readonly then?: never;
}
export function isNonNullChain(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsNonNullExpression__from_ast(node) && !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0);
}
export function flattenChain(chain: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): flattenResult {
    Assert__from_debug(!isNonNullChain(chain), RuntimeSlice.nil<GoInterface | undefined>());
    let links = RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([chain]);
    for (; !IsTaggedTemplateExpression__from_ast(chain) && Node__from_ast.QuestionDotToken(chain) === undefined;) {
        chain = SkipPartiallyEmittedExpressions__from_ast(Node__from_ast.Expression(chain));
        Assert__from_debug(!isNonNullChain(chain), RuntimeSlice.nil<GoInterface | undefined>());
        links = goSliceAppendSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>(RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([chain]), links, void 0);
    }
    return new flattenResult(Node__from_ast.Expression(chain), links);
}
export function isCallChain(node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): bool {
    return IsCallExpression__from_ast(node) && !((Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Flags & NodeFlagsOptionalChain$constant__from_ast()) >>> 0 === 0);
}
export function newOptionalChainTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let tx: optionalChainTransformer | undefined = new optionalChainTransformer(Transformer__from_transformers.$zero());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return optionalChainTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
