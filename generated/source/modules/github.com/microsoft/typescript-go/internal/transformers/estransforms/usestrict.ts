import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { IsExternalModule as IsExternalModule__from_ast, KindSourceFile$constant as KindSourceFile$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, NodeList as NodeList__from_ast, Node as Node__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { CompilerOptions as CompilerOptions__from_core, ModuleKindES2015$constant as ModuleKindES2015$constant__from_core, ModuleKindPreserve$constant as ModuleKindPreserve$constant__from_core, ScriptKindJSON$constant as ScriptKindJSON$constant__from_core, TextRange as TextRange__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { NodeFactory as NodeFactory__from_printer } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function NewUseStrictTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: useStrictTransformer | undefined = new useStrictTransformer(Transformer__from_transformers.$zero(), (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).CompilerOptions, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).GetEmitModuleFormatOfFile);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return useStrictTransformer.$go$private$estransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
export class useStrictTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public compilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public getEmitModuleFormatOfFile: (($0: HasFileName__from_ast | undefined) => ModuleKind__from_core) | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$estransforms$visit(tx: useStrictTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast())) {
            return node;
        }
        return useStrictTransformer.$go$private$estransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
    }
    static $go$private$estransforms$visitSourceFile(tx: useStrictTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.ScriptKind === ScriptKindJSON$constant__from_core()) {
            const __gotots_store_1 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        let isExternalModule = IsExternalModule__from_ast(node);
        let moduleKind = CompilerOptions__from_core.GetEmitModuleKind((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).compilerOptions);
        const __gotots_callee_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).getEmitModuleFormatOfFile;
        const __gotots_argument_2 = new GoInterfaceAdapter(node);
        let format = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        if (isExternalModule && moduleKind >= ModuleKindES2015$constant__from_core() && (moduleKind === ModuleKindPreserve$constant__from_core() || format >= ModuleKindES2015$constant__from_core())) {
            const __gotots_store_2 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_2, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_store_3 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        let statements = NodeFactory__from_printer.EnsureUseStrict(Transformer__from_transformers.Factory(__gotots_store_3.Transformer), NodeList__from_ast.$storageOf(((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Nodes);
        const __gotots_store_4 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_5 = (Transformer__from_transformers.Factory(__gotots_store_4.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        let statementList: tsonicTypeScriptRuntime.Location<NodeList__from_ast> | undefined = NodeFactory__from_ast.NewNodeList(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_5, "NodeFactory"), statements);
        NodeList__from_ast.$storageOf(((statementList ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc = TextRange__from_core.$storageOf(TextRange__from_core.$copy(TextRange__from_core.$fromStorage(NodeList__from_ast.$storageOf(((((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.Statements ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<NodeList__from_ast>).value).Loc)));
        const __gotots_store_6 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_store_7 = (Transformer__from_transformers.Factory(__gotots_store_6.Transformer) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value;
        const __gotots_store_8 = NodeBase__from_ast.$storageOf(((Node__from_ast.AsSourceFile(NodeFactory__from_ast.UpdateSourceFile(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_7, "NodeFactory"), node, statementList, ((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.EndOfFileToken)) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_8, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
}
