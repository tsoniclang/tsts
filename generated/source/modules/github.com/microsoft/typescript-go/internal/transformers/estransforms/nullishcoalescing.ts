import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { BinaryExpression as BinaryExpression__from_ast, ExpressionBase as ExpressionBase__from_ast, KindBinaryExpression$constant as KindBinaryExpression$constant__from_ast, KindColonToken$constant as KindColonToken$constant__from_ast, KindQuestionQuestionToken$constant as KindQuestionQuestionToken$constant__from_ast, KindQuestionToken$constant as KindQuestionToken$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SubtreeContainsNullishCoalescing$constant as SubtreeContainsNullishCoalescing$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { EmitContext as EmitContext__from_printer, NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { IsSimpleCopiableExpression as IsSimpleCopiableExpression__from_transformers, Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { createNotNullCondition } from "./utilities.js";
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
export class nullishCoalescingTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$visit(ch: nullishCoalescingTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsNullishCoalescing$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindBinaryExpression$constant__from_ast(): {
                return nullishCoalescingTransformer.$go$private$estransforms$visitBinaryExpression(ch, Node__from_ast.AsBinaryExpression(node));
                break;
            }
            default: {
                const __gotots_store_1 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(__gotots_store_1.Transformer), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitBinaryExpression(ch: nullishCoalescingTransformer | undefined, node: tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).OperatorToken ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindQuestionQuestionToken$constant__from_ast(): {
                const __gotots_store_2 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                let left: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_2.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Left);
                let right: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = left;
                if (!IsSimpleCopiableExpression__from_transformers(left)) {
                    const __gotots_store_3 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    right = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(__gotots_store_3.Transformer));
                    const __gotots_store_4 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    EmitContext__from_printer.AddVariableDeclaration(Transformer__from_transformers.EmitContext(__gotots_store_4.Transformer), right);
                    const __gotots_store_5 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                    left = NodeFactory__from_printer.NewAssignmentExpression(Transformer__from_transformers.Factory(__gotots_store_5.Transformer), right, left);
                }
                const __gotots_store_6 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_7 = (Transformer__from_transformers.Factory(__gotots_store_6.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory");
                const __gotots_store_8 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_2 = Transformer__from_transformers.EmitContext(__gotots_store_8.Transformer);
                const __gotots_argument_3 = left;
                const __gotots_argument_4 = right;
                const __gotots_argument_5 = false;
                const __gotots_argument_6 = createNotNullCondition(__gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
                const __gotots_store_9 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_10 = (Transformer__from_transformers.Factory(__gotots_store_9.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_7 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_10, "NodeFactory"), KindQuestionToken$constant__from_ast());
                const __gotots_argument_8 = right;
                const __gotots_store_11 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_store_12 = (Transformer__from_transformers.Factory(__gotots_store_11.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
                const __gotots_argument_9 = NodeFactory__from_ast.NewToken(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_12, "NodeFactory"), KindColonToken$constant__from_ast());
                const __gotots_store_13 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_argument_10 = NodeVisitor__from_ast.VisitNode(Transformer__from_transformers.Visitor(__gotots_store_13.Transformer), BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).Right);
                return NodeFactory__from_ast.NewConditionalExpression(__gotots_receiver_2, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10);
                break;
            }
            default: {
                const __gotots_store_14 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                const __gotots_receiver_3 = Transformer__from_transformers.Visitor(__gotots_store_14.Transformer);
                const __gotots_store_15 = (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                    (void ExpressionBase__from_ast.$storageOf, (void ExpressionBase__from_ast.$fromStorage,
                        BinaryExpression__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<BinaryExpression__from_ast>).value).ExpressionBase)).NodeBase));
                const __gotots_argument_11 = NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_15, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
                return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_3, __gotots_argument_11);
                break;
            }
        }
    }
}
export function newNullishCoalescingTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: nullishCoalescingTransformer | undefined = new nullishCoalescingTransformer(Transformer__from_transformers.$zero());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return nullishCoalescingTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
