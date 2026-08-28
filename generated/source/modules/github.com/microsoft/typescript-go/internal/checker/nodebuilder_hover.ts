import * as tsonicTypeScriptRuntime from "@tsonic/typescript-runtime";
import type { Node$Storage as Node__from_ast$Storage } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import type { NodeBuilderContext } from "./nodebuilderimpl.js";
import type { bool } from "@gotots/runtime/scalars.js";
import type { RuntimeSlice } from "@gotots/runtime/slice.js";
import { FunctionLikeBase as FunctionLikeBase__from_ast, IsPrivateIdentifier as IsPrivateIdentifier__from_ast, KindMethodSignature$constant as KindMethodSignature$constant__from_ast, KindPropertySignature$constant as KindPropertySignature$constant__from_ast, MethodSignatureDeclaration as MethodSignatureDeclaration__from_ast, NodeBase as NodeBase__from_ast, NodeDefault as NodeDefault__from_ast, NodeFactory as NodeFactory__from_ast, Node as Node__from_ast, PropertySignatureDeclaration as PropertySignatureDeclaration__from_ast, Symbol as Symbol__from_ast } from "../../../../../../packages/github.com/microsoft/typescript-go/internal/ast/package.js";
import { GoPanic } from "@gotots/runtime/panic.js";
export function isExpanding(ctx: {
    value: NodeBuilderContext;
} | undefined): bool {
    return (ctx ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")).value.maxExpansionDepth !== -1;
}
export function typeElementsToClassElements(f: tsonicTypeScriptRuntime.Location<NodeFactory__from_ast> | undefined, members: RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined>): RuntimeSlice<tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined> {
    const __gotots_range_0 = members;
    for (let __gotots_range_index_0 = 0; __gotots_range_index_0 < __gotots_range_0.length; __gotots_range_index_0++) {
        const __gotots_range_value_0 = __gotots_range_index_0;
        const __gotots_range_value_1 = __gotots_range_0.get(__gotots_range_index_0);
        let i = __gotots_range_value_0;
        let m: tsonicTypeScriptRuntime.Location<Node__from_ast> | undefined = __gotots_range_value_1;
        switch (Node__from_ast.$storageOf(((m ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Node__from_ast>).value).Kind) {
            case KindPropertySignature$constant__from_ast(): {
                let ps: tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast> | undefined = Node__from_ast.AsPropertySignatureDeclaration(m);
                const __gotots_store_1 = members;
                const __gotots_store_2 = i;
                const __gotots_receiver_0 = f;
                const __gotots_argument_0 = Node__from_ast.Modifiers(m);
                const __gotots_argument_1 = PropertySignatureDeclaration__from_ast.Name(ps);
                const __gotots_store_0 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        PropertySignatureDeclaration__from_ast.$storageOf(((ps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).NodeBase)).NodeDefault));
                const __gotots_argument_2 = Node__from_ast.QuestionToken(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_0, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
                const __gotots_argument_3 = PropertySignatureDeclaration__from_ast.$storageOf(((ps ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<PropertySignatureDeclaration__from_ast>).value).Type;
                const __gotots_argument_4 = void 0;
                __gotots_store_1.set(__gotots_store_2, NodeFactory__from_ast.NewPropertyDeclaration(__gotots_receiver_0, __gotots_argument_0, __gotots_argument_1, __gotots_argument_2, __gotots_argument_3, __gotots_argument_4));
                break;
            }
            case KindMethodSignature$constant__from_ast(): {
                let ms: tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast> | undefined = Node__from_ast.AsMethodSignatureDeclaration(m);
                const __gotots_store_4 = members;
                const __gotots_store_5 = i;
                const __gotots_receiver_1 = f;
                const __gotots_argument_5 = Node__from_ast.Modifiers(m);
                const __gotots_argument_6 = void 0;
                const __gotots_argument_7 = MethodSignatureDeclaration__from_ast.Name(ms);
                const __gotots_store_3 = (void NodeDefault__from_ast.$storageOf, (void NodeDefault__from_ast.$fromStorage,
                    (void NodeBase__from_ast.$storageOf, (void NodeBase__from_ast.$fromStorage,
                        MethodSignatureDeclaration__from_ast.$storageOf(((ms ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).NodeBase)).NodeDefault));
                const __gotots_argument_8 = Node__from_ast.QuestionToken(tsonicTypeScriptRuntime.projectLocation<Node__from_ast$Storage, Node__from_ast>(tsonicTypeScriptRuntime.propertyLocation(__gotots_store_3, "Node"), Node__from_ast.$fromStorage, Node__from_ast.$storageOf));
                const __gotots_argument_9 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    MethodSignatureDeclaration__from_ast.$storageOf(((ms ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).TypeParameters;
                const __gotots_argument_10 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    MethodSignatureDeclaration__from_ast.$storageOf(((ms ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Parameters;
                const __gotots_argument_11 = (void FunctionLikeBase__from_ast.$storageOf, (void FunctionLikeBase__from_ast.$fromStorage,
                    MethodSignatureDeclaration__from_ast.$storageOf(((ms ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<MethodSignatureDeclaration__from_ast>).value).FunctionLikeBase)).Type;
                const __gotots_argument_12 = void 0;
                const __gotots_argument_13 = void 0;
                __gotots_store_4.set(__gotots_store_5, NodeFactory__from_ast.NewMethodDeclaration(__gotots_receiver_1, __gotots_argument_5, __gotots_argument_6, __gotots_argument_7, __gotots_argument_8, __gotots_argument_9, __gotots_argument_10, __gotots_argument_11, __gotots_argument_12, __gotots_argument_13));
                break;
            }
        }
    }
    return members;
}
export function isHashPrivate(s: tsonicTypeScriptRuntime.Location<Symbol__from_ast> | undefined): bool {
    return !(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration === undefined) && !(Node__from_ast.Name(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration) === undefined) && IsPrivateIdentifier__from_ast(Node__from_ast.Name(Symbol__from_ast.$storageOf(((s ?? GoPanic.raiseRuntime("invalid memory address or nil pointer dereference")) as tsonicTypeScriptRuntime.Location<Symbol__from_ast>).value).ValueDeclaration));
}
