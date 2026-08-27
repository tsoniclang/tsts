import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { CatchClause as CatchClause__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { KindCatchClause$constant as KindCatchClause$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast, SubtreeContainsMissingCatchClauseVariable$constant as SubtreeContainsMissingCatchClauseVariable$constant__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class optionalCatchTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$visit(ch: optionalCatchTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((Node__from_ast.SubtreeFacts(node) & SubtreeContainsMissingCatchClauseVariable$constant__from_ast()) >>> 0 === 0) {
            return node;
        }
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindCatchClause$constant__from_ast(): {
                return optionalCatchTransformer.$go$private$estransforms$visitCatchClause(ch, Node__from_ast.AsCatchClause(node));
                break;
            }
            default: {
                const __gotots_store_1 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
                return NodeVisitor__from_ast.VisitEachChild(Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "Transformer")), node);
                break;
            }
        }
    }
    static $go$private$estransforms$visitCatchClause(ch: optionalCatchTransformer | undefined, node: {
        value: CatchClause__from_ast;
    } | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.VariableDeclaration === undefined) {
            const __gotots_store_2 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_3 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_3 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "NodeFactory");
            const __gotots_store_4 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_store_5 = (Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_4, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
            const __gotots_receiver_2 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory");
            const __gotots_store_6 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_argument_2 = NodeFactory__from_printer.NewTempVariable(Transformer__from_transformers.Factory(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_6, "Transformer")));
            const __gotots_argument_3 = void 0;
            const __gotots_argument_4 = void 0;
            const __gotots_argument_5 = void 0;
            const __gotots_argument_7 = NodeFactory__from_ast.NewVariableDeclaration(__gotots_receiver_2, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4, __gotots_argument_5);
            const __gotots_store_7 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
            const __gotots_callee_0 = (Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "Transformer")) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Visit;
            const __gotots_argument_6 = (node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.Block;
            const __gotots_argument_8 = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_6);
            return NodeFactory__from_ast.NewCatchClause(__gotots_receiver_3, __gotots_argument_7, __gotots_argument_8);
        }
        const __gotots_store_8 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_4 = Transformer__from_transformers.Visitor(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "Transformer"));
        const __gotots_store_9 = NodeBase__from_ast.$storageOf((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.NodeBase);
        const __gotots_argument_9 = NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_9, "NodeDefault"), ($go$storage: NodeDefault__from_ast$Storage): NodeDefault__from_ast => {
            return NodeDefault__from_ast.$fromStorage($go$storage);
        }, ($go$value: NodeDefault__from_ast): NodeDefault__from_ast$Storage => {
            return NodeDefault__from_ast.$storageOf($go$value);
        }));
        return NodeVisitor__from_ast.VisitEachChild(__gotots_receiver_4, __gotots_argument_9);
    }
}
export function newOptionalCatchTransformer(opts: TransformOptions__from_transformers | undefined): tsonicTypeScriptRuntime.Location<Transformer__from_transformers> | undefined {
    let tx: optionalCatchTransformer | undefined = new optionalCatchTransformer(Transformer__from_transformers.$zero());
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return optionalCatchTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
