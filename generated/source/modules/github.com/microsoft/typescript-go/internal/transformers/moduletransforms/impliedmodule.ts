import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { HasFileName as HasFileName__from_ast, NodeDefault$Storage as NodeDefault__from_ast$Storage, SourceFile as SourceFile__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { ReferenceResolver as ReferenceResolver__from_binder } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/binder/package.js";
import type { ModuleKind as ModuleKind__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import type { TransformOptions as TransformOptions__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { KindSourceFile$constant as KindSourceFile$constant__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, Node as Node__from_ast } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { ModuleKindES2015$constant as ModuleKindES2015$constant__from_core } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/core/package.js";
import { Transformer as Transformer__from_transformers } from "../../../../../../../packages/github.com/microsoft/typescript-go/internal/transformers/package.js";
import { $goInterfaceAdapter$PointerTo_Named_ast$SourceFile as GoInterfaceAdapter } from "../../../../../../../support/interface-adapters.js";
import { NewCommonJSModuleTransformer } from "./commonjsmodule.js";
import { NewESModuleTransformer } from "./esmodule.js";
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
export class ImpliedModuleTransformer {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer__from_transformers, public opts: TransformOptions__from_transformers | undefined, public resolver: ReferenceResolver__from_binder | undefined, public getEmitModuleFormatOfFile: (($0: HasFileName__from_ast | undefined) => ModuleKind__from_core) | undefined, public cjsTransformer: Transformer__from_transformers | undefined, public esmTransformer: Transformer__from_transformers | undefined) {
    }
    declare private readonly then?: never;
    static $go$private$moduletransforms$visit(tx: ImpliedModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        switch (Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindSourceFile$constant__from_ast(): {
                node = ImpliedModuleTransformer.$go$private$moduletransforms$visitSourceFile(tx, Node__from_ast.AsSourceFile(node));
                break;
            }
        }
        return node;
    }
    static $go$private$moduletransforms$visitSourceFile(tx: ImpliedModuleTransformer | undefined, node: tsonicTypeScriptRuntime.Location<SourceFile__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        if (((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.IsDeclarationFile) {
            const __gotots_store_1 = NodeBase__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
            return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_1, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
        }
        const __gotots_callee_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).getEmitModuleFormatOfFile;
        const __gotots_argument_2 = new GoInterfaceAdapter(node);
        let format = (__gotots_callee_0 ?? GoPanic.raiseRuntime("call of nil function"))(__gotots_argument_2);
        let transformer: Transformer__from_transformers | undefined = void 0;
        if (format >= ModuleKindES2015$constant__from_core()) {
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmTransformer === undefined) {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmTransformer = NewESModuleTransformer((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).opts);
            }
            transformer = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).esmTransformer;
        }
        else {
            if ((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cjsTransformer === undefined) {
                (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cjsTransformer = NewCommonJSModuleTransformer((tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).opts);
            }
            transformer = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).cjsTransformer;
        }
        const __gotots_store_2 = NodeBase__from_ast.$storageOf(((Transformer__from_transformers.TransformSourceFile(transformer, node) ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<SourceFile__from_ast>).value.NodeBase);
        return NodeDefault__from_ast.AsNode(new $ProjectedPropertyLocation(__gotots_store_2, "NodeDefault", NodeDefault__from_ast.$fromStorage, NodeDefault__from_ast.$storageOf));
    }
}
export function NewImpliedModuleTransformer(opts: TransformOptions__from_transformers | undefined): Transformer__from_transformers | undefined {
    let tx: ImpliedModuleTransformer | undefined = new ImpliedModuleTransformer(Transformer__from_transformers.$zero(), opts, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Resolver, (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).GetEmitModuleFormatOfFile, void 0, void 0);
    const __gotots_store_0 = (tx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference"));
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return ImpliedModuleTransformer.$go$private$moduletransforms$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = (opts ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).Context;
    return Transformer__from_transformers.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
}
