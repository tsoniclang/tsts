import type * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { ModifierFlags as ModifierFlags__from_ast, ModifierList as ModifierList__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { EmitContext as EmitContext__from_printer } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/printer/package.js";
import { ModifierFlagsNone$constant as ModifierFlagsNone$constant__from_ast, ModifierToFlag as ModifierToFlag__from_ast, NodeVisitor as NodeVisitor__from_ast, Node as Node__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { Transformer } from "./transformer.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export class modifierVisitor {
    declare private readonly $goType: void;
    public constructor(public Transformer: Transformer, public AllowedModifiers: ModifierFlags__from_ast) {
    }
    declare private readonly then?: never;
    static $go$private$transformers$visit(v: modifierVisitor | undefined, node: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined {
        let flags = ModifierToFlag__from_ast(Node__from_ast.$storageOf(((node ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind);
        if (!(flags === ModifierFlagsNone$constant__from_ast()) && (flags & (v ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).AllowedModifiers) >>> 0 === 0) {
            return void 0;
        }
        return node;
    }
}
export function ExtractModifiers(emitContext: {
    value: EmitContext__from_printer;
} | undefined, modifiers: tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined, allowed: ModifierFlags__from_ast): tsonicTypeScriptRuntime.Location<ModifierList__from_ast> | undefined {
    if (modifiers === undefined) {
        return void 0;
    }
    let tx = new modifierVisitor(Transformer.$zero(), allowed);
    const __gotots_store_0 = tx;
    const __gotots_receiver_1 = __gotots_store_0.Transformer;
    const __gotots_receiver_0 = tx;
    const __gotots_argument_0 = ($argument0: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined): tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined => {
        return modifierVisitor.$go$private$transformers$visit(__gotots_receiver_0, $argument0);
    };
    const __gotots_argument_1 = emitContext;
    Transformer.NewTransformer(__gotots_receiver_1, __gotots_argument_0, __gotots_argument_1);
    return NodeVisitor__from_ast.VisitModifiers(tx.Transformer.visitor, modifiers);
}
