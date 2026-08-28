import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { CompilerOptions as CompilerOptions__from_core, ModuleKind as ModuleKind__from_core } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { EmitContext as EmitContext__from_printer, EmitResolver as EmitResolver__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { KindSourceFile$constant as KindSourceFile$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { $goInterfaceAdapter$string as GoInterfaceAdapter } from "../../../../../../support/interface-adapters.js";
import { Transformer } from "./transformer.js";
import { GoPanicNilValue } from "@gotots/runtime/panic-nil.js";
import { GoPanic } from "@gotots/runtime/panic.js";
import { RuntimeSlice } from "@gotots/runtime/slice.js";
export class chainedTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer, public components: RuntimeSlice<tsonicTypeScriptRuntime.Location<Transformer> | undefined>) {
    }
    declare private readonly then?: never;
    static $go$private$transformers$visit(ch: chainedTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (!(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind === KindSourceFile$constant__from_ast())) {
            const __gotots_argument_4 = new GoInterfaceAdapter("Chained transform passed non-sourcefile initial node");
            GoPanic.raise(__gotots_argument_4 === undefined ? GoPanicNilValue.create() : __gotots_argument_4);
        }
        let result: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined = Node__from_ast.AsSourceFile(node);
        const __gotots_range_1 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).components;
        for (let __gotots_range_index_1 = 0; __gotots_range_index_1 < __gotots_range_1.length; __gotots_range_index_1++) {
            const __gotots_range_value_1 = __gotots_range_1.get(__gotots_range_index_1);
            let t: tsonicTypeScriptRuntime.Location<Transformer> | undefined = __gotots_range_value_1;
            result = Transformer.TransformSourceFile(t, result);
        }
        const __gotots_store_1 = NodeBase__from_ast.$storageOf(((result ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        return NodeDefault__from_ast.AsNode(tsonicTypeScriptRuntime.projectLocation<NodeDefault__from_ast$Storage, NodeDefault__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_1, "NodeDefault"), NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
}
export class TransformOptions {
    declare private readonly $goType: void;
    public constructor(public Context: {
        value: EmitContext__from_printer;
    } | undefined, public CompilerOptions: {
        value: CompilerOptions__from_core;
    } | undefined, public Resolver: ReferenceResolver__from_binder | undefined, public EmitResolver: EmitResolver__from_printer | undefined, public GetEmitModuleFormatOfFile: (($0: HasFileName__from_ast | undefined) => ModuleKind__from_core) | undefined) {
    }
    declare private readonly then?: never;
}
export function Chain(transforms: RuntimeSlice<(($0: TransformOptions | undefined) => tsonicTypeScriptRuntime.Location<Transformer> | undefined) | undefined>): (($0: TransformOptions | undefined) => tsonicTypeScriptRuntime.Location<Transformer> | undefined) | undefined {
    if (transforms.length < 2) {
        if (transforms.length === 0) {
            const __gotots_argument_0 = new GoInterfaceAdapter("Expected some number of transforms to chain, but got none");
            GoPanic.raise(__gotots_argument_0 === undefined ? GoPanicNilValue.create() : __gotots_argument_0);
        }
        return transforms.get(0);
    }
    return (opt: TransformOptions | undefined): tsonicTypeScriptRuntime.Location<Transformer> | undefined => {
        let constructed = RuntimeSlice.make<tsonicTypeScriptRuntime.Location<Transformer> | undefined>(0, transforms.length, void 0);
        const __gotots_range_0 = transforms;
        for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
            const __gotots_range_value_0 = __gotots_range_0.get(__gotots_range_index_0);
            let t: (($0: TransformOptions | undefined) => tsonicTypeScriptRuntime.Location<Transformer> | undefined) | undefined = __gotots_range_value_0;
            {
                const __gotots_callee_0 = t;
                const __gotots_argument_1 = opt;
                let result: tsonicTypeScriptRuntime.Location<Transformer> | undefined = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_1);
                if (!(result === undefined)) {
                    constructed = constructed.append(void 0, [result]);
                }
            }
        }
        switch (constructed.length) {
            case 0: {
                return void 0;
                break;
            }
            case 1: {
                return constructed.get(0);
                break;
            }
        }
        let ch: chainedTransformer | undefined = new chainedTransformer(Transformer.$zero(), constructed);
        const __gotots_store_0 = (ch ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
        const __gotots_receiver_1 = tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Transformer");
        const __gotots_receiver_0 = ch;
        const __gotots_argument_2 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
            return chainedTransformer.$go$private$transformers$visit(__gotots_receiver_0, $argument0);
        };
        const __gotots_argument_3 = (opt ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
        return Transformer.NewTransformer(__gotots_receiver_1, __gotots_argument_2, __gotots_argument_3);
    };
}
