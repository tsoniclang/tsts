import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { BinaryExpression as BinaryExpression__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, IsAccessExpression as IsAccessExpression__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, KindAmpersandAmpersandEqualsToken$constant as KindAmpersandAmpersandEqualsToken$constant__from_ast, KindAmpersandAmpersandToken$constant as KindAmpersandAmpersandToken$constant__from_ast, KindBarBarEqualsToken$constant as KindBarBarEqualsToken$constant__from_ast, KindBarBarToken$constant as KindBarBarToken$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindQuestionQuestionEqualsToken$constant as KindQuestionQuestionEqualsToken$constant__from_ast, KindQuestionQuestionToken$constant as KindQuestionQuestionToken$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SkipParentheses as SkipParentheses__from_ast, SubtreeContainsLogicalAssignments$constant as SubtreeContainsLogicalAssignments$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsSimpleCopiableExpression as IsSimpleCopiableExpression__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class logicalAssignmentTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$visit(ch: logicalAssignmentTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsLogicalAssignments$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindBinaryExpression$constant__from_ast(): {
                return logicalAssignmentTransformer.$go$private$estransforms$visitBinaryExpression(ch, Node__from_ast.AsBinaryExpression(node));
                break;
            }
            default: {
                const __gotots_store_1 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Transformer")), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitBinaryExpression(ch: logicalAssignmentTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let nonAssignmentOperator = 0;
        switch (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindBarBarEqualsToken$constant__from_ast(): {
                nonAssignmentOperator = KindBarBarToken$constant__from_ast();
                break;
            }
            case KindAmpersandAmpersandEqualsToken$constant__from_ast(): {
                nonAssignmentOperator = KindAmpersandAmpersandToken$constant__from_ast();
                break;
            }
            case KindQuestionQuestionEqualsToken$constant__from_ast(): {
                nonAssignmentOperator = KindQuestionQuestionToken$constant__from_ast();
                break;
            }
            default: {
                const __gotots_store_2 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_2 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Transformer"));
                const __gotots_store_3 = NodeBase__from_ast.$storageOf(NodeBase__from_ast.$fromStorage(ExpressionBase__from_ast.$storageOf(ExpressionBase__from_ast.$fromStorage(BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                const __gotots_argument_2 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
                    return NodeDefault__from_ast.$fromStorage($go$storage);
                }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
                    return NodeDefault__from_ast.$storageOf($go$value);
                }));
                return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_2, __gotots_argument_2);
                break;
            }
        }
        const __gotots_store_4 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_3 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Transformer")), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(__gotots_argument_3);
        let assignmentTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = left;
        const __gotots_store_5 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_4 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "Transformer")), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
        let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = SkipParentheses__from_ast(__gotots_argument_4);
        if (IsAccessExpression__from_ast(left)) {
            let propertyAccessTargetSimpleCopiable = IsSimpleCopiableExpression__from_transformers(Node__from_ast.Expression(left));
            let propertyAccessTarget: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(left);
            let propertyAccessTargetAssignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = Node__from_ast.Expression(left);
            if (!propertyAccessTargetSimpleCopiable) {
                const __gotots_store_6 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                propertyAccessTarget = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer")));
                const __gotots_store_7 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Transformer")), propertyAccessTarget);
                const __gotots_store_8 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                propertyAccessTargetAssignment = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Transformer")), propertyAccessTarget, Node__from_ast.Expression(left));
            }
            if (IsPropertyAccessExpression__from_ast(left)) {
                const __gotots_store_9 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_10 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                assignmentTarget = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), propertyAccessTarget, void 0, Node__from_ast.Name(left), NodeFlagsNone$constant__from_ast());
                const __gotots_store_11 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_12 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_11, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                left = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), propertyAccessTargetAssignment, void 0, Node__from_ast.Name(left), NodeFlagsNone$constant__from_ast());
            }
            else {
                let elementAccessArgumentSimpleCopiable = IsSimpleCopiableExpression__from_transformers(ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                let elementAccessArgument: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression;
                let argumentExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = elementAccessArgument;
                if (!elementAccessArgumentSimpleCopiable) {
                    const __gotots_store_13 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    elementAccessArgument = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "Transformer")));
                    const __gotots_store_14 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_14, "Transformer")), elementAccessArgument);
                    const __gotots_store_15 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    argumentExpr = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "Transformer")), elementAccessArgument, ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
                }
                const __gotots_store_16 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_17 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_16, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                assignmentTarget = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_17, "NodeFactory"), propertyAccessTarget, void 0, elementAccessArgument, NodeFlagsNone$constant__from_ast());
                const __gotots_store_18 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_19 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_18, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                left = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_19, "NodeFactory"), propertyAccessTargetAssignment, void 0, argumentExpr, NodeFlagsNone$constant__from_ast());
            }
        }
        const __gotots_store_20 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_21 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_4 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_21, "NodeFactory");
        const __gotots_argument_6 = void 0;
        const __gotots_argument_7 = left;
        const __gotots_argument_8 = void 0;
        const __gotots_store_22 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_23 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_argument_9 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_23, "NodeFactory"), nonAssignmentOperator);
        const __gotots_store_24 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_25 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_24, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_25, "NodeFactory");
        const __gotots_store_26 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_argument_5 = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_26, "Transformer")), assignmentTarget, right);
        const __gotots_argument_10 = NodeFactory__from_ast.NewParenthesizedExpression(__gotots_receiver_3, __gotots_argument_5);
        return NodeFactory__from_ast.NewBinaryExpression(__gotots_receiver_4, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
    }
}
export function newLogicalAssignmentTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let tx: logicalAssignmentTransformer | undefined = new logicalAssignmentTransformer(Transformer__from_transformers.$zero());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return logicalAssignmentTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
