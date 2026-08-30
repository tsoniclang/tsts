import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { BinaryExpression as BinaryExpression__from_ast, ElementAccessExpression as ElementAccessExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, IsElementAccessExpression as IsElementAccessExpression__from_ast, IsPropertyAccessExpression as IsPropertyAccessExpression__from_ast, KindAsteriskAsteriskEqualsToken$constant as KindAsteriskAsteriskEqualsToken$constant__from_ast, KindAsteriskAsteriskToken$constant as KindAsteriskAsteriskToken$constant__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeFlagsNone$constant as NodeFlagsNone$constant__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SubtreeContainsExponentiationOperator$constant as SubtreeContainsExponentiationOperator$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
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
export class exponentiationTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$visit(ch: exponentiationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsExponentiationOperator$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindBinaryExpression$constant__from_ast(): {
                return exponentiationTransformer.$go$private$estransforms$visitBinaryExpression(ch, Node__from_ast.AsBinaryExpression(node));
                break;
            }
            default: {
                const __gotots_store_1 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitBinaryExpression(ch: exponentiationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindAsteriskAsteriskEqualsToken$constant__from_ast(): {
                return exponentiationTransformer.$go$private$estransforms$visitExponentiationAssignmentExpression(ch, node);
                break;
            }
            case KindAsteriskAsteriskToken$constant__from_ast(): {
                return exponentiationTransformer.$go$private$estransforms$visitExponentiationExpression(ch, node);
                break;
            }
        }
        const __gotots_store_2 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_2 = Transformer__from_transformers.Visitor(__gotots_store_2.Transformer);
        const __gotots_store_3 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
            (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
        const __gotots_argument_2 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_3, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_2, __gotots_argument_2);
    }
    static $go$private$estransforms$visitExponentiationAssignmentExpression(ch: exponentiationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let target: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        let value: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = void 0;
        const __gotots_store_4 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_4.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        const __gotots_store_5 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_5.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
        if (IsElementAccessExpression__from_ast(left)) {
            const __gotots_store_6 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let expressionTemp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_6.Transformer));
            const __gotots_store_7 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_7.Transformer), expressionTemp);
            const __gotots_store_8 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let argumentExpressionTemp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_8.Transformer));
            const __gotots_store_9 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_9.Transformer), argumentExpressionTemp);
            const __gotots_store_10 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let objExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_10.Transformer), expressionTemp, Node__from_ast.Expression(left));
            Node__from_ast.$storageOf(((objExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Expression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_11 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let accessExpr: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_11.Transformer), argumentExpressionTemp, ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression);
            Node__from_ast.$storageOf(((accessExpr ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((ElementAccessExpression__from_ast.$storageOf(((Node__from_ast.AsElementAccessExpression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<ElementAccessExpression__from_ast>).value).ArgumentExpression ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_12 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_13 = (Transformer__from_transformers.Factory(__gotots_store_12.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            target = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_13, "NodeFactory"), objExpr, void 0, accessExpr, NodeFlagsNone$constant__from_ast());
            const __gotots_store_14 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_15 = (Transformer__from_transformers.Factory(__gotots_store_14.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            value = NodeFactory__from_ast.NewElementAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_15, "NodeFactory"), expressionTemp, void 0, argumentExpressionTemp, NodeFlagsNone$constant__from_ast());
            Node__from_ast.$storageOf(((value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        }
        else if (IsPropertyAccessExpression__from_ast(left)) {
            const __gotots_store_16 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let expressionTemp: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_16.Transformer));
            const __gotots_store_17 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_17.Transformer), expressionTemp);
            const __gotots_store_18 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            let assignment: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_18.Transformer), expressionTemp, Node__from_ast.Expression(left));
            Node__from_ast.$storageOf(((assignment ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((Node__from_ast.Expression(left) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_19 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_20 = (Transformer__from_transformers.Factory(__gotots_store_19.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            target = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_20, "NodeFactory"), assignment, void 0, Node__from_ast.Name(left), NodeFlagsNone$constant__from_ast());
            Node__from_ast.$storageOf(((target ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
            const __gotots_store_21 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_22 = (Transformer__from_transformers.Factory(__gotots_store_21.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            value = NodeFactory__from_ast.NewPropertyAccessExpression(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_22, "NodeFactory"), expressionTemp, void 0, Node__from_ast.Name(left), NodeFlagsNone$constant__from_ast());
            Node__from_ast.$storageOf(((value ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(Node__from_ast.$storageOf(((left ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc)));
        }
        else {
            target = left;
            value = left;
        }
        const __gotots_store_23 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let rhs: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGlobalMethodCall(Transformer__from_transformers.Factory(__gotots_store_23.Transformer), "Math", "pow", RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([value, right]));
        Node__from_ast.$storageOf(((rhs ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
        const __gotots_store_24 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_24.Transformer), target, rhs);
        Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
        return result;
    }
    static $go$private$estransforms$visitExponentiationExpression(ch: exponentiationTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        const __gotots_store_25 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_25.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
        const __gotots_store_26 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_26.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
        const __gotots_store_27 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let result: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeFactory__from_printer.NewGlobalMethodCall(Transformer__from_transformers.Factory(__gotots_store_27.Transformer), "Math", "pow", RuntimeSlice.literal<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>([left, right]));
        Node__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage((void Node__from_ast.$storageOf, (void Node__from_ast.$fromStorage,
            (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase)).NodeDefault)).Node)).Loc)));
        return result;
    }
}
export function newExponentiationTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: exponentiationTransformer | undefined = new exponentiationTransformer(Transformer__from_transformers.$zero());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return exponentiationTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
